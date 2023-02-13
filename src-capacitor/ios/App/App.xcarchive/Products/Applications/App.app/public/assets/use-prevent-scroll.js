import { c as createComponent, d as computed, h, e as hSlot, av as useRouterLinkProps, aw as useRouterLink, f as ref, v as isKeyCode, q as stopAndPrevent, H as hUniqueSlot, g as getCurrentInstance, P as Platform, N as prevent, B as nextTick, L as addEvt, w as watch, o as onMounted, n as onBeforeUnmount, S as cleanEvt, C as listenOpts, ax as vmHasRouter, ay as getParentProxy, Z as onUnmounted, az as injectProp, aA as Teleport, ae as createGlobalNode, aj as removeGlobalNode, E as onDeactivated, aB as vmIsDestroyed, aC as getElement, aD as css, J as client, O as position, ah as Transition, aE as childHasFocus, aF as History, aG as getEventPath } from "./index.js";
import { b as useDarkProps, c as useDark, r as removeFocusWaitFlag, d as addFocusWaitFlag, e as addFocusFn } from "./QNoSsr.js";
var QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""}` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        navigateOnClick(e);
      }
    }
    function onKeyup2(e) {
      if (isClickable.value === true && isKeyCode(e, 13) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: "listitem",
        onClick,
        onKeyup: onKeyup2
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkAttrs.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
var QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useAnchorProps = {
  target: {
    default: true
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        clearTimeout(touchTimer);
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) {
        return;
      }
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, checkGlobalDialog) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = checkGlobalDialog === true && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode();
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) {
      return;
    }
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, renderPortalContent())] : void 0
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
function useTimeout() {
  let timer2;
  const vm = getCurrentInstance();
  function removeTimeout() {
    clearTimeout(timer2);
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      clearTimeout(timer2);
      if (vmIsDestroyed(vm) === false) {
        timer2 = setTimeout(fn, delay);
      }
    }
  };
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index > -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index > -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let timer;
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  clearTimeout(timer);
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index > -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      clearTimeout(timer);
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    left,
    right,
    bottom,
    width,
    height,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getTargetProps(el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  };
}
function setPosition(cfg) {
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  let anchorProps;
  const { scrollLeft, scrollTop } = cfg.el;
  if (cfg.absoluteOffset === void 0) {
    anchorProps = getAnchorProps(cfg.anchorEl, cfg.cover === true ? [0, 0] : cfg.offset);
  } else {
    const { top: anchorTop, left: anchorLeft } = cfg.anchorEl.getBoundingClientRect(), top = anchorTop + cfg.absoluteOffset.top, left = anchorLeft + cfg.absoluteOffset.left;
    anchorProps = { top, left, width: 1, height: 1, right: left + 1, center: top, middle: left, bottom: top + 1 };
  }
  let elStyle = {
    maxHeight: cfg.maxHeight,
    maxWidth: cfg.maxWidth,
    visibility: "visible"
  };
  if (cfg.fit === true || cfg.cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cfg.cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(cfg.el.style, elStyle);
  const targetProps = getTargetProps(cfg.el), props = {
    top: anchorProps[cfg.anchorOrigin.vertical] - targetProps[cfg.selfOrigin.vertical],
    left: anchorProps[cfg.anchorOrigin.horizontal] - targetProps[cfg.selfOrigin.horizontal]
  };
  applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(cfg.el.style, elStyle);
  if (cfg.el.scrollTop !== scrollTop) {
    cfg.el.scrollTop = scrollTop;
  }
  if (cfg.el.scrollLeft !== scrollLeft) {
    cfg.el.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent);
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escapeKey");
      hide(evt);
    }
    function updatePosition() {
      const el = innerRef.value;
      if (el === null || anchorEl.value === null) {
        return;
      }
      setPosition({
        el,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  Object.assign(scroller.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const spacer = document.createElement("div");
  Object.assign(spacer.style, {
    width: "1000px",
    height: "1px"
  });
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, closeTimer;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    window.scrollTo(scrollPositionX, scrollPositionY);
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== void 0) {
      clearTimeout(closeTimer);
      closeTimer = void 0;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = void 0;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
export { QMenu as Q, useTick as a, useTimeout as b, clearSelection as c, useModelToggleProps as d, useModelToggleEmits as e, useModelToggle as f, useHistory as g, usePreventScroll as h, getScrollTarget as i, getVerticalScrollPosition as j, getHorizontalScrollPosition as k, getScrollbarWidth as l, getPortalProxy as m, closePortals as n, QItem as o, QItemLabel as p, QItemSection as q, rtlHasScrollBug as r, preventScroll as s, useTransition as t, useTransitionProps as u, usePortal as v, removeFocusout as w, removeEscapeKey as x, addFocusout as y, addEscapeKey as z };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXByZXZlbnQtc2Nyb2xsLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pdGVtL1FJdGVtTGFiZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3NlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3BvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Njcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZXNjYXBlLWtleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZm9jdXNvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL2NsaWNrLW91dHNpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3Bvc2l0aW9uLWVuZ2luZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbWVudS9RTWVudS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcnRsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtaGlzdG9yeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcHJldmVudC1zY3JvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhdmF0YXI6IEJvb2xlYW4sXG4gICAgdGh1bWJuYWlsOiBCb29sZWFuLFxuICAgIHNpZGU6IEJvb2xlYW4sXG4gICAgdG9wOiBCb29sZWFuLFxuICAgIG5vV3JhcDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19zZWN0aW9uIGNvbHVtbidcbiAgICAgICsgYCBxLWl0ZW1fX3NlY3Rpb24tLSR7IHByb3BzLmF2YXRhciA9PT0gdHJ1ZSB8fCBwcm9wcy5zaWRlID09PSB0cnVlIHx8IHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICdzaWRlJyA6ICdtYWluJyB9YFxuICAgICAgKyAocHJvcHMudG9wID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLXRvcCBqdXN0aWZ5LXN0YXJ0JyA6ICcganVzdGlmeS1jZW50ZXInKVxuICAgICAgKyAocHJvcHMuYXZhdGFyID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLWF2YXRhcicgOiAnJylcbiAgICAgICsgKHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS10aHVtYm5haWwnIDogJycpXG4gICAgICArIChwcm9wcy5ub1dyYXAgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tbm93cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVJvdXRlckxpbmssIHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utcm91dGVyLWxpbmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFVuaXF1ZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGluc2V0TGV2ZWw6IE51bWJlcixcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBmb2N1c2VkOiBCb29sZWFuLFxuICAgIG1hbnVhbEZvY3VzOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJywgJ2tleXVwJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBoYXNMaW5rLCBsaW5rQXR0cnMsIGxpbmtDbGFzcywgbGlua1RhZywgbmF2aWdhdGVPbkNsaWNrIH0gPSB1c2VSb3V0ZXJMaW5rKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBpc0FjdGlvbmFibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuY2xpY2thYmxlID09PSB0cnVlXG4gICAgICAgIHx8IGhhc0xpbmsudmFsdWUgPT09IHRydWVcbiAgICAgICAgfHwgcHJvcHMudGFnID09PSAnbGFiZWwnXG4gICAgKVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWl0ZW0gcS1pdGVtLXR5cGUgcm93IG5vLXdyYXAnXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1pdGVtLS1kZW5zZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1pdGVtLS1kYXJrJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgJiYgcHJvcHMuYWN0aXZlID09PSBudWxsXG4gICAgICAgICAgPyBsaW5rQ2xhc3MudmFsdWVcbiAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgcHJvcHMuYWN0aXZlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyBgIHEtaXRlbS0tYWN0aXZlJHsgcHJvcHMuYWN0aXZlQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgcHJvcHMuYWN0aXZlQ2xhc3MgfWAgOiAnJyB9YFxuICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgIClcbiAgICAgIClcbiAgICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAnIHEtaXRlbS0tY2xpY2thYmxlIHEtbGluayBjdXJzb3ItcG9pbnRlciAnXG4gICAgICAgICAgICArIChwcm9wcy5tYW51YWxGb2N1cyA9PT0gdHJ1ZSA/ICdxLW1hbnVhbC1mb2N1c2FibGUnIDogJ3EtZm9jdXNhYmxlIHEtaG92ZXJhYmxlJylcbiAgICAgICAgICAgICsgKHByb3BzLmZvY3VzZWQgPT09IHRydWUgPyAnIHEtbWFudWFsLWZvY3VzYWJsZS0tZm9jdXNlZCcgOiAnJylcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuaW5zZXRMZXZlbCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0J1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgWyAncGFkZGluZycgKyBkaXIgXTogKDE2ICsgcHJvcHMuaW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChibHVyVGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGUucUtleUV2ZW50ICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgICAgIGJsdXJUYXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBibHVyVGFyZ2V0UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICByb290UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYXZpZ2F0ZU9uQ2xpY2soZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgaXNLZXlDb2RlKGUsIDEzKSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgICAgIC8vIGZvciByaXBwbGVcbiAgICAgICAgZS5xS2V5RXZlbnQgPSB0cnVlXG5cbiAgICAgICAgLy8gZm9yIGNsaWNrIHRyaWdnZXJcbiAgICAgICAgY29uc3QgZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgZSlcbiAgICAgICAgZXZ0LnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgcm9vdFJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KGV2dClcbiAgICAgIH1cblxuICAgICAgZW1pdCgna2V5dXAnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUgJiYgY2hpbGQudW5zaGlmdChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZm9jdXMtaGVscGVyJywgdGFiaW5kZXg6IC0xLCByZWY6IGJsdXJUYXJnZXRSZWYgfSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcm9sZTogJ2xpc3RpdGVtJyxcbiAgICAgICAgb25DbGljayxcbiAgICAgICAgb25LZXl1cFxuICAgICAgfVxuXG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YS50YWJpbmRleCA9IHByb3BzLnRhYmluZGV4IHx8ICcwJ1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIGxpbmtBdHRycy52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtTGFiZWwnLFxuXG4gIHByb3BzOiB7XG4gICAgb3ZlcmxpbmU6IEJvb2xlYW4sXG4gICAgY2FwdGlvbjogQm9vbGVhbixcbiAgICBoZWFkZXI6IEJvb2xlYW4sXG4gICAgbGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgcGFyc2VkTGluZXMgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5saW5lcywgMTApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19sYWJlbCdcbiAgICAgICsgKHByb3BzLm92ZXJsaW5lID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1vdmVybGluZSB0ZXh0LW92ZXJsaW5lJyA6ICcnKVxuICAgICAgKyAocHJvcHMuY2FwdGlvbiA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tY2FwdGlvbiB0ZXh0LWNhcHRpb24nIDogJycpXG4gICAgICArIChwcm9wcy5oZWFkZXIgPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWhlYWRlcicgOiAnJylcbiAgICAgICsgKHBhcnNlZExpbmVzLnZhbHVlID09PSAxID8gJyBlbGxpcHNpcycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5saW5lcyAhPT0gdm9pZCAwICYmIHBhcnNlZExpbmVzLnZhbHVlID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JpZW50JzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICctd2Via2l0LWxpbmUtY2xhbXAnOiBwYXJzZWRMaW5lcy52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IFBsYXRmb3JtIGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbiAoKSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICBpZiAoc2VsZWN0aW9uLmVtcHR5ICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5lbXB0eSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICBQbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgc2VsZWN0aW9uLmFkZFJhbmdlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkpXG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KClcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuZXhwb3J0IGNvbnN0IHVzZUFuY2hvclByb3BzID0ge1xuICB0YXJnZXQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIG5vUGFyZW50RXZlbnQ6IEJvb2xlYW4sXG4gIGNvbnRleHRNZW51OiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGF2b2lkRW1pdCwgLy8gcmVxdWlyZWQgZm9yIFFQb3B1cFByb3h5ICh0cnVlKVxuICBjb25maWd1cmVBbmNob3JFbCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSwgZW1pdCB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBhbmNob3JFbCA9IHJlZihudWxsKVxuXG4gIGxldCB0b3VjaFRpbWVyXG5cbiAgZnVuY3Rpb24gY2FuU2hvdyAoZXZ0KSB7XG4gICAgLy8gYWJvcnQgd2l0aCBubyBwYXJlbnQgY29uZmlndXJlZCBvciBvbiBtdWx0aS10b3VjaFxuICAgIHJldHVybiBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgPyBmYWxzZVxuICAgICAgOiAoZXZ0ID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMgPT09IHZvaWQgMCB8fCBldnQudG91Y2hlcy5sZW5ndGggPD0gMSlcbiAgfVxuXG4gIGNvbnN0IGFuY2hvckV2ZW50cyA9IHt9XG5cbiAgaWYgKGNvbmZpZ3VyZUFuY2hvckVsID09PSB2b2lkIDApIHtcbiAgICAvLyBkZWZhdWx0IGNvbmZpZ3VyZUFuY2hvckVsIGlzIGRlc2lnbmVkIGZvclxuICAgIC8vIFFNZW51ICYgUVBvcHVwUHJveHkgKHdoaWNoIGlzIHdoeSBpdCdzIGhhbmRsZWQgaGVyZSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7XG4gICAgICBoaWRlIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGUgKGV2dCkge1xuICAgICAgICBwcm94eS50b2dnbGUoZXZ0KVxuICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGVLZXkgKGV2dCkge1xuICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgYW5jaG9yRXZlbnRzLnRvZ2dsZShldnQpXG4gICAgICB9LFxuXG4gICAgICBjb250ZXh0Q2xpY2sgKGV2dCkge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcHJldmVudChldnQpXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBwcmV2ZW50LFxuXG4gICAgICBtb2JpbGVUb3VjaCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckV2ZW50cy5tb2JpbGVDbGVhbnVwKGV2dClcblxuICAgICAgICBpZiAoY2FuU2hvdyhldnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIFtcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NvbnRleHRtZW51JywgJ3ByZXZlbnQnLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICBdKVxuXG4gICAgICAgIHRvdWNoVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0sIDMwMClcbiAgICAgIH0sXG5cbiAgICAgIG1vYmlsZUNsZWFudXAgKGV2dCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGV2dCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbmZpZ3VyZUFuY2hvckVsID0gZnVuY3Rpb24gKGNvbnRleHQgPSBwcm9wcy5jb250ZXh0TWVudSkge1xuICAgICAgaWYgKHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWUgfHwgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgbGV0IGV2dHNcblxuICAgICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHByb3h5LiRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAndG91Y2hzdGFydCcsICdtb2JpbGVUb3VjaCcsICdwYXNzaXZlJyBdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2Vkb3duJywgJ2hpZGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjb250ZXh0bWVudScsICdjb250ZXh0Q2xpY2snLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGV2dHMgPSBbXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NsaWNrJywgJ3RvZ2dsZScsICdwYXNzaXZlJyBdLFxuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdrZXl1cCcsICd0b2dnbGVLZXknLCAncGFzc2l2ZScgXVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICdhbmNob3InLCBldnRzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuY29uZmlndXJlQW5jaG9yRWwgKCkge1xuICAgIGNsZWFuRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmNob3JFbCAoZWwpIHtcbiAgICBhbmNob3JFbC52YWx1ZSA9IGVsXG4gICAgd2hpbGUgKGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5jb250YWlucygncS1hbmNob3ItLXNraXAnKSkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBhbmNob3JFbC52YWx1ZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tBbmNob3JFbCAoKSB7XG4gICAgaWYgKHByb3BzLnRhcmdldCA9PT0gZmFsc2UgfHwgcHJvcHMudGFyZ2V0ID09PSAnJyB8fCBwcm94eS4kZWwucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgYW5jaG9yRWwudmFsdWUgPSBudWxsXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnRhcmdldCA9PT0gdHJ1ZSkge1xuICAgICAgc2V0QW5jaG9yRWwocHJveHkuJGVsLnBhcmVudE5vZGUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGVsID0gcHJvcHMudGFyZ2V0XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMudGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwcm9wcy50YXJnZXQpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgIGVsID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVsICE9PSB2b2lkIDAgJiYgZWwgIT09IG51bGwpIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUgPSBlbC4kZWwgfHwgZWxcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgICAgICBjb25zb2xlLmVycm9yKGBBbmNob3I6IHRhcmdldCBcIiR7IHByb3BzLnRhcmdldCB9XCIgbm90IGZvdW5kYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5jb250ZXh0TWVudSwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgY29uZmlndXJlQW5jaG9yRWwodmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy50YXJnZXQsICgpID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgIH1cblxuICAgIHBpY2tBbmNob3JFbCgpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgdmFsID0+IHtcbiAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHBpY2tBbmNob3JFbCgpXG5cbiAgICBpZiAoYXZvaWRFbWl0ICE9PSB0cnVlICYmIHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUgJiYgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgfVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICBwcm9wcyxcbiAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0XG4pIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgd2F0Y2gsIG5leHRUaWNrLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlTW9kZWxUb2dnbGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuXG4gICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlTW9kZWxUb2dnbGVFbWl0cyA9IFtcbiAgJ2JlZm9yZVNob3cnLCAnc2hvdycsICdiZWZvcmVIaWRlJywgJ2hpZGUnXG5dXG5cbi8vIGhhbmRsZVNob3cvaGFuZGxlSGlkZSAtPiByZW1vdmVUaWNrKCksIHNlbGYgKCYgZW1pdCBzaG93KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBzaG93aW5nLFxuICBjYW5TaG93LCAvLyBvcHRpb25hbFxuICBoaWRlT25Sb3V0ZUNoYW5nZSwgLy8gb3B0aW9uYWxcbiAgaGFuZGxlU2hvdywgLy8gb3B0aW9uYWxcbiAgaGFuZGxlSGlkZSwgLy8gb3B0aW9uYWxcbiAgcHJvY2Vzc09uTW91bnQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gdm1cblxuICBsZXQgcGF5bG9hZFxuXG4gIGZ1bmN0aW9uIHRvZ2dsZSAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGhpZGUoZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3cgKGV2dCkge1xuICAgIGlmIChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgIHx8IChldnQgIT09IHZvaWQgMCAmJiBldnQucUFuY2hvckhhbmRsZWQgPT09IHRydWUpXG4gICAgICB8fCAoY2FuU2hvdyAhPT0gdm9pZCAwICYmIGNhblNob3coZXZ0KSAhPT0gdHJ1ZSlcbiAgICApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzU2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Nob3cgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzaG93aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgZW1pdCgnYmVmb3JlU2hvdycsIGV2dClcblxuICAgIGlmIChoYW5kbGVTaG93ICE9PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZVNob3coZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoZXZ0KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyB8fCBwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgcGF5bG9hZCA9IGV2dFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAocGF5bG9hZCA9PT0gZXZ0KSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsIHx8IGxpc3RlbmVyID09PSBmYWxzZSB8fCBfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICAgIHByb2Nlc3NIaWRlKGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzSGlkZSAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcblxuICAgIGVtaXQoJ2JlZm9yZUhpZGUnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlSGlkZSAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVIaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NNb2RlbENoYW5nZSAodmFsKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUgJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKHZhbCA9PT0gdHJ1ZSkgIT09IHNob3dpbmcudmFsdWUpIHtcbiAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gcHJvY2Vzc1Nob3cgOiBwcm9jZXNzSGlkZVxuICAgICAgZm4ocGF5bG9hZClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBwcm9jZXNzTW9kZWxDaGFuZ2UpXG5cbiAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlICE9PSB2b2lkIDAgJiYgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlKSB7XG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UudmFsdWUgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc09uTW91bnQgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9jZXNzTW9kZWxDaGFuZ2UocHJvcHMubW9kZWxWYWx1ZSlcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgY29uc3QgcHVibGljTWV0aG9kcyA9IHsgc2hvdywgaGlkZSwgdG9nZ2xlIH1cbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljTWV0aG9kcylcblxuICByZXR1cm4gcHVibGljTWV0aG9kc1xufVxuIiwiaW1wb3J0IHsgZ2V0UGFyZW50UHJveHkgfSBmcm9tICcuL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgcG9ydGFsUHJveHlMaXN0ID0gW11cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcnRhbFByb3h5IChlbCkge1xuICByZXR1cm4gcG9ydGFsUHJveHlMaXN0LmZpbmQocHJveHkgPT5cbiAgICBwcm94eS5jb250ZW50RWwgIT09IG51bGxcbiAgICAmJiBwcm94eS5jb250ZW50RWwuY29udGFpbnMoZWwpXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFsTWVudXMgKHByb3h5LCBldnQpIHtcbiAgZG8ge1xuICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICBwcm94eS5oaWRlKGV2dClcblxuICAgICAgLy8gaXMgdGhpcyBhIHBvaW50IG9mIHNlcGFyYXRpb24/XG4gICAgICBpZiAocHJveHkuJHByb3BzLnNlcGFyYXRlQ2xvc2VQb3B1cCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3h5Ll9fcVBvcnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gdHJlYXQgaXQgYXMgcG9pbnQgb2Ygc2VwYXJhdGlvbiBpZiBwYXJlbnQgaXMgUVBvcHVwUHJveHlcbiAgICAgIC8vIChzbyBtb2JpbGUgbWF0Y2hlcyBkZXNrdG9wIGJlaGF2aW9yKVxuICAgICAgLy8gYW5kIGhpZGUgaXQgdG9vXG4gICAgICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcblxuICAgICAgaWYgKHBhcmVudCAhPT0gdm9pZCAwICYmIHBhcmVudC4kb3B0aW9ucy5uYW1lID09PSAnUVBvcHVwUHJveHknKSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3h5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfSB3aGlsZSAocHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFscyAocHJveHksIGV2dCwgZGVwdGgpIHtcbiAgd2hpbGUgKGRlcHRoICE9PSAwICYmIHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpIHtcbiAgICBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHByb3h5ID0gY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwcm94eS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2dsb2JhbC1ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5mdW5jdGlvbiBpc09uR2xvYmFsRGlhbG9nICh2bSkge1xuICB2bSA9IHZtLnBhcmVudFxuXG4gIHdoaWxlICh2bSAhPT0gdm9pZCAwICYmIHZtICE9PSBudWxsKSB7XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FHbG9iYWxEaWFsb2cnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAodm0udHlwZS5uYW1lID09PSAnUURpYWxvZycgfHwgdm0udHlwZS5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2bSA9IHZtLnBhcmVudFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIFdhcm5pbmchXG4vLyBZb3UgTVVTVCBzcGVjaWZ5IFwiaW5oZXJpdEF0dHJzOiBmYWxzZVwiIGluIHlvdXIgY29tcG9uZW50XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsIGNoZWNrR2xvYmFsRGlhbG9nKSB7XG4gIC8vIHNob3dpbmcsIGluY2x1ZGluZyB3aGlsZSBpbiBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjdGl2ZSA9IHJlZihmYWxzZSlcblxuICAvLyBzaG93aW5nICYgbm90IGluIGFueSBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjY2Vzc2libGUgPSByZWYoZmFsc2UpXG5cbiAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgICAgc2hvd1BvcnRhbDogbm9vcCxcbiAgICAgIGhpZGVQb3J0YWw6IG5vb3AsXG4gICAgICByZW5kZXJQb3J0YWw6IG5vb3BcbiAgICB9XG4gIH1cblxuICBsZXQgcG9ydGFsRWwgPSBudWxsXG4gIGNvbnN0IGZvY3VzT2JqID0ge31cbiAgY29uc3Qgb25HbG9iYWxEaWFsb2cgPSBjaGVja0dsb2JhbERpYWxvZyA9PT0gdHJ1ZSAmJiBpc09uR2xvYmFsRGlhbG9nKHZtKVxuXG4gIGZ1bmN0aW9uIHNob3dQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBpZiAoaXNSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAocG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25HbG9iYWxEaWFsb2cgPT09IGZhbHNlICYmIHBvcnRhbEVsID09PSBudWxsKSB7XG4gICAgICAgIHBvcnRhbEVsID0gY3JlYXRlR2xvYmFsTm9kZSgpXG4gICAgICB9XG5cbiAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gdHJ1ZVxuXG4gICAgICAvLyByZWdpc3RlciBwb3J0YWxcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5wdXNoKHZtLnByb3h5KVxuXG4gICAgICBhZGRGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKGlzUmVhZHkgIT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSBmYWxzZVxuXG4gICAgLy8gdW5yZWdpc3RlciBwb3J0YWxcbiAgICBjb25zdCBpbmRleCA9IHBvcnRhbFByb3h5TGlzdC5pbmRleE9mKHZtLnByb3h5KVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbEVsICE9PSBudWxsKSB7XG4gICAgICByZW1vdmVHbG9iYWxOb2RlKHBvcnRhbEVsKVxuICAgICAgcG9ydGFsRWwgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25Vbm1vdW50ZWQoKCkgPT4geyBoaWRlUG9ydGFsKHRydWUpIH0pXG5cbiAgLy8gbmVlZGVkIGZvciBwb3J0YWwgdm0gZGV0ZWN0aW9uXG4gIHZtLnByb3h5Ll9fcVBvcnRhbCA9IHRydWVcblxuICAvLyBwdWJsaWMgd2F5IG9mIGFjY2Vzc2luZyB0aGUgcmVuZGVyZWQgY29udGVudFxuICBpbmplY3RQcm9wKHZtLnByb3h5LCAnY29udGVudEVsJywgKCkgPT4gaW5uZXJSZWYudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBzaG93UG9ydGFsLFxuICAgIGhpZGVQb3J0YWwsXG5cbiAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICByZW5kZXJQb3J0YWw6ICgpID0+IChcbiAgICAgIG9uR2xvYmFsRGlhbG9nID09PSB0cnVlXG4gICAgICAgID8gcmVuZGVyUG9ydGFsQ29udGVudCgpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBbIGgoVGVsZXBvcnQsIHsgdG86IHBvcnRhbEVsIH0sIHJlbmRlclBvcnRhbENvbnRlbnQoKSkgXVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVHJhbnNpdGlvblByb3BzID0ge1xuICB0cmFuc2l0aW9uU2hvdzoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uSGlkZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBkZWZhdWx0U2hvd0ZuID0gKCkgPT4ge30sIGRlZmF1bHRIaWRlRm4gPSAoKSA9PiB7fSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25Qcm9wczogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25TaG93IHx8IGRlZmF1bHRTaG93Rm4oKSB9YFxuICAgICAgY29uc3QgaGlkZSA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25IaWRlIHx8IGRlZmF1bHRIaWRlRm4oKSB9YFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhcHBlYXI6IHRydWUsXG5cbiAgICAgICAgZW50ZXJGcm9tQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItZnJvbWAsXG4gICAgICAgIGVudGVyQWN0aXZlQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItYWN0aXZlYCxcbiAgICAgICAgZW50ZXJUb0NsYXNzOiBgJHsgc2hvdyB9LWVudGVyLXRvYCxcblxuICAgICAgICBsZWF2ZUZyb21DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1mcm9tYCxcbiAgICAgICAgbGVhdmVBY3RpdmVDbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1hY3RpdmVgLFxuICAgICAgICBsZWF2ZVRvQ2xhc3M6IGAkeyBoaWRlIH0tbGVhdmUtdG9gXG4gICAgICB9XG4gICAgfSksXG5cbiAgICB0cmFuc2l0aW9uU3R5bGU6IGNvbXB1dGVkKCgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2ApXG4gIH1cbn1cbiIsImltcG9ydCB7IG5leHRUaWNrLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0nXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGljayhmbilcbiAqICAgIHJlbW92ZVRpY2soKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpY2tGblxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGljayAoKSB7XG4gICAgdGlja0ZuID0gdm9pZCAwXG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpY2spXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaWNrKVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGljayxcblxuICAgIHJlZ2lzdGVyVGljayAoZm4pIHtcbiAgICAgIHRpY2tGbiA9IGZuXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHRpY2tGbiA9PT0gZm4pIHtcbiAgICAgICAgICAvLyB3ZSBhbHNvIGNoZWNrIGlmIFZNIGlzIGRlc3Ryb3llZCwgc2luY2UgaWYgaXRcbiAgICAgICAgICAvLyBnb3QgdG8gdHJpZ2dlciBvbmUgbmV4dFRpY2soKSB3ZSBjYW5ub3Qgc3RvcCBpdFxuICAgICAgICAgIHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSAmJiB0aWNrRm4oKVxuICAgICAgICAgIHRpY2tGbiA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtJ1xuXG4vKlxuICogVXNhZ2U6XG4gKiAgICByZWdpc3RlclRpbWVvdXQoZm5bLCBkZWxheV0pXG4gKiAgICByZW1vdmVUaW1lb3V0KClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCB0aW1lclxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGltZW91dCAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG5cbiAgb25EZWFjdGl2YXRlZChyZW1vdmVUaW1lb3V0KVxuICBvbkJlZm9yZVVubW91bnQocmVtb3ZlVGltZW91dClcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZVRpbWVvdXQsXG5cbiAgICByZWdpc3RlclRpbWVvdXQgKGZuLCBkZWxheSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gICAgICBpZiAodm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmbiwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjc3MsIGdldEVsZW1lbnQgfSBmcm9tICcuL2RvbS5qcydcblxuY29uc3Qgc2Nyb2xsVGFyZ2V0cyA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IFtdXG4gIDogWyBudWxsLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSwgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFRhcmdldCAoZWwsIHRhcmdldEVsKSB7XG4gIGxldCB0YXJnZXQgPSBnZXRFbGVtZW50KHRhcmdldEVsKVxuXG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gZWwuY2xvc2VzdCgnLnNjcm9sbCwuc2Nyb2xsLXksLm92ZXJmbG93LWF1dG8nKVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KVxuICAgID8gd2luZG93XG4gICAgOiB0YXJnZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoIChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbFdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltVmVydGljYWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0U2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0U2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbUhvcml6b250YWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIG9mZnNldClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyhvZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0ID0gb2Zmc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldEhvcml6b250YWxTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmxldCBzaXplXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGggKCkge1xuICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIGNvbnN0XG4gICAgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNzcyhpbm5lciwge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMjAwcHgnXG4gIH0pXG4gIGNzcyhvdXRlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KVxuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpXG5cbiAgY29uc3QgdzEgPSBpbm5lci5vZmZzZXRXaWR0aFxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gIGxldCB3MiA9IGlubmVyLm9mZnNldFdpZHRoXG5cbiAgaWYgKHcxID09PSB3Mikge1xuICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGhcbiAgfVxuXG4gIG91dGVyLnJlbW92ZSgpXG4gIHNpemUgPSB3MSAtIHcyXG5cbiAgcmV0dXJuIHNpemVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Njcm9sbGJhciAoZWwsIG9uWSA9IHRydWUpIHtcbiAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBvbllcbiAgICA/IChcbiAgICAgICAgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy15JyBdKVxuICAgICAgICApXG4gICAgICApXG4gICAgOiAoXG4gICAgICAgIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXgnIF0pXG4gICAgICAgIClcbiAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRTY3JvbGxUYXJnZXQsXG5cbiAgZ2V0U2Nyb2xsSGVpZ2h0LFxuICBnZXRTY3JvbGxXaWR0aCxcblxuICBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8sXG4gIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8sXG5cbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGdldFNjcm9sbGJhcldpZHRoLFxuICBoYXNTY3JvbGxiYXJcbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuL2tleS1jb21wb3NpdGlvbi5qcydcblxuY29uc3QgaGFuZGxlcnMgPSBbXVxubGV0IGVzY0Rvd25cblxuZnVuY3Rpb24gb25LZXlkb3duIChldnQpIHtcbiAgZXNjRG93biA9IGV2dC5rZXlDb2RlID09PSAyN1xufVxuXG5mdW5jdGlvbiBvbkJsdXIgKCkge1xuICBpZiAoZXNjRG93biA9PT0gdHJ1ZSkge1xuICAgIGVzY0Rvd24gPSBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uS2V5dXAgKGV2dCkge1xuICBpZiAoZXNjRG93biA9PT0gdHJ1ZSkge1xuICAgIGVzY0Rvd24gPSBmYWxzZVxuXG4gICAgaWYgKGlzS2V5Q29kZShldnQsIDI3KSA9PT0gdHJ1ZSkge1xuICAgICAgaGFuZGxlcnNbIGhhbmRsZXJzLmxlbmd0aCAtIDEgXShldnQpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSAoYWN0aW9uKSB7XG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2tleWRvd24nLCBvbktleWRvd24pXG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2JsdXInLCBvbkJsdXIpXG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2tleXVwJywgb25LZXl1cClcbiAgZXNjRG93biA9IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFc2NhcGVLZXkgKGZuKSB7XG4gIGlmIChjbGllbnQuaXMuZGVza3RvcCA9PT0gdHJ1ZSkge1xuICAgIGhhbmRsZXJzLnB1c2goZm4pXG5cbiAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB1cGRhdGUoJ2FkZEV2ZW50TGlzdGVuZXInKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXNjYXBlS2V5IChmbikge1xuICBjb25zdCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoZm4pXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBsaXN0ZW5PcHRzIH0gZnJvbSAnLi4vZXZlbnQuanMnXG5pbXBvcnQgeyBwb3J0YWxQcm94eUxpc3QgfSBmcm9tICcuLi9wcml2YXRlL3BvcnRhbC5qcydcblxubGV0IHRpbWVyXG5cbmNvbnN0XG4gIHsgbm90UGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHMsXG4gIHJlZ2lzdGVyZWRMaXN0ID0gW11cblxuZnVuY3Rpb24gZ2xvYmFsSGFuZGxlciAoZXZ0KSB7XG4gIGNsZWFyVGltZW91dCh0aW1lcilcblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxQcm94eUxpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxQcm94eUxpc3RbIHBvcnRhbEluZGV4IF0uJFxuXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSAhPT0gJ1FEaWFsb2cnKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGlmIChwcm94eS5wcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcG9ydGFsSW5kZXgtLVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3Qgc3RhdGUgPSByZWdpc3RlcmVkTGlzdFsgaSBdXG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgIHN0YXRlLmFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICAgIHx8IHN0YXRlLmFuY2hvckVsLnZhbHVlLmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlXG4gICAgICApXG4gICAgICAmJiAoXG4gICAgICAgIHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keVxuICAgICAgICB8fCAoXG4gICAgICAgICAgc3RhdGUuaW5uZXJSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBzdGF0ZS5pbm5lclJlZi52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICApXG4gICAgKSB7XG4gICAgICAvLyBtYXJrIHRoZSBldmVudCBhcyBiZWluZyBwcm9jZXNzZWQgYnkgY2xpY2tPdXRzaWRlXG4gICAgICAvLyB1c2VkIHRvIHByZXZlbnQgcmVmb2N1cyBhZnRlciBtZW51IGNsb3NlXG4gICAgICBldnQucUNsaWNrT3V0c2lkZSA9IHRydWVcbiAgICAgIHN0YXRlLm9uQ2xpY2tPdXRzaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsaWNrT3V0c2lkZSAoY2xpY2tPdXRzaWRlUHJvcHMpIHtcbiAgcmVnaXN0ZXJlZExpc3QucHVzaChjbGlja091dHNpZGVQcm9wcylcblxuICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZExpc3QuZmluZEluZGV4KGggPT4gaCA9PT0gY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICByZWdpc3RlcmVkTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxubGV0IHZwTGVmdCwgdnBUb3BcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUG9zaXRpb24gKHBvcykge1xuICBjb25zdCBwYXJ0cyA9IHBvcy5zcGxpdCgnICcpXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoWyAndG9wJywgJ2NlbnRlcicsICdib3R0b20nIF0uaW5jbHVkZXMocGFydHNbIDAgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IHN0YXJ0IHdpdGggb25lIG9mIHRvcC9jZW50ZXIvYm90dG9tJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoWyAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnLCAnc3RhcnQnLCAnZW5kJyBdLmluY2x1ZGVzKHBhcnRzWyAxIF0pICE9PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignQW5jaG9yL1NlbGYgcG9zaXRpb24gbXVzdCBlbmQgd2l0aCBvbmUgb2YgbGVmdC9taWRkbGUvcmlnaHQvc3RhcnQvZW5kJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVPZmZzZXQgKHZhbCkge1xuICBpZiAoIXZhbCkgeyByZXR1cm4gdHJ1ZSB9XG4gIGlmICh2YWwubGVuZ3RoICE9PSAyKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmICh0eXBlb2YgdmFsWyAwIF0gIT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWxbIDEgXSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBob3Jpem9udGFsUG9zID0ge1xuICAnc3RhcnQjbHRyJzogJ2xlZnQnLFxuICAnc3RhcnQjcnRsJzogJ3JpZ2h0JyxcbiAgJ2VuZCNsdHInOiAncmlnaHQnLFxuICAnZW5kI3J0bCc6ICdsZWZ0J1xufVxuXG47WyAnbGVmdCcsICdtaWRkbGUnLCAncmlnaHQnIF0uZm9yRWFjaChwb3MgPT4ge1xuICBob3Jpem9udGFsUG9zWyBgJHsgcG9zIH0jbHRyYCBdID0gcG9zXG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNydGxgIF0gPSBwb3Ncbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBvc2l0aW9uIChwb3MsIHJ0bCkge1xuICBjb25zdCBwYXJ0cyA9IHBvcy5zcGxpdCgnICcpXG4gIHJldHVybiB7XG4gICAgdmVydGljYWw6IHBhcnRzWyAwIF0sXG4gICAgaG9yaXpvbnRhbDogaG9yaXpvbnRhbFBvc1sgYCR7IHBhcnRzWyAxIF0gfSMkeyBydGwgPT09IHRydWUgPyAncnRsJyA6ICdsdHInIH1gIF1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5jaG9yUHJvcHMgKGVsLCBvZmZzZXQpIHtcbiAgbGV0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIGlmIChvZmZzZXQgIT09IHZvaWQgMCkge1xuICAgIHRvcCAtPSBvZmZzZXRbIDEgXVxuICAgIGxlZnQgLT0gb2Zmc2V0WyAwIF1cbiAgICBib3R0b20gKz0gb2Zmc2V0WyAxIF1cbiAgICByaWdodCArPSBvZmZzZXRbIDAgXVxuXG4gICAgd2lkdGggKz0gb2Zmc2V0WyAwIF1cbiAgICBoZWlnaHQgKz0gb2Zmc2V0WyAxIF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wLFxuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgYm90dG9tLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0UHJvcHMgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIGNlbnRlcjogZWwub2Zmc2V0SGVpZ2h0IC8gMixcbiAgICBib3R0b206IGVsLm9mZnNldEhlaWdodCxcbiAgICBsZWZ0OiAwLFxuICAgIG1pZGRsZTogZWwub2Zmc2V0V2lkdGggLyAyLFxuICAgIHJpZ2h0OiBlbC5vZmZzZXRXaWR0aFxuICB9XG59XG5cbi8vIGNmZzogeyBlbCwgYW5jaG9yRWwsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbiwgb2Zmc2V0LCBhYnNvbHV0ZU9mZnNldCwgY292ZXIsIGZpdCwgbWF4SGVpZ2h0LCBtYXhXaWR0aCB9XG5leHBvcnQgZnVuY3Rpb24gc2V0UG9zaXRpb24gKGNmZykge1xuICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMCkge1xuICAgIC8vIHVzZXMgdGhlIHEtcG9zaXRpb24tZW5naW5lIENTUyBjbGFzc1xuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5LnN0eWxlXG4gICAgY29uc3QgeyBvZmZzZXRMZWZ0OiBsZWZ0LCBvZmZzZXRUb3A6IHRvcCB9ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0XG5cbiAgICBpZiAobGVmdCAhPT0gdnBMZWZ0KSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLWxlZnQnLCBsZWZ0ICsgJ3B4JylcbiAgICAgIHZwTGVmdCA9IGxlZnRcbiAgICB9XG4gICAgaWYgKHRvcCAhPT0gdnBUb3ApIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtdG9wJywgdG9wICsgJ3B4JylcbiAgICAgIHZwVG9wID0gdG9wXG4gICAgfVxuICB9XG5cbiAgbGV0IGFuY2hvclByb3BzXG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIG1pZ2h0IGNoYW5nZVxuICAvLyBpZiBtYXgtaGVpZ2h0Ly13aWR0aCBjaGFuZ2VzLCBzbyB3ZVxuICAvLyBuZWVkIHRvIHJlc3RvcmUgaXQgYWZ0ZXIgd2UgY2FsY3VsYXRlXG4gIC8vIHRoZSBuZXcgcG9zaXRpb25pbmdcbiAgY29uc3QgeyBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AgfSA9IGNmZy5lbFxuXG4gIGlmIChjZmcuYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFuY2hvclByb3BzID0gZ2V0QW5jaG9yUHJvcHMoY2ZnLmFuY2hvckVsLCBjZmcuY292ZXIgPT09IHRydWUgPyBbIDAsIDAgXSA6IGNmZy5vZmZzZXQpXG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3RcbiAgICAgIHsgdG9wOiBhbmNob3JUb3AsIGxlZnQ6IGFuY2hvckxlZnQgfSA9IGNmZy5hbmNob3JFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHRvcCA9IGFuY2hvclRvcCArIGNmZy5hYnNvbHV0ZU9mZnNldC50b3AsXG4gICAgICBsZWZ0ID0gYW5jaG9yTGVmdCArIGNmZy5hYnNvbHV0ZU9mZnNldC5sZWZ0XG5cbiAgICBhbmNob3JQcm9wcyA9IHsgdG9wLCBsZWZ0LCB3aWR0aDogMSwgaGVpZ2h0OiAxLCByaWdodDogbGVmdCArIDEsIGNlbnRlcjogdG9wLCBtaWRkbGU6IGxlZnQsIGJvdHRvbTogdG9wICsgMSB9XG4gIH1cblxuICBsZXQgZWxTdHlsZSA9IHtcbiAgICBtYXhIZWlnaHQ6IGNmZy5tYXhIZWlnaHQsXG4gICAgbWF4V2lkdGg6IGNmZy5tYXhXaWR0aCxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfVxuXG4gIGlmIChjZmcuZml0ID09PSB0cnVlIHx8IGNmZy5jb3ZlciA9PT0gdHJ1ZSkge1xuICAgIGVsU3R5bGUubWluV2lkdGggPSBhbmNob3JQcm9wcy53aWR0aCArICdweCdcbiAgICBpZiAoY2ZnLmNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKGNmZy5lbC5zdHlsZSwgZWxTdHlsZSlcblxuICBjb25zdFxuICAgIHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoY2ZnLmVsKSxcbiAgICBwcm9wcyA9IHtcbiAgICAgIHRvcDogYW5jaG9yUHJvcHNbIGNmZy5hbmNob3JPcmlnaW4udmVydGljYWwgXSAtIHRhcmdldFByb3BzWyBjZmcuc2VsZk9yaWdpbi52ZXJ0aWNhbCBdLFxuICAgICAgbGVmdDogYW5jaG9yUHJvcHNbIGNmZy5hbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdIC0gdGFyZ2V0UHJvcHNbIGNmZy5zZWxmT3JpZ2luLmhvcml6b250YWwgXVxuICAgIH1cblxuICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgY2ZnLmFuY2hvck9yaWdpbiwgY2ZnLnNlbGZPcmlnaW4pXG5cbiAgZWxTdHlsZSA9IHtcbiAgICB0b3A6IHByb3BzLnRvcCArICdweCcsXG4gICAgbGVmdDogcHJvcHMubGVmdCArICdweCdcbiAgfVxuXG4gIGlmIChwcm9wcy5tYXhIZWlnaHQgIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4SGVpZ2h0ID0gcHJvcHMubWF4SGVpZ2h0ICsgJ3B4J1xuXG4gICAgaWYgKGFuY2hvclByb3BzLmhlaWdodCA+IHByb3BzLm1heEhlaWdodCkge1xuICAgICAgZWxTdHlsZS5taW5IZWlnaHQgPSBlbFN0eWxlLm1heEhlaWdodFxuICAgIH1cbiAgfVxuICBpZiAocHJvcHMubWF4V2lkdGggIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4V2lkdGggPSBwcm9wcy5tYXhXaWR0aCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy53aWR0aCA+IHByb3BzLm1heFdpZHRoKSB7XG4gICAgICBlbFN0eWxlLm1pbldpZHRoID0gZWxTdHlsZS5tYXhXaWR0aFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY2ZnLmVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmIChjZmcuZWwuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICBjZmcuZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gIH1cbiAgaWYgKGNmZy5lbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgY2ZnLmVsLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlCb3VuZGFyaWVzIChwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pIHtcbiAgY29uc3RcbiAgICBjdXJyZW50SGVpZ2h0ID0gdGFyZ2V0UHJvcHMuYm90dG9tLFxuICAgIGN1cnJlbnRXaWR0aCA9IHRhcmdldFByb3BzLnJpZ2h0LFxuICAgIG1hcmdpbiA9IGdldFNjcm9sbGJhcldpZHRoKCksXG4gICAgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBtYXJnaW4sXG4gICAgaW5uZXJXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcblxuICBpZiAocHJvcHMudG9wIDwgMCB8fCBwcm9wcy50b3AgKyBjdXJyZW50SGVpZ2h0ID4gaW5uZXJIZWlnaHQpIHtcbiAgICBpZiAoc2VsZk9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHByb3BzLnRvcCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSA+IGlubmVySGVpZ2h0IC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVySGVpZ2h0IC0gY3VycmVudEhlaWdodClcbiAgICAgICAgOiAwXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JZID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVySGVpZ2h0LFxuICAgICAgICBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgICAgPyBhbmNob3JQcm9wcy5jZW50ZXJcbiAgICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy5ib3R0b20gOiBhbmNob3JQcm9wcy50b3ApXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBhbmNob3JZKVxuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yWSAtIGN1cnJlbnRIZWlnaHQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJ1xuICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy50b3AgOiBhbmNob3JQcm9wcy5ib3R0b20pXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodCAtIHByb3BzLnRvcClcbiAgICB9XG4gIH1cblxuICBpZiAocHJvcHMubGVmdCA8IDAgfHwgcHJvcHMubGVmdCArIGN1cnJlbnRXaWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aClcbiAgICBpZiAoc2VsZk9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJykge1xuICAgICAgcHJvcHMubGVmdCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdID4gaW5uZXJXaWR0aCAvIDJcbiAgICAgICAgPyBNYXRoLm1heCgwLCBpbm5lcldpZHRoIC0gY3VycmVudFdpZHRoKVxuICAgICAgICA6IDBcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMikge1xuICAgICAgY29uc3QgYW5jaG9yWCA9IE1hdGgubWluKFxuICAgICAgICBpbm5lcldpZHRoLFxuICAgICAgICBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZSdcbiAgICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5yaWdodCA6IGFuY2hvclByb3BzLmxlZnQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgYW5jaG9yWClcbiAgICAgIHByb3BzLmxlZnQgPSBNYXRoLm1heCgwLCBhbmNob3JYIC0gcHJvcHMubWF4V2lkdGgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICA6IChhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gc2VsZk9yaWdpbi5ob3Jpem9udGFsID8gYW5jaG9yUHJvcHMubGVmdCA6IGFuY2hvclByb3BzLnJpZ2h0KVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGlubmVyV2lkdGggLSBwcm9wcy5sZWZ0KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIFRyYW5zaXRpb24sIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzJ1xuaW1wb3J0IHVzZVNjcm9sbFRhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zY3JvbGwtdGFyZ2V0LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wb3J0YWwuanMnXG5pbXBvcnQgdXNlVHJhbnNpdGlvbiwgeyB1c2VUcmFuc2l0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10cmFuc2l0aW9uLmpzJ1xuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxNZW51cyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgYWRkRXNjYXBlS2V5LCByZW1vdmVFc2NhcGVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2VzY2FwZS1rZXkuanMnXG5pbXBvcnQgeyBhZGRGb2N1c291dCwgcmVtb3ZlRm9jdXNvdXQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3Vzb3V0LmpzJ1xuaW1wb3J0IHsgY2hpbGRIYXNGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jbGljay1vdXRzaWRlLmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcblxuaW1wb3J0IHtcbiAgdmFsaWRhdGVQb3NpdGlvbiwgdmFsaWRhdGVPZmZzZXQsIHNldFBvc2l0aW9uLCBwYXJzZVBvc2l0aW9uXG59IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU1lbnUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IEJvb2xlYW4sXG5cbiAgICBub1JvdXRlRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JlZm9jdXM6IEJvb2xlYW4sXG4gICAgbm9Gb2N1czogQm9vbGVhbixcblxuICAgIGZpdDogQm9vbGVhbixcbiAgICBjb3ZlcjogQm9vbGVhbixcblxuICAgIHNxdWFyZTogQm9vbGVhbixcblxuICAgIGFuY2hvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBzZWxmOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlT2Zmc2V0XG4gICAgfSxcblxuICAgIHNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfSxcblxuICAgIHRvdWNoUG9zaXRpb246IEJvb2xlYW4sXG5cbiAgICBtYXhIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1heFdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnY2xpY2snLCAnZXNjYXBlS2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGxldCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgYWJzb2x1dGVPZmZzZXQsIHVud2F0Y2hQb3NpdGlvbiwgYXZvaWRBdXRvQ2xvc2VcblxuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5IH0gPSB2bVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBpbm5lclJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihwcm9wcylcbiAgICBjb25zdCB7IGxvY2FsU2Nyb2xsVGFyZ2V0LCBjaGFuZ2VTY3JvbGxFdmVudCwgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgfSA9IHVzZVNjcm9sbFRhcmdldChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KVxuXG4gICAgY29uc3QgeyBhbmNob3JFbCwgY2FuU2hvdyB9ID0gdXNlQW5jaG9yKHsgc2hvd2luZyB9KVxuXG4gICAgY29uc3QgeyBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLCBjYW5TaG93LCBoYW5kbGVTaG93LCBoYW5kbGVIaWRlLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudClcblxuICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgYW5jaG9yRWwsXG4gICAgICBpbm5lclJlZixcbiAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBhbHdheXMgcHJldmVudCB0b3VjaCBldmVudFxuICAgICAgICAgICAgZS50eXBlID09PSAndG91Y2hzdGFydCdcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2xpY2sgaWYgaXQncyBvbiBhIGRpYWxvZyBiYWNrZHJvcFxuICAgICAgICAgICAgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHBhcnNlUG9zaXRpb24oXG4gICAgICAgIHByb3BzLmFuY2hvciB8fCAoXG4gICAgICAgICAgcHJvcHMuY292ZXIgPT09IHRydWUgPyAnY2VudGVyIG1pZGRsZScgOiAnYm90dG9tIHN0YXJ0J1xuICAgICAgICApLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHNlbGZPcmlnaW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb3ZlciA9PT0gdHJ1ZVxuICAgICAgICA/IGFuY2hvck9yaWdpbi52YWx1ZVxuICAgICAgICA6IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiB8fCAndG9wIHN0YXJ0JywgJHEubGFuZy5ydGwpXG4gICAgKSlcblxuICAgIGNvbnN0IG1lbnVDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLW1lbnUtLXNxdWFyZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1tZW51LS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmF1dG9DbG9zZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgb25DbGljazogb25BdXRvQ2xvc2UgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IGhhbmRsZXNGb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICApXG5cbiAgICB3YXRjaChoYW5kbGVzRm9jdXMsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIGFkZEVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgYWRkQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBpbm5lclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZVxuICAgICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgOiBudWxsXG5cbiAgICAgIGFkZEZvY3Vzb3V0KG9uRm9jdXNvdXQpXG5cbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcblxuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKGV2dCAhPT0gdm9pZCAwICYmIChwcm9wcy50b3VjaFBvc2l0aW9uIHx8IHByb3BzLmNvbnRleHRNZW51KSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG5cbiAgICAgICAgaWYgKHBvcy5sZWZ0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gYW5jaG9yRWwudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICBhYnNvbHV0ZU9mZnNldCA9IHsgbGVmdDogcG9zLmxlZnQgLSBsZWZ0LCB0b3A6IHBvcy50b3AgLSB0b3AgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB3YXRjaChcbiAgICAgICAgICAoKSA9PiAkcS5zY3JlZW4ud2lkdGggKyAnfCcgKyAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3wnICsgcHJvcHMuc2VsZiArICd8JyArIHByb3BzLmFuY2hvciArICd8JyArICRxLmxhbmcucnRsLFxuICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm5vRm9jdXMgIT09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlICYmIGZvY3VzKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlcXVpcmVkIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcImRvdWJsZS10YXAgbmVlZGVkXCIgaXNzdWVcbiAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmlvcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGlmIGF1dG8tY2xvc2UsIHRoZW4gdGhpcyBjbGljayBzaG91bGRcbiAgICAgICAgICAvLyBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgICAgICBhdm9pZEF1dG9DbG9zZSA9IHByb3BzLmF1dG9DbG9zZVxuICAgICAgICAgIGlubmVyUmVmLnZhbHVlLmNsaWNrKClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICAgICAgc2hvd1BvcnRhbCh0cnVlKSAvLyBkb25lIHNob3dpbmcgcG9ydGFsXG4gICAgICAgIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSGlkZSAoZXZ0KSB7XG4gICAgICByZW1vdmVUaWNrKClcbiAgICAgIGhpZGVQb3J0YWwoKVxuXG4gICAgICBhbmNob3JDbGVhbnVwKHRydWUpXG5cbiAgICAgIGlmIChcbiAgICAgICAgcmVmb2N1c1RhcmdldCAhPT0gbnVsbFxuICAgICAgICAmJiAoXG4gICAgICAgICAgLy8gbWVudSB3YXMgaGlkZGVuIGZyb20gY29kZSBvciBFU0MgcGx1Z2luXG4gICAgICAgICAgZXZ0ID09PSB2b2lkIDBcbiAgICAgICAgICAvLyBtZW51IHdhcyBub3QgY2xvc2VkIGZyb20gYSBtb3VzZSBvciB0b3VjaCBjbGlja091dHNpZGVcbiAgICAgICAgICB8fCBldnQucUNsaWNrT3V0c2lkZSAhPT0gdHJ1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgKChldnQgJiYgZXZ0LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGlkZVBvcnRhbCh0cnVlKSAvLyBkb25lIGhpZGluZywgbm93IGRlc3Ryb3lcbiAgICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmNob3JDbGVhbnVwIChoaWRpbmcpIHtcbiAgICAgIGFic29sdXRlT2Zmc2V0ID0gdm9pZCAwXG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24oKVxuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyA9PT0gdHJ1ZSB8fCBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNvdXQpXG4gICAgICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgIT09IHRydWUpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsIHx8IHByb3BzLnNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gZ2V0U2Nyb2xsVGFyZ2V0KGFuY2hvckVsLnZhbHVlLCBwcm9wcy5zY3JvbGxUYXJnZXQpXG4gICAgICAgIGNoYW5nZVNjcm9sbEV2ZW50KGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlLCB1cGRhdGVQb3NpdGlvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkF1dG9DbG9zZSAoZSkge1xuICAgICAgLy8gaWYgYXV0by1jbG9zZSwgdGhlbiB0aGUgaW9zIGRvdWJsZS10YXAgZml4IHdoaWNoXG4gICAgICAvLyBpc3N1ZXMgYSBjbGljayBzaG91bGQgbm90IGNsb3NlIHRoZSBtZW51XG4gICAgICBpZiAoYXZvaWRBdXRvQ2xvc2UgIT09IHRydWUpIHtcbiAgICAgICAgY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZSlcbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3Vzb3V0IChldnQpIHtcbiAgICAgIC8vIHRoZSBmb2N1cyBpcyBub3QgaW4gYSB2dWUgY2hpbGQgY29tcG9uZW50XG4gICAgICBpZiAoXG4gICAgICAgIGhhbmRsZXNGb2N1cy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5ub0ZvY3VzICE9PSB0cnVlXG4gICAgICAgICYmIGNoaWxkSGFzRm9jdXMoaW5uZXJSZWYudmFsdWUsIGV2dC50YXJnZXQpICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgZm9jdXMoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXNjYXBlS2V5IChldnQpIHtcbiAgICAgIGVtaXQoJ2VzY2FwZUtleScpXG4gICAgICBoaWRlKGV2dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbiAoKSB7XG4gICAgICBjb25zdCBlbCA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgIGlmIChlbCA9PT0gbnVsbCB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc2V0UG9zaXRpb24oe1xuICAgICAgICBlbCxcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5vZmZzZXQsXG4gICAgICAgIGFuY2hvckVsOiBhbmNob3JFbC52YWx1ZSxcbiAgICAgICAgYW5jaG9yT3JpZ2luOiBhbmNob3JPcmlnaW4udmFsdWUsXG4gICAgICAgIHNlbGZPcmlnaW46IHNlbGZPcmlnaW4udmFsdWUsXG4gICAgICAgIGFic29sdXRlT2Zmc2V0LFxuICAgICAgICBmaXQ6IHByb3BzLmZpdCxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIFRyYW5zaXRpb24sXG4gICAgICAgIHRyYW5zaXRpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICByb2xlOiAnbWVudScsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgJ3EtbWVudSBxLXBvc2l0aW9uLWVuZ2luZSBzY3JvbGwnICsgbWVudUNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiBbXG4gICAgICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGFuY2hvckNsZWFudXApXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwibGV0IHJ0bEhhc1Njcm9sbEJ1ZyA9IGZhbHNlXG5cbi8vIG1vYmlsZSBDaHJvbWUgdGFrZXMgdGhlIGNyb3duIGZvciB0aGlzXG5pZiAoIV9fUVVBU0FSX1NTUl9fKSB7XG4gIGNvbnN0IHNjcm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkaXInLCAncnRsJylcbiAgT2JqZWN0LmFzc2lnbihzY3JvbGxlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMXB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnLFxuICAgIG92ZXJmbG93OiAnYXV0bydcbiAgfSlcblxuICBjb25zdCBzcGFjZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBPYmplY3QuYXNzaWduKHNwYWNlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMTAwMHB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnXG4gIH0pXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxlcilcbiAgc2Nyb2xsZXIuYXBwZW5kQ2hpbGQoc3BhY2VyKVxuICBzY3JvbGxlci5zY3JvbGxMZWZ0ID0gLTEwMDBcblxuICBydGxIYXNTY3JvbGxCdWcgPSBzY3JvbGxlci5zY3JvbGxMZWZ0ID49IDBcblxuICBzY3JvbGxlci5yZW1vdmUoKVxufVxuXG5leHBvcnQge1xuICBydGxIYXNTY3JvbGxCdWdcbn1cbiIsImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKSB7XG4gIGxldCBoaXN0b3J5RW50cnlcblxuICBmdW5jdGlvbiByZW1vdmVGcm9tSGlzdG9yeSAoKSB7XG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlRnJvbUhpc3RvcnksXG5cbiAgICBhZGRUb0hpc3RvcnkgKCkge1xuICAgICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgICBjb25kaXRpb246ICgpID0+IGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlLFxuICAgICAgICBoYW5kbGVyOiBoaWRlXG4gICAgICB9XG5cbiAgICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGdldEV2ZW50UGF0aCwgbGlzdGVuT3B0cywgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhhc1Njcm9sbGJhciwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxubGV0XG4gIHJlZ2lzdGVyZWQgPSAwLFxuICBzY3JvbGxQb3NpdGlvblgsXG4gIHNjcm9sbFBvc2l0aW9uWSxcbiAgbWF4U2Nyb2xsVG9wLFxuICB2cFBlbmRpbmdVcGRhdGUgPSBmYWxzZSxcbiAgYm9keUxlZnQsXG4gIGJvZHlUb3AsXG4gIGNsb3NlVGltZXJcblxuZnVuY3Rpb24gb25XaGVlbCAoZSkge1xuICBpZiAoc2hvdWxkUHJldmVudFNjcm9sbChlKSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkUHJldmVudFNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWxheW91dF9fYmFja2Ryb3AnKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdFxuICAgIHBhdGggPSBnZXRFdmVudFBhdGgoZSksXG4gICAgc2hpZnQgPSBlLnNoaWZ0S2V5ICYmICFlLmRlbHRhWCxcbiAgICBzY3JvbGxZID0gIXNoaWZ0ICYmIE1hdGguYWJzKGUuZGVsdGFYKSA8PSBNYXRoLmFicyhlLmRlbHRhWSksXG4gICAgZGVsdGEgPSBzaGlmdCB8fCBzY3JvbGxZID8gZS5kZWx0YVkgOiBlLmRlbHRhWFxuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsID0gcGF0aFsgaW5kZXggXVxuXG4gICAgaWYgKGhhc1Njcm9sbGJhcihlbCwgc2Nyb2xsWSkpIHtcbiAgICAgIHJldHVybiBzY3JvbGxZXG4gICAgICAgID8gKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbFRvcCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICApXG4gICAgICAgIDogKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbExlZnQgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRXaWR0aCA9PT0gZWwuc2Nyb2xsV2lkdGhcbiAgICAgICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gb25BcHBsZVNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgLy8gcmVxdWlyZWQsIG90aGVyd2lzZSBpT1MgYmxvY2tzIGZ1cnRoZXIgc2Nyb2xsaW5nXG4gICAgLy8gdW50aWwgdGhlIG1vYmlsZSBzY3JvbGxiYXIgZGlzc2FwcGVhcnNcbiAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlUmVzaXplIChldnQpIHtcbiAgaWYgKHZwUGVuZGluZ1VwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdnBQZW5kaW5nVXBkYXRlID0gdHJ1ZVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2VcblxuICAgIGNvbnN0XG4gICAgICB7IGhlaWdodCB9ID0gZXZ0LnRhcmdldCxcbiAgICAgIHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxUb3AgfSA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnRcblxuICAgIGlmIChtYXhTY3JvbGxUb3AgPT09IHZvaWQgMCB8fCBoZWlnaHQgIT09IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgbWF4U2Nyb2xsVG9wID0gY2xpZW50SGVpZ2h0IC0gaGVpZ2h0XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgIH1cblxuICAgIGlmIChzY3JvbGxUb3AgPiBtYXhTY3JvbGxUb3ApIHtcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC09IE1hdGguY2VpbCgoc2Nyb2xsVG9wIC0gbWF4U2Nyb2xsVG9wKSAvIDgpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBseSAoYWN0aW9uKSB7XG4gIGNvbnN0XG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgaGFzVmlld3BvcnQgPSB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMFxuXG4gIGlmIChhY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgY29uc3QgeyBvdmVyZmxvd1ksIG92ZXJmbG93WCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlcblxuICAgIHNjcm9sbFBvc2l0aW9uWCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgc2Nyb2xsUG9zaXRpb25ZID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgYm9keUxlZnQgPSBib2R5LnN0eWxlLmxlZnRcbiAgICBib2R5VG9wID0gYm9keS5zdHlsZS50b3BcblxuICAgIGJvZHkuc3R5bGUubGVmdCA9IGAtJHsgc2Nyb2xsUG9zaXRpb25YIH1weGBcbiAgICBib2R5LnN0eWxlLnRvcCA9IGAtJHsgc2Nyb2xsUG9zaXRpb25ZIH1weGBcblxuICAgIGlmIChvdmVyZmxvd1ggIT09ICdoaWRkZW4nICYmIChvdmVyZmxvd1ggPT09ICdzY3JvbGwnIHx8IGJvZHkuc2Nyb2xsV2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteCcpXG4gICAgfVxuICAgIGlmIChvdmVyZmxvd1kgIT09ICdoaWRkZW4nICYmIChvdmVyZmxvd1kgPT09ICdzY3JvbGwnIHx8IGJvZHkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSkge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci15JylcbiAgICB9XG5cbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tcHJldmVudC1zY3JvbGwnKVxuICAgIGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgPSB0cnVlXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVNjcm9sbCwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUgJiYgY2xpZW50LmlzLm1hYyA9PT0gdHJ1ZSkge1xuICAgIC8vIHJlZi4gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNy8wMS9zY3JvbGxpbmctaW50ZXJ2ZW50aW9uXG4gICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCd3aGVlbCcsIG9uV2hlZWwsIGxpc3Rlbk9wdHMubm90UGFzc2l2ZSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG5cbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gZmFsc2VcblxuICAgIGJvZHkuc3R5bGUubGVmdCA9IGJvZHlMZWZ0XG4gICAgYm9keS5zdHlsZS50b3AgPSBib2R5VG9wXG5cbiAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsUG9zaXRpb25YLCBzY3JvbGxQb3NpdGlvblkpXG4gICAgbWF4U2Nyb2xsVG9wID0gdm9pZCAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGxldCBhY3Rpb24gPSAnYWRkJ1xuXG4gIGlmIChzdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJlZ2lzdGVyZWQrK1xuXG4gICAgaWYgKGNsb3NlVGltZXIgIT09IHZvaWQgMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG4gICAgICBjbG9zZVRpbWVyID0gdm9pZCAwXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocmVnaXN0ZXJlZCA+IDEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocmVnaXN0ZXJlZCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmVnaXN0ZXJlZC0tXG5cbiAgICBpZiAocmVnaXN0ZXJlZCA+IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGFjdGlvbiA9ICdyZW1vdmUnXG5cbiAgICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiBjbGllbnQuaXMubmF0aXZlTW9iaWxlID09PSB0cnVlKSB7XG4gICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcblxuICAgICAgY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBhcHBseShhY3Rpb24pXG4gICAgICAgIGNsb3NlVGltZXIgPSB2b2lkIDBcbiAgICAgIH0sIDEwMClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGFwcGx5KGFjdGlvbilcbn1cbiIsImltcG9ydCBwcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL3V0aWxzL3ByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCBjdXJyZW50U3RhdGVcblxuICByZXR1cm4ge1xuICAgIHByZXZlbnRCb2R5U2Nyb2xsIChzdGF0ZSkge1xuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZSAhPT0gY3VycmVudFN0YXRlXG4gICAgICAgICYmIChjdXJyZW50U3RhdGUgIT09IHZvaWQgMCB8fCBzdGF0ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgICAgICBwcmV2ZW50U2Nyb2xsKHN0YXRlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIm9uS2V5dXAiLCJ0aW1lciIsImhhbmRsZXJzIiwiaCJdLCJtYXBwaW5ncyI6Ijs7QUFLQSxJQUFBLGVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QiwyQ0FDd0IsTUFBTSxXQUFXLFFBQVEsTUFBTSxTQUFTLFFBQVEsTUFBTSxjQUFjLE9BQU8sU0FBUyxZQUN6RyxNQUFNLFFBQVEsT0FBTyx3Q0FBd0Msc0JBQzdELE1BQU0sV0FBVyxPQUFPLDZCQUE2QixPQUNyRCxNQUFNLGNBQWMsT0FBTyxnQ0FBZ0MsT0FDM0QsTUFBTSxXQUFXLE9BQU8sNkJBQTZCO0FBQUEsSUFDekQ7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLE1BQUssR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDckU7QUFDSCxDQUFDO0FDbEJELElBQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxLQUFL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
