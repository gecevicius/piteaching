
var Blockly = require('node-blockly/browser');



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
  var code = 'setOutput(' + pin + ',' + output  + ');';
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


Blockly.JavaScript['read_gpio'] = function(block) {

  var pin = block.getFieldValue('PIN')
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
  var code = 'waitForSeconds(' + seconds + ');\n';
  return [code, Blockly.JavaScript.ORDER_CALL];;
};



Blockly.Blocks['sense_gpio'] = {
  init: function() {
   this.appendDummyInput()
   .appendField('sensor pin ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
   .appendField(' reading = ')
   .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'VAL')
   this.setColour(280);
   this.setOutput(true);
 }
};


Blockly.JavaScript['sense_gpio'] = function(block) {
  var sense = true;
  var pin = block.getFieldValue('PIN')
  var code = 'readGpio(' + pin  + ','+sense+')';

  return [code, Blockly.JavaScript.ORDER_CALL];
};


// Block for variable getter.
Blockly.defineBlocksWithJsonArray([{
  "type": "variables_get",
  "message0": "%1",
  "args0": [
    {    // Beginning of the field variable dropdown
      "type": "field_variable",
      "name": "VAR",    // Static name of the field
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"    // Given at runtime
    }    // End of the field variable dropdown
  ],
  "output": null,    // Null means the return value can be of any type
}])


// Block for variable setter.
Blockly.defineBlocksWithJsonArray([{
  "type": "variables_set",
  "message0": "%{BKY_VARIABLES_SET}",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",    // This expects an input of any type
      "name": "VALUE"
    }
  ],

}])



export default Blockly


