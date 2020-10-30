import React, { Component } from 'react'
import { CompactPicker } from 'react-color'

export default class PaintSettings extends Component {
  state = {
    selected: this.props.initialColor
  }

  handleChangeComplete = (color) => {
    this.props.onPickColor(color);
    this.setState({ selected: color });
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col s5 offset-s1 center">
            <h5>Brush color</h5>
            <CompactPicker
              color={this.state.selected}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>

          <div className="col s5 center">
            <h5>Brush and Eraser sizes</h5>
            <p className="range-field">
              <input type="range" id="brush-size" min="0" max="100" />
            </p>
          </div>
        </div>
      </div>
    )
  }
}
