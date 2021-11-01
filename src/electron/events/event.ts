export type EventHandler<T> = (options: T) => void;

export class Event<EventOptions extends Object> {
  eventHandlers: {[handlerName: string]: EventHandler<EventOptions>} = {} as any;
  name: string;

  /**
   * Add a new event handler
   * @param handlerName Unique name for the event handler.
   * @param handler Event handler function/callback.
   */
  addEventHandler(
    handlerName: string,
    handler: EventHandler<EventOptions>
  ) {
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
  fire(options: EventOptions) {
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
