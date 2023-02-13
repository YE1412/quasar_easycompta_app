import { aH as defineStore, ac as _export_sfc, $ as defineComponent, ao as useI18n, l as inject, f as ref, d as computed, _ as __vitePreload, w as watch, o as onMounted, a3 as openBlock, a6 as createElementBlock, a1 as createBlock, b1 as createSlots, aq as unref, a2 as withCtx, a4 as createVNode, j as QBtn, ar as createBaseVNode, Q as QIcon, aa as toDisplayString, a8 as Fragment, a7 as renderList, a9 as createTextVNode, a5 as createCommentVNode, at as normalizeClass, b2 as renderSlot } from "./index.js";
import { Q as QTr, a as QTd, b as QTable } from "./QTable.js";
import { s as setDecryptApi, _ as __TRANSFORMOBJ__, u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, n as newQuery, c as closeDbConnection } from "./use-quasar.js";
import { s as serviceAxiosService, a as actorAxiosService, o as orderAxiosService } from "./service.service.js";
import { h as http } from "./index4.js";
import { u as useInvoiceStore } from "./invoice.js";
import { u as useSessionStore } from "./session.js";
const useServiceStore = defineStore("service", {
  state: () => ({
    services: []
  }),
  getters: {
    getServices(state) {
      return state.services;
    }
  },
  actions: {
    getAllServices() {
      return new Promise((resolve, reject) => {
        serviceAxiosService.getAll().then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.services = dataClear;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    }
  }
});
const useActorStore = defineStore("actor", {
  state: () => ({
    actors: [],
    types: []
  }),
  getters: {
    getActors(state) {
      return state.actors;
    },
    getTypes(state) {
      return state.types;
    }
  },
  actions: {
    getAllActors() {
      return new Promise((resolve, reject) => {
        actorAxiosService.getAll().then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.actors = dataClear;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    getAllTypes() {
      return new Promise((resolve, reject) => {
        actorAxiosService.getAllTypes().then((res) => {
          if (res.data.length) {
            this.types = res.data;
            resolve(res.data);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    }
  }
});
const useOrderStore = defineStore("order", {
  state: () => ({
    orders: []
  }),
  getters: {
    getActors(state) {
      return state.actors;
    },
    getTypes(state) {
      return state.types;
    }
  },
  actions: {
    getAllOrders() {
      return new Promise((resolve, reject) => {
        orderAxiosService.getAll().then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.orders = dataClear;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    }
  }
});
class PaymentDataService {
  getAll() {
    return http.get("/payments");
  }
  getAllTypes() {
    return http.get("/payments/types");
  }
  getAllInvoices() {
    return http.get("/payments/invoices");
  }
  get(id) {
    return http.get("/payments/find", {
      params: {
        actorId: id
      }
    });
  }
  create(data) {
    return http.post("/payments", data);
  }
  update(id, data) {
    return http.put(`/payments/${id}`, data);
  }
  delete(id) {
    return http.delete(`/payments/${id}`);
  }
  deleteAll() {
    return http.delete("/payments");
  }
  findByTypes(types) {
    return http.get(`/payments/types/${types}`);
  }
}
var paymentAxiosService = new PaymentDataService();
const usePaymentStore = defineStore("payment", {
  state: () => ({
    payments: [],
    types: [],
    invoices: []
  }),
  getters: {
    getPayments(state) {
      return state.payments;
    },
    getTypes(state) {
      return state.types;
    },
    getInvoices(state) {
      return state.invoices;
    }
  },
  actions: {
    getAllPayments() {
      return new Promise((resolve, reject) => {
        paymentAxiosService.getAll().then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.payments = dataClear;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    getAllPaymentTypes() {
      return new Promise((resolve, reject) => {
        paymentAxiosService.getAllTypes().then(async (res) => {
          if (res.data.length) {
            this.types = res.data;
            resolve(res.data);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    },
    getAllInvoices() {
      return new Promise((resolve, reject) => {
        paymentAxiosService.getAllInvoices().then(async (res) => {
          if (res.data.length) {
            await setDecryptApi();
            const dataClear = await __TRANSFORMOBJ__(res.data);
            this.invoices = dataClear;
            resolve(dataClear);
          } else {
            reject(false);
          }
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
          reject(new Error(err));
        });
      });
    }
  }
});
function clean(link) {
  setTimeout(() => {
    window.URL.revokeObjectURL(link.href);
  }, 1e4);
  link.remove();
}
function exportFile(fileName, rawData, opts = {}) {
  const { mimeType, byteOrderMark, encoding } = typeof opts === "string" ? { mimeType: opts } : opts;
  const data = encoding !== void 0 ? new TextEncoder(encoding).encode([rawData]) : rawData;
  const blobData = byteOrderMark !== void 0 ? [byteOrderMark, data] : [data];
  const blob = new Blob(blobData, { type: mimeType || "application/octet-stream" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  if (typeof link.download === "undefined") {
    link.setAttribute("target", "_blank");
  }
  link.classList.add("hidden");
  link.style.position = "fixed";
  document.body.appendChild(link);
  try {
    link.click();
    clean(link);
    return true;
  } catch (err) {
    clean(link);
    return err;
  }
}
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "full-width row flex-center text-accent q-gutter-sm" };
const _hoisted_3 = { style: { "text-align": "center", "display": "flex", "justify-content": "space-around" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TableItem",
  props: {
    tableTitle: { default: "" },
    isForm: { type: Boolean, default: false },
    addActionName: { default: "" },
    updateActionName: { default: "" },
    deleteActionName: { default: "" },
    updating: { type: Boolean, default: false },
    adding: { type: Boolean, default: true },
    addForm: { default: "" },
    tableObj: { default: () => ({ label: "", name: "" }) },
    addDefaultRow: { default: () => [] },
    updateObj: null,
    admin: { type: Boolean, default: true },
    display: { type: Boolean, default: false },
    colSpan: { default: "1" },
    ident: { default: "" },
    no_data_label: { default: "" },
    no_data_button_text: { default: "" },
    dbConn: null
  },
  setup(__props) {
    const props = __props;
    const $q = useQuasar();
    const { t } = useI18n({ useScope: "global" });
    const platform = $q.platform;
    const src = inject("src");
    const objContents = ref([]);
    const contents = ref([]);
    const tableActorsTypeLibelle = computed(() => {
      let ret = [];
      if (src === "actors") {
        for (const k in objContents.value) {
          for (const l in objContents.value[k]) {
            if (l === "personne_type") {
              let libelle = objContents.value[k][l].seller && objContents.value[k][l].buyer ? t("actorsComponent.libelles.actorTypes.both") : "";
              libelle = objContents.value[k][l].seller && !objContents.value[k][l].buyer ? t("actorsComponent.libelles.actorTypes.seller") : libelle;
              libelle = !objContents.value[k][l].seller && objContents.value[k][l].buyer ? t("actorsComponent.libelles.actorTypes.buyer") : libelle;
              ret[k] = libelle;
            }
          }
        }
      }
      return ret;
    });
    const contentsForDisp = computed(() => {
      let ret = [];
      for (const key in objContents.value) {
        ret[key] = {};
        for (const key2 in objContents.value[key]) {
          if (key2 === "personne_type") {
            ret[key][key2] = tableActorsTypeLibelle.value[key];
          } else if (key2 === "numCommercant") {
            ret[key][key2] = tableActorsSellNumLibelle(key);
          } else if (key2 === "facture") {
            ret[key][key2] = tableOrdersInvoiceLibelle(key);
          } else if (key2 === "Services") {
            ret[key]["services"] = tableOrdersServicesLibelle(key);
          } else if (key2 === "contenuAdditionnel") {
            ret[key][key2] = tableOrdersAddContentLibelle(key);
          } else if (key2 === "payment_type") {
            ret[key][key2] = tablePaymentsTypeLibelle(key);
          } else if (key2 === "etat") {
            ret[key][key2] = tablePaymentsStateLibelle(key);
          } else if (key2 === "buyer") {
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
          } else {
            ret[key][key2] = objContents.value[key][key2];
          }
        }
      }
      return ret;
    });
    const tableHeadForDisplay = ref([]);
    [props.addActionName, props.updateActionName, props.deleteActionName];
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
    let serviceStore = null, actorStore = null, orderStore = null, paymentStore = null, invoiceStore = null, sessionStore = null, userStore = null, prefs = null, session = null;
    if (platform.is.desktop) {
      serviceStore = useServiceStore();
      actorStore = useActorStore();
      orderStore = useOrderStore();
      paymentStore = usePaymentStore();
      invoiceStore = useInvoiceStore();
      sessionStore = useSessionStore();
      userStore = useUserStore();
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        session = await prefs.getPref("session");
      })();
    }
    async function hydrateObjContentFromStore() {
      let contentTab = [];
      if (src === "services") {
        return contentTab = await serviceStore.getAllServices().then((res) => {
          return res;
        }, () => {
          return [];
        }).catch(() => {
          return [];
        });
      } else if (src === "actors") {
        return contentTab = await actorStore.getAllActors().then((res) => {
          return res;
        }, () => {
          return [];
        }).catch(() => {
          return [];
        });
      } else if (src === "orders") {
        return contentTab = await orderStore.getAllOrders().then((res) => {
          return res;
        }, () => {
          return [];
        }).catch(() => {
          return [];
        });
      } else if (src === "payments") {
        return contentTab = await paymentStore.getAllPayments().then((res) => {
          return res;
        }, () => {
          return [];
        }).catch(() => {
          return [];
        });
      } else if (src === "invoices") {
        return contentTab = await invoiceStore.getAllInvoices(userStore.getUser.userId).then((res) => {
          return res;
        }, () => {
          return [];
        }).catch(() => {
          return [];
        });
      } else {
        return contentTab;
      }
    }
    async function hydrateObjContentFromSQLite() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      let res = [];
      if (isOpen) {
        let sql = "";
        if (src === "services") {
          sql = "SELECT `service`.`serviceId`, `service`.`nom`, `service`.`montantHt`, `service`.`quantite` FROM `produitservice` AS `service`;";
          const values = await newQuery(props.dbConn, sql);
          res = values.values;
        } else if (src === "actors") {
          sql = "SELECT `personne`.`actorId`, `personne`.`prenom`, `personne`.`nom`, `personne`.`email`, `personne`.`numRue`, `personne`.`nomRue`, `personne`.`cp`, `personne`.`ville`, `personne`.`tel`, `personne`.`numCommercant`, `personne_type`.`actorTypeId`, `personne_type`.`actorTypeId` AS `personne_type.actorTypeId`, `personne_type`.`seller` AS `personne_type.seller`, `personne_type`.`buyer` AS `personne_type.buyer` FROM `personne` AS `personne` LEFT OUTER JOIN `personne_type` AS `personne_type` ON `personne`.`actorTypeId` = `personne_type`.`actorTypeId`;";
          const values = await newQuery(props.dbConn, sql);
          res = values.values;
        } else if (src === "orders") {
          sql = "SELECT `commande`.`orderId`, `commande`.`contenuAdditionnel`, `commande`.`priceHt`, `Services`.`serviceId` AS `Services.serviceId`, `Services`.`montantHt` AS `Services.montantHt`, `Services`.`nom` AS `Services.nom`, `Services`.`quantite` AS `Services.quantite`, `facture`.`factureId` AS `facture.factureId`, `facture`.`date` AS `facture.date`, `facture`.`invoiceHTPrice` AS `facture.invoiceHTPrice`, `facture`.`invoiceTTPrice` AS `facture.invoiceTTPrice`, `facture`.`languageId` AS `facture.languageId`, `facture`.`deviseId` AS `facture.deviseId`, `facture`.`tvaValue` AS `facture.tvaValue`, `facture`.`buyerId` AS `facture.buyerId`, `facture`.`sellerId` AS `facture.sellerId`, `facture`.`administratorId` AS `facture.administratorId` FROM `commande` AS `commande` LEFT OUTER JOIN ( `contains` AS `Services->contains` INNER JOIN `produitservice` AS `Services` ON `Services`.`serviceId` = `Services->contains`.`serviceId`) ON `commande`.`orderId` = `Services->contains`.`orderId` LEFT OUTER JOIN `facture` AS `facture` ON `commande`.`factureId` = `facture`.`factureId`;";
          const values = await newQuery(props.dbConn, sql);
          res = values.values;
        } else if (src === "payments") {
          sql = "SELECT `payment`.`paymentId`, `payment`.`etat`, `payment`.`paymentValue`, `payment_type`.`paymentTypeId` AS `payment_type.paymentTypeId`, `payment_type`.`cb` AS `payment_type.cb`, `payment_type`.`esp` AS `payment_type.esp`, `payment_type`.`chq` AS `payment_type.chq`, `facture`.`factureId` AS `facture.factureId`, `facture`.`date` AS `facture.date`, `facture`.`invoiceHTPrice` AS `facture.invoiceHTPrice`, `facture`.`invoiceTTPrice` AS `facture.invoiceTTPrice`, `facture`.`languageId` AS `facture.languageId`, `facture`.`deviseId` AS `facture.deviseId`, `facture`.`tvaValue` AS `facture.tvaValue`, `facture`.`buyerId` AS `facture.buyerId`, `facture`.`sellerId` AS `facture.sellerId`, `facture`.`administratorId` AS `facture.administratorId` FROM `payment` AS `payment` LEFT OUTER JOIN `payment_type` AS `payment_type` ON `payment`.`paymentType` = `payment_type`.`paymentTypeId` LEFT OUTER JOIN `facture` AS `facture` ON `payment`.`factureId` = `facture`.`factureId`;";
          const values = await newQuery(props.dbConn, sql);
          res = values.values;
        } else if (src === "invoices") {
          prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
          const usr = await prefs.getPref("user");
          sql = "SELECT `facture`.`factureId`, `facture`.`date`, `facture`.`invoiceHTPrice`, `facture`.`invoiceTTPrice`, `facture`.`tvaValue`, `langue`.`langueId` AS `langue.langueId`, `langue`.`libelle` AS `langue.libelle`, `langue`.`nom` AS `langue.nom`, `devise`.`deviseId` AS `devise.deviseId`, `devise`.`symbole` AS `devise.symbole`, `devise`.`libelle` AS `devise.libelle`, `buyer`.`actorId` AS `buyer.actorId`, `buyer`.`cp` AS `buyer.cp`, `buyer`.`email` AS `buyer.email`, `buyer`.`nom` AS `buyer.nom`, `buyer`.`nomRue` AS `buyer.nomRue`, `buyer`.`numCommercant` AS `buyer.numCommercant`, `buyer`.`numRue` AS `buyer.numRue`, `buyer`.`prenom` AS `buyer.prenom`, `buyer`.`tel` AS `buyer.tel`, `buyer`.`actorTypeId` AS `buyer.actorTypeId`, `buyer`.`ville` AS `buyer.ville`, `seller`.`actorId` AS `seller.actorId`, `seller`.`cp` AS `seller.cp`, `seller`.`email` AS `seller.email`, `seller`.`nom` AS `seller.nom`, `seller`.`nomRue` AS `seller.nomRue`, `seller`.`numCommercant` AS `seller.numCommercant`, `seller`.`numRue` AS `seller.numRue`, `seller`.`prenom` AS `seller.prenom`, `seller`.`tel` AS `seller.tel`, `seller`.`actorTypeId` AS `seller.actorTypeId`, `seller`.`ville` AS `seller.ville`, `commandes`.`orderId` AS `commandes.orderId`, `commandes`.`contenuAdditionnel` AS `commandes.contenuAdditionnel`, `commandes`.`priceHt` AS `commandes.priceHt`, `commandes`.`factureId` AS `commandes.factureId`, `payments`.`paymentId` AS `payments.paymentId`, `payments`.`etat` AS `payments.etat`, `payments`.`paymentValue` AS `payments.paymentValue`, `payments`.`paymentType` AS `payments.paymentType`, `payments`.`factureId` AS `payments.factureId` FROM `facture` AS `facture` LEFT OUTER JOIN `langue` AS `langue` ON `facture`.`languageId` = `langue`.`langueId` LEFT OUTER JOIN `devise` AS `devise` ON `facture`.`deviseId` = `devise`.`deviseId` LEFT OUTER JOIN `personne` AS `buyer` ON `facture`.`buyerId` = `buyer`.`actorId` LEFT OUTER JOIN `personne` AS `seller` ON `facture`.`sellerId` = `seller`.`actorId` LEFT OUTER JOIN `commande` AS `commandes` ON `facture`.`factureId` = `commandes`.`factureId` LEFT OUTER JOIN `payment` AS `payments` ON `facture`.`factureId` = `payments`.`factureId` WHERE `facture`.`administratorId` = '" + usr.user.userId + "' GROUP BY `facture`.`factureId`, `payments.paymentId`, `commandes.orderId`;";
          const values = await newQuery(props.dbConn, sql);
          res = values.values;
        }
        closeDbConnection(props.dbConn);
        return res;
      }
      return res;
    }
    function transformObjContentFromSQLiteDb() {
      if (platform.is.mobile) {
        let ret = [];
        if (src === "actors") {
          for (const k in objContents.value) {
            ret[k] = {};
            for (const l in objContents.value[k]) {
              if (l === "personne_type.actorTypeId") {
                ret[k]["personne_type"] = ret[k]["personne_type"] === void 0 ? {} : ret[k]["personne_type"];
                ret[k]["personne_type"]["actorTypeId"] = objContents.value[k][l];
              } else if (l === "personne_type.seller") {
                ret[k]["personne_type"] = ret[k]["personne_type"] === void 0 ? {} : ret[k]["personne_type"];
                ret[k]["personne_type"]["seller"] = objContents.value[k][l];
              } else if (l === "personne_type.buyer") {
                ret[k]["personne_type"] = ret[k]["personne_type"] === void 0 ? {} : ret[k]["personne_type"];
                ret[k]["personne_type"]["buyer"] = objContents.value[k][l];
              } else {
                ret[k][l] = objContents.value[k][l];
              }
            }
          }
        } else if (src === "orders") {
          let ind = 0;
          for (const k in objContents.value) {
            const prevId = k > 0 ? objContents.value[k - 1].orderId : 0;
            if (prevId && prevId !== objContents.value[k].orderId) {
              ind++;
            }
            if (!prevId || prevId && prevId !== objContents.value[k].orderId) {
              ret[ind] = {};
            }
            for (const l in objContents.value[k]) {
              if (prevId === objContents.value[k].orderId) {
                if (l === "Services.serviceId") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  ret[ind]["Services"].push({ serviceId: objContents.value[k][l] });
                } else if (l === "Services.montantHt") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ montantHt: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].montantHt = objContents.value[k][l];
                  }
                } else if (l === "Services.nom") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ nom: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].nom = objContents.value[k][l];
                  }
                } else if (l === "Services.quantite") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ quantite: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].quantite = objContents.value[k][l];
                  }
                }
              } else {
                if (l === "Services.serviceId") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ serviceId: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].serviceId = objContents.value[k][l];
                  }
                } else if (l === "Services.montantHt") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ montantHt: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].montantHt = objContents.value[k][l];
                  }
                } else if (l === "Services.nom") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ nom: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].nom = objContents.value[k][l];
                  }
                } else if (l === "Services.quantite") {
                  ret[ind]["Services"] = ret[ind]["Services"] === void 0 ? [] : ret[ind]["Services"];
                  if (!ret[ind]["Services"].length) {
                    ret[ind]["Services"].push({ quantite: objContents.value[k][l] });
                  } else {
                    ret[ind]["Services"][ret[ind]["Services"].length - 1].quantite = objContents.value[k][l];
                  }
                } else if (l === "facture.factureId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["factureId"] = objContents.value[k][l];
                  }
                } else if (l === "facture.date") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["date"] = objContents.value[k][l];
                  }
                } else if (l === "facture.invoiceHTPrice") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["invoiceHTPrice"] = objContents.value[k][l];
                  }
                } else if (l === "facture.invoiceTTPrice") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["invoiceTTPrice"] = objContents.value[k][l];
                  }
                } else if (l === "facture.languageId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["lauguageId"] = objContents.value[k][l];
                  }
                } else if (l === "facture.deviseId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["deviseId"] = objContents.value[k][l];
                  }
                } else if (l === "facture.tvaValue") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["tvaValue"] = objContents.value[k][l];
                  }
                } else if (l === "facture.buyerId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["buyerId"] = objContents.value[k][l];
                  }
                } else if (l === "facture.sellerId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["sellerId"] = objContents.value[k][l];
                  }
                } else if (l === "facture.administratorId") {
                  ret[ind]["facture"] = ret[ind]["facture"] === void 0 ? {} : ret[ind]["facture"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["facture"] = null;
                  } else {
                    ret[ind]["facture"]["administratorId"] = objContents.value[k][l];
                  }
                } else {
                  ret[ind][l] = objContents.value[k][l];
                }
              }
            }
          }
        } else if (src === "payments") {
          for (const k in objContents.value) {
            ret[k] = {};
            for (const l in objContents.value[k]) {
              if (l === "payment_type.paymentTypeId") {
                ret[k]["payment_type"] = ret[k]["payment_type"] === void 0 ? {} : ret[k]["payment_type"];
                ret[k]["payment_type"].paymentTypeId = objContents.value[k][l];
              } else if (l === "payment_type.cb") {
                ret[k]["payment_type"] = ret[k]["payment_type"] === void 0 ? {} : ret[k]["payment_type"];
                ret[k]["payment_type"].cb = objContents.value[k][l];
              } else if (l === "payment_type.esp") {
                ret[k]["payment_type"] = ret[k]["payment_type"] === void 0 ? {} : ret[k]["payment_type"];
                ret[k]["payment_type"].esp = objContents.value[k][l];
              } else if (l === "payment_type.chq") {
                ret[k]["payment_type"] = ret[k]["payment_type"] === void 0 ? {} : ret[k]["payment_type"];
                ret[k]["payment_type"].chq = objContents.value[k][l];
              } else if (l === "facture.factureId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["factureId"] = objContents.value[k][l];
              } else if (l === "facture.date") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["date"] = objContents.value[k][l];
              } else if (l === "facture.invoiceHTPrice") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["invoiceHTPrice"] = objContents.value[k][l];
              } else if (l === "facture.invoiceTTPrice") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["invoiceTTPrice"] = objContents.value[k][l];
              } else if (l === "facture.languageId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["lauguageId"] = objContents.value[k][l];
              } else if (l === "facture.deviseId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["deviseId"] = objContents.value[k][l];
              } else if (l === "facture.tvaValue") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["tvaValue"] = objContents.value[k][l];
              } else if (l === "facture.buyerId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["buyerId"] = objContents.value[k][l];
              } else if (l === "facture.sellerId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["sellerId"] = objContents.value[k][l];
              } else if (l === "facture.administratorId") {
                ret[k]["facture"] = ret[k]["facture"] === void 0 ? {} : ret[k]["facture"];
                ret[k]["facture"]["administratorId"] = objContents.value[k][l];
              } else {
                ret[k][l] = objContents.value[k][l];
              }
            }
          }
        } else if (src === "invoices") {
          let ind = 0;
          for (const k in objContents.value) {
            const prevId = k > 0 ? objContents.value[k - 1].factureId : 0;
            if (prevId && prevId !== objContents.value[k].factureId) {
              ind++;
            }
            if (!prevId || prevId && prevId !== objContents.value[k].factureId) {
              ret[ind] = {};
            }
            for (const l in objContents.value[k]) {
              if (prevId === objContents.value[k].factureId) {
                if (l === "commandes.orderId") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (!ret[ind]["commandes"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["commandes"].push({ orderId: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === objContents.value[k][l]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["commandes"].push({ orderId: objContents.value[k][l] });
                      else
                        ret[ind]["commandes"][foundIndex].orderId = objContents.value[k][l];
                    }
                  }
                } else if (l === "commandes.contenuAdditionnel") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (!ret[ind]["commandes"].length) {
                    ret[ind]["commandes"].push({ contenuAdditionnel: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === objContents.value[k]["orderId"]);
                    if (foundIndex === -1)
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].contenuAdditionnel = objContents.value[k][l];
                    else
                      ret[ind]["commandes"][foundIndex].contenuAdditionnel = objContents.value[k][l];
                  }
                } else if (l === "commandes.priceHt") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ priceHt: objContents.value[k][l] });
                    } else {
                      const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === objContents.value[k]["orderId"]);
                      if (objContents.value[k][l] !== null) {
                        if (foundIndex === -1)
                          ret[ind]["commandes"][ret[ind]["commandes"].length - 1].priceHt = objContents.value[k][l];
                        else
                          ret[ind]["commandes"][foundIndex].priceHt = objContents.value[k][l];
                      }
                    }
                  }
                } else if (l === "commandes.factureId") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ factureId: objContents.value[k][l] });
                    } else {
                      const foundIndex = ret[ind]["commandes"].findIndex((elem) => elem.orderId === objContents.value[k]["orderId"]);
                      if (objContents.value[k][l] !== null) {
                        if (foundIndex === -1)
                          ret[ind]["commandes"][ret[ind]["commandes"].length - 1].factureId = objContents.value[k][l];
                        else
                          ret[ind]["commandes"][foundIndex].factureId = objContents.value[k][l];
                      }
                    }
                  }
                } else if (l === "payments.paymentId") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (!ret[ind]["payments"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["payments"].push({ paymentId: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === objContents.value[k][l]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["payments"].push({ paymentId: objContents.value[k][l] });
                      else
                        ret[ind]["payments"][foundIndex].paymentId = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.etat") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (!ret[ind]["payments"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["payments"].push({ etat: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === objContents.value[k]["payments.paymentId"]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["payments"][ret[ind]["payments"].length - 1].etat = objContents.value[k][l];
                      else
                        ret[ind]["payments"][foundIndex].etat = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.paymentValue") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (!ret[ind]["payments"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["payments"].push({ paymentValue: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === objContents.value[k]["payments.paymentId"]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentValue = objContents.value[k][l];
                      else
                        ret[ind]["payments"][foundIndex].paymentValue = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.paymentType") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (!ret[ind]["payments"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["payments"].push({ paymentType: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === objContents.value[k]["payments.paymentId"]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentType = objContents.value[k][l];
                      else
                        ret[ind]["payments"][foundIndex].paymentType = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.factureId") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (!ret[ind]["payments"].length) {
                    if (objContents.value[k][l] !== null)
                      ret[ind]["payments"].push({ factureId: objContents.value[k][l] });
                  } else {
                    const foundIndex = ret[ind]["payments"].findIndex((elem) => elem.paymentId === objContents.value[k]["payments.paymentId"]);
                    if (objContents.value[k][l] !== null) {
                      if (foundIndex === -1)
                        ret[ind]["payments"][ret[ind]["payments"].length - 1].factureId = objContents.value[k][l];
                      else
                        ret[ind]["payments"][foundIndex].factureId = objContents.value[k][l];
                    }
                  }
                }
              } else {
                if (l === "langue.langueId") {
                  ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["langue"] = null;
                  } else {
                    ret[ind]["langue"]["langueId"] = objContents.value[k][l];
                  }
                } else if (l === "langue.libelle") {
                  ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["langue"] = null;
                  } else {
                    ret[ind]["langue"]["libelle"] = objContents.value[k][l];
                  }
                } else if (l === "langue.nom") {
                  ret[ind]["langue"] = ret[ind]["langue"] === void 0 ? {} : ret[ind]["langue"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["langue"] = null;
                  } else {
                    ret[ind]["langue"]["nom"] = objContents.value[k][l];
                  }
                } else if (l === "devise.deviseId") {
                  ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["devise"] = null;
                  } else {
                    ret[ind]["devise"]["deviseId"] = objContents.value[k][l];
                  }
                } else if (l === "devise.symbole") {
                  ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["devise"] = null;
                  } else {
                    ret[ind]["devise"]["symbole"] = objContents.value[k][l];
                  }
                } else if (l === "devise.libelle") {
                  ret[ind]["devise"] = ret[ind]["devise"] === void 0 ? {} : ret[ind]["devise"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["devise"] = null;
                  } else {
                    ret[ind]["devise"]["libelle"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.actorId") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["actorId"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.cp") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["cp"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.email") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["email"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.nom") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["nom"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.nomRue") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["nomRue"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.numCommercant") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  ret[ind]["buyer"]["numCommercant"] = objContents.value[k][l];
                } else if (l === "buyer.numRue") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["numRue"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.prenom") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["prenom"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.tel") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["tel"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.actorTypeId") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["actorTypeId"] = objContents.value[k][l];
                  }
                } else if (l === "buyer.ville") {
                  ret[ind]["buyer"] = ret[ind]["buyer"] === void 0 ? {} : ret[ind]["buyer"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["buyer"] = null;
                  } else {
                    ret[ind]["buyer"]["ville"] = objContents.value[k][l];
                  }
                } else if (l === "seller.actorId") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["actorId"] = objContents.value[k][l];
                  }
                } else if (l === "seller.cp") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["cp"] = objContents.value[k][l];
                  }
                } else if (l === "seller.email") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["email"] = objContents.value[k][l];
                  }
                } else if (l === "seller.nom") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["nom"] = objContents.value[k][l];
                  }
                } else if (l === "seller.nomRue") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["nomRue"] = objContents.value[k][l];
                  }
                } else if (l === "seller.numCommercant") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  ret[ind]["seller"]["numCommercant"] = objContents.value[k][l];
                } else if (l === "seller.numRue") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["numRue"] = objContents.value[k][l];
                  }
                } else if (l === "seller.prenom") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["prenom"] = objContents.value[k][l];
                  }
                } else if (l === "seller.tel") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["tel"] = objContents.value[k][l];
                  }
                } else if (l === "seller.actorTypeId") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["actorTypeId"] = objContents.value[k][l];
                  }
                } else if (l === "seller.ville") {
                  ret[ind]["seller"] = ret[ind]["seller"] === void 0 ? {} : ret[ind]["seller"];
                  if (objContents.value[k][l] === null) {
                    ret[ind]["seller"] = null;
                  } else {
                    ret[ind]["seller"]["ville"] = objContents.value[k][l];
                  }
                } else if (l === "commandes.orderId") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ orderId: objContents.value[k][l] });
                    } else {
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].orderId = objContents.value[k][l];
                    }
                  }
                } else if (l === "commandes.contenuAdditionnel") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ contenuAdditionnel: objContents.value[k][l] });
                    } else {
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].contenuAdditionnel = objContents.value[k][l];
                    }
                  }
                } else if (l === "commandes.priceHt") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ priceHt: objContents.value[k][l] });
                    } else {
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].priceHt = objContents.value[k][l];
                    }
                  }
                } else if (l === "commandes.factureId") {
                  ret[ind]["commandes"] = ret[ind]["commandes"] === void 0 ? [] : ret[ind]["commandes"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["commandes"].length) {
                      ret[ind]["commandes"].push({ factureId: objContents.value[k][l] });
                    } else {
                      ret[ind]["commandes"][ret[ind]["commandes"].length - 1].factureId = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.paymentId") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["payments"].length) {
                      ret[ind]["payments"].push({ paymentId: objContents.value[k][l] });
                    } else {
                      ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentId = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.etat") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["payments"].length) {
                      ret[ind]["payments"].push({ etat: objContents.value[k][l] });
                    } else {
                      ret[ind]["payments"][ret[ind]["payments"].length - 1].etat = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.paymentValue") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["payments"].length) {
                      ret[ind]["payments"].push({ paymentValue: objContents.value[k][l] });
                    } else {
                      ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentValue = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.paymentType") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["payments"].length) {
                      ret[ind]["payments"].push({ paymentType: objContents.value[k][l] });
                    } else {
                      ret[ind]["payments"][ret[ind]["payments"].length - 1].paymentType = objContents.value[k][l];
                    }
                  }
                } else if (l === "payments.factureId") {
                  ret[ind]["payments"] = ret[ind]["payments"] === void 0 ? [] : ret[ind]["payments"];
                  if (objContents.value[k][l] !== null) {
                    if (!ret[ind]["payments"].length) {
                      ret[ind]["payments"].push({ factureId: objContents.value[k][l] });
                    } else {
                      ret[ind]["payments"][ret[ind]["payments"].length - 1].factureId = objContents.value[k][l];
                    }
                  }
                } else {
                  ret[ind][l] = objContents.value[k][l];
                }
              }
            }
          }
        }
        if (src !== "services") {
          objContents.value = ret;
        }
      }
    }
    function tableActorsSellNumLibelle(ind) {
      let ret = "";
      let libelle = objContents.value[ind]["numCommercant"];
      if (objContents.value[ind]["numCommercant"] === null) {
        libelle = t("actorsComponent.libelles.no_sellerNum");
      }
      ret = libelle;
      return ret;
    }
    function tableOrdersInvoiceLibelle(ind) {
      let ret = "";
      let libelle = t("ordersComponent.libelles.no_invoice");
      if (objContents.value[ind]["facture"] !== null) {
        libelle = `${objContents.value[ind]["facture"].factureId} - ${objContents.value[ind]["facture"].invoiceTTPrice}`;
      }
      ret = libelle;
      return ret;
    }
    function tableOrdersServicesLibelle(ind) {
      let ret = "";
      if (objContents.value[ind]["Services"] !== null) {
        for (const m in objContents.value[ind]["Services"]) {
          let libelle = `${objContents.value[ind]["Services"][m].serviceId} - ${objContents.value[ind]["Services"][m].nom}`;
          ret += m != objContents.value[ind]["Services"].length - 1 ? `${libelle}, ` : libelle;
        }
      }
      return ret;
    }
    function tableOrdersAddContentLibelle(ind) {
      let ret = "";
      let libelle = objContents.value[ind]["contenuAdditionnel"];
      if (objContents.value[ind]["contenuAdditionnel"] === null || objContents.value[ind]["contenuAdditionnel"] === "") {
        libelle = t("ordersComponent.libelles.no_additional_content");
      }
      ret = libelle;
      return ret;
    }
    function tablePaymentsTypeLibelle(ind) {
      let ret = "";
      let libelle = objContents.value[ind]["payment_type"].cb ? t("paymentsComponent.libelles.types.cb") : "";
      libelle = objContents.value[ind]["payment_type"].esp ? t("paymentsComponent.libelles.types.esp") : libelle;
      libelle = objContents.value[ind]["payment_type"].chq ? t("paymentsComponent.libelles.types.chq") : libelle;
      ret = libelle;
      return ret;
    }
    function tablePaymentsStateLibelle(ind) {
      let ret = "";
      let libelle = objContents.value[ind]["etat"] === 1 ? t("paymentsComponent.libelles.etats.paid") : "";
      libelle = objContents.value[ind]["etat"] === 0 ? t("paymentsComponent.libelles.etats.not_paid") : libelle;
      ret = libelle;
      return ret;
    }
    function tableInvoicesBuyerLibelle(ind) {
      let ret = "";
      let libelle = `${objContents.value[ind]["buyer"].actorId} - ${objContents.value[ind]["buyer"].prenom} ${objContents.value[ind]["buyer"].nom}`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesSellerLibelle(ind) {
      let ret = "";
      let libelle = `${objContents.value[ind]["seller"].actorId} - ${objContents.value[ind]["seller"].prenom} ${objContents.value[ind]["seller"].nom}`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesOrdersLibelle(ind) {
      let ret = "", libelle = "";
      for (const m in objContents.value[ind]["commandes"]) {
        libelle = `${objContents.value[ind]["commandes"][m].orderId} - ${objContents.value[ind]["commandes"][m].priceHt}`;
        ret += m != objContents.value[ind]["commandes"].length - 1 ? `${libelle}, ` : libelle;
      }
      ret = ret === "" ? t("invoicesComponent.libelles.no_order") : ret;
      return ret;
    }
    function tableInvoicesDeviseLibelle(ind) {
      let ret = "";
      let libelle = !!objContents.value[ind]["devise"] ? `${objContents.value[ind]["devise"].symbole} - ${objContents.value[ind]["devise"].libelle}` : t("invoicesComponent.libelles.no_devise");
      ret = libelle;
      return ret;
    }
    function tableInvoicesLangueLibelle(ind) {
      let ret = "";
      let libelle = !!objContents.value[ind]["langue"] ? objContents.value[ind]["langue"]["libelle"] : t("invoicesComponent.libelles.no_language");
      ret = libelle;
      return ret;
    }
    function tableInvoicesPaymentsLibelle(ind) {
      let ret = "", libelle = "", state = "";
      for (const m in objContents.value[ind]["payments"]) {
        state = objContents.value[ind]["payments"][m].etat === 0 ? t("paymentsComponent.libelles.etats.not_paid") : "";
        state = objContents.value[ind]["payments"][m].etat === 1 ? t("paymentsComponent.libelles.etats.paid") : state;
        libelle = `${objContents.value[ind]["payments"][m].paymentId} - ${state} - ${objContents.value[ind]["payments"][m].paymentValue}`;
        ret += m != objContents.value[ind]["payments"].length - 1 ? `${libelle}, ` : libelle;
      }
      ret = ret === "" ? t("invoicesComponent.libelles.no_payment") : ret;
      return ret;
    }
    function tableInvoicesVATLibelle(ind) {
      let ret = "", libelle = "";
      libelle = `${objContents.value[ind].tvaValue * 100} %`;
      ret = libelle;
      return ret;
    }
    function tableInvoicesDateLibelle(ind) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      let ret = "", libelle = "", date = "", locale = "en-US";
      if (!!objContents.value[ind]["date"] && objContents.value[ind]["date"] !== "") {
        date = new Date(objContents.value[ind]["date"]);
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
    async function hydrateAll() {
      if (platform.is.desktop) {
        objContents.value = await hydrateObjContentFromStore();
      } else {
        objContents.value = await hydrateObjContentFromSQLite();
        transformObjContentFromSQLiteDb();
        await setDecryptApi();
        const objClear = await __TRANSFORMOBJ__(objContents.value);
        objContents.value = objClear;
      }
      contents.value = shiftedContents();
    }
    function shiftedContents() {
      return objContents.value.map((val) => {
        let ret = val;
        return ret;
      });
    }
    function fetchColumn() {
      let tableHead = [];
      let obj = {};
      obj.name = props.ident;
      obj.label = "#";
      obj.field = props.ident;
      obj.align = "center";
      obj.sortable = false;
      tableHead.push(obj);
      for (const key in props.tableObj) {
        obj = {};
        obj.name = props.tableObj[key].name;
        obj.label = props.tableObj[key].head;
        obj.field = props.tableObj[key].name;
        obj.align = "center";
        obj.sortable = false;
        tableHead.push(obj);
      }
      return tableHead;
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    function wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;
      formatted = formatted === void 0 || formatted === null ? "" : String(formatted);
      formatted = formatted.split('"').join('""');
      return `"${formatted}"`;
    }
    function exportTable() {
      const columns = tableHeadForDisplay.value;
      const rows = contentsForDisp.value;
      const content = [columns.map((col) => wrapCsvValue(col.label))].concat(
        rows.map((row) => columns.map((col) => wrapCsvValue(
          typeof col.field === "function" ? col.field(row) : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(","))
      ).join("\r\n");
      const status = exportFile(
        `${props.tableTitle}-table.csv`,
        content,
        "text/csv"
      );
      if (status !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("forms.errors.error.export")
        });
      }
    }
    watch(
      () => props.tableObj,
      () => {
        tableHeadForDisplay.value = fetchColumn();
      }
    );
    onMounted(() => {
      if (!props.isForm) {
        hydrateAll();
      }
      tableHeadForDisplay.value = fetchColumn();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        !__props.isForm ? (openBlock(), createBlock(QTable, {
          key: 0,
          title: __props.tableTitle,
          flat: "",
          bordered: "",
          columns: tableHeadForDisplay.value,
          rows: unref(contentsForDisp),
          "row-key": __props.ident,
          "no-data-label": __props.no_data_label,
          "no-results-label": unref(t)("forms.errors.empty.filterBodyContentText"),
          separator: "horizontal",
          dense: unref(compact)
        }, createSlots({
          "no-data": withCtx(({ icon, message }) => [
            createBaseVNode("div", _hoisted_2, [
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
                label: __props.no_data_button_text,
                glossy: "",
                unelevated: "",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit(__props.addActionName, $event, false))
              }, null, 8, ["label"])
            ])
          ]),
          body: withCtx((propos) => [
            createVNode(QTr, { props: propos }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(contentsForDisp)[propos.rowIndex], (cont, key) => {
                  return openBlock(), createBlock(QTd, {
                    "data-key": key,
                    key,
                    props: propos
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(propos.row[key]), 1)
                    ]),
                    _: 2
                  }, 1032, ["data-key", "props"]);
                }), 128)),
                __props.admin ? (openBlock(), createBlock(QTd, { key: 0 }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, [
                      createVNode(QBtn, {
                        color: "primary",
                        icon: "add_circle",
                        label: unref(t)("forms.addButtonText"),
                        glossy: "",
                        unelevated: "",
                        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit(__props.addActionName, $event, false))
                      }, null, 8, ["label"]),
                      createVNode(QBtn, {
                        color: "secondary",
                        icon: "update",
                        label: unref(t)("forms.updateButtonText"),
                        glossy: "",
                        unelevated: "",
                        onClick: ($event) => _ctx.$emit(__props.updateActionName, $event, false, contents.value[propos.rowIndex])
                      }, null, 8, ["label", "onClick"]),
                      createVNode(QBtn, {
                        color: "negative",
                        icon: "cancel",
                        label: unref(t)("forms.deleteButtonText"),
                        glossy: "",
                        unelevated: "",
                        onClick: ($event) => _ctx.$emit(__props.deleteActionName, $event, propos.row[__props.ident])
                      }, null, 8, ["label", "onClick"])
                    ])
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 2
        }, [
          !__props.admin && unref(platform).is.desktop ? {
            name: "top-right",
            fn: withCtx(() => [
              createVNode(QBtn, {
                color: "primary",
                "icon-right": "archive",
                label: unref(t)("forms.headTable.export"),
                "no-caps": "",
                onClick: exportTable
              }, null, 8, ["label"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["title", "columns", "rows", "row-key", "no-data-label", "no-results-label", "dense"])) : createCommentVNode("", true),
        __props.isForm && (__props.adding || __props.updating) ? (openBlock(), createBlock(QTable, {
          key: 1,
          title: __props.tableTitle,
          flat: "",
          bordered: "",
          columns: tableHeadForDisplay.value,
          rows: __props.addDefaultRow,
          "row-key": __props.ident,
          separator: "horizontal",
          "hide-header": unref(platform).is.desktop ? false : true
        }, {
          body: withCtx(() => [
            createVNode(QTr, {
              class: normalizeClass(!unref(platform).is.desktop ? "compact-input" : "")
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, __props.addForm)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["title", "columns", "rows", "row-key", "hide-header"])) : createCommentVNode("", true)
      ]);
    };
  }
});
var TableItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "TableItem.vue"]]);
export { TableItem as T, usePaymentStore as a, paymentAxiosService as p, useServiceStore as u };
//# sourceMappingURL=data:application/json;base64,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QUMvQyxJQUFJO0FBQUEsVUFDSjtBQUFBLFNBQ0QsRUFBRSxLQUFLLEdBQUcsQ0FBQztBQUFBLFFBQ1osS0FBSyxNQUFNO0FBQ2YsWUFBTSxTQUFTO0FBQUEsUUFDYixHQUFHLE1BQU07QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBO0FBR0YsVUFBSSxXQUFXLE1BQU07QUFDbkIsV0FBRyxPQUFPO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixTQUFTLEVBQUUsMkJBQTJCO0FBQUEsU0FDdkM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUdBO0FBQUEsTUFBTSxNQUFNLE1BQU07QUFBQSxNQUNoQixNQUFNO0FBR0osNEJBQW9CLFFBQVE7TUFDOUI7QUFBQTtBQUlGLGNBQVUsTUFBTTtBQUNWLFdBQUMsTUFBTSxRQUFPO0FBQ0w7TUFDYjtBQUNBLDBCQUFvQixRQUFRO0lBQVksQ0FDekMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3Jlcy9zZXJ2aWNlLnRzIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9hY3Rvci50cyIsIi4uLy4uLy4uL3NyYy9zdG9yZXMvb3JkZXIudHMiLCIuLi8uLi8uLi9zcmMvZGIvc2VydmljZXMvcGF5bWVudC5zZXJ2aWNlLnRzIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9wYXltZW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZXhwb3J0LWZpbGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9UYWJsZUl0ZW0udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgZGVmaW5lU3RvcmUsIGFjY2VwdEhNUlVwZGF0ZSB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCBzZXJ2aWNlQXhpb3NTZXJ2aWNlIGZyb20gJ2FwcC9zcmMvZGIvc2VydmljZXMvc2VydmljZS5zZXJ2aWNlJztcbmltcG9ydCB7IHNldERlY3J5cHRBcGksIF9fVFJBTlNGT1JNT0JKX18gfSBmcm9tICdhcHAvc3JjL2dsb2JhbHMnO1xuXG5jb25zdCB1c2VTZXJ2aWNlU3RvcmUgPSBkZWZpbmVTdG9yZSgnc2VydmljZScsIHtcbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgc2VydmljZXM6IFtdLFxuICB9KSxcbiAgZ2V0dGVyczoge1xuICAgIGdldFNlcnZpY2VzKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuc2VydmljZXM7XG4gICAgfSxcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGdldEFsbFNlcnZpY2VzKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0xvZ2luLi4uJyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXJ2aWNlQXhpb3NTZXJ2aWNlXG4gICAgICAgICAgLmdldEFsbCgpXG4gICAgICAgICAgLnRoZW4oYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgICAgICAgICBjb25zdCBkYXRhQ2xlYXIgPSBhd2FpdCBfX1RSQU5TRk9STU9CSl9fKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IGRhdGFDbGVhcjtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUNsZWFyKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhQ2xlYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpIGZhaXRlIGV0IGxlIGNvZGUgZGVcbiAgICAgICAgICAgIC8vICAgcsOpcG9uc2UgZHUgc2VydmV1ciBuJ2VzdCBwYXMgZGFucyBsYSBwbGFnZSAyeHhcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSAgZmFpdGUgbWFpcyBhdWN1bmUgcsOpcG9uc2VcbiAgICAgICAgICAgIC8vICBuJ2Egw6l0w6kgcnXDp3VlIGBlcnJvci5yZXF1ZXN0YCBlc3QgdW5lIGluc3RhbmNlIGRlXG4gICAgICAgICAgICAvLyAgWE1MSHR0cFJlcXVlc3QgZGFucyBsZSBuYXZpZ2F0ZXVyIGV0IHVuZSBpbnN0YW5jZVxuICAgICAgICAgICAgLy8gIGRlIGh0dHAuQ2xpZW50UmVxdWVzdCBhdmVjIG5vZGUuanNcbiAgICAgICAgICAgIGVsc2UgaWYgKGVyci5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFF1ZWxxdWUgY2hvc2Ugcydlc3QgcGFzc8OpIGxvcnMgZGUgbGEgY29uc3RydWN0aW9uIGRlXG4gICAgICAgICAgICAvLyAgbGEgcmVxdcOqdGUgZXQgY2VsYSBhIHByb3ZvcXXDqSB1bmUgZXJyZXVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLmNvbmZpZyk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycikpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vLyBtYWtlIHN1cmUgdG8gcGFzcyB0aGUgcmlnaHQgc3RvcmUgZGVmaW5pdGlvbiwgYHVzZUF1dGhgIGluIHRoaXMgY2FzZS5cbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdChhY2NlcHRITVJVcGRhdGUodXNlU2VydmljZVN0b3JlLCBpbXBvcnQubWV0YS5ob3QpKTtcbn1cblxuZXhwb3J0IHsgdXNlU2VydmljZVN0b3JlIH07XG4iLCIvKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiAnb2ZmJyovXG4vLyBpbXBvcnQgeyByZWYsIGNvbXB1dGVkIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IGRlZmluZVN0b3JlLCBhY2NlcHRITVJVcGRhdGUgfSBmcm9tICdwaW5pYSc7XG5pbXBvcnQgYWN0b3JBeGlvc1NlcnZpY2UgZnJvbSAnYXBwL3NyYy9kYi9zZXJ2aWNlcy9hY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IHNldERlY3J5cHRBcGksIF9fVFJBTlNGT1JNT0JKX18gfSBmcm9tICdhcHAvc3JjL2dsb2JhbHMnO1xuXG5jb25zdCB1c2VBY3RvclN0b3JlID0gZGVmaW5lU3RvcmUoJ2FjdG9yJywge1xuICBzdGF0ZTogKCkgPT4gKHtcbiAgICBhY3RvcnM6IFtdLFxuICAgIHR5cGVzOiBbXSxcbiAgfSksXG4gIGdldHRlcnM6IHtcbiAgICBnZXRBY3RvcnMoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5hY3RvcnM7XG4gICAgfSxcbiAgICBnZXRUeXBlcyhzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLnR5cGVzO1xuICAgIH0sXG4gIH0sXG4gIGFjdGlvbnM6IHtcbiAgICBnZXRBbGxBY3RvcnMoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTG9naW4uLi4nKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGFjdG9yQXhpb3NTZXJ2aWNlXG4gICAgICAgICAgLmdldEFsbCgpXG4gICAgICAgICAgLnRoZW4oYXN5bmMgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICBhd2FpdCBzZXREZWNyeXB0QXBpKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGFDbGVhciA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18ocmVzLmRhdGEpO1xuICAgICAgICAgICAgICB0aGlzLmFjdG9ycyA9IGRhdGFDbGVhcjtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUNsZWFyKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhQ2xlYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgZmFpdGUgZXQgbGUgY29kZSBkZVxuICAgICAgICAgICAgLy8gICByw6lwb25zZSBkdSBzZXJ2ZXVyIG4nZXN0IHBhcyBkYW5zIGxhIHBsYWdlIDJ4eFxuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpICBmYWl0ZSBtYWlzIGF1Y3VuZSByw6lwb25zZVxuICAgICAgICAgICAgLy8gIG4nYSDDqXTDqSBydcOndWUgYGVycm9yLnJlcXVlc3RgIGVzdCB1bmUgaW5zdGFuY2UgZGVcbiAgICAgICAgICAgIC8vICBYTUxIdHRwUmVxdWVzdCBkYW5zIGxlIG5hdmlnYXRldXIgZXQgdW5lIGluc3RhbmNlXG4gICAgICAgICAgICAvLyAgZGUgaHR0cC5DbGllbnRSZXF1ZXN0IGF2ZWMgbm9kZS5qc1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyLnJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUXVlbHF1ZSBjaG9zZSBzJ2VzdCBwYXNzw6kgbG9ycyBkZSBsYSBjb25zdHJ1Y3Rpb24gZGVcbiAgICAgICAgICAgIC8vICBsYSByZXF1w6p0ZSBldCBjZWxhIGEgcHJvdm9xdcOpIHVuZSBlcnJldXJcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuY29uZmlnKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEFsbFR5cGVzKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgYWN0b3JBeGlvc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0QWxsVHlwZXMoKVxuICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLnR5cGVzID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFDbGVhcik7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgZmFpdGUgZXQgbGUgY29kZSBkZVxuICAgICAgICAgICAgLy8gICByw6lwb25zZSBkdSBzZXJ2ZXVyIG4nZXN0IHBhcyBkYW5zIGxhIHBsYWdlIDJ4eFxuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpICBmYWl0ZSBtYWlzIGF1Y3VuZSByw6lwb25zZVxuICAgICAgICAgICAgLy8gIG4nYSDDqXTDqSBydcOndWUgYGVycm9yLnJlcXVlc3RgIGVzdCB1bmUgaW5zdGFuY2UgZGVcbiAgICAgICAgICAgIC8vICBYTUxIdHRwUmVxdWVzdCBkYW5zIGxlIG5hdmlnYXRldXIgZXQgdW5lIGluc3RhbmNlXG4gICAgICAgICAgICAvLyAgZGUgaHR0cC5DbGllbnRSZXF1ZXN0IGF2ZWMgbm9kZS5qc1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyLnJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUXVlbHF1ZSBjaG9zZSBzJ2VzdCBwYXNzw6kgbG9ycyBkZSBsYSBjb25zdHJ1Y3Rpb24gZGVcbiAgICAgICAgICAgIC8vICBsYSByZXF1w6p0ZSBldCBjZWxhIGEgcHJvdm9xdcOpIHVuZSBlcnJldXJcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuY29uZmlnKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxufSk7XG5cbi8vIG1ha2Ugc3VyZSB0byBwYXNzIHRoZSByaWdodCBzdG9yZSBkZWZpbml0aW9uLCBgdXNlQXV0aGAgaW4gdGhpcyBjYXNlLlxuaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuICBpbXBvcnQubWV0YS5ob3QuYWNjZXB0KGFjY2VwdEhNUlVwZGF0ZSh1c2VBY3RvclN0b3JlLCBpbXBvcnQubWV0YS5ob3QpKTtcbn1cblxuZXhwb3J0IHsgdXNlQWN0b3JTdG9yZSB9O1xuIiwiLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgZGVmaW5lU3RvcmUsIGFjY2VwdEhNUlVwZGF0ZSB9IGZyb20gJ3BpbmlhJztcbmltcG9ydCBvcmRlckF4aW9zU2VydmljZSBmcm9tICdhcHAvc3JjL2RiL3NlcnZpY2VzL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2V0RGVjcnlwdEFwaSwgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ2FwcC9zcmMvZ2xvYmFscyc7XG5cbmNvbnN0IHVzZU9yZGVyU3RvcmUgPSBkZWZpbmVTdG9yZSgnb3JkZXInLCB7XG4gIHN0YXRlOiAoKSA9PiAoe1xuICAgIG9yZGVyczogW10sXG4gIH0pLFxuICBnZXR0ZXJzOiB7XG4gICAgZ2V0QWN0b3JzKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuYWN0b3JzO1xuICAgIH0sXG4gICAgZ2V0VHlwZXMoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS50eXBlcztcbiAgICB9LFxuICB9LFxuICBhY3Rpb25zOiB7XG4gICAgZ2V0QWxsT3JkZXJzKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0xvZ2luLi4uJyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBvcmRlckF4aW9zU2VydmljZVxuICAgICAgICAgIC5nZXRBbGwoKVxuICAgICAgICAgIC50aGVuKGFzeW5jIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgICAgICAgICBjb25zdCBkYXRhQ2xlYXIgPSBhd2FpdCBfX1RSQU5TRk9STU9CSl9fKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy5vcmRlcnMgPSBkYXRhQ2xlYXI7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFDbGVhcik7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpIGZhaXRlIGV0IGxlIGNvZGUgZGVcbiAgICAgICAgICAgIC8vICAgcsOpcG9uc2UgZHUgc2VydmV1ciBuJ2VzdCBwYXMgZGFucyBsYSBwbGFnZSAyeHhcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSAgZmFpdGUgbWFpcyBhdWN1bmUgcsOpcG9uc2VcbiAgICAgICAgICAgIC8vICBuJ2Egw6l0w6kgcnXDp3VlIGBlcnJvci5yZXF1ZXN0YCBlc3QgdW5lIGluc3RhbmNlIGRlXG4gICAgICAgICAgICAvLyAgWE1MSHR0cFJlcXVlc3QgZGFucyBsZSBuYXZpZ2F0ZXVyIGV0IHVuZSBpbnN0YW5jZVxuICAgICAgICAgICAgLy8gIGRlIGh0dHAuQ2xpZW50UmVxdWVzdCBhdmVjIG5vZGUuanNcbiAgICAgICAgICAgIGVsc2UgaWYgKGVyci5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFF1ZWxxdWUgY2hvc2Ugcydlc3QgcGFzc8OpIGxvcnMgZGUgbGEgY29uc3RydWN0aW9uIGRlXG4gICAgICAgICAgICAvLyAgbGEgcmVxdcOqdGUgZXQgY2VsYSBhIHByb3ZvcXXDqSB1bmUgZXJyZXVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLmNvbmZpZyk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycikpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vLyBtYWtlIHN1cmUgdG8gcGFzcyB0aGUgcmlnaHQgc3RvcmUgZGVmaW5pdGlvbiwgYHVzZUF1dGhgIGluIHRoaXMgY2FzZS5cbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdChhY2NlcHRITVJVcGRhdGUodXNlT3JkZXJTdG9yZSwgaW1wb3J0Lm1ldGEuaG90KSk7XG59XG5cbmV4cG9ydCB7IHVzZU9yZGVyU3RvcmUgfTtcbiIsIi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IGh0dHAgfSBmcm9tICdhcHAvc3JjL2RiL3NlcnZpY2VzL2luZGV4JztcblxuY2xhc3MgUGF5bWVudERhdGFTZXJ2aWNlIHtcbiAgZ2V0QWxsKCkge1xuICAgIHJldHVybiBodHRwLmdldCgnL3BheW1lbnRzJyk7XG4gIH1cblxuICBnZXRBbGxUeXBlcygpIHtcbiAgICByZXR1cm4gaHR0cC5nZXQoJy9wYXltZW50cy90eXBlcycpO1xuICB9XG5cbiAgLy8gZ2V0QWxsT3JkZXJzKCkge1xuICAvLyAgIHJldHVybiBodHRwLmdldCgnL3BheW1lbnRzL29yZGVycycpO1xuICAvLyB9XG5cbiAgZ2V0QWxsSW52b2ljZXMoKSB7XG4gICAgcmV0dXJuIGh0dHAuZ2V0KCcvcGF5bWVudHMvaW52b2ljZXMnKTtcbiAgfVxuXG4gIGdldChpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGh0dHAuZ2V0KCcvcGF5bWVudHMvZmluZCcsIHtcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBhY3RvcklkOiBpZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAucG9zdCgnL3BheW1lbnRzJywgZGF0YSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAucHV0KGAvcGF5bWVudHMvJHtpZH1gLCBkYXRhKTtcbiAgfVxuXG4gIGRlbGV0ZShpZDogYW55KSB7XG4gICAgcmV0dXJuIGh0dHAuZGVsZXRlKGAvcGF5bWVudHMvJHtpZH1gKTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCgpIHtcbiAgICByZXR1cm4gaHR0cC5kZWxldGUoJy9wYXltZW50cycpO1xuICB9XG5cbiAgZmluZEJ5VHlwZXModHlwZXM6IGFueSkge1xuICAgIHJldHVybiBodHRwLmdldChgL3BheW1lbnRzL3R5cGVzLyR7dHlwZXN9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBheW1lbnREYXRhU2VydmljZSgpO1xuIiwiLy8gaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBkZWZpbmVTdG9yZSwgYWNjZXB0SE1SVXBkYXRlIH0gZnJvbSAncGluaWEnO1xuaW1wb3J0IHBheW1lbnRBeGlvc1NlcnZpY2UgZnJvbSAnYXBwL3NyYy9kYi9zZXJ2aWNlcy9wYXltZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgc2V0RGVjcnlwdEFwaSwgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ2FwcC9zcmMvZ2xvYmFscyc7XG5cbmNvbnN0IHVzZVBheW1lbnRTdG9yZSA9IGRlZmluZVN0b3JlKCdwYXltZW50Jywge1xuICBzdGF0ZTogKCkgPT4gKHtcbiAgICBwYXltZW50czogW10sXG4gICAgdHlwZXM6IFtdLFxuICAgIGludm9pY2VzOiBbXSxcbiAgfSksXG4gIGdldHRlcnM6IHtcbiAgICBnZXRQYXltZW50cyhzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLnBheW1lbnRzO1xuICAgIH0sXG4gICAgZ2V0VHlwZXMoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS50eXBlcztcbiAgICB9LFxuICAgIGdldEludm9pY2VzKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW52b2ljZXM7XG4gICAgfSxcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGdldEFsbFBheW1lbnRzKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0xvZ2luLi4uJyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBwYXltZW50QXhpb3NTZXJ2aWNlXG4gICAgICAgICAgLmdldEFsbCgpXG4gICAgICAgICAgLnRoZW4oYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgICAgICAgICBjb25zdCBkYXRhQ2xlYXIgPSBhd2FpdCBfX1RSQU5TRk9STU9CSl9fKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy5wYXltZW50cyA9IGRhdGFDbGVhcjtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUNsZWFyKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhQ2xlYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpIGZhaXRlIGV0IGxlIGNvZGUgZGVcbiAgICAgICAgICAgIC8vICAgcsOpcG9uc2UgZHUgc2VydmV1ciBuJ2VzdCBwYXMgZGFucyBsYSBwbGFnZSAyeHhcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSAgZmFpdGUgbWFpcyBhdWN1bmUgcsOpcG9uc2VcbiAgICAgICAgICAgIC8vICBuJ2Egw6l0w6kgcnXDp3VlIGBlcnJvci5yZXF1ZXN0YCBlc3QgdW5lIGluc3RhbmNlIGRlXG4gICAgICAgICAgICAvLyAgWE1MSHR0cFJlcXVlc3QgZGFucyBsZSBuYXZpZ2F0ZXVyIGV0IHVuZSBpbnN0YW5jZVxuICAgICAgICAgICAgLy8gIGRlIGh0dHAuQ2xpZW50UmVxdWVzdCBhdmVjIG5vZGUuanNcbiAgICAgICAgICAgIGVsc2UgaWYgKGVyci5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFF1ZWxxdWUgY2hvc2Ugcydlc3QgcGFzc8OpIGxvcnMgZGUgbGEgY29uc3RydWN0aW9uIGRlXG4gICAgICAgICAgICAvLyAgbGEgcmVxdcOqdGUgZXQgY2VsYSBhIHByb3ZvcXXDqSB1bmUgZXJyZXVyXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLmNvbmZpZyk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycikpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRBbGxQYXltZW50VHlwZXMoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTG9naW4uLi4nKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHBheW1lbnRBeGlvc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0QWxsVHlwZXMoKVxuICAgICAgICAgIC50aGVuKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMudHlwZXMgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUNsZWFyKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgZmFpdGUgZXQgbGUgY29kZSBkZVxuICAgICAgICAgICAgLy8gICByw6lwb25zZSBkdSBzZXJ2ZXVyIG4nZXN0IHBhcyBkYW5zIGxhIHBsYWdlIDJ4eFxuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMYSByZXF1w6p0ZSBhIMOpdMOpICBmYWl0ZSBtYWlzIGF1Y3VuZSByw6lwb25zZVxuICAgICAgICAgICAgLy8gIG4nYSDDqXTDqSBydcOndWUgYGVycm9yLnJlcXVlc3RgIGVzdCB1bmUgaW5zdGFuY2UgZGVcbiAgICAgICAgICAgIC8vICBYTUxIdHRwUmVxdWVzdCBkYW5zIGxlIG5hdmlnYXRldXIgZXQgdW5lIGluc3RhbmNlXG4gICAgICAgICAgICAvLyAgZGUgaHR0cC5DbGllbnRSZXF1ZXN0IGF2ZWMgbm9kZS5qc1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyLnJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUXVlbHF1ZSBjaG9zZSBzJ2VzdCBwYXNzw6kgbG9ycyBkZSBsYSBjb25zdHJ1Y3Rpb24gZGVcbiAgICAgICAgICAgIC8vICBsYSByZXF1w6p0ZSBldCBjZWxhIGEgcHJvdm9xdcOpIHVuZSBlcnJldXJcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuY29uZmlnKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEFsbEludm9pY2VzKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ0xvZ2luLi4uJyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBwYXltZW50QXhpb3NTZXJ2aWNlXG4gICAgICAgICAgLmdldEFsbEludm9pY2VzKClcbiAgICAgICAgICAudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICBhd2FpdCBzZXREZWNyeXB0QXBpKClcbiAgICAgICAgICAgICAgY29uc3QgZGF0YUNsZWFyID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMuaW52b2ljZXMgPSBkYXRhQ2xlYXI7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFDbGVhcik7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YUNsZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gTGEgcmVxdcOqdGUgYSDDqXTDqSBmYWl0ZSBldCBsZSBjb2RlIGRlXG4gICAgICAgICAgICAvLyAgIHLDqXBvbnNlIGR1IHNlcnZldXIgbidlc3QgcGFzIGRhbnMgbGEgcGxhZ2UgMnh4XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExhIHJlcXXDqnRlIGEgw6l0w6kgIGZhaXRlIG1haXMgYXVjdW5lIHLDqXBvbnNlXG4gICAgICAgICAgICAvLyAgbidhIMOpdMOpIHJ1w6d1ZSBgZXJyb3IucmVxdWVzdGAgZXN0IHVuZSBpbnN0YW5jZSBkZVxuICAgICAgICAgICAgLy8gIFhNTEh0dHBSZXF1ZXN0IGRhbnMgbGUgbmF2aWdhdGV1ciBldCB1bmUgaW5zdGFuY2VcbiAgICAgICAgICAgIC8vICBkZSBodHRwLkNsaWVudFJlcXVlc3QgYXZlYyBub2RlLmpzXG4gICAgICAgICAgICBlbHNlIGlmIChlcnIucmVxdWVzdCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIucmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBRdWVscXVlIGNob3NlIHMnZXN0IHBhc3PDqSBsb3JzIGRlIGxhIGNvbnN0cnVjdGlvbiBkZVxuICAgICAgICAgICAgLy8gIGxhIHJlcXXDqnRlIGV0IGNlbGEgYSBwcm92b3F1w6kgdW5lIGVycmV1clxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5jb25maWcpO1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59KTtcblxuLy8gbWFrZSBzdXJlIHRvIHBhc3MgdGhlIHJpZ2h0IHN0b3JlIGRlZmluaXRpb24sIGB1c2VBdXRoYCBpbiB0aGlzIGNhc2UuXG5pZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gIGltcG9ydC5tZXRhLmhvdC5hY2NlcHQoYWNjZXB0SE1SVXBkYXRlKHVzZVBheW1lbnRTdG9yZSwgaW1wb3J0Lm1ldGEuaG90KSk7XG59XG5cbmV4cG9ydCB7IHVzZVBheW1lbnRTdG9yZSB9O1xuIiwiZnVuY3Rpb24gY2xlYW4gKGxpbmspIHtcbiAgLy8gYWxsb3cgdGltZSBmb3IgaU9TXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGxpbmsuaHJlZilcbiAgfSwgMTAwMDApXG5cbiAgbGluay5yZW1vdmUoKVxufVxuXG4vKipcbiAqIEZvcmNlcyBicm93c2VyIHRvIGRvd25sb2FkIGZpbGUgd2l0aCBzcGVjaWZpZWQgY29udGVudFxuICpcbiAqIEBwYXJhbSB7Kn0gZmlsZU5hbWUgLSBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gcmF3RGF0YSAtIFN0cmluZyB8IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgQmxvYlxuICogQHBhcmFtIHsqfSBvcHRzIC0gU3RyaW5nIChtaW1lVHlwZSkgb3IgT2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICBPYmplY3QgZm9ybTogeyBtaW1lVHlwZT86IFN0cmluZywgYnl0ZU9yZGVyTWFyaz86IFN0cmluZyB8IFVpbnQ4QXJyYXksIGVuY29kaW5nPzogU3RyaW5nIH1cbiAqIEByZXR1cm5zIEJvb2xlYW4gfCBFcnJvclxuICpcbiAqIG1pbWVUeXBlICAgICAgIC0gRXhhbXBsZXM6ICdhcHBsaWNhdGlvbi9vY3RlY3Qtc3RyZWFtJyAoZGVmYXVsdCksICd0ZXh0L3BsYWluJywgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICogICAgICAgICAgICAgICAgICAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JywgJ3ZpZGVvL21wNCcsICdpbWFnZS9wbmcnLCAnYXBwbGljYXRpb24vcGRmJ1xuICogICAgICAgICAgICAgICAgICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jhc2ljc19vZl9IVFRQL01JTUVfdHlwZXNcbiAqXG4gKiBieXRlT3JkZXJNYXJrICAtIChCT00pIEV4YW1wbGU6ICdcXHVGRUZGJ1xuICogICAgICAgICAgICAgICAgICBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CeXRlX29yZGVyX21hcmtcbiAqXG4gKiBlbmNvZGluZyAgICAgICAtIFBlcmZvcm1zIGEgVGV4dEVuY29kZXIuZW5jb2RlKCkgb3ZlciB0aGUgcmF3RGF0YTtcbiAqICAgICAgICAgICAgICAgICAgRXhhbXBsZTogJ3dpbmRvd3MtMTI1MicgKEFOU0ksIGEgc3Vic2V0IG9mIElTTy04ODU5LTEpXG4gKiAgICAgICAgICAgICAgICAgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9UZXh0RW5jb2RlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZmlsZU5hbWUsIHJhd0RhdGEsIG9wdHMgPSB7fSkge1xuICBjb25zdCB7IG1pbWVUeXBlLCBieXRlT3JkZXJNYXJrLCBlbmNvZGluZyB9ID0gdHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnXG4gICAgPyB7IG1pbWVUeXBlOiBvcHRzIH1cbiAgICA6IG9wdHNcblxuICBjb25zdCBkYXRhID0gZW5jb2RpbmcgIT09IHZvaWQgMFxuICAgID8gKG5ldyBUZXh0RW5jb2RlcihlbmNvZGluZykpLmVuY29kZShbIHJhd0RhdGEgXSlcbiAgICA6IHJhd0RhdGFcblxuICBjb25zdCBibG9iRGF0YSA9IGJ5dGVPcmRlck1hcmsgIT09IHZvaWQgMCA/IFsgYnl0ZU9yZGVyTWFyaywgZGF0YSBdIDogWyBkYXRhIF1cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGJsb2JEYXRhLCB7IHR5cGU6IG1pbWVUeXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pXG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSlcblxuICAvLyBDaGVjayBmb3IgXCJkb3dubG9hZFwiIGF0dHJpYnV0ZSBzdXBwb3J0O1xuICAvLyBJZiBub3Qgc3VwcG9ydGVkLCBvcGVuIHRoaXMgaW4gbmV3IHdpbmRvd1xuICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKVxuICB9XG5cbiAgbGluay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICBsaW5rLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJyAvLyBhdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcblxuICB0cnkge1xuICAgIGxpbmsuY2xpY2soKVxuICAgIGNsZWFuKGxpbmspXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgY2xlYW4obGluaylcbiAgICByZXR1cm4gZXJyXG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz0ncS1wYS1tZCc+XG4gICAgPHEtdGFibGVcbiAgICAgIHYtaWY9XCIhaXNGb3JtXCJcbiAgICAgIDp0aXRsZT1cInRhYmxlVGl0bGVcIiBcbiAgICAgIGZsYXRcbiAgICAgIGJvcmRlcmVkXG4gICAgICA6Y29sdW1ucz1cInRhYmxlSGVhZEZvckRpc3BsYXlcIlxuICAgICAgOnJvd3M9XCJjb250ZW50c0ZvckRpc3BcIlxuICAgICAgOnJvdy1rZXk9XCJpZGVudFwiXG4gICAgICA6bm8tZGF0YS1sYWJlbD1cIm5vX2RhdGFfbGFiZWxcIlxuICAgICAgOm5vLXJlc3VsdHMtbGFiZWw9XCJ0KCdmb3Jtcy5lcnJvcnMuZW1wdHkuZmlsdGVyQm9keUNvbnRlbnRUZXh0JylcIlxuICAgICAgc2VwYXJhdG9yPVwiaG9yaXpvbnRhbFwiXG4gICAgICA6ZGVuc2U9XCJjb21wYWN0XCI+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OnRvcC1yaWdodCB2LWlmPVwiIWFkbWluICYmIHBsYXRmb3JtLmlzLmRlc2t0b3BcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBpY29uLXJpZ2h0PVwiYXJjaGl2ZVwiXG4gICAgICAgICAgOmxhYmVsPVwidCgnZm9ybXMuaGVhZFRhYmxlLmV4cG9ydCcpXCJcbiAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgQGNsaWNrPVwiZXhwb3J0VGFibGVcIlxuICAgICAgICAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bm8tZGF0YT1cIntpY29uLCBtZXNzYWdlfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC13aWR0aCByb3cgZmxleC1jZW50ZXIgdGV4dC1hY2NlbnQgcS1ndXR0ZXItc21cIj5cbiAgICAgICAgICA8cS1pY29uIHNpemU9XCIyZW1cIiBuYW1lPVwic2VudGltZW50X2Rpc3NhdGlzZmllZFwiLz5cbiAgICAgICAgICA8c3Bhbj57eyBtZXNzYWdlIH19PC9zcGFuPlxuICAgICAgICAgIDxxLWljb24gc2l6ZT1cIjJlbVwiIDpuYW1lPVwiaWNvblwiLz5cbiAgICAgICAgICA8cS1idG4gY29sb3I9XCJwdXJwbGVcIiBpY29uPVwiYWRkX2NpcmNsZVwiIDpsYWJlbD1cIm5vX2RhdGFfYnV0dG9uX3RleHRcIiBnbG9zc3kgdW5lbGV2YXRlZCBAY2xpY2s9XCIkZW1pdChhZGRBY3Rpb25OYW1lLCAkZXZlbnQsIGZhbHNlKVwiPjwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keT1cInByb3Bvc1wiPlxuICAgICAgICA8cS10ciA6cHJvcHM9XCJwcm9wb3NcIj5cbiAgICAgICAgICA8cS10ZCA6ZGF0YS1rZXk9XCJrZXlcIiB2LWZvcj1cIihjb250LCBrZXkpIGluIGNvbnRlbnRzRm9yRGlzcFtwcm9wb3Mucm93SW5kZXhdXCJcbiAgICAgICAgICAgIDprZXk9XCJrZXlcIlxuICAgICAgICAgICAgOnByb3BzPVwicHJvcG9zXCI+XG4gICAgICAgICAgICB7eyBwcm9wb3Mucm93W2tleV0gfX1cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgICAgPHEtdGQgdi1pZj1cImFkbWluXCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO2Rpc3BsYXk6IGZsZXg7anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XCI+XG4gICAgICAgICAgICAgIDxxLWJ0biBjb2xvcj1cInByaW1hcnlcIiBpY29uPVwiYWRkX2NpcmNsZVwiIDpsYWJlbD1cInQoJ2Zvcm1zLmFkZEJ1dHRvblRleHQnKVwiIGdsb3NzeSB1bmVsZXZhdGVkIEBjbGljaz1cIiRlbWl0KGFkZEFjdGlvbk5hbWUsICRldmVudCwgZmFsc2UpXCI+PC9xLWJ0bj5cbiAgICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwic2Vjb25kYXJ5XCIgaWNvbj1cInVwZGF0ZVwiIDpsYWJlbD1cInQoJ2Zvcm1zLnVwZGF0ZUJ1dHRvblRleHQnKVwiIGdsb3NzeSB1bmVsZXZhdGVkIEBjbGljaz1cIiRlbWl0KHVwZGF0ZUFjdGlvbk5hbWUsICRldmVudCwgZmFsc2UsIGNvbnRlbnRzW3Byb3Bvcy5yb3dJbmRleF0pXCI+PC9xLWJ0bj5cbiAgICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwiY2FuY2VsXCIgOmxhYmVsPVwidCgnZm9ybXMuZGVsZXRlQnV0dG9uVGV4dCcpXCIgZ2xvc3N5IHVuZWxldmF0ZWQgQGNsaWNrPVwiJGVtaXQoZGVsZXRlQWN0aW9uTmFtZSwgJGV2ZW50LCBwcm9wb3Mucm93W2lkZW50XSlcIj48L3EtYnRuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICA8L3EtdHI+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgICA8cS10YWJsZSB2LWlmPVwiaXNGb3JtICYmIChhZGRpbmcgfHwgdXBkYXRpbmcpXCJcbiAgICAgIDp0aXRsZT1cInRhYmxlVGl0bGVcIiBcbiAgICAgIGZsYXRcbiAgICAgIGJvcmRlcmVkXG4gICAgICA6Y29sdW1ucz1cInRhYmxlSGVhZEZvckRpc3BsYXlcIlxuICAgICAgOnJvd3M9XCJhZGREZWZhdWx0Um93XCJcbiAgICAgIDpyb3cta2V5PVwiaWRlbnRcIlxuICAgICAgc2VwYXJhdG9yPVwiaG9yaXpvbnRhbFwiXG4gICAgICA6aGlkZS1oZWFkZXI9XCJwbGF0Zm9ybS5pcy5kZXNrdG9wID8gZmFsc2UgOiB0cnVlXCI+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHk+XG4gICAgICAgIDxxLXRyIDpjbGFzcz1cIiFwbGF0Zm9ybS5pcy5kZXNrdG9wID8gJ2NvbXBhY3QtaW5wdXQnIDogJydcIj5cbiAgICAgICAgICA8c2xvdFxuICAgICAgICAgICAgOm5hbWU9XCJhZGRGb3JtXCI+XG4gICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3EtdHI+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzOiAnb2ZmJyovXG5pbXBvcnQgeyBpbmplY3QsIGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgSW5wdXRPYmplY3RDb2xsZWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSAnc3RvcmVzL3VzZXInO1xuaW1wb3J0IHsgdXNlU2VydmljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL3NlcnZpY2UnO1xuaW1wb3J0IHsgdXNlQWN0b3JTdG9yZSB9IGZyb20gJ3N0b3Jlcy9hY3Rvcic7XG5pbXBvcnQgeyB1c2VPcmRlclN0b3JlIH0gZnJvbSAnc3RvcmVzL29yZGVyJztcbmltcG9ydCB7IHVzZVBheW1lbnRTdG9yZSB9IGZyb20gJ3N0b3Jlcy9wYXltZW50JztcbmltcG9ydCB7IHVzZUludm9pY2VTdG9yZSB9IGZyb20gJ3N0b3Jlcy9pbnZvaWNlJztcbmltcG9ydCB7IHVzZVNlc3Npb25TdG9yZSB9IGZyb20gJ3N0b3Jlcy9zZXNzaW9uJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAndnVlLWkxOG4nO1xuaW1wb3J0IHsgdXNlUXVhc2FyLCBleHBvcnRGaWxlIH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UXVlcnksIGNsb3NlRGJDb25uZWN0aW9uIH0gZnJvbSAnY2FwL3N0b3JhZ2UnO1xuaW1wb3J0IHsgc2V0RGVjcnlwdEFwaSwgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ3NyYy9nbG9iYWxzJztcblxuLy8gVkFSSUFCTEVTXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuY29uc3QgeyB0IH0gPSB1c2VJMThuKHsgdXNlU2NvcGU6ICdnbG9iYWwnIH0pO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcbmNvbnN0IHNyYyA9IGluamVjdCgnc3JjJyk7XG4vLyBjb25zdCBpc0Z1bGxzY3JlZW4gPSByZWYoZmFsc2UpO1xuaW50ZXJmYWNlIFRhYmxlSXRlbVByb3BzIHtcbiAgdGFibGVUaXRsZTogc3RyaW5nO1xuICBpc0Zvcm0/OiBib29sZWFuO1xuICAvLyB0YWJsZUhlYWQ/OiBzdHJpbmdbXTtcbiAgLy8gZW1wdHlUYWJsZVRleHQ/OiBzdHJpbmc7XG4gIGFkZEFjdGlvbk5hbWU6IHN0cmluZztcbiAgdXBkYXRlQWN0aW9uTmFtZTogc3RyaW5nO1xuICBkZWxldGVBY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHVwZGF0aW5nOiBib29sZWFuO1xuICBhZGRpbmc6IGJvb2xlYW47XG4gIGFkZEZvcm06IHN0cmluZztcbiAgdGFibGVPYmo6IElucHV0T2JqZWN0Q29sbGVjdGlvbjtcbiAgYWRkRGVmYXVsdFJvdzogb2JqZWN0W107XG4gIHVwZGF0ZU9iaj86IElucHV0T2JqZWN0Q29sbGVjdGlvbjtcbiAgYWRtaW46IGJvb2xlYW47XG4gIGRpc3BsYXk6IGJvb2xlYW47XG4gIGNvbFNwYW4/OiBzdHJpbmc7XG4gIGlkZW50OiBzdHJpbmc7XG4gIG5vX2RhdGFfbGFiZWw6IHN0cmluZztcbiAgbm9fZGF0YV9idXR0b25fdGV4dDogc3RyaW5nO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsOyBcbn07XG50eXBlIEZpZWxkRnVuYyA9IChyb3c6IG9iamVjdCkgPT4gYW55O1xudHlwZSBTdHlsZUNsYXNzZXNGdW5jID0gKHJvdzogb2JqZWN0KSA9PiBzdHJpbmc7XG5pbnRlcmZhY2UgVGFibGVDb2x1bW5EZWYge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGZpZWxkOiBzdHJpbmcgfCBGaWVsZEZ1bmM7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgYWxpZ24/OiBzdHJpbmc7XG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgc29ydD8oYTogYW55LCBiOiBhbnksIHJvd0E6IG9iamVjdCwgcm93QjpvYmplY3QpOiBudW1iZXI7XG4gIHNvcnRPcmRlcj86IHN0cmluZztcbiAgZm9ybWF0Pyh2YWw6IGFueSwgcm93OiBvYmplY3QpOiBhbnk7XG4gIHN0eWxlPzogc3RyaW5nIHwgU3R5bGVDbGFzc2VzRnVuYztcbiAgY2xhc3Nlcz86IHN0cmluZyB8IFN0eWxlQ2xhc3Nlc0Z1bmM7XG4gIGhlYWRlclN0eWxlPzogc3RyaW5nO1xuICBoZWFkZXJDbGFzc2VzPzogc3RyaW5nO1xufTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFRhYmxlSXRlbVByb3BzPigpLCB7XG4gIHRhYmxlVGl0bGU6ICcnLFxuICBpc0Zvcm06IGZhbHNlLFxuICAvLyB0YWJsZUhlYWQ6ICgpID0+IChbXSksXG4gIC8vIGVtcHR5VGFibGVUZXh0OiAnRW1wdHkgIScsXG4gIGFkZEFjdGlvbk5hbWU6ICcnLFxuICB1cGRhdGVBY3Rpb25OYW1lOiAnJyxcbiAgZGVsZXRlQWN0aW9uTmFtZTogJycsXG4gIHVwZGF0aW5nOiBmYWxzZSxcbiAgYWRkaW5nOiB0cnVlLFxuICBhZGRGb3JtOiAnJyxcbiAgdGFibGVPYmo6ICgpID0+ICh7bGFiZWw6ICcnLCBuYW1lOiAnJ30pLFxuICBhZGREZWZhdWx0Um93OiAoKSA9PiAoW10pLFxuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGNvbFNwYW46ICcxJyxcbiAgaWRlbnQ6ICcnLFxuICBub19kYXRhX2xhYmVsOiAnJyxcbiAgbm9fZGF0YV9idXR0b25fdGV4dDogJycsXG59KTtcbmNvbnN0IG9iakNvbnRlbnRzID0gcmVmKFtdKTtcbi8vIGNvbnN0IGlkZW50cyA9IHJlZihbXSk7XG5jb25zdCBjb250ZW50cyA9IHJlZihbXSk7XG4vLyBjb25zdCBjb250ZW50VmFsID0gcmVmKCcnKTtcbi8vIGNvbnN0IG9iakxlbmd0aCA9IGNvbXB1dGVkKCgpID0+IHtcbi8vICAgcmV0dXJuIG9iakNvbnRlbnRzLnZhbHVlLmxlbmd0aDtcbi8vIH0pO1xuY29uc3QgdGFibGVBY3RvcnNUeXBlTGliZWxsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IHJldCA9IFtdO1xuICBpZiAoc3JjID09PSAnYWN0b3JzJykge1xuICAgIGZvciAoY29uc3QgayBpbiBvYmpDb250ZW50cy52YWx1ZSkge1xuICAgICAgZm9yIChjb25zdCBsIGluIG9iakNvbnRlbnRzLnZhbHVlW2tdKSB7XG4gICAgICAgIGlmIChsID09PSAncGVyc29ubmVfdHlwZScpIHtcbiAgICAgICAgICBsZXQgbGliZWxsZSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdLnNlbGxlciAmJiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXS5idXllciA/IHQoJ2FjdG9yc0NvbXBvbmVudC5saWJlbGxlcy5hY3RvclR5cGVzLmJvdGgnKSA6ICcnO1xuICAgICAgICAgIGxpYmVsbGUgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXS5zZWxsZXIgJiYgIW9iakNvbnRlbnRzLnZhbHVlW2tdW2xdLmJ1eWVyID8gdCgnYWN0b3JzQ29tcG9uZW50LmxpYmVsbGVzLmFjdG9yVHlwZXMuc2VsbGVyJykgOiBsaWJlbGxlO1xuICAgICAgICAgIGxpYmVsbGUgPSAhb2JqQ29udGVudHMudmFsdWVba11bbF0uc2VsbGVyICYmIG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdLmJ1eWVyID8gdCgnYWN0b3JzQ29tcG9uZW50LmxpYmVsbGVzLmFjdG9yVHlwZXMuYnV5ZXInKSA6IGxpYmVsbGU7XG4gICAgICAgICAgcmV0W2tdID0gbGliZWxsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCBjb250ZW50c0ZvckRpc3AgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSBbXTtcbiAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnRzRm9yRGlzcCAtLT4nKTtcbiAgLy8gY29uc29sZS5sb2cob2JqQ29udGVudHMudmFsdWUpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmpDb250ZW50cy52YWx1ZSkge1xuICAgICAgcmV0W2tleV0gPSB7fTtcbiAgICAgIGZvciAoY29uc3Qga2V5MiBpbiBvYmpDb250ZW50cy52YWx1ZVtrZXldKSB7XG4gICAgICAgIGlmIChrZXkyID09PSAncGVyc29ubmVfdHlwZScpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlQWN0b3JzVHlwZUxpYmVsbGUudmFsdWVba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkyID09PSAnbnVtQ29tbWVyY2FudCcpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlQWN0b3JzU2VsbE51bUxpYmVsbGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkyID09PSAnZmFjdHVyZScpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlT3JkZXJzSW52b2ljZUxpYmVsbGUoa2V5KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoa2V5MiA9PT0gJ1NlcnZpY2VzJykge1xuICAgICAgICAgIHJldFtrZXldWydzZXJ2aWNlcyddID0gdGFibGVPcmRlcnNTZXJ2aWNlc0xpYmVsbGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICAgZWxzZSBpZiAoa2V5MiA9PT0gJ2NvbnRlbnVBZGRpdGlvbm5lbCcpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlT3JkZXJzQWRkQ29udGVudExpYmVsbGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkyID09PSAncGF5bWVudF90eXBlJykge1xuICAgICAgICAgIHJldFtrZXldW2tleTJdID0gdGFibGVQYXltZW50c1R5cGVMaWJlbGxlKGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5MiA9PT0gJ2V0YXQnKSB7XG4gICAgICAgICAgcmV0W2tleV1ba2V5Ml0gPSB0YWJsZVBheW1lbnRzU3RhdGVMaWJlbGxlKGtleSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGtleTIgPT09ICdidXllcicpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlSW52b2ljZXNCdXllckxpYmVsbGUoa2V5KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoa2V5MiA9PT0gJ3NlbGxlcicpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlSW52b2ljZXNTZWxsZXJMaWJlbGxlKGtleSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGtleTIgPT09ICdjb21tYW5kZXMnKSB7XG4gICAgICAgICAgcmV0W2tleV1ba2V5Ml0gPSB0YWJsZUludm9pY2VzT3JkZXJzTGliZWxsZShrZXkpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChrZXkyID09PSAnZGV2aXNlJykge1xuICAgICAgICAgIHJldFtrZXldW2tleTJdID0gdGFibGVJbnZvaWNlc0RldmlzZUxpYmVsbGUoa2V5KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoa2V5MiA9PT0gJ2xhbmd1ZScpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlSW52b2ljZXNMYW5ndWVMaWJlbGxlKGtleSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGtleTIgPT09ICdwYXltZW50cycpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlSW52b2ljZXNQYXltZW50c0xpYmVsbGUoa2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkyID09PSAndHZhVmFsdWUnKSB7XG4gICAgICAgICAgcmV0W2tleV1ba2V5Ml0gPSB0YWJsZUludm9pY2VzVkFUTGliZWxsZShrZXkpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChrZXkyID09PSAnZGF0ZScpIHtcbiAgICAgICAgICByZXRba2V5XVtrZXkyXSA9IHRhYmxlSW52b2ljZXNEYXRlTGliZWxsZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldFtrZXldW2tleTJdID0gb2JqQ29udGVudHMudmFsdWVba2V5XVtrZXkyXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB0YWJsZUhlYWRGb3JEaXNwbGF5OiBSZWY8VGFibGVDb2x1bW5EZWZbXT4gPSByZWYoW10pO1xuY29uc3QgZW1pdHMgPSBbcHJvcHMuYWRkQWN0aW9uTmFtZSwgcHJvcHMudXBkYXRlQWN0aW9uTmFtZSwgcHJvcHMuZGVsZXRlQWN0aW9uTmFtZV07XG5jb25zdCBvcmllbnRhdGlvbiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhY3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSBmYWxzZTtcbiAgaWYgKCEhb3JpZW50YXRpb24udmFsdWUpe1xuICAgIGlmIChvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXByaW1hcnknIHx8IG9yaWVudGF0aW9uLnZhbHVlID09PSAncG9ydHJhaXQtc2Vjb25kYXJ5Jyl7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG4vLyBjb25zb2xlLmxvZyhwcm9wcyk7XG5sZXQgc2VydmljZVN0b3JlID0gbnVsbCwgYWN0b3JTdG9yZSA9IG51bGwsIG9yZGVyU3RvcmUgPSBudWxsLCBwYXltZW50U3RvcmUgPSBudWxsLCBpbnZvaWNlU3RvcmUgPSBudWxsLCBzZXNzaW9uU3RvcmUgPSBudWxsLCB1c2VyU3RvcmUgPSBudWxsLCBwcmVmcyA9IG51bGwsIHNlc3Npb24gPSBudWxsO1xuXG4vLyBERUNMQVJBVElPTlNcbmlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gIHNlcnZpY2VTdG9yZSA9IHVzZVNlcnZpY2VTdG9yZSgpO1xuICBhY3RvclN0b3JlID0gdXNlQWN0b3JTdG9yZSgpO1xuICBvcmRlclN0b3JlID0gdXNlT3JkZXJTdG9yZSgpO1xuICBwYXltZW50U3RvcmUgPSB1c2VQYXltZW50U3RvcmUoKTtcbiAgaW52b2ljZVN0b3JlID0gdXNlSW52b2ljZVN0b3JlKCk7XG4gIHNlc3Npb25TdG9yZSA9IHVzZVNlc3Npb25TdG9yZSgpO1xuICB1c2VyU3RvcmUgPSB1c2VVc2VyU3RvcmUoKTtcbn0gXG5lbHNlIHtcbiAgb3JpZW50YXRpb24udmFsdWUgPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICBwcmVmcyA9IGF3YWl0IGltcG9ydCgnY2FwL3N0b3JhZ2UvcHJlZmVyZW5jZXMnKTtcbiAgICBzZXNzaW9uID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignc2Vzc2lvbicpO1xuICB9KSgpO1xufVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGh5ZHJhdGVPYmpDb250ZW50RnJvbVN0b3JlKCkge1xuICBsZXQgY29udGVudFRhYiA9IFtdO1xuICBpZiAoc3JjID09PSAnc2VydmljZXMnKSB7XG4gICAgcmV0dXJuIChjb250ZW50VGFiID0gYXdhaXQgc2VydmljZVN0b3JlLmdldEFsbFNlcnZpY2VzKClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIGlmIChzcmMgPT09ICdhY3RvcnMnKXtcbiAgICByZXR1cm4gKGNvbnRlbnRUYWIgPSBhd2FpdCBhY3RvclN0b3JlLmdldEFsbEFjdG9ycygpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KVxuICAgICk7XG4gIH0gZWxzZSBpZiAoc3JjID09PSAnb3JkZXJzJykge1xuICAgIHJldHVybiAoY29udGVudFRhYiA9IGF3YWl0IG9yZGVyU3RvcmUuZ2V0QWxsT3JkZXJzKClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIGlmKHNyYyA9PT0gJ3BheW1lbnRzJykge1xuICAgIHJldHVybiAoY29udGVudFRhYiA9IGF3YWl0IHBheW1lbnRTdG9yZS5nZXRBbGxQYXltZW50cygpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgZWxzZSBpZiAoc3JjID09PSAnaW52b2ljZXMnKSB7XG4gICAgcmV0dXJuIChjb250ZW50VGFiID0gYXdhaXQgaW52b2ljZVN0b3JlLmdldEFsbEludm9pY2VzKHVzZXJTdG9yZS5nZXRVc2VyLnVzZXJJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gY29udGVudFRhYjtcbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGh5ZHJhdGVPYmpDb250ZW50RnJvbVNRTGl0ZSgpIHtcbiAgLy8gY29uc29sZS5sb2coJ2h5ZHJhdGUgZnJvbSBTUUxpdGUgIScpO1xuICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGxldCByZXMgPSBbXTtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCBzcWwgPSAnJztcbiAgICBpZiAoc3JjID09PSAnc2VydmljZXMnKSB7XG4gICAgICBzcWwgPSAnU0VMRUNUIGBzZXJ2aWNlYC5gc2VydmljZUlkYCwgYHNlcnZpY2VgLmBub21gLCBgc2VydmljZWAuYG1vbnRhbnRIdGAsIGBzZXJ2aWNlYC5gcXVhbnRpdGVgIEZST00gYHByb2R1aXRzZXJ2aWNlYCBBUyBgc2VydmljZWA7JztcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgLy8gYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgLy8gcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXMgPSB2YWx1ZXMudmFsdWVzO1xuICAgIH0gZWxzZSBpZiAoc3JjID09PSAnYWN0b3JzJykge1xuICAgICAgc3FsID0gJ1NFTEVDVCBgcGVyc29ubmVgLmBhY3RvcklkYCwgYHBlcnNvbm5lYC5gcHJlbm9tYCwgYHBlcnNvbm5lYC5gbm9tYCwgYHBlcnNvbm5lYC5gZW1haWxgLCBgcGVyc29ubmVgLmBudW1SdWVgLCBgcGVyc29ubmVgLmBub21SdWVgLCBgcGVyc29ubmVgLmBjcGAsIGBwZXJzb25uZWAuYHZpbGxlYCwgYHBlcnNvbm5lYC5gdGVsYCwgYHBlcnNvbm5lYC5gbnVtQ29tbWVyY2FudGAsIGBwZXJzb25uZV90eXBlYC5gYWN0b3JUeXBlSWRgLCBgcGVyc29ubmVfdHlwZWAuYGFjdG9yVHlwZUlkYCBBUyBgcGVyc29ubmVfdHlwZS5hY3RvclR5cGVJZGAsIGBwZXJzb25uZV90eXBlYC5gc2VsbGVyYCBBUyBgcGVyc29ubmVfdHlwZS5zZWxsZXJgLCBgcGVyc29ubmVfdHlwZWAuYGJ1eWVyYCBBUyBgcGVyc29ubmVfdHlwZS5idXllcmAgRlJPTSBgcGVyc29ubmVgIEFTIGBwZXJzb25uZWAgTEVGVCBPVVRFUiBKT0lOIGBwZXJzb25uZV90eXBlYCBBUyBgcGVyc29ubmVfdHlwZWAgT04gYHBlcnNvbm5lYC5gYWN0b3JUeXBlSWRgID0gYHBlcnNvbm5lX3R5cGVgLmBhY3RvclR5cGVJZGA7JztcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgLy8gYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgLy8gcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXMgPSB2YWx1ZXMudmFsdWVzO1xuICAgIH0gZWxzZSBpZihzcmMgPT09ICdvcmRlcnMnKSB7XG4gICAgICBzcWwgPSAnU0VMRUNUIGBjb21tYW5kZWAuYG9yZGVySWRgLCBgY29tbWFuZGVgLmBjb250ZW51QWRkaXRpb25uZWxgLCBgY29tbWFuZGVgLmBwcmljZUh0YCwgYFNlcnZpY2VzYC5gc2VydmljZUlkYCBBUyBgU2VydmljZXMuc2VydmljZUlkYCwgYFNlcnZpY2VzYC5gbW9udGFudEh0YCBBUyBgU2VydmljZXMubW9udGFudEh0YCwgYFNlcnZpY2VzYC5gbm9tYCBBUyBgU2VydmljZXMubm9tYCwgYFNlcnZpY2VzYC5gcXVhbnRpdGVgIEFTIGBTZXJ2aWNlcy5xdWFudGl0ZWAsIGBmYWN0dXJlYC5gZmFjdHVyZUlkYCBBUyBgZmFjdHVyZS5mYWN0dXJlSWRgLCBgZmFjdHVyZWAuYGRhdGVgIEFTIGBmYWN0dXJlLmRhdGVgLCBgZmFjdHVyZWAuYGludm9pY2VIVFByaWNlYCBBUyBgZmFjdHVyZS5pbnZvaWNlSFRQcmljZWAsIGBmYWN0dXJlYC5gaW52b2ljZVRUUHJpY2VgIEFTIGBmYWN0dXJlLmludm9pY2VUVFByaWNlYCwgYGZhY3R1cmVgLmBsYW5ndWFnZUlkYCBBUyBgZmFjdHVyZS5sYW5ndWFnZUlkYCwgYGZhY3R1cmVgLmBkZXZpc2VJZGAgQVMgYGZhY3R1cmUuZGV2aXNlSWRgLCBgZmFjdHVyZWAuYHR2YVZhbHVlYCBBUyBgZmFjdHVyZS50dmFWYWx1ZWAsIGBmYWN0dXJlYC5gYnV5ZXJJZGAgQVMgYGZhY3R1cmUuYnV5ZXJJZGAsIGBmYWN0dXJlYC5gc2VsbGVySWRgIEFTIGBmYWN0dXJlLnNlbGxlcklkYCwgYGZhY3R1cmVgLmBhZG1pbmlzdHJhdG9ySWRgIEFTIGBmYWN0dXJlLmFkbWluaXN0cmF0b3JJZGAgRlJPTSBgY29tbWFuZGVgIEFTIGBjb21tYW5kZWAgTEVGVCBPVVRFUiBKT0lOICggYGNvbnRhaW5zYCBBUyBgU2VydmljZXMtPmNvbnRhaW5zYCBJTk5FUiBKT0lOIGBwcm9kdWl0c2VydmljZWAgQVMgYFNlcnZpY2VzYCBPTiBgU2VydmljZXNgLmBzZXJ2aWNlSWRgID0gYFNlcnZpY2VzLT5jb250YWluc2AuYHNlcnZpY2VJZGApIE9OIGBjb21tYW5kZWAuYG9yZGVySWRgID0gYFNlcnZpY2VzLT5jb250YWluc2AuYG9yZGVySWRgIExFRlQgT1VURVIgSk9JTiBgZmFjdHVyZWAgQVMgYGZhY3R1cmVgIE9OIGBjb21tYW5kZWAuYGZhY3R1cmVJZGAgPSBgZmFjdHVyZWAuYGZhY3R1cmVJZGA7JztcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgLy8gYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgLy8gcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXMgPSB2YWx1ZXMudmFsdWVzO1xuICAgIH0gZWxzZSBpZihzcmMgPT09ICdwYXltZW50cycpIHtcbiAgICAgIHNxbCA9ICdTRUxFQ1QgYHBheW1lbnRgLmBwYXltZW50SWRgLCBgcGF5bWVudGAuYGV0YXRgLCBgcGF5bWVudGAuYHBheW1lbnRWYWx1ZWAsIGBwYXltZW50X3R5cGVgLmBwYXltZW50VHlwZUlkYCBBUyBgcGF5bWVudF90eXBlLnBheW1lbnRUeXBlSWRgLCBgcGF5bWVudF90eXBlYC5gY2JgIEFTIGBwYXltZW50X3R5cGUuY2JgLCBgcGF5bWVudF90eXBlYC5gZXNwYCBBUyBgcGF5bWVudF90eXBlLmVzcGAsIGBwYXltZW50X3R5cGVgLmBjaHFgIEFTIGBwYXltZW50X3R5cGUuY2hxYCwgYGZhY3R1cmVgLmBmYWN0dXJlSWRgIEFTIGBmYWN0dXJlLmZhY3R1cmVJZGAsIGBmYWN0dXJlYC5gZGF0ZWAgQVMgYGZhY3R1cmUuZGF0ZWAsIGBmYWN0dXJlYC5gaW52b2ljZUhUUHJpY2VgIEFTIGBmYWN0dXJlLmludm9pY2VIVFByaWNlYCwgYGZhY3R1cmVgLmBpbnZvaWNlVFRQcmljZWAgQVMgYGZhY3R1cmUuaW52b2ljZVRUUHJpY2VgLCBgZmFjdHVyZWAuYGxhbmd1YWdlSWRgIEFTIGBmYWN0dXJlLmxhbmd1YWdlSWRgLCBgZmFjdHVyZWAuYGRldmlzZUlkYCBBUyBgZmFjdHVyZS5kZXZpc2VJZGAsIGBmYWN0dXJlYC5gdHZhVmFsdWVgIEFTIGBmYWN0dXJlLnR2YVZhbHVlYCwgYGZhY3R1cmVgLmBidXllcklkYCBBUyBgZmFjdHVyZS5idXllcklkYCwgYGZhY3R1cmVgLmBzZWxsZXJJZGAgQVMgYGZhY3R1cmUuc2VsbGVySWRgLCBgZmFjdHVyZWAuYGFkbWluaXN0cmF0b3JJZGAgQVMgYGZhY3R1cmUuYWRtaW5pc3RyYXRvcklkYCBGUk9NIGBwYXltZW50YCBBUyBgcGF5bWVudGAgTEVGVCBPVVRFUiBKT0lOIGBwYXltZW50X3R5cGVgIEFTIGBwYXltZW50X3R5cGVgIE9OIGBwYXltZW50YC5gcGF5bWVudFR5cGVgID0gYHBheW1lbnRfdHlwZWAuYHBheW1lbnRUeXBlSWRgIExFRlQgT1VURVIgSk9JTiBgZmFjdHVyZWAgQVMgYGZhY3R1cmVgIE9OIGBwYXltZW50YC5gZmFjdHVyZUlkYCA9IGBmYWN0dXJlYC5gZmFjdHVyZUlkYDsnO1xuICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgLy8gYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgLy8gcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXMgPSB2YWx1ZXMudmFsdWVzO1xuICAgIH0gZWxzZSBpZihzcmMgPT09ICdpbnZvaWNlcycpe1xuICAgICAgcHJlZnMgPSBhd2FpdCBpbXBvcnQoJ2NhcC9zdG9yYWdlL3ByZWZlcmVuY2VzJyk7XG4gICAgICBjb25zdCB1c3IgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCd1c2VyJyk7XG4gICAgICBzcWwgPSAnU0VMRUNUIGBmYWN0dXJlYC5gZmFjdHVyZUlkYCwgYGZhY3R1cmVgLmBkYXRlYCwgYGZhY3R1cmVgLmBpbnZvaWNlSFRQcmljZWAsIGBmYWN0dXJlYC5gaW52b2ljZVRUUHJpY2VgLCBgZmFjdHVyZWAuYHR2YVZhbHVlYCwgYGxhbmd1ZWAuYGxhbmd1ZUlkYCBBUyBgbGFuZ3VlLmxhbmd1ZUlkYCwgYGxhbmd1ZWAuYGxpYmVsbGVgIEFTIGBsYW5ndWUubGliZWxsZWAsIGBsYW5ndWVgLmBub21gIEFTIGBsYW5ndWUubm9tYCwgYGRldmlzZWAuYGRldmlzZUlkYCBBUyBgZGV2aXNlLmRldmlzZUlkYCwgYGRldmlzZWAuYHN5bWJvbGVgIEFTIGBkZXZpc2Uuc3ltYm9sZWAsIGBkZXZpc2VgLmBsaWJlbGxlYCBBUyBgZGV2aXNlLmxpYmVsbGVgLCBgYnV5ZXJgLmBhY3RvcklkYCBBUyBgYnV5ZXIuYWN0b3JJZGAsIGBidXllcmAuYGNwYCBBUyBgYnV5ZXIuY3BgLCBgYnV5ZXJgLmBlbWFpbGAgQVMgYGJ1eWVyLmVtYWlsYCwgYGJ1eWVyYC5gbm9tYCBBUyBgYnV5ZXIubm9tYCwgYGJ1eWVyYC5gbm9tUnVlYCBBUyBgYnV5ZXIubm9tUnVlYCwgYGJ1eWVyYC5gbnVtQ29tbWVyY2FudGAgQVMgYGJ1eWVyLm51bUNvbW1lcmNhbnRgLCBgYnV5ZXJgLmBudW1SdWVgIEFTIGBidXllci5udW1SdWVgLCBgYnV5ZXJgLmBwcmVub21gIEFTIGBidXllci5wcmVub21gLCBgYnV5ZXJgLmB0ZWxgIEFTIGBidXllci50ZWxgLCBgYnV5ZXJgLmBhY3RvclR5cGVJZGAgQVMgYGJ1eWVyLmFjdG9yVHlwZUlkYCwgYGJ1eWVyYC5gdmlsbGVgIEFTIGBidXllci52aWxsZWAsIGBzZWxsZXJgLmBhY3RvcklkYCBBUyBgc2VsbGVyLmFjdG9ySWRgLCBgc2VsbGVyYC5gY3BgIEFTIGBzZWxsZXIuY3BgLCBgc2VsbGVyYC5gZW1haWxgIEFTIGBzZWxsZXIuZW1haWxgLCBgc2VsbGVyYC5gbm9tYCBBUyBgc2VsbGVyLm5vbWAsIGBzZWxsZXJgLmBub21SdWVgIEFTIGBzZWxsZXIubm9tUnVlYCwgYHNlbGxlcmAuYG51bUNvbW1lcmNhbnRgIEFTIGBzZWxsZXIubnVtQ29tbWVyY2FudGAsIGBzZWxsZXJgLmBudW1SdWVgIEFTIGBzZWxsZXIubnVtUnVlYCwgYHNlbGxlcmAuYHByZW5vbWAgQVMgYHNlbGxlci5wcmVub21gLCBgc2VsbGVyYC5gdGVsYCBBUyBgc2VsbGVyLnRlbGAsIGBzZWxsZXJgLmBhY3RvclR5cGVJZGAgQVMgYHNlbGxlci5hY3RvclR5cGVJZGAsIGBzZWxsZXJgLmB2aWxsZWAgQVMgYHNlbGxlci52aWxsZWAsIGBjb21tYW5kZXNgLmBvcmRlcklkYCBBUyBgY29tbWFuZGVzLm9yZGVySWRgLCBgY29tbWFuZGVzYC5gY29udGVudUFkZGl0aW9ubmVsYCBBUyBgY29tbWFuZGVzLmNvbnRlbnVBZGRpdGlvbm5lbGAsIGBjb21tYW5kZXNgLmBwcmljZUh0YCBBUyBgY29tbWFuZGVzLnByaWNlSHRgLCBgY29tbWFuZGVzYC5gZmFjdHVyZUlkYCBBUyBgY29tbWFuZGVzLmZhY3R1cmVJZGAsIGBwYXltZW50c2AuYHBheW1lbnRJZGAgQVMgYHBheW1lbnRzLnBheW1lbnRJZGAsIGBwYXltZW50c2AuYGV0YXRgIEFTIGBwYXltZW50cy5ldGF0YCwgYHBheW1lbnRzYC5gcGF5bWVudFZhbHVlYCBBUyBgcGF5bWVudHMucGF5bWVudFZhbHVlYCwgYHBheW1lbnRzYC5gcGF5bWVudFR5cGVgIEFTIGBwYXltZW50cy5wYXltZW50VHlwZWAsIGBwYXltZW50c2AuYGZhY3R1cmVJZGAgQVMgYHBheW1lbnRzLmZhY3R1cmVJZGAgRlJPTSBgZmFjdHVyZWAgQVMgYGZhY3R1cmVgIExFRlQgT1VURVIgSk9JTiBgbGFuZ3VlYCBBUyBgbGFuZ3VlYCBPTiBgZmFjdHVyZWAuYGxhbmd1YWdlSWRgID0gYGxhbmd1ZWAuYGxhbmd1ZUlkYCBMRUZUIE9VVEVSIEpPSU4gYGRldmlzZWAgQVMgYGRldmlzZWAgT04gYGZhY3R1cmVgLmBkZXZpc2VJZGAgPSBgZGV2aXNlYC5gZGV2aXNlSWRgIExFRlQgT1VURVIgSk9JTiBgcGVyc29ubmVgIEFTIGBidXllcmAgT04gYGZhY3R1cmVgLmBidXllcklkYCA9IGBidXllcmAuYGFjdG9ySWRgIExFRlQgT1VURVIgSk9JTiBgcGVyc29ubmVgIEFTIGBzZWxsZXJgIE9OIGBmYWN0dXJlYC5gc2VsbGVySWRgID0gYHNlbGxlcmAuYGFjdG9ySWRgIExFRlQgT1VURVIgSk9JTiBgY29tbWFuZGVgIEFTIGBjb21tYW5kZXNgIE9OIGBmYWN0dXJlYC5gZmFjdHVyZUlkYCA9IGBjb21tYW5kZXNgLmBmYWN0dXJlSWRgIExFRlQgT1VURVIgSk9JTiBgcGF5bWVudGAgQVMgYHBheW1lbnRzYCBPTiBgZmFjdHVyZWAuYGZhY3R1cmVJZGAgPSBgcGF5bWVudHNgLmBmYWN0dXJlSWRgIFdIRVJFIGBmYWN0dXJlYC5gYWRtaW5pc3RyYXRvcklkYCA9IFxcJycrdXNyLnVzZXIudXNlcklkKydcXCcgR1JPVVAgQlkgYGZhY3R1cmVgLmBmYWN0dXJlSWRgLCBgcGF5bWVudHMucGF5bWVudElkYCwgYGNvbW1hbmRlcy5vcmRlcklkYDsnO1xuICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgLy8gYXdhaXQgc2V0RGVjcnlwdEFwaSgpO1xuICAgICAgLy8gcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXMgPSB2YWx1ZXMudmFsdWVzO1xuICAgIH1cbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5mdW5jdGlvbiB0cmFuc2Zvcm1PYmpDb250ZW50RnJvbVNRTGl0ZURiKCkge1xuICBpZiAocGxhdGZvcm0uaXMubW9iaWxlKSB7XG4gICAgLy8gY29uc29sZS5sb2cob2JqQ29udGVudHMudmFsdWUpO1xuICAgIGxldCByZXQgPSBbXTtcbiAgICBpZiAoc3JjID09PSAnYWN0b3JzJykge1xuICAgICAgZm9yIChjb25zdCBrIGluIG9iakNvbnRlbnRzLnZhbHVlKSB7XG4gICAgICAgIHJldFtrXSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGwgaW4gb2JqQ29udGVudHMudmFsdWVba10pIHtcbiAgICAgICAgICBpZiAobCA9PT0gJ3BlcnNvbm5lX3R5cGUuYWN0b3JUeXBlSWQnKSB7XG4gICAgICAgICAgICByZXRba11bJ3BlcnNvbm5lX3R5cGUnXSA9IHJldFtrXVsncGVyc29ubmVfdHlwZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtrXVsncGVyc29ubmVfdHlwZSddO1xuICAgICAgICAgICAgcmV0W2tdWydwZXJzb25uZV90eXBlJ11bJ2FjdG9yVHlwZUlkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICB9IGVsc2UgaWYobCA9PT0gJ3BlcnNvbm5lX3R5cGUuc2VsbGVyJykge1xuICAgICAgICAgICAgcmV0W2tdWydwZXJzb25uZV90eXBlJ10gPSByZXRba11bJ3BlcnNvbm5lX3R5cGUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ3BlcnNvbm5lX3R5cGUnXTtcbiAgICAgICAgICAgIHJldFtrXVsncGVyc29ubmVfdHlwZSddWydzZWxsZXInXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgIH0gZWxzZSBpZihsID09PSAncGVyc29ubmVfdHlwZS5idXllcicpIHtcbiAgICAgICAgICAgIHJldFtrXVsncGVyc29ubmVfdHlwZSddID0gcmV0W2tdWydwZXJzb25uZV90eXBlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2tdWydwZXJzb25uZV90eXBlJ107XG4gICAgICAgICAgICByZXRba11bJ3BlcnNvbm5lX3R5cGUnXVsnYnV5ZXInXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRba11bbF0gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IFxuICAgIGVsc2UgaWYoc3JjID09PSAnb3JkZXJzJykge1xuICAgICAgbGV0IGluZCA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqQ29udGVudHMudmFsdWUpIHtcbiAgICAgICAgY29uc3QgcHJldklkID0gayA+IDAgPyBvYmpDb250ZW50cy52YWx1ZVtrIC0gMV0ub3JkZXJJZCA6IDA7XG4gICAgICAgIGlmIChwcmV2SWQgJiYgcHJldklkICE9PSBvYmpDb250ZW50cy52YWx1ZVtrXS5vcmRlcklkKXtcbiAgICAgICAgICBpbmQrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByZXZJZCB8fCAocHJldklkICYmIHByZXZJZCAhPT0gb2JqQ29udGVudHMudmFsdWVba10ub3JkZXJJZCkpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgayAtLT4gJHtrfS9pbmQgLS0+ICR7aW5kfWApO1xuICAgICAgICAgIHJldFtpbmRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHByZXZJZCAtLT4gJHtwcmV2SWR9L29iaklkIC0tPiAke29iakNvbnRlbnRzLnZhbHVlW2tdLm9yZGVySWR9L2luZCAtLT4gJHtpbmR9YCk7XG4gICAgICAgIGZvciAoY29uc3QgbCBpbiBvYmpDb250ZW50cy52YWx1ZVtrXSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGwpO1xuICAgICAgICAgIGlmIChwcmV2SWQgPT09IG9iakNvbnRlbnRzLnZhbHVlW2tdLm9yZGVySWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdlcXVhbHMnKTtcbiAgICAgICAgICAgIGlmIChsID09PSAnU2VydmljZXMuc2VydmljZUlkJykge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmpDb250ZW50cy52YWx1ZVtrXVtsXSk7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddID0gcmV0W2luZF1bJ1NlcnZpY2VzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ1NlcnZpY2VzJ107XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10ucHVzaCh7c2VydmljZUlkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ1NlcnZpY2VzLm1vbnRhbnRIdCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10gPSByZXRbaW5kXVsnU2VydmljZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnU2VydmljZXMnXTtcbiAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddLnB1c2goe21vbnRhbnRIdDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddW3JldFtpbmRdWydTZXJ2aWNlcyddLmxlbmd0aCAtIDFdLm1vbnRhbnRIdCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYobCA9PT0gJ1NlcnZpY2VzLm5vbScpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10gPSByZXRbaW5kXVsnU2VydmljZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnU2VydmljZXMnXTtcbiAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddLnB1c2goe25vbTogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddW3JldFtpbmRdWydTZXJ2aWNlcyddLmxlbmd0aCAtIDFdLm5vbSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGwgPT09ICdTZXJ2aWNlcy5xdWFudGl0ZScpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10gPSByZXRbaW5kXVsnU2VydmljZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnU2VydmljZXMnXTtcbiAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddLnB1c2goe3F1YW50aXRlOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ11bcmV0W2luZF1bJ1NlcnZpY2VzJ10ubGVuZ3RoIC0gMV0ucXVhbnRpdGUgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobCA9PT0gJ1NlcnZpY2VzLnNlcnZpY2VJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10gPSByZXRbaW5kXVsnU2VydmljZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnU2VydmljZXMnXTtcbiAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddLnB1c2goe3NlcnZpY2VJZDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddW3JldFtpbmRdWydTZXJ2aWNlcyddLmxlbmd0aCAtIDFdLnNlcnZpY2VJZCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmKGwgPT09ICdTZXJ2aWNlcy5tb250YW50SHQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddID0gcmV0W2luZF1bJ1NlcnZpY2VzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ1NlcnZpY2VzJ107XG4gICAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ1NlcnZpY2VzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnU2VydmljZXMnXS5wdXNoKHttb250YW50SHQ6IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnU2VydmljZXMnXVtyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGggLSAxXS5tb250YW50SHQgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZihsID09PSAnU2VydmljZXMubm9tJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnU2VydmljZXMnXSA9IHJldFtpbmRdWydTZXJ2aWNlcyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydTZXJ2aWNlcyddO1xuICAgICAgICAgICAgICBpZiAoIXJldFtpbmRdWydTZXJ2aWNlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10ucHVzaCh7bm9tOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ11bcmV0W2luZF1bJ1NlcnZpY2VzJ10ubGVuZ3RoIC0gMV0ubm9tID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdTZXJ2aWNlcy5xdWFudGl0ZScpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ10gPSByZXRbaW5kXVsnU2VydmljZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnU2VydmljZXMnXTtcbiAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnU2VydmljZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydTZXJ2aWNlcyddLnB1c2goe3F1YW50aXRlOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ1NlcnZpY2VzJ11bcmV0W2luZF1bJ1NlcnZpY2VzJ10ubGVuZ3RoIC0gMV0ucXVhbnRpdGUgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuZmFjdHVyZUlkJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gcmV0W2luZF1bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddWydmYWN0dXJlSWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnZmFjdHVyZS5kYXRlJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gcmV0W2luZF1bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddWydkYXRlJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuaW52b2ljZUhUUHJpY2UnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSByZXRbaW5kXVsnZmFjdHVyZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydmYWN0dXJlJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ11bJ2ludm9pY2VIVFByaWNlJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnZmFjdHVyZS5pbnZvaWNlVFRQcmljZScpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IHJldFtpbmRdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXVsnaW52b2ljZVRUUHJpY2UnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmxhbmd1YWdlSWQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSByZXRbaW5kXVsnZmFjdHVyZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydmYWN0dXJlJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ11bJ2xhdWd1YWdlSWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmRldmlzZUlkJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gcmV0W2luZF1bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddWydkZXZpc2VJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUudHZhVmFsdWUnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSByZXRbaW5kXVsnZmFjdHVyZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydmYWN0dXJlJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydmYWN0dXJlJ11bJ3R2YVZhbHVlJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuYnV5ZXJJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IHJldFtpbmRdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXVsnYnV5ZXJJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLnNlbGxlcklkJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gcmV0W2luZF1bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZmFjdHVyZSddWydzZWxsZXJJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmFkbWluaXN0cmF0b3JJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IHJldFtpbmRdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2ZhY3R1cmUnXVsnYWRtaW5pc3RyYXRvcklkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdW2xdID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0gZWxzZSBpZiAoc3JjID09PSAncGF5bWVudHMnKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqQ29udGVudHMudmFsdWUpIHtcbiAgICAgICAgcmV0W2tdID0ge307XG4gICAgICAgIGZvciAoY29uc3QgbCBpbiBvYmpDb250ZW50cy52YWx1ZVtrXSkge1xuICAgICAgICAgIGlmIChsID09PSAncGF5bWVudF90eXBlLnBheW1lbnRUeXBlSWQnKSB7XG4gICAgICAgICAgICByZXRba11bJ3BheW1lbnRfdHlwZSddID0gcmV0W2tdWydwYXltZW50X3R5cGUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ3BheW1lbnRfdHlwZSddO1xuICAgICAgICAgICAgcmV0W2tdWydwYXltZW50X3R5cGUnXS5wYXltZW50VHlwZUlkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50X3R5cGUuY2InKXtcbiAgICAgICAgICAgIHJldFtrXVsncGF5bWVudF90eXBlJ10gPSByZXRba11bJ3BheW1lbnRfdHlwZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtrXVsncGF5bWVudF90eXBlJ107XG4gICAgICAgICAgICByZXRba11bJ3BheW1lbnRfdHlwZSddLmNiID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50X3R5cGUuZXNwJyl7XG4gICAgICAgICAgICByZXRba11bJ3BheW1lbnRfdHlwZSddID0gcmV0W2tdWydwYXltZW50X3R5cGUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ3BheW1lbnRfdHlwZSddO1xuICAgICAgICAgICAgcmV0W2tdWydwYXltZW50X3R5cGUnXS5lc3AgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3BheW1lbnRfdHlwZS5jaHEnKXtcbiAgICAgICAgICAgIHJldFtrXVsncGF5bWVudF90eXBlJ10gPSByZXRba11bJ3BheW1lbnRfdHlwZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtrXVsncGF5bWVudF90eXBlJ107XG4gICAgICAgICAgICByZXRba11bJ3BheW1lbnRfdHlwZSddLmNocSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChsID09PSAnZmFjdHVyZS5mYWN0dXJlSWQnKXtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddID0gcmV0W2tdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2tdWydmYWN0dXJlJ107XG4gICAgICAgICAgICByZXRba11bJ2ZhY3R1cmUnXVsnZmFjdHVyZUlkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuZGF0ZScpIHtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddID0gcmV0W2tdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2tdWydmYWN0dXJlJ107XG4gICAgICAgICAgICByZXRba11bJ2ZhY3R1cmUnXVsnZGF0ZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRba10pO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuaW52b2ljZUhUUHJpY2UnKSB7XG4gICAgICAgICAgICByZXRba11bJ2ZhY3R1cmUnXSA9IHJldFtrXVsnZmFjdHVyZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtrXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ11bJ2ludm9pY2VIVFByaWNlJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtrXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmludm9pY2VUVFByaWNlJykge1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ10gPSByZXRba11bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddWydpbnZvaWNlVFRQcmljZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRba10pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChsID09PSAnZmFjdHVyZS5sYW5ndWFnZUlkJykge1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ10gPSByZXRba11bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddWydsYXVndWFnZUlkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtrXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmRldmlzZUlkJykge1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ10gPSByZXRba11bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddWydkZXZpc2VJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRba10pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChsID09PSAnZmFjdHVyZS50dmFWYWx1ZScpIHtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddID0gcmV0W2tdWydmYWN0dXJlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2tdWydmYWN0dXJlJ107XG4gICAgICAgICAgICByZXRba11bJ2ZhY3R1cmUnXVsndHZhVmFsdWUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2tdKTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLmJ1eWVySWQnKSB7XG4gICAgICAgICAgICByZXRba11bJ2ZhY3R1cmUnXSA9IHJldFtrXVsnZmFjdHVyZSddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtrXVsnZmFjdHVyZSddO1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ11bJ2J1eWVySWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2tdKTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdmYWN0dXJlLnNlbGxlcklkJykge1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ10gPSByZXRba11bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddWydzZWxsZXJJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRba10pO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2ZhY3R1cmUuYWRtaW5pc3RyYXRvcklkJykge1xuICAgICAgICAgICAgcmV0W2tdWydmYWN0dXJlJ10gPSByZXRba11bJ2ZhY3R1cmUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRba11bJ2ZhY3R1cmUnXTtcbiAgICAgICAgICAgIHJldFtrXVsnZmFjdHVyZSddWydhZG1pbmlzdHJhdG9ySWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2tdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXRba11bbF0gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNyYyA9PT0gJ2ludm9pY2VzJykge1xuICAgICAgbGV0IGluZCA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqQ29udGVudHMudmFsdWUpIHtcbiAgICAgICAgY29uc3QgcHJldklkID0gayA+IDAgPyBvYmpDb250ZW50cy52YWx1ZVtrIC0gMV0uZmFjdHVyZUlkIDogMDtcbiAgICAgICAgaWYgKHByZXZJZCAmJiBwcmV2SWQgIT09IG9iakNvbnRlbnRzLnZhbHVlW2tdLmZhY3R1cmVJZCl7XG4gICAgICAgICAgaW5kKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcmV2SWQgfHwgKHByZXZJZCAmJiBwcmV2SWQgIT09IG9iakNvbnRlbnRzLnZhbHVlW2tdLmZhY3R1cmVJZCkpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgayAtLT4gJHtrfS9pbmQgLS0+ICR7aW5kfWApO1xuICAgICAgICAgIHJldFtpbmRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHByZXZJZCAtLT4gJHtwcmV2SWR9L29iaklkIC0tPiAke29iakNvbnRlbnRzLnZhbHVlW2tdLmZhY3R1cmVJZH0vaW5kIC0tPiAke2luZH1gKTtcbiAgICAgICAgZm9yIChjb25zdCBsIGluIG9iakNvbnRlbnRzLnZhbHVlW2tdKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobCk7XG4gICAgICAgICAgaWYgKHByZXZJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba10uZmFjdHVyZUlkKSB7XG4gICAgICAgICAgICBpZiAobCA9PT0gJ2NvbW1hbmRlcy5vcmRlcklkJykge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmpDb250ZW50cy52YWx1ZVtrXVtsXSk7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgICAgIGlmKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7b3JkZXJJZDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddLmZpbmRJbmRleChlbGVtID0+IGVsZW0ub3JkZXJJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba11bbF0pO1xuICAgICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtvcmRlcklkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ11bZm91bmRJbmRleF0ub3JkZXJJZCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihsID09PSAnY29tbWFuZGVzLmNvbnRlbnVBZGRpdGlvbm5lbCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydjb21tYW5kZXMnXTtcbiAgICAgICAgICAgICAgLy8gaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAoIXJldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddLnB1c2goe2NvbnRlbnVBZGRpdGlvbm5lbDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsnY29tbWFuZGVzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5vcmRlcklkID09PSBvYmpDb250ZW50cy52YWx1ZVtrXVsnb3JkZXJJZCddKTtcbiAgICAgICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5jb250ZW51QWRkaXRpb25uZWwgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW2ZvdW5kSW5kZXhdLmNvbnRlbnVBZGRpdGlvbm5lbCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihsID09PSAnY29tbWFuZGVzLnByaWNlSHQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7cHJpY2VIdDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsnY29tbWFuZGVzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5vcmRlcklkID09PSBvYmpDb250ZW50cy52YWx1ZVtrXVsnb3JkZXJJZCddKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoIC0gMV0ucHJpY2VIdCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW2ZvdW5kSW5kZXhdLnByaWNlSHQgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ2NvbW1hbmRlcy5mYWN0dXJlSWQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtmYWN0dXJlSWQ6IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddLmZpbmRJbmRleChlbGVtID0+IGVsZW0ub3JkZXJJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba11bJ29yZGVySWQnXSk7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5mYWN0dXJlSWQgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtmb3VuZEluZGV4XS5mYWN0dXJlSWQgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50cy5wYXltZW50SWQnKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdKTtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYoIXJldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudElkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsncGF5bWVudHMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLnBheW1lbnRJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba11bbF0pO1xuICAgICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe3BheW1lbnRJZDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bZm91bmRJbmRleF0ucGF5bWVudElkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAncGF5bWVudHMuZXRhdCcpIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqQ29udGVudHMudmFsdWVba11bbF0pO1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgICAgICBpZighcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXS5wdXNoKHtldGF0OiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsncGF5bWVudHMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLnBheW1lbnRJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba11bJ3BheW1lbnRzLnBheW1lbnRJZCddKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGggLSAxXS5ldGF0ID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW2ZvdW5kSW5kZXhdLmV0YXQgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdwYXltZW50cy5wYXltZW50VmFsdWUnKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdKTtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYoIXJldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudFZhbHVlOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSByZXRbaW5kXVsncGF5bWVudHMnXS5maW5kSW5kZXgoZWxlbSA9PiBlbGVtLnBheW1lbnRJZCA9PT0gb2JqQ29udGVudHMudmFsdWVba11bJ3BheW1lbnRzLnBheW1lbnRJZCddKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGggLSAxXS5wYXltZW50VmFsdWUgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bZm91bmRJbmRleF0ucGF5bWVudFZhbHVlID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAncGF5bWVudHMucGF5bWVudFR5cGUnKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdKTtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYoIXJldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudFR5cGU6IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHJldFtpbmRdWydwYXltZW50cyddLmZpbmRJbmRleChlbGVtID0+IGVsZW0ucGF5bWVudElkID09PSBvYmpDb250ZW50cy52YWx1ZVtrXVsncGF5bWVudHMucGF5bWVudElkJ10pO1xuICAgICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW3JldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCAtIDFdLnBheW1lbnRUeXBlID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW2ZvdW5kSW5kZXhdLnBheW1lbnRUeXBlID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAncGF5bWVudHMuZmFjdHVyZUlkJykge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmpDb250ZW50cy52YWx1ZVtrXVtsXSk7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddID0gcmV0W2luZF1bJ3BheW1lbnRzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ3BheW1lbnRzJ107XG4gICAgICAgICAgICAgIGlmKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe2ZhY3R1cmVJZDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcmV0W2luZF1bJ3BheW1lbnRzJ10uZmluZEluZGV4KGVsZW0gPT4gZWxlbS5wYXltZW50SWQgPT09IG9iakNvbnRlbnRzLnZhbHVlW2tdWydwYXltZW50cy5wYXltZW50SWQnXSk7XG4gICAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0uZmFjdHVyZUlkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW2ZvdW5kSW5kZXhdLmZhY3R1cmVJZCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsID09PSAnbGFuZ3VlLmxhbmd1ZUlkJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSByZXRbaW5kXVsnbGFuZ3VlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2xhbmd1ZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXVsnbGFuZ3VlSWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGwgPT09ICdsYW5ndWUubGliZWxsZScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSByZXRbaW5kXVsnbGFuZ3VlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2xhbmd1ZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnbGFuZ3VlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXVsnbGliZWxsZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdsYW5ndWUubm9tJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXSA9IHJldFtpbmRdWydsYW5ndWUnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnbGFuZ3VlJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydsYW5ndWUnXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2xhbmd1ZSddWydub20nXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnZGV2aXNlLmRldmlzZUlkJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXSA9IHJldFtpbmRdWydkZXZpc2UnXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnZGV2aXNlJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2RldmlzZSddWydkZXZpc2VJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdkZXZpc2Uuc3ltYm9sZScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSByZXRbaW5kXVsnZGV2aXNlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2RldmlzZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXVsnc3ltYm9sZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdkZXZpc2UubGliZWxsZScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSByZXRbaW5kXVsnZGV2aXNlJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2RldmlzZSddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnZGV2aXNlJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydkZXZpc2UnXVsnbGliZWxsZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5hY3RvcklkJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsnYWN0b3JJZCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5jcCcpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ2NwJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLmVtYWlsJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsnZW1haWwnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIubm9tJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsnbm9tJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLm5vbVJ1ZScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ25vbVJ1ZSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5udW1Db21tZXJjYW50Jyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWydudW1Db21tZXJjYW50J10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5udW1SdWUnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSByZXRbaW5kXVsnYnV5ZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnYnV5ZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddWydudW1SdWUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnYnV5ZXIucHJlbm9tJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsncHJlbm9tJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLnRlbCcpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ3RlbCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdidXllci5hY3RvclR5cGVJZCcpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IHJldFtpbmRdWydidXllciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydidXllciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ2J1eWVyJ11bJ2FjdG9yVHlwZUlkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ2J1eWVyLnZpbGxlJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gcmV0W2luZF1bJ2J1eWVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ2J1eWVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydidXllciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnYnV5ZXInXVsndmlsbGUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLmFjdG9ySWQnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ2FjdG9ySWQnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLmNwJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydjcCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIuZW1haWwnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ2VtYWlsJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci5ub20nKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ25vbSddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIubm9tUnVlJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydub21SdWUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLm51bUNvbW1lcmNhbnQnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydudW1Db21tZXJjYW50J10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIubnVtUnVlJyl7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IHJldFtpbmRdWydzZWxsZXInXSA9PT0gdW5kZWZpbmVkID8ge30gOiByZXRbaW5kXVsnc2VsbGVyJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddWydudW1SdWUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsID09PSAnc2VsbGVyLnByZW5vbScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSByZXRbaW5kXVsnc2VsbGVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ3NlbGxlciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXVsncHJlbm9tJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci50ZWwnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ3RlbCddID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGwgPT09ICdzZWxsZXIuYWN0b3JUeXBlSWQnKXtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gcmV0W2luZF1bJ3NlbGxlciddID09PSB1bmRlZmluZWQgPyB7fSA6IHJldFtpbmRdWydzZWxsZXInXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0W2luZF1bJ3NlbGxlciddID0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ11bJ2FjdG9yVHlwZUlkJ10gPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobCA9PT0gJ3NlbGxlci52aWxsZScpe1xuICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSByZXRbaW5kXVsnc2VsbGVyJ10gPT09IHVuZGVmaW5lZCA/IHt9IDogcmV0W2luZF1bJ3NlbGxlciddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXRbaW5kXVsnc2VsbGVyJ10gPSBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFtpbmRdWydzZWxsZXInXVsndmlsbGUnXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGwgPT09ICdjb21tYW5kZXMub3JkZXJJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddID0gcmV0W2luZF1bJ2NvbW1hbmRlcyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydjb21tYW5kZXMnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXS5wdXNoKHtvcmRlcklkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5vcmRlcklkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ2NvbW1hbmRlcy5jb250ZW51QWRkaXRpb25uZWwnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7Y29udGVudUFkZGl0aW9ubmVsOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddW3JldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGggLSAxXS5jb250ZW51QWRkaXRpb25uZWwgPSBvYmpDb250ZW50cy52YWx1ZVtrXVtsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0W2luZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihsID09PSAnY29tbWFuZGVzLnByaWNlSHQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXSA9IHJldFtpbmRdWydjb21tYW5kZXMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsnY29tbWFuZGVzJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10ucHVzaCh7cHJpY2VIdDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoIC0gMV0ucHJpY2VIdCA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXRbaW5kXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGwgPT09ICdjb21tYW5kZXMuZmFjdHVyZUlkJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsnY29tbWFuZGVzJ10gPSByZXRbaW5kXVsnY29tbWFuZGVzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ2NvbW1hbmRlcyddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJldFtpbmRdWydjb21tYW5kZXMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ2NvbW1hbmRlcyddLnB1c2goe2ZhY3R1cmVJZDogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydjb21tYW5kZXMnXVtyZXRbaW5kXVsnY29tbWFuZGVzJ10ubGVuZ3RoIC0gMV0uZmFjdHVyZUlkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ3BheW1lbnRzLnBheW1lbnRJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudElkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0ucGF5bWVudElkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ3BheW1lbnRzLmV0YXQnKSB7XG4gICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddID0gcmV0W2luZF1bJ3BheW1lbnRzJ10gPT09IHVuZGVmaW5lZCA/IFtdIDogcmV0W2luZF1bJ3BheW1lbnRzJ107XG4gICAgICAgICAgICAgIGlmIChvYmpDb250ZW50cy52YWx1ZVtrXVtsXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICghcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddLnB1c2goe2V0YXQ6IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXVtyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGggLSAxXS5ldGF0ID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ3BheW1lbnRzLnBheW1lbnRWYWx1ZScpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7cGF5bWVudFZhbHVlOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0ucGF5bWVudFZhbHVlID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ3BheW1lbnRzLnBheW1lbnRUeXBlJykge1xuICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXSA9IHJldFtpbmRdWydwYXltZW50cyddID09PSB1bmRlZmluZWQgPyBbXSA6IHJldFtpbmRdWydwYXltZW50cyddO1xuICAgICAgICAgICAgICBpZiAob2JqQ29udGVudHMudmFsdWVba11bbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICByZXRbaW5kXVsncGF5bWVudHMnXS5wdXNoKHtwYXltZW50VHlwZTogb2JqQ29udGVudHMudmFsdWVba11bbF19KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgIHJldFtpbmRdWydwYXltZW50cyddW3JldFtpbmRdWydwYXltZW50cyddLmxlbmd0aCAtIDFdLnBheW1lbnRUeXBlID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobCA9PT0gJ3BheW1lbnRzLmZhY3R1cmVJZCcpIHtcbiAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10gPSByZXRbaW5kXVsncGF5bWVudHMnXSA9PT0gdW5kZWZpbmVkID8gW10gOiByZXRbaW5kXVsncGF5bWVudHMnXTtcbiAgICAgICAgICAgICAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRbaW5kXVsncGF5bWVudHMnXS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ10ucHVzaCh7ZmFjdHVyZUlkOiBvYmpDb250ZW50cy52YWx1ZVtrXVtsXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgcmV0W2luZF1bJ3BheW1lbnRzJ11bcmV0W2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMV0uZmFjdHVyZUlkID0gb2JqQ29udGVudHMudmFsdWVba11bbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldFtpbmRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICByZXRbaW5kXVtsXSA9IG9iakNvbnRlbnRzLnZhbHVlW2tdW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgIHJldCA9IG9iakNvbnRlbnRzLnZhbHVlXG4gICAgLy8gfVxuICAgIGlmIChzcmMgIT09ICdzZXJ2aWNlcycpeyAgIFxuICAgICAgb2JqQ29udGVudHMudmFsdWUgPSByZXQ7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBPYmogdHJhbnNmb3JtZWQgIWApO1xuICAgIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHRhYmxlQWN0b3JzU2VsbE51bUxpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgbGV0IHJldCA9ICcnO1xuICBsZXQgbGliZWxsZSA9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ251bUNvbW1lcmNhbnQnXTtcbiAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ251bUNvbW1lcmNhbnQnXSA9PT0gbnVsbCkge1xuICAgIGxpYmVsbGUgPSB0KCdhY3RvcnNDb21wb25lbnQubGliZWxsZXMubm9fc2VsbGVyTnVtJyk7XG4gIH1cbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZU9yZGVyc0ludm9pY2VMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJztcbiAgbGV0IGxpYmVsbGUgPSB0KCdvcmRlcnNDb21wb25lbnQubGliZWxsZXMubm9faW52b2ljZScpO1xuICBpZiAob2JqQ29udGVudHMudmFsdWVbaW5kXVsnZmFjdHVyZSddICE9PSBudWxsKSB7XG4gICAgbGliZWxsZSA9IGAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2ZhY3R1cmUnXS5mYWN0dXJlSWR9IC0gJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydmYWN0dXJlJ10uaW52b2ljZVRUUHJpY2V9YDtcbiAgfVxuICByZXQgPSBsaWJlbGxlO1xuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIHRhYmxlT3JkZXJzU2VydmljZXNMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJztcbiAgaWYgKG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ1NlcnZpY2VzJ10gIT09IG51bGwpIHtcbiAgICBmb3IgKGNvbnN0IG0gaW4gb2JqQ29udGVudHMudmFsdWVbaW5kXVsnU2VydmljZXMnXSkge1xuICAgICAgbGV0IGxpYmVsbGUgPSBgJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydTZXJ2aWNlcyddW21dLnNlcnZpY2VJZH0gLSAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ1NlcnZpY2VzJ11bbV0ubm9tfWA7XG4gICAgICByZXQgKz0gbSAhPSBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydTZXJ2aWNlcyddLmxlbmd0aCAtIDEgPyBgJHtsaWJlbGxlfSwgYCA6IGxpYmVsbGU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVPcmRlcnNBZGRDb250ZW50TGliZWxsZShpbmQ6IG51bWJlcikge1xuICBsZXQgcmV0ID0gJyc7XG4gIGxldCBsaWJlbGxlID0gb2JqQ29udGVudHMudmFsdWVbaW5kXVsnY29udGVudUFkZGl0aW9ubmVsJ107XG4gIGlmIChvYmpDb250ZW50cy52YWx1ZVtpbmRdWydjb250ZW51QWRkaXRpb25uZWwnXSA9PT0gbnVsbCB8fCBcbiAgICBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydjb250ZW51QWRkaXRpb25uZWwnXSA9PT0gJycpIHtcbiAgICBsaWJlbGxlID0gdCgnb3JkZXJzQ29tcG9uZW50LmxpYmVsbGVzLm5vX2FkZGl0aW9uYWxfY29udGVudCcpO1xuICB9XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVQYXltZW50c1R5cGVMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJztcbiAgbGV0IGxpYmVsbGUgPSBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydwYXltZW50X3R5cGUnXS5jYiA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmNiJykgOiAnJztcbiAgbGliZWxsZSA9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ3BheW1lbnRfdHlwZSddLmVzcCA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmVzcCcpIDogbGliZWxsZTtcbiAgbGliZWxsZSA9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ3BheW1lbnRfdHlwZSddLmNocSA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmNocScpIDogbGliZWxsZTtcbiAgcmV0ID0gbGliZWxsZTtcbiAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZVBheW1lbnRzU3RhdGVMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJztcbiAgbGV0IGxpYmVsbGUgPSBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydldGF0J10gPT09IDEgPyB0KCdwYXltZW50c0NvbXBvbmVudC5saWJlbGxlcy5ldGF0cy5wYWlkJykgOiAnJztcbiAgbGliZWxsZSA9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2V0YXQnXSA9PT0gMCA/IHQoJ3BheW1lbnRzQ29tcG9uZW50LmxpYmVsbGVzLmV0YXRzLm5vdF9wYWlkJykgOiBsaWJlbGxlO1xuICByZXQgPSBsaWJlbGxlO1xuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIHRhYmxlSW52b2ljZXNCdXllckxpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgbGV0IHJldCA9ICcnO1xuICBsZXQgbGliZWxsZSA9IGAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2J1eWVyJ10uYWN0b3JJZH0gLSAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2J1eWVyJ10ucHJlbm9tfSAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2J1eWVyJ10ubm9tfWA7XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc1NlbGxlckxpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgbGV0IHJldCA9ICcnO1xuICBsZXQgbGliZWxsZSA9IGAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ3NlbGxlciddLmFjdG9ySWR9IC0gJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydzZWxsZXInXS5wcmVub219ICR7b2JqQ29udGVudHMudmFsdWVbaW5kXVsnc2VsbGVyJ10ubm9tfWA7XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc09yZGVyc0xpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgbGV0IHJldCA9ICcnLCBsaWJlbGxlID0gJyc7XG4gIGZvciAoY29uc3QgbSBpbiBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydjb21tYW5kZXMnXSkge1xuICAgIGxpYmVsbGUgPSBgJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydjb21tYW5kZXMnXVttXS5vcmRlcklkfSAtICR7b2JqQ29udGVudHMudmFsdWVbaW5kXVsnY29tbWFuZGVzJ11bbV0ucHJpY2VIdH1gO1xuICAgIHJldCArPSBtICE9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ2NvbW1hbmRlcyddLmxlbmd0aCAtIDEgPyBgJHtsaWJlbGxlfSwgYCA6IGxpYmVsbGU7XG4gIH1cbiAgcmV0ID0gcmV0ID09PSAnJyA/IHQoJ2ludm9pY2VzQ29tcG9uZW50LmxpYmVsbGVzLm5vX29yZGVyJykgOiByZXQ7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc0RldmlzZUxpYmVsbGUoaW5kOiBudW1iZXIpIHtcbiAgbGV0IHJldCA9ICcnO1xuICBsZXQgbGliZWxsZSA9ICEhb2JqQ29udGVudHMudmFsdWVbaW5kXVsnZGV2aXNlJ10gPyBgJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydkZXZpc2UnXS5zeW1ib2xlfSAtICR7b2JqQ29udGVudHMudmFsdWVbaW5kXVsnZGV2aXNlJ10ubGliZWxsZX1gIDogdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fZGV2aXNlJyk7XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc0xhbmd1ZUxpYmVsbGUoaW5kOiBudW1uZXIpIHtcbiAgbGV0IHJldCA9ICcnO1xuICBsZXQgbGliZWxsZSA9ICEhb2JqQ29udGVudHMudmFsdWVbaW5kXVsnbGFuZ3VlJ10gPyBvYmpDb250ZW50cy52YWx1ZVtpbmRdWydsYW5ndWUnXVsnbGliZWxsZSddIDogdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fbGFuZ3VhZ2UnKTtcbiAgcmV0ID0gbGliZWxsZTtcbiAgcmV0dXJuIHJldDtcbn07XG5mdW5jdGlvbiB0YWJsZUludm9pY2VzUGF5bWVudHNMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJywgbGliZWxsZSA9ICcnLCBzdGF0ZSA9ICcnO1xuICBmb3IgKGNvbnN0IG0gaW4gb2JqQ29udGVudHMudmFsdWVbaW5kXVsncGF5bWVudHMnXSkge1xuICAgIHN0YXRlID0gb2JqQ29udGVudHMudmFsdWVbaW5kXVsncGF5bWVudHMnXVttXS5ldGF0ID09PSAwID8gdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMuZXRhdHMubm90X3BhaWQnKSA6ICcnO1xuICAgIHN0YXRlID0gb2JqQ29udGVudHMudmFsdWVbaW5kXVsncGF5bWVudHMnXVttXS5ldGF0ID09PSAxID8gdCgncGF5bWVudHNDb21wb25lbnQubGliZWxsZXMuZXRhdHMucGFpZCcpIDogc3RhdGU7XG4gICAgbGliZWxsZSA9IGAke29iakNvbnRlbnRzLnZhbHVlW2luZF1bJ3BheW1lbnRzJ11bbV0ucGF5bWVudElkfSAtICR7c3RhdGV9IC0gJHtvYmpDb250ZW50cy52YWx1ZVtpbmRdWydwYXltZW50cyddW21dLnBheW1lbnRWYWx1ZX1gO1xuICAgIHJldCArPSBtICE9IG9iakNvbnRlbnRzLnZhbHVlW2luZF1bJ3BheW1lbnRzJ10ubGVuZ3RoIC0gMSA/IGAke2xpYmVsbGV9LCBgIDogbGliZWxsZTtcbiAgfVxuICByZXQgPSByZXQgPT09ICcnID8gdCgnaW52b2ljZXNDb21wb25lbnQubGliZWxsZXMubm9fcGF5bWVudCcpIDogcmV0O1xuICByZXR1cm4gcmV0O1xufTtcbmZ1bmN0aW9uIHRhYmxlSW52b2ljZXNWQVRMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGxldCByZXQgPSAnJywgbGliZWxsZSA9ICcnO1xuICBsaWJlbGxlID0gYCR7b2JqQ29udGVudHMudmFsdWVbaW5kXS50dmFWYWx1ZSAqIDEwMH0gJWA7XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuZnVuY3Rpb24gdGFibGVJbnZvaWNlc0RhdGVMaWJlbGxlKGluZDogbnVtYmVyKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7ZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnMi1kaWdpdCcsIHllYXI6ICdudW1lcmljJ307XG4gIGxldCByZXQgPSAnJywgbGliZWxsZSA9ICcnLCBkYXRlID0gJycsIGxvY2FsZT0nZW4tVVMnO1xuICBpZiAoISFvYmpDb250ZW50cy52YWx1ZVtpbmRdWydkYXRlJ10gJiYgb2JqQ29udGVudHMudmFsdWVbaW5kXVsnZGF0ZSddICE9PSAnJykge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShvYmpDb250ZW50cy52YWx1ZVtpbmRdWydkYXRlJ10pO1xuICB9XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKVxuICAgIGxvY2FsZSA9IHNlc3Npb25TdG9yZS5nZXRMYW5nRGlzcGxheWVkLm5vbTtcbiAgZWxzZXtcbiAgICAvLyBVc2luZyBQcmVmZXJlbmNlcyBmb3IgbW9iaWxlcyBwbGF0Zm9ybVxuICAgIGxvY2FsZSA9ICEhc2Vzc2lvbiAmJiAhIXNlc3Npb24ubGFuZ0Rpc3BsYXllZCA/IHNlc3Npb24ubGFuZ0Rpc3BsYXllZC5ub20gOiAnZW4tVVMnO1xuICB9XG4gIGxpYmVsbGUgPSAhIWRhdGUgPyBgJHtkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIG9wdGlvbnMpfWAgOiB0KCdpbnZvaWNlc0NvbXBvbmVudC5saWJlbGxlcy5ub19kYXRlJyk7XG4gIHJldCA9IGxpYmVsbGU7XG4gIHJldHVybiByZXQ7XG59O1xuYXN5bmMgZnVuY3Rpb24gaHlkcmF0ZUFsbCgpIHtcbiAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICBvYmpDb250ZW50cy52YWx1ZSA9IGF3YWl0IGh5ZHJhdGVPYmpDb250ZW50RnJvbVN0b3JlKCk7XG4gICAgLy8gY29uc29sZS5sb2cob2JqQ29udGVudHMudmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIG9iakNvbnRlbnRzLnZhbHVlID0gYXdhaXQgaHlkcmF0ZU9iakNvbnRlbnRGcm9tU1FMaXRlKCk7XG4gICAgdHJhbnNmb3JtT2JqQ29udGVudEZyb21TUUxpdGVEYigpO1xuICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICBjb25zdCBvYmpDbGVhciA9IGF3YWl0IF9fVFJBTlNGT1JNT0JKX18ob2JqQ29udGVudHMudmFsdWUpO1xuICAgIG9iakNvbnRlbnRzLnZhbHVlID0gb2JqQ2xlYXI7XG4gICAgLy8gY29uc29sZS5sb2coJ2FmdGVyIGRlY3J5cHRpbmcgIScpO1xuICAgIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlKTtcbiAgfVxuICAvLyBjb25zb2xlLmxvZygnb2JqQ29udGVudHMgLS0+Jyk7XG4gIC8vIGNvbnNvbGUubG9nKG9iakNvbnRlbnRzLnZhbHVlKTtcbiAgLy8gaWRlbnRzLnZhbHVlID0gc2hpZnRlZElkZW50cygpO1xuICBjb250ZW50cy52YWx1ZSA9IHNoaWZ0ZWRDb250ZW50cygpO1xufTtcbi8vIGZ1bmN0aW9uIHNoaWZ0ZWRJZGVudHMoKSB7XG4vLyAgIHZhciB0aGF0ID0gdGhpcztcbi8vICAgcmV0dXJuIG9iakNvbnRlbnRzLnZhbHVlLm1hcCgodmFsKSA9PiB7XG4vLyAgICAgbGV0IHJldCA9IHt9O1xuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIHZhbCkge1xuLy8gICAgICAgaWYgKGtleSA9PT0gcHJvcHMuaWRlbnQpIHtcbi8vICAgICAgICAgcmV0W2tleV0gPSB2YWxba2V5XTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHJldDtcbi8vICAgfSwgdGhhdCk7XG4vLyB9O1xuZnVuY3Rpb24gc2hpZnRlZENvbnRlbnRzKCkge1xuICAvLyB2YXIgdGhhdCA9IHRoaXM7XG4gIHJldHVybiBvYmpDb250ZW50cy52YWx1ZS5tYXAoKHZhbCkgPT4ge1xuICAgIGxldCByZXQgPSB2YWw7XG4gICAgLy8gZm9yIChjb25zdCBrZXkgaW4gdmFsKSB7XG4gICAgLy8gICBpZiAoa2V5ICE9PSBwcm9wcy5pZGVudCkge1xuICAgIC8vICAgICByZXRba2V5XSA9IHZhbFtrZXldO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn07XG5mdW5jdGlvbiBmZXRjaENvbHVtbigpIHtcbiAgbGV0IHRhYmxlSGVhZCA9IFtdO1xuICBsZXQgb2JqOiBUYWJsZUNvbHVtbkRlZiA9IHt9O1xuICBvYmoubmFtZSA9IHByb3BzLmlkZW50O1xuICBvYmoubGFiZWwgPSAnIyc7XG4gIG9iai5maWVsZCA9IHByb3BzLmlkZW50O1xuICBvYmouYWxpZ24gPSAnY2VudGVyJztcbiAgb2JqLnNvcnRhYmxlID0gZmFsc2U7XG4gIHRhYmxlSGVhZC5wdXNoKG9iaik7XG4gIGZvciAoY29uc3Qga2V5IGluIHByb3BzLnRhYmxlT2JqKSB7XG4gICAgb2JqID0ge307XG4gICAgb2JqLm5hbWUgPSBwcm9wcy50YWJsZU9ialtrZXldLm5hbWU7XG4gICAgb2JqLmxhYmVsID0gcHJvcHMudGFibGVPYmpba2V5XS5oZWFkO1xuICAgIG9iai5maWVsZCA9IHByb3BzLnRhYmxlT2JqW2tleV0ubmFtZTtcbiAgICBvYmouYWxpZ24gPSAnY2VudGVyJztcbiAgICBvYmouc29ydGFibGUgPSBmYWxzZTtcbiAgICB0YWJsZUhlYWQucHVzaChvYmopO1xuICB9IFxuICAvLyBjb25zb2xlLmxvZyh0YWJsZUhlYWQpO1xuICByZXR1cm4gdGFibGVIZWFkO1xufTtcbmZ1bmN0aW9uIGhhbmRsZU9yaWVudGF0aW9uKCl7XG4gIC8vIGNvbnNvbGUubG9nKHNjcmVlbi5vcmllbnRhdGlvbik7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG59O1xuZnVuY3Rpb24gd3JhcENzdlZhbHVlKHZhbDogYW55LCBmb3JtYXRGbjogYW55LCByb3c6IGFueSl7XG4gIGxldCBmb3JtYXR0ZWQgPSBmb3JtYXRGbiAhPT0gdm9pZCAwXG4gICAgPyBmb3JtYXRGbih2YWwsIHJvdylcbiAgICA6IHZhbDtcblxuICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQgPT09IHZvaWQgMCB8fCBmb3JtYXR0ZWQgPT09IG51bGxcbiAgICA/ICcnXG4gICAgOiBTdHJpbmcoZm9ybWF0dGVkKTtcblxuICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQuc3BsaXQoJ1wiJykuam9pbignXCJcIicpO1xuICAvKipcbiAgICogRXhjZWwgYWNjZXB0cyBcXG4gYW5kIFxcciBpbiBzdHJpbmdzLCBidXQgc29tZSBvdGhlciBDU1YgcGFyc2VycyBkbyBub3RcbiAgICogVW5jb21tZW50IHRoZSBuZXh0IHR3byBsaW5lcyB0byBlc2NhcGUgbmV3IGxpbmVzXG4gICAqL1xuICAvLyBmb3JtYXR0ZWQuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcXFxuJylcbiAgLy8gLnNwbGl0KCdcXHInKS5qb2luKCdcXFxccicpO1xuICByZXR1cm4gYFwiJHtmb3JtYXR0ZWR9XCJgO1xufTtcbmZ1bmN0aW9uIGV4cG9ydFRhYmxlKCkge1xuICAvLyBuYXRpdmUgZW5jb2RpbmcgdG8gY3N2IGZvcm1hdFxuICBjb25zdCBjb2x1bW5zID0gdGFibGVIZWFkRm9yRGlzcGxheS52YWx1ZTtcbiAgY29uc3Qgcm93cyA9IGNvbnRlbnRzRm9yRGlzcC52YWx1ZTtcbiAgY29uc3QgY29udGVudCA9IFtjb2x1bW5zLm1hcChjb2wgPT4gd3JhcENzdlZhbHVlKGNvbC5sYWJlbCkpXVxuICAgIC5jb25jYXQocm93cy5tYXAocm93ID0+IGNvbHVtbnMubWFwKGNvbCA9PiB3cmFwQ3N2VmFsdWUoXG4gICAgICAgIHR5cGVvZiBjb2wuZmllbGQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IGNvbC5maWVsZChyb3cpXG4gICAgICAgICAgOiByb3dbIGNvbC5maWVsZCA9PT0gdm9pZCAwID8gY29sLm5hbWUgOiBjb2wuZmllbGQgXSxcbiAgICAgICAgY29sLmZvcm1hdCxcbiAgICAgICAgcm93XG4gICAgICApKS5qb2luKCcsJykpXG4gICAgKS5qb2luKCdcXHJcXG4nKTtcbiAgY29uc3Qgc3RhdHVzID0gZXhwb3J0RmlsZShcbiAgICBgJHtwcm9wcy50YWJsZVRpdGxlfS10YWJsZS5jc3ZgLFxuICAgIGNvbnRlbnQsXG4gICAgJ3RleHQvY3N2J1xuICApO1xuXG4gIGlmIChzdGF0dXMgIT09IHRydWUpIHtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICBtZXNzYWdlOiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3IuZXhwb3J0JylcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gV0FUQ0hFUlNcbndhdGNoKCgpID0+IHByb3BzLnRhYmxlT2JqLFxuICAoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYG5ld1Byb3AgLT4gJHtuZXdQcm9wLmFjdGlvbnN9L29sZFByb3AgLT4gJHthZ2Fpbi5hY3Rpb25zfWApO1xuICAgIC8vIHRhYmxlSGVhZEZvckRpc3BsYXkudmFsdWUgPSBuZXdQcm9wO1xuICAgIHRhYmxlSGVhZEZvckRpc3BsYXkudmFsdWUgPSBmZXRjaENvbHVtbigpO1xuICB9XG4pXG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGlmICghcHJvcHMuaXNGb3JtKXtcbiAgICBoeWRyYXRlQWxsKCk7XG4gIH1cbiAgdGFibGVIZWFkRm9yRGlzcGxheS52YWx1ZSA9IGZldGNoQ29sdW1uKCk7XG59KTtcbjwvc2NyaXB0PlxuIl0sImZpbGUiOiJhc3NldHMvVGFibGVJdGVtLmpzIn0=
