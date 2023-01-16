<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent' />
  </q-no-ssr>
  <div style='width: 100%'>
    <table-item
      :tableTitle='t("ordersComponent.tableTitle")'
      :isForm='isForm'
      addForm='orderForm'
      :tableObj='adminPropRef ? addInputObject : displayInputObject'
      :addDefaultRow='defaultRow'
      addActionName='addClick'
      @addClick='addClickFromChild'
      updateActionName='updateClick'
      @updateClick='updateClickFromChild'
      deleteActionName='deleteClick'
      @deleteClick='deleteClickFromChild'
      ident='orderId'
      :updating='formState.update'
      :adding='formState.add'
      v-if='renderComponent'
      :admin='admin'
      :display='display'
      :no_data_label='t("ordersComponent.errors.empty.tableBodyContentText")'
      :no_data_button_text='t("ordersComponent.errors.empty.buttonAdding")'
      :dbConn='dbConn'>
        <template #orderForm>
          <q-td style='text-align: center;'>
            <q-icon :name='formState.add ? "add" : "update"' size='sm'></q-icon>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='contenuAdditionnel'
              type='textarea'
              :name='addInputObject.contenuAdditionnel.name'
              :label='addInputObject.contenuAdditionnel.label'
              :hint='t("ordersComponent.hints.contenuAdditionnel")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :maxlength='30'
              :clearable='true'
              :placeholders='t("ordersComponent.placeholders.contenuAdditionnel")'
              :rules='[
                val => validContenuAdditionnel || t("ordersComponent.errors.empty.contenuAdditionnel")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='toc' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='priceHt'
              type='number'
              :name='addInputObject.priceHt.name'
              :label='addInputObject.priceHt.label'
              :readonly='true'
              :disable='true'
              :hint='t("ordersComponent.hints.priceHt")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("ordersComponent.placeholders.priceHt")'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='payments' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='true'
              :use-chips='true'
              :multiple='true'
              input-debounce='0'
              v-model='services'
              :name='addInputObject.services.name'
              :label='addInputObject.services.label'
              option-disable="cannotSelect"
              :options='selectServicesOption'
              :hint='t("ordersComponent.hints.services")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='home_repair_service' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('ordersComponent.libelles.no_option_services') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center;' class="flex-center">
            <q-btn v-if="formState.add"
              color="primary" 
              icon="add_circle" 
              :label="t('ordersComponent.errors.empty.buttonAdding')" 
              glossy unelevated
              :disabled="formSubmitButtonState"
              @click="addClickFromChild($event, true)">  
            </q-btn>
            <q-btn v-if="formState.update"
              color="secondary" 
              icon="update" 
              :label="t('ordersComponent.errors.empty.buttonUpdating')" 
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
import { nextTick, ref, provide, computed, watch } from 'vue';
// import { useOrderStore } from 'stores/order';
import { useMessageStore } from 'stores/message';
import { useServiceStore } from 'stores/service';
// import { useInvoiceStore } from 'stores/invoice';
import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import orderAxiosService from 'db/services/order.service';
import { InputObjectCollection, FormState } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
// import { useRouter } from 'vue-router';
import { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

// VARIABLES
interface OrderProps {
  orderForm?: boolean;
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection | null;
};
interface DefaultOrderRow {
  orderId: number;
  contenuAdditionnel: string;
  services: string[];
  priceHt: number;
  facture: string;
  actions: string;
};
const props = withDefaults(defineProps<OrderProps>(), {
  orderForm: false,
  admin: true,
  display: false,
  dbConn: null,
});
const $q = useQuasar();
// const router = useRouter();
const platform = $q.platform;
const renderComponent = ref(true);
const { t } = useI18n({ useScope: 'global' });
const displayInputObject: InputObjectCollection = {
  contenuAdditionnel: {
    label: t('ordersComponent.inputLabels.contenuAdditionnel'),
    head: t('ordersComponent.headTable.contenuAdditionnel'),
    name: 'contenuAdditionnel',
    placeholder: t('ordersComponent.placeholders.contenuAdditionnel'),
    disabled: false,
  },
  priceHt: {
    label: t('ordersComponent.inputLabels.priceHt'),
    head: t('ordersComponent.headTable.priceHt'),
    name: 'priceHt',
    placeholder: t('ordersComponent.placeholders.priceHt'),
    disabled: false,
  },
  services: {
    label: t('ordersComponent.inputLabels.services'),
    head: t('ordersComponent.headTable.services'),
    name: 'services',
    placeholder: t('ordersComponent.placeholders.services'),
    disabled: false,
  },
  facture: {
    label: t('ordersComponent.inputLabels.facture'),
    head: t('ordersComponent.headTable.facture'),
    name: 'facture',
    placeholder: t('ordersComponent.placeholders.facture'),
    disabled: false,
  },
};
let addInputObject: InputObjectCollection = {
  contenuAdditionnel: displayInputObject.contenuAdditionnel,
  priceHt: displayInputObject.priceHt,
  services: displayInputObject.services,
  facture: displayInputObject.facture,
  actions: {
    label: t('forms.headTable.action'),
    name: 'actions',
    head: t('forms.headTable.action'),
    placeholders: '',
    disabled: false,
  },
};
const adminPropRef = ref(props.admin);
const displayPropRef = ref(props.display);
const isForm = ref(props.orderForm);
const messageVisibility = ref(false);
const orderId = ref(0);
const contenuAdditionnel = ref(null);
const selectServicesOption = ref([]);
const services = ref([]);
const priceHt = computed(() => {
  let ret = 0;
  for (const key in  services.value) {
    ret += services.value[key].montantHt * services.value[key].quantite;
  }
  return ret;
});
// const facture = ref('');
const formState: Ref<FormState> = ({
  update: false,
  add: true,
});
const defaultRow: Ref<DefaultOrderRow[]> = ref([]);
const validContenuAdditionnel = computed(() => {
  const re = /^(([\wàåâäéèëêçìîïœöòôùûü0-9])([-\s])*){2,30}$/i;
  return re.test(contenuAdditionnel.value);
});
const nonEmptyContenuAdditionnel = computed(() => {
  return !!contenuAdditionnel.value && contenuAdditionnel.value != '';
});
const nonEmtyServices = computed(() => {
  return !!services.value && services.value.length ? true : false;
});
const formSubmitButtonState = computed(() => {
  const ret1 = !(nonEmtyServices.value);
  const ret2 = !((nonEmptyContenuAdditionnel.value &&validContenuAdditionnel.value) || !nonEmptyContenuAdditionnel.value);
  // console.log(ret1);
  // console.log(ret2);
  return ret1 || ret2;
});

let messageStore = null, 
  // orderStore = null, 
  serviceStore = null, 
  prefs = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  serviceStore = useServiceStore();
  // invoiceStore = useInvoiceStore();
  // orderStore = useOrderStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
} else {
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
async function transformObject(obj: any) {
  if (__KEY__ === null) {
    await setGenApi();
  }
  await setCryptApi();
  __FORMATOBJ__(obj);
};
async function fetchDatasForForms() {
  if (platform.is.desktop) {
    serviceStore.getAllServices()
      .then((res) => {
        // console.log(res);
        let obj = {};
        selectServicesOption.value = [];
        obj.label = t('ordersComponent.placeholders.services');
        obj.value = 0;
        obj.serviceId = 0;
        obj.nom = '';
        obj.montantHt = 0;
        obj.quantite = 0;
        obj.cannotSelect = true;
        selectServicesOption.value.push(obj);
        for (const k in res) {
          obj = {};
          obj.label = `${res[k].serviceId} - ${res[k].nom} - ${res[k].montantHt}`;
          obj.value = res[k].serviceId;
          obj.serviceId = res[k].serviceId;
          obj.nom = res[k].nom;
          obj.montantHt = res[k].montantHt;
          obj.quantite = res[k].quantite;
          obj.cannotSelect = false;
          selectServicesOption.value.push(obj);
        }
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('ordersComponent.results.ko.fetch_services', { err: err })
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });
  } else {
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
    // let isOpen = await openDbConnection(props.dbConn);
    if (isOpen) {
      const sql = 'SELECT `service`.`serviceId`, `service`.`nom`, `service`.`montantHt`, `service`.`quantite` FROM `produitservice` AS `service`;';
      const values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values) {
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        let obj = {};
        selectServicesOption.value = [];
        obj.label = t('ordersComponent.placeholders.services');
        obj.value = 0;
        obj.serviceId = 0;
        obj.nom = '';
        obj.montantHt = 0;
        obj.quantite = 0;
        obj.cannotSelect = true;
        selectServicesOption.value.push(obj);
        for (const k in res) {
          obj = {};
          obj.label = `${res[k].serviceId} - ${res[k].nom} - ${res[k].montantHt}`;
          obj.value = res[k].serviceId;
          obj.serviceId = res[k].serviceId;
          obj.nom = res[k].nom;
          obj.montantHt = res[k].montantHt;
          obj.quantite = res[k].quantite;
          obj.cannotSelect = false;
          selectServicesOption.value.push(obj);
        }
      }
      closeDbConnection(props.dbConn);
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('ordersComponent.results.ko.fetch_services', { err: 'Unable to open SQLite DB !' })
          }
        ],
        messageVisibility: true,
      }); 
      messageVisibility.value = true;
    }
  }
};
async function addClickFromChild(e: Event, db: boolean) {
  e.preventDefault();
  if (!db) {
    orderId.value = 0;
    contenuAdditionnel.value = null;
    services.value = [];
    // priceHt.value = 0;
    adminPropRef.value = true;
    displayPropRef.value = false;
    isForm.value = true;
    formState.update = false;
    formState.add = true;
    addInputObject = {
      contenuAdditionnel: displayInputObject.contenuAdditionnel,
      priceHt: displayInputObject.priceHt,
      services: displayInputObject.services,
      actions: {
        label: t('forms.headTable.action'),
        name: 'actions',
        placeholders: '',
        disabled: false,
      },
    };
    defaultRow.value[0] = {
      orderId: 0,
      contenuAdditionnel: null,
      services: [],
      priceHt: 0,
      // facture: '',
      actions: '',
    };
    await fetchDatasForForms();
    forceTableRerender();
  } else {
    // console.log('addind order to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await insertOrderInDb();
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
      ret = await insertOrderInSQLiteDb();
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
    }
    if (ret) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: t('ordersComponent.results.ok.add')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('ordersComponent.results.ko.add')
      });
    }
  }
};
async function updateClickFromChild(e: Event, db: boolean, obj: any = null) {
  e.preventDefault();
  // console.log(obj);
  // console.log(id);
  if (!db) {
    let servicesSelected = [];
    let servObj = {}; 
    for (const k in obj.Services) {
      servObj = {};
      servObj.value = obj.Services[k].serviceId;
      servObj.label = `${obj.Services[k].serviceId} - ${obj.Services[k].nom} - ${obj.Services[k].montantHt}`;
      servObj.serviceId = obj.Services[k].serviceId;
      servObj.montantHt = obj.Services[k].montantHt;
      servObj.nom = obj.Services[k].nom;
      servObj.quantite = obj.Services[k].quantite;
      servObj.cannotSelect = false;
      servicesSelected.push(servObj);
    }
    isForm.value = true;
    formState.update = true;
    formState.add = false;
    addInputObject = {
      contenuAdditionnel: displayInputObject.contenuAdditionnel,
      priceHt: displayInputObject.priceHt,
      services: displayInputObject.services,
      actions: {
        label: t('forms.headTable.action'),
        name: 'actions',
        placeholders: '',
        disabled: false,
      },
    };
    defaultRow.value[0] = {
      orderId: obj.orderId,
      contenuAdditionnel: obj.contenuAdditionnel,
      services: servicesSelected,
      priceHt: obj.priceHt,
      actions: ''
    };
    orderId.value = id;
    contenuAdditionnel.value = obj.contenuAdditionnel;
    services.value = servicesSelected;
    // priceHt.value = obj.priceHt;
    await fetchDatasForForms();
    forceTableRerender();
  } else {
    // orderId.value = id;
    // console.log('updating order to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await updateOrderInDb();
      if (ret){
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    } else {
      ret = await updateOrderInSQLiteDb();
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
        message: t('ordersComponent.results.ok.update')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('ordersComponent.results.ko.update')
      });
    }
  }
};
async function deleteClickFromChild(e: Event, id: number) {
  e.preventDefault();
  orderId.value = id;
  // console.log('deleting order from db !');
  let ret;
  if (platform.is.desktop) {
    ret = deleteOrderFromDb();
    if (ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  } else {
    ret = await deleteOrderFromSQLiteDb();
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
      message: t('ordersComponent.results.ok.delete')
    });
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('ordersComponent.results.ko.delete')
    });
  }
};
async function insertOrderInDb() {
  const obj = {
    contenuAdditionnel: contenuAdditionnel.value,
    services: services.value,
    priceHt: priceHt.value
  };
  await transformObject(obj);
  return orderAxiosService.create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('ordersComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('ordersComponent.results.ko.add', { err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function insertOrderInSQLiteDb() {
  const obj = {
    contenuAdditionnel: contenuAdditionnel.value,
    priceHt: priceHt.value,
    services: services.value
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = 'INSERT INTO \`commande\` (\`contenuAdditionnel\`, \`priceHt\`) VALUES (?, ?);';
    let values = await newRun(props.dbConn, sql, [obj.contenuAdditionnel, obj.priceHt]);
    let ret = false;
    if (values.changes.changes) {
      sql = 'INSERT INTO \`contains\` (\`orderId\`, \`serviceId\`) VALUES ';
      for (const k in obj.services) {
        sql += k != obj.services.length - 1 ? `(${values.changes.lastId},${obj.services[k].serviceId}),` : `(${values.changes.lastId},${obj.services[k].serviceId});`;
      }
      // console.log(sql);
      values = await newRun(props.dbConn, sql);
      if (values.changes.changes) {
        await prefs.setPref('message', {
          messages: [
            {
              severity: false,
              content: t('ordersComponent.results.ok.add')
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
              content: t('ordersComponent.results.ko.add', { err: 'Adding services in contains table of SQLite DB !'})
            }
          ],
          messageVisibility: true,
        });
      }
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('ordersComponent.results.ko.add', { err: 'Adding order in SQLite DB !'})
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
        content: t('ordersComponent.results.ko.add', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true
  });
  messageVisibility.value = true;
  return false;
};
async function updateOrderInDb() {
  const obj = {
    contenuAdditionnel: contenuAdditionnel.value,
    priceHt: parseFloat(priceHt.value),
    services: services.value
  };
  await transformObject(obj);
  return orderAxiosService.update(orderId.value, obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('ordersComponent.results.ok.update')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('ordersComponent.results.ko.update', { err: err })
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function updateOrderInSQLiteDb() {
  const obj = {
    contenuAdditionnel: contenuAdditionnel.value,
    priceHt: parseFloat(priceHt.value),
    services: services.value
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    let sql = 'UPDATE \`commande\` SET \`contenuAdditionnel\`=?, \`priceHt\`=? WHERE \`orderId\` = ?;';
    // console.log(sql);
    const values = await newRun(props.dbConn, sql, [obj.contenuAdditionnel, obj.priceHt, orderId.value]);
    if (values.changes.changes) {
      sql = `SELECT \`contains\`.\`orderId\`, \`contains\`.\`serviceId\` FROM \`contains\` WHERE \`contains\`.\`orderId\`= '${orderId.value}';`;
      const val = await newQuery(props.dbConn, sql);
      // console.log('select query !');
      // console.log(sql);
      // console.log('select values !');
      // console.log(val);
      if (val != {}) {
        sql = `DELETE FROM \`contains\` WHERE \`orderId\`= '${orderId.value}';`;
        // console.log(sql);
        const values = await newRun(props.dbConn, sql);
        if (!values.changes.changes) {
            await prefs.setPref('message', {
              messages: [
                {
                  severity: true,
                  content: t('ordersComponent.results.ko.update', { err: 'Deleting services from contains table of SQLite DB !' })
                }
              ],
              messageVisibility: true,
          });
        }
      } 
      sql = 'INSERT INTO \`contains\` (\`orderId\`, \`serviceId\`) VALUES ';
      for (const k in obj.services) {
        sql += k != obj.services.length - 1 ? `(${orderId.value},${obj.services[k].serviceId}),` : `(${orderId.value},${obj.services[k].serviceId});`;
      }
      // console.log(sql);
      const values = await newRun(props.dbConn, sql);
      if (values.changes.changes) {
        await prefs.setPref('message', {
          messages: [
            {
              severity: false,
              content: t('ordersComponent.results.ok.update')
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
              content: t('ordersComponent.results.ko.update', { err: 'Adding services to contains table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        });
      }
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('ordersComponent.results.ko.update', { err: 'Updating order to SQLite DB !' })
          }
        ],
        messageVisibility: true,
      });
    }
    messageVisibility.value = true;
    // console.log('closeConnection');
    closeDbConnection(props.dbConn);
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true,
        content: t('ordersComponent.results.ko.update', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
function deleteOrderFromDb() {
  return orderAxiosService.delete(orderId.value)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('ordersComponent.results.ok.delete')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: false,
        content: t('ordersComponent.results.ko.delete', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function deleteOrderFromSQLiteDb() {
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    const sql = `DELETE FROM \`commande\` WHERE \`orderId\`= '${orderId.value}';`;
    const values = await newRun(props.dbConn, sql);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('ordersComponent.results.ok.delete')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('ordersComponent.results.ko.delete', {err: 'Deleting order from SQLite DB !'})
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
        content: t('ordersComponent.results.ko.delete', {err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};

// WATCHERS
watch(() => [ props.admin, props.display, props.orderForm ],
  ([newAdminProp, newDisplayProp, newOrderForm]) => {
    // console.log(`newAdminProp -> ${newAdminProp}/newDisplayProp --> ${newDisplayProp}/newOrderForm --> ${newOrderForm}`);
    adminPropRef.value = newAdminProp;
    displayPropRef.value = newDisplayProp;
    isForm.value = newOrderForm;
    forceTableRerender();
  }
);

// LIFECYCLE EVENTS

// OTHERS
provide('src', 'orders');
</script>
