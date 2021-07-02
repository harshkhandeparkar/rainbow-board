import packageFile from '../../../package.json';
import { shell, Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

import { showAboutDialog } from './aboutDialog';
import { menuClickEvents } from '../events/menuClickEvents';
import * as EVENTS from '../../common/constants/eventNames';
import * as PATHS from '../../common/constants/paths';

import {  shortcutsManager } from '../../common/code/shortcuts';

const { website, repository, version, discordInvite } = packageFile;

export function setWindowMenu(
  win: BrowserWindow,
  isDev: boolean,
  path: string
) {
  const windowMenuTemplate: MenuItemConstructorOptions[] = [
    {
      type: 'submenu',
      label: '&File',
      submenu: [
        {
          label: 'Start New Whiteboard',
          accelerator:  shortcutsManager.shortcuts.START_NEW.accelerator,
          click: () => menuClickEvents.fire(EVENTS.NEW_WHITEBOARD, {}),
          enabled: path !== `/${PATHS.WHITEBOARD}`,
          visible: path !== `/${PATHS.WHITEBOARD}`
        },
        {
          label: 'Open File...',
          accelerator:  shortcutsManager.shortcuts.OPEN.accelerator,
          click: () => menuClickEvents.fire(EVENTS.OPEN, {}),
          enabled: path !== `/${PATHS.WHITEBOARD}`,
          visible: path !== `/${PATHS.WHITEBOARD}`
        },
        {
          label: 'Save File...',
          accelerator:  shortcutsManager.shortcuts.SAVE.accelerator,
          click: () => menuClickEvents.fire(EVENTS.SAVE, {}),
          visible: path === `/${PATHS.WHITEBOARD}`,
          enabled: path === `/${PATHS.WHITEBOARD}`
        },
        {
          label: 'Export Page...',
          accelerator:  shortcutsManager.shortcuts.EXPORT_PAGE.accelerator,
          registerAccelerator: false,
          visible: path === `/${PATHS.WHITEBOARD}`,
          enabled: path === `/${PATHS.WHITEBOARD}`,
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
        {
          label: 'Settings',
          accelerator:  shortcutsManager.shortcuts.SETTINGS.accelerator,
          click: () => menuClickEvents.fire(EVENTS.GO, {to: path === `/${PATHS.SETTINGS}` ? `/${PATHS.HOME}` : `/${PATHS.SETTINGS}`})
        },
        { type: 'separator' },
        { label: 'Quit', accelerator:  shortcutsManager.shortcuts.QUIT.accelerator, click: () => win.isClosable() && win.close() }
      ]
    },
    {
      type: 'submenu',
      label: '&Edit',
      visible: path === `/${PATHS.WHITEBOARD}`,
      enabled: path === `/${PATHS.WHITEBOARD}`,
      submenu: [
        { label: 'Undo', accelerator:  shortcutsManager.shortcuts.UNDO.accelerator, click: () => menuClickEvents.fire(EVENTS.UNDO, {}) },
        { label: 'Redo', accelerator:  shortcutsManager.shortcuts.REDO.accelerator, click: () => menuClickEvents.fire(EVENTS.REDO, {}) },
        { type: 'separator' },
        { label: 'Add Page', accelerator:  shortcutsManager.shortcuts.ADD_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.ADD_PAGE, {}) },
        { label: 'Clear Page', accelerator:  shortcutsManager.shortcuts.CLEAR_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.CLEAR_PAGE, {}) },
        { label: 'Delete Page', accelerator:  shortcutsManager.shortcuts.DELETE_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.DELETE_PAGE, {}) },
        { type: 'separator' },
        { label: 'Next Page', accelerator:  shortcutsManager.shortcuts.NEXT_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.NEXT_PAGE, {}) },
        { label: 'Previous Page', accelerator:  shortcutsManager.shortcuts.PREV_PAGE.accelerator, click: () => menuClickEvents.fire(EVENTS.PREVIOUS_PAGE, {}) },
        { type: 'separator' },
        { label: 'Color Palette', accelerator:  shortcutsManager.shortcuts.COLOR_PALETTE.accelerator, click: () => menuClickEvents.fire(EVENTS.TOGGLE_COLOR_PALETTE, {}) },
        { label: 'Previous Tool', accelerator:  shortcutsManager.shortcuts.PREV_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.PREV_TOOL, {}) },
        { type: 'separator' },
        { label: 'Brush Tool', accelerator:  shortcutsManager.shortcuts.BRUSH_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'brush'}) },
        { label: 'Eraser', accelerator:  shortcutsManager.shortcuts.ERASER_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'eraser'}) },
        { label: 'Line Tool', accelerator:  shortcutsManager.shortcuts.LINE_TOOL.accelerator, click: () => menuClickEvents.fire(EVENTS.SET_TOOL, {tool: 'line'}) },
      ]
    },
    {
      type: 'submenu',
      label: '&View',
      submenu: [
        {
          label: 'Toggle Fullscreen',
          accelerator:  shortcutsManager.shortcuts.FULLSCREEN.accelerator,
          click: () => win.setFullScreen(!win.isFullScreen())
        }
      ]
    },
    {
      type: 'submenu',
      label: '&Go',
      submenu: [
        { label: 'Home', click: () => menuClickEvents.fire(EVENTS.GO, {to: '/'}), accelerator:  shortcutsManager.shortcuts.GO_HOME.accelerator },
        { label: `What's New`, click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.WHATS_NEW}`}) },
        { label: 'Credits', click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.CREDITS}`}) },
        { label: 'Settings', click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.SETTINGS}`}) },
        { label: 'Keyboard Shortcuts', click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.SHORTCUTS}`}) }
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
        { label: 'Keyboard Shortcuts', click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.SHORTCUTS}`}) },
        { type: 'separator' },
        { label: 'Latest Release', click: () => shell.openExternal(repository + '/releases/latest') },
        { label: 'All Releases', click: () => shell.openExternal(repository + '/releases') },
        { type: 'separator' },
        { label: 'Credits', click: () => menuClickEvents.fire(EVENTS.GO, {to: `/${PATHS.CREDITS}`}) },
        { label: 'About', click: () => showAboutDialog(win) }
      ]
    }
  ]

  // Due to a bug in electron: https://github.com/electron/electron/issues/2895
  if (path !== `/${PATHS.WHITEBOARD}`) {
    delete windowMenuTemplate[windowMenuTemplate.findIndex((menuItem) => menuItem.label.toLowerCase() === '&edit')];
  }

  if (isDev) windowMenuTemplate.push({
    type: 'submenu',
    label: 'Developer',
    submenu: [
      { label: 'Toggle Dev Tools', accelerator:  shortcutsManager.shortcuts.DEV_TOOLS.accelerator, click: () => win.webContents.toggleDevTools() },
      { label: 'Reload', accelerator:  shortcutsManager.shortcuts.RELOAD.accelerator, click: () => win.webContents.reload() }
    ]
  })

  win.setMenu(Menu.buildFromTemplate(windowMenuTemplate));
}
