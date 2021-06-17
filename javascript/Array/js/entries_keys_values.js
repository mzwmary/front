/**
 * entries()，keys()、values()
 * 作用:用于遍历数组。它们都返回一个遍历器对象
 * 可以用for...of循环进行遍历,可以手动调用遍历器对象的next方法，进行遍历。
 * keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
 */
var arr = [1, 2, 3];
var a = arr.entries();
var b = arr.keys();
var c = arr.values();
console.log(a, b, c);// Array Iterator {} Array Iterator {} Array Iterator {}


for (let [index,elem] of a) {
  console.log(index, elem);
}
// 0 1
// 1 2
// 2 3
// 循环一次,不在循环
console.log(a.next().value)// undefined
for (let [index, elem] of a) {// 不执行
  console.log(111)
  console.log(index, elem);
}


let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']