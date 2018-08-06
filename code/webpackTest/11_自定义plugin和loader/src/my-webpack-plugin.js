// 命名函数
function MyExampleWebpackPlugin(options) {

};

// 在它的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function (compiler) {
  console.log('apply()')
  // 指定挂载的webpack事件钩子。
  compiler.plugin('done', (compilation) => { /* compilation: 处理webpack内部实例的特定数据。*/
    console.log("This is an example plugin!!!");
  });

  // 设置回调来访问编译对象：
  compiler.plugin("compilation", function (compilation) {

    // 现在设置回调来访问编译中的步骤：
    compilation.plugin("optimize", function () {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = MyExampleWebpackPlugin
/*
区别compiler与compilation
compiler: 代表了完整的 webpack 环境配置
compilation: 代表了一次单一的版本构建和生成资源
 */