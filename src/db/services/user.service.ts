import { http } from 'app/src/boot/axios_client';

class UserDataService {
  getAll() {
    return http.get('/users');
  }

  getAllDevises() {
    return http.get('/users/devises');
  }

  getAllPrices() {
    return http.get('/users/prices');
  }

  get(login: string, password: string) {
    return http.get(`/users/login`, {
      params: {
        login: login,
        password: password,
      },
    });
  }

  retrieve(id: number) {
    return http.get(`/users/retrieve/${id}`);
  }

  getTypes() {
    return http.get(`/users/types`);
  }

  checkEmail(email: string) {
    return http.get(`/users/email`, {
      params: {
        login: email,
      },
    });
  }

  checkLogin(login: string) {
    return http.get(`/users/email`, {
      params: {
        login: login,
      },
    });
  }

  create(data: any) {
    return http.post(`/users`, data);
  }

  update(id: any, data: any) {
    return http.put(`/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByType(type: any) {
    return http.get(`/users/type/${type}`);
  }
}

export default new UserDataService();
