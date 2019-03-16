
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
	  
    
    
   //function to start blinking
   //check the pin state, if the state is 0 (or off)
     //set pin state to 1 (turn LED on)
  
     //set pin state to 0 (turn LED off)
  
  //function to stop blinking
   // Stop blink intervals
   // Turn LED off
   // Unexport GPIO to free resources

 //stop blinking after 5 seconds






  var pin = block.getFieldValue('PIN')
  var output = block.getFieldValue('OUTPUT')
  var code = 'setOutput('+pin+','+output+');';
  return code;

};


var functionName = Blockly.JavaScript.provideFunction_(
    'list_lastElement',
    [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(aList) {',
        "var Gpio = require('onoff').Gpio;",
      '  return aList[aList.length - 1];',
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


export default Blockly


