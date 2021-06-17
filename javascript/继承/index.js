/**
 * 原型链继承
 */
function Person(name) {
  this.name = name;
}
Person.prototype.age = 10;

function Per() {
  this.name = "ker";
}
Per.prototype = new Person("Jon");

var per1 = new Per();
console.log(per1.age)

console.log(per1 instanceof Person)