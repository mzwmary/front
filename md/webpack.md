# 安装webpack

## 全局安装

```
npm install webpack -g
```

## 本地项目安装

1.将 webpack 安装到本地项目 

```
npm install webpack -D
```

2.在 package.json 中配置 script 字段

```
"scripts":{
    'build':"webpack --watch src/main.js dist/bundle.js"
}
```

# 打包

## js打包

```
webpack src/main.js dist/bundle.js
```

- 告诉 webpack 以 src/main.js 为入口，从该文件开始，将所有的依赖项都打包到 dist/bundle.js

- 如果 dist/bundle.js 文件不存在 则会自动新建，如果已经存在则覆盖。


## css打包

### 安装css-loader 、style-loader

```
npm install css-loader style-loader
```

- Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

- css-loader 会遍历 CSS 文件，然后找到 url() 表达式然后处理他们。

- style-loader 会把原来的 CSS 代码插入页面中的一个个 style 标签中。

### 将css文件引入mian.js入口文件

#### 方法一：

第一步：引入

```
require("!style-loader!css-loader!./style.css");
```

- require CSS 文件的时候都要写 loader 前缀 !style-loader!css-loader!。

第二步：打包

```
webpack main.js dist/bundle.js
```

#### 方法二：

- 根据模块类型（扩展名）来自动绑定需要的 loader。

第一步：引入

```
require("./style.css")
```

第二步：打包

```
webpack src/main.js dist/bundle.js --module-bind 'css=style-loader!css-loader'
```
 
# webpack.config.js 文件配置

```js
module.exports = {
    entry: "./src/main.js",  // 指定打包入口
    output: {
        path: __dirname,  // 打包出口 （可省略）
        filename: "./dist/bundle.js"  // 打包出楼文件 （可连路径一起写）
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
```

运行

```
webpack
```

# 开发环境

## 第一种： 

当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。

```
webpack --progress --colors
```

## 第二种： 

如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。

```
webpack --progress --colors --watch
```

## 第三种： 

使用 webpack-dev-server 开发服务，这样我们就能通过 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。

- 第一步： 安装

```
npm install webpack-dev-server -D
```

- 第二步：运行

```
webpack-dev-server --progress --colors
```

# package.json 文件配置 

2. 将 package.json 文件中的 scripts 改为：

```js
"scripts":{
    'build':"webpack"
},
```
3. 打包构建

```js
$ npm run build
```

4. 加入自动监听打包

```js
"scripts":{
    'build':"webpack", // 单词构建
    'watch':"webpack --watch" // 自动监听构建
 }, 

```

# webpack 支持 AMD CommonJS EcmaScript 6 Module （官方推荐）等模块化规范

     模块 就是 导入 和 导出 export  import

```js
Commonjs 
module.exports = function(){}
// 加载文件 可以 省略后缀名 .js .node .json
const foo = require('./foo')

exports === module.exports 
```

```js
ES6
export defalt function(){}

import foo from './foo'

方法二 
// 将模块 a 和 b 导出
export const a = 'aa'
export const b = 'bb'

// 简写
const foo = 'bar';
export {
    foo
}

//  加载 a b 的 数据
// 在模块加载的解构赋值中，可以通过 as 起别名
import {a as c,b} from './foo'

// 一次性 加载所有 export 导出的成员
improt * as fooModule from './foo'


```
`$ webpack --watch src/main.js dist/bundle.js 实时监听打包`


## 加载的方式
1. import 变量名称 from ‘模块路径’ ，只加载 export default的成员
2. import { 模块导出接口成员名， 模块导出接口成员名  as 别名} from ‘模块路径’， 按需加载 非 defalt 成员
3. import * 别名 from ‘模块路径’ 一次性加载所有,export default  会提供一个 default 

## 导出的方式
1. export let|var|const|function 成员名 = 值， 支持 解构赋值的方式 按需加载
     // export 必须有模块内部的变量引用
2. export default  任意成员   （只能有一次 ，否则报错）
3. export { 内部成员名 【，内部成员名 】} 一次性统一导出内部成员









