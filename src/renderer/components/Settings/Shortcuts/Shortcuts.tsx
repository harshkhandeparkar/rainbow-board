import React, { Component } from 'react';

import { Header } from '../../Header/Header';

import { SHORTCUT_LIST } from '../../../../common/constants/shortcuts';

import './Shortcuts.scss';

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
              </tr>
            </thead>

            <tbody>
              {
                SHORTCUT_LIST.map((sht, i) => {
                  return (
                    <tr key={i}>
                      <td>{sht.desc}</td>
                      <td>{sht.platformFormattedString}</td>
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
