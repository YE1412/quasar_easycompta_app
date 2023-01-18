<template>
  <q-no-ssr>
    <MessagesItem v-if='messageVisibility && renderComponent' />
  </q-no-ssr>
  <div style="width: 100%">
    <table-item
      :tableTitle='t("invoicesComponent.tableTitle")'
      :isForm='isForm'
      addForm='invoiceForm'
      :tableObj='adminPropRef ? addInputObject : displayInputObject'
      :addDefaultRow='defaultRow'
      addActionName='addClick'
      @addClick='addClickFromChild'
      updateActionName='updateClick'
      @updateClick='updateClickFromChild'
      deleteActionName='deleteClick'
      @deleteClick='deleteClickFromChild'
      ident='factureId'
      :updating='formState.update'
      :adding='formState.add'
      v-if='renderComponent'
      :admin='admin'
      :display='display'
      :no_data_label='t("invoicesComponent.errors.empty.tableBodyContentText")'
      :no_data_button_text='t("invoicesComponent.errors.empty.buttonAdding")'
      :dbConn='dbConn'>
        <template #invoiceForm>
          <q-td style='text-align: center;'>
            <q-icon :name='formState.add ? "add" : "update"' size='sm'></q-icon>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='date'
              type='date'
              :stack-label='true'
              :name='addInputObject.date.name'
              :label='addInputObject.date.label'
              :readonly='false'
              :disable='addInputObject.date.disabled'
              :hint='t("invoicesComponent.hints.date")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("invoicesComponent.placeholders.date")'
              :reactive-rules='false'
              :rules='[
                val => nonEmptyDate || t("invoicesComponent.errors.empty.date"),
                val => validDate || t("invoicesComponent.errors.error.date")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='schedule' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='invoiceHTPrice'
              type='number'
              :name='addInputObject.invoiceHTPrice.name'
              :label='addInputObject.invoiceHTPrice.label'
              :readonly='addInputObject.invoiceHTPrice.disabled'
              :disable='addInputObject.invoiceHTPrice.disabled'
              :hint='t("invoicesComponent.hints.invoiceHTPrice")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("invoicesComponent.placeholders.invoiceHTPrice")'
              :reactive-rules='true'
              :rules='[
                val => nonEmptyInvoiceHTPrice || t("invoicesComponent.errors.empty.invoiceHTPrice"),
                val => validInvoiceHTPrice || t("invoicesComponent.errors.error.invoiceHTPrice")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='payments' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='invoiceTTPrice'
              type='number'
              :name='addInputObject.invoiceTTPrice.name'
              :label='addInputObject.invoiceTTPrice.label'
              :readonly='addInputObject.invoiceTTPrice.disabled'
              :disable='addInputObject.invoiceTTPrice.disabled'
              :hint='t("invoicesComponent.hints.invoiceTTPrice")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("invoicesComponent.placeholders.invoiceTTPrice")'
              :reactive-rules='false'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='payments' />
                </template>
            </q-input>
          </q-td>
          <q-td style='text-align: center'>
            <q-input
              v-model='tvaValue'
              type='number'
              :name='addInputObject.tvaValue.name'
              :label='addInputObject.tvaValue.label'
              :readonly='addInputObject.tvaValue.disabled'
              :disable='addInputObject.tvaValue.disabled'
              :hint='t("invoicesComponent.hints.tva")'
              :hide-hint='true'
              :counter='false'
              :autogrow='false'
              :clearable='true'
              :placeholders='t("invoicesComponent.placeholders.tva")'
              :reactive-rules='false'
              :rules='[
                val => nonEmptyTVA || t("invoicesComponent.errors.empty.tva"),
                val => validTVA || t("invoicesComponent.errors.error.tva")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='trending_up' />
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
              v-model='language'
              :name='addInputObject.langue.name'
              :label='addInputObject.langue.label'
              option-disable="cannotSelect"
              :options='selectLanguagesOption'
              :hint='t("invoicesComponent.hints.language")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyLanguage || t("invoicesComponent.errors.empty.language")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='translate' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_language') }}
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
              v-model='devise'
              :name='addInputObject.devise.name'
              :label='addInputObject.devise.label'
              option-disable="cannotSelect"
              :options='selectDevisesOption'
              :hint='t("invoicesComponent.hints.devise")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyDevise || t("invoicesComponent.errors.empty.devise")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='currency_exchange' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_devise') }}
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
              v-model='buyer'
              :name='addInputObject.buyer.name'
              :label='addInputObject.buyer.label'
              option-disable="cannotSelect"
              :options='selectBuyersOption'
              :hint='t("invoicesComponent.hints.buyer")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyBuyer || t("invoicesComponent.errors.empty.buyer")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='person_2' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_buyer') }}
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
              v-model='seller'
              :name='addInputObject.seller.name'
              :label='addInputObject.seller.label'
              option-disable="cannotSelect"
              :options='selectSellersOption'
              :hint='t("invoicesComponent.hints.seller")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptySeller || t("invoicesComponent.errors.empty.seller")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='person_4' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_seller') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='true'
              :use-chips='true'
              :multiple='true'
              input-debounce='0'
              v-model='commandes'
              :name='addInputObject.commandes.name'
              :label='addInputObject.commandes.label'
              option-disable="cannotSelect"
              :options='selectOrdersOption'
              :hint='t("invoicesComponent.hints.commande")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :rules='[
                val => nonEmptyCommandes || t("invoicesComponent.errors.empty.commande")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='shopping_cart' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_order') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center'>
            <q-select
              filled
              :use-input='true'
              :use-chips='true'
              :multiple='true'
              input-debounce='0'
              v-model='payments'
              :name='addInputObject.payments.name'
              :label='addInputObject.payments.label'
              option-disable="cannotSelect"
              :options='selectPaymentsOption'
              :hint='t("invoicesComponent.hints.payment")'
              :hide-hint='true'
              :dense='platform.is.desktop ? false : true'
              :reactive-rules='true'
              :rules='[
                val => validPayments || t("invoicesComponent.errors.error.payment")
              ]'
            >
                <template v-slot:prepend v-if='platform.is.desktop'>
                  <q-icon name='payment' />
                </template>
                <template v-slot:no-option>
                  <q-item-section class='text-grey'>
                    {{ t('invoicesComponent.libelles.no_option_payment') }}
                  </q-item-section>
                </template>
            </q-select>
          </q-td>
          <q-td style='text-align: center;' class="flex-center">
            <q-btn v-if="formState.add"
              color="primary" 
              icon="add_circle" 
              :label="t('invoicesComponent.errors.empty.buttonAdding')" 
              glossy unelevated
              :disabled="formSubmitButtonState"
              @click="addClickFromChild($event, true)">  
            </q-btn>
            <q-btn v-if="formState.update"
              color="secondary" 
              icon="update" 
              :label="t('invoicesComponent.errors.empty.buttonUpdating')" 
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
// import { useOrderStore } from 'stores/order';
import { useMessageStore } from 'stores/message';
import { useUserStore } from 'stores/user';
import { useInvoiceStore } from 'stores/invoice';
import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import invoiceAxiosService from 'db/services/invoice.service';
import { InputObjectCollection, FormState } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
// import { useRouter } from 'vue-router';
import { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeDbConnection } from 'cap/storage';
import { setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

// VARIABLES
interface InvoiceProps {
  invoiceForm?: boolean;
  admin: boolean;
  display: boolean;
  dbConn?: SQLiteDBConnection | null;
};
interface DefaultInvoiceRow {
  factureId: number;
  date: string | null;
  invoiceHTPrice: number;
  invoiceTTPrice: number;
  language: number;
  devise: number;
  tvaValue: number;
  buyer: number;
  seller: number;
  commandes: [];
  payments: [];
  actions: string | null;
};
const props = withDefaults(defineProps<InvoiceProps>(), {
  invoiceForm: false,
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
  date: {
    label: t('invoicesComponent.inputLabels.date'),
    head: t('invoicesComponent.headTable.date'),
    name: 'date',
    placeholder: t('invoicesComponent.placeholders.date'),
    disabled: false,
  },
  invoiceHTPrice: {
    label: t('invoicesComponent.inputLabels.invoiceHTPrice'),
    head: t('invoicesComponent.headTable.invoiceHTPrice'),
    name: 'invoiceHTPrice',
    placeholder: t('invoicesComponent.placeholders.invoiceHTPrice'),
    disabled: true,
  },
  invoiceTTPrice: {
    label: t('invoicesComponent.inputLabels.invoiceTTPrice'),
    head: t('invoicesComponent.headTable.invoiceTTPrice'),
    name: 'invoiceTTPrice',
    placeholder: t('invoicesComponent.placeholders.invoiceTTPrice'),
    disabled: true,
  },
  tvaValue: {
    label: t('invoicesComponent.inputLabels.tva'),
    head: t('invoicesComponent.headTable.tva'),
    name: 'tvaValue',
    placeholder: t('invoicesComponent.placeholders.tva'),
    disabled: false,
  },
  langue: {
    label: t('invoicesComponent.inputLabels.language'),
    head: t('invoicesComponent.headTable.language'),
    name: 'langue',
    placeholder: t('invoicesComponent.placeholders.language'),
    disabled: false,
  },
  devise: {
    label: t('invoicesComponent.inputLabels.devise'),
    head: t('invoicesComponent.headTable.devise'),
    name: 'devise',
    placeholder: t('invoicesComponent.placeholders.devise'),
    disabled: false,
  },
  buyer: {
    label: t('invoicesComponent.inputLabels.buyer'),
    head: t('invoicesComponent.headTable.buyer'),
    name: 'buyer',
    placeholder: t('invoicesComponent.placeholders.buyer'),
    disabled: false,
  },
  seller: {
    label: t('invoicesComponent.inputLabels.seller'),
    head: t('invoicesComponent.headTable.seller'),
    name: 'seller',
    placeholder: t('invoicesComponent.placeholders.seller'),
    disabled: false,
  },
  commandes: {
    label: t('invoicesComponent.inputLabels.commande'),
    head: t('invoicesComponent.headTable.commande'),
    name: 'commandes',
    placeholder: t('invoicesComponent.placeholders.commande'),
    disabled: false,
  },
  payments: {
    label: t('invoicesComponent.inputLabels.payment'),
    head: t('invoicesComponent.headTable.payment'),
    name: 'payments',
    placeholder: t('invoicesComponent.placeholders.payment'),
    disabled: false,
  },
};
let addInputObject: InputObjectCollection = {
  date: displayInputObject.date,
  invoiceHTPrice: displayInputObject.invoiceHTPrice,
  invoiceTTPrice: displayInputObject.invoiceTTPrice,
  tvaValue: displayInputObject.tvaValue,
  langue: displayInputObject.langue,
  devise: displayInputObject.devise,
  buyer: displayInputObject.buyer,
  seller: displayInputObject.seller,
  commandes: displayInputObject.commandes,
  payments: displayInputObject.payments,
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
const invoiceId = ref(0);
const date = ref(null);
const invoiceHTPrice = computed(() => {
  let ret = 0;
  if (commandes.value !== null){
    for (const k in commandes.value) {
      ret += commandes.value[k].priceHt;
    }
  }
  return ret;
});
const invoiceTTPrice = computed(() => {
  if (!!tvaValue.value){
    return parseFloat(invoiceHTPrice.value) * (1 + parseFloat(tvaValue.value));
  } else {
    return parseFloat(invoiceHTPrice.value);
  }
});
const maxValue = computed(() => {
  let ret = 0;
  if (commandes.value !== null){
    for (const k in commandes.value) {
      ret += commandes.value[k].priceHt;
    }
  }
  return ret;
});
const language = ref(null);
const selectLanguagesOption = ref([]);
const devise = ref(null);
const selectDevisesOption = ref([]);
const tvaValue = ref(null);
const buyer = ref(null);
const selectBuyersOption = computed(() => {
  if (seller.value !== null && allBuyers.value.length) {
    for (const k in allBuyers.value) {
      if (allBuyers.value[k].actorId === seller.value.actorId && allBuyers.value[k].actorId) {
        updateSelect(k, true, 'buyer');
        // allBuyers.value[k].cannotSelect = true;
      } else {
        if (allBuyers.value[k].actorId){
          // allBuyers.value[k].cannotSelect = false;
          updateSelect(k, false, 'buyer');
        }
      }
    }
  }
  return allBuyers.value;
});
const allBuyers = ref([]);
const seller = ref(null);
const selectSellersOption = computed(() => {
  if (buyer.value !== null && allSellers.value.length) {
    for (const k in allSellers.value) {
      if (allSellers.value[k].actorId === buyer.value.actorId && allSellers.value[k].actorId) {
        updateSelect(k, true, 'seller');
        // allSellers.value[k].cannotSelect = true;
      } else {
        if (allSellers.value[k].actorId){
          updateSelect(k, false, 'seller');
          // allSellers.value[k].cannotSelect = false;
        }
      }
    }
  }
  return allSellers.value;
});
const allSellers = ref([]);
const commandes = ref(null);
const selectOrdersOption = ref([]);
const payments = ref(null);
const selectPaymentsOption = ref([]);
const userId = ref(0);
const formState: Ref<FormState> = ({
  update: false,
  add: true,
});
const defaultRow: Ref<DefaultInvoiceRow[]> = ref([]);
const nonEmptyDate = computed(() => {
  return !!date.value && date.value != '';
});
const validDate = computed(() => {
  const dateRef = new Date(date.value);
  const now = new Date();
  return dateRef >= new Date(`${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} 00:00:00`);
});
const nonEmptyInvoiceHTPrice = computed(() => {
  return (!!invoiceHTPrice.value && invoiceHTPrice.value != 0);
});
const validInvoiceHTPrice = computed(() => {
  return parseFloat(invoiceHTPrice.value) <= maxValue.value;
});
const nonEmptyLanguage = computed(() => {
  return (!!language.value && language.value.value != 0);
});
const nonEmptyDevise = computed(() => {
  return (!!devise.value && devise.value.value != 0);
});
const nonEmptyTVA = computed(() => {
  return (!!tvaValue.value && parseFloat(tvaValue.value) != 0);
});
const validTVA = computed(() => {
  return parseFloat(tvaValue.value) > 0 && parseFloat(tvaValue.value) <= 1;
});
const nonEmptyBuyer = computed(() => {
  return (!!buyer.value && buyer.value.value != 0);
});
const nonEmptySeller = computed(() => {
  return (!!seller.value && seller.value.value != 0);
});
const nonEmptyCommandes = computed(() => {
  return (!!commandes.value && commandes.value.length > 0);
});
const validPayments = computed(() => {
  let val = 0;
  if (payments.value !== null){  
    for (const k in payments.value) {
      val += payments.value[k].paymentValue;
    }
  }
  return parseFloat(invoiceTTPrice.value) >= val;
});
const formSubmitButtonState = computed(() => {
  const ret1 = !(nonEmptyDate.value && nonEmptyInvoiceHTPrice.value && nonEmptyLanguage.value && nonEmptyDevise.value && nonEmptyTVA.value && nonEmptyBuyer.value && nonEmptySeller.value && nonEmptyCommandes.value);
  const ret2 = !(validDate.value && validInvoiceHTPrice.value && validTVA.value && validPayments.value);
  // console.log(ret1);
  // console.log(ret2);
  return ret1 || ret2;
});

let messageStore = null, invoiceStore = null, prefs = null, userStore = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  invoiceStore = useInvoiceStore();
  userStore = useUserStore();
  userId.value = userStore.getUser.userId;
  messageVisibility.value = messageStore.getMessagesVisibility;
} else {
  (async () => {
    prefs = await import('cap/storage/preferences');
    const usr = await prefs.getPref('user');
    const mess = await prefs.getPref('message');
    // console.log(mess);
    userId.value = !!usr ? usr.user.userId : 0;
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
function updateSelect(ind: number, val: boolean, type: string){
  switch(type){
    case 'buyer':
      allBuyers.value[ind].cannotSelect = val;
      break;
    case 'seller':
      allSellers.value[ind].cannotSelect = val;
      break;
    default:
      break;
  }
};
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
    let obj = {};
    selectLanguagesOption.value = [];
    obj.value = 0;
    obj.label = t('invoicesComponent.placeholders.language');
    obj.cannotSelect = true;
    obj.langueId = 0;
    obj.libelle = null;
    obj.nom = null;
    selectLanguagesOption.value.push(obj);
    invoiceStore.getAllLanguages()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].langueId;
          obj.label = res[k].libelle;
          obj.cannotSelect = false;
          obj.langueId = res[k].langueId;
          obj.libelle = res[k].libelle;
          obj.nom = res[k].nom;
          selectLanguagesOption.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_languages', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_languages', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });

      obj = {};
      selectDevisesOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.devise');
      obj.cannotSelect = true;
      obj.deviseId = 0;
      obj.libelle = null;
      obj.symbole = null;
      selectDevisesOption.value.push(obj);
      invoiceStore.getAllDevises()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].deviseId;
          obj.label = `${res[k].symbole} - ${res[k].libelle}`;
          obj.cannotSelect = false;
          obj.deviseId = res[k].deviseId;
          obj.libelle = res[k].libelle;
          obj.symbole = res[k].symbole;
          selectDevisesOption.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_devises', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_devises', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });

      obj = {};
      allBuyers.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.buyer');
      obj.cannotSelect = true;
      obj.actorId = 0;
      obj.cp = null;
      obj.email = null;
      obj.nom = null;
      obj.prenom = null;
      obj.nomRue = null;
      obj.numRue = null;
      obj.tel = null;
      obj.actorTypeId = 0;
      obj.ville = null;
      obj.numCommercant = null;
      allBuyers.value.push(obj);
      invoiceStore.getAllBuyers()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].actorId;
          obj.label = `${res[k].prenom} ${res[k].nom} - ${res[k].email}`;
          obj.cannotSelect = false;
          obj.actorId = res[k].actorId;
          obj.cp = res[k].cp;
          obj.email = res[k].email;
          obj.nom = res[k].nom;
          obj.prenom = res[k].prenom;
          obj.nomRue = res[k].nomRue;
          obj.numRue = res[k].numRue;
          obj.tel = res[k].tel;
          obj.actorTypeId = res[k].actorTypeId;
          obj.ville = res[k].ville;
          obj.numCommercant = res[k].numCommercant;
          allBuyers.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_buyers', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_buyers', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });

      obj = {};
      allSellers.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.seller');
      obj.cannotSelect = true;
      obj.actorId = 0;
      obj.cp = null;
      obj.email = null;
      obj.nom = null;
      obj.prenom = null;
      obj.nomRue = null;
      obj.numRue = null;
      obj.tel = null;
      obj.actorTypeId = 0;
      obj.ville = null;
      obj.numCommercant = null;
      allSellers.value.push(obj);
      invoiceStore.getAllSellers()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].actorId;
          obj.label = `${res[k].prenom} ${res[k].nom} - ${res[k].email}`;
          obj.cannotSelect = false;
          obj.actorId = res[k].actorId;
          obj.cp = res[k].cp;
          obj.email = res[k].email;
          obj.nom = res[k].nom;
          obj.prenom = res[k].prenom;
          obj.nomRue = res[k].nomRue;
          obj.numRue = res[k].numRue;
          obj.tel = res[k].tel;
          obj.actorTypeId = res[k].actorTypeId;
          obj.ville = res[k].ville;
          obj.numCommercant = res[k].numCommercant;
          allSellers.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_sellers', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_sellers', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });

      obj = {};
      selectOrdersOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.commande');
      obj.cannotSelect = true;
      obj.orderId = 0;
      obj.contenuAdditionnel = null;
      obj.priceHt = 0;
      obj.factureId = 0;
      selectOrdersOption.value.push(obj);
      invoiceStore.getAllOrders()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].orderId;
          obj.label = `${res[k].orderId} - ${res[k].priceHt}`;
          obj.cannotSelect = false;
          obj.orderId = res[k].actorId;
          obj.contenuAdditionnel = res[k].contenuAdditionnel;
          obj.priceHt = res[k].priceHt;
          obj.factureId = res[k].factureId;
          selectOrdersOption.value.push(obj);
        }
      }, () => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_order', {err: 'Empty result !'})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_order', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });

      obj = {};
      selectPaymentsOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.payment');
      obj.cannotSelect = true;
      obj.paymentId = 0;
      obj.etat = -1;
      obj.paymentValue = 0;
      obj.paymentType = 0;
      obj.factureId = 0;
      selectPaymentsOption.value.push(obj);
      invoiceStore.getAllPayments()
      .then((res) => {
        for (const k in res) {
          obj = {};
          obj.value = res[k].paymentId;
          obj.label = `${res[k].paymentId} - ${res[k].paymentValue}`;
          obj.cannotSelect = false;
          obj.paymentId = res[k].paymentId;
          obj.etat = res[k].etat;
          obj.paymentValue = res[k].paymentValue;
          obj.paymentType = res[k].paymentType;
          obj.factureId = res[k].factureId;
          selectPaymentsOption.value.push(obj);
        }
      }, () => {
        return;
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('invoicesComponent.results.ko.fetch_payments', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });
  }
  else {
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      let sql = 'SELECT \`langue\`.\`langueId\`, \`langue\`.\`libelle\`, \`langue\`.\`nom\` FROM \`langue\`;';
      let values = await newQuery(props.dbConn, sql);
      let obj = {};
      selectLanguagesOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.language');
      obj.cannotSelect = true;
      obj.langueId = 0;
      obj.libelle = null;
      obj.nom = null;
      selectLanguagesOption.value.push(obj);
      if (!!values && values.values.length) {
        // await setDecryptApi();
        const res = values.values;
        for (const k in res) {
          obj = {};
          obj.value = res[k].langueId;
          obj.label = res[k].libelle;
          obj.cannotSelect = false;
          obj.langueId = res[k].langueId;
          obj.libelle = res[k].libelle;
          obj.nom = res[k].nom;
          selectLanguagesOption.value.push(obj);
        }
      } 
      else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_languages', { err: 'Select from languages table of SQLite DB !' })
            }
          ],
          messagesVisibility: true
        });
        messageVisibility.value = true;
      }

      sql = 'SELECT \`devise\`.\`deviseId\`, \`devise\`.\`symbole\`, \`devise\`.\`libelle\` FROM \`devise\`;';
      values = await newQuery(props.dbConn, sql);
      obj = {};
      selectDevisesOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.devise');
      obj.cannotSelect = true;
      obj.deviseId = 0;
      obj.libelle = null;
      obj.symbole = null;
      selectDevisesOption.value.push(obj);
      if (!!values && values.values.length) {
        // await setDecryptApi();
        const res = values.values;
        for (const k in res) {
          obj = {};
          obj.value = res[k].deviseId;
          obj.label = `${res[k].symbole} - ${res[k].libelle}`;
          obj.cannotSelect = false;
          obj.deviseId = res[k].deviseId;
          obj.libelle = res[k].libelle;
          obj.symbole = res[k].symbole;
          selectDevisesOption.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_devises', { err: 'Select from devises table of SQLite DB !' })
            }
          ],
          messageVisibility: true
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`personne\`.\`actorId\`, \`personne\`.\`cp\`, \`personne\`.\`email\`,
      \`personne\`.\`nom\`, \`personne\`.\`nomRue\`, \`personne\`.\`numRue\`, \`personne\`.\`numCommercant\`, \`personne\`.\`prenom\`, \`personne\`.\`tel\`, \`personne\`.\`ville\`, \`personne\`.\`actorTypeId\` FROM \`personne\` WHERE \`personne\`.\`actorTypeId\` IN (1, 3);`;
      values = await newQuery(props.dbConn, sql);
      obj = {};
      allBuyers.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.buyer');
      obj.cannotSelect = true;
      obj.actorId = 0;
      obj.cp = null;
      obj.email = null;
      obj.nom = null;
      obj.prenom = null;
      obj.nomRue = null;
      obj.numRue = null;
      obj.tel = null;
      obj.actorTypeId = 0;
      obj.ville = null;
      obj.numCommercant = null;
      allBuyers.value.push(obj);
      if (!!values && values.values.length) {
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        for (const k in res) {
          obj = {};
          obj.value = res[k].actorId;
          obj.label = `${res[k].prenom} ${res[k].nom} - ${res[k].email}`;
          obj.cannotSelect = false;
          obj.actorId = res[k].actorId;
          obj.cp = res[k].cp;
          obj.email = res[k].email;
          obj.nom = res[k].nom;
          obj.prenom = res[k].prenom;
          obj.nomRue = res[k].nomRue;
          obj.numRue = res[k].numRue;
          obj.tel = res[k].tel;
          obj.actorTypeId = res[k].actorTypeId;
          obj.ville = res[k].ville;
          obj.numCommercant = res[k].numCommercant;
          allBuyers.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          messages :[
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_buyers', { err: 'Select from buyer table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`personne\`.\`actorId\`, \`personne\`.\`cp\`, \`personne\`.\`email\`,
      \`personne\`.\`nom\`, \`personne\`.\`nomRue\`, \`personne\`.\`numRue\`, \`personne\`.\`numCommercant\`, \`personne\`.\`prenom\`, \`personne\`.\`tel\`, \`personne\`.\`ville\`, \`personne\`.\`actorTypeId\` FROM \`personne\` WHERE \`personne\`.\`actorTypeId\` IN (1,2);`;
      values = await newQuery(props.dbConn, sql);
      obj = {};
      allSellers.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.seller');
      obj.cannotSelect = true;
      obj.actorId = 0;
      obj.cp = null;
      obj.email = null;
      obj.nom = null;
      obj.prenom = null;
      obj.nomRue = null;
      obj.numRue = null;
      obj.tel = null;
      obj.actorTypeId = 0;
      obj.ville = null;
      obj.numCommercant = null;
      allSellers.value.push(obj);
      if (!!values && values.values.length) {
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        for (const k in res) {
          obj = {};
          obj.value = res[k].actorId;
          obj.label = `${res[k].prenom} ${res[k].nom} - ${res[k].email}`;
          obj.cannotSelect = false;
          obj.actorId = res[k].actorId;
          obj.cp = res[k].cp;
          obj.email = res[k].email;
          obj.nom = res[k].nom;
          obj.prenom = res[k].prenom;
          obj.nomRue = res[k].nomRue;
          obj.numRue = res[k].numRue;
          obj.tel = res[k].tel;
          obj.actorTypeId = res[k].actorTypeId;
          obj.ville = res[k].ville;
          obj.numCommercant = res[k].numCommercant;
          allSellers.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          mesages: [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_sellers', { err: 'Select from seller table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`commande\`.\`orderId\`, \`commande\`.\`contenuAdditionnel\`, \`commande\`.\`priceHt\`,
      \`commande\`.\`factureId\` FROM \`commande\`;`;
      values = await newQuery(props.dbConn, sql);
      obj = {};
      selectOrdersOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.commande');
      obj.cannotSelect = true;
      obj.orderId = 0;
      obj.contenuAdditionnel = null;
      obj.priceHt = 0;
      obj.factureId = 0;
      selectOrdersOption.value.push(obj);
      if (!!values && values.values.length) {
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        for (const k in res) {
          obj = {};
          obj.value = res[k].orderId;
          obj.label = `${res[k].orderId} - ${res[k].priceHt}`;
          obj.cannotSelect = false;
          obj.orderId = res[k].orderId;
          obj.contenuAdditionnel = res[k].contenuAdditionnel;
          obj.priceHt = res[k].priceHt;
          obj.factureId = res[k].factureId;
          selectOrdersOption.value.push(obj);
        }
      }
      else {
        await prefs.setPref('message', {
          messages :[
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_orders', { err: 'Select from order table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        });
        messageVisibility.value = true;
      }

      sql = `SELECT \`payment\`.\`paymentId\`, \`payment\`.\`etat\`, \`payment\`.\`paymentValue\`,
      \`payment\`.\`paymentType\`, \`payment\`.\`factureId\` FROM \`payment\`;`;
      values = await newQuery(props.dbConn, sql);
      obj = {};
      selectPaymentsOption.value = [];
      obj.value = 0;
      obj.label = t('invoicesComponent.placeholders.payment');
      obj.cannotSelect = true;
      obj.paymentId = 0;
      obj.etat = -1;
      obj.paymentValue = 0;
      obj.paymentType = 0;
      obj.factureId = 0;
      selectPaymentsOption.value.push(obj);
      if (!!values && values.values.length) {
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(values.values);
        for (const k in res) {
          obj = {};
          obj.value = res[k].paymentId;
          obj.label = `${res[k].paymentId} - ${res[k].paymentValue}`;
          obj.cannotSelect = false;
          obj.paymentId = res[k].paymentId;
          obj.etat = res[k].etat;
          obj.paymentValue = res[k].paymentValue;
          obj.paymentType = res[k].paymentType;
          obj.factureId = res[k].factureId;
          selectPaymentsOption.value.push(obj);
        }
      }
      else if(!!values === false) {
        await prefs.setPref('message', {
          messages: [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.fetch_payments', { err: 'Select from payment table of SQLite DB !' })
            }
          ],
          messageVisibility: true,
        });
        messageVisibility.value = true;
      }
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('invoicesComponent.results.ko.fetch_languages', { err: 'Unable to open SQLite DB !' })
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
    invoiceId.value = 0;
    date.value = null;
    // invoiceHTPrice.value = 0;
    // invoiceTTPrice.value = 0;
    language.value = null;
    devise.value = null;
    tvaValue.value = null;
    buyer.value = null;
    seller.value = null;
    commandes.value = [];
    payments.value = [];
    adminPropRef.value = true;
    displayPropRef.value = false;
    isForm.value = true;
    formState.update = false;
    formState.add = true;
    defaultRow.value[0] = {
      factureId: 0,
      date: null,
      invoiceHTPrice: 0,
      invoiceTTPrice: 0,
      language: 0,
      devise: 0,
      tvaValue: 0,
      buyer: 0,
      seller: 0,
      commandes: [],
      payments: [],
      actions: null,
    };
    await fetchDatasForForms();
    forceTableRerender();
  } else {
    // console.log('Adding invoice to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await insertInvoiceInDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      if (props.display) {
        displayPropRef.value = true;
        adminPropRef.value = false;
      } else {
        displayPropRef.value = false;
        adminPropRef.value = true;
      }
      forceTableRerender();
    } else {
      ret = await insertInvoiceInSQLiteDb();
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
        message: t('invoicesComponent.results.ok.add')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('invoicesComponent.results.ko.add')
      });
    }
  }
};
async function updateClickFromChild(e: Event, db: boolean, obj: any = null) {
  e.preventDefault();
  if (!db) {
    // console.log(obj);
    isForm.value = true;
    formState.update = true;
    formState.add = false;
    let lang, dev, buy, sel, ord = [], pay = [], int = {};
    lang = !!obj.langue ? {value: obj.langue.langueId, label: obj.langue.libelle, cannotSelect: false, langueId: obj.langue.langueId, libelle: obj.langue.libelle, nom: obj.langue.nom} : {value: 0, label: t('invoicesComponent.placeholders.language')};
    dev = !!obj.devise ? {value: obj.devise.deviseId, label: `${obj.devise.symbole} - ${obj.devise.libelle}`, cannotSelect: false, deviseId: obj.devise.deviseId, libelle: obj.devise.libelle, symbole: obj.devise.symbole} : {value: 0, label: t('invoicesComponent.placeholders.devise')};
    buy = !!obj.buyer ? {value: obj.buyer.actorId, label: `${obj.buyer.prenom} ${obj.buyer.nom} - ${obj.buyer.email}`, cannotSelect: false, actorId: obj.buyer.actorId, prenom: obj.buyer.prenom, nom: obj.buyer.nom, email: obj.buyer.email, numRue: obj.buyer.numRue, nomRue: obj.buyer.nomRue, cp: obj.buyer.cp, ville: obj.buyer.ville, tel: obj.buyer.tel, numCommercant: obj.buyer.numCommercant, actorTypeId: obj.buyer.actorTypeId} : {value: 0, label: t('invoicesComponent.placeholders.buyer')};
    sel = !!obj.seller ? {value: obj.seller.actorId, label: `${obj.seller.prenom} ${obj.seller.nom} - ${obj.seller.email}`, cannotSelect: false, actorId: obj.seller.actorId, prenom: obj.seller.prenom, nom: obj.seller.nom, email: obj.seller.email, numRue: obj.seller.numRue, nomRue: obj.seller.nomRue, cp: obj.seller.cp, ville: obj.seller.ville, tel: obj.seller.tel, numCommercant: obj.seller.numCommercant, actorTypeId: obj.seller.actorTypeId} : {value: 0, label: t('invoicesComponent.placeholders.seller')};
    if (obj.commandes !== null) {
      for (const k in obj.commandes) {
        int = {};
        int.value = obj.commandes[k].orderId;
        int.label = `${obj.commandes[k].orderId} - ${obj.commandes[k].priceHt}`;
        int.cannotSelect = false;
        int.orderId = obj.commandes[k].orderId;
        int.contenuAdditionnel = obj.commandes[k].contenuAdditionnel;
        int.priceHt = obj.commandes[k].priceHt;
        int.factureId = obj.commandes[k].factureId;
        ord.push(int);
      }
    }
    if (obj.payments !== null) {
      for (const k in obj.payments) {
        int = {};
        int.value = obj.payments[k].paymentId;
        int.label = `${obj.payments[k].paymentId} - ${obj.payments[k].paymentValue}`;
        int.cannotSelect = false;
        int.paymentId = obj.payments[k].paymentId;
        int.paymentValue = obj.payments[k].paymentValue;
        int.paymentType = obj.payments[k].paymentType;
        int.factureId = obj.payments[k].factureId;
        int.etat = obj.payments[k].etat;
        pay.push(int);
      }
    }
    invoiceId.value = obj.factureId;
    date.value = obj.date;
    // invoiceHTPrice.value = obj.invoiceHTPrice;
    // invoiceTTPrice.value = obj.invoiceTTPrice;
    language.value = lang;
    devise.value = dev;
    tvaValue.value = obj.tvaValue;
    buyer.value = buy;
    seller.value = sel;
    commandes.value = ord;
    payments.value = pay;
    defaultRow.value[0] = {
      factureId: obj.factureId,
      date: obj.date,
      invoiceHTPrice: obj.invoiceHTPrice,
      invoiceTTPrice: obj.invoiceTTPrice,
      language:lang,
      devise: dev,
      tvaValue: obj.tvaValue,
      buyer: buy,
      seller: sel,
      commandes: ord,
      payments: pay,
      actions: null,
    };
    await fetchDatasForForms();;
    forceTableRerender();
  }
  else {
    // console.log('Update invoice to db !');
    let ret;
    if (platform.is.desktop) {
      ret = await updateInvoiceInDb();
      if (ret) {
        isForm.value = false;
        formState.update = false;
        formState.add = true;
      }
      forceTableRerender();
    }
    else {
      ret = await updateInvoiceInSQLiteDb();
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
        message: t('invoicesComponent.results.ok.update')
      });
    }
    else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: t('invoicesComponent.results.ko.update')
      });
    }
  }
};
async function deleteClickFromChild(e: Event, id: number) {
  e.preventDefault();
  // console.log('Deleting invoice from db !');
  invoiceId.value = id;
  let ret;
  if (platform.is.desktop) {
    ret = deleteInvoiceFromDb();
    if (ret) {
      isForm.value = false;
      formState.update = false;
      formState.add = true;
    }
    forceTableRerender();
  } 
  else {
    ret = await deleteInvoiceFromSQLiteDb();
    if (ret) {
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
      message: t('invoicesComponent.results.ok.delete')
    });
  }
  else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: t('invoicesComponent.results.ko.delete')
    });
  }
};
async function insertInvoiceInDb() {
  const obj = {
    date: new Date(date.value),
    invoiceHTPrice: parseFloat(invoiceHTPrice.value),
    invoiceTTPrice: parseFloat(invoiceTTPrice.value),
    languageId: language.value.langueId,
    deviseId: devise.value.deviseId,
    tvaValue: parseFloat(tvaValue.value),
    buyerId: buyer.value.actorId,
    sellerId: seller.value.actorId,
    adminId: userId.value,
    orders: commandes.value,
    payments: payments.value,
  };
  await transformObject(obj);
  // console.log(obj);
  return invoiceAxiosService.create(obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('invoicesComponent.results.ok.add')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('invoicesComponent.results.ko.add', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function insertInvoiceInSQLiteDb() {
  const obj = {
    date: date.value,
    invoiceHTPrice: parseFloat(invoiceHTPrice.value),
    invoiceTTPrice: parseFloat(invoiceTTPrice.value),
    languageId: language.value.langueId,
    deviseId: devise.value.deviseId,
    tvaValue: parseFloat(tvaValue.value),
    buyerId: buyer.value.actorId,
    sellerId: seller.value.actorId,
    adminId: userId.value,
    orders: commandes.value,
    payments: payments.value,
  };
  await transformObject(obj);
  // console.log(obj);
  let isOpen =  await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = 'INSERT INTO \`facture\` (\`date\`, \`invoiceHTPrice\`, \`invoiceTTPrice\`, \`languageId\`, \`deviseId\`, \`tvaValue\`, \`buyerId\`, \`sellerId\`, \`administratorId\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    // console.log(sql);
    let values = await newRun(props.dbConn, sql, [obj.date, obj.invoiceHTPrice, obj.invoiceTTPrice, obj.languageId, obj.deviseId, obj.tvaValue, obj.buyerId, obj.sellerId, obj.adminId]);
    let val = '';
    let ret = false;
    if (values.changes.changes && values.changes.lastId) {
      if (obj.orders.length) {
        sql = 'UPDATE \`commande\` SET \`factureId\`=? WHERE \`orderId\` IN (';
        for (const k in obj.orders) {
          sql += k < obj.orders.length - 1 ? `${obj.orders[k].orderId}, ` : `${obj.orders[k].orderId});`;
        }
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [values.changes.lastId]);
        if (!val.changes.changes) {
          await prefs.setPref('message', {
            messages: [
              {
                severity: true,
                content: t('invoicesComponent.results.ko.add', { err: 'Updating orders to SQLite DB !' })
              }
            ],
            messageVisibility: true,
          });
          messageVisibility.value = true;
          closeDbConnection(props.dbConn);
          return ret;
        }
      }
      if (obj.payments.length) {
        sql = 'UPDATE \`payment\` SET \`factureId\`=? WHERE \`paymentId\` IN (';
        for (const k in obj.payments) {
          sql += k < obj.payments.length - 1 ? `${obj.payments[k].paymentId}, ` : `${obj.payments[k].paymentId});`;
        }
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [values.changes.lastId]);
        if (!val.changes.changes) {
          await prefs.setPref('message', {
            messages: [
              {
                severity: true,
                content: t('invoicesComponent.results.ko.add', { err: 'Updating payments to SQLite DB !' })
              }
            ],
            messageVisibility: true,
          });
          messageVisibility.value = true;
          closeDbConnection(props.dbConn);
          return ret;
        }
        await prefs.setPref('message', {
          messages: [
            {
              severity: false,
              content: t('invoicesComponent.results.ok.add')
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
              severity: false,
              content: t('invoicesComponent.results.ok.add')
            }
          ],
          messageVisibility: true,
        });
        ret = true;
      }
    } 
    else {
      await prefs.setPref('message', { 
        messages: [
          {
            severity: true,
            content: t('invoicesComponent.results.ko.add', { err: 'Adding invoice to SQLite DB !' })
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
        content: t('invoicesComponent.results.ko.add', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true
  });
  messageVisibility.value = true;
  return false;
};
async function updateInvoiceInDb() {
  const obj = {
    date: new Date(date.value),
    invoiceHTPrice: parseFloat(invoiceHTPrice.value),
    invoiceTTPrice: parseFloat(invoiceTTPrice.value),
    languageId: language.value.langueId,
    deviseId: devise.value.deviseId,
    tvaValue: parseFloat(tvaValue.value),
    buyerId: buyer.value.actorId,
    sellerId: seller.value.actorId,
    adminId: 1,
    orders: commandes.value,
    payments: payments.value,
  };
  await transformObject(obj);
  return invoiceAxiosService.update(invoiceId.value, obj)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('invoicesComponent.results.ok.update')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('invoicesComponent.results.ko.update', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function updateInvoiceInSQLiteDb() {
  const obj = {
    date: date.value,
    invoiceHTPrice: parseFloat(invoiceHTPrice.value),
    invoiceTTPrice: parseFloat(invoiceTTPrice.value),
    languageId: language.value.langueId,
    deviseId: devise.value.deviseId,
    tvaValue: parseFloat(tvaValue.value),
    buyerId: buyer.value.actorId,
    sellerId: seller.value.actorId,
    adminId: 1,
    orders: commandes.value,
    payments: payments.value,
  };
  await transformObject(obj);
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = 'UPDATE \`facture\` SET \`date\`=?, \`invoiceHTPrice\`=?, \`invoiceTTPrice\`=?, \`languageId\`=?, \`deviseId\`=?, \`tvaValue\`=?, \`buyerId\`=?, \`sellerId\`=? WHERE \`factureId\` = ?;';
    let ret = false;
    // console.log(sql);
    let values = await newRun(props.dbConn, sql, [obj.date, obj.invoiceHTPrice, obj.invoiceTTPrice, obj.languageId, obj.deviseId, obj.tvaValue, obj.buyerId, obj.sellerId, invoiceId.value]);
    let val = '';
    if (values.changes.changes) {
      if (obj.orders.length) {
        sql = 'UPDATE \`commande\` SET \`factureId\`=? WHERE \`orderId\` IN (';
        for (const k in obj.orders) {
          sql += k < obj.orders.length - 1 ? `${obj.orders[k].orderId}, ` : `${obj.orders[k].orderId});`;
        }
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [invoiceId.value]);
        if (!val.changes.changes) {
          await prefs.setPref('message', {
            messages: [
              {
                severity: true,
                content: t('invoicesComponent.results.ko.update', {err: 'Updating orders to SQLite db !'})
              }
            ],
            messageVisibility: true,
          });
          closeDbConnection(props.dbConn);
          messageVisibility.value = true;
          return ret;
        }
      } else {
        sql = 'UPDATE \`commande\` SET \`factureId\`=NULL WHERE \`factureId\` = ?;';
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [invoiceId.value]);
        // if (!val.changes.changes) {
          // await prefs.setPref('messages', [
          //   {
          //     severity: false,
          //     content: t('invoicesComponent.results.ok.update')
          //   }
          // ]);
          // closeDbConnection(props.dbConn);
          // messageVisibility.value = true;
          // ret = true;
          // return ret;
        // }
      }
      if (obj.payments.length) {
        sql = 'UPDATE \`payment\` SET \`factureId\`=? WHERE \`paymentId\` IN (';
        for (const k in obj.payments) {
          sql += k < obj.payments.length - 1 ? `${obj.payments[k].paymentId}, ` : `${obj.payments[k].paymentId});`;
        }
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [invoiceId.value]);
        if (!val.changes.changes) {
          await prefs.setPref('messages', [
            {
              severity: true,
              content: t('invoicesComponent.results.ko.update', {err: 'Updating payments to SQLite db !'})
            }
          ]);
          closeDbConnection(props.dbConn);
          messageVisibility.value = true;
          return ret;
        }
      }
      else {
        sql = 'UPDATE \`payment\` SET \`factureId\`=NULL WHERE \`factureId\` = ?;';
        // console.log(sql);
        val = await newRun(props.dbConn, sql, [invoiceId.value]);
        // if (!val.changes.changes) {
          // await prefs.setPref('messages', [
          //   {
          //     severity: false,
          //     content: t('invoicesComponent.results.ok.update', {err: 'Updating payments to NULL to SQLite db !'})
          //   }
          // ]);
          // closeDbConnection(props.dbConn);
          // messageVisibility.value = true;
          // return ret;
        // }
      }
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('invoicesComponent.results.ok.update')
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
            content: t('invoicesComponent.results.ko.update', { err: 'Updating invoice to SQLite DB !' })
          }
        ],
        messageVisibility: true,
      });
    }
    closeDbConnection(props.dbConn);
    messageVisibility.value = true;
    return ret;
  }
  await prefs.setPref('message', {
    messages: [
      {
        severity: true,
        content: t('invoicesComponent.results.ko.update', { err: 'Unable to open SQLite DB !' })
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};
function deleteInvoiceFromDb() {
  return invoiceAxiosService.delete(invoiceId.value)
    .then(() => {
      messageStore.messages.push({
        severity: false,
        content: t('invoicesComponent.results.ok.delete')
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return true;
    })
    .catch((err) => {
      messageStore.messages.push({
        severity: true,
        content: t('invoicesComponent.results.ko.delete', {err: err})
      });
      messageVisibility.value = true;
      messageStore.setMessagesVisibility(true);
      return false;
    });
};
async function deleteInvoiceFromSQLiteDb() {
  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let ret = false;
    let sql = `DELETE FROM \`facture\` WHERE \`factureId\`= '${invoiceId.value}';`;
    let values = await newRun(props.dbConn, sql);
    if (values.changes.changes) {
      await prefs.setPref('message', {
        messages: [
          {
            severity: false,
            content: t('invoicesComponent.results.ok.delete')
          }
        ],
        messageVisibility: true,
      });
      ret = true;
    }
    else{
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('invoicesComponent.results.ko.delete', {err: 'Deleting invoice from SQLite DB !'})
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
        content: t('invoicesComponent.results.ko.delete', {err: 'Unable to open SQLite DB !'})
      }
    ],
    messageVisibility: true,
  });
  messageVisibility.value = true;
  return false;
};

// WATCHERS
watch(() => [ props.admin, props.display, props.invoiceForm ],
  ([newAdminProp, newDisplayProp, newInvoiceForm]) => {
    // console.log(`newAdminProp -> ${newAdminProp}/newDisplayProp --> ${newDisplayProp}/newInvoiceForm --> ${newInvoiceForm}`);
    adminPropRef.value = newAdminProp;
    displayPropRef.value = newDisplayProp;
    isForm.value = newInvoiceForm;
    forceTableRerender();
  }
);

// LIFECYCLE EVENTS

// OTHERS
provide('src', 'invoices');
</script>
