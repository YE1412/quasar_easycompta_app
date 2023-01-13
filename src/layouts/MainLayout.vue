<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="frosted-glass" elevated>
      <q-toolbar class="full-width">
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
        >
          <q-btn
            flat
            :to="{path: connected ? t('homeTerLinkTarget') : t('startLinkTarget')}">
            <q-item-section
              avatar
            >
              <!-- <q-avatar> -->
                <img :src="faviconSrc" />
              <!-- </q-avatar> -->
            </q-item-section>
          </q-btn>
        </q-item>

        <q-space />

        <q-item clickable class="float-right">
          <q-btn-dropdown stretch flat fab fab-mini :label="t('toolbar.languageLabel')">
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
          <q-item-section avatar>
            <span :class="`fi fi-${classAssoc[displayedLanguage.nom].class}`"></span>
          </q-item-section>
        </q-item>
        <!--<div class="float-right">Quasar v{{ $q.version }}</div>-->
        <div class="float-right">
          <q-btn flat stretch v-if="connected" icon="mdi-logout" :label="t('startComponent.libelles.logout')" @click="logout" />
          <router-link :to="{path: t('registerLinkTarget')}" style="text-decoration: none;color: black;">
            <q-btn flat stretch v-if="!connected" icon="mdi-account-plus" :label="t('startComponent.libelles.signUp')" />
          </router-link>  
        </div>
      </q-toolbar>

      <q-tabs v-model="tab" v-if="connected">
        <q-tab name="home">
          <q-item clickable>
            <router-link :to="{path: t('homeTerLinkTarget')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-home"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('homeLinkName') }}</q-item-label>
              </q-item-section>
            </router-link>
          </q-item>
          <!-- <q-separator color="dark" vertical inset /> -->
        </q-tab>
        <q-tab name="profile">
          <q-item clickable>
            <router-link :to="{path: t('profileLinkTarget')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-card-account-details"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('profileLinkName') }}</q-item-label>
              </q-item-section>
            </router-link>
          </q-item>
          <!-- <q-separator color="dark" vertical inset /> -->
        </q-tab>
        <q-tab name="about">
          <q-item clickable>
            <router-link :to="{path: t('aboutLinkTarget')}" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-information"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('aboutLinkName') }}</q-item-label>
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
      v-if="connected"
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
      <Suspense>
        <router-view @change-tab="tabChanges" :dbConn="db"/>
      </Suspense>
    </q-page-container>

    <q-footer class="frosted-glass" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex flex-center">
            CryptoLogique
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template> 

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useSessionStore } from 'stores/session';
import { useUserStore } from 'stores/user';
// import { useStore } from 'vuex';
import ComptaLink, { ComptaLinkProps } from 'components/ComptaLink.vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import '/node_modules/flag-icons/css/flag-icons.min.css';
// import { Capacitor } from '@capacitor/core';
import getConnection, { openDbConnection, isDbConnectionOpen, newQuery, closeDbConnection, closeConnection } from 'cap/storage';
import { Loading, useQuasar } from 'quasar';
import { ClassLangAssoc } from 'components/models';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
// import { CapacitorHttp } from '@capacitor/core';

// VARIABLES
// const app = getCurrentInstance()
// const axiosApi = app.appContext.config.globalProperties.$api
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
// console.log(route.path);
// console.log(typeof route.path);
const { t, locale } = useI18n({ useScope: 'global' });
const displayedLanguage = ref({nom: 'en-US'});
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
const languages = ref([]);
const comptaLinks: ComptaLinkProps[] = [
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
const leftDrawerOpen = ref(false);
const faviconSrc = 'icons/favicon-32x32.png';
const connected = ref(false);

let sessionStore = null, userStore = null, prefs = null;
let db: Ref<SQLiteDBConnection> = ref(null);
let userCookies = $q.cookies.get('user');
// console.log('User Cookies !');
// console.log(userCookies);

// DECLARATIONS
if (platform.is.desktop){
  sessionStore = useSessionStore();
  userStore = useUserStore();
} else {
}
if (!!userCookies) {
  connected.value = userCookies.connected;
}
else {
  connected.value = false;
}

// WATCHERS
watch(
  route,
  async (newR) => {
    if (!import.meta.env.SSR) {
      // console.log(newR);
      document.title = `Easy-Compta - ${newR.meta.title}`;
    }
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
)

// FUNCTIONS
function tabChanges(val: string){
  // console.log(val);
  tab.value = val;
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
};

function changeLanguage(val: string) {
  // console.log(`Language changing: ${val}`);
  locale.value = val;
  displayedLanguage.value = languages.value.find((lang) => {
    return lang.nom === locale.value;
  });
  if (platform.is.desktop) {
    sessionStore.setLangDisplayed(displayedLanguage.value);
  } else {

  }
};

async function logout(){
  if (platform.is.desktop){
    await sessionStore.deleteSession();
    userStore.reset();
  }
  else {
    await prefs.removePref('session');
    await prefs.removePref('user');
    await prefs.removePref('message');
    await prefs.removeAll();
  }
  router.push({path: t('startLinkTarget')});
};

// LIFECYCLE EVENTS
// onBeforeMount(() => {
// });
onBeforeUnmount(() => {
  if (!platform.is.desktop){
    console.log('Close connection !');
    closeConnection();
  }
});
onMounted(() => {
  document.title = `Easy-Compta - ${route.meta.title}`;
  
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
      // console.log('')
      // console.log(session);
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
        // db.value = await getConnection(true);
        let isOpen = await isDbConnectionOpen(db.value);
        // console.log(isOpen);
        if (!isOpen){
          isOpen = await openDbConnection(db.value);
        }
        const values = await newQuery(db.value, 'SELECT * FROM langue');
        // console.log(values);
        languages.value = values.values;
        closeDbConnection(db.value);
        const newSession = !!session ? session : {};
        newSession.languages = values.values;
        displayedLanguage.value = newSession.languages.find((lang) => {
          return lang.nom === locale.value;
        });
        newSession.langDisplayed = displayedLanguage.value;
        // console.log('MainLayout newSession !');
        // console.log(newSession);
        await prefs.setPref('session', newSession);
      }
      $q.loadingBar.increment(1);
      Loading.hide();
      $q.loadingBar.stop();
      // console.log(decodeURIComponent($q.cookies.getAll().session));
    })();
  }
  else {
      // console.log('Before Mount !');
      // console.log(sessionStore.getLangDisplayed);
      // console.log(sessionStore.getLanguages.length);
      // console.log(displayedLanguage.value);
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
})
// @
</script>
