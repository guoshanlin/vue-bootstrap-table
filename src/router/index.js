import Vue from 'vue'
import Router from 'vue-router'
import config from '../../config'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
  mode: 'history',
  routes: [
    { path: '*', component: (resolve) => require(['../components/404'], resolve) },
    {path: '/', redirect: '/index'},
    {
      path: '/index',
      name: 'test',
      component: (resolve) => require(['../view/test'], resolve)
    }
  ]
})
