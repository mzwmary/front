var quickSort = function (array) {
  if (!Array.isArray(array))throw new Error('Invalid value used in quickSort')
  if (array.length <= 1) return array;

  var arr = array.slice(0);
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}

var arr = [85, 24, 63, 45, 17, 31, 96, 50];
var newArr = quickSort(arr);
console.log(arr,newArr)