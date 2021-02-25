const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')

module.exports = merge(baseConfig,{
  mode: 'development',
  devServer: {
    port: 5000,
    hot: true,
    open: true,
    contentBase: './view',
    proxy: {
      '/api': 'http://localhost:9999',
      // '/api':{
      //     target: 'http://localhost:9999',
      //     // 转发请求时不会携带/api
      //     pathRewrite: {
      //         '^/api': ''
      //     }
      // }
    }
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'true'
    })
  ]
})