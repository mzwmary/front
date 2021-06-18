/**
 * flat()
 * 作用:数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。
 *    返回一个新数组，对原数据没有影响。
 * 参数:一个整数，表示想要拉平的层数，默认为1。
 *    不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
 * 如果原数组有空位，flat()方法会跳过空位。
 */

// 一个整数，表示想要拉平的层数，默认为1。
var a = [1, 2, [3, 4]].flat();// [1, 2, 3, 4]
var b = [1, 2, [3, [4, 5]]].flat();// [1, 2, 3, [4, 5]] 
var c = [1, 2, [3, [4, 5]]].flat(2);// [1, 2, 3, 4, 5]
console.log(a, b, c);

// 不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
var a = [1, [2, [3]]].flat(Infinity);
console.log(a);// [1, 2, 3]

// 如果原数组有空位，flat()方法会跳过空位。
var a = [1, 2, , 4, 5].flat();
console.log(a);// [1, 2, 4, 5]



/**
 * flatMap()
 * 作用:对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。
 * 该方法返回一个新数组，不改变原数组。
 * 
 * 语法:arr.flatMap(function callback(currentValue[, index[, array]]) {
 *        // ...
 *     }[, thisArg])
 */
var a = [2, 3, 4].flatMap((x) => x * 2);
console.log(a);// [4, 6, 8]

var b = [2, 3, 4].flatMap((x) => [x, x * 2]);// // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
console.log(b);// [2, 4, 3, 6, 4, 8]