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
  identifier: string;
  fixed: boolean;

  default: Accelerator;
  defaultPlatformString: string;
  /**
   * @param identifier Settings key. No spaces or hyphens
   * @param accelerator Electron accelerator string
   * @param desc Description
   */
  constructor(identifier: string, accelerator: Accelerator, desc: string, fixed = false) {
    this.accelerator = accelerator;
    this.platformFormattedString = getPlatformFormattedShortcutString(this.accelerator);
    this.default = accelerator;
    this.defaultPlatformString = getPlatformFormattedShortcutString(this.default);

    this.identifier = identifier;
    this.desc = desc;
    this.fixed = fixed;
  }

  updateShortcut(newAccelerator: Accelerator) {
    this.accelerator = newAccelerator;
    this.platformFormattedString = getPlatformFormattedShortcutString(this.accelerator);
  }

  restoreDefault() {
    this.updateShortcut(this.default);
  }
}

// Menu: File
/** Start New Page */
export const START_NEW = new Shortcut('start_new', 'CmdOrCtrl + N', 'Start new whiteboard');
/** Save as .rainbow file */
export const SAVE = new Shortcut('save', 'CmdOrCtrl + S', 'Save whiteboard as a file');
/** Open .rainbow File */
export const OPEN = new Shortcut('open', 'CmdOrCtrl + O', 'Open saved whiteboard file');
/** Export the current page, old shortcut */
export const EXPORT_PAGE = new Shortcut('export_page', 'CmdOrCtrl + E', 'Export current page as an image');
/** Open Settings */
export const SETTINGS = new Shortcut('settings', 'CmdOrCtrl + ,', 'Open settings screen');
/** Quit App */
export const QUIT = new Shortcut('quit', 'CmdOrCtrl + Q', 'Quit Rainbow Board');

// Menu: Edit
/** Undo */
export const UNDO = new Shortcut('undo', 'CmdOrCtrl + Z', 'Undo');
/** Redo */
export const REDO = new Shortcut('redo', 'CmdOrCtrl + Y', 'Redo');
/** Add New Page */
export const ADD_PAGE = new Shortcut('add_page', 'Plus', 'Add a new page');
/** Clear Page */
export const CLEAR_PAGE = new Shortcut('clear_page', 'Delete', 'Cear page');
/** Delete Page */
export const DELETE_PAGE = new Shortcut('delete_page', 'CmdOrCtrl + Delete', 'Delete page');
/** Next Page */
export const NEXT_PAGE = new Shortcut('next_page', 'Right', 'Next page');
/** Previous Page */
export const PREV_PAGE = new Shortcut('prev_page', 'Left', 'Previous page');
/** Toggle Color Palette */
export const COLOR_PALETTE = new Shortcut('color_palette', 'CmdOrCtrl + P', 'Toggle color palette');
/** Use Brush Tool */
export const BRUSH_TOOL = new Shortcut('brush_tool', 'CmdOrCtrl + 1', 'Select brush tool');
/** Use Line Tool */
export const LINE_TOOL = new Shortcut('line_tool', 'CmdOrCtrl + 2', 'Select line tool');
/** Use Eraser Tool */
export const ERASER_TOOL = new Shortcut('eraser_tool', 'CmdOrCtrl + 3', 'Select eraser tool');
/** Use Text Tool */
export const TEXT_TOOL = new Shortcut('text_tool', 'CmdOrCtrl + 4', 'Select text tool');
/** Switch to previous tool */
export const PREV_TOOL = new Shortcut('prev_tool', 'Alt + T', 'Switch to previous tool');

// Menu: Go
/** Go Home */
export const GO_HOME = new Shortcut('go_home', 'CmdOrCtrl + Esc', 'Go to home screen');

// Menu: View
/** Toggle Fullscreen */
export const FULLSCREEN = new Shortcut('fullscreen', 'F11', 'Toggle fullscren');

// Menu: Developer
/** Toggle Dev Tools */
export const DEV_TOOLS = new Shortcut('dev_tools', 'CmdOrCtrl + Shift + I', 'Toggle developer tools', true);
/** Reload */
export const RELOAD = new Shortcut('reload', 'CmdOrCtrl + R', 'Reload', true);
