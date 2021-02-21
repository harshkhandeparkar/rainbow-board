import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './WhatsNew.css';

function New({title, desc, version}) {
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title brand-gradient gradient-text styled-text">{title}</span>
        <p>{desc}</p>
      </div>
      <div className="card-action">
        Added in <a href={`https://github.com/HarshKhandeparkar/rainbow-board/releases/${version}`}>v{version.replace('v', '')}</a>
      </div>
    </div>
  )
}

export default class WhatsNew extends Component {
  render() {
    return (
      <div>
        <nav className="brand-gradient">
          <div className="nav-wrapper header container">
            <span className="logo-text brand-logo center styled-text">What's New</span>
            <NavLink to="/" title="Home">
              <i className="material-icons">home</i>
            </NavLink>
          </div>
        </nav>

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
