import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { setSetting } from '../../util/settings';
import packageFile from '../../../../package.json';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

const { version } = packageFile;

function New(
  {title, desc, version, link, size = 1}: {
    title: string | JSX.Element,
    desc: string | JSX.Element,
    version: string,
    link?: string,
    size?: number
  }
) {
  return (
    <GridItem options={{width: size}}>
      <div className="card full-height-card center">
        <div className="card-content">
          <span className="card-title styled-text brand-text">{title}</span>
          <p>{desc}</p>
        </div>
        <div className="card-action">
          Added in <a target="_blank" rel="noreferrer" href={`https://github.com/HarshKhandeparkar/rainbow-board/releases/${version}`}>v{version.replace('v', '')}</a>
        </div>
        {
          link &&
          <div className="card-action">
            <a target="_blank" rel="noreferrer" href={link}>Link</a>
          </div>
        }
      </div>
    </GridItem>
  )
}

export default class WhatsNew extends Component {
  componentDidMount() {
    setSetting('lastVersionChangelogShown', version);
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center header-text brand-text">What's New</span>
            <Link to="/" title="Home">
              <Icon options={{icon: faHome}} />
            </Link>
          </div>
        </nav>

        <Grid
          options={{
            numColumns: 3
          }}
          className="container"
        >
          <New
            title="Desktop App Features"
            desc="The app has been changed to look more like a desktop app than a web app running in a wrapper.
            A new menu has been added along with other changes. Starting from now, the web app will not be updated beyond
            v0.5.4 because maintaining both is not possible. New optimizations and features will be added to the desktop app and the website
            will be used as an about page.
            "
            version="v0.6.0"
            size={2}
          />
          <New
            title="Hotter Keys"
            desc="New hotkeys (keyboard shortcuts) have been added to almost every action such as adding pages, changing the page, color palette and choosing the tool.
            Use the top menu to find out which hotkey does what."
            version="v0.6.0"
            size={1}
          />
        </Grid>
      </div>
    )
  }
}
