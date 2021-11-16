import { EventList } from './eventList';
import * as EVENTS from '../../common/constants/events';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';

export interface IMenuEventTypes {
  [EVENTS.NEW_WHITEBOARD]: null;
  [EVENTS.ADD_PAGE]: null;

  [EVENTS.OPEN]: null;
  [EVENTS.SAVE]: null;

  [EVENTS.EXPORT_PAGE]: null;
  [EVENTS.NEXT_PAGE]: null;
  [EVENTS.PREVIOUS_PAGE]: null;
  [EVENTS.CLEAR_PAGE]: null;
  [EVENTS.DELETE_PAGE]: null;

  [EVENTS.UNDO]: null;
  [EVENTS.REDO]: null;

  [EVENTS.TOGGLE_COLOR_PALETTE]: null;
  [EVENTS.SET_TOOL]: {
    tool: Tool;
  };
  [EVENTS.PREV_TOOL]: null;

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
