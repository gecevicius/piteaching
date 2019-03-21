import axios from 'axios';
const API_URL = 'http://192.168.1.247:3000';


export class APIService{
	constructor(){
		
	}

	setOutput (pin,output) {
		const url = `${API_URL}/gpio`;
		return axios.post(url,{
			pin:pin,
			output:output
		}).then(sleeper(1000)).then(function (response) {
			console.log(response);
		})
	}
	close(){
		const url = `${API_URL}/gpio`;
		return axios.get(url+'/close').then(sleeper(1000)).then(function (response) {
			console.log(response);

		})
	}
	 sleeper(ms) {
 	 return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}
}