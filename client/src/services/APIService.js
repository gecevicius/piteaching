import axios from 'axios';
const API_URL = 'http://192.168.1.247:3000';


export class APIService{
	constructor(){
		
	}

	setOutput(pin,output) {
		const url = `${API_URL}/gpio`;
		return axios.post(url,{
			pin:pin,
			output:output
		}).then(function (response) {
			console.log(response);
		})
	},
	sendOutput(pin,output){
		
	}
	close(){
		const url = `${API_URL}/gpio`;
		return axios.get(url+'/close').then(function (response) {
			console.log(response);
		})
	}

}