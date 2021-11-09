import React, { Component, createRef, RefObject } from 'react';
import { ipcRenderer } from 'electron';
import { RealDrawBoard } from 'svg-real-renderer';
import { SVGSaver } from 'svgsaver-reboot';
import ipcHandler from '../../util/ipc-handler';
import themeManager from '../../util/theme';

import * as EVENTS from '../../../common/constants/events';

import { Toolbar } from './Toolbar/Toolbar';

import './Page.scss';
import { Tool } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/tools/tools';
import { RealDrawBoardDefaults, RealDrawBoardTypes } from 'svg-real-renderer/build/src/renderers/RealDrawBoard/RealDrawBoard';
import { ToolHintsModal } from '../ToolHints/ToolHints';
import { Modal } from 'materialize-css';
import { Icon } from '../Icon/Icon';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { RealExport } from 'svg-real-renderer/src/types/RealRendererTypes';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ipcRendererSend } from '../../util/ipc-sender';

export interface IPageState {
  boardState: {
    tool: Tool,
    drawBoard?: RealDrawBoard
  }
}

export interface IPageProps {
  onDrawBoard: (board: RealDrawBoard) => void;
  _save: () => void;
  _getPages: () => RealExport[];
}

export class Page extends Component<IPageProps> {
  hintModalRef: RefObject<HTMLDivElement> = createRef();
  hintModalInstance: Modal;

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
        fontSize: 20,
        ...('toolSettings' in customBoardOptions ? customBoardOptions.toolSettings : {})
      }
    }

    this.state.boardState.drawBoard = new RealDrawBoard({
      ...this.boardOptions
    })
  }

  _initializeModal() {
    if (!this.hintModalInstance) {
      this.hintModalInstance = M.Modal.init(
        this.hintModalRef.current,
        { inDuration: 0, outDuration: 0, dismissible: true }
      )
    }
  }

  componentDidUpdate() {
    this._initializeModal();
  }

  componentDidMount() {
    this._initializeModal();
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
      ipcRendererSend(EVENTS.PROMPT, {
        title: 'Clear this page?',
        message: 'If you clear the page, all the unsaved data will be LOST FOREVER.',
        buttons: ['No', 'Yes'],
        event: 'clear'
      })
    }
  }

  async _export(type: 'svg' | 'png') {
    const saver = new SVGSaver(this.svgRef.current);

    this.state.boardState.drawBoard.clearPreview();
    this.svgRef.current.setAttribute('width', this.state.boardState.drawBoard.dimensions[0].toString());
    this.svgRef.current.setAttribute('height', this.state.boardState.drawBoard.dimensions[1].toString());

    if (type === 'svg') saver.saveAsSVG('page');
    else await saver.saveAsPNG('page');

    this.svgRef.current.removeAttribute('width');
    this.svgRef.current.removeAttribute('height');
  }

  async _exportAll(type: 'svg' | 'png', directoryPath: string) {
    const saver = new SVGSaver();

    const tempSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tempSVG.style.setProperty('position', 'fixed');

    document.body.appendChild(tempSVG);

    const tempRDB = new RealDrawBoard({});
    tempRDB.attach(tempSVG, this.state.boardState.drawBoard.dimensions);

    const pages = this.props._getPages();

    for (let pageNo in pages) {
      const page = pages[pageNo];
      tempRDB.importData(page);

      tempSVG.setAttribute('width', tempRDB.dimensions[0].toString());
      tempSVG.setAttribute('height', tempRDB.dimensions[1].toString());

      saver.loadNewSVG(tempSVG);

      if (type === 'svg') await writeFile(
        join(
          directoryPath,
          `page-${parseInt(pageNo) + 1}.svg`
        ),
          await saver.getSVGBlob().text()
      )
      else await writeFile(
        join(
          directoryPath,
          `page-${parseInt(pageNo) + 1}.png`
        ),
        // thank you stackoverflow user: https://stackoverflow.com/a/51709828
        (await saver.getPNGDataURL()).replace(/^data:image\/png;base64,/, ""),
        {
          encoding: 'base64'
        }
      )
    }

    tempSVG.remove();
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

    ipcHandler.addEventHandler(EVENTS.UNDO, 'undoEventHandler', () => this.state.boardState.drawBoard.undo())
    ipcHandler.addEventHandler(EVENTS.REDO, 'redoEventHandler', () => this.state.boardState.drawBoard.redo())
    ipcHandler.addEventHandler(EVENTS.EXPORT_PAGE, 'exportEventHandler', (e, {type}) => {
      this._export(type);
    })
    ipcHandler.addEventHandler(EVENTS.EXPORT_PAGE_DIALOG, 'exportDialogEventHandler', () => {
      this.toolbarRef.current.exportPageModalInstance.open();
    })
    ipcHandler.addEventHandler(EVENTS.CLEAR_PAGE, 'clearEventHandler', () => this._clearBoard())
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
          _exportAll={(type: 'svg' | 'png', directoryPath: string) => this._exportAll(type, directoryPath)}
          _save={() => this.props._save()}
          _clearBoard={() => this._clearBoard()}
          _onUndo={() => this.state.boardState.drawBoard.undo()}
          _onRedo={() => this.state.boardState.drawBoard.redo()}
          _changeToolSetting={(property, newValue) => this.state.boardState.drawBoard.changeToolSetting(property, newValue)}
        />

        <button
          className="btn btn-floating page-btn top-left brand-text"
          onClick={() => this.hintModalInstance.open()}
          style={{
            marginRight: '0px',
            marginTop: '3rem'
          }}
        >
          <Icon
            options={{
              icon: faQuestionCircle
            }}
          />
        </button>

        <div className="modal" ref={this.hintModalRef}>
          <ToolHintsModal tool={this.state.boardState.tool} onClose={() => this.hintModalInstance.close()} />
        </div>
      </div>
    )
  }
}

export default Page;
