import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { SETTINGS } from '../../../common/constants/shortcuts';
import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';

import './Header.css';

interface IHeaderProps {
  title: string | JSX.Element,
  isHome?: boolean
}

export class Header extends Component<IHeaderProps> {
  render() {
    const isHome = this.props.isHome || false;

    return (
      <nav className={useGnomeStyleHeaderbarSetting.get() ? 'custom-header': ''}>
        <div className="nav-wrapper header container">
          {
            isHome ?
            <Link to="/settings" className="btn-floating brand-text center" title={`Open Settings (${SETTINGS.platformFormattedString})`}>
              <Icon options={{icon: faCog, size: useGnomeStyleHeaderbarSetting.get() ? 'sm': 'lg'}} />
            </Link> :
            <Link to="/" className="btn-floating brand-text center" title="Home">
              <Icon  options={{icon: faHome, size: useGnomeStyleHeaderbarSetting.get() ? 'sm': 'lg'}} />
            </Link>
          }
          <span className="header-text brand-logo center brand-text">{this.props.title}</span>
        </div>
      </nav>
    )
  }
}
