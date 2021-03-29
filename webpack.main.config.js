const path = require('path');

module.exports = {
  entry: './src/electron/electron.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  }
}
