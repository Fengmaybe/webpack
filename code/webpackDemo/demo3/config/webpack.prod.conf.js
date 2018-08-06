/*
webpack生产环境配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

/*
得到指定目录的绝对路径
 */
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {

  // 入口
  entry: {
    // 指定第三方模块包含哪些
    vendor: ["jquery"]
  },

  output: {
    filename: 'static/js/[name].[chunkhash:10].js',  // name是入口的名称
    publicPath: '/'
  },

  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 抽取css
          use: 'css-loader',
        })
      },
      // stylus/styl
      {
        test: /\.(stylus|styl)$/,
        use: ExtractTextPlugin.extract({ // 抽取css
          use: ['css-loader', 'stylus-loader'],
        })
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),

    // 清理dist文件夹
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),

    // 第三方包模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // 压缩css
    new OptimizeCssPlugin(),

    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    new webpack.HashedModuleIdsPlugin() // 将模块的hash值作为模块的id
  ],

  // 开启sourceMap(最后应该去除)
  devtool: 'source-map'
})