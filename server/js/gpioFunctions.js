
const Gpio = require('pigpio').Gpio;
const hexRgb = require('hex-rgb');

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,type,io){
		this.gpioArray[pin].type = type;
		console.log(type)
		if(type === "RGB"){
			console.log(type)
			this.setRgb(pin,output,type)
		}
		else{
			if(!this.gpioArray[pin]){
				const gpio = new Gpio(pin, {mode:Gpio.OUTPUT}) 
				this.gpioArray[pin] = gpio
				
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
		const sensor = new Gpio(pin, 'in', 'rising', {
 		 mode: Gpio.INPUT,
 		pullUpDown: Gpio.PUD_UP,
 		 alert: true
		});

		sensor.glitchFilter(5000);
		this.gpioArray[pin] = sensor
		sensor.on('alert',(level, tick) => {
			io.emit('pinUpdate', {pin:pin,val:level})
		});
	}
	close(pin){
		if(pin != undefined && this.gpioArray[pin] != null){
			this.gpioArray[pin].digitalWrite(0)
			this.gpioArray[pin] = null;
		}
		else{
			this.gpioArray.forEach(function(i){
				if(i!=null){
				i.digitalWrite(0)
				i = null;
			}
		})
		this.gpioArray = []
		}
		return true
	}



    setRgb(pins,output){
    	console.log(pins)
    	var rgb = hexRgb(output,{format:'array'});
    	if(!this.gpioArray[pins.rpin] && !this.gpioArray[pins.bpin] && !this.gpioArray[pins.gpin]){
	    	
	    	var rGpio = new Gpio(pins.rpin, {mode:Gpio.OUTPUT});
	    	var gGpio = new Gpio(pins.gpin, {mode:Gpio.OUTPUT});
	    	var bGpio = new Gpio(pins.bpin, {mode:Gpio.OUTPUT});


	    	this.gpioArray[pins.rpin] = rGpio;
			this.gpioArray[pins.rpin].type = 'R';
			this.gpioArray[pins.gpin] = gGpio;
			this.gpioArray[pins.gpin].type = 'G';
			this.gpioArray[pins.bpin] = bGpio;
			this.gpioArray[pins.gpin].type = 'B';

	    	console.log(rgb)
	    	rGpio.pwmWrite(rgb[0])
	    	bGpio.pwmWrite(rgb[1])
	    	gGpio.pwmWrite(rgb[2])

	    }
	    else{
	    	if(this.gpioArray[pins.rpin] && this.gpioArray[pins.bpin] && this.gpioArray[pins.bpin]){

	    		var rGpio = this.gpioArray[pins.rpin]
	    		var gGpio = this.gpioArray[pins.gpin]
	    		var bGpio = this.gpioArray[pins.bpin]

	    		rGpio.pwmWrite(rgb[0])
	    		bGpio.pwmWrite(rgb[1])
	    		gGpio.pwmWrite(rgb[2])

	    	}
	    	else{
	    		return false
	    	}
	    }
    }


}

module.exports = gpiojs;