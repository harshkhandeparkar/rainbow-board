import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'materialize-css/dist/css/materialize.min.css';

import './css/index.css';
import './css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.css';

import { getSetting, hasSetting } from './util/settings';

let theme = 'white';

if (hasSetting('theme')) theme = getSetting('theme');

ReactDOM.render(
  <React.StrictMode>
    <App theme={theme} />
  </React.StrictMode>,
  document.getElementById('root')
)
