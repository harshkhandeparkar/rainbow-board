import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Main from './components/Main';
import Pages from './components/Pages/Pages';
import Credits from './components/Credits/Credits';
import WhatsNew from './components/WhatsNew/WhatsNew';
import Settings from './components/Settings/Settings';

import history from './util/history';
import themeManager from './util/theme';

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

            .checkbox .checkmark {
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

            .color-picker input:focus, .color-picker input:active {
              box-shadow: 0 1px 0 ${this.state.css.highlightTextColor} !important;
            }

            .save-type.selected, .save-type:hover {
              border: ${this.state.css.highlightTextColor} solid 1px;
            }

            .save-type {
              border: ${this.state.css.borderColor} solid 1px;
            }

            body, .modal, .modal-footer {
              background-color: ${this.state.css.bgColor} !important;
              color: ${this.state.css.textColor} !important;
            }

            .nav-wrapper, nav {
              background-color: ${this.state.css.bg1} !important;
            }

            button, .btn, .btn-flat, .btn-floating, .card, .bottom-toolbar, .top-toolbar, select {
              background-color: ${this.state.css.bg1} !important;
              color: ${this.state.css.textColor};
            }

            .btn, .btn-floating, select, .color-picker, .bottom-toolbar, .top-toolbar, .page, .separator-line, .card, .dropdown-content, .dropdown-arrow {
              border: 1px solid ${this.state.css.borderColor} !important;
            }

            .card-action {
              border-top: 1px solid ${this.state.css.borderColor} !important;
            }

            .color-picker * {
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
        <Route exact path="/" component={Main} />
        <Route path="/pages" component={Pages} />
        <Route path="/credits" component={Credits} />
        <Route path="/new" component={WhatsNew} />
        <Route path="/settings" component={Settings} />
      </Router>
    )
  }
}

export default App;
