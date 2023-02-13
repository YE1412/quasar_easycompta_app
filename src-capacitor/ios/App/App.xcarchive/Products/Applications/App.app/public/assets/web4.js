import { W as WebPlugin } from "./index.js";
class CapacitorSQLiteWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.jeepSqliteElement = null;
    this.isWebStoreOpen = false;
  }
  async initWebStore() {
    await customElements.whenDefined("jeep-sqlite");
    this.jeepSqliteElement = document.querySelector("jeep-sqlite");
    this.ensureJeepSqliteIsAvailable();
    this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress", (event) => {
      this.notifyListeners("sqliteImportProgressEvent", event.detail);
    });
    this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress", (event) => {
      this.notifyListeners("sqliteExportProgressEvent", event.detail);
    });
    if (!this.isWebStoreOpen) {
      this.isWebStoreOpen = await this.jeepSqliteElement.isStoreOpen();
    }
    return;
  }
  async saveToStore(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.saveToStore(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async echo(options) {
    this.ensureJeepSqliteIsAvailable();
    const echoResult = await this.jeepSqliteElement.echo(options);
    return echoResult;
  }
  async createConnection(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.createConnection(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async open(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.open(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async closeConnection(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.closeConnection(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getVersion(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const versionResult = await this.jeepSqliteElement.getVersion(options);
      return versionResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async checkConnectionsConsistency(options) {
    this.ensureJeepSqliteIsAvailable();
    try {
      console.log(`in web checkConnectionsConsistency: ${JSON.stringify(options)}`);
      const consistencyResult = await this.jeepSqliteElement.checkConnectionsConsistency(options);
      return consistencyResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async close(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.close(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getTableList(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const tableListResult = await this.jeepSqliteElement.getTableList(options);
      return tableListResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async execute(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const executeResult = await this.jeepSqliteElement.execute(options);
      return executeResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async executeSet(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const executeResult = await this.jeepSqliteElement.executeSet(options);
      return executeResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async run(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const runResult = await this.jeepSqliteElement.run(options);
      return runResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async query(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const queryResult = await this.jeepSqliteElement.query(options);
      return queryResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async isDBExists(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const dbExistsResult = await this.jeepSqliteElement.isDBExists(options);
      return dbExistsResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async isDBOpen(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const isDBOpenResult = await this.jeepSqliteElement.isDBOpen(options);
      return isDBOpenResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async isDatabase(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const isDatabaseResult = await this.jeepSqliteElement.isDatabase(options);
      return isDatabaseResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async isTableExists(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const tableExistsResult = await this.jeepSqliteElement.isTableExists(options);
      return tableExistsResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async deleteDatabase(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.deleteDatabase(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async isJsonValid(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const isJsonValidResult = await this.jeepSqliteElement.isJsonValid(options);
      return isJsonValidResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async importFromJson(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const importFromJsonResult = await this.jeepSqliteElement.importFromJson(options);
      return importFromJsonResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async exportToJson(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const exportToJsonResult = await this.jeepSqliteElement.exportToJson(options);
      return exportToJsonResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createSyncTable(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const createSyncTableResult = await this.jeepSqliteElement.createSyncTable(options);
      return createSyncTableResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async setSyncDate(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.setSyncDate(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getSyncDate(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const getSyncDateResult = await this.jeepSqliteElement.getSyncDate(options);
      return getSyncDateResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async deleteExportedRows(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.deleteExportedRows(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async addUpgradeStatement(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.addUpgradeStatement(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async copyFromAssets(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.copyFromAssets(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getFromHTTPRequest(options) {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      await this.jeepSqliteElement.getFromHTTPRequest(options);
      return;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getDatabaseList() {
    this.ensureJeepSqliteIsAvailable();
    this.ensureWebstoreIsOpen();
    try {
      const databaseListResult = await this.jeepSqliteElement.getDatabaseList();
      return databaseListResult;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  ensureJeepSqliteIsAvailable() {
    if (this.jeepSqliteElement === null) {
      throw new Error(`The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.`);
    }
  }
  ensureWebstoreIsOpen() {
    if (!this.isWebStoreOpen) {
      throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.');
    }
  }
  async getUrl() {
    throw this.unimplemented("Not implemented on web.");
  }
  async getMigratableDbList(options) {
    console.log("getMigratableDbList", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async addSQLiteSuffix(options) {
    console.log("addSQLiteSuffix", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async deleteOldDatabases(options) {
    console.log("deleteOldDatabases", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async moveDatabasesAndAddSuffix(options) {
    console.log("moveDatabasesAndAddSuffix", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async isSecretStored() {
    throw this.unimplemented("Not implemented on web.");
  }
  async setEncryptionSecret(options) {
    console.log("setEncryptionSecret", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async changeEncryptionSecret(options) {
    console.log("changeEncryptionSecret", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async clearEncryptionSecret() {
    console.log("clearEncryptionSecret");
    throw this.unimplemented("Not implemented on web.");
  }
  async getNCDatabasePath(options) {
    console.log("getNCDatabasePath", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async createNCConnection(options) {
    console.log("createNCConnection", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async closeNCConnection(options) {
    console.log("closeNCConnection", options);
    throw this.unimplemented("Not implemented on web.");
  }
  async isNCDatabase(options) {
    console.log("isNCDatabase", options);
    throw this.unimplemented("Not implemented on web.");
  }
}
export { CapacitorSQLiteWeb };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3ItY29tbXVuaXR5L3NxbGl0ZS9kaXN0L2VzbS93ZWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JTUUxpdGVXZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmplZXBTcWxpdGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1dlYlN0b3JlT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgICBhc3luYyBpbml0V2ViU3RvcmUoKSB7XG4gICAgICAgIGF3YWl0IGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKCdqZWVwLXNxbGl0ZScpO1xuICAgICAgICB0aGlzLmplZXBTcWxpdGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignamVlcC1zcWxpdGUnKTtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdqZWVwU3FsaXRlSW1wb3J0UHJvZ3Jlc3MnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCdzcWxpdGVJbXBvcnRQcm9ncmVzc0V2ZW50JywgZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignamVlcFNxbGl0ZUV4cG9ydFByb2dyZXNzJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygnc3FsaXRlRXhwb3J0UHJvZ3Jlc3NFdmVudCcsIGV2ZW50LmRldGFpbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuaXNXZWJTdG9yZU9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNXZWJTdG9yZU9wZW4gPSBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmlzU3RvcmVPcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhc3luYyBzYXZlVG9TdG9yZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuc2F2ZVRvU3RvcmUob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBlY2hvKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgY29uc3QgZWNob1Jlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZWNobyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGVjaG9SZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZUNvbm5lY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmNyZWF0ZUNvbm5lY3Rpb24ob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBvcGVuKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5vcGVuKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xvc2VDb25uZWN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5jbG9zZUNvbm5lY3Rpb24ob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRWZXJzaW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdmVyc2lvblJlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZ2V0VmVyc2lvbihvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2hlY2tDb25uZWN0aW9uc0NvbnNpc3RlbmN5KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBpbiB3ZWIgY2hlY2tDb25uZWN0aW9uc0NvbnNpc3RlbmN5OiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWApO1xuICAgICAgICAgICAgY29uc3QgY29uc2lzdGVuY3lSZXN1bHQgPSBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmNoZWNrQ29ubmVjdGlvbnNDb25zaXN0ZW5jeShvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBjb25zaXN0ZW5jeVJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5jbG9zZShvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldFRhYmxlTGlzdChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlTGlzdFJlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZ2V0VGFibGVMaXN0KG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRhYmxlTGlzdFJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGV4ZWN1dGUob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRlUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5leGVjdXRlKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGVSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBleGVjdXRlU2V0KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZXhlY3V0ZVJlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZXhlY3V0ZVNldChvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcnVuKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcnVuUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5ydW4ob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gcnVuUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcXVlcnkob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeVJlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQucXVlcnkob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0RCRXhpc3RzKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGJFeGlzdHNSZXN1bHQgPSBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmlzREJFeGlzdHMob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZGJFeGlzdHNSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0RCT3BlbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGlzREJPcGVuUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5pc0RCT3BlbihvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBpc0RCT3BlblJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGlzRGF0YWJhc2Uob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBpc0RhdGFiYXNlUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5pc0RhdGFiYXNlKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGlzRGF0YWJhc2VSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc1RhYmxlRXhpc3RzKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVFeGlzdHNSZXN1bHQgPSBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmlzVGFibGVFeGlzdHMob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVFeGlzdHNSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBkZWxldGVEYXRhYmFzZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZGVsZXRlRGF0YWJhc2Uob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0pzb25WYWxpZChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGlzSnNvblZhbGlkUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5pc0pzb25WYWxpZChvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBpc0pzb25WYWxpZFJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGltcG9ydEZyb21Kc29uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0RnJvbUpzb25SZXN1bHQgPSBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmltcG9ydEZyb21Kc29uKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydEZyb21Kc29uUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZXhwb3J0VG9Kc29uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZXhwb3J0VG9Kc29uUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5leHBvcnRUb0pzb24ob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0VG9Kc29uUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlU3luY1RhYmxlKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlU3luY1RhYmxlUmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5jcmVhdGVTeW5jVGFibGUob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlU3luY1RhYmxlUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc2V0U3luY0RhdGUob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LnNldFN5bmNEYXRlKG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0U3luY0RhdGUob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBnZXRTeW5jRGF0ZVJlc3VsdCA9IGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuZ2V0U3luY0RhdGUob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0U3luY0RhdGVSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBkZWxldGVFeHBvcnRlZFJvd3Mob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmRlbGV0ZUV4cG9ydGVkUm93cyhvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZFVwZ3JhZGVTdGF0ZW1lbnQob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmFkZFVwZ3JhZGVTdGF0ZW1lbnQob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjb3B5RnJvbUFzc2V0cyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlSmVlcFNxbGl0ZUlzQXZhaWxhYmxlKCk7XG4gICAgICAgIHRoaXMuZW5zdXJlV2Vic3RvcmVJc09wZW4oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQuY29weUZyb21Bc3NldHMob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRGcm9tSFRUUFJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpO1xuICAgICAgICB0aGlzLmVuc3VyZVdlYnN0b3JlSXNPcGVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmplZXBTcWxpdGVFbGVtZW50LmdldEZyb21IVFRQUmVxdWVzdChvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldERhdGFiYXNlTGlzdCgpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVKZWVwU3FsaXRlSXNBdmFpbGFibGUoKTtcbiAgICAgICAgdGhpcy5lbnN1cmVXZWJzdG9yZUlzT3BlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGF0YWJhc2VMaXN0UmVzdWx0ID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5nZXREYXRhYmFzZUxpc3QoKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhYmFzZUxpc3RSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGBqZWVwLXNxbGl0ZWAgZWxlbWVudCBpcyBwcmVzZW50IGluIHRoZSBET00uXG4gICAgICogSWYgaXQncyBub3QgaW4gdGhlIERPTSwgdGhpcyBtZXRob2QgdGhyb3dzIGFuIEVycm9yLlxuICAgICAqXG4gICAgICogQXR0ZW50aW9uOiBUaGlzIHdpbGwgYWx3YXlzIGZhaWwsIGlmIHRoZSBgaW50V2ViU3RvcmUoKWAgbWV0aG9kIHdhc24ndCBjYWxsZWQgYmVmb3JlLlxuICAgICAqL1xuICAgIGVuc3VyZUplZXBTcWxpdGVJc0F2YWlsYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuamVlcFNxbGl0ZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGplZXAtc3FsaXRlIGVsZW1lbnQgaXMgbm90IHByZXNlbnQgaW4gdGhlIERPTSEgUGxlYXNlIGNoZWNrIHRoZSBAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUgZG9jdW1lbnRhdGlvbiBmb3IgaW5zdHJ1Y3Rpb25zIHJlZ2FyZGluZyB0aGUgd2ViIHBsYXRmb3JtLmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVuc3VyZVdlYnN0b3JlSXNPcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNXZWJTdG9yZU9wZW4pIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgKCF0aGlzLmlzV2ViU3RvcmVPcGVuKVxuICAgICAgICAgICAgICB0aGlzLmlzV2ViU3RvcmVPcGVuID0gYXdhaXQgdGhpcy5qZWVwU3FsaXRlRWxlbWVudC5pc1N0b3JlT3BlbigpO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlN0b3JlIGlzIG5vdCBvcGVuIHlldC4gWW91IGhhdmUgdG8gY2FsbCBcImluaXRXZWJTdG9yZSgpXCIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vIFVOSU1QTEVNRU5URUQgTUVUSE9EU1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGFzeW5jIGdldFVybCgpIHtcbiAgICAgICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICAgIH1cbiAgICBhc3luYyBnZXRNaWdyYXRhYmxlRGJMaXN0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldE1pZ3JhdGFibGVEYkxpc3QnLCBvcHRpb25zKTtcbiAgICAgICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICAgIH1cbiAgICBhc3luYyBhZGRTUUxpdGVTdWZmaXgob3B0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkU1FMaXRlU3VmZml4Jywgb3B0aW9ucyk7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlT2xkRGF0YWJhc2VzKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZU9sZERhdGFiYXNlcycsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIG1vdmVEYXRhYmFzZXNBbmRBZGRTdWZmaXgob3B0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygnbW92ZURhdGFiYXNlc0FuZEFkZFN1ZmZpeCcsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIGlzU2VjcmV0U3RvcmVkKCkge1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIHNldEVuY3J5cHRpb25TZWNyZXQob3B0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0RW5jcnlwdGlvblNlY3JldCcsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIGNoYW5nZUVuY3J5cHRpb25TZWNyZXQob3B0aW9ucykge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlRW5jcnlwdGlvblNlY3JldCcsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyRW5jcnlwdGlvblNlY3JldCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsZWFyRW5jcnlwdGlvblNlY3JldCcpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIGdldE5DRGF0YWJhc2VQYXRoKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldE5DRGF0YWJhc2VQYXRoJywgb3B0aW9ucyk7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlTkNDb25uZWN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZU5DQ29ubmVjdGlvbicsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxuICAgIGFzeW5jIGNsb3NlTkNDb25uZWN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Nsb3NlTkNDb25uZWN0aW9uJywgb3B0aW9ucyk7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG4gICAgYXN5bmMgaXNOQ0RhdGFiYXNlKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2lzTkNEYXRhYmFzZScsIG9wdGlvbnMpO1xuICAgICAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViLmpzLm1hcCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ08sTUFBTSwyQkFBMkIsVUFBVTtBQUFBLEVBQzlDLGNBQWM7QUFDVixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLG9CQUFvQjtBQUN6QixTQUFLLGlCQUFpQjtBQUFBLEVBQ3pCO0FBQUEsRUFDRCxNQUFNLGVBQWU7QUFDakIsVUFBTSxlQUFlLFlBQVksYUFBYTtBQUM5QyxTQUFLLG9CQUFvQixTQUFTLGNBQWMsYUFBYTtBQUM3RCxTQUFLLDRCQUEyQjtBQUNoQyxTQUFLLGtCQUFrQixpQkFBaUIsNEJBQTRCLENBQUMsVUFBVTtBQUMzRSxXQUFLLGdCQUFnQiw2QkFBNkIsTUFBTSxNQUFNO0FBQUEsSUFDMUUsQ0FBUztBQUNELFNBQUssa0JBQWtCLGlCQUFpQiw0QkFBNEIsQ0FBQyxVQUFVO0FBQzNFLFdBQUssZ0JBQWdCLDZCQUE2QixNQUFNLE1BQU07QUFBQSxJQUMxRSxDQUFTO0FBQ0QsUUFBSSxDQUFDLEtBQUssZ0JBQWdCO0FBQ3RCLFdBQUssaUJBQWlCLE1BQU0sS0FBSyxrQkFBa0IsWUFBVztBQUFBLElBQ2pFO0FBQ0Q7QUFBQSxFQUNIO0FBQUEsRUFDRCxNQUFNLFlBQVksU0FBUztBQUN2QixTQUFLLDRCQUEyQjtBQUNoQyxTQUFLLHFCQUFvQjtBQUN6QixRQUFJO0FBQ0EsWUFBTSxLQUFLLGtCQUFrQixZQUFZLE9BQU87QUFDaEQ7QUFBQSxJQUNILFNBQ00sS0FBUDtBQUNJLFlBQU0sSUFBSSxNQUFNLEdBQUcsS0FBSztBQUFBLElBQzNCO0FBQUEs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
