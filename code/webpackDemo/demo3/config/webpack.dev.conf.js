/*
webpack开发环境配置
 */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {

  output: {
    filename: '[name].js',  // name是入口的名称
  },

  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // stylus/styl
      {
        test: /\.(stylus|styl)$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      }
    ]
  },

  // 开启开发环境下的: sourceMap调试
  devtool: 'cheap-module-eval-source-map',
})