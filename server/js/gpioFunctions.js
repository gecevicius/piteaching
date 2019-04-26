
const Gpio = require('pigpio').Gpio;
const hexRgb = require('hex-rgb');

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,type,io){
		if(type === "RGB"){
			this.setRgb(pins,output,type)
		}
		else{
			if(!this.gpioArray[pin]){
				const gpio = new Gpio(pin, {mode:Gpio.OUTPUT}) 
				this.gpioArray[pin] = gpio
				this.gpioArray[pin].type = type
				gpio.digitalWrite(output)
			}
			else {
				const gpio = this.gpioArray[pin]
				gpio.digitalWrite(output);			
			}
			if(io){
				io.emit('pinUpdate',{pin:pin,val:output})
			}
			return true
			}
			
	}

	readVal(pin){
		if ( pin !== undefined && typeof pin !== undefined && pin!== null){
			var val = this.gpioArray[pin].digitalRead();
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
	close(pin){
		if(pin != undefined){
			this.gpioArray[pin].unexport()
			this.gpioArray[pin] = null;
		}
		else{
			this.gpioArray.forEach(function(i){
			i.unexport()
			i = '';
		})
		this.gpioArray = []
		}
	}



    setRgb(pins,output){
    	if(!this.gpioArray[pin.rpin] && !this.gpioArray[pin.bpin] && !this.gpioArray[pin.gpin]){
	    	var rgb = hexRgb(output,{format:'array'});
	    	var rGpio = new Gpio(pins.rpin, {mode:Gpio.OUTPUT});
	    	var gGpio = new Gpio(pins.gpin, {mode:Gpio.OUTPUT});
	    	var bGpio = new Gpio(pins.bpin, {mode:Gpio.OUTPUT});

	    	rGpio.pwmWrite(rgb[0])
	    	bGpio.pwmWrite(rgb[1])
	    	gGpio.pwmWrite(rgb[2])

	    }
    }


}

module.exports = gpiojs;