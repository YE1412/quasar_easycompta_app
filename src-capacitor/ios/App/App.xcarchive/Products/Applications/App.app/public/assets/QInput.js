import { c as useFieldProps, a as useFormProps, d as useFieldEmits, g as useFormInputNameAttr, f as useFieldState, e as useField, h as fieldValueIsFilled, i as useKeyComposition } from "./use-key-composition.js";
import { f as ref, w as watch, B as nextTick, x as shouldIgnoreKey, d as computed, c as createComponent, g as getCurrentInstance, n as onBeforeUnmount, o as onMounted, h, az as injectProp, s as stop } from "./index.js";
import { e as addFocusFn } from "./QNoSsr.js";
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { overflow } = inp.style;
          $q.platform.is.firefox !== true && (inp.style.overflow = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          inp.style.overflow = overflow;
          parentStyle.marginBottom = "";
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
export { QInput as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUlucHV0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L3VzZS1tYXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS1kb20tcHJvcHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L1FJbnB1dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWYsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbi8vIGxlYXZlIE5BTUVEX01BU0tTIGF0IHRvcCBvZiBmaWxlIChjb2RlIHJlZmVyZW5jZWQgZnJvbSBkb2NzKVxuY29uc3QgTkFNRURfTUFTS1MgPSB7XG4gIGRhdGU6ICcjIyMjLyMjLyMjJyxcbiAgZGF0ZXRpbWU6ICcjIyMjLyMjLyMjICMjOiMjJyxcbiAgdGltZTogJyMjOiMjJyxcbiAgZnVsbHRpbWU6ICcjIzojIzojIycsXG4gIHBob25lOiAnKCMjIykgIyMjIC0gIyMjIycsXG4gIGNhcmQ6ICcjIyMjICMjIyMgIyMjIyAjIyMjJ1xufVxuXG5jb25zdCBUT0tFTlMgPSB7XG4gICcjJzogeyBwYXR0ZXJuOiAnW1xcXFxkXScsIG5lZ2F0ZTogJ1teXFxcXGRdJyB9LFxuXG4gIFM6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJyB9LFxuICBOOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScgfSxcblxuICBBOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgYTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH0sXG5cbiAgWDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIHg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9XG59XG5cbmNvbnN0IEtFWVMgPSBPYmplY3Qua2V5cyhUT0tFTlMpXG5LRVlTLmZvckVhY2goa2V5ID0+IHtcbiAgVE9LRU5TWyBrZXkgXS5yZWdleCA9IG5ldyBSZWdFeHAoVE9LRU5TWyBrZXkgXS5wYXR0ZXJuKVxufSlcblxuY29uc3RcbiAgdG9rZW5SZWdleE1hc2sgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBLRVlTLmpvaW4oJycpICsgJ10pfCguKScsICdnJyksXG4gIGVzY1JlZ2V4ID0gL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nXG5cbmNvbnN0IE1BUktFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMSlcblxuZXhwb3J0IGNvbnN0IHVzZU1hc2tQcm9wcyA9IHtcbiAgbWFzazogU3RyaW5nLFxuICByZXZlcnNlRmlsbE1hc2s6IEJvb2xlYW4sXG4gIGZpbGxNYXNrOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICB1bm1hc2tlZFZhbHVlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgPiAtMSkge1xuICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSBsb2NhbE1hc2tNYXJrZWQubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHBhZCArPSBNQVJLRVJcbiAgICAgIH1cblxuICAgICAgbG9jYWxNYXNrTWFya2VkID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIHBhZFBvcykgKyBwYWQgKyBsb2NhbE1hc2tNYXJrZWQuc2xpY2UocGFkUG9zKVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbE1hc2tNYXJrZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tJbnRlcm5hbHMgKCkge1xuICAgIGhhc01hc2sudmFsdWUgPSBwcm9wcy5tYXNrICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzLm1hc2subGVuZ3RoID4gMFxuICAgICAgJiYgZ2V0SXNUeXBlVGV4dCgpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbXB1dGVkVW5tYXNrID0gdm9pZCAwXG4gICAgICBtYXNrTWFya2VkID0gJydcbiAgICAgIG1hc2tSZXBsYWNlZCA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgbG9jYWxDb21wdXRlZE1hc2sgPSBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdID09PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5tYXNrXG4gICAgICAgIDogTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSxcbiAgICAgIGZpbGxDaGFyID0gdHlwZW9mIHByb3BzLmZpbGxNYXNrID09PSAnc3RyaW5nJyAmJiBwcm9wcy5maWxsTWFzay5sZW5ndGggPiAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2VuUmVnZXhNYXNrLCAoXywgY2hhcjEsIGVzYywgdG9rZW4sIGNoYXIyKSA9PiB7XG4gICAgICBpZiAodG9rZW4gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjID0gVE9LRU5TWyB0b2tlbiBdXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICBuZWdhdGVDaGFyID0gYy5uZWdhdGVcbiAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPycpXG4gICAgICAgICAgZmlyc3RNYXRjaCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcpPycpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlc2MgIT09IHZvaWQgMCkge1xuICAgICAgICB1bm1hc2tDaGFyID0gJ1xcXFwnICsgKGVzYyA9PT0gJ1xcXFwnID8gJycgOiBlc2MpXG4gICAgICAgIG1hc2sucHVzaChlc2MpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgYyA9IGNoYXIxICE9PSB2b2lkIDAgPyBjaGFyMSA6IGNoYXIyXG4gICAgICAgIHVubWFza0NoYXIgPSBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFxcXFxcXFxcXCcgOiBjLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcXFxcXCQmJylcbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0XG4gICAgICB1bm1hc2tNYXRjaGVyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgJ14nXG4gICAgICAgICsgdW5tYXNrLmpvaW4oJycpXG4gICAgICAgICsgJygnICsgKHVubWFza0NoYXIgPT09ICcnID8gJy4nIDogJ1teJyArIHVubWFza0NoYXIgKyAnXScpICsgJyspPydcbiAgICAgICAgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnJyA6ICdbJyArIHVubWFza0NoYXIgKyAnXSonKSArICckJ1xuICAgICAgKSxcbiAgICAgIGV4dHJhY3RMYXN0ID0gZXh0cmFjdC5sZW5ndGggLSAxLFxuICAgICAgZXh0cmFjdE1hdGNoZXIgPSBleHRyYWN0Lm1hcCgocmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBmaWxsQ2hhckVzY2FwZWQgKyAnKicgKyByZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gZXh0cmFjdExhc3QpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeJyArIHJlXG4gICAgICAgICAgICArICcoJyArIChuZWdhdGVDaGFyID09PSAnJyA/ICcuJyA6IG5lZ2F0ZUNoYXIpICsgJyspPydcbiAgICAgICAgICAgICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICckJyA6IGZpbGxDaGFyRXNjYXBlZCArICcqJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByZSlcbiAgICAgIH0pXG5cbiAgICBjb21wdXRlZE1hc2sgPSBtYXNrXG4gICAgY29tcHV0ZWRVbm1hc2sgPSB2YWwgPT4ge1xuICAgICAgY29uc3QgdW5tYXNrTWF0Y2ggPSB1bm1hc2tNYXRjaGVyLmV4ZWMocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gdmFsIDogdmFsLnNsaWNlKDAsIG1hc2subGVuZ3RoKSlcbiAgICAgIGlmICh1bm1hc2tNYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSB1bm1hc2tNYXRjaC5zbGljZSgxKS5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBleHRyYWN0TWF0Y2ggPSBbXSxcbiAgICAgICAgZXh0cmFjdE1hdGNoZXJMZW5ndGggPSBleHRyYWN0TWF0Y2hlci5sZW5ndGhcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIHN0ciA9IHZhbDsgaSA8IGV4dHJhY3RNYXRjaGVyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbSA9IGV4dHJhY3RNYXRjaGVyWyBpIF0uZXhlYyhzdHIpXG5cbiAgICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKG0uc2hpZnQoKS5sZW5ndGgpXG4gICAgICAgIGV4dHJhY3RNYXRjaC5wdXNoKC4uLm0pXG4gICAgICB9XG4gICAgICBpZiAoZXh0cmFjdE1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RNYXRjaC5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIG1hc2tNYXJrZWQgPSBtYXNrLm1hcCh2ID0+ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogTUFSS0VSKSkuam9pbignJylcbiAgICBtYXNrUmVwbGFjZWQgPSBtYXNrTWFya2VkLnNwbGl0KE1BUktFUikuam9pbihmaWxsQ2hhcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tWYWx1ZSAocmF3VmFsLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZywgaW5wdXRUeXBlKSB7XG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZCxcbiAgICAgIGVuZFJldmVyc2UgPSBpbnAudmFsdWUubGVuZ3RoIC0gZW5kLFxuICAgICAgdW5tYXNrZWQgPSB1bm1hc2tWYWx1ZShyYXdWYWwpXG5cbiAgICAvLyBVcGRhdGUgaGVyZSBzbyB1bm1hc2sgdXNlcyB0aGUgb3JpZ2luYWwgZmlsbENoYXJcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZyA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGNvbnN0XG4gICAgICBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrZWQpLFxuICAgICAgbWFza2VkID0gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKHByZU1hc2tlZClcbiAgICAgICAgOiBwcmVNYXNrZWQsXG4gICAgICBjaGFuZ2VkID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gbWFza2VkXG5cbiAgICAvLyBXZSB3YW50IHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiIHNvIHdlIHNldCB2YWx1ZSBpbW1lZGlhdGVseVxuICAgIGlucC52YWx1ZSAhPT0gbWFza2VkICYmIChpbnAudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBjaGFuZ2VkID09PSB0cnVlICYmIChpbm5lclZhbHVlLnZhbHVlID0gbWFza2VkKVxuXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wICYmIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyBtYXNrUmVwbGFjZWQubGVuZ3RoIDogMFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZScgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvciwgY3Vyc29yKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoWyAnZGVsZXRlQ29udGVudEJhY2t3YXJkJywgJ2RlbGV0ZUNvbnRlbnRGb3J3YXJkJyBdLmluZGV4T2YoaW5wdXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICBlbmQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChtYXNrZWQubGVuZ3RoID4gcHJlTWFza2VkLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlKSArIDEpKSArIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGVuZFxuXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSArIDEpKSlcblxuICAgICAgICAgIGlmIChjdXJzb3IgPT09IDEgJiYgZW5kID09PSAxKSB7XG4gICAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGN1cnNvciwgY3Vyc29yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBtYXNrZWQubGVuZ3RoIC0gZW5kUmV2ZXJzZVxuICAgICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZCkgLSAxKVxuICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvciwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbCA9IHByb3BzLnVubWFza2VkVmFsdWUgPT09IHRydWVcbiAgICAgID8gdW5tYXNrVmFsdWUobWFza2VkKVxuICAgICAgOiBtYXNrZWRcblxuICAgIFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKSAhPT0gdmFsICYmIGVtaXRWYWx1ZSh2YWwsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ3Vyc29yRm9yUGFzdGUgKGlucCwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShpbnAudmFsdWUpKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgc3RhcnQpKVxuXG4gICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQsICdmb3J3YXJkJylcbiAgfVxuXG4gIGNvbnN0IG1vdmVDdXJzb3IgPSB7XG4gICAgbGVmdCAoaW5wLCBzdGFydCwgZW5kLCBzZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IG5vTWFya0JlZm9yZSA9IG1hc2tNYXJrZWQuc2xpY2Uoc3RhcnQgLSAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBzdGFydCsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIHN0YXJ0IF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBzdGFydCBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodChpbnAsIDAsIDApXG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKFxuICAgICAgICBzdGFydCxcbiAgICAgICAgc2VsZWN0aW9uID09PSB0cnVlID8gZW5kIDogc3RhcnQsICdiYWNrd2FyZCdcbiAgICAgIClcbiAgICB9LFxuXG4gICAgcmlnaHQgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGhcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGVuZCArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgZW5kID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgZW5kID0gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdChpbnAsIGxpbWl0LCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbiA/IHN0YXJ0IDogZW5kLCBlbmQsICdmb3J3YXJkJylcbiAgICB9LFxuXG4gICAgbGVmdFJldmVyc2UgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGlucC52YWx1ZS5sZW5ndGgpXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobG9jYWxNYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIHN0YXJ0ID0gaVxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgc3RhcnQgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgc3RhcnQgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgMCwgMClcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzZWxlY3Rpb24gPT09IHRydWUgPyBlbmQgOiBzdGFydCwgJ2JhY2t3YXJkJ1xuICAgICAgKVxuICAgIH0sXG5cbiAgICByaWdodFJldmVyc2UgKGlucCwgc3RhcnQsIGVuZCwgc2VsZWN0aW9uKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGgsXG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQobGltaXQpLFxuICAgICAgICBub01hcmtCZWZvcmUgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgZW5kICsgMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgZW5kICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBlbmQgPSBpXG4gICAgICAgICAgZW5kID4gMCAmJiBub01hcmtCZWZvcmUgPT09IHRydWUgJiYgZW5kLS1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgZW5kIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBlbmQgLSAxIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLmxlZnRSZXZlcnNlKGlucCwgbGltaXQsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uID09PSB0cnVlID8gc3RhcnQgOiBlbmQsIGVuZCwgJ2ZvcndhcmQnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTWFza2VkS2V5ZG93biAoZSkge1xuICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgaWYgKHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgc3RhcnQgPSBpbnAuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzdGFydCwgZW5kLCBlLnNoaWZ0S2V5KVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gOCAvLyBCYWNrc3BhY2VcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5sZWZ0KGlucCwgc3RhcnQsIGVuZCwgdHJ1ZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDQ2IC8vIERlbGV0ZVxuICAgICAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlXG4gICAgICAmJiBzdGFydCA9PT0gZW5kXG4gICAgKSB7XG4gICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIHN0YXJ0LCBlbmQsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHsgcmV0dXJuICcnIH1cblxuICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXNrVmFsdWVSZXZlcnNlKHZhbClcbiAgICB9XG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWRNYXNrXG5cbiAgICBsZXQgdmFsSW5kZXggPSAwLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gMDsgbWFza0luZGV4IDwgbWFzay5sZW5ndGg7IG1hc2tJbmRleCsrKSB7XG4gICAgICBjb25zdFxuICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdLFxuICAgICAgICBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZlxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDBcbiAgICAgICAgICA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpXG4gICAgICAgICAgOiB2YWxDaGFyXG4gICAgICAgIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlUmV2ZXJzZSAodmFsKSB7XG4gICAgY29uc3RcbiAgICAgIG1hc2sgPSBjb21wdXRlZE1hc2ssXG4gICAgICBmaXJzdFRva2VuSW5kZXggPSBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgbGV0IHZhbEluZGV4ID0gdmFsLmxlbmd0aCAtIDEsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSBtYXNrLmxlbmd0aCAtIDE7IG1hc2tJbmRleCA+PSAwICYmIHZhbEluZGV4ID4gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgtLVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCA+IDBcbiAgICAgID8gbWFza1JlcGxhY2VkLnNsaWNlKDAsIC12YWwubGVuZ3RoKSArIHZhbFxuICAgICAgOiB2YWwgKyBtYXNrUmVwbGFjZWQuc2xpY2UodmFsLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJWYWx1ZSxcbiAgICBoYXNNYXNrLFxuICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgb25NYXNrZWRLZXlkb3duXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHR5cGVHdWFyZCkge1xuICBmdW5jdGlvbiBnZXRGb3JtRG9tUHJvcHMgKCkge1xuICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGR0ID0gJ0RhdGFUcmFuc2ZlcicgaW4gd2luZG93XG4gICAgICAgID8gbmV3IERhdGFUcmFuc2ZlcigpXG4gICAgICAgIDogKCdDbGlwYm9hcmRFdmVudCcgaW4gd2luZG93XG4gICAgICAgICAgICA/IG5ldyBDbGlwYm9hcmRFdmVudCgnJykuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIGlmIChPYmplY3QobW9kZWwpID09PSBtb2RlbCkge1xuICAgICAgICAoJ2xlbmd0aCcgaW4gbW9kZWxcbiAgICAgICAgICA/IEFycmF5LmZyb20obW9kZWwpXG4gICAgICAgICAgOiBbIG1vZGVsIF1cbiAgICAgICAgKS5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgIGR0Lml0ZW1zLmFkZChmaWxlKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogZHQuZmlsZXNcbiAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZUd1YXJkID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMudHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0Rm9ybURvbVByb3BzKClcbiAgICB9KVxuICAgIDogY29tcHV0ZWQoZ2V0Rm9ybURvbVByb3BzKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnB1dCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG4gICAgLi4udXNlTWFza1Byb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlIH0sXG5cbiAgICBzaGFkb3dUZXh0OiBTdHJpbmcsXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGF1dG9ncm93OiBCb29sZWFuLCAvLyBtYWtlcyBhIHRleHRhcmVhXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ3Bhc3RlJywgJ2NoYW5nZScsXG4gICAgJ2tleWRvd24nLCAnYW5pbWF0aW9uZW5kJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgdGVtcCA9IHt9XG4gICAgbGV0IGVtaXRDYWNoZWRWYWx1ZSA9IE5hTiwgdHlwZWROdW1iZXIsIHN0b3BWYWx1ZVdhdGNoZXIsIGVtaXRUaW1lciwgZW1pdFZhbHVlRm5cblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbmFtZVByb3AgPSB1c2VGb3JtSW5wdXROYW1lQXR0cihwcm9wcylcblxuICAgIGNvbnN0IHtcbiAgICAgIGlubmVyVmFsdWUsXG4gICAgICBoYXNNYXNrLFxuICAgICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgICAgb25NYXNrZWRLZXlkb3duXG4gICAgfSA9IHVzZU1hc2socHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzLCAvKiB0eXBlIGd1YXJkICovIHRydWUpXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpc1RleHRhcmVhID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgfHwgcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc1R5cGVUZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIG9uUGFzdGUsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZSxcbiAgICAgICAgb25CbHVyOiBvbkZpbmlzaEVkaXRpbmcsXG4gICAgICAgIG9uRm9jdXM6IHN0b3BcbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbktleWRvd24gPSBvbk1hc2tlZEtleWRvd25cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbkFuaW1hdGlvbmVuZCA9IG9uQW5pbWF0aW9uZW5kXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgcm93czogcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyA/IDYgOiB2b2lkIDAsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RleHRhcmVhLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBhdHRycy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnMucm93cyA9IDFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgbG9zZSB0aGUgbmF0aXZlIGlucHV0IHZhbHVlXG4gICAgLy8gc28gd2UgbmVlZCB0byByZWF0dGFjaCBpdCBkeW5hbWljYWxseVxuICAgIC8vIChsaWtlIHR5cGU9XCJwYXNzd29yZFwiIDwtPiB0eXBlPVwidGV4dFwiOyBzZWUgIzEyMDc4KVxuICAgIHdhdGNoKCgpID0+IHByb3BzLnR5cGUsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RvcFZhbHVlV2F0Y2hlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuXG4gICAgICAgICAgaWYgKFN0cmluZyh2KSA9PT0gZW1pdENhY2hlZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVyVmFsdWUudmFsdWUgIT09IHYpIHtcbiAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZSA9IHZcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0eXBlZE51bWJlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b2dyb3csIHZhbCA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIGlmIGl0IGhhcyBhIG51bWJlciBvZiByb3dzIHNldCByZXNwZWN0IGl0XG4gICAgICBlbHNlIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBhdHRycy5yb3dzID4gMCkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVuc2UsICgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBpbnB1dFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICAgICAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0ICgpIHtcbiAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGlucHV0UmVmLnZhbHVlLnNlbGVjdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXN0ZSAoZSkge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlucCA9IGUudGFyZ2V0XG4gICAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZShpbnAsIGlucC5zZWxlY3Rpb25TdGFydCwgaW5wLnNlbGVjdGlvbkVuZClcbiAgICAgIH1cblxuICAgICAgZW1pdCgncGFzdGUnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGlmICghZSB8fCAhZS50YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBlLnRhcmdldC5maWxlcylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlXG5cbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHZhbCwgZmFsc2UsIGUuaW5wdXRUeXBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZSh2YWwpXG5cbiAgICAgICAgaWYgKGlzVHlwZVRleHQudmFsdWUgPT09IHRydWUgJiYgZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgfSA9IGUudGFyZ2V0XG5cbiAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCAmJiBzZWxlY3Rpb25FbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgdmFsLmluZGV4T2YoZS50YXJnZXQudmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2UgbmVlZCB0byB0cmlnZ2VyIGl0IGltbWVkaWF0ZWx5IHRvbyxcbiAgICAgIC8vIHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiXG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQW5pbWF0aW9uZW5kIChlKSB7XG4gICAgICBlbWl0KCdhbmltYXRpb25lbmQnLCBlKVxuICAgICAgYWRqdXN0SGVpZ2h0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0VmFsdWUgKHZhbCwgc3RvcFdhdGNoZXIpIHtcbiAgICAgIGVtaXRWYWx1ZUZuID0gKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXRDYWNoZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgZW1pdENhY2hlZFZhbHVlID0gdmFsXG5cbiAgICAgICAgICBzdG9wV2F0Y2hlciA9PT0gdHJ1ZSAmJiAoc3RvcFZhbHVlV2F0Y2hlciA9IHRydWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG5cbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPT09IHZhbCAmJiAoZW1pdENhY2hlZFZhbHVlID0gTmFOKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0VmFsdWVGbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdHlwZWROdW1iZXIgPSB0cnVlXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRlYm91bmNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgICBlbWl0VGltZXIgPSBzZXRUaW1lb3V0KGVtaXRWYWx1ZUZuLCBwcm9wcy5kZWJvdW5jZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbWl0VmFsdWVGbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGV4dGFyZWEgb25seVxuICAgIGZ1bmN0aW9uIGFkanVzdEhlaWdodCAoKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnAgPSBpbnB1dFJlZi52YWx1ZVxuICAgICAgICBpZiAoaW5wICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50U3R5bGUgPSBpbnAucGFyZW50Tm9kZS5zdHlsZVxuICAgICAgICAgIGNvbnN0IHsgb3ZlcmZsb3cgfSA9IGlucC5zdHlsZVxuXG4gICAgICAgICAgLy8gcmVzZXQgaGVpZ2h0IG9mIHRleHRhcmVhIHRvIGEgc21hbGwgc2l6ZSB0byBkZXRlY3QgdGhlIHJlYWwgaGVpZ2h0XG4gICAgICAgICAgLy8gYnV0IGtlZXAgdGhlIHRvdGFsIGNvbnRyb2wgc2l6ZSB0aGUgc2FtZVxuICAgICAgICAgIC8vIEZpcmVmb3ggcnVsZXogIzE0MjYzLCAjMTQzNDRcbiAgICAgICAgICAkcS5wbGF0Zm9ybS5pcy5maXJlZm94ICE9PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJylcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAoaW5wLnNjcm9sbEhlaWdodCAtIDEpICsgJ3B4J1xuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSAnMXB4J1xuXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9IGlucC5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgICAgaW5wLnN0eWxlLm92ZXJmbG93ID0gb3ZlcmZsb3dcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlIChlKSB7XG4gICAgICBvbkNvbXBvc2l0aW9uKGUpXG5cbiAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgZW1pdCgnY2hhbmdlJywgZS50YXJnZXQudmFsdWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25GaW5pc2hFZGl0aW5nIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuXG4gICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgZW1pdFZhbHVlRm4gIT09IHZvaWQgMCAmJiBlbWl0VmFsdWVGbigpXG5cbiAgICAgIHR5cGVkTnVtYmVyID0gZmFsc2VcbiAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuICAgICAgZGVsZXRlIHRlbXAudmFsdWVcblxuICAgICAgLy8gd2UgbmVlZCB0byB1c2Ugc2V0VGltZW91dCBpbnN0ZWFkIG9mIHRoaXMuJG5leHRUaWNrXG4gICAgICAvLyB0byBhdm9pZCBhIGJ1ZyB3aGVyZSBmb2N1c291dCBpcyBub3QgZW1pdHRlZCBmb3IgdHlwZSBkYXRlL3RpbWUvd2Vlay8uLi5cbiAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJyAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUudmFsdWUgPSBpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDdXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICA/IHRlbXAudmFsdWVcbiAgICAgICAgOiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBvbkZpbmlzaEVkaXRpbmcoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgYWRqdXN0SGVpZ2h0KClcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtJHsgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnIH1gXG4gICAgICAgICsgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlID8gJyBxLXRleHRhcmVhLS1hdXRvZ3JvdycgOiAnJylcbiAgICAgICksXG5cbiAgICAgIGhhc1NoYWRvdzogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICYmIHR5cGVvZiBwcm9wcy5zaGFkb3dUZXh0ID09PSAnc3RyaW5nJ1xuICAgICAgICAmJiBwcm9wcy5zaGFkb3dUZXh0Lmxlbmd0aCA+IDBcbiAgICAgICksXG5cbiAgICAgIGlucHV0UmVmLFxuXG4gICAgICBlbWl0VmFsdWUsXG5cbiAgICAgIGhhc1ZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgZ2V0Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcsIHtcbiAgICAgICAgICByZWY6IGlucHV0UmVmLFxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAncS1maWVsZF9fbmF0aXZlIHEtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgcHJvcHMuaW5wdXRDbGFzc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgLi4uaW5wdXRBdHRycy52YWx1ZSxcbiAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZSxcbiAgICAgICAgICAuLi4oXG4gICAgICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgICAgICAgPyB7IHZhbHVlOiBnZXRDdXJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgOiBmb3JtRG9tUHJvcHMudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBnZXRTaGFkb3dDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcS1maWVsZF9fc2hhZG93IGFic29sdXRlLWJvdHRvbSBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgICAgICsgKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgdGV4dC1uby13cmFwJylcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAnaW52aXNpYmxlJyB9LCBnZXRDdXJWYWx1ZSgpKSxcbiAgICAgICAgICBoKCdzcGFuJywgcHJvcHMuc2hhZG93VGV4dClcbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVuZGVyRm4gPSB1c2VGaWVsZChzdGF0ZSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGZvY3VzLFxuICAgICAgc2VsZWN0LFxuICAgICAgZ2V0TmF0aXZlRWxlbWVudDogKCkgPT4gaW5wdXRSZWYudmFsdWUgLy8gZGVwcmVjYXRlZFxuICAgIH0pXG5cbiAgICBpbmplY3RQcm9wKHByb3h5LCAnbmF0aXZlRWwnLCAoKSA9PiBpbnB1dFJlZi52YWx1ZSlcblxuICAgIHJldHVybiByZW5kZXJGblxuICB9XG59KVxuIl0sIm5hbWVzIjpbImF0dHJzIl0sIm1hcHBpbmdzIjoiOzs7QUFLQSxNQUFNLGNBQWM7QUFBQSxFQUNsQixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQ1I7QUFFQSxNQUFNLFNBQVM7QUFBQSxFQUNiLEtBQUssRUFBRSxTQUFTLFNBQVMsUUFBUSxTQUFVO0FBQUEsRUFFM0MsR0FBRyxFQUFFLFNBQVMsWUFBWSxRQUFRLFlBQWE7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
