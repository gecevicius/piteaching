
import {store} from '../../store/store.js'; 
import Element from './element.js';

var EventEmitter = require('events');

var setCalls = 0;

function initApi(interpreter, scope) {

//alert
var wrapper = function(obj) {
  console.log('interpreter alert fn:')
  console.log(obj)

  if(typeof obj === 'object' && obj !== null && obj!== undefined){
    obj = obj.data
  }
  return interpreter.createPrimitive(window.alert(obj));
};
interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));




  //prompt
  wrapper = function(text) {
    return prompt(text)
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));

  /* GPIO Api */
  wrapper = function(item,code) {
    console.log(code)
    var watcher = new EventEmitter();
    var self = this;
    item.toggleInterpreterListener(watcher);
    watcher.on('watcherUpdate',function(){
      interpreter.appendCode(code.data);
      console.log(code.data)
      if (interpreter.step()) { 
        setTimeout(function(){
          self.runner()

        }, 35); 
      } 
    })
  };
  interpreter.setProperty(scope, 'enableWatcher',
    interpreter.createNativeFunction(wrapper));

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
      console.log("error:"+e.stack);
    }
  };
  interpreter.setProperty(scope, 'runner',
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
        console.log(gpio)
        console.log(output)
        var elemArray = store.getters.elem
        if(gpio != 'undefined' && gpio  != null ) {
         gpio.setOutput(output.data) 
       }
       else{
        alert('gpio variable is not initiated. please create a variable for this pin to use it!')
        return false
      }
    };
    interpreter.setProperty(scope, 'setOutput',
      interpreter.createNativeFunction(wrapper));

      //Set Pin Output
      wrapper = function(gpio,output) {
        console.log(gpio)
        console.log(output)
        var elemArray = store.getters.elem
        if(gpio!= 'undefined' && gpio != null ) {
         gpio.toggleOutput(); 
       }
       else{
        alert('gpio variable is not initiated. please create a variable for this pin to use it!')
        return false
      }
    };
    interpreter.setProperty(scope, 'toggleOutput',
      interpreter.createNativeFunction(wrapper));

    wrapper = function(pin,type) {
      console.log("interpreter pin:")
      var pinData = JSON.parse(pin.data)
     store.dispatch('pushElem',{pin:pinData,type:type.data})
     console.log(store.getters.elem[pinData.rpin])
     return store.getters.elem[pinData.rpin];
   };
   interpreter.setProperty(scope, 'newElem',
    interpreter.createNativeFunction(wrapper));

      //read gpio pin val 
      var wrapper =  function(gpio,sense,callback){
        return gpio.getVal()
      };
      interpreter.setProperty(scope, 'readGpio', interpreter.createAsyncFunction(wrapper));


      var wrapper = function(d, next) {
        window.setTimeout(function() {
          next();
        }, d);
      };
      interpreter.setProperty(scope, 'wait',
        interpreter.createAsyncFunction(wrapper));

      
    }


    export default initApi;