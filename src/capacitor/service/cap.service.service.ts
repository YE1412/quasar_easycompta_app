/*eslint @typescript-eslint/no-explicit-any: `off`*/
import http, { base_url } from 'app/src/capacitor/service/index';

class ServiceCapService {
	getAll() {
		return http.get(`${base_url}/api/services`);
	}

	get(id: number) {
		return http.get(`${base_url}/api/services/find`, null, {
		    serviceId: id,
		});
	}

	getNbServices() {
		return http.get(`${base_url}/api/services/nb`);
	}

	create(data: any) {
		return http.post(`${base_url}/api/services`, null, null, data);
	}

	update(id: number, data: any) {
		return http.put(`${base_url}/api/services/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.deleteRequest(`${base_url}/api/services/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/services`);
	}

	findByAmountAndType(montantHt: any, type: any) {
		return http.get(`${base_url}/api/services/amount/${montantHt}/type/${type}`);
	}
}

export default new ServiceCapService();