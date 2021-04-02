import { BrowserWindow, dialog, app, IpcMainEvent } from 'electron';
import { extname } from 'path';
import { OPEN } from '../../common/constants/eventNames';

export function openDialog(win: BrowserWindow, event: IpcMainEvent) {
  dialog.showOpenDialog(win, {
    title: 'Open Whiteboard',
    defaultPath: app.getPath('documents'),
    buttonLabel: 'Open',
    filters: [{name: 'Rainbow File', extensions: ['rainbow']}],
    message: 'Open a saved .rainbow file.',
    properties: [
      'openFile'
    ]
  }).then(({ canceled, filePaths }) => {
    if (!canceled) {
      const filePath = filePaths[0];

      open(event, filePath);
    }
  })
}

export function open(event: IpcMainEvent, path: string) {
  if (extname(path).toString() !== '.rainbow') {
    dialog.showErrorBox(
      'Invalid File',
      'The file to be opened should be a valid .rainbow file.'
    )
  }
  else event.reply(OPEN, { path });
}
