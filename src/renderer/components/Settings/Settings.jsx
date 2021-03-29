import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon/Icon.jsx';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center brand-text header-text">Settings</span>
            <Link to="/" title="Home">
              <Icon icon={faHome} />
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}
