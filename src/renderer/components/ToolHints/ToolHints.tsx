import React from 'react';
import { Tool } from 'svg-real-renderer/src/renderers/RealDrawBoard/tools/tools';
import { COLOR_PALETTE } from '../../../common/constants/shortcuts';
import packageFile from '../../../../package.json';

const { discordInvite } = packageFile;

const TOOL_TITLE_MAP = {
  brush: 'Brush Tool',
  eraser: 'Eraser',
  line: 'Line Tool',
  text: 'Text Tool'
}

const TOOL_HINT_MAP  = {
  brush:
    <>
      Hold left click and drag the mouse to draw.
      <br /><br />
      <b>Scroll</b>: Scrolling the mousewheel directly will change the brush size.<br />
      <b>Color</b>: Click on the color palette button or use {COLOR_PALETTE.platformFormattedString} shortcut while using the brush tool to change the brush color.
    </>,
  eraser:
    <>
      Hold left click and drag the mouse to erase.
      <br /><br />
      <b>Scroll</b>: Scrolling the mousewheel directly will change the eraser size.
    </>,
  line:
    <>
      Left click at the starting point and drag the mouse to the desired end point. Release left click to confirm line.
      <br /><br />
      <b>Scroll</b>: Scrolling the mousewheel directly will change the line thickness.<br />
      <b>Color</b>: Click on the color palette button or use {COLOR_PALETTE.platformFormattedString} shortcut while using the brush tool to change the brush color.
    </>,
  text:
    <>
      The text tool has two modes, <i>new</i> and <i>edit</i>. In new mode, click and drag to start a new text entry, this will also change the mode to edit. <br />
      In edit mode, use the keyboard to enter text and the following keyboard shortcuts: <br />

      <ul>
        <li><b>Shift + Enter</b>: Add a linebreak/newline.</li>
        <li><b>Enter</b>: Here, enter will not enter a newline, instead this will confirm the text editing and change the mode to new.</li>
        <li><b>Delete and Backspace</b>: Normal.</li>
        <li><b>Arrow Keys</b>: Normal.</li>
      </ul>

      <b>Scroll</b>: Scrolling the mousewheel directly will change the font size.<br />
      <b>Color</b>: Click on the color palette button or use {COLOR_PALETTE.platformFormattedString} shortcut while using the brush tool to change the font color. <br />
      <b>Mode</b>: Use the button at the top right corner to manually switch modes. <br /> <br />

      Certain features such as other standard keyboard shortcuts have not been added yet but will be added in the future. Join our <a href={discordInvite} target="_blank" rel="noopener noreferrer">Discord Server</a> to follow the development or give feedback.
    </>
}

export const ToolHintsModal = ({ tool, onClose }: {tool: Tool, onClose: () => void}) => {
  return (
    <>
      <div className="modal-content">
        <h5 className="center brand-text">{TOOL_TITLE_MAP[tool]} Help</h5>
        <div className="container" style={{textAlign: 'left'}}>
          {TOOL_HINT_MAP[tool]}
          <br /><br />

          <h5 className="center brand-text">Zoom</h5> <br />
          <b>Zoom</b>: Scrolling the mousewheel while holding the Ctrl key will zoom into the whiteboard. <br />
          <b>Pan</b>: Dragging the whiteboard while holding the Ctrl key will pan into the zoomed in whiteboard. <br />
        </div>
      </div>

      <div className="modal-footer container">
        <button title="Close (ESC)" className="btn brand-text" onClick={() => onClose()}>Close</button>
      </div>
    </>
  )
}
