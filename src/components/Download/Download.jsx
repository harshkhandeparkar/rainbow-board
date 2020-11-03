import React, { Component } from 'react';
import M from 'materialize-css';
import { gt } from 'semver';
import { version } from '../../../package.json';

export default class Download extends Component {
  state = {
    latestVersion: version,
    downloadURLs: {
      deb: '',
      squirrel: '',
      zip_linux: ''
    }
  }

  render() {
    return (
      <div>
        {
          !gt(this.state.latestVersion, version) &&
          (
            <div>
              <button className="dropdown-trigger btn center brand-gradient gradient-text" data-target="download-dropdown">
                <i className="fa fa-download left" />
                Download New Version
              </button>

              <ul id='download-dropdown' className='dropdown-content'>
                {
                  this.state.downloadURLs.deb !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.deb} className="btn-flat brand-gradient gradient-text">
                      <i className="fa fa-linux" />
                      Linux
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.squirrel !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.zip_linux} className="btn-flat brand-gradient gradient-text">
                      <i className="fa fa-linux" />
                      Linux (zip)
                    </a>
                  </li>
                }
                {
                  this.state.downloadURLs.squirrel !== '' &&
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.state.downloadURLs.squirrel} className="btn-flat brand-gradient gradient-text">
                      <i className="fa fa-windows" />
                      Windows
                    </a>
                  </li>
                }
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="btn-flat brand-gradient gradient-text">
                    <i className="fa fa-apple" />
                  </a>
                </li>
              </ul>
            </div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const releaseInfo = JSON.parse(xmlHttp.responseText);

        this.setState({
          latestVersion: releaseInfo.tag_name,
          downloadURLs: {
            deb: releaseInfo.assets.find((asset) => asset.name.includes('.deb')).url,
            zip_linux: releaseInfo.assets.find((asset) => asset.name.includes('.zip') && asset.name.includes('linux')).url,
            squirrel: releaseInfo.assets.find((asset) => asset.name.includes('.exe')).url,
          }
        })
      }
    }
    // xmlHttp.open('GET', 'https://api.github.com/repos/HarshKhandeparkar/rainbow-board/releases/latest', true); // true for asynchronous
    // xmlHttp.send(null);
    xmlHttp.onerror = console.log;
  }
}
