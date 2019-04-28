<template>
  <div id="blockly-wrapper">

    <div id="blocklyArea">
      <div id="blocklyDiv" style="height: 600px; width: 600px;">

      </div>

      <xml id="toolbox" >
        <category colour="210" name="Math">
          <block  v-for="block in this.computedProject.blocks.math" :type="block"></block>
        </category>
        <category  colour="120" name="Loops">
          <block v-for="block in this.computedProject.blocks.loops" :type="block"></block>
        </category>
        <category colour="180" name="Variables and Elements">
          <button text="Add new variable" callbackKey="newVar"></button>
          <block v-for="block in this.computedProject.blocks.vars" :type="block"></block>
        </category>
        <category colour="150" name="Text">
          <block v-for="block in this.computedProject.blocks.text" :type="block"></block>
        </category>
        <category colour="280" name="PI Controls">
          <block v-for="block in this.computedProject.blocks.gpio_controls" :type="block"></block>
        </category>
        <category colour="360" name="Other">
          <block v-for="block in this.computedProject.blocks.other" :type="block"></block>
        </category>
      </xml>
    </div>

  </div>
</template>

<script>
  import Blockly from '../assets/js/CustomBlocks';
  import APIService from '../services/APIService';
  var parseString = require('xml2js').parseString;
  var xmlSerializer = new XMLSerializer();

  export default {
    name: 'Workspace',
    data () {
      return {
        blocklyArea : '',
        blocklyDiv :'',
        workspace :'',
        xmlWs:''
      }
    },
    props: ['project'],
    mounted(){
      this.checkIfWorkspaceIsShared();
      

    },

    watch: { 
        computedProject: function(newVal, oldVal) { // watch it
         this.workspace.dispose()
         console.log("clean")
         console.log(this.workspace)
         console.log("done updating to" + this.project.value)
         this.createBlockly()
         this.workspace.updateToolbox(document.getElementById('toolbox'))
       }
     },
     sockets:{
      wsUpdated(data){

        console.log(data)
        this.xmlToWs(data.workspace);
        
      }
    },
    computed:{
      computedProject(){
        console.log("computed")
        return this.project
      }
    },
    methods : {
      newVar(){
        alert("lol")
      },
      createBlockly(xmlWs){

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
    Blockly.mainWorkspace.registerButtonCallback('newVar',function(){ Blockly.Variables.createVariable(Blockly.mainWorkspace, null, '')});

  };
  if(xmlWs){
    this.xmlToWs(xmlWs);
  }
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);
  this.$store.dispatch('blocklyWs',{blocklyWs: this.workspace})
  var self = this;
  workspace.addChangeListener( function(event){self.shareWorkspace(event)})

  
},

async checkIfWorkspaceIsShared(){
  const ws =  await APIService.getWorkspace().then(response =>{
    return response
  })
  if(ws != undefined && ws != false){
   this.createBlockly(ws);
 }
 else  this.createBlockly();
},




xmlToWs(xmlWs){
 Blockly.Events.disable();
 this.workspace.clear()
 Blockly.Xml.domToWorkspace( Blockly.Xml.textToDom(xmlWs),Blockly.mainWorkspace);
 Blockly.Events.enable();
},

shareWorkspace(event){
  console.log(event)
  if(event.type === Blockly.Events.MOVE){
    console.log("sharing")

    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlString = xmlSerializer.serializeToString(xmlDom)

    if(xmlString !== this.xmlWs){
      APIService.shareWorkspace(xmlString);
    }
  }
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
