import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, d as computed, _ as __vitePreload, w as watch, D as provide, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, Q as QIcon, aq as unref, b1 as createSlots, j as QBtn, a8 as Fragment, g as getCurrentInstance, B as nextTick, am as useRoute, o as onMounted } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { a as QTd } from "./QTable.js";
import { Q as QInput } from "./QInput.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { T as TableItem } from "./TableItem.js";
import { s as serviceAxiosService } from "./service.service.js";
import { u as useQuasar, i as isDbConnectionOpen, o as openDbConnection, d as newRun, c as closeDbConnection, e as setCryptApi, f as __FORMATOBJ__ } from "./use-quasar.js";
import "./QList.js";
import "./QSelect.js";
import "./use-prevent-scroll.js";
import "./index4.js";
import "./index2.js";
import "./invoice.js";
import "./invoice.service.js";
import "./session.js";
import "./session.service.js";
import "./WasmModules.js";
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ServiceComponent",
  props: {
    serviceForm: { type: Boolean, default: false },
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
      nom: {
        label: t("servicesComponent.inputLabels.name"),
        head: t("servicesComponent.headTable.name"),
        name: "nom",
        placeholder: t("servicesComponent.placeholders.name"),
        disabled: false
      },
      montantHt: {
        label: t("servicesComponent.inputLabels.amount"),
        head: t("servicesComponent.headTable.amount"),
        name: "montantHt",
        placeholder: t("servicesComponent.placeholders.amount"),
        disabled: false
      },
      quantite: {
        label: t("servicesComponent.inputLabels.quantity"),
        head: t("servicesComponent.headTable.quantity"),
        name: "quantite",
        placeholder: t("servicesComponent.placeholders.quantity"),
        disabled: false
      }
    };
    const addInputObject = {
      nom: displayInputObject.nom,
      montantHt: displayInputObject.montantHt,
      quantite: displayInputObject.quantite,
      actions: {
        label: t("forms.headTable.action"),
        name: "actions",
        head: t("forms.headTable.action"),
        placeholder: "",
        disabled: false
      }
    };
    const adminPropRef = ref(props.admin);
    const displayPropRef = ref(props.display);
    const isForm = ref(props.serviceForm);
    const messageVisibility = ref(false);
    const serviceId = ref(0);
    const nom = ref("");
    const montantHt = ref(0);
    const quantite = ref(0);
    const formState = {
      update: false,
      add: true
    };
    const defaultRow = ref([]);
    const formSubmitButtonState = computed(() => {
      return !(validNom.value && nonEmptyNom.value && validQuantite.value && nonEmptyQuantite.value && validMontantHt.value && nonEmptyMontantHt.value);
    });
    const validNom = computed(() => {
      const re = /^(([\wàåâäéèëêçìîïœöòôùûü])(\s)*){1,30}$/i;
      return re.test(nom.value);
    });
    const nonEmptyNom = computed(() => {
      return !!nom.value && nom.value !== "";
    });
    const validMontantHt = computed(() => {
      return parseFloat(montantHt.value) <= 1e6;
    });
    const nonEmptyMontantHt = computed(() => {
      return !!montantHt.value && parseFloat(montantHt.value) != 0;
    });
    const validQuantite = computed(() => {
      return parseInt(quantite.value) <= 50;
    });
    const nonEmptyQuantite = computed(() => {
      return !!quantite.value && parseInt(quantite.value) != 0;
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
    let messageStore = null, prefs = null;
    if (platform.is.desktop) {
      messageStore = useMessageStore();
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
    async function addClickFromChild(e, db) {
      e.preventDefault();
      if (!db) {
        serviceId.value = 0;
        nom.value = "";
        montantHt.value = 0;
        quantite.value = 0;
        adminPropRef.value = true;
        displayPropRef.value = false;
        isForm.value = true;
        formState.update = false;
        formState.add = true;
        defaultRow.value[0] = {
          serviceId: 0,
          nom: "",
          montantHt: 0,
          quantite: 0,
          actions: ""
        };
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await insertServiceInDb();
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
          ret = await insertServiceInSQLiteDb();
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
            message: t("servicesComponent.results.ok.add")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("servicesComponent.results.ko.add")
          });
        }
      }
    }
    async function updateClickFromChild(e, db, obj = null) {
      e.preventDefault();
      if (!db) {
        serviceId.value = obj.serviceId;
        nom.value = obj.nom;
        montantHt.value = obj.montantHt;
        quantite.value = obj.quantite;
        isForm.value = true;
        formState.update = true;
        formState.add = false;
        defaultRow.value[0] = {
          serviceId: obj.serviceId,
          nom: obj.nom,
          montantHt: obj.montantHt,
          quantite: obj.quantite,
          actions: ""
        };
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await updateServiceInDb();
          if (ret) {
            isForm.value = false;
            formState.update = false;
            formState.add = true;
          }
          forceTableRerender();
        } else {
          ret = await updateServiceInSQLiteDb();
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
            message: t("servicesComponent.results.ok.update")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("servicesComponent.results.ko.update")
          });
        }
      }
    }
    async function deleteClickFromChild(e, id) {
      e.preventDefault();
      let ret;
      if (platform.is.desktop) {
        serviceId.value = id;
        ret = deleteServiceFromDb();
        if (ret) {
          isForm.value = false;
          formState.update = false;
          formState.add = true;
        }
        forceTableRerender();
      } else {
        serviceId.value = id;
        ret = await deleteServiceFromSQLiteDb();
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
          message: t("servicesComponent.results.ok.delete")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("servicesComponent.results.ko.delete")
        });
      }
    }
    async function transformObject(obj) {
      await setCryptApi();
      __FORMATOBJ__(obj, key);
    }
    async function insertServiceInSQLiteDb() {
      const obj = {
        nom: nom.value,
        montantHt: parseFloat(montantHt.value),
        quantite: parseInt(quantite.value)
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = "INSERT INTO `produitservice` (`montantHt`, `nom`, `quantite`) VALUES (?, ?, ?);";
        const values = await newRun(props.dbConn, sql, [obj.montantHt, obj.nom, obj.quantite]);
        let ret = false;
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("servicesComponent.results.ok.add")
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
                content: t("servicesComponent.results.ko.add", { err: "Adding service in SQLite DB !" })
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
            content: t("servicesComponent.results.ko.add", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function updateServiceInSQLiteDb() {
      const obj = {
        nom: nom.value,
        montantHt: parseFloat(montantHt.value),
        quantite: parseInt(quantite.value)
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      let ret = false;
      if (isOpen) {
        const sql = "UPDATE `produitservice` SET `montantHt`=?, `nom`=?, `quantite`=? WHERE `serviceId` = ?;";
        const values = await newRun(props.dbConn, sql, [obj.montantHt, obj.nom, obj.quantite, serviceId.value]);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("servicesComponent.results.ok.update")
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
                content: t("servicesComponent.results.ko.update", { err: "Updating service in SQLite DB !" })
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
            content: t("servicesComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function deleteServiceFromSQLiteDb() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = `DELETE FROM \`produitservice\` WHERE \`serviceId\` = '${serviceId.value}';`;
        const values = await newRun(props.dbConn, sql);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("servicesComponent.results.ok.delete")
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
                content: t("servicesComponent.results.ko.delete", { err: "Deleting service in SQLite DB !" })
              }
            ],
            messageVisibility: true
          });
          messageVisibility.value = true;
        }
        closeDbConnection(props.dbConn);
        return true;
      }
      await prefs.setPref("message", {
        messages: [
          {
            severity: true,
            content: t("servicesComponent.results.ko.delete", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function insertServiceInDb() {
      const obj = {
        nom: nom.value,
        montantHt: parseFloat(montantHt.value),
        quantite: parseInt(quantite.value)
      };
      await transformObject(obj);
      return serviceAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("servicesComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("servicesComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    function deleteServiceFromDb() {
      return serviceAxiosService.delete(serviceId.value).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("servicesComponent.results.ok.delete")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("servicesComponent.results.ko.delete", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function updateServiceInDb() {
      const obj = {
        nom: nom.value,
        montantHt: parseFloat(montantHt.value),
        quantite: parseInt(quantite.value)
      };
      await transformObject(obj);
      return serviceAxiosService.update(serviceId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("servicesComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("servicesComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    watch(
      () => [props.admin, props.display, props.serviceForm],
      ([newAdminProp, newDisplayProp, newServiceForm]) => {
        adminPropRef.value = newAdminProp;
        displayPropRef.value = newDisplayProp;
        isForm.value = newServiceForm;
        forceTableRerender();
      }
    );
    provide("src", "services");
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
            tableTitle: unref(t)("servicesComponent.tableTitle"),
            isForm: isForm.value,
            addForm: "serviceForm",
            tableObj: adminPropRef.value ? addInputObject : displayInputObject,
            addDefaultRow: defaultRow.value,
            addActionName: "addClick",
            onAddClick: addClickFromChild,
            updateActionName: "updateClick",
            onUpdateClick: updateClickFromChild,
            deleteActionName: "deleteClick",
            onDeleteClick: deleteClickFromChild,
            ident: "serviceId",
            updating: formState.update,
            adding: formState.add,
            admin: props.admin,
            display: props.display,
            no_data_label: unref(t)("servicesComponent.errors.empty.tableBodyContentText"),
            no_data_button_text: unref(t)("servicesComponent.errors.empty.buttonAdding"),
            colSpan: "4",
            dbConn: __props.dbConn
          }, {
            serviceForm: withCtx(() => [
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
                    modelValue: nom.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => nom.value = $event),
                    type: "textarea",
                    name: addInputObject.nom.name,
                    label: addInputObject.nom.label,
                    hint: unref(t)("servicesComponent.hints.name"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: true,
                    maxlength: 30,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("servicesComponent.placeholders.name"),
                    rules: [
                      (val) => unref(nonEmptyNom) || unref(t)("servicesComponent.errors.empty.name"),
                      (val) => unref(validNom) || unref(t)("servicesComponent.errors.error.name")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "badge" })
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
                    modelValue: montantHt.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => montantHt.value = $event),
                    type: "number",
                    name: addInputObject.montantHt.name,
                    label: addInputObject.montantHt.label,
                    hint: unref(t)("servicesComponent.hints.amount"),
                    "hide-hint": true,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("servicesComponent.placeholders.amount"),
                    rules: [
                      (val) => unref(nonEmptyMontantHt) || unref(t)("servicesComponent.errors.empty.amount"),
                      (val) => unref(validMontantHt) || unref(t)("servicesComponent.errors.error.amount")
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
                  createVNode(QInput, {
                    modelValue: quantite.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => quantite.value = $event),
                    type: "number",
                    name: addInputObject.quantite.name,
                    label: addInputObject.quantite.label,
                    hint: unref(t)("servicesComponent.hints.quantity"),
                    "hide-hint": true,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("servicesComponent.placeholders.quantity"),
                    rules: [
                      (val) => unref(nonEmptyQuantite) || unref(t)("servicesComponent.errors.empty.quantity"),
                      (val) => unref(validQuantite) || unref(t)("servicesComponent.errors.error.quantity")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "numbers" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "hint", "dense", "placeholders", "rules"])
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
                    label: unref(t)("servicesComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[3] || (_cache[3] = ($event) => addClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true),
                  formState.update ? (openBlock(), createBlock(QBtn, {
                    key: 1,
                    color: "secondary",
                    icon: "update",
                    label: unref(t)("servicesComponent.errors.empty.buttonUpdating"),
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
var ServiceComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ServiceComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServicePage",
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
    const serviceForm = ref(false);
    if (route.params.type !== "") {
      adminProp.value = route.params.type === "admin" ? true : false;
      displayProp.value = route.params.type === "display" ? true : false;
    }
    watch(
      route,
      async (newR) => {
        adminProp.value = newR.params.type === "admin" ? true : false;
        displayProp.value = newR.params.type === "display" ? true : false;
        serviceForm.value = false;
        forceServiceRenderer();
      }
    );
    async function forceServiceRenderer() {
      renderComponent.value = false;
      await nextTick();
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
          renderComponent.value ? (openBlock(), createBlock(ServiceComponent, {
            key: 0,
            serviceForm: serviceForm.value,
            admin: adminProp.value,
            display: displayProp.value,
            dbConn: __props.dbConn
          }, null, 8, ["serviceForm", "admin", "display", "dbConn"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
var ServicePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ServicePage.vue"]]);
export { ServicePage as default };
//# sourceMappingURL=data:application/json;base64,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QUFjLGdCQUFnQixjQUFjLE1BQU07QUFHbEQscUJBQWEsUUFBUTtBQUNyQix1QkFBZSxRQUFRO0FBQ3ZCLGVBQU8sUUFBUTtBQUNJO01BQ3JCO0FBQUE7QUFtQkYsWUFBUSxPQUFPLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzl0QnpCLFVBQU0sUUFBUTtBQU9SLHNCQUFZLElBQUksTUFBTSxLQUFLO0FBQzNCLHdCQUFjLElBQUksTUFBTSxPQUFPO0FBQy9CLDRCQUFrQixJQUFJLElBQUk7QUFDMUIsd0JBQWMsSUFBSSxLQUFLO0FBR3pCLGNBQU0sT0FBTyxTQUFTLElBQUk7QUFDNUIsZ0JBQVUsUUFBUSxNQUFNLE9BQU8sU0FBUyxVQUFVLE9BQU87QUFDekQsa0JBQVksUUFBUSxNQUFNLE9BQU8sU0FBUyxZQUFZLE9BQU87QUFBQSxJQUMvRDtBQUdBO0FBQUEsTUFDRTtBQUFBLE1BQ0EsT0FBTyxTQUFTO0FBQ2Qsa0JBQVUsUUFBUSxLQUFLLE9BQU8sU0FBUyxVQUFVLE9BQU87QUFDeEQsb0JBQVksUUFBUSxLQUFLLE9BQU8sU0FBUyxZQUFZLE9BQU87QUFDNUQsb0JBQVksUUFBUTtBQUNDO01BQ3ZCO0FBQUE7QUFJRixtQkFBZSx1QkFBc0I7QUFDbkMsc0JBQWdCLFFBQVE7QUFFeEIsWUFBTSxTQUFTO0FBRWYsc0JBQWdCLFFBQVE7QUFBQSxJQUMxQjtBQUdBLGNBQVUsTUFBTTtBQUNkLFdBQUssY0FBYyxNQUFTO0FBQUEsS0FDN0IiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU2VydmljZUNvbXBvbmVudC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvU2VydmljZVBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtbm8tc3NyPlxuICAgIDxNZXNzYWdlc0l0ZW0gdi1pZj0nbWVzc2FnZVZpc2liaWxpdHkgJiYgcmVuZGVyQ29tcG9uZW50Jz48L01lc3NhZ2VzSXRlbT5cbiAgPC9xLW5vLXNzcj5cbiAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlO1wiPlxuICAgIDx0YWJsZS1pdGVtXG4gICAgICA6dGFibGVUaXRsZT0ndChcInNlcnZpY2VzQ29tcG9uZW50LnRhYmxlVGl0bGVcIiknXG4gICAgICA6aXNGb3JtPSdpc0Zvcm0nXG4gICAgICBhZGRGb3JtPSdzZXJ2aWNlRm9ybSdcbiAgICAgIDp0YWJsZU9iaj0nYWRtaW5Qcm9wUmVmID8gYWRkSW5wdXRPYmplY3QgOiBkaXNwbGF5SW5wdXRPYmplY3QnXG4gICAgICA6YWRkRGVmYXVsdFJvdz0nZGVmYXVsdFJvdydcbiAgICAgIGFkZEFjdGlvbk5hbWU9J2FkZENsaWNrJ1xuICAgICAgQGFkZENsaWNrPSdhZGRDbGlja0Zyb21DaGlsZCdcbiAgICAgIHVwZGF0ZUFjdGlvbk5hbWU9J3VwZGF0ZUNsaWNrJ1xuICAgICAgQHVwZGF0ZUNsaWNrPSd1cGRhdGVDbGlja0Zyb21DaGlsZCdcbiAgICAgIGRlbGV0ZUFjdGlvbk5hbWU9J2RlbGV0ZUNsaWNrJ1xuICAgICAgQGRlbGV0ZUNsaWNrPSdkZWxldGVDbGlja0Zyb21DaGlsZCdcbiAgICAgIGlkZW50PSdzZXJ2aWNlSWQnXG4gICAgICA6dXBkYXRpbmc9J2Zvcm1TdGF0ZS51cGRhdGUnXG4gICAgICA6YWRkaW5nPSdmb3JtU3RhdGUuYWRkJ1xuICAgICAgdi1pZj0ncmVuZGVyQ29tcG9uZW50J1xuICAgICAgOmFkbWluPSdwcm9wcy5hZG1pbidcbiAgICAgIDpkaXNwbGF5PSdwcm9wcy5kaXNwbGF5J1xuICAgICAgOm5vX2RhdGFfbGFiZWw9XCJ0KCdzZXJ2aWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkudGFibGVCb2R5Q29udGVudFRleHQnKVwiXG4gICAgICA6bm9fZGF0YV9idXR0b25fdGV4dD1cInQoJ3NlcnZpY2VzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5idXR0b25BZGRpbmcnKVwiXG4gICAgICBjb2xTcGFuPSc0J1xuICAgICAgOmRiQ29ubj1cImRiQ29ublwiPlxuICAgICAgPHRlbXBsYXRlICNzZXJ2aWNlRm9ybT5cbiAgICAgICAgPHEtdGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+PHEtaWNvbiA6bmFtZT1cImZvcm1TdGF0ZS5hZGQgPyAnYWRkJyA6ICd1cGRhdGUnXCIgc2l6ZT1cInNtXCI+PC9xLWljb24+PC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cIm5vbVwiIFxuICAgICAgICAgICAgdHlwZT1cInRleHRhcmVhXCJcbiAgICAgICAgICAgIDpuYW1lPVwiYWRkSW5wdXRPYmplY3Qubm9tLm5hbWVcIlxuICAgICAgICAgICAgOmxhYmVsPVwiYWRkSW5wdXRPYmplY3Qubm9tLmxhYmVsXCJcbiAgICAgICAgICAgIDpoaW50PVwidCgnc2VydmljZXNDb21wb25lbnQuaGludHMubmFtZScpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPVwiZmFsc2VcIlxuICAgICAgICAgICAgOmF1dG9ncm93PVwidHJ1ZVwiXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPVwiMzBcIlxuICAgICAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICA6cGxhY2Vob2xkZXJzPVwidCgnc2VydmljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLm5hbWUnKVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eU5vbSB8fCB0KCdzZXJ2aWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkubmFtZScpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWROb20gfHwgdCgnc2VydmljZXNDb21wb25lbnQuZXJyb3JzLmVycm9yLm5hbWUnKVxuICAgICAgICAgICAgXVwiPlxuICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj1cInBsYXRmb3JtLmlzLmRlc2t0b3BcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJiYWRnZVwiIC8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgICAgPHEtdGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICAgICAgPHEtaW5wdXQgXG4gICAgICAgICAgICB2LW1vZGVsPVwibW9udGFudEh0XCIgXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIDpuYW1lPVwiYWRkSW5wdXRPYmplY3QubW9udGFudEh0Lm5hbWVcIlxuICAgICAgICAgICAgOmxhYmVsPVwiYWRkSW5wdXRPYmplY3QubW9udGFudEh0LmxhYmVsXCJcbiAgICAgICAgICAgIDpoaW50PVwidCgnc2VydmljZXNDb21wb25lbnQuaGludHMuYW1vdW50JylcIlxuICAgICAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICA6cGxhY2Vob2xkZXJzPVwidCgnc2VydmljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmFtb3VudCcpXCJcbiAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5TW9udGFudEh0IHx8IHQoJ3NlcnZpY2VzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5hbW91bnQnKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkTW9udGFudEh0IHx8IHQoJ3NlcnZpY2VzQ29tcG9uZW50LmVycm9ycy5lcnJvci5hbW91bnQnKVxuICAgICAgICAgICAgXVwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9XCJwbGF0Zm9ybS5pcy5kZXNrdG9wXCI+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInBheW1lbnRzXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDxxLXRkIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgICAgICAgIDxxLWlucHV0IFxuICAgICAgICAgICAgdi1tb2RlbD1cInF1YW50aXRlXCIgXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIDpuYW1lPVwiYWRkSW5wdXRPYmplY3QucXVhbnRpdGUubmFtZVwiXG4gICAgICAgICAgICA6bGFiZWw9XCJhZGRJbnB1dE9iamVjdC5xdWFudGl0ZS5sYWJlbFwiXG4gICAgICAgICAgICA6aGludD1cInQoJ3NlcnZpY2VzQ29tcG9uZW50LmhpbnRzLnF1YW50aXR5JylcIlxuICAgICAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICA6cGxhY2Vob2xkZXJzPVwidCgnc2VydmljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLnF1YW50aXR5JylcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlRdWFudGl0ZSB8fCB0KCdzZXJ2aWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkucXVhbnRpdHknKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkUXVhbnRpdGUgfHwgdCgnc2VydmljZXNDb21wb25lbnQuZXJyb3JzLmVycm9yLnF1YW50aXR5JylcbiAgICAgICAgICAgIF1cIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPVwicGxhdGZvcm0uaXMuZGVza3RvcFwiPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJudW1iZXJzXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDxxLXRkIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiIGNsYXNzPVwiZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG4gdi1pZj1cImZvcm1TdGF0ZS5hZGRcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgXG4gICAgICAgICAgICBpY29uPVwiYWRkX2NpcmNsZVwiIFxuICAgICAgICAgICAgOmxhYmVsPVwidCgnc2VydmljZXNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZycpXCIgXG4gICAgICAgICAgICBnbG9zc3kgdW5lbGV2YXRlZFxuICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgIEBjbGljaz1cImFkZENsaWNrRnJvbUNoaWxkKCRldmVudCwgdHJ1ZSlcIj4gIFxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPHEtYnRuIHYtaWY9XCJmb3JtU3RhdGUudXBkYXRlXCJcbiAgICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCIgXG4gICAgICAgICAgICBpY29uPVwidXBkYXRlXCIgXG4gICAgICAgICAgICA6bGFiZWw9XCJ0KCdzZXJ2aWNlc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuYnV0dG9uVXBkYXRpbmcnKVwiIFxuICAgICAgICAgICAgZ2xvc3N5IHVuZWxldmF0ZWRcbiAgICAgICAgICAgIDpkaXNhYmxlZD1cImZvcm1TdWJtaXRCdXR0b25TdGF0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJ1cGRhdGVDbGlja0Zyb21DaGlsZCgkZXZlbnQsIHRydWUpXCI+ICBcbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdGFibGUtaXRlbT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgbmV4dFRpY2ssIHJlZiwgcHJvdmlkZSwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnO1xuLy8gaW1wb3J0IHsgdXNlU2VydmljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL3NlcnZpY2UnO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuaW1wb3J0IFRhYmxlSXRlbSBmcm9tICcuL1RhYmxlSXRlbS52dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuaW1wb3J0IHNlcnZpY2VBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvc2VydmljZS5zZXJ2aWNlJztcbmltcG9ydCB7IElucHV0T2JqZWN0Q29sbGVjdGlvbiwgRm9ybVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG4vLyBpbXBvcnQgJ3NyYy9nbG9iYWxzJztcbi8vIGltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UnVuLCBjbG9zZURiQ29ubmVjdGlvbiB9IGZyb20gJ2NhcC9zdG9yYWdlJztcbmltcG9ydCB7IHNldENyeXB0QXBpLCBfX0ZPUk1BVE9CSl9fIH0gZnJvbSAnc3JjL2dsb2JhbHMnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcblxuLy8gVkFSSUFCTEVTXG5jb25zdCBhcHAgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbmNvbnN0IGtleSA9IGFwcC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRrZXk7XG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuLy8gY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBwbGF0Zm9ybSA9ICRxLnBsYXRmb3JtO1xuY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gcmVmKHRydWUpO1xuaW50ZXJmYWNlIFNlcnZpY2VQcm9wcyB7XG4gIHNlcnZpY2VGb3JtPzogYm9vbGVhbjtcbiAgYWRtaW46IGJvb2xlYW47XG4gIGRpc3BsYXk6IGJvb2xlYW47XG4gIGRiQ29ubj86IFNRTGl0ZURCQ29ubmVjdGlvbiB8IG51bGw7XG59O1xuaW50ZXJmYWNlIERlZmF1bHRTZXJ2aWNlUm93IHtcbiAgc2VydmljZUlkOiBudW1iZXI7XG4gIG5vbTogc3RyaW5nO1xuICBtb250YW50SHQ6IG51bWJlcjtcbiAgcXVhbnRpdGU6IG51bWJlcjtcbiAgYWN0aW9uczogc3RyaW5nO1xufTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFNlcnZpY2VQcm9wcz4oKSwge1xuICBzZXJ2aWNlRm9ybTogZmFsc2UsXG4gIGFkbWluOiB0cnVlLFxuICBkaXNwbGF5OiBmYWxzZSxcbiAgZGJDb25uOiBudWxsLFxufSk7XG5jb25zdCB7IHQgfSA9IHVzZUkxOG4oeyB1c2VTY29wZTogJ2dsb2JhbCcgfSk7XG5jb25zdCBkaXNwbGF5SW5wdXRPYmplY3Q6IElucHV0T2JqZWN0Q29sbGVjdGlvbiA9IHtcbiAgbm9tOiB7XG4gICAgbGFiZWw6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLm5hbWUnKSxcbiAgICBoZWFkOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5oZWFkVGFibGUubmFtZScpLFxuICAgIG5hbWU6ICdub20nLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMubmFtZScpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgbW9udGFudEh0OiB7XG4gICAgbGFiZWw6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LmlucHV0TGFiZWxzLmFtb3VudCcpLFxuICAgIGhlYWQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LmhlYWRUYWJsZS5hbW91bnQnKSxcbiAgICBuYW1lOiAnbW9udGFudEh0JyxcbiAgICBwbGFjZWhvbGRlcjogdCgnc2VydmljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmFtb3VudCcpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgcXVhbnRpdGU6IHtcbiAgICBsYWJlbDogdCgnc2VydmljZXNDb21wb25lbnQuaW5wdXRMYWJlbHMucXVhbnRpdHknKSxcbiAgICBoZWFkOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5oZWFkVGFibGUucXVhbnRpdHknKSxcbiAgICBuYW1lOiAncXVhbnRpdGUnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMucXVhbnRpdHknKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG59O1xuY29uc3QgYWRkSW5wdXRPYmplY3Q6IElucHV0T2JqZWN0Q29sbGVjdGlvbiA9IHsgXG4gIG5vbTogZGlzcGxheUlucHV0T2JqZWN0Lm5vbSxcbiAgbW9udGFudEh0OiBkaXNwbGF5SW5wdXRPYmplY3QubW9udGFudEh0LFxuICBxdWFudGl0ZTogZGlzcGxheUlucHV0T2JqZWN0LnF1YW50aXRlLFxuICBhY3Rpb25zOiB7XG4gICAgbGFiZWw6IHQoJ2Zvcm1zLmhlYWRUYWJsZS5hY3Rpb24nKSxcbiAgICBuYW1lOiAnYWN0aW9ucycsXG4gICAgaGVhZDogdCgnZm9ybXMuaGVhZFRhYmxlLmFjdGlvbicpLFxuICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH1cbn07XG5jb25zdCBhZG1pblByb3BSZWYgPSByZWYocHJvcHMuYWRtaW4pO1xuY29uc3QgZGlzcGxheVByb3BSZWYgPSByZWYocHJvcHMuZGlzcGxheSk7XG5jb25zdCBpc0Zvcm0gPSByZWYocHJvcHMuc2VydmljZUZvcm0pO1xuY29uc3QgbWVzc2FnZVZpc2liaWxpdHkgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VydmljZUlkID0gcmVmKDApO1xuY29uc3Qgbm9tID0gcmVmKCcnKTtcbmNvbnN0IG1vbnRhbnRIdCA9IHJlZigwLjApO1xuY29uc3QgcXVhbnRpdGUgPSByZWYoMCk7XG5jb25zdCBmb3JtU3RhdGU6IFJlZjxGb3JtU3RhdGU+ID0gKHtcbiAgdXBkYXRlOiBmYWxzZSxcbiAgYWRkOiB0cnVlXG59KTtcbi8vIGNvbnN0IHVwZGF0ZUlucHV0T2JqZWN0OiBSZWY8SW5wdXRPYmplY3RDb2xsZWN0aW9uPiA9ICh7fSk7XG4vLyBjb25zdCB1cGRhdGVJbnB1dE9iamVjdElkOiBudW1iZXIgPSByZWYoMCk7XG4vLyBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gcmVmKFtdKTtcbmNvbnN0IGRlZmF1bHRSb3c6IFJlZjxEZWZhdWx0U2VydmljZVJvd1tdPiA9IHJlZihbXSk7XG5jb25zdCBmb3JtU3VibWl0QnV0dG9uU3RhdGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhKHZhbGlkTm9tLnZhbHVlICYmIG5vbkVtcHR5Tm9tLnZhbHVlIFxuICAgICYmIHZhbGlkUXVhbnRpdGUudmFsdWUgJiYgbm9uRW1wdHlRdWFudGl0ZS52YWx1ZVxuICAgICYmIHZhbGlkTW9udGFudEh0LnZhbHVlICYmIG5vbkVtcHR5TW9udGFudEh0LnZhbHVlKTtcbn0pO1xuY29uc3QgdmFsaWROb20gPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oKFtcXHfDoMOlw6LDpMOpw6jDq8Oqw6fDrMOuw6/Fk8O2w7LDtMO5w7vDvF0pKFxccykqKXsxLDMwfSQvaTtcbiAgcmV0dXJuIHJlLnRlc3Qobm9tLnZhbHVlKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlOb20gPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhIW5vbS52YWx1ZSAmJiBub20udmFsdWUgIT09ICcnO1xufSk7XG5jb25zdCB2YWxpZE1vbnRhbnRIdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobW9udGFudEh0LnZhbHVlKSA8PSAxMDAwMDAwOyBcbn0pO1xuY29uc3Qgbm9uRW1wdHlNb250YW50SHQ9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhbW9udGFudEh0LnZhbHVlICYmIHBhcnNlRmxvYXQobW9udGFudEh0LnZhbHVlKSAhPSAwO1xufSk7XG5jb25zdCB2YWxpZFF1YW50aXRlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gcGFyc2VJbnQocXVhbnRpdGUudmFsdWUpIDw9IDUwO1xufSk7XG5jb25zdCBub25FbXB0eVF1YW50aXRlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFxdWFudGl0ZS52YWx1ZSAmJiBwYXJzZUludChxdWFudGl0ZS52YWx1ZSkgIT0gMDtcbn0pO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmICghIW9yaWVudGF0aW9uLnZhbHVlKXtcbiAgICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5sZXQgbWVzc2FnZVN0b3JlID0gbnVsbCwgXG4gIC8vIHNlcnZpY2VTdG9yZSA9IG51bGwsIFxuICBwcmVmcyA9IG51bGw7XG5cbi8vIERFQ0xBUkFUSU9OU1xuaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgbWVzc2FnZVN0b3JlID0gdXNlTWVzc2FnZVN0b3JlKCk7XG4gIC8vIHNlcnZpY2VTdG9yZSA9IHVzZVNlcnZpY2VTdG9yZSgpO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IG1lc3NhZ2VTdG9yZS5nZXRNZXNzYWdlc1Zpc2liaWxpdHk7XG59IGVsc2Uge1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgaGFuZGxlT3JpZW50YXRpb24pO1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIHByZWZzID0gYXdhaXQgaW1wb3J0KCdjYXAvc3RvcmFnZS9wcmVmZXJlbmNlcycpO1xuICAgIGNvbnN0IG1lc3MgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdtZXNzYWdlJyk7XG4gICAgLy8gY29uc29sZS5sb2cobWVzcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzIDogW107XG4gICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgIGNvbnN0IHZpcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXNWaXNpYmlsaXR5IDogbWVzcztcbiAgICAvLyBjb25zb2xlLmxvZyh2aXMpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggJiYgdmlzID09PSBudWxsKSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdmlzICE9PSBudWxsID8gdmlzIDogZmFsc2U7XG4gICAgfVxuICB9KSgpO1xufVxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlVGFibGVSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG5cbiAgYXdhaXQgbmV4dFRpY2soKTtcblxuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSB0cnVlO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGFkZENsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBkYjogYm9vbGVhbikge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmICghZGIpIHtcbiAgICBzZXJ2aWNlSWQudmFsdWUgPSAwO1xuICAgIG5vbS52YWx1ZSA9ICcnO1xuICAgIG1vbnRhbnRIdC52YWx1ZSA9IDAuMDtcbiAgICBxdWFudGl0ZS52YWx1ZSA9IDA7XG4gICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgIGlzRm9ybS52YWx1ZSA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coJ0Zvcm0gc3RhdGUgdmFsdWUnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhmb3JtU3RhdGUpO1xuICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICBkZWZhdWx0Um93LnZhbHVlWzBdID0ge1xuICAgICAgc2VydmljZUlkOiAwLFxuICAgICAgbm9tOiAnJyxcbiAgICAgIG1vbnRhbnRIdDogMC4wLFxuICAgICAgcXVhbnRpdGU6IDAsXG4gICAgICBhY3Rpb25zOiAnJ1xuICAgIH07XG4gICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0FkZGluZyBpbnRvIERCJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICAgICAgcmV0ID0gYXdhaXQgaW5zZXJ0U2VydmljZUluRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMuZGlzcGxheSl7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCA9IGF3YWl0IGluc2VydFNlcnZpY2VJblNRTGl0ZURiKClcbiAgICAgICAgLy8gLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAvLyAgIGlmIChyZXMpIHtcbiAgICAgICAgLy8gICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyAgIGlmIChwcm9wcy5kaXNwbGF5KXtcbiAgICAgICAgLy8gICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgaWYgKHJldCl7XG4gICAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzLmRpc3BsYXkpe1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH1cbiAgICBpZiAocmV0KXtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgaWNvbjogJ2Nsb3VkX2RvbmUnLFxuICAgICAgICBtZXNzYWdlOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBkYjogYm9vbGVhbiwgb2JqOiBhbnkgPSBudWxsKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKCFkYikge1xuICAgIHNlcnZpY2VJZC52YWx1ZSA9IG9iai5zZXJ2aWNlSWQ7XG4gICAgbm9tLnZhbHVlID0gb2JqLm5vbTtcbiAgICBtb250YW50SHQudmFsdWUgPSBvYmoubW9udGFudEh0O1xuICAgIHF1YW50aXRlLnZhbHVlID0gb2JqLnF1YW50aXRlO1xuICAgIGlzRm9ybS52YWx1ZSA9IHRydWU7XG4gICAgZm9ybVN0YXRlLnVwZGF0ZSA9IHRydWU7XG4gICAgZm9ybVN0YXRlLmFkZCA9IGZhbHNlO1xuICAgIC8vIGNvbnNvbGUubG9nKG9iaik7XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIHNlcnZpY2VJZDogb2JqLnNlcnZpY2VJZCxcbiAgICAgIG5vbTogb2JqLm5vbSxcbiAgICAgIG1vbnRhbnRIdDogb2JqLm1vbnRhbnRIdCxcbiAgICAgIHF1YW50aXRlOiBvYmoucXVhbnRpdGUsXG4gICAgICBhY3Rpb25zOiAnJyxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUubG9nKCdVcGRhdGluZyBpbnRvIERCICEnKTtcbiAgICBsZXQgcmV0O1xuICAgIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgICByZXQgPSBhd2FpdCB1cGRhdGVTZXJ2aWNlSW5EYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBhd2FpdCB1cGRhdGVTZXJ2aWNlSW5TUUxpdGVEYigpXG4gICAgICAgIC8vIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgLy8gICBpZiAocmVzKSB7XG4gICAgICAgIC8vICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICBpZiAocmV0KXtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKHJldCl7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgbWVzc2FnZTogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBtZXNzYWdlOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBkZWxldGVDbGlja0Zyb21DaGlsZChlOiBFdmVudCwgaWQ6IG51bWJlcil7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gY29uc29sZS5sb2coXCJkZWxldGluZyBzZXJ2aWNlICFcIik7XG4gIGxldCByZXQ7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBzZXJ2aWNlSWQudmFsdWUgPSBpZDtcbiAgICByZXQgPSBkZWxldGVTZXJ2aWNlRnJvbURiKCk7XG4gICAgaWYgKHJldCkge1xuICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgc2VydmljZUlkLnZhbHVlID0gaWQ7XG4gICAgcmV0ID0gYXdhaXQgZGVsZXRlU2VydmljZUZyb21TUUxpdGVEYigpXG4gICAgICAvLyAudGhlbigocmVzKSA9PiB7XG4gICAgICAvLyAgIGlmIChyZXMpIHtcbiAgICAgIC8vICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIC8vICAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgICAvLyAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gICAgICAvLyB9KTtcbiAgICBpZiAocmV0KSB7XG4gICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIH1cbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuICBpZiAocmV0KSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICBtZXNzYWdlOiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLmRlbGV0ZScpXG4gICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgbWVzc2FnZTogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5rby5kZWxldGUnKVxuICAgIH0pO1xuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KG9iajogYW55KTogYW55IHtcbiAgLy8gaWYgKF9fS0VZX18gPT09IG51bGwpe1xuICAvLyAgIGF3YWl0IHNldEdlbkFwaSgpO1xuICAvLyB9XG4gIGF3YWl0IHNldENyeXB0QXBpKCk7XG4gIF9fRk9STUFUT0JKX18ob2JqLCBrZXkpO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGluc2VydFNlcnZpY2VJblNRTGl0ZURiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgbm9tOiBub20udmFsdWUsXG4gICAgbW9udGFudEh0OiBwYXJzZUZsb2F0KG1vbnRhbnRIdC52YWx1ZSksXG4gICAgcXVhbnRpdGU6IHBhcnNlSW50KHF1YW50aXRlLnZhbHVlKSxcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGNvbnN0IHNxbCA9ICdJTlNFUlQgSU5UTyBcXGBwcm9kdWl0c2VydmljZVxcYCAoXFxgbW9udGFudEh0XFxgLCBcXGBub21cXGAsIFxcYHF1YW50aXRlXFxgKSBWQUxVRVMgKD8sID8sID8pOyc7XG4gICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmoubW9udGFudEh0LCBvYmoubm9tLCBvYmoucXVhbnRpdGVdKTtcbiAgICAvLyBjb25zb2xlLmxvZygnUXVlcnkgcmVzdWx0cyAtLT4nKTtcbiAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcylcbiAgICB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywgeyBcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsIGNvbnRlbnQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLCBcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywge2VyciA6ICdBZGRpbmcgc2VydmljZSBpbiBTUUxpdGUgREIgISd9KVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgIG1lc3NhZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLCBcbiAgICAgICAgY29udGVudDogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5rby5hZGQnLCB7ZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICB9KTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2VydmljZUluU1FMaXRlRGIoKSB7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBub206IG5vbS52YWx1ZSxcbiAgICBtb250YW50SHQ6IHBhcnNlRmxvYXQobW9udGFudEh0LnZhbHVlKSxcbiAgICBxdWFudGl0ZTogcGFyc2VJbnQocXVhbnRpdGUudmFsdWUpLFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICBpc09wZW4gPSAhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICBsZXQgcmV0ID0gZmFsc2U7XG4gIGlmIChpc09wZW4pIHtcbiAgICBjb25zdCBzcWwgPSAnVVBEQVRFIFxcYHByb2R1aXRzZXJ2aWNlXFxgIFNFVCBcXGBtb250YW50SHRcXGA9PywgXFxgbm9tXFxgPT8sIFxcYHF1YW50aXRlXFxgPT8gV0hFUkUgXFxgc2VydmljZUlkXFxgID0gPzsnO1xuICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbb2JqLm1vbnRhbnRIdCwgb2JqLm5vbSwgb2JqLnF1YW50aXRlLCBzZXJ2aWNlSWQudmFsdWVdKTtcbiAgICAvLyBjb25zb2xlLmxvZygnUXVlcnkgdmFsdWVzIC0tPicpXG4gICAgLy8gY29uc29sZS5sb2codmFsdWVzKTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcylcbiAgICB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiBmYWxzZSwgXG4gICAgICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSwgXG4gICAgICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHsgZXJyOiAnVXBkYXRpbmcgc2VydmljZSBpbiBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSwgXG4gICAgICAgIGNvbnRlbnQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgISd9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5hc3luYyBmdW5jdGlvbiBkZWxldGVTZXJ2aWNlRnJvbVNRTGl0ZURiKCkge1xuICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGlmIChpc09wZW4pIHtcbiAgICBjb25zdCBzcWwgPSBgREVMRVRFIEZST00gXFxgcHJvZHVpdHNlcnZpY2VcXGAgV0hFUkUgXFxgc2VydmljZUlkXFxgID0gJyR7c2VydmljZUlkLnZhbHVlfSc7YDtcbiAgICAvLyBjb25zb2xlLmxvZyhzcWwpO1xuICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1J1bihwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgLy8gY29uc29sZS5sb2coJ1F1ZXJ5IHZhbHVlcyAtLT4nKVxuICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpXG4gICAge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsIFxuICAgICAgICAgICAgY29udGVudDogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSwgXG4gICAgICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHsgZXJyOiAnRGVsZXRpbmcgc2VydmljZSBpbiBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSwgXG4gICAgICAgIGNvbnRlbnQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZGVsZXRlJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgISd9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5hc3luYyBmdW5jdGlvbiBpbnNlcnRTZXJ2aWNlSW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIG5vbTogbm9tLnZhbHVlLFxuICAgIG1vbnRhbnRIdDogcGFyc2VGbG9hdChtb250YW50SHQudmFsdWUpLFxuICAgIHF1YW50aXRlOiBwYXJzZUludChxdWFudGl0ZS52YWx1ZSksXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICByZXR1cm4gc2VydmljZUF4aW9zU2VydmljZVxuICAgIC5jcmVhdGUob2JqKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHtlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gZGVsZXRlU2VydmljZUZyb21EYigpIHtcbiAgcmV0dXJuIHNlcnZpY2VBeGlvc1NlcnZpY2VcbiAgICAuZGVsZXRlKHNlcnZpY2VJZC52YWx1ZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKSxcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ3NlcnZpY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZGVsZXRlJywge2VycjogZXJyfSksXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2VydmljZUluRGIoKSB7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBub206IG5vbS52YWx1ZSxcbiAgICBtb250YW50SHQ6IHBhcnNlRmxvYXQobW9udGFudEh0LnZhbHVlKSxcbiAgICBxdWFudGl0ZTogcGFyc2VJbnQocXVhbnRpdGUudmFsdWUpLFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgcmV0dXJuIHNlcnZpY2VBeGlvc1NlcnZpY2VcbiAgICAudXBkYXRlKHNlcnZpY2VJZC52YWx1ZSwgb2JqKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiB0KCdzZXJ2aWNlc0NvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpLFxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnc2VydmljZXNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7ZXJyOiBlcnJ9KSxcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiBoYW5kbGVPcmllbnRhdGlvbigpe1xuICAvLyBjb25zb2xlLmxvZyhzY3JlZW4ub3JpZW50YXRpb24pO1xuICBvcmllbnRhdGlvbi52YWx1ZSA9IHNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xufTtcblxuLy8gV0FUQ0hFUlNcbndhdGNoKCgpID0+IFsgcHJvcHMuYWRtaW4sIHByb3BzLmRpc3BsYXksIHByb3BzLnNlcnZpY2VGb3JtIF0sXG4gIChbbmV3QWRtaW5Qcm9wLCBuZXdEaXNwbGF5UHJvcCwgbmV3U2VydmljZUZvcm1dKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYG5ld0FkbWluUHJvcCAtPiAke25ld0FkbWluUHJvcH0vb2xkQWRtaW5Qcm9wIC0+ICR7b2xkQWRtaW5Qcm9wfWApO1xuICAgIC8vIGNvbnNvbGUubG9nKGBuZXdEaXNwbGF5UHJvcCAtPiAke25ld0Rpc3BsYXlQcm9wfS9vbGREaXNwbGF5UHJvcCAtPiAke29sZERpc3BsYXlQcm9wfWApO1xuICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IG5ld0FkbWluUHJvcDtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IG5ld0Rpc3BsYXlQcm9wO1xuICAgIGlzRm9ybS52YWx1ZSA9IG5ld1NlcnZpY2VGb3JtO1xuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9XG4pO1xuXG4vLyBMSUZFQ1lDTEUgRVZFTlRTXG4vKipcbiAqIG9uVXBkYXRlZCBcbiAqIG9uVW5tb250ZWRcbiAqIG9uQmVmb3JlTW91bnRcbiAqIG9uQmVmb3JlVXBkYXRlXG4gKiBvbkJlZm9yZVVubW91bnRcbiAqIG9uRXJyb3JDYXB0dXJlZFxuICogb25SZW5kZXJUcmFja2VkXG4gKiBvblJlbmRlclRyaWdnZXJlZFxuICogb25BY3RpdmF0ZWRcbiAqIG9uRGVzYWN0aXZhdGVkXG4gKiBvblNlcnZlUHJlZmV0Y2hcbioqL1xuXG4vLyBPVEhFUlxucHJvdmlkZSgnc3JjJywgJ3NlcnZpY2VzJyk7XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0XCIgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uO1wiPlxuICAgIDwhLS0gY29udGVudCAtLT5cbiAgICA8c2VydmljZS1jb21wb25lbnQgXG4gICAgICB2LWlmPSdyZW5kZXJDb21wb25lbnQnXG4gICAgICA6c2VydmljZUZvcm09J3NlcnZpY2VGb3JtJ1xuICAgICAgOmFkbWluPSdhZG1pblByb3AnXG4gICAgICA6ZGlzcGxheT0nZGlzcGxheVByb3AnXG4gICAgICA6ZGJDb25uPVwiZGJDb25uXCI+PC9zZXJ2aWNlLWNvbXBvbmVudD5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBuZXh0VGljaywgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IFNlcnZpY2VDb21wb25lbnQgZnJvbSAnY29tcG9uZW50cy9TZXJ2aWNlQ29tcG9uZW50LnZ1ZSc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQYWdlUHJvcHMge1xuICBhZG1pbjogYm9vbGVhbjtcbiAgZGlzcGxheTogYm9vbGVhbjtcbiAgZGJDb25uPzogU1FMaXRlREJDb25uZWN0aW9uO1xufTtcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFBhZ2VQcm9wcz4oKSwge1xuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2hhbmdlLXRhYiddKTtcbmNvbnN0IGFkbWluUHJvcCA9IHJlZihwcm9wcy5hZG1pbik7XG5jb25zdCBkaXNwbGF5UHJvcCA9IHJlZihwcm9wcy5kaXNwbGF5KTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHNlcnZpY2VGb3JtID0gcmVmKGZhbHNlKTtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocm91dGUucGFyYW1zLnR5cGUgIT09ICcnKSB7XG4gIGFkbWluUHJvcC52YWx1ZSA9IHJvdXRlLnBhcmFtcy50eXBlID09PSAnYWRtaW4nID8gdHJ1ZSA6IGZhbHNlO1xuICBkaXNwbGF5UHJvcC52YWx1ZSA9IHJvdXRlLnBhcmFtcy50eXBlID09PSAnZGlzcGxheScgPyB0cnVlIDogZmFsc2U7XG59XG5cbi8vIFdBVENIRVJTXG53YXRjaChcbiAgcm91dGUsXG4gIGFzeW5jIChuZXdSKSA9PiB7XG4gICAgYWRtaW5Qcm9wLnZhbHVlID0gbmV3Ui5wYXJhbXMudHlwZSA9PT0gJ2FkbWluJyA/IHRydWUgOiBmYWxzZTtcbiAgICBkaXNwbGF5UHJvcC52YWx1ZSA9IG5ld1IucGFyYW1zLnR5cGUgPT09ICdkaXNwbGF5JyA/IHRydWUgOiBmYWxzZTtcbiAgICBzZXJ2aWNlRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgIGZvcmNlU2VydmljZVJlbmRlcmVyKCk7XG4gIH1cbilcblxuLy8gRlVOQ1RJT05TXG5hc3luYyBmdW5jdGlvbiBmb3JjZVNlcnZpY2VSZW5kZXJlcigpe1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSBmYWxzZTtcblxuICBhd2FpdCBuZXh0VGljaygpO1xuXG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuXG4vLyBMSUZFQ1lDTEUgRVZFTlRTXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBlbWl0KCdjaGFuZ2UtdGFiJywgdW5kZWZpbmVkKTtcbn0pXG48L3NjcmlwdD5cbiJdLCJmaWxlIjoiYXNzZXRzL1NlcnZpY2VQYWdlLmpzIn0=
