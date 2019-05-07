
const Gpio = require('pigpio').Gpio;
const hexRgb = require('hex-rgb');

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,type,io){
		
		try{
		if(type === "RGB"){
			this.setRgb(pin,output,io)
		}
		else{
			if(!this.gpioArray[pin]){
				const gpio = new Gpio(pin, {mode:Gpio.OUTPUT}) 
				this.gpioArray[pin] = gpio
				this.gpioArray[pin].type = type;
				gpio.digitalWrite(output);

			}
			else {
				const gpio = this.gpioArray[pin]
				gpio.digitalWrite(output);			
			}
			io.emit('pinUpdate',{pin:pin,val:output})
			//Output enable for testing, otherwise should probably be disabled.
			//io.emit('printMessage',{type:'Element Set Output',msg:type+ " Element at pin " + pin+" changed output to "+output});
			return true
			}
			}
			catch(error){
				io.emit('printMessage',{type:'ERROR',msg:"Invalid output ("+output+") value supplied for pin " + pin});
			}

	}

	readVal(pin){
		if ( pin !== undefined && typeof pin !== undefined && pin!== null){
			var val = this.gpioArray[pin].digitalRead();
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

		const sensor = new Gpio(pin, {
		  mode: Gpio.INPUT,
		  pullUpDown: Gpio.PUD_UP,
		  alert: true
		});

		sensor.glitchFilter(5000);
		this.gpioArray[pin] = sensor
		io.emit('printMessage',{type:'Watch ',msg:"Watching "+type+" element at pin "+pin});
		console.log(type)
		console.log(pin)
		console.log(io)
		sensolr.enableAlert();
		sensor.on('alert',(level, tick) => {
			console.log(type)
			if(type === 'BUTTON' && level === 0){
				io.emit('pinUpdate', {pin:pin,val:level})
			}
			else if(type !== 'BUTTON'){
				io.emit('pinUpdate', {pin:pin,val:level})
			}
		});
	}
	close(pin,io){
		if(pin != undefined && this.gpioArray[pin] != null){
			this.gpioArray[pin].digitalWrite(0)
			this.gpioArray[pin].disableAlert();
			this.gpioArray[pin] = null;
			io.emit('printMessage',{type:'CLOSE ',msg:"Pin "+pin+" closed connection!"});
		}
		else{
			this.gpioArray.forEach(function(i){
				if(i!=null){
				i.digitalWrite(0)
				i.disableAlert();
				i = null;
			}

		})
			io.emit('printMessage',{type:'CLOSE ',msg:"Closed all pin connections!"});
		this.gpioArray = []
		}
		return true
	}



    setRgb(pins,output,io){
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