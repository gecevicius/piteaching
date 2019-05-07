var Projects = [
{
	name:"LED",
	value:0,
	steps:[
	{
		title:'What you will need',
		desc:'In this project, we will be creating an application which sets the output of an LED bulb. You will also learn about the basics of Raspberry Pi GPIO and find out how variables work. For this project you will need : 1x Button, 1x LED, 1 transistor, 1 jumper cable.',
		media:'logo'
	},
	{
		title:'What is GPIO?',
		desc:'GPIO - General Purpose Input / Output. One of the most powerful features of the Raspberry Pi, the pins along the top edge of the Pi board allow the connection of various physical components, anything from an LED bulb to a complex motor that can be used to power robots. Below is an illustration of the GPIO ports on a Raspberry Pi machine. These are small metal pins that can be connected to a breadboard, which houses all of your components. Some of them have numbers, a minus, a voltage number written by them. The numbers indicate the pin number, which you will later be used to send different signals to. Do not worry about the rest for now!',
		media:'project1-1'
	},
	{
		title:'Breadboard',
		desc:'A breadboard is used for prototyping electronics and allows the creation of circuits without any technical equipment. All you need is a component and some jumper cables to become an engineer. There are some things you should know! There are three different sections of a breadboard. The section highlighted in red - the power bus, it usually powers the breadboard. Section highligted in blue - the ground bus, which helps complete the circuit. And the last part is the rows highlighted in green - these are the tie-points, which will be used to plug components in. ',
		media:'project1-3'
	},
	{
		title:'Types of components',
		desc:'Components come in two types - input and output. An input component is a component that takes input from the user, for example a button. You click the button - that means you are inputting information, in other words triggering the button. And there are output components, which display some sort of an output, for example - an LED. You set the output of an LED to 1 - you are outputting power to it, and the bulb lights up. In this project, we will be using a single output component - an LED, and a single input component - a Button.',
		media:''
	},
	{
		title:'Connecting the pieces together',
		desc:"Let's beging assembling! First off, let's connect the LED, as shown below. We are connecting an LED using jumper cables to GPIO pin 4 on the Raspberry Pi, indicated by the yellow jumper cable. However, this is not enough as the electric circuit must be grounded, which will protect your circuit from electricity surges. ",
		media:'project1-4'
	},
	{
		title:'Variables',
		desc:"Before we begin creating our LED program, we have to understand what a variable is.A variable in programming is a reference to some sort of value. In our case, the variable will be a reference to the LED component. Creating variables is easy! Head on over to the workspace, in the toolbox, which is on the left hand side, select 'Variables'. Here you will see three options - 'Add variable' button, by clicking this button, you will be able to create a new variable in your workspace. You can then use these variables by dragging the two blocks below the button into the workspace. The 'set' block sets a value for a variable, and the block after that retreives the value of the variable. Keep in mind - you have to set a variable first before using it!",
		media:'project1-5'
	},
	{
		title:'Creating an LED element variable',
		desc:"At this point, our LED should turn on and off without a problem. Let's see if that's the case! Using the workspace, you will create a program that sets the output of our LED component to 1, resulting in the LED bulb turning on. To begin testing, create a variable, which we set to an LED component located at GPIO pin 4.",
		media:'project1-6'
	},
	
	{
		title:'Setting the output of a variable ',
		desc:"Let's turn the LED on! An LED component usually takes an integer as the possible output, 1 for ON, and 0 for OFF. We want to see the bulb shining bright, so we are going to send a '1' for it to output! Using the blocks in PI Controls and Math categories of the toolbox, try creating a program that sets the output of our new variable to 1. Once you are ready to test your program, click the green icon on the right side of the workspace toolbar to run it. ",
		media:'project1-9'
	},
	],
	blocks:{
		math:[
		'controls_if',
		'logic_compare',
		'math_number',
		'math_arithmetic',
		"logic_operation",
		"logic_boolean",
		"logic_negate",
		
		],
		loops:[
		'controls_repeat_ext',
		"controls_whileUntil"
		],
		text:[
		'text',
		'text_print'
		],
		vars:[
		'variables_set',
		'variables_get'
		],
		gpio_controls:[
		'new_button',
		'new_rgb',
		'new_led',
		'set_gpio',
		'toggle_gpio',
		'read_gpio',
		'sense_gpio',
		],
		other:[
		'colour_picker'
		]
	}
},


]

export default Projects