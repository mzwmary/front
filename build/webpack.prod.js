const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const webpack = require('webpack');

module.exports = merge(baseConfig,{
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'false'
    })
  ],

})