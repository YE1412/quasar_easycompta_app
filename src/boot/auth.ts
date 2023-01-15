/*eslint @typescript-eslint/no-explicit-any: 'off'*/
/*eslint @typescript-eslint/no-unused-vars: off*/
// import { useUserStore } from 'app/src/stores/user';
// import { useSessionStore } from 'app/src/stores/session';
import sessionAxiosService from 'app/src/db/services/session.service';
// import { useMessageStore } from 'app/src/stores/message';
import { i18n } from 'app/src/boot/i18n';
// import routes from './routes';
// import { Capacitor } from '@capacitor/core';
import { Platform, Cookies } from 'quasar';
import * as prefs from 'app/src/capacitor/storage/preferences';

// const plateform = Capacitor.getPlatform();
const t = i18n.global.t;
// console.log(i18n.global.locale.value);
// const pathsObj = [
//   {
//     component: () => import('app/src/pages/StartPage.vue'),
//     auth: false,
//     target: 'startLinkTarget',
//     targetName: 'startLinkName',
//     title: 'startTitle',
//   },
//   {
//     component: () => import('app/src/pages/RegisterPage.vue'),
//     auth: false,
//     target: 'registerLinkTarget',
//     targetName: 'registerLinkName',
//     title: 'registerTitle',
//   },
//   {
//     component: () => import('app/src/pages/IndexPage.vue'),
//     auth: true,
//     target: 'homeLinkTarget',
//     targetName: 'homeLinkName',
//     title: 'homeTitle',
//   },
//   {
//     component: () => import('app/src/pages/IndexPage.vue'),
//     auth: true,
//     target: 'homeTerLinkTarget',
//     targetName: 'homeTerLinkName',
//     title: 'homeTitle',
//   },
//   {
//     component: () => import('app/src/pages/ProfilePage.vue'),
//     auth: true,
//     target: 'profileLinkTarget',
//     targetName: 'profileLinkName',
//     title: 'profileTitle',
//   },
// ];

// let router: any = null;

async function validateSession(sessionCookie: any, platform: any, sessionPref: any = null) {
  if (platform.is.desktop)
    return sessionAxiosService.validate(!!sessionCookie ? sessionCookie.sessionId : '');
  else {
    // const session = await prefs.getPref('session');
    if ((!!sessionPref && !!sessionCookie) && (sessionPref.sessionId === sessionCookie.sessionId))
      return true;
    else
      return false;
  }
};
// function isRealPath(to: string) {
//   const ret = null;
//   // console.log(i18n.global.locale.value);
//   // console.log(`Obj path : `);
//   for (const obj of pathsObj) {
//     // console.log(t(obj.target));
//     if (to === t(obj.target)) {
//       const ret = {};
//       ret.path = t(obj.target);
//       ret.component = obj.component;
//       ret.name = t(obj.targetName);
//       ret.auth = obj.auth;
//       ret.title = t(obj.title);
//       return ret;
//     }
//   }
//   return ret;
// };
function hasNecessaryRoute(to: any, router: any): boolean {
  let ret = false;
  // console.log('Routes ! --> ');
  // console.log(router.getRoutes());
  ret = router.hasRoute(to.name);
  return ret;
};

// function generateRoute(to: any, pathObj: any, router: any): void {
//   const comp = pathObj.component;
//   router.addRoute('Main', {
//     path: pathObj.path,
//     name: pathObj.name,
//     // route level code-splitting
//     // this generates a separate chunk (About.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: comp,
//     // component: () => import('app/src/pages/RegisterPage.vue'),
//     meta: {
//       title: pathObj.title,
//       // icon: icon,
//       requiresAuth: pathObj.auth,
//     },
//     children: pathObj.children,
//   });
// };

async function routingForServer(store: Store, cookie: any, from: any, to: any, router: any, platform: any): string | null{
  let sessionCookie = null, 
    userCookie = null,
    messageCookie = null;
  if (!!cookie.getAll().session){
    sessionCookie = JSON.parse(decodeURIComponent(cookie.getAll().session));
  }
  if (!!cookie.getAll().user){
    userCookie = JSON.parse(decodeURIComponent(cookie.getAll().user));
  }
  if (!!cookie.getAll().message){
    messageCookie = JSON.parse(decodeURIComponent(cookie.getAll().message));
  }
  i18n.global.locale.value = !!sessionCookie && !!sessionCookie.langDisplayed
    ? sessionCookie.langDisplayed.nom
    : 'en-US';
  // const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to, router);
  const requireAuth = to.meta.requiresAuth;
  // debugRoute(from, to, hasRoute, requireAuth, sessionCookie, userCookie, messageCookie);
  if (requireAuth && !!userCookie && !userCookie.connected) {
    // console.log(`Session Management: ${sessionStore.getSessionId}`);
    return await validateSession(sessionCookie, platform)
      .then(
        () => {
          // console.log('Session validate on server side !');
          if (!!userCookie.user 
            && Object.keys(userCookie.user).length
            && Object.getPrototypeOf(userCookie.user) === Object.prototype){
            userCookie.connected = true;
            cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
            return null;
          }
          else {
            messageCookie.messages = [{severity: true, content: t('session.results.ko')}];
            messageCookie.messagesVisibility = true;
            cookie.set('message', JSON.stringify(messageCookie), {path: '/', sameSite: 'Lax', secure: false});
            return t('startLinkTarget');
          }
        }
      )
      .catch(() => {
        // console.log('Session invalidate on server side !');
        userCookie.user = {};
        userCookie.connected = true;
        if (sessionCookie && sessionCookie.sessionId != ''){
          messageCookie.messages = [{severity: true, content: t('session.results.ko')}];
          messageCookie.messagesVisibility = true;
        }
        else {
          messageCookie.messages = [];
          messageCookie.messagesVisibility = false;
        }
        cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
        cookie.set('message', JSON.stringify(messageCookie), {path: '/', sameSite: 'Lax', secure: false});
        return t('startLinkTarget');
      });
  } 
  // else if (!hasRoute && accessiblePath !== null) {
  //   // console.log('Generate route !');
  //   generateRoute(to, accessiblePath, router);
  //   return (to.fullPath);
  // }
  else if(hasRoute && to.fullPath !== '/') {
    // console.log('Has Route !== \'/\' so Go on !');
    if (to.fullPath === t('startLinkTarget')){
      if (userCookie === null){
        userCookie = {};
        userCookie.user = {};
      }
      userCookie.connected = false;
      cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
    }
    return null;
  }
  else if(userCookie === null 
    || (!Object.keys(userCookie.user).length
    && Object.getPrototypeOf(userCookie.user) === Object.prototype)
    && hasRoute) {
    // console.log('UserCookie corrupted Go to start !');
    if (userCookie === null){
      userCookie = {};
      userCookie.user = {};
    }
    userCookie.connected = false;
    cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
    return t('startLinkTarget');
  }
  else return null;
};

async function routingForClient(store: Store, cookie: any, from: any, to: any, router: any, platform: any){
  let sessionCookie = null, 
    userCookie = null,
    messageCookie = null;
  if (!!cookie.getAll().session){
    sessionCookie = JSON.parse(decodeURIComponent(cookie.getAll().session));
  }
  if (!!cookie.getAll().user){
    userCookie = JSON.parse(decodeURIComponent(cookie.getAll().user));
  }
  if (!!cookie.getAll().message){
    messageCookie = JSON.parse(decodeURIComponent(cookie.getAll().message));
  }

  i18n.global.locale.value = !!sessionCookie && !!sessionCookie.langDisplayed
    ? sessionCookie.langDisplayed.nom
    : 'en-US';
  // const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to, router);
  const requireAuth = to.meta.requiresAuth;
  // debugRoute(from, to, hasRoute, requireAuth, sessionCookie, userCookie, messageCookie, store);
  if (requireAuth && !!userCookie && !userCookie.connected) {
    return await validateSession(sessionCookie, platform)
      .then(
        () => {
          // console.log('Session validate on client side !');
          if (!!userCookie.user 
            && Object.keys(userCookie.user).length
            && Object.getPrototypeOf(userCookie.user) === Object.prototype){
            store.user.connected = true;
            userCookie.connected = true;
            cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
            return null;
          }
          else{
            return t('startLinkTarget');
          }
        }
      )
      .catch(() => {
        // console.log('Session invalidate on client side !');
        if (!!store 
          && Object.keys(store).length
          && Object.getPrototypeOf(store) === Object.prototype){
          store.user.user = [];
          store.user.connected = false;
        }
        if (store.session && store.session.sessionId != ''){
          store.message.messages.push({
              severity: true,
              content: t('session.results.ko'),
            });
          store.message.messagesVisibility = true; 
        }
        else {
          if (!!store 
          && Object.keys(store).length
          && Object.getPrototypeOf(store) === Object.prototype){
            store.message.messages = [];
            store.message.messagesVisibility = false;
          }
        }
        return t('startLinkTarget');
      });
  } 
  // else if (!hasRoute && accessiblePath !== null) {
  //   // console.log('Generate route !');
  //   generateRoute(to, accessiblePath, router);
  //   return to.fullPath;
  // }
  else if(hasRoute && to.fullPath !== '/') {
    // console.log('Has Route !== \'/\' so Go on !');
    if (to.fullPath === t('startLinkTarget')){
      if (userCookie === null){
        userCookie = {};
        userCookie.user = {};
      }
      userCookie.connected = false;
      cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
    }
    return null;
  }
  else if(userCookie === null
    || (!Object.keys(userCookie.user).length
    && Object.getPrototypeOf(userCookie.user) === Object.prototype)
    && hasRoute) {
    // console.log('UserCookie corrupted Go to start !');
    if (userCookie === null){
      userCookie = {};
      userCookie.user = {};
    }
    userCookie.connected = false;
    cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
    return t('startLinkTarget');
  }
  else return null;
};

function debugRoute(from: any, to: any, hasRoute: boolean, requireAuth: boolean, sessionCookie: any, userCookie: any, messageCookie: any, store: Store = null){
  // DATAS DEBUG
  console.log('/---------------------------------\\');
  console.log('/---------------------------------\\');
  // ROUTE NAVIGATION DEBUG
  console.log('from --> ');
  console.log(from);
  console.log('to --> ');
  console.log(to);
  console.log(`has route ? --> ${hasRoute}`);
  // console.log('accessible ? --> ');
  // console.log(accessiblePath);
  console.log(`require Auth ? --> ${requireAuth}`);
  console.log(`current Local --> ${i18n.global.locale.value}`);
  console.log('/---------------------------------\\');
  if (import.meta.env.SSR){
    console.log('Cookie Session on the server --> ');
    console.log(sessionCookie);
    console.log('Cookie Message on the server --> ');
    console.log(messageCookie);
    console.log('Cookie User on the server --> ');
    console.log(userCookie);
  }
  else {
    console.log('Session Store on the client --> ');
    console.log(store.session);
    console.log('Message Store on the client --> ');
    console.log(store.message);
    console.log('User Store on the client --> ');
    console.log(store.user);
    console.log('/---------------------------------\\');
    console.log('Cookie Session on the client --> ');
    console.log(sessionCookie);
    console.log('Cookie Message on the client --> ');
    console.log(messageCookie);
    console.log('Cookie User on the client --> ');
    console.log(userCookie);
  }
  console.log('-------------------------------------');
  console.log('/---------------------------------\\\n\n');
};

async function checkForWeb(to: any, from: any, next: any, router: any, cookie: any, platform: any, store: Store = null) {
  let dest = null;
  if (import.meta.env.SSR){
    dest = await routingForServer(store, cookie, from, to, router, platform);
    // console.log(`Server dest --> ${dest}`);
  }
  else {
    dest = await routingForClient(store, cookie, from, to, router, platform);
    // console.log(`Client dest --> ${dest}`);
  }
  if(!!dest)
    next(dest);
  else
    next();
};

async function checkForMobiles(to: any, from: any, next: any, router: any, cookie: any, platform: any) {
  // console.log('Route Navigation For Mobiles !');
  let sessionCookie = null, userCookie = null;
  if (!!cookie.getAll().session){
    sessionCookie = JSON.parse(decodeURIComponent(cookie.getAll().session));
  }
  if (!!cookie.getAll().user){
    userCookie = JSON.parse(decodeURIComponent(cookie.getAll().user));
  }
  i18n.global.locale.value = !!sessionCookie && !!sessionCookie.langDisplayed
    ? sessionCookie.langDisplayed.nom
    : 'en-US';
  // const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to, router);
  const requireAuth = to.meta.requiresAuth;
  // debugRoute(from, to, hasRoute, requireAuth, sessionCookie, userCookie);
  if (requireAuth && !!userCookie && !userCookie.connected) {
    const sessionPref = await prefs.getPref('session');
    // console.log('Seesion Prefs');
    // console.log(sessionPref);
    const res = await validateSession(sessionCookie, platform, sessionPref);
    if (res){
      if (!!userCookie.user 
        && Object.keys(userCookie.user).length
        && Object.getPrototypeOf(userCookie.user) === Object.prototype){
        userCookie.connected = true;
        await prefs.setPref('user', userCookie);
        // cookie.set('user', JSON.stringify(userCookie), {path: '/', sameSite: 'Lax', secure: false});
        next();
      }
      else{
        await prefs.setPref('message', {
          messages: [
            {
              severity: true, 
              content: t('session.results.ko')
            }
          ],
          messagesVisibility: true
        });
        // cookie.set('message', JSON.stringify({messages: [{severity: true, content: t('session.results.ko')}], messagesVisibility: true}), {path: '/', sameSite: 'Lax', secure: false});
        next(t('startLinkTarget'));
      }
    }
    else {
      await prefs.setPref('user', {connected: false, user: {}});
      if (sessionCookie && sessionCookie.sessionId !== ''){
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('session.results.ko'),
            },
          ], 
          messagesVisibility: true
        });
      }
      else {
        await prefs.setPref('message', {
          messages: [], 
          messagesVisibility: false
        });
      }
      next(t('startLinkTarget'));
    }
  }
  // else if (!hasRoute && accessiblePath !== null) {
  //   // console.log('Generating route');
  //   generateRoute(to, accessiblePath, router);
  //   // trigger a redirection
  //   next(to.fullPath);
  // }
  else if (hasRoute && to.fullPath !== '/') {
    next();
  }
  else if(userCookie === null && hasRoute) {
    // console.log('Null user cookie !');
    next(t('startLinkTarget'));
  }
  else next();
};

export default ({ store, router, ssrContext }) => {
  // console.log(store.state.value);
	const platform = process.env.SERVER
		? Platform.parseSSR(ssrContext)
		: Platform;
	const cookies = process.env.SERVER
		? Cookies.parseSSR(ssrContext)
		: Cookies;
	router.beforeEach(async(to: any, from: any, next: any) => {
      if (platform.is.desktop) {
	      await checkForWeb(to, from, next, router, cookies, platform, store.state.value);
	    }
	    else {
	      await checkForMobiles(to, from, next, router, cookies, platform);
	    }
  	});
};