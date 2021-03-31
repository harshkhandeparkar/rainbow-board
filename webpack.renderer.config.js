const path = require('path');

module.exports = {
  entry: './src/renderer/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'renderer.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx']
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.ts(x?)$/,
        use: ['ts-loader']
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
