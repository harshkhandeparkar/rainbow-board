const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { existsSync, mkdirSync } = require('fs');

const loadPlugins = require('./plugins');
const makeSplashScreen = require('./splash');
const createMainWindow = require('./mainWindow.js');

if (isDev) {
  const devUserDataPath = path.join(app.getPath('appData'), 'rainbow-board-dev');
  if (!existsSync(devUserDataPath)) mkdirSync(devUserDataPath);

  app.setPath('userData', devUserDataPath);
}

let plugins = [];
const pluginsDir = path.join(app.getPath('userData'), 'plugins');

loadPlugins(plugins, pluginsDir);

app.setName('Rainbow Board');

app.whenReady().then(() => {
  const splashWin = makeSplashScreen();
  createMainWindow(app, isDev, plugins, splashWin);
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
