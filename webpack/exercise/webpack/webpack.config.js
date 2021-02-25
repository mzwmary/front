// https://webpack.docschina.org/configuration/ webpack配置文档
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './view/index.js',
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    port: 9090,
    hot: true,
    open: true,
    contentBase: path.join(__dirname, "view")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, "view/index.html")
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'assets'),
        to: 'assets'
      }]
    }),
    new webpack.BannerPlugin(''),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|bmp|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5 * 1024,
              outputPath: 'images',
              name: '[name]-[hash:4].[ext]',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|svg|ttf)$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_module/,
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: require.resolve('jquery'),
        use: {
          loader: 'expose-loader',
          options: {
            exposes: ['$', 'jQuery']
          }
        }
      }
    ]
  },
  devtool: 'eval-cheap-module-source-map'
}