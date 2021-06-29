import React, { Component } from 'react';

import { Header } from '../../Header/Header';

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

              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
