<template>
	<v-container fluid>
		<h1 class="my-3">Toolbox</h1>
		<v-divider></v-divider>
		<v-layout row wrap id="toolbox">
			<v-flex xs8><h2 class="my-2">Categories</h2></v-flex>
			<v-flex xs8><p> <b>The Toolbox</b> is a component of the Workspace that contains all of the possible blocks, sorted into different categories depending on the functionality of the block. 
			</p>
			<p>At the time of writing, there are 5 different categories.</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolbox1')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="math">
		<v-flex xs8><h2 class="my-2">Math</h2></v-flex>
		<v-flex xs8><p> The maths category houses blocks which perform logic or number based Actions. Blocks are listed in order of the picture shown.</p>
			<p>
				<ul>
					<li><b>If Block.</b> Performs IF, IF ELSE and ELSE and returns a boolean. <br/>
						<code class="example">IF 2 is to 2, returns TRUE</code>
						<code class="example">IF 'three' is 'three', returns FALSE <br/> ELSE IF 3 is equal to 3, returns TRUE</code>
					</li>
					<li><b>Logical Comparison Block.</b> Compares two inputs and returns a boolean value.
						<code class="example">2 is equal to 2, returns TRUE</code>
					</li>

					<li><b>Integer Block.</b> Specifies an integer value, which can be used as input to a loop, variable or other operations. </li>
					<li><b>Arithmetic Block.</b>Performs basic arithmetics on two given integers.
						<code class="example">2 + 2, returns 4</code>
					</li>
					<li><b>Boolean comparison Block.</b> Compares two booleans. 
						<code class="example">true AND true, returns TRUE</code>
						<code class="example">true OR false, returns TRUE</code>
						<code class="example">true AND false, returns FALSE</code>
					</li>
					<li><b>Boolean value Block.</b> Specifies a boolean value, which can be used as input to a loop, variable or other operations.</li>
					<li><b>Logic negate Block.</b> Inverse a boolean value.
						<code class="example">true NOT, returns FALSE</code>
					</li>

				</ul>
			</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxmaths')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="loops">
		<v-flex xs8><h2 class="my-2">Loops</h2></v-flex>
		<v-flex xs8><p> The loop category provides two loop blocks. </p>
			<p>
				<ul>
					<li><b>For Block.</b> Performs an action specified within the block for the specified ammount of times. Accepts an integer value or block as input. <br/>
						<code class="example">Variable X = 0 <br/> FOR 5 { <br/> X = X + 1  }<br/> X = 5</code>

					</li>
					<li><b>While Block.</b> Performs an action specified within the block while a given boolean returns a specified value. Accepts a boolean value or block as input.
						<code class="example">Variable X = 3  <br/> REPEAT WHILE X not equal 4 {<br/> X = X + 1  } <br/> will cycle 1 time.</code>
					</li>

				</ul>
			</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxloops')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="loops">
		<v-flex xs8><h2 class="my-2">Variables</h2></v-flex>
		<v-flex xs8><p> The variables category provides blocks to create, set and retreive variable values, which are used during the runtime of a program.</p>
			<p>
				<ul>
					<li><b>Add new variable Button.</b> By default, variable blocks only have 1 variable for choosing. By clicking this button, you will be able to add new variables to your program, which can later be used in variable blocks that are already in the workspace.  <br/>
					</li>
					<li><b>Set Variable.</b> Sets the selected variable to a selected value. The value can be any other operation,value or element block. 
						<code class="example">Variable X = 3  <br/> </code>
						<code class="example">Variable item = 'HELLO' <br/> </code>
						<code class="example">Variable LED = CREATE NEW LED AT PIN 4 <br/> </code>
					</li>
					<li><b>Get Variable value.</b> Retrieve the value of a variable. If used with a GPIO element, returns it's output value. 
						<code class="example">Variable X = 3  <br/> GET X, returns 3 </code>
					</li>

				</ul>
			</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxvars')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="loops">
		<v-flex xs8><h2 class="my-2">Text</h2></v-flex>
		<v-flex xs8><p> String ( text ) values and console printing operations.</p>
			<p>
				<ul>
					<li><b>String.</b> Returns a specified string.
						<code class="example">STRING Name = "Snow"</code>
					</li>
					<li><b>Print.</b> Prints the selected value.
						<code class="example">PRINT  Name, will print 'Snow' in console  <br/> </code>
					</li>

				</ul>
			</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxtext')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="text">
		<v-flex xs8><h2 class="my-2">PI Controls</h2></v-flex>
		<v-flex xs8>
			<h3 class="my-2">Elements</h3>
			<p> Blocks used for controlling the hardware components of a Raspberry Pi. 3 total components are supported.</p>
			<p><b>OUTPUT - </b> output components take a value and display it. You can turn on or off an LED.</p>
			<p><b>INPUT - </b> input components return a value generated by external sources. Clicking a button triggers it to return 1.</p>

			<p>
				Currenty supports 2 output components : 
				<ul>
					<li><b>LED.</b> A regular LED, which can be turned off or on, or toggled. This element output accepts an integer of 0 for OFF or 1 for ON. <br/>
						<code class="example">CREATE LED at pin 4</code>
					</li>
					<li><b>RGB LED.</b> An LED with 3 colours - Red, Green and Blue. Each colour has it's own pin, therefore the element requires three pin inputs. This component can only receive a HEX colour value provided by a string or a color picker block. <br/>
						<code class="example">CREATE RGB LED at RED PIN =  17, GREEN PIN = 22, BLUE PIN = 27</code>
					</li>
				</ul>
			</p>
			<p>
				Currenty supports 1 input component : 
				<ul>
					<li><b>Button.</b> Any button (touch / physical). These will mostly be used with a watch block, which will be triggered whenever the button is activated.  <br/>
					</li>
					<code class="example">CREATE BUTTON at pin 7</code>
				</ul>
			</p>
			<h3 class="my-2">Element actions </h3>
			<p>Currently, 4 different actions on GPIO elements are supported :</p>
			<ul>
				<li><b>Set GPIO output.</b> Only usable with output components. Set the value of the chosen element to a specified value.
					<code class="example">Variable LED = CREATE NEW LED AT PIN 4 <br/> SET LED OUTPUT TO 1, turns the LED at pin 4 on.</code>
				</li>
				<li><b>Toggle GPIO output.</b> Only usable with output components. Toggles the value of the specified element on or off. 

				</li>
				<li><b>Read GPIO output.</b> Only usable with output components. Read the value from an element.
					<code class="example">Variable LED = CREATE NEW LED AT PIN 4 <br/> SET LED OUTPUT TO 1 <br/> READ LED OUTPUT, returns 1</code>
				</li>
				<li><b>Watch GPIO output.</b> Usable with any element. Runs the blocks inside the Watch cluster whenever the output value of the specified element changes.
					<code class="example">VARIABLE LED = CREATE NEW LED AT PIN 7<br/>Variable BTN = CREATE NEW BUTTON AT PIN 4 <br/> WATCH BUTTON { TOGGLE LED OUTPUT TO 1 } <br/> Whenever the button at PIN 7 is clicked, LED is toggled on or off.</code>
				</li>
			</ul>
		</v-flex>
		
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxgpio')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>
	<v-layout row wrap id="other">
		<v-flex xs8><h2 class="my-2">Other</h2></v-flex>
		<v-flex xs8><p> Other misc. operations and values.</p>
			<p>
				<ul>
					<li><b>Wait.</b> Waits for a specified ammount before running the next operation. Useful for cycles and element output toggles, where you want to observe the physical changes of GPIO components.
					</li>
					<li><b>Color picker.</b> Returns the HEX value of the selected colour. Can be used for variables, operations, comparisons or RGB element outputs.
					</li>

				</ul>
			</p>
		</v-flex>
		<v-flex xs4 pl-4>
			<img :src="getComponentImg('toolboxother')">
		</v-flex>
	</v-layout>
	<v-divider></v-divider>

</v-container>
</template>
<script>
	export default{
		name:'Toolbox',
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