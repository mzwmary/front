var a = [1]
var obj = {name:'wyq'}
var b = a.filter(function (v,i,arr) {
  console.log(v,i,arr,this)
}, obj)
// 1 0 [1] {name: "wyq"}


var a = [1, 2]
var b = a.filter(function (v,i) {
  return v%2 == 0
})
console.log(b)// [2]


var a = [1, 2, , 3, undefined, null,NaN,false,true]
var b = a.filter(function (v) {
  console.log(v) // 1 2 3 undefined null NaN false true
  return true
})
console.log(b)// [1, 2, 3, undefined, null, NaN, false, true]


var b = a.filter(function (v) {
  return v!==undefined && v!==null && isNaN(v) == false
})
console.log(b)// [1, 2, 3, false, true]