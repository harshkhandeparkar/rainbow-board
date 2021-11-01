import { ipcRenderer } from 'electron';
import React, { Component, createRef } from 'react';
import { writeFile } from 'fs';
import { basename } from 'path';

import { Icon } from '../Icon/Icon';
import {
  faPlus,
  faChevronRight,
  faChevronLeft,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import Page from '../Page/Page';
import ipcHandler from '../../util/ipc-handler';

import * as EVENTS from '../../../common/constants/events';
import { shortcutsManager } from '../../../common/code/shortcuts';

import './Whiteboard.scss';
import { RealExport } from 'svg-real-renderer/build/src/types/RealRendererTypes';
import history from '../../util/history';
import { RealDrawBoard } from 'svg-real-renderer';

import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';

import { WhiteboardHeader } from './WhiteboardHeader';

import { HOME } from '../../../common/constants/paths';

export interface IHistoryStateWithOpen {
  open?: {
    data: RealExport[],
    fileName: string,
    location: string
  }
}

export class Whiteboard extends Component {
  pageRef: React.RefObject<Page> = createRef();
  pages: RealExport[] = []

  state = {
    currentPage: 0,
    pagesLength: 1,
    fileName: '',
    location: '',
    fileOpened: false
  }

  render() {
    const {
      ADD_PAGE,
      DELETE_PAGE,
      NEXT_PAGE,
      PREV_PAGE
    } = shortcutsManager.shortcuts;

    return (
      <div>
        <WhiteboardHeader
          fileOpened={this.state.fileOpened}
          fileName={this.state.fileName}
          location={this.state.location}
          save={() => this.save()}
        />

        <style>
          {`
            .page {
              height: ${useGnomeStyleHeaderbarSetting.get() ? 'calc(95vh - 2rem)' : '95vh'}
            }
          `}
        </style>

        <div className="container-fluid center" id="whiteboard" style={{height: useGnomeStyleHeaderbarSetting.get() ? 'calc(100vh - 2rem)' : '100vh'}}>
          <div>
            <button
              className="btn-floating right page-btn"
              onClick={this.state.currentPage === this.state.pagesLength - 1 ? this.addPage : this.nextPage}
              title={this.state.currentPage === this.state.pagesLength - 1 ? `Add Page (${ADD_PAGE.platformFormattedString})` : `Next Page (${NEXT_PAGE.platformFormattedString})`}
            >
              <Icon options={{icon: this.state.currentPage === this.state.pagesLength - 1 ? faPlus : faChevronRight}} />
            </button>

            <div
              className="btn page-btn top-left brand-text"
              style={{ fontWeight: 'bold', lineHeight: '34px', borderRadius: '0.5rem', padding: '0px 0.5rem' }}
            >
              <span title="Page Number">{this.state.currentPage + 1}</span>
              <div className="vertical-separator-line" />
              <span title="Total Pages">{this.state.pagesLength}</span>
            </div>

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
            _getPages={() => {
              const board = this.pageRef.current.state.boardState.drawBoard;

              // sync current page
              this.pages[this.state.currentPage] = board.exportData();

              return this.pages;
            }}
            onDrawBoard={(board: RealDrawBoard) => {
              // open a .rainbow file
              if (history.location.state) {
                if ('open' in (history.location.state as IHistoryStateWithOpen)) {
                  const pages = (history.location.state as IHistoryStateWithOpen).open.data;

                  let isOldVersion = false;

                  for (let page of pages) {
                    if (RealDrawBoard.getExportVersion(page) === 1) {
                      isOldVersion = true;
                      break;
                    }
                  }

                  if (isOldVersion) {
                    ipcRenderer.send('prompt', {
                      title: 'Continue?',
                      message: `\
This new version of Rainbow Board, and future versions have a new format for the ".rainbow" files.
The ".rainbow" file you loaded uses the old format. The next time you save it, the format will change and the new save file will not load on older versions of Rainbow Board.

This change has been made because the old format could be vulnerable to security issues.
Opening a file that was exported directly from Rainbow Board, wasn't tempered with and is from\
 a trusted source, can be opened without any threats but it is advised to not open non-trusted ".rainbow" files on your personal computer.

Would you like to open this file?
`,
                      buttons: ['No', 'Yes'],
                      event: 'import-warning'
                    })

                    ipcHandler.addEventHandler('prompt-reply', 'importWarningPromptHandler', (event, args) => {
                      if (args.event === 'import-warning') {
                        if (args.response === 0) history.push(HOME);
                        else this._loadPages(board, pages);
                      }
                    })
                  }
                  else this._loadPages(board, pages);
                }
              }
            }}
          />
        </div>
      </div>
    )
  }

  _loadPages(board: RealDrawBoard, pages: RealExport[]) {
    this.pages = pages;
    board.importData(this.pages[0]);

    this.setState({
      currentPage: 0,
      pagesLength: this.pages.length,
      fileOpened: true,
      fileName: (history.location.state as IHistoryStateWithOpen).open.fileName,
      location: (history.location.state as IHistoryStateWithOpen).open.location
    })
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

    ipcHandler.addEventHandler(EVENTS.NEXT_PAGE, 'nextPageHandler', () => this.nextPage())
    ipcHandler.addEventHandler(EVENTS.PREVIOUS_PAGE, 'prevPageHandler', () => this.lastPage())
    ipcHandler.addEventHandler(EVENTS.ADD_PAGE, 'addPageHandler', () => this.addPage())
    ipcHandler.addEventHandler(EVENTS.DELETE_PAGE, 'deletePageHandler', () => this.deletePage())
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
