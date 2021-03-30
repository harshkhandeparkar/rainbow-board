import React, { Component, createRef } from 'react';
import { ipcRenderer } from 'electron';
import { RealDrawBoard } from 'svg-real-renderer';
import SVGSaver from 'svgsaver';
import ipcHandler from '../../util/ipc-handler';
import themeManager from '../../util/theme';

import * as EVENTS from '../../../common/constants/eventNames';

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

    const { boardOptions: customBoardOptions } = themeManager.getTheme();

    this.boardOptions = {
      ...this.boardOptions,
      ...customBoardOptions,
      toolSettings: {
        ...this.boardOptions.toolSettings,
        ...(customBoardOptions.toolSettings || {})
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
    },
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
    if (this.state.boardState.drawBoard._strokeIndex > 0) {
      ipcRenderer.send('prompt', {
        title: 'Clear this page?',
        message: 'If you clear the page, all the unsaved data will be LOST FOREVER.',
        buttons: ['No', 'Yes'],
        event: 'clear'
      })
    }
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
    ipcHandler.removeEventHandler(EVENTS.UNDO, 'undoEventHandler');
    ipcHandler.removeEventHandler(EVENTS.REDO, 'redoEventHandler');
    ipcHandler.removeEventHandler(EVENTS.SAVE_PAGE, 'saveEventHandler');
    ipcHandler.removeEventHandler(EVENTS.CLEAR_PAGE, 'clearEventHandler');
    ipcHandler.removeEventHandler(EVENTS.PROMPT_REPLY, 'clearPagePromptHandler');
  }

  _setHotkeys() {
    this._removeHotkeys();

    ipcHandler.addEventHandler(EVENTS.UNDO, 'undoEventHandler', () => {
      this.state.boardState.drawBoard.undo();
    })
    ipcHandler.addEventHandler(EVENTS.REDO, 'redoEventHandler', () => {
      this.state.boardState.drawBoard.redo();
    })
    ipcHandler.addEventHandler(EVENTS.SAVE_PAGE, 'saveEventHandler', () => {
      this.toolbarRef.current.saveBoardModalInstance.open();
    })
    ipcHandler.addEventHandler(EVENTS.CLEAR_PAGE, 'clearEventHandler', () => {
      this._clearBoard();
    })
    ipcHandler.addEventHandler(EVENTS.PROMPT_REPLY, 'clearPagePromptHandler', (event, args) => {
      if (args.response === 1 && args.event === 'clear') this.state.boardState.drawBoard.clear();
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
