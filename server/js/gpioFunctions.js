
const Gpio = require('onoff').Gpio;

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,io){
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
			io.emit('pinUpdate',{pin:pin,val:output})
			return true
			
		}
		
		return false
	}

	readVal(pin){
		if ( pin !== undefined && typeof pin !== undefined && pin!== null){
			var val = this.gpioArray[pin].readSync();
			return val
		}
		else return false
			
	}

getByPin(pin){
	this.gpioArray.filter(obj => {
		return obj.pin === pin
	})
}

	//
	senseGpio(pin,type,io){
		const sensor = new Gpio(pin, 'in', 'rising', {debounceTimeout: 10});
		this.gpioArray[pin] = sensor
		sensor.watch((err, value) => {
			if (err) {
				throw err;
			}
			io.emit('pinUpdate', {pin:pin,val:value})
		});
	}
	close(){
		this.gpioArray.forEach(function(i){
			i.unexport()
			i = '';
		})
		this.gpioArray = []
	}


}

module.exports = gpiojs;