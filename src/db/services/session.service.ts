import { http } from 'app/src/boot/axios_client';

class SessionDataService {
  validate(id: string) {
    return http.post('/session', {
      sessionID: id,
    });
  }

  get() {
    return http.get('/session');
  }

  delete() {
    return http.post('/sessions/logout');
  }

  getLanguages() {
    return http.get('/sessions/languages');
  }
}

export default new SessionDataService();
