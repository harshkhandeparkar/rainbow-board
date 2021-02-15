import React, { Component } from 'react';
import Main from './components/Main.jsx';
import Pages from './components/Pages/Pages.jsx';
import { HashRouter, Route } from 'react-router-dom';
import Credits from './components/Credits/Credits';

class App extends Component {
  whiteTheme = {
    bgColor: 'white',
    bg1: '#fcfcfc',
    bg2: '#f0f0f0',
    textColor: 'black'
  }

  darkTheme = {
    bgColor: '#121212',
    bg1: '#202020',
    bg2: '#303030',
    textColor: '#f1f1f1'
  }

  state = {
    theme: this.whiteTheme
  }

  setTheme(theme) {
    if (theme === 'white') this.setState({theme: this.whiteTheme});
    else if (theme === 'dark') this.setState({theme: this.darkTheme});
  }

  toggleTheme() {
    if (this.state.theme === this.whiteTheme) this.setState({theme: this.darkTheme});
    else this.setState({theme: this.whiteTheme});
  }

  getTheme() {
    return this.state.theme === this.whiteTheme ? 'white' : 'dark';
  }

  render() {
    return (
      <HashRouter>
        <style>
          {
            `
            body, .modal, .modal-footer {
              background-color: ${this.state.theme.bgColor} !important;
              color: ${this.state.theme.textColor} !important;
            }

            button, .btn, .btn-flat, .btn-floating, .lever, .card, .color-picker, .bottom-toolbar {
              background-color: ${this.state.theme.bg1} !important;
              color: ${this.state.theme.textColor} !important;
            }

            .color-picker * {
              color: ${this.state.theme.textColor} !important;
            }

            button:hover, .btn:hover, .btn-flat:hover, .btn-floating:hover, .lever::after, .btn.disabled {
              background-color: ${this.state.theme.bg2} !important;
            }

            .dropdown-content {
              background-color: ${this.state.theme.bgColor} !important;
            }

            .dropdown-content li:hover {
              background-color: ${this.state.theme.bg1} !important;
            }
            `
          }
        </style>
        <Route exact path="/" render={() => <Main getTheme={() => this.getTheme()} setTheme={(theme) => this.setTheme(theme)} toggleTheme={() => this.toggleTheme()} />} />
        <Route path="/pages" render={() => <Pages getTheme={() => this.getTheme()} />} />
        <Route path="/credits" component={Credits} />
      </HashRouter>
    )
  }
}

export default App;
