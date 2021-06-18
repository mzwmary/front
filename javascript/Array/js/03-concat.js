// 非数组
var a = [1, 2, 3]
var b = a.concat(4, 5)
console.log(a, b)//[1, 2, 3]  [1, 2, 3, 4, 5]

// 数组
var c = [6, 7]
var d = a.concat(c)
console.log(a, c, d) // [1, 2, 3] [6, 7] [1, 2, 3, 6, 7]

// 没有参数
var a = [1, 2, 3]
var b = a.concat()
console.log(a, b, a === b)// [1, 2, 3]  [1, 2, 3] false

// 任意参数
var arr = [1];
var a = [2];
var b = [3, 4];
var c = function () { };
var arr1 = arr.concat(a, b, c);
console.log(arr1,arr1[4]=== c)// [1, 2, 3, 4,f] true