import { http } from "app/src/boot/axios_client";

class ActorDataService {
  getAll() {
    return http.get("/actors");
  }

  getAllTypes() {
    return http.get("/actors/types");
  }

  get(id: number) {
    return http.get(`/actors/find`, {
      params: {
        actorId: id,
      },
    });
  }

  getNbActors() {
    return http.get("/actors/nb");
  }

  create(data: any) {
    return http.post(`/actors`, data);
  }

  update(id: number, data: any) {
    return http.put(`/actors/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/actors/${id}`);
  }

  deleteAll() {
    return http.delete(`/actors`);
  }

  findByTypes(types: any) {
    return http.get(`/actors/types/${types}`);
  }
}

export default new ActorDataService();
