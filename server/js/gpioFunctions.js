
const Gpio = require('pigpio').Gpio;
const hexRgb = require('hex-rgb');

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,type,io){
		
		console.log(type)
		if(type === "RGB"){
			console.log(type)
			this.setRgb(pin,output,io)

		}
		else{
			if(!this.gpioArray[pin]){
				const gpio = new Gpio(pin, {mode:Gpio.OUTPUT}) 
				this.gpioArray[pin].type = type;
				this.gpioArray[pin] = gpio
				gpio.digitalWrite(output);

			}
			else {
				const gpio = this.gpioArray[pin]
				gpio.digitalWrite(output);			
			}
			io.emit('pinUpdate',{pin:pin,val:output})
			io.emit('printMessage',{type:'Element Set Output',message:"Component at pin" + pin+" changed output to "+output});
			return true
			}
			

	}

	readVal(pin){
		if ( pin !== undefined && typeof pin !== undefined && pin!== null){
			var val = this.gpioArray[pin].digitalRead();
			io.emit('printMessage',{type:'Element Read Output',message:"Component at pin" + pin+" value is "+val});
			return val

		}
		
		else {
			io.emit('printMessage',{type:'Element Read Output',message:"Error reading element output at pin "+pin});
			return false
		}
			
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
		io.emit('printMessage',{type:'Watch ',msg:"Watcing "+type+" element at pin "+pin});
		sensor.on('alert',(level, tick) => {
			io.emit('pinUpdate', {pin:pin,val:level})
			io.emit('printMessage',{type:'Watcher update',message:"Watched "+type+" element at pin "+pin+" triggered"});
		});
	}
	close(pin,io){
		if(pin != undefined && this.gpioArray[pin] != null){
			this.gpioArray[pin].digitalWrite(0)
			this.gpioArray[pin] = null;
			io.emit('printMessage',{type:'CLOSE ',msg:"Pin "+pin+" closed connection!"});
		}
		else{
			this.gpioArray.forEach(function(i){
				if(i!=null){
				i.digitalWrite(0)
				i = null;
			}

		})
			io.emit('printMessage',{type:'CLOSE ',msg:"Closed all pin connections!"});
		this.gpioArray = []
		}
		return true
	}



    setRgb(pins,output,io){
    	console.log(pins)
    	var rgb = hexRgb(output,{format:'array'});
    	if(!this.gpioArray[pins.rpin] && !this.gpioArray[pins.bpin] && !this.gpioArray[pins.gpin]){
	    	
	    	var rGpio = new Gpio(pins.rpin, {mode:Gpio.OUTPUT});
	    	var gGpio = new Gpio(pins.gpin, {mode:Gpio.OUTPUT});
	    	var bGpio = new Gpio(pins.bpin, {mode:Gpio.OUTPUT});


	    	this.gpioArray[pins.rpin] = rGpio;
			this.gpioArray[pins.rpin].type = 'RGB';
			this.gpioArray[pins.gpin] = gGpio;
			this.gpioArray[pins.gpin].type = 'RGB';
			this.gpioArray[pins.bpin] = bGpio;
			this.gpioArray[pins.gpin].type = 'RGB';

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
	    		io.emit('printMessage',{type:'ERROR ',message:"RGB LED at pin" + pins +" failed to update output to "+output});
	    		return false
	    	}
	    }
	    io.emit('pinUpdate',{pin:pin,val:output})
			io.emit('printMessage',{type:'Element Set Output',message:"RGB LED at pin" + pins +" changed output to "+output});
    }


}

module.exports = gpiojs;