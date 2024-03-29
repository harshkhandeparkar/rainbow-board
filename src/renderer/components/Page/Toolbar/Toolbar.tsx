import React, { Component, createRef, RefObject } from 'react';
import M, { Modal } from 'materialize-css';
import { Dropdown } from '../../Dropdown/Dropdown';

import { Icon } from '../../Icon/Icon';
import {
  faPaintBrush,
  faEraser,
  faGripLines,
  faPalette,
  faUndo,
  faRedo,
  faSave,
  faBan,
  faHome,
  faBorderAll,
  faAlignJustify,
  faSquare,
  faEllipsisV,
  faFileImage,
  faFont,
  faBold,
  faItalic,
  faUnderline
} from '@fortawesome/free-solid-svg-icons';

import './Toolbar.scss';
import { go } from '../../../util/navigation';
import ipcHandler from '../../../util/ipc-handler';
import { RealDrawBoard, RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';
import { getRGBColorString } from 'svg-real-renderer/build/src/util/getRGBColorString';
import { Tool, ToolSettings } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { Color } from 'svg-real-renderer/build/src/types/RealRendererTypes';

import * as EVENTS from '../../../../common/constants/events';
import { shortcutsManager } from '../../../../common/code/shortcuts';
import * as PATHS from '../../../../common/constants/paths';

import { TopToolbarRange, TopToolbarToggle, TopToolbarToggleButton } from './TopToolbarComponents';
import { BottomToolbarButton } from './BottomToolbarComponents';
import { ExportPageModal } from './modals/ExportPageModal';
import { ColorPaletteModal} from './modals/ColorPaletteModal';
import { TEXT_TOOL } from '../../../../common/constants/shortcuts';

export interface IToolbarProps {
  boardOptions: RealDrawBoardTypes.IRealDrawBoardParametersSettings;
  _changeToolSetting: (setting: keyof ToolSettings, value: ToolSettings[keyof ToolSettings]) => void;
  _setTool: (tool: Tool) => void;
  boardState: {
    drawBoard: RealDrawBoard,
    tool: Tool
  };
  _clearBoard: () => void;
  _export: (name:string, exportType: 'svg' | 'png', directoryPath: string) => void;
  _exportAll: (prefix: string, exportType: 'svg' | 'png', directoryPath: string) => void;
  _save: () => void;
  _onUndo: () => void;
  _onRedo: () => void;
}

export type RBBGType = 'ruled' | 'grid' | 'none';

export class Toolbar extends Component<IToolbarProps> {
  // Modals
  exportPageModalRef: RefObject<HTMLDivElement> = createRef();
  colorPaletteRef: RefObject<HTMLDivElement> = createRef();

  // Ranges
  // changeRateRangeRef: RefObject<HTMLInputElement> = createRef();
  lineColorRangeRef: RefObject<HTMLInputElement> = createRef();

  exportPageModalInstance: Modal;
  colorPaletteInstance: Modal;

  state: {
    brushSize: number;
    brushColor: Color;

    lineThickness: number;
    lineColor: Color;

    eraserSize: number;

    fontSize: number;
    fontColor: Color;
    textToolMode: 'new' | 'edit';
    bold: boolean;
    italic: boolean;
    underline: boolean;

    previousTool: Tool;
    bgType: RBBGType;
  } = {
    brushSize: this.props.boardOptions.toolSettings.brushSize,
    brushColor: this.props.boardOptions.toolSettings.brushColor,

    lineThickness: this.props.boardOptions.toolSettings.lineThickness,
    lineColor: this.props.boardOptions.toolSettings.lineColor,

    eraserSize: this.props.boardOptions.toolSettings.eraserSize,

    fontSize: this.props.boardOptions.toolSettings.fontSize,
    fontColor: this.props.boardOptions.toolSettings.fontColor,
    textToolMode: this.props.boardOptions.toolSettings.textToolMode,
    bold: this.props.boardOptions.toolSettings.bold,
    italic: this.props.boardOptions.toolSettings.italic,
    underline: this.props.boardOptions.toolSettings.underline,

    previousTool: this.props.boardOptions.tool,
    bgType: this.props.boardState.drawBoard.bgType.type as RBBGType
  }

  _initializeModal() {
    if (!this.exportPageModalInstance) {
      this.exportPageModalInstance = M.Modal.init(
        this.exportPageModalRef.current,
        { inDuration: 0, outDuration: 0, dismissible: true }
      )
    }

    if (!this.colorPaletteInstance) {
      this.colorPaletteInstance = M.Modal.init(
        this.colorPaletteRef.current,
        { inDuration: 0, outDuration: 0, dismissible: true }
      )
    }
  }

  componentDidUpdate() {
    this._initializeModal();
  }

  getOnPropertyChangeHandler = <K extends keyof ToolSettings>(property: K) => (val: ToolSettings[K]) => {
  this.props._changeToolSetting(property, val);
    this.setState({
      [property]: val
    })
  }

  onBrushSizeChange = this.getOnPropertyChangeHandler('brushSize');
  onEraserSizeChange = this.getOnPropertyChangeHandler('eraserSize');
  onLineThicknessChange = this.getOnPropertyChangeHandler('lineThickness');
  onFontSizeChange = this.getOnPropertyChangeHandler('fontSize');
  onTextToolModeChange = this.getOnPropertyChangeHandler('textToolMode');

  onFontStyleChange = (property: 'bold' | 'italic' | 'underline', val: boolean) => {
    this.props._changeToolSetting(property, val);
    this.setState({
      [property]: val
    })
  }

  _removeHotkeys() {
    ipcHandler.removeEventHandler(EVENTS.TOGGLE_COLOR_PALETTE, 'colorPaletteHandler');
    ipcHandler.removeEventHandler(EVENTS.SET_TOOL, 'setToolHandler');
    ipcHandler.removeEventHandler(EVENTS.PREV_TOOL, 'prevToolHandler');
  }

  _setHotkeys() {
    this._removeHotkeys();

    ipcHandler.addEventHandler(
      EVENTS.TOGGLE_COLOR_PALETTE,
      'colorPaletteHandler',
      () => this.colorPaletteInstance.isOpen ? this.colorPaletteInstance.close() : this.colorPaletteInstance.open()
    )
    ipcHandler.addEventHandler(EVENTS.SET_TOOL, 'setToolHandler', (event, args) => this._setTool(args.tool));
    ipcHandler.addEventHandler(EVENTS.PREV_TOOL, 'prevToolHandler', (event, args) => this._setTool(this.state.previousTool));
  }

  private _setTool(tool: Tool) {
    if (tool !== this.props.boardState.tool) {
      this.setState({
        previousTool: this.props.boardState.tool
      })
      this.props._setTool(tool);
    }
  }

  componentDidMount() {
    this._setHotkeys();
    this._initializeModal();

    this.props.boardState.drawBoard.on('tool-setting-change', 'toolbar-setting-change', ({settingName, newValue}) => {
      this.setState({
        [settingName]: newValue
      })
    })

    this.props.boardState.drawBoard.on('import', 'bgtype-handler', (params) => {
      if (params.import.bgType) {
        this.setState({
          bgType: params.import.bgType.type as RBBGType
        })
      }
    })
  }

  componentWillUnmount() {
    this._removeHotkeys();
  }

  _setBG(type: 'ruled' | 'grid' | 'none') {
    switch(type) {
      case 'none':
        this.props.boardState.drawBoard.changeBackground({
          type: 'none'
        })

        this.setState({bgType: type})
        break;

      case 'grid':
        this.props.boardState.drawBoard.changeBackground({
          type: 'grid',
          xSpacing: 15,
          ySpacing: 15,
          lineColor: [0.5, 0.5, 0.5]
        })

        this.setState({bgType: type});
        break;

      case 'ruled':
        this.props.boardState.drawBoard.changeBackground({
          type: 'ruled',
          spacing: 15,
          orientation: 'horizontal',
          lineColor: [0.5, 0.5, 0.5]
        })

        this.setState({bgType: type});
        break;

      default:
        break;
    }
  }

  render() {
    const {
      BRUSH_TOOL,
      LINE_TOOL,
      ERASER_TOOL,
      COLOR_PALETTE,
      UNDO,
      REDO,
      EXPORT_PAGE,
      CLEAR_PAGE,
      SAVE,
      GO_HOME
    } = shortcutsManager.shortcuts;
    const { boardState, _clearBoard, _export, _exportAll, _onUndo, _onRedo } = this.props;

    return (
      <div className="toolbar">
        <TopToolbarRange
          label="Brush Size"
          value={this.state.brushSize}
          visible={boardState.tool === 'brush'}
          onChange={this.onBrushSizeChange}
        />
        <TopToolbarRange
          label="Eraser Size"
          value={this.state.eraserSize}
          visible={boardState.tool === 'eraser'}
          onChange={this.onEraserSizeChange}
        />
        <TopToolbarRange
          label="Line Thickness"
          value={this.state.lineThickness}
          visible={boardState.tool === 'line'}
          onChange={this.onLineThicknessChange}
        />
        <TopToolbarRange
          label="Font Size"
          className="left"
          value={this.state.fontSize}
          visible={boardState.tool === 'text'}
          onChange={this.onFontSizeChange}
        />

        <div className={`top-toolbar valign-wrapper right ${boardState.tool === 'text' ? '' : 'hide'}`}>
          <TopToolbarToggle
            label="TEXT Tool Mode"
            values={[['edit', 'Edit'], ['new', 'New']]}
            value={this.state.textToolMode}
            onChange={this.onTextToolModeChange}
          />

          <label>Font Style</label>

          <TopToolbarToggleButton
            icon={faBold}
            tooltip="Bold"
            value={this.state.bold}
            onChange={(val) => {this.onFontStyleChange('bold', val)}}
          />
          <TopToolbarToggleButton
            icon={faItalic}
            tooltip="Italic"
            value={this.state.italic}
            onChange={(val) => {this.onFontStyleChange('italic', val)}}
          />
          <TopToolbarToggleButton
            icon={faUnderline}
            tooltip="Underline"
            value={this.state.underline}
            onChange={(val) => {this.onFontStyleChange('underline', val)}}
          />
        </div>

        <div className="bottom-toolbar">
          {/* Tools */}
          <BottomToolbarButton
            title="Brush"
            shortcutString={BRUSH_TOOL.platformFormattedString}
            active={boardState.tool === 'brush'}
            icon={faPaintBrush}
            onClick={() => this._setTool('brush')}
            relativePosition={true}
          >
            <div
              className="color-circle"
              style={{background: getRGBColorString(this.state.brushColor)}}
            />
          </BottomToolbarButton>
          <BottomToolbarButton
            title="Line Tool"
            shortcutString={LINE_TOOL.platformFormattedString}
            active={boardState.tool === 'line'}
            icon={faGripLines}
            onClick={() => this._setTool('line')}
            relativePosition={true}
          >
            <div
              className="color-circle"
              style={{
                background: getRGBColorString(this.state.lineColor),
              }}
            />
          </BottomToolbarButton>
          <BottomToolbarButton
            title="Eraser"
            shortcutString={ERASER_TOOL.platformFormattedString}
            active={boardState.tool === 'eraser'}
            icon={faEraser}
            onClick={() => this._setTool('eraser')}
          />
          <BottomToolbarButton
            title="TEXT Tool"
            shortcutString={TEXT_TOOL.platformFormattedString}
            active={boardState.tool === 'text'}
            icon={faFont}
            onClick={() => this._setTool('text')}
          />
          {/* /Tools */}

          <div className="vertical-separator-line" />

          {/* Board Manipulation */}
          <BottomToolbarButton
            title="Color Palette"
            shortcutString={COLOR_PALETTE.platformFormattedString}
            icon={faPalette}
            onClick={() => this.colorPaletteInstance.open()}
          />
          <BottomToolbarButton
            title="Undo"
            shortcutString={UNDO.platformFormattedString}
            icon={faUndo}
            onClick={() => _onUndo()}
          />
          <BottomToolbarButton
            title="Redo"
            shortcutString={REDO.platformFormattedString}
            icon={faRedo}
            onClick={() => _onRedo()}
          />
          {/* /Board Manipulation */}

          <div className="vertical-separator-line" />

          {/* BG */}
          <Dropdown
            getTriggerBtn={
              (ref) =>
              <button ref={ref} className="btn-flat brand-text" title="Set Background...">
                <Icon options={{icon: this.state.bgType === 'grid' ? faBorderAll : this.state.bgType === 'ruled' ? faAlignJustify : faSquare}} />
              </button>
            }
            up={true}
            fixedPosn={true}
          >
            <BottomToolbarButton
              title="Grid Background"
              icon={faBorderAll}
              active={this.state.bgType === 'grid'}
              onClick={() => this._setBG('grid')}
            />
            <BottomToolbarButton
              title="Ruled Background"
              icon={faAlignJustify}
              active={this.state.bgType === 'ruled'}
              onClick={() => this._setBG('ruled')}
            />
            <BottomToolbarButton
              title="Blank Background"
              icon={faSquare}
              active={this.state.bgType === 'none'}
              onClick={() => this._setBG('none')}
            />
          </Dropdown>
          {/* /BG */}

          {/* Others */}
          <BottomToolbarButton
            title="Clear Page"
            shortcutString={CLEAR_PAGE.platformFormattedString}
            icon={faBan}
            onClick={_clearBoard}
          />

          <Dropdown
            getTriggerBtn={(ref) => <button ref={ref} title="More Options..." className="btn-flat brand-text"><Icon options={{icon: faEllipsisV}} /></button>}
            up={true}
            fixedPosn={true}
          >
            <BottomToolbarButton
              title="Save Whiteboard"
              shortcutString={SAVE.platformFormattedString}
              icon={faSave}
              onClick={() => this.props._save()}
            />
            <BottomToolbarButton
              title="Export Page"
              shortcutString={EXPORT_PAGE.platformFormattedString}
              icon={faFileImage}
              onClick={() => this.exportPageModalInstance.open()}
            />
            <BottomToolbarButton
              title="Go to Home"
              shortcutString={GO_HOME.platformFormattedString}
              icon={faHome}
              onClick={() => go(`/${PATHS.HOME}`)}
            />
          </Dropdown>
          {/* /Others */}
        </div>

        <div className="modal" ref={this.exportPageModalRef}>
          <ExportPageModal
            onClose={() => this.exportPageModalInstance.close()}
            _export={_export}
            _exportAll={_exportAll}
          />
        </div>

        <div className="modal" ref={this.colorPaletteRef}>
          <ColorPaletteModal
            show={boardState.tool !== 'eraser'}
            toolInfo={
              ((): [Color, string] => {
                switch (boardState.tool) {
                  case 'text':
                    return [this.state.fontColor, 'Font Color'];
                  case 'line':
                    return [this.state.lineColor, 'Line Color'];
                  case 'brush':
                    return [this.state.brushColor, 'Brush Color'];
                }
              })()
            }
            onClose={() => this.colorPaletteInstance.close()}
            onColor={(color: Color) => {
              switch (this.props.boardState.tool) {
                case 'text':
                  boardState.drawBoard.changeToolSetting('fontColor', color);
                  this.setState({fontColor: color});
                  break;
                case 'line':
                  boardState.drawBoard.changeToolSetting('lineColor', color);
                  this.setState({lineColor: color});
                  break;
                case 'brush':
                  boardState.drawBoard.changeToolSetting('brushColor', color);
                  this.setState({brushColor: color});
                  break;
              }
            }}
          />
        </div>
      </div>
    )
  }
}
