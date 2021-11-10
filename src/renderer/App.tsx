import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Main from './components/Main';
import Whiteboard from './components/Whiteboard/Whiteboard';
import Credits from './components/Credits/Credits';
import WhatsNew from './components/WhatsNew/WhatsNew';
import Settings from './components/Settings/Settings';
import * as PATHS from '../common/constants/paths';

import history from './util/history';
import themeManager from './util/theme';
import { Shortcuts } from './components/Settings/Shortcuts/Shortcuts';

class App extends Component {
  state = {
    ...themeManager.getTheme()
  }

  componentDidMount() {
    themeManager.onThemeChange('app-component-handler', ({theme, css}) => {
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

            .checkbox .checkmark, .keycombo-box {
              border: 1px solid ${this.state.css.borderColor};
              background-color: ${this.state.css.bg1}
            }

            .checkbox input:checked ~ .checkmark:after {
              border-color: ${this.state.css.highlightTextColor};
            }

            *::-webkit-scrollbar {
              width: 12px;
            }

            *::-webkit-scrollbar-track {
              background: ${this.state.css.bgColor};
            }

            *::-webkit-scrollbar-thumb {
              background-color: ${this.state.css.highlight};
              border-radius: 0;
            }

            .brand-text, .card .card-action a {
              color: ${this.state.css.highlightTextColor} !important;
            }

            input[type=range]::-webkit-slider-thumb, .thumb {
              background-color: ${this.state.css.highlightTextColor} !important;
            }

            .thumb {
              border-bottom-color: ${this.state.css.highlightTextColor} !important;
            }

            .color-palette input:focus, .color-palette input:active {
              box-shadow: 0 1px 0 ${this.state.css.highlightTextColor} !important;
            }

            .export-page-modal-btn.selected, .export-page-modal-btn:hover {
              border: ${this.state.css.highlightTextColor} solid 1px;
            }

            .export-page-modal-btn:hover {
              cursor: pointer;
              background-color: ${this.state.css.bg1};
            }

            .export-page-modal-btn, .modal, table, th, td {
              border: ${this.state.css.borderColor} solid 1px;
            }

            body, .modal, .modal-footer {
              background-color: ${this.state.css.bgColor} !important;
              color: ${this.state.css.textColor} !important;
            }

            .nav-wrapper, nav {
              background-color: ${this.state.css.bg1} !important;
            }

            button, .btn, .btn-flat
            , .btn-floating, .card, .bottom-toolbar, .top-toolbar, select {
              background-color: ${this.state.css.bg1} !important;
              color: ${this.state.css.textColor};
            }

            .btn, .btn-floating, select, .color-palette, .bottom-toolbar, .top-toolbar, .page, .vertical-separator-line, .horizontal-separator-line, .card, .dropdown-content, .dropdown-arrow {
              border: 1px solid ${this.state.css.borderColor} !important;
            }

            .card-action {
              border-top: 1px solid ${this.state.css.borderColor} !important;
            }

            .color-palette * {
              color: ${this.state.css.textColor} !important;
            }

            button:hover, .btn:hover, .btn-flat:hover, .btn-floating:hover, .lever::after, .lever, .btn.disabled, .active {
              background-color: ${this.state.css.highlight} !important;
            }

            .dropdown-content, .dropdown-arrow {
              background-color: ${this.state.css.bg1} !important;
            }

            .dropdown-content li:hover {
              background-color: ${this.state.css.highlight} !important;
            }

            footer {
              color: ${this.state.css.textColor} !important;
              background-color: ${this.state.css.bg1} !important;
            }
            `
          }
        </style>
        <Route exact path={`/${PATHS.HOME}`} component={Main} />
        <Route path={`/${PATHS.WHITEBOARD}`} component={Whiteboard} />
        <Route path={`/${PATHS.CREDITS}`} component={Credits} />
        <Route path={`/${PATHS.WHATS_NEW}`} component={WhatsNew} />
        <Route path={`/${PATHS.SETTINGS}`} component={Settings} />
        <Route path={`/${PATHS.SHORTCUTS}`} component={Shortcuts} />
      </Router>
    )
  }
}

export default App;
