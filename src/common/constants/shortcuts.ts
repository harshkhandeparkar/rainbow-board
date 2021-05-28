import { Accelerator } from 'electron';

export function getPlatformFormattedShortcutString(accelerator: Accelerator) {
  const CMD_CTRL = process.platform === 'darwin' ? 'CMD' : 'CTRL'

  return accelerator
    .toLowerCase()
    // Thanks to https://regex101.com
    .replace(/(cmdorctrl)|(commandorcontrol)/gmi, CMD_CTRL)
    .replace('plus', '+')
    .replace('right', 'right arrow')
    .replace('left', 'left arrow')
    .toUpperCase();
}

export class Shortcut {
  accelerator: Accelerator;
  platformFormattedString: string;

  constructor(accelerator: Accelerator) {
    this.accelerator = accelerator;
    this.platformFormattedString = getPlatformFormattedShortcutString(this.accelerator);
  }
}

// Menu: File
/** Start New Page */
export const START_NEW = new Shortcut('CmdOrCtrl + N');
/** Save as .rainbow file */
export const SAVE = new Shortcut('CmdOrCtrl + S');
/** Open .rainbow File */
export const OPEN = new Shortcut('CmdOrCtrl + O');
/** Export the current page, old shortcut */
export const EXPORT_PAGE = new Shortcut('CmdOrCtrl + E');
/** Open Settings */
export const SETTINGS = new Shortcut('CmdOrCtrl + ,');
/** Quit App */
export const QUIT = new Shortcut('CmdOrCtrl + Q');

// Menu: Edit
/** Undo */
export const UNDO = new Shortcut('CmdOrCtrl + Z');
/** Redo */
export const REDO = new Shortcut('CmdOrCtrl + Y');
/** Add New Page */
export const ADD_PAGE = new Shortcut('Plus');
/** Clear Page */
export const CLEAR_PAGE = new Shortcut('Delete');
/** Delete Page */
export const DELETE_PAGE = new Shortcut('CmdOrCtrl + Delete');
/** Next Page */
export const NEXT_PAGE = new Shortcut('Right');
/** Previous Page */
export const PREV_PAGE = new Shortcut('Left');
/** Toggle Color Palette */
export const COLOR_PALETTE = new Shortcut('CmdOrCtrl + P');
/** Use Brush Tool */
export const BRUSH_TOOL = new Shortcut('CmdOrCtrl + 1');
/** Use Line Tool */
export const LINE_TOOL = new Shortcut('CmdOrCtrl + 2');
/** Use Eraser Tool */
export const ERASER_TOOL = new Shortcut('CmdOrCtrl + 3');
/** Switch to previous tool */
export const PREV_TOOL = new Shortcut('CmdOrCtrl + Space');

// Menu: Go
/** Go Home */
export const GO_HOME = new Shortcut('CmdOrCtrl + Esc');

// Menu: View
/** Toggle Fullscreen */
export const FULLSCREEN = new Shortcut('F11');

// Menu: Developer
/** Toggle Dev Tools */
export const DEV_TOOLS = new Shortcut('CmdOrCtrl + Shift + I');
/** Reload */
export const RELOAD = new Shortcut('CmdOrCtrl + R');
