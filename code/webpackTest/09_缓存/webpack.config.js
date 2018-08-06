const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: ['lodash']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HTMLWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.HashedModuleIdsPlugin(), // 使用hash作为module的id
    new webpack.optimize.CommonsChunkPlugin({ //提取第三方模块包
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', //提取webpack的模板代码
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      },
    ]

  }
};