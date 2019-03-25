import axios from 'axios';

export class APIService{
	constructor(){
		this.API_URL = 'http://192.168.1.247:3000';
		this.gpioUrl = this.API_URL+`/gpio`;
	}

	setOutput (pin,output) {

		//Check if params are objects, that's what the JS-Interpreter used by Blockly sends through.
		if(typeof pin == 'object'){
			pin = pin.data
			output = output.data
		}
		console.log(pin)
		return axios.post(this.gpioUrl,{
			pin:pin,
			output:output
		}).then(function (response) {
			console.log(response);
		})
	}
	read(pin){
		if(typeof pin == 'object'){
			pin = pin.data
		}
		
		return axios.get(this.gpioUrl+"/",{
			params:{
				pin:pin
			}

		}).then(function (response) {
			console.log(response)
			return response
		}).catch(function (error) {
    // handle error
    
})
	}
	close(){
		return axios.get(this.gpioUrl+'/close').then(function (response) {
			return console.log(response);

		})
	}

}