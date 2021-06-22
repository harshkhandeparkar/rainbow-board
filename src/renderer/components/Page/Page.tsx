import React, { Component, createRef, RefObject } from 'react';
import { ipcRenderer } from 'electron';
import { RealDrawBoard } from 'svg-real-renderer';
import SVGSaver from 'svgsaver';
import ipcHandler from '../../util/ipc-handler';
import themeManager from '../../util/theme';

import * as EVENTS from '../../../common/constants/eventNames';

import { Toolbar } from './Toolbar/Toolbar';

import './Page.scss';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { RealDrawBoardDefaults, RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';

export interface IPageState {
  boardState: {
    tool: Tool,
    drawBoard?: RealDrawBoard
  }
}

export interface IPageProps {
  onDrawBoard: (board: RealDrawBoard) => void;
  _save: () => void;
}

export class Page extends Component<IPageProps> {
  state: IPageState = {
    boardState: {
      tool: 'brush' as Tool
    }
  }

  onDrawBoardFired = false;
  svgRef: RefObject<SVGSVGElement> = createRef();
  toolbarRef: RefObject<Toolbar> = createRef();

  boardOptions: RealDrawBoardTypes.IRealDrawBoardParametersSettings;

  constructor(props: any) {
    super(props);

    const { boardOptions: customBoardOptions } = themeManager.getTheme();

    this.boardOptions = {
      ...RealDrawBoardDefaults,
      allowUndo: true,
      maxUndos: 10,
      tool: 'brush',
      bgType: {
        type: 'none'
      },
      ...customBoardOptions,
      toolSettings: {
        ...RealDrawBoardDefaults.toolSettings,
        brushSize: 3,
        lineThickness: 3,
        eraserSize: 30,
        ...('toolSettings' in customBoardOptions ? customBoardOptions.toolSettings : {})
      }
    }

    this.state.boardState.drawBoard = new RealDrawBoard({
      svg: this.svgRef.current,
      ...this.boardOptions,
    })
  }

  componentDidMount() {
    const drawBoard = this.state.boardState.drawBoard;

    drawBoard.attach(
      this.svgRef.current,
      [
        this.svgRef.current.clientWidth,
        this.svgRef.current.clientHeight
      ]
    ).draw().startRender();

    if (!this.onDrawBoardFired) {
      this.props.onDrawBoard(drawBoard);
      this.onDrawBoardFired = true;
    }

    this._setHotkeys();
  }

  componentWillUnmount() {
    this._removeHotkeys();
  }

  _setTool(tool: Tool) {
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

  _export(type: 'svg' | 'png') {
    const svgSaver = new SVGSaver();

    this.state.boardState.drawBoard.clearPreview();
    this.svgRef.current.setAttribute('width', this.state.boardState.drawBoard.dimensions[0].toString());
    this.svgRef.current.setAttribute('height', this.state.boardState.drawBoard.dimensions[1].toString());

    if (type === 'svg') svgSaver.asSvg(this.svgRef.current, 'page.svg');
    else svgSaver.asPng(this.svgRef.current, 'page');

    this.svgRef.current.removeAttribute('width');
    this.svgRef.current.removeAttribute('height');
  }

  _removeHotkeys() {
    ipcHandler.removeEventHandler(EVENTS.UNDO, 'undoEventHandler');
    ipcHandler.removeEventHandler(EVENTS.REDO, 'redoEventHandler');
    ipcHandler.removeEventHandler(EVENTS.EXPORT_PAGE, 'exportEventHandler');
    ipcHandler.removeEventHandler(EVENTS.EXPORT_PAGE_DIALOG, 'exportDialogEventHandler');
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
    ipcHandler.addEventHandler(EVENTS.EXPORT_PAGE, 'exportEventHandler', (e, {type}: {type: 'svg' | 'png'}) => {
      this._export(type);
    })
    ipcHandler.addEventHandler(EVENTS.EXPORT_PAGE_DIALOG, 'exportDialogEventHandler', () => {
      this.toolbarRef.current.exportPageModalInstance.open();
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
          boardState={{ drawBoard: this.state.boardState.drawBoard, tool: this.state.boardState.tool }}
          _setTool={(tool) => this._setTool(tool)}
          _export={(type) => this._export(type)}
          _save={() => this.props._save()}
          _clearBoard={() => this._clearBoard()}
          _onUndo={() => this.state.boardState.drawBoard.undo()}
          _onRedo={() => this.state.boardState.drawBoard.redo()}
          _changeToolSetting={(property, newValue) => this.state.boardState.drawBoard.changeToolSetting(property, newValue)}
        />
      </div>
    )
  }
}

export default Page;
