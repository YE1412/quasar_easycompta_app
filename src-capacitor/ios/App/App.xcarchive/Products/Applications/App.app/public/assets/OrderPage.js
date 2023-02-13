import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, d as computed, _ as __vitePreload, w as watch, D as provide, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, Q as QIcon, aq as unref, b1 as createSlots, a_ as isRef, a9 as createTextVNode, aa as toDisplayString, j as QBtn, a8 as Fragment, g as getCurrentInstance, B as nextTick, am as useRoute, o as onMounted } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { a as QTd } from "./QTable.js";
import { Q as QInput } from "./QInput.js";
import { q as QItemSection } from "./use-prevent-scroll.js";
import { Q as QSelect } from "./QSelect.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { u as useServiceStore, T as TableItem } from "./TableItem.js";
import { o as orderAxiosService } from "./service.service.js";
import { u as useQuasar, i as isDbConnectionOpen, o as openDbConnection, d as newRun, c as closeDbConnection, n as newQuery, e as setCryptApi, f as __FORMATOBJ__, s as setDecryptApi, _ as __TRANSFORMOBJ__ } from "./use-quasar.js";
import "./QList.js";
import "./index4.js";
import "./index2.js";
import "./invoice.js";
import "./invoice.service.js";
import "./session.js";
import "./session.service.js";
import "./WasmModules.js";
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderComponent",
  props: {
    orderForm: { type: Boolean, default: false },
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
      contenuAdditionnel: {
        label: t("ordersComponent.inputLabels.contenuAdditionnel"),
        head: t("ordersComponent.headTable.contenuAdditionnel"),
        name: "contenuAdditionnel",
        placeholder: t("ordersComponent.placeholders.contenuAdditionnel"),
        disabled: false
      },
      priceHt: {
        label: t("ordersComponent.inputLabels.priceHt"),
        head: t("ordersComponent.headTable.priceHt"),
        name: "priceHt",
        placeholder: t("ordersComponent.placeholders.priceHt"),
        disabled: false
      },
      services: {
        label: t("ordersComponent.inputLabels.services"),
        head: t("ordersComponent.headTable.services"),
        name: "services",
        placeholder: t("ordersComponent.placeholders.services"),
        disabled: false
      },
      facture: {
        label: t("ordersComponent.inputLabels.facture"),
        head: t("ordersComponent.headTable.facture"),
        name: "facture",
        placeholder: t("ordersComponent.placeholders.facture"),
        disabled: false
      }
    };
    let addInputObject = {
      contenuAdditionnel: displayInputObject.contenuAdditionnel,
      priceHt: displayInputObject.priceHt,
      services: displayInputObject.services,
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
    const orderId = ref(0);
    const contenuAdditionnel = ref(null);
    const selectServicesOption = ref([]);
    const services = ref([]);
    const priceHt = computed(() => {
      let ret = 0;
      for (const key2 in services.value) {
        ret += services.value[key2].montantHt * services.value[key2].quantite;
      }
      return ret;
    });
    const formState = {
      update: false,
      add: true
    };
    const defaultRow = ref([]);
    const validContenuAdditionnel = computed(() => {
      const re = /^(([\wàåâäéèëêçìîïœöòôùûü0-9])([-\s])*){2,30}$/i;
      return re.test(contenuAdditionnel.value);
    });
    const nonEmptyContenuAdditionnel = computed(() => {
      return !!contenuAdditionnel.value && contenuAdditionnel.value != "";
    });
    const nonEmtyServices = computed(() => {
      return !!services.value && services.value.length ? true : false;
    });
    const formSubmitButtonState = computed(() => {
      const ret1 = !nonEmtyServices.value;
      const ret2 = !(nonEmptyContenuAdditionnel.value && validContenuAdditionnel.value || !nonEmptyContenuAdditionnel.value);
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
    let messageStore = null, serviceStore = null, prefs = null;
    if (platform.is.desktop) {
      messageStore = useMessageStore();
      serviceStore = useServiceStore();
      messageVisibility.value = messageStore.getMessagesVisibility;
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        const mess = await prefs.getPref("message");
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
        serviceStore.getAllServices().then((res) => {
          let obj = {};
          selectServicesOption.value = [];
          obj.label = t("ordersComponent.placeholders.services");
          obj.value = 0;
          obj.serviceId = 0;
          obj.nom = "";
          obj.montantHt = 0;
          obj.quantite = 0;
          obj.cannotSelect = true;
          selectServicesOption.value.push(obj);
          for (const k in res) {
            obj = {};
            obj.label = `${res[k].serviceId} - ${res[k].nom} - ${res[k].montantHt}`;
            obj.value = res[k].serviceId;
            obj.serviceId = res[k].serviceId;
            obj.nom = res[k].nom;
            obj.montantHt = res[k].montantHt;
            obj.quantite = res[k].quantite;
            obj.cannotSelect = false;
            selectServicesOption.value.push(obj);
          }
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("ordersComponent.results.ko.fetch_services", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
        });
      } else {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          const sql = "SELECT `service`.`serviceId`, `service`.`nom`, `service`.`montantHt`, `service`.`quantite` FROM `produitservice` AS `service`;";
          const values = await newQuery(props.dbConn, sql);
          if (values.values) {
            await setDecryptApi();
            const res = await __TRANSFORMOBJ__(values.values);
            let obj = {};
            selectServicesOption.value = [];
            obj.label = t("ordersComponent.placeholders.services");
            obj.value = 0;
            obj.serviceId = 0;
            obj.nom = "";
            obj.montantHt = 0;
            obj.quantite = 0;
            obj.cannotSelect = true;
            selectServicesOption.value.push(obj);
            for (const k in res) {
              obj = {};
              obj.label = `${res[k].serviceId} - ${res[k].nom} - ${res[k].montantHt}`;
              obj.value = res[k].serviceId;
              obj.serviceId = res[k].serviceId;
              obj.nom = res[k].nom;
              obj.montantHt = res[k].montantHt;
              obj.quantite = res[k].quantite;
              obj.cannotSelect = false;
              selectServicesOption.value.push(obj);
            }
          }
          closeDbConnection(props.dbConn);
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("ordersComponent.results.ko.fetch_services", { err: "Unable to open SQLite DB !" })
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
        orderId.value = 0;
        contenuAdditionnel.value = null;
        services.value = [];
        adminPropRef.value = true;
        displayPropRef.value = false;
        isForm.value = true;
        formState.update = false;
        formState.add = true;
        addInputObject = {
          contenuAdditionnel: displayInputObject.contenuAdditionnel,
          priceHt: displayInputObject.priceHt,
          services: displayInputObject.services,
          actions: {
            label: t("forms.headTable.action"),
            name: "actions",
            placeholders: "",
            disabled: false
          }
        };
        defaultRow.value[0] = {
          orderId: 0,
          contenuAdditionnel: null,
          services: [],
          priceHt: 0,
          actions: ""
        };
        await fetchDatasForForms();
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await insertOrderInDb();
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
          ret = await insertOrderInSQLiteDb();
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
            message: t("ordersComponent.results.ok.add")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("ordersComponent.results.ko.add")
          });
        }
      }
    }
    async function updateClickFromChild(e, db, obj = null) {
      e.preventDefault();
      if (!db) {
        await fetchDatasForForms();
        let servicesSelected = [];
        let servObj = {};
        for (const k in obj.Services) {
          servObj = {};
          servObj.value = obj.Services[k].serviceId;
          servObj.label = `${obj.Services[k].serviceId} - ${obj.Services[k].nom} - ${obj.Services[k].montantHt}`;
          servObj.serviceId = obj.Services[k].serviceId;
          servObj.montantHt = obj.Services[k].montantHt;
          servObj.nom = obj.Services[k].nom;
          servObj.quantite = obj.Services[k].quantite;
          servObj.cannotSelect = false;
          servicesSelected.push(servObj);
        }
        isForm.value = true;
        formState.update = true;
        formState.add = false;
        addInputObject = {
          contenuAdditionnel: displayInputObject.contenuAdditionnel,
          priceHt: displayInputObject.priceHt,
          services: displayInputObject.services,
          actions: {
            label: t("forms.headTable.action"),
            name: "actions",
            placeholders: "",
            disabled: false
          }
        };
        defaultRow.value[0] = {
          orderId: obj.orderId,
          contenuAdditionnel: obj.contenuAdditionnel,
          services: servicesSelected,
          priceHt: obj.priceHt,
          actions: ""
        };
        orderId.value = obj.orderId;
        contenuAdditionnel.value = obj.contenuAdditionnel;
        services.value = servicesSelected;
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await updateOrderInDb();
          if (ret) {
            isForm.value = false;
            formState.update = false;
            formState.add = true;
          }
          forceTableRerender();
        } else {
          ret = await updateOrderInSQLiteDb();
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
            message: t("ordersComponent.results.ok.update")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("ordersComponent.results.ko.update")
          });
        }
      }
    }
    async function deleteClickFromChild(e, id) {
      e.preventDefault();
      orderId.value = id;
      let ret;
      if (platform.is.desktop) {
        ret = deleteOrderFromDb();
        if (ret) {
          isForm.value = false;
          formState.update = false;
          formState.add = true;
        }
        forceTableRerender();
      } else {
        ret = await deleteOrderFromSQLiteDb();
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
          message: t("ordersComponent.results.ok.delete")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("ordersComponent.results.ko.delete")
        });
      }
    }
    async function insertOrderInDb() {
      const obj = {
        contenuAdditionnel: contenuAdditionnel.value,
        services: services.value,
        priceHt: priceHt.value
      };
      await transformObject(obj);
      return orderAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("ordersComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("ordersComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function insertOrderInSQLiteDb() {
      const obj = {
        contenuAdditionnel: contenuAdditionnel.value,
        priceHt: priceHt.value,
        services: services.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let sql = "INSERT INTO `commande` (`contenuAdditionnel`, `priceHt`) VALUES (?, ?);";
        let values = await newRun(props.dbConn, sql, [obj.contenuAdditionnel, obj.priceHt]);
        let ret = false;
        if (values.changes.changes) {
          sql = "INSERT INTO `contains` (`orderId`, `serviceId`) VALUES ";
          for (const k in obj.services) {
            sql += k != obj.services.length - 1 ? `(${values.changes.lastId},${obj.services[k].serviceId}),` : `(${values.changes.lastId},${obj.services[k].serviceId});`;
          }
          values = await newRun(props.dbConn, sql);
          if (values.changes.changes) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: false,
                  content: t("ordersComponent.results.ok.add")
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
                  content: t("ordersComponent.results.ko.add", { err: "Adding services in contains table of SQLite DB !" })
                }
              ],
              messageVisibility: true
            });
          }
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("ordersComponent.results.ko.add", { err: "Adding order in SQLite DB !" })
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
            content: t("ordersComponent.results.ko.add", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function updateOrderInDb() {
      const obj = {
        contenuAdditionnel: contenuAdditionnel.value,
        priceHt: parseFloat(priceHt.value),
        services: services.value
      };
      await transformObject(obj);
      return orderAxiosService.update(orderId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("ordersComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("ordersComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function updateOrderInSQLiteDb() {
      const obj = {
        contenuAdditionnel: contenuAdditionnel.value,
        priceHt: parseFloat(priceHt.value),
        services: services.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        let sql = "UPDATE `commande` SET `contenuAdditionnel`=?, `priceHt`=? WHERE `orderId` = ?;";
        const values = await newRun(props.dbConn, sql, [obj.contenuAdditionnel, obj.priceHt, orderId.value]);
        if (values.changes.changes) {
          sql = `SELECT \`contains\`.\`orderId\`, \`contains\`.\`serviceId\` FROM \`contains\` WHERE \`contains\`.\`orderId\`= '${orderId.value}';`;
          const val = await newQuery(props.dbConn, sql);
          if (val != {}) {
            sql = `DELETE FROM \`contains\` WHERE \`orderId\`= '${orderId.value}';`;
            const values3 = await newRun(props.dbConn, sql);
            if (!values3.changes.changes) {
              await prefs.setPref("message", {
                messages: [
                  {
                    severity: true,
                    content: t("ordersComponent.results.ko.update", { err: "Deleting services from contains table of SQLite DB !" })
                  }
                ],
                messageVisibility: true
              });
            }
          }
          sql = "INSERT INTO `contains` (`orderId`, `serviceId`) VALUES ";
          for (const k in obj.services) {
            sql += k != obj.services.length - 1 ? `(${orderId.value},${obj.services[k].serviceId}),` : `(${orderId.value},${obj.services[k].serviceId});`;
          }
          const values2 = await newRun(props.dbConn, sql);
          if (values2.changes.changes) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: false,
                  content: t("ordersComponent.results.ok.update")
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
                  content: t("ordersComponent.results.ko.update", { err: "Adding services to contains table of SQLite DB !" })
                }
              ],
              messageVisibility: true
            });
          }
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("ordersComponent.results.ko.update", { err: "Updating order to SQLite DB !" })
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
            content: t("ordersComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function deleteOrderFromDb() {
      return orderAxiosService.delete(orderId.value).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("ordersComponent.results.ok.delete")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: false,
          content: t("ordersComponent.results.ko.delete", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function deleteOrderFromSQLiteDb() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        const sql = `DELETE FROM \`commande\` WHERE \`orderId\`= '${orderId.value}';`;
        const values = await newRun(props.dbConn, sql);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("ordersComponent.results.ok.delete")
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
                content: t("ordersComponent.results.ko.delete", { err: "Deleting order from SQLite DB !" })
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
            content: t("ordersComponent.results.ko.delete", { err: "Unable to open SQLite DB !" })
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
      () => [props.admin, props.display, props.orderForm],
      ([newAdminProp, newDisplayProp, newOrderForm]) => {
        adminPropRef.value = newAdminProp;
        displayPropRef.value = newDisplayProp;
        isForm.value = newOrderForm;
        forceTableRerender();
      }
    );
    provide("src", "orders");
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
            tableTitle: unref(t)("ordersComponent.tableTitle"),
            isForm: isForm.value,
            addForm: "orderForm",
            tableObj: adminPropRef.value ? unref(addInputObject) : displayInputObject,
            addDefaultRow: defaultRow.value,
            addActionName: "addClick",
            onAddClick: addClickFromChild,
            updateActionName: "updateClick",
            onUpdateClick: updateClickFromChild,
            deleteActionName: "deleteClick",
            onDeleteClick: deleteClickFromChild,
            ident: "orderId",
            updating: formState.update,
            adding: formState.add,
            admin: __props.admin,
            display: __props.display,
            no_data_label: unref(t)("ordersComponent.errors.empty.tableBodyContentText"),
            no_data_button_text: unref(t)("ordersComponent.errors.empty.buttonAdding"),
            dbConn: __props.dbConn
          }, {
            orderForm: withCtx(() => [
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
                    modelValue: contenuAdditionnel.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => contenuAdditionnel.value = $event),
                    type: "textarea",
                    name: unref(addInputObject).contenuAdditionnel.name,
                    label: unref(addInputObject).contenuAdditionnel.label,
                    hint: unref(t)("ordersComponent.hints.contenuAdditionnel"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 30,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("ordersComponent.placeholders.contenuAdditionnel"),
                    rules: [
                      (val) => unref(validContenuAdditionnel) || unref(t)("ordersComponent.errors.empty.contenuAdditionnel")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "toc" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "hint", "dense", "placeholders", "rules"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: unref(priceHt),
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(priceHt) ? priceHt.value = $event : null),
                    type: "number",
                    name: unref(addInputObject).priceHt.name,
                    label: unref(addInputObject).priceHt.label,
                    readonly: true,
                    disable: true,
                    hint: unref(t)("ordersComponent.hints.priceHt"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("ordersComponent.placeholders.priceHt")
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "payments" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "hint", "dense", "placeholders"])
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
                    modelValue: services.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => services.value = $event),
                    name: unref(addInputObject).services.name,
                    label: unref(addInputObject).services.label,
                    "option-disable": "cannotSelect",
                    options: selectServicesOption.value,
                    hint: unref(t)("ordersComponent.hints.services"),
                    "hide-hint": true,
                    dense: unref(compact)
                  }, createSlots({
                    "no-option": withCtx(() => [
                      createVNode(QItemSection, { class: "text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("ordersComponent.libelles.no_option_services")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "home_repair_service" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "options", "hint", "dense"])
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
                    label: unref(t)("ordersComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[3] || (_cache[3] = ($event) => addClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true),
                  formState.update ? (openBlock(), createBlock(QBtn, {
                    key: 1,
                    color: "secondary",
                    icon: "update",
                    label: unref(t)("ordersComponent.errors.empty.buttonUpdating"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[4] || (_cache[4] = ($event) => updateClickFromChild($event, true))
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
var OrderComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "OrderComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrderPage",
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
    const orderForm = ref(false);
    if (route.params.type != "") {
      adminProp.value = route.params.type === "admin" ? true : false;
      displayProp.value = route.params.type === "display" ? true : false;
    }
    watch(
      route,
      async (newR) => {
        adminProp.value = newR.params.type === "admin" ? true : false;
        displayProp.value = newR.params.type === "display" ? true : false;
        orderForm.value = false;
        forceOrderRerender();
      }
    );
    async function forceOrderRerender() {
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
          renderComponent.value ? (openBlock(), createBlock(OrderComponent, {
            key: 0,
            orderForm: orderForm.value,
            admin: adminProp.value,
            display: displayProp.value,
            dbConn: __props.dbConn
          }, null, 8, ["orderForm", "admin", "display", "dbConn"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
var OrderPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "OrderPage.vue"]]);
export { OrderPage as default };
//# sourceMappingURL=data:application/json;base64,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QUFDSTtNQUNyQjtBQUFBO0FBTUYsWUFBUSxPQUFPLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMTJCdkIsVUFBTSxRQUFRO0FBT1Isc0JBQVksSUFBSSxNQUFNLEtBQUs7QUFDM0Isd0JBQWMsSUFBSSxNQUFNLE9BQU87QUFDL0IsNEJBQWtCLElBQUksSUFBSTtBQUMxQixzQkFBWSxJQUFJLEtBQUs7QUFHdkIsY0FBTSxPQUFPLFFBQVEsSUFBSTtBQUUzQixnQkFBVSxRQUFRLE1BQU0sT0FBTyxTQUFTLFVBQVUsT0FBTztBQUN6RCxrQkFBWSxRQUFRLE1BQU0sT0FBTyxTQUFTLFlBQVksT0FBTztBQUFBLElBQy9EO0FBSUE7QUFBQSxNQUNFO0FBQUEsTUFDQSxPQUFPLFNBQVM7QUFDZCxrQkFBVSxRQUFRLEtBQUssT0FBTyxTQUFTLFVBQVUsT0FBTztBQUN4RCxvQkFBWSxRQUFRLEtBQUssT0FBTyxTQUFTLFlBQVksT0FBTTtBQUMzRCxrQkFBVSxRQUFRO0FBQ0M7TUFDckI7QUFBQTtBQUlGLG1CQUFlLHFCQUFxQjtBQUNsQyxzQkFBZ0IsUUFBUTtBQUNmO0FBQ1Qsc0JBQWdCLFFBQVE7QUFBQSxJQUMxQjtBQUdBLGNBQVUsTUFBTTtBQUNkLFdBQUssY0FBYyxNQUFTO0FBQUEsS0FDN0IiLCJuYW1lcyI6WyJrZXkiLCJ2YWx1ZXMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9PcmRlckNvbXBvbmVudC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvT3JkZXJQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLW5vLXNzcj5cbiAgICA8TWVzc2FnZXNJdGVtIHYtaWY9J21lc3NhZ2VWaXNpYmlsaXR5ICYmIHJlbmRlckNvbXBvbmVudCcgLz5cbiAgPC9xLW5vLXNzcj5cbiAgPGRpdiBzdHlsZT0nd2lkdGg6IDEwMCUnPlxuICAgIDx0YWJsZS1pdGVtXG4gICAgICA6dGFibGVUaXRsZT0ndChcIm9yZGVyc0NvbXBvbmVudC50YWJsZVRpdGxlXCIpJ1xuICAgICAgOmlzRm9ybT0naXNGb3JtJ1xuICAgICAgYWRkRm9ybT0nb3JkZXJGb3JtJ1xuICAgICAgOnRhYmxlT2JqPSdhZG1pblByb3BSZWYgPyBhZGRJbnB1dE9iamVjdCA6IGRpc3BsYXlJbnB1dE9iamVjdCdcbiAgICAgIDphZGREZWZhdWx0Um93PSdkZWZhdWx0Um93J1xuICAgICAgYWRkQWN0aW9uTmFtZT0nYWRkQ2xpY2snXG4gICAgICBAYWRkQ2xpY2s9J2FkZENsaWNrRnJvbUNoaWxkJ1xuICAgICAgdXBkYXRlQWN0aW9uTmFtZT0ndXBkYXRlQ2xpY2snXG4gICAgICBAdXBkYXRlQ2xpY2s9J3VwZGF0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgZGVsZXRlQWN0aW9uTmFtZT0nZGVsZXRlQ2xpY2snXG4gICAgICBAZGVsZXRlQ2xpY2s9J2RlbGV0ZUNsaWNrRnJvbUNoaWxkJ1xuICAgICAgaWRlbnQ9J29yZGVySWQnXG4gICAgICA6dXBkYXRpbmc9J2Zvcm1TdGF0ZS51cGRhdGUnXG4gICAgICA6YWRkaW5nPSdmb3JtU3RhdGUuYWRkJ1xuICAgICAgdi1pZj0ncmVuZGVyQ29tcG9uZW50J1xuICAgICAgOmFkbWluPSdhZG1pbidcbiAgICAgIDpkaXNwbGF5PSdkaXNwbGF5J1xuICAgICAgOm5vX2RhdGFfbGFiZWw9J3QoXCJvcmRlcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LnRhYmxlQm9keUNvbnRlbnRUZXh0XCIpJ1xuICAgICAgOm5vX2RhdGFfYnV0dG9uX3RleHQ9J3QoXCJvcmRlcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZ1wiKSdcbiAgICAgIDpkYkNvbm49J2RiQ29ubic+XG4gICAgICAgIDx0ZW1wbGF0ZSAjb3JkZXJGb3JtPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXI7Jz5cbiAgICAgICAgICAgIDxxLWljb24gOm5hbWU9J2Zvcm1TdGF0ZS5hZGQgPyBcImFkZFwiIDogXCJ1cGRhdGVcIicgc2l6ZT0nc20nPjwvcS1pY29uPlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9J2NvbnRlbnVBZGRpdGlvbm5lbCdcbiAgICAgICAgICAgICAgdHlwZT0ndGV4dGFyZWEnXG4gICAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5jb250ZW51QWRkaXRpb25uZWwubmFtZSdcbiAgICAgICAgICAgICAgOmxhYmVsPSdhZGRJbnB1dE9iamVjdC5jb250ZW51QWRkaXRpb25uZWwubGFiZWwnXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwib3JkZXJzQ29tcG9uZW50LmhpbnRzLmNvbnRlbnVBZGRpdGlvbm5lbFwiKSdcbiAgICAgICAgICAgICAgOmhpZGUtaGludD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6YXV0b2dyb3c9J2ZhbHNlJ1xuICAgICAgICAgICAgICA6bWF4bGVuZ3RoPSczMCdcbiAgICAgICAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmNvbnRlbnVBZGRpdGlvbm5lbFwiKSdcbiAgICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgICAgdmFsID0+IHZhbGlkQ29udGVudUFkZGl0aW9ubmVsIHx8IHQoXCJvcmRlcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmNvbnRlbnVBZGRpdGlvbm5lbFwiKVxuICAgICAgICAgICAgICBdJ1xuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0ndG9jJyAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXInPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD0ncHJpY2VIdCdcbiAgICAgICAgICAgICAgdHlwZT0nbnVtYmVyJ1xuICAgICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QucHJpY2VIdC5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnByaWNlSHQubGFiZWwnXG4gICAgICAgICAgICAgIDpyZWFkb25seT0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRpc2FibGU9J3RydWUnXG4gICAgICAgICAgICAgIDpoaW50PSd0KFwib3JkZXJzQ29tcG9uZW50LmhpbnRzLnByaWNlSHRcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgICAgOmF1dG9ncm93PSdmYWxzZSdcbiAgICAgICAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnByaWNlSHRcIiknXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdwYXltZW50cycgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICBmaWxsZWRcbiAgICAgICAgICAgICAgOnVzZS1pbnB1dD0ndHJ1ZSdcbiAgICAgICAgICAgICAgOnVzZS1jaGlwcz0ndHJ1ZSdcbiAgICAgICAgICAgICAgOm11bHRpcGxlPSd0cnVlJ1xuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT0nMCdcbiAgICAgICAgICAgICAgdi1tb2RlbD0nc2VydmljZXMnXG4gICAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5zZXJ2aWNlcy5uYW1lJ1xuICAgICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnNlcnZpY2VzLmxhYmVsJ1xuICAgICAgICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPSdzZWxlY3RTZXJ2aWNlc09wdGlvbidcbiAgICAgICAgICAgICAgOmhpbnQ9J3QoXCJvcmRlcnNDb21wb25lbnQuaGludHMuc2VydmljZXNcIiknXG4gICAgICAgICAgICAgIDpoaWRlLWhpbnQ9J3RydWUnXG4gICAgICAgICAgICAgIDpkZW5zZT0nY29tcGFjdCdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J2hvbWVfcmVwYWlyX3NlcnZpY2UnIC8+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz0ndGV4dC1ncmV5Jz5cbiAgICAgICAgICAgICAgICAgICAge3sgdCgnb3JkZXJzQ29tcG9uZW50LmxpYmVsbGVzLm5vX29wdGlvbl9zZXJ2aWNlcycpIH19XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Etc2VsZWN0PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOycgY2xhc3M9XCJmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPHEtYnRuIHYtaWY9XCJmb3JtU3RhdGUuYWRkXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgXG4gICAgICAgICAgICAgIGljb249XCJhZGRfY2lyY2xlXCIgXG4gICAgICAgICAgICAgIDpsYWJlbD1cInQoJ29yZGVyc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuYnV0dG9uQWRkaW5nJylcIiBcbiAgICAgICAgICAgICAgZ2xvc3N5IHVuZWxldmF0ZWRcbiAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiYWRkQ2xpY2tGcm9tQ2hpbGQoJGV2ZW50LCB0cnVlKVwiPiAgXG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHYtaWY9XCJmb3JtU3RhdGUudXBkYXRlXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIiBcbiAgICAgICAgICAgICAgaWNvbj1cInVwZGF0ZVwiIFxuICAgICAgICAgICAgICA6bGFiZWw9XCJ0KCdvcmRlcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvblVwZGF0aW5nJylcIiBcbiAgICAgICAgICAgICAgZ2xvc3N5IHVuZWxldmF0ZWRcbiAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlQ2xpY2tGcm9tQ2hpbGQoJGV2ZW50LCB0cnVlKVwiPiAgXG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvdGFibGUtaXRlbT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgbmV4dFRpY2ssIHJlZiwgcHJvdmlkZSwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnO1xuLy8gaW1wb3J0IHsgdXNlT3JkZXJTdG9yZSB9IGZyb20gJ3N0b3Jlcy9vcmRlcic7XG5pbXBvcnQgeyB1c2VNZXNzYWdlU3RvcmUgfSBmcm9tICdzdG9yZXMvbWVzc2FnZSc7XG5pbXBvcnQgeyB1c2VTZXJ2aWNlU3RvcmUgfSBmcm9tICdzdG9yZXMvc2VydmljZSc7XG4vLyBpbXBvcnQgeyB1c2VJbnZvaWNlU3RvcmUgfSBmcm9tICdzdG9yZXMvaW52b2ljZSc7XG5pbXBvcnQgVGFibGVJdGVtIGZyb20gJy4vVGFibGVJdGVtLnZ1ZSc7XG5pbXBvcnQgTWVzc2FnZXNJdGVtIGZyb20gJy4vTWVzc2FnZXNJdGVtLnZ1ZSc7XG5pbXBvcnQgb3JkZXJBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnB1dE9iamVjdENvbGxlY3Rpb24sIEZvcm1TdGF0ZSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICd2dWUtaTE4bic7XG4vLyBpbXBvcnQgeyBDYXBhY2l0b3IgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJztcbi8vIGltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IHsgb3BlbkRiQ29ubmVjdGlvbiwgaXNEYkNvbm5lY3Rpb25PcGVuLCBuZXdSdW4sIG5ld1F1ZXJ5LCBjbG9zZURiQ29ubmVjdGlvbiB9IGZyb20gJ2NhcC9zdG9yYWdlJztcbmltcG9ydCB7IHNldENyeXB0QXBpLCBzZXREZWNyeXB0QXBpLCBfX0ZPUk1BVE9CSl9fLCBfX1RSQU5TRk9STU9CSl9fIH0gZnJvbSAnc3JjL2dsb2JhbHMnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcblxuLy8gVkFSSUFCTEVTXG5pbnRlcmZhY2UgT3JkZXJQcm9wcyB7XG4gIG9yZGVyRm9ybT86IGJvb2xlYW47XG4gIGFkbWluOiBib29sZWFuO1xuICBkaXNwbGF5OiBib29sZWFuO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsO1xufTtcbmludGVyZmFjZSBEZWZhdWx0T3JkZXJSb3cge1xuICBvcmRlcklkOiBudW1iZXI7XG4gIGNvbnRlbnVBZGRpdGlvbm5lbDogc3RyaW5nO1xuICBzZXJ2aWNlczogc3RyaW5nW107XG4gIHByaWNlSHQ6IG51bWJlcjtcbiAgZmFjdHVyZTogc3RyaW5nO1xuICBhY3Rpb25zOiBzdHJpbmc7XG59O1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8T3JkZXJQcm9wcz4oKSwge1xuICBvcmRlckZvcm06IGZhbHNlLFxuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgYXBwID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5jb25zdCBrZXkgPSBhcHAuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4ka2V5O1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbi8vIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHsgdCB9ID0gdXNlSTE4bih7IHVzZVNjb3BlOiAnZ2xvYmFsJyB9KTtcbmNvbnN0IGRpc3BsYXlJbnB1dE9iamVjdDogSW5wdXRPYmplY3RDb2xsZWN0aW9uID0ge1xuICBjb250ZW51QWRkaXRpb25uZWw6IHtcbiAgICBsYWJlbDogdCgnb3JkZXJzQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbnRlbnVBZGRpdGlvbm5lbCcpLFxuICAgIGhlYWQ6IHQoJ29yZGVyc0NvbXBvbmVudC5oZWFkVGFibGUuY29udGVudUFkZGl0aW9ubmVsJyksXG4gICAgbmFtZTogJ2NvbnRlbnVBZGRpdGlvbm5lbCcsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ29yZGVyc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuY29udGVudUFkZGl0aW9ubmVsJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBwcmljZUh0OiB7XG4gICAgbGFiZWw6IHQoJ29yZGVyc0NvbXBvbmVudC5pbnB1dExhYmVscy5wcmljZUh0JyksXG4gICAgaGVhZDogdCgnb3JkZXJzQ29tcG9uZW50LmhlYWRUYWJsZS5wcmljZUh0JyksXG4gICAgbmFtZTogJ3ByaWNlSHQnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnByaWNlSHQnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIHNlcnZpY2VzOiB7XG4gICAgbGFiZWw6IHQoJ29yZGVyc0NvbXBvbmVudC5pbnB1dExhYmVscy5zZXJ2aWNlcycpLFxuICAgIGhlYWQ6IHQoJ29yZGVyc0NvbXBvbmVudC5oZWFkVGFibGUuc2VydmljZXMnKSxcbiAgICBuYW1lOiAnc2VydmljZXMnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnNlcnZpY2VzJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBmYWN0dXJlOiB7XG4gICAgbGFiZWw6IHQoJ29yZGVyc0NvbXBvbmVudC5pbnB1dExhYmVscy5mYWN0dXJlJyksXG4gICAgaGVhZDogdCgnb3JkZXJzQ29tcG9uZW50LmhlYWRUYWJsZS5mYWN0dXJlJyksXG4gICAgbmFtZTogJ2ZhY3R1cmUnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmZhY3R1cmUnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG59O1xubGV0IGFkZElucHV0T2JqZWN0OiBJbnB1dE9iamVjdENvbGxlY3Rpb24gPSB7XG4gIGNvbnRlbnVBZGRpdGlvbm5lbDogZGlzcGxheUlucHV0T2JqZWN0LmNvbnRlbnVBZGRpdGlvbm5lbCxcbiAgcHJpY2VIdDogZGlzcGxheUlucHV0T2JqZWN0LnByaWNlSHQsXG4gIHNlcnZpY2VzOiBkaXNwbGF5SW5wdXRPYmplY3Quc2VydmljZXMsXG4gIGZhY3R1cmU6IGRpc3BsYXlJbnB1dE9iamVjdC5mYWN0dXJlLFxuICBhY3Rpb25zOiB7XG4gICAgbGFiZWw6IHQoJ2Zvcm1zLmhlYWRUYWJsZS5hY3Rpb24nKSxcbiAgICBuYW1lOiAnYWN0aW9ucycsXG4gICAgaGVhZDogdCgnZm9ybXMuaGVhZFRhYmxlLmFjdGlvbicpLFxuICAgIHBsYWNlaG9sZGVyczogJycsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxufTtcbmNvbnN0IGFkbWluUHJvcFJlZiA9IHJlZihwcm9wcy5hZG1pbik7XG5jb25zdCBkaXNwbGF5UHJvcFJlZiA9IHJlZihwcm9wcy5kaXNwbGF5KTtcbmNvbnN0IGlzRm9ybSA9IHJlZihwcm9wcy5vcmRlckZvcm0pO1xuY29uc3QgbWVzc2FnZVZpc2liaWxpdHkgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3JkZXJJZCA9IHJlZigwKTtcbmNvbnN0IGNvbnRlbnVBZGRpdGlvbm5lbCA9IHJlZihudWxsKTtcbmNvbnN0IHNlbGVjdFNlcnZpY2VzT3B0aW9uID0gcmVmKFtdKTtcbmNvbnN0IHNlcnZpY2VzID0gcmVmKFtdKTtcbmNvbnN0IHByaWNlSHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSAwO1xuICBmb3IgKGNvbnN0IGtleSBpbiAgc2VydmljZXMudmFsdWUpIHtcbiAgICByZXQgKz0gc2VydmljZXMudmFsdWVba2V5XS5tb250YW50SHQgKiBzZXJ2aWNlcy52YWx1ZVtrZXldLnF1YW50aXRlO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbi8vIGNvbnN0IGZhY3R1cmUgPSByZWYoJycpO1xuY29uc3QgZm9ybVN0YXRlOiBSZWY8Rm9ybVN0YXRlPiA9ICh7XG4gIHVwZGF0ZTogZmFsc2UsXG4gIGFkZDogdHJ1ZSxcbn0pO1xuY29uc3QgZGVmYXVsdFJvdzogUmVmPERlZmF1bHRPcmRlclJvd1tdPiA9IHJlZihbXSk7XG5jb25zdCB2YWxpZENvbnRlbnVBZGRpdGlvbm5lbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXigoW1xcd8Ogw6XDosOkw6nDqMOrw6rDp8Osw67Dr8WTw7bDssO0w7nDu8O8MC05XSkoWy1cXHNdKSopezIsMzB9JC9pO1xuICByZXR1cm4gcmUudGVzdChjb250ZW51QWRkaXRpb25uZWwudmFsdWUpO1xufSk7XG5jb25zdCBub25FbXB0eUNvbnRlbnVBZGRpdGlvbm5lbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhY29udGVudUFkZGl0aW9ubmVsLnZhbHVlICYmIGNvbnRlbnVBZGRpdGlvbm5lbC52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3Qgbm9uRW10eVNlcnZpY2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFzZXJ2aWNlcy52YWx1ZSAmJiBzZXJ2aWNlcy52YWx1ZS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG59KTtcbmNvbnN0IGZvcm1TdWJtaXRCdXR0b25TdGF0ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0MSA9ICEobm9uRW10eVNlcnZpY2VzLnZhbHVlKTtcbiAgY29uc3QgcmV0MiA9ICEoKG5vbkVtcHR5Q29udGVudUFkZGl0aW9ubmVsLnZhbHVlICYmdmFsaWRDb250ZW51QWRkaXRpb25uZWwudmFsdWUpIHx8ICFub25FbXB0eUNvbnRlbnVBZGRpdGlvbm5lbC52YWx1ZSk7XG4gIC8vIGNvbnNvbGUubG9nKHJldDEpO1xuICAvLyBjb25zb2xlLmxvZyhyZXQyKTtcbiAgcmV0dXJuIHJldDEgfHwgcmV0Mjtcbn0pO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmICghIW9yaWVudGF0aW9uLnZhbHVlKXtcbiAgICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5sZXQgbWVzc2FnZVN0b3JlID0gbnVsbCwgXG4gIC8vIG9yZGVyU3RvcmUgPSBudWxsLCBcbiAgc2VydmljZVN0b3JlID0gbnVsbCwgXG4gIHByZWZzID0gbnVsbDtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgc2VydmljZVN0b3JlID0gdXNlU2VydmljZVN0b3JlKCk7XG4gIC8vIGludm9pY2VTdG9yZSA9IHVzZUludm9pY2VTdG9yZSgpO1xuICAvLyBvcmRlclN0b3JlID0gdXNlT3JkZXJTdG9yZSgpO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IG1lc3NhZ2VTdG9yZS5nZXRNZXNzYWdlc1Zpc2liaWxpdHk7XG59IGVsc2Uge1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgaGFuZGxlT3JpZW50YXRpb24pO1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIHByZWZzID0gYXdhaXQgaW1wb3J0KCdjYXAvc3RvcmFnZS9wcmVmZXJlbmNlcycpO1xuICAgIGNvbnN0IG1lc3MgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdtZXNzYWdlJyk7XG4gICAgLy8gY29uc29sZS5sb2cobWVzcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzIDogW107XG4gICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgIGNvbnN0IHZpcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXNWaXNpYmlsaXR5IDogbWVzcztcbiAgICAvLyBjb25zb2xlLmxvZyh2aXMpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggJiYgdmlzID09PSBudWxsKSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdmlzICE9PSBudWxsID8gdmlzIDogZmFsc2U7XG4gICAgfVxuICB9KSgpO1xufVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlVGFibGVSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG4gIGF3YWl0IG5leHRUaWNrKCk7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KG9iajogYW55KSB7XG4gIC8vIGlmIChfX0tFWV9fID09PSBudWxsKSB7XG4gIC8vICAgYXdhaXQgc2V0R2VuQXBpKCk7XG4gIC8vIH1cbiAgYXdhaXQgc2V0Q3J5cHRBcGkoKTtcbiAgX19GT1JNQVRPQkpfXyhvYmosIGtleSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhc0ZvckZvcm1zKCkge1xuICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgIHNlcnZpY2VTdG9yZS5nZXRBbGxTZXJ2aWNlcygpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgc2VsZWN0U2VydmljZXNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgICAgb2JqLmxhYmVsID0gdCgnb3JkZXJzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5zZXJ2aWNlcycpO1xuICAgICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgICBvYmouc2VydmljZUlkID0gMDtcbiAgICAgICAgb2JqLm5vbSA9ICcnO1xuICAgICAgICBvYmoubW9udGFudEh0ID0gMDtcbiAgICAgICAgb2JqLnF1YW50aXRlID0gMDtcbiAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICAgIHNlbGVjdFNlcnZpY2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai5sYWJlbCA9IGAke3Jlc1trXS5zZXJ2aWNlSWR9IC0gJHtyZXNba10ubm9tfSAtICR7cmVzW2tdLm1vbnRhbnRIdH1gO1xuICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS5zZXJ2aWNlSWQ7XG4gICAgICAgICAgb2JqLnNlcnZpY2VJZCA9IHJlc1trXS5zZXJ2aWNlSWQ7XG4gICAgICAgICAgb2JqLm5vbSA9IHJlc1trXS5ub207XG4gICAgICAgICAgb2JqLm1vbnRhbnRIdCA9IHJlc1trXS5tb250YW50SHQ7XG4gICAgICAgICAgb2JqLnF1YW50aXRlID0gcmVzW2tdLnF1YW50aXRlO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBzZWxlY3RTZXJ2aWNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgY29udGVudDogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfc2VydmljZXMnLCB7IGVycjogZXJyIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gICAgaXNPcGVuID0gIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgICAvLyBsZXQgaXNPcGVuID0gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIGNvbnN0IHNxbCA9ICdTRUxFQ1QgYHNlcnZpY2VgLmBzZXJ2aWNlSWRgLCBgc2VydmljZWAuYG5vbWAsIGBzZXJ2aWNlYC5gbW9udGFudEh0YCwgYHNlcnZpY2VgLmBxdWFudGl0ZWAgRlJPTSBgcHJvZHVpdHNlcnZpY2VgIEFTIGBzZXJ2aWNlYDsnO1xuICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICAgIGlmICh2YWx1ZXMudmFsdWVzKSB7XG4gICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyh2YWx1ZXMudmFsdWVzKTtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICBzZWxlY3RTZXJ2aWNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgICBvYmoubGFiZWwgPSB0KCdvcmRlcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnNlcnZpY2VzJyk7XG4gICAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICAgIG9iai5zZXJ2aWNlSWQgPSAwO1xuICAgICAgICBvYmoubm9tID0gJyc7XG4gICAgICAgIG9iai5tb250YW50SHQgPSAwO1xuICAgICAgICBvYmoucXVhbnRpdGUgPSAwO1xuICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0U2VydmljZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gcmVzKSB7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLmxhYmVsID0gYCR7cmVzW2tdLnNlcnZpY2VJZH0gLSAke3Jlc1trXS5ub219IC0gJHtyZXNba10ubW9udGFudEh0fWA7XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLnNlcnZpY2VJZDtcbiAgICAgICAgICBvYmouc2VydmljZUlkID0gcmVzW2tdLnNlcnZpY2VJZDtcbiAgICAgICAgICBvYmoubm9tID0gcmVzW2tdLm5vbTtcbiAgICAgICAgICBvYmoubW9udGFudEh0ID0gcmVzW2tdLm1vbnRhbnRIdDtcbiAgICAgICAgICBvYmoucXVhbnRpdGUgPSByZXNba10ucXVhbnRpdGU7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIHNlbGVjdFNlcnZpY2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3NlcnZpY2VzJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7IFxuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGFkZENsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBkYjogYm9vbGVhbikge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmICghZGIpIHtcbiAgICBvcmRlcklkLnZhbHVlID0gMDtcbiAgICBjb250ZW51QWRkaXRpb25uZWwudmFsdWUgPSBudWxsO1xuICAgIHNlcnZpY2VzLnZhbHVlID0gW107XG4gICAgLy8gcHJpY2VIdC52YWx1ZSA9IDA7XG4gICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgIGlzRm9ybS52YWx1ZSA9IHRydWU7XG4gICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIGFkZElucHV0T2JqZWN0ID0ge1xuICAgICAgY29udGVudUFkZGl0aW9ubmVsOiBkaXNwbGF5SW5wdXRPYmplY3QuY29udGVudUFkZGl0aW9ubmVsLFxuICAgICAgcHJpY2VIdDogZGlzcGxheUlucHV0T2JqZWN0LnByaWNlSHQsXG4gICAgICBzZXJ2aWNlczogZGlzcGxheUlucHV0T2JqZWN0LnNlcnZpY2VzLFxuICAgICAgYWN0aW9uczoge1xuICAgICAgICBsYWJlbDogdCgnZm9ybXMuaGVhZFRhYmxlLmFjdGlvbicpLFxuICAgICAgICBuYW1lOiAnYWN0aW9ucycsXG4gICAgICAgIHBsYWNlaG9sZGVyczogJycsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBkZWZhdWx0Um93LnZhbHVlWzBdID0ge1xuICAgICAgb3JkZXJJZDogMCxcbiAgICAgIGNvbnRlbnVBZGRpdGlvbm5lbDogbnVsbCxcbiAgICAgIHNlcnZpY2VzOiBbXSxcbiAgICAgIHByaWNlSHQ6IDAsXG4gICAgICAvLyBmYWN0dXJlOiAnJyxcbiAgICAgIGFjdGlvbnM6ICcnLFxuICAgIH07XG4gICAgYXdhaXQgZmV0Y2hEYXRhc0ZvckZvcm1zKCk7XG4gICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2FkZGluZCBvcmRlciB0byBkYiAhJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgICAgcmV0ID0gYXdhaXQgaW5zZXJ0T3JkZXJJbkRiKCk7XG4gICAgICBpZiAocmV0KSB7XG4gICAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgICAgfSBcbiAgICAgIGlmIChwcm9wcy5kaXNwbGF5KXtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0ID0gYXdhaXQgaW5zZXJ0T3JkZXJJblNRTGl0ZURiKCk7XG4gICAgICBpZiAocmV0KSB7XG4gICAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzLmRpc3BsYXkpe1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH1cbiAgICBpZiAocmV0KSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgbWVzc2FnZTogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBkYjogYm9vbGVhbiwgb2JqOiBhbnkgPSBudWxsKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgLy8gY29uc29sZS5sb2coaWQpO1xuICBpZiAoIWRiKSB7XG4gICAgYXdhaXQgZmV0Y2hEYXRhc0ZvckZvcm1zKCk7XG4gICAgbGV0IHNlcnZpY2VzU2VsZWN0ZWQgPSBbXTtcbiAgICBsZXQgc2Vydk9iaiA9IHt9OyBcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqLlNlcnZpY2VzKSB7XG4gICAgICBzZXJ2T2JqID0ge307XG4gICAgICBzZXJ2T2JqLnZhbHVlID0gb2JqLlNlcnZpY2VzW2tdLnNlcnZpY2VJZDtcbiAgICAgIHNlcnZPYmoubGFiZWwgPSBgJHtvYmouU2VydmljZXNba10uc2VydmljZUlkfSAtICR7b2JqLlNlcnZpY2VzW2tdLm5vbX0gLSAke29iai5TZXJ2aWNlc1trXS5tb250YW50SHR9YDtcbiAgICAgIHNlcnZPYmouc2VydmljZUlkID0gb2JqLlNlcnZpY2VzW2tdLnNlcnZpY2VJZDtcbiAgICAgIHNlcnZPYmoubW9udGFudEh0ID0gb2JqLlNlcnZpY2VzW2tdLm1vbnRhbnRIdDtcbiAgICAgIHNlcnZPYmoubm9tID0gb2JqLlNlcnZpY2VzW2tdLm5vbTtcbiAgICAgIHNlcnZPYmoucXVhbnRpdGUgPSBvYmouU2VydmljZXNba10ucXVhbnRpdGU7XG4gICAgICBzZXJ2T2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgc2VydmljZXNTZWxlY3RlZC5wdXNoKHNlcnZPYmopO1xuICAgIH1cbiAgICBpc0Zvcm0udmFsdWUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS51cGRhdGUgPSB0cnVlO1xuICAgIGZvcm1TdGF0ZS5hZGQgPSBmYWxzZTtcbiAgICBhZGRJbnB1dE9iamVjdCA9IHtcbiAgICAgIGNvbnRlbnVBZGRpdGlvbm5lbDogZGlzcGxheUlucHV0T2JqZWN0LmNvbnRlbnVBZGRpdGlvbm5lbCxcbiAgICAgIHByaWNlSHQ6IGRpc3BsYXlJbnB1dE9iamVjdC5wcmljZUh0LFxuICAgICAgc2VydmljZXM6IGRpc3BsYXlJbnB1dE9iamVjdC5zZXJ2aWNlcyxcbiAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgbGFiZWw6IHQoJ2Zvcm1zLmhlYWRUYWJsZS5hY3Rpb24nKSxcbiAgICAgICAgbmFtZTogJ2FjdGlvbnMnLFxuICAgICAgICBwbGFjZWhvbGRlcnM6ICcnLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIG9yZGVySWQ6IG9iai5vcmRlcklkLFxuICAgICAgY29udGVudUFkZGl0aW9ubmVsOiBvYmouY29udGVudUFkZGl0aW9ubmVsLFxuICAgICAgc2VydmljZXM6IHNlcnZpY2VzU2VsZWN0ZWQsXG4gICAgICBwcmljZUh0OiBvYmoucHJpY2VIdCxcbiAgICAgIGFjdGlvbnM6ICcnXG4gICAgfTtcbiAgICBvcmRlcklkLnZhbHVlID0gb2JqLm9yZGVySWQ7XG4gICAgY29udGVudUFkZGl0aW9ubmVsLnZhbHVlID0gb2JqLmNvbnRlbnVBZGRpdGlvbm5lbDtcbiAgICBzZXJ2aWNlcy52YWx1ZSA9IHNlcnZpY2VzU2VsZWN0ZWQ7XG4gICAgLy8gcHJpY2VIdC52YWx1ZSA9IG9iai5wcmljZUh0O1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIG9yZGVySWQudmFsdWUgPSBpZDtcbiAgICAvLyBjb25zb2xlLmxvZygndXBkYXRpbmcgb3JkZXIgdG8gZGIgIScpO1xuICAgIGxldCByZXQ7XG4gICAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICAgIHJldCA9IGF3YWl0IHVwZGF0ZU9yZGVySW5EYigpO1xuICAgICAgaWYgKHJldCl7XG4gICAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCA9IGF3YWl0IHVwZGF0ZU9yZGVySW5TUUxpdGVEYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH1cbiAgICBpZiAocmV0KSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgbWVzc2FnZTogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBpZDogbnVtYmVyKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgb3JkZXJJZC52YWx1ZSA9IGlkO1xuICAvLyBjb25zb2xlLmxvZygnZGVsZXRpbmcgb3JkZXIgZnJvbSBkYiAhJyk7XG4gIGxldCByZXQ7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgcmV0ID0gZGVsZXRlT3JkZXJGcm9tRGIoKTtcbiAgICBpZiAocmV0KSB7XG4gICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIH1cbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBhd2FpdCBkZWxldGVPcmRlckZyb21TUUxpdGVEYigpO1xuICAgIGlmIChyZXQpIHtcbiAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgfVxuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9XG4gIGlmIChyZXQpIHtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgIG1lc3NhZ2U6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLm9rLmRlbGV0ZScpXG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgbWVzc2FnZTogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28uZGVsZXRlJylcbiAgICB9KTtcbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGluc2VydE9yZGVySW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGNvbnRlbnVBZGRpdGlvbm5lbDogY29udGVudUFkZGl0aW9ubmVsLnZhbHVlLFxuICAgIHNlcnZpY2VzOiBzZXJ2aWNlcy52YWx1ZSxcbiAgICBwcmljZUh0OiBwcmljZUh0LnZhbHVlXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICByZXR1cm4gb3JkZXJBeGlvc1NlcnZpY2UuY3JlYXRlKG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiBlcnJ9KVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGluc2VydE9yZGVySW5TUUxpdGVEYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGNvbnRlbnVBZGRpdGlvbm5lbDogY29udGVudUFkZGl0aW9ubmVsLnZhbHVlLFxuICAgIHByaWNlSHQ6IHByaWNlSHQudmFsdWUsXG4gICAgc2VydmljZXM6IHNlcnZpY2VzLnZhbHVlXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICEhaXNPcGVuIHx8ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGlmIChpc09wZW4pIHtcbiAgICBsZXQgc3FsID0gJ0lOU0VSVCBJTlRPIFxcYGNvbW1hbmRlXFxgIChcXGBjb250ZW51QWRkaXRpb25uZWxcXGAsIFxcYHByaWNlSHRcXGApIFZBTFVFUyAoPywgPyk7JztcbiAgICBsZXQgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbb2JqLmNvbnRlbnVBZGRpdGlvbm5lbCwgb2JqLnByaWNlSHRdKTtcbiAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgIHNxbCA9ICdJTlNFUlQgSU5UTyBcXGBjb250YWluc1xcYCAoXFxgb3JkZXJJZFxcYCwgXFxgc2VydmljZUlkXFxgKSBWQUxVRVMgJztcbiAgICAgIGZvciAoY29uc3QgayBpbiBvYmouc2VydmljZXMpIHtcbiAgICAgICAgc3FsICs9IGsgIT0gb2JqLnNlcnZpY2VzLmxlbmd0aCAtIDEgPyBgKCR7dmFsdWVzLmNoYW5nZXMubGFzdElkfSwke29iai5zZXJ2aWNlc1trXS5zZXJ2aWNlSWR9KSxgIDogYCgke3ZhbHVlcy5jaGFuZ2VzLmxhc3RJZH0sJHtvYmouc2VydmljZXNba10uc2VydmljZUlkfSk7YDtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnLCB7IGVycjogJ0FkZGluZyBzZXJ2aWNlcyBpbiBjb250YWlucyB0YWJsZSBvZiBTUUxpdGUgREIgISd9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywgeyBlcnI6ICdBZGRpbmcgb3JkZXIgaW4gU1FMaXRlIERCICEnfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgIScgfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVPcmRlckluRGIoKSB7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBjb250ZW51QWRkaXRpb25uZWw6IGNvbnRlbnVBZGRpdGlvbm5lbC52YWx1ZSxcbiAgICBwcmljZUh0OiBwYXJzZUZsb2F0KHByaWNlSHQudmFsdWUpLFxuICAgIHNlcnZpY2VzOiBzZXJ2aWNlcy52YWx1ZVxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgcmV0dXJuIG9yZGVyQXhpb3NTZXJ2aWNlLnVwZGF0ZShvcmRlcklkLnZhbHVlLCBvYmopXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogZXJyIH0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlT3JkZXJJblNRTGl0ZURiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgY29udGVudUFkZGl0aW9ubmVsOiBjb250ZW51QWRkaXRpb25uZWwudmFsdWUsXG4gICAgcHJpY2VIdDogcGFyc2VGbG9hdChwcmljZUh0LnZhbHVlKSxcbiAgICBzZXJ2aWNlczogc2VydmljZXMudmFsdWVcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gISFpc09wZW4gfHwgIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICBsZXQgc3FsID0gJ1VQREFURSBcXGBjb21tYW5kZVxcYCBTRVQgXFxgY29udGVudUFkZGl0aW9ubmVsXFxgPT8sIFxcYHByaWNlSHRcXGA9PyBXSEVSRSBcXGBvcmRlcklkXFxgID0gPzsnO1xuICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbb2JqLmNvbnRlbnVBZGRpdGlvbm5lbCwgb2JqLnByaWNlSHQsIG9yZGVySWQudmFsdWVdKTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcykge1xuICAgICAgc3FsID0gYFNFTEVDVCBcXGBjb250YWluc1xcYC5cXGBvcmRlcklkXFxgLCBcXGBjb250YWluc1xcYC5cXGBzZXJ2aWNlSWRcXGAgRlJPTSBcXGBjb250YWluc1xcYCBXSEVSRSBcXGBjb250YWluc1xcYC5cXGBvcmRlcklkXFxgPSAnJHtvcmRlcklkLnZhbHVlfSc7YDtcbiAgICAgIGNvbnN0IHZhbCA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWxlY3QgcXVlcnkgIScpO1xuICAgICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWxlY3QgdmFsdWVzICEnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbCk7XG4gICAgICBpZiAodmFsICE9IHt9KSB7XG4gICAgICAgIHNxbCA9IGBERUxFVEUgRlJPTSBcXGBjb250YWluc1xcYCBXSEVSRSBcXGBvcmRlcklkXFxgPSAnJHtvcmRlcklkLnZhbHVlfSc7YDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgICAgaWYgKCF2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogdCgnb3JkZXJzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywgeyBlcnI6ICdEZWxldGluZyBzZXJ2aWNlcyBmcm9tIGNvbnRhaW5zIHRhYmxlIG9mIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgICBzcWwgPSAnSU5TRVJUIElOVE8gXFxgY29udGFpbnNcXGAgKFxcYG9yZGVySWRcXGAsIFxcYHNlcnZpY2VJZFxcYCkgVkFMVUVTICc7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqLnNlcnZpY2VzKSB7XG4gICAgICAgIHNxbCArPSBrICE9IG9iai5zZXJ2aWNlcy5sZW5ndGggLSAxID8gYCgke29yZGVySWQudmFsdWV9LCR7b2JqLnNlcnZpY2VzW2tdLnNlcnZpY2VJZH0pLGAgOiBgKCR7b3JkZXJJZC52YWx1ZX0sJHtvYmouc2VydmljZXNba10uc2VydmljZUlkfSk7YDtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ0FkZGluZyBzZXJ2aWNlcyB0byBjb250YWlucyB0YWJsZSBvZiBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHsgZXJyOiAnVXBkYXRpbmcgb3JkZXIgdG8gU1FMaXRlIERCICEnIH0pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlQ29ubmVjdGlvbicpO1xuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgIG1lc3NhZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBkZWxldGVPcmRlckZyb21EYigpIHtcbiAgcmV0dXJuIG9yZGVyQXhpb3NTZXJ2aWNlLmRlbGV0ZShvcmRlcklkLnZhbHVlKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gZGVsZXRlT3JkZXJGcm9tU1FMaXRlRGIoKSB7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gIWlzT3BlbiB8fCAhIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICBjb25zdCBzcWwgPSBgREVMRVRFIEZST00gXFxgY29tbWFuZGVcXGAgV0hFUkUgXFxgb3JkZXJJZFxcYD0gJyR7b3JkZXJJZC52YWx1ZX0nO2A7XG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcykge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdvcmRlcnNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6ICdEZWxldGluZyBvcmRlciBmcm9tIFNRTGl0ZSBEQiAhJ30pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ29yZGVyc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHtlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgISd9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5mdW5jdGlvbiBoYW5kbGVPcmllbnRhdGlvbigpe1xuICAvLyBjb25zb2xlLmxvZyhzY3JlZW4ub3JpZW50YXRpb24pO1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xufTtcblxuLy8gV0FUQ0hFUlNcbndhdGNoKCgpID0+IFsgcHJvcHMuYWRtaW4sIHByb3BzLmRpc3BsYXksIHByb3BzLm9yZGVyRm9ybSBdLFxuICAoW25ld0FkbWluUHJvcCwgbmV3RGlzcGxheVByb3AsIG5ld09yZGVyRm9ybV0pID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhgbmV3QWRtaW5Qcm9wIC0+ICR7bmV3QWRtaW5Qcm9wfS9uZXdEaXNwbGF5UHJvcCAtLT4gJHtuZXdEaXNwbGF5UHJvcH0vbmV3T3JkZXJGb3JtIC0tPiAke25ld09yZGVyRm9ybX1gKTtcbiAgICBhZG1pblByb3BSZWYudmFsdWUgPSBuZXdBZG1pblByb3A7XG4gICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBuZXdEaXNwbGF5UHJvcDtcbiAgICBpc0Zvcm0udmFsdWUgPSBuZXdPcmRlckZvcm07XG4gICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gIH1cbik7XG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcblxuLy8gT1RIRVJTXG5wcm92aWRlKCdzcmMnLCAnb3JkZXJzJyk7XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0XCIgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uO1wiPlxuICAgIDwhLS0gY29udGVudCAtLT5cbiAgICA8b3JkZXItY29tcG9uZW50XG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6b3JkZXJGb3JtPSdvcmRlckZvcm0nXG4gICAgICA6YWRtaW49J2FkbWluUHJvcCdcbiAgICAgIDpkaXNwbGF5PSdkaXNwbGF5UHJvcCdcbiAgICAgIDpkYkNvbm49XCJkYkNvbm5cIj5cbiAgICA8L29yZGVyLWNvbXBvbmVudD5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBuZXh0VGljaywgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IE9yZGVyQ29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvT3JkZXJDb21wb25lbnQudnVlJztcbmltcG9ydCB7IFNRTGl0ZURCQ29ubmVjdGlvbiB9IGZyb20gJ0BjYXBhY2l0b3ItY29tbXVuaXR5L3NxbGl0ZSc7XG5cbi8vIFZBUklBQkxFU1xuaW50ZXJmYWNlIFBhZ2VQcm9wcyB7XG4gIGFkbWluOiBib29sZWFuO1xuICBkaXNwbGF5OiBib29sZWFuO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb247XG59O1xuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UGFnZVByb3BzPigpLCB7XG4gIGFkbWluOiB0cnVlLFxuICBkaXNwbGF5OiBmYWxzZSxcbiAgZGJDb25uOiBudWxsLFxufSk7XG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWydjaGFuZ2UtdGFiJ10pO1xuY29uc3QgYWRtaW5Qcm9wID0gcmVmKHByb3BzLmFkbWluKTtcbmNvbnN0IGRpc3BsYXlQcm9wID0gcmVmKHByb3BzLmRpc3BsYXkpO1xuY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gcmVmKHRydWUpO1xuY29uc3Qgb3JkZXJGb3JtID0gcmVmKGZhbHNlKTtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocm91dGUucGFyYW1zLnR5cGUgIT0gJycpIHtcbiAgLy8gY29uc29sZS5sb2cocm91dGUucGFyYW1zLnR5cGUpO1xuICBhZG1pblByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2FkbWluJyA/IHRydWUgOiBmYWxzZTtcbiAgZGlzcGxheVByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2Rpc3BsYXknID8gdHJ1ZSA6IGZhbHNlO1xufVxuLy8gZm9yY2VPcmRlclJlcmVuZGVyKCk7XG5cbi8vIFdBVENIRVJTXG53YXRjaChcbiAgcm91dGUsXG4gIGFzeW5jIChuZXdSKSA9PiB7XG4gICAgYWRtaW5Qcm9wLnZhbHVlID0gbmV3Ui5wYXJhbXMudHlwZSA9PT0gJ2FkbWluJyA/IHRydWUgOiBmYWxzZTtcbiAgICBkaXNwbGF5UHJvcC52YWx1ZSA9IG5ld1IucGFyYW1zLnR5cGUgPT09ICdkaXNwbGF5JyA/IHRydWU6IGZhbHNlO1xuICAgIG9yZGVyRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgIGZvcmNlT3JkZXJSZXJlbmRlcigpO1xuICB9LFxuKVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlT3JkZXJSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG4gIG5leHRUaWNrKCk7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuXG4vLyBMSUZFQ1lDTEUgRVZFTlRTXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBlbWl0KCdjaGFuZ2UtdGFiJywgdW5kZWZpbmVkKTtcbn0pO1xuPC9zY3JpcHQ+XG4iXSwiZmlsZSI6ImFzc2V0cy9PcmRlclBhZ2UuanMifQ==
