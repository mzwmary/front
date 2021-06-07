var a = [1, 2, 3, 4, 5]

var b = a.splice(1, 1) 
console.log(a, b) // [1, 3, 4, 5] [2]

var c= a.splice(1,0)
console.log(a, c) // [1, 3, 4, 5] []

var d = a.splice(3)
console.log(a, d) // [1, 3, 4] [5]

var e = a.splice(3)
console.log(a, e) // [1, 3, 4] []

var f = a.splice(-1)
console.log(a, f) // [1, 3] [4]

var g = a.splice(-3)
console.log(a, g) // [] [1, 3]

var a = [1, 2, 3, 4, 5]

var b = a.splice(0, 0, 'a', 'b')
console.log(a, b) // ["a", "b", 1, 2, 3, 4, 5] []

var c = a.splice(0, 1, 'c')
console.log(a, c) // ["c", "b", 1, 2, 3, 4, 5] ["a"]

var d = a.splice()
console.log(a,d) // ["c", "b", 1, 2, 3, 4, 5] []