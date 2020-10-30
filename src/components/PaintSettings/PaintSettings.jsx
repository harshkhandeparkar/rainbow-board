import React, { Component, createRef } from 'react';
import { CompactPicker } from 'react-color';
import M from 'materialize-css';

import './PaintSettings.css';

export default class PaintSettings extends Component {
  constructor(...props) {
    super(...props);

    this.brushSizeRangeRef = createRef();
    this.eraserSizeRangeRef = createRef();
  }

  state = {
    selected: this.props.initialColor,
    brushSize: this.props.initialBrushSize,
    eraserSize: this.props.initialEraserSize
  }

  handleChangeComplete = (color) => {
    this.props.onPickColor(color);
    this.setState({ selected: color });
  }

  onBrushSizeChange = () => {
    this.props.onBrushSizeChange(Number(this.brushSizeRangeRef.current.value));
    this.setState({
      brushSize: Number(this.brushSizeRangeRef.current.value)
    })
  }

  onEraserSizeChange = () => {
    this.props.onEraserSizeChange(Number(this.eraserSizeRangeRef.current.value));
    this.setState({
      eraserSize: Number(this.eraserSizeRangeRef.current.value)
    })
  }

  componentDidMount() {
    M.Range.init(this.brushSizeRangeRef.current);
    M.Range.init(this.eraserSizeRangeRef.current);
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

            <div className="row">
              <p className="range-field">
                <label htmlFor="brush-size">Brush Size:</label>
                <input type="range" id="brush-size" min="0" max="100" value={this.state.brushSize} ref={this.brushSizeRangeRef} onChange={this.onBrushSizeChange} />
              </p>
            </div>

            <div className="row">
              <p className="range-field">
                <label htmlFor="eraser-size">Eraser Size:</label>
                <input type="range" id="eraser-size" min="0" max="100" value={this.state.eraserSize} ref={this.eraserSizeRangeRef} onChange={this.onEraserSizeChange} />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
