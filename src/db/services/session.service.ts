import { http } from 'app/src/db/services/index';

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
