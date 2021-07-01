import React, { Component, createRef, RefObject } from 'react';
import { Header } from '../../Header/Header';

import { shortcutName, shortcutsManager } from '../../../../common/code/shortcuts';

import './Shortcuts.scss';
import { Modal } from 'materialize-css';
import { getPlatformFormattedShortcutString } from '../../../../common/constants/shortcuts';

interface IShortcutsState {
  shortcut: {
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    keys: string[];
  }
}

export class Shortcuts extends Component<{}, IShortcutsState> {
  modalRef: RefObject<HTMLDivElement> = createRef();
  modalInstance: Modal;

  state = {
    shortcut: {
      ctrlKey: false,
      metaKey: false,
      altKey: false,
      shiftKey: false,
      keys: [] as string[]
    }
  }

  _initializeModal() {
    if (!this.modalInstance) {
      this.modalInstance = M.Modal.init(
        this.modalRef.current,
        { inDuration: 0, outDuration: 0, dismissible: false }
      )
    }
  }

  _keyToAcceleratorKeyCode(key: string) {
    switch (key.toLowerCase()) {
      case '':
      case 'alt':
      case 'shift':
      case 'control':
      case 'command':
      case 'meta':
      case 'cmd':
        return null;
      case 'arrowright':
        return 'right';
      case 'arrowleft':
        return 'left';
      case '+':
        return 'plus';
      case ' ':
        return 'space';
      default:
        return key.toLowerCase();
    }
  }

  _getShortcutString() {
    const keys = [];

    if (this.state.shortcut.ctrlKey) keys.push('CTRL');
    if (this.state.shortcut.metaKey) keys.push('CMD');
    if (this.state.shortcut.altKey) keys.push('ALT');
    if (this.state.shortcut.shiftKey) keys.push('SHIFT');

    keys.push(...this.state.shortcut.keys);

    return getPlatformFormattedShortcutString(keys.join(' + '));
  }

  _keyDownListener = (e: KeyboardEvent) => {
    e.preventDefault();

    if(!e.repeat) {
      let keys = [...this.state.shortcut.keys];

      if (e.key) {
        const keyCode = this._keyToAcceleratorKeyCode(e.key);

        if (keyCode !== null && !keys.includes(keyCode)) keys.push(keyCode);
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

  _keyUpListener = (e: KeyboardEvent) => {
    e.preventDefault();

    if(!e.repeat) {
      let keys = [...this.state.shortcut.keys];

      if (e.key && this._keyToAcceleratorKeyCode(e.key) !== null) {
        const keyCode = this._keyToAcceleratorKeyCode(e.key);

        if (keyCode !== null && keys.includes(keyCode)) keys.splice(keys.indexOf(keyCode), 1);
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

  _addListeners() {
    document.addEventListener('keydown', this._keyDownListener);
    document.addEventListener('keyup', this._keyUpListener);
  }

  _removeListeners() {
    document.removeEventListener('keydown', this._keyDownListener);
    document.removeEventListener('keyup', this._keyUpListener);
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
                            this.modalInstance.open();
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

          <div className="modal" ref={this.modalRef}>
            <div className="modal-content">
              <div className="center">
                <span className="keycombo-box brand-text">{this._getShortcutString() !== '' ? this._getShortcutString() : 'Recording key combination...'}</span>
                <div>Press "Confirm" while holding the desired key combination.</div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn brand-text left">Confirm</button>
              <button
                className="btn right"
                onClick={() => {
                  this.modalInstance.close();
                  this._removeListeners();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
