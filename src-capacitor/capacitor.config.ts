/// <reference types="@capacitor/splash-screen" />
/// <reference types="@capacitor-community/sqlite" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'org.capacitor.quasar.easycompta',
	appName: 'EasyCompta',
	webDir: 'www',
	bundledWebRuntime: true,
	plugins: {
	    CapacitorSQLite: {
	      iosDatabaseLocation: "Library/CapacitorDatabase"
	    },
	    SplashScreen: {
    		launchShowDuration: 3000,
    		launchAutoHide: true,
    		androidScaleType: 'CENTER_CROP',
    		splashFullScreen: true,
    		splashImmersive: true
	    },
	    CapacitorCookies: {
	    	enabled: true
	    }
  	},
  	loggingBehavior: "production",
}

export default config;