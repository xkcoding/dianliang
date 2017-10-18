import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['pages/index/index'], resolve)
    },
    {
      path: '/province',
      name: 'province',
      component: (resolve) => require(['pages/province/province'], resolve)
    },
    {
      path: '/chart',
      name: 'chart',
      component: (resolve) => require(['pages/chart/chart'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
