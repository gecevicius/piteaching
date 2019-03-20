

const Gpio = require('onoff').Gpio;
class gpiojs(){
	
	constructor(){
		this.gpioArray = []
	},

	setOutput(pin,output){
		if(!gpioArray.includes(pin)){
		const gpio = new Gpio(pin, 'out'); 

		gpioArray.push({
			gpio:gpio,
			pin:pin
		})
		gpio.writeSync(output)
	}
	else {
		const gpio = gpioArray.filter(obj => {
  		return obj.pin === pin
  		gpio.writeSync(output)
	})

	}
	},

	close(){
		gpioArray.forEach(function(i){
		i.unexport()
	})
	gpioArray = []
	}
}

export gpiojs