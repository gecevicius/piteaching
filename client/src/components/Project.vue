<template>
  <div>
    <v-toolbar>
      <v-container pa-0>
        <v-layout align-center justify-start>
          <v-flex xs2>
            <h2>{{this.projects[currentProj].name}}</h2>
          </v-flex>
          <v-flex xs3>
            <v-dialog v-model="showTut" width="500">
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
              class="headline grey lighten-2"
              primary-title
              >
              {{this.projects[currentProj].steps[currentStep].title}}
            </v-card-title>

            <v-card-text>
              {{this.projects[currentProj].steps[currentStep].desc}}
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
    <v-icon large>mdi-play</v-icon>
  </v-btn>

  <v-btn v-if="this.noOfElems > 0" icon @click="stop">
    <v-icon medium>mdi-square</v-icon>
  </v-btn>
  <v-btn v-else disabled  icon @click="stop">
    <v-icon medium>mdi-square</v-icon>
  </v-btn>
</v-toolbar-items>
</v-toolbar>
<Workspace v-bind:project="this.projects[currentProj]"></Workspace>

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
</div>
</template>

<script>
  import Workspace from './Workspace';
  import Blockly from '../assets/js/CustomBlocks';
  import Interpreter from 'js-interpreter';
  import initApi from '../assets/js/interpreterApi';
  import io from 'socket.io-client';
  import Projects from '../assets/Projects';
  import {APIService} from '../services/APIService';

  export default {
    name: 'Project',
    components:{
      'Workspace':Workspace
    },
    data () {
      return {
        code:'',
        console:'',
        interpreter:'',
        setCalls:0,
        currentProj:0,
        currentStep:0,
        projects:'',
        showTut:false,
        apiService: new APIService()
      }
    },
    beforeMount (){
      this.projects = Projects;
    },
    sockets: {
      pinUpdate (data) {
        this.updateConsole("Sensor update. *PIN :"+data.pin+" , VAL:"+data.val+"*");
      },
    },
    computed: {
      pinValArray() {
        return this.$store.getters.pinValArray[4]
      },
      noOfElems(){
        return this.$store.getters.getNoOfElems
      },
    },
    asyncComputed: {
      localUsers(){
        return this.apiService.getLocals().then(response => response.data)

      }
    },
    methods : {
      step(direction){
        console.log(direction)
        if( this.projects[this.currentProj].steps[this.currentStep + direction] !== undefined ){
          this.currentStep = this.currentStep + direction
        }
      },
      generate(){
        this.$store.dispatch('close');
        Blockly.Xml.domToWorkspace(document.getElementById('blocklyDiv') , this.$store.getters.blocklyWs);
        var code = Blockly.JavaScript.workspaceToCode(this.$store.getters.blocklyWs);
        this.code = code;
        var interpreter = new Interpreter(code, initApi);
        this.interpreter = interpreter
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
       this.$store.dispatch('close')
     },

     updateConsole(text){
      this.console = this.console +text+"\n";
    },


  }


}

</script>
