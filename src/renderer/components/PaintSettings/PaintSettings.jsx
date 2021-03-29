import React, { Component } from 'react';
import { CompactPicker } from 'react-color';

import './PaintSettings.css';

export default class PaintSettings extends Component {
  state = {
    selected: this.props.initialColor,
  }

  handleChangeComplete = (color) => {
    this.props.onPickColor(color);
    this.setState({ selected: color });
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
