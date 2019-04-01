import {APIService} from '../../services/APIService';
var apiService = new APIService();
import io from 'socket.io-client';
const socketInstance = io('http://192.168.1.247:3001', {
  transports: ['websocket'],
});

class Element{
	constructor(pin,type){
		this.type = type.data;
		this.pin = pin.data;
		this.val = 0;
		this.initListener();
	}

	getVal(){
		return this.val
	}

	getPin(){
		return this.pin
	}

	getType(){
		return this.pin
	}

	initListener(){
		if(this.type == 'BUTTON'){
			apiService.get(pin.data,output.data).then((data) => {
            console.log(data)
         })
			socketInstance.on('pinUpdate', function(pin,val){
			if(this.pin == pin){ 
					alert("success" + pin)
				}
			});
		}
	}

	setOutput(output){
		 apiService.setOutput(pin.data,output.data).then((data) => {
            console.log(data)
         })
	}

}

export default Element