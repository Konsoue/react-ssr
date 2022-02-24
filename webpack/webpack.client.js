const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.common.js')

const clientConfig = {
  mode: 'production',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      exclude: /node_modules/,
    }]
  }
}

module.exports = merge(config, clientConfig)