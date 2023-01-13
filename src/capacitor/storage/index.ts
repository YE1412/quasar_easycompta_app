/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { createSQLiteConnection,
  importFromJSON,
  connectionsConsistency,
  createConnection,
  retrieveConnection,
  // setDB,
  isConnection,
  openDB,
  isOpenDB,
  query,
  run,
  closeConnection,
  closeDBConnection } from './sqliteStorage';
import { SQLiteDBConnection, capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';

export default async(importJson = false): SQLiteDBConnection | null => {
  // console.log('running through capacitor !');
  createSQLiteConnection();
  // if (platform == 'web'){
  //   await polyfills();
  //   await createJeepSQLiteElem();
  //   const connectionOpenned = await isConnection();
  //   console.log(connectionOpenned);
  //   let db = null;
  //   if (!connectionOpenned.result) {
  //     db = await importFromJSON();
  //     db = await createConnection();
  //     console.log(db);
  //   } else {
  //     db = await retrieveConnection();
  //     console.log(db);
  //   }
  //   const opennedDB = await openDB(db);
  //   console.log(opennedDB);
  // } else {
  const consistency = await connectionsConsistency();
  // console.log(consistency);
  const connectionOpenned = await isConnection();
  // console.log(connectionOpenned);
  let db = null;
  if (connectionOpenned.result && consistency.result) {
    db = await retrieveConnection();
    // console.log(db);
  } else {
    if (importJson)
      db = await importFromJSON();
    db = await createConnection();
    // console.log(db);
  }
  // console.log('return db !');
  return db;
  // const opennedDB = await openDB(db);
  // console.log(opennedDB);
  // const values = await query(db, 'SELECT * FROM langue');
  // console.log(values);
  // resolve();
  // languages.value = values.values;
  // }
};

export async function openDbConnection(db: SQLiteDBConnection): boolean {
  return await openDB(db);
};

export async function isDbConnectionOpen(db: SQLiteDBConnection): boolean {
  let ret = false;
  ret = await isOpenDB(db);
  if (ret !== null)
    return ret.result;
  else
    return false;
};

export async function newQuery(db: SQLiteDBConnection, q: string, val: any[] | undefined = undefined): DBSQLiteValues | null {
  return await query(db, q, val);
};

export async function newRun(db: SQLiteDBConnection, q: string, val: any[] | undefined = undefined, transac: boolean | undefined = undefined): capSQLiteChanges | null {
  return await run(db, q, val, transac)
    // .catch((err) => {
    //   console.log(err);
    // });
};

export function closeConnection(){
  closeConnection();
};

export function closeDbConnection(db: SQLiteDBConnection){
  closeDBConnection(db);
};