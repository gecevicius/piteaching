
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

  var pin = block.getFieldValue('PIN')
  var output = block.getFieldValue('OUTPUT')
  var Gpio = require('onoff').Gpio;
  var component = new Gpio(pin,'out')
  var blinkInterval = setInterval(blinkLED, 250);
  function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    component.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    component.writeSync(0); //set pin state to 0 (turn LED off)
  }
}
function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  component.writeSync(0); // Turn LED off
  component.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds
};


export default Blockly
