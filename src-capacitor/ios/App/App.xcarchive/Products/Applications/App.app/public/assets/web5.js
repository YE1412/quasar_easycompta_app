import { W as WebPlugin } from "./index.js";
function resolve(path) {
  const posix = path.split("/").filter((item) => item !== ".");
  const newPosix = [];
  posix.forEach((item) => {
    if (item === ".." && newPosix.length > 0 && newPosix[newPosix.length - 1] !== "..") {
      newPosix.pop();
    } else {
      newPosix.push(item);
    }
  });
  return newPosix.join("/");
}
function isPathParent(parent, children) {
  parent = resolve(parent);
  children = resolve(children);
  const pathsA = parent.split("/");
  const pathsB = children.split("/");
  return parent !== children && pathsA.every((value, index) => value === pathsB[index]);
}
class FilesystemWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.DB_VERSION = 1;
    this.DB_NAME = "Disc";
    this._writeCmds = ["add", "put", "delete"];
  }
  async initDb() {
    if (this._db !== void 0) {
      return this._db;
    }
    if (!("indexedDB" in window)) {
      throw this.unavailable("This browser doesn't support IndexedDB");
    }
    return new Promise((resolve2, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      request.onupgradeneeded = FilesystemWeb.doUpgrade;
      request.onsuccess = () => {
        this._db = request.result;
        resolve2(request.result);
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => {
        console.warn("db blocked");
      };
    });
  }
  static doUpgrade(event) {
    const eventTarget = event.target;
    const db = eventTarget.result;
    switch (event.oldVersion) {
      case 0:
      case 1:
      default: {
        if (db.objectStoreNames.contains("FileStorage")) {
          db.deleteObjectStore("FileStorage");
        }
        const store = db.createObjectStore("FileStorage", { keyPath: "path" });
        store.createIndex("by_folder", "folder");
      }
    }
  }
  async dbRequest(cmd, args) {
    const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
    return this.initDb().then((conn) => {
      return new Promise((resolve2, reject) => {
        const tx = conn.transaction(["FileStorage"], readFlag);
        const store = tx.objectStore("FileStorage");
        const req = store[cmd](...args);
        req.onsuccess = () => resolve2(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }
  async dbIndexRequest(indexName, cmd, args) {
    const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
    return this.initDb().then((conn) => {
      return new Promise((resolve2, reject) => {
        const tx = conn.transaction(["FileStorage"], readFlag);
        const store = tx.objectStore("FileStorage");
        const index = store.index(indexName);
        const req = index[cmd](...args);
        req.onsuccess = () => resolve2(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }
  getPath(directory, uriPath) {
    const cleanedUriPath = uriPath !== void 0 ? uriPath.replace(/^[/]+|[/]+$/g, "") : "";
    let fsPath = "";
    if (directory !== void 0)
      fsPath += "/" + directory;
    if (uriPath !== "")
      fsPath += "/" + cleanedUriPath;
    return fsPath;
  }
  async clear() {
    const conn = await this.initDb();
    const tx = conn.transaction(["FileStorage"], "readwrite");
    const store = tx.objectStore("FileStorage");
    store.clear();
  }
  async readFile(options) {
    const path = this.getPath(options.directory, options.path);
    const entry = await this.dbRequest("get", [path]);
    if (entry === void 0)
      throw Error("File does not exist.");
    return { data: entry.content ? entry.content : "" };
  }
  async writeFile(options) {
    const path = this.getPath(options.directory, options.path);
    let data = options.data;
    const encoding = options.encoding;
    const doRecursive = options.recursive;
    const occupiedEntry = await this.dbRequest("get", [path]);
    if (occupiedEntry && occupiedEntry.type === "directory")
      throw Error("The supplied path is a directory.");
    const parentPath = path.substr(0, path.lastIndexOf("/"));
    const parentEntry = await this.dbRequest("get", [parentPath]);
    if (parentEntry === void 0) {
      const subDirIndex = parentPath.indexOf("/", 1);
      if (subDirIndex !== -1) {
        const parentArgPath = parentPath.substr(subDirIndex);
        await this.mkdir({
          path: parentArgPath,
          directory: options.directory,
          recursive: doRecursive
        });
      }
    }
    if (!encoding) {
      data = data.indexOf(",") >= 0 ? data.split(",")[1] : data;
      if (!this.isBase64String(data))
        throw Error("The supplied data is not valid base64 content.");
    }
    const now = Date.now();
    const pathObj = {
      path,
      folder: parentPath,
      type: "file",
      size: data.length,
      ctime: now,
      mtime: now,
      content: data
    };
    await this.dbRequest("put", [pathObj]);
    return {
      uri: pathObj.path
    };
  }
  async appendFile(options) {
    const path = this.getPath(options.directory, options.path);
    let data = options.data;
    const encoding = options.encoding;
    const parentPath = path.substr(0, path.lastIndexOf("/"));
    const now = Date.now();
    let ctime = now;
    const occupiedEntry = await this.dbRequest("get", [path]);
    if (occupiedEntry && occupiedEntry.type === "directory")
      throw Error("The supplied path is a directory.");
    const parentEntry = await this.dbRequest("get", [parentPath]);
    if (parentEntry === void 0) {
      const subDirIndex = parentPath.indexOf("/", 1);
      if (subDirIndex !== -1) {
        const parentArgPath = parentPath.substr(subDirIndex);
        await this.mkdir({
          path: parentArgPath,
          directory: options.directory,
          recursive: true
        });
      }
    }
    if (!encoding && !this.isBase64String(data))
      throw Error("The supplied data is not valid base64 content.");
    if (occupiedEntry !== void 0) {
      if (occupiedEntry.content !== void 0 && !encoding) {
        data = btoa(atob(occupiedEntry.content) + atob(data));
      } else {
        data = occupiedEntry.content + data;
      }
      ctime = occupiedEntry.ctime;
    }
    const pathObj = {
      path,
      folder: parentPath,
      type: "file",
      size: data.length,
      ctime,
      mtime: now,
      content: data
    };
    await this.dbRequest("put", [pathObj]);
  }
  async deleteFile(options) {
    const path = this.getPath(options.directory, options.path);
    const entry = await this.dbRequest("get", [path]);
    if (entry === void 0)
      throw Error("File does not exist.");
    const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [
      IDBKeyRange.only(path)
    ]);
    if (entries.length !== 0)
      throw Error("Folder is not empty.");
    await this.dbRequest("delete", [path]);
  }
  async mkdir(options) {
    const path = this.getPath(options.directory, options.path);
    const doRecursive = options.recursive;
    const parentPath = path.substr(0, path.lastIndexOf("/"));
    const depth = (path.match(/\//g) || []).length;
    const parentEntry = await this.dbRequest("get", [parentPath]);
    const occupiedEntry = await this.dbRequest("get", [path]);
    if (depth === 1)
      throw Error("Cannot create Root directory");
    if (occupiedEntry !== void 0)
      throw Error("Current directory does already exist.");
    if (!doRecursive && depth !== 2 && parentEntry === void 0)
      throw Error("Parent directory must exist");
    if (doRecursive && depth !== 2 && parentEntry === void 0) {
      const parentArgPath = parentPath.substr(parentPath.indexOf("/", 1));
      await this.mkdir({
        path: parentArgPath,
        directory: options.directory,
        recursive: doRecursive
      });
    }
    const now = Date.now();
    const pathObj = {
      path,
      folder: parentPath,
      type: "directory",
      size: 0,
      ctime: now,
      mtime: now
    };
    await this.dbRequest("put", [pathObj]);
  }
  async rmdir(options) {
    const { path, directory, recursive } = options;
    const fullPath = this.getPath(directory, path);
    const entry = await this.dbRequest("get", [fullPath]);
    if (entry === void 0)
      throw Error("Folder does not exist.");
    if (entry.type !== "directory")
      throw Error("Requested path is not a directory");
    const readDirResult = await this.readdir({ path, directory });
    if (readDirResult.files.length !== 0 && !recursive)
      throw Error("Folder is not empty");
    for (const entry2 of readDirResult.files) {
      const entryPath = `${path}/${entry2.name}`;
      const entryObj = await this.stat({ path: entryPath, directory });
      if (entryObj.type === "file") {
        await this.deleteFile({ path: entryPath, directory });
      } else {
        await this.rmdir({ path: entryPath, directory, recursive });
      }
    }
    await this.dbRequest("delete", [fullPath]);
  }
  async readdir(options) {
    const path = this.getPath(options.directory, options.path);
    const entry = await this.dbRequest("get", [path]);
    if (options.path !== "" && entry === void 0)
      throw Error("Folder does not exist.");
    const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
    const files = await Promise.all(entries.map(async (e) => {
      let subEntry = await this.dbRequest("get", [e]);
      if (subEntry === void 0) {
        subEntry = await this.dbRequest("get", [e + "/"]);
      }
      return {
        name: e.substring(path.length + 1),
        type: subEntry.type,
        size: subEntry.size,
        ctime: subEntry.ctime,
        mtime: subEntry.mtime,
        uri: subEntry.path
      };
    }));
    return { files };
  }
  async getUri(options) {
    const path = this.getPath(options.directory, options.path);
    let entry = await this.dbRequest("get", [path]);
    if (entry === void 0) {
      entry = await this.dbRequest("get", [path + "/"]);
    }
    return {
      uri: (entry === null || entry === void 0 ? void 0 : entry.path) || path
    };
  }
  async stat(options) {
    const path = this.getPath(options.directory, options.path);
    let entry = await this.dbRequest("get", [path]);
    if (entry === void 0) {
      entry = await this.dbRequest("get", [path + "/"]);
    }
    if (entry === void 0)
      throw Error("Entry does not exist.");
    return {
      type: entry.type,
      size: entry.size,
      ctime: entry.ctime,
      mtime: entry.mtime,
      uri: entry.path
    };
  }
  async rename(options) {
    await this._copy(options, true);
    return;
  }
  async copy(options) {
    return this._copy(options, false);
  }
  async requestPermissions() {
    return { publicStorage: "granted" };
  }
  async checkPermissions() {
    return { publicStorage: "granted" };
  }
  async _copy(options, doRename = false) {
    let { toDirectory } = options;
    const { to, from, directory: fromDirectory } = options;
    if (!to || !from) {
      throw Error("Both to and from must be provided");
    }
    if (!toDirectory) {
      toDirectory = fromDirectory;
    }
    const fromPath = this.getPath(fromDirectory, from);
    const toPath = this.getPath(toDirectory, to);
    if (fromPath === toPath) {
      return {
        uri: toPath
      };
    }
    if (isPathParent(fromPath, toPath)) {
      throw Error("To path cannot contain the from path");
    }
    let toObj;
    try {
      toObj = await this.stat({
        path: to,
        directory: toDirectory
      });
    } catch (e) {
      const toPathComponents = to.split("/");
      toPathComponents.pop();
      const toPath2 = toPathComponents.join("/");
      if (toPathComponents.length > 0) {
        const toParentDirectory = await this.stat({
          path: toPath2,
          directory: toDirectory
        });
        if (toParentDirectory.type !== "directory") {
          throw new Error("Parent directory of the to path is a file");
        }
      }
    }
    if (toObj && toObj.type === "directory") {
      throw new Error("Cannot overwrite a directory with a file");
    }
    const fromObj = await this.stat({
      path: from,
      directory: fromDirectory
    });
    const updateTime = async (path, ctime2, mtime) => {
      const fullPath = this.getPath(toDirectory, path);
      const entry = await this.dbRequest("get", [fullPath]);
      entry.ctime = ctime2;
      entry.mtime = mtime;
      await this.dbRequest("put", [entry]);
    };
    const ctime = fromObj.ctime ? fromObj.ctime : Date.now();
    switch (fromObj.type) {
      case "file": {
        const file = await this.readFile({
          path: from,
          directory: fromDirectory
        });
        if (doRename) {
          await this.deleteFile({
            path: from,
            directory: fromDirectory
          });
        }
        const writeResult = await this.writeFile({
          path: to,
          directory: toDirectory,
          data: file.data
        });
        if (doRename) {
          await updateTime(to, ctime, fromObj.mtime);
        }
        return writeResult;
      }
      case "directory": {
        if (toObj) {
          throw Error("Cannot move a directory over an existing object");
        }
        try {
          await this.mkdir({
            path: to,
            directory: toDirectory,
            recursive: false
          });
          if (doRename) {
            await updateTime(to, ctime, fromObj.mtime);
          }
        } catch (e) {
        }
        const contents = (await this.readdir({
          path: from,
          directory: fromDirectory
        })).files;
        for (const filename of contents) {
          await this._copy({
            from: `${from}/${filename}`,
            to: `${to}/${filename}`,
            directory: fromDirectory,
            toDirectory
          }, doRename);
        }
        if (doRename) {
          await this.rmdir({
            path: from,
            directory: fromDirectory
          });
        }
      }
    }
    return {
      uri: toPath
    };
  }
  isBase64String(str) {
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }
}
FilesystemWeb._debug = true;
export { FilesystemWeb };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9kaXN0L2VzbS93ZWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmZ1bmN0aW9uIHJlc29sdmUocGF0aCkge1xuICAgIGNvbnN0IHBvc2l4ID0gcGF0aC5zcGxpdCgnLycpLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09ICcuJyk7XG4gICAgY29uc3QgbmV3UG9zaXggPSBbXTtcbiAgICBwb3NpeC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSA9PT0gJy4uJyAmJlxuICAgICAgICAgICAgbmV3UG9zaXgubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgbmV3UG9zaXhbbmV3UG9zaXgubGVuZ3RoIC0gMV0gIT09ICcuLicpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l4LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXgucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXdQb3NpeC5qb2luKCcvJyk7XG59XG5mdW5jdGlvbiBpc1BhdGhQYXJlbnQocGFyZW50LCBjaGlsZHJlbikge1xuICAgIHBhcmVudCA9IHJlc29sdmUocGFyZW50KTtcbiAgICBjaGlsZHJlbiA9IHJlc29sdmUoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHBhdGhzQSA9IHBhcmVudC5zcGxpdCgnLycpO1xuICAgIGNvbnN0IHBhdGhzQiA9IGNoaWxkcmVuLnNwbGl0KCcvJyk7XG4gICAgcmV0dXJuIChwYXJlbnQgIT09IGNoaWxkcmVuICYmXG4gICAgICAgIHBhdGhzQS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gcGF0aHNCW2luZGV4XSkpO1xufVxuZXhwb3J0IGNsYXNzIEZpbGVzeXN0ZW1XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLkRCX1ZFUlNJT04gPSAxO1xuICAgICAgICB0aGlzLkRCX05BTUUgPSAnRGlzYyc7XG4gICAgICAgIHRoaXMuX3dyaXRlQ21kcyA9IFsnYWRkJywgJ3B1dCcsICdkZWxldGUnXTtcbiAgICB9XG4gICAgYXN5bmMgaW5pdERiKCkge1xuICAgICAgICBpZiAodGhpcy5fZGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKCdpbmRleGVkREInIGluIHdpbmRvdykpIHtcbiAgICAgICAgICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEluZGV4ZWREQlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKHRoaXMuREJfTkFNRSwgdGhpcy5EQl9WRVJTSU9OKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gRmlsZXN5c3RlbVdlYi5kb1VwZ3JhZGU7XG4gICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYiA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignZGIgYmxvY2tlZCcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBkb1VwZ3JhZGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGRiID0gZXZlbnRUYXJnZXQucmVzdWx0O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBpZiAoZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygnRmlsZVN0b3JhZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnLCB7IGtleVBhdGg6ICdwYXRoJyB9KTtcbiAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnYnlfZm9sZGVyJywgJ2ZvbGRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRiUmVxdWVzdChjbWQsIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmVhZEZsYWcgPSB0aGlzLl93cml0ZUNtZHMuaW5kZXhPZihjbWQpICE9PSAtMSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5JztcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdERiKCkudGhlbigoY29ubikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eCA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCByZWFkRmxhZyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBzdG9yZVtjbWRdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGRiSW5kZXhSZXF1ZXN0KGluZGV4TmFtZSwgY21kLCBhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlYWRGbGFnID0gdGhpcy5fd3JpdGVDbWRzLmluZGV4T2YoY21kKSAhPT0gLTEgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seSc7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXREYigpLnRoZW4oKGNvbm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHggPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgcmVhZEZsYWcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdG9yZS5pbmRleChpbmRleE5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcSA9IGluZGV4W2NtZF0oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF0aChkaXJlY3RvcnksIHVyaVBhdGgpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZFVyaVBhdGggPSB1cmlQYXRoICE9PSB1bmRlZmluZWQgPyB1cmlQYXRoLnJlcGxhY2UoL15bL10rfFsvXSskL2csICcnKSA6ICcnO1xuICAgICAgICBsZXQgZnNQYXRoID0gJyc7XG4gICAgICAgIGlmIChkaXJlY3RvcnkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGZzUGF0aCArPSAnLycgKyBkaXJlY3Rvcnk7XG4gICAgICAgIGlmICh1cmlQYXRoICE9PSAnJylcbiAgICAgICAgICAgIGZzUGF0aCArPSAnLycgKyBjbGVhbmVkVXJpUGF0aDtcbiAgICAgICAgcmV0dXJuIGZzUGF0aDtcbiAgICB9XG4gICAgYXN5bmMgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbm4gPSBhd2FpdCB0aGlzLmluaXREYigpO1xuICAgICAgICBjb25zdCB0eCA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCAncmVhZHdyaXRlJyk7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIHN0b3JlLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlYWQgYSBmaWxlIGZyb20gZGlza1xuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIHJlYWRcbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgICAqL1xuICAgIGFzeW5jIHJlYWRGaWxlKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAgICAgLy8gY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICAgICAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSk7XG4gICAgICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IGVudHJ5LmNvbnRlbnQgPyBlbnRyeS5jb250ZW50IDogJycgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGUgYSBmaWxlIHRvIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSB3cml0ZVxuICAgICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZmlsZSB3cml0ZSByZXN1bHRcbiAgICAgKi9cbiAgICBhc3luYyB3cml0ZUZpbGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgICAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICAgICAgICBjb25zdCBkb1JlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlO1xuICAgICAgICBjb25zdCBvY2N1cGllZEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKTtcbiAgICAgICAgaWYgKG9jY3VwaWVkRW50cnkgJiYgb2NjdXBpZWRFbnRyeS50eXBlID09PSAnZGlyZWN0b3J5JylcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgcGF0aCBpcyBhIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG4gICAgICAgIGNvbnN0IHBhcmVudEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGFyZW50UGF0aF0pKTtcbiAgICAgICAgaWYgKHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YkRpckluZGV4ID0gcGFyZW50UGF0aC5pbmRleE9mKCcvJywgMSk7XG4gICAgICAgICAgICBpZiAoc3ViRGlySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHN1YkRpckluZGV4KTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlOiBkb1JlY3Vyc2l2ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVuY29kaW5nKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5pbmRleE9mKCcsJykgPj0gMCA/IGRhdGEuc3BsaXQoJywnKVsxXSA6IGRhdGE7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNCYXNlNjRTdHJpbmcoZGF0YSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBkYXRhIGlzIG5vdCB2YWxpZCBiYXNlNjQgY29udGVudC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBwYXRoT2JqID0ge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGZvbGRlcjogcGFyZW50UGF0aCxcbiAgICAgICAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgICAgICAgIHNpemU6IGRhdGEubGVuZ3RoLFxuICAgICAgICAgICAgY3RpbWU6IG5vdyxcbiAgICAgICAgICAgIG10aW1lOiBub3csXG4gICAgICAgICAgICBjb250ZW50OiBkYXRhLFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVyaTogcGF0aE9iai5wYXRoLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgdG8gYSBmaWxlIG9uIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSBhcHBlbmRcbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgd3JpdGUgcmVzdWx0XG4gICAgICovXG4gICAgYXN5bmMgYXBwZW5kRmlsZShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgY3RpbWUgPSBub3c7XG4gICAgICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpO1xuICAgICAgICBpZiAob2NjdXBpZWRFbnRyeSAmJiBvY2N1cGllZEVudHJ5LnR5cGUgPT09ICdkaXJlY3RvcnknKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBwYXRoIGlzIGEgZGlyZWN0b3J5LicpO1xuICAgICAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSk7XG4gICAgICAgIGlmIChwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJEaXJJbmRleCA9IHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpO1xuICAgICAgICAgICAgaWYgKHN1YkRpckluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihzdWJEaXJJbmRleCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVuY29kaW5nICYmICF0aGlzLmlzQmFzZTY0U3RyaW5nKGRhdGEpKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBkYXRhIGlzIG5vdCB2YWxpZCBiYXNlNjQgY29udGVudC4nKTtcbiAgICAgICAgaWYgKG9jY3VwaWVkRW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG9jY3VwaWVkRW50cnkuY29udGVudCAhPT0gdW5kZWZpbmVkICYmICFlbmNvZGluZykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBidG9hKGF0b2Iob2NjdXBpZWRFbnRyeS5jb250ZW50KSArIGF0b2IoZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IG9jY3VwaWVkRW50cnkuY29udGVudCArIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdGltZSA9IG9jY3VwaWVkRW50cnkuY3RpbWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aE9iaiA9IHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICAgICAgICB0eXBlOiAnZmlsZScsXG4gICAgICAgICAgICBzaXplOiBkYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIGN0aW1lOiBjdGltZSxcbiAgICAgICAgICAgIG10aW1lOiBub3csXG4gICAgICAgICAgICBjb250ZW50OiBkYXRhLFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGRpc2tcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSBkZWxldGVcbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRlbGV0ZWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZUZpbGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgICAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSk7XG4gICAgICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCB0aGlzLmRiSW5kZXhSZXF1ZXN0KCdieV9mb2xkZXInLCAnZ2V0QWxsS2V5cycsIFtcbiAgICAgICAgICAgIElEQktleVJhbmdlLm9ubHkocGF0aCksXG4gICAgICAgIF0pO1xuICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggIT09IDApXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignRm9sZGVyIGlzIG5vdCBlbXB0eS4nKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2RlbGV0ZScsIFtwYXRoXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRpcmVjdG9yeS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgbWtkaXJcbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1rZGlyIHJlc3VsdFxuICAgICAqL1xuICAgIGFzeW5jIG1rZGlyKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAgICAgY29uc3QgZG9SZWN1cnNpdmUgPSBvcHRpb25zLnJlY3Vyc2l2ZTtcbiAgICAgICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG4gICAgICAgIGNvbnN0IGRlcHRoID0gKHBhdGgubWF0Y2goL1xcLy9nKSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSk7XG4gICAgICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpO1xuICAgICAgICBpZiAoZGVwdGggPT09IDEpXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGNyZWF0ZSBSb290IGRpcmVjdG9yeScpO1xuICAgICAgICBpZiAob2NjdXBpZWRFbnRyeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0N1cnJlbnQgZGlyZWN0b3J5IGRvZXMgYWxyZWFkeSBleGlzdC4nKTtcbiAgICAgICAgaWYgKCFkb1JlY3Vyc2l2ZSAmJiBkZXB0aCAhPT0gMiAmJiBwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1BhcmVudCBkaXJlY3RvcnkgbXVzdCBleGlzdCcpO1xuICAgICAgICBpZiAoZG9SZWN1cnNpdmUgJiYgZGVwdGggIT09IDIgJiYgcGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICByZWN1cnNpdmU6IGRvUmVjdXJzaXZlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgcGF0aE9iaiA9IHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0b3J5JyxcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgICBjdGltZTogbm93LFxuICAgICAgICAgICAgbXRpbWU6IG5vdyxcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGRpcmVjdG9yeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgZGlyZWN0b3J5IHJlbW92ZVxuICAgICAqL1xuICAgIGFzeW5jIHJtZGlyKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBwYXRoLCBkaXJlY3RvcnksIHJlY3Vyc2l2ZSB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZnVsbFBhdGggPSB0aGlzLmdldFBhdGgoZGlyZWN0b3J5LCBwYXRoKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtmdWxsUGF0aF0pKTtcbiAgICAgICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignRm9sZGVyIGRvZXMgbm90IGV4aXN0LicpO1xuICAgICAgICBpZiAoZW50cnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignUmVxdWVzdGVkIHBhdGggaXMgbm90IGEgZGlyZWN0b3J5Jyk7XG4gICAgICAgIGNvbnN0IHJlYWREaXJSZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRkaXIoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgIGlmIChyZWFkRGlyUmVzdWx0LmZpbGVzLmxlbmd0aCAhPT0gMCAmJiAhcmVjdXJzaXZlKVxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ZvbGRlciBpcyBub3QgZW1wdHknKTtcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiByZWFkRGlyUmVzdWx0LmZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVBhdGggPSBgJHtwYXRofS8ke2VudHJ5Lm5hbWV9YDtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5T2JqID0gYXdhaXQgdGhpcy5zdGF0KHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgICAgICBpZiAoZW50cnlPYmoudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlKHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJtZGlyKHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnksIHJlY3Vyc2l2ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZGVsZXRlJywgW2Z1bGxQYXRoXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgZGlyZWN0b3J5IChub3QgcmVjdXJzaXZlKVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVhZGRpciBvcGVyYXRpb25cbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWRkaXIgZGlyZWN0b3J5IGxpc3RpbmcgcmVzdWx0XG4gICAgICovXG4gICAgYXN5bmMgcmVhZGRpcihvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucGF0aCAhPT0gJycgJiYgZW50cnkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdGb2xkZXIgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCB0aGlzLmRiSW5kZXhSZXF1ZXN0KCdieV9mb2xkZXInLCAnZ2V0QWxsS2V5cycsIFtJREJLZXlSYW5nZS5vbmx5KHBhdGgpXSk7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoZW50cmllcy5tYXAoYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdWJFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2VdKSk7XG4gICAgICAgICAgICBpZiAoc3ViRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1YkVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZSArICcvJ10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogZS5zdWJzdHJpbmcocGF0aC5sZW5ndGggKyAxKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzdWJFbnRyeS50eXBlLFxuICAgICAgICAgICAgICAgIHNpemU6IHN1YkVudHJ5LnNpemUsXG4gICAgICAgICAgICAgICAgY3RpbWU6IHN1YkVudHJ5LmN0aW1lLFxuICAgICAgICAgICAgICAgIG10aW1lOiBzdWJFbnRyeS5tdGltZSxcbiAgICAgICAgICAgICAgICB1cmk6IHN1YkVudHJ5LnBhdGgsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB7IGZpbGVzOiBmaWxlcyB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gZnVsbCBGaWxlIFVSSSBmb3IgYSBwYXRoIGFuZCBkaXJlY3RvcnlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHN0YXQgb3BlcmF0aW9uXG4gICAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHN0YXQgcmVzdWx0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0VXJpKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAgICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKTtcbiAgICAgICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aCArICcvJ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJpOiAoZW50cnkgPT09IG51bGwgfHwgZW50cnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVudHJ5LnBhdGgpIHx8IHBhdGgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBkYXRhIGFib3V0IGEgZmlsZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgc3RhdCBvcGVyYXRpb25cbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgc3RhdCByZXN1bHRcbiAgICAgKi9cbiAgICBhc3luYyBzdGF0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAgICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKTtcbiAgICAgICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aCArICcvJ10pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdFbnRyeSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICAgICAgICBzaXplOiBlbnRyeS5zaXplLFxuICAgICAgICAgICAgY3RpbWU6IGVudHJ5LmN0aW1lLFxuICAgICAgICAgICAgbXRpbWU6IGVudHJ5Lm10aW1lLFxuICAgICAgICAgICAgdXJpOiBlbnRyeS5wYXRoLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5hbWUgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVuYW1lIG9wZXJhdGlvblxuICAgICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVuYW1lIHJlc3VsdFxuICAgICAqL1xuICAgIGFzeW5jIHJlbmFtZShvcHRpb25zKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NvcHkob3B0aW9ucywgdHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjb3B5IG9wZXJhdGlvblxuICAgICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29weSByZXN1bHRcbiAgICAgKi9cbiAgICBhc3luYyBjb3B5KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvcHkob3B0aW9ucywgZmFsc2UpO1xuICAgIH1cbiAgICBhc3luYyByZXF1ZXN0UGVybWlzc2lvbnMoKSB7XG4gICAgICAgIHJldHVybiB7IHB1YmxpY1N0b3JhZ2U6ICdncmFudGVkJyB9O1xuICAgIH1cbiAgICBhc3luYyBjaGVja1Blcm1pc3Npb25zKCkge1xuICAgICAgICByZXR1cm4geyBwdWJsaWNTdG9yYWdlOiAnZ3JhbnRlZCcgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjYW4gcGVyZm9ybSBhIGNvcHkgb3IgYSByZW5hbWVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlbmFtZSBvcGVyYXRpb25cbiAgICAgKiBAcGFyYW0gZG9SZW5hbWUgd2hldGhlciB0byBwZXJmb3JtIGEgcmVuYW1lIG9yIGNvcHkgb3BlcmF0aW9uXG4gICAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBhc3luYyBfY29weShvcHRpb25zLCBkb1JlbmFtZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCB7IHRvRGlyZWN0b3J5IH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCB7IHRvLCBmcm9tLCBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnkgfSA9IG9wdGlvbnM7XG4gICAgICAgIGlmICghdG8gfHwgIWZyb20pIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdCb3RoIHRvIGFuZCBmcm9tIG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBubyBcInRvXCIgZGlyZWN0b3J5IGlzIHByb3ZpZGVkLCB1c2UgdGhlIFwiZnJvbVwiIGRpcmVjdG9yeVxuICAgICAgICBpZiAoIXRvRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICB0b0RpcmVjdG9yeSA9IGZyb21EaXJlY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnJvbVBhdGggPSB0aGlzLmdldFBhdGgoZnJvbURpcmVjdG9yeSwgZnJvbSk7XG4gICAgICAgIGNvbnN0IHRvUGF0aCA9IHRoaXMuZ2V0UGF0aCh0b0RpcmVjdG9yeSwgdG8pO1xuICAgICAgICAvLyBUZXN0IHRoYXQgdGhlIFwidG9cIiBhbmQgXCJmcm9tXCIgbG9jYXRpb25zIGFyZSBkaWZmZXJlbnRcbiAgICAgICAgaWYgKGZyb21QYXRoID09PSB0b1BhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdXJpOiB0b1BhdGgsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BhdGhQYXJlbnQoZnJvbVBhdGgsIHRvUGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUbyBwYXRoIGNhbm5vdCBjb250YWluIHRoZSBmcm9tIHBhdGgnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayB0aGUgc3RhdGUgb2YgdGhlIFwidG9cIiBsb2NhdGlvblxuICAgICAgICBsZXQgdG9PYmo7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0b09iaiA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICAgICAgICAgICAgcGF0aDogdG8sXG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUbyBsb2NhdGlvbiBkb2VzIG5vdCBleGlzdCwgZW5zdXJlIHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBcInRvXCIgbG9jYXRpb24gZXhpc3RzIGFuZCBpcyBhIGRpcmVjdG9yeVxuICAgICAgICAgICAgY29uc3QgdG9QYXRoQ29tcG9uZW50cyA9IHRvLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICB0b1BhdGhDb21wb25lbnRzLnBvcCgpO1xuICAgICAgICAgICAgY29uc3QgdG9QYXRoID0gdG9QYXRoQ29tcG9uZW50cy5qb2luKCcvJyk7XG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgY29udGFpbmluZyBkaXJlY3Rvcnkgb2YgdGhlIFwidG9cIiBsb2NhdGlvbiBleGlzdHNcbiAgICAgICAgICAgIGlmICh0b1BhdGhDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b1BhcmVudERpcmVjdG9yeSA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHRvUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodG9QYXJlbnREaXJlY3RvcnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZGlyZWN0b3J5IG9mIHRoZSB0byBwYXRoIGlzIGEgZmlsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5XG4gICAgICAgIGlmICh0b09iaiAmJiB0b09iai50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5IHdpdGggYSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIHRoZSBcImZyb21cIiBvYmplY3QgZXhpc3RzXG4gICAgICAgIGNvbnN0IGZyb21PYmogPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNldCB0aGUgbXRpbWUvY3RpbWUgb2YgdGhlIHN1cHBsaWVkIHBhdGhcbiAgICAgICAgY29uc3QgdXBkYXRlVGltZSA9IGFzeW5jIChwYXRoLCBjdGltZSwgbXRpbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gdGhpcy5nZXRQYXRoKHRvRGlyZWN0b3J5LCBwYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZnVsbFBhdGhdKSk7XG4gICAgICAgICAgICBlbnRyeS5jdGltZSA9IGN0aW1lO1xuICAgICAgICAgICAgZW50cnkubXRpbWUgPSBtdGltZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbZW50cnldKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3RpbWUgPSBmcm9tT2JqLmN0aW1lID8gZnJvbU9iai5jdGltZSA6IERhdGUubm93KCk7XG4gICAgICAgIHN3aXRjaCAoZnJvbU9iai50eXBlKSB7XG4gICAgICAgICAgICAvLyBUaGUgXCJmcm9tXCIgb2JqZWN0IGlzIGEgZmlsZVxuICAgICAgICAgICAgY2FzZSAnZmlsZSc6IHtcbiAgICAgICAgICAgICAgICAvLyBSZWFkIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWxseSByZW1vdmUgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBXcml0ZSB0aGUgZmlsZSB0byB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgY29uc3Qgd3JpdGVSZXN1bHQgPSBhd2FpdCB0aGlzLndyaXRlRmlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHRvLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmaWxlLmRhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgbXRpbWUvY3RpbWUgb2YgYSByZW5hbWVkIGZpbGVcbiAgICAgICAgICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlVGltZSh0bywgY3RpbWUsIGZyb21PYmoubXRpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gd3JpdGVSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdkaXJlY3RvcnknOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRvT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgbW92ZSBhIGRpcmVjdG9yeSBvdmVyIGFuIGV4aXN0aW5nIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRvIGRpcmVjdG9yeVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBDb3B5IHRoZSBtdGltZS9jdGltZSBvZiBhIHJlbmFtZWQgZGlyZWN0b3J5XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlVGltZSh0bywgY3RpbWUsIGZyb21PYmoubXRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGNvbnRlbnRzIG9mIHRoZSBmcm9tIGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudHMgPSAoYXdhaXQgdGhpcy5yZWFkZGlyKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgIH0pKS5maWxlcztcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGNvbnRlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgaXRlbSBmcm9tIHRoZSBmcm9tIGRpcmVjdG9yeSB0byB0aGUgdG8gZGlyZWN0b3J5XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NvcHkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogYCR7ZnJvbX0vJHtmaWxlbmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IGAke3RvfS8ke2ZpbGVuYW1lfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgfSwgZG9SZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPcHRpb25hbGx5IHJlbW92ZSB0aGUgb3JpZ2luYWwgZnJvbSBkaXJlY3RvcnlcbiAgICAgICAgICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5ybWRpcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVyaTogdG9QYXRoLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpc0Jhc2U2NFN0cmluZyhzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidG9hKGF0b2Ioc3RyKSkgPT0gc3RyO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkZpbGVzeXN0ZW1XZWIuX2RlYnVnID0gdHJ1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYi5qcy5tYXAiXSwibmFtZXMiOlsicmVzb2x2ZSIsImVudHJ5IiwidG9QYXRoIiwiY3RpbWUiXSwibWFwcGluZ3MiOiI7QUFDQSxTQUFTLFFBQVEsTUFBTTtBQUNuQixRQUFNLFFBQVEsS0FBSyxNQUFNLEdBQUcsRUFBRSxPQUFPLFVBQVEsU0FBUyxHQUFHO0FBQ3pELFFBQU0sV0FBVyxDQUFBO0FBQ2pCLFFBQU0sUUFBUSxVQUFRO0FBQ2xCLFFBQUksU0FBUyxRQUNULFNBQVMsU0FBUyxLQUNsQixTQUFTLFNBQVMsU0FBUyxPQUFPLE1BQU07QUFDeEMsZUFBUyxJQUFHO0FBQUEsSUFDZixPQUNJO0FBQ0QsZUFBUyxLQUFLLElBQUk7QUFBQSxJQUNyQjtBQUFBLEVBQ1QsQ0FBSztBQUNELFNBQU8sU0FBUyxLQUFLLEdBQUc7QUFDNUI7QUFDQSxTQUFTLGFBQWEsUUFBUSxVQUFVO0FBQ3BDLFdBQVMsUUFBUSxNQUFNO0FBQ3ZCLGFBQVcsUUFBUSxRQUFRO0FBQzNCLFFBQU0sU0FBUyxPQUFPLE1BQU0sR0FBRztBQUMvQixRQUFNLFNBQVMsU0FBUyxNQUFNLEdBQUc7QUFDakMsU0FBUSxXQUFXLFlBQ2YsT0FBTyxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQzlEO0FBQ08sTUFBTSxzQkFBc0IsVUFBVTtBQUFBLEVBQ3pDLGNBQWM7QUFDVixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLGFBQWE7QUFDbEIsU0FBSyxV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
