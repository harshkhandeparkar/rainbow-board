import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import packageFile from '../../../package.json';
import Download from './Download/Download';
import Grid from './Grid/Grid';
import GridItem from './Grid/GridItem';

import { hasSetting, getSetting } from '../util/settings';
import { Icon } from './Icon/Icon';
import { faPaintBrush, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

const { version, discordInvite, description } = packageFile;

function Main() {
  const history = useHistory();
  let doShowChangelog = true;

  if (hasSetting('lastVersionChangelogShown')) {
    if (getSetting('lastVersionChangelogShown') === version) doShowChangelog = false;
  }

  if (doShowChangelog) history.push('/new');

  return (
    <div id="main">
      <nav>
        <div className="nav-wrapper header container">
          <NavLink to="/settings" className="btn-floating brand-text center" title="Open Settings">
            <Icon options={{icon: faCog}} />
          </NavLink>
          <span className="header-text brand-logo center brand-text">Rainbow Board</span>
        </div>
      </nav>
      <div className="container center">
        <div className="row">
          <p>
            {description}
          </p>
        </div>

        <Grid
          options={{
            numColumns: 6
          }}
        >
          <GridItem />
          <GridItem
            options={{
              width: 2
            }}
          >
            <NavLink to="/pages" className="btn center brand-text full-width" title="New Whiteboard Page">
              <Icon options={{icon: faPaintBrush}} rightMargin={true} /> New Page
            </NavLink>
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

          <GridItem />
          <GridItem
            options={{
              width: 4
            }}
          >
            <Download />
          </GridItem>
          <GridItem />
        </Grid>
      </div>

      <footer className="container-fluid center z-depth-2">
        <p className="center brand-text" style={{width: '100%'}}>
          v{version}
        </p>
      </footer>
    </div>
  )
}

export default Main;
