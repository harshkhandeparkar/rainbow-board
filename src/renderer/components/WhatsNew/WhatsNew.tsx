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
      <div style={{paddingBottom: '2rem'}}>
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
            title="Save And Load"
            desc="You can now save the whole whiteboard as a .rainbow file and load it."
            version="v0.7.0"
            size={1}
          />
          <New
            title="Themes And Settings"
            desc="Instead of just two themes - Light and Dark, a settings page has been added where the theme can be choses. Two new themes have also been added -
            Dark Whiteboard (Board is white but UI dark) and Light Blackboard (Board is dark but UI light)."
            version="v0.7.0"
            size={2}
          />
          <New
            title="UI Cleanup And Redesign"
            desc={<span>
              The UI has been cleaned up. Reduced shadows and transitions. Uses cleaner borders and the themes are more consistent
              New icons from <a href="https://fontawesome.com">FontAwesome v5</a>. The new UI tries to follow the <a href="https://developer.gnome.org/hig/stable/">GNOME Human Interface Guidelines</a>.
              There are tooltips to most buttons with shortcut keys displayed. The top menu only displays what is necessary and some new items have been added to it.
            </span>}
            version="v0.7.0"
            size={3}
          />
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
