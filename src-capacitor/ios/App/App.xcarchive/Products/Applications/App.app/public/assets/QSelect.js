import { c as useFieldProps, d as useFieldEmits, e as useField, f as useFieldState, a as useFormProps, g as useFormInputNameAttr, h as fieldValueIsFilled, i as useKeyComposition } from "./use-key-composition.js";
import { A as noop, g as getCurrentInstance, f as ref, d as computed, w as watch, aQ as debounce, ap as onBeforeMount, E as onDeactivated, F as onActivated, n as onBeforeUnmount, B as nextTick, h, c as createComponent, aS as useSizeProps, aT as useSize, T as hDir, Q as QIcon, aX as hMergeSlotSafely, R as Ripple, q as stopAndPrevent, ah as Transition, e as hSlot, aE as childHasFocus, aR as onBeforeUpdate, aY as onUpdated, N as prevent, z as isDeepEqual, aZ as normalizeToInterval, v as isKeyCode, s as stop, x as shouldIgnoreKey, y as hMergeSlot } from "./index.js";
import { b as useDarkProps, c as useDark, e as addFocusFn } from "./QNoSsr.js";
import { r as rtlHasScrollBug, d as useModelToggleProps, u as useTransitionProps, e as useModelToggleEmits, b as useTimeout, a as useTick, t as useTransition, v as usePortal, f as useModelToggle, g as useHistory, w as removeFocusout, x as removeEscapeKey, h as usePreventScroll, y as addFocusout, z as addEscapeKey, Q as QMenu, q as QItemSection, p as QItemLabel, o as QItem } from "./use-prevent-scroll.js";
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(contentEl, index) {
  if (contentEl === null) {
    return;
  }
  cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
  contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (contentEl === null) {
      return;
    }
    const children = contentEl.children || [];
    filterProto.call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0).forEach((el2) => {
      delete el2.dataset.qVsAnchor;
    });
    const el = children[index];
    if (el && el.dataset) {
      el.dataset.qVsAnchor = "";
    }
  });
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: null
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const commonVirtPropsList = Object.keys(commonVirtScrollProps);
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) > -1 ? edge : prevToIndex > -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) {
      return;
    }
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") > -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl !== null && contentEl.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    setOverflowAnchor(contentEl, toIndex - from);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) {
        return;
      }
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size, diff;
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size += sizeFn(children[i]);
          i++;
        }
        diff = size - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value !== null && contentRef.value !== void 0 && contentRef.value.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtualScroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    if (shouldActivate !== true) {
      return;
    }
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    } else {
      scrollTo(prevToIndex);
    }
  });
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
var QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: useFieldProps,
  emits: useFieldEmits,
  setup() {
    return useField(useFieldState());
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) {
        return;
      }
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[props.position][0],
      () => defaultTransitions[props.position][1]
    );
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      true
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = (selector !== "" ? node.querySelector(selector) : null) || node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      clearTimeout(shakeTimeout);
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake(e.relatedTarget);
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(cleanup);
    const backdropEvt = vm.proxy.$q.platform.is.ios === true ? "onClick" : "onFocusin";
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: transitionStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          [backdropEvt]: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
var QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: void 0
    },
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "inputValue",
    "newValue",
    "keyup",
    "keypress",
    "keydown",
    "filterAbort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let inputTimer, innerValueCache, hasDialog, userInputValue, filterId, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt !== void 0 && opt !== null && opt.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-readonly": props.readonly === true ? "true" : "false",
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": props.multiple === true ? "true" : "false"
    }));
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active: false,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          isOptionSelected(opt) === true && (itemProps.active = true);
          optionIndex.value === index && (itemProps.focused = true);
          itemProps["aria-selected"] = itemProps.active === true ? "true" : "false";
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map((opt) => getOptionValue.value(opt)));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index > -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) {
        return;
      }
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return;
      }
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return;
      }
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value !== null && targetRef.value.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index > -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return;
        }
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) {
        return;
      }
      const val = index > -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function getPropValueFn(propValue, defaultVal) {
      const val = propValue !== void 0 ? propValue : defaultVal;
      return typeof val === "function" ? val : (opt) => opt !== null && typeof opt === "object" && val in opt ? opt[val] : opt;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      clearTimeout(inputTimer);
      resetInputValue();
      if (typeof value === "string" && value.length > 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => extractFn.value(opt).toLocaleLowerCase() === needle);
          if (option === void 0) {
            return false;
          }
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) === true) {
            return;
          }
          if (findFn(getOptionLabel) === true || afterFilter === true) {
            return;
          }
          filter(value, true, () => fillFn(true));
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) {
        return;
      }
      const newValueModeValid = inputValue.value.length > 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.multiple !== true && (optionIndex.value > -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value) {
        return;
      }
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === false && e.ctrlKey === false && e.metaKey === false && (e.keyCode !== 32 || searchBuffer.length > 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) > -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]));
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) {
        return;
      }
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value > -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) {
              return;
            }
          } else {
            mode = props.newValueMode;
          }
          if (val === void 0 || val === null) {
            return;
          }
          updateInputValue("", props.multiple !== true, true);
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("newValue", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) {
          return;
        }
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: ariaCurrentValue.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      clearTimeout(inputTimer);
      if (e && e.target && e.target.qComposing === true) {
        return;
      }
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        inputTimer = setTimeout(() => {
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        emit("inputValue", val);
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) {
        return;
      }
      if (state.innerLoading.value === true) {
        emit("filterAbort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length > 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length > 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) {
        return;
      }
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        clearTimeout(filterId);
        filterId = void 0;
        if (state.innerLoading.value === true) {
          emit("filterAbort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) {
        return;
      }
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length > 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length > 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popupShow", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popupHide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      clearTimeout(inputTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length > 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length > 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length > 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
export { QSelect as Q, useVirtualScroll as a, commonVirtPropsList as c, useVirtualScrollProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNlbGVjdC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpZWxkL1FGaWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZGlhbG9nL1FEaWFsb2cuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlbGVjdC9RU2VsZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVNb3VudCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBydGxIYXNTY3JvbGxCdWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3J0bC5qcydcblxuY29uc3QgYWdnQnVja2V0U2l6ZSA9IDEwMDBcblxuY29uc3Qgc2Nyb2xsVG9FZGdlcyA9IFtcbiAgJ3N0YXJ0JyxcbiAgJ2NlbnRlcicsXG4gICdlbmQnLFxuICAnc3RhcnQtZm9yY2UnLFxuICAnY2VudGVyLWZvcmNlJyxcbiAgJ2VuZC1mb3JjZSdcbl1cblxuY29uc3QgZmlsdGVyUHJvdG8gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyXG5cbmNvbnN0IHNldE92ZXJmbG93QW5jaG9yID0gX19RVUFTQVJfU1NSX18gfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkub3ZlcmZsb3dBbmNob3IgPT09IHZvaWQgMFxuICA/IG5vb3BcbiAgOiBmdW5jdGlvbiAoY29udGVudEVsLCBpbmRleCkge1xuICAgIGlmIChjb250ZW50RWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUpXG4gICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoY29udGVudEVsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGNvbnRlbnRFbC5jaGlsZHJlbiB8fCBbXVxuXG4gICAgICBmaWx0ZXJQcm90b1xuICAgICAgICAuY2FsbChjaGlsZHJlbiwgZWwgPT4gZWwuZGF0YXNldCAmJiBlbC5kYXRhc2V0LnFWc0FuY2hvciAhPT0gdm9pZCAwKVxuICAgICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgZGVsZXRlIGVsLmRhdGFzZXQucVZzQW5jaG9yXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGVsID0gY2hpbGRyZW5bIGluZGV4IF1cblxuICAgICAgaWYgKGVsICYmIGVsLmRhdGFzZXQpIHtcbiAgICAgICAgZWwuZGF0YXNldC5xVnNBbmNob3IgPSAnJ1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuZnVuY3Rpb24gc3VtRm4gKGFjYywgaCkge1xuICByZXR1cm4gYWNjICsgaFxufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxEZXRhaWxzIChcbiAgcGFyZW50LFxuICBjaGlsZCxcbiAgYmVmb3JlUmVmLFxuICBhZnRlclJlZixcbiAgaG9yaXpvbnRhbCxcbiAgcnRsLFxuICBzdGlja3lTdGFydCxcbiAgc3RpY2t5RW5kXG4pIHtcbiAgY29uc3RcbiAgICBwYXJlbnRDYWxjID0gcGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IHBhcmVudCxcbiAgICBwcm9wRWxTaXplID0gaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBkZXRhaWxzID0ge1xuICAgICAgc2Nyb2xsU3RhcnQ6IDAsXG4gICAgICBzY3JvbGxWaWV3U2l6ZTogLXN0aWNreVN0YXJ0IC0gc3RpY2t5RW5kLFxuICAgICAgc2Nyb2xsTWF4U2l6ZTogMCxcbiAgICAgIG9mZnNldFN0YXJ0OiAtc3RpY2t5U3RhcnQsXG4gICAgICBvZmZzZXRFbmQ6IC1zdGlja3lFbmRcbiAgICB9XG5cbiAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsTGVmdFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBwYXJlbnRDYWxjLmNsaWVudFdpZHRoXG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsV2lkdGhcblxuICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZGV0YWlscy5zY3JvbGxNYXhTaXplIC0gZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA6IDApIC0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMuc2Nyb2xsU3RhcnQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHBhcmVudENhbGMuc2Nyb2xsVG9wXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IHBhcmVudENhbGMuY2xpZW50SGVpZ2h0XG4gICAgfVxuICAgIGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSA9IHBhcmVudENhbGMuc2Nyb2xsSGVpZ2h0XG4gIH1cblxuICBpZiAoYmVmb3JlUmVmICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgZWwgPSBiZWZvcmVSZWYucHJldmlvdXNFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZSkge1xuICAgICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWZ0ZXJSZWYgIT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBlbCA9IGFmdGVyUmVmLm5leHRFbGVtZW50U2libGluZzsgZWwgIT09IG51bGw7IGVsID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlKSB7XG4gICAgICAgIGRldGFpbHMub2Zmc2V0RW5kICs9IGVsWyBwcm9wRWxTaXplIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2hpbGQgIT09IHBhcmVudCkge1xuICAgIGNvbnN0XG4gICAgICBwYXJlbnRSZWN0ID0gcGFyZW50Q2FsYy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdFxuICAgICAgZGV0YWlscy5vZmZzZXRFbmQgLT0gY2hpbGRSZWN0LndpZHRoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBjaGlsZFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3BcbiAgICAgIGRldGFpbHMub2Zmc2V0RW5kIC09IGNoaWxkUmVjdC5oZWlnaHRcbiAgICB9XG5cbiAgICBpZiAocGFyZW50ICE9PSB3aW5kb3cpIHtcbiAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gZGV0YWlscy5zY3JvbGxTdGFydFxuICAgIH1cbiAgICBkZXRhaWxzLm9mZnNldEVuZCArPSBkZXRhaWxzLnNjcm9sbE1heFNpemUgLSBkZXRhaWxzLm9mZnNldFN0YXJ0XG4gIH1cblxuICByZXR1cm4gZGV0YWlsc1xufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHBhcmVudCwgc2Nyb2xsLCBob3Jpem9udGFsLCBydGwpIHtcbiAgaWYgKHNjcm9sbCA9PT0gJ2VuZCcpIHtcbiAgICBzY3JvbGwgPSAocGFyZW50ID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogcGFyZW50KVtcbiAgICAgIGhvcml6b250YWwgPT09IHRydWUgPyAnc2Nyb2xsV2lkdGgnIDogJ3Njcm9sbEhlaWdodCdcbiAgICBdXG4gIH1cblxuICBpZiAocGFyZW50ID09PSB3aW5kb3cpIHtcbiAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IDApIC0gc2Nyb2xsXG4gICAgICB9XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsLCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwLCBzY3JvbGwpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICBzY3JvbGwgPSAocnRsSGFzU2Nyb2xsQnVnID09PSB0cnVlID8gcGFyZW50LnNjcm9sbFdpZHRoIC0gcGFyZW50Lm9mZnNldFdpZHRoIDogMCkgLSBzY3JvbGxcbiAgICB9XG4gICAgcGFyZW50LnNjcm9sbExlZnQgPSBzY3JvbGxcbiAgfVxuICBlbHNlIHtcbiAgICBwYXJlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsXG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtU2l6ZSAoc2l6ZUFnZywgc2l6ZSwgZnJvbSwgdG8pIHtcbiAgaWYgKGZyb20gPj0gdG8pIHsgcmV0dXJuIDAgfVxuXG4gIGNvbnN0XG4gICAgbGFzdFRvID0gc2l6ZS5sZW5ndGgsXG4gICAgZnJvbUFnZyA9IE1hdGguZmxvb3IoZnJvbSAvIGFnZ0J1Y2tldFNpemUpLFxuICAgIHRvQWdnID0gTWF0aC5mbG9vcigodG8gLSAxKSAvIGFnZ0J1Y2tldFNpemUpICsgMVxuXG4gIGxldCB0b3RhbCA9IHNpemVBZ2cuc2xpY2UoZnJvbUFnZywgdG9BZ2cpLnJlZHVjZShzdW1GbiwgMClcblxuICBpZiAoZnJvbSAlIGFnZ0J1Y2tldFNpemUgIT09IDApIHtcbiAgICB0b3RhbCAtPSBzaXplLnNsaWNlKGZyb21BZ2cgKiBhZ2dCdWNrZXRTaXplLCBmcm9tKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cbiAgaWYgKHRvICUgYWdnQnVja2V0U2l6ZSAhPT0gMCAmJiB0byAhPT0gbGFzdFRvKSB7XG4gICAgdG90YWwgLT0gc2l6ZS5zbGljZSh0bywgdG9BZ2cgKiBhZ2dCdWNrZXRTaXplKS5yZWR1Y2Uoc3VtRm4sIDApXG4gIH1cblxuICByZXR1cm4gdG90YWxcbn1cblxuY29uc3QgY29tbW9uVmlydFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcjoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDI0XG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydDoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHRhYmxlQ29sc3BhbjogWyBOdW1iZXIsIFN0cmluZyBdXG59XG5cbmV4cG9ydCBjb25zdCBjb21tb25WaXJ0UHJvcHNMaXN0ID0gT2JqZWN0LmtleXMoY29tbW9uVmlydFNjcm9sbFByb3BzKVxuXG5leHBvcnQgY29uc3QgdXNlVmlydHVhbFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbDogQm9vbGVhbixcbiAgb25WaXJ0dWFsU2Nyb2xsOiBGdW5jdGlvbixcbiAgLi4uY29tbW9uVmlydFNjcm9sbFByb3BzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VWaXJ0dWFsU2Nyb2xsICh7XG4gIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBwcmV2U2Nyb2xsU3RhcnQsIHByZXZUb0luZGV4LCBsb2NhbFNjcm9sbFZpZXdTaXplLCB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cgPSBbXSwgdmlydHVhbFNjcm9sbFNpemVzXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlciA9IHJlZigwKVxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQgPSByZWYoe30pXG5cbiAgY29uc3QgYmVmb3JlUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGFmdGVyUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSA9IHJlZih7IGZyb206IDAsIHRvOiAwIH0pXG5cbiAgY29uc3QgY29sc3BhbkF0dHIgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudGFibGVDb2xzcGFuICE9PSB2b2lkIDAgPyBwcm9wcy50YWJsZUNvbHNwYW4gOiAxMDApKVxuXG4gIGlmICh2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9PT0gdm9pZCAwKSB7XG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUpXG4gIH1cblxuICBjb25zdCBuZWVkc1Jlc2V0ID0gY29tcHV0ZWQoKCkgPT4gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbClcblxuICBjb25zdCBuZWVkc1NsaWNlUmVjYWxjID0gY29tcHV0ZWQoKCkgPT5cbiAgICBuZWVkc1Jlc2V0LnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gIClcblxuICB3YXRjaChuZWVkc1NsaWNlUmVjYWxjLCAoKSA9PiB7IHNldFZpcnR1YWxTY3JvbGxTaXplKCkgfSlcbiAgd2F0Y2gobmVlZHNSZXNldCwgcmVzZXQpXG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHByZXZUb0luZGV4LCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAodG9JbmRleCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHRvSW5kZXggPT09IHZvaWQgMCA/IHByZXZUb0luZGV4IDogdG9JbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0b0luZGV4LCBlZGdlKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChzY3JvbGxFbCA9PT0gdm9pZCAwIHx8IHNjcm9sbEVsID09PSBudWxsIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxEZXRhaWxzID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgJHEubGFuZy5ydGwsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICApXG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplICYmIHNldFZpcnR1YWxTY3JvbGxTaXplKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgIE1hdGgubWluKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxLCBNYXRoLm1heCgwLCBwYXJzZUludCh0b0luZGV4LCAxMCkgfHwgMCkpLFxuICAgICAgMCxcbiAgICAgIHNjcm9sbFRvRWRnZXMuaW5kZXhPZihlZGdlKSA+IC0xID8gZWRnZSA6IChwcmV2VG9JbmRleCA+IC0xICYmIHRvSW5kZXggPiBwcmV2VG9JbmRleCA/ICdlbmQnIDogJ3N0YXJ0JylcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCAoKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChzY3JvbGxFbCA9PT0gdm9pZCAwIHx8IHNjcm9sbEVsID09PSBudWxsIHx8IHNjcm9sbEVsLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgc2Nyb2xsRGV0YWlscyA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgIHNjcm9sbEVsLFxuICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgKSxcbiAgICAgIGxpc3RMYXN0SW5kZXggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSxcbiAgICAgIGxpc3RFbmRPZmZzZXQgPSBzY3JvbGxEZXRhaWxzLnNjcm9sbE1heFNpemUgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0IC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlXG5cbiAgICBpZiAocHJldlNjcm9sbFN0YXJ0ID09PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIDw9IDApIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCAwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG5cbiAgICBjb25zdCBzY3JvbGxNYXhTdGFydCA9IE1hdGguZmxvb3Ioc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplXG4gICAgICAtIE1hdGgubWF4KHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUsIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kKVxuICAgICAgLSBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGxpc3RMYXN0SW5kZXggXSwgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAvIDIpKVxuXG4gICAgaWYgKHNjcm9sbE1heFN0YXJ0ID4gMCAmJiBNYXRoLmNlaWwoc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgPj0gc2Nyb2xsTWF4U3RhcnQpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgICAgbGlzdExhc3RJbmRleCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucmVkdWNlKHN1bUZuLCAwKVxuICAgICAgKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXRcbiAgICAgIHRvSW5kZXggPSAwLFxuICAgICAgbGlzdE9mZnNldCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0LFxuICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuXG4gICAgaWYgKGxpc3RPZmZzZXQgPD0gbGlzdEVuZE9mZnNldCAmJiBsaXN0T2Zmc2V0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA+PSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZVxuICAgICAgdG9JbmRleCA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb21cbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgbGlzdE9mZnNldCA+PSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIGogXSAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleDsgaisrKSB7XG4gICAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF1cbiAgICAgICAgdG9JbmRleCArPSBhZ2dCdWNrZXRTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGxpc3RPZmZzZXQgPiAwICYmIHRvSW5kZXggPCBsaXN0TGFzdEluZGV4KSB7XG4gICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG4gICAgICBpZiAobGlzdE9mZnNldCA+IC1zY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKSB7XG4gICAgICAgIHRvSW5kZXgrK1xuICAgICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ID0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0gKyBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICB0b0luZGV4LFxuICAgICAgb2Zmc2V0XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCB0b0luZGV4LCBvZmZzZXQsIGFsaWduKSB7XG4gICAgY29uc3QgYWxpZ25Gb3JjZSA9IHR5cGVvZiBhbGlnbiA9PT0gJ3N0cmluZycgJiYgYWxpZ24uaW5kZXhPZignLWZvcmNlJykgPiAtMVxuICAgIGNvbnN0IGFsaWduRW5kID0gYWxpZ25Gb3JjZSA9PT0gdHJ1ZSA/IGFsaWduLnJlcGxhY2UoJy1mb3JjZScsICcnKSA6IGFsaWduXG4gICAgY29uc3QgYWxpZ25SYW5nZSA9IGFsaWduRW5kICE9PSB2b2lkIDAgPyBhbGlnbkVuZCA6ICdzdGFydCdcblxuICAgIGxldFxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvSW5kZXggLSB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWVbIGFsaWduUmFuZ2UgXSksXG4gICAgICB0byA9IGZyb20gKyB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudG90YWxcblxuICAgIGlmICh0byA+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpIHtcbiAgICAgIHRvID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgZnJvbSA9IE1hdGgubWF4KDAsIHRvIC0gdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnRvdGFsKVxuICAgIH1cblxuICAgIHByZXZTY3JvbGxTdGFydCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnRcblxuICAgIGNvbnN0IHJhbmdlQ2hhbmdlZCA9IGZyb20gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gfHwgdG8gIT09IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSBmYWxzZSAmJiBhbGlnbkVuZCA9PT0gdm9pZCAwKSB7XG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IGFjdGl2ZUVsZW1lbnQgfSA9IGRvY3VtZW50XG4gICAgY29uc3QgY29udGVudEVsID0gY29udGVudFJlZi52YWx1ZVxuICAgIGlmIChcbiAgICAgIHJhbmdlQ2hhbmdlZCA9PT0gdHJ1ZVxuICAgICAgJiYgY29udGVudEVsICE9PSBudWxsXG4gICAgICAmJiBjb250ZW50RWwgIT09IGFjdGl2ZUVsZW1lbnRcbiAgICAgICYmIGNvbnRlbnRFbC5jb250YWlucyhhY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0Jywgb25CbHVyUmVmb2N1c0ZuKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29udGVudEVsICE9PSBudWxsICYmIGNvbnRlbnRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIG9uQmx1clJlZm9jdXNGbilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0T3ZlcmZsb3dBbmNob3IoY29udGVudEVsLCB0b0luZGV4IC0gZnJvbSlcblxuICAgIGNvbnN0IHNpemVCZWZvcmUgPSBhbGlnbkVuZCAhPT0gdm9pZCAwID8gdmlydHVhbFNjcm9sbFNpemVzLnNsaWNlKGZyb20sIHRvSW5kZXgpLnJlZHVjZShzdW1GbiwgMCkgOiAwXG5cbiAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyB2dWUga2V5IG1hdGNoaW5nIGFsZ29yaXRobSB3b3JrcyBvbmx5IGlmXG4gICAgICAvLyB0aGUgYXJyYXkgb2YgVk5vZGVzIGNoYW5nZXMgb24gb25seSBvbmUgb2YgdGhlIGVuZHNcbiAgICAgIC8vIHNvIHdlIGZpcnN0IGNoYW5nZSBvbmUgZW5kIGFuZCB0aGVuIHRoZSBvdGhlclxuXG4gICAgICBjb25zdCB0ZW1wVG8gPSB0byA+PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tICYmIGZyb20gPD0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cbiAgICAgICAgPyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuICAgICAgICA6IHRvXG5cbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlID0geyBmcm9tLCB0bzogdGVtcFRvIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgZnJvbSlcbiAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgaWYgKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvICE9PSB0byAmJiBwcmV2U2Nyb2xsU3RhcnQgPT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZSA9IHsgZnJvbTogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSwgdG8gfVxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB0bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gaWYgdGhlIHNjcm9sbCB3YXMgY2hhbmdlZCBnaXZlIHVwXG4gICAgICAvLyAoYW5vdGhlciBjYWxsIHRvIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlIGJlZm9yZSBhbmltYXRpb24gZnJhbWUpXG4gICAgICBpZiAocHJldlNjcm9sbFN0YXJ0ICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFN0YXJ0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyhmcm9tKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplQWZ0ZXIgPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSxcbiAgICAgICAgcG9zU3RhcnQgPSBzaXplQWZ0ZXIgKyBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0ICsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUsXG4gICAgICAgIHBvc0VuZCA9IHBvc1N0YXJ0ICsgdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF1cblxuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gcG9zU3RhcnQgKyBvZmZzZXRcblxuICAgICAgaWYgKGFsaWduRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3Qgc2l6ZURpZmYgPSBzaXplQWZ0ZXIgLSBzaXplQmVmb3JlXG4gICAgICAgIGNvbnN0IHNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCArIHNpemVEaWZmXG5cbiAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSBhbGlnbkZvcmNlICE9PSB0cnVlICYmIHNjcm9sbFN0YXJ0IDwgcG9zU3RhcnQgJiYgcG9zRW5kIDwgc2Nyb2xsU3RhcnQgKyBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgPyBzY3JvbGxTdGFydFxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBhbGlnbkVuZCA9PT0gJ2VuZCdcbiAgICAgICAgICAgICAgICA/IHBvc0VuZCAtIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemVcbiAgICAgICAgICAgICAgICA6IHBvc1N0YXJ0IC0gKGFsaWduRW5kID09PSAnc3RhcnQnID8gMCA6IE1hdGgucm91bmQoKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXSkgLyAyKSlcbiAgICAgICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsUG9zaXRpb25cblxuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsUG9zaXRpb24sXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuXG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyAoZnJvbSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcblxuICAgIGlmIChjb250ZW50RWwpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNoaWxkcmVuID0gZmlsdGVyUHJvdG8uY2FsbChcbiAgICAgICAgICBjb250ZW50RWwuY2hpbGRyZW4sXG4gICAgICAgICAgZWwgPT4gZWwuY2xhc3NMaXN0ICYmIGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgc2l6ZUZuID0gcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICA/IGVsID0+IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgOiBlbCA9PiBlbC5vZmZzZXRIZWlnaHRcblxuICAgICAgbGV0XG4gICAgICAgIGluZGV4ID0gZnJvbSxcbiAgICAgICAgc2l6ZSwgZGlmZlxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOykge1xuICAgICAgICBzaXplID0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgIGkrK1xuXG4gICAgICAgIHdoaWxlIChpIDwgY2hpbGRyZW5MZW5ndGggJiYgY2hpbGRyZW5bIGkgXS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXdpdGgtcHJldicpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2l6ZSArPSBzaXplRm4oY2hpbGRyZW5bIGkgXSlcbiAgICAgICAgICBpKytcbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmYgPSBzaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdXG5cbiAgICAgICAgaWYgKGRpZmYgIT09IDApIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGluZGV4IF0gKz0gZGlmZlxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgTWF0aC5mbG9vcihpbmRleCAvIGFnZ0J1Y2tldFNpemUpIF0gKz0gZGlmZlxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQmx1clJlZm9jdXNGbiAoKSB7XG4gICAgY29udGVudFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBjb250ZW50UmVmLnZhbHVlICE9PSB2b2lkIDAgJiYgY29udGVudFJlZi52YWx1ZS5mb2N1cygpXG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCAodG9JbmRleCwgZnVsbFJlc2V0KSB7XG4gICAgY29uc3QgZGVmYXVsdFNpemUgPSAxICogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWVcblxuICAgIGlmIChmdWxsUmVzZXQgPT09IHRydWUgfHwgQXJyYXkuaXNBcnJheSh2aXJ0dWFsU2Nyb2xsU2l6ZXMpID09PSBmYWxzZSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzID0gW11cbiAgICB9XG5cbiAgICBjb25zdCBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoXG5cbiAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXMubGVuZ3RoID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuXG4gICAgZm9yIChsZXQgaSA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxOyBpID49IG9sZFZpcnR1YWxTY3JvbGxTaXplc0xlbmd0aDsgaS0tKSB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGkgXSA9IGRlZmF1bHRTaXplXG4gICAgfVxuXG4gICAgY29uc3Qgak1heCA9IE1hdGguZmxvb3IoKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxKSAvIGFnZ0J1Y2tldFNpemUpXG4gICAgdmlydHVhbFNjcm9sbFNpemVzQWdnID0gW11cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBqTWF4OyBqKyspIHtcbiAgICAgIGxldCBzaXplID0gMFxuICAgICAgY29uc3QgaU1heCA9IE1hdGgubWluKChqICsgMSkgKiBhZ2dCdWNrZXRTaXplLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuICAgICAgZm9yIChsZXQgaSA9IGogKiBhZ2dCdWNrZXRTaXplOyBpIDwgaU1heDsgaSsrKSB7XG4gICAgICAgIHNpemUgKz0gdmlydHVhbFNjcm9sbFNpemVzWyBpIF1cbiAgICAgIH1cbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZy5wdXNoKHNpemUpXG4gICAgfVxuXG4gICAgcHJldlRvSW5kZXggPSAtMVxuICAgIHByZXZTY3JvbGxTdGFydCA9IHZvaWQgMFxuXG4gICAgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCAwLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50bywgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcblxuICAgIGlmICh0b0luZGV4ID49IDApIHtcbiAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyh2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tKVxuICAgICAgbmV4dFRpY2soKCkgPT4geyBzY3JvbGxUbyh0b0luZGV4KSB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9uVmlydHVhbFNjcm9sbEV2dCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNpemUgKHNjcm9sbFZpZXdTaXplKSB7XG4gICAgaWYgKHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGlmIChzY3JvbGxFbCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSBudWxsICYmIHNjcm9sbEVsLm5vZGVUeXBlICE9PSA4KSB7XG4gICAgICAgIHNjcm9sbFZpZXdTaXplID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgICBnZXRWaXJ0dWFsU2Nyb2xsRWwoKSxcbiAgICAgICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICAgJHEubGFuZy5ydGwsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZUVuZFxuICAgICAgICApLnNjcm9sbFZpZXdTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSA9IHNjcm9sbFZpZXdTaXplXG5cbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpIHx8IDBcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyID0gcGFyc2VGbG9hdChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyKSB8fCAwXG4gICAgY29uc3QgbXVsdGlwbGllciA9IDEgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQWZ0ZXJcbiAgICBjb25zdCB2aWV3ID0gc2Nyb2xsVmlld1NpemUgPT09IHZvaWQgMCB8fCBzY3JvbGxWaWV3U2l6ZSA8PSAwXG4gICAgICA/IDFcbiAgICAgIDogTWF0aC5jZWlsKHNjcm9sbFZpZXdTaXplIC8gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUpXG5cbiAgICBjb25zdCBiYXNlU2l6ZSA9IE1hdGgubWF4KFxuICAgICAgMSxcbiAgICAgIHZpZXcsXG4gICAgICBNYXRoLmNlaWwoKHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgPiAwID8gcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlU2l6ZSA6IDEwKSAvIG11bHRpcGxpZXIpXG4gICAgKVxuXG4gICAgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlID0ge1xuICAgICAgdG90YWw6IE1hdGguY2VpbChiYXNlU2l6ZSAqIG11bHRpcGxpZXIpLFxuICAgICAgc3RhcnQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSxcbiAgICAgIGNlbnRlcjogTWF0aC5jZWlsKGJhc2VTaXplICogKDAuNSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICBlbmQ6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUpKSxcbiAgICAgIHZpZXdcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYWRWaXJ0dWFsU2Nyb2xsICh0YWcsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBwYWRkaW5nU2l6ZSA9IHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBbICctLXEtdmlydHVhbC1zY3JvbGwtaXRlbS0nICsgcGFkZGluZ1NpemUgXTogdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAncHgnXG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHRhZyA9PT0gJ3Rib2R5J1xuICAgICAgICA/IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9LFxuICAgICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuQXR0ci52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgICA6IGgodGFnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXZpcnR1YWwtc2Nyb2xsX19wYWRkaW5nJyxcbiAgICAgICAgICBrZXk6ICdiZWZvcmUnLFxuICAgICAgICAgIHJlZjogYmVmb3JlUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlIH1weGAsIC4uLnN0eWxlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIGgodGFnLCB7XG4gICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fY29udGVudCcsXG4gICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICByZWY6IGNvbnRlbnRSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudC5mbGF0KCkpLFxuXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWZcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3RyJywgW1xuICAgICAgICAgICAgaCgndGQnLCB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYWZ0ZXInLFxuICAgICAgICAgIHJlZjogYWZ0ZXJSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pXG4gICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdFNjcm9sbCAoaW5kZXgpIHtcbiAgICBpZiAocHJldlRvSW5kZXggIT09IGluZGV4KSB7XG4gICAgICBwcm9wcy5vblZpcnR1YWxTY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCd2aXJ0dWFsU2Nyb2xsJywge1xuICAgICAgICBpbmRleCxcbiAgICAgICAgZnJvbTogdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSxcbiAgICAgICAgdG86IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvIC0gMSxcbiAgICAgICAgZGlyZWN0aW9uOiBpbmRleCA8IHByZXZUb0luZGV4ID8gJ2RlY3JlYXNlJyA6ICdpbmNyZWFzZScsXG4gICAgICAgIHJlZjogcHJveHlcbiAgICAgIH0pXG5cbiAgICAgIHByZXZUb0luZGV4ID0gaW5kZXhcbiAgICB9XG4gIH1cblxuICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gIGNvbnN0IG9uVmlydHVhbFNjcm9sbEV2dCA9IGRlYm91bmNlKFxuICAgIGxvY2FsT25WaXJ0dWFsU2Nyb2xsRXZ0LFxuICAgICRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSA/IDEyMCA6IDM1XG4gIClcblxuICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gIH0pXG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZEFjdGl2YXRlICE9PSB0cnVlKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IG51bGwgJiYgc2Nyb2xsRWwubm9kZVR5cGUgIT09IDgpIHtcbiAgICAgIHNldFNjcm9sbChcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHByZXZTY3JvbGxTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2Nyb2xsVG8ocHJldlRvSW5kZXgpXG4gICAgfVxuICB9KVxuXG4gIF9fUVVBU0FSX1NTUl9fIHx8IG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgc2Nyb2xsVG8sIHJlc2V0LCByZWZyZXNoIH0pXG5cbiAgcmV0dXJuIHtcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSxcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSxcbiAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgcGFkVmlydHVhbFNjcm9sbCxcblxuICAgIHNjcm9sbFRvLFxuICAgIHJlc2V0LFxuICAgIHJlZnJlc2hcbiAgfVxufVxuIiwiaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWVsZC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRmllbGQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHVzZUZpZWxkUHJvcHMsXG5cbiAgZW1pdHM6IHVzZUZpZWxkRW1pdHMsXG5cbiAgc2V0dXAgKCkge1xuICAgIHJldHVybiB1c2VGaWVsZCh1c2VGaWVsZFN0YXRlKCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1JpcHBsZS5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHksIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuICAgICAgY29uc3QgcmVtb3ZlID0ge1xuICAgICAgICAuLi5jaGlwLFxuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5yZW1vdmVBcmlhTGFiZWwgfHwgJHEubGFuZy5sYWJlbC5yZW1vdmVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgY2hpcCwgcmVtb3ZlIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAvKiBFTlRFUiAqLyAmJiBvbkNsaWNrKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgaWYgKCFwcm9wcy5kaXNhYmxlKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTpzZWxlY3RlZCcsICFwcm9wcy5zZWxlY3RlZClcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVtb3ZlIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSB2b2lkIDAgfHwgZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZm9jdXMtaGVscGVyJyB9KVxuICAgICAgKVxuXG4gICAgICBoYXNMZWZ0SWNvbi52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNoaXBfX2ljb24gcS1jaGlwX19pY29uLS1sZWZ0JyxcbiAgICAgICAgICBuYW1lOiBsZWZ0SWNvbi52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIGgoJ2RpdicsIHsgY2xhc3M6ICdlbGxpcHNpcycgfSwgWyBwcm9wcy5sYWJlbCBdKSBdXG4gICAgICAgIDogdm9pZCAwXG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9fY29udGVudCBjb2wgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoTWVyZ2VTbG90U2FmZWx5KHNsb3RzLmRlZmF1bHQsIGxhYmVsKSlcbiAgICAgIClcblxuICAgICAgcHJvcHMuaWNvblJpZ2h0ICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLXJpZ2h0JyxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uUmlnaHRcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMucmVtb3ZhYmxlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLXJlbW92ZSBjdXJzb3ItcG9pbnRlcicsXG4gICAgICAgICAgbmFtZTogcmVtb3ZlSWNvbi52YWx1ZSxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLnJlbW92ZSxcbiAgICAgICAgICBvbkNsaWNrOiBvblJlbW92ZSxcbiAgICAgICAgICBvbktleXVwOiBvblJlbW92ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGF0dHJpYnV0ZXMudmFsdWUuY2hpcCxcbiAgICAgICAgeyBvbkNsaWNrLCBvbktleXVwIH1cbiAgICAgIClcblxuICAgICAgcmV0dXJuIGhEaXIoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBnZXRDb250ZW50KCksXG4gICAgICAgICdyaXBwbGUnLFxuICAgICAgICBwcm9wcy5yaXBwbGUgIT09IGZhbHNlICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUsXG4gICAgICAgICgpID0+IFsgWyBSaXBwbGUsIHByb3BzLnJpcHBsZSBdIF1cbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzJ1xuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGljay5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VQb3J0YWwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcHJldmVudC1zY3JvbGwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2hpbGRIYXNGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRFc2NhcGVLZXksIHJlbW92ZUVzY2FwZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZXNjYXBlLWtleS5qcydcbmltcG9ydCB7IGFkZEZvY3Vzb3V0LCByZW1vdmVGb2N1c291dCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXNvdXQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5sZXQgbWF4aW1pemVkTW9kYWxzID0gMFxuXG5jb25zdCBwb3NpdGlvbkNsYXNzID0ge1xuICBzdGFuZGFyZDogJ2ZpeGVkLWZ1bGwgZmxleC1jZW50ZXInLFxuICB0b3A6ICdmaXhlZC10b3AganVzdGlmeS1jZW50ZXInLFxuICBib3R0b206ICdmaXhlZC1ib3R0b20ganVzdGlmeS1jZW50ZXInLFxuICByaWdodDogJ2ZpeGVkLXJpZ2h0IGl0ZW1zLWNlbnRlcicsXG4gIGxlZnQ6ICdmaXhlZC1sZWZ0IGl0ZW1zLWNlbnRlcidcbn1cblxuY29uc3QgZGVmYXVsdFRyYW5zaXRpb25zID0ge1xuICBzdGFuZGFyZDogWyAnc2NhbGUnLCAnc2NhbGUnIF0sXG4gIHRvcDogWyAnc2xpZGUtZG93bicsICdzbGlkZS11cCcgXSxcbiAgYm90dG9tOiBbICdzbGlkZS11cCcsICdzbGlkZS1kb3duJyBdLFxuICByaWdodDogWyAnc2xpZGUtbGVmdCcsICdzbGlkZS1yaWdodCcgXSxcbiAgbGVmdDogWyAnc2xpZGUtcmlnaHQnLCAnc2xpZGUtbGVmdCcgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUURpYWxvZycsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlVHJhbnNpdGlvblByb3BzLFxuXG4gICAgdHJhbnNpdGlvblNob3c6IFN0cmluZywgLy8gb3ZlcnJpZGUgdXNlVHJhbnNpdGlvblByb3BzXG4gICAgdHJhbnNpdGlvbkhpZGU6IFN0cmluZywgLy8gb3ZlcnJpZGUgdXNlVHJhbnNpdGlvblByb3BzXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBhbGxvd0ZvY3VzT3V0c2lkZTogQm9vbGVhbixcblxuICAgIG5vRXNjRGlzbWlzczogQm9vbGVhbixcbiAgICBub0JhY2tkcm9wRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JvdXRlRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JlZm9jdXM6IEJvb2xlYW4sXG4gICAgbm9Gb2N1czogQm9vbGVhbixcbiAgICBub1NoYWtlOiBCb29sZWFuLFxuXG4gICAgc2VhbWxlc3M6IEJvb2xlYW4sXG5cbiAgICBtYXhpbWl6ZWQ6IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGZ1bGxIZWlnaHQ6IEJvb2xlYW4sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3N0YW5kYXJkJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsID0+IHZhbCA9PT0gJ3N0YW5kYXJkJ1xuICAgICAgICB8fCBbICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModmFsKVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ3NoYWtlJywgJ2NsaWNrJywgJ2VzY2FwZUtleSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpbm5lclJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgYW5pbWF0aW5nID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IHNoYWtlVGltZW91dCwgcmVmb2N1c1RhcmdldCA9IG51bGwsIGlzTWF4aW1pemVkLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBwcm9wcyxcbiAgICAgICgpID0+IGRlZmF1bHRUcmFuc2l0aW9uc1sgcHJvcHMucG9zaXRpb24gXVsgMCBdLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAxIF1cbiAgICApXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHBvcnRhbElzQWNjZXNzaWJsZSwgcmVuZGVyUG9ydGFsIH0gPSB1c2VQb3J0YWwoXG4gICAgICB2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsIC8qIHBscyBkbyBjaGVjayBpZiBvbiBhIGdsb2JhbCBkaWFsb2cgKi8gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGUsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGFkZFRvSGlzdG9yeSwgcmVtb3ZlRnJvbUhpc3RvcnkgfSA9IHVzZUhpc3Rvcnkoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRpYWxvZ19faW5uZXIgZmxleCBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLm1heGltaXplZCA9PT0gdHJ1ZSA/ICdtYXhpbWl6ZWQnIDogJ21pbmltaXplZCcgfWBcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLnBvc2l0aW9uIH0gJHsgcG9zaXRpb25DbGFzc1sgcHJvcHMucG9zaXRpb24gXSB9YFxuICAgICAgKyAoYW5pbWF0aW5nLnZhbHVlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWFuaW1hdGluZycgOiAnJylcbiAgICAgICsgKHByb3BzLmZ1bGxXaWR0aCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsd2lkdGgnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsSGVpZ2h0ID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWZ1bGxoZWlnaHQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tc3F1YXJlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHVzZUJhY2tkcm9wID0gY29tcHV0ZWQoKCkgPT4gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuYXV0b0Nsb3NlID09PSB0cnVlXG4gICAgICAgID8geyBvbkNsaWNrOiBvbkF1dG9DbG9zZSB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgY29uc3Qgcm9vdENsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiBbXG4gICAgICAncS1kaWFsb2cgZnVsbHNjcmVlbiBuby1wb2ludGVyLWV2ZW50cyAnXG4gICAgICAgICsgYHEtZGlhbG9nLS0keyB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZSA/ICdtb2RhbCcgOiAnc2VhbWxlc3MnIH1gLFxuICAgICAgYXR0cnMuY2xhc3NcbiAgICBdKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWF4aW1pemVkLCBzdGF0ZSA9PiB7XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1heGltaXplZChzdGF0ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2godXNlQmFja2Ryb3AsIHZhbCA9PiB7XG4gICAgICBwcmV2ZW50Qm9keVNjcm9sbCh2YWwpXG5cbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgYWRkRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBudWxsXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgdXBkYXRlTWF4aW1pemVkKHByb3BzLm1heGltaXplZClcbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBudWxsICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgICAgIHJlZ2lzdGVyVGljayhmb2N1cylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZW1vdmVUaWNrKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHZtLnByb3h5LiRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICB7IHRvcCwgYm90dG9tIH0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICB7IGlubmVySGVpZ2h0IH0gPSB3aW5kb3csXG4gICAgICAgICAgICAgIGhlaWdodCA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgPyB3aW5kb3cudmlzdWFsVmlld3BvcnQuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiBpbm5lckhlaWdodFxuXG4gICAgICAgICAgICBpZiAodG9wID4gMCAmJiBib3R0b20gPiBoZWlnaHQgLyAyKSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxIZWlnaHQgLSBoZWlnaHQsXG4gICAgICAgICAgICAgICAgYm90dG9tID49IGlubmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgICA/IEluZmluaXR5XG4gICAgICAgICAgICAgICAgICA6IE1hdGguY2VpbChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCArIGJvdHRvbSAtIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVxdWlyZWQgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiZG91YmxlLXRhcCBuZWVkZWRcIiBpc3N1ZVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gdHJ1ZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgYW5pbWF0aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICAgICAgY2xlYW51cCh0cnVlKVxuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGlmIChyZWZvY3VzVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICgoZXZ0ICYmIGV2dC50eXBlLmluZGV4T2YoJ2tleScpID09PSAwXG4gICAgICAgICAgPyByZWZvY3VzVGFyZ2V0LmNsb3Nlc3QoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScpXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgKSB8fCByZWZvY3VzVGFyZ2V0KS5mb2N1cygpXG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGFuaW1hdGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKHNlbGVjdG9yKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSAoc2VsZWN0b3IgIT09ICcnID8gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGwpXG4gICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdIFt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c10gW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpXG4gICAgICAgICAgfHwgbm9kZVxuICAgICAgICBub2RlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaGFrZSAoZm9jdXNUYXJnZXQpIHtcbiAgICAgIGlmIChmb2N1c1RhcmdldCAmJiB0eXBlb2YgZm9jdXNUYXJnZXQuZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZm9jdXNUYXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdzaGFrZScpXG5cbiAgICAgIGNvbnN0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3EtYW5pbWF0ZS0tc2NhbGUnKVxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ3EtYW5pbWF0ZS0tc2NhbGUnKVxuICAgICAgICBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuICAgICAgICBzaGFrZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoaW5uZXJSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgICAgICAvLyBzb21lIHBsYXRmb3JtcyAobGlrZSBkZXNrdG9wIENocm9tZSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmUgY2FsbGluZyBmb2N1cygpIGFnYWluXG4gICAgICAgICAgICBmb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxNzApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKCkge1xuICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ID09PSB0cnVlIHx8IHByb3BzLm5vRXNjRGlzbWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByb3BzLm1heGltaXplZCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub1NoYWtlICE9PSB0cnVlICYmIHNoYWtlKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWF4aW1pemVkKGZhbHNlKVxuXG4gICAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgIT09IHRydWUpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXhpbWl6ZWQgKGFjdGl2ZSkge1xuICAgICAgaWYgKGFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaXNNYXhpbWl6ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICBtYXhpbWl6ZWRNb2RhbHMgPCAxICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1kaWFsb2cnKVxuICAgICAgICAgIG1heGltaXplZE1vZGFscysrXG5cbiAgICAgICAgICBpc01heGltaXplZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNNYXhpbWl6ZWQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKG1heGltaXplZE1vZGFscyA8IDIpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZGlhbG9nJylcbiAgICAgICAgfVxuXG4gICAgICAgIG1heGltaXplZE1vZGFscy0tXG4gICAgICAgIGlzTWF4aW1pemVkID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkF1dG9DbG9zZSAoZSkge1xuICAgICAgaWYgKGF2b2lkQXV0b0Nsb3NlICE9PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoZSlcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmFja2Ryb3BDbGljayAoZSkge1xuICAgICAgaWYgKHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWUgJiYgcHJvcHMubm9CYWNrZHJvcERpc21pc3MgIT09IHRydWUpIHtcbiAgICAgICAgaGlkZShlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMubm9TaGFrZSAhPT0gdHJ1ZSkge1xuICAgICAgICBzaGFrZShlLnJlbGF0ZWRUYXJnZXQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c0NoYW5nZSAoZXZ0KSB7XG4gICAgICAvLyB0aGUgZm9jdXMgaXMgbm90IGluIGEgdnVlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5hbGxvd0ZvY3VzT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICAgIGZvY3VzLCBzaGFrZSxcblxuICAgICAgLy8gcHJpdmF0ZSBidXQgbmVlZGVkIGJ5IFFTZWxlY3RcbiAgICAgIF9fdXBkYXRlUmVmb2N1c1RhcmdldCAodGFyZ2V0KSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSB0YXJnZXQgfHwgbnVsbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgIGNvbnN0IGJhY2tkcm9wRXZ0ID0gdm0ucHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlID8gJ29uQ2xpY2snIDogJ29uRm9jdXNpbidcblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcm9sZTogJ2RpYWxvZycsXG4gICAgICAgICdhcmlhLW1vZGFsJzogdXNlQmFja2Ryb3AudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgY2xhc3M6IHJvb3RDbGFzc2VzLnZhbHVlXG4gICAgICB9LCBbXG4gICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgIG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnLFxuICAgICAgICAgIGFwcGVhcjogdHJ1ZVxuICAgICAgICB9LCAoKSA9PiAoXG4gICAgICAgICAgdXNlQmFja2Ryb3AudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ3EtZGlhbG9nX19iYWNrZHJvcCBmaXhlZC1mdWxsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIFsgYmFja2Ryb3BFdnQgXTogb25CYWNrZHJvcENsaWNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpLFxuXG4gICAgICAgIGgoXG4gICAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVXBkYXRlLCBvblVwZGF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFGaWVsZCBmcm9tICcuLi9maWVsZC9RRmllbGQuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRQ2hpcCBmcm9tICcuLi9jaGlwL1FDaGlwLmpzJ1xuXG5pbXBvcnQgUUl0ZW0gZnJvbSAnLi4vaXRlbS9RSXRlbS5qcydcbmltcG9ydCBRSXRlbVNlY3Rpb24gZnJvbSAnLi4vaXRlbS9RSXRlbVNlY3Rpb24uanMnXG5pbXBvcnQgUUl0ZW1MYWJlbCBmcm9tICcuLi9pdGVtL1FJdGVtTGFiZWwuanMnXG5cbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuaW1wb3J0IFFEaWFsb2cgZnJvbSAnLi4vZGlhbG9nL1FEaWFsb2cuanMnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWVsZC5qcydcbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGwsIHVzZVZpcnR1YWxTY3JvbGxQcm9wcyB9IGZyb20gJy4uL3ZpcnR1YWwtc2Nyb2xsL3VzZS12aXJ0dWFsLXNjcm9sbC5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUtleUNvbXBvc2l0aW9uIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBpc0RlZXBFcXVhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2lzLmpzJ1xuaW1wb3J0IHsgc3RvcCwgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IG5vcm1hbGl6ZVRvSW50ZXJ2YWwgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXksIGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSA9IHYgPT4gWyAnYWRkJywgJ2FkZC11bmlxdWUnLCAndG9nZ2xlJyBdLmluY2x1ZGVzKHYpXG5jb25zdCByZUVzY2FwZUxpc3QgPSAnLiorP14ke30oKXxbXVxcXFwnXG5jb25zdCBmaWVsZFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKHVzZUZpZWxkUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VsZWN0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG5cbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNwbGF5VmFsdWVIdG1sOiBCb29sZWFuLFxuICAgIGRyb3Bkb3duSWNvbjogU3RyaW5nLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG5cbiAgICBvcHRpb25WYWx1ZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgb3B0aW9uTGFiZWw6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkRpc2FibGU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuXG4gICAgaGlkZVNlbGVjdGVkOiBCb29sZWFuLFxuICAgIGhpZGVEcm9wZG93bkljb246IEJvb2xlYW4sXG4gICAgZmlsbElucHV0OiBCb29sZWFuLFxuXG4gICAgbWF4VmFsdWVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBvcHRpb25zRGVuc2U6IEJvb2xlYW4sXG4gICAgb3B0aW9uc0Rhcms6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBvcHRpb25zU2VsZWN0ZWRDbGFzczogU3RyaW5nLFxuICAgIG9wdGlvbnNIdG1sOiBCb29sZWFuLFxuXG4gICAgb3B0aW9uc0NvdmVyOiBCb29sZWFuLFxuXG4gICAgbWVudVNocmluazogQm9vbGVhbixcbiAgICBtZW51QW5jaG9yOiBTdHJpbmcsXG4gICAgbWVudVNlbGY6IFN0cmluZyxcbiAgICBtZW51T2Zmc2V0OiBBcnJheSxcblxuICAgIHBvcHVwQ29udGVudENsYXNzOiBTdHJpbmcsXG4gICAgcG9wdXBDb250ZW50U3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG5cbiAgICB1c2VJbnB1dDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcblxuICAgIG5ld1ZhbHVlTW9kZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU5ld1ZhbHVlTW9kZVxuICAgIH0sXG5cbiAgICBtYXBPcHRpb25zOiBCb29sZWFuLFxuICAgIGVtaXRWYWx1ZTogQm9vbGVhbixcblxuICAgIGlucHV0RGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IDUwMFxuICAgIH0sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICB0YWJpbmRleDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhdXRvY29tcGxldGU6IFN0cmluZyxcblxuICAgIHRyYW5zaXRpb25TaG93OiBTdHJpbmcsXG4gICAgdHJhbnNpdGlvbkhpZGU6IFN0cmluZyxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGJlaGF2aW9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVmYXVsdCcsICdtZW51JywgJ2RpYWxvZycgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0J1xuICAgIH0sXG5cbiAgICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemU6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG5cbiAgICBvbk5ld1ZhbHVlOiBGdW5jdGlvbixcbiAgICBvbkZpbHRlcjogRnVuY3Rpb25cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ2FkZCcsICdyZW1vdmUnLCAnaW5wdXRWYWx1ZScsICduZXdWYWx1ZScsXG4gICAgJ2tleXVwJywgJ2tleXByZXNzJywgJ2tleWRvd24nLFxuICAgICdmaWx0ZXJBYm9ydCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IG1lbnUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gcmVmKC0xKVxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSByZWYoJycpXG4gICAgY29uc3QgZGlhbG9nRmllbGRGb2N1c2VkID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGlubmVyTG9hZGluZ0luZGljYXRvciA9IHJlZihmYWxzZSlcblxuICAgIGxldCBpbnB1dFRpbWVyLCBpbm5lclZhbHVlQ2FjaGUsXG4gICAgICBoYXNEaWFsb2csIHVzZXJJbnB1dFZhbHVlLCBmaWx0ZXJJZCwgZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLCBzZWFyY2hCdWZmZXIsIHNlYXJjaEJ1ZmZlckV4cFxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZGlhbG9nUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudUNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxMZW5ndGggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpXG4gICAgICAgID8gcHJvcHMub3B0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDBcbiAgICAgICAgPyAocHJvcHMub3B0aW9uc0RlbnNlID09PSB0cnVlID8gMjQgOiA0OClcbiAgICAgICAgOiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemVcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplXG4gICAgfSA9IHVzZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICAgICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWRcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlubmVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBtYXBOdWxsID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSxcbiAgICAgICAgdmFsID0gcHJvcHMubW9kZWxWYWx1ZSAhPT0gdm9pZCAwICYmIChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsIHx8IG1hcE51bGwgPT09IHRydWUpXG4gICAgICAgICAgPyAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA/IHByb3BzLm1vZGVsVmFsdWUgOiBbIHByb3BzLm1vZGVsVmFsdWUgXSlcbiAgICAgICAgICA6IFtdXG5cbiAgICAgIGlmIChwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIGlubmVyVmFsdWVDYWNoZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBpbm5lclZhbHVlQ2FjaGVcbiAgICAgICAgICA6IFtdXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbC5tYXAodiA9PiBnZXRPcHRpb24odiwgY2FjaGUpKVxuXG4gICAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsICYmIG1hcE51bGwgPT09IHRydWVcbiAgICAgICAgICA/IHZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSBudWxsKVxuICAgICAgICAgIDogdmFsdWVzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJGaWVsZFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIGZpZWxkUHJvcHNMaXN0LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHNbIGtleSBdXG4gICAgICAgIGlmICh2YWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNPcHRpb25zRGFyayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNEYXJrID09PSBudWxsXG4gICAgICAgID8gc3RhdGUuaXNEYXJrLnZhbHVlXG4gICAgICAgIDogcHJvcHMub3B0aW9uc0RhcmtcbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBjb21wdXRlZElucHV0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzID0gJ3EtZmllbGRfX2lucHV0IHEtcGxhY2Vob2xkZXIgY29sJ1xuXG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlIHx8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgICB9XG5cbiAgICAgIGNscyArPSAnIHEtZmllbGRfX2lucHV0LS1wYWRkaW5nJ1xuXG4gICAgICByZXR1cm4gcHJvcHMuaW5wdXRDbGFzcyA9PT0gdm9pZCAwXG4gICAgICAgID8gY2xzXG4gICAgICAgIDogWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgIH0pXG5cbiAgICBjb25zdCBtZW51Q29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdxLXZpcnR1YWwtc2Nyb2xsLS1ob3Jpem9udGFsJyA6ICcnKVxuICAgICAgKyAocHJvcHMucG9wdXBDb250ZW50Q2xhc3MgPyAnICcgKyBwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG5vT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAob3B0ID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgYXJpYUN1cnJlbnRWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgIDogc2VsZWN0ZWRTdHJpbmcudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3QgbmVlZHNIdG1sRm4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICA/ICgpID0+IHRydWVcbiAgICAgICAgOiBvcHQgPT4gb3B0ICE9PSB2b2lkIDAgJiYgb3B0ICE9PSBudWxsICYmIG9wdC5odG1sID09PSB0cnVlXG4gICAgKSlcblxuICAgIGNvbnN0IHZhbHVlQXNIdG1sID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzcGxheVZhbHVlSHRtbCA9PT0gdHJ1ZSB8fCAoXG4gICAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZSA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IGlubmVyVmFsdWUudmFsdWUuc29tZShuZWVkc0h0bWxGbi52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggOiAtMSkpXG5cbiAgICBjb25zdCBjb21ib2JveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ2xpc3QnIDogJ25vbmUnLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmBcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3Rib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0pKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLm1hcCgob3B0LCBpKSA9PiAoe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgb3B0LFxuICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgcmVtb3ZlQXRJbmRleDogcmVtb3ZlQXRJbmRleEFuZEZvY3VzLFxuICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZVxuICAgICAgfSkpXG4gICAgfSlcblxuICAgIGNvbnN0IG9wdGlvblNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlXG5cbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLnNsaWNlKGZyb20sIHRvKS5tYXAoKG9wdCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBkaXNhYmxlID0gaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZnJvbSArIGlcblxuICAgICAgICBjb25zdCBpdGVtUHJvcHMgPSB7XG4gICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbWFudWFsRm9jdXM6IHRydWUsXG4gICAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLm9wdGlvbnNEZW5zZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICAgICAgIGlkOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgaW5kZXggfWAsXG4gICAgICAgICAgb25DbGljazogKCkgPT4geyB0b2dnbGVPcHRpb24ob3B0KSB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZSAmJiAoaXRlbVByb3BzLmFjdGl2ZSA9IHRydWUpXG4gICAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPT09IGluZGV4ICYmIChpdGVtUHJvcHMuZm9jdXNlZCA9IHRydWUpXG5cbiAgICAgICAgICBpdGVtUHJvcHNbICdhcmlhLXNlbGVjdGVkJyBdID0gaXRlbVByb3BzLmFjdGl2ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSdcblxuICAgICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpdGVtUHJvcHMub25Nb3VzZW1vdmUgPSAoKSA9PiB7IG1lbnUudmFsdWUgPT09IHRydWUgJiYgc2V0T3B0aW9uSW5kZXgoaW5kZXgpIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICAgIGxhYmVsOiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtUHJvcHMuYWN0aXZlLFxuICAgICAgICAgIGZvY3VzZWQ6IGl0ZW1Qcm9wcy5mb2N1c2VkLFxuICAgICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgICBzZXRPcHRpb25JbmRleCxcbiAgICAgICAgICBpdGVtUHJvcHNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgZHJvcGRvd25BcnJvd0ljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kcm9wZG93bkljb24gIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRyb3Bkb3duSWNvblxuICAgICAgICA6ICRxLmljb25TZXQuYXJyb3cuZHJvcGRvd25cbiAgICApKVxuXG4gICAgY29uc3Qgc3F1YXJlZE1lbnUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9uc0NvdmVyID09PSBmYWxzZVxuICAgICAgJiYgcHJvcHMub3V0bGluZWQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnN0YW5kb3V0ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ib3JkZXJsZXNzICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5yb3VuZGVkICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzc1xuICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IHZhbHVlIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi12YWx1ZScgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvblZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uVmFsdWUsICd2YWx1ZScpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IGxhYmVsIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1sYWJlbCcgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvbkxhYmVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uTGFiZWwsICdsYWJlbCcpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gdGVsbCBpZiBhbiBvcHRpb24gaXMgZGlzYWJsZWQ7XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tZGlzYWJsZScgcHJvcFxuICAgIGNvbnN0IGlzT3B0aW9uRGlzYWJsZWQgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25EaXNhYmxlLCAnZGlzYWJsZScpKVxuXG4gICAgY29uc3QgaW5uZXJPcHRpb25zVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBpbm5lclZhbHVlLnZhbHVlLm1hcChvcHQgPT4gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KSkpXG5cbiAgICBjb25zdCBpbnB1dENvbnRyb2xFdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZTogb25Db21wb3NpdGlvbixcbiAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlLFxuICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzLFxuICAgICAgICBvbkZvY3VzOiBzZWxlY3RJbnB1dFRleHQsXG4gICAgICAgIG9uQ2xpY2sgKGUpIHsgaGFzRGlhbG9nID09PSB0cnVlICYmIHN0b3AoZSkgfVxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICB3YXRjaChpbm5lclZhbHVlLCB2YWwgPT4ge1xuICAgICAgaW5uZXJWYWx1ZUNhY2hlID0gdmFsXG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgIC8vIFByZXZlbnQgcmUtZW50ZXJpbmcgaW4gZmlsdGVyIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAvLyBBbHNvIHByZXZlbnQgY2xlYXJpbmcgaW5wdXRWYWx1ZSB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmICgoZGlhbG9nLnZhbHVlICE9PSB0cnVlICYmIG1lbnUudmFsdWUgIT09IHRydWUpIHx8IGhhc1ZhbHVlLnZhbHVlICE9PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlICYmIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUgfHwgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpbHRlcignJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsSW5wdXQsIHJlc2V0SW5wdXRWYWx1ZSlcblxuICAgIHdhdGNoKG1lbnUsIHVwZGF0ZU1lbnUpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCByZXJlbmRlck1lbnUpXG5cbiAgICBmdW5jdGlvbiBnZXRFbWl0dGluZ09wdGlvblZhbHVlIChvcHQpIHtcbiAgICAgIHJldHVybiBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICAgIDogb3B0XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA+IC0xICYmIGluZGV4IDwgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKClcbiAgICAgICAgICBlbWl0KCdyZW1vdmUnLCB7IGluZGV4LCB2YWx1ZTogbW9kZWwuc3BsaWNlKGluZGV4LCAxKVsgMCBdIH0pXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4QW5kRm9jdXMgKGluZGV4KSB7XG4gICAgICByZW1vdmVBdEluZGV4KGluZGV4KVxuICAgICAgc3RhdGUuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCAob3B0LCB1bmlxdWUpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldEVtaXR0aW5nT3B0aW9uVmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlICYmIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgICAgZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IDAsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IFsgdmFsIF0gOiB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodW5pcXVlID09PSB0cnVlICYmIGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm1heFZhbHVlcyAhPT0gdm9pZCAwICYmIHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoID49IHByb3BzLm1heFZhbHVlcykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKClcblxuICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogbW9kZWwubGVuZ3RoLCB2YWx1ZTogdmFsIH0pXG4gICAgICBtb2RlbC5wdXNoKHZhbClcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlT3B0aW9uIChvcHQsIGtlZXBPcGVuKSB7XG4gICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWUgfHwgb3B0ID09PSB2b2lkIDAgfHwgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBvcHRWYWx1ZSA9IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChrZWVwT3BlbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHVwZGF0ZUlucHV0VmFsdWUoXG4gICAgICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgPyBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpIDogJycsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgIClcblxuICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICB8fCBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pLCBvcHRWYWx1ZSkgIT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWUgPyBvcHRWYWx1ZSA6IG9wdClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgKGhhc0RpYWxvZyAhPT0gdHJ1ZSB8fCBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUpICYmIHN0YXRlLmZvY3VzKClcblxuICAgICAgc2VsZWN0SW5wdXRUZXh0KClcblxuICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG4gICAgICAgIGVtaXQoJ2FkZCcsIHsgaW5kZXg6IDAsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/IFsgdmFsIF0gOiB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKSxcbiAgICAgICAgaW5kZXggPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbCh2LCBvcHRWYWx1ZSkpXG5cbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAocHJvcHMubWF4VmFsdWVzICE9PSB2b2lkIDAgJiYgbW9kZWwubGVuZ3RoID49IHByb3BzLm1heFZhbHVlcykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHRcblxuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiBtb2RlbC5sZW5ndGgsIHZhbHVlOiB2YWwgfSlcbiAgICAgICAgbW9kZWwucHVzaCh2YWwpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T3B0aW9uSW5kZXggKGluZGV4KSB7XG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMuZGVza3RvcCAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdCB2YWwgPSBpbmRleCA+IC0xICYmIGluZGV4IDwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZVxuICAgICAgICA/IGluZGV4XG4gICAgICAgIDogLTFcblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlT3B0aW9uU2VsZWN0aW9uIChvZmZzZXQgPSAxLCBza2lwSW5wdXRWYWx1ZSkge1xuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9uSW5kZXgudmFsdWVcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGluZGV4ID0gbm9ybWFsaXplVG9JbnRlcnZhbChcbiAgICAgICAgICAgIGluZGV4ICsgb2Zmc2V0LFxuICAgICAgICAgICAgLTEsXG4gICAgICAgICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBvcHRpb25JbmRleC52YWx1ZSAmJiBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pID09PSB0cnVlKVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBzZXRPcHRpb25JbmRleChpbmRleClcbiAgICAgICAgICBzY3JvbGxUbyhpbmRleClcblxuICAgICAgICAgIGlmIChza2lwSW5wdXRWYWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNldElucHV0VmFsdWUoaW5kZXggPj0gMFxuICAgICAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pXG4gICAgICAgICAgICAgIDogZGVmYXVsdElucHV0VmFsdWVcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb24gKHZhbHVlLCB2YWx1ZUNhY2hlKSB7XG4gICAgICBjb25zdCBmbiA9IG9wdCA9PiBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpLCB2YWx1ZSlcbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLmZpbmQoZm4pIHx8IHZhbHVlQ2FjaGUuZmluZChmbikgfHwgdmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wVmFsdWVGbiAocHJvcFZhbHVlLCBkZWZhdWx0VmFsKSB7XG4gICAgICBjb25zdCB2YWwgPSBwcm9wVmFsdWUgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BWYWx1ZVxuICAgICAgICA6IGRlZmF1bHRWYWxcblxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB2YWxcbiAgICAgICAgOiBvcHQgPT4gKG9wdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0ID09PSAnb2JqZWN0JyAmJiB2YWwgaW4gb3B0ID8gb3B0WyB2YWwgXSA6IG9wdClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09wdGlvblNlbGVjdGVkIChvcHQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcbiAgICAgIHJldHVybiBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5maW5kKHYgPT4gaXNEZWVwRXF1YWwodiwgdmFsKSkgIT09IHZvaWQgMFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbGVjdElucHV0VGV4dCAoZSkge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgKGUgPT09IHZvaWQgMCB8fCAodGFyZ2V0UmVmLnZhbHVlID09PSBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSA9PT0gc2VsZWN0ZWRTdHJpbmcudmFsdWUpKVxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5zZWxlY3QoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5dXAgKGUpIHtcbiAgICAgIC8vIGlmIEVTQyBhbmQgd2UgaGF2ZSBhbiBvcGVuZWQgbWVudVxuICAgICAgLy8gdGhlbiBzdG9wIHByb3BhZ2F0aW9uIChtaWdodCBiZSBjYXVnaHQgYnkgYSBRRGlhbG9nXG4gICAgICAvLyBhbmQgc28gaXQgd2lsbCBhbHNvIGNsb3NlIHRoZSBRRGlhbG9nLCB3aGljaCBpcyB3cm9uZylcbiAgICAgIGlmIChpc0tleUNvZGUoZSwgMjcpID09PSB0cnVlICYmIG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RvcChlKVxuICAgICAgICAvLyBvbiBFU0Mgd2UgbmVlZCB0byBjbG9zZSB0aGUgZGlhbG9nIGFsc29cbiAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgIH1cblxuICAgICAgZW1pdCgna2V5dXAnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0QXV0b2NvbXBsZXRlIChlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldFxuXG4gICAgICBpZiAoZS5rZXlDb2RlICE9PSB2b2lkIDApIHtcbiAgICAgICAgb25UYXJnZXRLZXl1cChlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZS50YXJnZXQudmFsdWUgPSAnJ1xuICAgICAgY2xlYXJUaW1lb3V0KGlucHV0VGltZXIpXG4gICAgICByZXNldElucHV0VmFsdWUoKVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgY29uc3QgZmluZEZuID0gZXh0cmFjdEZuID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb24gPSBwcm9wcy5vcHRpb25zLmZpbmQob3B0ID0+IGV4dHJhY3RGbi52YWx1ZShvcHQpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IG5lZWRsZSlcblxuICAgICAgICAgIGlmIChvcHRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUuaW5kZXhPZihvcHRpb24pID09PSAtMSkge1xuICAgICAgICAgICAgdG9nZ2xlT3B0aW9uKG9wdGlvbilcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsbEZuID0gYWZ0ZXJGaWx0ZXIgPT4ge1xuICAgICAgICAgIGlmIChmaW5kRm4oZ2V0T3B0aW9uVmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpbmRGbihnZXRPcHRpb25MYWJlbCkgPT09IHRydWUgfHwgYWZ0ZXJGaWx0ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbHRlcih2YWx1ZSwgdHJ1ZSwgKCkgPT4gZmlsbEZuKHRydWUpKVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsbEZuKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5jbGVhclZhbHVlKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXlwcmVzcyAoZSkge1xuICAgICAgZW1pdCgna2V5cHJlc3MnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5ZG93biAoZSkge1xuICAgICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlTW9kZVZhbGlkID0gaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICYmIChwcm9wcy5uZXdWYWx1ZU1vZGUgIT09IHZvaWQgMCB8fCBwcm9wcy5vbk5ld1ZhbHVlICE9PSB2b2lkIDApXG5cbiAgICAgIGNvbnN0IHRhYlNob3VsZFNlbGVjdCA9IGUuc2hpZnRLZXkgIT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgJiYgKG9wdGlvbkluZGV4LnZhbHVlID4gLTEgfHwgbmV3VmFsdWVNb2RlVmFsaWQgPT09IHRydWUpXG5cbiAgICAgIC8vIGVzY2FwZVxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgcHJldmVudChlKSAvLyBwcmV2ZW50IGNsZWFyaW5nIHRoZSBpbnB1dFZhbHVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyB0YWJcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDkgJiYgdGFiU2hvdWxkU2VsZWN0ID09PSBmYWxzZSkge1xuICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ID09PSB2b2lkIDAgfHwgZS50YXJnZXQuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSkgeyByZXR1cm4gfVxuXG4gICAgICAvLyBkb3duXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gNDBcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIG1lbnUudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGJhY2tzcGFjZVxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDhcbiAgICAgICAgJiYgcHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlXG4gICAgICAgICYmIGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZW1vdmVBdEluZGV4KHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIC0gMSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBob21lLCBlbmQgLSAzNiwgMzVcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzUgfHwgZS5rZXlDb2RlID09PSAzNilcbiAgICAgICAgJiYgKHR5cGVvZiBpbnB1dFZhbHVlLnZhbHVlICE9PSAnc3RyaW5nJyB8fCBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IC0xXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzNiA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHBnIHVwLCBwZyBkb3duIC0gMzMsIDM0XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDMzIHx8IGUua2V5Q29kZSA9PT0gMzQpXG4gICAgICAgICYmIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSBNYXRoLm1heChcbiAgICAgICAgICAtMSxcbiAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUsXG4gICAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSArIChlLmtleUNvZGUgPT09IDMzID8gLTEgOiAxKSAqIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS52aWV3XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzMyA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHVwLCBkb3duXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzOCA/IC0xIDogMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG5cbiAgICAgIC8vIGNsZWFyIHNlYXJjaCBidWZmZXIgaWYgZXhwaXJlZFxuICAgICAgaWYgKHNlYXJjaEJ1ZmZlciA9PT0gdm9pZCAwIHx8IHNlYXJjaEJ1ZmZlckV4cCA8IERhdGUubm93KCkpIHtcbiAgICAgICAgc2VhcmNoQnVmZmVyID0gJydcbiAgICAgIH1cblxuICAgICAgLy8ga2V5Ym9hcmQgc2VhcmNoIHdoZW4gbm90IGhhdmluZyB1c2UtaW5wdXRcbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9uc0xlbmd0aCA+IDBcbiAgICAgICAgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWVcbiAgICAgICAgJiYgZS5rZXkgIT09IHZvaWQgMFxuICAgICAgICAmJiBlLmtleS5sZW5ndGggPT09IDEgLy8gcHJpbnRhYmxlIGNoYXJcbiAgICAgICAgJiYgZS5hbHRLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgZS5jdHJsS2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0XG4gICAgICAgICYmIGUubWV0YUtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dCwgZXNwZWNpYWxseSBvbiBtYWNPUyB3aXRoIENvbW1hbmQga2V5XG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHNlYXJjaEJ1ZmZlci5sZW5ndGggPiAwKSAvLyBzcGFjZSBpbiBtaWRkbGUgb2Ygc2VhcmNoXG4gICAgICApIHtcbiAgICAgICAgbWVudS52YWx1ZSAhPT0gdHJ1ZSAmJiBzaG93UG9wdXAoZSlcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIGNoYXIgPSBlLmtleS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICAgIGtleVJlcGVhdCA9IHNlYXJjaEJ1ZmZlci5sZW5ndGggPT09IDEgJiYgc2VhcmNoQnVmZmVyWyAwIF0gPT09IGNoYXJcblxuICAgICAgICBzZWFyY2hCdWZmZXJFeHAgPSBEYXRlLm5vdygpICsgMTUwMFxuICAgICAgICBpZiAoa2V5UmVwZWF0ID09PSBmYWxzZSkge1xuICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgc2VhcmNoQnVmZmVyICs9IGNoYXJcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlID0gbmV3IFJlZ0V4cCgnXicgKyBzZWFyY2hCdWZmZXIuc3BsaXQoJycpLm1hcChsID0+IChyZUVzY2FwZUxpc3QuaW5kZXhPZihsKSA+IC0xID8gJ1xcXFwnICsgbCA6IGwpKS5qb2luKCcuKicpLCAnaScpXG5cbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9uSW5kZXgudmFsdWVcblxuICAgICAgICBpZiAoa2V5UmVwZWF0ID09PSB0cnVlIHx8IGluZGV4IDwgMCB8fCBzZWFyY2hSZS50ZXN0KGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGluZGV4ID0gbm9ybWFsaXplVG9JbnRlcnZhbChpbmRleCArIDEsIC0xLCBvcHRpb25zTGVuZ3RoIC0gMSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGluZGV4ICE9PSBvcHRpb25JbmRleC52YWx1ZSAmJiAoXG4gICAgICAgICAgICBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pID09PSB0cnVlXG4gICAgICAgICAgICB8fCBzZWFyY2hSZS50ZXN0KGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pKSAhPT0gdHJ1ZVxuICAgICAgICAgICkpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgc2V0T3B0aW9uSW5kZXgoaW5kZXgpXG4gICAgICAgICAgICBzY3JvbGxUbyhpbmRleClcblxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNldElucHV0VmFsdWUoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBlbnRlciwgc3BhY2UgKHdoZW4gbm90IHVzaW5nIHVzZS1pbnB1dCBhbmQgbm90IGluIHNlYXJjaCksIG9yIHRhYiAod2hlbiBub3QgdXNpbmcgbXVsdGlwbGUgYW5kIG9wdGlvbiBzZWxlY3RlZClcbiAgICAgIC8vIHNhbWUgdGFyZ2V0IGlzIGNoZWNrZWQgYWJvdmVcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlICE9PSAxM1xuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSAzMiB8fCBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBzZWFyY2hCdWZmZXIgIT09ICcnKVxuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSA5IHx8IHRhYlNob3VsZFNlbGVjdCA9PT0gZmFsc2UpXG4gICAgICApIHsgcmV0dXJuIH1cblxuICAgICAgZS5rZXlDb2RlICE9PSA5ICYmIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSA+IC0xICYmIG9wdGlvbkluZGV4LnZhbHVlIDwgb3B0aW9uc0xlbmd0aCkge1xuICAgICAgICB0b2dnbGVPcHRpb24ocHJvcHMub3B0aW9uc1sgb3B0aW9uSW5kZXgudmFsdWUgXSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZU1vZGVWYWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBkb25lID0gKHZhbCwgbW9kZSkgPT4ge1xuICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGVOZXdWYWx1ZU1vZGUobW9kZSkgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kZSA9IHByb3BzLm5ld1ZhbHVlTW9kZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHVwZGF0ZUlucHV0VmFsdWUoJycsIHByb3BzLm11bHRpcGxlICE9PSB0cnVlLCB0cnVlKVxuXG4gICAgICAgICAgY29uc3QgZm4gPSBtb2RlID09PSAndG9nZ2xlJyA/IHRvZ2dsZU9wdGlvbiA6IGFkZFxuICAgICAgICAgIGZuKHZhbCwgbW9kZSA9PT0gJ2FkZC11bmlxdWUnKVxuXG4gICAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm9uTmV3VmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGVtaXQoJ25ld1ZhbHVlJywgaW5wdXRWYWx1ZS52YWx1ZSwgZG9uZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb25lKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHNob3dQb3B1cCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbEVsICgpIHtcbiAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyBtZW51Q29udGVudFJlZi52YWx1ZVxuICAgICAgICA6IChcbiAgICAgICAgICAgIG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5jb250ZW50RWwgIT09IG51bGxcbiAgICAgICAgICAgICAgPyBtZW51UmVmLnZhbHVlLmNvbnRlbnRFbFxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIHJldHVybiBnZXRWaXJ0dWFsU2Nyb2xsRWwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGlvbiAoKSB7XG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKHNjb3BlID0+IHNsb3RzWyAnc2VsZWN0ZWQtaXRlbScgXShzY29wZSkpLnNsaWNlKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNsb3RzLnNlbGVjdGVkICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChzbG90cy5zZWxlY3RlZCgpKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUudmFsdWUubWFwKChzY29wZSwgaSkgPT4gaChRQ2hpcCwge1xuICAgICAgICAgIGtleTogJ29wdGlvbi0nICsgaSxcbiAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUoc2NvcGUub3B0KSAhPT0gdHJ1ZSxcbiAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZSxcbiAgICAgICAgICBvblJlbW92ZSAoKSB7IHNjb3BlLnJlbW92ZUF0SW5kZXgoaSkgfVxuICAgICAgICB9LCAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBnZXRPcHRpb25MYWJlbC52YWx1ZShzY29wZS5vcHQpXG4gICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICBbIHZhbHVlQXNIdG1sLnZhbHVlID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IGFyaWFDdXJyZW50VmFsdWUudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxPcHRpb25zICgpIHtcbiAgICAgIGlmIChub09wdGlvbnMudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdKHsgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSB9KVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gc2xvdHMub3B0aW9uICE9PSB2b2lkIDBcbiAgICAgICAgPyBzbG90cy5vcHRpb25cbiAgICAgICAgOiBzY29wZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGgoUUl0ZW0sIHtcbiAgICAgICAgICAgIGtleTogc2NvcGUuaW5kZXgsXG4gICAgICAgICAgICAuLi5zY29wZS5pdGVtUHJvcHNcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICAgICAgUUl0ZW1TZWN0aW9uLFxuICAgICAgICAgICAgICAoKSA9PiBoKFxuICAgICAgICAgICAgICAgIFFJdGVtTGFiZWwsXG4gICAgICAgICAgICAgICAgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgIFsgc2NvcGUuaHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBzY29wZS5sYWJlbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gcGFkVmlydHVhbFNjcm9sbCgnZGl2Jywgb3B0aW9uU2NvcGUudmFsdWUubWFwKGZuKSlcblxuICAgICAgaWYgKHNsb3RzWyAnYmVmb3JlLW9wdGlvbnMnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0gc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSgpLmNvbmNhdChvcHRpb25zKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90c1sgJ2FmdGVyLW9wdGlvbnMnIF0sIG9wdGlvbnMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW5wdXQgKGZyb21EaWFsb2csIGlzVGFyZ2V0KSB7XG4gICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8geyAuLi5jb21ib2JveEF0dHJzLnZhbHVlLCAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUgfSA6IHZvaWQgMFxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICBrZXk6ICdpX3QnLFxuICAgICAgICBjbGFzczogY29tcHV0ZWRJbnB1dENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgdmFsdWU6IGlucHV0VmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlucHV0VmFsdWUudmFsdWUgOiAnJyxcbiAgICAgICAgLy8gcmVxdWlyZWQgZm9yIEFuZHJvaWQgaW4gb3JkZXIgdG8gc2hvdyBFTlRFUiBrZXkgd2hlbiBpbiBmb3JtXG4gICAgICAgIHR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgaWQ6IGlzVGFyZ2V0ID09PSB0cnVlID8gc3RhdGUudGFyZ2V0VWlkLnZhbHVlIDogdm9pZCAwLFxuICAgICAgICBtYXhsZW5ndGg6IHByb3BzLm1heGxlbmd0aCxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiBwcm9wcy5hdXRvY29tcGxldGUsXG4gICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IGZyb21EaWFsb2cgPT09IHRydWUgfHwgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGUgPT09IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSxcbiAgICAgICAgLi4uaW5wdXRDb250cm9sRXZlbnRzLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tRGlhbG9nICE9PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLmNsYXNzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGRhdGEuY2xhc3MgPSBbIC4uLmRhdGEuY2xhc3MsICduby1wb2ludGVyLWV2ZW50cycgXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRhdGEuY2xhc3MgKz0gJyBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnaW5wdXQnLCBkYXRhKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSW5wdXQgKGUpIHtcbiAgICAgIGNsZWFyVGltZW91dChpbnB1dFRpbWVyKVxuXG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5xQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBzZXRJbnB1dFZhbHVlKGUudGFyZ2V0LnZhbHVlIHx8ICcnKVxuICAgICAgLy8gbWFyayBpdCBoZXJlIGFzIHVzZXIgaW5wdXQgc28gdGhhdCBpZiB1cGRhdGVJbnB1dFZhbHVlIGlzIGNhbGxlZFxuICAgICAgLy8gYmVmb3JlIGZpbHRlciBpcyBjYWxsZWQgdGhlIGluZGljYXRvciBpcyByZXNldFxuICAgICAgdXNlcklucHV0VmFsdWUgPSB0cnVlXG4gICAgICBkZWZhdWx0SW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudmFsdWVcblxuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIChoYXNEaWFsb2cgIT09IHRydWUgfHwgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgaW5wdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZpbHRlcihpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgICB9LCBwcm9wcy5pbnB1dERlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldElucHV0VmFsdWUgKHZhbCkge1xuICAgICAgaWYgKGlucHV0VmFsdWUudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBpbnB1dFZhbHVlLnZhbHVlID0gdmFsXG4gICAgICAgIGVtaXQoJ2lucHV0VmFsdWUnLCB2YWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlSW5wdXRWYWx1ZSAodmFsLCBub0ZpbHRlcmluZywgaW50ZXJuYWwpIHtcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gaW50ZXJuYWwgIT09IHRydWVcblxuICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgIHNldElucHV0VmFsdWUodmFsKVxuXG4gICAgICAgIGlmIChub0ZpbHRlcmluZyA9PT0gdHJ1ZSB8fCBpbnRlcm5hbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gdmFsXG4gICAgICAgIH1cblxuICAgICAgICBub0ZpbHRlcmluZyAhPT0gdHJ1ZSAmJiBmaWx0ZXIodmFsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlciAodmFsLCBrZWVwQ2xvc2VkLCBhZnRlclVwZGF0ZUZuKSB7XG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgPT09IHZvaWQgMCB8fCAoa2VlcENsb3NlZCAhPT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdmFsICE9PSAnJ1xuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgJiYgdXNlcklucHV0VmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgdmFsID09PSBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pXG4gICAgICApIHtcbiAgICAgICAgdmFsID0gJydcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYWxGaWx0ZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIChtZW51LnZhbHVlID0gZmFsc2UpXG4gICAgICB9LCAxMClcblxuICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgZmlsdGVySWQgPSBsb2NhbEZpbHRlcklkXG5cbiAgICAgIGVtaXQoXG4gICAgICAgICdmaWx0ZXInLFxuICAgICAgICB2YWwsXG4gICAgICAgIChmbiwgYWZ0ZXJGbikgPT4ge1xuICAgICAgICAgIGlmICgoa2VlcENsb3NlZCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuXG4gICAgICAgICAgICB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oKVxuXG4gICAgICAgICAgICAvLyBoaWRlIGluZGljYXRvciB0byBhbGxvdyBhcnJvdyB0byBhbmltYXRlXG4gICAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtlZXBDbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgaGlkZVBvcHVwKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlckZuKHByb3h5KSB9KVxuICAgICAgICAgICAgICB0eXBlb2YgYWZ0ZXJVcGRhdGVGbiA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0VGljaygoKSA9PiB7IGFmdGVyVXBkYXRlRm4ocHJveHkpIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlICYmIGZpbHRlcklkID09PSBsb2NhbEZpbHRlcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWVudSAoKSB7XG4gICAgICByZXR1cm4gaChRTWVudSwge1xuICAgICAgICByZWY6IG1lbnVSZWYsXG4gICAgICAgIGNsYXNzOiBtZW51Q29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgIG1vZGVsVmFsdWU6IG1lbnUudmFsdWUsXG4gICAgICAgIGZpdDogcHJvcHMubWVudVNocmluayAhPT0gdHJ1ZSxcbiAgICAgICAgY292ZXI6IHByb3BzLm9wdGlvbnNDb3ZlciA9PT0gdHJ1ZSAmJiBub09wdGlvbnMudmFsdWUgIT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWUsXG4gICAgICAgIGFuY2hvcjogcHJvcHMubWVudUFuY2hvcixcbiAgICAgICAgc2VsZjogcHJvcHMubWVudVNlbGYsXG4gICAgICAgIG9mZnNldDogcHJvcHMubWVudU9mZnNldCxcbiAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgbm9QYXJlbnRFdmVudDogdHJ1ZSxcbiAgICAgICAgbm9SZWZvY3VzOiB0cnVlLFxuICAgICAgICBub0ZvY3VzOiB0cnVlLFxuICAgICAgICBzcXVhcmU6IHNxdWFyZWRNZW51LnZhbHVlLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogcHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogdHJ1ZSxcbiAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25NZW51QmVmb3JlSGlkZSxcbiAgICAgICAgb25TaG93OiBvbk1lbnVTaG93XG4gICAgICB9LCBnZXRBbGxPcHRpb25zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudUJlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVTaG93ICgpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkRm9jdXMgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkQmx1ciAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREaWFsb2cgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaChRRmllbGQsIHtcbiAgICAgICAgICBjbGFzczogYGNvbC1hdXRvICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAsXG4gICAgICAgICAgLi4uaW5uZXJGaWVsZFByb3BzLnZhbHVlLFxuICAgICAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgc3F1YXJlOiB0cnVlLFxuICAgICAgICAgIGxvYWRpbmc6IGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSxcbiAgICAgICAgICBpdGVtQWxpZ25lZDogZmFsc2UsXG4gICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgIHN0YWNrTGFiZWw6IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID4gMCxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgICBvbkZvY3VzOiBvbkRpYWxvZ0ZpZWxkRm9jdXMsXG4gICAgICAgICAgb25CbHVyOiBvbkRpYWxvZ0ZpZWxkQmx1clxuICAgICAgICB9LCB7XG4gICAgICAgICAgLi4uc2xvdHMsXG4gICAgICAgICAgcmF3Q29udHJvbDogKCkgPT4gc3RhdGUuZ2V0Q29udHJvbCh0cnVlKSxcbiAgICAgICAgICBiZWZvcmU6IHZvaWQgMCxcbiAgICAgICAgICBhZnRlcjogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgY29udGVudC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBtZW51Q29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSArICcgc2Nyb2xsJyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnQsXG4gICAgICAgICAgb25TY3JvbGxQYXNzaXZlOiBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICAgICAgfSwgZ2V0QWxsT3B0aW9ucygpKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaChRRGlhbG9nLCB7XG4gICAgICAgIHJlZjogZGlhbG9nUmVmLFxuICAgICAgICBtb2RlbFZhbHVlOiBkaWFsb2cudmFsdWUsXG4gICAgICAgIHBvc2l0aW9uOiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSA/ICd0b3AnIDogdm9pZCAwLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogdHJhbnNpdGlvblNob3dDb21wdXRlZCxcbiAgICAgICAgdHJhbnNpdGlvbkhpZGU6IHByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25EaWFsb2dCZWZvcmVIaWRlLFxuICAgICAgICBvbkhpZGU6IG9uRGlhbG9nSGlkZSxcbiAgICAgICAgb25TaG93OiBvbkRpYWxvZ1Nob3dcbiAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZGlhbG9nJ1xuICAgICAgICAgICsgKGlzT3B0aW9uc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgICAgICsgKGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZm9jdXNlZCcgOiAnJylcbiAgICAgIH0sIGNvbnRlbnQpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nQmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG5cbiAgICAgIGlmIChkaWFsb2dSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZGlhbG9nUmVmLnZhbHVlLl9fdXBkYXRlUmVmb2N1c1RhcmdldChcbiAgICAgICAgICBzdGF0ZS5yb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJy5xLWZpZWxkX19uYXRpdmUgPiBbdGFiaW5kZXhdOmxhc3QtY2hpbGQnKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nSGlkZSAoZSkge1xuICAgICAgaGlkZVBvcHVwKClcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlICYmIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ1Nob3cgKCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICBpZiAoXG4gICAgICAgIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUgKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtZW51LnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgZmlsdGVySWQgPSB2b2lkIDBcblxuICAgICAgICBpZiAoc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgZW1pdCgnZmlsdGVyQWJvcnQnKVxuICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQb3B1cCAoZSkge1xuICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSlcbiAgICAgICAgZGlhbG9nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm9uRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChub09wdGlvbnMudmFsdWUgIT09IHRydWUgfHwgc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBtZW51LnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGVQb3B1cCAoKSB7XG4gICAgICBkaWFsb2cudmFsdWUgPSBmYWxzZVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldElucHV0VmFsdWUgKCkge1xuICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgcHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlICYmIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKSB8fCAnJ1xuICAgICAgICAgIDogJycsXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNZW51IChzaG93KSB7XG4gICAgICBsZXQgb3B0aW9uSW5kZXggPSAtMVxuXG4gICAgICBpZiAoc2hvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgICAgIG9wdGlvbkluZGV4ID0gcHJvcHMub3B0aW9ucy5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZSh2KSwgdmFsKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKG9wdGlvbkluZGV4KVxuICAgICAgfVxuXG4gICAgICBzZXRPcHRpb25JbmRleChvcHRpb25JbmRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXJlbmRlck1lbnUgKG5ld0xlbmd0aCwgb2xkTGVuZ3RoKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKC0xLCB0cnVlKVxuXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobmV3TGVuZ3RoID4gb2xkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB1cGRhdGVNZW51KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnVQb3NpdGlvbiAoKSB7XG4gICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSBmYWxzZSAmJiBtZW51UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1lbnVSZWYudmFsdWUudXBkYXRlUG9zaXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ29udHJvbFBvcHVwU2hvdyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcbiAgICAgIGVtaXQoJ3BvcHVwU2hvdycsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBIaWRlIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXBIaWRlJywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByZVN0YXRlICgpIHtcbiAgICAgIGhhc0RpYWxvZyA9ICRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ2RpYWxvZydcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHByb3BzLmJlaGF2aW9yICE9PSAnbWVudScgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDAgfHwgcHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCB8fCBub09wdGlvbnMudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICAgICA6IHRydWVcbiAgICAgICAgKVxuXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkID0gJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICA/ICdmYWRlJ1xuICAgICAgICA6IHByb3BzLnRyYW5zaXRpb25TaG93XG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUodXBkYXRlUHJlU3RhdGUpXG4gICAgb25VcGRhdGVkKHVwZGF0ZU1lbnVQb3NpdGlvbilcblxuICAgIHVwZGF0ZVByZVN0YXRlKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoaW5wdXRUaW1lcilcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvd1BvcHVwLCBoaWRlUG9wdXAsXG4gICAgICByZW1vdmVBdEluZGV4LCBhZGQsIHRvZ2dsZU9wdGlvbixcbiAgICAgIGdldE9wdGlvbkluZGV4OiAoKSA9PiBvcHRpb25JbmRleC52YWx1ZSxcbiAgICAgIHNldE9wdGlvbkluZGV4LCBtb3ZlT3B0aW9uU2VsZWN0aW9uLFxuICAgICAgZmlsdGVyLCB1cGRhdGVNZW51UG9zaXRpb24sIHVwZGF0ZUlucHV0VmFsdWUsXG4gICAgICBpc09wdGlvblNlbGVjdGVkLFxuICAgICAgZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSxcbiAgICAgIGlzT3B0aW9uRGlzYWJsZWQ6ICguLi5hcmdzKSA9PiBpc09wdGlvbkRpc2FibGVkLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpID09PSB0cnVlLFxuICAgICAgZ2V0T3B0aW9uVmFsdWU6ICguLi5hcmdzKSA9PiBnZXRPcHRpb25WYWx1ZS52YWx1ZS5hcHBseShudWxsLCBhcmdzKSxcbiAgICAgIGdldE9wdGlvbkxhYmVsOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uTGFiZWwudmFsdWUuYXBwbHkobnVsbCwgYXJncylcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtc2VsZWN0IHEtZmllbGQtLWF1dG8taGVpZ2h0IHEtc2VsZWN0LS13aXRoJHsgcHJvcHMudXNlSW5wdXQgIT09IHRydWUgPyAnb3V0JyA6ICcnIH0taW5wdXRgXG4gICAgICAgICsgYCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUNoaXBzICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWNoaXBzYFxuICAgICAgICArIGAgcS1zZWxlY3QtLSR7IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ211bHRpcGxlJyA6ICdzaW5nbGUnIH1gXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcbiAgICAgIHRhcmdldFJlZixcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgc2hvd1BvcHVwLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAocHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlICYmIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuICAgICAgICB8fCB0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSBmYWxzZSAmJiAoXG4gICAgICAgICAgICBkaWFsb2cudmFsdWUgPT09IHRydWUgLy8gZGlhbG9nIGFsd2F5cyBoYXMgbWVudSBkaXNwbGF5ZWQsIHNvIG5lZWQgdG8gcmVuZGVyIGl0XG4gICAgICAgICAgICB8fCBub09wdGlvbnMudmFsdWUgIT09IHRydWVcbiAgICAgICAgICAgIHx8IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDBcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBoYXNEaWFsb2cgPT09IHRydWUgPyBnZXREaWFsb2coKSA6IGdldE1lbnUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGV4cGxpY2l0bHkgc2V0IGl0IG90aGVyd2lzZSBUQUIgd2lsbCBub3QgYmx1ciBjb21wb25lbnRcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjb250cm9sRXZlbnRzOiB7XG4gICAgICAgIG9uRm9jdXNpbiAoZSkgeyBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpIH0sXG4gICAgICAgIG9uRm9jdXNvdXQgKGUpIHtcbiAgICAgICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNldElucHV0VmFsdWUoKVxuICAgICAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWNrIChlKSB7XG4gICAgICAgICAgLy8gbGFiZWwgZnJvbSBRRmllbGQgd2lsbCBwcm9wYWdhdGUgY2xpY2sgb24gdGhlIGlucHV0XG4gICAgICAgICAgcHJldmVudChlKVxuXG4gICAgICAgICAgaWYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsICYmIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93UG9wdXAoZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZ2V0Q29udHJvbDogZnJvbURpYWxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPSBmcm9tRGlhbG9nID09PSB0cnVlIHx8IGRpYWxvZy52YWx1ZSAhPT0gdHJ1ZSB8fCBoYXNEaWFsb2cgIT09IHRydWVcblxuICAgICAgICBpZiAocHJvcHMudXNlSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGdldElucHV0KGZyb21EaWFsb2csIGlzVGFyZ2V0KSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVyZSBjYW4gYmUgb25seSBvbmUgKHdoZW4gZGlhbG9nIGlzIG9wZW5lZCB0aGUgY29udHJvbCBpbiBkaWFsb2cgc2hvdWxkIGJlIHRhcmdldClcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBhdHRycyA9IGlzVGFyZ2V0ID09PSB0cnVlID8gY29tYm9ib3hBdHRycy52YWx1ZSA6IHZvaWQgMFxuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICAgICAgICByZWY6IGlzVGFyZ2V0ID09PSB0cnVlID8gdGFyZ2V0UmVmIDogdm9pZCAwLFxuICAgICAgICAgICAgICBrZXk6ICdkX3QnLFxuICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19mb2N1cy10YXJnZXQnLFxuICAgICAgICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIHZhbHVlOiBhcmlhQ3VycmVudFZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0S2V5dXAsXG4gICAgICAgICAgICAgIG9uS2V5cHJlc3M6IG9uVGFyZ2V0S2V5cHJlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKGlzVGFyZ2V0ID09PSB0cnVlICYmIHR5cGVvZiBwcm9wcy5hdXRvY29tcGxldGUgPT09ICdzdHJpbmcnICYmIHByb3BzLmF1dG9jb21wbGV0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19hdXRvY29tcGxldGUtaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogcHJvcHMuYXV0b2NvbXBsZXRlLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBvbktleXVwOiBvblRhcmdldEF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lUHJvcC52YWx1ZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5uZXJPcHRpb25zVmFsdWUudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IG9wdHMgPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5tYXAodmFsdWUgPT4gaCgnb3B0aW9uJywgeyB2YWx1ZSwgc2VsZWN0ZWQ6IHRydWUgfSkpXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAgICAgICBtdWx0aXBsZTogcHJvcHMubXVsdGlwbGVcbiAgICAgICAgICAgIH0sIG9wdHMpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXR0cnMgPSBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBpc1RhcmdldCAhPT0gdHJ1ZSA/IHZvaWQgMCA6IHN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgLi4uYXR0cnNcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICB9LFxuXG4gICAgICBnZXRJbm5lckFwcGVuZDogKCkgPT4gKFxuICAgICAgICBwcm9wcy5sb2FkaW5nICE9PSB0cnVlICYmIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRHJvcGRvd25JY29uICE9PSB0cnVlXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kcm9wZG93bi1pY29uJyArIChtZW51LnZhbHVlID09PSB0cnVlID8gJyByb3RhdGUtMTgwJyA6ICcnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBkcm9wZG93bkFycm93SWNvbi52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdXNlRmllbGQoc3RhdGUpXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsiZWwiLCJoIiwib3B0aW9uSW5kZXgiLCJhdHRycyJdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE1BQU0sZ0JBQWdCO0FBRXRCLE1BQU0sZ0JBQWdCO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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
