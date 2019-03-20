<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon  @click="generate">
          <v-icon large>mdi-play</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id="blocklyArea">
      <div id="blocklyDiv" style="height: 600px; width: 600px;"></div>
      <div id="code">
        <div id="code-generation">
          <v-textarea
          solo
          id="js-code"
          name="input-7-4"
          label="Generated Python code"
          v-model="code">
        </v-textarea>
        
      </div>
    </div>
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

  <div id="pi-emu">

  </div>
</div>
</template>

<script>
  import Blockly from '../assets/js/CustomBlocks'
  import {APIService} from '../services/APIService'

  export default {
    name: 'Workspace',
    data () {
      return {
        blocklyArea : '',
        blocklyDiv :'',
        workspace :'', 
        code:''
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
  async  generate(){
    Blockly.Xml.domToWorkspace(this.blocklyDiv , this.workspace);
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    this.code = code;

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }

  },

  async  setOutput (pin,output){
    const apiService = new APIService();
    apiService.setOutput(pin,output).then((data) => {
      console.log(data)
      this.gpioClose()
    });
  },

  gpioClose() {
    const apiService = new APIService();
    apiService.close().then((data) => {
      console.log(data)
    });
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
