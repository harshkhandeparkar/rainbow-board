const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function makeSplashScreen() {
  const splashWin = new BrowserWindow({
    width: 500,
    height: 500,
    center: true,
    resizable: false,
    frame: false,
    show: false,
    icon: path.join(__dirname, 'logo512.png')
  })

  splashWin.removeMenu();
  splashWin.loadFile(
    isDev ? path.join(__dirname, 'splash.html')
    : path.join(__dirname, '..', 'build', 'splash.html')
  )

  splashWin.webContents.on('did-finish-load', () => {
    splashWin.show();
  })

  return splashWin;
}

function createMainWindow(splashWin) {
  const win = new BrowserWindow({
    webPreferences: {
      devTools: isDev,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false,
    icon: path.join(__dirname, 'logo512.png')
  })

  win.loadURL(
    isDev
    ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'index.html')}`
  )

  win.removeMenu();

  if (isDev) win.webContents.openDevTools();

  win.webContents.setWindowOpenHandler((e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  })

  app.showExitPrompt = true;

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

app.setName('Rainbow Board');

app.whenReady().then(() => {
  const splashWin = makeSplashScreen();
  createMainWindow(splashWin);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
})
