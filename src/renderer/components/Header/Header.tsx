import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { faCog, faHome, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { SETTINGS } from '../../../common/constants/shortcuts';
import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';
import { MAXIMIZE_UNMAXIMIZE, QUIT, MINIMIZE } from '../../../common/constants/eventNames';

import './Header.css';
import { ipcRenderer } from 'electron';

interface IHeaderProps {
  title: string | JSX.Element,
  isHome?: boolean,
  onlyDisplayIfCustom?: boolean
}

export class Header extends Component<IHeaderProps> {
  state = {
    isMaximized: false
  }

  render() {
    const isHome = this.props.isHome || false;
    const onlyDisplayIfCustom = this.props.onlyDisplayIfCustom || false;
    const isCustomHeader = useGnomeStyleHeaderbarSetting.get();

    const doDisplay = !onlyDisplayIfCustom || onlyDisplayIfCustom && isCustomHeader;

    return (
      <nav className={isCustomHeader ? 'custom-header': ''}>
        {
          doDisplay &&
          <div className="nav-wrapper header container">
            {
              isCustomHeader &&
              <button
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRenderer.send(QUIT);
                }}
              >
                <Icon customColor={true} options={{icon: faTimes, size: isCustomHeader ? 'sm': 'lg', color: '#f44336'}} />
              </button>
            }
            {
              isCustomHeader &&
              <button
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRenderer.send(MINIMIZE);
                }}
              >
                <Icon customColor={true} options={{icon: faMinus, size: isCustomHeader ? 'sm': 'lg', color: '#4CAF50'}} />
              </button>
            }
            {
              isCustomHeader &&
              <button
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRenderer.send(MAXIMIZE_UNMAXIMIZE, this.state.isMaximized);
                  this.setState({
                    isMaximized: !this.state.isMaximized
                  })
                }}
              >
                <Icon customColor={true} options={{icon: faSquare, size: isCustomHeader ? 'sm': 'lg', color: '#FDD835'}} />
              </button>
            }
            {
              isHome ?
              <Link to="/settings" className="btn-floating center" title={`Open Settings (${SETTINGS.platformFormattedString})`}>
                <Icon options={{icon: faCog, size: isCustomHeader ? 'sm': 'lg'}} />
              </Link> :
              <Link to="/" className="btn-floating center" title="Home">
                <Icon options={{icon: faHome, size: isCustomHeader ? 'sm': 'lg'}} />
              </Link>
            }
            <span className="header-text brand-logo center brand-text">{this.props.title}</span>
          </div>
        }
      </nav>
    )
  }
}
