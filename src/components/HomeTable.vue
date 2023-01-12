<template>
  <div :class="cssClasses">
    <q-table
      flat
      :title="t('homeComponent.homeTable.heading')"
      :columns="headTable"
      :rows="contentTable"
      title-class="SenExtrabold-font"
      table-header-style="{text-align: center}"
      separator="horizontal">
        <template v-slot:body="propos">
          <q-tr :props="propos">
            <q-td style="text-align: center;" key="totalFiscalYearHTIncomes"
              :props="propos">
              {{ propos.row.totalFiscalYearHTIncomes }}
            </q-td>
            <q-td style="text-align: center;" key="totalFiscalYearTTIncomes"
              :props="propos">
              {{ propos.row.totalFiscalYearTTIncomes }}
            </q-td>
            <q-td style="text-align: center;" key="totalFiscalYearPaymentsIncomes"
              :props="propos">
              {{ propos.row.totalFiscalYearPaymentsIncomes }}
            </q-td>
          </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
// import { Capacitor } from '@capacitor/core';
import { useUserStore } from 'stores/user';
import { useCounterStore } from 'stores/counter';
import { useSessionStore } from 'stores/session';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery } from 'cap/storage';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'src/globals';

// VARIABLES
interface HomeTableProps {
  headTableObj?: [];
  contentTableObj?: [];
  cssClasses: string;
  dbConn: SQLiteDBConnection | null;
};
const $q = useQuasar();
const platform = $q.platform;
const { t } = useI18n();
const props = withDefaults(defineProps<HomeTableProps>(), {
  cssClasses: '',
  headTableObj: () => [
  ],
  contentTableObj: () => ([]),
  dbConn: null,
});
const defaultHeadTableObj = [{
  name: 'totalFiscalYearHTIncomes',
  label: t('homeComponent.headTable.totalFiscalYearHTIncomes'),
  field: 'totalFiscalYearHTIncomes',
  align: 'center',
  sortable: false,
  headerStyle: 'text-align: center',
},
{
  name: 'totalFiscalYearTTIncomes',
  label: t('homeComponent.headTable.totalFiscalYearTTIncomes'),
  field: 'totalFiscalYearTTIncomes',
  align: 'center',
  sortable: false,
  headerStyle: 'text-align: center',
},
{
  name: 'totalFiscalYearPaymentsIncomes',
  label: t('homeComponent.headTable.totalFiscalYearPaymentsIncomes'),
  field: 'totalFiscalYearPaymentsIncomes',
  align: 'center',
  sortable: false,
  headerStyle: 'text-align: center',
}];

const headTable = ref(props.headTableObj.length ? props.headTableObj : defaultHeadTableObj);
const contentTable = ref(props.contentTableObj.length ? props.contentTable : []);
// console.log('main !');
// console.log(headTable.value);
// console.log(contentTable.value);
let userStore = null, devise = null, counterStore = null, locale = null, sessionStore = null, prefs = null;
// DECLARATIONS
if (platform.is.desktop) {
  userStore = useUserStore();
  counterStore = useCounterStore();
  sessionStore = useSessionStore();
  locale = sessionStore.getLangDisplayed !== null ? sessionStore.getLangDisplayed.nom : 'en-US';
  if (!import.meta.env.SSR){
    (async() => {
      devise = userStore.getUser.devise;
      await counterStore.getFinancialYearInvoices(userStore.getUser.userId);
      await counterStore.getFinancialYearNbInvoices(userStore.getUser.userId);
      if (devise.deviseId == 3) {
        contentTable.value.push(
          {
            'totalFiscalYearHTIncomes': `${await getHtFYI()} ${devise.symbole}`,
            'totalFiscalYearTTIncomes': `${await getTtFYI()} ${devise.symbole}`,
            'totalFiscalYearPaymentsIncomes': `${await getPayFYI()} ${devise.symbole}`
          }
        );
      } else {
        contentTable.value.push(
          {
            'totalFiscalYearHTIncomes': `${devise.symbole} ${await getHtFYI()}`,
            'totalFiscalYearTTIncomes': `${devise.symbole} ${await getTtFYI()}`,
            'totalFiscalYearPaymentsIncomes': `${devise.symbole} ${await getPayFYI()}`
          }
        );
      }
    })();
  }
}
else {
  prefs = await import('cap/storage/preferences');
  console.log('HomeTable initalisation !');
  const usr = await prefs.getPref('user');
  const session = await prefs.getPref('session');
  // console.log(usr);
  console.log(session);
  devise = usr.user.devise;
  locale = !!session && !!session.langDisplayed ? session.langDisplayed.nom : 'en-US' ;
  let dateStart = null, dateStartLibelle = null;
  const now = new Date();
  if (now.getMonth() < 5) {
    dateStart = new Date(`${now.getFullYear() - 1}-06-01`);
  } 
  else {
    dateStart = new Date(`${now.getFullYear()}-06-01`);
  }
  dateStartLibelle = dateStart.toISOString();
  // console.log(dateStartLibelle);

  let isOpen = await isDbConnectionOpen(props.dbConn);
  isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
  if (isOpen) {
    let sql = `SELECT COUNT(\`factureId\`) AS \`n_inv\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}' AND \`date_format\` > strftime('%s', '${dateStart.toISOString()}');`;
    // console.log(sql);
    let values = await newQuery(props.dbConn, sql);
    // console.log(values);
    if (values.values.length){
      const res = values.values[0];
      await prefs.setPref('counter', {
          nbInvoices: res.n_inv,
        },
        false
      );
      // console.log('Prefs setted !');
    }
    else {
      await prefs.setPref('message', {
        messages: [
          {
            severity: true,
            content: t('homeComponent.results.ko.fetch_stats', { err: 'Select count invoices from SQLite DB !' })
          }
        ],
        messagesVisibility: true,
      });
      messageVisibility.value = true;
    }

    sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\`, strftime('%s', \`facture\`.\`date\`) AS \`date_format\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${usr.user.userId}'  AND \`date_format\` > strftime('%s', '${dateStartLibelle}')`;
    // console.log(sql);
    values = await newQuery(props.dbConn, sql);
    // console.log(values);
    if (values.values.length){
      const intRes = sanitizeQueryResult(values.values);
      // console.log(intRes);
      await setDecryptApi();
      const res = await __TRANSFORMOBJ__(intRes);
      // console.log(res);
      let counterSess = await prefs.getPref('counter');
      // console.log(counterSess);
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
    messageVisibility.value = true;
  }

  if (devise.deviseId == 3) {
    contentTable.value.push(
      {
        'totalFiscalYearHTIncomes': `${await getHtFYI()} ${devise.symbole}`,
        'totalFiscalYearTTIncomes': `${await getTtFYI()} ${devise.symbole}`,
        'totalFiscalYearPaymentsIncomes': `${await getPayFYI()} ${devise.symbole}`
      }
    );
  } else {
    contentTable.value.push(
      {
        'totalFiscalYearHTIncomes': `${devise.symbole} ${await getHtFYI()}`,
        'totalFiscalYearTTIncomes': `${devise.symbole} ${await getTtFYI()}`,
        'totalFiscalYearPaymentsIncomes': `${devise.symbole} ${await getPayFYI()}`
      }
    );
  }
  // console.log('Hometable values !');
  // console.log(contentTable.value);
}

// FUNCTIONS
async function getHtFYI() {
  let ret = 0.0;
  if (platform.is.desktop){
    for (const k in counterStore.getInvoicesFY) {
      ret += counterStore.getInvoicesFY[k].invoiceHTPrice;
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));
  }
  else {
    const counter = await prefs.getPref('counter');
    const invoices = !!counter ? counter.invoicesFY : [];
    for (const k in invoices) {
      ret += invoices[k].invoiceHTPrice;
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));  
  }
  return ret;
};
async function getTtFYI() {
  let ret = 0.0;
  if (platform.is.desktop){
    for (const k in counterStore.getInvoicesFY) {
      ret += counterStore.getInvoicesFY[k].invoiceTTPrice;
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));
  }
  else {
    const counter = await prefs.getPref('counter');
    const invoices = !!counter ? counter.invoicesFY : [];
    for (const k in invoices) {
      ret += invoices[k].invoiceTTPrice;
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));
  }
  return ret;
};
async function getPayFYI() {
  let ret = 0.0;
  if (platform.is.desktop){
    for (const k in counterStore.getInvoicesFY) {
      for (const l in counterStore.getInvoicesFY[k]['payments']) {
        if (counterStore.getInvoicesFY[k]['payments'][l].etat === 1) {
          ret +=
            counterStore.getInvoicesFY[k]['payments'][l].paymentValue;
        }
      }
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));
  }
  else {
    const counter = await prefs.getPref('counter');
    const invoices = !!counter ? counter.invoicesFY : [];
    for (const k in invoices) {
      for (const l in invoices[k]['payments']){
        if (invoices[k]['payments'][l].etat === 1){
          ret += invoices[k]['payments'][l].paymentValue ?? 0;
        }
      }
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(ret.toFixed(0));
  }
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

// WATCHERS
watch(
  () => [props.contentTableObj, props.headTableObj],
  ([content, head]) => {
    // console.log('changes !');
    // console.log(head);
    // console.log(content);
    headTable.value = head;
    contentTable.value = content;
  }
);
</script>
