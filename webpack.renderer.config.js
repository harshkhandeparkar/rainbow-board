const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'renderer.bundle.js'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
            plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-display-name']
          }
        }
      }
    ]
  }
}
