import { c as commonjsGlobal } from "./_commonjsHelpers.js";
import { _ as _typeof, R as RGBColor, r as requestAnimationFrame, a as _, p as processCanvasRGBA } from "./PdfComponent.js";
import "./index.js";
import "./use-quasar.js";
import "./index4.js";
import "./index2.js";
import "./WasmModules.js";
import "./invoice.js";
import "./invoice.service.js";
import "./counter.js";
import "./service.service.js";
import "./session.js";
import "./session.service.js";
var check = function(it) {
  return it && it.Math == Math && it;
};
var global$l = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var objectGetOwnPropertyDescriptor = {};
var fails$l = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$k = fails$l;
var descriptors = !fails$k(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var fails$j = fails$l;
var functionBindNative = !fails$j(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$3 = functionBindNative;
var call$j = Function.prototype.call;
var functionCall = NATIVE_BIND$3 ? call$j.bind(call$j) : function() {
  return call$j.apply(call$j, arguments);
};
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$4(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var createPropertyDescriptor$4 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var NATIVE_BIND$2 = functionBindNative;
var FunctionPrototype$2 = Function.prototype;
var call$i = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$i, call$i);
var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function(fn) {
  return function() {
    return call$i.apply(fn, arguments);
  };
};
var uncurryThis$o = functionUncurryThis;
var toString$b = uncurryThis$o({}.toString);
var stringSlice$6 = uncurryThis$o("".slice);
var classofRaw$2 = function(it) {
  return stringSlice$6(toString$b(it), 8, -1);
};
var uncurryThis$n = functionUncurryThis;
var fails$i = fails$l;
var classof$8 = classofRaw$2;
var $Object$4 = Object;
var split = uncurryThis$n("".split);
var indexedObject = fails$i(function() {
  return !$Object$4("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$8(it) == "String" ? split(it, "") : $Object$4(it);
} : $Object$4;
var isNullOrUndefined$7 = function(it) {
  return it === null || it === void 0;
};
var isNullOrUndefined$6 = isNullOrUndefined$7;
var $TypeError$f = TypeError;
var requireObjectCoercible$a = function(it) {
  if (isNullOrUndefined$6(it))
    throw $TypeError$f("Can't call method on " + it);
  return it;
};
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$9 = requireObjectCoercible$a;
var toIndexedObject$5 = function(it) {
  return IndexedObject$1(requireObjectCoercible$9(it));
};
var documentAll$2 = typeof document == "object" && document.all;
var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA
};
var $documentAll$1 = documentAll_1;
var documentAll$1 = $documentAll$1.all;
var isCallable$m = $documentAll$1.IS_HTMLDDA ? function(argument) {
  return typeof argument == "function" || argument === documentAll$1;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$l = isCallable$m;
var $documentAll = documentAll_1;
var documentAll = $documentAll.all;
var isObject$9 = $documentAll.IS_HTMLDDA ? function(it) {
  return typeof it == "object" ? it !== null : isCallable$l(it) || it === documentAll;
} : function(it) {
  return typeof it == "object" ? it !== null : isCallable$l(it);
};
var global$k = global$l;
var isCallable$k = isCallable$m;
var aFunction = function(argument) {
  return isCallable$k(argument) ? argument : void 0;
};
var getBuiltIn$8 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$k[namespace]) : global$k[namespace] && global$k[namespace][method];
};
var uncurryThis$m = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$m({}.isPrototypeOf);
var getBuiltIn$7 = getBuiltIn$8;
var engineUserAgent = getBuiltIn$7("navigator", "userAgent") || "";
var global$j = global$l;
var userAgent$3 = engineUserAgent;
var process$4 = global$j.process;
var Deno$1 = global$j.Deno;
var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION$1 = engineV8Version;
var fails$h = fails$l;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$h(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$3 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$6("Symbol");
  return isCallable$j($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$3(it));
};
var $String$3 = String;
var tryToString$4 = function(argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$i = isCallable$m;
var tryToString$3 = tryToString$4;
var $TypeError$e = TypeError;
var aCallable$8 = function(argument) {
  if (isCallable$i(argument))
    return argument;
  throw $TypeError$e(tryToString$3(argument) + " is not a function");
};
var aCallable$7 = aCallable$8;
var isNullOrUndefined$5 = isNullOrUndefined$7;
var getMethod$6 = function(V, P) {
  var func = V[P];
  return isNullOrUndefined$5(func) ? void 0 : aCallable$7(func);
};
var call$h = functionCall;
var isCallable$h = isCallable$m;
var isObject$8 = isObject$9;
var $TypeError$d = TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$h(fn = input.toString) && !isObject$8(val = call$h(fn, input)))
    return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$8(val = call$h(fn, input)))
    return val;
  if (pref !== "string" && isCallable$h(fn = input.toString) && !isObject$8(val = call$h(fn, input)))
    return val;
  throw $TypeError$d("Can't convert object to primitive value");
};
var shared$4 = { exports: {} };
var global$i = global$l;
var defineProperty$4 = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$4(global$i, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$i[key] = value;
  }
  return value;
};
var global$h = global$l;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$h[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$4.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.27.1",
  mode: "global",
  copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.27.1/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var requireObjectCoercible$8 = requireObjectCoercible$a;
var $Object$2 = Object;
var toObject$4 = function(argument) {
  return $Object$2(requireObjectCoercible$8(argument));
};
var uncurryThis$l = functionUncurryThis;
var toObject$3 = toObject$4;
var hasOwnProperty = uncurryThis$l({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$3(it), key);
};
var uncurryThis$k = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$a = uncurryThis$k(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$a(++id + postfix, 36);
};
var global$g = global$l;
var shared$3 = shared$4.exports;
var hasOwn$a = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3("wks");
var Symbol$1 = global$g.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$i = function(name) {
  if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var call$g = functionCall;
var isObject$7 = isObject$9;
var isSymbol$1 = isSymbol$2;
var getMethod$5 = getMethod$6;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;
var $TypeError$c = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$h("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$7(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod$5(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$g(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$1(result))
      return result;
    throw $TypeError$c("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$3 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$f = global$l;
var isObject$6 = isObject$9;
var document$3 = global$f.document;
var EXISTS$1 = isObject$6(document$3) && isObject$6(document$3.createElement);
var documentCreateElement$2 = function(it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};
var DESCRIPTORS$9 = descriptors;
var fails$g = fails$l;
var createElement$1 = documentCreateElement$2;
var ie8DomDefine = !DESCRIPTORS$9 && !fails$g(function() {
  return Object.defineProperty(createElement$1("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$8 = descriptors;
var call$f = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$9 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
    }
  if (hasOwn$9(O, P))
    return createPropertyDescriptor$3(!call$f(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$7 = descriptors;
var fails$f = fails$l;
var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$f(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$5 = isObject$9;
var $String$2 = String;
var $TypeError$b = TypeError;
var anObject$g = function(argument) {
  if (isObject$5(argument))
    return argument;
  throw $TypeError$b($String$2(argument) + " is not an object");
};
var DESCRIPTORS$6 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$f = anObject$g;
var toPropertyKey$1 = toPropertyKey$3;
var $TypeError$a = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$f(O);
  P = toPropertyKey$1(P);
  anObject$f(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty2(O, P, Attributes) {
  anObject$f(O);
  P = toPropertyKey$1(P);
  anObject$f(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError$a("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$5 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;
var createNonEnumerableProperty$5 = DESCRIPTORS$5 ? function(object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$2(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$2 = { exports: {} };
var DESCRIPTORS$4 = descriptors;
var hasOwn$8 = hasOwnProperty_1;
var FunctionPrototype$1 = Function.prototype;
var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$8(FunctionPrototype$1, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$j = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore;
var functionToString = uncurryThis$j(Function.toString);
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$3 = store$1.inspectSource;
var global$e = global$l;
var isCallable$f = isCallable$m;
var WeakMap$1 = global$e.WeakMap;
var weakMapBasicDetection = isCallable$f(WeakMap$1) && /native code/.test(String(WeakMap$1));
var shared$2 = shared$4.exports;
var uid = uid$2;
var keys = shared$2("keys");
var sharedKey$3 = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$d = global$l;
var isObject$4 = isObject$9;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$7 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$2 = global$d.TypeError;
var WeakMap = global$d.WeakMap;
var set$1, get, has;
var enforce = function(it) {
  return has(it) ? get(it) : set$1(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  set$1 = function(it, metadata) {
    if (store.has(it))
      throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function(it) {
    return store.get(it) || {};
  };
  has = function(it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2("state");
  hiddenKeys$3[STATE] = true;
  set$1 = function(it, metadata) {
    if (hasOwn$7(it, STATE))
      throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function(it) {
    return hasOwn$7(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$7(it, STATE);
  };
}
var internalState = {
  set: set$1,
  get,
  has,
  enforce,
  getterFor
};
var fails$e = fails$l;
var isCallable$e = isCallable$m;
var hasOwn$6 = hasOwnProperty_1;
var DESCRIPTORS$3 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$2 = internalState;
var enforceInternalState = InternalStateModule$2.enforce;
var getInternalState$2 = InternalStateModule$2.get;
var defineProperty$3 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$e(function() {
  return defineProperty$3(function() {
  }, "length", { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name, options) {
  if (String(name).slice(0, 7) === "Symbol(") {
    name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter)
    name = "get " + name;
  if (options && options.setter)
    name = "set " + name;
  if (!hasOwn$6(value, "name") || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
    if (DESCRIPTORS$3)
      defineProperty$3(value, "name", { value: name, configurable: true });
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, "arity") && value.length !== options.arity) {
    defineProperty$3(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$6(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$3)
        defineProperty$3(value, "prototype", { writable: false });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$6(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$e(this) && getInternalState$2(this).source || inspectSource$2(this);
}, "toString");
var isCallable$d = isCallable$m;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$7 = function(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$d(value))
    makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple)
      O[key] = value;
    else
      defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe)
        delete O[key];
      else if (O[key])
        simple = true;
    } catch (error) {
    }
    if (simple)
      O[key] = value;
    else
      definePropertyModule$4.f(O, key, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O;
};
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor$1 = Math.floor;
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$4 = function(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : trunc2(number);
};
var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;
var max$2 = Math.max;
var min$5 = Math.min;
var toAbsoluteIndex$2 = function(index2, length) {
  var integer = toIntegerOrInfinity$3(index2);
  return integer < 0 ? max$2(integer + length, 0) : min$5(integer, length);
};
var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;
var min$4 = Math.min;
var toLength$6 = function(argument) {
  return argument > 0 ? min$4(toIntegerOrInfinity$2(argument), 9007199254740991) : 0;
};
var toLength$5 = toLength$6;
var lengthOfArrayLike$4 = function(obj) {
  return toLength$5(obj.length);
};
var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex$1 = toAbsoluteIndex$2;
var lengthOfArrayLike$3 = lengthOfArrayLike$4;
var createMethod$3 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$3(O);
    var index2 = toAbsoluteIndex$1(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index2) {
        value = O[index2++];
        if (value != value)
          return true;
      }
    else
      for (; length > index2; index2++) {
        if ((IS_INCLUDES || index2 in O) && O[index2] === el)
          return IS_INCLUDES || index2 || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  includes: createMethod$3(true),
  indexOf: createMethod$3(false)
};
var uncurryThis$i = functionUncurryThis;
var hasOwn$5 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$2 = uncurryThis$i([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$2(result, key);
  while (names.length > i)
    if (hasOwn$5(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$2(result, key);
    }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$5 = getBuiltIn$8;
var uncurryThis$h = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$e = anObject$g;
var concat$1 = uncurryThis$h([].concat);
var ownKeys$4 = getBuiltIn$5("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$e(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$1(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn$4 = hasOwnProperty_1;
var ownKeys$3 = ownKeys$4;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;
var copyConstructorProperties$1 = function(target, source, exceptions) {
  var keys3 = ownKeys$3(source);
  var defineProperty4 = definePropertyModule$3.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$d = fails$l;
var isCallable$c = isCallable$m;
var replacement = /#|\.prototype\./;
var isForced$2 = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$c(detection) ? fails$d(detection) : !!detection;
};
var normalize = isForced$2.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = "N";
var POLYFILL = isForced$2.POLYFILL = "P";
var isForced_1 = isForced$2;
var global$c = global$l;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$6 = defineBuiltIn$7;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$c;
  } else if (STATIC) {
    target = global$c[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$c[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$3(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$3(sourceProperty, "sham", true);
      }
      defineBuiltIn$6(target, key, sourceProperty, options);
    }
};
var classof$7 = classofRaw$2;
var global$b = global$l;
var engineIsNode = classof$7(global$b.process) == "process";
var isCallable$b = isCallable$m;
var $String$1 = String;
var $TypeError$9 = TypeError;
var aPossiblePrototype$1 = function(argument) {
  if (typeof argument == "object" || isCallable$b(argument))
    return argument;
  throw $TypeError$9("Can't set " + $String$1(argument) + " as a prototype");
};
var uncurryThis$g = functionUncurryThis;
var anObject$d = anObject$g;
var aPossiblePrototype = aPossiblePrototype$1;
var objectSetPrototypeOf = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var CORRECT_SETTER = false;
  var test2 = {};
  var setter;
  try {
    setter = uncurryThis$g(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set);
    setter(test2, []);
    CORRECT_SETTER = test2 instanceof Array;
  } catch (error) {
  }
  return function setPrototypeOf2(O, proto) {
    anObject$d(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER)
      setter(O, proto);
    else
      O.__proto__ = proto;
    return O;
  };
}() : void 0);
var defineProperty$2 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var wellKnownSymbol$g = wellKnownSymbol$i;
var TO_STRING_TAG$3 = wellKnownSymbol$g("toStringTag");
var setToStringTag$3 = function(target, TAG, STATIC) {
  if (target && !STATIC)
    target = target.prototype;
  if (target && !hasOwn$3(target, TO_STRING_TAG$3)) {
    defineProperty$2(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};
var getBuiltIn$4 = getBuiltIn$8;
var definePropertyModule$2 = objectDefineProperty;
var wellKnownSymbol$f = wellKnownSymbol$i;
var DESCRIPTORS$2 = descriptors;
var SPECIES$3 = wellKnownSymbol$f("species");
var setSpecies$1 = function(CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$4(CONSTRUCTOR_NAME);
  var defineProperty4 = definePropertyModule$2.f;
  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty4(Constructor, SPECIES$3, {
      configurable: true,
      get: function() {
        return this;
      }
    });
  }
};
var isPrototypeOf$2 = objectIsPrototypeOf;
var $TypeError$8 = TypeError;
var anInstance$1 = function(it, Prototype) {
  if (isPrototypeOf$2(Prototype, it))
    return it;
  throw $TypeError$8("Incorrect invocation");
};
var wellKnownSymbol$e = wellKnownSymbol$i;
var TO_STRING_TAG$2 = wellKnownSymbol$e("toStringTag");
var test$1 = {};
test$1[TO_STRING_TAG$2] = "z";
var toStringTagSupport = String(test$1) === "[object z]";
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$a = isCallable$m;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$d = wellKnownSymbol$i;
var TO_STRING_TAG$1 = wellKnownSymbol$d("toStringTag");
var $Object$1 = Object;
var CORRECT_ARGUMENTS = classofRaw$1(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$6 = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$1)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw$1(O) : (result = classofRaw$1(O)) == "Object" && isCallable$a(O.callee) ? "Arguments" : result;
};
var uncurryThis$f = functionUncurryThis;
var fails$c = fails$l;
var isCallable$9 = isCallable$m;
var classof$5 = classof$6;
var getBuiltIn$3 = getBuiltIn$8;
var inspectSource$1 = inspectSource$3;
var noop$1 = function() {
};
var empty = [];
var construct = getBuiltIn$3("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$2 = uncurryThis$f(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop$1);
var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$9(argument))
    return false;
  try {
    construct(noop$1, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};
var isConstructorLegacy = function isConstructor2(argument) {
  if (!isCallable$9(argument))
    return false;
  switch (classof$5(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};
isConstructorLegacy.sham = true;
var isConstructor$1 = !construct || fails$c(function() {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;
var isConstructor3 = isConstructor$1;
var tryToString$2 = tryToString$4;
var $TypeError$7 = TypeError;
var aConstructor$1 = function(argument) {
  if (isConstructor3(argument))
    return argument;
  throw $TypeError$7(tryToString$2(argument) + " is not a constructor");
};
var anObject$c = anObject$g;
var aConstructor = aConstructor$1;
var isNullOrUndefined$4 = isNullOrUndefined$7;
var wellKnownSymbol$c = wellKnownSymbol$i;
var SPECIES$2 = wellKnownSymbol$c("species");
var speciesConstructor$2 = function(O, defaultConstructor) {
  var C = anObject$c(O).constructor;
  var S;
  return C === void 0 || isNullOrUndefined$4(S = anObject$c(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
};
var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype = Function.prototype;
var apply$3 = FunctionPrototype.apply;
var call$e = FunctionPrototype.call;
var functionApply = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND$1 ? call$e.bind(apply$3) : function() {
  return call$e.apply(apply$3, arguments);
});
var classofRaw = classofRaw$2;
var uncurryThis$e = functionUncurryThis;
var functionUncurryThisClause = function(fn) {
  if (classofRaw(fn) === "Function")
    return uncurryThis$e(fn);
};
var uncurryThis$d = functionUncurryThisClause;
var aCallable$6 = aCallable$8;
var NATIVE_BIND = functionBindNative;
var bind$4 = uncurryThis$d(uncurryThis$d.bind);
var functionBindContext = function(fn, that) {
  aCallable$6(fn);
  return that === void 0 ? fn : NATIVE_BIND ? bind$4(fn, that) : function() {
    return fn.apply(that, arguments);
  };
};
var getBuiltIn$2 = getBuiltIn$8;
var html$2 = getBuiltIn$2("document", "documentElement");
var uncurryThis$c = functionUncurryThis;
var arraySlice$2 = uncurryThis$c([].slice);
var $TypeError$6 = TypeError;
var validateArgumentsLength$1 = function(passed, required) {
  if (passed < required)
    throw $TypeError$6("Not enough arguments");
  return passed;
};
var userAgent$2 = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);
var global$a = global$l;
var apply$2 = functionApply;
var bind$3 = functionBindContext;
var isCallable$8 = isCallable$m;
var hasOwn$2 = hasOwnProperty_1;
var fails$b = fails$l;
var html$1 = html$2;
var arraySlice$1 = arraySlice$2;
var createElement = documentCreateElement$2;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$4 = engineIsNode;
var set = global$a.setImmediate;
var clear = global$a.clearImmediate;
var process$3 = global$a.process;
var Dispatch = global$a.Dispatch;
var Function$1 = global$a.Function;
var MessageChannel = global$a.MessageChannel;
var String$1 = global$a.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var $location, defer, channel, port;
try {
  $location = global$a.location;
} catch (error) {
}
var run = function(id2) {
  if (hasOwn$2(queue$1, id2)) {
    var fn = queue$1[id2];
    delete queue$1[id2];
    fn();
  }
};
var runner = function(id2) {
  return function() {
    run(id2);
  };
};
var listener = function(event) {
  run(event.data);
};
var post = function(id2) {
  global$a.postMessage(String$1(id2), $location.protocol + "//" + $location.host);
};
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$8(handler) ? handler : Function$1(handler);
    var args = arraySlice$1(arguments, 1);
    queue$1[++counter] = function() {
      apply$2(fn, void 0, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id2) {
    delete queue$1[id2];
  };
  if (IS_NODE$4) {
    defer = function(id2) {
      process$3.nextTick(runner(id2));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function(id2) {
      Dispatch.now(runner(id2));
    };
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port);
  } else if (global$a.addEventListener && isCallable$8(global$a.postMessage) && !global$a.importScripts && $location && $location.protocol !== "file:" && !fails$b(post)) {
    defer = post;
    global$a.addEventListener("message", listener, false);
  } else if (ONREADYSTATECHANGE in createElement("script")) {
    defer = function(id2) {
      html$1.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
        html$1.removeChild(this);
        run(id2);
      };
    };
  } else {
    defer = function(id2) {
      setTimeout(runner(id2), 0);
    };
  }
}
var task$1 = {
  set,
  clear
};
var userAgent$1 = engineUserAgent;
var global$9 = global$l;
var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$9.Pebble !== void 0;
var userAgent = engineUserAgent;
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);
var global$8 = global$l;
var bind$2 = functionBindContext;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$3 = engineIsNode;
var MutationObserver = global$8.MutationObserver || global$8.WebKitMutationObserver;
var document$2 = global$8.document;
var process$2 = global$8.process;
var Promise$1 = global$8.Promise;
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global$8, "queueMicrotask");
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify$1, toggle, node$1, promise, then;
if (!queueMicrotask) {
  flush = function() {
    var parent, fn;
    if (IS_NODE$3 && (parent = process$2.domain))
      parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head)
          notify$1();
        else
          last = void 0;
        throw error;
      }
    }
    last = void 0;
    if (parent)
      parent.enter();
  };
  if (!IS_IOS && !IS_NODE$3 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node$1 = document$2.createTextNode("");
    new MutationObserver(flush).observe(node$1, { characterData: true });
    notify$1 = function() {
      node$1.data = toggle = !toggle;
    };
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    promise = Promise$1.resolve(void 0);
    promise.constructor = Promise$1;
    then = bind$2(promise.then, promise);
    notify$1 = function() {
      then(flush);
    };
  } else if (IS_NODE$3) {
    notify$1 = function() {
      process$2.nextTick(flush);
    };
  } else {
    macrotask = bind$2(macrotask, global$8);
    notify$1 = function() {
      macrotask(flush);
    };
  }
}
var microtask$1 = queueMicrotask || function(fn) {
  var task2 = { fn, next: void 0 };
  if (last)
    last.next = task2;
  if (!head) {
    head = task2;
    notify$1();
  }
  last = task2;
};
var global$7 = global$l;
var hostReportErrors$1 = function(a, b) {
  var console2 = global$7.console;
  if (console2 && console2.error) {
    arguments.length == 1 ? console2.error(a) : console2.error(a, b);
  }
};
var perform$3 = function(exec2) {
  try {
    return { error: false, value: exec2() };
  } catch (error) {
    return { error: true, value: error };
  }
};
var Queue$1 = function() {
  this.head = null;
  this.tail = null;
};
Queue$1.prototype = {
  add: function(item) {
    var entry = { item, next: null };
    if (this.head)
      this.tail.next = entry;
    else
      this.head = entry;
    this.tail = entry;
  },
  get: function() {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry)
        this.tail = null;
      return entry.item;
    }
  }
};
var queue = Queue$1;
var global$6 = global$l;
var promiseNativeConstructor = global$6.Promise;
var engineIsDeno = typeof Deno == "object" && Deno && typeof Deno.version == "object";
var IS_DENO$1 = engineIsDeno;
var IS_NODE$2 = engineIsNode;
var engineIsBrowser = !IS_DENO$1 && !IS_NODE$2 && typeof window == "object" && typeof document == "object";
var global$5 = global$l;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$7 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$b = wellKnownSymbol$i;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;
NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$b("species");
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$7(global$5.PromiseRejectionEvent);
var FORCED_PROMISE_CONSTRUCTOR$5 = isForced("Promise", function() {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66)
    return true;
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    var promise2 = new NativePromiseConstructor$3(function(resolve2) {
      resolve2(1);
    });
    var FakePromise = function(exec2) {
      exec2(function() {
      }, function() {
      });
    };
    var constructor = promise2.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise2.then(function() {
    }) instanceof FakePromise;
    if (!SUBCLASSING)
      return true;
  }
  return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});
var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING
};
var newPromiseCapability$2 = {};
var aCallable$5 = aCallable$8;
var $TypeError$5 = TypeError;
var PromiseCapability = function(C) {
  var resolve2, reject2;
  this.promise = new C(function($$resolve, $$reject) {
    if (resolve2 !== void 0 || reject2 !== void 0)
      throw $TypeError$5("Bad Promise constructor");
    resolve2 = $$resolve;
    reject2 = $$reject;
  });
  this.resolve = aCallable$5(resolve2);
  this.reject = aCallable$5(reject2);
};
newPromiseCapability$2.f = function(C) {
  return new PromiseCapability(C);
};
var $$e = _export;
var IS_NODE$1 = engineIsNode;
var global$4 = global$l;
var call$d = functionCall;
var defineBuiltIn$5 = defineBuiltIn$7;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$2 = setToStringTag$3;
var setSpecies = setSpecies$1;
var aCallable$4 = aCallable$8;
var isCallable$6 = isCallable$m;
var isObject$3 = isObject$9;
var anInstance = anInstance$1;
var speciesConstructor$1 = speciesConstructor$2;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule$1 = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;
var PROMISE = "Promise";
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
var setInternalState$1 = InternalStateModule$1.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$4.TypeError;
var document$1 = global$4.document;
var process$1 = global$4.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$4.dispatchEvent);
var UNHANDLED_REJECTION = "unhandledrejection";
var REJECTION_HANDLED = "rejectionhandled";
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var isThenable = function(it) {
  var then2;
  return isObject$3(it) && isCallable$6(then2 = it.then) ? then2 : false;
};
var callReaction = function(reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve2 = reaction.resolve;
  var reject2 = reaction.reject;
  var domain = reaction.domain;
  var result, then2, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED)
          onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true)
        result = value;
      else {
        if (domain)
          domain.enter();
        result = handler(value);
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject2(TypeError$1("Promise-chain cycle"));
      } else if (then2 = isThenable(result)) {
        call$d(then2, result, resolve2, reject2);
      } else
        resolve2(result);
    } else
      reject2(value);
  } catch (error) {
    if (domain && !exited)
      domain.exit();
    reject2(error);
  }
};
var notify = function(state, isReject) {
  if (state.notified)
    return;
  state.notified = true;
  microtask(function() {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection)
      onUnhandled(state);
  });
};
var dispatchEvent = function(name, promise2, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent("Event");
    event.promise = promise2;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$4.dispatchEvent(event);
  } else
    event = { promise: promise2, reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$4["on" + name]))
    handler(event);
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors("Unhandled promise rejection", reason);
};
var onUnhandled = function(state) {
  call$d(task, global$4, function() {
    var promise2 = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function() {
        if (IS_NODE$1) {
          process$1.emit("unhandledRejection", value, promise2);
        } else
          dispatchEvent(UNHANDLED_REJECTION, promise2, value);
      });
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error)
        throw result.value;
    }
  });
};
var isUnhandled = function(state) {
  return state.rejection !== HANDLED && !state.parent;
};
var onHandleUnhandled = function(state) {
  call$d(task, global$4, function() {
    var promise2 = state.facade;
    if (IS_NODE$1) {
      process$1.emit("rejectionHandled", promise2);
    } else
      dispatchEvent(REJECTION_HANDLED, promise2, state.value);
  });
};
var bind$1 = function(fn, state, unwrap) {
  return function(value) {
    fn(state, value, unwrap);
  };
};
var internalReject = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};
var internalResolve = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  try {
    if (state.facade === value)
      throw TypeError$1("Promise can't be resolved itself");
    var then2 = isThenable(value);
    if (then2) {
      microtask(function() {
        var wrapper = { done: false };
        try {
          call$d(
            then2,
            value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  PromiseConstructor = function Promise2(executor) {
    anInstance(this, PromisePrototype);
    aCallable$4(executor);
    call$d(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  Internal = function Promise2(executor) {
    setInternalState$1(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: void 0
    });
  };
  Internal.prototype = defineBuiltIn$5(PromisePrototype, "then", function then2(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor$1(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$6(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$6(onRejected) && onRejected;
    reaction.domain = IS_NODE$1 ? process$1.domain : void 0;
    if (state.state == PENDING)
      state.reactions.add(reaction);
    else
      microtask(function() {
        callReaction(reaction, state);
      });
    return reaction.promise;
  });
  OwnPromiseCapability = function() {
    var promise2 = new Internal();
    var state = getInternalPromiseState(promise2);
    this.promise = promise2;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };
  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function(C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
  if (isCallable$6(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;
    if (!NATIVE_PROMISE_SUBCLASSING) {
      defineBuiltIn$5(NativePromisePrototype$1, "then", function then2(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function(resolve2, reject2) {
          call$d(nativeThen, that, resolve2, reject2);
        }).then(onFulfilled, onRejected);
      }, { unsafe: true });
    }
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) {
    }
    if (setPrototypeOf$1) {
      setPrototypeOf$1(NativePromisePrototype$1, PromisePrototype);
    }
  }
}
$$e({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});
setToStringTag$2(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);
var iterators = {};
var wellKnownSymbol$a = wellKnownSymbol$i;
var Iterators$4 = iterators;
var ITERATOR$5 = wellKnownSymbol$a("iterator");
var ArrayPrototype$1 = Array.prototype;
var isArrayIteratorMethod$1 = function(it) {
  return it !== void 0 && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
};
var classof$4 = classof$6;
var getMethod$4 = getMethod$6;
var isNullOrUndefined$3 = isNullOrUndefined$7;
var Iterators$3 = iterators;
var wellKnownSymbol$9 = wellKnownSymbol$i;
var ITERATOR$4 = wellKnownSymbol$9("iterator");
var getIteratorMethod$2 = function(it) {
  if (!isNullOrUndefined$3(it))
    return getMethod$4(it, ITERATOR$4) || getMethod$4(it, "@@iterator") || Iterators$3[classof$4(it)];
};
var call$c = functionCall;
var aCallable$3 = aCallable$8;
var anObject$b = anObject$g;
var tryToString$1 = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$2;
var $TypeError$4 = TypeError;
var getIterator$1 = function(argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$3(iteratorMethod))
    return anObject$b(call$c(iteratorMethod, argument));
  throw $TypeError$4(tryToString$1(argument) + " is not iterable");
};
var call$b = functionCall;
var anObject$a = anObject$g;
var getMethod$3 = getMethod$6;
var iteratorClose$1 = function(iterator, kind, value) {
  var innerResult, innerError;
  anObject$a(iterator);
  try {
    innerResult = getMethod$3(iterator, "return");
    if (!innerResult) {
      if (kind === "throw")
        throw value;
      return value;
    }
    innerResult = call$b(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === "throw")
    throw value;
  if (innerError)
    throw innerResult;
  anObject$a(innerResult);
  return value;
};
var bind = functionBindContext;
var call$a = functionCall;
var anObject$9 = anObject$g;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$4;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;
var $TypeError$3 = TypeError;
var Result = function(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};
var ResultPrototype = Result.prototype;
var iterate$2 = function(iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index2, length, result, next, step;
  var stop = function(condition) {
    if (iterator)
      iteratorClose(iterator, "normal", condition);
    return new Result(true, condition);
  };
  var callFn = function(value) {
    if (AS_ENTRIES) {
      anObject$9(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }
    return INTERRUPTED ? fn(value, stop) : fn(value);
  };
  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn)
      throw $TypeError$3(tryToString(iterable) + " is not iterable");
    if (isArrayIteratorMethod(iterFn)) {
      for (index2 = 0, length = lengthOfArrayLike$2(iterable); length > index2; index2++) {
        result = callFn(iterable[index2]);
        if (result && isPrototypeOf$1(ResultPrototype, result))
          return result;
      }
      return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }
  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$a(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, "throw", error);
    }
    if (typeof result == "object" && result && isPrototypeOf$1(ResultPrototype, result))
      return result;
  }
  return new Result(false);
};
var wellKnownSymbol$8 = wellKnownSymbol$i;
var ITERATOR$3 = wellKnownSymbol$8("iterator");
var SAFE_CLOSING = false;
try {
  var called = 0;
  var iteratorWithReturn = {
    next: function() {
      return { done: !!called++ };
    },
    "return": function() {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$3] = function() {
    return this;
  };
  Array.from(iteratorWithReturn, function() {
    throw 2;
  });
} catch (error) {
}
var checkCorrectnessOfIteration$1 = function(exec2, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING)
    return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function() {
      return {
        next: function() {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec2(object);
  } catch (error) {
  }
  return ITERATION_SUPPORT;
};
var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;
var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function(iterable) {
  NativePromiseConstructor$1.all(iterable).then(void 0, function() {
  });
});
var $$d = _export;
var call$9 = functionCall;
var aCallable$2 = aCallable$8;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;
$$d({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = perform$1(function() {
      var $promiseResolve = aCallable$2(C.resolve);
      var values2 = [];
      var counter2 = 0;
      var remaining = 1;
      iterate$1(iterable, function(promise2) {
        var index2 = counter2++;
        var alreadyCalled = false;
        remaining++;
        call$9($promiseResolve, C, promise2).then(function(value) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values2[index2] = value;
          --remaining || resolve2(values2);
        }, reject2);
      });
      --remaining || resolve2(values2);
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$c = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$5 = isCallable$m;
var defineBuiltIn$4 = defineBuiltIn$7;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
$$c({ target: "Promise", proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  "catch": function(onRejected) {
    return this.then(void 0, onRejected);
  }
});
if (isCallable$5(NativePromiseConstructor)) {
  var method = getBuiltIn$1("Promise").prototype["catch"];
  if (NativePromisePrototype["catch"] !== method) {
    defineBuiltIn$4(NativePromisePrototype, "catch", method, { unsafe: true });
  }
}
var $$b = _export;
var call$8 = functionCall;
var aCallable$1 = aCallable$8;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;
$$b({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject2 = capability.reject;
    var result = perform(function() {
      var $promiseResolve = aCallable$1(C.resolve);
      iterate(iterable, function(promise2) {
        call$8($promiseResolve, C, promise2).then(capability.resolve, reject2);
      });
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$a = _export;
var call$7 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;
$$a({ target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$7(capability.reject, void 0, r);
    return capability.promise;
  }
});
var anObject$8 = anObject$g;
var isObject$2 = isObject$9;
var newPromiseCapability = newPromiseCapability$2;
var promiseResolve$1 = function(C, x) {
  anObject$8(C);
  if (isObject$2(x) && x.constructor === C)
    return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve2 = promiseCapability.resolve;
  resolve2(x);
  return promiseCapability.promise;
};
var $$9 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;
getBuiltIn("Promise");
$$9({ target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});
function asyncGeneratorStep(gen, resolve2, reject2, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject2(error);
    return;
  }
  if (info.done) {
    resolve2(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve2, reject2) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve2, reject2, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve2, reject2, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var classof$3 = classof$6;
var $String = String;
var toString$9 = function(argument) {
  if (classof$3(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String(argument);
};
var anObject$7 = anObject$g;
var regexpFlags$1 = function() {
  var that = anObject$7(this);
  var result = "";
  if (that.hasIndices)
    result += "d";
  if (that.global)
    result += "g";
  if (that.ignoreCase)
    result += "i";
  if (that.multiline)
    result += "m";
  if (that.dotAll)
    result += "s";
  if (that.unicode)
    result += "u";
  if (that.unicodeSets)
    result += "v";
  if (that.sticky)
    result += "y";
  return result;
};
var fails$a = fails$l;
var global$3 = global$l;
var $RegExp$2 = global$3.RegExp;
var UNSUPPORTED_Y$2 = fails$a(function() {
  var re = $RegExp$2("a", "y");
  re.lastIndex = 2;
  return re.exec("abcd") != null;
});
var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$a(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$a(function() {
  var re = $RegExp$2("^r", "gy");
  re.lastIndex = 2;
  return re.exec("str") != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET,
  MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};
var objectDefineProperties = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};
var DESCRIPTORS$1 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$6 = anObject$g;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$6(O);
  var props = toIndexedObject$1(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index2 = 0;
  var key;
  while (length > index2)
    definePropertyModule$1.f(O, key = keys3[index2++], props[key]);
  return O;
};
var anObject$5 = anObject$g;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO$1 = sharedKey$1("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement$1("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
  var length = enumBugKeys.length;
  while (length--)
    delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys[IE_PROTO$1] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$5(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO$1] = O;
  } else
    result = NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var fails$9 = fails$l;
var global$2 = global$l;
var $RegExp$1 = global$2.RegExp;
var regexpUnsupportedDotAll = fails$9(function() {
  var re = $RegExp$1(".", "s");
  return !(re.dotAll && re.exec("\n") && re.flags === "s");
});
var fails$8 = fails$l;
var global$1 = global$l;
var $RegExp = global$1.RegExp;
var regexpUnsupportedNcg = fails$8(function() {
  var re = $RegExp("(?<a>b)", "g");
  return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
});
var call$6 = functionCall;
var uncurryThis$b = functionUncurryThis;
var toString$8 = toString$9;
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared = shared$4.exports;
var create$2 = objectCreate;
var getInternalState$1 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$b("".charAt);
var indexOf = uncurryThis$b("".indexOf);
var replace$2 = uncurryThis$b("".replace);
var stringSlice$5 = uncurryThis$b("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re1 = /a/;
  var re2 = /b*/g;
  call$6(nativeExec, re1, "a");
  call$6(nativeExec, re2, "a");
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();
var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string) {
    var re = this;
    var state = getInternalState$1(re);
    var str = toString$8(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match2, i, object, group;
    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$6(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = call$6(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
      flags = replace$2(flags, "y", "");
      if (indexOf(flags, "g") === -1) {
        flags += "g";
      }
      strCopy = stringSlice$5(str, re.lastIndex);
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== "\n")) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }
    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG)
      lastIndex = re.lastIndex;
    match2 = call$6(nativeExec, sticky ? reCopy : re, strCopy);
    if (sticky) {
      if (match2) {
        match2.input = stringSlice$5(match2.input, charsAdded);
        match2[0] = stringSlice$5(match2[0], charsAdded);
        match2.index = re.lastIndex;
        re.lastIndex += match2[0].length;
      } else
        re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match2) {
      re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match2 && match2.length > 1) {
      call$6(nativeReplace, match2[0], reCopy, function() {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === void 0)
            match2[i] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create$2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec$3 = patchedExec;
var $$8 = _export;
var exec$1 = regexpExec$3;
$$8({ target: "RegExp", proto: true, forced: /./.exec !== exec$1 }, {
  exec: exec$1
});
var uncurryThis$a = functionUncurryThisClause;
var defineBuiltIn$3 = defineBuiltIn$7;
var regexpExec$2 = regexpExec$3;
var fails$7 = fails$l;
var wellKnownSymbol$7 = wellKnownSymbol$i;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var SPECIES = wellKnownSymbol$7("species");
var RegExpPrototype$2 = RegExp.prototype;
var fixRegexpWellKnownSymbolLogic = function(KEY, exec2, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$7(KEY);
  var DELEGATES_TO_SYMBOL = !fails$7(function() {
    var O = {};
    O[SYMBOL] = function() {
      return 7;
    };
    return ""[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$7(function() {
    var execCalled = false;
    var re = /a/;
    if (KEY === "split") {
      re = {};
      re.constructor = {};
      re.constructor[SPECIES] = function() {
        return re;
      };
      re.flags = "";
      re[SYMBOL] = /./[SYMBOL];
    }
    re.exec = function() {
      execCalled = true;
      return null;
    };
    re[SYMBOL]("");
    return !execCalled;
  });
  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$a(/./[SYMBOL]);
    var methods = exec2(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$a(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });
    defineBuiltIn$3(String.prototype, KEY, methods[0]);
    defineBuiltIn$3(RegExpPrototype$2, SYMBOL, methods[1]);
  }
  if (SHAM)
    createNonEnumerableProperty$2(RegExpPrototype$2[SYMBOL], "sham", true);
};
var uncurryThis$9 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$7 = toString$9;
var requireObjectCoercible$7 = requireObjectCoercible$a;
var charAt$2 = uncurryThis$9("".charAt);
var charCodeAt = uncurryThis$9("".charCodeAt);
var stringSlice$4 = uncurryThis$9("".slice);
var createMethod$2 = function(CONVERT_TO_STRING) {
  return function($this, pos) {
    var S = toString$7(requireObjectCoercible$7($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size)
      return CONVERT_TO_STRING ? "" : void 0;
    first = charCodeAt(S, position);
    return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice$4(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
  };
};
var stringMultibyte = {
  codeAt: createMethod$2(false),
  charAt: createMethod$2(true)
};
var charAt$1 = stringMultibyte.charAt;
var advanceStringIndex$3 = function(S, index2, unicode) {
  return index2 + (unicode ? charAt$1(S, index2).length : 1);
};
var call$5 = functionCall;
var anObject$4 = anObject$g;
var isCallable$4 = isCallable$m;
var classof$2 = classofRaw$2;
var regexpExec$1 = regexpExec$3;
var $TypeError$2 = TypeError;
var regexpExecAbstract = function(R, S) {
  var exec2 = R.exec;
  if (isCallable$4(exec2)) {
    var result = call$5(exec2, R, S);
    if (result !== null)
      anObject$4(result);
    return result;
  }
  if (classof$2(R) === "RegExp")
    return call$5(regexpExec$1, R, S);
  throw $TypeError$2("RegExp#exec called on incompatible receiver");
};
var call$4 = functionCall;
var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var anObject$3 = anObject$g;
var isNullOrUndefined$2 = isNullOrUndefined$7;
var toLength$4 = toLength$6;
var toString$6 = toString$9;
var requireObjectCoercible$6 = requireObjectCoercible$a;
var getMethod$2 = getMethod$6;
var advanceStringIndex$2 = advanceStringIndex$3;
var regExpExec$1 = regexpExecAbstract;
fixRegExpWellKnownSymbolLogic$2("match", function(MATCH2, nativeMatch, maybeCallNative) {
  return [
    function match2(regexp) {
      var O = requireObjectCoercible$6(this);
      var matcher = isNullOrUndefined$2(regexp) ? void 0 : getMethod$2(regexp, MATCH2);
      return matcher ? call$4(matcher, regexp, O) : new RegExp(regexp)[MATCH2](toString$6(O));
    },
    function(string) {
      var rx = anObject$3(this);
      var S = toString$6(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done)
        return res.value;
      if (!rx.global)
        return regExpExec$1(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$1(rx, S)) !== null) {
        var matchStr = toString$6(result[0]);
        A[n] = matchStr;
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex$2(S, toLength$4(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});
var uncurryThis$8 = functionUncurryThis;
var toObject$2 = toObject$4;
var floor = Math.floor;
var charAt = uncurryThis$8("".charAt);
var replace$1 = uncurryThis$8("".replace);
var stringSlice$3 = uncurryThis$8("".slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
var getSubstitution$1 = function(matched, str, position, captures, namedCaptures, replacement2) {
  var tailPos = position + matched.length;
  var m2 = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== void 0) {
    namedCaptures = toObject$2(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$1(replacement2, symbols, function(match2, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case "$":
        return "$";
      case "&":
        return matched;
      case "`":
        return stringSlice$3(str, 0, position);
      case "'":
        return stringSlice$3(str, tailPos);
      case "<":
        capture = namedCaptures[stringSlice$3(ch, 1, -1)];
        break;
      default:
        var n = +ch;
        if (n === 0)
          return match2;
        if (n > m2) {
          var f = floor(n / 10);
          if (f === 0)
            return match2;
          if (f <= m2)
            return captures[f - 1] === void 0 ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match2;
        }
        capture = captures[n - 1];
    }
    return capture === void 0 ? "" : capture;
  });
};
var apply$1 = functionApply;
var call$3 = functionCall;
var uncurryThis$7 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var fails$6 = fails$l;
var anObject$2 = anObject$g;
var isCallable$3 = isCallable$m;
var isNullOrUndefined$1 = isNullOrUndefined$7;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength$3 = toLength$6;
var toString$5 = toString$9;
var requireObjectCoercible$5 = requireObjectCoercible$a;
var advanceStringIndex$1 = advanceStringIndex$3;
var getMethod$1 = getMethod$6;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol$6 = wellKnownSymbol$i;
var REPLACE = wellKnownSymbol$6("replace");
var max$1 = Math.max;
var min$3 = Math.min;
var concat = uncurryThis$7([].concat);
var push$1 = uncurryThis$7([].push);
var stringIndexOf$1 = uncurryThis$7("".indexOf);
var stringSlice$2 = uncurryThis$7("".slice);
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = function() {
  return "a".replace(/./, "$0") === "$0";
}();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$6(function() {
  var re = /./;
  re.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic$1("replace", function(_2, nativeReplace2, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    function replace2(searchValue, replaceValue) {
      var O = requireObjectCoercible$5(this);
      var replacer = isNullOrUndefined$1(searchValue) ? void 0 : getMethod$1(searchValue, REPLACE);
      return replacer ? call$3(replacer, searchValue, O, replaceValue) : call$3(nativeReplace2, toString$5(O), searchValue, replaceValue);
    },
    function(string, replaceValue) {
      var rx = anObject$2(this);
      var S = toString$5(string);
      if (typeof replaceValue == "string" && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, "$<") === -1) {
        var res = maybeCallNative(nativeReplace2, rx, S, replaceValue);
        if (res.done)
          return res.value;
      }
      var functionalReplace = isCallable$3(replaceValue);
      if (!functionalReplace)
        replaceValue = toString$5(replaceValue);
      var global2 = rx.global;
      if (global2) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null)
          break;
        push$1(results, result);
        if (!global2)
          break;
        var matchStr = toString$5(result[0]);
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex$1(S, toLength$3(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$5(result[0]);
        var position = max$1(min$3(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        for (var j = 1; j < result.length; j++)
          push$1(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== void 0)
            push$1(replacerArgs, namedCaptures);
          var replacement2 = toString$5(apply$1(replaceValue, void 0, replacerArgs));
        } else {
          replacement2 = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement2;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice$2(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
var isObject$1 = isObject$9;
var classof$1 = classofRaw$2;
var wellKnownSymbol$5 = wellKnownSymbol$i;
var MATCH$1 = wellKnownSymbol$5("match");
var isRegexp = function(it) {
  var isRegExp2;
  return isObject$1(it) && ((isRegExp2 = it[MATCH$1]) !== void 0 ? !!isRegExp2 : classof$1(it) == "RegExp");
};
var isRegExp$1 = isRegexp;
var $TypeError$1 = TypeError;
var notARegexp = function(it) {
  if (isRegExp$1(it)) {
    throw $TypeError$1("The method doesn't accept regular expressions");
  }
  return it;
};
var wellKnownSymbol$4 = wellKnownSymbol$i;
var MATCH = wellKnownSymbol$4("match");
var correctIsRegexpLogic = function(METHOD_NAME) {
  var regexp = /./;
  try {
    "/./"[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return "/./"[METHOD_NAME](regexp);
    } catch (error2) {
    }
  }
  return false;
};
var $$7 = _export;
var uncurryThis$6 = functionUncurryThisClause;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var toLength$2 = toLength$6;
var toString$4 = toString$9;
var notARegExp$2 = notARegexp;
var requireObjectCoercible$4 = requireObjectCoercible$a;
var correctIsRegExpLogic$2 = correctIsRegexpLogic;
var nativeStartsWith = uncurryThis$6("".startsWith);
var stringSlice$1 = uncurryThis$6("".slice);
var min$2 = Math.min;
var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$2("startsWith");
var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function() {
  var descriptor = getOwnPropertyDescriptor$1(String.prototype, "startsWith");
  return descriptor && !descriptor.writable;
}();
$$7({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
  startsWith: function startsWith(searchString) {
    var that = toString$4(requireObjectCoercible$4(this));
    notARegExp$2(searchString);
    var index2 = toLength$2(min$2(arguments.length > 1 ? arguments[1] : void 0, that.length));
    var search = toString$4(searchString);
    return nativeStartsWith ? nativeStartsWith(that, search, index2) : stringSlice$1(that, index2, index2 + search.length) === search;
  }
});
var wellKnownSymbol$3 = wellKnownSymbol$i;
var create$1 = objectCreate;
var defineProperty$1 = objectDefineProperty.f;
var UNSCOPABLES = wellKnownSymbol$3("unscopables");
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == void 0) {
  defineProperty$1(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
}
var addToUnscopables$1 = function(key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};
var fails$5 = fails$l;
var correctPrototypeGetter = !fails$5(function() {
  function F() {
  }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});
var hasOwn$1 = hasOwnProperty_1;
var isCallable$2 = isCallable$m;
var toObject$1 = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
var IE_PROTO = sharedKey("IE_PROTO");
var $Object = Object;
var ObjectPrototype = $Object.prototype;
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
  var object = toObject$1(O);
  if (hasOwn$1(object, IE_PROTO))
    return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$2(constructor) && object instanceof constructor) {
    return constructor.prototype;
  }
  return object instanceof $Object ? ObjectPrototype : null;
};
var fails$4 = fails$l;
var isCallable$1 = isCallable$m;
var isObject = isObject$9;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$2 = defineBuiltIn$7;
var wellKnownSymbol$2 = wellKnownSymbol$i;
var ITERATOR$2 = wellKnownSymbol$2("iterator");
var BUGGY_SAFARI_ITERATORS$1 = false;
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
if ([].keys) {
  arrayIterator = [].keys();
  if (!("next" in arrayIterator))
    BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}
var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype$2) || fails$4(function() {
  var test2 = {};
  return IteratorPrototype$2[ITERATOR$2].call(test2) !== test2;
});
if (NEW_ITERATOR_PROTOTYPE)
  IteratorPrototype$2 = {};
if (!isCallable$1(IteratorPrototype$2[ITERATOR$2])) {
  defineBuiltIn$2(IteratorPrototype$2, ITERATOR$2, function() {
    return this;
  });
}
var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create2 = objectCreate;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;
var setToStringTag$1 = setToStringTag$3;
var Iterators$2 = iterators;
var returnThis$1 = function() {
  return this;
};
var iteratorCreateConstructor = function(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG2 = NAME + " Iterator";
  IteratorConstructor.prototype = create2(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
  setToStringTag$1(IteratorConstructor, TO_STRING_TAG2, false);
  Iterators$2[TO_STRING_TAG2] = returnThis$1;
  return IteratorConstructor;
};
var $$6 = _export;
var call$2 = functionCall;
var FunctionName = functionName;
var isCallable = isCallable$m;
var createIteratorConstructor = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$3;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var defineBuiltIn$1 = defineBuiltIn$7;
var wellKnownSymbol$1 = wellKnownSymbol$i;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;
var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol$1("iterator");
var KEYS = "keys";
var VALUES = "values";
var ENTRIES = "entries";
var returnThis = function() {
  return this;
};
var iteratorDefine = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);
  var getIterationMethod = function(KIND) {
    if (KIND === DEFAULT && defaultIterator)
      return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
      return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS:
        return function keys3() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values2() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }
    return function() {
      return new IteratorConstructor(this);
    };
  };
  var TO_STRING_TAG2 = NAME + " Iterator";
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
          defineBuiltIn$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
        }
      }
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG2, true);
    }
  }
  if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, "name", VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values2() {
        return call$2(nativeIterator, this);
      };
    }
  }
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED)
      for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$1(IterablePrototype, KEY, methods[KEY]);
        }
      }
    else
      $$6({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }
  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    defineBuiltIn$1(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
  }
  Iterators$1[NAME] = defaultIterator;
  return methods;
};
var createIterResultObject$1 = function(value, done) {
  return { value, done };
};
var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var Iterators = iterators;
var InternalStateModule = internalState;
var defineProperty3 = objectDefineProperty.f;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$1;
var DESCRIPTORS = descriptors;
var ARRAY_ITERATOR = "Array Iterator";
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
var es_array_iterator = defineIterator(Array, "Array", function(iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    index: 0,
    kind
  });
}, function() {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index2 = state.index++;
  if (!target || index2 >= target.length) {
    state.target = void 0;
    return createIterResultObject(void 0, true);
  }
  if (kind == "keys")
    return createIterResultObject(index2, false);
  if (kind == "values")
    return createIterResultObject(target[index2], false);
  return createIterResultObject([index2, target[index2]], false);
}, "values");
var values = Iterators.Arguments = Iterators.Array;
addToUnscopables("keys");
addToUnscopables("values");
addToUnscopables("entries");
if (DESCRIPTORS && values.name !== "values")
  try {
    defineProperty3(values, "name", { value: "values" });
  } catch (error) {
  }
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};
var documentCreateElement = documentCreateElement$2;
var classList = documentCreateElement("span").classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? void 0 : DOMTokenListPrototype$1;
var global = global$l;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var wellKnownSymbol = wellKnownSymbol$i;
var ITERATOR = wellKnownSymbol("iterator");
var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype = function(CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    if (CollectionPrototype[ITERATOR] !== ArrayValues)
      try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME])
      for (var METHOD_NAME in ArrayIteratorMethods) {
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
          try {
            createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
          }
      }
  }
};
for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}
handlePrototype(DOMTokenListPrototype, "DOMTokenList");
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var aCallable = aCallable$8;
var toObject = toObject$4;
var IndexedObject = indexedObject;
var lengthOfArrayLike$1 = lengthOfArrayLike$4;
var $TypeError = TypeError;
var createMethod$1 = function(IS_RIGHT) {
  return function(that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self2 = IndexedObject(O);
    var length = lengthOfArrayLike$1(O);
    var index2 = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2)
      while (true) {
        if (index2 in self2) {
          memo = self2[index2];
          index2 += i;
          break;
        }
        index2 += i;
        if (IS_RIGHT ? index2 < 0 : length <= index2) {
          throw $TypeError("Reduce of empty array with no initial value");
        }
      }
    for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i)
      if (index2 in self2) {
        memo = callbackfn(memo, self2[index2], index2, O);
      }
    return memo;
  };
};
var arrayReduce = {
  left: createMethod$1(false),
  right: createMethod$1(true)
};
var fails$3 = fails$l;
var arrayMethodIsStrict$2 = function(METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$3(function() {
    method.call(null, argument || function() {
      return 1;
    }, 1);
  });
};
var $$5 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;
var STRICT_METHOD$1 = arrayMethodIsStrict$1("reduce");
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
$$5({ target: "Array", proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
  reduce: function reduce(callbackfn) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : void 0);
  }
});
var $$4 = _export;
var uncurryThis$5 = functionUncurryThisClause;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var toLength$1 = toLength$6;
var toString$3 = toString$9;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$3 = requireObjectCoercible$a;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;
var nativeEndsWith = uncurryThis$5("".endsWith);
var slice = uncurryThis$5("".slice);
var min$1 = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1("endsWith");
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function() {
  var descriptor = getOwnPropertyDescriptor2(String.prototype, "endsWith");
  return descriptor && !descriptor.writable;
}();
$$4({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString) {
    var that = toString$3(requireObjectCoercible$3(this));
    notARegExp$1(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : void 0;
    var len = that.length;
    var end = endPosition === void 0 ? len : min$1(toLength$1(endPosition), len);
    var search = toString$3(searchString);
    return nativeEndsWith ? nativeEndsWith(that, search, end) : slice(that, end - search.length, end) === search;
  }
});
var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$4;
var createProperty$1 = function(object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object)
    definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else
    object[propertyKey] = value;
};
var toAbsoluteIndex = toAbsoluteIndex$2;
var lengthOfArrayLike = lengthOfArrayLike$4;
var createProperty = createProperty$1;
var $Array = Array;
var max = Math.max;
var arraySliceSimple = function(O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++)
    createProperty(result, n, O[k]);
  result.length = n;
  return result;
};
var apply = functionApply;
var call$1 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$1 = anObject$g;
var isNullOrUndefined = isNullOrUndefined$7;
var isRegExp = isRegexp;
var requireObjectCoercible$2 = requireObjectCoercible$a;
var speciesConstructor = speciesConstructor$2;
var advanceStringIndex = advanceStringIndex$3;
var toLength = toLength$6;
var toString$2 = toString$9;
var getMethod = getMethod$6;
var arraySlice = arraySliceSimple;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers = regexpStickyHelpers;
var fails$2 = fails$l;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 4294967295;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis$4(/./.exec);
var push = uncurryThis$4($push);
var stringSlice = uncurryThis$4("".slice);
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function() {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function() {
    return originalExec.apply(this, arguments);
  };
  var result = "ab".split(re);
  return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
});
fixRegExpWellKnownSymbolLogic("split", function(SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if ("abbc".split(/(b)*/)[1] == "c" || "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
    internalSplit = function(separator, limit) {
      var string = toString$2(requireObjectCoercible$2(this));
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0)
        return [];
      if (separator === void 0)
        return [string];
      if (!isRegExp(separator)) {
        return call$1(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
      var lastLastIndex = 0;
      var separatorCopy = new RegExp(separator.source, flags + "g");
      var match2, lastIndex, lastLength;
      while (match2 = call$1(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match2.index));
          if (match2.length > 1 && match2.index < string.length)
            apply($push, output, arraySlice(match2, 1));
          lastLength = match2[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim)
            break;
        }
        if (separatorCopy.lastIndex === match2.index)
          separatorCopy.lastIndex++;
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, ""))
          push(output, "");
      } else
        push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  } else if ("0".split(void 0, 0).length) {
    internalSplit = function(separator, limit) {
      return separator === void 0 && limit === 0 ? [] : call$1(nativeSplit, this, separator, limit);
    };
  } else
    internalSplit = nativeSplit;
  return [
    function split2(separator, limit) {
      var O = requireObjectCoercible$2(this);
      var splitter = isNullOrUndefined(separator) ? void 0 : getMethod(separator, SPLIT);
      return splitter ? call$1(splitter, separator, O, limit) : call$1(internalSplit, toString$2(O), separator, limit);
    },
    function(string, limit) {
      var rx = anObject$1(this);
      var S = toString$2(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
      if (res.done)
        return res.value;
      var C = speciesConstructor(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
      var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags);
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0)
        return [];
      if (S.length === 0)
        return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim)
            return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim)
              return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);
var whitespaces$2 = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
var uncurryThis$3 = functionUncurryThis;
var requireObjectCoercible$1 = requireObjectCoercible$a;
var toString$1 = toString$9;
var whitespaces$1 = whitespaces$2;
var replace = uncurryThis$3("".replace);
var whitespace = "[" + whitespaces$1 + "]";
var ltrim = RegExp("^" + whitespace + whitespace + "*");
var rtrim = RegExp(whitespace + whitespace + "*$");
var createMethod = function(TYPE) {
  return function($this) {
    var string = toString$1(requireObjectCoercible$1($this));
    if (TYPE & 1)
      string = replace(string, ltrim, "");
    if (TYPE & 2)
      string = replace(string, rtrim, "");
    return string;
  };
};
var stringTrim = {
  start: createMethod(1),
  end: createMethod(2),
  trim: createMethod(3)
};
var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var fails$1 = fails$l;
var whitespaces = whitespaces$2;
var non = "\u200B\x85\u180E";
var stringTrimForced = function(METHOD_NAME) {
  return fails$1(function() {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME$1 && whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};
var $$3 = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced;
$$3({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
  trim: function trim() {
    return $trim(this);
  }
});
var $$2 = _export;
var uncurryThis$2 = functionUncurryThisClause;
var $indexOf = arrayIncludes.indexOf;
var arrayMethodIsStrict = arrayMethodIsStrict$2;
var nativeIndexOf = uncurryThis$2([].indexOf);
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict("indexOf");
$$2({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf2(searchElement) {
    var fromIndex = arguments.length > 1 ? arguments[1] : void 0;
    return NEGATIVE_ZERO ? nativeIndexOf(this, searchElement, fromIndex) || 0 : $indexOf(this, searchElement, fromIndex);
  }
});
var $$1 = _export;
var uncurryThis$1 = functionUncurryThis;
var notARegExp = notARegexp;
var requireObjectCoercible = requireObjectCoercible$a;
var toString2 = toString$9;
var correctIsRegExpLogic = correctIsRegexpLogic;
var stringIndexOf = uncurryThis$1("".indexOf);
$$1({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
  includes: function includes(searchString) {
    return !!~stringIndexOf(
      toString2(requireObjectCoercible(this)),
      toString2(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var classof = classofRaw$2;
var isArray$1 = Array.isArray || function isArray(argument) {
  return classof(argument) == "Array";
};
var $ = _export;
var uncurryThis = functionUncurryThis;
var isArray2 = isArray$1;
var nativeReverse = uncurryThis([].reverse);
var test = [1, 2];
$({ target: "Array", proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    if (isArray2(this))
      this.length = this.length;
    return nativeReverse(this);
  }
});
var call = functionCall;
var hasOwn2 = hasOwnProperty_1;
var isPrototypeOf = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;
var RegExpPrototype$1 = RegExp.prototype;
var regexpGetFlags = function(R) {
  var flags = R.flags;
  return flags === void 0 && !("flags" in RegExpPrototype$1) && !hasOwn2(R, "flags") && isPrototypeOf(RegExpPrototype$1, R) ? call(regExpFlags, R) : flags;
};
var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn = defineBuiltIn$7;
var anObject = anObject$g;
var $toString = toString$9;
var fails = fails$l;
var getRegExpFlags = regexpGetFlags;
var TO_STRING = "toString";
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails(function() {
  return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
});
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString3() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return "/" + pattern + "/" + flags;
  }, { unsafe: true });
}
function offscreen() {
  var {
    DOMParser: DOMParserFallback
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var preset = {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParserFallback,
    createCanvas(width, height) {
      return new OffscreenCanvas(width, height);
    },
    createImage(url) {
      return _asyncToGenerator(function* () {
        var response = yield fetch(url);
        var blob = yield response.blob();
        var img = yield createImageBitmap(blob);
        return img;
      })();
    }
  };
  if (typeof DOMParser !== "undefined" || typeof DOMParserFallback === "undefined") {
    Reflect.deleteProperty(preset, "DOMParser");
  }
  return preset;
}
function node(_ref) {
  var {
    DOMParser: DOMParser2,
    canvas,
    fetch: fetch2
  } = _ref;
  return {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParser2,
    fetch: fetch2,
    createCanvas: canvas.createCanvas,
    createImage: canvas.loadImage
  };
}
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  offscreen,
  node
});
function compressSpaces(str) {
  return str.replace(/(?!\u3000)\s+/gm, " ");
}
function trimLeft(str) {
  return str.replace(/^[\n \t]+/, "");
}
function trimRight(str) {
  return str.replace(/[\n \t]+$/, "");
}
function toNumbers(str) {
  var matches = (str || "").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
  return matches.map(parseFloat);
}
var allUppercase = /^[A-Z-]+$/;
function normalizeAttributeName(name) {
  if (allUppercase.test(name)) {
    return name.toLowerCase();
  }
  return name;
}
function parseExternalUrl(url) {
  var urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url) || [];
  return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
function normalizeColor(color) {
  if (!color.startsWith("rgb")) {
    return color;
  }
  var rgbParts = 3;
  var normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat) => rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num);
  return normalizedColor;
}
var attributeRegex = /(\[[^\]]+\])/g;
var idRegex = /(#[^\s+>~.[:]+)/g;
var classRegex = /(\.[^\s+>~.[:]+)/g;
var pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
var pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
var pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
var elementRegex = /([^\s+>~.[:]+)/g;
function findSelectorMatch(selector, regex) {
  var matches = regex.exec(selector);
  if (!matches) {
    return [selector, 0];
  }
  return [selector.replace(regex, " "), matches.length];
}
function getSelectorSpecificity(selector) {
  var specificity = [0, 0, 0];
  var currentSelector = selector.replace(/:not\(([^)]*)\)/g, "     $1 ").replace(/{[\s\S]*/gm, " ");
  var delta = 0;
  [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
  specificity[0] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
  specificity[2] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
  specificity[1] += delta;
  currentSelector = currentSelector.replace(/[*\s+>~]/g, " ").replace(/[#.]/g, " ");
  [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex);
  specificity[2] += delta;
  return specificity.join("");
}
var PSEUDO_ZERO = 1e-8;
function vectorMagnitude(v) {
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}
function vectorsRatio(u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
}
function vectorsAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}
function CB1(t) {
  return t * t * t;
}
function CB2(t) {
  return 3 * t * t * (1 - t);
}
function CB3(t) {
  return 3 * t * (1 - t) * (1 - t);
}
function CB4(t) {
  return (1 - t) * (1 - t) * (1 - t);
}
function QB1(t) {
  return t * t;
}
function QB2(t) {
  return 2 * t * (1 - t);
}
function QB3(t) {
  return (1 - t) * (1 - t);
}
class Property {
  constructor(document2, name, value) {
    this.document = document2;
    this.name = name;
    this.value = value;
    this.isNormalizedColor = false;
  }
  static empty(document2) {
    return new Property(document2, "EMPTY", "");
  }
  split() {
    var separator = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ";
    var {
      document: document2,
      name
    } = this;
    return compressSpaces(this.getString()).trim().split(separator).map((value) => new Property(document2, name, value));
  }
  hasValue(zeroIsValue) {
    var {
      value
    } = this;
    return value !== null && value !== "" && (zeroIsValue || value !== 0) && typeof value !== "undefined";
  }
  isString(regexp) {
    var {
      value
    } = this;
    var result = typeof value === "string";
    if (!result || !regexp) {
      return result;
    }
    return regexp.test(value);
  }
  isUrlDefinition() {
    return this.isString(/^url\(/);
  }
  isPixels() {
    if (!this.hasValue()) {
      return false;
    }
    var asString = this.getString();
    switch (true) {
      case asString.endsWith("px"):
      case /^[0-9]+$/.test(asString):
        return true;
      default:
        return false;
    }
  }
  setValue(value) {
    this.value = value;
    return this;
  }
  getValue(def) {
    if (typeof def === "undefined" || this.hasValue()) {
      return this.value;
    }
    return def;
  }
  getNumber(def) {
    if (!this.hasValue()) {
      if (typeof def === "undefined") {
        return 0;
      }
      return parseFloat(def);
    }
    var {
      value
    } = this;
    var n = parseFloat(value);
    if (this.isString(/%$/)) {
      n /= 100;
    }
    return n;
  }
  getString(def) {
    if (typeof def === "undefined" || this.hasValue()) {
      return typeof this.value === "undefined" ? "" : String(this.value);
    }
    return String(def);
  }
  getColor(def) {
    var color = this.getString(def);
    if (this.isNormalizedColor) {
      return color;
    }
    this.isNormalizedColor = true;
    color = normalizeColor(color);
    this.value = color;
    return color;
  }
  getDpi() {
    return 96;
  }
  getRem() {
    return this.document.rootEmSize;
  }
  getEm() {
    return this.document.emSize;
  }
  getUnits() {
    return this.getString().replace(/[0-9.-]/g, "");
  }
  getPixels(axisOrIsFontSize) {
    var processPercent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!this.hasValue()) {
      return 0;
    }
    var [axis, isFontSize] = typeof axisOrIsFontSize === "boolean" ? [void 0, axisOrIsFontSize] : [axisOrIsFontSize];
    var {
      viewPort
    } = this.document.screen;
    switch (true) {
      case this.isString(/vmin$/):
        return this.getNumber() / 100 * Math.min(viewPort.computeSize("x"), viewPort.computeSize("y"));
      case this.isString(/vmax$/):
        return this.getNumber() / 100 * Math.max(viewPort.computeSize("x"), viewPort.computeSize("y"));
      case this.isString(/vw$/):
        return this.getNumber() / 100 * viewPort.computeSize("x");
      case this.isString(/vh$/):
        return this.getNumber() / 100 * viewPort.computeSize("y");
      case this.isString(/rem$/):
        return this.getNumber() * this.getRem();
      case this.isString(/em$/):
        return this.getNumber() * this.getEm();
      case this.isString(/ex$/):
        return this.getNumber() * this.getEm() / 2;
      case this.isString(/px$/):
        return this.getNumber();
      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi() * (1 / 72);
      case this.isString(/pc$/):
        return this.getNumber() * 15;
      case this.isString(/cm$/):
        return this.getNumber() * this.getDpi() / 2.54;
      case this.isString(/mm$/):
        return this.getNumber() * this.getDpi() / 25.4;
      case this.isString(/in$/):
        return this.getNumber() * this.getDpi();
      case (this.isString(/%$/) && isFontSize):
        return this.getNumber() * this.getEm();
      case this.isString(/%$/):
        return this.getNumber() * viewPort.computeSize(axis);
      default: {
        var n = this.getNumber();
        if (processPercent && n < 1) {
          return n * viewPort.computeSize(axis);
        }
        return n;
      }
    }
  }
  getMilliseconds() {
    if (!this.hasValue()) {
      return 0;
    }
    if (this.isString(/ms$/)) {
      return this.getNumber();
    }
    return this.getNumber() * 1e3;
  }
  getRadians() {
    if (!this.hasValue()) {
      return 0;
    }
    switch (true) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180);
      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200);
      case this.isString(/rad$/):
        return this.getNumber();
      default:
        return this.getNumber() * (Math.PI / 180);
    }
  }
  getDefinition() {
    var asString = this.getString();
    var name = /#([^)'"]+)/.exec(asString);
    if (name) {
      name = name[1];
    }
    if (!name) {
      name = asString;
    }
    return this.document.definitions[name];
  }
  getFillStyleDefinition(element, opacity) {
    var def = this.getDefinition();
    if (!def) {
      return null;
    }
    if (typeof def.createGradient === "function") {
      return def.createGradient(this.document.ctx, element, opacity);
    }
    if (typeof def.createPattern === "function") {
      if (def.getHrefAttribute().hasValue()) {
        var patternTransform = def.getAttribute("patternTransform");
        def = def.getHrefAttribute().getDefinition();
        if (patternTransform.hasValue()) {
          def.getAttribute("patternTransform", true).setValue(patternTransform.value);
        }
      }
      return def.createPattern(this.document.ctx, element, opacity);
    }
    return null;
  }
  getTextBaseline() {
    if (!this.hasValue()) {
      return null;
    }
    return Property.textBaselineMapping[this.getString()];
  }
  addOpacity(opacity) {
    var value = this.getColor();
    var len = value.length;
    var commas = 0;
    for (var i = 0; i < len; i++) {
      if (value[i] === ",") {
        commas++;
      }
      if (commas === 3) {
        break;
      }
    }
    if (opacity.hasValue() && this.isString() && commas !== 3) {
      var color = new RGBColor(value);
      if (color.ok) {
        color.alpha = opacity.getNumber();
        value = color.toRGBA();
      }
    }
    return new Property(this.document, this.name, value);
  }
}
Property.textBaselineMapping = {
  "baseline": "alphabetic",
  "before-edge": "top",
  "text-before-edge": "top",
  "middle": "middle",
  "central": "middle",
  "after-edge": "bottom",
  "text-after-edge": "bottom",
  "ideographic": "ideographic",
  "alphabetic": "alphabetic",
  "hanging": "hanging",
  "mathematical": "alphabetic"
};
class ViewPort {
  constructor() {
    this.viewPorts = [];
  }
  clear() {
    this.viewPorts = [];
  }
  setCurrent(width, height) {
    this.viewPorts.push({
      width,
      height
    });
  }
  removeCurrent() {
    this.viewPorts.pop();
  }
  getCurrent() {
    var {
      viewPorts
    } = this;
    return viewPorts[viewPorts.length - 1];
  }
  get width() {
    return this.getCurrent().width;
  }
  get height() {
    return this.getCurrent().height;
  }
  computeSize(d) {
    if (typeof d === "number") {
      return d;
    }
    if (d === "x") {
      return this.width;
    }
    if (d === "y") {
      return this.height;
    }
    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static parse(point) {
    var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var [x = defaultValue, y = defaultValue] = toNumbers(point);
    return new Point(x, y);
  }
  static parseScale(scale) {
    var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var [x = defaultValue, y = x] = toNumbers(scale);
    return new Point(x, y);
  }
  static parsePath(path) {
    var points = toNumbers(path);
    var len = points.length;
    var pathPoints = [];
    for (var i = 0; i < len; i += 2) {
      pathPoints.push(new Point(points[i], points[i + 1]));
    }
    return pathPoints;
  }
  angleTo(point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
  applyTransform(transform) {
    var {
      x,
      y
    } = this;
    var xp = x * transform[0] + y * transform[2] + transform[4];
    var yp = x * transform[1] + y * transform[3] + transform[5];
    this.x = xp;
    this.y = yp;
  }
}
class Mouse {
  constructor(screen) {
    this.screen = screen;
    this.working = false;
    this.events = [];
    this.eventElements = [];
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  isWorking() {
    return this.working;
  }
  start() {
    if (this.working) {
      return;
    }
    var {
      screen,
      onClick,
      onMouseMove
    } = this;
    var canvas = screen.ctx.canvas;
    canvas.onclick = onClick;
    canvas.onmousemove = onMouseMove;
    this.working = true;
  }
  stop() {
    if (!this.working) {
      return;
    }
    var canvas = this.screen.ctx.canvas;
    this.working = false;
    canvas.onclick = null;
    canvas.onmousemove = null;
  }
  hasEvents() {
    return this.working && this.events.length > 0;
  }
  runEvents() {
    if (!this.working) {
      return;
    }
    var {
      screen: document2,
      events,
      eventElements
    } = this;
    var {
      style
    } = document2.ctx.canvas;
    if (style) {
      style.cursor = "";
    }
    events.forEach((_ref, i) => {
      var {
        run: run2
      } = _ref;
      var element = eventElements[i];
      while (element) {
        run2(element);
        element = element.parent;
      }
    });
    this.events = [];
    this.eventElements = [];
  }
  checkPath(element, ctx) {
    if (!this.working || !ctx) {
      return;
    }
    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref2, i) => {
      var {
        x,
        y
      } = _ref2;
      if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
        eventElements[i] = element;
      }
    });
  }
  checkBoundingBox(element, boundingBox) {
    if (!this.working || !boundingBox) {
      return;
    }
    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref3, i) => {
      var {
        x,
        y
      } = _ref3;
      if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
        eventElements[i] = element;
      }
    });
  }
  mapXY(x, y) {
    var {
      window: window2,
      ctx
    } = this.screen;
    var point = new Point(x, y);
    var element = ctx.canvas;
    while (element) {
      point.x -= element.offsetLeft;
      point.y -= element.offsetTop;
      element = element.offsetParent;
    }
    if (window2.scrollX) {
      point.x += window2.scrollX;
    }
    if (window2.scrollY) {
      point.y += window2.scrollY;
    }
    return point;
  }
  onClick(event) {
    var {
      x,
      y
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: "onclick",
      x,
      y,
      run(eventTarget) {
        if (eventTarget.onClick) {
          eventTarget.onClick();
        }
      }
    });
  }
  onMouseMove(event) {
    var {
      x,
      y
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: "onmousemove",
      x,
      y,
      run(eventTarget) {
        if (eventTarget.onMouseMove) {
          eventTarget.onMouseMove();
        }
      }
    });
  }
}
var defaultWindow = typeof window !== "undefined" ? window : null;
var defaultFetch$1 = typeof fetch !== "undefined" ? fetch.bind(void 0) : null;
class Screen {
  constructor(ctx) {
    var {
      fetch: fetch2 = defaultFetch$1,
      window: window2 = defaultWindow
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.ctx = ctx;
    this.FRAMERATE = 30;
    this.MAX_VIRTUAL_PIXELS = 3e4;
    this.CLIENT_WIDTH = 800;
    this.CLIENT_HEIGHT = 600;
    this.viewPort = new ViewPort();
    this.mouse = new Mouse(this);
    this.animations = [];
    this.waits = [];
    this.frameDuration = 0;
    this.isReadyLock = false;
    this.isFirstRender = true;
    this.intervalId = null;
    this.window = window2;
    this.fetch = fetch2;
  }
  wait(checker) {
    this.waits.push(checker);
  }
  ready() {
    if (!this.readyPromise) {
      return Promise.resolve();
    }
    return this.readyPromise;
  }
  isReady() {
    if (this.isReadyLock) {
      return true;
    }
    var isReadyLock = this.waits.every((_2) => _2());
    if (isReadyLock) {
      this.waits = [];
      if (this.resolveReady) {
        this.resolveReady();
      }
    }
    this.isReadyLock = isReadyLock;
    return isReadyLock;
  }
  setDefaults(ctx) {
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 4;
  }
  setViewBox(_ref) {
    var {
      document: document2,
      ctx,
      aspectRatio,
      width,
      desiredWidth,
      height,
      desiredHeight,
      minX = 0,
      minY = 0,
      refX,
      refY,
      clip = false,
      clipX = 0,
      clipY = 0
    } = _ref;
    var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, "");
    var [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(" ");
    var align = aspectRatioAlign || "xMidYMid";
    var meetOrSlice = aspectRatioMeetOrSlice || "meet";
    var scaleX = width / desiredWidth;
    var scaleY = height / desiredHeight;
    var scaleMin = Math.min(scaleX, scaleY);
    var scaleMax = Math.max(scaleX, scaleY);
    var finalDesiredWidth = desiredWidth;
    var finalDesiredHeight = desiredHeight;
    if (meetOrSlice === "meet") {
      finalDesiredWidth *= scaleMin;
      finalDesiredHeight *= scaleMin;
    }
    if (meetOrSlice === "slice") {
      finalDesiredWidth *= scaleMax;
      finalDesiredHeight *= scaleMax;
    }
    var refXProp = new Property(document2, "refX", refX);
    var refYProp = new Property(document2, "refY", refY);
    var hasRefs = refXProp.hasValue() && refYProp.hasValue();
    if (hasRefs) {
      ctx.translate(-scaleMin * refXProp.getPixels("x"), -scaleMin * refYProp.getPixels("y"));
    }
    if (clip) {
      var scaledClipX = scaleMin * clipX;
      var scaledClipY = scaleMin * clipY;
      ctx.beginPath();
      ctx.moveTo(scaledClipX, scaledClipY);
      ctx.lineTo(width, scaledClipY);
      ctx.lineTo(width, height);
      ctx.lineTo(scaledClipX, height);
      ctx.closePath();
      ctx.clip();
    }
    if (!hasRefs) {
      var isMeetMinY = meetOrSlice === "meet" && scaleMin === scaleY;
      var isSliceMaxY = meetOrSlice === "slice" && scaleMax === scaleY;
      var isMeetMinX = meetOrSlice === "meet" && scaleMin === scaleX;
      var isSliceMaxX = meetOrSlice === "slice" && scaleMax === scaleX;
      if (align.startsWith("xMid") && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width / 2 - finalDesiredWidth / 2, 0);
      }
      if (align.endsWith("YMid") && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height / 2 - finalDesiredHeight / 2);
      }
      if (align.startsWith("xMax") && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width - finalDesiredWidth, 0);
      }
      if (align.endsWith("YMax") && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height - finalDesiredHeight);
      }
    }
    switch (true) {
      case align === "none":
        ctx.scale(scaleX, scaleY);
        break;
      case meetOrSlice === "meet":
        ctx.scale(scaleMin, scaleMin);
        break;
      case meetOrSlice === "slice":
        ctx.scale(scaleMax, scaleMax);
        break;
    }
    ctx.translate(-minX, -minY);
  }
  start(element) {
    var {
      enableRedraw = false,
      ignoreMouse = false,
      ignoreAnimation = false,
      ignoreDimensions = false,
      ignoreClear = false,
      forceRedraw,
      scaleWidth,
      scaleHeight,
      offsetX,
      offsetY
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var {
      FRAMERATE,
      mouse
    } = this;
    var frameDuration = 1e3 / FRAMERATE;
    this.frameDuration = frameDuration;
    this.readyPromise = new Promise((resolve2) => {
      this.resolveReady = resolve2;
    });
    if (this.isReady()) {
      this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
    }
    if (!enableRedraw) {
      return;
    }
    var now = Date.now();
    var then2 = now;
    var delta = 0;
    var tick = () => {
      now = Date.now();
      delta = now - then2;
      if (delta >= frameDuration) {
        then2 = now - delta % frameDuration;
        if (this.shouldUpdate(ignoreAnimation, forceRedraw)) {
          this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
          mouse.runEvents();
        }
      }
      this.intervalId = requestAnimationFrame(tick);
    };
    if (!ignoreMouse) {
      mouse.start();
    }
    this.intervalId = requestAnimationFrame(tick);
  }
  stop() {
    if (this.intervalId) {
      requestAnimationFrame.cancel(this.intervalId);
      this.intervalId = null;
    }
    this.mouse.stop();
  }
  shouldUpdate(ignoreAnimation, forceRedraw) {
    if (!ignoreAnimation) {
      var {
        frameDuration
      } = this;
      var shouldUpdate = this.animations.reduce((shouldUpdate2, animation) => animation.update(frameDuration) || shouldUpdate2, false);
      if (shouldUpdate) {
        return true;
      }
    }
    if (typeof forceRedraw === "function" && forceRedraw()) {
      return true;
    }
    if (!this.isReadyLock && this.isReady()) {
      return true;
    }
    if (this.mouse.hasEvents()) {
      return true;
    }
    return false;
  }
  render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
    var {
      CLIENT_WIDTH,
      CLIENT_HEIGHT,
      viewPort,
      ctx,
      isFirstRender
    } = this;
    var canvas = ctx.canvas;
    viewPort.clear();
    if (canvas.width && canvas.height) {
      viewPort.setCurrent(canvas.width, canvas.height);
    } else {
      viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
    }
    var widthStyle = element.getStyle("width");
    var heightStyle = element.getStyle("height");
    if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== "number" && typeof scaleHeight !== "number")) {
      if (widthStyle.hasValue()) {
        canvas.width = widthStyle.getPixels("x");
        if (canvas.style) {
          canvas.style.width = "".concat(canvas.width, "px");
        }
      }
      if (heightStyle.hasValue()) {
        canvas.height = heightStyle.getPixels("y");
        if (canvas.style) {
          canvas.style.height = "".concat(canvas.height, "px");
        }
      }
    }
    var cWidth = canvas.clientWidth || canvas.width;
    var cHeight = canvas.clientHeight || canvas.height;
    if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
      cWidth = widthStyle.getPixels("x");
      cHeight = heightStyle.getPixels("y");
    }
    viewPort.setCurrent(cWidth, cHeight);
    if (typeof offsetX === "number") {
      element.getAttribute("x", true).setValue(offsetX);
    }
    if (typeof offsetY === "number") {
      element.getAttribute("y", true).setValue(offsetY);
    }
    if (typeof scaleWidth === "number" || typeof scaleHeight === "number") {
      var viewBox = toNumbers(element.getAttribute("viewBox").getString());
      var xRatio = 0;
      var yRatio = 0;
      if (typeof scaleWidth === "number") {
        var _widthStyle = element.getStyle("width");
        if (_widthStyle.hasValue()) {
          xRatio = _widthStyle.getPixels("x") / scaleWidth;
        } else if (!isNaN(viewBox[2])) {
          xRatio = viewBox[2] / scaleWidth;
        }
      }
      if (typeof scaleHeight === "number") {
        var _heightStyle = element.getStyle("height");
        if (_heightStyle.hasValue()) {
          yRatio = _heightStyle.getPixels("y") / scaleHeight;
        } else if (!isNaN(viewBox[3])) {
          yRatio = viewBox[3] / scaleHeight;
        }
      }
      if (!xRatio) {
        xRatio = yRatio;
      }
      if (!yRatio) {
        yRatio = xRatio;
      }
      element.getAttribute("width", true).setValue(scaleWidth);
      element.getAttribute("height", true).setValue(scaleHeight);
      var transformStyle = element.getStyle("transform", true, true);
      transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1 / xRatio, ", ").concat(1 / yRatio, ")"));
    }
    if (!ignoreClear) {
      ctx.clearRect(0, 0, cWidth, cHeight);
    }
    element.render(ctx);
    if (isFirstRender) {
      this.isFirstRender = false;
    }
  }
}
Screen.defaultWindow = defaultWindow;
Screen.defaultFetch = defaultFetch$1;
var {
  defaultFetch
} = Screen;
var DefaultDOMParser = typeof DOMParser !== "undefined" ? DOMParser : null;
class Parser {
  constructor() {
    var {
      fetch: fetch2 = defaultFetch,
      DOMParser: DOMParser2 = DefaultDOMParser
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fetch = fetch2;
    this.DOMParser = DOMParser2;
  }
  parse(resource) {
    var _this = this;
    return _asyncToGenerator(function* () {
      if (resource.startsWith("<")) {
        return _this.parseFromString(resource);
      }
      return _this.load(resource);
    })();
  }
  parseFromString(xml) {
    var parser = new this.DOMParser();
    try {
      return this.checkDocument(parser.parseFromString(xml, "image/svg+xml"));
    } catch (err) {
      return this.checkDocument(parser.parseFromString(xml, "text/xml"));
    }
  }
  checkDocument(document2) {
    var parserError = document2.getElementsByTagName("parsererror")[0];
    if (parserError) {
      throw new Error(parserError.textContent);
    }
    return document2;
  }
  load(url) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      var response = yield _this2.fetch(url);
      var xml = yield response.text();
      return _this2.parseFromString(xml);
    })();
  }
}
class Translate {
  constructor(_2, point) {
    this.type = "translate";
    this.point = null;
    this.point = Point.parse(point);
  }
  apply(ctx) {
    var {
      x,
      y
    } = this.point;
    ctx.translate(x || 0, y || 0);
  }
  unapply(ctx) {
    var {
      x,
      y
    } = this.point;
    ctx.translate(-1 * x || 0, -1 * y || 0);
  }
  applyToPoint(point) {
    var {
      x,
      y
    } = this.point;
    point.applyTransform([1, 0, 0, 1, x || 0, y || 0]);
  }
}
class Rotate {
  constructor(document2, rotate, transformOrigin) {
    this.type = "rotate";
    this.angle = null;
    this.originX = null;
    this.originY = null;
    this.cx = 0;
    this.cy = 0;
    var numbers = toNumbers(rotate);
    this.angle = new Property(document2, "angle", numbers[0]);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
    this.cx = numbers[1] || 0;
    this.cy = numbers[2] || 0;
  }
  apply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels("x");
    var ty = cy + originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.rotate(angle.getRadians());
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels("x");
    var ty = cy + originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.rotate(-1 * angle.getRadians());
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    var {
      cx,
      cy,
      angle
    } = this;
    var rad = angle.getRadians();
    point.applyTransform([
      1,
      0,
      0,
      1,
      cx || 0,
      cy || 0
    ]);
    point.applyTransform([Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0]);
    point.applyTransform([
      1,
      0,
      0,
      1,
      -cx || 0,
      -cy || 0
    ]);
  }
}
class Scale {
  constructor(_2, scale, transformOrigin) {
    this.type = "scale";
    this.scale = null;
    this.originX = null;
    this.originY = null;
    var scaleSize = Point.parseScale(scale);
    if (scaleSize.x === 0 || scaleSize.y === 0) {
      scaleSize.x = PSEUDO_ZERO;
      scaleSize.y = PSEUDO_ZERO;
    }
    this.scale = scaleSize;
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }
  apply(ctx) {
    var {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.scale(x, y || x);
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.scale(1 / x, 1 / y || x);
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    var {
      x,
      y
    } = this.scale;
    point.applyTransform([x || 0, 0, 0, y || 0, 0, 0]);
  }
}
class Matrix {
  constructor(_2, matrix, transformOrigin) {
    this.type = "matrix";
    this.matrix = [];
    this.originX = null;
    this.originY = null;
    this.matrix = toNumbers(matrix);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }
  apply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var a = matrix[0];
    var b = matrix[2];
    var c2 = matrix[4];
    var d = matrix[1];
    var e = matrix[3];
    var f = matrix[5];
    var g = 0;
    var h = 0;
    var i = 1;
    var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c2 * (d * h - e * g));
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c2 * h - b * i), det * (a * i - c2 * g), det * (b * f - c2 * e), det * (c2 * d - a * f));
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    point.applyTransform(this.matrix);
  }
}
class Skew extends Matrix {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skew";
    this.angle = null;
    this.angle = new Property(document2, "angle", skew);
  }
}
class SkewX extends Skew {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skewX";
    this.matrix = [1, 0, Math.tan(this.angle.getRadians()), 1, 0, 0];
  }
}
class SkewY extends Skew {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skewY";
    this.matrix = [1, Math.tan(this.angle.getRadians()), 0, 1, 0, 0];
  }
}
function parseTransforms(transform) {
  return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/);
}
function parseTransform(transform) {
  var [type, value] = transform.split("(");
  return [type.trim(), value.trim().replace(")", "")];
}
class Transform {
  constructor(document2, transform, transformOrigin) {
    this.document = document2;
    this.transforms = [];
    var data2 = parseTransforms(transform);
    data2.forEach((transform2) => {
      if (transform2 === "none") {
        return;
      }
      var [type, value] = parseTransform(transform2);
      var TransformType = Transform.transformTypes[type];
      if (typeof TransformType !== "undefined") {
        this.transforms.push(new TransformType(this.document, value, transformOrigin));
      }
    });
  }
  static fromElement(document2, element) {
    var transformStyle = element.getStyle("transform", false, true);
    var [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element.getStyle("transform-origin", false, true).split();
    var transformOrigin = [transformOriginXProperty, transformOriginYProperty];
    if (transformStyle.hasValue()) {
      return new Transform(document2, transformStyle.getString(), transformOrigin);
    }
    return null;
  }
  apply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i = 0; i < len; i++) {
      transforms[i].apply(ctx);
    }
  }
  unapply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i = len - 1; i >= 0; i--) {
      transforms[i].unapply(ctx);
    }
  }
  applyToPoint(point) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i = 0; i < len; i++) {
      transforms[i].applyToPoint(point);
    }
  }
}
Transform.transformTypes = {
  translate: Translate,
  rotate: Rotate,
  scale: Scale,
  matrix: Matrix,
  skewX: SkewX,
  skewY: SkewY
};
class Element {
  constructor(document2, node2) {
    var captureTextNodes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    this.document = document2;
    this.node = node2;
    this.captureTextNodes = captureTextNodes;
    this.attributes = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.animationFrozen = false;
    this.animationFrozenValue = "";
    this.parent = null;
    this.children = [];
    if (!node2 || node2.nodeType !== 1) {
      return;
    }
    Array.from(node2.attributes).forEach((attribute) => {
      var nodeName = normalizeAttributeName(attribute.nodeName);
      this.attributes[nodeName] = new Property(document2, nodeName, attribute.value);
    });
    this.addStylesFromStyleDefinition();
    if (this.getAttribute("style").hasValue()) {
      var styles = this.getAttribute("style").getString().split(";").map((_2) => _2.trim());
      styles.forEach((style) => {
        if (!style) {
          return;
        }
        var [name, value] = style.split(":").map((_2) => _2.trim());
        this.styles[name] = new Property(document2, name, value);
      });
    }
    var {
      definitions
    } = document2;
    var id2 = this.getAttribute("id");
    if (id2.hasValue()) {
      if (!definitions[id2.getString()]) {
        definitions[id2.getString()] = this;
      }
    }
    Array.from(node2.childNodes).forEach((childNode) => {
      if (childNode.nodeType === 1) {
        this.addChild(childNode);
      } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
        var textNode = document2.createTextNode(childNode);
        if (textNode.getText().length > 0) {
          this.addChild(textNode);
        }
      }
    });
  }
  getAttribute(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var attr = this.attributes[name];
    if (!attr && createIfNotExists) {
      var _attr = new Property(this.document, name, "");
      this.attributes[name] = _attr;
      return _attr;
    }
    return attr || Property.empty(this.document);
  }
  getHrefAttribute() {
    for (var key in this.attributes) {
      if (key === "href" || key.endsWith(":href")) {
        return this.attributes[key];
      }
    }
    return Property.empty(this.document);
  }
  getStyle(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var skipAncestors = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var style = this.styles[name];
    if (style) {
      return style;
    }
    var attr = this.getAttribute(name);
    if (attr !== null && attr !== void 0 && attr.hasValue()) {
      this.styles[name] = attr;
      return attr;
    }
    if (!skipAncestors) {
      var {
        parent
      } = this;
      if (parent) {
        var parentStyle = parent.getStyle(name);
        if (parentStyle !== null && parentStyle !== void 0 && parentStyle.hasValue()) {
          return parentStyle;
        }
      }
    }
    if (createIfNotExists) {
      var _style = new Property(this.document, name, "");
      this.styles[name] = _style;
      return _style;
    }
    return style || Property.empty(this.document);
  }
  render(ctx) {
    if (this.getStyle("display").getString() === "none" || this.getStyle("visibility").getString() === "hidden") {
      return;
    }
    ctx.save();
    if (this.getStyle("mask").hasValue()) {
      var mask = this.getStyle("mask").getDefinition();
      if (mask) {
        this.applyEffects(ctx);
        mask.apply(ctx, this);
      }
    } else if (this.getStyle("filter").getValue("none") !== "none") {
      var filter = this.getStyle("filter").getDefinition();
      if (filter) {
        this.applyEffects(ctx);
        filter.apply(ctx, this);
      }
    } else {
      this.setContext(ctx);
      this.renderChildren(ctx);
      this.clearContext(ctx);
    }
    ctx.restore();
  }
  setContext(_2) {
  }
  applyEffects(ctx) {
    var transform = Transform.fromElement(this.document, this);
    if (transform) {
      transform.apply(ctx);
    }
    var clipPathStyleProp = this.getStyle("clip-path", false, true);
    if (clipPathStyleProp.hasValue()) {
      var clip = clipPathStyleProp.getDefinition();
      if (clip) {
        clip.apply(ctx);
      }
    }
  }
  clearContext(_2) {
  }
  renderChildren(ctx) {
    this.children.forEach((child) => {
      child.render(ctx);
    });
  }
  addChild(childNode) {
    var child = childNode instanceof Element ? childNode : this.document.createElement(childNode);
    child.parent = this;
    if (!Element.ignoreChildTypes.includes(child.type)) {
      this.children.push(child);
    }
  }
  matchesSelector(selector) {
    var _node$getAttribute;
    var {
      node: node2
    } = this;
    if (typeof node2.matches === "function") {
      return node2.matches(selector);
    }
    var styleClasses = (_node$getAttribute = node2.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node2, "class");
    if (!styleClasses || styleClasses === "") {
      return false;
    }
    return styleClasses.split(" ").some((styleClass) => ".".concat(styleClass) === selector);
  }
  addStylesFromStyleDefinition() {
    var {
      styles,
      stylesSpecificity
    } = this.document;
    for (var selector in styles) {
      if (!selector.startsWith("@") && this.matchesSelector(selector)) {
        var style = styles[selector];
        var specificity = stylesSpecificity[selector];
        if (style) {
          for (var name in style) {
            var existingSpecificity = this.stylesSpecificity[name];
            if (typeof existingSpecificity === "undefined") {
              existingSpecificity = "000";
            }
            if (specificity >= existingSpecificity) {
              this.styles[name] = style[name];
              this.stylesSpecificity[name] = specificity;
            }
          }
        }
      }
    }
  }
  removeStyles(element, ignoreStyles) {
    var toRestore = ignoreStyles.reduce((toRestore2, name) => {
      var styleProp = element.getStyle(name);
      if (!styleProp.hasValue()) {
        return toRestore2;
      }
      var value = styleProp.getString();
      styleProp.setValue("");
      return [...toRestore2, [name, value]];
    }, []);
    return toRestore;
  }
  restoreStyles(element, styles) {
    styles.forEach((_ref) => {
      var [name, value] = _ref;
      element.getStyle(name, true).setValue(value);
    });
  }
  isFirstChild() {
    var _this$parent;
    return ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.children.indexOf(this)) === 0;
  }
}
Element.ignoreChildTypes = ["title"];
class UnknownElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
  }
}
function wrapFontFamily(fontFamily) {
  var trimmed = fontFamily.trim();
  return /^('|")/.test(trimmed) ? trimmed : '"'.concat(trimmed, '"');
}
function prepareFontFamily(fontFamily) {
  return typeof process === "undefined" ? fontFamily : fontFamily.trim().split(",").map(wrapFontFamily).join(",");
}
function prepareFontStyle(fontStyle) {
  if (!fontStyle) {
    return "";
  }
  var targetFontStyle = fontStyle.trim().toLowerCase();
  switch (targetFontStyle) {
    case "normal":
    case "italic":
    case "oblique":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontStyle;
    default:
      if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
        return targetFontStyle;
      }
      return "";
  }
}
function prepareFontWeight(fontWeight) {
  if (!fontWeight) {
    return "";
  }
  var targetFontWeight = fontWeight.trim().toLowerCase();
  switch (targetFontWeight) {
    case "normal":
    case "bold":
    case "lighter":
    case "bolder":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontWeight;
    default:
      if (/^[\d.]+$/.test(targetFontWeight)) {
        return targetFontWeight;
      }
      return "";
  }
}
class Font {
  constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
    var inheritFont = inherit ? typeof inherit === "string" ? Font.parse(inherit) : inherit : {};
    this.fontFamily = fontFamily || inheritFont.fontFamily;
    this.fontSize = fontSize || inheritFont.fontSize;
    this.fontStyle = fontStyle || inheritFont.fontStyle;
    this.fontWeight = fontWeight || inheritFont.fontWeight;
    this.fontVariant = fontVariant || inheritFont.fontVariant;
  }
  static parse() {
    var font = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var inherit = arguments.length > 1 ? arguments[1] : void 0;
    var fontStyle = "";
    var fontVariant = "";
    var fontWeight = "";
    var fontSize = "";
    var fontFamily = "";
    var parts = compressSpaces(font).trim().split(" ");
    var set2 = {
      fontSize: false,
      fontStyle: false,
      fontWeight: false,
      fontVariant: false
    };
    parts.forEach((part) => {
      switch (true) {
        case (!set2.fontStyle && Font.styles.includes(part)):
          if (part !== "inherit") {
            fontStyle = part;
          }
          set2.fontStyle = true;
          break;
        case (!set2.fontVariant && Font.variants.includes(part)):
          if (part !== "inherit") {
            fontVariant = part;
          }
          set2.fontStyle = true;
          set2.fontVariant = true;
          break;
        case (!set2.fontWeight && Font.weights.includes(part)):
          if (part !== "inherit") {
            fontWeight = part;
          }
          set2.fontStyle = true;
          set2.fontVariant = true;
          set2.fontWeight = true;
          break;
        case !set2.fontSize:
          if (part !== "inherit") {
            [fontSize] = part.split("/");
          }
          set2.fontStyle = true;
          set2.fontVariant = true;
          set2.fontWeight = true;
          set2.fontSize = true;
          break;
        default:
          if (part !== "inherit") {
            fontFamily += part;
          }
      }
    });
    return new Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
  }
  toString() {
    return [
      prepareFontStyle(this.fontStyle),
      this.fontVariant,
      prepareFontWeight(this.fontWeight),
      this.fontSize,
      prepareFontFamily(this.fontFamily)
    ].join(" ").trim();
  }
}
Font.styles = "normal|italic|oblique|inherit";
Font.variants = "normal|small-caps|inherit";
Font.weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
class BoundingBox {
  constructor() {
    var x1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Number.NaN;
    var y1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.NaN;
    var x2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Number.NaN;
    var y2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Number.NaN;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }
  get x() {
    return this.x1;
  }
  get y() {
    return this.y1;
  }
  get width() {
    return this.x2 - this.x1;
  }
  get height() {
    return this.y2 - this.y1;
  }
  addPoint(x, y) {
    if (typeof x !== "undefined") {
      if (isNaN(this.x1) || isNaN(this.x2)) {
        this.x1 = x;
        this.x2 = x;
      }
      if (x < this.x1) {
        this.x1 = x;
      }
      if (x > this.x2) {
        this.x2 = x;
      }
    }
    if (typeof y !== "undefined") {
      if (isNaN(this.y1) || isNaN(this.y2)) {
        this.y1 = y;
        this.y2 = y;
      }
      if (y < this.y1) {
        this.y1 = y;
      }
      if (y > this.y2) {
        this.y2 = y;
      }
    }
  }
  addX(x) {
    this.addPoint(x, null);
  }
  addY(y) {
    this.addPoint(null, y);
  }
  addBoundingBox(boundingBox) {
    if (!boundingBox) {
      return;
    }
    var {
      x1,
      y1,
      x2,
      y2
    } = boundingBox;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }
  sumCubic(t, p0, p1, p2, p3) {
    return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
  }
  bezierCurveAdd(forX, p0, p1, p2, p3) {
    var b = 6 * p0 - 12 * p1 + 6 * p2;
    var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
    var c2 = 3 * p1 - 3 * p0;
    if (a === 0) {
      if (b === 0) {
        return;
      }
      var t = -c2 / b;
      if (0 < t && t < 1) {
        if (forX) {
          this.addX(this.sumCubic(t, p0, p1, p2, p3));
        } else {
          this.addY(this.sumCubic(t, p0, p1, p2, p3));
        }
      }
      return;
    }
    var b2ac = Math.pow(b, 2) - 4 * c2 * a;
    if (b2ac < 0) {
      return;
    }
    var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
    if (0 < t1 && t1 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t1, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t1, p0, p1, p2, p3));
      }
    }
    var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
    if (0 < t2 && t2 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t2, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t2, p0, p1, p2, p3));
      }
    }
  }
  addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
    this.addPoint(p0x, p0y);
    this.addPoint(p3x, p3y);
    this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
    this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
  }
  addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
    var cp1x = p0x + 2 / 3 * (p1x - p0x);
    var cp1y = p0y + 2 / 3 * (p1y - p0y);
    var cp2x = cp1x + 1 / 3 * (p2x - p0x);
    var cp2y = cp1y + 1 / 3 * (p2y - p0y);
    this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
  }
  isPointInBox(x, y) {
    var {
      x1,
      y1,
      x2,
      y2
    } = this;
    return x1 <= x && x <= x2 && y1 <= y && y <= y2;
  }
}
class PathParser extends _ {
  constructor(path) {
    super(path.replace(/([+\-.])\s+/gm, "$1").replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ""));
    this.control = null;
    this.start = null;
    this.current = null;
    this.command = null;
    this.commands = this.commands;
    this.i = -1;
    this.previousCommand = null;
    this.points = [];
    this.angles = [];
  }
  reset() {
    this.i = -1;
    this.command = null;
    this.previousCommand = null;
    this.start = new Point(0, 0);
    this.control = new Point(0, 0);
    this.current = new Point(0, 0);
    this.points = [];
    this.angles = [];
  }
  isEnd() {
    var {
      i,
      commands
    } = this;
    return i >= commands.length - 1;
  }
  next() {
    var command = this.commands[++this.i];
    this.previousCommand = this.command;
    this.command = command;
    return command;
  }
  getPoint() {
    var xProp = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "x";
    var yProp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
    var point = new Point(this.command[xProp], this.command[yProp]);
    return this.makeAbsolute(point);
  }
  getAsControlPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.control = point;
    return point;
  }
  getAsCurrentPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.current = point;
    return point;
  }
  getReflectedControlPoint() {
    var previousCommand = this.previousCommand.type;
    if (previousCommand !== _.CURVE_TO && previousCommand !== _.SMOOTH_CURVE_TO && previousCommand !== _.QUAD_TO && previousCommand !== _.SMOOTH_QUAD_TO) {
      return this.current;
    }
    var {
      current: {
        x: cx,
        y: cy
      },
      control: {
        x: ox,
        y: oy
      }
    } = this;
    var point = new Point(2 * cx - ox, 2 * cy - oy);
    return point;
  }
  makeAbsolute(point) {
    if (this.command.relative) {
      var {
        x,
        y
      } = this.current;
      point.x += x;
      point.y += y;
    }
    return point;
  }
  addMarker(point, from, priorTo) {
    var {
      points,
      angles
    } = this;
    if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
      angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
    }
    this.addMarkerAngle(point, from ? from.angleTo(point) : null);
  }
  addMarkerAngle(point, angle) {
    this.points.push(point);
    this.angles.push(angle);
  }
  getMarkerPoints() {
    return this.points;
  }
  getMarkerAngles() {
    var {
      angles
    } = this;
    var len = angles.length;
    for (var i = 0; i < len; i++) {
      if (!angles[i]) {
        for (var j = i + 1; j < len; j++) {
          if (angles[j]) {
            angles[i] = angles[j];
            break;
          }
        }
      }
    }
    return angles;
  }
}
class RenderedElement extends Element {
  constructor() {
    super(...arguments);
    this.modifiedEmSizeStack = false;
  }
  calculateOpacity() {
    var opacity = 1;
    var element = this;
    while (element) {
      var opacityStyle = element.getStyle("opacity", false, true);
      if (opacityStyle.hasValue(true)) {
        opacity *= opacityStyle.getNumber();
      }
      element = element.parent;
    }
    return opacity;
  }
  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!fromMeasure) {
      var fillStyleProp = this.getStyle("fill");
      var fillOpacityStyleProp = this.getStyle("fill-opacity");
      var strokeStyleProp = this.getStyle("stroke");
      var strokeOpacityProp = this.getStyle("stroke-opacity");
      if (fillStyleProp.isUrlDefinition()) {
        var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
        }
      } else if (fillStyleProp.hasValue()) {
        if (fillStyleProp.getString() === "currentColor") {
          fillStyleProp.setValue(this.getStyle("color").getColor());
        }
        var _fillStyle = fillStyleProp.getColor();
        if (_fillStyle !== "inherit") {
          ctx.fillStyle = _fillStyle === "none" ? "rgba(0,0,0,0)" : _fillStyle;
        }
      }
      if (fillOpacityStyleProp.hasValue()) {
        var _fillStyle2 = new Property(this.document, "fill", ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();
        ctx.fillStyle = _fillStyle2;
      }
      if (strokeStyleProp.isUrlDefinition()) {
        var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);
        if (strokeStyle) {
          ctx.strokeStyle = strokeStyle;
        }
      } else if (strokeStyleProp.hasValue()) {
        if (strokeStyleProp.getString() === "currentColor") {
          strokeStyleProp.setValue(this.getStyle("color").getColor());
        }
        var _strokeStyle = strokeStyleProp.getString();
        if (_strokeStyle !== "inherit") {
          ctx.strokeStyle = _strokeStyle === "none" ? "rgba(0,0,0,0)" : _strokeStyle;
        }
      }
      if (strokeOpacityProp.hasValue()) {
        var _strokeStyle2 = new Property(this.document, "stroke", ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();
        ctx.strokeStyle = _strokeStyle2;
      }
      var strokeWidthStyleProp = this.getStyle("stroke-width");
      if (strokeWidthStyleProp.hasValue()) {
        var newLineWidth = strokeWidthStyleProp.getPixels();
        ctx.lineWidth = !newLineWidth ? PSEUDO_ZERO : newLineWidth;
      }
      var strokeLinecapStyleProp = this.getStyle("stroke-linecap");
      var strokeLinejoinStyleProp = this.getStyle("stroke-linejoin");
      var strokeMiterlimitProp = this.getStyle("stroke-miterlimit");
      var strokeDasharrayStyleProp = this.getStyle("stroke-dasharray");
      var strokeDashoffsetProp = this.getStyle("stroke-dashoffset");
      if (strokeLinecapStyleProp.hasValue()) {
        ctx.lineCap = strokeLinecapStyleProp.getString();
      }
      if (strokeLinejoinStyleProp.hasValue()) {
        ctx.lineJoin = strokeLinejoinStyleProp.getString();
      }
      if (strokeMiterlimitProp.hasValue()) {
        ctx.miterLimit = strokeMiterlimitProp.getNumber();
      }
      if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== "none") {
        var gaps = toNumbers(strokeDasharrayStyleProp.getString());
        if (typeof ctx.setLineDash !== "undefined") {
          ctx.setLineDash(gaps);
        } else if (typeof ctx.webkitLineDash !== "undefined") {
          ctx.webkitLineDash = gaps;
        } else if (typeof ctx.mozDash !== "undefined" && !(gaps.length === 1 && gaps[0] === 0)) {
          ctx.mozDash = gaps;
        }
        var offset = strokeDashoffsetProp.getPixels();
        if (typeof ctx.lineDashOffset !== "undefined") {
          ctx.lineDashOffset = offset;
        } else if (typeof ctx.webkitLineDashOffset !== "undefined") {
          ctx.webkitLineDashOffset = offset;
        } else if (typeof ctx.mozDashOffset !== "undefined") {
          ctx.mozDashOffset = offset;
        }
      }
    }
    this.modifiedEmSizeStack = false;
    if (typeof ctx.font !== "undefined") {
      var fontStyleProp = this.getStyle("font");
      var fontStyleStyleProp = this.getStyle("font-style");
      var fontVariantStyleProp = this.getStyle("font-variant");
      var fontWeightStyleProp = this.getStyle("font-weight");
      var fontSizeStyleProp = this.getStyle("font-size");
      var fontFamilyStyleProp = this.getStyle("font-family");
      var font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : "", fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx.font));
      fontStyleStyleProp.setValue(font.fontStyle);
      fontVariantStyleProp.setValue(font.fontVariant);
      fontWeightStyleProp.setValue(font.fontWeight);
      fontSizeStyleProp.setValue(font.fontSize);
      fontFamilyStyleProp.setValue(font.fontFamily);
      ctx.font = font.toString();
      if (fontSizeStyleProp.isPixels()) {
        this.document.emSize = fontSizeStyleProp.getPixels();
        this.modifiedEmSizeStack = true;
      }
    }
    if (!fromMeasure) {
      this.applyEffects(ctx);
      ctx.globalAlpha = this.calculateOpacity();
    }
  }
  clearContext(ctx) {
    super.clearContext(ctx);
    if (this.modifiedEmSizeStack) {
      this.document.popEmSize();
    }
  }
}
class PathElement extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "path";
    this.pathParser = null;
    this.pathParser = new PathParser(this.getAttribute("d").getString());
  }
  path(ctx) {
    var {
      pathParser
    } = this;
    var boundingBox = new BoundingBox();
    pathParser.reset();
    if (ctx) {
      ctx.beginPath();
    }
    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(ctx, boundingBox);
          break;
        case PathParser.LINE_TO:
          this.pathL(ctx, boundingBox);
          break;
        case PathParser.HORIZ_LINE_TO:
          this.pathH(ctx, boundingBox);
          break;
        case PathParser.VERT_LINE_TO:
          this.pathV(ctx, boundingBox);
          break;
        case PathParser.CURVE_TO:
          this.pathC(ctx, boundingBox);
          break;
        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(ctx, boundingBox);
          break;
        case PathParser.QUAD_TO:
          this.pathQ(ctx, boundingBox);
          break;
        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(ctx, boundingBox);
          break;
        case PathParser.ARC:
          this.pathA(ctx, boundingBox);
          break;
        case PathParser.CLOSE_PATH:
          this.pathZ(ctx, boundingBox);
          break;
      }
    }
    return boundingBox;
  }
  getBoundingBox(_2) {
    return this.path();
  }
  getMarkers() {
    var {
      pathParser
    } = this;
    var points = pathParser.getMarkerPoints();
    var angles = pathParser.getMarkerAngles();
    var markers = points.map((point, i) => [point, angles[i]]);
    return markers;
  }
  renderChildren(ctx) {
    this.path(ctx);
    this.document.screen.mouse.checkPath(this, ctx);
    var fillRuleStyleProp = this.getStyle("fill-rule");
    if (ctx.fillStyle !== "") {
      if (fillRuleStyleProp.getString("inherit") !== "inherit") {
        ctx.fill(fillRuleStyleProp.getString());
      } else {
        ctx.fill();
      }
    }
    if (ctx.strokeStyle !== "") {
      if (this.getAttribute("vector-effect").getString() === "non-scaling-stroke") {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.stroke();
      }
    }
    var markers = this.getMarkers();
    if (markers) {
      var markersLastIndex = markers.length - 1;
      var markerStartStyleProp = this.getStyle("marker-start");
      var markerMidStyleProp = this.getStyle("marker-mid");
      var markerEndStyleProp = this.getStyle("marker-end");
      if (markerStartStyleProp.isUrlDefinition()) {
        var marker = markerStartStyleProp.getDefinition();
        var [point, angle] = markers[0];
        marker.render(ctx, point, angle);
      }
      if (markerMidStyleProp.isUrlDefinition()) {
        var _marker = markerMidStyleProp.getDefinition();
        for (var i = 1; i < markersLastIndex; i++) {
          var [_point, _angle] = markers[i];
          _marker.render(ctx, _point, _angle);
        }
      }
      if (markerEndStyleProp.isUrlDefinition()) {
        var _marker2 = markerEndStyleProp.getDefinition();
        var [_point2, _angle2] = markers[markersLastIndex];
        _marker2.render(ctx, _point2, _angle2);
      }
    }
  }
  static pathM(pathParser) {
    var point = pathParser.getAsCurrentPoint();
    pathParser.start = pathParser.current;
    return {
      point
    };
  }
  pathM(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      point
    } = PathElement.pathM(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point);
    boundingBox.addPoint(x, y);
    if (ctx) {
      ctx.moveTo(x, y);
    }
  }
  static pathL(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getAsCurrentPoint();
    return {
      current,
      point
    };
  }
  pathL(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathL(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);
    if (ctx) {
      ctx.lineTo(x, y);
    }
  }
  static pathH(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point((command.relative ? current.x : 0) + command.x, current.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }
  pathH(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathH(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);
    if (ctx) {
      ctx.lineTo(x, y);
    }
  }
  static pathV(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }
  pathV(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathV(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);
    if (ctx) {
      ctx.lineTo(x, y);
    }
  }
  static pathC(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getPoint("x1", "y1");
    var controlPoint = pathParser.getAsControlPoint("x2", "y2");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }
  pathC(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathS(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getReflectedControlPoint();
    var controlPoint = pathParser.getAsControlPoint("x2", "y2");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }
  pathS(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathQ(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getAsControlPoint("x1", "y1");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }
  pathQ(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathT(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getReflectedControlPoint();
    pathParser.control = controlPoint;
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }
  pathT(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathA(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var {
      rX,
      rY,
      xRot,
      lArcFlag,
      sweepFlag
    } = command;
    var xAxisRotation = xRot * (Math.PI / 180);
    var currentPoint = pathParser.getAsCurrentPoint();
    var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2);
    var l = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);
    if (l > 1) {
      rX *= Math.sqrt(l);
      rY *= Math.sqrt(l);
    }
    var s = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) / (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)));
    if (isNaN(s)) {
      s = 0;
    }
    var cpp = new Point(s * rX * currp.y / rY, s * -rY * currp.x / rX);
    var centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
    var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]);
    var u = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY];
    var v = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY];
    var ad = vectorsAngle(u, v);
    if (vectorsRatio(u, v) <= -1) {
      ad = Math.PI;
    }
    if (vectorsRatio(u, v) >= 1) {
      ad = 0;
    }
    return {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    };
  }
  pathA(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser);
    var dir = 1 - sweepFlag ? 1 : -1;
    var ah = a1 + dir * (ad / 2);
    var halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
    pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
    pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
    boundingBox.addPoint(currentPoint.x, currentPoint.y);
    if (ctx && !isNaN(a1) && !isNaN(ad)) {
      var r = rX > rY ? rX : rY;
      var sx = rX > rY ? 1 : rX / rY;
      var sy = rX > rY ? rY / rX : 1;
      ctx.translate(centp.x, centp.y);
      ctx.rotate(xAxisRotation);
      ctx.scale(sx, sy);
      ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
      ctx.scale(1 / sx, 1 / sy);
      ctx.rotate(-xAxisRotation);
      ctx.translate(-centp.x, -centp.y);
    }
  }
  static pathZ(pathParser) {
    pathParser.current = pathParser.start;
  }
  pathZ(ctx, boundingBox) {
    PathElement.pathZ(this.pathParser);
    if (ctx) {
      if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
        ctx.closePath();
      }
    }
  }
}
class GlyphElement extends PathElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "glyph";
    this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber();
    this.unicode = this.getAttribute("unicode").getString();
    this.arabicForm = this.getAttribute("arabic-form").getString();
  }
}
class TextElement extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, new.target === TextElement ? true : captureTextNodes);
    this.type = "text";
    this.x = 0;
    this.y = 0;
    this.measureCache = -1;
  }
  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    super.setContext(ctx, fromMeasure);
    var textBaseline = this.getStyle("dominant-baseline").getTextBaseline() || this.getStyle("alignment-baseline").getTextBaseline();
    if (textBaseline) {
      ctx.textBaseline = textBaseline;
    }
  }
  initializeCoordinates() {
    this.x = 0;
    this.y = 0;
    this.leafTexts = [];
    this.textChunkStart = 0;
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
  }
  getBoundingBox(ctx) {
    if (this.type !== "text") {
      return this.getTElementBoundingBox(ctx);
    }
    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx);
    var boundingBox = null;
    this.children.forEach((_2, i) => {
      var childBoundingBox = this.getChildBoundingBox(ctx, this, this, i);
      if (!boundingBox) {
        boundingBox = childBoundingBox;
      } else {
        boundingBox.addBoundingBox(childBoundingBox);
      }
    });
    return boundingBox;
  }
  getFontSize() {
    var {
      document: document2,
      parent
    } = this;
    var inheritFontSize = Font.parse(document2.ctx.font).fontSize;
    var fontSize = parent.getStyle("font-size").getNumber(inheritFontSize);
    return fontSize;
  }
  getTElementBoundingBox(ctx) {
    var fontSize = this.getFontSize();
    return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
  }
  getGlyph(font, text, i) {
    var char = text[i];
    var glyph = null;
    if (font.isArabic) {
      var len = text.length;
      var prevChar = text[i - 1];
      var nextChar = text[i + 1];
      var arabicForm = "isolated";
      if ((i === 0 || prevChar === " ") && i < len - 1 && nextChar !== " ") {
        arabicForm = "terminal";
      }
      if (i > 0 && prevChar !== " " && i < len - 1 && nextChar !== " ") {
        arabicForm = "medial";
      }
      if (i > 0 && prevChar !== " " && (i === len - 1 || nextChar === " ")) {
        arabicForm = "initial";
      }
      if (typeof font.glyphs[char] !== "undefined") {
        var maybeGlyph = font.glyphs[char];
        glyph = maybeGlyph instanceof GlyphElement ? maybeGlyph : maybeGlyph[arabicForm];
      }
    } else {
      glyph = font.glyphs[char];
    }
    if (!glyph) {
      glyph = font.missingGlyph;
    }
    return glyph;
  }
  getText() {
    return "";
  }
  getTextFromNode(node2) {
    var textNode = node2 || this.node;
    var childNodes = Array.from(textNode.parentNode.childNodes);
    var index2 = childNodes.indexOf(textNode);
    var lastIndex = childNodes.length - 1;
    var text = compressSpaces(
      textNode.textContent || ""
    );
    if (index2 === 0) {
      text = trimLeft(text);
    }
    if (index2 === lastIndex) {
      text = trimRight(text);
    }
    return text;
  }
  renderChildren(ctx) {
    if (this.type !== "text") {
      this.renderTElementChildren(ctx);
      return;
    }
    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx);
    this.children.forEach((_2, i) => {
      this.renderChild(ctx, this, this, i);
    });
    var {
      mouse
    } = this.document.screen;
    if (mouse.isWorking()) {
      mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
    }
  }
  renderTElementChildren(ctx) {
    var {
      document: document2,
      parent
    } = this;
    var renderText = this.getText();
    var customFont = parent.getStyle("font-family").getDefinition();
    if (customFont) {
      var {
        unitsPerEm
      } = customFont.fontFace;
      var ctxFont = Font.parse(document2.ctx.font);
      var fontSize = parent.getStyle("font-size").getNumber(ctxFont.fontSize);
      var fontStyle = parent.getStyle("font-style").getString(ctxFont.fontStyle);
      var scale = fontSize / unitsPerEm;
      var text = customFont.isRTL ? renderText.split("").reverse().join("") : renderText;
      var dx = toNumbers(parent.getAttribute("dx").getString());
      var len = text.length;
      for (var i = 0; i < len; i++) {
        var glyph = this.getGlyph(customFont, text, i);
        ctx.translate(this.x, this.y);
        ctx.scale(scale, -scale);
        var lw = ctx.lineWidth;
        ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;
        if (fontStyle === "italic") {
          ctx.transform(1, 0, 0.4, 1, 0, 0);
        }
        glyph.render(ctx);
        if (fontStyle === "italic") {
          ctx.transform(1, 0, -0.4, 1, 0, 0);
        }
        ctx.lineWidth = lw;
        ctx.scale(1 / scale, -1 / scale);
        ctx.translate(-this.x, -this.y);
        this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;
        if (typeof dx[i] !== "undefined" && !isNaN(dx[i])) {
          this.x += dx[i];
        }
      }
      return;
    }
    var {
      x,
      y
    } = this;
    if (ctx.fillStyle) {
      ctx.fillText(renderText, x, y);
    }
    if (ctx.strokeStyle) {
      ctx.strokeText(renderText, x, y);
    }
  }
  applyAnchoring() {
    if (this.textChunkStart >= this.leafTexts.length) {
      return;
    }
    var firstElement = this.leafTexts[this.textChunkStart];
    var textAnchor = firstElement.getStyle("text-anchor").getString("start");
    var isRTL = false;
    var shift = 0;
    if (textAnchor === "start" && !isRTL || textAnchor === "end" && isRTL) {
      shift = firstElement.x - this.minX;
    } else if (textAnchor === "end" && !isRTL || textAnchor === "start" && isRTL) {
      shift = firstElement.x - this.maxX;
    } else {
      shift = firstElement.x - (this.minX + this.maxX) / 2;
    }
    for (var i = this.textChunkStart; i < this.leafTexts.length; i++) {
      this.leafTexts[i].x += shift;
    }
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
    this.textChunkStart = this.leafTexts.length;
  }
  adjustChildCoordinatesRecursive(ctx) {
    this.children.forEach((_2, i) => {
      this.adjustChildCoordinatesRecursiveCore(ctx, this, this, i);
    });
    this.applyAnchoring();
  }
  adjustChildCoordinatesRecursiveCore(ctx, textParent, parent, i) {
    var child = parent.children[i];
    if (child.children.length > 0) {
      child.children.forEach((_2, i2) => {
        textParent.adjustChildCoordinatesRecursiveCore(ctx, textParent, child, i2);
      });
    } else {
      this.adjustChildCoordinates(ctx, textParent, parent, i);
    }
  }
  adjustChildCoordinates(ctx, textParent, parent, i) {
    var child = parent.children[i];
    if (typeof child.measureText !== "function") {
      return child;
    }
    ctx.save();
    child.setContext(ctx, true);
    var xAttr = child.getAttribute("x");
    var yAttr = child.getAttribute("y");
    var dxAttr = child.getAttribute("dx");
    var dyAttr = child.getAttribute("dy");
    var customFont = child.getStyle("font-family").getDefinition();
    var isRTL = Boolean(customFont) && customFont.isRTL;
    if (i === 0) {
      if (!xAttr.hasValue()) {
        xAttr.setValue(child.getInheritedAttribute("x"));
      }
      if (!yAttr.hasValue()) {
        yAttr.setValue(child.getInheritedAttribute("y"));
      }
      if (!dxAttr.hasValue()) {
        dxAttr.setValue(child.getInheritedAttribute("dx"));
      }
      if (!dyAttr.hasValue()) {
        dyAttr.setValue(child.getInheritedAttribute("dy"));
      }
    }
    var width = child.measureText(ctx);
    if (isRTL) {
      textParent.x -= width;
    }
    if (xAttr.hasValue()) {
      textParent.applyAnchoring();
      child.x = xAttr.getPixels("x");
      if (dxAttr.hasValue()) {
        child.x += dxAttr.getPixels("x");
      }
    } else {
      if (dxAttr.hasValue()) {
        textParent.x += dxAttr.getPixels("x");
      }
      child.x = textParent.x;
    }
    textParent.x = child.x;
    if (!isRTL) {
      textParent.x += width;
    }
    if (yAttr.hasValue()) {
      child.y = yAttr.getPixels("y");
      if (dyAttr.hasValue()) {
        child.y += dyAttr.getPixels("y");
      }
    } else {
      if (dyAttr.hasValue()) {
        textParent.y += dyAttr.getPixels("y");
      }
      child.y = textParent.y;
    }
    textParent.y = child.y;
    textParent.leafTexts.push(child);
    textParent.minX = Math.min(textParent.minX, child.x, child.x + width);
    textParent.maxX = Math.max(textParent.maxX, child.x, child.x + width);
    child.clearContext(ctx);
    ctx.restore();
    return child;
  }
  getChildBoundingBox(ctx, textParent, parent, i) {
    var child = parent.children[i];
    if (typeof child.getBoundingBox !== "function") {
      return null;
    }
    var boundingBox = child.getBoundingBox(ctx);
    if (!boundingBox) {
      return null;
    }
    child.children.forEach((_2, i2) => {
      var childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i2);
      boundingBox.addBoundingBox(childBoundingBox);
    });
    return boundingBox;
  }
  renderChild(ctx, textParent, parent, i) {
    var child = parent.children[i];
    child.render(ctx);
    child.children.forEach((_2, i2) => {
      textParent.renderChild(ctx, textParent, child, i2);
    });
  }
  measureText(ctx) {
    var {
      measureCache
    } = this;
    if (~measureCache) {
      return measureCache;
    }
    var renderText = this.getText();
    var measure = this.measureTargetText(ctx, renderText);
    this.measureCache = measure;
    return measure;
  }
  measureTargetText(ctx, targetText) {
    if (!targetText.length) {
      return 0;
    }
    var {
      parent
    } = this;
    var customFont = parent.getStyle("font-family").getDefinition();
    if (customFont) {
      var fontSize = this.getFontSize();
      var text = customFont.isRTL ? targetText.split("").reverse().join("") : targetText;
      var dx = toNumbers(parent.getAttribute("dx").getString());
      var len = text.length;
      var _measure = 0;
      for (var i = 0; i < len; i++) {
        var glyph = this.getGlyph(customFont, text, i);
        _measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
        if (typeof dx[i] !== "undefined" && !isNaN(dx[i])) {
          _measure += dx[i];
        }
      }
      return _measure;
    }
    if (!ctx.measureText) {
      return targetText.length * 10;
    }
    ctx.save();
    this.setContext(ctx, true);
    var {
      width: measure
    } = ctx.measureText(targetText);
    this.clearContext(ctx);
    ctx.restore();
    return measure;
  }
  getInheritedAttribute(name) {
    var current = this;
    while (current instanceof TextElement && current.isFirstChild()) {
      var parentAttr = current.parent.getAttribute(name);
      if (parentAttr.hasValue(true)) {
        return parentAttr.getValue("0");
      }
      current = current.parent;
    }
    return null;
  }
}
class TSpanElement extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, new.target === TSpanElement ? true : captureTextNodes);
    this.type = "tspan";
    this.text = this.children.length > 0 ? "" : this.getTextFromNode();
  }
  getText() {
    return this.text;
  }
}
class TextNode extends TSpanElement {
  constructor() {
    super(...arguments);
    this.type = "textNode";
  }
}
class SVGElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.root = false;
  }
  setContext(ctx) {
    var _this$node$parentNode;
    var {
      document: document2
    } = this;
    var {
      screen,
      window: window2
    } = document2;
    var canvas = ctx.canvas;
    screen.setDefaults(ctx);
    if (canvas.style && typeof ctx.font !== "undefined" && window2 && typeof window2.getComputedStyle !== "undefined") {
      ctx.font = window2.getComputedStyle(canvas).getPropertyValue("font");
      var fontSizeProp = new Property(document2, "fontSize", Font.parse(ctx.font).fontSize);
      if (fontSizeProp.hasValue()) {
        document2.rootEmSize = fontSizeProp.getPixels("y");
        document2.emSize = document2.rootEmSize;
      }
    }
    if (!this.getAttribute("x").hasValue()) {
      this.getAttribute("x", true).setValue(0);
    }
    if (!this.getAttribute("y").hasValue()) {
      this.getAttribute("y", true).setValue(0);
    }
    var {
      width,
      height
    } = screen.viewPort;
    if (!this.getStyle("width").hasValue()) {
      this.getStyle("width", true).setValue("100%");
    }
    if (!this.getStyle("height").hasValue()) {
      this.getStyle("height", true).setValue("100%");
    }
    if (!this.getStyle("color").hasValue()) {
      this.getStyle("color", true).setValue("black");
    }
    var refXAttr = this.getAttribute("refX");
    var refYAttr = this.getAttribute("refY");
    var viewBoxAttr = this.getAttribute("viewBox");
    var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
    var clip = !this.root && this.getStyle("overflow").getValue("hidden") !== "visible";
    var minX = 0;
    var minY = 0;
    var clipX = 0;
    var clipY = 0;
    if (viewBox) {
      minX = viewBox[0];
      minY = viewBox[1];
    }
    if (!this.root) {
      width = this.getStyle("width").getPixels("x");
      height = this.getStyle("height").getPixels("y");
      if (this.type === "marker") {
        clipX = minX;
        clipY = minY;
        minX = 0;
        minY = 0;
      }
    }
    screen.viewPort.setCurrent(width, height);
    if (this.node && (!this.parent || ((_this$node$parentNode = this.node.parentNode) === null || _this$node$parentNode === void 0 ? void 0 : _this$node$parentNode.nodeName) === "foreignObject") && this.getStyle("transform", false, true).hasValue() && !this.getStyle("transform-origin", false, true).hasValue()) {
      this.getStyle("transform-origin", true, true).setValue("50% 50%");
    }
    super.setContext(ctx);
    ctx.translate(this.getAttribute("x").getPixels("x"), this.getAttribute("y").getPixels("y"));
    if (viewBox) {
      width = viewBox[2];
      height = viewBox[3];
    }
    document2.setViewBox({
      ctx,
      aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
      width: screen.viewPort.width,
      desiredWidth: width,
      height: screen.viewPort.height,
      desiredHeight: height,
      minX,
      minY,
      refX: refXAttr.getValue(),
      refY: refYAttr.getValue(),
      clip,
      clipX,
      clipY
    });
    if (viewBox) {
      screen.viewPort.removeCurrent();
      screen.viewPort.setCurrent(width, height);
    }
  }
  clearContext(ctx) {
    super.clearContext(ctx);
    this.document.screen.viewPort.removeCurrent();
  }
  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var widthAttr = this.getAttribute("width", true);
    var heightAttr = this.getAttribute("height", true);
    var viewBoxAttr = this.getAttribute("viewBox");
    var styleAttr = this.getAttribute("style");
    var originWidth = widthAttr.getNumber(0);
    var originHeight = heightAttr.getNumber(0);
    if (preserveAspectRatio) {
      if (typeof preserveAspectRatio === "string") {
        this.getAttribute("preserveAspectRatio", true).setValue(preserveAspectRatio);
      } else {
        var preserveAspectRatioAttr = this.getAttribute("preserveAspectRatio");
        if (preserveAspectRatioAttr.hasValue()) {
          preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
        }
      }
    }
    widthAttr.setValue(width);
    heightAttr.setValue(height);
    if (!viewBoxAttr.hasValue()) {
      viewBoxAttr.setValue("0 0 ".concat(originWidth || width, " ").concat(originHeight || height));
    }
    if (styleAttr.hasValue()) {
      var widthStyle = this.getStyle("width");
      var heightStyle = this.getStyle("height");
      if (widthStyle.hasValue()) {
        widthStyle.setValue("".concat(width, "px"));
      }
      if (heightStyle.hasValue()) {
        heightStyle.setValue("".concat(height, "px"));
      }
    }
  }
}
class RectElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "rect";
  }
  path(ctx) {
    var x = this.getAttribute("x").getPixels("x");
    var y = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width", false, true).getPixels("x");
    var height = this.getStyle("height", false, true).getPixels("y");
    var rxAttr = this.getAttribute("rx");
    var ryAttr = this.getAttribute("ry");
    var rx = rxAttr.getPixels("x");
    var ry = ryAttr.getPixels("y");
    if (rxAttr.hasValue() && !ryAttr.hasValue()) {
      ry = rx;
    }
    if (ryAttr.hasValue() && !rxAttr.hasValue()) {
      rx = ry;
    }
    rx = Math.min(rx, width / 2);
    ry = Math.min(ry, height / 2);
    if (ctx) {
      var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
      ctx.beginPath();
      if (height > 0 && width > 0) {
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + width - rx, y);
        ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
        ctx.lineTo(x + width, y + height - ry);
        ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
        ctx.lineTo(x + rx, y + height);
        ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
        ctx.lineTo(x, y + ry);
        ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
        ctx.closePath();
      }
    }
    return new BoundingBox(x, y, x + width, y + height);
  }
  getMarkers() {
    return null;
  }
}
class CircleElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "circle";
  }
  path(ctx) {
    var cx = this.getAttribute("cx").getPixels("x");
    var cy = this.getAttribute("cy").getPixels("y");
    var r = this.getAttribute("r").getPixels();
    if (ctx && r > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
      ctx.closePath();
    }
    return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
  }
  getMarkers() {
    return null;
  }
}
class EllipseElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "ellipse";
  }
  path(ctx) {
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    var rx = this.getAttribute("rx").getPixels("x");
    var ry = this.getAttribute("ry").getPixels("y");
    var cx = this.getAttribute("cx").getPixels("x");
    var cy = this.getAttribute("cy").getPixels("y");
    if (ctx && rx > 0 && ry > 0) {
      ctx.beginPath();
      ctx.moveTo(cx + rx, cy);
      ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
      ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
      ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
      ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
      ctx.closePath();
    }
    return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
  }
  getMarkers() {
    return null;
  }
}
class LineElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "line";
  }
  getPoints() {
    return [new Point(this.getAttribute("x1").getPixels("x"), this.getAttribute("y1").getPixels("y")), new Point(this.getAttribute("x2").getPixels("x"), this.getAttribute("y2").getPixels("y"))];
  }
  path(ctx) {
    var [{
      x: x0,
      y: y0
    }, {
      x: x1,
      y: y1
    }] = this.getPoints();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
    }
    return new BoundingBox(x0, y0, x1, y1);
  }
  getMarkers() {
    var [p0, p1] = this.getPoints();
    var a = p0.angleTo(p1);
    return [[p0, a], [p1, a]];
  }
}
class PolylineElement extends PathElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "polyline";
    this.points = [];
    this.points = Point.parsePath(this.getAttribute("points").getString());
  }
  path(ctx) {
    var {
      points
    } = this;
    var [{
      x: x0,
      y: y0
    }] = points;
    var boundingBox = new BoundingBox(x0, y0);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
    }
    points.forEach((_ref) => {
      var {
        x,
        y
      } = _ref;
      boundingBox.addPoint(x, y);
      if (ctx) {
        ctx.lineTo(x, y);
      }
    });
    return boundingBox;
  }
  getMarkers() {
    var {
      points
    } = this;
    var lastIndex = points.length - 1;
    var markers = [];
    points.forEach((point, i) => {
      if (i === lastIndex) {
        return;
      }
      markers.push([point, point.angleTo(points[i + 1])]);
    });
    if (markers.length > 0) {
      markers.push([points[points.length - 1], markers[markers.length - 1][1]]);
    }
    return markers;
  }
}
class PolygonElement extends PolylineElement {
  constructor() {
    super(...arguments);
    this.type = "polygon";
  }
  path(ctx) {
    var boundingBox = super.path(ctx);
    var [{
      x,
      y
    }] = this.points;
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.closePath();
    }
    return boundingBox;
  }
}
class PatternElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "pattern";
  }
  createPattern(ctx, _2, parentOpacityProp) {
    var width = this.getStyle("width").getPixels("x", true);
    var height = this.getStyle("height").getPixels("y", true);
    var patternSvg = new SVGElement(this.document, null);
    patternSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
    patternSvg.attributes.width = new Property(this.document, "width", "".concat(width, "px"));
    patternSvg.attributes.height = new Property(this.document, "height", "".concat(height, "px"));
    patternSvg.attributes.transform = new Property(this.document, "transform", this.getAttribute("patternTransform").getValue());
    patternSvg.children = this.children;
    var patternCanvas = this.document.createCanvas(width, height);
    var patternCtx = patternCanvas.getContext("2d");
    var xAttr = this.getAttribute("x");
    var yAttr = this.getAttribute("y");
    if (xAttr.hasValue() && yAttr.hasValue()) {
      patternCtx.translate(xAttr.getPixels("x", true), yAttr.getPixels("y", true));
    }
    if (parentOpacityProp.hasValue()) {
      this.styles["fill-opacity"] = parentOpacityProp;
    } else {
      Reflect.deleteProperty(this.styles, "fill-opacity");
    }
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        patternCtx.save();
        patternSvg.attributes.x = new Property(this.document, "x", x * patternCanvas.width);
        patternSvg.attributes.y = new Property(this.document, "y", y * patternCanvas.height);
        patternSvg.render(patternCtx);
        patternCtx.restore();
      }
    }
    var pattern = ctx.createPattern(patternCanvas, "repeat");
    return pattern;
  }
}
class MarkerElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "marker";
  }
  render(ctx, point, angle) {
    if (!point) {
      return;
    }
    var {
      x,
      y
    } = point;
    var orient = this.getAttribute("orient").getString("auto");
    var markerUnits = this.getAttribute("markerUnits").getString("strokeWidth");
    ctx.translate(x, y);
    if (orient === "auto") {
      ctx.rotate(angle);
    }
    if (markerUnits === "strokeWidth") {
      ctx.scale(ctx.lineWidth, ctx.lineWidth);
    }
    ctx.save();
    var markerSvg = new SVGElement(this.document, null);
    markerSvg.type = this.type;
    markerSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
    markerSvg.attributes.refX = new Property(this.document, "refX", this.getAttribute("refX").getValue());
    markerSvg.attributes.refY = new Property(this.document, "refY", this.getAttribute("refY").getValue());
    markerSvg.attributes.width = new Property(this.document, "width", this.getAttribute("markerWidth").getValue());
    markerSvg.attributes.height = new Property(this.document, "height", this.getAttribute("markerHeight").getValue());
    markerSvg.attributes.overflow = new Property(this.document, "overflow", this.getAttribute("overflow").getValue());
    markerSvg.attributes.fill = new Property(this.document, "fill", this.getAttribute("fill").getColor("black"));
    markerSvg.attributes.stroke = new Property(this.document, "stroke", this.getAttribute("stroke").getValue("none"));
    markerSvg.children = this.children;
    markerSvg.render(ctx);
    ctx.restore();
    if (markerUnits === "strokeWidth") {
      ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
    }
    if (orient === "auto") {
      ctx.rotate(-angle);
    }
    ctx.translate(-x, -y);
  }
}
class DefsElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "defs";
  }
  render() {
  }
}
class GElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "g";
  }
  getBoundingBox(ctx) {
    var boundingBox = new BoundingBox();
    this.children.forEach((child) => {
      boundingBox.addBoundingBox(child.getBoundingBox(ctx));
    });
    return boundingBox;
  }
}
class GradientElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.attributesToInherit = ["gradientUnits"];
    this.stops = [];
    var {
      stops,
      children
    } = this;
    children.forEach((child) => {
      if (child.type === "stop") {
        stops.push(child);
      }
    });
  }
  getGradientUnits() {
    return this.getAttribute("gradientUnits").getString("objectBoundingBox");
  }
  createGradient(ctx, element, parentOpacityProp) {
    var stopsContainer = this;
    if (this.getHrefAttribute().hasValue()) {
      stopsContainer = this.getHrefAttribute().getDefinition();
      this.inheritStopContainer(stopsContainer);
    }
    var {
      stops
    } = stopsContainer;
    var gradient = this.getGradient(ctx, element);
    if (!gradient) {
      return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
    }
    stops.forEach((stop) => {
      gradient.addColorStop(stop.offset, this.addParentOpacity(parentOpacityProp, stop.color));
    });
    if (this.getAttribute("gradientTransform").hasValue()) {
      var {
        document: document2
      } = this;
      var {
        MAX_VIRTUAL_PIXELS,
        viewPort
      } = document2.screen;
      var [rootView] = viewPort.viewPorts;
      var rect = new RectElement(document2, null);
      rect.attributes.x = new Property(document2, "x", -MAX_VIRTUAL_PIXELS / 3);
      rect.attributes.y = new Property(document2, "y", -MAX_VIRTUAL_PIXELS / 3);
      rect.attributes.width = new Property(document2, "width", MAX_VIRTUAL_PIXELS);
      rect.attributes.height = new Property(document2, "height", MAX_VIRTUAL_PIXELS);
      var group = new GElement(document2, null);
      group.attributes.transform = new Property(document2, "transform", this.getAttribute("gradientTransform").getValue());
      group.children = [rect];
      var patternSvg = new SVGElement(document2, null);
      patternSvg.attributes.x = new Property(document2, "x", 0);
      patternSvg.attributes.y = new Property(document2, "y", 0);
      patternSvg.attributes.width = new Property(document2, "width", rootView.width);
      patternSvg.attributes.height = new Property(document2, "height", rootView.height);
      patternSvg.children = [group];
      var patternCanvas = document2.createCanvas(rootView.width, rootView.height);
      var patternCtx = patternCanvas.getContext("2d");
      patternCtx.fillStyle = gradient;
      patternSvg.render(patternCtx);
      return patternCtx.createPattern(patternCanvas, "no-repeat");
    }
    return gradient;
  }
  inheritStopContainer(stopsContainer) {
    this.attributesToInherit.forEach((attributeToInherit) => {
      if (!this.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
        this.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
      }
    });
  }
  addParentOpacity(parentOpacityProp, color) {
    if (parentOpacityProp.hasValue()) {
      var colorProp = new Property(this.document, "color", color);
      return colorProp.addOpacity(parentOpacityProp).getColor();
    }
    return color;
  }
}
class LinearGradientElement extends GradientElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "linearGradient";
    this.attributesToInherit.push("x1", "y1", "x2", "y2");
  }
  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
    var boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;
    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }
    if (!this.getAttribute("x1").hasValue() && !this.getAttribute("y1").hasValue() && !this.getAttribute("x2").hasValue() && !this.getAttribute("y2").hasValue()) {
      this.getAttribute("x1", true).setValue(0);
      this.getAttribute("y1", true).setValue(0);
      this.getAttribute("x2", true).setValue(1);
      this.getAttribute("y2", true).setValue(0);
    }
    var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x1").getNumber() : this.getAttribute("x1").getPixels("x");
    var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y1").getNumber() : this.getAttribute("y1").getPixels("y");
    var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x2").getNumber() : this.getAttribute("x2").getPixels("x");
    var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y2").getNumber() : this.getAttribute("y2").getPixels("y");
    if (x1 === x2 && y1 === y2) {
      return null;
    }
    return ctx.createLinearGradient(x1, y1, x2, y2);
  }
}
class RadialGradientElement extends GradientElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "radialGradient";
    this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
  }
  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
    var boundingBox = element.getBoundingBox(ctx);
    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }
    if (!this.getAttribute("cx").hasValue()) {
      this.getAttribute("cx", true).setValue("50%");
    }
    if (!this.getAttribute("cy").hasValue()) {
      this.getAttribute("cy", true).setValue("50%");
    }
    if (!this.getAttribute("r").hasValue()) {
      this.getAttribute("r", true).setValue("50%");
    }
    var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("cx").getNumber() : this.getAttribute("cx").getPixels("x");
    var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("cy").getNumber() : this.getAttribute("cy").getPixels("y");
    var fx = cx;
    var fy = cy;
    if (this.getAttribute("fx").hasValue()) {
      fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("fx").getNumber() : this.getAttribute("fx").getPixels("x");
    }
    if (this.getAttribute("fy").hasValue()) {
      fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("fy").getNumber() : this.getAttribute("fy").getPixels("y");
    }
    var r = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2 * this.getAttribute("r").getNumber() : this.getAttribute("r").getPixels();
    var fr = this.getAttribute("fr").getPixels();
    return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
  }
}
class StopElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "stop";
    var offset = Math.max(0, Math.min(1, this.getAttribute("offset").getNumber()));
    var stopOpacity = this.getStyle("stop-opacity");
    var stopColor = this.getStyle("stop-color", true);
    if (stopColor.getString() === "") {
      stopColor.setValue("#000");
    }
    if (stopOpacity.hasValue()) {
      stopColor = stopColor.addOpacity(stopOpacity);
    }
    this.offset = offset;
    this.color = stopColor.getColor();
  }
}
class AnimateElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "animate";
    this.duration = 0;
    this.initialValue = null;
    this.initialUnits = "";
    this.removed = false;
    this.frozen = false;
    document2.screen.animations.push(this);
    this.begin = this.getAttribute("begin").getMilliseconds();
    this.maxDuration = this.begin + this.getAttribute("dur").getMilliseconds();
    this.from = this.getAttribute("from");
    this.to = this.getAttribute("to");
    this.values = new Property(document2, "values", null);
    var valuesAttr = this.getAttribute("values");
    if (valuesAttr.hasValue()) {
      this.values.setValue(valuesAttr.getString().split(";"));
    }
  }
  getProperty() {
    var attributeType = this.getAttribute("attributeType").getString();
    var attributeName = this.getAttribute("attributeName").getString();
    if (attributeType === "CSS") {
      return this.parent.getStyle(attributeName, true);
    }
    return this.parent.getAttribute(attributeName, true);
  }
  calcValue() {
    var {
      initialUnits
    } = this;
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;
    if (initialUnits === "%") {
      newValue *= 100;
    }
    return "".concat(newValue).concat(initialUnits);
  }
  update(delta) {
    var {
      parent
    } = this;
    var prop = this.getProperty();
    if (!this.initialValue) {
      this.initialValue = prop.getString();
      this.initialUnits = prop.getUnits();
    }
    if (this.duration > this.maxDuration) {
      var fill = this.getAttribute("fill").getString("remove");
      if (this.getAttribute("repeatCount").getString() === "indefinite" || this.getAttribute("repeatDur").getString() === "indefinite") {
        this.duration = 0;
      } else if (fill === "freeze" && !this.frozen) {
        this.frozen = true;
        parent.animationFrozen = true;
        parent.animationFrozenValue = prop.getString();
      } else if (fill === "remove" && !this.removed) {
        this.removed = true;
        prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
        return true;
      }
      return false;
    }
    this.duration += delta;
    var updated = false;
    if (this.begin < this.duration) {
      var newValue = this.calcValue();
      var typeAttr = this.getAttribute("type");
      if (typeAttr.hasValue()) {
        var type = typeAttr.getString();
        newValue = "".concat(type, "(").concat(newValue, ")");
      }
      prop.setValue(newValue);
      updated = true;
    }
    return updated;
  }
  getProgress() {
    var {
      document: document2,
      values: values2
    } = this;
    var result = {
      progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
    };
    if (values2.hasValue()) {
      var p = result.progress * (values2.getValue().length - 1);
      var lb = Math.floor(p);
      var ub = Math.ceil(p);
      result.from = new Property(document2, "from", parseFloat(values2.getValue()[lb]));
      result.to = new Property(document2, "to", parseFloat(values2.getValue()[ub]));
      result.progress = (p - lb) / (ub - lb);
    } else {
      result.from = this.from;
      result.to = this.to;
    }
    return result;
  }
}
class AnimateColorElement extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = "animateColor";
  }
  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var colorFrom = new RGBColor(from.getColor());
    var colorTo = new RGBColor(to.getColor());
    if (colorFrom.ok && colorTo.ok) {
      var r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
      var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
      var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress;
      return "rgb(".concat(Math.floor(r), ", ").concat(Math.floor(g), ", ").concat(Math.floor(b), ")");
    }
    return this.getAttribute("from").getColor();
  }
}
class AnimateTransformElement extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = "animateTransform";
  }
  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var transformFrom = toNumbers(from.getString());
    var transformTo = toNumbers(to.getString());
    var newValue = transformFrom.map((from2, i) => {
      var to2 = transformTo[i];
      return from2 + (to2 - from2) * progress;
    }).join(" ");
    return newValue;
  }
}
class FontElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "font";
    this.glyphs = {};
    this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber();
    var {
      definitions
    } = document2;
    var {
      children
    } = this;
    for (var child of children) {
      switch (child.type) {
        case "font-face": {
          this.fontFace = child;
          var fontFamilyStyle = child.getStyle("font-family");
          if (fontFamilyStyle.hasValue()) {
            definitions[fontFamilyStyle.getString()] = this;
          }
          break;
        }
        case "missing-glyph":
          this.missingGlyph = child;
          break;
        case "glyph": {
          var glyph = child;
          if (glyph.arabicForm) {
            this.isRTL = true;
            this.isArabic = true;
            if (typeof this.glyphs[glyph.unicode] === "undefined") {
              this.glyphs[glyph.unicode] = {};
            }
            this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
          } else {
            this.glyphs[glyph.unicode] = glyph;
          }
          break;
        }
      }
    }
  }
  render() {
  }
}
class FontFaceElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "font-face";
    this.ascent = this.getAttribute("ascent").getNumber();
    this.descent = this.getAttribute("descent").getNumber();
    this.unitsPerEm = this.getAttribute("units-per-em").getNumber();
  }
}
class MissingGlyphElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "missing-glyph";
    this.horizAdvX = 0;
  }
}
class TRefElement extends TextElement {
  constructor() {
    super(...arguments);
    this.type = "tref";
  }
  getText() {
    var element = this.getHrefAttribute().getDefinition();
    if (element) {
      var firstChild = element.children[0];
      if (firstChild) {
        return firstChild.getText();
      }
    }
    return "";
  }
}
class AElement extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "a";
    var {
      childNodes
    } = node2;
    var firstChild = childNodes[0];
    var hasText = childNodes.length > 0 && Array.from(childNodes).every((node3) => node3.nodeType === 3);
    this.hasText = hasText;
    this.text = hasText ? this.getTextFromNode(firstChild) : "";
  }
  getText() {
    return this.text;
  }
  renderChildren(ctx) {
    if (this.hasText) {
      super.renderChildren(ctx);
      var {
        document: document2,
        x,
        y
      } = this;
      var {
        mouse
      } = document2.screen;
      var fontSize = new Property(document2, "fontSize", Font.parse(document2.ctx.font).fontSize);
      if (mouse.isWorking()) {
        mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels("y"), x + this.measureText(ctx), y));
      }
    } else if (this.children.length > 0) {
      var g = new GElement(this.document, null);
      g.children = this.children;
      g.parent = this;
      g.render(ctx);
    }
  }
  onClick() {
    var {
      window: window2
    } = this.document;
    if (window2) {
      window2.open(this.getHrefAttribute().getString());
    }
  }
  onMouseMove() {
    var ctx = this.document.ctx;
    ctx.canvas.style.cursor = "pointer";
  }
}
function ownKeys$2(object, enumerableOnly) {
  var keys3 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys3.push.apply(keys3, symbols);
  }
  return keys3;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
class TextPathElement extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "textPath";
    this.textWidth = 0;
    this.textHeight = 0;
    this.pathLength = -1;
    this.glyphInfo = null;
    this.letterSpacingCache = [];
    this.measuresCache = /* @__PURE__ */ new Map([["", 0]]);
    var pathElement = this.getHrefAttribute().getDefinition();
    this.text = this.getTextFromNode();
    this.dataArray = this.parsePathData(pathElement);
  }
  getText() {
    return this.text;
  }
  path(ctx) {
    var {
      dataArray
    } = this;
    if (ctx) {
      ctx.beginPath();
    }
    dataArray.forEach((_ref) => {
      var {
        type,
        points
      } = _ref;
      switch (type) {
        case PathParser.LINE_TO:
          if (ctx) {
            ctx.lineTo(points[0], points[1]);
          }
          break;
        case PathParser.MOVE_TO:
          if (ctx) {
            ctx.moveTo(points[0], points[1]);
          }
          break;
        case PathParser.CURVE_TO:
          if (ctx) {
            ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
          }
          break;
        case PathParser.QUAD_TO:
          if (ctx) {
            ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
          }
          break;
        case PathParser.ARC: {
          var [cx, cy, rx, ry, theta, dTheta, psi, fs] = points;
          var r = rx > ry ? rx : ry;
          var scaleX = rx > ry ? 1 : rx / ry;
          var scaleY = rx > ry ? ry / rx : 1;
          if (ctx) {
            ctx.translate(cx, cy);
            ctx.rotate(psi);
            ctx.scale(scaleX, scaleY);
            ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
            ctx.scale(1 / scaleX, 1 / scaleY);
            ctx.rotate(-psi);
            ctx.translate(-cx, -cy);
          }
          break;
        }
        case PathParser.CLOSE_PATH:
          if (ctx) {
            ctx.closePath();
          }
          break;
      }
    });
  }
  renderChildren(ctx) {
    this.setTextData(ctx);
    ctx.save();
    var textDecoration = this.parent.getStyle("text-decoration").getString();
    var fontSize = this.getFontSize();
    var {
      glyphInfo
    } = this;
    var fill = ctx.fillStyle;
    if (textDecoration === "underline") {
      ctx.beginPath();
    }
    glyphInfo.forEach((glyph, i) => {
      var {
        p0,
        p1,
        rotation,
        text: partialText
      } = glyph;
      ctx.save();
      ctx.translate(p0.x, p0.y);
      ctx.rotate(rotation);
      if (ctx.fillStyle) {
        ctx.fillText(partialText, 0, 0);
      }
      if (ctx.strokeStyle) {
        ctx.strokeText(partialText, 0, 0);
      }
      ctx.restore();
      if (textDecoration === "underline") {
        if (i === 0) {
          ctx.moveTo(p0.x, p0.y + fontSize / 8);
        }
        ctx.lineTo(p1.x, p1.y + fontSize / 5);
      }
    });
    if (textDecoration === "underline") {
      ctx.lineWidth = fontSize / 20;
      ctx.strokeStyle = fill;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }
  getLetterSpacingAt() {
    var idx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return this.letterSpacingCache[idx] || 0;
  }
  findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c2, charI) {
    var offset = inputOffset;
    var glyphWidth = this.measureText(ctx, c2);
    if (c2 === " " && anchor === "justify" && textFullWidth < fullPathWidth) {
      glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
    }
    if (charI > -1) {
      offset += this.getLetterSpacingAt(charI);
    }
    var splineStep = this.textHeight / 20;
    var p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
    var p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
    var segment = {
      p0,
      p1
    };
    var rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;
    if (dy) {
      var dyX = Math.cos(Math.PI / 2 + rotation) * dy;
      var dyY = Math.cos(-rotation) * dy;
      segment.p0 = _objectSpread$2(_objectSpread$2({}, p0), {}, {
        x: p0.x + dyX,
        y: p0.y + dyY
      });
      segment.p1 = _objectSpread$2(_objectSpread$2({}, p1), {}, {
        x: p1.x + dyX,
        y: p1.y + dyY
      });
    }
    offset += glyphWidth;
    return {
      offset,
      segment,
      rotation
    };
  }
  measureText(ctx, text) {
    var {
      measuresCache
    } = this;
    var targetText = text || this.getText();
    if (measuresCache.has(targetText)) {
      return measuresCache.get(targetText);
    }
    var measure = this.measureTargetText(ctx, targetText);
    measuresCache.set(targetText, measure);
    return measure;
  }
  setTextData(ctx) {
    if (this.glyphInfo) {
      return;
    }
    var renderText = this.getText();
    var chars = renderText.split("");
    var spacesNumber = renderText.split(" ").length - 1;
    var dx = this.parent.getAttribute("dx").split().map((_2) => _2.getPixels("x"));
    var dy = this.parent.getAttribute("dy").getPixels("y");
    var anchor = this.parent.getStyle("text-anchor").getString("start");
    var thisSpacing = this.getStyle("letter-spacing");
    var parentSpacing = this.parent.getStyle("letter-spacing");
    var letterSpacing = 0;
    if (!thisSpacing.hasValue() || thisSpacing.getValue() === "inherit") {
      letterSpacing = parentSpacing.getPixels();
    } else if (thisSpacing.hasValue()) {
      if (thisSpacing.getValue() !== "initial" && thisSpacing.getValue() !== "unset") {
        letterSpacing = thisSpacing.getPixels();
      }
    }
    var letterSpacingCache = [];
    var textLen = renderText.length;
    this.letterSpacingCache = letterSpacingCache;
    for (var i = 0; i < textLen; i++) {
      letterSpacingCache.push(typeof dx[i] !== "undefined" ? dx[i] : letterSpacing);
    }
    var dxSum = letterSpacingCache.reduce((acc, cur, i2) => i2 === 0 ? 0 : acc + cur || 0, 0);
    var textWidth = this.measureText(ctx);
    var textFullWidth = Math.max(textWidth + dxSum, 0);
    this.textWidth = textWidth;
    this.textHeight = this.getFontSize();
    this.glyphInfo = [];
    var fullPathWidth = this.getPathLength();
    var startOffset = this.getStyle("startOffset").getNumber(0) * fullPathWidth;
    var offset = 0;
    if (anchor === "middle" || anchor === "center") {
      offset = -textFullWidth / 2;
    }
    if (anchor === "end" || anchor === "right") {
      offset = -textFullWidth;
    }
    offset += startOffset;
    chars.forEach((char, i2) => {
      var {
        offset: nextOffset,
        segment,
        rotation
      } = this.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i2);
      offset = nextOffset;
      if (!segment.p0 || !segment.p1) {
        return;
      }
      this.glyphInfo.push({
        text: chars[i2],
        p0: segment.p0,
        p1: segment.p1,
        rotation
      });
    });
  }
  parsePathData(path) {
    this.pathLength = -1;
    if (!path) {
      return [];
    }
    var pathCommands = [];
    var {
      pathParser
    } = path;
    pathParser.reset();
    while (!pathParser.isEnd()) {
      var {
        current
      } = pathParser;
      var startX = current ? current.x : 0;
      var startY = current ? current.y : 0;
      var command = pathParser.next();
      var nextCommandType = command.type;
      var points = [];
      switch (command.type) {
        case PathParser.MOVE_TO:
          this.pathM(pathParser, points);
          break;
        case PathParser.LINE_TO:
          nextCommandType = this.pathL(pathParser, points);
          break;
        case PathParser.HORIZ_LINE_TO:
          nextCommandType = this.pathH(pathParser, points);
          break;
        case PathParser.VERT_LINE_TO:
          nextCommandType = this.pathV(pathParser, points);
          break;
        case PathParser.CURVE_TO:
          this.pathC(pathParser, points);
          break;
        case PathParser.SMOOTH_CURVE_TO:
          nextCommandType = this.pathS(pathParser, points);
          break;
        case PathParser.QUAD_TO:
          this.pathQ(pathParser, points);
          break;
        case PathParser.SMOOTH_QUAD_TO:
          nextCommandType = this.pathT(pathParser, points);
          break;
        case PathParser.ARC:
          points = this.pathA(pathParser);
          break;
        case PathParser.CLOSE_PATH:
          PathElement.pathZ(pathParser);
          break;
      }
      if (command.type !== PathParser.CLOSE_PATH) {
        pathCommands.push({
          type: nextCommandType,
          points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, nextCommandType, points)
        });
      } else {
        pathCommands.push({
          type: PathParser.CLOSE_PATH,
          points: [],
          pathLength: 0
        });
      }
    }
    return pathCommands;
  }
  pathM(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathM(pathParser).point;
    points.push(x, y);
  }
  pathL(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathL(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }
  pathH(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathH(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }
  pathV(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathV(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }
  pathC(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }
  pathS(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.CURVE_TO;
  }
  pathQ(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }
  pathT(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.QUAD_TO;
  }
  pathA(pathParser) {
    var {
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser);
    if (sweepFlag === 0 && ad > 0) {
      ad -= 2 * Math.PI;
    }
    if (sweepFlag === 1 && ad < 0) {
      ad += 2 * Math.PI;
    }
    return [centp.x, centp.y, rX, rY, a1, ad, xAxisRotation, sweepFlag];
  }
  calcLength(x, y, commandType, points) {
    var len = 0;
    var p1 = null;
    var p2 = null;
    var t = 0;
    switch (commandType) {
      case PathParser.LINE_TO:
        return this.getLineLength(x, y, points[0], points[1]);
      case PathParser.CURVE_TO:
        len = 0;
        p1 = this.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case PathParser.QUAD_TO:
        len = 0;
        p1 = this.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case PathParser.ARC: {
        len = 0;
        var start = points[4];
        var dTheta = points[5];
        var end = points[4] + dTheta;
        var inc = Math.PI / 180;
        if (Math.abs(start - end) < inc) {
          inc = Math.abs(start - end);
        }
        p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
        if (dTheta < 0) {
          for (t = start - inc; t > end; t -= inc) {
            p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        } else {
          for (t = start + inc; t < end; t += inc) {
            p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        }
        p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
        len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
        return len;
      }
    }
    return 0;
  }
  getPointOnLine(dist, p1x, p1y, p2x, p2y) {
    var fromX = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : p1x;
    var fromY = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : p1y;
    var m2 = (p2y - p1y) / (p2x - p1x + PSEUDO_ZERO);
    var run2 = Math.sqrt(dist * dist / (1 + m2 * m2));
    if (p2x < p1x) {
      run2 *= -1;
    }
    var rise = m2 * run2;
    var pt = null;
    if (p2x === p1x) {
      pt = {
        x: fromX,
        y: fromY + rise
      };
    } else if ((fromY - p1y) / (fromX - p1x + PSEUDO_ZERO) === m2) {
      pt = {
        x: fromX + run2,
        y: fromY + rise
      };
    } else {
      var ix = 0;
      var iy = 0;
      var len = this.getLineLength(p1x, p1y, p2x, p2y);
      if (len < PSEUDO_ZERO) {
        return null;
      }
      var u = (fromX - p1x) * (p2x - p1x) + (fromY - p1y) * (p2y - p1y);
      u /= len * len;
      ix = p1x + u * (p2x - p1x);
      iy = p1y + u * (p2y - p1y);
      var pRise = this.getLineLength(fromX, fromY, ix, iy);
      var pRun = Math.sqrt(dist * dist - pRise * pRise);
      run2 = Math.sqrt(pRun * pRun / (1 + m2 * m2));
      if (p2x < p1x) {
        run2 *= -1;
      }
      rise = m2 * run2;
      pt = {
        x: ix + run2,
        y: iy + rise
      };
    }
    return pt;
  }
  getPointOnPath(distance) {
    var fullLen = this.getPathLength();
    var cumulativePathLength = 0;
    var p = null;
    if (distance < -5e-5 || distance - 5e-5 > fullLen) {
      return null;
    }
    var {
      dataArray
    } = this;
    for (var command of dataArray) {
      if (command && (command.pathLength < 5e-5 || cumulativePathLength + command.pathLength + 5e-5 < distance)) {
        cumulativePathLength += command.pathLength;
        continue;
      }
      var delta = distance - cumulativePathLength;
      var currentT = 0;
      switch (command.type) {
        case PathParser.LINE_TO:
          p = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
          break;
        case PathParser.ARC: {
          var start = command.points[4];
          var dTheta = command.points[5];
          var end = command.points[4] + dTheta;
          currentT = start + delta / command.pathLength * dTheta;
          if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
            break;
          }
          p = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
          break;
        }
        case PathParser.CURVE_TO:
          currentT = delta / command.pathLength;
          if (currentT > 1) {
            currentT = 1;
          }
          p = this.getPointOnCubicBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3], command.points[4], command.points[5]);
          break;
        case PathParser.QUAD_TO:
          currentT = delta / command.pathLength;
          if (currentT > 1) {
            currentT = 1;
          }
          p = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
          break;
      }
      if (p) {
        return p;
      }
      break;
    }
    return null;
  }
  getLineLength(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  getPathLength() {
    if (this.pathLength === -1) {
      this.pathLength = this.dataArray.reduce((length, command) => command.pathLength > 0 ? length + command.pathLength : length, 0);
    }
    return this.pathLength;
  }
  getPointOnCubicBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    var x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct);
    var y = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct);
    return {
      x,
      y
    };
  }
  getPointOnQuadraticBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y) {
    var x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct);
    var y = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct);
    return {
      x,
      y
    };
  }
  getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  }
  buildEquidistantCache(inputStep, inputPrecision) {
    var fullLen = this.getPathLength();
    var precision = inputPrecision || 0.25;
    var step = inputStep || fullLen / 100;
    if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
      this.equidistantCache = {
        step,
        precision,
        points: []
      };
      var s = 0;
      for (var l = 0; l <= fullLen; l += precision) {
        var p0 = this.getPointOnPath(l);
        var p1 = this.getPointOnPath(l + precision);
        if (!p0 || !p1) {
          continue;
        }
        s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);
        if (s >= step) {
          this.equidistantCache.points.push({
            x: p0.x,
            y: p0.y,
            distance: l
          });
          s -= step;
        }
      }
    }
  }
  getEquidistantPointOnPath(targetDistance, step, precision) {
    this.buildEquidistantCache(step, precision);
    if (targetDistance < 0 || targetDistance - this.getPathLength() > 5e-5) {
      return null;
    }
    var idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
    return this.equidistantCache.points[idx] || null;
  }
}
var dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
class ImageElement extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "image";
    this.loaded = false;
    var href = this.getHrefAttribute().getString();
    if (!href) {
      return;
    }
    var isSvg = href.endsWith(".svg") || /^\s*data:image\/svg\+xml/i.test(href);
    document2.images.push(this);
    if (!isSvg) {
      void this.loadImage(href);
    } else {
      void this.loadSvg(href);
    }
    this.isSvg = isSvg;
  }
  loadImage(href) {
    var _this = this;
    return _asyncToGenerator(function* () {
      try {
        var image = yield _this.document.createImage(href);
        _this.image = image;
      } catch (err) {
        console.error('Error while loading image "'.concat(href, '":'), err);
      }
      _this.loaded = true;
    })();
  }
  loadSvg(href) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      var match2 = dataUriRegex.exec(href);
      if (match2) {
        var data2 = match2[5];
        if (match2[4] === "base64") {
          _this2.image = atob(data2);
        } else {
          _this2.image = decodeURIComponent(data2);
        }
      } else {
        try {
          var response = yield _this2.document.fetch(href);
          var svg = yield response.text();
          _this2.image = svg;
        } catch (err) {
          console.error('Error while loading image "'.concat(href, '":'), err);
        }
      }
      _this2.loaded = true;
    })();
  }
  renderChildren(ctx) {
    var {
      document: document2,
      image,
      loaded
    } = this;
    var x = this.getAttribute("x").getPixels("x");
    var y = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    if (!loaded || !image || !width || !height) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);
    if (this.isSvg) {
      var subDocument = document2.canvg.forkString(ctx, this.image, {
        ignoreMouse: true,
        ignoreAnimation: true,
        ignoreDimensions: true,
        ignoreClear: true,
        offsetX: 0,
        offsetY: 0,
        scaleWidth: width,
        scaleHeight: height
      });
      subDocument.document.documentElement.parent = this;
      void subDocument.render();
    } else {
      var _image = this.image;
      document2.setViewBox({
        ctx,
        aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
        width,
        desiredWidth: _image.width,
        height,
        desiredHeight: _image.height
      });
      if (this.loaded) {
        if (typeof _image.complete === "undefined" || _image.complete) {
          ctx.drawImage(_image, 0, 0);
        }
      }
    }
    ctx.restore();
  }
  getBoundingBox() {
    var x = this.getAttribute("x").getPixels("x");
    var y = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    return new BoundingBox(x, y, x + width, y + height);
  }
}
class SymbolElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "symbol";
  }
  render(_2) {
  }
}
class SVGFontLoader {
  constructor(document2) {
    this.document = document2;
    this.loaded = false;
    document2.fonts.push(this);
  }
  load(fontFamily, url) {
    var _this = this;
    return _asyncToGenerator(function* () {
      try {
        var {
          document: document2
        } = _this;
        var svgDocument = yield document2.canvg.parser.load(url);
        var fonts = svgDocument.getElementsByTagName("font");
        Array.from(fonts).forEach((fontNode) => {
          var font = document2.createElement(fontNode);
          document2.definitions[fontFamily] = font;
        });
      } catch (err) {
        console.error('Error while loading font "'.concat(url, '":'), err);
      }
      _this.loaded = true;
    })();
  }
}
class StyleElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "style";
    var css = compressSpaces(
      Array.from(node2.childNodes).map((_2) => _2.textContent).join("").replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "").replace(/@import.*;/g, "")
    );
    var cssDefs = css.split("}");
    cssDefs.forEach((_2) => {
      var def = _2.trim();
      if (!def) {
        return;
      }
      var cssParts = def.split("{");
      var cssClasses = cssParts[0].split(",");
      var cssProps = cssParts[1].split(";");
      cssClasses.forEach((_3) => {
        var cssClass = _3.trim();
        if (!cssClass) {
          return;
        }
        var props = document2.styles[cssClass] || {};
        cssProps.forEach((cssProp) => {
          var prop = cssProp.indexOf(":");
          var name = cssProp.substr(0, prop).trim();
          var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();
          if (name && value) {
            props[name] = new Property(document2, name, value);
          }
        });
        document2.styles[cssClass] = props;
        document2.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
        if (cssClass === "@font-face") {
          var fontFamily = props["font-family"].getString().replace(/"|'/g, "");
          var srcs = props.src.getString().split(",");
          srcs.forEach((src) => {
            if (src.indexOf('format("svg")') > 0) {
              var url = parseExternalUrl(src);
              if (url) {
                void new SVGFontLoader(document2).load(fontFamily, url);
              }
            }
          });
        }
      });
    });
  }
}
StyleElement.parseExternalUrl = parseExternalUrl;
class UseElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "use";
  }
  setContext(ctx) {
    super.setContext(ctx);
    var xAttr = this.getAttribute("x");
    var yAttr = this.getAttribute("y");
    if (xAttr.hasValue()) {
      ctx.translate(xAttr.getPixels("x"), 0);
    }
    if (yAttr.hasValue()) {
      ctx.translate(0, yAttr.getPixels("y"));
    }
  }
  path(ctx) {
    var {
      element
    } = this;
    if (element) {
      element.path(ctx);
    }
  }
  renderChildren(ctx) {
    var {
      document: document2,
      element
    } = this;
    if (element) {
      var tempSvg = element;
      if (element.type === "symbol") {
        tempSvg = new SVGElement(document2, null);
        tempSvg.attributes.viewBox = new Property(document2, "viewBox", element.getAttribute("viewBox").getString());
        tempSvg.attributes.preserveAspectRatio = new Property(document2, "preserveAspectRatio", element.getAttribute("preserveAspectRatio").getString());
        tempSvg.attributes.overflow = new Property(document2, "overflow", element.getAttribute("overflow").getString());
        tempSvg.children = element.children;
        element.styles.opacity = new Property(document2, "opacity", this.calculateOpacity());
      }
      if (tempSvg.type === "svg") {
        var widthStyle = this.getStyle("width", false, true);
        var heightStyle = this.getStyle("height", false, true);
        if (widthStyle.hasValue()) {
          tempSvg.attributes.width = new Property(document2, "width", widthStyle.getString());
        }
        if (heightStyle.hasValue()) {
          tempSvg.attributes.height = new Property(document2, "height", heightStyle.getString());
        }
      }
      var oldParent = tempSvg.parent;
      tempSvg.parent = this;
      tempSvg.render(ctx);
      tempSvg.parent = oldParent;
    }
  }
  getBoundingBox(ctx) {
    var {
      element
    } = this;
    if (element) {
      return element.getBoundingBox(ctx);
    }
    return null;
  }
  elementTransform() {
    var {
      document: document2,
      element
    } = this;
    return Transform.fromElement(document2, element);
  }
  get element() {
    if (!this.cachedElement) {
      this.cachedElement = this.getHrefAttribute().getDefinition();
    }
    return this.cachedElement;
  }
}
function imGet(img, x, y, width, _height, rgba) {
  return img[y * width * 4 + x * 4 + rgba];
}
function imSet(img, x, y, width, _height, rgba, val) {
  img[y * width * 4 + x * 4 + rgba] = val;
}
function m(matrix, i, v) {
  var mi = matrix[i];
  return mi * v;
}
function c(a, m1, m2, m3) {
  return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
}
class FeColorMatrixElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feColorMatrix";
    var matrix = toNumbers(this.getAttribute("values").getString());
    switch (this.getAttribute("type").getString("matrix")) {
      case "saturate": {
        var s = matrix[0];
        matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "hueRotate": {
        var a = matrix[0] * Math.PI / 180;
        matrix = [c(a, 0.213, 0.787, -0.213), c(a, 0.715, -0.715, -0.715), c(a, 0.072, -0.072, 0.928), 0, 0, c(a, 0.213, -0.213, 0.143), c(a, 0.715, 0.285, 0.14), c(a, 0.072, -0.072, -0.283), 0, 0, c(a, 0.213, -0.213, -0.787), c(a, 0.715, -0.715, 0.715), c(a, 0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "luminanceToAlpha":
        matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
        break;
    }
    this.matrix = matrix;
    this.includeOpacity = this.getAttribute("includeOpacity").hasValue();
  }
  apply(ctx, _x, _y, width, height) {
    var {
      includeOpacity,
      matrix
    } = this;
    var srcData = ctx.getImageData(0, 0, width, height);
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var r = imGet(srcData.data, x, y, width, height, 0);
        var g = imGet(srcData.data, x, y, width, height, 1);
        var b = imGet(srcData.data, x, y, width, height, 2);
        var a = imGet(srcData.data, x, y, width, height, 3);
        var nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1);
        var ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1);
        var nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1);
        var na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1);
        if (includeOpacity) {
          nr = 0;
          ng = 0;
          nb = 0;
          na *= a / 255;
        }
        imSet(srcData.data, x, y, width, height, 0, nr);
        imSet(srcData.data, x, y, width, height, 1, ng);
        imSet(srcData.data, x, y, width, height, 2, nb);
        imSet(srcData.data, x, y, width, height, 3, na);
      }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(srcData, 0, 0);
  }
}
class MaskElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "mask";
  }
  apply(ctx, element) {
    var {
      document: document2
    } = this;
    var x = this.getAttribute("x").getPixels("x");
    var y = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    if (!width && !height) {
      var boundingBox = new BoundingBox();
      this.children.forEach((child) => {
        boundingBox.addBoundingBox(child.getBoundingBox(ctx));
      });
      x = Math.floor(boundingBox.x1);
      y = Math.floor(boundingBox.y1);
      width = Math.floor(boundingBox.width);
      height = Math.floor(boundingBox.height);
    }
    var ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles);
    var maskCanvas = document2.createCanvas(x + width, y + height);
    var maskCtx = maskCanvas.getContext("2d");
    document2.screen.setDefaults(maskCtx);
    this.renderChildren(maskCtx);
    new FeColorMatrixElement(document2, {
      nodeType: 1,
      childNodes: [],
      attributes: [{
        nodeName: "type",
        value: "luminanceToAlpha"
      }, {
        nodeName: "includeOpacity",
        value: "true"
      }]
    }).apply(maskCtx, 0, 0, x + width, y + height);
    var tmpCanvas = document2.createCanvas(x + width, y + height);
    var tmpCtx = tmpCanvas.getContext("2d");
    document2.screen.setDefaults(tmpCtx);
    element.render(tmpCtx);
    tmpCtx.globalCompositeOperation = "destination-in";
    tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, "no-repeat");
    tmpCtx.fillRect(0, 0, x + width, y + height);
    ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, "no-repeat");
    ctx.fillRect(0, 0, x + width, y + height);
    this.restoreStyles(element, ignoredStyles);
  }
  render(_2) {
  }
}
MaskElement.ignoreStyles = ["mask", "transform", "clip-path"];
var noop = () => {
};
class ClipPathElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "clipPath";
  }
  apply(ctx) {
    var {
      document: document2
    } = this;
    var contextProto = Reflect.getPrototypeOf(ctx);
    var {
      beginPath,
      closePath
    } = ctx;
    if (contextProto) {
      contextProto.beginPath = noop;
      contextProto.closePath = noop;
    }
    Reflect.apply(beginPath, ctx, []);
    this.children.forEach((child) => {
      if (typeof child.path === "undefined") {
        return;
      }
      var transform = typeof child.elementTransform !== "undefined" ? child.elementTransform() : null;
      if (!transform) {
        transform = Transform.fromElement(document2, child);
      }
      if (transform) {
        transform.apply(ctx);
      }
      child.path(ctx);
      if (contextProto) {
        contextProto.closePath = closePath;
      }
      if (transform) {
        transform.unapply(ctx);
      }
    });
    Reflect.apply(closePath, ctx, []);
    ctx.clip();
    if (contextProto) {
      contextProto.beginPath = beginPath;
      contextProto.closePath = closePath;
    }
  }
  render(_2) {
  }
}
class FilterElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "filter";
  }
  apply(ctx, element) {
    var {
      document: document2,
      children
    } = this;
    var boundingBox = element.getBoundingBox(ctx);
    if (!boundingBox) {
      return;
    }
    var px = 0;
    var py = 0;
    children.forEach((child) => {
      var efd = child.extraFilterDistance || 0;
      px = Math.max(px, efd);
      py = Math.max(py, efd);
    });
    var width = Math.floor(boundingBox.width);
    var height = Math.floor(boundingBox.height);
    var tmpCanvasWidth = width + 2 * px;
    var tmpCanvasHeight = height + 2 * py;
    if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
      return;
    }
    var x = Math.floor(boundingBox.x);
    var y = Math.floor(boundingBox.y);
    var ignoredStyles = this.removeStyles(element, FilterElement.ignoreStyles);
    var tmpCanvas = document2.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
    var tmpCtx = tmpCanvas.getContext("2d");
    document2.screen.setDefaults(tmpCtx);
    tmpCtx.translate(-x + px, -y + py);
    element.render(tmpCtx);
    children.forEach((child) => {
      if (typeof child.apply === "function") {
        child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
      }
    });
    ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
    this.restoreStyles(element, ignoredStyles);
  }
  render(_2) {
  }
}
FilterElement.ignoreStyles = ["filter", "transform", "clip-path"];
class FeDropShadowElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feDropShadow";
    this.addStylesFromStyleDefinition();
  }
  apply(_2, _x, _y, _width, _height) {
  }
}
class FeMorphologyElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "feMorphology";
  }
  apply(_2, _x, _y, _width, _height) {
  }
}
class FeCompositeElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "feComposite";
  }
  apply(_2, _x, _y, _width, _height) {
  }
}
class FeGaussianBlurElement extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feGaussianBlur";
    this.blurRadius = Math.floor(this.getAttribute("stdDeviation").getNumber());
    this.extraFilterDistance = this.blurRadius;
  }
  apply(ctx, x, y, width, height) {
    var {
      document: document2,
      blurRadius
    } = this;
    var body = document2.window ? document2.window.document.body : null;
    var canvas = ctx.canvas;
    canvas.id = document2.getUniqueId();
    if (body) {
      canvas.style.display = "none";
      body.appendChild(canvas);
    }
    processCanvasRGBA(canvas, x, y, width, height, blurRadius);
    if (body) {
      body.removeChild(canvas);
    }
  }
}
class TitleElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "title";
  }
}
class DescElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "desc";
  }
}
var elements = {
  "svg": SVGElement,
  "rect": RectElement,
  "circle": CircleElement,
  "ellipse": EllipseElement,
  "line": LineElement,
  "polyline": PolylineElement,
  "polygon": PolygonElement,
  "path": PathElement,
  "pattern": PatternElement,
  "marker": MarkerElement,
  "defs": DefsElement,
  "linearGradient": LinearGradientElement,
  "radialGradient": RadialGradientElement,
  "stop": StopElement,
  "animate": AnimateElement,
  "animateColor": AnimateColorElement,
  "animateTransform": AnimateTransformElement,
  "font": FontElement,
  "font-face": FontFaceElement,
  "missing-glyph": MissingGlyphElement,
  "glyph": GlyphElement,
  "text": TextElement,
  "tspan": TSpanElement,
  "tref": TRefElement,
  "a": AElement,
  "textPath": TextPathElement,
  "image": ImageElement,
  "g": GElement,
  "symbol": SymbolElement,
  "style": StyleElement,
  "use": UseElement,
  "mask": MaskElement,
  "clipPath": ClipPathElement,
  "filter": FilterElement,
  "feDropShadow": FeDropShadowElement,
  "feMorphology": FeMorphologyElement,
  "feComposite": FeCompositeElement,
  "feColorMatrix": FeColorMatrixElement,
  "feGaussianBlur": FeGaussianBlurElement,
  "title": TitleElement,
  "desc": DescElement
};
function ownKeys$1(object, enumerableOnly) {
  var keys3 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys3.push.apply(keys3, symbols);
  }
  return keys3;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function createImage(_x) {
  return _createImage.apply(this, arguments);
}
function _createImage() {
  _createImage = _asyncToGenerator(function* (src) {
    var anonymousCrossOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var image = document.createElement("img");
    if (anonymousCrossOrigin) {
      image.crossOrigin = "Anonymous";
    }
    return new Promise((resolve2, reject2) => {
      image.onload = () => {
        resolve2(image);
      };
      image.onerror = (_event, _source, _lineno, _colno, error) => {
        reject2(error);
      };
      image.src = src;
    });
  });
  return _createImage.apply(this, arguments);
}
class Document {
  constructor(canvg) {
    var {
      rootEmSize = 12,
      emSize = 12,
      createCanvas: createCanvas2 = Document.createCanvas,
      createImage: createImage2 = Document.createImage,
      anonymousCrossOrigin
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.canvg = canvg;
    this.definitions = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.images = [];
    this.fonts = [];
    this.emSizeStack = [];
    this.uniqueId = 0;
    this.screen = canvg.screen;
    this.rootEmSize = rootEmSize;
    this.emSize = emSize;
    this.createCanvas = createCanvas2;
    this.createImage = this.bindCreateImage(createImage2, anonymousCrossOrigin);
    this.screen.wait(this.isImagesLoaded.bind(this));
    this.screen.wait(this.isFontsLoaded.bind(this));
  }
  bindCreateImage(createImage2, anonymousCrossOrigin) {
    if (typeof anonymousCrossOrigin === "boolean") {
      return (source, forceAnonymousCrossOrigin) => createImage2(source, typeof forceAnonymousCrossOrigin === "boolean" ? forceAnonymousCrossOrigin : anonymousCrossOrigin);
    }
    return createImage2;
  }
  get window() {
    return this.screen.window;
  }
  get fetch() {
    return this.screen.fetch;
  }
  get ctx() {
    return this.screen.ctx;
  }
  get emSize() {
    var {
      emSizeStack
    } = this;
    return emSizeStack[emSizeStack.length - 1];
  }
  set emSize(value) {
    var {
      emSizeStack
    } = this;
    emSizeStack.push(value);
  }
  popEmSize() {
    var {
      emSizeStack
    } = this;
    emSizeStack.pop();
  }
  getUniqueId() {
    return "canvg".concat(++this.uniqueId);
  }
  isImagesLoaded() {
    return this.images.every((_2) => _2.loaded);
  }
  isFontsLoaded() {
    return this.fonts.every((_2) => _2.loaded);
  }
  createDocumentElement(document2) {
    var documentElement = this.createElement(document2.documentElement);
    documentElement.root = true;
    documentElement.addStylesFromStyleDefinition();
    this.documentElement = documentElement;
    return documentElement;
  }
  createElement(node2) {
    var elementType = node2.nodeName.replace(/^[^:]+:/, "");
    var ElementType = Document.elementTypes[elementType];
    if (typeof ElementType !== "undefined") {
      return new ElementType(this, node2);
    }
    return new UnknownElement(this, node2);
  }
  createTextNode(node2) {
    return new TextNode(this, node2);
  }
  setViewBox(config) {
    this.screen.setViewBox(_objectSpread$1({
      document: this
    }, config));
  }
}
Document.createCanvas = createCanvas;
Document.createImage = createImage;
Document.elementTypes = elements;
function ownKeys2(object, enumerableOnly) {
  var keys3 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys3.push.apply(keys3, symbols);
  }
  return keys3;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
class Canvg {
  constructor(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.parser = new Parser(options);
    this.screen = new Screen(ctx, options);
    this.options = options;
    var document2 = new Document(this, options);
    var documentElement = document2.createDocumentElement(svg);
    this.document = document2;
    this.documentElement = documentElement;
  }
  static from(ctx, svg) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      var options = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
      var parser = new Parser(options);
      var svgDocument = yield parser.parse(svg);
      return new Canvg(ctx, svgDocument, options);
    })();
  }
  static fromString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var parser = new Parser(options);
    var svgDocument = parser.parseFromString(svg);
    return new Canvg(ctx, svgDocument, options);
  }
  fork(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return Canvg.from(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  forkString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return Canvg.fromString(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  ready() {
    return this.screen.ready();
  }
  isReady() {
    return this.screen.isReady();
  }
  render() {
    var _arguments2 = arguments, _this = this;
    return _asyncToGenerator(function* () {
      var options = _arguments2.length > 0 && _arguments2[0] !== void 0 ? _arguments2[0] : {};
      _this.start(_objectSpread({
        enableRedraw: true,
        ignoreAnimation: true,
        ignoreMouse: true
      }, options));
      yield _this.ready();
      _this.stop();
    })();
  }
  start() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var {
      documentElement,
      screen,
      options: baseOptions
    } = this;
    screen.start(documentElement, _objectSpread(_objectSpread({
      enableRedraw: true
    }, baseOptions), options));
  }
  stop() {
    this.screen.stop();
  }
  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    this.documentElement.resize(width, height, preserveAspectRatio);
  }
}
export { AElement, AnimateColorElement, AnimateElement, AnimateTransformElement, BoundingBox, CB1, CB2, CB3, CB4, Canvg, CircleElement, ClipPathElement, DefsElement, DescElement, Document, Element, EllipseElement, FeColorMatrixElement, FeCompositeElement, FeDropShadowElement, FeGaussianBlurElement, FeMorphologyElement, FilterElement, Font, FontElement, FontFaceElement, GElement, GlyphElement, GradientElement, ImageElement, LineElement, LinearGradientElement, MarkerElement, MaskElement, Matrix, MissingGlyphElement, Mouse, PSEUDO_ZERO, Parser, PathElement, PathParser, PatternElement, Point, PolygonElement, PolylineElement, Property, QB1, QB2, QB3, RadialGradientElement, RectElement, RenderedElement, Rotate, SVGElement, SVGFontLoader, Scale, Screen, Skew, SkewX, SkewY, StopElement, StyleElement, SymbolElement, TRefElement, TSpanElement, TextElement, TextPathElement, TitleElement, Transform, Translate, UnknownElement, UseElement, ViewPort, compressSpaces, Canvg as default, getSelectorSpecificity, normalizeAttributeName, normalizeColor, parseExternalUrl, index as presets, toNumbers, trimLeft, trimRight, vectorMagnitude, vectorsAngle, vectorsRatio };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1jYWxsYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWNhbGxhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21hdGgtdHJ1bmMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1zcGVjaWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY29uc3RydWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNsaWNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90YXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MtcGViYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy13ZWJvcy13ZWJraXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWljcm90YXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wZXJmb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3F1ZXVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Byb21pc2UtbmF0aXZlLWNvbnN0cnVjdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1kZW5vLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1icm93c2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Byb21pc2UtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuY29uc3RydWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXN0YXRpY3MtaW5jb3JyZWN0LWl0ZXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucHJvbWlzZS5hbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuY2F0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UucmFjZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucHJvbWlzZS5yZWplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLnJlc29sdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5tYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbm90LWEtcmVnZXhwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtaXMtcmVnZXhwLWxvZ2ljLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3RhcnRzLXdpdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3ItZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLXRva2VuLWxpc3QtcHJvdG90eXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJvcGVydHlLZXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktcmVkdWNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnJlZHVjZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLmVuZHMtd2l0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2Utc2ltcGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3BsaXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXRyaW0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXRyaW0tZm9yY2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcudHJpbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pbmNsdWRlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkucmV2ZXJzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2pzcGRmL25vZGVfbW9kdWxlcy9jYW52Zy9saWIvaW5kZXguZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzV2l0aEJpbmQgPSBOQVRJVkVfQklORCAmJiBGdW5jdGlvblByb3RvdHlwZS5iaW5kLmJpbmQoY2FsbCwgY2FsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyB1bmN1cnJ5VGhpc1dpdGhCaW5kIDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhJE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6ICRPYmplY3QoaXQpO1xufSA6ICRPYmplY3Q7XG4iLCIvLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwidmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChpdCkpIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJ2YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby10eXBlb2YtdW5kZWZpbmVkIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG52YXIgSVNfSFRNTEREQSA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWxsOiBkb2N1bWVudEFsbCxcbiAgSVNfSFRNTEREQTogSVNfSFRNTEREQVxufTtcbiIsInZhciAkZG9jdW1lbnRBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtYWxsJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9ICRkb2N1bWVudEFsbC5hbGw7XG5cbi8vIGBJc0NhbGxhYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxubW9kdWxlLmV4cG9ydHMgPSAkZG9jdW1lbnRBbGwuSVNfSFRNTEREQSA/IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbicgfHwgYXJndW1lbnQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciAkZG9jdW1lbnRBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtYWxsJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9ICRkb2N1bWVudEFsbC5hbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gJGRvY3VtZW50QWxsLklTX0hUTUxEREEgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCkgfHwgaXQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNDYWxsYWJsZShhcmd1bWVudCkgPyBhcmd1bWVudCA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSkgOiBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyh7fS5pc1Byb3RvdHlwZU9mKTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGVubyA9IGdsb2JhbC5EZW5vO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zIHx8IERlbm8gJiYgRGVuby52ZXJzaW9uO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIC8vIGluIG9sZCBDaHJvbWUsIHZlcnNpb25zIG9mIFY4IGlzbid0IFY4ID0gQ2hyb21lIC8gMTBcbiAgLy8gYnV0IHRoZWlyIGNvcnJlY3QgdmVyc2lvbnMgYXJlIG5vdCBpbnRlcmVzdGluZyBmb3IgdXNcbiAgdmVyc2lvbiA9IG1hdGNoWzBdID4gMCAmJiBtYXRjaFswXSA8IDQgPyAxIDogKyhtYXRjaFswXSArIG1hdGNoWzFdKTtcbn1cblxuLy8gQnJvd3NlckZTIE5vZGVKUyBgcHJvY2Vzc2AgcG9seWZpbGwgaW5jb3JyZWN0bHkgc2V0IGAudjhgIHRvIGAwLjBgXG4vLyBzbyBjaGVjayBgdXNlckFnZW50YCBldmVuIGlmIGAudjhgIGV4aXN0cywgYnV0IDBcbmlmICghdmVyc2lvbiAmJiB1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSArbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgcmV0dXJuICFTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiBpc0NhbGxhYmxlKCRTeW1ib2wpICYmIGlzUHJvdG90eXBlT2YoJFN5bWJvbC5wcm90b3R5cGUsICRPYmplY3QoaXQpKTtcbn07XG4iLCJ2YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsInZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGRlZmluZVByb3BlcnR5KGdsb2JhbCwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4yNy4xJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjIgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4yNy4xL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIHN5bWJvbEZvciA9IFN5bWJvbCAmJiBTeW1ib2xbJ2ZvciddO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICdTeW1ib2wuJyArIG5hbWU7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzT3duKFN5bWJvbCwgbmFtZSkpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICB9IGVsc2UgaWYgKFVTRV9TWU1CT0xfQVNfVUlEICYmIHN5bWJvbEZvcikge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gc3ltYm9sRm9yKGRlc2NyaXB0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBvcmRpbmFyeVRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSB8fCBpc1N5bWJvbChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGV4b3RpY1RvUHJpbSA9IGdldE1ldGhvZChpbnB1dCwgVE9fUFJJTUlUSVZFKTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSkge1xuICAgIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnZGVmYXVsdCc7XG4gICAgcmVzdWx0ID0gY2FsbChleG90aWNUb1ByaW0sIGlucHV0LCBwcmVmKTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkgfHwgaXNTeW1ib2wocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsInZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFua3MgdG8gSUU4IGZvciBpdHMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhc093bihPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLCBPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPSA0Mjtcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBUeXBlKGFyZ3VtZW50KSBpcyBPYmplY3RgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNPYmplY3QoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IoJFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG52YXIgRVhJU1RTID0gaGFzT3duKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpO1xuLy8gYWRkaXRpb25hbCBwcm90ZWN0aW9uIGZyb20gbWluaWZpZWQgLyBtYW5nbGVkIC8gZHJvcHBlZCBmdW5jdGlvbiBuYW1lc1xudmFyIFBST1BFUiA9IEVYSVNUUyAmJiAoZnVuY3Rpb24gc29tZXRoaW5nKCkgeyAvKiBlbXB0eSAqLyB9KS5uYW1lID09PSAnc29tZXRoaW5nJztcbnZhciBDT05GSUdVUkFCTEUgPSBFWElTVFMgJiYgKCFERVNDUklQVE9SUyB8fCAoREVTQ1JJUFRPUlMgJiYgZ2V0RGVzY3JpcHRvcihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKS5jb25maWd1cmFibGUpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVYSVNUUzogRVhJU1RTLFxuICBQUk9QRVI6IFBST1BFUixcbiAgQ09ORklHVVJBQkxFOiBDT05GSUdVUkFCTEVcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IHVuY3VycnlUaGlzKEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKCFpc0NhbGxhYmxlKHN0b3JlLmluc3BlY3RTb3VyY2UpKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZyhpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQ2FsbGFibGUoV2Vha01hcCkgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFN0cmluZyhXZWFrTWFwKSk7XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1hc3NpZ24gLS0gcHJvdG90eXBlIG1ldGhvZHMgcHJvdGVjdGlvbiAqL1xuICBzdG9yZS5nZXQgPSBzdG9yZS5nZXQ7XG4gIHN0b3JlLmhhcyA9IHN0b3JlLmhhcztcbiAgc3RvcmUuc2V0ID0gc3RvcmUuc2V0O1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlbGYtYXNzaWduIC0tIHByb3RvdHlwZSBtZXRob2RzIHByb3RlY3Rpb24gKi9cbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChzdG9yZS5oYXMoaXQpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHN0b3JlLnNldChpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHN0b3JlLmdldChpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBzdG9yZS5oYXMoaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoaGFzT3duKGl0LCBTVEFURSkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuQ09ORklHVVJBQkxFO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIENPTkZJR1VSQUJMRV9MRU5HVEggPSBERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAnbGVuZ3RoJywgeyB2YWx1ZTogOCB9KS5sZW5ndGggIT09IDg7XG59KTtcblxudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG52YXIgbWFrZUJ1aWx0SW4gPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSwgb3B0aW9ucykge1xuICBpZiAoU3RyaW5nKG5hbWUpLnNsaWNlKDAsIDcpID09PSAnU3ltYm9sKCcpIHtcbiAgICBuYW1lID0gJ1snICsgU3RyaW5nKG5hbWUpLnJlcGxhY2UoL15TeW1ib2xcXCgoW14pXSopXFwpLywgJyQxJykgKyAnXSc7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nZXR0ZXIpIG5hbWUgPSAnZ2V0ICcgKyBuYW1lO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNldHRlcikgbmFtZSA9ICdzZXQgJyArIG5hbWU7XG4gIGlmICghaGFzT3duKHZhbHVlLCAnbmFtZScpIHx8IChDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSAmJiB2YWx1ZS5uYW1lICE9PSBuYW1lKSkge1xuICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICduYW1lJywgeyB2YWx1ZTogbmFtZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIGVsc2UgdmFsdWUubmFtZSA9IG5hbWU7XG4gIH1cbiAgaWYgKENPTkZJR1VSQUJMRV9MRU5HVEggJiYgb3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2FyaXR5JykgJiYgdmFsdWUubGVuZ3RoICE9PSBvcHRpb25zLmFyaXR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkodmFsdWUsICdsZW5ndGgnLCB7IHZhbHVlOiBvcHRpb25zLmFyaXR5IH0pO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdjb25zdHJ1Y3RvcicpICYmIG9wdGlvbnMuY29uc3RydWN0b3IpIHtcbiAgICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICdwcm90b3R5cGUnLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICAvLyBpbiBWOCB+IENocm9tZSA1MywgcHJvdG90eXBlcyBvZiBzb21lIG1ldGhvZHMsIGxpa2UgYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgLCBhcmUgbm9uLXdyaXRhYmxlXG4gICAgfSBlbHNlIGlmICh2YWx1ZS5wcm90b3R5cGUpIHZhbHVlLnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICB2YXIgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gIGlmICghaGFzT3duKHN0YXRlLCAnc291cmNlJykpIHtcbiAgICBzdGF0ZS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnID8gbmFtZSA6ICcnKTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRlbmQtbmF0aXZlIC0tIHJlcXVpcmVkXG5GdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBtYWtlQnVpbHRJbihmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUodGhpcykgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0sICd0b1N0cmluZycpO1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMuZW51bWVyYWJsZTtcbiAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubmFtZSA6IGtleTtcbiAgaWYgKGlzQ2FsbGFibGUodmFsdWUpKSBtYWtlQnVpbHRJbih2YWx1ZSwgbmFtZSwgb3B0aW9ucyk7XG4gIGlmIChvcHRpb25zLmdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lR2xvYmFsUHJvcGVydHkoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghb3B0aW9ucy51bnNhZmUpIGRlbGV0ZSBPW2tleV07XG4gICAgICBlbHNlIGlmIChPW2tleV0pIHNpbXBsZSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiAhb3B0aW9ucy5ub25Db25maWd1cmFibGUsXG4gICAgICB3cml0YWJsZTogIW9wdGlvbnMubm9uV3JpdGFibGVcbiAgICB9KTtcbiAgfSByZXR1cm4gTztcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBNYXRoLnRydW5jYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWF0aC50cnVuY1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW1hdGgtdHJ1bmMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uIHRydW5jKHgpIHtcbiAgdmFyIG4gPSAreDtcbiAgcmV0dXJuIChuID4gMCA/IGZsb29yIDogY2VpbCkobik7XG59O1xuIiwidmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgZXhjZXB0aW9ucykge1xuICB2YXIga2V5cyA9IG93bktleXMoc291cmNlKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbiAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkgJiYgIShleGNlcHRpb25zICYmIGhhc093bihleGNlcHRpb25zLCBrZXkpKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgIH1cbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiBpc0NhbGxhYmxlKGRldGVjdGlvbikgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKHR5cGVvZiBhcmd1bWVudCA9PSAnb2JqZWN0JyB8fCBpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgJFN0cmluZyhhcmd1bWVudCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gLS0gc2FmZSAqL1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qtc2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gICAgc2V0dGVyID0gdW5jdXJyeVRoaXMoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0KTtcbiAgICBzZXR0ZXIodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgVEFHLCBTVEFUSUMpIHtcbiAgaWYgKHRhcmdldCAmJiAhU1RBVElDKSB0YXJnZXQgPSB0YXJnZXQucHJvdG90eXBlO1xuICBpZiAodGFyZ2V0ICYmICFoYXNPd24odGFyZ2V0LCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgVE9fU1RSSU5HX1RBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBUQUcgfSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCJ2YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUHJvdG90eXBlKSB7XG4gIGlmIChpc1Byb3RvdHlwZU9mKFByb3RvdHlwZSwgaXQpKSByZXR1cm4gaXQ7XG4gIHRocm93ICRUeXBlRXJyb3IoJ0luY29ycmVjdCBpbnZvY2F0aW9uJyk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSAkT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgaXNDYWxsYWJsZShPLmNhbGxlZSkgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBub29wID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIGVtcHR5ID0gW107XG52YXIgY29uc3RydWN0ID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdjb25zdHJ1Y3QnKTtcbnZhciBjb25zdHJ1Y3RvclJlZ0V4cCA9IC9eXFxzKig/OmNsYXNzfGZ1bmN0aW9uKVxcYi87XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKGNvbnN0cnVjdG9yUmVnRXhwLmV4ZWMpO1xudmFyIElOQ09SUkVDVF9UT19TVFJJTkcgPSAhY29uc3RydWN0b3JSZWdFeHAuZXhlYyhub29wKTtcblxudmFyIGlzQ29uc3RydWN0b3JNb2Rlcm4gPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBjb25zdHJ1Y3Qobm9vcCwgZW1wdHksIGFyZ3VtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBpc0NvbnN0cnVjdG9yTGVnYWN5ID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHN3aXRjaCAoY2xhc3NvZihhcmd1bWVudCkpIHtcbiAgICBjYXNlICdBc3luY0Z1bmN0aW9uJzpcbiAgICBjYXNlICdHZW5lcmF0b3JGdW5jdGlvbic6XG4gICAgY2FzZSAnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbic6IHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIC8vIHdlIGNhbid0IGNoZWNrIC5wcm90b3R5cGUgc2luY2UgY29uc3RydWN0b3JzIHByb2R1Y2VkIGJ5IC5iaW5kIGhhdmVuJ3QgaXRcbiAgICAvLyBgRnVuY3Rpb24jdG9TdHJpbmdgIHRocm93cyBvbiBzb21lIGJ1aWx0LWl0IGZ1bmN0aW9uIGluIHNvbWUgbGVnYWN5IGVuZ2luZXNcbiAgICAvLyAoZm9yIGV4YW1wbGUsIGBET01RdWFkYCBhbmQgc2ltaWxhciBpbiBGRjQxLSlcbiAgICByZXR1cm4gSU5DT1JSRUNUX1RPX1NUUklORyB8fCAhIWV4ZWMoY29uc3RydWN0b3JSZWdFeHAsIGluc3BlY3RTb3VyY2UoYXJndW1lbnQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuaXNDb25zdHJ1Y3RvckxlZ2FjeS5zaGFtID0gdHJ1ZTtcblxuLy8gYElzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9ICFjb25zdHJ1Y3QgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGVkO1xuICByZXR1cm4gaXNDb25zdHJ1Y3Rvck1vZGVybihpc0NvbnN0cnVjdG9yTW9kZXJuLmNhbGwpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oT2JqZWN0KVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZTsgfSlcbiAgICB8fCBjYWxsZWQ7XG59KSA/IGlzQ29uc3RydWN0b3JMZWdhY3kgOiBpc0NvbnN0cnVjdG9yTW9kZXJuO1xuIiwidmFyIGlzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3InKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ29uc3RydWN0b3IoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jb25zdHJ1Y3RvcicpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBTcGVjaWVzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCBpc051bGxPclVuZGVmaW5lZChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID8gZGVmYXVsdENvbnN0cnVjdG9yIDogYUNvbnN0cnVjdG9yKFMpO1xufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXJlZmxlY3QgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgUmVmbGVjdCA9PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmFwcGx5IHx8IChOQVRJVkVfQklORCA/IGNhbGwuYmluZChhcHBseSkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGFwcGx5LCBhcmd1bWVudHMpO1xufSk7XG4iLCJ2YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBOYXNob3JuIGJ1ZzpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEyOFxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTMwXG4gIGlmIChjbGFzc29mUmF3KGZuKSA9PT0gJ0Z1bmN0aW9uJykgcmV0dXJuIHVuY3VycnlUaGlzKGZuKTtcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGJpbmQgPSB1bmN1cnJ5VGhpcyh1bmN1cnJ5VGhpcy5iaW5kKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCkge1xuICBhQ2FsbGFibGUoZm4pO1xuICByZXR1cm4gdGhhdCA9PT0gdW5kZWZpbmVkID8gZm4gOiBOQVRJVkVfQklORCA/IGJpbmQoZm4sIHRoYXQpIDogZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyhbXS5zbGljZSk7XG4iLCJ2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFzc2VkLCByZXF1aXJlZCkge1xuICBpZiAocGFzc2VkIDwgcmVxdWlyZWQpIHRocm93ICRUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG4gIHJldHVybiBwYXNzZWQ7XG59O1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oPzppcGFkfGlwaG9uZXxpcG9kKS4qYXBwbGV3ZWJraXQvaS50ZXN0KHVzZXJBZ2VudCk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgRnVuY3Rpb24gPSBnbG9iYWwuRnVuY3Rpb247XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyICRsb2NhdGlvbiwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnRyeSB7XG4gIC8vIERlbm8gdGhyb3dzIGEgUmVmZXJlbmNlRXJyb3Igb24gYGxvY2F0aW9uYCBhY2Nlc3Mgd2l0aG91dCBgLS1sb2NhdGlvbmAgZmxhZ1xuICAkbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbnZhciBydW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKGhhc093bihxdWV1ZSwgaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcblxudmFyIHJ1bm5lciA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJ1bihpZCk7XG4gIH07XG59O1xuXG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuKGV2ZW50LmRhdGEpO1xufTtcblxudmFyIHBvc3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gb2xkIGVuZ2luZXMgaGF2ZSBub3QgbG9jYXRpb24ub3JpZ2luXG4gIGdsb2JhbC5wb3N0TWVzc2FnZShTdHJpbmcoaWQpLCAkbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgJGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShoYW5kbGVyKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGZuID0gaXNDYWxsYWJsZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKTtcbiAgICB2YXIgYXJncyA9IGFycmF5U2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgYXBwbHkoZm4sIHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXIgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAoSVNfTk9ERSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3cocnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICAvLyBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzYyNFxuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsICYmICFJU19JT1MpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGJpbmQocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKFxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmXG4gICAgaXNDYWxsYWJsZShnbG9iYWwucG9zdE1lc3NhZ2UpICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgJGxvY2F0aW9uICYmICRsb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJlxuICAgICFmYWlscyhwb3N0KVxuICApIHtcbiAgICBkZWZlciA9IHBvc3Q7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bihpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQocnVubmVyKGlkKSwgMCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGNsZWFyOiBjbGVhclxufTtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gL2lwYWR8aXBob25lfGlwb2QvaS50ZXN0KHVzZXJBZ2VudCkgJiYgZ2xvYmFsLlBlYmJsZSAhPT0gdW5kZWZpbmVkO1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC93ZWIwcyg/IS4qY2hyb21lKS9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19JT1NfUEVCQkxFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MtcGViYmxlJyk7XG52YXIgSVNfV0VCT1NfV0VCS0lUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy13ZWJvcy13ZWJraXQnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIC8vIGFsc28gZXhjZXB0IFdlYk9TIFdlYmtpdCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODk4XG4gIGlmICghSVNfSU9TICYmICFJU19OT0RFICYmICFJU19XRUJPU19XRUJLSVQgJiYgTXV0YXRpb25PYnNlcnZlciAmJiBkb2N1bWVudCkge1xuICAgIHRvZ2dsZSA9IHRydWU7XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKCFJU19JT1NfUEVCQkxFICYmIFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgLy8gd29ya2Fyb3VuZCBvZiBXZWJLaXQgfiBpT1MgU2FmYXJpIDEwLjEgYnVnXG4gICAgcHJvbWlzZS5jb25zdHJ1Y3RvciA9IFByb21pc2U7XG4gICAgdGhlbiA9IGJpbmQocHJvbWlzZS50aGVuLCBwcm9taXNlKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBOb2RlLmpzIHdpdGhvdXQgcHJvbWlzZXNcbiAgfSBlbHNlIGlmIChJU19OT0RFKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnZVxuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuYmluZChnbG9iYWwpXG4gICAgbWFjcm90YXNrID0gYmluZChtYWNyb3Rhc2ssIGdsb2JhbCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbWFjcm90YXNrKGZsdXNoKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcXVldWVNaWNyb3Rhc2sgfHwgZnVuY3Rpb24gKGZuKSB7XG4gIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYgKCFoZWFkKSB7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICB2YXIgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlO1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gY29uc29sZS5lcnJvcihhKSA6IGNvbnNvbGUuZXJyb3IoYSwgYik7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCB2YWx1ZTogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IHRydWUsIHZhbHVlOiBlcnJvciB9O1xuICB9XG59O1xuIiwidmFyIFF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmhlYWQgPSBudWxsO1xuICB0aGlzLnRhaWwgPSBudWxsO1xufTtcblxuUXVldWUucHJvdG90eXBlID0ge1xuICBhZGQ6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGVudHJ5ID0geyBpdGVtOiBpdGVtLCBuZXh0OiBudWxsIH07XG4gICAgaWYgKHRoaXMuaGVhZCkgdGhpcy50YWlsLm5leHQgPSBlbnRyeTtcbiAgICBlbHNlIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmhlYWQ7XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICB0aGlzLmhlYWQgPSBlbnRyeS5uZXh0O1xuICAgICAgaWYgKHRoaXMudGFpbCA9PT0gZW50cnkpIHRoaXMudGFpbCA9IG51bGw7XG4gICAgICByZXR1cm4gZW50cnkuaXRlbTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5Qcm9taXNlO1xuIiwiLyogZ2xvYmFsIERlbm8gLS0gRGVubyBjYXNlICovXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBEZW5vID09ICdvYmplY3QnICYmIERlbm8gJiYgdHlwZW9mIERlbm8udmVyc2lvbiA9PSAnb2JqZWN0JztcbiIsInZhciBJU19ERU5PID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1kZW5vJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFJU19ERU5PICYmICFJU19OT0RFXG4gICYmIHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCdcbiAgJiYgdHlwZW9mIGRvY3VtZW50ID09ICdvYmplY3QnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1uYXRpdmUtY29uc3RydWN0b3InKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX0JST1dTRVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWJyb3dzZXInKTtcbnZhciBJU19ERU5PID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1kZW5vJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgTmF0aXZlUHJvbWlzZVByb3RvdHlwZSA9IE5hdGl2ZVByb21pc2VDb25zdHJ1Y3RvciAmJiBOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IucHJvdG90eXBlO1xudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBTVUJDTEFTU0lORyA9IGZhbHNlO1xudmFyIE5BVElWRV9QUk9NSVNFX1JFSkVDVElPTl9FVkVOVCA9IGlzQ2FsbGFibGUoZ2xvYmFsLlByb21pc2VSZWplY3Rpb25FdmVudCk7XG5cbnZhciBGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUiA9IGlzRm9yY2VkKCdQcm9taXNlJywgZnVuY3Rpb24gKCkge1xuICB2YXIgUFJPTUlTRV9DT05TVFJVQ1RPUl9TT1VSQ0UgPSBpbnNwZWN0U291cmNlKE5hdGl2ZVByb21pc2VDb25zdHJ1Y3Rvcik7XG4gIHZhciBHTE9CQUxfQ09SRV9KU19QUk9NSVNFID0gUFJPTUlTRV9DT05TVFJVQ1RPUl9TT1VSQ0UgIT09IFN0cmluZyhOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IpO1xuICAvLyBWOCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAvLyBXZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICBpZiAoIUdMT0JBTF9DT1JFX0pTX1BST01JU0UgJiYgVjhfVkVSU0lPTiA9PT0gNjYpIHJldHVybiB0cnVlO1xuICAvLyBXZSBuZWVkIFByb21pc2UjeyBjYXRjaCwgZmluYWxseSB9IGluIHRoZSBwdXJlIHZlcnNpb24gZm9yIHByZXZlbnRpbmcgcHJvdG90eXBlIHBvbGx1dGlvblxuICBpZiAoSVNfUFVSRSAmJiAhKE5hdGl2ZVByb21pc2VQcm90b3R5cGVbJ2NhdGNoJ10gJiYgTmF0aXZlUHJvbWlzZVByb3RvdHlwZVsnZmluYWxseSddKSkgcmV0dXJuIHRydWU7XG4gIC8vIFdlIGNhbid0IHVzZSBAQHNwZWNpZXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG4gIGlmICghVjhfVkVSU0lPTiB8fCBWOF9WRVJTSU9OIDwgNTEgfHwgIS9uYXRpdmUgY29kZS8udGVzdChQUk9NSVNFX0NPTlNUUlVDVE9SX1NPVVJDRSkpIHtcbiAgICAvLyBEZXRlY3QgY29ycmVjdG5lc3Mgb2Ygc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gbmV3IE5hdGl2ZVByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKDEpOyB9KTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sIGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG4gICAgfTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBGYWtlUHJvbWlzZTtcbiAgICBTVUJDTEFTU0lORyA9IHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gICAgaWYgKCFTVUJDTEFTU0lORykgcmV0dXJuIHRydWU7XG4gIC8vIFVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgfSByZXR1cm4gIUdMT0JBTF9DT1JFX0pTX1BST01JU0UgJiYgKElTX0JST1dTRVIgfHwgSVNfREVOTykgJiYgIU5BVElWRV9QUk9NSVNFX1JFSkVDVElPTl9FVkVOVDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ09OU1RSVUNUT1I6IEZPUkNFRF9QUk9NSVNFX0NPTlNUUlVDVE9SLFxuICBSRUpFQ1RJT05fRVZFTlQ6IE5BVElWRV9QUk9NSVNFX1JFSkVDVElPTl9FVkVOVCxcbiAgU1VCQ0xBU1NJTkc6IFNVQkNMQVNTSU5HXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93ICRUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFDYWxsYWJsZShyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhQ2FsbGFibGUocmVqZWN0KTtcbn07XG5cbi8vIGBOZXdQcm9taXNlQ2FwYWJpbGl0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW5ld3Byb21pc2VjYXBhYmlsaXR5XG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21pY3JvdGFzaycpO1xudmFyIGhvc3RSZXBvcnRFcnJvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzJyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wZXJmb3JtJyk7XG52YXIgUXVldWUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcXVldWUnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtbmF0aXZlLWNvbnN0cnVjdG9yJyk7XG52YXIgUHJvbWlzZUNvbnN0cnVjdG9yRGV0ZWN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUiA9IFByb21pc2VDb25zdHJ1Y3RvckRldGVjdGlvbi5DT05TVFJVQ1RPUjtcbnZhciBOQVRJVkVfUFJPTUlTRV9SRUpFQ1RJT05fRVZFTlQgPSBQcm9taXNlQ29uc3RydWN0b3JEZXRlY3Rpb24uUkVKRUNUSU9OX0VWRU5UO1xudmFyIE5BVElWRV9QUk9NSVNFX1NVQkNMQVNTSU5HID0gUHJvbWlzZUNvbnN0cnVjdG9yRGV0ZWN0aW9uLlNVQkNMQVNTSU5HO1xudmFyIGdldEludGVybmFsUHJvbWlzZVN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoUFJPTUlTRSk7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIE5hdGl2ZVByb21pc2VQcm90b3R5cGUgPSBOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IgJiYgTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbnZhciBQcm9taXNlQ29uc3RydWN0b3IgPSBOYXRpdmVQcm9taXNlQ29uc3RydWN0b3I7XG52YXIgUHJvbWlzZVByb3RvdHlwZSA9IE5hdGl2ZVByb21pc2VQcm90b3R5cGU7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xudmFyIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5O1xuXG52YXIgRElTUEFUQ0hfRVZFTlQgPSAhIShkb2N1bWVudCAmJiBkb2N1bWVudC5jcmVhdGVFdmVudCAmJiBnbG9iYWwuZGlzcGF0Y2hFdmVudCk7XG52YXIgVU5IQU5ETEVEX1JFSkVDVElPTiA9ICd1bmhhbmRsZWRyZWplY3Rpb24nO1xudmFyIFJFSkVDVElPTl9IQU5ETEVEID0gJ3JlamVjdGlvbmhhbmRsZWQnO1xudmFyIFBFTkRJTkcgPSAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xudmFyIEhBTkRMRUQgPSAxO1xudmFyIFVOSEFORExFRCA9IDI7XG5cbnZhciBJbnRlcm5hbCwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFByb21pc2VXcmFwcGVyLCBuYXRpdmVUaGVuO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiBpc0NhbGxhYmxlKHRoZW4gPSBpdC50aGVuKSA/IHRoZW4gOiBmYWxzZTtcbn07XG5cbnZhciBjYWxsUmVhY3Rpb24gPSBmdW5jdGlvbiAocmVhY3Rpb24sIHN0YXRlKSB7XG4gIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICB2YXIgb2sgPSBzdGF0ZS5zdGF0ZSA9PSBGVUxGSUxMRUQ7XG4gIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICB0cnkge1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIGlmIChzdGF0ZS5yZWplY3Rpb24gPT09IFVOSEFORExFRCkgb25IYW5kbGVVbmhhbmRsZWQoc3RhdGUpO1xuICAgICAgICBzdGF0ZS5yZWplY3Rpb24gPSBIQU5ETEVEO1xuICAgICAgfVxuICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gY2FuIHRocm93XG4gICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICBjYWxsKHRoZW4sIHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGRvbWFpbiAmJiAhZXhpdGVkKSBkb21haW4uZXhpdCgpO1xuICAgIHJlamVjdChlcnJvcik7XG4gIH1cbn07XG5cbnZhciBub3RpZnkgPSBmdW5jdGlvbiAoc3RhdGUsIGlzUmVqZWN0KSB7XG4gIGlmIChzdGF0ZS5ub3RpZmllZCkgcmV0dXJuO1xuICBzdGF0ZS5ub3RpZmllZCA9IHRydWU7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlYWN0aW9ucyA9IHN0YXRlLnJlYWN0aW9ucztcbiAgICB2YXIgcmVhY3Rpb247XG4gICAgd2hpbGUgKHJlYWN0aW9uID0gcmVhY3Rpb25zLmdldCgpKSB7XG4gICAgICBjYWxsUmVhY3Rpb24ocmVhY3Rpb24sIHN0YXRlKTtcbiAgICB9XG4gICAgc3RhdGUubm90aWZpZWQgPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXN0YXRlLnJlamVjdGlvbikgb25VbmhhbmRsZWQoc3RhdGUpO1xuICB9KTtcbn07XG5cbnZhciBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKG5hbWUsIHByb21pc2UsIHJlYXNvbikge1xuICB2YXIgZXZlbnQsIGhhbmRsZXI7XG4gIGlmIChESVNQQVRDSF9FVkVOVCkge1xuICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgZXZlbnQucmVhc29uID0gcmVhc29uO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9IGVsc2UgZXZlbnQgPSB7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcmVhc29uIH07XG4gIGlmICghTkFUSVZFX1BST01JU0VfUkVKRUNUSU9OX0VWRU5UICYmIChoYW5kbGVyID0gZ2xvYmFsWydvbicgKyBuYW1lXSkpIGhhbmRsZXIoZXZlbnQpO1xuICBlbHNlIGlmIChuYW1lID09PSBVTkhBTkRMRURfUkVKRUNUSU9OKSBob3N0UmVwb3J0RXJyb3JzKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCByZWFzb24pO1xufTtcblxudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNhbGwodGFzaywgZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBzdGF0ZS5mYWNhZGU7XG4gICAgdmFyIHZhbHVlID0gc3RhdGUudmFsdWU7XG4gICAgdmFyIElTX1VOSEFORExFRCA9IGlzVW5oYW5kbGVkKHN0YXRlKTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChJU19VTkhBTkRMRUQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgZGlzcGF0Y2hFdmVudChVTkhBTkRMRURfUkVKRUNUSU9OLCBwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBzdGF0ZS5yZWplY3Rpb24gPSBJU19OT0RFIHx8IGlzVW5oYW5kbGVkKHN0YXRlKSA/IFVOSEFORExFRCA6IEhBTkRMRUQ7XG4gICAgICBpZiAocmVzdWx0LmVycm9yKSB0aHJvdyByZXN1bHQudmFsdWU7XG4gICAgfVxuICB9KTtcbn07XG5cbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUucmVqZWN0aW9uICE9PSBIQU5ETEVEICYmICFzdGF0ZS5wYXJlbnQ7XG59O1xuXG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY2FsbCh0YXNrLCBnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoUkVKRUNUSU9OX0hBTkRMRUQsIHByb21pc2UsIHN0YXRlLnZhbHVlKTtcbiAgfSk7XG59O1xuXG52YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgc3RhdGUsIHVud3JhcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgZm4oc3RhdGUsIHZhbHVlLCB1bndyYXApO1xuICB9O1xufTtcblxudmFyIGludGVybmFsUmVqZWN0ID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgc3RhdGUuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgbm90aWZ5KHN0YXRlLCB0cnVlKTtcbn07XG5cbnZhciBpbnRlcm5hbFJlc29sdmUgPSBmdW5jdGlvbiAoc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICB0cnkge1xuICAgIGlmIChzdGF0ZS5mYWNhZGUgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICB2YXIgdGhlbiA9IGlzVGhlbmFibGUodmFsdWUpO1xuICAgIGlmICh0aGVuKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjYWxsKHRoZW4sIHZhbHVlLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlc29sdmUsIHdyYXBwZXIsIHN0YXRlKSxcbiAgICAgICAgICAgIGJpbmQoaW50ZXJuYWxSZWplY3QsIHdyYXBwZXIsIHN0YXRlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaW50ZXJuYWxSZWplY3Qod3JhcHBlciwgZXJyb3IsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICBzdGF0ZS5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICAgIG5vdGlmeShzdGF0ZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpbnRlcm5hbFJlamVjdCh7IGRvbmU6IGZhbHNlIH0sIGVycm9yLCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoRk9SQ0VEX1BST01JU0VfQ09OU1RSVUNUT1IpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUHJvbWlzZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgUHJvbWlzZVByb3RvdHlwZSk7XG4gICAgYUNhbGxhYmxlKGV4ZWN1dG9yKTtcbiAgICBjYWxsKEludGVybmFsLCB0aGlzKTtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoYmluZChpbnRlcm5hbFJlc29sdmUsIHN0YXRlKSwgYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaW50ZXJuYWxSZWplY3Qoc3RhdGUsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgUHJvbWlzZVByb3RvdHlwZSA9IFByb21pc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICB0eXBlOiBQUk9NSVNFLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBub3RpZmllZDogZmFsc2UsXG4gICAgICBwYXJlbnQ6IGZhbHNlLFxuICAgICAgcmVhY3Rpb25zOiBuZXcgUXVldWUoKSxcbiAgICAgIHJlamVjdGlvbjogZmFsc2UsXG4gICAgICBzdGF0ZTogUEVORElORyxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfTtcblxuICAvLyBgUHJvbWlzZS5wcm90b3R5cGUudGhlbmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUudGhlblxuICBJbnRlcm5hbC5wcm90b3R5cGUgPSBkZWZpbmVCdWlsdEluKFByb21pc2VQcm90b3R5cGUsICd0aGVuJywgZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUHJvbWlzZVN0YXRlKHRoaXMpO1xuICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBQcm9taXNlQ29uc3RydWN0b3IpKTtcbiAgICBzdGF0ZS5wYXJlbnQgPSB0cnVlO1xuICAgIHJlYWN0aW9uLm9rID0gaXNDYWxsYWJsZShvbkZ1bGZpbGxlZCkgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgcmVhY3Rpb24uZmFpbCA9IGlzQ2FsbGFibGUob25SZWplY3RlZCkgJiYgb25SZWplY3RlZDtcbiAgICByZWFjdGlvbi5kb21haW4gPSBJU19OT0RFID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHN0YXRlLnN0YXRlID09IFBFTkRJTkcpIHN0YXRlLnJlYWN0aW9ucy5hZGQocmVhY3Rpb24pO1xuICAgIGVsc2UgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxSZWFjdGlvbihyZWFjdGlvbiwgc3RhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICB9KTtcblxuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUHJvbWlzZVN0YXRlKHByb21pc2UpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gYmluZChpbnRlcm5hbFJlc29sdmUsIHN0YXRlKTtcbiAgICB0aGlzLnJlamVjdCA9IGJpbmQoaW50ZXJuYWxSZWplY3QsIHN0YXRlKTtcbiAgfTtcblxuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSBQcm9taXNlQ29uc3RydWN0b3IgfHwgQyA9PT0gUHJvbWlzZVdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcblxuICBpZiAoIUlTX1BVUkUgJiYgaXNDYWxsYWJsZShOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IpICYmIE5hdGl2ZVByb21pc2VQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBuYXRpdmVUaGVuID0gTmF0aXZlUHJvbWlzZVByb3RvdHlwZS50aGVuO1xuXG4gICAgaWYgKCFOQVRJVkVfUFJPTUlTRV9TVUJDTEFTU0lORykge1xuICAgICAgLy8gbWFrZSBgUHJvbWlzZSN0aGVuYCByZXR1cm4gYSBwb2x5ZmlsbGVkIGBQcm9taXNlYCBmb3IgbmF0aXZlIHByb21pc2UtYmFzZWQgQVBJc1xuICAgICAgZGVmaW5lQnVpbHRJbihOYXRpdmVQcm9taXNlUHJvdG90eXBlLCAndGhlbicsIGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgY2FsbChuYXRpdmVUaGVuLCB0aGF0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NDBcbiAgICAgIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIC8vIG1ha2UgYC5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZWAgd29yayBmb3IgbmF0aXZlIHByb21pc2UtYmFzZWQgQVBJc1xuICAgIHRyeSB7XG4gICAgICBkZWxldGUgTmF0aXZlUHJvbWlzZVByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbiAgICAvLyBtYWtlIGBpbnN0YW5jZW9mIFByb21pc2VgIHdvcmsgZm9yIG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXNcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIHNldFByb3RvdHlwZU9mKE5hdGl2ZVByb21pc2VQcm90b3R5cGUsIFByb21pc2VQcm90b3R5cGUpO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCBjb25zdHJ1Y3RvcjogdHJ1ZSwgd3JhcDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUiB9LCB7XG4gIFByb21pc2U6IFByb21pc2VDb25zdHJ1Y3RvclxufSk7XG5cbnNldFRvU3RyaW5nVGFnKFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSwgZmFsc2UsIHRydWUpO1xuc2V0U3BlY2llcyhQUk9NSVNFKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNOdWxsT3JVbmRlZmluZWQoaXQpKSByZXR1cm4gZ2V0TWV0aG9kKGl0LCBJVEVSQVRPUilcbiAgICB8fCBnZXRNZXRob2QoaXQsICdAQGl0ZXJhdG9yJylcbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCwgdXNpbmdJdGVyYXRvcikge1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGdldEl0ZXJhdG9yTWV0aG9kKGFyZ3VtZW50KSA6IHVzaW5nSXRlcmF0b3I7XG4gIGlmIChhQ2FsbGFibGUoaXRlcmF0b3JNZXRob2QpKSByZXR1cm4gYW5PYmplY3QoY2FsbChpdGVyYXRvck1ldGhvZCwgYXJndW1lbnQpKTtcbiAgdGhyb3cgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xufTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwga2luZCwgdmFsdWUpIHtcbiAgdmFyIGlubmVyUmVzdWx0LCBpbm5lckVycm9yO1xuICBhbk9iamVjdChpdGVyYXRvcik7XG4gIHRyeSB7XG4gICAgaW5uZXJSZXN1bHQgPSBnZXRNZXRob2QoaXRlcmF0b3IsICdyZXR1cm4nKTtcbiAgICBpZiAoIWlubmVyUmVzdWx0KSB7XG4gICAgICBpZiAoa2luZCA9PT0gJ3Rocm93JykgdGhyb3cgdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlubmVyUmVzdWx0ID0gY2FsbChpbm5lclJlc3VsdCwgaXRlcmF0b3IpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlubmVyRXJyb3IgPSB0cnVlO1xuICAgIGlubmVyUmVzdWx0ID0gZXJyb3I7XG4gIH1cbiAgaWYgKGtpbmQgPT09ICd0aHJvdycpIHRocm93IHZhbHVlO1xuICBpZiAoaW5uZXJFcnJvcikgdGhyb3cgaW5uZXJSZXN1bHQ7XG4gIGFuT2JqZWN0KGlubmVyUmVzdWx0KTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcbnZhciBpc0FycmF5SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3InKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgaXRlcmF0b3JDbG9zZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jbG9zZScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxudmFyIFJlc3VsdCA9IGZ1bmN0aW9uIChzdG9wcGVkLCByZXN1bHQpIHtcbiAgdGhpcy5zdG9wcGVkID0gc3RvcHBlZDtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG59O1xuXG52YXIgUmVzdWx0UHJvdG90eXBlID0gUmVzdWx0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIHVuYm91bmRGdW5jdGlvbiwgb3B0aW9ucykge1xuICB2YXIgdGhhdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aGF0O1xuICB2YXIgQVNfRU5UUklFUyA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5BU19FTlRSSUVTKTtcbiAgdmFyIElTX1JFQ09SRCA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5JU19SRUNPUkQpO1xuICB2YXIgSVNfSVRFUkFUT1IgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSVNfSVRFUkFUT1IpO1xuICB2YXIgSU5URVJSVVBURUQgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSU5URVJSVVBURUQpO1xuICB2YXIgZm4gPSBiaW5kKHVuYm91bmRGdW5jdGlvbiwgdGhhdCk7XG4gIHZhciBpdGVyYXRvciwgaXRlckZuLCBpbmRleCwgbGVuZ3RoLCByZXN1bHQsIG5leHQsIHN0ZXA7XG5cbiAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGl0ZXJhdG9yKSBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCAnbm9ybWFsJywgY29uZGl0aW9uKTtcbiAgICByZXR1cm4gbmV3IFJlc3VsdCh0cnVlLCBjb25kaXRpb24pO1xuICB9O1xuXG4gIHZhciBjYWxsRm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoQVNfRU5UUklFUykge1xuICAgICAgYW5PYmplY3QodmFsdWUpO1xuICAgICAgcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWVbMF0sIHZhbHVlWzFdLCBzdG9wKSA6IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSByZXR1cm4gSU5URVJSVVBURUQgPyBmbih2YWx1ZSwgc3RvcCkgOiBmbih2YWx1ZSk7XG4gIH07XG5cbiAgaWYgKElTX1JFQ09SRCkge1xuICAgIGl0ZXJhdG9yID0gaXRlcmFibGUuaXRlcmF0b3I7XG4gIH0gZWxzZSBpZiAoSVNfSVRFUkFUT1IpIHtcbiAgICBpdGVyYXRvciA9IGl0ZXJhYmxlO1xuICB9IGVsc2Uge1xuICAgIGl0ZXJGbiA9IGdldEl0ZXJhdG9yTWV0aG9kKGl0ZXJhYmxlKTtcbiAgICBpZiAoIWl0ZXJGbikgdGhyb3cgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhpdGVyYWJsZSkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgYXJyYXkgaXRlcmF0b3JzXG4gICAgaWYgKGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyRm4pKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoaXRlcmFibGUpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgPSBjYWxsRm4oaXRlcmFibGVbaW5kZXhdKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiBpc1Byb3RvdHlwZU9mKFJlc3VsdFByb3RvdHlwZSwgcmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0gcmV0dXJuIG5ldyBSZXN1bHQoZmFsc2UpO1xuICAgIH1cbiAgICBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKGl0ZXJhYmxlLCBpdGVyRm4pO1xuICB9XG5cbiAgbmV4dCA9IElTX1JFQ09SRCA/IGl0ZXJhYmxlLm5leHQgOiBpdGVyYXRvci5uZXh0O1xuICB3aGlsZSAoIShzdGVwID0gY2FsbChuZXh0LCBpdGVyYXRvcikpLmRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gY2FsbEZuKHN0ZXAudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCAndGhyb3cnLCBlcnJvcik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICdvYmplY3QnICYmIHJlc3VsdCAmJiBpc1Byb3RvdHlwZU9mKFJlc3VsdFByb3RvdHlwZSwgcmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWZyb20sIG5vLXRocm93LWxpdGVyYWwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCJ2YXIgTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtbmF0aXZlLWNvbnN0cnVjdG9yJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xudmFyIEZPUkNFRF9QUk9NSVNFX0NPTlNUUlVDVE9SID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtY29uc3RydWN0b3ItZGV0ZWN0aW9uJykuQ09OU1RSVUNUT1I7XG5cbm1vZHVsZS5leHBvcnRzID0gRk9SQ0VEX1BST01JU0VfQ09OU1RSVUNUT1IgfHwgIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yLmFsbChpdGVyYWJsZSkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xudmFyIFBST01JU0VfU1RBVElDU19JTkNPUlJFQ1RfSVRFUkFUSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2Utc3RhdGljcy1pbmNvcnJlY3QtaXRlcmF0aW9uJyk7XG5cbi8vIGBQcm9taXNlLmFsbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UuYWxsXG4kKHsgdGFyZ2V0OiAnUHJvbWlzZScsIHN0YXQ6IHRydWUsIGZvcmNlZDogUFJPTUlTRV9TVEFUSUNTX0lOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkcHJvbWlzZVJlc29sdmUgPSBhQ2FsbGFibGUoQy5yZXNvbHZlKTtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgaXRlcmF0ZShpdGVyYWJsZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY291bnRlcisrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgY2FsbCgkcHJvbWlzZVJlc29sdmUsIEMsIHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpLkNPTlNUUlVDVE9SO1xudmFyIE5hdGl2ZVByb21pc2VDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLW5hdGl2ZS1jb25zdHJ1Y3RvcicpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG5cbnZhciBOYXRpdmVQcm9taXNlUHJvdG90eXBlID0gTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yICYmIE5hdGl2ZVByb21pc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbi8vIGBQcm9taXNlLnByb3RvdHlwZS5jYXRjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmNhdGNoXG4kKHsgdGFyZ2V0OiAnUHJvbWlzZScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRF9QUk9NSVNFX0NPTlNUUlVDVE9SLCByZWFsOiB0cnVlIH0sIHtcbiAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gIH1cbn0pO1xuXG4vLyBtYWtlcyBzdXJlIHRoYXQgbmF0aXZlIHByb21pc2UtYmFzZWQgQVBJcyBgUHJvbWlzZSNjYXRjaGAgcHJvcGVybHkgd29ya3Mgd2l0aCBwYXRjaGVkIGBQcm9taXNlI3RoZW5gXG5pZiAoIUlTX1BVUkUgJiYgaXNDYWxsYWJsZShOYXRpdmVQcm9taXNlQ29uc3RydWN0b3IpKSB7XG4gIHZhciBtZXRob2QgPSBnZXRCdWlsdEluKCdQcm9taXNlJykucHJvdG90eXBlWydjYXRjaCddO1xuICBpZiAoTmF0aXZlUHJvbWlzZVByb3RvdHlwZVsnY2F0Y2gnXSAhPT0gbWV0aG9kKSB7XG4gICAgZGVmaW5lQnVpbHRJbihOYXRpdmVQcm9taXNlUHJvdG90eXBlLCAnY2F0Y2gnLCBtZXRob2QsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcbnZhciBQUk9NSVNFX1NUQVRJQ1NfSU5DT1JSRUNUX0lURVJBVElPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLXN0YXRpY3MtaW5jb3JyZWN0LWl0ZXJhdGlvbicpO1xuXG4vLyBgUHJvbWlzZS5yYWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yYWNlXG4kKHsgdGFyZ2V0OiAnUHJvbWlzZScsIHN0YXQ6IHRydWUsIGZvcmNlZDogUFJPTUlTRV9TVEFUSUNTX0lOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZihDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFDYWxsYWJsZShDLnJlc29sdmUpO1xuICAgICAgaXRlcmF0ZShpdGVyYWJsZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgY2FsbCgkcHJvbWlzZVJlc29sdmUsIEMsIHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgRk9SQ0VEX1BST01JU0VfQ09OU1RSVUNUT1IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKS5DT05TVFJVQ1RPUjtcblxuLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUiB9LCB7XG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYodGhpcyk7XG4gICAgY2FsbChjYXBhYmlsaXR5LnJlamVjdCwgdW5kZWZpbmVkLCByKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIE5hdGl2ZVByb21pc2VDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLW5hdGl2ZS1jb25zdHJ1Y3RvcicpO1xudmFyIEZPUkNFRF9QUk9NSVNFX0NPTlNUUlVDVE9SID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtY29uc3RydWN0b3ItZGV0ZWN0aW9uJykuQ09OU1RSVUNUT1I7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlJyk7XG5cbnZhciBQcm9taXNlQ29uc3RydWN0b3JXcmFwcGVyID0gZ2V0QnVpbHRJbignUHJvbWlzZScpO1xudmFyIENIRUNLX1dSQVBQRVIgPSBJU19QVVJFICYmICFGT1JDRURfUFJPTUlTRV9DT05TVFJVQ1RPUjtcblxuLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucmVzb2x2ZVxuJCh7IHRhcmdldDogJ1Byb21pc2UnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEX1BST01JU0VfQ09OU1RSVUNUT1IgfSwge1xuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQ0hFQ0tfV1JBUFBFUiAmJiB0aGlzID09PSBQcm9taXNlQ29uc3RydWN0b3JXcmFwcGVyID8gTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGNsYXNzb2YoYXJndW1lbnQpID09PSAnU3ltYm9sJykgdGhyb3cgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5oYXNJbmRpY2VzKSByZXN1bHQgKz0gJ2QnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC51bmljb2RlU2V0cykgcmVzdWx0ICs9ICd2JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9ICRSZWdFeHAoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9IG51bGw7XG59KTtcblxuLy8gVUMgQnJvd3NlciBidWdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMDA4XG52YXIgTUlTU0VEX1NUSUNLWSA9IFVOU1VQUE9SVEVEX1kgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISRSZWdFeHAoJ2EnLCAneScpLnN0aWNreTtcbn0pO1xuXG52YXIgQlJPS0VOX0NBUkVUID0gVU5TVVBQT1JURURfWSB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSAkUmVnRXhwKCdecicsICdneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnc3RyJykgIT0gbnVsbDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQlJPS0VOX0NBUkVUOiBCUk9LRU5fQ0FSRVQsXG4gIE1JU1NFRF9TVElDS1k6IE1JU1NFRF9TVElDS1ksXG4gIFVOU1VQUE9SVEVEX1k6IFVOU1VQUE9SVEVEX1lcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1rZXlzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydGllcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyAmJiAhVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIHByb3BzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCIvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUsIFdTSCAqL1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSB0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCdcbiAgICA/IGRvY3VtZW50LmRvbWFpbiAmJiBhY3RpdmVYRG9jdW1lbnRcbiAgICAgID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIC8vIG9sZCBJRVxuICAgICAgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKVxuICAgIDogTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpOyAvLyBXU0hcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWNyZWF0ZSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzTW9kdWxlLmYocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnLicsICdzJykgLT4gLy4vcyBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAkUmVnRXhwKCcuJywgJ3MnKTtcbiAgcmV0dXJuICEocmUuZG90QWxsICYmIHJlLmV4ZWMoJ1xcbicpICYmIHJlLmZsYWdzID09PSAncycpO1xufSk7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnKD88YT5iKScsICdnJykgLT4gLyg/PGE+YikvZyBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAkUmVnRXhwKCcoPzxhPmIpJywgJ2cnKTtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2InKS5ncm91cHMuYSAhPT0gJ2InIHx8XG4gICAgJ2InLnJlcGxhY2UocmUsICckPGE+YycpICE9PSAnYmMnO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tZW1wdHktY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAsIHJlZ2V4cC9uby1sYXp5LWVuZHMgLS0gdGVzdGluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLXVzZWxlc3MtcXVhbnRpZmllciAtLSB0ZXN0aW5nICovXG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJykuZ2V0O1xudmFyIFVOU1VQUE9SVEVEX0RPVF9BTEwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLWRvdC1hbGwnKTtcbnZhciBVTlNVUFBPUlRFRF9OQ0cgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLW5jZycpO1xuXG52YXIgbmF0aXZlUmVwbGFjZSA9IHNoYXJlZCgnbmF0aXZlLXN0cmluZy1yZXBsYWNlJywgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGluZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIGNhbGwobmF0aXZlRXhlYywgcmUxLCAnYScpO1xuICBjYWxsKG5hdGl2ZUV4ZWMsIHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5CUk9LRU5fQ0FSRVQ7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1kgfHwgVU5TVVBQT1JURURfRE9UX0FMTCB8fCBVTlNVUFBPUlRFRF9OQ0c7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyaW5nKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHJlKTtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgICB2YXIgcmF3ID0gc3RhdGUucmF3O1xuICAgIHZhciByZXN1bHQsIHJlQ29weSwgbGFzdEluZGV4LCBtYXRjaCwgaSwgb2JqZWN0LCBncm91cDtcblxuICAgIGlmIChyYXcpIHtcbiAgICAgIHJhdy5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICByZXN1bHQgPSBjYWxsKHBhdGNoZWRFeGVjLCByYXcsIHN0cik7XG4gICAgICByZS5sYXN0SW5kZXggPSByYXcubGFzdEluZGV4O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgZ3JvdXBzID0gc3RhdGUuZ3JvdXBzO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSBjYWxsKHJlZ2V4cEZsYWdzLCByZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IHJlcGxhY2UoZmxhZ3MsICd5JywgJycpO1xuICAgICAgaWYgKGluZGV4T2YoZmxhZ3MsICdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IHN0cmluZ1NsaWNlKHN0ciwgcmUubGFzdEluZGV4KTtcbiAgICAgIC8vIFN1cHBvcnQgYW5jaG9yZWQgc3RpY2t5IGJlaGF2aW9yLlxuICAgICAgaWYgKHJlLmxhc3RJbmRleCA+IDAgJiYgKCFyZS5tdWx0aWxpbmUgfHwgcmUubXVsdGlsaW5lICYmIGNoYXJBdChzdHIsIHJlLmxhc3RJbmRleCAtIDEpICE9PSAnXFxuJykpIHtcbiAgICAgICAgc291cmNlID0gJyg/OiAnICsgc291cmNlICsgJyknO1xuICAgICAgICBzdHJDb3B5ID0gJyAnICsgc3RyQ29weTtcbiAgICAgICAgY2hhcnNBZGRlZCsrO1xuICAgICAgfVxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIHN0ciBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBzb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuXG4gICAgbWF0Y2ggPSBjYWxsKG5hdGl2ZUV4ZWMsIHN0aWNreSA/IHJlQ29weSA6IHJlLCBzdHJDb3B5KTtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pbnB1dCA9IHN0cmluZ1NsaWNlKG1hdGNoLmlucHV0LCBjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBzdHJpbmdTbGljZShtYXRjaFswXSwgY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoLmluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZS5sYXN0SW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJ3Qgd29yayBmb3IgLyguPyk/L1xuICAgICAgY2FsbChuYXRpdmVSZXBsYWNlLCBtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoICYmIGdyb3Vwcykge1xuICAgICAgbWF0Y2guZ3JvdXBzID0gb2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgb2JqZWN0W2dyb3VwWzBdXSA9IG1hdGNoW2dyb3VwWzFdXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBleGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmV4ZWNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLmV4ZWNcbiQoeyB0YXJnZXQ6ICdSZWdFeHAnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAvLi8uZXhlYyAhPT0gZXhlYyB9LCB7XG4gIGV4ZWM6IGV4ZWNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjLCBGT1JDRUQsIFNIQU0pIHtcbiAgdmFyIFNZTUJPTCA9IHdlbGxLbm93blN5bWJvbChLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuXG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHJlYWwgcmVnZXggaGVyZSBzaW5jZSBpdCBjYXVzZXMgZGVvcHRpbWl6YXRpb25cbiAgICAgIC8vIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uIGluIFY4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzA2XG4gICAgICByZSA9IHt9O1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgICAgcmUuZmxhZ3MgPSAnJztcbiAgICAgIHJlW1NZTUJPTF0gPSAvLi9bU1lNQk9MXTtcbiAgICB9XG5cbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG5cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIEZPUkNFRFxuICApIHtcbiAgICB2YXIgdW5jdXJyaWVkTmF0aXZlUmVnRXhwTWV0aG9kID0gdW5jdXJyeVRoaXMoLy4vW1NZTUJPTF0pO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgdmFyIHVuY3VycmllZE5hdGl2ZU1ldGhvZCA9IHVuY3VycnlUaGlzKG5hdGl2ZU1ldGhvZCk7XG4gICAgICB2YXIgJGV4ZWMgPSByZWdleHAuZXhlYztcbiAgICAgIGlmICgkZXhlYyA9PT0gcmVnZXhwRXhlYyB8fCAkZXhlYyA9PT0gUmVnRXhwUHJvdG90eXBlLmV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuY3VycmllZE5hdGl2ZVJlZ0V4cE1ldGhvZChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5jdXJyaWVkTmF0aXZlTWV0aG9kKHN0ciwgcmVnZXhwLCBhcmcyKSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICB9KTtcblxuICAgIGRlZmluZUJ1aWx0SW4oU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBtZXRob2RzWzBdKTtcbiAgICBkZWZpbmVCdWlsdEluKFJlZ0V4cFByb3RvdHlwZSwgU1lNQk9MLCBtZXRob2RzWzFdKTtcbiAgfVxuXG4gIGlmIChTSEFNKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoUmVnRXhwUHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGNoYXJDb2RlQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQ29kZUF0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXJPckluZmluaXR5KHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gY2hhckNvZGVBdChTLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IGNoYXJDb2RlQXQoUywgcG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IGNoYXJBdChTLCBwb3NpdGlvbilcbiAgICAgICAgICA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IHN0cmluZ1NsaWNlKFMsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpXG4gICAgICAgICAgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xuXG4vLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGNoYXJBdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAoaXNDYWxsYWJsZShleGVjKSkge1xuICAgIHZhciByZXN1bHQgPSBjYWxsKGV4ZWMsIFIsIFMpO1xuICAgIGlmIChyZXN1bHQgIT09IG51bGwpIGFuT2JqZWN0KHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2xhc3NvZihSKSA9PT0gJ1JlZ0V4cCcpIHJldHVybiBjYWxsKHJlZ2V4cEV4ZWMsIFIsIFMpO1xuICB0aHJvdyAkVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG5cbi8vIEBAbWF0Y2ggbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdtYXRjaCcsIGZ1bmN0aW9uIChNQVRDSCwgbmF0aXZlTWF0Y2gsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLm1hdGNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hcbiAgICBmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBtYXRjaGVyID0gaXNOdWxsT3JVbmRlZmluZWQocmVnZXhwKSA/IHVuZGVmaW5lZCA6IGdldE1ldGhvZChyZWdleHAsIE1BVENIKTtcbiAgICAgIHJldHVybiBtYXRjaGVyID8gY2FsbChtYXRjaGVyLCByZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXSh0b1N0cmluZyhPKSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAbWF0Y2hcbiAgICBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBTID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlTWF0Y2gsIHJ4LCBTKTtcblxuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuXG4gICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKSkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gdG9TdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgQVtuXSA9IG1hdGNoU3RyO1xuICAgICAgICBpZiAobWF0Y2hTdHIgPT09ICcnKSByeC5sYXN0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgdG9MZW5ndGgocngubGFzdEluZGV4KSwgZnVsbFVuaWNvZGUpO1xuICAgICAgICBuKys7XG4gICAgICB9XG4gICAgICByZXR1cm4gbiA9PT0gMCA/IG51bGwgOiBBO1xuICAgIH1cbiAgXTtcbn0pO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCYnYF18XFxkezEsMn18PFtePl0qPikvZztcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRCA9IC9cXCQoWyQmJ2BdfFxcZHsxLDJ9KS9nO1xuXG4vLyBgR2V0U3Vic3RpdHV0aW9uYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICB2YXIgY2FwdHVyZTtcbiAgICBzd2l0Y2ggKGNoYXJBdChjaCwgMCkpIHtcbiAgICAgIGNhc2UgJyQnOiByZXR1cm4gJyQnO1xuICAgICAgY2FzZSAnJic6IHJldHVybiBtYXRjaGVkO1xuICAgICAgY2FzZSAnYCc6IHJldHVybiBzdHJpbmdTbGljZShzdHIsIDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHJpbmdTbGljZShzdHIsIHRhaWxQb3MpO1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW3N0cmluZ1NsaWNlKGNoLCAxLCAtMSldO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIFxcZFxcZD9cbiAgICAgICAgdmFyIG4gPSArY2g7XG4gICAgICAgIGlmIChuID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgIHZhciBmID0gZmxvb3IobiAvIDEwKTtcbiAgICAgICAgICBpZiAoZiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIGlmIChmIDw9IG0pIHJldHVybiBjYXB0dXJlc1tmIC0gMV0gPT09IHVuZGVmaW5lZCA/IGNoYXJBdChjaCwgMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaGFyQXQoY2gsIDEpO1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgZ2V0U3Vic3RpdHV0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24nKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIElFIDw9IDExIHJlcGxhY2VzICQwIHdpdGggdGhlIHdob2xlIG1hdGNoLCBhcyBpZiBpdCB3YXMgJCZcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjQ2NjYvZ2V0dGluZy1pZS10by1yZXBsYWNlLWEtcmVnZXgtd2l0aC10aGUtbGl0ZXJhbC1zdHJpbmctMFxudmFyIFJFUExBQ0VfS0VFUFNfJDAgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL3ByZWZlci1lc2NhcGUtcmVwbGFjZW1lbnQtZG9sbGFyLWNoYXIgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG4vLyBTYWZhcmkgPD0gMTMuMC4zKD8pIHN1YnN0aXR1dGVzIG50aCBjYXB0dXJlIHdoZXJlIG4+bSB3aXRoIGFuIGVtcHR5IHN0cmluZ1xudmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKC8uL1tSRVBMQUNFXSkge1xuICAgIHJldHVybiAvLi9bUkVQTEFDRV0oJ2EnLCAnJDAnKSA9PT0gJyc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLXVzZWxlc3MtZG9sbGFyLXJlcGxhY2VtZW50cyAtLSBmYWxzZSBwb3NpdGl2ZVxuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCBmdW5jdGlvbiAoXywgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHZhciBVTlNBRkVfU1VCU1RJVFVURSA9IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID8gJyQnIDogJyQwJztcblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBpc051bGxPclVuZGVmaW5lZChzZWFyY2hWYWx1ZSkgPyB1bmRlZmluZWQgOiBnZXRNZXRob2Qoc2VhcmNoVmFsdWUsIFJFUExBQ0UpO1xuICAgICAgcmV0dXJuIHJlcGxhY2VyXG4gICAgICAgID8gY2FsbChyZXBsYWNlciwgc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgICAgOiBjYWxsKG5hdGl2ZVJlcGxhY2UsIHRvU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAoc3RyaW5nLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiByZXBsYWNlVmFsdWUgPT0gJ3N0cmluZycgJiZcbiAgICAgICAgc3RyaW5nSW5kZXhPZihyZXBsYWNlVmFsdWUsIFVOU0FGRV9TVUJTVElUVVRFKSA9PT0gLTEgJiZcbiAgICAgICAgc3RyaW5nSW5kZXhPZihyZXBsYWNlVmFsdWUsICckPCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgcngsIFMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gaXNDYWxsYWJsZShyZXBsYWNlVmFsdWUpO1xuICAgICAgaWYgKCFmdW5jdGlvbmFsUmVwbGFjZSkgcmVwbGFjZVZhbHVlID0gdG9TdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHB1c2gocmVzdWx0cywgcmVzdWx0KTtcbiAgICAgICAgaWYgKCFnbG9iYWwpIGJyZWFrO1xuXG4gICAgICAgIHZhciBtYXRjaFN0ciA9IHRvU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IHRvU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyT3JJbmZpbml0eShyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBwdXNoKGNhcHR1cmVzLCBtYXliZVRvU3RyaW5nKHJlc3VsdFtqXSkpO1xuICAgICAgICB2YXIgbmFtZWRDYXB0dXJlcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgIGlmIChmdW5jdGlvbmFsUmVwbGFjZSkge1xuICAgICAgICAgIHZhciByZXBsYWNlckFyZ3MgPSBjb25jYXQoW21hdGNoZWRdLCBjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHB1c2gocmVwbGFjZXJBcmdzLCBuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSB0b1N0cmluZyhhcHBseShyZXBsYWNlVmFsdWUsIHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBzdHJpbmdTbGljZShTLCBuZXh0U291cmNlUG9zaXRpb24sIHBvc2l0aW9uKSArIHJlcGxhY2VtZW50O1xuICAgICAgICAgIG5leHRTb3VyY2VQb3NpdGlvbiA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1bXVsYXRlZFJlc3VsdCArIHN0cmluZ1NsaWNlKFMsIG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xufSwgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTIHx8ICFSRVBMQUNFX0tFRVBTXyQwIHx8IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFKTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBNQVRDSCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcblxuLy8gYElzUmVnRXhwYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNyZWdleHBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNsYXNzb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCJ2YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNSZWdFeHAoaXQpKSB7XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcIlRoZSBtZXRob2QgZG9lc24ndCBhY2NlcHQgcmVndWxhciBleHByZXNzaW9uc1wiKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIHZhciByZWdleHAgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbTUVUSE9EX05BTUVdKHJlZ2V4cCk7XG4gIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgIHRyeSB7XG4gICAgICByZWdleHBbTUFUQ0hdID0gZmFsc2U7XG4gICAgICByZXR1cm4gJy8uLydbTUVUSE9EX05BTUVdKHJlZ2V4cCk7XG4gICAgfSBjYXRjaCAoZXJyb3IyKSB7IC8qIGVtcHR5ICovIH1cbiAgfSByZXR1cm4gZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBub3RBUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25vdC1hLXJlZ2V4cCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgY29ycmVjdElzUmVnRXhwTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1pcy1yZWdleHAtbG9naWMnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXN0cmluZy1wcm90b3R5cGUtc3RhcnRzd2l0aCAtLSBzYWZlXG52YXIgbmF0aXZlU3RhcnRzV2l0aCA9IHVuY3VycnlUaGlzKCcnLnN0YXJ0c1dpdGgpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG52YXIgQ09SUkVDVF9JU19SRUdFWFBfTE9HSUMgPSBjb3JyZWN0SXNSZWdFeHBMb2dpYygnc3RhcnRzV2l0aCcpO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvcHVsbC83MDJcbnZhciBNRE5fUE9MWUZJTExfQlVHID0gIUlTX1BVUkUgJiYgIUNPUlJFQ1RfSVNfUkVHRVhQX0xPR0lDICYmICEhZnVuY3Rpb24gKCkge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihTdHJpbmcucHJvdG90eXBlLCAnc3RhcnRzV2l0aCcpO1xuICByZXR1cm4gZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci53cml0YWJsZTtcbn0oKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuc3RhcnRzd2l0aFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFNRE5fUE9MWUZJTExfQlVHICYmICFDT1JSRUNUX0lTX1JFR0VYUF9MT0dJQyB9LCB7XG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qICwgcG9zaXRpb24gPSAwICovKSB7XG4gICAgdmFyIHRoYXQgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICBub3RBUmVnRXhwKHNlYXJjaFN0cmluZyk7XG4gICAgdmFyIGluZGV4ID0gdG9MZW5ndGgobWluKGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCB0aGF0Lmxlbmd0aCkpO1xuICAgIHZhciBzZWFyY2ggPSB0b1N0cmluZyhzZWFyY2hTdHJpbmcpO1xuICAgIHJldHVybiBuYXRpdmVTdGFydHNXaXRoXG4gICAgICA/IG5hdGl2ZVN0YXJ0c1dpdGgodGhhdCwgc2VhcmNoLCBpbmRleClcbiAgICAgIDogc3RyaW5nU2xpY2UodGhhdCwgaW5kZXgsIGluZGV4ICsgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbiAgfVxufSk7XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSB7XG4gIGRlZmluZVByb3BlcnR5KEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3JlYXRlKG51bGwpXG4gIH0pO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCJ2YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIE9iamVjdFByb3RvdHlwZSA9ICRPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gJE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIHZhciBvYmplY3QgPSB0b09iamVjdChPKTtcbiAgaWYgKGhhc093bihvYmplY3QsIElFX1BST1RPKSkgcmV0dXJuIG9iamVjdFtJRV9QUk9UT107XG4gIHZhciBjb25zdHJ1Y3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKGlzQ2FsbGFibGUoY29uc3RydWN0b3IpICYmIG9iamVjdCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgJE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWtleXMgLS0gc2FmZSAqL1xuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9ICFpc09iamVjdChJdGVyYXRvclByb3RvdHlwZSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IHt9O1xuICAvLyBGRjQ0LSBsZWdhY3kgaXRlcmF0b3JzIGNhc2VcbiAgcmV0dXJuIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXS5jYWxsKHRlc3QpICE9PSB0ZXN0O1xufSk7XG5cbmlmIChORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuZWxzZSBpZiAoSVNfUFVSRSkgSXRlcmF0b3JQcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1AQGl0ZXJhdG9yXG5pZiAoIWlzQ2FsbGFibGUoSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdKSkge1xuICBkZWZpbmVCdWlsdEluKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCwgRU5VTUVSQUJMRV9ORVhUKSB7XG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICBJdGVyYXRvckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoKyFFTlVNRVJBQkxFX05FWFQsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEZ1bmN0aW9uTmFtZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY3JlYXRlLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIFBST1BFUl9GVU5DVElPTl9OQU1FID0gRnVuY3Rpb25OYW1lLlBST1BFUjtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IEZ1bmN0aW9uTmFtZS5DT05GSUdVUkFCTEU7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSkpIHtcbiAgICAgICAgICBkZWZpbmVCdWlsdEluKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5LnByb3RvdHlwZS57IHZhbHVlcywgQEBpdGVyYXRvciB9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoUFJPUEVSX0ZVTkNUSU9OX05BTUUgJiYgREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgaWYgKCFJU19QVVJFICYmIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsICduYW1lJywgVkFMVUVTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIGNhbGwobmF0aXZlSXRlcmF0b3IsIHRoaXMpOyB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICBkZWZpbmVCdWlsdEluKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGRlZmluZUJ1aWx0SW4oSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IsIHsgbmFtZTogREVGQVVMVCB9KTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiLy8gYENyZWF0ZUl0ZXJSZXN1bHRPYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVpdGVycmVzdWx0b2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgZG9uZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IGRvbmUgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWRlZmluZScpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChpbmRleCwgZmFsc2UpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodGFyZ2V0W2luZGV4XSwgZmFsc2UpO1xuICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBmYWxzZSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVtYXBwZWRhcmd1bWVudHNvYmplY3RcbnZhciB2YWx1ZXMgPSBJdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLy8gVjggfiBDaHJvbWUgNDUtIGJ1Z1xuaWYgKCFJU19QVVJFICYmIERFU0NSSVBUT1JTICYmIHZhbHVlcy5uYW1lICE9PSAndmFsdWVzJykgdHJ5IHtcbiAgZGVmaW5lUHJvcGVydHkodmFsdWVzLCAnbmFtZScsIHsgdmFsdWU6ICd2YWx1ZXMnIH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCIvLyBpbiBvbGQgV2ViS2l0IHZlcnNpb25zLCBgZWxlbWVudC5jbGFzc0xpc3RgIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBnbG9iYWwgYERPTVRva2VuTGlzdGBcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxudmFyIGNsYXNzTGlzdCA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnc3BhbicpLmNsYXNzTGlzdDtcbnZhciBET01Ub2tlbkxpc3RQcm90b3R5cGUgPSBjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmNvbnN0cnVjdG9yICYmIGNsYXNzTGlzdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NVG9rZW5MaXN0UHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlID8gdW5kZWZpbmVkIDogRE9NVG9rZW5MaXN0UHJvdG90eXBlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIERPTVRva2VuTGlzdFByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20tdG9rZW4tbGlzdC1wcm90b3R5cGUnKTtcbnZhciBBcnJheUl0ZXJhdG9yTWV0aG9kcyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG52YXIgaGFuZGxlUHJvdG90eXBlID0gZnVuY3Rpb24gKENvbGxlY3Rpb25Qcm90b3R5cGUsIENPTExFQ1RJT05fTkFNRSkge1xuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSkge1xuICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gQXJyYXlWYWx1ZXMpIHRyeSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgICB9XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIE1FVEhPRF9OQU1FLCBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gPSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV07XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIGhhbmRsZVByb3RvdHlwZShnbG9iYWxbQ09MTEVDVElPTl9OQU1FXSAmJiBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXS5wcm90b3R5cGUsIENPTExFQ1RJT05fTkFNRSk7XG59XG5cbmhhbmRsZVByb3RvdHlwZShET01Ub2tlbkxpc3RQcm90b3R5cGUsICdET01Ub2tlbkxpc3QnKTtcbiIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07XG4gIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmltcG9ydCB0b1ByaW1pdGl2ZSBmcm9tIFwiLi90b1ByaW1pdGl2ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwidmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgcmVkdWNlLCByZWR1Y2VSaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX1JJR0hUKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgY2FsbGJhY2tmbiwgYXJndW1lbnRzTGVuZ3RoLCBtZW1vKSB7XG4gICAgYUNhbGxhYmxlKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPID0gdG9PYmplY3QodGhhdCk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICB2YXIgaW5kZXggPSBJU19SSUdIVCA/IGxlbmd0aCAtIDEgOiAwO1xuICAgIHZhciBpID0gSVNfUklHSFQgPyAtMSA6IDE7XG4gICAgaWYgKGFyZ3VtZW50c0xlbmd0aCA8IDIpIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggKz0gaTtcbiAgICAgIGlmIChJU19SSUdIVCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgICB0aHJvdyAkVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoO0lTX1JJR0hUID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKSBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgc2VsZltpbmRleF0sIGluZGV4LCBPKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VcbiAgbGVmdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnJlZHVjZXJpZ2h0XG4gIHJpZ2h0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkcmVkdWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXJlZHVjZScpLmxlZnQ7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgQ0hST01FX1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgncmVkdWNlJyk7XG4vLyBDaHJvbWUgODAtODIgaGFzIGEgY3JpdGljYWwgYnVnXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xMDQ5OTgyXG52YXIgQ0hST01FX0JVRyA9ICFJU19OT0RFICYmIENIUk9NRV9WRVJTSU9OID4gNzkgJiYgQ0hST01FX1ZFUlNJT04gPCA4MztcblxuLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhU1RSSUNUX01FVEhPRCB8fCBDSFJPTUVfQlVHIH0sIHtcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGxlbmd0aCwgbGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBub3RBUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25vdC1hLXJlZ2V4cCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgY29ycmVjdElzUmVnRXhwTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1pcy1yZWdleHAtbG9naWMnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXN0cmluZy1wcm90b3R5cGUtZW5kc3dpdGggLS0gc2FmZVxudmFyIG5hdGl2ZUVuZHNXaXRoID0gdW5jdXJyeVRoaXMoJycuZW5kc1dpdGgpO1xudmFyIHNsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG52YXIgQ09SUkVDVF9JU19SRUdFWFBfTE9HSUMgPSBjb3JyZWN0SXNSZWdFeHBMb2dpYygnZW5kc1dpdGgnKTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL3B1bGwvNzAyXG52YXIgTUROX1BPTFlGSUxMX0JVRyA9ICFJU19QVVJFICYmICFDT1JSRUNUX0lTX1JFR0VYUF9MT0dJQyAmJiAhIWZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoU3RyaW5nLnByb3RvdHlwZSwgJ2VuZHNXaXRoJyk7XG4gIHJldHVybiBkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLndyaXRhYmxlO1xufSgpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuZW5kc3dpdGhcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhTUROX1BPTFlGSUxMX0JVRyAmJiAhQ09SUkVDVF9JU19SRUdFWFBfTE9HSUMgfSwge1xuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qICwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKSB7XG4gICAgdmFyIHRoYXQgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICBub3RBUmVnRXhwKHNlYXJjaFN0cmluZyk7XG4gICAgdmFyIGVuZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIGxlbiA9IHRoYXQubGVuZ3RoO1xuICAgIHZhciBlbmQgPSBlbmRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gbGVuIDogbWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSwgbGVuKTtcbiAgICB2YXIgc2VhcmNoID0gdG9TdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gbmF0aXZlRW5kc1dpdGhcbiAgICAgID8gbmF0aXZlRW5kc1dpdGgodGhhdCwgc2VhcmNoLCBlbmQpXG4gICAgICA6IHNsaWNlKHRoYXQsIGVuZCAtIHNlYXJjaC5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsInZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG52YXIgJEFycmF5ID0gQXJyYXk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICB2YXIgayA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuZ3RoKTtcbiAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgdmFyIHJlc3VsdCA9ICRBcnJheShtYXgoZmluIC0gaywgMCkpO1xuICBmb3IgKHZhciBuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gIHJlc3VsdC5sZW5ndGggPSBuO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2Utc2ltcGxlJyk7XG52YXIgY2FsbFJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWTtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciAkcHVzaCA9IFtdLnB1c2g7XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKC8uLy5leGVjKTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoJHB1c2gpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICAndGVzdCcuc3BsaXQoLyg/OikvLCAtMSkubGVuZ3RoICE9IDQgfHxcbiAgICAnYWInLnNwbGl0KC8oPzphYikqLykubGVuZ3RoICE9IDIgfHxcbiAgICAnLicuc3BsaXQoLyguPykoLj8pLykubGVuZ3RoICE9IDQgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWVtcHR5LWNhcHR1cmluZy1ncm91cCwgcmVnZXhwL25vLWVtcHR5LWdyb3VwIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgJy4nLnNwbGl0KC8oKSgpLykubGVuZ3RoID4gMSB8fFxuICAgICcnLnNwbGl0KC8uPy8pLmxlbmd0aFxuICApIHtcbiAgICAvLyBiYXNlZCBvbiBlczUtc2hpbSBpbXBsZW1lbnRhdGlvbiwgbmVlZCB0byByZXdvcmsgaXRcbiAgICBpbnRlcm5hbFNwbGl0ID0gZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBzdHJpbmcgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW3N0cmluZ107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYgKCFpc1JlZ0V4cChzZXBhcmF0b3IpKSB7XG4gICAgICAgIHJldHVybiBjYWxsKG5hdGl2ZVNwbGl0LCBzdHJpbmcsIHNlcGFyYXRvciwgbGltKTtcbiAgICAgIH1cbiAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgIHZhciBmbGFncyA9IChzZXBhcmF0b3IuaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnVuaWNvZGUgPyAndScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5zdGlja3kgPyAneScgOiAnJyk7XG4gICAgICB2YXIgbGFzdExhc3RJbmRleCA9IDA7XG4gICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgdmFyIHNlcGFyYXRvckNvcHkgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcbiAgICAgIHZhciBtYXRjaCwgbGFzdEluZGV4LCBsYXN0TGVuZ3RoO1xuICAgICAgd2hpbGUgKG1hdGNoID0gY2FsbChyZWdleHBFeGVjLCBzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIHB1c2gob3V0cHV0LCBzdHJpbmdTbGljZShzdHJpbmcsIGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2guaW5kZXggPCBzdHJpbmcubGVuZ3RoKSBhcHBseSgkcHVzaCwgb3V0cHV0LCBhcnJheVNsaWNlKG1hdGNoLCAxKSk7XG4gICAgICAgICAgbGFzdExlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgIGlmIChvdXRwdXQubGVuZ3RoID49IGxpbSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcGFyYXRvckNvcHkubGFzdEluZGV4ID09PSBtYXRjaC5pbmRleCkgc2VwYXJhdG9yQ29weS5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgICAgaWYgKGxhc3RMYXN0SW5kZXggPT09IHN0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIWV4ZWMoc2VwYXJhdG9yQ29weSwgJycpKSBwdXNoKG91dHB1dCwgJycpO1xuICAgICAgfSBlbHNlIHB1c2gob3V0cHV0LCBzdHJpbmdTbGljZShzdHJpbmcsIGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gYXJyYXlTbGljZShvdXRwdXQsIDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBjYWxsKG5hdGl2ZVNwbGl0LCB0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9IGVsc2UgaW50ZXJuYWxTcGxpdCA9IG5hdGl2ZVNwbGl0O1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IGlzTnVsbE9yVW5kZWZpbmVkKHNlcGFyYXRvcikgPyB1bmRlZmluZWQgOiBnZXRNZXRob2Qoc2VwYXJhdG9yLCBTUExJVCk7XG4gICAgICByZXR1cm4gc3BsaXR0ZXJcbiAgICAgICAgPyBjYWxsKHNwbGl0dGVyLCBzZXBhcmF0b3IsIE8sIGxpbWl0KVxuICAgICAgICA6IGNhbGwoaW50ZXJuYWxTcGxpdCwgdG9TdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHNwbGl0XG4gICAgLy9cbiAgICAvLyBOT1RFOiBUaGlzIGNhbm5vdCBiZSBwcm9wZXJseSBwb2x5ZmlsbGVkIGluIGVuZ2luZXMgdGhhdCBkb24ndCBzdXBwb3J0XG4gICAgLy8gdGhlICd5JyBmbGFnLlxuICAgIGZ1bmN0aW9uIChzdHJpbmcsIGxpbWl0KSB7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBTID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoaW50ZXJuYWxTcGxpdCwgcngsIFMsIGxpbWl0LCBpbnRlcm5hbFNwbGl0ICE9PSBuYXRpdmVTcGxpdCk7XG5cbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IocngsIFJlZ0V4cCk7XG5cbiAgICAgIHZhciB1bmljb2RlTWF0Y2hpbmcgPSByeC51bmljb2RlO1xuICAgICAgdmFyIGZsYWdzID0gKHJ4Lmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4Lm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoVU5TVVBQT1JURURfWSA/ICdnJyA6ICd5Jyk7XG5cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBTIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgQyhVTlNVUFBPUlRFRF9ZID8gJ14oPzonICsgcnguc291cmNlICsgJyknIDogcngsIGZsYWdzKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKFMubGVuZ3RoID09PSAwKSByZXR1cm4gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFMpID09PSBudWxsID8gW1NdIDogW107XG4gICAgICB2YXIgcCA9IDA7XG4gICAgICB2YXIgcSA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgd2hpbGUgKHEgPCBTLmxlbmd0aCkge1xuICAgICAgICBzcGxpdHRlci5sYXN0SW5kZXggPSBVTlNVUFBPUlRFRF9ZID8gMCA6IHE7XG4gICAgICAgIHZhciB6ID0gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFVOU1VQUE9SVEVEX1kgPyBzdHJpbmdTbGljZShTLCBxKSA6IFMpO1xuICAgICAgICB2YXIgZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHogPT09IG51bGwgfHxcbiAgICAgICAgICAoZSA9IG1pbih0b0xlbmd0aChzcGxpdHRlci5sYXN0SW5kZXggKyAoVU5TVVBQT1JURURfWSA/IHEgOiAwKSksIFMubGVuZ3RoKSkgPT09IHBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcSA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCBxLCB1bmljb2RlTWF0Y2hpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHB1c2goQSwgc3RyaW5nU2xpY2UoUywgcCwgcSkpO1xuICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB6Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgcHVzaChBLCB6W2ldKTtcbiAgICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHAgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwdXNoKEEsIHN0cmluZ1NsaWNlKFMsIHApKTtcbiAgICAgIHJldHVybiBBO1xuICAgIH1cbiAgXTtcbn0sICFTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMsIFVOU1VQUE9SVEVEX1kpO1xuIiwiLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyJyArXG4gICdcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gcmVwbGFjZShzdHJpbmcsIGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSByZXBsYWNlKHN0cmluZywgcnRyaW0sICcnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsInZhciBQUk9QRVJfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuUFJPUEVSO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIG5vbiA9ICdcXHUyMDBCXFx1MDA4NVxcdTE4MEUnO1xuXG4vLyBjaGVjayB0aGF0IGEgbWV0aG9kIHdvcmtzIHdpdGggdGhlIGNvcnJlY3QgbGlzdFxuLy8gb2Ygd2hpdGVzcGFjZXMgYW5kIGhhcyBhIGNvcnJlY3QgbmFtZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgcmV0dXJuIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISF3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0oKVxuICAgICAgfHwgbm9uW01FVEhPRF9OQU1FXSgpICE9PSBub25cbiAgICAgIHx8IChQUk9QRVJfRlVOQ1RJT05fTkFNRSAmJiB3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0ubmFtZSAhPT0gTUVUSE9EX05BTUUpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IGZvcmNlZFN0cmluZ1RyaW1NZXRob2QoJ3RyaW0nKSB9LCB7XG4gIHRyaW06IGZ1bmN0aW9uIHRyaW0oKSB7XG4gICAgcmV0dXJuICR0cmltKHRoaXMpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmRleG9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IHVuY3VycnlUaGlzKFtdLmluZGV4T2YpO1xuXG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhbmF0aXZlSW5kZXhPZiAmJiAxIC8gbmF0aXZlSW5kZXhPZihbMV0sIDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgdmFyIGZyb21JbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgbm90QVJlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9ub3QtYS1yZWdleHAnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGNvcnJlY3RJc1JlZ0V4cExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtaXMtcmVnZXhwLWxvZ2ljJyk7XG5cbnZhciBzdHJpbmdJbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc1xuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFjb3JyZWN0SXNSZWdFeHBMb2dpYygnaW5jbHVkZXMnKSB9LCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hTdHJpbmcgLyogLCBwb3NpdGlvbiA9IDAgKi8pIHtcbiAgICByZXR1cm4gISF+c3RyaW5nSW5kZXhPZihcbiAgICAgIHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpLFxuICAgICAgdG9TdHJpbmcobm90QVJlZ0V4cChzZWFyY2hTdHJpbmcpKSxcbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxufSk7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1pc2FycmF5IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZ3VtZW50KSB7XG4gIHJldHVybiBjbGFzc29mKGFyZ3VtZW50KSA9PSAnQXJyYXknO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcblxudmFyIG5hdGl2ZVJldmVyc2UgPSB1bmN1cnJ5VGhpcyhbXS5yZXZlcnNlKTtcbnZhciB0ZXN0ID0gWzEsIDJdO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnJldmVyc2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmV2ZXJzZVxuLy8gZml4IGZvciBTYWZhcmkgMTIuMCBidWdcbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xODg3OTRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFN0cmluZyh0ZXN0KSA9PT0gU3RyaW5nKHRlc3QucmV2ZXJzZSgpKSB9LCB7XG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtYXNzaWduIC0tIGRpcnR5IGhhY2tcbiAgICBpZiAoaXNBcnJheSh0aGlzKSkgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gbmF0aXZlUmV2ZXJzZSh0aGlzKTtcbiAgfVxufSk7XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciByZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcblxudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIpIHtcbiAgdmFyIGZsYWdzID0gUi5mbGFncztcbiAgcmV0dXJuIGZsYWdzID09PSB1bmRlZmluZWQgJiYgISgnZmxhZ3MnIGluIFJlZ0V4cFByb3RvdHlwZSkgJiYgIWhhc093bihSLCAnZmxhZ3MnKSAmJiBpc1Byb3RvdHlwZU9mKFJlZ0V4cFByb3RvdHlwZSwgUilcbiAgICA/IGNhbGwocmVnRXhwRmxhZ3MsIFIpIDogZmxhZ3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFBST1BFUl9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5QUk9QRVI7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnZXRSZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gUFJPUEVSX0ZVTkNUSU9OX05BTUUgJiYgbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKE5PVF9HRU5FUklDIHx8IElOQ09SUkVDVF9OQU1FKSB7XG4gIGRlZmluZUJ1aWx0SW4oUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgUiA9IGFuT2JqZWN0KHRoaXMpO1xuICAgIHZhciBwYXR0ZXJuID0gJHRvU3RyaW5nKFIuc291cmNlKTtcbiAgICB2YXIgZmxhZ3MgPSAkdG9TdHJpbmcoZ2V0UmVnRXhwRmxhZ3MoUikpO1xuICAgIHJldHVybiAnLycgKyBwYXR0ZXJuICsgJy8nICsgZmxhZ3M7XG4gIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXMucHJvbWlzZS5qcyc7XG5pbXBvcnQgX2FzeW5jVG9HZW5lcmF0b3IgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yJztcbmltcG9ydCAnY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5tYXRjaC5qcyc7XG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyc7XG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3RhcnRzLXdpdGguanMnO1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMnO1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyc7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkucmVkdWNlLmpzJztcbmltcG9ydCAnY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5lbmRzLXdpdGguanMnO1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnNwbGl0LmpzJztcbmltcG9ydCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnJvbSAncmFmJztcbmltcG9ydCAnY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzJztcbmltcG9ydCBSR0JDb2xvciBmcm9tICdyZ2Jjb2xvcic7XG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qcyc7XG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaW5jbHVkZXMuanMnO1xuaW1wb3J0ICdjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkucmV2ZXJzZS5qcyc7XG5pbXBvcnQgeyBTVkdQYXRoRGF0YSB9IGZyb20gJ3N2Zy1wYXRoZGF0YSc7XG5pbXBvcnQgJ2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzJztcbmltcG9ydCB7IGNhbnZhc1JHQkEgfSBmcm9tICdzdGFja2JsdXItY2FudmFzJztcblxuLyoqXHJcbiAqIE9wdGlvbnMgcHJlc2V0IGZvciBgT2Zmc2NyZWVuQ2FudmFzYC5cclxuICogQHBhcmFtIGNvbmZpZyAtIFByZXNldCByZXF1aXJlbWVudHMuXHJcbiAqIEBwYXJhbSBjb25maWcuRE9NUGFyc2VyIC0gWE1ML0hUTUwgcGFyc2VyIGZyb20gc3RyaW5nIGludG8gRE9NIERvY3VtZW50LlxyXG4gKiBAcmV0dXJucyBQcmVzZXQgb2JqZWN0LlxyXG4gKi9cbmZ1bmN0aW9uIG9mZnNjcmVlbigpIHtcbiAgdmFyIHtcbiAgICBET01QYXJzZXI6IERPTVBhcnNlckZhbGxiYWNrXG4gIH0gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICB2YXIgcHJlc2V0ID0ge1xuICAgIHdpbmRvdzogbnVsbCxcbiAgICBpZ25vcmVBbmltYXRpb246IHRydWUsXG4gICAgaWdub3JlTW91c2U6IHRydWUsXG4gICAgRE9NUGFyc2VyOiBET01QYXJzZXJGYWxsYmFjayxcblxuICAgIGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgY3JlYXRlSW1hZ2UodXJsKSB7XG4gICAgICByZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0geWllbGQgZmV0Y2godXJsKTtcbiAgICAgICAgdmFyIGJsb2IgPSB5aWVsZCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgIHZhciBpbWcgPSB5aWVsZCBjcmVhdGVJbWFnZUJpdG1hcChibG9iKTtcbiAgICAgICAgcmV0dXJuIGltZztcbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBET01QYXJzZXIgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBET01QYXJzZXJGYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHByZXNldCwgJ0RPTVBhcnNlcicpO1xuICB9XG5cbiAgcmV0dXJuIHByZXNldDtcbn1cblxuLyoqXHJcbiAqIE9wdGlvbnMgcHJlc2V0IGZvciBgbm9kZS1jYW52YXNgLlxyXG4gKiBAcGFyYW0gY29uZmlnIC0gUHJlc2V0IHJlcXVpcmVtZW50cy5cclxuICogQHBhcmFtIGNvbmZpZy5ET01QYXJzZXIgLSBYTUwvSFRNTCBwYXJzZXIgZnJvbSBzdHJpbmcgaW50byBET00gRG9jdW1lbnQuXHJcbiAqIEBwYXJhbSBjb25maWcuY2FudmFzIC0gYG5vZGUtY2FudmFzYCBleHBvcnRzLlxyXG4gKiBAcGFyYW0gY29uZmlnLmZldGNoIC0gV0hBVFdHLWNvbXBhdGlibGUgYGZldGNoYCBmdW5jdGlvbi5cclxuICogQHJldHVybnMgUHJlc2V0IG9iamVjdC5cclxuICovXG5mdW5jdGlvbiBub2RlKF9yZWYpIHtcbiAgdmFyIHtcbiAgICBET01QYXJzZXIsXG4gICAgY2FudmFzLFxuICAgIGZldGNoXG4gIH0gPSBfcmVmO1xuICByZXR1cm4ge1xuICAgIHdpbmRvdzogbnVsbCxcbiAgICBpZ25vcmVBbmltYXRpb246IHRydWUsXG4gICAgaWdub3JlTW91c2U6IHRydWUsXG4gICAgRE9NUGFyc2VyLFxuICAgIGZldGNoLFxuICAgIGNyZWF0ZUNhbnZhczogY2FudmFzLmNyZWF0ZUNhbnZhcyxcbiAgICBjcmVhdGVJbWFnZTogY2FudmFzLmxvYWRJbWFnZVxuICB9O1xufVxuXG52YXIgaW5kZXggPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG5cdF9fcHJvdG9fXzogbnVsbCxcblx0b2Zmc2NyZWVuOiBvZmZzY3JlZW4sXG5cdG5vZGU6IG5vZGVcbn0pO1xuXG4vKipcclxuICogSFRNTC1zYWZlIGNvbXByZXNzIHdoaXRlLXNwYWNlcy5cclxuICogQHBhcmFtIHN0ciAtIFN0cmluZyB0byBjb21wcmVzcy5cclxuICogQHJldHVybnMgU3RyaW5nLlxyXG4gKi9cbmZ1bmN0aW9uIGNvbXByZXNzU3BhY2VzKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyg/IVxcdTMwMDApXFxzKy9nbSwgJyAnKTtcbn1cbi8qKlxyXG4gKiBIVE1MLXNhZmUgbGVmdCB0cmltLlxyXG4gKiBAcGFyYW0gc3RyIC0gU3RyaW5nIHRvIHRyaW0uXHJcbiAqIEByZXR1cm5zIFN0cmluZy5cclxuICovXG5cbmZ1bmN0aW9uIHRyaW1MZWZ0KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15bXFxuIFxcdF0rLywgJycpO1xufVxuLyoqXHJcbiAqIEhUTUwtc2FmZSByaWdodCB0cmltLlxyXG4gKiBAcGFyYW0gc3RyIC0gU3RyaW5nIHRvIHRyaW0uXHJcbiAqIEByZXR1cm5zIFN0cmluZy5cclxuICovXG5cbmZ1bmN0aW9uIHRyaW1SaWdodChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFxuIFxcdF0rJC8sICcnKTtcbn1cbi8qKlxyXG4gKiBTdHJpbmcgdG8gbnVtYmVycyBhcnJheS5cclxuICogQHBhcmFtIHN0ciAtIE51bWJlcnMgc3RyaW5nLlxyXG4gKiBAcmV0dXJucyBOdW1iZXJzIGFycmF5LlxyXG4gKi9cblxuZnVuY3Rpb24gdG9OdW1iZXJzKHN0cikge1xuICB2YXIgbWF0Y2hlcyA9IChzdHIgfHwgJycpLm1hdGNoKC8tPyhcXGQrKD86XFwuXFxkKig/OltlRV1bKy1dP1xcZCspPyk/fFxcLlxcZCspKD89XFxEfCQpL2dtKSB8fCBbXTtcbiAgcmV0dXJuIG1hdGNoZXMubWFwKHBhcnNlRmxvYXQpO1xufSAvLyBNaWNyb3NvZnQgRWRnZSBmaXhcblxudmFyIGFsbFVwcGVyY2FzZSA9IC9eW0EtWi1dKyQvO1xuLyoqXHJcbiAqIE5vcm1hbGl6ZSBhdHRyaWJ1dGUgbmFtZS5cclxuICogQHBhcmFtIG5hbWUgLSBBdHRyaWJ1dGUgbmFtZS5cclxuICogQHJldHVybnMgTm9ybWFsaXplZCBhdHRyaWJ1dGUgbmFtZS5cclxuICovXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICBpZiAoYWxsVXBwZXJjYXNlLnRlc3QobmFtZSkpIHtcbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWU7XG59XG4vKipcclxuICogUGFyc2UgZXh0ZXJuYWwgVVJMLlxyXG4gKiBAcGFyYW0gdXJsIC0gQ1NTIHVybCBzdHJpbmcuXHJcbiAqIEByZXR1cm5zIFBhcnNlZCBVUkwuXHJcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUV4dGVybmFsVXJsKHVybCkge1xuICAvLyAgICAgICAgICAgICAgICAgICAgICBzaW5nbGUgcXVvdGVzIFsyXVxuICAvLyAgICAgICAgICAgICAgICAgICAgICB2ICAgICAgICAgZG91YmxlIHF1b3RlcyBbM11cbiAgLy8gICAgICAgICAgICAgICAgICAgICAgdiAgICAgICAgIHYgICAgICAgICBubyBxdW90ZXMgWzRdXG4gIC8vICAgICAgICAgICAgICAgICAgICAgIHYgICAgICAgICB2ICAgICAgICAgdlxuICB2YXIgdXJsTWF0Y2ggPSAvdXJsXFwoKCcoW14nXSspJ3xcIihbXlwiXSspXCJ8KFteJ1wiKV0rKSlcXCkvLmV4ZWModXJsKSB8fCBbXTtcbiAgcmV0dXJuIHVybE1hdGNoWzJdIHx8IHVybE1hdGNoWzNdIHx8IHVybE1hdGNoWzRdO1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybSBmbG9hdHMgdG8gaW50ZWdlcnMgaW4gcmdiIGNvbG9ycy5cclxuICogQHBhcmFtIGNvbG9yIC0gQ29sb3IgdG8gbm9ybWFsaXplLlxyXG4gKiBAcmV0dXJucyBOb3JtYWxpemVkIGNvbG9yLlxyXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplQ29sb3IoY29sb3IpIHtcbiAgaWYgKCFjb2xvci5zdGFydHNXaXRoKCdyZ2InKSkge1xuICAgIHJldHVybiBjb2xvcjtcbiAgfVxuXG4gIHZhciByZ2JQYXJ0cyA9IDM7XG4gIHZhciBub3JtYWxpemVkQ29sb3IgPSBjb2xvci5yZXBsYWNlKC9cXGQrKFxcLlxcZCspPy9nLCAobnVtLCBpc0Zsb2F0KSA9PiByZ2JQYXJ0cy0tICYmIGlzRmxvYXQgPyBTdHJpbmcoTWF0aC5yb3VuZChwYXJzZUZsb2F0KG51bSkpKSA6IG51bSk7XG4gIHJldHVybiBub3JtYWxpemVkQ29sb3I7XG59XG5cbi8vIHNsaWdodGx5IG1vZGlmaWVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tlZWdhbnN0cmVldC9zcGVjaWZpY2l0eS9ibG9iL21hc3Rlci9zcGVjaWZpY2l0eS5qc1xudmFyIGF0dHJpYnV0ZVJlZ2V4ID0gLyhcXFtbXlxcXV0rXFxdKS9nO1xudmFyIGlkUmVnZXggPSAvKCNbXlxccys+fi5bOl0rKS9nO1xudmFyIGNsYXNzUmVnZXggPSAvKFxcLlteXFxzKz5+Lls6XSspL2c7XG52YXIgcHNldWRvRWxlbWVudFJlZ2V4ID0gLyg6OlteXFxzKz5+Lls6XSt8OmZpcnN0LWxpbmV8OmZpcnN0LWxldHRlcnw6YmVmb3JlfDphZnRlcikvZ2k7XG52YXIgcHNldWRvQ2xhc3NXaXRoQnJhY2tldHNSZWdleCA9IC8oOltcXHctXStcXChbXildKlxcKSkvZ2k7XG52YXIgcHNldWRvQ2xhc3NSZWdleCA9IC8oOlteXFxzKz5+Lls6XSspL2c7XG52YXIgZWxlbWVudFJlZ2V4ID0gLyhbXlxccys+fi5bOl0rKS9nO1xuXG5mdW5jdGlvbiBmaW5kU2VsZWN0b3JNYXRjaChzZWxlY3RvciwgcmVnZXgpIHtcbiAgdmFyIG1hdGNoZXMgPSByZWdleC5leGVjKHNlbGVjdG9yKTtcblxuICBpZiAoIW1hdGNoZXMpIHtcbiAgICByZXR1cm4gW3NlbGVjdG9yLCAwXTtcbiAgfVxuXG4gIHJldHVybiBbc2VsZWN0b3IucmVwbGFjZShyZWdleCwgJyAnKSwgbWF0Y2hlcy5sZW5ndGhdO1xufVxuLyoqXHJcbiAqIE1lYXN1cmUgc2VsZWN0b3Igc3BlY2lmaWNpdHkuXHJcbiAqIEBwYXJhbSBzZWxlY3RvciAtIFNlbGVjdG9yIHRvIG1lYXN1cmUuXHJcbiAqIEByZXR1cm5zIFNwZWNpZmljaXR5LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRTZWxlY3RvclNwZWNpZmljaXR5KHNlbGVjdG9yKSB7XG4gIHZhciBzcGVjaWZpY2l0eSA9IFswLCAwLCAwXTtcbiAgdmFyIGN1cnJlbnRTZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoLzpub3RcXCgoW14pXSopXFwpL2csICcgICAgICQxICcpLnJlcGxhY2UoL3tbXFxzXFxTXSovZ20sICcgJyk7XG4gIHZhciBkZWx0YSA9IDA7XG4gIFtjdXJyZW50U2VsZWN0b3IsIGRlbHRhXSA9IGZpbmRTZWxlY3Rvck1hdGNoKGN1cnJlbnRTZWxlY3RvciwgYXR0cmlidXRlUmVnZXgpO1xuICBzcGVjaWZpY2l0eVsxXSArPSBkZWx0YTtcbiAgW2N1cnJlbnRTZWxlY3RvciwgZGVsdGFdID0gZmluZFNlbGVjdG9yTWF0Y2goY3VycmVudFNlbGVjdG9yLCBpZFJlZ2V4KTtcbiAgc3BlY2lmaWNpdHlbMF0gKz0gZGVsdGE7XG4gIFtjdXJyZW50U2VsZWN0b3IsIGRlbHRhXSA9IGZpbmRTZWxlY3Rvck1hdGNoKGN1cnJlbnRTZWxlY3RvciwgY2xhc3NSZWdleCk7XG4gIHNwZWNpZmljaXR5WzFdICs9IGRlbHRhO1xuICBbY3VycmVudFNlbGVjdG9yLCBkZWx0YV0gPSBmaW5kU2VsZWN0b3JNYXRjaChjdXJyZW50U2VsZWN0b3IsIHBzZXVkb0VsZW1lbnRSZWdleCk7XG4gIHNwZWNpZmljaXR5WzJdICs9IGRlbHRhO1xuICBbY3VycmVudFNlbGVjdG9yLCBkZWx0YV0gPSBmaW5kU2VsZWN0b3JNYXRjaChjdXJyZW50U2VsZWN0b3IsIHBzZXVkb0NsYXNzV2l0aEJyYWNrZXRzUmVnZXgpO1xuICBzcGVjaWZpY2l0eVsxXSArPSBkZWx0YTtcbiAgW2N1cnJlbnRTZWxlY3RvciwgZGVsdGFdID0gZmluZFNlbGVjdG9yTWF0Y2goY3VycmVudFNlbGVjdG9yLCBwc2V1ZG9DbGFzc1JlZ2V4KTtcbiAgc3BlY2lmaWNpdHlbMV0gKz0gZGVsdGE7XG4gIGN1cnJlbnRTZWxlY3RvciA9IGN1cnJlbnRTZWxlY3Rvci5yZXBsYWNlKC9bKlxccys+fl0vZywgJyAnKS5yZXBsYWNlKC9bIy5dL2csICcgJyk7XG4gIFtjdXJyZW50U2VsZWN0b3IsIGRlbHRhXSA9IGZpbmRTZWxlY3Rvck1hdGNoKGN1cnJlbnRTZWxlY3RvciwgZWxlbWVudFJlZ2V4KTsgLy8gbGd0bSBbanMvdXNlbGVzcy1hc3NpZ25tZW50LXRvLWxvY2FsXVxuXG4gIHNwZWNpZmljaXR5WzJdICs9IGRlbHRhO1xuICByZXR1cm4gc3BlY2lmaWNpdHkuam9pbignJyk7XG59XG5cbnZhciBQU0VVRE9fWkVSTyA9IC4wMDAwMDAwMTtcbi8qKlxyXG4gKiBWZWN0b3IgbWFnbml0dWRlLlxyXG4gKiBAcGFyYW0gdlxyXG4gKiBAcmV0dXJucyBOdW1iZXIgcmVzdWx0LlxyXG4gKi9cblxuZnVuY3Rpb24gdmVjdG9yTWFnbml0dWRlKHYpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh2WzBdLCAyKSArIE1hdGgucG93KHZbMV0sIDIpKTtcbn1cbi8qKlxyXG4gKiBSYXRpbyBiZXR3ZWVuIHR3byB2ZWN0b3JzLlxyXG4gKiBAcGFyYW0gdVxyXG4gKiBAcGFyYW0gdlxyXG4gKiBAcmV0dXJucyBOdW1iZXIgcmVzdWx0LlxyXG4gKi9cblxuZnVuY3Rpb24gdmVjdG9yc1JhdGlvKHUsIHYpIHtcbiAgcmV0dXJuICh1WzBdICogdlswXSArIHVbMV0gKiB2WzFdKSAvICh2ZWN0b3JNYWduaXR1ZGUodSkgKiB2ZWN0b3JNYWduaXR1ZGUodikpO1xufVxuLyoqXHJcbiAqIEFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnMuXHJcbiAqIEBwYXJhbSB1XHJcbiAqIEBwYXJhbSB2XHJcbiAqIEByZXR1cm5zIE51bWJlciByZXN1bHQuXHJcbiAqL1xuXG5mdW5jdGlvbiB2ZWN0b3JzQW5nbGUodSwgdikge1xuICByZXR1cm4gKHVbMF0gKiB2WzFdIDwgdVsxXSAqIHZbMF0gPyAtMSA6IDEpICogTWF0aC5hY29zKHZlY3RvcnNSYXRpbyh1LCB2KSk7XG59XG5mdW5jdGlvbiBDQjEodCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuZnVuY3Rpb24gQ0IyKHQpIHtcbiAgcmV0dXJuIDMgKiB0ICogdCAqICgxIC0gdCk7XG59XG5mdW5jdGlvbiBDQjModCkge1xuICByZXR1cm4gMyAqIHQgKiAoMSAtIHQpICogKDEgLSB0KTtcbn1cbmZ1bmN0aW9uIENCNCh0KSB7XG4gIHJldHVybiAoMSAtIHQpICogKDEgLSB0KSAqICgxIC0gdCk7XG59XG5mdW5jdGlvbiBRQjEodCkge1xuICByZXR1cm4gdCAqIHQ7XG59XG5mdW5jdGlvbiBRQjIodCkge1xuICByZXR1cm4gMiAqIHQgKiAoMSAtIHQpO1xufVxuZnVuY3Rpb24gUUIzKHQpIHtcbiAgcmV0dXJuICgxIC0gdCkgKiAoMSAtIHQpO1xufVxuXG5jbGFzcyBQcm9wZXJ0eSB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmlzTm9ybWFsaXplZENvbG9yID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZW1wdHkoZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAnRU1QVFknLCAnJyk7XG4gIH1cblxuICBzcGxpdCgpIHtcbiAgICB2YXIgc2VwYXJhdG9yID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnICc7XG4gICAgdmFyIHtcbiAgICAgIGRvY3VtZW50LFxuICAgICAgbmFtZVxuICAgIH0gPSB0aGlzO1xuICAgIHJldHVybiBjb21wcmVzc1NwYWNlcyh0aGlzLmdldFN0cmluZygpKS50cmltKCkuc3BsaXQoc2VwYXJhdG9yKS5tYXAodmFsdWUgPT4gbmV3IFByb3BlcnR5KGRvY3VtZW50LCBuYW1lLCB2YWx1ZSkpO1xuICB9XG5cbiAgaGFzVmFsdWUoemVyb0lzVmFsdWUpIHtcbiAgICB2YXIge1xuICAgICAgdmFsdWVcbiAgICB9ID0gdGhpcztcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnICYmICh6ZXJvSXNWYWx1ZSB8fCB2YWx1ZSAhPT0gMCkgJiYgdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgfVxuXG4gIGlzU3RyaW5nKHJlZ2V4cCkge1xuICAgIHZhciB7XG4gICAgICB2YWx1ZVxuICAgIH0gPSB0aGlzO1xuICAgIHZhciByZXN1bHQgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuXG4gICAgaWYgKCFyZXN1bHQgfHwgIXJlZ2V4cCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVnZXhwLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgaXNVcmxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3RyaW5nKC9edXJsXFwoLyk7XG4gIH1cblxuICBpc1BpeGVscygpIHtcbiAgICBpZiAoIXRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBhc1N0cmluZyA9IHRoaXMuZ2V0U3RyaW5nKCk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgYXNTdHJpbmcuZW5kc1dpdGgoJ3B4Jyk6XG4gICAgICBjYXNlIC9eWzAtOV0rJC8udGVzdChhc1N0cmluZyk6XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRWYWx1ZShkZWYpIHtcbiAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbiAgZ2V0TnVtYmVyKGRlZikge1xuICAgIGlmICghdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGRlZik7XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIHZhbHVlXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLmlzU3RyaW5nKC8lJC8pKSB7XG4gICAgICBuIC89IDEwMC4wO1xuICAgIH1cblxuICAgIHJldHVybiBuO1xuICB9XG5cbiAgZ2V0U3RyaW5nKGRlZikge1xuICAgIGlmICh0eXBlb2YgZGVmID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nKGRlZik7XG4gIH1cblxuICBnZXRDb2xvcihkZWYpIHtcbiAgICB2YXIgY29sb3IgPSB0aGlzLmdldFN0cmluZyhkZWYpO1xuXG4gICAgaWYgKHRoaXMuaXNOb3JtYWxpemVkQ29sb3IpIHtcbiAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbiAgICB0aGlzLmlzTm9ybWFsaXplZENvbG9yID0gdHJ1ZTtcbiAgICBjb2xvciA9IG5vcm1hbGl6ZUNvbG9yKGNvbG9yKTtcbiAgICB0aGlzLnZhbHVlID0gY29sb3I7XG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG5cbiAgZ2V0RHBpKCkge1xuICAgIHJldHVybiA5Ni4wOyAvLyBUT0RPOiBjb21wdXRlP1xuICB9XG5cbiAgZ2V0UmVtKCkge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LnJvb3RFbVNpemU7XG4gIH1cblxuICBnZXRFbSgpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5lbVNpemU7XG4gIH1cblxuICBnZXRVbml0cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTdHJpbmcoKS5yZXBsYWNlKC9bMC05Li1dL2csICcnKTtcbiAgfVxuXG4gIGdldFBpeGVscyhheGlzT3JJc0ZvbnRTaXplKSB7XG4gICAgdmFyIHByb2Nlc3NQZXJjZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgIGlmICghdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgW2F4aXMsIGlzRm9udFNpemVdID0gdHlwZW9mIGF4aXNPcklzRm9udFNpemUgPT09ICdib29sZWFuJyA/IFt1bmRlZmluZWQsIGF4aXNPcklzRm9udFNpemVdIDogW2F4aXNPcklzRm9udFNpemVdO1xuICAgIHZhciB7XG4gICAgICB2aWV3UG9ydFxuICAgIH0gPSB0aGlzLmRvY3VtZW50LnNjcmVlbjtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC92bWluJC8pOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROdW1iZXIoKSAvIDEwMC4wICogTWF0aC5taW4odmlld1BvcnQuY29tcHV0ZVNpemUoJ3gnKSwgdmlld1BvcnQuY29tcHV0ZVNpemUoJ3knKSk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvdm1heCQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgLyAxMDAuMCAqIE1hdGgubWF4KHZpZXdQb3J0LmNvbXB1dGVTaXplKCd4JyksIHZpZXdQb3J0LmNvbXB1dGVTaXplKCd5JykpO1xuXG4gICAgICBjYXNlIHRoaXMuaXNTdHJpbmcoL3Z3JC8pOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROdW1iZXIoKSAvIDEwMC4wICogdmlld1BvcnQuY29tcHV0ZVNpemUoJ3gnKTtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC92aCQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgLyAxMDAuMCAqIHZpZXdQb3J0LmNvbXB1dGVTaXplKCd5Jyk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvcmVtJC8pOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROdW1iZXIoKSAqIHRoaXMuZ2V0UmVtKCk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvZW0kLyk6XG4gICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpICogdGhpcy5nZXRFbSgpO1xuXG4gICAgICBjYXNlIHRoaXMuaXNTdHJpbmcoL2V4JC8pOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROdW1iZXIoKSAqIHRoaXMuZ2V0RW0oKSAvIDIuMDtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9weCQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvcHQkLyk6XG4gICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpICogdGhpcy5nZXREcGkoKSAqICgxLjAgLyA3Mi4wKTtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9wYyQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiAxNTtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9jbSQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiB0aGlzLmdldERwaSgpIC8gMi41NDtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9tbSQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiB0aGlzLmdldERwaSgpIC8gMjUuNDtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9pbiQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiB0aGlzLmdldERwaSgpO1xuXG4gICAgICBjYXNlIHRoaXMuaXNTdHJpbmcoLyUkLykgJiYgaXNGb250U2l6ZTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiB0aGlzLmdldEVtKCk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvJSQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiB2aWV3UG9ydC5jb21wdXRlU2l6ZShheGlzKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBuID0gdGhpcy5nZXROdW1iZXIoKTtcblxuICAgICAgICAgIGlmIChwcm9jZXNzUGVyY2VudCAmJiBuIDwgMS4wKSB7XG4gICAgICAgICAgICByZXR1cm4gbiAqIHZpZXdQb3J0LmNvbXB1dGVTaXplKGF4aXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0TWlsbGlzZWNvbmRzKCkge1xuICAgIGlmICghdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1N0cmluZygvbXMkLykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpICogMTAwMDtcbiAgfVxuXG4gIGdldFJhZGlhbnMoKSB7XG4gICAgaWYgKCF0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9kZWckLyk6XG4gICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpICogKE1hdGguUEkgLyAxODAuMCk7XG5cbiAgICAgIGNhc2UgdGhpcy5pc1N0cmluZygvZ3JhZCQvKTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TnVtYmVyKCkgKiAoTWF0aC5QSSAvIDIwMC4wKTtcblxuICAgICAgY2FzZSB0aGlzLmlzU3RyaW5nKC9yYWQkLyk6XG4gICAgICAgIHJldHVybiB0aGlzLmdldE51bWJlcigpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROdW1iZXIoKSAqIChNYXRoLlBJIC8gMTgwLjApO1xuICAgIH1cbiAgfVxuXG4gIGdldERlZmluaXRpb24oKSB7XG4gICAgdmFyIGFzU3RyaW5nID0gdGhpcy5nZXRTdHJpbmcoKTtcbiAgICB2YXIgbmFtZSA9IC8jKFteKSdcIl0rKS8uZXhlYyhhc1N0cmluZyk7XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgbmFtZSA9IG5hbWVbMV07XG4gICAgfVxuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gYXNTdHJpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuZGVmaW5pdGlvbnNbbmFtZV07XG4gIH1cblxuICBnZXRGaWxsU3R5bGVEZWZpbml0aW9uKGVsZW1lbnQsIG9wYWNpdHkpIHtcbiAgICB2YXIgZGVmID0gdGhpcy5nZXREZWZpbml0aW9uKCk7XG5cbiAgICBpZiAoIWRlZikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAvLyBncmFkaWVudFxuXG5cbiAgICBpZiAodHlwZW9mIGRlZi5jcmVhdGVHcmFkaWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGRlZi5jcmVhdGVHcmFkaWVudCh0aGlzLmRvY3VtZW50LmN0eCwgZWxlbWVudCwgb3BhY2l0eSk7XG4gICAgfSAvLyBwYXR0ZXJuXG5cblxuICAgIGlmICh0eXBlb2YgZGVmLmNyZWF0ZVBhdHRlcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkZWYuZ2V0SHJlZkF0dHJpYnV0ZSgpLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5UcmFuc2Zvcm0gPSBkZWYuZ2V0QXR0cmlidXRlKCdwYXR0ZXJuVHJhbnNmb3JtJyk7XG4gICAgICAgIGRlZiA9IGRlZi5nZXRIcmVmQXR0cmlidXRlKCkuZ2V0RGVmaW5pdGlvbigpO1xuXG4gICAgICAgIGlmIChwYXR0ZXJuVHJhbnNmb3JtLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICBkZWYuZ2V0QXR0cmlidXRlKCdwYXR0ZXJuVHJhbnNmb3JtJywgdHJ1ZSkuc2V0VmFsdWUocGF0dGVyblRyYW5zZm9ybS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZi5jcmVhdGVQYXR0ZXJuKHRoaXMuZG9jdW1lbnQuY3R4LCBlbGVtZW50LCBvcGFjaXR5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFRleHRCYXNlbGluZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb3BlcnR5LnRleHRCYXNlbGluZU1hcHBpbmdbdGhpcy5nZXRTdHJpbmcoKV07XG4gIH1cblxuICBhZGRPcGFjaXR5KG9wYWNpdHkpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldENvbG9yKCk7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICB2YXIgY29tbWFzID0gMDsgLy8gU2ltdWxhdGUgb2xkIFJHQkNvbG9yIHZlcnNpb24sIHdoaWNoIGNhbid0IHBhcnNlIHJnYmEuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVbaV0gPT09ICcsJykge1xuICAgICAgICBjb21tYXMrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbW1hcyA9PT0gMykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3BhY2l0eS5oYXNWYWx1ZSgpICYmIHRoaXMuaXNTdHJpbmcoKSAmJiBjb21tYXMgIT09IDMpIHtcbiAgICAgIHZhciBjb2xvciA9IG5ldyBSR0JDb2xvcih2YWx1ZSk7XG5cbiAgICAgIGlmIChjb2xvci5vaykge1xuICAgICAgICBjb2xvci5hbHBoYSA9IG9wYWNpdHkuZ2V0TnVtYmVyKCk7XG4gICAgICAgIHZhbHVlID0gY29sb3IudG9SR0JBKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCB0aGlzLm5hbWUsIHZhbHVlKTtcbiAgfVxuXG59XG5Qcm9wZXJ0eS50ZXh0QmFzZWxpbmVNYXBwaW5nID0ge1xuICAnYmFzZWxpbmUnOiAnYWxwaGFiZXRpYycsXG4gICdiZWZvcmUtZWRnZSc6ICd0b3AnLFxuICAndGV4dC1iZWZvcmUtZWRnZSc6ICd0b3AnLFxuICAnbWlkZGxlJzogJ21pZGRsZScsXG4gICdjZW50cmFsJzogJ21pZGRsZScsXG4gICdhZnRlci1lZGdlJzogJ2JvdHRvbScsXG4gICd0ZXh0LWFmdGVyLWVkZ2UnOiAnYm90dG9tJyxcbiAgJ2lkZW9ncmFwaGljJzogJ2lkZW9ncmFwaGljJyxcbiAgJ2FscGhhYmV0aWMnOiAnYWxwaGFiZXRpYycsXG4gICdoYW5naW5nJzogJ2hhbmdpbmcnLFxuICAnbWF0aGVtYXRpY2FsJzogJ2FscGhhYmV0aWMnXG59O1xuXG5jbGFzcyBWaWV3UG9ydCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmlld1BvcnRzID0gW107XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnZpZXdQb3J0cyA9IFtdO1xuICB9XG5cbiAgc2V0Q3VycmVudCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy52aWV3UG9ydHMucHVzaCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ3VycmVudCgpIHtcbiAgICB0aGlzLnZpZXdQb3J0cy5wb3AoKTtcbiAgfVxuXG4gIGdldEN1cnJlbnQoKSB7XG4gICAgdmFyIHtcbiAgICAgIHZpZXdQb3J0c1xuICAgIH0gPSB0aGlzO1xuICAgIHJldHVybiB2aWV3UG9ydHNbdmlld1BvcnRzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgZ2V0IHdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnQoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudCgpLmhlaWdodDtcbiAgfVxuXG4gIGNvbXB1dGVTaXplKGQpIHtcbiAgICBpZiAodHlwZW9mIGQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG5cbiAgICBpZiAoZCA9PT0gJ3gnKSB7XG4gICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAoZCA9PT0gJ3knKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuaGVpZ2h0LCAyKSkgLyBNYXRoLnNxcnQoMik7XG4gIH1cblxufVxuXG5jbGFzcyBQb2ludCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2UocG9pbnQpIHtcbiAgICB2YXIgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgIHZhciBbeCA9IGRlZmF1bHRWYWx1ZSwgeSA9IGRlZmF1bHRWYWx1ZV0gPSB0b051bWJlcnMocG9pbnQpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VTY2FsZShzY2FsZSkge1xuICAgIHZhciBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDE7XG4gICAgdmFyIFt4ID0gZGVmYXVsdFZhbHVlLCB5ID0geF0gPSB0b051bWJlcnMoc2NhbGUpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VQYXRoKHBhdGgpIHtcbiAgICB2YXIgcG9pbnRzID0gdG9OdW1iZXJzKHBhdGgpO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIHZhciBwYXRoUG9pbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICBwYXRoUG9pbnRzLnB1c2gobmV3IFBvaW50KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoUG9pbnRzO1xuICB9XG5cbiAgYW5nbGVUbyhwb2ludCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHBvaW50LnkgLSB0aGlzLnksIHBvaW50LnggLSB0aGlzLngpO1xuICB9XG5cbiAgYXBwbHlUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHhwID0geCAqIHRyYW5zZm9ybVswXSArIHkgKiB0cmFuc2Zvcm1bMl0gKyB0cmFuc2Zvcm1bNF07XG4gICAgdmFyIHlwID0geCAqIHRyYW5zZm9ybVsxXSArIHkgKiB0cmFuc2Zvcm1bM10gKyB0cmFuc2Zvcm1bNV07XG4gICAgdGhpcy54ID0geHA7XG4gICAgdGhpcy55ID0geXA7XG4gIH1cblxufVxuXG5jbGFzcyBNb3VzZSB7XG4gIGNvbnN0cnVjdG9yKHNjcmVlbikge1xuICAgIHRoaXMuc2NyZWVuID0gc2NyZWVuO1xuICAgIHRoaXMud29ya2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZXZlbnRzID0gW107XG4gICAgdGhpcy5ldmVudEVsZW1lbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcblxuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG5cbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaXNXb3JraW5nKCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmc7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAodGhpcy53b3JraW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIHNjcmVlbixcbiAgICAgIG9uQ2xpY2ssXG4gICAgICBvbk1vdXNlTW92ZVxuICAgIH0gPSB0aGlzO1xuICAgIHZhciBjYW52YXMgPSBzY3JlZW4uY3R4LmNhbnZhcztcbiAgICBjYW52YXMub25jbGljayA9IG9uQ2xpY2s7XG4gICAgY2FudmFzLm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmU7XG4gICAgdGhpcy53b3JraW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKCF0aGlzLndvcmtpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2FudmFzID0gdGhpcy5zY3JlZW4uY3R4LmNhbnZhcztcbiAgICB0aGlzLndvcmtpbmcgPSBmYWxzZTtcbiAgICBjYW52YXMub25jbGljayA9IG51bGw7XG4gICAgY2FudmFzLm9ubW91c2Vtb3ZlID0gbnVsbDtcbiAgfVxuXG4gIGhhc0V2ZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy53b3JraW5nICYmIHRoaXMuZXZlbnRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBydW5FdmVudHMoKSB7XG4gICAgaWYgKCF0aGlzLndvcmtpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIge1xuICAgICAgc2NyZWVuOiBkb2N1bWVudCxcbiAgICAgIGV2ZW50cyxcbiAgICAgIGV2ZW50RWxlbWVudHNcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgc3R5bGVcbiAgICB9ID0gZG9jdW1lbnQuY3R4LmNhbnZhcztcblxuICAgIGlmIChzdHlsZSkge1xuICAgICAgc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgfVxuXG4gICAgZXZlbnRzLmZvckVhY2goKF9yZWYsIGkpID0+IHtcbiAgICAgIHZhciB7XG4gICAgICAgIHJ1blxuICAgICAgfSA9IF9yZWY7XG4gICAgICB2YXIgZWxlbWVudCA9IGV2ZW50RWxlbWVudHNbaV07XG5cbiAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgIHJ1bihlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50O1xuICAgICAgfVxuICAgIH0pOyAvLyBkb25lIHJ1bm5pbmcsIGNsZWFyXG5cbiAgICB0aGlzLmV2ZW50cyA9IFtdO1xuICAgIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgY2hlY2tQYXRoKGVsZW1lbnQsIGN0eCkge1xuICAgIGlmICghdGhpcy53b3JraW5nIHx8ICFjdHgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIge1xuICAgICAgZXZlbnRzLFxuICAgICAgZXZlbnRFbGVtZW50c1xuICAgIH0gPSB0aGlzO1xuICAgIGV2ZW50cy5mb3JFYWNoKChfcmVmMiwgaSkgPT4ge1xuICAgICAgdmFyIHtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfSA9IF9yZWYyO1xuXG4gICAgICBpZiAoIWV2ZW50RWxlbWVudHNbaV0gJiYgY3R4LmlzUG9pbnRJblBhdGggJiYgY3R4LmlzUG9pbnRJblBhdGgoeCwgeSkpIHtcbiAgICAgICAgZXZlbnRFbGVtZW50c1tpXSA9IGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja0JvdW5kaW5nQm94KGVsZW1lbnQsIGJvdW5kaW5nQm94KSB7XG4gICAgaWYgKCF0aGlzLndvcmtpbmcgfHwgIWJvdW5kaW5nQm94KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIGV2ZW50cyxcbiAgICAgIGV2ZW50RWxlbWVudHNcbiAgICB9ID0gdGhpcztcbiAgICBldmVudHMuZm9yRWFjaCgoX3JlZjMsIGkpID0+IHtcbiAgICAgIHZhciB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0gPSBfcmVmMztcblxuICAgICAgaWYgKCFldmVudEVsZW1lbnRzW2ldICYmIGJvdW5kaW5nQm94LmlzUG9pbnRJbkJveCh4LCB5KSkge1xuICAgICAgICBldmVudEVsZW1lbnRzW2ldID0gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcFhZKHgsIHkpIHtcbiAgICB2YXIge1xuICAgICAgd2luZG93LFxuICAgICAgY3R4XG4gICAgfSA9IHRoaXMuc2NyZWVuO1xuICAgIHZhciBwb2ludCA9IG5ldyBQb2ludCh4LCB5KTtcbiAgICB2YXIgZWxlbWVudCA9IGN0eC5jYW52YXM7XG5cbiAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgcG9pbnQueCAtPSBlbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICBwb2ludC55IC09IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuc2Nyb2xsWCkge1xuICAgICAgcG9pbnQueCArPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LnNjcm9sbFkpIHtcbiAgICAgIHBvaW50LnkgKz0gd2luZG93LnNjcm9sbFk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50O1xuICB9XG5cbiAgb25DbGljayhldmVudCkge1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSB0aGlzLm1hcFhZKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIHRoaXMuZXZlbnRzLnB1c2goe1xuICAgICAgdHlwZTogJ29uY2xpY2snLFxuICAgICAgeCxcbiAgICAgIHksXG5cbiAgICAgIHJ1bihldmVudFRhcmdldCkge1xuICAgICAgICBpZiAoZXZlbnRUYXJnZXQub25DbGljaykge1xuICAgICAgICAgIGV2ZW50VGFyZ2V0Lm9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSB0aGlzLm1hcFhZKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIHRoaXMuZXZlbnRzLnB1c2goe1xuICAgICAgdHlwZTogJ29ubW91c2Vtb3ZlJyxcbiAgICAgIHgsXG4gICAgICB5LFxuXG4gICAgICBydW4oZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgaWYgKGV2ZW50VGFyZ2V0Lm9uTW91c2VNb3ZlKSB7XG4gICAgICAgICAgZXZlbnRUYXJnZXQub25Nb3VzZU1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxufVxuXG52YXIgZGVmYXVsdFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbDtcbnZhciBkZWZhdWx0RmV0Y2gkMSA9IHR5cGVvZiBmZXRjaCAhPT0gJ3VuZGVmaW5lZCcgPyBmZXRjaC5iaW5kKHVuZGVmaW5lZCkgLy8gYGZldGNoYCBkZXBlbmRzIG9uIGNvbnRleHQ6IGBzb21lT2JqZWN0LmZldGNoKC4uLilgIHdpbGwgdGhyb3cgZXJyb3IuXG46IG51bGw7XG5jbGFzcyBTY3JlZW4ge1xuICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICB2YXIge1xuICAgICAgZmV0Y2ggPSBkZWZhdWx0RmV0Y2gkMSxcbiAgICAgIHdpbmRvdyA9IGRlZmF1bHRXaW5kb3dcbiAgICB9ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLkZSQU1FUkFURSA9IDMwO1xuICAgIHRoaXMuTUFYX1ZJUlRVQUxfUElYRUxTID0gMzAwMDA7XG4gICAgdGhpcy5DTElFTlRfV0lEVEggPSA4MDA7XG4gICAgdGhpcy5DTElFTlRfSEVJR0hUID0gNjAwO1xuICAgIHRoaXMudmlld1BvcnQgPSBuZXcgVmlld1BvcnQoKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlKHRoaXMpO1xuICAgIHRoaXMuYW5pbWF0aW9ucyA9IFtdO1xuICAgIHRoaXMud2FpdHMgPSBbXTtcbiAgICB0aGlzLmZyYW1lRHVyYXRpb24gPSAwO1xuICAgIHRoaXMuaXNSZWFkeUxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzRmlyc3RSZW5kZXIgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XG4gICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICB9XG5cbiAgd2FpdChjaGVja2VyKSB7XG4gICAgdGhpcy53YWl0cy5wdXNoKGNoZWNrZXIpO1xuICB9XG5cbiAgcmVhZHkoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXG4gICAgaWYgKCF0aGlzLnJlYWR5UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlYWR5UHJvbWlzZTtcbiAgfVxuXG4gIGlzUmVhZHkoKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeUxvY2spIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBpc1JlYWR5TG9jayA9IHRoaXMud2FpdHMuZXZlcnkoXyA9PiBfKCkpO1xuXG4gICAgaWYgKGlzUmVhZHlMb2NrKSB7XG4gICAgICB0aGlzLndhaXRzID0gW107XG5cbiAgICAgIGlmICh0aGlzLnJlc29sdmVSZWFkeSkge1xuICAgICAgICB0aGlzLnJlc29sdmVSZWFkeSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNSZWFkeUxvY2sgPSBpc1JlYWR5TG9jaztcbiAgICByZXR1cm4gaXNSZWFkeUxvY2s7XG4gIH1cblxuICBzZXREZWZhdWx0cyhjdHgpIHtcbiAgICAvLyBpbml0aWFsIHZhbHVlcyBhbmQgZGVmYXVsdHNcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgwLDAsMCwwKSc7XG4gICAgY3R4LmxpbmVDYXAgPSAnYnV0dCc7XG4gICAgY3R4LmxpbmVKb2luID0gJ21pdGVyJztcbiAgICBjdHgubWl0ZXJMaW1pdCA9IDQ7XG4gIH1cblxuICBzZXRWaWV3Qm94KF9yZWYpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnQsXG4gICAgICBjdHgsXG4gICAgICBhc3BlY3RSYXRpbyxcbiAgICAgIHdpZHRoLFxuICAgICAgZGVzaXJlZFdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgZGVzaXJlZEhlaWdodCxcbiAgICAgIG1pblggPSAwLFxuICAgICAgbWluWSA9IDAsXG4gICAgICByZWZYLFxuICAgICAgcmVmWSxcbiAgICAgIGNsaXAgPSBmYWxzZSxcbiAgICAgIGNsaXBYID0gMCxcbiAgICAgIGNsaXBZID0gMFxuICAgIH0gPSBfcmVmO1xuICAgIC8vIGFzcGVjdCByYXRpbyAtIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9jb29yZHMuaHRtbCNQcmVzZXJ2ZUFzcGVjdFJhdGlvQXR0cmlidXRlXG4gICAgdmFyIGNsZWFuQXNwZWN0UmF0aW8gPSBjb21wcmVzc1NwYWNlcyhhc3BlY3RSYXRpbykucmVwbGFjZSgvXmRlZmVyXFxzLywgJycpOyAvLyBpZ25vcmUgZGVmZXJcblxuICAgIHZhciBbYXNwZWN0UmF0aW9BbGlnbiwgYXNwZWN0UmF0aW9NZWV0T3JTbGljZV0gPSBjbGVhbkFzcGVjdFJhdGlvLnNwbGl0KCcgJyk7XG4gICAgdmFyIGFsaWduID0gYXNwZWN0UmF0aW9BbGlnbiB8fCAneE1pZFlNaWQnO1xuICAgIHZhciBtZWV0T3JTbGljZSA9IGFzcGVjdFJhdGlvTWVldE9yU2xpY2UgfHwgJ21lZXQnOyAvLyBjYWxjdWxhdGUgc2NhbGVcblxuICAgIHZhciBzY2FsZVggPSB3aWR0aCAvIGRlc2lyZWRXaWR0aDtcbiAgICB2YXIgc2NhbGVZID0gaGVpZ2h0IC8gZGVzaXJlZEhlaWdodDtcbiAgICB2YXIgc2NhbGVNaW4gPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG4gICAgdmFyIHNjYWxlTWF4ID0gTWF0aC5tYXgoc2NhbGVYLCBzY2FsZVkpO1xuICAgIHZhciBmaW5hbERlc2lyZWRXaWR0aCA9IGRlc2lyZWRXaWR0aDtcbiAgICB2YXIgZmluYWxEZXNpcmVkSGVpZ2h0ID0gZGVzaXJlZEhlaWdodDtcblxuICAgIGlmIChtZWV0T3JTbGljZSA9PT0gJ21lZXQnKSB7XG4gICAgICBmaW5hbERlc2lyZWRXaWR0aCAqPSBzY2FsZU1pbjtcbiAgICAgIGZpbmFsRGVzaXJlZEhlaWdodCAqPSBzY2FsZU1pbjtcbiAgICB9XG5cbiAgICBpZiAobWVldE9yU2xpY2UgPT09ICdzbGljZScpIHtcbiAgICAgIGZpbmFsRGVzaXJlZFdpZHRoICo9IHNjYWxlTWF4O1xuICAgICAgZmluYWxEZXNpcmVkSGVpZ2h0ICo9IHNjYWxlTWF4O1xuICAgIH1cblxuICAgIHZhciByZWZYUHJvcCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3JlZlgnLCByZWZYKTtcbiAgICB2YXIgcmVmWVByb3AgPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICdyZWZZJywgcmVmWSk7XG4gICAgdmFyIGhhc1JlZnMgPSByZWZYUHJvcC5oYXNWYWx1ZSgpICYmIHJlZllQcm9wLmhhc1ZhbHVlKCk7XG5cbiAgICBpZiAoaGFzUmVmcykge1xuICAgICAgY3R4LnRyYW5zbGF0ZSgtc2NhbGVNaW4gKiByZWZYUHJvcC5nZXRQaXhlbHMoJ3gnKSwgLXNjYWxlTWluICogcmVmWVByb3AuZ2V0UGl4ZWxzKCd5JykpO1xuICAgIH1cblxuICAgIGlmIChjbGlwKSB7XG4gICAgICB2YXIgc2NhbGVkQ2xpcFggPSBzY2FsZU1pbiAqIGNsaXBYO1xuICAgICAgdmFyIHNjYWxlZENsaXBZID0gc2NhbGVNaW4gKiBjbGlwWTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oc2NhbGVkQ2xpcFgsIHNjYWxlZENsaXBZKTtcbiAgICAgIGN0eC5saW5lVG8od2lkdGgsIHNjYWxlZENsaXBZKTtcbiAgICAgIGN0eC5saW5lVG8od2lkdGgsIGhlaWdodCk7XG4gICAgICBjdHgubGluZVRvKHNjYWxlZENsaXBYLCBoZWlnaHQpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmNsaXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIWhhc1JlZnMpIHtcbiAgICAgIHZhciBpc01lZXRNaW5ZID0gbWVldE9yU2xpY2UgPT09ICdtZWV0JyAmJiBzY2FsZU1pbiA9PT0gc2NhbGVZO1xuICAgICAgdmFyIGlzU2xpY2VNYXhZID0gbWVldE9yU2xpY2UgPT09ICdzbGljZScgJiYgc2NhbGVNYXggPT09IHNjYWxlWTtcbiAgICAgIHZhciBpc01lZXRNaW5YID0gbWVldE9yU2xpY2UgPT09ICdtZWV0JyAmJiBzY2FsZU1pbiA9PT0gc2NhbGVYO1xuICAgICAgdmFyIGlzU2xpY2VNYXhYID0gbWVldE9yU2xpY2UgPT09ICdzbGljZScgJiYgc2NhbGVNYXggPT09IHNjYWxlWDtcblxuICAgICAgaWYgKGFsaWduLnN0YXJ0c1dpdGgoJ3hNaWQnKSAmJiAoaXNNZWV0TWluWSB8fCBpc1NsaWNlTWF4WSkpIHtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh3aWR0aCAvIDIuMCAtIGZpbmFsRGVzaXJlZFdpZHRoIC8gMi4wLCAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsaWduLmVuZHNXaXRoKCdZTWlkJykgJiYgKGlzTWVldE1pblggfHwgaXNTbGljZU1heFgpKSB7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoMCwgaGVpZ2h0IC8gMi4wIC0gZmluYWxEZXNpcmVkSGVpZ2h0IC8gMi4wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsaWduLnN0YXJ0c1dpdGgoJ3hNYXgnKSAmJiAoaXNNZWV0TWluWSB8fCBpc1NsaWNlTWF4WSkpIHtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh3aWR0aCAtIGZpbmFsRGVzaXJlZFdpZHRoLCAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsaWduLmVuZHNXaXRoKCdZTWF4JykgJiYgKGlzTWVldE1pblggfHwgaXNTbGljZU1heFgpKSB7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoMCwgaGVpZ2h0IC0gZmluYWxEZXNpcmVkSGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9IC8vIHNjYWxlXG5cblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBhbGlnbiA9PT0gJ25vbmUnOlxuICAgICAgICBjdHguc2NhbGUoc2NhbGVYLCBzY2FsZVkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtZWV0T3JTbGljZSA9PT0gJ21lZXQnOlxuICAgICAgICBjdHguc2NhbGUoc2NhbGVNaW4sIHNjYWxlTWluKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWVldE9yU2xpY2UgPT09ICdzbGljZSc6XG4gICAgICAgIGN0eC5zY2FsZShzY2FsZU1heCwgc2NhbGVNYXgpO1xuICAgICAgICBicmVhaztcbiAgICB9IC8vIHRyYW5zbGF0ZVxuXG5cbiAgICBjdHgudHJhbnNsYXRlKC1taW5YLCAtbWluWSk7XG4gIH1cblxuICBzdGFydChlbGVtZW50KSB7XG4gICAgdmFyIHtcbiAgICAgIGVuYWJsZVJlZHJhdyA9IGZhbHNlLFxuICAgICAgaWdub3JlTW91c2UgPSBmYWxzZSxcbiAgICAgIGlnbm9yZUFuaW1hdGlvbiA9IGZhbHNlLFxuICAgICAgaWdub3JlRGltZW5zaW9ucyA9IGZhbHNlLFxuICAgICAgaWdub3JlQ2xlYXIgPSBmYWxzZSxcbiAgICAgIGZvcmNlUmVkcmF3LFxuICAgICAgc2NhbGVXaWR0aCxcbiAgICAgIHNjYWxlSGVpZ2h0LFxuICAgICAgb2Zmc2V0WCxcbiAgICAgIG9mZnNldFlcbiAgICB9ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIge1xuICAgICAgRlJBTUVSQVRFLFxuICAgICAgbW91c2VcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyBGUkFNRVJBVEU7XG4gICAgdGhpcy5mcmFtZUR1cmF0aW9uID0gZnJhbWVEdXJhdGlvbjtcbiAgICB0aGlzLnJlYWR5UHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlUmVhZHkgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuaXNSZWFkeSgpKSB7XG4gICAgICB0aGlzLnJlbmRlcihlbGVtZW50LCBpZ25vcmVEaW1lbnNpb25zLCBpZ25vcmVDbGVhciwgc2NhbGVXaWR0aCwgc2NhbGVIZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuICAgIH1cblxuICAgIGlmICghZW5hYmxlUmVkcmF3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgdmFyIHRoZW4gPSBub3c7XG4gICAgdmFyIGRlbHRhID0gMDtcblxuICAgIHZhciB0aWNrID0gKCkgPT4ge1xuICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgaWYgKGRlbHRhID49IGZyYW1lRHVyYXRpb24pIHtcbiAgICAgICAgdGhlbiA9IG5vdyAtIGRlbHRhICUgZnJhbWVEdXJhdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zaG91bGRVcGRhdGUoaWdub3JlQW5pbWF0aW9uLCBmb3JjZVJlZHJhdykpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcihlbGVtZW50LCBpZ25vcmVEaW1lbnNpb25zLCBpZ25vcmVDbGVhciwgc2NhbGVXaWR0aCwgc2NhbGVIZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuICAgICAgICAgIG1vdXNlLnJ1bkV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICB9O1xuXG4gICAgaWYgKCFpZ25vcmVNb3VzZSkge1xuICAgICAgbW91c2Uuc3RhcnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmludGVydmFsSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZS5jYW5jZWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5tb3VzZS5zdG9wKCk7XG4gIH1cblxuICBzaG91bGRVcGRhdGUoaWdub3JlQW5pbWF0aW9uLCBmb3JjZVJlZHJhdykge1xuICAgIC8vIG5lZWQgdXBkYXRlIGZyb20gYW5pbWF0aW9ucz9cbiAgICBpZiAoIWlnbm9yZUFuaW1hdGlvbikge1xuICAgICAgdmFyIHtcbiAgICAgICAgZnJhbWVEdXJhdGlvblxuICAgICAgfSA9IHRoaXM7XG4gICAgICB2YXIgc2hvdWxkVXBkYXRlID0gdGhpcy5hbmltYXRpb25zLnJlZHVjZSgoc2hvdWxkVXBkYXRlLCBhbmltYXRpb24pID0+IGFuaW1hdGlvbi51cGRhdGUoZnJhbWVEdXJhdGlvbikgfHwgc2hvdWxkVXBkYXRlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSAvLyBuZWVkIHVwZGF0ZSBmcm9tIHJlZHJhdz9cblxuXG4gICAgaWYgKHR5cGVvZiBmb3JjZVJlZHJhdyA9PT0gJ2Z1bmN0aW9uJyAmJiBmb3JjZVJlZHJhdygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNSZWFkeUxvY2sgJiYgdGhpcy5pc1JlYWR5KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gLy8gbmVlZCB1cGRhdGUgZnJvbSBtb3VzZSBldmVudHM/XG5cblxuICAgIGlmICh0aGlzLm1vdXNlLmhhc0V2ZW50cygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZW5kZXIoZWxlbWVudCwgaWdub3JlRGltZW5zaW9ucywgaWdub3JlQ2xlYXIsIHNjYWxlV2lkdGgsIHNjYWxlSGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIHtcbiAgICAgIENMSUVOVF9XSURUSCxcbiAgICAgIENMSUVOVF9IRUlHSFQsXG4gICAgICB2aWV3UG9ydCxcbiAgICAgIGN0eCxcbiAgICAgIGlzRmlyc3RSZW5kZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgY2FudmFzID0gY3R4LmNhbnZhcztcbiAgICB2aWV3UG9ydC5jbGVhcigpO1xuXG4gICAgaWYgKGNhbnZhcy53aWR0aCAmJiBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICB2aWV3UG9ydC5zZXRDdXJyZW50KGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdQb3J0LnNldEN1cnJlbnQoQ0xJRU5UX1dJRFRILCBDTElFTlRfSEVJR0hUKTtcbiAgICB9XG5cbiAgICB2YXIgd2lkdGhTdHlsZSA9IGVsZW1lbnQuZ2V0U3R5bGUoJ3dpZHRoJyk7XG4gICAgdmFyIGhlaWdodFN0eWxlID0gZWxlbWVudC5nZXRTdHlsZSgnaGVpZ2h0Jyk7XG5cbiAgICBpZiAoIWlnbm9yZURpbWVuc2lvbnMgJiYgKGlzRmlyc3RSZW5kZXIgfHwgdHlwZW9mIHNjYWxlV2lkdGggIT09ICdudW1iZXInICYmIHR5cGVvZiBzY2FsZUhlaWdodCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAvLyBzZXQgY2FudmFzIHNpemVcbiAgICAgIGlmICh3aWR0aFN0eWxlLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGhTdHlsZS5nZXRQaXhlbHMoJ3gnKTtcblxuICAgICAgICBpZiAoY2FudmFzLnN0eWxlKSB7XG4gICAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQoY2FudmFzLndpZHRoLCBcInB4XCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWlnaHRTdHlsZS5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRTdHlsZS5nZXRQaXhlbHMoJ3knKTtcblxuICAgICAgICBpZiAoY2FudmFzLnN0eWxlKSB7XG4gICAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KGNhbnZhcy5oZWlnaHQsIFwicHhcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY1dpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoIHx8IGNhbnZhcy53aWR0aDtcbiAgICB2YXIgY0hlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQgfHwgY2FudmFzLmhlaWdodDtcblxuICAgIGlmIChpZ25vcmVEaW1lbnNpb25zICYmIHdpZHRoU3R5bGUuaGFzVmFsdWUoKSAmJiBoZWlnaHRTdHlsZS5oYXNWYWx1ZSgpKSB7XG4gICAgICBjV2lkdGggPSB3aWR0aFN0eWxlLmdldFBpeGVscygneCcpO1xuICAgICAgY0hlaWdodCA9IGhlaWdodFN0eWxlLmdldFBpeGVscygneScpO1xuICAgIH1cblxuICAgIHZpZXdQb3J0LnNldEN1cnJlbnQoY1dpZHRoLCBjSGVpZ2h0KTtcblxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0WCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd4JywgdHJ1ZSkuc2V0VmFsdWUob2Zmc2V0WCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRZID09PSAnbnVtYmVyJykge1xuICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3knLCB0cnVlKS5zZXRWYWx1ZShvZmZzZXRZKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNjYWxlV2lkdGggPT09ICdudW1iZXInIHx8IHR5cGVvZiBzY2FsZUhlaWdodCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhciB2aWV3Qm94ID0gdG9OdW1iZXJzKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykuZ2V0U3RyaW5nKCkpO1xuICAgICAgdmFyIHhSYXRpbyA9IDA7XG4gICAgICB2YXIgeVJhdGlvID0gMDtcblxuICAgICAgaWYgKHR5cGVvZiBzY2FsZVdpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICB2YXIgX3dpZHRoU3R5bGUgPSBlbGVtZW50LmdldFN0eWxlKCd3aWR0aCcpO1xuXG4gICAgICAgIGlmIChfd2lkdGhTdHlsZS5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgeFJhdGlvID0gX3dpZHRoU3R5bGUuZ2V0UGl4ZWxzKCd4JykgLyBzY2FsZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTih2aWV3Qm94WzJdKSkge1xuICAgICAgICAgIHhSYXRpbyA9IHZpZXdCb3hbMl0gLyBzY2FsZVdpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NhbGVIZWlnaHQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHZhciBfaGVpZ2h0U3R5bGUgPSBlbGVtZW50LmdldFN0eWxlKCdoZWlnaHQnKTtcblxuICAgICAgICBpZiAoX2hlaWdodFN0eWxlLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICB5UmF0aW8gPSBfaGVpZ2h0U3R5bGUuZ2V0UGl4ZWxzKCd5JykgLyBzY2FsZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odmlld0JveFszXSkpIHtcbiAgICAgICAgICB5UmF0aW8gPSB2aWV3Qm94WzNdIC8gc2NhbGVIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF4UmF0aW8pIHtcbiAgICAgICAgeFJhdGlvID0geVJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXlSYXRpbykge1xuICAgICAgICB5UmF0aW8gPSB4UmF0aW87XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd3aWR0aCcsIHRydWUpLnNldFZhbHVlKHNjYWxlV2lkdGgpO1xuICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRydWUpLnNldFZhbHVlKHNjYWxlSGVpZ2h0KTtcbiAgICAgIHZhciB0cmFuc2Zvcm1TdHlsZSA9IGVsZW1lbnQuZ2V0U3R5bGUoJ3RyYW5zZm9ybScsIHRydWUsIHRydWUpO1xuICAgICAgdHJhbnNmb3JtU3R5bGUuc2V0VmFsdWUoXCJcIi5jb25jYXQodHJhbnNmb3JtU3R5bGUuZ2V0U3RyaW5nKCksIFwiIHNjYWxlKFwiKS5jb25jYXQoMS4wIC8geFJhdGlvLCBcIiwgXCIpLmNvbmNhdCgxLjAgLyB5UmF0aW8sIFwiKVwiKSk7XG4gICAgfSAvLyBjbGVhciBhbmQgcmVuZGVyXG5cblxuICAgIGlmICghaWdub3JlQ2xlYXIpIHtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY1dpZHRoLCBjSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbmRlcihjdHgpO1xuXG4gICAgaWYgKGlzRmlyc3RSZW5kZXIpIHtcbiAgICAgIHRoaXMuaXNGaXJzdFJlbmRlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG5TY3JlZW4uZGVmYXVsdFdpbmRvdyA9IGRlZmF1bHRXaW5kb3c7XG5TY3JlZW4uZGVmYXVsdEZldGNoID0gZGVmYXVsdEZldGNoJDE7XG5cbnZhciB7XG4gIGRlZmF1bHRGZXRjaFxufSA9IFNjcmVlbjtcbnZhciBEZWZhdWx0RE9NUGFyc2VyID0gdHlwZW9mIERPTVBhcnNlciAhPT0gJ3VuZGVmaW5lZCcgPyBET01QYXJzZXIgOiBudWxsO1xuY2xhc3MgUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdmFyIHtcbiAgICAgIGZldGNoID0gZGVmYXVsdEZldGNoLFxuICAgICAgRE9NUGFyc2VyID0gRGVmYXVsdERPTVBhcnNlclxuICAgIH0gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHRoaXMuZmV0Y2ggPSBmZXRjaDtcbiAgICB0aGlzLkRPTVBhcnNlciA9IERPTVBhcnNlcjtcbiAgfVxuXG4gIHBhcnNlKHJlc291cmNlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuICAgICAgaWYgKHJlc291cmNlLnN0YXJ0c1dpdGgoJzwnKSkge1xuICAgICAgICByZXR1cm4gX3RoaXMucGFyc2VGcm9tU3RyaW5nKHJlc291cmNlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLmxvYWQocmVzb3VyY2UpO1xuICAgIH0pKCk7XG4gIH1cblxuICBwYXJzZUZyb21TdHJpbmcoeG1sKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyB0aGlzLkRPTVBhcnNlcigpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrRG9jdW1lbnQocGFyc2VyLnBhcnNlRnJvbVN0cmluZyh4bWwsICdpbWFnZS9zdmcreG1sJykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tEb2N1bWVudChwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHhtbCwgJ3RleHQveG1sJykpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB2YXIgcGFyc2VyRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFyc2VyZXJyb3InKVswXTtcblxuICAgIGlmIChwYXJzZXJFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBhcnNlckVycm9yLnRleHRDb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cblxuICBsb2FkKHVybCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgcmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB5aWVsZCBfdGhpczIuZmV0Y2godXJsKTtcbiAgICAgIHZhciB4bWwgPSB5aWVsZCByZXNwb25zZS50ZXh0KCk7XG4gICAgICByZXR1cm4gX3RoaXMyLnBhcnNlRnJvbVN0cmluZyh4bWwpO1xuICAgIH0pKCk7XG4gIH1cblxufVxuXG5jbGFzcyBUcmFuc2xhdGUge1xuICBjb25zdHJ1Y3RvcihfLCBwb2ludCkge1xuICAgIHRoaXMudHlwZSA9ICd0cmFuc2xhdGUnO1xuICAgIHRoaXMucG9pbnQgPSBudWxsO1xuICAgIHRoaXMucG9pbnQgPSBQb2ludC5wYXJzZShwb2ludCk7XG4gIH1cblxuICBhcHBseShjdHgpIHtcbiAgICB2YXIge1xuICAgICAgeCxcbiAgICAgIHlcbiAgICB9ID0gdGhpcy5wb2ludDtcbiAgICBjdHgudHJhbnNsYXRlKHggfHwgMC4wLCB5IHx8IDAuMCk7XG4gIH1cblxuICB1bmFwcGx5KGN0eCkge1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSB0aGlzLnBvaW50O1xuICAgIGN0eC50cmFuc2xhdGUoLTEuMCAqIHggfHwgMC4wLCAtMS4wICogeSB8fCAwLjApO1xuICB9XG5cbiAgYXBwbHlUb1BvaW50KHBvaW50KSB7XG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IHRoaXMucG9pbnQ7XG4gICAgcG9pbnQuYXBwbHlUcmFuc2Zvcm0oWzEsIDAsIDAsIDEsIHggfHwgMC4wLCB5IHx8IDAuMF0pO1xuICB9XG5cbn1cblxuY2xhc3MgUm90YXRlIHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIHJvdGF0ZSwgdHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgdGhpcy50eXBlID0gJ3JvdGF0ZSc7XG4gICAgdGhpcy5hbmdsZSA9IG51bGw7XG4gICAgdGhpcy5vcmlnaW5YID0gbnVsbDtcbiAgICB0aGlzLm9yaWdpblkgPSBudWxsO1xuICAgIHRoaXMuY3ggPSAwO1xuICAgIHRoaXMuY3kgPSAwO1xuICAgIHZhciBudW1iZXJzID0gdG9OdW1iZXJzKHJvdGF0ZSk7XG4gICAgdGhpcy5hbmdsZSA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ2FuZ2xlJywgbnVtYmVyc1swXSk7XG4gICAgdGhpcy5vcmlnaW5YID0gdHJhbnNmb3JtT3JpZ2luWzBdO1xuICAgIHRoaXMub3JpZ2luWSA9IHRyYW5zZm9ybU9yaWdpblsxXTtcbiAgICB0aGlzLmN4ID0gbnVtYmVyc1sxXSB8fCAwO1xuICAgIHRoaXMuY3kgPSBudW1iZXJzWzJdIHx8IDA7XG4gIH1cblxuICBhcHBseShjdHgpIHtcbiAgICB2YXIge1xuICAgICAgY3gsXG4gICAgICBjeSxcbiAgICAgIG9yaWdpblgsXG4gICAgICBvcmlnaW5ZLFxuICAgICAgYW5nbGVcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgdHggPSBjeCArIG9yaWdpblguZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHR5ID0gY3kgKyBvcmlnaW5ZLmdldFBpeGVscygneScpO1xuICAgIGN0eC50cmFuc2xhdGUodHgsIHR5KTtcbiAgICBjdHgucm90YXRlKGFuZ2xlLmdldFJhZGlhbnMoKSk7XG4gICAgY3R4LnRyYW5zbGF0ZSgtdHgsIC10eSk7XG4gIH1cblxuICB1bmFwcGx5KGN0eCkge1xuICAgIHZhciB7XG4gICAgICBjeCxcbiAgICAgIGN5LFxuICAgICAgb3JpZ2luWCxcbiAgICAgIG9yaWdpblksXG4gICAgICBhbmdsZVxuICAgIH0gPSB0aGlzO1xuICAgIHZhciB0eCA9IGN4ICsgb3JpZ2luWC5nZXRQaXhlbHMoJ3gnKTtcbiAgICB2YXIgdHkgPSBjeSArIG9yaWdpblkuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgY3R4LnRyYW5zbGF0ZSh0eCwgdHkpO1xuICAgIGN0eC5yb3RhdGUoLTEuMCAqIGFuZ2xlLmdldFJhZGlhbnMoKSk7XG4gICAgY3R4LnRyYW5zbGF0ZSgtdHgsIC10eSk7XG4gIH1cblxuICBhcHBseVRvUG9pbnQocG9pbnQpIHtcbiAgICB2YXIge1xuICAgICAgY3gsXG4gICAgICBjeSxcbiAgICAgIGFuZ2xlXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHJhZCA9IGFuZ2xlLmdldFJhZGlhbnMoKTtcbiAgICBwb2ludC5hcHBseVRyYW5zZm9ybShbMSwgMCwgMCwgMSwgY3ggfHwgMC4wLCBjeSB8fCAwLjAgLy8gdGhpcy5wLnlcbiAgICBdKTtcbiAgICBwb2ludC5hcHBseVRyYW5zZm9ybShbTWF0aC5jb3MocmFkKSwgTWF0aC5zaW4ocmFkKSwgLU1hdGguc2luKHJhZCksIE1hdGguY29zKHJhZCksIDAsIDBdKTtcbiAgICBwb2ludC5hcHBseVRyYW5zZm9ybShbMSwgMCwgMCwgMSwgLWN4IHx8IDAuMCwgLWN5IHx8IDAuMCAvLyAtdGhpcy5wLnlcbiAgICBdKTtcbiAgfVxuXG59XG5cbmNsYXNzIFNjYWxlIHtcbiAgY29uc3RydWN0b3IoXywgc2NhbGUsIHRyYW5zZm9ybU9yaWdpbikge1xuICAgIHRoaXMudHlwZSA9ICdzY2FsZSc7XG4gICAgdGhpcy5zY2FsZSA9IG51bGw7XG4gICAgdGhpcy5vcmlnaW5YID0gbnVsbDtcbiAgICB0aGlzLm9yaWdpblkgPSBudWxsO1xuICAgIHZhciBzY2FsZVNpemUgPSBQb2ludC5wYXJzZVNjYWxlKHNjYWxlKTsgLy8gV29ya2Fyb3VuZCBmb3Igbm9kZS1jYW52YXNcblxuICAgIGlmIChzY2FsZVNpemUueCA9PT0gMCB8fCBzY2FsZVNpemUueSA9PT0gMCkge1xuICAgICAgc2NhbGVTaXplLnggPSBQU0VVRE9fWkVSTztcbiAgICAgIHNjYWxlU2l6ZS55ID0gUFNFVURPX1pFUk87XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlU2l6ZTtcbiAgICB0aGlzLm9yaWdpblggPSB0cmFuc2Zvcm1PcmlnaW5bMF07XG4gICAgdGhpcy5vcmlnaW5ZID0gdHJhbnNmb3JtT3JpZ2luWzFdO1xuICB9XG5cbiAgYXBwbHkoY3R4KSB7XG4gICAgdmFyIHtcbiAgICAgIHNjYWxlOiB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0sXG4gICAgICBvcmlnaW5YLFxuICAgICAgb3JpZ2luWVxuICAgIH0gPSB0aGlzO1xuICAgIHZhciB0eCA9IG9yaWdpblguZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHR5ID0gb3JpZ2luWS5nZXRQaXhlbHMoJ3knKTtcbiAgICBjdHgudHJhbnNsYXRlKHR4LCB0eSk7XG4gICAgY3R4LnNjYWxlKHgsIHkgfHwgeCk7XG4gICAgY3R4LnRyYW5zbGF0ZSgtdHgsIC10eSk7XG4gIH1cblxuICB1bmFwcGx5KGN0eCkge1xuICAgIHZhciB7XG4gICAgICBzY2FsZToge1xuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgICB9LFxuICAgICAgb3JpZ2luWCxcbiAgICAgIG9yaWdpbllcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgdHggPSBvcmlnaW5YLmdldFBpeGVscygneCcpO1xuICAgIHZhciB0eSA9IG9yaWdpblkuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgY3R4LnRyYW5zbGF0ZSh0eCwgdHkpO1xuICAgIGN0eC5zY2FsZSgxLjAgLyB4LCAxLjAgLyB5IHx8IHgpO1xuICAgIGN0eC50cmFuc2xhdGUoLXR4LCAtdHkpO1xuICB9XG5cbiAgYXBwbHlUb1BvaW50KHBvaW50KSB7XG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IHRoaXMuc2NhbGU7XG4gICAgcG9pbnQuYXBwbHlUcmFuc2Zvcm0oW3ggfHwgMC4wLCAwLCAwLCB5IHx8IDAuMCwgMCwgMF0pO1xuICB9XG5cbn1cblxuY2xhc3MgTWF0cml4IHtcbiAgY29uc3RydWN0b3IoXywgbWF0cml4LCB0cmFuc2Zvcm1PcmlnaW4pIHtcbiAgICB0aGlzLnR5cGUgPSAnbWF0cml4JztcbiAgICB0aGlzLm1hdHJpeCA9IFtdO1xuICAgIHRoaXMub3JpZ2luWCA9IG51bGw7XG4gICAgdGhpcy5vcmlnaW5ZID0gbnVsbDtcbiAgICB0aGlzLm1hdHJpeCA9IHRvTnVtYmVycyhtYXRyaXgpO1xuICAgIHRoaXMub3JpZ2luWCA9IHRyYW5zZm9ybU9yaWdpblswXTtcbiAgICB0aGlzLm9yaWdpblkgPSB0cmFuc2Zvcm1PcmlnaW5bMV07XG4gIH1cblxuICBhcHBseShjdHgpIHtcbiAgICB2YXIge1xuICAgICAgb3JpZ2luWCxcbiAgICAgIG9yaWdpblksXG4gICAgICBtYXRyaXhcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgdHggPSBvcmlnaW5YLmdldFBpeGVscygneCcpO1xuICAgIHZhciB0eSA9IG9yaWdpblkuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgY3R4LnRyYW5zbGF0ZSh0eCwgdHkpO1xuICAgIGN0eC50cmFuc2Zvcm0obWF0cml4WzBdLCBtYXRyaXhbMV0sIG1hdHJpeFsyXSwgbWF0cml4WzNdLCBtYXRyaXhbNF0sIG1hdHJpeFs1XSk7XG4gICAgY3R4LnRyYW5zbGF0ZSgtdHgsIC10eSk7XG4gIH1cblxuICB1bmFwcGx5KGN0eCkge1xuICAgIHZhciB7XG4gICAgICBvcmlnaW5YLFxuICAgICAgb3JpZ2luWSxcbiAgICAgIG1hdHJpeFxuICAgIH0gPSB0aGlzO1xuICAgIHZhciBhID0gbWF0cml4WzBdO1xuICAgIHZhciBiID0gbWF0cml4WzJdO1xuICAgIHZhciBjID0gbWF0cml4WzRdO1xuICAgIHZhciBkID0gbWF0cml4WzFdO1xuICAgIHZhciBlID0gbWF0cml4WzNdO1xuICAgIHZhciBmID0gbWF0cml4WzVdO1xuICAgIHZhciBnID0gMC4wO1xuICAgIHZhciBoID0gMC4wO1xuICAgIHZhciBpID0gMS4wO1xuICAgIHZhciBkZXQgPSAxIC8gKGEgKiAoZSAqIGkgLSBmICogaCkgLSBiICogKGQgKiBpIC0gZiAqIGcpICsgYyAqIChkICogaCAtIGUgKiBnKSk7XG4gICAgdmFyIHR4ID0gb3JpZ2luWC5nZXRQaXhlbHMoJ3gnKTtcbiAgICB2YXIgdHkgPSBvcmlnaW5ZLmdldFBpeGVscygneScpO1xuICAgIGN0eC50cmFuc2xhdGUodHgsIHR5KTtcbiAgICBjdHgudHJhbnNmb3JtKGRldCAqIChlICogaSAtIGYgKiBoKSwgZGV0ICogKGYgKiBnIC0gZCAqIGkpLCBkZXQgKiAoYyAqIGggLSBiICogaSksIGRldCAqIChhICogaSAtIGMgKiBnKSwgZGV0ICogKGIgKiBmIC0gYyAqIGUpLCBkZXQgKiAoYyAqIGQgLSBhICogZikpO1xuICAgIGN0eC50cmFuc2xhdGUoLXR4LCAtdHkpO1xuICB9XG5cbiAgYXBwbHlUb1BvaW50KHBvaW50KSB7XG4gICAgcG9pbnQuYXBwbHlUcmFuc2Zvcm0odGhpcy5tYXRyaXgpO1xuICB9XG5cbn1cblxuY2xhc3MgU2tldyBleHRlbmRzIE1hdHJpeCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBza2V3LCB0cmFuc2Zvcm1PcmlnaW4pIHtcbiAgICBzdXBlcihkb2N1bWVudCwgc2tldywgdHJhbnNmb3JtT3JpZ2luKTtcbiAgICB0aGlzLnR5cGUgPSAnc2tldyc7XG4gICAgdGhpcy5hbmdsZSA9IG51bGw7XG4gICAgdGhpcy5hbmdsZSA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ2FuZ2xlJywgc2tldyk7XG4gIH1cblxufVxuXG5jbGFzcyBTa2V3WCBleHRlbmRzIFNrZXcge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgc2tldywgdHJhbnNmb3JtT3JpZ2luKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIHNrZXcsIHRyYW5zZm9ybU9yaWdpbik7XG4gICAgdGhpcy50eXBlID0gJ3NrZXdYJztcbiAgICB0aGlzLm1hdHJpeCA9IFsxLCAwLCBNYXRoLnRhbih0aGlzLmFuZ2xlLmdldFJhZGlhbnMoKSksIDEsIDAsIDBdO1xuICB9XG5cbn1cblxuY2xhc3MgU2tld1kgZXh0ZW5kcyBTa2V3IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIHNrZXcsIHRyYW5zZm9ybU9yaWdpbikge1xuICAgIHN1cGVyKGRvY3VtZW50LCBza2V3LCB0cmFuc2Zvcm1PcmlnaW4pO1xuICAgIHRoaXMudHlwZSA9ICdza2V3WSc7XG4gICAgdGhpcy5tYXRyaXggPSBbMSwgTWF0aC50YW4odGhpcy5hbmdsZS5nZXRSYWRpYW5zKCkpLCAwLCAxLCAwLCAwXTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIHBhcnNlVHJhbnNmb3Jtcyh0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGNvbXByZXNzU3BhY2VzKHRyYW5zZm9ybSkudHJpbSgpLnJlcGxhY2UoL1xcKShbYS16QS1aXSkvZywgJykgJDEnKS5yZXBsYWNlKC9cXCkoXFxzPyxcXHM/KS9nLCAnKSAnKS5zcGxpdCgvXFxzKD89W2Etel0pLyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICB2YXIgW3R5cGUsIHZhbHVlXSA9IHRyYW5zZm9ybS5zcGxpdCgnKCcpO1xuICByZXR1cm4gW3R5cGUudHJpbSgpLCB2YWx1ZS50cmltKCkucmVwbGFjZSgnKScsICcnKV07XG59XG5cbmNsYXNzIFRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCB0cmFuc2Zvcm0sIHRyYW5zZm9ybU9yaWdpbikge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSBbXTtcbiAgICB2YXIgZGF0YSA9IHBhcnNlVHJhbnNmb3Jtcyh0cmFuc2Zvcm0pO1xuICAgIGRhdGEuZm9yRWFjaCh0cmFuc2Zvcm0gPT4ge1xuICAgICAgaWYgKHRyYW5zZm9ybSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIFt0eXBlLCB2YWx1ZV0gPSBwYXJzZVRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgdmFyIFRyYW5zZm9ybVR5cGUgPSBUcmFuc2Zvcm0udHJhbnNmb3JtVHlwZXNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgVHJhbnNmb3JtVHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zLnB1c2gobmV3IFRyYW5zZm9ybVR5cGUodGhpcy5kb2N1bWVudCwgdmFsdWUsIHRyYW5zZm9ybU9yaWdpbikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZyb21FbGVtZW50KGRvY3VtZW50LCBlbGVtZW50KSB7XG4gICAgdmFyIHRyYW5zZm9ybVN0eWxlID0gZWxlbWVudC5nZXRTdHlsZSgndHJhbnNmb3JtJywgZmFsc2UsIHRydWUpO1xuICAgIHZhciBbdHJhbnNmb3JtT3JpZ2luWFByb3BlcnR5LCB0cmFuc2Zvcm1PcmlnaW5ZUHJvcGVydHkgPSB0cmFuc2Zvcm1PcmlnaW5YUHJvcGVydHldID0gZWxlbWVudC5nZXRTdHlsZSgndHJhbnNmb3JtLW9yaWdpbicsIGZhbHNlLCB0cnVlKS5zcGxpdCgpO1xuICAgIHZhciB0cmFuc2Zvcm1PcmlnaW4gPSBbdHJhbnNmb3JtT3JpZ2luWFByb3BlcnR5LCB0cmFuc2Zvcm1PcmlnaW5ZUHJvcGVydHldO1xuXG4gICAgaWYgKHRyYW5zZm9ybVN0eWxlLmhhc1ZhbHVlKCkpIHtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKGRvY3VtZW50LCB0cmFuc2Zvcm1TdHlsZS5nZXRTdHJpbmcoKSwgdHJhbnNmb3JtT3JpZ2luKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFwcGx5KGN0eCkge1xuICAgIHZhciB7XG4gICAgICB0cmFuc2Zvcm1zXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIGxlbiA9IHRyYW5zZm9ybXMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdHJhbnNmb3Jtc1tpXS5hcHBseShjdHgpO1xuICAgIH1cbiAgfVxuXG4gIHVuYXBwbHkoY3R4KSB7XG4gICAgdmFyIHtcbiAgICAgIHRyYW5zZm9ybXNcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgbGVuID0gdHJhbnNmb3Jtcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRyYW5zZm9ybXNbaV0udW5hcHBseShjdHgpO1xuICAgIH1cbiAgfSAvLyBUT0RPOiBhcHBseVRvUG9pbnQgdW51c2VkIC4uLiByZW1vdmU/XG5cblxuICBhcHBseVRvUG9pbnQocG9pbnQpIHtcbiAgICB2YXIge1xuICAgICAgdHJhbnNmb3Jtc1xuICAgIH0gPSB0aGlzO1xuICAgIHZhciBsZW4gPSB0cmFuc2Zvcm1zLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRyYW5zZm9ybXNbaV0uYXBwbHlUb1BvaW50KHBvaW50KTtcbiAgICB9XG4gIH1cblxufVxuVHJhbnNmb3JtLnRyYW5zZm9ybVR5cGVzID0ge1xuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZSxcbiAgcm90YXRlOiBSb3RhdGUsXG4gIHNjYWxlOiBTY2FsZSxcbiAgbWF0cml4OiBNYXRyaXgsXG4gIHNrZXdYOiBTa2V3WCxcbiAgc2tld1k6IFNrZXdZXG59O1xuXG5jbGFzcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUpIHtcbiAgICB2YXIgY2FwdHVyZVRleHROb2RlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy5jYXB0dXJlVGV4dE5vZGVzID0gY2FwdHVyZVRleHROb2RlcztcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICB0aGlzLnN0eWxlcyA9IHt9O1xuICAgIHRoaXMuc3R5bGVzU3BlY2lmaWNpdHkgPSB7fTtcbiAgICB0aGlzLmFuaW1hdGlvbkZyb3plbiA9IGZhbHNlO1xuICAgIHRoaXMuYW5pbWF0aW9uRnJvemVuVmFsdWUgPSAnJztcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgaWYgKCFub2RlIHx8IG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgIC8vIEVMRU1FTlRfTk9ERVxuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gYWRkIGF0dHJpYnV0ZXNcblxuXG4gICAgQXJyYXkuZnJvbShub2RlLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlID0+IHtcbiAgICAgIHZhciBub2RlTmFtZSA9IG5vcm1hbGl6ZUF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlLm5vZGVOYW1lKTtcbiAgICAgIHRoaXMuYXR0cmlidXRlc1tub2RlTmFtZV0gPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsIG5vZGVOYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH0pO1xuICAgIHRoaXMuYWRkU3R5bGVzRnJvbVN0eWxlRGVmaW5pdGlvbigpOyAvLyBhZGQgaW5saW5lIHN0eWxlc1xuXG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdzdHlsZScpLmhhc1ZhbHVlKCkpIHtcbiAgICAgIHZhciBzdHlsZXMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5nZXRTdHJpbmcoKS5zcGxpdCgnOycpLm1hcChfID0+IF8udHJpbSgpKTtcbiAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgaWYgKCFzdHlsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBbbmFtZSwgdmFsdWVdID0gc3R5bGUuc3BsaXQoJzonKS5tYXAoXyA9PiBfLnRyaW0oKSk7XG4gICAgICAgIHRoaXMuc3R5bGVzW25hbWVdID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIge1xuICAgICAgZGVmaW5pdGlvbnNcbiAgICB9ID0gZG9jdW1lbnQ7XG4gICAgdmFyIGlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJyk7IC8vIGFkZCBpZFxuXG4gICAgaWYgKGlkLmhhc1ZhbHVlKCkpIHtcbiAgICAgIGlmICghZGVmaW5pdGlvbnNbaWQuZ2V0U3RyaW5nKCldKSB7XG4gICAgICAgIGRlZmluaXRpb25zW2lkLmdldFN0cmluZygpXSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLmZvckVhY2goY2hpbGROb2RlID0+IHtcbiAgICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChjaGlsZE5vZGUpOyAvLyBFTEVNRU5UX05PREVcbiAgICAgIH0gZWxzZSBpZiAoY2FwdHVyZVRleHROb2RlcyAmJiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSAzIHx8IGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gNCkpIHtcbiAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGROb2RlKTtcblxuICAgICAgICBpZiAodGV4dE5vZGUuZ2V0VGV4dCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmFkZENoaWxkKHRleHROb2RlKTsgLy8gVEVYVF9OT0RFXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgdmFyIGNyZWF0ZUlmTm90RXhpc3RzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcbiAgICB2YXIgYXR0ciA9IHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcblxuICAgIGlmICghYXR0ciAmJiBjcmVhdGVJZk5vdEV4aXN0cykge1xuICAgICAgdmFyIF9hdHRyID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsIG5hbWUsICcnKTtcblxuICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdID0gX2F0dHI7XG4gICAgICByZXR1cm4gX2F0dHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHIgfHwgUHJvcGVydHkuZW1wdHkodGhpcy5kb2N1bWVudCk7XG4gIH1cblxuICBnZXRIcmVmQXR0cmlidXRlKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdocmVmJyB8fCBrZXkuZW5kc1dpdGgoJzpocmVmJykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9wZXJ0eS5lbXB0eSh0aGlzLmRvY3VtZW50KTtcbiAgfVxuXG4gIGdldFN0eWxlKG5hbWUpIHtcbiAgICB2YXIgY3JlYXRlSWZOb3RFeGlzdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuICAgIHZhciBza2lwQW5jZXN0b3JzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc1tuYW1lXTtcblxuICAgIGlmIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuICAgIHZhciBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICBpZiAoYXR0ciAhPT0gbnVsbCAmJiBhdHRyICE9PSB2b2lkIDAgJiYgYXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLnN0eWxlc1tuYW1lXSA9IGF0dHI7IC8vIG1vdmUgdXAgdG8gbWUgdG8gY2FjaGVcblxuICAgICAgcmV0dXJuIGF0dHI7XG4gICAgfVxuXG4gICAgaWYgKCFza2lwQW5jZXN0b3JzKSB7XG4gICAgICB2YXIge1xuICAgICAgICBwYXJlbnRcbiAgICAgIH0gPSB0aGlzO1xuXG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdHlsZSA9IHBhcmVudC5nZXRTdHlsZShuYW1lKTtcblxuICAgICAgICBpZiAocGFyZW50U3R5bGUgIT09IG51bGwgJiYgcGFyZW50U3R5bGUgIT09IHZvaWQgMCAmJiBwYXJlbnRTdHlsZS5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudFN0eWxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNyZWF0ZUlmTm90RXhpc3RzKSB7XG4gICAgICB2YXIgX3N0eWxlID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsIG5hbWUsICcnKTtcblxuICAgICAgdGhpcy5zdHlsZXNbbmFtZV0gPSBfc3R5bGU7XG4gICAgICByZXR1cm4gX3N0eWxlO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZSB8fCBQcm9wZXJ0eS5lbXB0eSh0aGlzLmRvY3VtZW50KTtcbiAgfVxuXG4gIHJlbmRlcihjdHgpIHtcbiAgICAvLyBkb24ndCByZW5kZXIgZGlzcGxheT1ub25lXG4gICAgLy8gZG9uJ3QgcmVuZGVyIHZpc2liaWxpdHk9aGlkZGVuXG4gICAgaWYgKHRoaXMuZ2V0U3R5bGUoJ2Rpc3BsYXknKS5nZXRTdHJpbmcoKSA9PT0gJ25vbmUnIHx8IHRoaXMuZ2V0U3R5bGUoJ3Zpc2liaWxpdHknKS5nZXRTdHJpbmcoKSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgaWYgKHRoaXMuZ2V0U3R5bGUoJ21hc2snKS5oYXNWYWx1ZSgpKSB7XG4gICAgICAvLyBtYXNrXG4gICAgICB2YXIgbWFzayA9IHRoaXMuZ2V0U3R5bGUoJ21hc2snKS5nZXREZWZpbml0aW9uKCk7XG5cbiAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgIHRoaXMuYXBwbHlFZmZlY3RzKGN0eCk7XG4gICAgICAgIG1hc2suYXBwbHkoY3R4LCB0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0U3R5bGUoJ2ZpbHRlcicpLmdldFZhbHVlKCdub25lJykgIT09ICdub25lJykge1xuICAgICAgLy8gZmlsdGVyXG4gICAgICB2YXIgZmlsdGVyID0gdGhpcy5nZXRTdHlsZSgnZmlsdGVyJykuZ2V0RGVmaW5pdGlvbigpO1xuXG4gICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlFZmZlY3RzKGN0eCk7XG4gICAgICAgIGZpbHRlci5hcHBseShjdHgsIHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldENvbnRleHQoY3R4KTtcbiAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oY3R4KTtcbiAgICAgIHRoaXMuY2xlYXJDb250ZXh0KGN0eCk7XG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHNldENvbnRleHQoXykgey8vIE5PIFJFTkRFUlxuICB9XG5cbiAgYXBwbHlFZmZlY3RzKGN0eCkge1xuICAgIC8vIHRyYW5zZm9ybVxuICAgIHZhciB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0uZnJvbUVsZW1lbnQodGhpcy5kb2N1bWVudCwgdGhpcyk7XG5cbiAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICB0cmFuc2Zvcm0uYXBwbHkoY3R4KTtcbiAgICB9IC8vIGNsaXBcblxuXG4gICAgdmFyIGNsaXBQYXRoU3R5bGVQcm9wID0gdGhpcy5nZXRTdHlsZSgnY2xpcC1wYXRoJywgZmFsc2UsIHRydWUpO1xuXG4gICAgaWYgKGNsaXBQYXRoU3R5bGVQcm9wLmhhc1ZhbHVlKCkpIHtcbiAgICAgIHZhciBjbGlwID0gY2xpcFBhdGhTdHlsZVByb3AuZ2V0RGVmaW5pdGlvbigpO1xuXG4gICAgICBpZiAoY2xpcCkge1xuICAgICAgICBjbGlwLmFwcGx5KGN0eCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXJDb250ZXh0KF8pIHsvLyBOTyBSRU5ERVJcbiAgfVxuXG4gIHJlbmRlckNoaWxkcmVuKGN0eCkge1xuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBjaGlsZC5yZW5kZXIoY3R4KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENoaWxkKGNoaWxkTm9kZSkge1xuICAgIHZhciBjaGlsZCA9IGNoaWxkTm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgPyBjaGlsZE5vZGUgOiB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY2hpbGROb2RlKTtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgaWYgKCFFbGVtZW50Lmlnbm9yZUNoaWxkVHlwZXMuaW5jbHVkZXMoY2hpbGQudHlwZSkpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgbWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgdmFyIF9ub2RlJGdldEF0dHJpYnV0ZTtcblxuICAgIHZhciB7XG4gICAgICBub2RlXG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIG5vZGUubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5vZGUubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlQ2xhc3NlcyA9IChfbm9kZSRnZXRBdHRyaWJ1dGUgPSBub2RlLmdldEF0dHJpYnV0ZSkgPT09IG51bGwgfHwgX25vZGUkZ2V0QXR0cmlidXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbm9kZSRnZXRBdHRyaWJ1dGUuY2FsbChub2RlLCAnY2xhc3MnKTtcblxuICAgIGlmICghc3R5bGVDbGFzc2VzIHx8IHN0eWxlQ2xhc3NlcyA9PT0gJycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVDbGFzc2VzLnNwbGl0KCcgJykuc29tZShzdHlsZUNsYXNzID0+IFwiLlwiLmNvbmNhdChzdHlsZUNsYXNzKSA9PT0gc2VsZWN0b3IpO1xuICB9XG5cbiAgYWRkU3R5bGVzRnJvbVN0eWxlRGVmaW5pdGlvbigpIHtcbiAgICB2YXIge1xuICAgICAgc3R5bGVzLFxuICAgICAgc3R5bGVzU3BlY2lmaWNpdHlcbiAgICB9ID0gdGhpcy5kb2N1bWVudDtcblxuICAgIGZvciAodmFyIHNlbGVjdG9yIGluIHN0eWxlcykge1xuICAgICAgaWYgKCFzZWxlY3Rvci5zdGFydHNXaXRoKCdAJykgJiYgdGhpcy5tYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHN0eWxlc1tzZWxlY3Rvcl07XG4gICAgICAgIHZhciBzcGVjaWZpY2l0eSA9IHN0eWxlc1NwZWNpZmljaXR5W3NlbGVjdG9yXTtcblxuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RpbmdTcGVjaWZpY2l0eSA9IHRoaXMuc3R5bGVzU3BlY2lmaWNpdHlbbmFtZV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhpc3RpbmdTcGVjaWZpY2l0eSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmdTcGVjaWZpY2l0eSA9ICcwMDAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3BlY2lmaWNpdHkgPj0gZXhpc3RpbmdTcGVjaWZpY2l0eSkge1xuICAgICAgICAgICAgICB0aGlzLnN0eWxlc1tuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgICAgICAgICAgICB0aGlzLnN0eWxlc1NwZWNpZmljaXR5W25hbWVdID0gc3BlY2lmaWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGVzKGVsZW1lbnQsIGlnbm9yZVN0eWxlcykge1xuICAgIHZhciB0b1Jlc3RvcmUgPSBpZ25vcmVTdHlsZXMucmVkdWNlKCh0b1Jlc3RvcmUsIG5hbWUpID0+IHtcbiAgICAgIHZhciBzdHlsZVByb3AgPSBlbGVtZW50LmdldFN0eWxlKG5hbWUpO1xuXG4gICAgICBpZiAoIXN0eWxlUHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiB0b1Jlc3RvcmU7XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IHN0eWxlUHJvcC5nZXRTdHJpbmcoKTtcbiAgICAgIHN0eWxlUHJvcC5zZXRWYWx1ZSgnJyk7XG4gICAgICByZXR1cm4gWy4uLnRvUmVzdG9yZSwgW25hbWUsIHZhbHVlXV07XG4gICAgfSwgW10pO1xuICAgIHJldHVybiB0b1Jlc3RvcmU7XG4gIH1cblxuICByZXN0b3JlU3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICAgIHN0eWxlcy5mb3JFYWNoKF9yZWYgPT4ge1xuICAgICAgdmFyIFtuYW1lLCB2YWx1ZV0gPSBfcmVmO1xuICAgICAgZWxlbWVudC5nZXRTdHlsZShuYW1lLCB0cnVlKS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpc0ZpcnN0Q2hpbGQoKSB7XG4gICAgdmFyIF90aGlzJHBhcmVudDtcblxuICAgIHJldHVybiAoKF90aGlzJHBhcmVudCA9IHRoaXMucGFyZW50KSA9PT0gbnVsbCB8fCBfdGhpcyRwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzJHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpKSA9PT0gMDtcbiAgfVxuXG59XG5FbGVtZW50Lmlnbm9yZUNoaWxkVHlwZXMgPSBbJ3RpdGxlJ107XG5cbmNsYXNzIFVua25vd25FbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gd3JhcEZvbnRGYW1pbHkoZm9udEZhbWlseSkge1xuICB2YXIgdHJpbW1lZCA9IGZvbnRGYW1pbHkudHJpbSgpO1xuICByZXR1cm4gL14oJ3xcIikvLnRlc3QodHJpbW1lZCkgPyB0cmltbWVkIDogXCJcXFwiXCIuY29uY2F0KHRyaW1tZWQsIFwiXFxcIlwiKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUZvbnRGYW1pbHkoZm9udEZhbWlseSkge1xuICByZXR1cm4gdHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnID8gZm9udEZhbWlseSA6IGZvbnRGYW1pbHkudHJpbSgpLnNwbGl0KCcsJykubWFwKHdyYXBGb250RmFtaWx5KS5qb2luKCcsJyk7XG59XG4vKipcclxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2ZvbnQtc3R5bGVcclxuICogQHBhcmFtIGZvbnRTdHlsZVxyXG4gKiBAcmV0dXJucyBDU1MgZm9udCBzdHlsZS5cclxuICovXG5cblxuZnVuY3Rpb24gcHJlcGFyZUZvbnRTdHlsZShmb250U3R5bGUpIHtcbiAgaWYgKCFmb250U3R5bGUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YXIgdGFyZ2V0Rm9udFN0eWxlID0gZm9udFN0eWxlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHN3aXRjaCAodGFyZ2V0Rm9udFN0eWxlKSB7XG4gICAgY2FzZSAnbm9ybWFsJzpcbiAgICBjYXNlICdpdGFsaWMnOlxuICAgIGNhc2UgJ29ibGlxdWUnOlxuICAgIGNhc2UgJ2luaGVyaXQnOlxuICAgIGNhc2UgJ2luaXRpYWwnOlxuICAgIGNhc2UgJ3Vuc2V0JzpcbiAgICAgIHJldHVybiB0YXJnZXRGb250U3R5bGU7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKC9eb2JsaXF1ZVxccysoLXwpXFxkK2RlZyQvLnRlc3QodGFyZ2V0Rm9udFN0eWxlKSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Rm9udFN0eWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn1cbi8qKlxyXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvZm9udC13ZWlnaHRcclxuICogQHBhcmFtIGZvbnRXZWlnaHRcclxuICogQHJldHVybnMgQ1NTIGZvbnQgd2VpZ2h0LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBwcmVwYXJlRm9udFdlaWdodChmb250V2VpZ2h0KSB7XG4gIGlmICghZm9udFdlaWdodCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHZhciB0YXJnZXRGb250V2VpZ2h0ID0gZm9udFdlaWdodC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICBzd2l0Y2ggKHRhcmdldEZvbnRXZWlnaHQpIHtcbiAgICBjYXNlICdub3JtYWwnOlxuICAgIGNhc2UgJ2JvbGQnOlxuICAgIGNhc2UgJ2xpZ2h0ZXInOlxuICAgIGNhc2UgJ2JvbGRlcic6XG4gICAgY2FzZSAnaW5oZXJpdCc6XG4gICAgY2FzZSAnaW5pdGlhbCc6XG4gICAgY2FzZSAndW5zZXQnOlxuICAgICAgcmV0dXJuIHRhcmdldEZvbnRXZWlnaHQ7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKC9eW1xcZC5dKyQvLnRlc3QodGFyZ2V0Rm9udFdlaWdodCkpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldEZvbnRXZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5jbGFzcyBGb250IHtcbiAgY29uc3RydWN0b3IoZm9udFN0eWxlLCBmb250VmFyaWFudCwgZm9udFdlaWdodCwgZm9udFNpemUsIGZvbnRGYW1pbHksIGluaGVyaXQpIHtcbiAgICB2YXIgaW5oZXJpdEZvbnQgPSBpbmhlcml0ID8gdHlwZW9mIGluaGVyaXQgPT09ICdzdHJpbmcnID8gRm9udC5wYXJzZShpbmhlcml0KSA6IGluaGVyaXQgOiB7fTtcbiAgICB0aGlzLmZvbnRGYW1pbHkgPSBmb250RmFtaWx5IHx8IGluaGVyaXRGb250LmZvbnRGYW1pbHk7XG4gICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplIHx8IGluaGVyaXRGb250LmZvbnRTaXplO1xuICAgIHRoaXMuZm9udFN0eWxlID0gZm9udFN0eWxlIHx8IGluaGVyaXRGb250LmZvbnRTdHlsZTtcbiAgICB0aGlzLmZvbnRXZWlnaHQgPSBmb250V2VpZ2h0IHx8IGluaGVyaXRGb250LmZvbnRXZWlnaHQ7XG4gICAgdGhpcy5mb250VmFyaWFudCA9IGZvbnRWYXJpYW50IHx8IGluaGVyaXRGb250LmZvbnRWYXJpYW50O1xuICB9XG5cbiAgc3RhdGljIHBhcnNlKCkge1xuICAgIHZhciBmb250ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcbiAgICB2YXIgaW5oZXJpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBmb250U3R5bGUgPSAnJztcbiAgICB2YXIgZm9udFZhcmlhbnQgPSAnJztcbiAgICB2YXIgZm9udFdlaWdodCA9ICcnO1xuICAgIHZhciBmb250U2l6ZSA9ICcnO1xuICAgIHZhciBmb250RmFtaWx5ID0gJyc7XG4gICAgdmFyIHBhcnRzID0gY29tcHJlc3NTcGFjZXMoZm9udCkudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgdmFyIHNldCA9IHtcbiAgICAgIGZvbnRTaXplOiBmYWxzZSxcbiAgICAgIGZvbnRTdHlsZTogZmFsc2UsXG4gICAgICBmb250V2VpZ2h0OiBmYWxzZSxcbiAgICAgIGZvbnRWYXJpYW50OiBmYWxzZVxuICAgIH07XG4gICAgcGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlICFzZXQuZm9udFN0eWxlICYmIEZvbnQuc3R5bGVzLmluY2x1ZGVzKHBhcnQpOlxuICAgICAgICAgIGlmIChwYXJ0ICE9PSAnaW5oZXJpdCcpIHtcbiAgICAgICAgICAgIGZvbnRTdHlsZSA9IHBhcnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0LmZvbnRTdHlsZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAhc2V0LmZvbnRWYXJpYW50ICYmIEZvbnQudmFyaWFudHMuaW5jbHVkZXMocGFydCk6XG4gICAgICAgICAgaWYgKHBhcnQgIT09ICdpbmhlcml0Jykge1xuICAgICAgICAgICAgZm9udFZhcmlhbnQgPSBwYXJ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldC5mb250U3R5bGUgPSB0cnVlO1xuICAgICAgICAgIHNldC5mb250VmFyaWFudCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAhc2V0LmZvbnRXZWlnaHQgJiYgRm9udC53ZWlnaHRzLmluY2x1ZGVzKHBhcnQpOlxuICAgICAgICAgIGlmIChwYXJ0ICE9PSAnaW5oZXJpdCcpIHtcbiAgICAgICAgICAgIGZvbnRXZWlnaHQgPSBwYXJ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldC5mb250U3R5bGUgPSB0cnVlO1xuICAgICAgICAgIHNldC5mb250VmFyaWFudCA9IHRydWU7XG4gICAgICAgICAgc2V0LmZvbnRXZWlnaHQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgIXNldC5mb250U2l6ZTpcbiAgICAgICAgICBpZiAocGFydCAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICAgICAgICBbZm9udFNpemVdID0gcGFydC5zcGxpdCgnLycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldC5mb250U3R5bGUgPSB0cnVlO1xuICAgICAgICAgIHNldC5mb250VmFyaWFudCA9IHRydWU7XG4gICAgICAgICAgc2V0LmZvbnRXZWlnaHQgPSB0cnVlO1xuICAgICAgICAgIHNldC5mb250U2l6ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAocGFydCAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICAgICAgICBmb250RmFtaWx5ICs9IHBhcnQ7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBGb250KGZvbnRTdHlsZSwgZm9udFZhcmlhbnQsIGZvbnRXZWlnaHQsIGZvbnRTaXplLCBmb250RmFtaWx5LCBpbmhlcml0KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBbcHJlcGFyZUZvbnRTdHlsZSh0aGlzLmZvbnRTdHlsZSksIHRoaXMuZm9udFZhcmlhbnQsIHByZXBhcmVGb250V2VpZ2h0KHRoaXMuZm9udFdlaWdodCksIHRoaXMuZm9udFNpemUsIC8vIFdyYXAgZm9udEZhbWlseSBvbmx5IG9uIG5vZGVqcyBhbmQgb25seSBmb3IgY2FudmFzLmN0eFxuICAgIHByZXBhcmVGb250RmFtaWx5KHRoaXMuZm9udEZhbWlseSldLmpvaW4oJyAnKS50cmltKCk7XG4gIH1cblxufVxuRm9udC5zdHlsZXMgPSAnbm9ybWFsfGl0YWxpY3xvYmxpcXVlfGluaGVyaXQnO1xuRm9udC52YXJpYW50cyA9ICdub3JtYWx8c21hbGwtY2Fwc3xpbmhlcml0JztcbkZvbnQud2VpZ2h0cyA9ICdub3JtYWx8Ym9sZHxib2xkZXJ8bGlnaHRlcnwxMDB8MjAwfDMwMHw0MDB8NTAwfDYwMHw3MDB8ODAwfDkwMHxpbmhlcml0JztcblxuY2xhc3MgQm91bmRpbmdCb3gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB2YXIgeDEgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IE51bWJlci5OYU47XG4gICAgdmFyIHkxID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBOdW1iZXIuTmFOO1xuICAgIHZhciB4MiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogTnVtYmVyLk5hTjtcbiAgICB2YXIgeTIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IE51bWJlci5OYU47XG4gICAgdGhpcy54MSA9IHgxO1xuICAgIHRoaXMueTEgPSB5MTtcbiAgICB0aGlzLngyID0geDI7XG4gICAgdGhpcy55MiA9IHkyO1xuICAgIHRoaXMuYWRkUG9pbnQoeDEsIHkxKTtcbiAgICB0aGlzLmFkZFBvaW50KHgyLCB5Mik7XG4gIH1cblxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy54MTtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLnkxO1xuICB9XG5cbiAgZ2V0IHdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLngyIC0gdGhpcy54MTtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMueTIgLSB0aGlzLnkxO1xuICB9XG5cbiAgYWRkUG9pbnQoeCwgeSkge1xuICAgIGlmICh0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChpc05hTih0aGlzLngxKSB8fCBpc05hTih0aGlzLngyKSkge1xuICAgICAgICB0aGlzLngxID0geDtcbiAgICAgICAgdGhpcy54MiA9IHg7XG4gICAgICB9XG5cbiAgICAgIGlmICh4IDwgdGhpcy54MSkge1xuICAgICAgICB0aGlzLngxID0geDtcbiAgICAgIH1cblxuICAgICAgaWYgKHggPiB0aGlzLngyKSB7XG4gICAgICAgIHRoaXMueDIgPSB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChpc05hTih0aGlzLnkxKSB8fCBpc05hTih0aGlzLnkyKSkge1xuICAgICAgICB0aGlzLnkxID0geTtcbiAgICAgICAgdGhpcy55MiA9IHk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5IDwgdGhpcy55MSkge1xuICAgICAgICB0aGlzLnkxID0geTtcbiAgICAgIH1cblxuICAgICAgaWYgKHkgPiB0aGlzLnkyKSB7XG4gICAgICAgIHRoaXMueTIgPSB5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFgoeCkge1xuICAgIHRoaXMuYWRkUG9pbnQoeCwgbnVsbCk7XG4gIH1cblxuICBhZGRZKHkpIHtcbiAgICB0aGlzLmFkZFBvaW50KG51bGwsIHkpO1xuICB9XG5cbiAgYWRkQm91bmRpbmdCb3goYm91bmRpbmdCb3gpIHtcbiAgICBpZiAoIWJvdW5kaW5nQm94KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIHgxLFxuICAgICAgeTEsXG4gICAgICB4MixcbiAgICAgIHkyXG4gICAgfSA9IGJvdW5kaW5nQm94O1xuICAgIHRoaXMuYWRkUG9pbnQoeDEsIHkxKTtcbiAgICB0aGlzLmFkZFBvaW50KHgyLCB5Mik7XG4gIH1cblxuICBzdW1DdWJpYyh0LCBwMCwgcDEsIHAyLCBwMykge1xuICAgIHJldHVybiBNYXRoLnBvdygxIC0gdCwgMykgKiBwMCArIDMgKiBNYXRoLnBvdygxIC0gdCwgMikgKiB0ICogcDEgKyAzICogKDEgLSB0KSAqIE1hdGgucG93KHQsIDIpICogcDIgKyBNYXRoLnBvdyh0LCAzKSAqIHAzO1xuICB9XG5cbiAgYmV6aWVyQ3VydmVBZGQoZm9yWCwgcDAsIHAxLCBwMiwgcDMpIHtcbiAgICB2YXIgYiA9IDYgKiBwMCAtIDEyICogcDEgKyA2ICogcDI7XG4gICAgdmFyIGEgPSAtMyAqIHAwICsgOSAqIHAxIC0gOSAqIHAyICsgMyAqIHAzO1xuICAgIHZhciBjID0gMyAqIHAxIC0gMyAqIHAwO1xuXG4gICAgaWYgKGEgPT09IDApIHtcbiAgICAgIGlmIChiID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHQgPSAtYyAvIGI7XG5cbiAgICAgIGlmICgwIDwgdCAmJiB0IDwgMSkge1xuICAgICAgICBpZiAoZm9yWCkge1xuICAgICAgICAgIHRoaXMuYWRkWCh0aGlzLnN1bUN1YmljKHQsIHAwLCBwMSwgcDIsIHAzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hZGRZKHRoaXMuc3VtQ3ViaWModCwgcDAsIHAxLCBwMiwgcDMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGIyYWMgPSBNYXRoLnBvdyhiLCAyKSAtIDQgKiBjICogYTtcblxuICAgIGlmIChiMmFjIDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0MSA9ICgtYiArIE1hdGguc3FydChiMmFjKSkgLyAoMiAqIGEpO1xuXG4gICAgaWYgKDAgPCB0MSAmJiB0MSA8IDEpIHtcbiAgICAgIGlmIChmb3JYKSB7XG4gICAgICAgIHRoaXMuYWRkWCh0aGlzLnN1bUN1YmljKHQxLCBwMCwgcDEsIHAyLCBwMykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRZKHRoaXMuc3VtQ3ViaWModDEsIHAwLCBwMSwgcDIsIHAzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHQyID0gKC1iIC0gTWF0aC5zcXJ0KGIyYWMpKSAvICgyICogYSk7XG5cbiAgICBpZiAoMCA8IHQyICYmIHQyIDwgMSkge1xuICAgICAgaWYgKGZvclgpIHtcbiAgICAgICAgdGhpcy5hZGRYKHRoaXMuc3VtQ3ViaWModDIsIHAwLCBwMSwgcDIsIHAzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZFkodGhpcy5zdW1DdWJpYyh0MiwgcDAsIHAxLCBwMiwgcDMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gZnJvbSBodHRwOi8vYmxvZy5oYWNrZXJzLWNhZmUubmV0LzIwMDkvMDYvaG93LXRvLWNhbGN1bGF0ZS1iZXppZXItY3VydmVzLWJvdW5kaW5nLmh0bWxcblxuXG4gIGFkZEJlemllckN1cnZlKHAweCwgcDB5LCBwMXgsIHAxeSwgcDJ4LCBwMnksIHAzeCwgcDN5KSB7XG4gICAgdGhpcy5hZGRQb2ludChwMHgsIHAweSk7XG4gICAgdGhpcy5hZGRQb2ludChwM3gsIHAzeSk7XG4gICAgdGhpcy5iZXppZXJDdXJ2ZUFkZCh0cnVlLCBwMHgsIHAxeCwgcDJ4LCBwM3gpO1xuICAgIHRoaXMuYmV6aWVyQ3VydmVBZGQoZmFsc2UsIHAweSwgcDF5LCBwMnksIHAzeSk7XG4gIH1cblxuICBhZGRRdWFkcmF0aWNDdXJ2ZShwMHgsIHAweSwgcDF4LCBwMXksIHAyeCwgcDJ5KSB7XG4gICAgdmFyIGNwMXggPSBwMHggKyAyIC8gMyAqIChwMXggLSBwMHgpOyAvLyBDUDEgPSBRUDAgKyAyLzMgKihRUDEtUVAwKVxuXG4gICAgdmFyIGNwMXkgPSBwMHkgKyAyIC8gMyAqIChwMXkgLSBwMHkpOyAvLyBDUDEgPSBRUDAgKyAyLzMgKihRUDEtUVAwKVxuXG4gICAgdmFyIGNwMnggPSBjcDF4ICsgMSAvIDMgKiAocDJ4IC0gcDB4KTsgLy8gQ1AyID0gQ1AxICsgMS8zICooUVAyLVFQMClcblxuICAgIHZhciBjcDJ5ID0gY3AxeSArIDEgLyAzICogKHAyeSAtIHAweSk7IC8vIENQMiA9IENQMSArIDEvMyAqKFFQMi1RUDApXG5cbiAgICB0aGlzLmFkZEJlemllckN1cnZlKHAweCwgcDB5LCBjcDF4LCBjcDJ4LCBjcDF5LCBjcDJ5LCBwMngsIHAyeSk7XG4gIH1cblxuICBpc1BvaW50SW5Cb3goeCwgeSkge1xuICAgIHZhciB7XG4gICAgICB4MSxcbiAgICAgIHkxLFxuICAgICAgeDIsXG4gICAgICB5MlxuICAgIH0gPSB0aGlzO1xuICAgIHJldHVybiB4MSA8PSB4ICYmIHggPD0geDIgJiYgeTEgPD0geSAmJiB5IDw9IHkyO1xuICB9XG5cbn1cblxuY2xhc3MgUGF0aFBhcnNlciBleHRlbmRzIFNWR1BhdGhEYXRhIHtcbiAgY29uc3RydWN0b3IocGF0aCkge1xuICAgIHN1cGVyKHBhdGggLy8gRml4IHNwYWNlcyBhZnRlciBzaWducy5cbiAgICAucmVwbGFjZSgvKFsrXFwtLl0pXFxzKy9nbSwgJyQxJykgLy8gUmVtb3ZlIGludmFsaWQgcGFydC5cbiAgICAucmVwbGFjZSgvW15NbVp6TGxIaFZ2Q2NTc1FxVHRBYWVcXGRcXHMuLCstXS4qL2csICcnKSk7XG4gICAgdGhpcy5jb250cm9sID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0ID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgIHRoaXMuY29tbWFuZCA9IG51bGw7XG4gICAgdGhpcy5jb21tYW5kcyA9IHRoaXMuY29tbWFuZHM7XG4gICAgdGhpcy5pID0gLTE7XG4gICAgdGhpcy5wcmV2aW91c0NvbW1hbmQgPSBudWxsO1xuICAgIHRoaXMucG9pbnRzID0gW107XG4gICAgdGhpcy5hbmdsZXMgPSBbXTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaSA9IC0xO1xuICAgIHRoaXMuY29tbWFuZCA9IG51bGw7XG4gICAgdGhpcy5wcmV2aW91c0NvbW1hbmQgPSBudWxsO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgUG9pbnQoMCwgMCk7XG4gICAgdGhpcy5jb250cm9sID0gbmV3IFBvaW50KDAsIDApO1xuICAgIHRoaXMuY3VycmVudCA9IG5ldyBQb2ludCgwLCAwKTtcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgIHRoaXMuYW5nbGVzID0gW107XG4gIH1cblxuICBpc0VuZCgpIHtcbiAgICB2YXIge1xuICAgICAgaSxcbiAgICAgIGNvbW1hbmRzXG4gICAgfSA9IHRoaXM7XG4gICAgcmV0dXJuIGkgPj0gY29tbWFuZHMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzWysrdGhpcy5pXTtcbiAgICB0aGlzLnByZXZpb3VzQ29tbWFuZCA9IHRoaXMuY29tbWFuZDtcbiAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kO1xuICAgIHJldHVybiBjb21tYW5kO1xuICB9XG5cbiAgZ2V0UG9pbnQoKSB7XG4gICAgdmFyIHhQcm9wID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAneCc7XG4gICAgdmFyIHlQcm9wID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAneSc7XG4gICAgdmFyIHBvaW50ID0gbmV3IFBvaW50KHRoaXMuY29tbWFuZFt4UHJvcF0sIHRoaXMuY29tbWFuZFt5UHJvcF0pO1xuICAgIHJldHVybiB0aGlzLm1ha2VBYnNvbHV0ZShwb2ludCk7XG4gIH1cblxuICBnZXRBc0NvbnRyb2xQb2ludCh4UHJvcCwgeVByb3ApIHtcbiAgICB2YXIgcG9pbnQgPSB0aGlzLmdldFBvaW50KHhQcm9wLCB5UHJvcCk7XG4gICAgdGhpcy5jb250cm9sID0gcG9pbnQ7XG4gICAgcmV0dXJuIHBvaW50O1xuICB9XG5cbiAgZ2V0QXNDdXJyZW50UG9pbnQoeFByb3AsIHlQcm9wKSB7XG4gICAgdmFyIHBvaW50ID0gdGhpcy5nZXRQb2ludCh4UHJvcCwgeVByb3ApO1xuICAgIHRoaXMuY3VycmVudCA9IHBvaW50O1xuICAgIHJldHVybiBwb2ludDtcbiAgfVxuXG4gIGdldFJlZmxlY3RlZENvbnRyb2xQb2ludCgpIHtcbiAgICB2YXIgcHJldmlvdXNDb21tYW5kID0gdGhpcy5wcmV2aW91c0NvbW1hbmQudHlwZTtcblxuICAgIGlmIChwcmV2aW91c0NvbW1hbmQgIT09IFNWR1BhdGhEYXRhLkNVUlZFX1RPICYmIHByZXZpb3VzQ29tbWFuZCAhPT0gU1ZHUGF0aERhdGEuU01PT1RIX0NVUlZFX1RPICYmIHByZXZpb3VzQ29tbWFuZCAhPT0gU1ZHUGF0aERhdGEuUVVBRF9UTyAmJiBwcmV2aW91c0NvbW1hbmQgIT09IFNWR1BhdGhEYXRhLlNNT09USF9RVUFEX1RPKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICAgIH0gLy8gcmVmbGVjdCBwb2ludFxuXG5cbiAgICB2YXIge1xuICAgICAgY3VycmVudDoge1xuICAgICAgICB4OiBjeCxcbiAgICAgICAgeTogY3lcbiAgICAgIH0sXG4gICAgICBjb250cm9sOiB7XG4gICAgICAgIHg6IG94LFxuICAgICAgICB5OiBveVxuICAgICAgfVxuICAgIH0gPSB0aGlzO1xuICAgIHZhciBwb2ludCA9IG5ldyBQb2ludCgyICogY3ggLSBveCwgMiAqIGN5IC0gb3kpO1xuICAgIHJldHVybiBwb2ludDtcbiAgfVxuXG4gIG1ha2VBYnNvbHV0ZShwb2ludCkge1xuICAgIGlmICh0aGlzLmNvbW1hbmQucmVsYXRpdmUpIHtcbiAgICAgIHZhciB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0gPSB0aGlzLmN1cnJlbnQ7XG4gICAgICBwb2ludC54ICs9IHg7XG4gICAgICBwb2ludC55ICs9IHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50O1xuICB9XG5cbiAgYWRkTWFya2VyKHBvaW50LCBmcm9tLCBwcmlvclRvKSB7XG4gICAgdmFyIHtcbiAgICAgIHBvaW50cyxcbiAgICAgIGFuZ2xlc1xuICAgIH0gPSB0aGlzOyAvLyBpZiB0aGUgbGFzdCBhbmdsZSBpc24ndCBmaWxsZWQgaW4gYmVjYXVzZSB3ZSBkaWRuJ3QgaGF2ZSB0aGlzIHBvaW50IHlldCAuLi5cblxuICAgIGlmIChwcmlvclRvICYmIGFuZ2xlcy5sZW5ndGggPiAwICYmICFhbmdsZXNbYW5nbGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICBhbmdsZXNbYW5nbGVzLmxlbmd0aCAtIDFdID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXS5hbmdsZVRvKHByaW9yVG8pO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyQW5nbGUocG9pbnQsIGZyb20gPyBmcm9tLmFuZ2xlVG8ocG9pbnQpIDogbnVsbCk7XG4gIH1cblxuICBhZGRNYXJrZXJBbmdsZShwb2ludCwgYW5nbGUpIHtcbiAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KTtcbiAgICB0aGlzLmFuZ2xlcy5wdXNoKGFuZ2xlKTtcbiAgfVxuXG4gIGdldE1hcmtlclBvaW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5wb2ludHM7XG4gIH1cblxuICBnZXRNYXJrZXJBbmdsZXMoKSB7XG4gICAgdmFyIHtcbiAgICAgIGFuZ2xlc1xuICAgIH0gPSB0aGlzO1xuICAgIHZhciBsZW4gPSBhbmdsZXMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKCFhbmdsZXNbaV0pIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBpZiAoYW5nbGVzW2pdKSB7XG4gICAgICAgICAgICBhbmdsZXNbaV0gPSBhbmdsZXNbal07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5nbGVzO1xuICB9XG5cbn1cblxuY2xhc3MgUmVuZGVyZWRFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5tb2RpZmllZEVtU2l6ZVN0YWNrID0gZmFsc2U7XG4gIH1cblxuICBjYWxjdWxhdGVPcGFjaXR5KCkge1xuICAgIHZhciBvcGFjaXR5ID0gMS4wOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMsIGNvbnNpc3RlbnQtdGhpc1xuXG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgIHZhciBvcGFjaXR5U3R5bGUgPSBlbGVtZW50LmdldFN0eWxlKCdvcGFjaXR5JywgZmFsc2UsIHRydWUpOyAvLyBubyBhbmNlc3RvcnMgb24gc3R5bGUgY2FsbFxuXG4gICAgICBpZiAob3BhY2l0eVN0eWxlLmhhc1ZhbHVlKHRydWUpKSB7XG4gICAgICAgIG9wYWNpdHkgKj0gb3BhY2l0eVN0eWxlLmdldE51bWJlcigpO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wYWNpdHk7XG4gIH1cblxuICBzZXRDb250ZXh0KGN0eCkge1xuICAgIHZhciBmcm9tTWVhc3VyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICBpZiAoIWZyb21NZWFzdXJlKSB7XG4gICAgICAvLyBjYXVzZXMgc3RhY2sgb3ZlcmZsb3cgd2hlbiBtZWFzdXJpbmcgdGV4dCB3aXRoIGdyYWRpZW50c1xuICAgICAgLy8gZmlsbFxuICAgICAgdmFyIGZpbGxTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdmaWxsJyk7XG4gICAgICB2YXIgZmlsbE9wYWNpdHlTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdmaWxsLW9wYWNpdHknKTtcbiAgICAgIHZhciBzdHJva2VTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdzdHJva2UnKTtcbiAgICAgIHZhciBzdHJva2VPcGFjaXR5UHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ3N0cm9rZS1vcGFjaXR5Jyk7XG5cbiAgICAgIGlmIChmaWxsU3R5bGVQcm9wLmlzVXJsRGVmaW5pdGlvbigpKSB7XG4gICAgICAgIHZhciBmaWxsU3R5bGUgPSBmaWxsU3R5bGVQcm9wLmdldEZpbGxTdHlsZURlZmluaXRpb24odGhpcywgZmlsbE9wYWNpdHlTdHlsZVByb3ApO1xuXG4gICAgICAgIGlmIChmaWxsU3R5bGUpIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmlsbFN0eWxlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGZpbGxTdHlsZVByb3AuaGFzVmFsdWUoKSkge1xuICAgICAgICBpZiAoZmlsbFN0eWxlUHJvcC5nZXRTdHJpbmcoKSA9PT0gJ2N1cnJlbnRDb2xvcicpIHtcbiAgICAgICAgICBmaWxsU3R5bGVQcm9wLnNldFZhbHVlKHRoaXMuZ2V0U3R5bGUoJ2NvbG9yJykuZ2V0Q29sb3IoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2ZpbGxTdHlsZSA9IGZpbGxTdHlsZVByb3AuZ2V0Q29sb3IoKTtcblxuICAgICAgICBpZiAoX2ZpbGxTdHlsZSAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IF9maWxsU3R5bGUgPT09ICdub25lJyA/ICdyZ2JhKDAsMCwwLDApJyA6IF9maWxsU3R5bGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbGxPcGFjaXR5U3R5bGVQcm9wLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgdmFyIF9maWxsU3R5bGUyID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICdmaWxsJywgY3R4LmZpbGxTdHlsZSkuYWRkT3BhY2l0eShmaWxsT3BhY2l0eVN0eWxlUHJvcCkuZ2V0Q29sb3IoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gX2ZpbGxTdHlsZTI7XG4gICAgICB9IC8vIHN0cm9rZVxuXG5cbiAgICAgIGlmIChzdHJva2VTdHlsZVByb3AuaXNVcmxEZWZpbml0aW9uKCkpIHtcbiAgICAgICAgdmFyIHN0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGVQcm9wLmdldEZpbGxTdHlsZURlZmluaXRpb24odGhpcywgc3Ryb2tlT3BhY2l0eVByb3ApO1xuXG4gICAgICAgIGlmIChzdHJva2VTdHlsZSkge1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZVN0eWxlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHN0cm9rZVN0eWxlUHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGlmIChzdHJva2VTdHlsZVByb3AuZ2V0U3RyaW5nKCkgPT09ICdjdXJyZW50Q29sb3InKSB7XG4gICAgICAgICAgc3Ryb2tlU3R5bGVQcm9wLnNldFZhbHVlKHRoaXMuZ2V0U3R5bGUoJ2NvbG9yJykuZ2V0Q29sb3IoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGVQcm9wLmdldFN0cmluZygpO1xuXG4gICAgICAgIGlmIChfc3Ryb2tlU3R5bGUgIT09ICdpbmhlcml0Jykge1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IF9zdHJva2VTdHlsZSA9PT0gJ25vbmUnID8gJ3JnYmEoMCwwLDAsMCknIDogX3N0cm9rZVN0eWxlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHJva2VPcGFjaXR5UHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHZhciBfc3Ryb2tlU3R5bGUyID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICdzdHJva2UnLCBjdHguc3Ryb2tlU3R5bGUpLmFkZE9wYWNpdHkoc3Ryb2tlT3BhY2l0eVByb3ApLmdldFN0cmluZygpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IF9zdHJva2VTdHlsZTI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHJva2VXaWR0aFN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ3N0cm9rZS13aWR0aCcpO1xuXG4gICAgICBpZiAoc3Ryb2tlV2lkdGhTdHlsZVByb3AuaGFzVmFsdWUoKSkge1xuICAgICAgICB2YXIgbmV3TGluZVdpZHRoID0gc3Ryb2tlV2lkdGhTdHlsZVByb3AuZ2V0UGl4ZWxzKCk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAhbmV3TGluZVdpZHRoID8gUFNFVURPX1pFUk8gLy8gYnJvd3NlcnMgZG9uJ3QgcmVzcGVjdCAwIChvciBub2RlLWNhbnZhcz8gOi0pXG4gICAgICAgIDogbmV3TGluZVdpZHRoO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3Ryb2tlTGluZWNhcFN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ3N0cm9rZS1saW5lY2FwJyk7XG4gICAgICB2YXIgc3Ryb2tlTGluZWpvaW5TdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdzdHJva2UtbGluZWpvaW4nKTtcbiAgICAgIHZhciBzdHJva2VNaXRlcmxpbWl0UHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ3N0cm9rZS1taXRlcmxpbWl0Jyk7IC8vIE5FRUQgVEVTVFxuICAgICAgLy8gY29uc3QgcG9pbnRPcmRlclN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ3BhaW50LW9yZGVyJyk7XG5cbiAgICAgIHZhciBzdHJva2VEYXNoYXJyYXlTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdzdHJva2UtZGFzaGFycmF5Jyk7XG4gICAgICB2YXIgc3Ryb2tlRGFzaG9mZnNldFByb3AgPSB0aGlzLmdldFN0eWxlKCdzdHJva2UtZGFzaG9mZnNldCcpO1xuXG4gICAgICBpZiAoc3Ryb2tlTGluZWNhcFN0eWxlUHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGN0eC5saW5lQ2FwID0gc3Ryb2tlTGluZWNhcFN0eWxlUHJvcC5nZXRTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0cm9rZUxpbmVqb2luU3R5bGVQcm9wLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgY3R4LmxpbmVKb2luID0gc3Ryb2tlTGluZWpvaW5TdHlsZVByb3AuZ2V0U3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHJva2VNaXRlcmxpbWl0UHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGN0eC5taXRlckxpbWl0ID0gc3Ryb2tlTWl0ZXJsaW1pdFByb3AuZ2V0TnVtYmVyKCk7XG4gICAgICB9IC8vIE5FRUQgVEVTVFxuICAgICAgLy8gaWYgKHBvaW50T3JkZXJTdHlsZVByb3AuaGFzVmFsdWUoKSkge1xuICAgICAgLy8gXHQvLyA/XG4gICAgICAvLyBcdGN0eC5wYWludE9yZGVyID0gcG9pbnRPcmRlclN0eWxlUHJvcC5nZXRWYWx1ZSgpO1xuICAgICAgLy8gfVxuXG5cbiAgICAgIGlmIChzdHJva2VEYXNoYXJyYXlTdHlsZVByb3AuaGFzVmFsdWUoKSAmJiBzdHJva2VEYXNoYXJyYXlTdHlsZVByb3AuZ2V0U3RyaW5nKCkgIT09ICdub25lJykge1xuICAgICAgICB2YXIgZ2FwcyA9IHRvTnVtYmVycyhzdHJva2VEYXNoYXJyYXlTdHlsZVByb3AuZ2V0U3RyaW5nKCkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY3R4LnNldExpbmVEYXNoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGN0eC5zZXRMaW5lRGFzaChnYXBzKTtcbiAgICAgICAgfSBlbHNlIC8vIEB0cy1leHBlY3QtZXJyb3IgSGFuZGxlIGJyb3dzZXIgcHJlZml4LlxuICAgICAgICAgIGlmICh0eXBlb2YgY3R4LndlYmtpdExpbmVEYXNoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIYW5kbGUgYnJvd3NlciBwcmVmaXguXG4gICAgICAgICAgICBjdHgud2Via2l0TGluZURhc2ggPSBnYXBzO1xuICAgICAgICAgIH0gZWxzZSAvLyBAdHMtZXhwZWN0LWVycm9yIEhhbmRsZSBicm93c2VyIHByZWZpeC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3R4Lm1vekRhc2ggIT09ICd1bmRlZmluZWQnICYmICEoZ2Fwcy5sZW5ndGggPT09IDEgJiYgZ2Fwc1swXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIYW5kbGUgYnJvd3NlciBwcmVmaXguXG4gICAgICAgICAgICAgIGN0eC5tb3pEYXNoID0gZ2FwcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0ID0gc3Ryb2tlRGFzaG9mZnNldFByb3AuZ2V0UGl4ZWxzKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjdHgubGluZURhc2hPZmZzZXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY3R4LmxpbmVEYXNoT2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB9IGVsc2UgLy8gQHRzLWV4cGVjdC1lcnJvciBIYW5kbGUgYnJvd3NlciBwcmVmaXguXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdHgud2Via2l0TGluZURhc2hPZmZzZXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEhhbmRsZSBicm93c2VyIHByZWZpeC5cbiAgICAgICAgICAgIGN0eC53ZWJraXRMaW5lRGFzaE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICB9IGVsc2UgLy8gQHRzLWV4cGVjdC1lcnJvciBIYW5kbGUgYnJvd3NlciBwcmVmaXguXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN0eC5tb3pEYXNoT2Zmc2V0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEhhbmRsZSBicm93c2VyIHByZWZpeC5cbiAgICAgICAgICAgICAgY3R4Lm1vekRhc2hPZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBmb250XG5cblxuICAgIHRoaXMubW9kaWZpZWRFbVNpemVTdGFjayA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiBjdHguZm9udCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBmb250U3R5bGVQcm9wID0gdGhpcy5nZXRTdHlsZSgnZm9udCcpO1xuICAgICAgdmFyIGZvbnRTdHlsZVN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ2ZvbnQtc3R5bGUnKTtcbiAgICAgIHZhciBmb250VmFyaWFudFN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ2ZvbnQtdmFyaWFudCcpO1xuICAgICAgdmFyIGZvbnRXZWlnaHRTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdmb250LXdlaWdodCcpO1xuICAgICAgdmFyIGZvbnRTaXplU3R5bGVQcm9wID0gdGhpcy5nZXRTdHlsZSgnZm9udC1zaXplJyk7XG4gICAgICB2YXIgZm9udEZhbWlseVN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgICB2YXIgZm9udCA9IG5ldyBGb250KGZvbnRTdHlsZVN0eWxlUHJvcC5nZXRTdHJpbmcoKSwgZm9udFZhcmlhbnRTdHlsZVByb3AuZ2V0U3RyaW5nKCksIGZvbnRXZWlnaHRTdHlsZVByb3AuZ2V0U3RyaW5nKCksIGZvbnRTaXplU3R5bGVQcm9wLmhhc1ZhbHVlKCkgPyBcIlwiLmNvbmNhdChmb250U2l6ZVN0eWxlUHJvcC5nZXRQaXhlbHModHJ1ZSksIFwicHhcIikgOiAnJywgZm9udEZhbWlseVN0eWxlUHJvcC5nZXRTdHJpbmcoKSwgRm9udC5wYXJzZShmb250U3R5bGVQcm9wLmdldFN0cmluZygpLCBjdHguZm9udCkpO1xuICAgICAgZm9udFN0eWxlU3R5bGVQcm9wLnNldFZhbHVlKGZvbnQuZm9udFN0eWxlKTtcbiAgICAgIGZvbnRWYXJpYW50U3R5bGVQcm9wLnNldFZhbHVlKGZvbnQuZm9udFZhcmlhbnQpO1xuICAgICAgZm9udFdlaWdodFN0eWxlUHJvcC5zZXRWYWx1ZShmb250LmZvbnRXZWlnaHQpO1xuICAgICAgZm9udFNpemVTdHlsZVByb3Auc2V0VmFsdWUoZm9udC5mb250U2l6ZSk7XG4gICAgICBmb250RmFtaWx5U3R5bGVQcm9wLnNldFZhbHVlKGZvbnQuZm9udEZhbWlseSk7XG4gICAgICBjdHguZm9udCA9IGZvbnQudG9TdHJpbmcoKTtcblxuICAgICAgaWYgKGZvbnRTaXplU3R5bGVQcm9wLmlzUGl4ZWxzKCkpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5lbVNpemUgPSBmb250U2l6ZVN0eWxlUHJvcC5nZXRQaXhlbHMoKTtcbiAgICAgICAgdGhpcy5tb2RpZmllZEVtU2l6ZVN0YWNrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWZyb21NZWFzdXJlKSB7XG4gICAgICAvLyBlZmZlY3RzXG4gICAgICB0aGlzLmFwcGx5RWZmZWN0cyhjdHgpOyAvLyBvcGFjaXR5XG5cbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuY2FsY3VsYXRlT3BhY2l0eSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQ29udGV4dChjdHgpIHtcbiAgICBzdXBlci5jbGVhckNvbnRleHQoY3R4KTtcblxuICAgIGlmICh0aGlzLm1vZGlmaWVkRW1TaXplU3RhY2spIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQucG9wRW1TaXplKCk7XG4gICAgfVxuICB9XG5cbn1cblxuY2xhc3MgUGF0aEVsZW1lbnQgZXh0ZW5kcyBSZW5kZXJlZEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcykge1xuICAgIHN1cGVyKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKTtcbiAgICB0aGlzLnR5cGUgPSAncGF0aCc7XG4gICAgdGhpcy5wYXRoUGFyc2VyID0gbnVsbDtcbiAgICB0aGlzLnBhdGhQYXJzZXIgPSBuZXcgUGF0aFBhcnNlcih0aGlzLmdldEF0dHJpYnV0ZSgnZCcpLmdldFN0cmluZygpKTtcbiAgfVxuXG4gIHBhdGgoY3R4KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3goKTtcbiAgICBwYXRoUGFyc2VyLnJlc2V0KCk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKCFwYXRoUGFyc2VyLmlzRW5kKCkpIHtcbiAgICAgIHN3aXRjaCAocGF0aFBhcnNlci5uZXh0KCkudHlwZSkge1xuICAgICAgICBjYXNlIFBhdGhQYXJzZXIuTU9WRV9UTzpcbiAgICAgICAgICB0aGlzLnBhdGhNKGN0eCwgYm91bmRpbmdCb3gpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5MSU5FX1RPOlxuICAgICAgICAgIHRoaXMucGF0aEwoY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkhPUklaX0xJTkVfVE86XG4gICAgICAgICAgdGhpcy5wYXRoSChjdHgsIGJvdW5kaW5nQm94KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFBhdGhQYXJzZXIuVkVSVF9MSU5FX1RPOlxuICAgICAgICAgIHRoaXMucGF0aFYoY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkNVUlZFX1RPOlxuICAgICAgICAgIHRoaXMucGF0aEMoY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLlNNT09USF9DVVJWRV9UTzpcbiAgICAgICAgICB0aGlzLnBhdGhTKGN0eCwgYm91bmRpbmdCb3gpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5RVUFEX1RPOlxuICAgICAgICAgIHRoaXMucGF0aFEoY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLlNNT09USF9RVUFEX1RPOlxuICAgICAgICAgIHRoaXMucGF0aFQoY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkFSQzpcbiAgICAgICAgICB0aGlzLnBhdGhBKGN0eCwgYm91bmRpbmdCb3gpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5DTE9TRV9QQVRIOlxuICAgICAgICAgIHRoaXMucGF0aFooY3R4LCBib3VuZGluZ0JveCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kaW5nQm94O1xuICB9XG5cbiAgZ2V0Qm91bmRpbmdCb3goXykge1xuICAgIHJldHVybiB0aGlzLnBhdGgoKTtcbiAgfVxuXG4gIGdldE1hcmtlcnMoKSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgcG9pbnRzID0gcGF0aFBhcnNlci5nZXRNYXJrZXJQb2ludHMoKTtcbiAgICB2YXIgYW5nbGVzID0gcGF0aFBhcnNlci5nZXRNYXJrZXJBbmdsZXMoKTtcbiAgICB2YXIgbWFya2VycyA9IHBvaW50cy5tYXAoKHBvaW50LCBpKSA9PiBbcG9pbnQsIGFuZ2xlc1tpXV0pO1xuICAgIHJldHVybiBtYXJrZXJzO1xuICB9XG5cbiAgcmVuZGVyQ2hpbGRyZW4oY3R4KSB7XG4gICAgdGhpcy5wYXRoKGN0eCk7XG4gICAgdGhpcy5kb2N1bWVudC5zY3JlZW4ubW91c2UuY2hlY2tQYXRoKHRoaXMsIGN0eCk7XG4gICAgdmFyIGZpbGxSdWxlU3R5bGVQcm9wID0gdGhpcy5nZXRTdHlsZSgnZmlsbC1ydWxlJyk7XG5cbiAgICBpZiAoY3R4LmZpbGxTdHlsZSAhPT0gJycpIHtcbiAgICAgIGlmIChmaWxsUnVsZVN0eWxlUHJvcC5nZXRTdHJpbmcoJ2luaGVyaXQnKSAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICAgIGN0eC5maWxsKGZpbGxSdWxlU3R5bGVQcm9wLmdldFN0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGN0eC5zdHJva2VTdHlsZSAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcpLmdldFN0cmluZygpID09PSAnbm9uLXNjYWxpbmctc3Ryb2tlJykge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcblxuICAgIGlmIChtYXJrZXJzKSB7XG4gICAgICB2YXIgbWFya2Vyc0xhc3RJbmRleCA9IG1hcmtlcnMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBtYXJrZXJTdGFydFN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ21hcmtlci1zdGFydCcpO1xuICAgICAgdmFyIG1hcmtlck1pZFN0eWxlUHJvcCA9IHRoaXMuZ2V0U3R5bGUoJ21hcmtlci1taWQnKTtcbiAgICAgIHZhciBtYXJrZXJFbmRTdHlsZVByb3AgPSB0aGlzLmdldFN0eWxlKCdtYXJrZXItZW5kJyk7XG5cbiAgICAgIGlmIChtYXJrZXJTdGFydFN0eWxlUHJvcC5pc1VybERlZmluaXRpb24oKSkge1xuICAgICAgICB2YXIgbWFya2VyID0gbWFya2VyU3RhcnRTdHlsZVByb3AuZ2V0RGVmaW5pdGlvbigpO1xuICAgICAgICB2YXIgW3BvaW50LCBhbmdsZV0gPSBtYXJrZXJzWzBdO1xuICAgICAgICBtYXJrZXIucmVuZGVyKGN0eCwgcG9pbnQsIGFuZ2xlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcmtlck1pZFN0eWxlUHJvcC5pc1VybERlZmluaXRpb24oKSkge1xuICAgICAgICB2YXIgX21hcmtlciA9IG1hcmtlck1pZFN0eWxlUHJvcC5nZXREZWZpbml0aW9uKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBtYXJrZXJzTGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgICB2YXIgW19wb2ludCwgX2FuZ2xlXSA9IG1hcmtlcnNbaV07XG5cbiAgICAgICAgICBfbWFya2VyLnJlbmRlcihjdHgsIF9wb2ludCwgX2FuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWFya2VyRW5kU3R5bGVQcm9wLmlzVXJsRGVmaW5pdGlvbigpKSB7XG4gICAgICAgIHZhciBfbWFya2VyMiA9IG1hcmtlckVuZFN0eWxlUHJvcC5nZXREZWZpbml0aW9uKCk7XG5cbiAgICAgICAgdmFyIFtfcG9pbnQyLCBfYW5nbGUyXSA9IG1hcmtlcnNbbWFya2Vyc0xhc3RJbmRleF07XG5cbiAgICAgICAgX21hcmtlcjIucmVuZGVyKGN0eCwgX3BvaW50MiwgX2FuZ2xlMik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBhdGhNKHBhdGhQYXJzZXIpIHtcbiAgICB2YXIgcG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ3VycmVudFBvaW50KCk7XG4gICAgcGF0aFBhcnNlci5zdGFydCA9IHBhdGhQYXJzZXIuY3VycmVudDtcbiAgICByZXR1cm4ge1xuICAgICAgcG9pbnRcbiAgICB9O1xuICB9XG5cbiAgcGF0aE0oY3R4LCBib3VuZGluZ0JveCkge1xuICAgIHZhciB7XG4gICAgICBwYXRoUGFyc2VyXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHtcbiAgICAgIHBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhNKHBhdGhQYXJzZXIpO1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSBwb2ludDtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlcihwb2ludCk7XG4gICAgYm91bmRpbmdCb3guYWRkUG9pbnQoeCwgeSk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwYXRoTChwYXRoUGFyc2VyKSB7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnRcbiAgICB9ID0gcGF0aFBhcnNlcjtcbiAgICB2YXIgcG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ3VycmVudFBvaW50KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBwb2ludFxuICAgIH07XG4gIH1cblxuICBwYXRoTChjdHgsIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgY3VycmVudCxcbiAgICAgIHBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhMKHBhdGhQYXJzZXIpO1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSBwb2ludDtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlcihwb2ludCwgY3VycmVudCk7XG4gICAgYm91bmRpbmdCb3guYWRkUG9pbnQoeCwgeSk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwYXRoSChwYXRoUGFyc2VyKSB7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb21tYW5kXG4gICAgfSA9IHBhdGhQYXJzZXI7XG4gICAgdmFyIHBvaW50ID0gbmV3IFBvaW50KChjb21tYW5kLnJlbGF0aXZlID8gY3VycmVudC54IDogMCkgKyBjb21tYW5kLngsIGN1cnJlbnQueSk7XG4gICAgcGF0aFBhcnNlci5jdXJyZW50ID0gcG9pbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBwb2ludFxuICAgIH07XG4gIH1cblxuICBwYXRoSChjdHgsIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgY3VycmVudCxcbiAgICAgIHBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhIKHBhdGhQYXJzZXIpO1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSBwb2ludDtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlcihwb2ludCwgY3VycmVudCk7XG4gICAgYm91bmRpbmdCb3guYWRkUG9pbnQoeCwgeSk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwYXRoVihwYXRoUGFyc2VyKSB7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb21tYW5kXG4gICAgfSA9IHBhdGhQYXJzZXI7XG4gICAgdmFyIHBvaW50ID0gbmV3IFBvaW50KGN1cnJlbnQueCwgKGNvbW1hbmQucmVsYXRpdmUgPyBjdXJyZW50LnkgOiAwKSArIGNvbW1hbmQueSk7XG4gICAgcGF0aFBhcnNlci5jdXJyZW50ID0gcG9pbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBwb2ludFxuICAgIH07XG4gIH1cblxuICBwYXRoVihjdHgsIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgY3VycmVudCxcbiAgICAgIHBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhWKHBhdGhQYXJzZXIpO1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSBwb2ludDtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlcihwb2ludCwgY3VycmVudCk7XG4gICAgYm91bmRpbmdCb3guYWRkUG9pbnQoeCwgeSk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwYXRoQyhwYXRoUGFyc2VyKSB7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnRcbiAgICB9ID0gcGF0aFBhcnNlcjtcbiAgICB2YXIgcG9pbnQgPSBwYXRoUGFyc2VyLmdldFBvaW50KCd4MScsICd5MScpO1xuICAgIHZhciBjb250cm9sUG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ29udHJvbFBvaW50KCd4MicsICd5MicpO1xuICAgIHZhciBjdXJyZW50UG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ3VycmVudFBvaW50KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBwb2ludCxcbiAgICAgIGNvbnRyb2xQb2ludCxcbiAgICAgIGN1cnJlbnRQb2ludFxuICAgIH07XG4gIH1cblxuICBwYXRoQyhjdHgsIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgY3VycmVudCxcbiAgICAgIHBvaW50LFxuICAgICAgY29udHJvbFBvaW50LFxuICAgICAgY3VycmVudFBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhDKHBhdGhQYXJzZXIpO1xuICAgIHBhdGhQYXJzZXIuYWRkTWFya2VyKGN1cnJlbnRQb2ludCwgY29udHJvbFBvaW50LCBwb2ludCk7XG4gICAgYm91bmRpbmdCb3guYWRkQmV6aWVyQ3VydmUoY3VycmVudC54LCBjdXJyZW50LnksIHBvaW50LngsIHBvaW50LnksIGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHBvaW50LngsIHBvaW50LnksIGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGF0aFMocGF0aFBhcnNlcikge1xuICAgIHZhciB7XG4gICAgICBjdXJyZW50XG4gICAgfSA9IHBhdGhQYXJzZXI7XG4gICAgdmFyIHBvaW50ID0gcGF0aFBhcnNlci5nZXRSZWZsZWN0ZWRDb250cm9sUG9pbnQoKTtcbiAgICB2YXIgY29udHJvbFBvaW50ID0gcGF0aFBhcnNlci5nZXRBc0NvbnRyb2xQb2ludCgneDInLCAneTInKTtcbiAgICB2YXIgY3VycmVudFBvaW50ID0gcGF0aFBhcnNlci5nZXRBc0N1cnJlbnRQb2ludCgpO1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50LFxuICAgICAgcG9pbnQsXG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9O1xuICB9XG5cbiAgcGF0aFMoY3R4LCBib3VuZGluZ0JveCkge1xuICAgIHZhciB7XG4gICAgICBwYXRoUGFyc2VyXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBwb2ludCxcbiAgICAgIGNvbnRyb2xQb2ludCxcbiAgICAgIGN1cnJlbnRQb2ludFxuICAgIH0gPSBQYXRoRWxlbWVudC5wYXRoUyhwYXRoUGFyc2VyKTtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlcihjdXJyZW50UG9pbnQsIGNvbnRyb2xQb2ludCwgcG9pbnQpO1xuICAgIGJvdW5kaW5nQm94LmFkZEJlemllckN1cnZlKGN1cnJlbnQueCwgY3VycmVudC55LCBwb2ludC54LCBwb2ludC55LCBjb250cm9sUG9pbnQueCwgY29udHJvbFBvaW50LnksIGN1cnJlbnRQb2ludC54LCBjdXJyZW50UG9pbnQueSk7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHguYmV6aWVyQ3VydmVUbyhwb2ludC54LCBwb2ludC55LCBjb250cm9sUG9pbnQueCwgY29udHJvbFBvaW50LnksIGN1cnJlbnRQb2ludC54LCBjdXJyZW50UG9pbnQueSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBhdGhRKHBhdGhQYXJzZXIpIHtcbiAgICB2YXIge1xuICAgICAgY3VycmVudFxuICAgIH0gPSBwYXRoUGFyc2VyO1xuICAgIHZhciBjb250cm9sUG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ29udHJvbFBvaW50KCd4MScsICd5MScpO1xuICAgIHZhciBjdXJyZW50UG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ3VycmVudFBvaW50KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9O1xuICB9XG5cbiAgcGF0aFEoY3R4LCBib3VuZGluZ0JveCkge1xuICAgIHZhciB7XG4gICAgICBwYXRoUGFyc2VyXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9ID0gUGF0aEVsZW1lbnQucGF0aFEocGF0aFBhcnNlcik7XG4gICAgcGF0aFBhcnNlci5hZGRNYXJrZXIoY3VycmVudFBvaW50LCBjb250cm9sUG9pbnQsIGNvbnRyb2xQb2ludCk7XG4gICAgYm91bmRpbmdCb3guYWRkUXVhZHJhdGljQ3VydmUoY3VycmVudC54LCBjdXJyZW50LnksIGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGF0aFQocGF0aFBhcnNlcikge1xuICAgIHZhciB7XG4gICAgICBjdXJyZW50XG4gICAgfSA9IHBhdGhQYXJzZXI7XG4gICAgdmFyIGNvbnRyb2xQb2ludCA9IHBhdGhQYXJzZXIuZ2V0UmVmbGVjdGVkQ29udHJvbFBvaW50KCk7XG4gICAgcGF0aFBhcnNlci5jb250cm9sID0gY29udHJvbFBvaW50O1xuICAgIHZhciBjdXJyZW50UG9pbnQgPSBwYXRoUGFyc2VyLmdldEFzQ3VycmVudFBvaW50KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9O1xuICB9XG5cbiAgcGF0aFQoY3R4LCBib3VuZGluZ0JveCkge1xuICAgIHZhciB7XG4gICAgICBwYXRoUGFyc2VyXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHtcbiAgICAgIGN1cnJlbnQsXG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9ID0gUGF0aEVsZW1lbnQucGF0aFQocGF0aFBhcnNlcik7XG4gICAgcGF0aFBhcnNlci5hZGRNYXJrZXIoY3VycmVudFBvaW50LCBjb250cm9sUG9pbnQsIGNvbnRyb2xQb2ludCk7XG4gICAgYm91bmRpbmdCb3guYWRkUXVhZHJhdGljQ3VydmUoY3VycmVudC54LCBjdXJyZW50LnksIGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGF0aEEocGF0aFBhcnNlcikge1xuICAgIHZhciB7XG4gICAgICBjdXJyZW50LFxuICAgICAgY29tbWFuZFxuICAgIH0gPSBwYXRoUGFyc2VyO1xuICAgIHZhciB7XG4gICAgICByWCxcbiAgICAgIHJZLFxuICAgICAgeFJvdCxcbiAgICAgIGxBcmNGbGFnLFxuICAgICAgc3dlZXBGbGFnXG4gICAgfSA9IGNvbW1hbmQ7XG4gICAgdmFyIHhBeGlzUm90YXRpb24gPSB4Um90ICogKE1hdGguUEkgLyAxODAuMCk7XG4gICAgdmFyIGN1cnJlbnRQb2ludCA9IHBhdGhQYXJzZXIuZ2V0QXNDdXJyZW50UG9pbnQoKTsgLy8gQ29udmVyc2lvbiBmcm9tIGVuZHBvaW50IHRvIGNlbnRlciBwYXJhbWV0ZXJpemF0aW9uXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvaW1wbG5vdGUuaHRtbCNBcmNJbXBsZW1lbnRhdGlvbk5vdGVzXG4gICAgLy8geDEnLCB5MSdcblxuICAgIHZhciBjdXJycCA9IG5ldyBQb2ludChNYXRoLmNvcyh4QXhpc1JvdGF0aW9uKSAqIChjdXJyZW50LnggLSBjdXJyZW50UG9pbnQueCkgLyAyLjAgKyBNYXRoLnNpbih4QXhpc1JvdGF0aW9uKSAqIChjdXJyZW50LnkgLSBjdXJyZW50UG9pbnQueSkgLyAyLjAsIC1NYXRoLnNpbih4QXhpc1JvdGF0aW9uKSAqIChjdXJyZW50LnggLSBjdXJyZW50UG9pbnQueCkgLyAyLjAgKyBNYXRoLmNvcyh4QXhpc1JvdGF0aW9uKSAqIChjdXJyZW50LnkgLSBjdXJyZW50UG9pbnQueSkgLyAyLjApOyAvLyBhZGp1c3QgcmFkaWlcblxuICAgIHZhciBsID0gTWF0aC5wb3coY3VycnAueCwgMikgLyBNYXRoLnBvdyhyWCwgMikgKyBNYXRoLnBvdyhjdXJycC55LCAyKSAvIE1hdGgucG93KHJZLCAyKTtcblxuICAgIGlmIChsID4gMSkge1xuICAgICAgclggKj0gTWF0aC5zcXJ0KGwpO1xuICAgICAgclkgKj0gTWF0aC5zcXJ0KGwpO1xuICAgIH0gLy8gY3gnLCBjeSdcblxuXG4gICAgdmFyIHMgPSAobEFyY0ZsYWcgPT09IHN3ZWVwRmxhZyA/IC0xIDogMSkgKiBNYXRoLnNxcnQoKE1hdGgucG93KHJYLCAyKSAqIE1hdGgucG93KHJZLCAyKSAtIE1hdGgucG93KHJYLCAyKSAqIE1hdGgucG93KGN1cnJwLnksIDIpIC0gTWF0aC5wb3coclksIDIpICogTWF0aC5wb3coY3VycnAueCwgMikpIC8gKE1hdGgucG93KHJYLCAyKSAqIE1hdGgucG93KGN1cnJwLnksIDIpICsgTWF0aC5wb3coclksIDIpICogTWF0aC5wb3coY3VycnAueCwgMikpKTtcblxuICAgIGlmIChpc05hTihzKSkge1xuICAgICAgcyA9IDA7XG4gICAgfVxuXG4gICAgdmFyIGNwcCA9IG5ldyBQb2ludChzICogclggKiBjdXJycC55IC8gclksIHMgKiAtclkgKiBjdXJycC54IC8gclgpOyAvLyBjeCwgY3lcblxuICAgIHZhciBjZW50cCA9IG5ldyBQb2ludCgoY3VycmVudC54ICsgY3VycmVudFBvaW50LngpIC8gMi4wICsgTWF0aC5jb3MoeEF4aXNSb3RhdGlvbikgKiBjcHAueCAtIE1hdGguc2luKHhBeGlzUm90YXRpb24pICogY3BwLnksIChjdXJyZW50LnkgKyBjdXJyZW50UG9pbnQueSkgLyAyLjAgKyBNYXRoLnNpbih4QXhpc1JvdGF0aW9uKSAqIGNwcC54ICsgTWF0aC5jb3MoeEF4aXNSb3RhdGlvbikgKiBjcHAueSk7IC8vIGluaXRpYWwgYW5nbGVcblxuICAgIHZhciBhMSA9IHZlY3RvcnNBbmdsZShbMSwgMF0sIFsoY3VycnAueCAtIGNwcC54KSAvIHJYLCAoY3VycnAueSAtIGNwcC55KSAvIHJZXSk7IC8vIM64MVxuICAgIC8vIGFuZ2xlIGRlbHRhXG5cbiAgICB2YXIgdSA9IFsoY3VycnAueCAtIGNwcC54KSAvIHJYLCAoY3VycnAueSAtIGNwcC55KSAvIHJZXTtcbiAgICB2YXIgdiA9IFsoLWN1cnJwLnggLSBjcHAueCkgLyByWCwgKC1jdXJycC55IC0gY3BwLnkpIC8gclldO1xuICAgIHZhciBhZCA9IHZlY3RvcnNBbmdsZSh1LCB2KTsgLy8gzpTOuFxuXG4gICAgaWYgKHZlY3RvcnNSYXRpbyh1LCB2KSA8PSAtMSkge1xuICAgICAgYWQgPSBNYXRoLlBJO1xuICAgIH1cblxuICAgIGlmICh2ZWN0b3JzUmF0aW8odSwgdikgPj0gMSkge1xuICAgICAgYWQgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UG9pbnQsXG4gICAgICByWCxcbiAgICAgIHJZLFxuICAgICAgc3dlZXBGbGFnLFxuICAgICAgeEF4aXNSb3RhdGlvbixcbiAgICAgIGNlbnRwLFxuICAgICAgYTEsXG4gICAgICBhZFxuICAgIH07XG4gIH1cblxuICBwYXRoQShjdHgsIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgY3VycmVudFBvaW50LFxuICAgICAgclgsXG4gICAgICByWSxcbiAgICAgIHN3ZWVwRmxhZyxcbiAgICAgIHhBeGlzUm90YXRpb24sXG4gICAgICBjZW50cCxcbiAgICAgIGExLFxuICAgICAgYWRcbiAgICB9ID0gUGF0aEVsZW1lbnQucGF0aEEocGF0aFBhcnNlcik7IC8vIGZvciBtYXJrZXJzXG5cbiAgICB2YXIgZGlyID0gMSAtIHN3ZWVwRmxhZyA/IDEuMCA6IC0xLjA7XG4gICAgdmFyIGFoID0gYTEgKyBkaXIgKiAoYWQgLyAyLjApO1xuICAgIHZhciBoYWxmV2F5ID0gbmV3IFBvaW50KGNlbnRwLnggKyByWCAqIE1hdGguY29zKGFoKSwgY2VudHAueSArIHJZICogTWF0aC5zaW4oYWgpKTtcbiAgICBwYXRoUGFyc2VyLmFkZE1hcmtlckFuZ2xlKGhhbGZXYXksIGFoIC0gZGlyICogTWF0aC5QSSAvIDIpO1xuICAgIHBhdGhQYXJzZXIuYWRkTWFya2VyQW5nbGUoY3VycmVudFBvaW50LCBhaCAtIGRpciAqIE1hdGguUEkpO1xuICAgIGJvdW5kaW5nQm94LmFkZFBvaW50KGN1cnJlbnRQb2ludC54LCBjdXJyZW50UG9pbnQueSk7IC8vIFRPRE86IHRoaXMgaXMgdG9vIG5haXZlLCBtYWtlIGl0IGJldHRlclxuXG4gICAgaWYgKGN0eCAmJiAhaXNOYU4oYTEpICYmICFpc05hTihhZCkpIHtcbiAgICAgIHZhciByID0gclggPiByWSA/IHJYIDogclk7XG4gICAgICB2YXIgc3ggPSByWCA+IHJZID8gMSA6IHJYIC8gclk7XG4gICAgICB2YXIgc3kgPSByWCA+IHJZID8gclkgLyByWCA6IDE7XG4gICAgICBjdHgudHJhbnNsYXRlKGNlbnRwLngsIGNlbnRwLnkpO1xuICAgICAgY3R4LnJvdGF0ZSh4QXhpc1JvdGF0aW9uKTtcbiAgICAgIGN0eC5zY2FsZShzeCwgc3kpO1xuICAgICAgY3R4LmFyYygwLCAwLCByLCBhMSwgYTEgKyBhZCwgQm9vbGVhbigxIC0gc3dlZXBGbGFnKSk7XG4gICAgICBjdHguc2NhbGUoMSAvIHN4LCAxIC8gc3kpO1xuICAgICAgY3R4LnJvdGF0ZSgteEF4aXNSb3RhdGlvbik7XG4gICAgICBjdHgudHJhbnNsYXRlKC1jZW50cC54LCAtY2VudHAueSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBhdGhaKHBhdGhQYXJzZXIpIHtcbiAgICBwYXRoUGFyc2VyLmN1cnJlbnQgPSBwYXRoUGFyc2VyLnN0YXJ0O1xuICB9XG5cbiAgcGF0aFooY3R4LCBib3VuZGluZ0JveCkge1xuICAgIFBhdGhFbGVtZW50LnBhdGhaKHRoaXMucGF0aFBhcnNlcik7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICAvLyBvbmx5IGNsb3NlIHBhdGggaWYgaXQgaXMgbm90IGEgc3RyYWlnaHQgbGluZVxuICAgICAgaWYgKGJvdW5kaW5nQm94LngxICE9PSBib3VuZGluZ0JveC54MiAmJiBib3VuZGluZ0JveC55MSAhPT0gYm91bmRpbmdCb3gueTIpIHtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cbmNsYXNzIEdseXBoRWxlbWVudCBleHRlbmRzIFBhdGhFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2dseXBoJztcbiAgICB0aGlzLmhvcml6QWR2WCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdob3Jpei1hZHYteCcpLmdldE51bWJlcigpO1xuICAgIHRoaXMudW5pY29kZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCd1bmljb2RlJykuZ2V0U3RyaW5nKCk7XG4gICAgdGhpcy5hcmFiaWNGb3JtID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2FyYWJpYy1mb3JtJykuZ2V0U3RyaW5nKCk7XG4gIH1cblxufVxuXG5jbGFzcyBUZXh0RWxlbWVudCBleHRlbmRzIFJlbmRlcmVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIG5vZGUsIG5ldy50YXJnZXQgPT09IFRleHRFbGVtZW50ID8gdHJ1ZSA6IGNhcHR1cmVUZXh0Tm9kZXMpO1xuICAgIHRoaXMudHlwZSA9ICd0ZXh0JztcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy5tZWFzdXJlQ2FjaGUgPSAtMTtcbiAgfVxuXG4gIHNldENvbnRleHQoY3R4KSB7XG4gICAgdmFyIGZyb21NZWFzdXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcbiAgICBzdXBlci5zZXRDb250ZXh0KGN0eCwgZnJvbU1lYXN1cmUpO1xuICAgIHZhciB0ZXh0QmFzZWxpbmUgPSB0aGlzLmdldFN0eWxlKCdkb21pbmFudC1iYXNlbGluZScpLmdldFRleHRCYXNlbGluZSgpIHx8IHRoaXMuZ2V0U3R5bGUoJ2FsaWdubWVudC1iYXNlbGluZScpLmdldFRleHRCYXNlbGluZSgpO1xuXG4gICAgaWYgKHRleHRCYXNlbGluZSkge1xuICAgICAgY3R4LnRleHRCYXNlbGluZSA9IHRleHRCYXNlbGluZTtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplQ29vcmRpbmF0ZXMoKSB7XG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMubGVhZlRleHRzID0gW107XG4gICAgdGhpcy50ZXh0Q2h1bmtTdGFydCA9IDA7XG4gICAgdGhpcy5taW5YID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIHRoaXMubWF4WCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgfVxuXG4gIGdldEJvdW5kaW5nQm94KGN0eCkge1xuICAgIGlmICh0aGlzLnR5cGUgIT09ICd0ZXh0Jykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VEVsZW1lbnRCb3VuZGluZ0JveChjdHgpO1xuICAgIH0gLy8gZmlyc3QsIGNhbGN1bGF0ZSBjaGlsZCBwb3NpdGlvbnNcblxuXG4gICAgdGhpcy5pbml0aWFsaXplQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmFkanVzdENoaWxkQ29vcmRpbmF0ZXNSZWN1cnNpdmUoY3R4KTtcbiAgICB2YXIgYm91bmRpbmdCb3ggPSBudWxsOyAvLyB0aGVuIGNhbGN1bGF0ZSBib3VuZGluZyBib3hcblxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgdmFyIGNoaWxkQm91bmRpbmdCb3ggPSB0aGlzLmdldENoaWxkQm91bmRpbmdCb3goY3R4LCB0aGlzLCB0aGlzLCBpKTtcblxuICAgICAgaWYgKCFib3VuZGluZ0JveCkge1xuICAgICAgICBib3VuZGluZ0JveCA9IGNoaWxkQm91bmRpbmdCb3g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib3VuZGluZ0JveC5hZGRCb3VuZGluZ0JveChjaGlsZEJvdW5kaW5nQm94KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYm91bmRpbmdCb3g7XG4gIH1cblxuICBnZXRGb250U2l6ZSgpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnQsXG4gICAgICBwYXJlbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgaW5oZXJpdEZvbnRTaXplID0gRm9udC5wYXJzZShkb2N1bWVudC5jdHguZm9udCkuZm9udFNpemU7XG4gICAgdmFyIGZvbnRTaXplID0gcGFyZW50LmdldFN0eWxlKCdmb250LXNpemUnKS5nZXROdW1iZXIoaW5oZXJpdEZvbnRTaXplKTtcbiAgICByZXR1cm4gZm9udFNpemU7XG4gIH1cblxuICBnZXRURWxlbWVudEJvdW5kaW5nQm94KGN0eCkge1xuICAgIHZhciBmb250U2l6ZSA9IHRoaXMuZ2V0Rm9udFNpemUoKTtcbiAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHRoaXMueCwgdGhpcy55IC0gZm9udFNpemUsIHRoaXMueCArIHRoaXMubWVhc3VyZVRleHQoY3R4KSwgdGhpcy55KTtcbiAgfVxuXG4gIGdldEdseXBoKGZvbnQsIHRleHQsIGkpIHtcbiAgICB2YXIgY2hhciA9IHRleHRbaV07XG4gICAgdmFyIGdseXBoID0gbnVsbDtcblxuICAgIGlmIChmb250LmlzQXJhYmljKSB7XG4gICAgICB2YXIgbGVuID0gdGV4dC5sZW5ndGg7XG4gICAgICB2YXIgcHJldkNoYXIgPSB0ZXh0W2kgLSAxXTtcbiAgICAgIHZhciBuZXh0Q2hhciA9IHRleHRbaSArIDFdO1xuICAgICAgdmFyIGFyYWJpY0Zvcm0gPSAnaXNvbGF0ZWQnO1xuXG4gICAgICBpZiAoKGkgPT09IDAgfHwgcHJldkNoYXIgPT09ICcgJykgJiYgaSA8IGxlbiAtIDEgJiYgbmV4dENoYXIgIT09ICcgJykge1xuICAgICAgICBhcmFiaWNGb3JtID0gJ3Rlcm1pbmFsJztcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPiAwICYmIHByZXZDaGFyICE9PSAnICcgJiYgaSA8IGxlbiAtIDEgJiYgbmV4dENoYXIgIT09ICcgJykge1xuICAgICAgICBhcmFiaWNGb3JtID0gJ21lZGlhbCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID4gMCAmJiBwcmV2Q2hhciAhPT0gJyAnICYmIChpID09PSBsZW4gLSAxIHx8IG5leHRDaGFyID09PSAnICcpKSB7XG4gICAgICAgIGFyYWJpY0Zvcm0gPSAnaW5pdGlhbCc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZm9udC5nbHlwaHNbY2hhcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIE5FRUQgVEVTVFxuICAgICAgICB2YXIgbWF5YmVHbHlwaCA9IGZvbnQuZ2x5cGhzW2NoYXJdO1xuICAgICAgICBnbHlwaCA9IG1heWJlR2x5cGggaW5zdGFuY2VvZiBHbHlwaEVsZW1lbnQgPyBtYXliZUdseXBoIDogbWF5YmVHbHlwaFthcmFiaWNGb3JtXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZ2x5cGggPSBmb250LmdseXBoc1tjaGFyXTtcbiAgICB9XG5cbiAgICBpZiAoIWdseXBoKSB7XG4gICAgICBnbHlwaCA9IGZvbnQubWlzc2luZ0dseXBoO1xuICAgIH1cblxuICAgIHJldHVybiBnbHlwaDtcbiAgfVxuXG4gIGdldFRleHQoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0VGV4dEZyb21Ob2RlKG5vZGUpIHtcbiAgICB2YXIgdGV4dE5vZGUgPSBub2RlIHx8IHRoaXMubm9kZTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IEFycmF5LmZyb20odGV4dE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzKTtcbiAgICB2YXIgaW5kZXggPSBjaGlsZE5vZGVzLmluZGV4T2YodGV4dE5vZGUpO1xuICAgIHZhciBsYXN0SW5kZXggPSBjaGlsZE5vZGVzLmxlbmd0aCAtIDE7XG4gICAgdmFyIHRleHQgPSBjb21wcmVzc1NwYWNlcyggLy8gdGV4dE5vZGUudmFsdWVcbiAgICAvLyB8fCB0ZXh0Tm9kZS50ZXh0XG4gICAgdGV4dE5vZGUudGV4dENvbnRlbnQgfHwgJycpO1xuXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICB0ZXh0ID0gdHJpbUxlZnQodGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID09PSBsYXN0SW5kZXgpIHtcbiAgICAgIHRleHQgPSB0cmltUmlnaHQodGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICByZW5kZXJDaGlsZHJlbihjdHgpIHtcbiAgICBpZiAodGhpcy50eXBlICE9PSAndGV4dCcpIHtcbiAgICAgIHRoaXMucmVuZGVyVEVsZW1lbnRDaGlsZHJlbihjdHgpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gZmlyc3QsIGNhbGN1bGF0ZSBjaGlsZCBwb3NpdGlvbnNcblxuXG4gICAgdGhpcy5pbml0aWFsaXplQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmFkanVzdENoaWxkQ29vcmRpbmF0ZXNSZWN1cnNpdmUoY3R4KTsgLy8gdGhlbiByZW5kZXJcblxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJDaGlsZChjdHgsIHRoaXMsIHRoaXMsIGkpO1xuICAgIH0pO1xuICAgIHZhciB7XG4gICAgICBtb3VzZVxuICAgIH0gPSB0aGlzLmRvY3VtZW50LnNjcmVlbjsgLy8gRG8gbm90IGNhbGMgYm91bmRpbmcgYm94IGlmIG1vdXNlIGlzIG5vdCB3b3JraW5nLlxuXG4gICAgaWYgKG1vdXNlLmlzV29ya2luZygpKSB7XG4gICAgICBtb3VzZS5jaGVja0JvdW5kaW5nQm94KHRoaXMsIHRoaXMuZ2V0Qm91bmRpbmdCb3goY3R4KSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVEVsZW1lbnRDaGlsZHJlbihjdHgpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnQsXG4gICAgICBwYXJlbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgcmVuZGVyVGV4dCA9IHRoaXMuZ2V0VGV4dCgpO1xuICAgIHZhciBjdXN0b21Gb250ID0gcGFyZW50LmdldFN0eWxlKCdmb250LWZhbWlseScpLmdldERlZmluaXRpb24oKTtcblxuICAgIGlmIChjdXN0b21Gb250KSB7XG4gICAgICB2YXIge1xuICAgICAgICB1bml0c1BlckVtXG4gICAgICB9ID0gY3VzdG9tRm9udC5mb250RmFjZTtcbiAgICAgIHZhciBjdHhGb250ID0gRm9udC5wYXJzZShkb2N1bWVudC5jdHguZm9udCk7XG4gICAgICB2YXIgZm9udFNpemUgPSBwYXJlbnQuZ2V0U3R5bGUoJ2ZvbnQtc2l6ZScpLmdldE51bWJlcihjdHhGb250LmZvbnRTaXplKTtcbiAgICAgIHZhciBmb250U3R5bGUgPSBwYXJlbnQuZ2V0U3R5bGUoJ2ZvbnQtc3R5bGUnKS5nZXRTdHJpbmcoY3R4Rm9udC5mb250U3R5bGUpO1xuICAgICAgdmFyIHNjYWxlID0gZm9udFNpemUgLyB1bml0c1BlckVtO1xuICAgICAgdmFyIHRleHQgPSBjdXN0b21Gb250LmlzUlRMID8gcmVuZGVyVGV4dC5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogcmVuZGVyVGV4dDtcbiAgICAgIHZhciBkeCA9IHRvTnVtYmVycyhwYXJlbnQuZ2V0QXR0cmlidXRlKCdkeCcpLmdldFN0cmluZygpKTtcbiAgICAgIHZhciBsZW4gPSB0ZXh0Lmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgZ2x5cGggPSB0aGlzLmdldEdseXBoKGN1c3RvbUZvbnQsIHRleHQsIGkpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgY3R4LnNjYWxlKHNjYWxlLCAtc2NhbGUpO1xuICAgICAgICB2YXIgbHcgPSBjdHgubGluZVdpZHRoO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gY3R4LmxpbmVXaWR0aCAqIHVuaXRzUGVyRW0gLyBmb250U2l6ZTtcblxuICAgICAgICBpZiAoZm9udFN0eWxlID09PSAnaXRhbGljJykge1xuICAgICAgICAgIGN0eC50cmFuc2Zvcm0oMSwgMCwgLjQsIDEsIDAsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2x5cGgucmVuZGVyKGN0eCk7XG5cbiAgICAgICAgaWYgKGZvbnRTdHlsZSA9PT0gJ2l0YWxpYycpIHtcbiAgICAgICAgICBjdHgudHJhbnNmb3JtKDEsIDAsIC0uNCwgMSwgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHgubGluZVdpZHRoID0gbHc7XG4gICAgICAgIGN0eC5zY2FsZSgxIC8gc2NhbGUsIC0xIC8gc2NhbGUpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xuICAgICAgICB0aGlzLnggKz0gZm9udFNpemUgKiAoZ2x5cGguaG9yaXpBZHZYIHx8IGN1c3RvbUZvbnQuaG9yaXpBZHZYKSAvIHVuaXRzUGVyRW07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkeFtpXSAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzTmFOKGR4W2ldKSkge1xuICAgICAgICAgIHRoaXMueCArPSBkeFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IHRoaXM7IC8vIE5FRUQgVEVTVFxuICAgIC8vIGlmIChjdHgucGFpbnRPcmRlciA9PT0gJ3N0cm9rZScpIHtcbiAgICAvLyBcdGlmIChjdHguc3Ryb2tlU3R5bGUpIHtcbiAgICAvLyBcdFx0Y3R4LnN0cm9rZVRleHQocmVuZGVyVGV4dCwgeCwgeSk7XG4gICAgLy8gXHR9XG4gICAgLy8gXHRpZiAoY3R4LmZpbGxTdHlsZSkge1xuICAgIC8vIFx0XHRjdHguZmlsbFRleHQocmVuZGVyVGV4dCwgeCwgeSk7XG4gICAgLy8gXHR9XG4gICAgLy8gfSBlbHNlIHtcblxuICAgIGlmIChjdHguZmlsbFN0eWxlKSB7XG4gICAgICBjdHguZmlsbFRleHQocmVuZGVyVGV4dCwgeCwgeSk7XG4gICAgfVxuXG4gICAgaWYgKGN0eC5zdHJva2VTdHlsZSkge1xuICAgICAgY3R4LnN0cm9rZVRleHQocmVuZGVyVGV4dCwgeCwgeSk7XG4gICAgfSAvLyB9XG5cbiAgfVxuXG4gIGFwcGx5QW5jaG9yaW5nKCkge1xuICAgIGlmICh0aGlzLnRleHRDaHVua1N0YXJ0ID49IHRoaXMubGVhZlRleHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gVGhpcyBpcyBiYXNpY2FsbHkgdGhlIFwiQXBwbHkgYW5jaG9yaW5nXCIgcGFydCBvZiBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMi90ZXh0Lmh0bWwjVGV4dExheW91dEFsZ29yaXRobS5cbiAgICAvLyBUaGUgZGlmZmVyZW5jZSBpcyB0aGF0IHdlIGFwcGx5IHRoZSBhbmNob3JpbmcgYXMgc29vbiBhcyBhIGNodW5rIGlzIGZpbmlzaGVkLiBUaGlzIHNhdmVzIHNvbWUgZXh0cmEgbG9vcGluZy5cbiAgICAvLyBWZXJ0aWNhbCB0ZXh0IGlzIG5vdCBzdXBwb3J0ZWQuXG5cblxuICAgIHZhciBmaXJzdEVsZW1lbnQgPSB0aGlzLmxlYWZUZXh0c1t0aGlzLnRleHRDaHVua1N0YXJ0XTtcbiAgICB2YXIgdGV4dEFuY2hvciA9IGZpcnN0RWxlbWVudC5nZXRTdHlsZSgndGV4dC1hbmNob3InKS5nZXRTdHJpbmcoJ3N0YXJ0Jyk7XG4gICAgdmFyIGlzUlRMID0gZmFsc2U7IC8vIHdlIHRyZWF0IFJUTCBsaWtlIExUUlxuXG4gICAgdmFyIHNoaWZ0ID0gMDtcblxuICAgIGlmICh0ZXh0QW5jaG9yID09PSAnc3RhcnQnICYmICFpc1JUTCB8fCB0ZXh0QW5jaG9yID09PSAnZW5kJyAmJiBpc1JUTCkge1xuICAgICAgc2hpZnQgPSBmaXJzdEVsZW1lbnQueCAtIHRoaXMubWluWDtcbiAgICB9IGVsc2UgaWYgKHRleHRBbmNob3IgPT09ICdlbmQnICYmICFpc1JUTCB8fCB0ZXh0QW5jaG9yID09PSAnc3RhcnQnICYmIGlzUlRMKSB7XG4gICAgICBzaGlmdCA9IGZpcnN0RWxlbWVudC54IC0gdGhpcy5tYXhYO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlmdCA9IGZpcnN0RWxlbWVudC54IC0gKHRoaXMubWluWCArIHRoaXMubWF4WCkgLyAyO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSB0aGlzLnRleHRDaHVua1N0YXJ0OyBpIDwgdGhpcy5sZWFmVGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubGVhZlRleHRzW2ldLnggKz0gc2hpZnQ7XG4gICAgfSAvLyBzdGFydCBuZXcgY2h1bmtcblxuXG4gICAgdGhpcy5taW5YID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIHRoaXMubWF4WCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB0aGlzLnRleHRDaHVua1N0YXJ0ID0gdGhpcy5sZWFmVGV4dHMubGVuZ3RoO1xuICB9XG5cbiAgYWRqdXN0Q2hpbGRDb29yZGluYXRlc1JlY3Vyc2l2ZShjdHgpIHtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0Q2hpbGRDb29yZGluYXRlc1JlY3Vyc2l2ZUNvcmUoY3R4LCB0aGlzLCB0aGlzLCBpKTtcbiAgICB9KTtcbiAgICB0aGlzLmFwcGx5QW5jaG9yaW5nKCk7XG4gIH1cblxuICBhZGp1c3RDaGlsZENvb3JkaW5hdGVzUmVjdXJzaXZlQ29yZShjdHgsIHRleHRQYXJlbnQsIHBhcmVudCwgaSkge1xuICAgIHZhciBjaGlsZCA9IHBhcmVudC5jaGlsZHJlbltpXTtcblxuICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjaGlsZC5jaGlsZHJlbi5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICAgIHRleHRQYXJlbnQuYWRqdXN0Q2hpbGRDb29yZGluYXRlc1JlY3Vyc2l2ZUNvcmUoY3R4LCB0ZXh0UGFyZW50LCBjaGlsZCwgaSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25seSBsZWFmcyBhcmUgcmVsZXZhbnRcbiAgICAgIHRoaXMuYWRqdXN0Q2hpbGRDb29yZGluYXRlcyhjdHgsIHRleHRQYXJlbnQsIHBhcmVudCwgaSk7XG4gICAgfVxuICB9XG5cbiAgYWRqdXN0Q2hpbGRDb29yZGluYXRlcyhjdHgsIHRleHRQYXJlbnQsIHBhcmVudCwgaSkge1xuICAgIHZhciBjaGlsZCA9IHBhcmVudC5jaGlsZHJlbltpXTtcblxuICAgIGlmICh0eXBlb2YgY2hpbGQubWVhc3VyZVRleHQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGNoaWxkLnNldENvbnRleHQoY3R4LCB0cnVlKTtcbiAgICB2YXIgeEF0dHIgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ3gnKTtcbiAgICB2YXIgeUF0dHIgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ3knKTtcbiAgICB2YXIgZHhBdHRyID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdkeCcpO1xuICAgIHZhciBkeUF0dHIgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2R5Jyk7XG4gICAgdmFyIGN1c3RvbUZvbnQgPSBjaGlsZC5nZXRTdHlsZSgnZm9udC1mYW1pbHknKS5nZXREZWZpbml0aW9uKCk7XG4gICAgdmFyIGlzUlRMID0gQm9vbGVhbihjdXN0b21Gb250KSAmJiBjdXN0b21Gb250LmlzUlRMO1xuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIC8vIEZpcnN0IGNoaWxkcmVuIGluaGVyaXQgYXR0cmlidXRlcyBmcm9tIHBhcmVudChzKS4gUG9zaXRpb25hbCBhdHRyaWJ1dGVzXG4gICAgICAvLyBhcmUgb25seSBpbmhlcml0ZWQgZnJvbSBhIHBhcmVudCB0byBpdCdzIGZpcnN0IGNoaWxkLlxuICAgICAgaWYgKCF4QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHhBdHRyLnNldFZhbHVlKGNoaWxkLmdldEluaGVyaXRlZEF0dHJpYnV0ZSgneCcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF5QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHlBdHRyLnNldFZhbHVlKGNoaWxkLmdldEluaGVyaXRlZEF0dHJpYnV0ZSgneScpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkeEF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgICBkeEF0dHIuc2V0VmFsdWUoY2hpbGQuZ2V0SW5oZXJpdGVkQXR0cmlidXRlKCdkeCcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkeUF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgICBkeUF0dHIuc2V0VmFsdWUoY2hpbGQuZ2V0SW5oZXJpdGVkQXR0cmlidXRlKCdkeScpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgd2lkdGggPSBjaGlsZC5tZWFzdXJlVGV4dChjdHgpO1xuXG4gICAgaWYgKGlzUlRMKSB7XG4gICAgICB0ZXh0UGFyZW50LnggLT0gd2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHhBdHRyLmhhc1ZhbHVlKCkpIHtcbiAgICAgIC8vIGFuIFwieFwiIGF0dHJpYnV0ZSBtYXJrcyB0aGUgc3RhcnQgb2YgYSBuZXcgY2h1bmtcbiAgICAgIHRleHRQYXJlbnQuYXBwbHlBbmNob3JpbmcoKTtcbiAgICAgIGNoaWxkLnggPSB4QXR0ci5nZXRQaXhlbHMoJ3gnKTtcblxuICAgICAgaWYgKGR4QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGNoaWxkLnggKz0gZHhBdHRyLmdldFBpeGVscygneCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZHhBdHRyLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgdGV4dFBhcmVudC54ICs9IGR4QXR0ci5nZXRQaXhlbHMoJ3gnKTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQueCA9IHRleHRQYXJlbnQueDtcbiAgICB9XG5cbiAgICB0ZXh0UGFyZW50LnggPSBjaGlsZC54O1xuXG4gICAgaWYgKCFpc1JUTCkge1xuICAgICAgdGV4dFBhcmVudC54ICs9IHdpZHRoO1xuICAgIH1cblxuICAgIGlmICh5QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICBjaGlsZC55ID0geUF0dHIuZ2V0UGl4ZWxzKCd5Jyk7XG5cbiAgICAgIGlmIChkeUF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgICBjaGlsZC55ICs9IGR5QXR0ci5nZXRQaXhlbHMoJ3knKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGR5QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHRleHRQYXJlbnQueSArPSBkeUF0dHIuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnkgPSB0ZXh0UGFyZW50Lnk7XG4gICAgfVxuXG4gICAgdGV4dFBhcmVudC55ID0gY2hpbGQueTsgLy8gdXBkYXRlIHRoZSBjdXJyZW50IGNodW5rIGFuZCBpdCdzIGJvdW5kc1xuXG4gICAgdGV4dFBhcmVudC5sZWFmVGV4dHMucHVzaChjaGlsZCk7XG4gICAgdGV4dFBhcmVudC5taW5YID0gTWF0aC5taW4odGV4dFBhcmVudC5taW5YLCBjaGlsZC54LCBjaGlsZC54ICsgd2lkdGgpO1xuICAgIHRleHRQYXJlbnQubWF4WCA9IE1hdGgubWF4KHRleHRQYXJlbnQubWF4WCwgY2hpbGQueCwgY2hpbGQueCArIHdpZHRoKTtcbiAgICBjaGlsZC5jbGVhckNvbnRleHQoY3R4KTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIGdldENoaWxkQm91bmRpbmdCb3goY3R4LCB0ZXh0UGFyZW50LCBwYXJlbnQsIGkpIHtcbiAgICB2YXIgY2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07IC8vIG5vdCBhIHRleHQgbm9kZT9cblxuICAgIGlmICh0eXBlb2YgY2hpbGQuZ2V0Qm91bmRpbmdCb3ggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBib3VuZGluZ0JveCA9IGNoaWxkLmdldEJvdW5kaW5nQm94KGN0eCk7XG5cbiAgICBpZiAoIWJvdW5kaW5nQm94KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjaGlsZC5jaGlsZHJlbi5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICB2YXIgY2hpbGRCb3VuZGluZ0JveCA9IHRleHRQYXJlbnQuZ2V0Q2hpbGRCb3VuZGluZ0JveChjdHgsIHRleHRQYXJlbnQsIGNoaWxkLCBpKTtcbiAgICAgIGJvdW5kaW5nQm94LmFkZEJvdW5kaW5nQm94KGNoaWxkQm91bmRpbmdCb3gpO1xuICAgIH0pO1xuICAgIHJldHVybiBib3VuZGluZ0JveDtcbiAgfVxuXG4gIHJlbmRlckNoaWxkKGN0eCwgdGV4dFBhcmVudCwgcGFyZW50LCBpKSB7XG4gICAgdmFyIGNoaWxkID0gcGFyZW50LmNoaWxkcmVuW2ldO1xuICAgIGNoaWxkLnJlbmRlcihjdHgpO1xuICAgIGNoaWxkLmNoaWxkcmVuLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIHRleHRQYXJlbnQucmVuZGVyQ2hpbGQoY3R4LCB0ZXh0UGFyZW50LCBjaGlsZCwgaSk7XG4gICAgfSk7XG4gIH1cblxuICBtZWFzdXJlVGV4dChjdHgpIHtcbiAgICB2YXIge1xuICAgICAgbWVhc3VyZUNhY2hlXG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAofm1lYXN1cmVDYWNoZSkge1xuICAgICAgcmV0dXJuIG1lYXN1cmVDYWNoZTtcbiAgICB9XG5cbiAgICB2YXIgcmVuZGVyVGV4dCA9IHRoaXMuZ2V0VGV4dCgpO1xuICAgIHZhciBtZWFzdXJlID0gdGhpcy5tZWFzdXJlVGFyZ2V0VGV4dChjdHgsIHJlbmRlclRleHQpO1xuICAgIHRoaXMubWVhc3VyZUNhY2hlID0gbWVhc3VyZTtcbiAgICByZXR1cm4gbWVhc3VyZTtcbiAgfVxuXG4gIG1lYXN1cmVUYXJnZXRUZXh0KGN0eCwgdGFyZ2V0VGV4dCkge1xuICAgIGlmICghdGFyZ2V0VGV4dC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciB7XG4gICAgICBwYXJlbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgY3VzdG9tRm9udCA9IHBhcmVudC5nZXRTdHlsZSgnZm9udC1mYW1pbHknKS5nZXREZWZpbml0aW9uKCk7XG5cbiAgICBpZiAoY3VzdG9tRm9udCkge1xuICAgICAgdmFyIGZvbnRTaXplID0gdGhpcy5nZXRGb250U2l6ZSgpO1xuICAgICAgdmFyIHRleHQgPSBjdXN0b21Gb250LmlzUlRMID8gdGFyZ2V0VGV4dC5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdGFyZ2V0VGV4dDtcbiAgICAgIHZhciBkeCA9IHRvTnVtYmVycyhwYXJlbnQuZ2V0QXR0cmlidXRlKCdkeCcpLmdldFN0cmluZygpKTtcbiAgICAgIHZhciBsZW4gPSB0ZXh0Lmxlbmd0aDtcbiAgICAgIHZhciBfbWVhc3VyZSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGdseXBoID0gdGhpcy5nZXRHbHlwaChjdXN0b21Gb250LCB0ZXh0LCBpKTtcbiAgICAgICAgX21lYXN1cmUgKz0gKGdseXBoLmhvcml6QWR2WCB8fCBjdXN0b21Gb250Lmhvcml6QWR2WCkgKiBmb250U2l6ZSAvIGN1c3RvbUZvbnQuZm9udEZhY2UudW5pdHNQZXJFbTtcblxuICAgICAgICBpZiAodHlwZW9mIGR4W2ldICE9PSAndW5kZWZpbmVkJyAmJiAhaXNOYU4oZHhbaV0pKSB7XG4gICAgICAgICAgX21lYXN1cmUgKz0gZHhbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9tZWFzdXJlO1xuICAgIH1cblxuICAgIGlmICghY3R4Lm1lYXN1cmVUZXh0KSB7XG4gICAgICByZXR1cm4gdGFyZ2V0VGV4dC5sZW5ndGggKiAxMDtcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIHRoaXMuc2V0Q29udGV4dChjdHgsIHRydWUpO1xuICAgIHZhciB7XG4gICAgICB3aWR0aDogbWVhc3VyZVxuICAgIH0gPSBjdHgubWVhc3VyZVRleHQodGFyZ2V0VGV4dCk7XG4gICAgdGhpcy5jbGVhckNvbnRleHQoY3R4KTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICAgIHJldHVybiBtZWFzdXJlO1xuICB9XG4gIC8qKlxyXG4gICAqIEluaGVyaXRzIHBvc2l0aW9uYWwgYXR0cmlidXRlcyBmcm9tIHtAbGluayBUZXh0RWxlbWVudH0gcGFyZW50KHMpLiBBdHRyaWJ1dGVzXHJcbiAgICogYXJlIG9ubHkgaW5oZXJpdGVkIGZyb20gYSBwYXJlbnQgdG8gaXRzIGZpcnN0IGNoaWxkLlxyXG4gICAqIEBwYXJhbSBuYW1lIC0gVGhlIGF0dHJpYnV0ZSBuYW1lLlxyXG4gICAqIEByZXR1cm5zIFRoZSBhdHRyaWJ1dGUgdmFsdWUgb3IgbnVsbC5cclxuICAgKi9cblxuXG4gIGdldEluaGVyaXRlZEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzLGNvbnNpc3RlbnQtdGhpc1xuICAgIHZhciBjdXJyZW50ID0gdGhpcztcblxuICAgIHdoaWxlIChjdXJyZW50IGluc3RhbmNlb2YgVGV4dEVsZW1lbnQgJiYgY3VycmVudC5pc0ZpcnN0Q2hpbGQoKSkge1xuICAgICAgdmFyIHBhcmVudEF0dHIgPSBjdXJyZW50LnBhcmVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIGlmIChwYXJlbnRBdHRyLmhhc1ZhbHVlKHRydWUpKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRBdHRyLmdldFZhbHVlKCcwJyk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5cbmNsYXNzIFRTcGFuRWxlbWVudCBleHRlbmRzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgbmV3LnRhcmdldCA9PT0gVFNwYW5FbGVtZW50ID8gdHJ1ZSA6IGNhcHR1cmVUZXh0Tm9kZXMpO1xuICAgIHRoaXMudHlwZSA9ICd0c3Bhbic7IC8vIGlmIHRoaXMgbm9kZSBoYXMgY2hpbGRyZW4sIHRoZW4gdGhleSBvd24gdGhlIHRleHRcblxuICAgIHRoaXMudGV4dCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCA/ICcnIDogdGhpcy5nZXRUZXh0RnJvbU5vZGUoKTtcbiAgfVxuXG4gIGdldFRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgfVxuXG59XG5cbmNsYXNzIFRleHROb2RlIGV4dGVuZHMgVFNwYW5FbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAndGV4dE5vZGUnO1xuICB9XG5cbn1cblxuY2xhc3MgU1ZHRWxlbWVudCBleHRlbmRzIFJlbmRlcmVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ3N2Zyc7XG4gICAgdGhpcy5yb290ID0gZmFsc2U7XG4gIH1cblxuICBzZXRDb250ZXh0KGN0eCkge1xuICAgIHZhciBfdGhpcyRub2RlJHBhcmVudE5vZGU7XG5cbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIge1xuICAgICAgc2NyZWVuLFxuICAgICAgd2luZG93XG4gICAgfSA9IGRvY3VtZW50O1xuICAgIHZhciBjYW52YXMgPSBjdHguY2FudmFzO1xuICAgIHNjcmVlbi5zZXREZWZhdWx0cyhjdHgpO1xuXG4gICAgaWYgKGNhbnZhcy5zdHlsZSAmJiB0eXBlb2YgY3R4LmZvbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LmdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdHguZm9udCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcykuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udCcpO1xuICAgICAgdmFyIGZvbnRTaXplUHJvcCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ2ZvbnRTaXplJywgRm9udC5wYXJzZShjdHguZm9udCkuZm9udFNpemUpO1xuXG4gICAgICBpZiAoZm9udFNpemVQcm9wLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgZG9jdW1lbnQucm9vdEVtU2l6ZSA9IGZvbnRTaXplUHJvcC5nZXRQaXhlbHMoJ3knKTtcbiAgICAgICAgZG9jdW1lbnQuZW1TaXplID0gZG9jdW1lbnQucm9vdEVtU2l6ZTtcbiAgICAgIH1cbiAgICB9IC8vIGNyZWF0ZSBuZXcgdmlldyBwb3J0XG5cblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKS5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgneCcsIHRydWUpLnNldFZhbHVlKDApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ3knKS5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgneScsIHRydWUpLnNldFZhbHVlKDApO1xuICAgIH1cblxuICAgIHZhciB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH0gPSBzY3JlZW4udmlld1BvcnQ7XG5cbiAgICBpZiAoIXRoaXMuZ2V0U3R5bGUoJ3dpZHRoJykuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5nZXRTdHlsZSgnd2lkdGgnLCB0cnVlKS5zZXRWYWx1ZSgnMTAwJScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5nZXRTdHlsZSgnaGVpZ2h0JykuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5nZXRTdHlsZSgnaGVpZ2h0JywgdHJ1ZSkuc2V0VmFsdWUoJzEwMCUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZ2V0U3R5bGUoJ2NvbG9yJykuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5nZXRTdHlsZSgnY29sb3InLCB0cnVlKS5zZXRWYWx1ZSgnYmxhY2snKTtcbiAgICB9XG5cbiAgICB2YXIgcmVmWEF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZSgncmVmWCcpO1xuICAgIHZhciByZWZZQXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyZWZZJyk7XG4gICAgdmFyIHZpZXdCb3hBdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKTtcbiAgICB2YXIgdmlld0JveCA9IHZpZXdCb3hBdHRyLmhhc1ZhbHVlKCkgPyB0b051bWJlcnModmlld0JveEF0dHIuZ2V0U3RyaW5nKCkpIDogbnVsbDtcbiAgICB2YXIgY2xpcCA9ICF0aGlzLnJvb3QgJiYgdGhpcy5nZXRTdHlsZSgnb3ZlcmZsb3cnKS5nZXRWYWx1ZSgnaGlkZGVuJykgIT09ICd2aXNpYmxlJztcbiAgICB2YXIgbWluWCA9IDA7XG4gICAgdmFyIG1pblkgPSAwO1xuICAgIHZhciBjbGlwWCA9IDA7XG4gICAgdmFyIGNsaXBZID0gMDtcblxuICAgIGlmICh2aWV3Qm94KSB7XG4gICAgICBtaW5YID0gdmlld0JveFswXTtcbiAgICAgIG1pblkgPSB2aWV3Qm94WzFdO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZ2V0U3R5bGUoJ3dpZHRoJykuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgICBoZWlnaHQgPSB0aGlzLmdldFN0eWxlKCdoZWlnaHQnKS5nZXRQaXhlbHMoJ3knKTtcblxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ21hcmtlcicpIHtcbiAgICAgICAgY2xpcFggPSBtaW5YO1xuICAgICAgICBjbGlwWSA9IG1pblk7XG4gICAgICAgIG1pblggPSAwO1xuICAgICAgICBtaW5ZID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JlZW4udmlld1BvcnQuc2V0Q3VycmVudCh3aWR0aCwgaGVpZ2h0KTsgLy8gRGVmYXVsdCB2YWx1ZSBvZiB0cmFuc2Zvcm0tb3JpZ2luIGlzIGNlbnRlciBvbmx5IGZvciByb290IFNWRyBlbGVtZW50c1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdHJhbnNmb3JtLW9yaWdpblxuXG4gICAgaWYgKHRoaXMubm9kZSAvLyBpcyBub3QgdGVtcG9yYXJ5IFNWR0VsZW1lbnRcbiAgICAmJiAoIXRoaXMucGFyZW50IHx8ICgoX3RoaXMkbm9kZSRwYXJlbnROb2RlID0gdGhpcy5ub2RlLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF90aGlzJG5vZGUkcGFyZW50Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkbm9kZSRwYXJlbnROb2RlLm5vZGVOYW1lKSA9PT0gJ2ZvcmVpZ25PYmplY3QnKSAmJiB0aGlzLmdldFN0eWxlKCd0cmFuc2Zvcm0nLCBmYWxzZSwgdHJ1ZSkuaGFzVmFsdWUoKSAmJiAhdGhpcy5nZXRTdHlsZSgndHJhbnNmb3JtLW9yaWdpbicsIGZhbHNlLCB0cnVlKS5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmdldFN0eWxlKCd0cmFuc2Zvcm0tb3JpZ2luJywgdHJ1ZSwgdHJ1ZSkuc2V0VmFsdWUoJzUwJSA1MCUnKTtcbiAgICB9XG5cbiAgICBzdXBlci5zZXRDb250ZXh0KGN0eCk7XG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLmdldEF0dHJpYnV0ZSgneCcpLmdldFBpeGVscygneCcpLCB0aGlzLmdldEF0dHJpYnV0ZSgneScpLmdldFBpeGVscygneScpKTtcblxuICAgIGlmICh2aWV3Qm94KSB7XG4gICAgICB3aWR0aCA9IHZpZXdCb3hbMl07XG4gICAgICBoZWlnaHQgPSB2aWV3Qm94WzNdO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnNldFZpZXdCb3goe1xuICAgICAgY3R4LFxuICAgICAgYXNwZWN0UmF0aW86IHRoaXMuZ2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJykuZ2V0U3RyaW5nKCksXG4gICAgICB3aWR0aDogc2NyZWVuLnZpZXdQb3J0LndpZHRoLFxuICAgICAgZGVzaXJlZFdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogc2NyZWVuLnZpZXdQb3J0LmhlaWdodCxcbiAgICAgIGRlc2lyZWRIZWlnaHQ6IGhlaWdodCxcbiAgICAgIG1pblgsXG4gICAgICBtaW5ZLFxuICAgICAgcmVmWDogcmVmWEF0dHIuZ2V0VmFsdWUoKSxcbiAgICAgIHJlZlk6IHJlZllBdHRyLmdldFZhbHVlKCksXG4gICAgICBjbGlwLFxuICAgICAgY2xpcFgsXG4gICAgICBjbGlwWVxuICAgIH0pO1xuXG4gICAgaWYgKHZpZXdCb3gpIHtcbiAgICAgIHNjcmVlbi52aWV3UG9ydC5yZW1vdmVDdXJyZW50KCk7XG4gICAgICBzY3JlZW4udmlld1BvcnQuc2V0Q3VycmVudCh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBjbGVhckNvbnRleHQoY3R4KSB7XG4gICAgc3VwZXIuY2xlYXJDb250ZXh0KGN0eCk7XG4gICAgdGhpcy5kb2N1bWVudC5zY3JlZW4udmlld1BvcnQucmVtb3ZlQ3VycmVudCgpO1xuICB9XG4gIC8qKlxyXG4gICAqIFJlc2l6ZSBTVkcgdG8gZml0IGluIGdpdmVuIHNpemUuXHJcbiAgICogQHBhcmFtIHdpZHRoXHJcbiAgICogQHBhcmFtIGhlaWdodFxyXG4gICAqIEBwYXJhbSBwcmVzZXJ2ZUFzcGVjdFJhdGlvXHJcbiAgICovXG5cblxuICByZXNpemUod2lkdGgpIHtcbiAgICB2YXIgaGVpZ2h0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB3aWR0aDtcbiAgICB2YXIgcHJlc2VydmVBc3BlY3RSYXRpbyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgdmFyIHdpZHRoQXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcsIHRydWUpO1xuICAgIHZhciBoZWlnaHRBdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRydWUpO1xuICAgIHZhciB2aWV3Qm94QXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCd2aWV3Qm94Jyk7XG4gICAgdmFyIHN0eWxlQXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIHZhciBvcmlnaW5XaWR0aCA9IHdpZHRoQXR0ci5nZXROdW1iZXIoMCk7XG4gICAgdmFyIG9yaWdpbkhlaWdodCA9IGhlaWdodEF0dHIuZ2V0TnVtYmVyKDApO1xuXG4gICAgaWYgKHByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICAgIGlmICh0eXBlb2YgcHJlc2VydmVBc3BlY3RSYXRpbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCB0cnVlKS5zZXRWYWx1ZShwcmVzZXJ2ZUFzcGVjdFJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwcmVzZXJ2ZUFzcGVjdFJhdGlvQXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJyk7XG5cbiAgICAgICAgaWYgKHByZXNlcnZlQXNwZWN0UmF0aW9BdHRyLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvQXR0ci5zZXRWYWx1ZShwcmVzZXJ2ZUFzcGVjdFJhdGlvQXR0ci5nZXRTdHJpbmcoKS5yZXBsYWNlKC9eXFxzKihcXFMuKlxcUylcXHMqJC8sICckMScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHdpZHRoQXR0ci5zZXRWYWx1ZSh3aWR0aCk7XG4gICAgaGVpZ2h0QXR0ci5zZXRWYWx1ZShoZWlnaHQpO1xuXG4gICAgaWYgKCF2aWV3Qm94QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICB2aWV3Qm94QXR0ci5zZXRWYWx1ZShcIjAgMCBcIi5jb25jYXQob3JpZ2luV2lkdGggfHwgd2lkdGgsIFwiIFwiKS5jb25jYXQob3JpZ2luSGVpZ2h0IHx8IGhlaWdodCkpO1xuICAgIH1cblxuICAgIGlmIChzdHlsZUF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgdmFyIHdpZHRoU3R5bGUgPSB0aGlzLmdldFN0eWxlKCd3aWR0aCcpO1xuICAgICAgdmFyIGhlaWdodFN0eWxlID0gdGhpcy5nZXRTdHlsZSgnaGVpZ2h0Jyk7XG5cbiAgICAgIGlmICh3aWR0aFN0eWxlLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgd2lkdGhTdHlsZS5zZXRWYWx1ZShcIlwiLmNvbmNhdCh3aWR0aCwgXCJweFwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWlnaHRTdHlsZS5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGhlaWdodFN0eWxlLnNldFZhbHVlKFwiXCIuY29uY2F0KGhlaWdodCwgXCJweFwiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuY2xhc3MgUmVjdEVsZW1lbnQgZXh0ZW5kcyBQYXRoRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ3JlY3QnO1xuICB9XG5cbiAgcGF0aChjdHgpIHtcbiAgICB2YXIgeCA9IHRoaXMuZ2V0QXR0cmlidXRlKCd4JykuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHkgPSB0aGlzLmdldEF0dHJpYnV0ZSgneScpLmdldFBpeGVscygneScpO1xuICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0U3R5bGUoJ3dpZHRoJywgZmFsc2UsIHRydWUpLmdldFBpeGVscygneCcpO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLmdldFN0eWxlKCdoZWlnaHQnLCBmYWxzZSwgdHJ1ZSkuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgdmFyIHJ4QXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyeCcpO1xuICAgIHZhciByeUF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZSgncnknKTtcbiAgICB2YXIgcnggPSByeEF0dHIuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHJ5ID0gcnlBdHRyLmdldFBpeGVscygneScpO1xuXG4gICAgaWYgKHJ4QXR0ci5oYXNWYWx1ZSgpICYmICFyeUF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgcnkgPSByeDtcbiAgICB9XG5cbiAgICBpZiAocnlBdHRyLmhhc1ZhbHVlKCkgJiYgIXJ4QXR0ci5oYXNWYWx1ZSgpKSB7XG4gICAgICByeCA9IHJ5O1xuICAgIH1cblxuICAgIHJ4ID0gTWF0aC5taW4ocngsIHdpZHRoIC8gMi4wKTtcbiAgICByeSA9IE1hdGgubWluKHJ5LCBoZWlnaHQgLyAyLjApO1xuXG4gICAgaWYgKGN0eCkge1xuICAgICAgdmFyIEtBUFBBID0gNCAqICgoTWF0aC5zcXJ0KDIpIC0gMSkgLyAzKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy8gYWx3YXlzIHN0YXJ0IHRoZSBwYXRoIHNvIHdlIGRvbid0IGZpbGwgcHJpb3IgcGF0aHNcblxuICAgICAgaWYgKGhlaWdodCA+IDAgJiYgd2lkdGggPiAwKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8oeCArIHJ4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgd2lkdGggLSByeCwgeSk7XG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHggKyB3aWR0aCAtIHJ4ICsgS0FQUEEgKiByeCwgeSwgeCArIHdpZHRoLCB5ICsgcnkgLSBLQVBQQSAqIHJ5LCB4ICsgd2lkdGgsIHkgKyByeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0IC0gcnkpO1xuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByeSArIEtBUFBBICogcnksIHggKyB3aWR0aCAtIHJ4ICsgS0FQUEEgKiByeCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcngsIHkgKyBoZWlnaHQpO1xuICAgICAgICBjdHgubGluZVRvKHggKyByeCwgeSArIGhlaWdodCk7XG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHggKyByeCAtIEtBUFBBICogcngsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByeSArIEtBUFBBICogcnksIHgsIHkgKyBoZWlnaHQgLSByeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSArIHJ5KTtcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8oeCwgeSArIHJ5IC0gS0FQUEEgKiByeSwgeCArIHJ4IC0gS0FQUEEgKiByeCwgeSwgeCArIHJ4LCB5KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3goeCwgeSwgeCArIHdpZHRoLCB5ICsgaGVpZ2h0KTtcbiAgfVxuXG4gIGdldE1hcmtlcnMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5jbGFzcyBDaXJjbGVFbGVtZW50IGV4dGVuZHMgUGF0aEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdjaXJjbGUnO1xuICB9XG5cbiAgcGF0aChjdHgpIHtcbiAgICB2YXIgY3ggPSB0aGlzLmdldEF0dHJpYnV0ZSgnY3gnKS5nZXRQaXhlbHMoJ3gnKTtcbiAgICB2YXIgY3kgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY3knKS5nZXRQaXhlbHMoJ3knKTtcbiAgICB2YXIgciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyJykuZ2V0UGl4ZWxzKCk7XG5cbiAgICBpZiAoY3R4ICYmIHIgPiAwKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKGN4LCBjeSwgciwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KGN4IC0gciwgY3kgLSByLCBjeCArIHIsIGN5ICsgcik7XG4gIH1cblxuICBnZXRNYXJrZXJzKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cblxuY2xhc3MgRWxsaXBzZUVsZW1lbnQgZXh0ZW5kcyBQYXRoRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ2VsbGlwc2UnO1xuICB9XG5cbiAgcGF0aChjdHgpIHtcbiAgICB2YXIgS0FQUEEgPSA0ICogKChNYXRoLnNxcnQoMikgLSAxKSAvIDMpO1xuICAgIHZhciByeCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyeCcpLmdldFBpeGVscygneCcpO1xuICAgIHZhciByeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyeScpLmdldFBpeGVscygneScpO1xuICAgIHZhciBjeCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjeCcpLmdldFBpeGVscygneCcpO1xuICAgIHZhciBjeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjeScpLmdldFBpeGVscygneScpO1xuXG4gICAgaWYgKGN0eCAmJiByeCA+IDAgJiYgcnkgPiAwKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGN4ICsgcngsIGN5KTtcbiAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKGN4ICsgcngsIGN5ICsgS0FQUEEgKiByeSwgY3ggKyBLQVBQQSAqIHJ4LCBjeSArIHJ5LCBjeCwgY3kgKyByeSk7XG4gICAgICBjdHguYmV6aWVyQ3VydmVUbyhjeCAtIEtBUFBBICogcngsIGN5ICsgcnksIGN4IC0gcngsIGN5ICsgS0FQUEEgKiByeSwgY3ggLSByeCwgY3kpO1xuICAgICAgY3R4LmJlemllckN1cnZlVG8oY3ggLSByeCwgY3kgLSBLQVBQQSAqIHJ5LCBjeCAtIEtBUFBBICogcngsIGN5IC0gcnksIGN4LCBjeSAtIHJ5KTtcbiAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKGN4ICsgS0FQUEEgKiByeCwgY3kgLSByeSwgY3ggKyByeCwgY3kgLSBLQVBQQSAqIHJ5LCBjeCArIHJ4LCBjeSk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb3VuZGluZ0JveChjeCAtIHJ4LCBjeSAtIHJ5LCBjeCArIHJ4LCBjeSArIHJ5KTtcbiAgfVxuXG4gIGdldE1hcmtlcnMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5jbGFzcyBMaW5lRWxlbWVudCBleHRlbmRzIFBhdGhFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnbGluZSc7XG4gIH1cblxuICBnZXRQb2ludHMoKSB7XG4gICAgcmV0dXJuIFtuZXcgUG9pbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gxJykuZ2V0UGl4ZWxzKCd4JyksIHRoaXMuZ2V0QXR0cmlidXRlKCd5MScpLmdldFBpeGVscygneScpKSwgbmV3IFBvaW50KHRoaXMuZ2V0QXR0cmlidXRlKCd4MicpLmdldFBpeGVscygneCcpLCB0aGlzLmdldEF0dHJpYnV0ZSgneTInKS5nZXRQaXhlbHMoJ3knKSldO1xuICB9XG5cbiAgcGF0aChjdHgpIHtcbiAgICB2YXIgW3tcbiAgICAgIHg6IHgwLFxuICAgICAgeTogeTBcbiAgICB9LCB7XG4gICAgICB4OiB4MSxcbiAgICAgIHk6IHkxXG4gICAgfV0gPSB0aGlzLmdldFBvaW50cygpO1xuXG4gICAgaWYgKGN0eCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh4MCwgeTApO1xuICAgICAgY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3goeDAsIHkwLCB4MSwgeTEpO1xuICB9XG5cbiAgZ2V0TWFya2VycygpIHtcbiAgICB2YXIgW3AwLCBwMV0gPSB0aGlzLmdldFBvaW50cygpO1xuICAgIHZhciBhID0gcDAuYW5nbGVUbyhwMSk7XG4gICAgcmV0dXJuIFtbcDAsIGFdLCBbcDEsIGFdXTtcbiAgfVxuXG59XG5cbmNsYXNzIFBvbHlsaW5lRWxlbWVudCBleHRlbmRzIFBhdGhFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ3BvbHlsaW5lJztcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgIHRoaXMucG9pbnRzID0gUG9pbnQucGFyc2VQYXRoKHRoaXMuZ2V0QXR0cmlidXRlKCdwb2ludHMnKS5nZXRTdHJpbmcoKSk7XG4gIH1cblxuICBwYXRoKGN0eCkge1xuICAgIHZhciB7XG4gICAgICBwb2ludHNcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgW3tcbiAgICAgIHg6IHgwLFxuICAgICAgeTogeTBcbiAgICB9XSA9IHBvaW50cztcbiAgICB2YXIgYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3goeDAsIHkwKTtcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oeDAsIHkwKTtcbiAgICB9XG5cbiAgICBwb2ludHMuZm9yRWFjaChfcmVmID0+IHtcbiAgICAgIHZhciB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgYm91bmRpbmdCb3guYWRkUG9pbnQoeCwgeSk7XG5cbiAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYm91bmRpbmdCb3g7XG4gIH1cblxuICBnZXRNYXJrZXJzKCkge1xuICAgIHZhciB7XG4gICAgICBwb2ludHNcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4ID0gcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgdmFyIG1hcmtlcnMgPSBbXTtcbiAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGkpID0+IHtcbiAgICAgIGlmIChpID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXJrZXJzLnB1c2goW3BvaW50LCBwb2ludC5hbmdsZVRvKHBvaW50c1tpICsgMV0pXSk7XG4gICAgfSk7XG5cbiAgICBpZiAobWFya2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICBtYXJrZXJzLnB1c2goW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIG1hcmtlcnNbbWFya2Vycy5sZW5ndGggLSAxXVsxXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJzO1xuICB9XG5cbn1cblxuY2xhc3MgUG9seWdvbkVsZW1lbnQgZXh0ZW5kcyBQb2x5bGluZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdwb2x5Z29uJztcbiAgfVxuXG4gIHBhdGgoY3R4KSB7XG4gICAgdmFyIGJvdW5kaW5nQm94ID0gc3VwZXIucGF0aChjdHgpO1xuICAgIHZhciBbe1xuICAgICAgeCxcbiAgICAgIHlcbiAgICB9XSA9IHRoaXMucG9pbnRzO1xuXG4gICAgaWYgKGN0eCkge1xuICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRpbmdCb3g7XG4gIH1cblxufVxuXG5jbGFzcyBQYXR0ZXJuRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdwYXR0ZXJuJztcbiAgfVxuXG4gIGNyZWF0ZVBhdHRlcm4oY3R4LCBfLCBwYXJlbnRPcGFjaXR5UHJvcCkge1xuICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0U3R5bGUoJ3dpZHRoJykuZ2V0UGl4ZWxzKCd4JywgdHJ1ZSk7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0U3R5bGUoJ2hlaWdodCcpLmdldFBpeGVscygneScsIHRydWUpOyAvLyByZW5kZXIgbWUgdXNpbmcgYSB0ZW1wb3Jhcnkgc3ZnIGVsZW1lbnRcblxuICAgIHZhciBwYXR0ZXJuU3ZnID0gbmV3IFNWR0VsZW1lbnQodGhpcy5kb2N1bWVudCwgbnVsbCk7XG4gICAgcGF0dGVyblN2Zy5hdHRyaWJ1dGVzLnZpZXdCb3ggPSBuZXcgUHJvcGVydHkodGhpcy5kb2N1bWVudCwgJ3ZpZXdCb3gnLCB0aGlzLmdldEF0dHJpYnV0ZSgndmlld0JveCcpLmdldFZhbHVlKCkpO1xuICAgIHBhdHRlcm5TdmcuYXR0cmlidXRlcy53aWR0aCA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAnd2lkdGgnLCBcIlwiLmNvbmNhdCh3aWR0aCwgXCJweFwiKSk7XG4gICAgcGF0dGVyblN2Zy5hdHRyaWJ1dGVzLmhlaWdodCA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAnaGVpZ2h0JywgXCJcIi5jb25jYXQoaGVpZ2h0LCBcInB4XCIpKTtcbiAgICBwYXR0ZXJuU3ZnLmF0dHJpYnV0ZXMudHJhbnNmb3JtID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLmdldEF0dHJpYnV0ZSgncGF0dGVyblRyYW5zZm9ybScpLmdldFZhbHVlKCkpO1xuICAgIHBhdHRlcm5TdmcuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgIHZhciBwYXR0ZXJuQ2FudmFzID0gdGhpcy5kb2N1bWVudC5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG4gICAgdmFyIHBhdHRlcm5DdHggPSBwYXR0ZXJuQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdmFyIHhBdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKTtcbiAgICB2YXIgeUF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZSgneScpO1xuXG4gICAgaWYgKHhBdHRyLmhhc1ZhbHVlKCkgJiYgeUF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgcGF0dGVybkN0eC50cmFuc2xhdGUoeEF0dHIuZ2V0UGl4ZWxzKCd4JywgdHJ1ZSksIHlBdHRyLmdldFBpeGVscygneScsIHRydWUpKTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50T3BhY2l0eVByb3AuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5zdHlsZXNbJ2ZpbGwtb3BhY2l0eSddID0gcGFyZW50T3BhY2l0eVByb3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGhpcy5zdHlsZXMsICdmaWxsLW9wYWNpdHknKTtcbiAgICB9IC8vIHJlbmRlciAzeDMgZ3JpZCBzbyB3aGVuIHdlIHRyYW5zZm9ybSB0aGVyZSdzIG5vIHdoaXRlIHNwYWNlIG9uIGVkZ2VzXG5cblxuICAgIGZvciAodmFyIHggPSAtMTsgeCA8PSAxOyB4KyspIHtcbiAgICAgIGZvciAodmFyIHkgPSAtMTsgeSA8PSAxOyB5KyspIHtcbiAgICAgICAgcGF0dGVybkN0eC5zYXZlKCk7XG4gICAgICAgIHBhdHRlcm5TdmcuYXR0cmlidXRlcy54ID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICd4JywgeCAqIHBhdHRlcm5DYW52YXMud2lkdGgpO1xuICAgICAgICBwYXR0ZXJuU3ZnLmF0dHJpYnV0ZXMueSA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAneScsIHkgKiBwYXR0ZXJuQ2FudmFzLmhlaWdodCk7XG4gICAgICAgIHBhdHRlcm5TdmcucmVuZGVyKHBhdHRlcm5DdHgpO1xuICAgICAgICBwYXR0ZXJuQ3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcGF0dGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHBhdHRlcm5DYW52YXMsICdyZXBlYXQnKTtcbiAgICByZXR1cm4gcGF0dGVybjtcbiAgfVxuXG59XG5cbmNsYXNzIE1hcmtlckVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnbWFya2VyJztcbiAgfVxuXG4gIHJlbmRlcihjdHgsIHBvaW50LCBhbmdsZSkge1xuICAgIGlmICghcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIge1xuICAgICAgeCxcbiAgICAgIHlcbiAgICB9ID0gcG9pbnQ7XG4gICAgdmFyIG9yaWVudCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdvcmllbnQnKS5nZXRTdHJpbmcoJ2F1dG8nKTtcbiAgICB2YXIgbWFya2VyVW5pdHMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWFya2VyVW5pdHMnKS5nZXRTdHJpbmcoJ3N0cm9rZVdpZHRoJyk7XG4gICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcblxuICAgIGlmIChvcmllbnQgPT09ICdhdXRvJykge1xuICAgICAgY3R4LnJvdGF0ZShhbmdsZSk7XG4gICAgfVxuXG4gICAgaWYgKG1hcmtlclVuaXRzID09PSAnc3Ryb2tlV2lkdGgnKSB7XG4gICAgICBjdHguc2NhbGUoY3R4LmxpbmVXaWR0aCwgY3R4LmxpbmVXaWR0aCk7XG4gICAgfVxuXG4gICAgY3R4LnNhdmUoKTsgLy8gcmVuZGVyIG1lIHVzaW5nIGEgdGVtcG9yYXJ5IHN2ZyBlbGVtZW50XG5cbiAgICB2YXIgbWFya2VyU3ZnID0gbmV3IFNWR0VsZW1lbnQodGhpcy5kb2N1bWVudCwgbnVsbCk7XG4gICAgbWFya2VyU3ZnLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMudmlld0JveCA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAndmlld0JveCcsIHRoaXMuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMucmVmWCA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAncmVmWCcsIHRoaXMuZ2V0QXR0cmlidXRlKCdyZWZYJykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMucmVmWSA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAncmVmWScsIHRoaXMuZ2V0QXR0cmlidXRlKCdyZWZZJykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMud2lkdGggPSBuZXcgUHJvcGVydHkodGhpcy5kb2N1bWVudCwgJ3dpZHRoJywgdGhpcy5nZXRBdHRyaWJ1dGUoJ21hcmtlcldpZHRoJykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMuaGVpZ2h0ID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICdoZWlnaHQnLCB0aGlzLmdldEF0dHJpYnV0ZSgnbWFya2VySGVpZ2h0JykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMub3ZlcmZsb3cgPSBuZXcgUHJvcGVydHkodGhpcy5kb2N1bWVudCwgJ292ZXJmbG93JywgdGhpcy5nZXRBdHRyaWJ1dGUoJ292ZXJmbG93JykuZ2V0VmFsdWUoKSk7XG4gICAgbWFya2VyU3ZnLmF0dHJpYnV0ZXMuZmlsbCA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAnZmlsbCcsIHRoaXMuZ2V0QXR0cmlidXRlKCdmaWxsJykuZ2V0Q29sb3IoJ2JsYWNrJykpO1xuICAgIG1hcmtlclN2Zy5hdHRyaWJ1dGVzLnN0cm9rZSA9IG5ldyBQcm9wZXJ0eSh0aGlzLmRvY3VtZW50LCAnc3Ryb2tlJywgdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0cm9rZScpLmdldFZhbHVlKCdub25lJykpO1xuICAgIG1hcmtlclN2Zy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG4gICAgbWFya2VyU3ZnLnJlbmRlcihjdHgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBpZiAobWFya2VyVW5pdHMgPT09ICdzdHJva2VXaWR0aCcpIHtcbiAgICAgIGN0eC5zY2FsZSgxIC8gY3R4LmxpbmVXaWR0aCwgMSAvIGN0eC5saW5lV2lkdGgpO1xuICAgIH1cblxuICAgIGlmIChvcmllbnQgPT09ICdhdXRvJykge1xuICAgICAgY3R4LnJvdGF0ZSgtYW5nbGUpO1xuICAgIH1cblxuICAgIGN0eC50cmFuc2xhdGUoLXgsIC15KTtcbiAgfVxuXG59XG5cbmNsYXNzIERlZnNFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ2RlZnMnO1xuICB9XG5cbiAgcmVuZGVyKCkgey8vIE5PT1BcbiAgfVxuXG59XG5cbmNsYXNzIEdFbGVtZW50IGV4dGVuZHMgUmVuZGVyZWRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnZyc7XG4gIH1cblxuICBnZXRCb3VuZGluZ0JveChjdHgpIHtcbiAgICB2YXIgYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3goKTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgYm91bmRpbmdCb3guYWRkQm91bmRpbmdCb3goY2hpbGQuZ2V0Qm91bmRpbmdCb3goY3R4KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvdW5kaW5nQm94O1xuICB9XG5cbn1cblxuY2xhc3MgR3JhZGllbnRFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpO1xuICAgIHRoaXMuYXR0cmlidXRlc1RvSW5oZXJpdCA9IFsnZ3JhZGllbnRVbml0cyddO1xuICAgIHRoaXMuc3RvcHMgPSBbXTtcbiAgICB2YXIge1xuICAgICAgc3RvcHMsXG4gICAgICBjaGlsZHJlblxuICAgIH0gPSB0aGlzO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdzdG9wJykge1xuICAgICAgICBzdG9wcy5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEdyYWRpZW50VW5pdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdncmFkaWVudFVuaXRzJykuZ2V0U3RyaW5nKCdvYmplY3RCb3VuZGluZ0JveCcpO1xuICB9XG5cbiAgY3JlYXRlR3JhZGllbnQoY3R4LCBlbGVtZW50LCBwYXJlbnRPcGFjaXR5UHJvcCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgY29uc2lzdGVudC10aGlzXG4gICAgdmFyIHN0b3BzQ29udGFpbmVyID0gdGhpcztcblxuICAgIGlmICh0aGlzLmdldEhyZWZBdHRyaWJ1dGUoKS5oYXNWYWx1ZSgpKSB7XG4gICAgICBzdG9wc0NvbnRhaW5lciA9IHRoaXMuZ2V0SHJlZkF0dHJpYnV0ZSgpLmdldERlZmluaXRpb24oKTtcbiAgICAgIHRoaXMuaW5oZXJpdFN0b3BDb250YWluZXIoc3RvcHNDb250YWluZXIpO1xuICAgIH1cblxuICAgIHZhciB7XG4gICAgICBzdG9wc1xuICAgIH0gPSBzdG9wc0NvbnRhaW5lcjtcbiAgICB2YXIgZ3JhZGllbnQgPSB0aGlzLmdldEdyYWRpZW50KGN0eCwgZWxlbWVudCk7XG5cbiAgICBpZiAoIWdyYWRpZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRQYXJlbnRPcGFjaXR5KHBhcmVudE9wYWNpdHlQcm9wLCBzdG9wc1tzdG9wcy5sZW5ndGggLSAxXS5jb2xvcik7XG4gICAgfVxuXG4gICAgc3RvcHMuZm9yRWFjaChzdG9wID0+IHtcbiAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLm9mZnNldCwgdGhpcy5hZGRQYXJlbnRPcGFjaXR5KHBhcmVudE9wYWNpdHlQcm9wLCBzdG9wLmNvbG9yKSk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2dyYWRpZW50VHJhbnNmb3JtJykuaGFzVmFsdWUoKSkge1xuICAgICAgLy8gcmVuZGVyIGFzIHRyYW5zZm9ybWVkIHBhdHRlcm4gb24gdGVtcG9yYXJ5IGNhbnZhc1xuICAgICAgdmFyIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgIH0gPSB0aGlzO1xuICAgICAgdmFyIHtcbiAgICAgICAgTUFYX1ZJUlRVQUxfUElYRUxTLFxuICAgICAgICB2aWV3UG9ydFxuICAgICAgfSA9IGRvY3VtZW50LnNjcmVlbjtcbiAgICAgIHZhciBbcm9vdFZpZXddID0gdmlld1BvcnQudmlld1BvcnRzO1xuICAgICAgdmFyIHJlY3QgPSBuZXcgUmVjdEVsZW1lbnQoZG9jdW1lbnQsIG51bGwpO1xuICAgICAgcmVjdC5hdHRyaWJ1dGVzLnggPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICd4JywgLU1BWF9WSVJUVUFMX1BJWEVMUyAvIDMuMCk7XG4gICAgICByZWN0LmF0dHJpYnV0ZXMueSA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3knLCAtTUFYX1ZJUlRVQUxfUElYRUxTIC8gMy4wKTtcbiAgICAgIHJlY3QuYXR0cmlidXRlcy53aWR0aCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3dpZHRoJywgTUFYX1ZJUlRVQUxfUElYRUxTKTtcbiAgICAgIHJlY3QuYXR0cmlidXRlcy5oZWlnaHQgPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICdoZWlnaHQnLCBNQVhfVklSVFVBTF9QSVhFTFMpO1xuICAgICAgdmFyIGdyb3VwID0gbmV3IEdFbGVtZW50KGRvY3VtZW50LCBudWxsKTtcbiAgICAgIGdyb3VwLmF0dHJpYnV0ZXMudHJhbnNmb3JtID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAndHJhbnNmb3JtJywgdGhpcy5nZXRBdHRyaWJ1dGUoJ2dyYWRpZW50VHJhbnNmb3JtJykuZ2V0VmFsdWUoKSk7XG4gICAgICBncm91cC5jaGlsZHJlbiA9IFtyZWN0XTtcbiAgICAgIHZhciBwYXR0ZXJuU3ZnID0gbmV3IFNWR0VsZW1lbnQoZG9jdW1lbnQsIG51bGwpO1xuICAgICAgcGF0dGVyblN2Zy5hdHRyaWJ1dGVzLnggPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICd4JywgMCk7XG4gICAgICBwYXR0ZXJuU3ZnLmF0dHJpYnV0ZXMueSA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3knLCAwKTtcbiAgICAgIHBhdHRlcm5TdmcuYXR0cmlidXRlcy53aWR0aCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3dpZHRoJywgcm9vdFZpZXcud2lkdGgpO1xuICAgICAgcGF0dGVyblN2Zy5hdHRyaWJ1dGVzLmhlaWdodCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ2hlaWdodCcsIHJvb3RWaWV3LmhlaWdodCk7XG4gICAgICBwYXR0ZXJuU3ZnLmNoaWxkcmVuID0gW2dyb3VwXTtcbiAgICAgIHZhciBwYXR0ZXJuQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlQ2FudmFzKHJvb3RWaWV3LndpZHRoLCByb290Vmlldy5oZWlnaHQpO1xuICAgICAgdmFyIHBhdHRlcm5DdHggPSBwYXR0ZXJuQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBwYXR0ZXJuQ3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgcGF0dGVyblN2Zy5yZW5kZXIocGF0dGVybkN0eCk7XG4gICAgICByZXR1cm4gcGF0dGVybkN0eC5jcmVhdGVQYXR0ZXJuKHBhdHRlcm5DYW52YXMsICduby1yZXBlYXQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JhZGllbnQ7XG4gIH1cblxuICBpbmhlcml0U3RvcENvbnRhaW5lcihzdG9wc0NvbnRhaW5lcikge1xuICAgIHRoaXMuYXR0cmlidXRlc1RvSW5oZXJpdC5mb3JFYWNoKGF0dHJpYnV0ZVRvSW5oZXJpdCA9PiB7XG4gICAgICBpZiAoIXRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZVRvSW5oZXJpdCkuaGFzVmFsdWUoKSAmJiBzdG9wc0NvbnRhaW5lci5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlVG9Jbmhlcml0KS5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZVRvSW5oZXJpdCwgdHJ1ZSkuc2V0VmFsdWUoc3RvcHNDb250YWluZXIuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZVRvSW5oZXJpdCkuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGRQYXJlbnRPcGFjaXR5KHBhcmVudE9wYWNpdHlQcm9wLCBjb2xvcikge1xuICAgIGlmIChwYXJlbnRPcGFjaXR5UHJvcC5oYXNWYWx1ZSgpKSB7XG4gICAgICB2YXIgY29sb3JQcm9wID0gbmV3IFByb3BlcnR5KHRoaXMuZG9jdW1lbnQsICdjb2xvcicsIGNvbG9yKTtcbiAgICAgIHJldHVybiBjb2xvclByb3AuYWRkT3BhY2l0eShwYXJlbnRPcGFjaXR5UHJvcCkuZ2V0Q29sb3IoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxufVxuXG5jbGFzcyBMaW5lYXJHcmFkaWVudEVsZW1lbnQgZXh0ZW5kcyBHcmFkaWVudEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcykge1xuICAgIHN1cGVyKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKTtcbiAgICB0aGlzLnR5cGUgPSAnbGluZWFyR3JhZGllbnQnO1xuICAgIHRoaXMuYXR0cmlidXRlc1RvSW5oZXJpdC5wdXNoKCd4MScsICd5MScsICd4MicsICd5MicpO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQoY3R4LCBlbGVtZW50KSB7XG4gICAgdmFyIGlzQm91bmRpbmdCb3hVbml0cyA9IHRoaXMuZ2V0R3JhZGllbnRVbml0cygpID09PSAnb2JqZWN0Qm91bmRpbmdCb3gnO1xuICAgIHZhciBib3VuZGluZ0JveCA9IGlzQm91bmRpbmdCb3hVbml0cyA/IGVsZW1lbnQuZ2V0Qm91bmRpbmdCb3goY3R4KSA6IG51bGw7XG5cbiAgICBpZiAoaXNCb3VuZGluZ0JveFVuaXRzICYmICFib3VuZGluZ0JveCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmdldEF0dHJpYnV0ZSgneDEnKS5oYXNWYWx1ZSgpICYmICF0aGlzLmdldEF0dHJpYnV0ZSgneTEnKS5oYXNWYWx1ZSgpICYmICF0aGlzLmdldEF0dHJpYnV0ZSgneDInKS5oYXNWYWx1ZSgpICYmICF0aGlzLmdldEF0dHJpYnV0ZSgneTInKS5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgneDEnLCB0cnVlKS5zZXRWYWx1ZSgwKTtcbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCd5MScsIHRydWUpLnNldFZhbHVlKDApO1xuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3gyJywgdHJ1ZSkuc2V0VmFsdWUoMSk7XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgneTInLCB0cnVlKS5zZXRWYWx1ZSgwKTtcbiAgICB9XG5cbiAgICB2YXIgeDEgPSBpc0JvdW5kaW5nQm94VW5pdHMgPyBib3VuZGluZ0JveC54ICsgYm91bmRpbmdCb3gud2lkdGggKiB0aGlzLmdldEF0dHJpYnV0ZSgneDEnKS5nZXROdW1iZXIoKSA6IHRoaXMuZ2V0QXR0cmlidXRlKCd4MScpLmdldFBpeGVscygneCcpO1xuICAgIHZhciB5MSA9IGlzQm91bmRpbmdCb3hVbml0cyA/IGJvdW5kaW5nQm94LnkgKyBib3VuZGluZ0JveC5oZWlnaHQgKiB0aGlzLmdldEF0dHJpYnV0ZSgneTEnKS5nZXROdW1iZXIoKSA6IHRoaXMuZ2V0QXR0cmlidXRlKCd5MScpLmdldFBpeGVscygneScpO1xuICAgIHZhciB4MiA9IGlzQm91bmRpbmdCb3hVbml0cyA/IGJvdW5kaW5nQm94LnggKyBib3VuZGluZ0JveC53aWR0aCAqIHRoaXMuZ2V0QXR0cmlidXRlKCd4MicpLmdldE51bWJlcigpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3gyJykuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHkyID0gaXNCb3VuZGluZ0JveFVuaXRzID8gYm91bmRpbmdCb3gueSArIGJvdW5kaW5nQm94LmhlaWdodCAqIHRoaXMuZ2V0QXR0cmlidXRlKCd5MicpLmdldE51bWJlcigpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3kyJykuZ2V0UGl4ZWxzKCd5Jyk7XG5cbiAgICBpZiAoeDEgPT09IHgyICYmIHkxID09PSB5Mikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCh4MSwgeTEsIHgyLCB5Mik7XG4gIH1cblxufVxuXG5jbGFzcyBSYWRpYWxHcmFkaWVudEVsZW1lbnQgZXh0ZW5kcyBHcmFkaWVudEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcykge1xuICAgIHN1cGVyKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKTtcbiAgICB0aGlzLnR5cGUgPSAncmFkaWFsR3JhZGllbnQnO1xuICAgIHRoaXMuYXR0cmlidXRlc1RvSW5oZXJpdC5wdXNoKCdjeCcsICdjeScsICdyJywgJ2Z4JywgJ2Z5JywgJ2ZyJyk7XG4gIH1cblxuICBnZXRHcmFkaWVudChjdHgsIGVsZW1lbnQpIHtcbiAgICB2YXIgaXNCb3VuZGluZ0JveFVuaXRzID0gdGhpcy5nZXRHcmFkaWVudFVuaXRzKCkgPT09ICdvYmplY3RCb3VuZGluZ0JveCc7XG4gICAgdmFyIGJvdW5kaW5nQm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0JveChjdHgpO1xuXG4gICAgaWYgKGlzQm91bmRpbmdCb3hVbml0cyAmJiAhYm91bmRpbmdCb3gpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ2N4JykuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ2N4JywgdHJ1ZSkuc2V0VmFsdWUoJzUwJScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ2N5JykuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ2N5JywgdHJ1ZSkuc2V0VmFsdWUoJzUwJScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ3InKS5oYXNWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgncicsIHRydWUpLnNldFZhbHVlKCc1MCUnKTtcbiAgICB9XG5cbiAgICB2YXIgY3ggPSBpc0JvdW5kaW5nQm94VW5pdHMgPyBib3VuZGluZ0JveC54ICsgYm91bmRpbmdCb3gud2lkdGggKiB0aGlzLmdldEF0dHJpYnV0ZSgnY3gnKS5nZXROdW1iZXIoKSA6IHRoaXMuZ2V0QXR0cmlidXRlKCdjeCcpLmdldFBpeGVscygneCcpO1xuICAgIHZhciBjeSA9IGlzQm91bmRpbmdCb3hVbml0cyA/IGJvdW5kaW5nQm94LnkgKyBib3VuZGluZ0JveC5oZWlnaHQgKiB0aGlzLmdldEF0dHJpYnV0ZSgnY3knKS5nZXROdW1iZXIoKSA6IHRoaXMuZ2V0QXR0cmlidXRlKCdjeScpLmdldFBpeGVscygneScpO1xuICAgIHZhciBmeCA9IGN4O1xuICAgIHZhciBmeSA9IGN5O1xuXG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdmeCcpLmhhc1ZhbHVlKCkpIHtcbiAgICAgIGZ4ID0gaXNCb3VuZGluZ0JveFVuaXRzID8gYm91bmRpbmdCb3gueCArIGJvdW5kaW5nQm94LndpZHRoICogdGhpcy5nZXRBdHRyaWJ1dGUoJ2Z4JykuZ2V0TnVtYmVyKCkgOiB0aGlzLmdldEF0dHJpYnV0ZSgnZngnKS5nZXRQaXhlbHMoJ3gnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2Z5JykuaGFzVmFsdWUoKSkge1xuICAgICAgZnkgPSBpc0JvdW5kaW5nQm94VW5pdHMgPyBib3VuZGluZ0JveC55ICsgYm91bmRpbmdCb3guaGVpZ2h0ICogdGhpcy5nZXRBdHRyaWJ1dGUoJ2Z5JykuZ2V0TnVtYmVyKCkgOiB0aGlzLmdldEF0dHJpYnV0ZSgnZnknKS5nZXRQaXhlbHMoJ3knKTtcbiAgICB9XG5cbiAgICB2YXIgciA9IGlzQm91bmRpbmdCb3hVbml0cyA/IChib3VuZGluZ0JveC53aWR0aCArIGJvdW5kaW5nQm94LmhlaWdodCkgLyAyLjAgKiB0aGlzLmdldEF0dHJpYnV0ZSgncicpLmdldE51bWJlcigpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3InKS5nZXRQaXhlbHMoKTtcbiAgICB2YXIgZnIgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZnInKS5nZXRQaXhlbHMoKTtcbiAgICByZXR1cm4gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGZ4LCBmeSwgZnIsIGN4LCBjeSwgcik7XG4gIH1cblxufVxuXG5jbGFzcyBTdG9wRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcykge1xuICAgIHN1cGVyKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKTtcbiAgICB0aGlzLnR5cGUgPSAnc3RvcCc7XG4gICAgdmFyIG9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuZ2V0QXR0cmlidXRlKCdvZmZzZXQnKS5nZXROdW1iZXIoKSkpO1xuICAgIHZhciBzdG9wT3BhY2l0eSA9IHRoaXMuZ2V0U3R5bGUoJ3N0b3Atb3BhY2l0eScpO1xuICAgIHZhciBzdG9wQ29sb3IgPSB0aGlzLmdldFN0eWxlKCdzdG9wLWNvbG9yJywgdHJ1ZSk7XG5cbiAgICBpZiAoc3RvcENvbG9yLmdldFN0cmluZygpID09PSAnJykge1xuICAgICAgc3RvcENvbG9yLnNldFZhbHVlKCcjMDAwJyk7XG4gICAgfVxuXG4gICAgaWYgKHN0b3BPcGFjaXR5Lmhhc1ZhbHVlKCkpIHtcbiAgICAgIHN0b3BDb2xvciA9IHN0b3BDb2xvci5hZGRPcGFjaXR5KHN0b3BPcGFjaXR5KTtcbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICB0aGlzLmNvbG9yID0gc3RvcENvbG9yLmdldENvbG9yKCk7XG4gIH1cblxufVxuXG5jbGFzcyBBbmltYXRlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcykge1xuICAgIHN1cGVyKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKTtcbiAgICB0aGlzLnR5cGUgPSAnYW5pbWF0ZSc7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuaW5pdGlhbFVuaXRzID0gJyc7XG4gICAgdGhpcy5yZW1vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5mcm96ZW4gPSBmYWxzZTtcbiAgICBkb2N1bWVudC5zY3JlZW4uYW5pbWF0aW9ucy5wdXNoKHRoaXMpO1xuICAgIHRoaXMuYmVnaW4gPSB0aGlzLmdldEF0dHJpYnV0ZSgnYmVnaW4nKS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICB0aGlzLm1heER1cmF0aW9uID0gdGhpcy5iZWdpbiArIHRoaXMuZ2V0QXR0cmlidXRlKCdkdXInKS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICB0aGlzLmZyb20gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZnJvbScpO1xuICAgIHRoaXMudG8gPSB0aGlzLmdldEF0dHJpYnV0ZSgndG8nKTtcbiAgICB0aGlzLnZhbHVlcyA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3ZhbHVlcycsIG51bGwpO1xuICAgIHZhciB2YWx1ZXNBdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlcycpO1xuXG4gICAgaWYgKHZhbHVlc0F0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgdGhpcy52YWx1ZXMuc2V0VmFsdWUodmFsdWVzQXR0ci5nZXRTdHJpbmcoKS5zcGxpdCgnOycpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm9wZXJ0eSgpIHtcbiAgICB2YXIgYXR0cmlidXRlVHlwZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdhdHRyaWJ1dGVUeXBlJykuZ2V0U3RyaW5nKCk7XG4gICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnYXR0cmlidXRlTmFtZScpLmdldFN0cmluZygpO1xuXG4gICAgaWYgKGF0dHJpYnV0ZVR5cGUgPT09ICdDU1MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0U3R5bGUoYXR0cmlidXRlTmFtZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCB0cnVlKTtcbiAgfVxuXG4gIGNhbGNWYWx1ZSgpIHtcbiAgICB2YXIge1xuICAgICAgaW5pdGlhbFVuaXRzXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHtcbiAgICAgIHByb2dyZXNzLFxuICAgICAgZnJvbSxcbiAgICAgIHRvXG4gICAgfSA9IHRoaXMuZ2V0UHJvZ3Jlc3MoKTsgLy8gdHdlZW4gdmFsdWUgbGluZWFybHlcblxuICAgIHZhciBuZXdWYWx1ZSA9IGZyb20uZ2V0TnVtYmVyKCkgKyAodG8uZ2V0TnVtYmVyKCkgLSBmcm9tLmdldE51bWJlcigpKSAqIHByb2dyZXNzO1xuXG4gICAgaWYgKGluaXRpYWxVbml0cyA9PT0gJyUnKSB7XG4gICAgICBuZXdWYWx1ZSAqPSAxMDAuMDsgLy8gbnVtVmFsdWUoKSByZXR1cm5zIDAtMSB3aGVyZWFzIHByb3BlcnRpZXMgYXJlIDAtMTAwXG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KG5ld1ZhbHVlKS5jb25jYXQoaW5pdGlhbFVuaXRzKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YSkge1xuICAgIHZhciB7XG4gICAgICBwYXJlbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgcHJvcCA9IHRoaXMuZ2V0UHJvcGVydHkoKTsgLy8gc2V0IGluaXRpYWwgdmFsdWVcblxuICAgIGlmICghdGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gcHJvcC5nZXRTdHJpbmcoKTtcbiAgICAgIHRoaXMuaW5pdGlhbFVuaXRzID0gcHJvcC5nZXRVbml0cygpO1xuICAgIH0gLy8gaWYgd2UncmUgcGFzdCB0aGUgZW5kIHRpbWVcblxuXG4gICAgaWYgKHRoaXMuZHVyYXRpb24gPiB0aGlzLm1heER1cmF0aW9uKSB7XG4gICAgICB2YXIgZmlsbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdmaWxsJykuZ2V0U3RyaW5nKCdyZW1vdmUnKTsgLy8gbG9vcCBmb3IgaW5kZWZpbml0ZWx5IHJlcGVhdGluZyBhbmltYXRpb25zXG5cbiAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgncmVwZWF0Q291bnQnKS5nZXRTdHJpbmcoKSA9PT0gJ2luZGVmaW5pdGUnIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCdyZXBlYXREdXInKS5nZXRTdHJpbmcoKSA9PT0gJ2luZGVmaW5pdGUnKSB7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgICAgfSBlbHNlIGlmIChmaWxsID09PSAnZnJlZXplJyAmJiAhdGhpcy5mcm96ZW4pIHtcbiAgICAgICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xuICAgICAgICBwYXJlbnQuYW5pbWF0aW9uRnJvemVuID0gdHJ1ZTtcbiAgICAgICAgcGFyZW50LmFuaW1hdGlvbkZyb3plblZhbHVlID0gcHJvcC5nZXRTdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsbCA9PT0gJ3JlbW92ZScgJiYgIXRoaXMucmVtb3ZlZCkge1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSB0cnVlO1xuICAgICAgICBwcm9wLnNldFZhbHVlKHBhcmVudC5hbmltYXRpb25Gcm96ZW4gPyBwYXJlbnQuYW5pbWF0aW9uRnJvemVuVmFsdWUgOiB0aGlzLmluaXRpYWxWYWx1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5kdXJhdGlvbiArPSBkZWx0YTsgLy8gaWYgd2UncmUgcGFzdCB0aGUgYmVnaW4gdGltZVxuXG4gICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmJlZ2luIDwgdGhpcy5kdXJhdGlvbikge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jYWxjVmFsdWUoKTsgLy8gdHdlZW5cblxuICAgICAgdmFyIHR5cGVBdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKTtcblxuICAgICAgaWYgKHR5cGVBdHRyLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgLy8gZm9yIHRyYW5zZm9ybSwgZXRjLlxuICAgICAgICB2YXIgdHlwZSA9IHR5cGVBdHRyLmdldFN0cmluZygpO1xuICAgICAgICBuZXdWYWx1ZSA9IFwiXCIuY29uY2F0KHR5cGUsIFwiKFwiKS5jb25jYXQobmV3VmFsdWUsIFwiKVwiKTtcbiAgICAgIH1cblxuICAgICAgcHJvcC5zZXRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXBkYXRlZDtcbiAgfVxuXG4gIGdldFByb2dyZXNzKCkge1xuICAgIHZhciB7XG4gICAgICBkb2N1bWVudCxcbiAgICAgIHZhbHVlc1xuICAgIH0gPSB0aGlzO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBwcm9ncmVzczogKHRoaXMuZHVyYXRpb24gLSB0aGlzLmJlZ2luKSAvICh0aGlzLm1heER1cmF0aW9uIC0gdGhpcy5iZWdpbilcbiAgICB9O1xuXG4gICAgaWYgKHZhbHVlcy5oYXNWYWx1ZSgpKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wcm9ncmVzcyAqICh2YWx1ZXMuZ2V0VmFsdWUoKS5sZW5ndGggLSAxKTtcbiAgICAgIHZhciBsYiA9IE1hdGguZmxvb3IocCk7XG4gICAgICB2YXIgdWIgPSBNYXRoLmNlaWwocCk7XG4gICAgICByZXN1bHQuZnJvbSA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ2Zyb20nLCBwYXJzZUZsb2F0KHZhbHVlcy5nZXRWYWx1ZSgpW2xiXSkpO1xuICAgICAgcmVzdWx0LnRvID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAndG8nLCBwYXJzZUZsb2F0KHZhbHVlcy5nZXRWYWx1ZSgpW3ViXSkpO1xuICAgICAgcmVzdWx0LnByb2dyZXNzID0gKHAgLSBsYikgLyAodWIgLSBsYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5mcm9tID0gdGhpcy5mcm9tO1xuICAgICAgcmVzdWx0LnRvID0gdGhpcy50bztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbn1cblxuY2xhc3MgQW5pbWF0ZUNvbG9yRWxlbWVudCBleHRlbmRzIEFuaW1hdGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnYW5pbWF0ZUNvbG9yJztcbiAgfVxuXG4gIGNhbGNWYWx1ZSgpIHtcbiAgICB2YXIge1xuICAgICAgcHJvZ3Jlc3MsXG4gICAgICBmcm9tLFxuICAgICAgdG9cbiAgICB9ID0gdGhpcy5nZXRQcm9ncmVzcygpO1xuICAgIHZhciBjb2xvckZyb20gPSBuZXcgUkdCQ29sb3IoZnJvbS5nZXRDb2xvcigpKTtcbiAgICB2YXIgY29sb3JUbyA9IG5ldyBSR0JDb2xvcih0by5nZXRDb2xvcigpKTtcblxuICAgIGlmIChjb2xvckZyb20ub2sgJiYgY29sb3JUby5vaykge1xuICAgICAgLy8gdHdlZW4gY29sb3IgbGluZWFybHlcbiAgICAgIHZhciByID0gY29sb3JGcm9tLnIgKyAoY29sb3JUby5yIC0gY29sb3JGcm9tLnIpICogcHJvZ3Jlc3M7XG4gICAgICB2YXIgZyA9IGNvbG9yRnJvbS5nICsgKGNvbG9yVG8uZyAtIGNvbG9yRnJvbS5nKSAqIHByb2dyZXNzO1xuICAgICAgdmFyIGIgPSBjb2xvckZyb20uYiArIChjb2xvclRvLmIgLSBjb2xvckZyb20uYikgKiBwcm9ncmVzczsgLy8gPyBhbHBoYVxuXG4gICAgICByZXR1cm4gXCJyZ2IoXCIuY29uY2F0KE1hdGguZmxvb3IociksIFwiLCBcIikuY29uY2F0KE1hdGguZmxvb3IoZyksIFwiLCBcIikuY29uY2F0KE1hdGguZmxvb3IoYiksIFwiKVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zyb20nKS5nZXRDb2xvcigpO1xuICB9XG5cbn1cblxuY2xhc3MgQW5pbWF0ZVRyYW5zZm9ybUVsZW1lbnQgZXh0ZW5kcyBBbmltYXRlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ2FuaW1hdGVUcmFuc2Zvcm0nO1xuICB9XG5cbiAgY2FsY1ZhbHVlKCkge1xuICAgIHZhciB7XG4gICAgICBwcm9ncmVzcyxcbiAgICAgIGZyb20sXG4gICAgICB0b1xuICAgIH0gPSB0aGlzLmdldFByb2dyZXNzKCk7IC8vIHR3ZWVuIHZhbHVlIGxpbmVhcmx5XG5cbiAgICB2YXIgdHJhbnNmb3JtRnJvbSA9IHRvTnVtYmVycyhmcm9tLmdldFN0cmluZygpKTtcbiAgICB2YXIgdHJhbnNmb3JtVG8gPSB0b051bWJlcnModG8uZ2V0U3RyaW5nKCkpO1xuICAgIHZhciBuZXdWYWx1ZSA9IHRyYW5zZm9ybUZyb20ubWFwKChmcm9tLCBpKSA9PiB7XG4gICAgICB2YXIgdG8gPSB0cmFuc2Zvcm1Ub1tpXTtcbiAgICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiBwcm9ncmVzcztcbiAgICB9KS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbn1cblxuY2xhc3MgRm9udEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2ZvbnQnO1xuICAgIHRoaXMuZ2x5cGhzID0ge307XG4gICAgdGhpcy5ob3JpekFkdlggPSB0aGlzLmdldEF0dHJpYnV0ZSgnaG9yaXotYWR2LXgnKS5nZXROdW1iZXIoKTtcbiAgICB2YXIge1xuICAgICAgZGVmaW5pdGlvbnNcbiAgICB9ID0gZG9jdW1lbnQ7XG4gICAgdmFyIHtcbiAgICAgIGNoaWxkcmVuXG4gICAgfSA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgc3dpdGNoIChjaGlsZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2ZvbnQtZmFjZSc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5mb250RmFjZSA9IGNoaWxkO1xuICAgICAgICAgICAgdmFyIGZvbnRGYW1pbHlTdHlsZSA9IGNoaWxkLmdldFN0eWxlKCdmb250LWZhbWlseScpO1xuXG4gICAgICAgICAgICBpZiAoZm9udEZhbWlseVN0eWxlLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgZGVmaW5pdGlvbnNbZm9udEZhbWlseVN0eWxlLmdldFN0cmluZygpXSA9IHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBjYXNlICdtaXNzaW5nLWdseXBoJzpcbiAgICAgICAgICB0aGlzLm1pc3NpbmdHbHlwaCA9IGNoaWxkO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2dseXBoJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZ2x5cGggPSBjaGlsZDtcblxuICAgICAgICAgICAgaWYgKGdseXBoLmFyYWJpY0Zvcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5pc1JUTCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuaXNBcmFiaWMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nbHlwaHNbZ2x5cGgudW5pY29kZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbHlwaHNbZ2x5cGgudW5pY29kZV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuZ2x5cGhzW2dseXBoLnVuaWNvZGVdW2dseXBoLmFyYWJpY0Zvcm1dID0gZ2x5cGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmdseXBoc1tnbHlwaC51bmljb2RlXSA9IGdseXBoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkgey8vIE5PIFJFTkRFUlxuICB9XG5cbn1cblxuY2xhc3MgRm9udEZhY2VFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpO1xuICAgIHRoaXMudHlwZSA9ICdmb250LWZhY2UnO1xuICAgIHRoaXMuYXNjZW50ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2FzY2VudCcpLmdldE51bWJlcigpO1xuICAgIHRoaXMuZGVzY2VudCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkZXNjZW50JykuZ2V0TnVtYmVyKCk7XG4gICAgdGhpcy51bml0c1BlckVtID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VuaXRzLXBlci1lbScpLmdldE51bWJlcigpO1xuICB9XG5cbn1cblxuY2xhc3MgTWlzc2luZ0dseXBoRWxlbWVudCBleHRlbmRzIFBhdGhFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnbWlzc2luZy1nbHlwaCc7XG4gICAgdGhpcy5ob3JpekFkdlggPSAwO1xuICB9XG5cbn1cblxuY2xhc3MgVFJlZkVsZW1lbnQgZXh0ZW5kcyBUZXh0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ3RyZWYnO1xuICB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0SHJlZkF0dHJpYnV0ZSgpLmdldERlZmluaXRpb24oKTtcblxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgZmlyc3RDaGlsZCA9IGVsZW1lbnQuY2hpbGRyZW5bMF07XG5cbiAgICAgIGlmIChmaXJzdENoaWxkKSB7XG4gICAgICAgIHJldHVybiBmaXJzdENoaWxkLmdldFRleHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxufVxuXG5jbGFzcyBBRWxlbWVudCBleHRlbmRzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2EnO1xuICAgIHZhciB7XG4gICAgICBjaGlsZE5vZGVzXG4gICAgfSA9IG5vZGU7XG4gICAgdmFyIGZpcnN0Q2hpbGQgPSBjaGlsZE5vZGVzWzBdO1xuICAgIHZhciBoYXNUZXh0ID0gY2hpbGROb2Rlcy5sZW5ndGggPiAwICYmIEFycmF5LmZyb20oY2hpbGROb2RlcykuZXZlcnkobm9kZSA9PiBub2RlLm5vZGVUeXBlID09PSAzKTtcbiAgICB0aGlzLmhhc1RleHQgPSBoYXNUZXh0O1xuICAgIHRoaXMudGV4dCA9IGhhc1RleHQgPyB0aGlzLmdldFRleHRGcm9tTm9kZShmaXJzdENoaWxkKSA6ICcnO1xuICB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xuICB9XG5cbiAgcmVuZGVyQ2hpbGRyZW4oY3R4KSB7XG4gICAgaWYgKHRoaXMuaGFzVGV4dCkge1xuICAgICAgLy8gcmVuZGVyIGFzIHRleHQgZWxlbWVudFxuICAgICAgc3VwZXIucmVuZGVyQ2hpbGRyZW4oY3R4KTtcbiAgICAgIHZhciB7XG4gICAgICAgIGRvY3VtZW50LFxuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgICB9ID0gdGhpcztcbiAgICAgIHZhciB7XG4gICAgICAgIG1vdXNlXG4gICAgICB9ID0gZG9jdW1lbnQuc2NyZWVuO1xuICAgICAgdmFyIGZvbnRTaXplID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAnZm9udFNpemUnLCBGb250LnBhcnNlKGRvY3VtZW50LmN0eC5mb250KS5mb250U2l6ZSk7IC8vIERvIG5vdCBjYWxjIGJvdW5kaW5nIGJveCBpZiBtb3VzZSBpcyBub3Qgd29ya2luZy5cblxuICAgICAgaWYgKG1vdXNlLmlzV29ya2luZygpKSB7XG4gICAgICAgIG1vdXNlLmNoZWNrQm91bmRpbmdCb3godGhpcywgbmV3IEJvdW5kaW5nQm94KHgsIHkgLSBmb250U2l6ZS5nZXRQaXhlbHMoJ3knKSwgeCArIHRoaXMubWVhc3VyZVRleHQoY3R4KSwgeSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAvLyByZW5kZXIgYXMgdGVtcG9yYXJ5IGdyb3VwXG4gICAgICB2YXIgZyA9IG5ldyBHRWxlbWVudCh0aGlzLmRvY3VtZW50LCBudWxsKTtcbiAgICAgIGcuY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgZy5wYXJlbnQgPSB0aGlzO1xuICAgICAgZy5yZW5kZXIoY3R4KTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrKCkge1xuICAgIHZhciB7XG4gICAgICB3aW5kb3dcbiAgICB9ID0gdGhpcy5kb2N1bWVudDtcblxuICAgIGlmICh3aW5kb3cpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHRoaXMuZ2V0SHJlZkF0dHJpYnV0ZSgpLmdldFN0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlTW92ZSgpIHtcbiAgICB2YXIgY3R4ID0gdGhpcy5kb2N1bWVudC5jdHg7XG4gICAgY3R4LmNhbnZhcy5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBvd25LZXlzJDIob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkJDIodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyQyKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMkMihPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cbmNsYXNzIFRleHRQYXRoRWxlbWVudCBleHRlbmRzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ3RleHRQYXRoJztcbiAgICB0aGlzLnRleHRXaWR0aCA9IDA7XG4gICAgdGhpcy50ZXh0SGVpZ2h0ID0gMDtcbiAgICB0aGlzLnBhdGhMZW5ndGggPSAtMTtcbiAgICB0aGlzLmdseXBoSW5mbyA9IG51bGw7XG4gICAgdGhpcy5sZXR0ZXJTcGFjaW5nQ2FjaGUgPSBbXTtcbiAgICB0aGlzLm1lYXN1cmVzQ2FjaGUgPSBuZXcgTWFwKFtbJycsIDBdXSk7XG4gICAgdmFyIHBhdGhFbGVtZW50ID0gdGhpcy5nZXRIcmVmQXR0cmlidXRlKCkuZ2V0RGVmaW5pdGlvbigpO1xuICAgIHRoaXMudGV4dCA9IHRoaXMuZ2V0VGV4dEZyb21Ob2RlKCk7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSB0aGlzLnBhcnNlUGF0aERhdGEocGF0aEVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xuICB9XG5cbiAgcGF0aChjdHgpIHtcbiAgICB2YXIge1xuICAgICAgZGF0YUFycmF5XG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoY3R4KSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgfVxuXG4gICAgZGF0YUFycmF5LmZvckVhY2goX3JlZiA9PiB7XG4gICAgICB2YXIge1xuICAgICAgICB0eXBlLFxuICAgICAgICBwb2ludHNcbiAgICAgIH0gPSBfcmVmO1xuXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkxJTkVfVE86XG4gICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLk1PVkVfVE86XG4gICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkNVUlZFX1RPOlxuICAgICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0sIHBvaW50c1szXSwgcG9pbnRzWzRdLCBwb2ludHNbNV0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5RVUFEX1RPOlxuICAgICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0sIHBvaW50c1szXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkFSQzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgW2N4LCBjeSwgcngsIHJ5LCB0aGV0YSwgZFRoZXRhLCBwc2ksIGZzXSA9IHBvaW50cztcbiAgICAgICAgICAgIHZhciByID0gcnggPiByeSA/IHJ4IDogcnk7XG4gICAgICAgICAgICB2YXIgc2NhbGVYID0gcnggPiByeSA/IDEgOiByeCAvIHJ5O1xuICAgICAgICAgICAgdmFyIHNjYWxlWSA9IHJ4ID4gcnkgPyByeSAvIHJ4IDogMTtcblxuICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKGN4LCBjeSk7XG4gICAgICAgICAgICAgIGN0eC5yb3RhdGUocHNpKTtcbiAgICAgICAgICAgICAgY3R4LnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgICAgICAgY3R4LmFyYygwLCAwLCByLCB0aGV0YSwgdGhldGEgKyBkVGhldGEsIEJvb2xlYW4oMSAtIGZzKSk7XG4gICAgICAgICAgICAgIGN0eC5zY2FsZSgxIC8gc2NhbGVYLCAxIC8gc2NhbGVZKTtcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtcHNpKTtcbiAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtY3gsIC1jeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBjYXNlIFBhdGhQYXJzZXIuQ0xPU0VfUEFUSDpcbiAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJDaGlsZHJlbihjdHgpIHtcbiAgICB0aGlzLnNldFRleHREYXRhKGN0eCk7XG4gICAgY3R4LnNhdmUoKTtcbiAgICB2YXIgdGV4dERlY29yYXRpb24gPSB0aGlzLnBhcmVudC5nZXRTdHlsZSgndGV4dC1kZWNvcmF0aW9uJykuZ2V0U3RyaW5nKCk7XG4gICAgdmFyIGZvbnRTaXplID0gdGhpcy5nZXRGb250U2l6ZSgpO1xuICAgIHZhciB7XG4gICAgICBnbHlwaEluZm9cbiAgICB9ID0gdGhpcztcbiAgICB2YXIgZmlsbCA9IGN0eC5maWxsU3R5bGU7XG5cbiAgICBpZiAodGV4dERlY29yYXRpb24gPT09ICd1bmRlcmxpbmUnKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgfVxuXG4gICAgZ2x5cGhJbmZvLmZvckVhY2goKGdseXBoLCBpKSA9PiB7XG4gICAgICB2YXIge1xuICAgICAgICBwMCxcbiAgICAgICAgcDEsXG4gICAgICAgIHJvdGF0aW9uLFxuICAgICAgICB0ZXh0OiBwYXJ0aWFsVGV4dFxuICAgICAgfSA9IGdseXBoO1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC50cmFuc2xhdGUocDAueCwgcDAueSk7XG4gICAgICBjdHgucm90YXRlKHJvdGF0aW9uKTtcblxuICAgICAgaWYgKGN0eC5maWxsU3R5bGUpIHtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHBhcnRpYWxUZXh0LCAwLCAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN0eC5zdHJva2VTdHlsZSkge1xuICAgICAgICBjdHguc3Ryb2tlVGV4dChwYXJ0aWFsVGV4dCwgMCwgMCk7XG4gICAgICB9XG5cbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIGlmICh0ZXh0RGVjb3JhdGlvbiA9PT0gJ3VuZGVybGluZScpIHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBjdHgubW92ZVRvKHAwLngsIHAwLnkgKyBmb250U2l6ZSAvIDgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmxpbmVUbyhwMS54LCBwMS55ICsgZm9udFNpemUgLyA1KTtcbiAgICAgIH0gLy8gLy8gVG8gYXNzaXN0IHdpdGggZGVidWdnaW5nIHZpc3VhbGx5LCB1bmNvbW1lbnQgZm9sbG93aW5nXG4gICAgICAvL1xuICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgLy8gaWYgKGkgJSAyKVxuICAgICAgLy8gXHRjdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcbiAgICAgIC8vIGVsc2VcbiAgICAgIC8vIFx0Y3R4LnN0cm9rZVN0eWxlID0gJ2dyZWVuJztcbiAgICAgIC8vIGN0eC5tb3ZlVG8ocDAueCwgcDAueSk7XG4gICAgICAvLyBjdHgubGluZVRvKHAxLngsIHAxLnkpO1xuICAgICAgLy8gY3R4LnN0cm9rZSgpO1xuICAgICAgLy8gY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgfSk7XG5cbiAgICBpZiAodGV4dERlY29yYXRpb24gPT09ICd1bmRlcmxpbmUnKSB7XG4gICAgICBjdHgubGluZVdpZHRoID0gZm9udFNpemUgLyAyMDtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGZpbGw7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGdldExldHRlclNwYWNpbmdBdCgpIHtcbiAgICB2YXIgaWR4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuICAgIHJldHVybiB0aGlzLmxldHRlclNwYWNpbmdDYWNoZVtpZHhdIHx8IDA7XG4gIH1cblxuICBmaW5kU2VnbWVudFRvRml0Q2hhcihjdHgsIGFuY2hvciwgdGV4dEZ1bGxXaWR0aCwgZnVsbFBhdGhXaWR0aCwgc3BhY2VzTnVtYmVyLCBpbnB1dE9mZnNldCwgZHksIGMsIGNoYXJJKSB7XG4gICAgdmFyIG9mZnNldCA9IGlucHV0T2Zmc2V0O1xuICAgIHZhciBnbHlwaFdpZHRoID0gdGhpcy5tZWFzdXJlVGV4dChjdHgsIGMpO1xuXG4gICAgaWYgKGMgPT09ICcgJyAmJiBhbmNob3IgPT09ICdqdXN0aWZ5JyAmJiB0ZXh0RnVsbFdpZHRoIDwgZnVsbFBhdGhXaWR0aCkge1xuICAgICAgZ2x5cGhXaWR0aCArPSAoZnVsbFBhdGhXaWR0aCAtIHRleHRGdWxsV2lkdGgpIC8gc3BhY2VzTnVtYmVyO1xuICAgIH1cblxuICAgIGlmIChjaGFySSA+IC0xKSB7XG4gICAgICBvZmZzZXQgKz0gdGhpcy5nZXRMZXR0ZXJTcGFjaW5nQXQoY2hhckkpO1xuICAgIH1cblxuICAgIHZhciBzcGxpbmVTdGVwID0gdGhpcy50ZXh0SGVpZ2h0IC8gMjA7XG4gICAgdmFyIHAwID0gdGhpcy5nZXRFcXVpZGlzdGFudFBvaW50T25QYXRoKG9mZnNldCwgc3BsaW5lU3RlcCwgMCk7XG4gICAgdmFyIHAxID0gdGhpcy5nZXRFcXVpZGlzdGFudFBvaW50T25QYXRoKG9mZnNldCArIGdseXBoV2lkdGgsIHNwbGluZVN0ZXAsIDApO1xuICAgIHZhciBzZWdtZW50ID0ge1xuICAgICAgcDAsXG4gICAgICBwMVxuICAgIH07XG4gICAgdmFyIHJvdGF0aW9uID0gcDAgJiYgcDEgPyBNYXRoLmF0YW4yKHAxLnkgLSBwMC55LCBwMS54IC0gcDAueCkgOiAwO1xuXG4gICAgaWYgKGR5KSB7XG4gICAgICB2YXIgZHlYID0gTWF0aC5jb3MoTWF0aC5QSSAvIDIgKyByb3RhdGlvbikgKiBkeTtcbiAgICAgIHZhciBkeVkgPSBNYXRoLmNvcygtcm90YXRpb24pICogZHk7XG4gICAgICBzZWdtZW50LnAwID0gX29iamVjdFNwcmVhZCQyKF9vYmplY3RTcHJlYWQkMih7fSwgcDApLCB7fSwge1xuICAgICAgICB4OiBwMC54ICsgZHlYLFxuICAgICAgICB5OiBwMC55ICsgZHlZXG4gICAgICB9KTtcbiAgICAgIHNlZ21lbnQucDEgPSBfb2JqZWN0U3ByZWFkJDIoX29iamVjdFNwcmVhZCQyKHt9LCBwMSksIHt9LCB7XG4gICAgICAgIHg6IHAxLnggKyBkeVgsXG4gICAgICAgIHk6IHAxLnkgKyBkeVlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9mZnNldCArPSBnbHlwaFdpZHRoO1xuICAgIHJldHVybiB7XG4gICAgICBvZmZzZXQsXG4gICAgICBzZWdtZW50LFxuICAgICAgcm90YXRpb25cbiAgICB9O1xuICB9XG5cbiAgbWVhc3VyZVRleHQoY3R4LCB0ZXh0KSB7XG4gICAgdmFyIHtcbiAgICAgIG1lYXN1cmVzQ2FjaGVcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgdGFyZ2V0VGV4dCA9IHRleHQgfHwgdGhpcy5nZXRUZXh0KCk7XG5cbiAgICBpZiAobWVhc3VyZXNDYWNoZS5oYXModGFyZ2V0VGV4dCkpIHtcbiAgICAgIHJldHVybiBtZWFzdXJlc0NhY2hlLmdldCh0YXJnZXRUZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgbWVhc3VyZSA9IHRoaXMubWVhc3VyZVRhcmdldFRleHQoY3R4LCB0YXJnZXRUZXh0KTtcbiAgICBtZWFzdXJlc0NhY2hlLnNldCh0YXJnZXRUZXh0LCBtZWFzdXJlKTtcbiAgICByZXR1cm4gbWVhc3VyZTtcbiAgfSAvLyBUaGlzIG1ldGhvZCBzdXBwb3NlcyB3aGF0IGFsbCBjdXN0b20gZm9udHMgYWxyZWFkeSBsb2FkZWQuXG4gIC8vIElmIHNvbWUgZm9udCB3aWxsIGJlIGxvYWRlZCBhZnRlciB0aGlzIG1ldGhvZCBjYWxsLCA8dGV4dFBhdGg+IHdpbGwgbm90IGJlIHJlbmRlcmVkIGNvcnJlY3RseS5cbiAgLy8gWW91IG5lZWQgdG8gY2FsbCB0aGlzIG1ldGhvZCBtYW51YWxseSB0byB1cGRhdGUgZ2x5cGhzIGNhY2hlLlxuXG5cbiAgc2V0VGV4dERhdGEoY3R4KSB7XG4gICAgaWYgKHRoaXMuZ2x5cGhJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlbmRlclRleHQgPSB0aGlzLmdldFRleHQoKTtcbiAgICB2YXIgY2hhcnMgPSByZW5kZXJUZXh0LnNwbGl0KCcnKTtcbiAgICB2YXIgc3BhY2VzTnVtYmVyID0gcmVuZGVyVGV4dC5zcGxpdCgnICcpLmxlbmd0aCAtIDE7XG4gICAgdmFyIGR4ID0gdGhpcy5wYXJlbnQuZ2V0QXR0cmlidXRlKCdkeCcpLnNwbGl0KCkubWFwKF8gPT4gXy5nZXRQaXhlbHMoJ3gnKSk7XG4gICAgdmFyIGR5ID0gdGhpcy5wYXJlbnQuZ2V0QXR0cmlidXRlKCdkeScpLmdldFBpeGVscygneScpO1xuICAgIHZhciBhbmNob3IgPSB0aGlzLnBhcmVudC5nZXRTdHlsZSgndGV4dC1hbmNob3InKS5nZXRTdHJpbmcoJ3N0YXJ0Jyk7XG4gICAgdmFyIHRoaXNTcGFjaW5nID0gdGhpcy5nZXRTdHlsZSgnbGV0dGVyLXNwYWNpbmcnKTtcbiAgICB2YXIgcGFyZW50U3BhY2luZyA9IHRoaXMucGFyZW50LmdldFN0eWxlKCdsZXR0ZXItc3BhY2luZycpO1xuICAgIHZhciBsZXR0ZXJTcGFjaW5nID0gMDtcblxuICAgIGlmICghdGhpc1NwYWNpbmcuaGFzVmFsdWUoKSB8fCB0aGlzU3BhY2luZy5nZXRWYWx1ZSgpID09PSAnaW5oZXJpdCcpIHtcbiAgICAgIGxldHRlclNwYWNpbmcgPSBwYXJlbnRTcGFjaW5nLmdldFBpeGVscygpO1xuICAgIH0gZWxzZSBpZiAodGhpc1NwYWNpbmcuaGFzVmFsdWUoKSkge1xuICAgICAgaWYgKHRoaXNTcGFjaW5nLmdldFZhbHVlKCkgIT09ICdpbml0aWFsJyAmJiB0aGlzU3BhY2luZy5nZXRWYWx1ZSgpICE9PSAndW5zZXQnKSB7XG4gICAgICAgIGxldHRlclNwYWNpbmcgPSB0aGlzU3BhY2luZy5nZXRQaXhlbHMoKTtcbiAgICAgIH1cbiAgICB9IC8vIGZpbGwgbGV0dGVyLXNwYWNpbmcgY2FjaGVcblxuXG4gICAgdmFyIGxldHRlclNwYWNpbmdDYWNoZSA9IFtdO1xuICAgIHZhciB0ZXh0TGVuID0gcmVuZGVyVGV4dC5sZW5ndGg7XG4gICAgdGhpcy5sZXR0ZXJTcGFjaW5nQ2FjaGUgPSBsZXR0ZXJTcGFjaW5nQ2FjaGU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRMZW47IGkrKykge1xuICAgICAgbGV0dGVyU3BhY2luZ0NhY2hlLnB1c2godHlwZW9mIGR4W2ldICE9PSAndW5kZWZpbmVkJyA/IGR4W2ldIDogbGV0dGVyU3BhY2luZyk7XG4gICAgfVxuXG4gICAgdmFyIGR4U3VtID0gbGV0dGVyU3BhY2luZ0NhY2hlLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IGkgPT09IDAgPyAwIDogYWNjICsgY3VyIHx8IDAsIDApO1xuICAgIHZhciB0ZXh0V2lkdGggPSB0aGlzLm1lYXN1cmVUZXh0KGN0eCk7XG4gICAgdmFyIHRleHRGdWxsV2lkdGggPSBNYXRoLm1heCh0ZXh0V2lkdGggKyBkeFN1bSwgMCk7XG4gICAgdGhpcy50ZXh0V2lkdGggPSB0ZXh0V2lkdGg7XG4gICAgdGhpcy50ZXh0SGVpZ2h0ID0gdGhpcy5nZXRGb250U2l6ZSgpO1xuICAgIHRoaXMuZ2x5cGhJbmZvID0gW107XG4gICAgdmFyIGZ1bGxQYXRoV2lkdGggPSB0aGlzLmdldFBhdGhMZW5ndGgoKTtcbiAgICB2YXIgc3RhcnRPZmZzZXQgPSB0aGlzLmdldFN0eWxlKCdzdGFydE9mZnNldCcpLmdldE51bWJlcigwKSAqIGZ1bGxQYXRoV2lkdGg7XG4gICAgdmFyIG9mZnNldCA9IDA7XG5cbiAgICBpZiAoYW5jaG9yID09PSAnbWlkZGxlJyB8fCBhbmNob3IgPT09ICdjZW50ZXInKSB7XG4gICAgICBvZmZzZXQgPSAtdGV4dEZ1bGxXaWR0aCAvIDI7XG4gICAgfVxuXG4gICAgaWYgKGFuY2hvciA9PT0gJ2VuZCcgfHwgYW5jaG9yID09PSAncmlnaHQnKSB7XG4gICAgICBvZmZzZXQgPSAtdGV4dEZ1bGxXaWR0aDtcbiAgICB9XG5cbiAgICBvZmZzZXQgKz0gc3RhcnRPZmZzZXQ7XG4gICAgY2hhcnMuZm9yRWFjaCgoY2hhciwgaSkgPT4ge1xuICAgICAgLy8gRmluZCBzdWNoIHNlZ21lbnQgd2hhdCBkaXN0YW5jZSBiZXR3ZWVuIHAwIGFuZCBwMSBpcyBhcHByb3guIHdpZHRoIG9mIGdseXBoXG4gICAgICB2YXIge1xuICAgICAgICBvZmZzZXQ6IG5leHRPZmZzZXQsXG4gICAgICAgIHNlZ21lbnQsXG4gICAgICAgIHJvdGF0aW9uXG4gICAgICB9ID0gdGhpcy5maW5kU2VnbWVudFRvRml0Q2hhcihjdHgsIGFuY2hvciwgdGV4dEZ1bGxXaWR0aCwgZnVsbFBhdGhXaWR0aCwgc3BhY2VzTnVtYmVyLCBvZmZzZXQsIGR5LCBjaGFyLCBpKTtcbiAgICAgIG9mZnNldCA9IG5leHRPZmZzZXQ7XG5cbiAgICAgIGlmICghc2VnbWVudC5wMCB8fCAhc2VnbWVudC5wMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRMaW5lTGVuZ3RoKFxuICAgICAgLy8gXHRzZWdtZW50LnAwLngsXG4gICAgICAvLyBcdHNlZ21lbnQucDAueSxcbiAgICAgIC8vIFx0c2VnbWVudC5wMS54LFxuICAgICAgLy8gXHRzZWdtZW50LnAxLnlcbiAgICAgIC8vICk7XG4gICAgICAvLyBOb3RlOiBTaW5jZSBnbHlwaHMgYXJlIHJlbmRlcmVkIG9uZSBhdCBhIHRpbWUsIGFueSBrZXJuaW5nIHBhaXIgZGF0YSBidWlsdCBpbnRvIHRoZSBmb250IHdpbGwgbm90IGJlIHVzZWQuXG4gICAgICAvLyBDYW4gZm9yZXNlZSBoYXZpbmcgYSByb3VnaCBwYWlyIHRhYmxlIGJ1aWx0IGluIHRoYXQgdGhlIGRldmVsb3BlciBjYW4gb3ZlcnJpZGUgYXMgbmVlZGVkLlxuICAgICAgLy8gT3IgdXNlIFwiZHhcIiBhdHRyaWJ1dGUgb2YgdGhlIDx0ZXh0PiBub2RlIGFzIGEgbmFpdmUgcmVwbGFjZW1lbnRcbiAgICAgIC8vIGNvbnN0IGtlcm4gPSAwO1xuICAgICAgLy8gcGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSBpbXBsZW1lbnRhdGlvblxuICAgICAgLy8gY29uc3QgbWlkcG9pbnQgPSB0aGlzLmdldFBvaW50T25MaW5lKFxuICAgICAgLy8gXHRrZXJuICsgd2lkdGggLyAyLjAsXG4gICAgICAvLyBcdHNlZ21lbnQucDAueCwgc2VnbWVudC5wMC55LCBzZWdtZW50LnAxLngsIHNlZ21lbnQucDEueVxuICAgICAgLy8gKTtcblxuXG4gICAgICB0aGlzLmdseXBoSW5mby5wdXNoKHtcbiAgICAgICAgLy8gdHJhbnNwb3NlWDogbWlkcG9pbnQueCxcbiAgICAgICAgLy8gdHJhbnNwb3NlWTogbWlkcG9pbnQueSxcbiAgICAgICAgdGV4dDogY2hhcnNbaV0sXG4gICAgICAgIHAwOiBzZWdtZW50LnAwLFxuICAgICAgICBwMTogc2VnbWVudC5wMSxcbiAgICAgICAgcm90YXRpb25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcGFyc2VQYXRoRGF0YShwYXRoKSB7XG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gLTE7IC8vIHJlc2V0IHBhdGggbGVuZ3RoXG5cbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aENvbW1hbmRzID0gW107XG4gICAgdmFyIHtcbiAgICAgIHBhdGhQYXJzZXJcbiAgICB9ID0gcGF0aDtcbiAgICBwYXRoUGFyc2VyLnJlc2V0KCk7IC8vIGNvbnZlcnQgbCwgSCwgaCwgViwgYW5kIHYgdG8gTFxuXG4gICAgd2hpbGUgKCFwYXRoUGFyc2VyLmlzRW5kKCkpIHtcbiAgICAgIHZhciB7XG4gICAgICAgIGN1cnJlbnRcbiAgICAgIH0gPSBwYXRoUGFyc2VyO1xuICAgICAgdmFyIHN0YXJ0WCA9IGN1cnJlbnQgPyBjdXJyZW50LnggOiAwO1xuICAgICAgdmFyIHN0YXJ0WSA9IGN1cnJlbnQgPyBjdXJyZW50LnkgOiAwO1xuICAgICAgdmFyIGNvbW1hbmQgPSBwYXRoUGFyc2VyLm5leHQoKTtcbiAgICAgIHZhciBuZXh0Q29tbWFuZFR5cGUgPSBjb21tYW5kLnR5cGU7XG4gICAgICB2YXIgcG9pbnRzID0gW107XG5cbiAgICAgIHN3aXRjaCAoY29tbWFuZC50eXBlKSB7XG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5NT1ZFX1RPOlxuICAgICAgICAgIHRoaXMucGF0aE0ocGF0aFBhcnNlciwgcG9pbnRzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFBhdGhQYXJzZXIuTElORV9UTzpcbiAgICAgICAgICBuZXh0Q29tbWFuZFR5cGUgPSB0aGlzLnBhdGhMKHBhdGhQYXJzZXIsIHBvaW50cyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkhPUklaX0xJTkVfVE86XG4gICAgICAgICAgbmV4dENvbW1hbmRUeXBlID0gdGhpcy5wYXRoSChwYXRoUGFyc2VyLCBwb2ludHMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5WRVJUX0xJTkVfVE86XG4gICAgICAgICAgbmV4dENvbW1hbmRUeXBlID0gdGhpcy5wYXRoVihwYXRoUGFyc2VyLCBwb2ludHMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5DVVJWRV9UTzpcbiAgICAgICAgICB0aGlzLnBhdGhDKHBhdGhQYXJzZXIsIHBvaW50cyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLlNNT09USF9DVVJWRV9UTzpcbiAgICAgICAgICBuZXh0Q29tbWFuZFR5cGUgPSB0aGlzLnBhdGhTKHBhdGhQYXJzZXIsIHBvaW50cyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLlFVQURfVE86XG4gICAgICAgICAgdGhpcy5wYXRoUShwYXRoUGFyc2VyLCBwb2ludHMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5TTU9PVEhfUVVBRF9UTzpcbiAgICAgICAgICBuZXh0Q29tbWFuZFR5cGUgPSB0aGlzLnBhdGhUKHBhdGhQYXJzZXIsIHBvaW50cyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkFSQzpcbiAgICAgICAgICBwb2ludHMgPSB0aGlzLnBhdGhBKHBhdGhQYXJzZXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5DTE9TRV9QQVRIOlxuICAgICAgICAgIFBhdGhFbGVtZW50LnBhdGhaKHBhdGhQYXJzZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tbWFuZC50eXBlICE9PSBQYXRoUGFyc2VyLkNMT1NFX1BBVEgpIHtcbiAgICAgICAgcGF0aENvbW1hbmRzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IG5leHRDb21tYW5kVHlwZSxcbiAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgIHg6IHN0YXJ0WCxcbiAgICAgICAgICAgIHk6IHN0YXJ0WVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGF0aExlbmd0aDogdGhpcy5jYWxjTGVuZ3RoKHN0YXJ0WCwgc3RhcnRZLCBuZXh0Q29tbWFuZFR5cGUsIHBvaW50cylcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXRoQ29tbWFuZHMucHVzaCh7XG4gICAgICAgICAgdHlwZTogUGF0aFBhcnNlci5DTE9TRV9QQVRILFxuICAgICAgICAgIHBvaW50czogW10sXG4gICAgICAgICAgcGF0aExlbmd0aDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aENvbW1hbmRzO1xuICB9XG5cbiAgcGF0aE0ocGF0aFBhcnNlciwgcG9pbnRzKSB7XG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhNKHBhdGhQYXJzZXIpLnBvaW50O1xuICAgIHBvaW50cy5wdXNoKHgsIHkpO1xuICB9XG5cbiAgcGF0aEwocGF0aFBhcnNlciwgcG9pbnRzKSB7XG4gICAgdmFyIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhMKHBhdGhQYXJzZXIpLnBvaW50O1xuICAgIHBvaW50cy5wdXNoKHgsIHkpO1xuICAgIHJldHVybiBQYXRoUGFyc2VyLkxJTkVfVE87XG4gIH1cblxuICBwYXRoSChwYXRoUGFyc2VyLCBwb2ludHMpIHtcbiAgICB2YXIge1xuICAgICAgeCxcbiAgICAgIHlcbiAgICB9ID0gUGF0aEVsZW1lbnQucGF0aEgocGF0aFBhcnNlcikucG9pbnQ7XG4gICAgcG9pbnRzLnB1c2goeCwgeSk7XG4gICAgcmV0dXJuIFBhdGhQYXJzZXIuTElORV9UTztcbiAgfVxuXG4gIHBhdGhWKHBhdGhQYXJzZXIsIHBvaW50cykge1xuICAgIHZhciB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH0gPSBQYXRoRWxlbWVudC5wYXRoVihwYXRoUGFyc2VyKS5wb2ludDtcbiAgICBwb2ludHMucHVzaCh4LCB5KTtcbiAgICByZXR1cm4gUGF0aFBhcnNlci5MSU5FX1RPO1xuICB9XG5cbiAgcGF0aEMocGF0aFBhcnNlciwgcG9pbnRzKSB7XG4gICAgdmFyIHtcbiAgICAgIHBvaW50LFxuICAgICAgY29udHJvbFBvaW50LFxuICAgICAgY3VycmVudFBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhDKHBhdGhQYXJzZXIpO1xuICAgIHBvaW50cy5wdXNoKHBvaW50LngsIHBvaW50LnksIGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcbiAgfVxuXG4gIHBhdGhTKHBhdGhQYXJzZXIsIHBvaW50cykge1xuICAgIHZhciB7XG4gICAgICBwb2ludCxcbiAgICAgIGNvbnRyb2xQb2ludCxcbiAgICAgIGN1cnJlbnRQb2ludFxuICAgIH0gPSBQYXRoRWxlbWVudC5wYXRoUyhwYXRoUGFyc2VyKTtcbiAgICBwb2ludHMucHVzaChwb2ludC54LCBwb2ludC55LCBjb250cm9sUG9pbnQueCwgY29udHJvbFBvaW50LnksIGN1cnJlbnRQb2ludC54LCBjdXJyZW50UG9pbnQueSk7XG4gICAgcmV0dXJuIFBhdGhQYXJzZXIuQ1VSVkVfVE87XG4gIH1cblxuICBwYXRoUShwYXRoUGFyc2VyLCBwb2ludHMpIHtcbiAgICB2YXIge1xuICAgICAgY29udHJvbFBvaW50LFxuICAgICAgY3VycmVudFBvaW50XG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhRKHBhdGhQYXJzZXIpO1xuICAgIHBvaW50cy5wdXNoKGNvbnRyb2xQb2ludC54LCBjb250cm9sUG9pbnQueSwgY3VycmVudFBvaW50LngsIGN1cnJlbnRQb2ludC55KTtcbiAgfVxuXG4gIHBhdGhUKHBhdGhQYXJzZXIsIHBvaW50cykge1xuICAgIHZhciB7XG4gICAgICBjb250cm9sUG9pbnQsXG4gICAgICBjdXJyZW50UG9pbnRcbiAgICB9ID0gUGF0aEVsZW1lbnQucGF0aFQocGF0aFBhcnNlcik7XG4gICAgcG9pbnRzLnB1c2goY29udHJvbFBvaW50LngsIGNvbnRyb2xQb2ludC55LCBjdXJyZW50UG9pbnQueCwgY3VycmVudFBvaW50LnkpO1xuICAgIHJldHVybiBQYXRoUGFyc2VyLlFVQURfVE87XG4gIH1cblxuICBwYXRoQShwYXRoUGFyc2VyKSB7XG4gICAgdmFyIHtcbiAgICAgIHJYLFxuICAgICAgclksXG4gICAgICBzd2VlcEZsYWcsXG4gICAgICB4QXhpc1JvdGF0aW9uLFxuICAgICAgY2VudHAsXG4gICAgICBhMSxcbiAgICAgIGFkXG4gICAgfSA9IFBhdGhFbGVtZW50LnBhdGhBKHBhdGhQYXJzZXIpO1xuXG4gICAgaWYgKHN3ZWVwRmxhZyA9PT0gMCAmJiBhZCA+IDApIHtcbiAgICAgIGFkIC09IDIgKiBNYXRoLlBJO1xuICAgIH1cblxuICAgIGlmIChzd2VlcEZsYWcgPT09IDEgJiYgYWQgPCAwKSB7XG4gICAgICBhZCArPSAyICogTWF0aC5QSTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2NlbnRwLngsIGNlbnRwLnksIHJYLCByWSwgYTEsIGFkLCB4QXhpc1JvdGF0aW9uLCBzd2VlcEZsYWddO1xuICB9XG5cbiAgY2FsY0xlbmd0aCh4LCB5LCBjb21tYW5kVHlwZSwgcG9pbnRzKSB7XG4gICAgdmFyIGxlbiA9IDA7XG4gICAgdmFyIHAxID0gbnVsbDtcbiAgICB2YXIgcDIgPSBudWxsO1xuICAgIHZhciB0ID0gMDtcblxuICAgIHN3aXRjaCAoY29tbWFuZFR5cGUpIHtcbiAgICAgIGNhc2UgUGF0aFBhcnNlci5MSU5FX1RPOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lTGVuZ3RoKHgsIHksIHBvaW50c1swXSwgcG9pbnRzWzFdKTtcblxuICAgICAgY2FzZSBQYXRoUGFyc2VyLkNVUlZFX1RPOlxuICAgICAgICAvLyBBcHByb3hpbWF0ZXMgYnkgYnJlYWtpbmcgY3VydmUgaW50byAxMDAgbGluZSBzZWdtZW50c1xuICAgICAgICBsZW4gPSAwLjA7XG4gICAgICAgIHAxID0gdGhpcy5nZXRQb2ludE9uQ3ViaWNCZXppZXIoMCwgeCwgeSwgcG9pbnRzWzBdLCBwb2ludHNbMV0sIHBvaW50c1syXSwgcG9pbnRzWzNdLCBwb2ludHNbNF0sIHBvaW50c1s1XSk7XG5cbiAgICAgICAgZm9yICh0ID0gMC4wMTsgdCA8PSAxOyB0ICs9IDAuMDEpIHtcbiAgICAgICAgICBwMiA9IHRoaXMuZ2V0UG9pbnRPbkN1YmljQmV6aWVyKHQsIHgsIHksIHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0sIHBvaW50c1szXSwgcG9pbnRzWzRdLCBwb2ludHNbNV0pO1xuICAgICAgICAgIGxlbiArPSB0aGlzLmdldExpbmVMZW5ndGgocDEueCwgcDEueSwgcDIueCwgcDIueSk7XG4gICAgICAgICAgcDEgPSBwMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW47XG5cbiAgICAgIGNhc2UgUGF0aFBhcnNlci5RVUFEX1RPOlxuICAgICAgICAvLyBBcHByb3hpbWF0ZXMgYnkgYnJlYWtpbmcgY3VydmUgaW50byAxMDAgbGluZSBzZWdtZW50c1xuICAgICAgICBsZW4gPSAwLjA7XG4gICAgICAgIHAxID0gdGhpcy5nZXRQb2ludE9uUXVhZHJhdGljQmV6aWVyKDAsIHgsIHksIHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0sIHBvaW50c1szXSk7XG5cbiAgICAgICAgZm9yICh0ID0gMC4wMTsgdCA8PSAxOyB0ICs9IDAuMDEpIHtcbiAgICAgICAgICBwMiA9IHRoaXMuZ2V0UG9pbnRPblF1YWRyYXRpY0Jlemllcih0LCB4LCB5LCBwb2ludHNbMF0sIHBvaW50c1sxXSwgcG9pbnRzWzJdLCBwb2ludHNbM10pO1xuICAgICAgICAgIGxlbiArPSB0aGlzLmdldExpbmVMZW5ndGgocDEueCwgcDEueSwgcDIueCwgcDIueSk7XG4gICAgICAgICAgcDEgPSBwMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW47XG5cbiAgICAgIGNhc2UgUGF0aFBhcnNlci5BUkM6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBBcHByb3hpbWF0ZXMgYnkgYnJlYWtpbmcgY3VydmUgaW50byBsaW5lIHNlZ21lbnRzXG4gICAgICAgICAgbGVuID0gMC4wO1xuICAgICAgICAgIHZhciBzdGFydCA9IHBvaW50c1s0XTsgLy8gNCA9IHRoZXRhXG5cbiAgICAgICAgICB2YXIgZFRoZXRhID0gcG9pbnRzWzVdOyAvLyA1ID0gZFRoZXRhXG5cbiAgICAgICAgICB2YXIgZW5kID0gcG9pbnRzWzRdICsgZFRoZXRhO1xuICAgICAgICAgIHZhciBpbmMgPSBNYXRoLlBJIC8gMTgwLjA7IC8vIDEgZGVncmVlIHJlc29sdXRpb25cblxuICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydCAtIGVuZCkgPCBpbmMpIHtcbiAgICAgICAgICAgIGluYyA9IE1hdGguYWJzKHN0YXJ0IC0gZW5kKTtcbiAgICAgICAgICB9IC8vIE5vdGU6IGZvciBwdXJwb3NlIG9mIGNhbGN1bGF0aW5nIGFyYyBsZW5ndGgsIG5vdCBnb2luZyB0byB3b3JyeSBhYm91dCByb3RhdGluZyBYLWF4aXMgYnkgYW5nbGUgcHNpXG5cblxuICAgICAgICAgIHAxID0gdGhpcy5nZXRQb2ludE9uRWxsaXB0aWNhbEFyYyhwb2ludHNbMF0sIHBvaW50c1sxXSwgcG9pbnRzWzJdLCBwb2ludHNbM10sIHN0YXJ0LCAwKTtcblxuICAgICAgICAgIGlmIChkVGhldGEgPCAwKSB7XG4gICAgICAgICAgICAvLyBjbG9ja3dpc2VcbiAgICAgICAgICAgIGZvciAodCA9IHN0YXJ0IC0gaW5jOyB0ID4gZW5kOyB0IC09IGluYykge1xuICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0UG9pbnRPbkVsbGlwdGljYWxBcmMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHBvaW50c1syXSwgcG9pbnRzWzNdLCB0LCAwKTtcbiAgICAgICAgICAgICAgbGVuICs9IHRoaXMuZ2V0TGluZUxlbmd0aChwMS54LCBwMS55LCBwMi54LCBwMi55KTtcbiAgICAgICAgICAgICAgcDEgPSBwMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY291bnRlci1jbG9ja3dpc2VcbiAgICAgICAgICAgIGZvciAodCA9IHN0YXJ0ICsgaW5jOyB0IDwgZW5kOyB0ICs9IGluYykge1xuICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0UG9pbnRPbkVsbGlwdGljYWxBcmMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHBvaW50c1syXSwgcG9pbnRzWzNdLCB0LCAwKTtcbiAgICAgICAgICAgICAgbGVuICs9IHRoaXMuZ2V0TGluZUxlbmd0aChwMS54LCBwMS55LCBwMi54LCBwMi55KTtcbiAgICAgICAgICAgICAgcDEgPSBwMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwMiA9IHRoaXMuZ2V0UG9pbnRPbkVsbGlwdGljYWxBcmMocG9pbnRzWzBdLCBwb2ludHNbMV0sIHBvaW50c1syXSwgcG9pbnRzWzNdLCBlbmQsIDApO1xuICAgICAgICAgIGxlbiArPSB0aGlzLmdldExpbmVMZW5ndGgocDEueCwgcDEueSwgcDIueCwgcDIueSk7XG4gICAgICAgICAgcmV0dXJuIGxlbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZ2V0UG9pbnRPbkxpbmUoZGlzdCwgcDF4LCBwMXksIHAyeCwgcDJ5KSB7XG4gICAgdmFyIGZyb21YID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiBwMXg7XG4gICAgdmFyIGZyb21ZID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiBwMXk7XG4gICAgdmFyIG0gPSAocDJ5IC0gcDF5KSAvIChwMnggLSBwMXggKyBQU0VVRE9fWkVSTyk7XG4gICAgdmFyIHJ1biA9IE1hdGguc3FydChkaXN0ICogZGlzdCAvICgxICsgbSAqIG0pKTtcblxuICAgIGlmIChwMnggPCBwMXgpIHtcbiAgICAgIHJ1biAqPSAtMTtcbiAgICB9XG5cbiAgICB2YXIgcmlzZSA9IG0gKiBydW47XG4gICAgdmFyIHB0ID0gbnVsbDtcblxuICAgIGlmIChwMnggPT09IHAxeCkge1xuICAgICAgLy8gdmVydGljYWwgbGluZVxuICAgICAgcHQgPSB7XG4gICAgICAgIHg6IGZyb21YLFxuICAgICAgICB5OiBmcm9tWSArIHJpc2VcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICgoZnJvbVkgLSBwMXkpIC8gKGZyb21YIC0gcDF4ICsgUFNFVURPX1pFUk8pID09PSBtKSB7XG4gICAgICBwdCA9IHtcbiAgICAgICAgeDogZnJvbVggKyBydW4sXG4gICAgICAgIHk6IGZyb21ZICsgcmlzZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGl4ID0gMDtcbiAgICAgIHZhciBpeSA9IDA7XG4gICAgICB2YXIgbGVuID0gdGhpcy5nZXRMaW5lTGVuZ3RoKHAxeCwgcDF5LCBwMngsIHAyeSk7XG5cbiAgICAgIGlmIChsZW4gPCBQU0VVRE9fWkVSTykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHUgPSAoZnJvbVggLSBwMXgpICogKHAyeCAtIHAxeCkgKyAoZnJvbVkgLSBwMXkpICogKHAyeSAtIHAxeSk7XG4gICAgICB1IC89IGxlbiAqIGxlbjtcbiAgICAgIGl4ID0gcDF4ICsgdSAqIChwMnggLSBwMXgpO1xuICAgICAgaXkgPSBwMXkgKyB1ICogKHAyeSAtIHAxeSk7XG4gICAgICB2YXIgcFJpc2UgPSB0aGlzLmdldExpbmVMZW5ndGgoZnJvbVgsIGZyb21ZLCBpeCwgaXkpO1xuICAgICAgdmFyIHBSdW4gPSBNYXRoLnNxcnQoZGlzdCAqIGRpc3QgLSBwUmlzZSAqIHBSaXNlKTtcbiAgICAgIHJ1biA9IE1hdGguc3FydChwUnVuICogcFJ1biAvICgxICsgbSAqIG0pKTtcblxuICAgICAgaWYgKHAyeCA8IHAxeCkge1xuICAgICAgICBydW4gKj0gLTE7XG4gICAgICB9XG5cbiAgICAgIHJpc2UgPSBtICogcnVuO1xuICAgICAgcHQgPSB7XG4gICAgICAgIHg6IGl4ICsgcnVuLFxuICAgICAgICB5OiBpeSArIHJpc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHB0O1xuICB9XG5cbiAgZ2V0UG9pbnRPblBhdGgoZGlzdGFuY2UpIHtcbiAgICB2YXIgZnVsbExlbiA9IHRoaXMuZ2V0UGF0aExlbmd0aCgpO1xuICAgIHZhciBjdW11bGF0aXZlUGF0aExlbmd0aCA9IDA7XG4gICAgdmFyIHAgPSBudWxsO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgLTAuMDAwMDUgfHwgZGlzdGFuY2UgLSAwLjAwMDA1ID4gZnVsbExlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHtcbiAgICAgIGRhdGFBcnJheVxuICAgIH0gPSB0aGlzO1xuXG4gICAgZm9yICh2YXIgY29tbWFuZCBvZiBkYXRhQXJyYXkpIHtcbiAgICAgIGlmIChjb21tYW5kICYmIChjb21tYW5kLnBhdGhMZW5ndGggPCAwLjAwMDA1IHx8IGN1bXVsYXRpdmVQYXRoTGVuZ3RoICsgY29tbWFuZC5wYXRoTGVuZ3RoICsgMC4wMDAwNSA8IGRpc3RhbmNlKSkge1xuICAgICAgICBjdW11bGF0aXZlUGF0aExlbmd0aCArPSBjb21tYW5kLnBhdGhMZW5ndGg7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVsdGEgPSBkaXN0YW5jZSAtIGN1bXVsYXRpdmVQYXRoTGVuZ3RoO1xuICAgICAgdmFyIGN1cnJlbnRUID0gMDtcblxuICAgICAgc3dpdGNoIChjb21tYW5kLnR5cGUpIHtcbiAgICAgICAgY2FzZSBQYXRoUGFyc2VyLkxJTkVfVE86XG4gICAgICAgICAgcCA9IHRoaXMuZ2V0UG9pbnRPbkxpbmUoZGVsdGEsIGNvbW1hbmQuc3RhcnQueCwgY29tbWFuZC5zdGFydC55LCBjb21tYW5kLnBvaW50c1swXSwgY29tbWFuZC5wb2ludHNbMV0sIGNvbW1hbmQuc3RhcnQueCwgY29tbWFuZC5zdGFydC55KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFBhdGhQYXJzZXIuQVJDOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGNvbW1hbmQucG9pbnRzWzRdOyAvLyA0ID0gdGhldGFcblxuICAgICAgICAgICAgdmFyIGRUaGV0YSA9IGNvbW1hbmQucG9pbnRzWzVdOyAvLyA1ID0gZFRoZXRhXG5cbiAgICAgICAgICAgIHZhciBlbmQgPSBjb21tYW5kLnBvaW50c1s0XSArIGRUaGV0YTtcbiAgICAgICAgICAgIGN1cnJlbnRUID0gc3RhcnQgKyBkZWx0YSAvIGNvbW1hbmQucGF0aExlbmd0aCAqIGRUaGV0YTtcblxuICAgICAgICAgICAgaWYgKGRUaGV0YSA8IDAgJiYgY3VycmVudFQgPCBlbmQgfHwgZFRoZXRhID49IDAgJiYgY3VycmVudFQgPiBlbmQpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHAgPSB0aGlzLmdldFBvaW50T25FbGxpcHRpY2FsQXJjKGNvbW1hbmQucG9pbnRzWzBdLCBjb21tYW5kLnBvaW50c1sxXSwgY29tbWFuZC5wb2ludHNbMl0sIGNvbW1hbmQucG9pbnRzWzNdLCBjdXJyZW50VCwgY29tbWFuZC5wb2ludHNbNl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5DVVJWRV9UTzpcbiAgICAgICAgICBjdXJyZW50VCA9IGRlbHRhIC8gY29tbWFuZC5wYXRoTGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKGN1cnJlbnRUID4gMSkge1xuICAgICAgICAgICAgY3VycmVudFQgPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHAgPSB0aGlzLmdldFBvaW50T25DdWJpY0JlemllcihjdXJyZW50VCwgY29tbWFuZC5zdGFydC54LCBjb21tYW5kLnN0YXJ0LnksIGNvbW1hbmQucG9pbnRzWzBdLCBjb21tYW5kLnBvaW50c1sxXSwgY29tbWFuZC5wb2ludHNbMl0sIGNvbW1hbmQucG9pbnRzWzNdLCBjb21tYW5kLnBvaW50c1s0XSwgY29tbWFuZC5wb2ludHNbNV0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUGF0aFBhcnNlci5RVUFEX1RPOlxuICAgICAgICAgIGN1cnJlbnRUID0gZGVsdGEgLyBjb21tYW5kLnBhdGhMZW5ndGg7XG5cbiAgICAgICAgICBpZiAoY3VycmVudFQgPiAxKSB7XG4gICAgICAgICAgICBjdXJyZW50VCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcCA9IHRoaXMuZ2V0UG9pbnRPblF1YWRyYXRpY0JlemllcihjdXJyZW50VCwgY29tbWFuZC5zdGFydC54LCBjb21tYW5kLnN0YXJ0LnksIGNvbW1hbmQucG9pbnRzWzBdLCBjb21tYW5kLnBvaW50c1sxXSwgY29tbWFuZC5wb2ludHNbMl0sIGNvbW1hbmQucG9pbnRzWzNdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHApIHtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0TGluZUxlbmd0aCh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHgyIC0geDEpICogKHgyIC0geDEpICsgKHkyIC0geTEpICogKHkyIC0geTEpKTtcbiAgfVxuXG4gIGdldFBhdGhMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMucGF0aExlbmd0aCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucGF0aExlbmd0aCA9IHRoaXMuZGF0YUFycmF5LnJlZHVjZSgobGVuZ3RoLCBjb21tYW5kKSA9PiBjb21tYW5kLnBhdGhMZW5ndGggPiAwID8gbGVuZ3RoICsgY29tbWFuZC5wYXRoTGVuZ3RoIDogbGVuZ3RoLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYXRoTGVuZ3RoO1xuICB9XG5cbiAgZ2V0UG9pbnRPbkN1YmljQmV6aWVyKHBjdCwgcDF4LCBwMXksIHAyeCwgcDJ5LCBwM3gsIHAzeSwgcDR4LCBwNHkpIHtcbiAgICB2YXIgeCA9IHA0eCAqIENCMShwY3QpICsgcDN4ICogQ0IyKHBjdCkgKyBwMnggKiBDQjMocGN0KSArIHAxeCAqIENCNChwY3QpO1xuICAgIHZhciB5ID0gcDR5ICogQ0IxKHBjdCkgKyBwM3kgKiBDQjIocGN0KSArIHAyeSAqIENCMyhwY3QpICsgcDF5ICogQ0I0KHBjdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfTtcbiAgfVxuXG4gIGdldFBvaW50T25RdWFkcmF0aWNCZXppZXIocGN0LCBwMXgsIHAxeSwgcDJ4LCBwMnksIHAzeCwgcDN5KSB7XG4gICAgdmFyIHggPSBwM3ggKiBRQjEocGN0KSArIHAyeCAqIFFCMihwY3QpICsgcDF4ICogUUIzKHBjdCk7XG4gICAgdmFyIHkgPSBwM3kgKiBRQjEocGN0KSArIHAyeSAqIFFCMihwY3QpICsgcDF5ICogUUIzKHBjdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfTtcbiAgfVxuXG4gIGdldFBvaW50T25FbGxpcHRpY2FsQXJjKGN4LCBjeSwgcngsIHJ5LCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BzaSA9IE1hdGguY29zKHBzaSk7XG4gICAgdmFyIHNpblBzaSA9IE1hdGguc2luKHBzaSk7XG4gICAgdmFyIHB0ID0ge1xuICAgICAgeDogcnggKiBNYXRoLmNvcyh0aGV0YSksXG4gICAgICB5OiByeSAqIE1hdGguc2luKHRoZXRhKVxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGN4ICsgKHB0LnggKiBjb3NQc2kgLSBwdC55ICogc2luUHNpKSxcbiAgICAgIHk6IGN5ICsgKHB0LnggKiBzaW5Qc2kgKyBwdC55ICogY29zUHNpKVxuICAgIH07XG4gIH0gLy8gVE9ETyBuZWVkIHNvbWUgb3B0aW1pc2F0aW9ucy4gcG9zc2libHkgYnVpbGQgY2FjaGUgb25seSBmb3IgY3VydmVkIHNlZ21lbnRzP1xuXG5cbiAgYnVpbGRFcXVpZGlzdGFudENhY2hlKGlucHV0U3RlcCwgaW5wdXRQcmVjaXNpb24pIHtcbiAgICB2YXIgZnVsbExlbiA9IHRoaXMuZ2V0UGF0aExlbmd0aCgpO1xuICAgIHZhciBwcmVjaXNpb24gPSBpbnB1dFByZWNpc2lvbiB8fCAwLjI1OyAvLyBhY2N1cmFjeSB2cyBwZXJmb3JtYW5jZVxuXG4gICAgdmFyIHN0ZXAgPSBpbnB1dFN0ZXAgfHwgZnVsbExlbiAvIDEwMDtcblxuICAgIGlmICghdGhpcy5lcXVpZGlzdGFudENhY2hlIHx8IHRoaXMuZXF1aWRpc3RhbnRDYWNoZS5zdGVwICE9PSBzdGVwIHx8IHRoaXMuZXF1aWRpc3RhbnRDYWNoZS5wcmVjaXNpb24gIT09IHByZWNpc2lvbikge1xuICAgICAgLy8gUHJlcGFyZSBjYWNoZVxuICAgICAgdGhpcy5lcXVpZGlzdGFudENhY2hlID0ge1xuICAgICAgICBzdGVwLFxuICAgICAgICBwcmVjaXNpb24sXG4gICAgICAgIHBvaW50czogW11cbiAgICAgIH07IC8vIENhbGN1bGF0ZSBwb2ludHNcblxuICAgICAgdmFyIHMgPSAwO1xuXG4gICAgICBmb3IgKHZhciBsID0gMDsgbCA8PSBmdWxsTGVuOyBsICs9IHByZWNpc2lvbikge1xuICAgICAgICB2YXIgcDAgPSB0aGlzLmdldFBvaW50T25QYXRoKGwpO1xuICAgICAgICB2YXIgcDEgPSB0aGlzLmdldFBvaW50T25QYXRoKGwgKyBwcmVjaXNpb24pO1xuXG4gICAgICAgIGlmICghcDAgfHwgIXAxKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzICs9IHRoaXMuZ2V0TGluZUxlbmd0aChwMC54LCBwMC55LCBwMS54LCBwMS55KTtcblxuICAgICAgICBpZiAocyA+PSBzdGVwKSB7XG4gICAgICAgICAgdGhpcy5lcXVpZGlzdGFudENhY2hlLnBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgIHg6IHAwLngsXG4gICAgICAgICAgICB5OiBwMC55LFxuICAgICAgICAgICAgZGlzdGFuY2U6IGxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzIC09IHN0ZXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRFcXVpZGlzdGFudFBvaW50T25QYXRoKHRhcmdldERpc3RhbmNlLCBzdGVwLCBwcmVjaXNpb24pIHtcbiAgICB0aGlzLmJ1aWxkRXF1aWRpc3RhbnRDYWNoZShzdGVwLCBwcmVjaXNpb24pO1xuXG4gICAgaWYgKHRhcmdldERpc3RhbmNlIDwgMCB8fCB0YXJnZXREaXN0YW5jZSAtIHRoaXMuZ2V0UGF0aExlbmd0aCgpID4gMC4wMDAwNSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGlkeCA9IE1hdGgucm91bmQodGFyZ2V0RGlzdGFuY2UgLyB0aGlzLmdldFBhdGhMZW5ndGgoKSAqICh0aGlzLmVxdWlkaXN0YW50Q2FjaGUucG9pbnRzLmxlbmd0aCAtIDEpKTtcbiAgICByZXR1cm4gdGhpcy5lcXVpZGlzdGFudENhY2hlLnBvaW50c1tpZHhdIHx8IG51bGw7XG4gIH1cblxufVxuXG52YXIgZGF0YVVyaVJlZ2V4ID0gL15cXHMqZGF0YTooKFteLyw7XStcXC9bXi8sO10rKSg/OjsoW14sOz1dKz1bXiw7PV0rKSk/KT8oPzo7KGJhc2U2NCkpPywoLiopJC9pO1xuY2xhc3MgSW1hZ2VFbGVtZW50IGV4dGVuZHMgUmVuZGVyZWRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2ltYWdlJztcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgIHZhciBocmVmID0gdGhpcy5nZXRIcmVmQXR0cmlidXRlKCkuZ2V0U3RyaW5nKCk7XG5cbiAgICBpZiAoIWhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaXNTdmcgPSBocmVmLmVuZHNXaXRoKCcuc3ZnJykgfHwgL15cXHMqZGF0YTppbWFnZVxcL3N2Z1xcK3htbC9pLnRlc3QoaHJlZik7XG4gICAgZG9jdW1lbnQuaW1hZ2VzLnB1c2godGhpcyk7XG5cbiAgICBpZiAoIWlzU3ZnKSB7XG4gICAgICB2b2lkIHRoaXMubG9hZEltYWdlKGhyZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2b2lkIHRoaXMubG9hZFN2ZyhocmVmKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzU3ZnID0gaXNTdmc7XG4gIH1cblxuICBsb2FkSW1hZ2UoaHJlZikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBpbWFnZSA9IHlpZWxkIF90aGlzLmRvY3VtZW50LmNyZWF0ZUltYWdlKGhyZWYpO1xuICAgICAgICBfdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aGlsZSBsb2FkaW5nIGltYWdlIFxcXCJcIi5jb25jYXQoaHJlZiwgXCJcXFwiOlwiKSwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICB9KSgpO1xuICB9XG5cbiAgbG9hZFN2ZyhocmVmKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICByZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcbiAgICAgIHZhciBtYXRjaCA9IGRhdGFVcmlSZWdleC5leGVjKGhyZWYpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBtYXRjaFs1XTtcblxuICAgICAgICBpZiAobWF0Y2hbNF0gPT09ICdiYXNlNjQnKSB7XG4gICAgICAgICAgX3RoaXMyLmltYWdlID0gYXRvYihkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczIuaW1hZ2UgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlID0geWllbGQgX3RoaXMyLmRvY3VtZW50LmZldGNoKGhyZWYpO1xuICAgICAgICAgIHZhciBzdmcgPSB5aWVsZCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgX3RoaXMyLmltYWdlID0gc3ZnO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igd2hpbGUgbG9hZGluZyBpbWFnZSBcXFwiXCIuY29uY2F0KGhyZWYsIFwiXFxcIjpcIiksIGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3RoaXMyLmxvYWRlZCA9IHRydWU7XG4gICAgfSkoKTtcbiAgfVxuXG4gIHJlbmRlckNoaWxkcmVuKGN0eCkge1xuICAgIHZhciB7XG4gICAgICBkb2N1bWVudCxcbiAgICAgIGltYWdlLFxuICAgICAgbG9hZGVkXG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHggPSB0aGlzLmdldEF0dHJpYnV0ZSgneCcpLmdldFBpeGVscygneCcpO1xuICAgIHZhciB5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3knKS5nZXRQaXhlbHMoJ3knKTtcbiAgICB2YXIgd2lkdGggPSB0aGlzLmdldFN0eWxlKCd3aWR0aCcpLmdldFBpeGVscygneCcpO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLmdldFN0eWxlKCdoZWlnaHQnKS5nZXRQaXhlbHMoJ3knKTtcblxuICAgIGlmICghbG9hZGVkIHx8ICFpbWFnZSB8fCAhd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcblxuICAgIGlmICh0aGlzLmlzU3ZnKSB7XG4gICAgICB2YXIgc3ViRG9jdW1lbnQgPSBkb2N1bWVudC5jYW52Zy5mb3JrU3RyaW5nKGN0eCwgdGhpcy5pbWFnZSwge1xuICAgICAgICBpZ25vcmVNb3VzZTogdHJ1ZSxcbiAgICAgICAgaWdub3JlQW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICBpZ25vcmVEaW1lbnNpb25zOiB0cnVlLFxuICAgICAgICBpZ25vcmVDbGVhcjogdHJ1ZSxcbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgb2Zmc2V0WTogMCxcbiAgICAgICAgc2NhbGVXaWR0aDogd2lkdGgsXG4gICAgICAgIHNjYWxlSGVpZ2h0OiBoZWlnaHRcbiAgICAgIH0pO1xuICAgICAgc3ViRG9jdW1lbnQuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnBhcmVudCA9IHRoaXM7XG4gICAgICB2b2lkIHN1YkRvY3VtZW50LnJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2ltYWdlID0gdGhpcy5pbWFnZTtcbiAgICAgIGRvY3VtZW50LnNldFZpZXdCb3goe1xuICAgICAgICBjdHgsXG4gICAgICAgIGFzcGVjdFJhdGlvOiB0aGlzLmdldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycpLmdldFN0cmluZygpLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgZGVzaXJlZFdpZHRoOiBfaW1hZ2Uud2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgZGVzaXJlZEhlaWdodDogX2ltYWdlLmhlaWdodFxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmxvYWRlZCkge1xuICAgICAgICBpZiAodHlwZW9mIF9pbWFnZS5jb21wbGV0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgX2ltYWdlLmNvbXBsZXRlKSB7XG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShfaW1hZ2UsIDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGdldEJvdW5kaW5nQm94KCkge1xuICAgIHZhciB4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKS5nZXRQaXhlbHMoJ3gnKTtcbiAgICB2YXIgeSA9IHRoaXMuZ2V0QXR0cmlidXRlKCd5JykuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgdmFyIHdpZHRoID0gdGhpcy5nZXRTdHlsZSgnd2lkdGgnKS5nZXRQaXhlbHMoJ3gnKTtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nZXRTdHlsZSgnaGVpZ2h0JykuZ2V0UGl4ZWxzKCd5Jyk7XG4gICAgcmV0dXJuIG5ldyBCb3VuZGluZ0JveCh4LCB5LCB4ICsgd2lkdGgsIHkgKyBoZWlnaHQpO1xuICB9XG5cbn1cblxuY2xhc3MgU3ltYm9sRWxlbWVudCBleHRlbmRzIFJlbmRlcmVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ3N5bWJvbCc7XG4gIH1cblxuICByZW5kZXIoXykgey8vIE5PIFJFTkRFUlxuICB9XG5cbn1cblxuY2xhc3MgU1ZHRm9udExvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgZG9jdW1lbnQuZm9udHMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIGxvYWQoZm9udEZhbWlseSwgdXJsKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBfYXN5bmNUb0dlbmVyYXRvcihmdW5jdGlvbiogKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHtcbiAgICAgICAgICBkb2N1bWVudFxuICAgICAgICB9ID0gX3RoaXM7XG4gICAgICAgIHZhciBzdmdEb2N1bWVudCA9IHlpZWxkIGRvY3VtZW50LmNhbnZnLnBhcnNlci5sb2FkKHVybCk7XG4gICAgICAgIHZhciBmb250cyA9IHN2Z0RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb250Jyk7XG4gICAgICAgIEFycmF5LmZyb20oZm9udHMpLmZvckVhY2goZm9udE5vZGUgPT4ge1xuICAgICAgICAgIHZhciBmb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChmb250Tm9kZSk7XG4gICAgICAgICAgZG9jdW1lbnQuZGVmaW5pdGlvbnNbZm9udEZhbWlseV0gPSBmb250O1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igd2hpbGUgbG9hZGluZyBmb250IFxcXCJcIi5jb25jYXQodXJsLCBcIlxcXCI6XCIpLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgIH0pKCk7XG4gIH1cblxufVxuXG5jbGFzcyBTdHlsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ3N0eWxlJztcbiAgICB2YXIgY3NzID0gY29tcHJlc3NTcGFjZXMoQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpIC8vIE5FRUQgVEVTVFxuICAgIC5tYXAoXyA9PiBfLnRleHRDb250ZW50KS5qb2luKCcnKS5yZXBsYWNlKC8oXFwvXFwqKFteKl18W1xcclxcbl18KFxcKisoW14qL118W1xcclxcbl0pKSkqXFwqK1xcLyl8KF5bXFxzXSpcXC9cXC8uKikvZ20sICcnKSAvLyByZW1vdmUgY29tbWVudHNcbiAgICAucmVwbGFjZSgvQGltcG9ydC4qOy9nLCAnJykgLy8gcmVtb3ZlIGltcG9ydHNcbiAgICApO1xuICAgIHZhciBjc3NEZWZzID0gY3NzLnNwbGl0KCd9Jyk7XG4gICAgY3NzRGVmcy5mb3JFYWNoKF8gPT4ge1xuICAgICAgdmFyIGRlZiA9IF8udHJpbSgpO1xuXG4gICAgICBpZiAoIWRlZikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjc3NQYXJ0cyA9IGRlZi5zcGxpdCgneycpO1xuICAgICAgdmFyIGNzc0NsYXNzZXMgPSBjc3NQYXJ0c1swXS5zcGxpdCgnLCcpO1xuICAgICAgdmFyIGNzc1Byb3BzID0gY3NzUGFydHNbMV0uc3BsaXQoJzsnKTtcbiAgICAgIGNzc0NsYXNzZXMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgdmFyIGNzc0NsYXNzID0gXy50cmltKCk7XG5cbiAgICAgICAgaWYgKCFjc3NDbGFzcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9wcyA9IGRvY3VtZW50LnN0eWxlc1tjc3NDbGFzc10gfHwge307XG4gICAgICAgIGNzc1Byb3BzLmZvckVhY2goY3NzUHJvcCA9PiB7XG4gICAgICAgICAgdmFyIHByb3AgPSBjc3NQcm9wLmluZGV4T2YoJzonKTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGNzc1Byb3Auc3Vic3RyKDAsIHByb3ApLnRyaW0oKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBjc3NQcm9wLnN1YnN0cihwcm9wICsgMSwgY3NzUHJvcC5sZW5ndGggLSBwcm9wKS50cmltKCk7XG5cbiAgICAgICAgICBpZiAobmFtZSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgcHJvcHNbbmFtZV0gPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5zdHlsZXNbY3NzQ2xhc3NdID0gcHJvcHM7XG4gICAgICAgIGRvY3VtZW50LnN0eWxlc1NwZWNpZmljaXR5W2Nzc0NsYXNzXSA9IGdldFNlbGVjdG9yU3BlY2lmaWNpdHkoY3NzQ2xhc3MpO1xuXG4gICAgICAgIGlmIChjc3NDbGFzcyA9PT0gJ0Bmb250LWZhY2UnKSB7XG4gICAgICAgICAgLy8gICYmICFub2RlRW52XG4gICAgICAgICAgdmFyIGZvbnRGYW1pbHkgPSBwcm9wc1snZm9udC1mYW1pbHknXS5nZXRTdHJpbmcoKS5yZXBsYWNlKC9cInwnL2csICcnKTtcbiAgICAgICAgICB2YXIgc3JjcyA9IHByb3BzLnNyYy5nZXRTdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgICAgICAgIHNyY3MuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICAgICAgaWYgKHNyYy5pbmRleE9mKCdmb3JtYXQoXCJzdmdcIiknKSA+IDApIHtcbiAgICAgICAgICAgICAgdmFyIHVybCA9IHBhcnNlRXh0ZXJuYWxVcmwoc3JjKTtcblxuICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgdm9pZCBuZXcgU1ZHRm9udExvYWRlcihkb2N1bWVudCkubG9hZChmb250RmFtaWx5LCB1cmwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cblN0eWxlRWxlbWVudC5wYXJzZUV4dGVybmFsVXJsID0gcGFyc2VFeHRlcm5hbFVybDtcblxuY2xhc3MgVXNlRWxlbWVudCBleHRlbmRzIFJlbmRlcmVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy50eXBlID0gJ3VzZSc7XG4gIH1cblxuICBzZXRDb250ZXh0KGN0eCkge1xuICAgIHN1cGVyLnNldENvbnRleHQoY3R4KTtcbiAgICB2YXIgeEF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZSgneCcpO1xuICAgIHZhciB5QXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlKCd5Jyk7XG5cbiAgICBpZiAoeEF0dHIuaGFzVmFsdWUoKSkge1xuICAgICAgY3R4LnRyYW5zbGF0ZSh4QXR0ci5nZXRQaXhlbHMoJ3gnKSwgMCk7XG4gICAgfVxuXG4gICAgaWYgKHlBdHRyLmhhc1ZhbHVlKCkpIHtcbiAgICAgIGN0eC50cmFuc2xhdGUoMCwgeUF0dHIuZ2V0UGl4ZWxzKCd5JykpO1xuICAgIH1cbiAgfVxuXG4gIHBhdGgoY3R4KSB7XG4gICAgdmFyIHtcbiAgICAgIGVsZW1lbnRcbiAgICB9ID0gdGhpcztcblxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnBhdGgoY3R4KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJDaGlsZHJlbihjdHgpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnQsXG4gICAgICBlbGVtZW50XG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdmFyIHRlbXBTdmcgPSBlbGVtZW50O1xuXG4gICAgICBpZiAoZWxlbWVudC50eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAvLyByZW5kZXIgbWUgdXNpbmcgYSB0ZW1wb3Jhcnkgc3ZnIGVsZW1lbnQgaW4gc3ltYm9sIGNhc2VzIChodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvc3RydWN0Lmh0bWwjVXNlRWxlbWVudClcbiAgICAgICAgdGVtcFN2ZyA9IG5ldyBTVkdFbGVtZW50KGRvY3VtZW50LCBudWxsKTtcbiAgICAgICAgdGVtcFN2Zy5hdHRyaWJ1dGVzLnZpZXdCb3ggPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICd2aWV3Qm94JywgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKS5nZXRTdHJpbmcoKSk7XG4gICAgICAgIHRlbXBTdmcuYXR0cmlidXRlcy5wcmVzZXJ2ZUFzcGVjdFJhdGlvID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAncHJlc2VydmVBc3BlY3RSYXRpbycsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJykuZ2V0U3RyaW5nKCkpO1xuICAgICAgICB0ZW1wU3ZnLmF0dHJpYnV0ZXMub3ZlcmZsb3cgPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICdvdmVyZmxvdycsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdvdmVyZmxvdycpLmdldFN0cmluZygpKTtcbiAgICAgICAgdGVtcFN2Zy5jaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47IC8vIGVsZW1lbnQgaXMgc3RpbGwgdGhlIHBhcmVudCBvZiB0aGUgY2hpbGRyZW5cblxuICAgICAgICBlbGVtZW50LnN0eWxlcy5vcGFjaXR5ID0gbmV3IFByb3BlcnR5KGRvY3VtZW50LCAnb3BhY2l0eScsIHRoaXMuY2FsY3VsYXRlT3BhY2l0eSgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRlbXBTdmcudHlwZSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgdmFyIHdpZHRoU3R5bGUgPSB0aGlzLmdldFN0eWxlKCd3aWR0aCcsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgdmFyIGhlaWdodFN0eWxlID0gdGhpcy5nZXRTdHlsZSgnaGVpZ2h0JywgZmFsc2UsIHRydWUpOyAvLyBpZiBzeW1ib2wgb3Igc3ZnLCBpbmhlcml0IHdpZHRoL2hlaWdodCBmcm9tIG1lXG5cbiAgICAgICAgaWYgKHdpZHRoU3R5bGUuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHRlbXBTdmcuYXR0cmlidXRlcy53aWR0aCA9IG5ldyBQcm9wZXJ0eShkb2N1bWVudCwgJ3dpZHRoJywgd2lkdGhTdHlsZS5nZXRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGVpZ2h0U3R5bGUuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHRlbXBTdmcuYXR0cmlidXRlcy5oZWlnaHQgPSBuZXcgUHJvcGVydHkoZG9jdW1lbnQsICdoZWlnaHQnLCBoZWlnaHRTdHlsZS5nZXRTdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIG9sZFBhcmVudCA9IHRlbXBTdmcucGFyZW50O1xuICAgICAgdGVtcFN2Zy5wYXJlbnQgPSB0aGlzO1xuICAgICAgdGVtcFN2Zy5yZW5kZXIoY3R4KTtcbiAgICAgIHRlbXBTdmcucGFyZW50ID0gb2xkUGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIGdldEJvdW5kaW5nQm94KGN0eCkge1xuICAgIHZhciB7XG4gICAgICBlbGVtZW50XG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdCb3goY3R4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGVsZW1lbnRUcmFuc2Zvcm0oKSB7XG4gICAgdmFyIHtcbiAgICAgIGRvY3VtZW50LFxuICAgICAgZWxlbWVudFxuICAgIH0gPSB0aGlzO1xuICAgIHJldHVybiBUcmFuc2Zvcm0uZnJvbUVsZW1lbnQoZG9jdW1lbnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY2FjaGVkRWxlbWVudCA9IHRoaXMuZ2V0SHJlZkF0dHJpYnV0ZSgpLmdldERlZmluaXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jYWNoZWRFbGVtZW50O1xuICB9XG5cbn1cblxuZnVuY3Rpb24gaW1HZXQoaW1nLCB4LCB5LCB3aWR0aCwgX2hlaWdodCwgcmdiYSkge1xuICByZXR1cm4gaW1nW3kgKiB3aWR0aCAqIDQgKyB4ICogNCArIHJnYmFdO1xufVxuXG5mdW5jdGlvbiBpbVNldChpbWcsIHgsIHksIHdpZHRoLCBfaGVpZ2h0LCByZ2JhLCB2YWwpIHtcbiAgaW1nW3kgKiB3aWR0aCAqIDQgKyB4ICogNCArIHJnYmFdID0gdmFsO1xufVxuXG5mdW5jdGlvbiBtKG1hdHJpeCwgaSwgdikge1xuICB2YXIgbWkgPSBtYXRyaXhbaV07XG4gIHJldHVybiBtaSAqIHY7XG59XG5cbmZ1bmN0aW9uIGMoYSwgbTEsIG0yLCBtMykge1xuICByZXR1cm4gbTEgKyBNYXRoLmNvcyhhKSAqIG0yICsgTWF0aC5zaW4oYSkgKiBtMztcbn1cblxuY2xhc3MgRmVDb2xvck1hdHJpeEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2ZlQ29sb3JNYXRyaXgnO1xuICAgIHZhciBtYXRyaXggPSB0b051bWJlcnModGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlcycpLmdldFN0cmluZygpKTtcblxuICAgIHN3aXRjaCAodGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKS5nZXRTdHJpbmcoJ21hdHJpeCcpKSB7XG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvZmlsdGVycy5odG1sI2ZlQ29sb3JNYXRyaXhFbGVtZW50XG4gICAgICBjYXNlICdzYXR1cmF0ZSc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcyA9IG1hdHJpeFswXTtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBhcnJheS1lbGVtZW50LW5ld2xpbmUgKi9cblxuICAgICAgICAgIG1hdHJpeCA9IFswLjIxMyArIDAuNzg3ICogcywgMC43MTUgLSAwLjcxNSAqIHMsIDAuMDcyIC0gMC4wNzIgKiBzLCAwLCAwLCAwLjIxMyAtIDAuMjEzICogcywgMC43MTUgKyAwLjI4NSAqIHMsIDAuMDcyIC0gMC4wNzIgKiBzLCAwLCAwLCAwLjIxMyAtIDAuMjEzICogcywgMC43MTUgLSAwLjcxNSAqIHMsIDAuMDcyICsgMC45MjggKiBzLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXTtcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGFycmF5LWVsZW1lbnQtbmV3bGluZSAqL1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnaHVlUm90YXRlJzpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBhID0gbWF0cml4WzBdICogTWF0aC5QSSAvIDE4MC4wO1xuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGFycmF5LWVsZW1lbnQtbmV3bGluZSAqL1xuXG4gICAgICAgICAgbWF0cml4ID0gW2MoYSwgMC4yMTMsIDAuNzg3LCAtMC4yMTMpLCBjKGEsIDAuNzE1LCAtMC43MTUsIC0wLjcxNSksIGMoYSwgMC4wNzIsIC0wLjA3MiwgMC45MjgpLCAwLCAwLCBjKGEsIDAuMjEzLCAtMC4yMTMsIDAuMTQzKSwgYyhhLCAwLjcxNSwgMC4yODUsIDAuMTQwKSwgYyhhLCAwLjA3MiwgLTAuMDcyLCAtMC4yODMpLCAwLCAwLCBjKGEsIDAuMjEzLCAtMC4yMTMsIC0wLjc4NyksIGMoYSwgMC43MTUsIC0wLjcxNSwgMC43MTUpLCBjKGEsIDAuMDcyLCAwLjkyOCwgMC4wNzIpLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXTtcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGFycmF5LWVsZW1lbnQtbmV3bGluZSAqL1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnbHVtaW5hbmNlVG9BbHBoYSc6XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGFycmF5LWVsZW1lbnQtbmV3bGluZSAqL1xuICAgICAgICBtYXRyaXggPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMC4yMTI1LCAwLjcxNTQsIDAuMDcyMSwgMCwgMCwgMCwgMCwgMCwgMCwgMV07XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgYXJyYXktZWxlbWVudC1uZXdsaW5lICovXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG4gICAgdGhpcy5pbmNsdWRlT3BhY2l0eSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpbmNsdWRlT3BhY2l0eScpLmhhc1ZhbHVlKCk7XG4gIH1cblxuICBhcHBseShjdHgsIF94LCBfeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIC8vIGFzc3VtaW5nIHg9PTAgJiYgeT09MCBmb3Igbm93XG4gICAgdmFyIHtcbiAgICAgIGluY2x1ZGVPcGFjaXR5LFxuICAgICAgbWF0cml4XG4gICAgfSA9IHRoaXM7XG4gICAgdmFyIHNyY0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIHZhciByID0gaW1HZXQoc3JjRGF0YS5kYXRhLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCAwKTtcbiAgICAgICAgdmFyIGcgPSBpbUdldChzcmNEYXRhLmRhdGEsIHgsIHksIHdpZHRoLCBoZWlnaHQsIDEpO1xuICAgICAgICB2YXIgYiA9IGltR2V0KHNyY0RhdGEuZGF0YSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgMik7XG4gICAgICAgIHZhciBhID0gaW1HZXQoc3JjRGF0YS5kYXRhLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCAzKTtcbiAgICAgICAgdmFyIG5yID0gbShtYXRyaXgsIDAsIHIpICsgbShtYXRyaXgsIDEsIGcpICsgbShtYXRyaXgsIDIsIGIpICsgbShtYXRyaXgsIDMsIGEpICsgbShtYXRyaXgsIDQsIDEpO1xuICAgICAgICB2YXIgbmcgPSBtKG1hdHJpeCwgNSwgcikgKyBtKG1hdHJpeCwgNiwgZykgKyBtKG1hdHJpeCwgNywgYikgKyBtKG1hdHJpeCwgOCwgYSkgKyBtKG1hdHJpeCwgOSwgMSk7XG4gICAgICAgIHZhciBuYiA9IG0obWF0cml4LCAxMCwgcikgKyBtKG1hdHJpeCwgMTEsIGcpICsgbShtYXRyaXgsIDEyLCBiKSArIG0obWF0cml4LCAxMywgYSkgKyBtKG1hdHJpeCwgMTQsIDEpO1xuICAgICAgICB2YXIgbmEgPSBtKG1hdHJpeCwgMTUsIHIpICsgbShtYXRyaXgsIDE2LCBnKSArIG0obWF0cml4LCAxNywgYikgKyBtKG1hdHJpeCwgMTgsIGEpICsgbShtYXRyaXgsIDE5LCAxKTtcblxuICAgICAgICBpZiAoaW5jbHVkZU9wYWNpdHkpIHtcbiAgICAgICAgICBuciA9IDA7XG4gICAgICAgICAgbmcgPSAwO1xuICAgICAgICAgIG5iID0gMDtcbiAgICAgICAgICBuYSAqPSBhIC8gMjU1O1xuICAgICAgICB9XG5cbiAgICAgICAgaW1TZXQoc3JjRGF0YS5kYXRhLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCAwLCBucik7XG4gICAgICAgIGltU2V0KHNyY0RhdGEuZGF0YSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgMSwgbmcpO1xuICAgICAgICBpbVNldChzcmNEYXRhLmRhdGEsIHgsIHksIHdpZHRoLCBoZWlnaHQsIDIsIG5iKTtcbiAgICAgICAgaW1TZXQoc3JjRGF0YS5kYXRhLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCAzLCBuYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKHNyY0RhdGEsIDAsIDApO1xuICB9XG5cbn1cblxuY2xhc3MgTWFza0VsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnR5cGUgPSAnbWFzayc7XG4gIH1cblxuICBhcHBseShjdHgsIGVsZW1lbnQpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnRcbiAgICB9ID0gdGhpczsgLy8gcmVuZGVyIGFzIHRlbXAgc3ZnXG5cbiAgICB2YXIgeCA9IHRoaXMuZ2V0QXR0cmlidXRlKCd4JykuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIHkgPSB0aGlzLmdldEF0dHJpYnV0ZSgneScpLmdldFBpeGVscygneScpO1xuICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0U3R5bGUoJ3dpZHRoJykuZ2V0UGl4ZWxzKCd4Jyk7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuZ2V0U3R5bGUoJ2hlaWdodCcpLmdldFBpeGVscygneScpO1xuXG4gICAgaWYgKCF3aWR0aCAmJiAhaGVpZ2h0KSB7XG4gICAgICB2YXIgYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3goKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGJvdW5kaW5nQm94LmFkZEJvdW5kaW5nQm94KGNoaWxkLmdldEJvdW5kaW5nQm94KGN0eCkpO1xuICAgICAgfSk7XG4gICAgICB4ID0gTWF0aC5mbG9vcihib3VuZGluZ0JveC54MSk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihib3VuZGluZ0JveC55MSk7XG4gICAgICB3aWR0aCA9IE1hdGguZmxvb3IoYm91bmRpbmdCb3gud2lkdGgpO1xuICAgICAgaGVpZ2h0ID0gTWF0aC5mbG9vcihib3VuZGluZ0JveC5oZWlnaHQpO1xuICAgIH1cblxuICAgIHZhciBpZ25vcmVkU3R5bGVzID0gdGhpcy5yZW1vdmVTdHlsZXMoZWxlbWVudCwgTWFza0VsZW1lbnQuaWdub3JlU3R5bGVzKTtcbiAgICB2YXIgbWFza0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUNhbnZhcyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpO1xuICAgIHZhciBtYXNrQ3R4ID0gbWFza0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGRvY3VtZW50LnNjcmVlbi5zZXREZWZhdWx0cyhtYXNrQ3R4KTtcbiAgICB0aGlzLnJlbmRlckNoaWxkcmVuKG1hc2tDdHgpOyAvLyBjb252ZXJ0IG1hc2sgdG8gYWxwaGEgd2l0aCBhIGZha2Ugbm9kZVxuICAgIC8vIFRPRE86IHJlZmFjdG9yIG91dCBhcHBseSBmcm9tIGZlQ29sb3JNYXRyaXhcblxuICAgIG5ldyBGZUNvbG9yTWF0cml4RWxlbWVudChkb2N1bWVudCwge1xuICAgICAgbm9kZVR5cGU6IDEsXG4gICAgICBjaGlsZE5vZGVzOiBbXSxcbiAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgIG5vZGVOYW1lOiAndHlwZScsXG4gICAgICAgIHZhbHVlOiAnbHVtaW5hbmNlVG9BbHBoYSdcbiAgICAgIH0sIHtcbiAgICAgICAgbm9kZU5hbWU6ICdpbmNsdWRlT3BhY2l0eScsXG4gICAgICAgIHZhbHVlOiAndHJ1ZSdcbiAgICAgIH1dXG4gICAgfSkuYXBwbHkobWFza0N0eCwgMCwgMCwgeCArIHdpZHRoLCB5ICsgaGVpZ2h0KTtcbiAgICB2YXIgdG1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlQ2FudmFzKHggKyB3aWR0aCwgeSArIGhlaWdodCk7XG4gICAgdmFyIHRtcEN0eCA9IHRtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGRvY3VtZW50LnNjcmVlbi5zZXREZWZhdWx0cyh0bXBDdHgpO1xuICAgIGVsZW1lbnQucmVuZGVyKHRtcEN0eCk7XG4gICAgdG1wQ3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1pbic7XG4gICAgdG1wQ3R4LmZpbGxTdHlsZSA9IG1hc2tDdHguY3JlYXRlUGF0dGVybihtYXNrQ2FudmFzLCAnbm8tcmVwZWF0Jyk7XG4gICAgdG1wQ3R4LmZpbGxSZWN0KDAsIDAsIHggKyB3aWR0aCwgeSArIGhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRtcEN0eC5jcmVhdGVQYXR0ZXJuKHRtcENhbnZhcywgJ25vLXJlcGVhdCcpO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB4ICsgd2lkdGgsIHkgKyBoZWlnaHQpOyAvLyByZWFzc2lnbiBtYXNrXG5cbiAgICB0aGlzLnJlc3RvcmVTdHlsZXMoZWxlbWVudCwgaWdub3JlZFN0eWxlcyk7XG4gIH1cblxuICByZW5kZXIoXykgey8vIE5PIFJFTkRFUlxuICB9XG5cbn1cbk1hc2tFbGVtZW50Lmlnbm9yZVN0eWxlcyA9IFsnbWFzaycsICd0cmFuc2Zvcm0nLCAnY2xpcC1wYXRoJ107XG5cbnZhciBub29wID0gKCkgPT4gey8vIE5PT1Bcbn07XG5cbmNsYXNzIENsaXBQYXRoRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdjbGlwUGF0aCc7XG4gIH1cblxuICBhcHBseShjdHgpIHtcbiAgICB2YXIge1xuICAgICAgZG9jdW1lbnRcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgY29udGV4dFByb3RvID0gUmVmbGVjdC5nZXRQcm90b3R5cGVPZihjdHgpO1xuICAgIHZhciB7XG4gICAgICBiZWdpblBhdGgsXG4gICAgICBjbG9zZVBhdGhcbiAgICB9ID0gY3R4O1xuXG4gICAgaWYgKGNvbnRleHRQcm90bykge1xuICAgICAgY29udGV4dFByb3RvLmJlZ2luUGF0aCA9IG5vb3A7XG4gICAgICBjb250ZXh0UHJvdG8uY2xvc2VQYXRoID0gbm9vcDtcbiAgICB9XG5cbiAgICBSZWZsZWN0LmFwcGx5KGJlZ2luUGF0aCwgY3R4LCBbXSk7XG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNmb3JtID0gdHlwZW9mIGNoaWxkLmVsZW1lbnRUcmFuc2Zvcm0gIT09ICd1bmRlZmluZWQnID8gY2hpbGQuZWxlbWVudFRyYW5zZm9ybSgpIDogbnVsbDsgLy8gaGFuZGxlIDx1c2UgLz5cblxuICAgICAgaWYgKCF0cmFuc2Zvcm0pIHtcbiAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLmZyb21FbGVtZW50KGRvY3VtZW50LCBjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdHJhbnNmb3JtLmFwcGx5KGN0eCk7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnBhdGgoY3R4KTtcblxuICAgICAgaWYgKGNvbnRleHRQcm90bykge1xuICAgICAgICBjb250ZXh0UHJvdG8uY2xvc2VQYXRoID0gY2xvc2VQYXRoO1xuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICAgIHRyYW5zZm9ybS51bmFwcGx5KGN0eCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgUmVmbGVjdC5hcHBseShjbG9zZVBhdGgsIGN0eCwgW10pO1xuICAgIGN0eC5jbGlwKCk7XG5cbiAgICBpZiAoY29udGV4dFByb3RvKSB7XG4gICAgICBjb250ZXh0UHJvdG8uYmVnaW5QYXRoID0gYmVnaW5QYXRoO1xuICAgICAgY29udGV4dFByb3RvLmNsb3NlUGF0aCA9IGNsb3NlUGF0aDtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoXykgey8vIE5PIFJFTkRFUlxuICB9XG5cbn1cblxuY2xhc3MgRmlsdGVyRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdmaWx0ZXInO1xuICB9XG5cbiAgYXBwbHkoY3R4LCBlbGVtZW50KSB7XG4gICAgLy8gcmVuZGVyIGFzIHRlbXAgc3ZnXG4gICAgdmFyIHtcbiAgICAgIGRvY3VtZW50LFxuICAgICAgY2hpbGRyZW5cbiAgICB9ID0gdGhpcztcbiAgICB2YXIgYm91bmRpbmdCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQm94KGN0eCk7XG5cbiAgICBpZiAoIWJvdW5kaW5nQm94KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHB4ID0gMDtcbiAgICB2YXIgcHkgPSAwO1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgdmFyIGVmZCA9IGNoaWxkLmV4dHJhRmlsdGVyRGlzdGFuY2UgfHwgMDtcbiAgICAgIHB4ID0gTWF0aC5tYXgocHgsIGVmZCk7XG4gICAgICBweSA9IE1hdGgubWF4KHB5LCBlZmQpO1xuICAgIH0pO1xuICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYm91bmRpbmdCb3gud2lkdGgpO1xuICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGJvdW5kaW5nQm94LmhlaWdodCk7XG4gICAgdmFyIHRtcENhbnZhc1dpZHRoID0gd2lkdGggKyAyICogcHg7XG4gICAgdmFyIHRtcENhbnZhc0hlaWdodCA9IGhlaWdodCArIDIgKiBweTtcblxuICAgIGlmICh0bXBDYW52YXNXaWR0aCA8IDEgfHwgdG1wQ2FudmFzSGVpZ2h0IDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB4ID0gTWF0aC5mbG9vcihib3VuZGluZ0JveC54KTtcbiAgICB2YXIgeSA9IE1hdGguZmxvb3IoYm91bmRpbmdCb3gueSk7XG4gICAgdmFyIGlnbm9yZWRTdHlsZXMgPSB0aGlzLnJlbW92ZVN0eWxlcyhlbGVtZW50LCBGaWx0ZXJFbGVtZW50Lmlnbm9yZVN0eWxlcyk7XG4gICAgdmFyIHRtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUNhbnZhcyh0bXBDYW52YXNXaWR0aCwgdG1wQ2FudmFzSGVpZ2h0KTtcbiAgICB2YXIgdG1wQ3R4ID0gdG1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9jdW1lbnQuc2NyZWVuLnNldERlZmF1bHRzKHRtcEN0eCk7XG4gICAgdG1wQ3R4LnRyYW5zbGF0ZSgteCArIHB4LCAteSArIHB5KTtcbiAgICBlbGVtZW50LnJlbmRlcih0bXBDdHgpOyAvLyBhcHBseSBmaWx0ZXJzXG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQuYXBwbHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2hpbGQuYXBwbHkodG1wQ3R4LCAwLCAwLCB0bXBDYW52YXNXaWR0aCwgdG1wQ2FudmFzSGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9KTsgLy8gcmVuZGVyIG9uIG1lXG5cbiAgICBjdHguZHJhd0ltYWdlKHRtcENhbnZhcywgMCwgMCwgdG1wQ2FudmFzV2lkdGgsIHRtcENhbnZhc0hlaWdodCwgeCAtIHB4LCB5IC0gcHksIHRtcENhbnZhc1dpZHRoLCB0bXBDYW52YXNIZWlnaHQpO1xuICAgIHRoaXMucmVzdG9yZVN0eWxlcyhlbGVtZW50LCBpZ25vcmVkU3R5bGVzKTtcbiAgfVxuXG4gIHJlbmRlcihfKSB7Ly8gTk8gUkVOREVSXG4gIH1cblxufVxuRmlsdGVyRWxlbWVudC5pZ25vcmVTdHlsZXMgPSBbJ2ZpbHRlcicsICd0cmFuc2Zvcm0nLCAnY2xpcC1wYXRoJ107XG5cbmNsYXNzIEZlRHJvcFNoYWRvd0VsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpIHtcbiAgICBzdXBlcihkb2N1bWVudCwgbm9kZSwgY2FwdHVyZVRleHROb2Rlcyk7XG4gICAgdGhpcy50eXBlID0gJ2ZlRHJvcFNoYWRvdyc7XG4gICAgdGhpcy5hZGRTdHlsZXNGcm9tU3R5bGVEZWZpbml0aW9uKCk7XG4gIH1cblxuICBhcHBseShfLCBfeCwgX3ksIF93aWR0aCwgX2hlaWdodCkgey8vIFRPRE86IGltcGxlbWVudFxuICB9XG5cbn1cblxuY2xhc3MgRmVNb3JwaG9sb2d5RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdmZU1vcnBob2xvZ3knO1xuICB9XG5cbiAgYXBwbHkoXywgX3gsIF95LCBfd2lkdGgsIF9oZWlnaHQpIHsvLyBUT0RPOiBpbXBsZW1lbnRcbiAgfVxuXG59XG5cbmNsYXNzIEZlQ29tcG9zaXRlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdmZUNvbXBvc2l0ZSc7XG4gIH1cblxuICBhcHBseShfLCBfeCwgX3ksIF93aWR0aCwgX2hlaWdodCkgey8vIFRPRE86IGltcGxlbWVudFxuICB9XG5cbn1cblxuY2xhc3MgRmVHYXVzc2lhbkJsdXJFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBub2RlLCBjYXB0dXJlVGV4dE5vZGVzKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIG5vZGUsIGNhcHR1cmVUZXh0Tm9kZXMpO1xuICAgIHRoaXMudHlwZSA9ICdmZUdhdXNzaWFuQmx1cic7XG4gICAgdGhpcy5ibHVyUmFkaXVzID0gTWF0aC5mbG9vcih0aGlzLmdldEF0dHJpYnV0ZSgnc3RkRGV2aWF0aW9uJykuZ2V0TnVtYmVyKCkpO1xuICAgIHRoaXMuZXh0cmFGaWx0ZXJEaXN0YW5jZSA9IHRoaXMuYmx1clJhZGl1cztcbiAgfVxuXG4gIGFwcGx5KGN0eCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciB7XG4gICAgICBkb2N1bWVudCxcbiAgICAgIGJsdXJSYWRpdXNcbiAgICB9ID0gdGhpcztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LndpbmRvdyA/IGRvY3VtZW50LndpbmRvdy5kb2N1bWVudC5ib2R5IDogbnVsbDtcbiAgICB2YXIgY2FudmFzID0gY3R4LmNhbnZhczsgLy8gU3RhY2tCbHVyIHJlcXVpcmVzIGNhbnZhcyBiZSBvbiBkb2N1bWVudFxuXG4gICAgY2FudmFzLmlkID0gZG9jdW1lbnQuZ2V0VW5pcXVlSWQoKTtcblxuICAgIGlmIChib2R5KSB7XG4gICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICB9XG5cbiAgICBjYW52YXNSR0JBKGNhbnZhcywgeCwgeSwgd2lkdGgsIGhlaWdodCwgYmx1clJhZGl1cyk7XG5cbiAgICBpZiAoYm9keSkge1xuICAgICAgYm9keS5yZW1vdmVDaGlsZChjYW52YXMpO1xuICAgIH1cbiAgfVxuXG59XG5cbmNsYXNzIFRpdGxlRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICd0aXRsZSc7XG4gIH1cblxufVxuXG5jbGFzcyBEZXNjRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMudHlwZSA9ICdkZXNjJztcbiAgfVxuXG59XG5cbnZhciBlbGVtZW50cyA9IHtcbiAgJ3N2Zyc6IFNWR0VsZW1lbnQsXG4gICdyZWN0JzogUmVjdEVsZW1lbnQsXG4gICdjaXJjbGUnOiBDaXJjbGVFbGVtZW50LFxuICAnZWxsaXBzZSc6IEVsbGlwc2VFbGVtZW50LFxuICAnbGluZSc6IExpbmVFbGVtZW50LFxuICAncG9seWxpbmUnOiBQb2x5bGluZUVsZW1lbnQsXG4gICdwb2x5Z29uJzogUG9seWdvbkVsZW1lbnQsXG4gICdwYXRoJzogUGF0aEVsZW1lbnQsXG4gICdwYXR0ZXJuJzogUGF0dGVybkVsZW1lbnQsXG4gICdtYXJrZXInOiBNYXJrZXJFbGVtZW50LFxuICAnZGVmcyc6IERlZnNFbGVtZW50LFxuICAnbGluZWFyR3JhZGllbnQnOiBMaW5lYXJHcmFkaWVudEVsZW1lbnQsXG4gICdyYWRpYWxHcmFkaWVudCc6IFJhZGlhbEdyYWRpZW50RWxlbWVudCxcbiAgJ3N0b3AnOiBTdG9wRWxlbWVudCxcbiAgJ2FuaW1hdGUnOiBBbmltYXRlRWxlbWVudCxcbiAgJ2FuaW1hdGVDb2xvcic6IEFuaW1hdGVDb2xvckVsZW1lbnQsXG4gICdhbmltYXRlVHJhbnNmb3JtJzogQW5pbWF0ZVRyYW5zZm9ybUVsZW1lbnQsXG4gICdmb250JzogRm9udEVsZW1lbnQsXG4gICdmb250LWZhY2UnOiBGb250RmFjZUVsZW1lbnQsXG4gICdtaXNzaW5nLWdseXBoJzogTWlzc2luZ0dseXBoRWxlbWVudCxcbiAgJ2dseXBoJzogR2x5cGhFbGVtZW50LFxuICAndGV4dCc6IFRleHRFbGVtZW50LFxuICAndHNwYW4nOiBUU3BhbkVsZW1lbnQsXG4gICd0cmVmJzogVFJlZkVsZW1lbnQsXG4gICdhJzogQUVsZW1lbnQsXG4gICd0ZXh0UGF0aCc6IFRleHRQYXRoRWxlbWVudCxcbiAgJ2ltYWdlJzogSW1hZ2VFbGVtZW50LFxuICAnZyc6IEdFbGVtZW50LFxuICAnc3ltYm9sJzogU3ltYm9sRWxlbWVudCxcbiAgJ3N0eWxlJzogU3R5bGVFbGVtZW50LFxuICAndXNlJzogVXNlRWxlbWVudCxcbiAgJ21hc2snOiBNYXNrRWxlbWVudCxcbiAgJ2NsaXBQYXRoJzogQ2xpcFBhdGhFbGVtZW50LFxuICAnZmlsdGVyJzogRmlsdGVyRWxlbWVudCxcbiAgJ2ZlRHJvcFNoYWRvdyc6IEZlRHJvcFNoYWRvd0VsZW1lbnQsXG4gICdmZU1vcnBob2xvZ3knOiBGZU1vcnBob2xvZ3lFbGVtZW50LFxuICAnZmVDb21wb3NpdGUnOiBGZUNvbXBvc2l0ZUVsZW1lbnQsXG4gICdmZUNvbG9yTWF0cml4JzogRmVDb2xvck1hdHJpeEVsZW1lbnQsXG4gICdmZUdhdXNzaWFuQmx1cic6IEZlR2F1c3NpYW5CbHVyRWxlbWVudCxcbiAgJ3RpdGxlJzogVGl0bGVFbGVtZW50LFxuICAnZGVzYyc6IERlc2NFbGVtZW50XG59O1xuXG5mdW5jdGlvbiBvd25LZXlzJDEob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkJDEodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyQxKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMkMShPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgcmV0dXJuIGNhbnZhcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UoX3gpIHtcbiAgcmV0dXJuIF9jcmVhdGVJbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlSW1hZ2UoKSB7XG4gIF9jcmVhdGVJbWFnZSA9IF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoc3JjKSB7XG4gICAgdmFyIGFub255bW91c0Nyb3NzT3JpZ2luID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcbiAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIGlmIChhbm9ueW1vdXNDcm9zc09yaWdpbikge1xuICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgIH07XG5cbiAgICAgIGltYWdlLm9uZXJyb3IgPSAoX2V2ZW50LCBfc291cmNlLCBfbGluZW5vLCBfY29sbm8sIGVycm9yKSA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9O1xuXG4gICAgICBpbWFnZS5zcmMgPSBzcmM7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gX2NyZWF0ZUltYWdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3IoY2FudmcpIHtcbiAgICB2YXIge1xuICAgICAgcm9vdEVtU2l6ZSA9IDEyLFxuICAgICAgZW1TaXplID0gMTIsXG4gICAgICBjcmVhdGVDYW52YXMgPSBEb2N1bWVudC5jcmVhdGVDYW52YXMsXG4gICAgICBjcmVhdGVJbWFnZSA9IERvY3VtZW50LmNyZWF0ZUltYWdlLFxuICAgICAgYW5vbnltb3VzQ3Jvc3NPcmlnaW5cbiAgICB9ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB0aGlzLmNhbnZnID0gY2Fudmc7XG4gICAgdGhpcy5kZWZpbml0aW9ucyA9IHt9O1xuICAgIHRoaXMuc3R5bGVzID0ge307XG4gICAgdGhpcy5zdHlsZXNTcGVjaWZpY2l0eSA9IHt9O1xuICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgdGhpcy5mb250cyA9IFtdO1xuICAgIHRoaXMuZW1TaXplU3RhY2sgPSBbXTtcbiAgICB0aGlzLnVuaXF1ZUlkID0gMDtcbiAgICB0aGlzLnNjcmVlbiA9IGNhbnZnLnNjcmVlbjtcbiAgICB0aGlzLnJvb3RFbVNpemUgPSByb290RW1TaXplO1xuICAgIHRoaXMuZW1TaXplID0gZW1TaXplO1xuICAgIHRoaXMuY3JlYXRlQ2FudmFzID0gY3JlYXRlQ2FudmFzO1xuICAgIHRoaXMuY3JlYXRlSW1hZ2UgPSB0aGlzLmJpbmRDcmVhdGVJbWFnZShjcmVhdGVJbWFnZSwgYW5vbnltb3VzQ3Jvc3NPcmlnaW4pO1xuICAgIHRoaXMuc2NyZWVuLndhaXQodGhpcy5pc0ltYWdlc0xvYWRlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNjcmVlbi53YWl0KHRoaXMuaXNGb250c0xvYWRlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGJpbmRDcmVhdGVJbWFnZShjcmVhdGVJbWFnZSwgYW5vbnltb3VzQ3Jvc3NPcmlnaW4pIHtcbiAgICBpZiAodHlwZW9mIGFub255bW91c0Nyb3NzT3JpZ2luID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiAoc291cmNlLCBmb3JjZUFub255bW91c0Nyb3NzT3JpZ2luKSA9PiBjcmVhdGVJbWFnZShzb3VyY2UsIHR5cGVvZiBmb3JjZUFub255bW91c0Nyb3NzT3JpZ2luID09PSAnYm9vbGVhbicgPyBmb3JjZUFub255bW91c0Nyb3NzT3JpZ2luIDogYW5vbnltb3VzQ3Jvc3NPcmlnaW4pO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVJbWFnZTtcbiAgfVxuXG4gIGdldCB3aW5kb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NyZWVuLndpbmRvdztcbiAgfVxuXG4gIGdldCBmZXRjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JlZW4uZmV0Y2g7XG4gIH1cblxuICBnZXQgY3R4KCkge1xuICAgIHJldHVybiB0aGlzLnNjcmVlbi5jdHg7XG4gIH1cblxuICBnZXQgZW1TaXplKCkge1xuICAgIHZhciB7XG4gICAgICBlbVNpemVTdGFja1xuICAgIH0gPSB0aGlzO1xuICAgIHJldHVybiBlbVNpemVTdGFja1tlbVNpemVTdGFjay5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIHNldCBlbVNpemUodmFsdWUpIHtcbiAgICB2YXIge1xuICAgICAgZW1TaXplU3RhY2tcbiAgICB9ID0gdGhpcztcbiAgICBlbVNpemVTdGFjay5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHBvcEVtU2l6ZSgpIHtcbiAgICB2YXIge1xuICAgICAgZW1TaXplU3RhY2tcbiAgICB9ID0gdGhpcztcbiAgICBlbVNpemVTdGFjay5wb3AoKTtcbiAgfVxuXG4gIGdldFVuaXF1ZUlkKCkge1xuICAgIHJldHVybiBcImNhbnZnXCIuY29uY2F0KCsrdGhpcy51bmlxdWVJZCk7XG4gIH1cblxuICBpc0ltYWdlc0xvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZXMuZXZlcnkoXyA9PiBfLmxvYWRlZCk7XG4gIH1cblxuICBpc0ZvbnRzTG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmZvbnRzLmV2ZXJ5KF8gPT4gXy5sb2FkZWQpO1xuICB9XG5cbiAgY3JlYXRlRG9jdW1lbnRFbGVtZW50KGRvY3VtZW50KSB7XG4gICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgIGRvY3VtZW50RWxlbWVudC5yb290ID0gdHJ1ZTtcbiAgICBkb2N1bWVudEVsZW1lbnQuYWRkU3R5bGVzRnJvbVN0eWxlRGVmaW5pdGlvbigpO1xuICAgIHRoaXMuZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnRFbGVtZW50O1xuICAgIHJldHVybiBkb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudFR5cGUgPSBub2RlLm5vZGVOYW1lLnJlcGxhY2UoL15bXjpdKzovLCAnJyk7XG4gICAgdmFyIEVsZW1lbnRUeXBlID0gRG9jdW1lbnQuZWxlbWVudFR5cGVzW2VsZW1lbnRUeXBlXTtcblxuICAgIGlmICh0eXBlb2YgRWxlbWVudFR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IEVsZW1lbnRUeXBlKHRoaXMsIG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVW5rbm93bkVsZW1lbnQodGhpcywgbm9kZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0Tm9kZSh0aGlzLCBub2RlKTtcbiAgfVxuXG4gIHNldFZpZXdCb3goY29uZmlnKSB7XG4gICAgdGhpcy5zY3JlZW4uc2V0Vmlld0JveChfb2JqZWN0U3ByZWFkJDEoe1xuICAgICAgZG9jdW1lbnQ6IHRoaXNcbiAgICB9LCBjb25maWcpKTtcbiAgfVxuXG59XG5Eb2N1bWVudC5jcmVhdGVDYW52YXMgPSBjcmVhdGVDYW52YXM7XG5Eb2N1bWVudC5jcmVhdGVJbWFnZSA9IGNyZWF0ZUltYWdlO1xuRG9jdW1lbnQuZWxlbWVudFR5cGVzID0gZWxlbWVudHM7XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cbi8qKlxyXG4gKiBTVkcgcmVuZGVyZXIgb24gY2FudmFzLlxyXG4gKi9cblxuY2xhc3MgQ2Fudmcge1xuICAvKipcclxuICAgKiBNYWluIGNvbnN0cnVjdG9yLlxyXG4gICAqIEBwYXJhbSBjdHggLSBSZW5kZXJpbmcgY29udGV4dC5cclxuICAgKiBAcGFyYW0gc3ZnIC0gU1ZHIERvY3VtZW50LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMuXHJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGN0eCwgc3ZnKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIHRoaXMucGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zKTtcbiAgICB0aGlzLnNjcmVlbiA9IG5ldyBTY3JlZW4oY3R4LCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHZhciBkb2N1bWVudCA9IG5ldyBEb2N1bWVudCh0aGlzLCBvcHRpb25zKTtcbiAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRFbGVtZW50KHN2Zyk7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIHRoaXMuZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnRFbGVtZW50O1xuICB9XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBDYW52ZyBpbnN0YW5jZSBmcm9tIFNWRyBzb3VyY2Ugc3RyaW5nIG9yIFVSTC5cclxuICAgKiBAcGFyYW0gY3R4IC0gUmVuZGVyaW5nIGNvbnRleHQuXHJcbiAgICogQHBhcmFtIHN2ZyAtIFNWRyBzb3VyY2Ugc3RyaW5nIG9yIFVSTC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLlxyXG4gICAqIEByZXR1cm5zIENhbnZnIGluc3RhbmNlLlxyXG4gICAqL1xuXG5cbiAgc3RhdGljIGZyb20oY3R4LCBzdmcpIHtcbiAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3IoZnVuY3Rpb24qICgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gX2FyZ3VtZW50cy5sZW5ndGggPiAyICYmIF9hcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMpO1xuICAgICAgdmFyIHN2Z0RvY3VtZW50ID0geWllbGQgcGFyc2VyLnBhcnNlKHN2Zyk7XG4gICAgICByZXR1cm4gbmV3IENhbnZnKGN0eCwgc3ZnRG9jdW1lbnQsIG9wdGlvbnMpO1xuICAgIH0pKCk7XG4gIH1cbiAgLyoqXHJcbiAgICogQ3JlYXRlIENhbnZnIGluc3RhbmNlIGZyb20gU1ZHIHNvdXJjZSBzdHJpbmcuXHJcbiAgICogQHBhcmFtIGN0eCAtIFJlbmRlcmluZyBjb250ZXh0LlxyXG4gICAqIEBwYXJhbSBzdmcgLSBTVkcgc291cmNlIHN0cmluZy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLlxyXG4gICAqIEByZXR1cm5zIENhbnZnIGluc3RhbmNlLlxyXG4gICAqL1xuXG5cbiAgc3RhdGljIGZyb21TdHJpbmcoY3R4LCBzdmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgdmFyIHN2Z0RvY3VtZW50ID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdmcpO1xuICAgIHJldHVybiBuZXcgQ2FudmcoY3R4LCBzdmdEb2N1bWVudCwgb3B0aW9ucyk7XG4gIH1cbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyBDYW52ZyBpbnN0YW5jZSB3aXRoIGluaGVyaXRlZCBvcHRpb25zLlxyXG4gICAqIEBwYXJhbSBjdHggLSBSZW5kZXJpbmcgY29udGV4dC5cclxuICAgKiBAcGFyYW0gc3ZnIC0gU1ZHIHNvdXJjZSBzdHJpbmcgb3IgVVJMLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMuXHJcbiAgICogQHJldHVybnMgQ2FudmcgaW5zdGFuY2UuXHJcbiAgICovXG5cblxuICBmb3JrKGN0eCwgc3ZnKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIHJldHVybiBDYW52Zy5mcm9tKGN0eCwgc3ZnLCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHRoaXMub3B0aW9ucyksIG9wdGlvbnMpKTtcbiAgfVxuICAvKipcclxuICAgKiBDcmVhdGUgbmV3IENhbnZnIGluc3RhbmNlIHdpdGggaW5oZXJpdGVkIG9wdGlvbnMuXHJcbiAgICogQHBhcmFtIGN0eCAtIFJlbmRlcmluZyBjb250ZXh0LlxyXG4gICAqIEBwYXJhbSBzdmcgLSBTVkcgc291cmNlIHN0cmluZy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLlxyXG4gICAqIEByZXR1cm5zIENhbnZnIGluc3RhbmNlLlxyXG4gICAqL1xuXG5cbiAgZm9ya1N0cmluZyhjdHgsIHN2Zykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICByZXR1cm4gQ2FudmcuZnJvbVN0cmluZyhjdHgsIHN2ZywgX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLm9wdGlvbnMpLCBvcHRpb25zKSk7XG4gIH1cbiAgLyoqXHJcbiAgICogRG9jdW1lbnQgaXMgcmVhZHkgcHJvbWlzZS5cclxuICAgKiBAcmV0dXJucyBSZWFkeSBwcm9taXNlLlxyXG4gICAqL1xuXG5cbiAgcmVhZHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NyZWVuLnJlYWR5KCk7XG4gIH1cbiAgLyoqXHJcbiAgICogRG9jdW1lbnQgaXMgcmVhZHkgdmFsdWUuXHJcbiAgICogQHJldHVybnMgSXMgcmVhZHkgb3Igbm90LlxyXG4gICAqL1xuXG5cbiAgaXNSZWFkeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JlZW4uaXNSZWFkeSgpO1xuICB9XG4gIC8qKlxyXG4gICAqIFJlbmRlciBvbmx5IGZpcnN0IGZyYW1lLCBpZ25vcmluZyBhbmltYXRpb25zIGFuZCBtb3VzZS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLlxyXG4gICAqL1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBfYXJndW1lbnRzMiA9IGFyZ3VtZW50cyxcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKiAoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IF9hcmd1bWVudHMyLmxlbmd0aCA+IDAgJiYgX2FyZ3VtZW50czJbMF0gIT09IHVuZGVmaW5lZCA/IF9hcmd1bWVudHMyWzBdIDoge307XG5cbiAgICAgIF90aGlzLnN0YXJ0KF9vYmplY3RTcHJlYWQoe1xuICAgICAgICBlbmFibGVSZWRyYXc6IHRydWUsXG4gICAgICAgIGlnbm9yZUFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgaWdub3JlTW91c2U6IHRydWVcbiAgICAgIH0sIG9wdGlvbnMpKTtcblxuICAgICAgeWllbGQgX3RoaXMucmVhZHkoKTtcblxuICAgICAgX3RoaXMuc3RvcCgpO1xuICAgIH0pKCk7XG4gIH1cbiAgLyoqXHJcbiAgICogU3RhcnQgcmVuZGVyaW5nLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gUmVuZGVyIG9wdGlvbnMuXHJcbiAgICovXG5cblxuICBzdGFydCgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIHtcbiAgICAgIGRvY3VtZW50RWxlbWVudCxcbiAgICAgIHNjcmVlbixcbiAgICAgIG9wdGlvbnM6IGJhc2VPcHRpb25zXG4gICAgfSA9IHRoaXM7XG4gICAgc2NyZWVuLnN0YXJ0KGRvY3VtZW50RWxlbWVudCwgX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgIGVuYWJsZVJlZHJhdzogdHJ1ZVxuICAgIH0sIGJhc2VPcHRpb25zKSwgb3B0aW9ucykpO1xuICB9XG4gIC8qKlxyXG4gICAqIFN0b3AgcmVuZGVyaW5nLlxyXG4gICAqL1xuXG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnNjcmVlbi5zdG9wKCk7XG4gIH1cbiAgLyoqXHJcbiAgICogUmVzaXplIFNWRyB0byBmaXQgaW4gZ2l2ZW4gc2l6ZS5cclxuICAgKiBAcGFyYW0gd2lkdGhcclxuICAgKiBAcGFyYW0gaGVpZ2h0XHJcbiAgICogQHBhcmFtIHByZXNlcnZlQXNwZWN0UmF0aW9cclxuICAgKi9cblxuXG4gIHJlc2l6ZSh3aWR0aCkge1xuICAgIHZhciBoZWlnaHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHdpZHRoO1xuICAgIHZhciBwcmVzZXJ2ZUFzcGVjdFJhdGlvID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5yZXNpemUod2lkdGgsIGhlaWdodCwgcHJlc2VydmVBc3BlY3RSYXRpbyk7XG4gIH1cblxufVxuXG5leHBvcnQgeyBBRWxlbWVudCwgQW5pbWF0ZUNvbG9yRWxlbWVudCwgQW5pbWF0ZUVsZW1lbnQsIEFuaW1hdGVUcmFuc2Zvcm1FbGVtZW50LCBCb3VuZGluZ0JveCwgQ0IxLCBDQjIsIENCMywgQ0I0LCBDYW52ZywgQ2lyY2xlRWxlbWVudCwgQ2xpcFBhdGhFbGVtZW50LCBEZWZzRWxlbWVudCwgRGVzY0VsZW1lbnQsIERvY3VtZW50LCBFbGVtZW50LCBFbGxpcHNlRWxlbWVudCwgRmVDb2xvck1hdHJpeEVsZW1lbnQsIEZlQ29tcG9zaXRlRWxlbWVudCwgRmVEcm9wU2hhZG93RWxlbWVudCwgRmVHYXVzc2lhbkJsdXJFbGVtZW50LCBGZU1vcnBob2xvZ3lFbGVtZW50LCBGaWx0ZXJFbGVtZW50LCBGb250LCBGb250RWxlbWVudCwgRm9udEZhY2VFbGVtZW50LCBHRWxlbWVudCwgR2x5cGhFbGVtZW50LCBHcmFkaWVudEVsZW1lbnQsIEltYWdlRWxlbWVudCwgTGluZUVsZW1lbnQsIExpbmVhckdyYWRpZW50RWxlbWVudCwgTWFya2VyRWxlbWVudCwgTWFza0VsZW1lbnQsIE1hdHJpeCwgTWlzc2luZ0dseXBoRWxlbWVudCwgTW91c2UsIFBTRVVET19aRVJPLCBQYXJzZXIsIFBhdGhFbGVtZW50LCBQYXRoUGFyc2VyLCBQYXR0ZXJuRWxlbWVudCwgUG9pbnQsIFBvbHlnb25FbGVtZW50LCBQb2x5bGluZUVsZW1lbnQsIFByb3BlcnR5LCBRQjEsIFFCMiwgUUIzLCBSYWRpYWxHcmFkaWVudEVsZW1lbnQsIFJlY3RFbGVtZW50LCBSZW5kZXJlZEVsZW1lbnQsIFJvdGF0ZSwgU1ZHRWxlbWVudCwgU1ZHRm9udExvYWRlciwgU2NhbGUsIFNjcmVlbiwgU2tldywgU2tld1gsIFNrZXdZLCBTdG9wRWxlbWVudCwgU3R5bGVFbGVtZW50LCBTeW1ib2xFbGVtZW50LCBUUmVmRWxlbWVudCwgVFNwYW5FbGVtZW50LCBUZXh0RWxlbWVudCwgVGV4dFBhdGhFbGVtZW50LCBUaXRsZUVsZW1lbnQsIFRyYW5zZm9ybSwgVHJhbnNsYXRlLCBVbmtub3duRWxlbWVudCwgVXNlRWxlbWVudCwgVmlld1BvcnQsIGNvbXByZXNzU3BhY2VzLCBDYW52ZyBhcyBkZWZhdWx0LCBnZXRTZWxlY3RvclNwZWNpZmljaXR5LCBub3JtYWxpemVBdHRyaWJ1dGVOYW1lLCBub3JtYWxpemVDb2xvciwgcGFyc2VFeHRlcm5hbFVybCwgaW5kZXggYXMgcHJlc2V0cywgdG9OdW1iZXJzLCB0cmltTGVmdCwgdHJpbVJpZ2h0LCB2ZWN0b3JNYWduaXR1ZGUsIHZlY3RvcnNBbmdsZSwgdmVjdG9yc1JhdGlvIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1WlhNdWFuTWlMQ0p6YjNWeVkyVnpJanBiWFN3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenNpZlE9PVxuIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhaWxzIiwiZXhlYyIsInJlcXVpcmUkJDAiLCJ0ZXN0IiwiTkFUSVZFX0JJTkQiLCJjYWxsIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwiRnVuY3Rpb25Qcm90b3R5cGUiLCJ1bmN1cnJ5VGhpcyIsInRvU3RyaW5nIiwic3RyaW5nU2xpY2UiLCJjbGFzc29mUmF3IiwicmVxdWlyZSQkMSIsImNsYXNzb2YiLCJyZXF1aXJlJCQyIiwiJE9iamVjdCIsImlzTnVsbE9yVW5kZWZpbmVkIiwiJFR5cGVFcnJvciIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJJbmRleGVkT2JqZWN0IiwidG9JbmRleGVkT2JqZWN0IiwiZG9jdW1lbnRBbGwiLCIkZG9jdW1lbnRBbGwiLCJpc0NhbGxhYmxlIiwiaXNPYmplY3QiLCJnZXRCdWlsdEluIiwidXNlckFnZW50IiwicHJvY2VzcyIsIkRlbm8iLCJWOF9WRVJTSU9OIiwiTkFUSVZFX1NZTUJPTCIsImlzUHJvdG90eXBlT2YiLCJVU0VfU1lNQk9MX0FTX1VJRCIsInJlcXVpcmUkJDMiLCJpc1N5bWJvbCIsIiRTdHJpbmciLCJ0cnlUb1N0cmluZyIsImFDYWxsYWJsZSIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJkZWZpbmVQcm9wZXJ0eSIsImRlZmluZUdsb2JhbFByb3BlcnR5Iiwic3RvcmUiLCJzaGFyZWRNb2R1bGUiLCJ0b09iamVjdCIsInVpZCIsInNoYXJlZCIsImhhc093biIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwiU3ltYm9sIiwid2VsbEtub3duU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ0b1Byb3BlcnR5S2V5IiwiZG9jdW1lbnQiLCJFWElTVFMiLCJkb2N1bWVudENyZWF0ZUVsZW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJyZXF1aXJlJCQ2IiwiSUU4X0RPTV9ERUZJTkUiLCJyZXF1aXJlJCQ3IiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImFuT2JqZWN0IiwiVjhfUFJPVE9UWVBFX0RFRklORV9CVUciLCJDT05GSUdVUkFCTEUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImluc3BlY3RTb3VyY2UiLCJXZWFrTWFwIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIlR5cGVFcnJvciIsInNldCIsIkNPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsImdldEludGVybmFsU3RhdGUiLCJtYWtlQnVpbHRJbiIsIm1ha2VCdWlsdEluTW9kdWxlIiwiZGVmaW5lQnVpbHRJbiIsImZsb29yIiwidHJ1bmMiLCJ0b0ludGVnZXJPckluZmluaXR5IiwibWF4IiwibWluIiwidG9BYnNvbHV0ZUluZGV4IiwiaW5kZXgiLCJ0b0xlbmd0aCIsImxlbmd0aE9mQXJyYXlMaWtlIiwiY3JlYXRlTWV0aG9kIiwiaW5kZXhPZiIsInB1c2giLCJlbnVtQnVnS2V5cyIsImludGVybmFsT2JqZWN0S2V5cyIsImNvbmNhdCIsIm93bktleXMiLCJrZXlzIiwiY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyIsImlzRm9yY2VkIiwiYVBvc3NpYmxlUHJvdG90eXBlIiwic2V0UHJvdG90eXBlT2YiLCJUT19TVFJJTkdfVEFHIiwic2V0VG9TdHJpbmdUYWciLCJTUEVDSUVTIiwic2V0U3BlY2llcyIsImFuSW5zdGFuY2UiLCJub29wIiwiaXNDb25zdHJ1Y3RvciIsImFDb25zdHJ1Y3RvciIsInNwZWNpZXNDb25zdHJ1Y3RvciIsImFwcGx5IiwiYmluZCIsImh0bWwiLCJhcnJheVNsaWNlIiwidmFsaWRhdGVBcmd1bWVudHNMZW5ndGgiLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkOSIsIklTX0lPUyIsInJlcXVpcmUkJDEwIiwiSVNfTk9ERSIsInJlcXVpcmUkJDExIiwiRnVuY3Rpb24iLCJTdHJpbmciLCJxdWV1ZSIsImlkIiwidGFzayIsIlByb21pc2UiLCJub3RpZnkiLCJub2RlIiwibWljcm90YXNrIiwiaG9zdFJlcG9ydEVycm9ycyIsImNvbnNvbGUiLCJwZXJmb3JtIiwiUXVldWUiLCJJU19ERU5PIiwiTmF0aXZlUHJvbWlzZUNvbnN0cnVjdG9yIiwiTkFUSVZFX1BST01JU0VfUkVKRUNUSU9OX0VWRU5UIiwiRk9SQ0VEX1BST01JU0VfQ09OU1RSVUNUT1IiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm5ld1Byb21pc2VDYXBhYmlsaXR5IiwiJCIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxNCIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTYiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTkiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDIxIiwibmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUiLCJyZXF1aXJlJCQyMiIsInNldEludGVybmFsU3RhdGUiLCJOYXRpdmVQcm9taXNlUHJvdG90eXBlIiwidGhlbiIsIkl0ZXJhdG9ycyIsIklURVJBVE9SIiwiQXJyYXlQcm90b3R5cGUiLCJpc0FycmF5SXRlcmF0b3JNZXRob2QiLCJnZXRJdGVyYXRvck1ldGhvZCIsImdldEl0ZXJhdG9yIiwiaXRlcmF0b3JDbG9zZSIsIml0ZXJhdGUiLCJjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24iLCJQUk9NSVNFX1NUQVRJQ1NfSU5DT1JSRUNUX0lURVJBVElPTiIsInZhbHVlcyIsImNvdW50ZXIiLCJwcm9taXNlUmVzb2x2ZSIsInNlbGYiLCJyZWdleHBGbGFncyIsIiRSZWdFeHAiLCJVTlNVUFBPUlRFRF9ZIiwib2JqZWN0S2V5cyIsIklFX1BST1RPIiwiYWN0aXZlWERvY3VtZW50Iiwic3RpY2t5SGVscGVycyIsImNyZWF0ZSIsImNoYXJBdCIsInJlcGxhY2UiLCJtYXRjaCIsInJlZ2V4cEV4ZWMiLCJSZWdFeHBQcm90b3R5cGUiLCJhZHZhbmNlU3RyaW5nSW5kZXgiLCJmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyIsInJlZ0V4cEV4ZWMiLCJNQVRDSCIsImdldFN1YnN0aXR1dGlvbiIsInJlcGxhY2VtZW50IiwibSIsInN0cmluZ0luZGV4T2YiLCJfIiwibmF0aXZlUmVwbGFjZSIsImlzUmVnRXhwIiwibm90QVJlZ0V4cCIsImNvcnJlY3RJc1JlZ0V4cExvZ2ljIiwiQ09SUkVDVF9JU19SRUdFWFBfTE9HSUMiLCJNRE5fUE9MWUZJTExfQlVHIiwiYWRkVG9VbnNjb3BhYmxlcyIsImdldFByb3RvdHlwZU9mIiwiQlVHR1lfU0FGQVJJX0lURVJBVE9SUyIsIkl0ZXJhdG9yUHJvdG90eXBlIiwicmV0dXJuVGhpcyIsIlBST1BFUl9GVU5DVElPTl9OQU1FIiwiY3JlYXRlSXRlclJlc3VsdE9iamVjdCIsIkRPTVRva2VuTGlzdFByb3RvdHlwZSIsImFycmF5TWV0aG9kSXNTdHJpY3QiLCJTVFJJQ1RfTUVUSE9EIiwiY3JlYXRlUHJvcGVydHkiLCJzcGxpdCIsIndoaXRlc3BhY2VzIiwiaXNBcnJheSIsIkRPTVBhcnNlciIsImZldGNoIiwicnVuIiwid2luZG93Iiwic2hvdWxkVXBkYXRlIiwiYyIsImRhdGEiLCJ0cmFuc2Zvcm0iLCJ0b1Jlc3RvcmUiLCJTVkdQYXRoRGF0YSIsImkiLCJmcm9tIiwidG8iLCJjYW52YXNSR0JBIiwiY3JlYXRlQ2FudmFzIiwiY3JlYXRlSW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsU0FBVSxJQUFJO0FBQ3hCLFNBQU8sTUFBTSxHQUFHLFFBQVEsUUFBUTtBQUNsQztJQUdBQSxXQUVFLE1BQU0sT0FBTyxjQUFjLFlBQVksVUFBVSxLQUNqRCxNQUFNLE9BQU8sVUFBVSxZQUFZLE1BQU0sS0FFekMsTUFBTSxPQUFPLFFBQVEsWUFBWSxJQUFJLEtBQ3JDLE1BQU0sT0FBT0Esa0JBQVUsWUFBWUEsY0FBTSxLQUV4QyxXQUFZO0FBQUUsU0FBTztBQUFPLEVBQUEsS0FBTyxTQUFTLGFBQWEsRUFBRzs7SUNiL0RDLFVBQWlCLFNBQVVDLE9BQU07QUFDL0IsTUFBSTtBQUNGLFdBQU8sQ0FBQyxDQUFDQTtFQUNWLFNBQVEsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUNOQSxJQUFJRCxVQUFRRTtBQUdaLElBQUEsY0FBaUIsQ0FBQ0YsUUFBTSxXQUFZO0FBRWxDLFNBQU8sT0FBTyxlQUFlLElBQUksR0FBRyxFQUFFLEtBQUssV0FBWTtBQUFFLFdBQU87QUFBQSxFQUFJLEVBQUEsQ0FBRSxFQUFFLE1BQU07QUFDaEYsQ0FBQztBQ05ELElBQUlBLFVBQVFFO0FBRVosSUFBQSxxQkFBaUIsQ0FBQ0YsUUFBTSxXQUFZO0FBRWxDLE1BQUlHLFFBQVEsV0FBWTtBQUFBLEVBQWUsRUFBRSxLQUFJO0FBRTdDLFNBQU8sT0FBT0EsU0FBUSxjQUFjQSxNQUFLLGVBQWUsV0FBVztBQUNyRSxDQUFDO0FDUEQsSUFBSUMsZ0JBQWNGO0FBRWxCLElBQUlHLFNBQU8sU0FBUyxVQUFVO0lBRTlCLGVBQWlCRCxnQkFBY0MsT0FBSyxLQUFLQSxNQUFJLElBQUksV0FBWTtBQUMzRCxTQUFPQSxPQUFLLE1BQU1BLFFBQU0sU0FBUztBQUNuQzs7QUNMQSxJQUFJLHdCQUF3QixDQUFFLEVBQUM7QUFFL0IsSUFBSUMsNkJBQTJCLE9BQU87QUFHdEMsSUFBSSxjQUFjQSw4QkFBNEIsQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBSXJGLDJCQUFBLElBQVksY0FBYyxTQUFTLHFCQUFxQixHQUFHO0FBQ3pELE1BQUksYUFBYUEsMkJBQXlCLE1BQU0sQ0FBQztBQUNqRCxTQUFPLENBQUMsQ0FBQyxjQUFjLFdBQVc7QUFDcEMsSUFBSTtBQ2JKLElBQUFDLDZCQUFpQixTQUFVLFFBQVEsT0FBTztBQUN4QyxTQUFPO0FBQUEsSUFDTCxZQUFZLEVBQUUsU0FBUztBQUFBLElBQ3ZCLGNBQWMsRUFBRSxTQUFTO0FBQUEsSUFDekIsVUFBVSxFQUFFLFNBQVM7QUFBQSxJQUNyQjtBQUFBLEVBQ0o7QUFDQTtBQ1BBLElBQUlILGdCQUFjRjtBQUVsQixJQUFJTSxzQkFBb0IsU0FBUztBQUNqQyxJQUFJSCxTQUFPRyxvQkFBa0I7QUFDN0IsSUFBSSxzQkFBc0JKLGlCQUFlSSxvQkFBa0IsS0FBSyxLQUFLSCxRQUFNQSxNQUFJO0FBRS9FLElBQUEsc0JBQWlCRCxnQkFBYyxzQkFBc0IsU0FBVSxJQUFJO0FBQ2pFLFNBQU8sV0FBWTtBQUNqQixXQUFPQyxPQUFLLE1BQU0sSUFBSSxTQUFTO0FBQUEsRUFDbkM7QUFDQTtBQ1ZBLElBQUlJLGdCQUFjUDtBQUVsQixJQUFJUSxhQUFXRCxjQUFZLEdBQUcsUUFBUTtBQUN0QyxJQUFJRSxnQkFBY0YsY0FBWSxHQUFHLEtBQUs7SUFFdENHLGVBQWlCLFNBQVUsSUFBSTtBQUM3QixTQUFPRCxjQUFZRCxXQUFTLEVBQUUsR0FBRyxHQUFHLEVBQUU7QUFDeEM7QUNQQSxJQUFJRCxnQkFBY1A7QUFDbEIsSUFBSUYsVUFBUWE7QUFDWixJQUFJQyxZQUFVQztBQUVkLElBQUlDLFlBQVU7QUFDZCxJQUFJLFFBQVFQLGNBQVksR0FBRyxLQUFLO0lBR2hDLGdCQUFpQlQsUUFBTSxXQUFZO0FBR2pDLFNBQU8sQ0FBQ2dCLFVBQVEsR0FBRyxFQUFFLHFCQUFxQixDQUFDO0FBQzdDLENBQUMsSUFBSSxTQUFVLElBQUk7QUFDakIsU0FBT0YsVUFBUSxFQUFFLEtBQUssV0FBVyxNQUFNLElBQUksRUFBRSxJQUFJRSxVQUFRLEVBQUU7QUFDN0QsSUFBSUE7SUNaSkMsc0JBQWlCLFNBQVUsSUFBSTtBQUM3QixTQUFPLE9BQU8sUUFBUSxPQUFPO0FBQy9CO0FDSkEsSUFBSUEsc0JBQW9CZjtBQUV4QixJQUFJZ0IsZUFBYTtJQUlqQkMsMkJBQWlCLFNBQVUsSUFBSTtBQUM3QixNQUFJRixvQkFBa0IsRUFBRTtBQUFHLFVBQU1DLGFBQVcsMEJBQTBCLEVBQUU7QUFDeEUsU0FBTztBQUNUO0FDUkEsSUFBSUUsa0JBQWdCbEI7QUFDcEIsSUFBSWlCLDJCQUF5Qk47SUFFN0JRLG9CQUFpQixTQUFVLElBQUk7QUFDN0IsU0FBT0QsZ0JBQWNELHlCQUF1QixFQUFFLENBQUM7QUFDakQ7QUNOQSxJQUFJRyxnQkFBYyxPQUFPLFlBQVksWUFBWSxTQUFTO0FBSTFELElBQUksYUFBYSxPQUFPQSxpQkFBZSxlQUFlQSxrQkFBZ0I7QUFFdEUsSUFBQSxnQkFBaUI7QUFBQSxFQUNmLEtBQUtBO0FBQUFBLEVBQ0w7QUFDRjtBQ1RBLElBQUlDLGlCQUFlckI7QUFFbkIsSUFBSW9CLGdCQUFjQyxlQUFhO0FBSS9CLElBQUFDLGVBQWlCRCxlQUFhLGFBQWEsU0FBVSxVQUFVO0FBQzdELFNBQU8sT0FBTyxZQUFZLGNBQWMsYUFBYUQ7QUFDdkQsSUFBSSxTQUFVLFVBQVU7QUFDdEIsU0FBTyxPQUFPLFlBQVk7QUFDNUI7QUNWQSxJQUFJRSxlQUFhdEI7QUFDakIsSUFBSSxlQUFlVztBQUVuQixJQUFJLGNBQWMsYUFBYTtBQUUvQixJQUFBWSxhQUFpQixhQUFhLGFBQWEsU0FBVSxJQUFJO0FBQ3ZELFNBQU8sT0FBTyxNQUFNLFdBQVcsT0FBTyxPQUFPRCxhQUFXLEVBQUUsS0FBSyxPQUFPO0FBQ3hFLElBQUksU0FBVSxJQUFJO0FBQ2hCLFNBQU8sT0FBTyxNQUFNLFdBQVcsT0FBTyxPQUFPQSxhQUFXLEVBQUU7QUFDNUQ7QUNUQSxJQUFJekIsV0FBU0c7QUFDYixJQUFJc0IsZUFBYVg7QUFFakIsSUFBSSxZQUFZLFNBQVUsVUFBVTtBQUNsQyxTQUFPVyxhQUFXLFFBQVEsSUFBSSxXQUFXO0FBQzNDO0FBRUEsSUFBQUUsZUFBaUIsU0FBVSxXQUFXLFFBQVE7QUFDNUMsU0FBTyxVQUFVLFNBQVMsSUFBSSxVQUFVM0IsU0FBTyxVQUFVLElBQUlBLFNBQU8sY0FBY0EsU0FBTyxXQUFXO0FBQ3RHO0FDVEEsSUFBSVUsZ0JBQWNQO0FBRWxCLElBQUEsc0JBQWlCTyxjQUFZLENBQUUsRUFBQyxhQUFhO0FDRjdDLElBQUlpQixlQUFheEI7SUFFakIsa0JBQWlCd0IsYUFBVyxhQUFhLFdBQVcsS0FBSztBQ0Z6RCxJQUFJM0IsV0FBU0c7QUFDYixJQUFJeUIsY0FBWWQ7QUFFaEIsSUFBSWUsWUFBVTdCLFNBQU87QUFDckIsSUFBSThCLFNBQU85QixTQUFPO0FBQ2xCLElBQUksV0FBVzZCLGFBQVdBLFVBQVEsWUFBWUMsVUFBUUEsT0FBSztBQUMzRCxJQUFJLEtBQUssWUFBWSxTQUFTO0FBQzlCLElBQUksT0FBTztBQUVYLElBQUksSUFBSTtBQUNOLFVBQVEsR0FBRyxNQUFNLEdBQUc7QUFHcEIsWUFBVSxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLEVBQUUsTUFBTSxLQUFLLE1BQU07QUFDbEU7QUFJQSxJQUFJLENBQUMsV0FBV0YsYUFBVztBQUN6QixVQUFRQSxZQUFVLE1BQU0sYUFBYTtBQUNyQyxNQUFJLENBQUMsU0FBUyxNQUFNLE1BQU0sSUFBSTtBQUM1QixZQUFRQSxZQUFVLE1BQU0sZUFBZTtBQUN2QyxRQUFJO0FBQU8sZ0JBQVUsQ0FBQyxNQUFNO0FBQUEsRUFDN0I7QUFDSDtBQUVBLElBQUEsa0JBQWlCO0FDekJqQixJQUFJRyxlQUFhNUI7QUFDakIsSUFBSUYsVUFBUWE7SUFHWiw2QkFBaUIsQ0FBQyxDQUFDLE9BQU8seUJBQXlCLENBQUNiLFFBQU0sV0FBWTtBQUNwRSxNQUFJLFNBQVM7QUFHYixTQUFPLENBQUMsT0FBTyxNQUFNLEtBQUssRUFBRSxPQUFPLE1BQU0sYUFBYSxXQUVwRCxDQUFDLE9BQU8sUUFBUThCLGdCQUFjQSxlQUFhO0FBQy9DLENBQUM7QUNYRCxJQUFJQyxrQkFBZ0I3QjtBQUVwQixJQUFBLGlCQUFpQjZCLG1CQUNaLENBQUMsT0FBTyxRQUNSLE9BQU8sT0FBTyxZQUFZO0FDTC9CLElBQUlMLGVBQWF4QjtBQUNqQixJQUFJc0IsZUFBYVg7QUFDakIsSUFBSW1CLGtCQUFnQmpCO0FBQ3BCLElBQUlrQixzQkFBb0JDO0FBRXhCLElBQUlsQixZQUFVO0FBRWQsSUFBQW1CLGFBQWlCRixzQkFBb0IsU0FBVSxJQUFJO0FBQ2pELFNBQU8sT0FBTyxNQUFNO0FBQ3RCLElBQUksU0FBVSxJQUFJO0FBQ2hCLE1BQUksVUFBVVAsYUFBVyxRQUFRO0FBQ2pDLFNBQU9GLGFBQVcsT0FBTyxLQUFLUSxnQkFBYyxRQUFRLFdBQVdoQixVQUFRLEVBQUUsQ0FBQztBQUM1RTtBQ1pBLElBQUlvQixZQUFVO0lBRWRDLGdCQUFpQixTQUFVLFVBQVU7QUFDbkMsTUFBSTtBQUNGLFdBQU9ELFVBQVEsUUFBUTtBQUFBLEVBQ3hCLFNBQVEsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUNSQSxJQUFJWixlQUFhdEI7QUFDakIsSUFBSW1DLGdCQUFjeEI7QUFFbEIsSUFBSUssZUFBYTtJQUdqQm9CLGNBQWlCLFNBQVUsVUFBVTtBQUNuQyxNQUFJZCxhQUFXLFFBQVE7QUFBRyxXQUFPO0FBQ2pDLFFBQU1OLGFBQVdtQixjQUFZLFFBQVEsSUFBSSxvQkFBb0I7QUFDL0Q7QUNUQSxJQUFJQyxjQUFZcEM7QUFDaEIsSUFBSWUsc0JBQW9CSjtBQUl4QixJQUFBMEIsY0FBaUIsU0FBVSxHQUFHLEdBQUc7QUFDL0IsTUFBSSxPQUFPLEVBQUU7QUFDYixTQUFPdEIsb0JBQWtCLElBQUksSUFBSSxTQUFZcUIsWUFBVSxJQUFJO0FBQzdEO0FDUkEsSUFBSWpDLFNBQU9IO0FBQ1gsSUFBSXNCLGVBQWFYO0FBQ2pCLElBQUlZLGFBQVdWO0FBRWYsSUFBSUcsZUFBYTtBQUlqQixJQUFBc0Isd0JBQWlCLFNBQVUsT0FBTyxNQUFNO0FBQ3RDLE1BQUksSUFBSTtBQUNSLE1BQUksU0FBUyxZQUFZaEIsYUFBVyxLQUFLLE1BQU0sUUFBUSxLQUFLLENBQUNDLFdBQVMsTUFBTXBCLE9BQUssSUFBSSxLQUFLLENBQUM7QUFBRyxXQUFPO0FBQ3JHLE1BQUltQixhQUFXLEtBQUssTUFBTSxPQUFPLEtBQUssQ0FBQ0MsV0FBUyxNQUFNcEIsT0FBSyxJQUFJLEtBQUssQ0FBQztBQUFHLFdBQU87QUFDL0UsTUFBSSxTQUFTLFlBQVltQixhQUFXLEtBQUssTUFBTSxRQUFRLEtBQUssQ0FBQ0MsV0FBUyxNQUFNcEIsT0FBSyxJQUFJLEtBQUssQ0FBQztBQUFHLFdBQU87QUFDckcsUUFBTWEsYUFBVyx5Q0FBeUM7QUFDNUQ7O0FDZEEsSUFBSW5CLFdBQVNHO0FBR2IsSUFBSXVDLG1CQUFpQixPQUFPO0FBRTVCLElBQUFDLHlCQUFpQixTQUFVLEtBQUssT0FBTztBQUNyQyxNQUFJO0FBQ0ZELHFCQUFlMUMsVUFBUSxLQUFLLEVBQUUsT0FBYyxjQUFjLE1BQU0sVUFBVSxLQUFJLENBQUU7QUFBQSxFQUNqRixTQUFRLE9BQVA7QUFDQUEsYUFBTyxPQUFPO0FBQUEsRUFDZjtBQUFDLFNBQU87QUFDWDtBQ1hBLElBQUlBLFdBQVNHO0FBQ2IsSUFBSXdDLHlCQUF1QjdCO0FBRTNCLElBQUksU0FBUztBQUNiLElBQUk4QixVQUFRNUMsU0FBTyxXQUFXMkMsdUJBQXFCLFFBQVEsQ0FBQSxDQUFFO0FBRTdELElBQUEsY0FBaUJDO0FDTGpCLElBQUlBLFVBQVE5QjtBQUFBQSxDQUVYK0IsbUJBQWlCLFNBQVUsS0FBSyxPQUFPO0FBQ3RDLFNBQU9ELFFBQU0sU0FBU0EsUUFBTSxPQUFPLFVBQVUsU0FBWSxRQUFRLENBQUE7QUFDbkUsR0FBRyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsRUFDdEIsU0FBUztBQUFBLEVBQ1QsTUFBeUI7QUFBQSxFQUN6QixXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQ1YsQ0FBQztBQ1hELElBQUl4QiwyQkFBeUJqQjtBQUU3QixJQUFJYyxZQUFVO0lBSWQ2QixhQUFpQixTQUFVLFVBQVU7QUFDbkMsU0FBTzdCLFVBQVFHLHlCQUF1QixRQUFRLENBQUM7QUFDakQ7QUNSQSxJQUFJVixnQkFBY1A7QUFDbEIsSUFBSTJDLGFBQVdoQztBQUVmLElBQUksaUJBQWlCSixjQUFZLEdBQUcsY0FBYztJQUtsRCxtQkFBaUIsT0FBTyxVQUFVLFNBQVMsT0FBTyxJQUFJLEtBQUs7QUFDekQsU0FBTyxlQUFlb0MsV0FBUyxFQUFFLEdBQUcsR0FBRztBQUN6QztBQ1ZBLElBQUlwQyxnQkFBY1A7QUFFbEIsSUFBSSxLQUFLO0FBQ1QsSUFBSSxVQUFVLEtBQUs7QUFDbkIsSUFBSVEsYUFBV0QsY0FBWSxHQUFJLFFBQVE7SUFFdkNxQyxRQUFpQixTQUFVLEtBQUs7QUFDOUIsU0FBTyxhQUFhLFFBQVEsU0FBWSxLQUFLLE9BQU8sT0FBT3BDLFdBQVMsRUFBRSxLQUFLLFNBQVMsRUFBRTtBQUN4RjtBQ1JBLElBQUlYLFdBQVNHO0FBQ2IsSUFBSTZDLFdBQVNsQyxTQUFBQTtBQUNiLElBQUltQyxXQUFTakM7QUFDYixJQUFJK0IsUUFBTVo7QUFDVixJQUFJLGdCQUFnQmU7QUFDcEIsSUFBSSxvQkFBb0JDO0FBRXhCLElBQUksd0JBQXdCSCxTQUFPLEtBQUs7QUFDeEMsSUFBSUksV0FBU3BELFNBQU87QUFDcEIsSUFBSSxZQUFZb0QsWUFBVUEsU0FBTztBQUNqQyxJQUFJLHdCQUF3QixvQkFBb0JBLFdBQVNBLFlBQVVBLFNBQU8saUJBQWlCTDtJQUUzRk0sb0JBQWlCLFNBQVUsTUFBTTtBQUMvQixNQUFJLENBQUNKLFNBQU8sdUJBQXVCLElBQUksS0FBSyxFQUFFLGlCQUFpQixPQUFPLHNCQUFzQixTQUFTLFdBQVc7QUFDOUcsUUFBSSxjQUFjLFlBQVk7QUFDOUIsUUFBSSxpQkFBaUJBLFNBQU9HLFVBQVEsSUFBSSxHQUFHO0FBQ3pDLDRCQUFzQixRQUFRQSxTQUFPO0FBQUEsSUFDM0MsV0FBZSxxQkFBcUIsV0FBVztBQUN6Qyw0QkFBc0IsUUFBUSxVQUFVLFdBQVc7QUFBQSxJQUN6RCxPQUFXO0FBQ0wsNEJBQXNCLFFBQVEsc0JBQXNCLFdBQVc7QUFBQSxJQUNoRTtBQUFBLEVBQ0w7QUFBSSxTQUFPLHNCQUFzQjtBQUNqQztBQ3ZCQSxJQUFJOUMsU0FBT0g7QUFDWCxJQUFJdUIsYUFBV1o7QUFDZixJQUFJc0IsYUFBV3BCO0FBQ2YsSUFBSXdCLGNBQVlMO0FBQ2hCLElBQUksc0JBQXNCZTtBQUMxQixJQUFJRyxvQkFBa0JGO0FBRXRCLElBQUloQyxlQUFhO0FBQ2pCLElBQUksZUFBZWtDLGtCQUFnQixhQUFhO0FBSWhELElBQUFDLGdCQUFpQixTQUFVLE9BQU8sTUFBTTtBQUN0QyxNQUFJLENBQUM1QixXQUFTLEtBQUssS0FBS1UsV0FBUyxLQUFLO0FBQUcsV0FBTztBQUNoRCxNQUFJLGVBQWVJLFlBQVUsT0FBTyxZQUFZO0FBQ2hELE1BQUk7QUFDSixNQUFJLGNBQWM7QUFDaEIsUUFBSSxTQUFTO0FBQVcsYUFBTztBQUMvQixhQUFTbEMsT0FBSyxjQUFjLE9BQU8sSUFBSTtBQUN2QyxRQUFJLENBQUNvQixXQUFTLE1BQU0sS0FBS1UsV0FBUyxNQUFNO0FBQUcsYUFBTztBQUNsRCxVQUFNakIsYUFBVyx5Q0FBeUM7QUFBQSxFQUMzRDtBQUNELE1BQUksU0FBUztBQUFXLFdBQU87QUFDL0IsU0FBTyxvQkFBb0IsT0FBTyxJQUFJO0FBQ3hDO0FDeEJBLElBQUksY0FBY2hCO0FBQ2xCLElBQUksV0FBV1c7SUFJZnlDLGtCQUFpQixTQUFVLFVBQVU7QUFDbkMsTUFBSSxNQUFNLFlBQVksVUFBVSxRQUFRO0FBQ3hDLFNBQU8sU0FBUyxHQUFHLElBQUksTUFBTSxNQUFNO0FBQ3JDO0FDUkEsSUFBSXZELFdBQVNHO0FBQ2IsSUFBSXVCLGFBQVdaO0FBRWYsSUFBSTBDLGFBQVd4RCxTQUFPO0FBRXRCLElBQUl5RCxXQUFTL0IsV0FBUzhCLFVBQVEsS0FBSzlCLFdBQVM4QixXQUFTLGFBQWE7SUFFbEVFLDBCQUFpQixTQUFVLElBQUk7QUFDN0IsU0FBT0QsV0FBU0QsV0FBUyxjQUFjLEVBQUUsSUFBSSxDQUFBO0FBQy9DO0FDVEEsSUFBSUcsZ0JBQWN4RDtBQUNsQixJQUFJRixVQUFRYTtBQUNaLElBQUk4QyxrQkFBZ0I1QztBQUdwQixJQUFBLGVBQWlCLENBQUMyQyxpQkFBZSxDQUFDMUQsUUFBTSxXQUFZO0FBRWxELFNBQU8sT0FBTyxlQUFlMkQsZ0JBQWMsS0FBSyxHQUFHLEtBQUs7QUFBQSxJQUN0RCxLQUFLLFdBQVk7QUFBRSxhQUFPO0FBQUEsSUFBSTtBQUFBLEVBQ2xDLENBQUcsRUFBRSxLQUFLO0FBQ1YsQ0FBQztBQ1ZELElBQUlELGdCQUFjeEQ7QUFDbEIsSUFBSUcsU0FBT1E7QUFDWCxJQUFJLDZCQUE2QkU7QUFDakMsSUFBSVIsNkJBQTJCMkI7QUFDL0IsSUFBSWIsb0JBQWtCNEI7QUFDdEIsSUFBSUssa0JBQWdCSjtBQUNwQixJQUFJRixXQUFTWTtBQUNiLElBQUlDLG1CQUFpQkM7QUFHckIsSUFBSUMsOEJBQTRCLE9BQU87QUFJOUIsK0JBQUEsSUFBR0wsZ0JBQWNLLDhCQUE0QixTQUFTLHlCQUF5QixHQUFHLEdBQUc7QUFDNUYsTUFBSTFDLGtCQUFnQixDQUFDO0FBQ3JCLE1BQUlpQyxnQkFBYyxDQUFDO0FBQ25CLE1BQUlPO0FBQWdCLFFBQUk7QUFDdEIsYUFBT0UsNEJBQTBCLEdBQUcsQ0FBQztBQUFBLElBQ3pDLFNBQVcsT0FBUDtBQUFBLElBQTZCO0FBQy9CLE1BQUlmLFNBQU8sR0FBRyxDQUFDO0FBQUcsV0FBT3pDLDJCQUF5QixDQUFDRixPQUFLLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtBQUNuRzs7QUNyQkEsSUFBSXFELGdCQUFjeEQ7QUFDbEIsSUFBSUYsVUFBUWE7QUFJWixJQUFBLHVCQUFpQjZDLGlCQUFlMUQsUUFBTSxXQUFZO0FBRWhELFNBQU8sT0FBTyxlQUFlLFdBQVk7QUFBQSxFQUFBLEdBQWlCLGFBQWE7QUFBQSxJQUNyRSxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsRUFDZCxDQUFHLEVBQUUsYUFBYTtBQUNsQixDQUFDO0FDWEQsSUFBSXlCLGFBQVd2QjtBQUVmLElBQUlrQyxZQUFVO0FBQ2QsSUFBSWxCLGVBQWE7SUFHakI4QyxhQUFpQixTQUFVLFVBQVU7QUFDbkMsTUFBSXZDLFdBQVMsUUFBUTtBQUFHLFdBQU87QUFDL0IsUUFBTVAsYUFBV2tCLFVBQVEsUUFBUSxJQUFJLG1CQUFtQjtBQUMxRDtBQ1RBLElBQUlzQixnQkFBY3hEO0FBQ2xCLElBQUksaUJBQWlCVztBQUNyQixJQUFJb0QsNEJBQTBCbEQ7QUFDOUIsSUFBSWlELGFBQVc5QjtBQUNmLElBQUlvQixrQkFBZ0JMO0FBRXBCLElBQUkvQixlQUFhO0FBRWpCLElBQUksa0JBQWtCLE9BQU87QUFFN0IsSUFBSSw0QkFBNEIsT0FBTztBQUN2QyxJQUFJLGFBQWE7QUFDakIsSUFBSWdELGlCQUFlO0FBQ25CLElBQUksV0FBVztBQUlmLHFCQUFBLElBQVlSLGdCQUFjTyw0QkFBMEIsU0FBUyxlQUFlLEdBQUcsR0FBRyxZQUFZO0FBQzVGRCxhQUFTLENBQUM7QUFDVixNQUFJVixnQkFBYyxDQUFDO0FBQ25CVSxhQUFTLFVBQVU7QUFDbkIsTUFBSSxPQUFPLE1BQU0sY0FBYyxNQUFNLGVBQWUsV0FBVyxjQUFjLFlBQVksY0FBYyxDQUFDLFdBQVcsV0FBVztBQUM1SCxRQUFJLFVBQVUsMEJBQTBCLEdBQUcsQ0FBQztBQUM1QyxRQUFJLFdBQVcsUUFBUSxXQUFXO0FBQ2hDLFFBQUUsS0FBSyxXQUFXO0FBQ2xCLG1CQUFhO0FBQUEsUUFDWCxjQUFjRSxrQkFBZ0IsYUFBYSxXQUFXQSxrQkFBZ0IsUUFBUUE7QUFBQUEsUUFDOUUsWUFBWSxjQUFjLGFBQWEsV0FBVyxjQUFjLFFBQVE7QUFBQSxRQUN4RSxVQUFVO0FBQUEsTUFDbEI7QUFBQSxJQUNLO0FBQUEsRUFDRjtBQUFDLFNBQU8sZ0JBQWdCLEdBQUcsR0FBRyxVQUFVO0FBQzNDLElBQUksa0JBQWtCLFNBQVN6QixnQkFBZSxHQUFHLEdBQUcsWUFBWTtBQUM5RHVCLGFBQVMsQ0FBQztBQUNWLE1BQUlWLGdCQUFjLENBQUM7QUFDbkJVLGFBQVMsVUFBVTtBQUNuQixNQUFJO0FBQWdCLFFBQUk7QUFDdEIsYUFBTyxnQkFBZ0IsR0FBRyxHQUFHLFVBQVU7QUFBQSxJQUMzQyxTQUFXLE9BQVA7QUFBQSxJQUE2QjtBQUMvQixNQUFJLFNBQVMsY0FBYyxTQUFTO0FBQVksVUFBTTlDLGFBQVcseUJBQXlCO0FBQzFGLE1BQUksV0FBVztBQUFZLE1BQUUsS0FBSyxXQUFXO0FBQzdDLFNBQU87QUFDVDtBQzFDQSxJQUFJd0MsZ0JBQWN4RDtBQUNsQixJQUFJaUUseUJBQXVCdEQ7QUFDM0IsSUFBSU4sNkJBQTJCUTtJQUUvQnFELGdDQUFpQlYsZ0JBQWMsU0FBVSxRQUFRLEtBQUssT0FBTztBQUMzRCxTQUFPUyx1QkFBcUIsRUFBRSxRQUFRLEtBQUs1RCwyQkFBeUIsR0FBRyxLQUFLLENBQUM7QUFDL0UsSUFBSSxTQUFVLFFBQVEsS0FBSyxPQUFPO0FBQ2hDLFNBQU8sT0FBTztBQUNkLFNBQU87QUFDVDs7QUNUQSxJQUFJbUQsZ0JBQWN4RDtBQUNsQixJQUFJOEMsV0FBU25DO0FBRWIsSUFBSUwsc0JBQW9CLFNBQVM7QUFFakMsSUFBSSxnQkFBZ0JrRCxpQkFBZSxPQUFPO0FBRTFDLElBQUksU0FBU1YsU0FBT3hDLHFCQUFtQixNQUFNO0FBRTdDLElBQUksU0FBUyxVQUFXLFNBQVMsWUFBWTtBQUFlLEVBQUUsU0FBUztBQUN2RSxJQUFJLGVBQWUsV0FBVyxDQUFDa0QsaUJBQWdCQSxpQkFBZSxjQUFjbEQscUJBQW1CLE1BQU0sRUFBRTtBQUV2RyxJQUFBLGVBQWlCO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUNoQkEsSUFBSUMsZ0JBQWNQO0FBQ2xCLElBQUlzQixlQUFhWDtBQUNqQixJQUFJOEIsVUFBUTVCO0FBRVosSUFBSSxtQkFBbUJOLGNBQVksU0FBUyxRQUFRO0FBR3BELElBQUksQ0FBQ2UsYUFBV21CLFFBQU0sYUFBYSxHQUFHO0FBQ3BDQSxVQUFNLGdCQUFnQixTQUFVLElBQUk7QUFDbEMsV0FBTyxpQkFBaUIsRUFBRTtBQUFBLEVBQzlCO0FBQ0E7SUFFQTBCLGtCQUFpQjFCLFFBQU07QUNidkIsSUFBSTVDLFdBQVNHO0FBQ2IsSUFBSXNCLGVBQWFYO0FBRWpCLElBQUl5RCxZQUFVdkUsU0FBTztBQUVyQixJQUFBLHdCQUFpQnlCLGFBQVc4QyxTQUFPLEtBQUssY0FBYyxLQUFLLE9BQU9BLFNBQU8sQ0FBQztBQ0wxRSxJQUFJdkIsV0FBUzdDLFNBQUFBO0FBQ2IsSUFBSSxNQUFNVztBQUVWLElBQUksT0FBT2tDLFNBQU8sTUFBTTtJQUV4QndCLGNBQWlCLFNBQVUsS0FBSztBQUM5QixTQUFPLEtBQUssU0FBUyxLQUFLLE9BQU8sSUFBSSxHQUFHO0FBQzFDO0FDUEEsSUFBQUMsZUFBaUIsQ0FBRTtBQ0FuQixJQUFJLGtCQUFrQnRFO0FBQ3RCLElBQUlILFdBQVNjO0FBQ2IsSUFBSVksYUFBV1Y7QUFDZixJQUFJcUQsZ0NBQThCbEM7QUFDbEMsSUFBSWMsV0FBU0M7QUFDYixJQUFJRixXQUFTRztBQUNiLElBQUlxQixjQUFZWDtBQUNoQixJQUFJWSxlQUFhVjtBQUVqQixJQUFJLDZCQUE2QjtBQUNqQyxJQUFJVyxjQUFZMUUsU0FBTztBQUN2QixJQUFJLFVBQVVBLFNBQU87QUFDckIsSUFBSTJFLE9BQUssS0FBSztBQUVkLElBQUksVUFBVSxTQUFVLElBQUk7QUFDMUIsU0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSUEsTUFBSSxJQUFJLENBQUEsQ0FBRTtBQUN2QztBQUVBLElBQUksWUFBWSxTQUFVLE1BQU07QUFDOUIsU0FBTyxTQUFVLElBQUk7QUFDbkIsUUFBSTtBQUNKLFFBQUksQ0FBQ2pELFdBQVMsRUFBRSxNQUFNLFFBQVEsSUFBSSxFQUFFLEdBQUcsU0FBUyxNQUFNO0FBQ3BELFlBQU1nRCxZQUFVLDRCQUE0QixPQUFPLFdBQVc7QUFBQSxJQUMvRDtBQUFDLFdBQU87QUFBQSxFQUNiO0FBQ0E7QUFFQSxJQUFJLG1CQUFtQjFCLFNBQU8sT0FBTztBQUNuQyxNQUFJLFFBQVFBLFNBQU8sVUFBVUEsU0FBTyxRQUFRLElBQUksUUFBTztBQUV2RCxRQUFNLE1BQU0sTUFBTTtBQUNsQixRQUFNLE1BQU0sTUFBTTtBQUNsQixRQUFNLE1BQU0sTUFBTTtBQUVsQjJCLFVBQU0sU0FBVSxJQUFJLFVBQVU7QUFDNUIsUUFBSSxNQUFNLElBQUksRUFBRTtBQUFHLFlBQU1ELFlBQVUsMEJBQTBCO0FBQzdELGFBQVMsU0FBUztBQUNsQixVQUFNLElBQUksSUFBSSxRQUFRO0FBQ3RCLFdBQU87QUFBQSxFQUNYO0FBQ0UsUUFBTSxTQUFVLElBQUk7QUFDbEIsV0FBTyxNQUFNLElBQUksRUFBRSxLQUFLLENBQUE7QUFBQSxFQUM1QjtBQUNFLFFBQU0sU0FBVSxJQUFJO0FBQ2xCLFdBQU8sTUFBTSxJQUFJLEVBQUU7QUFBQSxFQUN2QjtBQUNBLE9BQU87QUFDTCxNQUFJLFFBQVFGLFlBQVUsT0FBTztBQUM3QkMsZUFBVyxTQUFTO0FBQ3BCRSxVQUFNLFNBQVUsSUFBSSxVQUFVO0FBQzVCLFFBQUkxQixTQUFPLElBQUksS0FBSztBQUFHLFlBQU15QixZQUFVLDBCQUEwQjtBQUNqRSxhQUFTLFNBQVM7QUFDbEJMLGtDQUE0QixJQUFJLE9BQU8sUUFBUTtBQUMvQyxXQUFPO0FBQUEsRUFDWDtBQUNFLFFBQU0sU0FBVSxJQUFJO0FBQ2xCLFdBQU9wQixTQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsU0FBUztFQUMzQztBQUNFLFFBQU0sU0FBVSxJQUFJO0FBQ2xCLFdBQU9BLFNBQU8sSUFBSSxLQUFLO0FBQUEsRUFDM0I7QUFDQTtBQUVBLElBQUEsZ0JBQWlCO0FBQUEsRUFDZixLQUFLMEI7QUFBQUEsRUFDTDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FDckVBLElBQUkxRSxVQUFRRTtBQUNaLElBQUlzQixlQUFhWDtBQUNqQixJQUFJbUMsV0FBU2pDO0FBQ2IsSUFBSTJDLGdCQUFjeEI7QUFDbEIsSUFBSXlDLCtCQUE2QjFCLGFBQXNDO0FBQ3ZFLElBQUlvQixrQkFBZ0JuQjtBQUNwQixJQUFJMEIsd0JBQXNCaEI7QUFFMUIsSUFBSSx1QkFBdUJnQixzQkFBb0I7QUFDL0MsSUFBSUMscUJBQW1CRCxzQkFBb0I7QUFFM0MsSUFBSW5DLG1CQUFpQixPQUFPO0FBRTVCLElBQUksc0JBQXNCaUIsaUJBQWUsQ0FBQzFELFFBQU0sV0FBWTtBQUMxRCxTQUFPeUMsaUJBQWUsV0FBWTtBQUFBLEVBQWUsR0FBRSxVQUFVLEVBQUUsT0FBTyxFQUFHLENBQUEsRUFBRSxXQUFXO0FBQ3hGLENBQUM7QUFFRCxJQUFJLFdBQVcsT0FBTyxNQUFNLEVBQUUsTUFBTSxRQUFRO0FBRTVDLElBQUlxQyxnQkFBY0MsY0FBQSxVQUFpQixTQUFVLE9BQU8sTUFBTSxTQUFTO0FBQ2pFLE1BQUksT0FBTyxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsTUFBTSxXQUFXO0FBQzFDLFdBQU8sTUFBTSxPQUFPLElBQUksRUFBRSxRQUFRLHNCQUFzQixJQUFJLElBQUk7QUFBQSxFQUNqRTtBQUNELE1BQUksV0FBVyxRQUFRO0FBQVEsV0FBTyxTQUFTO0FBQy9DLE1BQUksV0FBVyxRQUFRO0FBQVEsV0FBTyxTQUFTO0FBQy9DLE1BQUksQ0FBQy9CLFNBQU8sT0FBTyxNQUFNLEtBQU0yQixnQ0FBOEIsTUFBTSxTQUFTLE1BQU87QUFDakYsUUFBSWpCO0FBQWFqQix1QkFBZSxPQUFPLFFBQVEsRUFBRSxPQUFPLE1BQU0sY0FBYyxLQUFJLENBQUU7QUFBQTtBQUM3RSxZQUFNLE9BQU87QUFBQSxFQUNuQjtBQUNELE1BQUksdUJBQXVCLFdBQVdPLFNBQU8sU0FBUyxPQUFPLEtBQUssTUFBTSxXQUFXLFFBQVEsT0FBTztBQUNoR1AscUJBQWUsT0FBTyxVQUFVLEVBQUUsT0FBTyxRQUFRLE1BQUssQ0FBRTtBQUFBLEVBQ3pEO0FBQ0QsTUFBSTtBQUNGLFFBQUksV0FBV08sU0FBTyxTQUFTLGFBQWEsS0FBSyxRQUFRLGFBQWE7QUFDcEUsVUFBSVU7QUFBYWpCLHlCQUFlLE9BQU8sYUFBYSxFQUFFLFVBQVUsTUFBSyxDQUFFO0FBQUEsSUFFeEUsV0FBVSxNQUFNO0FBQVcsWUFBTSxZQUFZO0FBQUEsRUFDbEQsU0FBVyxPQUFQO0FBQUEsRUFBNkI7QUFDL0IsTUFBSSxRQUFRLHFCQUFxQixLQUFLO0FBQ3RDLE1BQUksQ0FBQ08sU0FBTyxPQUFPLFFBQVEsR0FBRztBQUM1QixVQUFNLFNBQVMsU0FBUyxLQUFLLE9BQU8sUUFBUSxXQUFXLE9BQU8sRUFBRTtBQUFBLEVBQ2pFO0FBQUMsU0FBTztBQUNYO0FBSUEsU0FBUyxVQUFVLFdBQVc4QixjQUFZLFNBQVMsV0FBVztBQUM1RCxTQUFPdEQsYUFBVyxJQUFJLEtBQUtxRCxtQkFBaUIsSUFBSSxFQUFFLFVBQVVSLGdCQUFjLElBQUk7QUFDaEYsR0FBRyxVQUFVO0FDaERiLElBQUk3QyxlQUFhdEI7QUFDakIsSUFBSWlFLHlCQUF1QnREO0FBQzNCLElBQUksY0FBY0UsY0FBQUE7QUFDbEIsSUFBSTJCLHlCQUF1QlI7SUFFM0I4QyxrQkFBaUIsU0FBVSxHQUFHLEtBQUssT0FBTyxTQUFTO0FBQ2pELE1BQUksQ0FBQztBQUFTLGNBQVU7QUFDeEIsTUFBSSxTQUFTLFFBQVE7QUFDckIsTUFBSSxPQUFPLFFBQVEsU0FBUyxTQUFZLFFBQVEsT0FBTztBQUN2RCxNQUFJeEQsYUFBVyxLQUFLO0FBQUcsZ0JBQVksT0FBTyxNQUFNLE9BQU87QUFDdkQsTUFBSSxRQUFRLFFBQVE7QUFDbEIsUUFBSTtBQUFRLFFBQUUsT0FBTztBQUFBO0FBQ2hCa0IsNkJBQXFCLEtBQUssS0FBSztBQUFBLEVBQ3hDLE9BQVM7QUFDTCxRQUFJO0FBQ0YsVUFBSSxDQUFDLFFBQVE7QUFBUSxlQUFPLEVBQUU7QUFBQSxlQUNyQixFQUFFO0FBQU0saUJBQVM7QUFBQSxJQUNoQyxTQUFhLE9BQVA7QUFBQSxJQUE2QjtBQUMvQixRQUFJO0FBQVEsUUFBRSxPQUFPO0FBQUE7QUFDaEJ5Qiw2QkFBcUIsRUFBRSxHQUFHLEtBQUs7QUFBQSxRQUNsQztBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osY0FBYyxDQUFDLFFBQVE7QUFBQSxRQUN2QixVQUFVLENBQUMsUUFBUTtBQUFBLE1BQ3pCLENBQUs7QUFBQSxFQUNGO0FBQUMsU0FBTztBQUNYOztBQzFCQSxJQUFJLE9BQU8sS0FBSztBQUNoQixJQUFJYyxVQUFRLEtBQUs7SUFLakIsWUFBaUIsS0FBSyxTQUFTLFNBQVMsTUFBTSxHQUFHO0FBQy9DLE1BQUksSUFBSSxDQUFDO0FBQ1QsVUFBUSxJQUFJLElBQUlBLFVBQVEsTUFBTSxDQUFDO0FBQ2pDO0FDVEEsSUFBSUMsU0FBUWhGO0lBSVppRix3QkFBaUIsU0FBVSxVQUFVO0FBQ25DLE1BQUksU0FBUyxDQUFDO0FBRWQsU0FBTyxXQUFXLFVBQVUsV0FBVyxJQUFJLElBQUlELE9BQU0sTUFBTTtBQUM3RDtBQ1JBLElBQUlDLHdCQUFzQmpGO0FBRTFCLElBQUlrRixRQUFNLEtBQUs7QUFDZixJQUFJQyxRQUFNLEtBQUs7QUFLZixJQUFBQyxvQkFBaUIsU0FBVUMsUUFBTyxRQUFRO0FBQ3hDLE1BQUksVUFBVUosc0JBQW9CSSxNQUFLO0FBQ3ZDLFNBQU8sVUFBVSxJQUFJSCxNQUFJLFVBQVUsUUFBUSxDQUFDLElBQUlDLE1BQUksU0FBUyxNQUFNO0FBQ3JFO0FDWEEsSUFBSUYsd0JBQXNCakY7QUFFMUIsSUFBSW1GLFFBQU0sS0FBSztJQUlmRyxhQUFpQixTQUFVLFVBQVU7QUFDbkMsU0FBTyxXQUFXLElBQUlILE1BQUlGLHNCQUFvQixRQUFRLEdBQUcsZ0JBQWdCLElBQUk7QUFDL0U7QUNSQSxJQUFJSyxhQUFXdEY7SUFJZnVGLHNCQUFpQixTQUFVLEtBQUs7QUFDOUIsU0FBT0QsV0FBUyxJQUFJLE1BQU07QUFDNUI7QUNOQSxJQUFJbkUsb0JBQWtCbkI7QUFDdEIsSUFBSW9GLG9CQUFrQnpFO0FBQ3RCLElBQUk0RSxzQkFBb0IxRTtBQUd4QixJQUFJMkUsaUJBQWUsU0FBVSxhQUFhO0FBQ3hDLFNBQU8sU0FBVSxPQUFPLElBQUksV0FBVztBQUNyQyxRQUFJLElBQUlyRSxrQkFBZ0IsS0FBSztBQUM3QixRQUFJLFNBQVNvRSxvQkFBa0IsQ0FBQztBQUNoQyxRQUFJRixTQUFRRCxrQkFBZ0IsV0FBVyxNQUFNO0FBQzdDLFFBQUk7QUFHSixRQUFJLGVBQWUsTUFBTTtBQUFJLGFBQU8sU0FBU0MsUUFBTztBQUNsRCxnQkFBUSxFQUFFQTtBQUVWLFlBQUksU0FBUztBQUFPLGlCQUFPO0FBQUEsTUFFNUI7QUFBQTtBQUFNLGFBQU0sU0FBU0EsUUFBT0EsVUFBUztBQUNwQyxhQUFLLGVBQWVBLFVBQVMsTUFBTSxFQUFFQSxZQUFXO0FBQUksaUJBQU8sZUFBZUEsVUFBUztBQUFBLE1BQ3pGO0FBQU0sV0FBTyxDQUFDLGVBQWU7QUFBQSxFQUM3QjtBQUNBO0FBRUEsSUFBQSxnQkFBaUI7QUFBQSxFQUdmLFVBQVVHLGVBQWEsSUFBSTtBQUFBLEVBRzNCLFNBQVNBLGVBQWEsS0FBSztBQUM3QjtBQy9CQSxJQUFJakYsZ0JBQWNQO0FBQ2xCLElBQUk4QyxXQUFTbkM7QUFDYixJQUFJUSxvQkFBa0JOO0FBQ3RCLElBQUk0RSxZQUFVekQsY0FBdUM7QUFDckQsSUFBSXNDLGVBQWF2QjtBQUVqQixJQUFJMkMsU0FBT25GLGNBQVksR0FBRyxJQUFJO0FBRTlCLElBQUEscUJBQWlCLFNBQVUsUUFBUSxPQUFPO0FBQ3hDLE1BQUksSUFBSVksa0JBQWdCLE1BQU07QUFDOUIsTUFBSSxJQUFJO0FBQ1IsTUFBSSxTQUFTLENBQUE7QUFDYixNQUFJO0FBQ0osT0FBSyxPQUFPO0FBQUcsS0FBQzJCLFNBQU93QixjQUFZLEdBQUcsS0FBS3hCLFNBQU8sR0FBRyxHQUFHLEtBQUs0QyxPQUFLLFFBQVEsR0FBRztBQUU3RSxTQUFPLE1BQU0sU0FBUztBQUFHLFFBQUk1QyxTQUFPLEdBQUcsTUFBTSxNQUFNLElBQUksR0FBRztBQUN4RCxPQUFDMkMsVUFBUSxRQUFRLEdBQUcsS0FBS0MsT0FBSyxRQUFRLEdBQUc7QUFBQSxJQUMxQztBQUNELFNBQU87QUFDVDtBQ2xCQSxJQUFBQyxnQkFBaUI7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUNUQSxJQUFJQyx1QkFBcUI1RjtBQUN6QixJQUFJMkYsZ0JBQWNoRjtBQUVsQixJQUFJMkQsZUFBYXFCLGNBQVksT0FBTyxVQUFVLFdBQVc7QUFLaEQsMEJBQUEsSUFBRyxPQUFPLHVCQUF1QixTQUFTLG9CQUFvQixHQUFHO0FBQ3hFLFNBQU9DLHFCQUFtQixHQUFHdEIsWUFBVTtBQUN6Qzs7QUNUUyw0QkFBQSxJQUFHLE9BQU87QUNEbkIsSUFBSTlDLGVBQWF4QjtBQUNqQixJQUFJTyxnQkFBY0k7QUFDbEIsSUFBSSw0QkFBNEJFO0FBQ2hDLElBQUksOEJBQThCbUI7QUFDbEMsSUFBSThCLGFBQVdmO0FBRWYsSUFBSThDLFdBQVN0RixjQUFZLEdBQUcsTUFBTTtBQUdsQyxJQUFBdUYsWUFBaUJ0RSxhQUFXLFdBQVcsU0FBUyxLQUFLLFNBQVMsUUFBUSxJQUFJO0FBQ3hFLE1BQUl1RSxRQUFPLDBCQUEwQixFQUFFakMsV0FBUyxFQUFFLENBQUM7QUFDbkQsTUFBSSx3QkFBd0IsNEJBQTRCO0FBQ3hELFNBQU8sd0JBQXdCK0IsU0FBT0UsT0FBTSxzQkFBc0IsRUFBRSxDQUFDLElBQUlBO0FBQzNFO0FDYkEsSUFBSWpELFdBQVM5QztBQUNiLElBQUk4RixZQUFVbkY7QUFDZCxJQUFJLGlDQUFpQ0U7QUFDckMsSUFBSW9ELHlCQUF1QmpDO0FBRTNCLElBQUFnRSw4QkFBaUIsU0FBVSxRQUFRLFFBQVEsWUFBWTtBQUNyRCxNQUFJRCxRQUFPRCxVQUFRLE1BQU07QUFDekIsTUFBSXZELGtCQUFpQjBCLHVCQUFxQjtBQUMxQyxNQUFJN0QsNEJBQTJCLCtCQUErQjtBQUM5RCxXQUFTLElBQUksR0FBRyxJQUFJMkYsTUFBSyxRQUFRLEtBQUs7QUFDcEMsUUFBSSxNQUFNQSxNQUFLO0FBQ2YsUUFBSSxDQUFDakQsU0FBTyxRQUFRLEdBQUcsS0FBSyxFQUFFLGNBQWNBLFNBQU8sWUFBWSxHQUFHLElBQUk7QUFDcEUsTUFBQVAsZ0JBQWUsUUFBUSxLQUFLbkMsMEJBQXlCLFFBQVEsR0FBRyxDQUFDO0FBQUEsSUFDbEU7QUFBQSxFQUNGO0FBQ0g7QUNmQSxJQUFJTixVQUFRRTtBQUNaLElBQUlzQixlQUFhWDtBQUVqQixJQUFJLGNBQWM7QUFFbEIsSUFBSXNGLGFBQVcsU0FBVSxTQUFTLFdBQVc7QUFDM0MsTUFBSSxRQUFRLEtBQUssVUFBVSxPQUFPO0FBQ2xDLFNBQU8sU0FBUyxXQUFXLE9BQ3ZCLFNBQVMsU0FBUyxRQUNsQjNFLGFBQVcsU0FBUyxJQUFJeEIsUUFBTSxTQUFTLElBQ3ZDLENBQUMsQ0FBQztBQUNSO0FBRUEsSUFBSSxZQUFZbUcsV0FBUyxZQUFZLFNBQVUsUUFBUTtBQUNyRCxTQUFPLE9BQU8sTUFBTSxFQUFFLFFBQVEsYUFBYSxHQUFHLEVBQUU7QUFDbEQ7QUFFQSxJQUFJLE9BQU9BLFdBQVMsT0FBTztBQUMzQixJQUFJLFNBQVNBLFdBQVMsU0FBUztBQUMvQixJQUFJLFdBQVdBLFdBQVMsV0FBVztBQUVuQyxJQUFBLGFBQWlCQTtBQ3JCakIsSUFBSXBHLFdBQVNHO0FBQ2IsSUFBSUksNkJBQTJCTywrQkFBMkQ7QUFDMUYsSUFBSXVELGdDQUE4QnJEO0FBQ2xDLElBQUlpRSxrQkFBZ0I5QztBQUNwQixJQUFJLHVCQUF1QmU7QUFDM0IsSUFBSSw0QkFBNEJDO0FBQ2hDLElBQUlpRCxhQUFXdkM7QUFpQmYsSUFBQSxVQUFpQixTQUFVLFNBQVMsUUFBUTtBQUMxQyxNQUFJLFNBQVMsUUFBUTtBQUNyQixNQUFJLFNBQVMsUUFBUTtBQUNyQixNQUFJLFNBQVMsUUFBUTtBQUNyQixNQUFJLFFBQVEsUUFBUSxLQUFLLGdCQUFnQixnQkFBZ0I7QUFDekQsTUFBSSxRQUFRO0FBQ1YsYUFBUzdEO0FBQUFBLEVBQ1YsV0FBVSxRQUFRO0FBQ2pCLGFBQVNBLFNBQU8sV0FBVyxxQkFBcUIsUUFBUSxDQUFBLENBQUU7QUFBQSxFQUM5RCxPQUFTO0FBQ0wsY0FBVUEsU0FBTyxXQUFXLENBQUEsR0FBSTtBQUFBLEVBQ2pDO0FBQ0QsTUFBSTtBQUFRLFNBQUssT0FBTyxRQUFRO0FBQzlCLHVCQUFpQixPQUFPO0FBQ3hCLFVBQUksUUFBUSxnQkFBZ0I7QUFDMUIscUJBQWFPLDJCQUF5QixRQUFRLEdBQUc7QUFDakQseUJBQWlCLGNBQWMsV0FBVztBQUFBLE1BQ2hEO0FBQVcseUJBQWlCLE9BQU87QUFDL0IsZUFBUzZGLFdBQVMsU0FBUyxNQUFNLFVBQVUsU0FBUyxNQUFNLE9BQU8sS0FBSyxRQUFRLE1BQU07QUFFcEYsVUFBSSxDQUFDLFVBQVUsbUJBQW1CLFFBQVc7QUFDM0MsWUFBSSxPQUFPLGtCQUFrQixPQUFPO0FBQWdCO0FBQ3BELGtDQUEwQixnQkFBZ0IsY0FBYztBQUFBLE1BQ3pEO0FBRUQsVUFBSSxRQUFRLFFBQVMsa0JBQWtCLGVBQWUsTUFBTztBQUMzRC9CLHNDQUE0QixnQkFBZ0IsUUFBUSxJQUFJO0FBQUEsTUFDekQ7QUFDRFksc0JBQWMsUUFBUSxLQUFLLGdCQUFnQixPQUFPO0FBQUEsSUFDbkQ7QUFDSDtBQ3JEQSxJQUFJbEUsWUFBVVo7QUFDZCxJQUFJSCxXQUFTYztJQUViLGVBQWlCQyxVQUFRZixTQUFPLE9BQU8sS0FBSztBQ0g1QyxJQUFJeUIsZUFBYXRCO0FBRWpCLElBQUlrQyxZQUFVO0FBQ2QsSUFBSWxCLGVBQWE7SUFFakJrRix1QkFBaUIsU0FBVSxVQUFVO0FBQ25DLE1BQUksT0FBTyxZQUFZLFlBQVk1RSxhQUFXLFFBQVE7QUFBRyxXQUFPO0FBQ2hFLFFBQU1OLGFBQVcsZUFBZWtCLFVBQVEsUUFBUSxJQUFJLGlCQUFpQjtBQUN2RTtBQ1BBLElBQUkzQixnQkFBY1A7QUFDbEIsSUFBSThELGFBQVduRDtBQUNmLElBQUkscUJBQXFCRTtJQU16Qix1QkFBaUIsT0FBTyxtQkFBbUIsZUFBZSxDQUFFLElBQUcsV0FBWTtBQUN6RSxNQUFJLGlCQUFpQjtBQUNyQixNQUFJWixRQUFPLENBQUE7QUFDWCxNQUFJO0FBQ0osTUFBSTtBQUVGLGFBQVNNLGNBQVksT0FBTyx5QkFBeUIsT0FBTyxXQUFXLFdBQVcsRUFBRSxHQUFHO0FBQ3ZGLFdBQU9OLE9BQU0sQ0FBQSxDQUFFO0FBQ2YscUJBQWlCQSxpQkFBZ0I7QUFBQSxFQUNyQyxTQUFXLE9BQVA7QUFBQSxFQUE2QjtBQUMvQixTQUFPLFNBQVNrRyxnQkFBZSxHQUFHLE9BQU87QUFDdkNyQyxlQUFTLENBQUM7QUFDVix1QkFBbUIsS0FBSztBQUN4QixRQUFJO0FBQWdCLGFBQU8sR0FBRyxLQUFLO0FBQUE7QUFDOUIsUUFBRSxZQUFZO0FBQ25CLFdBQU87QUFBQSxFQUNYO0FBQ0EsRUFBQyxJQUFLO0FDMUJOLElBQUl2QixtQkFBaUJ2QyxxQkFBK0M7QUFDcEUsSUFBSThDLFdBQVNuQztBQUNiLElBQUl1QyxvQkFBa0JyQztBQUV0QixJQUFJdUYsa0JBQWdCbEQsa0JBQWdCLGFBQWE7QUFFakQsSUFBQW1ELG1CQUFpQixTQUFVLFFBQVEsS0FBSyxRQUFRO0FBQzlDLE1BQUksVUFBVSxDQUFDO0FBQVEsYUFBUyxPQUFPO0FBQ3ZDLE1BQUksVUFBVSxDQUFDdkQsU0FBTyxRQUFRc0QsZUFBYSxHQUFHO0FBQzVDN0QscUJBQWUsUUFBUTZELGlCQUFlLEVBQUUsY0FBYyxNQUFNLE9BQU8sSUFBRyxDQUFFO0FBQUEsRUFDekU7QUFDSDtBQ1ZBLElBQUk1RSxlQUFheEI7QUFDakIsSUFBSWlFLHlCQUF1QnREO0FBQzNCLElBQUl1QyxvQkFBa0JyQztBQUN0QixJQUFJMkMsZ0JBQWN4QjtBQUVsQixJQUFJc0UsWUFBVXBELGtCQUFnQixTQUFTO0lBRXZDcUQsZUFBaUIsU0FBVSxrQkFBa0I7QUFDM0MsTUFBSSxjQUFjL0UsYUFBVyxnQkFBZ0I7QUFDN0MsTUFBSWUsa0JBQWlCMEIsdUJBQXFCO0FBRTFDLE1BQUlULGlCQUFlLGVBQWUsQ0FBQyxZQUFZOEMsWUFBVTtBQUN2RCxJQUFBL0QsZ0JBQWUsYUFBYStELFdBQVM7QUFBQSxNQUNuQyxjQUFjO0FBQUEsTUFDZCxLQUFLLFdBQVk7QUFBRSxlQUFPO0FBQUEsTUFBTztBQUFBLElBQ3ZDLENBQUs7QUFBQSxFQUNGO0FBQ0g7QUNsQkEsSUFBSXhFLGtCQUFnQjlCO0FBRXBCLElBQUlnQixlQUFhO0FBRWpCLElBQUF3RixlQUFpQixTQUFVLElBQUksV0FBVztBQUN4QyxNQUFJMUUsZ0JBQWMsV0FBVyxFQUFFO0FBQUcsV0FBTztBQUN6QyxRQUFNZCxhQUFXLHNCQUFzQjtBQUN6QztBQ1BBLElBQUlrQyxvQkFBa0JsRDtBQUV0QixJQUFJb0csa0JBQWdCbEQsa0JBQWdCLGFBQWE7QUFDakQsSUFBSWpELFNBQU8sQ0FBQTtBQUVYQSxPQUFLbUcsbUJBQWlCO0FBRXRCLElBQUEscUJBQWlCLE9BQU9uRyxNQUFJLE1BQU07QUNQbEMsSUFBSSx3QkFBd0JEO0FBQzVCLElBQUlzQixlQUFhWDtBQUNqQixJQUFJRCxlQUFhRztBQUNqQixJQUFJcUMsb0JBQWtCbEI7QUFFdEIsSUFBSW9FLGtCQUFnQmxELGtCQUFnQixhQUFhO0FBQ2pELElBQUlwQyxZQUFVO0FBR2QsSUFBSSxvQkFBb0JKLGFBQVcsV0FBWTtBQUFFLFNBQU87QUFBWSxFQUFBLENBQUUsS0FBSztBQUczRSxJQUFJLFNBQVMsU0FBVSxJQUFJLEtBQUs7QUFDOUIsTUFBSTtBQUNGLFdBQU8sR0FBRztBQUFBLEVBQ2QsU0FBVyxPQUFQO0FBQUEsRUFBNkI7QUFDakM7QUFHQSxJQUFBRSxZQUFpQix3QkFBd0JGLGVBQWEsU0FBVSxJQUFJO0FBQ2xFLE1BQUksR0FBRyxLQUFLO0FBQ1osU0FBTyxPQUFPLFNBQVksY0FBYyxPQUFPLE9BQU8sU0FFbEQsUUFBUSxNQUFNLE9BQU8sSUFBSUksVUFBUSxFQUFFLEdBQUdzRixlQUFhLE1BQU0sV0FBVyxNQUVwRSxvQkFBb0IxRixhQUFXLENBQUMsS0FFL0IsU0FBU0EsYUFBVyxDQUFDLE1BQU0sWUFBWVksYUFBVyxFQUFFLE1BQU0sSUFBSSxjQUFjO0FBQ25GO0FDNUJBLElBQUlmLGdCQUFjUDtBQUNsQixJQUFJRixVQUFRYTtBQUNaLElBQUlXLGVBQWFUO0FBQ2pCLElBQUlELFlBQVVvQjtBQUNkLElBQUlSLGVBQWF1QjtBQUNqQixJQUFJb0Isa0JBQWdCbkI7QUFFcEIsSUFBSXlELFNBQU8sV0FBWTtBQUFBO0FBQ3ZCLElBQUksUUFBUSxDQUFBO0FBQ1osSUFBSSxZQUFZakYsYUFBVyxXQUFXLFdBQVc7QUFDakQsSUFBSSxvQkFBb0I7QUFDeEIsSUFBSXpCLFNBQU9RLGNBQVksa0JBQWtCLElBQUk7QUFDN0MsSUFBSSxzQkFBc0IsQ0FBQyxrQkFBa0IsS0FBS2tHLE1BQUk7QUFFdEQsSUFBSSxzQkFBc0IsU0FBUyxjQUFjLFVBQVU7QUFDekQsTUFBSSxDQUFDbkYsYUFBVyxRQUFRO0FBQUcsV0FBTztBQUNsQyxNQUFJO0FBQ0YsY0FBVW1GLFFBQU0sT0FBTyxRQUFRO0FBQy9CLFdBQU87QUFBQSxFQUNSLFNBQVEsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUFFQSxJQUFJLHNCQUFzQixTQUFTQyxlQUFjLFVBQVU7QUFDekQsTUFBSSxDQUFDcEYsYUFBVyxRQUFRO0FBQUcsV0FBTztBQUNsQyxVQUFRVixVQUFRLFFBQVE7QUFBQSxTQUNqQjtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQTBCLGFBQU87QUFBQTtBQUV4QyxNQUFJO0FBSUYsV0FBTyx1QkFBdUIsQ0FBQyxDQUFDYixPQUFLLG1CQUFtQm9FLGdCQUFjLFFBQVEsQ0FBQztBQUFBLEVBQ2hGLFNBQVEsT0FBUDtBQUNBLFdBQU87QUFBQSxFQUNSO0FBQ0g7QUFFQSxvQkFBb0IsT0FBTztBQUkzQixJQUFBdUMsa0JBQWlCLENBQUMsYUFBYTVHLFFBQU0sV0FBWTtBQUMvQyxNQUFJO0FBQ0osU0FBTyxvQkFBb0Isb0JBQW9CLElBQUksS0FDOUMsQ0FBQyxvQkFBb0IsTUFBTSxLQUMzQixDQUFDLG9CQUFvQixXQUFZO0FBQUUsYUFBUztBQUFBLEVBQUssQ0FBRSxLQUNuRDtBQUNQLENBQUMsSUFBSSxzQkFBc0I7QUNuRDNCLElBQUk0RyxpQkFBZ0IxRztBQUNwQixJQUFJbUMsZ0JBQWN4QjtBQUVsQixJQUFJSyxlQUFhO0lBR2pCMkYsaUJBQWlCLFNBQVUsVUFBVTtBQUNuQyxNQUFJRCxlQUFjLFFBQVE7QUFBRyxXQUFPO0FBQ3BDLFFBQU0xRixhQUFXbUIsY0FBWSxRQUFRLElBQUksdUJBQXVCO0FBQ2xFO0FDVEEsSUFBSTJCLGFBQVc5RDtBQUNmLElBQUksZUFBZVc7QUFDbkIsSUFBSUksc0JBQW9CRjtBQUN4QixJQUFJcUMsb0JBQWtCbEI7QUFFdEIsSUFBSXNFLFlBQVVwRCxrQkFBZ0IsU0FBUztBQUl2QyxJQUFBMEQsdUJBQWlCLFNBQVUsR0FBRyxvQkFBb0I7QUFDaEQsTUFBSSxJQUFJOUMsV0FBUyxDQUFDLEVBQUU7QUFDcEIsTUFBSTtBQUNKLFNBQU8sTUFBTSxVQUFhL0Msb0JBQWtCLElBQUkrQyxXQUFTLENBQUMsRUFBRXdDLFVBQVEsSUFBSSxxQkFBcUIsYUFBYSxDQUFDO0FBQzdHO0FDYkEsSUFBSXBHLGdCQUFjRjtBQUVsQixJQUFJLG9CQUFvQixTQUFTO0FBQ2pDLElBQUk2RyxVQUFRLGtCQUFrQjtBQUM5QixJQUFJMUcsU0FBTyxrQkFBa0I7QUFHN0IsSUFBQSxnQkFBaUIsT0FBTyxXQUFXLFlBQVksUUFBUSxVQUFVRCxnQkFBY0MsT0FBSyxLQUFLMEcsT0FBSyxJQUFJLFdBQVk7QUFDNUcsU0FBTzFHLE9BQUssTUFBTTBHLFNBQU8sU0FBUztBQUNwQztBQ1RBLElBQUksYUFBYTdHO0FBQ2pCLElBQUlPLGdCQUFjSTtJQUVsQiw0QkFBaUIsU0FBVSxJQUFJO0FBSTdCLE1BQUksV0FBVyxFQUFFLE1BQU07QUFBWSxXQUFPSixjQUFZLEVBQUU7QUFDMUQ7QUNSQSxJQUFJQSxnQkFBY1A7QUFDbEIsSUFBSW9DLGNBQVl6QjtBQUNoQixJQUFJLGNBQWNFO0FBRWxCLElBQUlpRyxTQUFPdkcsY0FBWUEsY0FBWSxJQUFJO0FBR3ZDLElBQUEsc0JBQWlCLFNBQVUsSUFBSSxNQUFNO0FBQ25DNkIsY0FBVSxFQUFFO0FBQ1osU0FBTyxTQUFTLFNBQVksS0FBSyxjQUFjMEUsT0FBSyxJQUFJLElBQUksSUFBSSxXQUF5QjtBQUN2RixXQUFPLEdBQUcsTUFBTSxNQUFNLFNBQVM7QUFBQSxFQUNuQztBQUNBO0FDWkEsSUFBSXRGLGVBQWF4QjtBQUVqQixJQUFBK0csU0FBaUJ2RixhQUFXLFlBQVksaUJBQWlCO0FDRnpELElBQUlqQixnQkFBY1A7QUFFbEIsSUFBQWdILGVBQWlCekcsY0FBWSxDQUFFLEVBQUMsS0FBSztBQ0ZyQyxJQUFJUyxlQUFhO0FBRWpCLElBQUFpRyw0QkFBaUIsU0FBVSxRQUFRLFVBQVU7QUFDM0MsTUFBSSxTQUFTO0FBQVUsVUFBTWpHLGFBQVcsc0JBQXNCO0FBQzlELFNBQU87QUFDVDtBQ0xBLElBQUlTLGNBQVl6QjtBQUVoQixJQUFBLGNBQWlCLHFDQUFxQyxLQUFLeUIsV0FBUztBQ0ZwRSxJQUFJNUIsV0FBU0c7QUFDYixJQUFJNkcsVUFBUWxHO0FBQ1osSUFBSW1HLFNBQU9qRztBQUNYLElBQUlTLGVBQWFVO0FBQ2pCLElBQUljLFdBQVNDO0FBQ2IsSUFBSWpELFVBQVFrRDtBQUNaLElBQUkrRCxTQUFPckQ7QUFDWCxJQUFJc0QsZUFBYXBEO0FBQ2pCLElBQUksZ0JBQWdCc0Q7QUFDcEIsSUFBSSwwQkFBMEJDO0FBQzlCLElBQUlDLFdBQVNDO0FBQ2IsSUFBSUMsWUFBVUM7QUFFZCxJQUFJLE1BQU0xSCxTQUFPO0FBQ2pCLElBQUksUUFBUUEsU0FBTztBQUNuQixJQUFJNkIsWUFBVTdCLFNBQU87QUFDckIsSUFBSSxXQUFXQSxTQUFPO0FBQ3RCLElBQUkySCxhQUFXM0gsU0FBTztBQUN0QixJQUFJLGlCQUFpQkEsU0FBTztBQUM1QixJQUFJNEgsV0FBUzVILFNBQU87QUFDcEIsSUFBSSxVQUFVO0FBQ2QsSUFBSTZILFVBQVEsQ0FBQTtBQUNaLElBQUkscUJBQXFCO0FBQ3pCLElBQUksV0FBVyxPQUFPLFNBQVM7QUFFL0IsSUFBSTtBQUVGLGNBQVk3SCxTQUFPO0FBQ3JCLFNBQVMsT0FBUDtBQUE2QjtBQUUvQixJQUFJLE1BQU0sU0FBVThILEtBQUk7QUFDdEIsTUFBSTdFLFNBQU80RSxTQUFPQyxHQUFFLEdBQUc7QUFDckIsUUFBSSxLQUFLRCxRQUFNQztBQUNmLFdBQU9ELFFBQU1DO0FBQ2I7RUFDRDtBQUNIO0FBRUEsSUFBSSxTQUFTLFNBQVVBLEtBQUk7QUFDekIsU0FBTyxXQUFZO0FBQ2pCLFFBQUlBLEdBQUU7QUFBQSxFQUNWO0FBQ0E7QUFFQSxJQUFJLFdBQVcsU0FBVSxPQUFPO0FBQzlCLE1BQUksTUFBTSxJQUFJO0FBQ2hCO0FBRUEsSUFBSSxPQUFPLFNBQVVBLEtBQUk7QUFFdkI5SCxXQUFPLFlBQVk0SCxTQUFPRSxHQUFFLEdBQUcsVUFBVSxXQUFXLE9BQU8sVUFBVSxJQUFJO0FBQzNFO0FBR0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO0FBQ2xCLFFBQU0sU0FBUyxhQUFhLFNBQVM7QUFDbkMsNEJBQXdCLFVBQVUsUUFBUSxDQUFDO0FBQzNDLFFBQUksS0FBS3JHLGFBQVcsT0FBTyxJQUFJLFVBQVVrRyxXQUFTLE9BQU87QUFDekQsUUFBSSxPQUFPUixhQUFXLFdBQVcsQ0FBQztBQUNsQ1UsWUFBTSxFQUFFLFdBQVcsV0FBWTtBQUM3QmIsY0FBTSxJQUFJLFFBQVcsSUFBSTtBQUFBLElBQy9CO0FBQ0ksVUFBTSxPQUFPO0FBQ2IsV0FBTztBQUFBLEVBQ1g7QUFDRSxVQUFRLFNBQVMsZUFBZWMsS0FBSTtBQUNsQyxXQUFPRCxRQUFNQztBQUFBLEVBQ2pCO0FBRUUsTUFBSUwsV0FBUztBQUNYLFlBQVEsU0FBVUssS0FBSTtBQUNwQmpHLGdCQUFRLFNBQVMsT0FBT2lHLEdBQUUsQ0FBQztBQUFBLElBQ2pDO0FBQUEsRUFFQSxXQUFhLFlBQVksU0FBUyxLQUFLO0FBQ25DLFlBQVEsU0FBVUEsS0FBSTtBQUNwQixlQUFTLElBQUksT0FBT0EsR0FBRSxDQUFDO0FBQUEsSUFDN0I7QUFBQSxFQUdBLFdBQWEsa0JBQWtCLENBQUNQLFVBQVE7QUFDcEMsY0FBVSxJQUFJO0FBQ2QsV0FBTyxRQUFRO0FBQ2YsWUFBUSxNQUFNLFlBQVk7QUFDMUIsWUFBUU4sT0FBSyxLQUFLLGFBQWEsSUFBSTtBQUFBLEVBR3ZDLFdBQ0lqSCxTQUFPLG9CQUNQeUIsYUFBV3pCLFNBQU8sV0FBVyxLQUM3QixDQUFDQSxTQUFPLGlCQUNSLGFBQWEsVUFBVSxhQUFhLFdBQ3BDLENBQUNDLFFBQU0sSUFBSSxHQUNYO0FBQ0EsWUFBUTtBQUNSRCxhQUFPLGlCQUFpQixXQUFXLFVBQVUsS0FBSztBQUFBLEVBRW5ELFdBQVUsc0JBQXNCLGNBQWMsUUFBUSxHQUFHO0FBQ3hELFlBQVEsU0FBVThILEtBQUk7QUFDcEJaLGFBQUssWUFBWSxjQUFjLFFBQVEsQ0FBQyxFQUFFLHNCQUFzQixXQUFZO0FBQzFFQSxlQUFLLFlBQVksSUFBSTtBQUNyQixZQUFJWSxHQUFFO0FBQUEsTUFDZDtBQUFBLElBQ0E7QUFBQSxFQUVBLE9BQVM7QUFDTCxZQUFRLFNBQVVBLEtBQUk7QUFDcEIsaUJBQVcsT0FBT0EsR0FBRSxHQUFHLENBQUM7QUFBQSxJQUM5QjtBQUFBLEVBQ0c7QUFDSDtBQUVBLElBQUFDLFNBQWlCO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFDRjtBQ25IQSxJQUFJbkcsY0FBWXpCO0FBQ2hCLElBQUlILFdBQVNjO0FBRWIsSUFBQSxvQkFBaUIsb0JBQW9CLEtBQUtjLFdBQVMsS0FBSzVCLFNBQU8sV0FBVztBQ0gxRSxJQUFJLFlBQVlHO0FBRWhCLElBQUEsc0JBQWlCLHFCQUFxQixLQUFLLFNBQVM7QUNGcEQsSUFBSUgsV0FBU0c7QUFDYixJQUFJOEcsU0FBT25HO0FBQ1gsSUFBSVAsNkJBQTJCUywrQkFBMkQ7QUFDMUYsSUFBSSxZQUFZbUIsT0FBNkI7QUFDN0MsSUFBSSxTQUFTZTtBQUNiLElBQUksZ0JBQWdCQztBQUNwQixJQUFJLGtCQUFrQlU7QUFDdEIsSUFBSTRELFlBQVUxRDtBQUVkLElBQUksbUJBQW1CL0QsU0FBTyxvQkFBb0JBLFNBQU87QUFDekQsSUFBSXdELGFBQVd4RCxTQUFPO0FBQ3RCLElBQUk2QixZQUFVN0IsU0FBTztBQUNyQixJQUFJZ0ksWUFBVWhJLFNBQU87QUFFckIsSUFBSSwyQkFBMkJPLDJCQUF5QlAsVUFBUSxnQkFBZ0I7QUFDaEYsSUFBSSxpQkFBaUIsNEJBQTRCLHlCQUF5QjtBQUUxRSxJQUFJLE9BQU8sTUFBTSxNQUFNaUksVUFBUSxRQUFRQyxRQUFNLFNBQVM7QUFHdEQsSUFBSSxDQUFDLGdCQUFnQjtBQUNuQixVQUFRLFdBQVk7QUFDbEIsUUFBSSxRQUFRO0FBQ1osUUFBSVQsY0FBWSxTQUFTNUYsVUFBUTtBQUFTLGFBQU87QUFDakQsV0FBTyxNQUFNO0FBQ1gsV0FBSyxLQUFLO0FBQ1YsYUFBTyxLQUFLO0FBQ1osVUFBSTtBQUNGO01BQ0QsU0FBUSxPQUFQO0FBQ0EsWUFBSTtBQUFNb0c7O0FBQ0wsaUJBQU87QUFDWixjQUFNO0FBQUEsTUFDUDtBQUFBLElBQ1A7QUFBTSxXQUFPO0FBQ1QsUUFBSTtBQUFRLGFBQU87RUFDdkI7QUFJRSxNQUFJLENBQUMsVUFBVSxDQUFDUixhQUFXLENBQUMsbUJBQW1CLG9CQUFvQmpFLFlBQVU7QUFDM0UsYUFBUztBQUNUMEUsYUFBTzFFLFdBQVMsZUFBZSxFQUFFO0FBQ2pDLFFBQUksaUJBQWlCLEtBQUssRUFBRSxRQUFRMEUsUUFBTSxFQUFFLGVBQWUsS0FBSSxDQUFFO0FBQ2pFRCxlQUFTLFdBQVk7QUFDbkJDLGFBQUssT0FBTyxTQUFTLENBQUM7QUFBQSxJQUM1QjtBQUFBLEVBRUcsV0FBVSxDQUFDLGlCQUFpQkYsYUFBV0EsVUFBUSxTQUFTO0FBRXZELGNBQVVBLFVBQVEsUUFBUSxNQUFTO0FBRW5DLFlBQVEsY0FBY0E7QUFDdEIsV0FBT2YsT0FBSyxRQUFRLE1BQU0sT0FBTztBQUNqQ2dCLGVBQVMsV0FBWTtBQUNuQixXQUFLLEtBQUs7QUFBQSxJQUNoQjtBQUFBLEVBRUcsV0FBVVIsV0FBUztBQUNsQlEsZUFBUyxXQUFZO0FBQ25CcEcsZ0JBQVEsU0FBUyxLQUFLO0FBQUEsSUFDNUI7QUFBQSxFQU9BLE9BQVM7QUFFTCxnQkFBWW9GLE9BQUssV0FBV2pILFFBQU07QUFDbENpSSxlQUFTLFdBQVk7QUFDbkIsZ0JBQVUsS0FBSztBQUFBLElBQ3JCO0FBQUEsRUFDRztBQUNIO0FBRUEsSUFBQUUsY0FBaUIsa0JBQWtCLFNBQVUsSUFBSTtBQUMvQyxNQUFJSixRQUFPLEVBQUUsSUFBUSxNQUFNLE9BQVM7QUFDcEMsTUFBSTtBQUFNLFNBQUssT0FBT0E7QUFDdEIsTUFBSSxDQUFDLE1BQU07QUFDVCxXQUFPQTtBQUNQRTtFQUNKO0FBQUksU0FBT0Y7QUFDWDtBQ3BGQSxJQUFJL0gsV0FBU0c7QUFFYixJQUFBaUkscUJBQWlCLFNBQVUsR0FBRyxHQUFHO0FBQy9CLE1BQUlDLFdBQVVySSxTQUFPO0FBQ3JCLE1BQUlxSSxZQUFXQSxTQUFRLE9BQU87QUFDNUIsY0FBVSxVQUFVLElBQUlBLFNBQVEsTUFBTSxDQUFDLElBQUlBLFNBQVEsTUFBTSxHQUFHLENBQUM7QUFBQSxFQUM5RDtBQUNIO0lDUEFDLFlBQWlCLFNBQVVwSSxPQUFNO0FBQy9CLE1BQUk7QUFDRixXQUFPLEVBQUUsT0FBTyxPQUFPLE9BQU9BLE1BQU0sRUFBQTtBQUFBLEVBQ3JDLFNBQVEsT0FBUDtBQUNBLFdBQU8sRUFBRSxPQUFPLE1BQU0sT0FBTyxNQUFLO0FBQUEsRUFDbkM7QUFDSDtBQ05BLElBQUlxSSxVQUFRLFdBQVk7QUFDdEIsT0FBSyxPQUFPO0FBQ1osT0FBSyxPQUFPO0FBQ2Q7QUFFQUEsUUFBTSxZQUFZO0FBQUEsRUFDaEIsS0FBSyxTQUFVLE1BQU07QUFDbkIsUUFBSSxRQUFRLEVBQUUsTUFBWSxNQUFNLEtBQUk7QUFDcEMsUUFBSSxLQUFLO0FBQU0sV0FBSyxLQUFLLE9BQU87QUFBQTtBQUMzQixXQUFLLE9BQU87QUFDakIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBQ0QsS0FBSyxXQUFZO0FBQ2YsUUFBSSxRQUFRLEtBQUs7QUFDakIsUUFBSSxPQUFPO0FBQ1QsV0FBSyxPQUFPLE1BQU07QUFDbEIsVUFBSSxLQUFLLFNBQVM7QUFBTyxhQUFLLE9BQU87QUFDckMsYUFBTyxNQUFNO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDSDtBQUVBLElBQUEsUUFBaUJBO0FDdEJqQixJQUFJdkksV0FBU0c7SUFFYiwyQkFBaUJILFNBQU87QUNEeEIsSUFBQSxlQUFpQixPQUFPLFFBQVEsWUFBWSxRQUFRLE9BQU8sS0FBSyxXQUFXO0FDRDNFLElBQUl3SSxZQUFVckk7QUFDZCxJQUFJc0gsWUFBVTNHO0FBRWQsSUFBQSxrQkFBaUIsQ0FBQzBILGFBQVcsQ0FBQ2YsYUFDekIsT0FBTyxVQUFVLFlBQ2pCLE9BQU8sWUFBWTtBQ0x4QixJQUFJekgsV0FBU0c7QUFDYixJQUFJc0ksNkJBQTJCM0g7QUFDL0IsSUFBSVcsZUFBYVQ7QUFDakIsSUFBSSxXQUFXbUI7QUFDZixJQUFJLGdCQUFnQmU7QUFDcEIsSUFBSUcsb0JBQWtCRjtBQUN0QixJQUFJLGFBQWFVO0FBQ2pCLElBQUksVUFBVUU7QUFFZCxJQUFJLGFBQWF1RDtBQUVZbUIsOEJBQTRCQSwyQkFBeUI7QUFDbEYsSUFBSWhDLFlBQVVwRCxrQkFBZ0IsU0FBUztBQUN2QyxJQUFJLGNBQWM7QUFDbEIsSUFBSXFGLG1DQUFpQ2pILGFBQVd6QixTQUFPLHFCQUFxQjtBQUU1RSxJQUFJMkksK0JBQTZCLFNBQVMsV0FBVyxXQUFZO0FBQy9ELE1BQUksNkJBQTZCLGNBQWNGLDBCQUF3QjtBQUN2RSxNQUFJLHlCQUF5QiwrQkFBK0IsT0FBT0EsMEJBQXdCO0FBSTNGLE1BQUksQ0FBQywwQkFBMEIsZUFBZTtBQUFJLFdBQU87QUFNekQsTUFBSSxDQUFDLGNBQWMsYUFBYSxNQUFNLENBQUMsY0FBYyxLQUFLLDBCQUEwQixHQUFHO0FBRXJGLFFBQUlHLFdBQVUsSUFBSUgsMkJBQXlCLFNBQVVJLFVBQVM7QUFBRSxNQUFBQSxTQUFRLENBQUM7QUFBQSxJQUFFLENBQUU7QUFDN0UsUUFBSSxjQUFjLFNBQVUzSSxPQUFNO0FBQ2hDLE1BQUFBLE1BQUssV0FBWTtBQUFBLE1BQUEsR0FBaUIsV0FBWTtBQUFBLE1BQUEsQ0FBZTtBQUFBLElBQ25FO0FBQ0ksUUFBSSxjQUFjMEksU0FBUSxjQUFjO0FBQ3hDLGdCQUFZbkMsYUFBVztBQUN2QixrQkFBY21DLFNBQVEsS0FBSyxXQUFZO0FBQUEsSUFBZSxDQUFBLGFBQWE7QUFDbkUsUUFBSSxDQUFDO0FBQWEsYUFBTztBQUFBLEVBRTdCO0FBQUksU0FBTyxDQUFDLDJCQUEyQixjQUFjLFlBQVksQ0FBQ0Y7QUFDbEUsQ0FBQztBQUVELElBQUEsOEJBQWlCO0FBQUEsRUFDZixhQUFhQztBQUFBQSxFQUNiLGlCQUFpQkQ7QUFBQUEsRUFDakI7QUFDRjs7QUM3Q0EsSUFBSW5HLGNBQVlwQztBQUVoQixJQUFJZ0IsZUFBYTtBQUVqQixJQUFJLG9CQUFvQixTQUFVLEdBQUc7QUFDbkMsTUFBSTBILFVBQVNDO0FBQ2IsT0FBSyxVQUFVLElBQUksRUFBRSxTQUFVLFdBQVcsVUFBVTtBQUNsRCxRQUFJRCxhQUFZLFVBQWFDLFlBQVc7QUFBVyxZQUFNM0gsYUFBVyx5QkFBeUI7QUFDN0YsSUFBQTBILFdBQVU7QUFDVixJQUFBQyxVQUFTO0FBQUEsRUFDYixDQUFHO0FBQ0QsT0FBSyxVQUFVdkcsWUFBVXNHLFFBQU87QUFDaEMsT0FBSyxTQUFTdEcsWUFBVXVHLE9BQU07QUFDaEM7QUFJZ0JDLHVCQUFBLElBQUcsU0FBVSxHQUFHO0FBQzlCLFNBQU8sSUFBSSxrQkFBa0IsQ0FBQztBQUNoQztBQ25CQSxJQUFJQyxNQUFJN0k7QUFFUixJQUFJc0gsWUFBVXpHO0FBQ2QsSUFBSWhCLFdBQVNtQztBQUNiLElBQUk3QixTQUFPNEM7QUFDWCxJQUFJK0Isa0JBQWdCOUI7QUFDcEIsSUFBSW1ELG1CQUFpQnpDO0FBQ3JCLElBQUkyQyxtQkFBaUJ6QztBQUNyQixJQUFJLGFBQWFzRDtBQUNqQixJQUFJOUUsY0FBWStFO0FBQ2hCLElBQUk3RixlQUFhK0Y7QUFDakIsSUFBSTlGLGFBQVdnRztBQUNmLElBQUksYUFBYXVCO0FBQ2pCLElBQUlsQyx1QkFBcUJtQztBQUN6QixJQUFJLE9BQU9DLE9BQTZCO0FBQ3hDLElBQUksWUFBWUM7QUFDaEIsSUFBSSxtQkFBbUJDO0FBQ3ZCLElBQUlmLFlBQVVnQjtBQUNkLElBQUksUUFBUUM7QUFDWixJQUFJMUUsd0JBQXNCMkU7QUFDMUIsSUFBSWYsNkJBQTJCZ0I7QUFDL0IsSUFBSSw4QkFBOEJDO0FBQ2xDLElBQUlDLCtCQUE2QkM7QUFFakMsSUFBSSxVQUFVO0FBQ2QsSUFBSWpCLCtCQUE2Qiw0QkFBNEI7QUFDN0QsSUFBSSxpQ0FBaUMsNEJBQTRCO0FBQ2pFLElBQUksNkJBQTZCLDRCQUE0QjtBQUM3RCxJQUFJLDBCQUEwQjlELHNCQUFvQixVQUFVLE9BQU87QUFDbkUsSUFBSWdGLHFCQUFtQmhGLHNCQUFvQjtBQUMzQyxJQUFJaUYsMkJBQXlCckIsOEJBQTRCQSwyQkFBeUI7QUFDbEYsSUFBSSxxQkFBcUJBO0FBQ3pCLElBQUksbUJBQW1CcUI7QUFDdkIsSUFBSXBGLGNBQVkxRSxTQUFPO0FBQ3ZCLElBQUl3RCxhQUFXeEQsU0FBTztBQUN0QixJQUFJNkIsWUFBVTdCLFNBQU87QUFDckIsSUFBSStJLHlCQUF1QlksNkJBQTJCO0FBQ3RELElBQUksOEJBQThCWjtBQUVsQyxJQUFJLGlCQUFpQixDQUFDLEVBQUV2RixjQUFZQSxXQUFTLGVBQWV4RCxTQUFPO0FBQ25FLElBQUksc0JBQXNCO0FBQzFCLElBQUksb0JBQW9CO0FBQ3hCLElBQUksVUFBVTtBQUNkLElBQUksWUFBWTtBQUNoQixJQUFJLFdBQVc7QUFDZixJQUFJLFVBQVU7QUFDZCxJQUFJLFlBQVk7QUFFaEIsSUFBSSxVQUFVLHNCQUFzQixnQkFBZ0I7QUFHcEQsSUFBSSxhQUFhLFNBQVUsSUFBSTtBQUM3QixNQUFJK0o7QUFDSixTQUFPckksV0FBUyxFQUFFLEtBQUtELGFBQVdzSSxRQUFPLEdBQUcsSUFBSSxJQUFJQSxRQUFPO0FBQzdEO0FBRUEsSUFBSSxlQUFlLFNBQVUsVUFBVSxPQUFPO0FBQzVDLE1BQUksUUFBUSxNQUFNO0FBQ2xCLE1BQUksS0FBSyxNQUFNLFNBQVM7QUFDeEIsTUFBSSxVQUFVLEtBQUssU0FBUyxLQUFLLFNBQVM7QUFDMUMsTUFBSWxCLFdBQVUsU0FBUztBQUN2QixNQUFJQyxVQUFTLFNBQVM7QUFDdEIsTUFBSSxTQUFTLFNBQVM7QUFDdEIsTUFBSSxRQUFRaUIsT0FBTTtBQUNsQixNQUFJO0FBQ0YsUUFBSSxTQUFTO0FBQ1gsVUFBSSxDQUFDLElBQUk7QUFDUCxZQUFJLE1BQU0sY0FBYztBQUFXLDRCQUFrQixLQUFLO0FBQzFELGNBQU0sWUFBWTtBQUFBLE1BQ25CO0FBQ0QsVUFBSSxZQUFZO0FBQU0saUJBQVM7QUFBQSxXQUMxQjtBQUNILFlBQUk7QUFBUSxpQkFBTztBQUNuQixpQkFBUyxRQUFRLEtBQUs7QUFDdEIsWUFBSSxRQUFRO0FBQ1YsaUJBQU8sS0FBSTtBQUNYLG1CQUFTO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFDRCxVQUFJLFdBQVcsU0FBUyxTQUFTO0FBQy9CLFFBQUFqQixRQUFPcEUsWUFBVSxxQkFBcUIsQ0FBQztBQUFBLE1BQ3hDLFdBQVVxRixRQUFPLFdBQVcsTUFBTSxHQUFHO0FBQ3BDekosZUFBS3lKLE9BQU0sUUFBUWxCLFVBQVNDLE9BQU07QUFBQSxNQUMxQztBQUFhLFFBQUFELFNBQVEsTUFBTTtBQUFBLElBQzNCO0FBQVcsTUFBQUMsUUFBTyxLQUFLO0FBQUEsRUFDcEIsU0FBUSxPQUFQO0FBQ0EsUUFBSSxVQUFVLENBQUM7QUFBUSxhQUFPLEtBQUk7QUFDbEMsSUFBQUEsUUFBTyxLQUFLO0FBQUEsRUFDYjtBQUNIO0FBRUEsSUFBSSxTQUFTLFNBQVUsT0FBTyxVQUFVO0FBQ3RDLE1BQUksTUFBTTtBQUFVO0FBQ3BCLFFBQU0sV0FBVztBQUNqQixZQUFVLFdBQVk7QUFDcEIsUUFBSSxZQUFZLE1BQU07QUFDdEIsUUFBSTtBQUNKLFdBQU8sV0FBVyxVQUFVLE9BQU87QUFDakMsbUJBQWEsVUFBVSxLQUFLO0FBQUEsSUFDN0I7QUFDRCxVQUFNLFdBQVc7QUFDakIsUUFBSSxZQUFZLENBQUMsTUFBTTtBQUFXLGtCQUFZLEtBQUs7QUFBQSxFQUN2RCxDQUFHO0FBQ0g7QUFFQSxJQUFJLGdCQUFnQixTQUFVLE1BQU1GLFVBQVMsUUFBUTtBQUNuRCxNQUFJLE9BQU87QUFDWCxNQUFJLGdCQUFnQjtBQUNsQixZQUFRcEYsV0FBUyxZQUFZLE9BQU87QUFDcEMsVUFBTSxVQUFVb0Y7QUFDaEIsVUFBTSxTQUFTO0FBQ2YsVUFBTSxVQUFVLE1BQU0sT0FBTyxJQUFJO0FBQ2pDNUksYUFBTyxjQUFjLEtBQUs7QUFBQSxFQUM5QjtBQUFTLFlBQVEsRUFBRSxTQUFTNEksVUFBUyxPQUFjO0FBQ2pELE1BQUksQ0FBQyxtQ0FBbUMsVUFBVTVJLFNBQU8sT0FBTztBQUFRLFlBQVEsS0FBSztBQUFBLFdBQzVFLFNBQVM7QUFBcUIscUJBQWlCLCtCQUErQixNQUFNO0FBQy9GO0FBRUEsSUFBSSxjQUFjLFNBQVUsT0FBTztBQUNqQ00sU0FBSyxNQUFNTixVQUFRLFdBQVk7QUFDN0IsUUFBSTRJLFdBQVUsTUFBTTtBQUNwQixRQUFJLFFBQVEsTUFBTTtBQUNsQixRQUFJLGVBQWUsWUFBWSxLQUFLO0FBQ3BDLFFBQUk7QUFDSixRQUFJLGNBQWM7QUFDaEIsZUFBU04sVUFBUSxXQUFZO0FBQzNCLFlBQUliLFdBQVM7QUFDWDVGLG9CQUFRLEtBQUssc0JBQXNCLE9BQU8rRyxRQUFPO0FBQUEsUUFDbEQ7QUFBTSx3QkFBYyxxQkFBcUJBLFVBQVMsS0FBSztBQUFBLE1BQ2hFLENBQU87QUFFRCxZQUFNLFlBQVluQixhQUFXLFlBQVksS0FBSyxJQUFJLFlBQVk7QUFDOUQsVUFBSSxPQUFPO0FBQU8sY0FBTSxPQUFPO0FBQUEsSUFDaEM7QUFBQSxFQUNMLENBQUc7QUFDSDtBQUVBLElBQUksY0FBYyxTQUFVLE9BQU87QUFDakMsU0FBTyxNQUFNLGNBQWMsV0FBVyxDQUFDLE1BQU07QUFDL0M7QUFFQSxJQUFJLG9CQUFvQixTQUFVLE9BQU87QUFDdkNuSCxTQUFLLE1BQU1OLFVBQVEsV0FBWTtBQUM3QixRQUFJNEksV0FBVSxNQUFNO0FBQ3BCLFFBQUluQixXQUFTO0FBQ1g1RixnQkFBUSxLQUFLLG9CQUFvQitHLFFBQU87QUFBQSxJQUN6QztBQUFNLG9CQUFjLG1CQUFtQkEsVUFBUyxNQUFNLEtBQUs7QUFBQSxFQUNoRSxDQUFHO0FBQ0g7QUFFQSxJQUFJM0IsU0FBTyxTQUFVLElBQUksT0FBTyxRQUFRO0FBQ3RDLFNBQU8sU0FBVSxPQUFPO0FBQ3RCLE9BQUcsT0FBTyxPQUFPLE1BQU07QUFBQSxFQUMzQjtBQUNBO0FBRUEsSUFBSSxpQkFBaUIsU0FBVSxPQUFPLE9BQU8sUUFBUTtBQUNuRCxNQUFJLE1BQU07QUFBTTtBQUNoQixRQUFNLE9BQU87QUFDYixNQUFJO0FBQVEsWUFBUTtBQUNwQixRQUFNLFFBQVE7QUFDZCxRQUFNLFFBQVE7QUFDZCxTQUFPLE9BQU8sSUFBSTtBQUNwQjtBQUVBLElBQUksa0JBQWtCLFNBQVUsT0FBTyxPQUFPLFFBQVE7QUFDcEQsTUFBSSxNQUFNO0FBQU07QUFDaEIsUUFBTSxPQUFPO0FBQ2IsTUFBSTtBQUFRLFlBQVE7QUFDcEIsTUFBSTtBQUNGLFFBQUksTUFBTSxXQUFXO0FBQU8sWUFBTXZDLFlBQVUsa0NBQWtDO0FBQzlFLFFBQUlxRixRQUFPLFdBQVcsS0FBSztBQUMzQixRQUFJQSxPQUFNO0FBQ1IsZ0JBQVUsV0FBWTtBQUNwQixZQUFJLFVBQVUsRUFBRSxNQUFNO0FBQ3RCLFlBQUk7QUFDRnpKO0FBQUFBLFlBQUt5SjtBQUFBLFlBQU07QUFBQSxZQUNUOUMsT0FBSyxpQkFBaUIsU0FBUyxLQUFLO0FBQUEsWUFDcENBLE9BQUssZ0JBQWdCLFNBQVMsS0FBSztBQUFBLFVBQy9DO0FBQUEsUUFDUyxTQUFRLE9BQVA7QUFDQSx5QkFBZSxTQUFTLE9BQU8sS0FBSztBQUFBLFFBQ3JDO0FBQUEsTUFDVCxDQUFPO0FBQUEsSUFDUCxPQUFXO0FBQ0wsWUFBTSxRQUFRO0FBQ2QsWUFBTSxRQUFRO0FBQ2QsYUFBTyxPQUFPLEtBQUs7QUFBQSxJQUNwQjtBQUFBLEVBQ0YsU0FBUSxPQUFQO0FBQ0EsbUJBQWUsRUFBRSxNQUFNLE1BQU8sR0FBRSxPQUFPLEtBQUs7QUFBQSxFQUM3QztBQUNIO0FBR0EsSUFBSTBCLDhCQUE0QjtBQUU5Qix1QkFBcUIsU0FBU1gsU0FBUSxVQUFVO0FBQzlDLGVBQVcsTUFBTSxnQkFBZ0I7QUFDakN6RixnQkFBVSxRQUFRO0FBQ2xCakMsV0FBSyxVQUFVLElBQUk7QUFDbkIsUUFBSSxRQUFRLHdCQUF3QixJQUFJO0FBQ3hDLFFBQUk7QUFDRixlQUFTMkcsT0FBSyxpQkFBaUIsS0FBSyxHQUFHQSxPQUFLLGdCQUFnQixLQUFLLENBQUM7QUFBQSxJQUNuRSxTQUFRLE9BQVA7QUFDQSxxQkFBZSxPQUFPLEtBQUs7QUFBQSxJQUM1QjtBQUFBLEVBQ0w7QUFFRSxxQkFBbUIsbUJBQW1CO0FBR3RDLGFBQVcsU0FBU2UsU0FBUSxVQUFVO0FBQ3BDNkIsdUJBQWlCLE1BQU07QUFBQSxNQUNyQixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixXQUFXLElBQUksTUFBTztBQUFBLE1BQ3RCLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxJQUNiLENBQUs7QUFBQSxFQUNMO0FBSUUsV0FBUyxZQUFZNUUsZ0JBQWMsa0JBQWtCLFFBQVEsU0FBUzhFLE1BQUssYUFBYSxZQUFZO0FBQ2xHLFFBQUksUUFBUSx3QkFBd0IsSUFBSTtBQUN4QyxRQUFJLFdBQVdoQix1QkFBcUJoQyxxQkFBbUIsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRixVQUFNLFNBQVM7QUFDZixhQUFTLEtBQUt0RixhQUFXLFdBQVcsSUFBSSxjQUFjO0FBQ3RELGFBQVMsT0FBT0EsYUFBVyxVQUFVLEtBQUs7QUFDMUMsYUFBUyxTQUFTZ0csWUFBVTVGLFVBQVEsU0FBUztBQUM3QyxRQUFJLE1BQU0sU0FBUztBQUFTLFlBQU0sVUFBVSxJQUFJLFFBQVE7QUFBQTtBQUNuRCxnQkFBVSxXQUFZO0FBQ3pCLHFCQUFhLFVBQVUsS0FBSztBQUFBLE1BQ2xDLENBQUs7QUFDRCxXQUFPLFNBQVM7QUFBQSxFQUNwQixDQUFHO0FBRUQseUJBQXVCLFdBQVk7QUFDakMsUUFBSStHLFdBQVUsSUFBSTtBQUNsQixRQUFJLFFBQVEsd0JBQXdCQSxRQUFPO0FBQzNDLFNBQUssVUFBVUE7QUFDZixTQUFLLFVBQVUzQixPQUFLLGlCQUFpQixLQUFLO0FBQzFDLFNBQUssU0FBU0EsT0FBSyxnQkFBZ0IsS0FBSztBQUFBLEVBQzVDO0FBRUUwQywrQkFBMkIsSUFBSVoseUJBQXVCLFNBQVUsR0FBRztBQUNqRSxXQUFPLE1BQU0sc0JBQXNCLE1BQU0saUJBQ3JDLElBQUkscUJBQXFCLENBQUMsSUFDMUIsNEJBQTRCLENBQUM7QUFBQSxFQUNyQztBQUVFLE1BQWdCdEgsYUFBV2dILDBCQUF3QixLQUFLcUIsNkJBQTJCLE9BQU8sV0FBVztBQUNuRyxpQkFBYUEseUJBQXVCO0FBRXBDLFFBQUksQ0FBQyw0QkFBNEI7QUFFL0I3RSxzQkFBYzZFLDBCQUF3QixRQUFRLFNBQVNDLE1BQUssYUFBYSxZQUFZO0FBQ25GLFlBQUksT0FBTztBQUNYLGVBQU8sSUFBSSxtQkFBbUIsU0FBVWxCLFVBQVNDLFNBQVE7QUFDdkR4SSxpQkFBSyxZQUFZLE1BQU11SSxVQUFTQyxPQUFNO0FBQUEsUUFDdkMsQ0FBQSxFQUFFLEtBQUssYUFBYSxVQUFVO0FBQUEsTUFFdkMsR0FBUyxFQUFFLFFBQVEsS0FBSSxDQUFFO0FBQUEsSUFDcEI7QUFHRCxRQUFJO0FBQ0YsYUFBT2dCLHlCQUF1QjtBQUFBLElBQ3BDLFNBQWEsT0FBUDtBQUFBLElBQTZCO0FBRy9CLFFBQUl4RCxrQkFBZ0I7QUFDbEJBLHVCQUFld0QsMEJBQXdCLGdCQUFnQjtBQUFBLElBQ3hEO0FBQUEsRUFDRjtBQUNIO0FBRUFkLElBQUUsRUFBRSxRQUFRLE1BQU0sYUFBYSxNQUFNLE1BQU0sTUFBTSxRQUFRTCxnQ0FBOEI7QUFBQSxFQUNyRixTQUFTO0FBQ1gsQ0FBQztBQUVEbkMsaUJBQWUsb0JBQW9CLFNBQVMsS0FBVztBQUN2RCxXQUFXLE9BQU87QUMvUmxCLElBQUEsWUFBaUIsQ0FBRTtBQ0FuQixJQUFJbkQsb0JBQWtCbEQ7QUFDdEIsSUFBSTZKLGNBQVlsSjtBQUVoQixJQUFJbUosYUFBVzVHLGtCQUFnQixVQUFVO0FBQ3pDLElBQUk2RyxtQkFBaUIsTUFBTTtJQUczQkMsMEJBQWlCLFNBQVUsSUFBSTtBQUM3QixTQUFPLE9BQU8sV0FBY0gsWUFBVSxVQUFVLE1BQU1FLGlCQUFlRCxnQkFBYztBQUNyRjtBQ1RBLElBQUlsSixZQUFVWjtBQUNkLElBQUlxQyxjQUFZMUI7QUFDaEIsSUFBSUksc0JBQW9CRjtBQUN4QixJQUFJZ0osY0FBWTdIO0FBQ2hCLElBQUlrQixvQkFBa0JIO0FBRXRCLElBQUkrRyxhQUFXNUcsa0JBQWdCLFVBQVU7SUFFekMrRyxzQkFBaUIsU0FBVSxJQUFJO0FBQzdCLE1BQUksQ0FBQ2xKLG9CQUFrQixFQUFFO0FBQUcsV0FBT3NCLFlBQVUsSUFBSXlILFVBQVEsS0FDcER6SCxZQUFVLElBQUksWUFBWSxLQUMxQndILFlBQVVqSixVQUFRLEVBQUU7QUFDM0I7QUNaQSxJQUFJVCxTQUFPSDtBQUNYLElBQUlvQyxjQUFZekI7QUFDaEIsSUFBSW1ELGFBQVdqRDtBQUNmLElBQUlzQixnQkFBY0g7QUFDbEIsSUFBSWlJLHNCQUFvQmxIO0FBRXhCLElBQUkvQixlQUFhO0FBRWpCLElBQUFrSixnQkFBaUIsU0FBVSxVQUFVLGVBQWU7QUFDbEQsTUFBSSxpQkFBaUIsVUFBVSxTQUFTLElBQUlELG9CQUFrQixRQUFRLElBQUk7QUFDMUUsTUFBSTdILFlBQVUsY0FBYztBQUFHLFdBQU8wQixXQUFTM0QsT0FBSyxnQkFBZ0IsUUFBUSxDQUFDO0FBQzdFLFFBQU1hLGFBQVdtQixjQUFZLFFBQVEsSUFBSSxrQkFBa0I7QUFDN0Q7QUNaQSxJQUFJaEMsU0FBT0g7QUFDWCxJQUFJOEQsYUFBV25EO0FBQ2YsSUFBSTBCLGNBQVl4QjtBQUVoQixJQUFBc0osa0JBQWlCLFNBQVUsVUFBVSxNQUFNLE9BQU87QUFDaEQsTUFBSSxhQUFhO0FBQ2pCckcsYUFBUyxRQUFRO0FBQ2pCLE1BQUk7QUFDRixrQkFBY3pCLFlBQVUsVUFBVSxRQUFRO0FBQzFDLFFBQUksQ0FBQyxhQUFhO0FBQ2hCLFVBQUksU0FBUztBQUFTLGNBQU07QUFDNUIsYUFBTztBQUFBLElBQ1I7QUFDRCxrQkFBY2xDLE9BQUssYUFBYSxRQUFRO0FBQUEsRUFDekMsU0FBUSxPQUFQO0FBQ0EsaUJBQWE7QUFDYixrQkFBYztBQUFBLEVBQ2Y7QUFDRCxNQUFJLFNBQVM7QUFBUyxVQUFNO0FBQzVCLE1BQUk7QUFBWSxVQUFNO0FBQ3RCMkQsYUFBUyxXQUFXO0FBQ3BCLFNBQU87QUFDVDtBQ3RCQSxJQUFJLE9BQU85RDtBQUNYLElBQUlHLFNBQU9RO0FBQ1gsSUFBSW1ELGFBQVdqRDtBQUNmLElBQUksY0FBY21CO0FBQ2xCLElBQUksd0JBQXdCZTtBQUM1QixJQUFJd0Msc0JBQW9CdkM7QUFDeEIsSUFBSWxCLGtCQUFnQjRCO0FBQ3BCLElBQUksY0FBY0U7QUFDbEIsSUFBSSxvQkFBb0JzRDtBQUN4QixJQUFJLGdCQUFnQkM7QUFFcEIsSUFBSW5HLGVBQWE7QUFFakIsSUFBSSxTQUFTLFNBQVUsU0FBUyxRQUFRO0FBQ3RDLE9BQUssVUFBVTtBQUNmLE9BQUssU0FBUztBQUNoQjtBQUVBLElBQUksa0JBQWtCLE9BQU87QUFFN0IsSUFBQW9KLFlBQWlCLFNBQVUsVUFBVSxpQkFBaUIsU0FBUztBQUM3RCxNQUFJLE9BQU8sV0FBVyxRQUFRO0FBQzlCLE1BQUksYUFBYSxDQUFDLEVBQUUsV0FBVyxRQUFRO0FBQ3ZDLE1BQUksWUFBWSxDQUFDLEVBQUUsV0FBVyxRQUFRO0FBQ3RDLE1BQUksY0FBYyxDQUFDLEVBQUUsV0FBVyxRQUFRO0FBQ3hDLE1BQUksY0FBYyxDQUFDLEVBQUUsV0FBVyxRQUFRO0FBQ3hDLE1BQUksS0FBSyxLQUFLLGlCQUFpQixJQUFJO0FBQ25DLE1BQUksVUFBVSxRQUFRL0UsUUFBTyxRQUFRLFFBQVEsTUFBTTtBQUVuRCxNQUFJLE9BQU8sU0FBVSxXQUFXO0FBQzlCLFFBQUk7QUFBVSxvQkFBYyxVQUFVLFVBQVUsU0FBUztBQUN6RCxXQUFPLElBQUksT0FBTyxNQUFNLFNBQVM7QUFBQSxFQUNyQztBQUVFLE1BQUksU0FBUyxTQUFVLE9BQU87QUFDNUIsUUFBSSxZQUFZO0FBQ2R2QixpQkFBUyxLQUFLO0FBQ2QsYUFBTyxjQUFjLEdBQUcsTUFBTSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxFQUFFO0FBQUEsSUFDL0U7QUFBTSxXQUFPLGNBQWMsR0FBRyxPQUFPLElBQUksSUFBSSxHQUFHLEtBQUs7QUFBQSxFQUNyRDtBQUVFLE1BQUksV0FBVztBQUNiLGVBQVcsU0FBUztBQUFBLEVBQ3JCLFdBQVUsYUFBYTtBQUN0QixlQUFXO0FBQUEsRUFDZixPQUFTO0FBQ0wsYUFBUyxrQkFBa0IsUUFBUTtBQUNuQyxRQUFJLENBQUM7QUFBUSxZQUFNOUMsYUFBVyxZQUFZLFFBQVEsSUFBSSxrQkFBa0I7QUFFeEUsUUFBSSxzQkFBc0IsTUFBTSxHQUFHO0FBQ2pDLFdBQUtxRSxTQUFRLEdBQUcsU0FBU0Usb0JBQWtCLFFBQVEsR0FBRyxTQUFTRixRQUFPQSxVQUFTO0FBQzdFLGlCQUFTLE9BQU8sU0FBU0EsT0FBTTtBQUMvQixZQUFJLFVBQVV2RCxnQkFBYyxpQkFBaUIsTUFBTTtBQUFHLGlCQUFPO0FBQUEsTUFDckU7QUFBUSxhQUFPLElBQUksT0FBTyxLQUFLO0FBQUEsSUFDMUI7QUFDRCxlQUFXLFlBQVksVUFBVSxNQUFNO0FBQUEsRUFDeEM7QUFFRCxTQUFPLFlBQVksU0FBUyxPQUFPLFNBQVM7QUFDNUMsU0FBTyxFQUFFLE9BQU8zQixPQUFLLE1BQU0sUUFBUSxHQUFHLE1BQU07QUFDMUMsUUFBSTtBQUNGLGVBQVMsT0FBTyxLQUFLLEtBQUs7QUFBQSxJQUMzQixTQUFRLE9BQVA7QUFDQSxvQkFBYyxVQUFVLFNBQVMsS0FBSztBQUFBLElBQ3ZDO0FBQ0QsUUFBSSxPQUFPLFVBQVUsWUFBWSxVQUFVMkIsZ0JBQWMsaUJBQWlCLE1BQU07QUFBRyxhQUFPO0FBQUEsRUFDOUY7QUFBSSxTQUFPLElBQUksT0FBTyxLQUFLO0FBQzNCO0FDbkVBLElBQUlvQixvQkFBa0JsRDtBQUV0QixJQUFJOEosYUFBVzVHLGtCQUFnQixVQUFVO0FBQ3pDLElBQUksZUFBZTtBQUVuQixJQUFJO0FBQ0YsTUFBSSxTQUFTO0FBQ2IsTUFBSSxxQkFBcUI7QUFBQSxJQUN2QixNQUFNLFdBQVk7QUFDaEIsYUFBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVE7QUFBQSxJQUMxQjtBQUFBLElBQ0QsVUFBVSxXQUFZO0FBQ3BCLHFCQUFlO0FBQUEsSUFDaEI7QUFBQSxFQUNMO0FBQ0UscUJBQW1CNEcsY0FBWSxXQUFZO0FBQ3pDLFdBQU87QUFBQSxFQUNYO0FBRUUsUUFBTSxLQUFLLG9CQUFvQixXQUFZO0FBQUUsVUFBTTtBQUFBLEVBQUUsQ0FBRTtBQUN6RCxTQUFTLE9BQVA7QUFBNkI7QUFFL0IsSUFBQU8sZ0NBQWlCLFNBQVV0SyxPQUFNLGNBQWM7QUFDN0MsTUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBQWMsV0FBTztBQUMzQyxNQUFJLG9CQUFvQjtBQUN4QixNQUFJO0FBQ0YsUUFBSSxTQUFTLENBQUE7QUFDYixXQUFPK0osY0FBWSxXQUFZO0FBQzdCLGFBQU87QUFBQSxRQUNMLE1BQU0sV0FBWTtBQUNoQixpQkFBTyxFQUFFLE1BQU0sb0JBQW9CO1FBQ3BDO0FBQUEsTUFDVDtBQUFBLElBQ0E7QUFDSSxJQUFBL0osTUFBSyxNQUFNO0FBQUEsRUFDZixTQUFXLE9BQVA7QUFBQSxFQUE2QjtBQUMvQixTQUFPO0FBQ1Q7QUNyQ0EsSUFBSXVJLDZCQUEyQnRJO0FBQy9CLElBQUksOEJBQThCVztBQUNsQyxJQUFJNkgsK0JBQTZCM0gsNEJBQXNEO0lBRXZGLG1DQUFpQjJILGdDQUE4QixDQUFDLDRCQUE0QixTQUFVLFVBQVU7QUFDOUZGLDZCQUF5QixJQUFJLFFBQVEsRUFBRSxLQUFLLFFBQVcsV0FBWTtBQUFBLEVBQUEsQ0FBZTtBQUNwRixDQUFDO0FDTEQsSUFBSU8sTUFBSTdJO0FBQ1IsSUFBSUcsU0FBT1E7QUFDWCxJQUFJeUIsY0FBWXZCO0FBQ2hCLElBQUkySSwrQkFBNkJ4SDtBQUNqQyxJQUFJbUcsWUFBVXBGO0FBQ2QsSUFBSXFILFlBQVVwSDtBQUNkLElBQUlzSCx3Q0FBc0M1RztBQUkxQ21GLElBQUUsRUFBRSxRQUFRLFdBQVcsTUFBTSxNQUFNLFFBQVF5Qix5Q0FBdUM7QUFBQSxFQUNoRixLQUFLLFNBQVMsSUFBSSxVQUFVO0FBQzFCLFFBQUksSUFBSTtBQUNSLFFBQUksYUFBYWQsNkJBQTJCLEVBQUUsQ0FBQztBQUMvQyxRQUFJZCxXQUFVLFdBQVc7QUFDekIsUUFBSUMsVUFBUyxXQUFXO0FBQ3hCLFFBQUksU0FBU1IsVUFBUSxXQUFZO0FBQy9CLFVBQUksa0JBQWtCL0YsWUFBVSxFQUFFLE9BQU87QUFDekMsVUFBSW1JLFVBQVMsQ0FBQTtBQUNiLFVBQUlDLFdBQVU7QUFDZCxVQUFJLFlBQVk7QUFDaEJKLGdCQUFRLFVBQVUsU0FBVTNCLFVBQVM7QUFDbkMsWUFBSXBELFNBQVFtRjtBQUNaLFlBQUksZ0JBQWdCO0FBQ3BCO0FBQ0FySyxlQUFLLGlCQUFpQixHQUFHc0ksUUFBTyxFQUFFLEtBQUssU0FBVSxPQUFPO0FBQ3RELGNBQUk7QUFBZTtBQUNuQiwwQkFBZ0I7QUFDaEIsVUFBQThCLFFBQU9sRixVQUFTO0FBQ2hCLFlBQUUsYUFBYXFELFNBQVE2QixPQUFNO0FBQUEsUUFDOUIsR0FBRTVCLE9BQU07QUFBQSxNQUNqQixDQUFPO0FBQ0QsUUFBRSxhQUFhRCxTQUFRNkIsT0FBTTtBQUFBLElBQ25DLENBQUs7QUFDRCxRQUFJLE9BQU87QUFBTyxNQUFBNUIsUUFBTyxPQUFPLEtBQUs7QUFDckMsV0FBTyxXQUFXO0FBQUEsRUFDbkI7QUFDSCxDQUFDO0FDckNELElBQUlFLE1BQUk3STtBQUVSLElBQUl3SSwrQkFBNkIzSCw0QkFBc0Q7QUFDdkYsSUFBSSwyQkFBMkJtQjtBQUMvQixJQUFJUixlQUFhdUI7QUFDakIsSUFBSXpCLGVBQWEwQjtBQUNqQixJQUFJOEIsa0JBQWdCcEI7QUFFcEIsSUFBSSx5QkFBeUIsNEJBQTRCLHlCQUF5QjtBQUlsRm1GLElBQUUsRUFBRSxRQUFRLFdBQVcsT0FBTyxNQUFNLFFBQVFMLDhCQUE0QixNQUFNLFFBQVE7QUFBQSxFQUNwRixTQUFTLFNBQVUsWUFBWTtBQUM3QixXQUFPLEtBQUssS0FBSyxRQUFXLFVBQVU7QUFBQSxFQUN2QztBQUNILENBQUM7QUFHRCxJQUFnQmxILGFBQVcsd0JBQXdCLEdBQUc7QUFDcEQsTUFBSSxTQUFTRSxhQUFXLFNBQVMsRUFBRSxVQUFVO0FBQzdDLE1BQUksdUJBQXVCLGFBQWEsUUFBUTtBQUM5Q3NELG9CQUFjLHdCQUF3QixTQUFTLFFBQVEsRUFBRSxRQUFRLEtBQUksQ0FBRTtBQUFBLEVBQ3hFO0FBQ0g7QUN4QkEsSUFBSStELE1BQUk3STtBQUNSLElBQUlHLFNBQU9RO0FBQ1gsSUFBSXlCLGNBQVl2QjtBQUNoQixJQUFJMkksK0JBQTZCeEg7QUFDakMsSUFBSSxVQUFVZTtBQUNkLElBQUksVUFBVUM7QUFDZCxJQUFJLHNDQUFzQ1U7QUFJMUNtRixJQUFFLEVBQUUsUUFBUSxXQUFXLE1BQU0sTUFBTSxRQUFRLHVDQUF1QztBQUFBLEVBQ2hGLE1BQU0sU0FBUyxLQUFLLFVBQVU7QUFDNUIsUUFBSSxJQUFJO0FBQ1IsUUFBSSxhQUFhVyw2QkFBMkIsRUFBRSxDQUFDO0FBQy9DLFFBQUliLFVBQVMsV0FBVztBQUN4QixRQUFJLFNBQVMsUUFBUSxXQUFZO0FBQy9CLFVBQUksa0JBQWtCdkcsWUFBVSxFQUFFLE9BQU87QUFDekMsY0FBUSxVQUFVLFNBQVVxRyxVQUFTO0FBQ25DdEksZUFBSyxpQkFBaUIsR0FBR3NJLFFBQU8sRUFBRSxLQUFLLFdBQVcsU0FBU0UsT0FBTTtBQUFBLE1BQ3pFLENBQU87QUFBQSxJQUNQLENBQUs7QUFDRCxRQUFJLE9BQU87QUFBTyxNQUFBQSxRQUFPLE9BQU8sS0FBSztBQUNyQyxXQUFPLFdBQVc7QUFBQSxFQUNuQjtBQUNILENBQUM7QUN4QkQsSUFBSUUsTUFBSTdJO0FBQ1IsSUFBSUcsU0FBT1E7QUFDWCxJQUFJLDZCQUE2QkU7QUFDakMsSUFBSTJILCtCQUE2QnhHLDRCQUFzRDtBQUl2RjZHLElBQUUsRUFBRSxRQUFRLFdBQVcsTUFBTSxNQUFNLFFBQVFMLGdDQUE4QjtBQUFBLEVBQ3ZFLFFBQVEsU0FBUyxPQUFPLEdBQUc7QUFDekIsUUFBSSxhQUFhLDJCQUEyQixFQUFFLElBQUk7QUFDbERySSxXQUFLLFdBQVcsUUFBUSxRQUFXLENBQUM7QUFDcEMsV0FBTyxXQUFXO0FBQUEsRUFDbkI7QUFDSCxDQUFDO0FDZEQsSUFBSTJELGFBQVc5RDtBQUNmLElBQUl1QixhQUFXWjtBQUNmLElBQUksdUJBQXVCRTtBQUUzQixJQUFBNEosbUJBQWlCLFNBQVUsR0FBRyxHQUFHO0FBQy9CM0csYUFBUyxDQUFDO0FBQ1YsTUFBSXZDLFdBQVMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCO0FBQUcsV0FBTztBQUMvQyxNQUFJLG9CQUFvQixxQkFBcUIsRUFBRSxDQUFDO0FBQ2hELE1BQUltSCxXQUFVLGtCQUFrQjtBQUNoQyxFQUFBQSxTQUFRLENBQUM7QUFDVCxTQUFPLGtCQUFrQjtBQUMzQjtBQ1ZBLElBQUlHLE1BQUk3STtBQUNSLElBQUksYUFBYVc7QUFHakIsSUFBSSw2QkFBNkJvQyw0QkFBc0Q7QUFDdkYsSUFBSSxpQkFBaUJDO0FBRVcsV0FBVyxTQUFTO0FBS3BENkYsSUFBRSxFQUFFLFFBQVEsV0FBVyxNQUFNLE1BQU0sUUFBbUIsOEJBQThCO0FBQUEsRUFDbEYsU0FBUyxTQUFTLFFBQVEsR0FBRztBQUMzQixXQUFPLGVBQWdHLE1BQU0sQ0FBQztBQUFBLEVBQy9HO0FBQ0gsQ0FBQztBQ2pCRCxTQUFTLG1CQUFtQixLQUFLSCxVQUFTQyxTQUFRLE9BQU8sUUFBUSxLQUFLLEtBQUs7QUFDekUsTUFBSTtBQUNGLFFBQUksT0FBTyxJQUFJLEtBQUssR0FBRztBQUN2QixRQUFJLFFBQVEsS0FBSztBQUFBLEVBQ2xCLFNBQVEsT0FBUDtBQUNBLElBQUFBLFFBQU8sS0FBSztBQUNaO0FBQUEsRUFDRDtBQUNELE1BQUksS0FBSyxNQUFNO0FBQ2IsSUFBQUQsU0FBUSxLQUFLO0FBQUEsRUFDakIsT0FBUztBQUNMLFlBQVEsUUFBUSxLQUFLLEVBQUUsS0FBSyxPQUFPLE1BQU07QUFBQSxFQUMxQztBQUNIO0FBQ2UsU0FBUyxrQkFBa0IsSUFBSTtBQUM1QyxTQUFPLFdBQVk7QUFDakIsUUFBSWdDLFFBQU8sTUFDVCxPQUFPO0FBQ1QsV0FBTyxJQUFJLFFBQVEsU0FBVWhDLFVBQVNDLFNBQVE7QUFDNUMsVUFBSSxNQUFNLEdBQUcsTUFBTStCLE9BQU0sSUFBSTtBQUM3QixlQUFTLE1BQU0sT0FBTztBQUNwQiwyQkFBbUIsS0FBS2hDLFVBQVNDLFNBQVEsT0FBTyxRQUFRLFFBQVEsS0FBSztBQUFBLE1BQ3RFO0FBQ0QsZUFBUyxPQUFPLEtBQUs7QUFDbkIsMkJBQW1CLEtBQUtELFVBQVNDLFNBQVEsT0FBTyxRQUFRLFNBQVMsR0FBRztBQUFBLE1BQ3JFO0FBQ0QsWUFBTSxNQUFTO0FBQUEsSUFDckIsQ0FBSztBQUFBLEVBQ0w7QUFDQTtBQzdCQSxJQUFJL0gsWUFBVVo7QUFFZCxJQUFJLFVBQVU7SUFFZFEsYUFBaUIsU0FBVSxVQUFVO0FBQ25DLE1BQUlJLFVBQVEsUUFBUSxNQUFNO0FBQVUsVUFBTSxVQUFVLDJDQUEyQztBQUMvRixTQUFPLFFBQVEsUUFBUTtBQUN6QjtBQ05BLElBQUlrRCxhQUFXOUQ7QUFJZixJQUFBMkssZ0JBQWlCLFdBQVk7QUFDM0IsTUFBSSxPQUFPN0csV0FBUyxJQUFJO0FBQ3hCLE1BQUksU0FBUztBQUNiLE1BQUksS0FBSztBQUFZLGNBQVU7QUFDL0IsTUFBSSxLQUFLO0FBQVEsY0FBVTtBQUMzQixNQUFJLEtBQUs7QUFBWSxjQUFVO0FBQy9CLE1BQUksS0FBSztBQUFXLGNBQVU7QUFDOUIsTUFBSSxLQUFLO0FBQVEsY0FBVTtBQUMzQixNQUFJLEtBQUs7QUFBUyxjQUFVO0FBQzVCLE1BQUksS0FBSztBQUFhLGNBQVU7QUFDaEMsTUFBSSxLQUFLO0FBQVEsY0FBVTtBQUMzQixTQUFPO0FBQ1Q7QUNqQkEsSUFBSWhFLFVBQVFFO0FBQ1osSUFBSUgsV0FBU2M7QUFHYixJQUFJaUssWUFBVS9LLFNBQU87QUFFckIsSUFBSWdMLGtCQUFnQi9LLFFBQU0sV0FBWTtBQUNwQyxNQUFJLEtBQUs4SyxVQUFRLEtBQUssR0FBRztBQUN6QixLQUFHLFlBQVk7QUFDZixTQUFPLEdBQUcsS0FBSyxNQUFNLEtBQUs7QUFDNUIsQ0FBQztBQUlELElBQUksZ0JBQWdCQyxtQkFBaUIvSyxRQUFNLFdBQVk7QUFDckQsU0FBTyxDQUFDOEssVUFBUSxLQUFLLEdBQUcsRUFBRTtBQUM1QixDQUFDO0FBRUQsSUFBSSxlQUFlQyxtQkFBaUIvSyxRQUFNLFdBQVk7QUFFcEQsTUFBSSxLQUFLOEssVUFBUSxNQUFNLElBQUk7QUFDM0IsS0FBRyxZQUFZO0FBQ2YsU0FBTyxHQUFHLEtBQUssS0FBSyxLQUFLO0FBQzNCLENBQUM7QUFFRCxJQUFBLHNCQUFpQjtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQSxlQUFlQztBQUNqQjs7QUM3QkEsSUFBSSxxQkFBcUI3SztBQUN6QixJQUFJMkYsZ0JBQWNoRjtJQUtsQm1LLGVBQWlCLE9BQU8sUUFBUSxTQUFTL0UsTUFBSyxHQUFHO0FBQy9DLFNBQU8sbUJBQW1CLEdBQUdKLGFBQVc7QUFDMUM7QUNSQSxJQUFJbkMsZ0JBQWN4RDtBQUNsQixJQUFJLDBCQUEwQlc7QUFDOUIsSUFBSXNELHlCQUF1QnBEO0FBQzNCLElBQUlpRCxhQUFXOUI7QUFDZixJQUFJYixvQkFBa0I0QjtBQUN0QixJQUFJLGFBQWFDO0FBS2pCLHVCQUFBLElBQVlRLGlCQUFlLENBQUMsMEJBQTBCLE9BQU8sbUJBQW1CLFNBQVMsaUJBQWlCLEdBQUcsWUFBWTtBQUN2SE0sYUFBUyxDQUFDO0FBQ1YsTUFBSSxRQUFRM0Msa0JBQWdCLFVBQVU7QUFDdEMsTUFBSTRFLFFBQU8sV0FBVyxVQUFVO0FBQ2hDLE1BQUksU0FBU0EsTUFBSztBQUNsQixNQUFJVixTQUFRO0FBQ1osTUFBSTtBQUNKLFNBQU8sU0FBU0E7QUFBT3BCLDJCQUFxQixFQUFFLEdBQUcsTUFBTThCLE1BQUtWLFdBQVUsTUFBTSxJQUFJO0FBQ2hGLFNBQU87QUFDVDtBQ2xCQSxJQUFJdkIsYUFBVzlEO0FBQ2YsSUFBSSx5QkFBeUJXO0FBQzdCLElBQUksY0FBY0U7QUFDbEIsSUFBSSxhQUFhbUI7QUFDakIsSUFBSSxPQUFPZTtBQUNYLElBQUlRLDBCQUF3QlA7QUFDNUIsSUFBSXFCLGNBQVlYO0FBRWhCLElBQUksS0FBSztBQUNULElBQUksS0FBSztBQUNULElBQUksWUFBWTtBQUNoQixJQUFJLFNBQVM7QUFDYixJQUFJcUgsYUFBVzFHLFlBQVUsVUFBVTtBQUVuQyxJQUFJLG1CQUFtQixXQUFZO0FBQUE7QUFFbkMsSUFBSSxZQUFZLFNBQVUsU0FBUztBQUNqQyxTQUFPLEtBQUssU0FBUyxLQUFLLFVBQVUsS0FBSyxNQUFNLFNBQVM7QUFDMUQ7QUFHQSxJQUFJLDRCQUE0QixTQUFVMkcsa0JBQWlCO0FBQ3pELEVBQUFBLGlCQUFnQixNQUFNLFVBQVUsRUFBRSxDQUFDO0FBQ25DLEVBQUFBLGlCQUFnQixNQUFLO0FBQ3JCLE1BQUksT0FBT0EsaUJBQWdCLGFBQWE7QUFDeEMsRUFBQUEsbUJBQWtCO0FBQ2xCLFNBQU87QUFDVDtBQUdBLElBQUksMkJBQTJCLFdBQVk7QUFFekMsTUFBSSxTQUFTekgsd0JBQXNCLFFBQVE7QUFDM0MsTUFBSSxLQUFLLFNBQVMsU0FBUztBQUMzQixNQUFJO0FBQ0osU0FBTyxNQUFNLFVBQVU7QUFDdkIsT0FBSyxZQUFZLE1BQU07QUFFdkIsU0FBTyxNQUFNLE9BQU8sRUFBRTtBQUN0QixtQkFBaUIsT0FBTyxjQUFjO0FBQ3RDLGlCQUFlLEtBQUk7QUFDbkIsaUJBQWUsTUFBTSxVQUFVLG1CQUFtQixDQUFDO0FBQ25ELGlCQUFlLE1BQUs7QUFDcEIsU0FBTyxlQUFlO0FBQ3hCO0FBT0EsSUFBSTtBQUNKLElBQUksa0JBQWtCLFdBQVk7QUFDaEMsTUFBSTtBQUNGLHNCQUFrQixJQUFJLGNBQWMsVUFBVTtBQUFBLEVBQ2xELFNBQVcsT0FBUDtBQUFBLEVBQThCO0FBQ2hDLG9CQUFrQixPQUFPLFlBQVksY0FDakMsU0FBUyxVQUFVLGtCQUNqQiwwQkFBMEIsZUFBZSxJQUN6Qyx5QkFBMEIsSUFDNUIsMEJBQTBCLGVBQWU7QUFDN0MsTUFBSSxTQUFTLFlBQVk7QUFDekIsU0FBTztBQUFVLFdBQU8sZ0JBQWdCLFdBQVcsWUFBWTtBQUMvRCxTQUFPLGdCQUFlO0FBQ3hCO0FBRUEsV0FBV3dILGNBQVk7SUFLdkIsZUFBaUIsT0FBTyxVQUFVLFNBQVMsT0FBTyxHQUFHLFlBQVk7QUFDL0QsTUFBSTtBQUNKLE1BQUksTUFBTSxNQUFNO0FBQ2QscUJBQWlCLGFBQWFqSCxXQUFTLENBQUM7QUFDeEMsYUFBUyxJQUFJO0FBQ2IscUJBQWlCLGFBQWE7QUFFOUIsV0FBT2lILGNBQVk7QUFBQSxFQUN2QjtBQUFTLGFBQVM7QUFDaEIsU0FBTyxlQUFlLFNBQVksU0FBUyx1QkFBdUIsRUFBRSxRQUFRLFVBQVU7QUFDeEY7QUNsRkEsSUFBSWpMLFVBQVFFO0FBQ1osSUFBSUgsV0FBU2M7QUFHYixJQUFJaUssWUFBVS9LLFNBQU87SUFFckIsMEJBQWlCQyxRQUFNLFdBQVk7QUFDakMsTUFBSSxLQUFLOEssVUFBUSxLQUFLLEdBQUc7QUFDekIsU0FBTyxFQUFFLEdBQUcsVUFBVSxHQUFHLEtBQUssSUFBSSxLQUFLLEdBQUcsVUFBVTtBQUN0RCxDQUFDO0FDVEQsSUFBSTlLLFVBQVFFO0FBQ1osSUFBSUgsV0FBU2M7QUFHYixJQUFJLFVBQVVkLFNBQU87SUFFckIsdUJBQWlCQyxRQUFNLFdBQVk7QUFDakMsTUFBSSxLQUFLLFFBQVEsV0FBVyxHQUFHO0FBQy9CLFNBQU8sR0FBRyxLQUFLLEdBQUcsRUFBRSxPQUFPLE1BQU0sT0FDL0IsSUFBSSxRQUFRLElBQUksT0FBTyxNQUFNO0FBQ2pDLENBQUM7QUNQRCxJQUFJSyxTQUFPSDtBQUNYLElBQUlPLGdCQUFjSTtBQUNsQixJQUFJSCxhQUFXSztBQUNmLElBQUksY0FBY21CO0FBQ2xCLElBQUlpSixrQkFBZ0JsSTtBQUNwQixJQUFJLFNBQVNDLFNBQUFBO0FBQ2IsSUFBSWtJLFdBQVN4SDtBQUNiLElBQUlpQixxQkFBbUJmLGNBQXVDO0FBQzlELElBQUksc0JBQXNCc0Q7QUFDMUIsSUFBSSxrQkFBa0JDO0FBRXRCLElBQUksZ0JBQWdCLE9BQU8seUJBQXlCLE9BQU8sVUFBVSxPQUFPO0FBQzVFLElBQUksYUFBYSxPQUFPLFVBQVU7QUFDbEMsSUFBSSxjQUFjO0FBQ2xCLElBQUlnRSxXQUFTNUssY0FBWSxHQUFHLE1BQU07QUFDbEMsSUFBSSxVQUFVQSxjQUFZLEdBQUcsT0FBTztBQUNwQyxJQUFJNkssWUFBVTdLLGNBQVksR0FBRyxPQUFPO0FBQ3BDLElBQUlFLGdCQUFjRixjQUFZLEdBQUcsS0FBSztBQUV0QyxJQUFJLDJCQUE0QixXQUFZO0FBQzFDLE1BQUksTUFBTTtBQUNWLE1BQUksTUFBTTtBQUNWSixTQUFLLFlBQVksS0FBSyxHQUFHO0FBQ3pCQSxTQUFLLFlBQVksS0FBSyxHQUFHO0FBQ3pCLFNBQU8sSUFBSSxjQUFjLEtBQUssSUFBSSxjQUFjO0FBQ2xEO0FBRUEsSUFBSTBLLGtCQUFnQkksZ0JBQWM7QUFHbEMsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLLEVBQUUsRUFBRSxPQUFPO0FBRTNDLElBQUksUUFBUSw0QkFBNEIsaUJBQWlCSixtQkFBaUIsdUJBQXVCO0FBRWpHLElBQUksT0FBTztBQUNULGdCQUFjLFNBQVM5SyxNQUFLLFFBQVE7QUFDbEMsUUFBSSxLQUFLO0FBQ1QsUUFBSSxRQUFRNEUsbUJBQWlCLEVBQUU7QUFDL0IsUUFBSSxNQUFNbkUsV0FBUyxNQUFNO0FBQ3pCLFFBQUksTUFBTSxNQUFNO0FBQ2hCLFFBQUksUUFBUSxRQUFRLFdBQVc2SyxRQUFPLEdBQUcsUUFBUTtBQUVqRCxRQUFJLEtBQUs7QUFDUCxVQUFJLFlBQVksR0FBRztBQUNuQixlQUFTbEwsT0FBSyxhQUFhLEtBQUssR0FBRztBQUNuQyxTQUFHLFlBQVksSUFBSTtBQUNuQixhQUFPO0FBQUEsSUFDUjtBQUVELFFBQUksU0FBUyxNQUFNO0FBQ25CLFFBQUksU0FBUzBLLG1CQUFpQixHQUFHO0FBQ2pDLFFBQUksUUFBUTFLLE9BQUssYUFBYSxFQUFFO0FBQ2hDLFFBQUksU0FBUyxHQUFHO0FBQ2hCLFFBQUksYUFBYTtBQUNqQixRQUFJLFVBQVU7QUFFZCxRQUFJLFFBQVE7QUFDVixjQUFRaUwsVUFBUSxPQUFPLEtBQUssRUFBRTtBQUM5QixVQUFJLFFBQVEsT0FBTyxHQUFHLE1BQU0sSUFBSTtBQUM5QixpQkFBUztBQUFBLE1BQ1Y7QUFFRCxnQkFBVTNLLGNBQVksS0FBSyxHQUFHLFNBQVM7QUFFdkMsVUFBSSxHQUFHLFlBQVksTUFBTSxDQUFDLEdBQUcsYUFBYSxHQUFHLGFBQWEwSyxTQUFPLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxPQUFPO0FBQ2pHLGlCQUFTLFNBQVMsU0FBUztBQUMzQixrQkFBVSxNQUFNO0FBQ2hCO0FBQUEsTUFDRDtBQUdELGVBQVMsSUFBSSxPQUFPLFNBQVMsU0FBUyxLQUFLLEtBQUs7QUFBQSxJQUNqRDtBQUVELFFBQUksZUFBZTtBQUNqQixlQUFTLElBQUksT0FBTyxNQUFNLFNBQVMsWUFBWSxLQUFLO0FBQUEsSUFDckQ7QUFDRCxRQUFJO0FBQTBCLGtCQUFZLEdBQUc7QUFFN0MsSUFBQUUsU0FBUWxMLE9BQUssWUFBWSxTQUFTLFNBQVMsSUFBSSxPQUFPO0FBRXRELFFBQUksUUFBUTtBQUNWLFVBQUlrTCxRQUFPO0FBQ1QsUUFBQUEsT0FBTSxRQUFRNUssY0FBWTRLLE9BQU0sT0FBTyxVQUFVO0FBQ2pELFFBQUFBLE9BQU0sS0FBSzVLLGNBQVk0SyxPQUFNLElBQUksVUFBVTtBQUMzQyxRQUFBQSxPQUFNLFFBQVEsR0FBRztBQUNqQixXQUFHLGFBQWFBLE9BQU0sR0FBRztBQUFBLE1BQ2pDO0FBQWEsV0FBRyxZQUFZO0FBQUEsSUFDNUIsV0FBZSw0QkFBNEJBLFFBQU87QUFDNUMsU0FBRyxZQUFZLEdBQUcsU0FBU0EsT0FBTSxRQUFRQSxPQUFNLEdBQUcsU0FBUztBQUFBLElBQzVEO0FBQ0QsUUFBSSxpQkFBaUJBLFVBQVNBLE9BQU0sU0FBUyxHQUFHO0FBRzlDbEwsYUFBSyxlQUFla0wsT0FBTSxJQUFJLFFBQVEsV0FBWTtBQUNoRCxhQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsU0FBUyxHQUFHLEtBQUs7QUFDekMsY0FBSSxVQUFVLE9BQU87QUFBVyxZQUFBQSxPQUFNLEtBQUs7QUFBQSxRQUM1QztBQUFBLE1BQ1QsQ0FBTztBQUFBLElBQ0Y7QUFFRCxRQUFJQSxVQUFTLFFBQVE7QUFDbkIsTUFBQUEsT0FBTSxTQUFTLFNBQVNILFNBQU8sSUFBSTtBQUNuQyxXQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ2xDLGdCQUFRLE9BQU87QUFDZixlQUFPLE1BQU0sTUFBTUcsT0FBTSxNQUFNO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBRUQsV0FBT0E7QUFBQSxFQUNYO0FBQ0E7QUFFQSxJQUFBQyxlQUFpQjtBQ25IakIsSUFBSXpDLE1BQUk3STtBQUNSLElBQUlELFNBQU9ZO0FBSVhrSSxJQUFFLEVBQUUsUUFBUSxVQUFVLE9BQU8sTUFBTSxRQUFRLElBQUksU0FBUzlJLFVBQVE7QUFBQSxFQUM5RCxNQUFNQTtBQUNSLENBQUM7QUNMRCxJQUFJUSxnQkFBY1A7QUFDbEIsSUFBSThFLGtCQUFnQm5FO0FBQ3BCLElBQUkySyxlQUFheks7QUFDakIsSUFBSWYsVUFBUWtDO0FBQ1osSUFBSWtCLG9CQUFrQkg7QUFDdEIsSUFBSW1CLGdDQUE4QmxCO0FBRWxDLElBQUksVUFBVUUsa0JBQWdCLFNBQVM7QUFDdkMsSUFBSXFJLG9CQUFrQixPQUFPO0lBRTdCLGdDQUFpQixTQUFVLEtBQUt4TCxPQUFNLFFBQVEsTUFBTTtBQUNsRCxNQUFJLFNBQVNtRCxrQkFBZ0IsR0FBRztBQUVoQyxNQUFJLHNCQUFzQixDQUFDcEQsUUFBTSxXQUFZO0FBRTNDLFFBQUksSUFBSSxDQUFBO0FBQ1IsTUFBRSxVQUFVLFdBQVk7QUFBRSxhQUFPO0FBQUEsSUFBRTtBQUNuQyxXQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUs7QUFBQSxFQUN6QixDQUFHO0FBRUQsTUFBSSxvQkFBb0IsdUJBQXVCLENBQUNBLFFBQU0sV0FBWTtBQUVoRSxRQUFJLGFBQWE7QUFDakIsUUFBSSxLQUFLO0FBRVQsUUFBSSxRQUFRLFNBQVM7QUFJbkIsV0FBSyxDQUFBO0FBR0wsU0FBRyxjQUFjO0FBQ2pCLFNBQUcsWUFBWSxXQUFXLFdBQVk7QUFBRSxlQUFPO0FBQUE7QUFDL0MsU0FBRyxRQUFRO0FBQ1gsU0FBRyxVQUFVLElBQUk7QUFBQSxJQUNsQjtBQUVELE9BQUcsT0FBTyxXQUFZO0FBQUUsbUJBQWE7QUFBTSxhQUFPO0FBQUE7QUFFbEQsT0FBRyxRQUFRLEVBQUU7QUFDYixXQUFPLENBQUM7QUFBQSxFQUNaLENBQUc7QUFFRCxNQUNFLENBQUMsdUJBQ0QsQ0FBQyxxQkFDRCxRQUNBO0FBQ0EsUUFBSSw4QkFBOEJTLGNBQVksSUFBSSxPQUFPO0FBQ3pELFFBQUksVUFBVVIsTUFBSyxRQUFRLEdBQUcsTUFBTSxTQUFVLGNBQWMsUUFBUSxLQUFLLE1BQU0sbUJBQW1CO0FBQ2hHLFVBQUksd0JBQXdCUSxjQUFZLFlBQVk7QUFDcEQsVUFBSSxRQUFRLE9BQU87QUFDbkIsVUFBSSxVQUFVK0ssZ0JBQWMsVUFBVUMsa0JBQWdCLE1BQU07QUFDMUQsWUFBSSx1QkFBdUIsQ0FBQyxtQkFBbUI7QUFJN0MsaUJBQU8sRUFBRSxNQUFNLE1BQU0sT0FBTyw0QkFBNEIsUUFBUSxLQUFLLElBQUk7UUFDMUU7QUFDRCxlQUFPLEVBQUUsTUFBTSxNQUFNLE9BQU8sc0JBQXNCLEtBQUssUUFBUSxJQUFJO01BQ3BFO0FBQ0QsYUFBTyxFQUFFLE1BQU07SUFDckIsQ0FBSztBQUVEekcsb0JBQWMsT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO0FBQy9DQSxvQkFBY3lHLG1CQUFpQixRQUFRLFFBQVEsRUFBRTtBQUFBLEVBQ2xEO0FBRUQsTUFBSTtBQUFNckgsa0NBQTRCcUgsa0JBQWdCLFNBQVMsUUFBUSxJQUFJO0FBQzdFO0FDekVBLElBQUloTCxnQkFBY1A7QUFDbEIsSUFBSWlGLHdCQUFzQnRFO0FBQzFCLElBQUlILGFBQVdLO0FBQ2YsSUFBSUksMkJBQXlCZTtBQUU3QixJQUFJbUosV0FBUzVLLGNBQVksR0FBRyxNQUFNO0FBQ2xDLElBQUksYUFBYUEsY0FBWSxHQUFHLFVBQVU7QUFDMUMsSUFBSUUsZ0JBQWNGLGNBQVksR0FBRyxLQUFLO0FBRXRDLElBQUlpRixpQkFBZSxTQUFVLG1CQUFtQjtBQUM5QyxTQUFPLFNBQVUsT0FBTyxLQUFLO0FBQzNCLFFBQUksSUFBSWhGLFdBQVNTLHlCQUF1QixLQUFLLENBQUM7QUFDOUMsUUFBSSxXQUFXZ0Usc0JBQW9CLEdBQUc7QUFDdEMsUUFBSSxPQUFPLEVBQUU7QUFDYixRQUFJLE9BQU87QUFDWCxRQUFJLFdBQVcsS0FBSyxZQUFZO0FBQU0sYUFBTyxvQkFBb0IsS0FBSztBQUN0RSxZQUFRLFdBQVcsR0FBRyxRQUFRO0FBQzlCLFdBQU8sUUFBUSxTQUFVLFFBQVEsU0FBVSxXQUFXLE1BQU0sU0FDdEQsU0FBUyxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssU0FBVSxTQUFTLFFBQzNELG9CQUNFa0csU0FBTyxHQUFHLFFBQVEsSUFDbEIsUUFDRixvQkFDRTFLLGNBQVksR0FBRyxVQUFVLFdBQVcsQ0FBQyxLQUNwQyxRQUFRLFNBQVUsT0FBTyxTQUFTLFNBQVU7QUFBQSxFQUN6RDtBQUNBO0FBRUEsSUFBQSxrQkFBaUI7QUFBQSxFQUdmLFFBQVErRSxlQUFhLEtBQUs7QUFBQSxFQUcxQixRQUFRQSxlQUFhLElBQUk7QUFDM0I7QUNsQ0EsSUFBSTJGLFdBQVNuTCxnQkFBeUM7QUFJdEQsSUFBQXdMLHVCQUFpQixTQUFVLEdBQUduRyxRQUFPLFNBQVM7QUFDNUMsU0FBT0EsVUFBUyxVQUFVOEYsU0FBTyxHQUFHOUYsTUFBSyxFQUFFLFNBQVM7QUFDdEQ7QUNQQSxJQUFJbEYsU0FBT0g7QUFDWCxJQUFJOEQsYUFBV25EO0FBQ2YsSUFBSVcsZUFBYVQ7QUFDakIsSUFBSUQsWUFBVW9CO0FBQ2QsSUFBSXNKLGVBQWF2STtBQUVqQixJQUFJL0IsZUFBYTtBQUlqQixJQUFBLHFCQUFpQixTQUFVLEdBQUcsR0FBRztBQUMvQixNQUFJakIsUUFBTyxFQUFFO0FBQ2IsTUFBSXVCLGFBQVd2QixLQUFJLEdBQUc7QUFDcEIsUUFBSSxTQUFTSSxPQUFLSixPQUFNLEdBQUcsQ0FBQztBQUM1QixRQUFJLFdBQVc7QUFBTStELGlCQUFTLE1BQU07QUFDcEMsV0FBTztBQUFBLEVBQ1I7QUFDRCxNQUFJbEQsVUFBUSxDQUFDLE1BQU07QUFBVSxXQUFPVCxPQUFLbUwsY0FBWSxHQUFHLENBQUM7QUFDekQsUUFBTXRLLGFBQVcsNkNBQTZDO0FBQ2hFO0FDbEJBLElBQUliLFNBQU9IO0FBQ1gsSUFBSXlMLGtDQUFnQzlLO0FBQ3BDLElBQUltRCxhQUFXakQ7QUFDZixJQUFJRSxzQkFBb0JpQjtBQUN4QixJQUFJc0QsYUFBV3ZDO0FBQ2YsSUFBSXZDLGFBQVd3QztBQUNmLElBQUkvQiwyQkFBeUJ5QztBQUM3QixJQUFJckIsY0FBWXVCO0FBQ2hCLElBQUk0SCx1QkFBcUJ0RTtBQUN6QixJQUFJd0UsZUFBYXZFO0FBR2pCc0UsZ0NBQThCLFNBQVMsU0FBVUUsUUFBTyxhQUFhLGlCQUFpQjtBQUNwRixTQUFPO0FBQUEsSUFHTCxTQUFTTixPQUFNLFFBQVE7QUFDckIsVUFBSSxJQUFJcEsseUJBQXVCLElBQUk7QUFDbkMsVUFBSSxVQUFVRixvQkFBa0IsTUFBTSxJQUFJLFNBQVlzQixZQUFVLFFBQVFzSixNQUFLO0FBQzdFLGFBQU8sVUFBVXhMLE9BQUssU0FBUyxRQUFRLENBQUMsSUFBSSxJQUFJLE9BQU8sTUFBTSxFQUFFd0wsUUFBT25MLFdBQVMsQ0FBQyxDQUFDO0FBQUEsSUFDbEY7QUFBQSxJQUdELFNBQVUsUUFBUTtBQUNoQixVQUFJLEtBQUtzRCxXQUFTLElBQUk7QUFDdEIsVUFBSSxJQUFJdEQsV0FBUyxNQUFNO0FBQ3ZCLFVBQUksTUFBTSxnQkFBZ0IsYUFBYSxJQUFJLENBQUM7QUFFNUMsVUFBSSxJQUFJO0FBQU0sZUFBTyxJQUFJO0FBRXpCLFVBQUksQ0FBQyxHQUFHO0FBQVEsZUFBT2tMLGFBQVcsSUFBSSxDQUFDO0FBRXZDLFVBQUksY0FBYyxHQUFHO0FBQ3JCLFNBQUcsWUFBWTtBQUNmLFVBQUksSUFBSSxDQUFBO0FBQ1IsVUFBSSxJQUFJO0FBQ1IsVUFBSTtBQUNKLGNBQVEsU0FBU0EsYUFBVyxJQUFJLENBQUMsT0FBTyxNQUFNO0FBQzVDLFlBQUksV0FBV2xMLFdBQVMsT0FBTyxFQUFFO0FBQ2pDLFVBQUUsS0FBSztBQUNQLFlBQUksYUFBYTtBQUFJLGFBQUcsWUFBWWdMLHFCQUFtQixHQUFHbEcsV0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXO0FBQzdGO0FBQUEsTUFDRDtBQUNELGFBQU8sTUFBTSxJQUFJLE9BQU87QUFBQSxJQUN6QjtBQUFBLEVBQ0w7QUFDQSxDQUFDO0FDL0NELElBQUkvRSxnQkFBY1A7QUFDbEIsSUFBSTJDLGFBQVdoQztBQUVmLElBQUksUUFBUSxLQUFLO0FBQ2pCLElBQUksU0FBU0osY0FBWSxHQUFHLE1BQU07QUFDbEMsSUFBSTZLLFlBQVU3SyxjQUFZLEdBQUcsT0FBTztBQUNwQyxJQUFJRSxnQkFBY0YsY0FBWSxHQUFHLEtBQUs7QUFDdEMsSUFBSSx1QkFBdUI7QUFDM0IsSUFBSSxnQ0FBZ0M7QUFJcEMsSUFBQXFMLG9CQUFpQixTQUFVLFNBQVMsS0FBSyxVQUFVLFVBQVUsZUFBZUMsY0FBYTtBQUN2RixNQUFJLFVBQVUsV0FBVyxRQUFRO0FBQ2pDLE1BQUlDLEtBQUksU0FBUztBQUNqQixNQUFJLFVBQVU7QUFDZCxNQUFJLGtCQUFrQixRQUFXO0FBQy9CLG9CQUFnQm5KLFdBQVMsYUFBYTtBQUN0QyxjQUFVO0FBQUEsRUFDWDtBQUNELFNBQU95SSxVQUFRUyxjQUFhLFNBQVMsU0FBVVIsUUFBTyxJQUFJO0FBQ3hELFFBQUk7QUFDSixZQUFRLE9BQU8sSUFBSSxDQUFDO0FBQUEsV0FDYjtBQUFLLGVBQU87QUFBQSxXQUNaO0FBQUssZUFBTztBQUFBLFdBQ1o7QUFBSyxlQUFPNUssY0FBWSxLQUFLLEdBQUcsUUFBUTtBQUFBLFdBQ3hDO0FBQUssZUFBT0EsY0FBWSxLQUFLLE9BQU87QUFBQSxXQUNwQztBQUNILGtCQUFVLGNBQWNBLGNBQVksSUFBSSxHQUFHLEVBQUU7QUFDN0M7QUFBQTtBQUVBLFlBQUksSUFBSSxDQUFDO0FBQ1QsWUFBSSxNQUFNO0FBQUcsaUJBQU80SztBQUNwQixZQUFJLElBQUlTLElBQUc7QUFDVCxjQUFJLElBQUksTUFBTSxJQUFJLEVBQUU7QUFDcEIsY0FBSSxNQUFNO0FBQUcsbUJBQU9UO0FBQ3BCLGNBQUksS0FBS1M7QUFBRyxtQkFBTyxTQUFTLElBQUksT0FBTyxTQUFZLE9BQU8sSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUM7QUFDakcsaUJBQU9UO0FBQUEsUUFDUjtBQUNELGtCQUFVLFNBQVMsSUFBSTtBQUFBO0FBRTNCLFdBQU8sWUFBWSxTQUFZLEtBQUs7QUFBQSxFQUN4QyxDQUFHO0FBQ0g7QUMxQ0EsSUFBSXhFLFVBQVE3RztBQUNaLElBQUlHLFNBQU9RO0FBQ1gsSUFBSUosZ0JBQWNNO0FBQ2xCLElBQUk0SyxrQ0FBZ0N6SjtBQUNwQyxJQUFJbEMsVUFBUWlEO0FBQ1osSUFBSWUsYUFBV2Q7QUFDZixJQUFJMUIsZUFBYW9DO0FBQ2pCLElBQUkzQyxzQkFBb0I2QztBQUN4QixJQUFJLHNCQUFzQnNEO0FBQzFCLElBQUk1QixhQUFXNkI7QUFDZixJQUFJM0csYUFBVzZHO0FBQ2YsSUFBSXBHLDJCQUF5QnNHO0FBQzdCLElBQUlpRSx1QkFBcUIxQztBQUN6QixJQUFJekcsY0FBWTBHO0FBQ2hCLElBQUksa0JBQWtCQztBQUN0QixJQUFJLGFBQWFDO0FBQ2pCLElBQUkvRixvQkFBa0JnRztBQUV0QixJQUFJLFVBQVVoRyxrQkFBZ0IsU0FBUztBQUN2QyxJQUFJZ0MsUUFBTSxLQUFLO0FBQ2YsSUFBSUMsUUFBTSxLQUFLO0FBQ2YsSUFBSSxTQUFTNUUsY0FBWSxHQUFHLE1BQU07QUFDbEMsSUFBSW1GLFNBQU9uRixjQUFZLEdBQUcsSUFBSTtBQUM5QixJQUFJd0wsa0JBQWdCeEwsY0FBWSxHQUFHLE9BQU87QUFDMUMsSUFBSUUsZ0JBQWNGLGNBQVksR0FBRyxLQUFLO0FBRXRDLElBQUksZ0JBQWdCLFNBQVUsSUFBSTtBQUNoQyxTQUFPLE9BQU8sU0FBWSxLQUFLLE9BQU8sRUFBRTtBQUMxQztBQUlBLElBQUksbUJBQW9CLFdBQVk7QUFFbEMsU0FBTyxJQUFJLFFBQVEsS0FBSyxJQUFJLE1BQU07QUFDcEM7QUFHQSxJQUFJLCtDQUFnRCxXQUFZO0FBQzlELE1BQUksSUFBSSxVQUFVO0FBQ2hCLFdBQU8sSUFBSSxTQUFTLEtBQUssSUFBSSxNQUFNO0FBQUEsRUFDcEM7QUFDRCxTQUFPO0FBQ1Q7QUFFQSxJQUFJLGdDQUFnQyxDQUFDVCxRQUFNLFdBQVk7QUFDckQsTUFBSSxLQUFLO0FBQ1QsS0FBRyxPQUFPLFdBQVk7QUFDcEIsUUFBSSxTQUFTLENBQUE7QUFDYixXQUFPLFNBQVMsRUFBRSxHQUFHLElBQUc7QUFDeEIsV0FBTztBQUFBLEVBQ1g7QUFFRSxTQUFPLEdBQUcsUUFBUSxJQUFJLE1BQU0sTUFBTTtBQUNwQyxDQUFDO0FBR0QyTCxnQ0FBOEIsV0FBVyxTQUFVTyxJQUFHQyxnQkFBZSxpQkFBaUI7QUFDcEYsTUFBSSxvQkFBb0IsK0NBQStDLE1BQU07QUFFN0UsU0FBTztBQUFBLElBR0wsU0FBU2IsU0FBUSxhQUFhLGNBQWM7QUFDMUMsVUFBSSxJQUFJbksseUJBQXVCLElBQUk7QUFDbkMsVUFBSSxXQUFXRixvQkFBa0IsV0FBVyxJQUFJLFNBQVlzQixZQUFVLGFBQWEsT0FBTztBQUMxRixhQUFPLFdBQ0hsQyxPQUFLLFVBQVUsYUFBYSxHQUFHLFlBQVksSUFDM0NBLE9BQUs4TCxnQkFBZXpMLFdBQVMsQ0FBQyxHQUFHLGFBQWEsWUFBWTtBQUFBLElBQy9EO0FBQUEsSUFHRCxTQUFVLFFBQVEsY0FBYztBQUM5QixVQUFJLEtBQUtzRCxXQUFTLElBQUk7QUFDdEIsVUFBSSxJQUFJdEQsV0FBUyxNQUFNO0FBRXZCLFVBQ0UsT0FBTyxnQkFBZ0IsWUFDdkJ1TCxnQkFBYyxjQUFjLGlCQUFpQixNQUFNLE1BQ25EQSxnQkFBYyxjQUFjLElBQUksTUFBTSxJQUN0QztBQUNBLFlBQUksTUFBTSxnQkFBZ0JFLGdCQUFlLElBQUksR0FBRyxZQUFZO0FBQzVELFlBQUksSUFBSTtBQUFNLGlCQUFPLElBQUk7QUFBQSxNQUMxQjtBQUVELFVBQUksb0JBQW9CM0ssYUFBVyxZQUFZO0FBQy9DLFVBQUksQ0FBQztBQUFtQix1QkFBZWQsV0FBUyxZQUFZO0FBRTVELFVBQUlYLFVBQVMsR0FBRztBQUNoQixVQUFJQSxTQUFRO0FBQ1YsWUFBSSxjQUFjLEdBQUc7QUFDckIsV0FBRyxZQUFZO0FBQUEsTUFDaEI7QUFDRCxVQUFJLFVBQVUsQ0FBQTtBQUNkLGFBQU8sTUFBTTtBQUNYLFlBQUksU0FBUyxXQUFXLElBQUksQ0FBQztBQUM3QixZQUFJLFdBQVc7QUFBTTtBQUVyQjZGLGVBQUssU0FBUyxNQUFNO0FBQ3BCLFlBQUksQ0FBQzdGO0FBQVE7QUFFYixZQUFJLFdBQVdXLFdBQVMsT0FBTyxFQUFFO0FBQ2pDLFlBQUksYUFBYTtBQUFJLGFBQUcsWUFBWWdMLHFCQUFtQixHQUFHbEcsV0FBUyxHQUFHLFNBQVMsR0FBRyxXQUFXO0FBQUEsTUFDOUY7QUFFRCxVQUFJLG9CQUFvQjtBQUN4QixVQUFJLHFCQUFxQjtBQUN6QixlQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3ZDLGlCQUFTLFFBQVE7QUFFakIsWUFBSSxVQUFVOUUsV0FBUyxPQUFPLEVBQUU7QUFDaEMsWUFBSSxXQUFXMEUsTUFBSUMsTUFBSSxvQkFBb0IsT0FBTyxLQUFLLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQztBQUN0RSxZQUFJLFdBQVcsQ0FBQTtBQU1mLGlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUTtBQUFLTyxpQkFBSyxVQUFVLGNBQWMsT0FBTyxFQUFFLENBQUM7QUFDL0UsWUFBSSxnQkFBZ0IsT0FBTztBQUMzQixZQUFJLG1CQUFtQjtBQUNyQixjQUFJLGVBQWUsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFVLFVBQVUsQ0FBQztBQUMxRCxjQUFJLGtCQUFrQjtBQUFXQSxtQkFBSyxjQUFjLGFBQWE7QUFDakUsY0FBSW1HLGVBQWNyTCxXQUFTcUcsUUFBTSxjQUFjLFFBQVcsWUFBWSxDQUFDO0FBQUEsUUFDakYsT0FBZTtBQUNMLFVBQUFnRixlQUFjLGdCQUFnQixTQUFTLEdBQUcsVUFBVSxVQUFVLGVBQWUsWUFBWTtBQUFBLFFBQzFGO0FBQ0QsWUFBSSxZQUFZLG9CQUFvQjtBQUNsQywrQkFBcUJwTCxjQUFZLEdBQUcsb0JBQW9CLFFBQVEsSUFBSW9MO0FBQ3BFLCtCQUFxQixXQUFXLFFBQVE7QUFBQSxRQUN6QztBQUFBLE1BQ0Y7QUFDRCxhQUFPLG9CQUFvQnBMLGNBQVksR0FBRyxrQkFBa0I7QUFBQSxJQUM3RDtBQUFBLEVBQ0w7QUFDQSxHQUFHLENBQUMsaUNBQWlDLENBQUMsb0JBQW9CLDRDQUE0QztBQ3hJdEcsSUFBSWMsYUFBV3ZCO0FBQ2YsSUFBSVksWUFBVUQ7QUFDZCxJQUFJdUMsb0JBQWtCckM7QUFFdEIsSUFBSThLLFVBQVF6SSxrQkFBZ0IsT0FBTztJQUluQyxXQUFpQixTQUFVLElBQUk7QUFDN0IsTUFBSWdKO0FBQ0osU0FBTzNLLFdBQVMsRUFBRSxPQUFPMkssWUFBVyxHQUFHUCxjQUFZLFNBQVksQ0FBQyxDQUFDTyxZQUFXdEwsVUFBUSxFQUFFLEtBQUs7QUFDN0Y7QUNYQSxJQUFJc0wsYUFBV2xNO0FBRWYsSUFBSWdCLGVBQWE7SUFFakIsYUFBaUIsU0FBVSxJQUFJO0FBQzdCLE1BQUlrTCxXQUFTLEVBQUUsR0FBRztBQUNoQixVQUFNbEwsYUFBVywrQ0FBK0M7QUFBQSxFQUNqRTtBQUFDLFNBQU87QUFDWDtBQ1JBLElBQUlrQyxvQkFBa0JsRDtBQUV0QixJQUFJLFFBQVFrRCxrQkFBZ0IsT0FBTztJQUVuQyx1QkFBaUIsU0FBVSxhQUFhO0FBQ3RDLE1BQUksU0FBUztBQUNiLE1BQUk7QUFDRixVQUFNLGFBQWEsTUFBTTtBQUFBLEVBQzFCLFNBQVEsUUFBUDtBQUNBLFFBQUk7QUFDRixhQUFPLFNBQVM7QUFDaEIsYUFBTyxNQUFNLGFBQWEsTUFBTTtBQUFBLElBQ3RDLFNBQWEsUUFBUDtBQUFBLElBQThCO0FBQUEsRUFDakM7QUFBQyxTQUFPO0FBQ1g7QUNiQSxJQUFJMkYsTUFBSTdJO0FBQ1IsSUFBSU8sZ0JBQWNJO0FBQ2xCLElBQUlQLDZCQUEyQlMsK0JBQTJEO0FBQzFGLElBQUl5RSxhQUFXdEQ7QUFDZixJQUFJeEIsYUFBV3VDO0FBQ2YsSUFBSW9KLGVBQWFuSjtBQUNqQixJQUFJL0IsMkJBQXlCeUM7QUFDN0IsSUFBSTBJLHlCQUF1QnhJO0FBSTNCLElBQUksbUJBQW1CckQsY0FBWSxHQUFHLFVBQVU7QUFDaEQsSUFBSUUsZ0JBQWNGLGNBQVksR0FBRyxLQUFLO0FBQ3RDLElBQUk0RSxRQUFNLEtBQUs7QUFFZixJQUFJa0gsNEJBQTBCRCx1QkFBcUIsWUFBWTtBQUUvRCxJQUFJRSxxQkFBK0IsQ0FBQ0QsNkJBQTJCLENBQUMsQ0FBQyxXQUFZO0FBQzNFLE1BQUksYUFBYWpNLDJCQUF5QixPQUFPLFdBQVcsWUFBWTtBQUN4RSxTQUFPLGNBQWMsQ0FBQyxXQUFXO0FBQ25DO0FBSUF5SSxJQUFFLEVBQUUsUUFBUSxVQUFVLE9BQU8sTUFBTSxRQUFRLENBQUN5RCxzQkFBb0IsQ0FBQ0QsNkJBQTJCO0FBQUEsRUFDMUYsWUFBWSxTQUFTLFdBQVcsY0FBbUM7QUFDakUsUUFBSSxPQUFPN0wsV0FBU1MseUJBQXVCLElBQUksQ0FBQztBQUNoRGtMLGlCQUFXLFlBQVk7QUFDdkIsUUFBSTlHLFNBQVFDLFdBQVNILE1BQUksVUFBVSxTQUFTLElBQUksVUFBVSxLQUFLLFFBQVcsS0FBSyxNQUFNLENBQUM7QUFDdEYsUUFBSSxTQUFTM0UsV0FBUyxZQUFZO0FBQ2xDLFdBQU8sbUJBQ0gsaUJBQWlCLE1BQU0sUUFBUTZFLE1BQUssSUFDcEM1RSxjQUFZLE1BQU00RSxRQUFPQSxTQUFRLE9BQU8sTUFBTSxNQUFNO0FBQUEsRUFDekQ7QUFDSCxDQUFDO0FDbkNELElBQUluQyxvQkFBa0JsRDtBQUN0QixJQUFJa0wsV0FBU3ZLO0FBQ2IsSUFBSTRCLG1CQUFpQjFCLHFCQUErQztBQUVwRSxJQUFJLGNBQWNxQyxrQkFBZ0IsYUFBYTtBQUMvQyxJQUFJLGlCQUFpQixNQUFNO0FBSTNCLElBQUksZUFBZSxnQkFBZ0IsUUFBVztBQUM1Q1gsbUJBQWUsZ0JBQWdCLGFBQWE7QUFBQSxJQUMxQyxjQUFjO0FBQUEsSUFDZCxPQUFPMkksU0FBTyxJQUFJO0FBQUEsRUFDdEIsQ0FBRztBQUNIO0lBR0FxQixxQkFBaUIsU0FBVSxLQUFLO0FBQzlCLGlCQUFlLGFBQWEsT0FBTztBQUNyQztBQ25CQSxJQUFJek0sVUFBUUU7QUFFWixJQUFBLHlCQUFpQixDQUFDRixRQUFNLFdBQVk7QUFDbEMsV0FBUyxJQUFJO0FBQUEsRUFBZTtBQUM1QixJQUFFLFVBQVUsY0FBYztBQUUxQixTQUFPLE9BQU8sZUFBZSxJQUFJLEVBQUMsQ0FBRSxNQUFNLEVBQUU7QUFDOUMsQ0FBQztBQ1BELElBQUlnRCxXQUFTOUM7QUFDYixJQUFJc0IsZUFBYVg7QUFDakIsSUFBSWdDLGFBQVc5QjtBQUNmLElBQUksWUFBWW1CO0FBQ2hCLElBQUksMkJBQTJCZTtBQUUvQixJQUFJLFdBQVcsVUFBVSxVQUFVO0FBQ25DLElBQUksVUFBVTtBQUNkLElBQUksa0JBQWtCLFFBQVE7SUFLOUIsdUJBQWlCLDJCQUEyQixRQUFRLGlCQUFpQixTQUFVLEdBQUc7QUFDaEYsTUFBSSxTQUFTSixXQUFTLENBQUM7QUFDdkIsTUFBSUcsU0FBTyxRQUFRLFFBQVE7QUFBRyxXQUFPLE9BQU87QUFDNUMsTUFBSSxjQUFjLE9BQU87QUFDekIsTUFBSXhCLGFBQVcsV0FBVyxLQUFLLGtCQUFrQixhQUFhO0FBQzVELFdBQU8sWUFBWTtBQUFBLEVBQ3BCO0FBQUMsU0FBTyxrQkFBa0IsVUFBVSxrQkFBa0I7QUFDekQ7QUNuQkEsSUFBSXhCLFVBQVFFO0FBQ1osSUFBSXNCLGVBQWFYO0FBQ2pCLElBQUksV0FBV0U7QUFFZixJQUFJMkwsbUJBQWlCeko7QUFDckIsSUFBSStCLGtCQUFnQjlCO0FBQ3BCLElBQUlFLG9CQUFrQlE7QUFHdEIsSUFBSW9HLGFBQVc1RyxrQkFBZ0IsVUFBVTtBQUN6QyxJQUFJdUosMkJBQXlCO0FBSTdCLElBQUlDLHFCQUFtQixtQ0FBbUM7QUFHMUQsSUFBSSxDQUFBLEVBQUcsTUFBTTtBQUNYLGtCQUFnQixDQUFBLEVBQUc7QUFFbkIsTUFBSSxFQUFFLFVBQVU7QUFBZ0JELCtCQUF5QjtBQUFBLE9BQ3BEO0FBQ0gsd0NBQW9DRCxpQkFBZUEsaUJBQWUsYUFBYSxDQUFDO0FBQ2hGLFFBQUksc0NBQXNDLE9BQU87QUFBV0UsNEJBQW9CO0FBQUEsRUFDakY7QUFDSDtBQUVBLElBQUkseUJBQXlCLENBQUMsU0FBU0EsbUJBQWlCLEtBQUs1TSxRQUFNLFdBQVk7QUFDN0UsTUFBSUcsUUFBTyxDQUFBO0FBRVgsU0FBT3lNLG9CQUFrQjVDLFlBQVUsS0FBSzdKLEtBQUksTUFBTUE7QUFDcEQsQ0FBQztBQUVELElBQUk7QUFBd0J5TSx3QkFBb0I7QUFLaEQsSUFBSSxDQUFDcEwsYUFBV29MLG9CQUFrQjVDLFdBQVMsR0FBRztBQUM1Q2hGLGtCQUFjNEgscUJBQW1CNUMsWUFBVSxXQUFZO0FBQ3JELFdBQU87QUFBQSxFQUNYLENBQUc7QUFDSDtBQUVBLElBQUEsZ0JBQWlCO0FBQUEsRUFDZixtQkFBbUI0QztBQUFBQSxFQUNuQix3QkFBd0JEO0FBQzFCO0FDL0NBLElBQUlDLHNCQUFvQjFNLGNBQXVDO0FBQy9ELElBQUlrTCxVQUFTdks7QUFDYixJQUFJTiw2QkFBMkJRO0FBQy9CLElBQUl3RixtQkFBaUJyRTtBQUNyQixJQUFJNkgsY0FBWTlHO0FBRWhCLElBQUk0SixlQUFhLFdBQVk7QUFBRSxTQUFPOztJQUV0Qyw0QkFBaUIsU0FBVSxxQkFBcUIsTUFBTSxNQUFNLGlCQUFpQjtBQUMzRSxNQUFJdkcsaUJBQWdCLE9BQU87QUFDM0Isc0JBQW9CLFlBQVk4RSxRQUFPd0IscUJBQW1CLEVBQUUsTUFBTXJNLDJCQUF5QixDQUFDLENBQUMsaUJBQWlCLElBQUksRUFBRyxDQUFBO0FBQ3JIZ0csbUJBQWUscUJBQXFCRCxnQkFBZSxLQUFXO0FBQzlEeUQsY0FBVXpELGtCQUFpQnVHO0FBQzNCLFNBQU87QUFDVDtBQ2RBLElBQUk5RCxNQUFJN0k7QUFDUixJQUFJRyxTQUFPUTtBQUVYLElBQUksZUFBZXFCO0FBQ25CLElBQUksYUFBYWU7QUFDakIsSUFBSSw0QkFBNEJDO0FBQ2hDLElBQUksaUJBQWlCVTtBQUNyQixJQUFJLGlCQUFpQkU7QUFDckIsSUFBSSxpQkFBaUJzRDtBQUNyQixJQUFJaEQsZ0NBQThCaUQ7QUFDbEMsSUFBSXJDLGtCQUFnQnVDO0FBQ3BCLElBQUluRSxvQkFBa0JxRTtBQUN0QixJQUFJc0MsY0FBWWY7QUFDaEIsSUFBSSxnQkFBZ0JDO0FBRXBCLElBQUk2RCx5QkFBdUIsYUFBYTtBQUN4QyxJQUFJLDZCQUE2QixhQUFhO0FBQzlDLElBQUksb0JBQW9CLGNBQWM7QUFDdEMsSUFBSSx5QkFBeUIsY0FBYztBQUMzQyxJQUFJOUMsYUFBVzVHLGtCQUFnQixVQUFVO0FBQ3pDLElBQUksT0FBTztBQUNYLElBQUksU0FBUztBQUNiLElBQUksVUFBVTtBQUVkLElBQUksYUFBYSxXQUFZO0FBQUUsU0FBTzs7QUFFdEMsSUFBQSxpQkFBaUIsU0FBVSxVQUFVLE1BQU0scUJBQXFCLE1BQU0sU0FBUyxRQUFRLFFBQVE7QUFDN0YsNEJBQTBCLHFCQUFxQixNQUFNLElBQUk7QUFFekQsTUFBSSxxQkFBcUIsU0FBVSxNQUFNO0FBQ3ZDLFFBQUksU0FBUyxXQUFXO0FBQWlCLGFBQU87QUFDaEQsUUFBSSxDQUFDLDBCQUEwQixRQUFRO0FBQW1CLGFBQU8sa0JBQWtCO0FBQ25GLFlBQVE7QUFBQSxXQUNEO0FBQU0sZUFBTyxTQUFTNkMsUUFBTztBQUFFLGlCQUFPLElBQUksb0JBQW9CLE1BQU0sSUFBSTtBQUFBO1dBQ3hFO0FBQVEsZUFBTyxTQUFTd0UsVUFBUztBQUFFLGlCQUFPLElBQUksb0JBQW9CLE1BQU0sSUFBSTtBQUFBO1dBQzVFO0FBQVMsZUFBTyxTQUFTLFVBQVU7QUFBRSxpQkFBTyxJQUFJLG9CQUFvQixNQUFNLElBQUk7QUFBQTs7QUFDbkYsV0FBTyxXQUFZO0FBQUUsYUFBTyxJQUFJLG9CQUFvQixJQUFJO0FBQUEsSUFBRTtBQUFBLEVBQ2hFO0FBRUUsTUFBSW5FLGlCQUFnQixPQUFPO0FBQzNCLE1BQUksd0JBQXdCO0FBQzVCLE1BQUksb0JBQW9CLFNBQVM7QUFDakMsTUFBSSxpQkFBaUIsa0JBQWtCMEQsZUFDbEMsa0JBQWtCLGlCQUNsQixXQUFXLGtCQUFrQjtBQUNsQyxNQUFJLGtCQUFrQixDQUFDLDBCQUEwQixrQkFBa0IsbUJBQW1CLE9BQU87QUFDN0YsTUFBSSxvQkFBb0IsUUFBUSxVQUFVLGtCQUFrQixXQUFXLGlCQUFpQjtBQUN4RixNQUFJLDBCQUEwQixTQUFTO0FBR3ZDLE1BQUksbUJBQW1CO0FBQ3JCLCtCQUEyQixlQUFlLGtCQUFrQixLQUFLLElBQUksU0FBVSxDQUFBLENBQUM7QUFDaEYsUUFBSSw2QkFBNkIsT0FBTyxhQUFhLHlCQUF5QixNQUFNO0FBQ2xGLFVBQWdCLGVBQWUsd0JBQXdCLE1BQU0sbUJBQW1CO0FBQzlFLFlBQUksZ0JBQWdCO0FBQ2xCLHlCQUFlLDBCQUEwQixpQkFBaUI7QUFBQSxRQUMzRCxXQUFVLENBQUMsV0FBVyx5QkFBeUJBLFdBQVMsR0FBRztBQUMxRGhGLDBCQUFjLDBCQUEwQmdGLFlBQVUsVUFBVTtBQUFBLFFBQzdEO0FBQUEsTUFDRjtBQUVELHFCQUFlLDBCQUEwQjFELGdCQUFlLElBQVU7QUFBQSxJQUVuRTtBQUFBLEVBQ0Y7QUFHRCxNQUFJd0csMEJBQXdCLFdBQVcsVUFBVSxrQkFBa0IsZUFBZSxTQUFTLFFBQVE7QUFDakcsUUFBZ0IsNEJBQTRCO0FBQzFDMUksb0NBQTRCLG1CQUFtQixRQUFRLE1BQU07QUFBQSxJQUNuRSxPQUFXO0FBQ0wsOEJBQXdCO0FBQ3hCLHdCQUFrQixTQUFTcUcsVUFBUztBQUFFLGVBQU9wSyxPQUFLLGdCQUFnQixJQUFJO0FBQUE7SUFDdkU7QUFBQSxFQUNGO0FBR0QsTUFBSSxTQUFTO0FBQ1gsY0FBVTtBQUFBLE1BQ1IsUUFBUSxtQkFBbUIsTUFBTTtBQUFBLE1BQ2pDLE1BQU0sU0FBUyxrQkFBa0IsbUJBQW1CLElBQUk7QUFBQSxNQUN4RCxTQUFTLG1CQUFtQixPQUFPO0FBQUEsSUFDekM7QUFDSSxRQUFJO0FBQVEsV0FBSyxPQUFPLFNBQVM7QUFDL0IsWUFBSSwwQkFBMEIseUJBQXlCLEVBQUUsT0FBTyxvQkFBb0I7QUFDbEYyRSwwQkFBYyxtQkFBbUIsS0FBSyxRQUFRLElBQUk7QUFBQSxRQUNuRDtBQUFBLE1BQ0Y7QUFBQTtBQUFNK0QsVUFBRSxFQUFFLFFBQVEsTUFBTSxPQUFPLE1BQU0sUUFBUSwwQkFBMEIsc0JBQXVCLEdBQUUsT0FBTztBQUFBLEVBQ3pHO0FBR0QsTUFBNEIsa0JBQWtCaUIsZ0JBQWMsaUJBQWlCO0FBQzNFaEYsb0JBQWMsbUJBQW1CZ0YsWUFBVSxpQkFBaUIsRUFBRSxNQUFNLFFBQU8sQ0FBRTtBQUFBLEVBQzlFO0FBQ0RELGNBQVUsUUFBUTtBQUVsQixTQUFPO0FBQ1Q7QUNoR0EsSUFBQWdELDJCQUFpQixTQUFVLE9BQU8sTUFBTTtBQUN0QyxTQUFPLEVBQUUsT0FBYyxLQUFVO0FBQ25DO0FDSEEsSUFBSSxrQkFBa0I3TTtBQUN0QixJQUFJLG1CQUFtQlc7QUFDdkIsSUFBSSxZQUFZRTtBQUNoQixJQUFJLHNCQUFzQm1CO0FBQzFCLElBQUlPLGtCQUFpQlEscUJBQStDO0FBQ3BFLElBQUksaUJBQWlCQztBQUNyQixJQUFJLHlCQUF5QlU7QUFFN0IsSUFBSSxjQUFjd0Q7QUFFbEIsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxtQkFBbUIsb0JBQW9CO0FBQzNDLElBQUksbUJBQW1CLG9CQUFvQixVQUFVLGNBQWM7SUFZbkUsb0JBQWlCLGVBQWUsT0FBTyxTQUFTLFNBQVUsVUFBVSxNQUFNO0FBQ3hFLG1CQUFpQixNQUFNO0FBQUEsSUFDckIsTUFBTTtBQUFBLElBQ04sUUFBUSxnQkFBZ0IsUUFBUTtBQUFBLElBQ2hDLE9BQU87QUFBQSxJQUNQO0FBQUEsRUFDSixDQUFHO0FBR0gsR0FBRyxXQUFZO0FBQ2IsTUFBSSxRQUFRLGlCQUFpQixJQUFJO0FBQ2pDLE1BQUksU0FBUyxNQUFNO0FBQ25CLE1BQUksT0FBTyxNQUFNO0FBQ2pCLE1BQUk3QixTQUFRLE1BQU07QUFDbEIsTUFBSSxDQUFDLFVBQVVBLFVBQVMsT0FBTyxRQUFRO0FBQ3JDLFVBQU0sU0FBUztBQUNmLFdBQU8sdUJBQXVCLFFBQVcsSUFBSTtBQUFBLEVBQzlDO0FBQ0QsTUFBSSxRQUFRO0FBQVEsV0FBTyx1QkFBdUJBLFFBQU8sS0FBSztBQUM5RCxNQUFJLFFBQVE7QUFBVSxXQUFPLHVCQUF1QixPQUFPQSxTQUFRLEtBQUs7QUFDeEUsU0FBTyx1QkFBdUIsQ0FBQ0EsUUFBTyxPQUFPQSxPQUFNLEdBQUcsS0FBSztBQUM3RCxHQUFHLFFBQVE7QUFLWCxJQUFJLFNBQVMsVUFBVSxZQUFZLFVBQVU7QUFHN0MsaUJBQWlCLE1BQU07QUFDdkIsaUJBQWlCLFFBQVE7QUFDekIsaUJBQWlCLFNBQVM7QUFHMUIsSUFBZ0IsZUFBZSxPQUFPLFNBQVM7QUFBVSxNQUFJO0FBQzNELElBQUE5QyxnQkFBZSxRQUFRLFFBQVEsRUFBRSxPQUFPLFNBQVUsQ0FBQTtBQUFBLEVBQ3BELFNBQVMsT0FBUDtBQUFBLEVBQWM7QUMzRGhCLElBQUEsZUFBaUI7QUFBQSxFQUNmLGFBQWE7QUFBQSxFQUNiLHFCQUFxQjtBQUFBLEVBQ3JCLGNBQWM7QUFBQSxFQUNkLGdCQUFnQjtBQUFBLEVBQ2hCLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxFQUNkLHNCQUFzQjtBQUFBLEVBQ3RCLFVBQVU7QUFBQSxFQUNWLG1CQUFtQjtBQUFBLEVBQ25CLGdCQUFnQjtBQUFBLEVBQ2hCLGlCQUFpQjtBQUFBLEVBQ2pCLG1CQUFtQjtBQUFBLEVBQ25CLFdBQVc7QUFBQSxFQUNYLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxFQUNkLFVBQVU7QUFBQSxFQUNWLGtCQUFrQjtBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLGdCQUFnQjtBQUFBLEVBQ2hCLGNBQWM7QUFBQSxFQUNkLGVBQWU7QUFBQSxFQUNmLGtCQUFrQjtBQUFBLEVBQ2xCLGtCQUFrQjtBQUFBLEVBQ2xCLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFDYjtBQ2pDQSxJQUFJLHdCQUF3QnZDO0FBRTVCLElBQUksWUFBWSxzQkFBc0IsTUFBTSxFQUFFO0FBQzlDLElBQUk4TSwwQkFBd0IsYUFBYSxVQUFVLGVBQWUsVUFBVSxZQUFZO0lBRXhGLHdCQUFpQkEsNEJBQTBCLE9BQU8sWUFBWSxTQUFZQTtBQ04xRSxJQUFJLFNBQVM5TTtBQUNiLElBQUksZUFBZVc7QUFDbkIsSUFBSSx3QkFBd0JFO0FBQzVCLElBQUksdUJBQXVCbUI7QUFDM0IsSUFBSSw4QkFBOEJlO0FBQ2xDLElBQUksa0JBQWtCQztBQUV0QixJQUFJLFdBQVcsZ0JBQWdCLFVBQVU7QUFDekMsSUFBSSxnQkFBZ0IsZ0JBQWdCLGFBQWE7QUFDakQsSUFBSSxjQUFjLHFCQUFxQjtBQUV2QyxJQUFJLGtCQUFrQixTQUFVLHFCQUFxQixpQkFBaUI7QUFDcEUsTUFBSSxxQkFBcUI7QUFFdkIsUUFBSSxvQkFBb0IsY0FBYztBQUFhLFVBQUk7QUFDckQsb0NBQTRCLHFCQUFxQixVQUFVLFdBQVc7QUFBQSxNQUN2RSxTQUFRLE9BQVA7QUFDQSw0QkFBb0IsWUFBWTtBQUFBLE1BQ2pDO0FBQ0QsUUFBSSxDQUFDLG9CQUFvQixnQkFBZ0I7QUFDdkMsa0NBQTRCLHFCQUFxQixlQUFlLGVBQWU7QUFBQSxJQUNoRjtBQUNELFFBQUksYUFBYTtBQUFrQixlQUFTLGVBQWUsc0JBQXNCO0FBRS9FLFlBQUksb0JBQW9CLGlCQUFpQixxQkFBcUI7QUFBYyxjQUFJO0FBQzlFLHdDQUE0QixxQkFBcUIsYUFBYSxxQkFBcUIsWUFBWTtBQUFBLFVBQ2hHLFNBQVEsT0FBUDtBQUNBLGdDQUFvQixlQUFlLHFCQUFxQjtBQUFBLFVBQ3pEO0FBQUEsTUFDRjtBQUFBLEVBQ0Y7QUFDSDtBQUVBLFNBQVMsbUJBQW1CLGNBQWM7QUFDeEMsa0JBQWdCLE9BQU8sb0JBQW9CLE9BQU8saUJBQWlCLFdBQVcsZUFBZTtBQUMvRjtBQUVBLGdCQUFnQix1QkFBdUIsY0FBYztBQ3BDdEMsU0FBUyxhQUFhLE9BQU8sTUFBTTtBQUNoRCxNQUFJLFFBQVEsS0FBSyxNQUFNLFlBQVksVUFBVTtBQUFNLFdBQU87QUFDMUQsTUFBSSxPQUFPLE1BQU0sT0FBTztBQUN4QixNQUFJLFNBQVMsUUFBVztBQUN0QixRQUFJLE1BQU0sS0FBSyxLQUFLLE9BQU8sUUFBUSxTQUFTO0FBQzVDLFFBQUksUUFBUSxHQUFHLE1BQU07QUFBVSxhQUFPO0FBQ3RDLFVBQU0sSUFBSSxVQUFVLDhDQUE4QztBQUFBLEVBQ25FO0FBQ0QsVUFBUSxTQUFTLFdBQVcsU0FBUyxRQUFRLEtBQUs7QUFDcEQ7QUNSZSxTQUFTLGVBQWUsS0FBSztBQUMxQyxNQUFJLE1BQU1HLGFBQVksS0FBSyxRQUFRO0FBQ25DLFNBQU8sUUFBUSxHQUFHLE1BQU0sV0FBVyxNQUFNLE9BQU8sR0FBRztBQUNyRDtBQ0plLFNBQVMsZ0JBQWdCLEtBQUssS0FBSyxPQUFPO0FBQ3ZELFFBQU1DLGVBQWMsR0FBRztBQUN2QixNQUFJLE9BQU8sS0FBSztBQUNkLFdBQU8sZUFBZSxLQUFLLEtBQUs7QUFBQSxNQUM5QjtBQUFBLE1BQ0EsWUFBWTtBQUFBLE1BQ1osY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLElBQ2hCLENBQUs7QUFBQSxFQUNMLE9BQVM7QUFDTCxRQUFJLE9BQU87QUFBQSxFQUNaO0FBQ0QsU0FBTztBQUNUO0FDZEEsSUFBSSxZQUFZcEQ7QUFDaEIsSUFBSSxXQUFXVztBQUNmLElBQUksZ0JBQWdCRTtBQUNwQixJQUFJMEUsc0JBQW9CdkQ7QUFFeEIsSUFBSSxhQUFhO0FBR2pCLElBQUl3RCxpQkFBZSxTQUFVLFVBQVU7QUFDckMsU0FBTyxTQUFVLE1BQU0sWUFBWSxpQkFBaUIsTUFBTTtBQUN4RCxjQUFVLFVBQVU7QUFDcEIsUUFBSSxJQUFJLFNBQVMsSUFBSTtBQUNyQixRQUFJa0YsUUFBTyxjQUFjLENBQUM7QUFDMUIsUUFBSSxTQUFTbkYsb0JBQWtCLENBQUM7QUFDaEMsUUFBSUYsU0FBUSxXQUFXLFNBQVMsSUFBSTtBQUNwQyxRQUFJLElBQUksV0FBVyxLQUFLO0FBQ3hCLFFBQUksa0JBQWtCO0FBQUcsYUFBTyxNQUFNO0FBQ3BDLFlBQUlBLFVBQVNxRixPQUFNO0FBQ2pCLGlCQUFPQSxNQUFLckY7QUFDWixVQUFBQSxVQUFTO0FBQ1Q7QUFBQSxRQUNEO0FBQ0QsUUFBQUEsVUFBUztBQUNULFlBQUksV0FBV0EsU0FBUSxJQUFJLFVBQVVBLFFBQU87QUFDMUMsZ0JBQU0sV0FBVyw2Q0FBNkM7QUFBQSxRQUMvRDtBQUFBLE1BQ0Y7QUFDRCxXQUFNLFdBQVdBLFVBQVMsSUFBSSxTQUFTQSxRQUFPQSxVQUFTO0FBQUcsVUFBSUEsVUFBU3FGLE9BQU07QUFDM0UsZUFBTyxXQUFXLE1BQU1BLE1BQUtyRixTQUFRQSxRQUFPLENBQUM7QUFBQSxNQUM5QztBQUNELFdBQU87QUFBQSxFQUNYO0FBQ0E7QUFFQSxJQUFBLGNBQWlCO0FBQUEsRUFHZixNQUFNRyxlQUFhLEtBQUs7QUFBQSxFQUd4QixPQUFPQSxlQUFhLElBQUk7QUFDMUI7QUN4Q0EsSUFBSTFGLFVBQVFFO0FBRVosSUFBQStNLHdCQUFpQixTQUFVLGFBQWEsVUFBVTtBQUNoRCxNQUFJLFNBQVMsR0FBRztBQUNoQixTQUFPLENBQUMsQ0FBQyxVQUFVak4sUUFBTSxXQUFZO0FBRW5DLFdBQU8sS0FBSyxNQUFNLFlBQVksV0FBWTtBQUFFLGFBQU87QUFBQSxPQUFNLENBQUM7QUFBQSxFQUM5RCxDQUFHO0FBQ0g7QUNSQSxJQUFJK0ksTUFBSTdJO0FBQ1IsSUFBSSxVQUFVVyxZQUFxQztBQUNuRCxJQUFJb00sd0JBQXNCbE07QUFDMUIsSUFBSSxpQkFBaUJtQjtBQUNyQixJQUFJLFVBQVVlO0FBRWQsSUFBSWlLLGtCQUFnQkQsc0JBQW9CLFFBQVE7QUFHaEQsSUFBSSxhQUFhLENBQUMsV0FBVyxpQkFBaUIsTUFBTSxpQkFBaUI7QUFJckVsRSxJQUFFLEVBQUUsUUFBUSxTQUFTLE9BQU8sTUFBTSxRQUFRLENBQUNtRSxtQkFBaUIsY0FBYztBQUFBLEVBQ3hFLFFBQVEsU0FBUyxPQUFPLFlBQWlDO0FBQ3ZELFFBQUksU0FBUyxVQUFVO0FBQ3ZCLFdBQU8sUUFBUSxNQUFNLFlBQVksUUFBUSxTQUFTLElBQUksVUFBVSxLQUFLLE1BQVM7QUFBQSxFQUMvRTtBQUNILENBQUM7QUNsQkQsSUFBSW5FLE1BQUk3STtBQUNSLElBQUlPLGdCQUFjSTtBQUNsQixJQUFJUCw0QkFBMkJTLCtCQUEyRDtBQUMxRixJQUFJeUUsYUFBV3REO0FBQ2YsSUFBSXhCLGFBQVd1QztBQUNmLElBQUlvSixlQUFhbko7QUFDakIsSUFBSS9CLDJCQUF5QnlDO0FBQzdCLElBQUkwSSx5QkFBdUJ4STtBQUkzQixJQUFJLGlCQUFpQnJELGNBQVksR0FBRyxRQUFRO0FBQzVDLElBQUksUUFBUUEsY0FBWSxHQUFHLEtBQUs7QUFDaEMsSUFBSTRFLFFBQU0sS0FBSztBQUVmLElBQUksMEJBQTBCaUgsdUJBQXFCLFVBQVU7QUFFN0QsSUFBSSxtQkFBK0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVk7QUFDM0UsTUFBSSxhQUFhaE0sMEJBQXlCLE9BQU8sV0FBVyxVQUFVO0FBQ3RFLFNBQU8sY0FBYyxDQUFDLFdBQVc7QUFDbkM7QUFJQXlJLElBQUUsRUFBRSxRQUFRLFVBQVUsT0FBTyxNQUFNLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQywyQkFBMkI7QUFBQSxFQUMxRixVQUFVLFNBQVMsU0FBUyxjQUE0QztBQUN0RSxRQUFJLE9BQU9ySSxXQUFTUyx5QkFBdUIsSUFBSSxDQUFDO0FBQ2hEa0wsaUJBQVcsWUFBWTtBQUN2QixRQUFJLGNBQWMsVUFBVSxTQUFTLElBQUksVUFBVSxLQUFLO0FBQ3hELFFBQUksTUFBTSxLQUFLO0FBQ2YsUUFBSSxNQUFNLGdCQUFnQixTQUFZLE1BQU1oSCxNQUFJRyxXQUFTLFdBQVcsR0FBRyxHQUFHO0FBQzFFLFFBQUksU0FBUzlFLFdBQVMsWUFBWTtBQUNsQyxXQUFPLGlCQUNILGVBQWUsTUFBTSxRQUFRLEdBQUcsSUFDaEMsTUFBTSxNQUFNLE1BQU0sT0FBTyxRQUFRLEdBQUcsTUFBTTtBQUFBLEVBQy9DO0FBQ0gsQ0FBQztBQ3BDRCxJQUFJLGdCQUFnQlI7QUFDcEIsSUFBSSx1QkFBdUJXO0FBQzNCLElBQUksMkJBQTJCRTtBQUUvQixJQUFBb00sbUJBQWlCLFNBQVUsUUFBUSxLQUFLLE9BQU87QUFDN0MsTUFBSSxjQUFjLGNBQWMsR0FBRztBQUNuQyxNQUFJLGVBQWU7QUFBUSx5QkFBcUIsRUFBRSxRQUFRLGFBQWEseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0FBQUE7QUFDcEcsV0FBTyxlQUFlO0FBQzdCO0FDVEEsSUFBSSxrQkFBa0JqTjtBQUN0QixJQUFJLG9CQUFvQlc7QUFDeEIsSUFBSSxpQkFBaUJFO0FBRXJCLElBQUksU0FBUztBQUNiLElBQUksTUFBTSxLQUFLO0FBRWYsSUFBQSxtQkFBaUIsU0FBVSxHQUFHLE9BQU8sS0FBSztBQUN4QyxNQUFJLFNBQVMsa0JBQWtCLENBQUM7QUFDaEMsTUFBSSxJQUFJLGdCQUFnQixPQUFPLE1BQU07QUFDckMsTUFBSSxNQUFNLGdCQUFnQixRQUFRLFNBQVksU0FBUyxLQUFLLE1BQU07QUFDbEUsTUFBSSxTQUFTLE9BQU8sSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLFdBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQUssbUJBQWUsUUFBUSxHQUFHLEVBQUUsRUFBRTtBQUNqRSxTQUFPLFNBQVM7QUFDaEIsU0FBTztBQUNUO0FDZEEsSUFBSSxRQUFRYjtBQUNaLElBQUlHLFNBQU9RO0FBQ1gsSUFBSUosZ0JBQWNNO0FBQ2xCLElBQUksZ0NBQWdDbUI7QUFDcEMsSUFBSThCLGFBQVdmO0FBQ2YsSUFBSSxvQkFBb0JDO0FBQ3hCLElBQUksV0FBV1U7QUFDZixJQUFJekMsMkJBQXlCMkM7QUFDN0IsSUFBSSxxQkFBcUJzRDtBQUN6QixJQUFJLHFCQUFxQkM7QUFDekIsSUFBSSxXQUFXRTtBQUNmLElBQUk3RyxhQUFXK0c7QUFDZixJQUFJLFlBQVl1QjtBQUNoQixJQUFJLGFBQWFDO0FBQ2pCLElBQUksaUJBQWlCQztBQUNyQixJQUFJLGFBQWFDO0FBQ2pCLElBQUksZ0JBQWdCQztBQUNwQixJQUFJcEosVUFBUXFKO0FBRVosSUFBSSxnQkFBZ0IsY0FBYztBQUNsQyxJQUFJLGFBQWE7QUFDakIsSUFBSSxNQUFNLEtBQUs7QUFDZixJQUFJLFFBQVEsQ0FBRSxFQUFDO0FBQ2YsSUFBSSxPQUFPNUksY0FBWSxJQUFJLElBQUk7QUFDL0IsSUFBSSxPQUFPQSxjQUFZLEtBQUs7QUFDNUIsSUFBSSxjQUFjQSxjQUFZLEdBQUcsS0FBSztBQUl0QyxJQUFJLG9DQUFvQyxDQUFDVCxRQUFNLFdBQVk7QUFFekQsTUFBSSxLQUFLO0FBQ1QsTUFBSSxlQUFlLEdBQUc7QUFDdEIsS0FBRyxPQUFPLFdBQVk7QUFBRSxXQUFPLGFBQWEsTUFBTSxNQUFNLFNBQVM7QUFBQTtBQUNqRSxNQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7QUFDMUIsU0FBTyxPQUFPLFdBQVcsS0FBSyxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU87QUFDbkUsQ0FBQztBQUdELDhCQUE4QixTQUFTLFNBQVUsT0FBTyxhQUFhLGlCQUFpQjtBQUNwRixNQUFJO0FBQ0osTUFDRSxPQUFPLE1BQU0sTUFBTSxFQUFFLE1BQU0sT0FFM0IsT0FBTyxNQUFNLFFBQVEsRUFBRSxFQUFFLFVBQVUsS0FDbkMsS0FBSyxNQUFNLFNBQVMsRUFBRSxVQUFVLEtBQ2hDLElBQUksTUFBTSxVQUFVLEVBQUUsVUFBVSxLQUVoQyxJQUFJLE1BQU0sTUFBTSxFQUFFLFNBQVMsS0FDM0IsR0FBRyxNQUFNLElBQUksRUFBRSxRQUNmO0FBRUEsb0JBQWdCLFNBQVUsV0FBVyxPQUFPO0FBQzFDLFVBQUksU0FBU1UsV0FBU1MseUJBQXVCLElBQUksQ0FBQztBQUNsRCxVQUFJLE1BQU0sVUFBVSxTQUFZLGFBQWEsVUFBVTtBQUN2RCxVQUFJLFFBQVE7QUFBRyxlQUFPO0FBQ3RCLFVBQUksY0FBYztBQUFXLGVBQU8sQ0FBQyxNQUFNO0FBRTNDLFVBQUksQ0FBQyxTQUFTLFNBQVMsR0FBRztBQUN4QixlQUFPZCxPQUFLLGFBQWEsUUFBUSxXQUFXLEdBQUc7QUFBQSxNQUNoRDtBQUNELFVBQUksU0FBUyxDQUFBO0FBQ2IsVUFBSSxTQUFTLFVBQVUsYUFBYSxNQUFNLE9BQzdCLFVBQVUsWUFBWSxNQUFNLE9BQzVCLFVBQVUsVUFBVSxNQUFNLE9BQzFCLFVBQVUsU0FBUyxNQUFNO0FBQ3RDLFVBQUksZ0JBQWdCO0FBRXBCLFVBQUksZ0JBQWdCLElBQUksT0FBTyxVQUFVLFFBQVEsUUFBUSxHQUFHO0FBQzVELFVBQUlrTCxRQUFPLFdBQVc7QUFDdEIsYUFBT0EsU0FBUWxMLE9BQUssWUFBWSxlQUFlLE1BQU0sR0FBRztBQUN0RCxvQkFBWSxjQUFjO0FBQzFCLFlBQUksWUFBWSxlQUFlO0FBQzdCLGVBQUssUUFBUSxZQUFZLFFBQVEsZUFBZWtMLE9BQU0sS0FBSyxDQUFDO0FBQzVELGNBQUlBLE9BQU0sU0FBUyxLQUFLQSxPQUFNLFFBQVEsT0FBTztBQUFRLGtCQUFNLE9BQU8sUUFBUSxXQUFXQSxRQUFPLENBQUMsQ0FBQztBQUM5Rix1QkFBYUEsT0FBTSxHQUFHO0FBQ3RCLDBCQUFnQjtBQUNoQixjQUFJLE9BQU8sVUFBVTtBQUFLO0FBQUEsUUFDM0I7QUFDRCxZQUFJLGNBQWMsY0FBY0EsT0FBTTtBQUFPLHdCQUFjO0FBQUEsTUFDNUQ7QUFDRCxVQUFJLGtCQUFrQixPQUFPLFFBQVE7QUFDbkMsWUFBSSxjQUFjLENBQUMsS0FBSyxlQUFlLEVBQUU7QUFBRyxlQUFLLFFBQVEsRUFBRTtBQUFBLE1BQ25FO0FBQWEsYUFBSyxRQUFRLFlBQVksUUFBUSxhQUFhLENBQUM7QUFDdEQsYUFBTyxPQUFPLFNBQVMsTUFBTSxXQUFXLFFBQVEsR0FBRyxHQUFHLElBQUk7QUFBQSxJQUNoRTtBQUFBLEVBRUEsV0FBYSxJQUFJLE1BQU0sUUFBVyxDQUFDLEVBQUUsUUFBUTtBQUN6QyxvQkFBZ0IsU0FBVSxXQUFXLE9BQU87QUFDMUMsYUFBTyxjQUFjLFVBQWEsVUFBVSxJQUFJLENBQUEsSUFBS2xMLE9BQUssYUFBYSxNQUFNLFdBQVcsS0FBSztBQUFBLElBQ25HO0FBQUEsRUFDQTtBQUFTLG9CQUFnQjtBQUV2QixTQUFPO0FBQUEsSUFHTCxTQUFTK00sT0FBTSxXQUFXLE9BQU87QUFDL0IsVUFBSSxJQUFJak0seUJBQXVCLElBQUk7QUFDbkMsVUFBSSxXQUFXLGtCQUFrQixTQUFTLElBQUksU0FBWSxVQUFVLFdBQVcsS0FBSztBQUNwRixhQUFPLFdBQ0hkLE9BQUssVUFBVSxXQUFXLEdBQUcsS0FBSyxJQUNsQ0EsT0FBSyxlQUFlSyxXQUFTLENBQUMsR0FBRyxXQUFXLEtBQUs7QUFBQSxJQUN0RDtBQUFBLElBTUQsU0FBVSxRQUFRLE9BQU87QUFDdkIsVUFBSSxLQUFLc0QsV0FBUyxJQUFJO0FBQ3RCLFVBQUksSUFBSXRELFdBQVMsTUFBTTtBQUN2QixVQUFJLE1BQU0sZ0JBQWdCLGVBQWUsSUFBSSxHQUFHLE9BQU8sa0JBQWtCLFdBQVc7QUFFcEYsVUFBSSxJQUFJO0FBQU0sZUFBTyxJQUFJO0FBRXpCLFVBQUksSUFBSSxtQkFBbUIsSUFBSSxNQUFNO0FBRXJDLFVBQUksa0JBQWtCLEdBQUc7QUFDekIsVUFBSSxTQUFTLEdBQUcsYUFBYSxNQUFNLE9BQ3RCLEdBQUcsWUFBWSxNQUFNLE9BQ3JCLEdBQUcsVUFBVSxNQUFNLE9BQ25CLGdCQUFnQixNQUFNO0FBSW5DLFVBQUksV0FBVyxJQUFJLEVBQUUsZ0JBQWdCLFNBQVMsR0FBRyxTQUFTLE1BQU0sSUFBSSxLQUFLO0FBQ3pFLFVBQUksTUFBTSxVQUFVLFNBQVksYUFBYSxVQUFVO0FBQ3ZELFVBQUksUUFBUTtBQUFHLGVBQU87QUFDdEIsVUFBSSxFQUFFLFdBQVc7QUFBRyxlQUFPLGVBQWUsVUFBVSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ3hFLFVBQUksSUFBSTtBQUNSLFVBQUksSUFBSTtBQUNSLFVBQUksSUFBSSxDQUFBO0FBQ1IsYUFBTyxJQUFJLEVBQUUsUUFBUTtBQUNuQixpQkFBUyxZQUFZLGdCQUFnQixJQUFJO0FBQ3pDLFlBQUksSUFBSSxlQUFlLFVBQVUsZ0JBQWdCLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQztBQUN0RSxZQUFJO0FBQ0osWUFDRSxNQUFNLFNBQ0wsSUFBSSxJQUFJLFNBQVMsU0FBUyxhQUFhLGdCQUFnQixJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxHQUNoRjtBQUNBLGNBQUksbUJBQW1CLEdBQUcsR0FBRyxlQUFlO0FBQUEsUUFDdEQsT0FBZTtBQUNMLGVBQUssR0FBRyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsY0FBSSxFQUFFLFdBQVc7QUFBSyxtQkFBTztBQUM3QixtQkFBUyxJQUFJLEdBQUcsS0FBSyxFQUFFLFNBQVMsR0FBRyxLQUFLO0FBQ3RDLGlCQUFLLEdBQUcsRUFBRSxFQUFFO0FBQ1osZ0JBQUksRUFBRSxXQUFXO0FBQUsscUJBQU87QUFBQSxVQUM5QjtBQUNELGNBQUksSUFBSTtBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQ0QsV0FBSyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDekIsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNMO0FBQ0EsR0FBRyxDQUFDLG1DQUFtQyxhQUFhO0FDM0pwRCxJQUFBMk0sZ0JBQWlCO0FDRGpCLElBQUk1TSxnQkFBY1A7QUFDbEIsSUFBSWlCLDJCQUF5Qk47QUFDN0IsSUFBSUgsYUFBV0s7QUFDZixJQUFJc00sZ0JBQWNuTDtBQUVsQixJQUFJLFVBQVV6QixjQUFZLEdBQUcsT0FBTztBQUNwQyxJQUFJLGFBQWEsTUFBTTRNLGdCQUFjO0FBQ3JDLElBQUksUUFBUSxPQUFPLE1BQU0sYUFBYSxhQUFhLEdBQUc7QUFDdEQsSUFBSSxRQUFRLE9BQU8sYUFBYSxhQUFhLElBQUk7QUFHakQsSUFBSSxlQUFlLFNBQVUsTUFBTTtBQUNqQyxTQUFPLFNBQVUsT0FBTztBQUN0QixRQUFJLFNBQVMzTSxXQUFTUyx5QkFBdUIsS0FBSyxDQUFDO0FBQ25ELFFBQUksT0FBTztBQUFHLGVBQVMsUUFBUSxRQUFRLE9BQU8sRUFBRTtBQUNoRCxRQUFJLE9BQU87QUFBRyxlQUFTLFFBQVEsUUFBUSxPQUFPLEVBQUU7QUFDaEQsV0FBTztBQUFBLEVBQ1g7QUFDQTtBQUVBLElBQUEsYUFBaUI7QUFBQSxFQUdmLE9BQU8sYUFBYSxDQUFDO0FBQUEsRUFHckIsS0FBSyxhQUFhLENBQUM7QUFBQSxFQUduQixNQUFNLGFBQWEsQ0FBQztBQUN0QjtBQzlCQSxJQUFJMkwseUJBQXVCNU0sYUFBc0M7QUFDakUsSUFBSUYsVUFBUWE7QUFDWixJQUFJLGNBQWNFO0FBRWxCLElBQUksTUFBTTtJQUlWLG1CQUFpQixTQUFVLGFBQWE7QUFDdEMsU0FBT2YsUUFBTSxXQUFZO0FBQ3ZCLFdBQU8sQ0FBQyxDQUFDLFlBQVksYUFBYyxLQUM5QixJQUFJLGFBQVksTUFBTyxPQUN0QjhNLDBCQUF3QixZQUFZLGFBQWEsU0FBUztBQUFBLEVBQ3BFLENBQUc7QUFDSDtBQ2JBLElBQUkvRCxNQUFJN0k7QUFDUixJQUFJLFFBQVFXLFdBQW9DO0FBQ2hELElBQUkseUJBQXlCRTtBQUk3QmdJLElBQUUsRUFBRSxRQUFRLFVBQVUsT0FBTyxNQUFNLFFBQVEsdUJBQXVCLE1BQU0sS0FBSztBQUFBLEVBQzNFLE1BQU0sU0FBUyxPQUFPO0FBQ3BCLFdBQU8sTUFBTSxJQUFJO0FBQUEsRUFDbEI7QUFDSCxDQUFDO0FDVEQsSUFBSUEsTUFBSTdJO0FBQ1IsSUFBSU8sZ0JBQWNJO0FBQ2xCLElBQUksV0FBV0UsY0FBdUM7QUFDdEQsSUFBSSxzQkFBc0JtQjtBQUUxQixJQUFJLGdCQUFnQnpCLGNBQVksR0FBRyxPQUFPO0FBRTFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxjQUFjLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJO0FBQ3ZFLElBQUksZ0JBQWdCLG9CQUFvQixTQUFTO0FBSWpEc0ksSUFBRSxFQUFFLFFBQVEsU0FBUyxPQUFPLE1BQU0sUUFBUSxpQkFBaUIsQ0FBQyxpQkFBaUI7QUFBQSxFQUMzRSxTQUFTLFNBQVNwRCxTQUFRLGVBQXFDO0FBQzdELFFBQUksWUFBWSxVQUFVLFNBQVMsSUFBSSxVQUFVLEtBQUs7QUFDdEQsV0FBTyxnQkFFSCxjQUFjLE1BQU0sZUFBZSxTQUFTLEtBQUssSUFDakQsU0FBUyxNQUFNLGVBQWUsU0FBUztBQUFBLEVBQzVDO0FBQ0gsQ0FBQztBQ3JCRCxJQUFJb0QsTUFBSTdJO0FBQ1IsSUFBSU8sZ0JBQWNJO0FBQ2xCLElBQUksYUFBYUU7QUFDakIsSUFBSSx5QkFBeUJtQjtBQUM3QixJQUFJeEIsWUFBV3VDO0FBQ2YsSUFBSSx1QkFBdUJDO0FBRTNCLElBQUksZ0JBQWdCekMsY0FBWSxHQUFHLE9BQU87QUFJMUNzSSxJQUFFLEVBQUUsUUFBUSxVQUFVLE9BQU8sTUFBTSxRQUFRLENBQUMscUJBQXFCLFVBQVUsS0FBSztBQUFBLEVBQzlFLFVBQVUsU0FBUyxTQUFTLGNBQW1DO0FBQzdELFdBQU8sQ0FBQyxDQUFDLENBQUM7QUFBQSxNQUNSckksVUFBUyx1QkFBdUIsSUFBSSxDQUFDO0FBQUEsTUFDckNBLFVBQVMsV0FBVyxZQUFZLENBQUM7QUFBQSxNQUNqQyxVQUFVLFNBQVMsSUFBSSxVQUFVLEtBQUs7QUFBQSxJQUM1QztBQUFBLEVBQ0c7QUFDSCxDQUFDO0FDcEJELElBQUksVUFBVVI7SUFLZG9OLFlBQWlCLE1BQU0sV0FBVyxTQUFTLFFBQVEsVUFBVTtBQUMzRCxTQUFPLFFBQVEsUUFBUSxLQUFLO0FBQzlCO0FDTkEsSUFBSSxJQUFJcE47QUFDUixJQUFJLGNBQWNXO0FBQ2xCLElBQUl5TSxXQUFVdk07QUFFZCxJQUFJLGdCQUFnQixZQUFZLEdBQUcsT0FBTztBQUMxQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFNaEIsRUFBRSxFQUFFLFFBQVEsU0FBUyxPQUFPLE1BQU0sUUFBUSxPQUFPLElBQUksTUFBTSxPQUFPLEtBQUssUUFBTyxDQUFFLEVBQUMsR0FBSTtBQUFBLEVBQ25GLFNBQVMsU0FBUyxVQUFVO0FBRTFCLFFBQUl1TSxTQUFRLElBQUk7QUFBRyxXQUFLLFNBQVMsS0FBSztBQUN0QyxXQUFPLGNBQWMsSUFBSTtBQUFBLEVBQzFCO0FBQ0gsQ0FBQztBQ2xCRCxJQUFJLE9BQU9wTjtBQUNYLElBQUk4QyxVQUFTbkM7QUFDYixJQUFJLGdCQUFnQkU7QUFDcEIsSUFBSSxjQUFjbUI7QUFFbEIsSUFBSXVKLG9CQUFrQixPQUFPO0lBRTdCLGlCQUFpQixTQUFVLEdBQUc7QUFDNUIsTUFBSSxRQUFRLEVBQUU7QUFDZCxTQUFPLFVBQVUsVUFBYSxFQUFFLFdBQVdBLHNCQUFvQixDQUFDekksUUFBTyxHQUFHLE9BQU8sS0FBSyxjQUFjeUksbUJBQWlCLENBQUMsSUFDbEgsS0FBSyxhQUFhLENBQUMsSUFBSTtBQUM3QjtBQ1ZBLElBQUksdUJBQXVCdkwsYUFBc0M7QUFDakUsSUFBSSxnQkFBZ0JXO0FBQ3BCLElBQUksV0FBV0U7QUFDZixJQUFJLFlBQVltQjtBQUNoQixJQUFJLFFBQVFlO0FBQ1osSUFBSSxpQkFBaUJDO0FBRXJCLElBQUksWUFBWTtBQUNoQixJQUFJLGtCQUFrQixPQUFPO0FBQzdCLElBQUksaUJBQWlCLGdCQUFnQjtBQUVyQyxJQUFJLGNBQWMsTUFBTSxXQUFZO0FBQUUsU0FBTyxlQUFlLEtBQUssRUFBRSxRQUFRLEtBQUssT0FBTyxJQUFHLENBQUUsS0FBSztBQUFTLENBQUE7QUFFMUcsSUFBSSxpQkFBaUIsd0JBQXdCLGVBQWUsUUFBUTtBQUlwRSxJQUFJLGVBQWUsZ0JBQWdCO0FBQ2pDLGdCQUFjLE9BQU8sV0FBVyxXQUFXLFNBQVN4QyxZQUFXO0FBQzdELFFBQUksSUFBSSxTQUFTLElBQUk7QUFDckIsUUFBSSxVQUFVLFVBQVUsRUFBRSxNQUFNO0FBQ2hDLFFBQUksUUFBUSxVQUFVLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLFdBQU8sTUFBTSxVQUFVLE1BQU07QUFBQSxFQUNqQyxHQUFLLEVBQUUsUUFBUSxLQUFJLENBQUU7QUFDckI7QUNFQSxTQUFTLFlBQVk7QUFDbkIsTUFBSTtBQUFBLElBQ0YsV0FBVztBQUFBLEVBQ1osSUFBRyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDeEUsTUFBSSxTQUFTO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxJQUNqQixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFFWCxhQUFhLE9BQU8sUUFBUTtBQUMxQixhQUFPLElBQUksZ0JBQWdCLE9BQU8sTUFBTTtBQUFBLElBQ3pDO0FBQUEsSUFFRCxZQUFZLEtBQUs7QUFDZixhQUFPLGtCQUFrQixhQUFhO0FBQ3BDLFlBQUksV0FBVyxNQUFNLE1BQU0sR0FBRztBQUM5QixZQUFJLE9BQU8sTUFBTSxTQUFTO0FBQzFCLFlBQUksTUFBTSxNQUFNLGtCQUFrQixJQUFJO0FBQ3RDLGVBQU87QUFBQSxNQUNSLENBQUE7SUFDRjtBQUFBLEVBRUw7QUFFRSxNQUFJLE9BQU8sY0FBYyxlQUFlLE9BQU8sc0JBQXNCLGFBQWE7QUFDaEYsWUFBUSxlQUFlLFFBQVEsV0FBVztBQUFBLEVBQzNDO0FBRUQsU0FBTztBQUNUO0FBVUEsU0FBUyxLQUFLLE1BQU07QUFDbEIsTUFBSTtBQUFBLElBQ0YsV0FBQTZNO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBQUM7QUFBQSxFQUNELElBQUc7QUFDSixTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxJQUNqQixhQUFhO0FBQUEsSUFDYixXQUFBRDtBQUFBLElBQ0EsT0FBQUM7QUFBQSxJQUNBLGNBQWMsT0FBTztBQUFBLElBQ3JCLGFBQWEsT0FBTztBQUFBLEVBQ3hCO0FBQ0E7QUFFRyxJQUFDLFFBQXFCLHVCQUFPLE9BQU87QUFBQSxFQUN0QyxXQUFXO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFDRCxDQUFDO0FBT0QsU0FBUyxlQUFlLEtBQUs7QUFDM0IsU0FBTyxJQUFJLFFBQVEsbUJBQW1CLEdBQUc7QUFDM0M7QUFPQSxTQUFTLFNBQVMsS0FBSztBQUNyQixTQUFPLElBQUksUUFBUSxhQUFhLEVBQUU7QUFDcEM7QUFPQSxTQUFTLFVBQVUsS0FBSztBQUN0QixTQUFPLElBQUksUUFBUSxhQUFhLEVBQUU7QUFDcEM7QUFPQSxTQUFTLFVBQVUsS0FBSztBQUN0QixNQUFJLFdBQVcsT0FBTyxJQUFJLE1BQU0sb0RBQW9ELEtBQUs7QUFDekYsU0FBTyxRQUFRLElBQUksVUFBVTtBQUMvQjtBQUVBLElBQUksZUFBZTtBQU9uQixTQUFTLHVCQUF1QixNQUFNO0FBQ3BDLE1BQUksYUFBYSxLQUFLLElBQUksR0FBRztBQUMzQixXQUFPLEtBQUs7RUFDYjtBQUVELFNBQU87QUFDVDtBQU9BLFNBQVMsaUJBQWlCLEtBQUs7QUFLN0IsTUFBSSxXQUFXLHlDQUF5QyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ3JFLFNBQU8sU0FBUyxNQUFNLFNBQVMsTUFBTSxTQUFTO0FBQ2hEO0FBT0EsU0FBUyxlQUFlLE9BQU87QUFDN0IsTUFBSSxDQUFDLE1BQU0sV0FBVyxLQUFLLEdBQUc7QUFDNUIsV0FBTztBQUFBLEVBQ1I7QUFFRCxNQUFJLFdBQVc7QUFDZixNQUFJLGtCQUFrQixNQUFNLFFBQVEsZ0JBQWdCLENBQUMsS0FBSyxZQUFZLGNBQWMsVUFBVSxPQUFPLEtBQUssTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRztBQUN2SSxTQUFPO0FBQ1Q7QUFHQSxJQUFJLGlCQUFpQjtBQUNyQixJQUFJLFVBQVU7QUFDZCxJQUFJLGFBQWE7QUFDakIsSUFBSSxxQkFBcUI7QUFDekIsSUFBSSwrQkFBK0I7QUFDbkMsSUFBSSxtQkFBbUI7QUFDdkIsSUFBSSxlQUFlO0FBRW5CLFNBQVMsa0JBQWtCLFVBQVUsT0FBTztBQUMxQyxNQUFJLFVBQVUsTUFBTSxLQUFLLFFBQVE7QUFFakMsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDcEI7QUFFRCxTQUFPLENBQUMsU0FBUyxRQUFRLE9BQU8sR0FBRyxHQUFHLFFBQVEsTUFBTTtBQUN0RDtBQVFBLFNBQVMsdUJBQXVCLFVBQVU7QUFDeEMsTUFBSSxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDMUIsTUFBSSxrQkFBa0IsU0FBUyxRQUFRLG9CQUFvQixVQUFVLEVBQUUsUUFBUSxjQUFjLEdBQUc7QUFDaEcsTUFBSSxRQUFRO0FBQ1osR0FBQyxpQkFBaUIsS0FBSyxJQUFJLGtCQUFrQixpQkFBaUIsY0FBYztBQUM1RSxjQUFZLE1BQU07QUFDbEIsR0FBQyxpQkFBaUIsS0FBSyxJQUFJLGtCQUFrQixpQkFBaUIsT0FBTztBQUNyRSxjQUFZLE1BQU07QUFDbEIsR0FBQyxpQkFBaUIsS0FBSyxJQUFJLGtCQUFrQixpQkFBaUIsVUFBVTtBQUN4RSxjQUFZLE1BQU07QUFDbEIsR0FBQyxpQkFBaUIsS0FBSyxJQUFJLGtCQUFrQixpQkFBaUIsa0JBQWtCO0FBQ2hGLGNBQVksTUFBTTtBQUNsQixHQUFDLGlCQUFpQixLQUFLLElBQUksa0JBQWtCLGlCQUFpQiw0QkFBNEI7QUFDMUYsY0FBWSxNQUFNO0FBQ2xCLEdBQUMsaUJBQWlCLEtBQUssSUFBSSxrQkFBa0IsaUJBQWlCLGdCQUFnQjtBQUM5RSxjQUFZLE1BQU07QUFDbEIsb0JBQWtCLGdCQUFnQixRQUFRLGFBQWEsR0FBRyxFQUFFLFFBQVEsU0FBUyxHQUFHO0FBQ2hGLEdBQUMsaUJBQWlCLEtBQUssSUFBSSxrQkFBa0IsaUJBQWlCLFlBQVk7QUFFMUUsY0FBWSxNQUFNO0FBQ2xCLFNBQU8sWUFBWSxLQUFLLEVBQUU7QUFDNUI7QUFFRyxJQUFDLGNBQWM7QUFPbEIsU0FBUyxnQkFBZ0IsR0FBRztBQUMxQixTQUFPLEtBQUssS0FBSyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RDtBQVFBLFNBQVMsYUFBYSxHQUFHLEdBQUc7QUFDMUIsVUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztBQUM5RTtBQVFBLFNBQVMsYUFBYSxHQUFHLEdBQUc7QUFDMUIsVUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQzVFO0FBQ0EsU0FBUyxJQUFJLEdBQUc7QUFDZCxTQUFPLElBQUksSUFBSTtBQUNqQjtBQUNBLFNBQVMsSUFBSSxHQUFHO0FBQ2QsU0FBTyxJQUFJLElBQUksS0FBSyxJQUFJO0FBQzFCO0FBQ0EsU0FBUyxJQUFJLEdBQUc7QUFDZCxTQUFPLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSTtBQUNoQztBQUNBLFNBQVMsSUFBSSxHQUFHO0FBQ2QsVUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUk7QUFDbEM7QUFDQSxTQUFTLElBQUksR0FBRztBQUNkLFNBQU8sSUFBSTtBQUNiO0FBQ0EsU0FBUyxJQUFJLEdBQUc7QUFDZCxTQUFPLElBQUksS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsU0FBUyxJQUFJLEdBQUc7QUFDZCxVQUFRLElBQUksTUFBTSxJQUFJO0FBQ3hCO0FBRUEsTUFBTSxTQUFTO0FBQUEsRUFDYixZQUFZakssV0FBVSxNQUFNLE9BQU87QUFDakMsU0FBSyxXQUFXQTtBQUNoQixTQUFLLE9BQU87QUFDWixTQUFLLFFBQVE7QUFDYixTQUFLLG9CQUFvQjtBQUFBLEVBQzFCO0FBQUEsRUFFRCxPQUFPLE1BQU1BLFdBQVU7QUFDckIsV0FBTyxJQUFJLFNBQVNBLFdBQVUsU0FBUyxFQUFFO0FBQUEsRUFDMUM7QUFBQSxFQUVELFFBQVE7QUFDTixRQUFJLFlBQVksVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQ3BGLFFBQUk7QUFBQSxNQUNGLFVBQUFBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sZUFBZSxLQUFLLFVBQVcsQ0FBQSxFQUFFLEtBQU0sRUFBQyxNQUFNLFNBQVMsRUFBRSxJQUFJLFdBQVMsSUFBSSxTQUFTQSxXQUFVLE1BQU0sS0FBSyxDQUFDO0FBQUEsRUFDakg7QUFBQSxFQUVELFNBQVMsYUFBYTtBQUNwQixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sVUFBVSxRQUFRLFVBQVUsT0FBTyxlQUFlLFVBQVUsTUFBTSxPQUFPLFVBQVU7QUFBQSxFQUMzRjtBQUFBLEVBRUQsU0FBUyxRQUFRO0FBQ2YsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFNBQVMsT0FBTyxVQUFVO0FBRTlCLFFBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtBQUN0QixhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sT0FBTyxLQUFLLEtBQUs7QUFBQSxFQUN6QjtBQUFBLEVBRUQsa0JBQWtCO0FBQ2hCLFdBQU8sS0FBSyxTQUFTLFFBQVE7QUFBQSxFQUM5QjtBQUFBLEVBRUQsV0FBVztBQUNULFFBQUksQ0FBQyxLQUFLLFlBQVk7QUFDcEIsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLFdBQVcsS0FBSztBQUVwQixZQUFRO0FBQUEsV0FDRCxTQUFTLFNBQVMsSUFBSTtBQUFBLFdBQ3RCLFdBQVcsS0FBSyxRQUFRO0FBQzNCLGVBQU87QUFBQTtBQUdQLGVBQU87QUFBQTtBQUFBLEVBRVo7QUFBQSxFQUVELFNBQVMsT0FBTztBQUNkLFNBQUssUUFBUTtBQUNiLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxTQUFTLEtBQUs7QUFDWixRQUFJLE9BQU8sUUFBUSxlQUFlLEtBQUssU0FBUSxHQUFJO0FBQ2pELGFBQU8sS0FBSztBQUFBLElBQ2I7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsVUFBVSxLQUFLO0FBQ2IsUUFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixVQUFJLE9BQU8sUUFBUSxhQUFhO0FBQzlCLGVBQU87QUFBQSxNQUNSO0FBRUQsYUFBTyxXQUFXLEdBQUc7QUFBQSxJQUN0QjtBQUVELFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxJQUFJLFdBQVcsS0FBSztBQUV4QixRQUFJLEtBQUssU0FBUyxJQUFJLEdBQUc7QUFDdkIsV0FBSztBQUFBLElBQ047QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsVUFBVSxLQUFLO0FBQ2IsUUFBSSxPQUFPLFFBQVEsZUFBZSxLQUFLLFNBQVEsR0FBSTtBQUNqRCxhQUFPLE9BQU8sS0FBSyxVQUFVLGNBQWMsS0FBSyxPQUFPLEtBQUssS0FBSztBQUFBLElBQ2xFO0FBRUQsV0FBTyxPQUFPLEdBQUc7QUFBQSxFQUNsQjtBQUFBLEVBRUQsU0FBUyxLQUFLO0FBQ1osUUFBSSxRQUFRLEtBQUssVUFBVSxHQUFHO0FBRTlCLFFBQUksS0FBSyxtQkFBbUI7QUFDMUIsYUFBTztBQUFBLElBQ1I7QUFFRCxTQUFLLG9CQUFvQjtBQUN6QixZQUFRLGVBQWUsS0FBSztBQUM1QixTQUFLLFFBQVE7QUFDYixXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsU0FBUztBQUNQLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxTQUFTO0FBQ1AsV0FBTyxLQUFLLFNBQVM7QUFBQSxFQUN0QjtBQUFBLEVBRUQsUUFBUTtBQUNOLFdBQU8sS0FBSyxTQUFTO0FBQUEsRUFDdEI7QUFBQSxFQUVELFdBQVc7QUFDVCxXQUFPLEtBQUssVUFBVyxFQUFDLFFBQVEsWUFBWSxFQUFFO0FBQUEsRUFDL0M7QUFBQSxFQUVELFVBQVUsa0JBQWtCO0FBQzFCLFFBQUksaUJBQWlCLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUV6RixRQUFJLENBQUMsS0FBSyxZQUFZO0FBQ3BCLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxDQUFDLE1BQU0sVUFBVSxJQUFJLE9BQU8scUJBQXFCLFlBQVksQ0FBQyxRQUFXLGdCQUFnQixJQUFJLENBQUMsZ0JBQWdCO0FBQ2xILFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDTixJQUFRLEtBQUssU0FBUztBQUVsQixZQUFRO0FBQUEsV0FDRCxLQUFLLFNBQVMsT0FBTztBQUN4QixlQUFPLEtBQUssVUFBUyxJQUFLLE1BQVEsS0FBSyxJQUFJLFNBQVMsWUFBWSxHQUFHLEdBQUcsU0FBUyxZQUFZLEdBQUcsQ0FBQztBQUFBLFdBRTVGLEtBQUssU0FBUyxPQUFPO0FBQ3hCLGVBQU8sS0FBSyxVQUFTLElBQUssTUFBUSxLQUFLLElBQUksU0FBUyxZQUFZLEdBQUcsR0FBRyxTQUFTLFlBQVksR0FBRyxDQUFDO0FBQUEsV0FFNUYsS0FBSyxTQUFTLEtBQUs7QUFDdEIsZUFBTyxLQUFLLGNBQWMsTUFBUSxTQUFTLFlBQVksR0FBRztBQUFBLFdBRXZELEtBQUssU0FBUyxLQUFLO0FBQ3RCLGVBQU8sS0FBSyxjQUFjLE1BQVEsU0FBUyxZQUFZLEdBQUc7QUFBQSxXQUV2RCxLQUFLLFNBQVMsTUFBTTtBQUN2QixlQUFPLEtBQUssVUFBUyxJQUFLLEtBQUssT0FBTTtBQUFBLFdBRWxDLEtBQUssU0FBUyxLQUFLO0FBQ3RCLGVBQU8sS0FBSyxVQUFTLElBQUssS0FBSyxNQUFLO0FBQUEsV0FFakMsS0FBSyxTQUFTLEtBQUs7QUFDdEIsZUFBTyxLQUFLLFVBQVcsSUFBRyxLQUFLLE1BQUssSUFBSztBQUFBLFdBRXRDLEtBQUssU0FBUyxLQUFLO0FBQ3RCLGVBQU8sS0FBSztXQUVULEtBQUssU0FBUyxLQUFLO0FBQ3RCLGVBQU8sS0FBSyxjQUFjLEtBQUssWUFBWSxJQUFNO0FBQUEsV0FFOUMsS0FBSyxTQUFTLEtBQUs7QUFDdEIsZUFBTyxLQUFLLFVBQVcsSUFBRztBQUFBLFdBRXZCLEtBQUssU0FBUyxLQUFLO0FBQ3RCLGVBQU8sS0FBSyxVQUFXLElBQUcsS0FBSyxPQUFNLElBQUs7QUFBQSxXQUV2QyxLQUFLLFNBQVMsS0FBSztBQUN0QixlQUFPLEtBQUssVUFBVyxJQUFHLEtBQUssT0FBTSxJQUFLO0FBQUEsV0FFdkMsS0FBSyxTQUFTLEtBQUs7QUFDdEIsZUFBTyxLQUFLLFVBQVMsSUFBSyxLQUFLLE9BQU07QUFBQSxZQUVsQyxLQUFLLFNBQVMsSUFBSSxLQUFLO0FBQzFCLGVBQU8sS0FBSyxVQUFTLElBQUssS0FBSyxNQUFLO0FBQUEsV0FFakMsS0FBSyxTQUFTLElBQUk7QUFDckIsZUFBTyxLQUFLLFVBQVcsSUFBRyxTQUFTLFlBQVksSUFBSTtBQUFBLGVBR25EO0FBQ0UsWUFBSSxJQUFJLEtBQUs7QUFFYixZQUFJLGtCQUFrQixJQUFJLEdBQUs7QUFDN0IsaUJBQU8sSUFBSSxTQUFTLFlBQVksSUFBSTtBQUFBLFFBQ3JDO0FBRUQsZUFBTztBQUFBLE1BQ1I7QUFBQTtBQUFBLEVBRU47QUFBQSxFQUVELGtCQUFrQjtBQUNoQixRQUFJLENBQUMsS0FBSyxZQUFZO0FBQ3BCLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3hCLGFBQU8sS0FBSztJQUNiO0FBRUQsV0FBTyxLQUFLLFVBQVcsSUFBRztBQUFBLEVBQzNCO0FBQUEsRUFFRCxhQUFhO0FBQ1gsUUFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixhQUFPO0FBQUEsSUFDUjtBQUVELFlBQVE7QUFBQSxXQUNELEtBQUssU0FBUyxNQUFNO0FBQ3ZCLGVBQU8sS0FBSyxVQUFXLEtBQUksS0FBSyxLQUFLO0FBQUEsV0FFbEMsS0FBSyxTQUFTLE9BQU87QUFDeEIsZUFBTyxLQUFLLFVBQVcsS0FBSSxLQUFLLEtBQUs7QUFBQSxXQUVsQyxLQUFLLFNBQVMsTUFBTTtBQUN2QixlQUFPLEtBQUs7O0FBR1osZUFBTyxLQUFLLFVBQVcsS0FBSSxLQUFLLEtBQUs7QUFBQTtBQUFBLEVBRTFDO0FBQUEsRUFFRCxnQkFBZ0I7QUFDZCxRQUFJLFdBQVcsS0FBSztBQUNwQixRQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVE7QUFFckMsUUFBSSxNQUFNO0FBQ1IsYUFBTyxLQUFLO0FBQUEsSUFDYjtBQUVELFFBQUksQ0FBQyxNQUFNO0FBQ1QsYUFBTztBQUFBLElBQ1I7QUFFRCxXQUFPLEtBQUssU0FBUyxZQUFZO0FBQUEsRUFDbEM7QUFBQSxFQUVELHVCQUF1QixTQUFTLFNBQVM7QUFDdkMsUUFBSSxNQUFNLEtBQUs7QUFFZixRQUFJLENBQUMsS0FBSztBQUNSLGFBQU87QUFBQSxJQUNSO0FBR0QsUUFBSSxPQUFPLElBQUksbUJBQW1CLFlBQVk7QUFDNUMsYUFBTyxJQUFJLGVBQWUsS0FBSyxTQUFTLEtBQUssU0FBUyxPQUFPO0FBQUEsSUFDOUQ7QUFHRCxRQUFJLE9BQU8sSUFBSSxrQkFBa0IsWUFBWTtBQUMzQyxVQUFJLElBQUksbUJBQW1CLFlBQVk7QUFDckMsWUFBSSxtQkFBbUIsSUFBSSxhQUFhLGtCQUFrQjtBQUMxRCxjQUFNLElBQUksaUJBQWtCLEVBQUMsY0FBYTtBQUUxQyxZQUFJLGlCQUFpQixZQUFZO0FBQy9CLGNBQUksYUFBYSxvQkFBb0IsSUFBSSxFQUFFLFNBQVMsaUJBQWlCLEtBQUs7QUFBQSxRQUMzRTtBQUFBLE1BQ0Y7QUFFRCxhQUFPLElBQUksY0FBYyxLQUFLLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFBQSxJQUM3RDtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxrQkFBa0I7QUFDaEIsUUFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sU0FBUyxvQkFBb0IsS0FBSyxVQUFXO0FBQUEsRUFDckQ7QUFBQSxFQUVELFdBQVcsU0FBUztBQUNsQixRQUFJLFFBQVEsS0FBSztBQUNqQixRQUFJLE1BQU0sTUFBTTtBQUNoQixRQUFJLFNBQVM7QUFFYixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixVQUFJLE1BQU0sT0FBTyxLQUFLO0FBQ3BCO0FBQUEsTUFDRDtBQUVELFVBQUksV0FBVyxHQUFHO0FBQ2hCO0FBQUEsTUFDRDtBQUFBLElBQ0Y7QUFFRCxRQUFJLFFBQVEsY0FBYyxLQUFLLFNBQVUsS0FBSSxXQUFXLEdBQUc7QUFDekQsVUFBSSxRQUFRLElBQUksU0FBUyxLQUFLO0FBRTlCLFVBQUksTUFBTSxJQUFJO0FBQ1osY0FBTSxRQUFRLFFBQVE7QUFDdEIsZ0JBQVEsTUFBTTtNQUNmO0FBQUEsSUFDRjtBQUVELFdBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSztBQUFBLEVBQ3BEO0FBRUg7QUFDQSxTQUFTLHNCQUFzQjtBQUFBLEVBQzdCLFlBQVk7QUFBQSxFQUNaLGVBQWU7QUFBQSxFQUNmLG9CQUFvQjtBQUFBLEVBQ3BCLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLGNBQWM7QUFBQSxFQUNkLG1CQUFtQjtBQUFBLEVBQ25CLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxFQUNkLFdBQVc7QUFBQSxFQUNYLGdCQUFnQjtBQUNsQjtBQUVBLE1BQU0sU0FBUztBQUFBLEVBQ2IsY0FBYztBQUNaLFNBQUssWUFBWTtFQUNsQjtBQUFBLEVBRUQsUUFBUTtBQUNOLFNBQUssWUFBWTtFQUNsQjtBQUFBLEVBRUQsV0FBVyxPQUFPLFFBQVE7QUFDeEIsU0FBSyxVQUFVLEtBQUs7QUFBQSxNQUNsQjtBQUFBLE1BQ0E7QUFBQSxJQUNOLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFFRCxnQkFBZ0I7QUFDZCxTQUFLLFVBQVU7RUFDaEI7QUFBQSxFQUVELGFBQWE7QUFDWCxRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sVUFBVSxVQUFVLFNBQVM7QUFBQSxFQUNyQztBQUFBLEVBRUQsSUFBSSxRQUFRO0FBQ1YsV0FBTyxLQUFLLFdBQVksRUFBQztBQUFBLEVBQzFCO0FBQUEsRUFFRCxJQUFJLFNBQVM7QUFDWCxXQUFPLEtBQUssV0FBWSxFQUFDO0FBQUEsRUFDMUI7QUFBQSxFQUVELFlBQVksR0FBRztBQUNiLFFBQUksT0FBTyxNQUFNLFVBQVU7QUFDekIsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLE1BQU0sS0FBSztBQUNiLGFBQU8sS0FBSztBQUFBLElBQ2I7QUFFRCxRQUFJLE1BQU0sS0FBSztBQUNiLGFBQU8sS0FBSztBQUFBLElBQ2I7QUFFRCxXQUFPLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDbkY7QUFFSDtBQUVBLE1BQU0sTUFBTTtBQUFBLEVBQ1YsWUFBWSxHQUFHLEdBQUc7QUFDaEIsU0FBSyxJQUFJO0FBQ1QsU0FBSyxJQUFJO0FBQUEsRUFDVjtBQUFBLEVBRUQsT0FBTyxNQUFNLE9BQU87QUFDbEIsUUFBSSxlQUFlLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN2RixRQUFJLENBQUMsSUFBSSxjQUFjLElBQUksWUFBWSxJQUFJLFVBQVUsS0FBSztBQUMxRCxXQUFPLElBQUksTUFBTSxHQUFHLENBQUM7QUFBQSxFQUN0QjtBQUFBLEVBRUQsT0FBTyxXQUFXLE9BQU87QUFDdkIsUUFBSSxlQUFlLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN2RixRQUFJLENBQUMsSUFBSSxjQUFjLElBQUksQ0FBQyxJQUFJLFVBQVUsS0FBSztBQUMvQyxXQUFPLElBQUksTUFBTSxHQUFHLENBQUM7QUFBQSxFQUN0QjtBQUFBLEVBRUQsT0FBTyxVQUFVLE1BQU07QUFDckIsUUFBSSxTQUFTLFVBQVUsSUFBSTtBQUMzQixRQUFJLE1BQU0sT0FBTztBQUNqQixRQUFJLGFBQWEsQ0FBQTtBQUVqQixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQy9CLGlCQUFXLEtBQUssSUFBSSxNQUFNLE9BQU8sSUFBSSxPQUFPLElBQUksRUFBRSxDQUFDO0FBQUEsSUFDcEQ7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsUUFBUSxPQUFPO0FBQ2IsV0FBTyxLQUFLLE1BQU0sTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDckQ7QUFBQSxFQUVELGVBQWUsV0FBVztBQUN4QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLEtBQUssSUFBSSxVQUFVLEtBQUssSUFBSSxVQUFVLEtBQUssVUFBVTtBQUN6RCxRQUFJLEtBQUssSUFBSSxVQUFVLEtBQUssSUFBSSxVQUFVLEtBQUssVUFBVTtBQUN6RCxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFBQSxFQUNWO0FBRUg7QUFFQSxNQUFNLE1BQU07QUFBQSxFQUNWLFlBQVksUUFBUTtBQUNsQixTQUFLLFNBQVM7QUFDZCxTQUFLLFVBQVU7QUFDZixTQUFLLFNBQVM7QUFDZCxTQUFLLGdCQUFnQjtBQUVyQixTQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUssSUFBSTtBQUVyQyxTQUFLLGNBQWMsS0FBSyxZQUFZLEtBQUssSUFBSTtBQUFBLEVBQzlDO0FBQUEsRUFFRCxZQUFZO0FBQ1YsV0FBTyxLQUFLO0FBQUEsRUFDYjtBQUFBLEVBRUQsUUFBUTtBQUNOLFFBQUksS0FBSyxTQUFTO0FBQ2hCO0FBQUEsSUFDRDtBQUVELFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFNBQVMsT0FBTyxJQUFJO0FBQ3hCLFdBQU8sVUFBVTtBQUNqQixXQUFPLGNBQWM7QUFDckIsU0FBSyxVQUFVO0FBQUEsRUFDaEI7QUFBQSxFQUVELE9BQU87QUFDTCxRQUFJLENBQUMsS0FBSyxTQUFTO0FBQ2pCO0FBQUEsSUFDRDtBQUVELFFBQUksU0FBUyxLQUFLLE9BQU8sSUFBSTtBQUM3QixTQUFLLFVBQVU7QUFDZixXQUFPLFVBQVU7QUFDakIsV0FBTyxjQUFjO0FBQUEsRUFDdEI7QUFBQSxFQUVELFlBQVk7QUFDVixXQUFPLEtBQUssV0FBVyxLQUFLLE9BQU8sU0FBUztBQUFBLEVBQzdDO0FBQUEsRUFFRCxZQUFZO0FBQ1YsUUFBSSxDQUFDLEtBQUssU0FBUztBQUNqQjtBQUFBLElBQ0Q7QUFFRCxRQUFJO0FBQUEsTUFDRixRQUFRQTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNOLElBQVFBLFVBQVMsSUFBSTtBQUVqQixRQUFJLE9BQU87QUFDVCxZQUFNLFNBQVM7QUFBQSxJQUNoQjtBQUVELFdBQU8sUUFBUSxDQUFDLE1BQU0sTUFBTTtBQUMxQixVQUFJO0FBQUEsUUFDRixLQUFBa0s7QUFBQSxNQUNELElBQUc7QUFDSixVQUFJLFVBQVUsY0FBYztBQUU1QixhQUFPLFNBQVM7QUFDZCxRQUFBQSxLQUFJLE9BQU87QUFDWCxrQkFBVSxRQUFRO0FBQUEsTUFDbkI7QUFBQSxJQUNQLENBQUs7QUFFRCxTQUFLLFNBQVM7QUFDZCxTQUFLLGdCQUFnQjtFQUN0QjtBQUFBLEVBRUQsVUFBVSxTQUFTLEtBQUs7QUFDdEIsUUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLEtBQUs7QUFDekI7QUFBQSxJQUNEO0FBRUQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osV0FBTyxRQUFRLENBQUMsT0FBTyxNQUFNO0FBQzNCLFVBQUk7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0QsSUFBRztBQUVKLFVBQUksQ0FBQyxjQUFjLE1BQU0sSUFBSSxpQkFBaUIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxHQUFHO0FBQ3JFLHNCQUFjLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUVELGlCQUFpQixTQUFTLGFBQWE7QUFDckMsUUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLGFBQWE7QUFDakM7QUFBQSxJQUNEO0FBRUQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osV0FBTyxRQUFRLENBQUMsT0FBTyxNQUFNO0FBQzNCLFVBQUk7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0QsSUFBRztBQUVKLFVBQUksQ0FBQyxjQUFjLE1BQU0sWUFBWSxhQUFhLEdBQUcsQ0FBQyxHQUFHO0FBQ3ZELHNCQUFjLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUVELE1BQU0sR0FBRyxHQUFHO0FBQ1YsUUFBSTtBQUFBLE1BQ0YsUUFBQUM7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUs7QUFDVCxRQUFJLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUMxQixRQUFJLFVBQVUsSUFBSTtBQUVsQixXQUFPLFNBQVM7QUFDZCxZQUFNLEtBQUssUUFBUTtBQUNuQixZQUFNLEtBQUssUUFBUTtBQUNuQixnQkFBVSxRQUFRO0FBQUEsSUFDbkI7QUFFRCxRQUFJQSxRQUFPLFNBQVM7QUFDbEIsWUFBTSxLQUFLQSxRQUFPO0FBQUEsSUFDbkI7QUFFRCxRQUFJQSxRQUFPLFNBQVM7QUFDbEIsWUFBTSxLQUFLQSxRQUFPO0FBQUEsSUFDbkI7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsUUFBUSxPQUFPO0FBQ2IsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUssTUFBTSxNQUFNLFNBQVMsTUFBTSxPQUFPO0FBQzNDLFNBQUssT0FBTyxLQUFLO0FBQUEsTUFDZixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxNQUVBLElBQUksYUFBYTtBQUNmLFlBQUksWUFBWSxTQUFTO0FBQ3ZCLHNCQUFZLFFBQU87QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUVQLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFFRCxZQUFZLE9BQU87QUFDakIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUssTUFBTSxNQUFNLFNBQVMsTUFBTSxPQUFPO0FBQzNDLFNBQUssT0FBTyxLQUFLO0FBQUEsTUFDZixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxNQUVBLElBQUksYUFBYTtBQUNmLFlBQUksWUFBWSxhQUFhO0FBQzNCLHNCQUFZLFlBQVc7QUFBQSxRQUN4QjtBQUFBLE1BQ0Y7QUFBQSxJQUVQLENBQUs7QUFBQSxFQUNGO0FBRUg7QUFFQSxJQUFJLGdCQUFnQixPQUFPLFdBQVcsY0FBYyxTQUFTO0FBQzdELElBQUksaUJBQWlCLE9BQU8sVUFBVSxjQUFjLE1BQU0sS0FBSyxNQUFTLElBQ3RFO0FBQ0YsTUFBTSxPQUFPO0FBQUEsRUFDWCxZQUFZLEtBQUs7QUFDZixRQUFJO0FBQUEsTUFDRixPQUFBRixTQUFRO0FBQUEsTUFDUixRQUFBRSxVQUFTO0FBQUEsSUFDVixJQUFHLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN4RSxTQUFLLE1BQU07QUFDWCxTQUFLLFlBQVk7QUFDakIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxlQUFlO0FBQ3BCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssV0FBVyxJQUFJO0FBQ3BCLFNBQUssUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUMzQixTQUFLLGFBQWE7QUFDbEIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxjQUFjO0FBQ25CLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssYUFBYTtBQUNsQixTQUFLLFNBQVNBO0FBQ2QsU0FBSyxRQUFRRjtBQUFBLEVBQ2Q7QUFBQSxFQUVELEtBQUssU0FBUztBQUNaLFNBQUssTUFBTSxLQUFLLE9BQU87QUFBQSxFQUN4QjtBQUFBLEVBRUQsUUFBUTtBQUVOLFFBQUksQ0FBQyxLQUFLLGNBQWM7QUFDdEIsYUFBTyxRQUFRO0lBQ2hCO0FBRUQsV0FBTyxLQUFLO0FBQUEsRUFDYjtBQUFBLEVBRUQsVUFBVTtBQUNSLFFBQUksS0FBSyxhQUFhO0FBQ3BCLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxjQUFjLEtBQUssTUFBTSxNQUFNLENBQUF0QixPQUFLQSxHQUFDLENBQUU7QUFFM0MsUUFBSSxhQUFhO0FBQ2YsV0FBSyxRQUFRO0FBRWIsVUFBSSxLQUFLLGNBQWM7QUFDckIsYUFBSyxhQUFZO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUQsU0FBSyxjQUFjO0FBQ25CLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxZQUFZLEtBQUs7QUFFZixRQUFJLGNBQWM7QUFDbEIsUUFBSSxVQUFVO0FBQ2QsUUFBSSxXQUFXO0FBQ2YsUUFBSSxhQUFhO0FBQUEsRUFDbEI7QUFBQSxFQUVELFdBQVcsTUFBTTtBQUNmLFFBQUk7QUFBQSxNQUNGLFVBQUEzSTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsSUFDVCxJQUFHO0FBRUosUUFBSSxtQkFBbUIsZUFBZSxXQUFXLEVBQUUsUUFBUSxZQUFZLEVBQUU7QUFFekUsUUFBSSxDQUFDLGtCQUFrQixzQkFBc0IsSUFBSSxpQkFBaUIsTUFBTSxHQUFHO0FBQzNFLFFBQUksUUFBUSxvQkFBb0I7QUFDaEMsUUFBSSxjQUFjLDBCQUEwQjtBQUU1QyxRQUFJLFNBQVMsUUFBUTtBQUNyQixRQUFJLFNBQVMsU0FBUztBQUN0QixRQUFJLFdBQVcsS0FBSyxJQUFJLFFBQVEsTUFBTTtBQUN0QyxRQUFJLFdBQVcsS0FBSyxJQUFJLFFBQVEsTUFBTTtBQUN0QyxRQUFJLG9CQUFvQjtBQUN4QixRQUFJLHFCQUFxQjtBQUV6QixRQUFJLGdCQUFnQixRQUFRO0FBQzFCLDJCQUFxQjtBQUNyQiw0QkFBc0I7QUFBQSxJQUN2QjtBQUVELFFBQUksZ0JBQWdCLFNBQVM7QUFDM0IsMkJBQXFCO0FBQ3JCLDRCQUFzQjtBQUFBLElBQ3ZCO0FBRUQsUUFBSSxXQUFXLElBQUksU0FBU0EsV0FBVSxRQUFRLElBQUk7QUFDbEQsUUFBSSxXQUFXLElBQUksU0FBU0EsV0FBVSxRQUFRLElBQUk7QUFDbEQsUUFBSSxVQUFVLFNBQVMsU0FBVSxLQUFJLFNBQVMsU0FBUTtBQUV0RCxRQUFJLFNBQVM7QUFDWCxVQUFJLFVBQVUsQ0FBQyxXQUFXLFNBQVMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLFNBQVMsVUFBVSxHQUFHLENBQUM7QUFBQSxJQUN2RjtBQUVELFFBQUksTUFBTTtBQUNSLFVBQUksY0FBYyxXQUFXO0FBQzdCLFVBQUksY0FBYyxXQUFXO0FBQzdCLFVBQUksVUFBUztBQUNiLFVBQUksT0FBTyxhQUFhLFdBQVc7QUFDbkMsVUFBSSxPQUFPLE9BQU8sV0FBVztBQUM3QixVQUFJLE9BQU8sT0FBTyxNQUFNO0FBQ3hCLFVBQUksT0FBTyxhQUFhLE1BQU07QUFDOUIsVUFBSSxVQUFTO0FBQ2IsVUFBSSxLQUFJO0FBQUEsSUFDVDtBQUVELFFBQUksQ0FBQyxTQUFTO0FBQ1osVUFBSSxhQUFhLGdCQUFnQixVQUFVLGFBQWE7QUFDeEQsVUFBSSxjQUFjLGdCQUFnQixXQUFXLGFBQWE7QUFDMUQsVUFBSSxhQUFhLGdCQUFnQixVQUFVLGFBQWE7QUFDeEQsVUFBSSxjQUFjLGdCQUFnQixXQUFXLGFBQWE7QUFFMUQsVUFBSSxNQUFNLFdBQVcsTUFBTSxNQUFNLGNBQWMsY0FBYztBQUMzRCxZQUFJLFVBQVUsUUFBUSxJQUFNLG9CQUFvQixHQUFLLENBQUM7QUFBQSxNQUN2RDtBQUVELFVBQUksTUFBTSxTQUFTLE1BQU0sTUFBTSxjQUFjLGNBQWM7QUFDekQsWUFBSSxVQUFVLEdBQUcsU0FBUyxJQUFNLHFCQUFxQixDQUFHO0FBQUEsTUFDekQ7QUFFRCxVQUFJLE1BQU0sV0FBVyxNQUFNLE1BQU0sY0FBYyxjQUFjO0FBQzNELFlBQUksVUFBVSxRQUFRLG1CQUFtQixDQUFDO0FBQUEsTUFDM0M7QUFFRCxVQUFJLE1BQU0sU0FBUyxNQUFNLE1BQU0sY0FBYyxjQUFjO0FBQ3pELFlBQUksVUFBVSxHQUFHLFNBQVMsa0JBQWtCO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBR0QsWUFBUTtBQUFBLFdBQ0QsVUFBVTtBQUNiLFlBQUksTUFBTSxRQUFRLE1BQU07QUFDeEI7QUFBQSxXQUVHLGdCQUFnQjtBQUNuQixZQUFJLE1BQU0sVUFBVSxRQUFRO0FBQzVCO0FBQUEsV0FFRyxnQkFBZ0I7QUFDbkIsWUFBSSxNQUFNLFVBQVUsUUFBUTtBQUM1QjtBQUFBO0FBSUosUUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUk7QUFBQSxFQUMzQjtBQUFBLEVBRUQsTUFBTSxTQUFTO0FBQ2IsUUFBSTtBQUFBLE1BQ0YsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIsY0FBYztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN4RSxRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLGdCQUFnQixNQUFPO0FBQzNCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssZUFBZSxJQUFJLFFBQVEsQ0FBQXFGLGFBQVc7QUFDekMsV0FBSyxlQUFlQTtBQUFBLElBQzFCLENBQUs7QUFFRCxRQUFJLEtBQUssV0FBVztBQUNsQixXQUFLLE9BQU8sU0FBUyxrQkFBa0IsYUFBYSxZQUFZLGFBQWEsU0FBUyxPQUFPO0FBQUEsSUFDOUY7QUFFRCxRQUFJLENBQUMsY0FBYztBQUNqQjtBQUFBLElBQ0Q7QUFFRCxRQUFJLE1BQU0sS0FBSztBQUNmLFFBQUlrQixRQUFPO0FBQ1gsUUFBSSxRQUFRO0FBRVosUUFBSSxPQUFPLE1BQU07QUFDZixZQUFNLEtBQUs7QUFDWCxjQUFRLE1BQU1BO0FBRWQsVUFBSSxTQUFTLGVBQWU7QUFDMUIsUUFBQUEsUUFBTyxNQUFNLFFBQVE7QUFFckIsWUFBSSxLQUFLLGFBQWEsaUJBQWlCLFdBQVcsR0FBRztBQUNuRCxlQUFLLE9BQU8sU0FBUyxrQkFBa0IsYUFBYSxZQUFZLGFBQWEsU0FBUyxPQUFPO0FBQzdGLGdCQUFNLFVBQVM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFFRCxXQUFLLGFBQWEsc0JBQXNCLElBQUk7QUFBQSxJQUNsRDtBQUVJLFFBQUksQ0FBQyxhQUFhO0FBQ2hCLFlBQU0sTUFBSztBQUFBLElBQ1o7QUFFRCxTQUFLLGFBQWEsc0JBQXNCLElBQUk7QUFBQSxFQUM3QztBQUFBLEVBRUQsT0FBTztBQUNMLFFBQUksS0FBSyxZQUFZO0FBQ25CLDRCQUFzQixPQUFPLEtBQUssVUFBVTtBQUM1QyxXQUFLLGFBQWE7QUFBQSxJQUNuQjtBQUVELFNBQUssTUFBTTtFQUNaO0FBQUEsRUFFRCxhQUFhLGlCQUFpQixhQUFhO0FBRXpDLFFBQUksQ0FBQyxpQkFBaUI7QUFDcEIsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxNQUNELElBQUc7QUFDSixVQUFJLGVBQWUsS0FBSyxXQUFXLE9BQU8sQ0FBQzZELGVBQWMsY0FBYyxVQUFVLE9BQU8sYUFBYSxLQUFLQSxlQUFjLEtBQUs7QUFFN0gsVUFBSSxjQUFjO0FBQ2hCLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUdELFFBQUksT0FBTyxnQkFBZ0IsY0FBYyxlQUFlO0FBQ3RELGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxDQUFDLEtBQUssZUFBZSxLQUFLLFFBQU8sR0FBSTtBQUN2QyxhQUFPO0FBQUEsSUFDUjtBQUdELFFBQUksS0FBSyxNQUFNLGFBQWE7QUFDMUIsYUFBTztBQUFBLElBQ1I7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsT0FBTyxTQUFTLGtCQUFrQixhQUFhLFlBQVksYUFBYSxTQUFTLFNBQVM7QUFDeEYsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxTQUFTLElBQUk7QUFDakIsYUFBUyxNQUFLO0FBRWQsUUFBSSxPQUFPLFNBQVMsT0FBTyxRQUFRO0FBQ2pDLGVBQVMsV0FBVyxPQUFPLE9BQU8sT0FBTyxNQUFNO0FBQUEsSUFDckQsT0FBVztBQUNMLGVBQVMsV0FBVyxjQUFjLGFBQWE7QUFBQSxJQUNoRDtBQUVELFFBQUksYUFBYSxRQUFRLFNBQVMsT0FBTztBQUN6QyxRQUFJLGNBQWMsUUFBUSxTQUFTLFFBQVE7QUFFM0MsUUFBSSxDQUFDLHFCQUFxQixpQkFBaUIsT0FBTyxlQUFlLFlBQVksT0FBTyxnQkFBZ0IsV0FBVztBQUU3RyxVQUFJLFdBQVcsWUFBWTtBQUN6QixlQUFPLFFBQVEsV0FBVyxVQUFVLEdBQUc7QUFFdkMsWUFBSSxPQUFPLE9BQU87QUFDaEIsaUJBQU8sTUFBTSxRQUFRLEdBQUcsT0FBTyxPQUFPLE9BQU8sSUFBSTtBQUFBLFFBQ2xEO0FBQUEsTUFDRjtBQUVELFVBQUksWUFBWSxZQUFZO0FBQzFCLGVBQU8sU0FBUyxZQUFZLFVBQVUsR0FBRztBQUV6QyxZQUFJLE9BQU8sT0FBTztBQUNoQixpQkFBTyxNQUFNLFNBQVMsR0FBRyxPQUFPLE9BQU8sUUFBUSxJQUFJO0FBQUEsUUFDcEQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELFFBQUksU0FBUyxPQUFPLGVBQWUsT0FBTztBQUMxQyxRQUFJLFVBQVUsT0FBTyxnQkFBZ0IsT0FBTztBQUU1QyxRQUFJLG9CQUFvQixXQUFXLFNBQVUsS0FBSSxZQUFZLFNBQVEsR0FBSTtBQUN2RSxlQUFTLFdBQVcsVUFBVSxHQUFHO0FBQ2pDLGdCQUFVLFlBQVksVUFBVSxHQUFHO0FBQUEsSUFDcEM7QUFFRCxhQUFTLFdBQVcsUUFBUSxPQUFPO0FBRW5DLFFBQUksT0FBTyxZQUFZLFVBQVU7QUFDL0IsY0FBUSxhQUFhLEtBQUssSUFBSSxFQUFFLFNBQVMsT0FBTztBQUFBLElBQ2pEO0FBRUQsUUFBSSxPQUFPLFlBQVksVUFBVTtBQUMvQixjQUFRLGFBQWEsS0FBSyxJQUFJLEVBQUUsU0FBUyxPQUFPO0FBQUEsSUFDakQ7QUFFRCxRQUFJLE9BQU8sZUFBZSxZQUFZLE9BQU8sZ0JBQWdCLFVBQVU7QUFDckUsVUFBSSxVQUFVLFVBQVUsUUFBUSxhQUFhLFNBQVMsRUFBRSxVQUFTLENBQUU7QUFDbkUsVUFBSSxTQUFTO0FBQ2IsVUFBSSxTQUFTO0FBRWIsVUFBSSxPQUFPLGVBQWUsVUFBVTtBQUNsQyxZQUFJLGNBQWMsUUFBUSxTQUFTLE9BQU87QUFFMUMsWUFBSSxZQUFZLFlBQVk7QUFDMUIsbUJBQVMsWUFBWSxVQUFVLEdBQUcsSUFBSTtBQUFBLFFBQ3ZDLFdBQVUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxHQUFHO0FBQzdCLG1CQUFTLFFBQVEsS0FBSztBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUVELFVBQUksT0FBTyxnQkFBZ0IsVUFBVTtBQUNuQyxZQUFJLGVBQWUsUUFBUSxTQUFTLFFBQVE7QUFFNUMsWUFBSSxhQUFhLFlBQVk7QUFDM0IsbUJBQVMsYUFBYSxVQUFVLEdBQUcsSUFBSTtBQUFBLFFBQ3hDLFdBQVUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxHQUFHO0FBQzdCLG1CQUFTLFFBQVEsS0FBSztBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUVELFVBQUksQ0FBQyxRQUFRO0FBQ1gsaUJBQVM7QUFBQSxNQUNWO0FBRUQsVUFBSSxDQUFDLFFBQVE7QUFDWCxpQkFBUztBQUFBLE1BQ1Y7QUFFRCxjQUFRLGFBQWEsU0FBUyxJQUFJLEVBQUUsU0FBUyxVQUFVO0FBQ3ZELGNBQVEsYUFBYSxVQUFVLElBQUksRUFBRSxTQUFTLFdBQVc7QUFDekQsVUFBSSxpQkFBaUIsUUFBUSxTQUFTLGFBQWEsTUFBTSxJQUFJO0FBQzdELHFCQUFlLFNBQVMsR0FBRyxPQUFPLGVBQWUsVUFBUyxHQUFJLFNBQVMsRUFBRSxPQUFPLElBQU0sUUFBUSxJQUFJLEVBQUUsT0FBTyxJQUFNLFFBQVEsR0FBRyxDQUFDO0FBQUEsSUFDOUg7QUFHRCxRQUFJLENBQUMsYUFBYTtBQUNoQixVQUFJLFVBQVUsR0FBRyxHQUFHLFFBQVEsT0FBTztBQUFBLElBQ3BDO0FBRUQsWUFBUSxPQUFPLEdBQUc7QUFFbEIsUUFBSSxlQUFlO0FBQ2pCLFdBQUssZ0JBQWdCO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBRUg7QUFDQSxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGVBQWU7QUFFdEIsSUFBSTtBQUFBLEVBQ0Y7QUFDRixJQUFJO0FBQ0osSUFBSSxtQkFBbUIsT0FBTyxjQUFjLGNBQWMsWUFBWTtBQUN0RSxNQUFNLE9BQU87QUFBQSxFQUNYLGNBQWM7QUFDWixRQUFJO0FBQUEsTUFDRixPQUFBSCxTQUFRO0FBQUEsTUFDUixXQUFBRCxhQUFZO0FBQUEsSUFDYixJQUFHLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN4RSxTQUFLLFFBQVFDO0FBQ2IsU0FBSyxZQUFZRDtBQUFBLEVBQ2xCO0FBQUEsRUFFRCxNQUFNLFVBQVU7QUFDZCxRQUFJLFFBQVE7QUFFWixXQUFPLGtCQUFrQixhQUFhO0FBQ3BDLFVBQUksU0FBUyxXQUFXLEdBQUcsR0FBRztBQUM1QixlQUFPLE1BQU0sZ0JBQWdCLFFBQVE7QUFBQSxNQUN0QztBQUVELGFBQU8sTUFBTSxLQUFLLFFBQVE7QUFBQSxJQUMzQixDQUFBO0VBQ0Y7QUFBQSxFQUVELGdCQUFnQixLQUFLO0FBQ25CLFFBQUksU0FBUyxJQUFJLEtBQUs7QUFFdEIsUUFBSTtBQUNGLGFBQU8sS0FBSyxjQUFjLE9BQU8sZ0JBQWdCLEtBQUssZUFBZSxDQUFDO0FBQUEsSUFDdkUsU0FBUSxLQUFQO0FBQ0EsYUFBTyxLQUFLLGNBQWMsT0FBTyxnQkFBZ0IsS0FBSyxVQUFVLENBQUM7QUFBQSxJQUNsRTtBQUFBLEVBQ0Y7QUFBQSxFQUVELGNBQWNoSyxXQUFVO0FBQ3RCLFFBQUksY0FBY0EsVUFBUyxxQkFBcUIsYUFBYSxFQUFFO0FBRS9ELFFBQUksYUFBYTtBQUNmLFlBQU0sSUFBSSxNQUFNLFlBQVksV0FBVztBQUFBLElBQ3hDO0FBRUQsV0FBT0E7QUFBQSxFQUNSO0FBQUEsRUFFRCxLQUFLLEtBQUs7QUFDUixRQUFJLFNBQVM7QUFFYixXQUFPLGtCQUFrQixhQUFhO0FBQ3BDLFVBQUksV0FBVyxNQUFNLE9BQU8sTUFBTSxHQUFHO0FBQ3JDLFVBQUksTUFBTSxNQUFNLFNBQVM7QUFDekIsYUFBTyxPQUFPLGdCQUFnQixHQUFHO0FBQUEsSUFDbEMsQ0FBQTtFQUNGO0FBRUg7QUFFQSxNQUFNLFVBQVU7QUFBQSxFQUNkLFlBQVkySSxJQUFHLE9BQU87QUFDcEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxRQUFRO0FBQ2IsU0FBSyxRQUFRLE1BQU0sTUFBTSxLQUFLO0FBQUEsRUFDL0I7QUFBQSxFQUVELE1BQU0sS0FBSztBQUNULFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxLQUFLO0FBQ1QsUUFBSSxVQUFVLEtBQUssR0FBSyxLQUFLLENBQUc7QUFBQSxFQUNqQztBQUFBLEVBRUQsUUFBUSxLQUFLO0FBQ1gsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUs7QUFDVCxRQUFJLFVBQVUsS0FBTyxLQUFLLEdBQUssS0FBTyxLQUFLLENBQUc7QUFBQSxFQUMvQztBQUFBLEVBRUQsYUFBYSxPQUFPO0FBQ2xCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxLQUFLO0FBQ1QsVUFBTSxlQUFlLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUssS0FBSyxDQUFHLENBQUM7QUFBQSxFQUN0RDtBQUVIO0FBRUEsTUFBTSxPQUFPO0FBQUEsRUFDWCxZQUFZM0ksV0FBVSxRQUFRLGlCQUFpQjtBQUM3QyxTQUFLLE9BQU87QUFDWixTQUFLLFFBQVE7QUFDYixTQUFLLFVBQVU7QUFDZixTQUFLLFVBQVU7QUFDZixTQUFLLEtBQUs7QUFDVixTQUFLLEtBQUs7QUFDVixRQUFJLFVBQVUsVUFBVSxNQUFNO0FBQzlCLFNBQUssUUFBUSxJQUFJLFNBQVNBLFdBQVUsU0FBUyxRQUFRLEVBQUU7QUFDdkQsU0FBSyxVQUFVLGdCQUFnQjtBQUMvQixTQUFLLFVBQVUsZ0JBQWdCO0FBQy9CLFNBQUssS0FBSyxRQUFRLE1BQU07QUFDeEIsU0FBSyxLQUFLLFFBQVEsTUFBTTtBQUFBLEVBQ3pCO0FBQUEsRUFFRCxNQUFNLEtBQUs7QUFDVCxRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLEtBQUssS0FBSyxRQUFRLFVBQVUsR0FBRztBQUNuQyxRQUFJLEtBQUssS0FBSyxRQUFRLFVBQVUsR0FBRztBQUNuQyxRQUFJLFVBQVUsSUFBSSxFQUFFO0FBQ3BCLFFBQUksT0FBTyxNQUFNLFdBQVksQ0FBQTtBQUM3QixRQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFBLEVBQ3ZCO0FBQUEsRUFFRCxRQUFRLEtBQUs7QUFDWCxRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLEtBQUssS0FBSyxRQUFRLFVBQVUsR0FBRztBQUNuQyxRQUFJLEtBQUssS0FBSyxRQUFRLFVBQVUsR0FBRztBQUNuQyxRQUFJLFVBQVUsSUFBSSxFQUFFO0FBQ3BCLFFBQUksT0FBTyxLQUFPLE1BQU0sV0FBWSxDQUFBO0FBQ3BDLFFBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQUEsRUFDdkI7QUFBQSxFQUVELGFBQWEsT0FBTztBQUNsQixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxNQUFNLE1BQU07QUFDaEIsVUFBTSxlQUFlO0FBQUEsTUFBQztBQUFBLE1BQUc7QUFBQSxNQUFHO0FBQUEsTUFBRztBQUFBLE1BQUcsTUFBTTtBQUFBLE1BQUssTUFBTTtBQUFBLElBQ3ZELENBQUs7QUFDRCxVQUFNLGVBQWUsQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDeEYsVUFBTSxlQUFlO0FBQUEsTUFBQztBQUFBLE1BQUc7QUFBQSxNQUFHO0FBQUEsTUFBRztBQUFBLE1BQUcsQ0FBQyxNQUFNO0FBQUEsTUFBSyxDQUFDLE1BQU07QUFBQSxJQUN6RCxDQUFLO0FBQUEsRUFDRjtBQUVIO0FBRUEsTUFBTSxNQUFNO0FBQUEsRUFDVixZQUFZMkksSUFBRyxPQUFPLGlCQUFpQjtBQUNyQyxTQUFLLE9BQU87QUFDWixTQUFLLFFBQVE7QUFDYixTQUFLLFVBQVU7QUFDZixTQUFLLFVBQVU7QUFDZixRQUFJLFlBQVksTUFBTSxXQUFXLEtBQUs7QUFFdEMsUUFBSSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sR0FBRztBQUMxQyxnQkFBVSxJQUFJO0FBQ2QsZ0JBQVUsSUFBSTtBQUFBLElBQ2Y7QUFFRCxTQUFLLFFBQVE7QUFDYixTQUFLLFVBQVUsZ0JBQWdCO0FBQy9CLFNBQUssVUFBVSxnQkFBZ0I7QUFBQSxFQUNoQztBQUFBLEVBRUQsTUFBTSxLQUFLO0FBQ1QsUUFBSTtBQUFBLE1BQ0YsT0FBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxLQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzlCLFFBQUksS0FBSyxRQUFRLFVBQVUsR0FBRztBQUM5QixRQUFJLFVBQVUsSUFBSSxFQUFFO0FBQ3BCLFFBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFBLEVBQ3ZCO0FBQUEsRUFFRCxRQUFRLEtBQUs7QUFDWCxRQUFJO0FBQUEsTUFDRixPQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLEtBQUssUUFBUSxVQUFVLEdBQUc7QUFDOUIsUUFBSSxLQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzlCLFFBQUksVUFBVSxJQUFJLEVBQUU7QUFDcEIsUUFBSSxNQUFNLElBQU0sR0FBRyxJQUFNLEtBQUssQ0FBQztBQUMvQixRQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFBLEVBQ3ZCO0FBQUEsRUFFRCxhQUFhLE9BQU87QUFDbEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUs7QUFDVCxVQUFNLGVBQWUsQ0FBQyxLQUFLLEdBQUssR0FBRyxHQUFHLEtBQUssR0FBSyxHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ3REO0FBRUg7QUFFQSxNQUFNLE9BQU87QUFBQSxFQUNYLFlBQVlBLElBQUcsUUFBUSxpQkFBaUI7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxVQUFVO0FBQ2YsU0FBSyxVQUFVO0FBQ2YsU0FBSyxTQUFTLFVBQVUsTUFBTTtBQUM5QixTQUFLLFVBQVUsZ0JBQWdCO0FBQy9CLFNBQUssVUFBVSxnQkFBZ0I7QUFBQSxFQUNoQztBQUFBLEVBRUQsTUFBTSxLQUFLO0FBQ1QsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksS0FBSyxRQUFRLFVBQVUsR0FBRztBQUM5QixRQUFJLEtBQUssUUFBUSxVQUFVLEdBQUc7QUFDOUIsUUFBSSxVQUFVLElBQUksRUFBRTtBQUNwQixRQUFJLFVBQVUsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7QUFDOUUsUUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBQSxFQUN2QjtBQUFBLEVBRUQsUUFBUSxLQUFLO0FBQ1gsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksSUFBSSxPQUFPO0FBQ2YsUUFBSSxJQUFJLE9BQU87QUFDZixRQUFJMEIsS0FBSSxPQUFPO0FBQ2YsUUFBSSxJQUFJLE9BQU87QUFDZixRQUFJLElBQUksT0FBTztBQUNmLFFBQUksSUFBSSxPQUFPO0FBQ2YsUUFBSSxJQUFJO0FBQ1IsUUFBSSxJQUFJO0FBQ1IsUUFBSSxJQUFJO0FBQ1IsUUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksS0FBS0EsTUFBSyxJQUFJLElBQUksSUFBSTtBQUM1RSxRQUFJLEtBQUssUUFBUSxVQUFVLEdBQUc7QUFDOUIsUUFBSSxLQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzlCLFFBQUksVUFBVSxJQUFJLEVBQUU7QUFDcEIsUUFBSSxVQUFVLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksT0FBT0EsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSUEsS0FBSSxJQUFJLE9BQU8sSUFBSSxJQUFJQSxLQUFJLElBQUksT0FBT0EsS0FBSSxJQUFJLElBQUksRUFBRTtBQUN0SixRQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUFBLEVBQ3ZCO0FBQUEsRUFFRCxhQUFhLE9BQU87QUFDbEIsVUFBTSxlQUFlLEtBQUssTUFBTTtBQUFBLEVBQ2pDO0FBRUg7QUFFQSxNQUFNLGFBQWEsT0FBTztBQUFBLEVBQ3hCLFlBQVlySyxXQUFVLE1BQU0saUJBQWlCO0FBQzNDLFVBQU1BLFdBQVUsTUFBTSxlQUFlO0FBQ3JDLFNBQUssT0FBTztBQUNaLFNBQUssUUFBUTtBQUNiLFNBQUssUUFBUSxJQUFJLFNBQVNBLFdBQVUsU0FBUyxJQUFJO0FBQUEsRUFDbEQ7QUFFSDtBQUVBLE1BQU0sY0FBYyxLQUFLO0FBQUEsRUFDdkIsWUFBWUEsV0FBVSxNQUFNLGlCQUFpQjtBQUMzQyxVQUFNQSxXQUFVLE1BQU0sZUFBZTtBQUNyQyxTQUFLLE9BQU87QUFDWixTQUFLLFNBQVMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLEtBQUssTUFBTSxXQUFVLENBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hFO0FBRUg7QUFFQSxNQUFNLGNBQWMsS0FBSztBQUFBLEVBQ3ZCLFlBQVlBLFdBQVUsTUFBTSxpQkFBaUI7QUFDM0MsVUFBTUEsV0FBVSxNQUFNLGVBQWU7QUFDckMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxNQUFNLFdBQVUsQ0FBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoRTtBQUVIO0FBRUEsU0FBUyxnQkFBZ0IsV0FBVztBQUNsQyxTQUFPLGVBQWUsU0FBUyxFQUFFLEtBQU0sRUFBQyxRQUFRLGlCQUFpQixNQUFNLEVBQUUsUUFBUSxnQkFBZ0IsSUFBSSxFQUFFLE1BQU0sYUFBYTtBQUM1SDtBQUVBLFNBQVMsZUFBZSxXQUFXO0FBQ2pDLE1BQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxVQUFVLE1BQU0sR0FBRztBQUN2QyxTQUFPLENBQUMsS0FBSyxLQUFJLEdBQUksTUFBTSxLQUFNLEVBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQztBQUNwRDtBQUVBLE1BQU0sVUFBVTtBQUFBLEVBQ2QsWUFBWUEsV0FBVSxXQUFXLGlCQUFpQjtBQUNoRCxTQUFLLFdBQVdBO0FBQ2hCLFNBQUssYUFBYTtBQUNsQixRQUFJc0ssUUFBTyxnQkFBZ0IsU0FBUztBQUNwQyxJQUFBQSxNQUFLLFFBQVEsQ0FBQUMsZUFBYTtBQUN4QixVQUFJQSxlQUFjLFFBQVE7QUFDeEI7QUFBQSxNQUNEO0FBRUQsVUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLGVBQWVBLFVBQVM7QUFDNUMsVUFBSSxnQkFBZ0IsVUFBVSxlQUFlO0FBRTdDLFVBQUksT0FBTyxrQkFBa0IsYUFBYTtBQUN4QyxhQUFLLFdBQVcsS0FBSyxJQUFJLGNBQWMsS0FBSyxVQUFVLE9BQU8sZUFBZSxDQUFDO0FBQUEsTUFDOUU7QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLFlBQVl2SyxXQUFVLFNBQVM7QUFDcEMsUUFBSSxpQkFBaUIsUUFBUSxTQUFTLGFBQWEsT0FBTyxJQUFJO0FBQzlELFFBQUksQ0FBQywwQkFBMEIsMkJBQTJCLHdCQUF3QixJQUFJLFFBQVEsU0FBUyxvQkFBb0IsT0FBTyxJQUFJLEVBQUUsTUFBSztBQUM3SSxRQUFJLGtCQUFrQixDQUFDLDBCQUEwQix3QkFBd0I7QUFFekUsUUFBSSxlQUFlLFlBQVk7QUFDN0IsYUFBTyxJQUFJLFVBQVVBLFdBQVUsZUFBZSxVQUFTLEdBQUksZUFBZTtBQUFBLElBQzNFO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU0sS0FBSztBQUNULFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxNQUFNLFdBQVc7QUFFckIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsaUJBQVcsR0FBRyxNQUFNLEdBQUc7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUVELFFBQVEsS0FBSztBQUNYLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxNQUFNLFdBQVc7QUFFckIsYUFBUyxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSztBQUNqQyxpQkFBVyxHQUFHLFFBQVEsR0FBRztBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUFBLEVBR0QsYUFBYSxPQUFPO0FBQ2xCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxNQUFNLFdBQVc7QUFFckIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsaUJBQVcsR0FBRyxhQUFhLEtBQUs7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFFSDtBQUNBLFVBQVUsaUJBQWlCO0FBQUEsRUFDekIsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUNUO0FBRUEsTUFBTSxRQUFRO0FBQUEsRUFDWixZQUFZQSxXQUFVMEUsT0FBTTtBQUMxQixRQUFJLG1CQUFtQixVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDM0YsU0FBSyxXQUFXMUU7QUFDaEIsU0FBSyxPQUFPMEU7QUFDWixTQUFLLG1CQUFtQjtBQUN4QixTQUFLLGFBQWE7QUFDbEIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxvQkFBb0I7QUFDekIsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxXQUFXO0FBRWhCLFFBQUksQ0FBQ0EsU0FBUUEsTUFBSyxhQUFhLEdBQUc7QUFFaEM7QUFBQSxJQUNEO0FBR0QsVUFBTSxLQUFLQSxNQUFLLFVBQVUsRUFBRSxRQUFRLGVBQWE7QUFDL0MsVUFBSSxXQUFXLHVCQUF1QixVQUFVLFFBQVE7QUFDeEQsV0FBSyxXQUFXLFlBQVksSUFBSSxTQUFTMUUsV0FBVSxVQUFVLFVBQVUsS0FBSztBQUFBLElBQ2xGLENBQUs7QUFDRCxTQUFLLDZCQUE0QjtBQUVqQyxRQUFJLEtBQUssYUFBYSxPQUFPLEVBQUUsU0FBUSxHQUFJO0FBQ3pDLFVBQUksU0FBUyxLQUFLLGFBQWEsT0FBTyxFQUFFLFVBQVcsRUFBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUEySSxPQUFLQSxHQUFFLEtBQU0sQ0FBQTtBQUNoRixhQUFPLFFBQVEsV0FBUztBQUN0QixZQUFJLENBQUMsT0FBTztBQUNWO0FBQUEsUUFDRDtBQUVELFlBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQUEsT0FBS0EsR0FBRSxLQUFNLENBQUE7QUFDdEQsYUFBSyxPQUFPLFFBQVEsSUFBSSxTQUFTM0ksV0FBVSxNQUFNLEtBQUs7QUFBQSxNQUM5RCxDQUFPO0FBQUEsSUFDRjtBQUVELFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHQTtBQUNKLFFBQUlzRSxNQUFLLEtBQUssYUFBYSxJQUFJO0FBRS9CLFFBQUlBLElBQUcsWUFBWTtBQUNqQixVQUFJLENBQUMsWUFBWUEsSUFBRyxVQUFXLElBQUc7QUFDaEMsb0JBQVlBLElBQUcsVUFBVyxLQUFJO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBRUQsVUFBTSxLQUFLSSxNQUFLLFVBQVUsRUFBRSxRQUFRLGVBQWE7QUFDL0MsVUFBSSxVQUFVLGFBQWEsR0FBRztBQUM1QixhQUFLLFNBQVMsU0FBUztBQUFBLE1BQy9CLFdBQWlCLHFCQUFxQixVQUFVLGFBQWEsS0FBSyxVQUFVLGFBQWEsSUFBSTtBQUNyRixZQUFJLFdBQVcxRSxVQUFTLGVBQWUsU0FBUztBQUVoRCxZQUFJLFNBQVMsVUFBVSxTQUFTLEdBQUc7QUFDakMsZUFBSyxTQUFTLFFBQVE7QUFBQSxRQUN2QjtBQUFBLE1BQ0Y7QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFFRCxhQUFhLE1BQU07QUFDakIsUUFBSSxvQkFBb0IsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQzVGLFFBQUksT0FBTyxLQUFLLFdBQVc7QUFFM0IsUUFBSSxDQUFDLFFBQVEsbUJBQW1CO0FBQzlCLFVBQUksUUFBUSxJQUFJLFNBQVMsS0FBSyxVQUFVLE1BQU0sRUFBRTtBQUVoRCxXQUFLLFdBQVcsUUFBUTtBQUN4QixhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sUUFBUSxTQUFTLE1BQU0sS0FBSyxRQUFRO0FBQUEsRUFDNUM7QUFBQSxFQUVELG1CQUFtQjtBQUNqQixhQUFTLE9BQU8sS0FBSyxZQUFZO0FBQy9CLFVBQUksUUFBUSxVQUFVLElBQUksU0FBUyxPQUFPLEdBQUc7QUFDM0MsZUFBTyxLQUFLLFdBQVc7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFRCxXQUFPLFNBQVMsTUFBTSxLQUFLLFFBQVE7QUFBQSxFQUNwQztBQUFBLEVBRUQsU0FBUyxNQUFNO0FBQ2IsUUFBSSxvQkFBb0IsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQzVGLFFBQUksZ0JBQWdCLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUN4RixRQUFJLFFBQVEsS0FBSyxPQUFPO0FBRXhCLFFBQUksT0FBTztBQUNULGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxPQUFPLEtBQUssYUFBYSxJQUFJO0FBRWpDLFFBQUksU0FBUyxRQUFRLFNBQVMsVUFBVSxLQUFLLFlBQVk7QUFDdkQsV0FBSyxPQUFPLFFBQVE7QUFFcEIsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLENBQUMsZUFBZTtBQUNsQixVQUFJO0FBQUEsUUFDRjtBQUFBLE1BQ0QsSUFBRztBQUVKLFVBQUksUUFBUTtBQUNWLFlBQUksY0FBYyxPQUFPLFNBQVMsSUFBSTtBQUV0QyxZQUFJLGdCQUFnQixRQUFRLGdCQUFnQixVQUFVLFlBQVksWUFBWTtBQUM1RSxpQkFBTztBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELFFBQUksbUJBQW1CO0FBQ3JCLFVBQUksU0FBUyxJQUFJLFNBQVMsS0FBSyxVQUFVLE1BQU0sRUFBRTtBQUVqRCxXQUFLLE9BQU8sUUFBUTtBQUNwQixhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sU0FBUyxTQUFTLE1BQU0sS0FBSyxRQUFRO0FBQUEsRUFDN0M7QUFBQSxFQUVELE9BQU8sS0FBSztBQUdWLFFBQUksS0FBSyxTQUFTLFNBQVMsRUFBRSxVQUFTLE1BQU8sVUFBVSxLQUFLLFNBQVMsWUFBWSxFQUFFLFVBQVMsTUFBTyxVQUFVO0FBQzNHO0FBQUEsSUFDRDtBQUVELFFBQUksS0FBSTtBQUVSLFFBQUksS0FBSyxTQUFTLE1BQU0sRUFBRSxTQUFRLEdBQUk7QUFFcEMsVUFBSSxPQUFPLEtBQUssU0FBUyxNQUFNLEVBQUUsY0FBYTtBQUU5QyxVQUFJLE1BQU07QUFDUixhQUFLLGFBQWEsR0FBRztBQUNyQixhQUFLLE1BQU0sS0FBSyxJQUFJO0FBQUEsTUFDckI7QUFBQSxJQUNQLFdBQWUsS0FBSyxTQUFTLFFBQVEsRUFBRSxTQUFTLE1BQU0sTUFBTSxRQUFRO0FBRTlELFVBQUksU0FBUyxLQUFLLFNBQVMsUUFBUSxFQUFFLGNBQWE7QUFFbEQsVUFBSSxRQUFRO0FBQ1YsYUFBSyxhQUFhLEdBQUc7QUFDckIsZUFBTyxNQUFNLEtBQUssSUFBSTtBQUFBLE1BQ3ZCO0FBQUEsSUFDUCxPQUFXO0FBQ0wsV0FBSyxXQUFXLEdBQUc7QUFDbkIsV0FBSyxlQUFlLEdBQUc7QUFDdkIsV0FBSyxhQUFhLEdBQUc7QUFBQSxJQUN0QjtBQUVELFFBQUksUUFBTztBQUFBLEVBQ1o7QUFBQSxFQUVELFdBQVcySSxJQUFHO0FBQUEsRUFDYjtBQUFBLEVBRUQsYUFBYSxLQUFLO0FBRWhCLFFBQUksWUFBWSxVQUFVLFlBQVksS0FBSyxVQUFVLElBQUk7QUFFekQsUUFBSSxXQUFXO0FBQ2IsZ0JBQVUsTUFBTSxHQUFHO0FBQUEsSUFDcEI7QUFHRCxRQUFJLG9CQUFvQixLQUFLLFNBQVMsYUFBYSxPQUFPLElBQUk7QUFFOUQsUUFBSSxrQkFBa0IsWUFBWTtBQUNoQyxVQUFJLE9BQU8sa0JBQWtCO0FBRTdCLFVBQUksTUFBTTtBQUNSLGFBQUssTUFBTSxHQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxhQUFhQSxJQUFHO0FBQUEsRUFDZjtBQUFBLEVBRUQsZUFBZSxLQUFLO0FBQ2xCLFNBQUssU0FBUyxRQUFRLFdBQVM7QUFDN0IsWUFBTSxPQUFPLEdBQUc7QUFBQSxJQUN0QixDQUFLO0FBQUEsRUFDRjtBQUFBLEVBRUQsU0FBUyxXQUFXO0FBQ2xCLFFBQUksUUFBUSxxQkFBcUIsVUFBVSxZQUFZLEtBQUssU0FBUyxjQUFjLFNBQVM7QUFDNUYsVUFBTSxTQUFTO0FBRWYsUUFBSSxDQUFDLFFBQVEsaUJBQWlCLFNBQVMsTUFBTSxJQUFJLEdBQUc7QUFDbEQsV0FBSyxTQUFTLEtBQUssS0FBSztBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBRUQsZ0JBQWdCLFVBQVU7QUFDeEIsUUFBSTtBQUVKLFFBQUk7QUFBQSxNQUNGLE1BQUFqRTtBQUFBLElBQ0QsSUFBRztBQUVKLFFBQUksT0FBT0EsTUFBSyxZQUFZLFlBQVk7QUFDdEMsYUFBT0EsTUFBSyxRQUFRLFFBQVE7QUFBQSxJQUM3QjtBQUVELFFBQUksZ0JBQWdCLHFCQUFxQkEsTUFBSyxrQkFBa0IsUUFBUSx1QkFBdUIsU0FBUyxTQUFTLG1CQUFtQixLQUFLQSxPQUFNLE9BQU87QUFFdEosUUFBSSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSTtBQUN4QyxhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sYUFBYSxNQUFNLEdBQUcsRUFBRSxLQUFLLGdCQUFjLElBQUksT0FBTyxVQUFVLE1BQU0sUUFBUTtBQUFBLEVBQ3RGO0FBQUEsRUFFRCwrQkFBK0I7QUFDN0IsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLEtBQUs7QUFFVCxhQUFTLFlBQVksUUFBUTtBQUMzQixVQUFJLENBQUMsU0FBUyxXQUFXLEdBQUcsS0FBSyxLQUFLLGdCQUFnQixRQUFRLEdBQUc7QUFDL0QsWUFBSSxRQUFRLE9BQU87QUFDbkIsWUFBSSxjQUFjLGtCQUFrQjtBQUVwQyxZQUFJLE9BQU87QUFDVCxtQkFBUyxRQUFRLE9BQU87QUFDdEIsZ0JBQUksc0JBQXNCLEtBQUssa0JBQWtCO0FBRWpELGdCQUFJLE9BQU8sd0JBQXdCLGFBQWE7QUFDOUMsb0NBQXNCO0FBQUEsWUFDdkI7QUFFRCxnQkFBSSxlQUFlLHFCQUFxQjtBQUN0QyxtQkFBSyxPQUFPLFFBQVEsTUFBTTtBQUMxQixtQkFBSyxrQkFBa0IsUUFBUTtBQUFBLFlBQ2hDO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVELGFBQWEsU0FBUyxjQUFjO0FBQ2xDLFFBQUksWUFBWSxhQUFhLE9BQU8sQ0FBQzhGLFlBQVcsU0FBUztBQUN2RCxVQUFJLFlBQVksUUFBUSxTQUFTLElBQUk7QUFFckMsVUFBSSxDQUFDLFVBQVUsWUFBWTtBQUN6QixlQUFPQTtBQUFBLE1BQ1I7QUFFRCxVQUFJLFFBQVEsVUFBVTtBQUN0QixnQkFBVSxTQUFTLEVBQUU7QUFDckIsYUFBTyxDQUFDLEdBQUdBLFlBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQztBQUFBLElBQ3BDLEdBQUUsQ0FBRSxDQUFBO0FBQ0wsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGNBQWMsU0FBUyxRQUFRO0FBQzdCLFdBQU8sUUFBUSxVQUFRO0FBQ3JCLFVBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtBQUNwQixjQUFRLFNBQVMsTUFBTSxJQUFJLEVBQUUsU0FBUyxLQUFLO0FBQUEsSUFDakQsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUVELGVBQWU7QUFDYixRQUFJO0FBRUosYUFBUyxlQUFlLEtBQUssWUFBWSxRQUFRLGlCQUFpQixTQUFTLFNBQVMsYUFBYSxTQUFTLFFBQVEsSUFBSSxPQUFPO0FBQUEsRUFDOUg7QUFFSDtBQUNBLFFBQVEsbUJBQW1CLENBQUMsT0FBTztBQUVuQyxNQUFNLHVCQUF1QixRQUFRO0FBQUEsRUFDbkMsWUFBWXhLLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZ0JBQWdCO0FBQUEsRUFDdkM7QUFFSDtBQUVBLFNBQVMsZUFBZSxZQUFZO0FBQ2xDLE1BQUksVUFBVSxXQUFXO0FBQ3pCLFNBQU8sU0FBUyxLQUFLLE9BQU8sSUFBSSxVQUFVLElBQUssT0FBTyxTQUFTLEdBQUk7QUFDckU7QUFFQSxTQUFTLGtCQUFrQixZQUFZO0FBQ3JDLFNBQU8sT0FBTyxZQUFZLGNBQWMsYUFBYSxXQUFXLEtBQU0sRUFBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLGNBQWMsRUFBRSxLQUFLLEdBQUc7QUFDaEg7QUFRQSxTQUFTLGlCQUFpQixXQUFXO0FBQ25DLE1BQUksQ0FBQyxXQUFXO0FBQ2QsV0FBTztBQUFBLEVBQ1I7QUFFRCxNQUFJLGtCQUFrQixVQUFVLEtBQU0sRUFBQyxZQUFXO0FBRWxELFVBQVE7QUFBQSxTQUNEO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFDSCxhQUFPO0FBQUE7QUFHUCxVQUFJLHlCQUF5QixLQUFLLGVBQWUsR0FBRztBQUNsRCxlQUFPO0FBQUEsTUFDUjtBQUVELGFBQU87QUFBQTtBQUViO0FBUUEsU0FBUyxrQkFBa0IsWUFBWTtBQUNyQyxNQUFJLENBQUMsWUFBWTtBQUNmLFdBQU87QUFBQSxFQUNSO0FBRUQsTUFBSSxtQkFBbUIsV0FBVyxLQUFNLEVBQUMsWUFBVztBQUVwRCxVQUFRO0FBQUEsU0FDRDtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNILGFBQU87QUFBQTtBQUdQLFVBQUksV0FBVyxLQUFLLGdCQUFnQixHQUFHO0FBQ3JDLGVBQU87QUFBQSxNQUNSO0FBRUQsYUFBTztBQUFBO0FBRWI7QUFFQSxNQUFNLEtBQUs7QUFBQSxFQUNULFlBQVksV0FBVyxhQUFhLFlBQVksVUFBVSxZQUFZLFNBQVM7QUFDN0UsUUFBSSxjQUFjLFVBQVUsT0FBTyxZQUFZLFdBQVcsS0FBSyxNQUFNLE9BQU8sSUFBSSxVQUFVO0FBQzFGLFNBQUssYUFBYSxjQUFjLFlBQVk7QUFDNUMsU0FBSyxXQUFXLFlBQVksWUFBWTtBQUN4QyxTQUFLLFlBQVksYUFBYSxZQUFZO0FBQzFDLFNBQUssYUFBYSxjQUFjLFlBQVk7QUFDNUMsU0FBSyxjQUFjLGVBQWUsWUFBWTtBQUFBLEVBQy9DO0FBQUEsRUFFRCxPQUFPLFFBQVE7QUFDYixRQUFJLE9BQU8sVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQy9FLFFBQUksVUFBVSxVQUFVLFNBQVMsSUFBSSxVQUFVLEtBQUs7QUFDcEQsUUFBSSxZQUFZO0FBQ2hCLFFBQUksY0FBYztBQUNsQixRQUFJLGFBQWE7QUFDakIsUUFBSSxXQUFXO0FBQ2YsUUFBSSxhQUFhO0FBQ2pCLFFBQUksUUFBUSxlQUFlLElBQUksRUFBRSxPQUFPLE1BQU0sR0FBRztBQUNqRCxRQUFJdkQsT0FBTTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLElBQ25CO0FBQ0ksVUFBTSxRQUFRLFVBQVE7QUFDcEIsY0FBUTtBQUFBLGNBQ0QsQ0FBQ0EsS0FBSSxhQUFhLEtBQUssT0FBTyxTQUFTLElBQUk7QUFDOUMsY0FBSSxTQUFTLFdBQVc7QUFDdEIsd0JBQVk7QUFBQSxVQUNiO0FBRUQsVUFBQUEsS0FBSSxZQUFZO0FBQ2hCO0FBQUEsY0FFRyxDQUFDQSxLQUFJLGVBQWUsS0FBSyxTQUFTLFNBQVMsSUFBSTtBQUNsRCxjQUFJLFNBQVMsV0FBVztBQUN0QiwwQkFBYztBQUFBLFVBQ2Y7QUFFRCxVQUFBQSxLQUFJLFlBQVk7QUFDaEIsVUFBQUEsS0FBSSxjQUFjO0FBQ2xCO0FBQUEsY0FFRyxDQUFDQSxLQUFJLGNBQWMsS0FBSyxRQUFRLFNBQVMsSUFBSTtBQUNoRCxjQUFJLFNBQVMsV0FBVztBQUN0Qix5QkFBYTtBQUFBLFVBQ2Q7QUFFRCxVQUFBQSxLQUFJLFlBQVk7QUFDaEIsVUFBQUEsS0FBSSxjQUFjO0FBQ2xCLFVBQUFBLEtBQUksYUFBYTtBQUNqQjtBQUFBLGFBRUcsQ0FBQ0EsS0FBSTtBQUNSLGNBQUksU0FBUyxXQUFXO0FBQ3RCLGFBQUMsUUFBUSxJQUFJLEtBQUssTUFBTSxHQUFHO0FBQUEsVUFDNUI7QUFFRCxVQUFBQSxLQUFJLFlBQVk7QUFDaEIsVUFBQUEsS0FBSSxjQUFjO0FBQ2xCLFVBQUFBLEtBQUksYUFBYTtBQUNqQixVQUFBQSxLQUFJLFdBQVc7QUFDZjtBQUFBO0FBR0EsY0FBSSxTQUFTLFdBQVc7QUFDdEIsMEJBQWM7QUFBQSxVQUNmO0FBQUE7QUFBQSxJQUdYLENBQUs7QUFDRCxXQUFPLElBQUksS0FBSyxXQUFXLGFBQWEsWUFBWSxVQUFVLFlBQVksT0FBTztBQUFBLEVBQ2xGO0FBQUEsRUFFRCxXQUFXO0FBQ1QsV0FBTztBQUFBLE1BQUMsaUJBQWlCLEtBQUssU0FBUztBQUFBLE1BQUcsS0FBSztBQUFBLE1BQWEsa0JBQWtCLEtBQUssVUFBVTtBQUFBLE1BQUcsS0FBSztBQUFBLE1BQ3JHLGtCQUFrQixLQUFLLFVBQVU7QUFBQSxJQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7RUFDL0M7QUFFSDtBQUNBLEtBQUssU0FBUztBQUNkLEtBQUssV0FBVztBQUNoQixLQUFLLFVBQVU7QUFFZixNQUFNLFlBQVk7QUFBQSxFQUNoQixjQUFjO0FBQ1osUUFBSSxLQUFLLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxPQUFPO0FBQ3BGLFFBQUksS0FBSyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUssT0FBTztBQUNwRixRQUFJLEtBQUssVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLLE9BQU87QUFDcEYsUUFBSSxLQUFLLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxPQUFPO0FBQ3BGLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssU0FBUyxJQUFJLEVBQUU7QUFDcEIsU0FBSyxTQUFTLElBQUksRUFBRTtBQUFBLEVBQ3JCO0FBQUEsRUFFRCxJQUFJLElBQUk7QUFDTixXQUFPLEtBQUs7QUFBQSxFQUNiO0FBQUEsRUFFRCxJQUFJLElBQUk7QUFDTixXQUFPLEtBQUs7QUFBQSxFQUNiO0FBQUEsRUFFRCxJQUFJLFFBQVE7QUFDVixXQUFPLEtBQUssS0FBSyxLQUFLO0FBQUEsRUFDdkI7QUFBQSxFQUVELElBQUksU0FBUztBQUNYLFdBQU8sS0FBSyxLQUFLLEtBQUs7QUFBQSxFQUN2QjtBQUFBLEVBRUQsU0FBUyxHQUFHLEdBQUc7QUFDYixRQUFJLE9BQU8sTUFBTSxhQUFhO0FBQzVCLFVBQUksTUFBTSxLQUFLLEVBQUUsS0FBSyxNQUFNLEtBQUssRUFBRSxHQUFHO0FBQ3BDLGFBQUssS0FBSztBQUNWLGFBQUssS0FBSztBQUFBLE1BQ1g7QUFFRCxVQUFJLElBQUksS0FBSyxJQUFJO0FBQ2YsYUFBSyxLQUFLO0FBQUEsTUFDWDtBQUVELFVBQUksSUFBSSxLQUFLLElBQUk7QUFDZixhQUFLLEtBQUs7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUVELFFBQUksT0FBTyxNQUFNLGFBQWE7QUFDNUIsVUFBSSxNQUFNLEtBQUssRUFBRSxLQUFLLE1BQU0sS0FBSyxFQUFFLEdBQUc7QUFDcEMsYUFBSyxLQUFLO0FBQ1YsYUFBSyxLQUFLO0FBQUEsTUFDWDtBQUVELFVBQUksSUFBSSxLQUFLLElBQUk7QUFDZixhQUFLLEtBQUs7QUFBQSxNQUNYO0FBRUQsVUFBSSxJQUFJLEtBQUssSUFBSTtBQUNmLGFBQUssS0FBSztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUQsS0FBSyxHQUFHO0FBQ04sU0FBSyxTQUFTLEdBQUcsSUFBSTtBQUFBLEVBQ3RCO0FBQUEsRUFFRCxLQUFLLEdBQUc7QUFDTixTQUFLLFNBQVMsTUFBTSxDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUVELGVBQWUsYUFBYTtBQUMxQixRQUFJLENBQUMsYUFBYTtBQUNoQjtBQUFBLElBQ0Q7QUFFRCxRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFNBQUssU0FBUyxJQUFJLEVBQUU7QUFDcEIsU0FBSyxTQUFTLElBQUksRUFBRTtBQUFBLEVBQ3JCO0FBQUEsRUFFRCxTQUFTLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSTtBQUMxQixXQUFPLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJO0FBQUEsRUFDekg7QUFBQSxFQUVELGVBQWUsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJO0FBQ25DLFFBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUk7QUFDL0IsUUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUk7QUFDeEMsUUFBSWtKLEtBQUksSUFBSSxLQUFLLElBQUk7QUFFckIsUUFBSSxNQUFNLEdBQUc7QUFDWCxVQUFJLE1BQU0sR0FBRztBQUNYO0FBQUEsTUFDRDtBQUVELFVBQUksSUFBSSxDQUFDQSxLQUFJO0FBRWIsVUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHO0FBQ2xCLFlBQUksTUFBTTtBQUNSLGVBQUssS0FBSyxLQUFLLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxRQUNwRCxPQUFlO0FBQ0wsZUFBSyxLQUFLLEtBQUssU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLFFBQzNDO0FBQUEsTUFDRjtBQUVEO0FBQUEsSUFDRDtBQUVELFFBQUksT0FBTyxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksSUFBSUEsS0FBSTtBQUVwQyxRQUFJLE9BQU8sR0FBRztBQUNaO0FBQUEsSUFDRDtBQUVELFFBQUksTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksTUFBTSxJQUFJO0FBRXZDLFFBQUksSUFBSSxNQUFNLEtBQUssR0FBRztBQUNwQixVQUFJLE1BQU07QUFDUixhQUFLLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsTUFDbkQsT0FBYTtBQUNMLGFBQUssS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFFRCxRQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLE1BQU0sSUFBSTtBQUV2QyxRQUFJLElBQUksTUFBTSxLQUFLLEdBQUc7QUFDcEIsVUFBSSxNQUFNO0FBQ1IsYUFBSyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLE1BQ25ELE9BQWE7QUFDTCxhQUFLLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBR0QsZUFBZSxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDckQsU0FBSyxTQUFTLEtBQUssR0FBRztBQUN0QixTQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3RCLFNBQUssZUFBZSxNQUFNLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFDNUMsU0FBSyxlQUFlLE9BQU8sS0FBSyxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzlDO0FBQUEsRUFFRCxrQkFBa0IsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDOUMsUUFBSSxPQUFPLE1BQU0sSUFBSSxLQUFLLE1BQU07QUFFaEMsUUFBSSxPQUFPLE1BQU0sSUFBSSxLQUFLLE1BQU07QUFFaEMsUUFBSSxPQUFPLE9BQU8sSUFBSSxLQUFLLE1BQU07QUFFakMsUUFBSSxPQUFPLE9BQU8sSUFBSSxLQUFLLE1BQU07QUFFakMsU0FBSyxlQUFlLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLEtBQUssR0FBRztBQUFBLEVBQy9EO0FBQUEsRUFFRCxhQUFhLEdBQUcsR0FBRztBQUNqQixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sTUFBTSxLQUFLLEtBQUssTUFBTSxNQUFNLEtBQUssS0FBSztBQUFBLEVBQzlDO0FBRUg7QUFFQSxNQUFNLG1CQUFtQkksRUFBWTtBQUFBLEVBQ25DLFlBQVksTUFBTTtBQUNoQixVQUFNLEtBQ0wsUUFBUSxpQkFBaUIsSUFBSSxFQUM3QixRQUFRLHVDQUF1QyxFQUFFLENBQUM7QUFDbkQsU0FBSyxVQUFVO0FBQ2YsU0FBSyxRQUFRO0FBQ2IsU0FBSyxVQUFVO0FBQ2YsU0FBSyxVQUFVO0FBQ2YsU0FBSyxXQUFXLEtBQUs7QUFDckIsU0FBSyxJQUFJO0FBQ1QsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxTQUFTO0VBQ2Y7QUFBQSxFQUVELFFBQVE7QUFDTixTQUFLLElBQUk7QUFDVCxTQUFLLFVBQVU7QUFDZixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUMzQixTQUFLLFVBQVUsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUM3QixTQUFLLFVBQVUsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUM3QixTQUFLLFNBQVM7QUFDZCxTQUFLLFNBQVM7RUFDZjtBQUFBLEVBRUQsUUFBUTtBQUNOLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sS0FBSyxTQUFTLFNBQVM7QUFBQSxFQUMvQjtBQUFBLEVBRUQsT0FBTztBQUNMLFFBQUksVUFBVSxLQUFLLFNBQVMsRUFBRSxLQUFLO0FBQ25DLFNBQUssa0JBQWtCLEtBQUs7QUFDNUIsU0FBSyxVQUFVO0FBQ2YsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELFdBQVc7QUFDVCxRQUFJLFFBQVEsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQ2hGLFFBQUksUUFBUSxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDaEYsUUFBSSxRQUFRLElBQUksTUFBTSxLQUFLLFFBQVEsUUFBUSxLQUFLLFFBQVEsTUFBTTtBQUM5RCxXQUFPLEtBQUssYUFBYSxLQUFLO0FBQUEsRUFDL0I7QUFBQSxFQUVELGtCQUFrQixPQUFPLE9BQU87QUFDOUIsUUFBSSxRQUFRLEtBQUssU0FBUyxPQUFPLEtBQUs7QUFDdEMsU0FBSyxVQUFVO0FBQ2YsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGtCQUFrQixPQUFPLE9BQU87QUFDOUIsUUFBSSxRQUFRLEtBQUssU0FBUyxPQUFPLEtBQUs7QUFDdEMsU0FBSyxVQUFVO0FBQ2YsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELDJCQUEyQjtBQUN6QixRQUFJLGtCQUFrQixLQUFLLGdCQUFnQjtBQUUzQyxRQUFJLG9CQUFvQkEsRUFBWSxZQUFZLG9CQUFvQkEsRUFBWSxtQkFBbUIsb0JBQW9CQSxFQUFZLFdBQVcsb0JBQW9CQSxFQUFZLGdCQUFnQjtBQUM1TCxhQUFPLEtBQUs7QUFBQSxJQUNiO0FBR0QsUUFBSTtBQUFBLE1BQ0YsU0FBUztBQUFBLFFBQ1AsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0o7QUFBQSxNQUNELFNBQVM7QUFBQSxRQUNQLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNKO0FBQUEsSUFDRixJQUFHO0FBQ0osUUFBSSxRQUFRLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssRUFBRTtBQUM5QyxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsYUFBYSxPQUFPO0FBQ2xCLFFBQUksS0FBSyxRQUFRLFVBQVU7QUFDekIsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDUixJQUFVLEtBQUs7QUFDVCxZQUFNLEtBQUs7QUFDWCxZQUFNLEtBQUs7QUFBQSxJQUNaO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELFVBQVUsT0FBTyxNQUFNLFNBQVM7QUFDOUIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBRUosUUFBSSxXQUFXLE9BQU8sU0FBUyxLQUFLLENBQUMsT0FBTyxPQUFPLFNBQVMsSUFBSTtBQUM5RCxhQUFPLE9BQU8sU0FBUyxLQUFLLE9BQU8sT0FBTyxTQUFTLEdBQUcsUUFBUSxPQUFPO0FBQUEsSUFDdEU7QUFFRCxTQUFLLGVBQWUsT0FBTyxPQUFPLEtBQUssUUFBUSxLQUFLLElBQUksSUFBSTtBQUFBLEVBQzdEO0FBQUEsRUFFRCxlQUFlLE9BQU8sT0FBTztBQUMzQixTQUFLLE9BQU8sS0FBSyxLQUFLO0FBQ3RCLFNBQUssT0FBTyxLQUFLLEtBQUs7QUFBQSxFQUN2QjtBQUFBLEVBRUQsa0JBQWtCO0FBQ2hCLFdBQU8sS0FBSztBQUFBLEVBQ2I7QUFBQSxFQUVELGtCQUFrQjtBQUNoQixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksTUFBTSxPQUFPO0FBRWpCLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLFVBQUksQ0FBQyxPQUFPLElBQUk7QUFDZCxpQkFBUyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUNoQyxjQUFJLE9BQU8sSUFBSTtBQUNiLG1CQUFPLEtBQUssT0FBTztBQUNuQjtBQUFBLFVBQ0Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSx3QkFBd0IsUUFBUTtBQUFBLEVBQ3BDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLHNCQUFzQjtBQUFBLEVBQzVCO0FBQUEsRUFFRCxtQkFBbUI7QUFDakIsUUFBSSxVQUFVO0FBRWQsUUFBSSxVQUFVO0FBRWQsV0FBTyxTQUFTO0FBQ2QsVUFBSSxlQUFlLFFBQVEsU0FBUyxXQUFXLE9BQU8sSUFBSTtBQUUxRCxVQUFJLGFBQWEsU0FBUyxJQUFJLEdBQUc7QUFDL0IsbUJBQVcsYUFBYTtNQUN6QjtBQUVELGdCQUFVLFFBQVE7QUFBQSxJQUNuQjtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxXQUFXLEtBQUs7QUFDZCxRQUFJLGNBQWMsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBRXRGLFFBQUksQ0FBQyxhQUFhO0FBR2hCLFVBQUksZ0JBQWdCLEtBQUssU0FBUyxNQUFNO0FBQ3hDLFVBQUksdUJBQXVCLEtBQUssU0FBUyxjQUFjO0FBQ3ZELFVBQUksa0JBQWtCLEtBQUssU0FBUyxRQUFRO0FBQzVDLFVBQUksb0JBQW9CLEtBQUssU0FBUyxnQkFBZ0I7QUFFdEQsVUFBSSxjQUFjLG1CQUFtQjtBQUNuQyxZQUFJLFlBQVksY0FBYyx1QkFBdUIsTUFBTSxvQkFBb0I7QUFFL0UsWUFBSSxXQUFXO0FBQ2IsY0FBSSxZQUFZO0FBQUEsUUFDakI7QUFBQSxNQUNULFdBQWlCLGNBQWMsWUFBWTtBQUNuQyxZQUFJLGNBQWMsVUFBVyxNQUFLLGdCQUFnQjtBQUNoRCx3QkFBYyxTQUFTLEtBQUssU0FBUyxPQUFPLEVBQUUsU0FBUSxDQUFFO0FBQUEsUUFDekQ7QUFFRCxZQUFJLGFBQWEsY0FBYztBQUUvQixZQUFJLGVBQWUsV0FBVztBQUM1QixjQUFJLFlBQVksZUFBZSxTQUFTLGtCQUFrQjtBQUFBLFFBQzNEO0FBQUEsTUFDRjtBQUVELFVBQUkscUJBQXFCLFlBQVk7QUFDbkMsWUFBSSxjQUFjLElBQUksU0FBUyxLQUFLLFVBQVUsUUFBUSxJQUFJLFNBQVMsRUFBRSxXQUFXLG9CQUFvQixFQUFFLFNBQVE7QUFFOUcsWUFBSSxZQUFZO0FBQUEsTUFDakI7QUFHRCxVQUFJLGdCQUFnQixtQkFBbUI7QUFDckMsWUFBSSxjQUFjLGdCQUFnQix1QkFBdUIsTUFBTSxpQkFBaUI7QUFFaEYsWUFBSSxhQUFhO0FBQ2YsY0FBSSxjQUFjO0FBQUEsUUFDbkI7QUFBQSxNQUNULFdBQWlCLGdCQUFnQixZQUFZO0FBQ3JDLFlBQUksZ0JBQWdCLFVBQVcsTUFBSyxnQkFBZ0I7QUFDbEQsMEJBQWdCLFNBQVMsS0FBSyxTQUFTLE9BQU8sRUFBRSxTQUFRLENBQUU7QUFBQSxRQUMzRDtBQUVELFlBQUksZUFBZSxnQkFBZ0I7QUFFbkMsWUFBSSxpQkFBaUIsV0FBVztBQUM5QixjQUFJLGNBQWMsaUJBQWlCLFNBQVMsa0JBQWtCO0FBQUEsUUFDL0Q7QUFBQSxNQUNGO0FBRUQsVUFBSSxrQkFBa0IsWUFBWTtBQUNoQyxZQUFJLGdCQUFnQixJQUFJLFNBQVMsS0FBSyxVQUFVLFVBQVUsSUFBSSxXQUFXLEVBQUUsV0FBVyxpQkFBaUIsRUFBRSxVQUFTO0FBRWxILFlBQUksY0FBYztBQUFBLE1BQ25CO0FBRUQsVUFBSSx1QkFBdUIsS0FBSyxTQUFTLGNBQWM7QUFFdkQsVUFBSSxxQkFBcUIsWUFBWTtBQUNuQyxZQUFJLGVBQWUscUJBQXFCO0FBQ3hDLFlBQUksWUFBWSxDQUFDLGVBQWUsY0FDOUI7QUFBQSxNQUNIO0FBRUQsVUFBSSx5QkFBeUIsS0FBSyxTQUFTLGdCQUFnQjtBQUMzRCxVQUFJLDBCQUEwQixLQUFLLFNBQVMsaUJBQWlCO0FBQzdELFVBQUksdUJBQXVCLEtBQUssU0FBUyxtQkFBbUI7QUFHNUQsVUFBSSwyQkFBMkIsS0FBSyxTQUFTLGtCQUFrQjtBQUMvRCxVQUFJLHVCQUF1QixLQUFLLFNBQVMsbUJBQW1CO0FBRTVELFVBQUksdUJBQXVCLFlBQVk7QUFDckMsWUFBSSxVQUFVLHVCQUF1QjtNQUN0QztBQUVELFVBQUksd0JBQXdCLFlBQVk7QUFDdEMsWUFBSSxXQUFXLHdCQUF3QjtNQUN4QztBQUVELFVBQUkscUJBQXFCLFlBQVk7QUFDbkMsWUFBSSxhQUFhLHFCQUFxQjtNQUN2QztBQU9ELFVBQUkseUJBQXlCLFNBQVUsS0FBSSx5QkFBeUIsVUFBUyxNQUFPLFFBQVE7QUFDMUYsWUFBSSxPQUFPLFVBQVUseUJBQXlCLFVBQVcsQ0FBQTtBQUV6RCxZQUFJLE9BQU8sSUFBSSxnQkFBZ0IsYUFBYTtBQUMxQyxjQUFJLFlBQVksSUFBSTtBQUFBLFFBQ3JCLFdBQ0ssT0FBTyxJQUFJLG1CQUFtQixhQUFhO0FBRTdDLGNBQUksaUJBQWlCO0FBQUEsUUFDdEIsV0FDSyxPQUFPLElBQUksWUFBWSxlQUFlLEVBQUUsS0FBSyxXQUFXLEtBQUssS0FBSyxPQUFPLElBQUk7QUFFL0UsY0FBSSxVQUFVO0FBQUEsUUFDZjtBQUVMLFlBQUksU0FBUyxxQkFBcUI7QUFFbEMsWUFBSSxPQUFPLElBQUksbUJBQW1CLGFBQWE7QUFDN0MsY0FBSSxpQkFBaUI7QUFBQSxRQUN0QixXQUNLLE9BQU8sSUFBSSx5QkFBeUIsYUFBYTtBQUVuRCxjQUFJLHVCQUF1QjtBQUFBLFFBQzVCLFdBQ0ssT0FBTyxJQUFJLGtCQUFrQixhQUFhO0FBRTVDLGNBQUksZ0JBQWdCO0FBQUEsUUFDckI7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUdELFNBQUssc0JBQXNCO0FBRTNCLFFBQUksT0FBTyxJQUFJLFNBQVMsYUFBYTtBQUNuQyxVQUFJLGdCQUFnQixLQUFLLFNBQVMsTUFBTTtBQUN4QyxVQUFJLHFCQUFxQixLQUFLLFNBQVMsWUFBWTtBQUNuRCxVQUFJLHVCQUF1QixLQUFLLFNBQVMsY0FBYztBQUN2RCxVQUFJLHNCQUFzQixLQUFLLFNBQVMsYUFBYTtBQUNyRCxVQUFJLG9CQUFvQixLQUFLLFNBQVMsV0FBVztBQUNqRCxVQUFJLHNCQUFzQixLQUFLLFNBQVMsYUFBYTtBQUNyRCxVQUFJLE9BQU8sSUFBSSxLQUFLLG1CQUFtQixVQUFTLEdBQUkscUJBQXFCLFVBQVcsR0FBRSxvQkFBb0IsVUFBUyxHQUFJLGtCQUFrQixTQUFVLElBQUcsR0FBRyxPQUFPLGtCQUFrQixVQUFVLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxvQkFBb0IsVUFBUyxHQUFJLEtBQUssTUFBTSxjQUFjLFVBQVcsR0FBRSxJQUFJLElBQUksQ0FBQztBQUMvUix5QkFBbUIsU0FBUyxLQUFLLFNBQVM7QUFDMUMsMkJBQXFCLFNBQVMsS0FBSyxXQUFXO0FBQzlDLDBCQUFvQixTQUFTLEtBQUssVUFBVTtBQUM1Qyx3QkFBa0IsU0FBUyxLQUFLLFFBQVE7QUFDeEMsMEJBQW9CLFNBQVMsS0FBSyxVQUFVO0FBQzVDLFVBQUksT0FBTyxLQUFLO0FBRWhCLFVBQUksa0JBQWtCLFlBQVk7QUFDaEMsYUFBSyxTQUFTLFNBQVMsa0JBQWtCLFVBQVM7QUFDbEQsYUFBSyxzQkFBc0I7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFFRCxRQUFJLENBQUMsYUFBYTtBQUVoQixXQUFLLGFBQWEsR0FBRztBQUVyQixVQUFJLGNBQWMsS0FBSztJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUVELGFBQWEsS0FBSztBQUNoQixVQUFNLGFBQWEsR0FBRztBQUV0QixRQUFJLEtBQUsscUJBQXFCO0FBQzVCLFdBQUssU0FBUztJQUNmO0FBQUEsRUFDRjtBQUVIO0FBRUEsTUFBTSxvQkFBb0IsZ0JBQWdCO0FBQUEsRUFDeEMsWUFBWXpLLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZ0JBQWdCO0FBQ3RDLFNBQUssT0FBTztBQUNaLFNBQUssYUFBYTtBQUNsQixTQUFLLGFBQWEsSUFBSSxXQUFXLEtBQUssYUFBYSxHQUFHLEVBQUUsVUFBUyxDQUFFO0FBQUEsRUFDcEU7QUFBQSxFQUVELEtBQUssS0FBSztBQUNSLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxjQUFjLElBQUk7QUFDdEIsZUFBVyxNQUFLO0FBRWhCLFFBQUksS0FBSztBQUNQLFVBQUksVUFBUztBQUFBLElBQ2Q7QUFFRCxXQUFPLENBQUMsV0FBVyxTQUFTO0FBQzFCLGNBQVEsV0FBVyxLQUFJLEVBQUc7QUFBQSxhQUNuQixXQUFXO0FBQ2QsZUFBSyxNQUFNLEtBQUssV0FBVztBQUMzQjtBQUFBLGFBRUcsV0FBVztBQUNkLGVBQUssTUFBTSxLQUFLLFdBQVc7QUFDM0I7QUFBQSxhQUVHLFdBQVc7QUFDZCxlQUFLLE1BQU0sS0FBSyxXQUFXO0FBQzNCO0FBQUEsYUFFRyxXQUFXO0FBQ2QsZUFBSyxNQUFNLEtBQUssV0FBVztBQUMzQjtBQUFBLGFBRUcsV0FBVztBQUNkLGVBQUssTUFBTSxLQUFLLFdBQVc7QUFDM0I7QUFBQSxhQUVHLFdBQVc7QUFDZCxlQUFLLE1BQU0sS0FBSyxXQUFXO0FBQzNCO0FBQUEsYUFFRyxXQUFXO0FBQ2QsZUFBSyxNQUFNLEtBQUssV0FBVztBQUMzQjtBQUFBLGFBRUcsV0FBVztBQUNkLGVBQUssTUFBTSxLQUFLLFdBQVc7QUFDM0I7QUFBQSxhQUVHLFdBQVc7QUFDZCxlQUFLLE1BQU0sS0FBSyxXQUFXO0FBQzNCO0FBQUEsYUFFRyxXQUFXO0FBQ2QsZUFBSyxNQUFNLEtBQUssV0FBVztBQUMzQjtBQUFBO0FBQUEsSUFFTDtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxlQUFlaUUsSUFBRztBQUNoQixXQUFPLEtBQUs7RUFDYjtBQUFBLEVBRUQsYUFBYTtBQUNYLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxTQUFTLFdBQVc7QUFDeEIsUUFBSSxTQUFTLFdBQVc7QUFDeEIsUUFBSSxVQUFVLE9BQU8sSUFBSSxDQUFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDekQsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGVBQWUsS0FBSztBQUNsQixTQUFLLEtBQUssR0FBRztBQUNiLFNBQUssU0FBUyxPQUFPLE1BQU0sVUFBVSxNQUFNLEdBQUc7QUFDOUMsUUFBSSxvQkFBb0IsS0FBSyxTQUFTLFdBQVc7QUFFakQsUUFBSSxJQUFJLGNBQWMsSUFBSTtBQUN4QixVQUFJLGtCQUFrQixVQUFVLFNBQVMsTUFBTSxXQUFXO0FBQ3hELFlBQUksS0FBSyxrQkFBa0IsVUFBVyxDQUFBO0FBQUEsTUFDOUMsT0FBYTtBQUNMLFlBQUksS0FBSTtBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBRUQsUUFBSSxJQUFJLGdCQUFnQixJQUFJO0FBQzFCLFVBQUksS0FBSyxhQUFhLGVBQWUsRUFBRSxVQUFTLE1BQU8sc0JBQXNCO0FBQzNFLFlBQUksS0FBSTtBQUNSLFlBQUksYUFBYSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNqQyxZQUFJLE9BQU07QUFDVixZQUFJLFFBQU87QUFBQSxNQUNuQixPQUFhO0FBQ0wsWUFBSSxPQUFNO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFFRCxRQUFJLFVBQVUsS0FBSztBQUVuQixRQUFJLFNBQVM7QUFDWCxVQUFJLG1CQUFtQixRQUFRLFNBQVM7QUFDeEMsVUFBSSx1QkFBdUIsS0FBSyxTQUFTLGNBQWM7QUFDdkQsVUFBSSxxQkFBcUIsS0FBSyxTQUFTLFlBQVk7QUFDbkQsVUFBSSxxQkFBcUIsS0FBSyxTQUFTLFlBQVk7QUFFbkQsVUFBSSxxQkFBcUIsbUJBQW1CO0FBQzFDLFlBQUksU0FBUyxxQkFBcUI7QUFDbEMsWUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVE7QUFDN0IsZUFBTyxPQUFPLEtBQUssT0FBTyxLQUFLO0FBQUEsTUFDaEM7QUFFRCxVQUFJLG1CQUFtQixtQkFBbUI7QUFDeEMsWUFBSSxVQUFVLG1CQUFtQjtBQUVqQyxpQkFBUyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsS0FBSztBQUN6QyxjQUFJLENBQUMsUUFBUSxNQUFNLElBQUksUUFBUTtBQUUvQixrQkFBUSxPQUFPLEtBQUssUUFBUSxNQUFNO0FBQUEsUUFDbkM7QUFBQSxNQUNGO0FBRUQsVUFBSSxtQkFBbUIsbUJBQW1CO0FBQ3hDLFlBQUksV0FBVyxtQkFBbUI7QUFFbEMsWUFBSSxDQUFDLFNBQVMsT0FBTyxJQUFJLFFBQVE7QUFFakMsaUJBQVMsT0FBTyxLQUFLLFNBQVMsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVELE9BQU8sTUFBTSxZQUFZO0FBQ3ZCLFFBQUksUUFBUSxXQUFXO0FBQ3ZCLGVBQVcsUUFBUSxXQUFXO0FBQzlCLFdBQU87QUFBQSxNQUNMO0FBQUEsSUFDTjtBQUFBLEVBQ0c7QUFBQSxFQUVELE1BQU0sS0FBSyxhQUFhO0FBQ3RCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osZUFBVyxVQUFVLEtBQUs7QUFDMUIsZ0JBQVksU0FBUyxHQUFHLENBQUM7QUFFekIsUUFBSSxLQUFLO0FBQ1AsVUFBSSxPQUFPLEdBQUcsQ0FBQztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxNQUFNLFlBQVk7QUFDdkIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFFBQVEsV0FBVztBQUN2QixXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osZUFBVyxVQUFVLE9BQU8sT0FBTztBQUNuQyxnQkFBWSxTQUFTLEdBQUcsQ0FBQztBQUV6QixRQUFJLEtBQUs7QUFDUCxVQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLE1BQU0sWUFBWTtBQUN2QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsV0FBVyxRQUFRLElBQUksS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQy9FLGVBQVcsVUFBVTtBQUNyQixXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osZUFBVyxVQUFVLE9BQU8sT0FBTztBQUNuQyxnQkFBWSxTQUFTLEdBQUcsQ0FBQztBQUV6QixRQUFJLEtBQUs7QUFDUCxVQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLE1BQU0sWUFBWTtBQUN2QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFFBQVEsSUFBSSxNQUFNLFFBQVEsSUFBSSxRQUFRLFdBQVcsUUFBUSxJQUFJLEtBQUssUUFBUSxDQUFDO0FBQy9FLGVBQVcsVUFBVTtBQUNyQixXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osZUFBVyxVQUFVLE9BQU8sT0FBTztBQUNuQyxnQkFBWSxTQUFTLEdBQUcsQ0FBQztBQUV6QixRQUFJLEtBQUs7QUFDUCxVQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLE1BQU0sWUFBWTtBQUN2QixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksUUFBUSxXQUFXLFNBQVMsTUFBTSxJQUFJO0FBQzFDLFFBQUksZUFBZSxXQUFXLGtCQUFrQixNQUFNLElBQUk7QUFDMUQsUUFBSSxlQUFlLFdBQVc7QUFDOUIsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxZQUFZLE1BQU0sVUFBVTtBQUNoQyxlQUFXLFVBQVUsY0FBYyxjQUFjLEtBQUs7QUFDdEQsZ0JBQVksZUFBZSxRQUFRLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBRWpJLFFBQUksS0FBSztBQUNQLFVBQUksY0FBYyxNQUFNLEdBQUcsTUFBTSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ25HO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxNQUFNLFlBQVk7QUFDdkIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFFBQVEsV0FBVztBQUN2QixRQUFJLGVBQWUsV0FBVyxrQkFBa0IsTUFBTSxJQUFJO0FBQzFELFFBQUksZUFBZSxXQUFXO0FBQzlCLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDTjtBQUFBLEVBQ0c7QUFBQSxFQUVELE1BQU0sS0FBSyxhQUFhO0FBQ3RCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsZUFBVyxVQUFVLGNBQWMsY0FBYyxLQUFLO0FBQ3RELGdCQUFZLGVBQWUsUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVqSSxRQUFJLEtBQUs7QUFDUCxVQUFJLGNBQWMsTUFBTSxHQUFHLE1BQU0sR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFBQSxJQUNuRztBQUFBLEVBQ0Y7QUFBQSxFQUVELE9BQU8sTUFBTSxZQUFZO0FBQ3ZCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxlQUFlLFdBQVcsa0JBQWtCLE1BQU0sSUFBSTtBQUMxRCxRQUFJLGVBQWUsV0FBVztBQUM5QixXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDTjtBQUFBLEVBQ0c7QUFBQSxFQUVELE1BQU0sS0FBSyxhQUFhO0FBQ3RCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxZQUFZLE1BQU0sVUFBVTtBQUNoQyxlQUFXLFVBQVUsY0FBYyxjQUFjLFlBQVk7QUFDN0QsZ0JBQVksa0JBQWtCLFFBQVEsR0FBRyxRQUFRLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBRWxILFFBQUksS0FBSztBQUNQLFVBQUksaUJBQWlCLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3BGO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxNQUFNLFlBQVk7QUFDdkIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLGVBQWUsV0FBVztBQUM5QixlQUFXLFVBQVU7QUFDckIsUUFBSSxlQUFlLFdBQVc7QUFDOUIsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ047QUFBQSxFQUNHO0FBQUEsRUFFRCxNQUFNLEtBQUssYUFBYTtBQUN0QixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsZUFBVyxVQUFVLGNBQWMsY0FBYyxZQUFZO0FBQzdELGdCQUFZLGtCQUFrQixRQUFRLEdBQUcsUUFBUSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVsSCxRQUFJLEtBQUs7QUFDUCxVQUFJLGlCQUFpQixhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFBQSxJQUNwRjtBQUFBLEVBQ0Y7QUFBQSxFQUVELE9BQU8sTUFBTSxZQUFZO0FBQ3ZCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksZ0JBQWdCLFFBQVEsS0FBSyxLQUFLO0FBQ3RDLFFBQUksZUFBZSxXQUFXO0FBSTlCLFFBQUksUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLGFBQWEsS0FBSyxRQUFRLElBQUksYUFBYSxLQUFLLElBQU0sS0FBSyxJQUFJLGFBQWEsS0FBSyxRQUFRLElBQUksYUFBYSxLQUFLLEdBQUssQ0FBQyxLQUFLLElBQUksYUFBYSxLQUFLLFFBQVEsSUFBSSxhQUFhLEtBQUssSUFBTSxLQUFLLElBQUksYUFBYSxLQUFLLFFBQVEsSUFBSSxhQUFhLEtBQUssQ0FBRztBQUUvUSxRQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUM7QUFFdEYsUUFBSSxJQUFJLEdBQUc7QUFDVCxZQUFNLEtBQUssS0FBSyxDQUFDO0FBQ2pCLFlBQU0sS0FBSyxLQUFLLENBQUM7QUFBQSxJQUNsQjtBQUdELFFBQUksS0FBSyxhQUFhLFlBQVksS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUUvUCxRQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQ1osVUFBSTtBQUFBLElBQ0w7QUFFRCxRQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxNQUFNLElBQUksRUFBRTtBQUVqRSxRQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsSUFBSSxhQUFhLEtBQUssSUFBTSxLQUFLLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksYUFBYSxLQUFLLElBQU0sS0FBSyxJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUM7QUFFcE8sUUFBSSxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUc5RSxRQUFJLElBQUksRUFBRSxNQUFNLElBQUksSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO0FBQ3ZELFFBQUksSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO0FBQ3pELFFBQUksS0FBSyxhQUFhLEdBQUcsQ0FBQztBQUUxQixRQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssSUFBSTtBQUM1QixXQUFLLEtBQUs7QUFBQSxJQUNYO0FBRUQsUUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLEdBQUc7QUFDM0IsV0FBSztBQUFBLElBQ047QUFFRCxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFFaEMsUUFBSSxNQUFNLElBQUksWUFBWSxJQUFNO0FBQ2hDLFFBQUksS0FBSyxLQUFLLE9BQU8sS0FBSztBQUMxQixRQUFJLFVBQVUsSUFBSSxNQUFNLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztBQUNoRixlQUFXLGVBQWUsU0FBUyxLQUFLLE1BQU0sS0FBSyxLQUFLLENBQUM7QUFDekQsZUFBVyxlQUFlLGNBQWMsS0FBSyxNQUFNLEtBQUssRUFBRTtBQUMxRCxnQkFBWSxTQUFTLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFFbkQsUUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRztBQUNuQyxVQUFJLElBQUksS0FBSyxLQUFLLEtBQUs7QUFDdkIsVUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLEtBQUs7QUFDNUIsVUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDN0IsVUFBSSxVQUFVLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDOUIsVUFBSSxPQUFPLGFBQWE7QUFDeEIsVUFBSSxNQUFNLElBQUksRUFBRTtBQUNoQixVQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQztBQUNwRCxVQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRTtBQUN4QixVQUFJLE9BQU8sQ0FBQyxhQUFhO0FBQ3pCLFVBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxNQUFNLFlBQVk7QUFDdkIsZUFBVyxVQUFVLFdBQVc7QUFBQSxFQUNqQztBQUFBLEVBRUQsTUFBTSxLQUFLLGFBQWE7QUFDdEIsZ0JBQVksTUFBTSxLQUFLLFVBQVU7QUFFakMsUUFBSSxLQUFLO0FBRVAsVUFBSSxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksT0FBTyxZQUFZLElBQUk7QUFDMUUsWUFBSSxVQUFTO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUg7QUFFQSxNQUFNLHFCQUFxQixZQUFZO0FBQUEsRUFDckMsWUFBWTNJLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZ0JBQWdCO0FBQ3RDLFNBQUssT0FBTztBQUNaLFNBQUssWUFBWSxLQUFLLGFBQWEsYUFBYSxFQUFFO0FBQ2xELFNBQUssVUFBVSxLQUFLLGFBQWEsU0FBUyxFQUFFO0FBQzVDLFNBQUssYUFBYSxLQUFLLGFBQWEsYUFBYSxFQUFFO0VBQ3BEO0FBRUg7QUFFQSxNQUFNLG9CQUFvQixnQkFBZ0I7QUFBQSxFQUN4QyxZQUFZMUUsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxlQUFlLGNBQWMsT0FBTyxnQkFBZ0I7QUFDMUUsU0FBSyxPQUFPO0FBQ1osU0FBSyxJQUFJO0FBQ1QsU0FBSyxJQUFJO0FBQ1QsU0FBSyxlQUFlO0FBQUEsRUFDckI7QUFBQSxFQUVELFdBQVcsS0FBSztBQUNkLFFBQUksY0FBYyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDdEYsVUFBTSxXQUFXLEtBQUssV0FBVztBQUNqQyxRQUFJLGVBQWUsS0FBSyxTQUFTLG1CQUFtQixFQUFFLHFCQUFxQixLQUFLLFNBQVMsb0JBQW9CLEVBQUUsZ0JBQWU7QUFFOUgsUUFBSSxjQUFjO0FBQ2hCLFVBQUksZUFBZTtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUFBLEVBRUQsd0JBQXdCO0FBQ3RCLFNBQUssSUFBSTtBQUNULFNBQUssSUFBSTtBQUNULFNBQUssWUFBWTtBQUNqQixTQUFLLGlCQUFpQjtBQUN0QixTQUFLLE9BQU8sT0FBTztBQUNuQixTQUFLLE9BQU8sT0FBTztBQUFBLEVBQ3BCO0FBQUEsRUFFRCxlQUFlLEtBQUs7QUFDbEIsUUFBSSxLQUFLLFNBQVMsUUFBUTtBQUN4QixhQUFPLEtBQUssdUJBQXVCLEdBQUc7QUFBQSxJQUN2QztBQUdELFNBQUssc0JBQXFCO0FBQzFCLFNBQUssZ0NBQWdDLEdBQUc7QUFDeEMsUUFBSSxjQUFjO0FBRWxCLFNBQUssU0FBUyxRQUFRLENBQUNpRSxJQUFHLE1BQU07QUFDOUIsVUFBSSxtQkFBbUIsS0FBSyxvQkFBb0IsS0FBSyxNQUFNLE1BQU0sQ0FBQztBQUVsRSxVQUFJLENBQUMsYUFBYTtBQUNoQixzQkFBYztBQUFBLE1BQ3RCLE9BQWE7QUFDTCxvQkFBWSxlQUFlLGdCQUFnQjtBQUFBLE1BQzVDO0FBQUEsSUFDUCxDQUFLO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGNBQWM7QUFDWixRQUFJO0FBQUEsTUFDRixVQUFBM0k7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxrQkFBa0IsS0FBSyxNQUFNQSxVQUFTLElBQUksSUFBSSxFQUFFO0FBQ3BELFFBQUksV0FBVyxPQUFPLFNBQVMsV0FBVyxFQUFFLFVBQVUsZUFBZTtBQUNyRSxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsdUJBQXVCLEtBQUs7QUFDMUIsUUFBSSxXQUFXLEtBQUs7QUFDcEIsV0FBTyxJQUFJLFlBQVksS0FBSyxHQUFHLEtBQUssSUFBSSxVQUFVLEtBQUssSUFBSSxLQUFLLFlBQVksR0FBRyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3pGO0FBQUEsRUFFRCxTQUFTLE1BQU0sTUFBTSxHQUFHO0FBQ3RCLFFBQUksT0FBTyxLQUFLO0FBQ2hCLFFBQUksUUFBUTtBQUVaLFFBQUksS0FBSyxVQUFVO0FBQ2pCLFVBQUksTUFBTSxLQUFLO0FBQ2YsVUFBSSxXQUFXLEtBQUssSUFBSTtBQUN4QixVQUFJLFdBQVcsS0FBSyxJQUFJO0FBQ3hCLFVBQUksYUFBYTtBQUVqQixXQUFLLE1BQU0sS0FBSyxhQUFhLFFBQVEsSUFBSSxNQUFNLEtBQUssYUFBYSxLQUFLO0FBQ3BFLHFCQUFhO0FBQUEsTUFDZDtBQUVELFVBQUksSUFBSSxLQUFLLGFBQWEsT0FBTyxJQUFJLE1BQU0sS0FBSyxhQUFhLEtBQUs7QUFDaEUscUJBQWE7QUFBQSxNQUNkO0FBRUQsVUFBSSxJQUFJLEtBQUssYUFBYSxRQUFRLE1BQU0sTUFBTSxLQUFLLGFBQWEsTUFBTTtBQUNwRSxxQkFBYTtBQUFBLE1BQ2Q7QUFFRCxVQUFJLE9BQU8sS0FBSyxPQUFPLFVBQVUsYUFBYTtBQUU1QyxZQUFJLGFBQWEsS0FBSyxPQUFPO0FBQzdCLGdCQUFRLHNCQUFzQixlQUFlLGFBQWEsV0FBVztBQUFBLE1BQ3RFO0FBQUEsSUFDUCxPQUFXO0FBQ0wsY0FBUSxLQUFLLE9BQU87QUFBQSxJQUNyQjtBQUVELFFBQUksQ0FBQyxPQUFPO0FBQ1YsY0FBUSxLQUFLO0FBQUEsSUFDZDtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxVQUFVO0FBQ1IsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGdCQUFnQjBFLE9BQU07QUFDcEIsUUFBSSxXQUFXQSxTQUFRLEtBQUs7QUFDNUIsUUFBSSxhQUFhLE1BQU0sS0FBSyxTQUFTLFdBQVcsVUFBVTtBQUMxRCxRQUFJMUMsU0FBUSxXQUFXLFFBQVEsUUFBUTtBQUN2QyxRQUFJLFlBQVksV0FBVyxTQUFTO0FBQ3BDLFFBQUksT0FBTztBQUFBLE1BRVgsU0FBUyxlQUFlO0FBQUEsSUFBRTtBQUUxQixRQUFJQSxXQUFVLEdBQUc7QUFDZixhQUFPLFNBQVMsSUFBSTtBQUFBLElBQ3JCO0FBRUQsUUFBSUEsV0FBVSxXQUFXO0FBQ3ZCLGFBQU8sVUFBVSxJQUFJO0FBQUEsSUFDdEI7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsZUFBZSxLQUFLO0FBQ2xCLFFBQUksS0FBSyxTQUFTLFFBQVE7QUFDeEIsV0FBSyx1QkFBdUIsR0FBRztBQUMvQjtBQUFBLElBQ0Q7QUFHRCxTQUFLLHNCQUFxQjtBQUMxQixTQUFLLGdDQUFnQyxHQUFHO0FBRXhDLFNBQUssU0FBUyxRQUFRLENBQUMyRyxJQUFHLE1BQU07QUFDOUIsV0FBSyxZQUFZLEtBQUssTUFBTSxNQUFNLENBQUM7QUFBQSxJQUN6QyxDQUFLO0FBQ0QsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNOLElBQVEsS0FBSyxTQUFTO0FBRWxCLFFBQUksTUFBTSxhQUFhO0FBQ3JCLFlBQU0saUJBQWlCLE1BQU0sS0FBSyxlQUFlLEdBQUcsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBRUQsdUJBQXVCLEtBQUs7QUFDMUIsUUFBSTtBQUFBLE1BQ0YsVUFBQTNJO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksYUFBYSxLQUFLO0FBQ3RCLFFBQUksYUFBYSxPQUFPLFNBQVMsYUFBYSxFQUFFLGNBQWE7QUFFN0QsUUFBSSxZQUFZO0FBQ2QsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxNQUNSLElBQVUsV0FBVztBQUNmLFVBQUksVUFBVSxLQUFLLE1BQU1BLFVBQVMsSUFBSSxJQUFJO0FBQzFDLFVBQUksV0FBVyxPQUFPLFNBQVMsV0FBVyxFQUFFLFVBQVUsUUFBUSxRQUFRO0FBQ3RFLFVBQUksWUFBWSxPQUFPLFNBQVMsWUFBWSxFQUFFLFVBQVUsUUFBUSxTQUFTO0FBQ3pFLFVBQUksUUFBUSxXQUFXO0FBQ3ZCLFVBQUksT0FBTyxXQUFXLFFBQVEsV0FBVyxNQUFNLEVBQUUsRUFBRSxRQUFPLEVBQUcsS0FBSyxFQUFFLElBQUk7QUFDeEUsVUFBSSxLQUFLLFVBQVUsT0FBTyxhQUFhLElBQUksRUFBRSxVQUFTLENBQUU7QUFDeEQsVUFBSSxNQUFNLEtBQUs7QUFFZixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixZQUFJLFFBQVEsS0FBSyxTQUFTLFlBQVksTUFBTSxDQUFDO0FBQzdDLFlBQUksVUFBVSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFlBQUksTUFBTSxPQUFPLENBQUMsS0FBSztBQUN2QixZQUFJLEtBQUssSUFBSTtBQUNiLFlBQUksWUFBWSxJQUFJLFlBQVksYUFBYTtBQUU3QyxZQUFJLGNBQWMsVUFBVTtBQUMxQixjQUFJLFVBQVUsR0FBRyxHQUFHLEtBQUksR0FBRyxHQUFHLENBQUM7QUFBQSxRQUNoQztBQUVELGNBQU0sT0FBTyxHQUFHO0FBRWhCLFlBQUksY0FBYyxVQUFVO0FBQzFCLGNBQUksVUFBVSxHQUFHLEdBQUcsTUFBSyxHQUFHLEdBQUcsQ0FBQztBQUFBLFFBQ2pDO0FBRUQsWUFBSSxZQUFZO0FBQ2hCLFlBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLO0FBQy9CLFlBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUM5QixhQUFLLEtBQUssWUFBWSxNQUFNLGFBQWEsV0FBVyxhQUFhO0FBRWpFLFlBQUksT0FBTyxHQUFHLE9BQU8sZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUc7QUFDakQsZUFBSyxLQUFLLEdBQUc7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUVEO0FBQUEsSUFDRDtBQUVELFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQVVKLFFBQUksSUFBSSxXQUFXO0FBQ2pCLFVBQUksU0FBUyxZQUFZLEdBQUcsQ0FBQztBQUFBLElBQzlCO0FBRUQsUUFBSSxJQUFJLGFBQWE7QUFDbkIsVUFBSSxXQUFXLFlBQVksR0FBRyxDQUFDO0FBQUEsSUFDaEM7QUFBQSxFQUVGO0FBQUEsRUFFRCxpQkFBaUI7QUFDZixRQUFJLEtBQUssa0JBQWtCLEtBQUssVUFBVSxRQUFRO0FBQ2hEO0FBQUEsSUFDRDtBQUtELFFBQUksZUFBZSxLQUFLLFVBQVUsS0FBSztBQUN2QyxRQUFJLGFBQWEsYUFBYSxTQUFTLGFBQWEsRUFBRSxVQUFVLE9BQU87QUFDdkUsUUFBSSxRQUFRO0FBRVosUUFBSSxRQUFRO0FBRVosUUFBSSxlQUFlLFdBQVcsQ0FBQyxTQUFTLGVBQWUsU0FBUyxPQUFPO0FBQ3JFLGNBQVEsYUFBYSxJQUFJLEtBQUs7QUFBQSxJQUNwQyxXQUFlLGVBQWUsU0FBUyxDQUFDLFNBQVMsZUFBZSxXQUFXLE9BQU87QUFDNUUsY0FBUSxhQUFhLElBQUksS0FBSztBQUFBLElBQ3BDLE9BQVc7QUFDTCxjQUFRLGFBQWEsS0FBSyxLQUFLLE9BQU8sS0FBSyxRQUFRO0FBQUEsSUFDcEQ7QUFFRCxhQUFTLElBQUksS0FBSyxnQkFBZ0IsSUFBSSxLQUFLLFVBQVUsUUFBUSxLQUFLO0FBQ2hFLFdBQUssVUFBVSxHQUFHLEtBQUs7QUFBQSxJQUN4QjtBQUdELFNBQUssT0FBTyxPQUFPO0FBQ25CLFNBQUssT0FBTyxPQUFPO0FBQ25CLFNBQUssaUJBQWlCLEtBQUssVUFBVTtBQUFBLEVBQ3RDO0FBQUEsRUFFRCxnQ0FBZ0MsS0FBSztBQUNuQyxTQUFLLFNBQVMsUUFBUSxDQUFDMkksSUFBRyxNQUFNO0FBQzlCLFdBQUssb0NBQW9DLEtBQUssTUFBTSxNQUFNLENBQUM7QUFBQSxJQUNqRSxDQUFLO0FBQ0QsU0FBSyxlQUFjO0FBQUEsRUFDcEI7QUFBQSxFQUVELG9DQUFvQyxLQUFLLFlBQVksUUFBUSxHQUFHO0FBQzlELFFBQUksUUFBUSxPQUFPLFNBQVM7QUFFNUIsUUFBSSxNQUFNLFNBQVMsU0FBUyxHQUFHO0FBQzdCLFlBQU0sU0FBUyxRQUFRLENBQUNBLElBQUcrQixPQUFNO0FBQy9CLG1CQUFXLG9DQUFvQyxLQUFLLFlBQVksT0FBT0EsRUFBQztBQUFBLE1BQ2hGLENBQU87QUFBQSxJQUNQLE9BQVc7QUFFTCxXQUFLLHVCQUF1QixLQUFLLFlBQVksUUFBUSxDQUFDO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBQUEsRUFFRCx1QkFBdUIsS0FBSyxZQUFZLFFBQVEsR0FBRztBQUNqRCxRQUFJLFFBQVEsT0FBTyxTQUFTO0FBRTVCLFFBQUksT0FBTyxNQUFNLGdCQUFnQixZQUFZO0FBQzNDLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxLQUFJO0FBQ1IsVUFBTSxXQUFXLEtBQUssSUFBSTtBQUMxQixRQUFJLFFBQVEsTUFBTSxhQUFhLEdBQUc7QUFDbEMsUUFBSSxRQUFRLE1BQU0sYUFBYSxHQUFHO0FBQ2xDLFFBQUksU0FBUyxNQUFNLGFBQWEsSUFBSTtBQUNwQyxRQUFJLFNBQVMsTUFBTSxhQUFhLElBQUk7QUFDcEMsUUFBSSxhQUFhLE1BQU0sU0FBUyxhQUFhLEVBQUUsY0FBYTtBQUM1RCxRQUFJLFFBQVEsUUFBUSxVQUFVLEtBQUssV0FBVztBQUU5QyxRQUFJLE1BQU0sR0FBRztBQUdYLFVBQUksQ0FBQyxNQUFNLFlBQVk7QUFDckIsY0FBTSxTQUFTLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQztBQUFBLE1BQ2hEO0FBRUQsVUFBSSxDQUFDLE1BQU0sWUFBWTtBQUNyQixjQUFNLFNBQVMsTUFBTSxzQkFBc0IsR0FBRyxDQUFDO0FBQUEsTUFDaEQ7QUFFRCxVQUFJLENBQUMsT0FBTyxZQUFZO0FBQ3RCLGVBQU8sU0FBUyxNQUFNLHNCQUFzQixJQUFJLENBQUM7QUFBQSxNQUNsRDtBQUVELFVBQUksQ0FBQyxPQUFPLFlBQVk7QUFDdEIsZUFBTyxTQUFTLE1BQU0sc0JBQXNCLElBQUksQ0FBQztBQUFBLE1BQ2xEO0FBQUEsSUFDRjtBQUVELFFBQUksUUFBUSxNQUFNLFlBQVksR0FBRztBQUVqQyxRQUFJLE9BQU87QUFDVCxpQkFBVyxLQUFLO0FBQUEsSUFDakI7QUFFRCxRQUFJLE1BQU0sWUFBWTtBQUVwQixpQkFBVyxlQUFjO0FBQ3pCLFlBQU0sSUFBSSxNQUFNLFVBQVUsR0FBRztBQUU3QixVQUFJLE9BQU8sWUFBWTtBQUNyQixjQUFNLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUNoQztBQUFBLElBQ1AsT0FBVztBQUNMLFVBQUksT0FBTyxZQUFZO0FBQ3JCLG1CQUFXLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUNyQztBQUVELFlBQU0sSUFBSSxXQUFXO0FBQUEsSUFDdEI7QUFFRCxlQUFXLElBQUksTUFBTTtBQUVyQixRQUFJLENBQUMsT0FBTztBQUNWLGlCQUFXLEtBQUs7QUFBQSxJQUNqQjtBQUVELFFBQUksTUFBTSxZQUFZO0FBQ3BCLFlBQU0sSUFBSSxNQUFNLFVBQVUsR0FBRztBQUU3QixVQUFJLE9BQU8sWUFBWTtBQUNyQixjQUFNLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUNoQztBQUFBLElBQ1AsT0FBVztBQUNMLFVBQUksT0FBTyxZQUFZO0FBQ3JCLG1CQUFXLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUNyQztBQUVELFlBQU0sSUFBSSxXQUFXO0FBQUEsSUFDdEI7QUFFRCxlQUFXLElBQUksTUFBTTtBQUVyQixlQUFXLFVBQVUsS0FBSyxLQUFLO0FBQy9CLGVBQVcsT0FBTyxLQUFLLElBQUksV0FBVyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSztBQUNwRSxlQUFXLE9BQU8sS0FBSyxJQUFJLFdBQVcsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUs7QUFDcEUsVUFBTSxhQUFhLEdBQUc7QUFDdEIsUUFBSSxRQUFPO0FBQ1gsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELG9CQUFvQixLQUFLLFlBQVksUUFBUSxHQUFHO0FBQzlDLFFBQUksUUFBUSxPQUFPLFNBQVM7QUFFNUIsUUFBSSxPQUFPLE1BQU0sbUJBQW1CLFlBQVk7QUFDOUMsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFFMUMsUUFBSSxDQUFDLGFBQWE7QUFDaEIsYUFBTztBQUFBLElBQ1I7QUFFRCxVQUFNLFNBQVMsUUFBUSxDQUFDL0IsSUFBRytCLE9BQU07QUFDL0IsVUFBSSxtQkFBbUIsV0FBVyxvQkFBb0IsS0FBSyxZQUFZLE9BQU9BLEVBQUM7QUFDL0Usa0JBQVksZUFBZSxnQkFBZ0I7QUFBQSxJQUNqRCxDQUFLO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELFlBQVksS0FBSyxZQUFZLFFBQVEsR0FBRztBQUN0QyxRQUFJLFFBQVEsT0FBTyxTQUFTO0FBQzVCLFVBQU0sT0FBTyxHQUFHO0FBQ2hCLFVBQU0sU0FBUyxRQUFRLENBQUMvQixJQUFHK0IsT0FBTTtBQUMvQixpQkFBVyxZQUFZLEtBQUssWUFBWSxPQUFPQSxFQUFDO0FBQUEsSUFDdEQsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUVELFlBQVksS0FBSztBQUNmLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBRUosUUFBSSxDQUFDLGNBQWM7QUFDakIsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLGFBQWEsS0FBSztBQUN0QixRQUFJLFVBQVUsS0FBSyxrQkFBa0IsS0FBSyxVQUFVO0FBQ3BELFNBQUssZUFBZTtBQUNwQixXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsa0JBQWtCLEtBQUssWUFBWTtBQUNqQyxRQUFJLENBQUMsV0FBVyxRQUFRO0FBQ3RCLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLGFBQWEsT0FBTyxTQUFTLGFBQWEsRUFBRSxjQUFhO0FBRTdELFFBQUksWUFBWTtBQUNkLFVBQUksV0FBVyxLQUFLO0FBQ3BCLFVBQUksT0FBTyxXQUFXLFFBQVEsV0FBVyxNQUFNLEVBQUUsRUFBRSxRQUFPLEVBQUcsS0FBSyxFQUFFLElBQUk7QUFDeEUsVUFBSSxLQUFLLFVBQVUsT0FBTyxhQUFhLElBQUksRUFBRSxVQUFTLENBQUU7QUFDeEQsVUFBSSxNQUFNLEtBQUs7QUFDZixVQUFJLFdBQVc7QUFFZixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixZQUFJLFFBQVEsS0FBSyxTQUFTLFlBQVksTUFBTSxDQUFDO0FBQzdDLHFCQUFhLE1BQU0sYUFBYSxXQUFXLGFBQWEsV0FBVyxXQUFXLFNBQVM7QUFFdkYsWUFBSSxPQUFPLEdBQUcsT0FBTyxlQUFlLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRztBQUNqRCxzQkFBWSxHQUFHO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBRUQsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLENBQUMsSUFBSSxhQUFhO0FBQ3BCLGFBQU8sV0FBVyxTQUFTO0FBQUEsSUFDNUI7QUFFRCxRQUFJLEtBQUk7QUFDUixTQUFLLFdBQVcsS0FBSyxJQUFJO0FBQ3pCLFFBQUk7QUFBQSxNQUNGLE9BQU87QUFBQSxJQUNiLElBQVEsSUFBSSxZQUFZLFVBQVU7QUFDOUIsU0FBSyxhQUFhLEdBQUc7QUFDckIsUUFBSSxRQUFPO0FBQ1gsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQVNELHNCQUFzQixNQUFNO0FBRTFCLFFBQUksVUFBVTtBQUVkLFdBQU8sbUJBQW1CLGVBQWUsUUFBUSxhQUFZLEdBQUk7QUFDL0QsVUFBSSxhQUFhLFFBQVEsT0FBTyxhQUFhLElBQUk7QUFFakQsVUFBSSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQzdCLGVBQU8sV0FBVyxTQUFTLEdBQUc7QUFBQSxNQUMvQjtBQUVELGdCQUFVLFFBQVE7QUFBQSxJQUNuQjtBQUVELFdBQU87QUFBQSxFQUNSO0FBRUg7QUFFQSxNQUFNLHFCQUFxQixZQUFZO0FBQUEsRUFDckMsWUFBWTFLLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZUFBZSxlQUFlLE9BQU8sZ0JBQWdCO0FBQzNFLFNBQUssT0FBTztBQUVaLFNBQUssT0FBTyxLQUFLLFNBQVMsU0FBUyxJQUFJLEtBQUssS0FBSztFQUNsRDtBQUFBLEVBRUQsVUFBVTtBQUNSLFdBQU8sS0FBSztBQUFBLEVBQ2I7QUFFSDtBQUVBLE1BQU0saUJBQWlCLGFBQWE7QUFBQSxFQUNsQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUVIO0FBRUEsTUFBTSxtQkFBbUIsZ0JBQWdCO0FBQUEsRUFDdkMsY0FBYztBQUNaLFVBQU0sR0FBRyxTQUFTO0FBQ2xCLFNBQUssT0FBTztBQUNaLFNBQUssT0FBTztBQUFBLEVBQ2I7QUFBQSxFQUVELFdBQVcsS0FBSztBQUNkLFFBQUk7QUFFSixRQUFJO0FBQUEsTUFDRixVQUFBMUU7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBQW1LO0FBQUEsSUFDRCxJQUFHbks7QUFDSixRQUFJLFNBQVMsSUFBSTtBQUNqQixXQUFPLFlBQVksR0FBRztBQUV0QixRQUFJLE9BQU8sU0FBUyxPQUFPLElBQUksU0FBUyxlQUFlbUssV0FBVSxPQUFPQSxRQUFPLHFCQUFxQixhQUFhO0FBQy9HLFVBQUksT0FBT0EsUUFBTyxpQkFBaUIsTUFBTSxFQUFFLGlCQUFpQixNQUFNO0FBQ2xFLFVBQUksZUFBZSxJQUFJLFNBQVNuSyxXQUFVLFlBQVksS0FBSyxNQUFNLElBQUksSUFBSSxFQUFFLFFBQVE7QUFFbkYsVUFBSSxhQUFhLFlBQVk7QUFDM0IsUUFBQUEsVUFBUyxhQUFhLGFBQWEsVUFBVSxHQUFHO0FBQ2hELFFBQUFBLFVBQVMsU0FBU0EsVUFBUztBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUdELFFBQUksQ0FBQyxLQUFLLGFBQWEsR0FBRyxFQUFFLFNBQVEsR0FBSTtBQUN0QyxXQUFLLGFBQWEsS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBQUEsSUFDeEM7QUFFRCxRQUFJLENBQUMsS0FBSyxhQUFhLEdBQUcsRUFBRSxTQUFRLEdBQUk7QUFDdEMsV0FBSyxhQUFhLEtBQUssSUFBSSxFQUFFLFNBQVMsQ0FBQztBQUFBLElBQ3hDO0FBRUQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLE9BQU87QUFFWCxRQUFJLENBQUMsS0FBSyxTQUFTLE9BQU8sRUFBRSxTQUFRLEdBQUk7QUFDdEMsV0FBSyxTQUFTLFNBQVMsSUFBSSxFQUFFLFNBQVMsTUFBTTtBQUFBLElBQzdDO0FBRUQsUUFBSSxDQUFDLEtBQUssU0FBUyxRQUFRLEVBQUUsU0FBUSxHQUFJO0FBQ3ZDLFdBQUssU0FBUyxVQUFVLElBQUksRUFBRSxTQUFTLE1BQU07QUFBQSxJQUM5QztBQUVELFFBQUksQ0FBQyxLQUFLLFNBQVMsT0FBTyxFQUFFLFNBQVEsR0FBSTtBQUN0QyxXQUFLLFNBQVMsU0FBUyxJQUFJLEVBQUUsU0FBUyxPQUFPO0FBQUEsSUFDOUM7QUFFRCxRQUFJLFdBQVcsS0FBSyxhQUFhLE1BQU07QUFDdkMsUUFBSSxXQUFXLEtBQUssYUFBYSxNQUFNO0FBQ3ZDLFFBQUksY0FBYyxLQUFLLGFBQWEsU0FBUztBQUM3QyxRQUFJLFVBQVUsWUFBWSxTQUFVLElBQUcsVUFBVSxZQUFZLFdBQVcsSUFBSTtBQUM1RSxRQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsS0FBSyxTQUFTLFVBQVUsRUFBRSxTQUFTLFFBQVEsTUFBTTtBQUMxRSxRQUFJLE9BQU87QUFDWCxRQUFJLE9BQU87QUFDWCxRQUFJLFFBQVE7QUFDWixRQUFJLFFBQVE7QUFFWixRQUFJLFNBQVM7QUFDWCxhQUFPLFFBQVE7QUFDZixhQUFPLFFBQVE7QUFBQSxJQUNoQjtBQUVELFFBQUksQ0FBQyxLQUFLLE1BQU07QUFDZCxjQUFRLEtBQUssU0FBUyxPQUFPLEVBQUUsVUFBVSxHQUFHO0FBQzVDLGVBQVMsS0FBSyxTQUFTLFFBQVEsRUFBRSxVQUFVLEdBQUc7QUFFOUMsVUFBSSxLQUFLLFNBQVMsVUFBVTtBQUMxQixnQkFBUTtBQUNSLGdCQUFRO0FBQ1IsZUFBTztBQUNQLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUVELFdBQU8sU0FBUyxXQUFXLE9BQU8sTUFBTTtBQUd4QyxRQUFJLEtBQUssU0FDTCxDQUFDLEtBQUssWUFBWSx3QkFBd0IsS0FBSyxLQUFLLGdCQUFnQixRQUFRLDBCQUEwQixTQUFTLFNBQVMsc0JBQXNCLGNBQWMsb0JBQW9CLEtBQUssU0FBUyxhQUFhLE9BQU8sSUFBSSxFQUFFLFNBQVUsS0FBSSxDQUFDLEtBQUssU0FBUyxvQkFBb0IsT0FBTyxJQUFJLEVBQUUsU0FBUSxHQUFJO0FBQ3BTLFdBQUssU0FBUyxvQkFBb0IsTUFBTSxJQUFJLEVBQUUsU0FBUyxTQUFTO0FBQUEsSUFDakU7QUFFRCxVQUFNLFdBQVcsR0FBRztBQUNwQixRQUFJLFVBQVUsS0FBSyxhQUFhLEdBQUcsRUFBRSxVQUFVLEdBQUcsR0FBRyxLQUFLLGFBQWEsR0FBRyxFQUFFLFVBQVUsR0FBRyxDQUFDO0FBRTFGLFFBQUksU0FBUztBQUNYLGNBQVEsUUFBUTtBQUNoQixlQUFTLFFBQVE7QUFBQSxJQUNsQjtBQUVELElBQUFBLFVBQVMsV0FBVztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxhQUFhLEtBQUssYUFBYSxxQkFBcUIsRUFBRSxVQUFXO0FBQUEsTUFDakUsT0FBTyxPQUFPLFNBQVM7QUFBQSxNQUN2QixjQUFjO0FBQUEsTUFDZCxRQUFRLE9BQU8sU0FBUztBQUFBLE1BQ3hCLGVBQWU7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLE1BQ0EsTUFBTSxTQUFTLFNBQVU7QUFBQSxNQUN6QixNQUFNLFNBQVMsU0FBVTtBQUFBLE1BQ3pCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLENBQUs7QUFFRCxRQUFJLFNBQVM7QUFDWCxhQUFPLFNBQVM7QUFDaEIsYUFBTyxTQUFTLFdBQVcsT0FBTyxNQUFNO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFFRCxhQUFhLEtBQUs7QUFDaEIsVUFBTSxhQUFhLEdBQUc7QUFDdEIsU0FBSyxTQUFTLE9BQU8sU0FBUyxjQUFhO0FBQUEsRUFDNUM7QUFBQSxFQVNELE9BQU8sT0FBTztBQUNaLFFBQUksU0FBUyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDakYsUUFBSSxzQkFBc0IsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQzlGLFFBQUksWUFBWSxLQUFLLGFBQWEsU0FBUyxJQUFJO0FBQy9DLFFBQUksYUFBYSxLQUFLLGFBQWEsVUFBVSxJQUFJO0FBQ2pELFFBQUksY0FBYyxLQUFLLGFBQWEsU0FBUztBQUM3QyxRQUFJLFlBQVksS0FBSyxhQUFhLE9BQU87QUFDekMsUUFBSSxjQUFjLFVBQVUsVUFBVSxDQUFDO0FBQ3ZDLFFBQUksZUFBZSxXQUFXLFVBQVUsQ0FBQztBQUV6QyxRQUFJLHFCQUFxQjtBQUN2QixVQUFJLE9BQU8sd0JBQXdCLFVBQVU7QUFDM0MsYUFBSyxhQUFhLHVCQUF1QixJQUFJLEVBQUUsU0FBUyxtQkFBbUI7QUFBQSxNQUNuRixPQUFhO0FBQ0wsWUFBSSwwQkFBMEIsS0FBSyxhQUFhLHFCQUFxQjtBQUVyRSxZQUFJLHdCQUF3QixZQUFZO0FBQ3RDLGtDQUF3QixTQUFTLHdCQUF3QixVQUFTLEVBQUcsUUFBUSxvQkFBb0IsSUFBSSxDQUFDO0FBQUEsUUFDdkc7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELGNBQVUsU0FBUyxLQUFLO0FBQ3hCLGVBQVcsU0FBUyxNQUFNO0FBRTFCLFFBQUksQ0FBQyxZQUFZLFlBQVk7QUFDM0Isa0JBQVksU0FBUyxPQUFPLE9BQU8sZUFBZSxPQUFPLEdBQUcsRUFBRSxPQUFPLGdCQUFnQixNQUFNLENBQUM7QUFBQSxJQUM3RjtBQUVELFFBQUksVUFBVSxZQUFZO0FBQ3hCLFVBQUksYUFBYSxLQUFLLFNBQVMsT0FBTztBQUN0QyxVQUFJLGNBQWMsS0FBSyxTQUFTLFFBQVE7QUFFeEMsVUFBSSxXQUFXLFlBQVk7QUFDekIsbUJBQVcsU0FBUyxHQUFHLE9BQU8sT0FBTyxJQUFJLENBQUM7QUFBQSxNQUMzQztBQUVELFVBQUksWUFBWSxZQUFZO0FBQzFCLG9CQUFZLFNBQVMsR0FBRyxPQUFPLFFBQVEsSUFBSSxDQUFDO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVIO0FBRUEsTUFBTSxvQkFBb0IsWUFBWTtBQUFBLEVBQ3BDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxLQUFLLEtBQUs7QUFDUixRQUFJLElBQUksS0FBSyxhQUFhLEdBQUcsRUFBRSxVQUFVLEdBQUc7QUFDNUMsUUFBSSxJQUFJLEtBQUssYUFBYSxHQUFHLEVBQUUsVUFBVSxHQUFHO0FBQzVDLFFBQUksUUFBUSxLQUFLLFNBQVMsU0FBUyxPQUFPLElBQUksRUFBRSxVQUFVLEdBQUc7QUFDN0QsUUFBSSxTQUFTLEtBQUssU0FBUyxVQUFVLE9BQU8sSUFBSSxFQUFFLFVBQVUsR0FBRztBQUMvRCxRQUFJLFNBQVMsS0FBSyxhQUFhLElBQUk7QUFDbkMsUUFBSSxTQUFTLEtBQUssYUFBYSxJQUFJO0FBQ25DLFFBQUksS0FBSyxPQUFPLFVBQVUsR0FBRztBQUM3QixRQUFJLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFFN0IsUUFBSSxPQUFPLFNBQVEsS0FBTSxDQUFDLE9BQU8sU0FBUSxHQUFJO0FBQzNDLFdBQUs7QUFBQSxJQUNOO0FBRUQsUUFBSSxPQUFPLFNBQVEsS0FBTSxDQUFDLE9BQU8sU0FBUSxHQUFJO0FBQzNDLFdBQUs7QUFBQSxJQUNOO0FBRUQsU0FBSyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUc7QUFDN0IsU0FBSyxLQUFLLElBQUksSUFBSSxTQUFTLENBQUc7QUFFOUIsUUFBSSxLQUFLO0FBQ1AsVUFBSSxRQUFRLE1BQU0sS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLO0FBQ3RDLFVBQUksVUFBUztBQUViLFVBQUksU0FBUyxLQUFLLFFBQVEsR0FBRztBQUMzQixZQUFJLE9BQU8sSUFBSSxJQUFJLENBQUM7QUFDcEIsWUFBSSxPQUFPLElBQUksUUFBUSxJQUFJLENBQUM7QUFDNUIsWUFBSSxjQUFjLElBQUksUUFBUSxLQUFLLFFBQVEsSUFBSSxHQUFHLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksT0FBTyxJQUFJLEVBQUU7QUFDbkcsWUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtBQUNyQyxZQUFJLGNBQWMsSUFBSSxPQUFPLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLElBQUksTUFBTTtBQUM5SCxZQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksTUFBTTtBQUM3QixZQUFJLGNBQWMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUN0RyxZQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUU7QUFDcEIsWUFBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7QUFDM0UsWUFBSSxVQUFTO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFFRCxXQUFPLElBQUksWUFBWSxHQUFHLEdBQUcsSUFBSSxPQUFPLElBQUksTUFBTTtBQUFBLEVBQ25EO0FBQUEsRUFFRCxhQUFhO0FBQ1gsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0sc0JBQXNCLFlBQVk7QUFBQSxFQUN0QyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsS0FBSyxLQUFLO0FBQ1IsUUFBSSxLQUFLLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBQzlDLFFBQUksS0FBSyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUM5QyxRQUFJLElBQUksS0FBSyxhQUFhLEdBQUcsRUFBRSxVQUFTO0FBRXhDLFFBQUksT0FBTyxJQUFJLEdBQUc7QUFDaEIsVUFBSSxVQUFTO0FBQ2IsVUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSztBQUN4QyxVQUFJLFVBQVM7QUFBQSxJQUNkO0FBRUQsV0FBTyxJQUFJLFlBQVksS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQUEsRUFDdEQ7QUFBQSxFQUVELGFBQWE7QUFDWCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSx1QkFBdUIsWUFBWTtBQUFBLEVBQ3ZDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxLQUFLLEtBQUs7QUFDUixRQUFJLFFBQVEsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUs7QUFDdEMsUUFBSSxLQUFLLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBQzlDLFFBQUksS0FBSyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUM5QyxRQUFJLEtBQUssS0FBSyxhQUFhLElBQUksRUFBRSxVQUFVLEdBQUc7QUFDOUMsUUFBSSxLQUFLLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBRTlDLFFBQUksT0FBTyxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQzNCLFVBQUksVUFBUztBQUNiLFVBQUksT0FBTyxLQUFLLElBQUksRUFBRTtBQUN0QixVQUFJLGNBQWMsS0FBSyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssRUFBRTtBQUNqRixVQUFJLGNBQWMsS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLElBQUksRUFBRTtBQUNqRixVQUFJLGNBQWMsS0FBSyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssRUFBRTtBQUNqRixVQUFJLGNBQWMsS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLElBQUksRUFBRTtBQUNqRixVQUFJLFVBQVM7QUFBQSxJQUNkO0FBRUQsV0FBTyxJQUFJLFlBQVksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO0FBQUEsRUFDMUQ7QUFBQSxFQUVELGFBQWE7QUFDWCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSxvQkFBb0IsWUFBWTtBQUFBLEVBQ3BDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxZQUFZO0FBQ1YsV0FBTyxDQUFDLElBQUksTUFBTSxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRyxHQUFHLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLE1BQU0sS0FBSyxhQUFhLElBQUksRUFBRSxVQUFVLEdBQUcsR0FBRyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFBQSxFQUM3TDtBQUFBLEVBRUQsS0FBSyxLQUFLO0FBQ1IsUUFBSSxDQUFDO0FBQUEsTUFDSCxHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUEsSUFDVCxHQUFPO0FBQUEsTUFDRCxHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUEsSUFDVCxDQUFLLElBQUksS0FBSztBQUVWLFFBQUksS0FBSztBQUNQLFVBQUksVUFBUztBQUNiLFVBQUksT0FBTyxJQUFJLEVBQUU7QUFDakIsVUFBSSxPQUFPLElBQUksRUFBRTtBQUFBLElBQ2xCO0FBRUQsV0FBTyxJQUFJLFlBQVksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLEVBQ3RDO0FBQUEsRUFFRCxhQUFhO0FBQ1gsUUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssVUFBUztBQUM3QixRQUFJLElBQUksR0FBRyxRQUFRLEVBQUU7QUFDckIsV0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLEVBQ3pCO0FBRUg7QUFFQSxNQUFNLHdCQUF3QixZQUFZO0FBQUEsRUFDeEMsWUFBWUEsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxTQUFTLE1BQU0sVUFBVSxLQUFLLGFBQWEsUUFBUSxFQUFFLFVBQVMsQ0FBRTtBQUFBLEVBQ3RFO0FBQUEsRUFFRCxLQUFLLEtBQUs7QUFDUixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksQ0FBQztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLElBQ0osQ0FBQSxJQUFJO0FBQ0wsUUFBSSxjQUFjLElBQUksWUFBWSxJQUFJLEVBQUU7QUFFeEMsUUFBSSxLQUFLO0FBQ1AsVUFBSSxVQUFTO0FBQ2IsVUFBSSxPQUFPLElBQUksRUFBRTtBQUFBLElBQ2xCO0FBRUQsV0FBTyxRQUFRLFVBQVE7QUFDckIsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRCxJQUFHO0FBQ0osa0JBQVksU0FBUyxHQUFHLENBQUM7QUFFekIsVUFBSSxLQUFLO0FBQ1AsWUFBSSxPQUFPLEdBQUcsQ0FBQztBQUFBLE1BQ2hCO0FBQUEsSUFDUCxDQUFLO0FBQ0QsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGFBQWE7QUFDWCxRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksWUFBWSxPQUFPLFNBQVM7QUFDaEMsUUFBSSxVQUFVLENBQUE7QUFDZCxXQUFPLFFBQVEsQ0FBQyxPQUFPLE1BQU07QUFDM0IsVUFBSSxNQUFNLFdBQVc7QUFDbkI7QUFBQSxNQUNEO0FBRUQsY0FBUSxLQUFLLENBQUMsT0FBTyxNQUFNLFFBQVEsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFDeEQsQ0FBSztBQUVELFFBQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsY0FBUSxLQUFLLENBQUMsT0FBTyxPQUFPLFNBQVMsSUFBSSxRQUFRLFFBQVEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUFBLElBQ3pFO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0sdUJBQXVCLGdCQUFnQjtBQUFBLEVBQzNDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxLQUFLLEtBQUs7QUFDUixRQUFJLGNBQWMsTUFBTSxLQUFLLEdBQUc7QUFDaEMsUUFBSSxDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxJQUNOLENBQUssSUFBSSxLQUFLO0FBRVYsUUFBSSxLQUFLO0FBQ1AsVUFBSSxPQUFPLEdBQUcsQ0FBQztBQUNmLFVBQUksVUFBUztBQUFBLElBQ2Q7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSx1QkFBdUIsUUFBUTtBQUFBLEVBQ25DLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxjQUFjLEtBQUtpRSxJQUFHLG1CQUFtQjtBQUN2QyxRQUFJLFFBQVEsS0FBSyxTQUFTLE9BQU8sRUFBRSxVQUFVLEtBQUssSUFBSTtBQUN0RCxRQUFJLFNBQVMsS0FBSyxTQUFTLFFBQVEsRUFBRSxVQUFVLEtBQUssSUFBSTtBQUV4RCxRQUFJLGFBQWEsSUFBSSxXQUFXLEtBQUssVUFBVSxJQUFJO0FBQ25ELGVBQVcsV0FBVyxVQUFVLElBQUksU0FBUyxLQUFLLFVBQVUsV0FBVyxLQUFLLGFBQWEsU0FBUyxFQUFFLFNBQVUsQ0FBQTtBQUM5RyxlQUFXLFdBQVcsUUFBUSxJQUFJLFNBQVMsS0FBSyxVQUFVLFNBQVMsR0FBRyxPQUFPLE9BQU8sSUFBSSxDQUFDO0FBQ3pGLGVBQVcsV0FBVyxTQUFTLElBQUksU0FBUyxLQUFLLFVBQVUsVUFBVSxHQUFHLE9BQU8sUUFBUSxJQUFJLENBQUM7QUFDNUYsZUFBVyxXQUFXLFlBQVksSUFBSSxTQUFTLEtBQUssVUFBVSxhQUFhLEtBQUssYUFBYSxrQkFBa0IsRUFBRSxTQUFVLENBQUE7QUFDM0gsZUFBVyxXQUFXLEtBQUs7QUFDM0IsUUFBSSxnQkFBZ0IsS0FBSyxTQUFTLGFBQWEsT0FBTyxNQUFNO0FBQzVELFFBQUksYUFBYSxjQUFjLFdBQVcsSUFBSTtBQUM5QyxRQUFJLFFBQVEsS0FBSyxhQUFhLEdBQUc7QUFDakMsUUFBSSxRQUFRLEtBQUssYUFBYSxHQUFHO0FBRWpDLFFBQUksTUFBTSxTQUFRLEtBQU0sTUFBTSxTQUFRLEdBQUk7QUFDeEMsaUJBQVcsVUFBVSxNQUFNLFVBQVUsS0FBSyxJQUFJLEdBQUcsTUFBTSxVQUFVLEtBQUssSUFBSSxDQUFDO0FBQUEsSUFDNUU7QUFFRCxRQUFJLGtCQUFrQixZQUFZO0FBQ2hDLFdBQUssT0FBTyxrQkFBa0I7QUFBQSxJQUNwQyxPQUFXO0FBQ0wsY0FBUSxlQUFlLEtBQUssUUFBUSxjQUFjO0FBQUEsSUFDbkQ7QUFHRCxhQUFTLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSztBQUM1QixlQUFTLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSztBQUM1QixtQkFBVyxLQUFJO0FBQ2YsbUJBQVcsV0FBVyxJQUFJLElBQUksU0FBUyxLQUFLLFVBQVUsS0FBSyxJQUFJLGNBQWMsS0FBSztBQUNsRixtQkFBVyxXQUFXLElBQUksSUFBSSxTQUFTLEtBQUssVUFBVSxLQUFLLElBQUksY0FBYyxNQUFNO0FBQ25GLG1CQUFXLE9BQU8sVUFBVTtBQUM1QixtQkFBVyxRQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUQsUUFBSSxVQUFVLElBQUksY0FBYyxlQUFlLFFBQVE7QUFDdkQsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0sc0JBQXNCLFFBQVE7QUFBQSxFQUNsQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsT0FBTyxLQUFLLE9BQU8sT0FBTztBQUN4QixRQUFJLENBQUMsT0FBTztBQUNWO0FBQUEsSUFDRDtBQUVELFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksU0FBUyxLQUFLLGFBQWEsUUFBUSxFQUFFLFVBQVUsTUFBTTtBQUN6RCxRQUFJLGNBQWMsS0FBSyxhQUFhLGFBQWEsRUFBRSxVQUFVLGFBQWE7QUFDMUUsUUFBSSxVQUFVLEdBQUcsQ0FBQztBQUVsQixRQUFJLFdBQVcsUUFBUTtBQUNyQixVQUFJLE9BQU8sS0FBSztBQUFBLElBQ2pCO0FBRUQsUUFBSSxnQkFBZ0IsZUFBZTtBQUNqQyxVQUFJLE1BQU0sSUFBSSxXQUFXLElBQUksU0FBUztBQUFBLElBQ3ZDO0FBRUQsUUFBSSxLQUFJO0FBRVIsUUFBSSxZQUFZLElBQUksV0FBVyxLQUFLLFVBQVUsSUFBSTtBQUNsRCxjQUFVLE9BQU8sS0FBSztBQUN0QixjQUFVLFdBQVcsVUFBVSxJQUFJLFNBQVMsS0FBSyxVQUFVLFdBQVcsS0FBSyxhQUFhLFNBQVMsRUFBRSxTQUFVLENBQUE7QUFDN0csY0FBVSxXQUFXLE9BQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxRQUFRLEtBQUssYUFBYSxNQUFNLEVBQUUsU0FBVSxDQUFBO0FBQ3BHLGNBQVUsV0FBVyxPQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsUUFBUSxLQUFLLGFBQWEsTUFBTSxFQUFFLFNBQVUsQ0FBQTtBQUNwRyxjQUFVLFdBQVcsUUFBUSxJQUFJLFNBQVMsS0FBSyxVQUFVLFNBQVMsS0FBSyxhQUFhLGFBQWEsRUFBRSxTQUFVLENBQUE7QUFDN0csY0FBVSxXQUFXLFNBQVMsSUFBSSxTQUFTLEtBQUssVUFBVSxVQUFVLEtBQUssYUFBYSxjQUFjLEVBQUUsU0FBVSxDQUFBO0FBQ2hILGNBQVUsV0FBVyxXQUFXLElBQUksU0FBUyxLQUFLLFVBQVUsWUFBWSxLQUFLLGFBQWEsVUFBVSxFQUFFLFNBQVUsQ0FBQTtBQUNoSCxjQUFVLFdBQVcsT0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLFFBQVEsS0FBSyxhQUFhLE1BQU0sRUFBRSxTQUFTLE9BQU8sQ0FBQztBQUMzRyxjQUFVLFdBQVcsU0FBUyxJQUFJLFNBQVMsS0FBSyxVQUFVLFVBQVUsS0FBSyxhQUFhLFFBQVEsRUFBRSxTQUFTLE1BQU0sQ0FBQztBQUNoSCxjQUFVLFdBQVcsS0FBSztBQUMxQixjQUFVLE9BQU8sR0FBRztBQUNwQixRQUFJLFFBQU87QUFFWCxRQUFJLGdCQUFnQixlQUFlO0FBQ2pDLFVBQUksTUFBTSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksU0FBUztBQUFBLElBQy9DO0FBRUQsUUFBSSxXQUFXLFFBQVE7QUFDckIsVUFBSSxPQUFPLENBQUMsS0FBSztBQUFBLElBQ2xCO0FBRUQsUUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFBQSxFQUNyQjtBQUVIO0FBRUEsTUFBTSxvQkFBb0IsUUFBUTtBQUFBLEVBQ2hDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxTQUFTO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSxpQkFBaUIsZ0JBQWdCO0FBQUEsRUFDckMsY0FBYztBQUNaLFVBQU0sR0FBRyxTQUFTO0FBQ2xCLFNBQUssT0FBTztBQUFBLEVBQ2I7QUFBQSxFQUVELGVBQWUsS0FBSztBQUNsQixRQUFJLGNBQWMsSUFBSTtBQUN0QixTQUFLLFNBQVMsUUFBUSxXQUFTO0FBQzdCLGtCQUFZLGVBQWUsTUFBTSxlQUFlLEdBQUcsQ0FBQztBQUFBLElBQzFELENBQUs7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSx3QkFBd0IsUUFBUTtBQUFBLEVBQ3BDLFlBQVkzSSxXQUFVMEUsT0FBTSxrQkFBa0I7QUFDNUMsVUFBTTFFLFdBQVUwRSxPQUFNLGdCQUFnQjtBQUN0QyxTQUFLLHNCQUFzQixDQUFDLGVBQWU7QUFDM0MsU0FBSyxRQUFRO0FBQ2IsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osYUFBUyxRQUFRLFdBQVM7QUFDeEIsVUFBSSxNQUFNLFNBQVMsUUFBUTtBQUN6QixjQUFNLEtBQUssS0FBSztBQUFBLE1BQ2pCO0FBQUEsSUFDUCxDQUFLO0FBQUEsRUFDRjtBQUFBLEVBRUQsbUJBQW1CO0FBQ2pCLFdBQU8sS0FBSyxhQUFhLGVBQWUsRUFBRSxVQUFVLG1CQUFtQjtBQUFBLEVBQ3hFO0FBQUEsRUFFRCxlQUFlLEtBQUssU0FBUyxtQkFBbUI7QUFFOUMsUUFBSSxpQkFBaUI7QUFFckIsUUFBSSxLQUFLLG1CQUFtQixZQUFZO0FBQ3RDLHVCQUFpQixLQUFLLGlCQUFrQixFQUFDLGNBQWE7QUFDdEQsV0FBSyxxQkFBcUIsY0FBYztBQUFBLElBQ3pDO0FBRUQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLFdBQVcsS0FBSyxZQUFZLEtBQUssT0FBTztBQUU1QyxRQUFJLENBQUMsVUFBVTtBQUNiLGFBQU8sS0FBSyxpQkFBaUIsbUJBQW1CLE1BQU0sTUFBTSxTQUFTLEdBQUcsS0FBSztBQUFBLElBQzlFO0FBRUQsVUFBTSxRQUFRLFVBQVE7QUFDcEIsZUFBUyxhQUFhLEtBQUssUUFBUSxLQUFLLGlCQUFpQixtQkFBbUIsS0FBSyxLQUFLLENBQUM7QUFBQSxJQUM3RixDQUFLO0FBRUQsUUFBSSxLQUFLLGFBQWEsbUJBQW1CLEVBQUUsU0FBUSxHQUFJO0FBRXJELFVBQUk7QUFBQSxRQUNGLFVBQUExRTtBQUFBLE1BQ0QsSUFBRztBQUNKLFVBQUk7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ1IsSUFBVUEsVUFBUztBQUNiLFVBQUksQ0FBQyxRQUFRLElBQUksU0FBUztBQUMxQixVQUFJLE9BQU8sSUFBSSxZQUFZQSxXQUFVLElBQUk7QUFDekMsV0FBSyxXQUFXLElBQUksSUFBSSxTQUFTQSxXQUFVLEtBQUssQ0FBQyxxQkFBcUIsQ0FBRztBQUN6RSxXQUFLLFdBQVcsSUFBSSxJQUFJLFNBQVNBLFdBQVUsS0FBSyxDQUFDLHFCQUFxQixDQUFHO0FBQ3pFLFdBQUssV0FBVyxRQUFRLElBQUksU0FBU0EsV0FBVSxTQUFTLGtCQUFrQjtBQUMxRSxXQUFLLFdBQVcsU0FBUyxJQUFJLFNBQVNBLFdBQVUsVUFBVSxrQkFBa0I7QUFDNUUsVUFBSSxRQUFRLElBQUksU0FBU0EsV0FBVSxJQUFJO0FBQ3ZDLFlBQU0sV0FBVyxZQUFZLElBQUksU0FBU0EsV0FBVSxhQUFhLEtBQUssYUFBYSxtQkFBbUIsRUFBRSxTQUFVLENBQUE7QUFDbEgsWUFBTSxXQUFXLENBQUMsSUFBSTtBQUN0QixVQUFJLGFBQWEsSUFBSSxXQUFXQSxXQUFVLElBQUk7QUFDOUMsaUJBQVcsV0FBVyxJQUFJLElBQUksU0FBU0EsV0FBVSxLQUFLLENBQUM7QUFDdkQsaUJBQVcsV0FBVyxJQUFJLElBQUksU0FBU0EsV0FBVSxLQUFLLENBQUM7QUFDdkQsaUJBQVcsV0FBVyxRQUFRLElBQUksU0FBU0EsV0FBVSxTQUFTLFNBQVMsS0FBSztBQUM1RSxpQkFBVyxXQUFXLFNBQVMsSUFBSSxTQUFTQSxXQUFVLFVBQVUsU0FBUyxNQUFNO0FBQy9FLGlCQUFXLFdBQVcsQ0FBQyxLQUFLO0FBQzVCLFVBQUksZ0JBQWdCQSxVQUFTLGFBQWEsU0FBUyxPQUFPLFNBQVMsTUFBTTtBQUN6RSxVQUFJLGFBQWEsY0FBYyxXQUFXLElBQUk7QUFDOUMsaUJBQVcsWUFBWTtBQUN2QixpQkFBVyxPQUFPLFVBQVU7QUFDNUIsYUFBTyxXQUFXLGNBQWMsZUFBZSxXQUFXO0FBQUEsSUFDM0Q7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQscUJBQXFCLGdCQUFnQjtBQUNuQyxTQUFLLG9CQUFvQixRQUFRLHdCQUFzQjtBQUNyRCxVQUFJLENBQUMsS0FBSyxhQUFhLGtCQUFrQixFQUFFLGNBQWMsZUFBZSxhQUFhLGtCQUFrQixFQUFFLFNBQVEsR0FBSTtBQUNuSCxhQUFLLGFBQWEsb0JBQW9CLElBQUksRUFBRSxTQUFTLGVBQWUsYUFBYSxrQkFBa0IsRUFBRSxTQUFVLENBQUE7QUFBQSxNQUNoSDtBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUVELGlCQUFpQixtQkFBbUIsT0FBTztBQUN6QyxRQUFJLGtCQUFrQixZQUFZO0FBQ2hDLFVBQUksWUFBWSxJQUFJLFNBQVMsS0FBSyxVQUFVLFNBQVMsS0FBSztBQUMxRCxhQUFPLFVBQVUsV0FBVyxpQkFBaUIsRUFBRSxTQUFRO0FBQUEsSUFDeEQ7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUVIO0FBRUEsTUFBTSw4QkFBOEIsZ0JBQWdCO0FBQUEsRUFDbEQsWUFBWUEsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxvQkFBb0IsS0FBSyxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsRUFDckQ7QUFBQSxFQUVELFlBQVksS0FBSyxTQUFTO0FBQ3hCLFFBQUkscUJBQXFCLEtBQUssaUJBQWdCLE1BQU87QUFDckQsUUFBSSxjQUFjLHFCQUFxQixRQUFRLGVBQWUsR0FBRyxJQUFJO0FBRXJFLFFBQUksc0JBQXNCLENBQUMsYUFBYTtBQUN0QyxhQUFPO0FBQUEsSUFDUjtBQUVELFFBQUksQ0FBQyxLQUFLLGFBQWEsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLLGFBQWEsSUFBSSxFQUFFLFNBQVEsS0FBTSxDQUFDLEtBQUssYUFBYSxJQUFJLEVBQUUsU0FBVSxLQUFJLENBQUMsS0FBSyxhQUFhLElBQUksRUFBRSxZQUFZO0FBQzVKLFdBQUssYUFBYSxNQUFNLElBQUksRUFBRSxTQUFTLENBQUM7QUFDeEMsV0FBSyxhQUFhLE1BQU0sSUFBSSxFQUFFLFNBQVMsQ0FBQztBQUN4QyxXQUFLLGFBQWEsTUFBTSxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBQ3hDLFdBQUssYUFBYSxNQUFNLElBQUksRUFBRSxTQUFTLENBQUM7QUFBQSxJQUN6QztBQUVELFFBQUksS0FBSyxxQkFBcUIsWUFBWSxJQUFJLFlBQVksUUFBUSxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVcsSUFBRyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUM3SSxRQUFJLEtBQUsscUJBQXFCLFlBQVksSUFBSSxZQUFZLFNBQVMsS0FBSyxhQUFhLElBQUksRUFBRSxVQUFXLElBQUcsS0FBSyxhQUFhLElBQUksRUFBRSxVQUFVLEdBQUc7QUFDOUksUUFBSSxLQUFLLHFCQUFxQixZQUFZLElBQUksWUFBWSxRQUFRLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVyxJQUFHLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBQzdJLFFBQUksS0FBSyxxQkFBcUIsWUFBWSxJQUFJLFlBQVksU0FBUyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVcsSUFBRyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUU5SSxRQUFJLE9BQU8sTUFBTSxPQUFPLElBQUk7QUFDMUIsYUFBTztBQUFBLElBQ1I7QUFFRCxXQUFPLElBQUkscUJBQXFCLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUMvQztBQUVIO0FBRUEsTUFBTSw4QkFBOEIsZ0JBQWdCO0FBQUEsRUFDbEQsWUFBWTFFLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZ0JBQWdCO0FBQ3RDLFNBQUssT0FBTztBQUNaLFNBQUssb0JBQW9CLEtBQUssTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLElBQUk7QUFBQSxFQUNoRTtBQUFBLEVBRUQsWUFBWSxLQUFLLFNBQVM7QUFDeEIsUUFBSSxxQkFBcUIsS0FBSyxpQkFBZ0IsTUFBTztBQUNyRCxRQUFJLGNBQWMsUUFBUSxlQUFlLEdBQUc7QUFFNUMsUUFBSSxzQkFBc0IsQ0FBQyxhQUFhO0FBQ3RDLGFBQU87QUFBQSxJQUNSO0FBRUQsUUFBSSxDQUFDLEtBQUssYUFBYSxJQUFJLEVBQUUsU0FBUSxHQUFJO0FBQ3ZDLFdBQUssYUFBYSxNQUFNLElBQUksRUFBRSxTQUFTLEtBQUs7QUFBQSxJQUM3QztBQUVELFFBQUksQ0FBQyxLQUFLLGFBQWEsSUFBSSxFQUFFLFNBQVEsR0FBSTtBQUN2QyxXQUFLLGFBQWEsTUFBTSxJQUFJLEVBQUUsU0FBUyxLQUFLO0FBQUEsSUFDN0M7QUFFRCxRQUFJLENBQUMsS0FBSyxhQUFhLEdBQUcsRUFBRSxTQUFRLEdBQUk7QUFDdEMsV0FBSyxhQUFhLEtBQUssSUFBSSxFQUFFLFNBQVMsS0FBSztBQUFBLElBQzVDO0FBRUQsUUFBSSxLQUFLLHFCQUFxQixZQUFZLElBQUksWUFBWSxRQUFRLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVyxJQUFHLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBQzdJLFFBQUksS0FBSyxxQkFBcUIsWUFBWSxJQUFJLFlBQVksU0FBUyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVcsSUFBRyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUM5SSxRQUFJLEtBQUs7QUFDVCxRQUFJLEtBQUs7QUFFVCxRQUFJLEtBQUssYUFBYSxJQUFJLEVBQUUsU0FBUSxHQUFJO0FBQ3RDLFdBQUsscUJBQXFCLFlBQVksSUFBSSxZQUFZLFFBQVEsS0FBSyxhQUFhLElBQUksRUFBRSxVQUFXLElBQUcsS0FBSyxhQUFhLElBQUksRUFBRSxVQUFVLEdBQUc7QUFBQSxJQUMxSTtBQUVELFFBQUksS0FBSyxhQUFhLElBQUksRUFBRSxTQUFRLEdBQUk7QUFDdEMsV0FBSyxxQkFBcUIsWUFBWSxJQUFJLFlBQVksU0FBUyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVcsSUFBRyxLQUFLLGFBQWEsSUFBSSxFQUFFLFVBQVUsR0FBRztBQUFBLElBQzNJO0FBRUQsUUFBSSxJQUFJLHNCQUFzQixZQUFZLFFBQVEsWUFBWSxVQUFVLElBQU0sS0FBSyxhQUFhLEdBQUcsRUFBRSxjQUFjLEtBQUssYUFBYSxHQUFHLEVBQUU7QUFDMUksUUFBSSxLQUFLLEtBQUssYUFBYSxJQUFJLEVBQUUsVUFBUztBQUMxQyxXQUFPLElBQUkscUJBQXFCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDO0FBQUEsRUFDdEQ7QUFFSDtBQUVBLE1BQU0sb0JBQW9CLFFBQVE7QUFBQSxFQUNoQyxZQUFZMUUsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osUUFBSSxTQUFTLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxRQUFRLEVBQUUsVUFBUyxDQUFFLENBQUM7QUFDN0UsUUFBSSxjQUFjLEtBQUssU0FBUyxjQUFjO0FBQzlDLFFBQUksWUFBWSxLQUFLLFNBQVMsY0FBYyxJQUFJO0FBRWhELFFBQUksVUFBVSxVQUFXLE1BQUssSUFBSTtBQUNoQyxnQkFBVSxTQUFTLE1BQU07QUFBQSxJQUMxQjtBQUVELFFBQUksWUFBWSxZQUFZO0FBQzFCLGtCQUFZLFVBQVUsV0FBVyxXQUFXO0FBQUEsSUFDN0M7QUFFRCxTQUFLLFNBQVM7QUFDZCxTQUFLLFFBQVEsVUFBVTtFQUN4QjtBQUVIO0FBRUEsTUFBTSx1QkFBdUIsUUFBUTtBQUFBLEVBQ25DLFlBQVkxRSxXQUFVMEUsT0FBTSxrQkFBa0I7QUFDNUMsVUFBTTFFLFdBQVUwRSxPQUFNLGdCQUFnQjtBQUN0QyxTQUFLLE9BQU87QUFDWixTQUFLLFdBQVc7QUFDaEIsU0FBSyxlQUFlO0FBQ3BCLFNBQUssZUFBZTtBQUNwQixTQUFLLFVBQVU7QUFDZixTQUFLLFNBQVM7QUFDZCxJQUFBMUUsVUFBUyxPQUFPLFdBQVcsS0FBSyxJQUFJO0FBQ3BDLFNBQUssUUFBUSxLQUFLLGFBQWEsT0FBTyxFQUFFO0FBQ3hDLFNBQUssY0FBYyxLQUFLLFFBQVEsS0FBSyxhQUFhLEtBQUssRUFBRTtBQUN6RCxTQUFLLE9BQU8sS0FBSyxhQUFhLE1BQU07QUFDcEMsU0FBSyxLQUFLLEtBQUssYUFBYSxJQUFJO0FBQ2hDLFNBQUssU0FBUyxJQUFJLFNBQVNBLFdBQVUsVUFBVSxJQUFJO0FBQ25ELFFBQUksYUFBYSxLQUFLLGFBQWEsUUFBUTtBQUUzQyxRQUFJLFdBQVcsWUFBWTtBQUN6QixXQUFLLE9BQU8sU0FBUyxXQUFXLFVBQVMsRUFBRyxNQUFNLEdBQUcsQ0FBQztBQUFBLElBQ3ZEO0FBQUEsRUFDRjtBQUFBLEVBRUQsY0FBYztBQUNaLFFBQUksZ0JBQWdCLEtBQUssYUFBYSxlQUFlLEVBQUUsVUFBUztBQUNoRSxRQUFJLGdCQUFnQixLQUFLLGFBQWEsZUFBZSxFQUFFLFVBQVM7QUFFaEUsUUFBSSxrQkFBa0IsT0FBTztBQUMzQixhQUFPLEtBQUssT0FBTyxTQUFTLGVBQWUsSUFBSTtBQUFBLElBQ2hEO0FBRUQsV0FBTyxLQUFLLE9BQU8sYUFBYSxlQUFlLElBQUk7QUFBQSxFQUNwRDtBQUFBLEVBRUQsWUFBWTtBQUNWLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxLQUFLO0FBRVQsUUFBSSxXQUFXLEtBQUssVUFBUyxLQUFNLEdBQUcsVUFBUyxJQUFLLEtBQUssVUFBVyxLQUFJO0FBRXhFLFFBQUksaUJBQWlCLEtBQUs7QUFDeEIsa0JBQVk7QUFBQSxJQUNiO0FBRUQsV0FBTyxHQUFHLE9BQU8sUUFBUSxFQUFFLE9BQU8sWUFBWTtBQUFBLEVBQy9DO0FBQUEsRUFFRCxPQUFPLE9BQU87QUFDWixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksT0FBTyxLQUFLO0FBRWhCLFFBQUksQ0FBQyxLQUFLLGNBQWM7QUFDdEIsV0FBSyxlQUFlLEtBQUs7QUFDekIsV0FBSyxlQUFlLEtBQUs7SUFDMUI7QUFHRCxRQUFJLEtBQUssV0FBVyxLQUFLLGFBQWE7QUFDcEMsVUFBSSxPQUFPLEtBQUssYUFBYSxNQUFNLEVBQUUsVUFBVSxRQUFRO0FBRXZELFVBQUksS0FBSyxhQUFhLGFBQWEsRUFBRSxVQUFTLE1BQU8sZ0JBQWdCLEtBQUssYUFBYSxXQUFXLEVBQUUsVUFBUyxNQUFPLGNBQWM7QUFDaEksYUFBSyxXQUFXO0FBQUEsTUFDakIsV0FBVSxTQUFTLFlBQVksQ0FBQyxLQUFLLFFBQVE7QUFDNUMsYUFBSyxTQUFTO0FBQ2QsZUFBTyxrQkFBa0I7QUFDekIsZUFBTyx1QkFBdUIsS0FBSztNQUNwQyxXQUFVLFNBQVMsWUFBWSxDQUFDLEtBQUssU0FBUztBQUM3QyxhQUFLLFVBQVU7QUFDZixhQUFLLFNBQVMsT0FBTyxrQkFBa0IsT0FBTyx1QkFBdUIsS0FBSyxZQUFZO0FBQ3RGLGVBQU87QUFBQSxNQUNSO0FBRUQsYUFBTztBQUFBLElBQ1I7QUFFRCxTQUFLLFlBQVk7QUFFakIsUUFBSSxVQUFVO0FBRWQsUUFBSSxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQzlCLFVBQUksV0FBVyxLQUFLO0FBRXBCLFVBQUksV0FBVyxLQUFLLGFBQWEsTUFBTTtBQUV2QyxVQUFJLFNBQVMsWUFBWTtBQUV2QixZQUFJLE9BQU8sU0FBUztBQUNwQixtQkFBVyxHQUFHLE9BQU8sTUFBTSxHQUFHLEVBQUUsT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUNyRDtBQUVELFdBQUssU0FBUyxRQUFRO0FBQ3RCLGdCQUFVO0FBQUEsSUFDWDtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxjQUFjO0FBQ1osUUFBSTtBQUFBLE1BQ0YsVUFBQUE7QUFBQSxNQUNBLFFBQUFrSDtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksU0FBUztBQUFBLE1BQ1gsV0FBVyxLQUFLLFdBQVcsS0FBSyxVQUFVLEtBQUssY0FBYyxLQUFLO0FBQUEsSUFDeEU7QUFFSSxRQUFJQSxRQUFPLFlBQVk7QUFDckIsVUFBSSxJQUFJLE9BQU8sWUFBWUEsUUFBTyxXQUFXLFNBQVM7QUFDdEQsVUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDO0FBQ3JCLFVBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztBQUNwQixhQUFPLE9BQU8sSUFBSSxTQUFTbEgsV0FBVSxRQUFRLFdBQVdrSCxRQUFPLFNBQVEsRUFBRyxHQUFHLENBQUM7QUFDOUUsYUFBTyxLQUFLLElBQUksU0FBU2xILFdBQVUsTUFBTSxXQUFXa0gsUUFBTyxTQUFRLEVBQUcsR0FBRyxDQUFDO0FBQzFFLGFBQU8sWUFBWSxJQUFJLE9BQU8sS0FBSztBQUFBLElBQ3pDLE9BQVc7QUFDTCxhQUFPLE9BQU8sS0FBSztBQUNuQixhQUFPLEtBQUssS0FBSztBQUFBLElBQ2xCO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0sNEJBQTRCLGVBQWU7QUFBQSxFQUMvQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsWUFBWTtBQUNWLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsS0FBSztBQUNULFFBQUksWUFBWSxJQUFJLFNBQVMsS0FBSyxTQUFVLENBQUE7QUFDNUMsUUFBSSxVQUFVLElBQUksU0FBUyxHQUFHLFNBQVUsQ0FBQTtBQUV4QyxRQUFJLFVBQVUsTUFBTSxRQUFRLElBQUk7QUFFOUIsVUFBSSxJQUFJLFVBQVUsS0FBSyxRQUFRLElBQUksVUFBVSxLQUFLO0FBQ2xELFVBQUksSUFBSSxVQUFVLEtBQUssUUFBUSxJQUFJLFVBQVUsS0FBSztBQUNsRCxVQUFJLElBQUksVUFBVSxLQUFLLFFBQVEsSUFBSSxVQUFVLEtBQUs7QUFFbEQsYUFBTyxPQUFPLE9BQU8sS0FBSyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxLQUFLLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLEtBQUssTUFBTSxDQUFDLEdBQUcsR0FBRztBQUFBLElBQ2hHO0FBRUQsV0FBTyxLQUFLLGFBQWEsTUFBTSxFQUFFLFNBQVE7QUFBQSxFQUMxQztBQUVIO0FBRUEsTUFBTSxnQ0FBZ0MsZUFBZTtBQUFBLEVBQ25ELGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxZQUFZO0FBQ1YsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ04sSUFBUSxLQUFLO0FBRVQsUUFBSSxnQkFBZ0IsVUFBVSxLQUFLLFVBQVcsQ0FBQTtBQUM5QyxRQUFJLGNBQWMsVUFBVSxHQUFHLFVBQVcsQ0FBQTtBQUMxQyxRQUFJLFdBQVcsY0FBYyxJQUFJLENBQUN5RCxPQUFNLE1BQU07QUFDNUMsVUFBSUMsTUFBSyxZQUFZO0FBQ3JCLGFBQU9ELFNBQVFDLE1BQUtELFNBQVE7QUFBQSxJQUNsQyxDQUFLLEVBQUUsS0FBSyxHQUFHO0FBQ1gsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0sb0JBQW9CLFFBQVE7QUFBQSxFQUNoQyxZQUFZM0ssV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxZQUFZLEtBQUssYUFBYSxhQUFhLEVBQUU7QUFDbEQsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUcxRTtBQUNKLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBRUosYUFBUyxTQUFTLFVBQVU7QUFDMUIsY0FBUSxNQUFNO0FBQUEsYUFDUCxhQUNIO0FBQ0UsZUFBSyxXQUFXO0FBQ2hCLGNBQUksa0JBQWtCLE1BQU0sU0FBUyxhQUFhO0FBRWxELGNBQUksZ0JBQWdCLFlBQVk7QUFDOUIsd0JBQVksZ0JBQWdCLFVBQVcsS0FBSTtBQUFBLFVBQzVDO0FBRUQ7QUFBQSxRQUNEO0FBQUEsYUFFRTtBQUNILGVBQUssZUFBZTtBQUNwQjtBQUFBLGFBRUcsU0FDSDtBQUNFLGNBQUksUUFBUTtBQUVaLGNBQUksTUFBTSxZQUFZO0FBQ3BCLGlCQUFLLFFBQVE7QUFDYixpQkFBSyxXQUFXO0FBRWhCLGdCQUFJLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxhQUFhO0FBQ3JELG1CQUFLLE9BQU8sTUFBTSxXQUFXLENBQUE7QUFBQSxZQUM5QjtBQUVELGlCQUFLLE9BQU8sTUFBTSxTQUFTLE1BQU0sY0FBYztBQUFBLFVBQzdELE9BQW1CO0FBQ0wsaUJBQUssT0FBTyxNQUFNLFdBQVc7QUFBQSxVQUM5QjtBQUVEO0FBQUEsUUFDRDtBQUFBO0FBQUEsSUFFTjtBQUFBLEVBQ0Y7QUFBQSxFQUVELFNBQVM7QUFBQSxFQUNSO0FBRUg7QUFFQSxNQUFNLHdCQUF3QixRQUFRO0FBQUEsRUFDcEMsWUFBWUEsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTLEtBQUssYUFBYSxRQUFRLEVBQUU7QUFDMUMsU0FBSyxVQUFVLEtBQUssYUFBYSxTQUFTLEVBQUU7QUFDNUMsU0FBSyxhQUFhLEtBQUssYUFBYSxjQUFjLEVBQUU7RUFDckQ7QUFFSDtBQUVBLE1BQU0sNEJBQTRCLFlBQVk7QUFBQSxFQUM1QyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxZQUFZO0FBQUEsRUFDbEI7QUFFSDtBQUVBLE1BQU0sb0JBQW9CLFlBQVk7QUFBQSxFQUNwQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsVUFBVTtBQUNSLFFBQUksVUFBVSxLQUFLLGlCQUFrQixFQUFDLGNBQWE7QUFFbkQsUUFBSSxTQUFTO0FBQ1gsVUFBSSxhQUFhLFFBQVEsU0FBUztBQUVsQyxVQUFJLFlBQVk7QUFDZCxlQUFPLFdBQVc7TUFDbkI7QUFBQSxJQUNGO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFFSDtBQUVBLE1BQU0saUJBQWlCLFlBQVk7QUFBQSxFQUNqQyxZQUFZMUUsV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUdBO0FBQ0osUUFBSSxhQUFhLFdBQVc7QUFDNUIsUUFBSSxVQUFVLFdBQVcsU0FBUyxLQUFLLE1BQU0sS0FBSyxVQUFVLEVBQUUsTUFBTSxDQUFBQSxVQUFRQSxNQUFLLGFBQWEsQ0FBQztBQUMvRixTQUFLLFVBQVU7QUFDZixTQUFLLE9BQU8sVUFBVSxLQUFLLGdCQUFnQixVQUFVLElBQUk7QUFBQSxFQUMxRDtBQUFBLEVBRUQsVUFBVTtBQUNSLFdBQU8sS0FBSztBQUFBLEVBQ2I7QUFBQSxFQUVELGVBQWUsS0FBSztBQUNsQixRQUFJLEtBQUssU0FBUztBQUVoQixZQUFNLGVBQWUsR0FBRztBQUN4QixVQUFJO0FBQUEsUUFDRixVQUFBMUU7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0QsSUFBRztBQUNKLFVBQUk7QUFBQSxRQUNGO0FBQUEsTUFDUixJQUFVQSxVQUFTO0FBQ2IsVUFBSSxXQUFXLElBQUksU0FBU0EsV0FBVSxZQUFZLEtBQUssTUFBTUEsVUFBUyxJQUFJLElBQUksRUFBRSxRQUFRO0FBRXhGLFVBQUksTUFBTSxhQUFhO0FBQ3JCLGNBQU0saUJBQWlCLE1BQU0sSUFBSSxZQUFZLEdBQUcsSUFBSSxTQUFTLFVBQVUsR0FBRyxHQUFHLElBQUksS0FBSyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFBQSxNQUMzRztBQUFBLElBQ0YsV0FBVSxLQUFLLFNBQVMsU0FBUyxHQUFHO0FBRW5DLFVBQUksSUFBSSxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUk7QUFDeEMsUUFBRSxXQUFXLEtBQUs7QUFDbEIsUUFBRSxTQUFTO0FBQ1gsUUFBRSxPQUFPLEdBQUc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBRUQsVUFBVTtBQUNSLFFBQUk7QUFBQSxNQUNGLFFBQUFtSztBQUFBLElBQ04sSUFBUSxLQUFLO0FBRVQsUUFBSUEsU0FBUTtBQUNWLE1BQUFBLFFBQU8sS0FBSyxLQUFLLGlCQUFnQixFQUFHLFVBQVcsQ0FBQTtBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLEVBRUQsY0FBYztBQUNaLFFBQUksTUFBTSxLQUFLLFNBQVM7QUFDeEIsUUFBSSxPQUFPLE1BQU0sU0FBUztBQUFBLEVBQzNCO0FBRUg7QUFFQSxTQUFTLFVBQVUsUUFBUSxnQkFBZ0I7QUFBRSxNQUFJekgsUUFBTyxPQUFPLEtBQUssTUFBTTtBQUFHLE1BQUksT0FBTyx1QkFBdUI7QUFBRSxRQUFJLFVBQVUsT0FBTyxzQkFBc0IsTUFBTTtBQUFHLFFBQUksZ0JBQWdCO0FBQUUsZ0JBQVUsUUFBUSxPQUFPLFNBQVUsS0FBSztBQUFFLGVBQU8sT0FBTyx5QkFBeUIsUUFBUSxHQUFHLEVBQUU7QUFBQSxNQUFXLENBQUU7QUFBQTtBQUFLLElBQUFBLE1BQUssS0FBSyxNQUFNQSxPQUFNLE9BQU87QUFBQSxFQUFFO0FBQUcsU0FBT0E7QUFBTztBQUUzVixTQUFTLGdCQUFnQixRQUFRO0FBQUUsV0FBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVEsS0FBSztBQUFFLFFBQUksU0FBUyxVQUFVLE1BQU0sT0FBTyxVQUFVLEtBQUssQ0FBRTtBQUFFLFFBQUksSUFBSSxHQUFHO0FBQUUsZ0JBQVUsT0FBTyxNQUFNLEdBQUcsSUFBSSxFQUFFLFFBQVEsU0FBVSxLQUFLO0FBQUUsd0JBQWdCLFFBQVEsS0FBSyxPQUFPLElBQUk7QUFBQSxNQUFJLENBQUE7QUFBQSxJQUFFLFdBQVksT0FBTywyQkFBMkI7QUFBRSxhQUFPLGlCQUFpQixRQUFRLE9BQU8sMEJBQTBCLE1BQU0sQ0FBQztBQUFBLElBQUksT0FBTTtBQUFFLGdCQUFVLE9BQU8sTUFBTSxDQUFDLEVBQUUsUUFBUSxTQUFVLEtBQUs7QUFBRSxlQUFPLGVBQWUsUUFBUSxLQUFLLE9BQU8seUJBQXlCLFFBQVEsR0FBRyxDQUFDO0FBQUEsTUFBRSxDQUFFO0FBQUE7RUFBTTtBQUFDLFNBQU87QUFBUztBQUM1aEIsTUFBTSx3QkFBd0IsWUFBWTtBQUFBLEVBQ3hDLFlBQVkxQyxXQUFVMEUsT0FBTSxrQkFBa0I7QUFDNUMsVUFBTTFFLFdBQVUwRSxPQUFNLGdCQUFnQjtBQUN0QyxTQUFLLE9BQU87QUFDWixTQUFLLFlBQVk7QUFDakIsU0FBSyxhQUFhO0FBQ2xCLFNBQUssYUFBYTtBQUNsQixTQUFLLFlBQVk7QUFDakIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxnQkFBZ0Isb0JBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0QyxRQUFJLGNBQWMsS0FBSyxpQkFBa0IsRUFBQyxjQUFhO0FBQ3ZELFNBQUssT0FBTyxLQUFLO0FBQ2pCLFNBQUssWUFBWSxLQUFLLGNBQWMsV0FBVztBQUFBLEVBQ2hEO0FBQUEsRUFFRCxVQUFVO0FBQ1IsV0FBTyxLQUFLO0FBQUEsRUFDYjtBQUFBLEVBRUQsS0FBSyxLQUFLO0FBQ1IsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFFSixRQUFJLEtBQUs7QUFDUCxVQUFJLFVBQVM7QUFBQSxJQUNkO0FBRUQsY0FBVSxRQUFRLFVBQVE7QUFDeEIsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRCxJQUFHO0FBRUosY0FBUTtBQUFBLGFBQ0QsV0FBVztBQUNkLGNBQUksS0FBSztBQUNQLGdCQUFJLE9BQU8sT0FBTyxJQUFJLE9BQU8sRUFBRTtBQUFBLFVBQ2hDO0FBRUQ7QUFBQSxhQUVHLFdBQVc7QUFDZCxjQUFJLEtBQUs7QUFDUCxnQkFBSSxPQUFPLE9BQU8sSUFBSSxPQUFPLEVBQUU7QUFBQSxVQUNoQztBQUVEO0FBQUEsYUFFRyxXQUFXO0FBQ2QsY0FBSSxLQUFLO0FBQ1AsZ0JBQUksY0FBYyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtBQUFBLFVBQ25GO0FBRUQ7QUFBQSxhQUVHLFdBQVc7QUFDZCxjQUFJLEtBQUs7QUFDUCxnQkFBSSxpQkFBaUIsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO0FBQUEsVUFDaEU7QUFFRDtBQUFBLGFBRUcsV0FBVyxLQUNkO0FBQ0UsY0FBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksT0FBTyxRQUFRLEtBQUssRUFBRSxJQUFJO0FBQy9DLGNBQUksSUFBSSxLQUFLLEtBQUssS0FBSztBQUN2QixjQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksS0FBSztBQUNoQyxjQUFJLFNBQVMsS0FBSyxLQUFLLEtBQUssS0FBSztBQUVqQyxjQUFJLEtBQUs7QUFDUCxnQkFBSSxVQUFVLElBQUksRUFBRTtBQUNwQixnQkFBSSxPQUFPLEdBQUc7QUFDZCxnQkFBSSxNQUFNLFFBQVEsTUFBTTtBQUN4QixnQkFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sUUFBUSxRQUFRLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDdkQsZ0JBQUksTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNO0FBQ2hDLGdCQUFJLE9BQU8sQ0FBQyxHQUFHO0FBQ2YsZ0JBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQUEsVUFDdkI7QUFFRDtBQUFBLFFBQ0Q7QUFBQSxhQUVFLFdBQVc7QUFDZCxjQUFJLEtBQUs7QUFDUCxnQkFBSSxVQUFTO0FBQUEsVUFDZDtBQUVEO0FBQUE7QUFBQSxJQUVWLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFFRCxlQUFlLEtBQUs7QUFDbEIsU0FBSyxZQUFZLEdBQUc7QUFDcEIsUUFBSSxLQUFJO0FBQ1IsUUFBSSxpQkFBaUIsS0FBSyxPQUFPLFNBQVMsaUJBQWlCLEVBQUU7QUFDN0QsUUFBSSxXQUFXLEtBQUs7QUFDcEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLE9BQU8sSUFBSTtBQUVmLFFBQUksbUJBQW1CLGFBQWE7QUFDbEMsVUFBSSxVQUFTO0FBQUEsSUFDZDtBQUVELGNBQVUsUUFBUSxDQUFDLE9BQU8sTUFBTTtBQUM5QixVQUFJO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNO0FBQUEsTUFDUCxJQUFHO0FBQ0osVUFBSSxLQUFJO0FBQ1IsVUFBSSxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDeEIsVUFBSSxPQUFPLFFBQVE7QUFFbkIsVUFBSSxJQUFJLFdBQVc7QUFDakIsWUFBSSxTQUFTLGFBQWEsR0FBRyxDQUFDO0FBQUEsTUFDL0I7QUFFRCxVQUFJLElBQUksYUFBYTtBQUNuQixZQUFJLFdBQVcsYUFBYSxHQUFHLENBQUM7QUFBQSxNQUNqQztBQUVELFVBQUksUUFBTztBQUVYLFVBQUksbUJBQW1CLGFBQWE7QUFDbEMsWUFBSSxNQUFNLEdBQUc7QUFDWCxjQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUM7QUFBQSxRQUNyQztBQUVELFlBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQztBQUFBLE1BQ3JDO0FBQUEsSUFZUCxDQUFLO0FBRUQsUUFBSSxtQkFBbUIsYUFBYTtBQUNsQyxVQUFJLFlBQVksV0FBVztBQUMzQixVQUFJLGNBQWM7QUFDbEIsVUFBSSxPQUFNO0FBQ1YsVUFBSSxVQUFTO0FBQUEsSUFDZDtBQUVELFFBQUksUUFBTztBQUFBLEVBQ1o7QUFBQSxFQUVELHFCQUFxQjtBQUNuQixRQUFJLE1BQU0sVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQzlFLFdBQU8sS0FBSyxtQkFBbUIsUUFBUTtBQUFBLEVBQ3hDO0FBQUEsRUFFRCxxQkFBcUIsS0FBSyxRQUFRLGVBQWUsZUFBZSxjQUFjLGFBQWEsSUFBSTJGLElBQUcsT0FBTztBQUN2RyxRQUFJLFNBQVM7QUFDYixRQUFJLGFBQWEsS0FBSyxZQUFZLEtBQUtBLEVBQUM7QUFFeEMsUUFBSUEsT0FBTSxPQUFPLFdBQVcsYUFBYSxnQkFBZ0IsZUFBZTtBQUN0RSxxQkFBZSxnQkFBZ0IsaUJBQWlCO0FBQUEsSUFDakQ7QUFFRCxRQUFJLFFBQVEsSUFBSTtBQUNkLGdCQUFVLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxJQUN4QztBQUVELFFBQUksYUFBYSxLQUFLLGFBQWE7QUFDbkMsUUFBSSxLQUFLLEtBQUssMEJBQTBCLFFBQVEsWUFBWSxDQUFDO0FBQzdELFFBQUksS0FBSyxLQUFLLDBCQUEwQixTQUFTLFlBQVksWUFBWSxDQUFDO0FBQzFFLFFBQUksVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsSUFDTjtBQUNJLFFBQUksV0FBVyxNQUFNLEtBQUssS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJO0FBRWpFLFFBQUksSUFBSTtBQUNOLFVBQUksTUFBTSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksUUFBUSxJQUFJO0FBQzdDLFVBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFRLElBQUk7QUFDaEMsY0FBUSxLQUFLLGdCQUFnQixnQkFBZ0IsQ0FBQSxHQUFJLEVBQUUsR0FBRyxJQUFJO0FBQUEsUUFDeEQsR0FBRyxHQUFHLElBQUk7QUFBQSxRQUNWLEdBQUcsR0FBRyxJQUFJO0FBQUEsTUFDbEIsQ0FBTztBQUNELGNBQVEsS0FBSyxnQkFBZ0IsZ0JBQWdCLENBQUEsR0FBSSxFQUFFLEdBQUcsSUFBSTtBQUFBLFFBQ3hELEdBQUcsR0FBRyxJQUFJO0FBQUEsUUFDVixHQUFHLEdBQUcsSUFBSTtBQUFBLE1BQ2xCLENBQU87QUFBQSxJQUNGO0FBRUQsY0FBVTtBQUNWLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsWUFBWSxLQUFLLE1BQU07QUFDckIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLGFBQWEsUUFBUSxLQUFLLFFBQU87QUFFckMsUUFBSSxjQUFjLElBQUksVUFBVSxHQUFHO0FBQ2pDLGFBQU8sY0FBYyxJQUFJLFVBQVU7QUFBQSxJQUNwQztBQUVELFFBQUksVUFBVSxLQUFLLGtCQUFrQixLQUFLLFVBQVU7QUFDcEQsa0JBQWMsSUFBSSxZQUFZLE9BQU87QUFDckMsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUtELFlBQVksS0FBSztBQUNmLFFBQUksS0FBSyxXQUFXO0FBQ2xCO0FBQUEsSUFDRDtBQUVELFFBQUksYUFBYSxLQUFLO0FBQ3RCLFFBQUksUUFBUSxXQUFXLE1BQU0sRUFBRTtBQUMvQixRQUFJLGVBQWUsV0FBVyxNQUFNLEdBQUcsRUFBRSxTQUFTO0FBQ2xELFFBQUksS0FBSyxLQUFLLE9BQU8sYUFBYSxJQUFJLEVBQUUsUUFBUSxJQUFJLENBQUExQixPQUFLQSxHQUFFLFVBQVUsR0FBRyxDQUFDO0FBQ3pFLFFBQUksS0FBSyxLQUFLLE9BQU8sYUFBYSxJQUFJLEVBQUUsVUFBVSxHQUFHO0FBQ3JELFFBQUksU0FBUyxLQUFLLE9BQU8sU0FBUyxhQUFhLEVBQUUsVUFBVSxPQUFPO0FBQ2xFLFFBQUksY0FBYyxLQUFLLFNBQVMsZ0JBQWdCO0FBQ2hELFFBQUksZ0JBQWdCLEtBQUssT0FBTyxTQUFTLGdCQUFnQjtBQUN6RCxRQUFJLGdCQUFnQjtBQUVwQixRQUFJLENBQUMsWUFBWSxTQUFRLEtBQU0sWUFBWSxTQUFVLE1BQUssV0FBVztBQUNuRSxzQkFBZ0IsY0FBYztJQUNwQyxXQUFlLFlBQVksWUFBWTtBQUNqQyxVQUFJLFlBQVksZUFBZSxhQUFhLFlBQVksU0FBVSxNQUFLLFNBQVM7QUFDOUUsd0JBQWdCLFlBQVk7TUFDN0I7QUFBQSxJQUNGO0FBR0QsUUFBSSxxQkFBcUIsQ0FBQTtBQUN6QixRQUFJLFVBQVUsV0FBVztBQUN6QixTQUFLLHFCQUFxQjtBQUUxQixhQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsS0FBSztBQUNoQyx5QkFBbUIsS0FBSyxPQUFPLEdBQUcsT0FBTyxjQUFjLEdBQUcsS0FBSyxhQUFhO0FBQUEsSUFDN0U7QUFFRCxRQUFJLFFBQVEsbUJBQW1CLE9BQU8sQ0FBQyxLQUFLLEtBQUsrQixPQUFNQSxPQUFNLElBQUksSUFBSSxNQUFNLE9BQU8sR0FBRyxDQUFDO0FBQ3RGLFFBQUksWUFBWSxLQUFLLFlBQVksR0FBRztBQUNwQyxRQUFJLGdCQUFnQixLQUFLLElBQUksWUFBWSxPQUFPLENBQUM7QUFDakQsU0FBSyxZQUFZO0FBQ2pCLFNBQUssYUFBYSxLQUFLO0FBQ3ZCLFNBQUssWUFBWTtBQUNqQixRQUFJLGdCQUFnQixLQUFLO0FBQ3pCLFFBQUksY0FBYyxLQUFLLFNBQVMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJO0FBQzlELFFBQUksU0FBUztBQUViLFFBQUksV0FBVyxZQUFZLFdBQVcsVUFBVTtBQUM5QyxlQUFTLENBQUMsZ0JBQWdCO0FBQUEsSUFDM0I7QUFFRCxRQUFJLFdBQVcsU0FBUyxXQUFXLFNBQVM7QUFDMUMsZUFBUyxDQUFDO0FBQUEsSUFDWDtBQUVELGNBQVU7QUFDVixVQUFNLFFBQVEsQ0FBQyxNQUFNQSxPQUFNO0FBRXpCLFVBQUk7QUFBQSxRQUNGLFFBQVE7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLE1BQ0QsSUFBRyxLQUFLLHFCQUFxQixLQUFLLFFBQVEsZUFBZSxlQUFlLGNBQWMsUUFBUSxJQUFJLE1BQU1BLEVBQUM7QUFDMUcsZUFBUztBQUVULFVBQUksQ0FBQyxRQUFRLE1BQU0sQ0FBQyxRQUFRLElBQUk7QUFDOUI7QUFBQSxNQUNEO0FBaUJELFdBQUssVUFBVSxLQUFLO0FBQUEsUUFHbEIsTUFBTSxNQUFNQTtBQUFBLFFBQ1osSUFBSSxRQUFRO0FBQUEsUUFDWixJQUFJLFFBQVE7QUFBQSxRQUNaO0FBQUEsTUFDUixDQUFPO0FBQUEsSUFDUCxDQUFLO0FBQUEsRUFDRjtBQUFBLEVBRUQsY0FBYyxNQUFNO0FBQ2xCLFNBQUssYUFBYTtBQUVsQixRQUFJLENBQUMsTUFBTTtBQUNULGFBQU87SUFDUjtBQUVELFFBQUksZUFBZSxDQUFBO0FBQ25CLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osZUFBVyxNQUFLO0FBRWhCLFdBQU8sQ0FBQyxXQUFXLFNBQVM7QUFDMUIsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxNQUNELElBQUc7QUFDSixVQUFJLFNBQVMsVUFBVSxRQUFRLElBQUk7QUFDbkMsVUFBSSxTQUFTLFVBQVUsUUFBUSxJQUFJO0FBQ25DLFVBQUksVUFBVSxXQUFXO0FBQ3pCLFVBQUksa0JBQWtCLFFBQVE7QUFDOUIsVUFBSSxTQUFTLENBQUE7QUFFYixjQUFRLFFBQVE7QUFBQSxhQUNULFdBQVc7QUFDZCxlQUFLLE1BQU0sWUFBWSxNQUFNO0FBQzdCO0FBQUEsYUFFRyxXQUFXO0FBQ2QsNEJBQWtCLEtBQUssTUFBTSxZQUFZLE1BQU07QUFDL0M7QUFBQSxhQUVHLFdBQVc7QUFDZCw0QkFBa0IsS0FBSyxNQUFNLFlBQVksTUFBTTtBQUMvQztBQUFBLGFBRUcsV0FBVztBQUNkLDRCQUFrQixLQUFLLE1BQU0sWUFBWSxNQUFNO0FBQy9DO0FBQUEsYUFFRyxXQUFXO0FBQ2QsZUFBSyxNQUFNLFlBQVksTUFBTTtBQUM3QjtBQUFBLGFBRUcsV0FBVztBQUNkLDRCQUFrQixLQUFLLE1BQU0sWUFBWSxNQUFNO0FBQy9DO0FBQUEsYUFFRyxXQUFXO0FBQ2QsZUFBSyxNQUFNLFlBQVksTUFBTTtBQUM3QjtBQUFBLGFBRUcsV0FBVztBQUNkLDRCQUFrQixLQUFLLE1BQU0sWUFBWSxNQUFNO0FBQy9DO0FBQUEsYUFFRyxXQUFXO0FBQ2QsbUJBQVMsS0FBSyxNQUFNLFVBQVU7QUFDOUI7QUFBQSxhQUVHLFdBQVc7QUFDZCxzQkFBWSxNQUFNLFVBQVU7QUFDNUI7QUFBQTtBQUdKLFVBQUksUUFBUSxTQUFTLFdBQVcsWUFBWTtBQUMxQyxxQkFBYSxLQUFLO0FBQUEsVUFDaEIsTUFBTTtBQUFBLFVBQ047QUFBQSxVQUNBLE9BQU87QUFBQSxZQUNMLEdBQUc7QUFBQSxZQUNILEdBQUc7QUFBQSxVQUNKO0FBQUEsVUFDRCxZQUFZLEtBQUssV0FBVyxRQUFRLFFBQVEsaUJBQWlCLE1BQU07QUFBQSxRQUM3RSxDQUFTO0FBQUEsTUFDVCxPQUFhO0FBQ0wscUJBQWEsS0FBSztBQUFBLFVBQ2hCLE1BQU0sV0FBVztBQUFBLFVBQ2pCLFFBQVEsQ0FBRTtBQUFBLFVBQ1YsWUFBWTtBQUFBLFFBQ3RCLENBQVM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxNQUFNLFlBQVksUUFBUTtBQUN4QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUcsWUFBWSxNQUFNLFVBQVUsRUFBRTtBQUNsQyxXQUFPLEtBQUssR0FBRyxDQUFDO0FBQUEsRUFDakI7QUFBQSxFQUVELE1BQU0sWUFBWSxRQUFRO0FBQ3hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRyxZQUFZLE1BQU0sVUFBVSxFQUFFO0FBQ2xDLFdBQU8sS0FBSyxHQUFHLENBQUM7QUFDaEIsV0FBTyxXQUFXO0FBQUEsRUFDbkI7QUFBQSxFQUVELE1BQU0sWUFBWSxRQUFRO0FBQ3hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRyxZQUFZLE1BQU0sVUFBVSxFQUFFO0FBQ2xDLFdBQU8sS0FBSyxHQUFHLENBQUM7QUFDaEIsV0FBTyxXQUFXO0FBQUEsRUFDbkI7QUFBQSxFQUVELE1BQU0sWUFBWSxRQUFRO0FBQ3hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRyxZQUFZLE1BQU0sVUFBVSxFQUFFO0FBQ2xDLFdBQU8sS0FBSyxHQUFHLENBQUM7QUFDaEIsV0FBTyxXQUFXO0FBQUEsRUFDbkI7QUFBQSxFQUVELE1BQU0sWUFBWSxRQUFRO0FBQ3hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsV0FBTyxLQUFLLE1BQU0sR0FBRyxNQUFNLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQUEsRUFDN0Y7QUFBQSxFQUVELE1BQU0sWUFBWSxRQUFRO0FBQ3hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsV0FBTyxLQUFLLE1BQU0sR0FBRyxNQUFNLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQzVGLFdBQU8sV0FBVztBQUFBLEVBQ25CO0FBQUEsRUFFRCxNQUFNLFlBQVksUUFBUTtBQUN4QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsV0FBTyxLQUFLLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUFBLEVBQzNFO0FBQUEsRUFFRCxNQUFNLFlBQVksUUFBUTtBQUN4QixRQUFJO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsWUFBWSxNQUFNLFVBQVU7QUFDaEMsV0FBTyxLQUFLLGFBQWEsR0FBRyxhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUMxRSxXQUFPLFdBQVc7QUFBQSxFQUNuQjtBQUFBLEVBRUQsTUFBTSxZQUFZO0FBQ2hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDTixJQUFRLFlBQVksTUFBTSxVQUFVO0FBRWhDLFFBQUksY0FBYyxLQUFLLEtBQUssR0FBRztBQUM3QixZQUFNLElBQUksS0FBSztBQUFBLElBQ2hCO0FBRUQsUUFBSSxjQUFjLEtBQUssS0FBSyxHQUFHO0FBQzdCLFlBQU0sSUFBSSxLQUFLO0FBQUEsSUFDaEI7QUFFRCxXQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLGVBQWUsU0FBUztBQUFBLEVBQ25FO0FBQUEsRUFFRCxXQUFXLEdBQUcsR0FBRyxhQUFhLFFBQVE7QUFDcEMsUUFBSSxNQUFNO0FBQ1YsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxJQUFJO0FBRVIsWUFBUTtBQUFBLFdBQ0QsV0FBVztBQUNkLGVBQU8sS0FBSyxjQUFjLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxFQUFFO0FBQUEsV0FFakQsV0FBVztBQUVkLGNBQU07QUFDTixhQUFLLEtBQUssc0JBQXNCLEdBQUcsR0FBRyxHQUFHLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO0FBRXpHLGFBQUssSUFBSSxNQUFNLEtBQUssR0FBRyxLQUFLLE1BQU07QUFDaEMsZUFBSyxLQUFLLHNCQUFzQixHQUFHLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtBQUN6RyxpQkFBTyxLQUFLLGNBQWMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2hELGVBQUs7QUFBQSxRQUNOO0FBRUQsZUFBTztBQUFBLFdBRUosV0FBVztBQUVkLGNBQU07QUFDTixhQUFLLEtBQUssMEJBQTBCLEdBQUcsR0FBRyxHQUFHLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtBQUV2RixhQUFLLElBQUksTUFBTSxLQUFLLEdBQUcsS0FBSyxNQUFNO0FBQ2hDLGVBQUssS0FBSywwQkFBMEIsR0FBRyxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO0FBQ3ZGLGlCQUFPLEtBQUssY0FBYyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDaEQsZUFBSztBQUFBLFFBQ047QUFFRCxlQUFPO0FBQUEsV0FFSixXQUFXLEtBQ2Q7QUFFRSxjQUFNO0FBQ04sWUFBSSxRQUFRLE9BQU87QUFFbkIsWUFBSSxTQUFTLE9BQU87QUFFcEIsWUFBSSxNQUFNLE9BQU8sS0FBSztBQUN0QixZQUFJLE1BQU0sS0FBSyxLQUFLO0FBRXBCLFlBQUksS0FBSyxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUs7QUFDL0IsZ0JBQU0sS0FBSyxJQUFJLFFBQVEsR0FBRztBQUFBLFFBQzNCO0FBR0QsYUFBSyxLQUFLLHdCQUF3QixPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDO0FBRXRGLFlBQUksU0FBUyxHQUFHO0FBRWQsZUFBSyxJQUFJLFFBQVEsS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQ3ZDLGlCQUFLLEtBQUssd0JBQXdCLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUM7QUFDbEYsbUJBQU8sS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoRCxpQkFBSztBQUFBLFVBQ047QUFBQSxRQUNiLE9BQWlCO0FBRUwsZUFBSyxJQUFJLFFBQVEsS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQ3ZDLGlCQUFLLEtBQUssd0JBQXdCLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUM7QUFDbEYsbUJBQU8sS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoRCxpQkFBSztBQUFBLFVBQ047QUFBQSxRQUNGO0FBRUQsYUFBSyxLQUFLLHdCQUF3QixPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDO0FBQ3BGLGVBQU8sS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoRCxlQUFPO0FBQUEsTUFDUjtBQUFBO0FBR0wsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGVBQWUsTUFBTSxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQ3ZDLFFBQUksUUFBUSxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDaEYsUUFBSSxRQUFRLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSztBQUNoRixRQUFJakMsTUFBSyxNQUFNLFFBQVEsTUFBTSxNQUFNO0FBQ25DLFFBQUl5QixPQUFNLEtBQUssS0FBSyxPQUFPLFFBQVEsSUFBSXpCLEtBQUlBLEdBQUU7QUFFN0MsUUFBSSxNQUFNLEtBQUs7QUFDYixNQUFBeUIsUUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJLE9BQU96QixLQUFJeUI7QUFDZixRQUFJLEtBQUs7QUFFVCxRQUFJLFFBQVEsS0FBSztBQUVmLFdBQUs7QUFBQSxRQUNILEdBQUc7QUFBQSxRQUNILEdBQUcsUUFBUTtBQUFBLE1BQ25CO0FBQUEsSUFDQSxZQUFnQixRQUFRLFFBQVEsUUFBUSxNQUFNLGlCQUFpQnpCLElBQUc7QUFDNUQsV0FBSztBQUFBLFFBQ0gsR0FBRyxRQUFReUI7QUFBQSxRQUNYLEdBQUcsUUFBUTtBQUFBLE1BQ25CO0FBQUEsSUFDQSxPQUFXO0FBQ0wsVUFBSSxLQUFLO0FBQ1QsVUFBSSxLQUFLO0FBQ1QsVUFBSSxNQUFNLEtBQUssY0FBYyxLQUFLLEtBQUssS0FBSyxHQUFHO0FBRS9DLFVBQUksTUFBTSxhQUFhO0FBQ3JCLGVBQU87QUFBQSxNQUNSO0FBRUQsVUFBSSxLQUFLLFFBQVEsUUFBUSxNQUFNLFFBQVEsUUFBUSxRQUFRLE1BQU07QUFDN0QsV0FBSyxNQUFNO0FBQ1gsV0FBSyxNQUFNLEtBQUssTUFBTTtBQUN0QixXQUFLLE1BQU0sS0FBSyxNQUFNO0FBQ3RCLFVBQUksUUFBUSxLQUFLLGNBQWMsT0FBTyxPQUFPLElBQUksRUFBRTtBQUNuRCxVQUFJLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxRQUFRLEtBQUs7QUFDaEQsTUFBQUEsT0FBTSxLQUFLLEtBQUssT0FBTyxRQUFRLElBQUl6QixLQUFJQSxHQUFFO0FBRXpDLFVBQUksTUFBTSxLQUFLO0FBQ2IsUUFBQXlCLFFBQU87QUFBQSxNQUNSO0FBRUQsYUFBT3pCLEtBQUl5QjtBQUNYLFdBQUs7QUFBQSxRQUNILEdBQUcsS0FBS0E7QUFBQSxRQUNSLEdBQUcsS0FBSztBQUFBLE1BQ2hCO0FBQUEsSUFDSztBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxlQUFlLFVBQVU7QUFDdkIsUUFBSSxVQUFVLEtBQUs7QUFDbkIsUUFBSSx1QkFBdUI7QUFDM0IsUUFBSSxJQUFJO0FBRVIsUUFBSSxXQUFXLFNBQVksV0FBVyxPQUFVLFNBQVM7QUFDdkQsYUFBTztBQUFBLElBQ1I7QUFFRCxRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUVKLGFBQVMsV0FBVyxXQUFXO0FBQzdCLFVBQUksWUFBWSxRQUFRLGFBQWEsUUFBVyx1QkFBdUIsUUFBUSxhQUFhLE9BQVUsV0FBVztBQUMvRyxnQ0FBd0IsUUFBUTtBQUNoQztBQUFBLE1BQ0Q7QUFFRCxVQUFJLFFBQVEsV0FBVztBQUN2QixVQUFJLFdBQVc7QUFFZixjQUFRLFFBQVE7QUFBQSxhQUNULFdBQVc7QUFDZCxjQUFJLEtBQUssZUFBZSxPQUFPLFFBQVEsTUFBTSxHQUFHLFFBQVEsTUFBTSxHQUFHLFFBQVEsT0FBTyxJQUFJLFFBQVEsT0FBTyxJQUFJLFFBQVEsTUFBTSxHQUFHLFFBQVEsTUFBTSxDQUFDO0FBQ3ZJO0FBQUEsYUFFRyxXQUFXLEtBQ2Q7QUFDRSxjQUFJLFFBQVEsUUFBUSxPQUFPO0FBRTNCLGNBQUksU0FBUyxRQUFRLE9BQU87QUFFNUIsY0FBSSxNQUFNLFFBQVEsT0FBTyxLQUFLO0FBQzlCLHFCQUFXLFFBQVEsUUFBUSxRQUFRLGFBQWE7QUFFaEQsY0FBSSxTQUFTLEtBQUssV0FBVyxPQUFPLFVBQVUsS0FBSyxXQUFXLEtBQUs7QUFDakU7QUFBQSxVQUNEO0FBRUQsY0FBSSxLQUFLLHdCQUF3QixRQUFRLE9BQU8sSUFBSSxRQUFRLE9BQU8sSUFBSSxRQUFRLE9BQU8sSUFBSSxRQUFRLE9BQU8sSUFBSSxVQUFVLFFBQVEsT0FBTyxFQUFFO0FBQ3hJO0FBQUEsUUFDRDtBQUFBLGFBRUUsV0FBVztBQUNkLHFCQUFXLFFBQVEsUUFBUTtBQUUzQixjQUFJLFdBQVcsR0FBRztBQUNoQix1QkFBVztBQUFBLFVBQ1o7QUFFRCxjQUFJLEtBQUssc0JBQXNCLFVBQVUsUUFBUSxNQUFNLEdBQUcsUUFBUSxNQUFNLEdBQUcsUUFBUSxPQUFPLElBQUksUUFBUSxPQUFPLElBQUksUUFBUSxPQUFPLElBQUksUUFBUSxPQUFPLElBQUksUUFBUSxPQUFPLElBQUksUUFBUSxPQUFPLEVBQUU7QUFDM0w7QUFBQSxhQUVHLFdBQVc7QUFDZCxxQkFBVyxRQUFRLFFBQVE7QUFFM0IsY0FBSSxXQUFXLEdBQUc7QUFDaEIsdUJBQVc7QUFBQSxVQUNaO0FBRUQsY0FBSSxLQUFLLDBCQUEwQixVQUFVLFFBQVEsTUFBTSxHQUFHLFFBQVEsTUFBTSxHQUFHLFFBQVEsT0FBTyxJQUFJLFFBQVEsT0FBTyxJQUFJLFFBQVEsT0FBTyxJQUFJLFFBQVEsT0FBTyxFQUFFO0FBQ3pKO0FBQUE7QUFHSixVQUFJLEdBQUc7QUFDTCxlQUFPO0FBQUEsTUFDUjtBQUVEO0FBQUEsSUFDRDtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxjQUFjLElBQUksSUFBSSxJQUFJLElBQUk7QUFDNUIsV0FBTyxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sS0FBSyxHQUFHO0FBQUEsRUFDL0Q7QUFBQSxFQUVELGdCQUFnQjtBQUNkLFFBQUksS0FBSyxlQUFlLElBQUk7QUFDMUIsV0FBSyxhQUFhLEtBQUssVUFBVSxPQUFPLENBQUMsUUFBUSxZQUFZLFFBQVEsYUFBYSxJQUFJLFNBQVMsUUFBUSxhQUFhLFFBQVEsQ0FBQztBQUFBLElBQzlIO0FBRUQsV0FBTyxLQUFLO0FBQUEsRUFDYjtBQUFBLEVBRUQsc0JBQXNCLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQ2pFLFFBQUksSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRztBQUN4RSxRQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDeEUsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsSUFDTjtBQUFBLEVBQ0c7QUFBQSxFQUVELDBCQUEwQixLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQzNELFFBQUksSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDdkQsUUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRztBQUN2RCxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRztBQUFBLEVBRUQsd0JBQXdCLElBQUksSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLO0FBQ2xELFFBQUksU0FBUyxLQUFLLElBQUksR0FBRztBQUN6QixRQUFJLFNBQVMsS0FBSyxJQUFJLEdBQUc7QUFDekIsUUFBSSxLQUFLO0FBQUEsTUFDUCxHQUFHLEtBQUssS0FBSyxJQUFJLEtBQUs7QUFBQSxNQUN0QixHQUFHLEtBQUssS0FBSyxJQUFJLEtBQUs7QUFBQSxJQUM1QjtBQUNJLFdBQU87QUFBQSxNQUNMLEdBQUcsTUFBTSxHQUFHLElBQUksU0FBUyxHQUFHLElBQUk7QUFBQSxNQUNoQyxHQUFHLE1BQU0sR0FBRyxJQUFJLFNBQVMsR0FBRyxJQUFJO0FBQUEsSUFDdEM7QUFBQSxFQUNHO0FBQUEsRUFHRCxzQkFBc0IsV0FBVyxnQkFBZ0I7QUFDL0MsUUFBSSxVQUFVLEtBQUs7QUFDbkIsUUFBSSxZQUFZLGtCQUFrQjtBQUVsQyxRQUFJLE9BQU8sYUFBYSxVQUFVO0FBRWxDLFFBQUksQ0FBQyxLQUFLLG9CQUFvQixLQUFLLGlCQUFpQixTQUFTLFFBQVEsS0FBSyxpQkFBaUIsY0FBYyxXQUFXO0FBRWxILFdBQUssbUJBQW1CO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLENBQUU7QUFBQSxNQUNsQjtBQUVNLFVBQUksSUFBSTtBQUVSLGVBQVMsSUFBSSxHQUFHLEtBQUssU0FBUyxLQUFLLFdBQVc7QUFDNUMsWUFBSSxLQUFLLEtBQUssZUFBZSxDQUFDO0FBQzlCLFlBQUksS0FBSyxLQUFLLGVBQWUsSUFBSSxTQUFTO0FBRTFDLFlBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtBQUNkO0FBQUEsUUFDRDtBQUVELGFBQUssS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUU5QyxZQUFJLEtBQUssTUFBTTtBQUNiLGVBQUssaUJBQWlCLE9BQU8sS0FBSztBQUFBLFlBQ2hDLEdBQUcsR0FBRztBQUFBLFlBQ04sR0FBRyxHQUFHO0FBQUEsWUFDTixVQUFVO0FBQUEsVUFDdEIsQ0FBVztBQUNELGVBQUs7QUFBQSxRQUNOO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFRCwwQkFBMEIsZ0JBQWdCLE1BQU0sV0FBVztBQUN6RCxTQUFLLHNCQUFzQixNQUFNLFNBQVM7QUFFMUMsUUFBSSxpQkFBaUIsS0FBSyxpQkFBaUIsS0FBSyxjQUFlLElBQUcsTUFBUztBQUN6RSxhQUFPO0FBQUEsSUFDUjtBQUVELFFBQUksTUFBTSxLQUFLLE1BQU0saUJBQWlCLEtBQUssbUJBQW1CLEtBQUssaUJBQWlCLE9BQU8sU0FBUyxFQUFFO0FBQ3RHLFdBQU8sS0FBSyxpQkFBaUIsT0FBTyxRQUFRO0FBQUEsRUFDN0M7QUFFSDtBQUVBLElBQUksZUFBZTtBQUNuQixNQUFNLHFCQUFxQixnQkFBZ0I7QUFBQSxFQUN6QyxZQUFZbEssV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsUUFBSSxPQUFPLEtBQUssaUJBQWtCLEVBQUMsVUFBUztBQUU1QyxRQUFJLENBQUMsTUFBTTtBQUNUO0FBQUEsSUFDRDtBQUVELFFBQUksUUFBUSxLQUFLLFNBQVMsTUFBTSxLQUFLLDRCQUE0QixLQUFLLElBQUk7QUFDMUUsSUFBQTFFLFVBQVMsT0FBTyxLQUFLLElBQUk7QUFFekIsUUFBSSxDQUFDLE9BQU87QUFDVixXQUFLLEtBQUssVUFBVSxJQUFJO0FBQUEsSUFDOUIsT0FBVztBQUNMLFdBQUssS0FBSyxRQUFRLElBQUk7QUFBQSxJQUN2QjtBQUVELFNBQUssUUFBUTtBQUFBLEVBQ2Q7QUFBQSxFQUVELFVBQVUsTUFBTTtBQUNkLFFBQUksUUFBUTtBQUVaLFdBQU8sa0JBQWtCLGFBQWE7QUFDcEMsVUFBSTtBQUNGLFlBQUksUUFBUSxNQUFNLE1BQU0sU0FBUyxZQUFZLElBQUk7QUFDakQsY0FBTSxRQUFRO0FBQUEsTUFDZixTQUFRLEtBQVA7QUFDQSxnQkFBUSxNQUFNLDhCQUErQixPQUFPLE1BQU0sSUFBSyxHQUFHLEdBQUc7QUFBQSxNQUN0RTtBQUVELFlBQU0sU0FBUztBQUFBLElBQ2hCLENBQUE7RUFDRjtBQUFBLEVBRUQsUUFBUSxNQUFNO0FBQ1osUUFBSSxTQUFTO0FBRWIsV0FBTyxrQkFBa0IsYUFBYTtBQUNwQyxVQUFJZ0ksU0FBUSxhQUFhLEtBQUssSUFBSTtBQUVsQyxVQUFJQSxRQUFPO0FBQ1QsWUFBSXNDLFFBQU90QyxPQUFNO0FBRWpCLFlBQUlBLE9BQU0sT0FBTyxVQUFVO0FBQ3pCLGlCQUFPLFFBQVEsS0FBS3NDLEtBQUk7QUFBQSxRQUNsQyxPQUFlO0FBQ0wsaUJBQU8sUUFBUSxtQkFBbUJBLEtBQUk7QUFBQSxRQUN2QztBQUFBLE1BQ1QsT0FBYTtBQUNMLFlBQUk7QUFDRixjQUFJLFdBQVcsTUFBTSxPQUFPLFNBQVMsTUFBTSxJQUFJO0FBQy9DLGNBQUksTUFBTSxNQUFNLFNBQVM7QUFDekIsaUJBQU8sUUFBUTtBQUFBLFFBQ2hCLFNBQVEsS0FBUDtBQUNBLGtCQUFRLE1BQU0sOEJBQStCLE9BQU8sTUFBTSxJQUFLLEdBQUcsR0FBRztBQUFBLFFBQ3RFO0FBQUEsTUFDRjtBQUVELGFBQU8sU0FBUztBQUFBLElBQ2pCLENBQUE7RUFDRjtBQUFBLEVBRUQsZUFBZSxLQUFLO0FBQ2xCLFFBQUk7QUFBQSxNQUNGLFVBQUF0SztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxJQUFJLEtBQUssYUFBYSxHQUFHLEVBQUUsVUFBVSxHQUFHO0FBQzVDLFFBQUksSUFBSSxLQUFLLGFBQWEsR0FBRyxFQUFFLFVBQVUsR0FBRztBQUM1QyxRQUFJLFFBQVEsS0FBSyxTQUFTLE9BQU8sRUFBRSxVQUFVLEdBQUc7QUFDaEQsUUFBSSxTQUFTLEtBQUssU0FBUyxRQUFRLEVBQUUsVUFBVSxHQUFHO0FBRWxELFFBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRO0FBQzFDO0FBQUEsSUFDRDtBQUVELFFBQUksS0FBSTtBQUNSLFFBQUksVUFBVSxHQUFHLENBQUM7QUFFbEIsUUFBSSxLQUFLLE9BQU87QUFDZCxVQUFJLGNBQWNBLFVBQVMsTUFBTSxXQUFXLEtBQUssS0FBSyxPQUFPO0FBQUEsUUFDM0QsYUFBYTtBQUFBLFFBQ2IsaUJBQWlCO0FBQUEsUUFDakIsa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2IsU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLE1BQ3JCLENBQU87QUFDRCxrQkFBWSxTQUFTLGdCQUFnQixTQUFTO0FBQzlDLFdBQUssWUFBWTtJQUN2QixPQUFXO0FBQ0wsVUFBSSxTQUFTLEtBQUs7QUFDbEIsTUFBQUEsVUFBUyxXQUFXO0FBQUEsUUFDbEI7QUFBQSxRQUNBLGFBQWEsS0FBSyxhQUFhLHFCQUFxQixFQUFFLFVBQVc7QUFBQSxRQUNqRTtBQUFBLFFBQ0EsY0FBYyxPQUFPO0FBQUEsUUFDckI7QUFBQSxRQUNBLGVBQWUsT0FBTztBQUFBLE1BQzlCLENBQU87QUFFRCxVQUFJLEtBQUssUUFBUTtBQUNmLFlBQUksT0FBTyxPQUFPLGFBQWEsZUFBZSxPQUFPLFVBQVU7QUFDN0QsY0FBSSxVQUFVLFFBQVEsR0FBRyxDQUFDO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELFFBQUksUUFBTztBQUFBLEVBQ1o7QUFBQSxFQUVELGlCQUFpQjtBQUNmLFFBQUksSUFBSSxLQUFLLGFBQWEsR0FBRyxFQUFFLFVBQVUsR0FBRztBQUM1QyxRQUFJLElBQUksS0FBSyxhQUFhLEdBQUcsRUFBRSxVQUFVLEdBQUc7QUFDNUMsUUFBSSxRQUFRLEtBQUssU0FBUyxPQUFPLEVBQUUsVUFBVSxHQUFHO0FBQ2hELFFBQUksU0FBUyxLQUFLLFNBQVMsUUFBUSxFQUFFLFVBQVUsR0FBRztBQUNsRCxXQUFPLElBQUksWUFBWSxHQUFHLEdBQUcsSUFBSSxPQUFPLElBQUksTUFBTTtBQUFBLEVBQ25EO0FBRUg7QUFFQSxNQUFNLHNCQUFzQixnQkFBZ0I7QUFBQSxFQUMxQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsT0FBTzJJLElBQUc7QUFBQSxFQUNUO0FBRUg7QUFFQSxNQUFNLGNBQWM7QUFBQSxFQUNsQixZQUFZM0ksV0FBVTtBQUNwQixTQUFLLFdBQVdBO0FBQ2hCLFNBQUssU0FBUztBQUNkLElBQUFBLFVBQVMsTUFBTSxLQUFLLElBQUk7QUFBQSxFQUN6QjtBQUFBLEVBRUQsS0FBSyxZQUFZLEtBQUs7QUFDcEIsUUFBSSxRQUFRO0FBRVosV0FBTyxrQkFBa0IsYUFBYTtBQUNwQyxVQUFJO0FBQ0YsWUFBSTtBQUFBLFVBQ0YsVUFBQUE7QUFBQSxRQUNELElBQUc7QUFDSixZQUFJLGNBQWMsTUFBTUEsVUFBUyxNQUFNLE9BQU8sS0FBSyxHQUFHO0FBQ3RELFlBQUksUUFBUSxZQUFZLHFCQUFxQixNQUFNO0FBQ25ELGNBQU0sS0FBSyxLQUFLLEVBQUUsUUFBUSxjQUFZO0FBQ3BDLGNBQUksT0FBT0EsVUFBUyxjQUFjLFFBQVE7QUFDMUMsVUFBQUEsVUFBUyxZQUFZLGNBQWM7QUFBQSxRQUM3QyxDQUFTO0FBQUEsTUFDRixTQUFRLEtBQVA7QUFDQSxnQkFBUSxNQUFNLDZCQUE4QixPQUFPLEtBQUssSUFBSyxHQUFHLEdBQUc7QUFBQSxNQUNwRTtBQUVELFlBQU0sU0FBUztBQUFBLElBQ2hCLENBQUE7RUFDRjtBQUVIO0FBRUEsTUFBTSxxQkFBcUIsUUFBUTtBQUFBLEVBQ2pDLFlBQVlBLFdBQVUwRSxPQUFNLGtCQUFrQjtBQUM1QyxVQUFNMUUsV0FBVTBFLE9BQU0sZ0JBQWdCO0FBQ3RDLFNBQUssT0FBTztBQUNaLFFBQUksTUFBTTtBQUFBLE1BQWUsTUFBTSxLQUFLQSxNQUFLLFVBQVUsRUFDbEQsSUFBSSxDQUFBaUUsT0FBS0EsR0FBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxrRUFBa0UsRUFBRSxFQUM3RyxRQUFRLGVBQWUsRUFBRTtBQUFBLElBQzlCO0FBQ0ksUUFBSSxVQUFVLElBQUksTUFBTSxHQUFHO0FBQzNCLFlBQVEsUUFBUSxDQUFBQSxPQUFLO0FBQ25CLFVBQUksTUFBTUEsR0FBRTtBQUVaLFVBQUksQ0FBQyxLQUFLO0FBQ1I7QUFBQSxNQUNEO0FBRUQsVUFBSSxXQUFXLElBQUksTUFBTSxHQUFHO0FBQzVCLFVBQUksYUFBYSxTQUFTLEdBQUcsTUFBTSxHQUFHO0FBQ3RDLFVBQUksV0FBVyxTQUFTLEdBQUcsTUFBTSxHQUFHO0FBQ3BDLGlCQUFXLFFBQVEsQ0FBQUEsT0FBSztBQUN0QixZQUFJLFdBQVdBLEdBQUU7QUFFakIsWUFBSSxDQUFDLFVBQVU7QUFDYjtBQUFBLFFBQ0Q7QUFFRCxZQUFJLFFBQVEzSSxVQUFTLE9BQU8sYUFBYSxDQUFBO0FBQ3pDLGlCQUFTLFFBQVEsYUFBVztBQUMxQixjQUFJLE9BQU8sUUFBUSxRQUFRLEdBQUc7QUFDOUIsY0FBSSxPQUFPLFFBQVEsT0FBTyxHQUFHLElBQUksRUFBRTtBQUNuQyxjQUFJLFFBQVEsUUFBUSxPQUFPLE9BQU8sR0FBRyxRQUFRLFNBQVMsSUFBSSxFQUFFO0FBRTVELGNBQUksUUFBUSxPQUFPO0FBQ2pCLGtCQUFNLFFBQVEsSUFBSSxTQUFTQSxXQUFVLE1BQU0sS0FBSztBQUFBLFVBQ2pEO0FBQUEsUUFDWCxDQUFTO0FBQ0QsUUFBQUEsVUFBUyxPQUFPLFlBQVk7QUFDNUIsUUFBQUEsVUFBUyxrQkFBa0IsWUFBWSx1QkFBdUIsUUFBUTtBQUV0RSxZQUFJLGFBQWEsY0FBYztBQUU3QixjQUFJLGFBQWEsTUFBTSxlQUFlLFVBQVMsRUFBRyxRQUFRLFFBQVEsRUFBRTtBQUNwRSxjQUFJLE9BQU8sTUFBTSxJQUFJLFVBQVMsRUFBRyxNQUFNLEdBQUc7QUFDMUMsZUFBSyxRQUFRLFNBQU87QUFDbEIsZ0JBQUksSUFBSSxRQUFRLGVBQWUsSUFBSSxHQUFHO0FBQ3BDLGtCQUFJLE1BQU0saUJBQWlCLEdBQUc7QUFFOUIsa0JBQUksS0FBSztBQUNQLHFCQUFLLElBQUksY0FBY0EsU0FBUSxFQUFFLEtBQUssWUFBWSxHQUFHO0FBQUEsY0FDdEQ7QUFBQSxZQUNGO0FBQUEsVUFDYixDQUFXO0FBQUEsUUFDRjtBQUFBLE1BQ1QsQ0FBTztBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFFSDtBQUNBLGFBQWEsbUJBQW1CO0FBRWhDLE1BQU0sbUJBQW1CLGdCQUFnQjtBQUFBLEVBQ3ZDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBQUEsRUFFRCxXQUFXLEtBQUs7QUFDZCxVQUFNLFdBQVcsR0FBRztBQUNwQixRQUFJLFFBQVEsS0FBSyxhQUFhLEdBQUc7QUFDakMsUUFBSSxRQUFRLEtBQUssYUFBYSxHQUFHO0FBRWpDLFFBQUksTUFBTSxZQUFZO0FBQ3BCLFVBQUksVUFBVSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUN0QztBQUVELFFBQUksTUFBTSxZQUFZO0FBQ3BCLFVBQUksVUFBVSxHQUFHLE1BQU0sVUFBVSxHQUFHLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUVELEtBQUssS0FBSztBQUNSLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBRUosUUFBSSxTQUFTO0FBQ1gsY0FBUSxLQUFLLEdBQUc7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUVELGVBQWUsS0FBSztBQUNsQixRQUFJO0FBQUEsTUFDRixVQUFBQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFFSixRQUFJLFNBQVM7QUFDWCxVQUFJLFVBQVU7QUFFZCxVQUFJLFFBQVEsU0FBUyxVQUFVO0FBRTdCLGtCQUFVLElBQUksV0FBV0EsV0FBVSxJQUFJO0FBQ3ZDLGdCQUFRLFdBQVcsVUFBVSxJQUFJLFNBQVNBLFdBQVUsV0FBVyxRQUFRLGFBQWEsU0FBUyxFQUFFLFVBQVcsQ0FBQTtBQUMxRyxnQkFBUSxXQUFXLHNCQUFzQixJQUFJLFNBQVNBLFdBQVUsdUJBQXVCLFFBQVEsYUFBYSxxQkFBcUIsRUFBRSxVQUFXLENBQUE7QUFDOUksZ0JBQVEsV0FBVyxXQUFXLElBQUksU0FBU0EsV0FBVSxZQUFZLFFBQVEsYUFBYSxVQUFVLEVBQUUsVUFBVyxDQUFBO0FBQzdHLGdCQUFRLFdBQVcsUUFBUTtBQUUzQixnQkFBUSxPQUFPLFVBQVUsSUFBSSxTQUFTQSxXQUFVLFdBQVcsS0FBSyxpQkFBZ0IsQ0FBRTtBQUFBLE1BQ25GO0FBRUQsVUFBSSxRQUFRLFNBQVMsT0FBTztBQUMxQixZQUFJLGFBQWEsS0FBSyxTQUFTLFNBQVMsT0FBTyxJQUFJO0FBQ25ELFlBQUksY0FBYyxLQUFLLFNBQVMsVUFBVSxPQUFPLElBQUk7QUFFckQsWUFBSSxXQUFXLFlBQVk7QUFDekIsa0JBQVEsV0FBVyxRQUFRLElBQUksU0FBU0EsV0FBVSxTQUFTLFdBQVcsVUFBUyxDQUFFO0FBQUEsUUFDbEY7QUFFRCxZQUFJLFlBQVksWUFBWTtBQUMxQixrQkFBUSxXQUFXLFNBQVMsSUFBSSxTQUFTQSxXQUFVLFVBQVUsWUFBWSxVQUFTLENBQUU7QUFBQSxRQUNyRjtBQUFBLE1BQ0Y7QUFFRCxVQUFJLFlBQVksUUFBUTtBQUN4QixjQUFRLFNBQVM7QUFDakIsY0FBUSxPQUFPLEdBQUc7QUFDbEIsY0FBUSxTQUFTO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUEsRUFFRCxlQUFlLEtBQUs7QUFDbEIsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFFSixRQUFJLFNBQVM7QUFDWCxhQUFPLFFBQVEsZUFBZSxHQUFHO0FBQUEsSUFDbEM7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsbUJBQW1CO0FBQ2pCLFFBQUk7QUFBQSxNQUNGLFVBQUFBO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFdBQU8sVUFBVSxZQUFZQSxXQUFVLE9BQU87QUFBQSxFQUMvQztBQUFBLEVBRUQsSUFBSSxVQUFVO0FBQ1osUUFBSSxDQUFDLEtBQUssZUFBZTtBQUN2QixXQUFLLGdCQUFnQixLQUFLLGlCQUFrQixFQUFDLGNBQWE7QUFBQSxJQUMzRDtBQUVELFdBQU8sS0FBSztBQUFBLEVBQ2I7QUFFSDtBQUVBLFNBQVMsTUFBTSxLQUFLLEdBQUcsR0FBRyxPQUFPLFNBQVMsTUFBTTtBQUM5QyxTQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJO0FBQ3JDO0FBRUEsU0FBUyxNQUFNLEtBQUssR0FBRyxHQUFHLE9BQU8sU0FBUyxNQUFNLEtBQUs7QUFDbkQsTUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUTtBQUN0QztBQUVBLFNBQVMsRUFBRSxRQUFRLEdBQUcsR0FBRztBQUN2QixNQUFJLEtBQUssT0FBTztBQUNoQixTQUFPLEtBQUs7QUFDZDtBQUVBLFNBQVMsRUFBRSxHQUFHLElBQUksSUFBSSxJQUFJO0FBQ3hCLFNBQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSTtBQUMvQztBQUVBLE1BQU0sNkJBQTZCLFFBQVE7QUFBQSxFQUN6QyxZQUFZQSxXQUFVMEUsT0FBTSxrQkFBa0I7QUFDNUMsVUFBTTFFLFdBQVUwRSxPQUFNLGdCQUFnQjtBQUN0QyxTQUFLLE9BQU87QUFDWixRQUFJLFNBQVMsVUFBVSxLQUFLLGFBQWEsUUFBUSxFQUFFLFVBQVMsQ0FBRTtBQUU5RCxZQUFRLEtBQUssYUFBYSxNQUFNLEVBQUUsVUFBVSxRQUFRO0FBQUEsV0FFN0MsWUFDSDtBQUNFLFlBQUksSUFBSSxPQUFPO0FBR2YsaUJBQVMsQ0FBQyxRQUFRLFFBQVEsR0FBRyxRQUFRLFFBQVEsR0FBRyxRQUFRLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxRQUFRLEdBQUcsUUFBUSxRQUFRLEdBQUcsUUFBUSxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsUUFBUSxHQUFHLFFBQVEsUUFBUSxHQUFHLFFBQVEsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBR25PO0FBQUEsTUFDRDtBQUFBLFdBRUUsYUFDSDtBQUNFLFlBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxLQUFLO0FBRzlCLGlCQUFTLENBQUMsRUFBRSxHQUFHLE9BQU8sT0FBTyxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sUUFBUSxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sUUFBUSxLQUFLLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPLFFBQVEsS0FBSyxHQUFHLEVBQUUsR0FBRyxPQUFPLE9BQU8sSUFBSyxHQUFHLEVBQUUsR0FBRyxPQUFPLFFBQVEsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTyxRQUFRLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxRQUFRLEtBQUssR0FBRyxFQUFFLEdBQUcsT0FBTyxPQUFPLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUdyVDtBQUFBLE1BQ0Q7QUFBQSxXQUVFO0FBRUgsaUJBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLFFBQVEsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBR2xHO0FBQUE7QUFHSixTQUFLLFNBQVM7QUFDZCxTQUFLLGlCQUFpQixLQUFLLGFBQWEsZ0JBQWdCLEVBQUU7RUFDM0Q7QUFBQSxFQUVELE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTyxRQUFRO0FBRWhDLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUNKLFFBQUksVUFBVSxJQUFJLGFBQWEsR0FBRyxHQUFHLE9BQU8sTUFBTTtBQUVsRCxhQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSztBQUMvQixlQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM5QixZQUFJLElBQUksTUFBTSxRQUFRLE1BQU0sR0FBRyxHQUFHLE9BQU8sUUFBUSxDQUFDO0FBQ2xELFlBQUksSUFBSSxNQUFNLFFBQVEsTUFBTSxHQUFHLEdBQUcsT0FBTyxRQUFRLENBQUM7QUFDbEQsWUFBSSxJQUFJLE1BQU0sUUFBUSxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBQVEsQ0FBQztBQUNsRCxZQUFJLElBQUksTUFBTSxRQUFRLE1BQU0sR0FBRyxHQUFHLE9BQU8sUUFBUSxDQUFDO0FBQ2xELFlBQUksS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsQ0FBQztBQUMvRixZQUFJLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUM7QUFDL0YsWUFBSSxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQ3BHLFlBQUksS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLElBQUksQ0FBQztBQUVwRyxZQUFJLGdCQUFnQjtBQUNsQixlQUFLO0FBQ0wsZUFBSztBQUNMLGVBQUs7QUFDTCxnQkFBTSxJQUFJO0FBQUEsUUFDWDtBQUVELGNBQU0sUUFBUSxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBQVEsR0FBRyxFQUFFO0FBQzlDLGNBQU0sUUFBUSxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBQVEsR0FBRyxFQUFFO0FBQzlDLGNBQU0sUUFBUSxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBQVEsR0FBRyxFQUFFO0FBQzlDLGNBQU0sUUFBUSxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBQVEsR0FBRyxFQUFFO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBRUQsUUFBSSxVQUFVLEdBQUcsR0FBRyxPQUFPLE1BQU07QUFDakMsUUFBSSxhQUFhLFNBQVMsR0FBRyxDQUFDO0FBQUEsRUFDL0I7QUFFSDtBQUVBLE1BQU0sb0JBQW9CLFFBQVE7QUFBQSxFQUNoQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsTUFBTSxLQUFLLFNBQVM7QUFDbEIsUUFBSTtBQUFBLE1BQ0YsVUFBQTFFO0FBQUEsSUFDRCxJQUFHO0FBRUosUUFBSSxJQUFJLEtBQUssYUFBYSxHQUFHLEVBQUUsVUFBVSxHQUFHO0FBQzVDLFFBQUksSUFBSSxLQUFLLGFBQWEsR0FBRyxFQUFFLFVBQVUsR0FBRztBQUM1QyxRQUFJLFFBQVEsS0FBSyxTQUFTLE9BQU8sRUFBRSxVQUFVLEdBQUc7QUFDaEQsUUFBSSxTQUFTLEtBQUssU0FBUyxRQUFRLEVBQUUsVUFBVSxHQUFHO0FBRWxELFFBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtBQUNyQixVQUFJLGNBQWMsSUFBSTtBQUN0QixXQUFLLFNBQVMsUUFBUSxXQUFTO0FBQzdCLG9CQUFZLGVBQWUsTUFBTSxlQUFlLEdBQUcsQ0FBQztBQUFBLE1BQzVELENBQU87QUFDRCxVQUFJLEtBQUssTUFBTSxZQUFZLEVBQUU7QUFDN0IsVUFBSSxLQUFLLE1BQU0sWUFBWSxFQUFFO0FBQzdCLGNBQVEsS0FBSyxNQUFNLFlBQVksS0FBSztBQUNwQyxlQUFTLEtBQUssTUFBTSxZQUFZLE1BQU07QUFBQSxJQUN2QztBQUVELFFBQUksZ0JBQWdCLEtBQUssYUFBYSxTQUFTLFlBQVksWUFBWTtBQUN2RSxRQUFJLGFBQWFBLFVBQVMsYUFBYSxJQUFJLE9BQU8sSUFBSSxNQUFNO0FBQzVELFFBQUksVUFBVSxXQUFXLFdBQVcsSUFBSTtBQUN4QyxJQUFBQSxVQUFTLE9BQU8sWUFBWSxPQUFPO0FBQ25DLFNBQUssZUFBZSxPQUFPO0FBRzNCLFFBQUkscUJBQXFCQSxXQUFVO0FBQUEsTUFDakMsVUFBVTtBQUFBLE1BQ1YsWUFBWSxDQUFFO0FBQUEsTUFDZCxZQUFZLENBQUM7QUFBQSxRQUNYLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxNQUNmLEdBQVM7QUFBQSxRQUNELFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxNQUNmLENBQU87QUFBQSxJQUNQLENBQUssRUFBRSxNQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksT0FBTyxJQUFJLE1BQU07QUFDN0MsUUFBSSxZQUFZQSxVQUFTLGFBQWEsSUFBSSxPQUFPLElBQUksTUFBTTtBQUMzRCxRQUFJLFNBQVMsVUFBVSxXQUFXLElBQUk7QUFDdEMsSUFBQUEsVUFBUyxPQUFPLFlBQVksTUFBTTtBQUNsQyxZQUFRLE9BQU8sTUFBTTtBQUNyQixXQUFPLDJCQUEyQjtBQUNsQyxXQUFPLFlBQVksUUFBUSxjQUFjLFlBQVksV0FBVztBQUNoRSxXQUFPLFNBQVMsR0FBRyxHQUFHLElBQUksT0FBTyxJQUFJLE1BQU07QUFDM0MsUUFBSSxZQUFZLE9BQU8sY0FBYyxXQUFXLFdBQVc7QUFDM0QsUUFBSSxTQUFTLEdBQUcsR0FBRyxJQUFJLE9BQU8sSUFBSSxNQUFNO0FBRXhDLFNBQUssY0FBYyxTQUFTLGFBQWE7QUFBQSxFQUMxQztBQUFBLEVBRUQsT0FBTzJJLElBQUc7QUFBQSxFQUNUO0FBRUg7QUFDQSxZQUFZLGVBQWUsQ0FBQyxRQUFRLGFBQWEsV0FBVztBQUU1RCxJQUFJLE9BQU8sTUFBTTtBQUNqQjtBQUVBLE1BQU0sd0JBQXdCLFFBQVE7QUFBQSxFQUNwQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsTUFBTSxLQUFLO0FBQ1QsUUFBSTtBQUFBLE1BQ0YsVUFBQTNJO0FBQUEsSUFDRCxJQUFHO0FBQ0osUUFBSSxlQUFlLFFBQVEsZUFBZSxHQUFHO0FBQzdDLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0QsSUFBRztBQUVKLFFBQUksY0FBYztBQUNoQixtQkFBYSxZQUFZO0FBQ3pCLG1CQUFhLFlBQVk7QUFBQSxJQUMxQjtBQUVELFlBQVEsTUFBTSxXQUFXLEtBQUssQ0FBRSxDQUFBO0FBQ2hDLFNBQUssU0FBUyxRQUFRLFdBQVM7QUFDN0IsVUFBSSxPQUFPLE1BQU0sU0FBUyxhQUFhO0FBQ3JDO0FBQUEsTUFDRDtBQUVELFVBQUksWUFBWSxPQUFPLE1BQU0scUJBQXFCLGNBQWMsTUFBTSxpQkFBa0IsSUFBRztBQUUzRixVQUFJLENBQUMsV0FBVztBQUNkLG9CQUFZLFVBQVUsWUFBWUEsV0FBVSxLQUFLO0FBQUEsTUFDbEQ7QUFFRCxVQUFJLFdBQVc7QUFDYixrQkFBVSxNQUFNLEdBQUc7QUFBQSxNQUNwQjtBQUVELFlBQU0sS0FBSyxHQUFHO0FBRWQsVUFBSSxjQUFjO0FBQ2hCLHFCQUFhLFlBQVk7QUFBQSxNQUMxQjtBQUVELFVBQUksV0FBVztBQUNiLGtCQUFVLFFBQVEsR0FBRztBQUFBLE1BQ3RCO0FBQUEsSUFDUCxDQUFLO0FBQ0QsWUFBUSxNQUFNLFdBQVcsS0FBSyxDQUFFLENBQUE7QUFDaEMsUUFBSSxLQUFJO0FBRVIsUUFBSSxjQUFjO0FBQ2hCLG1CQUFhLFlBQVk7QUFDekIsbUJBQWEsWUFBWTtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTzJJLElBQUc7QUFBQSxFQUNUO0FBRUg7QUFFQSxNQUFNLHNCQUFzQixRQUFRO0FBQUEsRUFDbEMsY0FBYztBQUNaLFVBQU0sR0FBRyxTQUFTO0FBQ2xCLFNBQUssT0FBTztBQUFBLEVBQ2I7QUFBQSxFQUVELE1BQU0sS0FBSyxTQUFTO0FBRWxCLFFBQUk7QUFBQSxNQUNGLFVBQUEzSTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLGNBQWMsUUFBUSxlQUFlLEdBQUc7QUFFNUMsUUFBSSxDQUFDLGFBQWE7QUFDaEI7QUFBQSxJQUNEO0FBRUQsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsYUFBUyxRQUFRLFdBQVM7QUFDeEIsVUFBSSxNQUFNLE1BQU0sdUJBQXVCO0FBQ3ZDLFdBQUssS0FBSyxJQUFJLElBQUksR0FBRztBQUNyQixXQUFLLEtBQUssSUFBSSxJQUFJLEdBQUc7QUFBQSxJQUMzQixDQUFLO0FBQ0QsUUFBSSxRQUFRLEtBQUssTUFBTSxZQUFZLEtBQUs7QUFDeEMsUUFBSSxTQUFTLEtBQUssTUFBTSxZQUFZLE1BQU07QUFDMUMsUUFBSSxpQkFBaUIsUUFBUSxJQUFJO0FBQ2pDLFFBQUksa0JBQWtCLFNBQVMsSUFBSTtBQUVuQyxRQUFJLGlCQUFpQixLQUFLLGtCQUFrQixHQUFHO0FBQzdDO0FBQUEsSUFDRDtBQUVELFFBQUksSUFBSSxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ2hDLFFBQUksSUFBSSxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQ2hDLFFBQUksZ0JBQWdCLEtBQUssYUFBYSxTQUFTLGNBQWMsWUFBWTtBQUN6RSxRQUFJLFlBQVlBLFVBQVMsYUFBYSxnQkFBZ0IsZUFBZTtBQUNyRSxRQUFJLFNBQVMsVUFBVSxXQUFXLElBQUk7QUFDdEMsSUFBQUEsVUFBUyxPQUFPLFlBQVksTUFBTTtBQUNsQyxXQUFPLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDakMsWUFBUSxPQUFPLE1BQU07QUFFckIsYUFBUyxRQUFRLFdBQVM7QUFDeEIsVUFBSSxPQUFPLE1BQU0sVUFBVSxZQUFZO0FBQ3JDLGNBQU0sTUFBTSxRQUFRLEdBQUcsR0FBRyxnQkFBZ0IsZUFBZTtBQUFBLE1BQzFEO0FBQUEsSUFDUCxDQUFLO0FBRUQsUUFBSSxVQUFVLFdBQVcsR0FBRyxHQUFHLGdCQUFnQixpQkFBaUIsSUFBSSxJQUFJLElBQUksSUFBSSxnQkFBZ0IsZUFBZTtBQUMvRyxTQUFLLGNBQWMsU0FBUyxhQUFhO0FBQUEsRUFDMUM7QUFBQSxFQUVELE9BQU8ySSxJQUFHO0FBQUEsRUFDVDtBQUVIO0FBQ0EsY0FBYyxlQUFlLENBQUMsVUFBVSxhQUFhLFdBQVc7QUFFaEUsTUFBTSw0QkFBNEIsUUFBUTtBQUFBLEVBQ3hDLFlBQVkzSSxXQUFVMEUsT0FBTSxrQkFBa0I7QUFDNUMsVUFBTTFFLFdBQVUwRSxPQUFNLGdCQUFnQjtBQUN0QyxTQUFLLE9BQU87QUFDWixTQUFLLDZCQUE0QjtBQUFBLEVBQ2xDO0FBQUEsRUFFRCxNQUFNaUUsSUFBRyxJQUFJLElBQUksUUFBUSxTQUFTO0FBQUEsRUFDakM7QUFFSDtBQUVBLE1BQU0sNEJBQTRCLFFBQVE7QUFBQSxFQUN4QyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsTUFBTUEsSUFBRyxJQUFJLElBQUksUUFBUSxTQUFTO0FBQUEsRUFDakM7QUFFSDtBQUVBLE1BQU0sMkJBQTJCLFFBQVE7QUFBQSxFQUN2QyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUQsTUFBTUEsSUFBRyxJQUFJLElBQUksUUFBUSxTQUFTO0FBQUEsRUFDakM7QUFFSDtBQUVBLE1BQU0sOEJBQThCLFFBQVE7QUFBQSxFQUMxQyxZQUFZM0ksV0FBVTBFLE9BQU0sa0JBQWtCO0FBQzVDLFVBQU0xRSxXQUFVMEUsT0FBTSxnQkFBZ0I7QUFDdEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxhQUFhLEtBQUssTUFBTSxLQUFLLGFBQWEsY0FBYyxFQUFFLFVBQVMsQ0FBRTtBQUMxRSxTQUFLLHNCQUFzQixLQUFLO0FBQUEsRUFDakM7QUFBQSxFQUVELE1BQU0sS0FBSyxHQUFHLEdBQUcsT0FBTyxRQUFRO0FBQzlCLFFBQUk7QUFBQSxNQUNGLFVBQUExRTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUc7QUFDSixRQUFJLE9BQU9BLFVBQVMsU0FBU0EsVUFBUyxPQUFPLFNBQVMsT0FBTztBQUM3RCxRQUFJLFNBQVMsSUFBSTtBQUVqQixXQUFPLEtBQUtBLFVBQVM7QUFFckIsUUFBSSxNQUFNO0FBQ1IsYUFBTyxNQUFNLFVBQVU7QUFDdkIsV0FBSyxZQUFZLE1BQU07QUFBQSxJQUN4QjtBQUVENkssc0JBQVcsUUFBUSxHQUFHLEdBQUcsT0FBTyxRQUFRLFVBQVU7QUFFbEQsUUFBSSxNQUFNO0FBQ1IsV0FBSyxZQUFZLE1BQU07QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFFSDtBQUVBLE1BQU0scUJBQXFCLFFBQVE7QUFBQSxFQUNqQyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUVIO0FBRUEsTUFBTSxvQkFBb0IsUUFBUTtBQUFBLEVBQ2hDLGNBQWM7QUFDWixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLE9BQU87QUFBQSxFQUNiO0FBRUg7QUFFQSxJQUFJLFdBQVc7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLGtCQUFrQjtBQUFBLEVBQ2xCLGtCQUFrQjtBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLGdCQUFnQjtBQUFBLEVBQ2hCLG9CQUFvQjtBQUFBLEVBQ3BCLFFBQVE7QUFBQSxFQUNSLGFBQWE7QUFBQSxFQUNiLGlCQUFpQjtBQUFBLEVBQ2pCLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLEtBQUs7QUFBQSxFQUNMLFlBQVk7QUFBQSxFQUNaLFNBQVM7QUFBQSxFQUNULEtBQUs7QUFBQSxFQUNMLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLGdCQUFnQjtBQUFBLEVBQ2hCLGdCQUFnQjtBQUFBLEVBQ2hCLGVBQWU7QUFBQSxFQUNmLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFDVjtBQUVBLFNBQVMsVUFBVSxRQUFRLGdCQUFnQjtBQUFFLE1BQUluSSxRQUFPLE9BQU8sS0FBSyxNQUFNO0FBQUcsTUFBSSxPQUFPLHVCQUF1QjtBQUFFLFFBQUksVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBQUcsUUFBSSxnQkFBZ0I7QUFBRSxnQkFBVSxRQUFRLE9BQU8sU0FBVSxLQUFLO0FBQUUsZUFBTyxPQUFPLHlCQUF5QixRQUFRLEdBQUcsRUFBRTtBQUFBLE1BQVcsQ0FBRTtBQUFBO0FBQUssSUFBQUEsTUFBSyxLQUFLLE1BQU1BLE9BQU0sT0FBTztBQUFBLEVBQUU7QUFBRyxTQUFPQTtBQUFPO0FBRTNWLFNBQVMsZ0JBQWdCLFFBQVE7QUFBRSxXQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQUUsUUFBSSxTQUFTLFVBQVUsTUFBTSxPQUFPLFVBQVUsS0FBSyxDQUFFO0FBQUUsUUFBSSxJQUFJLEdBQUc7QUFBRSxnQkFBVSxPQUFPLE1BQU0sR0FBRyxJQUFJLEVBQUUsUUFBUSxTQUFVLEtBQUs7QUFBRSx3QkFBZ0IsUUFBUSxLQUFLLE9BQU8sSUFBSTtBQUFBLE1BQUksQ0FBQTtBQUFBLElBQUUsV0FBWSxPQUFPLDJCQUEyQjtBQUFFLGFBQU8saUJBQWlCLFFBQVEsT0FBTywwQkFBMEIsTUFBTSxDQUFDO0FBQUEsSUFBSSxPQUFNO0FBQUUsZ0JBQVUsT0FBTyxNQUFNLENBQUMsRUFBRSxRQUFRLFNBQVUsS0FBSztBQUFFLGVBQU8sZUFBZSxRQUFRLEtBQUssT0FBTyx5QkFBeUIsUUFBUSxHQUFHLENBQUM7QUFBQSxNQUFFLENBQUU7QUFBQTtFQUFNO0FBQUMsU0FBTztBQUFTO0FBRTVoQixTQUFTLGFBQWEsT0FBTyxRQUFRO0FBQ25DLE1BQUksU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM1QyxTQUFPLFFBQVE7QUFDZixTQUFPLFNBQVM7QUFDaEIsU0FBTztBQUNUO0FBRUEsU0FBUyxZQUFZLElBQUk7QUFDdkIsU0FBTyxhQUFhLE1BQU0sTUFBTSxTQUFTO0FBQzNDO0FBRUEsU0FBUyxlQUFlO0FBQ3RCLGlCQUFlLGtCQUFrQixXQUFXLEtBQUs7QUFDL0MsUUFBSSx1QkFBdUIsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQy9GLFFBQUksUUFBUSxTQUFTLGNBQWMsS0FBSztBQUV4QyxRQUFJLHNCQUFzQjtBQUN4QixZQUFNLGNBQWM7QUFBQSxJQUNyQjtBQUVELFdBQU8sSUFBSSxRQUFRLENBQUMyQyxVQUFTQyxZQUFXO0FBQ3RDLFlBQU0sU0FBUyxNQUFNO0FBQ25CLFFBQUFELFNBQVEsS0FBSztBQUFBLE1BQ3JCO0FBRU0sWUFBTSxVQUFVLENBQUMsUUFBUSxTQUFTLFNBQVMsUUFBUSxVQUFVO0FBQzNELFFBQUFDLFFBQU8sS0FBSztBQUFBLE1BQ3BCO0FBRU0sWUFBTSxNQUFNO0FBQUEsSUFDbEIsQ0FBSztBQUFBLEVBQ0wsQ0FBRztBQUNELFNBQU8sYUFBYSxNQUFNLE1BQU0sU0FBUztBQUMzQztBQUVBLE1BQU0sU0FBUztBQUFBLEVBQ2IsWUFBWSxPQUFPO0FBQ2pCLFFBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxNQUNiLFNBQVM7QUFBQSxNQUNULGNBQUF3RixnQkFBZSxTQUFTO0FBQUEsTUFDeEIsYUFBQUMsZUFBYyxTQUFTO0FBQUEsTUFDdkI7QUFBQSxJQUNELElBQUcsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQ3hFLFNBQUssUUFBUTtBQUNiLFNBQUssY0FBYztBQUNuQixTQUFLLFNBQVM7QUFDZCxTQUFLLG9CQUFvQjtBQUN6QixTQUFLLFNBQVM7QUFDZCxTQUFLLFFBQVE7QUFDYixTQUFLLGNBQWM7QUFDbkIsU0FBSyxXQUFXO0FBQ2hCLFNBQUssU0FBUyxNQUFNO0FBQ3BCLFNBQUssYUFBYTtBQUNsQixTQUFLLFNBQVM7QUFDZCxTQUFLLGVBQWVEO0FBQ3BCLFNBQUssY0FBYyxLQUFLLGdCQUFnQkMsY0FBYSxvQkFBb0I7QUFDekUsU0FBSyxPQUFPLEtBQUssS0FBSyxlQUFlLEtBQUssSUFBSSxDQUFDO0FBQy9DLFNBQUssT0FBTyxLQUFLLEtBQUssY0FBYyxLQUFLLElBQUksQ0FBQztBQUFBLEVBQy9DO0FBQUEsRUFFRCxnQkFBZ0JBLGNBQWEsc0JBQXNCO0FBQ2pELFFBQUksT0FBTyx5QkFBeUIsV0FBVztBQUM3QyxhQUFPLENBQUMsUUFBUSw4QkFBOEJBLGFBQVksUUFBUSxPQUFPLDhCQUE4QixZQUFZLDRCQUE0QixvQkFBb0I7QUFBQSxJQUNwSztBQUVELFdBQU9BO0FBQUEsRUFDUjtBQUFBLEVBRUQsSUFBSSxTQUFTO0FBQ1gsV0FBTyxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBRUQsSUFBSSxRQUFRO0FBQ1YsV0FBTyxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBRUQsSUFBSSxNQUFNO0FBQ1IsV0FBTyxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBRUQsSUFBSSxTQUFTO0FBQ1gsUUFBSTtBQUFBLE1BQ0Y7QUFBQSxJQUNELElBQUc7QUFDSixXQUFPLFlBQVksWUFBWSxTQUFTO0FBQUEsRUFDekM7QUFBQSxFQUVELElBQUksT0FBTyxPQUFPO0FBQ2hCLFFBQUk7QUFBQSxNQUNGO0FBQUEsSUFDRCxJQUFHO0FBQ0osZ0JBQVksS0FBSyxLQUFLO0FBQUEsRUFDdkI7QUFBQSxFQUVELFlBQVk7QUFDVixRQUFJO0FBQUEsTUFDRjtBQUFBLElBQ0QsSUFBRztBQUNKLGdCQUFZLElBQUc7QUFBQSxFQUNoQjtBQUFBLEVBRUQsY0FBYztBQUNaLFdBQU8sUUFBUSxPQUFPLEVBQUUsS0FBSyxRQUFRO0FBQUEsRUFDdEM7QUFBQSxFQUVELGlCQUFpQjtBQUNmLFdBQU8sS0FBSyxPQUFPLE1BQU0sQ0FBQXBDLE9BQUtBLEdBQUUsTUFBTTtBQUFBLEVBQ3ZDO0FBQUEsRUFFRCxnQkFBZ0I7QUFDZCxXQUFPLEtBQUssTUFBTSxNQUFNLENBQUFBLE9BQUtBLEdBQUUsTUFBTTtBQUFBLEVBQ3RDO0FBQUEsRUFFRCxzQkFBc0IzSSxXQUFVO0FBQzlCLFFBQUksa0JBQWtCLEtBQUssY0FBY0EsVUFBUyxlQUFlO0FBQ2pFLG9CQUFnQixPQUFPO0FBQ3ZCLG9CQUFnQiw2QkFBNEI7QUFDNUMsU0FBSyxrQkFBa0I7QUFDdkIsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUVELGNBQWMwRSxPQUFNO0FBQ2xCLFFBQUksY0FBY0EsTUFBSyxTQUFTLFFBQVEsV0FBVyxFQUFFO0FBQ3JELFFBQUksY0FBYyxTQUFTLGFBQWE7QUFFeEMsUUFBSSxPQUFPLGdCQUFnQixhQUFhO0FBQ3RDLGFBQU8sSUFBSSxZQUFZLE1BQU1BLEtBQUk7QUFBQSxJQUNsQztBQUVELFdBQU8sSUFBSSxlQUFlLE1BQU1BLEtBQUk7QUFBQSxFQUNyQztBQUFBLEVBRUQsZUFBZUEsT0FBTTtBQUNuQixXQUFPLElBQUksU0FBUyxNQUFNQSxLQUFJO0FBQUEsRUFDL0I7QUFBQSxFQUVELFdBQVcsUUFBUTtBQUNqQixTQUFLLE9BQU8sV0FBVyxnQkFBZ0I7QUFBQSxNQUNyQyxVQUFVO0FBQUEsSUFDaEIsR0FBTyxNQUFNLENBQUM7QUFBQSxFQUNYO0FBRUg7QUFDQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsZUFBZTtBQUV4QixTQUFTakMsU0FBUSxRQUFRLGdCQUFnQjtBQUFFLE1BQUlDLFFBQU8sT0FBTyxLQUFLLE1BQU07QUFBRyxNQUFJLE9BQU8sdUJBQXVCO0FBQUUsUUFBSSxVQUFVLE9BQU8sc0JBQXNCLE1BQU07QUFBRyxRQUFJLGdCQUFnQjtBQUFFLGdCQUFVLFFBQVEsT0FBTyxTQUFVLEtBQUs7QUFBRSxlQUFPLE9BQU8seUJBQXlCLFFBQVEsR0FBRyxFQUFFO0FBQUEsTUFBVyxDQUFFO0FBQUE7QUFBSyxJQUFBQSxNQUFLLEtBQUssTUFBTUEsT0FBTSxPQUFPO0FBQUEsRUFBRTtBQUFHLFNBQU9BO0FBQU87QUFFelYsU0FBUyxjQUFjLFFBQVE7QUFBRSxXQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQUUsUUFBSSxTQUFTLFVBQVUsTUFBTSxPQUFPLFVBQVUsS0FBSyxDQUFFO0FBQUUsUUFBSSxJQUFJLEdBQUc7QUFBRSxNQUFBRCxTQUFRLE9BQU8sTUFBTSxHQUFHLElBQUksRUFBRSxRQUFRLFNBQVUsS0FBSztBQUFFLHdCQUFnQixRQUFRLEtBQUssT0FBTyxJQUFJO0FBQUEsTUFBSSxDQUFBO0FBQUEsSUFBRSxXQUFZLE9BQU8sMkJBQTJCO0FBQUUsYUFBTyxpQkFBaUIsUUFBUSxPQUFPLDBCQUEwQixNQUFNLENBQUM7QUFBQSxJQUFJLE9BQU07QUFBRSxNQUFBQSxTQUFRLE9BQU8sTUFBTSxDQUFDLEVBQUUsUUFBUSxTQUFVLEtBQUs7QUFBRSxlQUFPLGVBQWUsUUFBUSxLQUFLLE9BQU8seUJBQXlCLFFBQVEsR0FBRyxDQUFDO0FBQUEsTUFBRSxDQUFFO0FBQUE7RUFBTTtBQUFDLFNBQU87QUFBUztBQUt0aEIsTUFBTSxNQUFNO0FBQUEsRUFPVixZQUFZLEtBQUssS0FBSztBQUNwQixRQUFJLFVBQVUsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLLENBQUE7QUFDbEYsU0FBSyxTQUFTLElBQUksT0FBTyxPQUFPO0FBQ2hDLFNBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxPQUFPO0FBQ3JDLFNBQUssVUFBVTtBQUNmLFFBQUl6QyxZQUFXLElBQUksU0FBUyxNQUFNLE9BQU87QUFDekMsUUFBSSxrQkFBa0JBLFVBQVMsc0JBQXNCLEdBQUc7QUFDeEQsU0FBSyxXQUFXQTtBQUNoQixTQUFLLGtCQUFrQjtBQUFBLEVBQ3hCO0FBQUEsRUFVRCxPQUFPLEtBQUssS0FBSyxLQUFLO0FBQ3BCLFFBQUksYUFBYTtBQUNqQixXQUFPLGtCQUFrQixhQUFhO0FBQ3BDLFVBQUksVUFBVSxXQUFXLFNBQVMsS0FBSyxXQUFXLE9BQU8sU0FBWSxXQUFXLEtBQUssQ0FBQTtBQUNyRixVQUFJLFNBQVMsSUFBSSxPQUFPLE9BQU87QUFDL0IsVUFBSSxjQUFjLE1BQU0sT0FBTyxNQUFNLEdBQUc7QUFDeEMsYUFBTyxJQUFJLE1BQU0sS0FBSyxhQUFhLE9BQU87QUFBQSxJQUMzQyxDQUFBO0VBQ0Y7QUFBQSxFQVVELE9BQU8sV0FBVyxLQUFLLEtBQUs7QUFDMUIsUUFBSSxVQUFVLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxDQUFBO0FBQ2xGLFFBQUksU0FBUyxJQUFJLE9BQU8sT0FBTztBQUMvQixRQUFJLGNBQWMsT0FBTyxnQkFBZ0IsR0FBRztBQUM1QyxXQUFPLElBQUksTUFBTSxLQUFLLGFBQWEsT0FBTztBQUFBLEVBQzNDO0FBQUEsRUFVRCxLQUFLLEtBQUssS0FBSztBQUNiLFFBQUksVUFBVSxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUssQ0FBQTtBQUNsRixXQUFPLE1BQU0sS0FBSyxLQUFLLEtBQUssY0FBYyxjQUFjLENBQUEsR0FBSSxLQUFLLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFBQSxFQUNwRjtBQUFBLEVBVUQsV0FBVyxLQUFLLEtBQUs7QUFDbkIsUUFBSSxVQUFVLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxDQUFBO0FBQ2xGLFdBQU8sTUFBTSxXQUFXLEtBQUssS0FBSyxjQUFjLGNBQWMsQ0FBQSxHQUFJLEtBQUssT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzFGO0FBQUEsRUFPRCxRQUFRO0FBQ04sV0FBTyxLQUFLLE9BQU87RUFDcEI7QUFBQSxFQU9ELFVBQVU7QUFDUixXQUFPLEtBQUssT0FBTztFQUNwQjtBQUFBLEVBT0QsU0FBUztBQUNQLFFBQUksY0FBYyxXQUNkLFFBQVE7QUFFWixXQUFPLGtCQUFrQixhQUFhO0FBQ3BDLFVBQUksVUFBVSxZQUFZLFNBQVMsS0FBSyxZQUFZLE9BQU8sU0FBWSxZQUFZLEtBQUssQ0FBQTtBQUV4RixZQUFNLE1BQU0sY0FBYztBQUFBLFFBQ3hCLGNBQWM7QUFBQSxRQUNkLGlCQUFpQjtBQUFBLFFBQ2pCLGFBQWE7QUFBQSxNQUNyQixHQUFTLE9BQU8sQ0FBQztBQUVYLFlBQU0sTUFBTTtBQUVaLFlBQU0sS0FBSTtBQUFBLElBQ1gsQ0FBQTtFQUNGO0FBQUEsRUFPRCxRQUFRO0FBQ04sUUFBSSxVQUFVLFVBQVUsU0FBUyxLQUFLLFVBQVUsT0FBTyxTQUFZLFVBQVUsS0FBSyxDQUFBO0FBQ2xGLFFBQUk7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUztBQUFBLElBQ1YsSUFBRztBQUNKLFdBQU8sTUFBTSxpQkFBaUIsY0FBYyxjQUFjO0FBQUEsTUFDeEQsY0FBYztBQUFBLElBQ3BCLEdBQU8sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzFCO0FBQUEsRUFNRCxPQUFPO0FBQ0wsU0FBSyxPQUFPO0VBQ2I7QUFBQSxFQVNELE9BQU8sT0FBTztBQUNaLFFBQUksU0FBUyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FBWSxVQUFVLEtBQUs7QUFDakYsUUFBSSxzQkFBc0IsVUFBVSxTQUFTLEtBQUssVUFBVSxPQUFPLFNBQVksVUFBVSxLQUFLO0FBQzlGLFNBQUssZ0JBQWdCLE9BQU8sT0FBTyxRQUFRLG1CQUFtQjtBQUFBLEVBQy9EO0FBRUg7OyJ9
