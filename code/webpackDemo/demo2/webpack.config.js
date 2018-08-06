const path = require('path') // node内置模块(操作路径信息)
const HtmlPlugin = require('html-webpack-plugin') // 打包生成html

/*
得到指定目录的绝对路径
 */
function resolve(dir) {
  // __dirname: 是文件所在目标的绝对路径
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 入口
  entry: './src/index.js',

  // 出口
  output: {
    path: resolve('dist'),// 所有打包生成文件(js/css/img)的基础路径
    filename: 'bundle.js'
  },

  // 模块加载器
  module: {
    rules: [
      // 将es6编译为es5
      {
        test: /\.js$/,   // 用来匹配处理模块文件的正则
        loader: 'babel-loader', // 加载器包名
        include: [resolve('src')] // 只针对哪些文件夹下的模块进行处理
      },

      // 加载css
      {
        test: /\.less$/,
        // style()  css()
        use: ['style-loader', 'css-loader', 'less-loader']  // style(css('xxx.css'))
      },

      // 加载img
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader'
      },
    ]
  },

  // 插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html', // 在执行命令所在目录查找
      filename: 'index.html', // 在output.path指定的输出目录中生成
      inject: true // 向页面中自动引入打包生成的js/css
    })
  ]
}