import { BrowserWindow, dialog, app, IpcMainEvent } from 'electron';
import { extname } from 'path';
import { OPEN } from '../../common/constants/events';
import { ITypedIpcMainEvent } from '../events/limitedIPC';

export interface IOpenDialogOptions {
  title: string;
  message: string;
  /** Documents folder by default */
  defaultPath?: string;
  openDirectory: boolean;
  filters: Electron.FileFilter[];
}

export function openDialog(
  win: BrowserWindow,
  event: ITypedIpcMainEvent,
  dialogOptions: IOpenDialogOptions
) {
  dialog.showOpenDialog(win, {
    title: dialogOptions.title,
    defaultPath: dialogOptions.defaultPath ?? app.getPath('documents'),
    buttonLabel: dialogOptions.openDirectory ? 'Select Folder' : 'Select File',
    filters: dialogOptions.filters,
    message: dialogOptions.message,
    properties: [
      dialogOptions.openDirectory ? 'openDirectory' : 'openFile'
    ]
  }).then(({ canceled, filePaths }) => {
    if (!canceled) {
      const filePath = filePaths[0];

      open(event, filePath);
    }
  })
}

export function open(event: ITypedIpcMainEvent, path: string) {
  if (extname(path).toString() !== '.rainbow') {
    dialog.showErrorBox(
      'Invalid File',
      'The file to be opened should be a valid .rainbow file.'
    )
  }
  else event.reply(OPEN, { path });
}
