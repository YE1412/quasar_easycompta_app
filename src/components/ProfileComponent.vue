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
      <q-file
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
      </q-file>
      <q-select
        filled
        v-model="devise"
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
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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
const lastName = ref(null);
const login = ref(null);
const email = ref(null);
const pass = ref(null);
const companyName = ref(null);
const companyLogo = ref(null);
const companyLogoURL = ref(null);
const maxSize = ref(2 * 1024 * 1024);
const devise = ref(null);
const selectDevisesOption = ref([]);
const userType = ref(null);
const selectUserTypesOption = ref([]); 
const platform = $q.platform;
const messageVisibility = ref(false);
const renderComponent = ref(true);
const { t } = useI18n();
const progress = ref(0);
const validFirstName = computed(() => {
  const re = /^(([a-zA-Z])([-])*){2,30}$/;
  return re.test(firstName.value);
});
const nonEmptyFirstName = computed(() => {
  return !!firstName.value && firstName.value !== '';
});
const validLastName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  return re.test(lastName.value);
});
const nonEmptyLastName = computed(() => {
  return !!lastName.value && lastName.value !== '';
});
const validLogin = computed(() => {
  const re = /^(([a-zA-Z])([_])*){2,15}$/;
  return re.test(firstName.value);
});
const nonEmptyLogin = computed(() => {
  return !!login.value && login.value !== '';
});
const validEmail = computed(() => {
  return true;
});
const nonEmptyEmail = computed(() => {
  return !!email.value && email.value !== '';
});
const validPass = computed(() => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_(\[\])@$!%*#?&{}])[A-Za-z\d\-_(\[\])@$!%*#?&{}]{8,30}$/;
  return re.test(pass.value);
});
const nonEmptyPass = computed(() => {
  return !!pass.value && pass.value !== '';
});
const validCompanyName = computed(() => {
  const re = /^([a-zA-Z]){2,30}$/;
  return re.test(companyName.value);
});
const nonEmptyCompanyName = computed(() => {
  return !!companyName.value && companyName.value !== '';
});
const validCompanyLogo = computed(() => {
  const re = /(\.svg)$/i;
  if (!!companyLogo.value)
    return re.test(companyLogo.value.name);
  else
    return true;
});
const nonEmptyDevise = computed(() => {
  return !!devise.value && devise.value.value != 0;
});
const nonEmptyUserType = computed(() => {
  return !!userType.value && userType.value.value != 0;
});
const validateForm = computed(() => {
  const ret1 = (validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value && validCompanyLogo.value);
  const ret2 = (nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value);
  const ret3 = !!companyLogo.value ? validCompanyLogo.value : true ;
  return ret1 && ret2 && ret3;
});

let userStore = null, messageStore = null, invoiceStore = null, prefs = null;

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
  })();
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
};
async function submit() {
  // console.log(companyLogo.value);
  if (validateForm.value) {
    let ret = true;
    if (!!companyLogo.value){
      if (platform.is.desktop){
        ret = await upload()
          .then((res) => {
            // console.log(res);
            return true;
          })
          .catch(async (err) => {
            if (platform.is.desktop) {
              messageStore.messages.push({
                severity: true,
                content: t('profileComponent.results.ko.upload', {err: err})
              });
            }
            else {
              await prefs.setPref('message', {
                messages: [
                  {
                    severity: true,
                    content: t('invoicesComponent.results.ko.upload', { err: err })
                  }
                ],
                messageVisibility: true,
              });
            }
            messageVisibility.value = true;
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: t('profileComponent.results.ko.upload', {err: err})
            });
            forceMessageItemsRerender();
            return false;
          });
      }
      else {
        console.log(`CompanyLogo uploading !`);
        console.log(companyLogo.value);
      }
    }
    // console.log(ret);
    if (ret) {
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
          hydrateForm();
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
          hydrateForm();
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
          companyLogoURL.value = !!res.companyLogo && res.companyLogo != '' ? `${window.location.origin}/dist/assets/uploads/${res.companyLogo}` : null;
          devise.value = {value: res.devise.deviseId, label: `${res.devise.symbole} - ${res.devise.libelle}`, cannotSelect: false, deviseId: res.devise.deviseId, libelle: res.devise.libelle, symbole: res.devise.symbole};
          if (!!res.user.user_type) {
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
    companyLogoURL.value = !!user.companyLogo && user.companyLogo != '' ? `${window.location.origin}/dist/assets/uploads/${user.companyLogo}` : null;
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
    companyLogo: !!companyLogo.value ? companyLogo.value.name : companyLogo.value,
    deviseId: devise.value.deviseId,
    userTypeId: userType.value.userTypeId,
  };
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
    companyLogo: !!companyLogo.value ? companyLogo.value.name : companyLogo.value,
    deviseId: devise.value.deviseId,
    userTypeId: userType.value.userTypeId,
  };
  console.log(userId.value);
  console.log(obj);
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
      const usrCookie = prefs.getPref('user');
      usrCookie.user.firstName = firstName.value;
      usrCookie.user.lastName = lastName.value;
      usrCookie.user.login = login.value;
      usrCookie.user.email = email.value;
      usrCookie.user.pass = null;
      usrCookie.user.companyName = companyName.value;
      usrCookie.user.companyLogo = !!companyLogo.value ? companyLogo.value.name : companyLogo.value;
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
function upload() {
  return uploadImageAxiosService
    .upload(companyLogo.value, (event) => {
      progress.vale = Math.round((100 * event.loaded) / event.total);
    });
};

// WATCHERS
watch(
  companyLogo,
  (newCompanyLogo) => {
    if (newCompanyLogo !== null && validCompanyLogo.value) {
      companyLogoURL.value = URL.createObjectURL(newCompanyLogo)
    } 
    else {
      companyLogoURL.value = null;
    }
  }
);

// LIFECYCLE EVENTS

// OTHER

</script>
