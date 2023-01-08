import { useUserStore } from 'app/src/stores/user';
import { useSessionStore } from 'app/src/stores/session';
import sessionAxiosService from 'app/src/db/services/session.service';
import { useMessageStore } from 'app/src/stores/message';
import { i18n } from 'app/src/boot/i18n';
// import routes from './routes';
// import { Capacitor } from '@capacitor/core';
import { Platform, Cookies } from 'quasar';
import * as prefs from 'app/src/capacitor/storage/preferences';

// const plateform = Capacitor.getPlatform();
const t = i18n.global.t;
// console.log(i18n.global.locale.value);
const pathsObj = [
  {
    component: () => import('app/src/pages/StartPage.vue'),
    auth: false,
    target: 'startLinkTarget',
    targetName: 'startLinkName',
  },
  {
    component: () => import('app/src/pages/RegisterPage.vue'),
    auth: false,
    target: 'registerLinkTarget',
    targetName: 'registerLinkName',
  },
  {
    component: () => import('app/src/pages/IndexPage.vue'),
    auth: true,
    target: 'homeLinkTarget',
    targetName: 'homeLinkName',
  },
  {
    component: () => import('app/src/pages/IndexPage.vue'),
    auth: true,
    target: 'homeTerLinkTarget',
    targetName: 'homeTerLinkName',
  },
  {
    component: () => import('app/src/pages/ProfilePage.vue'),
    auth: true,
    target: 'profileLinkTarget',
    targetName: 'profileLinkName',
  },
];

let router: any = null;

async function validateSession(cookie: any, platform: any) {
  if (platform.is.desktop)
    return sessionAxiosService.validate(!!cookie ? cookie.sessionId : '');
  else {
    const session = await prefs.getPref('session');
    if ((!!session && !!cookie) && (session.sessionId === cookie.sessionId))
      return true;
    else
      return false;
  }
};
function isRealPath(to: string) {
  const ret = null;
  // console.log(i18n.global.locale.value);
  // console.log(`Obj path : `);
  for (const obj of pathsObj) {
    console.log(t(obj.target));
    if (to === t(obj.target)) {
      let ret = {};
      ret.path = t(obj.target);
      ret.component = obj.component;
      ret.name = t(obj.targetName);
      ret.auth = obj.auth;
      return ret;
    }
  }
  return ret;
};
function hasNecessaryRoute(to: any, router: any): boolean {
  let ret = false;
  // console.log('Routes ! --> ');
  // console.log(router.getRoutes());
  ret = router.hasRoute(to.name);
  return ret;
};

function generateRoute(to: any, pathObj: any, router: any): void {
  const comp = pathObj.component;
  router.addRoute('Main', {
    path: pathObj.path,
    name: pathObj.name,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: comp,
    // component: () => import('app/src/pages/RegisterPage.vue'),
    meta: {
      title: pathObj.name,
      // icon: icon,
      requiresAuth: pathObj.auth,
    },
    children: pathObj.children,
  });
};

async function checkForWeb(to: any, from: any, next: any, router: any, cookie: any, platform: any) {
  const userStore = useUserStore();
  // const sessionStore = useSessionStore();
  const messageStore = useMessageStore();
  // console.log(JSON.parse(decodeURIComponent(cookie.getAll().user)).connected);
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
  const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to, router);
  const requireAuth = to.meta.requiresAuth;

  console.log('-------------------------------------');
  console.log(`from --> `);
  console.log(from);
  console.log(`to --> `);
  console.log(to);
  console.log(`has route ? --> ${hasRoute}`);
  console.log(`accessible ? --> `);
  console.log(accessiblePath);
  console.log(`require Auth ? --> ${requireAuth}`);
  console.log('Cookie Session --> ')
  console.log(sessionCookie);
  console.log('Cookie User --> ')
  console.log(userCookie);
  console.log(`current Local --> ${i18n.global.locale.value}`);
  console.log('-------------------------------------');
  if (requireAuth) {
    // console.log(`Session Management: ${sessionStore.getSessionId}`);
    await validateSession(sessionCookie, platform)
      .then(
        (res: any) => {
          // console.log(res);
          if (userCookie!== null && userCookie.connected)
            next();
          else
            next(t("startLinkTarget"));
        }
      )
      .catch((err: any) => {
        console.log('Err --> ');
        // console.log(err);
        userStore.reset();
        cookie.set('user', JSON.stringify({connected: false, user: {}}), {path: '/', sameSite: 'Lax', secure: false});
        console.log(cookie.getAll());
        next(t("startLinkTarget"));
      });
  } 
  else if (!hasRoute && accessiblePath !== null) {
    // console.log('Generating route');
    generateRoute(to, accessiblePath, router);
    // trigger a redirection
    next(to.fullPath);
  } 
  else next();
};

async function checkForMobiles(to: any, from: any, next: any, router: any, cookie: any, platform: any) {
  console.log('Check Route Accessibility for mobiles !');
  // console.log(cookie.getAll());
  // console.log(JSON.parse(decodeURIComponent(cookie.getAll().session)));
  // console.log(JSON.parse(decodeURIComponent(cookie.getAll().user)));
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
  const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to, router);
  const requireAuth = to.meta.requiresAuth;

  console.log('-------------------------------------');
  console.log(`from --> `);
  console.log(from.fullPath);
  console.log(`to --> `);
  console.log(to.fullPath);
  console.log(`has route ? --> ${hasRoute}`);
  console.log(`accessible ? --> `);
  console.log(accessiblePath);
  console.log(`require Auth ? --> ${requireAuth}`);
  console.log('Cookie Session --> ')
  console.log(sessionCookie);
  console.log('Cookie User --> ')
  console.log(userCookie);
  console.log(`current Local --> ${i18n.global.locale.value}`);
  console.log('-------------------------------------');

  if (requireAuth) {
    // console.log(await validateSession(sessionCookie, platform));
    const res = await validateSession(sessionCookie, platform);
    // console.log(res);
      // .then(
      //   (res: any) => {
      //     console.log(res);
      //     if (!!userCookie && userCookie.connected)
      //       next();
      //     else
      //       next(t("startLinkTarget"));
      //   }
      // )
      // .catch(async (err: any) => {
      //   console.log('Err --> ');
      //   console.log(err);
      //   // userStore.reset();
      //   await prefs.setPref('user', {connected: false, user: {}});
      //   console.log(decodeURIComponent(cookie.getAll().user));
      //   next(t("startLinkTarget"));
      // });
    if (res){
      // console.log(res);
      if (!!userCookie && userCookie.connected)
        next();
      else
        next(t("startLinkTarget"));
    }
    else {
      console.log('Err --> ');
      // console.log(err);
      // userStore.reset();
      await prefs.setPref('user', {connected: false, user: {}});
      console.log(decodeURIComponent(cookie.getAll().user));
      next(t("startLinkTarget"));
    }
  }
  else if (!hasRoute && accessiblePath !== null) {
    // console.log('Generating route');
    generateRoute(to, accessiblePath, router);
    // trigger a redirection
    next(to.fullPath);
  } 
  else next();
};

export default ({ store, router, ssrContext }) => {
	const platform = process.env.SERVER
		? Platform.parseSSR(ssrContext)
		: Platform;
	const cookies = process.env.SERVER
		? Cookies.parseSSR(ssrContext)
		: Cookies;
	// console.log(platform);
	router.beforeEach(async(to: any, from: any, next: any) => {
	    // console.log('Route Navigation !');
      if (platform.is.desktop) {
	      await checkForWeb(to, from, next, router, cookies, platform);
	    }
	    else {
	      await checkForMobiles(to, from, next, router, cookies, platform);
	    }
  	});
};