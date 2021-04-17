import { ipcRenderer } from 'electron';
import React, { Component, createRef } from 'react';
import { writeFile } from 'fs';

import { Icon } from '../Icon/Icon';
import { faPlus, faChevronRight, faChevronLeft, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import Page from '../Page/Page';
import ipcHandler from '../../util/ipc-handler';

import * as EVENTS from '../../../common/constants/eventNames';
import { ADD_PAGE, NEXT_PAGE, DELETE_PAGE, PREV_PAGE } from '../../../common/constants/shortcuts';

import './Pages.css';
import { GraphDimensions, StrokeExport } from 'svg-real-renderer/build/src/types/RealRendererTypes';
import history from '../../util/history';
import { RealDrawBoard } from 'svg-real-renderer';
import { Header } from '../Header/Header';

import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';

export interface IHistoryStateWithOpen {
  open?: {
    exportData: StrokeExport[],
    strokeIndex: number,
    dimensions: GraphDimensions
  }[]
}

export class Pages extends Component {
  pageRef: React.RefObject<Page> = createRef();
  pages: {
    exportData: StrokeExport[],
    strokeIndex: number,
    dimensions: GraphDimensions
  }[] = [{
    exportData: [], // dummy data
    strokeIndex: 0,
    dimensions: [0, 0]
  }]

  state = {
    currentPage: 0,
    pagesLength: 1
  }

  render() {
    return (
      <div>
        <Header
          title="Whiteboard"
          onlyDisplayIfCustom={true}
          leftMenu={[]}
          rightMenu={[
            <button className="btn brand-text" key={1}>Save</button>,
            <button className="btn brand-text" key={2}>
              <Icon options={{icon: faBars}} />
            </button>
          ]}
        />

        <style>
          {`
            .page {
              height: ${useGnomeStyleHeaderbarSetting.get() ? 'calc(95vh - 2rem)' : '95vh'}
            }

            #pages {
              height: ${useGnomeStyleHeaderbarSetting.get() ? 'calc(100vh - 2rem)' : '100vh'}
            }
          `}
        </style>

        <div className="container-fluid center" id="pages">
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
            onDrawBoard={(board: RealDrawBoard) => {
              // open a .rainbow file
              if (history.location.state) {
                if ('open' in (history.location.state as IHistoryStateWithOpen)) {
                  this.pages = (history.location.state as IHistoryStateWithOpen).open;
                  board.importData(this.pages[0]);
                  this.setState({
                    currentPage: 0,
                    pagesLength: this.pages.length
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

export default Pages;
