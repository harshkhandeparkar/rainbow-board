import React from 'react';

export interface IGridItemProps {
  options?: {
    width?: number,
  },
  children?: Element | HTMLCollection | React.ReactNode
}

export default function GridItem({ children, options = {} }: IGridItemProps) {
  const width = options.width || 1;

  return (
    <div className="grid-item" style={{ gridColumnEnd: `span ${width}` }}>
      {children}
    </div>
  )
}
