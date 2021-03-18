import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Credits.css';

function Credit({title, desc, link}) {
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title styled-text brand-text">{title}</span>
        <p>{desc}</p>
      </div>
      <div className="card-action">
        <a href={link}>Link</a>
      </div>
    </div>
  )
}

export default class Credits extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center styled-text brand-text">Credits</span>
            <NavLink to="/" title="Home">
              <i className="material-icons brand-text">home</i>
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
                title="SVG Real Renderer"
                desc="Used to make the whiteboard work."
                link="https://harshkhandeparkar.github.io/svg-real-renderer"
              />
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="col s6">
              <Credit
                title="Electron Forge"
                desc="Used to package the app for different operating systems."
                link="https://electronforge.io"
              />
            </div>
            <div className="col s6">
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
                title="SVG Saver"
                desc="Used to save the slide as PNG and SVG."
                link="https://github.com/Hypercubed/svgsaver"
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
            <div className="col s6">
              <Credit
                title="GIMP"
                desc="Used to create the logo."
                link="https://gimp.org"
              />
            </div>
            <div className="col s6">
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
