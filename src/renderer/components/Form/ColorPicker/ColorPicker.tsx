import React, { useState } from 'react';

import { Icon } from '../../Icon/Icon';
import { faInfoCircle, faCheckCircle, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import { HuePicker } from 'react-color';
import './ColorPicker.scss';

export interface IColorPickerProps {
  /** Label for the select element */
  label: string,
  /** Info tooltip text */
  info?: string,
  onPick: (color: string) => void,
  currentValue: string,
  defaultValue: string
}

export function ColorPicker(props: IColorPickerProps) {
  const { label, onPick, currentValue, defaultValue, info } = props;

  const currentColor = currentValue;
  const [pickedColor, setPickedColor] = useState<string>(currentValue);

  return (
    <div className="row">
      <div className="col s4 valign-wrapper color-picker-col">
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

      <div className="col s4 valign-wrapper color-picker-col">
        <HuePicker
          color={pickedColor}
          onChange={(colorResult) => {
            const newColor = `rgb(${colorResult.rgb.r}, ${colorResult.rgb.g}, ${colorResult.rgb.b})`;
            setPickedColor(newColor);
          }}
        />
      </div>

      <div className="col s2 valign-wrapper color-picker-col">
        <button
          className={`btn ${currentColor === pickedColor ? 'disabled' : ''}`}
          onClick={() => onPick(pickedColor)}
          style={{
            color: pickedColor
          }}
        >
          Save
        </button>

        <button
          className={`btn btn-floating ${currentColor === defaultValue ? 'disabled' : ''}`}
          onClick={() => onPick(defaultValue)}
        >
          <Icon
            customColor={true}
            options={{
              title: 'Restore default.',
              color: defaultValue,
              icon: faUndoAlt
            }}
          />
        </button>
      </div>

      <div className="col s2 valign-wrapper color-picker-col">

      </div>
    </div>
  )
}
