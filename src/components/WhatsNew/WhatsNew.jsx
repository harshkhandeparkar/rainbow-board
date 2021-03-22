  import React, { Component } from 'react';
  import { NavLink } from 'react-router-dom';

  import { setSetting } from '../../util/settings';
  import { version } from '../../../package.json';

  function New({title, desc, version, link}) {
    return (
      <div className="card new-card">
        <div className="card-content">
          <span className="card-title styled-text brand-text">{title}</span>
          <p>{desc}</p>
        </div>
        {
          version &&
          <div className="card-action">
            Added in <a target="_blank" rel="noreferrer" href={`https://github.com/HarshKhandeparkar/rainbow-board/releases/${version}`}>v{version.replace('v', '')}</a>
          </div>
        }
        {
          link &&
          <div className="card-action">
            <a target="_blank" rel="noreferrer" href={link}>Link</a>
          </div>
        }
      </div>
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
              <span className="brand-logo center styled-text brand-text">What's New</span>
              <NavLink to="/" title="Home">
                <i className="material-icons brand-text">home</i>
              </NavLink>
            </div>
          </nav>

          <div className="container">
            <div className="row valign-wrapper">
              <div className="col s4">
                <New
                  title="Delete Page"
                  desc="You can delete the current page using the button at the top right corner. Also the current page number and total pages are displayed at the top left corner. Thanks to AnarcHy on Discord for the feedback."
                  version="v0.5.3"
                />
              </div>
              <div className="col s4">
                <New
                  title="SVG Background"
                  desc="The saved SVG slide now has a background color."
                  version="v0.5.3"
                />
              </div>
              <div className="col s4">
                <New
                  title="Better Load"
                  desc="The app starts with a splash screen and loads only when ready."
                  version="v0.5.3"
                />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row valign-wrapper">
              <div className="col s4">
                <New
                  title="Save Settings"
                  desc="Your settings such as theme will be saved and the same theme will be used on restart."
                  version="v0.5.2"
                />
              </div>
              <div className="col s4">
                <New
                  title="Multiple Pages"
                  desc="You can now add multiple pages and switch between them by using the buttons at the left and right edges of the screen."
                  version="v0.5.1"
                />
              </div>
              <div className="col s4">
                <New
                  title="SVG"
                  desc={(<span>Rainbow Board new uses <b>svg</b> instead of <b>canvas</b> which means that now you can save the slide as SVG, the whiteboard is faster, resizing is better and we will add new tools such as text tool in the future.</span>)}
                  version="v0.5.0"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
