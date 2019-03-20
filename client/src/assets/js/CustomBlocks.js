
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
  var code = 'setTimeout(()=>this.setOutput(' + pin + ',' + output  + '),500);';

  return code;
};





export default Blockly


