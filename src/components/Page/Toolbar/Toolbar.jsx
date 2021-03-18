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
    this.saveBoardRef = createRef();
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
    brushSize: this.props.boardOptions.toolSettings.brushSize,
    eraserSize: this.props.boardOptions.toolSettings.eraserSize,
    changeRate: this.props.boardOptions.toolSettings.changeRate,
    lineThickness: this.props.boardOptions.toolSettings.lineThickness,
    lineColor: this.props.boardOptions.toolSettings.lineColor,
    saveType: 'png',
    saveModalOn: false
  }

  _initializeModal() {
    if (!this.clearBoardModalInstance) this.clearBoardModalInstance = M.Modal.init(this.clearBoardRef.current);
    if (!this.saveBoardModalInstance) this.saveBoardModalInstance = M.Modal.init(this.saveBoardRef.current);
    if (!this.colorPickerInstance) this.colorPickerInstance = M.Modal.init(this.colorPickerRef.current);
    if (!this.goHomeInstance) this.goHomeInstance = M.Modal.init(this.goHomeRef.current);
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

  onColorRateChange = () => {
    this.props._changeToolSetting('changeRate', Number(this.changeRateRangeRef.current.value));
    this.setState({
      changeRate: Number(this.changeRateRangeRef.current.value)
    })
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
        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'brush' ? '' : boardState.tool === 'rainbow_brush' ? 'left' : 'hide'}`}>
          <label>Brush Size</label>
          <input type="range" min="2" max="100" value={this.state.brushSize} ref={this.brushSizeRangeRef} onChange={this.onBrushSizeChange} />
        </div>

        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'rainbow_brush' ? 'right' : 'hide'}`}>
          <label>Color Change Rate</label>
          <input type="range" min="1" max="50" value={this.state.changeRate} ref={this.changeRateRangeRef} onChange={this.onColorRateChange} />
        </div>

        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'eraser' ? '' : 'hide'}`}>
          <label>Eraser Size</label>
          <input type="range" min="2" max="100" value={this.state.eraserSize} ref={this.eraserSizeRangeRef} onChange={this.onEraserSizeChange} />
        </div>

        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'line' ? '' : 'hide'}`}>
          <label>Line Thickness</label>
          <input type="range" min="2" max="100" value={this.state.lineThickness} ref={this.lineThicknessRangeRef} onChange={this.onLineThicknessChange} />
        </div>

        <div className="bottom-toolbar z-depth-1">
          <button className={`btn-flat ${boardState.tool === 'brush' ? 'active' : ''} brand-text`} title="Paint Brush" onClick={() => _setTool('brush')}>
            <i className="fa fa-paint-brush "></i>
          </button>
          {/* <button className={`btn-flat ${boardState.tool === 'rainbow_brush' ? 'active' : ''} brand-text`} title="Rainbow Brush" onClick={() => _setTool('rainbow_brush')}>
            <i className="material-icons ">colorize</i>
          </button> */}
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
          <button className="btn-flat brand-text" title="Save this slide" onClick={() => this.saveBoardModalInstance.open()}>
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

        <div className="modal" ref={this.saveBoardRef}>
          <div className="modal-content container-fluid">
            <h3>Save Slide</h3>
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <div className={`save-type card ${this.state.saveType === 'png' ? 'selected' : ''}`} onClick={() => this.setState({ saveType: 'png', saveModalOn: true })}>
                    <h6>PNG</h6>
                    Saves as a normal image. Loads and works everywhere. Default and recommended for most users.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div  className={`save-type card ${this.state.saveType === 'svg' ? 'selected' : ''}`} onClick={() => {this.setState({ saveType: 'svg', saveModalOn: true })}}>
                    <h6>SVG</h6>
                    Saves the file as an <a href="https://en.wikipedia.org/wiki/SVG" rel="noreferrer" style={{display: 'inline'}} target="_blank">SVG</a>. Use it if you know what it is.
                    <br />NOTE: THIS WILL SAVE THE SLIDE WITH A TRANSPARENT BACKGROUND.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer container">
            <button className="btn right" onClick={e => this.saveBoardModalInstance.close()}>Cancel</button>
            <button className="btn green-text left" onClick={e => {
              _save(this.state.saveType);
              this.saveBoardModalInstance.close();
            }}>Save</button>
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
