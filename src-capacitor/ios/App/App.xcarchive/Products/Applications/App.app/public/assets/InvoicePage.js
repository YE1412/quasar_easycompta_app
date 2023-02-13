import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, d as computed, _ as __vitePreload, w as watch, D as provide, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, Q as QIcon, aq as unref, b1 as createSlots, a_ as isRef, a9 as createTextVNode, aa as toDisplayString, j as QBtn, a8 as Fragment, g as getCurrentInstance, B as nextTick, am as useRoute, o as onMounted } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { a as QTd } from "./QTable.js";
import { Q as QInput } from "./QInput.js";
import { q as QItemSection } from "./use-prevent-scroll.js";
import { Q as QSelect } from "./QSelect.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, d as newRun, c as closeDbConnection, e as setCryptApi, f as __FORMATOBJ__, n as newQuery, s as setDecryptApi, _ as __TRANSFORMOBJ__ } from "./use-quasar.js";
import { u as useInvoiceStore } from "./invoice.js";
import { u as useCounterStore } from "./counter.js";
import { T as TableItem } from "./TableItem.js";
import { i as invoiceAxiosService } from "./invoice.service.js";
import "./QList.js";
import "./index4.js";
import "./index2.js";
import "./WasmModules.js";
import "./service.service.js";
import "./session.js";
import "./session.service.js";
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InvoiceComponent",
  props: {
    invoiceForm: { type: Boolean, default: false },
    admin: { type: Boolean, default: true },
    display: { type: Boolean, default: false },
    dbConn: { default: null }
  },
  setup(__props) {
    const props = __props;
    const app = getCurrentInstance();
    const key = app.appContext.config.globalProperties.$key;
    const $q = useQuasar();
    const platform = $q.platform;
    const renderComponent = ref(true);
    const { t } = useI18n({ useScope: "global" });
    const displayInputObject = {
      date: {
        label: t("invoicesComponent.inputLabels.date"),
        head: t("invoicesComponent.headTable.date"),
        name: "date",
        placeholder: t("invoicesComponent.placeholders.date"),
        disabled: false
      },
      invoiceHTPrice: {
        label: t("invoicesComponent.inputLabels.invoiceHTPrice"),
        head: t("invoicesComponent.headTable.invoiceHTPrice"),
        name: "invoiceHTPrice",
        placeholder: t("invoicesComponent.placeholders.invoiceHTPrice"),
        disabled: true
      },
      invoiceTTPrice: {
        label: t("invoicesComponent.inputLabels.invoiceTTPrice"),
        head: t("invoicesComponent.headTable.invoiceTTPrice"),
        name: "invoiceTTPrice",
        placeholder: t("invoicesComponent.placeholders.invoiceTTPrice"),
        disabled: true
      },
      tvaValue: {
        label: t("invoicesComponent.inputLabels.tva"),
        head: t("invoicesComponent.headTable.tva"),
        name: "tvaValue",
        placeholder: t("invoicesComponent.placeholders.tva"),
        disabled: false
      },
      langue: {
        label: t("invoicesComponent.inputLabels.language"),
        head: t("invoicesComponent.headTable.language"),
        name: "langue",
        placeholder: t("invoicesComponent.placeholders.language"),
        disabled: false
      },
      devise: {
        label: t("invoicesComponent.inputLabels.devise"),
        head: t("invoicesComponent.headTable.devise"),
        name: "devise",
        placeholder: t("invoicesComponent.placeholders.devise"),
        disabled: false
      },
      buyer: {
        label: t("invoicesComponent.inputLabels.buyer"),
        head: t("invoicesComponent.headTable.buyer"),
        name: "buyer",
        placeholder: t("invoicesComponent.placeholders.buyer"),
        disabled: false
      },
      seller: {
        label: t("invoicesComponent.inputLabels.seller"),
        head: t("invoicesComponent.headTable.seller"),
        name: "seller",
        placeholder: t("invoicesComponent.placeholders.seller"),
        disabled: false
      },
      commandes: {
        label: t("invoicesComponent.inputLabels.commande"),
        head: t("invoicesComponent.headTable.commande"),
        name: "commandes",
        placeholder: t("invoicesComponent.placeholders.commande"),
        disabled: false
      },
      payments: {
        label: t("invoicesComponent.inputLabels.payment"),
        head: t("invoicesComponent.headTable.payment"),
        name: "payments",
        placeholder: t("invoicesComponent.placeholders.payment"),
        disabled: false
      }
    };
    let addInputObject = {
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
        label: t("forms.headTable.action"),
        name: "actions",
        head: t("forms.headTable.action"),
        placeholders: "",
        disabled: false
      }
    };
    const adminPropRef = ref(props.admin);
    const displayPropRef = ref(props.display);
    const isForm = ref(props.orderForm);
    const messageVisibility = ref(false);
    const invoiceId = ref(0);
    const date = ref(null);
    const invoiceHTPrice = computed(() => {
      let ret = 0, int = 0;
      if (commandes.value !== null) {
        for (const k in commandes.value) {
          int += commandes.value[k].priceHt;
        }
      }
      if (int && (!!devise.value && devise.value.value != 0)) {
        ret = convertAmount(int, devise.value.libelle, getConvertFunc());
      }
      return ret.toFixed(2);
    });
    const invoiceTTPrice = computed(() => {
      let ret = 0;
      if (!!tvaValue.value) {
        ret = parseFloat(invoiceHTPrice.value) * (1 + 1 * parseFloat(tvaValue.value));
      } else {
        ret = parseFloat(invoiceHTPrice.value);
      }
      return ret.toFixed(2);
    });
    const maxValue = computed(() => {
      let ret = 0, int = 0;
      if (commandes.value !== null) {
        for (const k in commandes.value) {
          int += commandes.value[k].priceHt;
        }
      }
      if (int && (!!devise.value && devise.value.value != 0)) {
        ret = convertAmount(int, devise.value.libelle, getConvertFunc());
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
            updateSelect(k, true, "buyer");
          } else {
            if (allBuyers.value[k].actorId) {
              updateSelect(k, false, "buyer");
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
            updateSelect(k, true, "seller");
          } else {
            if (allSellers.value[k].actorId) {
              updateSelect(k, false, "seller");
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
    const formState = {
      update: false,
      add: true
    };
    const defaultRow = ref([]);
    const nonEmptyDate = computed(() => {
      return !!date.value && date.value != "";
    });
    const validDate = computed(() => {
      const dateRef = new Date(date.value);
      const now = new Date();
      if (formState.add)
        return dateRef >= new Date(`${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} 00:00:00`);
      else
        return true;
    });
    const nonEmptyInvoiceHTPrice = computed(() => {
      return !!invoiceHTPrice.value && invoiceHTPrice.value != 0;
    });
    const validInvoiceHTPrice = computed(() => {
      return parseFloat(invoiceHTPrice.value) <= maxValue.value;
    });
    const nonEmptyLanguage = computed(() => {
      return !!language.value && language.value.value != 0;
    });
    const nonEmptyDevise = computed(() => {
      return !!devise.value && devise.value.value != 0;
    });
    const nonEmptyTVA = computed(() => {
      return !!tvaValue.value && parseFloat(tvaValue.value) != 0;
    });
    const validTVA = computed(() => {
      return parseFloat(tvaValue.value) > 0 && parseFloat(tvaValue.value) <= 1;
    });
    const nonEmptyBuyer = computed(() => {
      return !!buyer.value && buyer.value.value != 0;
    });
    const nonEmptySeller = computed(() => {
      return !!seller.value && seller.value.value != 0;
    });
    const nonEmptyCommandes = computed(() => {
      return !!commandes.value && commandes.value.length > 0;
    });
    const validPayments = computed(() => {
      let val = 0;
      if (payments.value !== null) {
        for (const k in payments.value) {
          val += payments.value[k].paymentValue;
        }
      }
      return parseFloat(invoiceTTPrice.value) >= val;
    });
    const formSubmitButtonState = computed(() => {
      const ret1 = !(nonEmptyDate.value && nonEmptyInvoiceHTPrice.value && nonEmptyLanguage.value && nonEmptyDevise.value && nonEmptyTVA.value && nonEmptyBuyer.value && nonEmptySeller.value && nonEmptyCommandes.value);
      const ret2 = !(validDate.value && validInvoiceHTPrice.value && validTVA.value && validPayments.value);
      return ret1 || ret2;
    });
    const orientation = ref(null);
    const compact = computed(() => {
      let ret = false;
      if (!!orientation.value) {
        if (orientation.value === "portrait-primary" || orientation.value === "portrait-secondary") {
          ret = true;
        }
      }
      return ret;
    });
    let messageStore = null, invoiceStore = null, prefs = null, userStore = null, counterStore = null, counter = null, user = null;
    if (platform.is.desktop) {
      messageStore = useMessageStore();
      invoiceStore = useInvoiceStore();
      userStore = useUserStore();
      counterStore = useCounterStore();
      userId.value = userStore.getUser.userId;
      messageVisibility.value = messageStore.getMessagesVisibility;
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        const usr = await prefs.getPref("user");
        const mess = await prefs.getPref("message");
        const count = await prefs.getPref("counter");
        counter = !!count ? count : counter;
        user = !!usr ? usr.user : user;
        userId.value = !!usr ? usr.user.userId : 0;
        const messages = !!mess ? mess.messages : [];
        const vis = !!mess ? mess.messagesVisibility : mess;
        if (messages.length && vis === null) {
          messageVisibility.value = true;
        } else {
          messageVisibility.value = vis !== null ? vis : false;
        }
      })();
    }
    function updateSelect(ind, val, type) {
      switch (type) {
        case "buyer":
          allBuyers.value[ind].cannotSelect = val;
          break;
        case "seller":
          allSellers.value[ind].cannotSelect = val;
          break;
      }
    }
    async function forceTableRerender() {
      renderComponent.value = false;
      await nextTick();
      renderComponent.value = true;
    }
    async function transformObject(obj) {
      await setCryptApi();
      __FORMATOBJ__(obj, key);
    }
    async function fetchDatasForForms() {
      if (platform.is.desktop) {
        await counterStore.getAllPrices();
        let obj = {};
        selectLanguagesOption.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.language");
        obj.cannotSelect = true;
        obj.langueId = 0;
        obj.libelle = null;
        obj.nom = null;
        selectLanguagesOption.value.push(obj);
        invoiceStore.getAllLanguages().then((res) => {
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
            content: t("invoicesComponent.results.ko.fetch_languages.linked_empty")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_languages.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        obj = {};
        selectDevisesOption.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.devise");
        obj.cannotSelect = true;
        obj.deviseId = 0;
        obj.libelle = null;
        obj.symbole = null;
        selectDevisesOption.value.push(obj);
        invoiceStore.getAllDevises().then((res) => {
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
            content: t("invoicesComponent.results.ko.fetch_devises.linked_empty")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_devises.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        obj = {};
        allBuyers.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.buyer");
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
        invoiceStore.getAllBuyers().then((res) => {
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
            content: t("invoicesComponent.results.ko.fetch_buyers.linked_empty")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_buyers.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        obj = {};
        allSellers.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.seller");
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
        invoiceStore.getAllSellers().then((res) => {
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
            content: t("invoicesComponent.results.ko.fetch_sellers.linked_empty")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_sellers.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        obj = {};
        selectOrdersOption.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.commande");
        obj.cannotSelect = true;
        obj.orderId = 0;
        obj.contenuAdditionnel = null;
        obj.priceHt = 0;
        obj.factureId = 0;
        selectOrdersOption.value.push(obj);
        invoiceStore.getAllOrders().then((res) => {
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
            content: t("invoicesComponent.results.ko.fetch_order.linked_empty")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_order.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        obj = {};
        selectPaymentsOption.value = [];
        obj.value = 0;
        obj.label = t("invoicesComponent.placeholders.payment");
        obj.cannotSelect = true;
        obj.paymentId = 0;
        obj.etat = -1;
        obj.paymentValue = 0;
        obj.paymentType = 0;
        obj.factureId = 0;
        selectPaymentsOption.value.push(obj);
        invoiceStore.getAllPayments().then((res) => {
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
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("invoicesComponent.results.ko.fetch_payments.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
      } else {
        let newCounter = null;
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          let sql = "SELECT `stockPricesId`, `euro`, `dollar`, `livre` FROM `stock_prices` AS `stock_prices`;";
          let values = await newQuery(props.dbConn, sql);
          if (!!values && values.values.length) {
            newCounter = !!counter ? counter : {};
            newCounter.prices = values.values;
          } else {
            newCounter = !!counter ? counter : {};
            newCounter.prices = [];
          }
          await prefs.setPref("counter", newCounter, false);
          counter = newCounter;
          sql = "SELECT `langue`.`langueId`, `langue`.`libelle`, `langue`.`nom` FROM `langue`;";
          values = await newQuery(props.dbConn, sql);
          let obj = {};
          selectLanguagesOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.language");
          obj.cannotSelect = true;
          obj.langueId = 0;
          obj.libelle = null;
          obj.nom = null;
          selectLanguagesOption.value.push(obj);
          if (!!values && values.values.length) {
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_languages.linked_error")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_languages.linked_empty")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          }
          sql = "SELECT `devise`.`deviseId`, `devise`.`symbole`, `devise`.`libelle` FROM `devise`;";
          values = await newQuery(props.dbConn, sql);
          obj = {};
          selectDevisesOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.devise");
          obj.cannotSelect = true;
          obj.deviseId = 0;
          obj.libelle = null;
          obj.symbole = null;
          selectDevisesOption.value.push(obj);
          if (!!values && values.values.length) {
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_devises.linked_error")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_devises.linked_empty")
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
          obj.label = t("invoicesComponent.placeholders.buyer");
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_buyers.linked_error")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_buyers.linked_empty")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
          sql = `SELECT \`personne\`.\`actorId\`, \`personne\`.\`cp\`, \`personne\`.\`email\`,
      \`personne\`.\`nom\`, \`personne\`.\`nomRue\`, \`personne\`.\`numRue\`, \`personne\`.\`numCommercant\`, \`personne\`.\`prenom\`, \`personne\`.\`tel\`, \`personne\`.\`ville\`, \`personne\`.\`actorTypeId\` FROM \`personne\` WHERE \`personne\`.\`actorTypeId\` IN (1,2);`;
          values = await newQuery(props.dbConn, sql);
          obj = {};
          allSellers.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.seller");
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              mesages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_sellers.linked_error")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              mesages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_sellers.linked_empty")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
          sql = `SELECT \`commande\`.\`orderId\`, \`commande\`.\`contenuAdditionnel\`, \`commande\`.\`priceHt\`,
      \`commande\`.\`factureId\` FROM \`commande\`;`;
          values = await newQuery(props.dbConn, sql);
          obj = {};
          selectOrdersOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.commande");
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_orders.linked_error")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_orders.linked_empty")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
          sql = `SELECT \`payment\`.\`paymentId\`, \`payment\`.\`etat\`, \`payment\`.\`paymentValue\`,
      \`payment\`.\`paymentType\`, \`payment\`.\`factureId\` FROM \`payment\`;`;
          values = await newQuery(props.dbConn, sql);
          obj = {};
          selectPaymentsOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.payment");
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_payments.linked_error")
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("forms.errors.error.sqliteDb")
              }
            ],
            messageVisibility: true
          });
          messageVisibility.value = true;
        }
      }
    }
    async function addClickFromChild(e, db) {
      e.preventDefault();
      if (!db) {
        await fetchDatasForForms();
        invoiceId.value = 0;
        date.value = null;
        language.value = { value: 0, label: t("invoicesComponent.placeholders.language"), cannotSelect: true, langueId: 0, libelle: null, nom: null };
        devise.value = { value: 0, label: t("invoicesComponent.placeholders.devise"), cannotSelect: true, deviseId: 0, libelle: null, symbole: null };
        tvaValue.value = null;
        buyer.value = { value: 0, label: t("invoicesComponent.placeholders.buyer"), cannotSelect: true, actorId: 0, cp: null, email: null, nom: null, prenom: null, nomRue: null, numRue: null, tel: null, actorTypeId: 0, ville: null, numCommercant: null };
        seller.value = { value: 0, label: t("invoicesComponent.placeholders.seller"), cannotSelect: true, actorId: 0, cp: null, email: null, nom: null, prenom: null, nomRue: null, numRue: null, tel: null, actorTypeId: 0, ville: null, numCommercant: null };
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
          actions: null
        };
        addInputObject.date.disabled = false;
        forceTableRerender();
      } else {
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
          if (props.display) {
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
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("invoicesComponent.results.ok.add")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("invoicesComponent.results.ko.add")
          });
        }
      }
    }
    async function updateClickFromChild(e, db, obj = null) {
      e.preventDefault();
      if (!db) {
        await fetchDatasForForms();
        isForm.value = true;
        formState.update = true;
        formState.add = false;
        let lang, dev, buy, sel, ord = [], pay = [], int = {};
        lang = !!obj.langue ? { value: obj.langue.langueId, label: obj.langue.libelle, cannotSelect: false, langueId: obj.langue.langueId, libelle: obj.langue.libelle, nom: obj.langue.nom } : { value: 0, label: t("invoicesComponent.placeholders.language") };
        dev = !!obj.devise ? { value: obj.devise.deviseId, label: `${obj.devise.symbole} - ${obj.devise.libelle}`, cannotSelect: false, deviseId: obj.devise.deviseId, libelle: obj.devise.libelle, symbole: obj.devise.symbole } : { value: 0, label: t("invoicesComponent.placeholders.devise") };
        buy = !!obj.buyer ? { value: obj.buyer.actorId, label: `${obj.buyer.prenom} ${obj.buyer.nom} - ${obj.buyer.email}`, cannotSelect: false, actorId: obj.buyer.actorId, prenom: obj.buyer.prenom, nom: obj.buyer.nom, email: obj.buyer.email, numRue: obj.buyer.numRue, nomRue: obj.buyer.nomRue, cp: obj.buyer.cp, ville: obj.buyer.ville, tel: obj.buyer.tel, numCommercant: obj.buyer.numCommercant, actorTypeId: obj.buyer.actorTypeId } : { value: 0, label: t("invoicesComponent.placeholders.buyer") };
        sel = !!obj.seller ? { value: obj.seller.actorId, label: `${obj.seller.prenom} ${obj.seller.nom} - ${obj.seller.email}`, cannotSelect: false, actorId: obj.seller.actorId, prenom: obj.seller.prenom, nom: obj.seller.nom, email: obj.seller.email, numRue: obj.seller.numRue, nomRue: obj.seller.nomRue, cp: obj.seller.cp, ville: obj.seller.ville, tel: obj.seller.tel, numCommercant: obj.seller.numCommercant, actorTypeId: obj.seller.actorTypeId } : { value: 0, label: t("invoicesComponent.placeholders.seller") };
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
          language: lang,
          devise: dev,
          tvaValue: obj.tvaValue,
          buyer: buy,
          seller: sel,
          commandes: ord,
          payments: pay,
          actions: null
        };
        addInputObject.date.disabled = true;
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await updateInvoiceInDb();
          if (ret) {
            isForm.value = false;
            formState.update = false;
            formState.add = true;
          }
          forceTableRerender();
        } else {
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
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("invoicesComponent.results.ok.update")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("invoicesComponent.results.ko.update")
          });
        }
      }
    }
    async function deleteClickFromChild(e, id) {
      e.preventDefault();
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
      } else {
        ret = await deleteInvoiceFromSQLiteDb();
        if (ret) {
          isForm.value = false;
          formState.update = false;
          formState.add = true;
        }
        forceTableRerender();
      }
      if (ret) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("invoicesComponent.results.ok.delete")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("invoicesComponent.results.ko.delete")
        });
      }
    }
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
        payments: payments.value
      };
      await transformObject(obj);
      return invoiceAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("invoicesComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("invoicesComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
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
        payments: payments.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let sql = "INSERT INTO `facture` (`date`, `invoiceHTPrice`, `invoiceTTPrice`, `languageId`, `deviseId`, `tvaValue`, `buyerId`, `sellerId`, `administratorId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        let values = await newRun(props.dbConn, sql, [obj.date, obj.invoiceHTPrice, obj.invoiceTTPrice, obj.languageId, obj.deviseId, obj.tvaValue, obj.buyerId, obj.sellerId, obj.adminId]);
        let val = "";
        let ret = false;
        if (values.changes.changes && values.changes.lastId) {
          if (obj.orders.length) {
            sql = "UPDATE `commande` SET `factureId`=? WHERE `orderId` IN (";
            for (const k in obj.orders) {
              sql += k < obj.orders.length - 1 ? `${obj.orders[k].orderId}, ` : `${obj.orders[k].orderId});`;
            }
            val = await newRun(props.dbConn, sql, [values.changes.lastId]);
            if (!val.changes.changes) {
              await prefs.setPref("message", {
                messages: [
                  {
                    severity: true,
                    content: t("invoicesComponent.results.ko.add", { err: "Updating orders to SQLite DB !" })
                  }
                ],
                messageVisibility: true
              });
              messageVisibility.value = true;
              closeDbConnection(props.dbConn);
              return ret;
            }
          }
          if (obj.payments.length) {
            sql = "UPDATE `payment` SET `factureId`=? WHERE `paymentId` IN (";
            for (const k in obj.payments) {
              sql += k < obj.payments.length - 1 ? `${obj.payments[k].paymentId}, ` : `${obj.payments[k].paymentId});`;
            }
            val = await newRun(props.dbConn, sql, [values.changes.lastId]);
            if (!val.changes.changes) {
              await prefs.setPref("message", {
                messages: [
                  {
                    severity: true,
                    content: t("invoicesComponent.results.ko.add", { err: "Updating payments to SQLite DB !" })
                  }
                ],
                messageVisibility: true
              });
              messageVisibility.value = true;
              closeDbConnection(props.dbConn);
              return ret;
            }
            await prefs.setPref("message", {
              messages: [
                {
                  severity: false,
                  content: t("invoicesComponent.results.ok.add")
                }
              ],
              messageVisibility: true
            });
            ret = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: false,
                  content: t("invoicesComponent.results.ok.add")
                }
              ],
              messageVisibility: true
            });
            ret = true;
          }
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("invoicesComponent.results.ko.add", { err: "Adding invoice to SQLite DB !" })
              }
            ],
            messageVisibility: true
          });
        }
        messageVisibility.value = true;
        closeDbConnection(props.dbConn);
        return ret;
      }
      await prefs.setPref("message", {
        messages: [
          {
            severity: true,
            content: t("invoicesComponent.results.ko.add", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
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
        payments: payments.value
      };
      await transformObject(obj);
      return invoiceAxiosService.update(invoiceId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("invoicesComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("invoicesComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
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
        payments: payments.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let sql = "UPDATE `facture` SET `date`=?, `invoiceHTPrice`=?, `invoiceTTPrice`=?, `languageId`=?, `deviseId`=?, `tvaValue`=?, `buyerId`=?, `sellerId`=? WHERE `factureId` = ?;";
        let ret = false;
        let values = await newRun(props.dbConn, sql, [obj.date, obj.invoiceHTPrice, obj.invoiceTTPrice, obj.languageId, obj.deviseId, obj.tvaValue, obj.buyerId, obj.sellerId, invoiceId.value]);
        let val = "";
        if (values.changes.changes) {
          if (obj.orders.length) {
            sql = "UPDATE `commande` SET `factureId`=? WHERE `orderId` IN (";
            for (const k in obj.orders) {
              sql += k < obj.orders.length - 1 ? `${obj.orders[k].orderId}, ` : `${obj.orders[k].orderId});`;
            }
            val = await newRun(props.dbConn, sql, [invoiceId.value]);
            if (!val.changes.changes) {
              await prefs.setPref("message", {
                messages: [
                  {
                    severity: true,
                    content: t("invoicesComponent.results.ko.update", { err: "Updating orders to SQLite db !" })
                  }
                ],
                messageVisibility: true
              });
              closeDbConnection(props.dbConn);
              messageVisibility.value = true;
              return ret;
            }
          } else {
            sql = "UPDATE `commande` SET `factureId`=NULL WHERE `factureId` = ?;";
            val = await newRun(props.dbConn, sql, [invoiceId.value]);
          }
          if (obj.payments.length) {
            sql = "UPDATE `payment` SET `factureId`=? WHERE `paymentId` IN (";
            for (const k in obj.payments) {
              sql += k < obj.payments.length - 1 ? `${obj.payments[k].paymentId}, ` : `${obj.payments[k].paymentId});`;
            }
            val = await newRun(props.dbConn, sql, [invoiceId.value]);
            if (!val.changes.changes) {
              await prefs.setPref("messages", [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.update", { err: "Updating payments to SQLite db !" })
                }
              ]);
              closeDbConnection(props.dbConn);
              messageVisibility.value = true;
              return ret;
            }
          } else {
            sql = "UPDATE `payment` SET `factureId`=NULL WHERE `factureId` = ?;";
            val = await newRun(props.dbConn, sql, [invoiceId.value]);
          }
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("invoicesComponent.results.ok.update")
              }
            ],
            messageVisibility: true
          });
          ret = true;
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("invoicesComponent.results.ko.update", { err: "Updating invoice to SQLite DB !" })
              }
            ],
            messageVisibility: true
          });
        }
        closeDbConnection(props.dbConn);
        messageVisibility.value = true;
        return ret;
      }
      await prefs.setPref("message", {
        messages: [
          {
            severity: true,
            content: t("invoicesComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function deleteInvoiceFromDb() {
      return invoiceAxiosService.delete(invoiceId.value).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("invoicesComponent.results.ok.delete")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("invoicesComponent.results.ko.delete", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function deleteInvoiceFromSQLiteDb() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        let sql = `DELETE FROM \`facture\` WHERE \`factureId\`= '${invoiceId.value}';`;
        let values = await newRun(props.dbConn, sql);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("invoicesComponent.results.ok.delete")
              }
            ],
            messageVisibility: true
          });
          ret = true;
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("invoicesComponent.results.ko.delete", { err: "Deleting invoice from SQLite DB !" })
              }
            ],
            messageVisibility: true
          });
        }
        messageVisibility.value = true;
        closeDbConnection(props.dbConn);
        return ret;
      }
      await prefs.setPref("message", {
        messages: [
          {
            severity: true,
            content: t("invoicesComponent.results.ko.delete", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function getConvertFunc() {
      let ret = void 0;
      if (platform.is.desktop) {
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
      } else {
        switch (user.devise.libelle) {
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
      return ret;
    }
    function convertAmount(val, dest, func) {
      return func(val, dest);
    }
    function fromEuroToOther(val, dest) {
      let ret = val;
      let stock_price = null;
      if (platform.is.desktop) {
        stock_price = counterStore.getEuroPrice;
      } else {
        stock_price = counter.prices.find((p) => {
          return p.euro === 1;
        });
      }
      const produit = stock_price !== null ? stock_price : null;
      switch (dest) {
        case "dollar":
          ret *= produit !== null ? produit.dollar : 1;
          break;
        case "livre":
          ret *= produit !== null ? produit.livre : 1;
          break;
      }
      return ret;
    }
    function fromDollarToOther(val, dest) {
      let ret = val, stock_price = null;
      if (platform.is.desktop) {
        stock_price = counterStore.getDollarPrice;
      } else {
        stock_price = counter.prices.find((p) => {
          return p.dollar === 1;
        });
      }
      const produit = stock_price !== null ? stock_price : null;
      switch (dest) {
        case "euro":
          ret *= produit !== null ? produit.euro : 1;
          break;
        case "livre":
          ret *= produit !== null ? produit.livre : 1;
          break;
      }
      return ret;
    }
    function fromLivreToOther(val, dest) {
      let ret = val;
      let stock_price = null;
      if (platform.is.desktop) {
        stock_price = counterStore.getLivrePrice;
      } else {
        stock_price = counter.prices.find((p) => {
          return p.livre === 1;
        });
      }
      const produit = stock_price !== null ? stock_price : null;
      switch (dest) {
        case "dollar":
          ret *= produit !== null ? produit.dollar : 1;
          break;
        case "euro":
          ret *= produit !== null ? produit.euro : 1;
          break;
      }
      return ret;
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    watch(
      () => [props.admin, props.display, props.invoiceForm],
      ([newAdminProp, newDisplayProp, newInvoiceForm]) => {
        adminPropRef.value = newAdminProp;
        displayPropRef.value = newDisplayProp;
        isForm.value = newInvoiceForm;
        forceTableRerender();
      }
    );
    provide("src", "invoices");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QNoSsr, null, {
          default: withCtx(() => [
            messageVisibility.value && renderComponent.value ? (openBlock(), createBlock(MessagesItem, { key: 0 })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_1, [
          renderComponent.value ? (openBlock(), createBlock(TableItem, {
            key: 0,
            tableTitle: unref(t)("invoicesComponent.tableTitle"),
            isForm: isForm.value,
            addForm: "invoiceForm",
            tableObj: adminPropRef.value ? unref(addInputObject) : displayInputObject,
            addDefaultRow: defaultRow.value,
            addActionName: "addClick",
            onAddClick: addClickFromChild,
            updateActionName: "updateClick",
            onUpdateClick: updateClickFromChild,
            deleteActionName: "deleteClick",
            onDeleteClick: deleteClickFromChild,
            ident: "factureId",
            updating: formState.update,
            adding: formState.add,
            admin: __props.admin,
            display: __props.display,
            no_data_label: unref(t)("invoicesComponent.errors.empty.tableBodyContentText"),
            no_data_button_text: unref(t)("invoicesComponent.errors.empty.buttonAdding"),
            dbConn: __props.dbConn
          }, {
            invoiceForm: withCtx(() => [
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: formState.add ? "add" : "update",
                    size: "sm"
                  }, null, 8, ["name"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: date.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => date.value = $event),
                    type: "date",
                    "stack-label": true,
                    name: unref(addInputObject).date.name,
                    label: unref(addInputObject).date.label,
                    readonly: false,
                    disable: unref(addInputObject).date.disabled,
                    hint: unref(t)("invoicesComponent.hints.date"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("invoicesComponent.placeholders.date"),
                    "reactive-rules": false,
                    rules: [
                      (val) => unref(nonEmptyDate) || unref(t)("invoicesComponent.errors.empty.date"),
                      (val) => unref(validDate) || unref(t)("invoicesComponent.errors.error.date")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "schedule" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "disable", "hint", "dense", "placeholders", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: unref(invoiceHTPrice),
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(invoiceHTPrice) ? invoiceHTPrice.value = $event : null),
                    type: "number",
                    name: unref(addInputObject).invoiceHTPrice.name,
                    label: unref(addInputObject).invoiceHTPrice.label,
                    readonly: unref(addInputObject).invoiceHTPrice.disabled,
                    disable: unref(addInputObject).invoiceHTPrice.disabled,
                    hint: unref(t)("invoicesComponent.hints.invoiceHTPrice"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("invoicesComponent.placeholders.invoiceHTPrice"),
                    "reactive-rules": true,
                    rules: [
                      (val) => unref(nonEmptyInvoiceHTPrice) || unref(t)("invoicesComponent.errors.empty.invoiceHTPrice"),
                      (val) => unref(validInvoiceHTPrice) || unref(t)("invoicesComponent.errors.error.invoiceHTPrice")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "payments" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "readonly", "disable", "hint", "dense", "placeholders", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: unref(invoiceTTPrice),
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(invoiceTTPrice) ? invoiceTTPrice.value = $event : null),
                    type: "number",
                    name: unref(addInputObject).invoiceTTPrice.name,
                    label: unref(addInputObject).invoiceTTPrice.label,
                    readonly: unref(addInputObject).invoiceTTPrice.disabled,
                    disable: unref(addInputObject).invoiceTTPrice.disabled,
                    hint: unref(t)("invoicesComponent.hints.invoiceTTPrice"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("invoicesComponent.placeholders.invoiceTTPrice"),
                    "reactive-rules": false
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "payments" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "readonly", "disable", "hint", "dense", "placeholders"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: tvaValue.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => tvaValue.value = $event),
                    type: "number",
                    name: unref(addInputObject).tvaValue.name,
                    label: unref(addInputObject).tvaValue.label,
                    readonly: unref(addInputObject).tvaValue.disabled,
                    disable: unref(addInputObject).tvaValue.disabled,
                    hint: unref(t)("invoicesComponent.hints.tva"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: false,
                    dense: unref(compact),
                    placeholders: unref(t)("invoicesComponent.placeholders.tva"),
                    "reactive-rules": false,
                    rules: [
                      (val) => unref(nonEmptyTVA) || unref(t)("invoicesComponent.errors.empty.tva"),
                      (val) => unref(validTVA) || unref(t)("invoicesComponent.errors.error.tva")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "trending_up" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "readonly", "disable", "hint", "dense", "placeholders", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": false,
                    "use-chips": false,
                    multiple: false,
                    "input-debounce": "0",
                    modelValue: language.value,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => language.value = $event),
                    name: unref(addInputObject).langue.name,
                    label: unref(addInputObject).langue.label,
                    "option-disable": "cannotSelect",
                    options: selectLanguagesOption.value,
                    hint: unref(t)("invoicesComponent.hints.language"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyLanguage) || unref(t)("invoicesComponent.errors.empty.language")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_language")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "translate" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": false,
                    "use-chips": false,
                    multiple: false,
                    "input-debounce": "0",
                    modelValue: devise.value,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => devise.value = $event),
                    name: unref(addInputObject).devise.name,
                    label: unref(addInputObject).devise.label,
                    "option-disable": "cannotSelect",
                    options: selectDevisesOption.value,
                    hint: unref(t)("invoicesComponent.hints.devise"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyDevise) || unref(t)("invoicesComponent.errors.empty.devise")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_devise")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "currency_exchange" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": false,
                    "use-chips": false,
                    multiple: false,
                    "input-debounce": "0",
                    modelValue: buyer.value,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => buyer.value = $event),
                    name: unref(addInputObject).buyer.name,
                    label: unref(addInputObject).buyer.label,
                    "option-disable": "cannotSelect",
                    options: unref(selectBuyersOption),
                    hint: unref(t)("invoicesComponent.hints.buyer"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyBuyer) || unref(t)("invoicesComponent.errors.empty.buyer")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_buyer")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "person_2" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": false,
                    "use-chips": false,
                    multiple: false,
                    "input-debounce": "0",
                    modelValue: seller.value,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => seller.value = $event),
                    name: unref(addInputObject).seller.name,
                    label: unref(addInputObject).seller.label,
                    "option-disable": "cannotSelect",
                    options: unref(selectSellersOption),
                    hint: unref(t)("invoicesComponent.hints.seller"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptySeller) || unref(t)("invoicesComponent.errors.empty.seller")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_seller")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "person_4" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": true,
                    "use-chips": true,
                    multiple: true,
                    "input-debounce": "0",
                    modelValue: commandes.value,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => commandes.value = $event),
                    name: unref(addInputObject).commandes.name,
                    label: unref(addInputObject).commandes.label,
                    "option-disable": "cannotSelect",
                    options: selectOrdersOption.value,
                    hint: unref(t)("invoicesComponent.hints.commande"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyCommandes) || unref(t)("invoicesComponent.errors.empty.commande")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_order")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "shopping_cart" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": true,
                    "use-chips": true,
                    multiple: true,
                    "input-debounce": "0",
                    modelValue: payments.value,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => payments.value = $event),
                    name: unref(addInputObject).payments.name,
                    label: unref(addInputObject).payments.label,
                    "option-disable": "cannotSelect",
                    options: selectPaymentsOption.value,
                    hint: unref(t)("invoicesComponent.hints.payment"),
                    "hide-hint": true,
                    dense: unref(compact),
                    "reactive-rules": true,
                    rules: [
                      (val) => unref(validPayments) || unref(t)("invoicesComponent.errors.error.payment")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("invoicesComponent.libelles.no_option_payment")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "payment" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, {
                style: { "text-align": "center" },
                class: "flex-center"
              }, {
                default: withCtx(() => [
                  formState.add ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    color: "primary",
                    icon: "add_circle",
                    label: unref(t)("invoicesComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[10] || (_cache[10] = ($event) => addClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true),
                  formState.update ? (openBlock(), createBlock(QBtn, {
                    key: 1,
                    color: "secondary",
                    icon: "update",
                    label: unref(t)("invoicesComponent.errors.empty.buttonUpdating"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[11] || (_cache[11] = ($event) => updateClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["tableTitle", "isForm", "tableObj", "addDefaultRow", "updating", "adding", "admin", "display", "no_data_label", "no_data_button_text", "dbConn"])) : createCommentVNode("", true)
        ])
      ], 64);
    };
  }
});
var InvoiceComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "InvoiceComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InvoicePage",
  props: {
    admin: { type: Boolean, default: true },
    display: { type: Boolean, default: false },
    dbConn: { default: null }
  },
  emits: ["change-tab"],
  setup(__props, { emit }) {
    const props = __props;
    const route = useRoute();
    const adminProp = ref(props.admin);
    const displayProp = ref(props.display);
    const renderComponent = ref(true);
    const invoiceForm = ref(false);
    if (route.params.type != "") {
      adminProp.value = route.params.type === "admin" ? true : false;
      displayProp.value = route.params.type === "display" ? true : false;
    }
    watch(
      route,
      async (newR) => {
        adminProp.value = newR.params.type === "admin" ? true : false;
        displayProp.value = newR.params.type === "display" ? true : false;
        invoiceForm.value = false;
        forceInvoiceRerender();
      }
    );
    async function forceInvoiceRerender() {
      renderComponent.value = false;
      nextTick();
      renderComponent.value = true;
    }
    onMounted(() => {
      emit("change-tab", void 0);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        padding: "",
        class: "row items-center justify-start",
        style: { "flex-direction": "column" }
      }, {
        default: withCtx(() => [
          renderComponent.value ? (openBlock(), createBlock(InvoiceComponent, {
            key: 0,
            invoiceForm: invoiceForm.value,
            admin: adminProp.value,
            display: displayProp.value,
            dbConn: __props.dbConn
          }, null, 8, ["invoiceForm", "admin", "display", "dbConn"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
var InvoicePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "InvoicePage.vue"]]);
export { InvoicePage as default };
//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hnRXpCLFVBQU0sUUFBUTtBQU9SLHNCQUFZLElBQUksTUFBTSxLQUFLO0FBQzNCLHdCQUFjLElBQUksTUFBTSxPQUFPO0FBQy9CLDRCQUFrQixJQUFJLElBQUk7QUFDMUIsd0JBQWMsSUFBSSxLQUFLO0FBR3pCLGNBQU0sT0FBTyxRQUFRLElBQUk7QUFFM0IsZ0JBQVUsUUFBUSxNQUFNLE9BQU8sU0FBUyxVQUFVLE9BQU87QUFDekQsa0JBQVksUUFBUSxNQUFNLE9BQU8sU0FBUyxZQUFZLE9BQU87QUFBQSxJQUMvRDtBQUVBO0FBQUEsTUFDRTtBQUFBLE1BQ0EsT0FBTyxTQUFTO0FBQ2Qsa0JBQVUsUUFBUSxLQUFLLE9BQU8sU0FBUyxVQUFVLE9BQU87QUFDeEQsb0JBQVksUUFBUSxLQUFLLE9BQU8sU0FBUyxZQUFZLE9BQU07QUFDM0Qsb0JBQVksUUFBUTtBQUNDO01BQ3ZCO0FBQUE7QUFJRixtQkFBZSx1QkFBdUI7QUFDcEMsc0JBQWdCLFFBQVE7QUFDZjtBQUNULHNCQUFnQixRQUFRO0FBQUEsSUFDMUI7QUFHQSxjQUFVLE1BQU07QUFDZCxXQUFLLGNBQWMsTUFBUztBQUFBLEtBQzdCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ludm9pY2VDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0ludm9pY2VQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLW5vLXNzcj5cbiAgICA8TWVzc2FnZXNJdGVtIHYtaWY9J21lc3NhZ2VWaXNpYmlsaXR5ICYmIHJlbmRlckNvbXBvbmVudCcgLz5cbiAgPC9xLW5vLXNzcj5cbiAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XG4gICAgPHRhYmxlLWl0ZW1cbiAgICAgIDp0YWJsZVRpdGxlPSd0KFwiaW52b2ljZXNDb21wb25lbnQudGFibGVUaXRsZVwiKSdcbiAgICAgIDppc0Zvcm09J2lzRm9ybSdcbiAgICAgIGFkZEZvcm09J2ludm9pY2VGb3JtJ1xuICAgICAgOnRhYmxlT2JqPSdhZG1pblByb3BSZWYgPyBhZGRJbnB1dE9iamVjdCA6IGRpc3BsYXlJbnB1dE9iamVjdCdcbiAgICAgIDphZGREZWZhdWx0Um93PSdkZWZhdWx0Um93J1xuICAgICAgYWRkQWN0aW9uTmFtZT0nYWRkQ2xpY2snXG4gICAgICBAYWRkQ2xpY2s9J2FkZENsaWNrRnJvbUNoaWxkJ1xuICAgICAgdXBkYXRlQWN0aW9uTmFtZT0ndXBkYXRlQ2xpY2snXG4gICAgICBAdXBkYXRlQ2xpY2s9J3VwZGF0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgZGVsZXRlQWN0aW9uTmFtZT0nZGVsZXRlQ2xpY2snXG4gICAgICBAZGVsZXRlQ2xpY2s9J2RlbGV0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgaWRlbnQ9J2ZhY3R1cmVJZCdcbiAgICAgIDp1cGRhdGluZz0nZm9ybVN0YXRlLnVwZGF0ZSdcbiAgICAgIDphZGRpbmc9J2Zvcm1TdGF0ZS5hZGQnXG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6YWRtaW49J2FkbWluJ1xuICAgICAgOmRpc3BsYXk9J2Rpc3BsYXknXG4gICAgICA6bm9fZGF0YV9sYWJlbD0ndChcImludm9pY2VzQ29tcG9uZW50LmVycm9ycy5lbXB0eS50YWJsZUJvZHlDb250ZW50VGV4dFwiKSdcbiAgICAgIDpub19kYXRhX2J1dHRvbl90ZXh0PSd0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZ1wiKSdcbiAgICAgIDpkYkNvbm49J2RiQ29ubic+XG4gICAgICAgIDx0ZW1wbGF0ZSAjaW52b2ljZUZvcm0+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnPlxuICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT0nZm9ybVN0YXRlLmFkZCA/IFwiYWRkXCIgOiBcInVwZGF0ZVwiJyBzaXplPSdzbSc+PC9xLWljb24+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD0nZGF0ZSdcbiAgICAgICAgICAgICAgdHlwZT0nZGF0ZSdcbiAgICAgICAgICAgICAgOnN0YWNrLWxhYmVsPSd0cnVlJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QuZGF0ZS5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LmRhdGUubGFiZWwnXG4gICAgICAgICAgICAgIDpyZWFkb25seT0nZmFsc2UnXG4gICAgICAgICAgICAgIDpkaXNhYmxlPSdhZGRJbnB1dE9iamVjdC5kYXRlLmRpc2FibGVkJ1xuICAgICAgICAgICAgICA6aGludD0ndChcImludm9pY2VzQ29tcG9uZW50LmhpbnRzLmRhdGVcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgICAgOmF1dG9ncm93PSdmYWxzZSdcbiAgICAgICAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZGF0ZVwiKSdcbiAgICAgICAgICAgICAgOnJlYWN0aXZlLXJ1bGVzPSdmYWxzZSdcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5RGF0ZSB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmRhdGVcIiksXG4gICAgICAgICAgICAgICAgdmFsID0+IHZhbGlkRGF0ZSB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVycm9yLmRhdGVcIilcbiAgICAgICAgICAgICAgXSdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3NjaGVkdWxlJyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD0naW52b2ljZUhUUHJpY2UnXG4gICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0Lmludm9pY2VIVFByaWNlLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuaW52b2ljZUhUUHJpY2UubGFiZWwnXG4gICAgICAgICAgICAgIDpyZWFkb25seT0nYWRkSW5wdXRPYmplY3QuaW52b2ljZUhUUHJpY2UuZGlzYWJsZWQnXG4gICAgICAgICAgICAgIDpkaXNhYmxlPSdhZGRJbnB1dE9iamVjdC5pbnZvaWNlSFRQcmljZS5kaXNhYmxlZCdcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJpbnZvaWNlc0NvbXBvbmVudC5oaW50cy5pbnZvaWNlSFRQcmljZVwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6YXV0b2dyb3c9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6Y2xlYXJhYmxlPSd0cnVlJ1xuICAgICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgICAgOnBsYWNlaG9sZGVycz0ndChcImludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5pbnZvaWNlSFRQcmljZVwiKSdcbiAgICAgICAgICAgICAgOnJlYWN0aXZlLXJ1bGVzPSd0cnVlJ1xuICAgICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlJbnZvaWNlSFRQcmljZSB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5Lmludm9pY2VIVFByaWNlXCIpLFxuICAgICAgICAgICAgICAgIHZhbCA9PiB2YWxpZEludm9pY2VIVFByaWNlIHx8IHQoXCJpbnZvaWNlc0NvbXBvbmVudC5lcnJvcnMuZXJyb3IuaW52b2ljZUhUUHJpY2VcIilcbiAgICAgICAgICAgICAgXSdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3BheW1lbnRzJyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD0naW52b2ljZVRUUHJpY2UnXG4gICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0Lmludm9pY2VUVFByaWNlLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuaW52b2ljZVRUUHJpY2UubGFiZWwnXG4gICAgICAgICAgICAgIDpyZWFkb25seT0nYWRkSW5wdXRPYmplY3QuaW52b2ljZVRUUHJpY2UuZGlzYWJsZWQnXG4gICAgICAgICAgICAgIDpkaXNhYmxlPSdhZGRJbnB1dE9iamVjdC5pbnZvaWNlVFRQcmljZS5kaXNhYmxlZCdcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJpbnZvaWNlc0NvbXBvbmVudC5oaW50cy5pbnZvaWNlVFRQcmljZVwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6YXV0b2dyb3c9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6Y2xlYXJhYmxlPSd0cnVlJ1xuICAgICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgICAgOnBsYWNlaG9sZGVycz0ndChcImludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5pbnZvaWNlVFRQcmljZVwiKSdcbiAgICAgICAgICAgICAgOnJlYWN0aXZlLXJ1bGVzPSdmYWxzZSdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3BheW1lbnRzJyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD0ndHZhVmFsdWUnXG4gICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0LnR2YVZhbHVlLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QudHZhVmFsdWUubGFiZWwnXG4gICAgICAgICAgICAgIDpyZWFkb25seT0nYWRkSW5wdXRPYmplY3QudHZhVmFsdWUuZGlzYWJsZWQnXG4gICAgICAgICAgICAgIDpkaXNhYmxlPSdhZGRJbnB1dE9iamVjdC50dmFWYWx1ZS5kaXNhYmxlZCdcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJpbnZvaWNlc0NvbXBvbmVudC5oaW50cy50dmFcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgICAgOmF1dG9ncm93PSdmYWxzZSdcbiAgICAgICAgICAgICAgOmNsZWFyYWJsZT0nZmFsc2UnXG4gICAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgICA6cGxhY2Vob2xkZXJzPSd0KFwiaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnR2YVwiKSdcbiAgICAgICAgICAgICAgOnJlYWN0aXZlLXJ1bGVzPSdmYWxzZSdcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5VFZBIHx8IHQoXCJpbnZvaWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkudHZhXCIpLFxuICAgICAgICAgICAgICAgIHZhbCA9PiB2YWxpZFRWQSB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVycm9yLnR2YVwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0ndHJlbmRpbmdfdXAnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcic+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICAgIDp1c2UtaW5wdXQ9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6dXNlLWNoaXBzPSdmYWxzZSdcbiAgICAgICAgICAgICAgOm11bHRpcGxlPSdmYWxzZSdcbiAgICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9JzAnXG4gICAgICAgICAgICAgIHYtbW9kZWw9J2xhbmd1YWdlJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QubGFuZ3VlLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QubGFuZ3VlLmxhYmVsJ1xuICAgICAgICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPSdzZWxlY3RMYW5ndWFnZXNPcHRpb24nXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwiaW52b2ljZXNDb21wb25lbnQuaGludHMubGFuZ3VhZ2VcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlMYW5ndWFnZSB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5Lmxhbmd1YWdlXCIpXG4gICAgICAgICAgICAgIF0nXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSd0cmFuc2xhdGUnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fb3B0aW9uX2xhbmd1YWdlJykgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICA6dXNlLWlucHV0PSdmYWxzZSdcbiAgICAgICAgICAgICAgOnVzZS1jaGlwcz0nZmFsc2UnXG4gICAgICAgICAgICAgIDptdWx0aXBsZT0nZmFsc2UnXG4gICAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPScwJ1xuICAgICAgICAgICAgICB2LW1vZGVsPSdkZXZpc2UnXG4gICAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5kZXZpc2UubmFtZSdcbiAgICAgICAgICAgICAgOmxhYmVsPSdhZGRJbnB1dE9iamVjdC5kZXZpc2UubGFiZWwnXG4gICAgICAgICAgICAgIG9wdGlvbi1kaXNhYmxlPVwiY2Fubm90U2VsZWN0XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9J3NlbGVjdERldmlzZXNPcHRpb24nXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwiaW52b2ljZXNDb21wb25lbnQuaGludHMuZGV2aXNlXCIpJ1xuICAgICAgICAgICAgICA6aGlkZS1oaW50PSd0cnVlJ1xuICAgICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5RGV2aXNlIHx8IHQoXCJpbnZvaWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuZGV2aXNlXCIpXG4gICAgICAgICAgICAgIF0nXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdjdXJyZW5jeV9leGNoYW5nZScgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPSd0ZXh0LWdyZXknPlxuICAgICAgICAgICAgICAgICAgICB7eyB0KCdpbnZvaWNlc0NvbXBvbmVudC5saWJlbGxlcy5ub19vcHRpb25fZGV2aXNlJykgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICA6dXNlLWlucHV0PSdmYWxzZSdcbiAgICAgICAgICAgICAgOnVzZS1jaGlwcz0nZmFsc2UnXG4gICAgICAgICAgICAgIDptdWx0aXBsZT0nZmFsc2UnXG4gICAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPScwJ1xuICAgICAgICAgICAgICB2LW1vZGVsPSdidXllcidcbiAgICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0LmJ1eWVyLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuYnV5ZXIubGFiZWwnXG4gICAgICAgICAgICAgIG9wdGlvbi1kaXNhYmxlPVwiY2Fubm90U2VsZWN0XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9J3NlbGVjdEJ1eWVyc09wdGlvbidcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJpbnZvaWNlc0NvbXBvbmVudC5oaW50cy5idXllclwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eUJ1eWVyIHx8IHQoXCJpbnZvaWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuYnV5ZXJcIilcbiAgICAgICAgICAgICAgXSdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3BlcnNvbl8yJyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9J3RleHQtZ3JleSc+XG4gICAgICAgICAgICAgICAgICAgIHt7IHQoJ2ludm9pY2VzQ29tcG9uZW50LmxpYmVsbGVzLm5vX29wdGlvbl9idXllcicpIH19XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Etc2VsZWN0PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgICAgOnVzZS1pbnB1dD0nZmFsc2UnXG4gICAgICAgICAgICAgIDp1c2UtY2hpcHM9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6bXVsdGlwbGU9J2ZhbHNlJ1xuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT0nMCdcbiAgICAgICAgICAgICAgdi1tb2RlbD0nc2VsbGVyJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3Quc2VsbGVyLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3Quc2VsbGVyLmxhYmVsJ1xuICAgICAgICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPSdzZWxlY3RTZWxsZXJzT3B0aW9uJ1xuICAgICAgICAgICAgICA6aGludD0ndChcImludm9pY2VzQ29tcG9uZW50LmhpbnRzLnNlbGxlclwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eVNlbGxlciB8fCB0KFwiaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LnNlbGxlclwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0ncGVyc29uXzQnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fb3B0aW9uX3NlbGxlcicpIH19XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Etc2VsZWN0PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgICAgOnVzZS1pbnB1dD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOnVzZS1jaGlwcz0ndHJ1ZSdcbiAgICAgICAgICAgICAgOm11bHRpcGxlPSd0cnVlJ1xuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT0nMCdcbiAgICAgICAgICAgICAgdi1tb2RlbD0nY29tbWFuZGVzJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QuY29tbWFuZGVzLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuY29tbWFuZGVzLmxhYmVsJ1xuICAgICAgICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPSdzZWxlY3RPcmRlcnNPcHRpb24nXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwiaW52b2ljZXNDb21wb25lbnQuaGludHMuY29tbWFuZGVcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlDb21tYW5kZXMgfHwgdChcImludm9pY2VzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5jb21tYW5kZVwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nc2hvcHBpbmdfY2FydCcgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPSd0ZXh0LWdyZXknPlxuICAgICAgICAgICAgICAgICAgICB7eyB0KCdpbnZvaWNlc0NvbXBvbmVudC5saWJlbGxlcy5ub19vcHRpb25fb3JkZXInKSB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcic+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICAgIDp1c2UtaW5wdXQ9J3RydWUnXG4gICAgICAgICAgICAgIDp1c2UtY2hpcHM9J3RydWUnXG4gICAgICAgICAgICAgIDptdWx0aXBsZT0ndHJ1ZSdcbiAgICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9JzAnXG4gICAgICAgICAgICAgIHYtbW9kZWw9J3BheW1lbnRzJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QucGF5bWVudHMubmFtZSdcbiAgICAgICAgICAgICAgOmxhYmVsPSdhZGRJbnB1dE9iamVjdC5wYXltZW50cy5sYWJlbCdcbiAgICAgICAgICAgICAgb3B0aW9uLWRpc2FibGU9XCJjYW5ub3RTZWxlY3RcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz0nc2VsZWN0UGF5bWVudHNPcHRpb24nXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwiaW52b2ljZXNDb21wb25lbnQuaGludHMucGF5bWVudFwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpyZWFjdGl2ZS1ydWxlcz0ndHJ1ZSdcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IHZhbGlkUGF5bWVudHMgfHwgdChcImludm9pY2VzQ29tcG9uZW50LmVycm9ycy5lcnJvci5wYXltZW50XCIpXG4gICAgICAgICAgICAgIF0nXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdwYXltZW50JyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9J3RleHQtZ3JleSc+XG4gICAgICAgICAgICAgICAgICAgIHt7IHQoJ2ludm9pY2VzQ29tcG9uZW50LmxpYmVsbGVzLm5vX29wdGlvbl9wYXltZW50JykgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXI7JyBjbGFzcz1cImZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cS1idG4gdi1pZj1cImZvcm1TdGF0ZS5hZGRcIlxuICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiBcbiAgICAgICAgICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIiBcbiAgICAgICAgICAgICAgOmxhYmVsPVwidCgnaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZycpXCIgXG4gICAgICAgICAgICAgIGdsb3NzeSB1bmVsZXZhdGVkXG4gICAgICAgICAgICAgIDpkaXNhYmxlZD1cImZvcm1TdWJtaXRCdXR0b25TdGF0ZVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImFkZENsaWNrRnJvbUNoaWxkKCRldmVudCwgdHJ1ZSlcIj4gIFxuICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICAgIDxxLWJ0biB2LWlmPVwiZm9ybVN0YXRlLnVwZGF0ZVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCIgXG4gICAgICAgICAgICAgIGljb249XCJ1cGRhdGVcIiBcbiAgICAgICAgICAgICAgOmxhYmVsPVwidCgnaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvblVwZGF0aW5nJylcIiBcbiAgICAgICAgICAgICAgZ2xvc3N5IHVuZWxldmF0ZWRcbiAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlQ2xpY2tGcm9tQ2hpbGQoJGV2ZW50LCB0cnVlKVwiPiAgXG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3RhYmxlLWl0ZW0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IG5leHRUaWNrLCByZWYsIHByb3ZpZGUsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJztcbi8vIGltcG9ydCB7IHVzZU9yZGVyU3RvcmUgfSBmcm9tICdzdG9yZXMvb3JkZXInO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSAnc3RvcmVzL3VzZXInO1xuaW1wb3J0IHsgdXNlSW52b2ljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL2ludm9pY2UnO1xuaW1wb3J0IHsgdXNlQ291bnRlclN0b3JlIH0gZnJvbSAnc3RvcmVzL2NvdW50ZXInO1xuaW1wb3J0IFRhYmxlSXRlbSBmcm9tICcuL1RhYmxlSXRlbS52dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuaW1wb3J0IGludm9pY2VBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvaW52b2ljZS5zZXJ2aWNlJztcbmltcG9ydCB7IElucHV0T2JqZWN0Q29sbGVjdGlvbiwgRm9ybVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInO1xuLy8gaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgeyBvcGVuRGJDb25uZWN0aW9uLCBpc0RiQ29ubmVjdGlvbk9wZW4sIG5ld1J1biwgbmV3UXVlcnksIGNsb3NlRGJDb25uZWN0aW9uIH0gZnJvbSAnY2FwL3N0b3JhZ2UnO1xuaW1wb3J0IHsgc2V0Q3J5cHRBcGksIHNldERlY3J5cHRBcGksIF9fRk9STUFUT0JKX18sIF9fVFJBTlNGT1JNT0JKX18gfSBmcm9tICdzcmMvZ2xvYmFscyc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBJbnZvaWNlUHJvcHMge1xuICBpbnZvaWNlRm9ybT86IGJvb2xlYW47XG4gIGFkbWluOiBib29sZWFuO1xuICBkaXNwbGF5OiBib29sZWFuO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsO1xufTtcbmludGVyZmFjZSBEZWZhdWx0SW52b2ljZVJvdyB7XG4gIGZhY3R1cmVJZDogbnVtYmVyO1xuICBkYXRlOiBzdHJpbmcgfCBudWxsO1xuICBpbnZvaWNlSFRQcmljZTogbnVtYmVyO1xuICBpbnZvaWNlVFRQcmljZTogbnVtYmVyO1xuICBsYW5ndWFnZTogbnVtYmVyO1xuICBkZXZpc2U6IG51bWJlcjtcbiAgdHZhVmFsdWU6IG51bWJlcjtcbiAgYnV5ZXI6IG51bWJlcjtcbiAgc2VsbGVyOiBudW1iZXI7XG4gIGNvbW1hbmRlczogW107XG4gIHBheW1lbnRzOiBbXTtcbiAgYWN0aW9uczogc3RyaW5nIHwgbnVsbDtcbn07XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxJbnZvaWNlUHJvcHM+KCksIHtcbiAgaW52b2ljZUZvcm06IGZhbHNlLFxuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgYXBwID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5jb25zdCBrZXkgPSBhcHAuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4ka2V5O1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbi8vIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHsgdCB9ID0gdXNlSTE4bih7IHVzZVNjb3BlOiAnZ2xvYmFsJyB9KTtcbmNvbnN0IGRpc3BsYXlJbnB1dE9iamVjdDogSW5wdXRPYmplY3RDb2xsZWN0aW9uID0ge1xuICBkYXRlOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLmRhdGUnKSxcbiAgICBoZWFkOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUuZGF0ZScpLFxuICAgIG5hbWU6ICdkYXRlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmRhdGUnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIGludm9pY2VIVFByaWNlOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLmludm9pY2VIVFByaWNlJyksXG4gICAgaGVhZDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmludm9pY2VIVFByaWNlJyksXG4gICAgbmFtZTogJ2ludm9pY2VIVFByaWNlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmludm9pY2VIVFByaWNlJyksXG4gICAgZGlzYWJsZWQ6IHRydWUsXG4gIH0sXG4gIGludm9pY2VUVFByaWNlOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLmludm9pY2VUVFByaWNlJyksXG4gICAgaGVhZDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmludm9pY2VUVFByaWNlJyksXG4gICAgbmFtZTogJ2ludm9pY2VUVFByaWNlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmludm9pY2VUVFByaWNlJyksXG4gICAgZGlzYWJsZWQ6IHRydWUsXG4gIH0sXG4gIHR2YVZhbHVlOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLnR2YScpLFxuICAgIGhlYWQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS50dmEnKSxcbiAgICBuYW1lOiAndHZhVmFsdWUnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMudHZhJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBsYW5ndWU6IHtcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaW5wdXRMYWJlbHMubGFuZ3VhZ2UnKSxcbiAgICBoZWFkOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUubGFuZ3VhZ2UnKSxcbiAgICBuYW1lOiAnbGFuZ3VlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmxhbmd1YWdlJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBkZXZpc2U6IHtcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaW5wdXRMYWJlbHMuZGV2aXNlJyksXG4gICAgaGVhZDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmRldmlzZScpLFxuICAgIG5hbWU6ICdkZXZpc2UnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZGV2aXNlJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBidXllcjoge1xuICAgIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5pbnB1dExhYmVscy5idXllcicpLFxuICAgIGhlYWQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5idXllcicpLFxuICAgIG5hbWU6ICdidXllcicsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5idXllcicpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgc2VsbGVyOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLnNlbGxlcicpLFxuICAgIGhlYWQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5zZWxsZXInKSxcbiAgICBuYW1lOiAnc2VsbGVyJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnNlbGxlcicpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgY29tbWFuZGVzOiB7XG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbW1hbmRlJyksXG4gICAgaGVhZDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmNvbW1hbmRlJyksXG4gICAgbmFtZTogJ2NvbW1hbmRlcycsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5jb21tYW5kZScpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgcGF5bWVudHM6IHtcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaW5wdXRMYWJlbHMucGF5bWVudCcpLFxuICAgIGhlYWQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5wYXltZW50JyksXG4gICAgbmFtZTogJ3BheW1lbnRzJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnBheW1lbnQnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG59O1xubGV0IGFkZElucHV0T2JqZWN0OiBJbnB1dE9iamVjdENvbGxlY3Rpb24gPSB7XG4gIGRhdGU6IGRpc3BsYXlJbnB1dE9iamVjdC5kYXRlLFxuICBpbnZvaWNlSFRQcmljZTogZGlzcGxheUlucHV0T2JqZWN0Lmludm9pY2VIVFByaWNlLFxuICBpbnZvaWNlVFRQcmljZTogZGlzcGxheUlucHV0T2JqZWN0Lmludm9pY2VUVFByaWNlLFxuICB0dmFWYWx1ZTogZGlzcGxheUlucHV0T2JqZWN0LnR2YVZhbHVlLFxuICBsYW5ndWU6IGRpc3BsYXlJbnB1dE9iamVjdC5sYW5ndWUsXG4gIGRldmlzZTogZGlzcGxheUlucHV0T2JqZWN0LmRldmlzZSxcbiAgYnV5ZXI6IGRpc3BsYXlJbnB1dE9iamVjdC5idXllcixcbiAgc2VsbGVyOiBkaXNwbGF5SW5wdXRPYmplY3Quc2VsbGVyLFxuICBjb21tYW5kZXM6IGRpc3BsYXlJbnB1dE9iamVjdC5jb21tYW5kZXMsXG4gIHBheW1lbnRzOiBkaXNwbGF5SW5wdXRPYmplY3QucGF5bWVudHMsXG4gIGFjdGlvbnM6IHtcbiAgICBsYWJlbDogdCgnZm9ybXMuaGVhZFRhYmxlLmFjdGlvbicpLFxuICAgIG5hbWU6ICdhY3Rpb25zJyxcbiAgICBoZWFkOiB0KCdmb3Jtcy5oZWFkVGFibGUuYWN0aW9uJyksXG4gICAgcGxhY2Vob2xkZXJzOiAnJyxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG59O1xuY29uc3QgYWRtaW5Qcm9wUmVmID0gcmVmKHByb3BzLmFkbWluKTtcbmNvbnN0IGRpc3BsYXlQcm9wUmVmID0gcmVmKHByb3BzLmRpc3BsYXkpO1xuY29uc3QgaXNGb3JtID0gcmVmKHByb3BzLm9yZGVyRm9ybSk7XG5jb25zdCBtZXNzYWdlVmlzaWJpbGl0eSA9IHJlZihmYWxzZSk7XG5jb25zdCBpbnZvaWNlSWQgPSByZWYoMCk7XG5jb25zdCBkYXRlID0gcmVmKG51bGwpO1xuY29uc3QgaW52b2ljZUhUUHJpY2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSAwLFxuICAgIGludCA9IDA7XG4gIGlmIChjb21tYW5kZXMudmFsdWUgIT09IG51bGwpe1xuICAgIGZvciAoY29uc3QgayBpbiBjb21tYW5kZXMudmFsdWUpIHtcbiAgICAgIGludCArPSBjb21tYW5kZXMudmFsdWVba10ucHJpY2VIdDtcbiAgICB9XG4gIH1cbiAgaWYgKGludCAmJiAoISFkZXZpc2UudmFsdWUgJiYgZGV2aXNlLnZhbHVlLnZhbHVlICE9IDApKSB7XG4gICAgcmV0ID0gY29udmVydEFtb3VudChpbnQsIGRldmlzZS52YWx1ZS5saWJlbGxlLCBnZXRDb252ZXJ0RnVuYygpKTtcbiAgfVxuICByZXR1cm4gcmV0LnRvRml4ZWQoMik7XG59KTtcbmNvbnN0IGludm9pY2VUVFByaWNlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gMC4wO1xuICBpZiAoISF0dmFWYWx1ZS52YWx1ZSl7XG4gICAgcmV0ID0gcGFyc2VGbG9hdChpbnZvaWNlSFRQcmljZS52YWx1ZSkgKiAoMSArICgxICogcGFyc2VGbG9hdCh0dmFWYWx1ZS52YWx1ZSkpKTtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBwYXJzZUZsb2F0KGludm9pY2VIVFByaWNlLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmV0LnRvRml4ZWQoMik7XG59KTtcbmNvbnN0IG1heFZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gMCxcbiAgICBpbnQgPSAwO1xuICBpZiAoY29tbWFuZGVzLnZhbHVlICE9PSBudWxsKXtcbiAgICBmb3IgKGNvbnN0IGsgaW4gY29tbWFuZGVzLnZhbHVlKSB7XG4gICAgICBpbnQgKz0gY29tbWFuZGVzLnZhbHVlW2tdLnByaWNlSHQ7XG4gICAgfVxuICB9XG4gIGlmIChpbnQgJiYgKCEhZGV2aXNlLnZhbHVlICYmIGRldmlzZS52YWx1ZS52YWx1ZSAhPSAwKSkge1xuICAgIHJldCA9IGNvbnZlcnRBbW91bnQoaW50LCBkZXZpc2UudmFsdWUubGliZWxsZSwgZ2V0Q29udmVydEZ1bmMoKSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgbGFuZ3VhZ2UgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RMYW5ndWFnZXNPcHRpb24gPSByZWYoW10pO1xuY29uc3QgZGV2aXNlID0gcmVmKG51bGwpO1xuY29uc3Qgc2VsZWN0RGV2aXNlc09wdGlvbiA9IHJlZihbXSk7XG5jb25zdCB0dmFWYWx1ZSA9IHJlZihudWxsKTtcbmNvbnN0IGJ1eWVyID0gcmVmKG51bGwpO1xuY29uc3Qgc2VsZWN0QnV5ZXJzT3B0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoc2VsbGVyLnZhbHVlICE9PSBudWxsICYmIGFsbEJ1eWVycy52YWx1ZS5sZW5ndGgpIHtcbiAgICBmb3IgKGNvbnN0IGsgaW4gYWxsQnV5ZXJzLnZhbHVlKSB7XG4gICAgICBpZiAoYWxsQnV5ZXJzLnZhbHVlW2tdLmFjdG9ySWQgPT09IHNlbGxlci52YWx1ZS5hY3RvcklkICYmIGFsbEJ1eWVycy52YWx1ZVtrXS5hY3RvcklkKSB7XG4gICAgICAgIHVwZGF0ZVNlbGVjdChrLCB0cnVlLCAnYnV5ZXInKTtcbiAgICAgICAgLy8gYWxsQnV5ZXJzLnZhbHVlW2tdLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWxsQnV5ZXJzLnZhbHVlW2tdLmFjdG9ySWQpe1xuICAgICAgICAgIC8vIGFsbEJ1eWVycy52YWx1ZVtrXS5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICB1cGRhdGVTZWxlY3QoaywgZmFsc2UsICdidXllcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhbGxCdXllcnMudmFsdWU7XG59KTtcbmNvbnN0IGFsbEJ1eWVycyA9IHJlZihbXSk7XG5jb25zdCBzZWxsZXIgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RTZWxsZXJzT3B0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoYnV5ZXIudmFsdWUgIT09IG51bGwgJiYgYWxsU2VsbGVycy52YWx1ZS5sZW5ndGgpIHtcbiAgICBmb3IgKGNvbnN0IGsgaW4gYWxsU2VsbGVycy52YWx1ZSkge1xuICAgICAgaWYgKGFsbFNlbGxlcnMudmFsdWVba10uYWN0b3JJZCA9PT0gYnV5ZXIudmFsdWUuYWN0b3JJZCAmJiBhbGxTZWxsZXJzLnZhbHVlW2tdLmFjdG9ySWQpIHtcbiAgICAgICAgdXBkYXRlU2VsZWN0KGssIHRydWUsICdzZWxsZXInKTtcbiAgICAgICAgLy8gYWxsU2VsbGVycy52YWx1ZVtrXS5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFsbFNlbGxlcnMudmFsdWVba10uYWN0b3JJZCl7XG4gICAgICAgICAgdXBkYXRlU2VsZWN0KGssIGZhbHNlLCAnc2VsbGVyJyk7XG4gICAgICAgICAgLy8gYWxsU2VsbGVycy52YWx1ZVtrXS5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYWxsU2VsbGVycy52YWx1ZTtcbn0pO1xuY29uc3QgYWxsU2VsbGVycyA9IHJlZihbXSk7XG5jb25zdCBjb21tYW5kZXMgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RPcmRlcnNPcHRpb24gPSByZWYoW10pO1xuY29uc3QgcGF5bWVudHMgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RQYXltZW50c09wdGlvbiA9IHJlZihbXSk7XG5jb25zdCB1c2VySWQgPSByZWYoMCk7XG5jb25zdCBmb3JtU3RhdGU6IEZvcm1TdGF0ZSA9IHtcbiAgdXBkYXRlOiBmYWxzZSxcbiAgYWRkOiB0cnVlLFxufTtcbmNvbnN0IGRlZmF1bHRSb3c6IFJlZjxEZWZhdWx0SW52b2ljZVJvd1tdPiA9IHJlZihbXSk7XG5jb25zdCBub25FbXB0eURhdGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhIWRhdGUudmFsdWUgJiYgZGF0ZS52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3QgdmFsaWREYXRlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBkYXRlUmVmID0gbmV3IERhdGUoZGF0ZS52YWx1ZSk7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGlmIChmb3JtU3RhdGUuYWRkKVxuICAgIHJldHVybiBkYXRlUmVmID49IG5ldyBEYXRlKGAke25vdy5nZXRNb250aCgpICsgMX0tJHtub3cuZ2V0RGF0ZSgpfS0ke25vdy5nZXRGdWxsWWVhcigpfSAwMDowMDowMGApO1xuICBlbHNlXG4gICAgcmV0dXJuIHRydWU7XG59KTtcbmNvbnN0IG5vbkVtcHR5SW52b2ljZUhUUHJpY2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoISFpbnZvaWNlSFRQcmljZS52YWx1ZSAmJiBpbnZvaWNlSFRQcmljZS52YWx1ZSAhPSAwKTtcbn0pO1xuY29uc3QgdmFsaWRJbnZvaWNlSFRQcmljZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQoaW52b2ljZUhUUHJpY2UudmFsdWUpIDw9IG1heFZhbHVlLnZhbHVlO1xufSk7XG5jb25zdCBub25FbXB0eUxhbmd1YWdlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gKCEhbGFuZ3VhZ2UudmFsdWUgJiYgbGFuZ3VhZ2UudmFsdWUudmFsdWUgIT0gMCk7XG59KTtcbmNvbnN0IG5vbkVtcHR5RGV2aXNlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gKCEhZGV2aXNlLnZhbHVlICYmIGRldmlzZS52YWx1ZS52YWx1ZSAhPSAwKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlUVkEgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoISF0dmFWYWx1ZS52YWx1ZSAmJiBwYXJzZUZsb2F0KHR2YVZhbHVlLnZhbHVlKSAhPSAwKTtcbn0pO1xuY29uc3QgdmFsaWRUVkEgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHR2YVZhbHVlLnZhbHVlKSA+IDAgJiYgcGFyc2VGbG9hdCh0dmFWYWx1ZS52YWx1ZSkgPD0gMTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlCdXllciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICghIWJ1eWVyLnZhbHVlICYmIGJ1eWVyLnZhbHVlLnZhbHVlICE9IDApO1xufSk7XG5jb25zdCBub25FbXB0eVNlbGxlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICghIXNlbGxlci52YWx1ZSAmJiBzZWxsZXIudmFsdWUudmFsdWUgIT0gMCk7XG59KTtcbmNvbnN0IG5vbkVtcHR5Q29tbWFuZGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gKCEhY29tbWFuZGVzLnZhbHVlICYmIGNvbW1hbmRlcy52YWx1ZS5sZW5ndGggPiAwKTtcbn0pO1xuY29uc3QgdmFsaWRQYXltZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IHZhbCA9IDA7XG4gIGlmIChwYXltZW50cy52YWx1ZSAhPT0gbnVsbCl7ICBcbiAgICBmb3IgKGNvbnN0IGsgaW4gcGF5bWVudHMudmFsdWUpIHtcbiAgICAgIHZhbCArPSBwYXltZW50cy52YWx1ZVtrXS5wYXltZW50VmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJzZUZsb2F0KGludm9pY2VUVFByaWNlLnZhbHVlKSA+PSB2YWw7XG59KTtcbmNvbnN0IGZvcm1TdWJtaXRCdXR0b25TdGF0ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0MSA9ICEobm9uRW1wdHlEYXRlLnZhbHVlICYmIG5vbkVtcHR5SW52b2ljZUhUUHJpY2UudmFsdWUgJiYgbm9uRW1wdHlMYW5ndWFnZS52YWx1ZSAmJiBub25FbXB0eURldmlzZS52YWx1ZSAmJiBub25FbXB0eVRWQS52YWx1ZSAmJiBub25FbXB0eUJ1eWVyLnZhbHVlICYmIG5vbkVtcHR5U2VsbGVyLnZhbHVlICYmIG5vbkVtcHR5Q29tbWFuZGVzLnZhbHVlKTtcbiAgY29uc3QgcmV0MiA9ICEodmFsaWREYXRlLnZhbHVlICYmIHZhbGlkSW52b2ljZUhUUHJpY2UudmFsdWUgJiYgdmFsaWRUVkEudmFsdWUgJiYgdmFsaWRQYXltZW50cy52YWx1ZSk7XG4gIC8vIGNvbnNvbGUubG9nKHJldDEpO1xuICAvLyBjb25zb2xlLmxvZyhyZXQyKTtcbiAgcmV0dXJuIHJldDEgfHwgcmV0Mjtcbn0pO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmICghIW9yaWVudGF0aW9uLnZhbHVlKXtcbiAgICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5sZXQgbWVzc2FnZVN0b3JlID0gbnVsbCwgXG4gIGludm9pY2VTdG9yZSA9IG51bGwsIFxuICBwcmVmcyA9IG51bGwsIFxuICB1c2VyU3RvcmUgPSBudWxsLFxuICBjb3VudGVyU3RvcmUgPSBudWxsLFxuICBjb3VudGVyID0gbnVsbCwgXG4gIHVzZXIgPSBudWxsO1xuXG4vLyBERUNMQVJBVElPTlNcbmlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gIG1lc3NhZ2VTdG9yZSA9IHVzZU1lc3NhZ2VTdG9yZSgpO1xuICBpbnZvaWNlU3RvcmUgPSB1c2VJbnZvaWNlU3RvcmUoKTtcbiAgdXNlclN0b3JlID0gdXNlVXNlclN0b3JlKCk7XG4gIGNvdW50ZXJTdG9yZSA9IHVzZUNvdW50ZXJTdG9yZSgpO1xuICB1c2VySWQudmFsdWUgPSB1c2VyU3RvcmUuZ2V0VXNlci51c2VySWQ7XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gbWVzc2FnZVN0b3JlLmdldE1lc3NhZ2VzVmlzaWJpbGl0eTtcbn0gZWxzZSB7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBoYW5kbGVPcmllbnRhdGlvbik7XG4gIChhc3luYyAoKSA9PiB7XG4gICAgcHJlZnMgPSBhd2FpdCBpbXBvcnQoJ2NhcC9zdG9yYWdlL3ByZWZlcmVuY2VzJyk7XG4gICAgY29uc3QgdXNyID0gYXdhaXQgcHJlZnMuZ2V0UHJlZigndXNlcicpO1xuICAgIGNvbnN0IG1lc3MgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdtZXNzYWdlJyk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdjb3VudGVyJyk7XG4gICAgY291bnRlciA9ICEhY291bnQgPyBjb3VudCA6IGNvdW50ZXI7XG4gICAgdXNlciA9ICEhdXNyID8gdXNyLnVzZXIgOiB1c2VyO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lc3MpO1xuICAgIHVzZXJJZC52YWx1ZSA9ICEhdXNyID8gdXNyLnVzZXIudXNlcklkIDogMDtcbiAgICBjb25zdCBtZXNzYWdlcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXMgOiBbXTtcbiAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgY29uc3QgdmlzID0gISFtZXNzID8gbWVzcy5tZXNzYWdlc1Zpc2liaWxpdHkgOiBtZXNzO1xuICAgIC8vIGNvbnNvbGUubG9nKHZpcyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCAmJiB2aXMgPT09IG51bGwpIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB2aXMgIT09IG51bGwgPyB2aXMgOiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG59XG5cbi8vIEZVTkNUSU9OU1xuZnVuY3Rpb24gdXBkYXRlU2VsZWN0KGluZDogbnVtYmVyLCB2YWw6IGJvb2xlYW4sIHR5cGU6IHN0cmluZyl7XG4gIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlICdidXllcic6XG4gICAgICBhbGxCdXllcnMudmFsdWVbaW5kXS5jYW5ub3RTZWxlY3QgPSB2YWw7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzZWxsZXInOlxuICAgICAgYWxsU2VsbGVycy52YWx1ZVtpbmRdLmNhbm5vdFNlbGVjdCA9IHZhbDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlVGFibGVSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG4gIGF3YWl0IG5leHRUaWNrKCk7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KG9iajogYW55KSB7XG4gIC8vIGlmIChfX0tFWV9fID09PSBudWxsKSB7XG4gIC8vICAgYXdhaXQgc2V0R2VuQXBpKCk7XG4gIC8vIH1cbiAgYXdhaXQgc2V0Q3J5cHRBcGkoKTtcbiAgX19GT1JNQVRPQkpfXyhvYmosIGtleSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhc0ZvckZvcm1zKCkge1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgIGF3YWl0IGNvdW50ZXJTdG9yZS5nZXRBbGxQcmljZXMoKTtcbiAgICBsZXQgb2JqID0ge307XG4gICAgc2VsZWN0TGFuZ3VhZ2VzT3B0aW9uLnZhbHVlID0gW107XG4gICAgb2JqLnZhbHVlID0gMDtcbiAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMubGFuZ3VhZ2UnKTtcbiAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICBvYmoubGFuZ3VlSWQgPSAwO1xuICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICBvYmoubm9tID0gbnVsbDtcbiAgICBzZWxlY3RMYW5ndWFnZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgIGludm9pY2VTdG9yZS5nZXRBbGxMYW5ndWFnZXMoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLmxhbmd1ZUlkO1xuICAgICAgICAgIG9iai5sYWJlbCA9IHJlc1trXS5saWJlbGxlO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoubGFuZ3VlSWQgPSByZXNba10ubGFuZ3VlSWQ7XG4gICAgICAgICAgb2JqLmxpYmVsbGUgPSByZXNba10ubGliZWxsZTtcbiAgICAgICAgICBvYmoubm9tID0gcmVzW2tdLm5vbTtcbiAgICAgICAgICBzZWxlY3RMYW5ndWFnZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2xhbmd1YWdlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2xhbmd1YWdlcy5saW5rZWRfZXJyb3InLCB7ZXJyOiBlcnJ9KVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIG9iaiA9IHt9O1xuICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgIG9iai5sYWJlbCA9IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5kZXZpc2UnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmRldmlzZUlkID0gMDtcbiAgICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICAgIG9iai5zeW1ib2xlID0gbnVsbDtcbiAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgaW52b2ljZVN0b3JlLmdldEFsbERldmlzZXMoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLmRldmlzZUlkO1xuICAgICAgICAgIG9iai5sYWJlbCA9IGAke3Jlc1trXS5zeW1ib2xlfSAtICR7cmVzW2tdLmxpYmVsbGV9YDtcbiAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgb2JqLmRldmlzZUlkID0gcmVzW2tdLmRldmlzZUlkO1xuICAgICAgICAgIG9iai5saWJlbGxlID0gcmVzW2tdLmxpYmVsbGU7XG4gICAgICAgICAgb2JqLnN5bWJvbGUgPSByZXNba10uc3ltYm9sZTtcbiAgICAgICAgICBzZWxlY3REZXZpc2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9kZXZpc2VzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfZGV2aXNlcy5saW5rZWRfZXJyb3InLCB7ZXJyOiBlcnJ9KVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIG9iaiA9IHt9O1xuICAgICAgYWxsQnV5ZXJzLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmJ1eWVyJyk7XG4gICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgIG9iai5hY3RvcklkID0gMDtcbiAgICAgIG9iai5jcCA9IG51bGw7XG4gICAgICBvYmouZW1haWwgPSBudWxsO1xuICAgICAgb2JqLm5vbSA9IG51bGw7XG4gICAgICBvYmoucHJlbm9tID0gbnVsbDtcbiAgICAgIG9iai5ub21SdWUgPSBudWxsO1xuICAgICAgb2JqLm51bVJ1ZSA9IG51bGw7XG4gICAgICBvYmoudGVsID0gbnVsbDtcbiAgICAgIG9iai5hY3RvclR5cGVJZCA9IDA7XG4gICAgICBvYmoudmlsbGUgPSBudWxsO1xuICAgICAgb2JqLm51bUNvbW1lcmNhbnQgPSBudWxsO1xuICAgICAgYWxsQnV5ZXJzLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgIGludm9pY2VTdG9yZS5nZXRBbGxCdXllcnMoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLmFjdG9ySWQ7XG4gICAgICAgICAgb2JqLmxhYmVsID0gYCR7cmVzW2tdLnByZW5vbX0gJHtyZXNba10ubm9tfSAtICR7cmVzW2tdLmVtYWlsfWA7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai5hY3RvcklkID0gcmVzW2tdLmFjdG9ySWQ7XG4gICAgICAgICAgb2JqLmNwID0gcmVzW2tdLmNwO1xuICAgICAgICAgIG9iai5lbWFpbCA9IHJlc1trXS5lbWFpbDtcbiAgICAgICAgICBvYmoubm9tID0gcmVzW2tdLm5vbTtcbiAgICAgICAgICBvYmoucHJlbm9tID0gcmVzW2tdLnByZW5vbTtcbiAgICAgICAgICBvYmoubm9tUnVlID0gcmVzW2tdLm5vbVJ1ZTtcbiAgICAgICAgICBvYmoubnVtUnVlID0gcmVzW2tdLm51bVJ1ZTtcbiAgICAgICAgICBvYmoudGVsID0gcmVzW2tdLnRlbDtcbiAgICAgICAgICBvYmouYWN0b3JUeXBlSWQgPSByZXNba10uYWN0b3JUeXBlSWQ7XG4gICAgICAgICAgb2JqLnZpbGxlID0gcmVzW2tdLnZpbGxlO1xuICAgICAgICAgIG9iai5udW1Db21tZXJjYW50ID0gcmVzW2tdLm51bUNvbW1lcmNhbnQ7XG4gICAgICAgICAgYWxsQnV5ZXJzLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9idXllcnMubGlua2VkX2VtcHR5JylcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9idXllcnMubGlua2VkX2Vycm9yJywge2VycjogZXJyfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBvYmogPSB7fTtcbiAgICAgIGFsbFNlbGxlcnMudmFsdWUgPSBbXTtcbiAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuc2VsbGVyJyk7XG4gICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgIG9iai5hY3RvcklkID0gMDtcbiAgICAgIG9iai5jcCA9IG51bGw7XG4gICAgICBvYmouZW1haWwgPSBudWxsO1xuICAgICAgb2JqLm5vbSA9IG51bGw7XG4gICAgICBvYmoucHJlbm9tID0gbnVsbDtcbiAgICAgIG9iai5ub21SdWUgPSBudWxsO1xuICAgICAgb2JqLm51bVJ1ZSA9IG51bGw7XG4gICAgICBvYmoudGVsID0gbnVsbDtcbiAgICAgIG9iai5hY3RvclR5cGVJZCA9IDA7XG4gICAgICBvYmoudmlsbGUgPSBudWxsO1xuICAgICAgb2JqLm51bUNvbW1lcmNhbnQgPSBudWxsO1xuICAgICAgYWxsU2VsbGVycy52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBpbnZvaWNlU3RvcmUuZ2V0QWxsU2VsbGVycygpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uYWN0b3JJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10ucHJlbm9tfSAke3Jlc1trXS5ub219IC0gJHtyZXNba10uZW1haWx9YDtcbiAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgb2JqLmFjdG9ySWQgPSByZXNba10uYWN0b3JJZDtcbiAgICAgICAgICBvYmouY3AgPSByZXNba10uY3A7XG4gICAgICAgICAgb2JqLmVtYWlsID0gcmVzW2tdLmVtYWlsO1xuICAgICAgICAgIG9iai5ub20gPSByZXNba10ubm9tO1xuICAgICAgICAgIG9iai5wcmVub20gPSByZXNba10ucHJlbm9tO1xuICAgICAgICAgIG9iai5ub21SdWUgPSByZXNba10ubm9tUnVlO1xuICAgICAgICAgIG9iai5udW1SdWUgPSByZXNba10ubnVtUnVlO1xuICAgICAgICAgIG9iai50ZWwgPSByZXNba10udGVsO1xuICAgICAgICAgIG9iai5hY3RvclR5cGVJZCA9IHJlc1trXS5hY3RvclR5cGVJZDtcbiAgICAgICAgICBvYmoudmlsbGUgPSByZXNba10udmlsbGU7XG4gICAgICAgICAgb2JqLm51bUNvbW1lcmNhbnQgPSByZXNba10ubnVtQ29tbWVyY2FudDtcbiAgICAgICAgICBhbGxTZWxsZXJzLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9zZWxsZXJzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfc2VsbGVycy5saW5rZWRfZXJyb3InLCB7ZXJyOiBlcnJ9KVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIG9iaiA9IHt9O1xuICAgICAgc2VsZWN0T3JkZXJzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmNvbW1hbmRlJyk7XG4gICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgIG9iai5vcmRlcklkID0gMDtcbiAgICAgIG9iai5jb250ZW51QWRkaXRpb25uZWwgPSBudWxsO1xuICAgICAgb2JqLnByaWNlSHQgPSAwO1xuICAgICAgb2JqLmZhY3R1cmVJZCA9IDA7XG4gICAgICBzZWxlY3RPcmRlcnNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgaW52b2ljZVN0b3JlLmdldEFsbE9yZGVycygpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10ub3JkZXJJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10ub3JkZXJJZH0gLSAke3Jlc1trXS5wcmljZUh0fWA7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai5vcmRlcklkID0gcmVzW2tdLmFjdG9ySWQ7XG4gICAgICAgICAgb2JqLmNvbnRlbnVBZGRpdGlvbm5lbCA9IHJlc1trXS5jb250ZW51QWRkaXRpb25uZWw7XG4gICAgICAgICAgb2JqLnByaWNlSHQgPSByZXNba10ucHJpY2VIdDtcbiAgICAgICAgICBvYmouZmFjdHVyZUlkID0gcmVzW2tdLmZhY3R1cmVJZDtcbiAgICAgICAgICBzZWxlY3RPcmRlcnNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX29yZGVyLmxpbmtlZF9lbXB0eScpXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfb3JkZXIubGlua2VkX2Vycm9yJywge2VycjogZXJyfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBvYmogPSB7fTtcbiAgICAgIHNlbGVjdFBheW1lbnRzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnBheW1lbnQnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLnBheW1lbnRJZCA9IDA7XG4gICAgICBvYmouZXRhdCA9IC0xO1xuICAgICAgb2JqLnBheW1lbnRWYWx1ZSA9IDA7XG4gICAgICBvYmoucGF5bWVudFR5cGUgPSAwO1xuICAgICAgb2JqLmZhY3R1cmVJZCA9IDA7XG4gICAgICBzZWxlY3RQYXltZW50c09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBpbnZvaWNlU3RvcmUuZ2V0QWxsUGF5bWVudHMoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLnBheW1lbnRJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10ucGF5bWVudElkfSAtICR7cmVzW2tdLnBheW1lbnRWYWx1ZX1gO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoucGF5bWVudElkID0gcmVzW2tdLnBheW1lbnRJZDtcbiAgICAgICAgICBvYmouZXRhdCA9IHJlc1trXS5ldGF0O1xuICAgICAgICAgIG9iai5wYXltZW50VmFsdWUgPSByZXNba10ucGF5bWVudFZhbHVlO1xuICAgICAgICAgIG9iai5wYXltZW50VHlwZSA9IHJlc1trXS5wYXltZW50VHlwZTtcbiAgICAgICAgICBvYmouZmFjdHVyZUlkID0gcmVzW2tdLmZhY3R1cmVJZDtcbiAgICAgICAgICBzZWxlY3RQYXltZW50c09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3BheW1lbnRzLmxpbmtlZF9lcnJvcicsIHtlcnI6IGVycn0pXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICBsZXQgbmV3Q291bnRlciA9IG51bGw7XG4gICAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICAgIGlzT3BlbiA9ICFpc09wZW4gfHwgISFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgbGV0IHNxbCA9ICdTRUxFQ1QgXFxgc3RvY2tQcmljZXNJZFxcYCwgXFxgZXVyb1xcYCwgXFxgZG9sbGFyXFxgLCBcXGBsaXZyZVxcYCBGUk9NIFxcYHN0b2NrX3ByaWNlc1xcYCBBUyBcXGBzdG9ja19wcmljZXNcXGA7JztcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgICBsZXQgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgIGlmICghIXZhbHVlcyAmJiB2YWx1ZXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICBuZXdDb3VudGVyID0gISFjb3VudGVyID8gY291bnRlciA6IHt9O1xuICAgICAgICBuZXdDb3VudGVyLnByaWNlcyA9IHZhbHVlcy52YWx1ZXM7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3Q291bnRlciA9ICEhY291bnRlciA/IGNvdW50ZXIgOiB7fTtcbiAgICAgICAgbmV3Q291bnRlci5wcmljZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ2NvdW50ZXInLCBuZXdDb3VudGVyLCBmYWxzZSk7XG4gICAgICBjb3VudGVyID0gbmV3Q291bnRlcjtcblxuICAgICAgc3FsID0gJ1NFTEVDVCBcXGBsYW5ndWVcXGAuXFxgbGFuZ3VlSWRcXGAsIFxcYGxhbmd1ZVxcYC5cXGBsaWJlbGxlXFxgLCBcXGBsYW5ndWVcXGAuXFxgbm9tXFxgIEZST00gXFxgbGFuZ3VlXFxgOyc7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCBuZXdRdWVyeShwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgICBsZXQgb2JqID0ge307XG4gICAgICBzZWxlY3RMYW5ndWFnZXNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMubGFuZ3VhZ2UnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmxhbmd1ZUlkID0gMDtcbiAgICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICAgIG9iai5ub20gPSBudWxsO1xuICAgICAgc2VsZWN0TGFuZ3VhZ2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgIGlmICghIXZhbHVlcyAmJiB2YWx1ZXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAvLyBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgIGNvbnN0IHJlcyA9IHZhbHVlcy52YWx1ZXM7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10ubGFuZ3VlSWQ7XG4gICAgICAgICAgb2JqLmxhYmVsID0gcmVzW2tdLmxpYmVsbGU7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai5sYW5ndWVJZCA9IHJlc1trXS5sYW5ndWVJZDtcbiAgICAgICAgICBvYmoubGliZWxsZSA9IHJlc1trXS5saWJlbGxlO1xuICAgICAgICAgIG9iai5ub20gPSByZXNba10ubm9tO1xuICAgICAgICAgIHNlbGVjdExhbmd1YWdlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgICBlbHNlIGlmKCEhdmFsdWVzID09PSBmYWxzZSl7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfbGFuZ3VhZ2VzLmxpbmtlZF9lcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlc1Zpc2liaWxpdHk6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2xhbmd1YWdlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNxbCA9ICdTRUxFQ1QgXFxgZGV2aXNlXFxgLlxcYGRldmlzZUlkXFxgLCBcXGBkZXZpc2VcXGAuXFxgc3ltYm9sZVxcYCwgXFxgZGV2aXNlXFxgLlxcYGxpYmVsbGVcXGAgRlJPTSBcXGBkZXZpc2VcXGA7JztcbiAgICAgIHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIG9iaiA9IHt9O1xuICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgIG9iai5sYWJlbCA9IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5kZXZpc2UnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmRldmlzZUlkID0gMDtcbiAgICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICAgIG9iai5zeW1ib2xlID0gbnVsbDtcbiAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgaWYgKCEhdmFsdWVzICYmIHZhbHVlcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgY29uc3QgcmVzID0gdmFsdWVzLnZhbHVlcztcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS5kZXZpc2VJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10uc3ltYm9sZX0gLSAke3Jlc1trXS5saWJlbGxlfWA7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai5kZXZpc2VJZCA9IHJlc1trXS5kZXZpc2VJZDtcbiAgICAgICAgICBvYmoubGliZWxsZSA9IHJlc1trXS5saWJlbGxlO1xuICAgICAgICAgIG9iai5zeW1ib2xlID0gcmVzW2tdLnN5bWJvbGU7XG4gICAgICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCEhdmFsdWVzID09PSBmYWxzZSl7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfZGV2aXNlcy5saW5rZWRfZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2RldmlzZXMubGlua2VkX2VtcHR5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNxbCA9IGBTRUxFQ1QgXFxgcGVyc29ubmVcXGAuXFxgYWN0b3JJZFxcYCwgXFxgcGVyc29ubmVcXGAuXFxgY3BcXGAsIFxcYHBlcnNvbm5lXFxgLlxcYGVtYWlsXFxgLFxuICAgICAgXFxgcGVyc29ubmVcXGAuXFxgbm9tXFxgLCBcXGBwZXJzb25uZVxcYC5cXGBub21SdWVcXGAsIFxcYHBlcnNvbm5lXFxgLlxcYG51bVJ1ZVxcYCwgXFxgcGVyc29ubmVcXGAuXFxgbnVtQ29tbWVyY2FudFxcYCwgXFxgcGVyc29ubmVcXGAuXFxgcHJlbm9tXFxgLCBcXGBwZXJzb25uZVxcYC5cXGB0ZWxcXGAsIFxcYHBlcnNvbm5lXFxgLlxcYHZpbGxlXFxgLCBcXGBwZXJzb25uZVxcYC5cXGBhY3RvclR5cGVJZFxcYCBGUk9NIFxcYHBlcnNvbm5lXFxgIFdIRVJFIFxcYHBlcnNvbm5lXFxgLlxcYGFjdG9yVHlwZUlkXFxgIElOICgxLCAzKTtgO1xuICAgICAgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgb2JqID0ge307XG4gICAgICBhbGxCdXllcnMudmFsdWUgPSBbXTtcbiAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuYnV5ZXInKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmFjdG9ySWQgPSAwO1xuICAgICAgb2JqLmNwID0gbnVsbDtcbiAgICAgIG9iai5lbWFpbCA9IG51bGw7XG4gICAgICBvYmoubm9tID0gbnVsbDtcbiAgICAgIG9iai5wcmVub20gPSBudWxsO1xuICAgICAgb2JqLm5vbVJ1ZSA9IG51bGw7XG4gICAgICBvYmoubnVtUnVlID0gbnVsbDtcbiAgICAgIG9iai50ZWwgPSBudWxsO1xuICAgICAgb2JqLmFjdG9yVHlwZUlkID0gMDtcbiAgICAgIG9iai52aWxsZSA9IG51bGw7XG4gICAgICBvYmoubnVtQ29tbWVyY2FudCA9IG51bGw7XG4gICAgICBhbGxCdXllcnMudmFsdWUucHVzaChvYmopO1xuICAgICAgaWYgKCEhdmFsdWVzICYmIHZhbHVlcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS5hY3RvcklkO1xuICAgICAgICAgIG9iai5sYWJlbCA9IGAke3Jlc1trXS5wcmVub219ICR7cmVzW2tdLm5vbX0gLSAke3Jlc1trXS5lbWFpbH1gO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmouYWN0b3JJZCA9IHJlc1trXS5hY3RvcklkO1xuICAgICAgICAgIG9iai5jcCA9IHJlc1trXS5jcDtcbiAgICAgICAgICBvYmouZW1haWwgPSByZXNba10uZW1haWw7XG4gICAgICAgICAgb2JqLm5vbSA9IHJlc1trXS5ub207XG4gICAgICAgICAgb2JqLnByZW5vbSA9IHJlc1trXS5wcmVub207XG4gICAgICAgICAgb2JqLm5vbVJ1ZSA9IHJlc1trXS5ub21SdWU7XG4gICAgICAgICAgb2JqLm51bVJ1ZSA9IHJlc1trXS5udW1SdWU7XG4gICAgICAgICAgb2JqLnRlbCA9IHJlc1trXS50ZWw7XG4gICAgICAgICAgb2JqLmFjdG9yVHlwZUlkID0gcmVzW2tdLmFjdG9yVHlwZUlkO1xuICAgICAgICAgIG9iai52aWxsZSA9IHJlc1trXS52aWxsZTtcbiAgICAgICAgICBvYmoubnVtQ29tbWVyY2FudCA9IHJlc1trXS5udW1Db21tZXJjYW50O1xuICAgICAgICAgIGFsbEJ1eWVycy52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoISF2YWx1ZXMgPT09IGZhbHNlKXtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlcyA6W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9idXllcnMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXMgOltcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfYnV5ZXJzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgc3FsID0gYFNFTEVDVCBcXGBwZXJzb25uZVxcYC5cXGBhY3RvcklkXFxgLCBcXGBwZXJzb25uZVxcYC5cXGBjcFxcYCwgXFxgcGVyc29ubmVcXGAuXFxgZW1haWxcXGAsXG4gICAgICBcXGBwZXJzb25uZVxcYC5cXGBub21cXGAsIFxcYHBlcnNvbm5lXFxgLlxcYG5vbVJ1ZVxcYCwgXFxgcGVyc29ubmVcXGAuXFxgbnVtUnVlXFxgLCBcXGBwZXJzb25uZVxcYC5cXGBudW1Db21tZXJjYW50XFxgLCBcXGBwZXJzb25uZVxcYC5cXGBwcmVub21cXGAsIFxcYHBlcnNvbm5lXFxgLlxcYHRlbFxcYCwgXFxgcGVyc29ubmVcXGAuXFxgdmlsbGVcXGAsIFxcYHBlcnNvbm5lXFxgLlxcYGFjdG9yVHlwZUlkXFxgIEZST00gXFxgcGVyc29ubmVcXGAgV0hFUkUgXFxgcGVyc29ubmVcXGAuXFxgYWN0b3JUeXBlSWRcXGAgSU4gKDEsMik7YDtcbiAgICAgIHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIG9iaiA9IHt9O1xuICAgICAgYWxsU2VsbGVycy52YWx1ZSA9IFtdO1xuICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgIG9iai5sYWJlbCA9IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5zZWxsZXInKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmFjdG9ySWQgPSAwO1xuICAgICAgb2JqLmNwID0gbnVsbDtcbiAgICAgIG9iai5lbWFpbCA9IG51bGw7XG4gICAgICBvYmoubm9tID0gbnVsbDtcbiAgICAgIG9iai5wcmVub20gPSBudWxsO1xuICAgICAgb2JqLm5vbVJ1ZSA9IG51bGw7XG4gICAgICBvYmoubnVtUnVlID0gbnVsbDtcbiAgICAgIG9iai50ZWwgPSBudWxsO1xuICAgICAgb2JqLmFjdG9yVHlwZUlkID0gMDtcbiAgICAgIG9iai52aWxsZSA9IG51bGw7XG4gICAgICBvYmoubnVtQ29tbWVyY2FudCA9IG51bGw7XG4gICAgICBhbGxTZWxsZXJzLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgIGlmICghIXZhbHVlcyAmJiB2YWx1ZXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18odmFsdWVzLnZhbHVlcyk7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uYWN0b3JJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10ucHJlbm9tfSAke3Jlc1trXS5ub219IC0gJHtyZXNba10uZW1haWx9YDtcbiAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgb2JqLmFjdG9ySWQgPSByZXNba10uYWN0b3JJZDtcbiAgICAgICAgICBvYmouY3AgPSByZXNba10uY3A7XG4gICAgICAgICAgb2JqLmVtYWlsID0gcmVzW2tdLmVtYWlsO1xuICAgICAgICAgIG9iai5ub20gPSByZXNba10ubm9tO1xuICAgICAgICAgIG9iai5wcmVub20gPSByZXNba10ucHJlbm9tO1xuICAgICAgICAgIG9iai5ub21SdWUgPSByZXNba10ubm9tUnVlO1xuICAgICAgICAgIG9iai5udW1SdWUgPSByZXNba10ubnVtUnVlO1xuICAgICAgICAgIG9iai50ZWwgPSByZXNba10udGVsO1xuICAgICAgICAgIG9iai5hY3RvclR5cGVJZCA9IHJlc1trXS5hY3RvclR5cGVJZDtcbiAgICAgICAgICBvYmoudmlsbGUgPSByZXNba10udmlsbGU7XG4gICAgICAgICAgb2JqLm51bUNvbW1lcmNhbnQgPSByZXNba10ubnVtQ29tbWVyY2FudDtcbiAgICAgICAgICBhbGxTZWxsZXJzLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoISF2YWx1ZXMgPT09IGZhbHNlKXtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3NlbGxlcnMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9zZWxsZXJzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgc3FsID0gYFNFTEVDVCBcXGBjb21tYW5kZVxcYC5cXGBvcmRlcklkXFxgLCBcXGBjb21tYW5kZVxcYC5cXGBjb250ZW51QWRkaXRpb25uZWxcXGAsIFxcYGNvbW1hbmRlXFxgLlxcYHByaWNlSHRcXGAsXG4gICAgICBcXGBjb21tYW5kZVxcYC5cXGBmYWN0dXJlSWRcXGAgRlJPTSBcXGBjb21tYW5kZVxcYDtgO1xuICAgICAgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgb2JqID0ge307XG4gICAgICBzZWxlY3RPcmRlcnNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuY29tbWFuZGUnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLm9yZGVySWQgPSAwO1xuICAgICAgb2JqLmNvbnRlbnVBZGRpdGlvbm5lbCA9IG51bGw7XG4gICAgICBvYmoucHJpY2VIdCA9IDA7XG4gICAgICBvYmouZmFjdHVyZUlkID0gMDtcbiAgICAgIHNlbGVjdE9yZGVyc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBpZiAoISF2YWx1ZXMgJiYgdmFsdWVzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBfX1RSQU5TRk9STU9CSl9fKHZhbHVlcy52YWx1ZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLm9yZGVySWQ7XG4gICAgICAgICAgb2JqLmxhYmVsID0gYCR7cmVzW2tdLm9yZGVySWR9IC0gJHtyZXNba10ucHJpY2VIdH1gO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoub3JkZXJJZCA9IHJlc1trXS5vcmRlcklkO1xuICAgICAgICAgIG9iai5jb250ZW51QWRkaXRpb25uZWwgPSByZXNba10uY29udGVudUFkZGl0aW9ubmVsO1xuICAgICAgICAgIG9iai5wcmljZUh0ID0gcmVzW2tdLnByaWNlSHQ7XG4gICAgICAgICAgb2JqLmZhY3R1cmVJZCA9IHJlc1trXS5mYWN0dXJlSWQ7XG4gICAgICAgICAgc2VsZWN0T3JkZXJzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoISF2YWx1ZXMgPT09IGZhbHNlKXtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlcyA6W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9vcmRlcnMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlcyA6W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9vcmRlcnMubGlua2VkX2VtcHR5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzcWwgPSBgU0VMRUNUIFxcYHBheW1lbnRcXGAuXFxgcGF5bWVudElkXFxgLCBcXGBwYXltZW50XFxgLlxcYGV0YXRcXGAsIFxcYHBheW1lbnRcXGAuXFxgcGF5bWVudFZhbHVlXFxgLFxuICAgICAgXFxgcGF5bWVudFxcYC5cXGBwYXltZW50VHlwZVxcYCwgXFxgcGF5bWVudFxcYC5cXGBmYWN0dXJlSWRcXGAgRlJPTSBcXGBwYXltZW50XFxgO2A7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCBuZXdRdWVyeShwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgICBvYmogPSB7fTtcbiAgICAgIHNlbGVjdFBheW1lbnRzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnBheW1lbnQnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLnBheW1lbnRJZCA9IDA7XG4gICAgICBvYmouZXRhdCA9IC0xO1xuICAgICAgb2JqLnBheW1lbnRWYWx1ZSA9IDA7XG4gICAgICBvYmoucGF5bWVudFR5cGUgPSAwO1xuICAgICAgb2JqLmZhY3R1cmVJZCA9IDA7XG4gICAgICBzZWxlY3RQYXltZW50c09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBpZiAoISF2YWx1ZXMgJiYgdmFsdWVzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBfX1RSQU5TRk9STU9CSl9fKHZhbHVlcy52YWx1ZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLnBheW1lbnRJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10ucGF5bWVudElkfSAtICR7cmVzW2tdLnBheW1lbnRWYWx1ZX1gO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoucGF5bWVudElkID0gcmVzW2tdLnBheW1lbnRJZDtcbiAgICAgICAgICBvYmouZXRhdCA9IHJlc1trXS5ldGF0O1xuICAgICAgICAgIG9iai5wYXltZW50VmFsdWUgPSByZXNba10ucGF5bWVudFZhbHVlO1xuICAgICAgICAgIG9iai5wYXltZW50VHlwZSA9IHJlc1trXS5wYXltZW50VHlwZTtcbiAgICAgICAgICBvYmouZmFjdHVyZUlkID0gcmVzW2tdLmZhY3R1cmVJZDtcbiAgICAgICAgICBzZWxlY3RQYXltZW50c09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoISF2YWx1ZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfcGF5bWVudHMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3Iuc3FsaXRlRGInKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBhZGRDbGlja0Zyb21DaGlsZChlOiBFdmVudCwgZGI6IGJvb2xlYW4pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoIWRiKSB7XG4gICAgYXdhaXQgZmV0Y2hEYXRhc0ZvckZvcm1zKCk7XG4gICAgaW52b2ljZUlkLnZhbHVlID0gMDtcbiAgICBkYXRlLnZhbHVlID0gbnVsbDtcbiAgICAvLyBpbnZvaWNlSFRQcmljZS52YWx1ZSA9IDA7XG4gICAgLy8gaW52b2ljZVRUUHJpY2UudmFsdWUgPSAwO1xuICAgIGxhbmd1YWdlLnZhbHVlID0ge3ZhbHVlOiAwLCBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmxhbmd1YWdlJyksIGNhbm5vdFNlbGVjdDogdHJ1ZSwgbGFuZ3VlSWQ6IDAsIGxpYmVsbGU6IG51bGwsIG5vbTogbnVsbH07XG4gICAgZGV2aXNlLnZhbHVlID0ge3ZhbHVlOiAwLCBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmRldmlzZScpLCBjYW5ub3RTZWxlY3Q6IHRydWUsIGRldmlzZUlkOiAwLCBsaWJlbGxlOiBudWxsLCBzeW1ib2xlOiBudWxsfTtcbiAgICB0dmFWYWx1ZS52YWx1ZSA9IG51bGw7XG4gICAgYnV5ZXIudmFsdWUgPSB7dmFsdWU6IDAsIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuYnV5ZXInKSwgY2Fubm90U2VsZWN0OiB0cnVlLCBhY3RvcklkOiAwLCBjcDogbnVsbCwgZW1haWw6IG51bGwsIG5vbTogbnVsbCwgcHJlbm9tOiBudWxsLCBub21SdWU6IG51bGwsIG51bVJ1ZTogbnVsbCwgdGVsOiBudWxsLCBhY3RvclR5cGVJZDogMCwgdmlsbGU6IG51bGwsIG51bUNvbW1lcmNhbnQ6IG51bGx9O1xuICAgIHNlbGxlci52YWx1ZSA9IHt2YWx1ZTogMCwgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5zZWxsZXInKSwgY2Fubm90U2VsZWN0OiB0cnVlLCBhY3RvcklkOiAwLCBjcDogbnVsbCwgZW1haWw6IG51bGwsIG5vbTogbnVsbCwgcHJlbm9tOiBudWxsLCBub21SdWU6IG51bGwsIG51bVJ1ZTogbnVsbCwgdGVsOiBudWxsLCBhY3RvclR5cGVJZDogMCwgdmlsbGU6IG51bGwsIG51bUNvbW1lcmNhbnQ6IG51bGx9O1xuICAgIGNvbW1hbmRlcy52YWx1ZSA9IFtdO1xuICAgIHBheW1lbnRzLnZhbHVlID0gW107XG4gICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgIGlzRm9ybS52YWx1ZSA9IHRydWU7XG4gICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIGRlZmF1bHRSb3cudmFsdWVbMF0gPSB7XG4gICAgICBmYWN0dXJlSWQ6IDAsXG4gICAgICBkYXRlOiBudWxsLFxuICAgICAgaW52b2ljZUhUUHJpY2U6IDAsXG4gICAgICBpbnZvaWNlVFRQcmljZTogMCxcbiAgICAgIGxhbmd1YWdlOiAwLFxuICAgICAgZGV2aXNlOiAwLFxuICAgICAgdHZhVmFsdWU6IDAsXG4gICAgICBidXllcjogMCxcbiAgICAgIHNlbGxlcjogMCxcbiAgICAgIGNvbW1hbmRlczogW10sXG4gICAgICBwYXltZW50czogW10sXG4gICAgICBhY3Rpb25zOiBudWxsLFxuICAgIH07XG4gICAgYWRkSW5wdXRPYmplY3QuZGF0ZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUubG9nKCdBZGRpbmcgaW52b2ljZSB0byBkYiAhJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgICAgcmV0ID0gYXdhaXQgaW5zZXJ0SW52b2ljZUluRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMuZGlzcGxheSkge1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBhd2FpdCBpbnNlcnRJbnZvaWNlSW5TUUxpdGVEYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5kaXNwbGF5KXtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKHJldCkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQ2xpY2tGcm9tQ2hpbGQoZTogRXZlbnQsIGRiOiBib29sZWFuLCBvYmo6IGFueSA9IG51bGwpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoIWRiKSB7XG4gICAgYXdhaXQgZmV0Y2hEYXRhc0ZvckZvcm1zKCk7XG4gICAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgICBpc0Zvcm0udmFsdWUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS51cGRhdGUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS5hZGQgPSBmYWxzZTtcbiAgICBsZXQgbGFuZywgZGV2LCBidXksIHNlbCwgb3JkID0gW10sIHBheSA9IFtdLCBpbnQgPSB7fTtcbiAgICBsYW5nID0gISFvYmoubGFuZ3VlID8ge3ZhbHVlOiBvYmoubGFuZ3VlLmxhbmd1ZUlkLCBsYWJlbDogb2JqLmxhbmd1ZS5saWJlbGxlLCBjYW5ub3RTZWxlY3Q6IGZhbHNlLCBsYW5ndWVJZDogb2JqLmxhbmd1ZS5sYW5ndWVJZCwgbGliZWxsZTogb2JqLmxhbmd1ZS5saWJlbGxlLCBub206IG9iai5sYW5ndWUubm9tfSA6IHt2YWx1ZTogMCwgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5sYW5ndWFnZScpfTtcbiAgICBkZXYgPSAhIW9iai5kZXZpc2UgPyB7dmFsdWU6IG9iai5kZXZpc2UuZGV2aXNlSWQsIGxhYmVsOiBgJHtvYmouZGV2aXNlLnN5bWJvbGV9IC0gJHtvYmouZGV2aXNlLmxpYmVsbGV9YCwgY2Fubm90U2VsZWN0OiBmYWxzZSwgZGV2aXNlSWQ6IG9iai5kZXZpc2UuZGV2aXNlSWQsIGxpYmVsbGU6IG9iai5kZXZpc2UubGliZWxsZSwgc3ltYm9sZTogb2JqLmRldmlzZS5zeW1ib2xlfSA6IHt2YWx1ZTogMCwgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5kZXZpc2UnKX07XG4gICAgYnV5ID0gISFvYmouYnV5ZXIgPyB7dmFsdWU6IG9iai5idXllci5hY3RvcklkLCBsYWJlbDogYCR7b2JqLmJ1eWVyLnByZW5vbX0gJHtvYmouYnV5ZXIubm9tfSAtICR7b2JqLmJ1eWVyLmVtYWlsfWAsIGNhbm5vdFNlbGVjdDogZmFsc2UsIGFjdG9ySWQ6IG9iai5idXllci5hY3RvcklkLCBwcmVub206IG9iai5idXllci5wcmVub20sIG5vbTogb2JqLmJ1eWVyLm5vbSwgZW1haWw6IG9iai5idXllci5lbWFpbCwgbnVtUnVlOiBvYmouYnV5ZXIubnVtUnVlLCBub21SdWU6IG9iai5idXllci5ub21SdWUsIGNwOiBvYmouYnV5ZXIuY3AsIHZpbGxlOiBvYmouYnV5ZXIudmlsbGUsIHRlbDogb2JqLmJ1eWVyLnRlbCwgbnVtQ29tbWVyY2FudDogb2JqLmJ1eWVyLm51bUNvbW1lcmNhbnQsIGFjdG9yVHlwZUlkOiBvYmouYnV5ZXIuYWN0b3JUeXBlSWR9IDoge3ZhbHVlOiAwLCBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmJ1eWVyJyl9O1xuICAgIHNlbCA9ICEhb2JqLnNlbGxlciA/IHt2YWx1ZTogb2JqLnNlbGxlci5hY3RvcklkLCBsYWJlbDogYCR7b2JqLnNlbGxlci5wcmVub219ICR7b2JqLnNlbGxlci5ub219IC0gJHtvYmouc2VsbGVyLmVtYWlsfWAsIGNhbm5vdFNlbGVjdDogZmFsc2UsIGFjdG9ySWQ6IG9iai5zZWxsZXIuYWN0b3JJZCwgcHJlbm9tOiBvYmouc2VsbGVyLnByZW5vbSwgbm9tOiBvYmouc2VsbGVyLm5vbSwgZW1haWw6IG9iai5zZWxsZXIuZW1haWwsIG51bVJ1ZTogb2JqLnNlbGxlci5udW1SdWUsIG5vbVJ1ZTogb2JqLnNlbGxlci5ub21SdWUsIGNwOiBvYmouc2VsbGVyLmNwLCB2aWxsZTogb2JqLnNlbGxlci52aWxsZSwgdGVsOiBvYmouc2VsbGVyLnRlbCwgbnVtQ29tbWVyY2FudDogb2JqLnNlbGxlci5udW1Db21tZXJjYW50LCBhY3RvclR5cGVJZDogb2JqLnNlbGxlci5hY3RvclR5cGVJZH0gOiB7dmFsdWU6IDAsIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuc2VsbGVyJyl9O1xuICAgIGlmIChvYmouY29tbWFuZGVzICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqLmNvbW1hbmRlcykge1xuICAgICAgICBpbnQgPSB7fTtcbiAgICAgICAgaW50LnZhbHVlID0gb2JqLmNvbW1hbmRlc1trXS5vcmRlcklkO1xuICAgICAgICBpbnQubGFiZWwgPSBgJHtvYmouY29tbWFuZGVzW2tdLm9yZGVySWR9IC0gJHtvYmouY29tbWFuZGVzW2tdLnByaWNlSHR9YDtcbiAgICAgICAgaW50LmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICBpbnQub3JkZXJJZCA9IG9iai5jb21tYW5kZXNba10ub3JkZXJJZDtcbiAgICAgICAgaW50LmNvbnRlbnVBZGRpdGlvbm5lbCA9IG9iai5jb21tYW5kZXNba10uY29udGVudUFkZGl0aW9ubmVsO1xuICAgICAgICBpbnQucHJpY2VIdCA9IG9iai5jb21tYW5kZXNba10ucHJpY2VIdDtcbiAgICAgICAgaW50LmZhY3R1cmVJZCA9IG9iai5jb21tYW5kZXNba10uZmFjdHVyZUlkO1xuICAgICAgICBvcmQucHVzaChpbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob2JqLnBheW1lbnRzICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqLnBheW1lbnRzKSB7XG4gICAgICAgIGludCA9IHt9O1xuICAgICAgICBpbnQudmFsdWUgPSBvYmoucGF5bWVudHNba10ucGF5bWVudElkO1xuICAgICAgICBpbnQubGFiZWwgPSBgJHtvYmoucGF5bWVudHNba10ucGF5bWVudElkfSAtICR7b2JqLnBheW1lbnRzW2tdLnBheW1lbnRWYWx1ZX1gO1xuICAgICAgICBpbnQuY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIGludC5wYXltZW50SWQgPSBvYmoucGF5bWVudHNba10ucGF5bWVudElkO1xuICAgICAgICBpbnQucGF5bWVudFZhbHVlID0gb2JqLnBheW1lbnRzW2tdLnBheW1lbnRWYWx1ZTtcbiAgICAgICAgaW50LnBheW1lbnRUeXBlID0gb2JqLnBheW1lbnRzW2tdLnBheW1lbnRUeXBlO1xuICAgICAgICBpbnQuZmFjdHVyZUlkID0gb2JqLnBheW1lbnRzW2tdLmZhY3R1cmVJZDtcbiAgICAgICAgaW50LmV0YXQgPSBvYmoucGF5bWVudHNba10uZXRhdDtcbiAgICAgICAgcGF5LnB1c2goaW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgICBpbnZvaWNlSWQudmFsdWUgPSBvYmouZmFjdHVyZUlkO1xuICAgIGRhdGUudmFsdWUgPSBvYmouZGF0ZTtcbiAgICAvLyBpbnZvaWNlSFRQcmljZS52YWx1ZSA9IG9iai5pbnZvaWNlSFRQcmljZTtcbiAgICAvLyBpbnZvaWNlVFRQcmljZS52YWx1ZSA9IG9iai5pbnZvaWNlVFRQcmljZTtcbiAgICBsYW5ndWFnZS52YWx1ZSA9IGxhbmc7XG4gICAgZGV2aXNlLnZhbHVlID0gZGV2O1xuICAgIHR2YVZhbHVlLnZhbHVlID0gb2JqLnR2YVZhbHVlO1xuICAgIGJ1eWVyLnZhbHVlID0gYnV5O1xuICAgIHNlbGxlci52YWx1ZSA9IHNlbDtcbiAgICBjb21tYW5kZXMudmFsdWUgPSBvcmQ7XG4gICAgcGF5bWVudHMudmFsdWUgPSBwYXk7XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIGZhY3R1cmVJZDogb2JqLmZhY3R1cmVJZCxcbiAgICAgIGRhdGU6IG9iai5kYXRlLFxuICAgICAgaW52b2ljZUhUUHJpY2U6IG9iai5pbnZvaWNlSFRQcmljZSxcbiAgICAgIGludm9pY2VUVFByaWNlOiBvYmouaW52b2ljZVRUUHJpY2UsXG4gICAgICBsYW5ndWFnZTpsYW5nLFxuICAgICAgZGV2aXNlOiBkZXYsXG4gICAgICB0dmFWYWx1ZTogb2JqLnR2YVZhbHVlLFxuICAgICAgYnV5ZXI6IGJ1eSxcbiAgICAgIHNlbGxlcjogc2VsLFxuICAgICAgY29tbWFuZGVzOiBvcmQsXG4gICAgICBwYXltZW50czogcGF5LFxuICAgICAgYWN0aW9uczogbnVsbCxcbiAgICB9O1xuICAgIGFkZElucHV0T2JqZWN0LmRhdGUuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVcGRhdGUgaW52b2ljZSB0byBkYiAhJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgICAgcmV0ID0gYXdhaXQgdXBkYXRlSW52b2ljZUluRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXQgPSBhd2FpdCB1cGRhdGVJbnZvaWNlSW5TUUxpdGVEYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH1cbiAgICBpZiAocmV0KSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgbWVzc2FnZTogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBtZXNzYWdlOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBkZWxldGVDbGlja0Zyb21DaGlsZChlOiBFdmVudCwgaWQ6IG51bWJlcikge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vIGNvbnNvbGUubG9nKCdEZWxldGluZyBpbnZvaWNlIGZyb20gZGIgIScpO1xuICBpbnZvaWNlSWQudmFsdWUgPSBpZDtcbiAgbGV0IHJldDtcbiAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICByZXQgPSBkZWxldGVJbnZvaWNlRnJvbURiKCk7XG4gICAgaWYgKHJldCkge1xuICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gIH0gXG4gIGVsc2Uge1xuICAgIHJldCA9IGF3YWl0IGRlbGV0ZUludm9pY2VGcm9tU1FMaXRlRGIoKTtcbiAgICBpZiAocmV0KSB7XG4gICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIH1cbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuICBpZiAocmV0KXtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgIG1lc3NhZ2U6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2suZGVsZXRlJylcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICBtZXNzYWdlOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScpXG4gICAgfSk7XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBpbnNlcnRJbnZvaWNlSW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUudmFsdWUpLFxuICAgIGludm9pY2VIVFByaWNlOiBwYXJzZUZsb2F0KGludm9pY2VIVFByaWNlLnZhbHVlKSxcbiAgICBpbnZvaWNlVFRQcmljZTogcGFyc2VGbG9hdChpbnZvaWNlVFRQcmljZS52YWx1ZSksXG4gICAgbGFuZ3VhZ2VJZDogbGFuZ3VhZ2UudmFsdWUubGFuZ3VlSWQsXG4gICAgZGV2aXNlSWQ6IGRldmlzZS52YWx1ZS5kZXZpc2VJZCxcbiAgICB0dmFWYWx1ZTogcGFyc2VGbG9hdCh0dmFWYWx1ZS52YWx1ZSksXG4gICAgYnV5ZXJJZDogYnV5ZXIudmFsdWUuYWN0b3JJZCxcbiAgICBzZWxsZXJJZDogc2VsbGVyLnZhbHVlLmFjdG9ySWQsXG4gICAgYWRtaW5JZDogdXNlcklkLnZhbHVlLFxuICAgIG9yZGVyczogY29tbWFuZGVzLnZhbHVlLFxuICAgIHBheW1lbnRzOiBwYXltZW50cy52YWx1ZSxcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIC8vIGNvbnNvbGUubG9nKG9iaik7XG4gIHJldHVybiBpbnZvaWNlQXhpb3NTZXJ2aWNlLmNyZWF0ZShvYmopXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywge2VycjogZXJyfSlcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn07XG5hc3luYyBmdW5jdGlvbiBpbnNlcnRJbnZvaWNlSW5TUUxpdGVEYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGRhdGU6IGRhdGUudmFsdWUsXG4gICAgaW52b2ljZUhUUHJpY2U6IHBhcnNlRmxvYXQoaW52b2ljZUhUUHJpY2UudmFsdWUpLFxuICAgIGludm9pY2VUVFByaWNlOiBwYXJzZUZsb2F0KGludm9pY2VUVFByaWNlLnZhbHVlKSxcbiAgICBsYW5ndWFnZUlkOiBsYW5ndWFnZS52YWx1ZS5sYW5ndWVJZCxcbiAgICBkZXZpc2VJZDogZGV2aXNlLnZhbHVlLmRldmlzZUlkLFxuICAgIHR2YVZhbHVlOiBwYXJzZUZsb2F0KHR2YVZhbHVlLnZhbHVlKSxcbiAgICBidXllcklkOiBidXllci52YWx1ZS5hY3RvcklkLFxuICAgIHNlbGxlcklkOiBzZWxsZXIudmFsdWUuYWN0b3JJZCxcbiAgICBhZG1pbklkOiB1c2VySWQudmFsdWUsXG4gICAgb3JkZXJzOiBjb21tYW5kZXMudmFsdWUsXG4gICAgcGF5bWVudHM6IHBheW1lbnRzLnZhbHVlLFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgbGV0IGlzT3BlbiA9ICBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gISFpc09wZW4gfHwgIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCBzcWwgPSAnSU5TRVJUIElOVE8gXFxgZmFjdHVyZVxcYCAoXFxgZGF0ZVxcYCwgXFxgaW52b2ljZUhUUHJpY2VcXGAsIFxcYGludm9pY2VUVFByaWNlXFxgLCBcXGBsYW5ndWFnZUlkXFxgLCBcXGBkZXZpc2VJZFxcYCwgXFxgdHZhVmFsdWVcXGAsIFxcYGJ1eWVySWRcXGAsIFxcYHNlbGxlcklkXFxgLCBcXGBhZG1pbmlzdHJhdG9ySWRcXGApIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPywgPywgPyk7JztcbiAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgIGxldCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmouZGF0ZSwgb2JqLmludm9pY2VIVFByaWNlLCBvYmouaW52b2ljZVRUUHJpY2UsIG9iai5sYW5ndWFnZUlkLCBvYmouZGV2aXNlSWQsIG9iai50dmFWYWx1ZSwgb2JqLmJ1eWVySWQsIG9iai5zZWxsZXJJZCwgb2JqLmFkbWluSWRdKTtcbiAgICBsZXQgdmFsID0gJyc7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzICYmIHZhbHVlcy5jaGFuZ2VzLmxhc3RJZCkge1xuICAgICAgaWYgKG9iai5vcmRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHNxbCA9ICdVUERBVEUgXFxgY29tbWFuZGVcXGAgU0VUIFxcYGZhY3R1cmVJZFxcYD0/IFdIRVJFIFxcYG9yZGVySWRcXGAgSU4gKCc7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmoub3JkZXJzKSB7XG4gICAgICAgICAgc3FsICs9IGsgPCBvYmoub3JkZXJzLmxlbmd0aCAtIDEgPyBgJHtvYmoub3JkZXJzW2tdLm9yZGVySWR9LCBgIDogYCR7b2JqLm9yZGVyc1trXS5vcmRlcklkfSk7YDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgICAgICB2YWwgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFt2YWx1ZXMuY2hhbmdlcy5sYXN0SWRdKTtcbiAgICAgICAgaWYgKCF2YWwuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiAnVXBkYXRpbmcgb3JkZXJzIHRvIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9iai5wYXltZW50cy5sZW5ndGgpIHtcbiAgICAgICAgc3FsID0gJ1VQREFURSBcXGBwYXltZW50XFxgIFNFVCBcXGBmYWN0dXJlSWRcXGA9PyBXSEVSRSBcXGBwYXltZW50SWRcXGAgSU4gKCc7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmoucGF5bWVudHMpIHtcbiAgICAgICAgICBzcWwgKz0gayA8IG9iai5wYXltZW50cy5sZW5ndGggLSAxID8gYCR7b2JqLnBheW1lbnRzW2tdLnBheW1lbnRJZH0sIGAgOiBgJHtvYmoucGF5bWVudHNba10ucGF5bWVudElkfSk7YDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgICAgICB2YWwgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFt2YWx1ZXMuY2hhbmdlcy5sYXN0SWRdKTtcbiAgICAgICAgaWYgKCF2YWwuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiAnVXBkYXRpbmcgcGF5bWVudHMgdG8gU1FMaXRlIERCICEnIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldCA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IFxuICAgIGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHsgXG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiAnQWRkaW5nIGludm9pY2UgdG8gU1FMaXRlIERCICEnIH0pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgIScgfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVJbnZvaWNlSW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUudmFsdWUpLFxuICAgIGludm9pY2VIVFByaWNlOiBwYXJzZUZsb2F0KGludm9pY2VIVFByaWNlLnZhbHVlKSxcbiAgICBpbnZvaWNlVFRQcmljZTogcGFyc2VGbG9hdChpbnZvaWNlVFRQcmljZS52YWx1ZSksXG4gICAgbGFuZ3VhZ2VJZDogbGFuZ3VhZ2UudmFsdWUubGFuZ3VlSWQsXG4gICAgZGV2aXNlSWQ6IGRldmlzZS52YWx1ZS5kZXZpc2VJZCxcbiAgICB0dmFWYWx1ZTogcGFyc2VGbG9hdCh0dmFWYWx1ZS52YWx1ZSksXG4gICAgYnV5ZXJJZDogYnV5ZXIudmFsdWUuYWN0b3JJZCxcbiAgICBzZWxsZXJJZDogc2VsbGVyLnZhbHVlLmFjdG9ySWQsXG4gICAgYWRtaW5JZDogMSxcbiAgICBvcmRlcnM6IGNvbW1hbmRlcy52YWx1ZSxcbiAgICBwYXltZW50czogcGF5bWVudHMudmFsdWUsXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICByZXR1cm4gaW52b2ljZUF4aW9zU2VydmljZS51cGRhdGUoaW52b2ljZUlkLnZhbHVlLCBvYmopXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywge2VycjogZXJyfSlcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn07XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVJbnZvaWNlSW5TUUxpdGVEYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGRhdGU6IGRhdGUudmFsdWUsXG4gICAgaW52b2ljZUhUUHJpY2U6IHBhcnNlRmxvYXQoaW52b2ljZUhUUHJpY2UudmFsdWUpLFxuICAgIGludm9pY2VUVFByaWNlOiBwYXJzZUZsb2F0KGludm9pY2VUVFByaWNlLnZhbHVlKSxcbiAgICBsYW5ndWFnZUlkOiBsYW5ndWFnZS52YWx1ZS5sYW5ndWVJZCxcbiAgICBkZXZpc2VJZDogZGV2aXNlLnZhbHVlLmRldmlzZUlkLFxuICAgIHR2YVZhbHVlOiBwYXJzZUZsb2F0KHR2YVZhbHVlLnZhbHVlKSxcbiAgICBidXllcklkOiBidXllci52YWx1ZS5hY3RvcklkLFxuICAgIHNlbGxlcklkOiBzZWxsZXIudmFsdWUuYWN0b3JJZCxcbiAgICBhZG1pbklkOiAxLFxuICAgIG9yZGVyczogY29tbWFuZGVzLnZhbHVlLFxuICAgIHBheW1lbnRzOiBwYXltZW50cy52YWx1ZSxcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gISFpc09wZW4gfHwgIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCBzcWwgPSAnVVBEQVRFIFxcYGZhY3R1cmVcXGAgU0VUIFxcYGRhdGVcXGA9PywgXFxgaW52b2ljZUhUUHJpY2VcXGA9PywgXFxgaW52b2ljZVRUUHJpY2VcXGA9PywgXFxgbGFuZ3VhZ2VJZFxcYD0/LCBcXGBkZXZpc2VJZFxcYD0/LCBcXGB0dmFWYWx1ZVxcYD0/LCBcXGBidXllcklkXFxgPT8sIFxcYHNlbGxlcklkXFxgPT8gV0hFUkUgXFxgZmFjdHVyZUlkXFxgID0gPzsnO1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgIGxldCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmouZGF0ZSwgb2JqLmludm9pY2VIVFByaWNlLCBvYmouaW52b2ljZVRUUHJpY2UsIG9iai5sYW5ndWFnZUlkLCBvYmouZGV2aXNlSWQsIG9iai50dmFWYWx1ZSwgb2JqLmJ1eWVySWQsIG9iai5zZWxsZXJJZCwgaW52b2ljZUlkLnZhbHVlXSk7XG4gICAgbGV0IHZhbCA9ICcnO1xuICAgIGlmICh2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICBpZiAob2JqLm9yZGVycy5sZW5ndGgpIHtcbiAgICAgICAgc3FsID0gJ1VQREFURSBcXGBjb21tYW5kZVxcYCBTRVQgXFxgZmFjdHVyZUlkXFxgPT8gV0hFUkUgXFxgb3JkZXJJZFxcYCBJTiAoJztcbiAgICAgICAgZm9yIChjb25zdCBrIGluIG9iai5vcmRlcnMpIHtcbiAgICAgICAgICBzcWwgKz0gayA8IG9iai5vcmRlcnMubGVuZ3RoIC0gMSA/IGAke29iai5vcmRlcnNba10ub3JkZXJJZH0sIGAgOiBgJHtvYmoub3JkZXJzW2tdLm9yZGVySWR9KTtgO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgICAgIHZhbCA9IGF3YWl0IG5ld1J1bihwcm9wcy5kYkNvbm4sIHNxbCwgW2ludm9pY2VJZC52YWx1ZV0pO1xuICAgICAgICBpZiAoIXZhbC5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywge2VycjogJ1VwZGF0aW5nIG9yZGVycyB0byBTUUxpdGUgZGIgISd9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3FsID0gJ1VQREFURSBcXGBjb21tYW5kZVxcYCBTRVQgXFxgZmFjdHVyZUlkXFxgPU5VTEwgV0hFUkUgXFxgZmFjdHVyZUlkXFxgID0gPzsnO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgICAgICB2YWwgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtpbnZvaWNlSWQudmFsdWVdKTtcbiAgICAgICAgLy8gaWYgKCF2YWwuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAgICAgLy8gYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZXMnLCBbXG4gICAgICAgICAgLy8gICB7XG4gICAgICAgICAgLy8gICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgICAvLyAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vIF0pO1xuICAgICAgICAgIC8vIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgICAgICAgLy8gbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIC8vIHJldCA9IHRydWU7XG4gICAgICAgICAgLy8gcmV0dXJuIHJldDtcbiAgICAgICAgLy8gfVxuICAgICAgfVxuICAgICAgaWYgKG9iai5wYXltZW50cy5sZW5ndGgpIHtcbiAgICAgICAgc3FsID0gJ1VQREFURSBcXGBwYXltZW50XFxgIFNFVCBcXGBmYWN0dXJlSWRcXGA9PyBXSEVSRSBcXGBwYXltZW50SWRcXGAgSU4gKCc7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmoucGF5bWVudHMpIHtcbiAgICAgICAgICBzcWwgKz0gayA8IG9iai5wYXltZW50cy5sZW5ndGggLSAxID8gYCR7b2JqLnBheW1lbnRzW2tdLnBheW1lbnRJZH0sIGAgOiBgJHtvYmoucGF5bWVudHNba10ucGF5bWVudElkfSk7YDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgICAgICB2YWwgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtpbnZvaWNlSWQudmFsdWVdKTtcbiAgICAgICAgaWYgKCF2YWwuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZXMnLCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHtlcnI6ICdVcGRhdGluZyBwYXltZW50cyB0byBTUUxpdGUgZGIgISd9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcWwgPSAnVVBEQVRFIFxcYHBheW1lbnRcXGAgU0VUIFxcYGZhY3R1cmVJZFxcYD1OVUxMIFdIRVJFIFxcYGZhY3R1cmVJZFxcYCA9ID87JztcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICAgICAgdmFsID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbaW52b2ljZUlkLnZhbHVlXSk7XG4gICAgICAgIC8vIGlmICghdmFsLmNoYW5nZXMuY2hhbmdlcykge1xuICAgICAgICAgIC8vIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2VzJywgW1xuICAgICAgICAgIC8vICAge1xuICAgICAgICAgIC8vICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgLy8gICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJywge2VycjogJ1VwZGF0aW5nIHBheW1lbnRzIHRvIE5VTEwgdG8gU1FMaXRlIGRiICEnfSlcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyBdKTtcbiAgICAgICAgICAvLyBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgICAgICAgIC8vIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAvLyByZXR1cm4gcmV0O1xuICAgICAgICAvLyB9XG4gICAgICB9XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHsgZXJyOiAnVXBkYXRpbmcgaW52b2ljZSB0byBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBkZWxldGVJbnZvaWNlRnJvbURiKCkge1xuICByZXR1cm4gaW52b2ljZUF4aW9zU2VydmljZS5kZWxldGUoaW52b2ljZUlkLnZhbHVlKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLmRlbGV0ZScpXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW52b2ljZUZyb21TUUxpdGVEYigpIHtcbiAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICBpZiAoaXNPcGVuKSB7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIGxldCBzcWwgPSBgREVMRVRFIEZST00gXFxgZmFjdHVyZVxcYCBXSEVSRSBcXGBmYWN0dXJlSWRcXGA9ICcke2ludm9pY2VJZC52YWx1ZX0nO2A7XG4gICAgbGV0IHZhbHVlcyA9IGF3YWl0IG5ld1J1bihwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5kZWxldGUnLCB7ZXJyOiAnRGVsZXRpbmcgaW52b2ljZSBmcm9tIFNRTGl0ZSBEQiAhJ30pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZGVsZXRlJywge2VycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJ30pXG4gICAgICB9XG4gICAgXSxcbiAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgfSk7XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbmZ1bmN0aW9uIGdldENvbnZlcnRGdW5jKCkge1xuICBsZXQgcmV0ID0gdW5kZWZpbmVkO1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCl7XG4gICAgc3dpdGNoICh1c2VyU3RvcmUuZ2V0VXNlci5kZXZpc2UubGliZWxsZSkge1xuICAgICAgY2FzZSAnZXVybyc6XG4gICAgICAgIHJldCA9IGZyb21FdXJvVG9PdGhlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb2xsYXInOlxuICAgICAgICByZXQgPSBmcm9tRG9sbGFyVG9PdGhlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsaXZyZSc6XG4gICAgICAgIHJldCA9IGZyb21MaXZyZVRvT3RoZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0ID0gZnJvbUV1cm9Ub090aGVyO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgc3dpdGNoICh1c2VyLmRldmlzZS5saWJlbGxlKSB7XG4gICAgICBjYXNlICdldXJvJzpcbiAgICAgICAgcmV0ID0gZnJvbUV1cm9Ub090aGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RvbGxhcic6XG4gICAgICAgIHJldCA9IGZyb21Eb2xsYXJUb090aGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xpdnJlJzpcbiAgICAgICAgcmV0ID0gZnJvbUxpdnJlVG9PdGhlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXQgPSBmcm9tRXVyb1RvT3RoZXI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIGNvbnZlcnRBbW91bnQodmFsOiBudW1iZXIsIGRlc3Q6IHN0cmluZywgZnVuYzogYW55KSB7XG4gIHJldHVybiBmdW5jKHZhbCwgZGVzdCk7XG59O1xuZnVuY3Rpb24gZnJvbUV1cm9Ub090aGVyKHZhbDogbnVtYmVyLCBkZXN0OiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgcmV0ID0gdmFsO1xuICBsZXQgc3RvY2tfcHJpY2UgPSBudWxsO1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCl7XG4gICAgc3RvY2tfcHJpY2UgPSBjb3VudGVyU3RvcmUuZ2V0RXVyb1ByaWNlO1xuICB9XG4gIGVsc2Uge1xuICAgIHN0b2NrX3ByaWNlID0gY291bnRlci5wcmljZXMuZmluZCgocDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gcC5ldXJvID09PSAxO1xuICAgIH0pO1xuICB9XG4gIGNvbnN0IHByb2R1aXQgPSBzdG9ja19wcmljZSAhPT0gbnVsbCA/IHN0b2NrX3ByaWNlIDogbnVsbDtcbiAgc3dpdGNoIChkZXN0KSB7XG4gICAgY2FzZSAnZG9sbGFyJzpcbiAgICAgIHJldCAqPSBwcm9kdWl0ICE9PSBudWxsID8gcHJvZHVpdC5kb2xsYXIgOiAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGl2cmUnOlxuICAgICAgcmV0ICo9IHByb2R1aXQgIT09IG51bGwgPyBwcm9kdWl0LmxpdnJlIDogMTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIGZyb21Eb2xsYXJUb090aGVyKHZhbDogbnVtYmVyLCBkZXN0OiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgcmV0ID0gdmFsLCBzdG9ja19wcmljZSA9IG51bGw7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBzdG9ja19wcmljZSA9IGNvdW50ZXJTdG9yZS5nZXREb2xsYXJQcmljZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzdG9ja19wcmljZSA9IGNvdW50ZXIucHJpY2VzLmZpbmQoKHA6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHAuZG9sbGFyID09PSAxO1xuICAgIH0pO1xuICB9XG4gIGNvbnN0IHByb2R1aXQgPSBzdG9ja19wcmljZSAhPT0gbnVsbCA/IHN0b2NrX3ByaWNlIDogbnVsbDtcbiAgc3dpdGNoIChkZXN0KSB7XG4gICAgY2FzZSAnZXVybyc6XG4gICAgICByZXQgKj0gcHJvZHVpdCAhPT0gbnVsbCA/IHByb2R1aXQuZXVybyA6IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsaXZyZSc6XG4gICAgICByZXQgKj0gcHJvZHVpdCAhPT0gbnVsbCA/IHByb2R1aXQubGl2cmUgOiAxO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gZnJvbUxpdnJlVG9PdGhlcih2YWw6IG51bWJlciwgZGVzdDogc3RyaW5nKTogbnVtYmVyIHtcbiAgbGV0IHJldCA9IHZhbDtcbiAgbGV0IHN0b2NrX3ByaWNlID0gbnVsbDtcbiAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3Ape1xuICAgIHN0b2NrX3ByaWNlID0gY291bnRlclN0b3JlLmdldExpdnJlUHJpY2U7XG4gIH1cbiAgZWxzZSB7XG4gICAgc3RvY2tfcHJpY2UgPSBjb3VudGVyLnByaWNlcy5maW5kKChwOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBwLmxpdnJlID09PSAxO1xuICAgIH0pO1xuICB9XG4gIGNvbnN0IHByb2R1aXQgPSBzdG9ja19wcmljZSAhPT0gbnVsbCA/IHN0b2NrX3ByaWNlIDogbnVsbDtcbiAgc3dpdGNoIChkZXN0KSB7XG4gICAgY2FzZSAnZG9sbGFyJzpcbiAgICAgIHJldCAqPSBwcm9kdWl0ICE9PSBudWxsID8gcHJvZHVpdC5kb2xsYXIgOiAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZXVybyc6XG4gICAgICByZXQgKj0gcHJvZHVpdCAhPT0gbnVsbCA/IHByb2R1aXQuZXVybyA6IDE7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiBoYW5kbGVPcmllbnRhdGlvbigpe1xuICAvLyBjb25zb2xlLmxvZyhzY3JlZW4ub3JpZW50YXRpb24pO1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xufTtcblxuLy8gV0FUQ0hFUlNcbndhdGNoKCgpID0+IFsgcHJvcHMuYWRtaW4sIHByb3BzLmRpc3BsYXksIHByb3BzLmludm9pY2VGb3JtIF0sXG4gIChbbmV3QWRtaW5Qcm9wLCBuZXdEaXNwbGF5UHJvcCwgbmV3SW52b2ljZUZvcm1dKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYG5ld0FkbWluUHJvcCAtPiAke25ld0FkbWluUHJvcH0vbmV3RGlzcGxheVByb3AgLS0+ICR7bmV3RGlzcGxheVByb3B9L25ld0ludm9pY2VGb3JtIC0tPiAke25ld0ludm9pY2VGb3JtfWApO1xuICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IG5ld0FkbWluUHJvcDtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IG5ld0Rpc3BsYXlQcm9wO1xuICAgIGlzRm9ybS52YWx1ZSA9IG5ld0ludm9pY2VGb3JtO1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9XG4pO1xuXG4vLyBMSUZFQ1lDTEUgRVZFTlRTXG5cbi8vIE9USEVSU1xucHJvdmlkZSgnc3JjJywgJ2ludm9pY2VzJyk7XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0XCIgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uO1wiPlxuICAgIDwhLS0gY29udGVudCAtLT5cbiAgICA8aW52b2ljZS1jb21wb25lbnQgXG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6aW52b2ljZUZvcm09J2ludm9pY2VGb3JtJ1xuICAgICAgOmFkbWluPSdhZG1pblByb3AnXG4gICAgICA6ZGlzcGxheT0nZGlzcGxheVByb3AnXG4gICAgICA6ZGJDb25uPSdkYkNvbm4nLz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBuZXh0VGljaywgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IEludm9pY2VDb21wb25lbnQgZnJvbSAnY29tcG9uZW50cy9JbnZvaWNlQ29tcG9uZW50LnZ1ZSc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQYWdlUHJvcHMge1xuICBhZG1pbjogYm9vbGVhbjtcbiAgZGlzcGxheTogYm9vbGVhbjtcbiAgZGJDb25uPzogU1FMaXRlREJDb25uZWN0aW9uO1xufTtcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFBhZ2VQcm9wcz4oKSwge1xuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2hhbmdlLXRhYiddKTtcbmNvbnN0IGFkbWluUHJvcCA9IHJlZihwcm9wcy5hZG1pbik7XG5jb25zdCBkaXNwbGF5UHJvcCA9IHJlZihwcm9wcy5kaXNwbGF5KTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IGludm9pY2VGb3JtID0gcmVmKGZhbHNlKTtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocm91dGUucGFyYW1zLnR5cGUgIT0gJycpIHtcbiAgLy8gY29uc29sZS5sb2cocm91dGUucGFyYW1zLnR5cGUpO1xuICBhZG1pblByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2FkbWluJyA/IHRydWUgOiBmYWxzZTtcbiAgZGlzcGxheVByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2Rpc3BsYXknID8gdHJ1ZSA6IGZhbHNlO1xufVxuLy8gV0FUQ0hFUlNcbndhdGNoKFxuICByb3V0ZSxcbiAgYXN5bmMgKG5ld1IpID0+IHtcbiAgICBhZG1pblByb3AudmFsdWUgPSBuZXdSLnBhcmFtcy50eXBlID09PSAnYWRtaW4nID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGRpc3BsYXlQcm9wLnZhbHVlID0gbmV3Ui5wYXJhbXMudHlwZSA9PT0gJ2Rpc3BsYXknID8gdHJ1ZTogZmFsc2U7XG4gICAgaW52b2ljZUZvcm0udmFsdWUgPSBmYWxzZTtcbiAgICBmb3JjZUludm9pY2VSZXJlbmRlcigpO1xuICB9LFxuKVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlSW52b2ljZVJlcmVuZGVyKCkge1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSBmYWxzZTtcbiAgbmV4dFRpY2soKTtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gdHJ1ZTtcbn07XG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGVtaXQoJ2NoYW5nZS10YWInLCB1bmRlZmluZWQpO1xufSk7XG48L3NjcmlwdD5cbiJdLCJmaWxlIjoiYXNzZXRzL0ludm9pY2VQYWdlLmpzIn0=
