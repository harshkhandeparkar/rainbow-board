import { BrowserWindow, dialog, app, IpcMainEvent } from 'electron';
import { join, basename, dirname } from 'path';
import { SAVE } from '../../common/constants/eventNames';

export function saveDialog(win: BrowserWindow, event: IpcMainEvent) {
  dialog.showSaveDialog(win, {
    title: 'Save Whiteboard',
    defaultPath: join(app.getPath('documents'), 'whiteboard.rainbow'),
    buttonLabel: 'Save',
    filters: [{name: 'Rainbow File', extensions: ['rainbow']}],
    message: 'Save the whiteboard as a .rainbow file.',
    properties: [
      'createDirectory',
      'showOverwriteConfirmation'
    ]
  }).then(({ canceled, filePath }) => {
    if (!canceled) {
      const finalFilePath = join(dirname(filePath), basename(filePath, '.rainbow') + '.rainbow');

      event.reply(SAVE, { finalFilePath });
    }
  })
}
