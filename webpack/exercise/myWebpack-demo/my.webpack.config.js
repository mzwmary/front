const path = require('path')
const HelloWordPlugin = require('./plugins/HelloWordPlugin.js')
const HTMLPlugin = require('./plugins/HTMLPlugin.js')
module.exports = {
  entry: './view/index.js',
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: './loaders/loader1.js'
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     './loaders/loader1.js',
      //     './loaders/loader2.js',
      //     './loaders/loader3.js'
      //   ]
      // },
      {
        test: /\.js$/,
        use: {
          loader: './loaders/loader1.js',
          options: {
            name: '哈哈哈'
          }
        }
      }
    ]
  },
  plugins: [
    new HelloWordPlugin(),
    // new HTMLPlugin({
    //   filename: 'index.html',
    //   template: './view/index.html'
    // })
  ]
}