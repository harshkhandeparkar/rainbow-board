import { EventList } from './eventList';
import * as EVENTS from '../../common/constants/events';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';

export interface IMenuEventTypes {
  [EVENTS.NEW_WHITEBOARD]: {};
  [EVENTS.ADD_PAGE]: {};

  [EVENTS.OPEN]: {};
  [EVENTS.SAVE]: {};

  [EVENTS.EXPORT_PAGE]: {
    type: 'svg' | 'png';
  };
  [EVENTS.NEXT_PAGE]: {};
  [EVENTS.PREVIOUS_PAGE]: {};
  [EVENTS.CLEAR_PAGE]: {};
  [EVENTS.DELETE_PAGE]: {};

  [EVENTS.UNDO]: {};
  [EVENTS.REDO]: {};

  [EVENTS.TOGGLE_COLOR_PALETTE]: {};
  [EVENTS.SET_TOOL]: {
    tool: Tool;
  };
  [EVENTS.PREV_TOOL]: {};

  [EVENTS.GO]: {
    to: string;
  };
}

const eventNames: (keyof IMenuEventTypes)[] = [
  EVENTS.ADD_PAGE,
  EVENTS.NEW_WHITEBOARD,
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

export const menuClickEvents = new EventList<IMenuEventTypes>(eventNames);
