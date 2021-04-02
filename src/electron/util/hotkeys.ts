import { ipcMain, globalShortcut, BrowserWindow } from 'electron';
import { parse } from 'path';
import { existsSync } from 'fs';
import * as EVENTS from '../../common/constants/eventNames';
import { EXPORT_PAGE } from '../../common/constants/shortcuts';
import { menuClickEvents } from '../events/menuClickEvents';
import { saveDialog } from './save';
import { open, openDialog } from './open';

export function setHotkeys(win: BrowserWindow) {
  ipcMain.on('set-hotkeys', (event) => {
    // Submenu: File
    menuClickEvents.on(EVENTS.NEW_PAGE, 'hotkey-handler', () => event.reply(EVENTS.GO, {to: '/pages'}))
    menuClickEvents.on(EVENTS.ADD_PAGE, 'hotkey-handler', () => event.reply(EVENTS.ADD_PAGE));
    menuClickEvents.on(EVENTS.EXPORT_PAGE, 'hotkey-handler', ({type}) => event.reply(EVENTS.EXPORT_PAGE, {type}));
    menuClickEvents.on(EVENTS.SAVE, 'hotkey-handler', () => saveDialog(win, event));
    menuClickEvents.on(EVENTS.OPEN, 'hotkey-handler', () => openDialog(win, event));
    globalShortcut.register(EXPORT_PAGE.accelerator, () => {
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

    // Load With File
    const possibleFilePath = process.argv.find((arg) => {
      const pathData = parse(arg);
      return pathData.ext.toLowerCase() === '.rainbow' && existsSync(arg);
    })

    if (possibleFilePath !== undefined) {
      open(event, possibleFilePath);
    }
  })
}
