const fs = require('fs')
const cheerio = require('cheerio')
module.exports = class HTMLPlugin{
  constructor(options) {
    this.options = options
  }
  apply(Compiler) {
    //1、编写一个自定义插件，注册afterEmit钩子
    Compiler.hooks.afterEmit.tap('HTMLPlugin', compilation => {
      // 2、根据创建对象时传入的template属性来读取html模板
      let result = fs.readFileSync(this.options.template, 'utf-8')
      // 3、使用工具分析HTML，推荐使用cheerio，可以直接使用jQuery api
      let $ = cheerio.load(result)
      // console.log(...Object.keys(compilation.assets))
      // 4、循环遍历webpack打包的资源文件列表，如果有多个bundle就都打包进去（可以根据需求自己修改，因为可能有chunk，一般只引入第一个即可）
      Object.keys(compilation.assets).forEach(item => {
        $(`<script src="${item}"></script>`).appendTo('body')
      })
      // console.log($.html())
      // 5、输出新生成的HTML字符串到dist目录中
      fs.writeFileSync('./dist/'+this.options.filename,$.html())
    })
  }
}