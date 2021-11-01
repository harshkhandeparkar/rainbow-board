import { Event, EventHandler } from './event';

interface IEventTypes {
  [eventName: string]: any;
}

export class EventList
  <EventTypes extends IEventTypes>
{
  events: {
    [event in keyof EventTypes]: Event<EventTypes[event]>
  } = {} as any;

  constructor(eventsList: (keyof EventTypes)[]) {
    for (let eventName of eventsList) {
      this.events[eventName] = new Event(<string>eventName);
    }
  }

  on<E extends keyof EventTypes>(
    eventName: E,
    handlerName:string,
    handler: EventHandler<EventTypes[E]>
  ) {
    if (Object.keys(this.events).includes(<string>eventName)) {
      this.events[eventName].addEventHandler(handlerName, handler);
    }
  }

  off<E extends keyof EventTypes>(
    eventName: E,
    handlerName:string
  ) {
    if (Object.keys(this.events).includes(<string>eventName)) {
      this.events[eventName].removeEventHandler(handlerName);
    }
  }

  fire<E extends keyof EventTypes>(
    eventName: E,
    options: EventTypes[E]
  ) {
    if (Object.keys(this.events).includes(<string>eventName)) {
      this.events[eventName].fire(options);
    }
  }
}
