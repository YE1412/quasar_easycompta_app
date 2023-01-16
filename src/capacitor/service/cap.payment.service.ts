/*eslint @typescript-eslint/no-explicit-any: `off`*/
import http, { base_url } from 'app/src/capacitor/service/index';

class PaymentCapService {
	getAll() {
		return http.get(`${base_url}/api/payments`);
	}

	getAllTypes() {
		return http.get(`${base_url}/api/payments/types`);
	}

	getAllInvoices() {
	return http.get(`${base_url}/api/payments/invoices`);
	}

	get(id: number) {
		return http.get(`${base_url}/api/payments/find`, null, {
			actorId: id,
		});
	}

	create(data: any) {
		return http.post(`${base_url}/api/payments`, null, null, data);
	}

	update(id: number, data: any) {
		return http.put(`${base_url}/api/payments/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.deleteRequest(`${base_url}/api/payments/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/payments`);
	}

	findByTypes(types: any) {
		return http.get(`${base_url}/api/payments/types/${types}`);
	}
}

export default new PaymentCapService();