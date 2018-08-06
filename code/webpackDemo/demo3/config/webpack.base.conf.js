const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

/*
得到指定目录的绝对路径
 */
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

/*
webpack基础配置
 */
module.exports = {
  // 1. 入口
  entry: {
    app: './src/index.js'  // 指定入口js的相对路径
  },
  // 2. 出口
  output: {
    path: resolve('dist'),
  },

  // 3. 模块加载器
  module: {
    rules: [
      // eslint语法检查
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      // js: es6-->es5
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // img
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',  // 包装扩展file-loader
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
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}