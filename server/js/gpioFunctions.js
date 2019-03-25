
const Gpio = require('onoff').Gpio;

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output){
	if (Gpio.accessible) {
		if(!this.gpioArray[pin]){
		const gpio = new Gpio(pin, 'out') 
		 this.gpioArray[pin] = gpio
 		 gpio.writeSync(output)
		}
		else {
		 const gpio = this.gpioArray[pin]
		 gpio.writeSync(output);			
		}
		io.emit('output update')
		return true
		
	}
		
	return false
	}

	readVal(pin){
		var val = this.gpioArray[pin].readSync();
		if ( val != "undefined" && typeof val != "undefined ")
			return val
		else return false
					
	}

	getByPin(pin){
		this.gpioArray.filter(obj => {
	  		return obj.pin === pin
		})
	}

	//
	senseGpio(pin,io){
		const sensor = new Gpio(pin, 'in', 'rising', {debounceTimeout: 10});
 		this.gpioArray[pin] = button
		sensor.watch((err, value) => {
  		if (err) {
   		 throw err;
  		}
 		io.emit('sensor update',value)
		});
	}
	close(){
		this.gpioArray.forEach(function(i){
		i.gpio.unexport()
	})
	this.gpioArray = []
	}


}

module.exports = gpiojs;