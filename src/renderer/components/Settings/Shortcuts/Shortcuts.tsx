import React, { Component } from 'react';
import { Header } from '../../Header/Header';

import { shortcutName, shortcutsManager } from '../../../../common/code/shortcuts';

import './Shortcuts.scss';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../../Icon/Icon';

export class Shortcuts extends Component {
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
                        <button className="btn btn-small brand-text right">Edit</button>
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
        </div>
      </div>
    )
  }
}
