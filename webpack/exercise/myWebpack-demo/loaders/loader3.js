module.exports = function (source, obj) {
  console.log('obj')
  source.replace(/今天/g, '今天loader3')
  return source.replace(/今天/g, '今天'+ obj.name)
}