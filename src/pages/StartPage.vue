<template>
  <q-page padding class="column items-center justify-start">
    <!-- content -->
    <MessagesItem v-if='messageVisibility && renderComponent' />
    <q-img
      :src="imgSrc"
      style="min-width: 100%; height: 750px;"
      class="flex content-center justify-center items-center"
    >
      <div class="absolute-center text-center">
        <div :class='platform.is.desktop ? headingDesktopClass : headingMobileClass'>{{ t('startComponent.title') }}
        </div>
        <q-form
          @submit='submit'
          @reset='reset'
          class='q-gutter-md'
          style='color: white'>
          <q-input
            color="white"
            label-color="white"
            input-style="color: white"
            filled
            type="text"
            v-model="login"
            :label="t('startComponent.inputLabels.login')"
            :hint="t('startComponent.hints.login')"
            :hide-hint="true"
            :placeholder="t('startComponent.placeholders.login')"
            :clearable="true"
            lazy-rules
            :rules="[ 
              val => nonEmptyLogin || t('startComponent.errors.empty.login')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account" color="white" />
            </template>
          </q-input>
          <q-input
            color="white"
            label-color="white"
            input-style="color: white"
            filled
            type="password"
            v-model="pass"
            :label="t('startComponent.inputLabels.pass')+' *'"
            :bottom-slots="true"
            :hint="t('startComponent.hints.pass')"
            :hide-hint="true"
            :placeholder="t('startComponent.placeholders.pass')"
            :clearable="true"
            lazy-rules
            :rules="[ val => nonEmptyPass || t('startComponent.errors.empty.pass')
            ]"
          >
            <template v-slot:hint>
                <!-- <div style="color: white;">
                  fgdgfdfgd
                </div> -->
            </template>
            <template v-slot:prepend>
              <q-icon name="lock" color="white" />
            </template>
          </q-input>
          <div>
            <q-btn icon="mdi-login" :label="t('startComponent.libelles.signInButton')" type="submit" color="primary"/>
            <q-btn :label="t('startComponent.libelles.resetButton')" type="reset" color="white" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
      <template v-slot:error class="flex items-center justify-center">
        <!-- <div class="flex justify-center items-center content-center"> -->
          <div class="text-center bg-secondary text-black flex justify-center column" style="position: relative;">
            <div :class='platform.is.desktop ? headingDesktopClass : headingMobileClass'>
              {{ t('startComponent.title') }}
            </div>
            <q-form
              @submit='submit'
              @reset='reset'
              class='q-gutter-sm'
              style='color: white'>
              <q-input
                color="white"
                label-color="white"
                input-style="color: white"
                filled
                type="text"
                v-model="login"
                :label="t('startComponent.inputLabels.login')"
                :hint="t('startComponent.hints.login')"
                :hide-hint="true"
                :placeholder="t('startComponent.placeholders.login')"
                :clearable="true"
                lazy-rules
                :rules="[ 
                  val => nonEmptyLogin || t('startComponent.errors.empty.login')
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-account" color="white" />
                </template>
              </q-input>
              <q-input
                color="white"
                label-color="white"
                input-style="color: white"
                filled
                type="password"
                v-model="pass"
                :label="t('startComponent.inputLabels.pass')+' *'"
                :bottom-slots="true"
                :hint="t('startComponent.hints.pass')"
                :hide-hint="true"
                :placeholder="t('startComponent.placeholders.pass')"
                :clearable="true"
                lazy-rules
                :rules="[ val => nonEmptyPass || t('startComponent.errors.empty.pass')
                ]"
              >
                <template v-slot:hint>
                    <!-- <div style="color: white;">
                      fgdgfdfgd
                    </div> -->
                </template>
                <template v-slot:prepend>
                  <q-icon name="lock" color="white" />
                </template>
              </q-input>
              <div>
                <q-btn icon="mdi-login" :label="t('startComponent.libelles.signInButton')" type="submit" color="primary"/>
                <q-btn :label="t('startComponent.libelles.resetButton')" type="reset" color="white" flat class="q-ml-sm" />
              </div>
            </q-form>
          </div>
        <!-- </div> -->
      </template>
    </q-img>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useUserStore } from 'stores/user';
import { useMessageStore } from 'stores/message';
import { useSessionStore } from 'stores/session';
// import { Capacitor } from '@capacitor/core';
import { useI18n } from 'vue-i18n';
import MessagesItem from 'components/MessagesItem.vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import getConnection, { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeConnection, closeDbConnection } from 'cap/storage';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import sessionAxiosService from 'db/services/session.service';
import { v4 as uuidv4 } from 'uuid';
import { Keyboard } from '@capacitor/keyboard';

// VARIABLES
interface StartProps {
  dbConn?: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<StartProps>(), {
  dbConn: null,
});
const $q = useQuasar();
const platform = $q.platform;
const login = ref(null);
const pass = ref(null);
const messageVisibility = ref(false);
const renderComponent = ref(true);
const { t } = useI18n();
const router = useRouter();
const imgSrc = ref(null);
const nonEmptyLogin = computed(() => {
  return !!login.value && login.value != '';
});
const nonEmptyPass = computed(() => {
  return !!pass.value && pass.value != '';
});
const headingDesktopClass = 'q-pt-lg q-pb-lg SenExtrabold-font text-h2 text-uppercase text-center text-bold';
const headingMobileClass = 'q-pt-lg q-pb-lg SenExtrabold-font text-h4 text-uppercase text-center text-bold';

let userStore = null, sessionStore = null, messageStore = null, prefs = null;

// DECLARATIONS
if (platform.is.desktop){
  userStore = useUserStore();
  sessionStore = useSessionStore();
  messageStore = useMessageStore();
  if (messageStore.getMessages.length)
    messageStore.setMessagesVisibility(true);
  messageVisibility.value = messageStore.getMessagesVisibility;
  imgSrc.value = "dist/assets/imgs/slider-2.jpg";
}
else {
  imgSrc.value = "assets/imgs/slider-2.jpg";
  (async () => {
    prefs = await import('cap/storage/preferences');
    // console.log('Get messages preferences !');
    const mess = await prefs.getPref('message');
    // console.log(mess);
    const messages = !!mess ? mess.messages : [];
    // console.log(messages);
    const vis = !!mess ? mess.messagesVisibility : mess;
    // console.log(vis);
    if (messages.length && vis === null) {
      messageVisibility.value = true;
    } else {
      messageVisibility.value = vis !== null ? vis : false;
    }
  })();
}

// FUNCTIONS
async function forceMessageItemsRerender() {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
async function transformObject(obj: any) {
  if (__KEY__ === null) {
    await setGenApi();
  }
  await setCryptApi();
  __FORMATOBJ__(obj);
};
async function submit(){
  const ret = await loginDb();
  if (platform.is.desktop){
    if (ret) {
      const res = await sessionStore.getSession()
        .then((res) => {
          return true;
        })
        .catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t('startComponent.results.ko.session', {err: err})
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('startComponent.results.ko.session', {err: err})
          });
          return false;
        });
      if (!res) {
        forceMessageItemsRerender();
      }
      else {
        userStore.setConnected(true);
        router.push(t('homeTerLinkTarget'));
      }
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('startComponent.errors.error.signIn')
      });
      forceMessageItemsRerender();
    }
  }
  else {
    // console.log(`Login result --> ${ret} !`);
    if (ret){
      const res = await getSessionForMobile()
        .then((res) => {
          return true;
        })
        .catch(async (err) => {
          const mess = await prefs.getPref('message');
          mess.messages = [
            {
              severity: true,
              content: t('startComponent.results.ko.session', {err: err})
            }
          ];
          mess.messagesVisibility = true;
          await prefs.setPref('message', mess);
          // await prefs.setPref('messagesVisibility', true);
          messageVisibility.value = true;
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('startComponent.results.ko.session', {err: err})
          });
          return false;
        });
      if (!res) {
        forceMessageItemsRerender();
      }
      else {
        const usr = await prefs.getPref('user');
        usr.connected = true;
        await prefs.setPref('user', usr);
        router.push('/');
      }
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('startComponent.errors.error.signIn')
      });
      forceMessageItemsRerender();
    }
  }
};
function reset(){
  login.value = null;
  pass.value = null;
};
async function loginDb() {
  const obj = {
    login: login.value,
    pass: pass.value,
  };
  await transformObject(obj);
  // console.log("User Login !");
  // console.log(obj);
  if (platform.is.desktop) {
    return userStore.loginUser(obj.login, obj.pass)
      .then((res) => {
        // console.log('Congrats !');
        // console.log(res);
        return true;
      }, (rej) => {
        // console.log(rej);
        messageStore.messages.push({
          severity: true,
          content: t('startComponent.errors.error.signIn')
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
        return false;
      })
      .catch((err) => {
        // console.log(err);
        messageStore.messages.push({
          severity: true,
          content: t('startComponent.results.ko.signIn', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
        return false;
      });
  }
  else {
    // console.log(`mobile part !`);
    // console.log(props);
    console.log(props.dbConn);
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    console.log(`isOpen --> ${isOpen} !`);
    if (isOpen) {
      const sql = `SELECT \`user\`.\`userId\`, \`user\`.\`firstName\`, \`user\`.\`lastName\`, \`user\`.\`login\`, \`user\`.\`email\`, \`user\`.\`companyName\`, \`user\`.\`companyLogo\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`user_type\`.\`userTypeId\` AS \`user_type.userTypeId\`, \`user_type\`.\`regular\` AS \`user_type.regular\`, \`user_type\`.\`admin\` AS \`user_type.admin\` FROM \`user\` AS \`user\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`user\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`user_type\` AS \`user_type\` ON \`user\`.\`userTypeId\` = \`user_type\`.\`userTypeId\` WHERE (\`user\`.\`login\` = '${obj.login}' OR \`user\`.\`email\` = '${obj.login}') AND \`user\`.\`pass\` = '${obj.pass}';`;
      // console.log(sql);
      const values = await newQuery(props.dbConn, sql);
      let res = false;
      // console.log(values);
      if(values.values.length){
        const intRes = sanitizeQueryResult(values.values);
        // console.log(intRes);
        await setDecryptApi();
        const result = await __TRANSFORMOBJ__(intRes[0]);
        // console.log(result);
        await prefs.setPref('user', {user: result, connected: false});
        res = true;
      }
      else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('startComponent.errors.error.signIn')
            }
          ],
          messagesVisibility: true
        });
        messageVisibility.value = true;
        // console.log(decodeURIComponent($q.cookies.getAll().message));
      }
      closeDbConnection(props.dbConn);
      return res;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('startComponent.results.ko.signIn', { err: 'Unable to open SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
      return false;
    }
  }
};
function sanitizeQueryResult(obj: any) {
  let ret = [];
  for (const k in obj) {
    ret[k] = {};
    for (const l in obj[k]){
      if (l === 'devise.deviseId'){
        ret[k]['devise'] = ret[k]['devise'] === undefined
          ? {}
          : ret[k]['devise'];
        ret[k]['devise'].deviseId = obj[k][l];
      }
      else if(l === 'devise.symbole'){
        ret[k]['devise'] = ret[k]['devise'] === undefined
          ? {}
          : ret[k]['devise'];
          ret[k]['devise'].symbole = obj[k][l];
      }
      else if(l === 'devise.libelle') {
        ret[k]['devise'] = ret[k]['devise'] === undefined
          ? {}
          : ret[k]['devise'];
        ret[k]['devise'].libelle = obj[k][l];
      }
      else if(l === 'user_type.userTypeId'){
        ret[k]['user_type'] = ret[k]['user_type'] === undefined
          ? {}
          : ret[k]['user_type'];
        ret[k]['user_type'].userTypeId = obj[k][l];  
      }
      else if(l === 'user_type.regular'){
        ret[k]['user_type'] = ret[k]['user_type'] === undefined
          ? {}
          : ret[k]['user_type'];
        ret[k]['user_type'].regular = obj[k][l];
      }
      else if(l === 'user_type.admin'){
        ret[k]['user_type'] = ret[k]['user_type'] === undefined
          ? {}
          : ret[k]['user_type'];
        ret[k]['user_type'].admin = obj[k][l];
      }
      else if (l !== 'deviseId' && l !== 'userTypeId'){
        ret[k][l] = obj[k][l];
      }
    }
  }
  return ret;
};
function getSessionForMobile() {
  return new Promise(async (resolve, reject) => {
    // console.log(`Session`);
    const newId = uuidv4();
    let session = !!$q.cookies.getAll().session
      ? JSON.parse(decodeURIComponent($q.cookies.getAll().session))
      : null;
    // console.log(session);
    if (!!session)
      session.sessionId = newId;
    else{
      session = {};
      session.sessionId = newId;
    }
    // console.log(session);
    await prefs.setPref('session', session);
    resolve(true);
  });  
}

// WATCHERS

// LIFECYCLE EVENTS

// OTHERS
Keyboard.addListener('keyboardWillShow', info => {
  console.log('keyboard will show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', info => {
  console.log('keyboard did show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('keyboard will hide');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('keyboard did hide');
});

</script>
