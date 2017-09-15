import Vue from 'vue'
import DL from 'pages/dianliang'
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
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(DL),
  data: {
    eventHub: new Vue(),
    charts: []
  }
})
