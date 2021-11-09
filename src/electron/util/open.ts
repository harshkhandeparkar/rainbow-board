import { BrowserWindow, dialog, app } from 'electron';
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
  dialogOptions: IOpenDialogOptions,
  dialogId: number
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

      open(event, filePath, dialogId);
    }
  })
}

export function open(event: ITypedIpcMainEvent, path: string, dialogId: number) {
  event.reply(OPEN, { path, dialogId });
}
