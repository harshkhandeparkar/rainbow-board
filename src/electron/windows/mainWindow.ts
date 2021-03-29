import { BrowserWindow, shell, dialog, ipcMain } from 'electron';
import { Plugin } from '../../renderer/util/plugins';
import { indexFilePath, iconPath } from '../constants/paths';
import { createWindowMenu } from '../windowMenu';
import * as EVENTS from '../../common/constants/eventNames';

let showExitPrompt = true;

export function createMainWindow(
  isDev: boolean,
  plugins: Plugin[],
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

  ipcMain.on('get-plugins', (e) => {
    e.returnValue = plugins.filter(plugin => plugin.usable);
  })

  win.loadFile(indexFilePath);

  createWindowMenu(win, isDev);

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);

    return {
      action: 'allow'
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
