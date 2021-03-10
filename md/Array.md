# Array 方法

## Array.isArray() 

> - 作用：用于确定传递的值是否是一个 Array。
> - 语法：`Array.isArray(obj)`
> - 参数：
>   + obj：需要检测的值。
> - 返回值：如果对象是 Array，则为true; 否则为false。

__instanceof 和 isArray__

当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes.

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

## reduce() 

__作用：__接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

reduce() 可以作为一个高阶函数，用于函数的 compose。

__注意:__ reduce() 对于空数组是不会执行回调函数的。

__浏览器支持：__

![浏览器支持](../images/Array_reduce1.jpg)

__语法：__

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

__参数：__

![浏览器支持](../images/Array_reduce2.jpg)

__示例：__

```js
var numbers = [15.5, 2.3, 1.1, 4.7];
 
function getSum(total, num) {
    return total + Math.round(num);
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);
}
```

## push()

```js
var a = [1]
a.push(2,3,4)//4
console.log(a)//[1,2,3,4]
```

## concat()

> - 作用：concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
> - 语法：`arrayObject.concat(arrayX,arrayX,......,arrayX)`
> - 参数：
>   + arrayX  必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。
> - 返回值：返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。

__举例：__

```js
var a = [1]
a.concat()//[1]
a.concat(1)//[1,1]
a.concat([1])//[1,1]
```
## every()

> - 作用：测试数组的所有元素是否都通过了指定函数的测试。
> - 语法：`arr.every(callback[, thisArg])`
> - 参数：
>   + callback：必须。用来测试每个元素的函数。
>     - callback参数：元素值，元素的索引，原数组。
>   + thisArg：可选。执行 callback 时使用的 this 值。如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。
> - 返回值：
>   + every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。
> - 注意：
>   + callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
>   + every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。
>   + 空数组也是返回true。(空数组中所有元素都符合给定的条件，注：因为空数组没有元素)。
> - 原数组：不变。

__兼容__

```js
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
        throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false;
    }

    return true;
  };
}
```

## indexOf()

> - 作用：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
> - 语法：`arr.indexOf(searchElement[, fromIndex = 0])`
> - 参数：
>   + searchElement：要查找的元素
>   + fromIndex：开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
> - 返回值：首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1。

## lastIndexOf() 

> - 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
> - 语法：`arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])`
> - 参数：
>   + searchElement：被查找的元素。
>   + fromIndex：
>   + 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
> - 返回值：数组中最后一个元素的索引，如未找到返回-1

## join()

> - 作用：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
> - 语法：
    ```js
    str = arr.join()
    // 默认为 ","

    str = arr.join("")
    // 分隔符 === 空字符串 ""

    str = arr.join(separator)
    // 分隔符
    ```
> - 参数：
>   + separator：指定一个字符串来分隔数组的每个元素。
>     - 如果需要(separator)，将分隔符转换为字符串。
>     - 如果省略()，数组元素用逗号分隔。默认为 ","。
>     - 如果separator是空字符串("")，则所有元素之间都没有任何字符。
> - 返回值：一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串

## 数组遍历

### forEach
> - 作用：遍历数组
> - 语法：`array.forEach(function(currentValue, index, arr), thisValue)`
> - 返回值：undefined

![浏览器支持](../images/Array_forEach.jpg)

__forEach实现原理__

```js
Array.prototype.myForEach = function(fn,context){
    if (typeof fn !== "function") {
        throw new TypeError("arguments[0] is not a function");
    }
    let arr = this;
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
         fn.call(context, arr[i], i, arr);
    }
}
```

### map() 

> - 作用:遍历数组
> - 语法：`array.map(function(currentValue,index,arr), thisValue)`
> - 注意：
>   + map() 不会对空数组进行检测。
>   + map() 不会改变原始数组。
> - 返回值：返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
 
![浏览器支持](../images/Array_map.jpg)

- __map实现原理：__

```js
Array.prototype.fakeMap = function fakeMap(fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError("arguments[0] is not a function");
    }

    let arr = this;
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        // 迭代执行
        let result = fn.call(context, arr[i], i, arr);
        temp.push(result);
    }
    return temp;
};
```

### filter() 

> - 作用:创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
> - 语法：`array.filter(function(currentValue,index,arr), thisValue)`
> - 注意：
>   + filter() 不会对空数组进行检测。
>   + filter() 不会改变原始数组。
> - 返回值：遍历数组时，每次调用回调函数，若回调函数的返回值是true,就将当前元素加入到返回值数组中。
 
![浏览器支持](../images/Array_filter.jpg)

- __filter实现原理：__

```js
Array.prototype.fakeFilter = function (fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError("arguments[0] is not a function");
    }

    let arr = this;
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        let result = fn.call(context, arr[i], i, arr);
        if (result) temp.push(arr[i]);
    }
    return temp;
};
```

# ES6数组扩展

## 扩展运算符（...）

__作用：__好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

__举例：__

```js
1、函数调用

var array = [1];
array.push(...[2,3,4])

2、后面还可以放置表达式

const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];

3、如果扩展运算符后面是一个空数组，则不产生任何效果

[...[], 1]
// [1]

4、替代函数的 apply 方法

// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

```js
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```

### 应用

#### 复制数组

```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

#### 合并数组

```js
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
```

__注意：__都是浅拷贝

#### 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```js
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

#### 字符串

扩展运算符还可以将字符串转为真正的数组。

```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

```js
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```

上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。

```js
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3
```

#### 实现了 Iterator 接口的对象----------------

#### Map 和 Set 结构，Generator 函数---------------------

## Array.from() 

> - 作用：将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
>   + 类似数组的对象（array-like object）：即有length属性的对象。
>   + 可遍历（iterable）的对象：部署了 Iterator 接口的数据结构。
> - 语法：`Array.from(arrayLike,mapFn,thisArg)`
> - 参数：
>   + arrayLike：必须，想要转换成数组的伪数组对象或可迭代对象。
>   + mapFn：可选，如果指定了该参数，新数组中的每个元素会执行该回调函数。
>   + thisArg：可选，执行回调函数 mapFn 时 this 对象。
> - 返回值：一个新的数组实例
> - 与（...）不同点：都可将伪数组转为数组，（...）不能将类似数组的对象转为数组。

### 举例

__类似数组的对象转为数组__

```js
let arrayLike1 = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr1 = Array.from(arrayLike1); // ['a', 'b', 'c']

let arrayLike2 = {
    length: 3
};
let arr2 = Array.from(arrayLike2); // [undefined, undefined, undefined]

let arrayLike3 = {
    '4':'a'
    '5':'b'
    '6':'c'
    length: 3
};
let arr3 = Array.from(arrayLike3); // [undefined, undefined, undefined]
```

__NodeList对象、arguments对象转为真数组__

```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

__字符串（部署了 Iterator 接口的数据结构）__

`可以正确的返回字符串长度`

```js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
```

__字符串et 结构、Map结构转数组（部署了 Iterator 接口的数据结构）__

```js
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]
```

__mapFn使用__

```js
Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]
```

### 应用

__数组去重合并__

```js
function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n)); // [1, 2, 3]
```

## Array.of()

> - 作用：用于将一组值，转换为数组。
> - 主要目的：弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
>   ```js
>   Array() // []
>   Array(3) // [, , ,]
>   Array(3, 11, 8) // [3, 11, 8]
>   ```
> - 语法：`Array.of(element0[, element1[, ...[, elementN]]])`
> - 参数：
>   + elementN：任意个参数，将按顺序成为返回数组中的元素。
> - 返回值：新的 Array 实例。

### 兼容处理

```js
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

### 实现原理

```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## 数组实例的 copyWithin()

> - 作用：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
> - 语法：`Array.prototype.copyWithin(target, start = 0, end = this.length)`
> - 参数：这三个参数都应该是数值，如果不是，会自动转为数值。
>   + target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
>   + start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
>   + end（可选）：到该位置__前__停止读取数据，默认等于数组长度。如果为负值，表示倒数。
> - 返回值：改变后的数组
> - 原数组：改变

```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

## 数组实例的 find()与findIndex()

### find()

> - 作用：用于找出第一个符合条件的数组成员。
> - 语法：`array.find(function(currentValue, index, arr),thisValue)`
> - 返回值：find() 方法为数组中的每个元素都调用一次函数执行：
>   + 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
>   + 如果没有符合条件的元素返回 undefined
> - 原数组：不变。
> - 优点：借助Object.is方法可以发现NaN，弥补了数组的indexOf方法的不足。
> - 注意: find() 对于空数组，函数是不会执行的。

![浏览器支持](../images/Array_find.jpg)

__举例__

```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

### findIndex()

> - 作用：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
> - 语法：`array.findIndex(function(currentValue, index, arr),thisValue)`
> - 返回值：findIndex() 方法为数组中的每个元素都调用一次函数执行：
>   + 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
>   + 如果没有符合条件的元素返回 -1
> - 原数组：不变。
> - 优点：借助Object.is方法可以发现NaN，弥补了数组的indexOf方法的不足。
> - 注意: findIndex() 对于空数组，函数是不会执行的。

![浏览器支持](../images/Array_findIndex.jpg)

__举例__

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

## 数组实例的 fill()

> - 作用：使用给定值，填充一个数组,其实就是用默认内容初始化数组。
> - 语法：`arr.fill(value, start, end)`
> - 参数：
>   + value：必需。填充的值。
>   + start：可选。开始填充位置。
>   + end：可选。停止填充位置 (默认为 array.length)

__举例__

```js
['a', 'b', 'c'].fill(7)// [7, 7, 7]

new Array(3).fill(7)// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)// ['a', 7, 'c']
```

__注意__

如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```js
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

## 数组实例的 entries()，keys() 和 values()

entries()，keys()和values()用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## includes()

> - 作用：判断某个数组是否包含给定的值。
> - 语法：`arr.includes(searchElement, fromIndex)`
> - 参数：
>   + searchElement 必须。需要查找的元素值。
>   + fromIndex 可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
> - 返回值：布尔值。若存在true，不存在false。
> - 类似indexOf()，但是它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

__兼容__

```js
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

## flat()与flatMap()---实验

### flat()

> - 作用：递归到指定深度将所有子数组连接，并返回一个新数组。
> - 语法：`Array.flat(depth)`
> - 参数：
>   + depth:可选，指定嵌套数组中的结构深度，默认值为1。
> - 返回值：一个将子数组连接的新数组。

__扁平化嵌套数组__

```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]
```

__全部扁平化__

```js
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```

__扁平化与空项__

```js
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

### flatMap()

> - 作用：首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。即对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。
> - 语法：
>   ```js
    var new_array=arr.flatMap(function callback(currentValue[,index[,array]]) {
        // 返回新数组的元素
    }[, thisArg])
    ```
> - 参数：
>   + callback：能生成一个新数组中的元素的函数，能传入三个参数：
>     - currentValue：当前正在数组中处理的元素
>     - index:可选。数组中正在处理的当前元素的索引。
>     - array：可选。被调用的 map 数组
>   + thisArg：可选。执行 callback 函数时 使用的this 值。
> - 返回值：一个新的数组，其中每个元素都是回调函数的结果，并且__结构深度 depth 值为1__。

__举例__

```js
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

__只能展开一层数组__

```js
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```

## 数组的空位

> - 含义：数组的空位指，数组的某一个位置没有任何值。
> - ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
>   + forEach(), filter(), reduce(), every() 和some()都会跳过空位。
>   + map()会跳过空位，但会保留这个值
>   + join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
> - ES6 则是明确将空位转为undefined。

__ES5举例__

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

__ES6举例__

```js
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

[...['a',,'b']]
// [ "a", undefined, "b" ]

new Array(3).fill('a') // ["a","a","a"]

let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```

