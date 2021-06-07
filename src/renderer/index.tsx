import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss';
import './css/index.css';

import { go } from './util/navigation';
import { ipcRenderer } from 'electron';
import ipcHandler from './util/ipc-handler';
import history from './util/history';

import * as EVENTS from '../common/constants/eventNames';
import * as PATHS from '../common/constants/paths';
import { readFile } from 'fs';
import { basename } from 'path';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

ipcRenderer.send(EVENTS.SET_HOTKEYS);
ipcHandler.addEventHandler(EVENTS.GO, 'go-handler', (e: any, {to}: {to: string}) => go(to));
ipcHandler.addEventHandler(EVENTS.OPEN, 'open-handler', (e, {path}: {path: string}) => {
  readFile(path, (err, data) => {
    if (!err) {
      history.push({
        pathname: `/${PATHS.WHITEBOARD}`,
        state: {
          open: {
            data: JSON.parse(data.toString()),
            location: path,
            fileName: basename(path)
          }
        }
      })
    }
  })
})
