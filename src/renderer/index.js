import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'materialize-css/dist/css/materialize.min.css';

import './css/index.css';
import './css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.css';

import { go } from './util/navigation';
import { ipcRenderer } from 'electron';
import ipcHandler from './util/ipc-handler';

import * as EVENTS from '../common/constants/eventNames';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

ipcRenderer.send(EVENTS.SET_HOTKEYS);
ipcHandler.addEventHandler(EVENTS.GO, 'go-handler', (e, {to}) => go(to))
