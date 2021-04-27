import React, { Component } from 'react';
import { SAVE, EXPORT_PAGE } from '../../../common/constants/shortcuts';

import { changelogSetting } from '../../util/settings';
import packageFile from '../../../../package.json';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

import { Header } from '../Header/Header';

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
      <div className="card full-height-card">
        <div className="card-content">
          <span className="card-title styled-text brand-text center">{title}</span>
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
    changelogSetting.set(version);
  }

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
            title="Changed Shortcuts"
            desc={`${SAVE.platformFormattedString} is now used to save the whiteboard as a ".rainbow" file and ${EXPORT_PAGE.platformFormattedString} to export a single page as an image.`}
            version="v0.7.1"
          />
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
          <New
            title="Visible Eraser"
            desc="The eraser now has a dotted outline to show how large it is."
            version="v0.7.1"
            size={1}
          />
          <New
            title="Background Type"
            desc="You can now select a background for the whiteboard - Ruled, Grid or Blank - using the buttons in te botton toolbar."
            version="v0.7.1"
            size={1}
          />
        </Grid>
      </div>
    )
  }
}
