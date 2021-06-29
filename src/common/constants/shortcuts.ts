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
  desc: string;

  /**
   *
   * @param accelerator Electron accelerator string
   * @param desc Description
   */
  constructor(accelerator: Accelerator, desc: string) {
    this.accelerator = accelerator;
    this.platformFormattedString = getPlatformFormattedShortcutString(this.accelerator);
    this.desc = desc;
  }
}

// Menu: File
/** Start New Page */
export const START_NEW = new Shortcut('CmdOrCtrl + N', 'Start new whiteboard');
/** Save as .rainbow file */
export const SAVE = new Shortcut('CmdOrCtrl + S', 'Save whiteboard as a file');
/** Open .rainbow File */
export const OPEN = new Shortcut('CmdOrCtrl + O', 'Open saved whiteboard file');
/** Export the current page, old shortcut */
export const EXPORT_PAGE = new Shortcut('CmdOrCtrl + E', 'Export current page as an image');
/** Open Settings */
export const SETTINGS = new Shortcut('CmdOrCtrl + ,', 'Open settings screen');
/** Quit App */
export const QUIT = new Shortcut('CmdOrCtrl + Q', 'Quit Rainbow Board');

// Menu: Edit
/** Undo */
export const UNDO = new Shortcut('CmdOrCtrl + Z', 'Undo');
/** Redo */
export const REDO = new Shortcut('CmdOrCtrl + Y', 'Redo');
/** Add New Page */
export const ADD_PAGE = new Shortcut('Plus', 'Add a new page');
/** Clear Page */
export const CLEAR_PAGE = new Shortcut('Delete', 'Cear page');
/** Delete Page */
export const DELETE_PAGE = new Shortcut('CmdOrCtrl + Delete', 'Delete page');
/** Next Page */
export const NEXT_PAGE = new Shortcut('Right', 'Next page');
/** Previous Page */
export const PREV_PAGE = new Shortcut('Left', 'Previous page');
/** Toggle Color Palette */
export const COLOR_PALETTE = new Shortcut('CmdOrCtrl + P', 'Toggle color palette');
/** Use Brush Tool */
export const BRUSH_TOOL = new Shortcut('CmdOrCtrl + 1', 'Select brush tool');
/** Use Line Tool */
export const LINE_TOOL = new Shortcut('CmdOrCtrl + 2', 'Select line tool');
/** Use Eraser Tool */
export const ERASER_TOOL = new Shortcut('CmdOrCtrl + 3', 'Select eraser tool');
/** Switch to previous tool */
export const PREV_TOOL = new Shortcut('Alt + T', 'Switch to previous tool');

// Menu: Go
/** Go Home */
export const GO_HOME = new Shortcut('CmdOrCtrl + Esc', 'Go to home screen');

// Menu: View
/** Toggle Fullscreen */
export const FULLSCREEN = new Shortcut('F11', 'Toggle fullscren');

// Menu: Developer
/** Toggle Dev Tools */
export const DEV_TOOLS = new Shortcut('CmdOrCtrl + Shift + I', 'Toggle developer tools');
/** Reload */
export const RELOAD = new Shortcut('CmdOrCtrl + R', 'Reload');
