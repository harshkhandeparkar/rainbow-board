import { BrowserWindow, shell, dialog, ipcMain, app } from 'electron';
import { indexFilePath, iconPath } from '../constants/paths';
import { setWindowMenu } from '../util/windowMenu';
import { setHotkeys } from '../util/hotkeys';
import * as EVENTS from '../../common/constants/events';
import * as PATHS from '../../common/constants/paths';
import { IPlugin } from '../../common/types/plugins';
import {
  startFullscreenSetting,
  startMaximizedSetting,
  showMenuBarWhenFullscreenSetting,
  useGnomeStyleHeaderbarSetting
} from '../../common/code/settings';
import { ipcListen } from '../events/limitedIPC';

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

  ipcListen(EVENTS.GET_PLUGINS, (e) => {
    e.returnValue = plugins.filter(plugin => plugin.usable);
  })

  win.loadFile(indexFilePath);

  setWindowMenu(win, isDev, `/${PATHS.HOME}`);
  setHotkeys(win);

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
