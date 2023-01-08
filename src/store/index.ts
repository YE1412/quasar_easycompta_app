/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { createStore } from 'vuex';
// import counter from './counter';
// import session from './session';
import { Router } from 'vue-router';
// import { decryptMod } from 'modules/WasmModules';
// import sessionService from 'db/services/session.service';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    readonly $router: Router;
  }
}

// let __DECRYPTAPI__: any;

// async function define() {
//   if (__DECRYPTAPI__ === undefined) {
//     return (__DECRYPTAPI__ = await decryptMod.then((e: any) => {
//       return e;
//     })
//     );
//   }
//   return;
// };

// const transformObj = async (obj: any) => {
//   await define();
//   let ret: any;
//   if (typeof obj === "string") {
//     ret = "";
//   } else if (typeof obj === "object" && !Array.isArray(obj)) {
//     ret = {};
//   } else {
//     ret = [];
//   }
//   for (const k in obj) {
//     if (
//       typeof obj[k] === "string" &&
//       k !== "date" &&
//       k !== "langue" &&
//       k !== "devise"
//     ) {
//       ret[k] = __DECRYPTAPI__.decrypt(obj[k]);
//     } else if (
//       typeof obj[k] === "object" &&
//       !Array.isArray(obj[k]) &&
//       k !== "langue" &&
//       k !== "devise"
//     ) {
//       if (obj[k] === null) ret[k] = null;
//       else ret[k] = await transformObject(obj[k]);
//     } else if (Array.isArray(obj[k])) {
//       ret[k] = await transformObject(obj[k]);
//     } else if (obj[k] === null) {
//       // console.log(k);
//     } else ret[k] = obj[k];
//   }
//   // console.log(ret);
//   return ret;
// };

// export { sessionService, transformObj };

// export transformObj;

export interface StateInterface {
  prop: boolean;
  counter: number;
  drawerState: boolean;
};

export default function ({ ssrContext }) {
  // console.log('Cookie Storage !');
  // const cookies = process.env.SERVER
  //   ? Cookies.parseSSR(ssrContext)
  //   : Cookies;
  // const pinia = createPinia();
  // pinia.use(({ options }) => {
  //   if (!options.persist.storage || typeof options.persist.storage === 'boolean')
  //     return;
  //   if (options.persist.storage === cookieStorage){
  //     console.log('Cookie Storage !');
  //     console.log(options.persist.storage);
  //     options.persist.storage = {
  //       getItem(key: string) {
  //         return JSON.parse(cookies.get(key));
  //       },
  //       setItem(key: string, val: any){
  //         const obj = JSON.stringify(val);
  //         cookies.set(key, obj, {path: '/', sameSite: 'Lax', secure: true})
  //       }
  //     };
  //   }
  // });
  // pinia.use(piniaPluginPersistedstate);
  // return pinia;
  const Store = createStore({
    modules: {
      counter,
      session
    },

    enable strict mode (adds overhead!)
    for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
};