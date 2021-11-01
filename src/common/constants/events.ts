import { IpcRendererEvent, IpcMainEvent } from 'electron';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { EventTypes } from '../../electron/events/menuClickEvents';

export const NEW_WHITEBOARD = 'new-whiteboard';

/** EVENT: Export a page as an image */
export const EXPORT_PAGE = 'export-page';
/** EVENT: Open the export page dialog */
export const EXPORT_PAGE_DIALOG = 'export-page-dialog';

export const SAVE = 'save';
export const OPEN = 'open';

export const ADD_PAGE = 'add-page';
export const NEXT_PAGE = 'next-page';
export const PREVIOUS_PAGE = 'prev-page';
export const CLEAR_PAGE = 'clear-page';
export const DELETE_PAGE = 'delete-page';

export const UNDO = 'undo';
export const REDO = 'redo';

export const TOGGLE_COLOR_PALETTE = 'toggle-color-palette';
export const SET_TOOL = 'set-tool';
export const PREV_TOOL = 'prev-tool';

export const GO = 'go';
export const LOCATION_CHANGED = 'location-changed';

export const PROMPT = 'prompt';
export const PROMPT_REPLY = 'prompt-reply';

export const SET_HOTKEYS = 'set-hotkeys';

export const RESTART = 'restart';

export const MAXIMIZE_UNMAXIMIZE = 'maximize-unmaximize';
export const QUIT = 'quit';
export const MINIMIZE = 'minimize';

/** EVENT: Forcefully fire a menubar event */
export const FIRE_MENU_EVENT = 'fire-menu-event';

/** EVENT: Change the window title */
export const SET_WINDOW_TITLE = 'set-window-title';

export interface IPCEventArgs {
  [NEW_WHITEBOARD]: {};
  [ADD_PAGE]: {};

  [EXPORT_PAGE]: {};
  [EXPORT_PAGE_DIALOG]: {};

  [SAVE]: {};
  [OPEN]: {};

  [NEXT_PAGE]: {};
  [PREVIOUS_PAGE]: {};
  [CLEAR_PAGE]: {};
  [DELETE_PAGE]: {};
  [UNDO]: {};
  [REDO]: {};

  [TOGGLE_COLOR_PALETTE]: {};
  [SET_TOOL]: {
    tool: Tool
  };
  [PREV_TOOL]: {};

  [GO]: {};
  [LOCATION_CHANGED]: {
    path: string;
  };

  [RESTART]: {};
  [QUIT]: {};

  [PROMPT]: {
    event: string;
    buttons: string[];
    title: string;
    message: string;
    options: any;
  };
  [PROMPT_REPLY]: {
    event: string;
    response: number;
    options: any;
  };

  [FIRE_MENU_EVENT]: {
    eventName: EventTypes;
    options: any;
  };

  [MAXIMIZE_UNMAXIMIZE]: {};
  [MINIMIZE]: {};
  [SET_WINDOW_TITLE]: {
    title: string;
  };
}

export type IPCEventName = keyof IPCEventArgs;

export type IPCEventHandler
  <E extends IpcMainEvent | IpcRendererEvent, T extends keyof IPCEventArgs>
  = (event: E, args: IPCEventArgs[T]) => void;