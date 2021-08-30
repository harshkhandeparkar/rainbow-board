import { BrowserWindow, shell, dialog, ipcMain, app } from 'electron';
import { indexFilePath, iconPath } from '../constants/paths';
import { setWindowMenu } from '../util/windowMenu';
import { setHotkeys } from '../util/hotkeys';
import * as EVENTS from '../../common/constants/eventNames';
import * as PATHS from '../../common/constants/paths';
import { IPlugin } from '../../common/types/plugins';
import { openDialog } from '../util/open';
import {
  startFullscreenSetting,
  startMaximizedSetting,
  showMenuBarWhenFullscreenSetting,
  useGnomeStyleHeaderbarSetting
} from '../../common/code/settings';
import { menuClickEvents, EventTypes } from '../events/menuClickEvents';

let showExitPrompt = true;

export function createMainWindow(
  isDev: boolean,
  plugins: IPlugin[],
  splashWin: BrowserWindow | null
) {
  const win = new BrowserWindow({
    webPreferences: {
      devTools: isDev,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false,
    fullscreenable: true,
    frame: !useGnomeStyleHeaderbarSetting.get(),
    fullscreen: startFullscreenSetting.get(),
    icon: iconPath
  })

  if(startMaximizedSetting.get()) win.maximize();

  ipcMain.on('get-plugins', (e) => {
    e.returnValue = plugins.filter(plugin => plugin.usable);
  })

  win.loadFile(indexFilePath);

  setWindowMenu(win, isDev, `/${PATHS.HOME}`);
  setHotkeys(win);

  ipcMain.on(EVENTS.LOCATION_CHANGED, (e, {path}: {path: string}) => {
    setWindowMenu(win, isDev, path);
  })

  ipcMain.on(EVENTS.RESTART, () => {
    app.relaunch();
    app.quit();
  })

  ipcMain.on(EVENTS.OPEN, (e) => {
    openDialog(win, e);
  })

  ipcMain.on(EVENTS.FIRE_MENU_EVENT, (e, {eventName, options}: {eventName: EventTypes, options: any}) => {
    menuClickEvents.fire(eventName, options);
  })

  ipcMain.on(EVENTS.MAXIMIZE_UNMAXIMIZE, (e) => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  })

  ipcMain.on(EVENTS.QUIT, (e) => {
    app.quit();
  })

  ipcMain.on(EVENTS.MINIMIZE, (e) => {
    win.minimize();
  })

  ipcMain.on(EVENTS.SET_WINDOW_TITLE, (e, title: string) => {
    win.setTitle(title);
  })

  win.on('enter-full-screen', () => {
    win.setMenuBarVisibility(showMenuBarWhenFullscreenSetting.get());
  })

  win.on('leave-full-screen', () => {
    win.setMenuBarVisibility(true);
  })

  // this is deprecated but setWindowOpenHandler was not working
  win.webContents.on('new-window', (e, url) => {
    e.preventDefault();

    if (!url.includes(indexFilePath)) shell.openExternal(url);
  })

  ipcMain.on(EVENTS.PROMPT, (event, args) => {
    dialog.showMessageBox(win, {
      type: 'question',
      buttons: args.buttons,
      title: args.title,
      message: args.message
    }).then(({ response }) => {
      event.reply(EVENTS.PROMPT_REPLY, { event: args.event, response, options: args.options ?? {} });
    })
  })

  win.on('close', (e) => {
    if (showExitPrompt) {
      if (win.webContents.getURL().toLowerCase().includes(`/#${PATHS.WHITEBOARD}`)) {
        e.preventDefault(); // Prevents the window from closing
        dialog.showMessageBox(win, {
          type: 'question',
          buttons: ['No', 'Yes'],
          title: 'Quit?',
          message: 'Unsaved data will be lost. Are you sure you want to quit?'
        }).then(({ response }) => {
          if (response === 1) { // Runs the following if 'Yes' is clicked
            showExitPrompt = false;
            win.close();
          }
        })
      }
    }
  })

  win.webContents.on('did-finish-load', () => {
    // if (splashWin !== null) if (!splashWin.isDestroyed()) splashWin.close();
    win.show();
  })
}
