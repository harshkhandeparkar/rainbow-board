import React from 'react';

import { Icon } from '../../Icon/Icon';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Textbox.scss';

export interface ITextboxProps {
  /** Label for the select element */
  label: string,
  /** Info tooltip text */
  info?: string,
  onInput: (value: string) => void,
  defaultValue: string,
  placeholder: string
}

export function Textbox(props: ITextboxProps) {
  const { label, onInput, defaultValue, placeholder, info } = props;

  return (
    <div className="row">
      <div className="col s3 valign-wrapper form-col">
        <label>
          {label}
          {info ?
            <Icon
              customColor={true}
              options={{
                title: info,
                icon: faInfoCircle,
                size: 'sm',
                style: {marginLeft: '4px'}
              }}
            /> : ':'
          }
        </label>
      </div>
      <div className="col s9">
        <input
          type="text"
          name="theme-textbox"
          spellCheck={false}
          onInput={(e) => onInput((e.target as HTMLInputElement).value)}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
