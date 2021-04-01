import React, { Component } from 'react';
import { CompactPicker, ColorResult, Color } from 'react-color';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';

import './PaintSettings.css';

export interface IPaintSettingsProps {
  initialColor: Color,
  onPickColor: (color: ColorResult) => void,
  tool: Tool
}

export default class PaintSettings extends Component<IPaintSettingsProps> {
  state = {
    selected: this.props.initialColor,
  }

  handleChangeComplete = (color: ColorResult) => {
    this.props.onPickColor(color);
    this.setState({ selected: color });
  }

  componentDidMount() {
    const colorPickerWrapper = document.querySelector('.color-picker').parentNode.parentNode as HTMLDivElement;

    // CSS is mad science
    (colorPickerWrapper.querySelector('div') as HTMLDivElement).remove();
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center">
            <h5>{this.props.tool === 'line' ? 'Line' : 'Brush'} Color</h5>
            <CompactPicker
              className="color-picker"
              color={this.state.selected}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </div>
      </div>
    )
  }
}
