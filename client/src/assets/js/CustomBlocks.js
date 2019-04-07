
var Blockly = require('node-blockly/browser');
import {store} from '../../store/store.js';



import Interpreter from 'js-interpreter';
import initApi from './interpreterApi';


Blockly.Blocks['set_gpio'] = {
	init: function() {
   this.appendDummyInput()
   .appendField('set gpio pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   .appendField(' to')
   .appendField(new Blockly.FieldDropdown([
     ['high output', '1'],
     ['low output', '0'],
     ]),
   'OUTPUT');

   this.setColour(160);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
 }
};

Blockly.JavaScript['set_gpio'] = function(block) {

  var pin = block.getFieldValue('PIN')
  var output = block.getFieldValue('OUTPUT')
  var code = 'setOutput(' + pin + ',' + output  + ')';
  return [code, Blockly.JavaScript.ORDER_CALL]; ;
};

Blockly.Blocks['read_gpio'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('get value of pin')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(280);
   this.setOutput(true);
 }
};


Blockly.Blocks['new_element'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('create new')
   .appendField(new Blockly.FieldDropdown([
     ['Button', 'BUTTON'],
     ['LED', 'LED'],
     ['LCD Screen', 'LCD'],
     ['Ranger', 'RANGER'],
     ]),
   'TYPE')
   .appendField(' at pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')

   this.setColour(120);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
   this.setOutput(true);
 }
};


Blockly.JavaScript['new_element'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = block.getFieldValue('TYPE');
  var code = 'newElem(' + pin + ',"' + type  + '")';
  return [code, Blockly.JavaScript.ORDER_CALL]; 
};



Blockly.Blocks['read_gpio'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('get value of pin')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(280);
   this.setOutput(true);
 }
};




Blockly.JavaScript['text_print'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block,"TEXT",Blockly.JavaScript.ORDER_NONE);
  console.log('blockly text print : ' + text)
  var code = 'window.alert('+text+')';
  return [code, Blockly.JavaScript.ORDER_CALL];
};

Blockly.JavaScript['read_gpio'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var code = 'readGpio(' + pin  + ',' + false + ')';
  return [code, Blockly.JavaScript.ORDER_CALL];
};


Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds",
  "message0": " wait %1 seconds",
  "args0": [{
    "type": "field_number",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
    "value": 1
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOOPS_HUE}"
}]);

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
 Blockly.JavaScript['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'wait(' + seconds + ')';
  setTimeout(function(){  
    return [code, Blockly.JavaScript.ORDER_NONE];
  },seconds);
};



Blockly.Blocks['sense_gpio'] = {
  init: function() {
   this
   .appendValueInput('GPIO')
   .appendField('watch GPIO')
  this.appendDummyInput()   
   this.appendStatementInput('DO')
   .appendField('DO');

   this.setColour(280)
  
 }
};



Blockly.JavaScript['sense_gpio'] = function(block) {
  var sense = true;
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  console.log(selectedVar);
  var innerCode = '"' + Blockly.JavaScript.statementToCode(block, 'DO') + '"'

  var code = "enableWatcher("+selectedVar+","+String(innerCode)+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

function varsDropdown(){
  var options = [];
  var allVars = store.getters.blocklyWs.getAllVariables();
  console.log(allVars)
  allVars.forEach(function(element) {
    options.push([element.name,element.id_])

  });
console.log(allVars[0])
  if(options.length == 0){
    options.push(['Variables appear here','0'])
  }
  return options;
}


// Block for variable getter.
Blockly.defineBlocksWithJsonArray([ {
  "type": "variables_get",
  "message0": "%1",
  "args0": [
  {
    "type": "field_variable",
    "name": "VAR",
    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
  },

  ],
  "output": null
}])




// Block for variable setter.
Blockly.defineBlocksWithJsonArray([{
  "type": "variables_set",
  "message0": "%{BKY_VARIABLES_SET}",
  "args0": [
  {
    "type": "field_variable",
    "name": "VAR",
    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
  },
  {
    "type": "input_value",
    "name": "VALUE",

  }
  ],
  "previousStatement": true,
  "nextStatement": true,

}])



export default Blockly


