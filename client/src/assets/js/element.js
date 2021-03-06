import APIService from '../../services/APIService';


import io from 'socket.io-client';
const socketInstance = io('http://192.168.1.247:3001', {
	transports: ['websocket'],
});

class Element{
	constructor(pin,type){
		this.type = type;
		if(pin.rpin){
			this.pin = pin.rpin;
			this.multiPins = pin;
		}
		
		this.val = 0;
		this.interpreterListener = false;
	}

	getVal(){
		return this.val;
	}
	getMultiPins(){
		return this.multiPins
	}
	getPin(){
		return this.pin;
	}

	getType(){
		return this.type;
	}
	setPin(pin){
		this.pin = pin
	}

	initListener(){
		APIService.sense(this.pin,this.type).then((data) => {
			console.log(data)
		})
		var self = this;
		socketInstance.on('pinUpdate', function(data){
			if(self.getPin() == data.pin){
				if(self.getType() != 'BUTTON'){
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
		APIService.setOutput(this.getPin(),output).then((data) => {
			console.log(data)
		})
	}
	setOutput(output){
		if(this.getType() === "RGB"){
			console.log('RGB is here!')
			console.log(this.getPin())
			APIService.setOutput(this.getMultiPins(),output,this.getType()).then((data) => {
			console.log(data) 
			})
		}
		else{
			console.log(this.getPin())
			console.log(output)
			this.val = output
			APIService.setOutput(this.getPin(),output,this.getType()).then((data) => {
				console.log(data)

			})
		}
	}

	removeInterpreterListener(){
		this.interpreterListener = false;
		this.initListener();
	}
	close(){
		this.removeInterpreterListener();
		if(this.multiPins){
			for(var pin in this.getMultiPins()){
				APIService.close(this.getMultiPins()[pin])
			}
		}
		else APIService.close(this.getPin())
	}

}

export default Element