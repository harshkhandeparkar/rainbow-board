import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Main from './components/Main.jsx';
import Pages from './components/Pages/Pages.jsx';
import Credits from './components/Credits/Credits';
import WhatsNew from './components/WhatsNew/WhatsNew';

class App extends Component {
  whiteTheme = {
    bgColor: 'white',
    bg1: 'white',
    bg2: 'white',
    highlight: '#e6e6e6',
    textColor: 'black'
  }

  darkTheme = {
    bgColor: '#121212',
    bg1: '#202020',
    bg2: '#303030',
    highlight: '#303030',
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

            button, .btn, .btn-flat, .btn-floating, .card, .color-picker, .bottom-toolbar, .top-toolbar {
              background-color: ${this.state.theme.bg1} !important;
              color: ${this.state.theme.textColor};
            }

            .color-picker * {
              color: ${this.state.theme.textColor} !important;
            }

            button:hover, .btn:hover, .btn-flat:hover, .btn-floating:hover, .lever::after, .lever, .btn.disabled, .active {
              background-color: ${this.state.theme.highlight} !important;
            }

            .dropdown-content {
              background-color: ${this.state.theme.bgColor} !important;
            }

            .dropdown-content li:hover {
              background-color: ${this.state.theme.highlight} !important;
            }
            `
          }
        </style>
        <Route exact path="/" render={() => <Main getTheme={() => this.getTheme()} setTheme={(theme) => this.setTheme(theme)} toggleTheme={() => this.toggleTheme()} />} />
        <Route path="/pages" render={() => <Pages getTheme={() => this.getTheme()} />} />
        <Route path="/credits" component={Credits} />
        <Route path="/new" component={WhatsNew} />
      </HashRouter>
    )
  }
}

export default App;
