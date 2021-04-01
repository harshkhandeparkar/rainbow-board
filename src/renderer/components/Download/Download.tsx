import React, { Component } from 'react';
import M from 'materialize-css';
import { gt } from 'semver';
import packageFile from '../../../../package.json';

import { Icon } from '../Icon/Icon';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faLinux, faWindows, faApple } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const { version } = packageFile;

function DownloadDropdownOption(
  { link, label, icon }: {
    link: string,
    label: string,
    icon: IconProp
  }
) {
  return (
    <li>
      <a target="_blank" rel="noreferrer" href={link} className="btn-flat brand-text">
        <Icon options={{icon}} rightMargin={true} />
        {label}
      </a>
    </li>
  )
}

export default class Download extends Component {
  state = {
    latestVersion: version,
    downloadURLs: {
      deb: '',
      exe: '',
      zip_linux: '',
      appimg: '',
      dmg: ''
    }
  }

  render() {
    return (
      <div>
        {
          (gt(this.state.latestVersion, version)) &&
          (
            <div>
              <button className="dropdown-trigger btn center brand-text full-width" data-target="download-dropdown" title="Download New Version">
                <Icon options={{icon: faDownload}} rightMargin={true} />
                Download New Version
              </button>

              <ul id="download-dropdown" className="dropdown-content">
                <DownloadDropdownOption
                  link="https://snapcraft.io/rainbow-board"
                  label="Linux (snap)"
                  icon={faLinux}
                />
                {
                  this.state.downloadURLs.exe !== '' &&
                  <DownloadDropdownOption
                    link={this.state.downloadURLs.exe}
                    label="Windows (EXE)"
                    icon={faWindows}
                  />
                }
                {
                  this.state.downloadURLs.dmg !== '' &&
                  <DownloadDropdownOption
                    link={this.state.downloadURLs.dmg}
                    label="Mac (DMG)"
                    icon={faApple}
                  />
                }
                {
                  this.state.downloadURLs.deb !== '' &&
                  <DownloadDropdownOption
                    link={this.state.downloadURLs.deb}
                    label="Linux (DEB)"
                    icon={faLinux}
                  />
                }
                {
                  this.state.downloadURLs.appimg !== '' &&
                  <DownloadDropdownOption
                    link={this.state.downloadURLs.appimg}
                    label="Linux (Portable)"
                    icon={faLinux}
                  />
                }
                {
                  this.state.downloadURLs.zip_linux !== '' &&
                  <DownloadDropdownOption
                    link={this.state.downloadURLs.zip_linux}
                    label="Linux (ZIP)"
                    icon={faLinux}
                  />
                }
              </ul>
            </div>
          )
        }
      </div>
    )
  }

  _initDropdown() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }

  componentDidUpdate() {
    this._initDropdown();
  }

  componentDidMount() {
    this._initDropdown();

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const releaseInfo: {assets: { name: string, browser_download_url: string }[], tag_name: string} = JSON.parse(xmlHttp.responseText);

        const debAsset = releaseInfo.assets.find((asset) => asset.name.includes('.deb'));
        const zipLinuxAsset = releaseInfo.assets.find((asset) => asset.name.includes('.zip') && asset.name.includes('linux'));
        const exeAsset = releaseInfo.assets.find((asset) => asset.name.includes('.exe'));
        const appimgAsset = releaseInfo.assets.find((asset) => asset.name.toLowerCase().includes('.appimage'));
        const dmgAsset = releaseInfo.assets.find((asset) => asset.name.toLowerCase().includes('.dmg'));

        this.setState({
          latestVersion: releaseInfo.tag_name,
          downloadURLs: {
            deb: debAsset ? debAsset.browser_download_url : '',
            zip_linux: zipLinuxAsset ? zipLinuxAsset.browser_download_url : '',
            exe: exeAsset ? exeAsset.browser_download_url : '',
            appimg: appimgAsset ? appimgAsset.browser_download_url : '',
            dmg: dmgAsset ? dmgAsset.browser_download_url : ''
          }
        })
      }
    }
    xmlHttp.open('GET', 'https://api.github.com/repos/HarshKhandeparkar/rainbow-board/releases/latest', true); // true for asynchronous
    xmlHttp.send(null);
    xmlHttp.onerror = console.log;
  }
}
