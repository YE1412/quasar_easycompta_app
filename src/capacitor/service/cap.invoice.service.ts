/*eslint @typescript-eslint/no-explicit-any: `off`*/
import http, { base_url } from 'app/src/capacitor/service/index';

class InvoiceCapService {
	getAll(id: number) {
		return http.get(`${base_url}/api/invoices/all/${id}`);
	}

	getAllSellers() {
		return http.get(`${base_url}/api/invoices/sellers`);
	}

	getAllBuyers() {
		return http.get(`${base_url}/api/invoices/buyers`);
	}

	getAllDevises() {
		return http.get(`${base_url}/api/invoices/devises`);
	}

	getAllOrders() {
		return http.get(`${base_url}/api/invoices/orders`);
	}

	getAllLanguages() {
		return http.get(`${base_url}/api/invoices/languages`);
	}

	getAllPayments() {
		return http.get(`${base_url}/api/invoices/payments`);
	}

	get(id: number) {
		return http.get(`${base_url}/api/invoices/find`, null, {
			actorId: id,
		});
	}

	getFinancialYearNbInvoices(id: number) {
		return http.get(`${base_url}/api/invoices/financialYearNbInvoices`, null, {
			adminId: id,
		});
	}

	getFinancialYearInvoices(id: number) {
		return http.get(`${base_url}/api/invoices/financialYearInvoices`, null, {
			adminId: id,
  		});
	}

	getMore(ids: number[]) {
		return http.get(`${base_url}/api/invoices/find/${ids}`);
	}

	create(data: any) {
		return http.post(`${base_url}/api/invoices`, null, null, data);
	}

	update(id: number, data: any) {
		return http.put(`${base_url}/api/invoices/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.deleteRequest(`${base_url}/api/invoices/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/invoices`);
	}
}

export default new InvoiceCapService();