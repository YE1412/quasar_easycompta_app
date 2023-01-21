import { axios } from 'app/src/boot/axios';

axios.defaults.withCredentials = true;

let url = null, http = null;

// console.log(process.env);
// console.log(import.meta.env);

// if (!import.meta.env.SSR){
url = import.meta.env.PUB_APP_URL.slice(-1) === '/' 
  ? `${import.meta.env.PUB_APP_URL}api`
  : `${import.meta.env.PUB_APP_URL}/api`;
http = axios.create({ baseURL: `${url}`, withCredentials: true, });
// }

export { http };