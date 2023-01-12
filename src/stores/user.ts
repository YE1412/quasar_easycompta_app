/*eslint @typescript-eslint/no-explicit-any: 'off'*/
// import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import userAxiosService from 'app/src/db/services/user.service';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';
// import { extend, LocalStorage, SessionStorage } from 'quasar';
// import { computed, ref } from 'vue';
// import { useLocalStorage } from '@vueuse/core';
import { cookieStorage } from 'app/src/stores/storage';

const useUserStore = defineStore('user', {
  // console.log('All items in storage from User store --> ');
  // console.log(LocalStorage.getAll());

  state: () => ({
    connected: false,
    user: {},
  }),
  persist: {
    storage: cookieStorage,
  },

  // const connected = ref(useLocalStorage('connected', false));
  // const user = ref(useLocalStorage('user', {}));

  // if (!!LocalStorage.getItem('connected')){
  //   console.log('Connected existing in LocalStorage');
  //   console.log(LocalStorage.getItem('connected'));
  //   connected.value = LocalStorage.getItem('connected');
  // }
  // if (!!LocalStorage.getItem('user')){
  //   console.log('User existing in LocalStorage');
  //   console.log(LocalStorage.getItem('user'));
  //   user.value = LocalStorage.getItem('user');
  // }

  // const getConnected = computed(() => {
  //   console.log('Gettin\' connected state !');
  //   console.log(connected.value);
  //   return connected.value;
  // });
  // const getUser = computed(() => {
  //   console.log('Gettin\' user state !');
  //   console.log(user.value);
  //   return user.value;
  // });

  // function setConnected(val: boolean){
  //   const copyOfData = val;
  //   // LocalStorage.set('connected', copyOfData);
  //   connected.value = copyOfData;
  //   console.log('Setting connected !');
  //   console.log(connected);
  // };
  // function setUser(val: any){
  //   const copyOfData = extend(true, {}, val);
  //   // LocalStorage.set('user', copyOfData);
  //   user.value = copyOfData;
  // };
  // function removeUser(){
  //   // LocalStorage.remove('user');
  //   user.value = {};
  // };
  // function removeConnected(){
  //   // LocalStorage.remove('connected');
  //   connected.value = false;
  // };
  // function loginUser(login: string, password: string){
  //   return new Promise((resolve, reject) => {
  //       userAxiosService
  //         .get(login, password)
  //         .then(async (res) => {
  //           // console.log(res);
  //           if (res.data.length) {
  //             // console.log(res.data);
  //             await setDecryptApi();
  //             const dataClear = await __TRANSFORMOBJ__(res.data);
  //             // const dataClear = res.data;
  //             setUser(dataClear[0]);
  //             resolve(dataClear[0]);
  //           } else {
  //             reject(false);
  //           }
  //         })
  //         .catch((err) => {
  //           // La requête a été faite et le code de
  //           //   réponse du serveur n'est pas dans la plage 2xx
  //           if (err.response) {
  //             console.log(err.response.data);
  //             console.log(err.response.status);
  //             console.log(err.response.headers);
  //           }
  //           // La requête a été  faite mais aucune réponse
  //           //  n'a été ruçue `error.request` est une instance de
  //           //  XMLHttpRequest dans le navigateur et une instance
  //           //  de http.ClientRequest avec node.js
  //           else if (err.request) {
  //             console.log(err.request);
  //           }
  //           // Quelque chose s'est passé lors de la construction de
  //           //  la requête et cela a provoqué une erreur
  //           else {
  //             console.log('Error', err.message);
  //           }
  //           console.log(err.config);
  //           reject(new Error(err));
  //         });
  //     });
  // };
  // function retrieveUser(id: number){
  //   return new Promise((resolve, reject) => {
  //       userAxiosService
  //         .retrieve(id)
  //         .then(async (res) => {
  //           // console.log(res);
  //           if (res.data.length) {
  //             // console.log(res.data);
  //             await setDecryptApi();
  //             const dataClear = await __TRANSFORMOBJ__(res.data);
  //             // const dataClear = res.data;
  //             // console.log(dataClear);
  //             setUser(dataClear[0]);
  //             resolve(dataClear[0]);
  //           } else {
  //             reject(false);
  //           }
  //         })
  //         .catch((err) => {
  //           // La requête a été faite et le code de
  //           //   réponse du serveur n'est pas dans la plage 2xx
  //           if (err.response) {
  //             console.log(err.response.data);
  //             console.log(err.response.status);
  //             console.log(err.response.headers);
  //           }
  //           // La requête a été  faite mais aucune réponse
  //           //  n'a été ruçue `error.request` est une instance de
  //           //  XMLHttpRequest dans le navigateur et une instance
  //           //  de http.ClientRequest avec node.js
  //           else if (err.request) {
  //             console.log(err.request);
  //           }
  //           // Quelque chose s'est passé lors de la construction de
  //           //  la requête et cela a provoqué une erreur
  //           else {
  //             console.log('Error', err.message);
  //           }
  //           console.log(err.config);
  //           reject(new Error(err));
  //         });
  //     });
  // };
  // function getUserTypes(){
  //   return new Promise((resolve, reject) => {
  //       userAxiosService
  //         .getTypes()
  //         .then((res) => {
  //           // console.log(res);
  //           if (res.data.length) {
  //             // console.log(res.data);
  //             // await setDecryptApi();
  //             // const dataClear = await __TRANSFORMOBJ__(res.data);
  //             const dataClear = res.data;
  //             // this.user = dataClear[0];
  //             resolve(dataClear);
  //           } else {
  //             reject(false);
  //           }
  //         })
  //         .catch((err) => {
  //           // La requête a été faite et le code de
  //           //   réponse du serveur n'est pas dans la plage 2xx
  //           if (err.response) {
  //             console.log(err.response.data);
  //             console.log(err.response.status);
  //             console.log(err.response.headers);
  //           }
  //           // La requête a été  faite mais aucune réponse
  //           //  n'a été ruçue `error.request` est une instance de
  //           //  XMLHttpRequest dans le navigateur et une instance
  //           //  de http.ClientRequest avec node.js
  //           else if (err.request) {
  //             console.log(err.request);
  //           }
  //           // Quelque chose s'est passé lors de la construction de
  //           //  la requête et cela a provoqué une erreur
  //           else {
  //             console.log('Error', err.message);
  //           }
  //           console.log(err.config);
  //           reject(new Error(err));
  //         });
  //     });
  // };
  // function reset(){
  //   removeUser();
  //   removeConnected();
  // };

  getters: {
    getConnected(state) {
      // console.log('Gettin\' connected state !');
      // console.log(state.connected);
      return state.connected;
    },
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setConnected(val: boolean){
      const copyOfData = val;
      // LocalStorage.set('connected', copyOfData);
      this.connected = copyOfData;
      // console.log('Setting connected !');
      // console.log(this.connected);
    },
    setUser(val: any){
      const copyOfData = extend(true, {}, val);
      // LocalStorage.set('user', copyOfData);
      this.user = copyOfData;
    },
    removeUser(){
      // LocalStorage.remove('user');
      this.user = {};
    },
    removeConnected(){
      // LocalStorage.remove('connected');
      this.connected = false;
    },
    loginUser(login: string, password: string) {
      // console.log('Login...');
      return new Promise((resolve, reject) => {
        userAxiosService
          .get(login, password)
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              // console.log(res.data);
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              // const dataClear = res.data;
              this.setUser(dataClear[0]);
              resolve(dataClear[0]);
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
    retrieveUser(id: number) {
      return new Promise((resolve, reject) => {
        userAxiosService
          .retrieve(id)
          .then(async (res) => {
            // console.log(res);
            if (res.data.length) {
              // console.log(res.data);
              await setDecryptApi();
              const dataClear = await __TRANSFORMOBJ__(res.data);
              // const dataClear = res.data;
              // console.log(dataClear);
              this.user = dataClear[0];
              resolve(dataClear[0]);
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
    getUserTypes() {
      return new Promise((resolve, reject) => {
        userAxiosService
          .getTypes()
          .then((res) => {
            // console.log(res);
            if (res.data.length) {
              // console.log(res.data);
              // await setDecryptApi();
              // const dataClear = await __TRANSFORMOBJ__(res.data);
              const dataClear = res.data;
              // this.user = dataClear[0];
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
    reset() {
      this.removeUser();
      this.removeConnected();
    },
  },

  // return {
  //   connected,
  //   user,
  //   getConnected,
  //   getUser,
  //   setConnected,
  //   setUser,
  //   removeUser,
  //   removeConnected,
  //   loginUser,
  //   retrieveUser,
  //   getUserTypes,
  //   reset,
  // };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

export { useUserStore };
