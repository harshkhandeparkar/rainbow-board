import { ipcRenderer, IpcRendererEvent } from 'electron';
import * as EVENTS from '../../common/constants/events';
import { IPCEventName, IPCEventHandler } from '../../common/constants/events';

export class IPCHandler {
  eventHandlers: {
    [event in IPCEventName]: {
      [handlerName: string]: IPCEventHandler<IpcRendererEvent, event>
    }
  } = {
    [EVENTS.NEW_WHITEBOARD]: {},
    [EVENTS.ADD_PAGE]: {},

    [EVENTS.EXPORT_PAGE]: {},
    [EVENTS.EXPORT_PAGE_DIALOG]: {},

    [EVENTS.SAVE]: {},
    [EVENTS.OPEN]: {},

    [EVENTS.NEXT_PAGE]: {},
    [EVENTS.PREVIOUS_PAGE]: {},
    [EVENTS.CLEAR_PAGE]: {},
    [EVENTS.DELETE_PAGE]: {},

    [EVENTS.UNDO]: {},
    [EVENTS.REDO]: {},

    [EVENTS.TOGGLE_COLOR_PALETTE]: {},
    [EVENTS.SET_TOOL]: {},
    [EVENTS.PREV_TOOL]: {},

    [EVENTS.GO]: {},
    [EVENTS.LOCATION_CHANGED]: {},

    [EVENTS.RESTART]: {},
    [EVENTS.QUIT]: {},

    [EVENTS.PROMPT_REPLY]: {},
    [EVENTS.PROMPT]: {},

    [EVENTS.FIRE_MENU_EVENT]: {},

    [EVENTS.MAXIMIZE_UNMAXIMIZE]: {},
    [EVENTS.MINIMIZE]: {},
    [EVENTS.SET_WINDOW_TITLE]: {}
  }

  addEventHandler<E extends IPCEventName>(
    event: E,
    handlerName: string,
    handler: IPCEventHandler<IpcRendererEvent, E>
  ) {
    if (!Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      (this.eventHandlers[event][handlerName] as IPCEventHandler<IpcRendererEvent, E>) = handler;
    }
  }

  removeEventHandler(event: IPCEventName, handlerName: string) {
    if (Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      delete this.eventHandlers[event][handlerName];
    }
  }

  constructor() {
    for (let eventName in this.eventHandlers) {
      ipcRenderer.on(eventName, (event, args) => {
        for (let handlerName in this.eventHandlers[<IPCEventName>eventName]) {
          this.eventHandlers[<IPCEventName>eventName][handlerName](event, args);
        }
      })
    }
  }
}

export default new IPCHandler();
