#!/usr/bin/env node

const path = require('path')
// 1、读取需要打包项目的配置文件
console.log(path.resolve('my.webpack.config.js'))
const config = require(path.resolve('my.webpack.config.js'))
// 2、通过面向对象的方式来进行项目推进
const Compiler = require('../lib/Compiler.js')
new Compiler(config).start()