

const Gpio = require('onoff').Gpio;



class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output){
	if (Gpio.accessible) {
		if(!getByPin(pin).length > 0){
		const gpio = new Gpio(pin, 'out'); 

		this.gpioArray.push({
			gpio:gpio,
			pin:pin
		})


		
 		 gpio.writeSync(output);
		
		
		}
		else {
		 const gpio = getByPin(pin);
		 gpio.writeSync(output);			
		}
		return true
		
	}
		
	return false
	}

	read(pin){
		if(Gpio.accessible){
			var gpio = getByPin(pin)
			if(gpio.length > 0 ){
				return gpio.read()
			}
			else return false
		}
	}

	getByPin(pin){
		return this.gpioArray.filter(obj => {
	  		return obj.pin === pin
		})
	}
	close(){
		this.gpioArray.forEach(function(i){
		i.gpio.unexport()
	})
	this.gpioArray = []
	}


}

module.exports = gpiojs;