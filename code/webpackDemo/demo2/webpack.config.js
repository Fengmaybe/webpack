/*
先把整体结构搭建好：姿势要对！
 */

const path = require('path'); // 能读取文件路径相关信息的包
// __dirname: node内置的一个变量, 值为当前文件所在目录的绝对路径(当前是demo2的绝对路径)
const HtmlPlugin = require('html-webpack-plugin');  // 向外暴露构造函数

//定义一个函数，得到指定目录(必须是项目文件夹下目录)的绝对路径
function resolve(dir) {
  return path.resolve(__dirname,dir);
}

//webpack本身是commonJS语法，暴露一个对象
module.exports = {
  //1.入口
  entry: './src/index.js',  // 入口js的相对路径(执行命令webpack所在的目录)
  //2.出口
  output: {
    path: resolve('dist'),  // 所有打包生成的文件(js/css/img/html...)的基础路径, 必须是绝对路径
    filename: 'bundle.js',  //文件名（可以带路径./js/bundle.js）
  },
  //3.模块加载器
  module: {
    //包含很多的loader的数组，每个loader是一个对象。
    rules: [
      // 将es6编译为es5的loader
      {
        test: /\.js$/,   // 用来匹配处理模块文件的正则
        loader: 'babel-loader', // 加载器包名
        include: [resolve('src')] // 只针对哪些文件夹下的模块进行处理，绝对地址。
      },
      // 加载css
      {
        test: /\.css$/,
        //先用css-loader(将CSS变成js)，再用style-loader(将样式添加到style标签中)
        //loader相当于一个函数，出栈入栈的感觉
        use: ['style-loader', 'css-loader']  // style(css('xxx.css'))
      },
      // 加载less
      {
        test: /\.less$/,  //目标文件
        use: ['style-loader', 'css-loader', 'less-loader']  // style(css(less('xxx.less')))
      },
      // 加载img
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader'
      },
    ],
  },

  //4.插件
  plugins: [  //放插件的实例对象
    new HtmlPlugin({
      template: 'index.html', // 在执行webpack命令所在目录下查找
      filename: 'index.html', // 在output.path指定的目录下（基础路径）生成放入
      inject: true // 向页面中自动引入打包生成的js/css（默认就是TRUE）
    })
  ]
};