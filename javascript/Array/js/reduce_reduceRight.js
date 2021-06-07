var a = [11, 22, 33, 44, 55]
var b = a.reduce(function (a, v, i, arr) {
  console.log(
    a, // a undefined undefined undefined
    v, // 11 22 33 44 55
    i// 0 1 2 3 4
  )
}, 'a')
console.log(b) // undefined

var b = a.reduceRight(function (a, v, i, arr) {
  console.log(
    a, // a undefined undefined undefined
    v, // 55 44 33 22 11
    i// 4 3 2 1 0
  )
}, 'a')
console.log(b) // undefined


var b = a.reduce(function (a, v) {
  console.log(
    a,// 11 undefined undefined undefined
    v,// 22 33 44 55
  )
})
console.log(b)// undefined

var b = a.reduceRight(function (a, v) {
  console.log(
    a,// 55 undefined undefined undefined
    v,// 44 33 22 11
  )
})
console.log(b)// undefined



//Uncaught TypeError: Reduce of empty array with no initial value
var a = []
// var b = a.reduce(function () { })

var b = a.reduce(function (a) {
  console.log(a) // callback函数不执行
}, 'a')
console.log(b)// a

var a = [1]
var b = a.reduce(function (a) {
  console.log(a)
})
console.log(b)// 1


var a = [1, 2, 3, 4, 5]
var b = a.reduce(function (x, y) {
  console.log(x) // 1 3 6 10
  return x + y
})
console.log(b)// 15

var max = a.reduce(function (x, y) {
  return (x>y)?x:y
})
console.log(max)// 5