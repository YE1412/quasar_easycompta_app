/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { boot } from 'quasar/wrappers';
import { Http } from '@capacitor-community/http';

const get = async (url: string, headers?: HttpHeaders = [], params?: HttpParams = undefined, data?: any = undefined): HttpResponse => {
  let ret: HttpResponse = null;
  const options: HttpOptions = {
    url: url,
    params: params,
    data: data,
    headers: headers,
  };
  // console.log(options);
  ret = await Http.get(options);
  return ret;
};

const post = async (url: string, headers?: HttpHeaders = [], params?: HttpParams = undefined, data?: any = undefined): HttpResponse => {
  let ret: HttpResponse = null;
  const options: HttpOptions = {
    url: url,
    params: params,
    data: data,
    headers: headers,
  };
  ret = await Http.post(options);
  return ret;
};

const put = async (url: string, headers?: HttpHeaders = [], params?: HttpParams = undefined, data?: any = undefined): HttpResponse => {
  let ret: HttpResponse = null;
  const options: HttpOptions = {
    url: url,
    params: params,
    data: data,
    headers: headers,
  };
  ret = await Http.put(options);
  return ret;
};

const deleteRequest = async (url: string, headers?: HttpHeaders = [], params?: any = undefined): HttpResponse => {
  let ret: HttpResponse = null;
  const options: HttpOptions = {
    url: url,
    params: params,
    headers: headers,
  };
  ret = await Http.delete(options);
  return ret;
};
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app }) => {
  // something to do
  app.config.globalProperties.$get = get;
  app.config.globalProperties.$post = post;
  app.config.globalProperties.$put = put;
  app.config.globalProperties.$deleteRequest = deleteRequest;
});

export { get, post, put, deleteRequest };
