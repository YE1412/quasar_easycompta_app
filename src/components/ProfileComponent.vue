<template>
  <MessagesItem v-if='messageVisibility && renderComponent' />
  <div class='q-pt-lg q-pb-lg SenExtrabold-font text-h2 text-uppercase text-center text-bold'>{{ t('profileComponent.titles.update') }}</div>
  <div class='q-pa-lg' style='width: 70%'>
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
        disabled
        readonly
        :rules="[ val => nonEmptyEmail || t('profileComponent.errors.empty.email'),
          val => validEmail || t('profileComponent.errors.error.email')
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
          ref="companyLogoUploader"
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
        :factory="upload"
        accept="image/*"
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
      <div>
        <q-btn :label="t('profileComponent.libelles.updateButton')" type="submit" color="primary"/>
        <q-btn :label="t('profileComponent.libelles.resetButton')" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, computed, watch, nextTick } from 'vue';
import MessagesItem from './MessagesItem.vue';
import { useUserStore } from 'stores/user';
import { useInvoiceStore } from 'stores/invoice';
import { useMessageStore } from 'stores/message';
import userAxiosService from 'db/services/user.service';
import uploadImageAxiosService from 'db/services/upload_image.service';
import { useI18n } from 'vue-i18n';
import getConnection, { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeConnection, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { Http } from '@capacitor-community/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import * as dotenv from "dotenv";
// dotenv.config({ path: "../../envs/.env" });

// VARIABLES
interface ProfileProps {
  dbConn?: SQLiteDBConnection | null; 
};
const props = withDefaults(defineProps<ProfileProps>(), {
  dbConn: null
});
const $q = useQuasar();
const userId = ref(0);
const firstName = ref(null);
const firstNameRef = ref(null);
const lastName = ref(null);
const lastNameRef = ref(null);
const login = ref(null);
const loginRef = ref(null);
const email = ref(null);
const emailRef = ref(null);
const pass = ref(null);
const passRef = ref(null);
const companyName = ref(null);
const companyNameRef = ref(null);
const companyLogoUploader = ref(null);
const companyLogo = ref(null);
const companyLogoURL = ref(null);
const maxSize = ref(2 * 1024 * 1024);
const devise = ref(null);
const deviseRef =ref(null);
const selectDevisesOption = ref([]);
const userType = ref(null);
const userTypeRef = ref(null);
const selectUserTypesOption = ref([]); 
const platform = $q.platform;
const messageVisibility = ref(false);
const renderComponent = ref(true);
const { t } = useI18n();
const progress = ref(0);
const validFirstName = computed(() => {
  const re = /^(([a-zA-Z])([-])*){2,30}$/;
  const ret = re.test(firstName.value);
  if (!ret){
    firstNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  return ret;
});
const nonEmptyFirstName = computed(() => {
  const ret = !!firstName.value && firstName.value !== '';
  if (!ret){
    firstNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validLastName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  const ret = re.test(lastName.value);
  if (!ret){
    lastNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyLastName = computed(() => {
  const ret = !!lastName.value && lastName.value !== '';
  if (!ret){
    lastNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validLogin = computed(() => {
  const re = /^(([a-zA-Z])([_])*){2,15}$/;
  const ret = re.test(firstName.value);
  if (!ret){
    loginRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyLogin = computed(() => {
  const ret = !!login.value && login.value !== '';
  if (!ret){
    loginRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validEmail = computed(() => {
  const ret = true;
  if (!ret){
    emailRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyEmail = computed(() => {
  const ret = !!email.value && email.value !== '';
  if (!ret){
    emailRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validPass = computed(() => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_(\[\])@$!%*#?&{}])[A-Za-z\d\-_(\[\])@$!%*#?&{}]{8,30}$/;
  const ret = re.test(pass.value);
  if (!ret){
    passRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyPass = computed(() => {
  const ret = !!pass.value && pass.value !== '';
  if (!ret){
    passRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validCompanyName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  const ret = re.test(companyName.value);
  if (!ret){
    companyNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyCompanyName = computed(() => {
  const ret = !!companyName.value && companyName.value !== '';
  if (!ret){
    companyNameRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
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
    deviseRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const nonEmptyUserType = computed(() => {
  const ret = !!userType.value && userType.value.value != 0;
  if (!ret){
    userTypeRef.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }
  return ret;
});
const validateForm = computed(() => {
  const ret1 = (validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value);
  const ret2 = (nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value);
  // const ret3 = !!companyLogo.value ? validCompanyLogo.value : true ;
  return ret1 && ret2;
});
// const doGetImgForMobiles = async():HttpResponse => {
//   let ret = null;
//   const options: HttpOptions = {
//     url: `${window.location.origin}/favicon.ico`,
//     responseType: 'blob',
//     shouldEncodeUrlParams: true,
//   };
//   console.log('HTTP Capacitor GET -->');
//   // console.log($q);
//   ret = await Http.get(options);
//   return ret;
// };
// const doReadDir = async():ReaddirResult => {
//   let ret = null;

//   const options: ReaddirOptions = {
//     path: ``,
//     directory: Directory.Library
//   };
//   // await Filesystem.getUri(options)
//   console.log('Rode dir data --> ');
//   ret = await Filesystem.readdir(options);
//   return ret;
// };

let userStore = null, messageStore = null, invoiceStore = null, prefs = null, origin = null;

// DECLARATIONS
if (platform.is.desktop) {
  userStore = useUserStore();
  invoiceStore = useInvoiceStore();
  messageStore = useMessageStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
}
else {
  (async () => {
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
    // const res1 = await getRequest('assets/uploads/CL_SVG.svg');
    // console.log(res1);
    // const res2 = await downloadForMobile('svg_file_12svg', 'assets/uploads/CL_SVG.svg');
    // console.log(res2);
    // const res3 = await readFile(res2.path);
    // console.log(res3);
  })();
}
if (!import.meta.env.SSR){
  const fullOrigin = window.location.origin;
  // console.log(import.meta.env);
  origin = fullOrigin.slice(0, fullOrigin.lastIndexOf(":") + 1);
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
  if (__KEY__ === null) {
    await setGenApi();
  }
  await setCryptApi();
  __FORMATOBJ__(obj);
};
function reset() {
  firstName.value = null;
  lastName.value = null;
  login.value = null;
  // email.value = ref(null);
  pass.value = null;
  companyName.value = null;
  companyLogo.value = null;
  devise.value = null;
  userType.value = null;
  companyLogoUploader.value.reset();
};
async function submit() {
  // console.log('Submit !');
  // console.log(companyLogo.value);
  if (validateForm.value) {
    // let ret = true;
    if (!!companyLogo.value){
      // console.log(`CompanyLogo uploading !`);
      // console.log(companyLogo.value);
      // ret = await uploadForMobile();
      companyLogoUploader.value.upload();
      // if (platform.is.desktop){
      //   ret = await upload()
      //     .then((res) => {
      //       // console.log(res);
      //       return true;
      //     })
      //     .catch(async (err) => {
      //       if (platform.is.desktop) {
      //         messageStore.messages.push({
      //           severity: true,
      //           content: t('profileComponent.results.ko.upload', {err: err})
      //         });
      //       }
      //       else {
      //         await prefs.setPref('message', {
      //           messages: [
      //             {
      //               severity: true,
      //               content: t('invoicesComponent.results.ko.upload', { err: err })
      //             }
      //           ],
      //           messageVisibility: true,
      //         });
      //       }
      //       messageVisibility.value = true;
      //       $q.notify({
      //         color: 'red-5',
      //         textColor: 'white',
      //         icon: 'warning',
      //         message: t('profileComponent.results.ko.upload', {err: err})
      //       });
      //       forceMessageItemsRerender();
      //       return false;
      //     });
      // }
      // else {
      // }
    }
    // console.log(ret);
    else {
      if (platform.is.desktop){
        const res = await updateUserInDb();
        // console.log(res);
        if (res) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: t('profileComponent.results.ok.update')
          });
          // hydrateForm();
        }
        else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('profileComponent.results.ko.update')
          });
        }
      }
      else {
        const res = await updateUserInSQLiteDb();
        if (res) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: t('profileComponent.results.ok.update')
          });
          // hydrateForm();
        }
        else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: t('profileComponent.results.ko.update')
          });
        }
      }
      forceMessageItemsRerender();
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
  if (platform.is.desktop){
    if (!import.meta.env.SSR){
      userStore.retrieveUser(userStore.getUser.userId)
        .then(async (res) => {
          // console.log(res);
          // await transformObject(res);
          userId.value = res.userId;
          firstName.value = res.firstName;
          lastName.value = res.lastName;
          login.value = res.login;
          email.value = res.email;
          pass.value = null;
          companyName.value = res.companyName;
          companyLogo.value = null;
          companyLogoURL.value = !!res.companyLogo && res.companyLogo != '' ? `${window.location.origin}${process.env.PUBLIC_PATH}/assets/uploads/${res.companyLogo}` : null;
          devise.value = {value: res.devise.deviseId, label: `${res.devise.symbole} - ${res.devise.libelle}`, cannotSelect: false, deviseId: res.devise.deviseId, libelle: res.devise.libelle, symbole: res.devise.symbole};
          if (!!res.user_type) {
            let userTypeLabel = res.user_type.regular && !res.user_type.admin ? t('profileComponent.libelles.types.regular') : '';
            userTypeLabel = res.user_type.admin && !res.user_type.regular ? t('profileComponent.libelles.types.admin') : userTypeLabel;
            userTypeLabel = res.user_type.admin && res.user_type.regular ? t('profileComponent.libelles.types.regular')+', '+t('profileComponent.libelles.types.admin') : userTypeLabel;
            // console.log(userTypeLabel);
            userType.value = {value: res.user_type.userTypeId, label: userTypeLabel, cannotSelect: false, userTypeId:res.user_type.userTypeId, regular: res.user_type.regular, admin: res.user_type.admin};
          }
        })
        .catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t('profileComponent.results.ko.fetch_user', {err: err})
          });
          messageVisibility.value = true;
          messageStore.setMessagesVisibility(true);
        });

      invoiceStore.getAllDevises()
        .then((res) => {
          let obj = {};
          selectDevisesOption.value = [];
          obj.value = 0;
          obj.label = t('invoicesComponent.placeholders.devise');
          obj.cannotSelect = true;
          obj.deviseId = 0;
          obj.symbole = null;
          obj.libelle = null;
          selectDevisesOption.value.push(obj);
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

      userStore.getUserTypes()
          .then((res) => {
            let obj = {};
            selectUserTypesOption.value = [];
            obj.value = 0;
            obj.label = t('profileComponent.placeholders.userType');
            obj.cannotSelect = true;
            obj.userTypeId = 0;
            obj.regular = null;
            obj.admin = null;
            selectUserTypesOption.value.push(obj);
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
    prefs = !!prefs ? prefs : await import('cap/storage/preferences');
    const usrCookie = await prefs.getPref('user');
    let user = usrCookie.user;
    userId.value = user.userId;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    login.value = user.login;
    email.value = user.email;
    pass.value = null;
    companyName.value = user.companyName;
    companyLogo.value = null;
    companyLogoURL.value = !!user.companyLogo && user.companyLogo != '' ? `assets/uploads/${user.companyLogo}` : null;
    devise.value = {value: user.devise.deviseId, label: `${user.devise.symbole} - ${user.devise.libelle}`, cannotSelect: false, deviseId: user.devise.deviseId, libelle: user.devise.libelle, symbole: user.devise.symbole};
    let userTypeLabel = null;
    if (!!user.user_type) {
       userTypeLabel = user.user_type.regular && !user.user_type.admin ? t('profileComponent.libelles.types.regular') : '';
      userTypeLabel = user.user_type.admin && !user.user_type.regular ? t('profileComponent.libelles.types.admin') : userTypeLabel;
      userTypeLabel = user.user_type.admin && user.user_type.regular ? t('profileComponent.libelles.types.regular')+', '+t('profileComponent.libelles.types.admin') : userTypeLabel;
      // console.log(userTypeLabel);
      userType.value = {value: user.user_type.userTypeId, label: userTypeLabel, cannotSelect: false, userTypeId:user.user_type.userTypeId, regular: user.user_type.regular, admin: user.user_type.admin};
    }
    // console.log(props.dbConn);
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {

      let sql = `SELECT \`devise\`.\`deviseId\`, \`devise\`.\`symbole\`, \`devise\`.\`libelle\` FROM \`devise\`;`;
      let values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length) {
        const res = values.values;
        let obj = {};
        selectDevisesOption.value = [];
        obj.value = 0;
        obj.label = t('invoicesComponent.placeholders.devise');
        obj.cannotSelect = true;
        obj.deviseId = 0;
        obj.symbole = null;
        obj.libelle = null;
        selectDevisesOption.value.push(obj);
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
          messageVisibility: true,
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`user_type\`.\`userTypeId\`, \`user_type\`.\`regular\`, \`user_type\`.\`admin\` FROM \`user_type\`;`;
      // console.log(sql);
      values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length) {
        const res = values.values;
        let obj = {};
        selectUserTypesOption.value = [];
        obj.value = 0;
        obj.label = t('profileComponent.placeholders.userType');
        obj.cannotSelect = true;
        obj.userTypeId = 0;
        obj.regular = null;
        obj.admin = null;
        selectUserTypesOption.value.push(obj);
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
          messageVisibility: true,
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
        messageVisibility: true,
      });
      messageVisibility.value = true;
    }
  }
};
async function updateUserInDb() {
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
  // console.log(obj);
  await transformObject(obj);
  return userAxiosService.update(userId.value, obj)
    .then((res) => {
      messageStore.messages.push({
        severity: false,
        content: t('profileComponent.results.ok.update')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('profileComponent.results.ko.update', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    }); 
};
async function updateUserInSQLiteDb() {
  const obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    login: login.value,
    email: email.value,
    pass: pass.value,
    companyName: companyName.value,
    companyLogo: !!companyLogo.value ? companyLogo.value.name : null,
    deviseId: devise.value.deviseId,
    userTypeId: userType.value.userTypeId,
  };
  // console.log(userId.value);
  // console.log(obj);
  await transformObject(obj);
  let isOpen =  await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    const sql = `UPDATE \`user\` SET \`firstName\`=?, \`lastName\`=?, \`login\`=?, \`email\`=?, \`pass\`=?, \`companyName\`=?, \`companyLogo\`=?, \`deviseId\`=?, \`userTypeId\`=? WHERE \`userId\`=?;`;

    const values = await newRun(props.dbConn, sql, [obj.firstName, obj.lastName, obj.login, obj.email, obj.pass, obj.companyName, obj.companyLogo, obj.deviseId, obj.userTypeId, userId.value]);
    let ret = false;
    if (!!values && values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('profileComponent.results.ok.update')
          }
        ],
        messageVisibility: true,
      });
      const usrCookie = await prefs.getPref('user');
      usrCookie.user.firstName = firstName.value;
      usrCookie.user.lastName = lastName.value;
      usrCookie.user.login = login.value;
      usrCookie.user.email = email.value;
      usrCookie.user.pass = null;
      usrCookie.user.companyName = companyName.value;
      usrCookie.user.companyLogo = !!companyLogo.value ? companyLogo.value : null;
      usrCookie.user.devise = devise.value;
      usrCookie.user.user_type = userType.value;
      await prefs.setPref('user', usrCookie);
      ret = true;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('profileComponent.results.ko.update', {err: 'Update user in SQLite DB !'})
          }
        ],
        messageVisibility: true,
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
      messageVisibility: true,
    });
    messageVisibility.value = true;
    return false;
  }
};
function onInvalidCompanyLogo(entries) {
  // console.log(entries);
  for (const k in entries){
    const filename = entries[k].file.name;
    const filesize = entries[k].file.size;
    const ext = filename.lastIndexOf(".") !== -1 
      ? filename.slice(filename.lastIndexOf(".")) 
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
async function onFailedCompanyLogoUpload({files, xhr}) {
  const res = JSON.parse(xhr.response);
  // console.log(res);
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: t('profileComponent.results.ko.upload', {err: `Request handling failed !`})
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
  companyLogoUploader.value.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
};
async function onFileUploaded({files, xhr}){
  const xhrRes = JSON.parse(xhr.response);
  let res = false;
  // console.log(res);
  companyLogo.value = xhrRes.filename;
  if (platform.is.desktop){
    res = await updateUserInDb();
    // console.log(res);
  }
  else {
    res = await updateUserInSQLiteDb();
  }
  if (res) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: t('profileComponent.results.ok.update')
    });
    // hydrateForm();
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('profileComponent.results.ko.update')
    });
  }
  forceMessageItemsRerender();
};
function factoryFn(files) {
  return new Promise((resolve) => {
    // console.log(files);
    resolve({
      url: `${origin}${process.env.PORT_SSR}${process.env.PUBLIC_PATH}/api/users/upload`,
      method: "POST",
      // 'field-name': 'file',
      // headers: [
      //   {
      //     name: 'Content-Type',
      //     value: 'multipart/form-data'
      //   }
      // ]
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
function removedFile(files) {
  companyLogoURL.value = null;
  companyLogo.value = null;
};
// function upload() {
//   return uploadImageAxiosService
//     .upload(companyLogo.value, (event) => {
//       progress.vale = Math.round((100 * event.loaded) / event.total);
//     });
// };
// async function uploadForMobile(filePath: string): HttpUploadFileResult {
//   let ret = false;
//   let res: HttpUploadFileResult = null;
//   const options: HttpUploadFileOptions = {
//     name: 'file',
//     url: `${origin}${process.env.PORT_SSR}${process.env.PUBLIC_PATH}/api/users/upload`,
//     // url: `${window.location.origin}`,
//     filePath: filePath,
//   };
//   console.log(options);
//   res = await Http.uploadFile(options);

//   if(res.status !== 500 && res.status !== 404){
//     ret = true;
//   }
//   else {
//     console.log(res);
//   }
//   return ret;
// };
// async function readFile(path: string): ReadFileResult{
//   let ret: ReadFileResult = null;
//   const options: ReadFileOptions = {
//     path: path
//   };
//   // console.log('Reading filepath --> '+options.path);
//   ret = await Filesystem.readFile(options);
//   return ret;
// };
// async function downloadForMobile(dest: string, path?: string = '', data?: any = undefined): HttpDownloadFileResult {
//   let res: HttpDownloadFileResult = null;
//   let options: HttpDownloadFileOptions = null; 
//   if (!!data){
//     options = {
//       filePath: `${dest}`,
//       url: `${window.location.origin}${t('downloadLinkTarget')}/`,
//       data: data,
//       // fileDirectory: Directory.Documents,
//     };
//   }
//   else {
//     options = {
//       filePath: `${dest}`,
//       url: `${window.location.origin}${t('downloadLinkTarget')}/`,
//       // fileDirectory: Directory.Documents,
//     }; 
//   }
//   console.log(options.url);
//   res = await Http.downloadFile(options);
//   return res;
// };
// async function getRequest(path: string): HttpResponse {
//     let res: HttpResponse = null;
//     const options: HttpOptions = {
//     url: `${window.location.origin}/${path}`,
//     responseType: 'blob',
//   };
//   res = await Http.get(options);
//   return res;
// };
// async function readInternalDir(path: string) {
//   let ret: ReaddirResult = null;
//   const options: ReaddirOptions=  {
//     path: path,
//   };

//   ret = await Filesystem.readdir(options);
//   return ret;
// };
// async function getFileUri(path: string, withFullPath?: boolean = true): GetUriResult{
//   let ret: GetUriResult = null;
//   let options: GetUriOptions = null;
//   if (withFullPath){
//     options = {
//       path: `${path}`
//     };
//   }
//   else {
//     options = {
//       path: `${path}`,
//       directory: Directory.Documents,
//     };
//   }

//   ret = await Filesystem.getUri(options);
//   return ret;
// };
// interface HttpOptions {
//   url: string;
//   connectTimeout?: number; // How long to wait for the initial connection.
//   data?: any;
//   headers?: HttpHeaders;
//   method?: string;
//   params?: HttpParams;
//   readTimeout?: number; //  How long to wait to read additional data. Resets each time new data is received
//   responseType?: HttpResponseType; // This is used to parse the response appropriately before returning it to the requestee. If the response content-type is "json", this value is ignored.
//   shouldEncodeUrlParams?: boolean; // Use this option if you need to keep the URL unencoded in certain cases (already encoded, azure/firebase testing, etc.). The default is true.
//   webFetchExtra?: RequestInit; // Extra arguments for fetch when running on the web
// };
// interface HttpResponse {
//   data: any;
//   headers: HttpHeaders;
//   status: number;
//   url: string;
// };
// interface HttpDownloadFileOptions {
//   filePath: string; //  The path the downloaded file should be moved to
//   url: string;
//   connectTimeout?: number; // How long to wait for the initial connection.
//   data?: any;
//   fileDirectory?: Directory; // Optionally, the directory to put the file in. If this option is used, filePath can be a relative path rather than absolute
//   headers?: HttpHeaders;
//   method?: string;
//   params?: HttpParams;
//   readTimeout?: number; //  How long to wait to read additional data. Resets each time new data is received
//   responseType?: HttpResponseType; // This is used to parse the response appropriately before returning it to the requestee. If the response content-type is "json", this value is ignored.
//   shouldEncodeUrlParams?: boolean; // Use this option if you need to keep the URL unencoded in certain cases (already encoded, azure/firebase testing, etc.). The default is true.
//   webFetchExtra?: RequestInit; // Extra arguments for fetch when running on the web
// };
// interface HttpDownloadFileResult {
//   blob?: Blob;
//   path?: string;
// };
// interface HttpUploadFileOptions {
//   name: string; //  The field name to upload the file with
//   url: string; // The URL to upload the file to.
//   blob?: Blob; // For uploading a file on the web, a JS Blob to upload
//   connectTimeout?: number; // How long to wait for the initial connection
//   data?: any;
//   fileDirectory?: Directory; // Optionally, the directory to look for the file in. If this option is used, filePath can be a realtive path rather than absolute
//   filePath?: string; // For uploading a file natively, the path to the file on disk to upload
//   headers?: HttpHeaders;
//   method?: string;
//   params?: HttpParams;
//   readTimeout?: number; //  How long to wait to read additional data. Resets each time new data is received
//   responseType?: HttpResponseType; // This is used to parse the response appropriately before returning it to the requestee. If the response content-type is 'json', this value is ingnored
//   shouldEncodeUrlParams?: boolean; // Use this option if you need to keep the URL unencoded in certain cases (already encoded, azure/firebase testing, etc.). The default is true
//   webFetchExtra?: RequestInit; // Extra arguments for fetch when running on the web
// };
// interface HttpUploadFileResult {
//   data: any;
//   headers: HttpHeaders;
//   status: number;
//   url: string;
// };

// WATCHERS
// watch(
//   companyLogo,
//   async (newCompanyLogo) => {
//     // console.log(newCompanyLogo);
//     if (!!newCompanyLogo) {
//       companyLogoURL.value = URL.createObjectURL(newCompanyLogo);
//       // console.log(companyLogoURL.value);
//       // const res1 = await getFileUri('slider-2.jpg', false);
//       // console.log(res1);
//       // const res2 = await uploadForMobile(res1.uri);
//       // console.log(res2);
//     } 
//     else {
//       companyLogoURL.value = null;
//     }
//   }
// );

// LIFECYCLE EVENTS

// OTHER

</script>
