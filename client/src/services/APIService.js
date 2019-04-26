import axios from 'axios';


export class APIService{
	constructor(){
		this.API_URL = 'http://10.84.117.17:3000';
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
			"pin":pin,
			"output":output
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

	sense(pin,type){
			return axios.post(this.gpioUrl+"/sensor",{
			pin:pin,
			type:type
		}).then(function (response) {
			console.log(response);
		})
	}


	close(pin){
		if (pin !== undefined || pin >= 0 ){
		return axios.get(this.gpioUrl+'/close',{params : {
			pin:pin
		}
		}).then(function (response) {
			return console.log(response);
		})
		}
		else{
			return axios.get(this.gpioUrl+'/close').then(function (response) {
			return console.log(response);
		})
		}
	}

	getLocals(){
		return axios.get(this.API_URL+"/users").then(function(response){
			return response
		})
	}

	

}