// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import './assets/css/general.css'
import Clipboard from 'v-clipboard'
import VueHighlightJS from 'vue-highlightjs'
 import AsyncComputed from 'vue-async-computed'
import Vuex from 'vuex'
import {store} from './store/store.js'
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import '@mdi/font/css/materialdesignicons.css'
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';


Vue.use(Clipboard)
Vue.use(Vuex)
Vue.use(AsyncComputed)


const socketInstance = io('http://192.168.1.247:3001', {
	transports: ['websocket'],
});


Vue.use(VueSocketio,socketInstance) ;

Vue.use(Vuetify,{
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.config.ignoredElements = ['block','xml']
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components:  {App} ,
	template: '<App/>',
	store
	
})


