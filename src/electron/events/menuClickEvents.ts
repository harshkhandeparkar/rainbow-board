import { EventList } from './eventList';
import * as EVENTS from '../../common/constants/eventNames';

type EventTypes =
  typeof EVENTS.ADD_PAGE |
  typeof EVENTS.NEW_PAGE |
  typeof EVENTS.EXPORT_PAGE |
  typeof EVENTS.OPEN |
  typeof EVENTS.SAVE |
  typeof EVENTS.NEXT_PAGE |
  typeof EVENTS.PREVIOUS_PAGE |
  typeof EVENTS.CLEAR_PAGE |
  typeof EVENTS.DELETE_PAGE |
  typeof EVENTS.UNDO |
  typeof EVENTS.REDO |
  typeof EVENTS.TOGGLE_COLOR_PALETTE |
  typeof EVENTS.SET_TOOL |
  typeof EVENTS.PREV_TOOL |
  typeof EVENTS.GO;

const eventNames: EventTypes[] = [
  EVENTS.ADD_PAGE,
  EVENTS.NEW_PAGE,
  EVENTS.EXPORT_PAGE,
  EVENTS.OPEN,
  EVENTS.SAVE,
  EVENTS.NEXT_PAGE,
  EVENTS.PREVIOUS_PAGE,
  EVENTS.CLEAR_PAGE,
  EVENTS.DELETE_PAGE,
  EVENTS.UNDO,
  EVENTS.REDO,
  EVENTS.TOGGLE_COLOR_PALETTE,
  EVENTS.SET_TOOL,
  EVENTS.PREV_TOOL,
  EVENTS.GO
]

export const menuClickEvents = new EventList<EventTypes>(eventNames);
