import React from 'react';
import PaintSettings from '../../../PaintSettings/PaintSettings';

import { getRGBColorString } from 'svg-real-renderer/build/src/util/getRGBColorString';
import { Color } from 'svg-real-renderer/build/src/types/RealRendererTypes';

export const ColorPaletteModal = (
    props: {
      toolInfo: [
        colorVal: Color,
        propertyTitle: string
      ];
      show: boolean;
      onColor: (color: Color) => void;
      onClose: () => void;
    }
  ) => {
    const { toolInfo, onColor, onClose, show } = props;

    return (
      <>
        <div className="modal-content">
          {
            show ?
              <PaintSettings
                color={getRGBColorString(toolInfo[0])}
                propertyTitle={toolInfo[1]}
                onPickColor={color => {
                  const colorArr: Color = [color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255];
                  onColor(colorArr);
                }}
              /> :
              <div className="brand-text">This tool has no color property.</div>
          }

        </div>

        <div className="modal-footer container">
          <button title="Close (ESC)" className="btn brand-text" onClick={() => onClose()}>Close</button>
        </div>
      </>
    )
  }