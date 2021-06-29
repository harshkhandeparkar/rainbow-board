import React from 'react';

import { Icon } from '../../Icon/Icon';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export interface IKeyboardShortcutProps {
  /** Label text for the checkbox */
  shortcut: string,
  desc: string
}

export function KeyboardShortcut(props: IKeyboardShortcutProps) {
  const { shortcut, desc } = props;

  return (
    <div className="row">
      <div className="col s6 valign-wrapper">
        <label>
          {desc}
        </label>
      </div>
      <div className="col s4 valign-wrapper">
        <label>
          {shortcut}
        </label>
      </div>
      <div className="col s2">
        <button className="btn btn-floating">
          <Icon
            options={{
              icon: faEdit
            }}
          />
        </button>
      </div>
    </div>
  )
}
