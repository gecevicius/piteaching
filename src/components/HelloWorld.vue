<template>
  <div>
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
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
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
    /* 
    Blockly.Xml.domToWorkspace(this.blocklyDiv , this.workspace);
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    document.getElementById('js-code').innerHTML = code

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }*/
  },
  setOutput : function(){
    var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(4, 'out'),    // Export GPIO #17 as an output.
    iv;
    
// Toggle the state of the LED on GPIO #17 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
iv = setInterval(function() {
    led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
  }, 200);

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    led.writeSync(0);  // Turn LED off.
    led.unexport();    // Unexport GPIO and free resources
  }, 5000);

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
