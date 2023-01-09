import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
	appId: 'org.capacitor.quasar.easycompta',
	appName: 'Quasar Easy-Compta App',
	webDir: 'www',
	bundledWebRuntime: true,
	plugins: {
	    CapacitorSQLite: {
	      iosDatabaseLocation: "Library/CapacitorDatabase"
	    },
	    Keyboard: {
	    	resize: KeyboardResize.Body,
	    	style: KeyboardStyle.Dark,
	    	resizeOnFullScreen: true,
	    }
  	},
  	loggingBehavior: "production",
}

export default config;