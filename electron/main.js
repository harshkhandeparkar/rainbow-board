const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createMainWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })

  console.log(isDev)

  win.loadURL(
    isDev
    ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  )

  
  win.removeMenu();
}
app.setName('Rainbow Board');
app.whenReady().then(createMainWindow)

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
