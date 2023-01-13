// import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import invoiceAxiosService from 'app/src/db/services/invoice.service';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';

const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
    languages: [],
    devises: [],
    sellers: [],
    buyers: [],
    payments: [],
    orders: [],
  }),
  getters: {
    getInvoices(state) {
      return state.invoices;
    },
    getLanguages(state) {
      return state.languages;
    },
    getDevises(state) {
      return state.devises;
    },
    getSellers(state) {
      return state.sellers;
    },
    getBuyers(state) {
      return state.buyers;
    },
    getPayments(state) {
      return state.payments;
    },
    getOrders(state) {
      return state.orders;
    },
  },
  actions: {
    getAllInvoices(userId: number) {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAll(userId)
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.invoices = dataClear;
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getMoreInvoices(ids: number[]) {
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getMore(ids)
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              // console.log(dataClear);
              this.invoices = dataClear;
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllLanguages() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllLanguages()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              // const dataClear = await transformObject(res.data);
              this.languages = res.data;
              // console.log(dataClear);
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllDevises() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllDevises()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              // const dataClear = await transformObject(res.data);
              this.devises = res.data;
              // console.log(dataClear);
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllOrders() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllOrders()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.orders = dataClear;
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllSellers() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllSellers()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.sellers = dataClear;
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllBuyers() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllBuyers()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              this.buyers = dataClear;
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
              console.log('Error', err.message);
            }
            console.log(err.config);
            reject(new Error(err));
          });
      });
    },
    getAllPayments() {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        invoiceAxiosService
          .getAllPayments()
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              // const dataClear = await transformObject(res.data);
              this.payments = res.data;
              // console.log(res.data);
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
              console.log('Error', err.message);
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
  import.meta.hot.accept(acceptHMRUpdate(useInvoiceStore, import.meta.hot));
}

export { useInvoiceStore };
