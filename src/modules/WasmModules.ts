/* eslint-disable */
import generateModule from "./plugins/rc_generate_key";
import hashModule from "./plugins/hash_sha256";
import cryptModule from "./plugins/rc_crypt";
import decryptModule from "./plugins/rc_decrypt";
import cryptFileModule from "./plugins/rc_crypt_file";
import decryptFileModule from "./plugins/rc_decrypt_file";

const genMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    generateModule().then(function (Module: any) {
      const api = {
        generate_key: Module.cwrap("generate", "string", ["string"]),
      };
      resolve(api);
    });
  })
  : null;

const cryptMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    cryptModule().then(function (Module: any) {
      const api = {
        crypt: Module.cwrap("rc_crypt", "string", ["string", "string"]),
      };
      resolve(api);
    });
  })
  : null;

const cryptFileMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    cryptFileModule().then(function (Module: any) {
      const api = {
        crypt: Module.cwrap("rc_crypt_file", "string", ["string", "string"]),
      };
      resolve(api);
    });
  })
  : null;

const decryptMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    decryptModule().then(function (Module: any) {
      const api = {
        decrypt: Module.cwrap("rc_decrypt", "string", ["string"]),
      };
      resolve(api);
    });
  })
  : null;

const decryptFileMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    decryptFileModule().then(function (Module: any) {
      const api = {
        decrypt: Module.cwrap("rc_decrypt_file", "string", [
          "string",
          "string",
        ]),
      };
      resolve(api);
    });
  })
  : null;

const hashMod = !import.meta.env.SSR
  ? new Promise((resolve) => {
    hashModule().then(function (Module: any) {
      const api = {
        hash_calc: Module.cwrap("hash", "string", ["string"]),
      };
      resolve(api);
    });
  })
  : null;

export { genMod, cryptMod, cryptFileMod, decryptMod, decryptFileMod, hashMod };
