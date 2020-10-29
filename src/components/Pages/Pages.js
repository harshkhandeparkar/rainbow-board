import React, { Component } from 'react';
import './Pages.css';

import Page from '../Page/Page';

export class Pages extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      pagesList: [],
      currentPage: 0
    }
  }

  render() {
    return (
      <div className="container-fluid center" id="pages">
        {
          this.state.pagesList.length === 0 ?
          <button
            title="Add a new page"
            className="btn-floating btn-large white page-btn"
            onClick={this.addPage}
          >
            <i className="material-icons gradient-text brand-gradient">add</i>
          </button> :
          <div>
            <button
              className="btn-floating right page-btn white"
              onClick={this.state.currentPage === this.state.pagesList.length - 1 ? this.addPage : this.nextPage}
            >
              <i className="material-icons gradient-text brand-gradient">
                {this.state.currentPage === this.state.pagesList.length - 1 ? 'add' : 'navigate_next'}
              </i>
            </button>

            {
              this.state.currentPage !== 0 &&
              <button
                className="btn-floating left page-btn white"
                onClick={this.lastPage}
              >
                <i className="material-icons gradient-text brand-gradient">navigate_before</i>
              </button>
            }

            {this.state.pagesList[this.state.currentPage]}
          </div>
        }
      </div>
    )
  }

  addPage = (e) => {
    e.preventDefault();

    this.state.pagesList.push(<Page></Page>);
    this.setState({
      pagesList: this.state.pagesList,
      currentPage: this.state.pagesList.length - 1
    })
  }

  nextPage = (e) => {
    e.preventDefault();

    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }

  lastPage = (e) => {
    e.preventDefault();

    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }
}

export default Pages;
