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
          Open Source, Cross Platform Whiteboard software made with React, Electron and GPUJS Real Renderer.
        </p>

        <NavLink to="/pages" className="btn center brand-gradient gradient-text">
          <i className="material-icons">brush</i> Start Writing
        </NavLink>
      </div>
    </div>
  )
}

export default Main;
