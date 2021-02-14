import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';
import PaintSettings from '../../PaintSettings/PaintSettings';

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
    this.modalInstance = M.Modal.init(this.modalRef.current);
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
        <div className="fixed-action-btn">
          <button className="btn-floating btn-large">
            <i className={`brand-gradient gradient- fa fa-${boardState.tool === 'brush' ? 'paint-brush' : 'eraser'}`} />
          </button>
          <ul>
            <li>
              <button title="Go to home" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.goHomeInstance.open()}>home</i>
              </button>
            </li>
            <li>
              <button title="Save this page" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => _save()}>save</i>
              </button>
            </li>
            <li>
              <button title="Pick Color and Size" className="btn-floating">
                <i className="material-icons brand-gradient gradient-text" onClick={e => this.colorPickerInstance.open()}>palette</i>
              </button>
            </li>
            <li>
              <button
                title={boardState.tool === 'brush' ? 'Eraser' : 'Brush'}
                className="btn-floating"
                onClick={e => _setTool(boardState.tool === 'eraser' ? 'brush' : 'eraser')}
              >
                <i className={`fa fa-${boardState.tool === 'brush' ? 'eraser' : 'paint-brush'} brand-gradient gradient-text`} />
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
              _clearBoard();
              this.modalInstance.close();
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
