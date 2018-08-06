const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  // 启用source-map, 运行错误可以看出哪个文件的哪一行出错
  // 一般只在开发模式下启用, 在生产(build)模式下不启用
  devtool: 'inline-source-map',
  //告知 webpack-dev-server，在 localhost:8080 下建立服务，
  // 将 dist 目录下的文件，作为可访问文件
  devServer: {
    contentBase: './dist',
    port: 8888,  // 默认8080
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'dev'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};