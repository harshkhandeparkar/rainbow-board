import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../Select/Select';
import { VersionFooter } from '../VersionFooter/VersionFooter';
import themeManager from '../../util/theme';
import packageFile from '../../../../package.json';
import M from 'materialize-css';

import { Icon } from '../Icon/Icon';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const { version } = packageFile;

export default class Settings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center brand-text header-text">Settings</span>
            <Link to="/" title="Home">
              <Icon options={{icon: faHome}} />
            </Link>
          </div>
        </nav>
        <div className="container">
          <Select
            label="Theme:"
            defaultValue={themeManager.getTheme().theme}
            onInput={(value) => themeManager.setTheme(value)}
            options={
              Object.keys(themeManager.themes).map((theme) => {
                return {
                  value: theme,
                  label: themeManager.themes[theme]
                }
              })
            }
          />
        </div>

        <VersionFooter />
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
