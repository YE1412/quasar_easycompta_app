/* eslint-disable */
var cryptModule = (() => {
  var _scriptDir = import.meta.url;

  return function (cryptModule) {
    cryptModule = cryptModule || {};

    var Module = typeof cryptModule != "undefined" ? cryptModule : {};
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise(function (resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    ["_rc_crypt", "_fflush", "onRuntimeInitialized"].forEach((prop) => {
      if (!Object.getOwnPropertyDescriptor(Module["ready"], prop)) {
        Object.defineProperty(Module["ready"], prop, {
          get: () =>
            abort(
              "You are getting " +
                prop +
                " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"
            ),
          set: () =>
            abort(
              "You are setting " +
                prop +
                " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"
            ),
        });
      }
    });
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE =
      typeof process == "object" &&
      typeof process.versions == "object" &&
      typeof process.versions.node == "string";
    var ENVIRONMENT_IS_SHELL =
      !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    if (Module["ENVIRONMENT"]) {
      throw new Error(
        "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"
      );
    }
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary, setWindowTitle;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      let toLog = e;
      if (e && typeof e == "object" && e.stack) {
        toLog = [e, e.stack];
      }
      err("exiting due to exception: " + toLog);
    }
    if (ENVIRONMENT_IS_NODE) {
      if (
        typeof process == "undefined" ||
        !process.release ||
        process.release.name !== "node"
      )
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require("path").dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = __dirname + "/";
      }
      var fs;
      var nodePath;
      var requireNodeFS = () => {
        if (!nodePath) {
          fs = require("fs");
          nodePath = require("path");
        }
      };
      read_ = (filename, binary) => {
        requireNodeFS();
        filename = nodePath["normalize"](filename);
        return fs.readFileSync(filename, binary ? undefined : "utf8");
      };
      readBinary = (filename) => {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      readAsync = (filename, onload, onerror) => {
        requireNodeFS();
        filename = nodePath["normalize"](filename);
        fs.readFile(filename, function (err, data) {
          if (err) onerror(err);
          else onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      process["on"]("uncaughtException", function (ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function (reason) {
        throw reason;
      });
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function () {
        return "[Emscripten Module object]";
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (
        (typeof process == "object" && typeof require === "function") ||
        typeof window == "object" ||
        typeof importScripts == "function"
      )
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      if (typeof read != "undefined") {
        read_ = function shell_read(f) {
          return read(f);
        };
      }
      readBinary = function readBinary(f) {
        let data;
        if (typeof readbuffer == "function") {
          return new Uint8Array(readbuffer(f));
        }
        data = read(f, "binary");
        assert(typeof data == "object");
        return data;
      };
      readAsync = function readAsync(f, onload, onerror) {
        setTimeout(() => onload(readBinary(f)), 0);
      };
      if (typeof scriptArgs != "undefined") {
        arguments_ = scriptArgs;
      } else if (typeof arguments != "undefined") {
        arguments_ = arguments;
      }
      if (typeof quit == "function") {
        quit_ = (status, toThrow) => {
          logExceptionOnExit(toThrow);
          quit(status);
        };
      }
      if (typeof print != "undefined") {
        if (typeof console == "undefined") console = {};
        console.log = print;
        console.warn = console.error =
          typeof printErr != "undefined" ? printErr : print;
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
        );
      } else {
        scriptDirectory = "";
      }
      if (!(typeof window == "object" || typeof importScripts == "function"))
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
      setWindowTitle = (title) => (document.title = title);
    } else {
      throw new Error("environment detection error");
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    checkIncomingModuleAPI();
    if (Module["arguments"]) arguments_ = Module["arguments"];
    legacyModuleProp("arguments", "arguments_");
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    legacyModuleProp("thisProgram", "thisProgram");
    if (Module["quit"]) quit_ = Module["quit"];
    legacyModuleProp("quit", "quit_");
    assert(
      typeof Module["memoryInitializerPrefixURL"] == "undefined",
      "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["pthreadMainPrefixURL"] == "undefined",
      "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["cdInitializerPrefixURL"] == "undefined",
      "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["filePackagePrefixURL"] == "undefined",
      "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["read"] == "undefined",
      "Module.read option was removed (modify read_ in JS)"
    );
    assert(
      typeof Module["readAsync"] == "undefined",
      "Module.readAsync option was removed (modify readAsync in JS)"
    );
    assert(
      typeof Module["readBinary"] == "undefined",
      "Module.readBinary option was removed (modify readBinary in JS)"
    );
    assert(
      typeof Module["setWindowTitle"] == "undefined",
      "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"
    );
    assert(
      typeof Module["TOTAL_MEMORY"] == "undefined",
      "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"
    );
    legacyModuleProp("read", "read_");
    legacyModuleProp("readAsync", "readAsync");
    legacyModuleProp("readBinary", "readBinary");
    legacyModuleProp("setWindowTitle", "setWindowTitle");
    assert(
      !ENVIRONMENT_IS_SHELL,
      "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable."
    );
    var POINTER_SIZE = 4;
    function legacyModuleProp(prop, newName) {
      if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, {
          configurable: true,
          get: function () {
            abort(
              "Module." +
                prop +
                " has been replaced with plain " +
                newName +
                " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      }
    }
    function ignoredModuleProp(prop) {
      if (Object.getOwnPropertyDescriptor(Module, prop)) {
        abort(
          "`Module." +
            prop +
            "` was supplied but `" +
            prop +
            "` not included in INCOMING_MODULE_JS_API"
        );
      }
    }
    function isExportedByForceFilesystem(name) {
      return (
        name === "FS_createPath" ||
        name === "FS_createDataFile" ||
        name === "FS_createPreloadedFile" ||
        name === "FS_unlink" ||
        name === "addRunDependency" ||
        name === "FS_createLazyFile" ||
        name === "FS_createDevice" ||
        name === "removeRunDependency"
      );
    }
    function missingLibrarySymbol(sym) {
      if (
        typeof globalThis !== "undefined" &&
        !Object.getOwnPropertyDescriptor(globalThis, sym)
      ) {
        Object.defineProperty(globalThis, sym, {
          configurable: true,
          get: function () {
            var msg =
              "`" +
              sym +
              "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
            if (isExportedByForceFilesystem(sym)) {
              msg +=
                ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
            }
            warnOnce(msg);
            return undefined;
          },
        });
      }
    }
    function unexportedRuntimeSymbol(sym) {
      if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Object.defineProperty(Module, sym, {
          configurable: true,
          get: function () {
            var msg =
              "'" +
              sym +
              "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
            if (isExportedByForceFilesystem(sym)) {
              msg +=
                ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
            }
            abort(msg);
          },
        });
      }
    }
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    legacyModuleProp("wasmBinary", "wasmBinary");
    var noExitRuntime = Module["noExitRuntime"] || true;
    legacyModuleProp("noExitRuntime", "noExitRuntime");
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    function getSafeHeapType(bytes, isFloat) {
      switch (bytes) {
        case 1:
          return "i8";
        case 2:
          return "i16";
        case 4:
          return isFloat ? "float" : "i32";
        case 8:
          return isFloat ? "double" : "i64";
        default:
          assert(0);
      }
    }
    function SAFE_HEAP_STORE(dest, value, bytes, isFloat) {
      if (dest <= 0)
        abort(
          "segmentation fault storing " + bytes + " bytes to address " + dest
        );
      if (dest % bytes !== 0)
        abort(
          "alignment error storing to address " +
            dest +
            ", which was expected to be aligned to a multiple of " +
            bytes
        );
      if (runtimeInitialized) {
        var brk = _sbrk() >>> 0;
        if (dest + bytes > brk)
          abort(
            "segmentation fault, exceeded the top of the available dynamic heap when storing " +
              bytes +
              " bytes to address " +
              dest +
              ". DYNAMICTOP=" +
              brk
          );
        assert(brk >= _emscripten_stack_get_base());
        assert(brk <= HEAP8.length);
      }
      setValue_safe(dest, value, getSafeHeapType(bytes, isFloat));
      return value;
    }
    function SAFE_HEAP_STORE_D(dest, value, bytes) {
      return SAFE_HEAP_STORE(dest, value, bytes, true);
    }
    function SAFE_HEAP_LOAD(dest, bytes, unsigned, isFloat) {
      if (dest <= 0)
        abort(
          "segmentation fault loading " + bytes + " bytes from address " + dest
        );
      if (dest % bytes !== 0)
        abort(
          "alignment error loading from address " +
            dest +
            ", which was expected to be aligned to a multiple of " +
            bytes
        );
      if (runtimeInitialized) {
        var brk = _sbrk() >>> 0;
        if (dest + bytes > brk)
          abort(
            "segmentation fault, exceeded the top of the available dynamic heap when loading " +
              bytes +
              " bytes from address " +
              dest +
              ". DYNAMICTOP=" +
              brk
          );
        assert(brk >= _emscripten_stack_get_base());
        assert(brk <= HEAP8.length);
      }
      var type = getSafeHeapType(bytes, isFloat);
      var ret = getValue_safe(dest, type);
      if (unsigned) ret = unSign(ret, parseInt(type.substr(1), 10));
      return ret;
    }
    function SAFE_HEAP_LOAD_D(dest, bytes, unsigned) {
      return SAFE_HEAP_LOAD(dest, bytes, unsigned, true);
    }
    function segfault() {
      abort("segmentation fault");
    }
    function alignfault() {
      abort("alignment fault");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed" + (text ? ": " + text : ""));
      }
    }
    var UTF8Decoder =
      typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 248) != 240)
            warnOnce(
              "Invalid UTF-8 leading byte 0x" +
                u0.toString(16) +
                " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"
            );
          u0 =
            ((u0 & 7) << 18) |
            (u1 << 12) |
            (u2 << 6) |
            (heapOrArray[idx++] & 63);
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | (u >> 6);
          heap[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | (u >> 12);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 1114111)
            warnOnce(
              "Invalid Unicode code point 0x" +
                u.toString(16) +
                " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."
            );
          heap[outIdx++] = 240 | (u >> 18);
          heap[outIdx++] = 128 | ((u >> 12) & 63);
          heap[outIdx++] = 128 | ((u >> 6) & 63);
          heap[outIdx++] = 128 | (u & 63);
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      assert(
        typeof maxBytesToWrite == "number",
        "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
      );
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    var buffer,
      HEAP8,
      HEAPU8,
      HEAP16,
      HEAPU16,
      HEAP32,
      HEAPU32,
      HEAPF32,
      HEAPF64;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = HEAP16 = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
    }
    var TOTAL_STACK = 5242880;
    if (Module["TOTAL_STACK"])
      assert(
        TOTAL_STACK === Module["TOTAL_STACK"],
        "the stack size can no longer be determined at runtime"
      );
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
    legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
    assert(
      INITIAL_MEMORY >= TOTAL_STACK,
      "INITIAL_MEMORY should be larger than TOTAL_STACK, was " +
        INITIAL_MEMORY +
        "! (TOTAL_STACK=" +
        TOTAL_STACK +
        ")"
    );
    assert(
      typeof Int32Array != "undefined" &&
        typeof Float64Array !== "undefined" &&
        Int32Array.prototype.subarray != undefined &&
        Int32Array.prototype.set != undefined,
      "JS engine does not provide full typed array support"
    );
    assert(
      !Module["wasmMemory"],
      "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"
    );
    assert(
      INITIAL_MEMORY == 16777216,
      "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"
    );
    var wasmTable;
    function writeStackCookie() {
      var max = _emscripten_stack_get_end();
      assert((max & 3) == 0);
      SAFE_HEAP_STORE((max >> 2) * 4, 34821223, 4);
      SAFE_HEAP_STORE(((max + 4) >> 2) * 4, 2310721022, 4);
    }
    function checkStackCookie() {
      if (ABORT) return;
      var max = _emscripten_stack_get_end();
      var cookie1 = SAFE_HEAP_LOAD((max >> 2) * 4, 4, 1);
      var cookie2 = SAFE_HEAP_LOAD(((max + 4) >> 2) * 4, 4, 1);
      if (cookie1 != 34821223 || cookie2 != 2310721022) {
        abort(
          "Stack overflow! Stack cookie has been overwritten at 0x" +
            max.toString(16) +
            ", expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" +
            cookie2.toString(16) +
            " 0x" +
            cookie1.toString(16)
        );
      }
    }
    (function () {
      var h16 = new Int16Array(1);
      var h8 = new Int8Array(h16.buffer);
      h16[0] = 25459;
      if (h8[0] !== 115 || h8[1] !== 99)
        throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
    })();
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function keepRuntimeAlive() {
      return noExitRuntime;
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      assert(!runtimeInitialized);
      runtimeInitialized = true;
      checkStackCookie();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      checkStackCookie();
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    assert(
      Math.imul,
      "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.fround,
      "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.clz32,
      "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.trunc,
      "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    var runDependencyTracking = {};
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(!runDependencyTracking[id]);
        runDependencyTracking[id] = 1;
        if (
          runDependencyWatcher === null &&
          typeof setInterval != "undefined"
        ) {
          runDependencyWatcher = setInterval(function () {
            if (ABORT) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
              return;
            }
            var shown = false;
            for (var dep in runDependencyTracking) {
              if (!shown) {
                shown = true;
                err("still waiting on run dependencies:");
              }
              err("dependency: " + dep);
            }
            if (shown) {
              err("(end of list)");
            }
          }, 1e4);
        }
      } else {
        err("warning: run dependency added without ID");
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(runDependencyTracking[id]);
        delete runDependencyTracking[id];
      } else {
        err("warning: run dependency removed without ID");
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var FS = {
      error: function () {
        abort(
          "Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM"
        );
      },
      init: function () {
        FS.error();
      },
      createDataFile: function () {
        FS.error();
      },
      createPreloadedFile: function () {
        FS.error();
      },
      createLazyFile: function () {
        FS.error();
      },
      open: function () {
        FS.error();
      },
      mkdev: function () {
        FS.error();
      },
      registerDevice: function () {
        FS.error();
      },
      analyzePath: function () {
        FS.error();
      },
      loadFilesFromDB: function () {
        FS.error();
      },
      ErrnoError: function ErrnoError() {
        FS.error();
      },
    };
    Module["FS_createDataFile"] = FS.createDataFile;
    Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    function isFileURI(filename) {
      return filename.startsWith("file://");
    }
    function createExportWrapper(name, fixedasm) {
      return function () {
        var displayName = name;
        var asm = fixedasm;
        if (!fixedasm) {
          asm = Module["asm"];
        }
        assert(
          runtimeInitialized,
          "native function `" +
            displayName +
            "` called before runtime initialization"
        );
        if (!asm[name]) {
          assert(
            asm[name],
            "exported native function `" + displayName + "` not found"
          );
        }
        return asm[name].apply(null, arguments);
      };
    }
    var wasmBinaryFile;
    if (Module["locateFile"]) {
      wasmBinaryFile = "rc_crypt.wasm";
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }
    } else {
      wasmBinaryFile = new URL("rc_crypt.wasm", import.meta.url).toString();
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      } catch (err) {
        abort(err);
      }
    }
    function getBinaryPromise() {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" })
            .then(function (response) {
              if (!response["ok"]) {
                throw (
                  "failed to load wasm binary file at '" + wasmBinaryFile + "'"
                );
              }
              return response["arrayBuffer"]();
            })
            .catch(function () {
              return getBinary(wasmBinaryFile);
            });
        } else {
          if (readAsync) {
            return new Promise(function (resolve, reject) {
              readAsync(
                wasmBinaryFile,
                function (response) {
                  resolve(new Uint8Array(response));
                },
                reject
              );
            });
          }
        }
      }
      return Promise.resolve().then(function () {
        return getBinary(wasmBinaryFile);
      });
    }
    function createWasm() {
      var info = { env: asmLibraryArg, wasi_snapshot_preview1: asmLibraryArg };
      function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module["asm"] = exports;
        wasmMemory = Module["asm"]["memory"];
        assert(wasmMemory, "memory not found in wasm exports");
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["__indirect_function_table"];
        assert(wasmTable, "table not found in wasm exports");
        addOnInit(Module["asm"]["__wasm_call_ctors"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      var trueModule = Module;
      function receiveInstantiationResult(result) {
        assert(
          Module === trueModule,
          "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"
        );
        trueModule = null;
        receiveInstance(result["instance"]);
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise()
          .then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          })
          .then(function (instance) {
            return instance;
          })
          .then(receiver, function (reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            if (isFileURI(wasmBinaryFile)) {
              err(
                "warning: Loading from a file URI (" +
                  wasmBinaryFile +
                  ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing"
              );
            }
            abort(reason);
          });
      }
      function instantiateAsync() {
        if (
          !wasmBinary &&
          typeof WebAssembly.instantiateStreaming == "function" &&
          !isDataURI(wasmBinaryFile) &&
          !isFileURI(wasmBinaryFile) &&
          !ENVIRONMENT_IS_NODE &&
          typeof fetch == "function"
        ) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
            function (response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiationResult, function (reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(receiveInstantiationResult);
              });
            }
          );
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      }
      if (Module["instantiateWasm"]) {
        try {
          var exports = Module["instantiateWasm"](info, receiveInstance);
          return exports;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          readyPromiseReject(e);
        }
      }
      instantiateAsync().catch(readyPromiseReject);
      return {};
    }
    var tempDouble;
    var tempI64;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    }
    function demangle(func) {
      warnOnce(
        "warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling"
      );
      return func;
    }
    function demangleAll(text) {
      var regex = /\b_Z[\w\d_]+/g;
      return text.replace(regex, function (x) {
        var y = demangle(x);
        return x === y ? x : y + " [" + x + "]";
      });
    }
    function getValue_safe(ptr, type) {
      switch (type) {
        case "i1":
          return HEAP8[ptr >> 0];
        case "i8":
          return HEAP8[ptr >> 0];
        case "i16":
          return HEAP16[ptr >> 1];
        case "i32":
          return HEAP32[ptr >> 2];
        case "i64":
          return HEAP32[ptr >> 2];
        case "float":
          return HEAPF32[ptr >> 2];
        case "double":
          return HEAPF64[ptr >> 3];
        default:
          abort("invalid type for getValue: " + type);
      }
    }
    function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        try {
          throw new Error();
        } catch (e) {
          error = e;
        }
        if (!error.stack) {
          return "(no stack trace available)";
        }
      }
      return error.stack.toString();
    }
    function setValue_safe(ptr, value, type) {
      switch (type) {
        case "i1":
          HEAP8[ptr >> 0] = value;
          break;
        case "i8":
          HEAP8[ptr >> 0] = value;
          break;
        case "i16":
          HEAP16[ptr >> 1] = value;
          break;
        case "i32":
          HEAP32[ptr >> 2] = value;
          break;
        case "i64":
          (tempI64 = [
            value >>> 0,
            ((tempDouble = value),
            +Math.abs(tempDouble) >= 1
              ? tempDouble > 0
                ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                    0) >>>
                  0
                : ~~+Math.ceil(
                    (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
                  ) >>> 0
              : 0),
          ]),
            (HEAP32[ptr >> 2] = tempI64[0]),
            (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
          break;
        case "float":
          HEAPF32[ptr >> 2] = value;
          break;
        case "double":
          HEAPF64[ptr >> 3] = value;
          break;
        default:
          abort("invalid type for setValue: " + type);
      }
    }
    function unSign(value, bits) {
      if (value >= 0) {
        return value;
      }
      return bits <= 32
        ? 2 * Math.abs(1 << (bits - 1)) + value
        : Math.pow(2, bits) + value;
    }
    function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
        err(text);
      }
    }
    function writeArrayToMemory(array, buffer) {
      assert(
        array.length >= 0,
        "writeArrayToMemory array must have a length (should be an array or typed array)"
      );
      HEAP8.set(array, buffer);
    }
    function getHeapMax() {
      return 2147483648;
    }
    function emscripten_realloc_buffer(size) {
      try {
        wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1;
      } catch (e) {
        err(
          "emscripten_realloc_buffer: Attempted to grow heap from " +
            buffer.byteLength +
            " bytes to " +
            size +
            " bytes, but got error: " +
            e
        );
      }
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      assert(requestedSize > oldSize);
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(
          "Cannot enlarge memory, asked to go up to " +
            requestedSize +
            " bytes, but the limit is " +
            maxHeapSize +
            " bytes!"
        );
        return false;
      }
      let alignUp = (x, multiple) =>
        x + ((multiple - (x % multiple)) % multiple);
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(
          overGrownHeapSize,
          requestedSize + 100663296
        );
        var newSize = Math.min(
          maxHeapSize,
          alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
          return true;
        }
      }
      err(
        "Failed to grow the heap from " +
          oldSize +
          " bytes to " +
          newSize +
          " bytes, not enough memory!"
      );
      return false;
    }
    var SYSCALLS = {
      varargs: undefined,
      get: function () {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = SAFE_HEAP_LOAD(((SYSCALLS.varargs - 4) >> 2) * 4, 4, 0);
        return ret;
      },
      getStr: function (ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
    };
    function _fd_close(fd) {
      abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      return 70;
    }
    var printCharBuffers = [null, [], []];
    function printChar(stream, curr) {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    }
    function flush_NO_FILESYSTEM() {
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = SAFE_HEAP_LOAD((iov >> 2) * 4, 4, 1);
        var len = SAFE_HEAP_LOAD(((iov + 4) >> 2) * 4, 4, 1);
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, SAFE_HEAP_LOAD(ptr + j, 1, 1));
        }
        num += len;
      }
      SAFE_HEAP_STORE((pnum >> 2) * 4, num, 4);
      return 0;
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      assert(
        func,
        "Cannot call unknown function " + ident + ", make sure it is exported"
      );
      return func;
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) {
            var len = (str.length << 2) + 1;
            ret = stackAlloc(len);
            stringToUTF8(str, ret, len);
          }
          return ret;
        },
        array: (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        },
      };
      function convertReturnValue(ret) {
        if (returnType === "string") {
          return UTF8ToString(ret);
        }
        if (returnType === "boolean") return Boolean(ret);
        return ret;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== "array", 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
      ret = onDone(ret);
      return ret;
    }
    function cwrap(ident, returnType, argTypes, opts) {
      return function () {
        return ccall(ident, returnType, argTypes, arguments, opts);
      };
    }
    function checkIncomingModuleAPI() {
      ignoredModuleProp("fetchSettings");
    }
    var asmLibraryArg = {
      alignfault: alignfault,
      emscripten_resize_heap: _emscripten_resize_heap,
      fd_close: _fd_close,
      fd_seek: _fd_seek,
      fd_write: _fd_write,
      segfault: segfault,
    };
    var asm = createWasm();
    var ___wasm_call_ctors = (Module["___wasm_call_ctors"] =
      createExportWrapper("__wasm_call_ctors"));
    var _rc_crypt = (Module["_rc_crypt"] = createExportWrapper("rc_crypt"));
    var ___errno_location = (Module["___errno_location"] =
      createExportWrapper("__errno_location"));
    var _fflush = (Module["_fflush"] = createExportWrapper("fflush"));
    var _sbrk = (Module["_sbrk"] = createExportWrapper("sbrk"));
    var _emscripten_get_sbrk_ptr = (Module["_emscripten_get_sbrk_ptr"] =
      createExportWrapper("emscripten_get_sbrk_ptr"));
    var _emscripten_stack_init = (Module["_emscripten_stack_init"] =
      function () {
        return (_emscripten_stack_init = Module["_emscripten_stack_init"] =
          Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
      });
    var _emscripten_stack_get_free = (Module["_emscripten_stack_get_free"] =
      function () {
        return (_emscripten_stack_get_free = Module[
          "_emscripten_stack_get_free"
        ] =
          Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
      });
    var _emscripten_stack_get_base = (Module["_emscripten_stack_get_base"] =
      function () {
        return (_emscripten_stack_get_base = Module[
          "_emscripten_stack_get_base"
        ] =
          Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
      });
    var _emscripten_stack_get_end = (Module["_emscripten_stack_get_end"] =
      function () {
        return (_emscripten_stack_get_end = Module[
          "_emscripten_stack_get_end"
        ] =
          Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
      });
    var stackSave = (Module["stackSave"] = createExportWrapper("stackSave"));
    var stackRestore = (Module["stackRestore"] =
      createExportWrapper("stackRestore"));
    var stackAlloc = (Module["stackAlloc"] = createExportWrapper("stackAlloc"));
    var dynCall_jiji = (Module["dynCall_jiji"] =
      createExportWrapper("dynCall_jiji"));
    Module["ccall"] = ccall;
    Module["cwrap"] = cwrap;
    var unexportedRuntimeSymbols = [
      "run",
      "UTF8ArrayToString",
      "UTF8ToString",
      "stringToUTF8Array",
      "stringToUTF8",
      "lengthBytesUTF8",
      "addOnPreRun",
      "addOnInit",
      "addOnPreMain",
      "addOnExit",
      "addOnPostRun",
      "addRunDependency",
      "removeRunDependency",
      "FS_createFolder",
      "FS_createPath",
      "FS_createDataFile",
      "FS_createPreloadedFile",
      "FS_createLazyFile",
      "FS_createLink",
      "FS_createDevice",
      "FS_unlink",
      "getLEB",
      "getFunctionTables",
      "alignFunctionTables",
      "registerFunctions",
      "prettyPrint",
      "getCompilerSetting",
      "print",
      "printErr",
      "callMain",
      "abort",
      "keepRuntimeAlive",
      "wasmMemory",
      "stackAlloc",
      "stackSave",
      "stackRestore",
      "getTempRet0",
      "setTempRet0",
      "writeStackCookie",
      "checkStackCookie",
      "ptrToString",
      "zeroMemory",
      "stringToNewUTF8",
      "exitJS",
      "getHeapMax",
      "emscripten_realloc_buffer",
      "ENV",
      "ERRNO_CODES",
      "ERRNO_MESSAGES",
      "setErrNo",
      "inetPton4",
      "inetNtop4",
      "inetPton6",
      "inetNtop6",
      "readSockaddr",
      "writeSockaddr",
      "DNS",
      "getHostByName",
      "Protocols",
      "Sockets",
      "getRandomDevice",
      "warnOnce",
      "traverseStack",
      "UNWIND_CACHE",
      "convertPCtoSourceLocation",
      "readAsmConstArgsArray",
      "readAsmConstArgs",
      "mainThreadEM_ASM",
      "jstoi_q",
      "jstoi_s",
      "getExecutableName",
      "listenOnce",
      "autoResumeAudioContext",
      "dynCallLegacy",
      "getDynCaller",
      "dynCall",
      "handleException",
      "runtimeKeepalivePush",
      "runtimeKeepalivePop",
      "callUserCallback",
      "maybeExit",
      "safeSetTimeout",
      "asmjsMangle",
      "asyncLoad",
      "alignMemory",
      "mmapAlloc",
      "writeI53ToI64",
      "writeI53ToI64Clamped",
      "writeI53ToI64Signaling",
      "writeI53ToU64Clamped",
      "writeI53ToU64Signaling",
      "readI53FromI64",
      "readI53FromU64",
      "convertI32PairToI53",
      "convertI32PairToI53Checked",
      "convertU32PairToI53",
      "getCFunc",
      "uleb128Encode",
      "sigToWasmTypes",
      "generateFuncType",
      "convertJsFunctionToWasm",
      "freeTableIndexes",
      "functionsInTableMap",
      "getEmptyTableSlot",
      "updateTableMap",
      "addFunction",
      "removeFunction",
      "reallyNegative",
      "unSign",
      "strLen",
      "reSign",
      "formatString",
      "setValue",
      "getValue",
      "PATH",
      "PATH_FS",
      "intArrayFromString",
      "intArrayToString",
      "AsciiToString",
      "stringToAscii",
      "UTF16Decoder",
      "UTF16ToString",
      "stringToUTF16",
      "lengthBytesUTF16",
      "UTF32ToString",
      "stringToUTF32",
      "lengthBytesUTF32",
      "allocateUTF8",
      "allocateUTF8OnStack",
      "writeStringToMemory",
      "writeArrayToMemory",
      "writeAsciiToMemory",
      "SYSCALLS",
      "getSocketFromFD",
      "getSocketAddress",
      "JSEvents",
      "registerKeyEventCallback",
      "specialHTMLTargets",
      "maybeCStringToJsString",
      "findEventTarget",
      "findCanvasEventTarget",
      "getBoundingClientRect",
      "fillMouseEventData",
      "registerMouseEventCallback",
      "registerWheelEventCallback",
      "registerUiEventCallback",
      "registerFocusEventCallback",
      "fillDeviceOrientationEventData",
      "registerDeviceOrientationEventCallback",
      "fillDeviceMotionEventData",
      "registerDeviceMotionEventCallback",
      "screenOrientation",
      "fillOrientationChangeEventData",
      "registerOrientationChangeEventCallback",
      "fillFullscreenChangeEventData",
      "registerFullscreenChangeEventCallback",
      "JSEvents_requestFullscreen",
      "JSEvents_resizeCanvasForFullscreen",
      "registerRestoreOldStyle",
      "hideEverythingExceptGivenElement",
      "restoreHiddenElements",
      "setLetterbox",
      "currentFullscreenStrategy",
      "restoreOldWindowedStyle",
      "softFullscreenResizeWebGLRenderTarget",
      "doRequestFullscreen",
      "fillPointerlockChangeEventData",
      "registerPointerlockChangeEventCallback",
      "registerPointerlockErrorEventCallback",
      "requestPointerLock",
      "fillVisibilityChangeEventData",
      "registerVisibilityChangeEventCallback",
      "registerTouchEventCallback",
      "fillGamepadEventData",
      "registerGamepadEventCallback",
      "registerBeforeUnloadEventCallback",
      "fillBatteryEventData",
      "battery",
      "registerBatteryEventCallback",
      "setCanvasElementSize",
      "getCanvasElementSize",
      "demangle",
      "demangleAll",
      "jsStackTrace",
      "stackTrace",
      "ExitStatus",
      "getEnvStrings",
      "checkWasiClock",
      "flush_NO_FILESYSTEM",
      "dlopenMissingError",
      "createDyncallWrapper",
      "setImmediateWrapped",
      "clearImmediateWrapped",
      "polyfillSetImmediate",
      "uncaughtExceptionCount",
      "exceptionLast",
      "exceptionCaught",
      "ExceptionInfo",
      "exception_addRef",
      "exception_decRef",
      "Browser",
      "setMainLoop",
      "wget",
      "FS",
      "MEMFS",
      "TTY",
      "PIPEFS",
      "SOCKFS",
      "_setNetworkCallback",
      "tempFixedLengthArray",
      "miniTempWebGLFloatBuffers",
      "heapObjectForWebGLType",
      "heapAccessShiftForWebGLHeap",
      "GL",
      "emscriptenWebGLGet",
      "computeUnpackAlignedImageSize",
      "emscriptenWebGLGetTexPixelData",
      "emscriptenWebGLGetUniform",
      "webglGetUniformLocation",
      "webglPrepareUniformLocationsBeforeFirstUse",
      "webglGetLeftBracePos",
      "emscriptenWebGLGetVertexAttrib",
      "writeGLArray",
      "AL",
      "SDL_unicode",
      "SDL_ttfContext",
      "SDL_audio",
      "SDL",
      "SDL_gfx",
      "GLUT",
      "EGL",
      "GLFW_Window",
      "GLFW",
      "GLEW",
      "IDBStore",
      "runAndAbortIfError",
      "ALLOC_NORMAL",
      "ALLOC_STACK",
      "allocate",
    ];
    unexportedRuntimeSymbols.forEach(unexportedRuntimeSymbol);
    var missingLibrarySymbols = [
      "ptrToString",
      "zeroMemory",
      "stringToNewUTF8",
      "exitJS",
      "setErrNo",
      "inetPton4",
      "inetNtop4",
      "inetPton6",
      "inetNtop6",
      "readSockaddr",
      "writeSockaddr",
      "getHostByName",
      "getRandomDevice",
      "traverseStack",
      "convertPCtoSourceLocation",
      "readAsmConstArgs",
      "mainThreadEM_ASM",
      "jstoi_q",
      "jstoi_s",
      "getExecutableName",
      "listenOnce",
      "autoResumeAudioContext",
      "dynCallLegacy",
      "getDynCaller",
      "dynCall",
      "runtimeKeepalivePush",
      "runtimeKeepalivePop",
      "callUserCallback",
      "maybeExit",
      "safeSetTimeout",
      "asmjsMangle",
      "asyncLoad",
      "alignMemory",
      "mmapAlloc",
      "writeI53ToI64",
      "writeI53ToI64Clamped",
      "writeI53ToI64Signaling",
      "writeI53ToU64Clamped",
      "writeI53ToU64Signaling",
      "readI53FromI64",
      "readI53FromU64",
      "convertI32PairToI53",
      "convertU32PairToI53",
      "uleb128Encode",
      "sigToWasmTypes",
      "generateFuncType",
      "convertJsFunctionToWasm",
      "getEmptyTableSlot",
      "updateTableMap",
      "addFunction",
      "removeFunction",
      "reallyNegative",
      "strLen",
      "reSign",
      "formatString",
      "intArrayFromString",
      "intArrayToString",
      "AsciiToString",
      "stringToAscii",
      "UTF16ToString",
      "stringToUTF16",
      "lengthBytesUTF16",
      "UTF32ToString",
      "stringToUTF32",
      "lengthBytesUTF32",
      "allocateUTF8",
      "allocateUTF8OnStack",
      "writeStringToMemory",
      "writeAsciiToMemory",
      "getSocketFromFD",
      "getSocketAddress",
      "registerKeyEventCallback",
      "maybeCStringToJsString",
      "findEventTarget",
      "findCanvasEventTarget",
      "getBoundingClientRect",
      "fillMouseEventData",
      "registerMouseEventCallback",
      "registerWheelEventCallback",
      "registerUiEventCallback",
      "registerFocusEventCallback",
      "fillDeviceOrientationEventData",
      "registerDeviceOrientationEventCallback",
      "fillDeviceMotionEventData",
      "registerDeviceMotionEventCallback",
      "screenOrientation",
      "fillOrientationChangeEventData",
      "registerOrientationChangeEventCallback",
      "fillFullscreenChangeEventData",
      "registerFullscreenChangeEventCallback",
      "JSEvents_requestFullscreen",
      "JSEvents_resizeCanvasForFullscreen",
      "registerRestoreOldStyle",
      "hideEverythingExceptGivenElement",
      "restoreHiddenElements",
      "setLetterbox",
      "softFullscreenResizeWebGLRenderTarget",
      "doRequestFullscreen",
      "fillPointerlockChangeEventData",
      "registerPointerlockChangeEventCallback",
      "registerPointerlockErrorEventCallback",
      "requestPointerLock",
      "fillVisibilityChangeEventData",
      "registerVisibilityChangeEventCallback",
      "registerTouchEventCallback",
      "fillGamepadEventData",
      "registerGamepadEventCallback",
      "registerBeforeUnloadEventCallback",
      "fillBatteryEventData",
      "battery",
      "registerBatteryEventCallback",
      "setCanvasElementSize",
      "getCanvasElementSize",
      "getEnvStrings",
      "checkWasiClock",
      "createDyncallWrapper",
      "setImmediateWrapped",
      "clearImmediateWrapped",
      "polyfillSetImmediate",
      "ExceptionInfo",
      "exception_addRef",
      "exception_decRef",
      "setMainLoop",
      "_setNetworkCallback",
      "heapObjectForWebGLType",
      "heapAccessShiftForWebGLHeap",
      "emscriptenWebGLGet",
      "computeUnpackAlignedImageSize",
      "emscriptenWebGLGetTexPixelData",
      "emscriptenWebGLGetUniform",
      "webglGetUniformLocation",
      "webglPrepareUniformLocationsBeforeFirstUse",
      "webglGetLeftBracePos",
      "emscriptenWebGLGetVertexAttrib",
      "writeGLArray",
      "SDL_unicode",
      "SDL_ttfContext",
      "SDL_audio",
      "GLFW_Window",
      "runAndAbortIfError",
      "ALLOC_NORMAL",
      "ALLOC_STACK",
      "allocate",
    ];
    missingLibrarySymbols.forEach(missingLibrarySymbol);
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function stackCheckInit() {
      _emscripten_stack_init();
      writeStackCookie();
    }
    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      stackCheckInit();
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        assert(
          !Module["_main"],
          'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'
        );
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function () {
          setTimeout(function () {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
      checkStackCookie();
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();

    return cryptModule.ready;
  };
})();
export default cryptModule;
