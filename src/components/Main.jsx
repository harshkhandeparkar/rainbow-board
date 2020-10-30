import { NavLink } from 'react-router-dom';
import { version } from '../../package.json';

function Main() {
  return (
    <div id="main">
      <nav>
        <div className="nav-wrapper header brand-gradient">
          <span className="logo-text brand-logo center">Rainbow Board</span>
        </div>
      </nav>
      <div className="container center">
        <p>
          Open Source, Cross Platform Whiteboard software made with React JS, Electron and GPU.JS Real Renderer.
        </p>

        <NavLink to="/pages" className="btn center brand-gradient gradient-text">
          <i className="fa fa-paint-brush left" /> Start New
        </NavLink>
        <NavLink to="/" className="btn center brand-gradient gradient-text">
          <i className="fa fa-folder-open left" />Open Saved File
        </NavLink>
      </div>

      <footer className="page-footer brand-gradient gradient-text">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5>Rainbow Board</h5>
              <p>You can use rows and columns here to organize your footer content.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5>Made Using</h5>
              <ul>
                <li><a href="https://electronjs.org" target="_blank" rel="noreferrer">Electron</a></li>
                <li><a href="https://reactjs.org" target="_blank" rel="noreferrer">React</a></li>
                <li><a href="https://gpu.rocks" target="_blank" rel="noreferrer">GPU.js</a></li>
                <li><a href="https://harshkhandeparkar.github.io/gpujs-real-renderer" target="_blank" rel="noreferrer">GPU.js Real Renderer</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright container">
          <div className="container">
            v{version}
            <a
              className="right"
              href="https://github.com/HarshKhandeparkar/rainbow-board"
              target="_blank"
            >Star On Github</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Main;
