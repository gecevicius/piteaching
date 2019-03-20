

const Gpio = require('onoff').Gpio;
class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}

	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output){
	if (Gpio.accessible) {
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
		return true
		
	}
		
	return false
	}

	close(){
		gpioArray.forEach(function(i){
		i.unexport()
	})
	gpioArray = []
	}
}

module.exports = gpiojs;