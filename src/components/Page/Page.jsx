import React, { Component, createRef } from 'react';
import { ipcRenderer } from 'electron';
import { RealDrawBoard } from 'svg-real-renderer';
import SVGSaver from 'svgsaver';
import ipcHandler from '../../util/ipc-handler';
import themeManager from '../../util/theme';
import { boardPluginExists, boardPlugin } from '../../util/plugins';

import { Toolbar } from './Toolbar/Toolbar.jsx';

import './Page.css';

export class Page extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      boardState: {
        tool: 'brush'
      }
    }

    this.svgRef = createRef();
    this.toolbarRef = createRef();

    if (boardPluginExists) {
      const customBoardOptions = boardPlugin.plugin.customBoardOptions[themeManager.getTheme().theme] || {};

      this.boardOptions = {
        ...this.boardOptions,
        ...customBoardOptions,
        toolSettings: {
          ...this.boardOptions.toolSettings,
          ...(customBoardOptions.toolSettings || {})
        }
      }
    }
  }

  boardOptions = {
    drawAxes: false,
    xOffset: 0,
    yOffset: 0,
    toolSettings: {
      brushSize: 3,
      lineThickness: 3,
      eraserSize: 30,
      changeRate: 5,
      brushColor: themeManager.getTheme().theme === 'light' ? [0, 0, 0] : [1, 1, 1],
      lineColor: themeManager.getTheme().theme === 'light' ? [0, 0, 0] : [1, 1, 1]
    },
    bgColor: themeManager.getTheme().theme === 'light' ? [1, 1, 1] : [0, 0, 0],
    allowUndo: true,
    maxSnapshots: 10
  }

  componentDidMount() {
    this.setState({
      boardState: {
        ...this.state.boardState,
        drawBoard: new RealDrawBoard({
          svg: this.svgRef.current,
          dimensions: [
            this.svgRef.current.clientWidth,
            this.svgRef.current.clientHeight
          ],
          ...this.boardOptions
        }).draw().startRender()
      }
    })

    this._setHotkeys();
  }

  componentWillUnmount() {
    this._removeHotkeys();
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
    ipcRenderer.send('prompt', {
      title: 'Clear this page?',
      message: 'If you clear the page, all the unsaved data will be LOST FOREVER.',
      buttons: ['Yes', 'No'],
      event: 'clear'
    })
  }

  _save(type) {
    const svgSaver = new SVGSaver();

    this.state.boardState.drawBoard.clearPreview();
    this.svgRef.current.setAttribute('width', this.state.boardState.drawBoard.dimensions[0].toString());
    this.svgRef.current.setAttribute('height', this.state.boardState.drawBoard.dimensions[1].toString());

    if (type === 'svg') svgSaver.asSvg(this.svgRef.current, 'slide.svg');
    else svgSaver.asPng(this.svgRef.current, 'slide');

    this.svgRef.current.removeAttribute('width');
    this.svgRef.current.removeAttribute('height');
  }

  _removeHotkeys() {
    ipcHandler.removeEventHandler('undo', 'undoEventHandler');
    ipcHandler.removeEventHandler('redo', 'redoEventHandler');
    ipcHandler.removeEventHandler('save', 'saveEventHandler');
    ipcHandler.removeEventHandler('clear', 'clearEventHandler');
    ipcHandler.removeEventHandler('prompt-reply', 'clearPagePromptHandler');
  }

  _setHotkeys() {
    this._removeHotkeys();

    ipcHandler.addEventHandler('undo', 'undoEventHandler', () => {
      this.state.boardState.drawBoard.undo();
    })
    ipcHandler.addEventHandler('redo', 'redoEventHandler', () => {
      this.state.boardState.drawBoard.redo();
    })
    ipcHandler.addEventHandler('save', 'saveEventHandler', () => {
      this.toolbarRef.current.saveBoardModalInstance.open();
    })
    ipcHandler.addEventHandler('clear', 'clearEventHandler', () => {
      this._clearBoard();
    })
    ipcHandler.addEventHandler('prompt-reply', 'clearPagePromptHandler', (event, args) => {
      if (args.response === 0 && args.event === 'clear') this.state.boardState.drawBoard.clear();
    })
  }

  render() {
    return (
      <div>
        <svg className="page" ref={this.svgRef}></svg>

        <Toolbar
          ref={this.toolbarRef}
          boardOptions={this.boardOptions}
          boardState={this.state.boardState}
          initialBrushColor={this.boardOptions.toolSettings.brushColor}
          _setTool={(tool) => this._setTool(tool)}
          _save={(type) => this._save(type)}
          _clearBoard={() => this._clearBoard()}
          _onUndo={() => this.state.boardState.drawBoard.undo()}
          _onRedo={() => this.state.boardState.drawBoard.redo()}
          onBrushSizeChange={(size) => this.state.boardState.drawBoard.changeBrushSize(size)}
          onEraserSizeChange={(size) => this.state.boardState.drawBoard.changeEraserSize(size)}
          _changeToolSetting={(property, newValue) => this.state.boardState.drawBoard.changeToolSetting(property, newValue)}
        />
      </div>
    )
  }
}

export default Page;
