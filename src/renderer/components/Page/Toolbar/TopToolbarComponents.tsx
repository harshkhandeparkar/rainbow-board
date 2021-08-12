import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { createRef, RefObject } from 'react';
import { Icon } from '../../Icon/Icon';

export const TopToolbarRange = (
  props: {
    value: number,
    onChange: (val: number) => void,
    label: string,
    className?: string,
    visible: boolean
  }
) => {
  const ref: RefObject<HTMLInputElement> = createRef();
  const onChange = () => {
    props.onChange(Number(ref.current.value));
  }

  return (
    <div className={`valign-wrapper top-toolbar ${props.visible ? '' : 'hide'} ${props.className ?? ''}`} title={`${props.label} (SCROLL)`}>
      <label>{props.label}</label>
      <input type="range" min="2" max="100" value={props.value} ref={ref} onChange={onChange} />
    </div>
  )
}

export const TopToolbarToggle = (
  props: {
    values: [
      val1: [value: any, text: string],
      val2: [value: any, text: string]
    ],
    value: any,
    label: string,
    onChange: (val: any) => void
  }
) => {
  const onChange = () => {
    props.onChange(props.values.find((val) => val[0] !== props.value)[0]);
  }

  return (
    <>
      <label>{props.label}</label>
      <button className="btn brand-text" onClick={onChange}>{props.values.find((val) => val[0] === props.value)[1]}</button>
    </>
  )
}

export const TopToolbarToggleButton = (
  props: {
    icon: FontAwesomeIconProps['icon'],
    value: boolean,
    onChange: (val: boolean) => void,
    tooltip: string
  }
) => {
  const onChange = () => {
    props.onChange(!props.value);
  }

  return (
    <>
      <button className={`btn brand-text ${props.value ? 'active' : ''}`} onClick={onChange} title={props.tooltip}>
        <Icon
          options={{
            icon: props.icon
          }}
        />
      </button>
    </>
  )
}
