import React, { MouseEventHandler, useState } from 'react';
import { Icon } from '../../../Icon/Icon';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { ipcRendererSend } from '../../../../util/ipc-sender';
import { IPCRendererSendEventArgs, OPEN } from '../../../../../common/constants/events';
import ipcHandler from '../../../../util/ipc-handler';

const exportFolderOpenDialogOptions: IPCRendererSendEventArgs['open'] = {
  dialogId: 1,
  options: {
    title: 'Select Folder',
    message: 'Select a folder to export the pages to.',
    openDirectory: true,
    filters: []
  }
}

const EPageModalBtnClassTypeMap = {
  regular: '',
  selected: 'selected',
  error: 'error'
}

const ExportPageModalButton = (
  {type, onClick, title, description}: {
    type: 'regular' | 'selected' | 'error',
    onClick: MouseEventHandler<HTMLDivElement>,
    title: string,
    description: string
  }
) => (
  <div
    className={`export-page-modal-btn ${EPageModalBtnClassTypeMap[type]}`}
    onClick={onClick}
  >
    <h6>{title}</h6>
    {description}
  </div>
)

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
              <ExportPageModalButton
                type={exportType === 'png' ? 'selected' : 'regular'}
                onClick={() => setExportType('png')}
                title="PNG"
                description="Exports as a normal image. Works everywhere. Default and recommended for most users"
              />
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <ExportPageModalButton
                type={exportType === 'svg' ? 'selected' : 'regular'}
                onClick={() => setExportType('svg')}
                title="SVG"
                description="Exports the page as an SVG. Use it if you know what it is."
              />
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
                      className={`export-page-modal-btn ${errDirNotSelected ? 'error' : (exportDirectory === null ? '' : 'selected')}`}
                      style={{width: '100%'}}
                      onClick={() => ipcRendererSend(OPEN, exportFolderOpenDialogOptions)}
                    >
                      {
                        errDirNotSelected ? (<>
                          You have to select a folder to export to
                          <Icon options={{icon: faExclamationCircle, color: 'red', className: 'right'}} customColor={true}/>
                        </>)
                        : (
                          exportDirectory === null ? (
                            <span style={{marginRight: 'auto', marginLeft: 'auto'}}>
                              Select a folder to export the images into.
                            </span>
                          ) : <b style={{marginRight: 'auto', marginLeft: 'auto'}}>{exportDirectory}</b>
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
