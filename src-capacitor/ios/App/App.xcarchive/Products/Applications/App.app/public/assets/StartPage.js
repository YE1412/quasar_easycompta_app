import { d as computed, c as createComponent, f as ref, w as watch, n as onBeforeUnmount, h, ah as Transition, e as hSlot, ai as QSpinner, ac as _export_sfc, $ as defineComponent, ao as useI18n, an as useRouter, _ as __vitePreload, o as onMounted, a1 as createBlock, a2 as withCtx, g as getCurrentInstance, a3 as openBlock, a4 as createVNode, a5 as createCommentVNode, ar as createBaseVNode, at as normalizeClass, aq as unref, aa as toDisplayString, Q as QIcon, j as QBtn, as as normalizeStyle, B as nextTick } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { Q as QInput } from "./QInput.js";
import { Q as QForm } from "./QForm.js";
import { Q as QPage } from "./QPage.js";
import { u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, n as newQuery, s as setDecryptApi, _ as __TRANSFORMOBJ__, c as closeDbConnection, e as setCryptApi, f as __FORMATOBJ__ } from "./use-quasar.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { u as useSessionStore } from "./session.js";
import "./index4.js";
import "./index2.js";
import "./WasmModules.js";
import "./session.service.js";
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer;
    const images = [
      ref(null),
      ref(getPlaceholderSrc())
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function getPlaceholderSrc() {
      return props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null;
    }
    function addImage(imgProps) {
      clearTimeout(loadTimer);
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[position.value ^ 1].value = getPlaceholderSrc();
      } else {
        isLoading.value = true;
      }
      images[position.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (loadTimer === null) {
        return;
      }
      clearTimeout(loadTimer);
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (loadTimer === null || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (loadTimer === null) {
        return;
      }
      position.value = position.value ^ 1;
      images[position.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      clearTimeout(loadTimer);
      isLoading.value = false;
      hasError.value = true;
      images[position.value].value = null;
      images[position.value ^ 1].value = getPlaceholderSrc();
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        clearTimeout(loadTimer);
        loadTimer = null;
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
const _hoisted_1 = {
  class: "text-center bg-secondary text-black flex justify-center column",
  style: { "position": "relative" }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StartPage",
  props: {
    dbConn: { default: null }
  },
  emits: ["change-tab"],
  setup(__props, { emit }) {
    const props = __props;
    const app = getCurrentInstance();
    const key = app.appContext.config.globalProperties.$key;
    const $q = useQuasar();
    const platform = $q.platform;
    const login = ref(null);
    const pass = ref(null);
    const messageVisibility = ref(false);
    const renderComponent = ref(true);
    const { t } = useI18n();
    const router = useRouter();
    const imgSrc = ref(null);
    const nonEmptyLogin = computed(() => {
      return !!login.value && login.value != "";
    });
    const nonEmptyPass = computed(() => {
      return !!pass.value && pass.value != "";
    });
    const headingDesktopClass = "q-pt-lg q-pb-lg SenExtrabold-font text-h2 text-uppercase text-center text-bold";
    const headingMobileClass = "q-pt-lg q-pb-lg SenExtrabold-font text-h4 text-uppercase text-center text-bold";
    const orientation = ref(null);
    const compact = ref(false);
    let userStore = null, sessionStore = null, messageStore = null, prefs = null;
    if (platform.is.desktop) {
      userStore = useUserStore();
      sessionStore = useSessionStore();
      messageStore = useMessageStore();
      if (messageStore.getMessages.length) {
        messageStore.setMessagesVisibility(true);
      }
      messageVisibility.value = messageStore.getMessagesVisibility;
      imgSrc.value = "dist/assets/imgs/slider-2.jpg";
    } else {
      imgSrc.value = "/assets/imgs/slider-2.jpg";
      orientation.value = window.screen.orientation.type;
      if (orientation.value === "portrait-primary" || orientation.value === "portrait-secondary") {
        compact.value = true;
      }
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
    async function forceMessageItemsRerender() {
      renderComponent.value = false;
      await nextTick();
      renderComponent.value = true;
    }
    async function transformObject(obj) {
      await setCryptApi();
      __FORMATOBJ__(obj, key);
    }
    async function submit() {
      console.log("login to DB !");
      console.log(platform);
      const ret = await loginDb();
      console.log(`Login result --> ${ret} !`);
      if (platform.is.desktop) {
        if (ret) {
          const res = await sessionStore.getSession().then(() => {
            return true;
          }).catch((err) => {
            messageStore.messages.push({
              severity: true,
              content: t("startComponent.results.ko.session", { err })
            });
            messageStore.setMessagesVisibility(true);
            messageVisibility.value = true;
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: t("startComponent.results.ko.session", { err })
            });
            return false;
          });
          if (!res) {
            forceMessageItemsRerender();
          } else {
            messageStore.messages = [];
            messageStore.setMessagesVisibility(false);
            router.push(t("homeTerLinkTarget"));
          }
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("startComponent.errors.error.signIn")
          });
          forceMessageItemsRerender();
        }
      } else {
        if (ret) {
          const res = await getSessionForMobile().then((res2) => {
            return res2;
          }).catch(async (err) => {
            const mess = await prefs.getPref("message");
            mess.messages = [
              {
                severity: true,
                content: t("startComponent.results.ko.session", { err })
              }
            ];
            mess.messagesVisibility = true;
            await prefs.setPref("message", mess);
            messageVisibility.value = true;
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: t("startComponent.results.ko.session", { err })
            });
            return false;
          });
          if (!res) {
            forceMessageItemsRerender();
          } else {
            const usr = await prefs.getPref("user");
            console.log(usr);
            await prefs.setPref("message", {
              messages: [],
              messagesVisibility: false
            });
            router.push("/");
          }
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("startComponent.errors.error.signIn")
          });
          forceMessageItemsRerender();
        }
      }
    }
    function reset() {
      login.value = null;
      pass.value = null;
    }
    async function loginDb() {
      const obj = {
        login: login.value,
        pass: pass.value
      };
      await transformObject(obj);
      if (platform.is.desktop) {
        return userStore.loginUser(obj.login, obj.pass).then(() => {
          return true;
        }, () => {
          messageStore.messages.push({
            severity: true,
            content: t("startComponent.errors.error.signIn")
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
          return false;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("startComponent.results.ko.signIn", { err })
          });
          messageStore.setMessagesVisibility(true);
          messageVisibility.value = true;
          return false;
        });
      } else {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          const sql = `SELECT \`user\`.\`userId\`, \`user\`.\`firstName\`, \`user\`.\`lastName\`, \`user\`.\`login\`, \`user\`.\`email\`, \`user\`.\`companyName\`, \`user\`.\`companyLogo\`, \`devise\`.\`deviseId\` AS \`devise.deviseId\`, \`devise\`.\`symbole\` AS \`devise.symbole\`, \`devise\`.\`libelle\` AS \`devise.libelle\`, \`user_type\`.\`userTypeId\` AS \`user_type.userTypeId\`, \`user_type\`.\`regular\` AS \`user_type.regular\`, \`user_type\`.\`admin\` AS \`user_type.admin\` FROM \`user\` AS \`user\` LEFT OUTER JOIN \`devise\` AS \`devise\` ON \`user\`.\`deviseId\` = \`devise\`.\`deviseId\` LEFT OUTER JOIN \`user_type\` AS \`user_type\` ON \`user\`.\`userTypeId\` = \`user_type\`.\`userTypeId\` WHERE (\`user\`.\`login\` = '${obj.login}' OR \`user\`.\`email\` = '${obj.login}') AND \`user\`.\`pass\` = '${obj.pass}';`;
          const values = await newQuery(props.dbConn, sql);
          let res = false;
          if (!!values && values.values.length) {
            const intRes = sanitizeQueryResult(values.values);
            await setDecryptApi();
            const result = await __TRANSFORMOBJ__(intRes[0]);
            await prefs.setPref("user", { user: result, connected: false });
            res = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("startComponent.errors.error.signIn")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          }
          closeDbConnection(props.dbConn);
          return res;
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("startComponent.results.ko.signIn", { err: "Unable to open SQLite DB !" })
              }
            ],
            messagesVisibility: true
          });
          messageVisibility.value = true;
          return false;
        }
      }
    }
    function sanitizeQueryResult(obj) {
      let ret = [];
      for (const k in obj) {
        ret[k] = {};
        for (const l in obj[k]) {
          if (l === "devise.deviseId") {
            ret[k]["devise"] = ret[k]["devise"] === void 0 ? {} : ret[k]["devise"];
            ret[k]["devise"].deviseId = obj[k][l];
          } else if (l === "devise.symbole") {
            ret[k]["devise"] = ret[k]["devise"] === void 0 ? {} : ret[k]["devise"];
            ret[k]["devise"].symbole = obj[k][l];
          } else if (l === "devise.libelle") {
            ret[k]["devise"] = ret[k]["devise"] === void 0 ? {} : ret[k]["devise"];
            ret[k]["devise"].libelle = obj[k][l];
          } else if (l === "user_type.userTypeId") {
            ret[k]["user_type"] = ret[k]["user_type"] === void 0 ? {} : ret[k]["user_type"];
            ret[k]["user_type"].userTypeId = obj[k][l];
          } else if (l === "user_type.regular") {
            ret[k]["user_type"] = ret[k]["user_type"] === void 0 ? {} : ret[k]["user_type"];
            ret[k]["user_type"].regular = obj[k][l];
          } else if (l === "user_type.admin") {
            ret[k]["user_type"] = ret[k]["user_type"] === void 0 ? {} : ret[k]["user_type"];
            ret[k]["user_type"].admin = obj[k][l];
          } else if (l !== "deviseId" && l !== "userTypeId") {
            ret[k][l] = obj[k][l];
          }
        }
      }
      return ret;
    }
    async function getSessionForMobile() {
      return new Promise(async (resolve) => {
        const newId = v4();
        let session = !!$q.cookies.getAll().session ? JSON.parse(decodeURIComponent($q.cookies.getAll().session)) : null;
        if (!!session)
          session.sessionId = newId;
        else {
          session = {};
          session.sessionId = newId;
        }
        await prefs.setPref("session", session);
        resolve(true);
      });
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    watch(
      orientation,
      (newOrientation) => {
        if (!!newOrientation) {
          if (newOrientation === "portrait-primary" || newOrientation === "portrait-secondary") {
            compact.value = true;
          } else {
            compact.value = false;
          }
        }
      }
    );
    onMounted(() => {
      emit("change-tab", void 0);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "column items-center justify-start" }, {
        default: withCtx(() => [
          createVNode(QNoSsr, null, {
            default: withCtx(() => [
              messageVisibility.value && renderComponent.value ? (openBlock(), createBlock(MessagesItem, { key: 0 })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(QImg, {
            src: imgSrc.value,
            style: { "min-width": "100%", "height": "750px" },
            class: "flex content-center justify-center items-center"
          }, {
            error: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", {
                  class: normalizeClass(unref(platform).is.desktop ? headingDesktopClass : headingMobileClass)
                }, toDisplayString(unref(t)("startComponent.title")), 3),
                createVNode(QForm, {
                  onSubmit: submit,
                  onReset: reset,
                  class: "q-gutter-sm",
                  style: { "color": "white" }
                }, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      color: "white",
                      "label-color": "white",
                      "input-style": "color: white",
                      filled: "",
                      type: "text",
                      modelValue: login.value,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => login.value = $event),
                      label: unref(t)("startComponent.inputLabels.login"),
                      hint: unref(t)("startComponent.hints.login"),
                      "hide-hint": true,
                      placeholder: unref(t)("startComponent.placeholders.login"),
                      clearable: true,
                      "lazy-rules": "",
                      rules: [
                        (val) => unref(nonEmptyLogin) || unref(t)("startComponent.errors.empty.login")
                      ]
                    }, {
                      prepend: withCtx(() => [
                        createVNode(QIcon, {
                          name: "mdi-account",
                          color: "white"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
                    createVNode(QInput, {
                      color: "white",
                      "label-color": "white",
                      "input-style": "color: white",
                      filled: "",
                      type: "password",
                      modelValue: pass.value,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => pass.value = $event),
                      label: unref(t)("startComponent.inputLabels.pass") + " *",
                      "bottom-slots": true,
                      hint: unref(t)("startComponent.hints.pass"),
                      "hide-hint": true,
                      placeholder: unref(t)("startComponent.placeholders.pass"),
                      clearable: true,
                      "lazy-rules": "",
                      rules: [
                        (val) => unref(nonEmptyPass) || unref(t)("startComponent.errors.empty.pass")
                      ]
                    }, {
                      hint: withCtx(() => []),
                      prepend: withCtx(() => [
                        createVNode(QIcon, {
                          name: "lock",
                          color: "white"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
                    createBaseVNode("div", null, [
                      createVNode(QBtn, {
                        icon: "mdi-login",
                        label: unref(t)("startComponent.libelles.signInButton"),
                        type: "submit",
                        color: "primary"
                      }, null, 8, ["label"]),
                      createVNode(QBtn, {
                        label: unref(t)("startComponent.libelles.resetButton"),
                        type: "reset",
                        color: "white",
                        flat: "",
                        class: "q-ml-sm"
                      }, null, 8, ["label"])
                    ])
                  ]),
                  _: 1
                })
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", {
                class: "absolute-center text-center",
                style: normalizeStyle(compact.value ? "width: 80%;" : "")
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(unref(platform).is.desktop ? headingDesktopClass : headingMobileClass)
                }, toDisplayString(unref(t)("startComponent.title")), 3),
                createVNode(QForm, {
                  onSubmit: submit,
                  onReset: reset,
                  class: "q-gutter-md",
                  style: { "color": "white" }
                }, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      color: "white",
                      "label-color": "white",
                      "input-style": "color: white",
                      filled: "",
                      type: "text",
                      modelValue: login.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => login.value = $event),
                      label: unref(t)("startComponent.inputLabels.login") + " *",
                      hint: unref(t)("startComponent.hints.login"),
                      "hide-hint": true,
                      placeholder: unref(t)("startComponent.placeholders.login"),
                      clearable: true,
                      "lazy-rules": "",
                      rules: [
                        (val) => unref(nonEmptyLogin) || unref(t)("startComponent.errors.empty.login")
                      ]
                    }, {
                      prepend: withCtx(() => [
                        createVNode(QIcon, {
                          name: "mdi-account",
                          color: "white"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
                    createVNode(QInput, {
                      color: "white",
                      "label-color": "white",
                      "input-style": "color: white",
                      filled: "",
                      type: "password",
                      modelValue: pass.value,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => pass.value = $event),
                      label: unref(t)("startComponent.inputLabels.pass") + " *",
                      "bottom-slots": true,
                      hint: unref(t)("startComponent.hints.pass"),
                      "hide-hint": true,
                      placeholder: unref(t)("startComponent.placeholders.pass"),
                      clearable: true,
                      "lazy-rules": "",
                      rules: [
                        (val) => unref(nonEmptyPass) || unref(t)("startComponent.errors.empty.pass")
                      ]
                    }, {
                      hint: withCtx(() => []),
                      prepend: withCtx(() => [
                        createVNode(QIcon, {
                          name: "lock",
                          color: "white"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
                    createBaseVNode("div", null, [
                      createVNode(QBtn, {
                        icon: "mdi-login",
                        label: unref(t)("startComponent.libelles.signInButton"),
                        type: "submit",
                        color: "primary"
                      }, null, 8, ["label"]),
                      createVNode(QBtn, {
                        label: unref(t)("startComponent.libelles.resetButton"),
                        type: "reset",
                        color: "white",
                        flat: "",
                        class: "q-ml-sm"
                      }, null, 8, ["label"])
                    ])
                  ]),
                  _: 1
                })
              ], 4)
            ]),
            _: 1
          }, 8, ["src"])
        ]),
        _: 1
      });
    };
  }
});
var StartPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "StartPage.vue"]]);
export { StartPage as default };
//# sourceMappingURL=data:application/json;base64,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Q2xCO0FBQ0Ysb0JBQVU7QUFDVixrQkFBUSxZQUFZO0FBQUEsUUFDdEI7QUFFTSxvQkFBTSxRQUFRLFdBQVcsT0FBTztBQUN0QyxnQkFBUSxJQUFJO0FBQUEsT0FDYjtBQUFBLElBQ0g7QUFDQSxhQUFTLG9CQUFtQjtBQUVkLDBCQUFRLE9BQU8sWUFBWTtBQUFBLElBQ3pDO0FBR0E7QUFBQSxNQUNFO0FBQUEsTUFDQSxDQUFDLG1CQUFtQjtBQUNkLGFBQUMsQ0FBQyxnQkFBZ0I7QUFDaEIsaUNBQW1CLHNCQUFzQixtQkFBbUIsc0JBQXFCO0FBQ25GLG9CQUFRLFFBQVE7QUFBQSxpQkFFYjtBQUNILG9CQUFRLFFBQVE7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFJRixjQUFVLE1BQU07QUFDZCxXQUFLLGNBQWMsTUFBUztBQUFBLEtBQzdCIiwibmFtZXMiOlsicmVzIiwidXVpZHY0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmF0aW8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ltZy9RSW1nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9TdGFydFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlUmF0aW9Qcm9wcyA9IHtcbiAgcmF0aW86IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIG5hdHVyYWxSYXRpbykge1xuICAvLyByZXR1cm4gcmF0aW9TdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHJhdGlvID0gTnVtYmVyKFxuICAgICAgcHJvcHMucmF0aW8gfHwgKG5hdHVyYWxSYXRpbyAhPT0gdm9pZCAwID8gbmF0dXJhbFJhdGlvLnZhbHVlIDogdm9pZCAwKVxuICAgIClcblxuICAgIHJldHVybiBpc05hTihyYXRpbykgIT09IHRydWUgJiYgcmF0aW8gPiAwXG4gICAgICA/IHsgcGFkZGluZ0JvdHRvbTogYCR7IDEwMCAvIHJhdGlvIH0lYCB9XG4gICAgICA6IG51bGxcbiAgfSlcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VSYXRpbywgeyB1c2VSYXRpb1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmF0aW8uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgZGVmYXVsdFJhdGlvID0gMTYgLyA5XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW1nJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJhdGlvUHJvcHMsXG5cbiAgICBzcmM6IFN0cmluZyxcbiAgICBzcmNzZXQ6IFN0cmluZyxcbiAgICBzaXplczogU3RyaW5nLFxuXG4gICAgYWx0OiBTdHJpbmcsXG4gICAgY3Jvc3NvcmlnaW46IFN0cmluZyxcbiAgICBkZWNvZGluZzogU3RyaW5nLFxuICAgIHJlZmVycmVycG9saWN5OiBTdHJpbmcsXG5cbiAgICBkcmFnZ2FibGU6IEJvb2xlYW4sXG5cbiAgICBsb2FkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbGF6eSdcbiAgICB9LFxuICAgIGZldGNocHJpb3JpdHk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhdXRvJ1xuICAgIH0sXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZyxcbiAgICBpbml0aWFsUmF0aW86IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRSYXRpb1xuICAgIH0sXG5cbiAgICBwbGFjZWhvbGRlclNyYzogU3RyaW5nLFxuXG4gICAgZml0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY292ZXInXG4gICAgfSxcbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzUwJSA1MCUnXG4gICAgfSxcblxuICAgIGltZ0NsYXNzOiBTdHJpbmcsXG4gICAgaW1nU3R5bGU6IE9iamVjdCxcblxuICAgIG5vU3Bpbm5lcjogQm9vbGVhbixcbiAgICBub05hdGl2ZU1lbnU6IEJvb2xlYW4sXG4gICAgbm9UcmFuc2l0aW9uOiBCb29sZWFuLFxuXG4gICAgc3Bpbm5lckNvbG9yOiBTdHJpbmcsXG4gICAgc3Bpbm5lclNpemU6IFN0cmluZ1xuICB9LFxuXG4gIGVtaXRzOiBbICdsb2FkJywgJ2Vycm9yJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgbmF0dXJhbFJhdGlvID0gcmVmKHByb3BzLmluaXRpYWxSYXRpbylcbiAgICBjb25zdCByYXRpb1N0eWxlID0gdXNlUmF0aW8ocHJvcHMsIG5hdHVyYWxSYXRpbylcblxuICAgIGxldCBsb2FkVGltZXJcblxuICAgIGNvbnN0IGltYWdlcyA9IFtcbiAgICAgIHJlZihudWxsKSxcbiAgICAgIHJlZihnZXRQbGFjZWhvbGRlclNyYygpKVxuICAgIF1cblxuICAgIGNvbnN0IHBvc2l0aW9uID0gcmVmKDApXG5cbiAgICBjb25zdCBpc0xvYWRpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaGFzRXJyb3IgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZyBxLWltZy0tJHsgcHJvcHMubm9OYXRpdmVNZW51ID09PSB0cnVlID8gJ25vLScgOiAnJyB9bWVudWBcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodFxuICAgIH0pKVxuXG4gICAgY29uc3QgaW1nQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nX19pbWFnZSAkeyBwcm9wcy5pbWdDbGFzcyAhPT0gdm9pZCAwID8gcHJvcHMuaW1nQ2xhc3MgKyAnICcgOiAnJyB9YFxuICAgICAgKyBgcS1pbWdfX2ltYWdlLS13aXRoJHsgcHJvcHMubm9UcmFuc2l0aW9uID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgKVxuXG4gICAgY29uc3QgaW1nU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4ucHJvcHMuaW1nU3R5bGUsXG4gICAgICBvYmplY3RGaXQ6IHByb3BzLmZpdCxcbiAgICAgIG9iamVjdFBvc2l0aW9uOiBwcm9wcy5wb3NpdGlvblxuICAgIH0pKVxuXG4gICAgd2F0Y2goKCkgPT4gZ2V0Q3VycmVudFNyYygpLCBhZGRJbWFnZSlcblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRTcmMgKCkge1xuICAgICAgcmV0dXJuIHByb3BzLnNyYyB8fCBwcm9wcy5zcmNzZXQgfHwgcHJvcHMuc2l6ZXNcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBzcmM6IHByb3BzLnNyYyxcbiAgICAgICAgICAgIHNyY3NldDogcHJvcHMuc3Jjc2V0LFxuICAgICAgICAgICAgc2l6ZXM6IHByb3BzLnNpemVzXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlclNyYyAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMucGxhY2Vob2xkZXJTcmMgIT09IHZvaWQgMFxuICAgICAgICA/IHsgc3JjOiBwcm9wcy5wbGFjZWhvbGRlclNyYyB9XG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEltYWdlIChpbWdQcm9wcykge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgaWYgKGltZ1Byb3BzID09PSBudWxsKSB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBnZXRQbGFjZWhvbGRlclNyYygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBpbWdQcm9wc1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTG9hZCAoeyB0YXJnZXQgfSkge1xuICAgICAgLy8gaWYgY29tcG9uZW50IGhhcyBiZWVuIGFscmVhZHkgZGVzdHJveWVkXG4gICAgICBpZiAobG9hZFRpbWVyID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG5cbiAgICAgIG5hdHVyYWxSYXRpby52YWx1ZSA9IHRhcmdldC5uYXR1cmFsSGVpZ2h0ID09PSAwXG4gICAgICAgID8gMC41XG4gICAgICAgIDogdGFyZ2V0Lm5hdHVyYWxXaWR0aCAvIHRhcmdldC5uYXR1cmFsSGVpZ2h0XG5cbiAgICAgIHdhaXRGb3JDb21wbGV0ZW5lc3ModGFyZ2V0LCAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JDb21wbGV0ZW5lc3MgKHRhcmdldCwgY291bnQpIHtcbiAgICAgIC8vIHByb3RlY3QgYWdhaW5zdCBydW5uaW5nIGZvcmV2ZXJcbiAgICAgIGlmIChsb2FkVGltZXIgPT09IG51bGwgfHwgY291bnQgPT09IDEwMDApIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKHRhcmdldC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvblJlYWR5KHRhcmdldClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb2FkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3YWl0Rm9yQ29tcGxldGVuZXNzKHRhcmdldCwgY291bnQgKyAxKVxuICAgICAgICB9LCA1MClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5IChpbWcpIHtcbiAgICAgIC8vIGlmIGNvbXBvbmVudCBoYXMgYmVlbiBhbHJlYWR5IGRlc3Ryb3llZFxuICAgICAgaWYgKGxvYWRUaW1lciA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBwb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnZhbHVlIF4gMVxuICAgICAgaW1hZ2VzWyBwb3NpdGlvbi52YWx1ZSBdLnZhbHVlID0gbnVsbFxuICAgICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcbiAgICAgIGVtaXQoJ2xvYWQnLCBpbWcuY3VycmVudFNyYyB8fCBpbWcuc3JjKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IgKGVycikge1xuICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IHRydWVcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IG51bGxcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBnZXRQbGFjZWhvbGRlclNyYygpXG4gICAgICBlbWl0KCdlcnJvcicsIGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbWFnZSAoaW5kZXgpIHtcbiAgICAgIGNvbnN0IGltZyA9IGltYWdlc1sgaW5kZXggXS52YWx1ZVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBrZXk6ICdpbWdfJyArIGluZGV4LFxuICAgICAgICBjbGFzczogaW1nQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBpbWdTdHlsZS52YWx1ZSxcbiAgICAgICAgY3Jvc3NvcmlnaW46IHByb3BzLmNyb3Nzb3JpZ2luLFxuICAgICAgICBkZWNvZGluZzogcHJvcHMuZGVjb2RpbmcsXG4gICAgICAgIHJlZmVycmVycG9saWN5OiBwcm9wcy5yZWZlcnJlcnBvbGljeSxcbiAgICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgICAgbG9hZGluZzogcHJvcHMubG9hZGluZyxcbiAgICAgICAgZmV0Y2hwcmlvcml0eTogcHJvcHMuZmV0Y2hwcmlvcml0eSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICBkcmFnZ2FibGU6IHByb3BzLmRyYWdnYWJsZSxcbiAgICAgICAgLi4uaW1nXG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbi52YWx1ZSA9PT0gaW5kZXgpIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnIHEtaW1nX19pbWFnZS0td2FpdGluZydcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7IG9uTG9hZCwgb25FcnJvciB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJyBxLWltZ19faW1hZ2UtLWxvYWRlZCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiAncS1pbWdfX2NvbnRhaW5lciBhYnNvbHV0ZS1mdWxsJywga2V5OiAnaW1nJyArIGluZGV4IH0sXG4gICAgICAgIGgoJ2ltZycsIGRhdGEpXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBpZiAoaXNMb2FkaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWltZ19fY29udGVudCBhYnNvbHV0ZS1mdWxsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBoU2xvdChzbG90c1sgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgPyAnZXJyb3InIDogJ2RlZmF1bHQnIF0pKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdsb2FkaW5nJyxcbiAgICAgICAgY2xhc3M6ICdxLWltZ19fbG9hZGluZyBhYnNvbHV0ZS1mdWxsIGZsZXggZmxleC1jZW50ZXInXG4gICAgICB9LCAoXG4gICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLm5vU3Bpbm5lciA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgIGgoUVNwaW5uZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuc3Bpbm5lckNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHByb3BzLnNwaW5uZXJTaXplXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICApKVxuICAgIH1cblxuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGlmIChfX1FVQVNBUl9TU1JfQ0xJRU5UX18pIHtcbiAgICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgICBhZGRJbWFnZShnZXRDdXJyZW50U3JjKCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWRkSW1hZ2UoZ2V0Q3VycmVudFNyYygpKVxuICAgICAgfVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW11cblxuICAgICAgaWYgKHJhdGlvU3R5bGUudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsga2V5OiAnZmlsbGVyJywgc3R5bGU6IHJhdGlvU3R5bGUudmFsdWUgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzRXJyb3IudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGltYWdlc1sgMCBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY29udGVudC5wdXNoKGdldEltYWdlKDApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltYWdlc1sgMSBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY29udGVudC5wdXNoKGdldEltYWdlKDEpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnIH0sIGdldENvbnRlbnQpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdpbWcnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmFsdFxuICAgICAgfSwgY29udGVudClcbiAgICB9XG4gIH1cbn0pXG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXIganVzdGlmeS1zdGFydFwiPlxuICAgIDwhLS0gY29udGVudCAtLT5cbiAgICA8cS1uby1zc3I+XG4gICAgICA8TWVzc2FnZXNJdGVtIHYtaWY9J21lc3NhZ2VWaXNpYmlsaXR5ICYmIHJlbmRlckNvbXBvbmVudCcgLz5cbiAgICA8L3Etbm8tc3NyPlxuICAgIDxxLWltZ1xuICAgICAgOnNyYz1cImltZ1NyY1wiXG4gICAgICBzdHlsZT1cIm1pbi13aWR0aDogMTAwJTsgaGVpZ2h0OiA3NTBweDtcIlxuICAgICAgY2xhc3M9XCJmbGV4IGNvbnRlbnQtY2VudGVyIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlclwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImFic29sdXRlLWNlbnRlciB0ZXh0LWNlbnRlclwiIDpzdHlsZT1cImNvbXBhY3QgPyAnd2lkdGg6IDgwJTsnIDogJydcIj5cbiAgICAgICAgPGRpdiA6Y2xhc3M9J3BsYXRmb3JtLmlzLmRlc2t0b3AgPyBoZWFkaW5nRGVza3RvcENsYXNzIDogaGVhZGluZ01vYmlsZUNsYXNzJz57eyB0KCdzdGFydENvbXBvbmVudC50aXRsZScpIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cS1mb3JtXG4gICAgICAgICAgQHN1Ym1pdD0nc3VibWl0J1xuICAgICAgICAgIEByZXNldD0ncmVzZXQnXG4gICAgICAgICAgY2xhc3M9J3EtZ3V0dGVyLW1kJ1xuICAgICAgICAgIHN0eWxlPSdjb2xvcjogd2hpdGUnPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgIGxhYmVsLWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgaW5wdXQtc3R5bGU9XCJjb2xvcjogd2hpdGVcIlxuICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2LW1vZGVsPVwibG9naW5cIlxuICAgICAgICAgICAgOmxhYmVsPVwidCgnc3RhcnRDb21wb25lbnQuaW5wdXRMYWJlbHMubG9naW4nKSArICcgKidcIlxuICAgICAgICAgICAgOmhpbnQ9XCJ0KCdzdGFydENvbXBvbmVudC5oaW50cy5sb2dpbicpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3N0YXJ0Q29tcG9uZW50LnBsYWNlaG9sZGVycy5sb2dpbicpXCJcbiAgICAgICAgICAgIDpjbGVhcmFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgICAgIDpydWxlcz1cIlsgXG4gICAgICAgICAgICAgIHZhbCA9PiBub25FbXB0eUxvZ2luIHx8IHQoJ3N0YXJ0Q29tcG9uZW50LmVycm9ycy5lbXB0eS5sb2dpbicpXG4gICAgICAgICAgICBdXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hY2NvdW50XCIgY29sb3I9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICBsYWJlbC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgIGlucHV0LXN0eWxlPVwiY29sb3I6IHdoaXRlXCJcbiAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJwYXNzXCJcbiAgICAgICAgICAgIDpsYWJlbD1cInQoJ3N0YXJ0Q29tcG9uZW50LmlucHV0TGFiZWxzLnBhc3MnKSsnIConXCJcbiAgICAgICAgICAgIDpib3R0b20tc2xvdHM9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpoaW50PVwidCgnc3RhcnRDb21wb25lbnQuaGludHMucGFzcycpXCJcbiAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3N0YXJ0Q29tcG9uZW50LnBsYWNlaG9sZGVycy5wYXNzJylcIlxuICAgICAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlQYXNzIHx8IHQoJ3N0YXJ0Q29tcG9uZW50LmVycm9ycy5lbXB0eS5wYXNzJylcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6aGludD5cbiAgICAgICAgICAgICAgICA8IS0tIDxkaXYgc3R5bGU9XCJjb2xvcjogd2hpdGU7XCI+XG4gICAgICAgICAgICAgICAgICBmZ2RnZmRmZ2RcbiAgICAgICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJsb2NrXCIgY29sb3I9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtYnRuIGljb249XCJtZGktbG9naW5cIiA6bGFiZWw9XCJ0KCdzdGFydENvbXBvbmVudC5saWJlbGxlcy5zaWduSW5CdXR0b24nKVwiIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInByaW1hcnlcIi8+XG4gICAgICAgICAgICA8cS1idG4gOmxhYmVsPVwidCgnc3RhcnRDb21wb25lbnQubGliZWxsZXMucmVzZXRCdXR0b24nKVwiIHR5cGU9XCJyZXNldFwiIGNvbG9yPVwid2hpdGVcIiBmbGF0IGNsYXNzPVwicS1tbC1zbVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmVycm9yPlxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBjb250ZW50LWNlbnRlclwiPiAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgYmctc2Vjb25kYXJ5IHRleHQtYmxhY2sgZmxleCBqdXN0aWZ5LWNlbnRlciBjb2x1bW5cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj5cbiAgICAgICAgICAgIDxkaXYgOmNsYXNzPSdwbGF0Zm9ybS5pcy5kZXNrdG9wID8gaGVhZGluZ0Rlc2t0b3BDbGFzcyA6IGhlYWRpbmdNb2JpbGVDbGFzcyc+XG4gICAgICAgICAgICAgIHt7IHQoJ3N0YXJ0Q29tcG9uZW50LnRpdGxlJykgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHEtZm9ybVxuICAgICAgICAgICAgICBAc3VibWl0PSdzdWJtaXQnXG4gICAgICAgICAgICAgIEByZXNldD0ncmVzZXQnXG4gICAgICAgICAgICAgIGNsYXNzPSdxLWd1dHRlci1zbSdcbiAgICAgICAgICAgICAgc3R5bGU9J2NvbG9yOiB3aGl0ZSc+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgbGFiZWwtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgaW5wdXQtc3R5bGU9XCJjb2xvcjogd2hpdGVcIlxuICAgICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwibG9naW5cIlxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInQoJ3N0YXJ0Q29tcG9uZW50LmlucHV0TGFiZWxzLmxvZ2luJylcIlxuICAgICAgICAgICAgICAgIDpoaW50PVwidCgnc3RhcnRDb21wb25lbnQuaGludHMubG9naW4nKVwiXG4gICAgICAgICAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3N0YXJ0Q29tcG9uZW50LnBsYWNlaG9sZGVycy5sb2dpbicpXCJcbiAgICAgICAgICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsgXG4gICAgICAgICAgICAgICAgICB2YWwgPT4gbm9uRW1wdHlMb2dpbiB8fCB0KCdzdGFydENvbXBvbmVudC5lcnJvcnMuZW1wdHkubG9naW4nKVxuICAgICAgICAgICAgICAgIF1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwibWRpLWFjY291bnRcIiBjb2xvcj1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgbGFiZWwtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgaW5wdXQtc3R5bGU9XCJjb2xvcjogd2hpdGVcIlxuICAgICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInBhc3NcIlxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInQoJ3N0YXJ0Q29tcG9uZW50LmlucHV0TGFiZWxzLnBhc3MnKSsnIConXCJcbiAgICAgICAgICAgICAgICA6Ym90dG9tLXNsb3RzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgOmhpbnQ9XCJ0KCdzdGFydENvbXBvbmVudC5oaW50cy5wYXNzJylcIlxuICAgICAgICAgICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdzdGFydENvbXBvbmVudC5wbGFjZWhvbGRlcnMucGFzcycpXCJcbiAgICAgICAgICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5UGFzcyB8fCB0KCdzdGFydENvbXBvbmVudC5lcnJvcnMuZW1wdHkucGFzcycpXG4gICAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmhpbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gPGRpdiBzdHlsZT1cImNvbG9yOiB3aGl0ZTtcIj5cbiAgICAgICAgICAgICAgICAgICAgICBmZ2RnZmRmZ2RcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwibG9ja1wiIGNvbG9yPVwid2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cS1idG4gaWNvbj1cIm1kaS1sb2dpblwiIDpsYWJlbD1cInQoJ3N0YXJ0Q29tcG9uZW50LmxpYmVsbGVzLnNpZ25JbkJ1dHRvbicpXCIgdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiLz5cbiAgICAgICAgICAgICAgICA8cS1idG4gOmxhYmVsPVwidCgnc3RhcnRDb21wb25lbnQubGliZWxsZXMucmVzZXRCdXR0b24nKVwiIHR5cGU9XCJyZXNldFwiIGNvbG9yPVwid2hpdGVcIiBmbGF0IGNsYXNzPVwicS1tbC1zbVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWZvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gPC9kaXY+IC0tPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW1nPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG4vKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiAnb2ZmJyovXG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlLCB3YXRjaCwgb25Nb3VudGVkIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gJ3N0b3Jlcy91c2VyJztcbmltcG9ydCB7IHVzZU1lc3NhZ2VTdG9yZSB9IGZyb20gJ3N0b3Jlcy9tZXNzYWdlJztcbmltcG9ydCB7IHVzZVNlc3Npb25TdG9yZSB9IGZyb20gJ3N0b3Jlcy9zZXNzaW9uJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICd2dWUtaTE4bic7XG5pbXBvcnQgTWVzc2FnZXNJdGVtIGZyb20gJ2NvbXBvbmVudHMvTWVzc2FnZXNJdGVtLnZ1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcic7XG5pbXBvcnQgeyBzZXRDcnlwdEFwaSwgc2V0RGVjcnlwdEFwaSwgX19GT1JNQVRPQkpfXywgX19UUkFOU0ZPUk1PQkpfXyB9IGZyb20gJ3NyYy9nbG9iYWxzJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UXVlcnksIGNsb3NlRGJDb25uZWN0aW9uIH0gZnJvbSAnY2FwL3N0b3JhZ2UnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcbi8vIGltcG9ydCBzZXNzaW9uQXhpb3NTZXJ2aWNlIGZyb20gJ2RiL3NlcnZpY2VzL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuLy8gVkFSSUFCTEVTXG5pbnRlcmZhY2UgU3RhcnRQcm9wcyB7XG4gIGRiQ29ubj86IFNRTGl0ZURCQ29ubmVjdGlvbiB8IG51bGw7XG59O1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8U3RhcnRQcm9wcz4oKSwge1xuICBkYkNvbm46IG51bGwsXG59KTtcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ2NoYW5nZS10YWInXSk7XG5jb25zdCBhcHAgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbmNvbnN0IGtleSA9IGFwcC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRrZXk7XG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuY29uc3QgcGxhdGZvcm0gPSAkcS5wbGF0Zm9ybTtcbi8vIGNvbnNvbGUubG9nKHBsYXRmb3JtKTtcbmNvbnN0IGxvZ2luID0gcmVmKG51bGwpO1xuY29uc3QgcGFzcyA9IHJlZihudWxsKTtcbmNvbnN0IG1lc3NhZ2VWaXNpYmlsaXR5ID0gcmVmKGZhbHNlKTtcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlZih0cnVlKTtcbmNvbnN0IHsgdCB9ID0gdXNlSTE4bigpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBpbWdTcmMgPSByZWYobnVsbCk7XG5jb25zdCBub25FbXB0eUxvZ2luID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFsb2dpbi52YWx1ZSAmJiBsb2dpbi52YWx1ZSAhPSAnJztcbn0pO1xuY29uc3Qgbm9uRW1wdHlQYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gISFwYXNzLnZhbHVlICYmIHBhc3MudmFsdWUgIT0gJyc7XG59KTtcbmNvbnN0IGhlYWRpbmdEZXNrdG9wQ2xhc3MgPSAncS1wdC1sZyBxLXBiLWxnIFNlbkV4dHJhYm9sZC1mb250IHRleHQtaDIgdGV4dC11cHBlcmNhc2UgdGV4dC1jZW50ZXIgdGV4dC1ib2xkJztcbmNvbnN0IGhlYWRpbmdNb2JpbGVDbGFzcyA9ICdxLXB0LWxnIHEtcGItbGcgU2VuRXh0cmFib2xkLWZvbnQgdGV4dC1oNCB0ZXh0LXVwcGVyY2FzZSB0ZXh0LWNlbnRlciB0ZXh0LWJvbGQnO1xuY29uc3Qgb3JpZW50YXRpb24gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYWN0ID0gcmVmKGZhbHNlKTtcblxubGV0IHVzZXJTdG9yZSA9IG51bGwsIHNlc3Npb25TdG9yZSA9IG51bGwsIG1lc3NhZ2VTdG9yZSA9IG51bGwsIHByZWZzID0gbnVsbDtcblxuLy8gREVDTEFSQVRJT05TXG5pZiAocGxhdGZvcm0uaXMuZGVza3RvcCl7XG4gIHVzZXJTdG9yZSA9IHVzZVVzZXJTdG9yZSgpO1xuICBzZXNzaW9uU3RvcmUgPSB1c2VTZXNzaW9uU3RvcmUoKTtcbiAgbWVzc2FnZVN0b3JlID0gdXNlTWVzc2FnZVN0b3JlKCk7XG4gIGlmIChtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXMubGVuZ3RoKXtcbiAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICB9XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gbWVzc2FnZVN0b3JlLmdldE1lc3NhZ2VzVmlzaWJpbGl0eTtcbiAgaW1nU3JjLnZhbHVlID0gJ2Rpc3QvYXNzZXRzL2ltZ3Mvc2xpZGVyLTIuanBnJztcbn1cbmVsc2Uge1xuICBpbWdTcmMudmFsdWUgPSAnL2Fzc2V0cy9pbWdzL3NsaWRlci0yLmpwZyc7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xuICBpZiAob3JpZW50YXRpb24udmFsdWUgPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgIGNvbXBhY3QudmFsdWUgPSB0cnVlO1xuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICBwcmVmcyA9IGF3YWl0IGltcG9ydCgnY2FwL3N0b3JhZ2UvcHJlZmVyZW5jZXMnKTtcbiAgICAvLyBjb25zb2xlLmxvZygnR2V0IG1lc3NhZ2VzIHByZWZlcmVuY2VzICEnKTtcbiAgICBjb25zdCBtZXNzID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignbWVzc2FnZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lc3MpO1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gISFtZXNzID8gbWVzcy5tZXNzYWdlcyA6IFtdO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2VzKTtcbiAgICBjb25zdCB2aXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzVmlzaWJpbGl0eSA6IG1lc3M7XG4gICAgLy8gY29uc29sZS5sb2codmlzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoICYmIHZpcyA9PT0gbnVsbCkge1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHZpcyAhPT0gbnVsbCA/IHZpcyA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9HZXRJbWdGb3JNb2JpbGVzKCk7XG4gICAgLy8gY29uc29sZS5sb2coJ1Jlc3BvbnNlcyAhJyk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIC8vIGNvbnN0IHJvZGUgPSBhd2FpdCBkb1JlYWREaXIoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnUm9kZSBkaXIgZGF0YSAtLT4gJyk7XG4gICAgLy8gY29uc29sZS5sb2cocm9kZSk7XG4gIH0pKCk7XG59XG5cbi8vIEZVTkNUSU9OU1xuYXN5bmMgZnVuY3Rpb24gZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpIHtcbiAgcmVuZGVyQ29tcG9uZW50LnZhbHVlID0gZmFsc2U7XG4gIGF3YWl0IG5leHRUaWNrKCk7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IHRydWU7XG59O1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtT2JqZWN0KG9iajogYW55KSB7XG4gIC8vIGNvbnNvbGUubG9nKCdHZW5lcmF0ZSBLZXkgIScpO1xuICAvLyBjb25zb2xlLmxvZyh3aW5kb3cuX19LRVlfXyk7XG4gIC8vIGlmICghIXdpbmRvdy5fX0tFWV9fID09PSBmYWxzZSkge1xuICAvLyAgIGF3YWl0IHNldEdlbkFwaSgpO1xuICAvLyB9XG4gIC8vIGNvbnNvbGUubG9nKCdLZXkgLS0+ICcrd2luZG93Ll9fS0VZX18pO1xuICBhd2FpdCBzZXRDcnlwdEFwaSgpO1xuICBfX0ZPUk1BVE9CSl9fKG9iaiwga2V5KTtcbn07XG5hc3luYyBmdW5jdGlvbiBzdWJtaXQoKXtcbiAgY29uc29sZS5sb2coJ2xvZ2luIHRvIERCICEnKTtcbiAgY29uc29sZS5sb2cocGxhdGZvcm0pO1xuICBjb25zdCByZXQgPSBhd2FpdCBsb2dpbkRiKCk7XG4gIGNvbnNvbGUubG9nKGBMb2dpbiByZXN1bHQgLS0+ICR7cmV0fSAhYCk7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBpZiAocmV0KSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBzZXNzaW9uU3RvcmUuZ2V0U2Vzc2lvbigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3N0YXJ0Q29tcG9uZW50LnJlc3VsdHMua28uc2Vzc2lvbicsIHtlcnI6IGVycn0pXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgnc3RhcnRDb21wb25lbnQucmVzdWx0cy5rby5zZXNzaW9uJywge2VycjogZXJyfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIHVzZXJTdG9yZS5zZXRDb25uZWN0ZWQodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcyA9IFtdO1xuICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgcm91dGVyLnB1c2godCgnaG9tZVRlckxpbmtUYXJnZXQnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBtZXNzYWdlOiB0KCdzdGFydENvbXBvbmVudC5lcnJvcnMuZXJyb3Iuc2lnbkluJylcbiAgICAgIH0pO1xuICAgICAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAocmV0KXtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldFNlc3Npb25Gb3JNb2JpbGUoKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzID0gYXdhaXQgcHJlZnMuZ2V0UHJlZignbWVzc2FnZScpO1xuICAgICAgICAgIG1lc3MubWVzc2FnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdzdGFydENvbXBvbmVudC5yZXN1bHRzLmtvLnNlc3Npb24nLCB7ZXJyOiBlcnJ9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgICAgbWVzcy5tZXNzYWdlc1Zpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCBtZXNzKTtcbiAgICAgICAgICAvLyBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlc1Zpc2liaWxpdHknLCB0cnVlKTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgnc3RhcnRDb21wb25lbnQucmVzdWx0cy5rby5zZXNzaW9uJywge2VycjogZXJyfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHVzciA9IGF3YWl0IHByZWZzLmdldFByZWYoJ3VzZXInKTtcbiAgICAgICAgLy8gaWYgKCEhdXNyID09PSBmYWxzZSl7XG4gICAgICAgIC8vICAgdXNyID0ge307XG4gICAgICAgIC8vICAgdXNyLnVzZXIgPSBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBhd2FpdCBwcmVmcy5zZXRQcmVmKCd1c2VyJywgdXNyKTtcbiAgICAgICAgY29uc29sZS5sb2codXNyKTtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBtZXNzYWdlOiB0KCdzdGFydENvbXBvbmVudC5lcnJvcnMuZXJyb3Iuc2lnbkluJylcbiAgICAgIH0pO1xuICAgICAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICAgIH1cbiAgfVxufTtcbmZ1bmN0aW9uIHJlc2V0KCl7XG4gIGxvZ2luLnZhbHVlID0gbnVsbDtcbiAgcGFzcy52YWx1ZSA9IG51bGw7XG59O1xuYXN5bmMgZnVuY3Rpb24gbG9naW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGxvZ2luOiBsb2dpbi52YWx1ZSxcbiAgICBwYXNzOiBwYXNzLnZhbHVlLFxuICB9O1xuICAvLyBjb25zb2xlLmxvZygndHJhbnNmb3JtIG9iaiAhJyk7XG4gIC8vIGNvbnNvbGUubG9nKG9iaik7XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICAvLyBjb25zb2xlLmxvZyhcIlVzZXIgTG9naW4gIVwiKTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgICByZXR1cm4gdXNlclN0b3JlLmxvZ2luVXNlcihvYmoubG9naW4sIG9iai5wYXNzKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29uZ3JhdHMgIScpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVqKTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3N0YXJ0Q29tcG9uZW50LmVycm9ycy5lcnJvci5zaWduSW4nKVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3N0YXJ0Q29tcG9uZW50LnJlc3VsdHMua28uc2lnbkluJywge2VycjogZXJyfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gY29uc29sZS5sb2coYG1vYmlsZSBwYXJ0ICFgKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9wcyk7XG4gICAgLy8gY29uc29sZS5sb2cocHJvcHMuZGJDb25uKTtcbiAgICBsZXQgaXNPcGVuID0gYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gICAgaXNPcGVuID0gIWlzT3BlbiB8fCAhIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgICAvLyBjb25zb2xlLmxvZyhgaXNPcGVuIC0tPiAke2lzT3Blbn0gIWApO1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIGNvbnN0IHNxbCA9IGBTRUxFQ1QgXFxgdXNlclxcYC5cXGB1c2VySWRcXGAsIFxcYHVzZXJcXGAuXFxgZmlyc3ROYW1lXFxgLCBcXGB1c2VyXFxgLlxcYGxhc3ROYW1lXFxgLCBcXGB1c2VyXFxgLlxcYGxvZ2luXFxgLCBcXGB1c2VyXFxgLlxcYGVtYWlsXFxgLCBcXGB1c2VyXFxgLlxcYGNvbXBhbnlOYW1lXFxgLCBcXGB1c2VyXFxgLlxcYGNvbXBhbnlMb2dvXFxgLCBcXGBkZXZpc2VcXGAuXFxgZGV2aXNlSWRcXGAgQVMgXFxgZGV2aXNlLmRldmlzZUlkXFxgLCBcXGBkZXZpc2VcXGAuXFxgc3ltYm9sZVxcYCBBUyBcXGBkZXZpc2Uuc3ltYm9sZVxcYCwgXFxgZGV2aXNlXFxgLlxcYGxpYmVsbGVcXGAgQVMgXFxgZGV2aXNlLmxpYmVsbGVcXGAsIFxcYHVzZXJfdHlwZVxcYC5cXGB1c2VyVHlwZUlkXFxgIEFTIFxcYHVzZXJfdHlwZS51c2VyVHlwZUlkXFxgLCBcXGB1c2VyX3R5cGVcXGAuXFxgcmVndWxhclxcYCBBUyBcXGB1c2VyX3R5cGUucmVndWxhclxcYCwgXFxgdXNlcl90eXBlXFxgLlxcYGFkbWluXFxgIEFTIFxcYHVzZXJfdHlwZS5hZG1pblxcYCBGUk9NIFxcYHVzZXJcXGAgQVMgXFxgdXNlclxcYCBMRUZUIE9VVEVSIEpPSU4gXFxgZGV2aXNlXFxgIEFTIFxcYGRldmlzZVxcYCBPTiBcXGB1c2VyXFxgLlxcYGRldmlzZUlkXFxgID0gXFxgZGV2aXNlXFxgLlxcYGRldmlzZUlkXFxgIExFRlQgT1VURVIgSk9JTiBcXGB1c2VyX3R5cGVcXGAgQVMgXFxgdXNlcl90eXBlXFxgIE9OIFxcYHVzZXJcXGAuXFxgdXNlclR5cGVJZFxcYCA9IFxcYHVzZXJfdHlwZVxcYC5cXGB1c2VyVHlwZUlkXFxgIFdIRVJFIChcXGB1c2VyXFxgLlxcYGxvZ2luXFxgID0gJyR7b2JqLmxvZ2lufScgT1IgXFxgdXNlclxcYC5cXGBlbWFpbFxcYCA9ICcke29iai5sb2dpbn0nKSBBTkQgXFxgdXNlclxcYC5cXGBwYXNzXFxgID0gJyR7b2JqLnBhc3N9JztgO1xuICAgICAgLy8gY29uc29sZS5sb2coc3FsKTtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIGxldCByZXMgPSBmYWxzZTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICBpZighIXZhbHVlcyAmJiB2YWx1ZXMudmFsdWVzLmxlbmd0aCl7XG4gICAgICAgIGNvbnN0IGludFJlcyA9IHNhbml0aXplUXVlcnlSZXN1bHQodmFsdWVzLnZhbHVlcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGludFJlcyk7XG4gICAgICAgIGF3YWl0IHNldERlY3J5cHRBcGkoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgX19UUkFOU0ZPUk1PQkpfXyhpbnRSZXNbMF0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCd1c2VyJywge3VzZXI6IHJlc3VsdCwgY29ubmVjdGVkOiBmYWxzZX0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnUHJlZnMgc2V0dGVkICEnKTtcbiAgICAgICAgcmVzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdzdGFydENvbXBvbmVudC5lcnJvcnMuZXJyb3Iuc2lnbkluJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VzVmlzaWJpbGl0eTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkZWNvZGVVUklDb21wb25lbnQoJHEuY29va2llcy5nZXRBbGwoKS5tZXNzYWdlKSk7XG4gICAgICB9XG4gICAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgnc3RhcnRDb21wb25lbnQucmVzdWx0cy5rby5zaWduSW4nLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gc2FuaXRpemVRdWVyeVJlc3VsdChvYmo6IGFueSkge1xuICBsZXQgcmV0ID0gW107XG4gIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICByZXRba10gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGwgaW4gb2JqW2tdKXtcbiAgICAgIGlmIChsID09PSAnZGV2aXNlLmRldmlzZUlkJyl7XG4gICAgICAgIHJldFtrXVsnZGV2aXNlJ10gPSByZXRba11bJ2RldmlzZSddID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IHt9XG4gICAgICAgICAgOiByZXRba11bJ2RldmlzZSddO1xuICAgICAgICByZXRba11bJ2RldmlzZSddLmRldmlzZUlkID0gb2JqW2tdW2xdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZihsID09PSAnZGV2aXNlLnN5bWJvbGUnKXtcbiAgICAgICAgcmV0W2tdWydkZXZpc2UnXSA9IHJldFtrXVsnZGV2aXNlJ10gPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8ge31cbiAgICAgICAgICA6IHJldFtrXVsnZGV2aXNlJ107XG4gICAgICAgICAgcmV0W2tdWydkZXZpc2UnXS5zeW1ib2xlID0gb2JqW2tdW2xdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZihsID09PSAnZGV2aXNlLmxpYmVsbGUnKSB7XG4gICAgICAgIHJldFtrXVsnZGV2aXNlJ10gPSByZXRba11bJ2RldmlzZSddID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IHt9XG4gICAgICAgICAgOiByZXRba11bJ2RldmlzZSddO1xuICAgICAgICByZXRba11bJ2RldmlzZSddLmxpYmVsbGUgPSBvYmpba11bbF07XG4gICAgICB9XG4gICAgICBlbHNlIGlmKGwgPT09ICd1c2VyX3R5cGUudXNlclR5cGVJZCcpe1xuICAgICAgICByZXRba11bJ3VzZXJfdHlwZSddID0gcmV0W2tdWyd1c2VyX3R5cGUnXSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB7fVxuICAgICAgICAgIDogcmV0W2tdWyd1c2VyX3R5cGUnXTtcbiAgICAgICAgcmV0W2tdWyd1c2VyX3R5cGUnXS51c2VyVHlwZUlkID0gb2JqW2tdW2xdOyAgXG4gICAgICB9XG4gICAgICBlbHNlIGlmKGwgPT09ICd1c2VyX3R5cGUucmVndWxhcicpe1xuICAgICAgICByZXRba11bJ3VzZXJfdHlwZSddID0gcmV0W2tdWyd1c2VyX3R5cGUnXSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB7fVxuICAgICAgICAgIDogcmV0W2tdWyd1c2VyX3R5cGUnXTtcbiAgICAgICAgcmV0W2tdWyd1c2VyX3R5cGUnXS5yZWd1bGFyID0gb2JqW2tdW2xdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZihsID09PSAndXNlcl90eXBlLmFkbWluJyl7XG4gICAgICAgIHJldFtrXVsndXNlcl90eXBlJ10gPSByZXRba11bJ3VzZXJfdHlwZSddID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IHt9XG4gICAgICAgICAgOiByZXRba11bJ3VzZXJfdHlwZSddO1xuICAgICAgICByZXRba11bJ3VzZXJfdHlwZSddLmFkbWluID0gb2JqW2tdW2xdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobCAhPT0gJ2RldmlzZUlkJyAmJiBsICE9PSAndXNlclR5cGVJZCcpe1xuICAgICAgICByZXRba11bbF0gPSBvYmpba11bbF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59O1xuYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbkZvck1vYmlsZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coYFNlc3Npb25gKTtcbiAgICBjb25zdCBuZXdJZCA9IHV1aWR2NCgpO1xuICAgIGxldCBzZXNzaW9uID0gISEkcS5jb29raWVzLmdldEFsbCgpLnNlc3Npb25cbiAgICAgID8gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoJHEuY29va2llcy5nZXRBbGwoKS5zZXNzaW9uKSlcbiAgICAgIDogbnVsbDtcbiAgICAvLyBjb25zb2xlLmxvZyhzZXNzaW9uKTtcbiAgICBpZiAoISFzZXNzaW9uKVxuICAgICAgc2Vzc2lvbi5zZXNzaW9uSWQgPSBuZXdJZDtcbiAgICBlbHNle1xuICAgICAgc2Vzc2lvbiA9IHt9O1xuICAgICAgc2Vzc2lvbi5zZXNzaW9uSWQgPSBuZXdJZDtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coc2Vzc2lvbik7XG4gICAgYXdhaXQgcHJlZnMuc2V0UHJlZignc2Vzc2lvbicsIHNlc3Npb24pO1xuICAgIHJlc29sdmUodHJ1ZSk7XG4gIH0pOyAgXG59O1xuZnVuY3Rpb24gaGFuZGxlT3JpZW50YXRpb24oKXtcbiAgLy8gY29uc29sZS5sb2coc2NyZWVuLm9yaWVudGF0aW9uKTtcbiAgb3JpZW50YXRpb24udmFsdWUgPSBzY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbn07XG5cbi8vIFdBVENIRVJTXG53YXRjaChcbiAgb3JpZW50YXRpb24sXG4gIChuZXdPcmllbnRhdGlvbikgPT4ge1xuICAgIGlmICghIW5ld09yaWVudGF0aW9uKSB7XG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09ICdwb3J0cmFpdC1wcmltYXJ5JyB8fCBuZXdPcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0LXNlY29uZGFyeScpe1xuICAgICAgICBjb21wYWN0LnZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21wYWN0LnZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4pXG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGVtaXQoJ2NoYW5nZS10YWInLCB1bmRlZmluZWQpO1xufSk7XG4vLyBPVEhFUlNcbi8vIEtleWJvYXJkLmFkZExpc3RlbmVyKCdrZXlib2FyZFdpbGxTaG93JywgaW5mbyA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKCdrZXlib2FyZCB3aWxsIHNob3cgd2l0aCBoZWlnaHQ6JywgaW5mby5rZXlib2FyZEhlaWdodCk7XG4vLyB9KTtcblxuLy8gS2V5Ym9hcmQuYWRkTGlzdGVuZXIoJ2tleWJvYXJkRGlkU2hvdycsIGluZm8gPT4ge1xuLy8gICBjb25zb2xlLmxvZygna2V5Ym9hcmQgZGlkIHNob3cgd2l0aCBoZWlnaHQ6JywgaW5mby5rZXlib2FyZEhlaWdodCk7XG4vLyB9KTtcblxuLy8gS2V5Ym9hcmQuYWRkTGlzdGVuZXIoJ2tleWJvYXJkV2lsbEhpZGUnLCAoKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKCdrZXlib2FyZCB3aWxsIGhpZGUnKTtcbi8vIH0pO1xuXG4vLyBLZXlib2FyZC5hZGRMaXN0ZW5lcigna2V5Ym9hcmREaWRIaWRlJywgKCkgPT4ge1xuLy8gICBjb25zb2xlLmxvZygna2V5Ym9hcmQgZGlkIGhpZGUnKTtcbi8vIH0pO1xuXG48L3NjcmlwdD5cbiJdLCJmaWxlIjoiYXNzZXRzL1N0YXJ0UGFnZS5qcyJ9
