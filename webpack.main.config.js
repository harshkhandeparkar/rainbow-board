const path = require('path');

module.exports = {
  entry: './electron/electron.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  target: 'electron-main'
}
