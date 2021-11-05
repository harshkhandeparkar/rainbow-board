import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './sass/index.scss';
import './sass/materialize.scss';

import { go } from './util/navigation';
import { ipcRenderer } from 'electron';
import ipcHandler from './util/ipc-handler';
import history from './util/history';

import * as EVENTS from '../common/constants/events';
import * as PATHS from '../common/constants/paths';
import { readFile } from 'fs';
import { basename } from 'path';
import { ipcRendererSend } from './util/ipc-sender';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// Enable menubar hotkeys
ipcRendererSend(EVENTS.SET_HOTKEYS, null);

// Navigation events from main process
ipcHandler.addEventHandler(EVENTS.GO, 'go-handler', (e: any, {to}: {to: string}) => go(to));

// Open a .rainbow file
ipcHandler.addEventHandler(EVENTS.OPEN, 'open-handler', (e, {path}: {path: string}) => {
  readFile(path, (err, data) => {
    if (!err) {
      try {
        const fileData = JSON.parse(data.toString());
        history.push({
          pathname: `/${PATHS.WHITEBOARD}`,
          state: {
            open: {
              data: fileData,
              location: path,
              fileName: basename(path)
            }
          }
        })
      }
      catch(e) {
        console.log('error parsing file', e);
      }
    }
  })
})
