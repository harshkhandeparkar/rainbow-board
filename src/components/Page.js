import React, { Component, createRef } from 'react';
import { RealDrawBoard } from 'gpujs-real-renderer';
import { GPU } from 'gpu.js';

export class Page extends Component {
  constructor(...props) {
    super(...props);

    this.canvasRef = createRef();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} className="page"></canvas>
      </div>
    )
  }

  componentDidMount() {
    const drawBoard = new RealDrawBoard({
      canvas: this.canvasRef.current,
      GPU,
      bgColor: [1, 1, 240 / 255],
      brushColor: [0, 0, 0],
      xScaleFactor: 1,
      yScaleFactor: 1,
      drawAxes: false,
      xOffset: 0,
      yOffset: 0,
      dimensions: [
        this.canvasRef.current.clientWidth,
        this.canvasRef.current.clientHeight
      ],
      brushSize: 5
    })

    drawBoard.draw().startRender();
  }
}

export default Page;
