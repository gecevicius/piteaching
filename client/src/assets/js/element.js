import {APIService} from '../../services/APIService';
var apiService = new APIService();

import io from 'socket.io-client';
const socketInstance = io('http://192.168.1.247:3001', {
	transports: ['websocket'],
});

class Element{
	constructor(pin,type){
		this.type = type;
		this.pin = pin;
		this.val = 0;
		this.interpreterListener = false;
	}

	getVal(){
		return this.val;
	}

	getPin(){
		return this.pin;
	}

	getType(){
		return this.pin;
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