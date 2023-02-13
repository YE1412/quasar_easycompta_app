import { c as createComponent, d as computed, h, e as hSlot, g as getCurrentInstance, H as hUniqueSlot, Q as QIcon, f as ref, w as watch, ap as onBeforeMount, o as onMounted, F as onActivated, E as onDeactivated, n as onBeforeUnmount, C as listenOpts, y as hMergeSlot, aS as useSizeProps, aT as useSize, q as stopAndPrevent, aM as toRaw, ax as vmHasRouter, aF as History, aU as isNumber, aV as isDate, ag as isObject, B as nextTick, aW as injectMultipleProps, az as injectProp, j as QBtn } from "./index.js";
import { Q as QList, a as QSeparator } from "./QList.js";
import { b as useDarkProps, c as useDark } from "./QNoSsr.js";
import { u as useVirtualScrollProps, a as useVirtualScroll, c as commonVirtPropsList, Q as QSelect } from "./QSelect.js";
import { i as getScrollTarget } from "./use-prevent-scroll.js";
import { a as useFormProps, b as useFormInject } from "./use-key-composition.js";
var QTd = createComponent({
  name: "QTd",
  props: {
    props: Object,
    autoWidth: Boolean,
    noHover: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const classes = computed(
      () => "q-td" + (props.autoWidth === true ? " q-table--col-auto-width" : "") + (props.noHover === true ? " q-td--no-hover" : "") + " "
    );
    return () => {
      if (props.props === void 0) {
        return h("td", { class: classes.value }, hSlot(slots.default));
      }
      const name = vm.vnode.key;
      const col = (props.props.colsMap !== void 0 ? props.props.colsMap[name] : null) || props.props.col;
      if (col === void 0) {
        return;
      }
      const { row } = props.props;
      return h("td", {
        class: classes.value + col.__tdClass(row),
        style: col.__tdStyle(row)
      }, hSlot(slots.default));
    };
  }
});
var QTr = createComponent({
  name: "QTr",
  props: {
    props: Object,
    noHover: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-tr" + (props.props === void 0 || props.props.header === true ? "" : " " + props.props.__trClass) + (props.noHover === true ? " q-tr--no-hover" : "")
    );
    return () => h("tr", { class: classes.value }, hSlot(slots.default));
  }
});
var QTh = createComponent({
  name: "QTh",
  props: {
    props: Object,
    autoWidth: Boolean
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const onClick = (evt) => {
      emit("click", evt);
    };
    return () => {
      if (props.props === void 0) {
        return h("th", {
          class: props.autoWidth === true ? "q-table--col-auto-width" : "",
          onClick
        }, hSlot(slots.default));
      }
      let col, child;
      const name = vm.vnode.key;
      if (name) {
        col = props.props.colsMap[name];
        if (col === void 0) {
          return;
        }
      } else {
        col = props.props.col;
      }
      if (col.sortable === true) {
        const action = col.align === "right" ? "unshift" : "push";
        child = hUniqueSlot(slots.default, []);
        child[action](
          h(QIcon, {
            class: col.__iconClass,
            name: $q.iconSet.table.arrowUp
          })
        );
      } else {
        child = hSlot(slots.default);
      }
      const data = {
        class: col.__thClass + (props.autoWidth === true ? " q-table--col-auto-width" : ""),
        style: col.headerStyle,
        onClick: (evt) => {
          col.sortable === true && props.props.sort(col);
          onClick(evt);
        }
      };
      return h("th", data, child);
    };
  }
});
const separatorValues = ["horizontal", "vertical", "cell", "none"];
var QMarkupTable = createComponent({
  name: "QMarkupTable",
  props: {
    ...useDarkProps,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => separatorValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => `q-markup-table q-table__container q-table__card q-table--${props.separator}-separator` + (isDark.value === true ? " q-table--dark q-table__card--dark q-dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "") + (props.square === true ? " q-table--square" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "")
    );
    return () => h("div", {
      class: classes.value
    }, [
      h("table", { class: "q-table" }, hSlot(slots.default))
    ]);
  }
});
function getTableMiddle(props, content) {
  return h("div", props, [
    h("table", { class: "q-table" }, content)
  ]);
}
const comps = {
  list: QList,
  table: QMarkupTable
};
const typeOptions = ["list", "table", "__qtable"];
var QVirtualScroll = createComponent({
  name: "QVirtualScroll",
  props: {
    ...useVirtualScrollProps,
    type: {
      type: String,
      default: "list",
      validator: (v) => typeOptions.includes(v)
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: {
      default: void 0
    }
  },
  setup(props, { slots, attrs }) {
    let localScrollTarget;
    const rootRef = ref(null);
    const virtualScrollLength = computed(() => props.itemsSize >= 0 && props.itemsFn !== void 0 ? parseInt(props.itemsSize, 10) : Array.isArray(props.items) ? props.items.length : 0);
    const {
      virtualScrollSliceRange,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl
    });
    const virtualScrollScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const mapFn = (item, i) => ({
        index: virtualScrollSliceRange.value.from + i,
        item
      });
      return props.itemsFn === void 0 ? props.items.slice(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to).map(mapFn) : props.itemsFn(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to - virtualScrollSliceRange.value.from).map(mapFn);
    });
    const classes = computed(
      () => "q-virtual-scroll q-virtual-scroll" + (props.virtualScrollHorizontal === true ? "--horizontal" : "--vertical") + (props.scrollTarget !== void 0 ? "" : " scroll")
    );
    const attributes = computed(() => props.scrollTarget !== void 0 ? {} : { tabindex: 0 });
    watch(virtualScrollLength, () => {
      localResetVirtualScroll();
    });
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function getVirtualScrollEl() {
      return rootRef.value.$el || rootRef.value;
    }
    function getVirtualScrollTarget() {
      return localScrollTarget;
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(getVirtualScrollEl(), props.scrollTarget);
      localScrollTarget.addEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", onVirtualScrollEvt, listenOpts.passive);
        localScrollTarget = void 0;
      }
    }
    function __getVirtualChildren() {
      let child = padVirtualScroll(
        props.type === "list" ? "div" : "tbody",
        virtualScrollScope.value.map(slots.default)
      );
      if (slots.before !== void 0) {
        child = slots.before().concat(child);
      }
      return hMergeSlot(slots.after, child);
    }
    onBeforeMount(() => {
      localResetVirtualScroll();
    });
    onMounted(() => {
      configureScrollTarget();
    });
    onActivated(() => {
      configureScrollTarget();
    });
    onDeactivated(() => {
      unconfigureScrollTarget();
    });
    onBeforeUnmount(() => {
      unconfigureScrollTarget();
    });
    return () => {
      if (slots.default === void 0) {
        console.error("QVirtualScroll: default scoped slot is required for rendering");
        return;
      }
      return props.type === "__qtable" ? getTableMiddle(
        { ref: rootRef, class: "q-table__middle " + classes.value },
        __getVirtualChildren()
      ) : h(comps[props.type], {
        ...attrs,
        ref: rootRef,
        class: [attrs.class, classes.value],
        ...attributes.value
      }, __getVirtualChildren);
    };
  }
});
const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function width(val, reverse, $q) {
  return {
    transform: reverse === true ? `translateX(${$q.lang.rtl === true ? "-" : ""}100%) scale3d(${-val},1,1)` : `scale3d(${val},1,1)`
  };
}
var QLinearProgress = createComponent({
  name: "QLinearProgress",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes);
    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...sizeStyle.value !== null ? sizeStyle.value : {},
      "--q-linear-progress-speed": `${props.animationSpeed}ms`
    }));
    const classes = computed(
      () => "q-linear-progress" + (props.color !== void 0 ? ` text-${props.color}` : "") + (props.reverse === true || props.query === true ? " q-linear-progress--reverse" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const transitionSuffix = computed(() => `with${props.instantFeedback === true ? "out" : ""}-transition`);
    const trackClass = computed(
      () => `q-linear-progress__track absolute-full q-linear-progress__track--${transitionSuffix.value} q-linear-progress__track--${isDark.value === true ? "dark" : "light"}` + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
    );
    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(
      () => `q-linear-progress__model absolute-full q-linear-progress__model--${transitionSuffix.value} q-linear-progress__model--${motion.value === true ? "in" : ""}determinate`
    );
    const stripeStyle = computed(() => ({ width: `${props.value * 100}%` }));
    const stripeClass = computed(
      () => `q-linear-progress__stripe absolute-${props.reverse === true ? "right" : "left"} q-linear-progress__stripe--${transitionSuffix.value}`
    );
    return () => {
      const child = [
        h("div", {
          class: trackClass.value,
          style: trackStyle.value
        }),
        h("div", {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];
      props.stripe === true && motion.value === false && child.push(
        h("div", {
          class: stripeClass.value,
          style: stripeStyle.value
        })
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": props.indeterminate === true ? void 0 : props.value
      }, hMergeSlot(slots.default, child));
    };
  }
});
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value > -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === "toggle" ? "switch" : "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
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
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
var QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) {
      return;
    }
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) {
      return;
    }
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
function sortDate(a, b) {
  return new Date(a) - new Date(b);
}
const useTableSortProps = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (v) => v === "ad" || v === "da",
    default: "ad"
  }
};
function useTableSort(props, computedPagination, colList, setPagination) {
  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value;
    return sortBy ? colList.value.find((def) => def.name === sortBy) || null : null;
  });
  const computedSortMethod = computed(() => props.sortMethod !== void 0 ? props.sortMethod : (data, sortBy, descending) => {
    const col = colList.value.find((def) => def.name === sortBy);
    if (col === void 0 || col.field === void 0) {
      return data;
    }
    const dir = descending === true ? -1 : 1, val = typeof col.field === "function" ? (v) => col.field(v) : (v) => v[col.field];
    return data.sort((a, b) => {
      let A = val(a), B = val(b);
      if (A === null || A === void 0) {
        return -1 * dir;
      }
      if (B === null || B === void 0) {
        return 1 * dir;
      }
      if (col.sort !== void 0) {
        return col.sort(A, B, a, b) * dir;
      }
      if (isNumber(A) === true && isNumber(B) === true) {
        return (A - B) * dir;
      }
      if (isDate(A) === true && isDate(B) === true) {
        return sortDate(A, B) * dir;
      }
      if (typeof A === "boolean" && typeof B === "boolean") {
        return (A - B) * dir;
      }
      [A, B] = [A, B].map((s) => (s + "").toLocaleString().toLowerCase());
      return A < B ? -1 * dir : A === B ? 0 : dir;
    });
  });
  function sort(col) {
    let sortOrder = props.columnSortOrder;
    if (isObject(col) === true) {
      if (col.sortOrder) {
        sortOrder = col.sortOrder;
      }
      col = col.name;
    } else {
      const def = colList.value.find((def2) => def2.name === col);
      if (def !== void 0 && def.sortOrder) {
        sortOrder = def.sortOrder;
      }
    }
    let { sortBy, descending } = computedPagination.value;
    if (sortBy !== col) {
      sortBy = col;
      descending = sortOrder === "da";
    } else if (props.binaryStateSort === true) {
      descending = !descending;
    } else if (descending === true) {
      if (sortOrder === "ad") {
        sortBy = null;
      } else {
        descending = false;
      }
    } else {
      if (sortOrder === "ad") {
        descending = true;
      } else {
        sortBy = null;
      }
    }
    setPagination({ sortBy, descending, page: 1 });
  }
  return {
    columnToSort,
    computedSortMethod,
    sort
  };
}
const useTableFilterProps = {
  filter: [String, Object],
  filterMethod: Function
};
function useTableFilter(props, setPagination) {
  const computedFilterMethod = computed(() => props.filterMethod !== void 0 ? props.filterMethod : (rows, terms, cols, cellValue) => {
    const lowerTerms = terms ? terms.toLowerCase() : "";
    return rows.filter(
      (row) => cols.some((col) => {
        const val = cellValue(col, row) + "";
        const haystack = val === "undefined" || val === "null" ? "" : val.toLowerCase();
        return haystack.indexOf(lowerTerms) !== -1;
      })
    );
  });
  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 }, true);
      });
    },
    { deep: true }
  );
  return { computedFilterMethod };
}
function samePagination(oldPag, newPag) {
  for (const prop in newPag) {
    if (newPag[prop] !== oldPag[prop]) {
      return false;
    }
  }
  return true;
}
function fixPagination(p) {
  if (p.page < 1) {
    p.page = 1;
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0;
  }
  return p;
}
const useTablePaginationProps = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 7, 10, 15, 20, 25, 50, 0]
  },
  "onUpdate:pagination": [Function, Array]
};
function useTablePaginationState(vm, getCellValue) {
  const { props, emit } = vm;
  const innerPagination = ref(
    Object.assign({
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: props.rowsPerPageOptions.length > 0 ? props.rowsPerPageOptions[0] : 5
    }, props.pagination)
  );
  const computedPagination = computed(() => {
    const pag = props["onUpdate:pagination"] !== void 0 ? { ...innerPagination.value, ...props.pagination } : innerPagination.value;
    return fixPagination(pag);
  });
  const isServerSide = computed(() => computedPagination.value.rowsNumber !== void 0);
  function sendServerRequest(pagination) {
    requestServerInteraction({
      pagination,
      filter: props.filter
    });
  }
  function requestServerInteraction(prop = {}) {
    nextTick(() => {
      emit("request", {
        pagination: prop.pagination || computedPagination.value,
        filter: prop.filter || props.filter,
        getCellValue
      });
    });
  }
  function setPagination(val, forceServerRequest) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    });
    if (samePagination(computedPagination.value, newPagination) === true) {
      if (isServerSide.value === true && forceServerRequest === true) {
        sendServerRequest(newPagination);
      }
      return;
    }
    if (isServerSide.value === true) {
      sendServerRequest(newPagination);
      return;
    }
    if (props.pagination !== void 0 && props["onUpdate:pagination"] !== void 0) {
      emit("update:pagination", newPagination);
    } else {
      innerPagination.value = newPagination;
    }
  }
  return {
    innerPagination,
    computedPagination,
    isServerSide,
    requestServerInteraction,
    setPagination
  };
}
function useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber) {
  const { props, emit, proxy: { $q } } = vm;
  const computedRowsNumber = computed(() => isServerSide.value === true ? computedPagination.value.rowsNumber || 0 : filteredSortedRowsNumber.value);
  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return (page - 1) * rowsPerPage;
  });
  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return page * rowsPerPage;
  });
  const isFirstPage = computed(() => computedPagination.value.page === 1);
  const pagesNumber = computed(() => computedPagination.value.rowsPerPage === 0 ? 1 : Math.max(
    1,
    Math.ceil(computedRowsNumber.value / computedPagination.value.rowsPerPage)
  ));
  const isLastPage = computed(() => lastRowIndex.value === 0 ? true : computedPagination.value.page >= pagesNumber.value);
  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(innerPagination.value.rowsPerPage) ? props.rowsPerPageOptions : [innerPagination.value.rowsPerPage].concat(props.rowsPerPageOptions);
    return opts.map((count) => ({
      label: count === 0 ? $q.lang.table.allRows : "" + count,
      value: count
    }));
  });
  watch(pagesNumber, (lastPage2, oldLastPage) => {
    if (lastPage2 === oldLastPage) {
      return;
    }
    const currentPage = computedPagination.value.page;
    if (lastPage2 && !currentPage) {
      setPagination({ page: 1 });
    } else if (lastPage2 < currentPage) {
      setPagination({ page: lastPage2 });
    }
  });
  function firstPage() {
    setPagination({ page: 1 });
  }
  function prevPage() {
    const { page } = computedPagination.value;
    if (page > 1) {
      setPagination({ page: page - 1 });
    }
  }
  function nextPage() {
    const { page, rowsPerPage } = computedPagination.value;
    if (lastRowIndex.value > 0 && page * rowsPerPage < computedRowsNumber.value) {
      setPagination({ page: page + 1 });
    }
  }
  function lastPage() {
    setPagination({ page: pagesNumber.value });
  }
  if (props["onUpdate:pagination"] !== void 0) {
    emit("update:pagination", { ...computedPagination.value });
  }
  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,
    firstPage,
    prevPage,
    nextPage,
    lastPage
  };
}
const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: "none",
    validator: (v) => ["single", "multiple", "none"].includes(v)
  },
  selected: {
    type: Array,
    default: () => []
  }
};
const useTableRowSelectionEmits = ["update:selected", "selection"];
function useTableRowSelection(props, emit, computedRows, getRowKey) {
  const selectedKeys = computed(() => {
    const keys = {};
    props.selected.map(getRowKey.value).forEach((key) => {
      keys[key] = true;
    });
    return keys;
  });
  const hasSelectionMode = computed(() => {
    return props.selection !== "none";
  });
  const singleSelection = computed(() => {
    return props.selection === "single";
  });
  const multipleSelection = computed(() => {
    return props.selection === "multiple";
  });
  const allRowsSelected = computed(
    () => computedRows.value.length > 0 && computedRows.value.every(
      (row) => selectedKeys.value[getRowKey.value(row)] === true
    )
  );
  const someRowsSelected = computed(
    () => allRowsSelected.value !== true && computedRows.value.some((row) => selectedKeys.value[getRowKey.value(row)] === true)
  );
  const rowsSelectedNumber = computed(() => props.selected.length);
  function isRowSelected(key) {
    return selectedKeys.value[key] === true;
  }
  function clearSelection() {
    emit("update:selected", []);
  }
  function updateSelection(keys, rows, added, evt) {
    emit("selection", { rows, added, keys, evt });
    const payload = singleSelection.value === true ? added === true ? rows : [] : added === true ? props.selected.concat(rows) : props.selected.filter(
      (row) => keys.includes(getRowKey.value(row)) === false
    );
    emit("update:selected", payload);
  }
  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,
    isRowSelected,
    clearSelection,
    updateSelection
  };
}
function getVal(val) {
  return Array.isArray(val) ? val.slice() : [];
}
const useTableRowExpandProps = {
  expanded: Array
};
const useTableRowExpandEmits = ["update:expanded"];
function useTableRowExpand(props, emit) {
  const innerExpanded = ref(getVal(props.expanded));
  watch(() => props.expanded, (val) => {
    innerExpanded.value = getVal(val);
  });
  function isRowExpanded(key) {
    return innerExpanded.value.includes(key);
  }
  function setExpanded(val) {
    if (props.expanded !== void 0) {
      emit("update:expanded", val);
    } else {
      innerExpanded.value = val;
    }
  }
  function updateExpanded(key, add) {
    const target = innerExpanded.value.slice();
    const index = target.indexOf(key);
    if (add === true) {
      if (index === -1) {
        target.push(key);
        setExpanded(target);
      }
    } else if (index !== -1) {
      target.splice(index, 1);
      setExpanded(target);
    }
  }
  return {
    isRowExpanded,
    setExpanded,
    updateExpanded
  };
}
const useTableColumnSelectionProps = {
  visibleColumns: Array
};
function useTableColumnSelection(props, computedPagination, hasSelectionMode) {
  const colList = computed(() => {
    if (props.columns !== void 0) {
      return props.columns;
    }
    const row = props.rows[0];
    return row !== void 0 ? Object.keys(row).map((name) => ({
      name,
      label: name.toUpperCase(),
      field: name,
      align: isNumber(row[name]) ? "right" : "left",
      sortable: true
    })) : [];
  });
  const computedCols = computed(() => {
    const { sortBy, descending } = computedPagination.value;
    const cols = props.visibleColumns !== void 0 ? colList.value.filter((col) => col.required === true || props.visibleColumns.includes(col.name) === true) : colList.value;
    return cols.map((col) => {
      const align = col.align || "right";
      const alignClass = `text-${align}`;
      return {
        ...col,
        align,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${align}`,
        __thClass: alignClass + (col.headerClasses !== void 0 ? " " + col.headerClasses : "") + (col.sortable === true ? " sortable" : "") + (col.name === sortBy ? ` sorted ${descending === true ? "sort-desc" : ""}` : ""),
        __tdStyle: col.style !== void 0 ? typeof col.style !== "function" ? () => col.style : col.style : () => null,
        __tdClass: col.classes !== void 0 ? typeof col.classes !== "function" ? () => alignClass + " " + col.classes : (row) => alignClass + " " + col.classes(row) : () => alignClass
      };
    });
  });
  const computedColsMap = computed(() => {
    const names = {};
    computedCols.value.forEach((col) => {
      names[col.name] = col;
    });
    return names;
  });
  const computedColspan = computed(() => {
    return props.tableColspan !== void 0 ? props.tableColspan : computedCols.value.length + (hasSelectionMode.value === true ? 1 : 0);
  });
  return {
    colList,
    computedCols,
    computedColsMap,
    computedColspan
  };
}
const bottomClass = "q-table__bottom row items-center";
const commonVirtPropsObj = {};
commonVirtPropsList.forEach((p) => {
  commonVirtPropsObj[p] = {};
});
var QTable = createComponent({
  name: "QTable",
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => ["horizontal", "vertical", "cell", "none"].includes(v)
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: {
      default: void 0
    },
    ...commonVirtPropsObj,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: {
      type: String,
      default: "grey-8"
    },
    titleClass: [String, Array, Object],
    tableStyle: [String, Array, Object],
    tableClass: [String, Array, Object],
    tableHeaderStyle: [String, Array, Object],
    tableHeaderClass: [String, Array, Object],
    cardContainerClass: [String, Array, Object],
    cardContainerStyle: [String, Array, Object],
    cardStyle: [String, Array, Object],
    cardClass: [String, Array, Object],
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...useDarkProps,
    ...useFullscreenProps,
    ...useTableColumnSelectionProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableRowExpandProps,
    ...useTableRowSelectionProps,
    ...useTableSortProps
  },
  emits: [
    "request",
    "virtualScroll",
    ...useFullscreenEmits,
    ...useTableRowExpandEmits,
    ...useTableRowSelectionEmits
  ],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();
    const getRowKey = computed(() => typeof props.rowKey === "function" ? props.rowKey : (row) => row[props.rowKey]);
    const rootRef = ref(null);
    const virtScrollRef = ref(null);
    const hasVirtScroll = computed(() => props.grid !== true && props.virtualScroll === true);
    const cardDefaultClass = computed(
      () => " q-table__card" + (isDark.value === true ? " q-table__card--dark q-dark" : "") + (props.square === true ? " q-table--square" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "")
    );
    const __containerClass = computed(
      () => `q-table__container q-table--${props.separator}-separator column no-wrap` + (props.grid === true ? " q-table--grid" : cardDefaultClass.value) + (isDark.value === true ? " q-table--dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "") + (inFullscreen.value === true ? " fullscreen scroll" : "")
    );
    const containerClass = computed(
      () => __containerClass.value + (props.loading === true ? " q-table--loading" : "")
    );
    watch(
      () => props.tableStyle + props.tableClass + props.tableHeaderStyle + props.tableHeaderClass + __containerClass.value,
      () => {
        hasVirtScroll.value === true && virtScrollRef.value !== null && virtScrollRef.value.reset();
      }
    );
    const {
      innerPagination,
      computedPagination,
      isServerSide,
      requestServerInteraction,
      setPagination
    } = useTablePaginationState(vm, getCellValue);
    const { computedFilterMethod } = useTableFilter(props, setPagination);
    const { isRowExpanded, setExpanded, updateExpanded } = useTableRowExpand(props, emit);
    const filteredSortedRows = computed(() => {
      let rows = props.rows;
      if (isServerSide.value === true || rows.length === 0) {
        return rows;
      }
      const { sortBy, descending } = computedPagination.value;
      if (props.filter) {
        rows = computedFilterMethod.value(rows, props.filter, computedCols.value, getCellValue);
      }
      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.rows === rows ? rows.slice() : rows,
          sortBy,
          descending
        );
      }
      return rows;
    });
    const filteredSortedRowsNumber = computed(() => filteredSortedRows.value.length);
    const computedRows = computed(() => {
      let rows = filteredSortedRows.value;
      if (isServerSide.value === true) {
        return rows;
      }
      const { rowsPerPage } = computedPagination.value;
      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.rows !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value);
          }
        } else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value);
        }
      }
      return rows;
    });
    const {
      hasSelectionMode,
      singleSelection,
      multipleSelection,
      allRowsSelected,
      someRowsSelected,
      rowsSelectedNumber,
      isRowSelected,
      clearSelection,
      updateSelection
    } = useTableRowSelection(props, emit, computedRows, getRowKey);
    const { colList, computedCols, computedColsMap, computedColspan } = useTableColumnSelection(props, computedPagination, hasSelectionMode);
    const { columnToSort, computedSortMethod, sort } = useTableSort(props, computedPagination, colList, setPagination);
    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      pagesNumber,
      computedRowsPerPageOptions,
      computedRowsNumber,
      firstPage,
      prevPage,
      nextPage,
      lastPage
    } = useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber);
    const nothingToDisplay = computed(() => computedRows.value.length === 0);
    const virtProps = computed(() => {
      const acc = {};
      commonVirtPropsList.forEach((p) => {
        acc[p] = props[p];
      });
      if (acc.virtualScrollItemSize === void 0) {
        acc.virtualScrollItemSize = props.dense === true ? 28 : 48;
      }
      return acc;
    });
    function resetVirtualScroll() {
      hasVirtScroll.value === true && virtScrollRef.value.reset();
    }
    function getBody() {
      if (props.grid === true) {
        return getGridBody();
      }
      const header = props.hideHeader !== true ? getTHead : null;
      if (hasVirtScroll.value === true) {
        const topRow = slots["top-row"];
        const bottomRow = slots["bottom-row"];
        const virtSlots = {
          default: (props2) => getTBodyTR(props2.item, slots.body, props2.index)
        };
        if (topRow !== void 0) {
          const topContent = h("tbody", topRow({ cols: computedCols.value }));
          virtSlots.before = header === null ? () => topContent : () => [header()].concat(topContent);
        } else if (header !== null) {
          virtSlots.before = header;
        }
        if (bottomRow !== void 0) {
          virtSlots.after = () => h("tbody", bottomRow({ cols: computedCols.value }));
        }
        return h(QVirtualScroll, {
          ref: virtScrollRef,
          class: props.tableClass,
          style: props.tableStyle,
          ...virtProps.value,
          scrollTarget: props.virtualScrollTarget,
          items: computedRows.value,
          type: "__qtable",
          tableColspan: computedColspan.value,
          onVirtualScroll: onVScroll
        }, virtSlots);
      }
      const child = [
        getTBody()
      ];
      if (header !== null) {
        child.unshift(header());
      }
      return getTableMiddle({
        class: ["q-table__middle scroll", props.tableClass],
        style: props.tableStyle
      }, child);
    }
    function scrollTo(toIndex, edge) {
      if (virtScrollRef.value !== null) {
        virtScrollRef.value.scrollTo(toIndex, edge);
        return;
      }
      toIndex = parseInt(toIndex, 10);
      const rowEl = rootRef.value.querySelector(`tbody tr:nth-of-type(${toIndex + 1})`);
      if (rowEl !== null) {
        const scrollTarget = rootRef.value.querySelector(".q-table__middle.scroll");
        const offsetTop = rowEl.offsetTop - props.virtualScrollStickySizeStart;
        const direction = offsetTop < scrollTarget.scrollTop ? "decrease" : "increase";
        scrollTarget.scrollTop = offsetTop;
        emit("virtualScroll", {
          index: toIndex,
          from: 0,
          to: innerPagination.value.rowsPerPage - 1,
          direction
        });
      }
    }
    function onVScroll(info) {
      emit("virtualScroll", info);
    }
    function getProgress() {
      return [
        h(QLinearProgress, {
          class: "q-table__linear-progress",
          color: props.color,
          dark: isDark.value,
          indeterminate: true,
          trackColor: "transparent"
        })
      ];
    }
    function getTBodyTR(row, bodySlot, pageIndex) {
      const key = getRowKey.value(row), selected = isRowSelected(key);
      if (bodySlot !== void 0) {
        return bodySlot(
          getBodyScope({
            key,
            row,
            pageIndex,
            __trClass: selected ? "selected" : ""
          })
        );
      }
      const bodyCell = slots["body-cell"], child = computedCols.value.map((col) => {
        const bodyCellCol = slots[`body-cell-${col.name}`], slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell;
        return slot !== void 0 ? slot(getBodyCellScope({ key, row, pageIndex, col })) : h("td", {
          class: col.__tdClass(row),
          style: col.__tdStyle(row)
        }, getCellValue(col, row));
      });
      if (hasSelectionMode.value === true) {
        const slot = slots["body-selection"];
        const content = slot !== void 0 ? slot(getBodySelectionScope({ key, row, pageIndex })) : [
          h(QCheckbox, {
            modelValue: selected,
            color: props.color,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": (adding, evt) => {
              updateSelection([key], [row], adding, evt);
            }
          })
        ];
        child.unshift(
          h("td", { class: "q-table--col-auto-width" }, content)
        );
      }
      const data = { key, class: { selected } };
      if (props.onRowClick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onClick = (evt) => {
          emit("RowClick", evt, row, pageIndex);
        };
      }
      if (props.onRowDblclick !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onDblclick = (evt) => {
          emit("RowDblclick", evt, row, pageIndex);
        };
      }
      if (props.onRowContextmenu !== void 0) {
        data.class["cursor-pointer"] = true;
        data.onContextmenu = (evt) => {
          emit("RowContextmenu", evt, row, pageIndex);
        };
      }
      return h("tr", data, child);
    }
    function getTBody() {
      const body = slots.body, topRow = slots["top-row"], bottomRow = slots["bottom-row"];
      let child = computedRows.value.map(
        (row, pageIndex) => getTBodyTR(row, body, pageIndex)
      );
      if (topRow !== void 0) {
        child = topRow({ cols: computedCols.value }).concat(child);
      }
      if (bottomRow !== void 0) {
        child = child.concat(bottomRow({ cols: computedCols.value }));
      }
      return h("tbody", child);
    }
    function getBodyScope(data) {
      injectBodyCommonScope(data);
      data.cols = data.cols.map(
        (col) => injectProp({ ...col }, "value", () => getCellValue(col, data.row))
      );
      return data;
    }
    function getBodyCellScope(data) {
      injectBodyCommonScope(data);
      injectProp(data, "value", () => getCellValue(data.col, data.row));
      return data;
    }
    function getBodySelectionScope(data) {
      injectBodyCommonScope(data);
      return data;
    }
    function injectBodyCommonScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        sort,
        rowIndex: firstRowIndex.value + data.pageIndex,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      hasSelectionMode.value === true && injectProp(
        data,
        "selected",
        () => isRowSelected(data.key),
        (adding, evt) => {
          updateSelection([data.key], [data.row], adding, evt);
        }
      );
      injectProp(
        data,
        "expand",
        () => isRowExpanded(data.key),
        (adding) => {
          updateExpanded(data.key, adding);
        }
      );
    }
    function getCellValue(col, row) {
      const val = typeof col.field === "function" ? col.field(row) : row[col.field];
      return col.format !== void 0 ? col.format(val, row) : val;
    }
    const marginalsScope = computed(() => ({
      pagination: computedPagination.value,
      pagesNumber: pagesNumber.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      inFullscreen: inFullscreen.value,
      toggleFullscreen
    }));
    function getTopDiv() {
      const top = slots.top, topLeft = slots["top-left"], topRight = slots["top-right"], topSelection = slots["top-selection"], hasSelection = hasSelectionMode.value === true && topSelection !== void 0 && rowsSelectedNumber.value > 0, topClass = "q-table__top relative-position row items-center";
      if (top !== void 0) {
        return h("div", { class: topClass }, [top(marginalsScope.value)]);
      }
      let child;
      if (hasSelection === true) {
        child = topSelection(marginalsScope.value).slice();
      } else {
        child = [];
        if (topLeft !== void 0) {
          child.push(
            h("div", { class: "q-table-control" }, [
              topLeft(marginalsScope.value)
            ])
          );
        } else if (props.title) {
          child.push(
            h("div", { class: "q-table__control" }, [
              h("div", {
                class: ["q-table__title", props.titleClass]
              }, props.title)
            ])
          );
        }
      }
      if (topRight !== void 0) {
        child.push(
          h("div", { class: "q-table__separator col" })
        );
        child.push(
          h("div", { class: "q-table__control" }, [
            topRight(marginalsScope.value)
          ])
        );
      }
      if (child.length === 0) {
        return;
      }
      return h("div", { class: topClass }, child);
    }
    const headerSelectedValue = computed(() => someRowsSelected.value === true ? null : allRowsSelected.value);
    function getTHead() {
      const child = getTHeadTR();
      if (props.loading === true && slots.loading === void 0) {
        child.push(
          h("tr", { class: "q-table__progress" }, [
            h("th", {
              class: "relative-position",
              colspan: computedColspan.value
            }, getProgress())
          ])
        );
      }
      return h("thead", child);
    }
    function getTHeadTR() {
      const header = slots.header, headerCell = slots["header-cell"];
      if (header !== void 0) {
        return header(
          getHeaderScope({ header: true })
        ).slice();
      }
      const child = computedCols.value.map((col) => {
        const headerCellCol = slots[`header-cell-${col.name}`], slot = headerCellCol !== void 0 ? headerCellCol : headerCell, props2 = getHeaderScope({ col });
        return slot !== void 0 ? slot(props2) : h(QTh, {
          key: col.name,
          props: props2
        }, () => col.label);
      });
      if (singleSelection.value === true && props.grid !== true) {
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, " ")
        );
      } else if (multipleSelection.value === true) {
        const slot = slots["header-selection"];
        const content = slot !== void 0 ? slot(getHeaderScope({})) : [
          h(QCheckbox, {
            color: props.color,
            modelValue: headerSelectedValue.value,
            dark: isDark.value,
            dense: props.dense,
            "onUpdate:modelValue": onMultipleSelectionSet
          })
        ];
        child.unshift(
          h("th", { class: "q-table--col-auto-width" }, content)
        );
      }
      return [
        h("tr", {
          class: props.tableHeaderClass,
          style: props.tableHeaderStyle
        }, child)
      ];
    }
    function getHeaderScope(data) {
      Object.assign(data, {
        cols: computedCols.value,
        sort,
        colsMap: computedColsMap.value,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });
      if (multipleSelection.value === true) {
        injectProp(
          data,
          "selected",
          () => headerSelectedValue.value,
          onMultipleSelectionSet
        );
      }
      return data;
    }
    function onMultipleSelectionSet(val) {
      if (someRowsSelected.value === true) {
        val = false;
      }
      updateSelection(
        computedRows.value.map(getRowKey.value),
        computedRows.value,
        val
      );
    }
    const navIcon = computed(() => {
      const ico = [
        props.iconFirstPage || $q.iconSet.table.firstPage,
        props.iconPrevPage || $q.iconSet.table.prevPage,
        props.iconNextPage || $q.iconSet.table.nextPage,
        props.iconLastPage || $q.iconSet.table.lastPage
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico;
    });
    function getBottomDiv() {
      if (props.hideBottom === true) {
        return;
      }
      if (nothingToDisplay.value === true) {
        if (props.hideNoData === true) {
          return;
        }
        const message = props.loading === true ? props.loadingLabel || $q.lang.table.loading : props.filter ? props.noResultsLabel || $q.lang.table.noResults : props.noDataLabel || $q.lang.table.noData;
        const noData = slots["no-data"];
        const children = noData !== void 0 ? [noData({ message, icon: $q.iconSet.table.warning, filter: props.filter })] : [
          h(QIcon, {
            class: "q-table__bottom-nodata-icon",
            name: $q.iconSet.table.warning
          }),
          message
        ];
        return h("div", { class: bottomClass + " q-table__bottom--nodata" }, children);
      }
      const bottom = slots.bottom;
      if (bottom !== void 0) {
        return h("div", { class: bottomClass }, [bottom(marginalsScope.value)]);
      }
      const child = props.hideSelectedBanner !== true && hasSelectionMode.value === true && rowsSelectedNumber.value > 0 ? [
        h("div", { class: "q-table__control" }, [
          h("div", [
            (props.selectedRowsLabel || $q.lang.table.selectedRecords)(rowsSelectedNumber.value)
          ])
        ])
      ] : [];
      if (props.hidePagination !== true) {
        return h("div", {
          class: bottomClass + " justify-end"
        }, getPaginationDiv(child));
      }
      if (child.length > 0) {
        return h("div", { class: bottomClass }, child);
      }
    }
    function onPagSelection(pag) {
      setPagination({
        page: 1,
        rowsPerPage: pag.value
      });
    }
    function getPaginationDiv(child) {
      let control;
      const { rowsPerPage } = computedPagination.value, paginationLabel = props.paginationLabel || $q.lang.table.pagination, paginationSlot = slots.pagination, hasOpts = props.rowsPerPageOptions.length > 1;
      child.push(
        h("div", { class: "q-table__separator col" })
      );
      if (hasOpts === true) {
        child.push(
          h("div", { class: "q-table__control" }, [
            h("span", { class: "q-table__bottom-item" }, [
              props.rowsPerPageLabel || $q.lang.table.recordsPerPage
            ]),
            h(QSelect, {
              class: "q-table__select inline q-table__bottom-item",
              color: props.color,
              modelValue: rowsPerPage,
              options: computedRowsPerPageOptions.value,
              displayValue: rowsPerPage === 0 ? $q.lang.table.allRows : rowsPerPage,
              dark: isDark.value,
              borderless: true,
              dense: true,
              optionsDense: true,
              optionsCover: true,
              "onUpdate:modelValue": onPagSelection
            })
          ])
        );
      }
      if (paginationSlot !== void 0) {
        control = paginationSlot(marginalsScope.value);
      } else {
        control = [
          h("span", rowsPerPage !== 0 ? { class: "q-table__bottom-item" } : {}, [
            rowsPerPage ? paginationLabel(firstRowIndex.value + 1, Math.min(lastRowIndex.value, computedRowsNumber.value), computedRowsNumber.value) : paginationLabel(1, filteredSortedRowsNumber.value, computedRowsNumber.value)
          ])
        ];
        if (rowsPerPage !== 0 && pagesNumber.value > 1) {
          const btnProps = {
            color: props.color,
            round: true,
            dense: true,
            flat: true
          };
          if (props.dense === true) {
            btnProps.size = "sm";
          }
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgFirst",
              ...btnProps,
              icon: navIcon.value[0],
              disable: isFirstPage.value,
              onClick: firstPage
            })
          );
          control.push(
            h(QBtn, {
              key: "pgPrev",
              ...btnProps,
              icon: navIcon.value[1],
              disable: isFirstPage.value,
              onClick: prevPage
            }),
            h(QBtn, {
              key: "pgNext",
              ...btnProps,
              icon: navIcon.value[2],
              disable: isLastPage.value,
              onClick: nextPage
            })
          );
          pagesNumber.value > 2 && control.push(
            h(QBtn, {
              key: "pgLast",
              ...btnProps,
              icon: navIcon.value[3],
              disable: isLastPage.value,
              onClick: lastPage
            })
          );
        }
      }
      child.push(
        h("div", { class: "q-table__control" }, control)
      );
      return child;
    }
    function getGridHeader() {
      const child = props.gridHeader === true ? [
        h("table", { class: "q-table" }, [
          getTHead()
        ])
      ] : props.loading === true && slots.loading === void 0 ? getProgress() : void 0;
      return h("div", { class: "q-table__middle" }, child);
    }
    function getGridBody() {
      const item = slots.item !== void 0 ? slots.item : (scope) => {
        const child = scope.cols.map(
          (col) => h("div", { class: "q-table__grid-item-row" }, [
            h("div", { class: "q-table__grid-item-title" }, [col.label]),
            h("div", { class: "q-table__grid-item-value" }, [col.value])
          ])
        );
        if (hasSelectionMode.value === true) {
          const slot = slots["body-selection"];
          const content = slot !== void 0 ? slot(scope) : [
            h(QCheckbox, {
              modelValue: scope.selected,
              color: props.color,
              dark: isDark.value,
              dense: props.dense,
              "onUpdate:modelValue": (adding, evt) => {
                updateSelection([scope.key], [scope.row], adding, evt);
              }
            })
          ];
          child.unshift(
            h("div", { class: "q-table__grid-item-row" }, content),
            h(QSeparator, { dark: isDark.value })
          );
        }
        const data = {
          class: [
            "q-table__grid-item-card" + cardDefaultClass.value,
            props.cardClass
          ],
          style: props.cardStyle
        };
        if (props.onRowClick !== void 0 || props.onRowDblclick !== void 0) {
          data.class[0] += " cursor-pointer";
          if (props.onRowClick !== void 0) {
            data.onClick = (evt) => {
              emit("RowClick", evt, scope.row, scope.pageIndex);
            };
          }
          if (props.onRowDblclick !== void 0) {
            data.onDblclick = (evt) => {
              emit("RowDblclick", evt, scope.row, scope.pageIndex);
            };
          }
        }
        return h("div", {
          class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (scope.selected === true ? " q-table__grid-item--selected" : "")
        }, [
          h("div", data, child)
        ]);
      };
      return h("div", {
        class: [
          "q-table__grid-content row",
          props.cardContainerClass
        ],
        style: props.cardContainerStyle
      }, computedRows.value.map((row, pageIndex) => {
        return item(getBodyScope({
          key: getRowKey.value(row),
          row,
          pageIndex
        }));
      }));
    }
    Object.assign(vm.proxy, {
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      getCellValue
    });
    injectMultipleProps(vm.proxy, {
      filteredSortedRows: () => filteredSortedRows.value,
      computedRows: () => computedRows.value,
      computedRowsNumber: () => computedRowsNumber.value
    });
    return () => {
      const child = [getTopDiv()];
      const data = { ref: rootRef, class: containerClass.value };
      if (props.grid === true) {
        child.push(getGridHeader());
      } else {
        Object.assign(data, {
          class: [data.class, props.cardClass],
          style: props.cardStyle
        });
      }
      child.push(
        getBody(),
        getBottomDiv()
      );
      if (props.loading === true && slots.loading !== void 0) {
        child.push(
          slots.loading()
        );
      }
      return h("div", data, child);
    };
  }
});
export { QTr as Q, QTd as a, QTable as b, useCheckboxProps as c, useCheckboxEmits as d, useCheckbox as e, QCheckbox as f, optionSizes as o, useRefocusTarget as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRhYmxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFibGUvUVRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJsZS9RVGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL21hcmt1cC10YWJsZS9RTWFya3VwVGFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL2dldC10YWJsZS1taWRkbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3ZpcnR1YWwtc2Nyb2xsL1FWaXJ0dWFsU2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9saW5lYXItcHJvZ3Jlc3MvUUxpbmVhclByb2dyZXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmVmb2N1cy10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL29wdGlvbi1zaXplcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hlY2tib3gvdXNlLWNoZWNrYm94LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGVja2JveC9RQ2hlY2tib3guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mdWxsc2NyZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZS1zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJsZS90YWJsZS1maWx0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXBhZ2luYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXJvdy1zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLXJvdy1leHBhbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUYWJsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGQnLFxuXG4gIHByb3BzOiB7XG4gICAgcHJvcHM6IE9iamVjdCxcbiAgICBhdXRvV2lkdGg6IEJvb2xlYW4sXG4gICAgbm9Ib3ZlcjogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGQnICsgKHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycpXG4gICAgICArIChwcm9wcy5ub0hvdmVyID09PSB0cnVlID8gJyBxLXRkLS1uby1ob3ZlcicgOiAnJylcbiAgICAgICsgJyAnXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCd0ZCcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5hbWUgPSB2bS52bm9kZS5rZXlcbiAgICAgIGNvbnN0IGNvbCA9IChcbiAgICAgICAgKHByb3BzLnByb3BzLmNvbHNNYXAgIT09IHZvaWQgMCA/IHByb3BzLnByb3BzLmNvbHNNYXBbIG5hbWUgXSA6IG51bGwpXG4gICAgICAgIHx8IHByb3BzLnByb3BzLmNvbFxuICAgICAgKVxuXG4gICAgICBpZiAoY29sID09PSB2b2lkIDApIHsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgeyByb3cgfSA9IHByb3BzLnByb3BzXG5cbiAgICAgIHJldHVybiBoKCd0ZCcsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUgKyBjb2wuX190ZENsYXNzKHJvdyksXG4gICAgICAgIHN0eWxlOiBjb2wuX190ZFN0eWxlKHJvdylcbiAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVHInLFxuXG4gIHByb3BzOiB7XG4gICAgcHJvcHM6IE9iamVjdCxcbiAgICBub0hvdmVyOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRyJ1xuICAgICAgKyAocHJvcHMucHJvcHMgPT09IHZvaWQgMCB8fCBwcm9wcy5wcm9wcy5oZWFkZXIgPT09IHRydWUgPyAnJyA6ICcgJyArIHByb3BzLnByb3BzLl9fdHJDbGFzcylcbiAgICAgICsgKHByb3BzLm5vSG92ZXIgPT09IHRydWUgPyAnIHEtdHItLW5vLWhvdmVyJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCd0cicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRoJyxcblxuICBwcm9wczoge1xuICAgIHByb3BzOiBPYmplY3QsXG4gICAgYXV0b1dpZHRoOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IG9uQ2xpY2sgPSBldnQgPT4geyBlbWl0KCdjbGljaycsIGV2dCkgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCd0aCcsIHtcbiAgICAgICAgICBjbGFzczogcHJvcHMuYXV0b1dpZHRoID09PSB0cnVlID8gJ3EtdGFibGUtLWNvbC1hdXRvLXdpZHRoJyA6ICcnLFxuICAgICAgICAgIG9uQ2xpY2tcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICB9XG5cbiAgICAgIGxldCBjb2wsIGNoaWxkXG4gICAgICBjb25zdCBuYW1lID0gdm0udm5vZGUua2V5XG5cbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGNvbCA9IHByb3BzLnByb3BzLmNvbHNNYXBbIG5hbWUgXVxuICAgICAgICBpZiAoY29sID09PSB2b2lkIDApIHsgcmV0dXJuIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2wgPSBwcm9wcy5wcm9wcy5jb2xcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb2wuYWxpZ24gPT09ICdyaWdodCdcbiAgICAgICAgICA/ICd1bnNoaWZ0J1xuICAgICAgICAgIDogJ3B1c2gnXG5cbiAgICAgICAgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICAgICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiBjb2wuX19pY29uQ2xhc3MsXG4gICAgICAgICAgICBuYW1lOiAkcS5pY29uU2V0LnRhYmxlLmFycm93VXBcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY29sLl9fdGhDbGFzc1xuICAgICAgICAgICsgKHByb3BzLmF1dG9XaWR0aCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tY29sLWF1dG8td2lkdGgnIDogJycpLFxuICAgICAgICBzdHlsZTogY29sLmhlYWRlclN0eWxlLFxuICAgICAgICBvbkNsaWNrOiBldnQgPT4ge1xuICAgICAgICAgIGNvbC5zb3J0YWJsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5wcm9wcy5zb3J0KGNvbCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIG9uQ2xpY2soZXZ0KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCd0aCcsIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc2VwYXJhdG9yVmFsdWVzID0gWyAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcsICdjZWxsJywgJ25vbmUnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNYXJrdXBUYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBzZXBhcmF0b3JWYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLW1hcmt1cC10YWJsZSBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgYCBxLXRhYmxlLS0keyBwcm9wcy5zZXBhcmF0b3IgfS1zZXBhcmF0b3JgXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFibGUtLWRhcmsgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXRhYmxlLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRhYmxlLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy53cmFwQ2VsbHMgPT09IGZhbHNlID8gJyBxLXRhYmxlLS1uby13cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIFtcbiAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGNvbnRlbnQpIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHByb3BzLCBbXG4gICAgaCgndGFibGUnLCB7IGNsYXNzOiAncS10YWJsZScgfSwgY29udGVudClcbiAgXSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZU1vdW50LCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRTGlzdCBmcm9tICcuLi9pdGVtL1FMaXN0LmpzJ1xuaW1wb3J0IFFNYXJrdXBUYWJsZSBmcm9tICcuLi9tYXJrdXAtdGFibGUvUU1hcmt1cFRhYmxlLmpzJ1xuaW1wb3J0IGdldFRhYmxlTWlkZGxlIGZyb20gJy4uL3RhYmxlL2dldC10YWJsZS1taWRkbGUuanMnXG5cbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGwsIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyB9IGZyb20gJy4vdXNlLXZpcnR1YWwtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgY29tcHMgPSB7XG4gIGxpc3Q6IFFMaXN0LFxuICB0YWJsZTogUU1hcmt1cFRhYmxlXG59XG5cbmNvbnN0IHR5cGVPcHRpb25zID0gWyAnbGlzdCcsICd0YWJsZScsICdfX3F0YWJsZScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVZpcnR1YWxTY3JvbGwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xpc3QnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVPcHRpb25zLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcblxuICAgIGl0ZW1zRm46IEZ1bmN0aW9uLFxuICAgIGl0ZW1zU2l6ZTogTnVtYmVyLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBhdHRycyB9KSB7XG4gICAgbGV0IGxvY2FsU2Nyb2xsVGFyZ2V0XG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbExlbmd0aCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLml0ZW1zU2l6ZSA+PSAwICYmIHByb3BzLml0ZW1zRm4gIT09IHZvaWQgMFxuICAgICAgICA/IHBhcnNlSW50KHByb3BzLml0ZW1zU2l6ZSwgMTApXG4gICAgICAgIDogKEFycmF5LmlzQXJyYXkocHJvcHMuaXRlbXMpID8gcHJvcHMuaXRlbXMubGVuZ3RoIDogMClcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICB9ID0gdXNlVmlydHVhbFNjcm9sbCh7XG4gICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWxcbiAgICB9KVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcEZuID0gKGl0ZW0sIGkpID0+ICh7XG4gICAgICAgIGluZGV4OiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICsgaSxcbiAgICAgICAgaXRlbVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHByb3BzLml0ZW1zRm4gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLml0ZW1zLnNsaWNlKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvKS5tYXAobWFwRm4pXG4gICAgICAgIDogcHJvcHMuaXRlbXNGbih2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pLm1hcChtYXBGbilcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS12aXJ0dWFsLXNjcm9sbCBxLXZpcnR1YWwtc2Nyb2xsJyArIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICctLWhvcml6b250YWwnIDogJy0tdmVydGljYWwnKVxuICAgICAgKyAocHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyAnJyA6ICcgc2Nyb2xsJylcbiAgICApXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDAgPyB7fSA6IHsgdGFiaW5kZXg6IDAgfVxuICAgICkpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCAoKSA9PiB7XG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCgpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiByb290UmVmLnZhbHVlLiRlbCB8fCByb290UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTY3JvbGxUYXJnZXRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQoZ2V0VmlydHVhbFNjcm9sbEVsKCksIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVmlydHVhbFNjcm9sbEV2dCwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IHZvaWQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9fZ2V0VmlydHVhbENoaWxkcmVuICgpIHtcbiAgICAgIGxldCBjaGlsZCA9IHBhZFZpcnR1YWxTY3JvbGwoXG4gICAgICAgIHByb3BzLnR5cGUgPT09ICdsaXN0JyA/ICdkaXYnIDogJ3Rib2R5JyxcbiAgICAgICAgdmlydHVhbFNjcm9sbFNjb3BlLnZhbHVlLm1hcChzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAoc2xvdHMuYmVmb3JlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBzbG90cy5iZWZvcmUoKS5jb25jYXQoY2hpbGQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzLmFmdGVyLCBjaGlsZClcbiAgICB9XG5cbiAgICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdRVmlydHVhbFNjcm9sbDogZGVmYXVsdCBzY29wZWQgc2xvdCBpcyByZXF1aXJlZCBmb3IgcmVuZGVyaW5nJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy50eXBlID09PSAnX19xdGFibGUnXG4gICAgICAgID8gZ2V0VGFibGVNaWRkbGUoXG4gICAgICAgICAgeyByZWY6IHJvb3RSZWYsIGNsYXNzOiAncS10YWJsZV9fbWlkZGxlICcgKyBjbGFzc2VzLnZhbHVlIH0sXG4gICAgICAgICAgX19nZXRWaXJ0dWFsQ2hpbGRyZW4oKVxuICAgICAgICApXG4gICAgICAgIDogaChjb21wc1sgcHJvcHMudHlwZSBdLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICAgIGNsYXNzOiBbIGF0dHJzLmNsYXNzLCBjbGFzc2VzLnZhbHVlIF0sXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9LCBfX2dldFZpcnR1YWxDaGlsZHJlbilcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDIsXG4gIHNtOiA0LFxuICBtZDogNixcbiAgbGc6IDEwLFxuICB4bDogMTRcbn1cblxuZnVuY3Rpb24gd2lkdGggKHZhbCwgcmV2ZXJzZSwgJHEpIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2Zvcm06IHJldmVyc2UgPT09IHRydWVcbiAgICAgID8gYHRyYW5zbGF0ZVgoJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnLScgOiAnJyB9MTAwJSkgc2NhbGUzZCgkeyAtdmFsIH0sMSwxKWBcbiAgICAgIDogYHNjYWxlM2QoJHsgdmFsIH0sMSwxKWBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxpbmVhclByb2dyZXNzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgYnVmZmVyOiBOdW1iZXIsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRyYWNrQ29sb3I6IFN0cmluZyxcblxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG4gICAgc3RyaXBlOiBCb29sZWFuLFxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG4gICAgcXVlcnk6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcblxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAyMTAwXG4gICAgfSxcblxuICAgIGluc3RhbnRGZWVkYmFjazogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBkZWZhdWx0U2l6ZXMpXG5cbiAgICBjb25zdCBtb3Rpb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlIHx8IHByb3BzLnF1ZXJ5ID09PSB0cnVlKVxuICAgIGNvbnN0IHdpZHRoUmV2ZXJzZSA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnJldmVyc2UgIT09IHByb3BzLnF1ZXJ5KVxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLihzaXplU3R5bGUudmFsdWUgIT09IG51bGwgPyBzaXplU3R5bGUudmFsdWUgOiB7fSksXG4gICAgICAnLS1xLWxpbmVhci1wcm9ncmVzcy1zcGVlZCc6IGAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXNgXG4gICAgfSkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpbmVhci1wcm9ncmVzcydcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKHByb3BzLnJldmVyc2UgPT09IHRydWUgfHwgcHJvcHMucXVlcnkgPT09IHRydWUgPyAnIHEtbGluZWFyLXByb2dyZXNzLS1yZXZlcnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHRyYWNrU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB3aWR0aChwcm9wcy5idWZmZXIgIT09IHZvaWQgMCA/IHByb3BzLmJ1ZmZlciA6IDEsIHdpZHRoUmV2ZXJzZS52YWx1ZSwgcHJveHkuJHEpKVxuICAgIGNvbnN0IHRyYW5zaXRpb25TdWZmaXggPSBjb21wdXRlZCgoKSA9PiBgd2l0aCR7IHByb3BzLmluc3RhbnRGZWVkYmFjayA9PT0gdHJ1ZSA/ICdvdXQnIDogJycgfS10cmFuc2l0aW9uYClcblxuICAgIGNvbnN0IHRyYWNrQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGluZWFyLXByb2dyZXNzX190cmFjayBhYnNvbHV0ZS1mdWxsJ1xuICAgICAgKyBgIHEtbGluZWFyLXByb2dyZXNzX190cmFjay0tJHsgdHJhbnNpdGlvblN1ZmZpeC52YWx1ZSB9YFxuICAgICAgKyBgIHEtbGluZWFyLXByb2dyZXNzX190cmFjay0tJHsgaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJ2RhcmsnIDogJ2xpZ2h0JyB9YFxuICAgICAgKyAocHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy50cmFja0NvbG9yIH1gIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgbW9kZWxTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHdpZHRoKG1vdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiBwcm9wcy52YWx1ZSwgd2lkdGhSZXZlcnNlLnZhbHVlLCBwcm94eS4kcSkpXG4gICAgY29uc3QgbW9kZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsIGFic29sdXRlLWZ1bGwnXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsLS0keyB0cmFuc2l0aW9uU3VmZml4LnZhbHVlIH1gXG4gICAgICArIGAgcS1saW5lYXItcHJvZ3Jlc3NfX21vZGVsLS0keyBtb3Rpb24udmFsdWUgPT09IHRydWUgPyAnaW4nIDogJycgfWRldGVybWluYXRlYFxuICAgIClcblxuICAgIGNvbnN0IHN0cmlwZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHsgd2lkdGg6IGAkeyBwcm9wcy52YWx1ZSAqIDEwMCB9JWAgfSkpXG4gICAgY29uc3Qgc3RyaXBlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtbGluZWFyLXByb2dyZXNzX19zdHJpcGUgYWJzb2x1dGUtJHsgcHJvcHMucmV2ZXJzZSA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgfWBcbiAgICAgICsgYCBxLWxpbmVhci1wcm9ncmVzc19fc3RyaXBlLS0keyB0cmFuc2l0aW9uU3VmZml4LnZhbHVlIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IHRyYWNrQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IHRyYWNrU3R5bGUudmFsdWVcbiAgICAgICAgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiBtb2RlbENsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBtb2RlbFN0eWxlLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIHByb3BzLnN0cmlwZSA9PT0gdHJ1ZSAmJiBtb3Rpb24udmFsdWUgPT09IGZhbHNlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogc3RyaXBlQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IHN0cmlwZVN0eWxlLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogMCxcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiAxLFxuICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb3BzLmluZGV0ZXJtaW5hdGUgPT09IHRydWVcbiAgICAgICAgICA/IHZvaWQgMFxuICAgICAgICAgIDogcHJvcHMudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY2hpbGQpKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcm9vdFJlZikge1xuICBjb25zdCByZWZvY3VzUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmVmb2N1c1RhcmdldEVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgcmVmOiByZWZvY3VzUmVmLFxuICAgICAgY2xhc3M6ICduby1vdXRsaW5lJyxcbiAgICAgIHRhYmluZGV4OiAtMVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVmb2N1c1RhcmdldCAoZSkge1xuICAgIGNvbnN0IHJvb3QgPSByb290UmVmLnZhbHVlXG5cbiAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMCkge1xuICAgICAgaWYgKFxuICAgICAgICByb290ICE9PSBudWxsXG4gICAgICAgICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHJvb3RcbiAgICAgICAgJiYgcm9vdC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHJvb3QuZm9jdXMoKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHJvb3QgIT09IG51bGwgJiYgcm9vdC5jb250YWlucyhlLnRhcmdldCkgPT09IHRydWUpKVxuICAgICkge1xuICAgICAgcmVmb2N1c1JlZi52YWx1ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWZvY3VzVGFyZ2V0RWwsXG4gICAgcmVmb2N1c1RhcmdldFxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHhzOiAzMCxcbiAgc206IDM1LFxuICBtZDogNDAsXG4gIGxnOiA1MCxcbiAgeGw6IDYwXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UsIHRvUmF3IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybUluamVjdCwgdXNlRm9ybVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IG9wdGlvblNpemVzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VDaGVja2JveFByb3BzID0ge1xuICAuLi51c2VEYXJrUHJvcHMsXG4gIC4uLnVzZVNpemVQcm9wcyxcbiAgLi4udXNlRm9ybVByb3BzLFxuXG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHZhbDoge30sXG5cbiAgdHJ1ZVZhbHVlOiB7IGRlZmF1bHQ6IHRydWUgfSxcbiAgZmFsc2VWYWx1ZTogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICBpbmRldGVybWluYXRlVmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxuXG4gIGNoZWNrZWRJY29uOiBTdHJpbmcsXG4gIHVuY2hlY2tlZEljb246IFN0cmluZyxcbiAgaW5kZXRlcm1pbmF0ZUljb246IFN0cmluZyxcblxuICB0b2dnbGVPcmRlcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA9PT0gJ3RmJyB8fCB2ID09PSAnZnQnXG4gIH0sXG4gIHRvZ2dsZUluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG5cbiAgbGFiZWw6IFN0cmluZyxcbiAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlQ2hlY2tib3hFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0eXBlLCBnZXRJbm5lcikge1xuICBjb25zdCB7IHByb3BzLCBzbG90cywgZW1pdCwgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcbiAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgb3B0aW9uU2l6ZXMpXG5cbiAgY29uc3QgbW9kZWxJc0FycmF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy52YWwgIT09IHZvaWQgMCAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpXG4gIClcblxuICBjb25zdCBpbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0b1Jhdyhwcm9wcy52YWwpXG4gICAgcmV0dXJuIG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlLmZpbmRJbmRleChvcHQgPT4gdG9SYXcob3B0KSA9PT0gdmFsKVxuICAgICAgOiAtMVxuICB9KVxuXG4gIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gaW5kZXgudmFsdWUgPiAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMudHJ1ZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzRmFsc2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlID09PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMuZmFsc2VWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBpc0luZGV0ZXJtaW5hdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGlzVHJ1ZS52YWx1ZSA9PT0gZmFsc2UgJiYgaXNGYWxzZS52YWx1ZSA9PT0gZmFsc2VcbiAgKVxuXG4gIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAtMSA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS0keyB0eXBlIH0gY3Vyc29yLXBvaW50ZXIgbm8tb3V0bGluZSByb3cgaW5saW5lIG5vLXdyYXAgaXRlbXMtY2VudGVyYFxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRhcmtgIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyBgIHEtJHsgdHlwZSB9LS1kZW5zZWAgOiAnJylcbiAgICArIChwcm9wcy5sZWZ0TGFiZWwgPT09IHRydWUgPyAnIHJldmVyc2UnIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAoaXNGYWxzZS52YWx1ZSA9PT0gdHJ1ZSA/ICdmYWxzeScgOiAnaW5kZXQnKVxuICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiAoXG4gICAgICBwcm9wcy5rZWVwQ29sb3IgPT09IHRydWVcbiAgICAgIHx8ICh0eXBlID09PSAndG9nZ2xlJyA/IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSA6IGlzRmFsc2UudmFsdWUgIT09IHRydWUpXG4gICAgKVxuICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgIDogJydcblxuICAgIHJldHVybiBgcS0keyB0eXBlIH1fX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIG5vbi1zZWxlY3RhYmxlIHEtJHsgdHlwZSB9X19pbm5lci0tJHsgc3RhdGUgfSR7IGNvbG9yIH1gXG4gIH0pXG5cbiAgY29uc3QgZm9ybUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHByb3AgPSB7IHR5cGU6ICdjaGVja2JveCcgfVxuXG4gICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgLy8gc2VlIGh0dHBzOi8vdnVlanMub3JnL2d1aWRlL2V4dHJhcy9yZW5kZXItZnVuY3Rpb24uaHRtbCNjcmVhdGluZy12bm9kZXMgKC5wcm9wKVxuICAgICAgJy5jaGVja2VkJzogaXNUcnVlLnZhbHVlLFxuICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgIHZhbHVlOiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy52YWxcbiAgICAgICAgOiBwcm9wcy50cnVlVmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb3BcbiAgfSlcblxuICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogdHlwZSA9PT0gJ3RvZ2dsZScgPyAnc3dpdGNoJyA6ICdjaGVja2JveCcsXG4gICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgJ2FyaWEtY2hlY2tlZCc6IGlzSW5kZXRlcm1pbmF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdtaXhlZCdcbiAgICAgICAgOiAoaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJylcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzXG4gIH0pXG5cbiAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICByZWZvY3VzVGFyZ2V0KGUpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZ2V0TmV4dFZhbHVlKCksIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmV4dFZhbHVlICgpIHtcbiAgICBpZiAobW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNUcnVlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICB2YWwuc3BsaWNlKGluZGV4LnZhbHVlLCAxKVxuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlLmNvbmNhdChbIHByb3BzLnZhbCBdKVxuICAgIH1cblxuICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuZmFsc2VWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0ZhbHNlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMudG9nZ2xlT3JkZXIgPT09ICdmdCcgfHwgcHJvcHMudG9nZ2xlSW5kZXRlcm1pbmF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzLnRydWVWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0J1xuICAgICAgICA/IHByb3BzLnRydWVWYWx1ZVxuICAgICAgICA6IHByb3BzLmZhbHNlVmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMuaW5kZXRlcm1pbmF0ZVZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBvbkNsaWNrKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0SW5uZXJDb250ZW50ID0gZ2V0SW5uZXIoaXNUcnVlLCBpc0luZGV0ZXJtaW5hdGUpXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdG9nZ2xlOiBvbkNsaWNrIH0pXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBpbm5lciA9IGdldElubmVyQ29udGVudCgpXG5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGluamVjdEZvcm1JbnB1dChcbiAgICAgIGlubmVyLFxuICAgICAgJ3Vuc2hpZnQnLFxuICAgICAgYCBxLSR7IHR5cGUgfV9fbmF0aXZlIGFic29sdXRlIHEtbWEtbm9uZSBxLXBhLW5vbmVgXG4gICAgKVxuXG4gICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgIH0sIGlubmVyKVxuICAgIF1cblxuICAgIGlmIChyZWZvY3VzVGFyZ2V0RWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcblxuICAgIGxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fbGFiZWwgcS1hbmNob3ItLXNraXBgXG4gICAgICB9LCBsYWJlbClcbiAgICApXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5ZG93bixcbiAgICAgIG9uS2V5dXBcbiAgICB9LCBjaGlsZClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VDaGVja2JveCwgeyB1c2VDaGVja2JveFByb3BzLCB1c2VDaGVja2JveEVtaXRzIH0gZnJvbSAnLi91c2UtY2hlY2tib3guanMnXG5cbmNvbnN0IGJnTm9kZSA9IGgoJ2RpdicsIHtcbiAga2V5OiAnc3ZnJyxcbiAgY2xhc3M6ICdxLWNoZWNrYm94X19iZyBhYnNvbHV0ZSdcbn0sIFtcbiAgaCgnc3ZnJywge1xuICAgIGNsYXNzOiAncS1jaGVja2JveF9fc3ZnIGZpdCBhYnNvbHV0ZS1mdWxsJyxcbiAgICB2aWV3Qm94OiAnMCAwIDI0IDI0J1xuICB9LCBbXG4gICAgaCgncGF0aCcsIHtcbiAgICAgIGNsYXNzOiAncS1jaGVja2JveF9fdHJ1dGh5JyxcbiAgICAgIGZpbGw6ICdub25lJyxcbiAgICAgIGQ6ICdNMS43MywxMi45MSA4LjEsMTkuMjggMjIuNzksNC41OSdcbiAgICB9KSxcblxuICAgIGgoJ3BhdGgnLCB7XG4gICAgICBjbGFzczogJ3EtY2hlY2tib3hfX2luZGV0JyxcbiAgICAgIGQ6ICdNNCwxNEgyMFYxMEg0J1xuICAgIH0pXG4gIF0pXG5dKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoZWNrYm94JyxcblxuICBwcm9wczogdXNlQ2hlY2tib3hQcm9wcyxcbiAgZW1pdHM6IHVzZUNoZWNrYm94RW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgZnVuY3Rpb24gZ2V0SW5uZXIgKGlzVHJ1ZSwgaXNJbmRldGVybWluYXRlKSB7XG4gICAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMuY2hlY2tlZEljb25cbiAgICAgICAgICA6IChpc0luZGV0ZXJtaW5hdGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBwcm9wcy5pbmRldGVybWluYXRlSWNvblxuICAgICAgICAgICAgICA6IHByb3BzLnVuY2hlY2tlZEljb25cbiAgICAgICAgICAgIClcbiAgICAgICAgKSB8fCBudWxsXG4gICAgICApXG5cbiAgICAgIHJldHVybiAoKSA9PiAoXG4gICAgICAgIGljb24udmFsdWUgIT09IG51bGxcbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGtleTogJ2ljb24nLFxuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1jaGVja2JveF9faWNvbi1jb250YWluZXIgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgICBjbGFzczogJ3EtY2hlY2tib3hfX2ljb24nLFxuICAgICAgICAgICAgICAgICAgbmFtZTogaWNvbi52YWx1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBbIGJnTm9kZSBdXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIHVzZUNoZWNrYm94KCdjaGVja2JveCcsIGdldElubmVyKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVNb3VudCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxubGV0IGNvdW50ZXIgPSAwXG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuUHJvcHMgPSB7XG4gIGZ1bGxzY3JlZW46IEJvb2xlYW4sXG4gIG5vUm91dGVGdWxsc2NyZWVuRXhpdDogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlRnVsbHNjcmVlbkVtaXRzID0gWyAndXBkYXRlOmZ1bGxzY3JlZW4nLCAnZnVsbHNjcmVlbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IGhpc3RvcnlFbnRyeSwgZnVsbHNjcmVlbkZpbGxlck5vZGUsIGNvbnRhaW5lclxuICBjb25zdCBpbkZ1bGxzY3JlZW4gPSByZWYoZmFsc2UpXG5cbiAgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlICYmIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgIHByb3BzLm5vUm91dGVGdWxsc2NyZWVuRXhpdCAhPT0gdHJ1ZSAmJiBleGl0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdikge1xuICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKGluRnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgZW1pdCgndXBkYXRlOmZ1bGxzY3JlZW4nLCB2KVxuICAgIGVtaXQoJ2Z1bGxzY3JlZW4nLCB2KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpbkZ1bGxzY3JlZW4udmFsdWUgPSB0cnVlXG4gICAgY29udGFpbmVyID0gcHJveHkuJGVsLnBhcmVudE5vZGVcbiAgICBjb250YWluZXIucmVwbGFjZUNoaWxkKGZ1bGxzY3JlZW5GaWxsZXJOb2RlLCBwcm94eS4kZWwpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm94eS4kZWwpXG5cbiAgICBjb3VudGVyKytcbiAgICBpZiAoY291bnRlciA9PT0gMSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZ1bGxzY3JlZW4tbWl4aW4nKVxuICAgIH1cblxuICAgIGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgIGhhbmRsZXI6IGV4aXRGdWxsc2NyZWVuXG4gICAgfVxuICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4aXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaGlzdG9yeUVudHJ5ICE9PSB2b2lkIDApIHtcbiAgICAgIEhpc3RvcnkucmVtb3ZlKGhpc3RvcnlFbnRyeSlcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHZvaWQgMFxuICAgIH1cblxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQocHJveHkuJGVsLCBmdWxsc2NyZWVuRmlsbGVyTm9kZSlcbiAgICBpbkZ1bGxzY3JlZW4udmFsdWUgPSBmYWxzZVxuXG4gICAgY291bnRlciA9IE1hdGgubWF4KDAsIGNvdW50ZXIgLSAxKVxuXG4gICAgaWYgKGNvdW50ZXIgPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mdWxsc2NyZWVuLW1peGluJylcblxuICAgICAgaWYgKHByb3h5LiRlbC5zY3JvbGxJbnRvVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBwcm94eS4kZWwuc2Nyb2xsSW50b1ZpZXcoKSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlTW91bnQoKCkgPT4ge1xuICAgIGZ1bGxzY3JlZW5GaWxsZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9wcy5mdWxsc2NyZWVuID09PSB0cnVlICYmIHNldEZ1bGxzY3JlZW4oKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudChleGl0RnVsbHNjcmVlbilcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4sXG4gICAgc2V0RnVsbHNjcmVlbixcbiAgICBleGl0RnVsbHNjcmVlblxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgaW5GdWxsc2NyZWVuLFxuICAgIHRvZ2dsZUZ1bGxzY3JlZW5cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvcnREYXRlIChhLCBiKSB7XG4gIHJldHVybiAobmV3IERhdGUoYSkpIC0gKG5ldyBEYXRlKGIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEJvb2xlYW4gKGEsIGIpIHtcbiAgcmV0dXJuIGEgJiYgIWJcbiAgICA/IC0xXG4gICAgOiAoIWEgJiYgYiA/IDEgOiAwKVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHNvcnREYXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zb3J0LmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIsIGlzRGF0ZSwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9pcy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlU29ydFByb3BzID0ge1xuICBzb3J0TWV0aG9kOiBGdW5jdGlvbixcbiAgYmluYXJ5U3RhdGVTb3J0OiBCb29sZWFuLFxuICBjb2x1bW5Tb3J0T3JkZXI6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPT09ICdhZCcgfHwgdiA9PT0gJ2RhJyxcbiAgICBkZWZhdWx0OiAnYWQnXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlU29ydCAocHJvcHMsIGNvbXB1dGVkUGFnaW5hdGlvbiwgY29sTGlzdCwgc2V0UGFnaW5hdGlvbikge1xuICBjb25zdCBjb2x1bW5Ub1NvcnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBzb3J0QnkgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgcmV0dXJuIHNvcnRCeVxuICAgICAgPyBjb2xMaXN0LnZhbHVlLmZpbmQoZGVmID0+IGRlZi5uYW1lID09PSBzb3J0QnkpIHx8IG51bGxcbiAgICAgIDogbnVsbFxuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkU29ydE1ldGhvZCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5zb3J0TWV0aG9kICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuc29ydE1ldGhvZFxuICAgICAgOiAoZGF0YSwgc29ydEJ5LCBkZXNjZW5kaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sID0gY29sTGlzdC52YWx1ZS5maW5kKGRlZiA9PiBkZWYubmFtZSA9PT0gc29ydEJ5KVxuICAgICAgICAgIGlmIChjb2wgPT09IHZvaWQgMCB8fCBjb2wuZmllbGQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgZGlyID0gZGVzY2VuZGluZyA9PT0gdHJ1ZSA/IC0xIDogMSxcbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiBjb2wuZmllbGQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgPyB2ID0+IGNvbC5maWVsZCh2KVxuICAgICAgICAgICAgICA6IHYgPT4gdlsgY29sLmZpZWxkIF1cblxuICAgICAgICAgIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldFxuICAgICAgICAgICAgICBBID0gdmFsKGEpLFxuICAgICAgICAgICAgICBCID0gdmFsKGIpXG5cbiAgICAgICAgICAgIGlmIChBID09PSBudWxsIHx8IEEgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gLTEgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChCID09PSBudWxsIHx8IEIgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gMSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbC5zb3J0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbC5zb3J0KEEsIEIsIGEsIGIpICogZGlyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoQSkgPT09IHRydWUgJiYgaXNOdW1iZXIoQikgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChBIC0gQikgKiBkaXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RhdGUoQSkgPT09IHRydWUgJiYgaXNEYXRlKEIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3J0RGF0ZShBLCBCKSAqIGRpclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBBID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIEIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gKEEgLSBCKSAqIGRpclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbIEEsIEIgXSA9IFsgQSwgQiBdLm1hcChzID0+IChzICsgJycpLnRvTG9jYWxlU3RyaW5nKCkudG9Mb3dlckNhc2UoKSlcblxuICAgICAgICAgICAgcmV0dXJuIEEgPCBCXG4gICAgICAgICAgICAgID8gLTEgKiBkaXJcbiAgICAgICAgICAgICAgOiAoQSA9PT0gQiA/IDAgOiBkaXIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICApKVxuXG4gIGZ1bmN0aW9uIHNvcnQgKGNvbCAvKiBTdHJpbmcoY29sIG5hbWUpIG9yIE9iamVjdChjb2wgZGVmaW5pdGlvbikgKi8pIHtcbiAgICBsZXQgc29ydE9yZGVyID0gcHJvcHMuY29sdW1uU29ydE9yZGVyXG5cbiAgICBpZiAoaXNPYmplY3QoY29sKSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGNvbC5zb3J0T3JkZXIpIHtcbiAgICAgICAgc29ydE9yZGVyID0gY29sLnNvcnRPcmRlclxuICAgICAgfVxuXG4gICAgICBjb2wgPSBjb2wubmFtZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGRlZiA9IGNvbExpc3QudmFsdWUuZmluZChkZWYgPT4gZGVmLm5hbWUgPT09IGNvbClcbiAgICAgIGlmIChkZWYgIT09IHZvaWQgMCAmJiBkZWYuc29ydE9yZGVyKSB7XG4gICAgICAgIHNvcnRPcmRlciA9IGRlZi5zb3J0T3JkZXJcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgeyBzb3J0QnksIGRlc2NlbmRpbmcgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgaWYgKHNvcnRCeSAhPT0gY29sKSB7XG4gICAgICBzb3J0QnkgPSBjb2xcbiAgICAgIGRlc2NlbmRpbmcgPSBzb3J0T3JkZXIgPT09ICdkYSdcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuYmluYXJ5U3RhdGVTb3J0ID09PSB0cnVlKSB7XG4gICAgICBkZXNjZW5kaW5nID0gIWRlc2NlbmRpbmdcbiAgICB9XG4gICAgZWxzZSBpZiAoZGVzY2VuZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FkJykge1xuICAgICAgICBzb3J0QnkgPSBudWxsXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVzY2VuZGluZyA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgeyAvLyBhc2NlbmRpbmdcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhZCcpIHtcbiAgICAgICAgZGVzY2VuZGluZyA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzb3J0QnkgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGFnaW5hdGlvbih7IHNvcnRCeSwgZGVzY2VuZGluZywgcGFnZTogMSB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb2x1bW5Ub1NvcnQsXG4gICAgY29tcHV0ZWRTb3J0TWV0aG9kLFxuICAgIHNvcnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlRmlsdGVyUHJvcHMgPSB7XG4gIGZpbHRlcjogWyBTdHJpbmcsIE9iamVjdCBdLFxuICBmaWx0ZXJNZXRob2Q6IEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUYWJsZUZpbHRlciAocHJvcHMsIHNldFBhZ2luYXRpb24pIHtcbiAgY29uc3QgY29tcHV0ZWRGaWx0ZXJNZXRob2QgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZmlsdGVyTWV0aG9kICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuZmlsdGVyTWV0aG9kXG4gICAgICA6IChyb3dzLCB0ZXJtcywgY29scywgY2VsbFZhbHVlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbG93ZXJUZXJtcyA9IHRlcm1zID8gdGVybXMudG9Mb3dlckNhc2UoKSA6ICcnXG4gICAgICAgICAgcmV0dXJuIHJvd3MuZmlsdGVyKFxuICAgICAgICAgICAgcm93ID0+IGNvbHMuc29tZShjb2wgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjZWxsVmFsdWUoY29sLCByb3cpICsgJydcbiAgICAgICAgICAgICAgY29uc3QgaGF5c3RhY2sgPSAodmFsID09PSAndW5kZWZpbmVkJyB8fCB2YWwgPT09ICdudWxsJykgPyAnJyA6IHZhbC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKGxvd2VyVGVybXMpICE9PSAtMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgKSlcblxuICB3YXRjaChcbiAgICAoKSA9PiBwcm9wcy5maWx0ZXIsXG4gICAgKCkgPT4ge1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogMSB9LCB0cnVlKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHsgZGVlcDogdHJ1ZSB9XG4gIClcblxuICByZXR1cm4geyBjb21wdXRlZEZpbHRlck1ldGhvZCB9XG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmZ1bmN0aW9uIHNhbWVQYWdpbmF0aW9uIChvbGRQYWcsIG5ld1BhZykge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gbmV3UGFnKSB7XG4gICAgaWYgKG5ld1BhZ1sgcHJvcCBdICE9PSBvbGRQYWdbIHByb3AgXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpeFBhZ2luYXRpb24gKHApIHtcbiAgaWYgKHAucGFnZSA8IDEpIHtcbiAgICBwLnBhZ2UgPSAxXG4gIH1cbiAgaWYgKHAucm93c1BlclBhZ2UgIT09IHZvaWQgMCAmJiBwLnJvd3NQZXJQYWdlIDwgMSkge1xuICAgIHAucm93c1BlclBhZ2UgPSAwXG4gIH1cbiAgcmV0dXJuIHBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUGFnaW5hdGlvblByb3BzID0ge1xuICBwYWdpbmF0aW9uOiBPYmplY3QsXG4gIHJvd3NQZXJQYWdlT3B0aW9uczoge1xuICAgIHR5cGU6IEFycmF5LFxuICAgIGRlZmF1bHQ6ICgpID0+IFsgNSwgNywgMTAsIDE1LCAyMCwgMjUsIDUwLCAwIF1cbiAgfSxcblxuICAnb25VcGRhdGU6cGFnaW5hdGlvbic6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlUGFnaW5hdGlvblN0YXRlICh2bSwgZ2V0Q2VsbFZhbHVlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQgfSA9IHZtXG5cbiAgY29uc3QgaW5uZXJQYWdpbmF0aW9uID0gcmVmKFxuICAgIE9iamVjdC5hc3NpZ24oe1xuICAgICAgc29ydEJ5OiBudWxsLFxuICAgICAgZGVzY2VuZGluZzogZmFsc2UsXG4gICAgICBwYWdlOiAxLFxuICAgICAgcm93c1BlclBhZ2U6IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgID8gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zWyAwIF1cbiAgICAgICAgOiA1XG4gICAgfSwgcHJvcHMucGFnaW5hdGlvbilcbiAgKVxuXG4gIGNvbnN0IGNvbXB1dGVkUGFnaW5hdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBwYWcgPSBwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgPyB7IC4uLmlubmVyUGFnaW5hdGlvbi52YWx1ZSwgLi4ucHJvcHMucGFnaW5hdGlvbiB9XG4gICAgICA6IGlubmVyUGFnaW5hdGlvbi52YWx1ZVxuXG4gICAgcmV0dXJuIGZpeFBhZ2luYXRpb24ocGFnKVxuICB9KVxuXG4gIGNvbnN0IGlzU2VydmVyU2lkZSA9IGNvbXB1dGVkKCgpID0+IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzTnVtYmVyICE9PSB2b2lkIDApXG5cbiAgZnVuY3Rpb24gc2VuZFNlcnZlclJlcXVlc3QgKHBhZ2luYXRpb24pIHtcbiAgICByZXF1ZXN0U2VydmVySW50ZXJhY3Rpb24oe1xuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIGZpbHRlcjogcHJvcHMuZmlsdGVyXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbiAocHJvcCA9IHt9KSB7XG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgZW1pdCgncmVxdWVzdCcsIHtcbiAgICAgICAgcGFnaW5hdGlvbjogcHJvcC5wYWdpbmF0aW9uIHx8IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSxcbiAgICAgICAgZmlsdGVyOiBwcm9wLmZpbHRlciB8fCBwcm9wcy5maWx0ZXIsXG4gICAgICAgIGdldENlbGxWYWx1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UGFnaW5hdGlvbiAodmFsLCBmb3JjZVNlcnZlclJlcXVlc3QpIHtcbiAgICBjb25zdCBuZXdQYWdpbmF0aW9uID0gZml4UGFnaW5hdGlvbih7XG4gICAgICAuLi5jb21wdXRlZFBhZ2luYXRpb24udmFsdWUsXG4gICAgICAuLi52YWxcbiAgICB9KVxuXG4gICAgaWYgKHNhbWVQYWdpbmF0aW9uKGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSwgbmV3UGFnaW5hdGlvbikgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUgJiYgZm9yY2VTZXJ2ZXJSZXF1ZXN0ID09PSB0cnVlKSB7XG4gICAgICAgIHNlbmRTZXJ2ZXJSZXF1ZXN0KG5ld1BhZ2luYXRpb24pXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBzZW5kU2VydmVyUmVxdWVzdChuZXdQYWdpbmF0aW9uKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMucGFnaW5hdGlvbiAhPT0gdm9pZCAwXG4gICAgICAmJiBwcm9wc1sgJ29uVXBkYXRlOnBhZ2luYXRpb24nIF0gIT09IHZvaWQgMFxuICAgICkge1xuICAgICAgZW1pdCgndXBkYXRlOnBhZ2luYXRpb24nLCBuZXdQYWdpbmF0aW9uKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlubmVyUGFnaW5hdGlvbi52YWx1ZSA9IG5ld1BhZ2luYXRpb25cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyUGFnaW5hdGlvbixcbiAgICBjb21wdXRlZFBhZ2luYXRpb24sXG4gICAgaXNTZXJ2ZXJTaWRlLFxuXG4gICAgcmVxdWVzdFNlcnZlckludGVyYWN0aW9uLFxuICAgIHNldFBhZ2luYXRpb25cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVQYWdpbmF0aW9uICh2bSwgaW5uZXJQYWdpbmF0aW9uLCBjb21wdXRlZFBhZ2luYXRpb24sIGlzU2VydmVyU2lkZSwgc2V0UGFnaW5hdGlvbiwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzU2VydmVyU2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c051bWJlciB8fCAwXG4gICAgICA6IGZpbHRlcmVkU29ydGVkUm93c051bWJlci52YWx1ZVxuICApKVxuXG4gIGNvbnN0IGZpcnN0Um93SW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgeyBwYWdlLCByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgcmV0dXJuIChwYWdlIC0gMSkgKiByb3dzUGVyUGFnZVxuICB9KVxuXG4gIGNvbnN0IGxhc3RSb3dJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHBhZ2UsIHJvd3NQZXJQYWdlIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcbiAgICByZXR1cm4gcGFnZSAqIHJvd3NQZXJQYWdlXG4gIH0pXG5cbiAgY29uc3QgaXNGaXJzdFBhZ2UgPSBjb21wdXRlZCgoKSA9PiBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucGFnZSA9PT0gMSlcblxuICBjb25zdCBwYWdlc051bWJlciA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBjb21wdXRlZFBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UgPT09IDBcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLm1heChcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC5jZWlsKGNvbXB1dGVkUm93c051bWJlci52YWx1ZSAvIGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSlcbiAgICAgIClcbiAgKSlcblxuICBjb25zdCBpc0xhc3RQYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGxhc3RSb3dJbmRleC52YWx1ZSA9PT0gMFxuICAgICAgPyB0cnVlXG4gICAgICA6IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZS5wYWdlID49IHBhZ2VzTnVtYmVyLnZhbHVlXG4gICkpXG5cbiAgY29uc3QgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgb3B0cyA9IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9ucy5pbmNsdWRlcyhpbm5lclBhZ2luYXRpb24udmFsdWUucm93c1BlclBhZ2UpXG4gICAgICA/IHByb3BzLnJvd3NQZXJQYWdlT3B0aW9uc1xuICAgICAgOiBbIGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSBdLmNvbmNhdChwcm9wcy5yb3dzUGVyUGFnZU9wdGlvbnMpXG5cbiAgICByZXR1cm4gb3B0cy5tYXAoY291bnQgPT4gKHtcbiAgICAgIGxhYmVsOiBjb3VudCA9PT0gMCA/ICRxLmxhbmcudGFibGUuYWxsUm93cyA6ICcnICsgY291bnQsXG4gICAgICB2YWx1ZTogY291bnRcbiAgICB9KSlcbiAgfSlcblxuICB3YXRjaChwYWdlc051bWJlciwgKGxhc3RQYWdlLCBvbGRMYXN0UGFnZSkgPT4ge1xuICAgIGlmIChsYXN0UGFnZSA9PT0gb2xkTGFzdFBhZ2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLnBhZ2VcbiAgICBpZiAobGFzdFBhZ2UgJiYgIWN1cnJlbnRQYWdlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogMSB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChsYXN0UGFnZSA8IGN1cnJlbnRQYWdlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogbGFzdFBhZ2UgfSlcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gZmlyc3RQYWdlICgpIHtcbiAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogMSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldlBhZ2UgKCkge1xuICAgIGNvbnN0IHsgcGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgaWYgKHBhZ2UgPiAxKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZSAtIDEgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0UGFnZSAoKSB7XG4gICAgY29uc3QgeyBwYWdlLCByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG4gICAgaWYgKGxhc3RSb3dJbmRleC52YWx1ZSA+IDAgJiYgcGFnZSAqIHJvd3NQZXJQYWdlIDwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHsgcGFnZTogcGFnZSArIDEgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsYXN0UGFnZSAoKSB7XG4gICAgc2V0UGFnaW5hdGlvbih7IHBhZ2U6IHBhZ2VzTnVtYmVyLnZhbHVlIH0pXG4gIH1cblxuICBpZiAocHJvcHNbICdvblVwZGF0ZTpwYWdpbmF0aW9uJyBdICE9PSB2b2lkIDApIHtcbiAgICBlbWl0KCd1cGRhdGU6cGFnaW5hdGlvbicsIHsgLi4uY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpcnN0Um93SW5kZXgsXG4gICAgbGFzdFJvd0luZGV4LFxuICAgIGlzRmlyc3RQYWdlLFxuICAgIGlzTGFzdFBhZ2UsXG4gICAgcGFnZXNOdW1iZXIsXG4gICAgY29tcHV0ZWRSb3dzUGVyUGFnZU9wdGlvbnMsXG4gICAgY29tcHV0ZWRSb3dzTnVtYmVyLFxuXG4gICAgZmlyc3RQYWdlLFxuICAgIHByZXZQYWdlLFxuICAgIG5leHRQYWdlLFxuICAgIGxhc3RQYWdlXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVGFibGVSb3dTZWxlY3Rpb25Qcm9wcyA9IHtcbiAgc2VsZWN0aW9uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gWyAnc2luZ2xlJywgJ211bHRpcGxlJywgJ25vbmUnIF0uaW5jbHVkZXModilcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICB0eXBlOiBBcnJheSxcbiAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VUYWJsZVJvd1NlbGVjdGlvbkVtaXRzID0gWyAndXBkYXRlOnNlbGVjdGVkJywgJ3NlbGVjdGlvbicgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVSb3dTZWxlY3Rpb24gKHByb3BzLCBlbWl0LCBjb21wdXRlZFJvd3MsIGdldFJvd0tleSkge1xuICBjb25zdCBzZWxlY3RlZEtleXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHt9XG4gICAgcHJvcHMuc2VsZWN0ZWQubWFwKGdldFJvd0tleS52YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAga2V5c1sga2V5IF0gPSB0cnVlXG4gICAgfSlcbiAgICByZXR1cm4ga2V5c1xuICB9KVxuXG4gIGNvbnN0IGhhc1NlbGVjdGlvbk1vZGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiAhPT0gJ25vbmUnXG4gIH0pXG5cbiAgY29uc3Qgc2luZ2xlU2VsZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBwcm9wcy5zZWxlY3Rpb24gPT09ICdzaW5nbGUnXG4gIH0pXG5cbiAgY29uc3QgbXVsdGlwbGVTZWxlY3Rpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIHByb3BzLnNlbGVjdGlvbiA9PT0gJ211bHRpcGxlJ1xuICB9KVxuXG4gIGNvbnN0IGFsbFJvd3NTZWxlY3RlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgY29tcHV0ZWRSb3dzLnZhbHVlLmxlbmd0aCA+IDAgJiYgY29tcHV0ZWRSb3dzLnZhbHVlLmV2ZXJ5KFxuICAgICAgcm93ID0+IHNlbGVjdGVkS2V5cy52YWx1ZVsgZ2V0Um93S2V5LnZhbHVlKHJvdykgXSA9PT0gdHJ1ZVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IHNvbWVSb3dzU2VsZWN0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgIGFsbFJvd3NTZWxlY3RlZC52YWx1ZSAhPT0gdHJ1ZVxuICAgICYmIGNvbXB1dGVkUm93cy52YWx1ZS5zb21lKHJvdyA9PiBzZWxlY3RlZEtleXMudmFsdWVbIGdldFJvd0tleS52YWx1ZShyb3cpIF0gPT09IHRydWUpXG4gIClcblxuICBjb25zdCByb3dzU2VsZWN0ZWROdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zZWxlY3RlZC5sZW5ndGgpXG5cbiAgZnVuY3Rpb24gaXNSb3dTZWxlY3RlZCAoa2V5KSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkS2V5cy52YWx1ZVsga2V5IF0gPT09IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uICgpIHtcbiAgICBlbWl0KCd1cGRhdGU6c2VsZWN0ZWQnLCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGlvbiAoa2V5cywgcm93cywgYWRkZWQsIGV2dCkge1xuICAgIGVtaXQoJ3NlbGVjdGlvbicsIHsgcm93cywgYWRkZWQsIGtleXMsIGV2dCB9KVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHNpbmdsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAoYWRkZWQgPT09IHRydWUgPyByb3dzIDogW10pXG4gICAgICA6IChcbiAgICAgICAgICBhZGRlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBwcm9wcy5zZWxlY3RlZC5jb25jYXQocm93cylcbiAgICAgICAgICAgIDogcHJvcHMuc2VsZWN0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICByb3cgPT4ga2V5cy5pbmNsdWRlcyhnZXRSb3dLZXkudmFsdWUocm93KSkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgIClcblxuICAgIGVtaXQoJ3VwZGF0ZTpzZWxlY3RlZCcsIHBheWxvYWQpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhc1NlbGVjdGlvbk1vZGUsXG4gICAgc2luZ2xlU2VsZWN0aW9uLFxuICAgIG11bHRpcGxlU2VsZWN0aW9uLFxuICAgIGFsbFJvd3NTZWxlY3RlZCxcbiAgICBzb21lUm93c1NlbGVjdGVkLFxuICAgIHJvd3NTZWxlY3RlZE51bWJlcixcblxuICAgIGlzUm93U2VsZWN0ZWQsXG4gICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgdXBkYXRlU2VsZWN0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmZ1bmN0aW9uIGdldFZhbCAodmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbClcbiAgICA/IHZhbC5zbGljZSgpXG4gICAgOiBbXVxufVxuXG5leHBvcnQgY29uc3QgdXNlVGFibGVSb3dFeHBhbmRQcm9wcyA9IHtcbiAgZXhwYW5kZWQ6IEFycmF5IC8vIHYtbW9kZWw6ZXhwYW5kZWRcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlUm93RXhwYW5kRW1pdHMgPSBbICd1cGRhdGU6ZXhwYW5kZWQnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRhYmxlUm93RXhwYW5kIChwcm9wcywgZW1pdCkge1xuICBjb25zdCBpbm5lckV4cGFuZGVkID0gcmVmKGdldFZhbChwcm9wcy5leHBhbmRlZCkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZXhwYW5kZWQsIHZhbCA9PiB7XG4gICAgaW5uZXJFeHBhbmRlZC52YWx1ZSA9IGdldFZhbCh2YWwpXG4gIH0pXG5cbiAgZnVuY3Rpb24gaXNSb3dFeHBhbmRlZCAoa2V5KSB7XG4gICAgcmV0dXJuIGlubmVyRXhwYW5kZWQudmFsdWUuaW5jbHVkZXMoa2V5KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXhwYW5kZWQgKHZhbCkge1xuICAgIGlmIChwcm9wcy5leHBhbmRlZCAhPT0gdm9pZCAwKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6ZXhwYW5kZWQnLCB2YWwpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5uZXJFeHBhbmRlZC52YWx1ZSA9IHZhbFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUV4cGFuZGVkIChrZXksIGFkZCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGlubmVyRXhwYW5kZWQudmFsdWUuc2xpY2UoKVxuICAgIGNvbnN0IGluZGV4ID0gdGFyZ2V0LmluZGV4T2Yoa2V5KVxuXG4gICAgaWYgKGFkZCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0YXJnZXQucHVzaChrZXkpXG4gICAgICAgIHNldEV4cGFuZGVkKHRhcmdldClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0YXJnZXQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgc2V0RXhwYW5kZWQodGFyZ2V0KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNSb3dFeHBhbmRlZCxcbiAgICBzZXRFeHBhbmRlZCxcbiAgICB1cGRhdGVFeHBhbmRlZFxuICB9XG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy9pcy5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVRhYmxlQ29sdW1uU2VsZWN0aW9uUHJvcHMgPSB7XG4gIHZpc2libGVDb2x1bW5zOiBBcnJheVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVGFibGVDb2x1bW5TZWxlY3Rpb24gKHByb3BzLCBjb21wdXRlZFBhZ2luYXRpb24sIGhhc1NlbGVjdGlvbk1vZGUpIHtcbiAgY29uc3QgY29sTGlzdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuY29sdW1ucyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gcHJvcHMuY29sdW1uc1xuICAgIH1cblxuICAgIC8vIHdlIGluZmVyIGNvbHVtbnMgZnJvbSBmaXJzdCByb3dcbiAgICBjb25zdCByb3cgPSBwcm9wcy5yb3dzWyAwIF1cblxuICAgIHJldHVybiByb3cgIT09IHZvaWQgMFxuICAgICAgPyBPYmplY3Qua2V5cyhyb3cpLm1hcChuYW1lID0+ICh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxhYmVsOiBuYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGZpZWxkOiBuYW1lLFxuICAgICAgICBhbGlnbjogaXNOdW1iZXIocm93WyBuYW1lIF0pID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcbiAgICAgICAgc29ydGFibGU6IHRydWVcbiAgICAgIH0pKVxuICAgICAgOiBbXVxuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkQ29scyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB7IHNvcnRCeSwgZGVzY2VuZGluZyB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICBjb25zdCBjb2xzID0gcHJvcHMudmlzaWJsZUNvbHVtbnMgIT09IHZvaWQgMFxuICAgICAgPyBjb2xMaXN0LnZhbHVlLmZpbHRlcihjb2wgPT4gY29sLnJlcXVpcmVkID09PSB0cnVlIHx8IHByb3BzLnZpc2libGVDb2x1bW5zLmluY2x1ZGVzKGNvbC5uYW1lKSA9PT0gdHJ1ZSlcbiAgICAgIDogY29sTGlzdC52YWx1ZVxuXG4gICAgcmV0dXJuIGNvbHMubWFwKGNvbCA9PiB7XG4gICAgICBjb25zdCBhbGlnbiA9IGNvbC5hbGlnbiB8fCAncmlnaHQnXG4gICAgICBjb25zdCBhbGlnbkNsYXNzID0gYHRleHQtJHsgYWxpZ24gfWBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uY29sLFxuICAgICAgICBhbGlnbixcbiAgICAgICAgX19pY29uQ2xhc3M6IGBxLXRhYmxlX19zb3J0LWljb24gcS10YWJsZV9fc29ydC1pY29uLS0keyBhbGlnbiB9YCxcbiAgICAgICAgX190aENsYXNzOiBhbGlnbkNsYXNzXG4gICAgICAgICAgKyAoY29sLmhlYWRlckNsYXNzZXMgIT09IHZvaWQgMCA/ICcgJyArIGNvbC5oZWFkZXJDbGFzc2VzIDogJycpXG4gICAgICAgICAgKyAoY29sLnNvcnRhYmxlID09PSB0cnVlID8gJyBzb3J0YWJsZScgOiAnJylcbiAgICAgICAgICArIChjb2wubmFtZSA9PT0gc29ydEJ5ID8gYCBzb3J0ZWQgJHsgZGVzY2VuZGluZyA9PT0gdHJ1ZSA/ICdzb3J0LWRlc2MnIDogJycgfWAgOiAnJyksXG5cbiAgICAgICAgX190ZFN0eWxlOiBjb2wuc3R5bGUgIT09IHZvaWQgMFxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICB0eXBlb2YgY29sLnN0eWxlICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyAoKSA9PiBjb2wuc3R5bGVcbiAgICAgICAgICAgICAgICA6IGNvbC5zdHlsZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogKCkgPT4gbnVsbCxcblxuICAgICAgICBfX3RkQ2xhc3M6IGNvbC5jbGFzc2VzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbC5jbGFzc2VzICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyAoKSA9PiBhbGlnbkNsYXNzICsgJyAnICsgY29sLmNsYXNzZXNcbiAgICAgICAgICAgICAgICA6IHJvdyA9PiBhbGlnbkNsYXNzICsgJyAnICsgY29sLmNsYXNzZXMocm93KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogKCkgPT4gYWxpZ25DbGFzc1xuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgY29uc3QgY29tcHV0ZWRDb2xzTWFwID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG5hbWVzID0ge31cbiAgICBjb21wdXRlZENvbHMudmFsdWUuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgbmFtZXNbIGNvbC5uYW1lIF0gPSBjb2xcbiAgICB9KVxuICAgIHJldHVybiBuYW1lc1xuICB9KVxuXG4gIGNvbnN0IGNvbXB1dGVkQ29sc3BhbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gcHJvcHMudGFibGVDb2xzcGFuICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMudGFibGVDb2xzcGFuXG4gICAgICA6IGNvbXB1dGVkQ29scy52YWx1ZS5sZW5ndGggKyAoaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgY29sTGlzdCxcbiAgICBjb21wdXRlZENvbHMsXG4gICAgY29tcHV0ZWRDb2xzTWFwLFxuICAgIGNvbXB1dGVkQ29sc3BhblxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUVRoIGZyb20gJy4vUVRoLmpzJ1xuXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFWaXJ0dWFsU2Nyb2xsIGZyb20gJy4uL3ZpcnR1YWwtc2Nyb2xsL1FWaXJ0dWFsU2Nyb2xsLmpzJ1xuaW1wb3J0IFFTZWxlY3QgZnJvbSAnLi4vc2VsZWN0L1FTZWxlY3QuanMnXG5pbXBvcnQgUUxpbmVhclByb2dyZXNzIGZyb20gJy4uL2xpbmVhci1wcm9ncmVzcy9RTGluZWFyUHJvZ3Jlc3MuanMnXG5pbXBvcnQgUUNoZWNrYm94IGZyb20gJy4uL2NoZWNrYm94L1FDaGVja2JveC5qcydcbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuXG5pbXBvcnQgZ2V0VGFibGVNaWRkbGUgZnJvbSAnLi9nZXQtdGFibGUtbWlkZGxlLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHsgY29tbW9uVmlydFByb3BzTGlzdCB9IGZyb20gJy4uL3ZpcnR1YWwtc2Nyb2xsL3VzZS12aXJ0dWFsLXNjcm9sbC5qcydcbmltcG9ydCB1c2VGdWxsc2NyZWVuLCB7IHVzZUZ1bGxzY3JlZW5Qcm9wcywgdXNlRnVsbHNjcmVlbkVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZnVsbHNjcmVlbi5qcydcblxuaW1wb3J0IHsgdXNlVGFibGVTb3J0LCB1c2VUYWJsZVNvcnRQcm9wcyB9IGZyb20gJy4vdGFibGUtc29ydC5qcydcbmltcG9ydCB7IHVzZVRhYmxlRmlsdGVyLCB1c2VUYWJsZUZpbHRlclByb3BzIH0gZnJvbSAnLi90YWJsZS1maWx0ZXIuanMnXG5pbXBvcnQgeyB1c2VUYWJsZVBhZ2luYXRpb25TdGF0ZSwgdXNlVGFibGVQYWdpbmF0aW9uLCB1c2VUYWJsZVBhZ2luYXRpb25Qcm9wcyB9IGZyb20gJy4vdGFibGUtcGFnaW5hdGlvbi5qcydcbmltcG9ydCB7IHVzZVRhYmxlUm93U2VsZWN0aW9uLCB1c2VUYWJsZVJvd1NlbGVjdGlvblByb3BzLCB1c2VUYWJsZVJvd1NlbGVjdGlvbkVtaXRzIH0gZnJvbSAnLi90YWJsZS1yb3ctc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgdXNlVGFibGVSb3dFeHBhbmQsIHVzZVRhYmxlUm93RXhwYW5kUHJvcHMsIHVzZVRhYmxlUm93RXhwYW5kRW1pdHMgfSBmcm9tICcuL3RhYmxlLXJvdy1leHBhbmQuanMnXG5pbXBvcnQgeyB1c2VUYWJsZUNvbHVtblNlbGVjdGlvbiwgdXNlVGFibGVDb2x1bW5TZWxlY3Rpb25Qcm9wcyB9IGZyb20gJy4vdGFibGUtY29sdW1uLXNlbGVjdGlvbi5qcydcblxuaW1wb3J0IHsgaW5qZWN0UHJvcCwgaW5qZWN0TXVsdGlwbGVQcm9wcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IGJvdHRvbUNsYXNzID0gJ3EtdGFibGVfX2JvdHRvbSByb3cgaXRlbXMtY2VudGVyJ1xuXG5jb25zdCBjb21tb25WaXJ0UHJvcHNPYmogPSB7fVxuY29tbW9uVmlydFByb3BzTGlzdC5mb3JFYWNoKHAgPT4geyBjb21tb25WaXJ0UHJvcHNPYmpbIHAgXSA9IHt9IH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFibGUnLFxuXG4gIHByb3BzOiB7XG4gICAgcm93czoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG4gICAgcm93S2V5OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgRnVuY3Rpb24gXSxcbiAgICAgIGRlZmF1bHQ6ICdpZCdcbiAgICB9LFxuXG4gICAgY29sdW1uczogQXJyYXksXG4gICAgbG9hZGluZzogQm9vbGVhbixcblxuICAgIGljb25GaXJzdFBhZ2U6IFN0cmluZyxcbiAgICBpY29uUHJldlBhZ2U6IFN0cmluZyxcbiAgICBpY29uTmV4dFBhZ2U6IFN0cmluZyxcbiAgICBpY29uTGFzdFBhZ2U6IFN0cmluZyxcblxuICAgIHRpdGxlOiBTdHJpbmcsXG5cbiAgICBoaWRlSGVhZGVyOiBCb29sZWFuLFxuXG4gICAgZ3JpZDogQm9vbGVhbixcbiAgICBncmlkSGVhZGVyOiBCb29sZWFuLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgc2VwYXJhdG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaG9yaXpvbnRhbCcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcsICdjZWxsJywgJ25vbmUnIF0uaW5jbHVkZXModilcbiAgICB9LFxuICAgIHdyYXBDZWxsczogQm9vbGVhbixcblxuICAgIHZpcnR1YWxTY3JvbGw6IEJvb2xlYW4sXG4gICAgdmlydHVhbFNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfSxcbiAgICAuLi5jb21tb25WaXJ0UHJvcHNPYmosXG5cbiAgICBub0RhdGFMYWJlbDogU3RyaW5nLFxuICAgIG5vUmVzdWx0c0xhYmVsOiBTdHJpbmcsXG4gICAgbG9hZGluZ0xhYmVsOiBTdHJpbmcsXG4gICAgc2VsZWN0ZWRSb3dzTGFiZWw6IEZ1bmN0aW9uLFxuICAgIHJvd3NQZXJQYWdlTGFiZWw6IFN0cmluZyxcbiAgICBwYWdpbmF0aW9uTGFiZWw6IEZ1bmN0aW9uLFxuXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdncmV5LTgnXG4gICAgfSxcblxuICAgIHRpdGxlQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICB0YWJsZUNsYXNzOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIHRhYmxlSGVhZGVyU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgdGFibGVIZWFkZXJDbGFzczogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkQ29udGFpbmVyQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgY2FyZENvbnRhaW5lclN0eWxlOiBbIFN0cmluZywgQXJyYXksIE9iamVjdCBdLFxuICAgIGNhcmRTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBjYXJkQ2xhc3M6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG5cbiAgICBoaWRlQm90dG9tOiBCb29sZWFuLFxuICAgIGhpZGVTZWxlY3RlZEJhbm5lcjogQm9vbGVhbixcbiAgICBoaWRlTm9EYXRhOiBCb29sZWFuLFxuICAgIGhpZGVQYWdpbmF0aW9uOiBCb29sZWFuLFxuXG4gICAgb25Sb3dDbGljazogRnVuY3Rpb24sXG4gICAgb25Sb3dEYmxjbGljazogRnVuY3Rpb24sXG4gICAgb25Sb3dDb250ZXh0bWVudTogRnVuY3Rpb24sXG5cbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlRnVsbHNjcmVlblByb3BzLFxuXG4gICAgLi4udXNlVGFibGVDb2x1bW5TZWxlY3Rpb25Qcm9wcyxcbiAgICAuLi51c2VUYWJsZUZpbHRlclByb3BzLFxuICAgIC4uLnVzZVRhYmxlUGFnaW5hdGlvblByb3BzLFxuICAgIC4uLnVzZVRhYmxlUm93RXhwYW5kUHJvcHMsXG4gICAgLi4udXNlVGFibGVSb3dTZWxlY3Rpb25Qcm9wcyxcbiAgICAuLi51c2VUYWJsZVNvcnRQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgJ3JlcXVlc3QnLCAndmlydHVhbFNjcm9sbCcsXG4gICAgLi4udXNlRnVsbHNjcmVlbkVtaXRzLFxuICAgIC4uLnVzZVRhYmxlUm93RXhwYW5kRW1pdHMsXG4gICAgLi4udXNlVGFibGVSb3dTZWxlY3Rpb25FbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgaW5GdWxsc2NyZWVuLCB0b2dnbGVGdWxsc2NyZWVuIH0gPSB1c2VGdWxsc2NyZWVuKClcblxuICAgIGNvbnN0IGdldFJvd0tleSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHR5cGVvZiBwcm9wcy5yb3dLZXkgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBwcm9wcy5yb3dLZXlcbiAgICAgICAgOiByb3cgPT4gcm93WyBwcm9wcy5yb3dLZXkgXVxuICAgICkpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgdmlydFNjcm9sbFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGhhc1ZpcnRTY3JvbGwgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5ncmlkICE9PSB0cnVlICYmIHByb3BzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpXG5cbiAgICBjb25zdCBjYXJkRGVmYXVsdENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICcgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtdGFibGUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtdGFibGUtLWZsYXQnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgX19jb250YWluZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10YWJsZV9fY29udGFpbmVyIHEtdGFibGUtLSR7IHByb3BzLnNlcGFyYXRvciB9LXNlcGFyYXRvciBjb2x1bW4gbm8td3JhcGBcbiAgICAgICsgKHByb3BzLmdyaWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWdyaWQnIDogY2FyZERlZmF1bHRDbGFzcy52YWx1ZSlcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXRhYmxlLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLndyYXBDZWxscyA9PT0gZmFsc2UgPyAnIHEtdGFibGUtLW5vLXdyYXAnIDogJycpXG4gICAgICArIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUgPyAnIGZ1bGxzY3JlZW4gc2Nyb2xsJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIF9fY29udGFpbmVyQ2xhc3MudmFsdWUgKyAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tbG9hZGluZycgOiAnJylcbiAgICApXG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IHByb3BzLnRhYmxlU3R5bGUgKyBwcm9wcy50YWJsZUNsYXNzICsgcHJvcHMudGFibGVIZWFkZXJTdHlsZSArIHByb3BzLnRhYmxlSGVhZGVyQ2xhc3MgKyBfX2NvbnRhaW5lckNsYXNzLnZhbHVlLFxuICAgICAgKCkgPT4geyBoYXNWaXJ0U2Nyb2xsLnZhbHVlID09PSB0cnVlICYmIHZpcnRTY3JvbGxSZWYudmFsdWUgIT09IG51bGwgJiYgdmlydFNjcm9sbFJlZi52YWx1ZS5yZXNldCgpIH1cbiAgICApXG5cbiAgICBjb25zdCB7XG4gICAgICBpbm5lclBhZ2luYXRpb24sXG4gICAgICBjb21wdXRlZFBhZ2luYXRpb24sXG4gICAgICBpc1NlcnZlclNpZGUsXG5cbiAgICAgIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbixcbiAgICAgIHNldFBhZ2luYXRpb25cbiAgICB9ID0gdXNlVGFibGVQYWdpbmF0aW9uU3RhdGUodm0sIGdldENlbGxWYWx1ZSlcblxuICAgIGNvbnN0IHsgY29tcHV0ZWRGaWx0ZXJNZXRob2QgfSA9IHVzZVRhYmxlRmlsdGVyKHByb3BzLCBzZXRQYWdpbmF0aW9uKVxuICAgIGNvbnN0IHsgaXNSb3dFeHBhbmRlZCwgc2V0RXhwYW5kZWQsIHVwZGF0ZUV4cGFuZGVkIH0gPSB1c2VUYWJsZVJvd0V4cGFuZChwcm9wcywgZW1pdClcblxuICAgIGNvbnN0IGZpbHRlcmVkU29ydGVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCByb3dzID0gcHJvcHMucm93c1xuXG4gICAgICBpZiAoaXNTZXJ2ZXJTaWRlLnZhbHVlID09PSB0cnVlIHx8IHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiByb3dzXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSBjb21wdXRlZFBhZ2luYXRpb24udmFsdWVcblxuICAgICAgaWYgKHByb3BzLmZpbHRlcikge1xuICAgICAgICByb3dzID0gY29tcHV0ZWRGaWx0ZXJNZXRob2QudmFsdWUocm93cywgcHJvcHMuZmlsdGVyLCBjb21wdXRlZENvbHMudmFsdWUsIGdldENlbGxWYWx1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtblRvU29ydC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICByb3dzID0gY29tcHV0ZWRTb3J0TWV0aG9kLnZhbHVlKFxuICAgICAgICAgIHByb3BzLnJvd3MgPT09IHJvd3MgPyByb3dzLnNsaWNlKCkgOiByb3dzLFxuICAgICAgICAgIHNvcnRCeSxcbiAgICAgICAgICBkZXNjZW5kaW5nXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvd3NcbiAgICB9KVxuXG4gICAgY29uc3QgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gZmlsdGVyZWRTb3J0ZWRSb3dzLnZhbHVlLmxlbmd0aClcblxuICAgIGNvbnN0IGNvbXB1dGVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCByb3dzID0gZmlsdGVyZWRTb3J0ZWRSb3dzLnZhbHVlXG5cbiAgICAgIGlmIChpc1NlcnZlclNpZGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyByb3dzUGVyUGFnZSB9ID0gY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlXG5cbiAgICAgIGlmIChyb3dzUGVyUGFnZSAhPT0gMCkge1xuICAgICAgICBpZiAoZmlyc3RSb3dJbmRleC52YWx1ZSA9PT0gMCAmJiBwcm9wcy5yb3dzICE9PSByb3dzKSB7XG4gICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gbGFzdFJvd0luZGV4LnZhbHVlKSB7XG4gICAgICAgICAgICByb3dzID0gcm93cy5zbGljZSgwLCBsYXN0Um93SW5kZXgudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJvd3MgPSByb3dzLnNsaWNlKGZpcnN0Um93SW5kZXgudmFsdWUsIGxhc3RSb3dJbmRleC52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm93c1xuICAgIH0pXG5cbiAgICBjb25zdCB7XG4gICAgICBoYXNTZWxlY3Rpb25Nb2RlLFxuICAgICAgc2luZ2xlU2VsZWN0aW9uLFxuICAgICAgbXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQsXG4gICAgICBzb21lUm93c1NlbGVjdGVkLFxuICAgICAgcm93c1NlbGVjdGVkTnVtYmVyLFxuXG4gICAgICBpc1Jvd1NlbGVjdGVkLFxuICAgICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgICB1cGRhdGVTZWxlY3Rpb25cbiAgICB9ID0gdXNlVGFibGVSb3dTZWxlY3Rpb24ocHJvcHMsIGVtaXQsIGNvbXB1dGVkUm93cywgZ2V0Um93S2V5KVxuXG4gICAgY29uc3QgeyBjb2xMaXN0LCBjb21wdXRlZENvbHMsIGNvbXB1dGVkQ29sc01hcCwgY29tcHV0ZWRDb2xzcGFuIH0gPSB1c2VUYWJsZUNvbHVtblNlbGVjdGlvbihwcm9wcywgY29tcHV0ZWRQYWdpbmF0aW9uLCBoYXNTZWxlY3Rpb25Nb2RlKVxuXG4gICAgY29uc3QgeyBjb2x1bW5Ub1NvcnQsIGNvbXB1dGVkU29ydE1ldGhvZCwgc29ydCB9ID0gdXNlVGFibGVTb3J0KHByb3BzLCBjb21wdXRlZFBhZ2luYXRpb24sIGNvbExpc3QsIHNldFBhZ2luYXRpb24pXG5cbiAgICBjb25zdCB7XG4gICAgICBmaXJzdFJvd0luZGV4LFxuICAgICAgbGFzdFJvd0luZGV4LFxuICAgICAgaXNGaXJzdFBhZ2UsXG4gICAgICBpc0xhc3RQYWdlLFxuICAgICAgcGFnZXNOdW1iZXIsXG4gICAgICBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucyxcbiAgICAgIGNvbXB1dGVkUm93c051bWJlcixcblxuICAgICAgZmlyc3RQYWdlLFxuICAgICAgcHJldlBhZ2UsXG4gICAgICBuZXh0UGFnZSxcbiAgICAgIGxhc3RQYWdlXG4gICAgfSA9IHVzZVRhYmxlUGFnaW5hdGlvbih2bSwgaW5uZXJQYWdpbmF0aW9uLCBjb21wdXRlZFBhZ2luYXRpb24sIGlzU2VydmVyU2lkZSwgc2V0UGFnaW5hdGlvbiwgZmlsdGVyZWRTb3J0ZWRSb3dzTnVtYmVyKVxuXG4gICAgY29uc3Qgbm90aGluZ1RvRGlzcGxheSA9IGNvbXB1dGVkKCgpID0+IGNvbXB1dGVkUm93cy52YWx1ZS5sZW5ndGggPT09IDApXG5cbiAgICBjb25zdCB2aXJ0UHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgICBjb21tb25WaXJ0UHJvcHNMaXN0XG4gICAgICAgIC5mb3JFYWNoKHAgPT4geyBhY2NbIHAgXSA9IHByb3BzWyBwIF0gfSlcblxuICAgICAgaWYgKGFjYy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUgPT09IHZvaWQgMCkge1xuICAgICAgICBhY2MudmlydHVhbFNjcm9sbEl0ZW1TaXplID0gcHJvcHMuZGVuc2UgPT09IHRydWUgPyAyOCA6IDQ4XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gcmVzZXRWaXJ0dWFsU2Nyb2xsICgpIHtcbiAgICAgIGhhc1ZpcnRTY3JvbGwudmFsdWUgPT09IHRydWUgJiYgdmlydFNjcm9sbFJlZi52YWx1ZS5yZXNldCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keSAoKSB7XG4gICAgICBpZiAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0R3JpZEJvZHkoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoZWFkZXIgPSBwcm9wcy5oaWRlSGVhZGVyICE9PSB0cnVlID8gZ2V0VEhlYWQgOiBudWxsXG5cbiAgICAgIGlmIChoYXNWaXJ0U2Nyb2xsLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRvcFJvdyA9IHNsb3RzWyAndG9wLXJvdycgXVxuICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBzbG90c1sgJ2JvdHRvbS1yb3cnIF1cblxuICAgICAgICBjb25zdCB2aXJ0U2xvdHMgPSB7XG4gICAgICAgICAgZGVmYXVsdDogcHJvcHMgPT4gZ2V0VEJvZHlUUihwcm9wcy5pdGVtLCBzbG90cy5ib2R5LCBwcm9wcy5pbmRleClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3BSb3cgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnN0IHRvcENvbnRlbnQgPSBoKCd0Ym9keScsIHRvcFJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KSlcblxuICAgICAgICAgIHZpcnRTbG90cy5iZWZvcmUgPSBoZWFkZXIgPT09IG51bGxcbiAgICAgICAgICAgID8gKCkgPT4gdG9wQ29udGVudFxuICAgICAgICAgICAgOiAoKSA9PiBbIGhlYWRlcigpIF0uY29uY2F0KHRvcENvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGVhZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgdmlydFNsb3RzLmJlZm9yZSA9IGhlYWRlclxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdHRvbVJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgdmlydFNsb3RzLmFmdGVyID0gKCkgPT4gaCgndGJvZHknLCBib3R0b21Sb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaChRVmlydHVhbFNjcm9sbCwge1xuICAgICAgICAgIHJlZjogdmlydFNjcm9sbFJlZixcbiAgICAgICAgICBjbGFzczogcHJvcHMudGFibGVDbGFzcyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMudGFibGVTdHlsZSxcbiAgICAgICAgICAuLi52aXJ0UHJvcHMudmFsdWUsXG4gICAgICAgICAgc2Nyb2xsVGFyZ2V0OiBwcm9wcy52aXJ0dWFsU2Nyb2xsVGFyZ2V0LFxuICAgICAgICAgIGl0ZW1zOiBjb21wdXRlZFJvd3MudmFsdWUsXG4gICAgICAgICAgdHlwZTogJ19fcXRhYmxlJyxcbiAgICAgICAgICB0YWJsZUNvbHNwYW46IGNvbXB1dGVkQ29sc3Bhbi52YWx1ZSxcbiAgICAgICAgICBvblZpcnR1YWxTY3JvbGw6IG9uVlNjcm9sbFxuICAgICAgICB9LCB2aXJ0U2xvdHMpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBnZXRUQm9keSgpXG4gICAgICBdXG5cbiAgICAgIGlmIChoZWFkZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2hpbGQudW5zaGlmdChoZWFkZXIoKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldFRhYmxlTWlkZGxlKHtcbiAgICAgICAgY2xhc3M6IFsgJ3EtdGFibGVfX21pZGRsZSBzY3JvbGwnLCBwcm9wcy50YWJsZUNsYXNzIF0sXG4gICAgICAgIHN0eWxlOiBwcm9wcy50YWJsZVN0eWxlXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUbyAodG9JbmRleCwgZWRnZSkge1xuICAgICAgaWYgKHZpcnRTY3JvbGxSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdmlydFNjcm9sbFJlZi52YWx1ZS5zY3JvbGxUbyh0b0luZGV4LCBlZGdlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdG9JbmRleCA9IHBhcnNlSW50KHRvSW5kZXgsIDEwKVxuICAgICAgY29uc3Qgcm93RWwgPSByb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoYHRib2R5IHRyOm50aC1vZi10eXBlKCR7IHRvSW5kZXggKyAxIH0pYClcblxuICAgICAgaWYgKHJvd0VsICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignLnEtdGFibGVfX21pZGRsZS5zY3JvbGwnKVxuICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSByb3dFbC5vZmZzZXRUb3AgLSBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG9mZnNldFRvcCA8IHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPyAnZGVjcmVhc2UnIDogJ2luY3JlYXNlJ1xuXG4gICAgICAgIHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPSBvZmZzZXRUb3BcblxuICAgICAgICBlbWl0KCd2aXJ0dWFsU2Nyb2xsJywge1xuICAgICAgICAgIGluZGV4OiB0b0luZGV4LFxuICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgdG86IGlubmVyUGFnaW5hdGlvbi52YWx1ZS5yb3dzUGVyUGFnZSAtIDEsXG4gICAgICAgICAgZGlyZWN0aW9uXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25WU2Nyb2xsIChpbmZvKSB7XG4gICAgICBlbWl0KCd2aXJ0dWFsU2Nyb2xsJywgaW5mbylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9ncmVzcyAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKFFMaW5lYXJQcm9ncmVzcywge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJsZV9fbGluZWFyLXByb2dyZXNzJyxcbiAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICAgICAgdHJhY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRCb2R5VFIgKHJvdywgYm9keVNsb3QsIHBhZ2VJbmRleCkge1xuICAgICAgY29uc3RcbiAgICAgICAga2V5ID0gZ2V0Um93S2V5LnZhbHVlKHJvdyksXG4gICAgICAgIHNlbGVjdGVkID0gaXNSb3dTZWxlY3RlZChrZXkpXG5cbiAgICAgIGlmIChib2R5U2xvdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBib2R5U2xvdChcbiAgICAgICAgICBnZXRCb2R5U2NvcGUoe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgcGFnZUluZGV4LFxuICAgICAgICAgICAgX190ckNsYXNzOiBzZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgYm9keUNlbGwgPSBzbG90c1sgJ2JvZHktY2VsbCcgXSxcbiAgICAgICAgY2hpbGQgPSBjb21wdXRlZENvbHMudmFsdWUubWFwKGNvbCA9PiB7XG4gICAgICAgICAgY29uc3RcbiAgICAgICAgICAgIGJvZHlDZWxsQ29sID0gc2xvdHNbIGBib2R5LWNlbGwtJHsgY29sLm5hbWUgfWAgXSxcbiAgICAgICAgICAgIHNsb3QgPSBib2R5Q2VsbENvbCAhPT0gdm9pZCAwID8gYm9keUNlbGxDb2wgOiBib2R5Q2VsbFxuXG4gICAgICAgICAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90KGdldEJvZHlDZWxsU2NvcGUoeyBrZXksIHJvdywgcGFnZUluZGV4LCBjb2wgfSkpXG4gICAgICAgICAgICA6IGgoJ3RkJywge1xuICAgICAgICAgICAgICBjbGFzczogY29sLl9fdGRDbGFzcyhyb3cpLFxuICAgICAgICAgICAgICBzdHlsZTogY29sLl9fdGRTdHlsZShyb3cpXG4gICAgICAgICAgICB9LCBnZXRDZWxsVmFsdWUoY29sLCByb3cpKVxuICAgICAgICB9KVxuXG4gICAgICBpZiAoaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdib2R5LXNlbGVjdGlvbicgXVxuICAgICAgICBjb25zdCBjb250ZW50ID0gc2xvdCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90KGdldEJvZHlTZWxlY3Rpb25TY29wZSh7IGtleSwgcm93LCBwYWdlSW5kZXggfSkpXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiAoYWRkaW5nLCBldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIGtleSBdLCBbIHJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0ZCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0geyBrZXksIGNsYXNzOiB7IHNlbGVjdGVkIH0gfVxuXG4gICAgICBpZiAocHJvcHMub25Sb3dDbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuY2xhc3NbICdjdXJzb3ItcG9pbnRlcicgXSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gZXZ0ID0+IHtcbiAgICAgICAgICBlbWl0KCdSb3dDbGljaycsIGV2dCwgcm93LCBwYWdlSW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uUm93RGJsY2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICBkYXRhLmNsYXNzWyAnY3Vyc29yLXBvaW50ZXInIF0gPSB0cnVlXG4gICAgICAgIGRhdGEub25EYmxjbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgZW1pdCgnUm93RGJsY2xpY2snLCBldnQsIHJvdywgcGFnZUluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vblJvd0NvbnRleHRtZW51ICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzc1sgJ2N1cnNvci1wb2ludGVyJyBdID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ29udGV4dG1lbnUgPSBldnQgPT4ge1xuICAgICAgICAgIGVtaXQoJ1Jvd0NvbnRleHRtZW51JywgZXZ0LCByb3csIHBhZ2VJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgndHInLCBkYXRhLCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUQm9keSAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICBib2R5ID0gc2xvdHMuYm9keSxcbiAgICAgICAgdG9wUm93ID0gc2xvdHNbICd0b3Atcm93JyBdLFxuICAgICAgICBib3R0b21Sb3cgPSBzbG90c1sgJ2JvdHRvbS1yb3cnIF1cblxuICAgICAgbGV0IGNoaWxkID0gY29tcHV0ZWRSb3dzLnZhbHVlLm1hcChcbiAgICAgICAgKHJvdywgcGFnZUluZGV4KSA9PiBnZXRUQm9keVRSKHJvdywgYm9keSwgcGFnZUluZGV4KVxuICAgICAgKVxuXG4gICAgICBpZiAodG9wUm93ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSB0b3BSb3coeyBjb2xzOiBjb21wdXRlZENvbHMudmFsdWUgfSkuY29uY2F0KGNoaWxkKVxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbVJvdyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGQuY29uY2F0KGJvdHRvbVJvdyh7IGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSB9KSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3Rib2R5JywgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keVNjb3BlIChkYXRhKSB7XG4gICAgICBpbmplY3RCb2R5Q29tbW9uU2NvcGUoZGF0YSlcblxuICAgICAgZGF0YS5jb2xzID0gZGF0YS5jb2xzLm1hcChcbiAgICAgICAgY29sID0+IGluamVjdFByb3AoeyAuLi5jb2wgfSwgJ3ZhbHVlJywgKCkgPT4gZ2V0Q2VsbFZhbHVlKGNvbCwgZGF0YS5yb3cpKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHlDZWxsU2NvcGUgKGRhdGEpIHtcbiAgICAgIGluamVjdEJvZHlDb21tb25TY29wZShkYXRhKVxuICAgICAgaW5qZWN0UHJvcChkYXRhLCAndmFsdWUnLCAoKSA9PiBnZXRDZWxsVmFsdWUoZGF0YS5jb2wsIGRhdGEucm93KSlcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keVNlbGVjdGlvblNjb3BlIChkYXRhKSB7XG4gICAgICBpbmplY3RCb2R5Q29tbW9uU2NvcGUoZGF0YSlcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5qZWN0Qm9keUNvbW1vblNjb3BlIChkYXRhKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgY29sczogY29tcHV0ZWRDb2xzLnZhbHVlLFxuICAgICAgICBjb2xzTWFwOiBjb21wdXRlZENvbHNNYXAudmFsdWUsXG4gICAgICAgIHNvcnQsXG4gICAgICAgIHJvd0luZGV4OiBmaXJzdFJvd0luZGV4LnZhbHVlICsgZGF0YS5wYWdlSW5kZXgsXG4gICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2VcbiAgICAgIH0pXG5cbiAgICAgIGhhc1NlbGVjdGlvbk1vZGUudmFsdWUgPT09IHRydWUgJiYgaW5qZWN0UHJvcChcbiAgICAgICAgZGF0YSxcbiAgICAgICAgJ3NlbGVjdGVkJyxcbiAgICAgICAgKCkgPT4gaXNSb3dTZWxlY3RlZChkYXRhLmtleSksXG4gICAgICAgIChhZGRpbmcsIGV2dCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIGRhdGEua2V5IF0sIFsgZGF0YS5yb3cgXSwgYWRkaW5nLCBldnQpXG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgaW5qZWN0UHJvcChcbiAgICAgICAgZGF0YSxcbiAgICAgICAgJ2V4cGFuZCcsXG4gICAgICAgICgpID0+IGlzUm93RXhwYW5kZWQoZGF0YS5rZXkpLFxuICAgICAgICBhZGRpbmcgPT4geyB1cGRhdGVFeHBhbmRlZChkYXRhLmtleSwgYWRkaW5nKSB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q2VsbFZhbHVlIChjb2wsIHJvdykge1xuICAgICAgY29uc3QgdmFsID0gdHlwZW9mIGNvbC5maWVsZCA9PT0gJ2Z1bmN0aW9uJyA/IGNvbC5maWVsZChyb3cpIDogcm93WyBjb2wuZmllbGQgXVxuICAgICAgcmV0dXJuIGNvbC5mb3JtYXQgIT09IHZvaWQgMCA/IGNvbC5mb3JtYXQodmFsLCByb3cpIDogdmFsXG4gICAgfVxuXG4gICAgY29uc3QgbWFyZ2luYWxzU2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgcGFnaW5hdGlvbjogY29tcHV0ZWRQYWdpbmF0aW9uLnZhbHVlLFxuICAgICAgcGFnZXNOdW1iZXI6IHBhZ2VzTnVtYmVyLnZhbHVlLFxuICAgICAgaXNGaXJzdFBhZ2U6IGlzRmlyc3RQYWdlLnZhbHVlLFxuICAgICAgaXNMYXN0UGFnZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgIGZpcnN0UGFnZSxcbiAgICAgIHByZXZQYWdlLFxuICAgICAgbmV4dFBhZ2UsXG4gICAgICBsYXN0UGFnZSxcblxuICAgICAgaW5GdWxsc2NyZWVuOiBpbkZ1bGxzY3JlZW4udmFsdWUsXG4gICAgICB0b2dnbGVGdWxsc2NyZWVuXG4gICAgfSkpXG5cbiAgICBmdW5jdGlvbiBnZXRUb3BEaXYgKCkge1xuICAgICAgY29uc3RcbiAgICAgICAgdG9wID0gc2xvdHMudG9wLFxuICAgICAgICB0b3BMZWZ0ID0gc2xvdHNbICd0b3AtbGVmdCcgXSxcbiAgICAgICAgdG9wUmlnaHQgPSBzbG90c1sgJ3RvcC1yaWdodCcgXSxcbiAgICAgICAgdG9wU2VsZWN0aW9uID0gc2xvdHNbICd0b3Atc2VsZWN0aW9uJyBdLFxuICAgICAgICBoYXNTZWxlY3Rpb24gPSBoYXNTZWxlY3Rpb25Nb2RlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgdG9wU2VsZWN0aW9uICE9PSB2b2lkIDBcbiAgICAgICAgICAmJiByb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUgPiAwLFxuICAgICAgICB0b3BDbGFzcyA9ICdxLXRhYmxlX190b3AgcmVsYXRpdmUtcG9zaXRpb24gcm93IGl0ZW1zLWNlbnRlcidcblxuICAgICAgaWYgKHRvcCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiB0b3BDbGFzcyB9LCBbIHRvcChtYXJnaW5hbHNTY29wZS52YWx1ZSkgXSlcbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkXG5cbiAgICAgIGlmIChoYXNTZWxlY3Rpb24gPT09IHRydWUpIHtcbiAgICAgICAgY2hpbGQgPSB0b3BTZWxlY3Rpb24obWFyZ2luYWxzU2NvcGUudmFsdWUpLnNsaWNlKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IFtdXG5cbiAgICAgICAgaWYgKHRvcExlZnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZS1jb250cm9sJyB9LCBbXG4gICAgICAgICAgICAgIHRvcExlZnQobWFyZ2luYWxzU2NvcGUudmFsdWUpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy50aXRsZSkge1xuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fY29udHJvbCcgfSwgW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IFsgJ3EtdGFibGVfX3RpdGxlJywgcHJvcHMudGl0bGVDbGFzcyBdXG4gICAgICAgICAgICAgIH0sIHByb3BzLnRpdGxlKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvcFJpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fc2VwYXJhdG9yIGNvbCcgfSlcbiAgICAgICAgKVxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBbXG4gICAgICAgICAgICB0b3BSaWdodChtYXJnaW5hbHNTY29wZS52YWx1ZSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiB0b3BDbGFzcyB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJTZWxlY3RlZFZhbHVlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc29tZVJvd3NTZWxlY3RlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiBhbGxSb3dzU2VsZWN0ZWQudmFsdWVcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gZ2V0VEhlYWQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBnZXRUSGVhZFRSKClcblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgndHInLCB7IGNsYXNzOiAncS10YWJsZV9fcHJvZ3Jlc3MnIH0sIFtcbiAgICAgICAgICAgIGgoJ3RoJywge1xuICAgICAgICAgICAgICBjbGFzczogJ3JlbGF0aXZlLXBvc2l0aW9uJyxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29tcHV0ZWRDb2xzcGFuLnZhbHVlXG4gICAgICAgICAgICB9LCBnZXRQcm9ncmVzcygpKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ3RoZWFkJywgY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VEhlYWRUUiAoKSB7XG4gICAgICBjb25zdFxuICAgICAgICBoZWFkZXIgPSBzbG90cy5oZWFkZXIsXG4gICAgICAgIGhlYWRlckNlbGwgPSBzbG90c1sgJ2hlYWRlci1jZWxsJyBdXG5cbiAgICAgIGlmIChoZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaGVhZGVyKFxuICAgICAgICAgIGdldEhlYWRlclNjb3BlKHsgaGVhZGVyOiB0cnVlIH0pXG4gICAgICAgICkuc2xpY2UoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IGNvbXB1dGVkQ29scy52YWx1ZS5tYXAoY29sID0+IHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBoZWFkZXJDZWxsQ29sID0gc2xvdHNbIGBoZWFkZXItY2VsbC0keyBjb2wubmFtZSB9YCBdLFxuICAgICAgICAgIHNsb3QgPSBoZWFkZXJDZWxsQ29sICE9PSB2b2lkIDAgPyBoZWFkZXJDZWxsQ29sIDogaGVhZGVyQ2VsbCxcbiAgICAgICAgICBwcm9wcyA9IGdldEhlYWRlclNjb3BlKHsgY29sIH0pXG5cbiAgICAgICAgcmV0dXJuIHNsb3QgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdChwcm9wcylcbiAgICAgICAgICA6IGgoUVRoLCB7XG4gICAgICAgICAgICBrZXk6IGNvbC5uYW1lLFxuICAgICAgICAgICAgcHJvcHNcbiAgICAgICAgICB9LCAoKSA9PiBjb2wubGFiZWwpXG4gICAgICB9KVxuXG4gICAgICBpZiAoc2luZ2xlU2VsZWN0aW9uLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmdyaWQgIT09IHRydWUpIHtcbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0aCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgJyAnKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtdWx0aXBsZVNlbGVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNbICdoZWFkZXItc2VsZWN0aW9uJyBdXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3QoZ2V0SGVhZGVyU2NvcGUoe30pKVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFDaGVja2JveCwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICBtb2RlbFZhbHVlOiBoZWFkZXJTZWxlY3RlZFZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBvbk11bHRpcGxlU2VsZWN0aW9uU2V0XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCd0aCcsIHsgY2xhc3M6ICdxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCd0cicsIHtcbiAgICAgICAgICBjbGFzczogcHJvcHMudGFibGVIZWFkZXJDbGFzcyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMudGFibGVIZWFkZXJTdHlsZVxuICAgICAgICB9LCBjaGlsZClcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJTY29wZSAoZGF0YSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgIGNvbHM6IGNvbXB1dGVkQ29scy52YWx1ZSxcbiAgICAgICAgc29ydCxcbiAgICAgICAgY29sc01hcDogY29tcHV0ZWRDb2xzTWFwLnZhbHVlLFxuICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlXG4gICAgICB9KVxuXG4gICAgICBpZiAobXVsdGlwbGVTZWxlY3Rpb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaW5qZWN0UHJvcChcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgICdzZWxlY3RlZCcsXG4gICAgICAgICAgKCkgPT4gaGVhZGVyU2VsZWN0ZWRWYWx1ZS52YWx1ZSxcbiAgICAgICAgICBvbk11bHRpcGxlU2VsZWN0aW9uU2V0XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk11bHRpcGxlU2VsZWN0aW9uU2V0ICh2YWwpIHtcbiAgICAgIGlmIChzb21lUm93c1NlbGVjdGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHZhbCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZVNlbGVjdGlvbihcbiAgICAgICAgY29tcHV0ZWRSb3dzLnZhbHVlLm1hcChnZXRSb3dLZXkudmFsdWUpLFxuICAgICAgICBjb21wdXRlZFJvd3MudmFsdWUsXG4gICAgICAgIHZhbFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG5hdkljb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBpY28gPSBbXG4gICAgICAgIHByb3BzLmljb25GaXJzdFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5maXJzdFBhZ2UsXG4gICAgICAgIHByb3BzLmljb25QcmV2UGFnZSB8fCAkcS5pY29uU2V0LnRhYmxlLnByZXZQYWdlLFxuICAgICAgICBwcm9wcy5pY29uTmV4dFBhZ2UgfHwgJHEuaWNvblNldC50YWJsZS5uZXh0UGFnZSxcbiAgICAgICAgcHJvcHMuaWNvbkxhc3RQYWdlIHx8ICRxLmljb25TZXQudGFibGUubGFzdFBhZ2VcbiAgICAgIF1cbiAgICAgIHJldHVybiAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IGljby5yZXZlcnNlKCkgOiBpY29cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm90dG9tRGl2ICgpIHtcbiAgICAgIGlmIChwcm9wcy5oaWRlQm90dG9tID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobm90aGluZ1RvRGlzcGxheS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMuaGlkZU5vRGF0YSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHByb3BzLmxvYWRpbmcgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmxvYWRpbmdMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLmxvYWRpbmdcbiAgICAgICAgICA6IChwcm9wcy5maWx0ZXIgPyBwcm9wcy5ub1Jlc3VsdHNMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLm5vUmVzdWx0cyA6IHByb3BzLm5vRGF0YUxhYmVsIHx8ICRxLmxhbmcudGFibGUubm9EYXRhKVxuXG4gICAgICAgIGNvbnN0IG5vRGF0YSA9IHNsb3RzWyAnbm8tZGF0YScgXVxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vRGF0YSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbIG5vRGF0YSh7IG1lc3NhZ2UsIGljb246ICRxLmljb25TZXQudGFibGUud2FybmluZywgZmlsdGVyOiBwcm9wcy5maWx0ZXIgfSkgXVxuICAgICAgICAgIDogW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXRhYmxlX19ib3R0b20tbm9kYXRhLWljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudGFibGUud2FybmluZ1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyArICcgcS10YWJsZV9fYm90dG9tLS1ub2RhdGEnIH0sIGNoaWxkcmVuKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBib3R0b20gPSBzbG90cy5ib3R0b21cblxuICAgICAgaWYgKGJvdHRvbSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyB9LCBbIGJvdHRvbShtYXJnaW5hbHNTY29wZS52YWx1ZSkgXSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy5oaWRlU2VsZWN0ZWRCYW5uZXIgIT09IHRydWUgJiYgaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSAmJiByb3dzU2VsZWN0ZWROdW1iZXIudmFsdWUgPiAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgICAgaCgnZGl2JywgW1xuICAgICAgICAgICAgICAgIChwcm9wcy5zZWxlY3RlZFJvd3NMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLnNlbGVjdGVkUmVjb3Jkcykocm93c1NlbGVjdGVkTnVtYmVyLnZhbHVlKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW11cblxuICAgICAgaWYgKHByb3BzLmhpZGVQYWdpbmF0aW9uICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6IGJvdHRvbUNsYXNzICsgJyBqdXN0aWZ5LWVuZCdcbiAgICAgICAgfSwgZ2V0UGFnaW5hdGlvbkRpdihjaGlsZCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBib3R0b21DbGFzcyB9LCBjaGlsZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhZ1NlbGVjdGlvbiAocGFnKSB7XG4gICAgICBzZXRQYWdpbmF0aW9uKHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcm93c1BlclBhZ2U6IHBhZy52YWx1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYWdpbmF0aW9uRGl2IChjaGlsZCkge1xuICAgICAgbGV0IGNvbnRyb2xcbiAgICAgIGNvbnN0XG4gICAgICAgIHsgcm93c1BlclBhZ2UgfSA9IGNvbXB1dGVkUGFnaW5hdGlvbi52YWx1ZSxcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVsID0gcHJvcHMucGFnaW5hdGlvbkxhYmVsIHx8ICRxLmxhbmcudGFibGUucGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblNsb3QgPSBzbG90cy5wYWdpbmF0aW9uLFxuICAgICAgICBoYXNPcHRzID0gcHJvcHMucm93c1BlclBhZ2VPcHRpb25zLmxlbmd0aCA+IDFcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX3NlcGFyYXRvciBjb2wnIH0pXG4gICAgICApXG5cbiAgICAgIGlmIChoYXNPcHRzID09PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFibGVfX2NvbnRyb2wnIH0sIFtcbiAgICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncS10YWJsZV9fYm90dG9tLWl0ZW0nIH0sIFtcbiAgICAgICAgICAgICAgcHJvcHMucm93c1BlclBhZ2VMYWJlbCB8fCAkcS5sYW5nLnRhYmxlLnJlY29yZHNQZXJQYWdlXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGgoUVNlbGVjdCwge1xuICAgICAgICAgICAgICBjbGFzczogJ3EtdGFibGVfX3NlbGVjdCBpbmxpbmUgcS10YWJsZV9fYm90dG9tLWl0ZW0nLFxuICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHJvd3NQZXJQYWdlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBjb21wdXRlZFJvd3NQZXJQYWdlT3B0aW9ucy52YWx1ZSxcbiAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiByb3dzUGVyUGFnZSA9PT0gMFxuICAgICAgICAgICAgICAgID8gJHEubGFuZy50YWJsZS5hbGxSb3dzXG4gICAgICAgICAgICAgICAgOiByb3dzUGVyUGFnZSxcbiAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgb3B0aW9uc0RlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICBvcHRpb25zQ292ZXI6IHRydWUsXG4gICAgICAgICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogb25QYWdTZWxlY3Rpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocGFnaW5hdGlvblNsb3QgIT09IHZvaWQgMCkge1xuICAgICAgICBjb250cm9sID0gcGFnaW5hdGlvblNsb3QobWFyZ2luYWxzU2NvcGUudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29udHJvbCA9IFtcbiAgICAgICAgICBoKCdzcGFuJywgcm93c1BlclBhZ2UgIT09IDAgPyB7IGNsYXNzOiAncS10YWJsZV9fYm90dG9tLWl0ZW0nIH0gOiB7fSwgW1xuICAgICAgICAgICAgcm93c1BlclBhZ2VcbiAgICAgICAgICAgICAgPyBwYWdpbmF0aW9uTGFiZWwoZmlyc3RSb3dJbmRleC52YWx1ZSArIDEsIE1hdGgubWluKGxhc3RSb3dJbmRleC52YWx1ZSwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKSwgY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlKVxuICAgICAgICAgICAgICA6IHBhZ2luYXRpb25MYWJlbCgxLCBmaWx0ZXJlZFNvcnRlZFJvd3NOdW1iZXIudmFsdWUsIGNvbXB1dGVkUm93c051bWJlci52YWx1ZSlcbiAgICAgICAgICBdKVxuICAgICAgICBdXG5cbiAgICAgICAgaWYgKHJvd3NQZXJQYWdlICE9PSAwICYmIHBhZ2VzTnVtYmVyLnZhbHVlID4gMSkge1xuICAgICAgICAgIGNvbnN0IGJ0blByb3BzID0ge1xuICAgICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgIGZsYXQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvcHMuZGVuc2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJ0blByb3BzLnNpemUgPSAnc20nXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGFnZXNOdW1iZXIudmFsdWUgPiAyICYmIGNvbnRyb2wucHVzaChcbiAgICAgICAgICAgIGgoUUJ0biwge1xuICAgICAgICAgICAgICBrZXk6ICdwZ0ZpcnN0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDAgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGZpcnN0UGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBjb250cm9sLnB1c2goXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdQcmV2JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDEgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNGaXJzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IHByZXZQYWdlXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgIGtleTogJ3BnTmV4dCcsXG4gICAgICAgICAgICAgIC4uLmJ0blByb3BzLFxuICAgICAgICAgICAgICBpY29uOiBuYXZJY29uLnZhbHVlWyAyIF0sXG4gICAgICAgICAgICAgIGRpc2FibGU6IGlzTGFzdFBhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG5leHRQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcblxuICAgICAgICAgIHBhZ2VzTnVtYmVyLnZhbHVlID4gMiAmJiBjb250cm9sLnB1c2goXG4gICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAga2V5OiAncGdMYXN0JyxcbiAgICAgICAgICAgICAgLi4uYnRuUHJvcHMsXG4gICAgICAgICAgICAgIGljb246IG5hdkljb24udmFsdWVbIDMgXSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogaXNMYXN0UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgb25DbGljazogbGFzdFBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19jb250cm9sJyB9LCBjb250cm9sKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcmlkSGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gcHJvcHMuZ3JpZEhlYWRlciA9PT0gdHJ1ZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIFtcbiAgICAgICAgICAgICAgZ2V0VEhlYWQoaClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gZ2V0UHJvZ3Jlc3MoaClcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fbWlkZGxlJyB9LCBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRHcmlkQm9keSAoKSB7XG4gICAgICBjb25zdCBpdGVtID0gc2xvdHMuaXRlbSAhPT0gdm9pZCAwXG4gICAgICAgID8gc2xvdHMuaXRlbVxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IHNjb3BlLmNvbHMubWFwKFxuICAgICAgICAgICAgY29sID0+IGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tcm93JyB9LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tdGl0bGUnIH0sIFsgY29sLmxhYmVsIF0pLFxuICAgICAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJsZV9fZ3JpZC1pdGVtLXZhbHVlJyB9LCBbIGNvbC52YWx1ZSBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaGFzU2VsZWN0aW9uTW9kZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzWyAnYm9keS1zZWxlY3Rpb24nIF1cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzbG90ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyBzbG90KHNjb3BlKVxuICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgIGgoUUNoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWU6IHNjb3BlLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICAgICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IChhZGRpbmcsIGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbihbIHNjb3BlLmtleSBdLCBbIHNjb3BlLnJvdyBdLCBhZGRpbmcsIGV2dClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYmxlX19ncmlkLWl0ZW0tcm93JyB9LCBjb250ZW50KSxcbiAgICAgICAgICAgICAgaChRU2VwYXJhdG9yLCB7IGRhcms6IGlzRGFyay52YWx1ZSB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAncS10YWJsZV9fZ3JpZC1pdGVtLWNhcmQnICsgY2FyZERlZmF1bHRDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgcHJvcHMuY2FyZENsYXNzXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3R5bGU6IHByb3BzLmNhcmRTdHlsZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMFxuICAgICAgICAgICAgfHwgcHJvcHMub25Sb3dEYmxjbGljayAhPT0gdm9pZCAwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBkYXRhLmNsYXNzWyAwIF0gKz0gJyBjdXJzb3ItcG9pbnRlcidcblxuICAgICAgICAgICAgaWYgKHByb3BzLm9uUm93Q2xpY2sgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBkYXRhLm9uQ2xpY2sgPSBldnQgPT4ge1xuICAgICAgICAgICAgICAgIGVtaXQoJ1Jvd0NsaWNrJywgZXZ0LCBzY29wZS5yb3csIHNjb3BlLnBhZ2VJbmRleClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcHMub25Sb3dEYmxjbGljayAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGRhdGEub25EYmxjbGljayA9IGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgZW1pdCgnUm93RGJsY2xpY2snLCBldnQsIHNjb3BlLnJvdywgc2NvcGUucGFnZUluZGV4KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS10YWJsZV9fZ3JpZC1pdGVtIGNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNCBjb2wtbGctMydcbiAgICAgICAgICAgICAgKyAoc2NvcGUuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtdGFibGVfX2dyaWQtaXRlbS0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgnZGl2JywgZGF0YSwgY2hpbGQpXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLXRhYmxlX19ncmlkLWNvbnRlbnQgcm93JyxcbiAgICAgICAgICBwcm9wcy5jYXJkQ29udGFpbmVyQ2xhc3NcbiAgICAgICAgXSxcbiAgICAgICAgc3R5bGU6IHByb3BzLmNhcmRDb250YWluZXJTdHlsZVxuICAgICAgfSwgY29tcHV0ZWRSb3dzLnZhbHVlLm1hcCgocm93LCBwYWdlSW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0oZ2V0Qm9keVNjb3BlKHtcbiAgICAgICAgICBrZXk6IGdldFJvd0tleS52YWx1ZShyb3cpLFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBwYWdlSW5kZXhcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHMgYW5kIG5lZWRlZCBjb21wdXRlZCBwcm9wc1xuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIHJlcXVlc3RTZXJ2ZXJJbnRlcmFjdGlvbixcbiAgICAgIHNldFBhZ2luYXRpb24sXG4gICAgICBmaXJzdFBhZ2UsXG4gICAgICBwcmV2UGFnZSxcbiAgICAgIG5leHRQYWdlLFxuICAgICAgbGFzdFBhZ2UsXG4gICAgICBpc1Jvd1NlbGVjdGVkLFxuICAgICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgICBpc1Jvd0V4cGFuZGVkLFxuICAgICAgc2V0RXhwYW5kZWQsXG4gICAgICBzb3J0LFxuICAgICAgcmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBnZXRDZWxsVmFsdWVcbiAgICB9KVxuXG4gICAgaW5qZWN0TXVsdGlwbGVQcm9wcyh2bS5wcm94eSwge1xuICAgICAgZmlsdGVyZWRTb3J0ZWRSb3dzOiAoKSA9PiBmaWx0ZXJlZFNvcnRlZFJvd3MudmFsdWUsXG4gICAgICBjb21wdXRlZFJvd3M6ICgpID0+IGNvbXB1dGVkUm93cy52YWx1ZSxcbiAgICAgIGNvbXB1dGVkUm93c051bWJlcjogKCkgPT4gY29tcHV0ZWRSb3dzTnVtYmVyLnZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFsgZ2V0VG9wRGl2KCkgXVxuICAgICAgY29uc3QgZGF0YSA9IHsgcmVmOiByb290UmVmLCBjbGFzczogY29udGFpbmVyQ2xhc3MudmFsdWUgfVxuXG4gICAgICBpZiAocHJvcHMuZ3JpZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZC5wdXNoKGdldEdyaWRIZWFkZXIoKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgICBjbGFzczogWyBkYXRhLmNsYXNzLCBwcm9wcy5jYXJkQ2xhc3MgXSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuY2FyZFN0eWxlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGdldEJvZHkoKSxcbiAgICAgICAgZ2V0Qm90dG9tRGl2KClcbiAgICAgIClcblxuICAgICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgJiYgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgc2xvdHMubG9hZGluZygpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJkZWYiLCJsYXN0UGFnZSIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFBLE1BQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxLQUFLLG1CQUFvQjtBQUMvQixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLFVBQVUsTUFBTSxjQUFjLE9BQU8sNkJBQTZCLE9BQy9ELE1BQU0sWUFBWSxPQUFPLG9CQUFvQixNQUM5QztBQUFBLElBQ0g7QUFFRCxXQUFPLE1BQU07QUFDWCxVQUFJLE1BQU0sVUFBVSxRQUFRO0FBQzFCLGVBQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxRQUFRLE1BQUssR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsTUFDOUQ7QUFFRCxZQUFNLE9BQU8sR0FBRyxNQUFNO0FBQ3RCLFlBQU0sT0FDSCxNQUFNLE1BQU0sWUFBWSxTQUFTLE1BQU0sTUFBTSxRQUFTLFFBQVMsU0FDN0QsTUFBTSxNQUFNO0FBR2pCLFVBQUksUUFBUSxRQUFRO0FBQUU7QUFB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
