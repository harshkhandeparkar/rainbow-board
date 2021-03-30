import React, { Component } from 'react';
import M from 'materialize-css';
import { gt } from 'semver';
import packageFile from '../../../../package.json';

import { Icon } from '../Icon/Icon.jsx';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faLinux, faWindows, faApple } from '@fortawesome/free-brands-svg-icons';

const { version } = packageFile;

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
              <button className="dropdown-trigger btn center brand-text" data-target="download-dropdown" title="Download New Version">
                <Icon icon={faDownload} rightmargin />
                Download New Version
              </button>

              <ul id="download-dropdown" className="dropdown-content">
                <li>
                  <a target="_blank" rel="noreferrer" href="https://snapcraft.io/rainbow-board" className="btn-flat brand-text">
                    <Icon icon={faLinux} rightmargin />
                    Linux (snap)
                  </a>
                </li>
                {
                  this.state.downloadURLs.exe !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.exe} className="btn-flat brand-text">
                      <Icon icon={faWindows} rightmargin />
                      Windows (EXE)
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.dmg !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.exe} className="btn-flat brand-text">
                      <Icon icon={faApple} rightmargin />
                      Mac (DMG)
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.deb !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.deb} className="btn-flat brand-text">
                      <Icon icon={faLinux} rightmargin />
                      Linux (deb)
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.appimg !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.appimg} className="btn-flat brand-text">
                      <Icon icon={faLinux} rightmargin />
                      Linux (portable)
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.zip_linux !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.zip_linux} className="btn-flat brand-text">
                      <Icon icon={faLinux} rightmargin />
                      Linux (zip)
                    </a>
                  </li>
                }
              </ul>
            </div>
          )
        }
      </div>
    )
  }

  componentDidUpdate() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const releaseInfo = JSON.parse(xmlHttp.responseText);

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
