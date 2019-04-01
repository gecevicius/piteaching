import {APIService} from '../../services/APIService';
import axios from 'axios';

import {store} from '../../store/store.js'; 
import Element from './element.js'

var apiService = new APIService();
var setCalls = 0;

function initApi(interpreter, scope) {

//alert
var wrapper = function(obj) {
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
      wrapper = function(pin) {
        console.log(pinValArray[pin])
        return pilValArray[pin]
      };
      interpreter.setProperty(scope, 'getSensor',
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
          apiService.setOutput(pin.data,output.data).then((data) => {
            store.dispatch('pinValUpdate',{pin : pin.data, val : output.data});console.log(store.getters.pinValArray)
          })}, 500 * setCalls
          )
        setCalls = setCalls+ 1;
      };
      interpreter.setProperty(scope, 'setOutput',
        interpreter.createNativeFunction(wrapper));


      wrapper = function(pin,type) {
       var newElem = new Element(pin,type);
       return newElem;
      };
      interpreter.setProperty(scope, 'newElem',
        interpreter.createNativeFunction(wrapper));

      //read gpio pin val from server
   var wrapper =  function(pin,sense,callback){
      console.log(store.state.pinValArray[pin])
      return store.getters.pinValArray[pin]
      /*axios.get("http://192.168.1.247:3000/gpio",{params : {
        "pin" : pin.data,
        "sense" : sense.data.enabled
      }}
      ).then(function (response) {
         if(sense.data.enabled == true){
          
         }
         
        callback(response.data.val);
      }).catch(function(error) {

        console.log("error:"+error);
      })*/
    };
     interpreter.setProperty(scope, 'readGpio', interpreter.createAsyncFunction(wrapper));


     //For some reason this does not work.
    var wrapper = function(d, next) {
        window.setTimeout(function() {
            next();
        }, d);
    };
    interpreter.setProperty(scope, 'wait',
        interpreter.createAsyncFunction(wrapper));

     
    }


    export default initApi;