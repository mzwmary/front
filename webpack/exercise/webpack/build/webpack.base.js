const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: [
      './view/index.js',
      // "core-js/modules/es.promise",
      // "core-js/modules/es.array.iterator"
    ],
  },
  output: {
    path: path.join(__dirname,'../dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "./view/index.html",
      chunks: ['index']
    }),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, '..','./assets'),
        to: 'assets'
      }]
    }),
    new webpack.BannerPlugin(''),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dist/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dist/vue_dll.js')
    })
  ],
  module: {
    noParse: /bootstrap/,
    rules: [
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|bmp|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5 * 1024,
              outputPath: './images',
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
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '~',
      name: function (module, chunks, cacheGroupKey) {
        const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
        const allChunksNames = chunks.map((item) => item.name).join('~');
        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
}