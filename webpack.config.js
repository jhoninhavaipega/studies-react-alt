var path = require('path');
var webpack = require('webpack');

var config = {
  APP_DIR: path.resolve(__dirname, 'src/js'),
  BUILD_DIR: path.resolve(__dirname, 'dist/js')
}

module.exports = {
  entry: config.APP_DIR + '/app.js',
  output: {
    path: config.BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};