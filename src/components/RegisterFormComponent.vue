<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent' />
  </q-no-ssr>
  <div :class="'q-py-lg SenExtrabold-font '+ (compact ? 'text-h4' : 'text-h2') + ' text-uppercase text-center text-bold'">{{ t('profileComponent.titles.register') }}</div>
  <div class='q-pa-lg' :style="!compact ? 'width: 70%;' : 'width: 100%;'">
    <q-form
      @submit='submit'
      @reset='reset'
      class='q-gutter-md'>
      <q-input
        filled
        type="text"
        v-model="firstName"
        ref="firstNameRef"
        :label="t('profileComponent.inputLabels.firstName')+' *'"
        :hint="t('profileComponent.hints.firstName')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.firstName')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyFirstName || t('profileComponent.errors.empty.firstName'),
          val => validFirstName || t('profileComponent.errors.error.firstName')
        ]"
      />
      <q-input
        filled
        type="text"
        v-model="lastName"
        ref="lastNameRef"
        :label="t('profileComponent.inputLabels.lastName')+' *'"
        :hint="t('profileComponent.hints.lastName')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.lastName')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyLastName || t('profileComponent.errors.empty.lastName'),
          val => validLastName || t('profileComponent.errors.error.lastName')
        ]"
      />
      <q-input
        filled
        type="text"
        v-model="login"
        ref="loginRef"
        :label="t('profileComponent.inputLabels.login')+' *'"
        :hint="t('profileComponent.hints.login')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.login')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyLogin || t('profileComponent.errors.empty.login'),
          val => validLogin || t('profileComponent.errors.error.login')
        ]"
      />
      <q-input
        filled
        type="email"
        v-model="email"
        ref="emailRef"
        :label="t('profileComponent.inputLabels.email')+' *'"
        :hint="t('profileComponent.hints.email')+' *'"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.email')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyEmail || t('profileComponent.errors.empty.email'),
          val => validEmail || t('profileComponent.errors.error.email'),
          val => emailCheck() || t('profileComponent.errors.error.emailBusy')
        ]"
      />
      <q-input
        filled
        type="email"
        v-model="confirmEmail"
        ref="confirmEmailRef"
        :label="t('profileComponent.inputLabels.confirmEmail')+' *'"
        :hint="t('profileComponent.hints.confirmEmail')+' *'"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.confirmEmail')"
        :clearable="true"
        lazy-rules
        :rules="[
          val => validConfirmEmail || t('profileComponent.errors.error.emailMissmatch')
        ]"
      />
      <q-input
        filled
        type="password"
        v-model="pass"
        ref="passRef"
        :label="t('profileComponent.inputLabels.pass')+' *'"
        :hint="t('profileComponent.hints.pass')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.pass')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyPass || t('profileComponent.errors.empty.pass'),
          val => validPass || t('profileComponent.errors.error.pass')
        ]"
      />
      <q-input
        filled
        type="password"
        v-model="confirmPass"
        ref="confirmPassRef"
        :label="t('profileComponent.inputLabels.confirmPass')+' *'"
        :hint="t('profileComponent.hints.confirmPass')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.confirmPass')"
        :clearable="true"
        lazy-rules
        :rules="[ 
          val => validConfirmPass || t('profileComponent.errors.error.passMissmatch')
        ]"
      />
      <q-input
        filled
        type="text"
        v-model="companyName"
        ref="companyNameRef"
        :label="t('profileComponent.inputLabels.companyName')+' *'"
        :hint="t('profileComponent.hints.companyName')"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.companyName')"
        :clearable="true"
        lazy-rules
        :rules="[ val => nonEmptyCompanyName || t('profileComponent.errors.empty.companyName'),
          val => validCompanyName || t('profileComponent.errors.error.companyName')
        ]"
      />
      <div class="flex justify-start row items-center">
        <q-avatar v-if="!!companyLogoURL">
          <img :src="companyLogoURL" />
        </q-avatar>
        <q-uploader
          style="width: 100%"
          ref='companyLogoUploader'
          :factory="factoryFn"
          accept="image/svg"
          :max-file-size="maxSize"
          :multiple="false"
          :auto-upload="false"
          :hide-upload-btn="true"
          :label="t('profileComponent.inputLabels.companyLogo')"
          field-name='file'
          @uploaded="onFileUploaded"
          @rejected="onInvalidCompanyLogo"
          @failed="onFailedCompanyLogoUpload"
          @added="addedFile"
          @removed="removedFile"
        >
        </q-uploader>
      </div>
      <!-- <q-file
        filled
        v-model="companyLogo"
        accept=".svg"
        :max-file-size="maxSize"
        :multiple="false"
        :stack-label="true"
        :label="t('profileComponent.inputLabels.companyLogo')"
        :hint="t('profileComponent.hints.companyLogo', {size: maxSize})"
        :hide-hint="true"
        :placeholder="t('profileComponent.placeholders.companyLogo')"
        lazy-rules
        :clearable='true'
        :rules="[ 
          val => validCompanyLogo || t('profileComponent.errors.error.companyLogo')
        ]"
      >
        <template v-slot:before v-if="!!companyLogoURL">
          <q-avatar>
            <img :src="companyLogoURL" />
          </q-avatar>
        </template>
      </q-file> -->
      <q-select
        filled
        v-model="devise"
        ref="deviseRef"
        :options="selectDevisesOption"
        option-disable="cannotSelect"
        :label="t('profileComponent.inputLabels.devise')+' *'"
        :hint="t('profileComponent.hints.devise')"
        :hide-hint="true"
        lazy-rules
        :rules="[ val => nonEmptyDevise || t('profileComponent.errors.empty.devise')
        ]"
      />
      <q-select
        filled
        v-model="userType"
        ref="userTypeRef"
        :options="selectUserTypesOption"
        option-disable="cannotSelect"
        :label="t('profileComponent.inputLabels.userType')+' *'"
        :hint="t('profileComponent.hints.userType')"
        :hide-hint="true"
        lazy-rules
        :rules="[ val => nonEmptyUserType|| t('profileComponent.errors.empty.userType')
        ]"
      />
      <div class="flex items-center content-center justify-center">
        <q-btn :label="t('profileComponent.libelles.updateButton')" type="submit" color="primary"/>
        <q-btn :label="t('profileComponent.libelles.resetButton')" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: off*/
import { useQuasar } from 'quasar';
import { ref, computed, nextTick, getCurrentInstance } from 'vue';
import MessagesItem from './MessagesItem.vue';
import { useUserStore } from 'stores/user';
import { useMessageStore } from 'stores/message';
import { useInvoiceStore } from 'stores/invoice';
import userAxiosService from 'db/services/user.service';
// import uploadImageAxiosService from 'db/services/upload_image.service';
import { useI18n } from 'vue-i18n';
import { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeDbConnection } from 'cap/storage';
import { setCryptApi, __FORMATOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { useRouter } from 'vue-router';

interface RegisterCompProps {
  dbConn?: SQLiteDBConnection | null; 
};
const props = withDefaults(defineProps<RegisterCompProps>(), {
  dbConn: null
});
const app = getCurrentInstance();
const key = app.appContext.config.globalProperties.$key;
const $q = useQuasar();
// const userId = ref(0);
const firstName = ref(null);
const firstNameRef = ref(null);
const lastName = ref(null);
const lastNameRef = ref(null);
const login = ref(null);
const loginRef = ref(null);
const email = ref(null);
const emailRef = ref(null);
const confirmEmail = ref(null);
const confirmEmailRef = ref(null);
const pass = ref(null);
const passRef = ref(null);
const confirmPass = ref(null);
const confirmPassRef = ref(null);
const companyName = ref(null);
const companyNameRef = ref(null);
const companyLogo = ref(null);
const companyLogoUploader = ref(null);
const companyLogoURL = ref(null);
const maxSize = ref(2 * 1024 * 1024);
const devise = ref(null);
const deviseRef = ref([]);
const selectDevisesOption = ref([]);
const userType = ref(null);
const userTypeRef = ref(null);
const selectUserTypesOption = ref([]); 
const platform = $q.platform;
const messageVisibility = ref(false);
const renderComponent = ref(true);
const { t } = useI18n();
// const progress = ref(0);
const router = useRouter();
const orientation = ref(null);
const compact = computed(() => {
  let ret = false;
  if (!!orientation.value){
    if (orientation.value === 'portrait-primary' || orientation.value === 'portrait-secondary'){
      ret = true;
    }
  }
  return ret;
});
const validFirstName = computed(() => {
  const re = /^(([a-zA-Z])([-])*){2,30}$/;
  const ret = re.test(firstName.value);
  if (!ret){
    firstNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }

  return ret;
});
const nonEmptyFirstName = computed(() => {
  const ret = !!firstName.value && firstName.value !== '';
  if (!ret){
    firstNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validLastName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  const ret = re.test(lastName.value);
  if (!ret){
    lastNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyLastName = computed(() => {
  const ret = !!lastName.value && lastName.value !== '';
  if (!ret){
    lastNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validLogin = computed(() => {
  const re = /^(([a-zA-Z])([_])*){2,15}$/;
  const ret = re.test(firstName.value);
  if (!ret){
    loginRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyLogin = computed(() => {
  const ret = !!login.value && login.value !== '';
  if (!ret){
    loginRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validEmail = computed(() => {
  const ret = true;
  if (!ret){
    emailRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyEmail = computed(() => {
  const ret = !!email.value && email.value !== '';
  if (!ret){
    emailRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validPass = computed(() => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_(\[\])@$!%*#?&{}])[A-Za-z\d\-_(\[\])@$!%*#?&{}]{8,30}$/;
  const ret = re.test(pass.value);
  if (!ret){
    passRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyPass = computed(() => {
  const ret = !!pass.value && pass.value !== '';
  if (!ret){
    passRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validCompanyName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  const ret = re.test(companyName.value);
  if (!ret){
    companyNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyCompanyName = computed(() => {
  const ret = !!companyName.value && companyName.value !== '';
  if (!ret){
    companyNameRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
// const validCompanyLogo = computed(() => {
//   const re = /(\.svg)$/i;
//   if (!!companyLogo.value)
//     return re.test(companyLogo.value.name);
//   else
//     return true;
// });
const nonEmptyDevise = computed(() => {
  const ret = !!devise.value && devise.value.value != 0;
  if (!ret){
    deviseRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const nonEmptyUserType = computed(() => {
  const ret = !!userType.value && userType.value.value != 0;
  if (!ret){
    userTypeRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validConfirmEmail = computed(() => {
  const ret = (confirmEmail.value === email.value);
  if (!ret){
    confirmEmailRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const validConfirmPass = computed(() => {
  const ret = (confirmPass.value === pass.value);
  if (!ret){
    confirmPassRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
});
const emailCheck = async () => {
  const ret = await checkEmail();
  if (!ret){
    emailRef.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
  return ret;
};
const validateForm = async () => {
  const ret1 = (validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value && validConfirmEmail.value && validConfirmPass.value && await emailCheck());
  const ret2 = (nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value);
  // const ret3 = !!companyLogo.value ? validCompanyLogo.value : true ;
  return ret1 && ret2;
};

let userStore = null, messageStore = null, invoiceStore = null, prefs = null, origin = null;
let userCapService = null;

// DECLARATIONS
if (platform.is.desktop) {
  userStore = useUserStore();
  invoiceStore = useInvoiceStore();
  messageStore = useMessageStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
}
else {
  // app = getCurrentInstance()
  // get = app.appContext.config.globalProperties.$get;
  // post = app.appContext.config.globalProperties.$post;
  orientation.value = window.screen.orientation.type;
  window.addEventListener('orientationchange', handleOrientation);
  (async () => {
    userCapService = await import('cap/service/cap.user.service');
    prefs = await import('cap/storage/preferences');
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
if (!import.meta.env.SSR){
  const fullOrigin = window.location.origin;
  // console.log(import.meta.env);
  origin = fullOrigin.slice(0, fullOrigin.lastIndexOf(':') + 1);
  // console.log(origin);
  // console.log(process.env);
}
hydrateForm(); 

// FUNCTIONS
async function forceMessageItemsRerender() {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
async function transformObject(obj: any) {
  // if (__KEY__ === null) {
  //   await setGenApi();
  // }
  await setCryptApi();
  __FORMATOBJ__(obj, key);
};
function reset() {
  firstName.value = null;
  lastName.value = null;
  login.value = null;
  email.value = null;
  pass.value = null;
  companyName.value = null;
  companyLogo.value = null;
  devise.value = null;
  userType.value = null;
  companyLogoUploader.value.reset();
};
async function submit() {
  // console.log('Register a new User !');
  // console.log(companyLogo.value);
  const valid = await validateForm();
  // console.log(`validate state: ${valid}`);
  if (valid) {
    // let ret = true;
    if (!!companyLogo.value){
      companyLogoUploader.value.upload();
    }
    // console.log(ret);
    else {
      if (platform.is.desktop){
        const res = await addUserInDb();
        // console.log(res);
        if (res) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: t('profileComponent.results.ok.add')
          });
          router.push({name: t('startLinkName')});
          // hydrateForm();
        }
        else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('profileComponent.results.ko.add')
          });
        }
      }
      else {
        const res = await addUserInSQLiteDb();
        // console.log(`Adding User Result --> ${res}`);
        if (res) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: t('profileComponent.results.ok.add')
          });
          router.push(t('startLinkTarget'));
        }
        else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('profileComponent.results.ko.add')
          });
          forceMessageItemsRerender();
        }
      }
    }
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('forms.errors.error.inputs')
    });
  }
};
async function hydrateForm() {
  // console.log(platform.is);
  if (platform.is.desktop){
    if (!import.meta.env.SSR){
      let obj = {};
      selectDevisesOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.devise');
      obj.cannotSelect = true;
      obj.deviseId = 0;
      obj.symbole = null;
      obj.libelle = null;
      selectDevisesOption.value.push(obj);
      invoiceStore.getAllDevises()
        .then((res) => {
          for (const k in res) {
            obj = {};
            obj.value = res[k].deviseId;
            obj.label = `${res[k].symbole} - ${res[k].libelle}`;
            obj.cannotSelect = false;
            obj.deviseId = res[k].deviseId;
            obj.symbole = res[k].symbole;
            obj.libelle = res[k].libelle;
            selectDevisesOption.value.push(obj);
          }
        }, () => {
          messageStore.messages.push({
            severity: true,
            content: t('invoicesComponent.results.ko.fetch_devises', {err: 'Empty devise !'})
          });
          messageVisibility.value = true;
          messageStore.setMessagesVisibility(true);
        })
        .catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t('invoicesComponent.results.ko.fetch_devises', {err: err})
          });
          messageVisibility.value = true;
          messageStore.setMessagesVisibility(true);
        });

      obj = {};
      selectUserTypesOption.value = [];
      obj.value = 0;
      obj.label = t('profileComponent.placeholders.userType');
      obj.cannotSelect = true;
      obj.userTypeId = 0;
      obj.regular = null;
      obj.admin = null;
      selectUserTypesOption.value.push(obj);
      userStore.getUserTypes()
          .then((res) => {
            for (const k in res) {
              let label = res[k].regular && !res[k].admin ? t('profileComponent.libelles.types.regular') : '';
              label = res[k].admin && !res[k].regular ? t('profileComponent.libelles.types.admin') : label;
              label = res[k].admin && res[k].regular ? t('profileComponent.libelles.types.regular')+', '+t('profileComponent.libelles.types.admin') : label;
              obj = {};
              obj.value = res[k].userTypeId;
              obj.label = label;
              obj.cannotSelect = false;
              obj.userTypeId = res[k].userTypeId;
              obj.regular = res[k].regular;
              obj.admin = res[k].admin;
              selectUserTypesOption.value.push(obj);
            }
          }, () => {
            messageStore.messages.push({
              severity: true,
              content: t('profileComponent.results.ko.fetch_userTypes', {err: 'Empty user type !'})
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          })
          .catch((err) => {
            messageStore.messages.push({
              severity: true,
              content: t('profileComponent.results.ko.fetch_userTypes', {err: err})
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          });
    }    
  } 
  else if(platform.is.mobile) {
    // console.log(await get(`${origin}${process.env.PORT_SSR}${process.env.PUBLIC_PATH}/api/invoices/devises`));
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      // const tables = await props.dbConn.getTableList();   
      // console.log(tables);
      let obj = {};
      selectDevisesOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.devise');
      obj.cannotSelect = true;
      obj.deviseId = 0;
      obj.symbole = null;
      obj.libelle = null;
      selectDevisesOption.value.push(obj);
      let sql = 'SELECT \`devise\`.\`deviseId\`, \`devise\`.\`symbole\`, \`devise\`.\`libelle\` FROM \`devise\`;';
      let values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length) {
        const res = values.values;
        for (const k in res) {
          obj = {};
          obj.value = res[k].deviseId;
          obj.label = `${res[k].symbole} - ${res[k].libelle}`;
          obj.cannotSelect = false;
          obj.deviseId = res[k].deviseId;
          obj.symbole = res[k].symbole;
          obj.libelle = res[k].libelle;
          selectDevisesOption.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_devises', { err: 'Select from devise (empty table) of SQLite DB !' })
            }
          ],
          messagesVisibility: true
        });
        messageVisibility.value = true;
      }

      obj = {};
      selectUserTypesOption.value = [];
      obj.value = 0;
      obj.label = t('profileComponent.placeholders.userType');
      obj.cannotSelect = true;
      obj.userTypeId = 0;
      obj.regular = null;
      obj.admin = null;
      selectUserTypesOption.value.push(obj);
      sql = 'SELECT \`user_type\`.\`userTypeId\`, \`user_type\`.\`regular\`, \`user_type\`.\`admin\` FROM \`user_type\`;';
      values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length) {
        const res = values.values;
        for (const k in res) {
          let label = res[k].regular && !res[k].admin ? t('profileComponent.libelles.types.regular') : '';
            label = res[k].admin && !res[k].regular ? t('profileComponent.libelles.types.admin') : label;
            label = res[k].admin && res[k].regular ? t('profileComponent.libelles.types.regular')+', '+t('profileComponent.libelles.types.admin') : label;
          obj = {};
          obj.value = res[k].userTypeId;
          obj.label = label;
          obj.cannotSelect = false;
          obj.userTypeId = res[k].userTypeId;
          obj.regular = res[k].regular;
          obj.admin = res[k].admin;
          selectUserTypesOption.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('profileComponent.results.ko.fetch_userTypes', { err: 'Select from userType (empty table) of SQLite DB !' })
            }
          ],
          messagesVisibility: true
        });
        messageVisibility.value = true;
      }
      closeDbConnection(props.dbConn);
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('profileComponent.results.ko.fetch_user', { err: 'Unable to open SQLite DB !' })
          }
        ],
        messagesVisibility: true
      });
      messageVisibility.value = true;
    }
  }
};
async function checkEmail() {
  const obj = {
    email: email.value
  };
  await transformObject(obj);
  //console.log(obj);
  if (platform.is.desktop) {
    return userAxiosService.checkEmail(obj.email)
      .then((res) => {
        if (!res.data.length)
          return true;
        else
          return false;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('profileComponent.results.ko.checkEmail', {err: err})
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
  }
  else {
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      let sql = `SELECT \`user\`.\`email\` FROM \`user\` WHERE \`user\`.\`email\` = '${obj.email}';`;
      let values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('profileComponent.results.ko.checkEmail', { err: 'Unable to open SQLite DB !' })
          }
        ],
        messagesVisibility: true
      });
      messageVisibility.value = true;
    }
  }
};
async function addUserInDb() {
  const obj = {
    firstname: firstName.value,
    lastname: lastName.value,
    login: login.value,
    email: email.value,
    password: pass.value,
    companyName: companyName.value,
    companyLogo: !!companyLogo.value ? companyLogo.value : null,
    deviseId: devise.value.deviseId,
    type: userType.value.userTypeId,
  };
  await transformObject(obj);
  return userAxiosService.create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('profileComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('profileComponent.results.ko.add', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    }); 
};
async function addUserInSQLiteDb() {
  const obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    login: login.value,
    email: email.value,
    pass: pass.value,
    companyName: companyName.value,
    companyLogo: !!companyLogo.value ? companyLogo.value : null,
    deviseId: devise.value.deviseId,
    userTypeId: userType.value.userTypeId,
  };
  await transformObject(obj);
  // console.log(obj);
  let isOpen =  await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    const sql = !!obj.companyLogo 
      ? `INSERT INTO \`user\` (\`firstName\`, \`lastName\`, \`login\`, \`email\`, \`pass\`, \`companyName\`, \`companyLogo\`, \`deviseId\`, \`userTypeId\`) VALUES ('${obj.firstName}', '${obj.lastName}', '${obj.login}', '${obj.email}', '${obj.pass}', '${obj.companyName}', '${obj.companyLogo}', '${obj.deviseId}', '${obj.userTypeId}');` 
      : `INSERT INTO \`user\` (\`firstName\`, \`lastName\`, \`login\`, \`email\`, \`pass\`, \`companyName\`, \`deviseId\`, \`userTypeId\`) VALUES ('${obj.firstName}', '${obj.lastName}', '${obj.login}', '${obj.email}', '${obj.pass}', '${obj.companyName}', '${obj.deviseId}', '${obj.userTypeId}');`;
    // console.log(sql);
    // console.log(await newQuery(props.dbConn, 'SELECT * FROM user;'));
    const values = await newRun(props.dbConn, sql);
    let ret = false;
    // console.log(values);
    if (!!values && values.changes.changes) {
      // console.log(`User inserted with id --> ${values.changes.lastId}`);
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('profileComponent.results.ok.add')
          }
        ],
        messagesVisibility: true
      });
      ret = true;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('profileComponent.results.ko.add', {err: 'Insert user to SQLite DB !'})
          }
        ],
        messagesVisibility: true
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  else {
    await prefs.setPref('message', {
      messages: [
        {
          severity: true,
          content: t('profileComponent.results.ko.update', { err: 'Unable to open SQLite DB !' })
        }
      ],
      messagesVisibility: true
    });
    messageVisibility.value = true;
    return false;
  }
};
// function upload() {
//   return uploadImageAxiosService
//     .upload(companyLogo.value, (event) => {
//       progress.vale = Math.round((100 * event.loaded) / event.total);
//     });
// };
function onInvalidCompanyLogo(entries) {
  // console.log(entries);
  for (const k in entries){
    const filename = entries[k].file.name;
    const filesize = entries[k].file.size;
    const ext = filename.lastIndexOf('.') !== -1 
      ? filename.slice(filename.lastIndexOf('.')) 
      : filename;
    if (entries[k].failedPropValidation === 'accept'){
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('profileComponent.errors.error.companyLogo.accept', {ext: ext})
      });
    }
    else if(entries[k].failedPropValidation === 'max-file-size'){
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('profileComponent.errors.error.companyLogo.maxFileSize', {max: maxSize, size: filesize})
      });
    }
  }
};
async function onFailedCompanyLogoUpload({xhr}) {
  const res = JSON.parse(xhr.response);
  // console.log(res);
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: t('profileComponent.results.ko.upload', {err: 'Request handling failed !'})
  });
  if (platform.is.desktop){
    messageStore.messages.push({
      severity: true,
      content: t('profileComponent.results.ko.upload', {err: `Request handling failed (${res.message}) !`})
    });
    messageStore.setMessagesVisibility(true);
  }
  else {
    await prefs.setPref('message', {
      messages: [
        {
          severity: true,
          content: t('profileComponent.results.ko.upload', { err: `Request handling failed (${res.message}) !` })
        }
      ],
      messageVisibility: true,
    });
  }
  messageVisibility.value = true;
  forceMessageItemsRerender();
  companyLogoUploader.value.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
};
async function onFileUploaded({xhr}){
  const xhrRes = JSON.parse(xhr.response);
  let res = false;
  // console.log(res);
  companyLogo.value = xhrRes.filename;
  if (platform.is.desktop){
    res = await addUserInDb();
    // console.log(res);
  }
  else {
    res = await addUserInSQLiteDb();
    // console.log(`Adding User Result --> ${res}`);
  }
  if (res) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: t('profileComponent.results.ok.add')
    });
    router.push({name: t('startLinkName')});
    // hydrateForm();
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('profileComponent.results.ko.add')
    });
    forceMessageItemsRerender();
  }
};
function factoryFn() {
  return new Promise((resolve) => {
    // console.log(files);
    resolve({
      url: `${origin}${process.env.PORT_SSR}${process.env.PUBLIC_PATH}/api/users/upload`,
      method: 'POST',
    });
  });
};
function addedFile(files) {
  // console.log(files);
  // console.log(companyLogoUploader.value);
  if (!!files && files.length) {
    companyLogoURL.value = URL.createObjectURL(files[0]);
    companyLogo.value = URL.createObjectURL(files[0]);
  }
  // else {
  //   companyLogoURL.value = null;
  // }
};
function removedFile() {
  companyLogoURL.value = null;
  companyLogo.value = null;
};
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};
</script>
