import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Element from '../assets/js/element.js'


Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		elemsArray:[],
		blocklyWs:'',
		noOfElems:0
	},
	mutations: {
		pushElem(state,{newElem}){
			console.log(newElem)
			if(newElem.getType === 'RGB'){
				state.elemsArray[newElem.getPin().rpin] = newElem;
			}
			else{
				state.elemsArray[newElem.getPin()] = newElem;
			}
			
		},
		clear(state,{item}){
			item.close();
			state.elemsArray[item.getPin()] = null;
		},
		blocklyWs(state,blocklyWs){
			state.blocklyWs = blocklyWs;
		},
		
		noOfElems(state,{noOfElems}){
			state.noOfElems = noOfElems;
		}
	},
	getters: {
		elem(state,{pin})
		{ 
			if(pin >= 0){
				return state.elemsArray[pin];
			}
			return state.elemsArray;
		},
		blocklyWs(state,{pin})
		{ 
			return state.blocklyWs;
		},
		getNoOfElems(state){
			return state.noOfElems;
		}
	},
	actions:{
		pushElem(context,{pin,type}){
  		//
  		if(pin !='undefined' && type != null){
  			if(this.state.elemsArray[pin] == undefined || this.state.elemsArray[pin] == null ){
  				var newElem = new Element(pin,type);
  				var noOfElems = this.state.noOfElems + 1;
  				console.log(noOfElems);
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
  		context.commit('blocklyWs',{blocklyWs});
  	},
  	close(context){
  		if(this.state.noOfElems > 0){
  			var self = this;
  			this.state.elemsArray.forEach(function(item){
  				console.log(item);
  				var noOfElems = self.state.noOfElems - 1
  				context.commit('noOfElems',{noOfElems});
  				context.commit('clear',{item});
  			})
  		}
  	}
  },
  /*plugins: [
  new VuexPersistence(
  	{supportCircular: true}
  	).plugin]*/
  })
export {store}