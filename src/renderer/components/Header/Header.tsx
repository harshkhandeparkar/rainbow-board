import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { faCog, faHome, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { shortcutsManager } from '../../../common/code/shortcuts';
import { useGnomeStyleHeaderbarSetting } from '../../../common/code/settings';
import { MAXIMIZE_UNMAXIMIZE, QUIT, MINIMIZE, SET_WINDOW_TITLE } from '../../../common/constants/events';
import * as PATHS from '../../../common/constants/paths';

import './Header.scss';
import { ipcRenderer } from 'electron';
import { ipcRendererSend } from '../../util/ipc-sender';

type IMenuItem = 'settings' | 'home';

interface IHeaderProps {
  title: string | JSX.Element,
  /** Optional smaller, greyed subtitle */
  subtitle?: string,
  /** Whether to display only with the custom headerbar opton enabled */
  onlyDisplayIfCustom?: boolean,
  leftMenu: IMenuItem[],
  rightMenu?: JSX.Element[]
}

export class Header extends Component<IHeaderProps> {
  isCustomHeader: boolean = false;
  state = {
    isMaximized: false
  }

  _setWindowTitle() {
    if (!this.isCustomHeader) {
      if (typeof this.props.title === 'string') {
        ipcRendererSend(
          SET_WINDOW_TITLE,
          {title: this.props.title}
        )
      }
    }
  }

  componentDidMount() {
    this._setWindowTitle();
  }

  componentDidUpdate() {
    this._setWindowTitle();
  }

  render() {
    const { GO_HOME, SETTINGS } = shortcutsManager.shortcuts;

    const onlyDisplayIfCustom = this.props.onlyDisplayIfCustom ?? false;
    this.isCustomHeader = useGnomeStyleHeaderbarSetting.get();
    const rightMenu = this.props.rightMenu ?? [];

    const doDisplay = !onlyDisplayIfCustom || onlyDisplayIfCustom && this.isCustomHeader;

    return (
      doDisplay ?
      <nav className={this.isCustomHeader ? 'custom-header': ''}>
        <div className={`nav-wrapper header ${this.isCustomHeader ? 'container-fluid' : 'container'}`}>
          <div className="left">
            {
              this.isCustomHeader &&
              <button
                title="Close"
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRendererSend(QUIT, null);
                }}
              >
                <Icon customColor={true} options={{icon: faTimes, size: this.isCustomHeader ? 'sm': 'lg', color: '#f44336'}} />
              </button>
            }
            {
              this.isCustomHeader &&
              <button
                title="Minimize"
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRendererSend(MINIMIZE, null);
                }}
              >
                <Icon customColor={true} options={{icon: faMinus, size: this.isCustomHeader ? 'sm': 'lg', color: '#4CAF50'}} />
              </button>
            }
            {
              this.isCustomHeader &&
              <button
                title={this.state.isMaximized ? 'Unmaximize' : 'Maximize'}
                className="btn-floating center"
                onClick={(e) => {
                  e.preventDefault();
                  ipcRendererSend(
                    MAXIMIZE_UNMAXIMIZE,
                    {maximized_state: this.state.isMaximized}
                  )

                  this.setState({
                    isMaximized: !this.state.isMaximized
                  })
                }}
              >
                <Icon customColor={true} options={{icon: faSquare, size: this.isCustomHeader ? 'sm': 'lg', color: '#FDD835'}} />
              </button>
            }
            {
              this.props.leftMenu.includes('settings') &&
              <Link to={`/${PATHS.SETTINGS}`} className="btn-floating center" title={`Open Settings (${SETTINGS.platformFormattedString})`}>
                <Icon options={{icon: faCog, size: this.isCustomHeader ? 'sm': 'lg'}} />
              </Link>
            }
            {
              this.props.leftMenu.includes('home') &&
              <Link to={`/${PATHS.HOME}`} className="btn-floating center" title={`Go to Home (${GO_HOME.platformFormattedString})`}>
                <Icon options={{icon: faHome, size: this.isCustomHeader ? 'sm': 'lg'}} />
              </Link>
            }
            </div>
            <div className="right">
              {rightMenu}
            </div>
            <span className={`header-text brand-logo center brand-text ${this.props.subtitle ? 'has-subtitle' : ''}`}>{this.props.title}</span>
            {this.props.subtitle && <span className="header-subtitle-text brand-logo center">{this.props.subtitle}</span>}
          </div>
        </nav> :
        <div />
    )
  }
}
