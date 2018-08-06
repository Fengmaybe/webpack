const path = require('path'); // node内置路径处理相关的模块
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new UglifyJSPlugin() // 引入压缩js的插件(去除未使用的代码)
  ]
};