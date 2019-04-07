<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon  @click="generate">
          <v-icon large>mdi-play</v-icon>
        </v-btn>
        <v-btn icon @click="stop">
          <v-icon medium>mdi-square</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id="blocklyArea">
      <div id="blocklyDiv" style="height: 600px; width: 600px;">
        
      </div>
      <div id="code">
        <div id="code-generation">
          <v-textarea
          solo
          id="js-code"
          name="input-7-4"
          label="Generated Python code"
          v-model="code">
        </v-textarea>
        <div id="console">
          <v-textarea
          solo
          id="console-text"
          label="RaspberryPi Console Output"
          v-model="console">
        </v-textarea>
      </div>
    </div>

  </div>
  <xml id="toolbox" style="display: none">
    <category name="math">
      <block type="controls_if"></block>
      <block type="controls_repeat_ext"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
    </category>
    <category name="variables and elements">
      <button text="Add new variable" callbackKey="TEST"></button>
      <block type="new_element"></block>
      <block type="variables_set"></block>
      <block type="variables_get"></block>
    </category>
    <category name="gpio controls">
      <block type="set_gpio"></block>
      <block type="read_gpio"></block>
      <block type="sense_gpio"></block>
      <block type="wait_seconds"></block>
      
    </category>
  </xml>
</div>

<div id="pi-emu">

</div>
</div>
</template>

<script>
  import Blockly from '../assets/js/CustomBlocks'
  import {APIService} from '../services/APIService'
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
        code:'',
        apiService : new APIService(),
        setCalls:0,
        interpreter:'',
        console:''
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

  workspace.registerButtonCallback('TEST',function(button){Blockly.Variables.createVariable(button.getTargetWorkspace(), null) })
  this.$store.state.blocklyWs = this.workspace;
  console.log(this.$store.state.blocklyWs)

},
sockets: {
  pinUpdate (data) {
    this.updateConsole("Sensor update. *PIN :"+data.pin+" , VAL:"+data.val+"*");
  },
},
computed: {
  pinValArray() {
    return this.$store.getters.pinValArray[4]
  }
},
methods : {

  generate(){
    Blockly.Xml.domToWorkspace(this.blocklyDiv , this.workspace);
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    this.code = code;
    var interpreter = new Interpreter(code, initApi);
    this.interpreter = interpreter
  /*Assuming pin is numeric
  this.interpreter = new Interpreter(
  'readGpio(4);', initApi);
  //initApi.wrapper(4,false,function(output){
    console.log("output: " + output)
  })
  this.interpreter = new Interpreter(
  "alert('abc');", initApi);*/
  this.runner();



},
runner() { 
  try{
    if (this.interpreter.run()) { 
      setTimeout(function(){
        this.runner

      }, 25); 
    } 
  }
  catch(e){
    console.log("error:"+e.stack);
  }
},

stop() {
 this.setCalls = 0
 this.apiService.close().then((data) => {
  console.log(data)
});
},

updateConsole(text){
  this.console = this.console +text+"\n";
},


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
