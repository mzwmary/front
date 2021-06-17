/**
 * includes()
 * 作用:返回一个布尔值，表示某个数组是否包含给定的值，
 *    与字符串的includes方法类似
 *    能判断NaN;
 * 参数:
 *    1、需要搜索的值
 *    2、起始搜索的位置,默认从0开始,
 *      可以为负数,负数大于数组长度,从0开始
 * 目的:解决indexOf()缺陷
 *     不能判断NaN
 *     返回位置,没有返回-1
 */
var a = [1, 2, 3].includes(2);
var b = [1, 2, 3].includes(4);
var c = [1, 2, NaN].includes(NaN);
console.log(a, b, c); // true false true

var arr = [2, 3, 5, 2, 6];
var a = arr.includes(2, 1);
var b = arr.includes(2, -1);
var c = arr.includes(2, -2);
var d = arr.includes(2, -9);
console.log(a, b, c, d); // true false true true

var a = arr.indexOf(1);
var b = arr.indexOf(2);
console.log(a, b); // -1 0

var a = [NaN].indexOf(NaN);
console.log(a); // -1


// 兼容
const contains = (() =>
  Array.prototype.includes ?
  (arr, value) => arr.includes(value) :
  (arr, value) => arr.some(el => el === value)
)();