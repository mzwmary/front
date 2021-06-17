/**
 * Array.from()
 * 作用: 将两类对象转化为真正的数组
 * 1、类似数组的对象（array-like object）
 * 2、可遍历（iterable）的对象
 */

// 将类似数组的对象转成数组
var arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
var arr2 = Array.from(arrayLike); // ['a', 'b', 'c']


// 将可遍历（iterable）的对象转成数组
// NodeList
// arguments
// 字符串
// Set and Map


// 转真正数组返回一模一样的数组,但不是原数组
var arr = [1, 2, 3];
var arr1 = Array.from(arr);
console.log(arr1, arr === arr1); // [1, 2, 3] false


// 与...相比,转化数组的不同
// ...不能转类数组,必需要有Symbol.iterator接口


// 兼容
var toArray = obj => Array.from ? Array.from(obj) : obj => [].slice.call(obj);


/**
 * Array.from()参数
 * Array.from(arr, callback)
 * arr: 类数组/可遍历对象
 * callback: 类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
 */
var arr = Array.from([1, 2, 3, 4], x => x * x);
console.log(arr);// [1, 4, 9, 16]

// 相当于
Array.from([1, 2, 3, 4]).map(x => x * x);


/**
 * 可正确处理字符串
 */
 Array.from('string').length