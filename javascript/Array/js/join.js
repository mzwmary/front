var a = [1, 2, 3]
var b = a.join() // 1,2,3
var c = a.join(" ") // 1 2 3
var d = a.join("") // 123


var aa = new Array(5)
var bb = aa.join("-") // "----"
var cc = aa.join(" ");// "    "
console.log(a, b, c, d, aa, bb, cc);// [1, 2, 3] "1,2,3" "1 2 3" "123" (5) [empty × 5] "----"

var a = [1, [2, [3, 4], 5],true,null,undefined,NaN]
var b = a.join()
var c = a.join(['y'])
console.log(a, b, c);// [1, Array(3), true, null, undefined, NaN] "1,2,3,4,5,true,,,NaN"
// "1y2,3,4,5ytrueyyyNaN"

