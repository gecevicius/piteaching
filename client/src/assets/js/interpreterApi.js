
import {store} from '../../store/store.js'; 
import Element from './element.js';

var EventEmitter = require('events');

var setCalls = 0;

function initApi(interpreter, scope) {

//alert
var wrapper = function(obj) {
  if(typeof obj === 'object' && obj !== null && obj!== undefined){
    obj = obj.data
  }
  store.commit('piMessages',{type:'Print block',message:obj});
};
interpreter.setProperty(scope, 'print', interpreter.createNativeFunction(wrapper));


  //prompt
  wrapper = function(text) {
    return prompt(text)
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));

  /* GPIO Api */

  //runner, currently unused
  wrapper = function() {
    var self = this;
    try{
      if (interpreter.step()) { 
        setTimeout(function(){
          self.runner()

        }, 35); 
      } 
    }
    catch(e){

    }
  };
  interpreter.setProperty(scope, 'runner',
    interpreter.createNativeFunction(wrapper));

  //watcher function. - runs code whenever watcherUpdate is triggered ( from element.js)
    wrapper = function(item,code) {
    var watcher = new EventEmitter();
    item.toggleInterpreterListener(watcher);
    watcher.on('watcherUpdate',function(){

      interpreter.appendCode(code.data);
      window.setTimeout(function(){
        interpreter.run()
     
      },300)
      
    })
  };
  interpreter.setProperty(scope, 'enableWatcher',
    interpreter.createNativeFunction(wrapper));

      //block highlight
      wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

      /* GPIO Api */

      //Set Pin Output
      wrapper = function(gpio,output) {
        var elemArray = store.getters.elem
        if(gpio != 'undefined' && gpio  != null ) {
         gpio.setOutput(output.data) 
       }
       else{
        store.commit('piMessages',{type:'ERROR',message:"Initiate the Element before setting an output!"});
        return false
      }
    };
    interpreter.setProperty(scope, 'setOutput',
      interpreter.createNativeFunction(wrapper));

      //Set Pin Output
      wrapper = function(gpio,output) {
        if(gpio!= 'undefined' && gpio != null ) {
          console.log(gpio)
         gpio.toggleOutput(); 
       }
       else{
       store.commit('piMessages',{type:'ERROR',message:"Initiate the Element before setting an output!"});
        return false
      }
    };
    interpreter.setProperty(scope, 'toggleOutput',
      interpreter.createNativeFunction(wrapper));

    //new element function
    wrapper = function(pin,type) {
      if(type ==='RGB'){
      var pinData = JSON.parse(pin.data)
      store.dispatch('pushElem',{pin:pinData,type:type.data})
      
      return store.getters.elem[pinData.rpin];
      }
      else {
        var pinData = pin.data;
        store.dispatch('pushElem',{pin:pinData,type:type.data})
        return store.getters.elem[pinData];
      }
    };
    interpreter.setProperty(scope, 'newElem',
      interpreter.createNativeFunction(wrapper));

      //read gpio pin val 
      var wrapper =  function(gpio){
      return gpio.getVal()
      };
      interpreter.setProperty(scope, 'readGpio', interpreter.createNativeFunction(wrapper));


      var wrapper = function(d, next) {
        window.setTimeout(function() {
          store.commit('piMessages',{type:'Waiting',message:"Waiting for ..."+d +" seconds"});
          next();
        }, d * 1000);
      };
      interpreter.setProperty(scope, 'wait',
        interpreter.createAsyncFunction(wrapper));

      
    }


    export default initApi;