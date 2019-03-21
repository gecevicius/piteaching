

const Gpio = require('onoff').Gpio;



class gpiojs{
	
	constructor(){
		this.gpioArray = []
	}


	//returns true if gpio is accessible and written successfuly, otherwise return false.
	setOutput(pin,output){
	if (Gpio.accessible) {
		if(!this.getByPin(pin).length > 0){
		const gpio = new Gpio(pin, 'out'); 

		this.gpioArray.push({
			"gpio":gpio,
			"pin":pin
		})
 		 gpio.writeSync(output);
		}
		else {
		 const gpio = this.getByPin(pin).gpio;
		 gpio.writeSync(output);			
		}
		return true
		
	}
		
	return false
	}

	readVal(pin){
		try{
		var gpioArrObj = this.getByPin(pin);
		if(Gpio.accessible){
			
			if(gpioArrObj){
				return gpio.read()
			}
			else return false
		}
		}
		catch(e){
			return "error : " + e
		}
	}

	getByPin(pin){
		this.gpioArray.filter(obj => {
	  		return obj.pin === pin
		})
		return false
	}
	close(){
		this.gpioArray.forEach(function(i){
		i.gpio.unexport()
	})
	this.gpioArray = []
	}


}

module.exports = gpiojs;