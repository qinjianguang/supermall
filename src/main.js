import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

