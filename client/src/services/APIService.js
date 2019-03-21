import axios from 'axios';
const API_URL = 'http://192.168.1.247:3000';
const gpioUrl = `${API_URL}/gpio`;

export class APIService{
	constructor(){
		
	}

	setOutput (pin,output) {
		return axios.post(this.gpioUrl,{
			pin:pin,
			output:output
		}).then(this.sleeper(1000)).then(function (response) {
			console.log(response);
		})
	}
	read(oin){
		return axios.get(this.gpioUrl,{
			pin:pin
		}).then(function (response) {
			console.log(response);
		})
	}
	close(){
		return axios.get(this.gpioUrl+'/close').then(function (response) {
			console.log(response);

		})
	}
	 sleeper(ms) {
 	 return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}
}