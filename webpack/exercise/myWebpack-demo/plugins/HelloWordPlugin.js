// 1、一个 JavaScript 命名函数。
// 2、在插件函数的 prototype 上定义一个 apply 方法。
// 3、指定一个绑定到 webpack 自身的事件钩子。
// 4、处理 webpack 内部实例的特定数据。
// 5、功能完成后调用 webpack 提供的回调。
module.exports =  class HelloWordPlugin{
  apply(compiler) {
    // 通过compiler对象可以注册对应的事件
    compiler.hooks.emit.tap('HelloWordPlugin', (compilation) => {
      console.log('compilation')
    })
    // compiler.hooks.emit.tapAsync('HelloWordPlugin', (compilation,callback) => {
    //   console.log(compilation)
    // })
    compiler.hooks.done.tap('HelloWordPlugin', (stats) => {
      console.log('stats')
    })
  }
}