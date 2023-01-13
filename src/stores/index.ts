/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia';
import { Router } from 'vue-router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { Cookies } from 'quasar';
import { cookieStorage } from 'app/src/stores/storage';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(( { ssrContext } ) => {
  // console.log('Cookie Storage !');
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies;
  const pinia = createPinia();
  pinia.use(({ options }) => {
    if (options.persist === undefined)
      return;
    if (!options.persist.storage || typeof options.persist.storage === 'boolean')
      return;
    if (options.persist.storage === cookieStorage){
      // console.log('Cookie Storage !');
      // console.log(options.persist.storage);
      options.persist.storage = {
        getItem(key: string) {
          // console.log(`Cookie Getting Item ${key}!`);
          // console.log(cookies.get(key));
          return JSON.stringify(cookies.get(key));
        },
        setItem(key: string, val: any){
          // console.log(`Cookie Setting Item ${key}!`);
          // console.trace(val);
          const obj = val;
          cookies.set(key, obj, {path: '/', sameSite: 'Lax', secure: false})
        },
        removeItem(key: string){
          // console.log(`Cookie Remove Item ${key}!`);
          cookies.remove(key, {path: '/', sameSite: 'Lax', secure: false});
        },
      };
    }
  });
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)
  pinia.use(piniaPluginPersistedstate);
  // app.config.globalProperties.$pinia = pinia;
  return pinia;
})
