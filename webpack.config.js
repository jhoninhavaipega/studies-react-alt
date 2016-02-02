var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = {
      APP_DIR: path.resolve(__dirname, 'src/js'),
      SASS_DIR: path.resolve(__dirname, 'src/sass'),
      BUILD_JS_DIR: path.resolve(__dirname, 'dist/js'),
      BUILD_CSS_DIR: '../css',
      APP_ENTRY_FILE: 'app.js',
      APP_OUT_FILE: 'list-notifications.js',
      VENDORS_FILE: 'vendors.js',
      CSS_OUT_FILE: 'list-notifications.css'
    };

module.exports = {
  entry: {
    app: config.APP_DIR + '/' + config.APP_ENTRY_FILE,
    vendors: [
      'alt',
      'react',
      'react-dom'
    ]
  },

  output: {
    path: config.BUILD_JS_DIR,
    filename: config.APP_OUT_FILE
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', config.VENDORS_FILE),
    new ExtractTextPlugin(config.BUILD_CSS_DIR + '/' + config.CSS_OUT_FILE, {
      allChunks: false
    })
  ]
};
