import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
import { useStorage } from "@vueuse/core";
import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';
import { i18n } from 'app/src/boot/i18n';
import userAxiosService from "app/src/db/services/user.service";
import invoiceAxiosService from "app/src/db/services/invoice.service";
import orderAxiosService from "app/src/db/services/order.service";
import actorAxiosService from "app/src/db/services/actor.service";
import serviceAxiosService from "app/src/db/services/service.service";

const t = i18n.global.t;
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    prices: [],
    htFYI: 0.0,
    ttFYI: 0.0,
    payFYI: 0.0,
    invoicesFY: [],
    nbInvoices: 0,
    nbOrders: 0,
    nbActors: 0,
    nbServices: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    getPrices(state: any) {
      return state.prices;
    },
    getEuroPrice(state: any) {
      return state.prices.find((p: any) => {
        return p.euro === 1;
      });
    },
    getDollarPrice(state: any) {
      return state.prices.find((p: any) => {
        return p.dollar === 1;
      });
    },
    getLivrePrice(state: any) {
      return state.prices.find((p: any) => {
        return p.livre === 1;
      });
    },
    getHtFYI(state: any) {
      return state.htFYI;
    },
    getTtFYI(state: any) {
      return state.ttFYI;
    },
    getPayFYI(state: any) {
      return state.payFYI;
    },
    getInvoicesFY(state: any) {
      return state.invoicesFY;
    },
    getNbInvoices(state: any) {
      return state.nbInvoices;
    },
    getNbOrders(state: any) {
      return state.nbOrders;
    },
    getNbActors(state: any) {
      return state.nbActors;
    },
    getNbServices(state: any) {
      return state.nbServices;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    showRouter() {
      console.log(this.router);
    },
    showStorage() {
      console.log(this);
      // console.log(this.storageFunc);
    },
    getAllPrices() {
      return new Promise((resolve, reject) => {
        userAxiosService
          .getAllPrices()
          .then((res) => {
            // console.log(res);
            if (res.data.length) {
              this.prices = res.data;
              resolve(res.data);
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
    getFinancialYearInvoices(adminId: number) {
      // console.log('adminId Finacial Year Invoice !');
      // console.log(adminId);
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getFinancialYearInvoices(adminId)
          .then(async (res) => {
            // console.log(res.data);
            if (res.data.length) {
              // await setDecryptApi();
              // const dataClear = await __TRANSFORMOBJ__(res.data);
              const dataClear = res.data;
              this.invoicesFY = dataClear;
              resolve(dataClear);
            } else {
              resolve(false);
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
    getFinancialYearNbInvoices(adminId: number) {
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getFinancialYearNbInvoices(adminId)
          .then(async (res) => {
            // console.log(res.data);
            if (res.data.length) {
              this.nbInvoices = res.data[0].n_inv;
              resolve(res.data);
            } else {
              resolve(false);
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
    getNbOrdersFromDb() {
      return new Promise((resolve, reject) => {
        orderAxiosService
          .getNbOrders()
          .then(async (res) => {
            // console.log(res.data);
            if (res.data.length) {
              this.nbOrders = res.data[0].n_ord;
              resolve(res.data);
            } else {
              resolve(false);
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
    getNbActorsFromDb() {
      return new Promise((resolve, reject) => {
        actorAxiosService
          .getNbActors()
          .then(async (res) => {
            // console.log(res.data);
            if (res.data.length) {
              this.nbActors = res.data[0].n_act;
              resolve(res.data);
            } else {
              resolve(false);
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
    getNbServicesFromDb() {
      return new Promise((resolve, reject) => {
        serviceAxiosService
          .getNbServices()
          .then(async (res) => {
            // console.log(res.data);
            if (res.data.length) {
              this.nbServices = res.data[0].n_srv;
              resolve(res.data);
            } else {
              resolve(false);
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

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)

//   function showStorage() {
//     console.log(this);
//   };
//   function showRouter() {
//     console.log(this.router);
//   };

//   return { count, doubleCount, showStorage, showRouter }
// });
