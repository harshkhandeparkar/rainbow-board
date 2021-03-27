const { website, repository, version, discordInvite } = require('../package.json');
const { shell, ipcMain, Menu } = require('electron');

const { showAboutDialog } = require('./aboutDialog');

module.exports = {
  createWindowMenu: (win, isDev) => {
    const windowMenuTemplate = [
      {
        type: 'submenu',
        label: '&File',
        submenu: [
          { label: 'Start New', accelerator: 'CmdOrCtrl + N' },
          { label: 'Save Page', accelerator: 'CmdOrCtrl + S' },
          { type: 'separator' },
          { label: 'Quit', accelerator: 'CmdOrCtrl + Q', click: () => win.isClosable() && win.close() }
        ]
      },
      {
        type: 'submenu',
        label: '&Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl + Z' },
          { label: 'Redo', accelerator: 'CmdOrCtrl + Y' },
          { type: 'separator' },
          { label: 'Add Page', accelerator: 'Plus' },
          { label: 'Clear Page', accelerator: 'Delete' },
          { label: 'Delete Page', accelerator: 'CmdOrCtrl + Delete' },
          { type: 'separator' },
          { label: 'Next Page', accelerator: 'Right' },
          { label: 'Previous Page', accelerator: 'Left' },
          { type: 'separator' },
          { label: 'Color Palette', accelerator: 'CmdOrCtrl + P' },
          { label: 'Brush Tool', accelerator: 'CmdOrCtrl + 1' },
          { label: 'Eraser', accelerator: 'CmdOrCtrl + 2' },
          { label: 'Line Tool', accelerator: 'CmdOrCtrl + 3' },
        ]
      },
      {
        type: 'submenu',
        label: '&View',
        submenu: [
          {
            label: 'Toggle Fullscreen',
            accelerator: 'F11',
            click: () => win.setFullScreen(!win.isFullScreen())
          }
        ]
      },
      {
        type: 'submenu',
        label: '&Go',
        submenu: [
          { label: 'Home' },
          { label: `What's New` },
          { label: 'Credits' }
        ]
      },
      {
        type: 'submenu',
        label: '&Help',
        submenu: [
          { label: 'Website', click: () => shell.openExternal(website) },
          { label: 'Github', click: () => shell.openExternal(repository) },
          { label: 'Discord Server', click: () => shell.openExternal(discordInvite) },
          { label: 'Release Notes', click: () => shell.openExternal(repository + '/releases/v' + version) },
          { type: 'separator' },
          { label: 'Latest Release', click: () => shell.openExternal(repository + '/releases/latest') },
          { label: 'All Releases', click: () => shell.openExternal(repository + '/releases') },
          { type: 'separator' },
          { label: 'About', click: () => showAboutDialog(win) }
        ]
      }
    ]

    if (isDev) windowMenuTemplate.push({
      type: 'submenu',
      label: 'Developer',
      submenu: [
        { label: 'Toggle Dev Tools', accelerator: 'CmdOrCtrl + Shift + I', click: () => win.webContents.toggleDevTools() },
        { label: 'Reload', accelerator: 'CmdOrCtrl + R', click: () => win.webContents.reload() }
      ]
    })

    win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));

    win.on('enter-full-screen', () => {
      win.setMenuBarVisibility(false);
    })
    win.on('leave-full-screen', () => {
      win.setMenuBarVisibility(true);
    })

    ipcMain.on('set-hotkeys', (event) => {
      // Submenu: File
      windowMenuTemplate[0].submenu[0].click = () => event.reply('go-pages');
      windowMenuTemplate[0].submenu[1].click = () => event.reply('save');

      // Submenu: Edit
      windowMenuTemplate[1].submenu[0].click = () => event.reply('undo');
      windowMenuTemplate[1].submenu[1].click = () => event.reply('redo');
      windowMenuTemplate[1].submenu[3].click = () => event.reply('add');
      windowMenuTemplate[1].submenu[4].click = () => event.reply('clear');
      windowMenuTemplate[1].submenu[5].click = () => event.reply('delete');
      windowMenuTemplate[1].submenu[7].click = () => event.reply('next');
      windowMenuTemplate[1].submenu[8].click = () => event.reply('prev');
      windowMenuTemplate[1].submenu[10].click = () => event.reply('color-palette');
      windowMenuTemplate[1].submenu[11].click = () => event.reply('set-tool', { tool: 'brush' });
      windowMenuTemplate[1].submenu[12].click = () => event.reply('set-tool', { tool: 'eraser' });
      windowMenuTemplate[1].submenu[13].click = () => event.reply('set-tool', { tool: 'line' });

      // Submenu: Go
      windowMenuTemplate[3].submenu[0].click = () => event.reply('go-home');
      windowMenuTemplate[3].submenu[1].click = () => event.reply('go-whatsnew');
      windowMenuTemplate[3].submenu[2].click = () => event.reply('go-credits');

      win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));
    })
  }
}
