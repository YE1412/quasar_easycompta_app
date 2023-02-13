import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, an as useRouter, d as computed, _ as __vitePreload, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, aa as toDisplayString, aq as unref, at as normalizeClass, ab as QAvatar, j as QBtn, as as normalizeStyle, a8 as Fragment, g as getCurrentInstance, B as nextTick, o as onMounted } from "./index.js";
import { Q as QNoSsr } from "./QNoSsr.js";
import { Q as QInput } from "./QInput.js";
import { Q as QUploader } from "./QUploader.js";
import { Q as QSelect } from "./QSelect.js";
import { Q as QForm } from "./QForm.js";
import { u as useQuasar, a as useUserStore, i as isDbConnectionOpen, o as openDbConnection, n as newQuery, c as closeDbConnection, b as userAxiosService, d as newRun, e as setCryptApi, f as __FORMATOBJ__ } from "./use-quasar.js";
import { u as useMessageStore, M as MessagesItem } from "./use-key-composition.js";
import { u as useInvoiceStore } from "./invoice.js";
import "./use-prevent-scroll.js";
import "./index4.js";
import "./index2.js";
import "./WasmModules.js";
import "./invoice.service.js";
const _hoisted_1 = { class: "flex justify-start row items-center" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "flex items-center content-center justify-center" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RegisterFormComponent",
  props: {
    dbConn: { default: null }
  },
  setup(__props) {
    const props = __props;
    const app = getCurrentInstance();
    const key = app.appContext.config.globalProperties.$key;
    const $q = useQuasar();
    const firstName = ref(null);
    const firstNameRef = ref(null);
    const lastName = ref(null);
    const lastNameRef = ref(null);
    const login = ref(null);
    const loginRef = ref(null);
    const email = ref(null);
    const emailRef = ref(null);
    const confirmEmail = ref(null);
    const confirmEmailRef = ref(null);
    const pass = ref(null);
    const passRef = ref(null);
    const confirmPass = ref(null);
    const confirmPassRef = ref(null);
    const companyName = ref(null);
    const companyNameRef = ref(null);
    const companyLogo = ref(null);
    const companyLogoUploader = ref(null);
    const companyLogoURL = ref(null);
    const maxSize = ref(2 * 1024 * 1024);
    const devise = ref(null);
    const deviseRef = ref([]);
    const selectDevisesOption = ref([]);
    const userType = ref(null);
    const userTypeRef = ref(null);
    const selectUserTypesOption = ref([]);
    const platform = $q.platform;
    const messageVisibility = ref(false);
    const renderComponent = ref(true);
    const { t } = useI18n();
    const router = useRouter();
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
    const validFirstName = computed(() => {
      const re = /^(([a-zA-Z])([-])*){2,30}$/;
      const ret = re.test(firstName.value);
      if (!ret) {
        firstNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyFirstName = computed(() => {
      const ret = !!firstName.value && firstName.value !== "";
      if (!ret) {
        firstNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validLastName = computed(() => {
      const re = /^([a-zA-Z]){2,30}$/;
      const ret = re.test(lastName.value);
      if (!ret) {
        lastNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyLastName = computed(() => {
      const ret = !!lastName.value && lastName.value !== "";
      if (!ret) {
        lastNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validLogin = computed(() => {
      const re = /^(([a-zA-Z])([_])*){2,15}$/;
      const ret = re.test(firstName.value);
      if (!ret) {
        loginRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyLogin = computed(() => {
      const ret = !!login.value && login.value !== "";
      if (!ret) {
        loginRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validEmail = computed(() => {
      const ret = true;
      return ret;
    });
    const nonEmptyEmail = computed(() => {
      const ret = !!email.value && email.value !== "";
      if (!ret) {
        emailRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validPass = computed(() => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_(\[\])@$!%*#?&{}])[A-Za-z\d\-_(\[\])@$!%*#?&{}]{8,30}$/;
      const ret = re.test(pass.value);
      if (!ret) {
        passRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyPass = computed(() => {
      const ret = !!pass.value && pass.value !== "";
      if (!ret) {
        passRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validCompanyName = computed(() => {
      const re = /^([a-zA-Z]){2,30}$/;
      const ret = re.test(companyName.value);
      if (!ret) {
        companyNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyCompanyName = computed(() => {
      const ret = !!companyName.value && companyName.value !== "";
      if (!ret) {
        companyNameRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyDevise = computed(() => {
      const ret = !!devise.value && devise.value.value != 0;
      if (!ret) {
        deviseRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const nonEmptyUserType = computed(() => {
      const ret = !!userType.value && userType.value.value != 0;
      if (!ret) {
        userTypeRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validConfirmEmail = computed(() => {
      const ret = confirmEmail.value === email.value;
      if (!ret) {
        confirmEmailRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const validConfirmPass = computed(() => {
      const ret = confirmPass.value === pass.value;
      if (!ret) {
        confirmPassRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    });
    const emailCheck = async () => {
      const ret = await checkEmail();
      if (!ret) {
        emailRef.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      return ret;
    };
    const validateForm = async () => {
      const ret1 = validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value && validConfirmEmail.value && validConfirmPass.value && await emailCheck();
      const ret2 = nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value;
      return ret1 && ret2;
    };
    let userStore = null, messageStore = null, invoiceStore = null, prefs = null, origin = null;
    if (platform.is.desktop) {
      userStore = useUserStore();
      invoiceStore = useInvoiceStore();
      messageStore = useMessageStore();
      messageVisibility.value = messageStore.getMessagesVisibility;
    } else {
      orientation.value = window.screen.orientation.type;
      window.addEventListener("orientationchange", handleOrientation);
      (async () => {
        await __vitePreload(() => import("./cap.user.service.js"), true ? ["assets/cap.user.service.js","assets/capacitor_http.js","assets/index.js","assets/index.css"] : void 0);
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
    {
      const fullOrigin = window.location.origin;
      origin = fullOrigin.slice(0, fullOrigin.lastIndexOf(":") + 1);
    }
    hydrateForm();
    async function forceMessageItemsRerender() {
      renderComponent.value = false;
      await nextTick();
      renderComponent.value = true;
    }
    async function transformObject(obj) {
      await setCryptApi();
      __FORMATOBJ__(obj, key);
    }
    function reset() {
      firstName.value = null;
      lastName.value = null;
      login.value = null;
      email.value = null;
      pass.value = null;
      companyName.value = null;
      companyLogo.value = null;
      devise.value = null;
      userType.value = null;
      companyLogoUploader.value.reset();
    }
    async function submit() {
      const valid = await validateForm();
      if (valid) {
        if (!!companyLogo.value) {
          companyLogoUploader.value.upload();
        } else {
          if (platform.is.desktop) {
            const res = await addUserInDb();
            if (res) {
              $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: t("profileComponent.results.ok.add")
              });
              router.push({ name: t("startLinkName") });
            } else {
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: t("profileComponent.results.ko.add")
              });
            }
          } else {
            const res = await addUserInSQLiteDb();
            if (res) {
              $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: t("profileComponent.results.ok.add")
              });
              router.push(t("startLinkTarget"));
            } else {
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: t("profileComponent.results.ko.add")
              });
              forceMessageItemsRerender();
            }
          }
        }
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("forms.errors.error.inputs")
        });
      }
    }
    async function hydrateForm() {
      if (platform.is.desktop) {
        {
          let obj = {};
          selectDevisesOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.devise");
          obj.cannotSelect = true;
          obj.deviseId = 0;
          obj.symbole = null;
          obj.libelle = null;
          selectDevisesOption.value.push(obj);
          invoiceStore.getAllDevises().then((res) => {
            for (const k in res) {
              obj = {};
              obj.value = res[k].deviseId;
              obj.label = `${res[k].symbole} - ${res[k].libelle}`;
              obj.cannotSelect = false;
              obj.deviseId = res[k].deviseId;
              obj.symbole = res[k].symbole;
              obj.libelle = res[k].libelle;
              selectDevisesOption.value.push(obj);
            }
          }, () => {
            messageStore.messages.push({
              severity: true,
              content: t("invoicesComponent.results.ko.fetch_devises.linked_empty")
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          }).catch((err) => {
            messageStore.messages.push({
              severity: true,
              content: t("invoicesComponent.results.ko.fetch_devises.linked_error", { err })
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          });
          obj = {};
          selectUserTypesOption.value = [];
          obj.value = 0;
          obj.label = t("profileComponent.placeholders.userType");
          obj.cannotSelect = true;
          obj.userTypeId = 0;
          obj.regular = null;
          obj.admin = null;
          selectUserTypesOption.value.push(obj);
          userStore.getUserTypes().then((res) => {
            for (const k in res) {
              let label = res[k].regular && !res[k].admin ? t("profileComponent.libelles.types.regular") : "";
              label = res[k].admin && !res[k].regular ? t("profileComponent.libelles.types.admin") : label;
              label = res[k].admin && res[k].regular ? t("profileComponent.libelles.types.regular") + ", " + t("profileComponent.libelles.types.admin") : label;
              obj = {};
              obj.value = res[k].userTypeId;
              obj.label = label;
              obj.cannotSelect = false;
              obj.userTypeId = res[k].userTypeId;
              obj.regular = res[k].regular;
              obj.admin = res[k].admin;
              selectUserTypesOption.value.push(obj);
            }
          }, () => {
            messageStore.messages.push({
              severity: true,
              content: t("profileComponent.results.ko.fetch_userTypes.linked_empty")
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          }).catch((err) => {
            messageStore.messages.push({
              severity: true,
              content: t("profileComponent.results.ko.fetch_userTypes.linked_error", { err })
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          });
        }
      } else if (platform.is.mobile) {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          let obj = {};
          selectDevisesOption.value = [];
          obj.value = 0;
          obj.label = t("invoicesComponent.placeholders.devise");
          obj.cannotSelect = true;
          obj.deviseId = 0;
          obj.symbole = null;
          obj.libelle = null;
          selectDevisesOption.value.push(obj);
          let sql = "SELECT `devise`.`deviseId`, `devise`.`symbole`, `devise`.`libelle` FROM `devise`;";
          let values = await newQuery(props.dbConn, sql);
          if (values.values.length) {
            const res = values.values;
            for (const k in res) {
              obj = {};
              obj.value = res[k].deviseId;
              obj.label = `${res[k].symbole} - ${res[k].libelle}`;
              obj.cannotSelect = false;
              obj.deviseId = res[k].deviseId;
              obj.symbole = res[k].symbole;
              obj.libelle = res[k].libelle;
              selectDevisesOption.value.push(obj);
            }
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_devises.linked_error")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("invoicesComponent.results.ko.fetch_devises.linked_empty")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          }
          obj = {};
          selectUserTypesOption.value = [];
          obj.value = 0;
          obj.label = t("profileComponent.placeholders.userType");
          obj.cannotSelect = true;
          obj.userTypeId = 0;
          obj.regular = null;
          obj.admin = null;
          selectUserTypesOption.value.push(obj);
          sql = "SELECT `user_type`.`userTypeId`, `user_type`.`regular`, `user_type`.`admin` FROM `user_type`;";
          values = await newQuery(props.dbConn, sql);
          if (values.values.length) {
            const res = values.values;
            for (const k in res) {
              let label = res[k].regular && !res[k].admin ? t("profileComponent.libelles.types.regular") : "";
              label = res[k].admin && !res[k].regular ? t("profileComponent.libelles.types.admin") : label;
              label = res[k].admin && res[k].regular ? t("profileComponent.libelles.types.regular") + ", " + t("profileComponent.libelles.types.admin") : label;
              obj = {};
              obj.value = res[k].userTypeId;
              obj.label = label;
              obj.cannotSelect = false;
              obj.userTypeId = res[k].userTypeId;
              obj.regular = res[k].regular;
              obj.admin = res[k].admin;
              selectUserTypesOption.value.push(obj);
            }
          } else if (!!values === false) {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("profileComponent.results.ko.fetch_userTypes.linked_error")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          } else {
            await prefs.setPref("message", {
              messages: [
                {
                  severity: true,
                  content: t("profileComponent.results.ko.fetch_userTypes.linked_empty")
                }
              ],
              messagesVisibility: true
            });
            messageVisibility.value = true;
          }
          closeDbConnection(props.dbConn);
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("forms.errors.error.sqliteDb")
              }
            ],
            messagesVisibility: true
          });
          messageVisibility.value = true;
        }
      }
    }
    async function checkEmail() {
      const obj = {
        email: email.value
      };
      await transformObject(obj);
      if (platform.is.desktop) {
        return userAxiosService.checkEmail(obj.email).then((res) => {
          if (!res.data.length)
            return true;
          else
            return false;
        }).catch((err) => {
          messageStore.messages.push({
            severity: true,
            content: t("profileComponent.results.ko.checkEmail", { err })
          });
          messageVisibility.value = true;
          messageStore.setMessagesVisibility(true);
          return false;
        });
      } else {
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          let sql = `SELECT \`user\`.\`email\` FROM \`user\` WHERE \`user\`.\`email\` = '${obj.email}';`;
          let values = await newQuery(props.dbConn, sql);
          if (values.values.length) {
            return false;
          } else {
            return true;
          }
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("profileComponent.results.ko.checkEmail", { err: "Unable to open SQLite DB !" })
              }
            ],
            messagesVisibility: true
          });
          messageVisibility.value = true;
        }
      }
    }
    async function addUserInDb() {
      const obj = {
        firstname: firstName.value,
        lastname: lastName.value,
        login: login.value,
        email: email.value,
        password: pass.value,
        companyName: companyName.value,
        companyLogo: !!companyLogo.value ? companyLogo.value : null,
        deviseId: devise.value.deviseId,
        type: userType.value.userTypeId
      };
      await transformObject(obj);
      return userAxiosService.create(obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("profileComponent.results.ok.add")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("profileComponent.results.ko.add", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function addUserInSQLiteDb() {
      const obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        login: login.value,
        email: email.value,
        pass: pass.value,
        companyName: companyName.value,
        companyLogo: !!companyLogo.value ? companyLogo.value : null,
        deviseId: devise.value.deviseId,
        userTypeId: userType.value.userTypeId
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = !!obj.companyLogo ? `INSERT INTO \`user\` (\`firstName\`, \`lastName\`, \`login\`, \`email\`, \`pass\`, \`companyName\`, \`companyLogo\`, \`deviseId\`, \`userTypeId\`) VALUES ('${obj.firstName}', '${obj.lastName}', '${obj.login}', '${obj.email}', '${obj.pass}', '${obj.companyName}', '${obj.companyLogo}', '${obj.deviseId}', '${obj.userTypeId}');` : `INSERT INTO \`user\` (\`firstName\`, \`lastName\`, \`login\`, \`email\`, \`pass\`, \`companyName\`, \`deviseId\`, \`userTypeId\`) VALUES ('${obj.firstName}', '${obj.lastName}', '${obj.login}', '${obj.email}', '${obj.pass}', '${obj.companyName}', '${obj.deviseId}', '${obj.userTypeId}');`;
        const values = await newRun(props.dbConn, sql);
        let ret = false;
        if (!!values && values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("profileComponent.results.ok.add")
              }
            ],
            messagesVisibility: true
          });
          ret = true;
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("profileComponent.results.ko.add", { err: "Insert user to SQLite DB !" })
              }
            ],
            messagesVisibility: true
          });
        }
        messageVisibility.value = true;
        closeDbConnection(props.dbConn);
        return ret;
      } else {
        await prefs.setPref("message", {
          messages: [
            {
              severity: true,
              content: t("profileComponent.results.ko.update", { err: "Unable to open SQLite DB !" })
            }
          ],
          messagesVisibility: true
        });
        messageVisibility.value = true;
        return false;
      }
    }
    function onInvalidCompanyLogo(entries) {
      for (const k in entries) {
        const filename = entries[k].file.name;
        const filesize = entries[k].file.size;
        const ext = filename.lastIndexOf(".") !== -1 ? filename.slice(filename.lastIndexOf(".")) : filename;
        if (entries[k].failedPropValidation === "accept") {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("profileComponent.errors.error.companyLogo.accept", { ext })
          });
        } else if (entries[k].failedPropValidation === "max-file-size") {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: t("profileComponent.errors.error.companyLogo.maxFileSize", { max: maxSize, size: filesize })
          });
        }
      }
    }
    async function onFailedCompanyLogoUpload({ xhr }) {
      const res = JSON.parse(xhr.response);
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: t("profileComponent.results.ko.upload", { err: "Request handling failed !" })
      });
      if (platform.is.desktop) {
        messageStore.messages.push({
          severity: true,
          content: t("profileComponent.results.ko.upload", { err: `Request handling failed (${res.message}) !` })
        });
        messageStore.setMessagesVisibility(true);
      } else {
        await prefs.setPref("message", {
          messages: [
            {
              severity: true,
              content: t("profileComponent.results.ko.upload", { err: `Request handling failed (${res.message}) !` })
            }
          ],
          messageVisibility: true
        });
      }
      messageVisibility.value = true;
      forceMessageItemsRerender();
      companyLogoUploader.value.$el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    async function onFileUploaded({ xhr }) {
      const xhrRes = JSON.parse(xhr.response);
      let res = false;
      companyLogo.value = xhrRes.filename;
      if (platform.is.desktop) {
        res = await addUserInDb();
      } else {
        res = await addUserInSQLiteDb();
      }
      if (res) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("profileComponent.results.ok.add")
        });
        router.push({ name: t("startLinkName") });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("profileComponent.results.ko.add")
        });
        forceMessageItemsRerender();
      }
    }
    function factoryFn() {
      return new Promise((resolve) => {
        resolve({
          url: `${origin}${"9000"}${"/dist"}/api/users/upload`,
          method: "POST"
        });
      });
    }
    function addedFile(files) {
      if (!!files && files.length) {
        companyLogoURL.value = URL.createObjectURL(files[0]);
        companyLogo.value = URL.createObjectURL(files[0]);
      }
    }
    function removedFile() {
      companyLogoURL.value = null;
      companyLogo.value = null;
    }
    function handleOrientation() {
      orientation.value = screen.orientation.type;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QNoSsr, null, {
          default: withCtx(() => [
            messageVisibility.value && renderComponent.value ? (openBlock(), createBlock(MessagesItem, { key: 0 })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createBaseVNode("div", {
          class: normalizeClass("q-py-lg SenExtrabold-font " + (unref(compact) ? "text-h4" : "text-h2") + " text-uppercase text-center text-bold")
        }, toDisplayString(unref(t)("profileComponent.titles.register")), 3),
        createBaseVNode("div", {
          class: "q-pa-lg",
          style: normalizeStyle(!unref(compact) ? "width: 70%;" : "width: 100%;")
        }, [
          createVNode(QForm, {
            onSubmit: submit,
            onReset: reset,
            class: "q-gutter-md"
          }, {
            default: withCtx(() => [
              createVNode(QInput, {
                filled: "",
                type: "text",
                modelValue: firstName.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => firstName.value = $event),
                ref_key: "firstNameRef",
                ref: firstNameRef,
                label: unref(t)("profileComponent.inputLabels.firstName") + " *",
                hint: unref(t)("profileComponent.hints.firstName"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.firstName"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyFirstName) || unref(t)("profileComponent.errors.empty.firstName"),
                  (val) => unref(validFirstName) || unref(t)("profileComponent.errors.error.firstName")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "text",
                modelValue: lastName.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => lastName.value = $event),
                ref_key: "lastNameRef",
                ref: lastNameRef,
                label: unref(t)("profileComponent.inputLabels.lastName") + " *",
                hint: unref(t)("profileComponent.hints.lastName"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.lastName"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyLastName) || unref(t)("profileComponent.errors.empty.lastName"),
                  (val) => unref(validLastName) || unref(t)("profileComponent.errors.error.lastName")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "text",
                modelValue: login.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => login.value = $event),
                ref_key: "loginRef",
                ref: loginRef,
                label: unref(t)("profileComponent.inputLabels.login") + " *",
                hint: unref(t)("profileComponent.hints.login"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.login"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyLogin) || unref(t)("profileComponent.errors.empty.login"),
                  (val) => unref(validLogin) || unref(t)("profileComponent.errors.error.login")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "email",
                modelValue: email.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => email.value = $event),
                ref_key: "emailRef",
                ref: emailRef,
                label: unref(t)("profileComponent.inputLabels.email") + " *",
                hint: unref(t)("profileComponent.hints.email") + " *",
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.email"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyEmail) || unref(t)("profileComponent.errors.empty.email"),
                  (val) => unref(validEmail) || unref(t)("profileComponent.errors.error.email"),
                  (val) => emailCheck() || unref(t)("profileComponent.errors.error.emailBusy")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "email",
                modelValue: confirmEmail.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => confirmEmail.value = $event),
                ref_key: "confirmEmailRef",
                ref: confirmEmailRef,
                label: unref(t)("profileComponent.inputLabels.confirmEmail") + " *",
                hint: unref(t)("profileComponent.hints.confirmEmail") + " *",
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.confirmEmail"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(validConfirmEmail) || unref(t)("profileComponent.errors.error.emailMissmatch")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "password",
                modelValue: pass.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => pass.value = $event),
                ref_key: "passRef",
                ref: passRef,
                label: unref(t)("profileComponent.inputLabels.pass") + " *",
                hint: unref(t)("profileComponent.hints.pass"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.pass"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyPass) || unref(t)("profileComponent.errors.empty.pass"),
                  (val) => unref(validPass) || unref(t)("profileComponent.errors.error.pass")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "password",
                modelValue: confirmPass.value,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => confirmPass.value = $event),
                ref_key: "confirmPassRef",
                ref: confirmPassRef,
                label: unref(t)("profileComponent.inputLabels.confirmPass") + " *",
                hint: unref(t)("profileComponent.hints.confirmPass"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.confirmPass"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(validConfirmPass) || unref(t)("profileComponent.errors.error.passMissmatch")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "text",
                modelValue: companyName.value,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => companyName.value = $event),
                ref_key: "companyNameRef",
                ref: companyNameRef,
                label: unref(t)("profileComponent.inputLabels.companyName") + " *",
                hint: unref(t)("profileComponent.hints.companyName"),
                "hide-hint": true,
                placeholder: unref(t)("profileComponent.placeholders.companyName"),
                clearable: true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyCompanyName) || unref(t)("profileComponent.errors.empty.companyName"),
                  (val) => unref(validCompanyName) || unref(t)("profileComponent.errors.error.companyName")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createBaseVNode("div", _hoisted_1, [
                !!companyLogoURL.value ? (openBlock(), createBlock(QAvatar, { key: 0 }, {
                  default: withCtx(() => [
                    createBaseVNode("img", { src: companyLogoURL.value }, null, 8, _hoisted_2)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(QUploader, {
                  style: { "width": "100%" },
                  ref_key: "companyLogoUploader",
                  ref: companyLogoUploader,
                  factory: factoryFn,
                  accept: "image/svg",
                  "max-file-size": maxSize.value,
                  multiple: false,
                  "auto-upload": false,
                  "hide-upload-btn": true,
                  label: unref(t)("profileComponent.inputLabels.companyLogo"),
                  "field-name": "file",
                  onUploaded: onFileUploaded,
                  onRejected: onInvalidCompanyLogo,
                  onFailed: onFailedCompanyLogoUpload,
                  onAdded: addedFile,
                  onRemoved: removedFile
                }, null, 8, ["max-file-size", "label"])
              ]),
              createVNode(QSelect, {
                filled: "",
                modelValue: devise.value,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => devise.value = $event),
                ref_key: "deviseRef",
                ref: deviseRef,
                options: selectDevisesOption.value,
                "option-disable": "cannotSelect",
                label: unref(t)("profileComponent.inputLabels.devise") + " *",
                hint: unref(t)("profileComponent.hints.devise"),
                "hide-hint": true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyDevise) || unref(t)("profileComponent.errors.empty.devise")
                ]
              }, null, 8, ["modelValue", "options", "label", "hint", "rules"]),
              createVNode(QSelect, {
                filled: "",
                modelValue: userType.value,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => userType.value = $event),
                ref_key: "userTypeRef",
                ref: userTypeRef,
                options: selectUserTypesOption.value,
                "option-disable": "cannotSelect",
                label: unref(t)("profileComponent.inputLabels.userType") + " *",
                hint: unref(t)("profileComponent.hints.userType"),
                "hide-hint": true,
                "lazy-rules": "",
                rules: [
                  (val) => unref(nonEmptyUserType) || unref(t)("profileComponent.errors.empty.userType")
                ]
              }, null, 8, ["modelValue", "options", "label", "hint", "rules"]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(QBtn, {
                  label: unref(t)("profileComponent.libelles.updateButton"),
                  type: "submit",
                  color: "primary"
                }, null, 8, ["label"]),
                createVNode(QBtn, {
                  label: unref(t)("profileComponent.libelles.resetButton"),
                  type: "reset",
                  color: "primary",
                  flat: "",
                  class: "q-ml-sm"
                }, null, 8, ["label"])
              ])
            ]),
            _: 1
          })
        ], 4)
      ], 64);
    };
  }
});
var RegisterFormComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "RegisterFormComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RegisterPage",
  props: {
    dbConn: { default: null }
  },
  emits: ["change-tab"],
  setup(__props, { emit }) {
    onMounted(() => {
      emit("change-tab", void 0);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        padding: "",
        class: "column items-center justify-evenly"
      }, {
        default: withCtx(() => [
          createVNode(RegisterFormComponent, { dbConn: __props.dbConn }, null, 8, ["dbConn"])
        ]),
        _: 1
      });
    };
  }
});
var RegisterPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "RegisterPage.vue"]]);
export { RegisterPage as default };
//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuL0JBLGNBQVUsTUFBTTtBQUNkLFdBQUssY0FBYyxNQUFTO0FBQUEsS0FDN0IiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUmVnaXN0ZXJGb3JtQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9SZWdpc3RlclBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtbm8tc3NyPlxuICAgIDxNZXNzYWdlc0l0ZW0gdi1pZj0nbWVzc2FnZVZpc2liaWxpdHkgJiYgcmVuZGVyQ29tcG9uZW50JyAvPlxuICA8L3Etbm8tc3NyPlxuICA8ZGl2IDpjbGFzcz1cIidxLXB5LWxnIFNlbkV4dHJhYm9sZC1mb250ICcrIChjb21wYWN0ID8gJ3RleHQtaDQnIDogJ3RleHQtaDInKSArICcgdGV4dC11cHBlcmNhc2UgdGV4dC1jZW50ZXIgdGV4dC1ib2xkJ1wiPnt7IHQoJ3Byb2ZpbGVDb21wb25lbnQudGl0bGVzLnJlZ2lzdGVyJykgfX08L2Rpdj5cbiAgPGRpdiBjbGFzcz0ncS1wYS1sZycgOnN0eWxlPVwiIWNvbXBhY3QgPyAnd2lkdGg6IDcwJTsnIDogJ3dpZHRoOiAxMDAlOydcIj5cbiAgICA8cS1mb3JtXG4gICAgICBAc3VibWl0PSdzdWJtaXQnXG4gICAgICBAcmVzZXQ9J3Jlc2V0J1xuICAgICAgY2xhc3M9J3EtZ3V0dGVyLW1kJz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHYtbW9kZWw9XCJmaXJzdE5hbWVcIlxuICAgICAgICByZWY9XCJmaXJzdE5hbWVSZWZcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmZpcnN0TmFtZScpKycgKidcIlxuICAgICAgICA6aGludD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaGludHMuZmlyc3ROYW1lJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLmZpcnN0TmFtZScpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5Rmlyc3ROYW1lIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVtcHR5LmZpcnN0TmFtZScpLFxuICAgICAgICAgIHZhbCA9PiB2YWxpZEZpcnN0TmFtZSB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5maXJzdE5hbWUnKVxuICAgICAgICBdXCJcbiAgICAgIC8+XG4gICAgICA8cS1pbnB1dFxuICAgICAgICBmaWxsZWRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICB2LW1vZGVsPVwibGFzdE5hbWVcIlxuICAgICAgICByZWY9XCJsYXN0TmFtZVJlZlwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMubGFzdE5hbWUnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmxhc3ROYW1lJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLmxhc3ROYW1lJylcIlxuICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlMYXN0TmFtZSB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lbXB0eS5sYXN0TmFtZScpLFxuICAgICAgICAgIHZhbCA9PiB2YWxpZExhc3ROYW1lIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmxhc3ROYW1lJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdi1tb2RlbD1cImxvZ2luXCJcbiAgICAgICAgcmVmPVwibG9naW5SZWZcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmxvZ2luJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5sb2dpbicpXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdwcm9maWxlQ29tcG9uZW50LnBsYWNlaG9sZGVycy5sb2dpbicpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5TG9naW4gfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkubG9naW4nKSxcbiAgICAgICAgICB2YWwgPT4gdmFsaWRMb2dpbiB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5sb2dpbicpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICB2LW1vZGVsPVwiZW1haWxcIlxuICAgICAgICByZWY9XCJlbWFpbFJlZlwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMuZW1haWwnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmVtYWlsJykrJyAqJ1wiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwidCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMuZW1haWwnKVwiXG4gICAgICAgIDpjbGVhcmFibGU9XCJ0cnVlXCJcbiAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICA6cnVsZXM9XCJbIHZhbCA9PiBub25FbXB0eUVtYWlsIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVtcHR5LmVtYWlsJyksXG4gICAgICAgICAgdmFsID0+IHZhbGlkRW1haWwgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IuZW1haWwnKSxcbiAgICAgICAgICB2YWwgPT4gZW1haWxDaGVjaygpIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmVtYWlsQnVzeScpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICB2LW1vZGVsPVwiY29uZmlybUVtYWlsXCJcbiAgICAgICAgcmVmPVwiY29uZmlybUVtYWlsUmVmXCJcbiAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5jb25maXJtRW1haWwnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmNvbmZpcm1FbWFpbCcpKycgKidcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLmNvbmZpcm1FbWFpbCcpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICB2YWwgPT4gdmFsaWRDb25maXJtRW1haWwgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IuZW1haWxNaXNzbWF0Y2gnKVxuICAgICAgICBdXCJcbiAgICAgIC8+XG4gICAgICA8cS1pbnB1dFxuICAgICAgICBmaWxsZWRcbiAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgdi1tb2RlbD1cInBhc3NcIlxuICAgICAgICByZWY9XCJwYXNzUmVmXCJcbiAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5wYXNzJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5wYXNzJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLnBhc3MnKVwiXG4gICAgICAgIDpjbGVhcmFibGU9XCJ0cnVlXCJcbiAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICA6cnVsZXM9XCJbIHZhbCA9PiBub25FbXB0eVBhc3MgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkucGFzcycpLFxuICAgICAgICAgIHZhbCA9PiB2YWxpZFBhc3MgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IucGFzcycpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICB2LW1vZGVsPVwiY29uZmlybVBhc3NcIlxuICAgICAgICByZWY9XCJjb25maXJtUGFzc1JlZlwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMuY29uZmlybVBhc3MnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmNvbmZpcm1QYXNzJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLmNvbmZpcm1QYXNzJylcIlxuICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyBcbiAgICAgICAgICB2YWwgPT4gdmFsaWRDb25maXJtUGFzcyB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5wYXNzTWlzc21hdGNoJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdi1tb2RlbD1cImNvbXBhbnlOYW1lXCJcbiAgICAgICAgcmVmPVwiY29tcGFueU5hbWVSZWZcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbXBhbnlOYW1lJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5jb21wYW55TmFtZScpXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdwcm9maWxlQ29tcG9uZW50LnBsYWNlaG9sZGVycy5jb21wYW55TmFtZScpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5Q29tcGFueU5hbWUgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkuY29tcGFueU5hbWUnKSxcbiAgICAgICAgICB2YWwgPT4gdmFsaWRDb21wYW55TmFtZSB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5jb21wYW55TmFtZScpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktc3RhcnQgcm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8cS1hdmF0YXIgdi1pZj1cIiEhY29tcGFueUxvZ29VUkxcIj5cbiAgICAgICAgICA8aW1nIDpzcmM9XCJjb21wYW55TG9nb1VSTFwiIC8+XG4gICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgIDxxLXVwbG9hZGVyXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJVwiXG4gICAgICAgICAgcmVmPSdjb21wYW55TG9nb1VwbG9hZGVyJ1xuICAgICAgICAgIDpmYWN0b3J5PVwiZmFjdG9yeUZuXCJcbiAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS9zdmdcIlxuICAgICAgICAgIDptYXgtZmlsZS1zaXplPVwibWF4U2l6ZVwiXG4gICAgICAgICAgOm11bHRpcGxlPVwiZmFsc2VcIlxuICAgICAgICAgIDphdXRvLXVwbG9hZD1cImZhbHNlXCJcbiAgICAgICAgICA6aGlkZS11cGxvYWQtYnRuPVwidHJ1ZVwiXG4gICAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5jb21wYW55TG9nbycpXCJcbiAgICAgICAgICBmaWVsZC1uYW1lPSdmaWxlJ1xuICAgICAgICAgIEB1cGxvYWRlZD1cIm9uRmlsZVVwbG9hZGVkXCJcbiAgICAgICAgICBAcmVqZWN0ZWQ9XCJvbkludmFsaWRDb21wYW55TG9nb1wiXG4gICAgICAgICAgQGZhaWxlZD1cIm9uRmFpbGVkQ29tcGFueUxvZ29VcGxvYWRcIlxuICAgICAgICAgIEBhZGRlZD1cImFkZGVkRmlsZVwiXG4gICAgICAgICAgQHJlbW92ZWQ9XCJyZW1vdmVkRmlsZVwiXG4gICAgICAgID5cbiAgICAgICAgPC9xLXVwbG9hZGVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxxLWZpbGVcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHYtbW9kZWw9XCJjb21wYW55TG9nb1wiXG4gICAgICAgIGFjY2VwdD1cIi5zdmdcIlxuICAgICAgICA6bWF4LWZpbGUtc2l6ZT1cIm1heFNpemVcIlxuICAgICAgICA6bXVsdGlwbGU9XCJmYWxzZVwiXG4gICAgICAgIDpzdGFjay1sYWJlbD1cInRydWVcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbXBhbnlMb2dvJylcIlxuICAgICAgICA6aGludD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaGludHMuY29tcGFueUxvZ28nLCB7c2l6ZTogbWF4U2l6ZX0pXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdwcm9maWxlQ29tcG9uZW50LnBsYWNlaG9sZGVycy5jb21wYW55TG9nbycpXCJcbiAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICA6Y2xlYXJhYmxlPSd0cnVlJ1xuICAgICAgICA6cnVsZXM9XCJbIFxuICAgICAgICAgIHZhbCA9PiB2YWxpZENvbXBhbnlMb2dvIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmNvbXBhbnlMb2dvJylcbiAgICAgICAgXVwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YmVmb3JlIHYtaWY9XCIhIWNvbXBhbnlMb2dvVVJMXCI+XG4gICAgICAgICAgPHEtYXZhdGFyPlxuICAgICAgICAgICAgPGltZyA6c3JjPVwiY29tcGFueUxvZ29VUkxcIiAvPlxuICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtZmlsZT4gLS0+XG4gICAgICA8cS1zZWxlY3RcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHYtbW9kZWw9XCJkZXZpc2VcIlxuICAgICAgICByZWY9XCJkZXZpc2VSZWZcIlxuICAgICAgICA6b3B0aW9ucz1cInNlbGVjdERldmlzZXNPcHRpb25cIlxuICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMuZGV2aXNlJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5kZXZpc2UnKVwiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICA6cnVsZXM9XCJbIHZhbCA9PiBub25FbXB0eURldmlzZSB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lbXB0eS5kZXZpc2UnKVxuICAgICAgICBdXCJcbiAgICAgIC8+XG4gICAgICA8cS1zZWxlY3RcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHYtbW9kZWw9XCJ1c2VyVHlwZVwiXG4gICAgICAgIHJlZj1cInVzZXJUeXBlUmVmXCJcbiAgICAgICAgOm9wdGlvbnM9XCJzZWxlY3RVc2VyVHlwZXNPcHRpb25cIlxuICAgICAgICBvcHRpb24tZGlzYWJsZT1cImNhbm5vdFNlbGVjdFwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMudXNlclR5cGUnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLnVzZXJUeXBlJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlVc2VyVHlwZXx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVtcHR5LnVzZXJUeXBlJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIGNvbnRlbnQtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxxLWJ0biA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnVwZGF0ZUJ1dHRvbicpXCIgdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiLz5cbiAgICAgICAgPHEtYnRuIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMucmVzZXRCdXR0b24nKVwiIHR5cGU9XCJyZXNldFwiIGNvbG9yPVwicHJpbWFyeVwiIGZsYXQgY2xhc3M9XCJxLW1sLXNtXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG4vKmVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55OiBvZmYqL1xuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnO1xuaW1wb3J0IE1lc3NhZ2VzSXRlbSBmcm9tICcuL01lc3NhZ2VzSXRlbS52dWUnO1xuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSAnc3RvcmVzL3VzZXInO1xuaW1wb3J0IHsgdXNlTWVzc2FnZVN0b3JlIH0gZnJvbSAnc3RvcmVzL21lc3NhZ2UnO1xuaW1wb3J0IHsgdXNlSW52b2ljZVN0b3JlIH0gZnJvbSAnc3RvcmVzL2ludm9pY2UnO1xuaW1wb3J0IHVzZXJBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbi8vIGltcG9ydCB1cGxvYWRJbWFnZUF4aW9zU2VydmljZSBmcm9tICdkYi9zZXJ2aWNlcy91cGxvYWRfaW1hZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAndnVlLWkxOG4nO1xuaW1wb3J0IHsgb3BlbkRiQ29ubmVjdGlvbiwgaXNEYkNvbm5lY3Rpb25PcGVuLCBuZXdSdW4sIG5ld1F1ZXJ5LCBjbG9zZURiQ29ubmVjdGlvbiB9IGZyb20gJ2NhcC9zdG9yYWdlJztcbmltcG9ydCB7IHNldENyeXB0QXBpLCBfX0ZPUk1BVE9CSl9fIH0gZnJvbSAnc3JjL2dsb2JhbHMnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuXG5pbnRlcmZhY2UgUmVnaXN0ZXJDb21wUHJvcHMge1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsOyBcbn07XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxSZWdpc3RlckNvbXBQcm9wcz4oKSwge1xuICBkYkNvbm46IG51bGxcbn0pO1xuY29uc3QgYXBwID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5jb25zdCBrZXkgPSBhcHAuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4ka2V5O1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbi8vIGNvbnN0IHVzZXJJZCA9IHJlZigwKTtcbmNvbnN0IGZpcnN0TmFtZSA9IHJlZihudWxsKTtcbmNvbnN0IGZpcnN0TmFtZVJlZiA9IHJlZihudWxsKTtcbmNvbnN0IGxhc3ROYW1lID0gcmVmKG51bGwpO1xuY29uc3QgbGFzdE5hbWVSZWYgPSByZWYobnVsbCk7XG5jb25zdCBsb2dpbiA9IHJlZihudWxsKTtcbmNvbnN0IGxvZ2luUmVmID0gcmVmKG51bGwpO1xuY29uc3QgZW1haWwgPSByZWYobnVsbCk7XG5jb25zdCBlbWFpbFJlZiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbmZpcm1FbWFpbCA9IHJlZihudWxsKTtcbmNvbnN0IGNvbmZpcm1FbWFpbFJlZiA9IHJlZihudWxsKTtcbmNvbnN0IHBhc3MgPSByZWYobnVsbCk7XG5jb25zdCBwYXNzUmVmID0gcmVmKG51bGwpO1xuY29uc3QgY29uZmlybVBhc3MgPSByZWYobnVsbCk7XG5jb25zdCBjb25maXJtUGFzc1JlZiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhbnlOYW1lID0gcmVmKG51bGwpO1xuY29uc3QgY29tcGFueU5hbWVSZWYgPSByZWYobnVsbCk7XG5jb25zdCBjb21wYW55TG9nbyA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhbnlMb2dvVXBsb2FkZXIgPSByZWYobnVsbCk7XG5jb25zdCBjb21wYW55TG9nb1VSTCA9IHJlZihudWxsKTtcbmNvbnN0IG1heFNpemUgPSByZWYoMiAqIDEwMjQgKiAxMDI0KTtcbmNvbnN0IGRldmlzZSA9IHJlZihudWxsKTtcbmNvbnN0IGRldmlzZVJlZiA9IHJlZihbXSk7XG5jb25zdCBzZWxlY3REZXZpc2VzT3B0aW9uID0gcmVmKFtdKTtcbmNvbnN0IHVzZXJUeXBlID0gcmVmKG51bGwpO1xuY29uc3QgdXNlclR5cGVSZWYgPSByZWYobnVsbCk7XG5jb25zdCBzZWxlY3RVc2VyVHlwZXNPcHRpb24gPSByZWYoW10pOyBcbmNvbnN0IHBsYXRmb3JtID0gJHEucGxhdGZvcm07XG5jb25zdCBtZXNzYWdlVmlzaWJpbGl0eSA9IHJlZihmYWxzZSk7XG5jb25zdCByZW5kZXJDb21wb25lbnQgPSByZWYodHJ1ZSk7XG5jb25zdCB7IHQgfSA9IHVzZUkxOG4oKTtcbi8vIGNvbnN0IHByb2dyZXNzID0gcmVmKDApO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBvcmllbnRhdGlvbiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhY3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSBmYWxzZTtcbiAgaWYgKCEhb3JpZW50YXRpb24udmFsdWUpe1xuICAgIGlmIChvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXByaW1hcnknIHx8IG9yaWVudGF0aW9uLnZhbHVlID09PSAncG9ydHJhaXQtc2Vjb25kYXJ5Jyl7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZEZpcnN0TmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXigoW2EtekEtWl0pKFstXSkqKXsyLDMwfSQvO1xuICBjb25zdCByZXQgPSByZS50ZXN0KGZpcnN0TmFtZS52YWx1ZSk7XG4gIGlmICghcmV0KXtcbiAgICBmaXJzdE5hbWVSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IG5vbkVtcHR5Rmlyc3ROYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXQgPSAhIWZpcnN0TmFtZS52YWx1ZSAmJiBmaXJzdE5hbWUudmFsdWUgIT09ICcnO1xuICBpZiAoIXJldCl7XG4gICAgZmlyc3ROYW1lUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgdmFsaWRMYXN0TmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXihbYS16QS1aXSl7MiwzMH0kLztcbiAgY29uc3QgcmV0ID0gcmUudGVzdChsYXN0TmFtZS52YWx1ZSk7XG4gIGlmICghcmV0KXtcbiAgICBsYXN0TmFtZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IG5vbkVtcHR5TGFzdE5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhbGFzdE5hbWUudmFsdWUgJiYgbGFzdE5hbWUudmFsdWUgIT09ICcnO1xuICBpZiAoIXJldCl7XG4gICAgbGFzdE5hbWVSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZExvZ2luID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKChbYS16QS1aXSkoW19dKSopezIsMTV9JC87XG4gIGNvbnN0IHJldCA9IHJlLnRlc3QoZmlyc3ROYW1lLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIGxvZ2luUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlMb2dpbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISFsb2dpbi52YWx1ZSAmJiBsb2dpbi52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBsb2dpblJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IHZhbGlkRW1haWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9IHRydWU7XG4gIGlmICghcmV0KXtcbiAgICBlbWFpbFJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IG5vbkVtcHR5RW1haWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhZW1haWwudmFsdWUgJiYgZW1haWwudmFsdWUgIT09ICcnO1xuICBpZiAoIXJldCl7XG4gICAgZW1haWxSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZFBhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXGQpKD89LipbXFwtXyhcXFtcXF0pQCQhJSojPyZ7fV0pW0EtWmEtelxcZFxcLV8oXFxbXFxdKUAkISUqIz8me31dezgsMzB9JC87XG4gIGNvbnN0IHJldCA9IHJlLnRlc3QocGFzcy52YWx1ZSk7XG4gIGlmICghcmV0KXtcbiAgICBwYXNzUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlQYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXQgPSAhIXBhc3MudmFsdWUgJiYgcGFzcy52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBwYXNzUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgdmFsaWRDb21wYW55TmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXihbYS16QS1aXSl7MiwzMH0kLztcbiAgY29uc3QgcmV0ID0gcmUudGVzdChjb21wYW55TmFtZS52YWx1ZSk7XG4gIGlmICghcmV0KXtcbiAgICBjb21wYW55TmFtZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IG5vbkVtcHR5Q29tcGFueU5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhY29tcGFueU5hbWUudmFsdWUgJiYgY29tcGFueU5hbWUudmFsdWUgIT09ICcnO1xuICBpZiAoIXJldCl7XG4gICAgY29tcGFueU5hbWVSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG4vLyBjb25zdCB2YWxpZENvbXBhbnlMb2dvID0gY29tcHV0ZWQoKCkgPT4ge1xuLy8gICBjb25zdCByZSA9IC8oXFwuc3ZnKSQvaTtcbi8vICAgaWYgKCEhY29tcGFueUxvZ28udmFsdWUpXG4vLyAgICAgcmV0dXJuIHJlLnRlc3QoY29tcGFueUxvZ28udmFsdWUubmFtZSk7XG4vLyAgIGVsc2Vcbi8vICAgICByZXR1cm4gdHJ1ZTtcbi8vIH0pO1xuY29uc3Qgbm9uRW1wdHlEZXZpc2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhZGV2aXNlLnZhbHVlICYmIGRldmlzZS52YWx1ZS52YWx1ZSAhPSAwO1xuICBpZiAoIXJldCl7XG4gICAgZGV2aXNlUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlVc2VyVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISF1c2VyVHlwZS52YWx1ZSAmJiB1c2VyVHlwZS52YWx1ZS52YWx1ZSAhPSAwO1xuICBpZiAoIXJldCl7XG4gICAgdXNlclR5cGVSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZENvbmZpcm1FbWFpbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gKGNvbmZpcm1FbWFpbC52YWx1ZSA9PT0gZW1haWwudmFsdWUpO1xuICBpZiAoIXJldCl7XG4gICAgY29uZmlybUVtYWlsUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgdmFsaWRDb25maXJtUGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gKGNvbmZpcm1QYXNzLnZhbHVlID09PSBwYXNzLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIGNvbmZpcm1QYXNzUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgZW1haWxDaGVjayA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmV0ID0gYXdhaXQgY2hlY2tFbWFpbCgpO1xuICBpZiAoIXJldCl7XG4gICAgZW1haWxSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcbmNvbnN0IHZhbGlkYXRlRm9ybSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmV0MSA9ICh2YWxpZEZpcnN0TmFtZS52YWx1ZSAmJiB2YWxpZExhc3ROYW1lLnZhbHVlICYmIHZhbGlkTG9naW4udmFsdWUgJiYgdmFsaWRFbWFpbC52YWx1ZSAmJiB2YWxpZFBhc3MudmFsdWUgJiYgdmFsaWRDb21wYW55TmFtZS52YWx1ZSAmJiB2YWxpZENvbmZpcm1FbWFpbC52YWx1ZSAmJiB2YWxpZENvbmZpcm1QYXNzLnZhbHVlICYmIGF3YWl0IGVtYWlsQ2hlY2soKSk7XG4gIGNvbnN0IHJldDIgPSAobm9uRW1wdHlGaXJzdE5hbWUudmFsdWUgJiYgbm9uRW1wdHlMYXN0TmFtZS52YWx1ZSAmJiBub25FbXB0eUxvZ2luLnZhbHVlICYmIG5vbkVtcHR5RW1haWwudmFsdWUgJiYgbm9uRW1wdHlQYXNzLnZhbHVlICYmIG5vbkVtcHR5Q29tcGFueU5hbWUudmFsdWUgJiYgbm9uRW1wdHlEZXZpc2UudmFsdWUgJiYgbm9uRW1wdHlVc2VyVHlwZS52YWx1ZSk7XG4gIC8vIGNvbnN0IHJldDMgPSAhIWNvbXBhbnlMb2dvLnZhbHVlID8gdmFsaWRDb21wYW55TG9nby52YWx1ZSA6IHRydWUgO1xuICByZXR1cm4gcmV0MSAmJiByZXQyO1xufTtcblxubGV0IHVzZXJTdG9yZSA9IG51bGwsIG1lc3NhZ2VTdG9yZSA9IG51bGwsIGludm9pY2VTdG9yZSA9IG51bGwsIHByZWZzID0gbnVsbCwgb3JpZ2luID0gbnVsbDtcbmxldCB1c2VyQ2FwU2VydmljZSA9IG51bGw7XG5cbi8vIERFQ0xBUkFUSU9OU1xuaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgdXNlclN0b3JlID0gdXNlVXNlclN0b3JlKCk7XG4gIGludm9pY2VTdG9yZSA9IHVzZUludm9pY2VTdG9yZSgpO1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSBtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXNWaXNpYmlsaXR5O1xufVxuZWxzZSB7XG4gIC8vIGFwcCA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIC8vIGdldCA9IGFwcC5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRnZXQ7XG4gIC8vIHBvc3QgPSBhcHAuYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kcG9zdDtcbiAgb3JpZW50YXRpb24udmFsdWUgPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uKTtcbiAgKGFzeW5jICgpID0+IHtcbiAgICB1c2VyQ2FwU2VydmljZSA9IGF3YWl0IGltcG9ydCgnY2FwL3NlcnZpY2UvY2FwLnVzZXIuc2VydmljZScpO1xuICAgIHByZWZzID0gYXdhaXQgaW1wb3J0KCdjYXAvc3RvcmFnZS9wcmVmZXJlbmNlcycpO1xuICAgIGNvbnN0IG1lc3MgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCdtZXNzYWdlJyk7XG4gICAgLy8gY29uc29sZS5sb2cobWVzcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSAhIW1lc3MgPyBtZXNzLm1lc3NhZ2VzIDogW107XG4gICAgLy8gY29uc29sZS5sb2cobWVzc2FnZXMpO1xuICAgIGNvbnN0IHZpcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXNWaXNpYmlsaXR5IDogbWVzcztcbiAgICAvLyBjb25zb2xlLmxvZyh2aXMpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGggJiYgdmlzID09PSBudWxsKSB7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdmlzICE9PSBudWxsID8gdmlzIDogZmFsc2U7XG4gICAgfVxuICB9KSgpO1xufVxuaWYgKCFpbXBvcnQubWV0YS5lbnYuU1NSKXtcbiAgY29uc3QgZnVsbE9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gIC8vIGNvbnNvbGUubG9nKGltcG9ydC5tZXRhLmVudik7XG4gIG9yaWdpbiA9IGZ1bGxPcmlnaW4uc2xpY2UoMCwgZnVsbE9yaWdpbi5sYXN0SW5kZXhPZignOicpICsgMSk7XG4gIC8vIGNvbnNvbGUubG9nKG9yaWdpbik7XG4gIC8vIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52KTtcbn1cbmh5ZHJhdGVGb3JtKCk7IFxuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlTWVzc2FnZUl0ZW1zUmVyZW5kZXIoKSB7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IGZhbHNlO1xuICBhd2FpdCBuZXh0VGljaygpO1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSB0cnVlO1xufTtcbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChvYmo6IGFueSkge1xuICAvLyBpZiAoX19LRVlfXyA9PT0gbnVsbCkge1xuICAvLyAgIGF3YWl0IHNldEdlbkFwaSgpO1xuICAvLyB9XG4gIGF3YWl0IHNldENyeXB0QXBpKCk7XG4gIF9fRk9STUFUT0JKX18ob2JqLCBrZXkpO1xufTtcbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBmaXJzdE5hbWUudmFsdWUgPSBudWxsO1xuICBsYXN0TmFtZS52YWx1ZSA9IG51bGw7XG4gIGxvZ2luLnZhbHVlID0gbnVsbDtcbiAgZW1haWwudmFsdWUgPSBudWxsO1xuICBwYXNzLnZhbHVlID0gbnVsbDtcbiAgY29tcGFueU5hbWUudmFsdWUgPSBudWxsO1xuICBjb21wYW55TG9nby52YWx1ZSA9IG51bGw7XG4gIGRldmlzZS52YWx1ZSA9IG51bGw7XG4gIHVzZXJUeXBlLnZhbHVlID0gbnVsbDtcbiAgY29tcGFueUxvZ29VcGxvYWRlci52YWx1ZS5yZXNldCgpO1xufTtcbmFzeW5jIGZ1bmN0aW9uIHN1Ym1pdCgpIHtcbiAgLy8gY29uc29sZS5sb2coJ1JlZ2lzdGVyIGEgbmV3IFVzZXIgIScpO1xuICAvLyBjb25zb2xlLmxvZyhjb21wYW55TG9nby52YWx1ZSk7XG4gIGNvbnN0IHZhbGlkID0gYXdhaXQgdmFsaWRhdGVGb3JtKCk7XG4gIC8vIGNvbnNvbGUubG9nKGB2YWxpZGF0ZSBzdGF0ZTogJHt2YWxpZH1gKTtcbiAgaWYgKHZhbGlkKSB7XG4gICAgLy8gbGV0IHJldCA9IHRydWU7XG4gICAgaWYgKCEhY29tcGFueUxvZ28udmFsdWUpe1xuICAgICAgY29tcGFueUxvZ29VcGxvYWRlci52YWx1ZS51cGxvYWQoKTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICBlbHNlIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWRkVXNlckluRGIoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ2Nsb3VkX2RvbmUnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcm91dGVyLnB1c2goe25hbWU6IHQoJ3N0YXJ0TGlua05hbWUnKX0pO1xuICAgICAgICAgIC8vIGh5ZHJhdGVGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhZGRVc2VySW5TUUxpdGVEYigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgQWRkaW5nIFVzZXIgUmVzdWx0IC0tPiAke3Jlc31gKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgICAgICBjb2xvcjogJ2dyZWVuLTQnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ2Nsb3VkX2RvbmUnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcm91dGVyLnB1c2godCgnc3RhcnRMaW5rVGFyZ2V0JykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby5hZGQnKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcmNlTWVzc2FnZUl0ZW1zUmVyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICBtZXNzYWdlOiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3IuaW5wdXRzJylcbiAgICB9KTtcbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGh5ZHJhdGVGb3JtKCkge1xuICAvLyBjb25zb2xlLmxvZyhwbGF0Zm9ybS5pcyk7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBpZiAoIWltcG9ydC5tZXRhLmVudi5TU1Ipe1xuICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgIG9iai5sYWJlbCA9IHQoJ2ludm9pY2VzQ29tcG9uZW50LnBsYWNlaG9sZGVycy5kZXZpc2UnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLmRldmlzZUlkID0gMDtcbiAgICAgIG9iai5zeW1ib2xlID0gbnVsbDtcbiAgICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgaW52b2ljZVN0b3JlLmdldEFsbERldmlzZXMoKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uZGV2aXNlSWQ7XG4gICAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10uc3ltYm9sZX0gLSAke3Jlc1trXS5saWJlbGxlfWA7XG4gICAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBvYmouZGV2aXNlSWQgPSByZXNba10uZGV2aXNlSWQ7XG4gICAgICAgICAgICBvYmouc3ltYm9sZSA9IHJlc1trXS5zeW1ib2xlO1xuICAgICAgICAgICAgb2JqLmxpYmVsbGUgPSByZXNba10ubGliZWxsZTtcbiAgICAgICAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9kZXZpc2VzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2RldmlzZXMubGlua2VkX2Vycm9yJywge2VycjogZXJyfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG9iaiA9IHt9O1xuICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMudXNlclR5cGUnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLnVzZXJUeXBlSWQgPSAwO1xuICAgICAgb2JqLnJlZ3VsYXIgPSBudWxsO1xuICAgICAgb2JqLmFkbWluID0gbnVsbDtcbiAgICAgIHNlbGVjdFVzZXJUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICB1c2VyU3RvcmUuZ2V0VXNlclR5cGVzKClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHJlc1trXS5yZWd1bGFyICYmICFyZXNba10uYWRtaW4gPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLnJlZ3VsYXInKSA6ICcnO1xuICAgICAgICAgICAgbGFiZWwgPSByZXNba10uYWRtaW4gJiYgIXJlc1trXS5yZWd1bGFyID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5hZG1pbicpIDogbGFiZWw7XG4gICAgICAgICAgICBsYWJlbCA9IHJlc1trXS5hZG1pbiAmJiByZXNba10ucmVndWxhciA/IHQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMucmVndWxhcicpKycsICcrdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5hZG1pbicpIDogbGFiZWw7XG4gICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS51c2VyVHlwZUlkO1xuICAgICAgICAgICAgb2JqLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICBvYmouY2Fubm90U2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBvYmoudXNlclR5cGVJZCA9IHJlc1trXS51c2VyVHlwZUlkO1xuICAgICAgICAgICAgb2JqLnJlZ3VsYXIgPSByZXNba10ucmVndWxhcjtcbiAgICAgICAgICAgIG9iai5hZG1pbiA9IHJlc1trXS5hZG1pbjtcbiAgICAgICAgICAgIHNlbGVjdFVzZXJUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfdXNlclR5cGVzLmxpbmtlZF9lbXB0eScpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfdXNlclR5cGVzLmxpbmtlZF9lcnJvcicsIHtlcnI6IGVycn0pXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0gICAgXG4gIH0gXG4gIGVsc2UgaWYocGxhdGZvcm0uaXMubW9iaWxlKSB7XG4gICAgLy8gY29uc29sZS5sb2coYXdhaXQgZ2V0KGAke29yaWdpbn0ke3Byb2Nlc3MuZW52LlBPUlRfU1NSfSR7cHJvY2Vzcy5lbnYuUFVCTElDX1BBVEh9L2FwaS9pbnZvaWNlcy9kZXZpc2VzYCkpO1xuICAgIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIC8vIGNvbnN0IHRhYmxlcyA9IGF3YWl0IHByb3BzLmRiQ29ubi5nZXRUYWJsZUxpc3QoKTsgICBcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRhYmxlcyk7XG4gICAgICBsZXQgb2JqID0ge307XG4gICAgICBzZWxlY3REZXZpc2VzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgnaW52b2ljZXNDb21wb25lbnQucGxhY2Vob2xkZXJzLmRldmlzZScpO1xuICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICBvYmouZGV2aXNlSWQgPSAwO1xuICAgICAgb2JqLnN5bWJvbGUgPSBudWxsO1xuICAgICAgb2JqLmxpYmVsbGUgPSBudWxsO1xuICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBsZXQgc3FsID0gJ1NFTEVDVCBcXGBkZXZpc2VcXGAuXFxgZGV2aXNlSWRcXGAsIFxcYGRldmlzZVxcYC5cXGBzeW1ib2xlXFxgLCBcXGBkZXZpc2VcXGAuXFxgbGliZWxsZVxcYCBGUk9NIFxcYGRldmlzZVxcYDsnO1xuICAgICAgbGV0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICBpZiAodmFsdWVzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdmFsdWVzLnZhbHVlcztcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS5kZXZpc2VJZDtcbiAgICAgICAgICBvYmoubGFiZWwgPSBgJHtyZXNba10uc3ltYm9sZX0gLSAke3Jlc1trXS5saWJlbGxlfWA7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai5kZXZpc2VJZCA9IHJlc1trXS5kZXZpc2VJZDtcbiAgICAgICAgICBvYmouc3ltYm9sZSA9IHJlc1trXS5zeW1ib2xlO1xuICAgICAgICAgIG9iai5saWJlbGxlID0gcmVzW2tdLmxpYmVsbGU7XG4gICAgICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCEhdmFsdWVzID09PSBmYWxzZSkge1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2RldmlzZXMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VzVmlzaWJpbGl0eTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfZGV2aXNlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIG9iaiA9IHt9O1xuICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgb2JqLmxhYmVsID0gdCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMudXNlclR5cGUnKTtcbiAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgb2JqLnVzZXJUeXBlSWQgPSAwO1xuICAgICAgb2JqLnJlZ3VsYXIgPSBudWxsO1xuICAgICAgb2JqLmFkbWluID0gbnVsbDtcbiAgICAgIHNlbGVjdFVzZXJUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICBzcWwgPSAnU0VMRUNUIFxcYHVzZXJfdHlwZVxcYC5cXGB1c2VyVHlwZUlkXFxgLCBcXGB1c2VyX3R5cGVcXGAuXFxgcmVndWxhclxcYCwgXFxgdXNlcl90eXBlXFxgLlxcYGFkbWluXFxgIEZST00gXFxgdXNlcl90eXBlXFxgOyc7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCBuZXdRdWVyeShwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgaWYgKHZhbHVlcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHZhbHVlcy52YWx1ZXM7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBsZXQgbGFiZWwgPSByZXNba10ucmVndWxhciAmJiAhcmVzW2tdLmFkbWluID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5yZWd1bGFyJykgOiAnJztcbiAgICAgICAgICAgIGxhYmVsID0gcmVzW2tdLmFkbWluICYmICFyZXNba10ucmVndWxhciA/IHQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMuYWRtaW4nKSA6IGxhYmVsO1xuICAgICAgICAgICAgbGFiZWwgPSByZXNba10uYWRtaW4gJiYgcmVzW2tdLnJlZ3VsYXIgPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLnJlZ3VsYXInKSsnLCAnK3QoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMuYWRtaW4nKSA6IGxhYmVsO1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9iai52YWx1ZSA9IHJlc1trXS51c2VyVHlwZUlkO1xuICAgICAgICAgIG9iai5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmoudXNlclR5cGVJZCA9IHJlc1trXS51c2VyVHlwZUlkO1xuICAgICAgICAgIG9iai5yZWd1bGFyID0gcmVzW2tdLnJlZ3VsYXI7XG4gICAgICAgICAgb2JqLmFkbWluID0gcmVzW2tdLmFkbWluO1xuICAgICAgICAgIHNlbGVjdFVzZXJUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoISF2YWx1ZXMgPT09IGZhbHNlKXtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3VzZXJUeXBlcy5saW5rZWRfZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3VzZXJUeXBlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3Iuc3FsaXRlRGInKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiBjaGVja0VtYWlsKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZW1haWw6IGVtYWlsLnZhbHVlXG4gIH07XG4gIGF3YWl0IHRyYW5zZm9ybU9iamVjdChvYmopO1xuICAvL2NvbnNvbGUubG9nKG9iaik7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKSB7XG4gICAgcmV0dXJuIHVzZXJBeGlvc1NlcnZpY2UuY2hlY2tFbWFpbChvYmouZW1haWwpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmICghcmVzLmRhdGEubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28uY2hlY2tFbWFpbCcsIHtlcnI6IGVycn0pXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIGxldCBzcWwgPSBgU0VMRUNUIFxcYHVzZXJcXGAuXFxgZW1haWxcXGAgRlJPTSBcXGB1c2VyXFxgIFdIRVJFIFxcYHVzZXJcXGAuXFxgZW1haWxcXGAgPSAnJHtvYmouZW1haWx9JztgO1xuICAgICAgbGV0IHZhbHVlcyA9IGF3YWl0IG5ld1F1ZXJ5KHByb3BzLmRiQ29ubiwgc3FsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgICBpZiAodmFsdWVzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28uY2hlY2tFbWFpbCcsIHsgZXJyOiAnVW5hYmxlIHRvIG9wZW4gU1FMaXRlIERCICEnIH0pXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlc1Zpc2liaWxpdHk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcbmFzeW5jIGZ1bmN0aW9uIGFkZFVzZXJJbkRiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZmlyc3RuYW1lOiBmaXJzdE5hbWUudmFsdWUsXG4gICAgbGFzdG5hbWU6IGxhc3ROYW1lLnZhbHVlLFxuICAgIGxvZ2luOiBsb2dpbi52YWx1ZSxcbiAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgcGFzc3dvcmQ6IHBhc3MudmFsdWUsXG4gICAgY29tcGFueU5hbWU6IGNvbXBhbnlOYW1lLnZhbHVlLFxuICAgIGNvbXBhbnlMb2dvOiAhIWNvbXBhbnlMb2dvLnZhbHVlID8gY29tcGFueUxvZ28udmFsdWUgOiBudWxsLFxuICAgIGRldmlzZUlkOiBkZXZpc2UudmFsdWUuZGV2aXNlSWQsXG4gICAgdHlwZTogdXNlclR5cGUudmFsdWUudXNlclR5cGVJZCxcbiAgfTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIHJldHVybiB1c2VyQXhpb3NTZXJ2aWNlLmNyZWF0ZShvYmopXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5vay5hZGQnKVxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgbWVzc2FnZVN0b3JlLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHtlcnI6IGVycn0pXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7IFxufTtcbmFzeW5jIGZ1bmN0aW9uIGFkZFVzZXJJblNRTGl0ZURiKCkge1xuICBjb25zdCBvYmogPSB7XG4gICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUudmFsdWUsXG4gICAgbGFzdE5hbWU6IGxhc3ROYW1lLnZhbHVlLFxuICAgIGxvZ2luOiBsb2dpbi52YWx1ZSxcbiAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgcGFzczogcGFzcy52YWx1ZSxcbiAgICBjb21wYW55TmFtZTogY29tcGFueU5hbWUudmFsdWUsXG4gICAgY29tcGFueUxvZ286ICEhY29tcGFueUxvZ28udmFsdWUgPyBjb21wYW55TG9nby52YWx1ZSA6IG51bGwsXG4gICAgZGV2aXNlSWQ6IGRldmlzZS52YWx1ZS5kZXZpc2VJZCxcbiAgICB1c2VyVHlwZUlkOiB1c2VyVHlwZS52YWx1ZS51c2VyVHlwZUlkLFxuICB9O1xuICBhd2FpdCB0cmFuc2Zvcm1PYmplY3Qob2JqKTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgbGV0IGlzT3BlbiA9ICBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgaXNPcGVuID0gISFpc09wZW4gfHwgIWlzT3BlbiA/IGF3YWl0IG9wZW5EYkNvbm5lY3Rpb24ocHJvcHMuZGJDb25uKSA6IGlzT3BlbjtcbiAgaWYgKGlzT3Blbikge1xuICAgIGNvbnN0IHNxbCA9ICEhb2JqLmNvbXBhbnlMb2dvIFxuICAgICAgPyBgSU5TRVJUIElOVE8gXFxgdXNlclxcYCAoXFxgZmlyc3ROYW1lXFxgLCBcXGBsYXN0TmFtZVxcYCwgXFxgbG9naW5cXGAsIFxcYGVtYWlsXFxgLCBcXGBwYXNzXFxgLCBcXGBjb21wYW55TmFtZVxcYCwgXFxgY29tcGFueUxvZ29cXGAsIFxcYGRldmlzZUlkXFxgLCBcXGB1c2VyVHlwZUlkXFxgKSBWQUxVRVMgKCcke29iai5maXJzdE5hbWV9JywgJyR7b2JqLmxhc3ROYW1lfScsICcke29iai5sb2dpbn0nLCAnJHtvYmouZW1haWx9JywgJyR7b2JqLnBhc3N9JywgJyR7b2JqLmNvbXBhbnlOYW1lfScsICcke29iai5jb21wYW55TG9nb30nLCAnJHtvYmouZGV2aXNlSWR9JywgJyR7b2JqLnVzZXJUeXBlSWR9Jyk7YCBcbiAgICAgIDogYElOU0VSVCBJTlRPIFxcYHVzZXJcXGAgKFxcYGZpcnN0TmFtZVxcYCwgXFxgbGFzdE5hbWVcXGAsIFxcYGxvZ2luXFxgLCBcXGBlbWFpbFxcYCwgXFxgcGFzc1xcYCwgXFxgY29tcGFueU5hbWVcXGAsIFxcYGRldmlzZUlkXFxgLCBcXGB1c2VyVHlwZUlkXFxgKSBWQUxVRVMgKCcke29iai5maXJzdE5hbWV9JywgJyR7b2JqLmxhc3ROYW1lfScsICcke29iai5sb2dpbn0nLCAnJHtvYmouZW1haWx9JywgJyR7b2JqLnBhc3N9JywgJyR7b2JqLmNvbXBhbnlOYW1lfScsICcke29iai5kZXZpc2VJZH0nLCAnJHtvYmoudXNlclR5cGVJZH0nKTtgO1xuICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgLy8gY29uc29sZS5sb2coYXdhaXQgbmV3UXVlcnkocHJvcHMuZGJDb25uLCAnU0VMRUNUICogRlJPTSB1c2VyOycpKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBuZXdSdW4ocHJvcHMuZGJDb25uLCBzcWwpO1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgIGlmICghIXZhbHVlcyAmJiB2YWx1ZXMuY2hhbmdlcy5jaGFuZ2VzKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgVXNlciBpbnNlcnRlZCB3aXRoIGlkIC0tPiAke3ZhbHVlcy5jaGFuZ2VzLmxhc3RJZH1gKTtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLm9rLmFkZCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlc1Zpc2liaWxpdHk6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmV0ID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmFkZCcsIHtlcnI6ICdJbnNlcnQgdXNlciB0byBTUUxpdGUgREIgISd9KVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIGNsb3NlRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubik7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7IGVycjogJ1VuYWJsZSB0byBvcGVuIFNRTGl0ZSBEQiAhJyB9KVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgbWVzc2FnZXNWaXNpYmlsaXR5OiB0cnVlXG4gICAgfSk7XG4gICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbi8vIGZ1bmN0aW9uIHVwbG9hZCgpIHtcbi8vICAgcmV0dXJuIHVwbG9hZEltYWdlQXhpb3NTZXJ2aWNlXG4vLyAgICAgLnVwbG9hZChjb21wYW55TG9nby52YWx1ZSwgKGV2ZW50KSA9PiB7XG4vLyAgICAgICBwcm9ncmVzcy52YWxlID0gTWF0aC5yb3VuZCgoMTAwICogZXZlbnQubG9hZGVkKSAvIGV2ZW50LnRvdGFsKTtcbi8vICAgICB9KTtcbi8vIH07XG5mdW5jdGlvbiBvbkludmFsaWRDb21wYW55TG9nbyhlbnRyaWVzKSB7XG4gIC8vIGNvbnNvbGUubG9nKGVudHJpZXMpO1xuICBmb3IgKGNvbnN0IGsgaW4gZW50cmllcyl7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBlbnRyaWVzW2tdLmZpbGUubmFtZTtcbiAgICBjb25zdCBmaWxlc2l6ZSA9IGVudHJpZXNba10uZmlsZS5zaXplO1xuICAgIGNvbnN0IGV4dCA9IGZpbGVuYW1lLmxhc3RJbmRleE9mKCcuJykgIT09IC0xIFxuICAgICAgPyBmaWxlbmFtZS5zbGljZShmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpKSBcbiAgICAgIDogZmlsZW5hbWU7XG4gICAgaWYgKGVudHJpZXNba10uZmFpbGVkUHJvcFZhbGlkYXRpb24gPT09ICdhY2NlcHQnKXtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IuY29tcGFueUxvZ28uYWNjZXB0Jywge2V4dDogZXh0fSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmKGVudHJpZXNba10uZmFpbGVkUHJvcFZhbGlkYXRpb24gPT09ICdtYXgtZmlsZS1zaXplJyl7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmNvbXBhbnlMb2dvLm1heEZpbGVTaXplJywge21heDogbWF4U2l6ZSwgc2l6ZTogZmlsZXNpemV9KVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gb25GYWlsZWRDb21wYW55TG9nb1VwbG9hZCh7eGhyfSkge1xuICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG4gIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICRxLm5vdGlmeSh7XG4gICAgY29sb3I6ICdyZWQtNScsXG4gICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgIGljb246ICd3YXJuaW5nJyxcbiAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28udXBsb2FkJywge2VycjogJ1JlcXVlc3QgaGFuZGxpbmcgZmFpbGVkICEnfSlcbiAgfSk7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGxvYWQnLCB7ZXJyOiBgUmVxdWVzdCBoYW5kbGluZyBmYWlsZWQgKCR7cmVzLm1lc3NhZ2V9KSAhYH0pXG4gICAgfSk7XG4gICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGxvYWQnLCB7IGVycjogYFJlcXVlc3QgaGFuZGxpbmcgZmFpbGVkICgke3Jlcy5tZXNzYWdlfSkgIWAgfSlcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICBjb21wYW55TG9nb1VwbG9hZGVyLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gb25GaWxlVXBsb2FkZWQoe3hocn0pe1xuICBjb25zdCB4aHJSZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG4gIGxldCByZXMgPSBmYWxzZTtcbiAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgY29tcGFueUxvZ28udmFsdWUgPSB4aHJSZXMuZmlsZW5hbWU7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICByZXMgPSBhd2FpdCBhZGRVc2VySW5EYigpO1xuICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzID0gYXdhaXQgYWRkVXNlckluU1FMaXRlRGIoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgQWRkaW5nIFVzZXIgUmVzdWx0IC0tPiAke3Jlc31gKTtcbiAgfVxuICBpZiAocmVzKSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMub2suYWRkJylcbiAgICB9KTtcbiAgICByb3V0ZXIucHVzaCh7bmFtZTogdCgnc3RhcnRMaW5rTmFtZScpfSk7XG4gICAgLy8gaHlkcmF0ZUZvcm0oKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkcS5ub3RpZnkoe1xuICAgICAgY29sb3I6ICdyZWQtNScsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28uYWRkJylcbiAgICB9KTtcbiAgICBmb3JjZU1lc3NhZ2VJdGVtc1JlcmVuZGVyKCk7XG4gIH1cbn07XG5mdW5jdGlvbiBmYWN0b3J5Rm4oKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGZpbGVzKTtcbiAgICByZXNvbHZlKHtcbiAgICAgIHVybDogYCR7b3JpZ2lufSR7cHJvY2Vzcy5lbnYuUE9SVF9TU1J9JHtwcm9jZXNzLmVudi5QVUJMSUNfUEFUSH0vYXBpL3VzZXJzL3VwbG9hZGAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB9KTtcbiAgfSk7XG59O1xuZnVuY3Rpb24gYWRkZWRGaWxlKGZpbGVzKSB7XG4gIC8vIGNvbnNvbGUubG9nKGZpbGVzKTtcbiAgLy8gY29uc29sZS5sb2coY29tcGFueUxvZ29VcGxvYWRlci52YWx1ZSk7XG4gIGlmICghIWZpbGVzICYmIGZpbGVzLmxlbmd0aCkge1xuICAgIGNvbXBhbnlMb2dvVVJMLnZhbHVlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1swXSk7XG4gICAgY29tcGFueUxvZ28udmFsdWUgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVzWzBdKTtcbiAgfVxuICAvLyBlbHNlIHtcbiAgLy8gICBjb21wYW55TG9nb1VSTC52YWx1ZSA9IG51bGw7XG4gIC8vIH1cbn07XG5mdW5jdGlvbiByZW1vdmVkRmlsZSgpIHtcbiAgY29tcGFueUxvZ29VUkwudmFsdWUgPSBudWxsO1xuICBjb21wYW55TG9nby52YWx1ZSA9IG51bGw7XG59O1xuZnVuY3Rpb24gaGFuZGxlT3JpZW50YXRpb24oKXtcbiAgLy8gY29uc29sZS5sb2coc2NyZWVuLm9yaWVudGF0aW9uKTtcbiAgb3JpZW50YXRpb24udmFsdWUgPSBzY3JlZW4ub3JpZW50YXRpb24udHlwZTtcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nIGNsYXNzPVwiY29sdW1uIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWV2ZW5seVwiPlxuICAgIDwhLS0gY29udGVudCAtLT5cbiAgICA8cmVnaXN0ZXItZm9ybS1jb21wb25lbnRcbiAgICAgIDpkYkNvbm49XCJkYkNvbm5cIj5cbiAgICAgICAgXG4gICAgPC9yZWdpc3Rlci1mb3JtLWNvbXBvbmVudD5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzOiBvZmYqL1xuaW1wb3J0IFJlZ2lzdGVyRm9ybUNvbXBvbmVudCBmcm9tICdjb21wb25lbnRzL1JlZ2lzdGVyRm9ybUNvbXBvbmVudC52dWUnO1xuaW1wb3J0IHsgb25Nb3VudGVkIH0gZnJvbSAndnVlJztcbi8vIFZBUklBQkxFU1xuaW50ZXJmYWNlIFBhZ2VQcm9wcyB7XG4gIGRiQ29ubj86IFNRTGl0ZURCQ29ubmVjdGlvbiB8IG51bGw7XG59O1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UGFnZVByb3BzPigpLCB7XG4gIGRiQ29ubjogbnVsbCxcbn0pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2hhbmdlLXRhYiddKTtcblxuLy8gTElGRUNZQ0xFIEVWRU5UU1xub25Nb3VudGVkKCgpID0+IHtcbiAgZW1pdCgnY2hhbmdlLXRhYicsIHVuZGVmaW5lZCk7XG59KTtcbjwvc2NyaXB0PlxuIl0sImZpbGUiOiJhc3NldHMvUmVnaXN0ZXJQYWdlLmpzIn0=
