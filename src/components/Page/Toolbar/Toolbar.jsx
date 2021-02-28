import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import PaintSettings from '../../PaintSettings/PaintSettings';

import './Toolbar.css';

export class Toolbar extends Component {
  constructor(...props) {
    super(...props);

    // Modals
    this.clearBoardRef = createRef();
    this.colorPickerRef = createRef();
    this.goHomeRef = createRef();

    // Ranges
    this.brushSizeRangeRef = createRef();
    this.eraserSizeRangeRef = createRef();
    this.changeRateRangeRef = createRef();
    this.lineThicknessRangeRef = createRef();
    this.lineColorRangeRef = createRef();
  }

  state = {
    brushSize: this.props.boardOptions.brushSize,
    eraserSize: this.props.boardOptions.eraserSize,
    changeRate: this.props.boardOptions.changeRate,
    lineThickness: this.props.boardOptions.lineThickness,
    lineColor: this.props.boardOptions.lineColor
  }

  _initializeModal() {
    this.clearBoardModalInstance = M.Modal.init(this.clearBoardRef.current);
    this.colorPickerInstance = M.Modal.init(this.colorPickerRef.current);
    this.goHomeInstance = M.Modal.init(this.goHomeRef.current);
  }


  componentDidMount() {
    this._initializeModal();
  }

  componentDidUpdate() {
    this._initializeModal();
  }

  onBrushSizeChange = () => {
    this.props._changeToolSetting('brushSize', Number(this.brushSizeRangeRef.current.value));
    this.setState({
      brushSize: Number(this.brushSizeRangeRef.current.value)
    })
  }

  onColorChangeRate = () => {
    this.props._changeToolSetting('changeRate', Number(this.changeRateRangeRef.current.value));
    this.setState({
      changeRate: Number(this.changeRateRangeRef.current.value)
    });
  }

  onLineColorChange = () => {
    this.props._changeToolSetting('lineColor', Number(this.lineColorRangeRef.current.value));
    this.setState({
      lineColor: Number(this.eraserSizeRangeRef.current.value)
    })
  }

  onEraserSizeChange = () => {
    this.props._changeToolSetting('eraserSize', Number(this.eraserSizeRangeRef.current.value));
    this.setState({
      eraserSize: Number(this.eraserSizeRangeRef.current.value)
    })
  }

  onLineThicknessChange = () => {
    this.props._changeToolSetting('lineThickness', Number(this.lineThicknessRangeRef.current.value));
    this.setState({
      lineThickness: Number(this.lineThicknessRangeRef.current.value)
    })
  }

  render() {
    const { initialBrushColor, boardState, _setTool, _clearBoard, _save, _onUndo, _onRedo } = this.props;
    const [r, g, b] = initialBrushColor;

    return (
      <div className="toolbar">
        <div ref={this.brushTopToolbarRef} className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'brush' || 'rainbow_brush' ? '' : 'hide'}`}>
          <label>Brush Size</label>
          <input type="range" min="2" max="100" value={this.state.brushSize} ref={this.brushSizeRangeRef} onChange={this.onBrushSizeChange} />
        </div>

        <div ref={this.brushTopToolbarRef} className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'rainbow_brush' ? '' : 'hide'}`}>
          <label>Color Change Rate</label>
          <input type="range" min="1" max="50" value={this.state.changeRate} ref={this.changeRateRangeRef} onChange={this.onColorRateChange} />
        </div>

        <div ref={this.brushTopToolbarRef} className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'eraser' ? '' : 'hide'}`}>
          <label>Eraser Size</label>
          <input type="range" min="2" max="100" value={this.state.eraserSize} ref={this.eraserSizeRangeRef} onChange={this.onEraserSizeChange} />
        </div>

        <div ref={this.brushTopToolbarRef} className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'line' ? '' : 'hide'}`}>
          <label>Line Size</label>
          <input type="range" min="2" max="100" value={this.state.lineThickness} ref={this.lineThicknessRangeRef} onChange={this.onLineThicknessChange} />
        </div>

        <div className="bottom-toolbar z-depth-1">
          <button className={`btn-flat ${boardState.tool === 'brush' ? 'active' : ''} brand-text`} title="Paint Brush" onClick={() => _setTool('brush')}>
            <i className="fa fa-paint-brush "></i>
          </button>
          <button className={`btn-flat ${boardState.tool === 'rainbow_brush' ? 'active' : ''} brand-text`} title="Rainbow Brush" onClick={() => _setTool('rainbow_brush')}>
            <i className="material-icons ">colorize</i>
          </button>
          <button className={`btn-flat ${boardState.tool === 'eraser' ? 'active' : ''} brand-text`} title="Eraser" onClick={() => _setTool('eraser')}>
            <i className="fa fa-eraser "></i>
          </button>
          <button className={`btn-flat ${boardState.tool === 'line' ? 'active' : ''} brand-text`} title="Line Tool" onClick={() => _setTool('line')}>
            <i className="material-icons ">timeline</i>
          </button>
          <button className="btn-flat brand-text" title="Color Palette" onClick={() => this.colorPickerInstance.open()}>
            <i className="material-icons ">palette</i>
          </button>
          <button className="btn-flat brand-text" title="Undo" onClick={() => _onUndo()}>
            <i className="material-icons ">undo</i>
          </button>
          <button className="btn-flat brand-text" title="Redo" onClick={() => _onRedo()}>
            <i className="material-icons ">redo</i>
          </button>
          <button className="btn-flat brand-text" title="Save this slide" onClick={() => _save()}>
            <i className="material-icons ">save</i>
          </button>
          <button className="btn-flat brand-text" title="Clear the board" onClick={() => this.clearBoardModalInstance.open()}>
            <i className="fa fa-ban "></i>
          </button>
          <button className="btn-flat brand-text" title="Go to home" onClick={() => this.goHomeInstance.open()}>
            <i className="material-icons ">home</i>
          </button>
        </div>

        <div className="modal bottom-sheet" ref={this.goHomeRef}>
          <div className="modal-content container center">
            <h4>Are you sure you want to go to the home page?</h4>
            <p>If you do this, <b>ALL</b> the changes you made will be <b>LOST FOREVER.</b></p>
          </div>
          <div className="modal-footer container">
            <button className="btn green-text right" onClick={e => this.goHomeInstance.close()}>No</button>
            <Link to="/" className="btn red-text left">Yes</Link>
          </div>
        </div>

        <div className="modal bottom-sheet" ref={this.clearBoardRef}>
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

        <div className="modal" ref={this.colorPickerRef}>
          <div className="modal-content">
            <PaintSettings
              initialColor={`rgb(${r * 255}, ${g * 255}, ${b * 255})`}
              onPickColor={color => {
                if(boardState.tool === 'brush' || boardState.tool === 'line'){
                  boardState.drawBoard.changeToolSetting(`${boardState.tool}Color`,[color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255]);
                }
                else return;
              }}
            />
          </div>
          <div className="modal-footer container">
            <button className="btn brand-text" onClick={() => this.colorPickerInstance.close()}>Done</button>
          </div>
        </div>
      </div>
    )
  }
}
