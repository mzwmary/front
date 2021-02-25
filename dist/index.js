
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./view/index.js":
/*!***********************!*\
  !*** ./view/index.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue/dist/vue.js */ \"./node_modules/vue/dist/vue.js\");\n/* harmony import */ var vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n // 'vue' runtime-only 的 vue包\n\n\nvue_dist_vue_js__WEBPACK_IMPORTED_MODULE_0___default().use(vue_router__WEBPACK_IMPORTED_MODULE_1__.default);\nvar homeComponent = {\n  template: '<h2>我是home页面</h2>'\n};\nvar newsComponent = {\n  template: '<h2>我是news页面</h2>'\n};\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_1__.default({\n  routes: [{\n    path: '/home',\n    component: homeComponent\n  }, {\n    path: '/news',\n    component: newsComponent\n  }]\n});\nnew (vue_dist_vue_js__WEBPACK_IMPORTED_MODULE_0___default())({\n  el: '#app',\n  data: {\n    msg: '哈哈哈哈哈哈'\n  },\n  router: router\n}); // import './index.css'\n// // import 'bootstrap/dist/css/bootstrap.min.css'\n// // console.log('我是index.js')\n// function getComponent() {\n//   return import('jquery').then(({ default: $ }) => {\n//     return $('<div></div>').html('main')\n//   })\n// }\n// window.onload = function () {\n//   document.getElementById('btn').onclick = function () {\n//     getComponent().then(item => {\n//       item.appendTo('body')\n//     })\n//   }\n// }\n// import moment from 'moment'\n// import 'moment/locale/zh-cn'\n// moment.locale('zh-CN')\n// console.log(moment().subtract(6, 'days').calendar())//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi92aWV3L2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQvLi92aWV3L2luZGV4LmpzP2Q4NzQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tICd2dWUvZGlzdC92dWUuanMnIC8vICd2dWUnIHJ1bnRpbWUtb25seSDnmoQgdnVl5YyFXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInXG5WdWUudXNlKFZ1ZVJvdXRlcik7XG5jb25zdCBob21lQ29tcG9uZW50ID0ge1xuICB0ZW1wbGF0ZTogJzxoMj7miJHmmK9ob21l6aG16Z2iPC9oMj4nXG59XG5jb25zdCBuZXdzQ29tcG9uZW50ID0ge1xuICB0ZW1wbGF0ZTogJzxoMj7miJHmmK9uZXdz6aG16Z2iPC9oMj4nXG59XG5jb25zdCByb3V0ZXIgPSBuZXcgVnVlUm91dGVyKHtcbiAgcm91dGVzOiBbXG4gICAge1xuICAgICAgcGF0aDogJy9ob21lJyxcbiAgICAgIGNvbXBvbmVudDogaG9tZUNvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9uZXdzJyxcbiAgICAgIGNvbXBvbmVudDogbmV3c0NvbXBvbmVudFxuICAgIH1cbiAgXVxufSlcbm5ldyBWdWUoe1xuICBlbDogJyNhcHAnLFxuICBkYXRhOiB7XG4gICAgbXNnOiAn5ZOI5ZOI5ZOI5ZOI5ZOI5ZOIJ1xuICB9LFxuICByb3V0ZXJcbn0pXG5cbi8vIGltcG9ydCAnLi9pbmRleC5jc3MnXG4vLyAvLyBpbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcydcbi8vIC8vIGNvbnNvbGUubG9nKCfmiJHmmK9pbmRleC5qcycpXG4vLyBmdW5jdGlvbiBnZXRDb21wb25lbnQoKSB7XG4vLyAgIHJldHVybiBpbXBvcnQoJ2pxdWVyeScpLnRoZW4oKHsgZGVmYXVsdDogJCB9KSA9PiB7XG4vLyAgICAgcmV0dXJuICQoJzxkaXY+PC9kaXY+JykuaHRtbCgnbWFpbicpXG4vLyAgIH0pXG4vLyB9XG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICBnZXRDb21wb25lbnQoKS50aGVuKGl0ZW0gPT4ge1xuLy8gICAgICAgaXRlbS5hcHBlbmRUbygnYm9keScpXG4vLyAgICAgfSlcbi8vICAgfVxuLy8gfVxuXG5cbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuLy8gaW1wb3J0ICdtb21lbnQvbG9jYWxlL3poLWNuJ1xuLy8gbW9tZW50LmxvY2FsZSgnemgtQ04nKVxuLy8gY29uc29sZS5sb2cobW9tZW50KCkuc3VidHJhY3QoNiwgJ2RheXMnKS5jYWxlbmRhcigpKSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQU5BO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./view/index.js\n");

/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm.js":
/*!*********************************************************************************************!*\
  !*** delegated ./node_modules/vue-router/dist/vue-router.esm.js from dll-reference vue_dll ***!
  \*********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vue_dll */ "dll-reference vue_dll"))(345);

/***/ }),

/***/ "./node_modules/vue/dist/vue.js":
/*!***************************************************************************!*\
  !*** delegated ./node_modules/vue/dist/vue.js from dll-reference vue_dll ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vue_dll */ "dll-reference vue_dll"))(94);

/***/ }),

/***/ "dll-reference vue_dll":
/*!**************************!*\
  !*** external "vue_dll" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = vue_dll;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./view/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;