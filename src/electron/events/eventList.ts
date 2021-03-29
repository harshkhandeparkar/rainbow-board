import { Event, EventHandler } from './event';

export class EventList<EventTypes> {
  events: {[eventName: string]: Event} = {};

  constructor(eventsList: EventTypes[]) {
    for (let eventName of eventsList) {
      this.events[<string><unknown>eventName] = new Event(<string><unknown>eventName);
    }
  }

  on(
    eventName: EventTypes,
    handlerName:string,
    handler: EventHandler
  ) {
    if (Object.keys(this.events).includes(<string><unknown>eventName)) {
      this.events[<string><unknown>eventName].addEventHandler(handlerName, handler);
    }
  }

  off(
    eventName: EventTypes,
    handlerName:string
  ) {
    if (Object.keys(this.events).includes(<string><unknown>eventName)) {
      this.events[<string><unknown>eventName].removeEventHandler(handlerName);
    }
  }

  fire(
    eventName: EventTypes,
    options: any
  ) {
    if (Object.keys(this.events).includes(<string><unknown>eventName)) {
      this.events[<string><unknown>eventName].fire(options);
    }
  }
}
