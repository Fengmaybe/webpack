const merge = require('webpack-merge'); //可以和base一起合并
const baseConfig = require('./webpack.base.conf');

/*
开发环境的配置
 */
module.exports = merge(baseConfig, {  // 开发环境特有的配置
  // 出口
  output: {
    filename: '[name].js'
  },

  // 模块加载器
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // stylus/styl
      {
        test: /\.(stylus|styl)$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      }
    ]
  },
  // 开启开发环境下的: sourceMap调试（打包文件--->源文件）
  devtool: 'cheap-module-eval-source-map',
});

/*

问题1：
在开发环境下，是在内存中打包的，如果用webpack打包命令，在本地就会有。
故用webpack-dev-server代替webpack命令
两个作用：
①内存打包  --config config/webpack.dev.conf.js
②自动打开浏览器  --open

 */