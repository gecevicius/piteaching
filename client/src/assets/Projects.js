var Projects = [
{
	name:"Sandbox",
	value:0,
	steps:[
	{
		title:'Step 1',
		desc:'Desc 1',
		media:'toolbox1'
	},
	{
		title:'Step 2',
		desc:'Desc 2',
		media:'url here'
	}
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
		'wait_seconds',
		'colour_picker'
		]
	}
},


]

export default Projects