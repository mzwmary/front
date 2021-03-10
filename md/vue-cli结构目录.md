# 结构目录全图

![vue-cli结构目录](../images/vue-cli结构目录.png)

# 文件结构细分

## build——[webpack配置]

build文件主要是webpack的配置，主要启动文件是dev-server.js，当我们输入npm run dev首先启动的就是dev-server.js，它会去检查node及npm版本，加载配置文件，启动服务。

![vue-cli结构目录](../images/build.png)

### build.js

这个配置文件是命令`npm run build` 的入口配置文件，主要用于生产环境

```js
// 写在前面
// 此文件是在node环境中运行的，使用webpack的nodejsAPI实现自定义构建和开发流程的
// ---------------------
// npm和node版本检查，请看我的check-versions配置文件解释文章
require('./check-versions')()

// 设置环境变量为production
process.env.NODE_ENV = 'production'

// ora是一个命令行转圈圈动画插件，好看用的
var ora = require('ora')
// rimraf插件是用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件
var rm = require('rimraf')
// node.js路径模块
var path = require('path')
// chalk插件，用来在命令行中输入不同颜色的文字
var chalk = require('chalk')
// 引入webpack模块使用内置插件和webpack方法
var webpack = require('webpack')
// 引入config下的index.js配置文件，此配置文件我之前介绍了请自行查阅，主要配置的是一些通用的选项
var config = require('../config')
// 下面是生产模式的webpack配置文件，请看我的webpack.prod.conf解释文章
var webpackConfig = require('./webpack.prod.conf')

// 开启转圈圈动画
var spinner = ora('building for production...')
spinner.start()

// 调用rm方法，第一个参数的结果就是 dist/static，表示删除这个路径下面的所有文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
  if (err) throw err
  // 没有错误，就执行webpack编译
  webpack(webpackConfig, function (err, stats) {
    // 这个回调函数是webpack编译过程中执行
    spinner.stop() // 停止转圈圈动画
    if (err) throw err // 如果有错误就抛出错误
    // 没有错误就执行下面的代码，process.stdout.write和console.log类似，输出对象
    process.stdout.write(stats.toString({
      // stats对象中保存着编译过程中的各种消息
      colors: true, // 增加控制台颜色开关
      modules: false, // 不增加内置模块信息
      children: false, // 不增加子级信息
      chunks: false, // 允许较少的输出
      chunkModules: false // 不将内置模块的信息加到包信息
    }) + '\n\n')
    // 以上就是在编译过程中，持续打印消息
    // 下面是编译成功的消息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
// end 
// 注: 如果你想自己编写一个高质量的脚手架工具，建议你: 
// 去补习nodejs，然后补习 es6，然后再来看webpack官方文档，然后自己独立编写一个和vue-cli类似的脚手架，如果上面的东西看不懂，更要这样做
// vue-cli还有一部分内容是关于代码测试的，可以说这块内容的复杂度不亚于webpack，这些内容对nodejs要求比较熟悉，说白了就是基础弱的很难入门，但是测试这块内容也是非常有价值的，可以借助无界面的浏览器解析引擎，通过一句命令就可以把你的代码在不同的平台上运行，还能指出问题所在，所以，我会渐渐的转战nodejs去了，后续的文章将很多是关于nodejs的文章，如果感兴趣的可以关注我的文章，一起学习探讨
```

### check-versions.js

本文件是用来检测node和npm版本的

```js
// 下面的插件是chalk插件，他的作用是在控制台中输出不同的颜色的字，大致这样用chalk.blue('Hello world')，这款插件只能改变命令行中的字体颜色
var chalk = require('chalk')
// 下面这个是semver插件，是用来对特定的版本号做判断的，比如
// semver.gt('1.2.3','9.8.7') false 1.2.3版本比9.8.7版本低
// semver.satisfies('1.2.3','1.x || >=2.5.0 || 5.0.0 - 7.2.3') true 1.2.3的版本符合后面的规则
var semver = require('semver')
// 下面是导入package.json文件,要使用里面的engines选项，要注意require是直接可以导入json文件的，并且requrie返回的就是json对象
var packageConfig = require('../package.json')
// 下面这个插件是shelljs，作用是用来执行Unix系统命令
var shell = require('shelljs')
// 下面涉及了很多Unix命令，这里可能解释的不够详细，第一时间精力有限，第二能力有限。。。
function exec (cmd) {
  //脚本可以通过 child_process 模块新建子进程，从而执行 Unix 系统命令
  //下面这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node', // node版本的信息
    currentVersion: semver.clean(process.version), // 使用semver插件吧版本信息转化成规定格式，也就是 '  =v1.2.3  ' -> '1.2.3' 这种功能
    versionRequirement: packageConfig.engines.node // 这是规定的pakage.json中engines选项的node版本信息 "node":">= 4.0.0"
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
    versionRequirement: packageConfig.engines.npm // 这是规定的pakage.json中engines选项的node版本信息 "npm": ">= 3.0.0"
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
        //上面这个判断就是如果版本号不符合package.json文件中指定的版本号，就执行下面的代码
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
        // 大致意思就是 把当前版本号用红色字体 符合要求的版本号用绿色字体 给用户提示具体合适的版本
      )
    }
  }

if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
    // 提示用户更新版本，具体不解释了，应该能看懂
  }
}
```

### webpack.dev.conf.js---(dev-client.js与dev-server.js)

此配置文件是vue开发环境的wepack相关配置文件

```js
// 引入当前目录中的utils工具配置文件
// 请自行查看我博客中的utils.js的相关文章
var utils = require('./utils')
// 引入webpack来使用webpack内置插件
var webpack = require('webpack')
// 引入config目录中的index.js配置文件
var config = require('../config')
// 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
var merge = require('webpack-merge')
// 引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置
// 请自行查看我博客的相关文章
var baseWebpackConfig = require('./webpack.base.conf')
// 下面是一个自动生成html的插件，能够把资源自动加载到html文件中
// 详情请看 (1)
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 下面这个插件是用来把webpack的错误和日志收集起来，漂亮的展示给用户
// 详情请看 (2)
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// Object.keys(obj) 是取对象的索引，并放在一个数组里面的方法
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    // 下面这个结果就是把webpack.base.conf.js中的入口entry改成如下配置
    // app: ['./build/dev-client','./src/main.js']
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// 下面是合并配置对象，将这个配置文件特有的配置添加替换到base配置文件中
module.exports = merge(baseWebpackConfig, {
    module: {
        // 下面是把utils配置中的处理css类似文件的处理方法拿过来，并且不生成cssMap文件
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    // debtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // DefinePlugin内置webpack插件，专门用来定义全局变量的，下面定义一个全局变量 process.env 并且值是如下
        /*  'process.env': {
                NODE_ENV: '"development"'
            } 这样的形式会被自动转为
            'process.env': '"development"' 
            各位骚年看好了，development如果不加双引号就当做变量处理，程序会报错
        */
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // 下面这个插件HotModuleReplacementPlugin可以说是博大精深没有几个人弄透的，包括我在内，
        // 详情见(3)
        new webpack.HotModuleReplacementPlugin(),
        // 下面这个插件比较简单，就是当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中，你还不知道
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // 下面这个插件介绍过了
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true  -> 设置为true表示把所有的js文件都放在body标签的屁股
        }),
        // 使用FriendlyErrorsPlugin插件，介绍过了，这个插件的其他细节还设置在dev-server-js文件中
        new FriendlyErrorsPlugin()
    ]
})
```
__解释：__

```js
(1)html-webpack-plugin插件是用来生成html文件的，有很灵活的配置项，下面是基本的一些用法
plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html 
    new HtmlWebpackPlugin({  // Also generate a test.html 
      filename: 'test.html', // 生成的文件的名称
      title: 'Custom template', // 文件的标题
      template: 'my-index.ejs' //可以指定模块html文件
    })
]
下面是模板文件my-index.ejs的内容 
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title> //这里使用特殊的表示插入配置项的title
  </head>
  <body>
  </body>
</html>
(2)friendly-errors-webpack-plugin插件，把webpack编译出来的错误展示给我们，方便调试
   安装 npm install friendly-errors-webpack-plugin --save-dev
   基本使用 
   plugins: [
       new FriendlyErrorsWebpackPlugin(),
   ]
   注意点，使用这个插件要遵守下点
       您需要关闭所有的错误日志记录，将webpack配置静默选项设置为true
       也就是遵循以下三点即可
       在使用webpack-dev-middleware插件，关于这个插件的解释在我的dev-sever-js配置文件中有解释，设置以下内容
        app.use(require('webpack-dev-middleware')(compiler, {
            quiet: true, // 必须设置
            publicPath: config.output.publicPath,
        }));
       使用webpack-dev-server时设置如下
       {
           devServer: {
               quiet: true
           }
       }
       使用webpack-hot-middleware中间件，关于这个插件的解释也在我的dev-server-js文章中
        app.use(require('webpack-hot-middleware')(compiler, {
            log: () => {}
        }));
    做到以上几点，就可以正常使用这个插件了，这个插件还有一些配置项，感兴趣自行了解
(3) HotModuleReplacementPlugin解释如下
    老哥们知道什么是webpack模块不
    webpack支持如下模块
        CoffeeScript
        TypeScript
        ESNext (Babel)
        Sass
        Less
        Stylus
    这些模块支持如下导入的方式
        ES2015 import 语句
        CommonJS require() 语句
        AMD define 和 require 语句
        css/sass/less 文件中的 @import 语句。
        样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)
    看到了把，webpack就是这么强大，几乎囊括了前端所有的东西
    这个插件的作用就是当你的程序在运行时，而你现在要替换、添加或删除某个模块，又不想重新加载页面，
    这个插件帮助你实现无刷新加载，关于内部实现原理，其实有点意思，各位请自行查看
```

## config——[vue项目配置]

config文件主要是项目相关配置，我们常用的就是当端口冲突时配置监听端口，打包输出路径及命名等

![vue-cli结构目录](../images/config.png)

### index.js

此配置文件是用来定义开发环境和生产环境中所需要的参数

```js
// see http://vuejs-templates.github.io/webpack for documentation.
// path是node.js的路径模块，用来处理路径统一的问题
var path = require('path')

module.exports = {
    // 下面是build也就是生产编译环境下的一些配置
    build: {
        // 导入prod.env.js配置文件，只要用来指定当前环境，详细见(1)
        env: require('./prod.env'),
        // 下面是相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是dist/index.html
        index: path.resolve(__dirname, '../dist/index.html'),
        // 下面定义的是静态资源的根目录 也就是dist目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 下面定义的是静态资源根目录的子目录static，也就是dist目录下面的static
        assetsSubDirectory: 'static',
        // 下面定义的是静态资源的公开路径，也就是真正的引用路径
        assetsPublicPath: '/',
        // 下面定义是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
        productionGzip: false,
        // 下面定义要压缩哪些类型的文件
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // 下面是用来开启编译完成后的报告，可以通过设置值为true和false来开启或关闭
        // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        // 引入当前目录下的dev.env.js，用来指明开发环境，详见(2)
        env: require('./dev.env'),
        // 下面是dev-server的端口号，可以自行更改
        port: 8080,
        // 下面表示是否自定代开浏览器
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 下面是代理表，作用是用来，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式
        // 详见(3)
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // 是否生成css，map文件，上面这段英文就是说使用这个cssmap可能存在问题，但是按照经验，问题不大，可以使用
        // 给人觉得没必要用这个，css出了问题，直接控制台不就完事了
        cssSourceMap: false
    }
}
```

```js
(1)下面是prod.env.js的配置内容
    module.exports = {
        // 作用很明显，就是导出一个对象，NODE_ENV是一个环境变量，指定production环境
        NODE_ENV: '"production"'
    }
(2)下面是dev.env.js的配置内容
    // 首先引入的是webpack的merge插件，该插件是用来合并对象，也就是配置文件用的，相同的选项会被覆盖，至于这里为什么多次一举，可能另有他图吧
    var merge = require('webpack-merge')
    // 导入prod.env.js配置文件
    var prodEnv = require('./prod.env')
    // 将两个配置对象合并，最终结果是 NODE_ENV: '"development"'
    module.exports = merge(prodEnv, {
        NODE_ENV: '"development"'
    })
(3)下面是proxyTable的一般用法
    vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
    proxyTable: {
        '/list': {
            target: 'http://api.xxxxxxxx.com', -> 目标url地址
            changeOrigin: true, -> 指示是否跨域
            pathRewrite: {
            '^/list': '/list' -> 可以使用 /list 等价于 api.xxxxxxxx.com/list
            }
        }
    }
```

## node_modules——[依赖包]

node_modules里面是项目依赖包，其中包括很多基础依赖，自己也可以根据需要安装其他依赖。安装方法为打开cmd，进入项目目录，输入npm install [依赖包名称],回车。

在两种情况下我们会自己去安装依赖：

（1）项目运行缺少该依赖包：例如项目加载外部css会用到的css-loader，路由跳转vue-loader等（安装方法示例：npm install css-loader）

（2）安装插件：如vux（基于WEUI的移动端组件库），vue-swiper（轮播插件

注：有时会安装指定依赖版本，需在依赖包名称后加上版本号信息，如安装11.1.4版本的vue-loader，输入npm install vue-loader@11.1.4

## src——[项目核心文件]

项目核心文件前面已经进行了简单的说明，接下来重点讲解main.js，App.vue,及router的index.js

### index.html——[主页]

index.html如其他html一样，但一般只定义一个空的根节点，在main.js里面定义的实例将挂载在根节点下，内容都通过vue组件来填充

![vue-cli结构目录](../images/index.png)

### App.vue——[根组件]

一个vue页面通常由三部分组成:模板(template)、js(script)、样式(style)

![vue-cli结构目录](../images/App.png)

#### 【template】

其中模板只能包含一个父节点，也就是说顶层的div只能有一个（例如下图，父节点为#app的div，其没有兄弟节点）

<router-view></router-view>是子路由视图，后面的路由页面都显示在此处

打一个比喻吧,<router-view>类似于一个插槽，跳转某个路由时，该路由下的页面就插在这个插槽中渲染显示

#### 【script】

vue通常用es6来写，用export default导出，其下面可以包含数据data，生命周期(mounted等)，方法(methods)等，具体语法请看vue.js文档，在后面我也会通过例子来说明。

#### 【style】

样式通过style标签<style></style>包裹，默认是影响全局的，如需定义作用域只在该组件下起作用，需在标签上加scoped，<style scoped></style>

如要引入外部css文件，首先需给项目安装css-loader依赖包，打开cmd，进入项目目录，输入npm install css-loader,回车。安装完成后，就可以在style标签下import所需的css文件，例如：

