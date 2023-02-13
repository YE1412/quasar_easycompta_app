import { Q as QPage } from "./QPage.js";
import { ac as _export_sfc, $ as defineComponent, f as ref, ao as useI18n, d as computed, _ as __vitePreload, a3 as openBlock, a6 as createElementBlock, a4 as createVNode, a2 as withCtx, a1 as createBlock, a5 as createCommentVNode, ar as createBaseVNode, aa as toDisplayString, aq as unref, at as normalizeClass, ab as QAvatar, j as QBtn, as as normalizeStyle, a8 as Fragment, g as getCurrentInstance, B as nextTick, o as onMounted } from "./index.js";
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
  __name: "ProfileComponent",
  props: {
    dbConn: { default: null }
  },
  setup(__props) {
    const props = __props;
    const app = getCurrentInstance();
    const key = app.appContext.config.globalProperties.$key;
    const $q = useQuasar();
    const userId = ref(0);
    const firstName = ref(null);
    const firstNameRef = ref(null);
    const lastName = ref(null);
    const lastNameRef = ref(null);
    const login = ref(null);
    const loginRef = ref(null);
    const email = ref(null);
    const emailRef = ref(null);
    const pass = ref(null);
    const passRef = ref(null);
    const companyName = ref(null);
    const companyNameRef = ref(null);
    const companyLogoUploader = ref(null);
    const companyLogo = ref(null);
    const companyLogoURL = ref(null);
    const maxSize = ref(2 * 1024 * 1024);
    const devise = ref(null);
    const deviseRef = ref(null);
    const selectDevisesOption = ref([]);
    const userType = ref(null);
    const userTypeRef = ref(null);
    const selectUserTypesOption = ref([]);
    const platform = $q.platform;
    const messageVisibility = ref(false);
    const renderComponent = ref(true);
    const { t } = useI18n();
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
    const validateForm = computed(() => {
      const ret1 = validFirstName.value && validLastName.value && validLogin.value && validEmail.value && validPass.value && validCompanyName.value;
      const ret2 = nonEmptyFirstName.value && nonEmptyLastName.value && nonEmptyLogin.value && nonEmptyEmail.value && nonEmptyPass.value && nonEmptyCompanyName.value && nonEmptyDevise.value && nonEmptyUserType.value;
      return ret1 && ret2;
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
      pass.value = null;
      companyName.value = null;
      companyLogo.value = null;
      devise.value = null;
      userType.value = null;
      companyLogoUploader.value.reset();
    }
    async function submit() {
      if (validateForm.value) {
        if (!!companyLogo.value) {
          companyLogoUploader.value.upload();
        } else {
          if (platform.is.desktop) {
            const res = await updateUserInDb();
            if (res) {
              $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: t("profileComponent.results.ok.update")
              });
            } else {
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: t("profileComponent.results.ko.update")
              });
            }
          } else {
            const res = await updateUserInSQLiteDb();
            if (res) {
              $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: t("profileComponent.results.ok.update")
              });
            } else {
              $q.notify({
                color: "red-5",
                textColor: "white",
                icon: "warning",
                message: t("profileComponent.results.ko.update")
              });
            }
          }
          forceMessageItemsRerender();
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
          userStore.retrieveUser(userStore.getUser.userId).then(async (res) => {
            userId.value = res.userId;
            firstName.value = res.firstName;
            lastName.value = res.lastName;
            login.value = res.login;
            email.value = res.email;
            pass.value = null;
            companyName.value = res.companyName;
            companyLogo.value = null;
            companyLogoURL.value = !!res.companyLogo && res.companyLogo != "" ? `${window.location.origin}${"/dist"}/assets/uploads/${res.companyLogo}` : null;
            devise.value = { value: res.devise.deviseId, label: `${res.devise.symbole} - ${res.devise.libelle}`, cannotSelect: false, deviseId: res.devise.deviseId, libelle: res.devise.libelle, symbole: res.devise.symbole };
            if (!!res.user_type) {
              let userTypeLabel = res.user_type.regular && !res.user_type.admin ? t("profileComponent.libelles.types.regular") : "";
              userTypeLabel = res.user_type.admin && !res.user_type.regular ? t("profileComponent.libelles.types.admin") : userTypeLabel;
              userTypeLabel = res.user_type.admin && res.user_type.regular ? t("profileComponent.libelles.types.regular") + ", " + t("profileComponent.libelles.types.admin") : userTypeLabel;
              userType.value = { value: res.user_type.userTypeId, label: userTypeLabel, cannotSelect: false, userTypeId: res.user_type.userTypeId, regular: res.user_type.regular, admin: res.user_type.admin };
            }
          }).catch((err) => {
            messageStore.messages.push({
              severity: true,
              content: t("profileComponent.results.ko.fetch_user", { err })
            });
            messageVisibility.value = true;
            messageStore.setMessagesVisibility(true);
          });
          invoiceStore.getAllDevises().then((res) => {
            let obj = {};
            selectDevisesOption.value = [];
            obj.value = 0;
            obj.label = t("invoicesComponent.placeholders.devise");
            obj.cannotSelect = true;
            obj.deviseId = 0;
            obj.symbole = null;
            obj.libelle = null;
            selectDevisesOption.value.push(obj);
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
          userStore.getUserTypes().then((res) => {
            let obj = {};
            selectUserTypesOption.value = [];
            obj.value = 0;
            obj.label = t("profileComponent.placeholders.userType");
            obj.cannotSelect = true;
            obj.userTypeId = 0;
            obj.regular = null;
            obj.admin = null;
            selectUserTypesOption.value.push(obj);
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
        prefs = !!prefs ? prefs : await __vitePreload(() => import("./index3.js"), true ? ["assets/index3.js","assets/index.js","assets/index.css"] : void 0);
        const usrCookie = await prefs.getPref("user");
        let user = usrCookie.user;
        userId.value = user.userId;
        firstName.value = user.firstName;
        lastName.value = user.lastName;
        login.value = user.login;
        email.value = user.email;
        pass.value = null;
        companyName.value = user.companyName;
        companyLogo.value = null;
        companyLogoURL.value = !!user.companyLogo && user.companyLogo != "" ? `assets/uploads/${user.companyLogo}` : null;
        devise.value = { value: user.devise.deviseId, label: `${user.devise.symbole} - ${user.devise.libelle}`, cannotSelect: false, deviseId: user.devise.deviseId, libelle: user.devise.libelle, symbole: user.devise.symbole };
        let userTypeLabel = null;
        if (!!user.user_type) {
          userTypeLabel = user.user_type.regular && !user.user_type.admin ? t("profileComponent.libelles.types.regular") : "";
          userTypeLabel = user.user_type.admin && !user.user_type.regular ? t("profileComponent.libelles.types.admin") : userTypeLabel;
          userTypeLabel = user.user_type.admin && user.user_type.regular ? t("profileComponent.libelles.types.regular") + ", " + t("profileComponent.libelles.types.admin") : userTypeLabel;
          userType.value = { value: user.user_type.userTypeId, label: userTypeLabel, cannotSelect: false, userTypeId: user.user_type.userTypeId, regular: user.user_type.regular, admin: user.user_type.admin };
        }
        let isOpen = await isDbConnectionOpen(props.dbConn);
        isOpen = !isOpen || !!isOpen ? await openDbConnection(props.dbConn) : isOpen;
        if (isOpen) {
          let sql = "SELECT `devise`.`deviseId`, `devise`.`symbole`, `devise`.`libelle` FROM `devise`;";
          let values = await newQuery(props.dbConn, sql);
          if (values.values.length) {
            const res = values.values;
            let obj = {};
            selectDevisesOption.value = [];
            obj.value = 0;
            obj.label = t("invoicesComponent.placeholders.devise");
            obj.cannotSelect = true;
            obj.deviseId = 0;
            obj.symbole = null;
            obj.libelle = null;
            selectDevisesOption.value.push(obj);
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
              messageVisibility: true
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
              messageVisibility: true
            });
            messageVisibility.value = true;
          }
          sql = "SELECT `user_type`.`userTypeId`, `user_type`.`regular`, `user_type`.`admin` FROM `user_type`;";
          values = await newQuery(props.dbConn, sql);
          if (values.values.length) {
            const res = values.values;
            let obj = {};
            selectUserTypesOption.value = [];
            obj.value = 0;
            obj.label = t("profileComponent.placeholders.userType");
            obj.cannotSelect = true;
            obj.userTypeId = 0;
            obj.regular = null;
            obj.admin = null;
            selectUserTypesOption.value.push(obj);
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
              messageVisibility: true
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
              messageVisibility: true
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
            messageVisibility: true
          });
          messageVisibility.value = true;
        }
      }
    }
    async function updateUserInDb() {
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
      return userAxiosService.update(userId.value, obj).then(() => {
        messageStore.messages.push({
          severity: false,
          content: t("profileComponent.results.ok.update")
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return true;
      }).catch((err) => {
        messageStore.messages.push({
          severity: true,
          content: t("profileComponent.results.ko.update", { err })
        });
        messageVisibility.value = true;
        messageStore.setMessagesVisibility(true);
        return false;
      });
    }
    async function updateUserInSQLiteDb() {
      const obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        login: login.value,
        email: email.value,
        pass: pass.value,
        companyName: companyName.value,
        companyLogo: !!companyLogo.value ? companyLogo.value.name : null,
        deviseId: devise.value.deviseId,
        userTypeId: userType.value.userTypeId
      };
      await transformObject(obj);
      let isOpen = await isDbConnectionOpen(props.dbConn);
      isOpen = !!isOpen || !isOpen ? await openDbConnection(props.dbConn) : isOpen;
      if (isOpen) {
        const sql = "UPDATE `user` SET `firstName`=?, `lastName`=?, `login`=?, `email`=?, `pass`=?, `companyName`=?, `companyLogo`=?, `deviseId`=?, `userTypeId`=? WHERE `userId`=?;";
        const values = await newRun(props.dbConn, sql, [obj.firstName, obj.lastName, obj.login, obj.email, obj.pass, obj.companyName, obj.companyLogo, obj.deviseId, obj.userTypeId, userId.value]);
        let ret = false;
        if (!!values && values.changes.changes) {
          await prefs.setPref("message", {
            messages: [
              {
                severity: false,
                content: t("profileComponent.results.ok.update")
              }
            ],
            messageVisibility: true
          });
          const usrCookie = await prefs.getPref("user");
          usrCookie.user.firstName = firstName.value;
          usrCookie.user.lastName = lastName.value;
          usrCookie.user.login = login.value;
          usrCookie.user.email = email.value;
          usrCookie.user.pass = null;
          usrCookie.user.companyName = companyName.value;
          usrCookie.user.companyLogo = !!companyLogo.value ? companyLogo.value : null;
          usrCookie.user.devise = devise.value;
          usrCookie.user.user_type = userType.value;
          await prefs.setPref("user", usrCookie);
          ret = true;
        } else {
          await prefs.setPref("message", {
            messages: [
              {
                severity: true,
                content: t("profileComponent.results.ko.update", { err: "Update user in SQLite DB !" })
              }
            ],
            messageVisibility: true
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
          messageVisibility: true
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
        res = await updateUserInDb();
      } else {
        res = await updateUserInSQLiteDb();
      }
      if (res) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("profileComponent.results.ok.update")
        });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: t("profileComponent.results.ko.update")
        });
      }
      forceMessageItemsRerender();
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
          class: normalizeClass("q-pt-lg q-pb-lg SenExtrabold-font " + (unref(compact) ? "text-h4" : "text-h2") + " text-uppercase text-center text-bold")
        }, toDisplayString(unref(t)("profileComponent.titles.update")), 3),
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
                disabled: "",
                readonly: "",
                rules: [
                  (val) => unref(nonEmptyEmail) || unref(t)("profileComponent.errors.empty.email"),
                  (val) => unref(validEmail) || unref(t)("profileComponent.errors.error.email")
                ]
              }, null, 8, ["modelValue", "label", "hint", "placeholder", "rules"]),
              createVNode(QInput, {
                filled: "",
                type: "password",
                modelValue: pass.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => pass.value = $event),
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
                type: "text",
                modelValue: companyName.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => companyName.value = $event),
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
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => devise.value = $event),
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
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => userType.value = $event),
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
var ProfileComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ProfileComponent.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProfilePage",
  props: {
    dbConn: { default: null }
  },
  emits: ["change-tab"],
  setup(__props, { emit }) {
    onMounted(() => {
      emit("change-tab", "profile");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "row items-center justify-evenly" }, {
        default: withCtx(() => [
          createVNode(ProfileComponent, { dbConn: __props.dbConn }, null, 8, ["dbConn"])
        ]),
        _: 1
      });
    };
  }
});
var ProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ProfilePage.vue"]]);
export { ProfilePage as default };
//# sourceMappingURL=data:application/json;base64,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O0FBQzBCO0lBQzVCO0FBQ0EsYUFBUyxZQUFZO0FBQ1osaUJBQUksUUFBUSxDQUFDLFlBQVk7QUFFdEI7QUFBQSxVQUNOLEtBQUssR0FBRyxTQUFTLFNBQXVCO0FBQUEsVUFDeEMsUUFBUTtBQUFBLFNBUVQ7QUFBQSxPQUNGO0FBQUEsSUFDSDtBQUNBLGFBQVMsVUFBVSxPQUFPO0FBR3hCLFVBQUksQ0FBQyxDQUFDLFNBQVMsTUFBTSxRQUFRO0FBQzNCLHVCQUFlLFFBQVEsSUFBSSxnQkFBZ0IsTUFBTSxFQUFFO0FBQ25ELG9CQUFZLFFBQVEsSUFBSSxnQkFBZ0IsTUFBTSxFQUFFO0FBQUEsTUFDbEQ7QUFBQSxJQUlGO0FBQ0EsYUFBUyxjQUFjO0FBQ3JCLHFCQUFlLFFBQVE7QUFDdkIsa0JBQVksUUFBUTtBQUFBLElBQ3RCO0FBQ0EsYUFBUyxvQkFBbUI7QUFFZCwwQkFBUSxPQUFPLFlBQVk7QUFBQSxJQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzc5QkEsY0FBVSxNQUFNO0FBQ2QsV0FBSyxjQUFjLFNBQVM7QUFBQSxLQUM3QiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9Qcm9maWxlUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1uby1zc3I+XG4gICAgPE1lc3NhZ2VzSXRlbSB2LWlmPSdtZXNzYWdlVmlzaWJpbGl0eSAmJiByZW5kZXJDb21wb25lbnQnIC8+XG4gIDwvcS1uby1zc3I+XG4gIDxkaXYgOmNsYXNzPVwiJ3EtcHQtbGcgcS1wYi1sZyBTZW5FeHRyYWJvbGQtZm9udCAnKyAoY29tcGFjdCA/ICd0ZXh0LWg0JyA6ICd0ZXh0LWgyJykgKyAnIHRleHQtdXBwZXJjYXNlIHRleHQtY2VudGVyIHRleHQtYm9sZCdcIj57eyB0KCdwcm9maWxlQ29tcG9uZW50LnRpdGxlcy51cGRhdGUnKSB9fTwvZGl2PlxuICA8ZGl2IGNsYXNzPSdxLXBhLWxnJyA6c3R5bGU9XCIhY29tcGFjdCA/ICd3aWR0aDogNzAlOycgOiAnd2lkdGg6IDEwMCU7J1wiPlxuICAgIDxxLWZvcm1cbiAgICAgIEBzdWJtaXQ9J3N1Ym1pdCdcbiAgICAgIEByZXNldD0ncmVzZXQnXG4gICAgICBjbGFzcz0ncS1ndXR0ZXItbWQnPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdi1tb2RlbD1cImZpcnN0TmFtZVwiXG4gICAgICAgIHJlZj1cImZpcnN0TmFtZVJlZlwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMuZmlyc3ROYW1lJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5maXJzdE5hbWUnKVwiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwidCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMuZmlyc3ROYW1lJylcIlxuICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlGaXJzdE5hbWUgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkuZmlyc3ROYW1lJyksXG4gICAgICAgICAgdmFsID0+IHZhbGlkRmlyc3ROYW1lIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmZpcnN0TmFtZScpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHYtbW9kZWw9XCJsYXN0TmFtZVwiXG4gICAgICAgIHJlZj1cImxhc3ROYW1lUmVmXCJcbiAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5sYXN0TmFtZScpKycgKidcIlxuICAgICAgICA6aGludD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaGludHMubGFzdE5hbWUnKVwiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwidCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMubGFzdE5hbWUnKVwiXG4gICAgICAgIDpjbGVhcmFibGU9XCJ0cnVlXCJcbiAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICA6cnVsZXM9XCJbIHZhbCA9PiBub25FbXB0eUxhc3ROYW1lIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVtcHR5Lmxhc3ROYW1lJyksXG4gICAgICAgICAgdmFsID0+IHZhbGlkTGFzdE5hbWUgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IubGFzdE5hbWUnKVxuICAgICAgICBdXCJcbiAgICAgIC8+XG4gICAgICA8cS1pbnB1dFxuICAgICAgICBmaWxsZWRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICB2LW1vZGVsPVwibG9naW5cIlxuICAgICAgICByZWY9XCJsb2dpblJlZlwiXG4gICAgICAgIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaW5wdXRMYWJlbHMubG9naW4nKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmxvZ2luJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLmxvZ2luJylcIlxuICAgICAgICA6Y2xlYXJhYmxlPVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlMb2dpbiB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lbXB0eS5sb2dpbicpLFxuICAgICAgICAgIHZhbCA9PiB2YWxpZExvZ2luIHx8IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmxvZ2luJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgIHYtbW9kZWw9XCJlbWFpbFwiXG4gICAgICAgIHJlZj1cImVtYWlsUmVmXCJcbiAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5lbWFpbCcpKycgKidcIlxuICAgICAgICA6aGludD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaGludHMuZW1haWwnKSsnIConXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdwcm9maWxlQ29tcG9uZW50LnBsYWNlaG9sZGVycy5lbWFpbCcpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIGRpc2FibGVkXG4gICAgICAgIHJlYWRvbmx5XG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5RW1haWwgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkuZW1haWwnKSxcbiAgICAgICAgICB2YWwgPT4gdmFsaWRFbWFpbCB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5lbWFpbCcpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICB2LW1vZGVsPVwicGFzc1wiXG4gICAgICAgIHJlZj1cInBhc3NSZWZcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLnBhc3MnKSsnIConXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLnBhc3MnKVwiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwidCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMucGFzcycpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5UGFzcyB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lbXB0eS5wYXNzJyksXG4gICAgICAgICAgdmFsID0+IHZhbGlkUGFzcyB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5wYXNzJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgZmlsbGVkXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgdi1tb2RlbD1cImNvbXBhbnlOYW1lXCJcbiAgICAgICAgcmVmPVwiY29tcGFueU5hbWVSZWZcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbXBhbnlOYW1lJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy5jb21wYW55TmFtZScpXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJ0KCdwcm9maWxlQ29tcG9uZW50LnBsYWNlaG9sZGVycy5jb21wYW55TmFtZScpXCJcbiAgICAgICAgOmNsZWFyYWJsZT1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5Q29tcGFueU5hbWUgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkuY29tcGFueU5hbWUnKSxcbiAgICAgICAgICB2YWwgPT4gdmFsaWRDb21wYW55TmFtZSB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5jb21wYW55TmFtZScpXG4gICAgICAgIF1cIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktc3RhcnQgcm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8cS1hdmF0YXIgdi1pZj1cIiEhY29tcGFueUxvZ29VUkxcIj5cbiAgICAgICAgICA8aW1nIDpzcmM9XCJjb21wYW55TG9nb1VSTFwiIC8+XG4gICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgIDxxLXVwbG9hZGVyXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJVwiXG4gICAgICAgICAgcmVmPVwiY29tcGFueUxvZ29VcGxvYWRlclwiXG4gICAgICAgICAgOmZhY3Rvcnk9XCJmYWN0b3J5Rm5cIlxuICAgICAgICAgIGFjY2VwdD1cImltYWdlL3N2Z1wiXG4gICAgICAgICAgOm1heC1maWxlLXNpemU9XCJtYXhTaXplXCJcbiAgICAgICAgICA6bXVsdGlwbGU9XCJmYWxzZVwiXG4gICAgICAgICAgOmF1dG8tdXBsb2FkPVwiZmFsc2VcIlxuICAgICAgICAgIDpoaWRlLXVwbG9hZC1idG49XCJ0cnVlXCJcbiAgICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmNvbXBhbnlMb2dvJylcIlxuICAgICAgICAgIGZpZWxkLW5hbWU9J2ZpbGUnXG4gICAgICAgICAgQHVwbG9hZGVkPVwib25GaWxlVXBsb2FkZWRcIlxuICAgICAgICAgIEByZWplY3RlZD1cIm9uSW52YWxpZENvbXBhbnlMb2dvXCJcbiAgICAgICAgICBAZmFpbGVkPVwib25GYWlsZWRDb21wYW55TG9nb1VwbG9hZFwiXG4gICAgICAgICAgQGFkZGVkPVwiYWRkZWRGaWxlXCJcbiAgICAgICAgICBAcmVtb3ZlZD1cInJlbW92ZWRGaWxlXCJcbiAgICAgICAgPlxuICAgICAgICA8L3EtdXBsb2FkZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gPHEtZmlsZVxuICAgICAgICBmaWxsZWRcbiAgICAgICAgdi1tb2RlbD1cImNvbXBhbnlMb2dvXCJcbiAgICAgICAgOmZhY3Rvcnk9XCJ1cGxvYWRcIlxuICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgOm1heC1maWxlLXNpemU9XCJtYXhTaXplXCJcbiAgICAgICAgOm11bHRpcGxlPVwiZmFsc2VcIlxuICAgICAgICA6c3RhY2stbGFiZWw9XCJ0cnVlXCJcbiAgICAgICAgOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5pbnB1dExhYmVscy5jb21wYW55TG9nbycpXCJcbiAgICAgICAgOmhpbnQ9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmhpbnRzLmNvbXBhbnlMb2dvJywge3NpemU6IG1heFNpemV9KVwiXG4gICAgICAgIDpoaWRlLWhpbnQ9XCJ0cnVlXCJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwidCgncHJvZmlsZUNvbXBvbmVudC5wbGFjZWhvbGRlcnMuY29tcGFueUxvZ28nKVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOmNsZWFyYWJsZT0ndHJ1ZSdcbiAgICAgICAgOnJ1bGVzPVwiWyBcbiAgICAgICAgICB2YWwgPT4gdmFsaWRDb21wYW55TG9nbyB8fCB0KCdwcm9maWxlQ29tcG9uZW50LmVycm9ycy5lcnJvci5jb21wYW55TG9nbycpXG4gICAgICAgIF1cIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJlZm9yZSB2LWlmPVwiISFjb21wYW55TG9nb1VSTFwiPlxuICAgICAgICAgIDxxLWF2YXRhcj5cbiAgICAgICAgICAgIDxpbWcgOnNyYz1cImNvbXBhbnlMb2dvVVJMXCIgLz5cbiAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWZpbGU+IC0tPlxuICAgICAgPHEtc2VsZWN0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB2LW1vZGVsPVwiZGV2aXNlXCJcbiAgICAgICAgcmVmPVwiZGV2aXNlUmVmXCJcbiAgICAgICAgOm9wdGlvbnM9XCJzZWxlY3REZXZpc2VzT3B0aW9uXCJcbiAgICAgICAgb3B0aW9uLWRpc2FibGU9XCJjYW5ub3RTZWxlY3RcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLmRldmlzZScpKycgKidcIlxuICAgICAgICA6aGludD1cInQoJ3Byb2ZpbGVDb21wb25lbnQuaGludHMuZGV2aXNlJylcIlxuICAgICAgICA6aGlkZS1oaW50PVwidHJ1ZVwiXG4gICAgICAgIGxhenktcnVsZXNcbiAgICAgICAgOnJ1bGVzPVwiWyB2YWwgPT4gbm9uRW1wdHlEZXZpc2UgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkuZGV2aXNlJylcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgICAgPHEtc2VsZWN0XG4gICAgICAgIGZpbGxlZFxuICAgICAgICB2LW1vZGVsPVwidXNlclR5cGVcIlxuICAgICAgICByZWY9XCJ1c2VyVHlwZVJlZlwiXG4gICAgICAgIDpvcHRpb25zPVwic2VsZWN0VXNlclR5cGVzT3B0aW9uXCJcbiAgICAgICAgb3B0aW9uLWRpc2FibGU9XCJjYW5ub3RTZWxlY3RcIlxuICAgICAgICA6bGFiZWw9XCJ0KCdwcm9maWxlQ29tcG9uZW50LmlucHV0TGFiZWxzLnVzZXJUeXBlJykrJyAqJ1wiXG4gICAgICAgIDpoaW50PVwidCgncHJvZmlsZUNvbXBvbmVudC5oaW50cy51c2VyVHlwZScpXCJcbiAgICAgICAgOmhpZGUtaGludD1cInRydWVcIlxuICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgIDpydWxlcz1cIlsgdmFsID0+IG5vbkVtcHR5VXNlclR5cGUgfHwgdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZW1wdHkudXNlclR5cGUnKVxuICAgICAgICBdXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXIgY29udGVudC1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgPHEtYnRuIDpsYWJlbD1cInQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudXBkYXRlQnV0dG9uJylcIiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJwcmltYXJ5XCIvPlxuICAgICAgICA8cS1idG4gOmxhYmVsPVwidCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy5yZXNldEJ1dHRvbicpXCIgdHlwZT1cInJlc2V0XCIgY29sb3I9XCJwcmltYXJ5XCIgZmxhdCBjbGFzcz1cInEtbWwtc21cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWZvcm0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCB7IHVzZVF1YXNhciB9IGZyb20gJ3F1YXNhcic7XG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJztcbmltcG9ydCBNZXNzYWdlc0l0ZW0gZnJvbSAnLi9NZXNzYWdlc0l0ZW0udnVlJztcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gJ3N0b3Jlcy91c2VyJztcbmltcG9ydCB7IHVzZUludm9pY2VTdG9yZSB9IGZyb20gJ3N0b3Jlcy9pbnZvaWNlJztcbmltcG9ydCB7IHVzZU1lc3NhZ2VTdG9yZSB9IGZyb20gJ3N0b3Jlcy9tZXNzYWdlJztcbmltcG9ydCB1c2VyQXhpb3NTZXJ2aWNlIGZyb20gJ2RiL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG4vLyBpbXBvcnQgdXBsb2FkSW1hZ2VBeGlvc1NlcnZpY2UgZnJvbSAnZGIvc2VydmljZXMvdXBsb2FkX2ltYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbmltcG9ydCB7IG9wZW5EYkNvbm5lY3Rpb24sIGlzRGJDb25uZWN0aW9uT3BlbiwgbmV3UnVuLCBuZXdRdWVyeSwgY2xvc2VEYkNvbm5lY3Rpb24gfSBmcm9tICdjYXAvc3RvcmFnZSc7XG5pbXBvcnQgeyBzZXRDcnlwdEFwaSwgX19GT1JNQVRPQkpfXyB9IGZyb20gJ3NyYy9nbG9iYWxzJztcbi8vIGltcG9ydCB7IEh0dHAgfSBmcm9tICdAY2FwYWNpdG9yLWNvbW11bml0eS9odHRwJztcbi8vIGltcG9ydCB7IEZpbGVzeXN0ZW0sIERpcmVjdG9yeSwgRW5jb2RpbmcgfSBmcm9tICdAY2FwYWNpdG9yL2ZpbGVzeXN0ZW0nO1xuLy8gaW1wb3J0ICogYXMgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcbi8vIGRvdGVudi5jb25maWcoeyBwYXRoOiBcIi4uLy4uL2VudnMvLmVudlwiIH0pO1xuXG4vLyBWQVJJQUJMRVNcbmludGVyZmFjZSBQcm9maWxlUHJvcHMge1xuICBkYkNvbm4/OiBTUUxpdGVEQkNvbm5lY3Rpb24gfCBudWxsOyBcbn07XG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9maWxlUHJvcHM+KCksIHtcbiAgZGJDb25uOiBudWxsXG59KTtcbmNvbnN0IGFwcCA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuY29uc3Qga2V5ID0gYXBwLmFwcENvbnRleHQuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGtleTtcbmNvbnN0ICRxID0gdXNlUXVhc2FyKCk7XG5jb25zdCB1c2VySWQgPSByZWYoMCk7XG5jb25zdCBmaXJzdE5hbWUgPSByZWYobnVsbCk7XG5jb25zdCBmaXJzdE5hbWVSZWYgPSByZWYobnVsbCk7XG5jb25zdCBsYXN0TmFtZSA9IHJlZihudWxsKTtcbmNvbnN0IGxhc3ROYW1lUmVmID0gcmVmKG51bGwpO1xuY29uc3QgbG9naW4gPSByZWYobnVsbCk7XG5jb25zdCBsb2dpblJlZiA9IHJlZihudWxsKTtcbmNvbnN0IGVtYWlsID0gcmVmKG51bGwpO1xuY29uc3QgZW1haWxSZWYgPSByZWYobnVsbCk7XG5jb25zdCBwYXNzID0gcmVmKG51bGwpO1xuY29uc3QgcGFzc1JlZiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhbnlOYW1lID0gcmVmKG51bGwpO1xuY29uc3QgY29tcGFueU5hbWVSZWYgPSByZWYobnVsbCk7XG5jb25zdCBjb21wYW55TG9nb1VwbG9hZGVyID0gcmVmKG51bGwpO1xuY29uc3QgY29tcGFueUxvZ28gPSByZWYobnVsbCk7XG5jb25zdCBjb21wYW55TG9nb1VSTCA9IHJlZihudWxsKTtcbmNvbnN0IG1heFNpemUgPSByZWYoMiAqIDEwMjQgKiAxMDI0KTtcbmNvbnN0IGRldmlzZSA9IHJlZihudWxsKTtcbmNvbnN0IGRldmlzZVJlZiA9cmVmKG51bGwpO1xuY29uc3Qgc2VsZWN0RGV2aXNlc09wdGlvbiA9IHJlZihbXSk7XG5jb25zdCB1c2VyVHlwZSA9IHJlZihudWxsKTtcbmNvbnN0IHVzZXJUeXBlUmVmID0gcmVmKG51bGwpO1xuY29uc3Qgc2VsZWN0VXNlclR5cGVzT3B0aW9uID0gcmVmKFtdKTsgXG5jb25zdCBwbGF0Zm9ybSA9ICRxLnBsYXRmb3JtO1xuY29uc3QgbWVzc2FnZVZpc2liaWxpdHkgPSByZWYoZmFsc2UpO1xuY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gcmVmKHRydWUpO1xuY29uc3QgeyB0IH0gPSB1c2VJMThuKCk7XG4vLyBjb25zdCBwcm9ncmVzcyA9IHJlZigwKTtcbmNvbnN0IHZhbGlkRmlyc3ROYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKChbYS16QS1aXSkoWy1dKSopezIsMzB9JC87XG4gIGNvbnN0IHJldCA9IHJlLnRlc3QoZmlyc3ROYW1lLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIGZpcnN0TmFtZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlGaXJzdE5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhZmlyc3ROYW1lLnZhbHVlICYmIGZpcnN0TmFtZS52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBmaXJzdE5hbWVSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZExhc3ROYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKFthLXpBLVpdKXsyLDMwfSQvO1xuICBjb25zdCByZXQgPSByZS50ZXN0KGxhc3ROYW1lLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIGxhc3ROYW1lUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlMYXN0TmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISFsYXN0TmFtZS52YWx1ZSAmJiBsYXN0TmFtZS52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBsYXN0TmFtZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IHZhbGlkTG9naW4gPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlID0gL14oKFthLXpBLVpdKShbX10pKil7MiwxNX0kLztcbiAgY29uc3QgcmV0ID0gcmUudGVzdChmaXJzdE5hbWUudmFsdWUpO1xuICBpZiAoIXJldCl7XG4gICAgbG9naW5SZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCBub25FbXB0eUxvZ2luID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXQgPSAhIWxvZ2luLnZhbHVlICYmIGxvZ2luLnZhbHVlICE9PSAnJztcbiAgaWYgKCFyZXQpe1xuICAgIGxvZ2luUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3QgdmFsaWRFbWFpbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gdHJ1ZTtcbiAgaWYgKCFyZXQpe1xuICAgIGVtYWlsUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlFbWFpbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISFlbWFpbC52YWx1ZSAmJiBlbWFpbC52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBlbWFpbFJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IHZhbGlkUGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmUgPSAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZCkoPz0uKltcXC1fKFxcW1xcXSlAJCElKiM/Jnt9XSlbQS1aYS16XFxkXFwtXyhcXFtcXF0pQCQhJSojPyZ7fV17OCwzMH0kLztcbiAgY29uc3QgcmV0ID0gcmUudGVzdChwYXNzLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIHBhc3NSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCBub25FbXB0eVBhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJldCA9ICEhcGFzcy52YWx1ZSAmJiBwYXNzLnZhbHVlICE9PSAnJztcbiAgaWYgKCFyZXQpe1xuICAgIHBhc3NSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCB2YWxpZENvbXBhbnlOYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZSA9IC9eKFthLXpBLVpdKXsyLDMwfSQvO1xuICBjb25zdCByZXQgPSByZS50ZXN0KGNvbXBhbnlOYW1lLnZhbHVlKTtcbiAgaWYgKCFyZXQpe1xuICAgIGNvbXBhbnlOYW1lUmVmLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn0pO1xuY29uc3Qgbm9uRW1wdHlDb21wYW55TmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISFjb21wYW55TmFtZS52YWx1ZSAmJiBjb21wYW55TmFtZS52YWx1ZSAhPT0gJyc7XG4gIGlmICghcmV0KXtcbiAgICBjb21wYW55TmFtZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbi8vIGNvbnN0IHZhbGlkQ29tcGFueUxvZ28gPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGNvbnN0IHJlID0gLyhcXC5zdmcpJC9pO1xuLy8gICBpZiAoISFjb21wYW55TG9nby52YWx1ZSlcbi8vICAgICByZXR1cm4gcmUudGVzdChjb21wYW55TG9nby52YWx1ZS5uYW1lKTtcbi8vICAgZWxzZVxuLy8gICAgIHJldHVybiB0cnVlO1xuLy8gfSk7XG5jb25zdCBub25FbXB0eURldmlzZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0ID0gISFkZXZpc2UudmFsdWUgJiYgZGV2aXNlLnZhbHVlLnZhbHVlICE9IDA7XG4gIGlmICghcmV0KXtcbiAgICBkZXZpc2VSZWYudmFsdWUuJGVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJywgaW5saW5lOiAnbmVhcmVzdCd9KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG5jb25zdCBub25FbXB0eVVzZXJUeXBlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCByZXQgPSAhIXVzZXJUeXBlLnZhbHVlICYmIHVzZXJUeXBlLnZhbHVlLnZhbHVlICE9IDA7XG4gIGlmICghcmV0KXtcbiAgICB1c2VyVHlwZVJlZi52YWx1ZS4kZWwuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInLCBpbmxpbmU6ICduZWFyZXN0J30pO1xuICB9XG4gIHJldHVybiByZXQ7XG59KTtcbmNvbnN0IHZhbGlkYXRlRm9ybSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcmV0MSA9ICh2YWxpZEZpcnN0TmFtZS52YWx1ZSAmJiB2YWxpZExhc3ROYW1lLnZhbHVlICYmIHZhbGlkTG9naW4udmFsdWUgJiYgdmFsaWRFbWFpbC52YWx1ZSAmJiB2YWxpZFBhc3MudmFsdWUgJiYgdmFsaWRDb21wYW55TmFtZS52YWx1ZSk7XG4gIGNvbnN0IHJldDIgPSAobm9uRW1wdHlGaXJzdE5hbWUudmFsdWUgJiYgbm9uRW1wdHlMYXN0TmFtZS52YWx1ZSAmJiBub25FbXB0eUxvZ2luLnZhbHVlICYmIG5vbkVtcHR5RW1haWwudmFsdWUgJiYgbm9uRW1wdHlQYXNzLnZhbHVlICYmIG5vbkVtcHR5Q29tcGFueU5hbWUudmFsdWUgJiYgbm9uRW1wdHlEZXZpc2UudmFsdWUgJiYgbm9uRW1wdHlVc2VyVHlwZS52YWx1ZSk7XG4gIC8vIGNvbnN0IHJldDMgPSAhIWNvbXBhbnlMb2dvLnZhbHVlID8gdmFsaWRDb21wYW55TG9nby52YWx1ZSA6IHRydWUgO1xuICByZXR1cm4gcmV0MSAmJiByZXQyO1xufSk7XG5jb25zdCBvcmllbnRhdGlvbiA9IHJlZihudWxsKTtcbmNvbnN0IGNvbXBhY3QgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCByZXQgPSBmYWxzZTtcbiAgaWYgKCEhb3JpZW50YXRpb24udmFsdWUpe1xuICAgIGlmIChvcmllbnRhdGlvbi52YWx1ZSA9PT0gJ3BvcnRyYWl0LXByaW1hcnknIHx8IG9yaWVudGF0aW9uLnZhbHVlID09PSAncG9ydHJhaXQtc2Vjb25kYXJ5Jyl7XG4gICAgICByZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufSk7XG4vLyBjb25zdCBkb0dldEltZ0Zvck1vYmlsZXMgPSBhc3luYygpOkh0dHBSZXNwb25zZSA9PiB7XG4vLyAgIGxldCByZXQgPSBudWxsO1xuLy8gICBjb25zdCBvcHRpb25zOiBIdHRwT3B0aW9ucyA9IHtcbi8vICAgICB1cmw6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2Zhdmljb24uaWNvYCxcbi8vICAgICByZXNwb25zZVR5cGU6ICdibG9iJyxcbi8vICAgICBzaG91bGRFbmNvZGVVcmxQYXJhbXM6IHRydWUsXG4vLyAgIH07XG4vLyAgIGNvbnNvbGUubG9nKCdIVFRQIENhcGFjaXRvciBHRVQgLS0+Jyk7XG4vLyAgIC8vIGNvbnNvbGUubG9nKCRxKTtcbi8vICAgcmV0ID0gYXdhaXQgSHR0cC5nZXQob3B0aW9ucyk7XG4vLyAgIHJldHVybiByZXQ7XG4vLyB9O1xuLy8gY29uc3QgZG9SZWFkRGlyID0gYXN5bmMoKTpSZWFkZGlyUmVzdWx0ID0+IHtcbi8vICAgbGV0IHJldCA9IG51bGw7XG5cbi8vICAgY29uc3Qgb3B0aW9uczogUmVhZGRpck9wdGlvbnMgPSB7XG4vLyAgICAgcGF0aDogYGAsXG4vLyAgICAgZGlyZWN0b3J5OiBEaXJlY3RvcnkuTGlicmFyeVxuLy8gICB9O1xuLy8gICAvLyBhd2FpdCBGaWxlc3lzdGVtLmdldFVyaShvcHRpb25zKVxuLy8gICBjb25zb2xlLmxvZygnUm9kZSBkaXIgZGF0YSAtLT4gJyk7XG4vLyAgIHJldCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcihvcHRpb25zKTtcbi8vICAgcmV0dXJuIHJldDtcbi8vIH07XG5cbmxldCB1c2VyU3RvcmUgPSBudWxsLCBtZXNzYWdlU3RvcmUgPSBudWxsLCBpbnZvaWNlU3RvcmUgPSBudWxsLCBwcmVmcyA9IG51bGwsIG9yaWdpbiA9IG51bGw7XG5cbi8vIERFQ0xBUkFUSU9OU1xuaWYgKHBsYXRmb3JtLmlzLmRlc2t0b3ApIHtcbiAgdXNlclN0b3JlID0gdXNlVXNlclN0b3JlKCk7XG4gIGludm9pY2VTdG9yZSA9IHVzZUludm9pY2VTdG9yZSgpO1xuICBtZXNzYWdlU3RvcmUgPSB1c2VNZXNzYWdlU3RvcmUoKTtcbiAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSBtZXNzYWdlU3RvcmUuZ2V0TWVzc2FnZXNWaXNpYmlsaXR5O1xufVxuZWxzZSB7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBoYW5kbGVPcmllbnRhdGlvbik7XG4gIChhc3luYyAoKSA9PiB7XG4gICAgcHJlZnMgPSBhd2FpdCBpbXBvcnQoJ2NhcC9zdG9yYWdlL3ByZWZlcmVuY2VzJyk7XG4gICAgY29uc3QgbWVzcyA9IGF3YWl0IHByZWZzLmdldFByZWYoJ21lc3NhZ2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhtZXNzKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9ICEhbWVzcyA/IG1lc3MubWVzc2FnZXMgOiBbXTtcbiAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlcyk7XG4gICAgY29uc3QgdmlzID0gISFtZXNzID8gbWVzcy5tZXNzYWdlc1Zpc2liaWxpdHkgOiBtZXNzO1xuICAgIC8vIGNvbnNvbGUubG9nKHZpcyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCAmJiB2aXMgPT09IG51bGwpIHtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB2aXMgIT09IG51bGwgPyB2aXMgOiBmYWxzZTtcbiAgICB9XG4gICAgLy8gY29uc3QgcmVzMSA9IGF3YWl0IGdldFJlcXVlc3QoJ2Fzc2V0cy91cGxvYWRzL0NMX1NWRy5zdmcnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXMxKTtcbiAgICAvLyBjb25zdCByZXMyID0gYXdhaXQgZG93bmxvYWRGb3JNb2JpbGUoJ3N2Z19maWxlXzEyc3ZnJywgJ2Fzc2V0cy91cGxvYWRzL0NMX1NWRy5zdmcnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXMyKTtcbiAgICAvLyBjb25zdCByZXMzID0gYXdhaXQgcmVhZEZpbGUocmVzMi5wYXRoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXMzKTtcbiAgfSkoKTtcbn1cbmlmICghaW1wb3J0Lm1ldGEuZW52LlNTUil7XG4gIGNvbnN0IGZ1bGxPcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAvLyBjb25zb2xlLmxvZyhpbXBvcnQubWV0YS5lbnYpO1xuICBvcmlnaW4gPSBmdWxsT3JpZ2luLnNsaWNlKDAsIGZ1bGxPcmlnaW4ubGFzdEluZGV4T2YoJzonKSArIDEpO1xuICAvLyBjb25zb2xlLmxvZyhvcmlnaW4pO1xuICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzLmVudik7XG59XG5oeWRyYXRlRm9ybSgpO1xuXG4vLyBGVU5DVElPTlNcbmFzeW5jIGZ1bmN0aW9uIGZvcmNlTWVzc2FnZUl0ZW1zUmVyZW5kZXIoKSB7XG4gIHJlbmRlckNvbXBvbmVudC52YWx1ZSA9IGZhbHNlO1xuICBhd2FpdCBuZXh0VGljaygpO1xuICByZW5kZXJDb21wb25lbnQudmFsdWUgPSB0cnVlO1xufTtcbmFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChvYmo6IGFueSkge1xuICAvLyBpZiAoX19LRVlfXyA9PT0gbnVsbCkge1xuICAvLyAgIGF3YWl0IHNldEdlbkFwaSgpO1xuICAvLyB9XG4gIGF3YWl0IHNldENyeXB0QXBpKCk7XG4gIF9fRk9STUFUT0JKX18ob2JqLCBrZXkpO1xufTtcbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBmaXJzdE5hbWUudmFsdWUgPSBudWxsO1xuICBsYXN0TmFtZS52YWx1ZSA9IG51bGw7XG4gIGxvZ2luLnZhbHVlID0gbnVsbDtcbiAgLy8gZW1haWwudmFsdWUgPSByZWYobnVsbCk7XG4gIHBhc3MudmFsdWUgPSBudWxsO1xuICBjb21wYW55TmFtZS52YWx1ZSA9IG51bGw7XG4gIGNvbXBhbnlMb2dvLnZhbHVlID0gbnVsbDtcbiAgZGV2aXNlLnZhbHVlID0gbnVsbDtcbiAgdXNlclR5cGUudmFsdWUgPSBudWxsO1xuICBjb21wYW55TG9nb1VwbG9hZGVyLnZhbHVlLnJlc2V0KCk7XG59O1xuYXN5bmMgZnVuY3Rpb24gc3VibWl0KCkge1xuICAvLyBjb25zb2xlLmxvZygnU3VibWl0ICEnKTtcbiAgLy8gY29uc29sZS5sb2coY29tcGFueUxvZ28udmFsdWUpO1xuICBpZiAodmFsaWRhdGVGb3JtLnZhbHVlKSB7XG4gICAgLy8gbGV0IHJldCA9IHRydWU7XG4gICAgaWYgKCEhY29tcGFueUxvZ28udmFsdWUpe1xuICAgICAgLy8gY29uc29sZS5sb2coYENvbXBhbnlMb2dvIHVwbG9hZGluZyAhYCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb21wYW55TG9nby52YWx1ZSk7XG4gICAgICAvLyByZXQgPSBhd2FpdCB1cGxvYWRGb3JNb2JpbGUoKTtcbiAgICAgIGNvbXBhbnlMb2dvVXBsb2FkZXIudmFsdWUudXBsb2FkKCk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XG4gICAgZWxzZSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXMuZGVza3RvcCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHVwZGF0ZVVzZXJJbkRiKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAkcS5ub3RpZnkoe1xuICAgICAgICAgICAgY29sb3I6ICdncmVlbi00JyxcbiAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIGljb246ICdjbG91ZF9kb25lJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5vay51cGRhdGUnKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGh5ZHJhdGVGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLnVwZGF0ZScpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB1cGRhdGVVc2VySW5TUUxpdGVEYigpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgJHEubm90aWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICAgICAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBoeWRyYXRlRm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JjZU1lc3NhZ2VJdGVtc1JlcmVuZGVyKCk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgICRxLm5vdGlmeSh7XG4gICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgIG1lc3NhZ2U6IHQoJ2Zvcm1zLmVycm9ycy5lcnJvci5pbnB1dHMnKVxuICAgIH0pO1xuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gaHlkcmF0ZUZvcm0oKSB7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBpZiAoIWltcG9ydC5tZXRhLmVudi5TU1Ipe1xuICAgICAgdXNlclN0b3JlLnJldHJpZXZlVXNlcih1c2VyU3RvcmUuZ2V0VXNlci51c2VySWQpXG4gICAgICAgIC50aGVuKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIC8vIGF3YWl0IHRyYW5zZm9ybU9iamVjdChyZXMpO1xuICAgICAgICAgIHVzZXJJZC52YWx1ZSA9IHJlcy51c2VySWQ7XG4gICAgICAgICAgZmlyc3ROYW1lLnZhbHVlID0gcmVzLmZpcnN0TmFtZTtcbiAgICAgICAgICBsYXN0TmFtZS52YWx1ZSA9IHJlcy5sYXN0TmFtZTtcbiAgICAgICAgICBsb2dpbi52YWx1ZSA9IHJlcy5sb2dpbjtcbiAgICAgICAgICBlbWFpbC52YWx1ZSA9IHJlcy5lbWFpbDtcbiAgICAgICAgICBwYXNzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICBjb21wYW55TmFtZS52YWx1ZSA9IHJlcy5jb21wYW55TmFtZTtcbiAgICAgICAgICBjb21wYW55TG9nby52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgY29tcGFueUxvZ29VUkwudmFsdWUgPSAhIXJlcy5jb21wYW55TG9nbyAmJiByZXMuY29tcGFueUxvZ28gIT0gJycgPyBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7cHJvY2Vzcy5lbnYuUFVCTElDX1BBVEh9L2Fzc2V0cy91cGxvYWRzLyR7cmVzLmNvbXBhbnlMb2dvfWAgOiBudWxsO1xuICAgICAgICAgIGRldmlzZS52YWx1ZSA9IHt2YWx1ZTogcmVzLmRldmlzZS5kZXZpc2VJZCwgbGFiZWw6IGAke3Jlcy5kZXZpc2Uuc3ltYm9sZX0gLSAke3Jlcy5kZXZpc2UubGliZWxsZX1gLCBjYW5ub3RTZWxlY3Q6IGZhbHNlLCBkZXZpc2VJZDogcmVzLmRldmlzZS5kZXZpc2VJZCwgbGliZWxsZTogcmVzLmRldmlzZS5saWJlbGxlLCBzeW1ib2xlOiByZXMuZGV2aXNlLnN5bWJvbGV9O1xuICAgICAgICAgIGlmICghIXJlcy51c2VyX3R5cGUpIHtcbiAgICAgICAgICAgIGxldCB1c2VyVHlwZUxhYmVsID0gcmVzLnVzZXJfdHlwZS5yZWd1bGFyICYmICFyZXMudXNlcl90eXBlLmFkbWluID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5yZWd1bGFyJykgOiAnJztcbiAgICAgICAgICAgIHVzZXJUeXBlTGFiZWwgPSByZXMudXNlcl90eXBlLmFkbWluICYmICFyZXMudXNlcl90eXBlLnJlZ3VsYXIgPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmFkbWluJykgOiB1c2VyVHlwZUxhYmVsO1xuICAgICAgICAgICAgdXNlclR5cGVMYWJlbCA9IHJlcy51c2VyX3R5cGUuYWRtaW4gJiYgcmVzLnVzZXJfdHlwZS5yZWd1bGFyID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5yZWd1bGFyJykrJywgJyt0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmFkbWluJykgOiB1c2VyVHlwZUxhYmVsO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlclR5cGVMYWJlbCk7XG4gICAgICAgICAgICB1c2VyVHlwZS52YWx1ZSA9IHt2YWx1ZTogcmVzLnVzZXJfdHlwZS51c2VyVHlwZUlkLCBsYWJlbDogdXNlclR5cGVMYWJlbCwgY2Fubm90U2VsZWN0OiBmYWxzZSwgdXNlclR5cGVJZDpyZXMudXNlcl90eXBlLnVzZXJUeXBlSWQsIHJlZ3VsYXI6IHJlcy51c2VyX3R5cGUucmVndWxhciwgYWRtaW46IHJlcy51c2VyX3R5cGUuYWRtaW59O1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF91c2VyJywge2VycjogZXJyfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGludm9pY2VTdG9yZS5nZXRBbGxEZXZpc2VzKClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICBzZWxlY3REZXZpc2VzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICAgICAgb2JqLnZhbHVlID0gMDtcbiAgICAgICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZGV2aXNlJyk7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgb2JqLmRldmlzZUlkID0gMDtcbiAgICAgICAgICBvYmouc3ltYm9sZSA9IG51bGw7XG4gICAgICAgICAgb2JqLmxpYmVsbGUgPSBudWxsO1xuICAgICAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLmRldmlzZUlkO1xuICAgICAgICAgICAgb2JqLmxhYmVsID0gYCR7cmVzW2tdLnN5bWJvbGV9IC0gJHtyZXNba10ubGliZWxsZX1gO1xuICAgICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqLmRldmlzZUlkID0gcmVzW2tdLmRldmlzZUlkO1xuICAgICAgICAgICAgb2JqLnN5bWJvbGUgPSByZXNba10uc3ltYm9sZTtcbiAgICAgICAgICAgIG9iai5saWJlbGxlID0gcmVzW2tdLmxpYmVsbGU7XG4gICAgICAgICAgICBzZWxlY3REZXZpc2VzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfZGV2aXNlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUuc2V0TWVzc2FnZXNWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5tZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdCgnaW52b2ljZXNDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF9kZXZpc2VzLmxpbmtlZF9lcnJvcicsIHtlcnI6IGVycn0pXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB1c2VyU3RvcmUuZ2V0VXNlclR5cGVzKClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICBzZWxlY3RVc2VyVHlwZXNPcHRpb24udmFsdWUgPSBbXTtcbiAgICAgICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgICAgIG9iai5sYWJlbCA9IHQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLnVzZXJUeXBlJyk7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgb2JqLnVzZXJUeXBlSWQgPSAwO1xuICAgICAgICAgIG9iai5yZWd1bGFyID0gbnVsbDtcbiAgICAgICAgICBvYmouYWRtaW4gPSBudWxsO1xuICAgICAgICAgIHNlbGVjdFVzZXJUeXBlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gcmVzW2tdLnJlZ3VsYXIgJiYgIXJlc1trXS5hZG1pbiA/IHQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMucmVndWxhcicpIDogJyc7XG4gICAgICAgICAgICBsYWJlbCA9IHJlc1trXS5hZG1pbiAmJiAhcmVzW2tdLnJlZ3VsYXIgPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmFkbWluJykgOiBsYWJlbDtcbiAgICAgICAgICAgIGxhYmVsID0gcmVzW2tdLmFkbWluICYmIHJlc1trXS5yZWd1bGFyID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5yZWd1bGFyJykrJywgJyt0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmFkbWluJykgOiBsYWJlbDtcbiAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLnVzZXJUeXBlSWQ7XG4gICAgICAgICAgICBvYmoubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIG9iai51c2VyVHlwZUlkID0gcmVzW2tdLnVzZXJUeXBlSWQ7XG4gICAgICAgICAgICBvYmoucmVndWxhciA9IHJlc1trXS5yZWd1bGFyO1xuICAgICAgICAgICAgb2JqLmFkbWluID0gcmVzW2tdLmFkbWluO1xuICAgICAgICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF91c2VyVHlwZXMubGlua2VkX2VtcHR5JylcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby5mZXRjaF91c2VyVHlwZXMubGlua2VkX2Vycm9yJywge2VycjogZXJyfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSAgICBcbiAgfSBcbiAgZWxzZSBpZihwbGF0Zm9ybS5pcy5tb2JpbGUpIHtcbiAgICBwcmVmcyA9ICEhcHJlZnMgPyBwcmVmcyA6IGF3YWl0IGltcG9ydCgnY2FwL3N0b3JhZ2UvcHJlZmVyZW5jZXMnKTtcbiAgICBjb25zdCB1c3JDb29raWUgPSBhd2FpdCBwcmVmcy5nZXRQcmVmKCd1c2VyJyk7XG4gICAgbGV0IHVzZXIgPSB1c3JDb29raWUudXNlcjtcbiAgICB1c2VySWQudmFsdWUgPSB1c2VyLnVzZXJJZDtcbiAgICBmaXJzdE5hbWUudmFsdWUgPSB1c2VyLmZpcnN0TmFtZTtcbiAgICBsYXN0TmFtZS52YWx1ZSA9IHVzZXIubGFzdE5hbWU7XG4gICAgbG9naW4udmFsdWUgPSB1c2VyLmxvZ2luO1xuICAgIGVtYWlsLnZhbHVlID0gdXNlci5lbWFpbDtcbiAgICBwYXNzLnZhbHVlID0gbnVsbDtcbiAgICBjb21wYW55TmFtZS52YWx1ZSA9IHVzZXIuY29tcGFueU5hbWU7XG4gICAgY29tcGFueUxvZ28udmFsdWUgPSBudWxsO1xuICAgIGNvbXBhbnlMb2dvVVJMLnZhbHVlID0gISF1c2VyLmNvbXBhbnlMb2dvICYmIHVzZXIuY29tcGFueUxvZ28gIT0gJycgPyBgYXNzZXRzL3VwbG9hZHMvJHt1c2VyLmNvbXBhbnlMb2dvfWAgOiBudWxsO1xuICAgIGRldmlzZS52YWx1ZSA9IHt2YWx1ZTogdXNlci5kZXZpc2UuZGV2aXNlSWQsIGxhYmVsOiBgJHt1c2VyLmRldmlzZS5zeW1ib2xlfSAtICR7dXNlci5kZXZpc2UubGliZWxsZX1gLCBjYW5ub3RTZWxlY3Q6IGZhbHNlLCBkZXZpc2VJZDogdXNlci5kZXZpc2UuZGV2aXNlSWQsIGxpYmVsbGU6IHVzZXIuZGV2aXNlLmxpYmVsbGUsIHN5bWJvbGU6IHVzZXIuZGV2aXNlLnN5bWJvbGV9O1xuICAgIGxldCB1c2VyVHlwZUxhYmVsID0gbnVsbDtcbiAgICBpZiAoISF1c2VyLnVzZXJfdHlwZSkge1xuICAgICAgIHVzZXJUeXBlTGFiZWwgPSB1c2VyLnVzZXJfdHlwZS5yZWd1bGFyICYmICF1c2VyLnVzZXJfdHlwZS5hZG1pbiA/IHQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMucmVndWxhcicpIDogJyc7XG4gICAgICB1c2VyVHlwZUxhYmVsID0gdXNlci51c2VyX3R5cGUuYWRtaW4gJiYgIXVzZXIudXNlcl90eXBlLnJlZ3VsYXIgPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLmFkbWluJykgOiB1c2VyVHlwZUxhYmVsO1xuICAgICAgdXNlclR5cGVMYWJlbCA9IHVzZXIudXNlcl90eXBlLmFkbWluICYmIHVzZXIudXNlcl90eXBlLnJlZ3VsYXIgPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLnJlZ3VsYXInKSsnLCAnK3QoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMuYWRtaW4nKSA6IHVzZXJUeXBlTGFiZWw7XG4gICAgICAvLyBjb25zb2xlLmxvZyh1c2VyVHlwZUxhYmVsKTtcbiAgICAgIHVzZXJUeXBlLnZhbHVlID0ge3ZhbHVlOiB1c2VyLnVzZXJfdHlwZS51c2VyVHlwZUlkLCBsYWJlbDogdXNlclR5cGVMYWJlbCwgY2Fubm90U2VsZWN0OiBmYWxzZSwgdXNlclR5cGVJZDp1c2VyLnVzZXJfdHlwZS51c2VyVHlwZUlkLCByZWd1bGFyOiB1c2VyLnVzZXJfdHlwZS5yZWd1bGFyLCBhZG1pbjogdXNlci51c2VyX3R5cGUuYWRtaW59O1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9wcy5kYkNvbm4pO1xuICAgIGxldCBpc09wZW4gPSBhd2FpdCBpc0RiQ29ubmVjdGlvbk9wZW4ocHJvcHMuZGJDb25uKTtcbiAgICBpc09wZW4gPSAhaXNPcGVuIHx8ICEhaXNPcGVuID8gYXdhaXQgb3BlbkRiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pIDogaXNPcGVuO1xuICAgIGlmIChpc09wZW4pIHtcblxuICAgICAgbGV0IHNxbCA9ICdTRUxFQ1QgXFxgZGV2aXNlXFxgLlxcYGRldmlzZUlkXFxgLCBcXGBkZXZpc2VcXGAuXFxgc3ltYm9sZVxcYCwgXFxgZGV2aXNlXFxgLlxcYGxpYmVsbGVcXGAgRlJPTSBcXGBkZXZpc2VcXGA7JztcbiAgICAgIGxldCB2YWx1ZXMgPSBhd2FpdCBuZXdRdWVyeShwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgaWYgKHZhbHVlcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHZhbHVlcy52YWx1ZXM7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZSA9IFtdO1xuICAgICAgICBvYmoudmFsdWUgPSAwO1xuICAgICAgICBvYmoubGFiZWwgPSB0KCdpbnZvaWNlc0NvbXBvbmVudC5wbGFjZWhvbGRlcnMuZGV2aXNlJyk7XG4gICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgICBvYmouZGV2aXNlSWQgPSAwO1xuICAgICAgICBvYmouc3ltYm9sZSA9IG51bGw7XG4gICAgICAgIG9iai5saWJlbGxlID0gbnVsbDtcbiAgICAgICAgc2VsZWN0RGV2aXNlc09wdGlvbi52YWx1ZS5wdXNoKG9iaik7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiByZXMpIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICBvYmoudmFsdWUgPSByZXNba10uZGV2aXNlSWQ7XG4gICAgICAgICAgb2JqLmxhYmVsID0gYCR7cmVzW2tdLnN5bWJvbGV9IC0gJHtyZXNba10ubGliZWxsZX1gO1xuICAgICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICBvYmouZGV2aXNlSWQgPSByZXNba10uZGV2aXNlSWQ7XG4gICAgICAgICAgb2JqLnN5bWJvbGUgPSByZXNba10uc3ltYm9sZTtcbiAgICAgICAgICBvYmoubGliZWxsZSA9IHJlc1trXS5saWJlbGxlO1xuICAgICAgICAgIHNlbGVjdERldmlzZXNPcHRpb24udmFsdWUucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghIXZhbHVlcyA9PT0gZmFsc2Upe1xuICAgICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgICAgICBjb250ZW50OiB0KCdpbnZvaWNlc0NvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX2RldmlzZXMubGlua2VkX2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ2ludm9pY2VzQ29tcG9uZW50LnJlc3VsdHMua28uZmV0Y2hfZGV2aXNlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNxbCA9ICdTRUxFQ1QgXFxgdXNlcl90eXBlXFxgLlxcYHVzZXJUeXBlSWRcXGAsIFxcYHVzZXJfdHlwZVxcYC5cXGByZWd1bGFyXFxgLCBcXGB1c2VyX3R5cGVcXGAuXFxgYWRtaW5cXGAgRlJPTSBcXGB1c2VyX3R5cGVcXGA7JztcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNxbCk7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCBuZXdRdWVyeShwcm9wcy5kYkNvbm4sIHNxbCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgaWYgKHZhbHVlcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHZhbHVlcy52YWx1ZXM7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlID0gW107XG4gICAgICAgIG9iai52YWx1ZSA9IDA7XG4gICAgICAgIG9iai5sYWJlbCA9IHQoJ3Byb2ZpbGVDb21wb25lbnQucGxhY2Vob2xkZXJzLnVzZXJUeXBlJyk7XG4gICAgICAgIG9iai5jYW5ub3RTZWxlY3QgPSB0cnVlO1xuICAgICAgICBvYmoudXNlclR5cGVJZCA9IDA7XG4gICAgICAgIG9iai5yZWd1bGFyID0gbnVsbDtcbiAgICAgICAgb2JqLmFkbWluID0gbnVsbDtcbiAgICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHJlcykge1xuICAgICAgICAgIGxldCBsYWJlbCA9IHJlc1trXS5yZWd1bGFyICYmICFyZXNba10uYWRtaW4gPyB0KCdwcm9maWxlQ29tcG9uZW50LmxpYmVsbGVzLnR5cGVzLnJlZ3VsYXInKSA6ICcnO1xuICAgICAgICAgICAgbGFiZWwgPSByZXNba10uYWRtaW4gJiYgIXJlc1trXS5yZWd1bGFyID8gdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5hZG1pbicpIDogbGFiZWw7XG4gICAgICAgICAgICBsYWJlbCA9IHJlc1trXS5hZG1pbiAmJiByZXNba10ucmVndWxhciA/IHQoJ3Byb2ZpbGVDb21wb25lbnQubGliZWxsZXMudHlwZXMucmVndWxhcicpKycsICcrdCgncHJvZmlsZUNvbXBvbmVudC5saWJlbGxlcy50eXBlcy5hZG1pbicpIDogbGFiZWw7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqLnZhbHVlID0gcmVzW2tdLnVzZXJUeXBlSWQ7XG4gICAgICAgICAgb2JqLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgb2JqLmNhbm5vdFNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgIG9iai51c2VyVHlwZUlkID0gcmVzW2tdLnVzZXJUeXBlSWQ7XG4gICAgICAgICAgb2JqLnJlZ3VsYXIgPSByZXNba10ucmVndWxhcjtcbiAgICAgICAgICBvYmouYWRtaW4gPSByZXNba10uYWRtaW47XG4gICAgICAgICAgc2VsZWN0VXNlclR5cGVzT3B0aW9uLnZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoISF2YWx1ZXMgPT09IGZhbHNlKXtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3VzZXJUeXBlcy5saW5rZWRfZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLmtvLmZldGNoX3VzZXJUeXBlcy5saW5rZWRfZW1wdHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eS52YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiB0KCdmb3Jtcy5lcnJvcnMuZXJyb3Iuc3FsaXRlRGInKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgbWVzc2FnZVZpc2liaWxpdHk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VySW5EYigpIHtcbiAgY29uc3Qgb2JqID0ge1xuICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLnZhbHVlLFxuICAgIGxhc3ROYW1lOiBsYXN0TmFtZS52YWx1ZSxcbiAgICBsb2dpbjogbG9naW4udmFsdWUsXG4gICAgZW1haWw6IGVtYWlsLnZhbHVlLFxuICAgIHBhc3M6IHBhc3MudmFsdWUsXG4gICAgY29tcGFueU5hbWU6IGNvbXBhbnlOYW1lLnZhbHVlLFxuICAgIGNvbXBhbnlMb2dvOiAhIWNvbXBhbnlMb2dvLnZhbHVlID8gY29tcGFueUxvZ28udmFsdWUgOiBudWxsLFxuICAgIGRldmlzZUlkOiBkZXZpc2UudmFsdWUuZGV2aXNlSWQsXG4gICAgdXNlclR5cGVJZDogdXNlclR5cGUudmFsdWUudXNlclR5cGVJZCxcbiAgfTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIHJldHVybiB1c2VyQXhpb3NTZXJ2aWNlLnVwZGF0ZSh1c2VySWQudmFsdWUsIG9iailcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiBmYWxzZSxcbiAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpXG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VTdG9yZS5zZXRNZXNzYWdlc1Zpc2liaWxpdHkodHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywge2VycjogZXJyfSlcbiAgICAgIH0pO1xuICAgICAgbWVzc2FnZVZpc2liaWxpdHkudmFsdWUgPSB0cnVlO1xuICAgICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTsgXG59O1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckluU1FMaXRlRGIoKSB7XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZS52YWx1ZSxcbiAgICBsYXN0TmFtZTogbGFzdE5hbWUudmFsdWUsXG4gICAgbG9naW46IGxvZ2luLnZhbHVlLFxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICBwYXNzOiBwYXNzLnZhbHVlLFxuICAgIGNvbXBhbnlOYW1lOiBjb21wYW55TmFtZS52YWx1ZSxcbiAgICBjb21wYW55TG9nbzogISFjb21wYW55TG9nby52YWx1ZSA/IGNvbXBhbnlMb2dvLnZhbHVlLm5hbWUgOiBudWxsLFxuICAgIGRldmlzZUlkOiBkZXZpc2UudmFsdWUuZGV2aXNlSWQsXG4gICAgdXNlclR5cGVJZDogdXNlclR5cGUudmFsdWUudXNlclR5cGVJZCxcbiAgfTtcbiAgLy8gY29uc29sZS5sb2codXNlcklkLnZhbHVlKTtcbiAgLy8gY29uc29sZS5sb2cob2JqKTtcbiAgYXdhaXQgdHJhbnNmb3JtT2JqZWN0KG9iaik7XG4gIGxldCBpc09wZW4gPSAgYXdhaXQgaXNEYkNvbm5lY3Rpb25PcGVuKHByb3BzLmRiQ29ubik7XG4gIGlzT3BlbiA9ICEhaXNPcGVuIHx8ICFpc09wZW4gPyBhd2FpdCBvcGVuRGJDb25uZWN0aW9uKHByb3BzLmRiQ29ubikgOiBpc09wZW47XG4gIGlmIChpc09wZW4pIHtcbiAgICBjb25zdCBzcWwgPSAnVVBEQVRFIFxcYHVzZXJcXGAgU0VUIFxcYGZpcnN0TmFtZVxcYD0/LCBcXGBsYXN0TmFtZVxcYD0/LCBcXGBsb2dpblxcYD0/LCBcXGBlbWFpbFxcYD0/LCBcXGBwYXNzXFxgPT8sIFxcYGNvbXBhbnlOYW1lXFxgPT8sIFxcYGNvbXBhbnlMb2dvXFxgPT8sIFxcYGRldmlzZUlkXFxgPT8sIFxcYHVzZXJUeXBlSWRcXGA9PyBXSEVSRSBcXGB1c2VySWRcXGA9PzsnO1xuXG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgbmV3UnVuKHByb3BzLmRiQ29ubiwgc3FsLCBbb2JqLmZpcnN0TmFtZSwgb2JqLmxhc3ROYW1lLCBvYmoubG9naW4sIG9iai5lbWFpbCwgb2JqLnBhc3MsIG9iai5jb21wYW55TmFtZSwgb2JqLmNvbXBhbnlMb2dvLCBvYmouZGV2aXNlSWQsIG9iai51c2VyVHlwZUlkLCB1c2VySWQudmFsdWVdKTtcbiAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgaWYgKCEhdmFsdWVzICYmIHZhbHVlcy5jaGFuZ2VzLmNoYW5nZXMpIHtcbiAgICAgIGF3YWl0IHByZWZzLnNldFByZWYoJ21lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2V2ZXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudDogdCgncHJvZmlsZUNvbXBvbmVudC5yZXN1bHRzLm9rLnVwZGF0ZScpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtZXNzYWdlVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdXNyQ29va2llID0gYXdhaXQgcHJlZnMuZ2V0UHJlZigndXNlcicpO1xuICAgICAgdXNyQ29va2llLnVzZXIuZmlyc3ROYW1lID0gZmlyc3ROYW1lLnZhbHVlO1xuICAgICAgdXNyQ29va2llLnVzZXIubGFzdE5hbWUgPSBsYXN0TmFtZS52YWx1ZTtcbiAgICAgIHVzckNvb2tpZS51c2VyLmxvZ2luID0gbG9naW4udmFsdWU7XG4gICAgICB1c3JDb29raWUudXNlci5lbWFpbCA9IGVtYWlsLnZhbHVlO1xuICAgICAgdXNyQ29va2llLnVzZXIucGFzcyA9IG51bGw7XG4gICAgICB1c3JDb29raWUudXNlci5jb21wYW55TmFtZSA9IGNvbXBhbnlOYW1lLnZhbHVlO1xuICAgICAgdXNyQ29va2llLnVzZXIuY29tcGFueUxvZ28gPSAhIWNvbXBhbnlMb2dvLnZhbHVlID8gY29tcGFueUxvZ28udmFsdWUgOiBudWxsO1xuICAgICAgdXNyQ29va2llLnVzZXIuZGV2aXNlID0gZGV2aXNlLnZhbHVlO1xuICAgICAgdXNyQ29va2llLnVzZXIudXNlcl90eXBlID0gdXNlclR5cGUudmFsdWU7XG4gICAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCd1c2VyJywgdXNyQ29va2llKTtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnLCB7ZXJyOiAnVXBkYXRlIHVzZXIgaW4gU1FMaXRlIERCICEnfSlcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICBjbG9zZURiQ29ubmVjdGlvbihwcm9wcy5kYkNvbm4pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgYXdhaXQgcHJlZnMuc2V0UHJlZignbWVzc2FnZScsIHtcbiAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28udXBkYXRlJywgeyBlcnI6ICdVbmFibGUgdG8gb3BlbiBTUUxpdGUgREIgIScgfSlcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgIH0pO1xuICAgIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5mdW5jdGlvbiBvbkludmFsaWRDb21wYW55TG9nbyhlbnRyaWVzKSB7XG4gIC8vIGNvbnNvbGUubG9nKGVudHJpZXMpO1xuICBmb3IgKGNvbnN0IGsgaW4gZW50cmllcyl7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBlbnRyaWVzW2tdLmZpbGUubmFtZTtcbiAgICBjb25zdCBmaWxlc2l6ZSA9IGVudHJpZXNba10uZmlsZS5zaXplO1xuICAgIGNvbnN0IGV4dCA9IGZpbGVuYW1lLmxhc3RJbmRleE9mKCcuJykgIT09IC0xIFxuICAgICAgPyBmaWxlbmFtZS5zbGljZShmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpKSBcbiAgICAgIDogZmlsZW5hbWU7XG4gICAgaWYgKGVudHJpZXNba10uZmFpbGVkUHJvcFZhbGlkYXRpb24gPT09ICdhY2NlcHQnKXtcbiAgICAgICRxLm5vdGlmeSh7XG4gICAgICAgIGNvbG9yOiAncmVkLTUnLFxuICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgbWVzc2FnZTogdCgncHJvZmlsZUNvbXBvbmVudC5lcnJvcnMuZXJyb3IuY29tcGFueUxvZ28uYWNjZXB0Jywge2V4dDogZXh0fSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmKGVudHJpZXNba10uZmFpbGVkUHJvcFZhbGlkYXRpb24gPT09ICdtYXgtZmlsZS1zaXplJyl7XG4gICAgICAkcS5ub3RpZnkoe1xuICAgICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQuZXJyb3JzLmVycm9yLmNvbXBhbnlMb2dvLm1heEZpbGVTaXplJywge21heDogbWF4U2l6ZSwgc2l6ZTogZmlsZXNpemV9KVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gb25GYWlsZWRDb21wYW55TG9nb1VwbG9hZCh7eGhyfSkge1xuICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG4gIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICRxLm5vdGlmeSh7XG4gICAgY29sb3I6ICdyZWQtNScsXG4gICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgIGljb246ICd3YXJuaW5nJyxcbiAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMua28udXBsb2FkJywge2VycjogJ1JlcXVlc3QgaGFuZGxpbmcgZmFpbGVkICEnfSlcbiAgfSk7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICBtZXNzYWdlU3RvcmUubWVzc2FnZXMucHVzaCh7XG4gICAgICBzZXZlcml0eTogdHJ1ZSxcbiAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGxvYWQnLCB7ZXJyOiBgUmVxdWVzdCBoYW5kbGluZyBmYWlsZWQgKCR7cmVzLm1lc3NhZ2V9KSAhYH0pXG4gICAgfSk7XG4gICAgbWVzc2FnZVN0b3JlLnNldE1lc3NhZ2VzVmlzaWJpbGl0eSh0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICBhd2FpdCBwcmVmcy5zZXRQcmVmKCdtZXNzYWdlJywge1xuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNldmVyaXR5OiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGxvYWQnLCB7IGVycjogYFJlcXVlc3QgaGFuZGxpbmcgZmFpbGVkICgke3Jlcy5tZXNzYWdlfSkgIWAgfSlcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIG1lc3NhZ2VWaXNpYmlsaXR5OiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIG1lc3NhZ2VWaXNpYmlsaXR5LnZhbHVlID0gdHJ1ZTtcbiAgZm9yY2VNZXNzYWdlSXRlbXNSZXJlbmRlcigpO1xuICBjb21wYW55TG9nb1VwbG9hZGVyLnZhbHVlLiRlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicsIGlubGluZTogJ25lYXJlc3QnfSk7XG59O1xuYXN5bmMgZnVuY3Rpb24gb25GaWxlVXBsb2FkZWQoe3hocn0pe1xuICBjb25zdCB4aHJSZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG4gIGxldCByZXMgPSBmYWxzZTtcbiAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgY29tcGFueUxvZ28udmFsdWUgPSB4aHJSZXMuZmlsZW5hbWU7XG4gIGlmIChwbGF0Zm9ybS5pcy5kZXNrdG9wKXtcbiAgICByZXMgPSBhd2FpdCB1cGRhdGVVc2VySW5EYigpO1xuICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzID0gYXdhaXQgdXBkYXRlVXNlckluU1FMaXRlRGIoKTtcbiAgfVxuICBpZiAocmVzKSB7XG4gICAgJHEubm90aWZ5KHtcbiAgICAgIGNvbG9yOiAnZ3JlZW4tNCcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBpY29uOiAnY2xvdWRfZG9uZScsXG4gICAgICBtZXNzYWdlOiB0KCdwcm9maWxlQ29tcG9uZW50LnJlc3VsdHMub2sudXBkYXRlJylcbiAgICB9KTtcbiAgICAvLyBoeWRyYXRlRm9ybSgpO1xuICB9XG4gIGVsc2Uge1xuICAgICRxLm5vdGlmeSh7XG4gICAgICBjb2xvcjogJ3JlZC01JyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgIG1lc3NhZ2U6IHQoJ3Byb2ZpbGVDb21wb25lbnQucmVzdWx0cy5rby51cGRhdGUnKVxuICAgIH0pO1xuICB9XG4gIGZvcmNlTWVzc2FnZUl0ZW1zUmVyZW5kZXIoKTtcbn07XG5mdW5jdGlvbiBmYWN0b3J5Rm4oKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGZpbGVzKTtcbiAgICByZXNvbHZlKHtcbiAgICAgIHVybDogYCR7b3JpZ2lufSR7cHJvY2Vzcy5lbnYuUE9SVF9TU1J9JHtwcm9jZXNzLmVudi5QVUJMSUNfUEFUSH0vYXBpL3VzZXJzL3VwbG9hZGAsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIC8vICdmaWVsZC1uYW1lJzogJ2ZpbGUnLFxuICAgICAgLy8gaGVhZGVyczogW1xuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbmFtZTogJ0NvbnRlbnQtVHlwZScsXG4gICAgICAvLyAgICAgdmFsdWU6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgLy8gICB9XG4gICAgICAvLyBdXG4gICAgfSk7XG4gIH0pO1xufTtcbmZ1bmN0aW9uIGFkZGVkRmlsZShmaWxlcykge1xuICAvLyBjb25zb2xlLmxvZyhmaWxlcyk7XG4gIC8vIGNvbnNvbGUubG9nKGNvbXBhbnlMb2dvVXBsb2FkZXIudmFsdWUpO1xuICBpZiAoISFmaWxlcyAmJiBmaWxlcy5sZW5ndGgpIHtcbiAgICBjb21wYW55TG9nb1VSTC52YWx1ZSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbMF0pO1xuICAgIGNvbXBhbnlMb2dvLnZhbHVlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1swXSk7XG4gIH1cbiAgLy8gZWxzZSB7XG4gIC8vICAgY29tcGFueUxvZ29VUkwudmFsdWUgPSBudWxsO1xuICAvLyB9XG59O1xuZnVuY3Rpb24gcmVtb3ZlZEZpbGUoKSB7XG4gIGNvbXBhbnlMb2dvVVJMLnZhbHVlID0gbnVsbDtcbiAgY29tcGFueUxvZ28udmFsdWUgPSBudWxsO1xufTtcbmZ1bmN0aW9uIGhhbmRsZU9yaWVudGF0aW9uKCl7XG4gIC8vIGNvbnNvbGUubG9nKHNjcmVlbi5vcmllbnRhdGlvbik7XG4gIG9yaWVudGF0aW9uLnZhbHVlID0gc2NyZWVuLm9yaWVudGF0aW9uLnR5cGU7XG59O1xuLy8gZnVuY3Rpb24gdXBsb2FkKCkge1xuLy8gICByZXR1cm4gdXBsb2FkSW1hZ2VBeGlvc1NlcnZpY2Vcbi8vICAgICAudXBsb2FkKGNvbXBhbnlMb2dvLnZhbHVlLCAoZXZlbnQpID0+IHtcbi8vICAgICAgIHByb2dyZXNzLnZhbGUgPSBNYXRoLnJvdW5kKCgxMDAgKiBldmVudC5sb2FkZWQpIC8gZXZlbnQudG90YWwpO1xuLy8gICAgIH0pO1xuLy8gfTtcbi8vIGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEZvck1vYmlsZShmaWxlUGF0aDogc3RyaW5nKTogSHR0cFVwbG9hZEZpbGVSZXN1bHQge1xuLy8gICBsZXQgcmV0ID0gZmFsc2U7XG4vLyAgIGxldCByZXM6IEh0dHBVcGxvYWRGaWxlUmVzdWx0ID0gbnVsbDtcbi8vICAgY29uc3Qgb3B0aW9uczogSHR0cFVwbG9hZEZpbGVPcHRpb25zID0ge1xuLy8gICAgIG5hbWU6ICdmaWxlJyxcbi8vICAgICB1cmw6IGAke29yaWdpbn0ke3Byb2Nlc3MuZW52LlBPUlRfU1NSfSR7cHJvY2Vzcy5lbnYuUFVCTElDX1BBVEh9L2FwaS91c2Vycy91cGxvYWRgLFxuLy8gICAgIC8vIHVybDogYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn1gLFxuLy8gICAgIGZpbGVQYXRoOiBmaWxlUGF0aCxcbi8vICAgfTtcbi8vICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG4vLyAgIHJlcyA9IGF3YWl0IEh0dHAudXBsb2FkRmlsZShvcHRpb25zKTtcblxuLy8gICBpZihyZXMuc3RhdHVzICE9PSA1MDAgJiYgcmVzLnN0YXR1cyAhPT0gNDA0KXtcbi8vICAgICByZXQgPSB0cnVlO1xuLy8gICB9XG4vLyAgIGVsc2Uge1xuLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4vLyAgIH1cbi8vICAgcmV0dXJuIHJldDtcbi8vIH07XG4vLyBhc3luYyBmdW5jdGlvbiByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBSZWFkRmlsZVJlc3VsdHtcbi8vICAgbGV0IHJldDogUmVhZEZpbGVSZXN1bHQgPSBudWxsO1xuLy8gICBjb25zdCBvcHRpb25zOiBSZWFkRmlsZU9wdGlvbnMgPSB7XG4vLyAgICAgcGF0aDogcGF0aFxuLy8gICB9O1xuLy8gICAvLyBjb25zb2xlLmxvZygnUmVhZGluZyBmaWxlcGF0aCAtLT4gJytvcHRpb25zLnBhdGgpO1xuLy8gICByZXQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRGaWxlKG9wdGlvbnMpO1xuLy8gICByZXR1cm4gcmV0O1xuLy8gfTtcbi8vIGFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkRm9yTW9iaWxlKGRlc3Q6IHN0cmluZywgcGF0aD86IHN0cmluZyA9ICcnLCBkYXRhPzogYW55ID0gdW5kZWZpbmVkKTogSHR0cERvd25sb2FkRmlsZVJlc3VsdCB7XG4vLyAgIGxldCByZXM6IEh0dHBEb3dubG9hZEZpbGVSZXN1bHQgPSBudWxsO1xuLy8gICBsZXQgb3B0aW9uczogSHR0cERvd25sb2FkRmlsZU9wdGlvbnMgPSBudWxsOyBcbi8vICAgaWYgKCEhZGF0YSl7XG4vLyAgICAgb3B0aW9ucyA9IHtcbi8vICAgICAgIGZpbGVQYXRoOiBgJHtkZXN0fWAsXG4vLyAgICAgICB1cmw6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt0KCdkb3dubG9hZExpbmtUYXJnZXQnKX0vYCxcbi8vICAgICAgIGRhdGE6IGRhdGEsXG4vLyAgICAgICAvLyBmaWxlRGlyZWN0b3J5OiBEaXJlY3RvcnkuRG9jdW1lbnRzLFxuLy8gICAgIH07XG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgb3B0aW9ucyA9IHtcbi8vICAgICAgIGZpbGVQYXRoOiBgJHtkZXN0fWAsXG4vLyAgICAgICB1cmw6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt0KCdkb3dubG9hZExpbmtUYXJnZXQnKX0vYCxcbi8vICAgICAgIC8vIGZpbGVEaXJlY3Rvcnk6IERpcmVjdG9yeS5Eb2N1bWVudHMsXG4vLyAgICAgfTsgXG4vLyAgIH1cbi8vICAgY29uc29sZS5sb2cob3B0aW9ucy51cmwpO1xuLy8gICByZXMgPSBhd2FpdCBIdHRwLmRvd25sb2FkRmlsZShvcHRpb25zKTtcbi8vICAgcmV0dXJuIHJlcztcbi8vIH07XG4vLyBhc3luYyBmdW5jdGlvbiBnZXRSZXF1ZXN0KHBhdGg6IHN0cmluZyk6IEh0dHBSZXNwb25zZSB7XG4vLyAgICAgbGV0IHJlczogSHR0cFJlc3BvbnNlID0gbnVsbDtcbi8vICAgICBjb25zdCBvcHRpb25zOiBIdHRwT3B0aW9ucyA9IHtcbi8vICAgICB1cmw6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59LyR7cGF0aH1gLFxuLy8gICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InLFxuLy8gICB9O1xuLy8gICByZXMgPSBhd2FpdCBIdHRwLmdldChvcHRpb25zKTtcbi8vICAgcmV0dXJuIHJlcztcbi8vIH07XG4vLyBhc3luYyBmdW5jdGlvbiByZWFkSW50ZXJuYWxEaXIocGF0aDogc3RyaW5nKSB7XG4vLyAgIGxldCByZXQ6IFJlYWRkaXJSZXN1bHQgPSBudWxsO1xuLy8gICBjb25zdCBvcHRpb25zOiBSZWFkZGlyT3B0aW9ucz0gIHtcbi8vICAgICBwYXRoOiBwYXRoLFxuLy8gICB9O1xuXG4vLyAgIHJldCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcihvcHRpb25zKTtcbi8vICAgcmV0dXJuIHJldDtcbi8vIH07XG4vLyBhc3luYyBmdW5jdGlvbiBnZXRGaWxlVXJpKHBhdGg6IHN0cmluZywgd2l0aEZ1bGxQYXRoPzogYm9vbGVhbiA9IHRydWUpOiBHZXRVcmlSZXN1bHR7XG4vLyAgIGxldCByZXQ6IEdldFVyaVJlc3VsdCA9IG51bGw7XG4vLyAgIGxldCBvcHRpb25zOiBHZXRVcmlPcHRpb25zID0gbnVsbDtcbi8vICAgaWYgKHdpdGhGdWxsUGF0aCl7XG4vLyAgICAgb3B0aW9ucyA9IHtcbi8vICAgICAgIHBhdGg6IGAke3BhdGh9YFxuLy8gICAgIH07XG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgb3B0aW9ucyA9IHtcbi8vICAgICAgIHBhdGg6IGAke3BhdGh9YCxcbi8vICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRvY3VtZW50cyxcbi8vICAgICB9O1xuLy8gICB9XG5cbi8vICAgcmV0ID0gYXdhaXQgRmlsZXN5c3RlbS5nZXRVcmkob3B0aW9ucyk7XG4vLyAgIHJldHVybiByZXQ7XG4vLyB9O1xuLy8gaW50ZXJmYWNlIEh0dHBPcHRpb25zIHtcbi8vICAgdXJsOiBzdHJpbmc7XG4vLyAgIGNvbm5lY3RUaW1lb3V0PzogbnVtYmVyOyAvLyBIb3cgbG9uZyB0byB3YWl0IGZvciB0aGUgaW5pdGlhbCBjb25uZWN0aW9uLlxuLy8gICBkYXRhPzogYW55O1xuLy8gICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4vLyAgIG1ldGhvZD86IHN0cmluZztcbi8vICAgcGFyYW1zPzogSHR0cFBhcmFtcztcbi8vICAgcmVhZFRpbWVvdXQ/OiBudW1iZXI7IC8vICBIb3cgbG9uZyB0byB3YWl0IHRvIHJlYWQgYWRkaXRpb25hbCBkYXRhLiBSZXNldHMgZWFjaCB0aW1lIG5ldyBkYXRhIGlzIHJlY2VpdmVkXG4vLyAgIHJlc3BvbnNlVHlwZT86IEh0dHBSZXNwb25zZVR5cGU7IC8vIFRoaXMgaXMgdXNlZCB0byBwYXJzZSB0aGUgcmVzcG9uc2UgYXBwcm9wcmlhdGVseSBiZWZvcmUgcmV0dXJuaW5nIGl0IHRvIHRoZSByZXF1ZXN0ZWUuIElmIHRoZSByZXNwb25zZSBjb250ZW50LXR5cGUgaXMgXCJqc29uXCIsIHRoaXMgdmFsdWUgaXMgaWdub3JlZC5cbi8vICAgc2hvdWxkRW5jb2RlVXJsUGFyYW1zPzogYm9vbGVhbjsgLy8gVXNlIHRoaXMgb3B0aW9uIGlmIHlvdSBuZWVkIHRvIGtlZXAgdGhlIFVSTCB1bmVuY29kZWQgaW4gY2VydGFpbiBjYXNlcyAoYWxyZWFkeSBlbmNvZGVkLCBhenVyZS9maXJlYmFzZSB0ZXN0aW5nLCBldGMuKS4gVGhlIGRlZmF1bHQgaXMgdHJ1ZS5cbi8vICAgd2ViRmV0Y2hFeHRyYT86IFJlcXVlc3RJbml0OyAvLyBFeHRyYSBhcmd1bWVudHMgZm9yIGZldGNoIHdoZW4gcnVubmluZyBvbiB0aGUgd2ViXG4vLyB9O1xuLy8gaW50ZXJmYWNlIEh0dHBSZXNwb25zZSB7XG4vLyAgIGRhdGE6IGFueTtcbi8vICAgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4vLyAgIHN0YXR1czogbnVtYmVyO1xuLy8gICB1cmw6IHN0cmluZztcbi8vIH07XG4vLyBpbnRlcmZhY2UgSHR0cERvd25sb2FkRmlsZU9wdGlvbnMge1xuLy8gICBmaWxlUGF0aDogc3RyaW5nOyAvLyAgVGhlIHBhdGggdGhlIGRvd25sb2FkZWQgZmlsZSBzaG91bGQgYmUgbW92ZWQgdG9cbi8vICAgdXJsOiBzdHJpbmc7XG4vLyAgIGNvbm5lY3RUaW1lb3V0PzogbnVtYmVyOyAvLyBIb3cgbG9uZyB0byB3YWl0IGZvciB0aGUgaW5pdGlhbCBjb25uZWN0aW9uLlxuLy8gICBkYXRhPzogYW55O1xuLy8gICBmaWxlRGlyZWN0b3J5PzogRGlyZWN0b3J5OyAvLyBPcHRpb25hbGx5LCB0aGUgZGlyZWN0b3J5IHRvIHB1dCB0aGUgZmlsZSBpbi4gSWYgdGhpcyBvcHRpb24gaXMgdXNlZCwgZmlsZVBhdGggY2FuIGJlIGEgcmVsYXRpdmUgcGF0aCByYXRoZXIgdGhhbiBhYnNvbHV0ZVxuLy8gICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4vLyAgIG1ldGhvZD86IHN0cmluZztcbi8vICAgcGFyYW1zPzogSHR0cFBhcmFtcztcbi8vICAgcmVhZFRpbWVvdXQ/OiBudW1iZXI7IC8vICBIb3cgbG9uZyB0byB3YWl0IHRvIHJlYWQgYWRkaXRpb25hbCBkYXRhLiBSZXNldHMgZWFjaCB0aW1lIG5ldyBkYXRhIGlzIHJlY2VpdmVkXG4vLyAgIHJlc3BvbnNlVHlwZT86IEh0dHBSZXNwb25zZVR5cGU7IC8vIFRoaXMgaXMgdXNlZCB0byBwYXJzZSB0aGUgcmVzcG9uc2UgYXBwcm9wcmlhdGVseSBiZWZvcmUgcmV0dXJuaW5nIGl0IHRvIHRoZSByZXF1ZXN0ZWUuIElmIHRoZSByZXNwb25zZSBjb250ZW50LXR5cGUgaXMgXCJqc29uXCIsIHRoaXMgdmFsdWUgaXMgaWdub3JlZC5cbi8vICAgc2hvdWxkRW5jb2RlVXJsUGFyYW1zPzogYm9vbGVhbjsgLy8gVXNlIHRoaXMgb3B0aW9uIGlmIHlvdSBuZWVkIHRvIGtlZXAgdGhlIFVSTCB1bmVuY29kZWQgaW4gY2VydGFpbiBjYXNlcyAoYWxyZWFkeSBlbmNvZGVkLCBhenVyZS9maXJlYmFzZSB0ZXN0aW5nLCBldGMuKS4gVGhlIGRlZmF1bHQgaXMgdHJ1ZS5cbi8vICAgd2ViRmV0Y2hFeHRyYT86IFJlcXVlc3RJbml0OyAvLyBFeHRyYSBhcmd1bWVudHMgZm9yIGZldGNoIHdoZW4gcnVubmluZyBvbiB0aGUgd2ViXG4vLyB9O1xuLy8gaW50ZXJmYWNlIEh0dHBEb3dubG9hZEZpbGVSZXN1bHQge1xuLy8gICBibG9iPzogQmxvYjtcbi8vICAgcGF0aD86IHN0cmluZztcbi8vIH07XG4vLyBpbnRlcmZhY2UgSHR0cFVwbG9hZEZpbGVPcHRpb25zIHtcbi8vICAgbmFtZTogc3RyaW5nOyAvLyAgVGhlIGZpZWxkIG5hbWUgdG8gdXBsb2FkIHRoZSBmaWxlIHdpdGhcbi8vICAgdXJsOiBzdHJpbmc7IC8vIFRoZSBVUkwgdG8gdXBsb2FkIHRoZSBmaWxlIHRvLlxuLy8gICBibG9iPzogQmxvYjsgLy8gRm9yIHVwbG9hZGluZyBhIGZpbGUgb24gdGhlIHdlYiwgYSBKUyBCbG9iIHRvIHVwbG9hZFxuLy8gICBjb25uZWN0VGltZW91dD86IG51bWJlcjsgLy8gSG93IGxvbmcgdG8gd2FpdCBmb3IgdGhlIGluaXRpYWwgY29ubmVjdGlvblxuLy8gICBkYXRhPzogYW55O1xuLy8gICBmaWxlRGlyZWN0b3J5PzogRGlyZWN0b3J5OyAvLyBPcHRpb25hbGx5LCB0aGUgZGlyZWN0b3J5IHRvIGxvb2sgZm9yIHRoZSBmaWxlIGluLiBJZiB0aGlzIG9wdGlvbiBpcyB1c2VkLCBmaWxlUGF0aCBjYW4gYmUgYSByZWFsdGl2ZSBwYXRoIHJhdGhlciB0aGFuIGFic29sdXRlXG4vLyAgIGZpbGVQYXRoPzogc3RyaW5nOyAvLyBGb3IgdXBsb2FkaW5nIGEgZmlsZSBuYXRpdmVseSwgdGhlIHBhdGggdG8gdGhlIGZpbGUgb24gZGlzayB0byB1cGxvYWRcbi8vICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuLy8gICBtZXRob2Q/OiBzdHJpbmc7XG4vLyAgIHBhcmFtcz86IEh0dHBQYXJhbXM7XG4vLyAgIHJlYWRUaW1lb3V0PzogbnVtYmVyOyAvLyAgSG93IGxvbmcgdG8gd2FpdCB0byByZWFkIGFkZGl0aW9uYWwgZGF0YS4gUmVzZXRzIGVhY2ggdGltZSBuZXcgZGF0YSBpcyByZWNlaXZlZFxuLy8gICByZXNwb25zZVR5cGU/OiBIdHRwUmVzcG9uc2VUeXBlOyAvLyBUaGlzIGlzIHVzZWQgdG8gcGFyc2UgdGhlIHJlc3BvbnNlIGFwcHJvcHJpYXRlbHkgYmVmb3JlIHJldHVybmluZyBpdCB0byB0aGUgcmVxdWVzdGVlLiBJZiB0aGUgcmVzcG9uc2UgY29udGVudC10eXBlIGlzICdqc29uJywgdGhpcyB2YWx1ZSBpcyBpbmdub3JlZFxuLy8gICBzaG91bGRFbmNvZGVVcmxQYXJhbXM/OiBib29sZWFuOyAvLyBVc2UgdGhpcyBvcHRpb24gaWYgeW91IG5lZWQgdG8ga2VlcCB0aGUgVVJMIHVuZW5jb2RlZCBpbiBjZXJ0YWluIGNhc2VzIChhbHJlYWR5IGVuY29kZWQsIGF6dXJlL2ZpcmViYXNlIHRlc3RpbmcsIGV0Yy4pLiBUaGUgZGVmYXVsdCBpcyB0cnVlXG4vLyAgIHdlYkZldGNoRXh0cmE/OiBSZXF1ZXN0SW5pdDsgLy8gRXh0cmEgYXJndW1lbnRzIGZvciBmZXRjaCB3aGVuIHJ1bm5pbmcgb24gdGhlIHdlYlxuLy8gfTtcbi8vIGludGVyZmFjZSBIdHRwVXBsb2FkRmlsZVJlc3VsdCB7XG4vLyAgIGRhdGE6IGFueTtcbi8vICAgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4vLyAgIHN0YXR1czogbnVtYmVyO1xuLy8gICB1cmw6IHN0cmluZztcbi8vIH07XG5cbi8vIFdBVENIRVJTXG4vLyB3YXRjaChcbi8vICAgY29tcGFueUxvZ28sXG4vLyAgIGFzeW5jIChuZXdDb21wYW55TG9nbykgPT4ge1xuLy8gICAgIC8vIGNvbnNvbGUubG9nKG5ld0NvbXBhbnlMb2dvKTtcbi8vICAgICBpZiAoISFuZXdDb21wYW55TG9nbykge1xuLy8gICAgICAgY29tcGFueUxvZ29VUkwudmFsdWUgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ld0NvbXBhbnlMb2dvKTtcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbXBhbnlMb2dvVVJMLnZhbHVlKTtcbi8vICAgICAgIC8vIGNvbnN0IHJlczEgPSBhd2FpdCBnZXRGaWxlVXJpKCdzbGlkZXItMi5qcGcnLCBmYWxzZSk7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMxKTtcbi8vICAgICAgIC8vIGNvbnN0IHJlczIgPSBhd2FpdCB1cGxvYWRGb3JNb2JpbGUocmVzMS51cmkpO1xuLy8gICAgICAgLy8gY29uc29sZS5sb2cocmVzMik7XG4vLyAgICAgfSBcbi8vICAgICBlbHNlIHtcbi8vICAgICAgIGNvbXBhbnlMb2dvVVJMLnZhbHVlID0gbnVsbDtcbi8vICAgICB9XG4vLyAgIH1cbi8vICk7XG5cbi8vIExJRkVDWUNMRSBFVkVOVFNcblxuLy8gT1RIRVJcblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCI+XG4gICAgPHByb2ZpbGUtY29tcG9uZW50XG4gICAgICA6ZGJDb25uPVwiZGJDb25uXCI+PC9wcm9maWxlLWNvbXBvbmVudD5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuLyplc2xpbnQgIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyczogJ29mZicqL1xuLy8gaW1wb3J0IHsgVG9kbywgTWV0YSB9IGZyb20gJ2NvbXBvbmVudHMvbW9kZWxzJztcbi8vIGltcG9ydCBFeGFtcGxlQ29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvRXhhbXBsZUNvbXBvbmVudC52dWUnO1xuaW1wb3J0IHsgb25Nb3VudGVkIH0gZnJvbSAndnVlJztcbmltcG9ydCBQcm9maWxlQ29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvUHJvZmlsZUNvbXBvbmVudC52dWUnO1xuaW1wb3J0IHsgU1FMaXRlREJDb25uZWN0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvc3FsaXRlJztcblxuLy8gVkFSSUFCTEVTXG5pbnRlcmZhY2UgUHJvZmlsZVBhZ2VQcm9wcyB7XG4gIGRiQ29ubj86IFNRTGl0ZURCQ29ubmVjdGlvbiB8IG51bGw7XG59O1xuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvZmlsZVBhZ2VQcm9wcz4oKSwge1xuICBkYkNvbm46IG51bGwsXG59KTtcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ2NoYW5nZS10YWInXSk7XG4vLyBjb25zb2xlLmxvZyhwcm9wcy5kYkNvbm4pO1xuLy8gTElGRUNZQ0xFIEVWRU5UU1xub25Nb3VudGVkKCgpID0+IHtcbiAgZW1pdCgnY2hhbmdlLXRhYicsICdwcm9maWxlJylcbn0pXG48L3NjcmlwdD5cbiJdLCJmaWxlIjoiYXNzZXRzL1Byb2ZpbGVQYWdlLmpzIn0=
