/*eslint @typescript-eslint/no-explicit-any: `off`*/
import http, { base_url } from 'app/src/capacitor/service/index';

class OrderCapService {
	getAll() {
		return http.get(`${base_url}/api/orders`);
	}

	get(id: number) {
		return http.get(`${base_url}/api/orders/find`, null, {
			actorId: id,
		});
	}

	getNbOrders() {
		return http.get(`${base_url}/api/orders/nb`);
	}

	create(data: any) {
		return http.post(`${base_url}/api/orders`, null, null, data);
	}

	update(id: number, data: any) {
		return http.put(`${base_url}/api/orders/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.deleteRequest(`${base_url}/api/orders/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/orders`);
	}
}

export default new OrderCapService();