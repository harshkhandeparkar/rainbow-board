import React from 'react';
import { ipcRenderer } from 'electron';
import { NavLink, useHistory } from 'react-router-dom';
import packageFile from '../../../package.json';
import Download from './Download/Download';
import Grid from './Grid/Grid';
import GridItem from './Grid/GridItem';
import { VersionFooter } from './VersionFooter/VersionFooter';

import { changelogSetting } from '../util/settings';
import { Icon } from './Icon/Icon';
import { faPaintBrush, faBell, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import { shortcutsManager } from '../../common/code/shortcuts';
import { FIRE_MENU_EVENT } from '../../common/constants/events';
import * as PATHS from '../../common/constants/paths';
import { Header } from './Header/Header';
import { ipcRendererSend } from '../util/ipc-sender';

const { version, description } = packageFile;

function Main() {
  const { START_NEW, OPEN } = shortcutsManager.shortcuts;

  const history = useHistory();
  let doShowChangelog = true;

  if (changelogSetting.get() === version) doShowChangelog = false;

  if (doShowChangelog) {
    changelogSetting.set(version);
    history.push(`/${PATHS.WHATS_NEW}`);
  }

  return (
    <div id="main">
      <Header
        title="Rainbow Board"
        leftMenu={['settings']}
      />

      <div className="container-fluid center">
        <div className="row">
          <p>
            {description}
          </p>
        </div>

        <Grid
          options={{
            numColumns: 8
          }}
        >
          <GridItem />
          <GridItem
            options={{
              width: 2
            }}
          >
            <NavLink to={`/${PATHS.WHITEBOARD}`} className="btn center brand-text full-width" title={`Start New (${START_NEW.platformFormattedString})`}>
              <Icon options={{icon: faPaintBrush}} rightMargin={true} /> New ({START_NEW.platformFormattedString})
            </NavLink>
          </GridItem>

          <GridItem
            options={{
              width: 2
            }}
          >
            <button
              className="btn center brand-text full-width"
              title={`Open File (${OPEN.platformFormattedString})`}
              onClick={() => {
                ipcRendererSend(FIRE_MENU_EVENT, {
                  eventName: 'open',
                  options: null
                })
              }}
            >
              <Icon options={{icon: faFolderOpen}} rightMargin={true} /> Open ({OPEN.platformFormattedString})
            </button>
          </GridItem>

          <GridItem
            options={{
              width: 2
            }}
          >
            <NavLink to={`/${PATHS.WHATS_NEW}`} className="btn center brand-text full-width" title="New Changes">
              <Icon options={{icon: faBell}} rightMargin={true} />What's New!
            </NavLink>
          </GridItem>
          <GridItem />

          <GridItem options={{width: 3}} />
          <GridItem
            options={{
              width: 2
            }}
          >
            <Download />
          </GridItem>
          <GridItem options={{width: 3}} />
        </Grid>
      </div>

      <VersionFooter />
    </div>
  )
}

export default Main;
