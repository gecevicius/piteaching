import axios from 'axios';
import {parse, stringify} from 'flatted/esm';

export class APIService{
	constructor(){
		this.API_URL = 'http://192.168.1.247:3001';
		this.gpioUrl = this.API_URL+`/gpio`;
	}

	setOutput (pin,output,type) {
		console.log(pin)
		return axios.post(this.gpioUrl,{
			"pin":pin,
			"type":type,
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

	shareWorkspace(blockDB,enabled){
		var stringifiedWs = stringify(blockDB);
		console.log(stringifiedWs)
		 axios.post(this.API_URL+"/sharing",{
			"workspace":stringifiedWs,
			"enabled":true
		}).then(function(response){

		})
	}

	

}