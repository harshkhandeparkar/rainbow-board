import React from 'react';
import './Select.css';

export interface ISelectProps {
  label: string,
  onInput: (value: string) => void,
  defaultValue: string,
  options: {
    value: string,
    label: string
  }[]
}

export function Select(props: ISelectProps) {
  const { label, onInput, defaultValue, options } = props;

  return (
    <div className="row">
      <div className="col s2 valign-wrapper select-label-col">
        <label>{label}</label>
      </div>
      <div className="col s10">
        <select
          name="theme-select"
          className="brand-text"
          onInput={(e) => onInput((e.target as HTMLSelectElement).value)}
          defaultValue={defaultValue}
        >
          {
            options.map(({value, label}, index) => {
              return (
                <option
                  className="brand-text center"
                  value={value}
                  key={index}
                >
                  {label}
                </option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}
