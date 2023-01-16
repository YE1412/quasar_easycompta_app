/*eslint @typescript-eslint/no-explicit-any: `off`*/
import http, { base_url } from 'app/src/capacitor/service/index';

class ActorCapService {
	getAll() {
		return http.get(`${base_url}/api/actors`);
	}

	getAllTypes() {
		return http.get(`${base_url}/api/actors/types`);
	}

	get(id: number) {
	return http.get(`${base_url}/api/actors/find`, null, {
	    actorId: id,
	  });
	}

	getNbActors() {
		return http.get(`${base_url}/api/actors/nb`);
	}

	create(data: any) {
		return http.post(`${base_url}/api/actors`, null, null, data);
	}

	update(id: number, data: any) {
		return http.put(`${base_url}/api/actors/${id}`, null, null, data);
	}

	delete(id: any) {
		return http.delete(`${base_url}/api/actors/${id}`);
	}

	deleteAll() {
		return http.deleteRequest(`${base_url}/api/actors`);
	}

	findByTypes(types: any) {
		return http.get(`${base_url}/api/actors/types/${types}`);
	}
}

export default new ActorCapService();