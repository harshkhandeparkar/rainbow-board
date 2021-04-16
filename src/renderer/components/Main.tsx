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

import { OPEN, START_NEW } from '../../common/constants/shortcuts';
import { OPEN as OPEN_EVENT } from '../../common/constants/eventNames';
import { Header } from './Header/Header';

const { version, description } = packageFile;

function Main() {
  const history = useHistory();
  let doShowChangelog = true;

  if (changelogSetting.get() === version) doShowChangelog = false;

  if (doShowChangelog) history.push('/new');

  return (
    <div id="main">
      <Header
        title="Rainbow Board"
        isHome={true}
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
            <NavLink to="/pages" className="btn center brand-text full-width" title={`Start New (${START_NEW.platformFormattedString})`}>
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
                ipcRenderer.send(OPEN_EVENT);
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
            <NavLink to="/new" className="btn center brand-text full-width" title="New Changes">
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
