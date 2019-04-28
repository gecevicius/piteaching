<template>
	<v-container fluid>
		<h1 class="my-3">Block Workspace</h1>
		<v-divider></v-divider>
		<v-layout row wrap id="project">
			<v-flex xs8><h2 class="my-2">Overview</h2></v-flex>
			<v-flex xs8 py-4>
				<img :src="getComponentImg('wspace1')">
			</v-flex>
			<v-flex xs8>
				<p>The Block Workspace is the area where blocks from the Toolbox are dragged and connected, resulting in a runnable piece of code, without actually writing any code.  </p>
				
			</v-flex>
			
		</v-layout>
		<v-diiver></v-diiver>
		<v-layout row wrap id="project">
			<v-flex xs8><h2 class="my-2">Creating code in the Block Workspace</h2></v-flex>
			<v-flex xs8>
				<p>The Block Workspace is very easy to work with, even for beginners. Start by dragging blocks from the Toolbox into the Block Workspace are in the middle. Multiple Blocks can be dragged in and connected to create a functional program.</p><p> Blocks can also be manipulated in the Block Workspace by right-clicking on to them. </p>
			</v-flex>
			
		</v-layout>

		<v-layout row wrap id="project">
			<v-flex xs8><h2 class="my-2">Block Workspace Controls</h2></v-flex>
			<v-flex xs8><img :src="getComponentImg('wspace2')"></v-flex>
			<v-flex xs8>
				<p>The Block Workspace can be controlled using the buttons in the Workspace Toolbar. </p>
				<p>The left side of the toolbar contains the possible prebuilt projects. By selectin an option from the dropdown menu and clicking 'Show Instructions', the user will see a popup with the description of a project and a step by step guide to achieve the described result using PiBlocks.</p>
				<p>The right side of the toolbar contains three buttons :
					<ul>
						<li><b><v-icon>mdi-play</v-icon> Run.</b> Clicking this button will run the built program. Depending on the blocks in the Block Workspace, the program will create variables and elements. These will be active throughout the lifetime of a running program.</li>
						<li><b><v-icon>mdi-stop</v-icon> Stop.</b> If there are no active elements, even after the program has finished running, the button will be disabled. It will become enabled only when there are active elements in the workspace, and clicking it will delete all active elements and their respective watch blocks.</li>
						<li><b><v-icon>mdi-delete</v-icon> Delete.</b> This button will clean all of the blocks in the workspace. This can also be done by right-clicking the bin icon in the Block Workspace.</li>
					</ul>
				</p>
			</v-flex>
			
		</v-layout>
	</v-container>
</template>
<script>
	export default{
		name:'WSpace',
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