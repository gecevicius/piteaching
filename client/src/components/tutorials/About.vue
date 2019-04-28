<template>
	<v-container fluid>
		<h1 class="my-3">About</h1>
		<v-divider></v-divider>
		<v-layout row wrap id="project">
			<v-flex xs8><h2 class="my-2">The project</h2></v-flex>
			<v-flex xs8><p> <b>PiBlocks</b> is a web based tool for learning programming and IoT. With this project my aim is to help lift some of the challenges teachers in Secondary Schools are facing when tasked to teach technical programming and IoT related content to their students. The tool is designed to be used by students in a classroom environment, with the supervision of a teacher. </p>
				<p> To achieve my aim, I have created a tool that gives the user an opportunity to experience programming the GPIO side of Raspberry Pi without writing a single line of code.</p>
				<p>
					Taking inspiration from <b><a href="https://scratch.mit.edu">Scratch</a></b>, the interface uses the <b><a href="https://developers.google.com/blockly/">Blockly</a></b> library, which transforms the coding experience from writing functions, declaring variables to a much simpler environment. 
				</p>
			</v-flex>
		</v-layout>



	</v-container>
</template>
<script>
	export default{
		name:'About',
		data(){
			return {

			}
		},
		methods:{
			openSettings(){
				document.getElementById('settings-btn').click()
			},
			getComponentImg(type){
				var img = require("../../assets/staticimg/"+type+".png")
				return img
			}
		}
	}
</script>

<style>
</style>