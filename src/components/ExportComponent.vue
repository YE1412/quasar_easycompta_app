<template>
  <MessagesItem v-if='messageVisibility && renderComponent' />
  <div style="width: 100%">
    <div class='q-pa-md'>
      <q-table
        flat
        bordered
        :columns="tableHeadForDisplay"
        :rows="contentsForDisp"
        row-key="factureId"
        :no-data-label="t('invoicesComponent.errors.empty.tableBodyContentText')"
        :no-results-label="t('forms.errors.empty.filterBodyContentText')"
        separator="horizontal"
        :dense="platform === 'web' ? false : true">
        <template v-slot:no-data="{icon, message, filter}">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied"/>
            <span>{{ message }}</span>
            <q-icon size="2em" :name="icon"/>
            <q-btn color="purple" icon="add_circle" :label="t('invoicesComponent.errors.empty.buttonAdding')" glossy unelevated @click="addClick"></q-btn>
          </div>
        </template>
        <template v-slot:body="propos">
          <q-tr :props="propos">
            <q-td key="factureId" :props="propos">
              <q-checkbox :disable="orders[propos.row.factureId].length ? false : true" v-model="selectedIds" :val="propos.row.factureId"/></q-td>
            <q-td key="date" :props="propos">{{ propos.row.date }}</q-td>
            <q-td key="invoiceHTPrice" :props="propos">{{ propos.row.invoiceHTPrice }}</q-td>
            <q-td key="invoiceTTPrice" :props="propos">{{ propos.row.invoiceTTPrice }}</q-td>
            <q-td key="langue" :props="propos">{{ propos.row.langue }}</q-td>
            <q-td key="devise" :props="propos">{{ propos.row.devise }}</q-td>
            <q-td key="tvaValue" :props="propos">{{ propos.row.tvaValue }}</q-td>
            <q-td key="buyer" :props="propos">{{ propos.row.buyer }}</q-td>
            <q-td key="seller" :props="propos">{{ propos.row.seller }}</q-td>
            <q-td key="payments" :props="propos">{{ propos.row.payments }}</q-td>
            <q-td key="commandes" :props="propos">{{ propos.row.commandes }}</q-td>
            <q-td key="actions" :props="propos">
              <q-btn :disable="selectedIds.length ? false : true" color="primary" icon="picture_as_pdf" :label="t('forms.exportButtonText')" glossy unelevated @click="exportClick"></q-btn>
            </q-td>
          </q-tr>
        </template>
        </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, provide, computed, watch } from 'vue';
// import { useOrderStore } from 'stores/order';
import { useMessageStore } from 'stores/message';
// import { usePaymentStore } from 'stores/payment';
import { useInvoiceStore } from 'stores/invoice';
import { useSessionStore } from 'stores/session';
import { useUserStore } from 'stores/user';
// import TableItem from './TableItem.vue';
import MessagesItem from './MessagesItem.vue';
import invoiceAxiosService from 'db/services/invoice.service';
import { HeadTableText, InputObjectCollection, FormState, Message } from './models';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useRouter } from 'vue-router';
import getConnection, { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeConnection, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import { useQuasar } from 'quasar';

// VARIABLES
interface ExportProps {
  dbConn?: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<ExportProps>(), {
  dbConn: null
});
const router = useRouter();
const $q = useQuasar();
const platform = $q.platform;
const renderComponent = ref(true);
const { t } = useI18n({ useScope: 'global' });
const messageVisibility = ref(false);
const invoiceIds = ref([]);
const dates = ref([]);
const invoiceHTPrices = ref([]);
const invoiceTTPrices = ref([]);
const languages = ref([]);
const devises = ref([]);
const tvaValues = ref([]);
const buyers = ref([]);
const sellers = ref([]);
const admin = ref(0);
const payments = ref({});
const orders = ref({});
const tableHeadForDisplay = ref([
  {
    name: 'factureId',
    label: '#',
    field: 'factureId',
    align: 'center',
    sortable: false,
  },
  {
    name: 'date',
    label: t('invoicesComponent.headTable.date'),
    field: 'date',
    align: 'center',
    sortable: false,
  },
  {
    name: 'invoiceHTPrice',
    label: t('invoicesComponent.headTable.invoiceHTPrice'),
    field: 'invoiceHTPrice',
    align: 'center',
    sortable: false,
  },
  {
    name: 'invoiceTTPrice',
    label: t('invoicesComponent.headTable.invoiceTTPrice'),
    field: 'invoiceTTPrice',
    align: 'center',
    sortable: false,
  },
  {
    name: 'langue',
    label: t('invoicesComponent.headTable.language'),
    field: 'langue',
    align: 'center',
    sortable: false,
  },
  {
    name: 'devise',
    label: t('invoicesComponent.headTable.devise'),
    field: 'devise',
    align: 'center',
    sortable: false,
  },
  {
    name: 'tvaValue',
    label: t('invoicesComponent.headTable.tva'),
    field: 'tvaValue',
    align: 'center',
    sortable: false,
  },
  {
    name: 'buyer',
    label: t('invoicesComponent.headTable.buyer'),
    field: 'buyer',
    align: 'center',
    sortable: false,
  },
  {
    name: 'seller',
    label: t('invoicesComponent.headTable.seller'),
    field: 'seller',
    align: 'center',
    sortable: false,
  },
  {
    name: 'payments',
    label: t('invoicesComponent.headTable.payment'),
    field: 'payments',
    align: 'center',
    sortable: false,
  },
  {
    name: 'commandes',
    label: t('invoicesComponent.headTable.commande'),
    field: 'commandes',
    align: 'center',
    sortable: false,
  },
  {
    name: 'actions',
    label: t('forms.headTable.action'),
    field: 'actions',
    align: 'center',
    sortable: false,
  },
]);
const contentsForDisp = computed(() => {
  let ret = [];
  for (const key in invoiceIds.value) {
    ret[key] = {};
    ret[key]['factureId'] = invoiceIds.value[key];
    ret[key]['date'] = tableInvoicesDateLibelle(key);
    ret[key]['invoiceHTPrice'] = invoiceHTPrices.value[key];
    ret[key]['invoiceTTPrice'] = invoiceTTPrices.value[key];
    ret[key]['langue'] = tableInvoicesLangueLibelle(key);
    ret[key]['devise'] = tableInvoicesDeviseLibelle(key);
    ret[key]['tvaValue'] = tableInvoicesVATLibelle(key);
    ret[key]['buyer'] = tableInvoicesBuyerLibelle(key);
    ret[key]['seller'] = tableInvoicesSellerLibelle(key);
    ret[key]['commandes'] = tableInvoicesOrdersLibelle(invoiceIds.value[key]);
    ret[key]['payments'] = tableInvoicesPaymentsLibelle(invoiceIds.value[key]);
  }
  return ret;
});
const selectedIds = ref([]);

let messageStore = null, messages: Ref<Message> = ref([]), invoiceStore = null, sessionStore = null, prefs = null, userStore = null, session = null;

// DECLARATIONS
if (platform.is.desktop) {
  messageStore = useMessageStore();
  invoiceStore = useInvoiceStore();
  sessionStore = useSessionStore();
  userStore = useUserStore();
  if (messageStore.getMessages.length){
    messageVisibility.value = true;
    messageStore.setMessagesVisibility(true);
  }
  admin.value = userStore.getUser.userId;
  fetchDatasForTable();
}
else {
  (async () => {
    prefs = await import('cap/storage/preferences');
    const mess = await prefs.getPref('message');
    const usr = await prefs.getPref('user');
    session = await prefs.getPref('session');
    const user = !!usr ? usr.user : {};
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
    admin.value = user.userId;
    fetchDatasForTable();
  })();
}

// FUNCTIONS
async function forceTableRerender() {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
// async function transformObject(obj: any) {
//   if (__KEY__ === null) {
//     await setGenApi();
//   }
//   await setCryptApi();
//   __FORMATOBJ__(obj);
// };
async function fetchDatasForTable() {
  if (platform.is.desktop){
    invoiceStore.getAllInvoices(admin.value)
      .then((res) => {
        for (const k in res) {
          invoiceIds.value.push(res[k].factureId);
          dates.value.push(res[k].date);
          invoiceHTPrices.value.push(res[k].invoiceHTPrice);
          invoiceTTPrices.value.push(res[k].invoiceTTPrice);
          languages.value.push(res[k].langue);
          devises.value.push(res[k].devise);
          tvaValues.value.push(res[k].tvaValue);
          buyers.value.push(res[k].buyer);
          sellers.value.push(res[k].seller);
          orders.value[`${res[k].factureId}`] = res[k].commandes;
          payments.value[`${res[k].factureId}`] = res[k].payments;
        }
      })
      .catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t('exportComponent.results.ko.fetch_invoices', {err: err})
        });
        messageStore.setMessagesVisibility(true);
        messageVisibility.value = true;
      });
  } else {
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      const sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`commandes\`.\`orderId\` AS \`commandes.orderId\`, \`commandes\`.\`contenuAdditionnel\` AS \`commandes.contenuAdditionnel\`, \`commandes\`.\`priceHt\` AS \`commandes.priceHt\`, \`commandes\`.\`factureId\` AS \`commandes.factureId\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`commande\` AS \`commandes\` ON \`facture\`.\`factureId\` = \`commandes\`.\`factureId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${admin.value}' GROUP BY \`facture\`.\`factureId\`, \`payments.paymentId\`, \`commandes.orderId\`;`;
      const values = await newQuery(propq.dbConn, sql);
      if (!!values && values.values.length) {
        const intRes = sanitizeQueryResult(values.values);
        console.log(intRes);
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(intRes);
        for (const k in res) {
          invoiceIds.value.push(res[k].factureId);
          dates.value.push(res[k].date);
          invoiceHTPrices.value.push(res[k].invoiceHTPrice);
          invoiceTTPrices.value.push(res[k].invoiceTTPrice);
          languages.value.push(res[k].langue);
          devises.value.push(res[k].devise);
          tvaValues.value.push(res[k].tvaValue);
          buyers.value.push(res[k].buyer);
          sellers.value.push(res[k].seller);
          orders.value[`${res[k].factureId}`] = res[k].commandes;
          payments.value[`${res[k].factureId}`] = res[k].payments;
        }
      }
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('exportComponent.results.ko.fetch_invoices', {err: 'Unable to open SQLite DB !'})
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }
  }
};
function tableInvoicesBuyerLibelle(ind: number) {
  let ret = '';
  let libelle = `${buyers.value[ind].actorId} - ${buyers.value[ind].prenom} ${buyers.value[ind].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesSellerLibelle(ind: number) {
  let ret = '';
  let libelle = `${sellers.value[ind].actorId} - ${sellers.value[ind].prenom} ${sellers.value[ind].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesOrdersLibelle(invId: number) {
  let ret = '', libelle = '';
  for (const m in orders.value[`${invId}`]) {
    libelle = `${orders.value[`${invId}`][m].orderId} - ${orders.value[`${invId}`][m].priceHt}`;
    ret += m != orders.value[`${invId}`].length - 1 ? `${libelle}, ` : libelle;
  }
  ret = ret === '' ? t('invoicesComponent.libelles.no_order') : ret;
  return ret;
};
function tableInvoicesDeviseLibelle(ind: number) {
  let ret = '';
  let libelle = !!devises.value[ind] ? `${devises.value[ind].symbole} - ${devises.value[ind].libelle}` : t('invoicesComponent.libelles.no_devise');
  ret = libelle;
  return ret;
};
function tableInvoicesLangueLibelle(ind: numner) {
  let ret = '';
  let libelle = !!languages.value[ind] ? languages.value[ind]['libelle'] : t('invoicesComponent.libelles.no_language');
  ret = libelle;
  return ret;
};
function tableInvoicesPaymentsLibelle(invId: number) {
  let ret = '', libelle = '', state = '';
  for (const m in payments.value[`${invId}`]) {
    state = payments.value[`${invId}`][m].etat === 0 ? t('paymentsComponent.libelles.etats.not_paid') : '';
    state = payments.value[`${invId}`][m].etat === 1 ? t('paymentsComponent.libelles.etats.paid') : state;
    libelle = `${payments.value[`${invId}`][m].paymentId} - ${state} - ${payments.value[`${invId}`][m].paymentValue}`;
    ret += m != payments.value[`${invId}`].length - 1 ? `${libelle}, ` : libelle;
  }
  ret = ret === '' ? t('invoicesComponent.libelles.no_payment') : ret;
  return ret;
};
function tableInvoicesVATLibelle(ind: number) {
  let ret = '', libelle = '';
  libelle = `${tvaValues.value[ind] * 100} %`;
  ret = libelle;
  return ret;
};
function tableInvoicesDateLibelle(ind: number) {
  const options = {day: "2-digit", month: '2-digit', year: 'numeric'};
  let ret = '', libelle = '', date = '', locale='en-US';
  if (!!dates.value[ind] && dates.value[ind] !== '') {
    date = new Date(dates.value[ind]);
  }
  if (platform.is.desktop)
    locale = sessionStore.getLangDisplayed.nom;
  else{
    // Using Preferences for mobiles platform
    locale = !!session ? session.langDisplayed.nom : 'en-US';
  }
  libelle = !!date ? `${date.toLocaleDateString(locale, options)}` : t('invoicesComponent.libelles.no_date');
  ret = libelle;
  return libelle;
};
function addClick(e: Event){
  e.preventDefault();
  router.push(t('comptaLinks.invoices.adminLink'));
};
function exportClick(e: Event){
  e.preventDefault();
  router.push({name: t('pdfLinkName'), params: { invoiceIds: selectedIds.value}
  });
  // console.log("export click !");
  // console.log(selectedIds.value);
};
function sanitizeQueryResult(obj: any) {
  let ret = [], ind = 0;
  // console.log('sanitizeQueryResult !');
  for (const k in obj) {
    const prevId = k > 0 ? obj[k - 1].factureId : 0;
    if (prevId && prevId !== obj[k].factureId){
      ind++;
    }
    if (!prevId || (prevId && prevId !== obj[k].factureId)) {
      ret[ind] = {};
    }
    for (const l in obj[k]) {
      if (prevId === obj[k].factureId) {
        if (l === 'commandes.orderId') {
          // console.log(obj[k][l]);
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if(!ret[ind]['commandes'].length){
            if (obj[k][l] !== null)
              ret[ind]['commandes'].push({orderId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k][l]);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['commandes'].push({orderId: obj[k][l]});
              else
                ret[ind]['commandes'][foundIndex].orderId = obj[k][l];
            }
          }
        }
        else if(l === 'commandes.contenuAdditionnel') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          // if (obj[k][l] !== null){
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({contenuAdditionnel: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (foundIndex === -1)
                ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = obj[k][l];
              else
                ret[ind]['commandes'][foundIndex].contenuAdditionnel = obj[k][l];
            }
          // }
        }
        else if(l === 'commandes.priceHt') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({priceHt: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (obj[k][l] !== null){
                if(foundIndex === -1)
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = obj[k][l];
                else
                  ret[ind]['commandes'][foundIndex].priceHt = obj[k][l];
              }
            }
          }
        }
        else if(l === 'commandes.factureId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null){
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({factureId: obj[k][l]});
            }
            else{
              const foundIndex = ret[ind]['commandes'].findIndex(elem => elem.orderId === obj[k]['orderId']);
              if (obj[k][l] !== null){
                if (foundIndex === -1)
                  ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = obj[k][l];
                else
                  ret[ind]['commandes'][foundIndex].factureId = obj[k][l];
              }
            }
          }
        }
        else if (l === 'payments.paymentId') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k][l]);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'].push({paymentId: obj[k][l]});
              else
                ret[ind]['payments'][foundIndex].paymentId = obj[k][l];
            }
          }
        }
        else if (l === 'payments.etat') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({etat: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].etat = obj[k][l];
            }
          }
        }
        else if (l === 'payments.paymentValue') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentValue: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].paymentValue = obj[k][l];
            }
          }
        }
        else if (l === 'payments.paymentType') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({paymentType: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].paymentType = obj[k][l];
            }
          }
        }
        else if (l === 'payments.factureId') {
          // console.log(obj[k][l]);
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if(!ret[ind]['payments'].length){
            if (obj[k][l] !== null)
              ret[ind]['payments'].push({factureId: obj[k][l]});
          }
          else {
            const foundIndex = ret[ind]['payments'].findIndex(elem => elem.paymentId === obj[k]['payments.paymentId']);
            if (obj[k][l] !== null){
              if (foundIndex === -1)
                ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = obj[k][l];
              else
                ret[ind]['payments'][foundIndex].factureId = obj[k][l];
            }
          }
        }
      }
      else {
        if (l === 'langue.langueId') {
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['langueId'] = obj[k][l];
          }
        }
        else if(l === 'langue.libelle'){
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['libelle'] = obj[k][l];
          }
        }
        else if (l === 'langue.nom'){
          ret[ind]['langue'] = ret[ind]['langue'] === undefined ? {} : ret[ind]['langue'];
          if (obj[k][l] === null) {
            ret[ind]['langue'] = null;
          } else {
            ret[ind]['langue']['nom'] = obj[k][l];
          }
        }
        else if (l === 'devise.deviseId'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['deviseId'] = obj[k][l];
          }
        }
        else if (l === 'devise.symbole'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['symbole'] = obj[k][l];
          }
        }
        else if (l === 'devise.libelle'){
          ret[ind]['devise'] = ret[ind]['devise'] === undefined ? {} : ret[ind]['devise'];
          if (obj[k][l] === null) {
            ret[ind]['devise'] = null;
          } else {
            ret[ind]['devise']['libelle'] = obj[k][l];
          }
        }
        else if (l === 'buyer.actorId'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['actorId'] = obj[k][l];
          }
        }
        else if (l === 'buyer.cp'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['cp'] = obj[k][l];
          }
        }
        else if (l === 'buyer.email'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['email'] = obj[k][l];
          }
        }
        else if (l === 'buyer.nom'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['nom'] = obj[k][l];
          }
        }
        else if (l === 'buyer.nomRue'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['nomRue'] = obj[k][l];
          }
        }
        else if (l === 'buyer.numCommercant'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          ret[ind]['buyer']['numCommercant'] = obj[k][l];
        }
        else if (l === 'buyer.numRue'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['numRue'] = obj[k][l];
          }
        }
        else if (l === 'buyer.prenom'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['prenom'] = obj[k][l];
          }
        }
        else if (l === 'buyer.tel'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['tel'] = obj[k][l];
          }
        }
        else if (l === 'buyer.actorTypeId'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['actorTypeId'] = obj[k][l];
          }
        }
        else if (l === 'buyer.ville'){
          ret[ind]['buyer'] = ret[ind]['buyer'] === undefined ? {} : ret[ind]['buyer'];
          if (obj[k][l] === null) {
            ret[ind]['buyer'] = null;
          } else {
            ret[ind]['buyer']['ville'] = obj[k][l];
          }
        }
        else if (l === 'seller.actorId'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['actorId'] = obj[k][l];
          }
        }
        else if (l === 'seller.cp'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['cp'] = obj[k][l];
          }
        }
        else if (l === 'seller.email'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['email'] = obj[k][l];
          }
        }
        else if (l === 'seller.nom'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['nom'] = obj[k][l];
          }
        }
        else if (l === 'seller.nomRue'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['nomRue'] = obj[k][l];
          }
        }
        else if (l === 'seller.numCommercant'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          ret[ind]['seller']['numCommercant'] = obj[k][l];
        }
        else if (l === 'seller.numRue'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['numRue'] = obj[k][l];
          }
        }
        else if (l === 'seller.prenom'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['prenom'] = obj[k][l];
          }
        }
        else if (l === 'seller.tel'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['tel'] = obj[k][l];
          }
        }
        else if (l === 'seller.actorTypeId'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['actorTypeId'] = obj[k][l];
          }
        }
        else if (l === 'seller.ville'){
          ret[ind]['seller'] = ret[ind]['seller'] === undefined ? {} : ret[ind]['seller'];
          if (obj[k][l] === null) {
            ret[ind]['seller'] = null;
          } else {
            ret[ind]['seller']['ville'] = obj[k][l];
          }
        }
        else if(l === 'commandes.orderId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({orderId: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].orderId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.contenuAdditionnel') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({contenuAdditionnel: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].contenuAdditionnel = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.priceHt') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({priceHt: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].priceHt = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'commandes.factureId') {
          ret[ind]['commandes'] = ret[ind]['commandes'] === undefined ? [] : ret[ind]['commandes'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['commandes'].length){
              ret[ind]['commandes'].push({factureId: obj[k][l]});
            }
            else{
              ret[ind]['commandes'][ret[ind]['commandes'].length - 1].factureId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentId') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentId: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.etat') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({etat: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].etat = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentValue') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentValue: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentValue = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.paymentType') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({paymentType: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].paymentType = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else if(l === 'payments.factureId') {
          ret[ind]['payments'] = ret[ind]['payments'] === undefined ? [] : ret[ind]['payments'];
          if (obj[k][l] !== null) {
            if (!ret[ind]['payments'].length){
              ret[ind]['payments'].push({factureId: obj[k][l]});
            }
            else{
              ret[ind]['payments'][ret[ind]['payments'].length - 1].factureId = obj[k][l];
            }
          }
          // console.log(ret[ind]);
        }
        else {
          ret[ind][l] = obj[k][l];
        }
      }
    }
  }
  return ret;
};

// WATCHERS

// LIFECYCLE EVENTS

// OTHER
</script>
