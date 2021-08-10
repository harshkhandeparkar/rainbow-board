import React, { createRef, RefObject } from 'react';

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
    className?: string,
    value: any,
    label: string,
    onChange: (val: any) => void,
    visible: boolean
  }
) => {
  const onChange = () => {
    props.onChange(props.values.find((val) => val[0] !== props.value)[0]);
  }

  return (
    <div className={`top-toolbar valign-wrapper ${props.visible ? '' : 'hide'} ${props.className ?? ''}`} title={`${props.label} (SCROLL)`}>
      <label>{props.label}</label>
      <button className="btn brand-text" onClick={onChange}>{props.values.find((val) => val[0] === props.value)[1]}</button>
    </div>
  )
}
