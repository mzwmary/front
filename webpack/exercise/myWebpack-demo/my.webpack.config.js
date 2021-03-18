const path = require('path')
module.exports = {
  entry: './view/index.js',
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  mode: 'development'
}