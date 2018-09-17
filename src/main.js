// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import echarts from 'echarts'
import router from './router'
import store from './store'
import './assets/js/jquery.js'
import './assets/css/reset.css'
import './assets/css/puhui.css'

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$url = 'http://bi.jieyuechina.com/api/saasbi/puhui/ph/list'
// Vue.prototype.$url = 'http://172.18.101.118:10000/saasbi/puhui/ph/list'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
