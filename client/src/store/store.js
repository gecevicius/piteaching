import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Element from '../assets/js/element.js'
import APIService from '../services/APIService';
import Blockly from '../assets/js/CustomBlocks';

var xmlSerializer = new XMLSerializer();

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		elemsArray:[],
		blocklyWs:'',
		noOfElems:0,
		username:''
	},
	mutations: {
		pushElem(state,{newElem}){
			console.log(newElem)
			if(newElem.getType() === 'RGB'){
				var pinList = newElem.getMultiPins();
				for (var pin in pinList){
					console.log(pinList[pin])
					Vue.set(state.elemsArray,pinList[pin],newElem);
				}
				console.log(state.elemsArray[pinList.rpin]);
			}
			else{
				Vue.set(state.elemsArray,newElem.getPin(),newElem);
			}
			
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
  		//
  		if(pin !=undefined && type != null){
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
  		console.log(blocklyWs)
  		context.commit('blocklyWs',{blocklyWs});
  		var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  		
  		var xmlString = xmlSerializer.serializeToString(xmlDom)
  		console.log(xmlString)
  		APIService.shareWorkspace(xmlString);
  	},
  	close(context,{pin}){
  		if(this.state.noOfElems > 0){
  			console.log(pin)
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