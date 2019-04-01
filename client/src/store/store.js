import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


  const store = new Vuex.Store({
  state: {
    pinValArray:[],
    sensorCodeArray:[]
  },
  mutations: {
   pinValUpdate(state,{pin,val}){
   	state.pinValArray[pin] = val
   },
  },
  getters: {
    pinValArray(state,{pin})
     { 
     	if(pin > 1){
     		return state.pinValArray[pin]
     	}
     	return state.pinValArray
     },
  },
  actions:{
  	pinValUpdate(context,{pin,val}){
   		context.commit('pinValUpdate',{pin,val});
  	}
  },
   plugins: [createPersistedState()]
})
export {store}