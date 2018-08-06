const path = require('path'); // node内置路径处理相关的模块

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 文件名
    filename: 'bundle.js',
    // 文件夹绝对路径
    path: path.resolve(__dirname, 'dist')
  }
};