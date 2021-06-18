var a = [33, 4, 1111, 222, undefined];
var arr = a;

var b = a.sort() // 字母表排序: [1111, 222, 33, 4, undefined]
console.log(a,arr)

var d = a.sort(function (a, b) { console.log(a, b,arr); return b - a }); // [1111, 222, 33, 4, undefined]
console.log(d)

var c = a.sort(function (a, b) { console.log(a, b,arr); return a - b }); // [4, 33, 222, 1111, undefined]
console.log(arr) 
console.log(a === b && a === c && a === d, a===arr)// true


Array.prototype.mySort = function (callback) {
  let array = this;
  if (!Array.isArray(array)) throw new Error('Invalid value used in quickSort')
  if (array.length <= 1) return array;

  if (to - from <= 10) {
    InsertionSort(a, from, to);
    return;
  }
  if (to - from > 1000) {
    third_index = GetThirdIndex(a, from, to);
  } else {
    third_index = from + ((to - from) >> 1);
  }

}
// <=10 插入排序
function InsertionSort(a, from, to) {
  let array = a;
  for (let i = from; i <= to - from; i++) {
    let j = i;
    while (j > 0) {
      console.log(j)
      console.log(array[j], array[j - 1])
      console.log(array)
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        j--;
      } else {
        break;
      }
    }
  }
  return array
}
// >10 <=1000 快速排序
function quickSort(array) {
  if (!Array.isArray(array)) throw new Error('Invalid value used in quickSort')
  if (array.length <= 1) return array;

  var arr = array.slice(0);
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}
// > 1000 插入+快排
function GetThirdIndex(a, from, to) {
  var t_array = new Array();
  var increment = 200 + ((to - from) & 15);
  var j = 0;
  from += 1;
  to -= 1;
  for (var i = from; i < to; i += increment) {
    t_array[j] = [i, a[i]];
    j++;
  }
  console.log(t_array)
  t_array.sort(function (a, b) {
    return comparefn(a[1], b[1]);
  });
  var third_index = t_array[t_array.length >> 1][0];
  return third_index;
}
function comparefn(a,b) {
  if (a === b) return 0;
  if (a > b) return 1;
  if (a < b)return -1;
}

// var arr = [];
// var i = 0;
// var length = Math.floor(Math.random() * 10000);
// while (i < length) {
//   arr[i] = Math.floor(Math.random() * length);
//   i++;
// }
// console.log(length, arr);
// GetThirdIndex(arr, 0, i);