var a = [1]
var obj = {name:"wyq"}
var b = a.every(function (v, i, arr) {
  console.log(v,i,arr,this)// 1 0 [1] {name: "wyq"}
}, obj)
console.log(b)// false

var b = a.some(function (v, i, arr) {
  console.log(v,i,arr,this)// 1 0 [1] {name: "wyq"}
},obj)
console.log(b)// false


var a = [1, 2, 3, 4, 5,,7]
var b = a.every(function (v) {
  return v < 10
})
console.log(b) // true

var b = a.every(function (v) {
  return v%2 == 0
})
console.log(b)// false

var b = a.some(function (v) {
  console.log(v) // 1  2
  return v%2 == 0
})
console.log(b)// true

var b = a.some(isNaN)
console.log(b) // false




var a = [1, , 2]
var b = a.every(function (v) {
  console.log(v) // 1 2
  return true
})
console.log(b)// true

var b = a.some(function (v) {
  console.log(v)// 1
  return true
})
console.log(b)// true