import React, { CSSProperties } from 'react';

export interface IGridProps {
  options?: {
    numColumns?: number,
    gap?: string
  },
  className?: string,
  children?: Element | HTMLCollection | React.ReactNode,
  style?: CSSProperties
}

export default function Grid(
  { children, options = {}, className = '', style = {} }: IGridProps
) {
  let numColumns = options.numColumns || 3;
  let gridTemplateColumns = '';

  for (let i = 0; i < numColumns; i++) gridTemplateColumns += `1fr `;

  return (
    <div
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns,
        gap: options.gap || '50px 50px',
      }}
      className={`grid-container ${className}`}
    >
      {children}
    </div>
  )
}
