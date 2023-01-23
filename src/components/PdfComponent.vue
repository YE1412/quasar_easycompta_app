<template>
  <div></div>
</template>

<script setup lang='ts'>
/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { useUserStore } from 'stores/user';
import { useInvoiceStore } from 'stores/invoice';
import { useCounterStore } from 'stores/counter';
import { useSessionStore } from 'stores/session';
import { Canvg } from 'canvg';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import 'assets/fonts/Avenir-Medium/Avenir-Medium-normal';
import _ from 'lodash';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
import { openDbConnection, isDbConnectionOpen, newQuery, closeDbConnection } from 'cap/storage';
import { setDecryptApi, __TRANSFORMOBJ__ } from 'src/globals';
// import { Http } from '@capacitor-community/http';
import { Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import write_blob from 'capacitor-blob-writer';

// VARIABLES
interface PdfComponentProps {
  dbConn: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<PdfComponentProps>(), {
  dbConn: null,
});
const $q = useQuasar();
const platform = $q.platform;
// console.log(platform);
const { t, locale } = useI18n({ useScope: 'global' });
const route = useRoute();
const router = useRouter();
const tableXPos = 26.3,
  headerYPos = 41.3,
  headerTableWidth = 393.9,
  headerTableHeight = 95,
  orderHeaderTableHeight = 30,
  serviceHeaderTableHeight = 33,
  serviceContentTableHeight = 20;
const invoiceIds = ref([]);
const invoicesDetails = ref([]);
const contentsForPrint = computed(() => {
  let ret = [];
  for (const key in invoicesDetails.value) {
    ret[key] = {};
    // console.log(invoicesDetails[key]);
    for (const key2 in invoicesDetails.value[key]) {
      if (key2 === 'buyer') {
        ret[key][key2] = tableInvoicesBuyerLibelle(key);
      } else if (key2 === 'seller') {
        ret[key][key2] = tableInvoicesSellerLibelle(key);
      } else if (key2 === 'commandes') {
        ret[key][key2] = tableInvoicesOrdersLibelle(key);
      } else if (key2 === 'devise') {
        ret[key][key2] = tableInvoicesDeviseLibelle(key);
      } else if (key2 === 'langue') {
        ret[key][key2] = tableInvoicesLangueLibelle(key);
      } else if (key2 === 'payments') {
        ret[key][key2] = tableInvoicesPaymentsLibelle(key);
      } else if (key2 === 'tvaValue') {
        ret[key][key2] = tableInvoicesVATLibelle(key);
      } else if (key2 === 'date') {
        ret[key][key2] = tableInvoicesDateLibelle(key);
      } else if (key2 === 'invoiceTTPrice') {
        ret[key][key2] = tableInvoicesTTPriceLibelle(key);
      } else {
        ret[key][key2] = invoicesDetails.value[key][key2];
      }
    }
    ret[key]['billingAddress'] = tableInvoicesBillingLibelle(key);
  }
  return ret;
});

let userStore = null;
let invoiceStore = null;
let counterStore = null;
let sessionStore = null;
let languageVal = '', 
  doc = null,
  contentCellTableWidth = parseFloat((headerTableWidth / 7).toFixed(1)),
  footerCellTableWidth = parseFloat((headerTableWidth / 5).toFixed(1)),
  contentXPos = tableXPos + 1.7;
let prefs = null, user = null, counter = null;

// DECLARATIONS
if (platform.is.desktop) {
  userStore = useUserStore();
  invoiceStore = useInvoiceStore();
  counterStore = useCounterStore();
  sessionStore = useSessionStore();
}
// else {

// }
(async() => {
  invoiceIds.value = route.params.invoiceIds;
  let invoicesObj = null;
  let mainLocale = null;
  if (platform.is.desktop){
    await counterStore.getAllPrices();
    await userStore.retrieveUser(userStore.getUser.userId);
    invoicesObj = await invoiceStore
      .getMoreInvoices(invoiceIds.value)
      .then(
        (res) => {
          // console.log(res);
          return res;
        },
        () => {
          return [];
        }
      )
      .catch((err) => {
        console.log(err);
        return [];
      });
    mainLocale = sessionStore.getLangDisplayed.nom;
  }
  else {
    prefs = await import('cap/storage/preferences');
    const usr = await prefs.getPref('user');
    user = !!usr ? usr.user : {};
    // const session = await prefs.getPref('session');
    const ctr = await prefs.getPref('counter');
    counter = !!ctr ? ctr : {};
    const invs = await prefs.getPref('invoice');
    // console.log(props.dbConn);
    let isOpen = await isDbConnectionOpen(props.dbConn);
    isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
    // isOpen = await openDbConnection(props.dbConn);
    let newCounter = null, newInvoices = null;
    // console.log(isOpen);
    if (isOpen) {
      let sql = 'SELECT \`stockPricesId\`, \`euro\`, \`dollar\`, \`livre\` FROM \`stock_prices\` AS \`stock_prices\`;';
      // console.log(sql);
      let values = await newQuery(props.dbConn, sql);
      if (!!values && values.values.length) {
        newCounter = !!ctr ? ctr : {};
        newCounter.prices = values.values;
      }
      else {
        newCounter = !!ctr ? ctr : {};
        newCounter.prices = [];
      }

      sql = 'SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`commandes\`.\`orderId\` AS \`commandes.orderId\`, \`commandes\`.\`contenuAdditionnel\` AS \`commandes.contenuAdditionnel\`, \`commandes\`.\`priceHt\` AS \`commandes.priceHt\`, \`commandes\`.\`factureId\` AS \`commandes.factureId\`, \`commandes->Services\`.\`serviceId\` AS \`commandes.Services.serviceId\`, \`commandes->Services\`.\`montantHt\` AS \`commandes.Services.montantHt\`, \`commandes->Services\`.\`nom\` AS \`commandes.Services.nom\`, \`commandes->Services\`.\`quantite\` AS \`commandes.Services.quantite\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`commande\` AS \`commandes\` ON \`facture\`.\`factureId\` = \`commandes\`.\`factureId\` LEFT OUTER JOIN ( \`contains\` AS \`commandes->Services->contains\` INNER JOIN \`produitservice\` AS \`commandes->Services\` ON \`commandes->Services\`.\`serviceId\` = \`commandes->Services->contains\`.\`serviceId\`) ON \`commandes\`.\`orderId\` = \`commandes->Services->contains\`.\`orderId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE (';
      for (const k in invoiceIds.value){
        sql += k < (invoiceIds.value.length - 1) 
          ? `\`facture\`.\`factureId\` = '${invoiceIds.value[k]}' OR `
          : `\`facture\`.\`factureId\` = '${invoiceIds.value[k]}') GROUP BY \`facture\`.\`factureId\`, \`payments.paymentId\`, \`commandes.orderId\`, \`commandes.Services.serviceId\`;`;
      }
      // console.log(sql);
      values = await newQuery(props.dbConn, sql);
      if (!!values && values.values.length) {
        // console.log(values.values);
        const intRes = sanitizeQueryResult(values.values);
        // console.log(intRes);
        await setDecryptApi();
        const res = await __TRANSFORMOBJ__(intRes);
        // console.log(res);
        newInvoices = !!invs ? invs : {};
        newInvoices.invoices = res;
      }
      else {
        newInvoices = !!invs ? invs : {};
        newInvoices.invoices = [];
      }
      closeDbConnection(props.dbConn);
    }
    else {
      newCounter = !!ctr ? ctr : {};
      newCounter.prices = [];
      newInvoices = !!invs ? invs : {};
      newInvoices.invoices = [];
    }
    await prefs.setPref('counter', newCounter, false);
    await prefs.setPref('invoice', newInvoices, false);
    counter = newCounter;
    invoicesObj = newInvoices.invoices;
  }
  invoicesDetails.value = invoicesObj;
  // locale.value = mainLocale;
  let buildedPdf = [];
  // console.log('Content For Print !');
  // console.log(contentsForPrint.value);
  for (const key in contentsForPrint.value){
    const builded = await buildAndSavePdf(contentsForPrint.value[key]);
    if (!!builded)
      buildedPdf.push(builded);
  }
  locale.value = mainLocale;
  // console.log('Builded PDF !');
  // console.log(buildedPdf);
  if (!!platform.is.nativeMobile && buildedPdf.length){
    const mimeType = getMimeType(buildedPdf[0].name);
    await openFile(buildedPdf[0].uri, mimeType);
  }
  router.push({name: t('exportLinkName')});
  // console.log(route.params);
})();

// FUNCTIONS
function tableInvoicesOrdersLibelle(ind: number) {
  let ret = [],
    tvaValue = 0.0,
    totalHT = 0.0,
    totalTT = 0.0,
    totalTTLibelle = '',
    destDevise = invoicesDetails.value[ind]['devise'];
  let loc =
    invoicesDetails.value[ind]['langue'].nom;
  // loc =
  //   invoicesDetails.value[ind]['langue'].nom === 'us' ? 'en-US' : loc;
  tvaValue = invoicesDetails.value[ind]['tvaValue'];
  for (const m in invoicesDetails.value[ind]['commandes']) {
    ret[m] = {};
    totalHT = convertAmount(
      invoicesDetails.value[ind]['commandes'][m].priceHt,
      destDevise.libelle,
      getConvertFunc()
    );
    // totalHT = invoicesDetails.value[ind]['commandes'][m].priceHt;
    totalTT = totalHT + totalHT * tvaValue;
    totalTTLibelle = new Intl.NumberFormat(loc, {
      minimumFractionDigits: 2,
    }).format(totalTT.toFixed(2));
    ret[m]['orderId'] = invoicesDetails.value[ind]['commandes'][m].orderId;
    ret[m]['contenuAdditionnel'] =
      invoicesDetails.value[ind]['commandes'][m].contenuAdditionnel;
    ret[m]['totalTTLibelle'] = totalTTLibelle.replaceAll(/\s/gi, '');
    ret[m]['Services'] = [];
    for (const n in invoicesDetails.value[ind]['commandes'][m]['Services']) {
      let priceUnitTTLibelle = '',
        montantNetTTLibelle = '',
        montantNetTT = 0.0,
        priceUnitTT = 0.0,
        priceUnitHT = 0.0,
        quantity = 0;
      quantity =
        invoicesDetails.value[ind]['commandes'][m]['Services'][n].quantite;
      priceUnitHT = convertAmount(
        invoicesDetails.value[ind]['commandes'][m]['Services'][n].montantHt,
        destDevise.libelle,
        getConvertFunc()
      );
      priceUnitTT = priceUnitHT + priceUnitHT * tvaValue;
      priceUnitTTLibelle = new Intl.NumberFormat(loc, {
        minimumFractionDigits: 2,
      }).format(priceUnitTT.toFixed(2));
      montantNetTT = priceUnitTT * quantity;
      montantNetTTLibelle = new Intl.NumberFormat(loc, {
        minimumFractionDigits: 2,
      }).format(montantNetTT.toFixed(2));
      ret[m]['Services'][n] = {};
      ret[m]['Services'][n].serviceId =
        invoicesDetails.value[ind]['commandes'][m]['Services'][n].serviceId;
      ret[m]['Services'][n].quantite = quantity;
      ret[m]['Services'][n].nom =
        invoicesDetails.value[ind]['commandes'][m]['Services'][n].nom;
      ret[m]['Services'][n].montantNetTTLibelle =
        montantNetTTLibelle.replaceAll(/\s/gi, '');
      ret[m]['Services'][n].priceUnitTTLibelle =
        priceUnitTTLibelle.replaceAll(/\s/gi, '');
    }
  }
  return ret;
};
function tableInvoicesBuyerLibelle(ind: number) {
  let ret = '';
  let prenom = _.capitalize(invoicesDetails.value[ind]['buyer'].prenom);
  let nom = _.capitalize(invoicesDetails.value[ind]['buyer'].nom);
  let libelle = `${prenom} ${nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesSellerLibelle(ind: number) {
  let ret = '';
  let prenom = _.capitalize(invoicesDetails.value[ind]['seller'].prenom);
  let nom = _.capitalize(invoicesDetails.value[ind]['seller'].nom);
  let libelle = `${prenom} ${nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesDeviseLibelle(ind: number) {
  let ret = '';
  let libelle = `${invoicesDetails.value[ind]['devise'].symbole}`;
  ret = libelle;
  return ret;
};
function tableInvoicesLangueLibelle(ind: number) {
  let ret = '';
  let libelle = `${invoicesDetails.value[ind]['langue'].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesPaymentsLibelle(ind: number) {
  let ret = '';
  // let destDevise = invoicesDetails.value[ind]['devise'];
  for (const m in invoicesDetails.value[ind]['payments']) {
    let libelle = '';
    let state = '',
      paymentVal = 0.0;
    state =
      invoicesDetails.value[ind]['payments'][m].etat === 0
        ? t('paymentsComponent.libelles.etats.not_paid')
        : '';
    state =
      invoicesDetails.value[ind]['payments'][m].etat === 1
        ? t('paymentsComponent.libelles.etats.paid')
        : '';
    // paymentVal = convertAmount(
    //   invoicesDetails.value[ind]['payments'][m].paymentValue,
    //   destDevise.libelle,
    //   getConvertFunc()
    // );
    paymentVal = invoicesDetails.value[ind]['payments'][m].paymentValue;
    libelle = `${invoicesDetails.value[ind]['payments'][m].paymentId} - ${state} - ${paymentVal}`;
    ret +=
      m != invoicesDetails.value[ind]['payments'].length - 1
        ? `${libelle}, `
        : libelle;
  }
  return ret;
};
function tableInvoicesVATLibelle(ind: number) {
  let ret = {};
  let tvaValueLibelle = '',
    tvaValue = 0.0,
    tvaBase = 0.0,
    tvaMontant = 0.0,
    tvaBaseLibelle = '',
    tvaMontantLibelle = '',
    // destDevise = invoicesDetails.value[ind]['devise'],
    invTTPrice = 0.0;
  let loc =
    invoicesDetails.value[ind]['langue'].nom;
  // loc =
  //   invoicesDetails.value[ind]['langue'].nom === 'us' ? 'en-US' : loc;
  // invTTPrice = convertAmount(
  //   invoicesDetails.value[ind].invoiceTTPrice,
  //   destDevise.libelle,
  //   getConvertFunc()
  // );
  invTTPrice = invoicesDetails.value[ind].invoiceTTPrice;
  tvaValue = invoicesDetails.value[ind]['tvaValue'] * 100;
  tvaValueLibelle = new Intl.NumberFormat(loc, {
    minimumFractionDigits: 2,
  }).format(tvaValue.toFixed(2));
  tvaMontant = invTTPrice * invoicesDetails.value[ind]['tvaValue'];
  tvaMontantLibelle = new Intl.NumberFormat(loc, {
    minimumFractionDigits: 2,
  }).format(tvaMontant.toFixed(2));
  tvaBase = invTTPrice - tvaMontant.toFixed(2);
  tvaBaseLibelle = new Intl.NumberFormat(loc, {
    minimumFractionDigits: 2,
  }).format(tvaBase);
  // console.log(`tvaValue --> ${tvaValueLibelle}/tvaMontant --> ${tvaMontantLibelle}/tvaBase --> ${tvaBaseLibelle}/invTTPrice --> ${invTTPrice}`);
  ret.tvaValueLibelle = `${tvaValueLibelle} %`;
  ret.tvaBaseLibelle = tvaBaseLibelle.replaceAll(/\s/gi, '');
  ret.tvaMontantLibelle = tvaMontantLibelle.replaceAll(/\s/gi, '');
  // console.log(ret);
  return ret;
};
function tableInvoicesDateLibelle(ind: number) {
  let ret = '',
    libelle = '';
  let date = new Date(invoicesDetails.value[ind]['date']);
  let loc =
    invoicesDetails.value[ind]['langue'].nom;
  // loc =
  //   invoicesDetails.value[ind]['langue'].nom === 'us' ? 'en-US' : loc;
  // console.log(loc);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  libelle = `${date.toLocaleDateString(loc, options)}`;
  ret = libelle;
  return ret;
};
function tableInvoicesTTPriceLibelle(ind: number) {
  let ret = '';
  let ttPriceLibelle = '',
    ttPrice = 0.0,
    // destDevise = invoicesDetails.value[ind]['devise'],
    invTTPrice = 0.0;
  let loc =
    invoicesDetails.value[ind]['langue'].nom;
  // loc =
  //   invoicesDetails.value[ind]['langue'].nom === 'us' ? 'en-US' : loc;
  // invTTPrice = convertAmount(
  //   invoicesDetails.value[ind].invoiceTTPrice,
  //   destDevise.libelle,
  //   getConvertFunc()
  // );
  invTTPrice = invoicesDetails.value[ind].invoiceTTPrice;
  ttPrice = invTTPrice;
  ttPriceLibelle = new Intl.NumberFormat(loc, {
    minimumFractionDigits: 2,
  }).format(ttPrice.toFixed(2));
  ret = ttPriceLibelle.replaceAll(/\s/gi, '');
  return ret;
};
function tableInvoicesBillingLibelle(ind: number) {
  let ret = {};
  let prenomLibelle = _.capitalize(
    invoicesDetails.value[ind]['buyer'].prenom
  );
  let nomLibelle = _.capitalize(invoicesDetails.value[ind]['buyer'].nom);
  let nomRueLibelle = _.capitalize(
    invoicesDetails.value[ind]['buyer'].nomRue
  );
  let villeLibelle = invoicesDetails.value[ind]['buyer'].ville.toUpperCase();
  ret.firstLine = `${prenomLibelle} ${nomLibelle}`;
  ret.secondLine = `${invoicesDetails.value[ind]['buyer'].numRue} ${nomRueLibelle}`;
  ret.thirdLine = `${invoicesDetails.value[ind]['buyer'].cp} ${villeLibelle}`;
  return ret;
};
async function buildAndSavePdf(inv: any) {
  // console.log('Building Pdf...');
  languageVal = inv.langue === 'fr-FR' ? 'fr' : '';
  languageVal = inv.langue === 'en-US' ? 'en' : languageVal;
  locale.value = inv.langue;
  doc = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'a4',
  });
  let yPos = insertHead(inv);
  if (platform.is.desktop){
    if (userStore.getUser.companyLogo !== null){ 
      await insertLogo();
    }
  }
  else {
    if (user.companyLogo !== null){ 
      await insertLogo();
    }
  }
  for (const k in inv.commandes) {
    yPos = insertOrder(inv, yPos, k);
  }
  yPos = insertInvoiceFoot(inv, yPos);
  const date = new Date();
  let loc = inv['langue'];
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateLibelle = date.toLocaleDateString(loc, options);
  const fileName = `${t('exportsComponent.libelles.invoice')}_${
    inv.factureId
  }_${dateLibelle
    .replaceAll('/', '_')
    .replaceAll(' ', '_')
    .replaceAll(':', '_')
    .replaceAll(',', '')
    .replaceAll('à', 'a')}`;
  if (platform.is.desktop || !!platform.is.nativeMobile === false){
    doc.save(`${fileName}.pdf`);
    return null;
  }
  else {
    // console.log('Outputing PDF...');
    const output = doc.output('blob', `${fileName}.pdf`);
    // console.log('Output Raw PDF !');
    // console.log(output);
    // console.log('Downloading file !');
    // const res = await downloadForMobile(`${fileName}.pdf`, null, output);
    // const res = await writeFileForMobile(`${fileName}.pdf`, output);
    const res = await writeBlobFileForMobile(`${fileName}.pdf`, output);
    // console.log('Output writing result !');
    // console.log(res);
    // const getUri = await getFileUri(`${fileName}.pdf`);
    // console.log(getUri);
    return {uri: res, name: `${fileName}.pdf`};
  }
  // // doc.addPage(format, orientation);
};
function insertHead(inv: any): number {
  let ret = headerYPos;
  let heading = null;
  if (platform.is.desktop){
    heading = userStore.getUser.companyName.toUpperCase();
  }
  else {
    heading = user.companyName.toUpperCase();
  }
  doc.setLanguage(languageVal);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14).text(heading, tableXPos, ret);
  doc.setFont('helvetica', 'bold');
  // doc.setFontType('italic');
  ret += 18.7;
  doc
    .setFontSize(18)
    .text(
      t('exportsComponent.libelles.invoice', languageVal).toUpperCase(),
      contentXPos + 35.8,
      ret
    );
  ret += 30;
  doc.setLineWidth(1);
  doc.rect(
    tableXPos,
    ret,
    headerTableWidth,
    headerTableHeight
  );
  doc
    .setFontSize(14)
    .text(
      t('exportsComponent.libelles.billingAddressLibelle', languageVal),
      contentXPos,
      107
    );
  doc.setFont('helvetica', 'normal');
  doc
    .setFontSize(10)
    .text(
      inv.billingAddress.firstLine,
      contentXPos,
      headerYPos + 77.7
    );
  doc
    .setFontSize(10)
    .text(
      inv.billingAddress.secondLine,
      contentXPos,
      headerYPos + 89.7
    );
  doc
    .setFontSize(10)
    .text(
      inv.billingAddress.thirdLine,
      contentXPos,
      headerYPos + 101.7
    );
  ret += headerTableHeight;
  return ret;
};
async function insertLogo() {
  let canvas = null, context = null;
  if (!import.meta.env.SSR){
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    let companyLogoURL = null, v = null;
    if (platform.is.desktop){
      companyLogoURL = userStore.getUser.companyLogo;
      v = await Canvg.from(
        context,
        `${window.location.origin}${process.env.PUBLIC_PATH}/assets/uploads/${companyLogoURL}`
      );
    }
    else {
      companyLogoURL = user.companyLogo;
      v = await Canvg.from(
        context,
        `${window.location.origin}/assets/uploads/${companyLogoURL}`
      );
    }

    // Start SVG rendering with animations and mouse handling.
    if (!!v)
      v.start();
  }

  var imgData = canvas.toDataURL('image/png');
  doc.addImage(
    imgData,
    'PNG',
    tableXPos + footerCellTableWidth * 4,
    headerYPos * (1 - 1 / 2),
    footerCellTableWidth,
    48,
    'CompanyLogo',
    'MEDIUM',
    0
  );
};
function insertOrder(inv: any, yPos: number, ind: number): number {
  let ret = yPos;
  // Additional content
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    orderHeaderTableHeight
  );
  const addContentTextCell = [
    t('exportsComponent.libelles.addContentLibelle', languageVal),
    inv['commandes'][ind].contenuAdditionnel,
  ];
  // this.contentXPos + 54.6
  doc
    .setFontSize(9)
    .text(
      addContentTextCell[0],
      tableXPos + contentCellTableWidth,
      ret + 10,
      { align: 'center' }
    );
  doc.setFont('helvetica', 'normal');
  doc
    .setFontSize(10)
    .text(
      addContentTextCell[1] !== null ? addContentTextCell[1] : '',
      contentXPos + 5,
      ret + 20,
      {
        align: 'left',
        maxWidth: (contentCellTableWidth * 2 - 3.4).toString(),
      }
    );
  // Buyer
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const buyerTextCell = [
    t('exportsComponent.libelles.buyerLibelle', languageVal),
    inv['buyer'],
  ];
  doc
    .setFontSize(9)
    .text(
      buyerTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 / 2),
      ret + 10,
      { align: 'center' }
    );
  doc.setFont('helvetica', 'normal');
  doc
    .setFontSize(10)
    .text(
      buyerTextCell[1],
      tableXPos + contentCellTableWidth * 2 + 6.7,
      ret + orderHeaderTableHeight - 10,
      {
        align: 'left',
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Seller
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos + contentCellTableWidth * 3,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const sellerTextCell = [
    t('exportsComponent.libelles.sellerLibelle', languageVal),
    inv['seller'],
  ];
  doc
    .setFontSize(9)
    .text(
      sellerTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 + 1 / 2),
      ret + 10,
      { align: 'center' }
    );
  doc.setFont('helvetica', 'normal');
  doc
    .setFontSize(10)
    .text(
      sellerTextCell[1],
      tableXPos + contentCellTableWidth * 3 + 6.7,
      ret + orderHeaderTableHeight - 10,
      {
        align: 'left',
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Date
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos + contentCellTableWidth * 4,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const dateTextCell = [
    t('exportsComponent.libelles.dateLibelle', languageVal),
    inv['date'],
  ];
  doc
    .setFontSize(9)
    .text(
      dateTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 + 1 + 1 / 2),
      ret + 10,
      { align: 'center' }
    );
  doc.setFont('helvetica', 'normal');
  doc
    .setFontSize(10)
    .text(
      dateTextCell[1],
      tableXPos + contentCellTableWidth * 4 + 6.7,
      ret + orderHeaderTableHeight - 2,
      {
        align: 'left',
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Order
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos + contentCellTableWidth * 5,
    yPos,
    contentCellTableWidth * 2 - 0.2,
    orderHeaderTableHeight
  );
  const orderNumberTextCell = t(
    'exportsComponent.libelles.orderNumberLibelle',
    languageVal
  );
  doc
    .setFontSize(9)
    .text(
      orderNumberTextCell,
      tableXPos + contentCellTableWidth * 5 + 1.7,
      ret + 10,
      { align: 'left' }
    );
  doc.setFont('helvetica', 'bold');
  doc
    .setFontSize(18)
    .text(
      inv['commandes'][ind].orderId.toString(),
      tableXPos + contentCellTableWidth * 6,
      ret + orderHeaderTableHeight - 10,
      {
        align: 'center',
        maxWidth: (contentCellTableWidth - 1.7).toString(),
      }
    );
  ret += orderHeaderTableHeight;
  // INSERT SERVICES
  ret = insertServiceHead(ret);
  for (const k in inv['commandes'][ind]['Services']) {
    // console.log(k);
    ret = insertServiceContent(inv['commandes'][ind], ret, k);
  }
  ret = insertOrderFoot(inv['commandes'][ind], ret);
  return ret;
};
function insertServiceHead(yPos: number): number {
  let ret = yPos;
  // Description
  doc.setFont('helvetica', 'bold');
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    serviceHeaderTableHeight
  );
  const descriptionTextCell = t(
    'exportsComponent.libelles.descriptionLibelle',
    languageVal
  );
  doc
    .setFontSize(10)
    .text(descriptionTextCell.toUpperCase(), contentXPos, ret + 10, {
      align: 'left',
    });
  // Service ID
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    serviceHeaderTableHeight
  );
  const serviceNumberTextCell = t(
    'exportsComponent.libelles.serviceNumberLibelle',
    languageVal
  );
  doc.text(
    serviceNumberTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 2 + 1.7,
    ret + 10,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Unit Price IT
  doc.rect(
    tableXPos + contentCellTableWidth * 3,
    yPos,
    contentCellTableWidth,
    serviceHeaderTableHeight
  );
  const unitPriceTextCell = t(
    'exportsComponent.libelles.ttUnitPriceLibelle',
    languageVal
  );
  doc.text(
    unitPriceTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 3 + 1.7,
    ret + 10,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Quantity
  doc.rect(
    tableXPos + contentCellTableWidth * 4,
    yPos,
    contentCellTableWidth,
    serviceHeaderTableHeight
  );
  const quantityTextCell = t(
    'exportsComponent.libelles.quantityLibelle',
    languageVal
  );
  doc.text(
    quantityTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 4 + 1.7,
    ret + 10,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Net price IT
  doc.rect(
    tableXPos + contentCellTableWidth * 5,
    yPos,
    contentCellTableWidth,
    serviceHeaderTableHeight
  );
  const netPriceTextCell = t(
    'exportsComponent.libelles.ttNetPriceLibelle',
    languageVal
  );
  doc.text(
    netPriceTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 5 + 1.7,
    ret + 10,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Overall amount IT
  doc.rect(
    tableXPos + contentCellTableWidth * 6,
    yPos,
    contentCellTableWidth - 0.2,
    serviceHeaderTableHeight
  );
  const amountTextCell = t(
    'exportsComponent.libelles.ttOverallAmountLibelle',
    languageVal
  );
  doc.text(
    amountTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 6 + 1.7,
    ret + 10,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  ret += serviceHeaderTableHeight;
  return ret;
};
function insertServiceContent(ord: any, yPos: number, ind: number): number {
  // console.log(ord['Services'][ind]);
  if (ind == 0) yPos += 0.5;
  let ret = yPos;
  // Description
  doc.setFont('helvetica', 'bold');
  doc.setFillColor('#BBBBBB');
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    serviceContentTableHeight,
    'F'
  );
  const descriptionTextCell = ord['Services'][ind].nom;
  doc
    .setFontSize(9)
    .text(
      descriptionTextCell,
      tableXPos + 1.7,
      ret + serviceContentTableHeight - 2,
      {
        align: 'left',
        maxWidth: (contentCellTableWidth * 2 - 3.4).toString(),
      }
    );
  // Service ID
  doc.setFillColor('#FFFFFF');
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    'F'
  );
  const serviceNumberTextCell = ord['Services'][ind].serviceId.toString();
  doc.text(
    serviceNumberTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 2 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Unit Price IT
  doc.setFillColor('#BBBBBB');
  doc.rect(
    tableXPos + contentCellTableWidth * 3,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    'F'
  );
  const unitPriceTextCell = ord['Services'][ind].priceUnitTTLibelle;
  doc.text(
    unitPriceTextCell,
    tableXPos + contentCellTableWidth * 3 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Quantity
  doc.setFillColor('#FFFFFF');
  doc.rect(
    tableXPos + contentCellTableWidth * 4,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    'F'
  );
  const quantityTextCell = ord['Services'][ind].quantite.toString();
  doc.text(
    quantityTextCell,
    tableXPos + contentCellTableWidth * 4 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Net price IT
  doc.setFillColor('#BBBBBB');
  doc.rect(
    tableXPos + contentCellTableWidth * 5,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    'F'
  );
  const netPriceTextCell = ord['Services'][ind].montantNetTTLibelle;
  doc.text(
    netPriceTextCell,
    tableXPos + contentCellTableWidth * 5 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Overall amount IT
  doc.setFillColor('#FFFFFF');
  doc.rect(
    tableXPos + contentCellTableWidth * 6,
    yPos,
    contentCellTableWidth - 0.2,
    serviceContentTableHeight,
    'F'
  );
  const amountTextCell = ord['Services'][ind].montantNetTTLibelle;
  doc.text(
    amountTextCell,
    tableXPos + contentCellTableWidth * 6 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: 'left',
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  ret += serviceContentTableHeight;
  if (ind == ord['Services'].length - 1) {
    doc
      .setLineWidth(1)
      .line(
        tableXPos + contentCellTableWidth * 5,
        ret + 0.5,
        tableXPos + contentCellTableWidth * 7,
        ret + 0.5
      );
    ret += 0.5;
  }
  return ret;
};
function insertOrderFoot(ord: any, yPos: number): number {
  yPos += 0.5;
  let ret = yPos;
  // Footer
  doc.setFont('helvetica', 'bold');
  doc.setFillColor('#FFFFFF');
  doc.rect(
    tableXPos,
    yPos,
    headerTableWidth,
    serviceHeaderTableHeight,
    'F'
  );
  const totalTextCell = t('exportsComponent.libelles.totalLibelle', languageVal);
  const totalValueTextCell = ord.totalTTLibelle;
  doc.setFontSize(10).text(totalTextCell, contentXPos, ret + 10, {
    align: 'left',
    maxWidth: (headerTableWidth - 98.3).toString(),
  });
  doc.text(
    totalValueTextCell,
    tableXPos + headerTableWidth,
    ret + 10,
    {
      align: 'right',
      maxWidth: '100',
    }
  );
  ret += serviceHeaderTableHeight;
  return ret;
};
function insertInvoiceFoot(inv: any, yPos: number): number {
  yPos += 3;
  let ret = yPos;
  // Footer
  doc.setLineWidth(0.5);
  doc.rect(
    tableXPos,
    yPos,
    headerTableWidth,
    orderHeaderTableHeight
  );
  // VAT value
  doc.setFont('helvetica', 'bold');
  const vatTextCell = t('exportsComponent.libelles.vatLibelle', languageVal);
  tableXPos +
    footerCellTableWidth +
    footerCellTableWidth / 2;
  doc
    .setFontSize(10)
    .text(
      vatTextCell,
      tableXPos + footerCellTableWidth * (1 + 1 / 2),
      ret + 15,
      { align: 'center' }
    );
  doc.setFont('helvetica', 'normal');
  const vatValueTextCell = inv.tvaValue.tvaValueLibelle;
  doc.text(
    vatValueTextCell,
    tableXPos + footerCellTableWidth + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: 'left',
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // VAT base
  doc.setFont('helvetica', 'bold');
  const vatBaseTextCell = t('exportsComponent.libelles.vatBaseLibelle', languageVal);
  doc.text(
    vatBaseTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 / 2),
    ret + 15,
    { align: 'center' }
  );
  doc.setFont('helvetica', 'normal');
  // console.log(inv.tvaValue.tvaBaseLibelle.replaceAll(' ', ''));
  const vatBaseValueTextCell =
    inv.devise === '€'
      ? `${inv.tvaValue.tvaBaseLibelle} ${inv.devise}`
      : `${inv.devise} ${inv.tvaValue.tvaBaseLibelle}`;
  // console.log(vatBaseValueTextCell);
  doc.text(
    vatBaseValueTextCell,
    tableXPos + footerCellTableWidth * 2 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: 'left',
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // VAT amount
  doc.setFont('helvetica', 'bold');
  const vatAmountTextCell = t(
    'exportsComponent.libelles.vatAmountLibelle',
    languageVal
  );
  doc.text(
    vatAmountTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 + 1 / 2),
    ret + 15,
    { align: 'center' }
  );
  doc.setFont('helvetica', 'normal');
  const vatAmountValueTextCell =
    inv.devise === '€'
      ? `${inv.tvaValue.tvaMontantLibelle} ${inv.devise}`
      : `${inv.devise} ${inv.tvaValue.tvaMontantLibelle}`;
  doc.text(
    vatAmountValueTextCell,
    tableXPos + footerCellTableWidth * 3 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: 'left',
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // Total amount IT
  doc.setFont('helvetica', 'bold');
  const ttTotalTextCell = t('exportsComponent.libelles.ttTotalLibelle', languageVal);
  doc.text(
    ttTotalTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 + 1 + 1 / 2),
    ret + 15,
    { align: 'center' }
  );
  doc.setFont('helvetica', 'normal');
  const ttTotalValueTextCell =
    inv.devise === '€'
      ? `${inv.invoiceTTPrice} ${inv.devise}`
      : `${inv.devise} ${inv.invoiceTTPrice}`;
  doc.text(
    ttTotalValueTextCell,
    tableXPos + footerCellTableWidth * 4 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: 'left',
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // console.log(inv.tvaValue);
  ret += orderHeaderTableHeight;
  return ret;
};
function getConvertFunc() {
  let ret = undefined;
  if (platform.is.desktop){
    switch (userStore.getUser.devise.libelle) {
      case 'euro':
        ret = fromEuroToOther;
        break;
      case 'dollar':
        ret = fromDollarToOther;
        break;
      case 'livre':
        ret = fromLivreToOther;
        break;
      default:
        ret = fromEuroToOther;
        break;
    }
  }
  else {
    switch (user.devise.libelle) {
      case 'euro':
        ret = fromEuroToOther;
        break;
      case 'dollar':
        ret = fromDollarToOther;
        break;
      case 'livre':
        ret = fromLivreToOther;
        break;
      default:
        ret = fromEuroToOther;
        break;
    }
  }
  return ret;
};
function convertAmount(val: number, dest: string, func: any) {
  return func(val, dest);
};
function fromEuroToOther(val: number, dest: string): number {
  let ret = val;
  let stock_price = null;
  if (platform.is.desktop){
    stock_price = counterStore.getEuroPrice;
  }
  else {
    stock_price = counter.prices.find((p: any) => {
      return p.euro === 1;
    });
  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case 'dollar':
      ret *= produit !== null ? produit.dollar : 1;
      break;
    case 'livre':
      ret *= produit !== null ? produit.livre : 1;
      break;
    default:
      break;
  }
  return ret;
};
function fromDollarToOther(val: number, dest: string): number {
  let ret = val, stock_price = null;
  if (platform.is.desktop){
    stock_price = counterStore.getDollarPrice;
  }
  else {
    stock_price = counter.prices.find((p: any) => {
      return p.dollar === 1;
    });
  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case 'euro':
      ret *= produit !== null ? produit.euro : 1;
      break;
    case 'livre':
      ret *= produit !== null ? produit.livre : 1;
      break;
    default:
      break;
  }
  return ret;
};
function fromLivreToOther(val: number, dest: string): number {
  let ret = val;
  let stock_price = null;
  if (platform.is.desktop){
    stock_price = counterStore.getLivrePrice;
  }
  else {
    stock_price = counter.prices.find((p: any) => {
      return p.livre === 1;
    });
  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case 'dollar':
      ret *= produit !== null ? produit.dollar : 1;
      break;
    case 'euro':
      ret *= produit !== null ? produit.euro : 1;
      break;
    default:
      break;
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
        else if(l === 'commandes.Services.serviceId') {
          if (obj[k][l] !== null){
            if(ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if (!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({serviceId: obj[k][l]});
              }
              else{
                // const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                const foundIndex = ret[ind]['commandes'][orderLen - 1]['Services'].findIndex(elem => elem.serviceId === obj[k][l]);
                // if (obj[k][l] !== null){
                if (foundIndex === -1)
                  ret[ind]['commandes'][orderLen - 1]['Services'].push({serviceId: obj[k][l]});
                else
                  ret[ind]['commandes'][orderLen - 1]['Services'][foundIndex].serviceId = obj[k][l];
                // }
              }
            }
          }
        }
        else if(l === 'commandes.Services.montantHt') {
          if (obj[k][l] !== null){
            if(ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if (!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({montantHt: obj[k][l]});
              }
              else{
                // const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                const foundIndex = ret[ind]['commandes'][orderLen - 1]['Services'].findIndex(elem => elem.serviceId === obj[k]['commandes.Services.serviceId']);
                if (foundIndex === -1)
                  ret[ind]['commandes'][orderLen - 1]['Services'].push({montantHt: obj[k][l]});
                else
                  ret[ind]['commandes'][orderLen - 1]['Services'][foundIndex].montantHt = obj[k][l];
              }
            }
          }
        }
        else if(l === 'commandes.Services.nom') {
          if (obj[k][l] !== null){
            if(ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if (!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({nom: obj[k][l]});
              }
              else{
                // const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                const foundIndex = ret[ind]['commandes'][orderLen - 1]['Services'].findIndex(elem => elem.serviceId === obj[k]['commandes.Services.serviceId']);
                if (foundIndex === -1)
                  ret[ind]['commandes'][orderLen - 1]['Services'].push({nom : obj[k][l]});
                else
                  ret[ind]['commandes'][orderLen - 1]['Services'][foundIndex].nom = obj[k][l];
              }
            }
          }
        }
        else if(l === 'commandes.Services.quantite') {
          if (obj[k][l] !== null){
            if(ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if (!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({quantite: obj[k][l]});
              }
              else{
                // const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                const foundIndex = ret[ind]['commandes'][orderLen - 1]['Services'].findIndex(elem => elem.serviceId === obj[k]['commandes.Services.serviceId']);
                if (foundIndex === -1)
                  ret[ind]['commandes'][orderLen - 1]['Services'].push({quantite : obj[k][l]});
                else
                  ret[ind]['commandes'][orderLen - 1]['Services'][foundIndex].quantite = obj[k][l];
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
        else if(l === 'commandes.Services.serviceId') {
          if (obj[k][l] !== null) {
            if (ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if(!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({serviceId: obj[k][l]});
              }
              else{
                const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                ret[ind]['commandes'][orderLen - 1]['Services'][serviceLen - 1].serviceId = obj[k][l];
              }
            }
          }
          // console.log(ret[ind]['commandes']);
        }
        else if(l === 'commandes.Services.montantHt') {
          if (obj[k][l] !== null) {
            if (ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if(!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({montantHt: obj[k][l]});
              }
              else{
                const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                ret[ind]['commandes'][orderLen - 1]['Services'][serviceLen - 1].montantHt = obj[k][l];
              }
            }
          }
          // console.log(ret[ind]['commandes']);
        }
        else if(l === 'commandes.Services.nom') {
          if (obj[k][l] !== null) {
            if (ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if(!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({nom: obj[k][l]});
              }
              else{
                const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                ret[ind]['commandes'][orderLen - 1]['Services'][serviceLen - 1].nom = obj[k][l];
              }
            }
          }
          // console.log(ret[ind]['commandes']);
        }
        else if(l === 'commandes.Services.quantite') {
          if (obj[k][l] !== null) {
            if (ret[ind]['commandes'].length){
              const orderLen = ret[ind]['commandes'].length;
              ret[ind]['commandes'][orderLen - 1]['Services'] = ret[ind]['commandes'][orderLen - 1]['Services'] === undefined ? [] : ret[ind]['commandes'][orderLen - 1]['Services'];
              if(!ret[ind]['commandes'][orderLen - 1]['Services'].length){
                ret[ind]['commandes'][orderLen - 1]['Services'].push({quantite: obj[k][l]});
              }
              else{
                const serviceLen = ret[ind]['commandes'][orderLen - 1]['Services'].length;
                ret[ind]['commandes'][orderLen - 1]['Services'][serviceLen - 1].quantite = obj[k][l];
              }
            }
          }
          // console.log(ret[ind]['commandes']);
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
async function writeBlobFileForMobile(dest: string, data: Blob){
  let ret = null;
  // console.log(platform);
  const options = {
    path: `${dest}`,
    directory: Directory.Documents,
    blob: data,
    recursive: false,
    fast_mode: false,
    on_fallback: (err) => {
      console.log(err);
    }
  };
  if (platform.is.android){
    options.path = `Easy_Compta_Outputs/${dest}`;
    options.directory = Directory.ExternalStorage;
    options.recursive = true;
  }

  ret = await write_blob(options);
  return ret;
};
function getMimeType(name: string): string{
  let ret: string = null;
  if (name.indexOf('pdf')){
    ret = 'application/pdf';
  }
  else if(name.indexOf('png')){
    ret = 'image/png';
  }
  else if(name.indexOf('jpg') || name.indexOf('jpeg')){
    ret = 'image/jpeg';
  }
  else if(name.indexOf('mp4')){
    ret = 'video/mp4';
  }
  else if(name.indexOf('mp3')){
    ret = 'audio/mp3';
  }

  return ret;
};
async function openFile(uriPath: string, mimeType: string){
  const options: FileOpenerOptions = {
    filePath: uriPath,
    contentType: mimeType,
    openWithDefault: false,
  };

  await FileOpener.open(options);
};

// async function downloadForMobile(dest: string, path: string = '', data?: any = undefined): HttpDownloadFileResult {
//   let res: HttpDownloadFileResult = null;
//   let options: HttpDownloadFileOptions = null; 
//   if (!!data){
//     options = {
//       filePath: `${dest}`,
//       url: `${path}`,
//       data: data,
//       // fileDirectory: Directory.Documents,
//     };
//   }
//   else {
//     options = {
//       filePath: `${dest}`,
//       url: `${window.location.origin}${t('downloadLinkTarget')}/`,
//       // fileDirectory: Directory.Documents,
//     }; 
//   }
//   console.log(options);
//   res = await Http.downloadFile(options);
//   return res;
// };
// async function writeFileForMobile(dest: string, data: any): WriteFileResult{
//   let ret: WriteFileResult = null;
//   const options: WriteFileOptions = {
//     path: `${dest}`,
//     data: data,
//     directory: Directory.Documents,
//     encoding: Encoding.UTF8,
//     recursive: false
//   };
//   // console.log(options);
//   ret = await Filesystem.writeFile(options);
//   return ret;
// };
// async function getFileUri(path: string): GetUriResult{
//   let ret: GetUriResult = null;
//   const options: GetUriOptions = {
//     path: `${path}`,
//     directory: Directory.Documents,
//   };

//   ret = await Filesystem.getUri(options);
//   return ret;
// };

// WATCHERS
// watch(
//   route,
//   async (newR) => {
//     invoiceIds.value = newR.params.invoiceIds;
//     let invoicesObj = null;
//     if (platform.is.desktop){
//       invoicesObj = await invoiceStore
//         .getMoreInvoices(invoiceIds.value)
//         .then(
//           (res) => {
//             // console.log(res);
//             return res;
//           },
//           (ret) => {
//             return [];
//           }
//         )
//         .catch((err) => {
//           console.log(err);
//           return [];
//         });
//     }
//     else {

//     }
//     invoicesDetails.value = invoicesObj;
//     for (const key in contentsForPrint.value)
//       await buildAndSavePdf(contentsForPrint.value[key]);
//   }
// )

// LIFECYCLE EVENTS

// OTHER
</script>
