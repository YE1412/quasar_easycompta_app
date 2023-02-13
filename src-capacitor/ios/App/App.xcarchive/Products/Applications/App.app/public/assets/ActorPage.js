import { Q as QPage } from "./QPage.js";
import { h, c as createComponent, aS as useSizeProps, aT as useSize, f as ref, d as computed, Q as QIcon, y as hMergeSlot, e as hSlot, g as getCurrentInstance, aM as toRaw, q as stopAndPrevent, ac as _export_sfc, $ as defineComponent, ao as useI18n, _ as __vitePreload, w as watch, D as provide, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, aq as unref, b1 as createSlots, j as QBtn, a8 as Fragment, B as nextTick, am as useRoute, o as onMounted } from "./index.js";
import { b as useDarkProps, c as useDark, Q as QNoSsr } from "./QNoSsr.js";
import { o as optionSizes, u as useRefocusTarget, c as useCheckboxProps, d as useCheckboxEmits, e as useCheckbox, f as QCheckbox, a as QTd } from "./QTable.js";
import { Q as QInput } from "./QInput.js";
import { a as useFormProps, b as useFormInject, u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { T as TableItem } from "./TableItem.js";
import { a as actorAxiosService } from "./service.service.js";
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
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
var QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
    const classes = computed(
      () => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props.dense === true ? " q-radio--dense" : "") + (props.leftLabel === true ? " reverse" : "")
    );
    const innerClass = computed(() => {
      const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(
      () => (isTrue.value === true ? props.checkedIcon : props.uncheckedIcon) || null
    );
    const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props.name !== void 0 && Object.assign(prop, {
        ".checked": isTrue.value === true,
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props.name,
        value: props.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props.disable !== true && isTrue.value !== true) {
        emit("update:modelValue", props.val, e);
      }
    }
    function onKeydown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props.disable !== true && injectFormInput(
        content,
        "unshift",
        " q-radio__native q-ma-none q-pa-none"
      );
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value,
          "aria-hidden": "true"
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
      label !== void 0 && child.push(
        h("div", {
          class: "q-radio__label q-anchor--skip"
        }, label)
      );
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props.disable === true ? "true" : void 0,
        onClick,
        onKeydown,
        onKeyup
      }, child);
    };
  }
});
var QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || props.icon
      );
      const color = computed(() => isTrue.value === true ? props.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
const components = {
  radio: QRadio,
  checkbox: QCheckbox,
  toggle: QToggle
};
const typeValues = Object.keys(components);
var QOptionGroup = createComponent({
  name: "QOptionGroup",
  props: {
    ...useDarkProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      validator: (opts) => opts.every((opt) => "value" in opt && "label" in opt)
    },
    name: String,
    type: {
      default: "radio",
      validator: (v) => typeValues.includes(v)
    },
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    size: String,
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const arrayModel = Array.isArray(props.modelValue);
    if (props.type === "radio") {
      if (arrayModel === true) {
        console.error("q-option-group: model should not be array");
      }
    } else if (arrayModel === false) {
      console.error("q-option-group: model should be array in your case");
    }
    const isDark = useDark(props, $q);
    const component = computed(() => components[props.type]);
    const classes = computed(
      () => "q-option-group q-gutter-x-sm" + (props.inline === true ? " q-option-group--inline" : "")
    );
    const attrs = computed(() => {
      const attrs2 = { role: "group" };
      if (props.type === "radio") {
        attrs2.role = "radiogroup";
        if (props.disable === true) {
          attrs2["aria-disabled"] = "true";
        }
      }
      return attrs2;
    });
    function onUpdateModelValue(value) {
      emit("update:modelValue", value);
    }
    return () => h("div", {
      class: classes.value,
      ...attrs.value
    }, props.options.map((opt, i) => {
      const child = slots["label-" + i] !== void 0 ? () => slots["label-" + i](opt) : slots.label !== void 0 ? () => slots.label(opt) : void 0;
      return h("div", [
        h(component.value, {
          modelValue: props.modelValue,
          val: opt.value,
          name: opt.name === void 0 ? props.name : opt.name,
          disable: props.disable || opt.disable,
          label: child === void 0 ? opt.label : null,
          leftLabel: opt.leftLabel === void 0 ? props.leftLabel : opt.leftLabel,
          color: opt.color === void 0 ? props.color : opt.color,
          checkedIcon: opt.checkedIcon,
          uncheckedIcon: opt.uncheckedIcon,
          dark: opt.dark || isDark.value,
          size: opt.size === void 0 ? props.size : opt.size,
          dense: props.dense,
          keepColor: opt.keepColor === void 0 ? props.keepColor : opt.keepColor,
          "onUpdate:modelValue": onUpdateModelValue
        }, child)
      ]);
    }));
  }
});
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ActorComponent",
  props: {
    actorForm: { type: Boolean },
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
      prenom: {
        label: t("actorsComponent.inputLabels.firstName"),
        head: t("actorsComponent.headTable.firstName"),
        name: "prenom",
        placeholder: t("actorsComponent.placeholders.firstName"),
        disabled: false
      },
      nom: {
        label: t("actorsComponent.inputLabels.lastName"),
        head: t("actorsComponent.headTable.lastName"),
        name: "nom",
        placeholder: t("actorsComponent.placeholders.lastName"),
        disabled: false
      },
      email: {
        label: t("actorsComponent.inputLabels.email"),
        head: t("actorsComponent.headTable.email"),
        name: "email",
        placeholder: t("actorsComponent.placeholders.email"),
        disabled: false
      },
      numRue: {
        label: t("actorsComponent.inputLabels.streetNum"),
        head: t("actorsComponent.headTable.streetNum"),
        name: "numRue",
        placeholder: t("actorsComponent.placeholders.streetNum"),
        disabled: false
      },
      nomRue: {
        label: t("actorsComponent.inputLabels.streetName"),
        head: t("actorsComponent.headTable.streetName"),
        name: "nomRue",
        placeholder: t("actorsComponent.placeholders.streetName"),
        disabled: false
      },
      cp: {
        label: t("actorsComponent.inputLabels.cp"),
        head: t("actorsComponent.headTable.cp"),
        name: "cp",
        placeholder: t("actorsComponent.placeholders.cp"),
        disabled: false
      },
      ville: {
        label: t("actorsComponent.inputLabels.city"),
        head: t("actorsComponent.headTable.city"),
        name: "ville",
        placeholder: t("actorsComponent.placeholders.city"),
        disabled: false
      },
      tel: {
        label: t("actorsComponent.inputLabels.tel"),
        head: t("actorsComponent.headTable.tel"),
        name: "tel",
        placeholder: t("actorsComponent.placeholders.tel"),
        disabled: false
      },
      numCommercant: {
        label: t("actorsComponent.inputLabels.sellerNum"),
        head: t("actorsComponent.headTable.sellerNum"),
        name: "numCommercant",
        placeholder: t("actorsComponent.placeholders.sellerNum"),
        disabled: false
      },
      personne_type: {
        label: t("actorsComponent.inputLabels.type"),
        head: t("actorsComponent.headTable.type"),
        name: "personne_type",
        placeholder: t("actorsComponent.placeholders.type"),
        disabled: false
      }
    };
    const addInputObject = {
      prenom: displayInputObject.prenom,
      nom: displayInputObject.nom,
      email: displayInputObject.email,
      numRue: displayInputObject.numRue,
      nomRue: displayInputObject.nomRue,
      cp: displayInputObject.cp,
      ville: displayInputObject.ville,
      tel: displayInputObject.tel,
      numCommercant: displayInputObject.numCommercant,
      personne_type: displayInputObject.personne_type,
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
    const isForm = ref(props.actorForm);
    const messageVisibility = ref(false);
    const actorId = ref(0);
    const prenom = ref("");
    const nom = ref("");
    const email = ref("");
    const numRue = ref("");
    const nomRue = ref("");
    const cp = ref("");
    const ville = ref("");
    const tel = ref("");
    const numCommercant = ref(null);
    const checkboxOptionTypes = ref([
      { label: t("actorsComponent.inputLabels.buyerType"), value: "3" },
      { label: t("actorsComponent.inputLabels.sellerType"), value: "2" }
    ]);
    const types = ref([]);
    const formState = {
      update: false,
      add: true
    };
    const defaultRow = ref([]);
    const validPrenom = computed(() => {
      const re = /^(([a-zA-Z])(\-)*){2,15}$/;
      return re.test(prenom.value);
    });
    const nonEmptyPrenom = computed(() => {
      return !!prenom.value && prenom.value != "";
    });
    const validNom = computed(() => {
      const re = /^([a-zA-Z]){2,15}$/;
      return re.test(nom.value);
    });
    const nonEmptyNom = computed(() => {
      return !!nom.value && nom.value != "";
    });
    const validEmail = computed(() => {
      return true;
    });
    const nonEmptyEmail = computed(() => {
      return !!email.value && email.value != "";
    });
    const validNumRue = computed(() => {
      const re = /^(([0-9])(bis|ter)*)+$/i;
      return re.test(numRue.value);
    });
    const nonEmptyNumRue = computed(() => {
      return !!numRue.value && numRue.value != "";
    });
    const validNomRue = computed(() => {
      const re = /^(([a-zA-Z])([\-\s])*){2,50}$/;
      return re.test(nomRue.value);
    });
    const nonEmptyNomRue = computed(() => {
      return !!nomRue.value && nomRue.value != "";
    });
    const validCp = computed(() => {
      const re = /^([0-9]){5}$/;
      return re.test(cp.value);
    });
    const nonEmptyCp = computed(() => {
      return !!cp.value && cp.value != "";
    });
    const validVille = computed(() => {
      const re = /^(([a-zA-Z])(\-)*){2,50}$/;
      return re.test(ville.value);
    });
    const nonEmptyVille = computed(() => {
      return !!ville.value && ville.value != "";
    });
    const validTel = computed(() => {
      const re = /^([0-9]){10}$/;
      return re.test(tel.value);
    });
    const nonEmptyTel = computed(() => {
      return !!tel.value && tel.value != "";
    });
    const validNumCommercant = computed(() => {
      const re = /^([0-9])+$/;
      return re.test(numCommercant.value);
    });
    const nonEmptyNumCommercant = computed(() => {
      return !!numCommercant.value && numCommercant.value != "";
    });
    const nonEmptyType = computed(() => {
      return !types.value.length ? false : true;
    });
    const formSubmitButtonState = computed(() => {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      const ret1 = !(validPrenom.value && nonEmptyPrenom.value && validNom.value && nonEmptyNom.value && validEmail.value && nonEmptyEmail.value && validNumRue.value && nonEmptyNumRue.value && validNomRue.value && nonEmptyNomRue.value && validCp.value && nonEmptyCp.value && validVille.value && nonEmptyVille.value && validTel.value && nonEmptyTel.value && nonEmptyType.value);
      const ret2 = !(actorType === 3 || validNumCommercant.value && nonEmptyNumCommercant.value);
      return ret1 || ret2;
    });
    const numCommercantState = computed(() => {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      setNumCommercantValue(actorType);
      return actorType === 2 || actorType === 1 ? false : true;
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
    function setNumCommercantValue(actorType) {
      numCommercant.value = actorType === 3 ? null : numCommercant.value;
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
    async function addClickFromChild(e, db) {
      e.preventDefault();
      if (!db) {
        actorId.value = 0;
        prenom.value = "";
        nom.value = "";
        email.value = "";
        numRue.value = "";
        nomRue.value = "";
        cp.value = "";
        ville.value = "";
        tel.value = "";
        types.value = [];
        numCommercant.value = null;
        adminPropRef.value = true;
        displayPropRef.value = false;
        isForm.value = true;
        formState.update = false;
        formState.add = true;
        defaultRow.value[0] = {
          actorId: 0,
          prenom: "",
          nom: "",
          email: "",
          numRue: "",
          nomRue: "",
          cp: "",
          ville: "",
          tel: "",
          personne_type: [],
          numCommercant: "",
          actions: ""
        };
        forceTableRerender();
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await insertActorInDb();
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
          ret = await insertActorInSQLiteDb();
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
            message: t("actorsComponent.results.ok.add")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("actorsComponent.results.ko.add")
          });
        }
      }
    }
    async function updateClickFromChild(e, db, obj = null) {
      e.preventDefault();
      if (!db) {
        let actorType = [];
        actorType = obj.personne_type.actorTypeId === 1 ? ["2", "3"] : [new String(obj.personne_type.actorTypeId).valueOf()];
        isForm.value = true;
        formState.update = true;
        formState.add = false;
        defaultRow.value[0] = {
          actorId: obj.actorId,
          prenom: obj.prenom,
          nom: obj.nom,
          email: obj.email,
          numRue: obj.numRue,
          nomRue: obj.nomRue,
          cp: obj.cp,
          ville: obj.ville,
          tel: obj.tel,
          personne_type: actorType,
          numCommercant: obj.numCommercant,
          actions: ""
        };
        actorId.value = obj.actorId;
        prenom.value = obj.prenom;
        nom.value = obj.nom;
        email.value = obj.email;
        numRue.value = obj.numRue;
        nomRue.value = obj.nomRue;
        cp.value = obj.cp;
        ville.value = obj.ville;
        tel.value = obj.tel;
        types.value = actorType;
        numCommercant.value = obj.numCommercant;
      } else {
        let ret;
        if (platform.is.desktop) {
          ret = await updateActorInDb();
          if (ret) {
            isForm.value = false;
            formState.update = false;
            formState.add = true;
          }
          forceTableRerender();
        } else {
          ret = await updateActorInSQLiteDb();
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
            message: t("actorsComponent.results.ok.update")
          });
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("actorsComponent.results.ko.update")
          });
        }
      }
    }
    async function deleteClickFromChild(e, id) {
      e.preventDefault();
      actorId.value = id;
      let ret;
      if (platform.is.desktop) {
        ret = deleteActorFromDb();
        if (ret) {
          isForm.value = false;
          formState.update = false;
          formState.add = true;
        }
        forceTableRerender();
      } else {
        ret = deleteActorFromSQLiteDb();
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
          message: t("actorsComponent.results.ok.delete")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("actorsComponent.results.ko.delete")
        });
      }
    }
    async function insertActorInDb() {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      const obj = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        numRue: numRue.value,
        nomRue: nomRue.value,
        cp: cp.value,
        ville: ville.value,
        tel: tel.value,
        type: actorType,
        numCommercant: numCommercant.value
      };
      await transformObject(obj);
      return actorAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("actorsComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.mssages.push({
          severity: true,
          content: t("actorsComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function insertActorInSQLiteDb() {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      const obj = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        numRue: numRue.value,
        nomRue: nomRue.value,
        cp: cp.value,
        ville: ville.value,
        tel: tel.value,
        type: actorType,
        numCommercant: numCommercant.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = "INSERT INTO `personne` (`prenom`, `nom`, `email`, `numRue`, `nomRue`, `cp`, `ville`, `tel`, `actorTypeId`, `numCommercant`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const values = await newRun(props.dbConn, sql, [obj.prenom, obj.nom, obj.email, obj.numRue, obj.nomRue, obj.cp, obj.ville, obj.tel, obj.type, obj.numCommercant]);
        let ret = false;
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("actorsComponent.results.ok.add")
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
                content: t("actorsComponent.results.ko.add", { err: "Adding actor in SQLite DB !" })
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
            content: t("actorsComponent.results.ko.add", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    async function updateActorInDb() {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      const obj = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        numRue: numRue.value,
        nomRue: nomRue.value,
        cp: cp.value,
        ville: ville.value,
        tel: tel.value,
        actorTypeId: actorType,
        numCommercant: numCommercant.value
      };
      await transformObject(obj);
      return actorAxiosService.update(actorId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("actorsComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility = true;
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("actorsComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility = true;
        return false;
      });
    }
    async function updateActorInSQLiteDb() {
      let actorType = 0;
      actorType = types.value.length == 2 ? 1 : actorType;
      actorType = types.value.length == 1 ? parseInt(types.value[0]) : actorType;
      const obj = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        numRue: numRue.value,
        nomRue: nomRue.value,
        cp: cp.value,
        ville: ville.value,
        tel: tel.value,
        type: actorType,
        numCommercant: numCommercant.value
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        const sql = "UPDATE `personne` SET `prenom`=?, `nom`=?, `email`=?, `numRue`=?, `nomRue`=?, `cp`=?, `ville`=?, `tel`=?, `actorTypeId`=?, `numCommercant`=? WHERE `actorId` = ?;";
        const values = await newRun(props.dbConn, sql, [obj.prenom, obj.nom, obj.email, obj.numRue, obj.nomRue, obj.cp, obj.ville, obj.tel, obj.type, obj.numCommercant, actorId.value]);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("actorsComponent.results.ok.update")
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
                content: t("actorsComponent.results.ko.update", { err: "Updating actor in SQLite DB !" })
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
            content: t("actorsComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
          }
        ],
        messageVisibility: true
      });
      messageVisibility.value = true;
      return false;
    }
    function deleteActorFromDb() {
      return actorAxiosService.delete(actorId.value).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("actorsComponent.results.ok.delete")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("actorsComponent.results.ko.delete", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function deleteActorFromSQLiteDb() {
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        let ret = false;
        const sql = `DELETE FROM \`personne\` WHERE \`actorId\`= '${actorId.value}';`;
        const values = await newRun(props.dbConn, sql);
        if (values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("actorsComponent.results.ok.delete")
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
                content: t("actorsComponent.results.ko.delete", { err: "Deleting actor from SQLite DB !" })
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
            content: t("actorsComponent.results.ko.delete", { err: "Unable to open SQLite DB !" })
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
      () => [props.admin, props.display, props.actorForm],
      ([newAdminProp, newDisplayProp, newActorForm]) => {
        adminPropRef.value = newAdminProp;
        displayPropRef.value = newDisplayProp;
        isForm.value = newActorForm;
        forceTableRerender();
      }
    );
    provide("src", "actors");
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
            tableTitle: unref(t)("actorsComponent.tableTitle"),
            isForm: isForm.value,
            addForm: "actorForm",
            tableObj: adminPropRef.value ? addInputObject : displayInputObject,
            addDefaultRow: defaultRow.value,
            addActionName: "addClick",
            onAddClick: addClickFromChild,
            updateActionName: "updateClick",
            onUpdateClick: updateClickFromChild,
            deleteActionName: "deleteClick",
            onDeleteClick: deleteClickFromChild,
            ident: "actorId",
            updating: formState.update,
            adding: formState.add,
            admin: __props.admin,
            display: __props.display,
            no_data_label: unref(t)("actorsComponent.errors.empty.tableBodyContentText"),
            no_data_button_text: unref(t)("actorsComponent.errors.empty.buttonAdding"),
            colSpan: "4",
            dbConn: __props.dbConn
          }, {
            actorForm: withCtx(() => [
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
                    modelValue: prenom.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => prenom.value = $event),
                    type: "text",
                    name: addInputObject.prenom.name,
                    label: addInputObject.prenom.label,
                    hint: unref(t)("actorsComponent.hints.firstName"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 15,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.firstName"),
                    rules: [
                      (val) => unref(nonEmptyPrenom) || unref(t)("actorsComponent.errors.empty.firstName"),
                      (val) => unref(validPrenom) || unref(t)("actorsComponent.errors.error.firstName")
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
                    modelValue: nom.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => nom.value = $event),
                    type: "text",
                    name: addInputObject.nom.name,
                    label: addInputObject.nom.label,
                    hint: unref(t)("actorsComponent.hints.lastName"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 15,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.lastName"),
                    rules: [
                      (val) => unref(nonEmptyNom) || unref(t)("actorsComponent.errors.empty.lastName"),
                      (val) => unref(validNom) || unref(t)("actorsComponent.errors.error.lastName")
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
                    modelValue: email.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => email.value = $event),
                    type: "email",
                    name: addInputObject.email.name,
                    label: addInputObject.email.label,
                    hint: unref(t)("actorsComponent.hints.email"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 50,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.email"),
                    rules: [
                      (val) => unref(nonEmptyEmail) || unref(t)("actorsComponent.errors.empty.email"),
                      (val) => unref(validEmail) || unref(t)("actorsComponent.errors.error.email")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "mail" })
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
                    modelValue: numRue.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => numRue.value = $event),
                    type: "text",
                    name: addInputObject.numRue.name,
                    label: addInputObject.numRue.label,
                    hint: unref(t)("actorsComponent.hints.streetNum"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 15,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.streetNum"),
                    rules: [
                      (val) => unref(nonEmptyNumRue) || unref(t)("actorsComponent.errors.empty.streetNum"),
                      (val) => unref(validNumRue) || unref(t)("actorsComponent.errors.error.streetNum")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "signpost" })
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
                    modelValue: nomRue.value,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => nomRue.value = $event),
                    type: "text",
                    name: addInputObject.nomRue.name,
                    label: addInputObject.nomRue.label,
                    hint: unref(t)("actorsComponent.hints.streetName"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 50,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.streetName"),
                    rules: [
                      (val) => unref(nonEmptyNomRue) || unref(t)("actorsComponent.errors.empty.streetName"),
                      (val) => unref(validNomRue) || unref(t)("actorsComponent.errors.error.streetName")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "signpost" })
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
                    modelValue: cp.value,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => cp.value = $event),
                    type: "text",
                    name: addInputObject.cp.name,
                    label: addInputObject.cp.label,
                    hint: unref(t)("actorsComponent.hints.cp"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 15,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.cp"),
                    rules: [
                      (val) => unref(nonEmptyCp) || unref(t)("actorsComponent.errors.empty.cp"),
                      (val) => unref(validCp) || unref(t)("actorsComponent.errors.error.cp")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "local_post_office" })
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
                    modelValue: ville.value,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => ville.value = $event),
                    type: "text",
                    name: addInputObject.ville.name,
                    label: addInputObject.ville.label,
                    hint: unref(t)("actorsComponent.hints.city"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 50,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.city"),
                    rules: [
                      (val) => unref(nonEmptyVille) || unref(t)("actorsComponent.errors.empty.city"),
                      (val) => unref(validVille) || unref(t)("actorsComponent.errors.error.city")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "location_city" })
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
                    modelValue: tel.value,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => tel.value = $event),
                    type: "tel",
                    name: addInputObject.tel.name,
                    label: addInputObject.tel.label,
                    hint: unref(t)("actorsComponent.hints.tel"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 10,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.tel"),
                    rules: [
                      (val) => unref(nonEmptyTel) || unref(t)("actorsComponent.errors.empty.tel"),
                      (val) => unref(validTel) || unref(t)("actorsComponent.errors.error.tel")
                    ]
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "call" })
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
                    modelValue: numCommercant.value,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => numCommercant.value = $event),
                    type: "text",
                    name: addInputObject.numCommercant.name,
                    label: addInputObject.numCommercant.label,
                    hint: unref(t)("actorsComponent.hints.sellerNum"),
                    "hide-hint": true,
                    counter: false,
                    autogrow: false,
                    maxlength: 15,
                    clearable: true,
                    dense: unref(compact),
                    placeholders: unref(t)("actorsComponent.placeholders.sellerNum"),
                    rules: [
                      (val) => unref(nonEmptyNumCommercant) || unref(t)("actorsComponent.errors.empty.sellerNum"),
                      (val) => unref(validNumCommercant) || unref(t)("actorsComponent.errors.error.sellerNum")
                    ],
                    disable: unref(numCommercantState)
                  }, createSlots({ _: 2 }, [
                    unref(platform).is.desktop ? {
                      name: "prepend",
                      fn: withCtx(() => [
                        createVNode(QIcon, { name: "storefront" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["modelValue", "name", "label", "hint", "dense", "placeholders", "rules", "disable"])
                ]),
                _: 1
              }),
              createVNode(QTd, { style: { "text-align": "center" } }, {
                default: withCtx(() => [
                  createVNode(QOptionGroup, {
                    options: checkboxOptionTypes.value,
                    type: "checkbox",
                    modelValue: types.value,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => types.value = $event)
                  }, null, 8, ["options", "modelValue"])
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
                    label: unref(t)("actorsComponent.errors.empty.buttonAdding"),
                    glossy: "",
                    unelevated: "",
                    disabled: unref(formSubmitButtonState),
                    onClick: _cache[10] || (_cache[10] = ($event) => addClickFromChild($event, true))
                  }, null, 8, ["label", "disabled"])) : createCommentVNode("", true),
                  formState.update ? (openBlock(), createBlock(QBtn, {
                    key: 1,
                    color: "secondary",
                    icon: "update",
                    label: unref(t)("actorsComponent.errors.empty.buttonUpdating"),
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
var ActorComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ActorComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ActorPage",
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
    const actorForm = ref(false);
    if (route.params.type !== "") {
      adminProp.value = route.params.type === "admin" ? true : false;
      displayProp.value = route.params.type === "display" ? true : false;
    }
    watch(
      route,
      async (newR) => {
        adminProp.value = newR.params.type === "admin" ? true : false;
        displayProp.value = newR.params.type === "display" ? true : false;
        actorForm.value = false;
        forceActorRenderer();
      }
    );
    async function forceActorRenderer() {
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
          renderComponent.value ? (openBlock(), createBlock(ActorComponent, {
            key: 0,
            actorForm: actorForm.value,
            admin: adminProp.value,
            display: displayProp.value,
            dbConn: __props.dbConn
          }, null, 8, ["actorForm", "admin", "display", "dbConn"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
var ActorPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ActorPage.vue"]]);
export { ActorPage as default };
//# sourceMappingURL=data:application/json;base64,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U0FBUyxZQUFZLE9BQU87QUFDNUQsa0JBQVUsUUFBUTtBQUNDO01BQ3JCO0FBQUE7QUFJRixtQkFBZSxxQkFBcUI7QUFDbEMsc0JBQWdCLFFBQVE7QUFDeEIsWUFBTSxTQUFTO0FBQ2Ysc0JBQWdCLFFBQVE7QUFBQSxJQUMxQjtBQUdBLGNBQVUsTUFBTTtBQUNkLFdBQUssY0FBYyxNQUFTO0FBQUEsS0FDN0IiLCJuYW1lcyI6WyJhdHRycyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmFkaW8vUVJhZGlvLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b2dnbGUvUVRvZ2dsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvb3B0aW9uLWdyb3VwL1FPcHRpb25Hcm91cC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FjdG9yQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9BY3RvclBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgdG9SYXcgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9vcHRpb24tc2l6ZXMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc3ZnID0gaCgnc3ZnJywge1xuICBrZXk6ICdzdmcnLFxuICBjbGFzczogJ3EtcmFkaW9fX2JnIGFic29sdXRlIG5vbi1zZWxlY3RhYmxlJyxcbiAgdmlld0JveDogJzAgMCAyNCAyNCdcbn0sIFtcbiAgaCgncGF0aCcsIHtcbiAgICBkOiAnTTEyLDIyYTEwLDEwIDAgMCAxIC0xMCwtMTBhMTAsMTAgMCAwIDEgMTAsLTEwYTEwLDEwIDAgMCAxIDEwLDEwYTEwLDEwIDAgMCAxIC0xMCwxMG0wLC0yMmExMiwxMiAwIDAgMCAtMTIsMTJhMTIsMTIgMCAwIDAgMTIsMTJhMTIsMTIgMCAwIDAgMTIsLTEyYTEyLDEyIDAgMCAwIC0xMiwtMTInXG4gIH0pLFxuXG4gIGgoJ3BhdGgnLCB7XG4gICAgY2xhc3M6ICdxLXJhZGlvX19jaGVjaycsXG4gICAgZDogJ00xMiw2YTYsNiAwIDAgMCAtNiw2YTYsNiAwIDAgMCA2LDZhNiw2IDAgMCAwIDYsLTZhNiw2IDAgMCAwIC02LC02J1xuICB9KVxuXSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSYWRpbycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlU2l6ZVByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB2YWw6IHsgcmVxdWlyZWQ6IHRydWUgfSxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gICAgY2hlY2tlZEljb246IFN0cmluZyxcbiAgICB1bmNoZWNrZWRJY29uOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBvcHRpb25TaXplcylcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcblxuICAgIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy52YWwpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1yYWRpbyBjdXJzb3ItcG9pbnRlciBuby1vdXRsaW5lIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1yYWRpby0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXJhZGlvLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLmxlZnRMYWJlbCA9PT0gdHJ1ZSA/ICcgcmV2ZXJzZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIChcbiAgICAgICAgcHJvcHMua2VlcENvbG9yID09PSB0cnVlXG4gICAgICAgIHx8IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgKVxuICAgICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgICA6ICcnXG5cbiAgICAgIHJldHVybiAncS1yYWRpb19faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICArIGBxLXJhZGlvX19pbm5lci0tJHsgaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAnZmFsc3knIH0keyBjb2xvciB9YFxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jaGVja2VkSWNvblxuICAgICAgICA6IHByb3BzLnVuY2hlY2tlZEljb25cbiAgICAgICkgfHwgbnVsbFxuICAgIClcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/IC0xIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICAgICkpXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0geyB0eXBlOiAncmFkaW8nIH1cblxuICAgICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZXh0cmFzL3JlbmRlci1mdW5jdGlvbi5odG1sI2NyZWF0aW5nLXZub2RlcyAoLnByb3ApXG4gICAgICAgICcuY2hlY2tlZCc6IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgICB2YWx1ZTogcHJvcHMudmFsXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcFxuICAgIH0pXG5cbiAgICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgcmVmb2N1c1RhcmdldChlKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc1RydWUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy52YWwsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBvbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzZXQ6IG9uQ2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaWNvbi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaWNvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1yYWRpb19faWNvbi1jb250YWluZXIgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2ljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgc3ZnIF1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbmplY3RGb3JtSW5wdXQoXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgICd1bnNoaWZ0JyxcbiAgICAgICAgJyBxLXJhZGlvX19uYXRpdmUgcS1tYS1ub25lIHEtcGEtbm9uZSdcbiAgICAgIClcblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9LCBjb250ZW50KVxuICAgICAgXVxuXG4gICAgICBpZiAocmVmb2N1c1RhcmdldEVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgICBsYWJlbCAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2xhYmVsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBsYWJlbClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICByb2xlOiAncmFkaW8nLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICAnYXJpYS1jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJ3RydWUnIDogdm9pZCAwLFxuICAgICAgICBvbkNsaWNrLFxuICAgICAgICBvbktleWRvd24sXG4gICAgICAgIG9uS2V5dXBcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHVzZUNoZWNrYm94LCB7IHVzZUNoZWNrYm94UHJvcHMsIHVzZUNoZWNrYm94RW1pdHMgfSBmcm9tICcuLi9jaGVja2JveC91c2UtY2hlY2tib3guanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvZ2dsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VDaGVja2JveFByb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25Db2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IHVzZUNoZWNrYm94RW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgZnVuY3Rpb24gZ2V0SW5uZXIgKGlzVHJ1ZSwgaXNJbmRldGVybWluYXRlKSB7XG4gICAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMuY2hlY2tlZEljb25cbiAgICAgICAgICA6IChpc0luZGV0ZXJtaW5hdGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pbmRldGVybWluYXRlSWNvbiA6IHByb3BzLnVuY2hlY2tlZEljb24pXG4gICAgICAgICkgfHwgcHJvcHMuaWNvblxuICAgICAgKVxuXG4gICAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IChpc1RydWUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pY29uQ29sb3IgOiBudWxsKSlcblxuICAgICAgcmV0dXJuICgpID0+IFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdG9nZ2xlX190cmFjaycgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10b2dnbGVfX3RodW1iIGFic29sdXRlIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgfSwgaWNvbi52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpY29uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4gdXNlQ2hlY2tib3goJ3RvZ2dsZScsIGdldElubmVyKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFSYWRpbyBmcm9tICcuLi9yYWRpby9RUmFkaW8uanMnXG5pbXBvcnQgUUNoZWNrYm94IGZyb20gJy4uL2NoZWNrYm94L1FDaGVja2JveC5qcydcbmltcG9ydCBRVG9nZ2xlIGZyb20gJy4uL3RvZ2dsZS9RVG9nZ2xlLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuY29uc3QgY29tcG9uZW50cyA9IHtcbiAgcmFkaW86IFFSYWRpbyxcbiAgY2hlY2tib3g6IFFDaGVja2JveCxcbiAgdG9nZ2xlOiBRVG9nZ2xlXG59XG5cbmNvbnN0IHR5cGVWYWx1ZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU9wdGlvbkdyb3VwJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHZhbGlkYXRvcjogb3B0cyA9PiBvcHRzLmV2ZXJ5KG9wdCA9PiAndmFsdWUnIGluIG9wdCAmJiAnbGFiZWwnIGluIG9wdClcbiAgICB9LFxuXG4gICAgbmFtZTogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgZGVmYXVsdDogJ3JhZGlvJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiB0eXBlVmFsdWVzLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAga2VlcENvbG9yOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgc2l6ZTogU3RyaW5nLFxuXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGlubGluZTogQm9vbGVhbixcbiAgICBkaXNhYmxlOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0LCBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgYXJyYXlNb2RlbCA9IEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIGlmIChwcm9wcy50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICBpZiAoYXJyYXlNb2RlbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdxLW9wdGlvbi1ncm91cDogbW9kZWwgc2hvdWxkIG5vdCBiZSBhcnJheScpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGFycmF5TW9kZWwgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdxLW9wdGlvbi1ncm91cDogbW9kZWwgc2hvdWxkIGJlIGFycmF5IGluIHlvdXIgY2FzZScpXG4gICAgfVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wdXRlZCgoKSA9PiBjb21wb25lbnRzWyBwcm9wcy50eXBlIF0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLW9wdGlvbi1ncm91cCBxLWd1dHRlci14LXNtJ1xuICAgICAgKyAocHJvcHMuaW5saW5lID09PSB0cnVlID8gJyBxLW9wdGlvbi1ncm91cC0taW5saW5lJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7IHJvbGU6ICdncm91cCcgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBhdHRycy5yb2xlID0gJ3JhZGlvZ3JvdXAnXG5cbiAgICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICBhdHRyc1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25VcGRhdGVNb2RlbFZhbHVlICh2YWx1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAuLi5hdHRycy52YWx1ZVxuICAgIH0sIHByb3BzLm9wdGlvbnMubWFwKChvcHQsIGkpID0+IHtcbiAgICAgIC8vIFRPRE86IChRdjMpIE1ha2UgdGhlICdvcHQnIGEgc2VwYXJhdGUgcHJvcGVydHkgaW5zdGVhZCBvZlxuICAgICAgLy8gdGhlIHdob2xlIHNjb3BlIGZvciBjb25zaXN0ZW5jeSBhbmQgZmxleGliaWxpdHlcbiAgICAgIC8vIChlLmcuIHsgb3B0IH0gaW5zdGVhZCBvZiBvcHQpXG4gICAgICBjb25zdCBjaGlsZCA9IHNsb3RzWyAnbGFiZWwtJyArIGkgXSAhPT0gdm9pZCAwXG4gICAgICAgID8gKCkgPT4gc2xvdHNbICdsYWJlbC0nICsgaSBdKG9wdClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBzbG90cy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gc2xvdHMubGFiZWwob3B0KVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIFtcbiAgICAgICAgaChjb21wb25lbnQudmFsdWUsIHtcbiAgICAgICAgICBtb2RlbFZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgICAgICAgIHZhbDogb3B0LnZhbHVlLFxuICAgICAgICAgIG5hbWU6IG9wdC5uYW1lID09PSB2b2lkIDAgPyBwcm9wcy5uYW1lIDogb3B0Lm5hbWUsXG4gICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSB8fCBvcHQuZGlzYWJsZSxcbiAgICAgICAgICBsYWJlbDogY2hpbGQgPT09IHZvaWQgMCA/IG9wdC5sYWJlbCA6IG51bGwsXG4gICAgICAgICAgbGVmdExhYmVsOiBvcHQubGVmdExhYmVsID09PSB2b2lkIDAgPyBwcm9wcy5sZWZ0TGFiZWwgOiBvcHQubGVmdExhYmVsLFxuICAgICAgICAgIGNvbG9yOiBvcHQuY29sb3IgPT09IHZvaWQgMCA/IHByb3BzLmNvbG9yIDogb3B0LmNvbG9yLFxuICAgICAgICAgIGNoZWNrZWRJY29uOiBvcHQuY2hlY2tlZEljb24sXG4gICAgICAgICAgdW5jaGVja2VkSWNvbjogb3B0LnVuY2hlY2tlZEljb24sXG4gICAgICAgICAgZGFyazogb3B0LmRhcmsgfHwgaXNEYXJrLnZhbHVlLFxuICAgICAgICAgIHNpemU6IG9wdC5zaXplID09PSB2b2lkIDAgPyBwcm9wcy5zaXplIDogb3B0LnNpemUsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgIGtlZXBDb2xvcjogb3B0LmtlZXBDb2xvciA9PT0gdm9pZCAwID8gcHJvcHMua2VlcENvbG9yIDogb3B0LmtlZXBDb2xvcixcbiAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IG9uVXBkYXRlTW9kZWxWYWx1ZVxuICAgICAgICB9LCBjaGlsZClcbiAgICAgIF0pXG4gICAgfSkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLW5vLXNzcj5cbiAgICA8TWVzc2FnZXNJdGVtIHYtaWY9J21lc3NhZ2VWaXNpYmlsaXR5ICYmIHJlbmRlckNvbXBvbmVudCc+PC9NZXNzYWdlc0l0ZW0+XG4gIDwvcS1uby1zc3I+XG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj5cbiAgICA8dGFibGUtaXRlbVxuICAgICAgOnRhYmxlVGl0bGU9J3QoXCJhY3RvcnNDb21wb25lbnQudGFibGVUaXRsZVwiKSdcbiAgICAgIDppc0Zvcm09J2lzRm9ybSdcbiAgICAgIGFkZEZvcm09J2FjdG9yRm9ybSdcbiAgICAgIDp0YWJsZU9iaj0nYWRtaW5Qcm9wUmVmID8gYWRkSW5wdXRPYmplY3QgOiBkaXNwbGF5SW5wdXRPYmplY3QnXG4gICAgICA6YWRkRGVmYXVsdFJvdz0nZGVmYXVsdFJvdydcbiAgICAgIGFkZEFjdGlvbk5hbWU9J2FkZENsaWNrJ1xuICAgICAgQGFkZENsaWNrPSdhZGRDbGlja0Zyb21DaGlsZCdcbiAgICAgIHVwZGF0ZUFjdGlvbk5hbWU9J3VwZGF0ZUNsaWNrJ1xuICAgICAgQHVwZGF0ZUNsaWNrPSd1cGRhdGVDbGlja0Zyb21DaGlsZCdcbiAgICAgIGRlbGV0ZUFjdGlvbk5hbWU9J2RlbGV0ZUNsaWNrJ1xuICAgICAgQGRlbGV0ZUNsaWNrPSdkZWxldGVDbGlja0Zyb21DaGlsZCdcbiAgICAgIGlkZW50PSdhY3RvcklkJ1xuICAgICAgOnVwZGF0aW5nPSdmb3JtU3RhdGUudXBkYXRlJ1xuICAgICAgOmFkZGluZz0nZm9ybVN0YXRlLmFkZCdcbiAgICAgIHYtaWY9J3JlbmRlckNvbXBvbmVudCdcbiAgICAgIDphZG1pbj0nYWRtaW4nXG4gICAgICA6ZGlzcGxheT0nZGlzcGxheSdcbiAgICAgIDpub19kYXRhX2xhYmVsPSd0KFwiYWN0b3JzQ29tcG9uZW50LmVycm9ycy5lbXB0eS50YWJsZUJvZHlDb250ZW50VGV4dFwiKSdcbiAgICAgIDpub19kYXRhX2J1dHRvbl90ZXh0PSd0KFwiYWN0b3JzQ29tcG9uZW50LmVycm9ycy5lbXB0eS5idXR0b25BZGRpbmdcIiknXG4gICAgICBjb2xTcGFuPSc0J1xuICAgICAgOmRiQ29ubj0nZGJDb25uJz5cbiAgICAgIDx0ZW1wbGF0ZSAjYWN0b3JGb3JtPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaWNvbiA6bmFtZT0nZm9ybVN0YXRlLmFkZCA/IFwiYWRkXCIgOiBcInVwZGF0ZVwiJyBzaXplPSdzbSc+PC9xLWljb24+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPSdwcmVub20nXG4gICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0LnByZW5vbS5uYW1lJ1xuICAgICAgICAgICAgOmxhYmVsPSdhZGRJbnB1dE9iamVjdC5wcmVub20ubGFiZWwnXG4gICAgICAgICAgICA6aGludD1cInQoJ2FjdG9yc0NvbXBvbmVudC5oaW50cy5maXJzdE5hbWUnKVwiXG4gICAgICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgICAgICA6Y291bnRlcj0nZmFsc2UnXG4gICAgICAgICAgICA6YXV0b2dyb3c9J2ZhbHNlJ1xuICAgICAgICAgICAgOm1heGxlbmd0aD0nMTUnXG4gICAgICAgICAgICA6Y2xlYXJhYmxlPSd0cnVlJ1xuICAgICAgICAgICAgOmRlbnNlPVwiY29tcGFjdFwiXG4gICAgICAgICAgICA6cGxhY2Vob2xkZXJzPSd0KFwiYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5maXJzdE5hbWVcIiknXG4gICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5UHJlbm9tIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmZpcnN0TmFtZVwiKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkUHJlbm9tIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVycm9yLmZpcnN0TmFtZVwiKSxcbiAgICAgICAgICAgICAgXSdcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nYmFkZ2UnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9J25vbSdcbiAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3Qubm9tLm5hbWUnXG4gICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0Lm5vbS5sYWJlbCdcbiAgICAgICAgICAgIDpoaW50PVwidCgnYWN0b3JzQ29tcG9uZW50LmhpbnRzLmxhc3ROYW1lJylcIlxuICAgICAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgOmF1dG9ncm93PSdmYWxzZSdcbiAgICAgICAgICAgIDptYXhsZW5ndGg9JzE1J1xuICAgICAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgOnBsYWNlaG9sZGVycz0ndChcImFjdG9yc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMubGFzdE5hbWVcIiknXG4gICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5Tm9tIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5Lmxhc3ROYW1lXCIpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWROb20gfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZXJyb3IubGFzdE5hbWVcIiksXG4gICAgICAgICAgICBdJ1xuICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nYmFkZ2UnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9J2VtYWlsJ1xuICAgICAgICAgICAgdHlwZT0nZW1haWwnXG4gICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QuZW1haWwubmFtZSdcbiAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuZW1haWwubGFiZWwnXG4gICAgICAgICAgICA6aGludD1cInQoJ2FjdG9yc0NvbXBvbmVudC5oaW50cy5lbWFpbCcpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPSc1MCdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmVtYWlsXCIpJ1xuICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eUVtYWlsIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmVtYWlsXCIpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWRFbWFpbCB8fCB0KFwiYWN0b3JzQ29tcG9uZW50LmVycm9ycy5lcnJvci5lbWFpbFwiKSxcbiAgICAgICAgICAgICAgXSdcbiAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J21haWwnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9J251bVJ1ZSdcbiAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QubnVtUnVlLm5hbWUnXG4gICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0Lm51bVJ1ZS5sYWJlbCdcbiAgICAgICAgICAgIDpoaW50PVwidCgnYWN0b3JzQ29tcG9uZW50LmhpbnRzLnN0cmVldE51bScpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPScxNSdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnN0cmVldE51bVwiKSdcbiAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlOdW1SdWUgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuc3RyZWV0TnVtXCIpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWROdW1SdWUgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZXJyb3Iuc3RyZWV0TnVtXCIpLFxuICAgICAgICAgICAgXSdcbiAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3NpZ25wb3N0Jy8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPSdub21SdWUnXG4gICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0Lm5vbVJ1ZS5uYW1lJ1xuICAgICAgICAgICAgOmxhYmVsPSdhZGRJbnB1dE9iamVjdC5ub21SdWUubGFiZWwnXG4gICAgICAgICAgICA6aGludD1cInQoJ2FjdG9yc0NvbXBvbmVudC5oaW50cy5zdHJlZXROYW1lJylcIlxuICAgICAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICAgICAgOmNvdW50ZXI9J2ZhbHNlJ1xuICAgICAgICAgICAgOmF1dG9ncm93PSdmYWxzZSdcbiAgICAgICAgICAgIDptYXhsZW5ndGg9JzUwJ1xuICAgICAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgICAgIDpkZW5zZT1cImNvbXBhY3RcIlxuICAgICAgICAgICAgOnBsYWNlaG9sZGVycz0ndChcImFjdG9yc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuc3RyZWV0TmFtZVwiKSdcbiAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlOb21SdWUgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuc3RyZWV0TmFtZVwiKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkTm9tUnVlIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVycm9yLnN0cmVldE5hbWVcIiksXG4gICAgICAgICAgICBdJ1xuICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kIHYtaWY9J3BsYXRmb3JtLmlzLmRlc2t0b3AnPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT0nc2lnbnBvc3QnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9J2NwJ1xuICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgIDpuYW1lPSdhZGRJbnB1dE9iamVjdC5jcCAubmFtZSdcbiAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QuY3AubGFiZWwnXG4gICAgICAgICAgICA6aGludD1cInQoJ2FjdG9yc0NvbXBvbmVudC5oaW50cy5jcCcpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPScxNSdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmNwXCIpJ1xuICAgICAgICAgICAgOnJ1bGVzPSdbXG4gICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eUNwIHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmNwXCIpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWRDcCB8fCB0KFwiYWN0b3JzQ29tcG9uZW50LmVycm9ycy5lcnJvci5jcFwiKSxcbiAgICAgICAgICAgIF0nXG4gICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdsb2NhbF9wb3N0X29mZmljZScvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDxxLXRkIHN0eWxlPSd0ZXh0LWFsaWduOiBjZW50ZXI7Jz5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD0ndmlsbGUnXG4gICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0LnZpbGxlLm5hbWUnXG4gICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnZpbGxlLmxhYmVsJ1xuICAgICAgICAgICAgOmhpbnQ9XCJ0KCdhY3RvcnNDb21wb25lbnQuaGludHMuY2l0eScpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPSc1MCdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmNpdHlcIiknXG4gICAgICAgICAgICA6cnVsZXM9J1tcbiAgICAgICAgICAgICAgdmFsID0+IG5vbkVtcHR5VmlsbGUgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkuY2l0eVwiKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkVmlsbGUgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZXJyb3IuY2l0eVwiKSxcbiAgICAgICAgICAgIF0nXG4gICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQgdi1pZj0ncGxhdGZvcm0uaXMuZGVza3RvcCc+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPSdsb2NhdGlvbl9jaXR5Jy8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgICAgPHEtdGQgc3R5bGU9J3RleHQtYWxpZ246IGNlbnRlcjsnPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPSd0ZWwnXG4gICAgICAgICAgICB0eXBlPSd0ZWwnXG4gICAgICAgICAgICA6bmFtZT0nYWRkSW5wdXRPYmplY3QudGVsLm5hbWUnXG4gICAgICAgICAgICA6bGFiZWw9J2FkZElucHV0T2JqZWN0LnRlbC5sYWJlbCdcbiAgICAgICAgICAgIDpoaW50PVwidCgnYWN0b3JzQ29tcG9uZW50LmhpbnRzLnRlbCcpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPScxMCdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnRlbFwiKSdcbiAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlUZWwgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZW1wdHkudGVsXCIpLFxuICAgICAgICAgICAgICB2YWwgPT4gdmFsaWRUZWwgfHwgdChcImFjdG9yc0NvbXBvbmVudC5lcnJvcnMuZXJyb3IudGVsXCIpLFxuICAgICAgICAgICAgXSdcbiAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J2NhbGwnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9J251bUNvbW1lcmNhbnQnXG4gICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgOm5hbWU9J2FkZElucHV0T2JqZWN0Lm51bUNvbW1lcmNhbnQubmFtZSdcbiAgICAgICAgICAgIDpsYWJlbD0nYWRkSW5wdXRPYmplY3QubnVtQ29tbWVyY2FudC5sYWJlbCdcbiAgICAgICAgICAgIDpoaW50PVwidCgnYWN0b3JzQ29tcG9uZW50LmhpbnRzLnNlbGxlck51bScpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpjb3VudGVyPSdmYWxzZSdcbiAgICAgICAgICAgIDphdXRvZ3Jvdz0nZmFsc2UnXG4gICAgICAgICAgICA6bWF4bGVuZ3RoPScxNSdcbiAgICAgICAgICAgIDpjbGVhcmFibGU9J3RydWUnXG4gICAgICAgICAgICA6ZGVuc2U9XCJjb21wYWN0XCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcnM9J3QoXCJhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnNlbGxlck51bVwiKSdcbiAgICAgICAgICAgIDpydWxlcz0nW1xuICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlOdW1Db21tZXJjYW50IHx8IHQoXCJhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LnNlbGxlck51bVwiKSxcbiAgICAgICAgICAgICAgdmFsID0+IHZhbGlkTnVtQ29tbWVyY2FudCB8fCB0KFwiYWN0b3JzQ29tcG9uZW50LmVycm9ycy5lcnJvci5zZWxsZXJOdW1cIiksXG4gICAgICAgICAgICBdJ1xuICAgICAgICAgICAgOmRpc2FibGU9J251bUNvbW1lcmNhbnRTdGF0ZSc+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZCB2LWlmPSdwbGF0Zm9ybS5pcy5kZXNrdG9wJz5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9J3N0b3JlZnJvbnQnLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyJz5cbiAgICAgICAgICA8cS1vcHRpb24tZ3JvdXBcbiAgICAgICAgICAgIDpvcHRpb25zPSdjaGVja2JveE9wdGlvblR5cGVzJ1xuICAgICAgICAgICAgdHlwZT0nY2hlY2tib3gnXG4gICAgICAgICAgICB2LW1vZGVsPSd0eXBlcyc+PC9xLW9wdGlvbi1ncm91cD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgICA8cS10ZCBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOycgY2xhc3M9XCJmbGV4LWNlbnRlclwiPlxuICAgICAgICAgIDxxLWJ0biB2LWlmPVwiZm9ybVN0YXRlLmFkZFwiXG4gICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiBcbiAgICAgICAgICAgIGljb249XCJhZGRfY2lyY2xlXCIgXG4gICAgICAgICAgICA6bGFiZWw9XCJ0KCdhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvbkFkZGluZycpXCIgXG4gICAgICAgICAgICBnbG9zc3kgdW5lbGV2YXRlZFxuICAgICAgICAgICAgOmRpc2FibGVkPVwiZm9ybVN1Ym1pdEJ1dHRvblN0YXRlXCJcbiAgICAgICAgICAgIEBjbGljaz1cImFkZENsaWNrRnJvbUNoaWxkKCRldmVudCwgdHJ1ZSlcIj4gIFxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPHEtYnRuIHYtaWY9XCJmb3JtU3RhdGUudXBkYXRlXCJcbiAgICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCIgXG4gICAgICAgICAgICBpY29uPVwidXBkYXRlXCIgXG4gICAgICAgICAgICA6bGFiZWw9XCJ0KCdhY3RvcnNDb21wb25lbnQuZXJyb3JzLmVtcHR5LmJ1dHRvblVwZGF0aW5nJylcIiBcbiAgICAgICAgICAgIGdsb3NzeSB1bmVsZXZhdGVkXG4gICAgICAgICAgICA6ZGlzYWJsZWQ9XCJmb3JtU3VibWl0QnV0dG9uU3RhdGVcIlxuICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlQ2xpY2tGcm9tQ2hpbGQoJGV2ZW50LCB0cnVlKVwiPiAgXG4gICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3RhYmxlLWl0ZW0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IG5leHRUaWNrLCByZWYsIHByb3ZpZGUsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJztcbi8vIGltcG9ydCB7IHVzZUFjdG9yU3RvcmUgfSBmcm9tICdzdG9yZXMvYWN0b3InO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuaW1wb3J0IFRhYmxlSXRlbSBmcm9tICcuL1RhYmxlSXRlbS52dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuaW1wb3J0IGFjdG9yQXhpb3NTZXJ2aWNlIGZyb20gJ2RiL3NlcnZpY2VzL2FjdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5wdXRPYmplY3RDb2xsZWN0aW9uLCBGb3JtU3RhdGUgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAndnVlLWkxOG4nO1xuLy8gaW1wb3J0IHsgQ2FwYWNpdG9yIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcic7XG4vLyBpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UnVuLCBjbG9zZURiQ29ubmVjdGlvbiB9IGZyb20gJ2NhcC9zdG9yYWdlJztcbmltcG9ydCB7IHNldENyeXB0QXBpLCBfX0ZPUk1BVE9CSl9fIH0gZnJvbSAnc3JjL2dsb2JhbHMnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcblxuLy8gVkFSSUFCTEVTXG5pbnRlcmZhY2UgQWN0b3JQcm9wcyB7XG4gIGFjdG9yRm9ybT86IGJvb2xlYW47XG4gIGFkbWluOiBib29sZWFuO1xuICBkaXNwbGF5OiBib29sZWFuO1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsO1xufTtcbmludGVyZmFjZSBEZWZhdWx0QWN0b3JSb3cge1xuICBhY3RvcklkOiBudW1iZXI7XG4gIHByZW5vbTogc3RyaW5nO1xuICBub206IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgbnVtUnVlOiBzdHJpbmc7XG4gIG5vbVJ1ZTogc3RyaW5nO1xuICBjcDogc3RyaW5nO1xuICB2aWxsZTogc3RyaW5nO1xuICB0ZWw6IHN0cmluZztcbiAgbnVtQ29tbWVyY2FudDogc3RyaW5nIHwgbnVsbDtcbiAgcGVyc29ubmVfdHlwZTogc3RyaW5nW107XG4gIGFjdGlvbnM6IHN0cmluZztcbn07XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxBY3RvclByb3BzPigpLCB7XG4gIEFjdG9yRm9ybTogZmFsc2UsXG4gIGFkbWluOiB0cnVlLFxuICBkaXNwbGF5OiBmYWxzZSxcbiAgZGJDb25uOiBudWxsLFxufSk7XG5jb25zdCBhcHAgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbmNvbnN0IGtleSA9IGFwcC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRrZXk7XG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuLy8gY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBwbGF0Zm9ybSA9ICRxLnBsYXRmb3JtO1xuY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gcmVmKHRydWUpO1xuY29uc3QgeyB0IH0gPSB1c2VJMThuKHsgdXNlU2NvcGU6ICdnbG9iYWwnIH0pO1xuY29uc3QgZGlzcGxheUlucHV0T2JqZWN0OiBJbnB1dE9iamVjdENvbGxlY3Rpb24gPSB7XG4gIHByZW5vbToge1xuICAgIGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMuZmlyc3ROYW1lJyksXG4gICAgaGVhZDogdCgnYWN0b3JzQ29tcG9uZW50LmhlYWRUYWJsZS5maXJzdE5hbWUnKSxcbiAgICBuYW1lOiAncHJlbm9tJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5maXJzdE5hbWUnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIG5vbToge1xuICAgIGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMubGFzdE5hbWUnKSxcbiAgICBoZWFkOiB0KCdhY3RvcnNDb21wb25lbnQuaGVhZFRhYmxlLmxhc3ROYW1lJyksXG4gICAgbmFtZTogJ25vbScsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ2FjdG9yc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMubGFzdE5hbWUnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIGVtYWlsOiB7XG4gICAgbGFiZWw6IHQoJ2FjdG9yc0NvbXBvbmVudC5pbnB1dExhYmVscy5lbWFpbCcpLFxuICAgIGhlYWQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5oZWFkVGFibGUuZW1haWwnKSxcbiAgICBuYW1lOiAnZW1haWwnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmVtYWlsJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBudW1SdWU6IHtcbiAgICBsYWJlbDogdCgnYWN0b3JzQ29tcG9uZW50LmlucHV0TGFiZWxzLnN0cmVldE51bScpLFxuICAgIGhlYWQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5oZWFkVGFibGUuc3RyZWV0TnVtJyksXG4gICAgbmFtZTogJ251bVJ1ZScsXG4gICAgcGxhY2Vob2xkZXI6IHQoJ2FjdG9yc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuc3RyZWV0TnVtJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBub21SdWU6IHtcbiAgICBsYWJlbDogdCgnYWN0b3JzQ29tcG9uZW50LmlucHV0TGFiZWxzLnN0cmVldE5hbWUnKSxcbiAgICBoZWFkOiB0KCdhY3RvcnNDb21wb25lbnQuaGVhZFRhYmxlLnN0cmVldE5hbWUnKSxcbiAgICBuYW1lOiAnbm9tUnVlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5zdHJlZXROYW1lJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxuICBjcDoge1xuICAgIGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMuY3AnKSxcbiAgICBoZWFkOiB0KCdhY3RvcnNDb21wb25lbnQuaGVhZFRhYmxlLmNwJyksXG4gICAgbmFtZTogJ2NwJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5jcCcpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgdmlsbGU6IHtcbiAgICBsYWJlbDogdCgnYWN0b3JzQ29tcG9uZW50LmlucHV0TGFiZWxzLmNpdHknKSxcbiAgICBoZWFkOiB0KCdhY3RvcnNDb21wb25lbnQuaGVhZFRhYmxlLmNpdHknKSxcbiAgICBuYW1lOiAndmlsbGUnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLmNpdHknKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIHRlbDoge1xuICAgIGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMudGVsJyksXG4gICAgaGVhZDogdCgnYWN0b3JzQ29tcG9uZW50LmhlYWRUYWJsZS50ZWwnKSxcbiAgICBuYW1lOiAndGVsJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy50ZWwnKSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG4gIG51bUNvbW1lcmNhbnQ6IHtcbiAgICBsYWJlbDogdCgnYWN0b3JzQ29tcG9uZW50LmlucHV0TGFiZWxzLnNlbGxlck51bScpLFxuICAgIGhlYWQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5oZWFkVGFibGUuc2VsbGVyTnVtJyksXG4gICAgbmFtZTogJ251bUNvbW1lcmNhbnQnLFxuICAgIHBsYWNlaG9sZGVyOiB0KCdhY3RvcnNDb21wb25lbnQucGxhY2Vob2xkZXJzLnNlbGxlck51bScpLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgfSxcbiAgcGVyc29ubmVfdHlwZToge1xuICAgIGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMudHlwZScpLFxuICAgIGhlYWQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5oZWFkVGFibGUudHlwZScpLFxuICAgIG5hbWU6ICdwZXJzb25uZV90eXBlJyxcbiAgICBwbGFjZWhvbGRlcjogdCgnYWN0b3JzQ29tcG9uZW50LnBsYWNlaG9sZGVycy50eXBlJyksXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICB9LFxufTtcbmNvbnN0IGFkZElucHV0T2JqZWN0OiBJbnB1dE9iamVjdENvbGxlY3Rpb24gPSB7IFxuICBwcmVub206IGRpc3BsYXlJbnB1dE9iamVjdC5wcmVub20sXG4gIG5vbTogZGlzcGxheUlucHV0T2JqZWN0Lm5vbSxcbiAgZW1haWw6IGRpc3BsYXlJbnB1dE9iamVjdC5lbWFpbCxcbiAgbnVtUnVlOiBkaXNwbGF5SW5wdXRPYmplY3QubnVtUnVlLFxuICBub21SdWU6IGRpc3BsYXlJbnB1dE9iamVjdC5ub21SdWUsXG4gIGNwOiBkaXNwbGF5SW5wdXRPYmplY3QuY3AsXG4gIHZpbGxlOiBkaXNwbGF5SW5wdXRPYmplY3QudmlsbGUsXG4gIHRlbDogZGlzcGxheUlucHV0T2JqZWN0LnRlbCxcbiAgbnVtQ29tbWVyY2FudDogZGlzcGxheUlucHV0T2JqZWN0Lm51bUNvbW1lcmNhbnQsXG4gIHBlcnNvbm5lX3R5cGU6IGRpc3BsYXlJbnB1dE9iamVjdC5wZXJzb25uZV90eXBlLFxuICBhY3Rpb25zOiB7XG4gICAgbGFiZWw6IHQoJ2Zvcm1zLmhlYWRUYWJsZS5hY3Rpb24nKSxcbiAgICBuYW1lOiAnYWN0aW9ucycsXG4gICAgaGVhZDogdCgnZm9ybXMuaGVhZFRhYmxlLmFjdGlvbicpLFxuICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG59O1xuY29uc3QgYWRtaW5Qcm9wUmVmID0gcmVmKHByb3BzLmFkbWluKTtcbmNvbnN0IGRpc3BsYXlQcm9wUmVmID0gcmVmKHByb3BzLmRpc3BsYXkpO1xuY29uc3QgaXNGb3JtID0gcmVmKHByb3BzLmFjdG9yRm9ybSk7XG5jb25zdCBtZXNzYWdlVmlzaWJpbGl0eSA9IHJlZihmYWxzZSk7XG5jb25zdCBhY3RvcklkID0gcmVmKDApO1xuY29uc3QgcHJlbm9tID0gcmVmKCcnKTtcbmNvbnN0IG5vbSA9IHJlZignJyk7XG5jb25zdCBlbWFpbCA9IHJlZignJyk7XG5jb25zdCBudW1SdWUgPSByZWYoJycpO1xuY29uc3Qgbm9tUnVlID0gcmVmKCcnKTtcbmNvbnN0IGNwID0gcmVmKCcnKTtcbmNvbnN0IHZpbGxlID0gcmVmKCcnKTtcbmNvbnN0IHRlbCA9IHJlZignJyk7XG5jb25zdCBudW1Db21tZXJjYW50ID0gcmVmKG51bGwpO1xuY29uc3QgY2hlY2tib3hPcHRpb25UeXBlcyA9IHJlZihbXG4gIHsgbGFiZWw6IHQoJ2FjdG9yc0NvbXBvbmVudC5pbnB1dExhYmVscy5idXllclR5cGUnKSwgdmFsdWU6ICczJyB9LFxuICB7IGxhYmVsOiB0KCdhY3RvcnNDb21wb25lbnQuaW5wdXRMYWJlbHMuc2VsbGVyVHlwZScpLCB2YWx1ZTogJzInIH0sXG5dKTtcbmNvbnN0IHR5cGVzID0gcmVmKFtdKTtcbmNvbnN0IGZvcm1TdGF0ZTogUmVmPEZvcm1TdGF0ZT4gPSAoe1xuICB1cGRhdGU6IGZhbHNlLFxuICBhZGQ6IHRydWVcbn0pO1xuY29uc3QgZGVmYXVsdFJvdzogUmVmPERlZmF1bHRBY3RvclJvd1tdPiA9IHJlZihbXSk7XG5jb25zdCB2YWxpZFByZW5vbSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXigoW2EtekEtWl0pKFxcLSkqKXsyLDE1fSQvO1xuICByZXR1cm4gcmUudGVzdChwcmVub20udmFsdWUpO1xufSk7XG5jb25zdCBub25FbXB0eVByZW5vbSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhcHJlbm9tLnZhbHVlICYmIHByZW5vbS52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3QgdmFsaWROb20gPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oW2EtekEtWl0pezIsMTV9JC87XG4gIHJldHVybiByZS50ZXN0KG5vbS52YWx1ZSk7XG59KTtcbmNvbnN0IG5vbkVtcHR5Tm9tID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFub20udmFsdWUgJiYgbm9tLnZhbHVlICE9ICcnO1xufSk7XG5jb25zdCB2YWxpZEVtYWlsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAvLyBjb25zdCByZSA9IC9eKChbYS16QS1aXSkoXFwtKSopezIsMTV9JC87XG4gIHJldHVybiB0cnVlO1xufSk7XG5jb25zdCBub25FbXB0eUVtYWlsID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFlbWFpbC52YWx1ZSAmJiBlbWFpbC52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3QgdmFsaWROdW1SdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oKFswLTldKShiaXN8dGVyKSopKyQvaTtcbiAgcmV0dXJuIHJlLnRlc3QobnVtUnVlLnZhbHVlKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlOdW1SdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhIW51bVJ1ZS52YWx1ZSAmJiBudW1SdWUudmFsdWUgIT0gJyc7XG59KTtcbmNvbnN0IHZhbGlkTm9tUnVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKChbYS16QS1aXSkoW1xcLVxcc10pKil7Miw1MH0kLztcbiAgcmV0dXJuIHJlLnRlc3Qobm9tUnVlLnZhbHVlKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlOb21SdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhIW5vbVJ1ZS52YWx1ZSAmJiBub21SdWUudmFsdWUgIT0gJyc7XG59KTtcbmNvbnN0IHZhbGlkQ3AgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oWzAtOV0pezV9JC87XG4gIHJldHVybiByZS50ZXN0KGNwLnZhbHVlKTtcbn0pO1xuY29uc3Qgbm9uRW1wdHlDcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhY3AudmFsdWUgJiYgY3AudmFsdWUgIT0gJyc7XG59KTtcbmNvbnN0IHZhbGlkVmlsbGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oKFthLXpBLVpdKShcXC0pKil7Miw1MH0kLztcbiAgcmV0dXJuIHJlLnRlc3QodmlsbGUudmFsdWUpO1xufSk7XG5jb25zdCBub25FbXB0eVZpbGxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISF2aWxsZS52YWx1ZSAmJiB2aWxsZS52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3QgdmFsaWRUZWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oWzAtOV0pezEwfSQvO1xuICByZXR1cm4gcmUudGVzdCh0ZWwudmFsdWUpO1xufSk7XG5jb25zdCBub25FbXB0eVRlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhdGVsLnZhbHVlICYmIHRlbC52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3QgdmFsaWROdW1Db21tZXJjYW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKFswLTldKSskLztcbiAgcmV0dXJuIHJlLnRlc3QobnVtQ29tbWVyY2FudC52YWx1ZSk7XG59KTtcbmNvbnN0IG5vbkVtcHR5TnVtQ29tbWVyY2FudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuICEhbnVtQ29tbWVyY2FudC52YWx1ZSAmJiBudW1Db21tZXJjYW50LnZhbHVlICE9ICcnO1xufSk7XG5jb25zdCBub25FbXB0eVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAhdHlwZXMudmFsdWUubGVuZ3RoID8gZmFsc2UgOiB0cnVlO1xufSk7XG4vLyBjb25zdCB2YWxpZFR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGNvbnN0IHJlID0gL14oKFthLXpBLVpdKShcXC0pKil7MiwxNX0kLztcbi8vICAgcmV0dXJuIHJlLnRlc3QodHlwZXMudmFsdWUpO1xuLy8gfSk7XG5jb25zdCBmb3JtU3VibWl0QnV0dG9uU3RhdGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCBhY3RvclR5cGUgPSAwO1xuICBhY3RvclR5cGUgPSB0eXBlcy52YWx1ZS5sZW5ndGggPT0gMiA/IDEgOiBhY3RvclR5cGU7XG4gIGFjdG9yVHlwZSA9IHR5cGVzLnZhbHVlLmxlbmd0aCA9PSAxID8gcGFyc2VJbnQodHlwZXMudmFsdWVbMF0pIDogYWN0b3JUeXBlO1xuICBjb25zdCByZXQxID0gISh2YWxpZFByZW5vbS52YWx1ZSAmJiBub25FbXB0eVByZW5vbS52YWx1ZSAmJiB2YWxpZE5vbS52YWx1ZVxuICAgICYmIG5vbkVtcHR5Tm9tLnZhbHVlICYmIHZhbGlkRW1haWwudmFsdWUgJiYgbm9uRW1wdHlFbWFpbC52YWx1ZVxuICAgICYmIHZhbGlkTnVtUnVlLnZhbHVlICYmIG5vbkVtcHR5TnVtUnVlLnZhbHVlICYmIHZhbGlkTm9tUnVlLnZhbHVlICYmIG5vbkVtcHR5Tm9tUnVlLnZhbHVlXG4gICAgJiYgdmFsaWRDcC52YWx1ZSAmJiBub25FbXB0eUNwLnZhbHVlXG4gICAgJiYgdmFsaWRWaWxsZS52YWx1ZSAmJiBub25FbXB0eVZpbGxlLnZhbHVlICYmIHZhbGlkVGVsLnZhbHVlXG4gICAgJiYgbm9uRW1wdHlUZWwudmFsdWUgJiYgbm9uRW1wdHlUeXBlLnZhbHVlKTtcbiAgLy8gY29uc29sZS5sb2coYHJldDEgLS0+ICR7cmV0MX1gKTtcbiAgY29uc3QgcmV0MiA9ICEoYWN0b3JUeXBlID09PSAzIHx8ICh2YWxpZE51bUNvbW1lcmNhbnQudmFsdWUgJiYgbm9uRW1wdHlOdW1Db21tZXJjYW50LnZhbHVlKSk7XG4gIC8vIGNvbnNvbGUubG9nKGByZXQyIC0tPiAke3JldDJ9YCk7XG4gIHJldHVybiByZXQxIHx8IHJldDI7XG59KTtcbmNvbnN0IG51bUNvbW1lcmNhbnRTdGF0ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IGFjdG9yVHlwZSA9IDA7XG4gIGFjdG9yVHlwZSA9IHR5cGVzLnZhbHVlLmxlbmd0aCA9PSAyID8gMSA6IGFjdG9yVHlwZTtcbiAgYWN0b3JUeXBlID0gdHlwZXMudmFsdWUubGVuZ3RoID09IDEgPyBwYXJzZUludCh0eXBlcy52YWx1ZVswXSkgOiBhY3RvclR5cGU7XG4gIHNldE51bUNvbW1lcmNhbnRWYWx1ZShhY3RvclR5cGUpO1xuICByZXR1cm4gYWN0b3JUeXBlID09PSAyIHx8IGFjdG9yVHlwZSA9PT0gMSA/IGZhbHNlIDogdHJ1ZTsgXG59KTtcbmNvbnN0IG9yaWVudGF0aW9uID0gcmVmKG51bGwpO1xuY29uc3QgY29tcGFjdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IHJldCA9IGZhbHNlO1xuICBpZiAoISFvcmllbnRhdGlvbi52YWx1ZSl7XG4gICAgaWYgKG9yaWVudGF0aW9uLnZhbHVlID09PSAncG9ydHJhaXQtcHJpbWFyeScgfHwgb3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1zZWNvbmRhcnknKXtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59KTtcblxubGV0IG1lc3NhZ2VTdG9yZSA9IG51bGwsIFxuICAvLyBhY3RvclN0b3JlID0gbnVsbCwgXG4gIHByZWZzID0gbnVsbDtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgLy8gYWN0b3JTdG9yZSA9IHVzZUFjdG9yU3RvcmUoKTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSBtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXNWaXNpYmlsaXR5O1xufSBlbHNlIHtcbiAgb3JpZW50YXRpb24udmFsdWUgPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICBwcmVmcyA9IGF3YWl0IGltcG9ydCgnY2FwL3N0b3JhZ2UvcHJlZmVyZW5jZXMnKTtcbiAgICBjb25zdCBtZXNzID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignbWVzc2FnZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lc3MpO1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gISFtZXNzID8gbWVzcy5tZXNzYWdlcyA6IFtdO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VzKTtcbiAgICBjb25zdCB2aXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzVmlzaWJpbGl0eSA6IG1lc3M7XG4gICAgLy8gY29uc29sZS5sb2codmlzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoICYmIHZpcyA9PT0gbnVsbCkge1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHZpcyAhPT0gbnVsbCA/IHZpcyA6IGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcbn1cblxuLy8gRlVOQ1RJT05TXG5mdW5jdGlvbiBzZXROdW1Db21tZXJjYW50VmFsdWUoYWN0b3JUeXBlOiBudW1iZXIpe1xuICBudW1Db21tZXJjYW50LnZhbHVlID0gYWN0b3JUeXBlID09PSAzID8gbnVsbCA6IG51bUNvbW1lcmNhbnQudmFsdWU7XG59O1xuYXN5bmMgZnVuY3Rpb24gZm9yY2VUYWJsZVJlcmVuZGVyKCkge1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSBmYWxzZTtcbiAgYXdhaXQgbmV4dFRpY2soKTtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gdHJ1ZTtcbn07XG5hc3luYyBmdW5jdGlvbiB0cmFuc2Zvcm1PYmplY3Qob2JqOiBhbnkpIHtcbiAgLy8gaWYgKF9fS0VZX18gPT09IG51bGwpIHtcbiAgLy8gICBhd2FpdCBzZXRHZW5BcGkoKTtcbiAgLy8gfVxuICBhd2FpdCBzZXRDcnlwdEFwaSgpO1xuICBfX0ZPUk1BVE9CSl9fKG9iaiwga2V5KTtcbn07XG5hc3luYyBmdW5jdGlvbiBhZGRDbGlja0Zyb21DaGlsZChlOiBFdmVudCwgZGI6IGJvb2xlYW4pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoIWRiKSB7XG4gICAgYWN0b3JJZC52YWx1ZSA9IDA7XG4gICAgcHJlbm9tLnZhbHVlID0gJyc7XG4gICAgbm9tLnZhbHVlID0gJyc7XG4gICAgZW1haWwudmFsdWUgPSAnJztcbiAgICBudW1SdWUudmFsdWUgPSAnJztcbiAgICBub21SdWUudmFsdWUgPSAnJztcbiAgICBjcC52YWx1ZSA9ICcnO1xuICAgIHZpbGxlLnZhbHVlID0gJyc7XG4gICAgdGVsLnZhbHVlID0gJyc7XG4gICAgdHlwZXMudmFsdWUgPSBbXTtcbiAgICBudW1Db21tZXJjYW50LnZhbHVlID0gbnVsbDtcbiAgICBhZG1pblByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgaXNGb3JtLnZhbHVlID0gdHJ1ZTtcbiAgICBmb3JtU3RhdGUudXBkYXRlID0gZmFsc2U7XG4gICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIGFjdG9ySWQgOiAwLFxuICAgICAgcHJlbm9tOiAnJyxcbiAgICAgIG5vbTogJycsXG4gICAgICBlbWFpbDogJycsXG4gICAgICBudW1SdWU6ICcnLFxuICAgICAgbm9tUnVlOiAnJyxcbiAgICAgIGNwOiAnJyxcbiAgICAgIHZpbGxlOiAnJyxcbiAgICAgIHRlbDogJycsXG4gICAgICBwZXJzb25uZV90eXBlOiBbXSxcbiAgICAgIG51bUNvbW1lcmNhbnQ6ICcnLFxuICAgICAgYWN0aW9uczogJycsXG4gICAgfTtcbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYWRkaW5nIGFjdG9yIGluIGRiICEnKTtcbiAgICBsZXQgcmV0O1xuICAgIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgICByZXQgPSBhd2FpdCBpbnNlcnRBY3RvckluRGIoKTtcbiAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgaXNGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMuZGlzcGxheSl7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgYWRtaW5Qcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yY2VUYWJsZVJlcmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCA9IGF3YWl0IGluc2VydEFjdG9ySW5TUUxpdGVEYigpO1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5kaXNwbGF5KXtcbiAgICAgICAgZGlzcGxheVByb3BSZWYudmFsdWUgPSB0cnVlO1xuICAgICAgICBhZG1pblByb3BSZWYudmFsdWUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlQcm9wUmVmLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKHJldCkge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVDbGlja0Zyb21DaGlsZChlOiBFdmVudCwgZGI6IGJvb2xlYW4sIG9iajogYW55ID0gbnVsbCkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmICghZGIpIHtcbiAgICBsZXQgYWN0b3JUeXBlID0gW107XG4gICAgYWN0b3JUeXBlID0gb2JqLnBlcnNvbm5lX3R5cGUuYWN0b3JUeXBlSWQgPT09IDEgPyBbJzInLCAnMyddIDogW25ldyBTdHJpbmcob2JqLnBlcnNvbm5lX3R5cGUuYWN0b3JUeXBlSWQpLnZhbHVlT2YoKV07XG4gICAgaXNGb3JtLnZhbHVlID0gdHJ1ZTtcbiAgICBmb3JtU3RhdGUudXBkYXRlID0gdHJ1ZTtcbiAgICBmb3JtU3RhdGUuYWRkID0gZmFsc2U7XG4gICAgZGVmYXVsdFJvdy52YWx1ZVswXSA9IHtcbiAgICAgIGFjdG9ySWQ6IG9iai5hY3RvcklkLFxuICAgICAgcHJlbm9tOiBvYmoucHJlbm9tLFxuICAgICAgbm9tOiBvYmoubm9tLFxuICAgICAgZW1haWw6IG9iai5lbWFpbCxcbiAgICAgIG51bVJ1ZTogb2JqLm51bVJ1ZSxcbiAgICAgIG5vbVJ1ZTogb2JqLm5vbVJ1ZSxcbiAgICAgIGNwOiBvYmouY3AsXG4gICAgICB2aWxsZTogb2JqLnZpbGxlLFxuICAgICAgdGVsOiBvYmoudGVsLFxuICAgICAgcGVyc29ubmVfdHlwZTogYWN0b3JUeXBlLFxuICAgICAgbnVtQ29tbWVyY2FudDogb2JqLm51bUNvbW1lcmNhbnQsXG4gICAgICBhY3Rpb25zOiAnJyxcbiAgICB9O1xuICAgIGFjdG9ySWQudmFsdWUgPSBvYmouYWN0b3JJZDtcbiAgICBwcmVub20udmFsdWUgPSBvYmoucHJlbm9tO1xuICAgIG5vbS52YWx1ZSA9IG9iai5ub207XG4gICAgZW1haWwudmFsdWUgPSBvYmouZW1haWw7XG4gICAgbnVtUnVlLnZhbHVlID0gb2JqLm51bVJ1ZTtcbiAgICBub21SdWUudmFsdWUgPSBvYmoubm9tUnVlO1xuICAgIGNwLnZhbHVlID0gb2JqLmNwO1xuICAgIHZpbGxlLnZhbHVlID0gb2JqLnZpbGxlO1xuICAgIHRlbC52YWx1ZSA9IG9iai50ZWw7XG4gICAgdHlwZXMudmFsdWUgPSBhY3RvclR5cGU7XG4gICAgbnVtQ29tbWVyY2FudC52YWx1ZSA9IG9iai5udW1Db21tZXJjYW50O1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUubG9nKCd1cGRhdGluZyBhY3RvciB0byBkYiAhJyk7XG4gICAgbGV0IHJldDtcbiAgICBpZihwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgICByZXQgPSBhd2FpdCB1cGRhdGVBY3RvckluRGIoKTtcbiAgICAgIGlmKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBhd2FpdCB1cGRhdGVBY3RvckluU1FMaXRlRGIoKTtcbiAgICAgIGlmKHJldCkge1xuICAgICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBmb3JtU3RhdGUuYWRkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICAgIH1cbiAgICBpZiAocmV0KSB7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgbWVzc2FnZTogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNsaWNrRnJvbUNoaWxkKGU6IEV2ZW50LCBpZDogbnVtYmVyKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgYWN0b3JJZC52YWx1ZSA9IGlkO1xuICAvLyBjb25zb2xlLmxvZygnZGVsZXRpbmcgYWN0b3IgZnJvbSBkYiAhJyk7XG4gIGxldCByZXQ7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgcmV0ID0gZGVsZXRlQWN0b3JGcm9tRGIoKTtcbiAgICBpZihyZXQpIHtcbiAgICAgIGlzRm9ybS52YWx1ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLnVwZGF0ZSA9IGZhbHNlO1xuICAgICAgZm9ybVN0YXRlLmFkZCA9IHRydWU7XG4gICAgfVxuICAgIGZvcmNlVGFibGVSZXJlbmRlcigpO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGRlbGV0ZUFjdG9yRnJvbVNRTGl0ZURiKCk7XG4gICAgaWYocmV0KSB7XG4gICAgICBpc0Zvcm0udmFsdWUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS51cGRhdGUgPSBmYWxzZTtcbiAgICAgIGZvcm1TdGF0ZS5hZGQgPSB0cnVlO1xuICAgIH1cbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuICBpZiAocmV0KSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICBtZXNzYWdlOiB0KCdhY3RvcnNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgICRxLm5vdGlmeSh7XG4gICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgIG1lc3NhZ2U6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScpXG4gICAgfSk7XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBpbnNlcnRBY3RvckluRGIoKSB7XG4gIGxldCBhY3RvclR5cGUgPSAwO1xuICBhY3RvclR5cGUgPSB0eXBlcy52YWx1ZS5sZW5ndGggPT0gMiA/IDEgOiBhY3RvclR5cGU7XG4gIGFjdG9yVHlwZSA9IHR5cGVzLnZhbHVlLmxlbmd0aCA9PSAxID8gcGFyc2VJbnQodHlwZXMudmFsdWVbMF0pIDogYWN0b3JUeXBlO1xuICBjb25zdCBvYmogPSB7XG4gICAgcHJlbm9tOiBwcmVub20udmFsdWUsXG4gICAgbm9tOiBub20udmFsdWUsXG4gICAgZW1haWw6IGVtYWlsLnZhbHVlLFxuICAgIG51bVJ1ZTogbnVtUnVlLnZhbHVlLFxuICAgIG5vbVJ1ZTogbm9tUnVlLnZhbHVlLFxuICAgIGNwOiBjcC52YWx1ZSxcbiAgICB2aWxsZTogdmlsbGUudmFsdWUsXG4gICAgdGVsOiB0ZWwudmFsdWUsXG4gICAgdHlwZTogYWN0b3JUeXBlLFxuICAgIG51bUNvbW1lcmNhbnQ6IG51bUNvbW1lcmNhbnQudmFsdWUsXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICByZXR1cm4gYWN0b3JBeGlvc1NlcnZpY2VcbiAgICAuY3JlYXRlKG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywgeyBlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0QWN0b3JJblNRTGl0ZURiICgpIHtcbiAgbGV0IGFjdG9yVHlwZSA9IDA7XG4gIGFjdG9yVHlwZSA9IHR5cGVzLnZhbHVlLmxlbmd0aCA9PSAyID8gMSA6IGFjdG9yVHlwZTtcbiAgYWN0b3JUeXBlID0gdHlwZXMudmFsdWUubGVuZ3RoID09IDEgPyBwYXJzZUludCh0eXBlcy52YWx1ZVswXSkgOiBhY3RvclR5cGU7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBwcmVub206IHByZW5vbS52YWx1ZSxcbiAgICBub206IG5vbS52YWx1ZSxcbiAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgbnVtUnVlOiBudW1SdWUudmFsdWUsXG4gICAgbm9tUnVlOiBub21SdWUudmFsdWUsXG4gICAgY3A6IGNwLnZhbHVlLFxuICAgIHZpbGxlOiB2aWxsZS52YWx1ZSxcbiAgICB0ZWw6IHRlbC52YWx1ZSxcbiAgICB0eXBlOiBhY3RvclR5cGUsXG4gICAgbnVtQ29tbWVyY2FudDogbnVtQ29tbWVyY2FudC52YWx1ZSxcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGNvbnN0IHNxbCA9ICdJTlNFUlQgSU5UTyBcXGBwZXJzb25uZVxcYCAoXFxgcHJlbm9tXFxgLCBcXGBub21cXGAsIFxcYGVtYWlsXFxgLCBcXGBudW1SdWVcXGAsIFxcYG5vbVJ1ZVxcYCwgXFxgY3BcXGAsIFxcYHZpbGxlXFxgLCBcXGB0ZWxcXGAsIFxcYGFjdG9yVHlwZUlkXFxgLCBcXGBudW1Db21tZXJjYW50XFxgKSBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8sID8sID8sID8pOyc7XG4gICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmoucHJlbm9tLCBvYmoubm9tLCBvYmouZW1haWwsIG9iai5udW1SdWUsIG9iai5ub21SdWUsIG9iai5jcCwgb2JqLnZpbGxlLCBvYmoudGVsLCBvYmoudHlwZSwgb2JqLm51bUNvbW1lcmNhbnRdKTtcbiAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpe1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7IFxuICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLCBcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7IFxuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsIFxuICAgICAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJywgeyBlcnI6ICdBZGRpbmcgYWN0b3IgaW4gU1FMaXRlIERCICEnfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSwgXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHsgZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICB9KTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQWN0b3JJbkRiKCkge1xuICBsZXQgYWN0b3JUeXBlID0gMDtcbiAgYWN0b3JUeXBlID0gdHlwZXMudmFsdWUubGVuZ3RoID09IDIgPyAxIDogYWN0b3JUeXBlO1xuICBhY3RvclR5cGUgPSB0eXBlcy52YWx1ZS5sZW5ndGggPT0gMSA/IHBhcnNlSW50KHR5cGVzLnZhbHVlWzBdKSA6IGFjdG9yVHlwZTtcbiAgY29uc3Qgb2JqID0ge1xuICAgIHByZW5vbTogcHJlbm9tLnZhbHVlLFxuICAgIG5vbTogbm9tLnZhbHVlLFxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICBudW1SdWU6IG51bVJ1ZS52YWx1ZSxcbiAgICBub21SdWU6IG5vbVJ1ZS52YWx1ZSxcbiAgICBjcDogY3AudmFsdWUsXG4gICAgdmlsbGU6IHZpbGxlLnZhbHVlLFxuICAgIHRlbDogdGVsLnZhbHVlLFxuICAgIGFjdG9yVHlwZUlkOiBhY3RvclR5cGUsXG4gICAgbnVtQ29tbWVyY2FudDogbnVtQ29tbWVyY2FudC52YWx1ZSxcbiAgfTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIHJldHVybiBhY3RvckF4aW9zU2VydmljZVxuICAudXBkYXRlKGFjdG9ySWQudmFsdWUsIG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJyksXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywgeyBlcnI6IGVyciB9KSxcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQWN0b3JJblNRTGl0ZURiKCkge1xuICBsZXQgYWN0b3JUeXBlID0gMDtcbiAgYWN0b3JUeXBlID0gdHlwZXMudmFsdWUubGVuZ3RoID09IDIgPyAxIDogYWN0b3JUeXBlO1xuICBhY3RvclR5cGUgPSB0eXBlcy52YWx1ZS5sZW5ndGggPT0gMSA/IHBhcnNlSW50KHR5cGVzLnZhbHVlWzBdKSA6IGFjdG9yVHlwZTtcbiAgY29uc3Qgb2JqID0ge1xuICAgIHByZW5vbTogcHJlbm9tLnZhbHVlLFxuICAgIG5vbTogbm9tLnZhbHVlLFxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICBudW1SdWU6IG51bVJ1ZS52YWx1ZSxcbiAgICBub21SdWU6IG5vbVJ1ZS52YWx1ZSxcbiAgICBjcDogY3AudmFsdWUsXG4gICAgdmlsbGU6IHZpbGxlLnZhbHVlLFxuICAgIHRlbDogdGVsLnZhbHVlLFxuICAgIHR5cGU6IGFjdG9yVHlwZSxcbiAgICBudW1Db21tZXJjYW50OiBudW1Db21tZXJjYW50LnZhbHVlLFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgbGV0IGlzT3BlbiA9IGF3YWl0IGlzRGJDb25uZWN0aW9uT3Blbihwcm9wcy5kYkNvbm4pO1xuICBpc09wZW4gPSAhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICBpZiAoaXNPcGVuKSB7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIGNvbnN0IHNxbCA9ICdVUERBVEUgXFxgcGVyc29ubmVcXGAgU0VUIFxcYHByZW5vbVxcYD0/LCBcXGBub21cXGA9PywgXFxgZW1haWxcXGA9PywgXFxgbnVtUnVlXFxgPT8sIFxcYG5vbVJ1ZVxcYD0/LCBcXGBjcFxcYD0/LCBcXGB2aWxsZVxcYD0/LCBcXGB0ZWxcXGA9PywgXFxgYWN0b3JUeXBlSWRcXGA9PywgXFxgbnVtQ29tbWVyY2FudFxcYD0/IFdIRVJFIFxcYGFjdG9ySWRcXGAgPSA/Oyc7XG4gICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwsIFtvYmoucHJlbm9tLCBvYmoubm9tLCBvYmouZW1haWwsIG9iai5udW1SdWUsIG9iai5ub21SdWUsIG9iai5jcCwgb2JqLnZpbGxlLCBvYmoudGVsLCBvYmoudHlwZSwgb2JqLm51bUNvbW1lcmNhbnQsIGFjdG9ySWQudmFsdWVdKTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcykge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdhY3RvcnNDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdhY3RvcnNDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ1VwZGF0aW5nIGFjdG9yIGluIFNRTGl0ZSBEQiAhJ30pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgY2xvc2VEYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScsIHsgZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnfSlcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICB9KTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gZGVsZXRlQWN0b3JGcm9tRGIoKSB7XG4gIHJldHVybiBhY3RvckF4aW9zU2VydmljZVxuICAgIC5kZWxldGUoYWN0b3JJZC52YWx1ZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMub2suZGVsZXRlJylcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ2FjdG9yc0NvbXBvbmVudC5yZXN1bHRzLmtvLmRlbGV0ZScsIHsgZXJyOiBlcnJ9KVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFjdG9yRnJvbVNRTGl0ZURiKCkge1xuICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGlmIChpc09wZW4pIHtcbiAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgY29uc3Qgc3FsID0gYERFTEVURSBGUk9NIFxcYHBlcnNvbm5lXFxgIFdIRVJFIFxcYGFjdG9ySWRcXGA9ICcke2FjdG9ySWQudmFsdWV9JztgO1xuICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICBpZiAodmFsdWVzLmNoYW5nZXMuY2hhbmdlcykge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdhY3RvcnNDb21wb25lbnQucmVzdWx0cy5vay5kZWxldGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdhY3RvcnNDb21wb25lbnQucmVzdWx0cy5rby5kZWxldGUnLCB7IGVycjogJ0RlbGV0aW5nIGFjdG9yIGZyb20gU1FMaXRlIERCICEnfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICBtZXNzYWdlczogW1xuICAgICAge1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgnYWN0b3JzQ29tcG9uZW50LnJlc3VsdHMua28uZGVsZXRlJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgISd9KVxuICAgICAgfVxuICAgIF0sXG4gICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gIH0pO1xuICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZT0gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbmZ1bmN0aW9uIGhhbmRsZU9yaWVudGF0aW9uKCl7XG4gIC8vIGNvbnNvbGUubG9nKHNjcmVlbi5vcmllbnRhdGlvbik7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG59O1xuXG4vLyBXQVRDSEVSU1xud2F0Y2goKCkgPT4gWyBwcm9wcy5hZG1pbiwgcHJvcHMuZGlzcGxheSwgcHJvcHMuYWN0b3JGb3JtXSxcbiAgKFtuZXdBZG1pblByb3AsIG5ld0Rpc3BsYXlQcm9wLCBuZXdBY3RvckZvcm1dKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYG5ld0FkbWluUHJvcCAtPiAke25ld0FkbWluUHJvcH0vb2xkQWRtaW5Qcm9wIC0+ICR7b2xkQWRtaW5Qcm9wfWApO1xuICAgIC8vIGNvbnNvbGUubG9nKGBuZXdEaXNwbGF5UHJvcCAtPiAke25ld0Rpc3BsYXlQcm9wfS9vbGREaXNwbGF5UHJvcCAtPiAke29sZERpc3BsYXlQcm9wfWApO1xuICAgIGFkbWluUHJvcFJlZi52YWx1ZSA9IG5ld0FkbWluUHJvcDtcbiAgICBkaXNwbGF5UHJvcFJlZi52YWx1ZSA9IG5ld0Rpc3BsYXlQcm9wO1xuICAgIGlzRm9ybS52YWx1ZSA9IG5ld0FjdG9yRm9ybTtcbiAgICBmb3JjZVRhYmxlUmVyZW5kZXIoKTtcbiAgfVxuKTtcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xuXG4vLyBPVEhFUlxucHJvdmlkZSgnc3JjJywgJ2FjdG9ycycpO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZyBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1zdGFydFwiIHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIj5cbiAgICA8IS0tIGNvbnRlbnQgLS0+XG4gICAgPGFjdG9yLWNvbXBvbmVudFxuICAgICAgdi1pZj0ncmVuZGVyQ29tcG9uZW50J1xuICAgICAgOmFjdG9yRm9ybT0nYWN0b3JGb3JtJ1xuICAgICAgOmFkbWluPSdhZG1pblByb3AnXG4gICAgICA6ZGlzcGxheT0nZGlzcGxheVByb3AnXG4gICAgICA6ZGJDb25uPVwiZGJDb25uXCI+XG4gICAgPC9hY3Rvci1jb21wb25lbnQ+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgbmV4dFRpY2ssIHdhdGNoLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCBBY3RvckNvbXBvbmVudCBmcm9tICdjb21wb25lbnRzL0FjdG9yQ29tcG9uZW50LnZ1ZSc7XG5pbXBvcnQgeyBTUUxpdGVEQkNvbm5lY3Rpb24gfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9zcWxpdGUnO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQYWdlUHJvcHMge1xuICBhZG1pbjogYm9vbGVhbjtcbiAgZGlzcGxheTogYm9vbGVhbjtcbiAgZGJDb25uPzogU1FMaXRlREJDb25uZWN0aW9uO1xufTtcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFBhZ2VQcm9wcz4oKSwge1xuICBhZG1pbjogdHJ1ZSxcbiAgZGlzcGxheTogZmFsc2UsXG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2hhbmdlLXRhYiddKTtcbmNvbnN0IGFkbWluUHJvcCA9IHJlZihwcm9wcy5hZG1pbik7XG5jb25zdCBkaXNwbGF5UHJvcCA9IHJlZihwcm9wcy5kaXNwbGF5KTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IGFjdG9yRm9ybSA9IHJlZihmYWxzZSk7XG5cbi8vIERFQ0xBUkFUSU9OU1xuaWYgKHJvdXRlLnBhcmFtcy50eXBlICE9PSAnJykge1xuICBhZG1pblByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2FkbWluJyA/IHRydWUgOiBmYWxzZTtcbiAgZGlzcGxheVByb3AudmFsdWUgPSByb3V0ZS5wYXJhbXMudHlwZSA9PT0gJ2Rpc3BsYXknID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vLyBXQVRDSEVSU1xud2F0Y2goXG4gIHJvdXRlLFxuICBhc3luYyAobmV3UikgPT4ge1xuICAgIGFkbWluUHJvcC52YWx1ZSA9IG5ld1IucGFyYW1zLnR5cGUgPT09ICdhZG1pbicgPyB0cnVlIDogZmFsc2U7XG4gICAgZGlzcGxheVByb3AudmFsdWUgPSBuZXdSLnBhcmFtcy50eXBlID09PSAnZGlzcGxheScgPyB0cnVlIDogZmFsc2U7XG4gICAgYWN0b3JGb3JtLnZhbHVlID0gZmFsc2U7XG4gICAgZm9yY2VBY3RvclJlbmRlcmVyKCk7XG4gIH0sXG4pXG5cbi8vIEZVTkNUSU9OU1xuYXN5bmMgZnVuY3Rpb24gZm9yY2VBY3RvclJlbmRlcmVyKCkge1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSBmYWxzZTtcbiAgYXdhaXQgbmV4dFRpY2soKTtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gdHJ1ZTtcbn07XG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGVtaXQoJ2NoYW5nZS10YWInLCB1bmRlZmluZWQpO1xufSk7XG48L3NjcmlwdD5cbiJdLCJmaWxlIjoiYXNzZXRzL0FjdG9yUGFnZS5qcyJ9
