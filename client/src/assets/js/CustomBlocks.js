




var Blockly = require('node-blockly/browser');
import {store} from '../../store/store.js';


import Interpreter from 'js-interpreter';
import initApi from './interpreterApi';


//set element output block
Blockly.Blocks['set_gpio'] = {
	init: function() {
   this.appendValueInput('GPIO')
   .appendField('set Eleemnt ')
    this.appendDummyInput()
   .appendField(' output to')
   this.appendValueInput('OUTPUT')
   this.appendDummyInput(),

   this.setColour(270);
   this.setPreviousStatement(true, 'Action');
   this.setNextStatement(true, 'Action');
 }
};


//set element output JS
Blockly.JavaScript['set_gpio'] = function(block) {
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  var output = Blockly.JavaScript.valueToCode(block, 'OUTPUT', Blockly.JavaScript.ORDER_ADDITION) || '0';

  var code = 'setOutput(' + selectedVar + ',' + output  + ');';
  return code;
};

//toggle element output block
Blockly.Blocks['toggle_gpio'] = {
  init: function() {
   this.appendValueInput('GPIO')
   .appendField('toggle Element output')
   this.appendDummyInput()
   this.setColour(275);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
 }
};
//toggle element output JS
Blockly.JavaScript['toggle_gpio'] = function(block) {

  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  console.log(selectedVar);
  var code = 'toggleOutput(' + selectedVar + ');';
  return code;
};


//colour picker block
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
  var code = 'newElem(' + pin + ',"' + type  + '")';
  return [code,Blockly.JavaScript.ORDER_CALL];
};


//new LED block
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

//new LED JS
Blockly.JavaScript['new_led'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = 'LED';
  var code = 'newElem(' + pin + ',"' + type  + '")';
  return [code,Blockly.JavaScript.ORDER_CALL];
};


//new RGB Led JS
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

//new RGB Led block
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
  var code = "newElem('" + JSON.stringify(pins) + "','" + type  + "')";
  return [code,Blockly.JavaScript.ORDER_CALL];
};


//create new button block 
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

//create new button block JS
Blockly.JavaScript['new_button'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var type = 'BUTTON';
  var code = 'newElem(' + pin + ',"' + type  + '")';
  return [code,Blockly.JavaScript.ORDER_CALL];
};


//read gpio value
Blockly.Blocks['read_gpio'] = {
  init: function() {
   this
   .appendValueInput('GPIO')
   .appendField('read value of Element')
   this.appendDummyInput()  
   this.setColour(280);
   this.setOutput(true);
 }
};



//print block JS
Blockly.JavaScript['text_print'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block,"TEXT",Blockly.JavaScript.ORDER_NONE);

  var code = 'print('+text+');';
  return code;
};

//read element value JS
Blockly.JavaScript['read_gpio'] = function(block) {
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
 
  var code = 'readGpio(' + selectedVar  + ',' + false + ')';
  return [code, Blockly.JavaScript.ORDER_CALL];
};

//wait block
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

//wait JS
 Blockly.JavaScript['wait_seconds'] = function(block) {
  var seconds = Number(block.getFieldValue('SECONDS'));
  var code = 'wait(' + seconds + ')';
  return code;
};


//sense element / watch element output change 
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


//sense element / watch element output change JS
Blockly.JavaScript['sense_gpio'] = function(block) {
  var sense = true;
  var selectedVar = Blockly.JavaScript.valueToCode(block, 'GPIO', Blockly.JavaScript.ORDER_ADDITION) || '0';
  var innerCode = '"' + Blockly.JavaScript.statementToCode(block, 'DO') + '"';
  innerCode =   innerCode.replace(/\n/g, " ");
  console.log(innerCode);
  var code = "enableWatcher("+selectedVar+","+String(innerCode)+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

function varsDropdown(){
  var options = [];
  var allVars = store.getters.blocklyWs.getAllVariables();
  allVars.forEach(function(element) {
    options.push([element.name,element.id_])

  });
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

  "output": true

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

},
//loops, copied from core Blockly but removed input checks
{
    "type": "controls_repeat_ext",
    "colour":120,
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
   {
    "type": "math_arithmetic",
    "colour":220,
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

])





export default Blockly


