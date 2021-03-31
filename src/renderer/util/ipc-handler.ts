import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron';
import * as EVENTS from '../../common/constants/eventNames';

export type IPCEventName =
  typeof EVENTS.ADD_PAGE |
  typeof EVENTS.NEW_PAGE |
  typeof EVENTS.SAVE_PAGE |
  typeof EVENTS.NEXT_PAGE |
  typeof EVENTS.PREVIOUS_PAGE |
  typeof EVENTS.CLEAR_PAGE |
  typeof EVENTS.DELETE_PAGE |
  typeof EVENTS.UNDO |
  typeof EVENTS.REDO |
  typeof EVENTS.TOGGLE_COLOR_PALETTE |
  typeof EVENTS.SET_TOOL |
  typeof EVENTS.GO |
  typeof EVENTS.PROMPT_REPLY;

export type IPCEventHandler = (event: IpcRendererEvent, args: any) => void;

export class IPCHandler {
  eventHandlers: {
    [event in IPCEventName]: {
      [handlerName: string]: IPCEventHandler
    }
  } = {
    [EVENTS.ADD_PAGE]: {},
    [EVENTS.NEW_PAGE]: {},
    [EVENTS.SAVE_PAGE]: {},
    [EVENTS.NEXT_PAGE]: {},
    [EVENTS.PREVIOUS_PAGE]: {},
    [EVENTS.CLEAR_PAGE]: {},
    [EVENTS.DELETE_PAGE]: {},
    [EVENTS.UNDO]: {},
    [EVENTS.REDO]: {},
    [EVENTS.TOGGLE_COLOR_PALETTE]: {},
    [EVENTS.SET_TOOL]: {},
    [EVENTS.GO]: {},
    [EVENTS.PROMPT_REPLY]: {}
  }

  addEventHandler(
    event: IPCEventName,
    handlerName: string,
    handler: IPCEventHandler
  ) {
    if (!Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      this.eventHandlers[event][handlerName] = handler;
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
