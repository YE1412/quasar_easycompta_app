<template>
  <!-- <div>My component</div> -->
</template>

<script setup lang="ts">
import { Suspense, ref, nextTick, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import { useUserStore } from 'stores/user';
import { useInvoiceStore } from 'stores/invoice';
import { useCounterStore } from 'stores/counter';
import { Canvg } from 'canvg';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import 'assets/fonts/Avenir-Medium/Avenir-Medium-normal';
import _ from 'lodash';
import { useI18n } from 'vue-i18n';
// import { Capacitor } from '@capacitor/core';
import { useQuasar } from 'quasar';
import { SQLiteDBConnection, capSQLiteResult, DBSQLiteValues } from '@capacitor-community/sqlite';
import getConnection, { openDbConnection, isDbConnectionOpen, newRun, newQuery, closeConnection, closeDbConnection } from 'cap/storage';
import { setGenApi, setCryptApi, setDecryptApi, __FORMATOBJ__, __TRANSFORMOBJ__ } from 'src/globals';

// VARIABLES
interface PdfComponentProps {
  dbConn: SQLiteDBConnection | null;
};
const props = withDefaults(defineProps<PdfComponentProps>(), {
  dbConn: null,
});
const $q = useQuasar();
const platform = $q.platform;
const { t } = useI18n();
const route = useRoute();
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
      if (key2 === "buyer") {
        ret[key][key2] = tableInvoicesBuyerLibelle(key);
      } else if (key2 === "seller") {
        ret[key][key2] = tableInvoicesSellerLibelle(key);
      } else if (key2 === "commandes") {
        ret[key][key2] = tableInvoicesOrdersLibelle(key);
      } else if (key2 === "devise") {
        ret[key][key2] = tableInvoicesDeviseLibelle(key);
      } else if (key2 === "langue") {
        ret[key][key2] = tableInvoicesLangueLibelle(key);
      } else if (key2 === "payments") {
        ret[key][key2] = tableInvoicesPaymentsLibelle(key);
      } else if (key2 === "tvaValue") {
        ret[key][key2] = tableInvoicesVATLibelle(key);
      } else if (key2 === "date") {
        ret[key][key2] = tableInvoicesDateLibelle(key);
      } else if (key2 === "invoiceTTPrice") {
        ret[key][key2] = tableInvoicesTTPriceLibelle(key);
      } else {
        ret[key][key2] = invoicesDetails.value[key][key2];
      }
    }
    ret[key]["billingAddress"] = tableInvoicesBillingLibelle(key);
  }
  return ret;
});

let userStore = null;
let invoiceStore = null;
let counterStore = null;
let languageVal = '', 
  doc = null,
  contentCellTableWidth = parseFloat((headerTableWidth / 7).toFixed(1)),
  footerCellTableWidth = parseFloat((headerTableWidth / 5).toFixed(1)),
  contentXPos = tableXPos + 1.7;
let prefs = null;

// DECLARATIONS
if (platform.is.desktop) {
  userStore = useUserStore();
  invoiceStore = useInvoiceStore();
  counterStore = useCounterStore();
}
// else {

// }
(async() => {
  invoiceIds.value = route.params.invoiceIds;
  if (platform.is.desktop){
    await counterStore.getAllPrices();
    await userStore.retrieveUser(userStore.getUser.userId);
    let invoicesObj = null;
    invoicesObj = await invoiceStore
      .getMoreInvoices(invoiceIds.value)
      .then(
        (res) => {
          console.log(res);
          return res;
        },
        (ret) => {
          return [];
        }
      )
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
  else {

  }
  invoicesDetails.value = invoicesObj;
  for (const key in contentsForPrint.value)
    await buildAndSavePdf(contentsForPrint.value[key]);
  // console.log(route.params);
})();

// FUNCTIONS
function getConvertFunc() {
  let ret = undefined;
  if (platform.is.desktop){
    switch (userStore.getUser.devise.libelle) {
      case "euro":
        ret = fromEuroToOther;
        break;
      case "dollar":
        ret = fromDollarToOther;
        break;
      case "livre":
        ret = fromLivreToOther;
        break;
      default:
        ret = fromEuroToOther;
        break;
    }
  }
  else {

  }
  return ret;
};
function tableInvoicesOrdersLibelle(ind: number) {
  let ret = [],
    tvaValue = 0.0,
    totalHT = 0.0,
    totalTT = 0.0,
    totalTTLibelle = "",
    destDevise = invoicesDetails.value[ind]["devise"];
  let locale =
    invoicesDetails.value[ind]["langue"].nom;
  // locale =
  //   invoicesDetails.value[ind]["langue"].nom === "us" ? "en-US" : locale;
  tvaValue = invoicesDetails.value[ind]["tvaValue"];
  for (const m in invoicesDetails.value[ind]["commandes"]) {
    ret[m] = {};
    totalHT = convertAmount(
      invoicesDetails.value[ind]["commandes"][m].priceHt,
      destDevise.libelle,
      getConvertFunc()
    );
    totalTT = totalHT + totalHT * tvaValue;
    totalTTLibelle = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
    }).format(totalTT.toFixed(2));
    ret[m]["orderId"] = invoicesDetails.value[ind]["commandes"][m].orderId;
    ret[m]["contenuAdditionnel"] =
      invoicesDetails.value[ind]["commandes"][m].contenuAdditionnel;
    ret[m]["totalTTLibelle"] = totalTTLibelle.replaceAll(/\s/gi, "");
    ret[m]["Services"] = [];
    for (const n in invoicesDetails.value[ind]["commandes"][m]["Services"]) {
      let priceUnitTTLibelle = "",
        montantNetTTLibelle = "",
        montantNetTT = 0.0,
        priceUnitTT = 0.0,
        priceUnitHT = 0.0,
        quantity = 0;
      quantity =
        invoicesDetails.value[ind]["commandes"][m]["Services"][n].quantite;
      priceUnitHT = convertAmount(
        invoicesDetails.value[ind]["commandes"][m]["Services"][n].montantHt,
        destDevise.libelle,
        getConvertFunc()
      );
      priceUnitTT = priceUnitHT + priceUnitHT * tvaValue;
      priceUnitTTLibelle = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
      }).format(priceUnitTT.toFixed(2));
      montantNetTT = priceUnitTT * quantity;
      montantNetTTLibelle = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
      }).format(montantNetTT.toFixed(2));
      ret[m]["Services"][n] = {};
      ret[m]["Services"][n].serviceId =
        invoicesDetails.value[ind]["commandes"][m]["Services"][n].serviceId;
      ret[m]["Services"][n].quantite = quantity;
      ret[m]["Services"][n].nom =
        invoicesDetails.value[ind]["commandes"][m]["Services"][n].nom;
      ret[m]["Services"][n].montantNetTTLibelle =
        montantNetTTLibelle.replaceAll(/\s/gi, "");
      ret[m]["Services"][n].priceUnitTTLibelle =
        priceUnitTTLibelle.replaceAll(/\s/gi, "");
    }
  }
  return ret;
};
function tableInvoicesBuyerLibelle(ind: number) {
  let ret = "";
  let prenom = _.capitalize(invoicesDetails.value[ind]["buyer"].prenom);
  let nom = _.capitalize(invoicesDetails.value[ind]["buyer"].nom);
  let libelle = `${prenom} ${nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesSellerLibelle(ind: number) {
  let ret = "";
  let prenom = _.capitalize(invoicesDetails.value[ind]["seller"].prenom);
  let nom = _.capitalize(invoicesDetails.value[ind]["seller"].nom);
  let libelle = `${prenom} ${nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesDeviseLibelle(ind: number) {
  let ret = "";
  let libelle = `${invoicesDetails.value[ind]["devise"].symbole}`;
  ret = libelle;
  return ret;
};
function tableInvoicesLangueLibelle(ind: number) {
  let ret = "";
  let libelle = `${invoicesDetails.value[ind]["langue"].nom}`;
  ret = libelle;
  return ret;
};
function tableInvoicesPaymentsLibelle(ind: number) {
  let ret = "";
  let destDevise = invoicesDetails.value[ind]["devise"];
  for (const m in invoicesDetails.value[ind]["payments"]) {
    let libelle = "";
    let state = "",
      paymentVal = 0.0;
    state =
      invoicesDetails.value[ind]["payments"][m].etat === 0
        ? t("paymentsComponent.libelles.etats.not_paid")
        : "";
    state =
      invoicesDetails.value[ind]["payments"][m].etat === 1
        ? t("paymentsComponent.libelles.etats.paid")
        : "";
    paymentVal = convertAmount(
      invoicesDetails.value[ind]["payments"][m].paymentValue,
      destDevise.libelle,
      getConvertFunc()
    );
    libelle = `${invoicesDetails.value[ind]["payments"][m].paymentId} - ${state} - ${paymentVal}`;
    ret +=
      m != invoicesDetails.value[ind]["payments"].length - 1
        ? `${libelle}, `
        : libelle;
  }
  return ret;
};
function tableInvoicesVATLibelle(ind: number) {
  let ret = {};
  let tvaValueLibelle = "",
    tvaValue = 0.0,
    tvaBase = 0.0,
    tvaMontant = 0.0,
    tvaBaseLibelle = "",
    tvaMontantLibelle = "",
    destDevise = invoicesDetails.value[ind]["devise"],
    invTTPrice = 0.0;
  let locale =
    invoicesDetails.value[ind]["langue"].nom;
  // locale =
  //   invoicesDetails.value[ind]["langue"].nom === "us" ? "en-US" : locale;
  invTTPrice = convertAmount(
    invoicesDetails.value[ind].invoiceTTPrice,
    destDevise.libelle,
    getConvertFunc()
  );
  tvaValue = invoicesDetails.value[ind]["tvaValue"] * 100;
  tvaValueLibelle = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(tvaValue.toFixed(2));
  tvaMontant = invTTPrice * invoicesDetails.value[ind]["tvaValue"];
  tvaMontantLibelle = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(tvaMontant.toFixed(2));
  tvaBase = invTTPrice - tvaMontant;
  tvaBaseLibelle = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(tvaBase.toFixed(2));
  ret.tvaValueLibelle = `${tvaValueLibelle} %`;
  ret.tvaBaseLibelle = tvaBaseLibelle.replaceAll(/\s/gi, "");
  ret.tvaMontantLibelle = tvaMontantLibelle.replaceAll(/\s/gi, "");
  return ret;
};
function tableInvoicesDateLibelle(ind: number) {
  let ret = "",
    libelle = "";
  let date = new Date(invoicesDetails.value[ind]["date"]);
  let locale =
    invoicesDetails.value[ind]["langue"].nom;
  // locale =
  //   invoicesDetails.value[ind]["langue"].nom === "us" ? "en-US" : locale;
  // console.log(locale);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  libelle = `${date.toLocaleDateString(locale, options)}`;
  ret = libelle;
  return ret;
};
function tableInvoicesTTPriceLibelle(ind: number) {
  let ret = "";
  let libelle = "",
    ttPriceLibelle = "",
    ttPrice = 0.0,
    destDevise = invoicesDetails.value[ind]["devise"],
    invTTPrice = 0.0;
  let locale =
    invoicesDetails.value[ind]["langue"].nom;
  // locale =
  //   invoicesDetails.value[ind]["langue"].nom === "us" ? "en-US" : locale;
  invTTPrice = convertAmount(
    invoicesDetails.value[ind].invoiceTTPrice,
    destDevise.libelle,
    getConvertFunc()
  );
  ttPrice = invTTPrice;
  ttPriceLibelle = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(ttPrice.toFixed(2));
  ret = ttPriceLibelle.replaceAll(/\s/gi, "");
  return ret;
};
function tableInvoicesBillingLibelle(ind: number) {
  let ret = {};
  let prenomLibelle = _.capitalize(
    invoicesDetails.value[ind]["buyer"].prenom
  );
  let nomLibelle = _.capitalize(invoicesDetails.value[ind]["buyer"].nom);
  let nomRueLibelle = _.capitalize(
    invoicesDetails.value[ind]["buyer"].nomRue
  );
  let villeLibelle = invoicesDetails.value[ind]["buyer"].ville.toUpperCase();
  ret.firstLine = `${prenomLibelle} ${nomLibelle}`;
  ret.secondLine = `${invoicesDetails.value[ind]["buyer"].numRue} ${nomRueLibelle}`;
  ret.thirdLine = `${invoicesDetails.value[ind]["buyer"].cp} ${villeLibelle}`;
  return ret;
};
async function buildAndSavePdf(inv: any) {
  console.log(invoicesDetails.value);
  // console.log(inv.langue);
  languageVal = inv.langue === "fr_FR" ? "fr" : "";
  languageVal = inv.langue === "en_US" ? "en" : languageVal;
  doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });
  let yPos = insertHead(inv);
  if (platform.is.desktop){
    if (userStore.getUser.companyLogo !== null){ 
      await insertLogo();
    }
  }
  else {

  }
  for (const k in inv.commandes) {
    yPos = insertOrder(inv, yPos, k);
  }
  yPos = insertInvoiceFoot(inv, yPos);
  //  // Creating footer and saving file
  // doc
  //     .setFont("times")
  //     .setFontSize(11)
  //     .setFontStyle("italic")
  //     .setTextColor(0, 0, 255)
  //     .text(
  //       "This is a simple footer located .5 inches from page bottom",
  //       0.5,
  //       doc.internal.pageSize.height - 0.5
  //     )
  const date = new Date();
  let locale = inv["langue"];
  // locale = inv["langue"] === "us" ? "en-US" : locale;
  // console.log(locale);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dateLibelle = date.toLocaleDateString(locale, options);
  const fileName = `${t("exportsComponent.libelles.invoice")}_${
    inv.factureId
  }_${dateLibelle
    .replaceAll("/", "_")
    .replaceAll(" ", "_")
    .replaceAll(":", "_")
    .replaceAll(",", "")}`;
  // console.log(dateLibelle);
  // console.log(fileName);
  doc.save(`${fileName}.pdf`);
  // // doc.addPage(format, orientation);
};
function insertHead(inv: any): number {
  let ret = headerYPos;
  let heading = null;
  if (platform.is.desktop){
    heading = userStore.getUser.companyName.toUpperCase();
  }
  else {

  }
  doc.setLanguage(languageVal);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14).text(heading, tableXPos, ret);
  doc.setFont("helvetica", "bold");
  // doc.setFontType("italic");
  ret += 18.7;
  doc
    .setFontSize(18)
    .text(
      t("exportsComponent.libelles.invoice", languageVal).toUpperCase(),
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
      t("exportsComponent.libelles.billingAddressLibelle", languageVal),
      contentXPos,
      107
    );
  doc.setFont("helvetica", "normal");
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
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    let companyLogoURL = null;
    if (platform.is.desktop){
      companyLogoURL = userStore.getUser.companyLogo;
    }
    else {

    }
    const v = await Canvg.from(
      context,
      `${window.location.origin}/dist/assets/uploads/${companyLogoURL}`
    );

    // Start SVG rendering with animations and mouse handling.
    v.start();
  }

  var imgData = canvas.toDataURL("image/png");
  doc.addImage(
    imgData,
    "PNG",
    tableXPos + footerCellTableWidth * 4,
    headerYPos * (1 - 1 / 2),
    footerCellTableWidth,
    48,
    "CompanyLogo",
    "MEDIUM",
    0
  );
};
function insertOrder(inv: any, yPos: number, ind: number): number {
  let ret = yPos;
  // Additional content
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    orderHeaderTableHeight
  );
  const addContentTextCell = [
    t("exportsComponent.libelles.addContentLibelle", languageVal),
    inv["commandes"][ind].contenuAdditionnel,
  ];
  // this.contentXPos + 54.6
  doc
    .setFontSize(9)
    .text(
      addContentTextCell[0],
      tableXPos + contentCellTableWidth,
      ret + 10,
      { align: "center" }
    );
  doc.setFont("helvetica", "normal");
  doc
    .setFontSize(10)
    .text(
      addContentTextCell[1] !== null ? addContentTextCell[1] : "",
      contentXPos + 5,
      ret + 20,
      {
        align: "left",
        maxWidth: (contentCellTableWidth * 2 - 3.4).toString(),
      }
    );
  // Buyer
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const buyerTextCell = [
    t("exportsComponent.libelles.buyerLibelle", languageVal),
    inv["buyer"],
  ];
  doc
    .setFontSize(9)
    .text(
      buyerTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 / 2),
      ret + 10,
      { align: "center" }
    );
  doc.setFont("helvetica", "normal");
  doc
    .setFontSize(10)
    .text(
      buyerTextCell[1],
      tableXPos + contentCellTableWidth * 2 + 6.7,
      ret + orderHeaderTableHeight - 10,
      {
        align: "left",
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Seller
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos + contentCellTableWidth * 3,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const sellerTextCell = [
    t("exportsComponent.libelles.sellerLibelle", languageVal),
    inv["seller"],
  ];
  doc
    .setFontSize(9)
    .text(
      sellerTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 + 1 / 2),
      ret + 10,
      { align: "center" }
    );
  doc.setFont("helvetica", "normal");
  doc
    .setFontSize(10)
    .text(
      sellerTextCell[1],
      tableXPos + contentCellTableWidth * 3 + 6.7,
      ret + orderHeaderTableHeight - 10,
      {
        align: "left",
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Date
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos + contentCellTableWidth * 4,
    yPos,
    contentCellTableWidth,
    orderHeaderTableHeight
  );
  const dateTextCell = [
    t("exportsComponent.libelles.dateLibelle", languageVal),
    inv["date"],
  ];
  doc
    .setFontSize(9)
    .text(
      dateTextCell[0],
      tableXPos + contentCellTableWidth * (1 + 1 + 1 + 1 + 1 / 2),
      ret + 10,
      { align: "center" }
    );
  doc.setFont("helvetica", "normal");
  doc
    .setFontSize(10)
    .text(
      dateTextCell[1],
      tableXPos + contentCellTableWidth * 4 + 6.7,
      ret + orderHeaderTableHeight - 2,
      {
        align: "left",
        maxWidth: (contentCellTableWidth - 8.4).toString(),
      }
    );
  // Order
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos + contentCellTableWidth * 5,
    yPos,
    contentCellTableWidth * 2 - 0.2,
    orderHeaderTableHeight
  );
  const orderNumberTextCell = t(
    "exportsComponent.libelles.orderNumberLibelle",
    languageVal
  );
  doc
    .setFontSize(9)
    .text(
      orderNumberTextCell,
      tableXPos + contentCellTableWidth * 5 + 1.7,
      ret + 10,
      { align: "left" }
    );
  doc.setFont("helvetica", "bold");
  doc
    .setFontSize(18)
    .text(
      inv["commandes"][ind].orderId.toString(),
      tableXPos + contentCellTableWidth * 6,
      ret + orderHeaderTableHeight - 10,
      {
        align: "center",
        maxWidth: (contentCellTableWidth - 1.7).toString(),
      }
    );
  ret += orderHeaderTableHeight;
  // INSERT SERVICES
  ret = insertServiceHead(ret);
  for (const k in inv["commandes"][ind]["Services"]) {
    // console.log(k);
    ret = insertServiceContent(inv["commandes"][ind], ret, k);
  }
  ret = insertOrderFoot(inv["commandes"][ind], ret);
  return ret;
};
function insertServiceHead(yPos: number): number {
  let ret = yPos;
  // Description
  doc.setFont("helvetica", "bold");
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    serviceHeaderTableHeight
  );
  const descriptionTextCell = t(
    "exportsComponent.libelles.descriptionLibelle",
    languageVal
  );
  doc
    .setFontSize(10)
    .text(descriptionTextCell.toUpperCase(), contentXPos, ret + 10, {
      align: "left",
    });
  // Service ID
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    serviceHeaderTableHeight
  );
  const serviceNumberTextCell = t(
    "exportsComponent.libelles.serviceNumberLibelle",
    languageVal
  );
  doc.text(
    serviceNumberTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 2 + 1.7,
    ret + 10,
    {
      align: "left",
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
    "exportsComponent.libelles.ttUnitPriceLibelle",
    languageVal
  );
  doc.text(
    unitPriceTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 3 + 1.7,
    ret + 10,
    {
      align: "left",
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
    "exportsComponent.libelles.quantityLibelle",
    languageVal
  );
  doc.text(
    quantityTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 4 + 1.7,
    ret + 10,
    {
      align: "left",
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
    "exportsComponent.libelles.ttNetPriceLibelle",
    languageVal
  );
  doc.text(
    netPriceTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 5 + 1.7,
    ret + 10,
    {
      align: "left",
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
    "exportsComponent.libelles.ttOverallAmountLibelle",
    languageVal
  );
  doc.text(
    amountTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 6 + 1.7,
    ret + 10,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  ret += serviceHeaderTableHeight;
  return ret;
};
function insertServiceContent(ord: any, yPos: number, ind: number): number {
  // console.log(ord["Services"][ind]);
  if (ind == 0) yPos += 0.5;
  let ret = yPos;
  // Description
  doc.setFont("helvetica", "bold");
  doc.setFillColor("#BBBBBB");
  doc.rect(
    tableXPos,
    yPos,
    contentCellTableWidth * 2,
    serviceContentTableHeight,
    "F"
  );
  const descriptionTextCell = ord["Services"][ind].nom;
  doc
    .setFontSize(9)
    .text(
      descriptionTextCell,
      tableXPos + 1.7,
      ret + serviceContentTableHeight - 2,
      {
        align: "left",
        maxWidth: (contentCellTableWidth * 2 - 3.4).toString(),
      }
    );
  // Service ID
  doc.setFillColor("#FFFFFF");
  doc.rect(
    tableXPos + contentCellTableWidth * 2,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    "F"
  );
  const serviceNumberTextCell = ord["Services"][ind].serviceId.toString();
  doc.text(
    serviceNumberTextCell.toUpperCase(),
    tableXPos + contentCellTableWidth * 2 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Unit Price IT
  doc.setFillColor("#BBBBBB");
  doc.rect(
    tableXPos + contentCellTableWidth * 3,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    "F"
  );
  const unitPriceTextCell = ord["Services"][ind].priceUnitTTLibelle;
  doc.text(
    unitPriceTextCell,
    tableXPos + contentCellTableWidth * 3 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Quantity
  doc.setFillColor("#FFFFFF");
  doc.rect(
    tableXPos + contentCellTableWidth * 4,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    "F"
  );
  const quantityTextCell = ord["Services"][ind].quantite.toString();
  doc.text(
    quantityTextCell,
    tableXPos + contentCellTableWidth * 4 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Net price IT
  doc.setFillColor("#BBBBBB");
  doc.rect(
    tableXPos + contentCellTableWidth * 5,
    yPos,
    contentCellTableWidth,
    serviceContentTableHeight,
    "F"
  );
  const netPriceTextCell = ord["Services"][ind].montantNetTTLibelle;
  doc.text(
    netPriceTextCell,
    tableXPos + contentCellTableWidth * 5 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  // Overall amount IT
  doc.setFillColor("#FFFFFF");
  doc.rect(
    tableXPos + contentCellTableWidth * 6,
    yPos,
    contentCellTableWidth - 0.2,
    serviceContentTableHeight,
    "F"
  );
  const amountTextCell = ord["Services"][ind].montantNetTTLibelle;
  doc.text(
    amountTextCell,
    tableXPos + contentCellTableWidth * 6 + 1.7,
    ret + serviceContentTableHeight - 2,
    {
      align: "left",
      maxWidth: (contentCellTableWidth - 3.4).toString(),
    }
  );
  ret += serviceContentTableHeight;
  if (ind == ord["Services"].length - 1) {
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
  doc.setFont("helvetica", "bold");
  doc.setFillColor("#FFFFFF");
  doc.rect(
    tableXPos,
    yPos,
    headerTableWidth,
    serviceHeaderTableHeight,
    "F"
  );
  const totalTextCell = t("exportsComponent.libelles.totalLibelle", languageVal);
  const totalValueTextCell = ord.totalTTLibelle;
  doc.setFontSize(10).text(totalTextCell, contentXPos, ret + 10, {
    align: "left",
    maxWidth: (headerTableWidth - 98.3).toString(),
  });
  doc.text(
    totalValueTextCell,
    tableXPos + headerTableWidth,
    ret + 10,
    {
      align: "right",
      maxWidth: "100",
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
  doc.setFont("helvetica", "bold");
  const vatTextCell = t("exportsComponent.libelles.vatLibelle", languageVal);
  tableXPos +
    footerCellTableWidth +
    footerCellTableWidth / 2;
  doc
    .setFontSize(10)
    .text(
      vatTextCell,
      tableXPos + footerCellTableWidth * (1 + 1 / 2),
      ret + 15,
      { align: "center" }
    );
  doc.setFont("helvetica", "normal");
  const vatValueTextCell = inv.tvaValue.tvaValueLibelle;
  doc.text(
    vatValueTextCell,
    tableXPos + footerCellTableWidth + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: "left",
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // VAT base
  doc.setFont("helvetica", "bold");
  const vatBaseTextCell = t("exportsComponent.libelles.vatBaseLibelle", languageVal);
  doc.text(
    vatBaseTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 / 2),
    ret + 15,
    { align: "center" }
  );
  doc.setFont("helvetica", "normal");
  // console.log(inv.tvaValue.tvaBaseLibelle.replaceAll(" ", ""));
  const vatBaseValueTextCell =
    inv.devise === "€"
      ? `${inv.tvaValue.tvaBaseLibelle} ${inv.devise}`
      : `${inv.devise} ${inv.tvaValue.tvaBaseLibelle}`;
  doc.text(
    vatBaseValueTextCell,
    tableXPos + footerCellTableWidth * 2 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: "left",
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // VAT amount
  doc.setFont("helvetica", "bold");
  const vatAmountTextCell = t(
    "exportsComponent.libelles.vatAmountLibelle",
    languageVal
  );
  doc.text(
    vatAmountTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 + 1 / 2),
    ret + 15,
    { align: "center" }
  );
  doc.setFont("helvetica", "normal");
  const vatAmountValueTextCell =
    inv.devise === "€"
      ? `${inv.tvaValue.tvaMontantLibelle} ${inv.devise}`
      : `${inv.devise} ${inv.tvaValue.tvaMontantLibelle}`;
  doc.text(
    vatAmountValueTextCell,
    tableXPos + footerCellTableWidth * 3 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: "left",
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );
  // Total amount IT
  doc.setFont("helvetica", "bold");
  const ttTotalTextCell = t("exportsComponent.libelles.ttTotalLibelle", languageVal);
  doc.text(
    ttTotalTextCell,
    tableXPos + footerCellTableWidth * (1 + 1 + 1 + 1 + 1 / 2),
    ret + 15,
    { align: "center" }
  );
  doc.setFont("helvetica", "normal");
  const ttTotalValueTextCell =
    inv.devise === "€"
      ? `${inv.invoiceTTPrice} ${inv.devise}`
      : `${inv.devise} ${inv.invoiceTTPrice}`;
  doc.text(
    ttTotalValueTextCell,
    tableXPos + footerCellTableWidth * 4 + 1.7,
    ret + orderHeaderTableHeight - 3,
    {
      align: "left",
      maxWidth: (footerCellTableWidth - 3.4).toString(),
    }
  );

  ret += orderHeaderTableHeight;
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

  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case "dollar":
      ret *= produit !== null ? produit.dollar : 1;
      break;
    case "livre":
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

  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case "euro":
      ret *= produit !== null ? produit.euro : 1;
      break;
    case "livre":
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

  }
  const produit = stock_price !== null ? stock_price : null;
  switch (dest) {
    case "dollar":
      ret *= produit !== null ? produit.dollar : 1;
      break;
    case "euro":
      ret *= produit !== null ? produit.euro : 1;
      break;
    default:
      break;
  }
  return ret;
};

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
