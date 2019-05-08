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
		} else{
			this.pin = pin
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
			console.log("test")
			if(self.getPin() == data.pin){
				if(self.getType() != 'BUTTON'){
					self.getVal = data.val;
				}
				
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
	async toggleOutput(){
		console.log("element toggleOutput");
		var output = this.val;
		if(output === 1 ) output = 0;
		else if(output === 0 ) output = 1;
		this.val = output;
		await APIService.setOutput(this.getPin(),output).then((data) => {
			console.log(data)
		})
	}
	async setOutput(output){
		console.log("element setOutput");
		if(this.getType() === "RGB"){
			console.log(this.getPin())
			await APIService.setOutput(this.getMultiPins(),output,this.getType()).then((data) => {
				console.log(data) 
			})
		}
		else{
			console.log(this.getPin())
			console.log(output)
			this.val = output
			await APIService.setOutput(this.getPin(),output,this.getType()).then((data) => {
				console.log(data)

			})
		}
	}

	removeInterpreterListener(){
		this.interpreterListener = false;
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