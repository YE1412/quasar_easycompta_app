import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, an as useRouter, f as ref, ao as useI18n, d as computed, _ as __vitePreload, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, Q as QIcon, aa as toDisplayString, j as QBtn, aq as unref, a9 as createTextVNode, a8 as Fragment, o as onMounted, a0 as resolveComponent } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { Q as QTr, a as QTd, f as QCheckbox, b as QTable } from "./QTable.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { u as useInvoiceStore } from "./invoice.js";
import { u as useSessionStore } from "./session.js";
import { u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, n as newQuery, s as setDecryptApi, _ as __TRANSFORMOBJ__, c as closeDbConnection } from "./use-quasar.js";
import "./QList.js";
import "./QSelect.js";
import "./use-prevent-scroll.js";
import "./invoice.service.js";
import "./index4.js";
import "./index2.js";
import "./session.service.js";
import "./WasmModules.js";
const _hoisted_1 = { style: { "width": "100%" } };
const _hoisted_2 = { class: "q-pa-md" };
const _hoisted_3 = { class: "full-width row flex-center text-accent q-gutter-sm" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExportComponent",
  props: {
    dbConn: { default: null }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const $q = useQuasar();
    const platform = $q.platform;
    const renderComponent = ref(true);
    const { t } = useI18n({ useScope: "global" });
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
        name: "factureId",
        label: "#",
        field: "factureId",
        align: "center",
        sortable: false
      },
      {
        name: "date",
        label: t("invoicesComponent.headTable.date"),
        field: "date",
        align: "center",
        sortable: false
      },
      {
        name: "invoiceHTPrice",
        label: t("invoicesComponent.headTable.invoiceHTPrice"),
        field: "invoiceHTPrice",
        align: "center",
        sortable: false
      },
      {
        name: "invoiceTTPrice",
        label: t("invoicesComponent.headTable.invoiceTTPrice"),
        field: "invoiceTTPrice",
        align: "center",
        sortable: false
      },
      {
        name: "langue",
        label: t("invoicesComponent.headTable.language"),
        field: "langue",
        align: "center",
        sortable: false
      },
      {
        name: "devise",
        label: t("invoicesComponent.headTable.devise"),
        field: "devise",
        align: "center",
        sortable: false
      },
      {
        name: "tvaValue",
        label: t("invoicesComponent.headTable.tva"),
        field: "tvaValue",
        align: "center",
        sortable: false
      },
      {
        name: "buyer",
        label: t("invoicesComponent.headTable.buyer"),
        field: "buyer",
        align: "center",
        sortable: false
      },
      {
        name: "seller",
        label: t("invoicesComponent.headTable.seller"),
        field: "seller",
        align: "center",
        sortable: false
      },
      {
        name: "payments",
        label: t("invoicesComponent.headTable.payment"),
        field: "payments",
        align: "center",
        sortable: false
      },
      {
        name: "commandes",
        label: t("invoicesComponent.headTable.commande"),
        field: "commandes",
        align: "center",
        sortable: false
      },
      {
        name: "actions",
        label: t("forms.headTable.action"),
        field: "actions",
        align: "center",
        sortable: false
      }
    ]);
    const contentsForDisp = computed(() => {
      let ret = [];
      for (const key in invoiceIds.value) {
        ret[key] = {};
        ret[key]["factureId"] = invoiceIds.value[key];
        ret[key]["date"] = tableInvoicesDateLibelle(key);
        ret[key]["invoiceHTPrice"] = invoiceHTPrices.value[key];
        ret[key]["invoiceTTPrice"] = invoiceTTPrices.value[key];
        ret[key]["langue"] = tableInvoicesLangueLibelle(key);
        ret[key]["devise"] = tableInvoicesDeviseLibelle(key);
        ret[key]["tvaValue"] = tableInvoicesVATLibelle(key);
        ret[key]["buyer"] = tableInvoicesBuyerLibelle(key);
        ret[key]["seller"] = tableInvoicesSellerLibelle(key);
        ret[key]["commandes"] = tableInvoicesOrdersLibelle(invoiceIds.value[key]);
        ret[key]["payments"] = tableInvoicesPaymentsLibelle(invoiceIds.value[key]);
      }
      return ret;
    });
    const selectedIds = ref([]);
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
    let messageStore = null, invoiceStore = null, sessionStore = null, prefs = null, userStore = null, session = null;
    if (platform.is.desktop) {
      messageStore = useMessageStore();
      invoiceStore = useInvoiceStore();
      sessionStore = useSessionStore();
      userStore = useUserStore();
      if (messageStore.getMessages.length) {
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
      }
      admin.value = userStore.getUser.userId;
      fetchDatasForTable();
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        const mess = await prefs.getPref("message");
        const usr = await prefs.getPref("user");
        session = await prefs.getPref("session");
        const user = !!usr ? usr.user : {};
        const messages = !!mess ? mess.messages : [];
        const vis = !!mess ? mess.messagesVisibility : mess;
        if (messages.length && vis === null) {
          messageVisibility.value = true;
        } else {
          messageVisibility.value = vis !== null ? vis : false;
        }
        admin.value = user.userId;
        fetchDatasForTable();
      })();
    }
    async function fetchDatasForTable() {
      if (platform.is.desktop) {
        invoiceStore.getAllInvoices(admin.value).then((res) => {
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
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("exportComponent.results.ko.fetch_invoices.linked_error", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
      } else {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          const sql = `SELECT \`facture\`.\`factureId\`, \`facture\`.\`date\`, \`facture\`.\`invoiceHTPrice\`, \`facture\`.\`invoiceTTPrice\`, \`facture\`.\`tvaValue\`, \`langue\`.\`langueId\` AS \`langue.langueId\`, \`langue\`.\`libelle\` AS \`langue.libelle\`, \`langue\`.\`nom\` AS \`langue.nom\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`buyer\`.\`actorId\` AS \`buyer.actorId\`, \`buyer\`.\`cp\` AS \`buyer.cp\`, \`buyer\`.\`email\` AS \`buyer.email\`, \`buyer\`.\`nom\` AS \`buyer.nom\`, \`buyer\`.\`nomRue\` AS \`buyer.nomRue\`, \`buyer\`.\`numCommercant\` AS \`buyer.numCommercant\`, \`buyer\`.\`numRue\` AS \`buyer.numRue\`, \`buyer\`.\`prenom\` AS \`buyer.prenom\`, \`buyer\`.\`tel\` AS \`buyer.tel\`, \`buyer\`.\`actorTypeId\` AS \`buyer.actorTypeId\`, \`buyer\`.\`ville\` AS \`buyer.ville\`, \`seller\`.\`actorId\` AS \`seller.actorId\`, \`seller\`.\`cp\` AS \`seller.cp\`, \`seller\`.\`email\` AS \`seller.email\`, \`seller\`.\`nom\` AS \`seller.nom\`, \`seller\`.\`nomRue\` AS \`seller.nomRue\`, \`seller\`.\`numCommercant\` AS \`seller.numCommercant\`, \`seller\`.\`numRue\` AS \`seller.numRue\`, \`seller\`.\`prenom\` AS \`seller.prenom\`, \`seller\`.\`tel\` AS \`seller.tel\`, \`seller\`.\`actorTypeId\` AS \`seller.actorTypeId\`, \`seller\`.\`ville\` AS \`seller.ville\`, \`commandes\`.\`orderId\` AS \`commandes.orderId\`, \`commandes\`.\`contenuAdditionnel\` AS \`commandes.contenuAdditionnel\`, \`commandes\`.\`priceHt\` AS \`commandes.priceHt\`, \`commandes\`.\`factureId\` AS \`commandes.factureId\`, \`payments\`.\`paymentId\` AS \`payments.paymentId\`, \`payments\`.\`etat\` AS \`payments.etat\`, \`payments\`.\`paymentValue\` AS \`payments.paymentValue\`, \`payments\`.\`paymentType\` AS \`payments.paymentType\`, \`payments\`.\`factureId\` AS \`payments.factureId\` FROM \`facture\` AS \`facture\` LEFT OUTER JOIN \`langue\` AS \`langue\` ON \`facture\`.\`languageId\` = \`langue\`.\`langueId\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`facture\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`personne\` AS \`buyer\` ON \`facture\`.\`buyerId\` = \`buyer\`.\`actorId\` LEFT OUTER JOIN \`personne\` AS \`seller\` ON \`facture\`.\`sellerId\` = \`seller\`.\`actorId\` LEFT OUTER JOIN \`commande\` AS \`commandes\` ON \`facture\`.\`factureId\` = \`commandes\`.\`factureId\` LEFT OUTER JOIN \`payment\` AS \`payments\` ON \`facture\`.\`factureId\` = \`payments\`.\`factureId\` WHERE \`facture\`.\`administratorId\` = '${admin.value}' GROUP BY \`facture\`.\`factureId\`, \`payments.paymentId\`, \`commandes.orderId\`;`;
          const values = await newQuery(props.dbConn, sql);
          if (!!values && values.values.length) {
            const intRes = sanitizeQueryResult(values.values);
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
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("exportComponent.results.ko.fetch_invoices.linked_error")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          }
          closeDbConnection(props.dbConn);
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("forms.errors.error.sqliteDb")
              }
            ],
            messagesVisibility: true
          });
          messageVisibility.value = true;
        }
      }
    }
    function tableInvoicesBuyerLibelle(ind) {
      let ret = "";
      let libelle = `${buyers.value[ind].actorId} - ${buyers.value[ind].prenom} ${buyers.value[ind].nom}`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesSellerLibelle(ind) {
      let ret = "";
      let libelle = `${sellers.value[ind].actorId} - ${sellers.value[ind].prenom} ${sellers.value[ind].nom}`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesOrdersLibelle(invId) {
      let ret = "", libelle = "";
      for (const m in orders.value[`${invId}`]) {
        libelle = `${orders.value[`${invId}`][m].orderId} - ${orders.value[`${invId}`][m].priceHt}`;
        ret += m != orders.value[`${invId}`].length - 1 ? `${libelle}, ` : libelle;
      }
      ret = ret === "" ? t("invoicesComponent.libelles.no_order") : ret;
      return ret;
    }
    function tableInvoicesDeviseLibelle(ind) {
      let ret = "";
      let libelle = !!devises.value[ind] ? `${devises.value[ind].symbole} - ${devises.value[ind].libelle}` : t("invoicesComponent.libelles.no_devise");
      ret = libelle;
      return ret;
    }
    function tableInvoicesLangueLibelle(ind) {
      let ret = "";
      let libelle = !!languages.value[ind] ? languages.value[ind]["libelle"] : t("invoicesComponent.libelles.no_language");
      ret = libelle;
      return ret;
    }
    function tableInvoicesPaymentsLibelle(invId) {
      let ret = "", libelle = "", state = "";
      for (const m in payments.value[`${invId}`]) {
        state = payments.value[`${invId}`][m].etat === 0 ? t("paymentsComponent.libelles.etats.not_paid") : "";
        state = payments.value[`${invId}`][m].etat === 1 ? t("paymentsComponent.libelles.etats.paid") : state;
        libelle = `${payments.value[`${invId}`][m].paymentId} - ${state} - ${payments.value[`${invId}`][m].paymentValue}`;
        ret += m != payments.value[`${invId}`].length - 1 ? `${libelle}, ` : libelle;
      }
      ret = ret === "" ? t("invoicesComponent.libelles.no_payment") : ret;
      return ret;
    }
    function tableInvoicesVATLibelle(ind) {
      let ret = "", libelle = "";
      libelle = `${tvaValues.value[ind] * 100} %`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesDateLibelle(ind) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      let ret = "", libelle = "", date = "", locale = "en-US";
      if (!!dates.value[ind] && dates.value[ind] !== "") {
        date = new Date(dates.value[ind]);
      }
      if (platform.is.desktop)
        locale = sessionStore.getLangDisplayed.nom;
      else {
        locale = !!session && !!session.langDisplayed ? session.langDisplayed.nom : "en-US";
      }
      libelle = !!date ? `${date.toLocaleDateString(locale, options)}` : t("invoicesComponent.libelles.no_date");
      ret = libelle;
      return ret;
    }
    function addClick(e) {
      e.preventDefault();
      router.push(t("comptaLinks.invoices.adminLink"));
    }
    function exportClick(e) {
      e.preventDefault();
      const ids = selectedIds.value;
      router.push({
        path: t("pdfPreLinkTarget") + ids.join("/")
      });
    }
    function sanitizeQueryResult(obj) {
      let ret = [], ind = 0;
      for (const k in obj) {
        const prevId = k > 0 ? obj[k - 1].factureId : 0;
        if (prevId && prevId !== obj[k].factureId) {
          ind++;
        }
        if (!prevId || prevId && prevId !== obj[k].factureId) {
          ret[ind] = {};
        }
        for (const l in obj[k]) {
          if (prevId === obj[k].factureId) {
            if (l === "commandes.orderId") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (!ret[ind]["commandes"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["commandes"].push({ orderId: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === obj[k][l]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["commandes"].push({ orderId: obj[k][l] });
                  else
                    ret[ind]["commandes"][foundIndex].orderId = obj[k][l];
                }
              }
            } else if (l === "commandes.contenuAdditionnel") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (!ret[ind]["commandes"].length) {
                ret[ind]["commandes"].push({ contenuAdditionnel: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === obj[k]["orderId"]);
                if (foundIndex === -1)
                  ret[ind]["commandes"][ret[ind]["commandes"].length - 1].contenuAdditionnel = obj[k][l];
                else
                  ret[ind]["commandes"][foundIndex].contenuAdditionnel = obj[k][l];
              }
            } else if (l === "commandes.priceHt") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ priceHt: obj[k][l] });
                } else {
                  const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === obj[k]["orderId"]);
                  if (obj[k][l] !== null) {
                    if (foundIndex === -1)
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].priceHt = obj[k][l];
                    else
                      ret[ind]["commandes"][foundIndex].priceHt = obj[k][l];
                  }
                }
              }
            } else if (l === "commandes.factureId") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ factureId: obj[k][l] });
                } else {
                  const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === obj[k]["orderId"]);
                  if (obj[k][l] !== null) {
                    if (foundIndex === -1)
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].factureId = obj[k][l];
                    else
                      ret[ind]["commandes"][foundIndex].factureId = obj[k][l];
                  }
                }
              }
            } else if (l === "payments.paymentId") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (!ret[ind]["payments"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["payments"].push({ paymentId: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === obj[k][l]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["payments"].push({ paymentId: obj[k][l] });
                  else
                    ret[ind]["payments"][foundIndex].paymentId = obj[k][l];
                }
              }
            } else if (l === "payments.etat") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (!ret[ind]["payments"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["payments"].push({ etat: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === obj[k]["payments.paymentId"]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["payments"][ret[ind]["payments"].length - 1].etat = obj[k][l];
                  else
                    ret[ind]["payments"][foundIndex].etat = obj[k][l];
                }
              }
            } else if (l === "payments.paymentValue") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (!ret[ind]["payments"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["payments"].push({ paymentValue: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === obj[k]["payments.paymentId"]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentValue = obj[k][l];
                  else
                    ret[ind]["payments"][foundIndex].paymentValue = obj[k][l];
                }
              }
            } else if (l === "payments.paymentType") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (!ret[ind]["payments"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["payments"].push({ paymentType: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === obj[k]["payments.paymentId"]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentType = obj[k][l];
                  else
                    ret[ind]["payments"][foundIndex].paymentType = obj[k][l];
                }
              }
            } else if (l === "payments.factureId") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (!ret[ind]["payments"].length) {
                if (obj[k][l] !== null)
                  ret[ind]["payments"].push({ factureId: obj[k][l] });
              } else {
                const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === obj[k]["payments.paymentId"]);
                if (obj[k][l] !== null) {
                  if (foundIndex === -1)
                    ret[ind]["payments"][ret[ind]["payments"].length - 1].factureId = obj[k][l];
                  else
                    ret[ind]["payments"][foundIndex].factureId = obj[k][l];
                }
              }
            }
          } else {
            if (l === "langue.langueId") {
              ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
              if (obj[k][l] === null) {
                ret[ind]["langue"] = null;
              } else {
                ret[ind]["langue"]["langueId"] = obj[k][l];
              }
            } else if (l === "langue.libelle") {
              ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
              if (obj[k][l] === null) {
                ret[ind]["langue"] = null;
              } else {
                ret[ind]["langue"]["libelle"] = obj[k][l];
              }
            } else if (l === "langue.nom") {
              ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
              if (obj[k][l] === null) {
                ret[ind]["langue"] = null;
              } else {
                ret[ind]["langue"]["nom"] = obj[k][l];
              }
            } else if (l === "devise.deviseId") {
              ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
              if (obj[k][l] === null) {
                ret[ind]["devise"] = null;
              } else {
                ret[ind]["devise"]["deviseId"] = obj[k][l];
              }
            } else if (l === "devise.symbole") {
              ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
              if (obj[k][l] === null) {
                ret[ind]["devise"] = null;
              } else {
                ret[ind]["devise"]["symbole"] = obj[k][l];
              }
            } else if (l === "devise.libelle") {
              ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
              if (obj[k][l] === null) {
                ret[ind]["devise"] = null;
              } else {
                ret[ind]["devise"]["libelle"] = obj[k][l];
              }
            } else if (l === "buyer.actorId") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["actorId"] = obj[k][l];
              }
            } else if (l === "buyer.cp") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["cp"] = obj[k][l];
              }
            } else if (l === "buyer.email") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["email"] = obj[k][l];
              }
            } else if (l === "buyer.nom") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["nom"] = obj[k][l];
              }
            } else if (l === "buyer.nomRue") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["nomRue"] = obj[k][l];
              }
            } else if (l === "buyer.numCommercant") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              ret[ind]["buyer"]["numCommercant"] = obj[k][l];
            } else if (l === "buyer.numRue") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["numRue"] = obj[k][l];
              }
            } else if (l === "buyer.prenom") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["prenom"] = obj[k][l];
              }
            } else if (l === "buyer.tel") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["tel"] = obj[k][l];
              }
            } else if (l === "buyer.actorTypeId") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["actorTypeId"] = obj[k][l];
              }
            } else if (l === "buyer.ville") {
              ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
              if (obj[k][l] === null) {
                ret[ind]["buyer"] = null;
              } else {
                ret[ind]["buyer"]["ville"] = obj[k][l];
              }
            } else if (l === "seller.actorId") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["actorId"] = obj[k][l];
              }
            } else if (l === "seller.cp") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["cp"] = obj[k][l];
              }
            } else if (l === "seller.email") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["email"] = obj[k][l];
              }
            } else if (l === "seller.nom") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["nom"] = obj[k][l];
              }
            } else if (l === "seller.nomRue") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["nomRue"] = obj[k][l];
              }
            } else if (l === "seller.numCommercant") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              ret[ind]["seller"]["numCommercant"] = obj[k][l];
            } else if (l === "seller.numRue") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["numRue"] = obj[k][l];
              }
            } else if (l === "seller.prenom") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["prenom"] = obj[k][l];
              }
            } else if (l === "seller.tel") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["tel"] = obj[k][l];
              }
            } else if (l === "seller.actorTypeId") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["actorTypeId"] = obj[k][l];
              }
            } else if (l === "seller.ville") {
              ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
              if (obj[k][l] === null) {
                ret[ind]["seller"] = null;
              } else {
                ret[ind]["seller"]["ville"] = obj[k][l];
              }
            } else if (l === "commandes.orderId") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ orderId: obj[k][l] });
                } else {
                  ret[ind]["commandes"][ret[ind]["commandes"].length - 1].orderId = obj[k][l];
                }
              }
            } else if (l === "commandes.contenuAdditionnel") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ contenuAdditionnel: obj[k][l] });
                } else {
                  ret[ind]["commandes"][ret[ind]["commandes"].length - 1].contenuAdditionnel = obj[k][l];
                }
              }
            } else if (l === "commandes.priceHt") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ priceHt: obj[k][l] });
                } else {
                  ret[ind]["commandes"][ret[ind]["commandes"].length - 1].priceHt = obj[k][l];
                }
              }
            } else if (l === "commandes.factureId") {
              ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["commandes"].length) {
                  ret[ind]["commandes"].push({ factureId: obj[k][l] });
                } else {
                  ret[ind]["commandes"][ret[ind]["commandes"].length - 1].factureId = obj[k][l];
                }
              }
            } else if (l === "payments.paymentId") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["payments"].length) {
                  ret[ind]["payments"].push({ paymentId: obj[k][l] });
                } else {
                  ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentId = obj[k][l];
                }
              }
            } else if (l === "payments.etat") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["payments"].length) {
                  ret[ind]["payments"].push({ etat: obj[k][l] });
                } else {
                  ret[ind]["payments"][ret[ind]["payments"].length - 1].etat = obj[k][l];
                }
              }
            } else if (l === "payments.paymentValue") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["payments"].length) {
                  ret[ind]["payments"].push({ paymentValue: obj[k][l] });
                } else {
                  ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentValue = obj[k][l];
                }
              }
            } else if (l === "payments.paymentType") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["payments"].length) {
                  ret[ind]["payments"].push({ paymentType: obj[k][l] });
                } else {
                  ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentType = obj[k][l];
                }
              }
            } else if (l === "payments.factureId") {
              ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
              if (obj[k][l] !== null) {
                if (!ret[ind]["payments"].length) {
                  ret[ind]["payments"].push({ factureId: obj[k][l] });
                } else {
                  ret[ind]["payments"][ret[ind]["payments"].length - 1].factureId = obj[k][l];
                }
              }
            } else {
              ret[ind][l] = obj[k][l];
            }
          }
        }
      }
      return ret;
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QNoSsr, null, {
          default: withCtx(() => [
            messageVisibility.value && renderComponent.value ? (openBlock(), createBlock(MessagesItem, { key: 0 })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createVNode(QTable, {
              flat: "",
              title: unref(t)("exportsComponent.tableTitle"),
              bordered: "",
              columns: tableHeadForDisplay.value,
              rows: unref(contentsForDisp),
              "row-key": "factureId",
              "no-data-label": unref(t)("invoicesComponent.errors.empty.tableBodyContentText"),
              "no-results-label": unref(t)("forms.errors.empty.filterBodyContentText"),
              separator: "horizontal",
              dense: unref(compact)
            }, {
              "no-data": withCtx(({ icon, message }) => [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(QIcon, {
                    size: "2em",
                    name: "sentiment_dissatisfied"
                  }),
                  createBaseVNode("span", null, toDisplayString(message), 1),
                  createVNode(QIcon, {
                    size: "2em",
                    name: icon
                  }, null, 8, ["name"]),
                  createVNode(QBtn, {
                    color: "purple",
                    icon: "add_circle",
                    label: unref(t)("invoicesComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    onClick: addClick
                  }, null, 8, ["label"])
                ])
              ]),
              body: withCtx((propos) => [
                createVNode(QTr, { props: propos }, {
                  default: withCtx(() => [
                    createVNode(QTd, {
                      key: "factureId",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createVNode(QCheckbox, {
                          disable: orders.value[propos.row.factureId].length ? false : true,
                          modelValue: selectedIds.value,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedIds.value = $event),
                          val: propos.row.factureId
                        }, null, 8, ["disable", "modelValue", "val"])
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "date",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.date), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "invoiceHTPrice",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.invoiceHTPrice), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "invoiceTTPrice",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.invoiceTTPrice), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "langue",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.langue), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "devise",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.devise), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "tvaValue",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.tvaValue), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "buyer",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.buyer), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "seller",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.seller), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "payments",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.payments), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "commandes",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(propos.row.commandes), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"]),
                    createVNode(QTd, {
                      key: "actions",
                      props: propos
                    }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          disable: selectedIds.value.length ? false : true,
                          color: "primary",
                          icon: "picture_as_pdf",
                          label: unref(t)("forms.exportButtonText"),
                          glossy: "",
                          unelevated: "",
                          onClick: exportClick
                        }, null, 8, ["disable", "label"])
                      ]),
                      _: 2
                    }, 1032, ["props"])
                  ]),
                  _: 2
                }, 1032, ["props"])
              ]),
              _: 1
            }, 8, ["title", "columns", "rows", "no-data-label", "no-results-label", "dense"])
          ])
        ])
      ], 64);
    };
  }
});
var ExportComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ExportComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExportPage",
  props: {
    dbConn: { default: null }
  },
  emits: ["change-tab"],
  setup(__props, { emit }) {
    const renderComponent = ref(true);
    onMounted(() => {
      emit("change-tab", void 0);
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(QPage, {
        padding: "",
        class: "row items-center justify-start content-start"
      }, {
        default: withCtx(() => [
          renderComponent.value ? (openBlock(), createBlock(ExportComponent, {
            key: 0,
            dbConn: __props.dbConn
          }, null, 8, ["dbConn"])) : createCommentVNode("", true),
          createVNode(_component_router_view, { dbConn: __props.dbConn }, null, 8, ["dbConn"])
        ]),
        _: 1
      });
    };
  }
});
var ExportPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ExportPage.vue"]]);
export { ExportPage as default };
//# sourceMappingURL=data:application/json;base64,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O0FBQ2QsV0FBSyxjQUFjLE1BQVM7QUFBQSxLQUM3QiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FeHBvcnRDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0V4cG9ydFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtbm8tc3NyPlxuICAgIDxNZXNzYWdlc0l0ZW0gdi1pZj0nbWVzc2FnZVZpc2liaWxpdHkgJiYgcmVuZGVyQ29tcG9uZW50JyAvPlxuICA8L3Etbm8tc3NyPlxuICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCVcIj5cbiAgICA8ZGl2IGNsYXNzPSdxLXBhLW1kJz5cbiAgICAgIDxxLXRhYmxlXG4gICAgICAgIGZsYXRcbiAgICAgICAgOnRpdGxlPVwidCgnZXhwb3J0c0NvbXBvbmVudC50YWJsZVRpdGxlJylcIlxuICAgICAgICBib3JkZXJlZFxuICAgICAgICA6Y29sdW1ucz1cInRhYmxlSGVhZEZvckRpc3BsYXlcIlxuICAgICAgICA6cm93cz1cImNvbnRlbnRzRm9yRGlzcFwiXG4gICAgICAgIHJvdy1rZXk9XCJmYWN0dXJlSWRcIlxuICAgICAgICA6bm8tZGF0YS1sYWJlbD1cInQoJ2ludm9pY2VzQ29tcG9uZW50LmVycm9ycy5lbXB0eS50YWJsZUJvZHlDb250ZW50VGV4dCcpXCJcbiAgICAgICAgOm5vLXJlc3VsdHMtbGFiZWw9XCJ0KCdmb3Jtcy5lcnJvcnMuZW1wdHkuZmlsdGVyQm9keUNvbnRlbnRUZXh0JylcIlxuICAgICAgICBzZXBhcmF0b3I9XCJob3Jpem9udGFsXCJcbiAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLWRhdGE9XCJ7aWNvbiwgbWVzc2FnZX1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC13aWR0aCByb3cgZmxleC1jZW50ZXIgdGV4dC1hY2NlbnQgcS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgIDxxLWljb24gc2l6ZT1cIjJlbVwiIG5hbWU9XCJzZW50aW1lbnRfZGlzc2F0aXNmaWVkXCIvPlxuICAgICAgICAgICAgPHNwYW4+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxxLWljb24gc2l6ZT1cIjJlbVwiIDpuYW1lPVwiaWNvblwiLz5cbiAgICAgICAgICAgIDxxLWJ0biBjb2xvcj1cInB1cnBsZVwiIGljb249XCJhZGRfY2lyY2xlXCIgOmxhYmVsPVwidCgnaW52b2ljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZycpXCIgZ2xvc3N5IHVuZWxldmF0ZWQgQGNsaWNrPVwiYWRkQ2xpY2tcIj48L3EtYnRuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHk9XCJwcm9wb3NcIj5cbiAgICAgICAgICA8cS10ciA6cHJvcHM9XCJwcm9wb3NcIj5cbiAgICAgICAgICAgIDxxLXRkIGtleT1cImZhY3R1cmVJZFwiIDpwcm9wcz1cInByb3Bvc1wiPlxuICAgICAgICAgICAgICA8cS1jaGVja2JveCA6ZGlzYWJsZT1cIm9yZGVyc1twcm9wb3Mucm93LmZhY3R1cmVJZF0ubGVuZ3RoID8gZmFsc2UgOiB0cnVlXCIgdi1tb2RlbD1cInNlbGVjdGVkSWRzXCIgOnZhbD1cInByb3Bvcy5yb3cuZmFjdHVyZUlkXCIvPjwvcS10ZD5cbiAgICAgICAgICAgIDxxLXRkIGtleT1cImRhdGVcIiA6cHJvcHM9XCJwcm9wb3NcIj57eyBwcm9wb3Mucm93LmRhdGUgfX08L3EtdGQ+XG4gICAgICAgICAgICA8cS10ZCBrZXk9XCJpbnZvaWNlSFRQcmljZVwiIDpwcm9wcz1cInByb3Bvc1wiPnt7IHByb3Bvcy5yb3cuaW52b2ljZUhUUHJpY2UgfX08L3EtdGQ+XG4gICAgICAgICAgICA8cS10ZCBrZXk9XCJpbnZvaWNlVFRQcmljZVwiIDpwcm9wcz1cInByb3Bvc1wiPnt7IHByb3Bvcy5yb3cuaW52b2ljZVRUUHJpY2UgfX08L3EtdGQ+XG4gICAgICAgICAgICA8cS10ZCBrZXk9XCJsYW5ndWVcIiA6cHJvcHM9XCJwcm9wb3NcIj57eyBwcm9wb3Mucm93Lmxhbmd1ZSB9fTwvcS10ZD5cbiAgICAgICAgICAgIDxxLXRkIGtleT1cImRldmlzZVwiIDpwcm9wcz1cInByb3Bvc1wiPnt7IHByb3Bvcy5yb3cuZGV2aXNlIH19PC9xLXRkPlxuICAgICAgICAgICAgPHEtdGQga2V5PVwidHZhVmFsdWVcIiA6cHJvcHM9XCJwcm9wb3NcIj57eyBwcm9wb3Mucm93LnR2YVZhbHVlIH19PC9xLXRkPlxuICAgICAgICAgICAgPHEtdGQga2V5PVwiYnV5ZXJcIiA6cHJvcHM9XCJwcm9wb3NcIj57eyBwcm9wb3Mucm93LmJ1eWVyIH19PC9xLXRkPlxuICAgICAgICAgICAgPHEtdGQga2V5PVwic2VsbGVyXCIgOnByb3BzPVwicHJvcG9zXCI+e3sgcHJvcG9zLnJvdy5zZWxsZXIgfX08L3EtdGQ+XG4gICAgICAgICAgICA8cS10ZCBrZXk9XCJwYXltZW50c1wiIDpwcm9wcz1cInByb3Bvc1wiPnt7IHByb3Bvcy5yb3cucGF5bWVudHMgfX08L3EtdGQ+XG4gICAgICAgICAgICA8cS10ZCBrZXk9XCJjb21tYW5kZXNcIiA6cHJvcHM9XCJwcm9wb3NcIj57eyBwcm9wb3Mucm93LmNvbW1hbmRlcyB9fTwvcS10ZD5cbiAgICAgICAgICAgIDxxLXRkIGtleT1cImFjdGlvbnNcIiA6cHJvcHM9XCJwcm9wb3NcIj5cbiAgICAgICAgICAgICAgPHEtYnRuIDpkaXNhYmxlPVwic2VsZWN0ZWRJZHMubGVuZ3RoID8gZmFsc2UgOiB0cnVlXCIgY29sb3I9XCJwcmltYXJ5XCIgaWNvbj1cInBpY3R1cmVfYXNfcGRmXCIgOmxhYmVsPVwidCgnZm9ybXMuZXhwb3J0QnV0dG9uVGV4dCcpXCIgZ2xvc3N5IHVuZWxldmF0ZWQgQGNsaWNrPVwiZXhwb3J0Q2xpY2tcIj48L3EtYnRuPlxuICAgICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDwvcS10cj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLXRhYmxlPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG4vKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiAnb2ZmJyovXG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkIH0gZnJvbSAndnVlJztcbi8vIGltcG9ydCB7IHVzZU9yZGVyU3RvcmUgfSBmcm9tICdzdG9yZXMvb3JkZXInO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuLy8gaW1wb3J0IHsgdXNlUGF5bWVudFN0b3JlIH0gZnJvbSAnc3RvcmVzL3BheW1lbnQnO1xuaW1wb3J0IHsgdXNlSW52b2ljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL2ludm9pY2UnO1xuaW1wb3J0IHsgdXNlU2Vzc2lvblN0b3JlIH0gZnJvbSAnc3RvcmVzL3Nlc3Npb24nO1xuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSAnc3RvcmVzL3VzZXInO1xuLy8gaW1wb3J0IFRhYmxlSXRlbSBmcm9tICcuL1RhYmxlSXRlbS52dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuLy8gaW1wb3J0IGludm9pY2VBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvaW52b2ljZS5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IElucHV0T2JqZWN0Q29sbGVjdGlvbiwgRm9ybVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UXVlcnksIGNsb3NlRGJDb25uZWN0aW9uIH0gZnJvbSAnY2FwL3N0b3JhZ2UnO1xuaW1wb3J0IHsgc2V0RGVjcnlwdEFwaSwgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ3NyYy9nbG9iYWxzJztcbmltcG9ydCB7IFNRTGl0ZURCQ29ubmVjdGlvbiB9IGZyb20gJ0BjYXBhY2l0b3ItY29tbXVuaXR5L3NxbGl0ZSc7XG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBFeHBvcnRQcm9wcyB7XG4gIGRiQ29ubj86IFNRTGl0ZURCQ29ubmVjdGlvbiB8IG51bGw7XG59O1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8RXhwb3J0UHJvcHM+KCksIHtcbiAgZGJDb25uOiBudWxsXG59KTtcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbmNvbnN0IHBsYXRmb3JtID0gJHEucGxhdGZvcm07XG5jb25zdCByZW5kZXJDb21wb25lbnQgPSByZWYodHJ1ZSk7XG5jb25zdCB7IHQgfSA9IHVzZUkxOG4oeyB1c2VTY29wZTogJ2dsb2JhbCcgfSk7XG5jb25zdCBtZXNzYWdlVmlzaWJpbGl0eSA9IHJlZihmYWxzZSk7XG5jb25zdCBpbnZvaWNlSWRzID0gcmVmKFtdKTtcbmNvbnN0IGRhdGVzID0gcmVmKFtdKTtcbmNvbnN0IGludm9pY2VIVFByaWNlcyA9IHJlZihbXSk7XG5jb25zdCBpbnZvaWNlVFRQcmljZXMgPSByZWYoW10pO1xuY29uc3QgbGFuZ3VhZ2VzID0gcmVmKFtdKTtcbmNvbnN0IGRldmlzZXMgPSByZWYoW10pO1xuY29uc3QgdHZhVmFsdWVzID0gcmVmKFtdKTtcbmNvbnN0IGJ1eWVycyA9IHJlZihbXSk7XG5jb25zdCBzZWxsZXJzID0gcmVmKFtdKTtcbmNvbnN0IGFkbWluID0gcmVmKDApO1xuY29uc3QgcGF5bWVudHMgPSByZWYoe30pO1xuY29uc3Qgb3JkZXJzID0gcmVmKHt9KTtcbmNvbnN0IHRhYmxlSGVhZEZvckRpc3BsYXkgPSByZWYoW1xuICB7XG4gICAgbmFtZTogJ2ZhY3R1cmVJZCcsXG4gICAgbGFiZWw6ICcjJyxcbiAgICBmaWVsZDogJ2ZhY3R1cmVJZCcsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdkYXRlJyxcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmRhdGUnKSxcbiAgICBmaWVsZDogJ2RhdGUnLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnaW52b2ljZUhUUHJpY2UnLFxuICAgIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUuaW52b2ljZUhUUHJpY2UnKSxcbiAgICBmaWVsZDogJ2ludm9pY2VIVFByaWNlJyxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ2ludm9pY2VUVFByaWNlJyxcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLmludm9pY2VUVFByaWNlJyksXG4gICAgZmllbGQ6ICdpbnZvaWNlVFRQcmljZScsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdsYW5ndWUnLFxuICAgIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUubGFuZ3VhZ2UnKSxcbiAgICBmaWVsZDogJ2xhbmd1ZScsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdkZXZpc2UnLFxuICAgIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUuZGV2aXNlJyksXG4gICAgZmllbGQ6ICdkZXZpc2UnLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndHZhVmFsdWUnLFxuICAgIGxhYmVsOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5oZWFkVGFibGUudHZhJyksXG4gICAgZmllbGQ6ICd0dmFWYWx1ZScsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdidXllcicsXG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5idXllcicpLFxuICAgIGZpZWxkOiAnYnV5ZXInLFxuICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnc2VsbGVyJyxcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLnNlbGxlcicpLFxuICAgIGZpZWxkOiAnc2VsbGVyJyxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ3BheW1lbnRzJyxcbiAgICBsYWJlbDogdCgnaW52b2ljZXNDb21wb25lbnQuaGVhZFRhYmxlLnBheW1lbnQnKSxcbiAgICBmaWVsZDogJ3BheW1lbnRzJyxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ2NvbW1hbmRlcycsXG4gICAgbGFiZWw6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5jb21tYW5kZScpLFxuICAgIGZpZWxkOiAnY29tbWFuZGVzJyxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ2FjdGlvbnMnLFxuICAgIGxhYmVsOiB0KCdmb3Jtcy5oZWFkVGFibGUuYWN0aW9uJyksXG4gICAgZmllbGQ6ICdhY3Rpb25zJyxcbiAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICB9LFxuXSk7XG5jb25zdCBjb250ZW50c0ZvckRpc3AgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW52b2ljZUlkcy52YWx1ZSkge1xuICAgIHJldFtrZXldID0ge307XG4gICAgcmV0W2tleV1bJ2ZhY3R1cmVJZCddID0gaW52b2ljZUlkcy52YWx1ZVtrZXldO1xuICAgIHJldFtrZXldWydkYXRlJ10gPSB0YWJsZUludm9pY2VzRGF0ZUxpYmVsbGUoa2V5KTtcbiAgICByZXRba2V5XVsnaW52b2ljZUhUUHJpY2UnXSA9IGludm9pY2VIVFByaWNlcy52YWx1ZVtrZXldO1xuICAgIHJldFtrZXldWydpbnZvaWNlVFRQcmljZSddID0gaW52b2ljZVRUUHJpY2VzLnZhbHVlW2tleV07XG4gICAgcmV0W2tleV1bJ2xhbmd1ZSddID0gdGFibGVJbnZvaWNlc0xhbmd1ZUxpYmVsbGUoa2V5KTtcbiAgICByZXRba2V5XVsnZGV2aXNlJ10gPSB0YWJsZUludm9pY2VzRGV2aXNlTGliZWxsZShrZXkpO1xuICAgIHJldFtrZXldWyd0dmFWYWx1ZSddID0gdGFibGVJbnZvaWNlc1ZBVExpYmVsbGUoa2V5KTtcbiAgICByZXRba2V5XVsnYnV5ZXInXSA9IHRhYmxlSW52b2ljZXNCdXllckxpYmVsbGUoa2V5KTtcbiAgICByZXRba2V5XVsnc2VsbGVyJ10gPSB0YWJsZUludm9pY2VzU2VsbGVyTGliZWxsZShrZXkpO1xuICAgIHJldFtrZXldWydjb21tYW5kZXMnXSA9IHRhYmxlSW52b2ljZXNPcmRlcnNMaWJlbGxlKGludm9pY2VJZHMudmFsdWVba2V5XSk7XG4gICAgcmV0W2tleV1bJ3BheW1lbnRzJ10gPSB0YWJsZUludm9pY2VzUGF5bWVudHNMaWJlbGxlKGludm9pY2VJZHMudmFsdWVba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgc2VsZWN0ZWRJZHMgPSByZWYoW10pO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmICghIW9yaWVudGF0aW9uLnZhbHVlKXtcbiAgICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5sZXQgbWVzc2FnZVN0b3JlID0gbnVsbCwgXG4gIC8vIG1lc3NhZ2VzOiBSZWY8TWVzc2FnZT4gPSByZWYoW10pLCBcbiAgaW52b2ljZVN0b3JlID0gbnVsbCwgXG4gIHNlc3Npb25TdG9yZSA9IG51bGwsIFxuICBwcmVmcyA9IG51bGwsIFxuICB1c2VyU3RvcmUgPSBudWxsLCBcbiAgc2Vzc2lvbiA9IG51bGw7XG5cbi8vIERFQ0xBUkFUSU9OU1xuaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgbWVzc2FnZVN0b3JlID0gdXNlTWVzc2FnZVN0b3JlKCk7XG4gIGludm9pY2VTdG9yZSA9IHVzZUludm9pY2VTdG9yZSgpO1xuICBzZXNzaW9uU3RvcmUgPSB1c2VTZXNzaW9uU3RvcmUoKTtcbiAgdXNlclN0b3JlID0gdXNlVXNlclN0b3JlKCk7XG4gIGlmIChtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXMubGVuZ3RoKXtcbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgfVxuICBhZG1pbi52YWx1ZSA9IHVzZXJTdG9yZS5nZXRVc2VyLnVzZXJJZDtcbiAgZmV0Y2hEYXRhc0ZvclRhYmxlKCk7XG59XG5lbHNlIHtcbiAgb3JpZW50YXRpb24udmFsdWUgPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICBwcmVmcyA9IGF3YWl0IGltcG9ydCgnY2FwL3N0b3JhZ2UvcHJlZmVyZW5jZXMnKTtcbiAgICBjb25zdCBtZXNzID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignbWVzc2FnZScpO1xuICAgIGNvbnN0IHVzciA9IGF3YWl0IHByZWZzLmdldFByZWYoJ3VzZXInKTtcbiAgICBzZXNzaW9uID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignc2Vzc2lvbicpO1xuICAgIGNvbnN0IHVzZXIgPSAhIXVzciA/IHVzci51c2VyIDoge307XG4gICAgLy8gY29uc29sZS5sb2cobWVzcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzIDogW107XG4gICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgIGNvbnN0IHZpcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXNWaXNpYmlsaXR5IDogbWVzcztcbiAgICAvLyBjb25zb2xlLmxvZyh2aXMpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggJiYgdmlzID09PSBudWxsKSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdmlzICE9PSBudWxsID8gdmlzIDogZmFsc2U7XG4gICAgfVxuICAgIGFkbWluLnZhbHVlID0gdXNlci51c2VySWQ7XG4gICAgZmV0Y2hEYXRhc0ZvclRhYmxlKCk7XG4gIH0pKCk7XG59XG5cbi8vIEZVTkNUSU9OU1xuLy8gYXN5bmMgZnVuY3Rpb24gZm9yY2VUYWJsZVJlcmVuZGVyKCkge1xuLy8gICByZW5kZXJDb21wb25lbnQudmFsdWUgPSBmYWxzZTtcbi8vICAgYXdhaXQgbmV4dFRpY2soKTtcbi8vICAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gdHJ1ZTtcbi8vIH07XG4vLyBhc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1PYmplY3Qob2JqOiBhbnkpIHtcbi8vICAgaWYgKF9fS0VZX18gPT09IG51bGwpIHtcbi8vICAgICBhd2FpdCBzZXRHZW5BcGkoKTtcbi8vICAgfVxuLy8gICBhd2FpdCBzZXRDcnlwdEFwaSgpO1xuLy8gICBfX0ZPUk1BVE9CSl9fKG9iaik7XG4vLyB9O1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhc0ZvclRhYmxlKCkge1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCl7XG4gICAgaW52b2ljZVN0b3JlLmdldEFsbEludm9pY2VzKGFkbWluLnZhbHVlKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgaW52b2ljZUlkcy52YWx1ZS5wdXNoKHJlc1trXS5mYWN0dXJlSWQpO1xuICAgICAgICAgIGRhdGVzLnZhbHVlLnB1c2gocmVzW2tdLmRhdGUpO1xuICAgICAgICAgIGludm9pY2VIVFByaWNlcy52YWx1ZS5wdXNoKHJlc1trXS5pbnZvaWNlSFRQcmljZSk7XG4gICAgICAgICAgaW52b2ljZVRUUHJpY2VzLnZhbHVlLnB1c2gocmVzW2tdLmludm9pY2VUVFByaWNlKTtcbiAgICAgICAgICBsYW5ndWFnZXMudmFsdWUucHVzaChyZXNba10ubGFuZ3VlKTtcbiAgICAgICAgICBkZXZpc2VzLnZhbHVlLnB1c2gocmVzW2tdLmRldmlzZSk7XG4gICAgICAgICAgdHZhVmFsdWVzLnZhbHVlLnB1c2gocmVzW2tdLnR2YVZhbHVlKTtcbiAgICAgICAgICBidXllcnMudmFsdWUucHVzaChyZXNba10uYnV5ZXIpO1xuICAgICAgICAgIHNlbGxlcnMudmFsdWUucHVzaChyZXNba10uc2VsbGVyKTtcbiAgICAgICAgICBvcmRlcnMudmFsdWVbYCR7cmVzW2tdLmZhY3R1cmVJZH1gXSA9IHJlc1trXS5jb21tYW5kZXM7XG4gICAgICAgICAgcGF5bWVudHMudmFsdWVbYCR7cmVzW2tdLmZhY3R1cmVJZH1gXSA9IHJlc1trXS5wYXltZW50cztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdleHBvcnRDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9pbnZvaWNlcy5saW5rZWRfZXJyb3InLCB7ZXJyOiBlcnJ9KVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICAgIGlzT3BlbiA9ICFpc09wZW4gfHwgISFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgY29uc3Qgc3FsID0gYFNFTEVDVCBcXGBmYWN0dXJlXFxgLlxcYGZhY3R1cmVJZFxcYCwgXFxgZmFjdHVyZVxcYC5cXGBkYXRlXFxgLCBcXGBmYWN0dXJlXFxgLlxcYGludm9pY2VIVFByaWNlXFxgLCBcXGBmYWN0dXJlXFxgLlxcYGludm9pY2VUVFByaWNlXFxgLCBcXGBmYWN0dXJlXFxgLlxcYHR2YVZhbHVlXFxgLCBcXGBsYW5ndWVcXGAuXFxgbGFuZ3VlSWRcXGAgQVMgXFxgbGFuZ3VlLmxhbmd1ZUlkXFxgLCBcXGBsYW5ndWVcXGAuXFxgbGliZWxsZVxcYCBBUyBcXGBsYW5ndWUubGliZWxsZVxcYCwgXFxgbGFuZ3VlXFxgLlxcYG5vbVxcYCBBUyBcXGBsYW5ndWUubm9tXFxgLCBcXGBkZXZpc2VcXGAuXFxgZGV2aXNlSWRcXGAgQVMgXFxgZGV2aXNlLmRldmlzZUlkXFxgLCBcXGBkZXZpc2VcXGAuXFxgc3ltYm9sZVxcYCBBUyBcXGBkZXZpc2Uuc3ltYm9sZVxcYCwgXFxgZGV2aXNlXFxgLlxcYGxpYmVsbGVcXGAgQVMgXFxgZGV2aXNlLmxpYmVsbGVcXGAsIFxcYGJ1eWVyXFxgLlxcYGFjdG9ySWRcXGAgQVMgXFxgYnV5ZXIuYWN0b3JJZFxcYCwgXFxgYnV5ZXJcXGAuXFxgY3BcXGAgQVMgXFxgYnV5ZXIuY3BcXGAsIFxcYGJ1eWVyXFxgLlxcYGVtYWlsXFxgIEFTIFxcYGJ1eWVyLmVtYWlsXFxgLCBcXGBidXllclxcYC5cXGBub21cXGAgQVMgXFxgYnV5ZXIubm9tXFxgLCBcXGBidXllclxcYC5cXGBub21SdWVcXGAgQVMgXFxgYnV5ZXIubm9tUnVlXFxgLCBcXGBidXllclxcYC5cXGBudW1Db21tZXJjYW50XFxgIEFTIFxcYGJ1eWVyLm51bUNvbW1lcmNhbnRcXGAsIFxcYGJ1eWVyXFxgLlxcYG51bVJ1ZVxcYCBBUyBcXGBidXllci5udW1SdWVcXGAsIFxcYGJ1eWVyXFxgLlxcYHByZW5vbVxcYCBBUyBcXGBidXllci5wcmVub21cXGAsIFxcYGJ1eWVyXFxgLlxcYHRlbFxcYCBBUyBcXGBidXllci50ZWxcXGAsIFxcYGJ1eWVyXFxgLlxcYGFjdG9yVHlwZUlkXFxgIEFTIFxcYGJ1eWVyLmFjdG9yVHlwZUlkXFxgLCBcXGBidXllclxcYC5cXGB2aWxsZVxcYCBBUyBcXGBidXllci52aWxsZVxcYCwgXFxgc2VsbGVyXFxgLlxcYGFjdG9ySWRcXGAgQVMgXFxgc2VsbGVyLmFjdG9ySWRcXGAsIFxcYHNlbGxlclxcYC5cXGBjcFxcYCBBUyBcXGBzZWxsZXIuY3BcXGAsIFxcYHNlbGxlclxcYC5cXGBlbWFpbFxcYCBBUyBcXGBzZWxsZXIuZW1haWxcXGAsIFxcYHNlbGxlclxcYC5cXGBub21cXGAgQVMgXFxgc2VsbGVyLm5vbVxcYCwgXFxgc2VsbGVyXFxgLlxcYG5vbVJ1ZVxcYCBBUyBcXGBzZWxsZXIubm9tUnVlXFxgLCBcXGBzZWxsZXJcXGAuXFxgbnVtQ29tbWVyY2FudFxcYCBBUyBcXGBzZWxsZXIubnVtQ29tbWVyY2FudFxcYCwgXFxgc2VsbGVyXFxgLlxcYG51bVJ1ZVxcYCBBUyBcXGBzZWxsZXIubnVtUnVlXFxgLCBcXGBzZWxsZXJcXGAuXFxgcHJlbm9tXFxgIEFTIFxcYHNlbGxlci5wcmVub21cXGAsIFxcYHNlbGxlclxcYC5cXGB0ZWxcXGAgQVMgXFxgc2VsbGVyLnRlbFxcYCwgXFxgc2VsbGVyXFxgLlxcYGFjdG9yVHlwZUlkXFxgIEFTIFxcYHNlbGxlci5hY3RvclR5cGVJZFxcYCwgXFxgc2VsbGVyXFxgLlxcYHZpbGxlXFxgIEFTIFxcYHNlbGxlci52aWxsZVxcYCwgXFxgY29tbWFuZGVzXFxgLlxcYG9yZGVySWRcXGAgQVMgXFxgY29tbWFuZGVzLm9yZGVySWRcXGAsIFxcYGNvbW1hbmRlc1xcYC5cXGBjb250ZW51QWRkaXRpb25uZWxcXGAgQVMgXFxgY29tbWFuZGVzLmNvbnRlbnVBZGRpdGlvbm5lbFxcYCwgXFxgY29tbWFuZGVzXFxgLlxcYHByaWNlSHRcXGAgQVMgXFxgY29tbWFuZGVzLnByaWNlSHRcXGAsIFxcYGNvbW1hbmRlc1xcYC5cXGBmYWN0dXJlSWRcXGAgQVMgXFxgY29tbWFuZGVzLmZhY3R1cmVJZFxcYCwgXFxgcGF5bWVudHNcXGAuXFxgcGF5bWVudElkXFxgIEFTIFxcYHBheW1lbnRzLnBheW1lbnRJZFxcYCwgXFxgcGF5bWVudHNcXGAuXFxgZXRhdFxcYCBBUyBcXGBwYXltZW50cy5ldGF0XFxgLCBcXGBwYXltZW50c1xcYC5cXGBwYXltZW50VmFsdWVcXGAgQVMgXFxgcGF5bWVudHMucGF5bWVudFZhbHVlXFxgLCBcXGBwYXltZW50c1xcYC5cXGBwYXltZW50VHlwZVxcYCBBUyBcXGBwYXltZW50cy5wYXltZW50VHlwZVxcYCwgXFxgcGF5bWVudHNcXGAuXFxgZmFjdHVyZUlkXFxgIEFTIFxcYHBheW1lbnRzLmZhY3R1cmVJZFxcYCBGUk9NIFxcYGZhY3R1cmVcXGAgQVMgXFxgZmFjdHVyZVxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgbGFuZ3VlXFxgIEFTIFxcYGxhbmd1ZVxcYCBPTiBcXGBmYWN0dXJlXFxgLlxcYGxhbmd1YWdlSWRcXGAgPSBcXGBsYW5ndWVcXGAuXFxgbGFuZ3VlSWRcXGAgTEVGVCBPVVRFUiBKT0lOIFxcYGRldmlzZVxcYCBBUyBcXGBkZXZpc2VcXGAgT04gXFxgZmFjdHVyZVxcYC5cXGBkZXZpc2VJZFxcYCA9IFxcYGRldmlzZVxcYC5cXGBkZXZpc2VJZFxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgcGVyc29ubmVcXGAgQVMgXFxgYnV5ZXJcXGAgT04gXFxgZmFjdHVyZVxcYC5cXGBidXllcklkXFxgID0gXFxgYnV5ZXJcXGAuXFxgYWN0b3JJZFxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgcGVyc29ubmVcXGAgQVMgXFxgc2VsbGVyXFxgIE9OIFxcYGZhY3R1cmVcXGAuXFxgc2VsbGVySWRcXGAgPSBcXGBzZWxsZXJcXGAuXFxgYWN0b3JJZFxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgY29tbWFuZGVcXGAgQVMgXFxgY29tbWFuZGVzXFxgIE9OIFxcYGZhY3R1cmVcXGAuXFxgZmFjdHVyZUlkXFxgID0gXFxgY29tbWFuZGVzXFxgLlxcYGZhY3R1cmVJZFxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgcGF5bWVudFxcYCBBUyBcXGBwYXltZW50c1xcYCBPTiBcXGBmYWN0dXJlXFxgLlxcYGZhY3R1cmVJZFxcYCA9IFxcYHBheW1lbnRzXFxgLlxcYGZhY3R1cmVJZFxcYCBXSEVSRSBcXGBmYWN0dXJlXFxgLlxcYGFkbWluaXN0cmF0b3JJZFxcYCA9ICcke2FkbWluLnZhbHVlfScgR1JPVVAgQlkgXFxgZmFjdHVyZVxcYC5cXGBmYWN0dXJlSWRcXGAsIFxcYHBheW1lbnRzLnBheW1lbnRJZFxcYCwgXFxgY29tbWFuZGVzLm9yZGVySWRcXGA7YDtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIGlmICghIXZhbHVlcyAmJiB2YWx1ZXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBpbnRSZXMgPSBzYW5pdGl6ZVF1ZXJ5UmVzdWx0KHZhbHVlcy52YWx1ZXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnRSZXMpO1xuICAgICAgICBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18oaW50UmVzKTtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIGludm9pY2VJZHMudmFsdWUucHVzaChyZXNba10uZmFjdHVyZUlkKTtcbiAgICAgICAgICBkYXRlcy52YWx1ZS5wdXNoKHJlc1trXS5kYXRlKTtcbiAgICAgICAgICBpbnZvaWNlSFRQcmljZXMudmFsdWUucHVzaChyZXNba10uaW52b2ljZUhUUHJpY2UpO1xuICAgICAgICAgIGludm9pY2VUVFByaWNlcy52YWx1ZS5wdXNoKHJlc1trXS5pbnZvaWNlVFRQcmljZSk7XG4gICAgICAgICAgbGFuZ3VhZ2VzLnZhbHVlLnB1c2gocmVzW2tdLmxhbmd1ZSk7XG4gICAgICAgICAgZGV2aXNlcy52YWx1ZS5wdXNoKHJlc1trXS5kZXZpc2UpO1xuICAgICAgICAgIHR2YVZhbHVlcy52YWx1ZS5wdXNoKHJlc1trXS50dmFWYWx1ZSk7XG4gICAgICAgICAgYnV5ZXJzLnZhbHVlLnB1c2gocmVzW2tdLmJ1eWVyKTtcbiAgICAgICAgICBzZWxsZXJzLnZhbHVlLnB1c2gocmVzW2tdLnNlbGxlcik7XG4gICAgICAgICAgb3JkZXJzLnZhbHVlW2Ake3Jlc1trXS5mYWN0dXJlSWR9YF0gPSByZXNba10uY29tbWFuZGVzO1xuICAgICAgICAgIHBheW1lbnRzLnZhbHVlW2Ake3Jlc1trXS5mYWN0dXJlSWR9YF0gPSByZXNba10ucGF5bWVudHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoISF2YWx1ZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2V4cG9ydENvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2ludm9pY2VzLmxpbmtlZF9lcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlc1Zpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3Iuc3FsaXRlRGInKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc0J1eWVyTGliZWxsZShpbmQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJyc7XG4gIGxldCBsaWJlbGxlID0gYCR7YnV5ZXJzLnZhbHVlW2luZF0uYWN0b3JJZH0gLSAke2J1eWVycy52YWx1ZVtpbmRdLnByZW5vbX0gJHtidXllcnMudmFsdWVbaW5kXS5ub219YDtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzU2VsbGVyTGliZWxsZShpbmQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJyc7XG4gIGxldCBsaWJlbGxlID0gYCR7c2VsbGVycy52YWx1ZVtpbmRdLmFjdG9ySWR9IC0gJHtzZWxsZXJzLnZhbHVlW2luZF0ucHJlbm9tfSAke3NlbGxlcnMudmFsdWVbaW5kXS5ub219YDtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzT3JkZXJzTGliZWxsZShpbnZJZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJywgbGliZWxsZSA9ICcnO1xuICBmb3IgKGNvbnN0IG0gaW4gb3JkZXJzLnZhbHVlW2Ake2ludklkfWBdKSB7XG4gICAgbGliZWxsZSA9IGAke29yZGVycy52YWx1ZVtgJHtpbnZJZH1gXVttXS5vcmRlcklkfSAtICR7b3JkZXJzLnZhbHVlW2Ake2ludklkfWBdW21dLnByaWNlSHR9YDtcbiAgICByZXQgKz0gbSAhPSBvcmRlcnMudmFsdWVbYCR7aW52SWR9YF0ubGVuZ3RoIC0gMSA/IGAke2xpYmVsbGV9LCBgIDogbGliZWxsZTtcbiAgfVxuICByZXQgPSByZXQgPT09ICcnID8gdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fb3JkZXInKSA6IHJldDtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzRGV2aXNlTGliZWxsZShpbmQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJyc7XG4gIGxldCBsaWJlbGxlID0gISFkZXZpc2VzLnZhbHVlW2luZF0gPyBgJHtkZXZpc2VzLnZhbHVlW2luZF0uc3ltYm9sZX0gLSAke2RldmlzZXMudmFsdWVbaW5kXS5saWJlbGxlfWAgOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5saWJlbGxlcy5ub19kZXZpc2UnKTtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzTGFuZ3VlTGliZWxsZShpbmQ6IG51bW5lcikge1xuICBsZXQgcmV0ID0gJyc7XG4gIGxldCBsaWJlbGxlID0gISFsYW5ndWFnZXMudmFsdWVbaW5kXSA/IGxhbmd1YWdlcy52YWx1ZVtpbmRdWydsaWJlbGxlJ10gOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5saWJlbGxlcy5ub19sYW5ndWFnZScpO1xuICByZXQgPSBsaWJlbGxlO1xuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIHRhYmxlSW52b2ljZXNQYXltZW50c0xpYmVsbGUoaW52SWQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJycsIGxpYmVsbGUgPSAnJywgc3RhdGUgPSAnJztcbiAgZm9yIChjb25zdCBtIGluIHBheW1lbnRzLnZhbHVlW2Ake2ludklkfWBdKSB7XG4gICAgc3RhdGUgPSBwYXltZW50cy52YWx1ZVtgJHtpbnZJZH1gXVttXS5ldGF0ID09PSAwID8gdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMuZXRhdHMubm90X3BhaWQnKSA6ICcnO1xuICAgIHN0YXRlID0gcGF5bWVudHMudmFsdWVbYCR7aW52SWR9YF1bbV0uZXRhdCA9PT0gMSA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLmV0YXRzLnBhaWQnKSA6IHN0YXRlO1xuICAgIGxpYmVsbGUgPSBgJHtwYXltZW50cy52YWx1ZVtgJHtpbnZJZH1gXVttXS5wYXltZW50SWR9IC0gJHtzdGF0ZX0gLSAke3BheW1lbnRzLnZhbHVlW2Ake2ludklkfWBdW21dLnBheW1lbnRWYWx1ZX1gO1xuICAgIHJldCArPSBtICE9IHBheW1lbnRzLnZhbHVlW2Ake2ludklkfWBdLmxlbmd0aCAtIDEgPyBgJHtsaWJlbGxlfSwgYCA6IGxpYmVsbGU7XG4gIH1cbiAgcmV0ID0gcmV0ID09PSAnJyA/IHQoJ2ludm9pY2VzQ29tcG9uZW50LmxpYmVsbGVzLm5vX3BheW1lbnQnKSA6IHJldDtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzVkFUTGliZWxsZShpbmQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJycsIGxpYmVsbGUgPSAnJztcbiAgbGliZWxsZSA9IGAke3R2YVZhbHVlcy52YWx1ZVtpbmRdICogMTAwfSAlYDtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzRGF0ZUxpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICcyLWRpZ2l0JywgeWVhcjogJ251bWVyaWMnfTtcbiAgbGV0IHJldCA9ICcnLCBsaWJlbGxlID0gJycsIGRhdGUgPSAnJywgbG9jYWxlPSdlbi1VUyc7XG4gIGlmICghIWRhdGVzLnZhbHVlW2luZF0gJiYgZGF0ZXMudmFsdWVbaW5kXSAhPT0gJycpIHtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZXMudmFsdWVbaW5kXSk7XG4gIH1cbiAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApXG4gICAgbG9jYWxlID0gc2Vzc2lvblN0b3JlLmdldExhbmdEaXNwbGF5ZWQubm9tO1xuICBlbHNle1xuICAgIC8vIFVzaW5nIFByZWZlcmVuY2VzIGZvciBtb2JpbGVzIHBsYXRmb3JtXG4gICAgbG9jYWxlID0gISFzZXNzaW9uICYmICEhc2Vzc2lvbi5sYW5nRGlzcGxheWVkID8gc2Vzc2lvbi5sYW5nRGlzcGxheWVkLm5vbSA6ICdlbi1VUyc7XG4gIH1cbiAgbGliZWxsZSA9ICEhZGF0ZSA/IGAke2RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgb3B0aW9ucyl9YCA6IHQoJ2ludm9pY2VzQ29tcG9uZW50LmxpYmVsbGVzLm5vX2RhdGUnKTtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiBhZGRDbGljayhlOiBFdmVudCl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcm91dGVyLnB1c2godCgnY29tcHRhTGlua3MuaW52b2ljZXMuYWRtaW5MaW5rJykpO1xufTtcbmZ1bmN0aW9uIGV4cG9ydENsaWNrKGU6IEV2ZW50KXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpZHMgPSBzZWxlY3RlZElkcy52YWx1ZTtcbiAgLy8gY29uc29sZS5sb2coJ2Rlc3RpbmF0aW9uIC0tPiAnKTtcbiAgLy8gY29uc29sZS5sb2codCgncGRmUHJlTGlua1RhcmdldCcpK2lkcy5qb2luKCcvJykpO1xuICByb3V0ZXIucHVzaCh7XG4gICAgcGF0aDogdCgncGRmUHJlTGlua1RhcmdldCcpK2lkcy5qb2luKCcvJyksIFxuICAgIC8vIHBhcmFtczogeyBpbnZvaWNlSWRzOiBzZWxlY3RlZElkcy52YWx1ZX1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKFwiZXhwb3J0IGNsaWNrICFcIik7XG4gIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkSWRzLnZhbHVlKTtcbn07XG5mdW5jdGlvbiBzYW5pdGl6ZVF1ZXJ5UmVzdWx0KG9iajogYW55KSB7XG4gIGxldCByZXQgPSBbXSwgaW5kID0gMDtcbiAgLy8gY29uc29sZS5sb2coJ3Nhbml0aXplUXVlcnlSZXN1bHQgIScpO1xuICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgY29uc3QgcHJldklkID0gayA+IDAgPyBvYmpbayAtIDFdLmZhY3R1cmVJZCA6IDA7XG4gICAgaWYgKHByZXZJZCAmJiBwcmV2SWQgIT09IG9ialtrXS5mYWN0dXJlSWQpe1xuICAgICAgaW5kKys7XG4gICAgfVxuICAgIGlmICghcHJldklkIHx8IChwcmV2SWQgJiYgcHJldklkICE9PSBvYmpba10uZmFjdHVyZUlkKSkge1xuICAgICAgcmV0W2luZF0gPSB7fTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBsIGluIG9ialtrXSkge1xuICAgICAgaWYgKHByZXZJZCA9PT0gb2JqW2tdLmZhY3R1cmVJZCkge1xuICAgICAgICBpZiAobCA9PT0gJ2NvbW1hbmRlcy5vcmRlcklkJykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9ialtrXVtsXSk7XG4gICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydjb21tYW5kZXMnXTtcbiAgICAgICAgICBpZighcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7b3JkZXJJZDogb2JqW2tdW2xdfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHJldFtpbmRdWydjb21tYW5kZXMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLm9yZGVySWQgPT09IG9ialtrXVtsXSk7XG4gICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtvcmRlcklkOiBvYmpba11bbF19KTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtmb3VuZEluZGV4XS5vcmRlcklkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGwgPT09ICdjb21tYW5kZXMuY29udGVudUFkZGl0aW9ubmVsJykge1xuICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgLy8gaWYgKG9ialtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICBpZiAoIXJldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7Y29udGVudUFkZGl0aW9ubmVsOiBvYmpba11bbF19KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsnY29tbWFuZGVzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5vcmRlcklkID09PSBvYmpba11bJ29yZGVySWQnXSk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ11bcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCAtIDFdLmNvbnRlbnVBZGRpdGlvbm5lbCA9IG9ialtrXVtsXTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtmb3VuZEluZGV4XS5jb250ZW51QWRkaXRpb25uZWwgPSBvYmpba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobCA9PT0gJ2NvbW1hbmRlcy5wcmljZUh0Jykge1xuICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddLnB1c2goe3ByaWNlSHQ6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHJldFtpbmRdWydjb21tYW5kZXMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLm9yZGVySWQgPT09IG9ialtrXVsnb3JkZXJJZCddKTtcbiAgICAgICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaWYoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ11bcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCAtIDFdLnByaWNlSHQgPSBvYmpba11bbF07XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW2ZvdW5kSW5kZXhdLnByaWNlSHQgPSBvYmpba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAnY29tbWFuZGVzLmZhY3R1cmVJZCcpIHtcbiAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10gPSByZXRbaW5kXVsnY29tbWFuZGVzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ2NvbW1hbmRlcyddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpe1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddLnB1c2goe2ZhY3R1cmVJZDogb2JqW2tdW2xdfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddLmZpbmRJbmRleChlbGVtID0+IGVsZW0ub3JkZXJJZCA9PT0gb2JqW2tdWydvcmRlcklkJ10pO1xuICAgICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ11bcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCAtIDFdLmZhY3R1cmVJZCA9IG9ialtrXVtsXTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ11bZm91bmRJbmRleF0uZmFjdHVyZUlkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50cy5wYXltZW50SWQnKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqW2tdW2xdKTtcbiAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgIGlmKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudElkOiBvYmpba11bbF19KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ3BheW1lbnRzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5wYXltZW50SWQgPT09IG9ialtrXVtsXSk7XG4gICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe3BheW1lbnRJZDogb2JqW2tdW2xdfSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtmb3VuZEluZGV4XS5wYXltZW50SWQgPSBvYmpba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50cy5ldGF0Jykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9ialtrXVtsXSk7XG4gICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICBpZighcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe2V0YXQ6IG9ialtrXVtsXX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsncGF5bWVudHMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLnBheW1lbnRJZCA9PT0gb2JqW2tdWydwYXltZW50cy5wYXltZW50SWQnXSk7XG4gICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW3JldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCAtIDFdLmV0YXQgPSBvYmpba11bbF07XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtmb3VuZEluZGV4XS5ldGF0ID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAncGF5bWVudHMucGF5bWVudFZhbHVlJykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9ialtrXVtsXSk7XG4gICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICBpZighcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe3BheW1lbnRWYWx1ZTogb2JqW2tdW2xdfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHJldFtpbmRdWydwYXltZW50cyddLmZpbmRJbmRleChlbGVtID0+IGVsZW0ucGF5bWVudElkID09PSBvYmpba11bJ3BheW1lbnRzLnBheW1lbnRJZCddKTtcbiAgICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpe1xuICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0ucGF5bWVudFZhbHVlID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bZm91bmRJbmRleF0ucGF5bWVudFZhbHVlID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAncGF5bWVudHMucGF5bWVudFR5cGUnKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqW2tdW2xdKTtcbiAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgIGlmKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudFR5cGU6IG9ialtrXVtsXX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsncGF5bWVudHMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLnBheW1lbnRJZCA9PT0gb2JqW2tdWydwYXltZW50cy5wYXltZW50SWQnXSk7XG4gICAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW3JldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCAtIDFdLnBheW1lbnRUeXBlID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bZm91bmRJbmRleF0ucGF5bWVudFR5cGUgPSBvYmpba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50cy5mYWN0dXJlSWQnKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqW2tdW2xdKTtcbiAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgIGlmKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7ZmFjdHVyZUlkOiBvYmpba11bbF19KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ3BheW1lbnRzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5wYXltZW50SWQgPT09IG9ialtrXVsncGF5bWVudHMucGF5bWVudElkJ10pO1xuICAgICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGggLSAxXS5mYWN0dXJlSWQgPSBvYmpba11bbF07XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtmb3VuZEluZGV4XS5mYWN0dXJlSWQgPSBvYmpba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGwgPT09ICdsYW5ndWUubGFuZ3VlSWQnKSB7XG4gICAgICAgICAgcmV0W2luZF1bJ2xhbmd1ZSddID0gcmV0W2luZF1bJ2xhbmd1ZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydsYW5ndWUnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ11bJ2xhbmd1ZUlkJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobCA9PT0gJ2xhbmd1ZS5saWJlbGxlJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2xhbmd1ZSddID0gcmV0W2luZF1bJ2xhbmd1ZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydsYW5ndWUnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ11bJ2xpYmVsbGUnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2xhbmd1ZS5ub20nKXtcbiAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSByZXRbaW5kXVsnbGFuZ3VlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2xhbmd1ZSddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXVsnbm9tJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdkZXZpc2UuZGV2aXNlSWQnKXtcbiAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSByZXRbaW5kXVsnZGV2aXNlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2RldmlzZSddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXVsnZGV2aXNlSWQnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2RldmlzZS5zeW1ib2xlJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2RldmlzZSddID0gcmV0W2luZF1bJ2RldmlzZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydkZXZpc2UnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ11bJ3N5bWJvbGUnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2RldmlzZS5saWJlbGxlJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2RldmlzZSddID0gcmV0W2luZF1bJ2RldmlzZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydkZXZpc2UnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ11bJ2xpYmVsbGUnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLmFjdG9ySWQnKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ2FjdG9ySWQnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLmNwJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSByZXRbaW5kXVsnYnV5ZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnYnV5ZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWydjcCddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIuZW1haWwnKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ2VtYWlsJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5ub20nKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ25vbSddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIubm9tUnVlJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSByZXRbaW5kXVsnYnV5ZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnYnV5ZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWydub21SdWUnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLm51bUNvbW1lcmNhbnQnKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIHJldFtpbmRdWydidXllciddWydudW1Db21tZXJjYW50J10gPSBvYmpba11bbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLm51bVJ1ZScpe1xuICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsnbnVtUnVlJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5wcmVub20nKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ3ByZW5vbSddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIudGVsJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSByZXRbaW5kXVsnYnV5ZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnYnV5ZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWyd0ZWwnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLmFjdG9yVHlwZUlkJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSByZXRbaW5kXVsnYnV5ZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnYnV5ZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWydhY3RvclR5cGVJZCddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIudmlsbGUnKXtcbiAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ3ZpbGxlJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIuYWN0b3JJZCcpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydhY3RvcklkJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIuY3AnKXtcbiAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSByZXRbaW5kXVsnc2VsbGVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ3NlbGxlciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXVsnY3AnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci5lbWFpbCcpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydlbWFpbCddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLm5vbScpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydub20nXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci5ub21SdWUnKXtcbiAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSByZXRbaW5kXVsnc2VsbGVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ3NlbGxlciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXVsnbm9tUnVlJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIubnVtQ29tbWVyY2FudCcpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydudW1Db21tZXJjYW50J10gPSBvYmpba11bbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci5udW1SdWUnKXtcbiAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSByZXRbaW5kXVsnc2VsbGVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ3NlbGxlciddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXVsnbnVtUnVlJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIucHJlbm9tJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ3ByZW5vbSddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLnRlbCcpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWyd0ZWwnXSA9IG9ialtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci5hY3RvclR5cGVJZCcpe1xuICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydhY3RvclR5cGVJZCddID0gb2JqW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLnZpbGxlJyl7XG4gICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ3ZpbGxlJ10gPSBvYmpba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobCA9PT0gJ2NvbW1hbmRlcy5vcmRlcklkJykge1xuICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddLnB1c2goe29yZGVySWQ6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5vcmRlcklkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAnY29tbWFuZGVzLmNvbnRlbnVBZGRpdGlvbm5lbCcpIHtcbiAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10gPSByZXRbaW5kXVsnY29tbWFuZGVzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ2NvbW1hbmRlcyddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtjb250ZW51QWRkaXRpb25uZWw6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5jb250ZW51QWRkaXRpb25uZWwgPSBvYmpba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGwgPT09ICdjb21tYW5kZXMucHJpY2VIdCcpIHtcbiAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10gPSByZXRbaW5kXVsnY29tbWFuZGVzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ2NvbW1hbmRlcyddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtwcmljZUh0OiBvYmpba11bbF19KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoIC0gMV0ucHJpY2VIdCA9IG9ialtrXVtsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobCA9PT0gJ2NvbW1hbmRlcy5mYWN0dXJlSWQnKSB7XG4gICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydjb21tYW5kZXMnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIXJldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7ZmFjdHVyZUlkOiBvYmpba11bbF19KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoIC0gMV0uZmFjdHVyZUlkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAncGF5bWVudHMucGF5bWVudElkJykge1xuICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddID0gcmV0W2luZF1bJ3BheW1lbnRzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ3BheW1lbnRzJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXS5wdXNoKHtwYXltZW50SWQ6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0ucGF5bWVudElkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAncGF5bWVudHMuZXRhdCcpIHtcbiAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgIGlmIChvYmpba11bbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7ZXRhdDogb2JqW2tdW2xdfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGggLSAxXS5ldGF0ID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAncGF5bWVudHMucGF5bWVudFZhbHVlJykge1xuICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddID0gcmV0W2luZF1bJ3BheW1lbnRzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ3BheW1lbnRzJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXS5wdXNoKHtwYXltZW50VmFsdWU6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0ucGF5bWVudFZhbHVlID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAncGF5bWVudHMucGF5bWVudFR5cGUnKSB7XG4gICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICBpZiAob2JqW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIXJldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe3BheW1lbnRUeXBlOiBvYmpba11bbF19KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW3JldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCAtIDFdLnBheW1lbnRUeXBlID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsID09PSAncGF5bWVudHMuZmFjdHVyZUlkJykge1xuICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddID0gcmV0W2luZF1bJ3BheW1lbnRzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ3BheW1lbnRzJ107XG4gICAgICAgICAgaWYgKG9ialtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXS5wdXNoKHtmYWN0dXJlSWQ6IG9ialtrXVtsXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0uZmFjdHVyZUlkID0gb2JqW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0W2luZF1bbF0gPSBvYmpba11bbF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiBoYW5kbGVPcmllbnRhdGlvbigpe1xuICAvLyBjb25zb2xlLmxvZyhzY3JlZW4ub3JpZW50YXRpb24pO1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xufTtcblxuLy8gV0FUQ0hFUlNcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xuXG4vLyBPVEhFUlxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZyBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1zdGFydCBjb250ZW50LXN0YXJ0XCI+XG4gICAgPCEtLSBjb250ZW50IC0tPlxuICAgIDxleHBvcnQtY29tcG9uZW50XG4gICAgICB2LWlmPVwicmVuZGVyQ29tcG9uZW50XCJcbiAgICAgIDpkYkNvbm49XCJkYkNvbm5cIj48L2V4cG9ydC1jb21wb25lbnQ+XG4gICAgICA8cm91dGVyLXZpZXcgOmRiQ29ubj1cImRiQ29ublwiLz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzOiAnb2ZmJyovXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgRXhwb3J0Q29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvRXhwb3J0Q29tcG9uZW50LnZ1ZSc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQYWdlUHJvcHMge1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsO1xufTtcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ2NoYW5nZS10YWInXSk7XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQYWdlUHJvcHM+KCksIHtcbiAgZGJDb25uOiBudWxsXG59KTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xub25Nb3VudGVkKCgpID0+IHtcbiAgZW1pdCgnY2hhbmdlLXRhYicsIHVuZGVmaW5lZCk7XG59KTtcbjwvc2NyaXB0PlxuIl0sImZpbGUiOiJhc3NldHMvRXhwb3J0UGFnZS5qcyJ9
