import packageFile from '../../package.json';
import { shell, ipcMain, Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

import { showAboutDialog } from './util/aboutDialog';
import { menuClickEvents } from './events/menuClickEvents';
import * as EVENTS from '../common/constants/eventNames';

const { website, repository, version, discordInvite } = packageFile;

export function createWindowMenu(win: BrowserWindow, isDev: boolean) {
  const windowMenuTemplate: MenuItemConstructorOptions[] = [
    {
      type: 'submenu',
      label: '&File',
      submenu: [
        { label: 'Start New', accelerator: 'CmdOrCtrl + N', click: () => menuClickEvents.fire(EVENTS.NEW_PAGE, {}) },
        { label: 'Save Page', accelerator: 'CmdOrCtrl + S', click: () => menuClickEvents.fire(EVENTS.SAVE_PAGE, {}) },
        { type: 'separator' },
        { label: 'Settings', accelerator: 'CmdOrCtrl + ,', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/settings'}) },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl + Q', click: () => win.isClosable() && win.close() }
      ]
    },
    {
      type: 'submenu',
      label: '&Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl + Z', click: () => menuClickEvents.fire(EVENTS.UNDO, {}) },
        { label: 'Redo', accelerator: 'CmdOrCtrl + Y', click: () => menuClickEvents.fire(EVENTS.REDO, {}) },
        { type: 'separator' },
        { label: 'Add Page', accelerator: 'Plus', click: () => menuClickEvents.fire(EVENTS.ADD_PAGE, {}) },
        { label: 'Clear Page', accelerator: 'Delete', click: () => menuClickEvents.fire(EVENTS.CLEAR_PAGE, {}) },
        { label: 'Delete Page', accelerator: 'CmdOrCtrl + Delete', click: () => menuClickEvents.fire(EVENTS.DELETE_PAGE, {}) },
        { type: 'separator' },
        { label: 'Next Page', accelerator: 'Right', click: () => menuClickEvents.fire(EVENTS.NEXT_PAGE, {}) },
        { label: 'Previous Page', accelerator: 'Left', click: () => menuClickEvents.fire(EVENTS.PREVIOUS_PAGE, {}) },
        { type: 'separator' },
        { label: 'Color Palette', accelerator: 'CmdOrCtrl + P', click: () => menuClickEvents.fire(EVENTS.TOGGLE_COLOR_PALETTE, {}) },
        { label: 'Brush Tool', accelerator: 'CmdOrCtrl + 1', click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'brush'}) },
        { label: 'Eraser', accelerator: 'CmdOrCtrl + 2', click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'eraser'}) },
        { label: 'Line Tool', accelerator: 'CmdOrCtrl + 3', click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'line'}) },
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
        { label: 'Home', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/'}) },
        { label: `What's New`, click: () => menuClickEvents.fire(EVENTS.GO, {to: '/new'}) },
        { label: 'Credits', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/credits'}) },
        { label: 'Settings', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/settings'}) }
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
        { label: 'About', click: () => showAboutDialog(win) },
        { label: 'Credits', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/credits'}) }
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
    menuClickEvents.on(EVENTS.NEW_PAGE, 'hotkey-handler', () => event.reply(EVENTS.GO, {to: '/pages'}))
    menuClickEvents.on(EVENTS.ADD_PAGE, 'hotkey-handler', () => event.reply(EVENTS.ADD_PAGE));
    menuClickEvents.on(EVENTS.SAVE_PAGE, 'hotkey-handler', () => event.reply(EVENTS.SAVE_PAGE));

    // Submenu: Edit
    menuClickEvents.on(EVENTS.UNDO, 'hotkey-handler', () => event.reply(EVENTS.UNDO));
    menuClickEvents.on(EVENTS.REDO, 'hotkey-handler', () => event.reply(EVENTS.REDO));
    menuClickEvents.on(EVENTS.ADD_PAGE, 'hotkey-handler', () => event.reply(EVENTS.ADD_PAGE));
    menuClickEvents.on(EVENTS.NEXT_PAGE, 'hotkey-handler', () => event.reply(EVENTS.NEXT_PAGE));
    menuClickEvents.on(EVENTS.PREVIOUS_PAGE, 'hotkey-handler', () => event.reply(EVENTS.PREVIOUS_PAGE));
    menuClickEvents.on(EVENTS.CLEAR_PAGE, 'hotkey-handler', () => event.reply(EVENTS.CLEAR_PAGE));
    menuClickEvents.on(EVENTS.DELETE_PAGE, 'hotkey-handler', () => event.reply(EVENTS.DELETE_PAGE));
    menuClickEvents.on(EVENTS.TOGGLE_COLOR_PALETTE, 'hotkey-handler', () => event.reply(EVENTS.TOGGLE_COLOR_PALETTE));
    menuClickEvents.on(EVENTS.SET_TOOL, 'hotkey-handler', ({tool}) => event.reply(EVENTS.SET_TOOL, {tool}));

    // Submenu: Go
    menuClickEvents.on(EVENTS.GO, 'hotkey-handler', ({to}) => event.reply(EVENTS.GO, {to}));

    win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));
  })
}
