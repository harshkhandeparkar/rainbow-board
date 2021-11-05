import { IpcRendererEvent, IpcMainEvent } from 'electron';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { IMenuEventTypes } from '../../electron/events/menuClickEvents';
import { IPlugin } from '../types/plugins';

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
export const GET_PLUGINS = 'get-plugins';

export const RESTART = 'restart';

export const MAXIMIZE_UNMAXIMIZE = 'maximize-unmaximize';
export const QUIT = 'quit';
export const MINIMIZE = 'minimize';

/** EVENT: Forcefully fire a menubar event */
export const FIRE_MENU_EVENT = 'fire-menu-event';

/** EVENT: Change the window title */
export const SET_WINDOW_TITLE = 'set-window-title';

export interface IPCEventArgs {
  [NEW_WHITEBOARD]: null;
  [ADD_PAGE]: null;

  [EXPORT_PAGE]: {
    type: 'png' | 'svg';
  };
  [EXPORT_PAGE_DIALOG]: null;

  [SAVE]: null;
  [OPEN]: null;

  [NEXT_PAGE]: null;
  [PREVIOUS_PAGE]: null;
  [CLEAR_PAGE]: null;
  [DELETE_PAGE]: null;
  [UNDO]: null;
  [REDO]: null;

  [TOGGLE_COLOR_PALETTE]: null;
  [SET_TOOL]: {
    tool: Tool
  };
  [PREV_TOOL]: null;

  [GO]: {
    to: string;
  };
  [LOCATION_CHANGED]: {
    path: string;
  };

  [RESTART]: null;
  [QUIT]: null;

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
    eventName: keyof IMenuEventTypes;
    options: IMenuEventTypes[keyof IMenuEventTypes];
  };

  [MAXIMIZE_UNMAXIMIZE]: null;
  [MINIMIZE]: null;
  [SET_WINDOW_TITLE]: {
    title: string;
  };

  [SET_HOTKEYS]: null;
  [GET_PLUGINS]: IPlugin[];
}

export type IPCEventName = keyof IPCEventArgs;

export type IPCEventHandler
  <E extends IpcMainEvent | IpcRendererEvent, T extends keyof IPCEventArgs>
  = (event: E, args: IPCEventArgs[T]) => void;