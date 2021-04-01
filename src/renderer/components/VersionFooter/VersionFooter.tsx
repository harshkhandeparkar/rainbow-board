import React from 'react';
import packageFile from '../../../../package.json';

const { version } = packageFile;

export function VersionFooter() {
  return (
    <footer className="container-fluid center z-depth-2">
      <p className="center brand-text" style={{width: '100%'}}>
        v{version}
      </p>
    </footer>
  )
}
