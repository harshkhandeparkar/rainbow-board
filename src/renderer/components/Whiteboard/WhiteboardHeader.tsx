import React from 'react';
import { ipcRenderer } from 'electron';

import { Header } from '../Header/Header';
import { Dropdown } from '../Dropdown/Dropdown';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

import { Icon } from '../Icon/Icon';
import {
  faBars,
  faEraser,
  faGripLines,
  faPaintBrush,
  faToolbox,
  faPalette
} from '@fortawesome/free-solid-svg-icons';

import * as EVENTS from '../../../common/constants/eventNames';
import { shortcutsManager } from '../../../common/code/shortcuts';


export const WhiteboardHeader = (
  props: {
    fileOpened: boolean,
    fileName: string,
    location: string,
    save: () => void
  }
) => {
  const {
    SAVE,
    BRUSH_TOOL,
    LINE_TOOL,
    ERASER_TOOL,
    COLOR_PALETTE
  } = shortcutsManager.shortcuts;

  return (
    <Header
      title={props.fileOpened ? props.fileName : 'Untitled Whiteboard*'}
      subtitle={props.fileOpened ? props.location : 'Unsaved Changes'}
      onlyDisplayIfCustom={true}
      leftMenu={[]}
      rightMenu={[
        <button
          className="btn brand-text"
          key={1}
          title={SAVE.platformFormattedString}
          onClick={() => {
            props.save();
          }}
        >
          Save
        </button>,
        <Dropdown
          key={2}
          getTriggerBtn={(ref) => {
            return (
              <button ref={ref} className="btn" title="Select Tool">
                <Icon
                  options={{
                    icon: faToolbox,
                    size: 'sm'
                  }}
                />
              </button>
            )
          }}
        >
          <button
            className="btn"
            onClick={() => ipcRenderer.send(EVENTS.FIRE_MENU_EVENT, {eventName: EVENTS.SET_TOOL, options: {tool: 'brush'}})}
            title={`Brush (${BRUSH_TOOL.platformFormattedString})`}
          >
            <Icon
              options={{
                icon: faPaintBrush
              }}
            />
          </button>
          <button
            className="btn"
            onClick={() => ipcRenderer.send(EVENTS.FIRE_MENU_EVENT, {eventName: EVENTS.SET_TOOL, options: {tool: 'line'}})}
            title={`Line Tool (${LINE_TOOL.platformFormattedString})`}
          >
            <Icon
              options={{
                icon: faGripLines
              }}
            />
          </button>
          <button
            className="btn"
            onClick={() => ipcRenderer.send(EVENTS.FIRE_MENU_EVENT, {eventName: EVENTS.SET_TOOL, options: {tool: 'eraser'}})}
            title={`Eraser (${ERASER_TOOL.platformFormattedString})`}
          >
            <Icon
              options={{
                icon: faEraser
              }}
            />
          </button>
        </Dropdown>,
        <Dropdown
          key={3}
          getTriggerBtn={(ref) => {
            return (
              <button ref={ref} className="btn">
                <Icon options={{icon: faBars}} />
              </button>
            )
          }}
        >
          <div style={{lineHeight: '1.5rem', minWidth: '10rem', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
            <Grid
              options={{
                numColumns: 3,
                gap: '0'
              }}
            >
              <GridItem className="center">
                <button
                  title={`Color Palette (${COLOR_PALETTE.platformFormattedString})`}
                  className="btn"
                  onClick={() => ipcRenderer.send(EVENTS.FIRE_MENU_EVENT, {eventName: EVENTS.TOGGLE_COLOR_PALETTE, options: {}})}
                >
                  <Icon options={{icon: faPalette, size: 'sm'}}></Icon>
                </button>
              </GridItem>
            </Grid>
          </div>
        </Dropdown>
      ]}
    />
  )
}
