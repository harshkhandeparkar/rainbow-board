import React, { Component } from 'react';

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
        />

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
            title="MSI"
            desc="
            Since the EXE file for windows is sometimes considered harmful(even though it is not), a .msi installer file has been added and
             will be provided for v0.7.0 and future versions.
            "
            version="v0.7.0"
            size={1}
          />
          <New
            title="More Shortcuts"
            desc={<span>More shortcuts have been added. You can find them out in the menu bar. The most important one is &quot;Ctrl + Space&quot; or &quot;Cmd + Space&quot; on Mac to switch to the previous tool. Suggested by Pffft on the <a href={packageFile.discordInvite}>Discord Server</a>.</span>}
            version="v0.7.0"
            size={1}
          />

          <New
            title="Themes And Settings"
            desc={
              <span>
                Instead of just two themes - Light and Dark, a settings page has been added where the theme can be chosen. <br />
                Two new themes have also been added: <br />
                <b>Dark Whiteboard</b>: (Board is white but UI dark) <br />
                <b>Light Blackboard</b>: (Board is dark but UI light). <br /> <br />
                Three other settings have also been added: <br />
                <b>Start Maximized</b>: App starts maximized if this settings is checked. <br />
                <b>Start Fullscreen</b>: App starts fullscreen if this settings is checked. <br />
                <b>Show Menu Bar When Fullscreen</b>: App menu bar is displayed in fullscreen if this setting is checked.
              </span>
            }
            version="v0.7.0"
            size={3}
          />

          <New
            title="UI Cleanup And Redesign"
            desc={
              <span>
                The new UI tries to follow the <a href="https://developer.gnome.org/hig/stable/">GNOME Human Interface Guidelines</a> <br />
                The UI has been cleaned up. Reduced shadows and transitions. Uses cleaner borders and the themes are more consistent. New icons from <a href="https://fontawesome.com">FontAwesome v5</a>. <br />
                There are tooltips to most buttons with shortcut keys displayed. The top menu only displays what is necessary and some new items have been added to it. <br />
                The brush and line colors are displayed as a dot in the tool's button (Suggested by Pffft on the <a href={packageFile.discordInvite}>Discord Server</a>). The scrollbar has also been tweaked to look consistent with the theme.
              </span>
            }
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
