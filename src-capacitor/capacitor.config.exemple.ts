import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'org.capacitor.quasar.easycompta',
	appName: 'Quasar Easy-Compta App',
	webDir: 'www',
	bundledWebRuntime: true,
	plugins: {
	    CapacitorSQLite: {
	      iosDatabaseLocation: "Library/CapacitorDatabase"
	    }
  	}
}

export default config;