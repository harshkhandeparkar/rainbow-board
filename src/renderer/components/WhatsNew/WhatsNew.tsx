import React, { Component } from 'react';
import { eq } from 'semver';
import packageFile from '../../../../package.json';

import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

import { Icon } from '../Icon/Icon';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { Header } from '../Header/Header';
import * as PATHS from '../../../common/constants/paths';
import * as SHORTCUTS from '../../../common/constants/shortcuts';

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
            title="Multiple Export"
            desc={
              <span>
                This feature was requested by Gabriella on the Rainbow Board <a href={discordInvite} rel="noreferrer" target="_blank">Discord server.</a> <br /><br />

                You can now export all the pages from the whiteboard at once in a folder. Click on "Export All Pages..." button at the bottom of the prompt that opens
                by using the {SHORTCUTS.EXPORT_PAGE.platformFormattedString} shortcut or clicking on the export page button. <br /><br />

                Select a folder to export the files to and a name for the files. Each file will be named using the following format: `name-xx.png`
                where name is the name you type and xx is the page number. The pages can be exported as SVG or PNG.
              </span>
            }
            version="v0.8.1"
            size={3}
          />
        </Grid>
      </div>
    )
  }
}
