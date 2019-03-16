
import Blockly from 'node-blockly/browser';

Blockly.Blocks['string_length'] = {
	init: function() {
		this.appendValueInput('VALUE')
		.setCheck('String')
		.appendField('length of');
		this.setOutput(true, 'Number');
		this.setColour(160);
		this.setTooltip('Returns number of letters in the provided text.');
		this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
		this.setPreviousStatement(true);
	}
};

Blockly.Blocks['set_gpio'] = {
	init: function() {
		 this.appendDummyInput()
		 .appendField('set gpio pin ')
		 .appendField(new Blockly.FieldNumber('0', -128, 127, 1), 'PIN')
        .appendField(' to')
        .appendField(new Blockly.FieldDropdown([
                       ['high output', '5'],
                       ['low output', '0'],
                     ]),
                     'OUTPUT');

		this.setColour(160);
		this.setPreviousStatement(true, 'Action');
		this.setTooltip('Returns number of letters in the provided text.');
		this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
		this.setPreviousStatement(true);
	}
};

Blockly.JavaScript['set_gpio'] = function(block) {
	  

var setOutput = Blockly.JavaScript.provideFunction_(
    'setOutput',
    [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(pin,output,Gpio) {',
      "var component = new Gpio(pin,'out')",
      "    var component = new Gpio(pin,'out')",
      "var blinkInterval = setInterval(blinkLED, 250);",
      "function blinkLED() {",
      "if (LED.readSync() === 0) {",
      "component.writeSync(1);",
      "} else {",
      "component.writeSync(0);}",
      " function endBlink() {",
      "clearInterval(blinkInterval);",
      "component.writeSync(0);",
      "component.unexport();",
      "}setTimeout(endBlink, 5000);}",
      "",
      "",
      '}']);



  var Gpio = require('onoff').Gpio;
  var pin = block.getFieldValue('PIN')
  var output = block.getFieldValue('OUTPUT')
  var code = setOutput + '(' + pin + ',' + output  + + ',' + Gpio+')';
  return code;

};





export default Blockly


