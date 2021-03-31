import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss';
import './css/index.css';

import { go } from './util/navigation';
import { ipcRenderer } from 'electron';
import ipcHandler from './util/ipc-handler';

import * as EVENTS from '../common/constants/eventNames';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

ipcRenderer.send(EVENTS.SET_HOTKEYS);
ipcHandler.addEventHandler(EVENTS.GO, 'go-handler', (e: any, {to}: {to: string}) => go(to));
