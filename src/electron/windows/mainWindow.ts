import { BrowserWindow, shell, dialog, ipcMain } from 'electron';
import { indexFilePath, iconPath } from '../constants/paths';
import { setWindowMenu } from '../util/windowMenu';
import { setHotkeys } from '../util/hotkeys';
import * as EVENTS from '../../common/constants/eventNames';
import { IPlugin } from '../../common/types/plugins';

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
    icon: iconPath
  })

  win.maximize();

  ipcMain.on('get-plugins', (e) => {
    e.returnValue = plugins.filter(plugin => plugin.usable);
  })

  win.loadFile(indexFilePath);

  setWindowMenu(win, isDev, '/');
  setHotkeys(win);

  ipcMain.on(EVENTS.LOCATION_CHANGED, (e, {path}: {path: string}) => {
    setWindowMenu(win, isDev, path);
  })

  win.on('enter-full-screen', () => {
    win.setMenuBarVisibility(false);
  })

  win.on('leave-full-screen', () => {
    win.setMenuBarVisibility(true);
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);

    return {
      action: 'deny'
    }
  })

  ipcMain.on(EVENTS.PROMPT, (event, args) => {
    dialog.showMessageBox(win, {
      type: 'question',
      buttons: args.buttons,
      title: args.title,
      message: args.message
    }).then(({ response }) => {
      event.reply(EVENTS.PROMPT_REPLY, { event: args.event, response, options: args.options || {} });
    })
  })

  win.on('close', (e) => {
    if (showExitPrompt) {
      if (win.webContents.getURL().toLowerCase().includes('#/pages')) {
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
    if (splashWin !== null) if (!splashWin.isDestroyed()) splashWin.close();
    win.show();
  })
}
