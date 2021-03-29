import { ipcRenderer } from 'electron';
import * as EVENTS from '../../common/constants/eventNames';

export class IPCHandler {
  eventHandlers = {
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

  addEventHandler(event, handlerName, handler) {
    if (!Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      this.eventHandlers[event][handlerName] = handler;
    }
  }

  removeEventHandler(event, handlerName) {
    if (Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      delete this.eventHandlers[event][handlerName];
    }
  }

  constructor() {
    for (let eventName in this.eventHandlers) {
      ipcRenderer.on(eventName, (event, args) => {
        for (let handlerName in this.eventHandlers[eventName]) {
          this.eventHandlers[eventName][handlerName](event, args);
        }
      })
    }
  }
}

export default new IPCHandler();
