import { aH as defineStore, aI as cookieStorage, aJ as extend, r as registerPlugin, _ as __vitePreload, P as Platform, l as inject, aK as quasarKey } from "./index.js";
import { h as http } from "./index4.js";
import { d as decryptMod, c as cryptMod } from "./WasmModules.js";
class UserDataService {
  getAll() {
    return http.get("/users");
  }
  getAllDevises() {
    return http.get("/users/devises");
  }
  getAllPrices() {
    return http.get("/users/prices");
  }
  get(login, password) {
    return http.get("/users/login", {
      params: {
        login,
        password
      }
    });
  }
  retrieve(id) {
    return http.get(`/users/retrieve/${id}`);
  }
  getTypes() {
    return http.get("/users/types");
  }
  checkEmail(email) {
    return http.get("/users/email", {
      params: {
        login: email
      }
    });
  }
  checkLogin(login) {
    return http.get("/users/email", {
      params: {
        login
      }
    });
  }
  create(data) {
    return http.post("/users", data);
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
  deleteAll() {
    return http.delete("/users");
  }
  findByType(type) {
    return http.get(`/users/type/${type}`);
  }
}
var userAxiosService = new UserDataService();
const __FORMATOBJ__ = (obj, key) => {
  for (const k in obj) {
    if (typeof obj[k] === "string" && obj[k] !== "" && k !== "date" && k !== "date_format") {
      obj[k] = window.__CRYPTAPI__.crypt(obj[k], key);
    }
  }
};
const __TRANSFORMOBJ__ = async (obj) => {
  let ret;
  if (typeof obj === "string" && obj !== "") {
    ret = "";
  } else if (typeof obj === "object" && !Array.isArray(obj)) {
    ret = {};
  } else {
    ret = [];
  }
  {
    for (const k in obj) {
      if (typeof obj[k] === "string" && k !== "date" && k !== "date_format" && k !== "langue" && k !== "devise" && obj[k] !== "") {
        ret[k] = window.__DECRYPTAPI__.decrypt(obj[k]);
      } else if (typeof obj[k] === "object" && !Array.isArray(obj[k]) && k !== "langue" && k !== "devise") {
        if (obj[k] === null)
          ret[k] = null;
        else
          ret[k] = await __TRANSFORMOBJ__(obj[k]);
      } else if (Array.isArray(obj[k])) {
        ret[k] = await __TRANSFORMOBJ__(obj[k]);
      } else
        ret[k] = obj[k];
    }
  }
  return ret;
};
async function setCryptApi() {
  const ret = await cryptMod;
  window.__CRYPTAPI__ = ret;
  return ret;
}
async function setDecryptApi() {
  const ret = await decryptMod;
  {
    window.__DECRYPTAPI__ = ret;
  }
  return ret;
}
const useUserStore = defineStore("user", {
  state: () => ({
    connected: false,
    user: {}
  }),
  persist: {
    storage: cookieStorage
  },
  getters: {
    getConnected(state) {
      return state.connected;
    },
    getUser(state) {
      return state.user;
    }
  },
  actions: {
    setConnected(val) {
      const copyOfData = val;
      this.connected = copyOfData;
    },
    setUser(val) {
      const copyOfData = extend(true, {}, val);
      this.user = copyOfData;
    },
    removeUser() {
      this.user = {};
    },
    removeConnected() {
      this.connected = false;
    },
    loginUser(login, password) {
      return new Promise((resolve, reject) => {
        userAxiosService.get(login, password).then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.setUser(dataClear[0]);
            resolve(dataClear[0]);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    retrieveUser(id) {
      return new Promise((resolve, reject) => {
        userAxiosService.retrieve(id).then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.user = dataClear[0];
            resolve(dataClear[0]);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    getUserTypes() {
      return new Promise((resolve, reject) => {
        userAxiosService.getTypes().then((res) => {
          if (res.data.length) {
            const dataClear = res.data;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    reset() {
      this.removeUser();
      this.removeConnected();
    }
  }
});
class SQLiteConnection {
  constructor(sqlite2) {
    this.sqlite = sqlite2;
    this._connectionDict = /* @__PURE__ */ new Map();
  }
  async initWebStore() {
    try {
      await this.sqlite.initWebStore();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async saveToStore(database) {
    try {
      await this.sqlite.saveToStore({ database });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async echo(value) {
    try {
      const res = await this.sqlite.echo({ value });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isSecretStored() {
    try {
      const res = await this.sqlite.isSecretStored();
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async setEncryptionSecret(passphrase) {
    try {
      await this.sqlite.setEncryptionSecret({ passphrase });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async changeEncryptionSecret(passphrase, oldpassphrase) {
    try {
      await this.sqlite.changeEncryptionSecret({
        passphrase,
        oldpassphrase
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async clearEncryptionSecret() {
    try {
      await this.sqlite.clearEncryptionSecret();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async addUpgradeStatement(database, toVersion, statements) {
    const upgrade = {
      toVersion,
      statements
    };
    try {
      if (database.endsWith(".db"))
        database = database.slice(0, -3);
      await this.sqlite.addUpgradeStatement({
        database,
        upgrade: [upgrade]
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async createConnection(database, encrypted, mode, version, readonly) {
    try {
      if (database.endsWith(".db"))
        database = database.slice(0, -3);
      await this.sqlite.createConnection({
        database,
        encrypted,
        mode,
        version,
        readonly
      });
      const conn = new SQLiteDBConnection(database, readonly, this.sqlite);
      const connName = readonly ? `RO_${database}` : `RW_${database}`;
      this._connectionDict.set(connName, conn);
      return Promise.resolve(conn);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async closeConnection(database, readonly) {
    try {
      if (database.endsWith(".db"))
        database = database.slice(0, -3);
      await this.sqlite.closeConnection({ database, readonly });
      const connName = readonly ? `RO_${database}` : `RW_${database}`;
      this._connectionDict.delete(connName);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isConnection(database, readonly) {
    const res = {};
    if (database.endsWith(".db"))
      database = database.slice(0, -3);
    const connName = readonly ? `RO_${database}` : `RW_${database}`;
    res.result = this._connectionDict.has(connName);
    return Promise.resolve(res);
  }
  async retrieveConnection(database, readonly) {
    if (database.endsWith(".db"))
      database = database.slice(0, -3);
    const connName = readonly ? `RO_${database}` : `RW_${database}`;
    if (this._connectionDict.has(connName)) {
      const conn = this._connectionDict.get(connName);
      if (typeof conn != "undefined")
        return Promise.resolve(conn);
      else {
        return Promise.reject(`Connection ${database} is undefined`);
      }
    } else {
      return Promise.reject(`Connection ${database} does not exist`);
    }
  }
  async getNCDatabasePath(path, database) {
    try {
      const databasePath = await this.sqlite.getNCDatabasePath({
        path,
        database
      });
      return Promise.resolve(databasePath);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async createNCConnection(databasePath, version) {
    try {
      await this.sqlite.createNCConnection({
        databasePath,
        version
      });
      const conn = new SQLiteDBConnection(databasePath, true, this.sqlite);
      const connName = `RO_${databasePath})`;
      this._connectionDict.set(connName, conn);
      return Promise.resolve(conn);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async closeNCConnection(databasePath) {
    try {
      await this.sqlite.closeNCConnection({ databasePath });
      const connName = `RO_${databasePath})`;
      this._connectionDict.delete(connName);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isNCConnection(databasePath) {
    const res = {};
    const connName = `RO_${databasePath})`;
    res.result = this._connectionDict.has(connName);
    return Promise.resolve(res);
  }
  async retrieveNCConnection(databasePath) {
    if (this._connectionDict.has(databasePath)) {
      const connName = `RO_${databasePath})`;
      const conn = this._connectionDict.get(connName);
      if (typeof conn != "undefined")
        return Promise.resolve(conn);
      else {
        return Promise.reject(`Connection ${databasePath} is undefined`);
      }
    } else {
      return Promise.reject(`Connection ${databasePath} does not exist`);
    }
  }
  async isNCDatabase(databasePath) {
    try {
      const res = await this.sqlite.isNCDatabase({ databasePath });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async retrieveAllConnections() {
    return this._connectionDict;
  }
  async closeAllConnections() {
    const delDict = /* @__PURE__ */ new Map();
    try {
      for (const key of this._connectionDict.keys()) {
        const database = key.substring(3);
        const readonly = key.substring(0, 3) === "RO_" ? true : false;
        await this.sqlite.closeConnection({ database, readonly });
        delDict.set(key, null);
      }
      for (const key of delDict.keys()) {
        this._connectionDict.delete(key);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async checkConnectionsConsistency() {
    try {
      const keys = [...this._connectionDict.keys()];
      const openModes = [];
      const dbNames = [];
      for (const key of keys) {
        openModes.push(key.substring(0, 2));
        dbNames.push(key.substring(3));
      }
      const res = await this.sqlite.checkConnectionsConsistency({
        dbNames,
        openModes
      });
      if (!res.result)
        this._connectionDict = /* @__PURE__ */ new Map();
      return Promise.resolve(res);
    } catch (err) {
      this._connectionDict = /* @__PURE__ */ new Map();
      return Promise.reject(err);
    }
  }
  async importFromJson(jsonstring) {
    try {
      const ret = await this.sqlite.importFromJson({ jsonstring });
      return Promise.resolve(ret);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isJsonValid(jsonstring) {
    try {
      const ret = await this.sqlite.isJsonValid({ jsonstring });
      return Promise.resolve(ret);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async copyFromAssets(overwrite) {
    const mOverwrite = overwrite != null ? overwrite : true;
    try {
      await this.sqlite.copyFromAssets({ overwrite: mOverwrite });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getFromHTTPRequest(url, overwrite) {
    const mOverwrite = overwrite != null ? overwrite : true;
    try {
      await this.sqlite.getFromHTTPRequest({ url, overwrite: mOverwrite });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isDatabase(database) {
    if (database.endsWith(".db"))
      database = database.slice(0, -3);
    try {
      const res = await this.sqlite.isDatabase({ database });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getDatabaseList() {
    try {
      const res = await this.sqlite.getDatabaseList();
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getMigratableDbList(folderPath) {
    if (!folderPath || folderPath.length === 0) {
      return Promise.reject("You must provide a folder path");
    }
    try {
      const res = await this.sqlite.getMigratableDbList({
        folderPath
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async addSQLiteSuffix(folderPath, dbNameList) {
    const path = folderPath ? folderPath : "default";
    const dbList = dbNameList ? dbNameList : [];
    try {
      const res = await this.sqlite.addSQLiteSuffix({
        folderPath: path,
        dbNameList: dbList
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async deleteOldDatabases(folderPath, dbNameList) {
    const path = folderPath ? folderPath : "default";
    const dbList = dbNameList ? dbNameList : [];
    try {
      const res = await this.sqlite.deleteOldDatabases({
        folderPath: path,
        dbNameList: dbList
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async moveDatabasesAndAddSuffix(folderPath, dbNameList) {
    const path = folderPath ? folderPath : "default";
    const dbList = dbNameList ? dbNameList : [];
    return this.sqlite.moveDatabasesAndAddSuffix({
      folderPath: path,
      dbNameList: dbList
    });
  }
}
class SQLiteDBConnection {
  constructor(dbName, readonly, sqlite2) {
    this.dbName = dbName;
    this.readonly = readonly;
    this.sqlite = sqlite2;
  }
  getConnectionDBName() {
    return this.dbName;
  }
  getConnectionReadOnly() {
    return this.readonly;
  }
  async open() {
    try {
      await this.sqlite.open({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async close() {
    try {
      await this.sqlite.close({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getUrl() {
    try {
      const res = await this.sqlite.getUrl({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getVersion() {
    try {
      const version = await this.sqlite.getVersion({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve(version);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getTableList() {
    try {
      const res = await this.sqlite.getTableList({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async execute(statements, transaction = true) {
    try {
      if (!this.readonly) {
        const res = await this.sqlite.execute({
          database: this.dbName,
          statements,
          transaction,
          readonly: false
        });
        return Promise.resolve(res);
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async query(statement, values) {
    let res;
    try {
      if (values && values.length > 0) {
        res = await this.sqlite.query({
          database: this.dbName,
          statement,
          values,
          readonly: this.readonly
        });
      } else {
        res = await this.sqlite.query({
          database: this.dbName,
          statement,
          values: [],
          readonly: this.readonly
        });
      }
      if (res && typeof res.values[0] === "object") {
        if (Object.keys(res.values[0]).includes("ios_columns")) {
          const columnList = res.values[0]["ios_columns"];
          const iosRes = [];
          for (let i = 1; i < res.values.length; i++) {
            const rowJson = res.values[i];
            const resRowJson = {};
            for (const item of columnList) {
              resRowJson[item] = rowJson[item];
            }
            iosRes.push(resRowJson);
          }
          res = {};
          res["values"] = iosRes;
        }
      }
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async run(statement, values, transaction = true) {
    let res;
    try {
      if (!this.readonly) {
        if (values && values.length > 0) {
          res = await this.sqlite.run({
            database: this.dbName,
            statement,
            values,
            transaction,
            readonly: false
          });
        } else {
          res = await this.sqlite.run({
            database: this.dbName,
            statement,
            values: [],
            transaction,
            readonly: false
          });
        }
        return Promise.resolve(res);
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async executeSet(set, transaction = true) {
    try {
      if (!this.readonly) {
        const res = await this.sqlite.executeSet({
          database: this.dbName,
          set,
          transaction,
          readonly: false
        });
        return Promise.resolve(res);
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isExists() {
    try {
      const res = await this.sqlite.isDBExists({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isTable(table) {
    try {
      const res = await this.sqlite.isTableExists({
        database: this.dbName,
        table,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async isDBOpen() {
    try {
      const res = await this.sqlite.isDBOpen({
        database: this.dbName,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async delete() {
    try {
      if (!this.readonly) {
        await this.sqlite.deleteDatabase({
          database: this.dbName,
          readonly: false
        });
        return Promise.resolve();
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async createSyncTable() {
    try {
      if (!this.readonly) {
        const res = await this.sqlite.createSyncTable({
          database: this.dbName,
          readonly: false
        });
        return Promise.resolve(res);
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async setSyncDate(syncdate) {
    try {
      if (!this.readonly) {
        await this.sqlite.setSyncDate({
          database: this.dbName,
          syncdate,
          readonly: false
        });
        return Promise.resolve();
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async getSyncDate() {
    try {
      const res = await this.sqlite.getSyncDate({
        database: this.dbName,
        readonly: this.readonly
      });
      let retDate = "";
      if (res.syncDate > 0)
        retDate = new Date(res.syncDate * 1e3).toISOString();
      return Promise.resolve(retDate);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async exportToJson(mode) {
    try {
      const res = await this.sqlite.exportToJson({
        database: this.dbName,
        jsonexportmode: mode,
        readonly: this.readonly
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async deleteExportedRows() {
    try {
      if (!this.readonly) {
        await this.sqlite.deleteExportedRows({
          database: this.dbName,
          readonly: false
        });
        return Promise.resolve();
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async executeTransaction(txn) {
    try {
      if (!this.readonly) {
        const ret = await this.sqlite.execute({
          database: this.dbName,
          statements: "BEGIN TRANSACTION;",
          transaction: false
        });
        if (ret.changes.changes < 0) {
          return Promise.reject("Error in BEGIN TRANSACTION");
        }
        for (const task of txn) {
          if (task.values && task.values.length > 0) {
            const ret2 = await this.sqlite.run({
              database: this.dbName,
              statement: task.statement,
              values: task.values,
              transaction: false,
              readonly: false
            });
            if (ret2.changes.lastId === -1) {
              await this.execute("ROLLBACK;", false);
              return Promise.reject("Error in transaction run ");
            }
          } else {
            const ret2 = await this.sqlite.execute({
              database: this.dbName,
              statements: task.statement,
              transaction: false,
              readonly: false
            });
            if (ret2.changes.changes < 0) {
              await this.sqlite.execute({
                database: this.dbName,
                statements: "ROLLBACK;",
                transaction: false,
                readonly: false
              });
              return Promise.reject("Error in transaction execute ");
            }
          }
        }
        await this.sqlite.execute({
          database: this.dbName,
          statements: "COMMIT;",
          transaction: false,
          readonly: false
        });
        return Promise.resolve();
      } else {
        return Promise.reject("not allowed in read-only mode");
      }
    } catch (err) {
      await this.sqlite.execute({
        database: this.dbName,
        statements: "ROLLBACK;",
        transaction: false,
        readonly: false
      });
      return Promise.reject(err);
    }
  }
}
const CapacitorSQLite = registerPlugin("CapacitorSQLite", {
  web: () => __vitePreload(() => import("./web4.js"), true ? ["assets/web4.js","assets/index.js","assets/index.css"] : void 0).then((m) => new m.CapacitorSQLiteWeb()),
  electron: () => window.CapacitorCustomPlatform.plugins.CapacitorSQLite
});
function applyPolyfills() {
  var promises = [];
  if (typeof window !== "undefined") {
    var win2 = window;
    if (!win2.customElements || win2.Element && (!win2.Element.prototype.closest || !win2.Element.prototype.matches || !win2.Element.prototype.remove || !win2.Element.prototype.getRootNode)) {
      promises.push(__vitePreload(() => import(
        /* webpackChunkName: "polyfills-dom" */
        "./dom.js"
      ), true ? [] : void 0));
    }
    var checkIfURLIsSupported = function() {
      try {
        var u = new URL("b", "http://a");
        u.pathname = "c%20d";
        return u.href === "http://a/c%20d" && u.searchParams;
      } catch (e) {
        return false;
      }
    };
    if ("function" !== typeof Object.assign || !Object.entries || !Array.prototype.find || !Array.prototype.includes || !String.prototype.startsWith || !String.prototype.endsWith || win2.NodeList && !win2.NodeList.prototype.forEach || !win2.fetch || !checkIfURLIsSupported() || typeof WeakMap == "undefined") {
      promises.push(__vitePreload(() => import(
        /* webpackChunkName: "polyfills-core-js" */
        "./core-js.js"
      ).then(function(n) {
        return n.c;
      }), true ? ["assets/core-js.js","assets/_commonjsHelpers.js"] : void 0));
    }
  }
  return Promise.all(promises);
}
const NAMESPACE = "jeep-sqlite";
let scopeId;
let hostTagName;
let isSvgMode = false;
let queuePending = false;
const createTime = (fnName, tagName = "") => {
  {
    return () => {
      return;
    };
  }
};
const uniqueTime = (key, measureText) => {
  {
    return () => {
      return;
    };
  }
};
const HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
const EMPTY_OBJ = {};
const isDef = (v) => v != null;
const isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
const h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i = 0; i < c.length; i++) {
      child = c[i];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
          child = String(child);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  return vnode;
};
const newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null
  };
  {
    vnode.$attrs$ = null;
  }
  return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
const parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 4) {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    }
    if (propType & 1) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
const emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
const rootAppliedStyles = /* @__PURE__ */ new WeakMap();
const registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === "string") {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
  let scopeId2 = getScopeId(cmpMeta);
  const style = styles.get(scopeId2);
  styleContainerNode = styleContainerNode.nodeType === 11 ? styleContainerNode : doc;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      if (!appliedStyles.has(scopeId2)) {
        {
          {
            styleElm = doc.createElement("style");
            styleElm.innerHTML = style;
          }
          styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector("link"));
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
      styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
    }
  }
  return scopeId2;
};
const attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
  if (flags & 10) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
  }
  endAttachStyles();
};
const getScopeId = (cmp, mode) => "sc-" + cmp.$tagName$;
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    memberName.toLowerCase();
    {
      const isComplex = isComplexType(newValue);
      if ((isProp || isComplex && newValue !== null) && !isSvg) {
        try {
          if (!elm.tagName.includes("-")) {
            const n = newValue == null ? "" : newValue;
            if (memberName === "list") {
              isProp = false;
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n;
            }
          } else {
            elm[memberName] = newValue;
          }
        } catch (e) {
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};
const updateElement = (oldVnode, newVnode, isSvgMode2, memberName) => {
  const elm = newVnode.$elm$.nodeType === 11 && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  {
    for (memberName in oldVnodeAttrs) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode2, newVnode.$flags$);
      }
    }
  }
  for (memberName in newVnodeAttrs) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode2, newVnode.$flags$);
  }
};
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i = 0;
  let elm;
  let childNode;
  {
    elm = newVNode2.$elm$ = doc.createElement(newVNode2.$tag$);
    {
      updateElement(null, newVNode2, isSvgMode);
    }
    if (isDef(scopeId) && elm["s-si"] !== scopeId) {
      elm.classList.add(elm["s-si"] = scopeId);
    }
    if (newVNode2.$children$) {
      for (i = 0; i < newVNode2.$children$.length; ++i) {
        childNode = createElm(oldParentVNode, newVNode2, i);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
  }
  return elm;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = parentElm;
  let childNode;
  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        containerElm.insertBefore(childNode, before);
      }
    }
  }
};
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnode = vnodes[startIdx]) {
      elm = vnode.$elm$;
      elm.remove();
    }
  }
};
const updateChildren = (parentElm, oldCh, newVNode2, newCh) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      patch(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        {
          oldStartVnode.$elm$.parentNode.insertBefore(node, oldStartVnode.$elm$);
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode2, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
const isSameVnode = (leftVNode, rightVNode) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    return true;
  }
  return false;
};
const patch = (oldVNode, newVNode2) => {
  const elm = newVNode2.$elm$ = oldVNode.$elm$;
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  {
    {
      {
        updateElement(oldVNode, newVNode2, isSvgMode);
      }
    }
    if (oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren);
    } else if (newChildren !== null) {
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (oldChildren !== null) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
  }
};
const renderVdom = (hostRef, renderFnResults) => {
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.map(([propName, attribute]) => rootVnode.$attrs$[attribute] = hostElm[propName]);
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm;
  {
    scopeId = hostElm["s-sc"];
  }
  patch(oldVNode, rootVnode);
};
const attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
    ancestorComponent["s-p"].push(new Promise((r) => hostRef.$onRenderResolve$ = r));
  }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16;
  }
  if (hostRef.$flags$ & 4) {
    hostRef.$flags$ |= 512;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return writeTask(dispatch);
};
const dispatchHooks = (hostRef, isInitialLoad) => {
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = hostRef.$lazyInstance$;
  let promise;
  if (isInitialLoad) {
    {
      promise = safeCall(instance, "componentWillLoad");
    }
  }
  endSchedule();
  return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};
const updateComponent = async (hostRef, instance, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  {
    callRender(hostRef, instance);
  }
  if (rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  {
    const childrenPromises = elm["s-p"];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4;
      childrenPromises.length = 0;
    }
  }
};
const callRender = (hostRef, instance, elm) => {
  try {
    instance = instance.render();
    {
      hostRef.$flags$ &= ~16;
    }
    {
      hostRef.$flags$ |= 2;
    }
    {
      {
        {
          renderVdom(hostRef, instance);
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  return null;
};
const postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = hostRef.$lazyInstance$;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (!(hostRef.$flags$ & 64)) {
    hostRef.$flags$ |= 64;
    {
      addHydratedFlag(elm);
    }
    {
      safeCall(instance, "componentDidLoad");
    }
    endPostUpdate();
    {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad();
      }
    }
  } else {
    endPostUpdate();
  }
  {
    hostRef.$onInstanceResolve$(elm);
  }
  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 | 512);
  }
};
const appDidLoad = (who) => {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(() => emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }));
};
const safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }
  return void 0;
};
const then = (promise, thenFn) => {
  return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const addHydratedFlag = (elm) => elm.classList.add("hydrated");
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  const elm = hostRef.$hostElement$;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = hostRef.$lazyInstance$;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if ((!(flags & 8) || oldVal === void 0) && didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (instance) {
      if (cmpMeta.$watchers$ && flags & 128) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map((watchMethodName) => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if ((flags & (2 | 16)) === 2) {
        scheduleUpdate(hostRef, false);
      }
    }
  }
};
const proxyComponent = (Cstr, cmpMeta, flags) => {
  if (cmpMeta.$members$) {
    if (Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries(cmpMeta.$members$);
    const prototype = Cstr.prototype;
    members.map(([memberName, [memberFlags]]) => {
      if (memberFlags & 31 || flags & 2 && memberFlags & 32) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true
        });
      } else if (flags & 1 && memberFlags & 64) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            const ref = getHostRef(this);
            return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
          }
        });
      }
    });
    if (flags & 1) {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function(attrName, _oldValue, newValue) {
        plt.jmp(() => {
          const propName = attrNameToPropName.get(attrName);
          if (this.hasOwnProperty(propName)) {
            newValue = this[propName];
            delete this[propName];
          } else if (prototype.hasOwnProperty(propName) && typeof this[propName] === "number" && this[propName] == newValue) {
            return;
          }
          this[propName] = newValue === null && typeof this[propName] === "boolean" ? false : newValue;
        });
      };
      Cstr.observedAttributes = members.filter(([_, m]) => m[0] & 15).map(([propName, m]) => {
        const attrName = m[1] || propName;
        attrNameToPropName.set(attrName, propName);
        if (m[0] & 512) {
          cmpMeta.$attrsToReflect$.push([propName, attrName]);
        }
        return attrName;
      });
    }
  }
  return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
  if ((hostRef.$flags$ & 32) === 0) {
    {
      hostRef.$flags$ |= 32;
      Cstr = loadModule(cmpMeta);
      if (Cstr.then) {
        const endLoad = uniqueTime();
        Cstr = await Cstr;
        endLoad();
      }
      if (!Cstr.isProxied) {
        {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      {
        hostRef.$flags$ |= 8;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      {
        hostRef.$flags$ &= ~8;
      }
      {
        hostRef.$flags$ |= 128;
      }
      endNewInstance();
    }
    if (Cstr.style) {
      let style = Cstr.style;
      const scopeId2 = getScopeId(cmpMeta);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
        registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
const connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (!(hostRef.$flags$ & 1)) {
      hostRef.$flags$ |= 1;
      {
        let ancestorComponent = elm;
        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          if (ancestorComponent["s-p"]) {
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      }
      if (cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    }
    endConnected();
  }
};
const disconnectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    getHostRef(elm);
  }
};
const bootstrapLazy = (lazyBundles, options = {}) => {
  const endBootstrap = createTime();
  const cmpTags = [];
  const exclude = options.exclude || [];
  const customElements2 = win.customElements;
  const head = doc.head;
  const metaCharset = /* @__PURE__ */ head.querySelector("meta[charset]");
  const visibilityStyle = /* @__PURE__ */ doc.createElement("style");
  const deferredConnectedCallbacks = [];
  let appLoadFallback;
  let isBootstrapping = true;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || "./", doc.baseURI).href;
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3]
      };
      {
        cmpMeta.$members$ = compactMeta[2];
      }
      {
        cmpMeta.$attrsToReflect$ = [];
      }
      {
        cmpMeta.$watchers$ = {};
      }
      const tagName = cmpMeta.$tagName$;
      const HostElement = class extends HTMLElement {
        constructor(self) {
          super(self);
          self = this;
          registerHost(self, cmpMeta);
          if (cmpMeta.$flags$ & 1) {
            {
              {
                self.attachShadow({ mode: "open" });
              }
            }
          }
        }
        connectedCallback() {
          if (appLoadFallback) {
            clearTimeout(appLoadFallback);
            appLoadFallback = null;
          }
          if (isBootstrapping) {
            deferredConnectedCallbacks.push(this);
          } else {
            plt.jmp(() => connectedCallback(this));
          }
        }
        disconnectedCallback() {
          plt.jmp(() => disconnectedCallback(this));
        }
        componentOnReady() {
          return getHostRef(this).$onReadyPromise$;
        }
      };
      cmpMeta.$lazyBundleId$ = lazyBundle[0];
      if (!exclude.includes(tagName) && !customElements2.get(tagName)) {
        cmpTags.push(tagName);
        customElements2.define(tagName, proxyComponent(HostElement, cmpMeta, 1));
      }
    });
  });
  {
    visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
    visibilityStyle.setAttribute("data-styles", "");
    head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
  }
  isBootstrapping = false;
  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map((host) => host.connectedCallback());
  } else {
    {
      plt.jmp(() => appLoadFallback = setTimeout(appDidLoad, 30));
    }
  }
  endBootstrap();
};
const hostRefs = /* @__PURE__ */ new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: elm,
    $cmpMeta$: cmpMeta,
    $instanceValues$: /* @__PURE__ */ new Map()
  };
  {
    hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
  }
  {
    hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
    elm["s-p"] = [];
    elm["s-rc"] = [];
  }
  return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (0, console.error)(e, el);
const cmpModules = /* @__PURE__ */ new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  const exportName = cmpMeta.$tagName$.replace(/-/g, "_");
  const bundleId = cmpMeta.$lazyBundleId$;
  const module = cmpModules.get(bundleId);
  if (module) {
    return module[exportName];
  }
  /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
  return __vitePreload(() => import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${""}`
  ), true ? [] : void 0).then((importedModule) => {
    {
      cmpModules.set(bundleId, importedModule);
    }
    return importedModule[exportName];
  }, consoleError);
};
const styles = /* @__PURE__ */ new Map();
const win = typeof window !== "undefined" ? window : {};
const doc = win.document || { head: {} };
const plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts)
};
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructableStylesheets = /* @__PURE__ */ (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
})();
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
const consume = (queue) => {
  for (let i = 0; i < queue.length; i++) {
    try {
      queue[i](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
const flush = () => {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
const nextTick = (cb) => promiseResolve().then(cb);
const writeTask = /* @__PURE__ */ queueTask(queueDomWrites, true);
const patchEsm = () => {
  return promiseResolve();
};
const defineCustomElements = (win2, options) => {
  if (typeof window === "undefined")
    return Promise.resolve();
  return patchEsm().then(() => {
    return bootstrapLazy([["jeep-sqlite", [[1, "jeep-sqlite", { "autoSave": [516, "autosave"], "wasmPath": [513, "wasmpath"], "innerAutoSave": [32], "innerWasmPath": [32], "echo": [64], "createConnection": [64], "isConnection": [64], "closeConnection": [64], "open": [64], "close": [64], "getVersion": [64], "execute": [64], "executeSet": [64], "run": [64], "query": [64], "getTableList": [64], "isDBExists": [64], "isDBOpen": [64], "deleteDatabase": [64], "isStoreOpen": [64], "copyFromAssets": [64], "isTableExists": [64], "createSyncTable": [64], "getSyncDate": [64], "setSyncDate": [64], "isJsonValid": [64], "importFromJson": [64], "exportToJson": [64], "deleteExportedRows": [64], "addUpgradeStatement": [64], "isDatabase": [64], "getDatabaseList": [64], "checkConnectionsConsistency": [64], "saveToStore": [64], "getFromHTTPRequest": [64] }]]]], options);
  });
};
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();
const dataToImport = {
  database: "easy_compta",
  version: 9,
  encrypted: false,
  overwrite: false,
  mode: "partial",
  tables: [
    {
      name: "commande",
      schema: [
        { column: "orderId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "contenuAdditionnel", value: "TEXT DEFAULT NULL" },
        { column: "priceHt", value: "REAL DEFAULT NULL" },
        { column: "factureId", value: "INTEGER DEFAULT NULL" },
        { foreignkey: "factureId", value: "REFERENCES facture(factureId) ON DELETE SET NULL ON UPDATE CASCADE" }
      ],
      indexes: [
        { name: "index_commande_orderId", value: "orderId" },
        { name: "index_commande_factureId", value: "factureId" }
      ]
    },
    {
      name: "produitservice",
      schema: [
        { column: "serviceId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "montantHt", value: "REAL DEFAULT NULL" },
        { column: "nom", value: "TEXT NOT NULL" },
        { column: "quantite", value: "INTEGER NOT NULL" }
      ],
      indexes: [
        { name: "index_produitservice_serviceId", value: "serviceId" }
      ]
    },
    {
      name: "contains",
      schema: [
        { column: "orderId", value: "INTEGER NOT NULL" },
        { column: "serviceId", value: "INTEGER NOT NULL" },
        { foreignkey: "orderId", value: "REFERENCES commande(orderId) ON DELETE CASCADE ON UPDATE CASCADE" },
        { foreignkey: "serviceId", value: "REFERENCES produitservice(serviceId) ON DELETE CASCADE ON UPDATE CASCADE" }
      ],
      indexes: [
        { name: "index_contains_serviceId_orderId_unique", value: "orderId, serviceId", mode: "UNIQUE" }
      ]
    },
    {
      name: "devise",
      schema: [
        { column: "deviseId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "symbole", value: "TEXT DEFAULT NULL" },
        { column: "libelle", value: "TEXT NOT NULL" }
      ],
      indexes: [
        { name: "index_devise_deviseId", value: "deviseId" }
      ],
      values: [
        [1, "$", "dollar"],
        [2, "\xA3", "livre"],
        [3, "\u20AC", "euro"]
      ]
    },
    {
      name: "langue",
      schema: [
        { column: "langueId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "libelle", value: "TEXT DEFAULT NULL" },
        { column: "nom", value: "TEXT DEFAULT NULL" }
      ],
      indexes: [
        { name: "index_langue_langueId", value: "langueId" }
      ],
      values: [
        [1, "English", "en-US"],
        [2, "Fran\xE7ais", "fr-FR"]
      ]
    },
    {
      name: "personne",
      schema: [
        { column: "actorId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "cp", value: "TEXT NOT NULL" },
        { column: "email", value: "TEXT NOT NULL" },
        { column: "nom", value: "TEXT NOT NULL" },
        { column: "nomRue", value: "TEXT NOT NULL" },
        { column: "numCommercant", value: "TEXT DEFAULT NULL" },
        { column: "numRue", value: "TEXT NOT NULL" },
        { column: "prenom", value: "TEXT NOT NULL" },
        { column: "tel", value: "TEXT NOT NULL" },
        { column: "actorTypeId", value: "INTEGER DEFAULT NULL" },
        { column: "ville", value: "TEXT NOT NULL" },
        { foreignkey: "actorTypeId", value: "REFERENCES personne_type(actorTypeId) ON DELETE SET NULL ON UPDATE CASCADE" }
      ],
      indexes: [
        { name: "index_personne_actorId", value: "actorId" },
        { name: "index_personne_email_unique", value: "email", mode: "UNIQUE" },
        { name: "index_personne_actorTypeId", value: "actorTypeId" }
      ]
    },
    {
      name: "personne_type",
      schema: [
        { column: "actorTypeId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "seller", value: "BOOLEAN DEFAULT 0 CHECK (seller IN (0, 1))" },
        { column: "buyer", value: "BOOLEAN DEFAULT 0 CHECK (buyer IN (0, 1))" }
      ],
      indexes: [
        { name: "index_personne_type_actorTypeId", value: "actorTypeId" },
        { name: "index_personne_type_constraint", value: "seller, buyer", mode: "UNIQUE" }
      ],
      values: [
        [1, 1, 1],
        [2, 1, 0],
        [3, 0, 1]
      ]
    },
    {
      name: "facture",
      schema: [
        { column: "factureId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "date", value: "TEXT DEFAULT NULL" },
        { column: "invoiceHTPrice", value: "REAL DEFAULT NULL" },
        { column: "invoiceTTPrice", value: "REAL DEFAULT NULL" },
        { column: "languageId", value: "INTEGER DEFAULT NULL" },
        { column: "deviseId", value: "INTEGER DEFAULT NULL" },
        { column: "tvaValue", value: "REAL NOT NULL" },
        { column: "buyerId", value: "INTEGER NOT NULL" },
        { column: "sellerId", value: "INTEGER NOT NULL" },
        { column: "administratorId", value: "INTEGER DEFAULT NULL" },
        { foreignkey: "languageId", value: "REFERENCES langue(langueId) ON DELETE SET NULL ON UPDATE CASCADE" },
        { foreignkey: "deviseId", value: "REFERENCES devise(deviseId) ON DELETE SET NULL ON UPDATE CASCADE" },
        { foreignkey: "buyerId", value: "REFERENCES personne(actorId) ON DELETE CASCADE ON UPDATE CASCADE" },
        { foreignkey: "sellerId", value: "REFERENCES personne(actorId) ON DELETE CASCADE ON UPDATE CASCADE" },
        { foreignkey: "administratorId", value: "REFERENCES user(userId) ON DELETE SET NULL ON UPDATE CASCADE" }
      ],
      indexes: [
        { name: "index_facture_facturId", value: "factureId" },
        { name: "index_facture_languageId", value: "languageId" },
        { name: "index_facture_deviseId", value: "deviseId" },
        { name: "index_facture_buyerId", value: "buyerId" },
        { name: "index_facture_sellerId", value: "sellerId" },
        { name: "index_facture_administratorId", value: "administratorId" }
      ]
    },
    {
      name: "user",
      schema: [
        { column: "userId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "firstName", value: "TEXT NOT NULL" },
        { column: "lastName", value: "TEXT NOT NULL" },
        { column: "login", value: "TEXT NOT NULL" },
        { column: "email", value: "TEXT NOT NULL" },
        { column: "pass", value: "TEXT NOT NULL" },
        { column: "companyName", value: "TEXT NOT NULL" },
        { column: "companyLogo", value: "TEXT DEFAULT NULL" },
        { column: "deviseId", value: "INTEGER NOT NULL" },
        { column: "userTypeId", value: "INTEGER DEFAULT NULL" },
        { foreignkey: "deviseId", value: "REFERENCES devise(deviseId) ON UPDATE CASCADE" },
        { foreignkey: "userTypeId", value: "REFERENCES user_type(userTypeId) ON DELETE SET NULL ON UPDATE CASCADE" }
      ]
    },
    {
      name: "user_type",
      schema: [
        { column: "userTypeId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "regular", value: "BOOLEAN DEFAULT 0 CHECK (regular IN (0, 1))" },
        { column: "admin", value: "BOOLEAN DEFAULT 0 CHECK (admin IN (0, 1))" }
      ],
      indexes: [
        { name: "index_userType_userTypeId", value: "userTypeId" },
        { name: "index_user_type_constraint", value: "regular, admin", mode: "UNIQUE" }
      ],
      values: [
        [1, 1, 0],
        [2, 0, 1],
        [3, 1, 1]
      ]
    },
    {
      name: "payment",
      schema: [
        { column: "paymentId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "etat", value: "BOOLEAN DEFAULT 0 CHECK (etat IN (0, 1))" },
        { column: "paymentValue", value: "REAL NOT NULL" },
        { column: "paymentType", value: "INTEGER NOT NULL" },
        { column: "factureId", value: "INTEGER DEFAULT NULL" },
        { foreignkey: "paymentType", value: "REFERENCES payment_type(paymentTypeId) ON DELETE CASCADE ON UPDATE CASCADE" },
        { foreignkey: "factureId", value: "REFERENCES facture(factureId) ON DELETE CASCADE ON UPDATE CASCADE" }
      ],
      indexes: [
        { name: "index_payment_paymentId", value: "paymentId" },
        { name: "index_payment_paymentType", value: "paymentType" },
        { name: "index_payment_factureId", value: "factureId" }
      ]
    },
    {
      name: "payment_type",
      schema: [
        { column: "paymentTypeId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "cb", value: "BOOLEAN DEFAULT 0 CHECK (cb IN (0, 1))" },
        { column: "esp", value: "BOOLEAN DEFAULT 0 CHECK (esp IN (0, 1))" },
        { column: "chq", value: "BOOLEAN DEFAULT 0 CHECK (chq IN (0, 1))" }
      ],
      indexes: [
        { name: "index_payment_type_paymentTypeId", value: "paymentTypeId" },
        { name: "index_payment_type_cb_esp_chq", value: "cb, esp, chq", mode: "UNIQUE" }
      ],
      values: [
        [1, 1, 0, 0],
        [2, 0, 1, 0],
        [3, 0, 0, 1]
      ]
    },
    {
      name: "stock_prices",
      schema: [
        { column: "stockPricesId", value: "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL" },
        { column: "euro", value: "REAL NOT NULL" },
        { column: "dollar", value: "REAL NOT NULL" },
        { column: "livre", value: "REAL NOT NULL" }
      ],
      indexes: [
        { name: "index_stock_prices_stockPricesId", value: "stockPricesId" }
      ],
      values: [
        [1, 1, 1.04, 0.86],
        [2, 0.96, 1, 0.83],
        [3, 1.16, 1.21, 1]
      ]
    }
  ]
};
let sqlite = null;
const createSQLiteConnection = () => {
  sqlite = new SQLiteConnection(CapacitorSQLite);
};
const polyfills = async () => {
  applyPolyfills().then(() => {
    defineCustomElements();
  });
};
const createJeepSQLiteElem = async () => {
  const jeepSQLite = document.createElement("jeep-sqlite");
  document.body.appendChild(jeepSQLite);
  await customElements.whenDefined("jeep-sqlite");
  await sqlite.initWebStore();
};
const importFromJSON = async () => {
  console.log("importFromJSON Call !");
  let ret = 0;
  const res = await sqlite.isJsonValid(JSON.stringify(dataToImport));
  if (res.result) {
    ret = await sqlite.importFromJson(JSON.stringify(dataToImport));
  } else {
    console.log("> isJsonValid retuned false");
  }
  return ret;
};
const connectionsConsistency = async () => {
  console.log("connectionsConsistency Call !");
  const ret = sqlite !== null ? await sqlite.checkConnectionsConsistency({ dbNames: ["easy_compta"], openModes: ["RW"] }) : null;
  return ret;
};
const createConnection = async () => {
  console.log("createConnection Call !");
  const ret = sqlite !== null ? await sqlite.createConnection("easy_compta", false, "no-encryption", 1, false) : null;
  return ret;
};
const retrieveConnection = async () => {
  console.log("Retrieve connection Call !");
  const ret = sqlite !== null ? await sqlite.retrieveConnection("easy_compta", false) : null;
  return ret;
};
const isConnection = async () => {
  console.log("isConnection Call !");
  const ret = sqlite !== null ? await sqlite.isConnection("easy_compta", false) : null;
  return ret;
};
const openDB = async (db) => {
  console.log("openDB Call !");
  let ret = false;
  if (!!db) {
    await db.open();
    ret = true;
  }
  return ret;
};
const isOpenDB = async (db) => {
  console.log("isOpenDB Call !");
  let ret = null;
  if (!!db) {
    ret = await db.isDBOpen();
  }
  return ret;
};
const closeDBConnection = async (db) => {
  console.log("closeDBConnection Call !");
  const ret = db !== null ? await db.close() : null;
  return ret;
};
const query = async (db, sql, values = void 0) => {
  console.log("query Call !");
  let ret;
  if (values !== void 0) {
    ret = db !== null ? await db.query(sql, values) : null;
  } else {
    ret = db !== null ? await db.query(sql) : null;
  }
  return ret;
};
const run = async (db, sql, values = void 0, transaction = void 0) => {
  console.log("run Call !");
  const ret = db !== null ? await db.run(sql, values, transaction).then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
    return null;
  }) : null;
  return ret;
};
var getConnection = async (importJson = false) => {
  createSQLiteConnection();
  if (!!Platform.is.nativeMobile === false) {
    await polyfills();
    await createJeepSQLiteElem();
  }
  const consistency = await connectionsConsistency();
  const connectionOpenned = await isConnection();
  let db = null;
  if (connectionOpenned.result && consistency.result) {
    db = await retrieveConnection();
  } else {
    if (importJson)
      db = await importFromJSON();
    db = await createConnection();
  }
  return db;
};
async function openDbConnection(db) {
  return await openDB(db);
}
async function isDbConnectionOpen(db) {
  let ret = false;
  ret = await isOpenDB(db);
  if (ret !== null)
    return ret.result;
  else
    return false;
}
async function newQuery(db, q, val = void 0) {
  return await query(db, q, val);
}
async function newRun(db, q, val = void 0, transac = void 0) {
  return await run(db, q, val, transac);
}
function closeDbConnection(db) {
  closeDBConnection(db);
}
function useQuasar() {
  return inject(quasarKey);
}
export { __TRANSFORMOBJ__ as _, useUserStore as a, userAxiosService as b, closeDbConnection as c, newRun as d, setCryptApi as e, __FORMATOBJ__ as f, getConnection as g, isDbConnectionOpen as i, newQuery as n, openDbConnection as o, setDecryptApi as s, useQuasar as u };
//# sourceMappingURL=data:application/json;base64,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QUFFOUM7QUFDdkIsTUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLGlCQUFpQixPQUFNO0FBQ3ZDLFVBQU0sVUFBVTtBQUNoQixVQUFNLHFCQUFxQjtBQUFBLEVBQzdCO0FBQ00sc0JBQWMsTUFBTTtBQUVwQiw0QkFBb0IsTUFBTTtBQUVoQyxNQUFJLEtBQUs7QUFDTCx3QkFBa0IsVUFBVSxZQUFZLFFBQVE7QUFDbEQsU0FBSyxNQUFNO0VBQW1CLE9BRXpCO0FBQ0Q7QUFDRixXQUFLLE1BQU07QUFDYixTQUFLLE1BQU07RUFFYjtBQUVPO0FBQ1Q7QUFFQSxlQUFzQixpQkFBaUIsSUFBaUM7QUFDL0QsZUFBTSxPQUFPLEVBQUU7QUFDeEI7QUFFQSxlQUFzQixtQkFBbUIsSUFBaUM7QUFDeEUsTUFBSSxNQUFNO0FBQ0osY0FBTSxTQUFTLEVBQUU7QUFDdkIsTUFBSSxRQUFRO0FBQ1YsV0FBTyxJQUFJO0FBQUE7QUFFSjtBQUNYO0FBRUEsZUFBc0IsU0FBUyxJQUF3QixHQUFXLE1BQXlCLFFBQWtDO0FBQzNILFNBQU8sTUFBTSxNQUFNLElBQUksR0FBRyxHQUFHO0FBQy9CO0FBRUEsZUFBc0IsT0FBTyxJQUF3QixHQUFXLE1BQXlCLFFBQVcsVUFBK0IsUUFBb0M7QUFDckssU0FBTyxNQUFNLElBQUksSUFBSSxHQUFHLEtBQUssT0FBTztBQUl0QztBQU1PLFNBQVMsa0JBQWtCLElBQXVCO0FBQ3ZELG9CQUFrQixFQUFFO0FBQ3RCO0FDckVlLFNBQVMsWUFBYTtBQUNuQyxTQUFPLE9BQU8sU0FBUztBQUN6QiIsIm5hbWVzIjpbInNxbGl0ZSIsInJldCIsIndpbiIsInNjb3BlSWQiLCJpc1N2Z01vZGUiLCJuZXdWTm9kZSIsImN1c3RvbUVsZW1lbnRzIiwiaCIsImplZXBTcWxpdGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIiwiLi4vLi4vLi4vc3JjL2dsb2JhbHMudHMiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL3VzZXIudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlL2Rpc3QvZXNtL2RlZmluaXRpb25zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3ItY29tbXVuaXR5L3NxbGl0ZS9kaXN0L2VzbS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qZWVwLXNxbGl0ZS9kaXN0L2VzbS9wb2x5ZmlsbHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvamVlcC1zcWxpdGUvZGlzdC9lc20vaW5kZXgtZWZmZjY5ZjguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvamVlcC1zcWxpdGUvZGlzdC9lc20vbG9hZGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2plZXAtc3FsaXRlL2xvYWRlci9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9jYXBhY2l0b3Ivc3RvcmFnZS91dGlscy9pbXBvcnQtZnJvbS1qc29uLnRzIiwiLi4vLi4vLi4vc3JjL2NhcGFjaXRvci9zdG9yYWdlL3NxbGl0ZVN0b3JhZ2UudHMiLCIuLi8uLi8uLi9zcmMvY2FwYWNpdG9yL3N0b3JhZ2UvaW5kZXgudHMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtcXVhc2FyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IGh0dHAgfSBmcm9tICdhcHAvc3JjL2RiL3NlcnZpY2VzL2luZGV4JztcblxuY2xhc3MgVXNlckRhdGFTZXJ2aWNlIHtcbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiBodHRwLmdldCgnL3VzZXJzJyk7XG4gIH1cblxuICBnZXRBbGxEZXZpc2VzKCkge1xuICAgIHJldHVybiBodHRwLmdldCgnL3VzZXJzL2RldmlzZXMnKTtcbiAgfVxuXG4gIGdldEFsbFByaWNlcygpIHtcbiAgICByZXR1cm4gaHR0cC5nZXQoJy91c2Vycy9wcmljZXMnKTtcbiAgfVxuXG4gIGdldChsb2dpbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGh0dHAuZ2V0KCcvdXNlcnMvbG9naW4nLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmUoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBodHRwLmdldChgL3VzZXJzL3JldHJpZXZlLyR7aWR9YCk7XG4gIH1cblxuICBnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gaHR0cC5nZXQoJy91c2Vycy90eXBlcycpO1xuICB9XG5cbiAgY2hlY2tFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGh0dHAuZ2V0KCcvdXNlcnMvZW1haWwnLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbG9naW46IGVtYWlsLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrTG9naW4obG9naW46IHN0cmluZykge1xuICAgIHJldHVybiBodHRwLmdldCgnL3VzZXJzL2VtYWlsJywge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAucG9zdCgnL3VzZXJzJywgZGF0YSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IGFueSwgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAucHV0KGAvdXNlcnMvJHtpZH1gLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZShpZDogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAuZGVsZXRlKGAvdXNlcnMvJHtpZH1gKTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCgpIHtcbiAgICByZXR1cm4gaHR0cC5kZWxldGUoJy91c2VycycpO1xuICB9XG5cbiAgZmluZEJ5VHlwZSh0eXBlOiBhbnkpIHtcbiAgICByZXR1cm4gaHR0cC5nZXQoYC91c2Vycy90eXBlLyR7dHlwZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlckRhdGFTZXJ2aWNlKCk7XG4iLCIvKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiAnb2ZmJyovXG5pbXBvcnQgeyBjcnlwdE1vZCwgZGVjcnlwdE1vZCB9IGZyb20gJy4vbW9kdWxlcy9XYXNtTW9kdWxlcyc7XG5cbmNvbnN0IGlzU2VydmVyID0gaW1wb3J0Lm1ldGEuZW52LlNTUjtcbi8vIGNvbnN0IF9fU0VDUkVUX18gPSAnbXlMaXR0bGVTZWNyZXQnO1xuLy8gaWYgKCFpc1NlcnZlcil7XG4vLyAgIHdpbmRvdy5fX0tFWV9fID0gbnVsbDtcbi8vIH1cbmNvbnN0IF9fRk9STUFUT0JKX18gPSAob2JqOiBhbnksIGtleTogc3RyaW5nKTogYW55ID0+IHtcbiAgLy8gY29uc29sZS5sb2cod2luZG93Ll9fS0VZX18pO1xuICAvLyBpZiAoIWlzU2VydmVyKXtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9ialtrXSA9PT0gJ3N0cmluZycgJiYgb2JqW2tdICE9PSAnJyAmJiBrICE9PSAnZGF0ZScgJiYgayAhPT0gJ2RhdGVfZm9ybWF0Jykge1xuICAgICAgICBvYmpba10gPSB3aW5kb3cuX19DUllQVEFQSV9fLmNyeXB0KG9ialtrXSwga2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIC8vIH1cbn07XG5jb25zdCBfX1RSQU5TRk9STU9CSl9fID0gYXN5bmMgKG9iajogYW55KTogYW55ID0+IHtcbiAgbGV0IHJldDogYW55O1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgJiYgb2JqICE9PSAnJykge1xuICAgIHJldCA9ICcnO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXQgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBbXTtcbiAgfVxuICBpZiAoIWlzU2VydmVyKXtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvYmpba10gPT09ICdzdHJpbmcnICYmXG4gICAgICAgIGsgIT09ICdkYXRlJyAmJlxuICAgICAgICBrICE9PSAnZGF0ZV9mb3JtYXQnICYmXG4gICAgICAgIGsgIT09ICdsYW5ndWUnICYmXG4gICAgICAgIGsgIT09ICdkZXZpc2UnICYmIG9ialtrXSAhPT0gJydcbiAgICAgICkge1xuICAgICAgICByZXRba10gPSB3aW5kb3cuX19ERUNSWVBUQVBJX18uZGVjcnlwdChvYmpba10pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIG9ialtrXSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkob2JqW2tdKSAmJlxuICAgICAgICBrICE9PSAnbGFuZ3VlJyAmJlxuICAgICAgICBrICE9PSAnZGV2aXNlJ1xuICAgICAgKSB7XG4gICAgICAgIGlmIChvYmpba10gPT09IG51bGwpIHJldFtrXSA9IG51bGw7XG4gICAgICAgIGVsc2UgcmV0W2tdID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhvYmpba10pO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0W2tdID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhvYmpba10pO1xuICAgICAgfSBlbHNlIHJldFtrXSA9IG9ialtrXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIHNldEdlbkFwaSgpIHtcbi8vICAgY29uc3QgcmV0ID0gYXdhaXQgZ2VuTW9kO1xuLy8gICBpZiAoIWlzU2VydmVyKSB7XG4vLyAgICAgd2luZG93Ll9fR0VOS0VZQVBJX18gPSByZXQ7XG4vLyAgICAgaWYgKCEhd2luZG93Ll9fS0VZX18gPT09IGZhbHNlKVxuLy8gICAgICAgd2luZG93Ll9fS0VZX18gPSB3aW5kb3cuX19HRU5LRVlBUElfXy5nZW5lcmF0ZV9rZXkoX19TRUNSRVRfXyk7XG4vLyAgIH1cbi8vICAgcmV0dXJuIHJldDtcbi8vIH07XG5hc3luYyBmdW5jdGlvbiBzZXRDcnlwdEFwaSgpIHtcbiAgY29uc3QgcmV0ID0gYXdhaXQgY3J5cHRNb2Q7XG4gIC8vIGNvbnNvbGUubG9nKHJldCk7XG4gIGlmICghaXNTZXJ2ZXIpXG4gICAgd2luZG93Ll9fQ1JZUFRBUElfXyA9IHJldDtcbiAgcmV0dXJuIHJldDtcbn07XG5hc3luYyBmdW5jdGlvbiBzZXREZWNyeXB0QXBpKCkge1xuICBjb25zdCByZXQgPSBhd2FpdCBkZWNyeXB0TW9kO1xuICAvLyBjb25zb2xlLmxvZyhyZXQpO1xuICBpZiAoIWlzU2VydmVyKXtcbiAgICB3aW5kb3cuX19ERUNSWVBUQVBJX18gPSByZXQ7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG4vLyBpZiAoaXNTZXJ2ZXIpIHtcbiAgLy8gZ2xvYmFsLl9fU0VDUkVUX18gPSAnbXlMaXR0bGVTZWNyZXQnO1xuICAvLyBnbG9iYWwuX19HRU5LRVlBUElfXztcbiAgLy8gZ2xvYmFsLl9fQ1JZUFRBUElfXztcbiAgLy8gZ2xvYmFsLl9fREVDUllQVEFQSV9fO1xuICAvLyBnbG9iYWwuX19LRVlfXyA9ICcnO1xuICAvLyBnZW5Nb2QudGhlbigoZTogYW55KSA9PiB7XG4gIC8vICAgZ2xvYmFsLl9fR0VOS0VZQVBJX18gPSBlO1xuICAvLyAgIGdsb2JhbC5fX0tFWV9fID0gZ2xvYmFsLl9fR0VOS0VZQVBJX18uZ2VuZXJhdGVfa2V5KGdsb2JhbC5fX1NFQ1JFVF9fKTtcbiAgLy8gfSk7XG4gIC8vIGNyeXB0TW9kLnRoZW4oKGU6IGFueSkgPT4ge1xuICAvLyAgIGdsb2JhbC5fX0NSWVBUQVBJX18gPSBlO1xuICAvLyB9KTtcbiAgLy8gZGVjcnlwdE1vZC50aGVuKChlOiBhbnkpID0+IHtcbiAgLy8gICBnbG9iYWwuX19ERUNSWVBUQVBJX18gPSBlO1xuICAvLyB9KTtcbi8vIH1cbi8vIGlmICghaXNTZXJ2ZXIpe1xuICAvLyBjb25zb2xlLmxvZyhpc1NlcnZlcik7XG4gIC8vIHNldEdlbkFwaSgpO1xuICAvLyB3aW5kb3cuX19LRVlfXyA9IG51bGw7XG4vLyB9XG5leHBvcnQgeyBzZXRDcnlwdEFwaSwgc2V0RGVjcnlwdEFwaSwgX19GT1JNQVRPQkpfXywgX19UUkFOU0ZPUk1PQkpfXyB9O1xuIiwiLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuLy8gaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBkZWZpbmVTdG9yZSwgYWNjZXB0SE1SVXBkYXRlIH0gZnJvbSAncGluaWEnO1xuaW1wb3J0IHVzZXJBeGlvc1NlcnZpY2UgZnJvbSAnYXBwL3NyYy9kYi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2V0RGVjcnlwdEFwaSwgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ2FwcC9zcmMvZ2xvYmFscyc7XG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICdxdWFzYXInO1xuLy8gaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiB9IGZyb20gJ3Z1ZSc7XG4vLyBpbXBvcnQgeyB1c2VMb2NhbFN0b3JhZ2UgfSBmcm9tICdAdnVldXNlL2NvcmUnO1xuaW1wb3J0IHsgY29va2llU3RvcmFnZSB9IGZyb20gJ2FwcC9zcmMvc3RvcmVzL3N0b3JhZ2UnO1xuXG5jb25zdCB1c2VVc2VyU3RvcmUgPSBkZWZpbmVTdG9yZSgndXNlcicsIHtcbiAgLy8gY29uc29sZS5sb2coJ0FsbCBpdGVtcyBpbiBzdG9yYWdlIGZyb20gVXNlciBzdG9yZSAtLT4gJyk7XG4gIC8vIGNvbnNvbGUubG9nKExvY2FsU3RvcmFnZS5nZXRBbGwoKSk7XG5cbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICB1c2VyOiB7fSxcbiAgfSksXG4gIHBlcnNpc3Q6IHtcbiAgICBzdG9yYWdlOiBjb29raWVTdG9yYWdlLFxuICB9LFxuXG4gIC8vIGNvbnN0IGNvbm5lY3RlZCA9IHJlZih1c2VMb2NhbFN0b3JhZ2UoJ2Nvbm5lY3RlZCcsIGZhbHNlKSk7XG4gIC8vIGNvbnN0IHVzZXIgPSByZWYodXNlTG9jYWxTdG9yYWdlKCd1c2VyJywge30pKTtcblxuICAvLyBpZiAoISFMb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29ubmVjdGVkJykpe1xuICAvLyAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgZXhpc3RpbmcgaW4gTG9jYWxTdG9yYWdlJyk7XG4gIC8vICAgY29uc29sZS5sb2coTG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Nvbm5lY3RlZCcpKTtcbiAgLy8gICBjb25uZWN0ZWQudmFsdWUgPSBMb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29ubmVjdGVkJyk7XG4gIC8vIH1cbiAgLy8gaWYgKCEhTG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSl7XG4gIC8vICAgY29uc29sZS5sb2coJ1VzZXIgZXhpc3RpbmcgaW4gTG9jYWxTdG9yYWdlJyk7XG4gIC8vICAgY29uc29sZS5sb2coTG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gIC8vICAgdXNlci52YWx1ZSA9IExvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gIC8vIH1cblxuICAvLyBjb25zdCBnZXRDb25uZWN0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2coJ0dldHRpblxcJyBjb25uZWN0ZWQgc3RhdGUgIScpO1xuICAvLyAgIGNvbnNvbGUubG9nKGNvbm5lY3RlZC52YWx1ZSk7XG4gIC8vICAgcmV0dXJuIGNvbm5lY3RlZC52YWx1ZTtcbiAgLy8gfSk7XG4gIC8vIGNvbnN0IGdldFVzZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2coJ0dldHRpblxcJyB1c2VyIHN0YXRlICEnKTtcbiAgLy8gICBjb25zb2xlLmxvZyh1c2VyLnZhbHVlKTtcbiAgLy8gICByZXR1cm4gdXNlci52YWx1ZTtcbiAgLy8gfSk7XG5cbiAgLy8gZnVuY3Rpb24gc2V0Q29ubmVjdGVkKHZhbDogYm9vbGVhbil7XG4gIC8vICAgY29uc3QgY29weU9mRGF0YSA9IHZhbDtcbiAgLy8gICAvLyBMb2NhbFN0b3JhZ2Uuc2V0KCdjb25uZWN0ZWQnLCBjb3B5T2ZEYXRhKTtcbiAgLy8gICBjb25uZWN0ZWQudmFsdWUgPSBjb3B5T2ZEYXRhO1xuICAvLyAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIGNvbm5lY3RlZCAhJyk7XG4gIC8vICAgY29uc29sZS5sb2coY29ubmVjdGVkKTtcbiAgLy8gfTtcbiAgLy8gZnVuY3Rpb24gc2V0VXNlcih2YWw6IGFueSl7XG4gIC8vICAgY29uc3QgY29weU9mRGF0YSA9IGV4dGVuZCh0cnVlLCB7fSwgdmFsKTtcbiAgLy8gICAvLyBMb2NhbFN0b3JhZ2Uuc2V0KCd1c2VyJywgY29weU9mRGF0YSk7XG4gIC8vICAgdXNlci52YWx1ZSA9IGNvcHlPZkRhdGE7XG4gIC8vIH07XG4gIC8vIGZ1bmN0aW9uIHJlbW92ZVVzZXIoKXtcbiAgLy8gICAvLyBMb2NhbFN0b3JhZ2UucmVtb3ZlKCd1c2VyJyk7XG4gIC8vICAgdXNlci52YWx1ZSA9IHt9O1xuICAvLyB9O1xuICAvLyBmdW5jdGlvbiByZW1vdmVDb25uZWN0ZWQoKXtcbiAgLy8gICAvLyBMb2NhbFN0b3JhZ2UucmVtb3ZlKCdjb25uZWN0ZWQnKTtcbiAgLy8gICBjb25uZWN0ZWQudmFsdWUgPSBmYWxzZTtcbiAgLy8gfTtcbiAgLy8gZnVuY3Rpb24gbG9naW5Vc2VyKGxvZ2luOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpe1xuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICAgIHVzZXJBeGlvc1NlcnZpY2VcbiAgLy8gICAgICAgICAuZ2V0KGxvZ2luLCBwYXNzd29yZClcbiAgLy8gICAgICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gIC8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAvLyAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgLy8gICAgICAgICAgICAgY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIC8vIGNvbnN0IGRhdGFDbGVhciA9IHJlcy5kYXRhO1xuICAvLyAgICAgICAgICAgICBzZXRVc2VyKGRhdGFDbGVhclswXSk7XG4gIC8vICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyWzBdKTtcbiAgLy8gICAgICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAvLyAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSBmYWl0ZSBldCBsZSBjb2RlIGRlXG4gIC8vICAgICAgICAgICAvLyAgIHLDqXBvbnNlIGR1IHNlcnZldXIgbidlc3QgcGFzIGRhbnMgbGEgcGxhZ2UgMnh4XG4gIC8vICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5kYXRhKTtcbiAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLnN0YXR1cyk7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5oZWFkZXJzKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgIGZhaXRlIG1haXMgYXVjdW5lIHLDqXBvbnNlXG4gIC8vICAgICAgICAgICAvLyAgbidhIMOpdMOpIHJ1w6d1ZSBgZXJyb3IucmVxdWVzdGAgZXN0IHVuZSBpbnN0YW5jZSBkZVxuICAvLyAgICAgICAgICAgLy8gIFhNTEh0dHBSZXF1ZXN0IGRhbnMgbGUgbmF2aWdhdGV1ciBldCB1bmUgaW5zdGFuY2VcbiAgLy8gICAgICAgICAgIC8vICBkZSBodHRwLkNsaWVudFJlcXVlc3QgYXZlYyBub2RlLmpzXG4gIC8vICAgICAgICAgICBlbHNlIGlmIChlcnIucmVxdWVzdCkge1xuICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVxdWVzdCk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAvLyBRdWVscXVlIGNob3NlIHMnZXN0IHBhc3PDqSBsb3JzIGRlIGxhIGNvbnN0cnVjdGlvbiBkZVxuICAvLyAgICAgICAgICAgLy8gIGxhIHJlcXXDqnRlIGV0IGNlbGEgYSBwcm92b3F1w6kgdW5lIGVycmV1clxuICAvLyAgICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5jb25maWcpO1xuICAvLyAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIpKTtcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgIH0pO1xuICAvLyB9O1xuICAvLyBmdW5jdGlvbiByZXRyaWV2ZVVzZXIoaWQ6IG51bWJlcil7XG4gIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgLy8gICAgICAgdXNlckF4aW9zU2VydmljZVxuICAvLyAgICAgICAgIC5yZXRyaWV2ZShpZClcbiAgLy8gICAgICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gIC8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAvLyAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgLy8gICAgICAgICAgICAgY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIC8vIGNvbnN0IGRhdGFDbGVhciA9IHJlcy5kYXRhO1xuICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhQ2xlYXIpO1xuICAvLyAgICAgICAgICAgICBzZXRVc2VyKGRhdGFDbGVhclswXSk7XG4gIC8vICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyWzBdKTtcbiAgLy8gICAgICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAvLyAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSBmYWl0ZSBldCBsZSBjb2RlIGRlXG4gIC8vICAgICAgICAgICAvLyAgIHLDqXBvbnNlIGR1IHNlcnZldXIgbidlc3QgcGFzIGRhbnMgbGEgcGxhZ2UgMnh4XG4gIC8vICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5kYXRhKTtcbiAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLnN0YXR1cyk7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5oZWFkZXJzKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgIGZhaXRlIG1haXMgYXVjdW5lIHLDqXBvbnNlXG4gIC8vICAgICAgICAgICAvLyAgbidhIMOpdMOpIHJ1w6d1ZSBgZXJyb3IucmVxdWVzdGAgZXN0IHVuZSBpbnN0YW5jZSBkZVxuICAvLyAgICAgICAgICAgLy8gIFhNTEh0dHBSZXF1ZXN0IGRhbnMgbGUgbmF2aWdhdGV1ciBldCB1bmUgaW5zdGFuY2VcbiAgLy8gICAgICAgICAgIC8vICBkZSBodHRwLkNsaWVudFJlcXVlc3QgYXZlYyBub2RlLmpzXG4gIC8vICAgICAgICAgICBlbHNlIGlmIChlcnIucmVxdWVzdCkge1xuICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVxdWVzdCk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAvLyBRdWVscXVlIGNob3NlIHMnZXN0IHBhc3PDqSBsb3JzIGRlIGxhIGNvbnN0cnVjdGlvbiBkZVxuICAvLyAgICAgICAgICAgLy8gIGxhIHJlcXXDqnRlIGV0IGNlbGEgYSBwcm92b3F1w6kgdW5lIGVycmV1clxuICAvLyAgICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5jb25maWcpO1xuICAvLyAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIpKTtcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgIH0pO1xuICAvLyB9O1xuICAvLyBmdW5jdGlvbiBnZXRVc2VyVHlwZXMoKXtcbiAgLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAvLyAgICAgICB1c2VyQXhpb3NTZXJ2aWNlXG4gIC8vICAgICAgICAgLmdldFR5cGVzKClcbiAgLy8gICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gIC8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAvLyAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIC8vIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgLy8gICAgICAgICAgICAgLy8gY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gIC8vICAgICAgICAgICAgIGNvbnN0IGRhdGFDbGVhciA9IHJlcy5kYXRhO1xuICAvLyAgICAgICAgICAgICAvLyB0aGlzLnVzZXIgPSBkYXRhQ2xlYXJbMF07XG4gIC8vICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyKTtcbiAgLy8gICAgICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAvLyAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSBmYWl0ZSBldCBsZSBjb2RlIGRlXG4gIC8vICAgICAgICAgICAvLyAgIHLDqXBvbnNlIGR1IHNlcnZldXIgbidlc3QgcGFzIGRhbnMgbGEgcGxhZ2UgMnh4XG4gIC8vICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5kYXRhKTtcbiAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLnN0YXR1cyk7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5oZWFkZXJzKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgIGZhaXRlIG1haXMgYXVjdW5lIHLDqXBvbnNlXG4gIC8vICAgICAgICAgICAvLyAgbidhIMOpdMOpIHJ1w6d1ZSBgZXJyb3IucmVxdWVzdGAgZXN0IHVuZSBpbnN0YW5jZSBkZVxuICAvLyAgICAgICAgICAgLy8gIFhNTEh0dHBSZXF1ZXN0IGRhbnMgbGUgbmF2aWdhdGV1ciBldCB1bmUgaW5zdGFuY2VcbiAgLy8gICAgICAgICAgIC8vICBkZSBodHRwLkNsaWVudFJlcXVlc3QgYXZlYyBub2RlLmpzXG4gIC8vICAgICAgICAgICBlbHNlIGlmIChlcnIucmVxdWVzdCkge1xuICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVxdWVzdCk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAvLyBRdWVscXVlIGNob3NlIHMnZXN0IHBhc3PDqSBsb3JzIGRlIGxhIGNvbnN0cnVjdGlvbiBkZVxuICAvLyAgICAgICAgICAgLy8gIGxhIHJlcXXDqnRlIGV0IGNlbGEgYSBwcm92b3F1w6kgdW5lIGVycmV1clxuICAvLyAgICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5jb25maWcpO1xuICAvLyAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIpKTtcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgIH0pO1xuICAvLyB9O1xuICAvLyBmdW5jdGlvbiByZXNldCgpe1xuICAvLyAgIHJlbW92ZVVzZXIoKTtcbiAgLy8gICByZW1vdmVDb25uZWN0ZWQoKTtcbiAgLy8gfTtcblxuICBnZXR0ZXJzOiB7XG4gICAgZ2V0Q29ubmVjdGVkKHN0YXRlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnR2V0dGluXFwnIGNvbm5lY3RlZCBzdGF0ZSAhJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzdGF0ZS5jb25uZWN0ZWQpO1xuICAgICAgcmV0dXJuIHN0YXRlLmNvbm5lY3RlZDtcbiAgICB9LFxuICAgIGdldFVzZXIoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyO1xuICAgIH0sXG4gIH0sXG4gIGFjdGlvbnM6IHtcbiAgICBzZXRDb25uZWN0ZWQodmFsOiBib29sZWFuKXtcbiAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSB2YWw7XG4gICAgICAvLyBMb2NhbFN0b3JhZ2Uuc2V0KCdjb25uZWN0ZWQnLCBjb3B5T2ZEYXRhKTtcbiAgICAgIHRoaXMuY29ubmVjdGVkID0gY29weU9mRGF0YTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXR0aW5nIGNvbm5lY3RlZCAhJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbm5lY3RlZCk7XG4gICAgfSxcbiAgICBzZXRVc2VyKHZhbDogYW55KXtcbiAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSBleHRlbmQodHJ1ZSwge30sIHZhbCk7XG4gICAgICAvLyBMb2NhbFN0b3JhZ2Uuc2V0KCd1c2VyJywgY29weU9mRGF0YSk7XG4gICAgICB0aGlzLnVzZXIgPSBjb3B5T2ZEYXRhO1xuICAgIH0sXG4gICAgcmVtb3ZlVXNlcigpe1xuICAgICAgLy8gTG9jYWxTdG9yYWdlLnJlbW92ZSgndXNlcicpO1xuICAgICAgdGhpcy51c2VyID0ge307XG4gICAgfSxcbiAgICByZW1vdmVDb25uZWN0ZWQoKXtcbiAgICAgIC8vIExvY2FsU3RvcmFnZS5yZW1vdmUoJ2Nvbm5lY3RlZCcpO1xuICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9LFxuICAgIGxvZ2luVXNlcihsb2dpbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTG9naW4uLi4nKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHVzZXJBeGlvc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0KGxvZ2luLCBwYXNzd29yZClcbiAgICAgICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIC8vIGNvbnN0IGRhdGFDbGVhciA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICB0aGlzLnNldFVzZXIoZGF0YUNsZWFyWzBdKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhQ2xlYXJbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpIGZhaXRlIGV0IGxlIGNvZGUgZGVcbiAgICAgICAgICAgIC8vICAgcsOpcG9uc2UgZHUgc2VydmV1ciBuJ2VzdCBwYXMgZGFucyBsYSBwbGFnZSAyeHhcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSAgZmFpdGUgbWFpcyBhdWN1bmUgcsOpcG9uc2VcbiAgICAgICAgICAgIC8vICBuJ2Egw6l0w6kgcnXDp3VlIGBlcnJvci5yZXF1ZXN0YCBlc3QgdW5lIGluc3RhbmNlIGRlXG4gICAgICAgICAgICAvLyAgWE1MSHR0cFJlcXVlc3QgZGFucyBsZSBuYXZpZ2F0ZXVyIGV0IHVuZSBpbnN0YW5jZVxuICAgICAgICAgICAgLy8gIGRlIGh0dHAuQ2xpZW50UmVxdWVzdCBhdmVjIG5vZGUuanNcbiAgICAgICAgICAgIGVsc2UgaWYgKGVyci5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFF1ZWxxdWUgY2hvc2Ugcydlc3QgcGFzc8OpIGxvcnMgZGUgbGEgY29uc3RydWN0aW9uIGRlXG4gICAgICAgICAgICAvLyAgbGEgcmVxdcOqdGUgZXQgY2VsYSBhIHByb3ZvcXXDqSB1bmUgZXJyZXVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLmNvbmZpZyk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycikpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZXRyaWV2ZVVzZXIoaWQ6IG51bWJlcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdXNlckF4aW9zU2VydmljZVxuICAgICAgICAgIC5yZXRyaWV2ZShpZClcbiAgICAgICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIC8vIGNvbnN0IGRhdGFDbGVhciA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhQ2xlYXIpO1xuICAgICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhQ2xlYXJbMF07XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSBmYWl0ZSBldCBsZSBjb2RlIGRlXG4gICAgICAgICAgICAvLyAgIHLDqXBvbnNlIGR1IHNlcnZldXIgbidlc3QgcGFzIGRhbnMgbGEgcGxhZ2UgMnh4XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgIGZhaXRlIG1haXMgYXVjdW5lIHLDqXBvbnNlXG4gICAgICAgICAgICAvLyAgbidhIMOpdMOpIHJ1w6d1ZSBgZXJyb3IucmVxdWVzdGAgZXN0IHVuZSBpbnN0YW5jZSBkZVxuICAgICAgICAgICAgLy8gIFhNTEh0dHBSZXF1ZXN0IGRhbnMgbGUgbmF2aWdhdGV1ciBldCB1bmUgaW5zdGFuY2VcbiAgICAgICAgICAgIC8vICBkZSBodHRwLkNsaWVudFJlcXVlc3QgYXZlYyBub2RlLmpzXG4gICAgICAgICAgICBlbHNlIGlmIChlcnIucmVxdWVzdCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBRdWVscXVlIGNob3NlIHMnZXN0IHBhc3PDqSBsb3JzIGRlIGxhIGNvbnN0cnVjdGlvbiBkZVxuICAgICAgICAgICAgLy8gIGxhIHJlcXXDqnRlIGV0IGNlbGEgYSBwcm92b3F1w6kgdW5lIGVycmV1clxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5jb25maWcpO1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0VXNlclR5cGVzKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdXNlckF4aW9zU2VydmljZVxuICAgICAgICAgIC5nZXRUeXBlcygpXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAvLyBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgICAgICAgIC8vIGNvbnN0IGRhdGFDbGVhciA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18ocmVzLmRhdGEpO1xuICAgICAgICAgICAgICBjb25zdCBkYXRhQ2xlYXIgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgLy8gdGhpcy51c2VyID0gZGF0YUNsZWFyWzBdO1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGFDbGVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgZmFpdGUgZXQgbGUgY29kZSBkZVxuICAgICAgICAgICAgLy8gICByw6lwb25zZSBkdSBzZXJ2ZXVyIG4nZXN0IHBhcyBkYW5zIGxhIHBsYWdlIDJ4eFxuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpICBmYWl0ZSBtYWlzIGF1Y3VuZSByw6lwb25zZVxuICAgICAgICAgICAgLy8gIG4nYSDDqXTDqSBydcOndWUgYGVycm9yLnJlcXVlc3RgIGVzdCB1bmUgaW5zdGFuY2UgZGVcbiAgICAgICAgICAgIC8vICBYTUxIdHRwUmVxdWVzdCBkYW5zIGxlIG5hdmlnYXRldXIgZXQgdW5lIGluc3RhbmNlXG4gICAgICAgICAgICAvLyAgZGUgaHR0cC5DbGllbnRSZXF1ZXN0IGF2ZWMgbm9kZS5qc1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyLnJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUXVlbHF1ZSBjaG9zZSBzJ2VzdCBwYXNzw6kgbG9ycyBkZSBsYSBjb25zdHJ1Y3Rpb24gZGVcbiAgICAgICAgICAgIC8vICBsYSByZXF1w6p0ZSBldCBjZWxhIGEgcHJvdm9xdcOpIHVuZSBlcnJldXJcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuY29uZmlnKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0KCkge1xuICAgICAgdGhpcy5yZW1vdmVVc2VyKCk7XG4gICAgICB0aGlzLnJlbW92ZUNvbm5lY3RlZCgpO1xuICAgIH0sXG4gIH0sXG5cbiAgLy8gcmV0dXJuIHtcbiAgLy8gICBjb25uZWN0ZWQsXG4gIC8vICAgdXNlcixcbiAgLy8gICBnZXRDb25uZWN0ZWQsXG4gIC8vICAgZ2V0VXNlcixcbiAgLy8gICBzZXRDb25uZWN0ZWQsXG4gIC8vICAgc2V0VXNlcixcbiAgLy8gICByZW1vdmVVc2VyLFxuICAvLyAgIHJlbW92ZUNvbm5lY3RlZCxcbiAgLy8gICBsb2dpblVzZXIsXG4gIC8vICAgcmV0cmlldmVVc2VyLFxuICAvLyAgIGdldFVzZXJUeXBlcyxcbiAgLy8gICByZXNldCxcbiAgLy8gfTtcbn0pO1xuXG4vLyBtYWtlIHN1cmUgdG8gcGFzcyB0aGUgcmlnaHQgc3RvcmUgZGVmaW5pdGlvbiwgYHVzZUF1dGhgIGluIHRoaXMgY2FzZS5cbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdChhY2NlcHRITVJVcGRhdGUodXNlVXNlclN0b3JlLCBpbXBvcnQubWV0YS5ob3QpKTtcbn1cblxuZXhwb3J0IHsgdXNlVXNlclN0b3JlIH07XG4iLCIvL2ltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG4vKipcbiAqIFNRTGl0ZUNvbm5lY3Rpb24gQ2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIFNRTGl0ZUNvbm5lY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHNxbGl0ZSkge1xuICAgICAgICB0aGlzLnNxbGl0ZSA9IHNxbGl0ZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGFzeW5jIGluaXRXZWJTdG9yZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3FsaXRlLmluaXRXZWJTdG9yZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHNhdmVUb1N0b3JlKGRhdGFiYXNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5zYXZlVG9TdG9yZSh7IGRhdGFiYXNlIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGVjaG8odmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmVjaG8oeyB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc1NlY3JldFN0b3JlZCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmlzU2VjcmV0U3RvcmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc2V0RW5jcnlwdGlvblNlY3JldChwYXNzcGhyYXNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5zZXRFbmNyeXB0aW9uU2VjcmV0KHsgcGFzc3BocmFzZTogcGFzc3BocmFzZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjaGFuZ2VFbmNyeXB0aW9uU2VjcmV0KHBhc3NwaHJhc2UsIG9sZHBhc3NwaHJhc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3FsaXRlLmNoYW5nZUVuY3J5cHRpb25TZWNyZXQoe1xuICAgICAgICAgICAgICAgIHBhc3NwaHJhc2U6IHBhc3NwaHJhc2UsXG4gICAgICAgICAgICAgICAgb2xkcGFzc3BocmFzZTogb2xkcGFzc3BocmFzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyRW5jcnlwdGlvblNlY3JldCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3FsaXRlLmNsZWFyRW5jcnlwdGlvblNlY3JldCgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZFVwZ3JhZGVTdGF0ZW1lbnQoZGF0YWJhc2UsIHRvVmVyc2lvbiwgc3RhdGVtZW50cykge1xuICAgICAgICBjb25zdCB1cGdyYWRlID0ge1xuICAgICAgICAgICAgdG9WZXJzaW9uLFxuICAgICAgICAgICAgc3RhdGVtZW50cyxcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhYmFzZS5lbmRzV2l0aCgnLmRiJykpXG4gICAgICAgICAgICAgICAgZGF0YWJhc2UgPSBkYXRhYmFzZS5zbGljZSgwLCAtMyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5hZGRVcGdyYWRlU3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgICBkYXRhYmFzZSxcbiAgICAgICAgICAgICAgICB1cGdyYWRlOiBbdXBncmFkZV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVDb25uZWN0aW9uKGRhdGFiYXNlLCBlbmNyeXB0ZWQsIG1vZGUsIHZlcnNpb24sIHJlYWRvbmx5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGF0YWJhc2UuZW5kc1dpdGgoJy5kYicpKVxuICAgICAgICAgICAgICAgIGRhdGFiYXNlID0gZGF0YWJhc2Uuc2xpY2UoMCwgLTMpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuY3JlYXRlQ29ubmVjdGlvbih7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2UsXG4gICAgICAgICAgICAgICAgZW5jcnlwdGVkLFxuICAgICAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICAgICAgICByZWFkb25seSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY29ubiA9IG5ldyBTUUxpdGVEQkNvbm5lY3Rpb24oZGF0YWJhc2UsIHJlYWRvbmx5LCB0aGlzLnNxbGl0ZSk7XG4gICAgICAgICAgICBjb25zdCBjb25uTmFtZSA9IHJlYWRvbmx5ID8gYFJPXyR7ZGF0YWJhc2V9YCA6IGBSV18ke2RhdGFiYXNlfWA7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uRGljdC5zZXQoY29ubk5hbWUsIGNvbm4pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb25uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbG9zZUNvbm5lY3Rpb24oZGF0YWJhc2UsIHJlYWRvbmx5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGF0YWJhc2UuZW5kc1dpdGgoJy5kYicpKVxuICAgICAgICAgICAgICAgIGRhdGFiYXNlID0gZGF0YWJhc2Uuc2xpY2UoMCwgLTMpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuY2xvc2VDb25uZWN0aW9uKHsgZGF0YWJhc2UsIHJlYWRvbmx5IH0pO1xuICAgICAgICAgICAgY29uc3QgY29ubk5hbWUgPSByZWFkb25seSA/IGBST18ke2RhdGFiYXNlfWAgOiBgUldfJHtkYXRhYmFzZX1gO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QuZGVsZXRlKGNvbm5OYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0Nvbm5lY3Rpb24oZGF0YWJhc2UsIHJlYWRvbmx5KSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgICAgICBpZiAoZGF0YWJhc2UuZW5kc1dpdGgoJy5kYicpKVxuICAgICAgICAgICAgZGF0YWJhc2UgPSBkYXRhYmFzZS5zbGljZSgwLCAtMyk7XG4gICAgICAgIGNvbnN0IGNvbm5OYW1lID0gcmVhZG9ubHkgPyBgUk9fJHtkYXRhYmFzZX1gIDogYFJXXyR7ZGF0YWJhc2V9YDtcbiAgICAgICAgcmVzLnJlc3VsdCA9IHRoaXMuX2Nvbm5lY3Rpb25EaWN0Lmhhcyhjb25uTmFtZSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICB9XG4gICAgYXN5bmMgcmV0cmlldmVDb25uZWN0aW9uKGRhdGFiYXNlLCByZWFkb25seSkge1xuICAgICAgICBpZiAoZGF0YWJhc2UuZW5kc1dpdGgoJy5kYicpKVxuICAgICAgICAgICAgZGF0YWJhc2UgPSBkYXRhYmFzZS5zbGljZSgwLCAtMyk7XG4gICAgICAgIGNvbnN0IGNvbm5OYW1lID0gcmVhZG9ubHkgPyBgUk9fJHtkYXRhYmFzZX1gIDogYFJXXyR7ZGF0YWJhc2V9YDtcbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25EaWN0Lmhhcyhjb25uTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbm4gPSB0aGlzLl9jb25uZWN0aW9uRGljdC5nZXQoY29ubk5hbWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25uICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29ubik7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYENvbm5lY3Rpb24gJHtkYXRhYmFzZX0gaXMgdW5kZWZpbmVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYENvbm5lY3Rpb24gJHtkYXRhYmFzZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXROQ0RhdGFiYXNlUGF0aChwYXRoLCBkYXRhYmFzZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGF0YWJhc2VQYXRoID0gYXdhaXQgdGhpcy5zcWxpdGUuZ2V0TkNEYXRhYmFzZVBhdGgoe1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgZGF0YWJhc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YWJhc2VQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVOQ0Nvbm5lY3Rpb24oZGF0YWJhc2VQYXRoLCB2ZXJzaW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5jcmVhdGVOQ0Nvbm5lY3Rpb24oe1xuICAgICAgICAgICAgICAgIGRhdGFiYXNlUGF0aCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBjb25uID0gbmV3IFNRTGl0ZURCQ29ubmVjdGlvbihkYXRhYmFzZVBhdGgsIHRydWUsIHRoaXMuc3FsaXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbm5OYW1lID0gYFJPXyR7ZGF0YWJhc2VQYXRofSlgO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3Quc2V0KGNvbm5OYW1lLCBjb25uKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29ubik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xvc2VOQ0Nvbm5lY3Rpb24oZGF0YWJhc2VQYXRoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5jbG9zZU5DQ29ubmVjdGlvbih7IGRhdGFiYXNlUGF0aCB9KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbm5OYW1lID0gYFJPXyR7ZGF0YWJhc2VQYXRofSlgO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QuZGVsZXRlKGNvbm5OYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc05DQ29ubmVjdGlvbihkYXRhYmFzZVBhdGgpIHtcbiAgICAgICAgY29uc3QgcmVzID0ge307XG4gICAgICAgIGNvbnN0IGNvbm5OYW1lID0gYFJPXyR7ZGF0YWJhc2VQYXRofSlgO1xuICAgICAgICByZXMucmVzdWx0ID0gdGhpcy5fY29ubmVjdGlvbkRpY3QuaGFzKGNvbm5OYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgIH1cbiAgICBhc3luYyByZXRyaWV2ZU5DQ29ubmVjdGlvbihkYXRhYmFzZVBhdGgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25EaWN0LmhhcyhkYXRhYmFzZVBhdGgpKSB7XG4gICAgICAgICAgICBjb25zdCBjb25uTmFtZSA9IGBST18ke2RhdGFiYXNlUGF0aH0pYDtcbiAgICAgICAgICAgIGNvbnN0IGNvbm4gPSB0aGlzLl9jb25uZWN0aW9uRGljdC5nZXQoY29ubk5hbWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25uICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29ubik7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYENvbm5lY3Rpb24gJHtkYXRhYmFzZVBhdGh9IGlzIHVuZGVmaW5lZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBDb25uZWN0aW9uICR7ZGF0YWJhc2VQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGlzTkNEYXRhYmFzZShkYXRhYmFzZVBhdGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmlzTkNEYXRhYmFzZSh7IGRhdGFiYXNlUGF0aCB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyByZXRyaWV2ZUFsbENvbm5lY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvbkRpY3Q7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlQWxsQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGRlbERpY3QgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLl9jb25uZWN0aW9uRGljdC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGtleS5zdWJzdHJpbmcoMyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZG9ubHkgPSBrZXkuc3Vic3RyaW5nKDAsIDMpID09PSAnUk9fJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5jbG9zZUNvbm5lY3Rpb24oeyBkYXRhYmFzZSwgcmVhZG9ubHkgfSk7XG4gICAgICAgICAgICAgICAgZGVsRGljdC5zZXQoa2V5LCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGRlbERpY3Qua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2hlY2tDb25uZWN0aW9uc0NvbnNpc3RlbmN5KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IFsuLi50aGlzLl9jb25uZWN0aW9uRGljdC5rZXlzKCldO1xuICAgICAgICAgICAgY29uc3Qgb3Blbk1vZGVzID0gW107XG4gICAgICAgICAgICBjb25zdCBkYk5hbWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgb3Blbk1vZGVzLnB1c2goa2V5LnN1YnN0cmluZygwLCAyKSk7XG4gICAgICAgICAgICAgICAgZGJOYW1lcy5wdXNoKGtleS5zdWJzdHJpbmcoMykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuY2hlY2tDb25uZWN0aW9uc0NvbnNpc3RlbmN5KHtcbiAgICAgICAgICAgICAgICBkYk5hbWVzOiBkYk5hbWVzLFxuICAgICAgICAgICAgICAgIG9wZW5Nb2Rlczogb3Blbk1vZGVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlcy5yZXN1bHQpXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkRpY3QgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpbXBvcnRGcm9tSnNvbihqc29uc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLnNxbGl0ZS5pbXBvcnRGcm9tSnNvbih7IGpzb25zdHJpbmc6IGpzb25zdHJpbmcgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJldCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgaXNKc29uVmFsaWQoanNvbnN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5zcWxpdGUuaXNKc29uVmFsaWQoeyBqc29uc3RyaW5nOiBqc29uc3RyaW5nIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNvcHlGcm9tQXNzZXRzKG92ZXJ3cml0ZSkge1xuICAgICAgICBjb25zdCBtT3ZlcndyaXRlID0gb3ZlcndyaXRlICE9IG51bGwgPyBvdmVyd3JpdGUgOiB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuY29weUZyb21Bc3NldHMoeyBvdmVyd3JpdGU6IG1PdmVyd3JpdGUgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0RnJvbUhUVFBSZXF1ZXN0KHVybCwgb3ZlcndyaXRlKSB7XG4gICAgICAgIGNvbnN0IG1PdmVyd3JpdGUgPSBvdmVyd3JpdGUgIT0gbnVsbCA/IG92ZXJ3cml0ZSA6IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5nZXRGcm9tSFRUUFJlcXVlc3QoeyB1cmwsIG92ZXJ3cml0ZTogbU92ZXJ3cml0ZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0RhdGFiYXNlKGRhdGFiYXNlKSB7XG4gICAgICAgIGlmIChkYXRhYmFzZS5lbmRzV2l0aCgnLmRiJykpXG4gICAgICAgICAgICBkYXRhYmFzZSA9IGRhdGFiYXNlLnNsaWNlKDAsIC0zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmlzRGF0YWJhc2UoeyBkYXRhYmFzZTogZGF0YWJhc2UgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0RGF0YWJhc2VMaXN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuZ2V0RGF0YWJhc2VMaXN0KCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0TWlncmF0YWJsZURiTGlzdChmb2xkZXJQYXRoKSB7XG4gICAgICAgIGlmICghZm9sZGVyUGF0aCB8fCBmb2xkZXJQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdZb3UgbXVzdCBwcm92aWRlIGEgZm9sZGVyIHBhdGgnKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuZ2V0TWlncmF0YWJsZURiTGlzdCh7XG4gICAgICAgICAgICAgICAgZm9sZGVyUGF0aDogZm9sZGVyUGF0aCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZFNRTGl0ZVN1ZmZpeChmb2xkZXJQYXRoLCBkYk5hbWVMaXN0KSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBmb2xkZXJQYXRoID8gZm9sZGVyUGF0aCA6ICdkZWZhdWx0JztcbiAgICAgICAgY29uc3QgZGJMaXN0ID0gZGJOYW1lTGlzdCA/IGRiTmFtZUxpc3QgOiBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmFkZFNRTGl0ZVN1ZmZpeCh7XG4gICAgICAgICAgICAgICAgZm9sZGVyUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBkYk5hbWVMaXN0OiBkYkxpc3QsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBkZWxldGVPbGREYXRhYmFzZXMoZm9sZGVyUGF0aCwgZGJOYW1lTGlzdCkge1xuICAgICAgICBjb25zdCBwYXRoID0gZm9sZGVyUGF0aCA/IGZvbGRlclBhdGggOiAnZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IGRiTGlzdCA9IGRiTmFtZUxpc3QgPyBkYk5hbWVMaXN0IDogW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNxbGl0ZS5kZWxldGVPbGREYXRhYmFzZXMoe1xuICAgICAgICAgICAgICAgIGZvbGRlclBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgZGJOYW1lTGlzdDogZGJMaXN0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgbW92ZURhdGFiYXNlc0FuZEFkZFN1ZmZpeChmb2xkZXJQYXRoLCBkYk5hbWVMaXN0KSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBmb2xkZXJQYXRoID8gZm9sZGVyUGF0aCA6ICdkZWZhdWx0JztcbiAgICAgICAgY29uc3QgZGJMaXN0ID0gZGJOYW1lTGlzdCA/IGRiTmFtZUxpc3QgOiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3FsaXRlLm1vdmVEYXRhYmFzZXNBbmRBZGRTdWZmaXgoe1xuICAgICAgICAgICAgZm9sZGVyUGF0aDogcGF0aCxcbiAgICAgICAgICAgIGRiTmFtZUxpc3Q6IGRiTGlzdCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBTUUxpdGVEQkNvbm5lY3Rpb24gQ2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIFNRTGl0ZURCQ29ubmVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZGJOYW1lLCByZWFkb25seSwgc3FsaXRlKSB7XG4gICAgICAgIHRoaXMuZGJOYW1lID0gZGJOYW1lO1xuICAgICAgICB0aGlzLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgICAgIHRoaXMuc3FsaXRlID0gc3FsaXRlO1xuICAgIH1cbiAgICBnZXRDb25uZWN0aW9uREJOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYk5hbWU7XG4gICAgfVxuICAgIGdldENvbm5lY3Rpb25SZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHk7XG4gICAgfVxuICAgIGFzeW5jIG9wZW4oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5vcGVuKHtcbiAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3FsaXRlLmNsb3NlKHtcbiAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRVcmwoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNxbGl0ZS5nZXRVcmwoe1xuICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgdGhpcy5zcWxpdGUuZ2V0VmVyc2lvbih7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldFRhYmxlTGlzdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmdldFRhYmxlTGlzdCh7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZXhlY3V0ZShzdGF0ZW1lbnRzLCB0cmFuc2FjdGlvbiA9IHRydWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90IGFsbG93ZWQgaW4gcmVhZC1vbmx5IG1vZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBxdWVyeShzdGF0ZW1lbnQsIHZhbHVlcykge1xuICAgICAgICBsZXQgcmVzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLnF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUucXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy52YWx1ZXNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlcy52YWx1ZXNbMF0pLmluY2x1ZGVzKCdpb3NfY29sdW1ucycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkxpc3QgPSByZXMudmFsdWVzWzBdWydpb3NfY29sdW1ucyddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpb3NSZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCByZXMudmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dKc29uID0gcmVzLnZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc1Jvd0pzb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjb2x1bW5MaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzUm93SnNvbltpdGVtXSA9IHJvd0pzb25baXRlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpb3NSZXMucHVzaChyZXNSb3dKc29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgcmVzWyd2YWx1ZXMnXSA9IGlvc1JlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcnVuKHN0YXRlbWVudCwgdmFsdWVzLCB0cmFuc2FjdGlvbiA9IHRydWUpIHtcbiAgICAgICAgbGV0IHJlcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUucnVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUucnVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90IGFsbG93ZWQgaW4gcmVhZC1vbmx5IG1vZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBleGVjdXRlU2V0KHNldCwgdHJhbnNhY3Rpb24gPSB0cnVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNxbGl0ZS5leGVjdXRlU2V0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdub3QgYWxsb3dlZCBpbiByZWFkLW9ubHkgbW9kZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGlzRXhpc3RzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuaXNEQkV4aXN0cyh7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgaXNUYWJsZSh0YWJsZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuaXNUYWJsZUV4aXN0cyh7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgICAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGlzREJPcGVuKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zcWxpdGUuaXNEQk9wZW4oe1xuICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICByZWFkb25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3FsaXRlLmRlbGV0ZURhdGFiYXNlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdub3QgYWxsb3dlZCBpbiByZWFkLW9ubHkgbW9kZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZVN5bmNUYWJsZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmNyZWF0ZVN5bmNUYWJsZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90IGFsbG93ZWQgaW4gcmVhZC1vbmx5IG1vZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBzZXRTeW5jRGF0ZShzeW5jZGF0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuc2V0U3luY0RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN5bmNkYXRlOiBzeW5jZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90IGFsbG93ZWQgaW4gcmVhZC1vbmx5IG1vZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRTeW5jRGF0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmdldFN5bmNEYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCByZXREYXRlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzLnN5bmNEYXRlID4gMClcbiAgICAgICAgICAgICAgICByZXREYXRlID0gbmV3IERhdGUocmVzLnN5bmNEYXRlICogMTAwMCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmV0RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZXhwb3J0VG9Kc29uKG1vZGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc3FsaXRlLmV4cG9ydFRvSnNvbih7XG4gICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgIGpzb25leHBvcnRtb2RlOiBtb2RlLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlRXhwb3J0ZWRSb3dzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuZGVsZXRlRXhwb3J0ZWRSb3dzKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdub3QgYWxsb3dlZCBpbiByZWFkLW9ubHkgbW9kZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGV4ZWN1dGVUcmFuc2FjdGlvbih0eG4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuc3FsaXRlLmV4ZWN1dGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHM6ICdCRUdJTiBUUkFOU0FDVElPTjsnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldC5jaGFuZ2VzLmNoYW5nZXMgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRXJyb3IgaW4gQkVHSU4gVFJBTlNBQ1RJT04nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHR4bikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFzay52YWx1ZXMgJiYgdGFzay52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5zcWxpdGUucnVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiB0YXNrLnN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRhc2sudmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQuY2hhbmdlcy5sYXN0SWQgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlKCdST0xMQkFDSzsnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdFcnJvciBpbiB0cmFuc2FjdGlvbiBydW4gJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLnNxbGl0ZS5leGVjdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50czogdGFzay5zdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5jaGFuZ2VzLmNoYW5nZXMgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zcWxpdGUuZXhlY3V0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlOiB0aGlzLmRiTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50czogJ1JPTExCQUNLOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRXJyb3IgaW4gdHJhbnNhY3Rpb24gZXhlY3V0ZSAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5leGVjdXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2U6IHRoaXMuZGJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzOiAnQ09NTUlUOycsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90IGFsbG93ZWQgaW4gcmVhZC1vbmx5IG1vZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNxbGl0ZS5leGVjdXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhYmFzZTogdGhpcy5kYk5hbWUsXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50czogJ1JPTExCQUNLOycsXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZpbml0aW9ucy5qcy5tYXAiLCJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5jb25zdCBDYXBhY2l0b3JTUUxpdGUgPSByZWdpc3RlclBsdWdpbignQ2FwYWNpdG9yU1FMaXRlJywge1xuICAgIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4obSA9PiBuZXcgbS5DYXBhY2l0b3JTUUxpdGVXZWIoKSksXG4gICAgZWxlY3Ryb246ICgpID0+IHdpbmRvdy5DYXBhY2l0b3JDdXN0b21QbGF0Zm9ybS5wbHVnaW5zLkNhcGFjaXRvclNRTGl0ZSxcbn0pO1xuZXhwb3J0IHsgQ2FwYWNpdG9yU1FMaXRlIH07XG5leHBvcnQgKiBmcm9tICcuL2RlZmluaXRpb25zJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBhcHBseVBvbHlmaWxscygpIHtcbiAgdmFyIHByb21pc2VzID0gW107XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgICBpZiAoIXdpbi5jdXN0b21FbGVtZW50cyB8fFxuICAgICAgKHdpbi5FbGVtZW50ICYmICghd2luLkVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgfHwgIXdpbi5FbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8ICF3aW4uRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlIHx8ICF3aW4uRWxlbWVudC5wcm90b3R5cGUuZ2V0Um9vdE5vZGUpKSkge1xuICAgICAgcHJvbWlzZXMucHVzaChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJwb2x5ZmlsbHMtZG9tXCIgKi8gJy4vZG9tLmpzJykpO1xuICAgIH1cblxuICAgIHZhciBjaGVja0lmVVJMSXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB1ID0gbmV3IFVSTCgnYicsICdodHRwOi8vYScpO1xuICAgICAgICB1LnBhdGhuYW1lID0gJ2MlMjBkJztcbiAgICAgICAgcmV0dXJuICh1LmhyZWYgPT09ICdodHRwOi8vYS9jJTIwZCcpICYmIHUuc2VhcmNoUGFyYW1zO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChcbiAgICAgICdmdW5jdGlvbicgIT09IHR5cGVvZiBPYmplY3QuYXNzaWduIHx8ICFPYmplY3QuZW50cmllcyB8fFxuICAgICAgIUFycmF5LnByb3RvdHlwZS5maW5kIHx8ICFBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgfHxcbiAgICAgICFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggfHwgIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggfHxcbiAgICAgICh3aW4uTm9kZUxpc3QgJiYgIXdpbi5Ob2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkgfHxcbiAgICAgICF3aW4uZmV0Y2ggfHxcbiAgICAgICFjaGVja0lmVVJMSXNTdXBwb3J0ZWQoKSB8fFxuICAgICAgdHlwZW9mIFdlYWtNYXAgPT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHByb21pc2VzLnB1c2goaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwicG9seWZpbGxzLWNvcmUtanNcIiAqLyAnLi9jb3JlLWpzLmpzJykpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufVxuIiwiY29uc3QgTkFNRVNQQUNFID0gJ2plZXAtc3FsaXRlJztcblxuLyoqXG4gKiBWaXJ0dWFsIERPTSBwYXRjaGluZyBhbGdvcml0aG0gYmFzZWQgb24gU25hYmJkb20gYnlcbiAqIFNpbW9uIEZyaWlzIFZpbmR1bSAoQHBhbGRlcGluZClcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3NuYWJiZG9tL3NuYWJiZG9tL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBNb2RpZmllZCBmb3IgU3RlbmNpbCdzIHJlbmRlcmVyIGFuZCBzbG90IHByb2plY3Rpb25cbiAqL1xubGV0IHNjb3BlSWQ7XG5sZXQgaG9zdFRhZ05hbWU7XG5sZXQgaXNTdmdNb2RlID0gZmFsc2U7XG5sZXQgcXVldWVQZW5kaW5nID0gZmFsc2U7XG5jb25zdCBjcmVhdGVUaW1lID0gKGZuTmFtZSwgdGFnTmFtZSA9ICcnKSA9PiB7XG4gICAge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCB1bmlxdWVUaW1lID0gKGtleSwgbWVhc3VyZVRleHQpID0+IHtcbiAgICB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IEhZRFJBVEVEX0NTUyA9ICd7dmlzaWJpbGl0eTpoaWRkZW59Lmh5ZHJhdGVke3Zpc2liaWxpdHk6aW5oZXJpdH0nO1xuLyoqXG4gKiBEZWZhdWx0IHN0eWxlIG1vZGUgaWRcbiAqL1xuLyoqXG4gKiBSZXVzYWJsZSBlbXB0eSBvYmovYXJyYXlcbiAqIERvbid0IGFkZCB2YWx1ZXMgdG8gdGhlc2UhIVxuICovXG5jb25zdCBFTVBUWV9PQkogPSB7fTtcbmNvbnN0IGlzRGVmID0gKHYpID0+IHYgIT0gbnVsbDtcbmNvbnN0IGlzQ29tcGxleFR5cGUgPSAobykgPT4ge1xuICAgIC8vIGh0dHBzOi8vanNwZXJmLmNvbS90eXBlb2YtZm4tb2JqZWN0LzVcbiAgICBvID0gdHlwZW9mIG87XG4gICAgcmV0dXJuIG8gPT09ICdvYmplY3QnIHx8IG8gPT09ICdmdW5jdGlvbic7XG59O1xuLyoqXG4gKiBQcm9kdWN0aW9uIGgoKSBmdW5jdGlvbiBiYXNlZCBvbiBQcmVhY3QgYnlcbiAqIEphc29uIE1pbGxlciAoQGRldmVsb3BpdClcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9wcmVhY3QvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICpcbiAqIE1vZGlmaWVkIGZvciBTdGVuY2lsJ3MgY29tcGlsZXIgYW5kIHZkb21cbiAqL1xuLy8gY29uc3Qgc3RhY2s6IGFueVtdID0gW107XG4vLyBleHBvcnQgZnVuY3Rpb24gaChub2RlTmFtZTogc3RyaW5nIHwgZC5GdW5jdGlvbmFsQ29tcG9uZW50LCB2bm9kZURhdGE6IGQuUHJvcHNUeXBlLCBjaGlsZD86IGQuQ2hpbGRUeXBlKTogZC5WTm9kZTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBoKG5vZGVOYW1lOiBzdHJpbmcgfCBkLkZ1bmN0aW9uYWxDb21wb25lbnQsIHZub2RlRGF0YTogZC5Qcm9wc1R5cGUsIC4uLmNoaWxkcmVuOiBkLkNoaWxkVHlwZVtdKTogZC5WTm9kZTtcbmNvbnN0IGggPSAobm9kZU5hbWUsIHZub2RlRGF0YSwgLi4uY2hpbGRyZW4pID0+IHtcbiAgICBsZXQgY2hpbGQgPSBudWxsO1xuICAgIGxldCBzaW1wbGUgPSBmYWxzZTtcbiAgICBsZXQgbGFzdFNpbXBsZSA9IGZhbHNlO1xuICAgIGNvbnN0IHZOb2RlQ2hpbGRyZW4gPSBbXTtcbiAgICBjb25zdCB3YWxrID0gKGMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IGNbaV07XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICB3YWxrKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkICE9IG51bGwgJiYgdHlwZW9mIGNoaWxkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHNpbXBsZSA9IHR5cGVvZiBub2RlTmFtZSAhPT0gJ2Z1bmN0aW9uJyAmJiAhaXNDb21wbGV4VHlwZShjaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gU3RyaW5nKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNpbXBsZSAmJiBsYXN0U2ltcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyBjaGlsZCB3YXMgc2ltcGxlIChzdHJpbmcpLCB3ZSBtZXJnZSBib3RoXG4gICAgICAgICAgICAgICAgICAgIHZOb2RlQ2hpbGRyZW5bdk5vZGVDaGlsZHJlbi5sZW5ndGggLSAxXS4kdGV4dCQgKz0gY2hpbGQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgYSBuZXcgdk5vZGUsIGlmIGl0J3MgdGV4dCwgd2UgY3JlYXRlIGEgdGV4dCB2Tm9kZVxuICAgICAgICAgICAgICAgICAgICB2Tm9kZUNoaWxkcmVuLnB1c2goc2ltcGxlID8gbmV3Vk5vZGUobnVsbCwgY2hpbGQpIDogY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0U2ltcGxlID0gc2ltcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB3YWxrKGNoaWxkcmVuKTtcbiAgICBjb25zdCB2bm9kZSA9IG5ld1ZOb2RlKG5vZGVOYW1lLCBudWxsKTtcbiAgICB2bm9kZS4kYXR0cnMkID0gdm5vZGVEYXRhO1xuICAgIGlmICh2Tm9kZUNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdm5vZGUuJGNoaWxkcmVuJCA9IHZOb2RlQ2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiB2bm9kZTtcbn07XG5jb25zdCBuZXdWTm9kZSA9ICh0YWcsIHRleHQpID0+IHtcbiAgICBjb25zdCB2bm9kZSA9IHtcbiAgICAgICAgJGZsYWdzJDogMCxcbiAgICAgICAgJHRhZyQ6IHRhZyxcbiAgICAgICAgJHRleHQkOiB0ZXh0LFxuICAgICAgICAkZWxtJDogbnVsbCxcbiAgICAgICAgJGNoaWxkcmVuJDogbnVsbCxcbiAgICB9O1xuICAgIHtcbiAgICAgICAgdm5vZGUuJGF0dHJzJCA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZTtcbn07XG5jb25zdCBIb3N0ID0ge307XG5jb25zdCBpc0hvc3QgPSAobm9kZSkgPT4gbm9kZSAmJiBub2RlLiR0YWckID09PSBIb3N0O1xuLyoqXG4gKiBQYXJzZSBhIG5ldyBwcm9wZXJ0eSB2YWx1ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eSB0eXBlLlxuICpcbiAqIFdoaWxlIHRoZSBwcm9wIHZhbHVlIGNhbiByZWFzb25hYmx5IGJlIGV4cGVjdGVkIHRvIGJlIG9mIGBhbnlgIHR5cGUgYXMgZmFyIGFzIFR5cGVTY3JpcHQncyB0eXBlIGNoZWNrZXIgaXMgY29uY2VybmVkLFxuICogaXQgaXMgbm90IHNhZmUgdG8gYXNzdW1lIHRoYXQgdGhlIHN0cmluZyByZXR1cm5lZCBieSBldmFsdWF0aW5nIGB0eXBlb2YgcHJvcFZhbHVlYCBtYXRjaGVzOlxuICogICAxLiBgYW55YCwgdGhlIHR5cGUgZ2l2ZW4gdG8gYHByb3BWYWx1ZWAgaW4gdGhlIGZ1bmN0aW9uIHNpZ25hdHVyZVxuICogICAyLiB0aGUgdHlwZSBzdG9yZWQgZnJvbSBgcHJvcFR5cGVgLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcHJvdmlkZXMgdGhlIGNhcGFiaWxpdHkgdG8gcGFyc2UvY29lcmNlIGEgcHJvcGVydHkncyB2YWx1ZSB0byBwb3RlbnRpYWxseSBhbnkgb3RoZXIgSmF2YVNjcmlwdCB0eXBlLlxuICpcbiAqIFByb3BlcnR5IHZhbHVlcyByZXByZXNlbnRlZCBpbiBUU1ggcHJlc2VydmUgdGhlaXIgdHlwZSBpbmZvcm1hdGlvbi4gSW4gdGhlIGV4YW1wbGUgYmVsb3csIHRoZSBudW1iZXIgMCBpcyBwYXNzZWQgdG9cbiAqIGEgY29tcG9uZW50LiBUaGlzIGBwcm9wVmFsdWVgIHdpbGwgcHJlc2VydmUgaXRzIHR5cGUgaW5mb3JtYXRpb24gKGB0eXBlb2YgcHJvcFZhbHVlID09PSAnbnVtYmVyJ2ApLiBOb3RlIHRoYXQgaXNcbiAqIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBiZWluZyBwYXNzZWQgaW4sIG5vdCB0aGUgdHlwZSBkZWNsYXJlZCBvZiB0aGUgY2xhc3MgbWVtYmVyIGRlY29yYXRlZCB3aXRoIGBAUHJvcGAuXG4gKiBgYGB0c3hcbiAqIDxteS1jbXAgcHJvcC12YWw9ezB9PjwvbXktY21wPlxuICogYGBgXG4gKlxuICogSFRNTCBwcm9wIHZhbHVlcyBvbiB0aGUgb3RoZXIgaGFuZCwgd2lsbCBhbHdheXMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gcHJvcFZhbHVlIHRoZSBuZXcgdmFsdWUgdG8gY29lcmNlIHRvIHNvbWUgdHlwZVxuICogQHBhcmFtIHByb3BUeXBlIHRoZSB0eXBlIG9mIHRoZSBwcm9wLCBleHByZXNzZWQgYXMgYSBiaW5hcnkgbnVtYmVyXG4gKiBAcmV0dXJucyB0aGUgcGFyc2VkL2NvZXJjZWQgdmFsdWVcbiAqL1xuY29uc3QgcGFyc2VQcm9wZXJ0eVZhbHVlID0gKHByb3BWYWx1ZSwgcHJvcFR5cGUpID0+IHtcbiAgICAvLyBlbnN1cmUgdGhpcyB2YWx1ZSBpcyBvZiB0aGUgY29ycmVjdCBwcm9wIHR5cGVcbiAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgIWlzQ29tcGxleFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICBpZiAocHJvcFR5cGUgJiA0IC8qIE1FTUJFUl9GTEFHUy5Cb29sZWFuICovKSB7XG4gICAgICAgICAgICAvLyBwZXIgdGhlIEhUTUwgc3BlYywgYW55IHN0cmluZyB2YWx1ZSBtZWFucyBpdCBpcyBhIGJvb2xlYW4gdHJ1ZSB2YWx1ZVxuICAgICAgICAgICAgLy8gYnV0IHdlJ2xsIGNoZWF0IGhlcmUgYW5kIHNheSB0aGF0IHRoZSBzdHJpbmcgXCJmYWxzZVwiIGlzIHRoZSBib29sZWFuIGZhbHNlXG4gICAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlID09PSAnZmFsc2UnID8gZmFsc2UgOiBwcm9wVmFsdWUgPT09ICcnIHx8ICEhcHJvcFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVHlwZSAmIDEgLyogTUVNQkVSX0ZMQUdTLlN0cmluZyAqLykge1xuICAgICAgICAgICAgLy8gY291bGQgaGF2ZSBiZWVuIHBhc3NlZCBhcyBhIG51bWJlciBvciBib29sZWFuXG4gICAgICAgICAgICAvLyBidXQgd2Ugc3RpbGwgd2FudCBpdCBhcyBhIHN0cmluZ1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhwcm9wVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlZHVuZGFudCByZXR1cm4gaGVyZSBmb3IgYmV0dGVyIG1pbmlmaWNhdGlvblxuICAgICAgICByZXR1cm4gcHJvcFZhbHVlO1xuICAgIH1cbiAgICAvLyBub3Qgc3VyZSBleGFjdGx5IHdoYXQgdHlwZSB3ZSB3YW50XG4gICAgLy8gc28gbm8gbmVlZCB0byBjaGFuZ2UgdG8gYSBkaWZmZXJlbnQgdHlwZVxuICAgIHJldHVybiBwcm9wVmFsdWU7XG59O1xuY29uc3QgZ2V0RWxlbWVudCA9IChyZWYpID0+IChnZXRIb3N0UmVmKHJlZikuJGhvc3RFbGVtZW50JCApO1xuY29uc3QgY3JlYXRlRXZlbnQgPSAocmVmLCBuYW1lLCBmbGFncykgPT4ge1xuICAgIGNvbnN0IGVsbSA9IGdldEVsZW1lbnQocmVmKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBlbWl0OiAoZGV0YWlsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZW1pdEV2ZW50KGVsbSwgbmFtZSwge1xuICAgICAgICAgICAgICAgIGJ1YmJsZXM6ICEhKGZsYWdzICYgNCAvKiBFVkVOVF9GTEFHUy5CdWJibGVzICovKSxcbiAgICAgICAgICAgICAgICBjb21wb3NlZDogISEoZmxhZ3MgJiAyIC8qIEVWRU5UX0ZMQUdTLkNvbXBvc2VkICovKSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiAhIShmbGFncyAmIDEgLyogRVZFTlRfRkxBR1MuQ2FuY2VsbGFibGUgKi8pLFxuICAgICAgICAgICAgICAgIGRldGFpbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59O1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlICYgZGlzcGF0Y2ggYSBjdXN0b20gRXZlbnQgb24gYSBwcm92aWRlZCB0YXJnZXRcbiAqIEBwYXJhbSBlbG0gdGhlIHRhcmdldCBvZiB0aGUgRXZlbnRcbiAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIHRvIGdpdmUgdGhlIGN1c3RvbSBFdmVudFxuICogQHBhcmFtIG9wdHMgb3B0aW9ucyBmb3IgY29uZmlndXJpbmcgYSBjdXN0b20gRXZlbnRcbiAqIEByZXR1cm5zIHRoZSBjdXN0b20gRXZlbnRcbiAqL1xuY29uc3QgZW1pdEV2ZW50ID0gKGVsbSwgbmFtZSwgb3B0cykgPT4ge1xuICAgIGNvbnN0IGV2ID0gcGx0LmNlKG5hbWUsIG9wdHMpO1xuICAgIGVsbS5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICByZXR1cm4gZXY7XG59O1xuY29uc3Qgcm9vdEFwcGxpZWRTdHlsZXMgPSAvKkBfX1BVUkVfXyovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZWdpc3RlclN0eWxlID0gKHNjb3BlSWQsIGNzc1RleHQsIGFsbG93Q1MpID0+IHtcbiAgICBsZXQgc3R5bGUgPSBzdHlsZXMuZ2V0KHNjb3BlSWQpO1xuICAgIGlmIChzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cyAmJiBhbGxvd0NTKSB7XG4gICAgICAgIHN0eWxlID0gKHN0eWxlIHx8IG5ldyBDU1NTdHlsZVNoZWV0KCkpO1xuICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc3R5bGUgPSBjc3NUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUucmVwbGFjZVN5bmMoY3NzVGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0eWxlID0gY3NzVGV4dDtcbiAgICB9XG4gICAgc3R5bGVzLnNldChzY29wZUlkLCBzdHlsZSk7XG59O1xuY29uc3QgYWRkU3R5bGUgPSAoc3R5bGVDb250YWluZXJOb2RlLCBjbXBNZXRhLCBtb2RlLCBob3N0RWxtKSA9PiB7XG4gICAgbGV0IHNjb3BlSWQgPSBnZXRTY29wZUlkKGNtcE1ldGEpO1xuICAgIGNvbnN0IHN0eWxlID0gc3R5bGVzLmdldChzY29wZUlkKTtcbiAgICAvLyBpZiBhbiBlbGVtZW50IGlzIE5PVCBjb25uZWN0ZWQgdGhlbiBnZXRSb290Tm9kZSgpIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyByb290IG5vZGVcbiAgICAvLyBzbyB0aGUgZmFsbGJhY2sgaXMgdG8gYWx3YXlzIHVzZSB0aGUgZG9jdW1lbnQgZm9yIHRoZSByb290IG5vZGUgaW4gdGhvc2UgY2FzZXNcbiAgICBzdHlsZUNvbnRhaW5lck5vZGUgPSBzdHlsZUNvbnRhaW5lck5vZGUubm9kZVR5cGUgPT09IDExIC8qIE5PREVfVFlQRS5Eb2N1bWVudEZyYWdtZW50ICovID8gc3R5bGVDb250YWluZXJOb2RlIDogZG9jO1xuICAgIGlmIChzdHlsZSkge1xuICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc3R5bGVDb250YWluZXJOb2RlID0gc3R5bGVDb250YWluZXJOb2RlLmhlYWQgfHwgc3R5bGVDb250YWluZXJOb2RlO1xuICAgICAgICAgICAgbGV0IGFwcGxpZWRTdHlsZXMgPSByb290QXBwbGllZFN0eWxlcy5nZXQoc3R5bGVDb250YWluZXJOb2RlKTtcbiAgICAgICAgICAgIGxldCBzdHlsZUVsbTtcbiAgICAgICAgICAgIGlmICghYXBwbGllZFN0eWxlcykge1xuICAgICAgICAgICAgICAgIHJvb3RBcHBsaWVkU3R5bGVzLnNldChzdHlsZUNvbnRhaW5lck5vZGUsIChhcHBsaWVkU3R5bGVzID0gbmV3IFNldCgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFwcGxpZWRTdHlsZXMuaGFzKHNjb3BlSWQpKSB7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUVsbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVFbG0uaW5uZXJIVE1MID0gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGVDb250YWluZXJOb2RlLmluc2VydEJlZm9yZShzdHlsZUVsbSwgc3R5bGVDb250YWluZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJ2xpbmsnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhcHBsaWVkU3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGxpZWRTdHlsZXMuYWRkKHNjb3BlSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghc3R5bGVDb250YWluZXJOb2RlLmFkb3B0ZWRTdHlsZVNoZWV0cy5pbmNsdWRlcyhzdHlsZSkpIHtcbiAgICAgICAgICAgIHN0eWxlQ29udGFpbmVyTm9kZS5hZG9wdGVkU3R5bGVTaGVldHMgPSBbLi4uc3R5bGVDb250YWluZXJOb2RlLmFkb3B0ZWRTdHlsZVNoZWV0cywgc3R5bGVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY29wZUlkO1xufTtcbmNvbnN0IGF0dGFjaFN0eWxlcyA9IChob3N0UmVmKSA9PiB7XG4gICAgY29uc3QgY21wTWV0YSA9IGhvc3RSZWYuJGNtcE1ldGEkO1xuICAgIGNvbnN0IGVsbSA9IGhvc3RSZWYuJGhvc3RFbGVtZW50JDtcbiAgICBjb25zdCBmbGFncyA9IGNtcE1ldGEuJGZsYWdzJDtcbiAgICBjb25zdCBlbmRBdHRhY2hTdHlsZXMgPSBjcmVhdGVUaW1lKCdhdHRhY2hTdHlsZXMnLCBjbXBNZXRhLiR0YWdOYW1lJCk7XG4gICAgY29uc3Qgc2NvcGVJZCA9IGFkZFN0eWxlKGVsbS5zaGFkb3dSb290ID8gZWxtLnNoYWRvd1Jvb3QgOiBlbG0uZ2V0Um9vdE5vZGUoKSwgY21wTWV0YSk7XG4gICAgaWYgKGZsYWdzICYgMTAgLyogQ01QX0ZMQUdTLm5lZWRzU2NvcGVkRW5jYXBzdWxhdGlvbiAqLykge1xuICAgICAgICAvLyBvbmx5IHJlcXVpcmVkIHdoZW4gd2UncmUgTk9UIHVzaW5nIG5hdGl2ZSBzaGFkb3cgZG9tIChzbG90KVxuICAgICAgICAvLyBvciB0aGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IG5hdGl2ZSBzaGFkb3cgZG9tXG4gICAgICAgIC8vIGFuZCB0aGlzIGhvc3QgZWxlbWVudCB3YXMgTk9UIGNyZWF0ZWQgd2l0aCBTU1JcbiAgICAgICAgLy8gbGV0J3MgcGljayBvdXQgdGhlIGlubmVyIGNvbnRlbnQgZm9yIHNsb3QgcHJvamVjdGlvblxuICAgICAgICAvLyBjcmVhdGUgYSBub2RlIHRvIHJlcHJlc2VudCB3aGVyZSB0aGUgb3JpZ2luYWxcbiAgICAgICAgLy8gY29udGVudCB3YXMgZmlyc3QgcGxhY2VkLCB3aGljaCBpcyB1c2VmdWwgbGF0ZXIgb25cbiAgICAgICAgLy8gRE9NIFdSSVRFISFcbiAgICAgICAgZWxtWydzLXNjJ10gPSBzY29wZUlkO1xuICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChzY29wZUlkICsgJy1oJyk7XG4gICAgfVxuICAgIGVuZEF0dGFjaFN0eWxlcygpO1xufTtcbmNvbnN0IGdldFNjb3BlSWQgPSAoY21wLCBtb2RlKSA9PiAnc2MtJyArIChjbXAuJHRhZ05hbWUkKTtcbi8qKlxuICogUHJvZHVjdGlvbiBzZXRBY2Nlc3NvcigpIGZ1bmN0aW9uIGJhc2VkIG9uIFByZWFjdCBieVxuICogSmFzb24gTWlsbGVyIChAZGV2ZWxvcGl0KVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L3ByZWFjdC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKlxuICogTW9kaWZpZWQgZm9yIFN0ZW5jaWwncyBjb21waWxlciBhbmQgdmRvbVxuICovXG5jb25zdCBzZXRBY2Nlc3NvciA9IChlbG0sIG1lbWJlck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgaXNTdmcsIGZsYWdzKSA9PiB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBsZXQgaXNQcm9wID0gaXNNZW1iZXJJbkVsZW1lbnQoZWxtLCBtZW1iZXJOYW1lKTtcbiAgICAgICAgbWVtYmVyTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB7XG4gICAgICAgICAgICAvLyBTZXQgcHJvcGVydHkgaWYgaXQgZXhpc3RzIGFuZCBpdCdzIG5vdCBhIFNWR1xuICAgICAgICAgICAgY29uc3QgaXNDb21wbGV4ID0gaXNDb21wbGV4VHlwZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoKGlzUHJvcCB8fCAoaXNDb21wbGV4ICYmIG5ld1ZhbHVlICE9PSBudWxsKSkgJiYgIWlzU3ZnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbG0udGFnTmFtZS5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuID0gbmV3VmFsdWUgPT0gbnVsbCA/ICcnIDogbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBTYWZhcmksIG1vdmluZyB0aGUgPGlucHV0PiBjYXJldCB3aGVuIHJlLWFzc2lnbmluZyB0aGUgc2FtZSB2YWx1ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZW1iZXJOYW1lID09PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9sZFZhbHVlID09IG51bGwgfHwgZWxtW21lbWJlck5hbWVdICE9IG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbG1bbWVtYmVyTmFtZV0gPSBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxtW21lbWJlck5hbWVdID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwgfHwgbmV3VmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBmYWxzZSB8fCBlbG0uZ2V0QXR0cmlidXRlKG1lbWJlck5hbWUpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKG1lbWJlck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKCFpc1Byb3AgfHwgZmxhZ3MgJiA0IC8qIFZOT0RFX0ZMQUdTLmlzSG9zdCAqLyB8fCBpc1N2ZykgJiYgIWlzQ29tcGxleCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgPT09IHRydWUgPyAnJyA6IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShtZW1iZXJOYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IHVwZGF0ZUVsZW1lbnQgPSAob2xkVm5vZGUsIG5ld1Zub2RlLCBpc1N2Z01vZGUsIG1lbWJlck5hbWUpID0+IHtcbiAgICAvLyBpZiB0aGUgZWxlbWVudCBwYXNzZWQgaW4gaXMgYSBzaGFkb3cgcm9vdCwgd2hpY2ggaXMgYSBkb2N1bWVudCBmcmFnbWVudFxuICAgIC8vIHRoZW4gd2Ugd2FudCB0byBiZSBhZGRpbmcgYXR0cnMvcHJvcHMgdG8gdGhlIHNoYWRvdyByb290J3MgXCJob3N0XCIgZWxlbWVudFxuICAgIC8vIGlmIGl0J3Mgbm90IGEgc2hhZG93IHJvb3QsIHRoZW4gd2UgYWRkIGF0dHJzL3Byb3BzIHRvIHRoZSBzYW1lIGVsZW1lbnRcbiAgICBjb25zdCBlbG0gPSBuZXdWbm9kZS4kZWxtJC5ub2RlVHlwZSA9PT0gMTEgLyogTk9ERV9UWVBFLkRvY3VtZW50RnJhZ21lbnQgKi8gJiYgbmV3Vm5vZGUuJGVsbSQuaG9zdFxuICAgICAgICA/IG5ld1Zub2RlLiRlbG0kLmhvc3RcbiAgICAgICAgOiBuZXdWbm9kZS4kZWxtJDtcbiAgICBjb25zdCBvbGRWbm9kZUF0dHJzID0gKG9sZFZub2RlICYmIG9sZFZub2RlLiRhdHRycyQpIHx8IEVNUFRZX09CSjtcbiAgICBjb25zdCBuZXdWbm9kZUF0dHJzID0gbmV3Vm5vZGUuJGF0dHJzJCB8fCBFTVBUWV9PQko7XG4gICAge1xuICAgICAgICAvLyByZW1vdmUgYXR0cmlidXRlcyBubyBsb25nZXIgcHJlc2VudCBvbiB0aGUgdm5vZGUgYnkgc2V0dGluZyB0aGVtIHRvIHVuZGVmaW5lZFxuICAgICAgICBmb3IgKG1lbWJlck5hbWUgaW4gb2xkVm5vZGVBdHRycykge1xuICAgICAgICAgICAgaWYgKCEobWVtYmVyTmFtZSBpbiBuZXdWbm9kZUF0dHJzKSkge1xuICAgICAgICAgICAgICAgIHNldEFjY2Vzc29yKGVsbSwgbWVtYmVyTmFtZSwgb2xkVm5vZGVBdHRyc1ttZW1iZXJOYW1lXSwgdW5kZWZpbmVkLCBpc1N2Z01vZGUsIG5ld1Zub2RlLiRmbGFncyQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgJiB1cGRhdGUgY2hhbmdlZCBhdHRyaWJ1dGVzXG4gICAgZm9yIChtZW1iZXJOYW1lIGluIG5ld1Zub2RlQXR0cnMpIHtcbiAgICAgICAgc2V0QWNjZXNzb3IoZWxtLCBtZW1iZXJOYW1lLCBvbGRWbm9kZUF0dHJzW21lbWJlck5hbWVdLCBuZXdWbm9kZUF0dHJzW21lbWJlck5hbWVdLCBpc1N2Z01vZGUsIG5ld1Zub2RlLiRmbGFncyQpO1xuICAgIH1cbn07XG4vKipcbiAqIENyZWF0ZSBhIERPTSBOb2RlIGNvcnJlc3BvbmRpbmcgdG8gb25lIG9mIHRoZSBjaGlsZHJlbiBvZiBhIGdpdmVuIFZOb2RlLlxuICpcbiAqIEBwYXJhbSBvbGRQYXJlbnRWTm9kZSB0aGUgcGFyZW50IFZOb2RlIGZyb20gdGhlIHByZXZpb3VzIHJlbmRlclxuICogQHBhcmFtIG5ld1BhcmVudFZOb2RlIHRoZSBwYXJlbnQgVk5vZGUgZnJvbSB0aGUgY3VycmVudCByZW5kZXJcbiAqIEBwYXJhbSBjaGlsZEluZGV4IHRoZSBpbmRleCBvZiB0aGUgVk5vZGUsIGluIHRoZSBfbmV3XyBwYXJlbnQgbm9kZSdzXG4gKiBjaGlsZHJlbiwgZm9yIHdoaWNoIHdlIHdpbGwgY3JlYXRlIGEgbmV3IERPTSBub2RlXG4gKiBAcGFyYW0gcGFyZW50RWxtIHRoZSBwYXJlbnQgRE9NIG5vZGUgd2hpY2ggb3VyIG5ldyBub2RlIHdpbGwgYmUgYSBjaGlsZCBvZlxuICogQHJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgbm9kZVxuICovXG5jb25zdCBjcmVhdGVFbG0gPSAob2xkUGFyZW50Vk5vZGUsIG5ld1BhcmVudFZOb2RlLCBjaGlsZEluZGV4LCBwYXJlbnRFbG0pID0+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1jb25zdFxuICAgIGNvbnN0IG5ld1ZOb2RlID0gbmV3UGFyZW50Vk5vZGUuJGNoaWxkcmVuJFtjaGlsZEluZGV4XTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGVsbTtcbiAgICBsZXQgY2hpbGROb2RlO1xuICAgIHtcbiAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnRcbiAgICAgICAgZWxtID0gbmV3Vk5vZGUuJGVsbSQgPSAoZG9jLmNyZWF0ZUVsZW1lbnQobmV3Vk5vZGUuJHRhZyQpKTtcbiAgICAgICAgLy8gYWRkIGNzcyBjbGFzc2VzLCBhdHRycywgcHJvcHMsIGxpc3RlbmVycywgZXRjLlxuICAgICAgICB7XG4gICAgICAgICAgICB1cGRhdGVFbGVtZW50KG51bGwsIG5ld1ZOb2RlLCBpc1N2Z01vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihzY29wZUlkKSAmJiBlbG1bJ3Mtc2knXSAhPT0gc2NvcGVJZCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzY29wZUlkIGFuZCB0aGlzIGlzIHRoZSBpbml0aWFsIHJlbmRlclxuICAgICAgICAgICAgLy8gdGhlbiBsZXQncyBhZGQgdGhlIHNjb3BlSWQgYXMgYSBjc3MgY2xhc3NcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QuYWRkKChlbG1bJ3Mtc2knXSA9IHNjb3BlSWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3Vk5vZGUuJGNoaWxkcmVuJCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ld1ZOb2RlLiRjaGlsZHJlbiQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgdGhlIG5vZGVcbiAgICAgICAgICAgICAgICBjaGlsZE5vZGUgPSBjcmVhdGVFbG0ob2xkUGFyZW50Vk5vZGUsIG5ld1ZOb2RlLCBpKTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gbm9kZSBjb3VsZCBoYXZlIGJlZW4gbnVsbFxuICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXBwZW5kIG91ciBuZXcgbm9kZVxuICAgICAgICAgICAgICAgICAgICBlbG0uYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsbTtcbn07XG5jb25zdCBhZGRWbm9kZXMgPSAocGFyZW50RWxtLCBiZWZvcmUsIHBhcmVudFZOb2RlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpID0+IHtcbiAgICBsZXQgY29udGFpbmVyRWxtID0gKHBhcmVudEVsbSk7XG4gICAgbGV0IGNoaWxkTm9kZTtcbiAgICBpZiAoY29udGFpbmVyRWxtLnNoYWRvd1Jvb3QgJiYgY29udGFpbmVyRWxtLnRhZ05hbWUgPT09IGhvc3RUYWdOYW1lKSB7XG4gICAgICAgIGNvbnRhaW5lckVsbSA9IGNvbnRhaW5lckVsbS5zaGFkb3dSb290O1xuICAgIH1cbiAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgIGlmICh2bm9kZXNbc3RhcnRJZHhdKSB7XG4gICAgICAgICAgICBjaGlsZE5vZGUgPSBjcmVhdGVFbG0obnVsbCwgcGFyZW50Vk5vZGUsIHN0YXJ0SWR4KTtcbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2bm9kZXNbc3RhcnRJZHhdLiRlbG0kID0gY2hpbGROb2RlO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsbS5pbnNlcnRCZWZvcmUoY2hpbGROb2RlLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IHJlbW92ZVZub2RlcyA9ICh2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIHZub2RlLCBlbG0pID0+IHtcbiAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgIGlmICgodm5vZGUgPSB2bm9kZXNbc3RhcnRJZHhdKSkge1xuICAgICAgICAgICAgZWxtID0gdm5vZGUuJGVsbSQ7XG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHZub2RlJ3MgZWxlbWVudCBmcm9tIHRoZSBkb21cbiAgICAgICAgICAgIGVsbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIFJlY29uY2lsZSB0aGUgY2hpbGRyZW4gb2YgYSBuZXcgVk5vZGUgd2l0aCB0aGUgY2hpbGRyZW4gb2YgYW4gb2xkIFZOb2RlIGJ5XG4gKiB0cmF2ZXJzaW5nIHRoZSB0d28gY29sbGVjdGlvbnMgb2YgY2hpbGRyZW4sIGlkZW50aWZ5aW5nIG5vZGVzIHRoYXQgYXJlXG4gKiBjb25zZXJ2ZWQgb3IgY2hhbmdlZCwgY2FsbGluZyBvdXQgdG8gYHBhdGNoYCB0byBtYWtlIGFueSBuZWNlc3NhcnlcbiAqIHVwZGF0ZXMgdG8gdGhlIERPTSwgYW5kIHJlYXJyYW5naW5nIERPTSBub2RlcyBhcyBuZWVkZWQuXG4gKlxuICogVGhlIGFsZ29yaXRobSBmb3IgcmVjb25jaWxpbmcgY2hpbGRyZW4gd29ya3MgYnkgYW5hbHl6aW5nIHR3byAnd2luZG93cycgb250b1xuICogdGhlIHR3byBhcnJheXMgb2YgY2hpbGRyZW4gKGBvbGRDaGAgYW5kIGBuZXdDaGApLiBXZSBrZWVwIHRyYWNrIG9mIHRoZVxuICogJ3dpbmRvd3MnIGJ5IHN0b3Jpbmcgc3RhcnQgYW5kIGVuZCBpbmRpY2VzIGFuZCByZWZlcmVuY2VzIHRvIHRoZVxuICogY29ycmVzcG9uZGluZyBhcnJheSBlbnRyaWVzLiBJbml0aWFsbHkgdGhlIHR3byAnd2luZG93cycgYXJlIGJhc2ljYWxseSBlcXVhbFxuICogdG8gdGhlIGVudGlyZSBhcnJheSwgYnV0IHdlIHByb2dyZXNzaXZlbHkgbmFycm93IHRoZSB3aW5kb3dzIHVudGlsIHRoZXJlIGFyZVxuICogbm8gY2hpbGRyZW4gbGVmdCB0byB1cGRhdGUgYnkgZG9pbmcgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAxLiBTa2lwIGFueSBgbnVsbGAgZW50cmllcyBhdCB0aGUgYmVnaW5uaW5nIG9yIGVuZCBvZiB0aGUgdHdvIGFycmF5cywgc29cbiAqICAgIHRoYXQgaWYgd2UgaGF2ZSBhbiBpbml0aWFsIGFycmF5IGxpa2UgdGhlIGZvbGxvd2luZyB3ZSdsbCBlbmQgdXAgZGVhbGluZ1xuICogICAgb25seSB3aXRoIGEgd2luZG93IGJvdW5kZWQgYnkgdGhlIGhpZ2hsaWdodGVkIGVsZW1lbnRzOlxuICpcbiAqICAgIFtudWxsLCBudWxsLCBWTm9kZTEgLCAuLi4gLCBWTm9kZTIsIG51bGwsIG51bGxdXG4gKiAgICAgICAgICAgICAgICAgXl5eXl5eICAgICAgICAgXl5eXl5eXG4gKlxuICogMi4gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50cyBhdCB0aGUgaGVhZCBhbmQgdGFpbCBwb3NpdGlvbnMgYXJlIGVxdWFsXG4gKiAgICBhY3Jvc3MgdGhlIHdpbmRvd3MuIFRoaXMgd2lsbCBiYXNpY2FsbHkgZGV0ZWN0IGVsZW1lbnRzIHdoaWNoIGhhdmVuJ3RcbiAqICAgIGJlZW4gYWRkZWQsIHJlbW92ZWQsIG9yIGNoYW5nZWQgcG9zaXRpb24sIGkuZS4gaWYgeW91IGhhZCB0aGUgZm9sbG93aW5nXG4gKiAgICBWTm9kZSBlbGVtZW50cyAocmVwcmVzZW50ZWQgYXMgSFRNTCk6XG4gKlxuICogICAgb2xkVk5vZGU6IGA8ZGl2PjxwPjxzcGFuPkhFWTwvc3Bhbj48L3A+PC9kaXY+YFxuICogICAgbmV3Vk5vZGU6IGA8ZGl2PjxwPjxzcGFuPlRIRVJFPC9zcGFuPjwvcD48L2Rpdj5gXG4gKlxuICogICAgVGhlbiB3aGVuIGNvbXBhcmluZyB0aGUgY2hpbGRyZW4gb2YgdGhlIGA8ZGl2PmAgdGFnIHdlIGNoZWNrIHRoZSBlcXVhbGl0eVxuICogICAgb2YgdGhlIFZOb2RlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBgPHA+YCB0YWdzIGFuZCwgc2luY2UgdGhleSBhcmUgdGhlXG4gKiAgICBzYW1lIHRhZyBpbiB0aGUgc2FtZSBwb3NpdGlvbiwgd2UnZCBiZSBhYmxlIHRvIGF2b2lkIGNvbXBsZXRlbHlcbiAqICAgIHJlLXJlbmRlcmluZyB0aGUgc3VidHJlZSB1bmRlciB0aGVtIHdpdGggYSBuZXcgRE9NIGVsZW1lbnQgYW5kIHdvdWxkIGp1c3RcbiAqICAgIGNhbGwgb3V0IHRvIGBwYXRjaGAgdG8gaGFuZGxlIHJlY29uY2lsaW5nIHRoZWlyIGNoaWxkcmVuIGFuZCBzbyBvbi5cbiAqXG4gKiAzLiBDaGVjaywgZm9yIGJvdGggd2luZG93cywgdG8gc2VlIGlmIHRoZSBlbGVtZW50IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gKiAgICB3aW5kb3cgY29ycmVzcG9uZHMgdG8gdGhlIGVsZW1lbnQgYXQgdGhlIGVuZCBvZiB0aGUgb3RoZXIgd2luZG93LiBUaGlzIGlzXG4gKiAgICBhIGhldXJpc3RpYyB3aGljaCB3aWxsIGxldCB1cyBpZGVudGlmeSBfc29tZV8gc2l0dWF0aW9ucyBpbiB3aGljaFxuICogICAgZWxlbWVudHMgaGF2ZSBjaGFuZ2VkIHBvc2l0aW9uLCBmb3IgaW5zdGFuY2UgaXQgX3Nob3VsZF8gZGV0ZWN0IHRoYXQgdGhlXG4gKiAgICBjaGlsZHJlbiBub2RlcyB0aGVtc2VsdmVzIGhhdmUgbm90IGNoYW5nZWQgYnV0IG1lcmVseSBtb3ZlZCBpbiB0aGVcbiAqICAgIGZvbGxvd2luZyBleGFtcGxlOlxuICpcbiAqICAgIG9sZFZOb2RlOiBgPGRpdj48ZWxlbWVudC1vbmUgLz48ZWxlbWVudC10d28gLz48L2Rpdj5gXG4gKiAgICBuZXdWTm9kZTogYDxkaXY+PGVsZW1lbnQtdHdvIC8+PGVsZW1lbnQtb25lIC8+PC9kaXY+YFxuICpcbiAqICAgIElmIHdlIGZpbmQgY2FzZXMgbGlrZSB0aGlzIHRoZW4gd2UgYWxzbyBuZWVkIHRvIG1vdmUgdGhlIGNvbmNyZXRlIERPTVxuICogICAgZWxlbWVudHMgY29ycmVzcG9uZGluZyB0byB0aGUgbW92ZWQgY2hpbGRyZW4gdG8gd3JpdGUgdGhlIHJlLW9yZGVyIHRvIHRoZVxuICogICAgRE9NLlxuICpcbiAqIDQuIEZpbmFsbHksIGlmIFZOb2RlcyBoYXZlIHRoZSBga2V5YCBhdHRyaWJ1dGUgc2V0IG9uIHRoZW0gd2UgY2hlY2sgZm9yIGFueVxuICogICAgbm9kZXMgaW4gdGhlIG9sZCBjaGlsZHJlbiB3aGljaCBoYXZlIHRoZSBzYW1lIGtleSBhcyB0aGUgZmlyc3QgZWxlbWVudCBpblxuICogICAgb3VyIHdpbmRvdyBvbiB0aGUgbmV3IGNoaWxkcmVuLiBJZiB3ZSBmaW5kIHN1Y2ggYSBub2RlIHdlIGhhbmRsZSBjYWxsaW5nXG4gKiAgICBvdXQgdG8gYHBhdGNoYCwgbW92aW5nIHJlbGV2YW50IERPTSBub2RlcywgYW5kIHNvIG9uLCBpbiBhY2NvcmRhbmNlIHdpdGhcbiAqICAgIHdoYXQgd2UgZmluZC5cbiAqXG4gKiBGaW5hbGx5LCBvbmNlIHdlJ3ZlIG5hcnJvd2VkIG91ciAnd2luZG93cycgdG8gdGhlIHBvaW50IHRoYXQgZWl0aGVyIG9mIHRoZW1cbiAqIGNvbGxhcHNlIChpLmUuIHRoZXkgaGF2ZSBsZW5ndGggMCkgd2UgdGhlbiBoYW5kbGUgYW55IHJlbWFpbmluZyBWTm9kZVxuICogaW5zZXJ0aW9uIG9yIGRlbGV0aW9uIHRoYXQgbmVlZHMgdG8gaGFwcGVuIHRvIGdldCBhIERPTSBzdGF0ZSB0aGF0IGNvcnJlY3RseVxuICogcmVmbGVjdHMgdGhlIG5ldyBjaGlsZCBWTm9kZXMuIElmLCBmb3IgaW5zdGFuY2UsIGFmdGVyIG91ciB3aW5kb3cgb24gdGhlIG9sZFxuICogY2hpbGRyZW4gaGFzIGNvbGxhcHNlZCB3ZSBzdGlsbCBoYXZlIG1vcmUgbm9kZXMgb24gdGhlIG5ldyBjaGlsZHJlbiB0aGF0XG4gKiB3ZSBoYXZlbid0IGRlYWx0IHdpdGggeWV0IHRoZW4gd2UgbmVlZCB0byBhZGQgdGhlbSwgb3IgaWYgdGhlIG5ldyBjaGlsZHJlblxuICogY29sbGFwc2UgYnV0IHdlIHN0aWxsIGhhdmUgdW5oYW5kbGVkIF9vbGRfIGNoaWxkcmVuIHRoZW4gd2UgbmVlZCB0byBtYWtlXG4gKiBzdXJlIHRoZSBjb3JyZXNwb25kaW5nIERPTSBub2RlcyBhcmUgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0gcGFyZW50RWxtIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIHBhcmVudCBWTm9kZSBpcyByZW5kZXJlZFxuICogQHBhcmFtIG9sZENoIHRoZSBvbGQgY2hpbGRyZW4gb2YgdGhlIHBhcmVudCBub2RlXG4gKiBAcGFyYW0gbmV3Vk5vZGUgdGhlIG5ldyBWTm9kZSB3aGljaCB3aWxsIHJlcGxhY2UgdGhlIHBhcmVudFxuICogQHBhcmFtIG5ld0NoIHRoZSBuZXcgY2hpbGRyZW4gb2YgdGhlIHBhcmVudCBub2RlXG4gKi9cbmNvbnN0IHVwZGF0ZUNoaWxkcmVuID0gKHBhcmVudEVsbSwgb2xkQ2gsIG5ld1ZOb2RlLCBuZXdDaCkgPT4ge1xuICAgIGxldCBvbGRTdGFydElkeCA9IDA7XG4gICAgbGV0IG5ld1N0YXJ0SWR4ID0gMDtcbiAgICBsZXQgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICBsZXQgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgIGxldCBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgbGV0IG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgbGV0IG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICBsZXQgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgIGxldCBub2RlO1xuICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFZOb2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGFydCBub2RlcyBhcmUgdGhlIHNhbWUgdGhlbiB3ZSBzaG91bGQgcGF0Y2ggdGhlIG5ldyBWTm9kZVxuICAgICAgICAgICAgLy8gb250byB0aGUgb2xkIG9uZSwgYW5kIGluY3JlbWVudCBvdXIgYG5ld1N0YXJ0SWR4YCBhbmQgYG9sZFN0YXJ0SWR4YFxuICAgICAgICAgICAgLy8gaW5kaWNlcyB0byByZWZsZWN0IHRoYXQuIFdlIGRvbid0IG5lZWQgdG8gbW92ZSBhbnkgRE9NIE5vZGVzIGFyb3VuZFxuICAgICAgICAgICAgLy8gc2luY2UgdGhpbmdzIGFyZSBtYXRjaGVkIHVwIGluIG9yZGVyLlxuICAgICAgICAgICAgcGF0Y2gob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSk7XG4gICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgLy8gbGlrZXdpc2UsIGlmIHRoZSBlbmQgbm9kZXMgYXJlIHRoZSBzYW1lIHdlIHBhdGNoIG5ldyBvbnRvIG9sZCBhbmRcbiAgICAgICAgICAgIC8vIGRlY3JlbWVudCBvdXIgZW5kIGluZGljZXMsIGFuZCBhbHNvIGxpa2V3aXNlIGluIHRoaXMgY2FzZSB3ZSBkb24ndFxuICAgICAgICAgICAgLy8gbmVlZCB0byBtb3ZlIGFueSBET00gTm9kZXMuXG4gICAgICAgICAgICBwYXRjaChvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpO1xuICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1NhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKTtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbW92ZSB0aGUgZWxlbWVudCBmb3IgYG9sZFN0YXJ0Vm5vZGVgIGludG8gYSBwb3NpdGlvbiB3aGljaFxuICAgICAgICAgICAgLy8gd2lsbCBiZSBhcHByb3ByaWF0ZSBmb3IgYG5ld0VuZFZub2RlYC4gRm9yIHRoaXMgd2UgY2FuIHVzZVxuICAgICAgICAgICAgLy8gYC5pbnNlcnRCZWZvcmVgIGFuZCBgb2xkRW5kVm5vZGUuJGVsbSQubmV4dFNpYmxpbmdgLiBJZiB0aGVyZSBpcyBhXG4gICAgICAgICAgICAvLyBzaWJsaW5nIGZvciBgb2xkRW5kVm5vZGUuJGVsbSRgIHRoZW4gd2Ugd2FudCB0byBtb3ZlIHRoZSBET00gbm9kZSBmb3JcbiAgICAgICAgICAgIC8vIGBvbGRTdGFydFZub2RlYCBiZXR3ZWVuIGBvbGRFbmRWbm9kZWAgYW5kIGl0J3Mgc2libGluZywgbGlrZSBzbzpcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyA8b2xkLXN0YXJ0LW5vZGUgLz5cbiAgICAgICAgICAgIC8vIDxzb21lLWludGVydmVuaW5nLW5vZGUgLz5cbiAgICAgICAgICAgIC8vIDxvbGQtZW5kLW5vZGUgLz5cbiAgICAgICAgICAgIC8vIDwhLS0gLT4gICAgICAgICAgICAgIDwtLSBgb2xkU3RhcnRWbm9kZS4kZWxtJGAgc2hvdWxkIGJlIGluc2VydGVkIGhlcmVcbiAgICAgICAgICAgIC8vIDxuZXh0LXNpYmxpbmcgLz5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJZiBpbnN0ZWFkIGBvbGRFbmRWbm9kZS4kZWxtJGAgaGFzIG5vIHNpYmxpbmcgdGhlbiB3ZSBqdXN0IHdhbnQgdG8gcHV0XG4gICAgICAgICAgICAvLyB0aGUgbm9kZSBmb3IgYG9sZFN0YXJ0Vm5vZGVgIGF0IHRoZSBlbmQgb2YgdGhlIGNoaWxkcmVuIG9mXG4gICAgICAgICAgICAvLyBgcGFyZW50RWxtYC4gTHVja2lseSwgYE5vZGUubmV4dFNpYmxpbmdgIHdpbGwgcmV0dXJuIGBudWxsYCBpZiB0aGVyZVxuICAgICAgICAgICAgLy8gYXJlbid0IGFueSBzaWJsaW5ncywgYW5kIHBhc3NpbmcgYG51bGxgIHRvIGBOb2RlLmluc2VydEJlZm9yZWAgd2lsbFxuICAgICAgICAgICAgLy8gYXBwZW5kIGl0IHRvIHRoZSBjaGlsZHJlbiBvZiB0aGUgcGFyZW50IGVsZW1lbnQuXG4gICAgICAgICAgICBwYXJlbnRFbG0uaW5zZXJ0QmVmb3JlKG9sZFN0YXJ0Vm5vZGUuJGVsbSQsIG9sZEVuZFZub2RlLiRlbG0kLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2gob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpO1xuICAgICAgICAgICAgLy8gV2UndmUgYWxyZWFkeSBjaGVja2VkIGFib3ZlIGlmIGBvbGRTdGFydFZub2RlYCBhbmQgYG5ld1N0YXJ0Vm5vZGVgIGFyZVxuICAgICAgICAgICAgLy8gdGhlIHNhbWUgbm9kZSwgc28gc2luY2Ugd2UncmUgaGVyZSB3ZSBrbm93IHRoYXQgdGhleSBhcmUgbm90LiBUaHVzIHdlXG4gICAgICAgICAgICAvLyBjYW4gbW92ZSB0aGUgZWxlbWVudCBmb3IgYG9sZEVuZFZub2RlYCBfYmVmb3JlXyB0aGUgZWxlbWVudCBmb3JcbiAgICAgICAgICAgIC8vIGBvbGRTdGFydFZub2RlYCwgbGVhdmluZyBgb2xkU3RhcnRWbm9kZWAgdG8gYmUgcmVjb25jaWxlZCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGZ1dHVyZS5cbiAgICAgICAgICAgIHBhcmVudEVsbS5pbnNlcnRCZWZvcmUob2xkRW5kVm5vZGUuJGVsbSQsIG9sZFN0YXJ0Vm5vZGUuJGVsbSQpO1xuICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZWl0aGVyIGRpZG4ndCBmaW5kIGFuIGVsZW1lbnQgaW4gdGhlIG9sZCBjaGlsZHJlbiB0aGF0IG1hdGNoZXNcbiAgICAgICAgICAgICAgICAvLyB0aGUga2V5IG9mIHRoZSBmaXJzdCBuZXcgY2hpbGQgT1IgdGhlIGJ1aWxkIGlzIG5vdCB1c2luZyBga2V5YFxuICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXQgYWxsLiBJbiBlaXRoZXIgY2FzZSB3ZSBuZWVkIHRvIGNyZWF0ZSBhIG5ldyBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gZm9yIHRoZSBuZXcgbm9kZS5cbiAgICAgICAgICAgICAgICBub2RlID0gY3JlYXRlRWxtKG9sZENoICYmIG9sZENoW25ld1N0YXJ0SWR4XSwgbmV3Vk5vZGUsIG5ld1N0YXJ0SWR4KTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGNyZWF0ZWQgYSBuZXcgbm9kZSB0aGVuIGhhbmRsZSBpbnNlcnRpbmcgaXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZS4kZWxtJC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBvbGRTdGFydFZub2RlLiRlbG0kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICAgIC8vIHdlIGhhdmUgc29tZSBtb3JlIG5ldyBub2RlcyB0byBhZGQgd2hpY2ggZG9uJ3QgbWF0Y2ggdXAgd2l0aCBvbGQgbm9kZXNcbiAgICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgbmV3Q2hbbmV3RW5kSWR4ICsgMV0gPT0gbnVsbCA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS4kZWxtJCwgbmV3Vk5vZGUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobmV3U3RhcnRJZHggPiBuZXdFbmRJZHgpIHtcbiAgICAgICAgLy8gdGhlcmUgYXJlIG5vZGVzIGluIHRoZSBgb2xkQ2hgIGFycmF5IHdoaWNoIG5vIGxvbmdlciBjb3JyZXNwb25kIHRvIG5vZGVzXG4gICAgICAgIC8vIGluIHRoZSBuZXcgYXJyYXksIHNvIGxldHMgcmVtb3ZlIHRoZW0gKHdoaWNoIGVudGFpbHMgY2xlYW5pbmcgdXAgdGhlXG4gICAgICAgIC8vIHJlbGV2YW50IERPTSBub2RlcylcbiAgICAgICAgcmVtb3ZlVm5vZGVzKG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICB9XG59O1xuLyoqXG4gKiBDb21wYXJlIHR3byBWTm9kZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIHRoZSBzYW1lXG4gKlxuICogKipOQioqOiBUaGlzIGZ1bmN0aW9uIGlzIGFuIGVxdWFsaXR5IF9oZXVyaXN0aWNfIGJhc2VkIG9uIHRoZSBhdmFpbGFibGVcbiAqIGluZm9ybWF0aW9uIHNldCBvbiB0aGUgdHdvIFZOb2RlcyBhbmQgY2FuIGJlIG1pc2xlYWRpbmcgdW5kZXIgY2VydGFpblxuICogY2lyY3Vtc3RhbmNlcy4gSW4gcGFydGljdWxhciwgaWYgdGhlIHR3byBub2RlcyBkbyBub3QgaGF2ZSBga2V5YCBhdHRyc1xuICogKGF2YWlsYWJsZSB1bmRlciBgJGtleSRgIG9uIFZOb2RlcykgdGhlbiB0aGUgZnVuY3Rpb24gZmFsbHMgYmFjayBvbiBtZXJlbHlcbiAqIGNoZWNraW5nIHRoYXQgdGhleSBoYXZlIHRoZSBzYW1lIHRhZy5cbiAqXG4gKiBTbywgaW4gb3RoZXIgd29yZHMsIGlmIGBrZXlgIGF0dHJzIGFyZSBub3Qgc2V0IG9uIFZOb2RlcyB3aGljaCBtYXkgYmVcbiAqIGNoYW5naW5nIG9yZGVyIHdpdGhpbiBhIGBjaGlsZHJlbmAgYXJyYXkgb3Igc29tZXRoaW5nIGFsb25nIHRob3NlIGxpbmVzIHRoZW5cbiAqIHdlIGNvdWxkIG9idGFpbiBhIGZhbHNlIHBvc2l0aXZlIGFuZCB0aGVuIGhhdmUgdG8gZG8gbmVlZGxlc3MgcmUtcmVuZGVyaW5nLlxuICpcbiAqIEBwYXJhbSBsZWZ0Vk5vZGUgdGhlIGZpcnN0IFZOb2RlIHRvIGNoZWNrXG4gKiBAcGFyYW0gcmlnaHRWTm9kZSB0aGUgc2Vjb25kIFZOb2RlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZXkncmUgZXF1YWwgb3Igbm90XG4gKi9cbmNvbnN0IGlzU2FtZVZub2RlID0gKGxlZnRWTm9kZSwgcmlnaHRWTm9kZSkgPT4ge1xuICAgIC8vIGNvbXBhcmUgaWYgdHdvIHZub2RlIHRvIHNlZSBpZiB0aGV5J3JlIFwidGVjaG5pY2FsbHlcIiB0aGUgc2FtZVxuICAgIC8vIG5lZWQgdG8gaGF2ZSB0aGUgc2FtZSBlbGVtZW50IHRhZywgYW5kIHNhbWUga2V5IHRvIGJlIHRoZSBzYW1lXG4gICAgaWYgKGxlZnRWTm9kZS4kdGFnJCA9PT0gcmlnaHRWTm9kZS4kdGFnJCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8qKlxuICogSGFuZGxlIHJlY29uY2lsaW5nIGFuIG91dGRhdGVkIFZOb2RlIHdpdGggYSBuZXcgb25lIHdoaWNoIGNvcnJlc3BvbmRzIHRvXG4gKiBpdC4gVGhpcyBmdW5jdGlvbiBoYW5kbGVzIGZsdXNoaW5nIHVwZGF0ZXMgdG8gdGhlIERPTSBhbmQgcmVjb25jaWxpbmcgdGhlXG4gKiBjaGlsZHJlbiBvZiB0aGUgdHdvIG5vZGVzIChpZiBhbnkpLlxuICpcbiAqIEBwYXJhbSBvbGRWTm9kZSBhbiBvbGQgVk5vZGUgd2hvc2UgRE9NIGVsZW1lbnQgYW5kIGNoaWxkcmVuIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gbmV3Vk5vZGUgYSBuZXcgVk5vZGUgcmVwcmVzZW50aW5nIGFuIHVwZGF0ZWQgdmVyc2lvbiBvZiB0aGUgb2xkIG9uZVxuICovXG5jb25zdCBwYXRjaCA9IChvbGRWTm9kZSwgbmV3Vk5vZGUpID0+IHtcbiAgICBjb25zdCBlbG0gPSAobmV3Vk5vZGUuJGVsbSQgPSBvbGRWTm9kZS4kZWxtJCk7XG4gICAgY29uc3Qgb2xkQ2hpbGRyZW4gPSBvbGRWTm9kZS4kY2hpbGRyZW4kO1xuICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gbmV3Vk5vZGUuJGNoaWxkcmVuJDtcbiAgICB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBlaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgcmVuZGVyIG9mIGFuIGVsZW1lbnQgT1IgaXQncyBhbiB1cGRhdGVcbiAgICAgICAgICAgICAgICAvLyBBTkQgd2UgYWxyZWFkeSBrbm93IGl0J3MgcG9zc2libGUgaXQgY291bGQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB1cGRhdGVzIHRoZSBlbGVtZW50J3MgY3NzIGNsYXNzZXMsIGF0dHJzLCBwcm9wcywgbGlzdGVuZXJzLCBldGMuXG4gICAgICAgICAgICAgICAgdXBkYXRlRWxlbWVudChvbGRWTm9kZSwgbmV3Vk5vZGUsIGlzU3ZnTW9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZENoaWxkcmVuICE9PSBudWxsICYmIG5ld0NoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBsb29rcyBsaWtlIHRoZXJlJ3MgY2hpbGQgdm5vZGVzIGZvciBib3RoIHRoZSBvbGQgYW5kIG5ldyB2bm9kZXNcbiAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gY2FsbCBgdXBkYXRlQ2hpbGRyZW5gIHRvIHJlY29uY2lsZSB0aGVtXG4gICAgICAgICAgICB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoaWxkcmVuLCBuZXdWTm9kZSwgbmV3Q2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5ld0NoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyB2bm9kZSBjaGlsZHJlblxuICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgbmV3Vk5vZGUsIG5ld0NoaWxkcmVuLCAwLCBuZXdDaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRDaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm8gbmV3IGNoaWxkIHZub2RlcywgYnV0IHRoZXJlIGFyZSBvbGQgY2hpbGQgdm5vZGVzIHRvIHJlbW92ZVxuICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKG9sZENoaWxkcmVuLCAwLCBvbGRDaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCByZW5kZXJWZG9tID0gKGhvc3RSZWYsIHJlbmRlckZuUmVzdWx0cykgPT4ge1xuICAgIGNvbnN0IGhvc3RFbG0gPSBob3N0UmVmLiRob3N0RWxlbWVudCQ7XG4gICAgY29uc3QgY21wTWV0YSA9IGhvc3RSZWYuJGNtcE1ldGEkO1xuICAgIGNvbnN0IG9sZFZOb2RlID0gaG9zdFJlZi4kdm5vZGUkIHx8IG5ld1ZOb2RlKG51bGwsIG51bGwpO1xuICAgIGNvbnN0IHJvb3RWbm9kZSA9IGlzSG9zdChyZW5kZXJGblJlc3VsdHMpID8gcmVuZGVyRm5SZXN1bHRzIDogaChudWxsLCBudWxsLCByZW5kZXJGblJlc3VsdHMpO1xuICAgIGhvc3RUYWdOYW1lID0gaG9zdEVsbS50YWdOYW1lO1xuICAgIGlmIChjbXBNZXRhLiRhdHRyc1RvUmVmbGVjdCQpIHtcbiAgICAgICAgcm9vdFZub2RlLiRhdHRycyQgPSByb290Vm5vZGUuJGF0dHJzJCB8fCB7fTtcbiAgICAgICAgY21wTWV0YS4kYXR0cnNUb1JlZmxlY3QkLm1hcCgoW3Byb3BOYW1lLCBhdHRyaWJ1dGVdKSA9PiAocm9vdFZub2RlLiRhdHRycyRbYXR0cmlidXRlXSA9IGhvc3RFbG1bcHJvcE5hbWVdKSk7XG4gICAgfVxuICAgIHJvb3RWbm9kZS4kdGFnJCA9IG51bGw7XG4gICAgcm9vdFZub2RlLiRmbGFncyQgfD0gNCAvKiBWTk9ERV9GTEFHUy5pc0hvc3QgKi87XG4gICAgaG9zdFJlZi4kdm5vZGUkID0gcm9vdFZub2RlO1xuICAgIHJvb3RWbm9kZS4kZWxtJCA9IG9sZFZOb2RlLiRlbG0kID0gKGhvc3RFbG0uc2hhZG93Um9vdCB8fCBob3N0RWxtICk7XG4gICAge1xuICAgICAgICBzY29wZUlkID0gaG9zdEVsbVsncy1zYyddO1xuICAgIH1cbiAgICAvLyBzeW5jaHJvbm91cyBwYXRjaFxuICAgIHBhdGNoKG9sZFZOb2RlLCByb290Vm5vZGUpO1xufTtcbmNvbnN0IGF0dGFjaFRvQW5jZXN0b3IgPSAoaG9zdFJlZiwgYW5jZXN0b3JDb21wb25lbnQpID0+IHtcbiAgICBpZiAoYW5jZXN0b3JDb21wb25lbnQgJiYgIWhvc3RSZWYuJG9uUmVuZGVyUmVzb2x2ZSQgJiYgYW5jZXN0b3JDb21wb25lbnRbJ3MtcCddKSB7XG4gICAgICAgIGFuY2VzdG9yQ29tcG9uZW50WydzLXAnXS5wdXNoKG5ldyBQcm9taXNlKChyKSA9PiAoaG9zdFJlZi4kb25SZW5kZXJSZXNvbHZlJCA9IHIpKSk7XG4gICAgfVxufTtcbmNvbnN0IHNjaGVkdWxlVXBkYXRlID0gKGhvc3RSZWYsIGlzSW5pdGlhbExvYWQpID0+IHtcbiAgICB7XG4gICAgICAgIGhvc3RSZWYuJGZsYWdzJCB8PSAxNiAvKiBIT1NUX0ZMQUdTLmlzUXVldWVkRm9yVXBkYXRlICovO1xuICAgIH1cbiAgICBpZiAoaG9zdFJlZi4kZmxhZ3MkICYgNCAvKiBIT1NUX0ZMQUdTLmlzV2FpdGluZ0ZvckNoaWxkcmVuICovKSB7XG4gICAgICAgIGhvc3RSZWYuJGZsYWdzJCB8PSA1MTIgLyogSE9TVF9GTEFHUy5uZWVkc1JlcmVuZGVyICovO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGF0dGFjaFRvQW5jZXN0b3IoaG9zdFJlZiwgaG9zdFJlZi4kYW5jZXN0b3JDb21wb25lbnQkKTtcbiAgICAvLyB0aGVyZSBpcyBubyBhbmNlc3RvciBjb21wb25lbnQgb3IgdGhlIGFuY2VzdG9yIGNvbXBvbmVudFxuICAgIC8vIGhhcyBhbHJlYWR5IGZpcmVkIG9mZiBpdHMgbGlmZWN5Y2xlIHVwZGF0ZSB0aGVuXG4gICAgLy8gZmlyZSBvZmYgdGhlIGluaXRpYWwgdXBkYXRlXG4gICAgY29uc3QgZGlzcGF0Y2ggPSAoKSA9PiBkaXNwYXRjaEhvb2tzKGhvc3RSZWYsIGlzSW5pdGlhbExvYWQpO1xuICAgIHJldHVybiB3cml0ZVRhc2soZGlzcGF0Y2gpIDtcbn07XG5jb25zdCBkaXNwYXRjaEhvb2tzID0gKGhvc3RSZWYsIGlzSW5pdGlhbExvYWQpID0+IHtcbiAgICBjb25zdCBlbmRTY2hlZHVsZSA9IGNyZWF0ZVRpbWUoJ3NjaGVkdWxlVXBkYXRlJywgaG9zdFJlZi4kY21wTWV0YSQuJHRhZ05hbWUkKTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGhvc3RSZWYuJGxhenlJbnN0YW5jZSQgO1xuICAgIGxldCBwcm9taXNlO1xuICAgIGlmIChpc0luaXRpYWxMb2FkKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBzYWZlQ2FsbChpbnN0YW5jZSwgJ2NvbXBvbmVudFdpbGxMb2FkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW5kU2NoZWR1bGUoKTtcbiAgICByZXR1cm4gdGhlbihwcm9taXNlLCAoKSA9PiB1cGRhdGVDb21wb25lbnQoaG9zdFJlZiwgaW5zdGFuY2UsIGlzSW5pdGlhbExvYWQpKTtcbn07XG5jb25zdCB1cGRhdGVDb21wb25lbnQgPSBhc3luYyAoaG9zdFJlZiwgaW5zdGFuY2UsIGlzSW5pdGlhbExvYWQpID0+IHtcbiAgICAvLyB1cGRhdGVDb21wb25lbnRcbiAgICBjb25zdCBlbG0gPSBob3N0UmVmLiRob3N0RWxlbWVudCQ7XG4gICAgY29uc3QgZW5kVXBkYXRlID0gY3JlYXRlVGltZSgndXBkYXRlJywgaG9zdFJlZi4kY21wTWV0YSQuJHRhZ05hbWUkKTtcbiAgICBjb25zdCByYyA9IGVsbVsncy1yYyddO1xuICAgIGlmIChpc0luaXRpYWxMb2FkKSB7XG4gICAgICAgIC8vIERPTSBXUklURSFcbiAgICAgICAgYXR0YWNoU3R5bGVzKGhvc3RSZWYpO1xuICAgIH1cbiAgICBjb25zdCBlbmRSZW5kZXIgPSBjcmVhdGVUaW1lKCdyZW5kZXInLCBob3N0UmVmLiRjbXBNZXRhJC4kdGFnTmFtZSQpO1xuICAgIHtcbiAgICAgICAgY2FsbFJlbmRlcihob3N0UmVmLCBpbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChyYykge1xuICAgICAgICAvLyBvaywgc28gdHVybnMgb3V0IHRoZXJlIGFyZSBzb21lIGNoaWxkIGhvc3QgZWxlbWVudHNcbiAgICAgICAgLy8gd2FpdGluZyBvbiB0aGlzIHBhcmVudCBlbGVtZW50IHRvIGxvYWRcbiAgICAgICAgLy8gbGV0J3MgZmlyZSBvZmYgYWxsIHVwZGF0ZSBjYWxsYmFja3Mgd2FpdGluZ1xuICAgICAgICByYy5tYXAoKGNiKSA9PiBjYigpKTtcbiAgICAgICAgZWxtWydzLXJjJ10gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVuZFJlbmRlcigpO1xuICAgIGVuZFVwZGF0ZSgpO1xuICAgIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW5Qcm9taXNlcyA9IGVsbVsncy1wJ107XG4gICAgICAgIGNvbnN0IHBvc3RVcGRhdGUgPSAoKSA9PiBwb3N0VXBkYXRlQ29tcG9uZW50KGhvc3RSZWYpO1xuICAgICAgICBpZiAoY2hpbGRyZW5Qcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHBvc3RVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKGNoaWxkcmVuUHJvbWlzZXMpLnRoZW4ocG9zdFVwZGF0ZSk7XG4gICAgICAgICAgICBob3N0UmVmLiRmbGFncyQgfD0gNCAvKiBIT1NUX0ZMQUdTLmlzV2FpdGluZ0ZvckNoaWxkcmVuICovO1xuICAgICAgICAgICAgY2hpbGRyZW5Qcm9taXNlcy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGNhbGxSZW5kZXIgPSAoaG9zdFJlZiwgaW5zdGFuY2UsIGVsbSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGluc3RhbmNlID0gaW5zdGFuY2UucmVuZGVyKCkgO1xuICAgICAgICB7XG4gICAgICAgICAgICBob3N0UmVmLiRmbGFncyQgJj0gfjE2IC8qIEhPU1RfRkxBR1MuaXNRdWV1ZWRGb3JVcGRhdGUgKi87XG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgICAgaG9zdFJlZi4kZmxhZ3MkIHw9IDIgLyogSE9TVF9GTEFHUy5oYXNSZW5kZXJlZCAqLztcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gbG9va3MgbGlrZSB3ZSd2ZSBnb3QgY2hpbGQgbm9kZXMgdG8gcmVuZGVyIGludG8gdGhpcyBob3N0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgY3NzIGNsYXNzL2F0dHJzIG9uIHRoZSBob3N0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBET00gV1JJVEUhXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJWZG9tKGhvc3RSZWYsIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZUVycm9yKGUsIGhvc3RSZWYuJGhvc3RFbGVtZW50JCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IHBvc3RVcGRhdGVDb21wb25lbnQgPSAoaG9zdFJlZikgPT4ge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBob3N0UmVmLiRjbXBNZXRhJC4kdGFnTmFtZSQ7XG4gICAgY29uc3QgZWxtID0gaG9zdFJlZi4kaG9zdEVsZW1lbnQkO1xuICAgIGNvbnN0IGVuZFBvc3RVcGRhdGUgPSBjcmVhdGVUaW1lKCdwb3N0VXBkYXRlJywgdGFnTmFtZSk7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBob3N0UmVmLiRsYXp5SW5zdGFuY2UkIDtcbiAgICBjb25zdCBhbmNlc3RvckNvbXBvbmVudCA9IGhvc3RSZWYuJGFuY2VzdG9yQ29tcG9uZW50JDtcbiAgICBpZiAoIShob3N0UmVmLiRmbGFncyQgJiA2NCAvKiBIT1NUX0ZMQUdTLmhhc0xvYWRlZENvbXBvbmVudCAqLykpIHtcbiAgICAgICAgaG9zdFJlZi4kZmxhZ3MkIHw9IDY0IC8qIEhPU1RfRkxBR1MuaGFzTG9hZGVkQ29tcG9uZW50ICovO1xuICAgICAgICB7XG4gICAgICAgICAgICAvLyBET00gV1JJVEUhXG4gICAgICAgICAgICBhZGRIeWRyYXRlZEZsYWcoZWxtKTtcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgICBzYWZlQ2FsbChpbnN0YW5jZSwgJ2NvbXBvbmVudERpZExvYWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRQb3N0VXBkYXRlKCk7XG4gICAgICAgIHtcbiAgICAgICAgICAgIGhvc3RSZWYuJG9uUmVhZHlSZXNvbHZlJChlbG0pO1xuICAgICAgICAgICAgaWYgKCFhbmNlc3RvckNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGFwcERpZExvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZW5kUG9zdFVwZGF0ZSgpO1xuICAgIH1cbiAgICB7XG4gICAgICAgIGhvc3RSZWYuJG9uSW5zdGFuY2VSZXNvbHZlJChlbG0pO1xuICAgIH1cbiAgICAvLyBsb2FkIGV2ZW50cyBmaXJlIGZyb20gYm90dG9tIHRvIHRvcFxuICAgIC8vIHRoZSBkZWVwZXN0IGVsZW1lbnRzIGxvYWQgZmlyc3QgdGhlbiBidWJibGVzIHVwXG4gICAge1xuICAgICAgICBpZiAoaG9zdFJlZi4kb25SZW5kZXJSZXNvbHZlJCkge1xuICAgICAgICAgICAgaG9zdFJlZi4kb25SZW5kZXJSZXNvbHZlJCgpO1xuICAgICAgICAgICAgaG9zdFJlZi4kb25SZW5kZXJSZXNvbHZlJCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG9zdFJlZi4kZmxhZ3MkICYgNTEyIC8qIEhPU1RfRkxBR1MubmVlZHNSZXJlbmRlciAqLykge1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4gc2NoZWR1bGVVcGRhdGUoaG9zdFJlZiwgZmFsc2UpKTtcbiAgICAgICAgfVxuICAgICAgICBob3N0UmVmLiRmbGFncyQgJj0gfig0IC8qIEhPU1RfRkxBR1MuaXNXYWl0aW5nRm9yQ2hpbGRyZW4gKi8gfCA1MTIgLyogSE9TVF9GTEFHUy5uZWVkc1JlcmVuZGVyICovKTtcbiAgICB9XG4gICAgLy8gKCDigKJf4oCiKVxuICAgIC8vICgg4oCiX+KAoik+4oyQ4pagLeKWoFxuICAgIC8vICjijJDilqBf4pagKVxufTtcbmNvbnN0IGFwcERpZExvYWQgPSAod2hvKSA9PiB7XG4gICAgLy8gb24gYXBwbG9hZFxuICAgIC8vIHdlIGhhdmUgZmluaXNoIHRoZSBmaXJzdCBiaWcgaW5pdGlhbCByZW5kZXJcbiAgICB7XG4gICAgICAgIGFkZEh5ZHJhdGVkRmxhZyhkb2MuZG9jdW1lbnRFbGVtZW50KTtcbiAgICB9XG4gICAgbmV4dFRpY2soKCkgPT4gZW1pdEV2ZW50KHdpbiwgJ2FwcGxvYWQnLCB7IGRldGFpbDogeyBuYW1lc3BhY2U6IE5BTUVTUEFDRSB9IH0pKTtcbn07XG5jb25zdCBzYWZlQ2FsbCA9IChpbnN0YW5jZSwgbWV0aG9kLCBhcmcpID0+IHtcbiAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2VbbWV0aG9kXSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlW21ldGhvZF0oYXJnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZUVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuY29uc3QgdGhlbiA9IChwcm9taXNlLCB0aGVuRm4pID0+IHtcbiAgICByZXR1cm4gcHJvbWlzZSAmJiBwcm9taXNlLnRoZW4gPyBwcm9taXNlLnRoZW4odGhlbkZuKSA6IHRoZW5GbigpO1xufTtcbmNvbnN0IGFkZEh5ZHJhdGVkRmxhZyA9IChlbG0pID0+IGVsbS5jbGFzc0xpc3QuYWRkKCdoeWRyYXRlZCcpXG4gICAgO1xuY29uc3QgZ2V0VmFsdWUgPSAocmVmLCBwcm9wTmFtZSkgPT4gZ2V0SG9zdFJlZihyZWYpLiRpbnN0YW5jZVZhbHVlcyQuZ2V0KHByb3BOYW1lKTtcbmNvbnN0IHNldFZhbHVlID0gKHJlZiwgcHJvcE5hbWUsIG5ld1ZhbCwgY21wTWV0YSkgPT4ge1xuICAgIC8vIGNoZWNrIG91ciBuZXcgcHJvcGVydHkgdmFsdWUgYWdhaW5zdCBvdXIgaW50ZXJuYWwgdmFsdWVcbiAgICBjb25zdCBob3N0UmVmID0gZ2V0SG9zdFJlZihyZWYpO1xuICAgIGNvbnN0IGVsbSA9IGhvc3RSZWYuJGhvc3RFbGVtZW50JCA7XG4gICAgY29uc3Qgb2xkVmFsID0gaG9zdFJlZi4kaW5zdGFuY2VWYWx1ZXMkLmdldChwcm9wTmFtZSk7XG4gICAgY29uc3QgZmxhZ3MgPSBob3N0UmVmLiRmbGFncyQ7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBob3N0UmVmLiRsYXp5SW5zdGFuY2UkIDtcbiAgICBuZXdWYWwgPSBwYXJzZVByb3BlcnR5VmFsdWUobmV3VmFsLCBjbXBNZXRhLiRtZW1iZXJzJFtwcm9wTmFtZV1bMF0pO1xuICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZm9yIE5hTiBvbiBib3RoIHNpZGVzLCBhcyBgTmFOID09PSBOYU5gIGlzIGFsd2F5cyBmYWxzZVxuICAgIGNvbnN0IGFyZUJvdGhOYU4gPSBOdW1iZXIuaXNOYU4ob2xkVmFsKSAmJiBOdW1iZXIuaXNOYU4obmV3VmFsKTtcbiAgICBjb25zdCBkaWRWYWx1ZUNoYW5nZSA9IG5ld1ZhbCAhPT0gb2xkVmFsICYmICFhcmVCb3RoTmFOO1xuICAgIGlmICgoIShmbGFncyAmIDggLyogSE9TVF9GTEFHUy5pc0NvbnN0cnVjdGluZ0luc3RhbmNlICovKSB8fCBvbGRWYWwgPT09IHVuZGVmaW5lZCkgJiYgZGlkVmFsdWVDaGFuZ2UpIHtcbiAgICAgICAgLy8gZ2Fkem9va3MhIHRoZSBwcm9wZXJ0eSdzIHZhbHVlIGhhcyBjaGFuZ2VkISFcbiAgICAgICAgLy8gc2V0IG91ciBuZXcgdmFsdWUhXG4gICAgICAgIGhvc3RSZWYuJGluc3RhbmNlVmFsdWVzJC5zZXQocHJvcE5hbWUsIG5ld1ZhbCk7XG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgLy8gZ2V0IGFuIGFycmF5IG9mIG1ldGhvZCBuYW1lcyBvZiB3YXRjaCBmdW5jdGlvbnMgdG8gY2FsbFxuICAgICAgICAgICAgaWYgKGNtcE1ldGEuJHdhdGNoZXJzJCAmJiBmbGFncyAmIDEyOCAvKiBIT1NUX0ZMQUdTLmlzV2F0Y2hSZWFkeSAqLykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhdGNoTWV0aG9kcyA9IGNtcE1ldGEuJHdhdGNoZXJzJFtwcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHdhdGNoTWV0aG9kcykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGluc3RhbmNlIGlzIHdhdGNoaW5nIGZvciB3aGVuIHRoaXMgcHJvcGVydHkgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICB3YXRjaE1ldGhvZHMubWFwKCh3YXRjaE1ldGhvZE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlyZSBvZmYgZWFjaCBvZiB0aGUgd2F0Y2ggbWV0aG9kcyB0aGF0IGFyZSB3YXRjaGluZyB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Vbd2F0Y2hNZXRob2ROYW1lXShuZXdWYWwsIG9sZFZhbCwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlRXJyb3IoZSwgZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChmbGFncyAmICgyIC8qIEhPU1RfRkxBR1MuaGFzUmVuZGVyZWQgKi8gfCAxNiAvKiBIT1NUX0ZMQUdTLmlzUXVldWVkRm9yVXBkYXRlICovKSkgPT09IDIgLyogSE9TVF9GTEFHUy5oYXNSZW5kZXJlZCAqLykge1xuICAgICAgICAgICAgICAgIC8vIGxvb2tzIGxpa2UgdGhpcyB2YWx1ZSBhY3R1YWxseSBjaGFuZ2VkLCBzbyB3ZSd2ZSBnb3Qgd29yayB0byBkbyFcbiAgICAgICAgICAgICAgICAvLyBidXQgb25seSBpZiB3ZSd2ZSBhbHJlYWR5IHJlbmRlcmVkLCBvdGhlcndpc2UganVzdCBjaGlsbCBvdXRcbiAgICAgICAgICAgICAgICAvLyBxdWV1ZSB0aGF0IHdlIG5lZWQgdG8gZG8gYW4gdXBkYXRlLCBidXQgZG9uJ3Qgd29ycnkgYWJvdXQgcXVldWluZ1xuICAgICAgICAgICAgICAgIC8vIHVwIG1pbGxpb25zIGN1eiB0aGlzIGZ1bmN0aW9uIGVuc3VyZXMgaXQgb25seSBydW5zIG9uY2VcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVVwZGF0ZShob3N0UmVmLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBdHRhY2ggYSBzZXJpZXMgb2YgcnVudGltZSBjb25zdHJ1Y3RzIHRvIGEgY29tcGlsZWQgU3RlbmNpbCBjb21wb25lbnRcbiAqIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgdGhlIGBAUHJvcGAgYW5kIGBAU3RhdGVgXG4gKiBkZWNvcmF0b3JzLCBjYWxsYmFja3MgZm9yIHdoZW4gYXR0cmlidXRlcyBjaGFuZ2UsIGFuZCBzbyBvbi5cbiAqXG4gKiBAcGFyYW0gQ3N0ciB0aGUgY29uc3RydWN0b3IgZm9yIGEgY29tcG9uZW50IHRoYXQgd2UgbmVlZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0gY21wTWV0YSBtZXRhZGF0YSBjb2xsZWN0ZWQgcHJldmlvdXNseSBhYm91dCB0aGUgY29tcG9uZW50XG4gKiBAcGFyYW0gZmxhZ3MgYSBudW1iZXIgdXNlZCB0byBzdG9yZSBhIHNlcmllcyBvZiBiaXQgZmxhZ3NcbiAqIEByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBzYW1lIGNvbnN0cnVjdG9yIHBhc3NlZCBpbiAoYnV0IG5vdyBtdXRhdGVkKVxuICovXG5jb25zdCBwcm94eUNvbXBvbmVudCA9IChDc3RyLCBjbXBNZXRhLCBmbGFncykgPT4ge1xuICAgIGlmIChjbXBNZXRhLiRtZW1iZXJzJCkge1xuICAgICAgICBpZiAoQ3N0ci53YXRjaGVycykge1xuICAgICAgICAgICAgY21wTWV0YS4kd2F0Y2hlcnMkID0gQ3N0ci53YXRjaGVycztcbiAgICAgICAgfVxuICAgICAgICAvLyBJdCdzIGJldHRlciB0byBoYXZlIGEgY29uc3QgdGhhbiB0d28gT2JqZWN0LmVudHJpZXMoKVxuICAgICAgICBjb25zdCBtZW1iZXJzID0gT2JqZWN0LmVudHJpZXMoY21wTWV0YS4kbWVtYmVycyQpO1xuICAgICAgICBjb25zdCBwcm90b3R5cGUgPSBDc3RyLnByb3RvdHlwZTtcbiAgICAgICAgbWVtYmVycy5tYXAoKFttZW1iZXJOYW1lLCBbbWVtYmVyRmxhZ3NdXSkgPT4ge1xuICAgICAgICAgICAgaWYgKChtZW1iZXJGbGFncyAmIDMxIC8qIE1FTUJFUl9GTEFHUy5Qcm9wICovIHx8XG4gICAgICAgICAgICAgICAgICAgICgoZmxhZ3MgJiAyIC8qIFBST1hZX0ZMQUdTLnByb3h5U3RhdGUgKi8pICYmIG1lbWJlckZsYWdzICYgMzIgLyogTUVNQkVSX0ZMQUdTLlN0YXRlICovKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm94eUNvbXBvbmVudCAtIHByb3BcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBtZW1iZXJOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb3h5Q29tcG9uZW50LCBnZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWYWx1ZSh0aGlzLCBtZW1iZXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0KG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm94eUNvbXBvbmVudCwgc2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZSh0aGlzLCBtZW1iZXJOYW1lLCBuZXdWYWx1ZSwgY21wTWV0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZsYWdzICYgMSAvKiBQUk9YWV9GTEFHUy5pc0VsZW1lbnRDb25zdHJ1Y3RvciAqLyAmJlxuICAgICAgICAgICAgICAgIG1lbWJlckZsYWdzICYgNjQgLyogTUVNQkVSX0ZMQUdTLk1ldGhvZCAqLykge1xuICAgICAgICAgICAgICAgIC8vIHByb3h5Q29tcG9uZW50IC0gbWV0aG9kXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgbWVtYmVyTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWYgPSBnZXRIb3N0UmVmKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi4kb25JbnN0YW5jZVByb21pc2UkLnRoZW4oKCkgPT4gcmVmLiRsYXp5SW5zdGFuY2UkW21lbWJlck5hbWVdKC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICgoZmxhZ3MgJiAxIC8qIFBST1hZX0ZMQUdTLmlzRWxlbWVudENvbnN0cnVjdG9yICovKSkge1xuICAgICAgICAgICAgY29uc3QgYXR0ck5hbWVUb1Byb3BOYW1lID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgcHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChhdHRyTmFtZSwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHBsdC5qbXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF0dHJOYW1lVG9Qcm9wTmFtZS5nZXQoYXR0ck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgSW4gYSB3ZWIgY29tcG9uZW50IGxpZmVjeWNsZSB0aGUgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIHJ1bnMgcHJpb3IgdG8gY29ubmVjdGVkQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgLy8gIGluIHRoZSBjYXNlIHdoZXJlIGFuIGF0dHJpYnV0ZSB3YXMgc2V0IGlubGluZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gIGBgYGh0bWxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgPG15LWNvbXBvbmVudCBzb21lLWF0dHJpYnV0ZT1cInNvbWUtdmFsdWVcIj48L215LWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgLy8gIGBgYFxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgVGhlcmUgaXMgYW4gZWRnZSBjYXNlIHdoZXJlIGEgZGV2ZWxvcGVyIHNldHMgdGhlIGF0dHJpYnV0ZSBpbmxpbmUgb24gYSBjdXN0b20gZWxlbWVudCBhbmQgdGhlblxuICAgICAgICAgICAgICAgICAgICAvLyAgcHJvZ3JhbW1hdGljYWxseSBjaGFuZ2VzIGl0IGJlZm9yZSBpdCBoYXMgYmVlbiB1cGdyYWRlZCBhcyBzaG93biBiZWxvdzpcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gIGBgYGh0bWxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgPCEtLSB0aGlzIGNvbXBvbmVudCBoYXMgX25vdF8gYmVlbiB1cGdyYWRlZCB5ZXQgLS0+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDxteS1jb21wb25lbnQgaWQ9XCJ0ZXN0XCIgc29tZS1hdHRyaWJ1dGU9XCJzb21lLXZhbHVlXCI+PC9teS1jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDxzY3JpcHQ+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgLy8gZ3JhYiBub24tdXBncmFkZWQgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgZWwuc29tZUF0dHJpYnV0ZSA9IFwiYW5vdGhlci12YWx1ZVwiO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgIC8vIHVwZ3JhZGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdteS1jb21wb25lbnQnLCBNeUNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgICAgICAgICAvLyAgYGBgXG4gICAgICAgICAgICAgICAgICAgIC8vICBJbiB0aGlzIGNhc2UgaWYgd2UgZG8gbm90IHVuc2hhZG93IGhlcmUgYW5kIHVzZSB0aGUgdmFsdWUgb2YgdGhlIHNoYWRvd2luZyBwcm9wZXJ0eSwgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIC8vICB3aWxsIGJlIGNhbGxlZCB3aXRoIGBuZXdWYWx1ZSA9IFwic29tZS12YWx1ZVwiYCBhbmQgd2lsbCBzZXQgdGhlIHNoYWRvd2VkIHByb3BlcnR5ICh0aGlzLnNvbWVBdHRyaWJ1dGUgPSBcImFub3RoZXItdmFsdWVcIilcbiAgICAgICAgICAgICAgICAgICAgLy8gIHRvIHRoZSB2YWx1ZSB0aGF0IHdhcyBzZXQgaW5saW5lIGkuZS4gXCJzb21lLXZhbHVlXCIgZnJvbSBhYm92ZSBleGFtcGxlLiBXaGVuXG4gICAgICAgICAgICAgICAgICAgIC8vICB0aGUgY29ubmVjdGVkQ2FsbGJhY2sgYXR0ZW1wdHMgdG8gdW5zaGFkb3cgaXQgd2lsbCB1c2UgXCJzb21lLXZhbHVlXCIgYXMgdGhlIGluaXRpYWwgdmFsdWUgcmF0aGVyIHRoYW4gXCJhbm90aGVyLXZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gIFRoZSBjYXNlIHdoZXJlIHRoZSBhdHRyaWJ1dGUgd2FzIE5PVCBzZXQgaW5saW5lIGJ1dCB3YXMgbm90IHNldCBwcm9ncmFtbWF0aWNhbGx5IHNoYWxsIGJlIGhhbmRsZWQvdW5zaGFkb3dlZFxuICAgICAgICAgICAgICAgICAgICAvLyAgYnkgY29ubmVjdGVkQ2FsbGJhY2sgYXMgdGhpcyBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgd2lsbCBub3QgZmlyZS5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvd2ViLWNvbXBvbmVudHMvYmVzdC1wcmFjdGljZXMjbGF6eS1wcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICBUT0RPKFNURU5DSUwtMTYpIHdlIHNob3VsZCB0aGluayBhYm91dCB3aGV0aGVyIG9yIG5vdCB3ZSBhY3R1YWxseSB3YW50IHRvIGJlIHJlZmxlY3RpbmcgdGhlIGF0dHJpYnV0ZXMgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gIHByb3BlcnRpZXMgaGVyZSBnaXZlbiB0aGF0IHRoaXMgZ29lcyBhZ2FpbnN0IGJlc3QgcHJhY3RpY2VzIG91dGxpbmVkIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvd2ViLWNvbXBvbmVudHMvYmVzdC1wcmFjdGljZXMjYXZvaWQtcmVlbnRyYW5jeVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpc1twcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1twcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvdG90eXBlLmhhc093blByb3BlcnR5KHByb3BOYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHRoaXNbcHJvcE5hbWVdID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wTmFtZV0gPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wTmFtZSBleGlzdHMgb24gdGhlIHByb3RvdHlwZSBvZiBgQ3N0cmAsIHRoaXMgdXBkYXRlIG1heSBiZSBhIHJlc3VsdCBvZiBTdGVuY2lsIHVzaW5nIG5hdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQVBJcyB0byByZWZsZWN0IHByb3BzIGFzIGF0dHJpYnV0ZXMuIENhbGxzIHRvIGBzZXRBdHRyaWJ1dGUoc29tZUVsZW1lbnQsIHByb3BOYW1lKWAgd2lsbCByZXN1bHQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBwcm9wTmFtZWAgdG8gYmUgY29udmVydGVkIHRvIGEgYERPTVN0cmluZ2AsIHdoaWNoIG1heSBub3QgYmUgd2hhdCB3ZSB3YW50IGZvciBvdGhlciBwcmltaXRpdmUgcHJvcHMuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wTmFtZV0gPSBuZXdWYWx1ZSA9PT0gbnVsbCAmJiB0eXBlb2YgdGhpc1twcm9wTmFtZV0gPT09ICdib29sZWFuJyA/IGZhbHNlIDogbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdG8gb2JzZXJ2ZVxuICAgICAgICAgICAgLy8gYW5kIGFsc28gY3JlYXRlIGEgbWFwIG9mIGh0bWwgYXR0cmlidXRlIG5hbWUgdG8ganMgcHJvcGVydHkgbmFtZVxuICAgICAgICAgICAgQ3N0ci5vYnNlcnZlZEF0dHJpYnV0ZXMgPSBtZW1iZXJzXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW18sIG1dKSA9PiBtWzBdICYgMTUgLyogTUVNQkVSX0ZMQUdTLkhhc0F0dHJpYnV0ZSAqLykgLy8gZmlsdGVyIHRvIG9ubHkga2VlcCBwcm9wcyB0aGF0IHNob3VsZCBtYXRjaCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgLm1hcCgoW3Byb3BOYW1lLCBtXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJOYW1lID0gbVsxXSB8fCBwcm9wTmFtZTtcbiAgICAgICAgICAgICAgICBhdHRyTmFtZVRvUHJvcE5hbWUuc2V0KGF0dHJOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1bMF0gJiA1MTIgLyogTUVNQkVSX0ZMQUdTLlJlZmxlY3RBdHRyICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtcE1ldGEuJGF0dHJzVG9SZWZsZWN0JC5wdXNoKFtwcm9wTmFtZSwgYXR0ck5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF0dHJOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIENzdHI7XG59O1xuY29uc3QgaW5pdGlhbGl6ZUNvbXBvbmVudCA9IGFzeW5jIChlbG0sIGhvc3RSZWYsIGNtcE1ldGEsIGhtclZlcnNpb25JZCwgQ3N0cikgPT4ge1xuICAgIC8vIGluaXRpYWxpemVDb21wb25lbnRcbiAgICBpZiAoKGhvc3RSZWYuJGZsYWdzJCAmIDMyIC8qIEhPU1RfRkxBR1MuaGFzSW5pdGlhbGl6ZWRDb21wb25lbnQgKi8pID09PSAwKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmVuJ3QgaW5pdGlhbGl6ZWQgdGhpcyBlbGVtZW50IHlldFxuICAgICAgICAgICAgaG9zdFJlZi4kZmxhZ3MkIHw9IDMyIC8qIEhPU1RfRkxBR1MuaGFzSW5pdGlhbGl6ZWRDb21wb25lbnQgKi87XG4gICAgICAgICAgICAvLyBsYXp5IGxvYWRlZCBjb21wb25lbnRzXG4gICAgICAgICAgICAvLyByZXF1ZXN0IHRoZSBjb21wb25lbnQncyBpbXBsZW1lbnRhdGlvbiB0byBiZVxuICAgICAgICAgICAgLy8gd2lyZWQgdXAgd2l0aCB0aGUgaG9zdCBlbGVtZW50XG4gICAgICAgICAgICBDc3RyID0gbG9hZE1vZHVsZShjbXBNZXRhKTtcbiAgICAgICAgICAgIGlmIChDc3RyLnRoZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBBd2FpdCBjcmVhdGVzIGEgbWljcm8tdGFzayBhdm9pZCBpZiBwb3NzaWJsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZExvYWQgPSB1bmlxdWVUaW1lKCk7XG4gICAgICAgICAgICAgICAgQ3N0ciA9IGF3YWl0IENzdHI7XG4gICAgICAgICAgICAgICAgZW5kTG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFDc3RyLmlzUHJveGllZCkge1xuICAgICAgICAgICAgICAgIC8vIHdlJ3ZlIG5ldmVyIHByb3hpZWQgdGhpcyBDb25zdHJ1Y3RvciBiZWZvcmVcbiAgICAgICAgICAgICAgICAvLyBsZXQncyBhZGQgdGhlIGdldHRlcnMvc2V0dGVycyB0byBpdHMgcHJvdG90eXBlIGJlZm9yZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCB0aW1lIHdlIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW1wbGVtZW50YXRpb25cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNtcE1ldGEuJHdhdGNoZXJzJCA9IENzdHIud2F0Y2hlcnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb3h5Q29tcG9uZW50KENzdHIsIGNtcE1ldGEsIDIgLyogUFJPWFlfRkxBR1MucHJveHlTdGF0ZSAqLyk7XG4gICAgICAgICAgICAgICAgQ3N0ci5pc1Byb3hpZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZW5kTmV3SW5zdGFuY2UgPSBjcmVhdGVUaW1lKCdjcmVhdGVJbnN0YW5jZScsIGNtcE1ldGEuJHRhZ05hbWUkKTtcbiAgICAgICAgICAgIC8vIG9rLCB0aW1lIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgIC8vIGJ1dCBsZXQncyBrZWVwIHRyYWNrIG9mIHdoZW4gd2Ugc3RhcnQgYW5kIHN0b3BcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgdGhlIGdldHRlcnMvc2V0dGVycyBkb24ndCBpbmNvcnJlY3RseSBzdGVwIG9uIGRhdGFcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBob3N0UmVmLiRmbGFncyQgfD0gOCAvKiBIT1NUX0ZMQUdTLmlzQ29uc3RydWN0aW5nSW5zdGFuY2UgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zdHJ1Y3QgdGhlIGxhenktbG9hZGVkIGNvbXBvbmVudCBpbXBsZW1lbnRhdGlvblxuICAgICAgICAgICAgLy8gcGFzc2luZyB0aGUgaG9zdFJlZiBpcyB2ZXJ5IGltcG9ydGFudCBkdXJpbmdcbiAgICAgICAgICAgIC8vIGNvbnN0cnVjdGlvbiBpbiBvcmRlciB0byBkaXJlY3RseSB3aXJlIHRvZ2V0aGVyIHRoZVxuICAgICAgICAgICAgLy8gaG9zdCBlbGVtZW50IGFuZCB0aGUgbGF6eS1sb2FkZWQgaW5zdGFuY2VcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3IENzdHIoaG9zdFJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGVFcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBob3N0UmVmLiRmbGFncyQgJj0gfjggLyogSE9TVF9GTEFHUy5pc0NvbnN0cnVjdGluZ0luc3RhbmNlICovO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhvc3RSZWYuJGZsYWdzJCB8PSAxMjggLyogSE9TVF9GTEFHUy5pc1dhdGNoUmVhZHkgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmROZXdJbnN0YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDc3RyLnN0eWxlKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGNvbXBvbmVudCBoYXMgc3R5bGVzIGJ1dCB3ZSBoYXZlbid0IHJlZ2lzdGVyZWQgdGhlbSB5ZXRcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IENzdHIuc3R5bGU7XG4gICAgICAgICAgICBjb25zdCBzY29wZUlkID0gZ2V0U2NvcGVJZChjbXBNZXRhKTtcbiAgICAgICAgICAgIGlmICghc3R5bGVzLmhhcyhzY29wZUlkKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZFJlZ2lzdGVyU3R5bGVzID0gY3JlYXRlVGltZSgncmVnaXN0ZXJTdHlsZXMnLCBjbXBNZXRhLiR0YWdOYW1lJCk7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJTdHlsZShzY29wZUlkLCBzdHlsZSwgISEoY21wTWV0YS4kZmxhZ3MkICYgMSAvKiBDTVBfRkxBR1Muc2hhZG93RG9tRW5jYXBzdWxhdGlvbiAqLykpO1xuICAgICAgICAgICAgICAgIGVuZFJlZ2lzdGVyU3R5bGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gd2UndmUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgYSBsYXp5IGluc3RhbmNlXG4gICAgY29uc3QgYW5jZXN0b3JDb21wb25lbnQgPSBob3N0UmVmLiRhbmNlc3RvckNvbXBvbmVudCQ7XG4gICAgY29uc3Qgc2NoZWR1bGUgPSAoKSA9PiBzY2hlZHVsZVVwZGF0ZShob3N0UmVmLCB0cnVlKTtcbiAgICBpZiAoYW5jZXN0b3JDb21wb25lbnQgJiYgYW5jZXN0b3JDb21wb25lbnRbJ3MtcmMnXSkge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIGxvYWQgYW5kIHRoaXMgY29tcG9uZW50IGl0IGhhcyBhbiBhbmNlc3RvciBjb21wb25lbnRcbiAgICAgICAgLy8gYnV0IHRoZSBhbmNlc3RvciBjb21wb25lbnQgaGFzIE5PVCBmaXJlZCBpdHMgd2lsbCB1cGRhdGUgbGlmZWN5Y2xlIHlldFxuICAgICAgICAvLyBzbyBsZXQncyBqdXN0IGNvb2wgb3VyIGpldHMgYW5kIHdhaXQgZm9yIHRoZSBhbmNlc3RvciB0byBjb250aW51ZSBmaXJzdFxuICAgICAgICAvLyB0aGlzIHdpbGwgZ2V0IGZpcmVkIG9mZiB3aGVuIHRoZSBhbmNlc3RvciBjb21wb25lbnRcbiAgICAgICAgLy8gZmluYWxseSBnZXRzIGFyb3VuZCB0byByZW5kZXJpbmcgaXRzIGxhenkgc2VsZlxuICAgICAgICAvLyBmaXJlIG9mZiB0aGUgaW5pdGlhbCB1cGRhdGVcbiAgICAgICAgYW5jZXN0b3JDb21wb25lbnRbJ3MtcmMnXS5wdXNoKHNjaGVkdWxlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNjaGVkdWxlKCk7XG4gICAgfVxufTtcbmNvbnN0IGNvbm5lY3RlZENhbGxiYWNrID0gKGVsbSkgPT4ge1xuICAgIGlmICgocGx0LiRmbGFncyQgJiAxIC8qIFBMQVRGT1JNX0ZMQUdTLmlzVG1wRGlzY29ubmVjdGVkICovKSA9PT0gMCkge1xuICAgICAgICBjb25zdCBob3N0UmVmID0gZ2V0SG9zdFJlZihlbG0pO1xuICAgICAgICBjb25zdCBjbXBNZXRhID0gaG9zdFJlZi4kY21wTWV0YSQ7XG4gICAgICAgIGNvbnN0IGVuZENvbm5lY3RlZCA9IGNyZWF0ZVRpbWUoJ2Nvbm5lY3RlZENhbGxiYWNrJywgY21wTWV0YS4kdGFnTmFtZSQpO1xuICAgICAgICBpZiAoIShob3N0UmVmLiRmbGFncyQgJiAxIC8qIEhPU1RfRkxBR1MuaGFzQ29ubmVjdGVkICovKSkge1xuICAgICAgICAgICAgLy8gZmlyc3QgdGltZSB0aGlzIGNvbXBvbmVudCBoYXMgY29ubmVjdGVkXG4gICAgICAgICAgICBob3N0UmVmLiRmbGFncyQgfD0gMSAvKiBIT1NUX0ZMQUdTLmhhc0Nvbm5lY3RlZCAqLztcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBhbmNlc3RvciBjb21wb25lbnQgKGlmIHRoZXJlIGlzIG9uZSkgYW5kIHJlZ2lzdGVyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgYXMgb25lIG9mIHRoZSBhY3RpdmVseSBsb2FkaW5nIGNoaWxkIGNvbXBvbmVudHMgZm9yIGl0cyBhbmNlc3RvclxuICAgICAgICAgICAgICAgIGxldCBhbmNlc3RvckNvbXBvbmVudCA9IGVsbTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGFuY2VzdG9yQ29tcG9uZW50ID0gYW5jZXN0b3JDb21wb25lbnQucGFyZW50Tm9kZSB8fCBhbmNlc3RvckNvbXBvbmVudC5ob3N0KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbGltYiB1cCB0aGUgYW5jZXN0b3JzIGxvb2tpbmcgZm9yIHRoZSBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wb25lbnQgdGhhdCBoYXNuJ3QgZmluaXNoZWQgaXRzIGxpZmVjeWNsZSB1cGRhdGUgeWV0XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmNlc3RvckNvbXBvbmVudFsncy1wJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGZvdW5kIHRoaXMgY29tcG9uZW50cyBmaXJzdCBhbmNlc3RvciBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhpcyBjb21wb25lbnQncyBhbmNlc3RvciBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaFRvQW5jZXN0b3IoaG9zdFJlZiwgKGhvc3RSZWYuJGFuY2VzdG9yQ29tcG9uZW50JCA9IGFuY2VzdG9yQ29tcG9uZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExhenkgcHJvcGVydGllc1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy93ZWItY29tcG9uZW50cy9iZXN0LXByYWN0aWNlcyNsYXp5LXByb3BlcnRpZXNcbiAgICAgICAgICAgIGlmIChjbXBNZXRhLiRtZW1iZXJzJCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNtcE1ldGEuJG1lbWJlcnMkKS5tYXAoKFttZW1iZXJOYW1lLCBbbWVtYmVyRmxhZ3NdXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVtYmVyRmxhZ3MgJiAzMSAvKiBNRU1CRVJfRkxBR1MuUHJvcCAqLyAmJiBlbG0uaGFzT3duUHJvcGVydHkobWVtYmVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxtW21lbWJlck5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVsbVttZW1iZXJOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsbVttZW1iZXJOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUNvbXBvbmVudChlbG0sIGhvc3RSZWYsIGNtcE1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVuZENvbm5lY3RlZCgpO1xuICAgIH1cbn07XG5jb25zdCBkaXNjb25uZWN0ZWRDYWxsYmFjayA9IChlbG0pID0+IHtcbiAgICBpZiAoKHBsdC4kZmxhZ3MkICYgMSAvKiBQTEFURk9STV9GTEFHUy5pc1RtcERpc2Nvbm5lY3RlZCAqLykgPT09IDApIHtcbiAgICAgICAgZ2V0SG9zdFJlZihlbG0pO1xuICAgIH1cbn07XG5jb25zdCBib290c3RyYXBMYXp5ID0gKGxhenlCdW5kbGVzLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBlbmRCb290c3RyYXAgPSBjcmVhdGVUaW1lKCk7XG4gICAgY29uc3QgY21wVGFncyA9IFtdO1xuICAgIGNvbnN0IGV4Y2x1ZGUgPSBvcHRpb25zLmV4Y2x1ZGUgfHwgW107XG4gICAgY29uc3QgY3VzdG9tRWxlbWVudHMgPSB3aW4uY3VzdG9tRWxlbWVudHM7XG4gICAgY29uc3QgaGVhZCA9IGRvYy5oZWFkO1xuICAgIGNvbnN0IG1ldGFDaGFyc2V0ID0gLypAX19QVVJFX18qLyBoZWFkLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbY2hhcnNldF0nKTtcbiAgICBjb25zdCB2aXNpYmlsaXR5U3R5bGUgPSAvKkBfX1BVUkVfXyovIGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNvbnN0IGRlZmVycmVkQ29ubmVjdGVkQ2FsbGJhY2tzID0gW107XG4gICAgbGV0IGFwcExvYWRGYWxsYmFjaztcbiAgICBsZXQgaXNCb290c3RyYXBwaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuYXNzaWduKHBsdCwgb3B0aW9ucyk7XG4gICAgcGx0LiRyZXNvdXJjZXNVcmwkID0gbmV3IFVSTChvcHRpb25zLnJlc291cmNlc1VybCB8fCAnLi8nLCBkb2MuYmFzZVVSSSkuaHJlZjtcbiAgICBsYXp5QnVuZGxlcy5tYXAoKGxhenlCdW5kbGUpID0+IHtcbiAgICAgICAgbGF6eUJ1bmRsZVsxXS5tYXAoKGNvbXBhY3RNZXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbXBNZXRhID0ge1xuICAgICAgICAgICAgICAgICRmbGFncyQ6IGNvbXBhY3RNZXRhWzBdLFxuICAgICAgICAgICAgICAgICR0YWdOYW1lJDogY29tcGFjdE1ldGFbMV0sXG4gICAgICAgICAgICAgICAgJG1lbWJlcnMkOiBjb21wYWN0TWV0YVsyXSxcbiAgICAgICAgICAgICAgICAkbGlzdGVuZXJzJDogY29tcGFjdE1ldGFbM10sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNtcE1ldGEuJG1lbWJlcnMkID0gY29tcGFjdE1ldGFbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY21wTWV0YS4kYXR0cnNUb1JlZmxlY3QkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY21wTWV0YS4kd2F0Y2hlcnMkID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gY21wTWV0YS4kdGFnTmFtZSQ7XG4gICAgICAgICAgICBjb25zdCBIb3N0RWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICAgICAgICAgIC8vIFN0ZW5jaWxMYXp5SG9zdFxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHNlbGYpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVySG9zdChzZWxmLCBjbXBNZXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNtcE1ldGEuJGZsYWdzJCAmIDEgLyogQ01QX0ZMQUdTLnNoYWRvd0RvbUVuY2Fwc3VsYXRpb24gKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgY29tcG9uZW50IGlzIHVzaW5nIHNoYWRvdyBkb21cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgc2hhZG93IGRvbVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZWFkLW9ubHkgcHJvcGVydHkgXCJzaGFkb3dSb290XCIgdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSBzaGFkb3cgcm9vdCBidWlsZCBjb25kaXRpb25hbHMgdG8gbWluaW1pemUgcnVudGltZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBwTG9hZEZhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYXBwTG9hZEZhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcExvYWRGYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQm9vdHN0cmFwcGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ubmVjdGVkQ2FsbGJhY2sgd2lsbCBiZSBwcm9jZXNzZWQgb25jZSBhbGwgY29tcG9uZW50cyBoYXZlIGJlZW4gcmVnaXN0ZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRDb25uZWN0ZWRDYWxsYmFja3MucHVzaCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdC5qbXAoKCkgPT4gY29ubmVjdGVkQ2FsbGJhY2sodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgICAgICAgICBwbHQuam1wKCgpID0+IGRpc2Nvbm5lY3RlZENhbGxiYWNrKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29tcG9uZW50T25SZWFkeSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEhvc3RSZWYodGhpcykuJG9uUmVhZHlQcm9taXNlJDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY21wTWV0YS4kbGF6eUJ1bmRsZUlkJCA9IGxhenlCdW5kbGVbMF07XG4gICAgICAgICAgICBpZiAoIWV4Y2x1ZGUuaW5jbHVkZXModGFnTmFtZSkgJiYgIWN1c3RvbUVsZW1lbnRzLmdldCh0YWdOYW1lKSkge1xuICAgICAgICAgICAgICAgIGNtcFRhZ3MucHVzaCh0YWdOYW1lKTtcbiAgICAgICAgICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUodGFnTmFtZSwgcHJveHlDb21wb25lbnQoSG9zdEVsZW1lbnQsIGNtcE1ldGEsIDEgLyogUFJPWFlfRkxBR1MuaXNFbGVtZW50Q29uc3RydWN0b3IgKi8pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAge1xuICAgICAgICB2aXNpYmlsaXR5U3R5bGUuaW5uZXJIVE1MID0gY21wVGFncyArIEhZRFJBVEVEX0NTUztcbiAgICAgICAgdmlzaWJpbGl0eVN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdHlsZXMnLCAnJyk7XG4gICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHZpc2liaWxpdHlTdHlsZSwgbWV0YUNoYXJzZXQgPyBtZXRhQ2hhcnNldC5uZXh0U2libGluZyA6IGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIC8vIFByb2Nlc3MgZGVmZXJyZWQgY29ubmVjdGVkQ2FsbGJhY2tzIG5vdyBhbGwgY29tcG9uZW50cyBoYXZlIGJlZW4gcmVnaXN0ZXJlZFxuICAgIGlzQm9vdHN0cmFwcGluZyA9IGZhbHNlO1xuICAgIGlmIChkZWZlcnJlZENvbm5lY3RlZENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZGVmZXJyZWRDb25uZWN0ZWRDYWxsYmFja3MubWFwKChob3N0KSA9PiBob3N0LmNvbm5lY3RlZENhbGxiYWNrKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAge1xuICAgICAgICAgICAgcGx0LmptcCgoKSA9PiAoYXBwTG9hZEZhbGxiYWNrID0gc2V0VGltZW91dChhcHBEaWRMb2FkLCAzMCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBGYWxsYmFjayBhcHBMb2FkIGV2ZW50XG4gICAgZW5kQm9vdHN0cmFwKCk7XG59O1xuY29uc3QgaG9zdFJlZnMgPSAvKkBfX1BVUkVfXyovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBnZXRIb3N0UmVmID0gKHJlZikgPT4gaG9zdFJlZnMuZ2V0KHJlZik7XG5jb25zdCByZWdpc3Rlckluc3RhbmNlID0gKGxhenlJbnN0YW5jZSwgaG9zdFJlZikgPT4gaG9zdFJlZnMuc2V0KChob3N0UmVmLiRsYXp5SW5zdGFuY2UkID0gbGF6eUluc3RhbmNlKSwgaG9zdFJlZik7XG5jb25zdCByZWdpc3Rlckhvc3QgPSAoZWxtLCBjbXBNZXRhKSA9PiB7XG4gICAgY29uc3QgaG9zdFJlZiA9IHtcbiAgICAgICAgJGZsYWdzJDogMCxcbiAgICAgICAgJGhvc3RFbGVtZW50JDogZWxtLFxuICAgICAgICAkY21wTWV0YSQ6IGNtcE1ldGEsXG4gICAgICAgICRpbnN0YW5jZVZhbHVlcyQ6IG5ldyBNYXAoKSxcbiAgICB9O1xuICAgIHtcbiAgICAgICAgaG9zdFJlZi4kb25JbnN0YW5jZVByb21pc2UkID0gbmV3IFByb21pc2UoKHIpID0+IChob3N0UmVmLiRvbkluc3RhbmNlUmVzb2x2ZSQgPSByKSk7XG4gICAgfVxuICAgIHtcbiAgICAgICAgaG9zdFJlZi4kb25SZWFkeVByb21pc2UkID0gbmV3IFByb21pc2UoKHIpID0+IChob3N0UmVmLiRvblJlYWR5UmVzb2x2ZSQgPSByKSk7XG4gICAgICAgIGVsbVsncy1wJ10gPSBbXTtcbiAgICAgICAgZWxtWydzLXJjJ10gPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGhvc3RSZWZzLnNldChlbG0sIGhvc3RSZWYpO1xufTtcbmNvbnN0IGlzTWVtYmVySW5FbGVtZW50ID0gKGVsbSwgbWVtYmVyTmFtZSkgPT4gbWVtYmVyTmFtZSBpbiBlbG07XG5jb25zdCBjb25zb2xlRXJyb3IgPSAoZSwgZWwpID0+ICgwLCBjb25zb2xlLmVycm9yKShlLCBlbCk7XG5jb25zdCBjbXBNb2R1bGVzID0gLypAX19QVVJFX18qLyBuZXcgTWFwKCk7XG5jb25zdCBsb2FkTW9kdWxlID0gKGNtcE1ldGEsIGhvc3RSZWYsIGhtclZlcnNpb25JZCkgPT4ge1xuICAgIC8vIGxvYWRNb2R1bGVJbXBvcnRcbiAgICBjb25zdCBleHBvcnROYW1lID0gY21wTWV0YS4kdGFnTmFtZSQucmVwbGFjZSgvLS9nLCAnXycpO1xuICAgIGNvbnN0IGJ1bmRsZUlkID0gY21wTWV0YS4kbGF6eUJ1bmRsZUlkJDtcbiAgICBjb25zdCBtb2R1bGUgPSBjbXBNb2R1bGVzLmdldChidW5kbGVJZCkgO1xuICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZVtleHBvcnROYW1lXTtcbiAgICB9XG4gICAgLyohX19TVEVOQ0lMX1NUQVRJQ19JTVBPUlRfU1dJVENIX18qL1xuICAgIHJldHVybiBpbXBvcnQoXG4gICAgLyogQHZpdGUtaWdub3JlICovXG4gICAgLyogd2VicGFja0luY2x1ZGU6IC9cXC5lbnRyeVxcLmpzJC8gKi9cbiAgICAvKiB3ZWJwYWNrRXhjbHVkZTogL1xcLnN5c3RlbVxcLmVudHJ5XFwuanMkLyAqL1xuICAgIC8qIHdlYnBhY2tNb2RlOiBcImxhenlcIiAqL1xuICAgIGAuLyR7YnVuZGxlSWR9LmVudHJ5LmpzJHsnJ31gKS50aGVuKChpbXBvcnRlZE1vZHVsZSkgPT4ge1xuICAgICAgICB7XG4gICAgICAgICAgICBjbXBNb2R1bGVzLnNldChidW5kbGVJZCwgaW1wb3J0ZWRNb2R1bGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbXBvcnRlZE1vZHVsZVtleHBvcnROYW1lXTtcbiAgICB9LCBjb25zb2xlRXJyb3IpO1xufTtcbmNvbnN0IHN0eWxlcyA9IC8qQF9fUFVSRV9fKi8gbmV3IE1hcCgpO1xuY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fTtcbmNvbnN0IGRvYyA9IHdpbi5kb2N1bWVudCB8fCB7IGhlYWQ6IHt9IH07XG5jb25zdCBwbHQgPSB7XG4gICAgJGZsYWdzJDogMCxcbiAgICAkcmVzb3VyY2VzVXJsJDogJycsXG4gICAgam1wOiAoaCkgPT4gaCgpLFxuICAgIHJhZjogKGgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShoKSxcbiAgICBhZWw6IChlbCwgZXZlbnROYW1lLCBsaXN0ZW5lciwgb3B0cykgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRzKSxcbiAgICByZWw6IChlbCwgZXZlbnROYW1lLCBsaXN0ZW5lciwgb3B0cykgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRzKSxcbiAgICBjZTogKGV2ZW50TmFtZSwgb3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgb3B0cyksXG59O1xuY29uc3QgcHJvbWlzZVJlc29sdmUgPSAodikgPT4gUHJvbWlzZS5yZXNvbHZlKHYpO1xuY29uc3Qgc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMgPSAvKkBfX1BVUkVfXyovICgoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBuZXcgQ1NTU3R5bGVTaGVldCgpO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBuZXcgQ1NTU3R5bGVTaGVldCgpLnJlcGxhY2VTeW5jID09PSAnZnVuY3Rpb24nO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKClcbiAgICA7XG5jb25zdCBxdWV1ZURvbVJlYWRzID0gW107XG5jb25zdCBxdWV1ZURvbVdyaXRlcyA9IFtdO1xuY29uc3QgcXVldWVUYXNrID0gKHF1ZXVlLCB3cml0ZSkgPT4gKGNiKSA9PiB7XG4gICAgcXVldWUucHVzaChjYik7XG4gICAgaWYgKCFxdWV1ZVBlbmRpbmcpIHtcbiAgICAgICAgcXVldWVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHdyaXRlICYmIHBsdC4kZmxhZ3MkICYgNCAvKiBQTEFURk9STV9GTEFHUy5xdWV1ZVN5bmMgKi8pIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZsdXNoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBsdC5yYWYoZmx1c2gpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGNvbnN1bWUgPSAocXVldWUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBxdWV1ZVtpXShwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGVFcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xufTtcbmNvbnN0IGZsdXNoID0gKCkgPT4ge1xuICAgIC8vIGFsd2F5cyBmb3JjZSBhIGJ1bmNoIG9mIG1lZGl1bSBjYWxsYmFja3MgdG8gcnVuLCBidXQgc3RpbGwgaGF2ZVxuICAgIC8vIGEgdGhyb3R0bGUgb24gaG93IG1hbnkgY2FuIHJ1biBpbiBhIGNlcnRhaW4gdGltZVxuICAgIC8vIERPTSBSRUFEUyEhIVxuICAgIGNvbnN1bWUocXVldWVEb21SZWFkcyk7XG4gICAgLy8gRE9NIFdSSVRFUyEhIVxuICAgIHtcbiAgICAgICAgY29uc3VtZShxdWV1ZURvbVdyaXRlcyk7XG4gICAgICAgIGlmICgocXVldWVQZW5kaW5nID0gcXVldWVEb21SZWFkcy5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgLy8gc3RpbGwgbW9yZSB0byBkbyB5ZXQsIGJ1dCB3ZSd2ZSBydW4gb3V0IG9mIHRpbWVcbiAgICAgICAgICAgIC8vIGxldCdzIGxldCB0aGlzIHRoaW5nIGNvb2wgb2ZmIGFuZCB0cnkgYWdhaW4gaW4gdGhlIG5leHQgdGlja1xuICAgICAgICAgICAgcGx0LnJhZihmbHVzaCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgbmV4dFRpY2sgPSAvKkBfX1BVUkVfXyovIChjYikgPT4gcHJvbWlzZVJlc29sdmUoKS50aGVuKGNiKTtcbmNvbnN0IHdyaXRlVGFzayA9IC8qQF9fUFVSRV9fKi8gcXVldWVUYXNrKHF1ZXVlRG9tV3JpdGVzLCB0cnVlKTtcblxuZXhwb3J0IHsgYm9vdHN0cmFwTGF6eSBhcyBiLCBjcmVhdGVFdmVudCBhcyBjLCBwcm9taXNlUmVzb2x2ZSBhcyBwLCByZWdpc3Rlckluc3RhbmNlIGFzIHIgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgtZWZmZjY5ZjguanMubWFwIiwiaW1wb3J0IHsgcCBhcyBwcm9taXNlUmVzb2x2ZSwgYiBhcyBib290c3RyYXBMYXp5IH0gZnJvbSAnLi9pbmRleC1lZmZmNjlmOC5qcyc7XG5cbi8qXG4gU3RlbmNpbCBDbGllbnQgUGF0Y2ggRXNtIHYyLjIwLjAgfCBNSVQgTGljZW5zZWQgfCBodHRwczovL3N0ZW5jaWxqcy5jb21cbiAqL1xuY29uc3QgcGF0Y2hFc20gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKCk7XG59O1xuXG5jb25zdCBkZWZpbmVDdXN0b21FbGVtZW50cyA9ICh3aW4sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIHJldHVybiBwYXRjaEVzbSgpLnRoZW4oKCkgPT4ge1xuICByZXR1cm4gYm9vdHN0cmFwTGF6eShbW1wiamVlcC1zcWxpdGVcIixbWzEsXCJqZWVwLXNxbGl0ZVwiLHtcImF1dG9TYXZlXCI6WzUxNixcImF1dG9zYXZlXCJdLFwid2FzbVBhdGhcIjpbNTEzLFwid2FzbXBhdGhcIl0sXCJpbm5lckF1dG9TYXZlXCI6WzMyXSxcImlubmVyV2FzbVBhdGhcIjpbMzJdLFwiZWNob1wiOls2NF0sXCJjcmVhdGVDb25uZWN0aW9uXCI6WzY0XSxcImlzQ29ubmVjdGlvblwiOls2NF0sXCJjbG9zZUNvbm5lY3Rpb25cIjpbNjRdLFwib3BlblwiOls2NF0sXCJjbG9zZVwiOls2NF0sXCJnZXRWZXJzaW9uXCI6WzY0XSxcImV4ZWN1dGVcIjpbNjRdLFwiZXhlY3V0ZVNldFwiOls2NF0sXCJydW5cIjpbNjRdLFwicXVlcnlcIjpbNjRdLFwiZ2V0VGFibGVMaXN0XCI6WzY0XSxcImlzREJFeGlzdHNcIjpbNjRdLFwiaXNEQk9wZW5cIjpbNjRdLFwiZGVsZXRlRGF0YWJhc2VcIjpbNjRdLFwiaXNTdG9yZU9wZW5cIjpbNjRdLFwiY29weUZyb21Bc3NldHNcIjpbNjRdLFwiaXNUYWJsZUV4aXN0c1wiOls2NF0sXCJjcmVhdGVTeW5jVGFibGVcIjpbNjRdLFwiZ2V0U3luY0RhdGVcIjpbNjRdLFwic2V0U3luY0RhdGVcIjpbNjRdLFwiaXNKc29uVmFsaWRcIjpbNjRdLFwiaW1wb3J0RnJvbUpzb25cIjpbNjRdLFwiZXhwb3J0VG9Kc29uXCI6WzY0XSxcImRlbGV0ZUV4cG9ydGVkUm93c1wiOls2NF0sXCJhZGRVcGdyYWRlU3RhdGVtZW50XCI6WzY0XSxcImlzRGF0YWJhc2VcIjpbNjRdLFwiZ2V0RGF0YWJhc2VMaXN0XCI6WzY0XSxcImNoZWNrQ29ubmVjdGlvbnNDb25zaXN0ZW5jeVwiOls2NF0sXCJzYXZlVG9TdG9yZVwiOls2NF0sXCJnZXRGcm9tSFRUUFJlcXVlc3RcIjpbNjRdfV1dXV0sIG9wdGlvbnMpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnRzIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvYWRlci5qcy5tYXAiLCJcbihmdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZ2b2lkIDAhPT13aW5kb3cuUmVmbGVjdCYmdm9pZCAwIT09d2luZG93LmN1c3RvbUVsZW1lbnRzKXt2YXIgYT1IVE1MRWxlbWVudDt3aW5kb3cuSFRNTEVsZW1lbnQ9ZnVuY3Rpb24oKXtyZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoYSxbXSx0aGlzLmNvbnN0cnVjdG9yKX07SFRNTEVsZW1lbnQucHJvdG90eXBlPWEucHJvdG90eXBlO0hUTUxFbGVtZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1IVE1MRWxlbWVudDtPYmplY3Quc2V0UHJvdG90eXBlT2YoSFRNTEVsZW1lbnQsYSl9fSkoKTtcbmV4cG9ydCAqIGZyb20gJy4uL2Rpc3QvZXNtL3BvbHlmaWxscy9pbmRleC5qcyc7XG5leHBvcnQgKiBmcm9tICcuLi9kaXN0L2VzbS9sb2FkZXIuanMnO1xuIiwiLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuZXhwb3J0IGNvbnN0IGRhdGFUb0ltcG9ydDogYW55ID0ge1xuXHRkYXRhYmFzZTogJ2Vhc3lfY29tcHRhJyxcblx0dmVyc2lvbjogOSxcblx0ZW5jcnlwdGVkOiBmYWxzZSxcblx0b3ZlcndyaXRlOiBmYWxzZSwgXG5cdG1vZGU6ICdwYXJ0aWFsJyxcblx0dGFibGVzOiBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2NvbW1hbmRlJyxcblx0XHRcdHNjaGVtYTogW1xuXHRcdFx0XHR7IGNvbHVtbjogJ29yZGVySWQnLCB2YWx1ZTogJ0lOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdjb250ZW51QWRkaXRpb25uZWwnLCB2YWx1ZTogJ1RFWFQgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3ByaWNlSHQnLCB2YWx1ZTogJ1JFQUwgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2ZhY3R1cmVJZCcsIHZhbHVlOiAnSU5URUdFUiBERUZBVUxUIE5VTEwnIH0sXG5cdFx0XHRcdHsgZm9yZWlnbmtleTogJ2ZhY3R1cmVJZCcsIHZhbHVlOiAnUkVGRVJFTkNFUyBmYWN0dXJlKGZhY3R1cmVJZCkgT04gREVMRVRFIFNFVCBOVUxMIE9OIFVQREFURSBDQVNDQURFJyB9XG5cdFx0XHRdLFxuXHRcdFx0aW5kZXhlczogW1xuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9jb21tYW5kZV9vcmRlcklkJywgdmFsdWU6ICdvcmRlcklkJyB9LFxuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9jb21tYW5kZV9mYWN0dXJlSWQnLCB2YWx1ZTogJ2ZhY3R1cmVJZCcgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3Byb2R1aXRzZXJ2aWNlJyxcblx0XHRcdHNjaGVtYTogW1xuXHRcdFx0XHR7IGNvbHVtbjogJ3NlcnZpY2VJZCcsIHZhbHVlOiAnSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5UIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ21vbnRhbnRIdCcsIHZhbHVlOiAnUkVBTCBERUZBVUxUIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnbm9tJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3F1YW50aXRlJywgdmFsdWU6ICdJTlRFR0VSIE5PVCBOVUxMJyB9XG5cdFx0XHRdLFxuXHRcdFx0aW5kZXhlczogW1xuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9wcm9kdWl0c2VydmljZV9zZXJ2aWNlSWQnLCB2YWx1ZTogJ3NlcnZpY2VJZCcgfVxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdjb250YWlucycsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdvcmRlcklkJywgdmFsdWU6ICdJTlRFR0VSIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3NlcnZpY2VJZCcsIHZhbHVlOiAnSU5URUdFUiBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBmb3JlaWdua2V5OiAnb3JkZXJJZCcsIHZhbHVlOiAnUkVGRVJFTkNFUyBjb21tYW5kZShvcmRlcklkKSBPTiBERUxFVEUgQ0FTQ0FERSBPTiBVUERBVEUgQ0FTQ0FERScgfSxcblx0XHRcdFx0eyBmb3JlaWdua2V5OiAnc2VydmljZUlkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIHByb2R1aXRzZXJ2aWNlKHNlcnZpY2VJZCkgT04gREVMRVRFIENBU0NBREUgT04gVVBEQVRFIENBU0NBREUnIH1cblx0XHRcdF0sXG5cdFx0XHRpbmRleGVzOiBbXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2NvbnRhaW5zX3NlcnZpY2VJZF9vcmRlcklkX3VuaXF1ZScsIHZhbHVlOiAnb3JkZXJJZCwgc2VydmljZUlkJywgbW9kZTogJ1VOSVFVRScgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2RldmlzZScsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdkZXZpc2VJZCcsIHZhbHVlOiAnSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5UIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3N5bWJvbGUnLCB2YWx1ZTogJ1RFWFQgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xpYmVsbGUnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH1cblx0XHRcdF0sXG5cdFx0XHRpbmRleGVzOiBbXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2RldmlzZV9kZXZpc2VJZCcsIHZhbHVlOiAnZGV2aXNlSWQnIH1cblx0XHRcdF0sXG5cdFx0XHR2YWx1ZXM6IFtcblx0XHRcdFx0WzEsICckJywgJ2RvbGxhciddLFxuXHRcdFx0XHRbMiwgJ8KjJywgJ2xpdnJlJ10sXG5cdFx0XHRcdFszLCAn4oKsJywgJ2V1cm8nXVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ2xhbmd1ZScsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdsYW5ndWVJZCcsIHZhbHVlOiAnSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5UIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xpYmVsbGUnLCB2YWx1ZTogJ1RFWFQgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ25vbScsIHZhbHVlOiAnVEVYVCBERUZBVUxUIE5VTEwnIH1cblx0XHRcdF0sXG5cdFx0XHRpbmRleGVzOiBbXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2xhbmd1ZV9sYW5ndWVJZCcsIHZhbHVlOiAnbGFuZ3VlSWQnIH1cblx0XHRcdF0sXG5cdFx0XHR2YWx1ZXM6IFtcblx0XHRcdFx0WzEsICdFbmdsaXNoJywgJ2VuLVVTJ10sXG5cdFx0XHRcdFsyLCAnRnJhbsOnYWlzJywgJ2ZyLUZSJ11cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdwZXJzb25uZScsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdhY3RvcklkJywgdmFsdWU6ICdJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnY3AnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnZW1haWwnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnbm9tJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ25vbVJ1ZScsIHZhbHVlOiAnVEVYVCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdudW1Db21tZXJjYW50JywgdmFsdWU6ICdURVhUIERFRkFVTFQgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdudW1SdWUnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAncHJlbm9tJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3RlbCcsIHZhbHVlOiAnVEVYVCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdhY3RvclR5cGVJZCcsIHZhbHVlOiAnSU5URUdFUiBERUZBVUxUIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAndmlsbGUnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgZm9yZWlnbmtleTogJ2FjdG9yVHlwZUlkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIHBlcnNvbm5lX3R5cGUoYWN0b3JUeXBlSWQpIE9OIERFTEVURSBTRVQgTlVMTCBPTiBVUERBVEUgQ0FTQ0FERScgfVxuXHRcdFx0XSxcblx0XHRcdGluZGV4ZXM6IFtcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfcGVyc29ubmVfYWN0b3JJZCcsIHZhbHVlOiAnYWN0b3JJZCcgfSxcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfcGVyc29ubmVfZW1haWxfdW5pcXVlJywgdmFsdWU6ICdlbWFpbCcsIG1vZGU6ICdVTklRVUUnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X3BlcnNvbm5lX2FjdG9yVHlwZUlkJywgdmFsdWU6ICdhY3RvclR5cGVJZCcgfVxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdwZXJzb25uZV90eXBlJyxcblx0XHRcdHNjaGVtYTogW1xuXHRcdFx0XHR7IGNvbHVtbjogJ2FjdG9yVHlwZUlkJywgdmFsdWU6ICdJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnc2VsbGVyJywgdmFsdWU6ICdCT09MRUFOIERFRkFVTFQgMCBDSEVDSyAoc2VsbGVyIElOICgwLCAxKSknIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnYnV5ZXInLCB2YWx1ZTogJ0JPT0xFQU4gREVGQVVMVCAwIENIRUNLIChidXllciBJTiAoMCwgMSkpJyB9LFxuXHRcdFx0XSxcblx0XHRcdGluZGV4ZXM6IFtcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfcGVyc29ubmVfdHlwZV9hY3RvclR5cGVJZCcsIHZhbHVlOiAnYWN0b3JUeXBlSWQnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X3BlcnNvbm5lX3R5cGVfY29uc3RyYWludCcsIHZhbHVlOiAnc2VsbGVyLCBidXllcicsIG1vZGU6ICdVTklRVUUnIH1cblx0XHRcdF0sXG5cdFx0XHR2YWx1ZXM6IFtcblx0XHRcdFx0WzEsIDEsIDFdLFxuXHRcdFx0XHRbMiwgMSwgMF0sXG5cdFx0XHRcdFszLCAwLCAxXSxcblx0XHRcdF0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnZmFjdHVyZScsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdmYWN0dXJlSWQnLCB2YWx1ZTogJ0lOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdkYXRlJywgdmFsdWU6ICdURVhUIERFRkFVTFQgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdpbnZvaWNlSFRQcmljZScsIHZhbHVlOiAnUkVBTCBERUZBVUxUIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnaW52b2ljZVRUUHJpY2UnLCB2YWx1ZTogJ1JFQUwgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xhbmd1YWdlSWQnLCB2YWx1ZTogJ0lOVEVHRVIgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2RldmlzZUlkJywgdmFsdWU6ICdJTlRFR0VSIERFRkFVTFQgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICd0dmFWYWx1ZScsIHZhbHVlOiAnUkVBTCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdidXllcklkJywgdmFsdWU6ICdJTlRFR0VSIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3NlbGxlcklkJywgdmFsdWU6ICdJTlRFR0VSIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2FkbWluaXN0cmF0b3JJZCcsIHZhbHVlOiAnSU5URUdFUiBERUZBVUxUIE5VTEwnIH0sXG5cdFx0XHRcdHsgZm9yZWlnbmtleTogJ2xhbmd1YWdlSWQnLCB2YWx1ZTogJ1JFRkVSRU5DRVMgbGFuZ3VlKGxhbmd1ZUlkKSBPTiBERUxFVEUgU0VUIE5VTEwgT04gVVBEQVRFIENBU0NBREUnIH0sXG5cdFx0XHRcdHsgZm9yZWlnbmtleTogJ2RldmlzZUlkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIGRldmlzZShkZXZpc2VJZCkgT04gREVMRVRFIFNFVCBOVUxMIE9OIFVQREFURSBDQVNDQURFJyB9LFxuXHRcdFx0XHR7IGZvcmVpZ25rZXk6ICdidXllcklkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIHBlcnNvbm5lKGFjdG9ySWQpIE9OIERFTEVURSBDQVNDQURFIE9OIFVQREFURSBDQVNDQURFJyB9LFxuXHRcdFx0XHR7IGZvcmVpZ25rZXk6ICdzZWxsZXJJZCcsIHZhbHVlOiAnUkVGRVJFTkNFUyBwZXJzb25uZShhY3RvcklkKSBPTiBERUxFVEUgQ0FTQ0FERSBPTiBVUERBVEUgQ0FTQ0FERScgfSxcblx0XHRcdFx0eyBmb3JlaWdua2V5OiAnYWRtaW5pc3RyYXRvcklkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIHVzZXIodXNlcklkKSBPTiBERUxFVEUgU0VUIE5VTEwgT04gVVBEQVRFIENBU0NBREUnIH0sXG5cdFx0XHRdLFxuXHRcdFx0aW5kZXhlczogW1xuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9mYWN0dXJlX2ZhY3R1cklkJywgdmFsdWU6ICdmYWN0dXJlSWQnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2ZhY3R1cmVfbGFuZ3VhZ2VJZCcsIHZhbHVlOiAnbGFuZ3VhZ2VJZCcgfSxcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfZmFjdHVyZV9kZXZpc2VJZCcsIHZhbHVlOiAnZGV2aXNlSWQnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2ZhY3R1cmVfYnV5ZXJJZCcsIHZhbHVlOiAnYnV5ZXJJZCcgfSxcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfZmFjdHVyZV9zZWxsZXJJZCcsIHZhbHVlOiAnc2VsbGVySWQnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X2ZhY3R1cmVfYWRtaW5pc3RyYXRvcklkJywgdmFsdWU6ICdhZG1pbmlzdHJhdG9ySWQnIH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3VzZXInLFxuXHRcdFx0c2NoZW1hOiBbXG5cdFx0XHRcdHsgY29sdW1uOiAndXNlcklkJywgdmFsdWU6ICdJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnZmlyc3ROYW1lJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xhc3ROYW1lJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xvZ2luJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2VtYWlsJywgdmFsdWU6ICdURVhUIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3Bhc3MnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnY29tcGFueU5hbWUnLCB2YWx1ZTogJ1RFWFQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnY29tcGFueUxvZ28nLCB2YWx1ZTogJ1RFWFQgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2RldmlzZUlkJywgdmFsdWU6ICdJTlRFR0VSIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3VzZXJUeXBlSWQnLCB2YWx1ZTogJ0lOVEVHRVIgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGZvcmVpZ25rZXk6ICdkZXZpc2VJZCcsIHZhbHVlOiAnUkVGRVJFTkNFUyBkZXZpc2UoZGV2aXNlSWQpIE9OIFVQREFURSBDQVNDQURFJyB9LFxuXHRcdFx0XHR7IGZvcmVpZ25rZXk6ICd1c2VyVHlwZUlkJywgdmFsdWU6ICdSRUZFUkVOQ0VTIHVzZXJfdHlwZSh1c2VyVHlwZUlkKSBPTiBERUxFVEUgU0VUIE5VTEwgT04gVVBEQVRFIENBU0NBREUnIH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3VzZXJfdHlwZScsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICd1c2VyVHlwZUlkJywgdmFsdWU6ICdJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAncmVndWxhcicsIHZhbHVlOiAnQk9PTEVBTiBERUZBVUxUIDAgQ0hFQ0sgKHJlZ3VsYXIgSU4gKDAsIDEpKScgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdhZG1pbicsIHZhbHVlOiAnQk9PTEVBTiBERUZBVUxUIDAgQ0hFQ0sgKGFkbWluIElOICgwLCAxKSknIH0sXG5cdFx0XHRdLFxuXHRcdFx0aW5kZXhlczogW1xuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF91c2VyVHlwZV91c2VyVHlwZUlkJywgdmFsdWU6ICd1c2VyVHlwZUlkJyB9LFxuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF91c2VyX3R5cGVfY29uc3RyYWludCcsIHZhbHVlOiAncmVndWxhciwgYWRtaW4nLCBtb2RlOiAnVU5JUVVFJyB9XG5cdFx0XHRdLFxuXHRcdFx0dmFsdWVzOiBbXG5cdFx0XHRcdFsxLCAxLCAwXSxcblx0XHRcdFx0WzIsIDAsIDFdLFxuXHRcdFx0XHRbMywgMSwgMV1cblx0XHRcdF0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAncGF5bWVudCcsXG5cdFx0XHRzY2hlbWE6IFtcblx0XHRcdFx0eyBjb2x1bW46ICdwYXltZW50SWQnLCB2YWx1ZTogJ0lOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdldGF0JywgdmFsdWU6ICdCT09MRUFOIERFRkFVTFQgMCBDSEVDSyAoZXRhdCBJTiAoMCwgMSkpJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ3BheW1lbnRWYWx1ZScsIHZhbHVlOiAnUkVBTCBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdwYXltZW50VHlwZScsIHZhbHVlOiAnSU5URUdFUiBOT1QgTlVMTCcgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdmYWN0dXJlSWQnLCB2YWx1ZTogJ0lOVEVHRVIgREVGQVVMVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGZvcmVpZ25rZXk6ICdwYXltZW50VHlwZScsIHZhbHVlOiAnUkVGRVJFTkNFUyBwYXltZW50X3R5cGUocGF5bWVudFR5cGVJZCkgT04gREVMRVRFIENBU0NBREUgT04gVVBEQVRFIENBU0NBREUnIH0sXG5cdFx0XHRcdHsgZm9yZWlnbmtleTogJ2ZhY3R1cmVJZCcsIHZhbHVlOiAnUkVGRVJFTkNFUyBmYWN0dXJlKGZhY3R1cmVJZCkgT04gREVMRVRFIENBU0NBREUgT04gVVBEQVRFIENBU0NBREUnIH1cblx0XHRcdF0sXG5cdFx0XHRpbmRleGVzOiBbXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X3BheW1lbnRfcGF5bWVudElkJywgdmFsdWU6ICdwYXltZW50SWQnIH0sXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X3BheW1lbnRfcGF5bWVudFR5cGUnLCB2YWx1ZTogJ3BheW1lbnRUeXBlJyB9LFxuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9wYXltZW50X2ZhY3R1cmVJZCcsIHZhbHVlOiAnZmFjdHVyZUlkJyB9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdwYXltZW50X3R5cGUnLFxuXHRcdFx0c2NoZW1hOiBbXG5cdFx0XHRcdHsgY29sdW1uOiAncGF5bWVudFR5cGVJZCcsIHZhbHVlOiAnSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5UIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2NiJywgdmFsdWU6ICdCT09MRUFOIERFRkFVTFQgMCBDSEVDSyAoY2IgSU4gKDAsIDEpKScgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdlc3AnLCB2YWx1ZTogJ0JPT0xFQU4gREVGQVVMVCAwIENIRUNLIChlc3AgSU4gKDAsIDEpKScgfSxcblx0XHRcdFx0eyBjb2x1bW46ICdjaHEnLCB2YWx1ZTogJ0JPT0xFQU4gREVGQVVMVCAwIENIRUNLIChjaHEgSU4gKDAsIDEpKScgfSxcblx0XHRcdF0sXG5cdFx0XHRpbmRleGVzOiBbXG5cdFx0XHRcdHsgbmFtZTogJ2luZGV4X3BheW1lbnRfdHlwZV9wYXltZW50VHlwZUlkJywgdmFsdWU6ICdwYXltZW50VHlwZUlkJyB9LFxuXHRcdFx0XHR7IG5hbWU6ICdpbmRleF9wYXltZW50X3R5cGVfY2JfZXNwX2NocScsIHZhbHVlOiAnY2IsIGVzcCwgY2hxJywgbW9kZTogJ1VOSVFVRScgfSxcblx0XHRcdF0sXG5cdFx0XHR2YWx1ZXM6IFtcblx0XHRcdFx0WzEsIDEsIDAsIDBdLFxuXHRcdFx0XHRbMiwgMCwgMSwgMF0sXG5cdFx0XHRcdFszLCAwLCAwLCAxXVxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdzdG9ja19wcmljZXMnLFxuXHRcdFx0c2NoZW1hOiBbXG5cdFx0XHRcdHsgY29sdW1uOiAnc3RvY2tQcmljZXNJZCcsIHZhbHVlOiAnSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5UIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2V1cm8nLCB2YWx1ZTogJ1JFQUwgTk9UIE5VTEwnIH0sXG5cdFx0XHRcdHsgY29sdW1uOiAnZG9sbGFyJywgdmFsdWU6ICdSRUFMIE5PVCBOVUxMJyB9LFxuXHRcdFx0XHR7IGNvbHVtbjogJ2xpdnJlJywgdmFsdWU6ICdSRUFMIE5PVCBOVUxMJyB9LFxuXHRcdFx0XSxcblx0XHRcdGluZGV4ZXM6IFtcblx0XHRcdFx0eyBuYW1lOiAnaW5kZXhfc3RvY2tfcHJpY2VzX3N0b2NrUHJpY2VzSWQnLCB2YWx1ZTogJ3N0b2NrUHJpY2VzSWQnIH0sXG5cdFx0XHRdLFxuXHRcdFx0dmFsdWVzOiBbXG5cdFx0XHRcdFsxLCAxLCAxLjA0LCAwLjg2XSxcblx0XHRcdFx0WzIsIDAuOTYsIDEsIDAuODNdLFxuXHRcdFx0XHRbMywgMS4xNiwgMS4yMSwgMV1cblx0XHRcdF0sXG5cdFx0fVxuXHRdXG59OyIsIi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IENhcGFjaXRvclNRTGl0ZSwgU1FMaXRlQ29ubmVjdGlvbiwgU1FMaXRlREJDb25uZWN0aW9uLCBjYXBTUUxpdGVSZXN1bHQsIGNhcFNRTGl0ZUNoYW5nZXMsIERCU1FMaXRlVmFsdWVzIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnRzIGFzIGplZXBTcWxpdGUsIGFwcGx5UG9seWZpbGxzIH0gZnJvbSAnamVlcC1zcWxpdGUvbG9hZGVyJztcbmltcG9ydCB7IGRhdGFUb0ltcG9ydCB9IGZyb20gJy4vdXRpbHMvaW1wb3J0LWZyb20tanNvbic7XG5cbmxldCBzcWxpdGU6IFNRTGl0ZUNvbm5lY3Rpb24gPSBudWxsO1xuLy8gY29uc3QgZGI6IFNRTGl0ZUNvbm5lY3Rpb24gPSBudWxsO1xuXG5jb25zdCBjcmVhdGVTUUxpdGVDb25uZWN0aW9uID0gKCkgPT4ge1xuXHRzcWxpdGUgPSBuZXcgU1FMaXRlQ29ubmVjdGlvbihDYXBhY2l0b3JTUUxpdGUpO1xufTtcblxuY29uc3QgcG9seWZpbGxzID0gYXN5bmMoKSA9PiB7XG5cdGFwcGx5UG9seWZpbGxzKClcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRqZWVwU3FsaXRlKHdpbmRvdyk7XG5cdFx0fSk7XG59O1xuXG5jb25zdCBjcmVhdGVKZWVwU1FMaXRlRWxlbSA9IGFzeW5jICgpID0+IHtcblx0Y29uc3QgamVlcFNRTGl0ZSA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdqZWVwLXNxbGl0ZScpO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGplZXBTUUxpdGUpO1xuXHRhd2FpdCBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCgnamVlcC1zcWxpdGUnKTtcblx0YXdhaXQgc3FsaXRlLmluaXRXZWJTdG9yZSgpO1xuXHQvLyBjb25zdCBzcWxpdGVTdG9yZSA9IGF3YWl0IGplZXBTUUxpdGUuaXNTdG9yZU9wZW4oKVxuXHQvLyBjb25zb2xlLmxvZyhgU3FsaXRlU3RvcmUgc3RhdGUgOiAke3NxbGl0ZVN0b3JlfWApO1xufTtcbmNvbnN0IGltcG9ydEZyb21KU09OID0gYXN5bmMgKCk6IGFueSA9PiB7XG5cdGNvbnNvbGUubG9nKCdpbXBvcnRGcm9tSlNPTiBDYWxsICEnKTtcblx0Ly8gY29uc29sZS5sb2coZGF0YVRvSW1wb3J0KTtcblx0bGV0IHJldCA9IDA7XG5cdC8vIGNvbnNvbGUubG9nKCdKc29uIHZhbCAtLT4nKTtcblx0Ly8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVRvSW1wb3J0KSk7XG5cdC8vIGNvbnNvbGUubG9nKCdlbmQgb2YgdmFsIC0tLS0tLS0tLScpO1xuXHQvLyByZXQgPSBhd2FpdCBzcWxpdGUuaW1wb3J0RnJvbUpzb24oSlNPTi5zdHJpbmdpZnkoZGF0YVRvSW1wb3J0KSk7XG5cdGNvbnN0IHJlcyAgPSBhd2FpdCBzcWxpdGUuaXNKc29uVmFsaWQoSlNPTi5zdHJpbmdpZnkoZGF0YVRvSW1wb3J0KSk7XG5cdGlmIChyZXMucmVzdWx0KXtcblx0XHRyZXQgPSBhd2FpdCBzcWxpdGUuaW1wb3J0RnJvbUpzb24oSlNPTi5zdHJpbmdpZnkoZGF0YVRvSW1wb3J0KSk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5sb2coJz4gaXNKc29uVmFsaWQgcmV0dW5lZCBmYWxzZScpXG5cdH1cblx0cmV0dXJuIHJldDtcbn07XG5cbmNvbnN0IGNvbm5lY3Rpb25zQ29uc2lzdGVuY3kgPSBhc3luYyAoKTogY2FwU1FMaXRlUmVzdWx0IHwgbnVsbCA9PiB7XG5cdGNvbnNvbGUubG9nKCdjb25uZWN0aW9uc0NvbnNpc3RlbmN5IENhbGwgIScpO1xuXHRjb25zdCByZXQgPSBzcWxpdGUgIT09IG51bGwgXG5cdFx0PyBhd2FpdCBzcWxpdGUuY2hlY2tDb25uZWN0aW9uc0NvbnNpc3RlbmN5KHtkYk5hbWVzOiBbJ2Vhc3lfY29tcHRhJ10sIG9wZW5Nb2RlczogWydSVyddfSlcblx0IFx0OiBudWxsO1xuXHRyZXR1cm4gcmV0O1xufTtcblxuY29uc3QgY3JlYXRlQ29ubmVjdGlvbiA9IGFzeW5jICgpOiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsID0+IHtcblx0Y29uc29sZS5sb2coJ2NyZWF0ZUNvbm5lY3Rpb24gQ2FsbCAhJyk7XG5cdGNvbnN0IHJldCA9ICBzcWxpdGUgIT09IG51bGxcblx0XHQ/IGF3YWl0IHNxbGl0ZS5jcmVhdGVDb25uZWN0aW9uKCdlYXN5X2NvbXB0YScsIGZhbHNlLCAnbm8tZW5jcnlwdGlvbicsIDEsIGZhbHNlKVxuXHRcdDogbnVsbDtcblx0cmV0dXJuIHJldDtcbn07XG5cbmNvbnN0IHJldHJpZXZlQ29ubmVjdGlvbiA9IGFzeW5jICgpOiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsID0+IHtcblx0Y29uc29sZS5sb2coJ1JldHJpZXZlIGNvbm5lY3Rpb24gQ2FsbCAhJyk7XG5cdGNvbnN0IHJldCA9IHNxbGl0ZSAhPT0gbnVsbFxuXHRcdD8gYXdhaXQgc3FsaXRlLnJldHJpZXZlQ29ubmVjdGlvbignZWFzeV9jb21wdGEnLCBmYWxzZSlcblx0XHQ6IG51bGw7XG5cdHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBpc0Nvbm5lY3Rpb24gPSBhc3luYyAoKTogY2FwU1FMaXRlUmVzdWx0IHwgbnVsbCA9PiB7XG5cdGNvbnNvbGUubG9nKCdpc0Nvbm5lY3Rpb24gQ2FsbCAhJyk7XG5cdGNvbnN0IHJldCA9ICBzcWxpdGUgIT09IG51bGxcblx0XHQ/IGF3YWl0IHNxbGl0ZS5pc0Nvbm5lY3Rpb24oJ2Vhc3lfY29tcHRhJywgZmFsc2UpXG5cdFx0OiBudWxsO1xuXHRyZXR1cm4gcmV0O1xufTtcblxuY29uc3Qgb3BlbkRCID0gYXN5bmMgKGRiOiBTUUxpdGVEQkNvbm5lY3Rpb24pOiBib29sZWFuID0+IHtcblx0Y29uc29sZS5sb2coJ29wZW5EQiBDYWxsICEnKTtcblx0Ly8gY29uc29sZS5sb2coZGIpO1xuXHRsZXQgcmV0ID0gZmFsc2U7XG5cdGlmICghIWRiKXtcblx0XHRhd2FpdCBkYi5vcGVuKCk7XG5cdFx0cmV0ID0gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gcmV0O1xufTtcblxuY29uc3QgaXNPcGVuREIgPSBhc3luYyhkYjogU1FMaXRlREJDb25uZWN0aW9uKTogY2FwU1FMaXRlUmVzdWx0IHwgbnVsbCA9PiB7XG5cdGNvbnNvbGUubG9nKCdpc09wZW5EQiBDYWxsICEnKTtcblx0bGV0IHJldCA9IG51bGw7XG5cdGlmICghIWRiKXtcblx0XHRyZXQgPSBhd2FpdCBkYi5pc0RCT3BlbigpO1xuXHR9XG5cdC8vIGNvbnNvbGUubG9nKHJldCk7XG5cdHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBjbG9zZUNvbm5lY3Rpb24gPSBhc3luYygpID0+IHtcblx0Y29uc29sZS5sb2coJ2Nsb3NlQ29ubmVjdGlvbiBDYWxsICEnKTtcblx0Y29uc3QgcmV0ID0gc3FsaXRlICE9PSBudWxsXG5cdFx0PyBhd2FpdCBzcWxpdGUuY2xvc2VDb25uZWN0aW9uKCdlYXN5X2NvbXB0YScsIGZhbHNlKVxuXHRcdDogbnVsbDtcblx0cmV0dXJuIHJldDtcbn07XG5cbmNvbnN0IGNsb3NlREJDb25uZWN0aW9uID0gYXN5bmMoZGI6IFNRTGl0ZURCQ29ubmVjdGlvbikgPT4ge1xuXHRjb25zb2xlLmxvZygnY2xvc2VEQkNvbm5lY3Rpb24gQ2FsbCAhJyk7XG5cdGNvbnN0IHJldCA9IGRiICE9PSBudWxsXG5cdFx0PyBhd2FpdCBkYi5jbG9zZSgpXG5cdFx0OiBudWxsO1xuXHRyZXR1cm4gcmV0O1xufTtcblxuY29uc3QgcXVlcnkgPSBhc3luYyhkYjogU1FMaXRlREJDb25uZWN0aW9uLCBzcWw6IHN0cmluZywgdmFsdWVzPzogYW55W10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBEQlNRTGl0ZVZhbHVlcyB8IG51bGwgPT4ge1xuXHRjb25zb2xlLmxvZygncXVlcnkgQ2FsbCAhJyk7XG5cdGxldCByZXQ7XG5cdGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCl7XG5cdFx0cmV0ID0gZGIgIT09IG51bGwgXG5cdFx0XHQ/IGF3YWl0IGRiLnF1ZXJ5KHNxbCwgdmFsdWVzKVxuXHRcdFx0OiBudWxsIDtcblx0fSBlbHNlIHtcblx0XHRyZXQgPSBkYiAhPT0gbnVsbCBcblx0XHRcdD8gYXdhaXQgZGIucXVlcnkoc3FsKVxuXHRcdFx0OiBudWxsIDtcblx0fVxuXHRyZXR1cm4gcmV0O1xuICAgIC8vIGNvbnNvbGUubG9nKGBAQEAgcmVzLnZhbHVlcy5sZW5ndGggJHtyZXMudmFsdWVzLmxlbmd0aH1gKVxufTtcblxuY29uc3QgcnVuID0gYXN5bmMoZGI6IFNRTGl0ZURCQ29ubmVjdGlvbiwgc3FsOiBzdHJpbmcsIHZhbHVlcz86IGFueVtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB0cmFuc2FjdGlvbj86IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBjYXBTUUxpdGVDaGFuZ2VzIHwgbnVsbCA9PiB7XG5cdGNvbnNvbGUubG9nKCdydW4gQ2FsbCAhJyk7XG5cdGNvbnN0IHJldCA9IGRiICE9PSBudWxsIFxuXHRcdD8gYXdhaXQgZGIucnVuKHNxbCwgdmFsdWVzLCB0cmFuc2FjdGlvbilcblx0XHRcdC50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdCAgICAgIGNvbnNvbGUubG9nKGVycik7XG5cdFx0ICAgICAgcmV0dXJuIG51bGw7XG5cdFx0ICAgIH0pXG5cdFx0OiBudWxsIDtcblx0cmV0dXJuIHJldDtcbiAgICAvLyBjb25zb2xlLmxvZyhgQEBAIHJlcy52YWx1ZXMubGVuZ3RoICR7cmVzLnZhbHVlcy5sZW5ndGh9YClcbn07XG5cbmV4cG9ydCB7IHBvbHlmaWxscyxcblx0Y3JlYXRlU1FMaXRlQ29ubmVjdGlvbiwgXG5cdGNyZWF0ZUplZXBTUUxpdGVFbGVtLFxuXHRpbXBvcnRGcm9tSlNPTixcblx0Y29ubmVjdGlvbnNDb25zaXN0ZW5jeSxcblx0Y3JlYXRlQ29ubmVjdGlvbixcblx0cmV0cmlldmVDb25uZWN0aW9uLFxuXHRpc0Nvbm5lY3Rpb24sXG5cdG9wZW5EQixcblx0aXNPcGVuREIsXG5cdHF1ZXJ5LFxuXHRydW4sXG5cdGNsb3NlQ29ubmVjdGlvbixcblx0Y2xvc2VEQkNvbm5lY3Rpb24gfTsiLCIvKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiAnb2ZmJyovXG5pbXBvcnQgeyBjcmVhdGVTUUxpdGVDb25uZWN0aW9uLFxuICBpbXBvcnRGcm9tSlNPTixcbiAgY29ubmVjdGlvbnNDb25zaXN0ZW5jeSxcbiAgY3JlYXRlQ29ubmVjdGlvbixcbiAgcmV0cmlldmVDb25uZWN0aW9uLFxuICBwb2x5ZmlsbHMsXG4gIGNyZWF0ZUplZXBTUUxpdGVFbGVtLFxuICAvLyBzZXREQixcbiAgaXNDb25uZWN0aW9uLFxuICBvcGVuREIsXG4gIGlzT3BlbkRCLFxuICBxdWVyeSxcbiAgcnVuLFxuICBjbG9zZUNvbm5lY3Rpb24sXG4gIGNsb3NlREJDb25uZWN0aW9uIH0gZnJvbSAnLi9zcWxpdGVTdG9yYWdlJztcbmltcG9ydCB7IFNRTGl0ZURCQ29ubmVjdGlvbiwgY2FwU1FMaXRlQ2hhbmdlcywgREJTUUxpdGVWYWx1ZXMgfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdxdWFzYXInXG5cbi8vIGNvbnNvbGUubG9nKFBsYXRmb3JtKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMoaW1wb3J0SnNvbiA9IGZhbHNlKTogU1FMaXRlREJDb25uZWN0aW9uIHwgbnVsbCA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKCdydW5uaW5nIHRocm91Z2ggY2FwYWNpdG9yICEnKTtcbiAgY3JlYXRlU1FMaXRlQ29ubmVjdGlvbigpO1xuICBpZiAoISFQbGF0Zm9ybS5pcy5uYXRpdmVNb2JpbGUgPT09IGZhbHNlKXtcbiAgICBhd2FpdCBwb2x5ZmlsbHMoKTtcbiAgICBhd2FpdCBjcmVhdGVKZWVwU1FMaXRlRWxlbSgpO1xuICB9XG4gIGNvbnN0IGNvbnNpc3RlbmN5ID0gYXdhaXQgY29ubmVjdGlvbnNDb25zaXN0ZW5jeSgpO1xuICAvLyBjb25zb2xlLmxvZyhjb25zaXN0ZW5jeSk7XG4gIGNvbnN0IGNvbm5lY3Rpb25PcGVubmVkID0gYXdhaXQgaXNDb25uZWN0aW9uKCk7XG4gIC8vIGNvbnNvbGUubG9nKGNvbm5lY3Rpb25PcGVubmVkKTtcbiAgbGV0IGRiID0gbnVsbDtcbiAgaWYgKGNvbm5lY3Rpb25PcGVubmVkLnJlc3VsdCAmJiBjb25zaXN0ZW5jeS5yZXN1bHQpIHtcbiAgICBkYiA9IGF3YWl0IHJldHJpZXZlQ29ubmVjdGlvbigpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRiKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaW1wb3J0SnNvbilcbiAgICAgIGRiID0gYXdhaXQgaW1wb3J0RnJvbUpTT04oKTtcbiAgICBkYiA9IGF3YWl0IGNyZWF0ZUNvbm5lY3Rpb24oKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkYik7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ3JldHVybiBkYiAhJyk7XG4gIHJldHVybiBkYjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuRGJDb25uZWN0aW9uKGRiOiBTUUxpdGVEQkNvbm5lY3Rpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuIGF3YWl0IG9wZW5EQihkYik7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNEYkNvbm5lY3Rpb25PcGVuKGRiOiBTUUxpdGVEQkNvbm5lY3Rpb24pOiBib29sZWFuIHtcbiAgbGV0IHJldCA9IGZhbHNlO1xuICByZXQgPSBhd2FpdCBpc09wZW5EQihkYik7XG4gIGlmIChyZXQgIT09IG51bGwpXG4gICAgcmV0dXJuIHJldC5yZXN1bHQ7XG4gIGVsc2VcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbmV3UXVlcnkoZGI6IFNRTGl0ZURCQ29ubmVjdGlvbiwgcTogc3RyaW5nLCB2YWw6IGFueVtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogREJTUUxpdGVWYWx1ZXMgfCBudWxsIHtcbiAgcmV0dXJuIGF3YWl0IHF1ZXJ5KGRiLCBxLCB2YWwpO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5ld1J1bihkYjogU1FMaXRlREJDb25uZWN0aW9uLCBxOiBzdHJpbmcsIHZhbDogYW55W10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIHRyYW5zYWM6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBjYXBTUUxpdGVDaGFuZ2VzIHwgbnVsbCB7XG4gIHJldHVybiBhd2FpdCBydW4oZGIsIHEsIHZhbCwgdHJhbnNhYylcbiAgICAvLyAuY2F0Y2goKGVycikgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAvLyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUNvbm5lY3Rpb24oKXtcbiAgY2xvc2VDb25uZWN0aW9uKCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VEYkNvbm5lY3Rpb24oZGI6IFNRTGl0ZURCQ29ubmVjdGlvbil7XG4gIGNsb3NlREJDb25uZWN0aW9uKGRiKTtcbn07IiwiaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgcXVhc2FyS2V5IH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG4vKipcbiAqIFJldHVybnMgdGhlICRxIGluc3RhbmNlLlxuICogRXF1aXZhbGVudCB0byBgdGhpcy4kcWAgaW5zaWRlIHRlbXBsYXRlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlUXVhc2FyICgpIHtcbiAgcmV0dXJuIGluamVjdChxdWFzYXJLZXkpXG59XG4iXSwiZmlsZSI6ImFzc2V0cy91c2UtcXVhc2FyLmpzIn0=
