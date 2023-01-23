<template>
  <div
    :class="cssClasses"
  >
    <div class="SenExtrabold-font">{{ t("homeComponent.pieChart.heading") }}</div>
    <Pie
      v-if="loaded"
      :data="chartData"
      :style="chartStyle"
    />
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  // Title,
  Tooltip,
  Legend,
  ArcElement,
  // CategoryScale,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)
import { useCounterStore } from 'stores/counter';
import { useUserStore } from 'stores/user';
// import { Capacitor } from '@capacitor/core';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery } from 'cap/storage';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'src/globals';

// VARIABLES
interface PieChartProps {
  // chartId?: string;
  // datasetIdKey?: string;
  width?: number;
  height?: number;
  cssClasses?: string;
  // styles?: unknow;
  plugins?: [];
  dbConn: SQLiteDBConnection | null;
};
const $q = useQuasar();
const platform = $q.platform;
const { t } = useI18n();
const props = withDefaults(defineProps<PieChartProps>(), {
  // chartId: 'pie-chart',
  // datasetIdKey: 'label',
  width: 200,
  height: 200,
  cssClasses: '',
  // styles: () => ({}),
  plugins: () => ([]),
  dbConn: null,
});
const counter = ref(null);
let payStats = null, 
  cbVal = null, 
  cashVal = null, 
  chqVal = null, 
  chartData = ref({
    labels: [
      t('homeComponent.pieChart.cbLabel'),
      t('homeComponent.pieChart.cashLabel'),
      t('homeComponent.pieChart.chqLabel'),
    ],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [0, 0, 0],
      },
    ],
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
const chartStyle = computed(() => {
  const ret = {
    position: 'relative',
    responsive: true
  };
  // console.log(props.height);
  if (!compact.value) {
    ret.responsive = false;
    ret.height = `${props.height}px`;
    ret.width = `${props.width}px`;
  }
  return ret;
});
const loaded = ref(false);
// const options = computed(() => {
//   const ret = {
//     responsive: true,
//     position: 'relative'
//   };
//   return ret;
// });

let counterStore = null, userStore = null, prefs = null;

// DECLARATIONS
if (platform.is.desktop) {
  counterStore = useCounterStore();
  userStore = useUserStore(); 
}
else {
  orientation.value = window.screen.orientation.type;
  window.addEventListener('orientationchange', handleOrientation);
}

(async () => {
  if (platform.is.desktop){
    if(!import.meta.env.SSR) {
      //await userStore.retrieveUser(1);
      await counterStore.getFinancialYearInvoices(userStore.getUser.userId);
    }
  }
  else{
    prefs = await import('cap/storage/preferences');
    const usr = await prefs.getPref('user');
    let dateStart = null;
    const now = new Date();
    if (now.getMonth() < 5) {
      dateStart = new Date(`${now.getFullYear() - 1}-06-01`);
    } 
    else {
      dateStart = new Date(`${now.getFullYear()}-06-01`);
    }

    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
    if (isOpen) {
      const sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}' AND \`date_format\` > strftime('%s', '${dateStart.toISOString()}')`;
      // console.log(sql);
      const values = await newQuery(props.dbConn, sql);
      // console.log(values);
      if (values.values.length){
        const intRes = sanitizeQueryResult(values.values);
        // console.log(intRes);
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(intRes);
        // console.log(res);
        let counterSess = await prefs.getPref('counter');
        counterSess = !!counterSess ? counterSess : {};
        counterSess.invoicesFY = res;
        await prefs.setPref('counter', counterSess, false);
      }
      // else {
      //   await prefs.setPref('message', {
      //     messages: [
      //       {
      //         severity: true,
      //         content: t('homeComponent.results.ko.fetch_stats', { err: 'Select invoices from SQLite DB !' })
      //       }
      //     ],
      //     messagesVisibility: true,
      //   });
      // }
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Unable to open SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      // messageVisibility.value = true;
    }
    counter.value = await prefs.getPref('counter');
  }
  payStats = await getPaymentsStats();
  // console.log(payStats);
  if (payStats.all && payStats.cb)
    cbVal = parseFloat(((payStats.cb * 100) / payStats.all).toFixed(0));
  else cbVal = 0;
  if (payStats.all && payStats.cash)
    cashVal = parseFloat(((payStats.cash * 100) / payStats.all).toFixed(0));
  else cashVal = 0;
  if (payStats.all && payStats.chqVal)
    chqVal = parseFloat(((payStats.chq * 100) / payStats.all).toFixed(0));
  else chqVal = 0;

  chartData.value = {
    labels: [
      t('homeComponent.pieChart.cbLabel'),
      t('homeComponent.pieChart.cashLabel'),
      t('homeComponent.pieChart.chqLabel'),
    ],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [cbVal, cashVal, chqVal],
      },
    ],
  };
  loaded.value = true;
  // console.log(chartData.value);
})();

// const data = {
// labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//     {
//       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//       data: [40, 20, 80, 10]
//     }
//   ]
// };

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
// };

// FUNCTIONS
async function getPaymentsStats() {
  let ret = { cb: 0, cash: 0, chq: 0, all: 0 };
  if (platform.is.desktop){
    for (const k in counterStore.getInvoicesFY) {
      for (const l in counterStore.getInvoicesFY[k]['payments']) {
        if (counterStore.getInvoicesFY[k]['payments'][l].etat) {
          switch (
            counterStore.getInvoicesFY[k]['payments'][l].paymentType
          ) {
            case 1:
              ret.cb += 1;
              ret.all += 1;
              break;
            case 2:
              ret.cash += 1;
              ret.all += 1;
              break;
            case 3:
              ret.chq += 1;
              ret.all += 1;
              break;
            default:
              break;
          }
        }
      }
    }
  }
  else {
    const invoices = !!counter.value ? counter.value.invoicesFY : [];
    for (const k in invoices) {
      for (const l in invoices[k]['payments']) {
        if (invoices[k]['payments'][l].etat) {
          switch (
            invoices[k]['payments'][l].paymentType
          ) {
            case 1:
              ret.cb += 1;
              ret.all += 1;
              break;
            case 2:
              ret.cash += 1;
              ret.all += 1;
              break;
            case 3:
              ret.chq += 1;
              ret.all += 1;
              break;
            default:
              break;
          }
        }
      }
    }
  }
  return ret;
};
function sanitizeQueryResult(obj: any) {
  let ret = [], ind = 0;
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
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};
</script>
