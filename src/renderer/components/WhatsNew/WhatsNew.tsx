import React, { Component } from 'react';
import { eq } from 'semver';
import packageFile from '../../../../package.json';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

import { Icon } from '../Icon/Icon';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { Header } from '../Header/Header';

const { version: currentVersion, discordInvite, repository } = packageFile;

function New(
  {title, desc, version, size = 1}: {
    title: string | JSX.Element,
    desc: string | JSX.Element,
    version: string,
    size?: number
  }
) {
  return (
    <GridItem options={{width: size}}>
      <div className="card full-height-card">
        <div className="card-content">
          <span className="card-title styled-text brand-text center">
            {title}
          </span>
          <p>{desc}</p>
        </div>
        <div className="card-action">
          New in&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            style={{marginRight: '5px'}}
            href={`${repository}/releases/${version}`}
          >
            v{version.replace('v', '')}
          </a>
          {
            eq(version, currentVersion) && <Icon
              options={{
                icon: faExclamationCircle,
                className: '',
                title: 'Current Version',
                size: 'sm'
              }}
            />
          }
        </div>
      </div>
    </GridItem>
  )
}

export default class WhatsNew extends Component {
  render() {
    return (
      <div style={{paddingBottom: '2rem'}}>
        <Header
          title="What's New"
          leftMenu={['home']}
        />

        <Grid
          options={{
            numColumns: 3
          }}
          className="container"
        >
          <New
            title="Mouse Magick"
            desc={
              <span>
                Your mouse coupled with the keyboard can do magick. It can now be used to change the size of the brush, zoom and pan.
                <br /><br />
                Just moving the scroll wheel will change the brush size.<br />
                But if you hold control key on the keyboard, you can do the following:<br />
                <b>Ctrl + Scroll</b>: Zoom in/out of the whiteboard.<br />
                <b>Ctrl + Drag the board with mouse</b>: Will move (pan) a zoomed in whiteboard.<br />
              </span>
            }
            version="v0.7.1"
            size={2}
          />
        </Grid>
      </div>
    )
  }
}
