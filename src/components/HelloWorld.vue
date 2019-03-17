<template>
  <div>
    <Nav></Nav>
    <div id="blocklyArea">
      <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>

      <xml id="toolbox" style="display: none">
        <block type="controls_if"></block>
        <block type="controls_repeat_ext"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="text"></block>
        <block type="text_print"></block>
        <block type="string_length"></block>
        <block type="set_gpio"></block>
      </xml>
    </div>
    <div id="code-generation">
      <button @click="setOutput">GENERATOR</button>
      <label>js</label>
      <textarea id="js-code"></textarea>
    </div>
    <div id="pi-emu">

    </div>
  </div>
</template>

<script>
  import Blockly from '../assets/js/CustomBlocks'
  import Nav from '../components/Nav'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        blocklyArea : '',
        blocklyDiv :'',
        workspace :'', 
      }
    },
    mounted(){

      var blocklyArea = document.getElementById('blocklyArea')
      var blocklyDiv =  document.getElementById('blocklyDiv')
      var workspace = Blockly.inject(blocklyDiv,
        {toolbox: document.getElementById('toolbox')})

      this.blocklyArea = blocklyArea;
      this.blocklyDiv = blocklyDiv;
      this.workspace = workspace;
      var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);
},

methods : {
  generate : function(){

    Blockly.Xml.domToWorkspace(this.blocklyDiv , this.workspace);
    var code = Blockly.Python.workspaceToCode(this.workspace);
    document.getElementById('js-code').innerHTML = code

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
  },

  setOutput : function(){
    var Gpio = require('onoff').Gpio;
var LED = new Gpio(17, 'out'); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms
function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}
function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}
setTimeout(endBlink, 5000); //stop blinking after 5 seconds
}
}


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
