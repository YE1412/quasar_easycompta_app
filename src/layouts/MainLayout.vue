<template>
  <q-layout :view="(compact ? 'lHh' : 'lhh') +' Lpr lff'">
    <q-header class="frosted-glass" elevated>
      <q-toolbar class="full-width justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
          v-if="connected"
        />
        <q-btn
          v-if="route.path.search(/(admin)$/gi) !== -1"
          flat
          round
          icon="chevron_left"
          @click="router.go(-1)">
        </q-btn>
        <q-separator color="dark" vertical inset  v-if="connected" 
        />

        <q-item
          clickable
          :dense="compact"
          style="padding: 2px 0 2px 16px"
        >
          <q-btn
            flat
            :to="{name: connected ? t('homeLinkName') : t('startLinkName')}"
            padding="0 0">
            <q-item-section
              avatar
            >
              <!-- <q-avatar> -->
                <img :src="faviconSrc" height="32" width="32" />
              <!-- </q-avatar> -->
            </q-item-section>
          </q-btn>
        </q-item>

        <q-space v-if="!compact"/>

        <q-item clickable class="float-right" :dense="compact" :style="compact ? 'padding: 0;' : ''">
          <q-btn-dropdown stretch flat fab fab-mini :label="!compact ? t('toolbar.languageLabel') : ''" 
            padding="16px 0">
            <q-list>
              <q-item-label header>
                {{ t('toolbar.dropdownHeader') }}
              </q-item-label>
              <q-item clickable v-close-popup tabindex="0" v-for="lang in languages" :key="lang.langueId" @click="changeLanguage(lang.nom)">
                <q-item-section avatar>
                  <span :class="`fi fi-${classAssoc[lang.nom].class}`"></span>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ lang.libelle }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-no-ssr>
            <q-item-section avatar style="padding: 0">
              <span :class="`fi fi-${classAssoc[displayedLanguage.nom].class}`"></span>
            </q-item-section>
          </q-no-ssr>
        </q-item>
        <!--<div class="float-right">Quasar v{{ $q.version }}</div>-->
        <div class="float-right">
          <q-btn flat stretch v-if="connected" icon="mdi-logout" :label="!compact ? t('startComponent.libelles.logout') : ''" @click="logout" />
          <router-link :to="{name: t('registerLinkName')}" style="text-decoration: none;color: black;">
            <q-btn flat stretch v-if="!connected" icon="mdi-account-plus" :label="!compact ? t('startComponent.libelles.signUp') : ''" />
          </router-link>  
        </div>
      </q-toolbar>

      <q-tabs v-model="tab" v-if="connected">
        <q-tab name="home">
          <q-item clickable>
            <router-link :to="{name: t('homeLinkName')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-home"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('homeTitle') }}</q-item-label>
              </q-item-section>
            </router-link>
          </q-item>
          <!-- <q-separator color="dark" vertical inset /> -->
        </q-tab>
        <q-tab name="profile">
          <q-item clickable>
            <router-link :to="{name: t('profileLinkName')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-card-account-details"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('profileTitle') }}</q-item-label>
              </q-item-section>
            </router-link>
          </q-item>
          <!-- <q-separator color="dark" vertical inset /> -->
        </q-tab>
        <q-tab name="about">
          <q-item clickable>
            <router-link :to="{name: t('aboutLinkName')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-information"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('aboutTitle') }}</q-item-label>
              </q-item-section>
            </router-link>
          </q-item>
        </q-tab>

        <!-- <q-space /> -->

        <!-- <q-separator dark vertical inset /> -->

        <!-- <q-toolbar-title>
          Quasar App For Advanced
        </q-toolbar-title> -->
      </q-tabs>  
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="connected && renderComponent"
    >
      <q-list>
        <q-item-label
          header
        >
          {{ t('drawer.title') }}
        </q-item-label>

        <ComptaLink
          v-for="link in comptaLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <Suspense> -->
        <router-view @change-tab="tabChanges" :dbConn="db" v-if="renderComponent"/>
      <!-- </Suspense> -->
    </q-page-container>

    <q-footer class="frosted-glass" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex flex-center">
            <q-list :separator="false" :bordered="false" class="q-py-sm">
              <q-item style="padding: 0;">
                <q-item-section class="content-center">
                  <q-item-label>
                    Easy-Compta
                  </q-item-label>
                </q-item-section> 
              </q-item>
              <q-item style="padding: 0;height: fit-content;flex-wrap: wrap;align-content: center;" class="text-grey" v-if="connected">
                <q-item-section style="height: fit-content;">
                  <q-tabs no-caps active-color="primary" indicator-color="transparent" v-model="tab" style="min-height: unset;height: fit-content;">
                    <q-tab name="home" style="min-height: unset;height: fit-content;">
                      <q-item :clickable="false" exact :to="{name: t('homeLinkName')}" style="padding: 0;height: fit-content;min-height: unset;">
                        <q-item-section style="justify-content: start;">
                          <q-item-label :style="'font-size: 14px;line-height: 1.715em;font-weight: 500;'">
                            {{ t('homeTitle') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-tab>
                    <q-tab name="profile" style="min-height: unset;height: fit-content;">
                      <q-item :clickable="false" exact :to="{name: t('profileLinkName')}" style="padding: 0;height: fit-content;min-height: unset;">
                        <q-item-section style="justify-content: start;">
                          <q-item-label :style="'font-size: 14px;line-height: 1.715em;font-weight: 500;'">
                            {{ t('profileTitle') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-tab>
                    <q-tab name="about" style="min-height: unset;height: fit-content;">
                      <q-item :clickable="false" exact :to="{name: t('aboutLinkName')}" style="padding: 0;height: fit-content;min-height: unset;">
                        <q-item-section style="justify-content: start;">
                          <q-item-label :style="'font-size: 14px;line-height: 1.715em;font-weight: 500;'">
                            {{ t('aboutTitle') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-tab>
                  </q-tabs>
                </q-item-section> 
              </q-item>
              <q-item style="padding: 0;">
                <q-item-section class="content-center">
                  <q-item-label :style="'font-size: '+ (compact ? '7' : '14') +'px;line-height: 1.715em;font-weight: 500;'" class="text-grey">
                    {{ t('footer.paragraph') }}
                  </q-item-label>
                </q-item-section> 
              </q-item>
            </q-list>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template> 

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import { useSessionStore } from 'stores/session';
import { useUserStore } from 'stores/user';
// import { useStore } from 'vuex';
import ComptaLink, { ComptaLinkProps } from 'components/ComptaLink.vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css';
// import { Capacitor } from '@capacitor/core';
import getConnection, { openDbConnection, isDbConnectionOpen, newQuery, closeDbConnection, closeConnection } from 'cap/storage';
import { Loading, useQuasar, useMeta } from 'quasar';
import { ClassLangAssoc } from 'components/models';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
// import { CapacitorHttp } from '@capacitor/core';

// VARIABLES
// console.log(import.meta.env);
// console.log(process.env);
// const axios: AxiosInstance = inject('axios') as AxiosInstance
// const app = getCurrentInstance();
// const key = app.appContext.config.globalProperties.$key;
// console.log(key);
// console.log(window);
const renderComponent = ref(true);
// const viewRef = ref(null);
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
// console.log(route.path);
// console.log(typeof route.path);
const { t, locale } = useI18n({ useScope: 'global' });
// const emit = defineEmits(['language-rerender']);
const displayedLanguage = ['fr-FR', 'en-US'].includes($q.lang.getLocale()) 
  ? ref({nom: $q.lang.getLocale()})
  : ref({nom: 'en-US'});
const classAssoc: ClassLangAssoc = {
  'en-US': {
    class: 'us'
  },
  'fr-FR': {
    class: 'fr'
  }
};
const tab = ref(undefined);
const platform = $q.platform;
// console.log(platform);
const languages = ref([]);
const comptaLinks: ComptaLinkProps[] = ref(getLinks());
const leftDrawerOpen = ref(false);
const faviconSrc = import.meta.env.PROD && platform.is.desktop
  ? `dist/icons/${import.meta.env.PUB_ICON}`
  : `icons/${import.meta.env.PUB_ICON}`;
const connected = ref(false);
const orientation = ref(null);
const compact = ref(false);

let sessionStore = null, userStore = null, prefs = null;
let db: Ref<SQLiteDBConnection> = ref(null);
let userCookies = $q.cookies.get('user');
// console.log('User Cookies !');
// console.log(userCookies);

// DECLARATIONS
// console.log($q.lang.getLocale());
if (platform.is.desktop){
  sessionStore = useSessionStore();
  userStore = useUserStore();
} else {
  // console.log(window.screen.orientation);
  orientation.value = window.screen.orientation.type;
  if (orientation.value === 'portrait-primary' || orientation.value === 'portrait-secondary'){
    compact.value = true;
  }
  window.addEventListener('orientationchange', handleOrientation);
}
if (!!userCookies) {
  connected.value = userCookies.connected;
}
else {
  connected.value = false;
}

// FUNCTIONS
function tabChanges(val: string){
  // console.log(val);
  tab.value = val;
  useMeta(getMeta());
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
};

async function changeLanguage(val: string) {
  // console.log(`Language changing: ${val}`);
  locale.value = val;
  // console.log(getLinks());
  comptaLinks.value = getLinks();
  displayedLanguage.value = languages.value.find((lang) => {
    return lang.nom === locale.value;
  });
  if (platform.is.desktop) {
    sessionStore.setLangDisplayed(displayedLanguage.value);
  } else {
    const session = await prefs.getPref('session');
    session.langDisplayed = displayedLanguage.value;
    await prefs.setPref('session', session);
    // console.log('languageDisplayed setted in session !');
  }
  // emit('language-rerender');
  forceRerender();
};

async function logout(){
  if (platform.is.desktop){
    await sessionStore.deleteSession();
    userStore.reset();
  }
  else {
    const session = await prefs.getPref('session');
    session.sessionId = '';
    await prefs.setPref('session', session);
    const usr = await prefs.getPref('user');
    usr.connected = false;
    usr.user = {};
    await prefs.setPref('user', usr);
    const msg = await prefs.getPref('message');
    msg.messages = [];
    msg.messagesVisibility = false;
    await prefs.setPref('message', msg);
    // await prefs.removeAll();
  }
  router.push({name: t('startLinkName')});
};

async function forceRerender() {
  // console.log('Force rerender !');
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};

function getLinks(){
  return [
    {
      title: t('comptaLinks.services.title'),
      icon: 'home_repair_service',
      items: [{
        header: t('comptaLinks.services.admin'),
        avatar: 'edit_note',
        label: t('comptaLinks.services.adminLabel'),
        caption: '',
        link: t('comptaLinks.services.adminLink'),
      },
      {
        header: t('comptaLinks.services.display'),
        avatar: 'list',
        label: t('comptaLinks.services.displayLabel'),
        caption: '',
        link: t('comptaLinks.services.displayLink'),
      }]
    },
    {
      title: t('comptaLinks.actors.title'),
      icon: 'person',
      items: [{
        header: t('comptaLinks.actors.admin'),
        avatar: 'edit_note',
        label: t('comptaLinks.actors.adminLabel'),
        caption: '',
        link: t('comptaLinks.actors.adminLink'),
      },
      {
        header: t('comptaLinks.actors.display'),
        avatar: 'list',
        label: t('comptaLinks.actors.displayLabel'),
        caption: '',
        link: t('comptaLinks.actors.displayLink'),
      }],
    },
    {
      title: t('comptaLinks.orders.title'),
      icon: 'shopping_cart',
      items: [{
        header: t('comptaLinks.orders.admin'),
        avatar: 'edit_note',
        label: t('comptaLinks.orders.adminLabel'),
        caption: '',
        link: t('comptaLinks.orders.adminLink'),
      },
      {
        header: t('comptaLinks.orders.display'),
        avatar: 'list',
        label: t('comptaLinks.orders.displayLabel'),
        caption: '',
        link: t('comptaLinks.orders.displayLink'),
      }],
    },
    {
      title: t('comptaLinks.invoices.title'),
      icon: 'list_alt',
      items: [{
        header: t('comptaLinks.invoices.admin'),
        avatar: 'edit_note',
        label: t('comptaLinks.invoices.adminLabel'),
        caption: '',
        link: t('comptaLinks.invoices.adminLink'),
      },
      {
        header: t('comptaLinks.invoices.display'),
        avatar: 'list',
        label: t('comptaLinks.invoices.displayLabel'),
        caption: '',
        link: t('comptaLinks.invoices.displayLink'),
      }],
    },
    {
      title: t('comptaLinks.payments.title'),
      icon: 'payments',
      items: [{
        header: t('comptaLinks.payments.admin'),
        avatar: 'edit_note',
        label: t('comptaLinks.payments.adminLabel'),
        caption: '',
        link: t('comptaLinks.payments.adminLink'),
      },
      {
        header: t('comptaLinks.payments.display'),
        avatar: 'list',
        label: t('comptaLinks.payments.displayLabel'),
        caption: '',
        link: t('comptaLinks.payments.displayLink'),
      }],
    },
    {
      title: t('comptaLinks.export.title'),
      icon: 'picture_as_pdf',
      link: t('comptaLinks.export.link'),
    },
  ];
};

function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};

function getMeta() {
  return {
    // sets document title
    title: `${t(route.meta.titleKey)}`,
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title} - Easy-Compta`,

    // meta tags
    meta: {
      description: { name: 'description', content: `${t(route.meta.titleKey)} Page` },
      keywords: { name: 'keywords', content: 'Quasar website' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      // ogTitle:  {
      //   property: 'og:title',
      //   // optional; similar to titleTemplate, but allows templating with other meta properties
      //   template (ogTitle) {
      //     return `${ogTitle} - My Website`
      //   }
      // }
    },

    // CSS tags
    // link: {
    //   material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    // },

    // JS tags
    // script: {
    //   ldJson: {
    //     type: 'application/ld+json',
    //     innerHTML: `{ "@context": "http://schema.org" }`
    //   }
    // },

    // <html> attributes
    // htmlAttr: {
    //   'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    //   empty: undefined // generates <html empty>
    // },

    // <body> attributes
    // bodyAttr: {
    //   'action-scope': 'xyz', // generates <body action-scope="xyz">
    //   empty: undefined // generates <body empty>
    // },

    // <noscript> tags
    noscript: {
      default: `${t('noScript')}`,
    }
  };
};

// defineExpose({
//   forceRerender
// });

// LIFECYCLE EVENTS
onBeforeMount(() => {
  if (!platform.is.desktop) {
    $q.loadingBar.setDefaults({
      color: 'primary',
      size: '15px',
      position: 'bottom',
    });
    Loading.show();
    $q.loadingBar.start();
    (async() => {
      // console.log(`Cookie Session`);
      prefs = await import('cap/storage/preferences');
      const session = await prefs.getPref('session');
      if (db.value === null)
        db.value = await getConnection(true);
      if (!!session && !!session.langDisplayed && !!session.languages) {
        languages.value = session.languages;
        const currentLang = session.langDisplayed.nom;
        displayedLanguage.value = session.languages.find((lang) => {
          return lang.nom === currentLang;
        });
        locale.value = currentLang;
      }
      else {
        let isOpen = await isDbConnectionOpen(db.value);
        if (!isOpen){
          isOpen = await openDbConnection(db.value);
        }
        const values = await newQuery(db.value, 'SELECT * FROM langue');
        languages.value = values.values;
        closeDbConnection(db.value);
        const newSession = !!session ? session : {};
        newSession.languages = values.values;
        displayedLanguage.value = newSession.languages.find((lang) => {
          return lang.nom === locale.value;
        });
        newSession.langDisplayed = displayedLanguage.value;
        await prefs.setPref('session', newSession);
      }
      // console.log(`Local value --> ${locale.value}`);
      $q.loadingBar.increment(1);
      Loading.hide();
      $q.loadingBar.stop();
    })();
  }
  else {
    if (sessionStore.getLangDisplayed !== null && sessionStore.getLanguages.length){
      languages.value = sessionStore.getLanguages;
      const currentLang = sessionStore.getLangDisplayed.nom;
        displayedLanguage.value = sessionStore.getLanguages.find((lang) => {
          return lang.nom === currentLang;
        });
      locale.value = currentLang;
    }
    else {
      sessionStore.getLanguagesFromDB()
      .then(() => {
        languages.value = sessionStore.getLanguages;
        const currentLang = locale.value;
        displayedLanguage.value = languages.value.find((lang) => {
          return lang.nom === currentLang;
        });
        sessionStore.setLangDisplayed(displayedLanguage.value);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  // console.log('On before mount !');
  // console.log(displayedLanguage.value);
  // console.log(classAssoc[displayedLanguage.value.nom].class);
});
onBeforeUnmount(() => {
  if (!platform.is.desktop){
    // console.log('Close connection !');
    closeConnection();
  }
});
onMounted(() => {
  // console.log('On mounted !');
  document.title = `Easy-Compta - ${t(route.meta.titleKey)}`;
  const link = document.querySelector('link[rel="icon"]:not([sizes])') as Element;
  link.setAttribute('href', faviconSrc);
  link.setAttribute('type', 'image/svg');

  useMeta(getMeta());
});

// WATCHERS
watch(
  [route, orientation],
  async ([newR, newOrientation]) => {
    if (!import.meta.env.SSR && !!newR) {
      // console.log(newR.meta.titleKey);
      document.title = `Easy-Compta - ${t(newR.meta.titleKey)}`;
      if (platform.is.desktop){
        // console.log('Watcher connected !');
        connected.value = userStore.getConnected;
      }
      else {
        const userCookie = await prefs.getPref('user');
        // console.log(userCookie);
        connected.value = !!userCookie 
          ? userCookie.connected
          : false ;
      }
    }
    if (!!newOrientation) {
      if (newOrientation === 'portrait-primary' || newOrientation === 'portrait-secondary'){
        compact.value = true;
      }
      else {
        compact.value = false;
      }
    }
  }
)

// @
</script>
