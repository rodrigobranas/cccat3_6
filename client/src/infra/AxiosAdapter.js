import axios from "axios";

export default class AxiosAdapter {

	constructor () {
	}

	get (url) {
		return axios({
			url,
			method: "get"
		});
	}

	post (url, body) {
		return axios({
			url,
			method: "post",
			data: body
		});
	}
}
