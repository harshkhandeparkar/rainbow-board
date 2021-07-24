const path = require('path');
const include = [
  path.resolve(__dirname, 'src', 'renderer'),
  path.resolve(__dirname, 'src', 'common'),
  path.resolve(__dirname, 'node_modules')
]

module.exports = {
  entry: './src/renderer/index.tsx',
  output: {
    path: path.resolve(__dirname, 'frontend', 'build'),
    filename: 'renderer.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts(x?)$/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
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
