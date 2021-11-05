import React, { Component, createRef, RefObject } from 'react';
import { Header } from '../../Header/Header';

import { shortcutName, shortcutsManager } from '../../../../common/code/shortcuts';

import './Shortcuts.scss';
import { Modal } from 'materialize-css';
import { ipcRenderer } from 'electron';
import { RESTART } from '../../../../common/constants/events';

import { _keyToAcceleratorKeyCode, _getAcceleratorString } from './util';
import { getPlatformFormattedShortcutString } from '../../../../common/constants/shortcuts';
import { ipcRendererSend } from '../../../util/ipc-sender';

export interface IShortcutRecording {
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  keys: string[];
}

interface IShortcutsState {
  shortcut: IShortcutRecording;
  editing?: shortcutName;
}

export class Shortcuts extends Component<{}, IShortcutsState> {
  recordModalRef: RefObject<HTMLDivElement> = createRef();
  recordModalInstance: Modal;

  restartModalRef: RefObject<HTMLDivElement> = createRef();
  restartModalInstance: Modal;

  static emptyRecording: IShortcutRecording = {
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    keys: [] as string[]
  }

  state: IShortcutsState = {
    shortcut: Shortcuts.emptyRecording
  }

  _initializeModal() {
    if (!this.recordModalInstance) {
      this.recordModalInstance = M.Modal.init(
        this.recordModalRef.current,
        { inDuration: 0, outDuration: 0, dismissible: false }
      )
    }

    if (!this.restartModalInstance) {
      this.restartModalInstance = M.Modal.init(
        this.restartModalRef.current,
        { inDuration: 0, outDuration: 0, dismissible: false }
      )
    }
  }

  _getShortcutString() {
    return getPlatformFormattedShortcutString(_getAcceleratorString(this.state.shortcut))
  }

  _updateRecordingOnEvent = (e: KeyboardEvent, updateKeys: (keys: string[], keyCode: string) => string[]) => {
    e.preventDefault();

    if(!e.repeat) {
      let keys = [...this.state.shortcut.keys];

      if (e.key && _keyToAcceleratorKeyCode(e.key, e.code) !== null) {
        keys = updateKeys(keys, _keyToAcceleratorKeyCode(e.key, e.code));
      }

      this.setState({
        shortcut: {
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          keys: keys
        }
      })
    }
  }

  _keyDownListener = (e: KeyboardEvent) => {
    this._updateRecordingOnEvent(
      e, (keys, keyCode) => {
        if (!keys.includes(keyCode)) return [...keys, keyCode];
        else return keys;
      }
    )
  }

  _keyUpListener = (e: KeyboardEvent) => {
    this._updateRecordingOnEvent(
      e, (keys, keyCode) => {
        if (keys.includes(keyCode)) keys.splice(keys.indexOf(keyCode), 1);

        return keys;
      }
    )
  }

  _addListeners() {
    document.addEventListener('keydown', this._keyDownListener);
    document.addEventListener('keyup', this._keyUpListener);
  }

  _removeListeners() {
    document.removeEventListener('keydown', this._keyDownListener);
    document.removeEventListener('keyup', this._keyUpListener);
  }

  _confirmChange() {
    if(this.state.editing) {
      shortcutsManager.updateShortcut(this.state.editing, _getAcceleratorString(this.state.shortcut));
      this.setState({
        shortcut: Shortcuts.emptyRecording
      })

      this.restartModalInstance.open();
    }
  }

  componentDidMount() {
    this._initializeModal();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  componentDidUpdate() {
    this._initializeModal();
  }

  render() {
    return (
      <div>
        <Header
          title="Keyboard Shortcuts"
          leftMenu={['settings']}
        />

        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Shortcut</th>
                <th>Default</th>
              </tr>
            </thead>

            <tbody>
              {
                Object.keys(shortcutsManager.shortcuts).map((shortcut_name: shortcutName, i) => {
                  const shortcut = shortcutsManager.shortcuts[shortcut_name];

                  return (
                    <tr key={i}>
                      <td>{shortcut.desc}</td>
                      <td>
                        {shortcut.platformFormattedString}
                        <button
                          className="btn btn-small brand-text right"
                          onClick={() => {
                            this.setState({
                              editing: shortcut_name
                            })
                            this.recordModalInstance.open();
                            this._addListeners();
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className={`btn btn-small brand-text ${shortcut.accelerator === shortcut.default ? 'disabled' : ''}`}
                          title="Restore Default"
                          style={{width: '100%'}}
                          onClick={() => {
                            shortcutsManager.restoreDefault(shortcut_name);
                            this.setState({
                              editing: shortcut_name
                            })

                            this.restartModalInstance.open();
                          }}
                        >
                          {shortcut.defaultPlatformString}
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className="modal" ref={this.recordModalRef}>
            <div className="modal-content">
              <div className="center">
                <span className="keycombo-box brand-text">
                  {this._getShortcutString() !== '' ? this._getShortcutString() : 'Recording key combination...'}
                </span>
                <div>Press "Confirm" while holding the desired key combination.</div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn brand-text left"
                onClick={() => {
                  this.recordModalInstance.close();
                  this._confirmChange();
                }}
              >
                Confirm
              </button>
              <button
                className="btn right"
                onClick={() => {
                  this.recordModalInstance.close();
                  this._removeListeners();
                  this.setState({
                    shortcut: Shortcuts.emptyRecording
                  })
                }}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="modal" ref={this.restartModalRef}>
            <div className="modal-content">
              {this.state.editing && (
                <table>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>New Shortcut</th>
                      <th>Default</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{shortcutsManager.shortcuts[this.state.editing].desc}</td>
                      <td>{shortcutsManager.shortcuts[this.state.editing].platformFormattedString}</td>
                      <td>{shortcutsManager.shortcuts[this.state.editing].defaultPlatformString}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              <div className="center brand-text">
                Changes will be effective after restart.
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn brand-text left"
                onClick={() => ipcRendererSend(RESTART, null)}
              >
                Restart Now
              </button>
              <button
                className="btn right"
                onClick={() => {
                  this.restartModalInstance.close();
                  this._removeListeners();
                  this.setState({
                    editing: null
                  })
                }}
              >
                Restart Later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
