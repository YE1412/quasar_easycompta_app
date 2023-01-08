import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useUserStore } from 'app/src/stores/user';
import { useSessionStore } from 'app/src/stores/session';
import { useMessageStore } from 'app/src/stores/message';
import { i18n } from '../boot/i18n';
import routes from './routes';
import { Capacitor } from '@capacitor/core';

const plateform = Capacitor.getPlatform();
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
];

let router: any = null;

async function validateSession(sessionStore: any) {
  if (plateform === 'web'){
    return await sessionStore.validateSession();
  }
  else {
    return false;
  }
};
function isRealPath(to: string) {
  const ret = null;
  // console.log(i18n.global.locale.value);
  // console.log(`Obj path : `);
  for (const obj of pathsObj) {
    // console.log(t(obj.target));
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
function hasNecessaryRoute(to: any): boolean {
  let ret = false;
  // console.log('Routes ! --> ');
  // console.log(router.getRoutes());
  ret = router.hasRoute(to.name);
  return ret;
};

function generateRoute(to: any, pathObj: any): void {
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

async function checkForWeb(to: any, from: any, next: any) {
  const userStore = useUserStore();
  const sessionStore = useSessionStore();
  const messageStore = useMessageStore();
  i18n.global.locale.value = sessionStore.getLangDisplayed !== null
    ? sessionStore.getLangDisplayed.nom
    : 'en-US';
  // console.log(i18n.global.locale.value);
  const accessiblePath = isRealPath(to.fullPath);
  const hasRoute = hasNecessaryRoute(to);
  const requireAuth = to.meta.requiresAuth;

  let dest = '';
  // console.log('-------------------------------------');
  // console.log(`from --> `);
  // console.log(from);
  // console.log(`to --> `);
  // console.log(to);
  // console.log(`has route ? --> ${hasRoute}`);
  // console.log(`accessible ? --> `);
  // console.log(accessiblePath);
  // console.log(`require Auth ? --> ${requireAuth}`);
  console.log(`current Local --> ${sessionStore.getLangDisplayed.nom}`);
  // console.log('-------------------------------------');
  if (requireAuth) {
    // console.log(`Session Management: ${sessionStore.getSessionId}`);
    dest = await validateSession(sessionStore)
      .then(
        (res: any) => {
          // console.log(res);
          return "";
        },
        (rej: any) => {
          // console.log(rej);
          userStore.resetUser();
          messageStore.deleteMessages();
          return t("startLinkTarget");
        }
      )
      .catch((err: any) => {
        // console.log(err);
        return t("startLinkTarget");
      });
    // console.log(dest);
    dest !== "" ? next(dest) : next();
  } else if (!hasRoute && accessiblePath !== null) {
    // console.log('Generating route');
    generateRoute(to, accessiblePath);
    // trigger a redirection
    next(to.fullPath);
    // next();
  } else next();
};

async function checkForMobiles(to: any, from: any, next: any) {
  next();
};
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(async function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  router = await createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // router.beforeEach(async(to: any, from: any, next: any) => {
  //   if (plateform === "web") {
  //     await checkForWeb(to, from, next);
  //   }
  //   else {
  //     await checkForMobiles(to, from, next);
  //   }
  // });

  return router;
});
