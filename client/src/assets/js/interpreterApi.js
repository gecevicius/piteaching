import {APIService} from '../../services/APIService';
import axios from 'axios';

var apiService = new APIService();
var setCalls = 0;

function initApi(interpreter, scope) {
  // Add an API function for the alert() block.
  var wrapper = function(text) {
    return alert(text)
  };
  interpreter.setProperty(scope, 'alert',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  wrapper = function(text) {
    return prompt(text)
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));



       // Add an API function for highlighting blocks.
       var wrapper = function(id) {
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

      wrapper =  function(pin,callback,sense){


        axios.get("http://192.168.1.247:3000/gpio",{params : {

          "pin" : pin.data,
          "sense" : sense.data
        }}
          ).then(function (response) {
            callback(response.data.val)
          })

        };

        interpreter.setProperty(scope, 'readGpio',
          interpreter.createAsyncFunction(wrapper));




      }

      export default initApi;