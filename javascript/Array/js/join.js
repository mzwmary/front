var a = [1, 2, 3]
var b = a.join() // 1,2,3
var c = a.join(" ") // 1 2 3
var d = a.join("") // 123


var aa = new Array(5)
var bb = aa.join("-") // "----"
console.log(a, b, c, d, aa, bb)// [1, 2, 3] "1,2,3" "1 2 3" "123" (5) [empty × 5] "----"

var a = [1, [2, [3, 4], 5],true,null,undefined,NaN]
var b = a.join()
console.log(a,b)// "1,2,3,4,5,true,,,NaN"