// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import './assets/css/general.css'

import AsyncComputed from 'vue-async-computed'

import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(AsyncComputed)
import {store} from './store/store.js'

import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socketInstance = io('http://192.168.1.247:3001', {
	transports: ['websocket'],
});



Vue.use(VueSocketio,socketInstance) ;
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify,{
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.config.ignoredElements = ['block','xml']



/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components:  {App} ,
	template: '<App/>',
	store
	
})


