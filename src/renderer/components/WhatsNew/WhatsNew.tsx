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
import { Link } from 'react-router-dom';

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
            title="Technologically Enhanced eXtreme Transcription Tool"
            desc={
              <span>
                The <b>T</b>echnologically <b>E</b>nhanced e<b>X</b>treme <b>T</b>ranscription (TEXT) Tool has been the single most requested feature for Rainbow Board. <br />
                Over 4 people requested the same feature on the Rainbow Board <a href={discordInvite} target="_blank" rel="noreferrer">Discord server</a>. <br />
                You can select the TEXT Tool using the toolbar on the bottom or using the <i>{SHORTCUTS.TEXT_TOOL.platformFormattedString}</i> keyboard shortcut.
                To get instructions on how to use the TEXT TOOL, click on the <b>?</b> icon on the top left corner.
              </span>
            }
            version="v0.8.3"
            size={2}
          />
          <New
            title="Usage Hints"
            desc="To get help on how to use the selected tool, you can now click on the ? icon on the top right corner."
            version="v0.8.3"
          />

          <New
            title="Safer Rainbow Files"
            desc={
              <span>
                The &quot;.rainbow&quot; file format used to save and load the whiteboard has been changed due to a potential security vulnerability.
                I found and tried to exploit this vulnerability but it didn't work so perhaps the threat isn't as dangerous but the vulnerability was patched anyway. <br /> <br />
                On loading an older format of the file, you will be presented with a warning. If the file is from a trusted source, or was exported directly from Rainbow Board without tampering then it is perfectly safe to load it.<br />
                This file will be converted to the safer format on saving next time. <br />
                <b>NOTE: THIS NEW FORMAT WILL NOT OPEN ON OLDER VERSIONS OF RAINBOW BOARD. PLEASE UPDATE BEFORE USING.</b>
              </span>
            }
            version="v0.8.3"
            size={3}
          />

          <New
            title="Custom Accent Color"
            desc={
              <span>
                You can select a custom accent color apart from the theme from the <Link to={PATHS.SETTINGS} title={SHORTCUTS.SETTINGS.platformFormattedString}>settings</Link>. <br/>
                This change was requested by thedudethatcode on the Rainbow Board<a href={discordInvite} target="_blank" rel="noreferrer">Discord server</a>.
              </span>
            }
            version="v0.8.3"
          />
          <New
            title="Customizable Shortcuts"
            desc={
              <span>
                If you don't like the default keyboard shortcuts of Rainbow Board, you can now change them from the <Link to={PATHS.SHORTCUTS}>shortcut settings</Link> in the <Link to={PATHS.SETTINGS} title={SHORTCUTS.SETTINGS.platformFormattedString}>settings</Link>.
              </span>
            }
            version="v0.8.3"
          />
          <New
            title="Smaller Changes"
            desc="Many more smaller tweaks and fixes have been made."
            version="v0.8.3"
          />
        </Grid>
      </div>
    )
  }
}
