const { app, BrowserWindow, shell } = require('electron');
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

if (require('electron-squirrel-startup')) return app.quit();
