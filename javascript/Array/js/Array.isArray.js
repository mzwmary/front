// 判断是否是类数组
function isArrayLike(o) {
  if (
    o &&
    typeof o === "object" &&
    isFinite(o.length) &&
    o.length >= 0 &&
    o.length === Math.floor(o.length) &&
    o.length < 4294967296
  ) return true;
  else return false;
}