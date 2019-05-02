<template>
  <div>
    <v-toolbar class="elevation-0 pt-2 workspace-toolbar">
      <v-container pa-0>
        <v-layout align-center justify-start>
          <v-flex xs2>
           <v-select
           :items="this.projects"
           item-text="name"
           item-value="value"
           label="Project"
           v-model="currentProj"
           ></v-select>
           <h2></h2>
         </v-flex>
         <v-flex xs3>
          <v-dialog v-model="showTut" width="700">
            <template v-slot:activator="{ on }">
              <v-btn
              color="red lighten-2"
              dark
              v-on="on"
              >
              Show instructions
            </v-btn>
          </template>

          <v-card>
           <v-card-title
           class="display-1 grey lighten-2"
           primary-title
           >
           {{this.projects[currentProj].name}}
         </v-card-title>
         <v-card-title
         class="headline grey lighten-3"
         secondary-title
         >
         {{this.projects[currentProj].steps[currentStep].title}}
       </v-card-title>

       <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              {{this.projects[currentProj].steps[currentStep].desc}}
            </v-flex>
            <v-flex xs10 offset-xs1 my-4 style="text-align:center">
              <img style="max-height:300px;" v-if="this.projects[currentProj].steps[currentStep].media" :src="getComponentImg(this.projects[currentProj].steps[currentStep].media)">
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
        color="secondary"
        v-if="this.projects[this.currentProj].steps[this.currentStep - 1] !== undefined"
        flat
        @click="step(-1)"
        >
        Back
      </v-btn>
      <v-btn
      color="secondary"
      v-else
      flat
      disabled
      >
      Back
    </v-btn>
    <v-spacer></v-spacer>
    <p>{{this.currentStep+1}} / {{this.projects[this.currentProj].steps.length}}</p>
    <v-spacer></v-spacer>
    <v-btn
    v-if="this.projects[this.currentProj].steps[this.currentStep + 1] !== undefined"
    color="primary"
    flat
    @click="step(1)"
    >
    Next
  </v-btn>
  <v-btn
  v-else
  color="primary"
  flat
  disabled
  >
  Next
</v-btn>
</v-card-actions>
</v-card>
</v-dialog>
</v-flex>
</v-layout>
</v-container>
<v-spacer></v-spacer>
<v-toolbar-items class="hidden-sm-and-down">

  <v-btn icon  @click="generate">
    <v-icon color="success" large>mdi-play</v-icon>
  </v-btn>

  <v-btn v-if="this.noOfElems > 0" icon @click="stop">
    <v-icon color="error" medium>mdi-square</v-icon>
  </v-btn>
  <v-btn v-else disabled  icon >
    <v-icon medium>mdi-square</v-icon>
  </v-btn>
  <v-btn icon  @click="clearWs">
    <v-icon color="warning" large>mdi-delete</v-icon>
  </v-btn>
</v-toolbar-items>
</v-toolbar>
<Workspace :project="this.projects[currentProj]"></Workspace>





<div id="code">
  <h2 class="mb-2">Code console</h2>
  <v-expansion-panel value="0">
    <v-expansion-panel-content
    >
    <template v-slot:header>
      <h3>Generated Code</h3>
    </template>
    <v-card>
      <v-card-text>
        <div id="code-generation" elevation-1>
          <v-label>Code generated in <b>JavaScript</b></v-label>
          <pre  v-highlightjs="console.code"> <code class="javascript"></code>
          </pre> </div>
        </v-card-text>
        <v-card-actions class="pr-3 pt-1">
          <v-spacer></v-spacer>
          <v-btn  color="warning"  @click="this.console.code=''">
            CLEAR
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-expansion-panel-content>


    <v-expansion-panel-content
    >
    <template v-slot:header>
      <h3>Raspberry Pi Console Output</h3>
    </template>
    <v-card>
      <v-card-text>
        <v-label >Output from <b>Raspberry Pi</b></v-label>
        <MessageConsole :messages="piMessages">
        </MessageConsole>

      </v-card-text>
      <v-card-actions class="pr-3 pt-1">
        <v-spacer></v-spacer>
        <v-btn  color="warning"  @click="this.$store.commit('clearPiMessages')">
          CLEAR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-expansion-panel-content>




  <v-expansion-panel-content
  >
  <template v-slot:header>
    <h3>Active Components</h3>
  </template>
  <v-card >
    <v-card-text>
      <v-label class="mb-2  ">Components currently registered on <b>Raspberry Pi</b></v-label>  
      <div id="elements" v-if="this.noOfElems>0">
        <v-container px-0 pb-3>
          <v-layout>

            <ActiveElement v-for="elem in this.elemsArray" v-if="elem!=null && elem !=undefined" :element="elem"></ActiveElement>


          </v-layout>
        </v-container>
      </div>

      <p v-else class="mt-2" style="font-size:12px"> </br>No elements are currenty active! Create a new element by using a <b>New Element</b> block and setting it to a variable.</p>
    </v-card-text>
  </v-card>
</v-expansion-panel-content>

</v-expansion-panel>





</div>

</div>
</template>

<script>
  import Workspace from './Workspace';
  import Blockly from '../assets/js/CustomBlocks';
  import Interpreter from 'js-interpreter';
  import initApi from '../assets/js/interpreterApi';
  import io from 'socket.io-client';
  import Projects from '../assets/Projects';
  import APIService from '../services/APIService';
  import MessageConsole from './MessageConsole';
  import ActiveElement from './ActiveElement';
  export default {
    name: 'Project',
    components:{
      'Workspace':Workspace,
      'ActiveElement':ActiveElement,
      'MessageConsole':MessageConsole
    },
    data () {
      return {
        code:'',
        console:{
          pi:[],
          code:''
        },
        interpreter:'',
        setCalls:0,
        currentProj:0,
        currentStep:0,
        projects:'',
        showTut:false,
        projectNames:[],
        message:''
      }
    },
    beforeMount (){
      this.projects = Projects ;

    },
    sockets: {
      pinUpdate(data){
        //this.$store.commit()
      },
      wsConnection(data){
        this.$store.commit('url',{url:data.url});
      },
      printMessage(data){
        console.log(data)
        this.$store.commit('piMessages',{type:data.type,message:data.msg});
      }
    },

    computed: {
      pinUpdate(){
        console.log('here')
      },
      piMessages(){
        return this.$store.getters.piMessages
      },
      noOfElems(){
        return this.$store.getters.getNoOfElems
      },
      elemsArray(){
        return this.$store.getters.elem
      },
      username:{

        get(){
          return this.$store.state.username;
        }

      }
    },
    mounted(){
      this.$store.commit('clearPiMessages')
    },
    methods : {
      step(direction){
        console.log(direction)
        if( this.projects[this.currentProj].steps[this.currentStep + direction] !== undefined ){
          this.currentStep = this.currentStep + direction
        }
      },
      generate(){
        if(this.noOfElems > 0){
          console.log(this.noOfElems)
          this.stop()
        }
        this.$store.commit('clearPiMessages')
        
        Blockly.Xml.domToWorkspace(document.getElementById('blocklyDiv') , Blockly.mainWorkspace);
        var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
        this.console.code = code;
        var interpreter = new Interpreter(code, initApi);
        this.interpreter = interpreter
        this.$store.commit('piMessages',{type:"START",message:"Program running!"});
        this.runner();
        this.$store.dispatch('blocklyWs',{blocklyWs: Blockly.mainWorkspace});

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
        this.$store.commit('clearPiMessages')
        this.$store.dispatch('close',{pin:""})
        APIService.close().then((data) => {
          console.log(data)
        });
      },
      getComponentImg(type){
        var img = require("../assets/staticimg/"+type+".png")
        return img
      },
      clearWs(){
        this.$store.commit('clearPiMessages')
        APIService.cleanWorkspace();
      },
      updateConsole(text){
        this.console = this.console +text+"\n";
      },



    }


  }

</script>
<style scoped>

</style>