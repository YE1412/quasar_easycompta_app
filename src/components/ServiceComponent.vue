<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent'></MessagesItem>
  </q-no-ssr>
  <div style="width: 100%;">
    <table-item
      :tableTitle='t("servicesComponent.tableTitle")'
      :isForm='isForm'
      addForm='serviceForm'
      :tableObj='adminPropRef ? addInputObject : displayInputObject'
      :addDefaultRow='defaultRow'
      addActionName='addClick'
      @addClick='addClickFromChild'
      updateActionName='updateClick'
      @updateClick='updateClickFromChild'
      deleteActionName='deleteClick'
      @deleteClick='deleteClickFromChild'
      ident='serviceId'
      :updating='formState.update'
      :adding='formState.add'
      v-if='renderComponent'
      :admin='props.admin'
      :display='props.display'
      :no_data_label="t('servicesComponent.errors.empty.tableBodyContentText')"
      :no_data_button_text="t('servicesComponent.errors.empty.buttonAdding')"
      colSpan='4'
      :dbConn="dbConn">
      <template #serviceForm>
        <q-td style="text-align: center;"><q-icon :name="formState.add ? 'add' : 'update'" size="sm"></q-icon></q-td>
        <q-td style="text-align: center;">
          <q-input
            v-model="nom" 
            type="textarea"
            :name="addInputObject.nom.name"
            :label="addInputObject.nom.label"
            :hint="t('servicesComponent.hints.name')"
            :hide-hint="true"
            :counter="false"
            :autogrow="false"
            :maxlength="30"
            :clearable="!compact"
            :placeholders="t('servicesComponent.placeholders.name')"
            :rules="[
              val => nonEmptyNom || t('servicesComponent.errors.empty.name'),
              val => validNom || t('servicesComponent.errors.error.name')
            ]">
              <template v-slot:prepend v-if="platform.is.desktop">
                <q-icon name="badge" />
              </template>
            </q-input>
        </q-td>
        <q-td style="text-align: center;">
          <q-input 
            v-model="montantHt" 
            type="number"
            :name="addInputObject.montantHt.name"
            :label="addInputObject.montantHt.label"
            :hint="t('servicesComponent.hints.amount')"
            :hide-hint="true"
            :clearable="!compact"
            :placeholders="t('servicesComponent.placeholders.amount')"
            :rules="[
              val => nonEmptyMontantHt || t('servicesComponent.errors.empty.amount'),
              val => validMontantHt || t('servicesComponent.errors.error.amount')
            ]">
            <template v-slot:prepend v-if="platform.is.desktop">
              <q-icon name="payments" />
            </template>
          </q-input>
        </q-td>
        <q-td style="text-align: center;">
          <q-input 
            v-model="quantite" 
            type="number"
            :name="addInputObject.quantite.name"
            :label="addInputObject.quantite.label"
            :hint="t('servicesComponent.hints.quantity')"
            :hide-hint="true"
            :clearable="!compact"
            :placeholders="t('servicesComponent.placeholders.quantity')"
            :rules="[
              val => nonEmptyQuantite || t('servicesComponent.errors.empty.quantity'),
              val => validQuantite || t('servicesComponent.errors.error.quantity')
            ]">
            <template v-slot:prepend v-if="platform.is.desktop">
              <q-icon name="numbers" />
            </template>
          </q-input>
        </q-td>
        <q-td style="text-align: center;" class="flex-center">
          <q-btn v-if="formState.add"
            color="primary" 
            icon="add_circle" 
            :label="t('servicesComponent.errors.empty.buttonAdding')" 
            glossy unelevated
            :disabled="formSubmitButtonState"
            @click="addClickFromChild($event, true)">  
          </q-btn>
          <q-btn v-if="formState.update"
            color="secondary" 
            icon="update" 
            :label="t('servicesComponent.errors.empty.buttonUpdating')" 
            glossy unelevated
            :disabled="formSubmitButtonState"
            @click="updateClickFromChild($event, true)">  
          </q-btn>
        </q-td>
      </template>
    </table-item>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { nextTick, ref, provide, computed, watch, getCurrentInstance } from 'vue';
// import { useServiceStore } from 'stores/service';
import { useMessageStore } from 'stores/message';
import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import serviceAxiosService from 'db/services/service.service';
import { InputObjectCollection, FormState } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
// import 'src/globals';
// import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newRun, closeDbConnection } from 'cap/storage';
import { setCryptApi, __FORMATOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

// VARIABLES
const app = getCurrentInstance();
const key = app.appContext.config.globalProperties.$key;
const $q = useQuasar();
// const router = useRouter();
const platform = $q.platform;
const renderComponent = ref(true);
interface ServiceProps {
  serviceForm?: boolean;
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection | null;
};
interface DefaultServiceRow {
  serviceId: number;
  nom: string;
  montantHt: number;
  quantite: number;
  actions: string;
};
const props = withDefaults(defineProps<ServiceProps>(), {
  serviceForm: false,
  admin: true,
  display: false,
  dbConn: null,
});
const { t } = useI18n({ useScope: 'global' });
const displayInputObject: InputObjectCollection = {
  nom: {
    label: t('servicesComponent.inputLabels.name'),
    head: t('servicesComponent.headTable.name'),
    name: 'nom',
    placeholder: t('servicesComponent.placeholders.name'),
    disabled: false,
  },
  montantHt: {
    label: t('servicesComponent.inputLabels.amount'),
    head: t('servicesComponent.headTable.amount'),
    name: 'montantHt',
    placeholder: t('servicesComponent.placeholders.amount'),
    disabled: false,
  },
  quantite: {
    label: t('servicesComponent.inputLabels.quantity'),
    head: t('servicesComponent.headTable.quantity'),
    name: 'quantite',
    placeholder: t('servicesComponent.placeholders.quantity'),
    disabled: false,
  },
};
const addInputObject: InputObjectCollection = { 
  nom: displayInputObject.nom,
  montantHt: displayInputObject.montantHt,
  quantite: displayInputObject.quantite,
  actions: {
    label: t('forms.headTable.action'),
    name: 'actions',
    head: t('forms.headTable.action'),
    placeholder: '',
    disabled: false,
  }
};
const adminPropRef = ref(props.admin);
const displayPropRef = ref(props.display);
const isForm = ref(props.serviceForm);
const messageVisibility = ref(false);
const serviceId = ref(0);
const nom = ref('');
const montantHt = ref(0.0);
const quantite = ref(0);
const formState: Ref<FormState> = ({
  update: false,
  add: true
});
// const updateInputObject: Ref<InputObjectCollection> = ({});
// const updateInputObjectId: number = ref(0);
// const errors: string[] = ref([]);
const defaultRow: Ref<DefaultServiceRow[]> = ref([]);
const formSubmitButtonState = computed(() => {
  return !(validNom.value && nonEmptyNom.value 
    && validQuantite.value && nonEmptyQuantite.value
    && validMontantHt.value && nonEmptyMontantHt.value);
});
const validNom = computed(() => {
  const re = /^(([\wàåâäéèëêçìîïœöòôùûü])(\s)*){1,30}$/i;
  return re.test(nom.value);
});
const nonEmptyNom = computed(() => {
  return !!nom.value && nom.value !== '';
});
const validMontantHt = computed(() => {
  return parseFloat(montantHt.value) <= 1000000; 
});
const nonEmptyMontantHt= computed(() => {
  return !!montantHt.value && parseFloat(montantHt.value) != 0;
});
const validQuantite = computed(() => {
  return parseInt(quantite.value) <= 50;
});
const nonEmptyQuantite = computed(() => {
  return !!quantite.value && parseInt(quantite.value) != 0;
});
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

let messageStore = null, 
  // serviceStore = null, 
  prefs = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  // serviceStore = useServiceStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
} else {
  orientation.value = window.screen.orientation.type;
  window.addEventListener('orientationchange', handleOrientation);
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

// FUNCTIONS
async function forceTableRerender() {
  renderComponent.value = false;

  await nextTick();

  renderComponent.value = true;
};
async function addClickFromChild(e: Event, db: boolean) {
  e.preventDefault();
  if (!db) {
    serviceId.value = 0;
    nom.value = '';
    montantHt.value = 0.0;
    quantite.value = 0;
    adminPropRef.value = true;
    displayPropRef.value = false;
    isForm.value = true;
    // console.log('Form state value');
    // console.log(formState);
    formState.update = false;
    formState.add = true;
    defaultRow.value[0] = {
      serviceId: 0,
      nom: '',
      montantHt: 0.0,
      quantite: 0,
      actions: ''
    };
    forceTableRerender();
  } else {
    // console.log('Adding into DB');
    let ret;
    if (platform.is.desktop) {
      ret = await insertServiceInDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      if (props.display){
        displayPropRef.value = true;
        adminPropRef.value = false;
      } else {
        displayPropRef.value = false;
        adminPropRef.value = true;
      }
      forceTableRerender();
    } else {
      ret = await insertServiceInSQLiteDb()
        // .then((res) => {
        //   if (res) {
        //     isForm.value = false;
        //     formState.update = false;
        //     formState.add = true;
        //   }
        //   if (props.display){
        //     displayPropRef.value = true;
        //     adminPropRef.value = false;
        //   } else {
        //     displayPropRef.value = false;
        //     adminPropRef.value = true;
        //   }
        //   forceTableRerender();
        // });
      if (ret){
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      if (props.display){
        displayPropRef.value = true;
        adminPropRef.value = false;
      } else {
        displayPropRef.value = false;
        adminPropRef.value = true;
      }
      forceTableRerender();
    }
    if (ret){
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: t('servicesComponent.results.ok.add')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('servicesComponent.results.ko.add')
      });
    }
  }
};
async function updateClickFromChild(e: Event, db: boolean, obj: any = null) {
  e.preventDefault();
  if (!db) {
    serviceId.value = obj.serviceId;
    nom.value = obj.nom;
    montantHt.value = obj.montantHt;
    quantite.value = obj.quantite;
    isForm.value = true;
    formState.update = true;
    formState.add = false;
    // console.log(obj);
    defaultRow.value[0] = {
      serviceId: obj.serviceId,
      nom: obj.nom,
      montantHt: obj.montantHt,
      quantite: obj.quantite,
      actions: '',
    };
  } else {
    // console.log('Updating into DB !');
    let ret;
    if (platform.is.desktop) {
      ret = await updateServiceInDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    } else {
      ret = await updateServiceInSQLiteDb()
        // .then((res) => {
        //   if (res) {
        //     isForm.value = false;
        //     formState.update = false;
        //     formState.add = true;
        //   }
        //   forceTableRerender();
        // });
      if (ret){
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    }
    if (ret){
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: t('servicesComponent.results.ok.update')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('servicesComponent.results.ko.update')
      });
    }
  }
};
async function deleteClickFromChild(e: Event, id: number){
  e.preventDefault();
  // console.log("deleting service !");
  let ret;
  if (platform.is.desktop){
    serviceId.value = id;
    ret = deleteServiceFromDb();
    if (ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  } else {
    serviceId.value = id;
    ret = await deleteServiceFromSQLiteDb()
      // .then((res) => {
      //   if (res) {
      //     isForm.value = false;
      //     formState.update = false;
      //     formState.add = true;
      //   }
      //   forceTableRerender();
      // });
    if (ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  }
  if (ret) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: t('servicesComponent.results.ok.delete')
    });
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('servicesComponent.results.ko.delete')
    });
  }
};
async function transformObject(obj: any): any {
  // if (__KEY__ === null){
  //   await setGenApi();
  // }
  await setCryptApi();
  __FORMATOBJ__(obj, key);
};
async function insertServiceInSQLiteDb() {
  const obj = {
    nom: nom.value,
    montantHt: parseFloat(montantHt.value),
    quantite: parseInt(quantite.value),
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    const sql = 'INSERT INTO \`produitservice\` (\`montantHt\`, \`nom\`, \`quantite\`) VALUES (?, ?, ?);';
    // console.log(sql);
    const values = await newRun(props.dbConn, sql, [obj.montantHt, obj.nom, obj.quantite]);
    // console.log('Query results -->');
    // console.log(values);
    let ret = false;
    if (values.changes.changes)
    {
      await prefs.setPref('message', { 
        messages: [
          {
            severity: false, content: t('servicesComponent.results.ok.add')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true, 
            content: t('servicesComponent.results.ko.add', {err : 'Adding service in SQLite DB !'})
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true, 
        content: t('servicesComponent.results.ko.add', {err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
async function updateServiceInSQLiteDb() {
  const obj = {
    nom: nom.value,
    montantHt: parseFloat(montantHt.value),
    quantite: parseInt(quantite.value),
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  let ret = false;
  if (isOpen) {
    const sql = 'UPDATE \`produitservice\` SET \`montantHt\`=?, \`nom\`=?, \`quantite\`=? WHERE \`serviceId\` = ?;';
    // console.log(sql);
    const values = await newRun(props.dbConn, sql, [obj.montantHt, obj.nom, obj.quantite, serviceId.value]);
    // console.log('Query values -->')
    // console.log(values);
    if (values.changes.changes)
    {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false, 
            content: t('servicesComponent.results.ok.update')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true, 
            content: t('servicesComponent.results.ko.update', { err: 'Updating service in SQLite DB !' })
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true, 
        content: t('servicesComponent.results.ko.update', { err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
async function deleteServiceFromSQLiteDb() {
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    const sql = `DELETE FROM \`produitservice\` WHERE \`serviceId\` = '${serviceId.value}';`;
    // console.log(sql);
    const values = await newRun(props.dbConn, sql);
    // console.log('Query values -->')
    // console.log(values);
    if (values.changes.changes)
    {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false, 
            content: t('servicesComponent.results.ok.delete')
          }
        ],
        messageVisibility: true,
      });
      messageVisibility.value = true;
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true, 
            content: t('servicesComponent.results.ko.delete', { err: 'Deleting service in SQLite DB !' })
          }
        ],
        messageVisibility: true,
      });
      messageVisibility.value = true;
    }
    closeDbConnection(props.dbConn);
    return true;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true, 
        content: t('servicesComponent.results.ko.delete', { err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
async function insertServiceInDb() {
  const obj = {
    nom: nom.value,
    montantHt: parseFloat(montantHt.value),
    quantite: parseInt(quantite.value),
  };
  await transformObject(obj);
  return serviceAxiosService
    .create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('servicesComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('servicesComponent.results.ko.add', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
function deleteServiceFromDb() {
  return serviceAxiosService
    .delete(serviceId.value)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('servicesComponent.results.ok.delete'),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('servicesComponent.results.ko.delete', {err: err}),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function updateServiceInDb() {
  const obj = {
    nom: nom.value,
    montantHt: parseFloat(montantHt.value),
    quantite: parseInt(quantite.value),
  };
  await transformObject(obj);
  return serviceAxiosService
    .update(serviceId.value, obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('servicesComponent.results.ok.update'),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('servicesComponent.results.ko.update', {err: err}),
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};

// WATCHERS
watch(() => [ props.admin, props.display, props.serviceForm ],
  ([newAdminProp, newDisplayProp, newServiceForm]) => {
    // console.log(`newAdminProp -> ${newAdminProp}/oldAdminProp -> ${oldAdminProp}`);
    // console.log(`newDisplayProp -> ${newDisplayProp}/oldDisplayProp -> ${oldDisplayProp}`);
    adminPropRef.value = newAdminProp;
    displayPropRef.value = newDisplayProp;
    isForm.value = newServiceForm;
    forceTableRerender();
  }
);

// LIFECYCLE EVENTS
/**
 * onUpdated 
 * onUnmonted
 * onBeforeMount
 * onBeforeUpdate
 * onBeforeUnmount
 * onErrorCaptured
 * onRenderTracked
 * onRenderTriggered
 * onActivated
 * onDesactivated
 * onServePrefetch
**/

// OTHER
provide('src', 'services');
</script>
