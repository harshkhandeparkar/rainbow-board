const { BrowserWindow, shell, dialog, ipcMain } = require('electron');
const { indexFilePath, iconPath } = require('./paths');
const { createWindowMenu } = require('./windowMenu');

module.exports = function createMainWindow(app, isDev, plugins, splashWin) {
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

  win.webContents.setWindowOpenHandler((e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  })

  app.showExitPrompt = true;

  ipcMain.on('prompt', (event, args) => {
    dialog.showMessageBox(win, {
      type: 'question',
      buttons: args.buttons,
      title: args.title,
      message: args.message
    }).then(({ response }) => {
      event.reply('prompt-reply', { event: args.event, response, options: args.options });
    })
  })

  win.on('close', (e) => {
    if (app.showExitPrompt) {
      if (win.webContents.getURL().toLowerCase().includes('#/pages')) {
        e.preventDefault(); // Prevents the window from closing
        dialog.showMessageBox(win, {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Quit?',
          message: 'Unsaved data will be lost. Are you sure you want to quit?'
        }).then(({ response }) => {
          if (response === 0) { // Runs the following if 'Yes' is clicked
            app.showExitPrompt = false;
            win.close();
          }
        })
      }
    }
  })

  win.webContents.on('did-finish-load', () => {
    if (splashWin) if (!splashWin.isDestroyed()) splashWin.close();
    win.show();
  })
}
