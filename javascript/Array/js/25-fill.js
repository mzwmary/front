/**
 * fill()
 * 作用:使用给定值，填充一个数组
 * 参数:
 *    1、填充的值
 *    2、填充的起始位置(包含)
 *    3、填充的结束位置(不包含)
 */

// fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
var a = ['a', 'b', 'c'].fill(7);// [7, 7, 7]
var b = new Array(3).fill(7);// [7, 7, 7]
console.log(a, b);

var arr = ["a", "b", "c"];
var a = arr.fill(7, 1, 2);
console.log(a);// ["a", 7, "c"]

// 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
var arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
console.log(arr);//[{name: "Ben"},{name: "Ben"},{name: "Ben"}]

var arr = new Array(3).fill([]);
arr[0].push(5);
console.log(arr);// [[5], [5], [5]]