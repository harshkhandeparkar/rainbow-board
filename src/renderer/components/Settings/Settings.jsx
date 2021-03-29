import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import themeManager from '../../util/theme';
import M from 'materialize-css';

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
        <div className="container center">
          <div>
            <button className="dropdown-trigger btn center brand-text" data-target="theme-settings-dropdown" title="Change Theme">
              Theme: {themeManager.getTheme().name} v
            </button>

            <ul id="theme-settings-dropdown" className="dropdown-content">
              {
                Object.keys(themeManager.themes).map((theme) => {
                  return (
                    <li
                      className="brand-text center"
                      onClick={() => themeManager.setTheme(theme)}
                      key={theme}
                    >
                      {themeManager.themes[theme]}
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </div>
      </div>
    )
  }

  componentDidUpdate() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }
}
