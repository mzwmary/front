(function (modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./view/index.js");
})
  ({
    
      "./view/index.js":
        (function (module, exports, __webpack_require__) {
          eval(`let news = __webpack_require__("./view/news.js");

console.log(news.content);`);
        }),
    
      "./view/news.js":
        (function (module, exports, __webpack_require__) {
          eval(`const message = __webpack_require__("./view/message.js");

module.exports = {
  content: "今天loader1是:" + message.content
};`);
        }),
    
      "./view/message.js":
        (function (module, exports, __webpack_require__) {
          eval(`module.exports = {
  content: new Date()
};`);
        }),
    
  });