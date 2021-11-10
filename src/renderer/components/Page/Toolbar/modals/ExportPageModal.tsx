import React, { useState } from 'react';
import { Icon } from '../../../Icon/Icon';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { ipcRendererSend } from '../../../../util/ipc-sender';
import { OPEN } from '../../../../../common/constants/events';
import ipcHandler from '../../../../util/ipc-handler';

export const ExportPageModal = (
  props: {
    onClose: () => void;
    _export: (exportType: 'svg' | 'png') => void;
    _exportAll: (exportType: 'svg' | 'png', directoryPath: string) => void;
  }
) => {
  const [exportAllFormVisible, setExportAllFormVisible] = useState<boolean>(false);
  const [exportType, setExportType] = useState<'svg' | 'png'>('png');
  const [exportDirectory, setExportDirectory] = useState<string | null>(null);
  const [errDirNotSelected, setErrDirNotSelected] = useState<boolean>(false);

  ipcHandler.addEventHandler(OPEN, 'exportAllOpenHandler', (e, {path, dialogId}) => {
    if (dialogId === 1) {
      setExportDirectory(path);
      setErrDirNotSelected(false);
    }
  })

  return (
    <>
    <div className="modal-content container-fluid">
      <h3>{exportAllFormVisible ? 'Export All Pages' : 'Export Current Page'}</h3>
      <p>{exportAllFormVisible ? 'Export all the pages as images.' : 'Export the current page as an image.'}</p>

      <div className="container">
          <div className="row">
            <div className="col s12">
              <div
                className={`export-type ${exportType === 'png' ? 'selected' : ''}`}
                onClick={() => setExportType('png')}
              >
                <h6>PNG</h6>
                Exports as a normal image. Works everywhere. Default and recommended for most users.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <div
                className={`export-type ${exportType === 'svg' ? 'selected' : ''}`}
                onClick={() => setExportType('svg')}
              >
                <h6>SVG</h6>
                Exports the page as an <a href="https://en.wikipedia.org/wiki/SVG" rel="noreferrer" style={{display: 'inline'}} target="_blank">SVG</a>. Use it if you know what it is.
              </div>
            </div>
          </div>

          {
            exportAllFormVisible && (
              <>
              <div className="row"><div className="col s12">
                  <hr className="horizontal-separator-line" />
              </div></div>
                <div className="row">
                  <div className="col s3 valign-wrapper form-col">
                    <label>Export To:</label>
                  </div>
                  <div className="col s9 form-col valign-wrapper">
                    <div
                      className={`export-type ${errDirNotSelected ? 'error' : (exportDirectory === null ? '' : 'selected')}`}
                      style={{width: '100%'}}
                      onClick={() => {
                        ipcRendererSend(OPEN, {
                          dialogId: 1,
                          options: {
                            title: 'Select Folder',
                            message: 'Select a folder to export the pages to.',
                            openDirectory: true,
                            filters: []
                          }
                        })
                      }}
                    >
                      {
                        errDirNotSelected ? (
                          <>
                            You have to select a folder to export to
                            <Icon options={{icon: faExclamationCircle, color: 'red', className: 'right'}} customColor={true}/>
                          </>
                        )
                        : (
                          exportDirectory === null ? (
                            <span style={{marginRight: 'auto', marginLeft: 'auto'}}>
                              Select a folder to export the images into.
                            </span>
                          ) : (
                            <b style={{marginRight: 'auto', marginLeft: 'auto'}}>{exportDirectory}</b>
                          )
                        )
                      }
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>

      <div className="modal-footer container">
        <button className="btn right" title="Cancel (ESC)" onClick={() => props.onClose()}>Cancel</button>
        <button
          className="btn brand-text left"
          title="Confirm"
          style={{
            marginRight: '0.5rem'
          }}
          onClick={() => {
            if (exportDirectory === null && exportAllFormVisible) return setErrDirNotSelected(true);

            exportAllFormVisible ? props._exportAll(exportType, exportDirectory) : props._export(exportType);
            props.onClose();
          }}
        >
          Confirm
        </button>

        <button
          className="btn brand-text left"
          title={exportAllFormVisible ? 'Export Current...' : 'Export All...'}
          onClick={() => setExportAllFormVisible(!exportAllFormVisible)}
        >
          {exportAllFormVisible ? 'Export Current...' : 'Export All...'}
        </button>
      </div>
    </>
  )
}
