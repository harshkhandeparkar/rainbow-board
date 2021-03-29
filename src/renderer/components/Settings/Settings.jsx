import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center styled-text brand-text">Settings</span>
            <NavLink to="/" title="Home">
              <i className="material-icons brand-text">home</i>
            </NavLink>
          </div>
        </nav>
      </div>
    )
  }
}
