const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

/*
得到指定目录的绝对路径
 */
function resolve(dir) {
  //__dirname是node自带的，其是指当前文件所在目录，故要退出一层。找到demo3的绝对路径。
  return path.resolve(__dirname, '..', dir);
}
/*
 webpack基础配置
 */
module.exports = {
  // 1. 入口
  entry: {
    app: './src/index.js'  // 指定入口js的相对路径(相对路径--相对于webpack命令的绝对路径)
    // other: './src/other.js'  名称：入口js
  },
  // 2. 出口（在base只配置path基础路径，在dev或prod中配置文件名）
  output: {
    path: resolve('dist'),  // 所有打包文件的基础路径
  },
  // 3. 模块加载器
  module: {
    rules: [
      // eslint语法检查
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',  //表示执行的实际比较早
        include: [resolve('src')],  //减少搜索范围提高效率
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // js: es6-->es5
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]  //优化，在指定的范围下搜索
      },
      // img
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',  // 包装扩展file-loader，使之可以使用base64
        options: {
          limit: 1024*40, // 进行图片base64编码处理的文件最大值
          name: 'static/img/[name].[hash:8].[ext]' // 生成的文件路径和文件名
        }
      }
    ]
  },

  // 4. 插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html',   // 在执行webpack命令所在目录查找
      filename: 'index.html',  // 在output.path指定的输出目录中生成
      inject: true    // 向页面中自动引入打包生成的js/css（默认TRUE）
    })
  ]
};

/*
问题总结：hash
[hash:8] 用在base64图片 MD5加密会生成32位的，可以截取hash：8
chunkhash 用在JS上
contenthash  用在CSS上
作用都是一样的
利用缓存和防止缓存
以图片hash：8为例
场景1：图片文件的内容没变，名字当然也没变。重新dev内存打包时，生成的名字也不会变-->浏览器就可以利用缓存
场景2：图片文件的内容不一样，但名字却一样了。如果这个时候不用hash：8来处理的话，
打包出来的文件就名字一样了，浏览器就会利用缓存读取错误的图片文件--->防止浏览器缓存
 */