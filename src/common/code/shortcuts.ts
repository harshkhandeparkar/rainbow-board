import { SHORTCUTS_SETTING_KEY } from '../constants/settings';

import {
  START_NEW,
  SAVE,
  OPEN,
  EXPORT_PAGE,
  SETTINGS,
  QUIT,

  UNDO,
  REDO,
  ADD_PAGE,
  CLEAR_PAGE,
  DELETE_PAGE,
  NEXT_PAGE,
  PREV_PAGE,

  COLOR_PALETTE,
  BRUSH_TOOL,
  LINE_TOOL,
  ERASER_TOOL,
  PREV_TOOL,
  GO_HOME,

  FULLSCREEN,

  DEV_TOOLS,
  RELOAD
} from '../constants/shortcuts';

import { setSync, getSync, hasSync } from 'electron-settings';
import { Accelerator } from 'electron';

if (!hasSync(SHORTCUTS_SETTING_KEY)) setSync(SHORTCUTS_SETTING_KEY, {});

type shortcutName =
  'START_NEW' |
  'SAVE' |
  'OPEN' |
  'EXPORT_PAGE' |
  'SETTINGS' |
  'QUIT' |

  'UNDO' |
  'REDO' |
  'ADD_PAGE' |
  'CLEAR_PAGE' |
  'DELETE_PAGE' |
  'NEXT_PAGE' |
  'PREV_PAGE' |

  'COLOR_PALETTE' |
  'BRUSH_TOOL' |
  'LINE_TOOL' |
  'ERASER_TOOL' |
  'PREV_TOOL' |
  'GO_HOME' |

  'FULLSCREEN' |

  'DEV_TOOLS' |
  'RELOAD';

class ShortcutsManager {
  shortcuts = {
    START_NEW,
    SAVE,
    OPEN,
    EXPORT_PAGE,
    SETTINGS,
    QUIT,

    UNDO,
    REDO,
    ADD_PAGE,
    CLEAR_PAGE,
    DELETE_PAGE,
    NEXT_PAGE,
    PREV_PAGE,

    COLOR_PALETTE,
    BRUSH_TOOL,
    LINE_TOOL,
    ERASER_TOOL,
    PREV_TOOL,
    GO_HOME,

    FULLSCREEN,

    DEV_TOOLS,
    RELOAD
  }

  constructor() {
    Object.keys(this.shortcuts).forEach((key: shortcutName) => {
      const shortcut = this.shortcuts[key];

      if (!shortcut.fixed) {
        const settingsKey = `${SHORTCUTS_SETTING_KEY}.${shortcut.identifier}`;

        if (!hasSync(settingsKey)) {
          setSync(settingsKey, shortcut.accelerator as string);
        }
        else {
          shortcut.updateShortcut(getSync(settingsKey) as Accelerator);
        }
      }
    })
  }

  updateShortcut(name: shortcutName, newValue: Accelerator) {
    this.shortcuts[name].updateShortcut(newValue);
    setSync(`${SHORTCUTS_SETTING_KEY}.${this.shortcuts[name].identifier}`, newValue as string);
  }

  restoreDefault(name: shortcutName) {
    this.shortcuts[name].restoreDefault();
    setSync(`${SHORTCUTS_SETTING_KEY}.${this.shortcuts[name].identifier}`, this.shortcuts[name].default as string);
  }

  restoreAllDefaults() {
    Object.keys(this.shortcuts).forEach((key: shortcutName) => {
      const shortcut = this.shortcuts[key];

      if (shortcut.accelerator != shortcut.default) {
        const settingsKey = `${SHORTCUTS_SETTING_KEY}.${shortcut.identifier}`;

        shortcut.restoreDefault();
        setSync(settingsKey, shortcut.default as string);
      }
    })
  }
}

export const shortcutsManager = new ShortcutsManager();
