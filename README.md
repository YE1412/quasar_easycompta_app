# <img alt="CryptoLogique Logo" src="/public/icons/logo.svg" height="40"/> Quasar Easy-Compta App🔒

This is a web server side rendered (SSR) multi-platform application to generate invoices and manage your business datas through secure transactions.

## Dependencies

- Quasar : [![npm version](https://badge.fury.io/js/quasar.svg)](https://badge.fury.io/js/quasar)

- Capacitor/core : [![npm version](https://badge.fury.io/js/@capacitor%2Fcore.svg)](https://badge.fury.io/js/@capacitor%2Fcore)

- Axios: [![npm version](https://badge.fury.io/js/axios.svg)](https://badge.fury.io/js/axios)

- Pinia : [![npm version](https://badge.fury.io/js/pinia.svg)](https://badge.fury.io/js/pinia)

- Pinia-plugin-persistedstate : [![npm version](https://badge.fury.io/js/pinia-plugin-persistedstate.svg)](https://badge.fury.io/js/pinia-plugin-persistedstate)
 
- Sequelize : [![npm version](https://badge.fury.io/js/sequelize.svg)](https://badge.fury.io/js/sequelize)

- Vue : [![npm version](https://badge.fury.io/js/vue.svg)](https://badge.fury.io/js/vue)

- Vue-I18n : [![npm version](https://badge.fury.io/js/vue-i18n.svg)](https://badge.fury.io/js/vue-i18n)

- Vue-Router : [![npm version](https://badge.fury.io/js/vue-router.svg)](https://badge.fury.io/js/vue-router)

### Setup

 #### Web

 Change the **envs/.env.production** file with your server and database settings.

 **FIRST USE**

 Turn the *-INIT-* variable to **true** to initialize the main database datas.

 **Don't forget to change this variable to 'false' before restarting your web server.**

 `> npm run build:web`

 `> cd dist/ssr`

 `> npm install`

 `> npm run start` --> this line run the server

 #### Mobile

  - Ios : Build app for ios mobiles/tablets

  `> npm run build:ios`

  - Android : Build app for android mobiles and tablets

  `> npm run build:and`

## Usage
 
 ### Web

 Run the server.

 Go to your browser **%PUB_APP_URL%** page.

 *- <u>NOTE:</u> PUB_APP_URL is a environment variable, it can be found in envs/.env.production file-*

 ### Mobile

 Once builded, publish your app to the apple/play store, follow the [quasar doc](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/publishing-to-store).

 You can also use your app without plublish it to the store.

 Find it in the following path:

 - *-src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk-* for Android.
 - *-%MACOSLibraryFolder%/Developer/Xcode/DerivedData/App-%hash%/Build/Products/App-* for IOS with Xcode.
<!-- # Quasar Easy-Compta App (quasar-easy-compta-app)

A Quasar Framework App

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
 -->