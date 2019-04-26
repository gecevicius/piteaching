
const Gpio = require('pigpio').Gpio;

class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output,io){
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
    	var R_val = (output & 0x110000) >> 16;
        var G_val = (output & 0x001100) >> 8;
        var B_val = (output & 0x000011) >> 0;

        R_val = this.map(R_val, 0, 255, 0, 100);
        G_val = this.map(G_val, 0, 255, 0, 100);
        B_val = this.map(B_val, 0, 255, 0, 100);

        this.setOutput(pins.rpin,100-R_val);     
        this.setOutput(pins.gpin,100-G_val) ;  
        this.setOutput(pins.bpin,100-B_val)  ; 
        
    }


}

module.exports = gpiojs;