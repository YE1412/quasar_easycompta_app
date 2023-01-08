import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

axios.defaults.withCredentials = true;

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
var port = 3000;
// console.log(process.env);
port = process.env.MODE === 'ssr' ? port : (process.env.MODE === 'capacitor' ? 3200 : port);
const url = process.env.APP_URL.slice(-1) === '/' 
  ? `${process.env.APP_URL}api`
  : `${process.env.APP_URL}/api`;
const http = axios.create({ baseURL: `${url}`, withCredentials: true, });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  // app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = http;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { http };
