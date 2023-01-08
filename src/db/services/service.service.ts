import { http } from "app/src/boot/axios_client";

class ServiceDataService {
  getAll() {
    return http.get("/services");
  }

  get(id: number) {
    return http.get(`/services/find`, {
      params: {
        serviceId: id,
      },
    });
  }

  getNbServices() {
    return http.get("/services/nb");
  }

  create(data: any) {
    return http.post(`/services`, data);
  }

  update(id: number, data: any) {
    return http.put(`/services/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/services/${id}`);
  }

  deleteAll() {
    return http.delete(`/services`);
  }

  findByAmountAndType(montantHt: any, type: any) {
    return http.get(`/services/amount/${montantHt}/type/${type}`);
  }
}

export default new ServiceDataService();
