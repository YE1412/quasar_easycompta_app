/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { boot } from 'quasar/wrappers'
import { genMod } from 'app/src/modules/WasmModules';

let __KEY__, __GENKEYAPI__;
let __SECRET__ = 'myLittleSecret';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  __SECRET__ = import.meta.env.PROD ? 'myProdSecret' : __SECRET__;
  await setGenApi();
  // console.log(isServer);
  // console.log('KEY !');
  // console.log(__KEY__);
  app.config.globalProperties.$key = __KEY__;
});

async function setGenApi() {
  const ret = await genMod;
  __GENKEYAPI__ = ret;
  // console.log(__SECRET__);
  if (!!__KEY__ === false)
    __KEY__ = __GENKEYAPI__.generate_key(__SECRET__);
  return ret;
};
