import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './sass/materialize.scss';
import './sass/index.scss';

import { go } from './util/navigation';
// import { ipcRenderer } from 'electron';
import ipcHandler from './util/ipc-handler';
import history from './util/history';

import * as EVENTS from '../common/constants/eventNames';
import * as PATHS from '../common/constants/paths';
// import { readFile } from 'fs';
// import { basename } from 'path';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// Enable menubar hotkeys
// ipcRenderer.send(EVENTS.SET_HOTKEYS);

// Navigation events from main process
ipcHandler.addEventHandler(EVENTS.GO, 'go-handler', (e: any, {to}: {to: string}) => go(to));

// Open a .rainbow file
ipcHandler.addEventHandler(EVENTS.OPEN, 'open-handler', (e, {path}: {path: string}) => {
  // readFile(path, (err, data) => {
  //   if (!err) {
  //     history.push({
  //       pathname: `/${PATHS.WHITEBOARD}`,
  //       state: {
  //         open: {
  //           data: JSON.parse(data.toString()),
  //           location: path,
  //           fileName: basename(path)
  //         }
  //       }
  //     })
  //   }
  // })
})
