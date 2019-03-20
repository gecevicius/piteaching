

const Gpio = require('onoff').Gpio;
class gpiojs{
	var
	constructor(){
		this.gpioArray = []
	}

	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output){
	if (Gpio.accessible) {
		if(!this.gpioArray.includes(pin)){
		const gpio = new Gpio(pin, 'out'); 

		this.gpioArray.push({
			gpio:gpio,
			pin:pin
		})
		gpio.writeSync(output)
		
		}
		else {
			const gpio = this.gpioArray.filter(obj => {
	  		return obj.pin === pin
	  		gpio.writeSync(output)
		})
			
		}
		return true
		
	}
		
	return false
	}

	close(){
		this.gpioArray.forEach(function(i){
		i.unexport()
	})
	this.gpioArray = []
	}
}

module.exports = gpiojs;