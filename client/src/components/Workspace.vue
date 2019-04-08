<template>
  <div id="blockly-wrapper">

    <div id="blocklyArea">
      <div id="blocklyDiv" style="height: 600px; width: 600px;">

      </div>

      <xml id="toolbox" style="display: none">
        <category name="math">
          <block v-for="block in this.project.blocks.math" :type="block"></block>
        </category>
        <category name="variables and elements">
          <button text="Add new variable" callbackKey="TEST"></button>
          <block v-for="block in this.project.blocks.vars" :type="block"></block>
        </category>
        <category name="gpio controls">
          <block v-for="block in this.project.blocks.gpio_controls" :type="block"></block>

        </category>
      </xml>
    </div>

    <div id="pi-emu">

    </div>
  </div>
</template>

<script>
  import Blockly from '../assets/js/CustomBlocks'
  import Interpreter from 'js-interpreter';
  import initApi from '../assets/js/interpreterApi';
  import io from 'socket.io-client';

  export default {
    name: 'Workspace',
    data () {
      return {
        blocklyArea : '',
        blocklyDiv :'',
        workspace :'',
      }
    },
    props: ['project'],
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

  workspace.registerButtonCallback('TEST',function(button){Blockly.Variables.createVariable(button.getTargetWorkspace(), null) })
  this.$store.state.blocklyWs = this.workspace;
  console.log(this.$store.state.blocklyWs)

},

methods : {



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
