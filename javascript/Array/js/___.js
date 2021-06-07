console.log(...[1, 2, 3]) // 1 2 3

// 1、空数组不产生任何效果
console.log(...[])
console.log([...[],1]) // [1]

// 2、可以放置表达式
var x = 1
var arr = [
  ...(x > 0 ? ['a'] : []),
  'b'
]
console.log(arr)// ["a", "b"]

// 3、只有函数调用时,扩展运算符才可以放在圆括号中,否则会报错
// (...[1,2]) // Uncaught SyntaxError: Unexpected token '...'
// console.log((...[1,2])) // Uncaught SyntaxError: Unexpected token '...'


// 4、代替apply
var a = Math.max.apply(null, [14, 2, 3])
var b= Math.max(...[14, 2, 3])
console.log(a, b) // 14 14

var arr1 = [1, 2, 3]
var arr2 = [4, 5, 6]
var a = Array.prototype.push.apply(arr1, arr2)
console.log(a, arr1, arr2)// 6 [1, 2, 3, 4, 5, 6] [4, 5, 6]

var arr1 = [1, 2, 3]
var arr2 = [4, 5, 6]
var a = arr1.push(...arr2)
console.log(a, arr1, arr2)// 6 [1, 2, 3, 4, 5, 6] [4, 5, 6]

// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);



// 5、复制数组
var a1 = [1, 2];
// 写法一
var a2 = [...a1];
// 写法二
var [...a3] = a1;
console.log(a1,a2,a3)// [1, 2]  [1, 2]  [1, 2]

// 6、合并数组
var a = [1, 2]
var b = [3, 4]
var c = [...a, ...b]
console.log(c)// [1, 2, 3, 4]

// 7、与解构赋值结合
var [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first,rest)// 1  [2, 3, 4, 5]

var [first, ...rest] = [];
console.log(first,rest)//  undefined  []

var [first, ...rest] = ["foo"];
console.log(first, rest)// "foo" []

// 只能放在参数的最后一位，否则会报错
// var [...butLast, last] = [1, 2, 3, 4, 5];// 报错 Rest element must be last element
// var [first, ...middle, last] = [1, 2, 3, 4, 5];// 报错 Rest element must be last element


// 8、与字符串
// 将字符串转成数组
var a = [...'hello']
console.log(a)// ["h", "e", "l", "l", "o"]

// 能够正确识别四个字节的 Unicode 字符
var a = 'x\uD83D\uDE80y'.length
var b = [...'x\uD83D\uDE80y'].length
console.log(a, b)// 4 3

