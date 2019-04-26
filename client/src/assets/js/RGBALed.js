import Element from "./element"

class RGBALed extends Element{
	constructor(pin,type){
		if(typeof pin === 'object' || pin[1] )
			super(pin[0],type);
		else {
			super(pin,type);
		}

		
	}

	getVal(){
		return this.val;
	}

	getPin(){
		return this.pin;
	}

	getType(){
		return this.type;
	}

	initListener(){
		apiService.sense(this.pin,this.type).then((data) => {
			console.log(data)
		})
		var self = this;
		socketInstance.on('pinUpdate', function(data){
			if(self.getPin() == data.pin){
				if(self.getType != 'BUTTON'){
					self.getVal = data.val;
				}
				console.log(self.interpreterListener)
				if(self.interpreterListener){
					self.interpreterListener.emit('watcherUpdate');
				}

			}
		});
	}

	toggleInterpreterListener(watcher){
		this.interpreterListener = watcher;
		this.initListener();
	}
	toggleOutput(){
		var output = this.val;
		if(output === 1 ) output = 0;
		else if(output === 0 ) output = 1;
		this.val = output;
		apiService.setOutput(this.getPin(),output).then((data) => {
			console.log(data)
		})
	}
	setOutput(output){
		if(this.getType() === "RGB"){
			apiService.setOutput(this.getPin(),output).then((data) => {
				console.log(data)
			})
		}
		console.log(this.getPin())
		console.log(output)
		this.val = output
		apiService.setOutput(this.getPin(),output).then((data) => {
			console.log(data)

		})
	}

	removeInterpreterListener(){
		this.interpreterListener = false;
		this.initListener();
	}
	close(){
		this.removeInterpreterListener();
		apiService.close(this.getPin())
	}

}

export default Element