const { app, BrowserWindow } = require('electron');

function createMainWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env === 'DEVELOPMENT') win.loadURL('localhost:3000');
  else win.loadFile('public/index.html');
  win.removeMenu();
}
app.setName('Rainbow Board');
app.whenReady().then(() => {
})

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
