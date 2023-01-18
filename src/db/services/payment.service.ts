/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { http } from 'app/src/db/services/index';

class PaymentDataService {
  getAll() {
    return http.get('/payments');
  }

  getAllTypes() {
    return http.get('/payments/types');
  }

  // getAllOrders() {
  //   return http.get('/payments/orders');
  // }

  getAllInvoices() {
    return http.get('/payments/invoices');
  }

  get(id: number) {
    return http.get('/payments/find', {
      params: {
        actorId: id,
      },
    });
  }

  create(data: any) {
    return http.post('/payments', data);
  }

  update(id: number, data: any) {
    return http.put(`/payments/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/payments/${id}`);
  }

  deleteAll() {
    return http.delete('/payments');
  }

  findByTypes(types: any) {
    return http.get(`/payments/types/${types}`);
  }
}

export default new PaymentDataService();
