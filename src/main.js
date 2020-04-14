import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import LazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(LazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
// FastClick.attach('document.body')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
