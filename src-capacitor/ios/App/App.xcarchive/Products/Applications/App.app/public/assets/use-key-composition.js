import { aH as defineStore, aI as cookieStorage, c as createComponent, d as computed, h, e as hSlot, g as getCurrentInstance, ac as _export_sfc, $ as defineComponent, f as ref, _ as __vitePreload, a3 as openBlock, a6 as createElementBlock, a8 as Fragment, a7 as renderList, a4 as createVNode, a2 as withCtx, j as QBtn, a9 as createTextVNode, aa as toDisplayString, aq as unref, at as normalizeClass, l as inject, w as watch, o as onMounted, n as onBeforeUnmount, aP as formKey, aQ as debounce, az as injectProp, aR as onBeforeUpdate, q as stopAndPrevent, B as nextTick, E as onDeactivated, F as onActivated, X as isRuntimeSsrPreHydration, N as prevent, Q as QIcon, ai as QSpinner, ah as Transition, J as client } from "./index.js";
import { b as useDarkProps, c as useDark, e as addFocusFn, u as uid, f as removeFocusFn } from "./QNoSsr.js";
import { u as useQuasar } from "./use-quasar.js";
const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [],
    messagesVisibility: false
  }),
  persist: {
    storage: cookieStorage
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getMessagesVisibility(state) {
      return state.messagesVisibility;
    }
  },
  actions: {
    deleteMessages() {
      this.messages = [];
      this.messagesVisibility = false;
    },
    setMessagesVisibility(val) {
      this.messagesVisibility = val;
    }
  }
});
var QBanner = createComponent({
  name: "QBanner",
  props: {
    ...useDarkProps,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-banner row items-center" + (props.dense === true ? " q-banner--dense" : "") + (isDark.value === true ? " q-banner--dark q-dark" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const actionClass = computed(
      () => `q-banner__actions row items-center justify-end col-${props.inlineActions === true ? "auto" : "all"}`
    );
    return () => {
      const child = [
        h("div", {
          class: "q-banner__avatar col-auto row items-center self-start"
        }, hSlot(slots.avatar)),
        h("div", {
          class: "q-banner__content col text-body2"
        }, hSlot(slots.default))
      ];
      const actions = hSlot(slots.action);
      actions !== void 0 && child.push(
        h("div", { class: actionClass.value }, actions)
      );
      return h("div", {
        class: classes.value + (props.inlineActions === false && actions !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, child);
    };
  }
});
const _hoisted_1 = { style: { "width": "100%" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MessagesItem",
  props: {
    messages: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const $q = useQuasar();
    const platform = $q.platform;
    let messageStore = null, messagesFeed = ref([]), prefs = null;
    messagesFeed = ref(props.messages);
    if (platform.is.desktop) {
      messageStore = useMessageStore();
      messagesFeed.value = messageStore.getMessages;
    } else {
      (async () => {
        prefs = await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        prefs.getPref("message").then((res) => {
          messagesFeed.value = res.messages;
        });
      })();
    }
    function resetMessages() {
      if (platform.is.desktop) {
        messageStore.deleteMessages();
        messageStore.setMessagesVisibility(false);
      } else {
        prefs.removePref("message");
        prefs.setPref("message", { messages: [], messagesVisibility: false });
      }
      messagesFeed.value = [];
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(messagesFeed), (msg, ind) => {
          return openBlock(), createElementBlock("div", {
            class: "q-pt-md q-pb-md",
            key: ind
          }, [
            createVNode(QBanner, {
              "inline-actions": "",
              dense: unref(platform) === "web" ? false : true,
              class: normalizeClass(`text-white text-weight-bolder ${!msg.severity ? "bg-green-10" : "bg-red-10"}`)
            }, {
              action: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  color: "white",
                  icon: "cancel",
                  onClick: _cache[0] || (_cache[0] = ($event) => resetMessages($event))
                })
              ]),
              default: withCtx(() => [
                createTextVNode(toDisplayString(msg.content) + " ", 1)
              ]),
              _: 2
            }, 1032, ["dense", "class"])
          ]);
        }), 128))
      ]);
    };
  }
});
var MessagesItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "MessagesItem.vue"]]);
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length > 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    clearTimeout(focusoutTimer);
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
export { MessagesItem as M, useFormProps as a, useFormInject as b, useFieldProps as c, useFieldEmits as d, useField as e, useFieldState as f, useFormInputNameAttr as g, fieldValueIsFilled as h, useKeyComposition as i, useMessageStore as u };
//# sourceMappingURL=data:application/json;base64,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WUFBWSxJQUFJO0FBQzdDLFNBQU8sQ0FBQyxPQUFPLFFBQVEsY0FBYztBQUNuQyxVQUFPO0FBQUEsTUFDTCxFQUFFLFNBQVM7QUFBQSxRQUNULE9BQU8sWUFBWSxhQUFhO0FBQUEsUUFDaEMsR0FBRyxVQUFVO0FBQUEsTUFDckIsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0g7QUFFTyxTQUFTLHFCQUFzQixPQUFPO0FBQzNDLFNBQU8sU0FBUyxNQUFNLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDL0M7QUN6QkEsTUFBTSxhQUFhO0FBQ25CLE1BQU0sWUFBWTtBQUNsQixNQUFNLFdBQVc7QUFDakIsTUFBTSxjQUFjO0FBRUwsU0FBUSxrQkFBRSxTQUFTO0FBQ2hDLFNBQU8sU0FBUyxjQUFlLEdBQUc7QUFDaEMsUUFBSSxFQUFFLFNBQVMsb0JBQW9CLEVBQUUsU0FBUyxVQUFVO0FBQ3RELFVBQUksRUFBRSxPQUFPLGVBQWUsTUFBTTtBQUFFO0FBQUEsTUFBUTtBQUM1QyxRQUFFLE9BQU8sYUFBYTtBQUN0QixjQUFRLENBQUM7QUFBQSxJQUNWLFdBRUMsRUFBRSxTQUFTLHVCQUNSLEVBQUUsT0FBTyxlQUFlLFFBQ3hCLE9BQU8sRUFBRSxTQUFTLFVBQ3JCO0FBQ0EsWUFBTSxjQUFjLE9BQU8sR0FBRyxZQUFZLE9BQ3RDLFlBQVksS0FBSyxFQUFFLElBQUksTUFBTSxRQUM3QixXQUFXLEtBQUssRUFBRSxJQUFJLE1BQU0sUUFBUSxVQUFVLEtBQUssRUFBRSxJQUFJLE1BQU0sUUFBUSxTQUFTLEtBQUssRUFBRSxJQUFJLE1BQU07QUFFckcsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixVQUFFLE9BQU8sYUFBYTtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL21lc3NhZ2UudHMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Jhbm5lci9RQmFubmVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvTWVzc2FnZXNJdGVtLnZ1ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1mb3JtLWNoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcGF0dGVybnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgZGVmaW5lU3RvcmUsIGFjY2VwdEhNUlVwZGF0ZSB9IGZyb20gJ3BpbmlhJztcbi8vIGltcG9ydCB7IHVzZVN0b3JhZ2UgfSBmcm9tICdAdnVldXNlL2NvcmUnO1xuaW1wb3J0IHsgY29va2llU3RvcmFnZSB9IGZyb20gJ2FwcC9zcmMvc3RvcmVzL3N0b3JhZ2UnO1xuXG5jb25zdCB1c2VNZXNzYWdlU3RvcmUgPSBkZWZpbmVTdG9yZSgnbWVzc2FnZScsIHtcbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgbWVzc2FnZXM6IFtdLFxuICAgIG1lc3NhZ2VzVmlzaWJpbGl0eTogZmFsc2UsXG4gIH0pLFxuICBwZXJzaXN0OiB7XG4gICAgc3RvcmFnZTogY29va2llU3RvcmFnZSxcbiAgfSxcbiAgZ2V0dGVyczoge1xuICAgIGdldE1lc3NhZ2VzKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUubWVzc2FnZXM7XG4gICAgfSxcbiAgICBnZXRNZXNzYWdlc1Zpc2liaWxpdHkoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5tZXNzYWdlc1Zpc2liaWxpdHk7XG4gICAgfSxcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGRlbGV0ZU1lc3NhZ2VzKCkge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgICAgdGhpcy5tZXNzYWdlc1Zpc2liaWxpdHkgPSBmYWxzZTtcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzVmlzaWJpbGl0eSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgIHRoaXMubWVzc2FnZXNWaXNpYmlsaXR5ID0gdmFsO1xuICAgIH0sXG4gIH0sXG59KTtcblxuLy8gbWFrZSBzdXJlIHRvIHBhc3MgdGhlIHJpZ2h0IHN0b3JlIGRlZmluaXRpb24sIGB1c2VBdXRoYCBpbiB0aGlzIGNhc2UuXG5pZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gIGltcG9ydC5tZXRhLmhvdC5hY2NlcHQoYWNjZXB0SE1SVXBkYXRlKHVzZU1lc3NhZ2VTdG9yZSwgaW1wb3J0Lm1ldGEuaG90KSk7XG59XG5cbmV4cG9ydCB7IHVzZU1lc3NhZ2VTdG9yZSB9O1xuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJhbm5lcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpbmxpbmVBY3Rpb25zOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYmFubmVyIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1iYW5uZXItLWRlbnNlJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWJhbm5lci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYWN0aW9uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYmFubmVyX19hY3Rpb25zIHJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQnXG4gICAgICArIGAgY29sLSR7IHByb3BzLmlubGluZUFjdGlvbnMgPT09IHRydWUgPyAnYXV0bycgOiAnYWxsJyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1iYW5uZXJfX2F2YXRhciBjb2wtYXV0byByb3cgaXRlbXMtY2VudGVyIHNlbGYtc3RhcnQnXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmF2YXRhcikpLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYmFubmVyX19jb250ZW50IGNvbCB0ZXh0LWJvZHkyJ1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIF1cblxuICAgICAgY29uc3QgYWN0aW9ucyA9IGhTbG90KHNsb3RzLmFjdGlvbilcbiAgICAgIGFjdGlvbnMgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBhY3Rpb25DbGFzcy52YWx1ZSB9LCBhY3Rpb25zKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgICAgICAgICsgKHByb3BzLmlubGluZUFjdGlvbnMgPT09IGZhbHNlICYmIGFjdGlvbnMgIT09IHZvaWQgMCA/ICcgcS1iYW5uZXItLXRvcC1wYWRkaW5nJyA6ICcnKSxcbiAgICAgICAgcm9sZTogJ2FsZXJ0J1xuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XG4gICAgPGRpdiBjbGFzcz1cInEtcHQtbWQgcS1wYi1tZFwiIHYtZm9yPVwiKG1zZywgaW5kKSBpbiBtZXNzYWdlc0ZlZWRcIiA6a2V5PVwiaW5kXCI+XG4gICAgICA8cS1iYW5uZXJcbiAgICAgICAgaW5saW5lLWFjdGlvbnNcbiAgICAgICAgOmRlbnNlPVwicGxhdGZvcm0gPT09ICd3ZWInID8gZmFsc2UgOiB0cnVlXCJcbiAgICAgICAgOmNsYXNzPVwiYHRleHQtd2hpdGUgdGV4dC13ZWlnaHQtYm9sZGVyICR7IW1zZy5zZXZlcml0eSA/ICdiZy1ncmVlbi0xMCcgOiAnYmctcmVkLTEwJ31gXCI+XG4gICAgICAgICAge3sgbXNnLmNvbnRlbnQgfX1cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphY3Rpb24+XG4gICAgICAgICAgPHEtYnRuIGZsYXQgY29sb3I9XCJ3aGl0ZVwiIGljb249XCJjYW5jZWxcIiBAY2xpY2s9XCJyZXNldE1lc3NhZ2VzKCRldmVudClcIiAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWJhbm5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZU1lc3NhZ2VTdG9yZSB9IGZyb20gJ3N0b3Jlcy9tZXNzYWdlJztcbi8vIGltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJztcblxuLy8gVkFSSUFCTEVTXG5pbnRlcmZhY2UgTWVzc2FnZVByb3BzIHtcbiAgbWVzc2FnZXM/OiBNZXNzYWdlW107XG59O1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPE1lc3NhZ2VQcm9wcz4oKSwge1xuICBtZXNzYWdlczogKCkgPT4gKFtdKSxcbn0pO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcblxubGV0IG1lc3NhZ2VTdG9yZTogYW55ID0gbnVsbCwgbWVzc2FnZXNGZWVkOiBSZWY8TWVzc2FnZVtdPiA9IHJlZihbXSksIHByZWZzOiBhbnkgPSBudWxsO1xuXG4vLyBERUNMQVJBVElPTlNcbi8vIGNvbnNvbGUubG9nKCdQcm9wcyBNZXNzYWdlICEnKTtcbi8vIGNvbnNvbGUubG9nKHByb3BzLm1lc3NhZ2VzKTtcbm1lc3NhZ2VzRmVlZCA9IHJlZihwcm9wcy5tZXNzYWdlcyk7XG4vLyBjb25zdCBsZW5ndGggPSBwcm9wcy5tZXNzYWdlcy5sZW5ndGg7XG4vLyBjb25zdCBtZXNzYWdlcyA9IHByb3BzLm1lc3NhZ2VzO1xuLy8gaWYgKGxlbmd0aCl7XG4vLyAgIG1lc3NhZ2VzRmVlZC52YWx1ZSA9IG1lc3NhZ2VzO1xuLy8gfVxuXG5pZiAocGxhdGZvcm0uaXMuZGVza3RvcCkge1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgbWVzc2FnZXNGZWVkLnZhbHVlID0gbWVzc2FnZVN0b3JlLmdldE1lc3NhZ2VzO1xufSBlbHNlIHtcbiAgLy8gY29uc29sZS5sb2coJ3BsYXRmb3JtJyArIHBsYXRmb3JtKTtcbiAgKGFzeW5jICgpPT4ge1xuICAgIHByZWZzID0gYXdhaXQgaW1wb3J0KCdjYXAvc3RvcmFnZS9wcmVmZXJlbmNlcycpO1xuICAgIHByZWZzLmdldFByZWYoJ21lc3NhZ2UnKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBtZXNzYWdlc0ZlZWQudmFsdWUgPSByZXMubWVzc2FnZXM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBNZXNzYWdlcyBGZWVkIC0tPiBgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXNGZWVkLnZhbHVlKTtcbiAgICAgIH0pO1xuICB9KSgpO1xufVxuXG4vLyBGVU5DVElPTlNcbmZ1bmN0aW9uIHJlc2V0TWVzc2FnZXMoKSB7XG4gIC8vIG1lc3NhZ2VzLnZhbHVlID0gW107XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBtZXNzYWdlU3RvcmUuZGVsZXRlTWVzc2FnZXMoKTtcbiAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgfVxuICBlbHNle1xuICAgIHByZWZzLnJlbW92ZVByZWYoJ21lc3NhZ2UnKTtcbiAgICBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge21lc3NhZ2VzOiBbXSwgbWVzc2FnZXNWaXNpYmlsaXR5OiBmYWxzZX0pO1xuICB9XG4gIG1lc3NhZ2VzRmVlZC52YWx1ZSA9IFtdO1xufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgaW5qZWN0LCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiwgcmVxdWlyZXNRRm9ybSB9KSB7XG4gIGNvbnN0ICRmb3JtID0gaW5qZWN0KGZvcm1LZXksIGZhbHNlKVxuXG4gIGlmICgkZm9ybSAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIC8vIGV4cG9ydCBwdWJsaWMgbWV0aG9kIChzbyBpdCBjYW4gYmUgdXNlZCBpbiBRRm9ybSlcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRpc2FibGUsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHR5cGVvZiByZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyByZWdpc3RlciB0byBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIC8vIHVuLXJlZ2lzdGVyIGZyb20gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKHJlcXVpcmVzUUZvcm0gPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQYXJlbnQgUUZvcm0gbm90IGZvdW5kIG9uIHVzZUZvcm1DaGlsZCgpIScpXG4gIH1cbn1cbiIsIi8vIGZpbGUgcmVmZXJlbmNlZCBmcm9tIGRvY3NcblxuY29uc3RcbiAgaGV4ID0gL14jWzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLFxuICBoZXhhID0gL14jWzAtOWEtZkEtRl17NH0oWzAtOWEtZkEtRl17NH0pPyQvLFxuICBoZXhPckhleGEgPSAvXiMoWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17NH18WzAtOWEtZkEtRl17Nn18WzAtOWEtZkEtRl17OH0pJC8sXG4gIHJnYiA9IC9ecmdiXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSlcXCkkLyxcbiAgcmdiYSA9IC9ecmdiYVxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCgwfDBcXC5bMC05XStbMS05XXwwXFwuWzEtOV0rfDEpXFwpJC9cblxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdWkvdHlwZXMvYXBpL3ZhbGlkYXRpb24uZC50c1xuZXhwb3J0IGNvbnN0IHRlc3RQYXR0ZXJuID0ge1xuICBkYXRlOiB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZFxcL1swLTNdXFxkJC8udGVzdCh2KSxcbiAgdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCQvLnRlc3QodiksXG4gIGZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgdGltZU9yRnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQoOlswLTVdXFxkKT8kLy50ZXN0KHYpLFxuXG4gIC8vIC0tIFJGQyA1MzIyIC0tXG4gIC8vIC0tIEFkZGVkIGluIHYyLjYuNiAtLVxuICAvLyBUaGlzIGlzIGEgYmFzaWMgaGVscGVyIHZhbGlkYXRpb24uXG4gIC8vIEZvciBzb21ldGhpbmcgbW9yZSBjb21wbGV4IChsaWtlIFJGQyA4MjIpIHlvdSBzaG91bGQgd3JpdGUgYW5kIHVzZSB5b3VyIG93biBydWxlLlxuICAvLyBXZSB3b24ndCBiZSBhY2NlcHRpbmcgUFJzIHRvIGVuaGFuY2UgdGhlIG9uZSBiZWxvdyBiZWNhdXNlIG9mIHRoZSByZWFzb24gYWJvdmUuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBlbWFpbDogdiA9PiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHYpLFxuXG4gIGhleENvbG9yOiB2ID0+IGhleC50ZXN0KHYpLFxuICBoZXhhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpLFxuICBoZXhPckhleGFDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSxcblxuICByZ2JDb2xvcjogdiA9PiByZ2IudGVzdCh2KSxcbiAgcmdiYUNvbG9yOiB2ID0+IHJnYmEudGVzdCh2KSxcbiAgcmdiT3JSZ2JhQ29sb3I6IHYgPT4gcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuXG4gIGhleE9yUmdiQ29sb3I6IHYgPT4gaGV4LnRlc3QodikgfHwgcmdiLnRlc3QodiksXG4gIGhleGFPclJnYmFDb2xvcjogdiA9PiBoZXhhLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuICBhbnlDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSB8fCByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3Qodilcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZXN0UGF0dGVyblxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRm9ybUNoaWxkIGZyb20gJy4uL3VzZS1mb3JtLWNoaWxkLmpzJ1xuaW1wb3J0IHsgdGVzdFBhdHRlcm4gfSBmcm9tICcuLi8uLi91dGlscy9wYXR0ZXJucy5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuY29uc3QgbGF6eVJ1bGVzVmFsdWVzID0gWyB0cnVlLCBmYWxzZSwgJ29uZGVtYW5kJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VWYWxpZGF0ZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7fSxcblxuICBlcnJvcjoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgbm9FcnJvckljb246IEJvb2xlYW4sXG5cbiAgcnVsZXM6IEFycmF5LFxuICByZWFjdGl2ZVJ1bGVzOiBCb29sZWFuLFxuICBsYXp5UnVsZXM6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIHZhbGlkYXRvcjogdiA9PiBsYXp5UnVsZXNWYWx1ZXMuaW5jbHVkZXModilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZm9jdXNlZCwgaW5uZXJMb2FkaW5nKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlubmVyRXJyb3IgPSByZWYoZmFsc2UpXG4gIGNvbnN0IGlubmVyRXJyb3JNZXNzYWdlID0gcmVmKG51bGwpXG4gIGNvbnN0IGlzRGlydHlNb2RlbCA9IHJlZihudWxsKVxuXG4gIHVzZUZvcm1DaGlsZCh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICBsZXQgdmFsaWRhdGVJbmRleCA9IDAsIHVud2F0Y2hSdWxlc1xuXG4gIGNvbnN0IGhhc1J1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ydWxlcyAhPT0gdm9pZCAwXG4gICAgJiYgcHJvcHMucnVsZXMgIT09IG51bGxcbiAgICAmJiBwcm9wcy5ydWxlcy5sZW5ndGggPiAwXG4gIClcblxuICBjb25zdCBoYXNBY3RpdmVSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBoYXNFcnJvciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZXJyb3IgPT09IHRydWUgfHwgaW5uZXJFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5lcnJvck1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHByb3BzLmVycm9yTWVzc2FnZS5sZW5ndGggPiAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICB2YWxpZGF0ZUlmTmVlZGVkKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgKCkgPT4ge1xuICAgICAgICAgIHZhbGlkYXRlSWZOZWVkZWQodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goZm9jdXNlZCwgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBpZiBpdCdzIGFscmVhZHkgaW4gcHJvZ3Jlc3M7XG4gICAgICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgICAgICAvLyBRRm9ybSdzIHN1Ym1pdCgpIGhhcyBiZWVuIGNhbGxlZCBhbHJlYWR5IChFTlRFUiBrZXkpXG4gICAgICAgICYmIGlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkge1xuICAgICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgdmFsaWRhdGVJbmRleCsrXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBudWxsXG4gICAgaW5uZXJFcnJvci52YWx1ZSA9IGZhbHNlXG4gICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBudWxsXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybiB2YWx1ZVxuICAgKiAgIC0gdHJ1ZSAodmFsaWRhdGlvbiBzdWNjZWVkZWQpXG4gICAqICAgLSBmYWxzZSAodmFsaWRhdGlvbiBmYWlsZWQpXG4gICAqICAgLSBQcm9taXNlIChwZW5kaW5nIGFzeW5jIHZhbGlkYXRpb24pXG4gICAqL1xuICBmdW5jdGlvbiB2YWxpZGF0ZSAodmFsID0gcHJvcHMubW9kZWxWYWx1ZSkge1xuICAgIGlmIChoYXNBY3RpdmVSdWxlcy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgY29uc3Qgc2V0RGlydHkgPSBpbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgID8gKCkgPT4geyBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlIH1cbiAgICAgIDogKCkgPT4ge31cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgZXJyID09PSB0cnVlICYmIHNldERpcnR5KClcblxuICAgICAgaW5uZXJFcnJvci52YWx1ZSA9IGVyclxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBtc2cgfHwgbnVsbFxuICAgICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBydWxlID0gcHJvcHMucnVsZXNbIGkgXVxuICAgICAgbGV0IHJlc1xuXG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzID0gcnVsZSh2YWwsIHRlc3RQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnICYmIHRlc3RQYXR0ZXJuWyBydWxlIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXMgPSB0ZXN0UGF0dGVyblsgcnVsZSBdKHZhbClcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChyZXMgIT09IHRydWUgJiYgcmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKGZhbHNlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzID09PSB2b2lkIDAgfHwgQXJyYXkuaXNBcnJheShyZXMpID09PSBmYWxzZSB8fCByZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKGZhbHNlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtc2cgPSByZXMuZmluZChyID0+IHIgPT09IGZhbHNlIHx8IHR5cGVvZiByID09PSAnc3RyaW5nJylcbiAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKG1zZyAhPT0gdm9pZCAwLCBtc2cpXG4gICAgICAgIHJldHVybiBtc2cgPT09IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgdXBkYXRlKHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUlmTmVlZGVkIChjaGFuZ2VkUnVsZXMpIHtcbiAgICBpZiAoXG4gICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSB0cnVlIHx8IChwcm9wcy5sYXp5UnVsZXMgIT09IHRydWUgJiYgY2hhbmdlZFJ1bGVzICE9PSB0cnVlKSlcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWJvdW5jZWRWYWxpZGF0ZSA9IGRlYm91bmNlKHZhbGlkYXRlLCAwKVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgdW53YXRjaFJ1bGVzICE9PSB2b2lkIDAgJiYgdW53YXRjaFJ1bGVzKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBvbkJlZm9yZVVwZGF0ZSB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbGlzdGVuZXJSRSA9IC9eb25bQS1aXS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGF0dHJzLCB2bm9kZSkge1xuICBjb25zdCBhY2MgPSB7XG4gICAgbGlzdGVuZXJzOiByZWYoe30pLFxuICAgIGF0dHJpYnV0ZXM6IHJlZih7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgbGlzdGVuZXJzID0ge31cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICBpZiAoa2V5ICE9PSAnY2xhc3MnICYmIGtleSAhPT0gJ3N0eWxlJyAmJiBsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cmlidXRlc1sga2V5IF0gPSBhdHRyc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2bm9kZS5wcm9wcykge1xuICAgICAgaWYgKGxpc3RlbmVyUkUudGVzdChrZXkpID09PSB0cnVlKSB7XG4gICAgICAgIGxpc3RlbmVyc1sga2V5IF0gPSB2bm9kZS5wcm9wc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY2MuYXR0cmlidXRlcy52YWx1ZSA9IGF0dHJpYnV0ZXNcbiAgICBhY2MubGlzdGVuZXJzLnZhbHVlID0gbGlzdGVuZXJzXG4gIH1cblxuICBvbkJlZm9yZVVwZGF0ZSh1cGRhdGUpXG5cbiAgdXBkYXRlKClcblxuICByZXR1cm4gYWNjXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi91c2UtdmFsaWRhdGUuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuL3VzZS1zcGxpdC1hdHRycy5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGdldFRhcmdldFVpZCAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCA/IGBmXyR7IHVpZCgpIH1gIDogdmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmcsXG5cbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJywgJ3BvcHVwU2hvdycsICdwb3B1cEhpZGUnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKCkge1xuICBjb25zdCB7IHByb3BzLCBhdHRycywgcHJveHksIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gIHJldHVybiB7XG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKGF0dHJzLCB2bm9kZSksXG4gICAgdGFyZ2V0VWlkOiByZWYoZ2V0VGFyZ2V0VWlkKHByb3BzLmZvcikpLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXJcblxuICBpZiAoc3RhdGUuaGFzVmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLm1vZGVsVmFsdWUpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmVtaXRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuZW1pdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUuY29udHJvbEV2ZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29udHJvbEV2ZW50cyA9IHtcbiAgICAgIG9uRm9jdXNpbjogb25Db250cm9sRm9jdXNpbixcbiAgICAgIG9uRm9jdXNvdXQ6IG9uQ29udHJvbEZvY3Vzb3V0XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGNsZWFyVmFsdWUsXG4gICAgb25Db250cm9sRm9jdXNpbixcbiAgICBvbkNvbnRyb2xGb2N1c291dCxcbiAgICBmb2N1c1xuICB9KVxuXG4gIGlmIChzdGF0ZS5jb21wdXRlZENvdW50ZXIgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbXB1dGVkQ291bnRlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb3VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBsZW4gPSB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAoJycgKyBwcm9wcy5tb2RlbFZhbHVlKS5sZW5ndGhcbiAgICAgICAgICA6IChBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlID8gcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggOiAwKVxuXG4gICAgICAgIGNvbnN0IG1heCA9IHByb3BzLm1heGxlbmd0aCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBwcm9wcy5tYXhsZW5ndGhcbiAgICAgICAgICA6IHByb3BzLm1heFZhbHVlc1xuXG4gICAgICAgIHJldHVybiBsZW4gKyAobWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfSA9IHVzZVZhbGlkYXRlKHN0YXRlLmZvY3VzZWQsIHN0YXRlLmlubmVyTG9hZGluZylcblxuICBjb25zdCBmbG9hdGluZ0xhYmVsID0gc3RhdGUuZmxvYXRpbmdMYWJlbCAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICA6IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBzaG91bGRSZW5kZXJCb3R0b20gPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmJvdHRvbVNsb3RzID09PSB0cnVlXG4gICAgfHwgcHJvcHMuaGludCAhPT0gdm9pZCAwXG4gICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICB8fCBwcm9wcy5jb3VudGVyID09PSB0cnVlXG4gICAgfHwgcHJvcHMuZXJyb3IgIT09IG51bGxcbiAgKVxuXG4gIGNvbnN0IHN0eWxlVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZmlsbGVkID09PSB0cnVlKSB7IHJldHVybiAnZmlsbGVkJyB9XG4gICAgaWYgKHByb3BzLm91dGxpbmVkID09PSB0cnVlKSB7IHJldHVybiAnb3V0bGluZWQnIH1cbiAgICBpZiAocHJvcHMuYm9yZGVybGVzcyA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2JvcmRlcmxlc3MnIH1cbiAgICBpZiAocHJvcHMuc3RhbmRvdXQpIHsgcmV0dXJuICdzdGFuZG91dCcgfVxuICAgIHJldHVybiAnc3RhbmRhcmQnXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtZmllbGQgcm93IG5vLXdyYXAgaXRlbXMtc3RhcnQgcS1maWVsZC0tJHsgc3R5bGVUeXBlLnZhbHVlIH1gXG4gICAgKyAoc3RhdGUuZmllbGRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gIDogJycpXG4gICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcm91bmRlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZmllbGQtLXNxdWFyZScgOiAnJylcbiAgICArIChmbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mbG9hdCcgOiAnJylcbiAgICArIChoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tbGFiZWxlZCcgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGVuc2UnIDogJycpXG4gICAgKyAocHJvcHMuaXRlbUFsaWduZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLWl0ZW0tYWxpZ25lZCBxLWl0ZW0tdHlwZScgOiAnJylcbiAgICArIChzdGF0ZS5pc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRhcmsnIDogJycpXG4gICAgKyAoc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwID8gJyBxLWZpZWxkLS1hdXRvLWhlaWdodCcgOiAnJylcbiAgICArIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mb2N1c2VkJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1lcnJvcicgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1oaWdobGlnaHRlZCcgOiAnJylcbiAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgJiYgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS13aXRoLWJvdHRvbScgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kaXNhYmxlZCcgOiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAnIHEtZmllbGQtLXJlYWRvbmx5JyA6ICcnKSlcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2NvbnRyb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAnXG4gICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKyAoXG4gICAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICcgdGV4dC1uZWdhdGl2ZSdcbiAgICAgICAgOiAoXG4gICAgICAgICAgICB0eXBlb2YgcHJvcHMuc3RhbmRvdXQgPT09ICdzdHJpbmcnICYmIHByb3BzLnN0YW5kb3V0Lmxlbmd0aCA+IDAgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGAgJHsgcHJvcHMuc3RhbmRvdXQgfWBcbiAgICAgICAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgICAgIClcbiAgICApXG4gIClcblxuICBjb25zdCBoYXNMYWJlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMubGFiZWxTbG90ID09PSB0cnVlIHx8IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgKVxuXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19sYWJlbCBuby1wb2ludGVyLWV2ZW50cyBhYnNvbHV0ZSBlbGxpcHNpcydcbiAgICArIChwcm9wcy5sYWJlbENvbG9yICE9PSB2b2lkIDAgJiYgaGFzRXJyb3IudmFsdWUgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMubGFiZWxDb2xvciB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgY29udHJvbFNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICBlZGl0YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUsXG4gICAgZm9jdXNlZDogc3RhdGUuZm9jdXNlZC52YWx1ZSxcbiAgICBmbG9hdGluZ0xhYmVsOiBmbG9hdGluZ0xhYmVsLnZhbHVlLFxuICAgIG1vZGVsVmFsdWU6IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgZW1pdFZhbHVlOiBzdGF0ZS5lbWl0VmFsdWVcbiAgfSkpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7XG4gICAgICBmb3I6IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLXJlYWRvbmx5JyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmZvciwgdmFsID0+IHtcbiAgICAvLyBkb24ndCB0cmFuc2Zvcm0gdGFyZ2V0VWlkIGludG8gYSBjb21wdXRlZFxuICAgIC8vIHByb3AgYXMgaXQgd2lsbCBicmVhayBTU1JcbiAgICBzdGF0ZS50YXJnZXRVaWQudmFsdWUgPSBnZXRUYXJnZXRVaWQodmFsKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGZvY3VzSGFuZGxlciAoKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgbGV0IHRhcmdldCA9IHN0YXRlLnRhcmdldFJlZiAhPT0gdm9pZCAwICYmIHN0YXRlLnRhcmdldFJlZi52YWx1ZVxuXG4gICAgaWYgKHRhcmdldCAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSkpIHtcbiAgICAgIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09IHRydWUgfHwgKHRhcmdldCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCdbdGFiaW5kZXhdJykpXG4gICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICBhZGRGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsdXIgKCkge1xuICAgIHJlbW92ZUZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIChlbCAhPT0gbnVsbCAmJiBzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGVsKSkge1xuICAgICAgZWwuYmx1cigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNpbiAoZSkge1xuICAgIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgIGZvY3Vzb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZG9jdW1lbnQuaGFzRm9jdXMoKSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID09PSB0cnVlXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZiA9PT0gdm9pZCAwXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZSA9PT0gbnVsbFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgfVxuXG4gICAgICB0aGVuICE9PSB2b2lkIDAgJiYgdGhlbigpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVmFsdWUgKGUpIHtcbiAgICAvLyBwcmV2ZW50IGFjdGl2YXRpbmcgdGhlIGZpZWxkIGJ1dCBrZWVwIGZvY3VzIG9uIGRlc2t0b3BcbiAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZWwgPSAoc3RhdGUudGFyZ2V0UmVmICE9PSB2b2lkIDAgJiYgc3RhdGUudGFyZ2V0UmVmLnZhbHVlKSB8fCBzdGF0ZS5yb290UmVmLnZhbHVlXG4gICAgICBlbC5mb2N1cygpXG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykgeyAvLyBUT0RPIHZ1ZTNcbiAgICAgIC8vIGRvIG5vdCBsZXQgZm9jdXMgYmUgdHJpZ2dlcmVkXG4gICAgICAvLyBhcyBpdCB3aWxsIG1ha2UgdGhlIG5hdGl2ZSBmaWxlIGRpYWxvZ1xuICAgICAgLy8gYXBwZWFyIGZvciBhbm90aGVyIHNlbGVjdGlvblxuICAgICAgc3RhdGUuaW5wdXRSZWYudmFsdWUudmFsdWUgPSBudWxsXG4gICAgfVxuXG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgIGVtaXQoJ2NsZWFyJywgcHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG5cbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBzbG90cy5wcmVwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZXBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLnByZXBlbmQoKSlcbiAgICApXG5cbiAgICBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fY29udHJvbC1jb250YWluZXIgY29sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgZ2V0Q29udHJvbENvbnRhaW5lcigpKVxuICAgIClcblxuICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vRXJyb3JJY29uID09PSBmYWxzZSAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2Vycm9yJywgW1xuICAgICAgICBoKFFJY29uLCB7IG5hbWU6ICRxLmljb25TZXQuZmllbGQuZXJyb3IsIGNvbG9yOiAnbmVnYXRpdmUnIH0pXG4gICAgICBdKVxuICAgIClcblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlIHx8IHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoXG4gICAgICAgICAgJ2lubmVyLWxvYWRpbmctYXBwZW5kJyxcbiAgICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgICA6IFsgaChRU3Bpbm5lciwgeyBjb2xvcjogcHJvcHMuY29sb3IgfSkgXVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWNsZWFyYWJsZS1hcHBlbmQnLCBbXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19mb2N1c2FibGUtYWN0aW9uJyxcbiAgICAgICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jbGVhckljb24gfHwgJHEuaWNvblNldC5maWVsZC5jbGVhcixcbiAgICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBudWxsLFxuICAgICAgICAgICAgcm9sZTogbnVsbCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNsZWFyVmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNsb3RzLmFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAnYXBwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMuYXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0SW5uZXJBcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWFwcGVuZCcsIHN0YXRlLmdldElubmVyQXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkKClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udHJvbENvbnRhaW5lciAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBwcm9wcy5wcmVmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5wcmVmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZWZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMucHJlZml4KVxuICAgIClcblxuICAgIGlmIChzdGF0ZS5nZXRTaGFkb3dDb250cm9sICE9PSB2b2lkIDAgJiYgc3RhdGUuaGFzU2hhZG93LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIHN0YXRlLmdldFNoYWRvd0NvbnRyb2woKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5nZXRDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzdGF0ZS5nZXRDb250cm9sKCkpXG4gICAgfVxuICAgIC8vIGludGVybmFsIHVzYWdlIG9ubHk6XG4gICAgZWxzZSBpZiAoc2xvdHMucmF3Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc2xvdHMucmF3Q29udHJvbCgpKVxuICAgIH1cbiAgICBlbHNlIGlmIChzbG90cy5jb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUudGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdycsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwXG4gICAgICAgIH0sIHNsb3RzLmNvbnRyb2woY29udHJvbFNsb3RTY29wZS52YWx1ZSkpXG4gICAgICApXG4gICAgfVxuXG4gICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZVxuICAgICAgfSwgaFNsb3Qoc2xvdHMubGFiZWwsIHByb3BzLmxhYmVsKSlcbiAgICApXG5cbiAgICBwcm9wcy5zdWZmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5zdWZmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3N1ZmZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMuc3VmZml4KVxuICAgIClcblxuICAgIHJldHVybiBub2RlLmNvbmNhdChoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdHRvbSAoKSB7XG4gICAgbGV0IG1zZywga2V5XG5cbiAgICBpZiAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2UudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCB7IHJvbGU6ICdhbGVydCcgfSwgZXJyb3JNZXNzYWdlLnZhbHVlKSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWVycm9yLSR7IGVycm9yTWVzc2FnZS52YWx1ZSB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmVycm9yKVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1lcnJvcidcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuaGlkZUhpbnQgIT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLmhpbnQgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHByb3BzLmhpbnQpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtaGludC0keyBwcm9wcy5oaW50IH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuaGludClcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtaGludCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYXNDb3VudGVyID0gcHJvcHMuY291bnRlciA9PT0gdHJ1ZSB8fCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDBcblxuICAgIGlmIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWUgJiYgaGFzQ291bnRlciA9PT0gZmFsc2UgJiYgbXNnID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG1haW4gPSBoKCdkaXYnLCB7XG4gICAgICBrZXksXG4gICAgICBjbGFzczogJ3EtZmllbGRfX21lc3NhZ2VzIGNvbCdcbiAgICB9LCBtc2cpXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLWZpZWxkX19ib3R0b20gcm93IGl0ZW1zLXN0YXJ0IHEtZmllbGRfX2JvdHRvbS0tJ1xuICAgICAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgPyAnYW5pbWF0ZWQnIDogJ3N0YWxlJyksXG4gICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgfSwgW1xuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAgID8gbWFpblxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1maWVsZC1tZXNzYWdlJyB9LCAoKSA9PiBtYWluKSxcblxuICAgICAgaGFzQ291bnRlciA9PT0gdHJ1ZVxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvdW50ZXInXG4gICAgICAgIH0sIHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMCA/IHNsb3RzLmNvdW50ZXIoKSA6IHN0YXRlLmNvbXB1dGVkQ291bnRlci52YWx1ZSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyQXBwZW5kTm9kZSAoa2V5LCBjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnQgPT09IG51bGxcbiAgICAgID8gbnVsbFxuICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgY29udGVudClcbiAgfVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBpZiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmZvciA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZS50YXJnZXRVaWQudmFsdWUgPSBnZXRUYXJnZXRVaWQoKVxuICAgIH1cblxuICAgIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgYmx1ciB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJGaWVsZCAoKSB7XG4gICAgY29uc3QgbGFiZWxBdHRycyA9IHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCAmJiBzbG90cy5jb250cm9sID09PSB2b2lkIDBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgICAgfVxuICAgICAgOiBhdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICByZXR1cm4gaCgnbGFiZWwnLCB7XG4gICAgICByZWY6IHN0YXRlLnJvb3RSZWYsXG4gICAgICBjbGFzczogW1xuICAgICAgICBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgXSxcbiAgICAgIHN0eWxlOiBhdHRycy5zdHlsZSxcbiAgICAgIC4uLmxhYmVsQXR0cnNcbiAgICB9LCBbXG4gICAgICBzbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2JlZm9yZSBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYmVmb3JlKCkpXG4gICAgICAgIDogbnVsbCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIGNvbCBzZWxmLXN0cmV0Y2gnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLmNvbnRyb2xSZWYsXG4gICAgICAgICAgY2xhc3M6IGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuY29udHJvbEV2ZW50c1xuICAgICAgICB9LCBnZXRDb250ZW50KCkpLFxuXG4gICAgICAgIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gZ2V0Qm90dG9tKClcbiAgICAgICAgICA6IG51bGxcbiAgICAgIF0pLFxuXG4gICAgICBzbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYWZ0ZXIgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmFmdGVyKCkpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRm9ybVByb3BzID0ge1xuICBuYW1lOiBTdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1BdHRycyAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdHlwZTogJ2hpZGRlbicsXG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbmplY3QgKGZvcm1BdHRycyA9IHt9KSB7XG4gIHJldHVybiAoY2hpbGQsIGFjdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGNsYXNzOiAnaGlkZGVuJyArIChjbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAuLi5mb3JtQXR0cnMudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5wdXROYW1lQXR0ciAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUgfHwgcHJvcHMuZm9yKVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IGZhbHNlXG4gICAgICBvbklucHV0KGUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS50eXBlID09PSAnY29tcG9zaXRpb251cGRhdGUnXG4gICAgICAmJiBlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlXG4gICAgICAmJiB0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJ1xuICAgICkge1xuICAgICAgY29uc3QgaXNDb21wb3NpbmcgPSBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICA/IGlzUGxhaW5UZXh0LnRlc3QoZS5kYXRhKSA9PT0gZmFsc2VcbiAgICAgICAgOiBpc0phcGFuZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0NoaW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzS29yZWFuLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZVxuXG4gICAgICBpZiAoaXNDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgZS50YXJnZXQucUNvbXBvc2luZyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJmaWxlIjoiYXNzZXRzL3VzZS1rZXktY29tcG9zaXRpb24uanMifQ==
