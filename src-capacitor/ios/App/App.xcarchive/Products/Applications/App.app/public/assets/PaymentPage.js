import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, d as computed, _ as __vitePreload, w as watch, D as provide, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, Q as QIcon, aq as unref, b1 as createSlots, a9 as createTextVNode, aa as toDisplayString, j as QBtn, a8 as Fragment, g as getCurrentInstance, B as nextTick, am as useRoute, o as onMounted } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { a as QTd } from "./QTable.js";
import { q as QItemSection } from "./use-prevent-scroll.js";
import { Q as QSelect } from "./QSelect.js";
import { Q as QInput } from "./QInput.js";
import { u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, d as newRun, c as closeDbConnection, e as setCryptApi, f as __FORMATOBJ__, n as newQuery, s as setDecryptApi, _ as __TRANSFORMOBJ__ } from "./use-quasar.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { a as usePaymentStore, T as TableItem, p as paymentAxiosService } from "./TableItem.js";
import { u as useInvoiceStore } from "./invoice.js";
import "./QList.js";
import "./index4.js";
import "./index2.js";
import "./WasmModules.js";
import "./service.service.js";
import "./session.js";
import "./session.service.js";
import "./invoice.service.js";
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentComponent",
  props: {
    paymentForm: { type: Boolean, default: false },
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
      etat: {
        label: t("paymentsComponent.inputLabels.etat"),
        head: t("paymentsComponent.headTable.etat"),
        name: "etat",
        placeholder: t("paymentsComponent.placeholders.etat"),
        disabled: false
      },
      paymentValue: {
        label: t("paymentsComponent.inputLabels.paymentValue"),
        head: t("paymentsComponent.headTable.paymentValue"),
        name: "paymentValue",
        placeholder: t("paymentsComponent.placeholders.paymentValue"),
        disabled: false
      },
      paymentType: {
        label: t("paymentsComponent.inputLabels.paymentType"),
        head: t("paymentsComponent.headTable.paymentType"),
        name: "payment_type",
        placeholder: t("paymentsComponent.placeholders.paymentType"),
        disabled: false
      },
      facture: {
        label: t("paymentsComponent.inputLabels.facture"),
        head: t("paymentsComponent.headTable.facture"),
        name: "facture",
        placeholder: t("paymentsComponent.placeholders.facture"),
        disabled: false
      }
    };
    let addInputObject = {
      etat: displayInputObject.etat,
      paymentValue: displayInputObject.paymentValue,
      paymentType: displayInputObject.paymentType,
      facture: displayInputObject.facture,
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
    const paymentId = ref(0);
    const etat = ref(null);
    const selectEtatsOption = ref([
      {
        value: -1,
        label: t("paymentsComponent.placeholders.etat"),
        etat: -1,
        cannotSelect: true
      },
      {
        value: 0,
        label: t("paymentsComponent.libelles.etats.not_paid"),
        etat: 0,
        cannotSelect: false
      },
      {
        value: 1,
        label: t("paymentsComponent.libelles.etats.paid"),
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
    const formState = {
      update: false,
      add: true
    };
    const defaultRow = ref([]);
    const nonEmptyEtat = computed(() => {
      return !!etat.value && etat.value.etat != -1;
    });
    const validValue = computed(() => {
      return paymentValue.value <= maxValue.value;
    });
    const nonEmptyValue = computed(() => {
      return !!paymentValue.value && paymentValue.value != "" ? true : false;
    });
    const nonEmptyType = computed(() => {
      return !!paymentType.value && paymentType.value.value != 0;
    });
    const nonEmptyFacture = computed(() => {
      return !!facture.value && facture.value.value != 0;
    });
    const formSubmitButtonState = computed(() => {
      const ret1 = !(nonEmptyEtat.value && nonEmptyType.value);
      const ret2 = !(nonEmptyValue.value && validValue.value && nonEmptyFacture.value);
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
    let messageStore = null, paymentStore = null, prefs = null, invoiceStore = null, userStore = null, user = null;
    if (platform.is.desktop) {
      messageStore = useMessageStore();
      paymentStore = usePaymentStore();
      invoiceStore = useInvoiceStore();
      userStore = useUserStore();
      messageVisibility.value = messageStore.getMessagesVisibility;
      user = userStore.getUser;
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        const mess = await prefs.getPref("message");
        const usr = await prefs.getPref("user");
        user = !!usr ? usr.user : {};
        const messages = !!mess ? mess.messages : [];
        const vis = !!mess ? mess.messagesVisibility : mess;
        if (messages.length && vis === null) {
          messageVisibility.value = true;
        } else {
          messageVisibility.value = vis !== null ? vis : false;
        }
      })();
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
        invoiceStore.getAllInvoices(user.userId).then((res) => {
          let obj = {};
          selectInvoicesOption.value = [];
          obj.value = 0;
          obj.label = t("paymentsComponent.placeholders.facture");
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
            content: t("paymentsComponent.results.ko.fetch_invoices", { err: "Empty result !" })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("paymentsComponent.results.ko.fetch_invoices", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
        paymentStore.getAllPaymentTypes().then((res) => {
          let obj = {};
          selectTypesOption.value = [];
          obj.value = 0;
          obj.label = t("paymentsComponent.placeholders.paymentType");
          obj.cannotSelect = true;
          obj.paymentTypeId = 0;
          selectTypesOption.value.push(obj);
          for (const k in res) {
            let label = res[k].cb ? t("paymentsComponent.libelles.types.cb") : "";
            label = res[k].esp ? t("paymentsComponent.libelles.types.esp") : label;
            label = res[k].chq ? t("paymentsComponent.libelles.types.chq") : label;
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
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("paymentsComponent.results.ko.fetch_types", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
      } else {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          let sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`languageId\`, \`facture\`.\`deviseId\`, \`facture\`.\`tvaValue\`, \`facture\`.\`buyerId\`, \`facture\`.\`sellerId\`, \`facture\`.\`administratorId\` FROM \`facture\` WHERE \`facture\`.\`administratorId\` = '${user.userId}';`;
          let values = await newQuery(props.dbConn, sql);
          if (values.values) {
            await setDecryptApi();
            const res = await __TRANSFORMOBJ__(values.values);
            let obj = {};
            selectInvoicesOption.value = [];
            obj.label = t("paymentsComponent.placeholders.facture");
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
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("paymentsComponent.results.ko.fetch_invoices", { err: "Select from invoice table of SQLite DB !" })
                }
              ]
            });
            messageVisibility.value = true;
          }
          sql = "SELECT `payment_type`.`paymentTypeId`, `payment_type`.`cb`, `payment_type`.`esp`, `payment_type`.`chq` FROM `payment_type`;";
          values = await newQuery(props.dbConn, sql);
          if (values.values) {
            let obj = {};
            selectTypesOption.value = [];
            obj.label = t("paymentsComponent.placeholders.paymentType");
            obj.value = 0;
            obj.cannotSelect = true;
            obj.paymentTypeId = 0;
            obj.cb = false;
            obj.esp = false;
            obj.chq = false;
            selectTypesOption.value.push(obj);
            for (const k in values.values) {
              obj = {};
              let label = values.values[k].cb ? t("paymentsComponent.libelles.types.cb") : "";
              label = values.values[k].esp ? t("paymentsComponent.libelles.types.esp") : label;
              label = values.values[k].chq ? t("paymentsComponent.libelles.types.chq") : label;
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
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("paymentsComponent.results.ko.fetch_types", { err: "Select from payment_type table of SQLite DB !" })
                }
              ],
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
          closeDbConnection(props.dbConn);
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("paymentsComponent.results.ko.fetch_invoices", { err: "Unable to open SQLite DB !" })
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
        paymentId.value = 0;
        etat.value = { value: -1, label: t("paymentsComponent.placeholders.etat"), etat: -1, cannotSelect: true };
        paymentValue.value = 0;
        paymentType.value = { value: 0, label: t("paymentsComponent.placeholders.paymentType"), cannotSelect: true, paymentId: 0 };
        facture.value = { value: 0, label: t("paymentsComponent.placeholders.facture"), cannotSelect: true, factureId: 0, date: null, invoiceHTPrice: 0, invoiceTTPrice: 0, languageId: 0, deviseId: 0, tvaValue: 0, buyerId: 0, sellerId: 0, administratorId: 0 };
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
          actions: ""
        };
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await insertPaymentInDb();
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
          ret = await insertPaymentInSQLiteDb();
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
            message: t("paymentsComponent.results.ok.add")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("paymentsComponent.results.ko.add")
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
        defaultRow.value[0] = {
          paymentId: obj.paymentId,
          etat: obj.etat,
          paymentValue: obj.paymentValue,
          paymentType: obj.payment_type,
          facture: obj.facture,
          actions: ""
        };
        obj.facture.value = obj.facture.factureId;
        obj.facture.label = `${obj.facture.factureId} - ${obj.facture.invoiceTTPrice}`;
        obj.facture.cannotSelect = false;
        let label = obj.payment_type.cb ? t("paymentsComponent.libelles.types.cb") : "";
        label = obj.payment_type.esp ? t("paymentsComponent.libelles.types.esp") : label;
        label = obj.payment_type.chq ? t("paymentsComponent.libelles.types.chq") : label;
        paymentId.value = obj.paymentId;
        etat.value = { value: obj.etat, label: obj.etat ? t("paymentsComponent.libelles.etats.paid") : t("paymentsComponent.libelles.etats.not_paid"), etat: obj.etat, cannotSelect: false };
        paymentValue.value = obj.paymentValue;
        paymentType.value = { value: obj.payment_type.paymentTypeId, label, paymentTypeId: obj.payment_type.paymentTypeId, cb: obj.payment_type.cb, esp: obj.payment_type.esp, chq: obj.payment_type.chq, cannotSelect: false };
        facture.value = obj.facture;
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await updatePaymentInDb();
          if (ret) {
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
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("paymentsComponent.results.ok.update")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("paymentsComponent.results.ko.update")
          });
        }
      }
    }
    async function deleteClickFromChild(e, id) {
      e.preventDefault();
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
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("paymentsComponent.results.ok.delete")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("paymentsComponent.results.ko.delete")
        });
      }
    }
    async function insertPaymentInDb() {
      const obj = {
        etat: etat.value.etat,
        paymentValue: parseFloat(paymentValue.value),
        paymentType: paymentType.value.paymentTypeId,
        factureId: facture.value.factureId
      };
      await transformObject(obj);
      return paymentAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("paymentsComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("paymentsComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function insertPaymentInSQLiteDb() {
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
        let sql = "INSERT INTO `payment` (`etat`, `paymentValue`, `paymentType`, `factureId`) VALUES (?, ?, ?, ?);";
        let values = await newRun(props.dbConn, sql, [obj.etat, obj.paymentValue, obj.paymentType, obj.factureId]);
        let ret = false;
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("paymentsComponent.results.ok.add")
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
                content: t("paymentsComponent.results.ko.add", { err: "Adding payment to SQLite DB !" })
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
            content: t("paymentsComponent.results.ko.add", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function updatePaymentInDb() {
      const obj = {
        etat: etat.value.etat,
        paymentValue: parseFloat(paymentValue.value),
        paymentType: paymentType.value.paymentTypeId,
        factureId: facture.value.factureId
      };
      await transformObject(obj);
      return paymentAxiosService.update(paymentId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("paymentsComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("paymentsComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
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
        let sql = "UPDATE `payment` SET `etat`=?, `paymentValue`=?, `paymentType`=?, `factureId`=? WHERE `paymentId` = ?;";
        const values = await newRun(props.dbConn, sql, [obj.etat, obj.paymentValue, obj.paymentType, obj.factureId, paymentId.value]);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("paymentsComponent.results.ok.update")
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
                content: t("paymentsComponent.results.ko.update", { err: "Updating payment to SQLite DB !" })
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
            content: t("paymentsComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function deletePaymentFromDb() {
      return paymentAxiosService.delete(paymentId.value).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("paymentsComponent.results.ok.delete")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("paymentsComponent.results.ko.delete", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function deletePaymentFromSQLiteDb() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        const sql = `DELETE FROM \`payment\` WHERE \`paymentId\`= '${paymentId.value}';`;
        const values = await newRun(props.dbConn, sql);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("paymentsComponent.results.ok.delete")
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
                content: t("paymentsComponent.results.ko.delete", { err: "Deleting payment from SQLite DB !" })
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
            content: t("paymentsComponent.results.ko.delete", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    watch(
      () => [props.admin, props.display, props.paymentForm],
      ([newAdminProp, newDisplayProp, newPaymentForm]) => {
        adminPropRef.value = newAdminProp;
        displayPropRef.value = newDisplayProp;
        isForm.value = newPaymentForm;
        forceTableRerender();
      }
    );
    provide("src", "payments");
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
            tableTitle: unref(t)("paymentsComponent.tableTitle"),
            isForm: isForm.value,
            addForm: "paymentForm",
            tableObj: adminPropRef.value ? unref(addInputObject) : displayInputObject,
            addDefaultRow: defaultRow.value,
            addActionName: "addClick",
            onAddClick: addClickFromChild,
            updateActionName: "updateClick",
            onUpdateClick: updateClickFromChild,
            deleteActionName: "deleteClick",
            onDeleteClick: deleteClickFromChild,
            ident: "paymentId",
            updating: formState.update,
            adding: formState.add,
            admin: __props.admin,
            display: __props.display,
            no_data_label: unref(t)("paymentsComponent.errors.empty.tableBodyContentText"),
            no_data_button_text: unref(t)("paymentsComponent.errors.empty.buttonAdding"),
            dbConn: __props.dbConn
          }, {
            paymentForm: withCtx(() => [
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
                  createVNode(QSelect, {
                    filled: "",
                    "use-input": false,
                    "use-chips": false,
                    multiple: false,
                    "input-debounce": "0",
                    modelValue: etat.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => etat.value = $event),
                    name: unref(addInputObject).etat.name,
                    label: unref(addInputObject).etat.label,
                    "option-disable": "cannotSelect",
                    options: selectEtatsOption.value,
                    hint: unref(t)("paymentsComponent.hints.etat"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyEtat) || unref(t)("paymentsComponent.errors.empty.etat")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("paymentsComponent.libelles.no_option_etat")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "approval" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: paymentValue.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => paymentValue.value = $event),
                    type: "number",
                    name: unref(addInputObject).paymentValue.name,
                    label: unref(addInputObject).paymentValue.label,
                    readonly: false,
                    disable: false,
                    hint: unref(t)("paymentsComponent.hints.paymentValue"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("paymentsComponent.placeholders.paymentValue"),
                    "reactive-rules": true,
                    rules: [
                      (val) => unref(nonEmptyValue) || unref(t)("paymentsComponent.errors.empty.paymentValue"),
                      (val) => unref(validValue) || unref(t)("paymentsComponent.errors.error.paymentValue", { val: unref(maxValue) })
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "payments" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "hint", "dense", "placeholders", "rules"])
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
                    modelValue: paymentType.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => paymentType.value = $event),
                    name: unref(addInputObject).paymentType.name,
                    label: unref(addInputObject).paymentType.label,
                    "option-disable": "cannotSelect",
                    options: selectTypesOption.value,
                    hint: unref(t)("paymentsComponent.hints.paymentType"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyType) || unref(t)("paymentsComponent.errors.empty.paymentType")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("paymentsComponent.libelles.no_option_type")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "credit_card" })
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
                    modelValue: facture.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => facture.value = $event),
                    name: unref(addInputObject).facture.name,
                    label: unref(addInputObject).facture.label,
                    "option-disable": "cannotSelect",
                    options: selectInvoicesOption.value,
                    hint: unref(t)("paymentsComponent.hints.facture"),
                    "hide-hint": true,
                    dense: unref(compact),
                    rules: [
                      (val) => unref(nonEmptyFacture) || unref(t)("paymentsComponent.errors.empty.facture")
                    ]
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("paymentsComponent.libelles.no_option_invoice")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "receipt_long" })
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
                    label: unref(t)("paymentsComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[4] || (_cache[4] = ($event) => addClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true),
                  formState.update ? (openBlock(), createBlock(QBtn, {
                    key: 1,
                    color: "secondary",
                    icon: "update",
                    label: unref(t)("paymentsComponent.errors.empty.buttonUpdating"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[5] || (_cache[5] = ($event) => updateClickFromChild($event, true))
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
var PaymentComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "PaymentComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaymentPage",
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
    const paymentForm = ref(false);
    if (route.params.type != "") {
      adminProp.value = route.params.type === "admin" ? true : false;
      displayProp.value = route.params.type === "display" ? true : false;
    }
    watch(
      route,
      async (newR) => {
        adminProp.value = newR.params.type === "admin" ? true : false;
        displayProp.value = newR.params.type === "display" ? true : false;
        paymentForm.value = false;
        forcePaymentRerender();
      }
    );
    async function forcePaymentRerender() {
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
          renderComponent.value ? (openBlock(), createBlock(PaymentComponent, {
            key: 0,
            paymentForm: paymentForm.value,
            admin: adminProp.value,
            display: displayProp.value,
            dbConn: __props.dbConn
          }, null, 8, ["paymentForm", "admin", "display", "dbConn"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
var PaymentPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "PaymentPage.vue"]]);
export { PaymentPage as default };
//# sourceMappingURL=data:application/json;base64,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QVksT0FBTztBQUM1RCxvQkFBWSxRQUFRO0FBQ0M7TUFDdkI7QUFBQTtBQUlGLG1CQUFlLHVCQUF1QjtBQUNwQyxzQkFBZ0IsUUFBUTtBQUNmO0FBQ1Qsc0JBQWdCLFFBQVE7QUFBQSxJQUMxQjtBQUdBLGNBQVUsTUFBTTtBQUNkLFdBQUssY0FBYyxNQUFTO0FBQUEsS0FDN0IiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUGF5bWVudENvbXBvbmVudC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvUGF5bWVudFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtbm8tc3NyPlxuICAgIDxNZXNzYWdlc0l0ZW0gdi1pZj0nbWVzc2FnZVZpc2liaWxpdHkgJiYgcmVuZGVyQ29tcG9uZW50JyAvPlxuICA8L3Etbm8tc3NyPlxuICA8ZGl2IHN0eWxlPSd3aWR0aDogMTAwJSc+XG4gICAgPHRhYmxlLWl0ZW1cbiAgICAgIDp0YWJsZVRpdGxlPSd0KFwicGF5bWVudHNDb21wb25lbnQudGFibGVUaXRsZVwiKSdcbiAgICAgIDppc0Zvcm09J2lzRm9ybSdcbiAgICAgIGFkZEZvcm09J3BheW1lbnRGb3JtJ1xuICAgICAgOnRhYmxlT2JqPSdhZG1pblByb3BSZWYgPyBhZGRJbnB1dE9iamVjdCA6IGRpc3BsYXlJbnB1dE9iamVjdCdcbiAgICAgIDphZGREZWZhdWx0Um93PSdkZWZhdWx0Um93J1xuICAgICAgYWRkQWN0aW9uTmFtZT0nYWRkQ2xpY2snXG4gICAgICBAYWRkQ2xpY2s9J2FkZENsaWNrRnJvbUNoaWxkJ1xuICAgICAgdXBkYXRlQWN0aW9uTmFtZT0ndXBkYXRlQ2xpY2snXG4gICAgICBAdXBkYXRlQ2xpY2s9J3VwZGF0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgZGVsZXRlQWN0aW9uTmFtZT0nZGVsZXRlQ2xpY2snXG4gICAgICBAZGVsZXRlQ2xpY2s9J2RlbGV0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgaWRlbnQ9J3BheW1lbnRJZCdcbiAgICAgIDp1cGRhdGluZz0nZm9ybVN0YXRlLnVwZGF0ZSdcbiAgICAgIDphZGRpbmc9J2Zvcm1TdGF0ZS5hZGQnXG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6YWRtaW49J2FkbWluJ1xuICAgICAgOmRpc3BsYXk9J2Rpc3BsYXknXG4gICAgICA6bm9fZGF0YV9sYWJlbD0ndChcInBheW1lbnRzQ29tcG9uZW50LmVycm9ycy5lbXB0eS50YWJsZUJvZHlDb250ZW50VGV4dFwiKSdcbiAgICAgIDpub19kYXRhX2J1dHRvbl90ZXh0PSd0KFwicGF5bWVudHNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZ1wiKSdcbiAgICAgIDpkYkNvbm49J2RiQ29ubic+XG4gICAgICAgIDx0ZW1wbGF0ZSAjcGF5bWVudEZvcm0+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnPlxuICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT0nZm9ybVN0YXRlLmFkZCA/IFwiYWRkXCIgOiBcInVwZGF0ZVwiJyBzaXplPSdzbSc+PC9xLWljb24+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICA6dXNlLWlucHV0PSdmYWxzZSdcbiAgICAgICAgICAgICAgOnVzZS1jaGlwcz0nZmFsc2UnXG4gICAgICAgICAgICAgIDptdWx0aXBsZT0nZmFsc2UnXG4gICAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPScwJ1xuICAgICAgICAgICAgICB2LW1vZGVsPSdldGF0J1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QuZXRhdC5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LmV0YXQubGFiZWwnXG4gICAgICAgICAgICAgIG9wdGlvbi1kaXNhYmxlPVwiY2Fubm90U2VsZWN0XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9J3NlbGVjdEV0YXRzT3B0aW9uJ1xuICAgICAgICAgICAgICA6aGludD0ndChcInBheW1lbnRzQ29tcG9uZW50LmhpbnRzLmV0YXRcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlFdGF0IHx8IHQoXCJwYXltZW50c0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuZXRhdFwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nYXBwcm92YWwnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMubm9fb3B0aW9uX2V0YXQnKSB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcic+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPSdwYXltZW50VmFsdWUnXG4gICAgICAgICAgICAgIHR5cGU9J251bWJlcidcbiAgICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0LnBheW1lbnRWYWx1ZS5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnBheW1lbnRWYWx1ZS5sYWJlbCdcbiAgICAgICAgICAgICAgOnJlYWRvbmx5PSdmYWxzZSdcbiAgICAgICAgICAgICAgOmRpc2FibGU9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6aGludD0ndChcInBheW1lbnRzQ29tcG9uZW50LmhpbnRzLnBheW1lbnRWYWx1ZVwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6YXV0b2dyb3c9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6Y2xlYXJhYmxlPSd0cnVlJ1xuICAgICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgICAgOnBsYWNlaG9sZGVycz0ndChcInBheW1lbnRzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5wYXltZW50VmFsdWVcIiknXG4gICAgICAgICAgICAgIDpyZWFjdGl2ZS1ydWxlcz0ndHJ1ZSdcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5VmFsdWUgfHwgdChcInBheW1lbnRzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5wYXltZW50VmFsdWVcIiksXG4gICAgICAgICAgICAgICAgdmFsID0+IHZhbGlkVmFsdWUgfHwgdChcInBheW1lbnRzQ29tcG9uZW50LmVycm9ycy5lcnJvci5wYXltZW50VmFsdWVcIiwgeyB2YWw6IG1heFZhbHVlIH0pXG4gICAgICAgICAgICAgIF0nXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdwYXltZW50cycgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgICAgOnVzZS1pbnB1dD0nZmFsc2UnXG4gICAgICAgICAgICAgIDp1c2UtY2hpcHM9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6bXVsdGlwbGU9J2ZhbHNlJ1xuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT0nMCdcbiAgICAgICAgICAgICAgdi1tb2RlbD0ncGF5bWVudFR5cGUnXG4gICAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5wYXltZW50VHlwZS5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnBheW1lbnRUeXBlLmxhYmVsJ1xuICAgICAgICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPSdzZWxlY3RUeXBlc09wdGlvbidcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJwYXltZW50c0NvbXBvbmVudC5oaW50cy5wYXltZW50VHlwZVwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eVR5cGUgfHwgdChcInBheW1lbnRzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5wYXltZW50VHlwZVwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nY3JlZGl0X2NhcmQnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMubm9fb3B0aW9uX3R5cGUnKSB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcic+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICAgIDp1c2UtaW5wdXQ9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6dXNlLWNoaXBzPSdmYWxzZSdcbiAgICAgICAgICAgICAgOm11bHRpcGxlPSdmYWxzZSdcbiAgICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9JzAnXG4gICAgICAgICAgICAgIHYtbW9kZWw9J2ZhY3R1cmUnXG4gICAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5mYWN0dXJlLm5hbWUnXG4gICAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuZmFjdHVyZS5sYWJlbCdcbiAgICAgICAgICAgICAgb3B0aW9uLWRpc2FibGU9XCJjYW5ub3RTZWxlY3RcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz0nc2VsZWN0SW52b2ljZXNPcHRpb24nXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwicGF5bWVudHNDb21wb25lbnQuaGludHMuZmFjdHVyZVwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eUZhY3R1cmUgfHwgdChcInBheW1lbnRzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5mYWN0dXJlXCIpXG4gICAgICAgICAgICAgIF0nXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdyZWNlaXB0X2xvbmcnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMubm9fb3B0aW9uX2ludm9pY2UnKSB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnIGNsYXNzPVwiZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxxLWJ0biB2LWlmPVwiZm9ybVN0YXRlLmFkZFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIFxuICAgICAgICAgICAgICBpY29uPVwiYWRkX2NpcmNsZVwiIFxuICAgICAgICAgICAgICA6bGFiZWw9XCJ0KCdwYXltZW50c0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuYnV0dG9uQWRkaW5nJylcIiBcbiAgICAgICAgICAgICAgZ2xvc3N5IHVuZWxldmF0ZWRcbiAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiYWRkQ2xpY2tGcm9tQ2hpbGQoJGV2ZW50LCB0cnVlKVwiPiAgXG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHYtaWY9XCJmb3JtU3RhdGUudXBkYXRlXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIiBcbiAgICAgICAgICAgICAgaWNvbj1cInVwZGF0ZVwiIFxuICAgICAgICAgICAgICA6bGFiZWw9XCJ0KCdwYXltZW50c0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuYnV0dG9uVXBkYXRpbmcnKVwiIFxuICAgICAgICAgICAgICBnbG9zc3kgdW5lbGV2YXRlZFxuICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJmb3JtU3VibWl0QnV0dG9uU3RhdGVcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJ1cGRhdGVDbGlja0Zyb21DaGlsZCgkZXZlbnQsIHRydWUpXCI+ICBcbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdGFibGUtaXRlbT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgbmV4dFRpY2ssIHJlZiwgcHJvdmlkZSwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSAnc3RvcmVzL3VzZXInO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuaW1wb3J0IHsgdXNlUGF5bWVudFN0b3JlIH0gZnJvbSAnc3RvcmVzL3BheW1lbnQnO1xuaW1wb3J0IHsgdXNlSW52b2ljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL2ludm9pY2UnO1xuaW1wb3J0IFRhYmxlSXRlbSBmcm9tICcuL1RhYmxlSXRlbS52dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuaW1wb3J0IHBheW1lbnRBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvcGF5bWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IElucHV0T2JqZWN0Q29sbGVjdGlvbiwgRm9ybVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInO1xuLy8gaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgeyBvcGVuRGJDb25uZWN0aW9uLCBpc0RiQ29ubmVjdGlvbk9wZW4sIG5ld1J1biwgbmV3UXVlcnksIGNsb3NlRGJDb25uZWN0aW9uIH0gZnJvbSAnY2FwL3N0b3JhZ2UnO1xuaW1wb3J0IHsgc2V0Q3J5cHRBcGksIHNldERlY3J5cHRBcGksIF9fRk9STUFUT0JKX18sIF9fVFJBTlNGT1JNT0JKX18gfSBmcm9tICdzcmMvZ2xvYmFscyc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQYXltZW50UHJvcHMge1xuICBwYXltZW50Rm9ybT86IGJvb2xlYW47XG4gIGFkbWluOiBib29sZWFuO1xuICBkaXNwbGF5OiBib29sZWFuO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsO1xufTtcbmludGVyZmFjZSBEZWZhdWx0UGF5bWVudFJvdyB7XG4gIHBheW1lbnRJZDogbnVtYmVyO1xuICBldGF0OiBudW1iZXI7XG4gIHBheW1lbnRWYWx1ZTogbnVtYmVyO1xuICBwYXltZW50VHlwZTogbnVtYmVyO1xuICBmYWN0dXJlOiBzdHJpbmc7XG4gIGFjdGlvbnM6IHN0cmluZztcbn07XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQYXltZW50UHJvcHM+KCksIHtcbiAgcGF5bWVudEZvcm06IGZhbHNlLFxuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgYXBwID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5jb25zdCBrZXkgPSBhcHAuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4ka2V5O1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbi8vIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHsgdCB9ID0gdXNlSTE4bih7IHVzZVNjb3BlOiAnZ2xvYmFsJyB9KTtcbmNvbnN0IGRpc3BsYXlJbnB1dE9iamVjdDogSW5wdXRPYmplY3RDb2xsZWN0aW9uID0ge1xuICBldGF0OiB7XG4gICAgbGFiZWw6IHQoJ3BheW1lbnRzQ29tcG9uZW50LmlucHV0TGFiZWxzLmV0YXQnKSxcbiAgICBoZWFkOiB0KCdwYXltZW50c0NvbXBvbmVudC5oZWFkVGFibGUuZXRhdCcpLFxuICAgIG5hbWU6ICdldGF0JyxcbiAgICBwbGFjZWhvbGRlcjogdCgncGF5bWVudHNDb21wb25lbnQucGxhY2Vob2xkZXJzLmV0YXQnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIHBheW1lbnRWYWx1ZToge1xuICAgIGxhYmVsOiB0KCdwYXltZW50c0NvbXBvbmVudC5pbnB1dExhYmVscy5wYXltZW50VmFsdWUnKSxcbiAgICBoZWFkOiB0KCdwYXltZW50c0NvbXBvbmVudC5oZWFkVGFibGUucGF5bWVudFZhbHVlJyksXG4gICAgbmFtZTogJ3BheW1lbnRWYWx1ZScsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5wYXltZW50VmFsdWUnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIHBheW1lbnRUeXBlOiB7XG4gICAgbGFiZWw6IHQoJ3BheW1lbnRzQ29tcG9uZW50LmlucHV0TGFiZWxzLnBheW1lbnRUeXBlJyksXG4gICAgaGVhZDogdCgncGF5bWVudHNDb21wb25lbnQuaGVhZFRhYmxlLnBheW1lbnRUeXBlJyksXG4gICAgbmFtZTogJ3BheW1lbnRfdHlwZScsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5wYXltZW50VHlwZScpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgZmFjdHVyZToge1xuICAgIGxhYmVsOiB0KCdwYXltZW50c0NvbXBvbmVudC5pbnB1dExhYmVscy5mYWN0dXJlJyksXG4gICAgaGVhZDogdCgncGF5bWVudHNDb21wb25lbnQuaGVhZFRhYmxlLmZhY3R1cmUnKSxcbiAgICBuYW1lOiAnZmFjdHVyZScsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5mYWN0dXJlJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxufTtcbmxldCBhZGRJbnB1dE9iamVjdDogSW5wdXRPYmplY3RDb2xsZWN0aW9uID0ge1xuICBldGF0OiBkaXNwbGF5SW5wdXRPYmplY3QuZXRhdCxcbiAgcGF5bWVudFZhbHVlOiBkaXNwbGF5SW5wdXRPYmplY3QucGF5bWVudFZhbHVlLFxuICBwYXltZW50VHlwZTogZGlzcGxheUlucHV0T2JqZWN0LnBheW1lbnRUeXBlLFxuICBmYWN0dXJlOiBkaXNwbGF5SW5wdXRPYmplY3QuZmFjdHVyZSxcbiAgYWN0aW9uczoge1xuICAgIGxhYmVsOiB0KCdmb3Jtcy5oZWFkVGFibGUuYWN0aW9uJyksXG4gICAgbmFtZTogJ2FjdGlvbnMnLFxuICAgIGhlYWQ6IHQoJ2Zvcm1zLmhlYWRUYWJsZS5hY3Rpb24nKSxcbiAgICBwbGFjZWhvbGRlcnM6ICcnLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbn07XG5jb25zdCBhZG1pblByb3BSZWYgPSByZWYocHJvcHMuYWRtaW4pO1xuY29uc3QgZGlzcGxheVByb3BSZWYgPSByZWYocHJvcHMuZGlzcGxheSk7XG4vLyBjb25zb2xlLmxvZygnQ29tcG9uZW50Jyk7XG4vLyBjb25zb2xlLmxvZyhwcm9wcyk7XG5jb25zdCBpc0Zvcm0gPSByZWYocHJvcHMub3JkZXJGb3JtKTtcbmNvbnN0IG1lc3NhZ2VWaXNpYmlsaXR5ID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBheW1lbnRJZCA9IHJlZigwKTtcbmNvbnN0IGV0YXQgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RFdGF0c09wdGlvbiA9IHJlZihbXG4gIHtcbiAgICB2YWx1ZTogLTEsXG4gICAgbGFiZWw6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5ldGF0JyksXG4gICAgZXRhdDogLTEsXG4gICAgY2Fubm90U2VsZWN0OiB0cnVlXG4gIH0sXG4gIHtcbiAgICB2YWx1ZTogMCxcbiAgICBsYWJlbDogdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMuZXRhdHMubm90X3BhaWQnKSxcbiAgICBldGF0OiAwLFxuICAgIGNhbm5vdFNlbGVjdDogZmFsc2VcbiAgfSxcbiAge1xuICAgIHZhbHVlOiAxLFxuICAgIGxhYmVsOiB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy5ldGF0cy5wYWlkJyksXG4gICAgZXRhdDogMSxcbiAgICBjYW5ub3RTZWxlY3Q6IGZhbHNlXG4gIH1cbl0pO1xuY29uc3QgcGF5bWVudFZhbHVlID0gcmVmKDApO1xuY29uc3QgbWF4VmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhIWZhY3R1cmUudmFsdWUgPyBmYWN0dXJlLnZhbHVlLmludm9pY2VUVFByaWNlIDogMDtcbn0pO1xuY29uc3QgcGF5bWVudFR5cGUgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RUeXBlc09wdGlvbiA9IHJlZihbXSk7XG5jb25zdCBmYWN0dXJlID0gcmVmKG51bGwpO1xuY29uc3Qgc2VsZWN0SW52b2ljZXNPcHRpb24gPSByZWYoW10pO1xuY29uc3QgZm9ybVN0YXRlOiBSZWY8Rm9ybVN0YXRlPiA9ICh7XG4gIHVwZGF0ZTogZmFsc2UsXG4gIGFkZDogdHJ1ZSxcbn0pO1xuY29uc3QgZGVmYXVsdFJvdzogUmVmPERlZmF1bHRQYXltZW50Um93W10+ID0gcmVmKFtdKTtcbmNvbnN0IG5vbkVtcHR5RXRhdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICghIWV0YXQudmFsdWUgJiYgKGV0YXQudmFsdWUuZXRhdCAhPSAtMSkpO1xufSk7XG5jb25zdCB2YWxpZFZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gcGF5bWVudFZhbHVlLnZhbHVlIDw9IG1heFZhbHVlLnZhbHVlO1xufSk7XG5jb25zdCBub25FbXB0eVZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFwYXltZW50VmFsdWUudmFsdWUgJiYgcGF5bWVudFZhbHVlLnZhbHVlICE9ICcnID8gdHJ1ZSA6IGZhbHNlO1xufSk7XG5jb25zdCBub25FbXB0eVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoISFwYXltZW50VHlwZS52YWx1ZSAmJiBwYXltZW50VHlwZS52YWx1ZS52YWx1ZSAhPSAwKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlGYWN0dXJlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFmYWN0dXJlLnZhbHVlICYmIGZhY3R1cmUudmFsdWUudmFsdWUgIT0gMDtcbn0pO1xuY29uc3QgZm9ybVN1Ym1pdEJ1dHRvblN0YXRlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXQxID0gIShub25FbXB0eUV0YXQudmFsdWUgJiYgbm9uRW1wdHlUeXBlLnZhbHVlKTtcbiAgY29uc3QgcmV0MiA9ICEobm9uRW1wdHlWYWx1ZS52YWx1ZSAmJiB2YWxpZFZhbHVlLnZhbHVlICYmIG5vbkVtcHR5RmFjdHVyZS52YWx1ZSk7XG4gIC8vIGNvbnNvbGUubG9nKHJldDEpO1xuICAvLyBjb25zb2xlLmxvZyhyZXQyKTtcbiAgcmV0dXJuIHJldDEgfHwgcmV0Mjtcbn0pO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmICghIW9yaWVudGF0aW9uLnZhbHVlKXtcbiAgICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5sZXQgbWVzc2FnZVN0b3JlID0gbnVsbCwgcGF5bWVudFN0b3JlID0gbnVsbCwgcHJlZnMgPSBudWxsLCBpbnZvaWNlU3RvcmUgPSBudWxsLCB1c2VyU3RvcmUgPSBudWxsLCB1c2VyID0gbnVsbDtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgcGF5bWVudFN0b3JlID0gdXNlUGF5bWVudFN0b3JlKCk7XG4gIGludm9pY2VTdG9yZSA9IHVzZUludm9pY2VTdG9yZSgpO1xuICB1c2VyU3RvcmUgPSB1c2VVc2VyU3RvcmUoKTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSBtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXNWaXNpYmlsaXR5O1xuICB1c2VyID0gdXNlclN0b3JlLmdldFVzZXI7XG59IGVsc2Uge1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgaGFuZGxlT3JpZW50YXRpb24pO1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIHByZWZzID0gYXdhaXQgaW1wb3J0KCdjYXAvc3RvcmFnZS9wcmVmZXJlbmNlcycpO1xuICAgIGNvbnN0IG1lc3MgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdtZXNzYWdlJyk7XG4gICAgY29uc3QgdXNyID0gYXdhaXQgcHJlZnMuZ2V0UHJlZigndXNlcicpO1xuICAgIHVzZXIgPSAhIXVzciA/IHVzci51c2VyIDoge307XG4gICAgLy8gY29uc29sZS5sb2cobWVzcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzIDogW107XG4gICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgIGNvbnN0IHZpcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXNWaXNpYmlsaXR5IDogbWVzcztcbiAgICAvLyBjb25zb2xlLmxvZyh2aXMpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggJiYgdmlzID09PSBudWxsKSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdmlzICE9PSBudWxsID8gdmlzIDogZmFsc2U7XG4gICAgfVxuICB9KSgpO1xufVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlVGFibGVSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG4gIGF3YWl0IG5leHRUaWNrKCk7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KG9iajogYW55KSB7XG4gIC8vIGlmIChfX0tFWV9fID09PSBudWxsKSB7XG4gIC8vICAgYXdhaXQgc2V0R2VuQXBpKCk7XG4gIC8vIH1cbiAgYXdhaXQgc2V0Q3J5cHRBcGkoKTtcbiAgX19GT1JNQVRPQkpfXyhvYmosIGtleSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhc0ZvckZvcm1zKCkge1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgIGludm9pY2VTdG9yZS5nZXRBbGxJbnZvaWNlcyh1c2VyLnVzZXJJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICBzZWxlY3RJbnZvaWNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgICBvYmoubGFiZWwgPSB0KCdwYXltZW50c0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZmFjdHVyZScpO1xuICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgb2JqLmZhY3R1cmVJZCA9IDA7XG4gICAgICAgIG9iai5kYXRlID0gbnVsbDtcbiAgICAgICAgb2JqLmludm9pY2VIVFByaWNlID0gMDtcbiAgICAgICAgb2JqLmludm9pY2VUVFByaWNlID0gMDtcbiAgICAgICAgb2JqLmxhbmd1YWdlSWQgPSAwO1xuICAgICAgICBvYmouZGV2aXNlSWQgPSAwO1xuICAgICAgICBvYmoudHZhVmFsdWUgPSAwO1xuICAgICAgICBvYmouYnV5ZXJJZCA9IDA7XG4gICAgICAgIG9iai5zZWxsZXJJZCA9IDA7XG4gICAgICAgIG9iai5hZG1pbmlzdHJhdG9ySWQgPSAwO1xuICAgICAgICBzZWxlY3RJbnZvaWNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uZmFjdHVyZUlkO1xuICAgICAgICAgIG9iai5sYWJlbCA9IGAke3Jlc1trXS5mYWN0dXJlSWR9IC0gJHtyZXNba10uaW52b2ljZVRUUHJpY2V9YDtcbiAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgb2JqLmZhY3R1cmVJZCA9IHJlc1trXS5mYWN0dXJlSWQ7XG4gICAgICAgICAgb2JqLmRhdGUgPSByZXNba10uZGF0ZTtcbiAgICAgICAgICBvYmouaW52b2ljZUhUUHJpY2UgPSByZXNba10uaW52b2ljZUhUUHJpY2U7XG4gICAgICAgICAgb2JqLmludm9pY2VUVFByaWNlID0gcmVzW2tdLmludm9pY2VUVFByaWNlO1xuICAgICAgICAgIG9iai5sYW5ndWFnZUlkID0gcmVzW2tdLmxhbmd1YWdlSWQ7XG4gICAgICAgICAgb2JqLmRldmlzZUlkID0gcmVzW2tdLmRldmlzZUlkO1xuICAgICAgICAgIG9iai50dmFWYWx1ZSA9IHJlc1trXS50dmFWYWx1ZTtcbiAgICAgICAgICBvYmouYnV5ZXJJZCA9IHJlc1trXS5idXllcklkO1xuICAgICAgICAgIG9iai5zZWxsZXJJZCA9IHJlc1trXS5zZWxsZXJJZDtcbiAgICAgICAgICBvYmouYWRtaW5pc3RyYXRvcklkID0gcmVzW2tdLmFkbWluaXN0cmF0b3JJZDtcbiAgICAgICAgICBzZWxlY3RJbnZvaWNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfaW52b2ljZXMnLCB7ZXJyOiAnRW1wdHkgcmVzdWx0ICEnfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9pbnZvaWNlcycsIHtlcnI6IGVycn0pXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHBheW1lbnRTdG9yZS5nZXRBbGxQYXltZW50VHlwZXMoKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgIHNlbGVjdFR5cGVzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgICAgICBvYmoubGFiZWwgPSB0KCdwYXltZW50c0NvbXBvbmVudC5wbGFjZWhvbGRlcnMucGF5bWVudFR5cGUnKTtcbiAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICBvYmoucGF5bWVudFR5cGVJZCA9IDA7XG4gICAgICAgICAgc2VsZWN0VHlwZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHJlc1trXS5jYiA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmNiJykgOiAnJztcbiAgICAgICAgICAgIGxhYmVsID0gcmVzW2tdLmVzcCA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmVzcCcpIDogbGFiZWw7XG4gICAgICAgICAgICBsYWJlbCA9IHJlc1trXS5jaHEgPyB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy50eXBlcy5jaHEnKSA6IGxhYmVsO1xuICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10ucGF5bWVudFR5cGVJZDtcbiAgICAgICAgICAgIG9iai5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqLnBheW1lbnRUeXBlSWQgPSByZXNba10ucGF5bWVudFR5cGVJZDtcbiAgICAgICAgICAgIG9iai5jYiA9IHJlc1trXS5jYjtcbiAgICAgICAgICAgIG9iai5lc3AgPSByZXNba10uZXNwO1xuICAgICAgICAgICAgb2JqLmNocSA9IHJlc1trXS5jaHE7XG4gICAgICAgICAgICBzZWxlY3RUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF90eXBlcycsIHtlcnI6IGVycn0pXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIGxldCBzcWwgPSBgU0VMRUNUIFxcYGZhY3R1cmVcXGAuXFxgZmFjdHVyZUlkXFxgLCBcXGBmYWN0dXJlXFxgLlxcYGRhdGVcXGAsIFxcYGZhY3R1cmVcXGAuXFxgaW52b2ljZUhUUHJpY2VcXGAsIFxcYGZhY3R1cmVcXGAuXFxgaW52b2ljZVRUUHJpY2VcXGAsIFxcYGZhY3R1cmVcXGAuXFxgbGFuZ3VhZ2VJZFxcYCwgXFxgZmFjdHVyZVxcYC5cXGBkZXZpc2VJZFxcYCwgXFxgZmFjdHVyZVxcYC5cXGB0dmFWYWx1ZVxcYCwgXFxgZmFjdHVyZVxcYC5cXGBidXllcklkXFxgLCBcXGBmYWN0dXJlXFxgLlxcYHNlbGxlcklkXFxgLCBcXGBmYWN0dXJlXFxgLlxcYGFkbWluaXN0cmF0b3JJZFxcYCBGUk9NIFxcYGZhY3R1cmVcXGAgV0hFUkUgXFxgZmFjdHVyZVxcYC5cXGBhZG1pbmlzdHJhdG9ySWRcXGAgPSAnJHt1c2VyLnVzZXJJZH0nO2A7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgICAgbGV0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICBpZiAodmFsdWVzLnZhbHVlcykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgICBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18odmFsdWVzLnZhbHVlcyk7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgc2VsZWN0SW52b2ljZXNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgICAgb2JqLmxhYmVsID0gdCgncGF5bWVudHNDb21wb25lbnQucGxhY2Vob2xkZXJzLmZhY3R1cmUnKTtcbiAgICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICAgIG9iai5mYWN0dXJlSWQgPSAwO1xuICAgICAgICBvYmouZGF0ZSA9IG51bGw7XG4gICAgICAgIG9iai5pbnZvaWNlSFRQcmljZSA9IDA7XG4gICAgICAgIG9iai5pbnZvaWNlVFRQcmljZSA9IDA7XG4gICAgICAgIG9iai5sYW5ndWFnZUlkID0gMDtcbiAgICAgICAgb2JqLmRldmlzZUlkID0gMDtcbiAgICAgICAgb2JqLnR2YVZhbHVlID0gMDtcbiAgICAgICAgb2JqLmJ1eWVySWQgPSAwO1xuICAgICAgICBvYmouc2VsbGVySWQgPSAwO1xuICAgICAgICBvYmouYWRtaW5pc3RyYXRvcklkID0gMDtcbiAgICAgICAgc2VsZWN0SW52b2ljZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gdmFsdWVzLnZhbHVlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai5sYWJlbCA9IGAke3Jlc1trXS5mYWN0dXJlSWR9IC0gJHtyZXNba10uaW52b2ljZVRUUHJpY2V9YDtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uZmFjdHVyZUlkO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmouZmFjdHVyZUlkID0gcmVzW2tdLmZhY3R1cmVJZDtcbiAgICAgICAgICBvYmouZGF0ZSA9IHJlc1trXS5kYXRlO1xuICAgICAgICAgIG9iai5pbnZvaWNlSFRQcmljZSA9IHJlc1trXS5pbnZvaWNlSFRQcmljZTtcbiAgICAgICAgICBvYmouaW52b2ljZVRUUHJpY2UgPSByZXNba10uaW52b2ljZVRUUHJpY2U7XG4gICAgICAgICAgb2JqLmxhbmd1YWdlSWQgPSByZXNba10ubGFuZ3VhZ2VJZDtcbiAgICAgICAgICBvYmouZGV2aXNlSWQgPSByZXNba10uZGV2aXNlSWQ7XG4gICAgICAgICAgb2JqLnR2YVZhbHVlID0gcmVzW2tdLnR2YVZhbHVlO1xuICAgICAgICAgIG9iai5idXllcklkID0gcmVzW2tdLmJ1eWVySWQ7XG4gICAgICAgICAgb2JqLnNlbGxlcklkID0gcmVzW2tdLnNlbGxlcklkO1xuICAgICAgICAgIG9iai5hZG1pbmlzdHJhdG9ySWQgPSByZXNba10uYWRtaW5pc3RyYXRvcklkO1xuICAgICAgICAgIHNlbGVjdEludm9pY2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTsgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGZldGNoZWRgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfaW52b2ljZXMnLCB7IGVycjogJ1NlbGVjdCBmcm9tIGludm9pY2UgdGFibGUgb2YgU1FMaXRlIERCICEnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTsgXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHNxbCA9ICdTRUxFQ1QgXFxgcGF5bWVudF90eXBlXFxgLlxcYHBheW1lbnRUeXBlSWRcXGAsIFxcYHBheW1lbnRfdHlwZVxcYC5cXGBjYlxcYCwgXFxgcGF5bWVudF90eXBlXFxgLlxcYGVzcFxcYCwgXFxgcGF5bWVudF90eXBlXFxgLlxcYGNocVxcYCBGUk9NIFxcYHBheW1lbnRfdHlwZVxcYDsnO1xuICAgICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICAgIHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICBpZiAodmFsdWVzLnZhbHVlcykge1xuICAgICAgICAvLyBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgIC8vIGNvbnN0IHJlcyA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18odmFsdWVzLnZhbHVlcyk7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgc2VsZWN0VHlwZXNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgICAgb2JqLmxhYmVsID0gdCgncGF5bWVudHNDb21wb25lbnQucGxhY2Vob2xkZXJzLnBheW1lbnRUeXBlJyk7XG4gICAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgICBvYmoucGF5bWVudFR5cGVJZCA9IDA7XG4gICAgICAgIG9iai5jYiA9IGZhbHNlO1xuICAgICAgICBvYmouZXNwID0gZmFsc2U7XG4gICAgICAgIG9iai5jaHEgPSBmYWxzZTtcbiAgICAgICAgc2VsZWN0VHlwZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gdmFsdWVzLnZhbHVlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIGxldCBsYWJlbCA9IHZhbHVlcy52YWx1ZXNba10uY2IgPyB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy50eXBlcy5jYicpIDogJyc7XG4gICAgICAgICAgbGFiZWwgPSB2YWx1ZXMudmFsdWVzW2tdLmVzcCA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmVzcCcpIDogbGFiZWw7XG4gICAgICAgICAgbGFiZWwgPSB2YWx1ZXMudmFsdWVzW2tdLmNocSA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmNocScpIDogbGFiZWw7XG4gICAgICAgICAgb2JqLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgb2JqLnZhbHVlID0gdmFsdWVzLnZhbHVlc1trXS5wYXltZW50VHlwZUlkO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoucGF5bWVudFR5cGVJZCA9IHZhbHVlcy52YWx1ZXNba10ucGF5bWVudFR5cGVJZDtcbiAgICAgICAgICBvYmouY2IgPSB2YWx1ZXMudmFsdWVzW2tdLmNiO1xuICAgICAgICAgIG9iai5lc3AgPSB2YWx1ZXMudmFsdWVzW2tdLmVzcDtcbiAgICAgICAgICBvYmouY2hxID0gdmFsdWVzLnZhbHVlc1trXS5jaHE7XG4gICAgICAgICAgc2VsZWN0VHlwZXNPcHRpb24udmFsdWUucHVzaChvYmopOyAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF90eXBlcycsIHsgZXJyOiAnU2VsZWN0IGZyb20gcGF5bWVudF90eXBlIHRhYmxlIG9mIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pOyBcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfaW52b2ljZXMnLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTsgXG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gYWRkQ2xpY2tGcm9tQ2hpbGQoZTogRXZlbnQsIGRiOiBib29sZWFuKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKCFkYikge1xuICAgIGF3YWl0IGZldGNoRGF0YXNGb3JGb3JtcygpO1xuICAgIHBheW1lbnRJZC52YWx1ZSA9IDA7XG4gICAgZXRhdC52YWx1ZSA9IHt2YWx1ZTogLTEsIGxhYmVsOiB0KCdwYXltZW50c0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZXRhdCcpLCBldGF0OiAtMSwgY2Fubm90U2VsZWN0OiB0cnVlfTtcbiAgICBwYXltZW50VmFsdWUudmFsdWUgPSAwO1xuICAgIHBheW1lbnRUeXBlLnZhbHVlID0ge3ZhbHVlOiAwLCBsYWJlbDogdCgncGF5bWVudHNDb21wb25lbnQucGxhY2Vob2xkZXJzLnBheW1lbnRUeXBlJyksIGNhbm5vdFNlbGVjdDogdHJ1ZSwgcGF5bWVudElkOiAwfTtcbiAgICBmYWN0dXJlLnZhbHVlID0ge3ZhbHVlOiAwLCBsYWJlbDogdCgncGF5bWVudHNDb21wb25lbnQucGxhY2Vob2xkZXJzLmZhY3R1cmUnKSwgY2Fubm90U2VsZWN0OiB0cnVlLCBmYWN0dXJlSWQ6IDAsIGRhdGU6IG51bGwsIGludm9pY2VIVFByaWNlOiAwLCBpbnZvaWNlVFRQcmljZTogMCwgbGFuZ3VhZ2VJZDogMCwgZGV2aXNlSWQ6IDAsIHR2YVZhbHVlOiAwLCBidXllcklkOiAwLCBzZWxsZXJJZDogMCwgYWRtaW5pc3RyYXRvcklkOiAwfTtcbiAgICBhZG1pblByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgaXNGb3JtLnZhbHVlID0gdHJ1ZTtcbiAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIHBheW1lbnRJZDogMCxcbiAgICAgIGV0YXQ6IG51bGwsXG4gICAgICBwYXltZW50VmFsdWU6IDAsXG4gICAgICBwYXltZW50VHlwZTogbnVsbCxcbiAgICAgIGZhY3R1cmU6IG51bGwsXG4gICAgICBhY3Rpb25zOiAnJyxcbiAgICB9O1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUubG9nKCdBZGRpbmcgcGF5bWVudCB0byBkYiAhJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgICAgcmV0ID0gYXdhaXQgaW5zZXJ0UGF5bWVudEluRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9IFxuICAgICAgaWYgKHByb3BzLmRpc3BsYXkpe1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBhd2FpdCBpbnNlcnRQYXltZW50SW5TUUxpdGVEYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5kaXNwbGF5KXtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKHJldCkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQ2xpY2tGcm9tQ2hpbGQoZTogRXZlbnQsIGRiOiBib29sZWFuLCBvYmo6IGFueSA9IG51bGwpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoIWRiKSB7XG4gICAgYXdhaXQgZmV0Y2hEYXRhc0ZvckZvcm1zKCk7XG4gICAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgICBpc0Zvcm0udmFsdWUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS51cGRhdGUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS5hZGQgPSBmYWxzZTtcbiAgICBkZWZhdWx0Um93LnZhbHVlWzBdID0ge1xuICAgICAgcGF5bWVudElkOiBvYmoucGF5bWVudElkLFxuICAgICAgZXRhdDogb2JqLmV0YXQsXG4gICAgICBwYXltZW50VmFsdWU6IG9iai5wYXltZW50VmFsdWUsXG4gICAgICBwYXltZW50VHlwZTogb2JqLnBheW1lbnRfdHlwZSxcbiAgICAgIGZhY3R1cmU6IG9iai5mYWN0dXJlLFxuICAgICAgYWN0aW9uczogJydcbiAgICB9O1xuICAgIG9iai5mYWN0dXJlLnZhbHVlID0gb2JqLmZhY3R1cmUuZmFjdHVyZUlkO1xuICAgIG9iai5mYWN0dXJlLmxhYmVsID0gYCR7b2JqLmZhY3R1cmUuZmFjdHVyZUlkfSAtICR7b2JqLmZhY3R1cmUuaW52b2ljZVRUUHJpY2V9YDtcbiAgICBvYmouZmFjdHVyZS5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICBsZXQgbGFiZWwgPSBvYmoucGF5bWVudF90eXBlLmNiID8gdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMudHlwZXMuY2InKSA6ICcnO1xuICAgIGxhYmVsID0gb2JqLnBheW1lbnRfdHlwZS5lc3AgPyB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy50eXBlcy5lc3AnKSA6IGxhYmVsO1xuICAgIGxhYmVsID0gb2JqLnBheW1lbnRfdHlwZS5jaHEgPyB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy50eXBlcy5jaHEnKSA6IGxhYmVsO1xuICAgIHBheW1lbnRJZC52YWx1ZSA9IG9iai5wYXltZW50SWQ7XG4gICAgZXRhdC52YWx1ZSA9IHt2YWx1ZTogb2JqLmV0YXQsIGxhYmVsOiBvYmouZXRhdCA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLmV0YXRzLnBhaWQnKSA6IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLmV0YXRzLm5vdF9wYWlkJykgLCBldGF0OiBvYmouZXRhdCwgY2Fubm90U2VsZWN0OiBmYWxzZX07XG4gICAgcGF5bWVudFZhbHVlLnZhbHVlID0gb2JqLnBheW1lbnRWYWx1ZTtcbiAgICBwYXltZW50VHlwZS52YWx1ZSA9IHt2YWx1ZTogb2JqLnBheW1lbnRfdHlwZS5wYXltZW50VHlwZUlkLCBsYWJlbDogbGFiZWwsIHBheW1lbnRUeXBlSWQ6IG9iai5wYXltZW50X3R5cGUucGF5bWVudFR5cGVJZCwgY2I6IG9iai5wYXltZW50X3R5cGUuY2IsIGVzcDogb2JqLnBheW1lbnRfdHlwZS5lc3AsIGNocTogb2JqLnBheW1lbnRfdHlwZS5jaHEsIGNhbm5vdFNlbGVjdDogZmFsc2V9O1xuICAgIGZhY3R1cmUudmFsdWUgPSBvYmouZmFjdHVyZTtcbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBjb25zb2xlLmxvZygnVXBkYXRlIHBheW1lbnQgdG8gZGIgIScpO1xuICAgIGxldCByZXQ7XG4gICAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICAgIHJldCA9IGF3YWl0IHVwZGF0ZVBheW1lbnRJbkRiKCk7XG4gICAgICBpZiAocmV0KXtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0ID0gYXdhaXQgdXBkYXRlUGF5bWVudEluU1FMaXRlRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKHJldCkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2xpY2tGcm9tQ2hpbGQoZTogRXZlbnQsIGlkOiBudW1iZXIpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyBjb25zb2xlLmxvZygnRGVsZXRpbmcgcGF5bWVudCBmcm9tIGRiICEnKTtcbiAgbGV0IHJldDtcbiAgcGF5bWVudElkLnZhbHVlID0gaWQ7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgcmV0ID0gZGVsZXRlUGF5bWVudEZyb21EYigpO1xuICAgIGlmIChyZXQpIHtcbiAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgfVxuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGF3YWl0IGRlbGV0ZVBheW1lbnRGcm9tU1FMaXRlRGIoKTtcbiAgICBpZiAocmV0KSB7XG4gICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIH1cbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuICBpZiAocmV0KSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICBtZXNzYWdlOiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLm9rLmRlbGV0ZScpXG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgbWVzc2FnZTogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5kZWxldGUnKVxuICAgIH0pO1xuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0UGF5bWVudEluRGIoKSB7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBldGF0OiBldGF0LnZhbHVlLmV0YXQsXG4gICAgcGF5bWVudFZhbHVlOiBwYXJzZUZsb2F0KHBheW1lbnRWYWx1ZS52YWx1ZSksXG4gICAgcGF5bWVudFR5cGU6IHBheW1lbnRUeXBlLnZhbHVlLnBheW1lbnRUeXBlSWQsXG4gICAgZmFjdHVyZUlkOiBmYWN0dXJlLnZhbHVlLmZhY3R1cmVJZFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgcmV0dXJuIHBheW1lbnRBeGlvc1NlcnZpY2UuY3JlYXRlKG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5vay5hZGQnKVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnLCB7ZXJyOiBlcnJ9KVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGluc2VydFBheW1lbnRJblNRTGl0ZURiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZXRhdDogZXRhdC52YWx1ZS5ldGF0LFxuICAgIHBheW1lbnRWYWx1ZTogcGFyc2VGbG9hdChwYXltZW50VmFsdWUudmFsdWUpLFxuICAgIHBheW1lbnRUeXBlOiBwYXltZW50VHlwZS52YWx1ZS5wYXltZW50VHlwZUlkLFxuICAgIGZhY3R1cmVJZDogZmFjdHVyZS52YWx1ZS5mYWN0dXJlSWRcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSAgYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICEhaXNPcGVuIHx8ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGlmIChpc09wZW4pIHtcbiAgICBsZXQgc3FsID0gJ0lOU0VSVCBJTlRPIFxcYHBheW1lbnRcXGAgKFxcYGV0YXRcXGAsIFxcYHBheW1lbnRWYWx1ZVxcYCwgXFxgcGF5bWVudFR5cGVcXGAsIFxcYGZhY3R1cmVJZFxcYCkgVkFMVUVTICg/LCA/LCA/LCA/KTsnO1xuICAgIGxldCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmouZXRhdCwgb2JqLnBheW1lbnRWYWx1ZSwgb2JqLnBheW1lbnRUeXBlLCBvYmouZmFjdHVyZUlkXSk7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnLCB7IGVycjogJ0FkZGluZyBwYXltZW50IHRvIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgIG1lc3NhZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnIH0pXG4gICAgICB9XG4gICAgXSxcbiAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgfSk7XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBheW1lbnRJbkRiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZXRhdDogZXRhdC52YWx1ZS5ldGF0LFxuICAgIHBheW1lbnRWYWx1ZTogcGFyc2VGbG9hdChwYXltZW50VmFsdWUudmFsdWUpLFxuICAgIHBheW1lbnRUeXBlOiBwYXltZW50VHlwZS52YWx1ZS5wYXltZW50VHlwZUlkLFxuICAgIGZhY3R1cmVJZDogZmFjdHVyZS52YWx1ZS5mYWN0dXJlSWRcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIHJldHVybiBwYXltZW50QXhpb3NTZXJ2aWNlLnVwZGF0ZShwYXltZW50SWQudmFsdWUsIG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7ZXJyOiBlcnJ9KVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBheW1lbnRJblNRTGl0ZURiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZXRhdDogZXRhdC52YWx1ZS5ldGF0LFxuICAgIHBheW1lbnRWYWx1ZTogcGFyc2VGbG9hdChwYXltZW50VmFsdWUudmFsdWUpLFxuICAgIHBheW1lbnRUeXBlOiBwYXltZW50VHlwZS52YWx1ZS5wYXltZW50VHlwZUlkLFxuICAgIGZhY3R1cmVJZDogZmFjdHVyZS52YWx1ZS5mYWN0dXJlSWRcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gISFpc09wZW4gfHwgIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICBsZXQgc3FsID0gJ1VQREFURSBcXGBwYXltZW50XFxgIFNFVCBcXGBldGF0XFxgPT8sIFxcYHBheW1lbnRWYWx1ZVxcYD0/LCBcXGBwYXltZW50VHlwZVxcYD0/LCBcXGBmYWN0dXJlSWRcXGA9PyBXSEVSRSBcXGBwYXltZW50SWRcXGAgPSA/Oyc7XG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbb2JqLmV0YXQsIG9iai5wYXltZW50VmFsdWUsIG9iai5wYXltZW50VHlwZSwgb2JqLmZhY3R1cmVJZCwgcGF5bWVudElkLnZhbHVlXSk7XG4gICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHsgZXJyOiAnVXBkYXRpbmcgcGF5bWVudCB0byBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBkZWxldGVQYXltZW50RnJvbURiKCkge1xuICByZXR1cm4gcGF5bWVudEF4aW9zU2VydmljZS5kZWxldGUocGF5bWVudElkLnZhbHVlKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLm9rLmRlbGV0ZScpXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZGVsZXRlUGF5bWVudEZyb21TUUxpdGVEYigpIHtcbiAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICBpZiAoaXNPcGVuKSB7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIGNvbnN0IHNxbCA9IGBERUxFVEUgRlJPTSBcXGBwYXltZW50XFxgIFdIRVJFIFxcYHBheW1lbnRJZFxcYD0gJyR7cGF5bWVudElkLnZhbHVlfSc7YDtcbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgIGlmICh2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3BheW1lbnRzQ29tcG9uZW50LnJlc3VsdHMub2suZGVsZXRlJylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdwYXltZW50c0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6ICdEZWxldGluZyBwYXltZW50IGZyb20gU1FMaXRlIERCICEnfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgncGF5bWVudHNDb21wb25lbnQucmVzdWx0cy5rby5kZWxldGUnLCB7ZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICB9KTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gaGFuZGxlT3JpZW50YXRpb24oKXtcbiAgLy8gY29uc29sZS5sb2coc2NyZWVuLm9yaWVudGF0aW9uKTtcbiAgb3JpZW50YXRpb24udmFsdWUgPSBzY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbn07XG5cbi8vIFdBVENIRVJTXG53YXRjaCgoKSA9PiBbIHByb3BzLmFkbWluLCBwcm9wcy5kaXNwbGF5LCBwcm9wcy5wYXltZW50Rm9ybSBdLFxuICAoW25ld0FkbWluUHJvcCwgbmV3RGlzcGxheVByb3AsIG5ld1BheW1lbnRGb3JtXSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGBuZXdBZG1pblByb3AgLT4gJHtuZXdBZG1pblByb3B9L25ld0Rpc3BsYXlQcm9wIC0tPiAke25ld0Rpc3BsYXlQcm9wfS9uZXdQYXltZW50Rm9ybSAtLT4gJHtuZXdQYXltZW50Rm9ybX1gKTtcbiAgICBhZG1pblByb3BSZWYudmFsdWUgPSBuZXdBZG1pblByb3A7XG4gICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBuZXdEaXNwbGF5UHJvcDtcbiAgICBpc0Zvcm0udmFsdWUgPSBuZXdQYXltZW50Rm9ybTtcbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuKTtcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xuXG4vLyBPVEhFUlNcbnByb3ZpZGUoJ3NyYycsICdwYXltZW50cycpO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZyBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1zdGFydFwiIHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIj5cbiAgICA8IS0tIGNvbnRlbnQgLS0+XG4gICAgPHBheW1lbnQtY29tcG9uZW50XG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6cGF5bWVudEZvcm09J3BheW1lbnRGb3JtJ1xuICAgICAgOmFkbWluPSdhZG1pblByb3AnXG4gICAgICA6ZGlzcGxheT0nZGlzcGxheVByb3AnXG4gICAgICA6ZGJDb25uPSdkYkNvbm4nPjwvcGF5bWVudC1jb21wb25lbnQ+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgbmV4dFRpY2ssIHdhdGNoLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCBQYXltZW50Q29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvUGF5bWVudENvbXBvbmVudC52dWUnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcblxuLy9WQVJJQUJMRVNcbmludGVyZmFjZSBQYWdlUHJvcHMge1xuICBhZG1pbjogYm9vbGVhbjtcbiAgZGlzcGxheTogYm9vbGVhbjtcbiAgZGJDb25uPzogU1FMaXRlREJDb25uZWN0aW9uIHwgbnVsbDtcbn07XG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQYWdlUHJvcHM+KCksIHtcbiAgYWRtaW46IHRydWUsXG4gIGRpc3BsYXk6IGZhbHNlLFxuICBkYkNvbm46IG51bGxcbn0pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2hhbmdlLXRhYiddKTtcbmNvbnN0IGFkbWluUHJvcCA9IHJlZihwcm9wcy5hZG1pbik7XG5jb25zdCBkaXNwbGF5UHJvcCA9IHJlZihwcm9wcy5kaXNwbGF5KTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHBheW1lbnRGb3JtID0gcmVmKGZhbHNlKTtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocm91dGUucGFyYW1zLnR5cGUgIT0gJycpIHtcbiAgYWRtaW5Qcm9wLnZhbHVlID0gcm91dGUucGFyYW1zLnR5cGUgPT09ICdhZG1pbicgPyB0cnVlIDogZmFsc2U7XG4gIGRpc3BsYXlQcm9wLnZhbHVlID0gcm91dGUucGFyYW1zLnR5cGUgPT09ICdkaXNwbGF5JyA/IHRydWUgOiBmYWxzZTtcbn1cblxuLy8gV0FUQ0hFUlNcbndhdGNoKFxuICByb3V0ZSxcbiAgYXN5bmMgKG5ld1IpID0+IHtcbiAgICBhZG1pblByb3AudmFsdWUgPSBuZXdSLnBhcmFtcy50eXBlID09PSAnYWRtaW4nID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGRpc3BsYXlQcm9wLnZhbHVlID0gbmV3Ui5wYXJhbXMudHlwZSA9PT0gJ2Rpc3BsYXknID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHBheW1lbnRGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgZm9yY2VQYXltZW50UmVyZW5kZXIoKTtcbiAgfSxcbik7XG5cbi8vIEZVTkNUSU9OU1xuYXN5bmMgZnVuY3Rpb24gZm9yY2VQYXltZW50UmVyZW5kZXIoKSB7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IGZhbHNlO1xuICBuZXh0VGljaygpO1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSB0cnVlO1xufTtcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xub25Nb3VudGVkKCgpID0+IHtcbiAgZW1pdCgnY2hhbmdlLXRhYicsIHVuZGVmaW5lZCk7XG59KTtcbjwvc2NyaXB0PlxuIl0sImZpbGUiOiJhc3NldHMvUGF5bWVudFBhZ2UuanMifQ==
