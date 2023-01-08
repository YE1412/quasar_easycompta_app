// import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import actorAxiosService from "app/src/db/services/actor.service";
import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';

const useActorStore = defineStore("actor", {
  state: () => ({
    actors: [],
    types: [],
  }),
  getters: {
    getActors(state) {
      return state.actors;
    },
    getTypes(state) {
      return state.types;
    },
  },
  actions: {
    getAllActors() {
      // console.log("Login...");
      return new Promise((resolve, reject) => {
        actorAxiosService
          .getAll()
          .then(async (res: any) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.actors = dataClear;
              // console.log(dataClear);
              resolve(dataClear);
            } else {
              reject(false);
            }
          })
          .catch((err: any) => {
            // La requête a été faite et le code de
            //   réponse du serveur n'est pas dans la plage 2xx
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            }
            // La requête a été  faite mais aucune réponse
            //  n'a été ruçue `error.request` est une instance de
            //  XMLHttpRequest dans le navigateur et une instance
            //  de http.ClientRequest avec node.js
            else if (err.request) {
              console.log(err.request);
            }
            // Quelque chose s'est passé lors de la construction de
            //  la requête et cela a provoqué une erreur
            else {
              console.log("Error", err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllTypes() {
      return new Promise((resolve, reject) => {
        actorAxiosService
          .getAllTypes()
          .then((res: any) => {
            if (res.data.length) {
              this.types = res.data;
              // console.log(dataClear);
              resolve(res.data);
            } else {
              reject(false);
            }
          })
          .catch((err: any) => {
            // La requête a été faite et le code de
            //   réponse du serveur n'est pas dans la plage 2xx
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            }
            // La requête a été  faite mais aucune réponse
            //  n'a été ruçue `error.request` est une instance de
            //  XMLHttpRequest dans le navigateur et une instance
            //  de http.ClientRequest avec node.js
            else if (err.request) {
              console.log(err.request);
            }
            // Quelque chose s'est passé lors de la construction de
            //  la requête et cela a provoqué une erreur
            else {
              console.log("Error", err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useActorStore, import.meta.hot));
}

export { useActorStore };
