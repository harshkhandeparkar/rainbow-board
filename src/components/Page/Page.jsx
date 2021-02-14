import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';
import './Page.css';
import { GPU } from 'gpu.js';
import { RealDrawBoard } from 'gpujs-real-renderer';
import { PNG } from 'pngjs/browser';

import PaintSettings from '../PaintSettings/PaintSettings';

import '../Page/Page.css';

export class Page extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      mode: 'paint'
    }

    this.canvasRef = createRef();
    this.modalRef = createRef();
    this.colorPickerRef = createRef();
    this.goHomeRef = createRef();
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
    this._initializeFAB();
    this._initializeModal();

    this.setState({
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

  componentDidUpdate() {
    this._initializeFAB();
    this._initializeModal();
  }

  _setMode(mode) {
    this.state.drawBoard.changeMode(mode);
    this.setState({
      mode
    })
  }

  _clearBoard() {
    this.state.drawBoard.clear();
  }

  _initializeFAB() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, { hoverEnabled: false });
  }

  _initializeModal() {
    this.modalInstance = M.Modal.init(this.modalRef.current);
    this.colorPickerInstance = M.Modal.init(this.colorPickerRef.current);
    this.goHomeInstance = M.Modal.init(this.goHomeRef.current);
  }

  _save() {
    const png = new PNG({
      width: this.canvasRef.current.clientWidth,
      height: this.canvasRef.current.clientHeight
    })

    const pixels = this.state.drawBoard.graphPixels.toArray();

    for (let y = 0; y < pixels.length; y++) {
      for (let x = 0; x < pixels[0].length; x++) {
        const idx = (pixels[0].length * (pixels.length - y) + x) << 2;

        // invert color
        png.data[idx] = pixels[y][x][0] * 255;
        png.data[idx + 1] = pixels[y][x][1] * 255;
        png.data[idx + 2] = pixels[y][x][2] * 255;
        png.data[idx + 3] = 255;
      }
    }

    const buffer = PNG.sync.write(png);
    const dataURL = 'data:image/png;base64,' + buffer.toString('base64');

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'slide.png';

    document.body.append(a);
    a.click();
    a.remove();
  }

  render() {
    return (
      <div>
        {/* <div className="undo-redo-btns">
          <button
            className="btn-floating"
            title="Undo"
            style={{marginRight: '1rem'}}
            onClick={e => this.state.drawBoard.undo()}
          >
            <i className="material-icons brand-gradient gradient-text">undo</i>
          </button>
          <button
            className="btn-floating"
            title="Redo"
            onClick={e => this.state.drawBoard.redo()}
          >
            <i className="material-icons brand-gradient gradient-text">redo</i>
          </button>
        </div> */}

        <canvas className="page" ref={this.canvasRef}></canvas>

        <div className="fixed-action-btn">
          <button className="btn-floating btn-large">
            <i className={`brand-gradient gradient- fa fa-${this.state.mode === 'paint' ? 'paint-brush' : 'eraser'}`} />
          </button>
          <ul>
            <li>
              <button title="Go to home" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.goHomeInstance.open()}>home</i>
              </button>
            </li>
            <li>
              <button title="Save this page" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this._save()}>save</i>
              </button>
            </li>
            <li>
              <button title="Pick Color and Size" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.colorPickerInstance.open()}>palette</i>
              </button>
            </li>
            <li>
              <button
                title={this.state.mode === 'eraser' ? 'Eraser' : 'Brush'}
                className="btn-floating"
                onClick={e => this._setMode(this.state.mode === 'erase' ? 'paint' : 'erase')}
              >
                <i className={`fa fa-${this.state.mode === 'paint' ? 'eraser' : 'paint-brush'} brand-gradient gradient-text`} />
              </button>
            </li>
            <li>
              <button title="Clear the board" className="btn-floating" onClick={e => this.modalInstance.open()}>
                <i className="fa fa-ban brand-gradient gradient-text" />
              </button>
            </li>
          </ul>
        </div>

        <div className="modal bottom-sheet" ref={this.goHomeRef}>
          <div className="modal-content container center">
            <h4>Are you sure you want to go to the home page?</h4>
            <p>If you do this, <b>ALL</b> the changes you made will be <b>LOST FOREVER.</b></p>
          </div>
          <div className="modal-footer container">
            <button className="btn green-text right" onClick={e => this.goHomeInstance.close()}>No</button>
            <NavLink to="/" className="btn red-text left">Yes</NavLink>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.modalRef}>
          <div className="modal-content container center">
            <h4>Do you want to clear the board?</h4>
            <p>If you clear the board, <b>ALL</b> the changes you made will be <b>LOST FOREVER.</b></p>
          </div>
          <div className="modal-footer container">
            <button className="btn green-text right" onClick={e => this.modalInstance.close()}>No</button>
            <button className="btn red-text left" onClick={e => {
              this._clearBoard();
              this.modalInstance.close();
            }}>Yes</button>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.colorPickerRef}>
          <div className="modal-content">
            <PaintSettings
              initialColor="#000"
              initialBrushSize={Page.boardOptions.brushSize}
              initialEraserSize={Page.boardOptions.eraserSize}
              onBrushSizeChange={size => this.state.drawBoard.changeBrushSize(size)}
              onEraserSizeChange={size => this.state.drawBoard.changeEraserSize(size)}
              onPickColor={color => {
                this.state.drawBoard.changeBrushColor([color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255])
              }}
            />
          </div>
          <div className="modal-footer container">
            <button className="btn green brand-gradient gradient-text" onClick={e => this.colorPickerInstance.close()}>Done</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Page;
