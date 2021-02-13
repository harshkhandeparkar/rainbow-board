import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Credits.css';

function Credit({title, desc, link}) {
  return (
    <div class="card">
      <div class="card-content">
        <span class="card-title brand-gradient gradient-text styled-text">{title}</span>
        <p>{desc}</p>
      </div>
      <div class="card-action">
        <a href={link}>Link</a>
      </div>
    </div>
  )
}

export default class Credits extends Component {
  render() {
    return (
      <div>
        <nav className="brand-gradient">
          <div className="nav-wrapper header container">
            <span className="logo-text brand-logo center styled-text">Credits</span>
            <NavLink to="/" title="Home">
              <i className="material-icons">home</i>
            </NavLink>
          </div>
        </nav>

        <div className="container">
          <div className="row valign-wrapper">
            <div className="col s4">
              <Credit
                title="Electron"
                desc="Used to create the desktop version of the app."
                link="https://electronjs.org"
              />
            </div>
            <div className="col s4">
              <Credit
                title="React"
                desc="Used to create the UI."
                link="https://reactjs.org"
              />
            </div>
            <div className="col s4">
              <Credit
                title="GPU.js"
                desc="Used to supercharge Rainbow Board by running normal JavaScript on the GPU!"
                link="https://gpu.rocks"
              />
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="col s4">
              <Credit
                title="GPU.js Real Renderer"
                desc="Used to make the whiteboard work."
                link="https://harshkhandeparkar.github.io/gpujs-real-renderer"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Electron Forge"
                desc="Used to package the app for different operating systems."
                link="https://electronforge.io"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Electron Builder"
                desc="Used to package the app for even more operating systems."
                link="https://electron.build"
              />
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="col s4">
              <Credit
                title="Materialize CSS"
                desc="Used to make the UI look cool."
                link="https://materializecss.com"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Font Awesome"
                desc="Awesome icons."
                link="https://fontawesome.com"
              />
            </div>
            <div className="col s4">
              <Credit
                title="React Color"
                desc="Simple color picker."
                link="https://casesandberg.github.io/react-color/"
              />
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="col s4">
              <Credit
                title="PNGjs"
                desc="Used to download the PNG slides."
                link="https://github.com/lukeapage/pngjs"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Oxygen Font"
                desc="The default font used."
                link="https://fonts.google.com/specimen/Oxygen"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Finger Paint Font"
                desc="The paint-brush styled font used on this page."
                link="https://fonts.google.com/specimen/Finger+Paint"
              />
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="col s4">
              <Credit
                title="GIMP"
                desc="Used to create the logo."
                link="https://gimp.org"
              />
            </div>
            <div className="col s4">
              <Credit
                title="CSSGradient.io"
                desc="Used to create the gradient used everywhere."
                link="https://cssgradient.io"
              />
            </div>
            <div className="col s4">
              <Credit
                title="Full List of Libraries"
                desc="Complete list of dependencies used."
                link="https://github.com/HarshKhandeparkar/rainbow-board/network/dependencies"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
