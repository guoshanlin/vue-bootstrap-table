// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'

import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS

import 'bootstrap/dist/css/bootstrap.css' // 使用 CSS
import 'bootstrap/dist/js/bootstrap' // 使用 CSS
import 'bootstrap-table/dist/bootstrap-table.css' // 使用 CSS
import 'bootstrap-table/dist/bootstrap-table' // 使用 CSS
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN' // 使用 CSS
import 'js/common'
import axios from 'axios'
//  公用请求方法
import publicUtils from 'js/publicUtils'
import getwbkUrl from 'js/getwbkUrl'

axios.defaults.baseURL = process.env.API
axios.defaults.withCredentials = true

Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.use(iView)
Vue.use(publicUtils)
Vue.use(getwbkUrl)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
