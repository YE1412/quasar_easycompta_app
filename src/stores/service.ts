// import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import serviceAxiosService from "app/src/db/services/service.service";
import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';

const useServiceStore = defineStore("service", {
  state: () => ({
    services: [],
  }),
  getters: {
    getServices(state) {
      return state.services;
    },
  },
  actions: {
    getAllServices() {
      // console.log("Login...");
      return new Promise((resolve, reject) => {
        serviceAxiosService
          .getAll()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.services = dataClear;
              // console.log(dataClear);
              resolve(dataClear);
            } else {
              reject(false);
            }
          })
          .catch((err) => {
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
  import.meta.hot.accept(acceptHMRUpdate(useServiceStore, import.meta.hot));
}

export { useServiceStore };
