/*
生产环境的配置
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.conf');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}
//注意本身webpack就是基于commonJS模块化来定义的！
module.exports = merge(baseConfig, {   // 合并配置  // 开发环境特有的配置
  // 入口
  entry: {
    // 指定第三方模块包含哪些，只有指定了才可以分开打包js
    vendor: ["jquery"]
  },

  // 出口
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/' // 所有引用的虚拟路径前都添加上此值，不然会出现图片路径的重叠
  },

  // 模块加载器
  module: {
    rules: [
      // 加载css（在生产环境下就要对CSS单独打包了抽取出来，且这时并不需要style-loader因为不需要插入style标签，直接在HTML中引入）
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 抽取css，需要用到扩展的插件
          use: 'css-loader'
        })
      },
      // stylus/styl
      {
        test: /\.(stylus|styl)$/,
        use: ExtractTextPlugin.extract({ // 抽取css  extract就是提取的意思
          use: ['css-loader', 'stylus-loader'],
        })
      },
    ]
  },
  // 插件
  plugins: [
    // 清理dist文件夹
    new CleanPlugin(['dist'], {
      root: resolve('')  //在deme3根目录下去找到dist清理
    }),
    // 抽取所有css到指定文件
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // 第三方包模块单独打包，与上面的入口指定相对应
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    // 压缩css
    new OptimizeCssPlugin(),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin() // 将模块的hash值作为模块的id
  ],

  // 开启sourceMap(最后应该去除)
  devtool: 'source-map'
});

/*
问题：
问题场景：当我们在build的时候我们会分别打包成CSS js 第三方的 webpack自身的等等文件
但是呢，按正常的需求，我只改动了自己写的代码，那么第三方不应该文件名会变化
但是变化了。在重新打包的时候变化了。

文件名hash最终由内容和id来决定
这个id是谁呢？默认是数组的下标。我们在build的时候就会有【0】【1】··顺序
解决办法：将内容的md5值作为id即可。

原来啊。内部是默认将数组下标作为id的。他在从入口js递归去搜索所有文件的时候
是【app.js,模块2，模块3···】他们的模块下标分别是0  1  2
那么我在修改自身代码的时候，做了一个特别的动作，那就是增减一个模块。
这个时候模块的顺序就会发生变化，模块的索引下标就会发现问题。就会重新打包生成新的打包文件，文件名就会变化。

解决：
 new webpack.HashedModuleIdsPlugin() // 将模块的hash值作为模块的id

 */