import React, { Component, createRef } from 'react';
import './Pages.css';

import Page from '../Page/Page';

import '../Page/Page.css';

export class Pages extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      currentPage: 0,
      pagesLength: 1,
      mode: 'paint'
    }

    this.pageRef = createRef();
    this.pages = [];
  }

  render() {
    return (
      <div className="container-fluid center" id="pages">
        <div>
          <button
            className="btn-floating right page-btn"
            onClick={this.state.currentPage === this.state.pagesLength - 1 ? this.addPage : this.nextPage}
          >
            <i className={`brand-text fa fa-${this.state.currentPage === this.state.pagesLength - 1 ? 'plus' : 'chevron-right'}`} />
          </button>

          {
            this.state.currentPage !== 0 &&
            <button
              className="btn-floating left page-btn"
              onClick={this.lastPage}
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

  addPage = (e) => {
    e.preventDefault();

    const board = this.pageRef.current.state.boardState.drawBoard;
    this.pages.push(board.exportData());
    board.clear();

    this.setState({
      currentPage: this.state.currentPage + 1,
      pagesLength: this.state.pagesLength + 1
    })
  }

  nextPage = (e) => {
    e.preventDefault();

    const board = this.pageRef.current.state.boardState.drawBoard;
    this.pages[this.state.currentPage] = board.exportData();
    board.importData(this.pages[this.state.currentPage + 1]);

    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }

  lastPage = (e) => {
    e.preventDefault();

    const board = this.pageRef.current.state.boardState.drawBoard;
    this.pages.push(board.exportData());
    this.pages[this.state.currentPage] = board.exportData();
    board.importData(this.pages[this.state.currentPage - 1]);

    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }
}

export default Pages;
