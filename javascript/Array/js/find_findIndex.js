/**
 * find()
 * 作用:找出第一个符合条件的数组成员
 * 参数:1、一个回调函数
 *     所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
 *     如果没有符合条件的成员，则返回undefined。
 *     2、回调函数中的this对象指向
 * 回调函数参数:value, index, arr
 * 目的:弥补了数组的indexOf方法的不足
 */
var a = [1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
}); // 10
console.log(a);



/**
 * findIndex()
 * 作用:返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
 */
var a = [1, 5, 10, 15].findIndex(function (value, index, arr) {
  return value > 9;
}); // 2
console.log(a);


// indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0