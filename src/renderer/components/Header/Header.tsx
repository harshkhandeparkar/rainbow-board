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

type IMenuItem = 'settings' | 'home';

interface IHeaderProps {
  title: string | JSX.Element,
  onlyDisplayIfCustom?: boolean,
  leftMenu: IMenuItem[],
  rightMenu: JSX.Element[]
}

export class Header extends Component<IHeaderProps> {
  state = {
    isMaximized: false
  }

  render() {
    const onlyDisplayIfCustom = this.props.onlyDisplayIfCustom || false;
    const isCustomHeader = useGnomeStyleHeaderbarSetting.get();
    const rightMenu = this.props.rightMenu || [];

    const doDisplay = !onlyDisplayIfCustom || onlyDisplayIfCustom && isCustomHeader;

    return (
      doDisplay ?
      <nav className={isCustomHeader ? 'custom-header': ''}>
        <div className={`nav-wrapper header ${isCustomHeader ? 'container-fluid' : 'container'}`}>
          <div className="left">
            {
              isCustomHeader &&
              <button
                title="Close"
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
                title="Minimize"
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
                title={this.state.isMaximized ? 'Unmaximize' : 'Maximize'}
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
              this.props.leftMenu.includes('settings') &&
              <Link to="/settings" className="btn-floating center" title={`Open Settings (${SETTINGS.platformFormattedString})`}>
                <Icon options={{icon: faCog, size: isCustomHeader ? 'sm': 'lg'}} />
              </Link>
            }
            {
              this.props.leftMenu.includes('home') &&
              <Link to="/" className="btn-floating center" title="Home">
                <Icon options={{icon: faHome, size: isCustomHeader ? 'sm': 'lg'}} />
              </Link>
            }
            </div>
            <div className="right">
              {rightMenu}
            </div>
            <span className="header-text brand-logo center brand-text">{this.props.title}</span>
          </div>
        </nav> :
        <div />
    )
  }
}
