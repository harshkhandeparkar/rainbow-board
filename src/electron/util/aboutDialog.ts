import { BrowserWindow, dialog } from 'electron';
import { version } from '../../../package.json';

export function showAboutDialog(win: BrowserWindow) {
  dialog.showMessageBox(win, {
    type: 'info',
    title: 'Rainbow Board',
    buttons: ['OK'],
    message: `
Version: v${version}
Electron: v${process.versions.electron}
Chrome: v${process.versions.chrome}
Node.js: v${process.versions.node}
V8: v${process.versions.v8}
    `
  })
}
