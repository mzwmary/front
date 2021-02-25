import Vue from 'vue/dist/vue.js' // 'vue' runtime-only 的 vue包
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const homeComponent = {
  template: '<h2>我是home页面</h2>'
}
const newsComponent = {
  template: '<h2>我是news页面</h2>'
}
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: homeComponent
    },
    {
      path: '/news',
      component: newsComponent
    }
  ]
})
new Vue({
  el: '#app',
  data: {
    msg: '哈哈哈哈哈哈'
  },
  router
})

// import './index.css'
// // import 'bootstrap/dist/css/bootstrap.min.css'
// // console.log('我是index.js')
// function getComponent() {
//   return import('jquery').then(({ default: $ }) => {
//     return $('<div></div>').html('main')
//   })
// }
// window.onload = function () {
//   document.getElementById('btn').onclick = function () {
//     getComponent().then(item => {
//       item.appendTo('body')
//     })
//   }
// }


// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-CN')
// console.log(moment().subtract(6, 'days').calendar())