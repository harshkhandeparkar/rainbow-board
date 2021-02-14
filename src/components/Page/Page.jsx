import React, { Component, createRef } from 'react';
import './Page.css';
import { GPU } from 'gpu.js';
import { RealDrawBoard } from 'gpujs-real-renderer';
import { saveSlide } from './save-slide';

import { Toolbar } from './Toolbar/Toolbar';

import '../Page/Page.css';

export class Page extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      boardState: {
        tool: 'brush'
      }
    }

    this.canvasRef = createRef();
  }

  static boardOptions = {
    xScaleFactor: 1,
    yScaleFactor: 1,
    drawAxes: false,
    xOffset: 0,
    yOffset: 0,
    brushSize: 3,
    eraserSize: 10
  }

  componentDidMount() {
    this.setState({
      boardState: {
        ...this.state.boardState,
        drawBoard: new RealDrawBoard({
          canvas: this.canvasRef.current,
          GPU,
          dimensions: [
            this.canvasRef.current.clientWidth,
            this.canvasRef.current.clientHeight
          ],
          ...Page.boardOptions,
          bgColor: this.props.getTheme() === 'white' ? [1, 1, 1] : [0, 0, 0],
          brushColor: this.props.getTheme() === 'white' ? [0, 0, 0] : [1, 1, 1]
        }).draw().startRender()
      }
    })

    if (!navigator.userAgent.toLowerCase().includes('electron')) {
      window.onbeforeunload = function() {
        return `Do you want to leave this page? You may lose saved changes.`;
      }
    }
  }

  componentWillUnmount() {
    window.onbeforeunload = () => {};
  }

  _setTool(tool) {
    this.state.boardState.drawBoard.changeTool(tool);
    this.setState({
      boardState: {
        ...this.state.boardState,
        tool
      }
    })
  }

  _clearBoard() {
    this.state.boardState.drawBoard.clear();
  }

  _save() {
    saveSlide(this.state.boardState.drawBoard.graphPixels.toArray());
  }

  render() {
    return (
      <div>
        {/* <div className="undo-redo-btns">
          <button
            className="btn-floating"
            title="Undo"
            style={{marginRight: '1rem'}}
            onClick={e => this.state.boardState.drawBoard.undo()}
          >
            <i className="material-icons brand-gradient gradient-text">undo</i>
          </button>
          <button
            className="btn-floating"
            title="Redo"
            onClick={e => this.state.boardState.drawBoard.redo()}
          >
            <i className="material-icons brand-gradient gradient-text">redo</i>
          </button>
        </div> */}

        <canvas className="page" ref={this.canvasRef}></canvas>
        <Toolbar
          boardOptions={Page.boardOptions}
          boardState={this.state.boardState}
          _setTool={(tool) => this._setTool(tool)}
          _save={() => this._save()}
          _clearBoard={() => this._clearBoard()}
        />
      </div>
    )
  }
}

export default Page;
