import packageFile from '../../package.json';
import { shell, ipcMain, Menu, BrowserWindow, MenuItemConstructorOptions, globalShortcut } from 'electron';

import { showAboutDialog } from './util/aboutDialog';
import { menuClickEvents } from './events/menuClickEvents';
import * as EVENTS from '../common/constants/eventNames';
import * as SHORTCUTS from '../common/constants/shortcuts';

const { website, repository, version, discordInvite } = packageFile;

export function createWindowMenu(win: BrowserWindow, isDev: boolean) {
  const windowMenuTemplate: MenuItemConstructorOptions[] = [
    {
      type: 'submenu',
      label: '&File',
      submenu: [
        { label: 'Start New', accelerator: SHORTCUTS.START_NEW.accelerator, click: () => menuClickEvents.fire(EVENTS.NEW_PAGE, {}) },
        // { label: 'Save', accelerator: 'CmdOrCtrl + E', click: () => menuClickEvents.fire(EVENTS.SAVE_PAGE, {}) },
        {
          label: 'Export Page...',
          accelerator: SHORTCUTS.EXPORT_PAGE.accelerator,
          type: 'submenu',
          submenu: [
            {
              label: 'PNG',
              click: () => menuClickEvents.fire(EVENTS.EXPORT_PAGE, { type: 'png' })
            },
            {
              label: 'SVG',
              click: () => menuClickEvents.fire(EVENTS.EXPORT_PAGE, { type: 'svg' })
            }
          ]
        },
        { type: 'separator' },
        { label: 'Settings', accelerator: SHORTCUTS.SETTINGS.accelerator, click: () => menuClickEvents.fire(EVENTS.GO, {to: '/settings'}) },
        { type: 'separator' },
        { label: 'Quit', accelerator: SHORTCUTS.QUIT.accelerator, click: () => win.isClosable() && win.close() }
      ]
    },
    {
      type: 'submenu',
      label: '&Edit',
      submenu: [
        { label: 'Undo', accelerator: SHORTCUTS.UNDO.accelerator, click: () => menuClickEvents.fire(EVENTS.UNDO, {}) },
        { label: 'Redo', accelerator: SHORTCUTS.REDO.accelerator, click: () => menuClickEvents.fire(EVENTS.REDO, {}) },
        { type: 'separator' },
        { label: 'Add Page', accelerator: SHORTCUTS.ADD_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.ADD_PAGE, {}) },
        { label: 'Clear Page', accelerator: SHORTCUTS.CLEAR_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.CLEAR_PAGE, {}) },
        { label: 'Delete Page', accelerator: SHORTCUTS.DELETE_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.DELETE_PAGE, {}) },
        { type: 'separator' },
        { label: 'Next Page', accelerator: SHORTCUTS.NEXT_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.NEXT_PAGE, {}) },
        { label: 'Previous Page', accelerator: SHORTCUTS.PREV_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.PREVIOUS_PAGE, {}) },
        { type: 'separator' },
        { label: 'Color Palette', accelerator: SHORTCUTS.COLOR_PALETTE.accelerator, click: () => menuClickEvents.fire(EVENTS.TOGGLE_COLOR_PALETTE, {}) },
        { label: 'Brush Tool', accelerator: SHORTCUTS.BRUSH_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'brush'}) },
        { label: 'Eraser', accelerator: SHORTCUTS.ERASER_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'eraser'}) },
        { label: 'Line Tool', accelerator: SHORTCUTS.LINE_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'line'}) },
      ]
    },
    {
      type: 'submenu',
      label: '&View',
      submenu: [
        {
          label: 'Toggle Fullscreen',
          accelerator: SHORTCUTS.FULLSCREEN.accelerator,
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
        { label: 'Credits', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/credits'}) },
        { label: 'About', click: () => showAboutDialog(win) }
      ]
    }
  ]

  if (isDev) windowMenuTemplate.push({
    type: 'submenu',
    label: 'Developer',
    submenu: [
      { label: 'Toggle Dev Tools', accelerator: SHORTCUTS.DEV_TOOLS.accelerator, click: () => win.webContents.toggleDevTools() },
      { label: 'Reload', accelerator: SHORTCUTS.RELOAD.accelerator, click: () => win.webContents.reload() }
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
    menuClickEvents.on(EVENTS.EXPORT_PAGE, 'hotkey-handler', ({type}) => event.reply(EVENTS.EXPORT_PAGE, {type}));
    globalShortcut.register(SHORTCUTS.EXPORT_PAGE.accelerator, () => {
      event.reply(EVENTS.EXPORT_PAGE_DIALOG);
    })

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
