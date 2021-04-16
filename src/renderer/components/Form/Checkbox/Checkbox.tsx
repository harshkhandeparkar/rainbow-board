import React from 'react';
import './Checkbox.css';

export interface ICheckboxProps {
  label: string | JSX.Element,
  onInput: (value: boolean) => void,
  defaultValue: boolean
}

export function Checkbox(props: ICheckboxProps) {
  const { label, onInput, defaultValue } = props;

  return (
    <div className="row">
      <div className="col s4 valign-wrapper checkbox-label-col">
        <label>{label}</label>
      </div>
      <div className="col s6">
        <div className="checkbox">
          <input
            type="checkbox"
            defaultChecked={defaultValue}
            onInput={(e) => onInput((e.target as any).checked)}
          />
          <span className="checkmark" />
        </div>
      </div>
    </div>
  )
}
