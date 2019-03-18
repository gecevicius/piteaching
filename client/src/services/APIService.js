import axios from 'axios';
const API_URL = 'http://localhost:3000';
export class APIService{
	constructor(){
		
	}

	setOutput() {
    const url = `${API_URL}/gpio/set-output/`;
     return axios.post(url,'high');
}

}