const path = require('path')
const fs = require('fs')
// 解析语法,抽象语法树
// https://astexplorer.net 抽象语法树的资源管理器
const parser = require('@babel/parser') //将代码转成抽象语法树
const traverse = require('@babel/traverse').default //es6导出的 处理抽象语法树数据
const generator = require('@babel/generator').default //将抽象语法树转成代码
const ejs = require('ejs')
const { SyncHook } = require('tapable')

class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    // __dirname 当前文件所在目录
    // 运行时项目所在路径
    this.root = process.cwd()
    // 存放所有模块
    this.modules = {}
    // 存放所有loader
    this.rules = config.module.rules
    // Compiler构造函数内部定义钩子
    this.hooks = {
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      emit: new SyncHook(),
      afterEmit: new SyncHook(),
      done: new SyncHook()
    }
    if (Array.isArray(this.config.plugins)) {
      this.config.plugins.forEach(plugin => plugin.apply(this))
    }
  }
  start() {
    this.hooks.compile.call()
    this.depAnalyse(path.resolve(this.root, this.entry))
    this.emitFile()
    this.hooks.afterCompile.call()
    this.hooks.emit.call()
    this.hooks.afterEmit.call()
    this.hooks.done.call()
  }
  getSource(path) {
    return fs.readFileSync(path, 'utf-8')
  }
  depAnalyse(modulePath) {
    let source = this.getSource(modulePath)
    // console.log(modulePath)
    // 读取loader
    let readAddCallloader = (use, obj) => {
      let loaderPath = path.resolve(this.root, use)
      let loader = require(loaderPath)
      source = loader.call(obj, source)
      // console.log(use)
    }

    // 读取rules规则,倒序遍历
    for (let i = this.rules.length - 1; i >= 0; i--) {
      let {test,use} = this.rules[i]
      if (test.test(modulePath)) {
        if (typeof use === 'string') {
          readAddCallloader(use)
        } else if (Array.isArray(use)) {
          for (let j = use.length - 1; j >= 0; j--) {
            readAddCallloader(use[j])
          }
        } else if (use instanceof Object) {
          readAddCallloader(use.loader, {
            query: use.options.name
          })
        }
      }
    }

    // 抽象语法树处理代码
    const ast = parser.parse(source)
    const dependencies = [] // 存储模块所有依赖项
    traverse(ast, {
      CallExpression(p) {
        if (p.node.callee.name == 'require') {
          // 修改require 用__webpack_require__代替
          p.node.callee.name = '__webpack_require__'
          // 修改路径 replace处理window反斜杠问题
          p.node.arguments[0].value = ('./' + path.join('view/', p.node.arguments[0].value)).replace(/\\+/g, '/')
          dependencies.push(p.node.arguments[0].value)
        }
      }
    })
    let sourceCode = generator(ast).code

    //构建modules对象
    let modulePathRelative = './' + path.relative(this.root, modulePath) // 求相对路径
    modulePathRelative = modulePathRelative.replace(/\\+/g, '/')
    this.modules[modulePathRelative] = sourceCode

    //递归加载所有依赖
    dependencies.forEach(dep => this.depAnalyse(path.resolve(this.root, dep)))
  }
  emitFile() {
    // 使用模板进行拼接字符串,生成最终的结果代码
    let template = this.getSource(path.join(__dirname, '../template/output.ejs'))
    let result = ejs.render(template, {
      entry: this.entry,
      modules: this.modules
    })
    let outputPath = path.join(this.config.output.path, this.config.output.filename)
    fs.writeFileSync(outputPath, result)
  }
}

module.exports = Compiler