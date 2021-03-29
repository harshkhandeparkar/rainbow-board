import React from 'react';

export default function Grid({ children, options, className }) {
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
