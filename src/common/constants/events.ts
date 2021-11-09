import { IpcRendererEvent, IpcMainEvent } from 'electron';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { IMenuEventTypes } from '../../electron/events/menuClickEvents';
import { IOpenDialogOptions } from '../../electron/util/open';
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

export interface IPCRendererReceiveEventArgs {
  [NEW_WHITEBOARD]: null;
  [ADD_PAGE]: null;

  [EXPORT_PAGE]: {
    type: 'png' | 'svg';
  };
  [EXPORT_PAGE_DIALOG]: null;

  [SAVE]: {
    finalFilePath: string;
  };
  [OPEN]: {
    path: string;
  };

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

  [RESTART]: null;
  [QUIT]: null;

  [PROMPT_REPLY]: {
    event: string;
    response: number;
    options?: {
      goTo: string;
    };
  };

  [GET_PLUGINS]: IPlugin[];
}

export type IPCRendererReceiveEvents = keyof IPCRendererReceiveEventArgs;

export interface IPCRendererSendEventArgs {
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
    options?: {
      goTo: string;
    };
  };
  [OPEN]: {
    options: IOpenDialogOptions;
  };

  [FIRE_MENU_EVENT]: {
    eventName: keyof IMenuEventTypes;
    options: IMenuEventTypes[keyof IMenuEventTypes];
  };

  [MAXIMIZE_UNMAXIMIZE]: {
    maximized_state: boolean;
  };
  [MINIMIZE]: null;
  [SET_WINDOW_TITLE]: {
    title: string;
  };

  [SET_HOTKEYS]: null;
  [GET_PLUGINS]: IPlugin[];
}
export type IPCRendererSendEvents = keyof IPCRendererSendEventArgs;

export interface IPCMainReceiveEventArgs extends IPCRendererSendEventArgs {};
export type IPCMainReceiveEvents = keyof IPCMainReceiveEventArgs;

export interface IPCMainSendEventArgs extends IPCRendererReceiveEventArgs {};
export type IPCMainSendEvents = keyof IPCMainSendEventArgs;

type IPCEventArgs =
  IPCMainReceiveEventArgs | IPCMainSendEventArgs |
  IPCRendererReceiveEventArgs | IPCRendererSendEventArgs;

type IPCEventNames =
  IPCMainSendEvents | IPCMainReceiveEvents |
  IPCRendererSendEvents | IPCRendererReceiveEvents;

export type IPCEventHandler
  <
    E extends IpcMainEvent | IpcRendererEvent,
    Scope extends IPCEventArgs,
    T extends keyof Scope
  >
  = (event: E, args: Scope[T]) => void;