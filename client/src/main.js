// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import './assets/css/general.css'
import '@mdi/font/css/materialdesignicons.css'

import io from 'socket.io-client';
 
const socket = io('http://192.168.1.247:3001/');
 socket.on('connect', function(){ alert("connected")});

Vue.use(Vuetify,{
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.config.ignoredElements = ['block','xml']



/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components:  {App} ,
	template: '<App/>'
})


