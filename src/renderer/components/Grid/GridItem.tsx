import React from 'react';

export interface IGridItemProps {
  options?: {
    width?: number
  },
  children?: Element | HTMLCollection | React.ReactNode,
  className?: string
}

export default function GridItem({ children, options = {}, className }: IGridItemProps) {
  const width = options.width || 1;

  return (
    <div className={`grid-item ${className ? className : ''}`} style={{ gridColumnEnd: `span ${width}` }}>
      {children}
    </div>
  )
}
