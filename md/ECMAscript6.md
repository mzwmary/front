# ECMAscript 6

## let 和 const 命令

### let 命令

#### 基本用法

__let作用域：__

用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.//只在代码块内有效
b // 1
```

__let与for循环：__

```js
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
// 代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。
```

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

__for循环的两个作用域：__

1. JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
2. 设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
// 这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
```

#### 不存在变量提升

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;
// var 有变量提升现象，即变量可以在声明之前使用，值为undefined。

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
// let 必须先声明，再使用。
```

#### 暂时性死区

1. ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。相当于它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

  ```js
  var tmp = 123;

  if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
  }
  ```

2. 如果区块中使用let和const声明变量,凡是在声明之前就使用这些变量，就会报错。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

  ```js
  if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
  }
  ```

3. 易错点：
  
  __typeof:__

  ```js
  typeof x; // ReferenceError // 使用时未声明
  let x;
  ```

  __隐蔽性死区：__

  ```js
  function bar(x = y, y = 2) {// x = y 时，y未声明
    return [x, y];
  }

  bar(); // 报错

  // 不报错的写法：
  function bar(x = 2, y = x) {
    return [x, y];
  }
  bar(); // [2, 2]
  ```

#### 不允许重复声明

1. let不允许在相同作用域内，重复声明同一个变量。

  ```js
  // 报错
  function func() {
    let a = 10;
    var a = 1;
  }

  // 报错
  function func() {
    let a = 10;
    let a = 1;
  }
  ```

2. 不能在函数内部重新声明参数

  ```js
  function func(arg) {
    let arg; // 报错
  }

  function func(arg) {
    {
      let arg; // 不报错
    }
  }
  ```

### 块级作用域

#### ES6 的块级作用域

1. ES5 只有全局作用域和函数作用域，没有块级作用域。
2. ES6 中 let 实际上为javascript增加块级作用域。

  ```js
  function f1() {
    let n = 5;
    if (true) {
      let n = 10;
    }
    console.log(n); // 5
  }
  ```

3. ES6 允许块级作用域的任意嵌套。

  ```js
  {{{{{let insane = 'Hello World'}}}}}
  ```

#### 块级作用域与函数声明

##### ES5规则

函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```js
// 在ES5中是非法状况-------

// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}

//但是，浏览器为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。
```

##### ES6规则

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

```js
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

// ES5-----得出  I am inside
// 实际运行如下：
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); } // 函数提升
  if (false) {
  }

  f();
}());

// ES6-----理论应该是 I am outside
// 但是对老代码运行规则有很大影响。
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    function f() { console.log('I am inside!'); } // 相当于 let
  }

  f();
}());
```

##### ES6 浏览器

__于是，ES6再附录B里面规定，浏览器可以有自己的行为方式：__

1. 允许在块级作用域内声明函数。
2. 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
3. 同时，函数声明还会提升到所在的块级作用域的头部。
4. 上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。

```js
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

__解决办法：__避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
// 函数声明语句
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

__注意：__ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

### const 命令

#### 基本用法

1. const声明一个只读的常量。一旦声明，常量的值就不能改变。

  ```js
  const PI = 3.1415;
  PI // 3.1415

  PI = 3;
  // TypeError: Assignment to constant variable.
  ```

2. const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
  
  ```js
  const foo;
  // SyntaxError: Missing initializer in const declaration
  ```

3. const的作用域与let命令相同：只在声明所在的块级作用域内有效。

  ```js
  if (true) {
    const MAX = 5;
  }

  MAX // Uncaught ReferenceError: MAX is not defined
  ```

4. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

  ```js
  if (true) {
    console.log(MAX); // ReferenceError
    const MAX = 5;
  }
  ```

5. const声明的常量，也与let一样不可重复声明。

  ```js
  var message = "Hello!";
  let age = 25;

  // 以下两行都会报错
  const message = "Goodbye!";
  const age = 30;
  ```

#### 本质

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

#### 对象冻结

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

__对象的属性冻结(对象彻底冻结):__

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

### 顶层对象的属性

1. 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。
2. ES5 之中，顶层对象的属性与全局变量是等价的。
3. ES6 之中，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

### global 对象

__1. ES5 的顶层对象：__

  1. 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
  2. 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
  3. Node 里面，顶层对象是global，但其他环境都不支持。

__2. 利用this获取全局对象，局限性：__

  1. 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
  2. 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
  3. 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。

__3. 解决办法：__

  ```js
  // 方法一
  (typeof window !== 'undefined'
     ? window
     : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
       ? global
       : this);

  // 方法二
  var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };
  ```

__4. 提案(还只是个提案可以不看)：__

  在语言标准的层面，引入global作为顶层对象。也就是说，在所有环境下，global都是存在的，都可以从它拿到顶层对象。

  垫片库system.global模拟了这个提案，可以在所有环境拿到global。

  ```js
  //可以保证各种环境里面，global对象都是存在的。

  // CommonJS 的写法
  require('system.global/shim')();

  // ES6 模块的写法
  import shim from 'system.global/shim'; shim();
  ```

  ```js
  //将顶层对象放入变量global。

  // CommonJS 的写法
  var global = require('system.global')();

  // ES6 模块的写法
  import getGlobal from 'system.global';
  const global = getGlobal();
  ```

## 变量的解构赋值

### 基本用法

解构：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

__1. 变量赋值：__

  ```js
  let a = 1;
  let b = 2;
  let c = 3;
  ```

__2. ES6 变量赋值：__

  本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

    ```js
    // 从数组中提取值，按照对应位置，对变量赋值。

    let [a, b, c] = [1, 2, 3];
    ```

  ```js
  let [foo, [[bar], baz]] = [1, [[2], 3]];
  foo // 1
  bar // 2
  baz // 3

  let [ , , third] = ["foo", "bar", "baz"];
  third // "baz"

  let [x, , y] = [1, 2, 3];
  x // 1
  y // 3

  let [head, ...tail] = [1, 2, 3, 4]; // 这个比较特别哦！！！
  head // 1
  tail // [2, 3, 4]

  let [x, y, ...z] = ['a'];
  x // "a"
  y // undefined
  z // []
  ```

  - 解构不成功，变量的值就等于undefined。

    ```js
    let [foo] = [];
    let [bar, foo] = [1];
    ```    

  - 不完全解构

    ```js
    let [x, y] = [1, 2, 3];
    x // 1
    y // 2

    let [a, [b], d] = [1, [2, 3], 4];
    a // 1
    b // 2
    d // 4
    ```

### 数组的解构赋值
### 对象的解构赋值
### 字符串的解构赋值
### 数值和布尔值的解构赋值
### 函数参数的解构赋值
### 圆括号问题
### 用途

## 函数扩展

### 函数参数的默认值

#### 基本用法：

__普通用法：__

```js
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World //此行意在将y值设为 's' ,但失败
```

缺点：如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用。
解决办法：加一个判断语句。

```js
if (typeof y === 'undefined') {
  y = 'World';
}
```

__ECMAscript 6：__

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

优点:1. 可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；2. 有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

__注意点:__

1. 参数变量是默认声明的，所以不能用let或const再次声明。

    ```js
    function foo(x = 5) {
      let x = 1; // error
      const x = 2; // error
    }
    //此代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。
    ```

2. 使用参数默认值时，函数不能有同名参数。

  ```js
  // 不报错
  function foo(x, x, y) {
    // ...
  }

  // 报错
  function foo(x, x, y = 1) {
    // ...
  }
  ```

3. 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

    ```js
    let x = 99;
    function foo(p = x + 1) {
      console.log(p);
    }

    foo() // 100

    x = 100;
    foo() // 101
    //代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100
    ```

# 对象的扩展

## 属性的简洁表示法

ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

    ```js
    const foo = 'bar';
    const baz = {foo};
    baz // {foo: "bar"}

    // 等同于
    const baz = {foo: foo};
    ```

上面代码表明，ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。下面是另一个例子。

    ```js
    function f(x, y) {
        return {x, y};
    }

    // 等同于

    function f(x, y) {
        return {x: x, y: y};
    }

    f(1, 2) // Object {x: 1, y: 2}
    ```

除了属性简写，方法也可以简写。

    ```js
    const o = {
        method() {
            return "Hello!";
        }
    };

    // 等同于

    const o = {
        method: function() {
            return "Hello!";
        }
    };
    ```

下面是一个实际的例子。

    ```js
    let birth = '2000/01/01';

    const Person = {

        name: '张三',

        //等同于birth: birth
        birth,

        // 等同于hello: function ()...
        hello() { console.log('我的名字是', this.name); }

    };
    ```

这种写法用于函数的返回值，将会非常方便。

    ```js
    function getPoint() {
        const x = 1;
        const y = 10;
        return {x, y};
    }

    getPoint()
    // {x:1, y:10}
    ```

CommonJS 模块输出一组变量，就非常合适使用简洁写法。

    ```js
    let ms = {};

    function getItem (key) {
      return key in ms ? ms[key] : null;
    }

    function setItem (key, value) {
      ms[key] = value;
    }

    function clear () {
      ms = {};
    }

    module.exports = { getItem, setItem, clear };
    // 等同于
    module.exports = {
      getItem: getItem,
      setItem: setItem,
      clear: clear
    };
    ```

属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。

    ```js
    const cart = {
      _wheels: 4,

      get wheels () {
        return this._wheels;
      },

      set wheels (value) {
        if (value < this._wheels) {
          throw new Error('数值太小了！');
        }
        this._wheels = value;
      }
    }
    ```

注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。

    ```js
    const obj = {
      class () {}
    };

    // 等同于

    var obj = {
      'class': function() {}
    };
    ```

上面代码中，class是字符串，所以不会因为它属于关键字，而导致语法解析报错。

如果某个方法的值是一个 Generator 函数，前面需要加上星号。

    ```js
    const obj = {
      * m() {
        yield 'hello world';
      }
    };
    ```

## 属性名表达式

JavaScript 定义对象的属性，有两种方法。

    ```js
    // 方法一
    obj.foo = true;

    // 方法二
    obj['a' + 'bc'] = 123;
    ```

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

    ```js
    var obj = {
      foo: true,
      abc: 123
    };
    ```

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

    ```js
    let propKey = 'foo';

    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };
    ```

下面是另一个例子。

    ```js
    let lastWord = 'last word';

    const a = {
      'first word': 'hello',
      [lastWord]: 'world'
    };

    a['first word'] // "hello"
    a[lastWord] // "world"
    a['last word'] // "world"
    ```

表达式还可以用于定义方法名。

    ```js
    let obj = {
      ['h' + 'ello']() {
        return 'hi';
      }
    };

    obj.hello() // hi
    ```

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

    ```js
    // 报错
    const foo = 'bar';
    const bar = 'abc';
    const baz = { [foo] };

    // 正确
    const foo = 'bar';
    const baz = { [foo]: 'abc'};
    ```

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

    ```js
    const keyA = {a: 1};
    const keyB = {b: 2};

    const myObject = {
      [keyA]: 'valueA',
      [keyB]: 'valueB'
    };

    myObject // Object {[object Object]: "valueB"}
    ```

上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。

## 方法的 name 属性

函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

    ```js
    const person = {
      sayName() {
        console.log('hello!');
      },
    };

    person.sayName.name   // "sayName"
    ```

上面代码中，方法的name属性返回函数名（即方法名）。

如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。

    ```js
    const obj = {
      get foo() {},
      set foo(x) {}
    };

    obj.foo.name
    // TypeError: Cannot read property 'name' of undefined

    const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

    descriptor.get.name // "get foo"
    descriptor.set.name // "set foo"
    ```

有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。

    ```js
    (new Function()).name // "anonymous"

    var doSomething = function() {
      // ...
    };
    doSomething.bind().name // "bound doSomething"
    ```

如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。

    ```js
    const key1 = Symbol('description');
    const key2 = Symbol();
    let obj = {
      [key1]() {},
      [key2]() {},
    };
    obj[key1].name // "[description]"
    obj[key2].name // ""
    ```

## Object.is()

ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

    ```js
    Object.is('foo', 'foo')
    // true
    Object.is({}, {})
    // false
    ```

不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

    ```js
    +0 === -0 //true
    NaN === NaN // false

    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true
    ```

ES5 可以通过下面的代码，部署Object.is。

    ```js
    Object.defineProperty(Object, 'is', {
      value: function(x, y) {
        if (x === y) {
          // 针对+0 不等于 -0的情况
          return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
    ```

## Object.assign()

### 基本用法

Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

    ```js
    const target = { a: 1 };

    const source1 = { b: 2 };
    const source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
    ```

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

    ```js
    const target = { a: 1, b: 1 };

    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
    ```

如果只有一个参数，Object.assign会直接返回该参数。

    ```js
    const obj = {a: 1};
    Object.assign(obj) === obj // true
    ```

如果该参数不是对象，则会先转成对象，然后返回。

    ```js
    typeof Object.assign(2) // "object"
    ```

由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

    ```js
    Object.assign(undefined) // 报错
    Object.assign(null) // 报错
    ```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

    ```js
    let obj = {a: 1};
    Object.assign(obj, undefined) === obj // true
    Object.assign(obj, null) === obj // true
    ```

其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

    ```js
    const v1 = 'abc';
    const v2 = true;
    const v3 = 10;

    const obj = Object.assign({}, v1, v2, v3);
    console.log(obj); // { "0": "a", "1": "b", "2": "c" }
    ```

上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

    ```js
    Object(true) // {[[PrimitiveValue]]: true}
    Object(10)  //  {[[PrimitiveValue]]: 10}
    Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
    ```

上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

    ```js
    Object.assign({b: 'c'},
      Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
      })
    )
    // { b: 'c' }
    ```

上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

属性名为 Symbol 值的属性，也会被Object.assign拷贝。

    ```js
    Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
    // { a: 'b', Symbol(c): 'd' }
    ```
 
### 注意点

__（1）浅拷贝__

Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

    ```js
    const obj1 = {a: {b: 1}};
    const obj2 = Object.assign({}, obj1);

    obj1.a.b = 2;
    obj2.a.b // 2
    ```

上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

__（2）同名属性的替换__

对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

    ```js
    const target = { a: { b: 'c', d: 'e' } }
    const source = { a: { b: 'hello' } }
    Object.assign(target, source)
    // { a: { b: 'hello' } }
    ```

上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。

一些函数库提供Object.assign的定制版本（比如 Lodash 的_.defaultsDeep方法），可以得到深拷贝的合并。

__（3）数组的处理__

Object.assign可以用来处理数组，但是会把数组视为对象。

    ```js
    Object.assign([1, 2, 3], [4, 5])
    // [4, 5, 3]
    ```

上面代码中，Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

__（4）取值函数的处理__

Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

    ```js
    const source = {
      get foo() { return 1 }
    };
    const target = {};

    Object.assign(target, source)
    // { foo: 1 }
    ```

上面代码中，source对象的foo属性是一个取值函数，Object.assign不会复制这个取值函数，只会拿到值以后，将这个值复制过去。

### 常见用途

Object.assign方法有很多用处。

__（1）为对象添加属性__

    ```js
    class Point {
      constructor(x, y) {
        Object.assign(this, {x, y});
      }
    }
    ```

上面方法通过Object.assign方法，将x属性和y属性添加到Point类的对象实例。

__（2）为对象添加方法__

    ```js
    Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {
        ···
      },
      anotherMethod() {
        ···
      }
    });

    // 等同于下面的写法
    SomeClass.prototype.someMethod = function (arg1, arg2) {
      ···
    };
    SomeClass.prototype.anotherMethod = function () {
      ···
    };
    ```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。

__（3）克隆对象__

    ```js
    function clone(origin) {
      return Object.assign({}, origin);
    }
    ```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

    ```js
    function clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }
    ```

__（4）合并多个对象__

将多个对象合并到某个对象。

    ```js
    const merge =
      (target, ...sources) => Object.assign(target, ...sources);
    ```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

    ```js
    const merge =
      (...sources) => Object.assign({}, ...sources);
    ```

__（5）为属性指定默认值__

    ```js
    const DEFAULTS = {
      logLevel: 0,
      outputFormat: 'html'
    };

    function processContent(options) {
      options = Object.assign({}, DEFAULTS, options);
      console.log(options);
      // ...
    }
    ```

上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则option的属性值会覆盖DEFAULTS的属性值。

注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。

    ```js
    const DEFAULTS = {
      url: {
        host: 'example.com',
        port: 7070
      },
    };

    processContent({ url: {port: 8000} })
    // {
    //   url: {port: 8000}
    // }
    ```

上面代码的原意是将url.port改成 8000，url.host不变。实际结果却是options.url覆盖掉DEFAULTS.url，所以url.host就不存在了。

## 属性的可枚举性和遍历

### 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

    ```js
    let obj = { foo: 123 };
    Object.getOwnPropertyDescriptor(obj, 'foo')
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true,
    //    configurable: true
    //  }
    ```

描述对象的enumerable属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略enumerable为false的属性。

1. for...in循环：只遍历对象自身的和继承的可枚举的属性。
2. Object.keys()：返回对象自身的所有可枚举的属性的键名。
3. JSON.stringify()：只串行化对象自身的可枚举的属性。
4. Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。其中，只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。

    ```js
    Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
    // false

    Object.getOwnPropertyDescriptor([], 'length').enumerable
    // false
    ```

上面代码中，toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

    ```js
    Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
    // false
    ```

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

__（1）for...in__

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

__（2）Object.keys(obj)__

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

__（3）Object.getOwnPropertyNames(obj)__

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

__（4）Object.getOwnPropertySymbols(obj)__

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

__（5）Reflect.ownKeys(obj)__

Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

    + 首先遍历所有数值键，按照数值升序排列。
    + 其次遍历所有字符串键，按照加入时间升序排列。
    + 最后遍历所有 Symbol 键，按照加入时间升序排列。

    ```js
    Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
    // ['2', '10', 'b', 'a', Symbol()]
    ```

上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

## Object.getOwnPropertyDescriptors()

前面说过，Object.getOwnPropertyDescriptor方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。

    ```js
    const obj = {
      foo: 123,
      get bar() { return 'abc' }
    };

    Object.getOwnPropertyDescriptors(obj)
    // { foo:
    //    { value: 123,
    //      writable: true,
    //      enumerable: true,
    //      configurable: true },
    //   bar:
    //    { get: [Function: get bar],
    //      set: undefined,
    //      enumerable: true,
    //      configurable: true } }
    ```

上面代码中，Object.getOwnPropertyDescriptors方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

该方法的实现非常容易。

    ```js
    function getOwnPropertyDescriptors(obj) {
      const result = {};
      for (let key of Reflect.ownKeys(obj)) {
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
      }
      return result;
    }
    ```

该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

    ```js
    const source = {
      set foo(value) {
        console.log(value);
      }
    };

    const target1 = {};
    Object.assign(target1, source);

    Object.getOwnPropertyDescriptor(target1, 'foo')
    // { value: undefined,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true }
    ```

上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

这时，Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。

    ```js
    const source = {
      set foo(value) {
        console.log(value);
      }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    Object.getOwnPropertyDescriptor(target2, 'foo')
    // { get: undefined,
    //   set: [Function: set foo],
    //   enumerable: true,
    //   configurable: true }
    ```

上面代码中，两个对象合并的逻辑可以写成一个函数。

    ```js
    const shallowMerge = (target, source) => Object.defineProperties(
      target,
      Object.getOwnPropertyDescriptors(source)
    );
    ```

Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。

    ```js
    const clone = Object.create(Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj));

    // 或者

    const shallowClone = (obj) => Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );
    ```

上面代码会克隆对象obj。

另外，Object.getOwnPropertyDescriptors方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。

    ```js
    const obj = {
      __proto__: prot,
      foo: 123,
    };
    ```

ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。

    ```js
    const obj = Object.create(prot);
    obj.foo = 123;

    // 或者

    const obj = Object.assign(
      Object.create(prot),
      {
        foo: 123,
      }
    );
    ```

有了Object.getOwnPropertyDescriptors，我们就有了另一种写法。

    ```js
    const obj = Object.create(
      prot,
      Object.getOwnPropertyDescriptors({
        foo: 123,
      })
    );
    ```

Object.getOwnPropertyDescriptors也可以用来实现 Mixin（混入）模式。

    ```js
    let mix = (object) => ({
      with: (...mixins) => mixins.reduce(
        (c, mixin) => Object.create(
          c, Object.getOwnPropertyDescriptors(mixin)
        ), object)
    });

    // multiple mixins example
    let a = {a: 'a'};
    let b = {b: 'b'};
    let c = {c: 'c'};
    let d = mix(c).with(a, b);

    d.c // "c"
    d.b // "b"
    d.a // "a"
    ```

上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。

出于完整性的考虑，Object.getOwnPropertyDescriptors进入标准以后，以后还会新增Reflect.getOwnPropertyDescriptors方法。

## __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

### __proto__属性

__proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

    ```js
    // es5 的写法
    const obj = {
      method: function() { ... }
    };
    obj.__proto__ = someOtherObj;

    // es6 的写法
    var obj = Object.create(someOtherObj);
    obj.method = function() { ... };
    ```

该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。

    ```js
    Object.defineProperty(Object.prototype, '__proto__', {
      get() {
        let _thisObj = Object(this);
        return Object.getPrototypeOf(_thisObj);
      },
      set(proto) {
        if (this === undefined || this === null) {
          throw new TypeError();
        }
        if (!isObject(this)) {
          return undefined;
        }
        if (!isObject(proto)) {
          return undefined;
        }
        let status = Reflect.setPrototypeOf(this, proto);
        if (!status) {
          throw new TypeError();
        }
      },
    });

    function isObject(value) {
      return Object(value) === value;
    }
    ```

如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。

    ```js
    Object.getPrototypeOf({ __proto__: null })
    // null
    ```

### Object.setPrototypeOf() 

Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

    ```js
    // 格式
    Object.setPrototypeOf(object, prototype)

    // 用法
    const o = Object.setPrototypeOf({}, null);
    ```

该方法等同于下面的函数。

    ```js
    function (obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
    ```

下面是一个例子。

    ```js
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40
    ```

上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。

    ```js
    Object.setPrototypeOf(1, {}) === 1 // true
    Object.setPrototypeOf('foo', {}) === 'foo' // true
    Object.setPrototypeOf(true, {}) === true // true
    ```

由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。

    ```js
    Object.setPrototypeOf(undefined, {})
    // TypeError: Object.setPrototypeOf called on null or undefined

    Object.setPrototypeOf(null, {})
    // TypeError: Object.setPrototypeOf called on null or undefined
    ```

### Object.getPrototypeOf()

该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

    ```js
    Object.getPrototypeOf(obj);
    ```

下面是一个例子。

    ```js
    function Rectangle() {
      // ...
    }

    const rec = new Rectangle();

    Object.getPrototypeOf(rec) === Rectangle.prototype
    // true

    Object.setPrototypeOf(rec, Object.prototype);
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // false
    ```

如果参数不是对象，会被自动转为对象。

    ```js
    // 等同于 Object.getPrototypeOf(Number(1))
    Object.getPrototypeOf(1)
    // Number {[[PrimitiveValue]]: 0}

    // 等同于 Object.getPrototypeOf(String('foo'))
    Object.getPrototypeOf('foo')
    // String {length: 0, [[PrimitiveValue]]: ""}

    // 等同于 Object.getPrototypeOf(Boolean(true))
    Object.getPrototypeOf(true)
    // Boolean {[[PrimitiveValue]]: false}

    Object.getPrototypeOf(1) === Number.prototype // true
    Object.getPrototypeOf('foo') === String.prototype // true
    Object.getPrototypeOf(true) === Boolean.prototype // true
    ```

如果参数是undefined或null，它们无法转为对象，所以会报错。

    ```js
    Object.getPrototypeOf(null)
    // TypeError: Cannot convert undefined or null to object

    Object.getPrototypeOf(undefined)
    // TypeError: Cannot convert undefined or null to object
    ```

## super 关键字

我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。

    ```js
    const proto = {
      foo: 'hello'
    };

    const obj = {
      foo: 'world',
      find() {
        return super.foo;
      }
    };

    Object.setPrototypeOf(obj, proto);
    obj.find() // "hello"
    ```

上面代码中，对象obj的find方法之中，通过super.foo引用了原型对象proto的foo属性。

注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

    ```js
    // 报错
    const obj = {
      foo: super.foo
    }

    // 报错
    const obj = {
      foo: () => super.foo
    }

    // 报错
    const obj = {
      foo: function () {
        return super.foo
      }
    }
    ```

上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

    ```js
    const proto = {
      x: 'hello',
      foo() {
        console.log(this.x);
      },
    };

    const obj = {
      x: 'world',
      foo() {
        super.foo();
      }
    }

    Object.setPrototypeOf(obj, proto);

    obj.foo() // "world"
    ```

上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。

## Object.keys()，Object.values()，Object.entries()

### Object.keys()

ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

    ```js
    var obj = { foo: 'bar', baz: 42 };
    Object.keys(obj)
    // ["foo", "baz"]
    ```

ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

    ```js
    let {keys, values, entries} = Object;
    let obj = { a: 1, b: 2, c: 3 };

    for (let key of keys(obj)) {
      console.log(key); // 'a', 'b', 'c'
    }

    for (let value of values(obj)) {
      console.log(value); // 1, 2, 3
    }

    for (let [key, value] of entries(obj)) {
      console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
    }
    ```

### Object.values()

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

    ```js
    const obj = { foo: 'bar', baz: 42 };
    Object.values(obj)
    // ["bar", 42]
    ```

返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

    ```js
    const obj = { 100: 'a', 2: 'b', 7: 'c' };
    Object.values(obj)
    // ["b", "c", "a"]
    ```

上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。

Object.values只返回对象自身的可遍历属性。

    ```js
    const obj = Object.create({}, {p: {value: 42}});
    Object.values(obj) // []
    ```

上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

    ```js
    const obj = Object.create({}, {p:
      {
        value: 42,
        enumerable: true
      }
    });
    Object.values(obj) // [42]
    ```

Object.values会过滤属性名为 Symbol 值的属性。

    ```js
    Object.values({ [Symbol()]: 123, foo: 'abc' });
    // ['abc']
    ```

如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。

## 对象的扩展运算符

# Promise 对象

## Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案(回调函数和事件)更合理和更强大。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本用法

ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

    ```js
    const promise = new Promise(function(resolve, reject) {
      // ... some code

      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(error);
      }
    });
    ```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

    ```js
    promise.then(function(value) {
      // success
    }, function(error) {
      // failure
    });
```

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

    ```js
    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }

    timeout(100).then((value) => {
      console.log(value);
    });
    ```

上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。

Promise 新建后就会立即执行。

    ```js
    let promise = new Promise(function(resolve, reject) {
      console.log('Promise');
      resolve();
    });

    promise.then(function() {
      console.log('resolved.');
    });

    console.log('Hi!');

    // Promise
    // Hi!
    // resolved
    ```

上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

    ```js
    function loadImageAsync(url) {
      return new Promise(function(resolve, reject) {
        const image = new Image();

        image.onload = function() {
          resolve(image);
        };

        image.onerror = function() {
          reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
      });
    }
    ```

上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。

    ```js
    const getJSON = function(url) {
      const promise = new Promise(function(resolve, reject){
        const handler = function() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

      });

      return promise;
    };

    getJSON("/posts.json").then(function(json) {
      console.log('Contents: ' + json);
    }, function(error) {
      console.error('出错了', error);
    });
    ```

上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

    ```js
    const p1 = new Promise(function (resolve, reject) {
      // ...
    });

    const p2 = new Promise(function (resolve, reject) {
      // ...
      resolve(p1);
    })
    ```

上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

    ```js
    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })

    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })

    p2
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // Error: fail
    ```

上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

    ```js
    new Promise((resolve, reject) => {
      resolve(1);
      console.log(2);
    }).then(r => {
      console.log(r);
    });
    // 2
    // 1
    ```

上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

    ```js
    new Promise((resolve, reject) => {
      return resolve(1);
      // 后面的语句不会执行
      console.log(2);
    })
    ```

## Promise.prototype.then()

Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

    ```js
    getJSON("/posts.json").then(function(json) {
      return json.post;
    }).then(function(post) {
      // ...
    });
    ```

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

    ```js
    getJSON("/post/1.json").then(function(post) {
      return getJSON(post.commentURL);
    }).then(function funcA(comments) {
      console.log("resolved: ", comments);
    }, function funcB(err){
      console.log("rejected: ", err);
    });
    ```

上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。

如果采用箭头函数，上面的代码可以写得更简洁。

    ```js
    getJSON("/post/1.json").then(
      post => getJSON(post.commentURL)
    ).then(
      comments => console.log("resolved: ", comments),
      err => console.log("rejected: ", err)
    );
    ```

## Promise.prototype.catch()

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

    ```js
    getJSON('/posts.json').then(function(posts) {
      // ...
    }).catch(function(error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });
    ```

上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

    ```js
    p.then((val) => console.log('fulfilled:', val))
      .catch((err) => console.log('rejected', err));

    // 等同于
    p.then((val) => console.log('fulfilled:', val))
      .then(null, (err) => console.log("rejected:", err));
    ```

    ```js
    const promise = new Promise(function(resolve, reject) {
      throw new Error('test');
    });
    promise.catch(function(error) {
      console.log(error);
    });
    // Error: test
    ```

上面代码中，promise抛出一个错误，就被catch方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。

    ```js
    // 写法一
    const promise = new Promise(function(resolve, reject) {
      try {
        throw new Error('test');
      } catch(e) {
        reject(e);
      }
    });
    promise.catch(function(error) {
      console.log(error);
    });

    // 写法二
    const promise = new Promise(function(resolve, reject) {
      reject(new Error('test'));
    });
    promise.catch(function(error) {
      console.log(error);
    });
    ```

比较上面两种写法，可以发现reject方法的作用，等同于抛出错误。

如果 Promise 状态已经变成resolved，再抛出错误是无效的。

    ```js
    const promise = new Promise(function(resolve, reject) {
      resolve('ok');
      throw new Error('test');
    });
    promise
      .then(function(value) { console.log(value) })
      .catch(function(error) { console.log(error) });
    // ok
    ```

上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

    ```js
    getJSON('/post/1.json').then(function(post) {
      return getJSON(post.commentURL);
    }).then(function(comments) {
      // some code
    }).catch(function(error) {
      // 处理前面三个Promise产生的错误
    });
    ```

上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

    ```js
    // bad
    promise
      .then(function(data) {
        // success
      }, function(err) {
        // error
      });

    // good
    promise
      .then(function(data) { //cb
        // success
      })
      .catch(function(err) {
        // error
      });
    ```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

    ```js
    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
      });
    };

    someAsyncThing().then(function() {
      console.log('everything is great');
    });

    setTimeout(() => { console.log(123) }, 2000);
    // Uncaught (in promise) ReferenceError: x is not defined
    // 123
    ```

上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

这个脚本放在服务器执行，退出码就是0（即表示执行成功）。不过，Node 有一个unhandledRejection事件，专门监听未捕获的reject错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。

    ```js
    process.on('unhandledRejection', function (err, p) {
      throw err;
    });
    ```

上面代码中，unhandledRejection事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。

__注意__，Node 有计划在未来废除unhandledRejection事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。

    ```js
    const promise = new Promise(function (resolve, reject) {
      resolve('ok');
      setTimeout(function () { throw new Error('test') }, 0)
    });
    promise.then(function (value) { console.log(value) });
    // ok
    // Uncaught Error: test
    ```

上面代码中，Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。

一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

    ```js
    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
      });
    };

    someAsyncThing()
    .catch(function(error) {
      console.log('oh no', error);
    })
    .then(function() {
      console.log('carry on');
    });
    // oh no [ReferenceError: x is not defined]
    // carry on
    ```

面代码运行完catch方法指定的回调函数，会接着运行后面那个then方法指定的回调函数。如果没有报错，则会跳过catch方法。

    ```js
    Promise.resolve()
    .catch(function(error) {
      console.log('oh no', error);
    })
    .then(function() {
      console.log('carry on');
    });
    // carry on
    ```

上面的代码因为没有报错，跳过了catch方法，直接执行后面的then方法。此时，要是then方法里面报错，就与前面的catch无关了。

catch方法之中，还能再抛出错误。

    ```js
    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
      });
    };

    someAsyncThing().then(function() {
      return someOtherAsyncThing();
    }).catch(function(error) {
      console.log('oh no', error);
      // 下面一行会报错，因为 y 没有声明
      y + 2;
    }).then(function() {
      console.log('carry on');
    });
    // oh no [ReferenceError: x is not defined]
    ```

上面代码中，catch方法抛出一个错误，因为后面没有别的catch方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。

    ```js
    someAsyncThing().then(function() {
      return someOtherAsyncThing();
    }).catch(function(error) {
      console.log('oh no', error);
      // 下面一行会报错，因为y没有声明
      y + 2;
    }).catch(function(error) {
      console.log('carry on', error);
    });
    // oh no [ReferenceError: x is not defined]
    // carry on [ReferenceError: y is not defined]
    ```

上面代码中，第二个catch方法用来捕获前一个catch方法抛出的错误。

## Promise.prototype.finally()

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

    ```js
    promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
    ```

上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

下面是一个例子，服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。

    ```js
    server.listen(port)
      .then(function () {
        // ...
      })
      .finally(server.stop);
    ```

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

finally本质上是then方法的特例。

    ```js
    promise
    .finally(() => {
      // 语句
    });

    // 等同于
    promise
    .then(
      result => {
        // 语句
        return result;
      },
      error => {
        // 语句
        throw error;
      }
    );
    ```

上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。

它的实现也很简单。

    ```js
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };
    ```

上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

从上面的实现还可以看到，finally方法总是会返回原来的值。

    ```js
    // resolve 的值是 undefined
    Promise.resolve(2).then(() => {}, () => {})

    // resolve 的值是 2
    Promise.resolve(2).finally(() => {})

    // reject 的值是 undefined
    Promise.reject(3).then(() => {}, () => {})

    // reject 的值是 3
    Promise.reject(3).finally(() => {})
    ```

## Promise.all()

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

    ```js
    const p = Promise.all([p1, p2, p3]);
    ```

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

下面是一个具体的例子。

    ```js
    // 生成一个Promise对象的数组
    const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
      return getJSON('/post/' + id + ".json");
    });

    Promise.all(promises).then(function (posts) {
      // ...
    }).catch(function(reason){
      // ...
    });
    ```

上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

下面是另一个例子。

    ```js
    const databasePromise = connectDatabase();

    const booksPromise = databasePromise
      .then(findAllBooks);

    const userPromise = databasePromise
      .then(getCurrentUser);

    Promise.all([
      booksPromise,
      userPromise
    ])
    .then(([books, user]) => pickTopRecommentations(books, user));
    ```

上面代码中，booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommentations这个回调函数。

注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

    ```js
    const p1 = new Promise((resolve, reject) => {
      resolve('hello');
    })
    .then(result => result)
    .catch(e => e);

    const p2 = new Promise((resolve, reject) => {
      throw new Error('报错了');
    })
    .then(result => result)
    .catch(e => e);

    Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));
    // ["hello", Error: 报错了]
    ```

上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。

    ```js
    const p1 = new Promise((resolve, reject) => {
      resolve('hello');
    })
    .then(result => result);

    const p2 = new Promise((resolve, reject) => {
      throw new Error('报错了');
    })
    .then(result => result);

    Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));
    // Error: 报错了
    ```

## Promise.race()

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

    ```js
    const p = Promise.race([p1, p2, p3]);
    ```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。

    ```js
    const p = Promise.race([
      fetch('/resource-that-may-take-a-while'),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
      })
    ]);

    p
    .then(console.log)
    .catch(console.error);
    ```

上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

## Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

    ```js
    const jsPromise = Promise.resolve($.ajax('/whatever.json'));
    ```

上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

Promise.resolve等价于下面的写法。

    ```js
    Promise.resolve('foo')
    // 等价于
    new Promise(resolve => resolve('foo'))
    ```

Promise.resolve方法的参数分成四种情况。

__（1）参数是一个 Promise 实例__

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

__（2）参数是一个thenable对象__

thenable对象指的是具有then方法的对象，比如下面这个对象。

    ```js
    let thenable = {
      then: function(resolve, reject) {
        resolve(42);
      }
    };
    ```

Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

    ```js
    let thenable = {
      then: function(resolve, reject) {
        resolve(42);
      }
    };

    let p1 = Promise.resolve(thenable);
    p1.then(function(value) {
      console.log(value);  // 42
    });
    ```

上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

__（3）参数不是具有then方法的对象，或根本就不是对象__

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

    ```js
    const p = Promise.resolve('Hello');

    p.then(function (s){
      console.log(s)
    });
    // Hello
    ```

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

__（4）不带有任何参数__

Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。

    ```js
    const p = Promise.resolve();

    p.then(function () {
      // ...
    });
    ```

上面代码的变量p就是一个 Promise 对象。

需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

    ```js
    setTimeout(function () {
      console.log('three');
    }, 0);

    Promise.resolve().then(function () {
      console.log('two');
    });

    console.log('one');

    // one
    // two
    // three
    ```

上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

## Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

    ```js
    const p = Promise.reject('出错了');
    // 等同于
    const p = new Promise((resolve, reject) => reject('出错了'))

    p.then(null, function (s) {
      console.log(s)
    });
    // 出错了
    ```

上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。

注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

    ```js
    const thenable = {
      then(resolve, reject) {
        reject('出错了');
      }
    };

    Promise.reject(thenable)
    .catch(e => {
      console.log(e === thenable)
    })
    // true
    ```

上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。


## 应用

__加载图片__

我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。

    ```js
    const preloadImage = function (path) {
      return new Promise(function (resolve, reject) {
        const image = new Image();
        image.onload  = resolve;
        image.onerror = reject;
        image.src = path;
      });
    };
    ```

__Generator 函数与 Promise 的结合__

使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

    ```js
    function getFoo () {
      return new Promise(function (resolve, reject){
        resolve('foo');
      });
    }

    const g = function* () {
      try {
        const foo = yield getFoo();
        console.log(foo);
      } catch (e) {
        console.log(e);
      }
    };

    function run (generator) {
      const it = generator();

      function go(result) {
        if (result.done) return result.value;

        return result.value.then(function (value) {
          return go(it.next(value));
        }, function (error) {
          return go(it.throw(error));
        });
      }

      go(it.next());
    }

    run(g);
    ```

## Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。

    ```js
    Promise.resolve().then(f)
    ```

上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。

    ```js
    const f = () => console.log('now');
    Promise.resolve().then(f);
    console.log('next');
    // next
    // now
    ```

上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。

那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用async函数来写。

    ```js
    const f = () => console.log('now');
    (async () => f())();
    console.log('next');
    // now
    // next
    ```

上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的async函数，因此如果f是同步的，就会得到同步的结果；如果f是异步的，就可以用then指定下一步，就像下面的写法。

    ```js
    (async () => f())()
    .then(...)
    ```

需要注意的是，async () => f()会吃掉f()抛出的错误。所以，如果想捕获错误，要使用promise.catch方法。


    ```js
    (async () => f())()
    .then(...)
    .catch(...)
    ```

第二种写法是使用new Promise()。

    ```js
    const f = () => console.log('now');
    (
      () => new Promise(
        resolve => resolve(f())
      )
    )();
    console.log('next');
    // now
    // next
    ```

上面代码也是使用立即执行的匿名函数，执行new Promise()。这种情况下，同步函数也是同步执行的。

鉴于这是一个很常见的需求，所以现在有一个提案，提供Promise.try方法替代上面的写法。

    ```js
    const f = () => console.log('now');
    Promise.try(f);
    console.log('next');
    // now
    // next
    ```

事实上，Promise.try存在已久，Promise 库Bluebird、Q和when，早就提供了这个方法。

由于Promise.try为所有操作提供了统一的处理机制，所以如果想用then方法管理流程，最好都用Promise.try包装一下。这样有许多好处，其中一点就是可以更好地管理异常。

    ```js
    function getUsername(userId) {
      return database.users.get({id: userId})
      .then(function(user) {
        return user.name;
      });
    }
    ```

上面代码中，database.users.get()返回一个 Promise 对象，如果抛出异步错误，可以用catch方法捕获，就像下面这样写。

    ```js
    database.users.get({id: userId})
    .then(...)
    .catch(...)
    ```

但是database.users.get()可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用try...catch去捕获。

    ```js
    try {
      database.users.get({id: userId})
      .then(...)
      .catch(...)
    } catch (e) {
      // ...
    }
    ```

上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误。

    ```js
    Promise.try(database.users.get({id: userId}))
      .then(...)
      .catch(...)
    ```

事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。
