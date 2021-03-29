export type EventHandler = (options: any) => void;

export class Event {
  eventHandlers: {[handlerName: string]: EventHandler} = {};
  name: string;

  addEventHandler(handlerName: string, handler: EventHandler) {
    if (!Object.keys(this.eventHandlers).includes(handlerName)) {
      this.eventHandlers[handlerName] = handler;
    }
  }

  removeEventHandler(handlerName: string) {
    if (Object.keys(this.eventHandlers).includes(handlerName)) {
      delete this.eventHandlers[handlerName];
    }
  }

  fire(options: any) {
    for (let handlerName in this.eventHandlers) {
      this.eventHandlers[handlerName](options);
    }
  }

  constructor(name: string) {
    this.name = name;
  }
}
