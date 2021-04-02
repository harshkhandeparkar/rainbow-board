import React, { Component, createRef, RefObject } from 'react';
import M, { Modal } from 'materialize-css';
import PaintSettings from '../../PaintSettings/PaintSettings';

import { Icon } from '../../Icon/Icon';
import { faPaintBrush, faEraser, faGripLines, faPalette, faUndo, faRedo, faSave, faBan, faHome } from '@fortawesome/free-solid-svg-icons';

import './Toolbar.css';
import { go } from '../../../util/navigation';
import ipcHandler from '../../../util/ipc-handler';
import { RealDrawBoard, RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';
import { Tool, ToolSettings } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { Color } from 'svg-real-renderer/build/src/types/RealRendererTypes';

import * as EVENTS from '../../../../common/constants/eventNames';
import { BRUSH_TOOL, LINE_TOOL, ERASER_TOOL, COLOR_PALETTE, UNDO, REDO, EXPORT_PAGE, CLEAR_PAGE } from '../../../../common/constants/shortcuts';

export interface IToolbarProps {
  boardOptions: RealDrawBoardTypes.RealDrawBoardOptions,
  _changeToolSetting: (setting: keyof ToolSettings, value: number) => void,
  _setTool: (tool: Tool) => void,
  initialBrushColor: Color,
  boardState: {
    drawBoard: RealDrawBoard,
    tool: Tool
  },
  _clearBoard: () => void,
  _save: (saveType: 'svg' | 'png') => void,
  _onUndo: () => void,
  _onRedo: () => void
}

export class Toolbar extends Component<IToolbarProps> {
  // Modals
  saveBoardRef: RefObject<HTMLDivElement> = createRef();
  colorPickerRef: RefObject<HTMLDivElement> = createRef();

  // Ranges
  brushSizeRangeRef: RefObject<HTMLInputElement> = createRef();
  eraserSizeRangeRef: RefObject<HTMLInputElement> = createRef();
  changeRateRangeRef: RefObject<HTMLInputElement> = createRef();
  lineThicknessRangeRef: RefObject<HTMLInputElement> = createRef();
  lineColorRangeRef: RefObject<HTMLInputElement> = createRef();

  saveBoardModalInstance: Modal;
  colorPickerInstance: Modal;

  state: {
    brushSize: number,
    eraserSize: number,
    lineThickness: number,
    lineColor: Color,
    saveType: 'svg' | 'png',
    saveModalOn: boolean
  } = {
    brushSize: this.props.boardOptions.toolSettings.brushSize,
    eraserSize: this.props.boardOptions.toolSettings.eraserSize,
    // changeRate: this.props.boardOptions.toolSettings.changeRate,
    lineThickness: this.props.boardOptions.toolSettings.lineThickness,
    lineColor: this.props.boardOptions.toolSettings.lineColor,
    saveType: 'png',
    saveModalOn: false
  }

  _initializeModal() {
    if (!this.saveBoardModalInstance) this.saveBoardModalInstance = M.Modal.init(this.saveBoardRef.current);
    if (!this.colorPickerInstance) this.colorPickerInstance = M.Modal.init(this.colorPickerRef.current);
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

  // onColorRateChange = () => {
  //   this.props._changeToolSetting('changeRate', Number(this.changeRateRangeRef.current.value));
  //   this.setState({
  //     changeRate: Number(this.changeRateRangeRef.current.value)
  //   })
  // }

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

  _removeHotkeys() {
    ipcHandler.removeEventHandler(EVENTS.TOGGLE_COLOR_PALETTE, 'colorPaletteHandler');
    ipcHandler.removeEventHandler(EVENTS.SET_TOOL, 'setToolHandler');
  }

  _setHotkeys() {
    this._removeHotkeys();

    ipcHandler.addEventHandler(EVENTS.TOGGLE_COLOR_PALETTE, 'colorPaletteHandler', () => this.colorPickerInstance.isOpen ? this.colorPickerInstance.close() : this.colorPickerInstance.open());
    ipcHandler.addEventHandler(EVENTS.SET_TOOL, 'setToolHandler', (event, args) => this.props._setTool(args.tool));
  }

  componentDidMount() {
    this._setHotkeys();
  }

  componentWillUnmount() {
    this._removeHotkeys();
  }

  render() {
    const { initialBrushColor, boardState, _setTool, _clearBoard, _save, _onUndo, _onRedo } = this.props;
    const [r, g, b] = initialBrushColor;

    return (
      <div className="toolbar">
        <div className={`top-toolbar valign-wrapper`}> {/* boardState.tool === 'rainbow_brush' ? 'left' : 'hide'}`}>*/}
          <label>Brush Size</label>
          <input type="range" min="2" max="100" value={this.state.brushSize} ref={this.brushSizeRangeRef} onChange={this.onBrushSizeChange} />
        </div>

        {/* <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'rainbow_brush' ? 'right' : 'hide'}`}>
          <label>Color Change Rate</label>
          <input type="range" min="1" max="50" value={this.state.changeRate} ref={this.changeRateRangeRef} onChange={this.onColorRateChange} />
        </div> */}

        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'eraser' ? '' : 'hide'}`}>
          <label>Eraser Size</label>
          <input type="range" min="2" max="100" value={this.state.eraserSize} ref={this.eraserSizeRangeRef} onChange={this.onEraserSizeChange} />
        </div>

        <div className={`top-toolbar z-depth-1 valign-wrapper ${boardState.tool === 'line' ? '' : 'hide'}`}>
          <label>Line Thickness</label>
          <input type="range" min="2" max="100" value={this.state.lineThickness} ref={this.lineThicknessRangeRef} onChange={this.onLineThicknessChange} />
        </div>

        <div className="bottom-toolbar">
          {/* Tools */}
          <button className={`btn-flat ${boardState.tool === 'brush' ? 'active' : ''} brand-text`} title={`Brush (${BRUSH_TOOL.platformFormattedString})`} onClick={() => _setTool('brush')}>
            <Icon options={{icon: faPaintBrush}} />
          </button>
          {/* <button className={`btn-flat ${boardState.tool === 'rainbow_brush' ? 'active' : ''} brand-text`} title="Rainbow Brush" onClick={() => _setTool('rainbow_brush')}>
            <Icon options={{icon:} />
          </button> */}
          <button className={`btn-flat ${boardState.tool === 'eraser' ? 'active' : ''} brand-text`} title={`Eraser (${ERASER_TOOL.platformFormattedString})`} onClick={() => _setTool('eraser')}>
            <Icon options={{icon: faEraser}} />
          </button>
          <button className={`btn-flat ${boardState.tool === 'line' ? 'active' : ''} brand-text`} title={`Line Tool (${LINE_TOOL.platformFormattedString})`} onClick={() => _setTool('line')}>
            <Icon options={{icon: faGripLines}} />
          </button>
          {/* /Tools */}

          <div className="separator-line" />

          {/* Board Manipulation */}
          <button className="btn-flat brand-text" title={`Color Palette (${COLOR_PALETTE.platformFormattedString})`} onClick={() => this.colorPickerInstance.open()}>
            <Icon options={{icon :faPalette}} />
          </button>
          <button className="btn-flat brand-text" title={`Undo (${UNDO.platformFormattedString})`} onClick={() => _onUndo()}>
            <Icon options={{icon: faUndo}} />
          </button>
          <button className="btn-flat brand-text" title={`Redo (${REDO.platformFormattedString})`} onClick={() => _onRedo()}>
            <Icon options={{icon: faRedo}} />
          </button>
          {/* /Board Manipulation */}

          <div className="separator-line" />

          {/* Others */}
          <button className="btn-flat brand-text" title={`Export Page (${EXPORT_PAGE.platformFormattedString})`} onClick={() => this.saveBoardModalInstance.open()}>
            <Icon options={{icon: faSave}} />
          </button>
          <button
            className="btn-flat brand-text"
            title={`Clear Page (${CLEAR_PAGE.platformFormattedString})`}
            onClick={_clearBoard}
          >
            <Icon options={{icon: faBan}} />
          </button>
          <button
            className="btn-flat brand-text"
            title="Go to Home"
            onClick={() => go('/')}
          >
            <Icon options={{icon: faHome}} />
          </button>
          {/* /Others */}
        </div>

        <div className="modal" ref={this.saveBoardRef}>
          <div className="modal-content container-fluid">
            <h3>Export Page</h3>
            <p>Export the current page as an image.</p>
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <div className={`save-type ${this.state.saveType === 'png' ? 'selected' : ''}`} onClick={() => this.setState({ saveType: 'png', saveModalOn: true })}>
                    <h6>PNG</h6>
                    Saves as a normal image. Works everywhere. Default and recommended for most users.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div  className={`save-type ${this.state.saveType === 'svg' ? 'selected' : ''}`} onClick={() => {this.setState({ saveType: 'svg', saveModalOn: true })}}>
                    <h6>SVG</h6>
                    Saves the file as an <a href="https://en.wikipedia.org/wiki/SVG" rel="noreferrer" style={{display: 'inline'}} target="_blank">SVG</a>. Use it if you know what it is.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer container">
            <button className="btn right" title="Cancel" onClick={e => this.saveBoardModalInstance.close()}>Cancel</button>
            <button
              className="btn brand-text left"
              title="Save"
              onClick={e => {
                _save(this.state.saveType);
                this.saveBoardModalInstance.close();
              }}
            >Save</button>
          </div>
        </div>

        <div className="modal" ref={this.colorPickerRef}>
          <div className="modal-content">
            <PaintSettings
              initialColor={`rgb(${r * 255}, ${g * 255}, ${b * 255})`}
              tool={boardState.tool}
              onPickColor={color => {
                if(boardState.tool === 'brush' || boardState.tool === 'line'){
                  boardState.drawBoard.changeToolSetting(`${boardState.tool}Color` as keyof ToolSettings, [color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255]);
                }
                else return;
              }}
            />
          </div>
          <div className="modal-footer container">
            <button title="Done" className="btn brand-text" onClick={() => this.colorPickerInstance.close()}>Done</button>
          </div>
        </div>
      </div>
    )
  }
}
