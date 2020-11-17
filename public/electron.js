const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createMainWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      devTools: isDev
    },
    icon: path.join(__dirname, 'public', 'logo512.png')
  })

  win.loadURL(
    isDev
    ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '..', 'build', 'index.html')}`
  )

  win.removeMenu();

  if (isDev) win.webContents.openDevTools();

  win.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  })

  // Inside main/index.js, where BrowserWindow is initialized
  app.showExitPrompt = true;
  win.on('close', (e) => {
    if (app.showExitPrompt) {
      if (win.webContents.getURL().includes('/#/pages')) {
        e.preventDefault(); // Prevents the window from closing
        dialog.showMessageBox({
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Unsaved data will be lost. Are you sure you want to quit?'
        }, (response) => {
          if (response === 0) { // Runs the following if 'Yes' is clicked
            app.showExitPrompt = false;
            win.close();
          }
        })
      }
    }
  })
}
app.setName('Rainbow Board');
app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
})

