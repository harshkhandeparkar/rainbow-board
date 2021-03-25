const { app, BrowserWindow, shell, dialog, ipcMain, Menu } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function makeSplashScreen() {
  const splashWin = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    resizable: false,
    frame: false,
    show: false,
    icon: path.join(__dirname, 'icon.png')
  })

  splashWin.removeMenu();
  splashWin.loadFile(path.join(__dirname, 'splash.html'));

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
    icon: path.join(__dirname, 'icon.png')
  })

  win.loadFile(path.join(__dirname, 'index.html'));

  const windowMenuTemplate = [
    {
      type: 'submenu',
      label: 'File',
      submenu: [
        {
          label: 'Save Page',
          accelerator: 'CommandOrControl + S'
        }
      ]
    },
    {
      type: 'submenu',
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CommandOrControl + Z'
        },
        {
          label: 'Redo',
          accelerator: 'CommandOrControl + Shift + Z'
        },
        {
          label: 'Clear Page'
        },
        {
          label: 'Add Page'
        },
        {
          label: 'Delete Page'
        }
      ]
    },
    {
      type: 'submenu',
      label: 'Go',
      submenu: [
        {
          label: 'Home'
        },
        {
          label: 'Next Page'
        },
        {
          label: 'Previous Page'
        }
      ]
    }
  ]

  win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));

  ipcMain.on('set-hotkeys', (event) => {
    // Submenu: File
    windowMenuTemplate[0].submenu[0].click = (e) => {
      event.reply('save');
    }

    // Submenu: Edit
    windowMenuTemplate[1].submenu[0].click = (e) => {
      event.reply('undo');
    }
    windowMenuTemplate[1].submenu[1].click = (e) => {
      event.reply('redo');
    }
    windowMenuTemplate[1].submenu[2].click = (e) => {
      event.reply('clear');
    }
    windowMenuTemplate[1].submenu[3].click = (e) => {
      event.reply('add');
    }
    windowMenuTemplate[1].submenu[4].click = (e) => {
      event.reply('delete');
    }

    // Submenu: Go
    windowMenuTemplate[2].submenu[0].click = (e) => {
      event.reply('home');
    }
    windowMenuTemplate[2].submenu[1].click = (e) => {
      event.reply('next');
    }
    windowMenuTemplate[2].submenu[2].click = (e) => {
      event.reply('prev');
    }

    win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));
  })

  if (isDev) win.webContents.openDevTools();

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
      event.reply('prompt-reply', { event: args.event, response });
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
