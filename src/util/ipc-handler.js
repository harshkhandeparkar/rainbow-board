import { ipcRenderer } from 'electron';

export class IPCHandler {
  eventHandlers = {
    'save': {},
    'undo': {},
    'redo': {},
    'clear': {},
    'add': {},
    'delete': {},
    'go-home': {},
    'go-whatsnew': {},
    'go-pages': {},
    'go-credits': {},
    'next': {},
    'prev': {},
    'color-palette': {},
    'set-tool': {},
    'prompt-reply': {}
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
