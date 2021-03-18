const path = require('path')
const fs = require('fs')
// 解析语法,抽象语法树
// https://astexplorer.net 抽象语法树的资源管理器
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')


class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    // 运行时项目所在路径
    // __dirname 当前文件所在目录
    this.root = process.cwd()
  }
  start() {
    console.log('开始打包了')
    // 依赖分析
    this.depAnalyse()
  }
  getSource(path) {
    return fs.readFileSync(path, 'utf-8')
  }
  depAnalyse() {
    const source = this.getSource(this.entry)
    const ast = parser.parse(source)
    new traverse.default(ast, {
      enter(p) {
        console.log(p)
      }
    })
  }
}

module.exports = Compiler