import { NavLink } from 'react-router-dom';

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
    </div>
  )
}

export default Main;
