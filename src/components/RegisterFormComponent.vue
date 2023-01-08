<template>
  <MessagesItem v-if='messageVisibility && renderComponent' />
  <div class='q-pt-lg q-pb-lg SenExtrabold-font text-h2 text-uppercase text-center text-bold'>{{ t('profileComponent.titles.register') }}</div>
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
        :rules="[ val => nonEmptyEmail || t('profileComponent.errors.empty.email'),
          val => validEmail || t('profileComponent.errors.error.email'),
          val => emailCheck() || t('profileComponent.errors.error.emailBusy')
        ]"
      />
      <q-input
        filled
        type="email"
        v-model="confirmEmail"
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
import { useMessageStore } from 'stores/message';
import { useInvoiceStore } from 'stores/invoice';
import userAxiosService from 'db/services/user.service';
import uploadImageAxiosService from 'db/services/upload_image.service';
import { useI18n } from 'vue-i18n';
import getConnection, { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeConnection, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import { useRouter } from 'vue-router';

interface RegisterCompProps {
  dbConn?: SQLiteDBConnection | null; 
};
const props = withDefaults(defineProps<RegisterCompProps>(), {
  dbConn: null
});
const $q = useQuasar();
const userId = ref(0);
const firstName = ref(null);
const lastName = ref(null);
const login = ref(null);
const email = ref(null);
const confirmEmail = ref(null);
const pass = ref(null);
const confirmPass = ref(null);
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
const router = useRouter();
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
const validConfirmEmail = computed(() => {
  return (confirmEmail.value === email.value);
});
const validConfirmPass = computed(() => {
  return (confirmPass.value === pass.value);
});
const emailCheck = async () => {
  const ret = await checkEmail()
  return ret;
};
const validateForm = async () => {
  const ret1 = (validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value && validCompanyLogo.value && validConfirmEmail.value && validConfirmPass.value && await emailCheck());
  const ret2 = (nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value);
  const ret3 = !!companyLogo.value ? validCompanyLogo.value : true ;
  return ret1 && ret2 && ret3;
};

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
  email.value = ref(null);
  pass.value = null;
  companyName.value = null;
  companyLogo.value = null;
  devise.value = null;
  userType.value = null;
};
async function submit() {
  // console.log('Register a new User !');
  // console.log(companyLogo.value);
  const valid = await validateForm();
  // console.log(`validate state: ${valid}`);
  if (valid) {
    let ret = true;
    if (!!companyLogo.value){
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
            await prefs.setPref('messages', [
              {
                severity: true,
                content: t('invoicesComponent.results.ko.upload', { err: err })
              }
            ]);
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
    // console.log(ret);
    if (ret) {
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
};
async function hydrateForm() {
  // console.log(platform.is);
  if (platform.is.desktop){
    if (!import.meta.env.SSR){
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
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      // const tables = await props.dbConn.getTableList();   
      // console.log(tables);@
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
          messagesVisibility: true
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`user_type\`.\`userTypeId\`, \`user_type\`.\`regular\`, \`user_type\`.\`admin\` FROM \`user_type\`;`;
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
    companyLogo: !!companyLogo.value ? companyLogo.value.name : companyLogo.value,
    deviseId: devise.value.deviseId,
    type: userType.value.userTypeId,
  };
  await transformObject(obj);
  return userAxiosService.create(obj)
    .then((res) => {
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
    companyLogo: !!companyLogo.value ? companyLogo.value.name : companyLogo.value,
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
    console.log(sql);
    // console.log(await newQuery(props.dbConn, 'SELECT * FROM user;'));
    const values = await newRun(props.dbConn, sql);
    let ret = false;
    console.log(values);
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
function upload() {
  return uploadImageAxiosService
    .upload(companyLogo.value, (event) => {
      progress.vale = Math.round((100 * event.loaded) / event.total);
    });
};
</script>
