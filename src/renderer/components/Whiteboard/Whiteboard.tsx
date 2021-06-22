import { ipcRenderer } from 'electron';
import React, { Component, createRef } from 'react';
import { writeFile } from 'fs';
import { basename } from 'path';

import { Icon } from '../Icon/Icon';
import {
  faPlus,
  faChevronRight,
  faChevronLeft,
  faTrash,
  faBars,
  faEraser,
  faGripLines,
  faPaintBrush,
  faToolbox,
  faPalette
} from '@fortawesome/free-solid-svg-icons';
import Page from '../Page/Page';
import ipcHandler from '../../util/ipc-handler';

import * as EVENTS from '../../../common/constants/eventNames';
import {
  ADD_PAGE,
  NEXT_PAGE,
  DELETE_PAGE,
  PREV_PAGE,
  SAVE,
  BRUSH_TOOL,
  LINE_TOOL,
  ERASER_TOOL,
  COLOR_PALETTE
} from '../../../common/constants/shortcuts';

import './Whiteboard.scss';
import { RealExport } from 'svg-real-renderer/build/src/types/RealRendererTypes';
import history from '../../util/history';
import { RealDrawBoard } from 'svg-real-renderer';
import { Header } from '../Header/Header';

import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';
import { Dropdown } from '../Dropdown/Dropdown';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

export interface IHistoryStateWithOpen {
  open?: {
    data: RealExport[],
    fileName: string,
    location: string
  }
}

export class Whiteboard extends Component {
  pageRef: React.RefObject<Page> = createRef();
  pages: RealExport[] = [{
    exportData: [], // dummy data
    strokeIndex: 0,
    dimensions: [0, 0],
    bgType: {
      type: 'none'
    }
  }]

  state = {
    currentPage: 0,
    pagesLength: 1,
    fileName: '',
    location: '',
    fileOpened: false
  }

  render() {
    return (
      <div>
        <Header
          title={this.state.fileOpened ? this.state.fileName : 'Untitled Whiteboard*'}
          subtitle={this.state.fileOpened ? this.state.location : 'Unsaved Changes'}
          onlyDisplayIfCustom={true}
          leftMenu={[]}
          rightMenu={[
            <button
              className="btn brand-text"
              key={1}
              title={SAVE.platformFormattedString}
              onClick={() => {
                this.save();
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

        <style>
          {`
            .page {
              height: ${useGnomeStyleHeaderbarSetting.get() ? 'calc(95vh - 2rem)' : '95vh'}
            }

            #whiteboard {
              height: ${useGnomeStyleHeaderbarSetting.get() ? 'calc(100vh - 2rem)' : '100vh'}
            }
          `}
        </style>

        <div className="container-fluid center" id="whiteboard">
          <div>
            <button
              className="btn-floating right page-btn"
              onClick={this.state.currentPage === this.state.pagesLength - 1 ? this.addPage : this.nextPage}
              title={this.state.currentPage === this.state.pagesLength - 1 ? `Add Page (${ADD_PAGE.platformFormattedString})` : `Next Page (${NEXT_PAGE.platformFormattedString})`}
            >
              <Icon options={{icon: this.state.currentPage === this.state.pagesLength - 1 ? faPlus : faChevronRight}} />
            </button>

            <span
              className="btn-floating page-btn top-left brand-text"
              style={{ fontWeight: 'bold' }}
              title="Page Number"
            >
              {this.state.currentPage + 1} / {this.state.pagesLength}
            </span>

            {
              this.state.pagesLength > 1 &&
              <button
                className="btn-floating page-btn top-right"
                onClick={this.deletePage}
                title={`Delete Page (${DELETE_PAGE.platformFormattedString})`}
              >
                <Icon options={{icon: faTrash}} />
              </button>
            }

            {
              this.state.currentPage !== 0 &&
              <button
                className="btn-floating left page-btn"
                onClick={this.lastPage}
                title={`Previous Page (${PREV_PAGE.platformFormattedString})`}
              >
                <Icon options={{icon: faChevronLeft}} />
              </button>
            }
          </div>
          <Page
            ref={this.pageRef}
            _save={() => this.save()}
            onDrawBoard={(board: RealDrawBoard) => {
              // open a .rainbow file
              if (history.location.state) {
                if ('open' in (history.location.state as IHistoryStateWithOpen)) {
                  this.pages = (history.location.state as IHistoryStateWithOpen).open.data;
                  board.importData(this.pages[0]);

                  this.setState({
                    currentPage: 0,
                    pagesLength: this.pages.length,
                    fileOpened: true,
                    fileName: (history.location.state as IHistoryStateWithOpen).open.fileName,
                    location: (history.location.state as IHistoryStateWithOpen).open.location
                  })
                }
              }
            }}
          />
        </div>
      </div>
    )
  }

  _removeHotkeys() {
    ipcHandler.removeEventHandler(EVENTS.NEXT_PAGE, 'nextPageHandler');
    ipcHandler.removeEventHandler(EVENTS.PREVIOUS_PAGE, 'prevPageHandler');
    ipcHandler.removeEventHandler(EVENTS.ADD_PAGE, 'addPageHandler');
    ipcHandler.removeEventHandler(EVENTS.DELETE_PAGE, 'deletePageHandler');
    ipcHandler.removeEventHandler(EVENTS.PROMPT_REPLY, 'deletePagePromptHandler');
    ipcHandler.removeEventHandler(EVENTS.SAVE, 'saveWhiteboardHandler');
  }

  componentDidMount() {
    this._removeHotkeys();

    ipcHandler.addEventHandler(EVENTS.NEXT_PAGE, 'nextPageHandler', () => {
      this.nextPage();
    })
    ipcHandler.addEventHandler(EVENTS.PREVIOUS_PAGE, 'prevPageHandler', () => {
      this.lastPage();
    })
    ipcHandler.addEventHandler(EVENTS.ADD_PAGE, 'addPageHandler', () => {
      this.addPage();
    })
    ipcHandler.addEventHandler(EVENTS.DELETE_PAGE, 'deletePageHandler', () => {
      this.deletePage();
    })
    ipcHandler.addEventHandler(EVENTS.PROMPT_REPLY, 'deletePagePromptHandler', (event, args) => {
      if (args.event === 'delete' && args.response === 1) {
        this._deletePage();
      }
    })
    ipcHandler.addEventHandler(EVENTS.SAVE, 'saveWhiteboardHandler', (e, {finalFilePath}: {finalFilePath: string}) => {
      this._saveWhiteboard(finalFilePath);
    })
  }

  _saveWhiteboard(path: string) {
    const board = this.pageRef.current.state.boardState.drawBoard;
    this.pages[this.state.currentPage] = board.exportData();

    writeFile(path, JSON.stringify(this.pages), () => {});

    this.setState({
      fileOpened: true,
      fileName: basename(path),
      location: path
    })
  }

  save() {
    if (this.state.fileOpened) this._saveWhiteboard(this.state.location);
    else ipcRenderer.send(EVENTS.FIRE_MENU_EVENT, {eventName: EVENTS.SAVE, options: {}});
  }

  componentWillUnmount() {
    this._removeHotkeys();
  }

  addPage = () => {
    const board = this.pageRef.current.state.boardState.drawBoard;
    this.pages[this.state.currentPage] = board.exportData();
    board.clear();

    this.setState({
      currentPage: this.state.currentPage + 1,
      pagesLength: this.state.pagesLength + 1
    })
  }

  nextPage = () => {
    if (this.state.currentPage !== this.state.pagesLength - 1) {
      const board = this.pageRef.current.state.boardState.drawBoard;
      this.pages[this.state.currentPage] = board.exportData();
      board.importData(this.pages[this.state.currentPage + 1]);

      this.setState({
        currentPage: this.state.currentPage + 1
      })
    }
  }

  lastPage = () => {
    if (this.state.currentPage !== 0) {
      const board = this.pageRef.current.state.boardState.drawBoard;
      this.pages.push(board.exportData());
      this.pages[this.state.currentPage] = board.exportData();
      board.importData(this.pages[this.state.currentPage - 1]);

      this.setState({
        currentPage: this.state.currentPage - 1
      })
    }
  }

  deletePage = () => {
    if (this.state.pagesLength > 1) {
      if (this.pageRef.current.state.boardState.drawBoard._strokeIndex > 0) { // If nothing is written, directly delete
        ipcRenderer.send('prompt', {
          title: 'Delete this page?',
          message: 'If you delete the page, all the unsaved data will be LOST FOREVER.',
          buttons: ['No', 'Yes'],
          event: 'delete'
        })
      }
      else this._deletePage();
    }
  }

  _deletePage = () => {
    if (this.state.pagesLength > 1) {
      const board = this.pageRef.current.state.boardState.drawBoard;
        this.pages = this.pages.filter((value, index) => index !== this.state.currentPage); // Delete that page

        if (this.state.currentPage === this.state.pagesLength - 1) {
          board.importData(this.pages[this.state.currentPage - 1]);
          this.setState({
            currentPage: this.state.currentPage - 1,
            pagesLength: this.state.pagesLength - 1
          })
        }
        else {
          board.importData(this.pages[this.state.currentPage]);
          this.setState({
            pagesLength: this.state.pagesLength - 1
          })
        }
    }
  }
}

export default Whiteboard;
