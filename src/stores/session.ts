/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { defineStore, acceptHMRUpdate } from 'pinia';
import sessionAxiosService from 'app/src/db/services/session.service';
// import { extend } from 'quasar';
// import { setDecryptApi, __TRANSFORMOBJ__ } from 'app/src/globals';
// import { computed, ref } from 'vue';
// import { useLocalStorage } from '@vueuse/core';
import { cookieStorage } from 'app/src/stores/storage';

// console.log('All items in storage from Session store --> ');
// console.log(LocalStorage.getAll());

const useSessionStore = defineStore('session', {
  state: () => ({
    sessionId: '',
    languages: [],
    langDisplayed: null,
  }),
  // persist: {
  //   storage: LocalStorage,
  //   paths: ['sessionId', 'languages', 'langDisplayed'],
  // },
  persist: {
    storage: cookieStorage,
    debug: true
    // paths: ['sessionId', 'languages', 'langDisplayed'],
  },

  // const getSessionId = computed(() => {
  //   // console.log('Gettin\' sessionId state !');
  //   // console.log(sessionId.value);
  //   return sessionId.value;
  // });
  // const getLanguages = computed(() => {
  //   // console.log('Gettin\' languages state !');
  //   // console.log(languages.value);
  //   return languages.value;
  // });
  // const getLangDisplayed = computed(() => {
  //   console.log('Gettin\' langDisplayed state !');
  //   console.trace(langDisplayed.value);
  //   console.log('Gettin\' langDisplayed state from LocalStorage !');
  //   console.trace(LocalStorage.getItem('langDisplayed'));
  //   return langDisplayed.value;
  // });

  // function setSessionId(id: string){
  //   const copyOfData = id;
  //   // console.log('Setting Session Id from Session !');
  //   // console.log(copyOfData);
  //   // LocalStorage.set('sessionId', copyOfData);
  //   sessionId.value = copyOfData;
  // };
  // function setLanguages(langs: any[]){
  //   const copyOfData = extend(true, [], langs);
  //   // console.log('Setting Languages from Session !');
  //   // console.log(copyOfData);
  //   // LocalStorage.set('languages', copyOfData);
  //   languages.value = copyOfData;
  // };
  // function setLangDisplayed(langsDisplayed: any){
  //   const copyOfData = extend(true, {}, langsDisplayed);
  //   // console.log('Setting LangDisplayed from Session !');
  //   // console.log(copyOfData);
  //   // LocalStorage.set('langDisplayed', copyOfData);
  //   langDisplayed.value = copyOfData;
  //   // console.log('Setting LangDisplayed from Session !');
  //   // console.log(LocalStorage.getItem('langDisplayed'));
  // };
  // function removeSessionId(){
  //   // LocalStorage.remove('sessionId');
  //   sessionId.value = '';
  // };
  // function removeLanguages(){
  //   // LocalStorage.remove('languages');
  //   languages.value = [];
  // };
  // function removeLangDisplayed(){
  //   // LocalStorage.remove('langDisplayed');
  //   langDisplayed.value = {};
  // };
  // function removeAll(){
  //   LocalStorage.clear();
  //   sessionId.value = '';
  //   languages.value = [];
  //   langDisplayed.value = {};
  // };
  // function getSession(){
  //   return new Promise((resolve, reject) => {
  //       sessionAxiosService
  //         .get()
  //         .then((res) => {
  //           // console.log(res);
  //           if (res.data.id) {
  //             // Insertion session en BDD
  //             setSessionId(res.data.id);
  //             // console.log('Session ID from Session !');
  //             // console.log(LocalStorage.getItem('sessionId'));
  //             resolve(res.data.id);
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
  //             console.log("Error", err.message);
  //           }
  //           console.log(err.config);
  //           reject(new Error(err));
  //         });
  //     })
  // };
  // function getLanguagesFromDB(){
  //   return new Promise((resolve, reject) => {
  //       sessionAxiosService
  //         .getLanguages()
  //         .then((res) => {
  //           // console.log(res);
  //           if (res.data.length) {
  //             // Insertion session en BDD
  //             // console.log('Languages from DB !');
  //             // console.log(res.data);
  //             setLanguages(res.data);
  //             // console.log('Languages from Session !');
  //             // console.log(LocalStorage.getItem('languages'));
  //             resolve(res.data);
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
  //             console.log("Error", err.message);
  //           }
  //           console.log(err.config);
  //           reject(new Error(err));
  //         });
  //     })
  // };
  // function validateSession(){
  //   return new Promise((resolve, reject) => {
  //     // console.log('Validate session Id');
  //     // console.log(LocalStorage.getItem('sessionId'));
  //     sessionAxiosService
  //       .validate(sessionId.value ?? '')
  //       .then(() => {
  //         resolve(true);
  //       })
  //       .catch((err) => {
  //         reject(new Error(err));
  //       });
  //   });
  // };
  // function deleteSession(){
  //   // sessionId = null;
  //   removeAll();
  //   return sessionAxiosService
  //     .delete()
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       return new Error(err);
  //     });
  // };

  getters: {
    getSessionId (state) {
      // console.log('Gettin\' sessionId state !');
      // console.log(state.sessionId);
      return state.sessionId;
    },
    getLanguages (state) {
      // console.log('Gettin\' languages state !');
      // console.log(state.languages);
      return state.languages;
    },
    getLangDisplayed (state) {
      // console.log('Gettin\' langDisplayed state !');
      // console.log(state.langDisplayed);
      return state.langDisplayed;
    }
  },

  
  actions: {
    setSessionId(id: string) {
      const copyOfData = id;
      // LocalStorage.set('sessionId', copyOfData);
      this.sessionId = copyOfData;  
    },
    setLanguages(languages: any[]){
      const copyOfData = extend(true, [], languages);
      // LocalStorage.set('languages', copyOfData);
      this.languages = copyOfData; 
    },
    setLangDisplayed(lang: any){
      const copyOfData = extend(true, {}, lang);
      // LocalStorage.set('langDisplayed', copyOfData);
      this.langDisplayed = copyOfData;
      // console.log('LangDisplayed from Session !');
      // console.log(LocalStorage.getItem('langDisplayed'));
    },
    removeSessionId(){
      // LocalStorage.remove('sessionId');
      this.sessionId = '';
    },
    removeLanguages(){
      // LocalStorage.remove('languages');
      this.languages = [];
    },
    removeLangDisplayed(){
      // LocalStorage.remove('langDisplayed');
      this.langDisplayed = {};
    },
    removeAll(){
      // LocalStorage.clear();
      this.sessionId = '';
      this.languages = [];
      this.langDisplayed = {};
    },
    getSession() {
      return new Promise((resolve, reject) => {
        sessionAxiosService
          .get()
          .then((res) => {
            // console.log(res);
            if (res.data.id) {
              // Insertion session en BDD
              this.setSessionId(res.data.id);
              console.log('Session ID from Session !');
              console.log(this.sessionId);
              resolve(res.data.id);
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
      })
    },
    getLanguagesFromDB(){
      return new Promise((resolve, reject) => {
        sessionAxiosService
          .getLanguages()
          .then((res) => {
            // console.log(res);
            if (res.data.length) {
              // Insertion session en BDD
              // this.setLanguages(res.data);
              this.setLanguages(res.data);
              // console.log('Languages from Session !');
              // console.log(LocalStorage.getItem('languages'));
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
      })
    },
    validateSession() {
      return new Promise((resolve, reject) => {
        console.log('Validate session Id');
        console.log(this.sessionId);
        sessionAxiosService
          .validate(this.sessionId ?? '')
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            reject(new Error(err));
          });
      });
    },
    deleteSession() {
      // this.sessionId = null;
      this.removeSessionId();
      return sessionAxiosService
        .delete()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return new Error(err);
        });
    },
  },
  // return { sessionId, 
  //   languages, 
  //   langDisplayed, 
  //   getSessionId,
  //   getLangDisplayed,
  //   getLanguages,
  //   setSessionId,
  //   setLanguages,
  //   setLangDisplayed,
  //   removeSessionId,
  //   removeLanguages,
  //   removeLangDisplayed,
  //   removeAll,
  //   getSession,
  //   getLanguagesFromDB,
  //   validateSession,
  //   deleteSession, };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot));
}

export { useSessionStore };
