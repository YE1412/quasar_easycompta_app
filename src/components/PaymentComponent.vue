<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent' />
  </q-no-ssr>
  <div style='width: 100%'>
    <table-item
      :tableTitle='t("paymentsComponent.tableTitle")'
      :isForm='isForm'
      addForm='paymentForm'
      :tableObj='adminPropRef ? addInputObject : displayInputObject'
      :addDefaultRow='defaultRow'
      addActionName='addClick'
      @addClick='addClickFromChild'
      updateActionName='updateClick'
      @updateClick='updateClickFromChild'
      deleteActionName='deleteClick'
      @deleteClick='deleteClickFromChild'
      ident='paymentId'
      :updating='formState.update'
      :adding='formState.add'
      v-if='renderComponent'
      :admin='admin'
      :display='display'
      :no_data_label='t("paymentsComponent.errors.empty.tableBodyContentText")'
      :no_data_button_text='t("paymentsComponent.errors.empty.buttonAdding")'
      :dbConn='dbConn'>
        <template #paymentForm>
          <q-td style='text-align: center;'>
            <q-icon :name='formState.add ? "add" : "update"' size='sm'></q-icon>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='false'
              :use-chips='false'
              :multiple='false'
              input-debounce='0'
              v-model='etat'
              :name='addInputObject.etat.name'
              :label='addInputObject.etat.label'
              option-disable="cannotSelect"
              :options='selectEtatsOption'
              :hint='t("paymentsComponent.hints.etat")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyEtat || t("paymentsComponent.errors.empty.etat")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='approval' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('paymentsComponent.libelles.no_option_etat') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='paymentValue'
              type='number'
              :name='addInputObject.paymentValue.name'
              :label='addInputObject.paymentValue.label'
              :readonly='false'
              :disable='false'
              :hint='t("paymentsComponent.hints.paymentValue")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("paymentsComponent.placeholders.paymentValue")'
              :reactive-rules='true'
              :rules='[
                val => nonEmptyValue || t("paymentsComponent.errors.empty.paymentValue"),
                val => validValue || t("paymentsComponent.errors.error.paymentValue", { val: maxValue })
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='payments' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='false'
              :use-chips='false'
              :multiple='false'
              input-debounce='0'
              v-model='paymentType'
              :name='addInputObject.paymentType.name'
              :label='addInputObject.paymentType.label'
              option-disable="cannotSelect"
              :options='selectTypesOption'
              :hint='t("paymentsComponent.hints.paymentType")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyType || t("paymentsComponent.errors.empty.paymentType")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='credit_card' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('paymentsComponent.libelles.no_option_type') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='false'
              :use-chips='false'
              :multiple='false'
              input-debounce='0'
              v-model='facture'
              :name='addInputObject.facture.name'
              :label='addInputObject.facture.label'
              option-disable="cannotSelect"
              :options='selectInvoicesOption'
              :hint='t("paymentsComponent.hints.facture")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyFacture || t("paymentsComponent.errors.empty.facture")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='receipt_long' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('paymentsComponent.libelles.no_option_invoice') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center;' class="flex-center">
            <q-btn v-if="formState.add"
              color="primary" 
              icon="add_circle" 
              :label="t('paymentsComponent.errors.empty.buttonAdding')" 
              glossy unelevated
              :disabled="formSubmitButtonState"
              @click="addClickFromChild($event, true)">  
            </q-btn>
            <q-btn v-if="formState.update"
              color="secondary" 
              icon="update" 
              :label="t('paymentsComponent.errors.empty.buttonUpdating')" 
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
import { useUserStore } from 'stores/user';
import { useMessageStore } from 'stores/message';
import { usePaymentStore } from 'stores/payment';
import { useInvoiceStore } from 'stores/invoice';
import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import paymentAxiosService from 'db/services/payment.service';
import { InputObjectCollection, FormState } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
// import { useRouter } from 'vue-router';
import { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeDbConnection } from 'cap/storage';
import { setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

// VARIABLES
interface PaymentProps {
  paymentForm?: boolean;
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection | null;
};
interface DefaultPaymentRow {
  paymentId: number;
  etat: number;
  paymentValue: number;
  paymentType: number;
  facture: string;
  actions: string;
};
const props = withDefaults(defineProps<PaymentProps>(), {
  paymentForm: false,
  admin: true,
  display: false,
  dbConn: null,
});
const app = getCurrentInstance();
const key = app.appContext.config.globalProperties.$key;
const $q = useQuasar();
// const router = useRouter();
const platform = $q.platform;
const renderComponent = ref(true);
const { t } = useI18n({ useScope: 'global' });
const displayInputObject: InputObjectCollection = {
  etat: {
    label: t('paymentsComponent.inputLabels.etat'),
    head: t('paymentsComponent.headTable.etat'),
    name: 'etat',
    placeholder: t('paymentsComponent.placeholders.etat'),
    disabled: false,
  },
  paymentValue: {
    label: t('paymentsComponent.inputLabels.paymentValue'),
    head: t('paymentsComponent.headTable.paymentValue'),
    name: 'paymentValue',
    placeholder: t('paymentsComponent.placeholders.paymentValue'),
    disabled: false,
  },
  paymentType: {
    label: t('paymentsComponent.inputLabels.paymentType'),
    head: t('paymentsComponent.headTable.paymentType'),
    name: 'payment_type',
    placeholder: t('paymentsComponent.placeholders.paymentType'),
    disabled: false,
  },
  facture: {
    label: t('paymentsComponent.inputLabels.facture'),
    head: t('paymentsComponent.headTable.facture'),
    name: 'facture',
    placeholder: t('paymentsComponent.placeholders.facture'),
    disabled: false,
  },
};
let addInputObject: InputObjectCollection = {
  etat: displayInputObject.etat,
  paymentValue: displayInputObject.paymentValue,
  paymentType: displayInputObject.paymentType,
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
// console.log('Component');
// console.log(props);
const isForm = ref(props.orderForm);
const messageVisibility = ref(false);
const paymentId = ref(0);
const etat = ref(null);
const selectEtatsOption = ref([
  {
    value: -1,
    label: t('paymentsComponent.placeholders.etat'),
    etat: -1,
    cannotSelect: true
  },
  {
    value: 0,
    label: t('paymentsComponent.libelles.etats.not_paid'),
    etat: 0,
    cannotSelect: false
  },
  {
    value: 1,
    label: t('paymentsComponent.libelles.etats.paid'),
    etat: 1,
    cannotSelect: false
  }
]);
const paymentValue = ref(0);
const maxValue = computed(() => {
  return !!facture.value ? facture.value.invoiceTTPrice : 0;
});
const paymentType = ref(null);
const selectTypesOption = ref([]);
const facture = ref(null);
const selectInvoicesOption = ref([]);
const formState: Ref<FormState> = ({
  update: false,
  add: true,
});
const defaultRow: Ref<DefaultPaymentRow[]> = ref([]);
const nonEmptyEtat = computed(() => {
  return (!!etat.value && (etat.value.etat != -1));
});
const validValue = computed(() => {
  return paymentValue.value <= maxValue.value;
});
const nonEmptyValue = computed(() => {
  return !!paymentValue.value && paymentValue.value != '' ? true : false;
});
const nonEmptyType = computed(() => {
  return (!!paymentType.value && paymentType.value.value != 0);
});
const nonEmptyFacture = computed(() => {
  return !!facture.value && facture.value.value != 0;
});
const formSubmitButtonState = computed(() => {
  const ret1 = !(nonEmptyEtat.value && nonEmptyType.value);
  const ret2 = !(nonEmptyValue.value && validValue.value && nonEmptyFacture.value);
  // console.log(ret1);
  // console.log(ret2);
  return ret1 || ret2;
});

let messageStore = null, paymentStore = null, prefs = null, invoiceStore = null, userStore = null, user = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  paymentStore = usePaymentStore();
  invoiceStore = useInvoiceStore();
  userStore = useUserStore();
  messageVisibility.value = messageStore.getMessagesVisibility;
  user = userStore.getUser;
} else {
  (async () => {
    prefs = await import('cap/storage/preferences');
    const mess = await prefs.getPref('message');
    const usr = await prefs.getPref('user');
    user = !!usr ? usr.user : {};
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
  // if (__KEY__ === null) {
  //   await setGenApi();
  // }
  await setCryptApi();
  __FORMATOBJ__(obj, key);
};
async function fetchDatasForForms() {
  if (platform.is.desktop) {
    invoiceStore.getAllInvoices(user.userId)
      .then((res) => {
        let obj = {};
        selectInvoicesOption.value = [];
        obj.value = 0;
        obj.label = t('paymentsComponent.placeholders.facture');
        obj.cannotSelect = true;
        obj.factureId = 0;
        obj.date = null;
        obj.invoiceHTPrice = 0;
        obj.invoiceTTPrice = 0;
        obj.languageId = 0;
        obj.deviseId = 0;
        obj.tvaValue = 0;
        obj.buyerId = 0;
        obj.sellerId = 0;
        obj.administratorId = 0;
        selectInvoicesOption.value.push(obj);
        for (const k in res) {
          obj = {};
          obj.value = res[k].factureId;
          obj.label = `${res[k].factureId} - ${res[k].invoiceTTPrice}`;
          obj.cannotSelect = false;
          obj.factureId = res[k].factureId;
          obj.date = res[k].date;
          obj.invoiceHTPrice = res[k].invoiceHTPrice;
          obj.invoiceTTPrice = res[k].invoiceTTPrice;
          obj.languageId = res[k].languageId;
          obj.deviseId = res[k].deviseId;
          obj.tvaValue = res[k].tvaValue;
          obj.buyerId = res[k].buyerId;
          obj.sellerId = res[k].sellerId;
          obj.administratorId = res[k].administratorId;
          selectInvoicesOption.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('paymentsComponent.results.ko.fetch_invoices', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('paymentsComponent.results.ko.fetch_invoices', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });
      paymentStore.getAllPaymentTypes()
        .then((res) => {
          let obj = {};
          selectTypesOption.value = [];
          obj.value = 0;
          obj.label = t('paymentsComponent.placeholders.paymentType');
          obj.cannotSelect = true;
          obj.paymentTypeId = 0;
          selectTypesOption.value.push(obj);
          for (const k in res) {
            let label = res[k].cb ? t('paymentsComponent.libelles.types.cb') : '';
            label = res[k].esp ? t('paymentsComponent.libelles.types.esp') : label;
            label = res[k].chq ? t('paymentsComponent.libelles.types.chq') : label;
            obj = {};
            obj.value = res[k].paymentTypeId;
            obj.label = label;
            obj.cannotSelect = false;
            obj.paymentTypeId = res[k].paymentTypeId;
            obj.cb = res[k].cb;
            obj.esp = res[k].esp;
            obj.chq = res[k].chq;
            selectTypesOption.value.push(obj);
          }
        })
        .catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t('paymentsComponent.results.ko.fetch_types', {err: err})
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
  } else {
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      let sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`languageId\`, \`facture\`.\`deviseId\`, \`facture\`.\`tvaValue\`, \`facture\`.\`buyerId\`, \`facture\`.\`sellerId\`, \`facture\`.\`administratorId\` FROM \`facture\` WHERE \`facture\`.\`administratorId\` = '${user.userId}';`;
      // console.log(sql);
      let values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values) {
        // console.log(values);
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        let obj = {};
        selectInvoicesOption.value = [];
        obj.label = t('paymentsComponent.placeholders.facture');
        obj.value = 0;
        obj.cannotSelect = true;
        obj.factureId = 0;
        obj.date = null;
        obj.invoiceHTPrice = 0;
        obj.invoiceTTPrice = 0;
        obj.languageId = 0;
        obj.deviseId = 0;
        obj.tvaValue = 0;
        obj.buyerId = 0;
        obj.sellerId = 0;
        obj.administratorId = 0;
        selectInvoicesOption.value.push(obj);
        for (const k in values.values) {
          obj = {};
          obj.label = `${res[k].factureId} - ${res[k].invoiceTTPrice}`;
          obj.value = res[k].factureId;
          obj.cannotSelect = false;
          obj.factureId = res[k].factureId;
          obj.date = res[k].date;
          obj.invoiceHTPrice = res[k].invoiceHTPrice;
          obj.invoiceTTPrice = res[k].invoiceTTPrice;
          obj.languageId = res[k].languageId;
          obj.deviseId = res[k].deviseId;
          obj.tvaValue = res[k].tvaValue;
          obj.buyerId = res[k].buyerId;
          obj.sellerId = res[k].sellerId;
          obj.administratorId = res[k].administratorId;
          selectInvoicesOption.value.push(obj);          
        }
        // console.log(`fetched`);
      } else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('paymentsComponent.results.ko.fetch_invoices', { err: 'Select from invoice table of SQLite DB !' })
            }
          ]
        }); 
        messageVisibility.value = true;
      }
      sql = 'SELECT \`payment_type\`.\`paymentTypeId\`, \`payment_type\`.\`cb\`, \`payment_type\`.\`esp\`, \`payment_type\`.\`chq\` FROM \`payment_type\`;';
      // console.log(sql);
      values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values) {
        // await setDecryptApi();
        // const res = await __TRANSFORMOBJ__(values.values);
        let obj = {};
        selectTypesOption.value = [];
        obj.label = t('paymentsComponent.placeholders.paymentType');
        obj.value = 0;
        obj.cannotSelect = true;
        obj.paymentTypeId = 0;
        obj.cb = false;
        obj.esp = false;
        obj.chq = false;
        selectTypesOption.value.push(obj);
        for (const k in values.values) {
          obj = {};
          let label = values.values[k].cb ? t('paymentsComponent.libelles.types.cb') : '';
          label = values.values[k].esp ? t('paymentsComponent.libelles.types.esp') : label;
          label = values.values[k].chq ? t('paymentsComponent.libelles.types.chq') : label;
          obj.label = label;
          obj.value = values.values[k].paymentTypeId;
          obj.cannotSelect = false;
          obj.paymentTypeId = values.values[k].paymentTypeId;
          obj.cb = values.values[k].cb;
          obj.esp = values.values[k].esp;
          obj.chq = values.values[k].chq;
          selectTypesOption.value.push(obj);          
        }
      } else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('paymentsComponent.results.ko.fetch_types', { err: 'Select from payment_type table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        }); 
        messageVisibility.value = true;
      }
      closeDbConnection(props.dbConn);
    } else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('paymentsComponent.results.ko.fetch_invoices', { err: 'Unable to open SQLite DB !' })
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
    paymentId.value = 0;
    etat.value = null;
    paymentValue.value = 0;
    paymentType.value = null;
    facture.value = null;
    adminPropRef.value = true;
    displayPropRef.value = false;
    isForm.value = true;
    formState.update = false;
    formState.add = true;
    defaultRow.value[0] = {
      paymentId: 0,
      etat: null,
      paymentValue: 0,
      paymentType: null,
      facture: null,
      actions: '',
    };
    await fetchDatasForForms();
    forceTableRerender();
  } else {
    // console.log('Adding payment to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await insertPaymentInDb();
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
      ret = await insertPaymentInSQLiteDb();
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
        message: t('paymentsComponent.results.ok.add')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('paymentsComponent.results.ko.add')
      });
    }
  }
};
async function updateClickFromChild(e: Event, db: boolean, obj: any = null) {
  e.preventDefault();
  if (!db) {
    isForm.value = true;
    formState.update = true;
    formState.add = false;
    defaultRow.value[0] = {
      paymentId: obj.paymentId,
      etat: obj.etat,
      paymentValue: obj.paymentValue,
      paymentType: obj.payment_type,
      facture: obj.facture,
      actions: ''
    };
    obj.facture.value = obj.facture.factureId;
    obj.facture.label = `${obj.facture.factureId} - ${obj.facture.invoiceTTPrice}`;
    obj.facture.cannotSelect = false;
    let label = obj.payment_type.cb ? t('paymentsComponent.libelles.types.cb') : '';
    label = obj.payment_type.esp ? t('paymentsComponent.libelles.types.esp') : label;
    label = obj.payment_type.chq ? t('paymentsComponent.libelles.types.chq') : label;
    paymentId.value = id;
    etat.value = {value: obj.etat, label: obj.etat ? t('paymentsComponent.libelles.etats.paid') : t('paymentsComponent.libelles.etats.not_paid') , etat: obj.etat, cannotSelect: false};
    paymentValue.value = obj.paymentValue;
    paymentType.value = {value: obj.payment_type.paymentTypeId, label: label, cb: obj.payment_type.cb, esp: obj.payment_type.esp, chq: obj.payment_type.chq, cannotSelect: false};
    facture.value = obj.facture;
    await fetchDatasForForms();
    forceTableRerender();
  } else {
    // console.log('Update payment to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await updatePaymentInDb();
      if (ret){
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    } else {
      ret = await updatePaymentInSQLiteDb();
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
        message: t('paymentsComponent.results.ok.update')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('paymentsComponent.results.ko.update')
      });
    }
  }
};
async function deleteClickFromChild(e: Event, id: number) {
  e.preventDefault();
  // console.log('Deleting payment from db !');
  let ret;
  paymentId.value = id;
  if (platform.is.desktop) {
    ret = deletePaymentFromDb();
    if (ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  } else {
    ret = await deletePaymentFromSQLiteDb();
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
      message: t('paymentsComponent.results.ok.delete')
    });
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('paymentsComponent.results.ko.delete')
    });
  }
};
async function insertPaymentInDb() {
  const obj = {
    etat: etat.value.etat,
    paymentValue: parseFloat(paymentValue.value),
    paymentType: paymentType.value.paymentTypeId,
    factureId: facture.value.factureId
  };
  await transformObject(obj);
  return paymentAxiosService.create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('paymentsComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('paymentsComponent.results.ko.add', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function insertPaymentInSQLiteDb() {
  const obj = {
    etat: etat.value.etat,
    paymentValue: parseFloat(paymentValue.value),
    paymentType: paymentType.value.paymentTypeId,
    factureId: facture.value.factureId
  };
  await transformObject(obj);
  let isOpen =  await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = 'INSERT INTO \`payment\` (\`etat\`, \`paymentValue\`, \`paymentType\`, \`factureId\`) VALUES (?, ?, ?, ?);';
    let values = await newRun(props.dbConn, sql, [obj.etat, obj.paymentValue, obj.paymentType, obj.factureId]);
    let ret = false;
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('paymentsComponent.results.ok.add')
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
            content: t('paymentsComponent.results.ko.add', { err: 'Adding payment to SQLite DB !' })
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
        content: t('paymentsComponent.results.ko.add', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
async function updatePaymentInDb() {
  const obj = {
    etat: etat.value.etat,
    paymentValue: parseFloat(paymentValue.value),
    paymentType: paymentType.value.paymentTypeId,
    factureId: facture.value.factureId
  };
  await transformObject(obj);
  return paymentAxiosService.update(paymentId.value, obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('paymentsComponent.results.ok.update')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('paymentsComponent.results.ko.update', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function updatePaymentInSQLiteDb() {
  const obj = {
    etat: etat.value.etat,
    paymentValue: parseFloat(paymentValue.value),
    paymentType: paymentType.value.paymentTypeId,
    factureId: facture.value.factureId
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    let sql = 'UPDATE \`payment\` SET \`etat\`=?, \`paymentValue\`=?, \`paymentType\`=?, \`factureId\`=? WHERE \`paymentId\` = ?;';
    const values = await newRun(props.dbConn, sql, [obj.etat, obj.paymentValue, obj.paymentType, obj.factureId, paymentId.value]);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('paymentsComponent.results.ok.update')
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
            content: t('paymentsComponent.results.ko.update', { err: 'Updating payment to SQLite DB !' })
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
        content: t('paymentsComponent.results.ko.update', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
function deletePaymentFromDb() {
  return paymentAxiosService.delete(paymentId.value)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('paymentsComponent.results.ok.delete')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('paymentsComponent.results.ko.delete', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function deletePaymentFromSQLiteDb() {
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    const sql = `DELETE FROM \`payment\` WHERE \`paymentId\`= '${paymentId.value}';`;
    const values = await newRun(props.dbConn, sql);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('paymentsComponent.results.ok.delete')
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
            content: t('paymentsComponent.results.ko.delete', {err: 'Deleting payment from SQLite DB !'})
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
        content: t('paymentsComponent.results.ko.delete', {err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};

// WATCHERS
watch(() => [ props.admin, props.display, props.paymentForm ],
  ([newAdminProp, newDisplayProp, newPaymentForm]) => {
    // console.log(`newAdminProp -> ${newAdminProp}/newDisplayProp --> ${newDisplayProp}/newPaymentForm --> ${newPaymentForm}`);
    adminPropRef.value = newAdminProp;
    displayPropRef.value = newDisplayProp;
    isForm.value = newPaymentForm;
    forceTableRerender();
  }
);

// LIFECYCLE EVENTS

// OTHERS
provide('src', 'payments');
</script>
