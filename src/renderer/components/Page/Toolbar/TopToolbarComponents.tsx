import React, { createRef, RefObject } from 'react';

export const TopToolbarRange = (
  props: {
    value: number,
    onChange: (val: number) => void,
    label: string,
    visible: boolean
  }
) => {
  const ref: RefObject<HTMLInputElement> = createRef();
  const onChange = () => {
    props.onChange(Number(ref.current.value));
  }

  return (
    <div className={`top-toolbar valign-wrapper ${props.visible ? '' : 'hide'}`} title={`${props.label} (SCROLL)`}>
      <label>{props.label}</label>
      <input type="range" min="2" max="100" value={props.value} ref={ref} onChange={onChange} />
    </div>
  )
}
