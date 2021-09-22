import Vue from 'vue'
import App from './App'

import Tool from './common/util.js'

import {sendRequest} from './common/api.js'


Vue.prototype.$Tool = Tool


Vue.prototype.$sendRequest = sendRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
