import React, { Component } from 'react';
import './Pages.css';

import Page from '../Page/Page';

import '../Page/Page.css';

export class Pages extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      pagesList: [],
      currentPage: 0,
      mode: 'paint'
    }
  }

  render() {
    return (
      <div className="container-fluid center" id="pages">
        {
          this.state.pagesList.length === 0 ?
          <button
            title="Add a new page"
            className="btn-floating btn-large page-btn"
            onClick={this.addPage}
          >
            <i className="fa fa-plus gradient-text brand-gradient" />
          </button> :
          <div>
            {/* <button
              className="btn-floating right page-btn"
              onClick={this.state.currentPage === this.state.pagesList.length - 1 ? this.addPage : this.nextPage}
            >
              <i className={`fa gradient-text brand-gradient fa-${this.state.currentPage === this.state.pagesList.length - 1 ? 'plus' : 'chevron-right'}`} />
            </button> */}

            {
              this.state.currentPage !== 0 &&
              <button
                className="btn-floating left page-btn"
                onClick={this.lastPage}
              >
                <i className="fa fa-chevron-left gradient-text brand-gradient" />
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

    this.state.pagesList.push(<Page key={this.state.pagesList.length} getTheme={this.props.getTheme}></Page>);
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
