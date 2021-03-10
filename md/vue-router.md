# vue-router原理分析

单页面应用(SPA)的核心之一是:__更新视图而不重新请求页面__

实现这一点主要是两种方式:

1. Hash: 通过改变hash值
2. History: 利用history对象新特性

而在vue-router中，它提供mode参数来决定采用哪一种方式，选择流程如下:默认Hash，如果浏览器支持History新特性改用History，如果不在浏览器环境则使用abstract

选好mode后创建history对象(HashHistory或HTML5History或AbstractHistory)

可见最被青睐的是History模式，理由是: hash--"#"太丑了。。。

 

基本方法分析:

## Hash

1.push()

功能: 设置新的路由添加历史记录并更新视图,常用情况是直接点击切换视图

调用流程:

1 $router.push() //显式调用方法

2 HashHistory.push() //根据hash模式调用,设置hash并添加到浏览器历史记录（window.location.hash= XXX）

3 History.transitionTo() //开始更新

4 History.updateRoute()  //更新路由

5 {app._route= route} 

6 vm.render() //更新视图

 

2.replace

功能: 替换当前路由并更新视图，常用情况是地址栏直接输入新地址

流程与push基本一致

但流程2变为替换当前hash （window.location.replace= XXX）不懂此方法的可见: http://www.w3school.com.cn/jsref/met_loc_replace.asp

 

3.监听地址栏变化

在setupListeners中监听hash变化(window.onhashchange)并调用replace

 

History

1.push

与hash模式类似，只是将window.hash改为history.pushState

2.replace

与hash模式类似，只是将window.replace改为history.replaceState

3.监听地址变化

在HTML5History的构造函数中监听popState（window.onpopstate）

 

两种模式对比

History模式的优点:

1.History模式的地址栏更美观。。。

2.History模式的pushState、replaceState参数中的新URL可为同源的任意URL（可为不同的html文件），而hash只能是同一文档

3.History模式的pushState、replaceState参数中的state可为js对象，能携带更多数据

4.History模式的pushState、replaceState参数中的title能携带字符串数据（当然，部分浏览器，例如firefox不支持title，一般title设为null，不建议使用）

缺点:

对于单页面应用来说，理想的场景是仅仅在进入应用时加载页面（例如index.html）,后续的网络操作靠ajax完成，

而不会重新请求页面。

但当用户直接在用户栏输入地址时则会重新请求，当地址带有参数时两者情况不一样

Hash 例如: xxx.com/#/id=5 HTTP请求不会包含后面的hash值，所以请求的仍然是 xxx.com,没有问题

History 例如:  xxx.com/id=5 这时请求的便是xxx.com/id=5，如后端没有配置对应id=XXX的路由处理，则会返回404错误。

官方推荐的解决办法是在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。同时这么做以后，服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。或者，如果是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。