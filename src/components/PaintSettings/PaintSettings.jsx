import React from 'react'
import { CompactPicker } from 'react-color'

export default function PaintSettings() {
  return (
    <div className="container">
      <div className="row">
        <div className="col s4 center">
          <h5>Brush color</h5>
          <CompactPicker />
        </div>
      </div>
    </div>
  )
}
