import { aS as useSizeProps, c as createComponent, aT as useSize, d as computed, h, aX as hMergeSlotSafely, U as between, g as getCurrentInstance, f as ref, s as stop, q as stopAndPrevent, J as client, aB as vmIsDestroyed, D as provide, w as watch, n as onBeforeUnmount, a_ as isRef, az as injectProp, aW as injectMultipleProps, ai as QSpinner, a$ as humanStorageSize, b0 as uploaderKey, Q as QIcon, j as QBtn, ag as isObject } from "./index.js";
import { b as useDarkProps, c as useDark } from "./QNoSsr.js";
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  rounded: Boolean,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
var QCircularProgress = createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props2, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props2);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props2.angle;
      return {
        transform: props2.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props2.instantFeedback !== true && props2.indeterminate !== true ? { transition: `stroke-dashoffset ${props2.animationSpeed}ms ease 0s, stroke ${props2.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props2.thickness / 2));
    const viewBoxAttr = computed(
      () => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`
    );
    const normalized = computed(() => between(props2.value, props2.min, props2.max));
    const strokeDashOffset = computed(() => circumference * (1 - (normalized.value - props2.min) / (props2.max - props2.min)));
    const strokeWidth = computed(() => props2.thickness / 2 * viewBox.value);
    function getCircle({ thickness, offset, color, cls, rounded }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        "stroke-linecap": rounded,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props2.centerColor !== void 0 && props2.centerColor !== "transparent" && svgChild.push(
        h("circle", {
          class: `q-circular-progress__center text-${props2.centerColor}`,
          fill: "currentColor",
          r: radius - strokeWidth.value / 2,
          cx: viewBox.value,
          cy: viewBox.value
        })
      );
      props2.trackColor !== void 0 && props2.trackColor !== "transparent" && svgChild.push(
        getCircle({
          cls: "track",
          thickness: strokeWidth.value,
          offset: 0,
          color: props2.trackColor
        })
      );
      svgChild.push(
        getCircle({
          cls: "circle",
          thickness: strokeWidth.value,
          offset: strokeDashOffset.value,
          color: props2.color,
          rounded: props2.rounded === true ? "round" : void 0
        })
      );
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props2.showValue === true && child.push(
        h("div", {
          class: "q-circular-progress__text absolute-full row flex-center content-center",
          style: { fontSize: props2.fontSize }
        }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)])
      );
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props2.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props2.min,
        "aria-valuemax": props2.max,
        "aria-valuenow": props2.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
function filterFiles(files, rejectedFiles, failedPropValidation, filterFn) {
  const acceptedFiles = [];
  files.forEach((file) => {
    if (filterFn(file) === true) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push({ failedPropValidation, file });
    }
  });
  return acceptedFiles;
}
function stopAndPreventDrag(e) {
  e && e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
  stopAndPrevent(e);
}
const useFileProps = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
};
const useFileEmits = ["rejected"];
function useFile({
  editable,
  dnd,
  getFileInput,
  addFilesToQueue
}) {
  const { props: props2, emit, proxy } = getCurrentInstance();
  const dndRef = ref(null);
  const extensions = computed(() => props2.accept !== void 0 ? props2.accept.split(",").map((ext) => {
    ext = ext.trim();
    if (ext === "*") {
      return "*/";
    } else if (ext.endsWith("/*")) {
      ext = ext.slice(0, ext.length - 1);
    }
    return ext.toUpperCase();
  }) : null);
  const maxFilesNumber = computed(() => parseInt(props2.maxFiles, 10));
  const maxTotalSizeNumber = computed(() => parseInt(props2.maxTotalSize, 10));
  function pickFiles(e) {
    if (editable.value) {
      if (e !== Object(e)) {
        e = { target: null };
      }
      if (e.target !== null && e.target.matches('input[type="file"]') === true) {
        e.clientX === 0 && e.clientY === 0 && stop(e);
      } else {
        const input = getFileInput();
        input && input !== e.target && input.click(e);
      }
    }
  }
  function addFiles(files) {
    if (editable.value && files) {
      addFilesToQueue(null, files);
    }
  }
  function processFiles(e, filesToProcess, currentFileList, append) {
    let files = Array.from(filesToProcess || e.target.files);
    const rejectedFiles = [];
    const done = () => {
      if (rejectedFiles.length > 0) {
        emit("rejected", rejectedFiles);
      }
    };
    if (props2.accept !== void 0 && extensions.value.indexOf("*/") === -1) {
      files = filterFiles(files, rejectedFiles, "accept", (file) => {
        return extensions.value.some((ext) => file.type.toUpperCase().startsWith(ext) || file.name.toUpperCase().endsWith(ext));
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props2.maxFileSize !== void 0) {
      const maxFileSize = parseInt(props2.maxFileSize, 10);
      files = filterFiles(files, rejectedFiles, "max-file-size", (file) => {
        return file.size <= maxFileSize;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props2.multiple !== true && files.length > 0) {
      files = [files[0]];
    }
    files.forEach((file) => {
      file.__key = file.webkitRelativePath + file.lastModified + file.name + file.size;
    });
    if (append === true) {
      const filenameMap = currentFileList.map((entry) => entry.__key);
      files = filterFiles(files, rejectedFiles, "duplicate", (file) => {
        return filenameMap.includes(file.__key) === false;
      });
    }
    if (files.length === 0) {
      return done();
    }
    if (props2.maxTotalSize !== void 0) {
      let size = append === true ? currentFileList.reduce((total, file) => total + file.size, 0) : 0;
      files = filterFiles(files, rejectedFiles, "max-total-size", (file) => {
        size += file.size;
        return size <= maxTotalSizeNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (typeof props2.filter === "function") {
      const filteredFiles = props2.filter(files);
      files = filterFiles(files, rejectedFiles, "filter", (file) => {
        return filteredFiles.includes(file);
      });
    }
    if (props2.maxFiles !== void 0) {
      let filesNumber = append === true ? currentFileList.length : 0;
      files = filterFiles(files, rejectedFiles, "max-files", () => {
        filesNumber++;
        return filesNumber <= maxFilesNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    done();
    if (files.length > 0) {
      return files;
    }
  }
  function onDragover(e) {
    stopAndPreventDrag(e);
    dnd.value !== true && (dnd.value = true);
  }
  function onDragleave(e) {
    stopAndPrevent(e);
    const gone = e.relatedTarget !== null || client.is.safari !== true ? e.relatedTarget !== dndRef.value : document.elementsFromPoint(e.clientX, e.clientY).includes(dndRef.value) === false;
    gone === true && (dnd.value = false);
  }
  function onDrop(e) {
    stopAndPreventDrag(e);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      addFilesToQueue(null, files);
    }
    dnd.value = false;
  }
  function getDndNode(type) {
    if (dnd.value === true) {
      return h("div", {
        ref: dndRef,
        class: `q-${type}__dnd absolute-full`,
        onDragenter: stopAndPreventDrag,
        onDragover: stopAndPreventDrag,
        onDragleave,
        onDrop
      });
    }
  }
  Object.assign(proxy, { pickFiles, addFiles });
  return {
    pickFiles,
    addFiles,
    onDragover,
    onDragleave,
    processFiles,
    getDndNode,
    maxFilesNumber,
    maxTotalSizeNumber
  };
}
function getProgressLabel(p) {
  return (p * 100).toFixed(2) + "%";
}
const coreProps = {
  ...useDarkProps,
  ...useFileProps,
  label: String,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  noThumbnails: Boolean,
  autoUpload: Boolean,
  hideUploadBtn: Boolean,
  disable: Boolean,
  readonly: Boolean
};
const coreEmits = [
  ...useFileEmits,
  "start",
  "finish",
  "added",
  "removed"
];
function getRenderer(getPlugin) {
  const vm = getCurrentInstance();
  const { props: props2, slots, emit, proxy } = vm;
  const { $q } = proxy;
  const isDark = useDark(props2, $q);
  function updateFileStatus(file, status, uploadedSize) {
    file.__status = status;
    if (status === "idle") {
      file.__uploaded = 0;
      file.__progress = 0;
      file.__sizeLabel = humanStorageSize(file.size);
      file.__progressLabel = "0.00%";
      return;
    }
    if (status === "failed") {
      proxy.$forceUpdate();
      return;
    }
    file.__uploaded = status === "uploaded" ? file.size : uploadedSize;
    file.__progress = status === "uploaded" ? 1 : Math.min(0.9999, file.__uploaded / file.size);
    file.__progressLabel = getProgressLabel(file.__progress);
    proxy.$forceUpdate();
  }
  const editable = computed(() => props2.disable !== true && props2.readonly !== true);
  const dnd = ref(false);
  const rootRef = ref(null);
  const inputRef = ref(null);
  const state = {
    files: ref([]),
    queuedFiles: ref([]),
    uploadedFiles: ref([]),
    uploadedSize: ref(0),
    updateFileStatus,
    isAlive: () => vmIsDestroyed(vm) === false
  };
  const {
    pickFiles,
    addFiles,
    onDragover,
    onDragleave,
    processFiles,
    getDndNode,
    maxFilesNumber,
    maxTotalSizeNumber
  } = useFile({ editable, dnd, getFileInput, addFilesToQueue });
  Object.assign(state, getPlugin({ props: props2, slots, emit, helpers: state }));
  if (state.isBusy === void 0) {
    state.isBusy = ref(false);
  }
  const uploadSize = ref(0);
  const uploadProgress = computed(() => uploadSize.value === 0 ? 0 : state.uploadedSize.value / uploadSize.value);
  const uploadProgressLabel = computed(() => getProgressLabel(uploadProgress.value));
  const uploadSizeLabel = computed(() => humanStorageSize(uploadSize.value));
  const canAddFiles = computed(
    () => editable.value === true && state.isUploading.value !== true && (props2.multiple === true || state.queuedFiles.value.length === 0) && (props2.maxFiles === void 0 || state.files.value.length < maxFilesNumber.value) && (props2.maxTotalSize === void 0 || uploadSize.value < maxTotalSizeNumber.value)
  );
  const canUpload = computed(
    () => editable.value === true && state.isBusy.value !== true && state.isUploading.value !== true && state.queuedFiles.value.length > 0
  );
  provide(uploaderKey, renderInput);
  const classes = computed(
    () => "q-uploader column no-wrap" + (isDark.value === true ? " q-uploader--dark q-dark" : "") + (props2.bordered === true ? " q-uploader--bordered" : "") + (props2.square === true ? " q-uploader--square no-border-radius" : "") + (props2.flat === true ? " q-uploader--flat no-shadow" : "") + (props2.disable === true ? " disabled q-uploader--disable" : "") + (dnd.value === true ? " q-uploader--dnd" : "")
  );
  const colorClass = computed(
    () => "q-uploader__header" + (props2.color !== void 0 ? ` bg-${props2.color}` : "") + (props2.textColor !== void 0 ? ` text-${props2.textColor}` : "")
  );
  watch(state.isUploading, (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
      emit("start");
    } else if (oldVal === true && newVal === false) {
      emit("finish");
    }
  });
  function reset() {
    if (props2.disable === false) {
      state.abort();
      state.uploadedSize.value = 0;
      uploadSize.value = 0;
      revokeImgURLs();
      state.files.value = [];
      state.queuedFiles.value = [];
      state.uploadedFiles.value = [];
    }
  }
  function removeUploadedFiles() {
    if (props2.disable === false) {
      batchRemoveFiles(["uploaded"], () => {
        state.uploadedFiles.value = [];
      });
    }
  }
  function removeQueuedFiles() {
    batchRemoveFiles(["idle", "failed"], ({ size }) => {
      uploadSize.value -= size;
      state.queuedFiles.value = [];
    });
  }
  function batchRemoveFiles(statusList, cb) {
    if (props2.disable === true) {
      return;
    }
    const removed = {
      files: [],
      size: 0
    };
    const localFiles = state.files.value.filter((f) => {
      if (statusList.indexOf(f.__status) === -1) {
        return true;
      }
      removed.size += f.size;
      removed.files.push(f);
      f.__img !== void 0 && window.URL.revokeObjectURL(f.__img.src);
      return false;
    });
    if (removed.files.length > 0) {
      state.files.value = localFiles;
      cb(removed);
      emit("removed", removed.files);
    }
  }
  function removeFile(file) {
    if (props2.disable) {
      return;
    }
    if (file.__status === "uploaded") {
      state.uploadedFiles.value = state.uploadedFiles.value.filter((f) => f.__key !== file.__key);
    } else if (file.__status === "uploading") {
      file.__abort();
    } else {
      uploadSize.value -= file.size;
    }
    state.files.value = state.files.value.filter((f) => {
      if (f.__key !== file.__key) {
        return true;
      }
      f.__img !== void 0 && window.URL.revokeObjectURL(f.__img.src);
      return false;
    });
    state.queuedFiles.value = state.queuedFiles.value.filter((f) => f.__key !== file.__key);
    emit("removed", [file]);
  }
  function revokeImgURLs() {
    state.files.value.forEach((f) => {
      f.__img !== void 0 && window.URL.revokeObjectURL(f.__img.src);
    });
  }
  function getFileInput() {
    return inputRef.value || rootRef.value.getElementsByClassName("q-uploader__input")[0];
  }
  function addFilesToQueue(e, fileList) {
    const localFiles = processFiles(e, fileList, state.files.value, true);
    const fileInput = getFileInput();
    if (fileInput !== void 0 && fileInput !== null) {
      fileInput.value = "";
    }
    if (localFiles === void 0) {
      return;
    }
    localFiles.forEach((file) => {
      state.updateFileStatus(file, "idle");
      uploadSize.value += file.size;
      if (props2.noThumbnails !== true && file.type.toUpperCase().startsWith("IMAGE")) {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        file.__img = img;
      }
    });
    state.files.value = state.files.value.concat(localFiles);
    state.queuedFiles.value = state.queuedFiles.value.concat(localFiles);
    emit("added", localFiles);
    props2.autoUpload === true && state.upload();
  }
  function upload() {
    canUpload.value === true && state.upload();
  }
  function getBtn(show, icon, fn) {
    if (show === true) {
      const data = {
        type: "a",
        key: icon,
        icon: $q.iconSet.uploader[icon],
        flat: true,
        dense: true
      };
      let child = void 0;
      if (icon === "add") {
        data.onClick = pickFiles;
        child = renderInput;
      } else {
        data.onClick = fn;
      }
      return h(QBtn, data, child);
    }
  }
  function renderInput() {
    return h("input", {
      ref: inputRef,
      class: "q-uploader__input overflow-hidden absolute-full",
      tabindex: -1,
      type: "file",
      title: "",
      accept: props2.accept,
      multiple: props2.multiple === true ? "multiple" : void 0,
      capture: props2.capture,
      onMousedown: stop,
      onClick: pickFiles,
      onChange: addFilesToQueue
    });
  }
  function getHeader() {
    if (slots.header !== void 0) {
      return slots.header(publicApi);
    }
    return [
      h("div", {
        class: "q-uploader__header-content column"
      }, [
        h("div", {
          class: "flex flex-center no-wrap q-gutter-xs"
        }, [
          getBtn(state.queuedFiles.value.length > 0, "removeQueue", removeQueuedFiles),
          getBtn(state.uploadedFiles.value.length > 0, "removeUploaded", removeUploadedFiles),
          state.isUploading.value === true ? h(QSpinner, { class: "q-uploader__spinner" }) : null,
          h("div", { class: "col column justify-center" }, [
            props2.label !== void 0 ? h("div", { class: "q-uploader__title" }, [props2.label]) : null,
            h("div", { class: "q-uploader__subtitle" }, [
              uploadSizeLabel.value + " / " + uploadProgressLabel.value
            ])
          ]),
          getBtn(canAddFiles.value, "add"),
          getBtn(props2.hideUploadBtn === false && canUpload.value === true, "upload", state.upload),
          getBtn(state.isUploading.value, "clear", state.abort)
        ])
      ])
    ];
  }
  function getList() {
    if (slots.list !== void 0) {
      return slots.list(publicApi);
    }
    return state.files.value.map((file) => h("div", {
      key: file.__key,
      class: "q-uploader__file relative-position" + (props2.noThumbnails !== true && file.__img !== void 0 ? " q-uploader__file--img" : "") + (file.__status === "failed" ? " q-uploader__file--failed" : file.__status === "uploaded" ? " q-uploader__file--uploaded" : ""),
      style: props2.noThumbnails !== true && file.__img !== void 0 ? { backgroundImage: 'url("' + file.__img.src + '")' } : null
    }, [
      h("div", {
        class: "q-uploader__file-header row flex-center no-wrap"
      }, [
        file.__status === "failed" ? h(QIcon, {
          class: "q-uploader__file-status",
          name: $q.iconSet.type.negative,
          color: "negative"
        }) : null,
        h("div", { class: "q-uploader__file-header-content col" }, [
          h("div", { class: "q-uploader__title" }, [file.name]),
          h("div", {
            class: "q-uploader__subtitle row items-center no-wrap"
          }, [
            file.__sizeLabel + " / " + file.__progressLabel
          ])
        ]),
        file.__status === "uploading" ? h(QCircularProgress, {
          value: file.__progress,
          min: 0,
          max: 1,
          indeterminate: file.__progress === 0
        }) : h(QBtn, {
          round: true,
          dense: true,
          flat: true,
          icon: $q.iconSet.uploader[file.__status === "uploaded" ? "done" : "clear"],
          onClick: () => {
            removeFile(file);
          }
        })
      ])
    ]));
  }
  onBeforeUnmount(() => {
    state.isUploading.value === true && state.abort();
    state.files.value.length > 0 && revokeImgURLs();
  });
  const publicApi = {};
  for (const key in state) {
    if (isRef(state[key]) === true) {
      injectProp(publicApi, key, () => state[key].value);
    } else {
      publicApi[key] = state[key];
    }
  }
  Object.assign(publicApi, {
    upload,
    reset,
    removeUploadedFiles,
    removeQueuedFiles,
    removeFile,
    pickFiles,
    addFiles
  });
  injectMultipleProps(publicApi, {
    canAddFiles: () => canAddFiles.value,
    canUpload: () => canUpload.value,
    uploadSizeLabel: () => uploadSizeLabel.value,
    uploadProgressLabel: () => uploadProgressLabel.value
  });
  Object.assign(proxy, publicApi);
  return () => {
    const children = [
      h("div", { class: colorClass.value }, getHeader()),
      h("div", { class: "q-uploader__list scroll" }, getList()),
      getDndNode("uploader")
    ];
    state.isBusy.value === true && children.push(
      h("div", {
        class: "q-uploader__overlay absolute-full flex flex-center"
      }, [h(QSpinner)])
    );
    const data = { ref: rootRef, class: classes.value };
    if (canAddFiles.value === true) {
      Object.assign(data, { onDragover, onDragleave });
    }
    return h("div", data, children);
  };
}
const trueFn = () => true;
function getEmitsObject(emitsArray) {
  const emitsObject = {};
  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });
  return emitsObject;
}
const coreEmitsObject = getEmitsObject(coreEmits);
var createUploaderComponent = ({ name, props: props2, emits: emits2, injectPlugin: injectPlugin2 }) => createComponent({
  name,
  props: {
    ...coreProps,
    ...props2
  },
  emits: isObject(emits2) === true ? { ...coreEmitsObject, ...emits2 } : [...coreEmits, ...emits2],
  setup() {
    return getRenderer(injectPlugin2);
  }
});
function getFn(prop) {
  return typeof prop === "function" ? prop : () => prop;
}
const props = {
  url: [Function, String],
  method: {
    type: [Function, String],
    default: "POST"
  },
  fieldName: {
    type: [Function, String],
    default: () => {
      return (file) => file.name;
    }
  },
  headers: [Function, Array],
  formFields: [Function, Array],
  withCredentials: [Function, Boolean],
  sendRaw: [Function, Boolean],
  batch: [Function, Boolean],
  factory: Function
};
const emits = ["factory-failed", "uploaded", "failed", "uploading"];
function injectPlugin({ props: props2, emit, helpers }) {
  const xhrs = ref([]);
  const promises = ref([]);
  const workingThreads = ref(0);
  const xhrProps = computed(() => ({
    url: getFn(props2.url),
    method: getFn(props2.method),
    headers: getFn(props2.headers),
    formFields: getFn(props2.formFields),
    fieldName: getFn(props2.fieldName),
    withCredentials: getFn(props2.withCredentials),
    sendRaw: getFn(props2.sendRaw),
    batch: getFn(props2.batch)
  }));
  const isUploading = computed(() => workingThreads.value > 0);
  const isBusy = computed(() => promises.value.length > 0);
  let abortPromises;
  function abort() {
    xhrs.value.forEach((x) => {
      x.abort();
    });
    if (promises.value.length > 0) {
      abortPromises = true;
    }
  }
  function upload() {
    const queue = helpers.queuedFiles.value.slice(0);
    helpers.queuedFiles.value = [];
    if (xhrProps.value.batch(queue)) {
      runFactory(queue);
    } else {
      queue.forEach((file) => {
        runFactory([file]);
      });
    }
  }
  function runFactory(files) {
    workingThreads.value++;
    if (typeof props2.factory !== "function") {
      performUpload(files, {});
      return;
    }
    const res = props2.factory(files);
    if (!res) {
      emit(
        "factory-failed",
        new Error("QUploader: factory() does not return properly"),
        files
      );
      workingThreads.value--;
    } else if (typeof res.catch === "function" && typeof res.then === "function") {
      promises.value.push(res);
      const failed = (err) => {
        if (helpers.isAlive() === true) {
          promises.value = promises.value.filter((p) => p !== res);
          if (promises.value.length === 0) {
            abortPromises = false;
          }
          helpers.queuedFiles.value = helpers.queuedFiles.value.concat(files);
          files.forEach((f) => {
            helpers.updateFileStatus(f, "failed");
          });
          emit("factoryFailed", err, files);
          workingThreads.value--;
        }
      };
      res.then((factory) => {
        if (abortPromises === true) {
          failed(new Error("Aborted"));
        } else if (helpers.isAlive() === true) {
          promises.value = promises.value.filter((p) => p !== res);
          performUpload(files, factory);
        }
      }).catch(failed);
    } else {
      performUpload(files, res || {});
    }
  }
  function performUpload(files, factory) {
    const form = new FormData(), xhr = new XMLHttpRequest();
    const getProp = (name, arg) => {
      return factory[name] !== void 0 ? getFn(factory[name])(arg) : xhrProps.value[name](arg);
    };
    const url = getProp("url", files);
    if (!url) {
      console.error("q-uploader: invalid or no URL specified");
      workingThreads.value--;
      return;
    }
    const fields = getProp("formFields", files);
    fields !== void 0 && fields.forEach((field) => {
      form.append(field.name, field.value);
    });
    let uploadIndex = 0, uploadIndexSize = 0, localUploadedSize = 0, maxUploadSize = 0, aborted;
    xhr.upload.addEventListener("progress", (e) => {
      if (aborted === true) {
        return;
      }
      const loaded = Math.min(maxUploadSize, e.loaded);
      helpers.uploadedSize.value += loaded - localUploadedSize;
      localUploadedSize = loaded;
      let size = localUploadedSize - uploadIndexSize;
      for (let i = uploadIndex; size > 0 && i < files.length; i++) {
        const file = files[i], uploaded = size > file.size;
        if (uploaded) {
          size -= file.size;
          uploadIndex++;
          uploadIndexSize += file.size;
          helpers.updateFileStatus(file, "uploading", file.size);
        } else {
          helpers.updateFileStatus(file, "uploading", size);
          return;
        }
      }
    }, false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState < 4) {
        return;
      }
      if (xhr.status && xhr.status < 400) {
        helpers.uploadedFiles.value = helpers.uploadedFiles.value.concat(files);
        files.forEach((f) => {
          helpers.updateFileStatus(f, "uploaded");
        });
        emit("uploaded", { files, xhr });
      } else {
        aborted = true;
        helpers.uploadedSize.value -= localUploadedSize;
        helpers.queuedFiles.value = helpers.queuedFiles.value.concat(files);
        files.forEach((f) => {
          helpers.updateFileStatus(f, "failed");
        });
        emit("failed", { files, xhr });
      }
      workingThreads.value--;
      xhrs.value = xhrs.value.filter((x) => x !== xhr);
    };
    xhr.open(
      getProp("method", files),
      url
    );
    if (getProp("withCredentials", files) === true) {
      xhr.withCredentials = true;
    }
    const headers = getProp("headers", files);
    headers !== void 0 && headers.forEach((head) => {
      xhr.setRequestHeader(head.name, head.value);
    });
    const sendRaw = getProp("sendRaw", files);
    files.forEach((file) => {
      helpers.updateFileStatus(file, "uploading", 0);
      if (sendRaw !== true) {
        form.append(getProp("fieldName", file), file, file.name);
      }
      file.xhr = xhr;
      file.__abort = () => {
        xhr.abort();
      };
      maxUploadSize += file.size;
    });
    emit("uploading", { files, xhr });
    xhrs.value.push(xhr);
    if (sendRaw === true) {
      xhr.send(new Blob(files));
    } else {
      xhr.send(form);
    }
  }
  return {
    isUploading,
    isBusy,
    abort,
    upload
  };
}
var xhrUploaderPlugin = {
  name: "QUploader",
  props,
  emits,
  injectPlugin
};
var QUploader = createUploaderComponent(xhrUploaderPlugin);
export { QUploader as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVVwbG9hZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2lyY3VsYXItcHJvZ3Jlc3MvUUNpcmN1bGFyUHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy91cGxvYWRlci91cGxvYWRlci1jb3JlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9nZXQtZW1pdHMtb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvY3JlYXRlLXVwbG9hZGVyLWNvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdXBsb2FkZXIveGhyLXVwbG9hZGVyLXBsdWdpbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdXBsb2FkZXIvUVVwbG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbi8vIGFsc28gdXNlZCBieSBRS25vYlxuZXhwb3J0IGNvbnN0IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcblxuICBtaW46IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMTAwXG4gIH0sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgY2VudGVyQ29sb3I6IFN0cmluZyxcbiAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gIGZvbnRTaXplOiBTdHJpbmcsXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG5cbiAgLy8gcmF0aW9cbiAgdGhpY2tuZXNzOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDAuMixcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA+PSAwICYmIHYgPD0gMVxuICB9LFxuXG4gIGFuZ2xlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICBzaG93VmFsdWU6IEJvb2xlYW4sXG4gIHJldmVyc2U6IEJvb2xlYW4sXG5cbiAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHsgdXNlQ2lyY3VsYXJDb21tb25Qcm9wcyB9IGZyb20gJy4vdXNlLWNpcmN1bGFyLXByb2dyZXNzLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5cbmNvbnN0XG4gIHJhZGl1cyA9IDUwLFxuICBkaWFtZXRlciA9IDIgKiByYWRpdXMsXG4gIGNpcmN1bWZlcmVuY2UgPSBkaWFtZXRlciAqIE1hdGguUEksXG4gIHN0cm9rZURhc2hBcnJheSA9IE1hdGgucm91bmQoY2lyY3VtZmVyZW5jZSAqIDEwMDApIC8gMTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNpcmN1bGFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQ2lyY3VsYXJDb21tb25Qcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiA2MDBcbiAgICB9LFxuXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBzdmdTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIHByb3BzLmFuZ2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogcHJvcHMucmV2ZXJzZSAhPT0gKCRxLmxhbmcucnRsID09PSB0cnVlKVxuICAgICAgICAgID8gYHNjYWxlM2QoLTEsIDEsIDEpIHJvdGF0ZTNkKDAsIDAsIDEsICR7IC05MCAtIGFuZ2xlIH1kZWcpYFxuICAgICAgICAgIDogYHJvdGF0ZTNkKDAsIDAsIDEsICR7IGFuZ2xlIC0gOTAgfWRlZylgXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNpcmNsZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zdGFudEZlZWRiYWNrICE9PSB0cnVlICYmIHByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRydWVcbiAgICAgICAgPyB7IHRyYW5zaXRpb246IGBzdHJva2UtZGFzaG9mZnNldCAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZSAwcywgc3Ryb2tlICR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tcyBlYXNlYCB9XG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3Qgdmlld0JveCA9IGNvbXB1dGVkKCgpID0+IGRpYW1ldGVyIC8gKDEgLSBwcm9wcy50aGlja25lc3MgLyAyKSlcblxuICAgIGNvbnN0IHZpZXdCb3hBdHRyID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgLyAyIH0gJHsgdmlld0JveC52YWx1ZSB9ICR7IHZpZXdCb3gudmFsdWUgfWBcbiAgICApXG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gY29tcHV0ZWQoKCkgPT4gYmV0d2Vlbihwcm9wcy52YWx1ZSwgcHJvcHMubWluLCBwcm9wcy5tYXgpKVxuXG4gICAgY29uc3Qgc3Ryb2tlRGFzaE9mZnNldCA9IGNvbXB1dGVkKCgpID0+IGNpcmN1bWZlcmVuY2UgKiAoXG4gICAgICAxIC0gKG5vcm1hbGl6ZWQudmFsdWUgLSBwcm9wcy5taW4pIC8gKHByb3BzLm1heCAtIHByb3BzLm1pbilcbiAgICApKVxuXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50aGlja25lc3MgLyAyICogdmlld0JveC52YWx1ZSlcblxuICAgIGZ1bmN0aW9uIGdldENpcmNsZSAoeyB0aGlja25lc3MsIG9mZnNldCwgY29sb3IsIGNscywgcm91bmRlZCB9KSB7XG4gICAgICByZXR1cm4gaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3EtY2lyY3VsYXItcHJvZ3Jlc3NfXycgKyBjbHMgKyAoY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBjb2xvciB9YCA6ICcnKSxcbiAgICAgICAgc3R5bGU6IGNpcmNsZVN0eWxlLnZhbHVlLFxuICAgICAgICBmaWxsOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogdGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IHN0cm9rZURhc2hBcnJheSxcbiAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0LFxuICAgICAgICAnc3Ryb2tlLWxpbmVjYXAnOiByb3VuZGVkLFxuICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgY3k6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIHI6IHJhZGl1c1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgc3ZnQ2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5jZW50ZXJDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLmNlbnRlckNvbG9yICE9PSAndHJhbnNwYXJlbnQnICYmIHN2Z0NoaWxkLnB1c2goXG4gICAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3NfX2NlbnRlciB0ZXh0LSR7IHByb3BzLmNlbnRlckNvbG9yIH1gLFxuICAgICAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAgIHI6IHJhZGl1cyAtIHN0cm9rZVdpZHRoLnZhbHVlIC8gMixcbiAgICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgICBjeTogdmlld0JveC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgJiYgcHJvcHMudHJhY2tDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ3RyYWNrJyxcbiAgICAgICAgICB0aGlja25lc3M6IHN0cm9rZVdpZHRoLnZhbHVlLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogcHJvcHMudHJhY2tDb2xvclxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ2NpcmNsZScsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IHN0cm9rZURhc2hPZmZzZXQudmFsdWUsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAncm91bmQnIDogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX19zdmcnLFxuICAgICAgICAgIHN0eWxlOiBzdmdTdHlsZS52YWx1ZSxcbiAgICAgICAgICB2aWV3Qm94OiB2aWV3Qm94QXR0ci52YWx1ZSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSwgc3ZnQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIHByb3BzLnNob3dWYWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX190ZXh0IGFic29sdXRlLWZ1bGwgcm93IGZsZXgtY2VudGVyIGNvbnRlbnQtY2VudGVyJyxcbiAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogcHJvcHMuZm9udFNpemUgfVxuICAgICAgICB9LCBzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBzbG90cy5kZWZhdWx0KCkgOiBbIGgoJ2RpdicsIG5vcm1hbGl6ZWQudmFsdWUpIF0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBgcS1jaXJjdWxhci1wcm9ncmVzcyBxLWNpcmN1bGFyLXByb2dyZXNzLS0keyBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gJ2luJyA6ICcnIH1kZXRlcm1pbmF0ZWAsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogcHJvcHMubWluLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IHByb3BzLm1heCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gdm9pZCAwIDogbm9ybWFsaXplZC52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5pbnRlcm5hbCwgY2hpbGQpKSAvLyBcImludGVybmFsXCIgaXMgdXNlZCBieSBRS25vYlxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcbmltcG9ydCB7IHN0b3AsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmZ1bmN0aW9uIGZpbHRlckZpbGVzIChmaWxlcywgcmVqZWN0ZWRGaWxlcywgZmFpbGVkUHJvcFZhbGlkYXRpb24sIGZpbHRlckZuKSB7XG4gIGNvbnN0IGFjY2VwdGVkRmlsZXMgPSBbXVxuXG4gIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgaWYgKGZpbHRlckZuKGZpbGUpID09PSB0cnVlKSB7XG4gICAgICBhY2NlcHRlZEZpbGVzLnB1c2goZmlsZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZWplY3RlZEZpbGVzLnB1c2goeyBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsZSB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gYWNjZXB0ZWRGaWxlc1xufVxuXG5mdW5jdGlvbiBzdG9wQW5kUHJldmVudERyYWcgKGUpIHtcbiAgZSAmJiBlLmRhdGFUcmFuc2ZlciAmJiAoZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JylcbiAgc3RvcEFuZFByZXZlbnQoZSlcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVQcm9wcyA9IHtcbiAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gIGFjY2VwdDogU3RyaW5nLFxuICBjYXB0dXJlOiBTdHJpbmcsXG4gIG1heEZpbGVTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heFRvdGFsU2l6ZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBtYXhGaWxlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBmaWx0ZXI6IEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGaWxlRW1pdHMgPSBbICdyZWplY3RlZCcgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBlZGl0YWJsZSxcbiAgZG5kLFxuICBnZXRGaWxlSW5wdXQsXG4gIGFkZEZpbGVzVG9RdWV1ZVxufSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBkbmRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCBleHRlbnNpb25zID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmFjY2VwdCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmFjY2VwdC5zcGxpdCgnLCcpLm1hcChleHQgPT4ge1xuICAgICAgICBleHQgPSBleHQudHJpbSgpXG4gICAgICAgIGlmIChleHQgPT09ICcqJykgeyAvLyBzdXBwb3J0IFwiKlwiXG4gICAgICAgICAgcmV0dXJuICcqLydcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChleHQuZW5kc1dpdGgoJy8qJykpIHsgLy8gc3VwcG9ydCBcImltYWdlLypcIiBvciBcIiovKlwiXG4gICAgICAgICAgZXh0ID0gZXh0LnNsaWNlKDAsIGV4dC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHQudG9VcHBlckNhc2UoKVxuICAgICAgfSlcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IG1heEZpbGVzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4RmlsZXMsIDEwKSlcbiAgY29uc3QgbWF4VG90YWxTaXplTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4VG90YWxTaXplLCAxMCkpXG5cbiAgZnVuY3Rpb24gcGlja0ZpbGVzIChlKSB7XG4gICAgaWYgKGVkaXRhYmxlLnZhbHVlKSB7XG4gICAgICBpZiAoZSAhPT0gT2JqZWN0KGUpKSB7XG4gICAgICAgIGUgPSB7IHRhcmdldDogbnVsbCB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldCAhPT0gbnVsbCAmJiBlLnRhcmdldC5tYXRjaGVzKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHN0b3AgcHJvcGFnYXRpb24gaWYgaXQncyBub3QgYSByZWFsIHBvaW50ZXIgZXZlbnRcbiAgICAgICAgZS5jbGllbnRYID09PSAwICYmIGUuY2xpZW50WSA9PT0gMCAmJiBzdG9wKGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBnZXRGaWxlSW5wdXQoKVxuICAgICAgICBpbnB1dCAmJiBpbnB1dCAhPT0gZS50YXJnZXQgJiYgaW5wdXQuY2xpY2soZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRGaWxlcyAoZmlsZXMpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUgJiYgZmlsZXMpIHtcbiAgICAgIGFkZEZpbGVzVG9RdWV1ZShudWxsLCBmaWxlcylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzRmlsZXMgKGUsIGZpbGVzVG9Qcm9jZXNzLCBjdXJyZW50RmlsZUxpc3QsIGFwcGVuZCkge1xuICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZmlsZXNUb1Byb2Nlc3MgfHwgZS50YXJnZXQuZmlsZXMpXG4gICAgY29uc3QgcmVqZWN0ZWRGaWxlcyA9IFtdXG5cbiAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgaWYgKHJlamVjdGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbWl0KCdyZWplY3RlZCcsIHJlamVjdGVkRmlsZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGZpbGUgdHlwZXNcbiAgICBpZiAocHJvcHMuYWNjZXB0ICE9PSB2b2lkIDAgJiYgZXh0ZW5zaW9ucy52YWx1ZS5pbmRleE9mKCcqLycpID09PSAtMSkge1xuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ2FjY2VwdCcsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucy52YWx1ZS5zb21lKGV4dCA9PiAoXG4gICAgICAgICAgZmlsZS50eXBlLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChleHQpXG4gICAgICAgICAgfHwgZmlsZS5uYW1lLnRvVXBwZXJDYXNlKCkuZW5kc1dpdGgoZXh0KVxuICAgICAgICApKVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgbWF4IGZpbGUgc2l6ZVxuICAgIGlmIChwcm9wcy5tYXhGaWxlU2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zdCBtYXhGaWxlU2l6ZSA9IHBhcnNlSW50KHByb3BzLm1heEZpbGVTaXplLCAxMClcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZS1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnNpemUgPD0gbWF4RmlsZVNpemVcbiAgICAgIH0pXG5cbiAgICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG4gICAgfVxuXG4gICAgLy8gQ29yZG92YS9pT1MgYWxsb3dzIHNlbGVjdGluZyBtdWx0aXBsZSBmaWxlcyBldmVuIHdoZW4gdGhlXG4gICAgLy8gbXVsdGlwbGUgYXR0cmlidXRlIGlzIG5vdCBzcGVjaWZpZWQuIFdlIGFsc28gbm9ybWFsaXplIGRyYWcnbidkcm9wcGVkXG4gICAgLy8gZmlsZXMgaGVyZTpcbiAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZmlsZXMgPSBbIGZpbGVzWyAwIF0gXVxuICAgIH1cblxuICAgIC8vIENvbXB1dGUga2V5IHRvIHVzZSBmb3IgZWFjaCBmaWxlXG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGZpbGUuX19rZXkgPSBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aCArIGZpbGUubGFzdE1vZGlmaWVkICsgZmlsZS5uYW1lICsgZmlsZS5zaXplXG4gICAgfSlcblxuICAgIGlmIChhcHBlbmQgPT09IHRydWUpIHtcbiAgICAgIC8vIEF2b2lkIGR1cGxpY2F0ZSBmaWxlc1xuICAgICAgY29uc3QgZmlsZW5hbWVNYXAgPSBjdXJyZW50RmlsZUxpc3QubWFwKGVudHJ5ID0+IGVudHJ5Ll9fa2V5KVxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ2R1cGxpY2F0ZScsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWVNYXAuaW5jbHVkZXMoZmlsZS5fX2tleSkgPT09IGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG5cbiAgICBpZiAocHJvcHMubWF4VG90YWxTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBzaXplID0gYXBwZW5kID09PSB0cnVlXG4gICAgICAgID8gY3VycmVudEZpbGVMaXN0LnJlZHVjZSgodG90YWwsIGZpbGUpID0+IHRvdGFsICsgZmlsZS5zaXplLCAwKVxuICAgICAgICA6IDBcblxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC10b3RhbC1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHNpemUgKz0gZmlsZS5zaXplXG4gICAgICAgIHJldHVybiBzaXplIDw9IG1heFRvdGFsU2l6ZU51bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGN1c3RvbSBmaWx0ZXIgZnVuY3Rpb24/XG4gICAgaWYgKHR5cGVvZiBwcm9wcy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkRmlsZXMgPSBwcm9wcy5maWx0ZXIoZmlsZXMpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZmlsdGVyJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEZpbGVzLmluY2x1ZGVzKGZpbGUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tYXhGaWxlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBsZXQgZmlsZXNOdW1iZXIgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QubGVuZ3RoXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LWZpbGVzJywgKCkgPT4ge1xuICAgICAgICBmaWxlc051bWJlcisrXG4gICAgICAgIHJldHVybiBmaWxlc051bWJlciA8PSBtYXhGaWxlc051bWJlci52YWx1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmlsZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdvdmVyIChlKSB7XG4gICAgc3RvcEFuZFByZXZlbnREcmFnKGUpXG4gICAgZG5kLnZhbHVlICE9PSB0cnVlICYmIChkbmQudmFsdWUgPSB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25EcmFnbGVhdmUgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgLy8gU2FmYXJpIGJ1ZzogcmVsYXRlZFRhcmdldCBpcyBudWxsIGZvciBvdmVyIDEwIHllYXJzXG4gICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTY2NTQ3XG4gICAgY29uc3QgZ29uZSA9IGUucmVsYXRlZFRhcmdldCAhPT0gbnVsbCB8fCBjbGllbnQuaXMuc2FmYXJpICE9PSB0cnVlXG4gICAgICA/IGUucmVsYXRlZFRhcmdldCAhPT0gZG5kUmVmLnZhbHVlXG4gICAgICA6IGRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KGUuY2xpZW50WCwgZS5jbGllbnRZKS5pbmNsdWRlcyhkbmRSZWYudmFsdWUpID09PSBmYWxzZVxuXG4gICAgZ29uZSA9PT0gdHJ1ZSAmJiAoZG5kLnZhbHVlID0gZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRyb3AgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudERyYWcoZSlcbiAgICBjb25zdCBmaWxlcyA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzXG5cbiAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cblxuICAgIGRuZC52YWx1ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBnZXREbmROb2RlICh0eXBlKSB7XG4gICAgaWYgKGRuZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiBkbmRSZWYsXG4gICAgICAgIGNsYXNzOiBgcS0keyB0eXBlIH1fX2RuZCBhYnNvbHV0ZS1mdWxsYCxcbiAgICAgICAgb25EcmFnZW50ZXI6IHN0b3BBbmRQcmV2ZW50RHJhZyxcbiAgICAgICAgb25EcmFnb3Zlcjogc3RvcEFuZFByZXZlbnREcmFnLFxuICAgICAgICBvbkRyYWdsZWF2ZSxcbiAgICAgICAgb25Ecm9wXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHBpY2tGaWxlcywgYWRkRmlsZXMgfSlcblxuICByZXR1cm4ge1xuICAgIHBpY2tGaWxlcyxcbiAgICBhZGRGaWxlcyxcbiAgICBvbkRyYWdvdmVyLFxuICAgIG9uRHJhZ2xlYXZlLFxuICAgIHByb2Nlc3NGaWxlcyxcbiAgICBnZXREbmROb2RlLFxuXG4gICAgbWF4RmlsZXNOdW1iZXIsXG4gICAgbWF4VG90YWxTaXplTnVtYmVyXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgaXNSZWYsIGNvbXB1dGVkLCB3YXRjaCwgcHJvdmlkZSwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lci9RU3Bpbm5lci5qcydcbmltcG9ydCBRQ2lyY3VsYXJQcm9ncmVzcyBmcm9tICcuLi9jaXJjdWxhci1wcm9ncmVzcy9RQ2lyY3VsYXJQcm9ncmVzcy5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VGaWxlLCB7IHVzZUZpbGVQcm9wcywgdXNlRmlsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS5qcydcblxuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaHVtYW5TdG9yYWdlU2l6ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IHVwbG9hZGVyS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCwgaW5qZWN0TXVsdGlwbGVQcm9wcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmZ1bmN0aW9uIGdldFByb2dyZXNzTGFiZWwgKHApIHtcbiAgcmV0dXJuIChwICogMTAwKS50b0ZpeGVkKDIpICsgJyUnXG59XG5cbmV4cG9ydCBjb25zdCBjb3JlUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlRmlsZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuICBmbGF0OiBCb29sZWFuLFxuICBib3JkZXJlZDogQm9vbGVhbixcblxuICBub1RodW1ibmFpbHM6IEJvb2xlYW4sXG4gIGF1dG9VcGxvYWQ6IEJvb2xlYW4sXG4gIGhpZGVVcGxvYWRCdG46IEJvb2xlYW4sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgcmVhZG9ubHk6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IGNvcmVFbWl0cyA9IFtcbiAgLi4udXNlRmlsZUVtaXRzLFxuICAnc3RhcnQnLCAnZmluaXNoJywgJ2FkZGVkJywgJ3JlbW92ZWQnXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW5kZXJlciAoZ2V0UGx1Z2luKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgc2xvdHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpbGVTdGF0dXMgKGZpbGUsIHN0YXR1cywgdXBsb2FkZWRTaXplKSB7XG4gICAgZmlsZS5fX3N0YXR1cyA9IHN0YXR1c1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2lkbGUnKSB7XG4gICAgICBmaWxlLl9fdXBsb2FkZWQgPSAwXG4gICAgICBmaWxlLl9fcHJvZ3Jlc3MgPSAwXG4gICAgICBmaWxlLl9fc2l6ZUxhYmVsID0gaHVtYW5TdG9yYWdlU2l6ZShmaWxlLnNpemUpXG4gICAgICBmaWxlLl9fcHJvZ3Jlc3NMYWJlbCA9ICcwLjAwJSdcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAnZmFpbGVkJykge1xuICAgICAgcHJveHkuJGZvcmNlVXBkYXRlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZpbGUuX191cGxvYWRlZCA9IHN0YXR1cyA9PT0gJ3VwbG9hZGVkJ1xuICAgICAgPyBmaWxlLnNpemVcbiAgICAgIDogdXBsb2FkZWRTaXplXG5cbiAgICBmaWxlLl9fcHJvZ3Jlc3MgPSBzdGF0dXMgPT09ICd1cGxvYWRlZCdcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLm1pbigwLjk5OTksIGZpbGUuX191cGxvYWRlZCAvIGZpbGUuc2l6ZSlcblxuICAgIGZpbGUuX19wcm9ncmVzc0xhYmVsID0gZ2V0UHJvZ3Jlc3NMYWJlbChmaWxlLl9fcHJvZ3Jlc3MpXG4gICAgcHJveHkuJGZvcmNlVXBkYXRlKClcbiAgfVxuXG4gIGNvbnN0IGVkaXRhYmxlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZSlcbiAgY29uc3QgZG5kID0gcmVmKGZhbHNlKVxuXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBmaWxlczogcmVmKFtdKSxcbiAgICBxdWV1ZWRGaWxlczogcmVmKFtdKSxcbiAgICB1cGxvYWRlZEZpbGVzOiByZWYoW10pLFxuICAgIHVwbG9hZGVkU2l6ZTogcmVmKDApLFxuXG4gICAgdXBkYXRlRmlsZVN0YXR1cyxcbiAgICBpc0FsaXZlOiAoKSA9PiB2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXMsXG4gICAgb25EcmFnb3ZlcixcbiAgICBvbkRyYWdsZWF2ZSxcbiAgICBwcm9jZXNzRmlsZXMsXG4gICAgZ2V0RG5kTm9kZSxcbiAgICBtYXhGaWxlc051bWJlcixcbiAgICBtYXhUb3RhbFNpemVOdW1iZXJcbiAgfSA9IHVzZUZpbGUoeyBlZGl0YWJsZSwgZG5kLCBnZXRGaWxlSW5wdXQsIGFkZEZpbGVzVG9RdWV1ZSB9KVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIGdldFBsdWdpbih7IHByb3BzLCBzbG90cywgZW1pdCwgaGVscGVyczogc3RhdGUgfSkpXG5cbiAgaWYgKHN0YXRlLmlzQnVzeSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuaXNCdXN5ID0gcmVmKGZhbHNlKVxuICB9XG5cbiAgY29uc3QgdXBsb2FkU2l6ZSA9IHJlZigwKVxuICBjb25zdCB1cGxvYWRQcm9ncmVzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB1cGxvYWRTaXplLnZhbHVlID09PSAwXG4gICAgICA/IDBcbiAgICAgIDogc3RhdGUudXBsb2FkZWRTaXplLnZhbHVlIC8gdXBsb2FkU2l6ZS52YWx1ZVxuICApKVxuICBjb25zdCB1cGxvYWRQcm9ncmVzc0xhYmVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvZ3Jlc3NMYWJlbCh1cGxvYWRQcm9ncmVzcy52YWx1ZSkpXG4gIGNvbnN0IHVwbG9hZFNpemVMYWJlbCA9IGNvbXB1dGVkKCgpID0+IGh1bWFuU3RvcmFnZVNpemUodXBsb2FkU2l6ZS52YWx1ZSkpXG5cbiAgY29uc3QgY2FuQWRkRmlsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGVkaXRhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgJiYgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAvLyBpZiBzaW5nbGUgc2VsZWN0aW9uIGFuZCBubyBmaWxlcyBhcmUgcXVldWVkOlxuICAgICYmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5sZW5ndGggPT09IDApXG4gICAgLy8gaWYgbWF4LWZpbGVzIGlzIHNldCBhbmQgY3VycmVudCBudW1iZXIgb2YgZmlsZXMgZG9lcyBub3QgZXhjZWVkcyBpdDpcbiAgICAmJiAocHJvcHMubWF4RmlsZXMgPT09IHZvaWQgMCB8fCBzdGF0ZS5maWxlcy52YWx1ZS5sZW5ndGggPCBtYXhGaWxlc051bWJlci52YWx1ZSlcbiAgICAvLyBpZiBtYXgtdG90YWwtc2l6ZSBpcyBzZXQgYW5kIGN1cnJlbnQgdXBsb2FkIHNpemUgZG9lcyBub3QgZXhjZWVkcyBpdDpcbiAgICAmJiAocHJvcHMubWF4VG90YWxTaXplID09PSB2b2lkIDAgfHwgdXBsb2FkU2l6ZS52YWx1ZSA8IG1heFRvdGFsU2l6ZU51bWJlci52YWx1ZSlcbiAgKVxuXG4gIGNvbnN0IGNhblVwbG9hZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgZWRpdGFibGUudmFsdWUgPT09IHRydWVcbiAgICAmJiBzdGF0ZS5pc0J1c3kudmFsdWUgIT09IHRydWVcbiAgICAmJiBzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICYmIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlLmxlbmd0aCA+IDBcbiAgKVxuXG4gIHByb3ZpZGUodXBsb2FkZXJLZXksIHJlbmRlcklucHV0KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXVwbG9hZGVyIGNvbHVtbiBuby13cmFwJ1xuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tc3F1YXJlIG5vLWJvcmRlci1yYWRpdXMnIDogJycpXG4gICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tZmxhdCBuby1zaGFkb3cnIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQgcS11cGxvYWRlci0tZGlzYWJsZScgOiAnJylcbiAgICArIChkbmQudmFsdWUgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWRuZCcgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbG9yQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXVwbG9hZGVyX19oZWFkZXInXG4gICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICArIChwcm9wcy50ZXh0Q29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIHdhdGNoKHN0YXRlLmlzVXBsb2FkaW5nLCAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICBpZiAob2xkVmFsID09PSBmYWxzZSAmJiBuZXdWYWwgPT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3N0YXJ0JylcbiAgICB9XG4gICAgZWxzZSBpZiAob2xkVmFsID09PSB0cnVlICYmIG5ld1ZhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGVtaXQoJ2ZpbmlzaCcpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHN0YXRlLmFib3J0KClcbiAgICAgIHN0YXRlLnVwbG9hZGVkU2l6ZS52YWx1ZSA9IDBcbiAgICAgIHVwbG9hZFNpemUudmFsdWUgPSAwXG4gICAgICByZXZva2VJbWdVUkxzKClcbiAgICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gW11cbiAgICAgIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlID0gW11cbiAgICAgIHN0YXRlLnVwbG9hZGVkRmlsZXMudmFsdWUgPSBbXVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVVwbG9hZGVkRmlsZXMgKCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgYmF0Y2hSZW1vdmVGaWxlcyhbICd1cGxvYWRlZCcgXSwgKCkgPT4ge1xuICAgICAgICBzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlID0gW11cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUXVldWVkRmlsZXMgKCkge1xuICAgIGJhdGNoUmVtb3ZlRmlsZXMoWyAnaWRsZScsICdmYWlsZWQnIF0sICh7IHNpemUgfSkgPT4ge1xuICAgICAgdXBsb2FkU2l6ZS52YWx1ZSAtPSBzaXplXG4gICAgICBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZSA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhdGNoUmVtb3ZlRmlsZXMgKHN0YXR1c0xpc3QsIGNiKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZWQgPSB7XG4gICAgICBmaWxlczogW10sXG4gICAgICBzaXplOiAwXG4gICAgfVxuXG4gICAgY29uc3QgbG9jYWxGaWxlcyA9IHN0YXRlLmZpbGVzLnZhbHVlLmZpbHRlcihmID0+IHtcbiAgICAgIGlmIChzdGF0dXNMaXN0LmluZGV4T2YoZi5fX3N0YXR1cykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJlbW92ZWQuc2l6ZSArPSBmLnNpemVcbiAgICAgIHJlbW92ZWQuZmlsZXMucHVzaChmKVxuXG4gICAgICBmLl9faW1nICE9PSB2b2lkIDAgJiYgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoZi5fX2ltZy5zcmMpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBpZiAocmVtb3ZlZC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzdGF0ZS5maWxlcy52YWx1ZSA9IGxvY2FsRmlsZXNcbiAgICAgIGNiKHJlbW92ZWQpXG4gICAgICBlbWl0KCdyZW1vdmVkJywgcmVtb3ZlZC5maWxlcylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVGaWxlIChmaWxlKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUpIHsgcmV0dXJuIH1cblxuICAgIGlmIChmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkZWQnKSB7XG4gICAgICBzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlID0gc3RhdGUudXBsb2FkZWRGaWxlcy52YWx1ZS5maWx0ZXIoZiA9PiBmLl9fa2V5ICE9PSBmaWxlLl9fa2V5KVxuICAgIH1cbiAgICBlbHNlIGlmIChmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkaW5nJykge1xuICAgICAgZmlsZS5fX2Fib3J0KClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB1cGxvYWRTaXplLnZhbHVlIC09IGZpbGUuc2l6ZVxuICAgIH1cblxuICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gc3RhdGUuZmlsZXMudmFsdWUuZmlsdGVyKGYgPT4ge1xuICAgICAgaWYgKGYuX19rZXkgIT09IGZpbGUuX19rZXkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgZi5fX2ltZyAhPT0gdm9pZCAwICYmIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGYuX19pbWcuc3JjKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KVxuXG4gICAgc3RhdGUucXVldWVkRmlsZXMudmFsdWUgPSBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5maWx0ZXIoZiA9PiBmLl9fa2V5ICE9PSBmaWxlLl9fa2V5KVxuICAgIGVtaXQoJ3JlbW92ZWQnLCBbIGZpbGUgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldm9rZUltZ1VSTHMgKCkge1xuICAgIHN0YXRlLmZpbGVzLnZhbHVlLmZvckVhY2goZiA9PiB7XG4gICAgICBmLl9faW1nICE9PSB2b2lkIDAgJiYgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoZi5fX2ltZy5zcmMpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpbGVJbnB1dCAoKSB7XG4gICAgcmV0dXJuIGlucHV0UmVmLnZhbHVlXG4gICAgICB8fCByb290UmVmLnZhbHVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3EtdXBsb2FkZXJfX2lucHV0JylbIDAgXVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRmlsZXNUb1F1ZXVlIChlLCBmaWxlTGlzdCkge1xuICAgIGNvbnN0IGxvY2FsRmlsZXMgPSBwcm9jZXNzRmlsZXMoZSwgZmlsZUxpc3QsIHN0YXRlLmZpbGVzLnZhbHVlLCB0cnVlKVxuICAgIGNvbnN0IGZpbGVJbnB1dCA9IGdldEZpbGVJbnB1dCgpXG5cbiAgICBpZiAoZmlsZUlucHV0ICE9PSB2b2lkIDAgJiYgZmlsZUlucHV0ICE9PSBudWxsKSB7XG4gICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cblxuICAgIGlmIChsb2NhbEZpbGVzID09PSB2b2lkIDApIHsgcmV0dXJuIH1cblxuICAgIGxvY2FsRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIHN0YXRlLnVwZGF0ZUZpbGVTdGF0dXMoZmlsZSwgJ2lkbGUnKVxuICAgICAgdXBsb2FkU2l6ZS52YWx1ZSArPSBmaWxlLnNpemVcblxuICAgICAgaWYgKHByb3BzLm5vVGh1bWJuYWlscyAhPT0gdHJ1ZSAmJiBmaWxlLnR5cGUudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKCdJTUFHRScpKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgIGltZy5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKVxuICAgICAgICBmaWxlLl9faW1nID0gaW1nXG4gICAgICB9XG4gICAgfSlcblxuICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gc3RhdGUuZmlsZXMudmFsdWUuY29uY2F0KGxvY2FsRmlsZXMpXG4gICAgc3RhdGUucXVldWVkRmlsZXMudmFsdWUgPSBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5jb25jYXQobG9jYWxGaWxlcylcbiAgICBlbWl0KCdhZGRlZCcsIGxvY2FsRmlsZXMpXG4gICAgcHJvcHMuYXV0b1VwbG9hZCA9PT0gdHJ1ZSAmJiBzdGF0ZS51cGxvYWQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBsb2FkICgpIHtcbiAgICBjYW5VcGxvYWQudmFsdWUgPT09IHRydWUgJiYgc3RhdGUudXBsb2FkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJ0biAoc2hvdywgaWNvbiwgZm4pIHtcbiAgICBpZiAoc2hvdyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgdHlwZTogJ2EnLFxuICAgICAgICBrZXk6IGljb24sXG4gICAgICAgIGljb246ICRxLmljb25TZXQudXBsb2FkZXJbIGljb24gXSxcbiAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgZGVuc2U6IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkID0gdm9pZCAwXG5cbiAgICAgIGlmIChpY29uID09PSAnYWRkJykge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBwaWNrRmlsZXNcbiAgICAgICAgY2hpbGQgPSByZW5kZXJJbnB1dFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEub25DbGljayA9IGZuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFCdG4sIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcklucHV0ICgpIHtcbiAgICByZXR1cm4gaCgnaW5wdXQnLCB7XG4gICAgICByZWY6IGlucHV0UmVmLFxuICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19pbnB1dCBvdmVyZmxvdy1oaWRkZW4gYWJzb2x1dGUtZnVsbCcsXG4gICAgICB0YWJpbmRleDogLTEsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICB0aXRsZTogJycsIC8vIHRyeSB0byByZW1vdmUgZGVmYXVsdCB0b29sdGlwXG4gICAgICBhY2NlcHQ6IHByb3BzLmFjY2VwdCxcbiAgICAgIG11bHRpcGxlOiBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICdtdWx0aXBsZScgOiB2b2lkIDAsXG4gICAgICBjYXB0dXJlOiBwcm9wcy5jYXB0dXJlLFxuICAgICAgb25Nb3VzZWRvd246IHN0b3AsIC8vIG5lZWQgdG8gc3RvcCByZWZvY3VzIGZyb20gUUJ0blxuICAgICAgb25DbGljazogcGlja0ZpbGVzLFxuICAgICAgb25DaGFuZ2U6IGFkZEZpbGVzVG9RdWV1ZVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRIZWFkZXIgKCkge1xuICAgIGlmIChzbG90cy5oZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHNsb3RzLmhlYWRlcihwdWJsaWNBcGkpXG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19oZWFkZXItY29udGVudCBjb2x1bW4nXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ2ZsZXggZmxleC1jZW50ZXIgbm8td3JhcCBxLWd1dHRlci14cydcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGdldEJ0bihzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5sZW5ndGggPiAwLCAncmVtb3ZlUXVldWUnLCByZW1vdmVRdWV1ZWRGaWxlcyksXG4gICAgICAgICAgZ2V0QnRuKHN0YXRlLnVwbG9hZGVkRmlsZXMudmFsdWUubGVuZ3RoID4gMCwgJ3JlbW92ZVVwbG9hZGVkJywgcmVtb3ZlVXBsb2FkZWRGaWxlcyksXG5cbiAgICAgICAgICBzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKFFTcGlubmVyLCB7IGNsYXNzOiAncS11cGxvYWRlcl9fc3Bpbm5lcicgfSlcbiAgICAgICAgICAgIDogbnVsbCxcblxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdjb2wgY29sdW1uIGp1c3RpZnktY2VudGVyJyB9LCBbXG4gICAgICAgICAgICBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3RpdGxlJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICAgICAgICAgIDogbnVsbCxcblxuICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3N1YnRpdGxlJyB9LCBbXG4gICAgICAgICAgICAgIHVwbG9hZFNpemVMYWJlbC52YWx1ZSArICcgLyAnICsgdXBsb2FkUHJvZ3Jlc3NMYWJlbC52YWx1ZVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcblxuICAgICAgICAgIGdldEJ0bihjYW5BZGRGaWxlcy52YWx1ZSwgJ2FkZCcpLFxuICAgICAgICAgIGdldEJ0bihwcm9wcy5oaWRlVXBsb2FkQnRuID09PSBmYWxzZSAmJiBjYW5VcGxvYWQudmFsdWUgPT09IHRydWUsICd1cGxvYWQnLCBzdGF0ZS51cGxvYWQpLFxuICAgICAgICAgIGdldEJ0bihzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSwgJ2NsZWFyJywgc3RhdGUuYWJvcnQpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpc3QgKCkge1xuICAgIGlmIChzbG90cy5saXN0ICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBzbG90cy5saXN0KHB1YmxpY0FwaSlcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGUuZmlsZXMudmFsdWUubWFwKGZpbGUgPT4gaCgnZGl2Jywge1xuICAgICAga2V5OiBmaWxlLl9fa2V5LFxuICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19maWxlIHJlbGF0aXZlLXBvc2l0aW9uJ1xuICAgICAgICArIChwcm9wcy5ub1RodW1ibmFpbHMgIT09IHRydWUgJiYgZmlsZS5fX2ltZyAhPT0gdm9pZCAwID8gJyBxLXVwbG9hZGVyX19maWxlLS1pbWcnIDogJycpXG4gICAgICAgICsgKFxuICAgICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICdmYWlsZWQnXG4gICAgICAgICAgICA/ICcgcS11cGxvYWRlcl9fZmlsZS0tZmFpbGVkJ1xuICAgICAgICAgICAgOiAoZmlsZS5fX3N0YXR1cyA9PT0gJ3VwbG9hZGVkJyA/ICcgcS11cGxvYWRlcl9fZmlsZS0tdXBsb2FkZWQnIDogJycpXG4gICAgICAgICksXG4gICAgICBzdHlsZTogcHJvcHMubm9UaHVtYm5haWxzICE9PSB0cnVlICYmIGZpbGUuX19pbWcgIT09IHZvaWQgMFxuICAgICAgICA/IHsgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIGZpbGUuX19pbWcuc3JjICsgJ1wiKScgfVxuICAgICAgICA6IG51bGxcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9fZmlsZS1oZWFkZXIgcm93IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICB9LCBbXG4gICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICdmYWlsZWQnXG4gICAgICAgICAgPyBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdXBsb2FkZXJfX2ZpbGUtc3RhdHVzJyxcbiAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudHlwZS5uZWdhdGl2ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnbmVnYXRpdmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IG51bGwsXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX2ZpbGUtaGVhZGVyLWNvbnRlbnQgY29sJyB9LCBbXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3RpdGxlJyB9LCBbIGZpbGUubmFtZSBdKSxcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdXBsb2FkZXJfX3N1YnRpdGxlIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBmaWxlLl9fc2l6ZUxhYmVsICsgJyAvICcgKyBmaWxlLl9fcHJvZ3Jlc3NMYWJlbFxuICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICd1cGxvYWRpbmcnXG4gICAgICAgICAgPyBoKFFDaXJjdWxhclByb2dyZXNzLCB7XG4gICAgICAgICAgICB2YWx1ZTogZmlsZS5fX3Byb2dyZXNzLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmlsZS5fX3Byb2dyZXNzID09PSAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IGgoUUJ0biwge1xuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBpY29uOiAkcS5pY29uU2V0LnVwbG9hZGVyWyBmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkZWQnID8gJ2RvbmUnIDogJ2NsZWFyJyBdLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4geyByZW1vdmVGaWxlKGZpbGUpIH1cbiAgICAgICAgICB9KVxuICAgICAgXSlcbiAgICBdKSlcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuYWJvcnQoKVxuICAgIHN0YXRlLmZpbGVzLnZhbHVlLmxlbmd0aCA+IDAgJiYgcmV2b2tlSW1nVVJMcygpXG4gIH0pXG5cbiAgY29uc3QgcHVibGljQXBpID0ge31cblxuICBmb3IgKGNvbnN0IGtleSBpbiBzdGF0ZSkge1xuICAgIGlmIChpc1JlZihzdGF0ZVsga2V5IF0pID09PSB0cnVlKSB7XG4gICAgICBpbmplY3RQcm9wKHB1YmxpY0FwaSwga2V5LCAoKSA9PiBzdGF0ZVsga2V5IF0udmFsdWUpXG4gICAgfVxuICAgIGVsc2UgeyAvLyBtZXRob2Qgb3Igbm9uLWNvbXB1dGVkIHByb3BcbiAgICAgIHB1YmxpY0FwaVsga2V5IF0gPSBzdGF0ZVsga2V5IF1cbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHB1YmxpY0FwaSwge1xuICAgIHVwbG9hZCxcbiAgICByZXNldCxcbiAgICByZW1vdmVVcGxvYWRlZEZpbGVzLFxuICAgIHJlbW92ZVF1ZXVlZEZpbGVzLFxuICAgIHJlbW92ZUZpbGUsXG5cbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXNcbiAgfSlcblxuICBpbmplY3RNdWx0aXBsZVByb3BzKHB1YmxpY0FwaSwge1xuICAgIGNhbkFkZEZpbGVzOiAoKSA9PiBjYW5BZGRGaWxlcy52YWx1ZSxcbiAgICBjYW5VcGxvYWQ6ICgpID0+IGNhblVwbG9hZC52YWx1ZSxcbiAgICB1cGxvYWRTaXplTGFiZWw6ICgpID0+IHVwbG9hZFNpemVMYWJlbC52YWx1ZSxcbiAgICB1cGxvYWRQcm9ncmVzc0xhYmVsOiAoKSA9PiB1cGxvYWRQcm9ncmVzc0xhYmVsLnZhbHVlXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBhcGkgKG1ldGhvZHMgJiBjb21wdXRlZCBwcm9wcylcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljQXBpKVxuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjb2xvckNsYXNzLnZhbHVlIH0sIGdldEhlYWRlcigpKSxcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX19saXN0IHNjcm9sbCcgfSwgZ2V0TGlzdCgpKSxcbiAgICAgIGdldERuZE5vZGUoJ3VwbG9hZGVyJylcbiAgICBdXG5cbiAgICBzdGF0ZS5pc0J1c3kudmFsdWUgPT09IHRydWUgJiYgY2hpbGRyZW4ucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19vdmVybGF5IGFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgIH0sIFsgaChRU3Bpbm5lcikgXSlcbiAgICApXG5cbiAgICBjb25zdCBkYXRhID0geyByZWY6IHJvb3RSZWYsIGNsYXNzOiBjbGFzc2VzLnZhbHVlIH1cblxuICAgIGlmIChjYW5BZGRGaWxlcy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7IG9uRHJhZ292ZXIsIG9uRHJhZ2xlYXZlIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIGRhdGEsIGNoaWxkcmVuKVxuICB9XG59XG4iLCJjb25zdCB0cnVlRm4gPSAoKSA9PiB0cnVlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlbWl0c0FycmF5KSB7XG4gIGNvbnN0IGVtaXRzT2JqZWN0ID0ge31cblxuICBlbWl0c0FycmF5LmZvckVhY2godmFsID0+IHtcbiAgICBlbWl0c09iamVjdFsgdmFsIF0gPSB0cnVlRm5cbiAgfSlcblxuICByZXR1cm4gZW1pdHNPYmplY3Rcbn1cbiIsImltcG9ydCB7IGNvcmVQcm9wcywgY29yZUVtaXRzLCBnZXRSZW5kZXJlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdXBsb2FkZXIvdXBsb2FkZXItY29yZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCBnZXRFbWl0c09iamVjdCBmcm9tICcuL3ByaXZhdGUvZ2V0LWVtaXRzLW9iamVjdC5qcydcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi9pcy5qcydcblxuY29uc3QgY29yZUVtaXRzT2JqZWN0ID0gZ2V0RW1pdHNPYmplY3QoY29yZUVtaXRzKVxuXG5leHBvcnQgZGVmYXVsdCAoeyBuYW1lLCBwcm9wcywgZW1pdHMsIGluamVjdFBsdWdpbiB9KSA9PiBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lLFxuXG4gIHByb3BzOiB7XG4gICAgLi4uY29yZVByb3BzLFxuICAgIC4uLnByb3BzXG4gIH0sXG5cbiAgZW1pdHM6IGlzT2JqZWN0KGVtaXRzKSA9PT0gdHJ1ZVxuICAgID8geyAuLi5jb3JlRW1pdHNPYmplY3QsIC4uLmVtaXRzIH1cbiAgICA6IFsgLi4uY29yZUVtaXRzLCAuLi5lbWl0cyBdLFxuXG4gIHNldHVwICgpIHtcbiAgICByZXR1cm4gZ2V0UmVuZGVyZXIoaW5qZWN0UGx1Z2luKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZnVuY3Rpb24gZ2V0Rm4gKHByb3ApIHtcbiAgcmV0dXJuIHR5cGVvZiBwcm9wID09PSAnZnVuY3Rpb24nXG4gICAgPyBwcm9wXG4gICAgOiAoKSA9PiBwcm9wXG59XG5cbmNvbnN0IHByb3BzID0ge1xuICB1cmw6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICBtZXRob2Q6IHtcbiAgICB0eXBlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAnUE9TVCdcbiAgfSxcbiAgZmllbGROYW1lOiB7XG4gICAgdHlwZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgcmV0dXJuIGZpbGUgPT4gZmlsZS5uYW1lXG4gICAgfVxuICB9LFxuICBoZWFkZXJzOiBbIEZ1bmN0aW9uLCBBcnJheSBdLFxuICBmb3JtRmllbGRzOiBbIEZ1bmN0aW9uLCBBcnJheSBdLFxuICB3aXRoQ3JlZGVudGlhbHM6IFsgRnVuY3Rpb24sIEJvb2xlYW4gXSxcbiAgc2VuZFJhdzogWyBGdW5jdGlvbiwgQm9vbGVhbiBdLFxuXG4gIGJhdGNoOiBbIEZ1bmN0aW9uLCBCb29sZWFuIF0sXG4gIGZhY3Rvcnk6IEZ1bmN0aW9uXG59XG5cbmNvbnN0IGVtaXRzID0gWyAnZmFjdG9yeS1mYWlsZWQnLCAndXBsb2FkZWQnLCAnZmFpbGVkJywgJ3VwbG9hZGluZycgXVxuXG5mdW5jdGlvbiBpbmplY3RQbHVnaW4gKHsgcHJvcHMsIGVtaXQsIGhlbHBlcnMgfSkge1xuICBjb25zdCB4aHJzID0gcmVmKFtdKVxuICBjb25zdCBwcm9taXNlcyA9IHJlZihbXSlcbiAgY29uc3Qgd29ya2luZ1RocmVhZHMgPSByZWYoMClcblxuICBjb25zdCB4aHJQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdXJsOiBnZXRGbihwcm9wcy51cmwpLFxuICAgIG1ldGhvZDogZ2V0Rm4ocHJvcHMubWV0aG9kKSxcbiAgICBoZWFkZXJzOiBnZXRGbihwcm9wcy5oZWFkZXJzKSxcbiAgICBmb3JtRmllbGRzOiBnZXRGbihwcm9wcy5mb3JtRmllbGRzKSxcbiAgICBmaWVsZE5hbWU6IGdldEZuKHByb3BzLmZpZWxkTmFtZSksXG4gICAgd2l0aENyZWRlbnRpYWxzOiBnZXRGbihwcm9wcy53aXRoQ3JlZGVudGlhbHMpLFxuICAgIHNlbmRSYXc6IGdldEZuKHByb3BzLnNlbmRSYXcpLFxuICAgIGJhdGNoOiBnZXRGbihwcm9wcy5iYXRjaClcbiAgfSkpXG5cbiAgY29uc3QgaXNVcGxvYWRpbmcgPSBjb21wdXRlZCgoKSA9PiB3b3JraW5nVGhyZWFkcy52YWx1ZSA+IDApXG4gIGNvbnN0IGlzQnVzeSA9IGNvbXB1dGVkKCgpID0+IHByb21pc2VzLnZhbHVlLmxlbmd0aCA+IDApXG5cbiAgbGV0IGFib3J0UHJvbWlzZXNcblxuICBmdW5jdGlvbiBhYm9ydCAoKSB7XG4gICAgeGhycy52YWx1ZS5mb3JFYWNoKHggPT4geyB4LmFib3J0KCkgfSlcblxuICAgIGlmIChwcm9taXNlcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBhYm9ydFByb21pc2VzID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwbG9hZCAoKSB7XG4gICAgY29uc3QgcXVldWUgPSBoZWxwZXJzLnF1ZXVlZEZpbGVzLnZhbHVlLnNsaWNlKDApXG4gICAgaGVscGVycy5xdWV1ZWRGaWxlcy52YWx1ZSA9IFtdXG5cbiAgICBpZiAoeGhyUHJvcHMudmFsdWUuYmF0Y2gocXVldWUpKSB7XG4gICAgICBydW5GYWN0b3J5KHF1ZXVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHF1ZXVlLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgIHJ1bkZhY3RvcnkoWyBmaWxlIF0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZhY3RvcnkgKGZpbGVzKSB7XG4gICAgd29ya2luZ1RocmVhZHMudmFsdWUrK1xuXG4gICAgaWYgKHR5cGVvZiBwcm9wcy5mYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwZXJmb3JtVXBsb2FkKGZpbGVzLCB7fSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IHByb3BzLmZhY3RvcnkoZmlsZXMpXG5cbiAgICBpZiAoIXJlcykge1xuICAgICAgZW1pdChcbiAgICAgICAgJ2ZhY3RvcnktZmFpbGVkJyxcbiAgICAgICAgbmV3IEVycm9yKCdRVXBsb2FkZXI6IGZhY3RvcnkoKSBkb2VzIG5vdCByZXR1cm4gcHJvcGVybHknKSxcbiAgICAgICAgZmlsZXNcbiAgICAgIClcbiAgICAgIHdvcmtpbmdUaHJlYWRzLnZhbHVlLS1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHJlcy5jYXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHByb21pc2VzLnZhbHVlLnB1c2gocmVzKVxuXG4gICAgICBjb25zdCBmYWlsZWQgPSBlcnIgPT4ge1xuICAgICAgICBpZiAoaGVscGVycy5pc0FsaXZlKCkgPT09IHRydWUpIHtcbiAgICAgICAgICBwcm9taXNlcy52YWx1ZSA9IHByb21pc2VzLnZhbHVlLmZpbHRlcihwID0+IHAgIT09IHJlcylcblxuICAgICAgICAgIGlmIChwcm9taXNlcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFib3J0UHJvbWlzZXMgPSBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGhlbHBlcnMucXVldWVkRmlsZXMudmFsdWUgPSBoZWxwZXJzLnF1ZXVlZEZpbGVzLnZhbHVlLmNvbmNhdChmaWxlcylcbiAgICAgICAgICBmaWxlcy5mb3JFYWNoKGYgPT4geyBoZWxwZXJzLnVwZGF0ZUZpbGVTdGF0dXMoZiwgJ2ZhaWxlZCcpIH0pXG5cbiAgICAgICAgICBlbWl0KCdmYWN0b3J5RmFpbGVkJywgZXJyLCBmaWxlcylcbiAgICAgICAgICB3b3JraW5nVGhyZWFkcy52YWx1ZS0tXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzLnRoZW4oZmFjdG9yeSA9PiB7XG4gICAgICAgIGlmIChhYm9ydFByb21pc2VzID09PSB0cnVlKSB7XG4gICAgICAgICAgZmFpbGVkKG5ldyBFcnJvcignQWJvcnRlZCcpKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhlbHBlcnMuaXNBbGl2ZSgpID09PSB0cnVlKSB7XG4gICAgICAgICAgcHJvbWlzZXMudmFsdWUgPSBwcm9taXNlcy52YWx1ZS5maWx0ZXIocCA9PiBwICE9PSByZXMpXG4gICAgICAgICAgcGVyZm9ybVVwbG9hZChmaWxlcywgZmFjdG9yeSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goZmFpbGVkKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBlcmZvcm1VcGxvYWQoZmlsZXMsIHJlcyB8fCB7fSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtVXBsb2FkIChmaWxlcywgZmFjdG9yeSkge1xuICAgIGNvbnN0XG4gICAgICBmb3JtID0gbmV3IEZvcm1EYXRhKCksXG4gICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgY29uc3QgZ2V0UHJvcCA9IChuYW1lLCBhcmcpID0+IHtcbiAgICAgIHJldHVybiBmYWN0b3J5WyBuYW1lIF0gIT09IHZvaWQgMFxuICAgICAgICA/IGdldEZuKGZhY3RvcnlbIG5hbWUgXSkoYXJnKVxuICAgICAgICA6IHhoclByb3BzLnZhbHVlWyBuYW1lIF0oYXJnKVxuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IGdldFByb3AoJ3VybCcsIGZpbGVzKVxuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3EtdXBsb2FkZXI6IGludmFsaWQgb3Igbm8gVVJMIHNwZWNpZmllZCcpXG4gICAgICB3b3JraW5nVGhyZWFkcy52YWx1ZS0tXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBmaWVsZHMgPSBnZXRQcm9wKCdmb3JtRmllbGRzJywgZmlsZXMpXG4gICAgZmllbGRzICE9PSB2b2lkIDAgJiYgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgZm9ybS5hcHBlbmQoZmllbGQubmFtZSwgZmllbGQudmFsdWUpXG4gICAgfSlcblxuICAgIGxldFxuICAgICAgdXBsb2FkSW5kZXggPSAwLFxuICAgICAgdXBsb2FkSW5kZXhTaXplID0gMCxcbiAgICAgIGxvY2FsVXBsb2FkZWRTaXplID0gMCxcbiAgICAgIG1heFVwbG9hZFNpemUgPSAwLFxuICAgICAgYWJvcnRlZFxuXG4gICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGUgPT4ge1xuICAgICAgaWYgKGFib3J0ZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgY29uc3QgbG9hZGVkID0gTWF0aC5taW4obWF4VXBsb2FkU2l6ZSwgZS5sb2FkZWQpXG5cbiAgICAgIGhlbHBlcnMudXBsb2FkZWRTaXplLnZhbHVlICs9IGxvYWRlZCAtIGxvY2FsVXBsb2FkZWRTaXplXG4gICAgICBsb2NhbFVwbG9hZGVkU2l6ZSA9IGxvYWRlZFxuXG4gICAgICBsZXQgc2l6ZSA9IGxvY2FsVXBsb2FkZWRTaXplIC0gdXBsb2FkSW5kZXhTaXplXG4gICAgICBmb3IgKGxldCBpID0gdXBsb2FkSW5kZXg7IHNpemUgPiAwICYmIGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIGZpbGUgPSBmaWxlc1sgaSBdLFxuICAgICAgICAgIHVwbG9hZGVkID0gc2l6ZSA+IGZpbGUuc2l6ZVxuXG4gICAgICAgIGlmICh1cGxvYWRlZCkge1xuICAgICAgICAgIHNpemUgLT0gZmlsZS5zaXplXG4gICAgICAgICAgdXBsb2FkSW5kZXgrK1xuICAgICAgICAgIHVwbG9hZEluZGV4U2l6ZSArPSBmaWxlLnNpemVcbiAgICAgICAgICBoZWxwZXJzLnVwZGF0ZUZpbGVTdGF0dXMoZmlsZSwgJ3VwbG9hZGluZycsIGZpbGUuc2l6ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoZWxwZXJzLnVwZGF0ZUZpbGVTdGF0dXMoZmlsZSwgJ3VwbG9hZGluZycsIHNpemUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBmYWxzZSlcblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPCA0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoeGhyLnN0YXR1cyAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIGhlbHBlcnMudXBsb2FkZWRGaWxlcy52YWx1ZSA9IGhlbHBlcnMudXBsb2FkZWRGaWxlcy52YWx1ZS5jb25jYXQoZmlsZXMpXG4gICAgICAgIGZpbGVzLmZvckVhY2goZiA9PiB7IGhlbHBlcnMudXBkYXRlRmlsZVN0YXR1cyhmLCAndXBsb2FkZWQnKSB9KVxuICAgICAgICBlbWl0KCd1cGxvYWRlZCcsIHsgZmlsZXMsIHhociB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlXG4gICAgICAgIGhlbHBlcnMudXBsb2FkZWRTaXplLnZhbHVlIC09IGxvY2FsVXBsb2FkZWRTaXplXG4gICAgICAgIGhlbHBlcnMucXVldWVkRmlsZXMudmFsdWUgPSBoZWxwZXJzLnF1ZXVlZEZpbGVzLnZhbHVlLmNvbmNhdChmaWxlcylcbiAgICAgICAgZmlsZXMuZm9yRWFjaChmID0+IHsgaGVscGVycy51cGRhdGVGaWxlU3RhdHVzKGYsICdmYWlsZWQnKSB9KVxuICAgICAgICBlbWl0KCdmYWlsZWQnLCB7IGZpbGVzLCB4aHIgfSlcbiAgICAgIH1cblxuICAgICAgd29ya2luZ1RocmVhZHMudmFsdWUtLVxuICAgICAgeGhycy52YWx1ZSA9IHhocnMudmFsdWUuZmlsdGVyKHggPT4geCAhPT0geGhyKVxuICAgIH1cblxuICAgIHhoci5vcGVuKFxuICAgICAgZ2V0UHJvcCgnbWV0aG9kJywgZmlsZXMpLFxuICAgICAgdXJsXG4gICAgKVxuXG4gICAgaWYgKGdldFByb3AoJ3dpdGhDcmVkZW50aWFscycsIGZpbGVzKSA9PT0gdHJ1ZSkge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0UHJvcCgnaGVhZGVycycsIGZpbGVzKVxuICAgIGhlYWRlcnMgIT09IHZvaWQgMCAmJiBoZWFkZXJzLmZvckVhY2goaGVhZCA9PiB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkLm5hbWUsIGhlYWQudmFsdWUpXG4gICAgfSlcblxuICAgIGNvbnN0IHNlbmRSYXcgPSBnZXRQcm9wKCdzZW5kUmF3JywgZmlsZXMpXG5cbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgaGVscGVycy51cGRhdGVGaWxlU3RhdHVzKGZpbGUsICd1cGxvYWRpbmcnLCAwKVxuICAgICAgaWYgKHNlbmRSYXcgIT09IHRydWUpIHtcbiAgICAgICAgZm9ybS5hcHBlbmQoZ2V0UHJvcCgnZmllbGROYW1lJywgZmlsZSksIGZpbGUsIGZpbGUubmFtZSlcbiAgICAgIH1cbiAgICAgIGZpbGUueGhyID0geGhyXG4gICAgICBmaWxlLl9fYWJvcnQgPSAoKSA9PiB7IHhoci5hYm9ydCgpIH1cbiAgICAgIG1heFVwbG9hZFNpemUgKz0gZmlsZS5zaXplXG4gICAgfSlcblxuICAgIGVtaXQoJ3VwbG9hZGluZycsIHsgZmlsZXMsIHhociB9KVxuICAgIHhocnMudmFsdWUucHVzaCh4aHIpXG5cbiAgICBpZiAoc2VuZFJhdyA9PT0gdHJ1ZSkge1xuICAgICAgeGhyLnNlbmQobmV3IEJsb2IoZmlsZXMpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHhoci5zZW5kKGZvcm0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpc1VwbG9hZGluZyxcbiAgICBpc0J1c3ksXG5cbiAgICBhYm9ydCxcbiAgICB1cGxvYWRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdRVXBsb2FkZXInLFxuICBwcm9wcyxcbiAgZW1pdHMsXG4gIGluamVjdFBsdWdpblxufVxuIiwiaW1wb3J0IGNyZWF0ZVVwbG9hZGVyQ29tcG9uZW50IGZyb20gJy4uLy4uL3V0aWxzL2NyZWF0ZS11cGxvYWRlci1jb21wb25lbnQuanMnXG5pbXBvcnQgeGhyVXBsb2FkZXJQbHVnaW4gZnJvbSAnLi94aHItdXBsb2FkZXItcGx1Z2luLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVVcGxvYWRlckNvbXBvbmVudCh4aHJVcGxvYWRlclBsdWdpbilcbiJdLCJuYW1lcyI6WyJwcm9wcyIsImVtaXRzIiwiaW5qZWN0UGx1Z2luIl0sIm1hcHBpbmdzIjoiOztBQUdPLE1BQU0seUJBQXlCO0FBQUEsRUFDcEMsR0FBRztBQUFBLEVBRUgsS0FBSztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFB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
