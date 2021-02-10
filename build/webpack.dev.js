const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')

module.exports = merge(baseConfig,{
  mode: 'development',
  devServer: {
    port: 5000,
    hot: true,
    open: true,
    contentBase: './view'
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'true'
    })
  ]
})