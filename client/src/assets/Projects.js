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
		],
		loops:[
		'controls_repeat_ext',
		],
		text:[
		'text',
		'text_print'
		],
		vars:[
		'new_button',
		'new_rgb',
		'new_led',
		'variables_set',
		'variables_get'
		],
		gpio_controls:[
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
{
	name:"Sandbox 2",
	value:1,
	steps:[
	{
		title:'Step 1',
		desc:'Desc 1',
		media:'url here'
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
		'controls_repeat_ext',
		'logic_compare',
		'math_number',
		'math_arithmetic',
		'text',
		'text_print'
		],
		vars:[
		'new_element',
		'variables_set',
		'variables_get'
		],
		gpio_controls:[
		'set_gpio',
		'toggle_gpio',
		'read_gpio',
		'sense_gpio',
		'wait_seconds'
		]
	}
}

]

export default Projects