import React from 'react';

export default function GridItem({ children, options }) {
  const width = options.width || 1;

  return (
    <div className="grid-item" style={{ gridColumnEnd: `span ${width}` }}>
      {children}
    </div>
  )
}
