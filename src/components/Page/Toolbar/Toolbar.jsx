import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';
import PaintSettings from '../../PaintSettings/PaintSettings';

import './Toolbar.css';

export class Toolbar extends Component {
  constructor(...props) {
    super(...props);

    this.modalRef = createRef();
    this.colorPickerRef = createRef();
    this.goHomeRef = createRef();
  }

  _initializeFAB() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, { hoverEnabled: false });
  }

  _initializeModal() {
    this.clearBoardModalInstance = M.Modal.init(this.modalRef.current);
    this.colorPickerInstance = M.Modal.init(this.colorPickerRef.current);
    this.goHomeInstance = M.Modal.init(this.goHomeRef.current);
  }

  componentDidMount() {
    this._initializeFAB();
    this._initializeModal();
  }

  componentDidUpdate() {
    this._initializeFAB();
    this._initializeModal();
  }

  render() {
    const { boardState, boardOptions, _setTool, _clearBoard, _save } = this.props;

    return (
      <div className="toolbar">
        <div className="bottom-toolbar z-depth-1">
          <button className="btn-flat" title="Paint Brush" onClick={() => _setTool('brush')}>
            <i className="fa fa-paint-brush brand-gradient gradient-text"></i>
          </button>
          <button className="btn-flat" title="Eraser" onClick={() => _setTool('eraser')}>
            <i className="fa fa-eraser brand-gradient gradient-text"></i>
          </button>
          <button className="btn-flat" title="Line Tool" onClick={() => _setTool('line')}>
            <i className="material-icons brand-gradient gradient-text">timeline</i>
          </button>
          <button className="btn-flat" title="Color Palette" onClick={() => this.colorPickerInstance.open()}>
            <i className="material-icons brand-gradient gradient-text">palette</i>
          </button>
          <button className="btn-flat" title="Save this slide" onClick={() => _save()}>
            <i className="material-icons brand-gradient gradient-text">save</i>
          </button>
          <button className="btn-flat" title="Clear the board" onClick={() => this.clearBoardclearBoardModalInstance.open()}>
            <i className="fa fa-ban brand-gradient gradient-text"></i>
          </button>
          <button className="btn-flat" title="Go to home" onClick={() => this.goHomeInstance.open()}>
            <i className="material-icons brand-gradient gradient-text">home</i>
          </button>
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
            <button className="btn green-text right" onClick={e => this.clearBoardModalInstance.close()}>No</button>
            <button className="btn red-text left" onClick={e => {
              _clearBoard();
              this.clearBoardModalInstance.close();
            }}>Yes</button>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.colorPickerRef}>
          <div className="modal-content">
            <PaintSettings
              initialColor="#000"
              initialBrushSize={boardOptions.brushSize}
              initialEraserSize={boardOptions.eraserSize}
              onBrushSizeChange={size => boardState.drawBoard.changeBrushSize(size)}
              onEraserSizeChange={size => boardState.drawBoard.changeEraserSize(size)}
              onPickColor={color => {
                boardState.drawBoard.changeBrushColor([color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255])
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
