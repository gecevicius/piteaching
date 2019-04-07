import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Element from '../assets/js/element.js'

Vue.use(Vuex)


  const store = new Vuex.Store({
  state: {
    elemsArray:[],
    sensorCodeArray:[],
    blocklyWs:''
  },
  mutations: {
   pushElem(state,{newElem}){
   	console.log(newElem)
   		state.elemsArray[newElem.getPin()] = newElem;
   },
   blocklyWs(state,blocklyWs){
   		state.blocklyWs = blocklyWs;
   },
  },
  getters: {
    elem(state,{pin})
     { 
     	if(pin >= 0){
     		return state.elemsArray[pin]
     	}
     	return state.elemsArray
     },
     blocklyWs(state,{pin})
     { 
     	return state.blocklyWs
     },
  },
  actions:{
  	pushElem(context,{pin,type}){
  		//
  		if(pin !='undefined' && type != null){
  			if(this.state.elemsArray[pin] == undefined || this.state.elemsArray[pin] == null){
	  			var newElem = new Element(pin,type);
	  			console.log(pin)
	   			context.commit('pushElem',{newElem});
   			}
   			else{
   				alert("Pin is already taken. Clear pin cache or use another pin.")
   			}
   		}
   		else{
   			alert('Error with pin value or gpio module type')
   		}
  	},
  	blocklyWs(context,{blocklyWs}){
  		console.log(blocklyWs)
  		context.commit('blocklyWs',{blocklyWs});
  	}
  },
  /*plugins: [
  new VuexPersistence(
  	{supportCircular: true}
  	).plugin]*/
})
export {store}