import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './WhatsNew.css';

import { setCookie } from '../../util/cookies';
import { version } from '../../../package.json';

function New({title, desc, version, link}) {
  return (
    <div className="card">
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
    setCookie('lastVersionChangelogShown', version);
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
            <div className="col s6">
              <New
                title="Multiple Pages"
                desc="You can now add multiple pages and switch between them by using the buttons at the left and right edges of the screen."
                version="v0.5.1"
              />
            </div>
            <div className="col s6">
              <New
                title="SVG"
                desc={(<p>Rainbow Board new uses <b>svg</b> instead of <b>canvas</b> which means that now you can save the slide as SVG, the whiteboard is faster, resizing is better and we will add new tools such as text tool in the future.</p>)}
                version="v0.5.0"
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row valign-wrapper">
            <div className="col s6">
              <New
                title="Hotkeys"
                desc={(<p><b>Ctrl+Z</b> or <b>Command+Z</b> to undo, <b>Ctrl+Shift+Z</b> or <b>Command+Shift+Z</b> to redo, and <b>Ctrl+S</b> or <b>Command+S</b> to save the slide!</p>)}
                version="0.4.0"
              />
            </div>
            <div className="col s6">
              <New
                title="Undo Redo"
                desc={(<p>You can now <b>undo</b> and <b>redo</b>  using the shiny buttons or hotkeys.</p>)}
                version="0.4.0"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
