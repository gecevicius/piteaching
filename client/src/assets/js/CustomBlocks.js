




var Blockly = require('node-blockly/browser');
import {store} from '../../store/store.js';


import Interpreter from 'js-interpreter';
import initApi from './interpreterApi';


Blockly.Blocks['set_gpio'] = {
	init: function() {
   this.appendValueInput('GPIO')
   .appendField('set GPIO ')
    this.appendDummyInput()
   .appendField(' output to')
   this.appendValueInput('OUTPUT')
   this.appendDummyInput(),

   this.setColour(270);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
 }
};



Blockly.JavaScript['set_gpio'] = function(block) {

  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  var output = Blockly.JavaScript.valueToCode(block, 'OUTPUT', Blockly.JavaScript.ORDER_ADDITION) || '0';
  console.log(selectedVar)
   console.log(output)
  var code = 'setOutput(' + selectedVar + ',' + output  + ');';
  return code;
};

Blockly.Blocks['toggle_gpio'] = {
  init: function() {
   this.appendValueInput('GPIO')
   .appendField('toggle GPIO output')
   this.appendDummyInput()
   this.setColour(275);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
 }
};

Blockly.JavaScript['toggle_gpio'] = function(block) {

  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
 
  var code = 'toggleOutput(' + selectedVar + ');';
  return code;
};

Blockly.Blocks['read_gpio'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('get value of GPIO')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(285);
   this.setOutput(true);
 }
};

Blockly.Blocks['colour_picker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('colour picker:')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COLOUR');
    this.setColour(355)
    this.setOutput(true)
  }
};

/* LEGACY MULTI-ELEMENT BLOCK */
Blockly.Blocks['new_element'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('create a new ')
   .appendField(new Blockly.FieldDropdown([
     ['Button', 'BUTTON'],
     ['LED', 'LED'],
     ['RGB', 'LED'],
     ['LCD Screen', 'LCD'],
     ['Ranger', 'RANGER'],
     ]),
   'TYPE')
   .appendField('connected at pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(180);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
   this.setOutput(true);
 }
};

/* LEGACY MULTI-ELEMENT BLOCK JS*/
Blockly.JavaScript['new_element'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = block.getFieldValue('TYPE');
  var code = 'newElem(' + pin + ',"' + type  + '");';
  return [code,Blockly.JavaScript.ORDER_CALL];
};


Blockly.Blocks['new_led'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('create a new LED')
   .appendField('connected at pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(180);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
   this.setOutput(true);
 }
};

Blockly.JavaScript['new_led'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = 'LED';
  var code = 'newElem(' + pin + ',"' + type  + '");';
  return [code,Blockly.JavaScript.ORDER_CALL];
};



Blockly.Blocks['new_rgb'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('create a new RGB LED')
   this.appendDummyInput()   
   .appendField('R:')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'RED')
   .appendField('G:')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'GREEN')
   .appendField('B:')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'BLUE')
   this.setColour(180);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
   this.setOutput(true);
 }
};

Blockly.JavaScript['new_rgb'] = function(block) {
  var rpin = block.getFieldValue('RED');
  var bpin = block.getFieldValue('BLUE');
  var gpin = block.getFieldValue('GREEN');

  var pins={
    rpin : rpin,
    bpin : bpin,
    gpin : gpin
  }

  var type = 'RGB';
  var code = "newElem('" + JSON.stringify(pins) + "','" + type  + "');";
  return [code,Blockly.JavaScript.ORDER_CALL];
};


Blockly.Blocks['new_button'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('create a new Button')
   .appendField('connected at pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   this.setColour(180);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
   this.setOutput(true);
 }
};

Blockly.JavaScript['new_button'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = 'BUTTON';
  var code = 'newElem(' + pin + ',"' + type  + '");';
  return [code,Blockly.JavaScript.ORDER_CALL];
};



Blockly.Blocks['read_gpio'] = {
  init: function() {
   this
   .appendValueInput('GPIO')
   .appendField('read GPIO')
   this.appendDummyInput()  
   .appendField('value') 
   this.setColour(280);
   this.setOutput(true);
 }
};




Blockly.JavaScript['text_print'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block,"TEXT",Blockly.JavaScript.ORDER_NONE);
  console.log('blockly text print : ' + text)
  var code = 'print('+text+');';
  return code;
};

Blockly.JavaScript['read_gpio'] = function(block) {
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  var code = 'readGpio(' + selectedVar  + ',' + false + ')';
  return [code, Blockly.JavaScript.ORDER_CALL];
};


Blockly.defineBlocksWithJsonArray([{
  "type": "wait_seconds",
  "message0": " Wait %1 seconds",
  "args0": [{
    "type": "field_number",
    "name": "SECONDS",
    "min": 0,
    "max": 600,
    "value": 1
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour":360,
}]);

/**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */
 Blockly.JavaScript['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'wait(' + seconds + ')';
  return code;
};



Blockly.Blocks['sense_gpio'] = {
  init: function() {
   this
   .appendValueInput('GPIO')
   .appendField('Watch GPIO')
  this.appendDummyInput()   
   this.appendStatementInput('DO')
   .appendField('On Change');

   this.setColour(280)
  
 }
};



Blockly.JavaScript['sense_gpio'] = function(block) {
  var sense = true;
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  console.log(selectedVar);
  var innerCode = '"' + Blockly.JavaScript.statementToCode(block, 'DO') + '"';
  innerCode =   innerCode.replace(/\n/g, " ");
  console.log(innerCode);
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
  "colour": 170,
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
  "colour": 175,
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


