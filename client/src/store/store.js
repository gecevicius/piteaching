import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Element from '../assets/js/element.js'
import APIService from '../services/APIService';
import Blockly from '../assets/js/CustomBlocks';



Vue.use(Vuex)

const store = new Vuex.Store({

	//initialize state variables
	state: {
		elemsArray:[],
		blocklyWs:'',
		noOfElems:0,
		username:'',
		url:'',
		piMessages:[]
	},

	//perform mutations on those variables
	mutations: {
		url(state,{url}){
			state.url = url;
		},
		piMessages(state,{type,message}){
			state.piMessages.push({type:type,message:message});
		},
		clearPiMessages(state){
			state.piMessages.length = 0;
		},
		pushElem(state,{newElem}){
			if(newElem.getType() === 'RGB'){
				var pinList = newElem.getMultiPins();
				for (var pin in pinList){
					Vue.set(state.elemsArray,pinList[pin],newElem);
				}
			}
			else{
				Vue.set(state.elemsArray,newElem.getPin(),newElem);
			}
			
		},
		username(state,{username}){
			state.username = username;
		},
		remove(state,{pin}){
			if(pin != null){
				var item = this.state.elemsArray[pin];
				item.close();
				Vue.set(state.elemsArray,pin,null)
				state.noOfElems = state.noOfElems - 1;
			}
		},
		close(state){
			state.elemsArray = [];
			state.noOfElems = 0;
		},
		blocklyWs(state,blocklyWs){

			state.blocklyWs = blocklyWs;
		},
		
		noOfElems(state,{noOfElems}){
			state.noOfElems = noOfElems;
		}
	},
	getters: {
		piMessages(state){
			return state.piMessages;
		},
		url(state){
			return state.url;
		},
		elem(state,{pin})
		{ 
			if(pin >= 0){
				return state.elemsArray[pin];
			}
			return state.elemsArray;
		},
		blocklyWs(state)
		{ 

			return state.blocklyWs;
		},
		getNoOfElems(state){
			return state.noOfElems;
		}
	},
	actions:{
		pushElem(context,{pin,type}){
  		//is the pin not taken already?
  		if(pin !=undefined && type != null){
  			if(this.state.elemsArray[pin] == undefined || this.state.elemsArray[pin] == null ){
  				var newElem = new Element(pin,type);
  				var noOfElems = this.state.noOfElems + 1;
  				context.commit('noOfElems',{noOfElems});
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
  		if(blocklyWs !== this.state.blocklyWs){
  			context.commit('blocklyWs',{blocklyWs});
  		}
  	},

  	close(context,{pin}){
  		if(this.state.noOfElems > 0){
  			if(pin != undefined && pin !== "")
  			{

  				context.commit('remove',{pin});

  			}
  			else {
  				
  				context.commit('close');
  			}
  		}
  	}
  },
  /*plugins: [
  new VuexPersistence(
  	{supportCircular: true}
  	).plugin]*/
  })
export {store}