const { dialog } = require('electron');
const { version } = require('../package.json');

module.exports = {
  showAboutDialog: (win) => {
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
}
