import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store'
import config from './config/lxjConfig'
import fontSize from './common/js/fontSize.js'
import axios from './common/js/http.js'
import lxjTip from './../static/plugin/lxjTip.js'

import we from 'we-vue'
import 'we-vue/lib/style.css'
Vue.use(we)

Vue.config.productionTip = false
/* eslint-disable no-new */
var vm = new Vue({
	el: '#app',
	router,
	store
});
