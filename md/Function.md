# Function

Function 构造函数 创建一个新的Function对象。 在 JavaScript 中, 每个函数实际上都是一个Function对象。

__语法：__

```js
new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

__参数：__

|参数|解析|
|----|----|
|arg1, arg2, ... argN|被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的JavaScript标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如“×”，“theValue”，或“A，B”。|
|functionBody|一个含有包括函数定义的JavaScript语句的字符串。|

__描述：__

使用Function构造器生成的Function对象是在函数创建时解析的。这比你使用函数声明或者函数表达式(function)并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。

所有被传递到构造函数中的参数，都将被视为将被创建的函数的参数，并且是相同的标示符名称和传递顺序。

__注意：__

使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问Function构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 eval 不同。

__举例：__

```js
var sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6));
// expected output: 8
```

# 属性和方法

全局的Function对象没有自己的属性和方法, 但是, 因为它本身也是函数，所以它也会通过原型链从Function.prototype上继承部分属性和方法。

## 属性

## 方法

