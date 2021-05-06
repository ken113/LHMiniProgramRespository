import Vue from 'vue'
import App from './App'

import Tool from './common/util.js'
Vue.prototype.$Tool = Tool

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
