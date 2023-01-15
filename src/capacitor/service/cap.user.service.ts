/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import http, { base_url } from 'app/src/capacitor/service/index';

class UserCapService {
	getAll() {
		return http.get(`${base_url}/api/users`);
	}

	getAllDevises() {
    	return http.get(`${base_url}/api/users/devises`);
 	}

	getAllPrices() {
		return http.get(`${base_url}/api/users/prices`);
	}

	get(login: string, password: string) {
		return http.get(`${base_url}/api/users/login`, null,
		  {
		    login: login,
		    password: password,
		});
	}

	retrieve(id: number) {
		return http.get(`${base_url}/api/users/retrieve/${id}`);
	}

	getTypes() {
		return http.get(`${base_url}/api/users/types`);
	}

	checkEmail(email: string) {
		return http.get(`${base_url}/api/users/email`, null,
		  {
		    login: email,
		});
	}

	checkLogin(login: string) {
		return http.get(`${base_url}/api/users/email`, null, {
	    	login: login,
	  	});
	}

	create(data: any) {
		return http.post(`${base_url}/api/users`, null, null, data);
	}

	update(id: any, data: any) {
		return http.put(`${base_url}/api/users/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.deleteRequest(`${base_url}/api/users/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/users`);
	}

	findByType(type: any) {
		return http.get(`${base_url}/api/users/type/${type}`);
	}
}

export default new UserCapService();