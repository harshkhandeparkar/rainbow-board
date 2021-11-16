import { ipcRenderer, IpcRendererEvent } from 'electron';
import * as EVENTS from '../../common/constants/events';
import { IPCRendererReceiveEvents, IPCRendererReceiveEventArgs, IPCEventHandler } from '../../common/constants/events';

type IPCRendererHandler<E extends IPCRendererReceiveEvents> = IPCEventHandler<IpcRendererEvent, IPCRendererReceiveEventArgs, E>

export class IPCHandler {
  eventHandlers: {
    [event in IPCRendererReceiveEvents]: {
      [handlerName: string]: IPCRendererHandler<event>
    }
  } = {
    [EVENTS.NEW_WHITEBOARD]: {},
    [EVENTS.ADD_PAGE]: {},

    [EVENTS.EXPORT_PAGE]: {},

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

    [EVENTS.RESTART]: {},
    [EVENTS.QUIT]: {},

    [EVENTS.PROMPT_REPLY]: {},

    [EVENTS.GET_PLUGINS]: {}
  }

  addEventHandler<E extends IPCRendererReceiveEvents>(
    event: E,
    handlerName: string,
    handler: IPCRendererHandler<E>
  ) {
    if (!Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      (this.eventHandlers[event][handlerName] as IPCRendererHandler<E>) = handler;
    }
  }

  removeEventHandler(event: IPCRendererReceiveEvents, handlerName: string) {
    if (Object.keys(this.eventHandlers[event]).includes(handlerName)) {
      delete this.eventHandlers[event][handlerName];
    }
  }

  constructor() {
    for (let eventName in this.eventHandlers) {
      ipcRenderer.on(eventName, (event, args) => {
        for (let handlerName in this.eventHandlers[<IPCRendererReceiveEvents>eventName]) {
          this.eventHandlers[<IPCRendererReceiveEvents>eventName][handlerName](event, args);
        }
      })
    }
  }
}

export default new IPCHandler();
