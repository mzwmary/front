# 安装

## 独立版本

```
利用<script type="text/javascript"></script>>引入
```

## 使用CDN方法

1. BootCDN（国内）:<https://cdn.bootcss.com/vue/2.2.2/vue.min.js>
2. unpkg：<https://unpkg.com/vue/dist/vue.js>会保持和npm发布的最新的版本一致。
3. cdnjs : <https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js>

## NPM方法

最新稳定版：

```js
$ cnpm install vue
```

## 命令行工具 (CLI)

```js
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm run dev
```

## 对不同构建版本的解释

在 NPM 包的 dist/ 目录你将会找到很多不同的 Vue.js 构建版本。这里列出了它们之间的差别：

||UMD |CommonJS  |ES Module|
|---|---|---|
|完整版 |vue.js | vue.common.js| vue.esm.js|
|只包含运行时版 |vue.runtime.js | vue.runtime.common.js| vue.runtime.esm.js|
|完整版 (生产环境)|  vue.min.js| ---| ---|
|只包含运行时版 (生产环境) | vue.runtime.min.js  |--- |--- |

# 介绍

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

+ Vue 其实就是一个高级版的 模板引擎
+ 可以不用像之前那样将模板字符串放到script 标签中
+ Vue 支持将 Dom 元素直接作为自己的模板
  - 所以在使用的时候需要 new Vue 实例，然后通过 el 选择指定自己要管理的节点模板
  - 这些选项有很多，例如：data el methods
     - 其中 el 选项用来指定被管理的 Dom 模板入口 （不能是 body html）
     - data 用来 初始化视图 需要的 模型数据 
       - （将视图需要的 响应数据显示的 初始化到 data 中,非函数的普通函数 ，不声明 不能用）
       -  如果在 实例创建之后 添加 新的属性 到实例上，它不会触发 视图更新
     - methods 用来定义一些 和 视图交互的 行为方法

+ 每个 Vue 实例都代理其内部的 data
+ let 和 const 定义的成员 不能通过 window 来访问
+ Vue 实例 可以有多个 （自定义指令）

# 全局配置

# 全局 API

## Vue.extend

# 选项 / 数据

## data

1. 类型：Object | Function
2. 限制：组件的定义只接受 function。
3. 详细：
  - Vue 实例的数据对象。
  - Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。
  - 对象必须是纯粹的对象 (含有零个或多个的 key/value 对)：浏览器 API 创建的原生对象，原型上的属性会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。
  - 一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
  - 实例创建之后，可以通过 vm.$data 访问原始数据对象。Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。
  - 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。
  - 当一个组件被定义，data必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用data函数，从而返回初始数据的一个全新副本数据对象。
  - 可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。
4. 示例：

  ```js
  var data = { a: 1 }

  // 直接创建一个实例
  var vm = new Vue({
    data: data
  })
  vm.a // => 1
  vm.$data === data // => true

  // Vue.extend() 中 data 必须是函数
  var Component = Vue.extend({
    data: function () {
      return { a: 1 }
    }
  })
  ```

# Vue 实例

## 创建一个 Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：

```js
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

## 数据与方法

当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的属性
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置属性也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时 data 中存在的属性才是响应式的。也就是说如果你添加一个新的属性，比如：

```js
vm.b = 'hi'
```

那么对 b 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

这里唯一的例外是使用__Object.freeze()__，这会阻止修改现有的属性，也意味着响应系统无法再_追踪_变化。

```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。例如：

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

## 实例生命周期钩子

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 created 钩子可以用来在一个实例被创建之后执行代码：

```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 mounted、updated 和 destroyed。生命周期钩子的 this 上下文指向调用它的 Vue 实例。

__注意：__

```
不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
```

## 生命周期图示

![生命周期图示](../images/lifecycle.png)

# 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。

## 插值

### 文本

数据绑定最常见的形式就是使用__“Mustache”语法 (双大括号)__ 的文本插值：

```html
<span>Message: {{ msg }}</span>
```

通过使用__ v-once __指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```js
<span v-once>这个将不会改变: {{ msg }}</span>
```

### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

这个 span 的内容将会被替换成为属性值 rawHtml，直接作为 HTML——会忽略解析属性值中的数据绑定。注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

__注意：__

你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

### 特性

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令：

```html
<div v-bind:id="dynamicId"></div>
```

在布尔特性的情况下，它们的存在即暗示为 true，v-bind 工作起来略有不同，在这个例子中：

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled 特性甚至不会被包含在渲染出来的 `<button>` 元素中。

### 使用 JavaScript 表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

__注意：__

模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

## 指令

指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。例如：

```html
<p v-if="seen">现在你看到我了</p>
```

这里，v-if 指令将根据表达式 seen 的值的真假来插入/移除 `<p>` 元素。

### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 特性：

```html
<a v-bind:href="url">...</a>
```

在这里 href 是参数，告知 v-bind 指令将该元素的 href 特性与表达式 url 的值绑定。

另一个例子是 v-on 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">...</a>
```

在这里参数是监听的事件名。我们也会更详细地讨论事件处理。

### 修饰符

修饰符 (Modifiers) 是以半角句号. 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

在接下来对 v-on 和 v-for 等功能的探索中，你会看到修饰符的其它例子。

## 缩写

v- 前缀作为一种视觉提示，用来识别模板中 Vue 特定的特性。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，v- 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue.js 管理所有模板的单页面应用程序 (SPA - single page application) 时，v- 前缀也变得没那么重要了。因此，Vue.js 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

### v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

### v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

它们看起来可能与普通的 HTML 略有不同，但 : 与 @ 对于特性名来说都是合法字符，在所有支持 Vue.js 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。

## 指令 API

### v-text

1. 预期：string
2. 详细：更新元素的 textContent。如果要更新部分的 textContent ，需要使用 {{ Mustache }} 插值。
3. 示例：

  ```html
  <span v-text="msg"></span>
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

### v-html

1. 预期：string
2. 详细：
  - 更新元素的innerHTML。
  - __注意：内容按普通 HTML 插入__ - __不会作为 Vue 模板进行编译__。
  - 如果试图使用v-html组合模板，可以重新考虑是否通过使用组件来替代。
3. __注意：__
  - 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。
  - 在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 v-html 的内容设置带作用域的 CSS，你可以替换为 CSS Modules 或用一个额外的全局 `<style>` 元素手动设置类似 BEM 的作用域策略。
4. 示例：

  ```html
  <div v-html="html"></div>
  ```

### v-show

1. 预期：any
2. 用法：
  - 根据表达式之真假值，切换元素的 display CSS 属性。
  - 当条件变化时该指令触发过渡效果。

### v-if

1. 预期：any
2. 用法：
  - 根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。
  - 如果元素是 `<template>` ，将提出它的内容作为条件块。
  - 当条件变化时该指令触发过渡效果。
  - 当和 v-if 一起使用时，v-for 的优先级比 v-if 更高。

### v-else

1. 不需要表达式
2. 限制：前一兄弟元素必须有 v-if 或 v-else-if。
3. 用法：为 v-if 或者 v-else-if 添加“else 块”。

  ```html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

### v-else-if

1. 2.1.0 新增
2. 类型：any
3. 限制：前一兄弟元素必须有 v-if 或 v-else-if。
4. 用法：表示 v-if 的 “else if 块”。可以链式调用。

  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

### v-for

1. 预期：Array | Object | number | string
2. 用法：
  - 基于源数据多次渲染元素或模板块。
  - 此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名：

    ```html
    <div v-for="item in items">
      {{ item.text }}
    </div>
    ```

  - 另外也可以为数组索引指定别名 (或者用于对象的键)：

    ```html
    <div v-for="(item, index) in items"></div>
    <div v-for="(val, key) in object"></div>
    <div v-for="(val, key, index) in object"></div>
    ```

  - v-for默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个 key 的特殊属性：

    ```html
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
    ```

### v-on

1. 缩写：@
2. 预期：Function | Inline Statement | Object
3. 参数：event
4. 修饰符：

  ```
  .stop - 调用 event.stopPropagation()。
  .prevent - 调用 event.preventDefault()。
  .capture - 添加事件侦听器时使用 capture 模式。
  .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  .native - 监听组件根元素的原生事件。
  .once - 只触发一次回调。
  .left - (2.2.0) 只当点击鼠标左键时触发。
  .right - (2.2.0) 只当点击鼠标右键时触发。
  .middle - (2.2.0) 只当点击鼠标中键时触发。
  .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
  ```

5. 用法：

  - 绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。
  - 用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
  - 在监听原生DOM事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event 属性：`v-on:click="handle('ok', $event)"`。
  - 从 2.4.0 开始，v-on 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

6. 示例：

  ```html
  <!-- 方法处理器 -->
  <button v-on:click="doThis"></button>

  <!-- 内联语句 -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- 缩写 -->
  <button @click="doThis"></button>

  <!-- 停止冒泡 -->
  <button @click.stop="doThis"></button>

  <!-- 阻止默认行为 -->
  <button @click.prevent="doThis"></button>

  <!-- 阻止默认行为，没有表达式 -->
  <form @submit.prevent></form>

  <!--  串联修饰符 -->
  <button @click.stop.prevent="doThis"></button>

  <!-- 键修饰符，键别名 -->
  <input @keyup.enter="onEnter">

  <!-- 键修饰符，键代码 -->
  <input @keyup.13="onEnter">

  <!-- 点击回调只会触发一次 -->
  <button v-on:click.once="doThis"></button>

  <!-- 对象语法 (2.4.0+) -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

  ```html
  <my-component @my-event="handleThis"></my-component>

  <!-- 内联语句 -->
  <my-component @my-event="handleThis(123, $event)"></my-component>

  <!-- 组件中的原生事件 -->
  <my-component @click.native="onClick"></my-component>
  ```

### v-bind

1. 缩写：:
2. 预期：`any (with argument) | Object (without argument)`
3. 参数：attrOrProp (optional)
4. 修饰符：

  ```
  .prop - 被用于绑定 DOM 属性 (property)。(差别在哪里？)
  .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
  .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
  ```

5. 用法：

  - 动态地绑定一个或多个特性，或一个组件 prop 到表达式。
  - 在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。
  - 在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。
  - 没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。

6. 示例：

  ```html
  <!-- 绑定一个属性 -->
  <img v-bind:src="imageSrc">

  <!-- 缩写 -->
  <img :src="imageSrc">

  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName">

  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">

  <!-- style 绑定 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- 绑定一个有属性的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- 通过 prop 修饰符绑定 DOM 属性 -->
  <div v-bind:text-content.prop="text"></div>

  <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
  <my-component :prop="someThing"></my-component>

  <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
  <child-component v-bind="$props"></child-component>

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  .camel 修饰符允许在使用 DOM 模板时将 v-bind 属性名称驼峰化，例如 SVG 的 viewBox 属性：
  
  ```html
  <svg :view-box.camel="viewBox"></svg>
  ```

  在使用字符串模板或通过 vue-loader/vueify 编译时，无需使用 .camel。

### v-model

1. 预期：随表单控件类型不同而不同。
2. 限制：
  
  ```html
  <input>
  <select>
  <textarea>
  components
  ```

3. 修饰符：

  ```html
  .lazy - 取代 input 监听 change 事件
  .number - 输入字符串转为数字
  .trim - 输入首尾空格过滤
  ```

4. 用法：在表单控件或者组件上创建双向绑定。

### v-pre

1. 不需要表达式
2. 用法：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
3. 示例：

  ```html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

### v-cloak

1. 不需要表达式
2. 用法：这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
3. 示例：

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  不会显示，直到编译结束。

### v-once

1. 不需要表达式

2. 详细：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```html
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

