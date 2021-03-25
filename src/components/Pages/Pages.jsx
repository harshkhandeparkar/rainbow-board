import { ipcRenderer } from 'electron';
import React, { Component, createRef } from 'react';

import Page from '../Page/Page.jsx';
import ipcHandler from '../../util/ipc-handler';

import './Pages.css';

export class Pages extends Component {
  pageRef = createRef();
  pages = [[]];

  state = {
    currentPage: 0,
    pagesLength: 1
  }

  render() {
    return (
      <div className="container-fluid center" id="pages">
        <div>
          <button
            className="btn-floating right page-btn"
            onClick={this.state.currentPage === this.state.pagesLength - 1 ? this.addPage : this.nextPage}
            title={this.state.currentPage === this.state.pagesLength - 1 ? 'Add Page' : 'Next Page'}
          >
            <i className={`brand-text fa fa-${this.state.currentPage === this.state.pagesLength - 1 ? 'plus' : 'chevron-right'}`} />
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
              title="Delete This Page"
            >
              <i className="brand-text fa fa-trash" />
            </button>
          }

          {
            this.state.currentPage !== 0 &&
            <button
              className="btn-floating left page-btn"
              onClick={this.lastPage}
              title="Previous page"
            >
              <i className="fa fa-chevron-left brand-text" />
            </button>
          }
        </div>
        <Page
          ref={this.pageRef}
          getTheme={this.props.getTheme}
        />
      </div>
    )
  }

  _removeHotkeys() {
    ipcHandler.removeEventHandler('next', 'nextPageHandler');
    ipcHandler.removeEventHandler('prev', 'prevPageHandler');
    ipcHandler.removeEventHandler('add', 'addPageHandler');
    ipcHandler.removeEventHandler('delete', 'deletePageHandler');
    ipcHandler.removeEventHandler('prompt-reply', 'deletePagePromptHandler');
  }

  componentDidMount() {
    this._removeHotkeys();

    ipcHandler.addEventHandler('next', 'nextPageHandler', () => {
      this.nextPage();
    })
    ipcHandler.addEventHandler('prev', 'prevPageHandler', () => {
      this.lastPage();
    })
    ipcHandler.addEventHandler('add', 'addPageHandler', () => {
      this.addPage();
    })
    ipcHandler.addEventHandler('delete', 'deletePageHandler', () => {
      this.deletePage();
    })
    ipcHandler.addEventHandler('prompt-reply', 'deletePagePromptHandler', (event, args) => {
      if (args.event === 'delete') {
        this._deletePage();
      }
    })
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
    ipcRenderer.send('prompt', {
      title: 'Delete this page?',
      message: 'If you delete the page, all the unsaved data will be LOST FOREVER.',
      buttons: ['Yes', 'No'],
      event: 'delete'
    })
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
