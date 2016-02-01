var path = require('path');
var webpack = require('webpack');

var config = {
  APP_DIR: path.resolve(__dirname, 'src/js'),
  SASS_DIR: path.resolve(__dirname, 'src/sass'),
  BUILD_DIR: path.resolve(__dirname, 'dist/js'),
  APP_FILE: 'app.js',
  VENDORS_FILE: 'vendors.js'
};

module.exports = {
  entry: {
    app: config.APP_DIR + '/' + config.APP_FILE,
    vendors: [
      'alt',
      'react',
      'react-dom'
    ]
  },

  output: {
    path: config.BUILD_DIR,
    filename: config.APP_FILE
  },

  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel',
        exclude: /node_modules/,
        include: config.APP_DIR,
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      },

      {
        test: /\.scss/,
        include: config.SASS_DIR,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', config.VENDORS_FILE)
  ]
};
