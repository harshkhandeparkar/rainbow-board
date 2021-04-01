import React, { Component } from 'react';
import { CompactPicker, ColorResult, Color } from 'react-color';

import './PaintSettings.css';

export interface IPaintSettingsProps {
  initialColor: Color,
  onPickColor: (color: ColorResult) => void
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
            <h5>Brush and Line Color</h5>
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
