import {APIService} from '../../services/APIService';
import axios from 'axios';

import {store} from '../../store/store.js'; 
import Element from './element.js';

var EventEmitter = require('events');

var apiService = new APIService();
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
        item.toggleInterpreterListener(watcher);
        watcher.on('watcherUpdate',function(){
          interpreter.appendCode(code.data);
          console.log(code.data)
          interpreter.run()
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
      wrapper = function(pin,output) {
        
        setTimeout(function(){
          if(store.getters.elem[pin] != 'undefined' && store.getters.elem[pin] != null ) {
            store.getters.elem[pin].setOutput(output) 
          }
          else{
            alert('pin at ' + pin + ' is not initiated. please create a variable for this pin to use it!')
            return false
          }
        }, 500 * setCalls
          )
        setCalls = setCalls+ 1;
      };
      interpreter.setProperty(scope, 'setOutput',
        interpreter.createNativeFunction(wrapper));


      wrapper = function(pin,type) {
       store.dispatch('pushElem',{pin:pin.data,type:type.data})
       console.log(store.getters.elem[pin.data])
       return store.getters.elem[pin.data];
      };
      interpreter.setProperty(scope, 'newElem',
        interpreter.createNativeFunction(wrapper));

      //read gpio pin val 
   var wrapper =  function(pin,sense,callback){
      return store.getters.elem[pin]
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