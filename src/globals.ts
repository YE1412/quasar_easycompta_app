import { genMod, cryptMod, decryptMod } from "./modules/WasmModules";

const isServer = import.meta.env.SSR;
const __SECRET__ = "myLittleSecret";
// if (!isServer){
//   window.__KEY__ = null;
// }
const __FORMATOBJ__ = (obj: any): any => {
  // console.log(window.__KEY__);
  // if (!isServer){
    for (const k in obj) {
      if (typeof obj[k] === 'string' && obj[k] !== '' && k !== "date" && k !== "date_format") {
        obj[k] = window.__CRYPTAPI__.crypt(obj[k], window.__KEY__);
      }
    }
  // }
};
const __TRANSFORMOBJ__ = async (obj: any): any => {
  let ret: any;
  if (typeof obj === "string" && obj !== "") {
    ret = "";
  } else if (typeof obj === "object" && !Array.isArray(obj)) {
    ret = {};
  } else {
    ret = [];
  }
  if (!isServer){
    for (const k in obj) {
      if (
        typeof obj[k] === "string" &&
        k !== "date" &&
        k !== "date_format" &&
        k !== "langue" &&
        k !== "devise" && obj[k] !== ""
      ) {
        ret[k] = window.__DECRYPTAPI__.decrypt(obj[k]);
      } else if (
        typeof obj[k] === "object" &&
        !Array.isArray(obj[k]) &&
        k !== "langue" &&
        k !== "devise"
      ) {
        if (obj[k] === null) ret[k] = null;
        else ret[k] = await __TRANSFORMOBJ__(obj[k]);
      } else if (Array.isArray(obj[k])) {
        ret[k] = await __TRANSFORMOBJ__(obj[k]);
      } else ret[k] = obj[k];
    }
  }
  return ret;
};

async function setGenApi() {
  const ret = await genMod;
  if (!isServer) {
    window.__GENKEYAPI__ = ret;
    if (!!window.__KEY__ === false)
      window.__KEY__ = window.__GENKEYAPI__.generate_key(__SECRET__);
  }
  return ret;
};
async function setCryptApi() {
  const ret = await cryptMod;
  // console.log(ret);
  if (!isServer)
    window.__CRYPTAPI__ = ret;
  return ret;
};
async function setDecryptApi() {
  const ret = await decryptMod;
  // console.log(ret);
  if (!isServer){
    window.__DECRYPTAPI__ = ret;
  }
  return ret;
};
// if (isServer) {
  // global.__SECRET__ = "myLittleSecret";
  // global.__GENKEYAPI__;
  // global.__CRYPTAPI__;
  // global.__DECRYPTAPI__;
  // global.__KEY__ = "";
  // genMod.then((e: any) => {
  //   global.__GENKEYAPI__ = e;
  //   global.__KEY__ = global.__GENKEYAPI__.generate_key(global.__SECRET__);
  // });
  // cryptMod.then((e: any) => {
  //   global.__CRYPTAPI__ = e;
  // });
  // decryptMod.then((e: any) => {
  //   global.__DECRYPTAPI__ = e;
  // });
// }
if (!isServer){
  // console.log(isServer);
  setGenApi();
  // window.__KEY__ = null;
}
export { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ };
