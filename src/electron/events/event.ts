export type EventHandler = (options: any) => void;

export class Event {
  eventHandlers: {[handlerName: string]: EventHandler} = {};
  name: string;

  /**
   * Add a new event handler
   * @param handlerName Unique name for the event handler.
   * @param handler Event handler function/callback.
   */
  addEventHandler(handlerName: string, handler: EventHandler) {
    if (!Object.keys(this.eventHandlers).includes(handlerName)) {
      this.eventHandlers[handlerName] = handler;
    }
  }

  /**
   * Remove an event handler.
   * @param handlerName Unique name of the handler to remove.
   */
  removeEventHandler(handlerName: string) {
    if (Object.keys(this.eventHandlers).includes(handlerName)) {
      delete this.eventHandlers[handlerName];
    }
  }

  /**
   * Fire the event.
   * @param options Options to be given to the handler callback
   */
  fire(options: any) {
    for (let handlerName in this.eventHandlers) {
      this.eventHandlers[handlerName](options);
    }
  }

  /**
   *
   * @param name Name for the event.
   */
  constructor(name: string) {
    this.name = name;
  }
}
