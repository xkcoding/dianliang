import Vue from 'vue'
import DL from 'pages/main/main'
import router from './router'
import iView from 'iview'
import lodash from 'lodash'
import moment from 'moment'
import axios from 'axios'
import $ from 'jquery'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import 'common/stylus/index.styl'

Vue.prototype.$jquery = $
Vue.prototype.$lodash = lodash
Vue.prototype.$moment = moment
Vue.prototype.$http = axios

Vue.config.productionTip = false
iView.LoadingBar.config({
  color: '#ffffff',
  failedColor: '#ff0000'
})
Vue.use(iView)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(DL),
  router,
  data: {
    eventHub: new Vue()
  }
})
