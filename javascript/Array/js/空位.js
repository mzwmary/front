/**
 * forEach(), filter(), reduce(), every() 和some()都会跳过空位。
 * map()会跳过空位，但会保留这个值
 * join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
 */
var a = [, 2].forEach((v, i) => console.log(i)); // 1
console.log(a); // undefined

var a = [1, , 2].map((v, i) => {
  console.log(i);
  return v * 2;
}); // 0 2
console.log(a); // [2,,4]

var a = [, 2].filter((v, i) => {
  console.log(i);
  return v % 2 === 0;
}); // 1
console.log(a); // [2]

var a = [, 2].some((v, i) => {
  console.log(i);
  return v > 0;
}); // 1
console.log(a); // true

var a = [, 2].every((v, i) => {
  console.log(i);
  return v > 0;
}); // 1
console.log(a); // true

[, 'a'].every(x => x === 'a'); // true

var a = [1, , 2, 3].reduce((v1, v2) => {
  console.log(v1, v2);
  return v1 + v2;
}); // 1 2    3 3
console.log(a); // 6

var a = [, 'a', undefined, null].join('#'); // "#a##"
var a = [, 'a', undefined, null].toString(); // ",a,,"


/**
 * ES6 则是明确将空位转为undefined。
 * ...、Array.from()、copyWithin()、fill()
 * entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
 */
var a = [...[1, , 2]];
console.log(a); // [1, undefined, 2]

var a = Array.from([1, , 2]);
console.log(a); // [1, undefined, 2]

var a = [1, , 2].copyWithin(1, 2);
console.log(a); // [1, 2, 2]

var a = new Array(3).fill('a');
console.log(a); // ["a", "a", "a"]


/**
 * for...of循环也会遍历空位。
 */
let arr = [, , ];
for (let i of arr) {
  console.log(1);
}// 1 1


// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
var a = [...[, 'a'].entries()];
console.log(a);// [[0, undefined],[1, "a"]]

var a = [...[, 'a'].keys()];
console.log(a);// [0, 1]

var a = [...[, 'a'].values()];
console.log(a);// [undefined, "a"]

var a = [, 'a'].find(x => true);
console.log(a);// undefined

var a = [, 'a'].findIndex(x => true);
console.log(a);// 0


//由于空位的处理规则非常不统一，所以建议避免出现空位。