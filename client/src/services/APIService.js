import axios from 'axios';
const API_URL = 'http://192.168.1.247:3000';


export class APIService{
	constructor(){
		
	}

	setOutput(pin,output) {
		const url = `${API_URL}/gpio/set-output/`;
		return axios.post(url,{
			pin:pin
		}).then(function (response) {
			console.log(response);
		})
	}

}