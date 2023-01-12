/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, capSQLiteResult, capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills } from 'jeep-sqlite/loader';
import { dataToImport } from './utils/import-from-json';

let sqlite: SQLiteConnection = null;
const db: SQLiteConnection = null;

const createSQLiteConnection = () => {
	sqlite = new SQLiteConnection(CapacitorSQLite);
};

const polyfills = async() => {
	applyPolyfills()
		.then(() => {
			jeepSqlite(window);
		});
};

const createJeepSQLiteElem = async () => {
	const jeepSQLite =  document.createElement('jeep-sqlite');
	document.body.appendChild(jeepSQLite);
	await customElements.whenDefined('jeep-sqlite');
	await sqlite.initWebStore();
	// const sqliteStore = await jeepSQLite.isStoreOpen()
	// console.log(`SqliteStore state : ${sqliteStore}`);
};
const importFromJSON = async (): any => {
	console.log('importFromJSON Call !');
	// console.log(dataToImport);
	let ret = 0;
	const res  = await sqlite.isJsonValid(JSON.stringify(dataToImport));
	if (res.result){
		ret = await sqlite.importFromJson(JSON.stringify(dataToImport));
	} else {
		console.log('> isJsonValid retuned false')
	}
	return ret;
};

const connectionsConsistency = async (): capSQLiteResult | null => {
	console.log('connectionsConsistency Call !');
	const ret = sqlite !== null 
		? await sqlite.checkConnectionsConsistency({dbNames: ['easy_compta'], openModes: ['RW']})
	 	: null;
	return ret;
};

const createConnection = async (): SQLiteDBConnection | null => {
	console.log('createConnection Call !');
	const ret =  sqlite !== null
		? await sqlite.createConnection('easy_compta', false, 'no-encryption', 9, false)
		: null;
	return ret;
};

const retrieveConnection = async (): SQLiteDBConnection | null => {
	console.log('Retrieve connection Call !');
	const ret = sqlite !== null
		? await sqlite.retrieveConnection('easy_compta', false)
		: null;
	return ret;
};

const isConnection = async (): capSQLiteResult | null => {
	console.log('isConnection Call !');
	const ret =  sqlite !== null
		? await sqlite.isConnection('easy_compta', false)
		: null;
	return ret;
};

const openDB = async (db: SQLiteDBConnection): boolean => {
	console.log('openDB Call !');
	// console.log(db);
	let ret = false;
	if (db !== null || db !== undefined){
		await db.open();
		ret = true;
	}
	return ret;
};

const isOpenDB = async(db: SQLiteDBConnection): capSQLiteResult | null => {
	console.log('isOpenDB Call !');
	let ret = null;
	if (db !== null || db !== undefined){
		ret = await db.isDBOpen();
	}
	// console.log(ret);
	return ret;
};

const closeConnection = async() => {
	console.log('closeConnection Call !');
	const ret = sqlite !== null
		? await sqlite.closeConnection('easy_compta', false)
		: null;
	return ret;
};

const closeDBConnection = async(db: SQLiteDBConnection) => {
	console.log('closeDBConnection Call !');
	const ret = db !== null
		? await db.close()
		: null;
	return ret;
};

const query = async(db: SQLiteDBConnection, sql: string, values?: any[] | undefined = undefined): DBSQLiteValues | null => {
	console.log('query Call !');
	let ret;
	if (values !== undefined){
		ret = db !== null 
			? await db.query(sql, values)
			: null ;
	} else {
		ret = db !== null 
			? await db.query(sql)
			: null ;
	}
	return ret;
    // console.log(`@@@ res.values.length ${res.values.length}`)
};

const run = async(db: SQLiteDBConnection, sql: string, values?: any[] | undefined = undefined, transaction?: boolean | undefined = undefined): capSQLiteChanges | null => {
	console.log('run Call !');
	const ret = db !== null 
		? await db.run(sql, values, transaction)
			.then((res) => {
				return res;
			})
			.catch((err) => {
		      console.log(err);
		      return null;
		    })
		: null ;
	return ret;
    // console.log(`@@@ res.values.length ${res.values.length}`)
};

export { polyfills,
	createSQLiteConnection, 
	createJeepSQLiteElem,
	importFromJSON,
	connectionsConsistency,
	createConnection,
	retrieveConnection,
	isConnection,
	openDB,
	isOpenDB,
	query,
	run,
	closeConnection,
	closeDBConnection };