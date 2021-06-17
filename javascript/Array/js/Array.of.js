/**
 * Array.of()
 * 作用:将一组值,转化为数组
 * 目的:弥补Array()的缺陷,因为参数个数的不同，会导致Array()的行为有差异。
 * 基本上可以用来替代Array()或new Array()
 */
var a = Array.of();
var b = Array.of(3);
var c = Array.of(1, 2, 3);
var d = Array.of(1.2);
console.log(a, b, c, d);// [] [3] [1, 2, 3] [1.2]

var a = Array();
var b = Array(3);
var c = Array(1, 2, 3);
var d = Array.of(1.2);
console.log(a, b, c, d);// [] [empty × 3] [1, 2, 3] [1.2]

// 模拟实现
function ArrayOf(){
  return [].slice.call(arguments);
}