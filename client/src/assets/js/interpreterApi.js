import {APIService} from '../../services/APIService';
import axios from 'axios';

var apiService = new APIService();
var setCalls = 0;
var pinValArray = []

function initApi(interpreter, scope) {

//console.log
var  myConsole = interpreter.createObject(interpreter.OBJECT);
interpreter.setProperty(scope, 'console', myConsole);
var wrapper = function(obj) {
  return interpreter.createPrimitive(console.alert(obj));
};
interpreter.setProperty(myConsole, 'alert', interpreter.createNativeFunction(wrapper));


  //alert
  wrapper = function(text) {
    return alert(text)
  };
  interpreter.setProperty(scope, 'alert',
    interpreter.createNativeFunction(wrapper));

  //prompt
  wrapper = function(text) {
    return prompt(text)
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));

 /* GPIO Api */
      wrapper = function(pin) {
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
      wrapper = function(pin,output) {
        setTimeout(function(){
          apiService.setOutput(pin.data,output.data).then((data) => {
          })}, 500 * setCalls
          )
        setCalls = setCalls+ 1;
      };
      interpreter.setProperty(scope, 'setOutput',
        interpreter.createNativeFunction(wrapper));

      //read gpio pin val from server
   var wrapper =  function(pin,sense,callback){
      axios.get("http://192.168.1.247:3000/gpio",{params : {
        "pin" : pin.data,
        "sense" : sense.data
      }}
      ).then(function (response) {
         pinValArray[response.data.pin] = response.data.val
        callback(response.data.val)
      }).catch(function(error) {

        console.log("error:"+error)
      })
    };
     interpreter.setProperty(scope, 'readGpio', interpreter.createAsyncFunction(wrapper));
    }


var wrapper =  function(pin,sense,callback){
      axios.get("http://192.168.1.247:3000/gpio",{params : {
        "pin" : pin,
        "sense" : sense
      }}
      ).then(function (response) {
        //console.log(response.data.val)
        callback(response.data.val)
      }).catch(function(error) {

        console.log("error:"+error)
      })
    };

    initApi.wrapper = wrapper;
 

    export default initApi;