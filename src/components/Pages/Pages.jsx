import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';
import './Pages.css';
import { GPU } from 'gpu.js';
import { RealDrawBoard } from 'gpujs-real-renderer';

// import Page from '../Page/Page';
import PaintSettings from '../PaintSettings/PaintSettings';

import '../Page/Page.css';

export class Pages extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      pagesList: [],
      currentPage: 0,
      mode: 'paint'
    }

    this.canvasRef = createRef();
    this.modalRef = createRef();
    this.colorPickerRef = createRef();
    this.goHomeRef = createRef();
  }

  static boardOptions = {
    bgColor: [1, 1, 1],
    brushColor: [0, 0, 0],
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
        ...Pages.boardOptions
      }).draw().startRender()
    })
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

  render() {
    return (
      <div className="container-fluid center" id="pages">
        {/* {
          this.state.pagesList.length === 0 ?
          <button
            title="Add a new page"
            className="btn-floating btn-large white page-btn"
            onClick={this.addPage}
          >
            <i className="fa fa-plus gradient-text brand-gradient" />
          </button> :
          <div>
            <button
              className="btn-floating right page-btn white"
              onClick={this.state.currentPage === this.state.pagesList.length - 1 ? this.addPage : this.nextPage}
            >
              <i className={`fa gradient-text brand-gradient fa-${this.state.currentPage === this.state.pagesList.length - 1 ? 'plus' : 'chevron-right'}`} />
            </button>

            {
              this.state.currentPage !== 0 &&
              <button
                className="btn-floating left page-btn white"
                onClick={this.lastPage}
              >
                <i className="fa fa-chevron-left gradient-text brand-gradient" />
              </button>
            }

            {this.state.pagesList[this.state.currentPage]}
          </div>
        } */}
        <div className="undo-redo-btns">
          <button
            className="btn-floating white"
            title="Undo"
            style={{marginRight: '1rem'}}
            onClick={e => this.state.drawBoard.undo()}
          >
            <i className="material-icons brand-gradient gradient-text">undo</i>
          </button>
          <button
            className="btn-floating white"
            title="Redo"
            onClick={e => this.state.drawBoard.redo()}
          >
            <i className="material-icons brand-gradient gradient-text">redo</i>
          </button>
        </div>

        <canvas className="page" ref={this.canvasRef}></canvas>

        <div className="fixed-action-btn">
          <button className="btn-floating btn-large">
            <i className={`brand-gradient gradient- fa fa-${this.state.mode === 'paint' ? 'paint-brush' : 'eraser'}`} />
          </button>
          <ul>
            <li>
              <button title="Go to home" className="btn-floating white">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.goHomeInstance.open()}>home</i>
              </button>
            </li>
            <li>
              <button title="Pick Color and Size" className="btn-floating white">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.colorPickerInstance.open()}>palette</i>
              </button>
            </li>
            <li>
              <button
                title={this.state.mode === 'eraser' ? 'Eraser' : 'Brush'}
                className="btn-floating white"
                onClick={e => this._setMode(this.state.mode === 'erase' ? 'paint' : 'erase')}
              >
                <i className={`fa fa-${this.state.mode === 'paint' ? 'eraser' : 'paint-brush'} brand-gradient gradient-text`} />
              </button>
            </li>
            <li>
              <button title="Clear the board" className="btn-floating white" onClick={e => this.modalInstance.open()}>
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
            <button className="btn white green-text right" onClick={e => this.goHomeInstance.close()}>No</button>
            <NavLink to="/" className="btn white red-text left">Yes</NavLink>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.modalRef}>
          <div className="modal-content container center">
            <h4>Do you want to clear the board?</h4>
            <p>If you clear the board, <b>ALL</b> the changes you made will be <b>LOST FOREVER.</b></p>
          </div>
          <div className="modal-footer container">
            <button className="btn white green-text right" onClick={e => this.modalInstance.close()}>No</button>
            <button className="btn white red-text left" onClick={e => {
              this._clearBoard();
              this.modalInstance.close();
            }}>Yes</button>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.colorPickerRef}>
          <div className="modal-content">
            <PaintSettings
              initialColor="#000"
              initialBrushSize={Pages.boardOptions.brushSize}
              initialEraserSize={Pages.boardOptions.eraserSize}
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

  // addPage = (e) => {
  //   e.preventDefault();

  //   this.state.pagesList.push(<Page key={this.state.pagesList.length}></Page>);
  //   this.setState({
  //     pagesList: this.state.pagesList,
  //     currentPage: this.state.pagesList.length - 1
  //   })
  // }

  // nextPage = (e) => {
  //   e.preventDefault();

  //   this.setState({
  //     currentPage: this.state.currentPage + 1
  //   })
  // }

  // lastPage = (e) => {
  //   e.preventDefault();

  //   this.setState({
  //     currentPage: this.state.currentPage - 1
  //   })
  // }
}

export default Pages;
