<template>
  <div
    :class="cssClasses"
  >
    <div class="SenExtrabold-font">{{ t("homeComponent.barChart.heading") }}</div>
    <bar :data="chartData"
      :style="chartStyle"
      v-if="loaded" />
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// import Chart from 'chart.js/auto';
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
interface BarChartProps {
  chartId?: string;
  datasetIdKey?: string;
  width?: number;
  height?: number;
  cssClasses?: string;
  styles?: unknow;
  plugins?: [];
  invoicesFY?: [] | null;
  dbConn: SQLiteDBConnection | null;
};
const $q = useQuasar();
const { t } = useI18n();
const props = withDefaults(defineProps<BarChartProps>(), {
  chartId: 'bar-chart',
  datasetIdKey: 'label',
  width: 400,
  height: 400,
  cssClasses: '',
  styles: () => ({}),
  plugins: () => ([]),
  invoicesFY: null,
  dbConn: null,
});
const platform = $q.platform;
const now = ref(new Date());
// const counter = ref(null);
// const yearLabel = computed(() => {
//   if (now.value.getMonth() > 5) {
//     return (now.value.getFullYear());
//   } else {
//     return (now.value.getFullYear() - 1);
//   }
// });
const yearLabel = new Date().getMonth() > 5
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1;
// console.log('YearLabel !');
// console.log(yearLabel);
const chartLabels = [
  // t('homeComponent.barChart.juneLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.julyLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.augustLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.septemberLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.octoberLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.novemberLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.decemberLabel', { year: `${yearLabel}` }),
  // t('homeComponent.barChart.januaryLabel', { year: `${(yearLabel + 1)}` }),
  // t('homeComponent.barChart.februaryLabel', { year: `${(yearLabel + 1)}` }),
  // t('homeComponent.barChart.marchLabel', { year: `${(yearLabel + 1)}` }),
  // t('homeComponent.barChart.aprilLabel', { year: `${(yearLabel + 1)}` }),
  // t('homeComponent.barChart.mayLabel', { year: `${(yearLabel + 1)}` }),
];
chartLabels.push(
  `${t('homeComponent.barChart.juneLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.julyLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.augustLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.septemberLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.octoberLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.novemberLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.decemberLabel')} ${yearLabel}`,
  `${t('homeComponent.barChart.januaryLabel')} ${(yearLabel + 1)}`,
  `${t('homeComponent.barChart.februaryLabel')} ${(yearLabel + 1)}`,
  `${t('homeComponent.barChart.marchLabel')} ${(yearLabel + 1)}`,
  `${t('homeComponent.barChart.aprilLabel')} ${(yearLabel + 1)}`,
  `${t('homeComponent.barChart.mayLabel')} ${(yearLabel + 1)}`
);
// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
// };
const datas = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const chartData = ref({
  labels: chartLabels,
  datasets: [
    {
      label: t('homeComponent.barChart.datasetLabel'),
      backgroundColor: '#f87979',
      data: datas.value,
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
  if (!compact.value) {
    ret.responsive = false;
    ret.height = props.height;
    ret.width = props.width;
  }
  return ret;
});
const loaded = ref(false);

let counterStore = null, userStore = null, prefs = null;

// DECLARATION
if (platform.is.desktop){
  counterStore = useCounterStore();
  userStore = useUserStore();
  // console.log(chartData.value);
}
else {
  orientation.value = window.screen.orientation.type;
  window.addEventListener('orientationchange', handleOrientation);
}
(async() => {
  if (platform.is.desktop){
    if (!import.meta.env.SSR){
      //await userStore.retrieveUser(1);
      if (!!props.invoicesFY === false)
        await counterStore.getFinancialYearInvoices(userStore.getUser.userId);
    }
  }
  else {
    // console.log('BarChart init !');
    prefs = await import('cap/storage/preferences');
    const usr = await prefs.getPref('user');
    // const session = await prefs.getPref('session');
    // devise = usr.user.devise;
    // locale = !!session ? session.langDisplayed.nom : 'en-US' ;
    let dateStart = null;;
    if (now.value.getMonth() < 5) {
      dateStart = new Date(`${now.value.getFullYear() - 1}-06-01`);
    } 
    else {
      dateStart = new Date(`${now.value.getFullYear()}-06-01`);
    }

    if (!!props.invoicesFY === false){
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}' AND \`date_format\` > strftime('%s', '${dateStart.toISOString()}')`;
        // console.log(sql);
          let counterSess = await prefs.getPref('counter');
        // if (!!counterSess === false || !!counterSess.invoicesFY === false || !counterSess.invoicesFY.length){
          const values = await newQuery(props.dbConn, sql);
          // console.log('BarChart !');
          // console.log(values);
          if (!!values && values.values.length){
            const intRes = sanitizeQueryResult(values.values);
            // console.log(intRes);
            await setDecryptApi();
            const res = await __TRANSFORMOBJ__(intRes);
            // console.log(res);
            // let counterSess = await prefs.getPref('counter');
            // console.log(counterSess);
            counterSess = !!counterSess ? counterSess : {};
            counterSess.invoicesFY = res;
            await prefs.setPref('counter', counterSess, false);
            // console.log(counterSess);
            // counter.value = counterSess;
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
          // counter.value = await prefs.getPref('counter');
        // }
        // else {
        //   counter.value = counterSess;
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
        // counter.value = await prefs.getPref('counter');
      }
    }
  }

  const lastDayNum = checkLeapYear(yearLabel + 1)
    ? '29'
    : '28';
  // console.log(lastDayNum);
  // console.log(counter.value);

  datas.value = [];
  let ind = 0, month = 6;
  while (ind < 12){
    let param = [], last = 30;
    const array1 = [7, 8, 10, 12, 1, 3, 5];
    if (month === 13){
      month = 1;
    }
    if (array1.findIndex((elem) => elem === month) !== -1){
      last = 31;
    }
    if (month < 10){
      if (month === 2){
        param.push(`${yearLabel + 1}-0${month}-01`);
        param.push(`${yearLabel + 1}-0${month}-${lastDayNum}`);
      }
      else if (month > 5){
        param.push(`${yearLabel}-0${month}-01`);
        param.push(`${yearLabel}-0${month}-${last}`);
      }
      else {
        param.push(`${yearLabel + 1}-0${month}-01`);
        param.push(`${yearLabel + 1}-0${month}-${last}`);
      }
    }
    else {
      param.push(`${yearLabel}-${month}-01`);
      param.push(`${yearLabel}-${month}-${last}`);
    }
    // console.log(param);
    const res = await getNbInvoices(
      new Date(param[0]),
      new Date(param[1])
    );
    datas.value.push(res);
    ind++;
    month++;
  }

  // console.log(datas.value);

  chartData.value = {
    labels: chartLabels,
    datasets: [
      {
        label: t('homeComponent.barChart.datasetLabel'),
        backgroundColor: '#f87979',
        data: datas.value,
      },
    ],
  };
  // console.log(chartData.value);
  loaded.value = true;
})();
// console.log(props);

// FUNCTIONS
async function getNbInvoices(dateStart: Date, dateEnd: Date) {
  let ret = 0;
  if (platform.is.desktop){
    const invoices = !!props.invoicesFY
      ? props.invoicesFY
      : counterStore.getInvoicesFY;
    for (const k in invoices) {
      const d = new Date(invoices[k].date);
      if (d >= dateStart && d <= dateEnd) ret += 1;
    }
  }
  else {
    const count = await prefs.getPref('counter');
    const invoices = !!props.invoicesFY 
      ? props.invoicesFY
      : (!!count && !!count.invoicesFY ? count.invoicesFY : []);
    for (const k in invoices) {
      const d = new Date(invoices[k].date);
      if (d >= dateStart && d <= dateEnd)
        ret += 1;
    }
  }
  // console.log(ret);
  return ret;
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
function checkLeapYear(year: number){
  let ret = false;
  if (year >= 400){
    if (!Number.isInteger(year / 4) 
      && !Number.isInteger(year / 100)
      && !Number.isInteger(year / 400)){
      return ret;
    }
    else if (Number.isInteger(year / 4)){
      if (Number.isInteger(year / 100)
        && !Number.isInteger(year / 400)){
        return ret;
      }
      else {
        ret = true;
      }
    } else if(Number.isInteger(year / 400)) {
      ret = true;
    }
  }
  return ret;
};
function handleOrientation(){
  // console.log(screen.orientation);
  orientation.value = screen.orientation.type;
};

// WATCHERS

// LIFECYCLE EVENTS

// OTHERS
</script>
