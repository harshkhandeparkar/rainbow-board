import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Main from './components/Main.jsx';
import Pages from './components/Pages/Pages.jsx';
import Credits from './components/Credits/Credits.jsx';
import WhatsNew from './components/WhatsNew/WhatsNew.jsx';

import history from './util/history';
import themeManager from './util/theme';

class App extends Component {
  state = {
    ...themeManager.getTheme()
  }

  componentDidMount() {
    themeManager.onThemeChange('app-component-handler', (theme, css) => {
      this.setState({
        theme,
        css
      })
    })
  }

  render() {
    return (
      <Router history={history}>
        <style>
          {
            `
            ${this.state.css.globalCSS}

            .brand-text, .card .card-action a {
              color: ${this.state.css.highlightTextColor} !important;
            }

            .save-type.selected {
              border: ${this.state.css.highlightTextColor} solid 1px;
            }

            body, .modal, .modal-footer {
              background-color: ${this.state.css.bgColor} !important;
              color: ${this.state.css.textColor} !important;
            }

            .nav-wrapper, nav {
              background-color: ${this.state.css.bg1} !important;
            }

            button, .btn, .btn-flat, .btn-floating, .card, .color-picker, .bottom-toolbar, .top-toolbar {
              background-color: ${this.state.css.bg1} !important;
              color: ${this.state.css.textColor};
            }

            .color-picker * {
              color: ${this.state.css.textColor} !important;
            }

            button:hover, .btn:hover, .btn-flat:hover, .btn-floating:hover, .lever::after, .lever, .btn.disabled, .active {
              background-color: ${this.state.css.highlight} !important;
            }

            .dropdown-content {
              background-color: ${this.state.css.bg1} !important;
            }

            .dropdown-content a {
              height: 100%;
            }

            .dropdown-content li:hover {
              background-color: ${this.state.css.highlight} !important;
            }

            footer {
              color: ${this.state.css.textColor} !important;
              background-color: ${this.state.css.bg1} !important;
            }

            .footer-copyright {
              color: ${this.state.css.textColor} !important;
              background-color: ${this.state.css.bg2} !important;
            }
            `
          }
        </style>
        <Route exact path="/" component={Main} />
        <Route path="/pages" component={Pages} />
        <Route path="/credits" component={Credits} />
        <Route path="/new" component={WhatsNew} />
      </Router>
    )
  }
}

export default App;
