import React, { Component } from 'react';
import { CompactPicker, ColorResult, Color } from 'react-color';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';

import './PaintSettings.scss';

export interface IPaintSettingsProps {
  color: Color,
  onPickColor: (color: ColorResult) => void,
  tool: Tool
}

export default class PaintSettings extends Component<IPaintSettingsProps> {
  handleChangeComplete = (color: ColorResult) => {
    this.props.onPickColor(color);
  }

  componentDidMount() {
    const colorPaletteWrapper = document.querySelector('.color-palette').parentNode.parentNode as HTMLDivElement;

    // CSS is mad science
    (colorPaletteWrapper.querySelector('div') as HTMLDivElement).remove();
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center">
            <h5>{this.props.tool === 'line' ? 'Line' : 'Brush'} Color</h5>
            <CompactPicker
              className="color-palette"
              color={this.props.color}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </div>
      </div>
    )
  }
}
