import { ipcMain, globalShortcut, BrowserWindow } from 'electron';
import { parse } from 'path';
import { existsSync } from 'fs';
import * as EVENTS from '../../common/constants/events';
import { shortcutsManager } from '../../common/code/shortcuts';
import { WHITEBOARD } from '../../common/constants/paths';
import { menuClickEvents } from '../events/menuClickEvents';
import { saveDialog } from './save';
import { open, openDialog } from './open';
import { ipcMainListen } from '../events/limitedIPC';

export function setHotkeys(win: BrowserWindow) {
  ipcMainListen('set-hotkeys', (event) => {
    // Submenu: File
    menuClickEvents.on(EVENTS.NEW_WHITEBOARD, 'hotkey-handler', () => event.reply(EVENTS.GO, {to: `/${WHITEBOARD}`}))
    menuClickEvents.on(EVENTS.ADD_PAGE, 'hotkey-handler', () => event.reply(EVENTS.ADD_PAGE, null));
    menuClickEvents.on(EVENTS.EXPORT_PAGE, 'hotkey-handler', ({type}) => event.reply(EVENTS.EXPORT_PAGE, {type}));
    menuClickEvents.on(EVENTS.SAVE, 'hotkey-handler', () => saveDialog(win, event));
    menuClickEvents.on(EVENTS.OPEN, 'hotkey-handler', () => openDialog(
      win,
      event,
      {
        title: 'Open Rainbow File',
        message: 'Select a `.rainbow` whiteboard file to open.',
        openDirectory: false,
        filters: [{name: 'Rainbow File', extensions: ['rainbow']}]
      },
      0
    ))
    globalShortcut.register(shortcutsManager.shortcuts.EXPORT_PAGE.accelerator, () => {
      event.reply(EVENTS.EXPORT_PAGE_DIALOG, null);
    })

    // Submenu: Edit
    menuClickEvents.on(EVENTS.UNDO, 'hotkey-handler', () => event.reply(EVENTS.UNDO, null));
    menuClickEvents.on(EVENTS.REDO, 'hotkey-handler', () => event.reply(EVENTS.REDO, null));
    menuClickEvents.on(EVENTS.ADD_PAGE, 'hotkey-handler', () => event.reply(EVENTS.ADD_PAGE, null));
    menuClickEvents.on(EVENTS.NEXT_PAGE, 'hotkey-handler', () => event.reply(EVENTS.NEXT_PAGE, null));
    menuClickEvents.on(EVENTS.PREVIOUS_PAGE, 'hotkey-handler', () => event.reply(EVENTS.PREVIOUS_PAGE, null));
    menuClickEvents.on(EVENTS.CLEAR_PAGE, 'hotkey-handler', () => event.reply(EVENTS.CLEAR_PAGE, null));
    menuClickEvents.on(EVENTS.DELETE_PAGE, 'hotkey-handler', () => event.reply(EVENTS.DELETE_PAGE, null));
    menuClickEvents.on(EVENTS.TOGGLE_COLOR_PALETTE, 'hotkey-handler', () => event.reply(EVENTS.TOGGLE_COLOR_PALETTE, null));
    menuClickEvents.on(EVENTS.SET_TOOL, 'hotkey-handler', ({tool}) => event.reply(EVENTS.SET_TOOL, {tool}));
    menuClickEvents.on(EVENTS.PREV_TOOL, 'hotkey-handler', () => event.reply(EVENTS.PREV_TOOL, null));

    // Submenu: Go
    menuClickEvents.on(EVENTS.GO, 'hotkey-handler', ({to}) => event.reply(EVENTS.GO, {to}));

    // Load With File
    const possibleFilePath = process.argv.find((arg) => {
      const pathData = parse(arg);
      return pathData.ext.toLowerCase() === '.rainbow' && existsSync(arg);
    })

    if (possibleFilePath !== undefined) {
      open(event, possibleFilePath, 0);
    }
  })
}
