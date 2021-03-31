import React from 'react';

export interface IGridProps {
  options?: {
    numColumns?: number,
    gap?: string
  },
  className?: string,
  children?: Element | HTMLCollection | React.ReactNode
}

export default function Grid(
  { children, options = {}, className = '' }: IGridProps
) {
  let numColumns = options.numColumns || 3;
  let gridTemplateColumns = '';

  for (let i = 0; i < numColumns; i++) gridTemplateColumns += `1fr `;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: options.gap || '50px 50px'
      }}
      className={`grid-container ${className}`}
    >
      {children}
    </div>
  )
}
