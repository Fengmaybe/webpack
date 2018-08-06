const path = require('path');
const MyExampleWebpackPlugin = require('./src/my-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

module: {
  rules: [
    {
      test: /\.json2$/,
      use: 'json2-loader'
    }
  ]
},

  plugins: [
    new MyExampleWebpackPlugin() // 内部会调用对象的apply()
  ]
};