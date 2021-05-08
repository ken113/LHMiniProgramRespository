(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 102:
/*!************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/static/head.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 105:
/*!************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/static/mybg.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/mybg.png";

/***/ }),

/***/ 11:
/*!***********************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/common/util.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  getRect: function getRect(selector) {
    return new Promise(function (resolve) {
      var view = uni.createSelectorQuery().select(selector);
      view.fields({
        size: true,
        rect: true,
        scrollOffset: true },
      function (res) {
        resolve(res);
      }).exec();
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 122:
/*!****************************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/components/uni-calendar/util.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ 123));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Calendar = /*#__PURE__*/function () {
  function Calendar()





  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},date = _ref.date,selected = _ref.selected,startDate = _ref.startDate,endDate = _ref.endDate,range = _ref.range;_classCallCheck(this, Calendar);
    // 当前日期
    this.date = this.getDate(new Date()); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.cleanMultipleStatus();
    // 每周日期
    this.weeks = {};
    // this._getWeek(this.date.fullDate)
  }
  /**
     * 设置日期
     * @param {Object} date
     */_createClass(Calendar, [{ key: "setDate", value: function setDate(
    date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }

    /**
       * 清理多选状态
       */ }, { key: "cleanMultipleStatus", value: function cleanMultipleStatus()
    {
      this.multipleStatus = {
        before: '',
        after: '',
        data: [] };

    }

    /**
       * 重置开始日期
       */ }, { key: "resetSatrtDate", value: function resetSatrtDate(
    startDate) {
      // 范围开始
      this.startDate = startDate;

    }

    /**
       * 重置结束日期
       */ }, { key: "resetEndDate", value: function resetEndDate(
    endDate) {
      // 范围结束
      this.endDate = endDate;
    }

    /**
       * 获取任意时间
       */ }, { key: "getDate", value: function getDate(
    date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay() };

    }


    /**
       * 获取上月剩余天数
       */ }, { key: "_getLastMonthDays", value: function _getLastMonthDays(
    firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true });

      }
      return dateArr;
    }
    /**
       * 获取本月天数
       */ }, { key: "_currentMonthDys", value: function _currentMonthDys(
    dateData, full) {var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;var _loop = function _loop(
      i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ?
        full.month : full.month) + '-' + (i < 10 ?
        '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          var dateCompBefore = _this.dateCompare(_this.startDate, fullDate);
          disableBefore = _this.dateCompare(dateCompBefore ? _this.startDate : fullDate, nowDate);
        }

        if (_this.endDate) {
          var dateCompAfter = _this.dateCompare(fullDate, _this.endDate);
          disableAfter = _this.dateCompare(nowDate, dateCompAfter ? _this.endDate : fullDate);
        }
        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.dateEqual(_this.multipleStatus.before, nowDate),
          afterMultiple: _this.dateEqual(_this.multipleStatus.after, nowDate),
          month: full.month,
          lunar: _this.getlunar(full.year, full.month, i),
          disable: !disableBefore || !disableAfter,
          isDay: isDay };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);};for (var i = 1; i <= dateData; i++) {_loop(i);
      }
      return dateArr;
    }
    /**
       * 获取下月天数
       */ }, { key: "_getNextMonthDays", value: function _getNextMonthDays(
    surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i),
          disable: true });

      }
      return dateArr;
    }

    /**
       * 获取当前日期详情
       * @param {Object} date
       */ }, { key: "getInfo", value: function getInfo(
    date) {var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {return item.fullDate === _this2.getDate(date).fullDate;});
      return dateInfo;
    }

    /**
       * 比较时间大小
       */ }, { key: "dateCompare", value: function dateCompare(
    startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
       * 比较时间是否相等
       */ }, { key: "dateEqual", value: function dateEqual(
    before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }


    /**
       * 获取日期范围内所有日期
       * @param {Object} begin
       * @param {Object} end
       */ }, { key: "geDateAll", value: function geDateAll(
    begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
       * 计算阴历日期显示
       */ }, { key: "getlunar", value: function getlunar(
    year, month, date) {
      return _calendar.default.solar2lunar(year, month, date);
    }
    /**
       * 设置打点
       */ }, { key: "setSelectInfo", value: function setSelectInfo(
    data, value) {
      this.selected = value;
      this._getWeek(data);
    }

    /**
       *  获取多选状态
       */ }, { key: "setMultiple", value: function setMultiple(
    fullDate) {var _this$multipleStatus =



      this.multipleStatus,before = _this$multipleStatus.before,after = _this$multipleStatus.after;

      if (!this.range) return;
      if (before && after) {
        this.multipleStatus.before = '';
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
        }
      }
      this._getWeek(fullDate);
    }

    /**
       * 获取每周数据
       * @param {Object} dateData
       */ }, { key: "_getWeek", value: function _getWeek(
    dateData) {var _this$getDate =






      this.getDate(dateData),fullDate = _this$getDate.fullDate,year = _this$getDate.year,month = _this$getDate.month,date = _this$getDate.date,day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
        nextMonthDays: [], // 下个月开始几天
        weeks: [] };

      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);return Calendar;}();var _default =


Calendar;exports.default = _default;

/***/ }),

/***/ 123:
/*!********************************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/components/uni-calendar/calendar.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     * @1900-2100区间内的公历、农历互转
                                                                                                     * @charset UTF-8
                                                                                                     * @github  https://github.com/jjonline/calendar.js
                                                                                                     * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                     * @Time    2014-7-21
                                                                                                     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                     * @Version 1.0.3
                                                                                                     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                     */
/* eslint-disable */
var calendar = {

  /**
                     * 农历1900-2100的润大小信息表
                     * @Array Of Property
                     * @return Hex
                     */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                    * 天干地支之天干速查表
                                                                    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                    * @return Cn string
                                                                    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                                 * 天干地支之地支速查表
                                                                                                                 * @Array Of Property
                                                                                                                 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                                 * @return Cn string
                                                                                                                 */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                     * 天干地支之地支速查表<=>生肖
                                                                                                                                     * @Array Of Property
                                                                                                                                     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                     * @return Cn string
                                                                                                                                     */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                         * 24节气速查表
                                                                                                                                         * @Array Of Property
                                                                                                                                         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
                                                                                                                                         * @return Cn string
                                                                                                                                         */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                   * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                   * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                   * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                             * 数字转中文速查表
                                                                                                             * @Array Of Property
                                                                                                             * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                             * @return Cn string
                                                                                                             */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                             * 日期转农历称呼速查表
                                                                                                                             * @Array Of Property
                                                                                                                             * @trans ['初','十','廿','卅']
                                                                                                                             * @return Cn string
                                                                                                                             */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                       * 月份转农历称呼速查表
                                                       * @Array Of Property
                                                       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                       * @return Cn string
                                                       */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                       * 返回农历y年一整年的总天数
                                                                                                                                       * @param lunar Year
                                                                                                                                       * @return Number
                                                                                                                                       * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                       */
  lYearDays: function lYearDays(y) {
    var i;var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
  leapMonth: function leapMonth(y) {// 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {// 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
        * 农历年份转换为干支纪年
        * @param  lYear 农历年的年份数
        * @return Cn string
        */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
        * 公历月、日判断所属星座
        * @param  cMonth [description]
        * @param  cDay [description]
        * @return Cn string
        */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },

  /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
  toChinaDay: function toChinaDay(d) {// 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
  solar2lunar: function solar2lunar(y, m, d) {// 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;var leap = 0;var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0) {
      offset += temp;--i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': this.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month), 'IDayCn': this.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
  },

  /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {// 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {// 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };var _default =


calendar;exports.default = _default;

/***/ }),

/***/ 131:
/*!**************************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/components/uni-popup/popup.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 132));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 132:
/*!****************************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/components/uni-popup/message.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 210:
/*!*********************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/static/3.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 216:
/*!**********************************************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/components/uni-data-pickerview/uni-data-picker.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 = {
  props: {
    localdata: {
      type: [Array, Object],
      default: function _default() {
        return [];
      } },

    collection: {
      type: String,
      default: '' },

    action: {
      type: String,
      default: '' },

    field: {
      type: String,
      default: '' },

    orderby: {
      type: String,
      default: '' },

    where: {
      type: [String, Object],
      default: '' },

    pageData: {
      type: String,
      default: 'add' },

    pageCurrent: {
      type: Number,
      default: 1 },

    pageSize: {
      type: Number,
      default: 20 },

    getcount: {
      type: [Boolean, String],
      default: false },

    getone: {
      type: [Boolean, String],
      default: false },

    gettree: {
      type: [Boolean, String],
      default: false },

    manual: {
      type: Boolean,
      default: false },

    value: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    preload: {
      type: Boolean,
      default: false },

    stepSearh: {
      type: Boolean,
      default: true },

    selfField: {
      type: String,
      default: '' },

    parentField: {
      type: String,
      default: '' },

    multiple: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      loading: false,
      errorMessage: '',
      loadMore: {
        contentdown: '',
        contentrefresh: '',
        contentnomore: '' },

      dataList: [],
      selected: [],
      selectedIndex: 0,
      page: {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0 } };


  },
  computed: {
    isLocaldata: function isLocaldata() {
      return this.localdata.length > 0;
    },
    postField: function postField() {
      return "".concat(this.field, ", ").concat(this.parentField, " as parent_value");
    },
    postWhere: function postWhere() {
      var result = [];
      var selected = this.selected;
      result.push("".concat(this.parentField, " == null"));
      if (selected.length) {
        for (var i = 0; i < selected.length - 1; i++) {
          result.push("".concat(this.parentField, " == '").concat(selected[i].value, "'"));
        }
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    nodeWhere: function nodeWhere() {
      var result = [];
      var selected = this.selected;
      if (selected.length) {
        result.push("".concat(this.parentField, " == '").concat(selected[selected.length - 1].value, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    } },

  created: function created() {var _this = this;
    this.$watch(function () {
      var al = [];
      ['pageCurrent',
      'pageSize',
      'value',
      'localdata',
      'collection',
      'action',
      'field',
      'orderby',
      'where',
      'getont',
      'getcount',
      'gettree'].
      forEach(function (key) {
        al.push(_this[key]);
      });
      return al;
    }, function (newValue, oldValue) {
      var needReset = false;
      for (var i = 2; i < newValue.length; i++) {
        if (newValue[i] != oldValue[i]) {
          needReset = true;
          break;
        }
      }
      if (newValue[0] != oldValue[0]) {
        _this.page.current = _this.pageCurrent;
      }
      _this.page.size = _this.pageSize;

      _this.onPropsChange();
    });
    this._treeData = [];
  },
  methods: {
    onPropsChange: function onPropsChange() {
      this._treeData = [];
    },
    getCommand: function getCommand() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      /* eslint-disable no-undef */
      var db = uniCloud.database();

      var action = options.action || this.action;
      if (action) {
        db = db.action(action);
      }

      var collection = options.collection || this.collection;
      db = db.collection(collection);

      var where = options.where || this.where;
      if (!(!where || !Object.keys(where).length)) {
        db = db.where(where);
      }

      var field = options.field || this.field;
      if (field) {
        db = db.field(field);
      }

      var orderby = options.orderby || this.orderby;
      if (orderby) {
        db = db.orderBy(orderby);
      }

      var current = options.pageCurrent !== undefined ? options.pageCurrent : this.page.current;
      var size = options.pageSize !== undefined ? options.pageSize : this.page.size;
      var getCount = options.getcount !== undefined ? options.getcount : this.getcount;
      var getTree = options.gettree !== undefined ? options.gettree : this.gettree;

      var getOptions = {
        getCount: getCount,
        getTree: getTree };

      if (options.getTreePath) {
        getOptions.getTreePath = options.getTreePath;
      }

      db = db.skip(size * (current - 1)).limit(size).get(getOptions);

      return db;
    },
    getTreePath: function getTreePath(callback) {var _this2 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        getTreePath: {
          startWith: "".concat(this.selfField, "=='").concat(this.value, "'") } }).

      then(function (res) {
        _this2.loading = false;
        var treePath = [];
        _this2._extractTreePath(res.result.data, treePath);
        _this2.selected = treePath;
        callback && callback();
      }).catch(function (err) {
        _this2.loading = false;
        _this2.errorMessage = err;
      });
    },
    loadData: function loadData() {var _this3 = this;
      if (this.isLocaldata) {
        this._processLocalData();
        return;
      }

      if (this.value.length) {
        this._loadNodeData(function (data) {
          _this3._treeData = data;
          _this3._updateBindData();
          _this3._updateSelected();
        });
        return;
      }

      if (this.stepSearh) {
        this._loadNodeData(function (data) {
          _this3._treeData = data;
          _this3._updateBindData();
        });
      } else {
        this._loadAllData(function (data) {
          _this3._treeData = [];
          _this3._extractTree(data, _this3._treeData, null);
          _this3._updateBindData();
        });
      }
    },
    _loadAllData: function _loadAllData(callback) {var _this4 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        gettree: true,
        startwith: "".concat(this.selfField, "=='").concat(this.value, "'") }).
      then(function (res) {
        _this4.loading = false;
        callback(res.result.data);
        _this4.onDataChange();
      }).catch(function (err) {
        _this4.loading = false;
        _this4.errorMessage = err;
      });
    },
    _loadNodeData: function _loadNodeData(callback, pw) {var _this5 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        where: pw || this.postWhere,
        pageSize: 500 }).
      then(function (res) {
        _this5.loading = false;
        callback(res.result.data);
        _this5.onDataChange();
      }).catch(function (err) {
        _this5.loading = false;
        _this5.errorMessage = err;
      });
    },
    _updateSelected: function _updateSelected() {
      var dl = this.dataList;
      var sl = this.selected;
      for (var i = 0; i < sl.length; i++) {
        var value = sl[i].value;
        var dl2 = dl[i];
        for (var j = 0; j < dl2.length; j++) {
          var item2 = dl2[j];
          if (item2.value === value) {
            sl[i].text = item2.text;
            break;
          }
        }
      }
    },
    _updateBindData: function _updateBindData(node) {var _this$_filterData =



      this._filterData(this._treeData, this.selected),dataList = _this$_filterData.dataList,hasNodes = _this$_filterData.hasNodes;

      var isleaf = this._stepSearh === false && !hasNodes;

      if (node) {
        node.isleaf = isleaf;
      }

      this.dataList = dataList;
      this.selectedIndex = dataList.length - 1;

      if (!isleaf && this.selected.length < dataList.length) {
        this.selected.push({
          value: null,
          text: "请选择" });

      }

      return {
        isleaf: isleaf,
        hasNodes: hasNodes };

    },
    _filterData: function _filterData(data, paths) {
      var dataList = [];

      var hasNodes = true;

      dataList.push(data.filter(function (item) {
        return item.parent_value === undefined;
      }));
      for (var i = 0; i < paths.length; i++) {
        var value = paths[i].value;
        var nodes = data.filter(function (item) {
          return item.parent_value === value;
        });

        if (nodes.length) {
          dataList.push(nodes);
        } else {
          hasNodes = false;
        }
      }

      return {
        dataList: dataList,
        hasNodes: hasNodes };

    },
    _extractTree: function _extractTree(nodes, result, parent_value) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        if (parent_value !== null) {
          child.parent_value = parent_value;
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTree(children, result, node.value);
        }
      }
    },
    _extractTreePath: function _extractTreePath(nodes, result) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTreePath(children, result);
        }
      }
    },
    _findNodePath: function _findNodePath(key, nodes) {var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      for (var i = 0; i < nodes.length; i++) {var _nodes$i =




        nodes[i],value = _nodes$i.value,text = _nodes$i.text,children = _nodes$i.children;

        path.push({
          value: value,
          text: text });


        if (value === key) {
          return path;
        }

        if (children) {
          var p = this._findNodePath(key, children, path);
          if (p.length) {
            return p;
          }
        }

        path.pop();
      }
      return [];
    },
    _processLocalData: function _processLocalData() {
      this._treeData = [];
      this._extractTree(this.localdata, this._treeData);

      var inputValue = this.value;
      if (inputValue === undefined) {
        return;
      }

      if (Array.isArray(inputValue)) {
        inputValue = inputValue[inputValue.length - 1];
        if (typeof inputValue === 'object' && inputValue.value) {
          inputValue = inputValue.value;
        }
      }

      this.selected = this._findNodePath(inputValue, this.localdata);
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 217)["default"]))

/***/ }),

/***/ 217:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 220));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 223);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e22) {throw _e22;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e23) {didErr = true;err = _e23;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],v = e[t + 8],w = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],A = e[t + 13],I = e[t + 14],P = e[t + 15],E = o[0],O = o[1],U = o[2],b = o[3];E = u(E, O, U, b, i, 7, a[0]), b = u(b, E, O, U, c, 12, a[1]), U = u(U, b, E, O, f, 17, a[2]), O = u(O, U, b, E, p, 22, a[3]), E = u(E, O, U, b, g, 7, a[4]), b = u(b, E, O, U, m, 12, a[5]), U = u(U, b, E, O, y, 17, a[6]), O = u(O, U, b, E, _, 22, a[7]), E = u(E, O, U, b, v, 7, a[8]), b = u(b, E, O, U, w, 12, a[9]), U = u(U, b, E, O, S, 17, a[10]), O = u(O, U, b, E, k, 22, a[11]), E = u(E, O, U, b, T, 7, a[12]), b = u(b, E, O, U, A, 12, a[13]), U = u(U, b, E, O, I, 17, a[14]), E = h(E, O = u(O, U, b, E, P, 22, a[15]), U, b, c, 5, a[16]), b = h(b, E, O, U, y, 9, a[17]), U = h(U, b, E, O, k, 14, a[18]), O = h(O, U, b, E, i, 20, a[19]), E = h(E, O, U, b, m, 5, a[20]), b = h(b, E, O, U, S, 9, a[21]), U = h(U, b, E, O, P, 14, a[22]), O = h(O, U, b, E, g, 20, a[23]), E = h(E, O, U, b, w, 5, a[24]), b = h(b, E, O, U, I, 9, a[25]), U = h(U, b, E, O, p, 14, a[26]), O = h(O, U, b, E, v, 20, a[27]), E = h(E, O, U, b, A, 5, a[28]), b = h(b, E, O, U, f, 9, a[29]), U = h(U, b, E, O, _, 14, a[30]), E = l(E, O = h(O, U, b, E, T, 20, a[31]), U, b, m, 4, a[32]), b = l(b, E, O, U, v, 11, a[33]), U = l(U, b, E, O, k, 16, a[34]), O = l(O, U, b, E, I, 23, a[35]), E = l(E, O, U, b, c, 4, a[36]), b = l(b, E, O, U, g, 11, a[37]), U = l(U, b, E, O, _, 16, a[38]), O = l(O, U, b, E, S, 23, a[39]), E = l(E, O, U, b, A, 4, a[40]), b = l(b, E, O, U, i, 11, a[41]), U = l(U, b, E, O, p, 16, a[42]), O = l(O, U, b, E, y, 23, a[43]), E = l(E, O, U, b, w, 4, a[44]), b = l(b, E, O, U, T, 11, a[45]), U = l(U, b, E, O, P, 16, a[46]), E = d(E, O = l(O, U, b, E, f, 23, a[47]), U, b, i, 6, a[48]), b = d(b, E, O, U, _, 10, a[49]), U = d(U, b, E, O, I, 15, a[50]), O = d(O, U, b, E, m, 21, a[51]), E = d(E, O, U, b, T, 6, a[52]), b = d(b, E, O, U, p, 10, a[53]), U = d(U, b, E, O, S, 15, a[54]), O = d(O, U, b, E, c, 21, a[55]), E = d(E, O, U, b, v, 6, a[56]), b = d(b, E, O, U, P, 10, a[57]), U = d(U, b, E, O, y, 15, a[58]), O = d(O, U, b, E, A, 21, a[59]), E = d(E, O, U, b, g, 6, a[60]), b = d(b, E, O, U, k, 10, a[61]), U = d(U, b, E, O, f, 15, a[62]), O = d(O, U, b, E, w, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + b | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var i = /*#__PURE__*/function (_Error) {_inherits(i, _Error);var _super = _createSuper(i);function i(e) {var _this;_classCallCheck(this, i);_this = _super.call(this, e.message), _this.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this;}return i;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),a = _e2.t,c = _e2.setLocale,u = _e2.getLocale;var h, l, d;try {h = __webpack_require__(/*! uni-stat-config */ 224).default || __webpack_require__(/*! uni-stat-config */ 224);} catch (e) {h = { appid: "" };}function f() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function p() {if ("n" === g()) {try {l = plus.runtime.getDCloudId();} catch (e) {l = "";}return l;}return l || (l = f(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: l })), l;}function g() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)["mp-weixin"];}var m = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}),  false && false;var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new i({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new i({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var y = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var _ = /*#__PURE__*/function () {function _(e) {_classCallCheck(this, _);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(a("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = y;}_createClass(_, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return m.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this2 = this;return Promise.resolve().then(function () {return _this2.hasAccessToken ? t ? _this2.requestWrapped(e) : _this2.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this2.getAccessToken();}).then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});}) : _this2.getAccessToken().then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = m.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = m.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this3 = this;return this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this3.setAccessToken(e.result.accessToken), t(_this3.accessToken)) : s(new i({ code: "AUTH_FAILED", message: "获取accessToken失败" }));});});} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this4 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (a, c) {var u = _this4.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this5 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this5.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this5.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: c }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new i({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return _;}();var v = { init: function init(e) {var t = new _(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },w = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",S = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var k;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(k || (k = {}));var T = function T() {};s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [],c = [];!function () {function t(t) {for (var s = e.sqrt(t), n = 2; n <= s; n++) {if (!(t % n)) return !1;}return !0;}function s(e) {return 4294967296 * (e - (0 | e)) | 0;}for (var n = 2, r = 0; r < 64;) {t(n) && (r < 8 && (a[r] = s(e.pow(n, .5))), c[r] = s(e.pow(n, 1 / 3)), r++), n++;}}();var u = [],h = i.SHA256 = o.extend({ _doReset: function _doReset() {this._hash = new r.init(a.slice(0));}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = this._hash.words, n = s[0], r = s[1], o = s[2], i = s[3], a = s[4], h = s[5], l = s[6], d = s[7], f = 0; f < 64; f++) {if (f < 16) u[f] = 0 | e[t + f];else {var p = u[f - 15],g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,m = u[f - 2],y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;u[f] = g + u[f - 7] + y + u[f - 16];}var _ = n & r ^ n & o ^ r & o,v = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),w = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & l) + c[f] + u[f];d = l, l = h, h = a, a = i + w | 0, i = o, o = r, r = n, n = w + (v + _) | 0;}s[0] = s[0] + n | 0, s[1] = s[1] + r | 0, s[2] = s[2] + o | 0, s[3] = s[3] + i | 0, s[4] = s[4] + a | 0, s[5] = s[5] + h | 0, s[6] = s[6] + l | 0, s[7] = s[7] + d | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;return s[r >>> 5] |= 128 << 24 - r % 32, s[14 + (r + 64 >>> 9 << 4)] = e.floor(n / 4294967296), s[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * s.length, this._process(), this._hash;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });t.SHA256 = o._createHelper(h), t.HmacSHA256 = o._createHmacHelper(h);}(Math), s.SHA256);}), s(function (e, t) {e.exports = n.HmacSHA256;}), s(function (e, t) {var s, r, o;e.exports = (r = (s = o = n).lib.WordArray, s.enc.Base64 = { stringify: function stringify(e) {var t = e.words,s = e.sigBytes,n = this._map;e.clamp();for (var r = [], o = 0; o < s; o += 3) {for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < s; a++) {r.push(n.charAt(i >>> 6 * (3 - a) & 63));}}var c = n.charAt(64);if (c) for (; r.length % 4;) {r.push(c);}return r.join("");}, parse: function parse(e) {var t = e.length,s = this._map,n = this._reverseMap;if (!n) {n = this._reverseMap = [];for (var o = 0; o < s.length; o++) {n[s.charCodeAt(o)] = o;}}var i = s.charAt(64);if (i) {var a = e.indexOf(i);-1 !== a && (t = a);}return function (e, t, s) {for (var n = [], o = 0, i = 0; i < t; i++) {if (i % 4) {var a = s[e.charCodeAt(i - 1)] << i % 4 * 2,c = s[e.charCodeAt(i)] >>> 6 - i % 4 * 2;n[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++;}}return r.create(n, o);}(e, t, n);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, o.enc.Base64);}), s(function (e, t) {e.exports = n.enc.Utf8;});var A = function A() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function I(e) {return void 0 === e;}function P(e) {return "[object Null]" === Object.prototype.toString.call(e);}var E;function O(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(E || (E = {}));var U = { adapter: null, runtime: void 0 },b = ["anonymousUuidKey"];var C = /*#__PURE__*/function (_T) {_inherits(C, _T);var _super2 = _createSuper(C);function C() {var _this6;_classCallCheck(this, C);_this6 = _super2.call(this), U.adapter.root.tcbObject || (U.adapter.root.tcbObject = {});return _this6;}_createClass(C, [{ key: "setItem", value: function setItem(e, t) {U.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return U.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete U.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete U.adapter.root.tcbObject;} }]);return C;}(T);function D(e, t) {switch (e) {case "local":return t.localStorage || new C();case "none":return new C();default:return t.sessionStorage || new C();}}var R = /*#__PURE__*/function () {function R(e) {_classCallCheck(this, R);if (!this._storage) {this._persistence = U.adapter.primaryStorage || e.persistence, this._storage = D(this._persistence, U.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(R, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = D(e, U.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && b.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);I(_r2) || P(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return R;}();var x = {},q = {};function F(e) {return x[e];}var L = function L(e, t) {_classCallCheck(this, L);this.data = t || null, this.name = e;};var N = /*#__PURE__*/function (_L) {_inherits(N, _L);var _super3 = _createSuper(N);function N(e, t) {var _this7;_classCallCheck(this, N);_this7 = _super3.call(this, "error", { error: e, data: t }), _this7.error = e;return _this7;}return N;}(L);var M = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof N) return console.error(e.error), this;var s = "string" == typeof e ? new L(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function $(e, t) {M.on(e, t);}function K(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};M.fire(e, t);}function B(e, t) {M.off(e, t);}var j = "loginStateChanged",H = "loginStateExpire",W = "loginTypeChanged",V = "anonymousConverted",z = "refreshAccessToken";var Y;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Y || (Y = {}));var J = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],X = { "X-SDK-Version": "1.3.5" };function G(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function Q() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, X), {}, { "x-seqid": e }) };}var Z = /*#__PURE__*/function () {function Z() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Z);var t;this.config = e, this._reqClass = new U.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = F(this.config.env), this._localCache = (t = this.config.env, q[t]), G(this._reqClass, "post", [Q]), G(this._reqClass, "upload", [Q]), G(this._reqClass, "download", [Q]);}_createClass(Z, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === Y.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:K(H), this._cache.removeStore(s);case 20:throw new Error("刷新access token失败：" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (K(z), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === J.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(w, S, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === J.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return Z;}();var ee = {};function te(e) {return ee[e];}var se = /*#__PURE__*/function () {function se(e) {_classCallCheck(this, se);this.config = e, this._cache = F(e.env), this._request = te(e.env);}_createClass(se, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return se;}();var ne = /*#__PURE__*/function () {function ne(e) {_classCallCheck(this, ne);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = F(this._envId), this._request = te(this._envId), this.setUserInfo();}_createClass(ne, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this8 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this8[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ne;}();var re = /*#__PURE__*/function () {function re(e) {_classCallCheck(this, re);if (!e) throw new Error("envId is not defined");this._cache = F(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ne(e);}_createClass(re, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Y.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Y.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Y.WECHAT || this.loginType === Y.WECHAT_OPEN || this.loginType === Y.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return re;}();var oe = /*#__PURE__*/function (_se) {_inherits(oe, _se);var _super4 = _createSuper(oe);function oe() {_classCallCheck(this, oe);return _super4.apply(this, arguments);}_createClass(oe, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e14;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:K(j);K(W, { env: this.config.env, loginType: Y.ANONYMOUS, persistence: "local" });_e14 = new re(this.config.env);_context13.next = 19;return _e14.user.refresh();case 19:return _context13.abrupt("return", _e14);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:K(V, { env: this.config.env });K(W, { loginType: Y.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, Y.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return oe;}(se);var ie = /*#__PURE__*/function (_se2) {_inherits(ie, _se2);var _super5 = _createSuper(ie);function ie() {_classCallCheck(this, ie);return _super5.apply(this, arguments);}_createClass(ie, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:K(j);K(W, { env: this.config.env, loginType: Y.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new re(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ie;}(se);var ae = /*#__PURE__*/function (_se3) {_inherits(ae, _se3);var _super6 = _createSuper(ae);function ae() {_classCallCheck(this, ae);return _super6.apply(this, arguments);}_createClass(ae, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:K(j);K(W, { env: this.config.env, loginType: Y.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new re(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return ae;}(se);var ce = /*#__PURE__*/function (_se4) {_inherits(ce, _se4);var _super7 = _createSuper(ce);function ce() {_classCallCheck(this, ce);return _super7.apply(this, arguments);}_createClass(ce, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Y.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:K(j);K(W, { env: this.config.env, loginType: Y.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new re(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ce;}(se);var ue = /*#__PURE__*/function () {function ue(e) {_classCallCheck(this, ue);this.config = e, this._cache = F(e.env), this._request = te(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), $(W, this._onLoginTypeChanged);}_createClass(ue, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new oe(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ie(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new ae(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ce(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new oe(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new ae(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ce(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new oe(this.config)), $(V, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Y.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), K(j), K(W, { env: this.config.env, loginType: Y.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this9 = this;$(j, function () {var t = _this9.hasLoginState();e.call(_this9, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {$(H, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {$(z, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {$(V, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this10 = this;$(W, function () {var t = _this10.hasLoginState();e.call(_this10, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new re(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ie(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return ue;}();var he = function he(e, t) {t = t || A();var s = te(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},le = function le(e, t) {t = t || A();var s = te(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},de = function de(_ref5, t) {var e = _ref5.fileList;if (t = t || A(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return te(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},fe = function fe(_ref6, t) {var e = _ref6.fileList;t = t || A(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return te(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},pe = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return fe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = te(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function pe(_x26, _x27) {return _ref8.apply(this, arguments);};}(),ge = function ge(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || A();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return te(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},me = { timeout: 15e3, persistence: "session" },ye = {};var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);this.config = e || this.config, this.authObj = void 0;}_createClass(_e, [{ key: "init", value: function init(e) {switch (U.adapter || (this.requestClient = new U.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, me), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new _e(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || U.adapter.primaryStorage || me.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;x[t] = new R(e), q[t] = new R(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, ee[s.env] = new Z(s), this.authObj = new ue(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return $.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return B.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return ge.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return de.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return fe.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return pe.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return he.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return le.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {ye[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = ye[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = O(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (U.adapter = t), s && (U.runtime = s);} }]);return _e;}();var ve = new _e();function we(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Se = /*#__PURE__*/function () {function Se() {_classCallCheck(this, Se);}_createClass(Se, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {y.request({ url: we("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = y.uploadFile({ url: we("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) { false && false, s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Se;}();var ke = { setItem: function setItem(e, t) {y.setStorageSync(e, t);}, getItem: function getItem(e) {return y.getStorageSync(e);}, removeItem: function removeItem(e) {y.removeStorageSync(e);}, clear: function clear() {y.clearStorageSync();} };var Te = { genAdapter: function genAdapter() {return { root: {}, reqClass: Se, localStorage: ke, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };ve.useAdapters(Te);var Ae = ve,Ie = Ae.init;var Pe, Ee;function Oe(_ref12) {var e = _ref12.name,t = _ref12.data,s = _ref12.spaceId,n = _ref12.provider;Pe || (Pe = function () {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: "mp-weixin", OS: d, APPID: h.appid, LOCALE: u(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.0" };}(), Ee = { ak: h.appid, p: "android" === d ? "a" : "i", ut: g(), uuid: p() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e15 = Object.assign({}, Ee, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: Pe, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e15)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e16 = y.getStorageSync("uni_id_token") || y.getStorageSync("uniIdToken");_e16 && (r.uniIdToken = _e16);}return r;}function Ue(_ref13) {var _this11 = this;var e = _ref13.name,t = _ref13.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,a = "http://".concat(s, ":").concat(n, "/system/check-function"),c = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {y.request({ method: "POST", url: a, data: { name: e, platform: "mp-weixin", provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref14.data;var _ref15 = e || {},t = _ref15.code,s = _ref15.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref16) {var s = _ref16.code,n = _ref16.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e17 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e17), new Error(_e17);}case "SWITCH_TO_CLOUD":break;default:{var _e18 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e18), new Error(_e18);}}return _this11.originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var a = Oe({ name: e, data: t, provider: _this11.config.provider, spaceId: o });y.request({ method: "POST", url: c, data: { provider: r, platform: "mp-weixin", param: a }, success: function success() {var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref17.statusCode,t = _ref17.data;return !e || e >= 400 ? n(new i({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new i({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}function be(e) {var t = e.callFunction;e.callFunction = function (e) {var _this12 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {e.data = Oe({ name: e.name, data: e.data, provider: _this12.config.provider, spaceId: _this12.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[_this12.config.provider];return new Promise(function (n, r) {t.call(_this12, e).then(function (t) {if (_this12.config.useDebugFunction && t && t.requestId) {var _n7 = JSON.stringify({ spaceId: _this12.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n7, "[/").concat(s, "-request]"));}n(t);}).catch(function (t) {if (_this12.config.useDebugFunction && t && t.requestId) {var _n8 = JSON.stringify({ spaceId: _this12.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n8, "[/").concat(s, "-request]"));}t && t.message && (t.message = "[".concat(e.name, "]: ").concat(t.message)), r(t);});});});};var s = e.callFunction;e.originCallFunction = e.callFunction, e.callFunction = function (t) {return o(function (t) {var _this13 = this;var n;return n = e.isReady ? Promise.resolve() : e.initUniCloud, n.then(function () {return  true && e.debugInfo && !e.debugInfo.forceRemote && [] ? Ue.call(_this13, t) : s.call(_this13, t);});}).call(this, t);};}Ae.init = function (e) {e.env = e.spaceId;var t = Ie.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;}, t.customAuth = t.auth;return ["deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;};var Ce = Symbol("CLIENT_DB_INTERNAL");function De(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ce, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}var Re = /*#__PURE__*/function (_Error2) {_inherits(Re, _Error2);var _super8 = _createSuper(Re);function Re(e, t) {var _this14;_classCallCheck(this, Re);_this14 = _super8.call(this, e), _this14.code = t;return _this14;}return Re;}( /*#__PURE__*/_wrapNativeSuper(Error));function xe(e) {switch (t = e, Object.prototype.toString.call(t).slice(8, -1).toLowerCase()) {case "array":return e.map(function (e) {return xe(e);});case "object":return e._internalType === Ce || Object.keys(e).forEach(function (t) {e[t] = xe(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}var t;}function qe() {var e = y.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [] };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var n;return s;}var Fe = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref18) {var s = _ref18.onChooseFile,n = _ref18.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,o = e.sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));function Le(_x30, _x31) {return _Le.apply(this, arguments);}function _Le() {_Le = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e24, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {y.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e24 = _context32.sent;return _context32.abrupt("return", !(!_e24.data || 0 !== _e24.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _Le.apply(this, arguments);}var Ne = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && "development" === "development" && ( false || "app-plus" === "mp-weixin");switch (e.provider) {case "tencent":t = Ae.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = v.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("未提供正确的provider参数");}var n = undefined; true && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();return t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if ( true && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e19 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref19 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n9, _r3;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n9 = 0;case 1:if (!(_n9 < e.length)) {_context31.next = 11;break;}_r3 = e[_n9];_context31.next = 5;return Le(_r3, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r3;return _context31.abrupt("break", 11);case 8:_n9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref19.apply(this, arguments);};}()(_e19, _s4);}return Promise.resolve();}).then(function () {var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref20.address,s = _ref20.port;if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e20 =  false ? undefined : "warn",_s5 = console[_e20];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _s5("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试")) : _s5("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试");}}).then(function () {return function () {if (true) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === h.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", h.appid), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) { false ? (undefined) : setTimeout(function () {d = uni.getSystemInfoSync().platform, l = uni.getStorageSync("__DC_CLOUD_UUID") || f(32), e();}, 0);});}).then(function () {t.isReady = !0;}), be(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this15 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this15, e);});};var s = e.uploadFile;e.uploadFile = function (e) {return o(s).call(this, e);};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(n, r) {var o = this.toJSON();return o.$db.push({ $method: n, $param: r }), e.callFunction({ name: "DCloud-clientDB", data: { action: this.actionName, command: o } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired;return n ? Promise.reject(new Re(r, n)) : (o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), Promise.resolve(e));}).catch(function (e) {var t = new Re(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), Promise.reject(e);});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s6 = e.content.$method;if ("aggregate" === _s6 || "pipeline" === _s6) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: xe(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return De(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: xe(Array.from(arguments)) }, e, s);};} });}function a(_ref21) {var e = _ref21.path,t = _ref21.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var c = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: De({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return De({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: xe(Array.from(arguments)) }, null, e);};} });}, Geo: De({}, { get: function get(e, t) {return a({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return a({ path: [], method: "serverDate" });}, get RegExp() {return a({ path: [], method: "RegExp" });} },u = De(c, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: xe(Array.from(arguments)) });};} });return this._database = u, u;};}(t), function (e) {e.getCurrentUserInfo = qe, e.chooseAndUploadFile = o(Fe.initChooseAndUploadFile(e));}(t), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = {};if (1 === [].length) e = [][0], Ne = Ne.init(e);else {var _e21 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"],t = [].length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在cloudfunctions目录右键关联服务空间";_e21.forEach(function (e) {Ne[e] = function () {return console.error(t), Promise.reject(new i({ code: "SYS_ERR", message: t }));};});}Object.assign(Ne, { get mixinDatacom() {return e = Ne, { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this16 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this16[t]);}), e;}, function (e, t) {var s = !1;var n = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (n.push(e[_r4]), s = !0);}e[0] !== t[0] && (_this16.mixinDatacomPage.current = _this16.pageCurrent), _this16.mixinDatacomPage.size = _this16.pageSize, _this16.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this17 = this;var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref22$getone = _ref22.getone,e = _ref22$getone === void 0 ? !1 : _ref22$getone,t = _ref22.success,s = _ref22.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this17.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this17.getcount && (_this17.mixinDatacomPage.count = r), _this17.mixinDatacomHasMore = n.length < _this17.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this17.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this17.mixinDatacomLoading = !1, _this17.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.groupby || this.groupby;a && (s = s.groupBy(a));var c = t.groupField || this.groupField;c && (s = s.groupField(c)), !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var u = t.orderby || this.orderby;u && (s = s.orderBy(u));var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,l = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,d = void 0 !== t.getcount ? t.getcount : this.getcount,f = void 0 !== t.gettree ? t.gettree : this.gettree,p = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,g = { getCount: d },m = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return f && (g.getTree = m), p && (g.getTreePath = m), s = s.skip(l * (h - 1)).limit(l).get(g), s;} } };var e;} });}})();var Me = Ne;var _default2 = Me;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 218)))

/***/ }),

/***/ 218:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 219);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 219:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 218)))

/***/ }),

/***/ 220:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 221);

/***/ }),

/***/ 221:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 222);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 222:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 223:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! exports provided: I18n, initVueI18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(uni) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initVueI18n", function() { return initVueI18n; });
const isObject = (val) => val !== null && typeof val === 'object';
class BaseFormatter {
    constructor() {
        this._caches = Object.create(null);
    }
    interpolate(message, values) {
        if (!values) {
            return [message];
        }
        let tokens = this._caches[message];
        if (!tokens) {
            tokens = parse(message);
            this._caches[message] = tokens;
        }
        return compile(tokens, values);
    }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
    const tokens = [];
    let position = 0;
    let text = '';
    while (position < format.length) {
        let char = format[position++];
        if (char === '{') {
            if (text) {
                tokens.push({ type: 'text', value: text });
            }
            text = '';
            let sub = '';
            char = format[position++];
            while (char !== undefined && char !== '}') {
                sub += char;
                char = format[position++];
            }
            const isClosed = char === '}';
            const type = RE_TOKEN_LIST_VALUE.test(sub)
                ? 'list'
                : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                    ? 'named'
                    : 'unknown';
            tokens.push({ value: sub, type });
        }
        else if (char === '%') {
            // when found rails i18n syntax, skip text capture
            if (format[position] !== '{') {
                text += char;
            }
        }
        else {
            text += char;
        }
    }
    text && tokens.push({ type: 'text', value: text });
    return tokens;
}
function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values)
        ? 'list'
        : isObject(values)
            ? 'named'
            : 'unknown';
    if (mode === 'unknown') {
        return compiled;
    }
    while (index < tokens.length) {
        const token = tokens[index];
        switch (token.type) {
            case 'text':
                compiled.push(token.value);
                break;
            case 'list':
                compiled.push(values[parseInt(token.value, 10)]);
                break;
            case 'named':
                if (mode === 'named') {
                    compiled.push(values[token.value]);
                }
                else {
                    if (true) {
                        console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                    }
                }
                break;
            case 'unknown':
                if (true) {
                    console.warn(`Detect 'unknown' type of token!`);
                }
                break;
        }
        index++;
    }
    return compiled;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, '-');
    if (messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale.indexOf('zh') === 0) {
        if (locale.indexOf('-hans') !== -1) {
            return 'zh-Hans';
        }
        if (locale.indexOf('-hant') !== -1) {
            return 'zh-Hant';
        }
        if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
            return 'zh-Hant';
        }
        return 'zh-Hans';
    }
    const lang = startsWith(locale, ['en', 'fr', 'es']);
    if (lang) {
        return lang;
    }
}
class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
        this.locale = 'en';
        this.fallbackLocale = 'en';
        this.message = {};
        this.messages = {};
        this.watchers = [];
        if (fallbackLocale) {
            this.fallbackLocale = fallbackLocale;
        }
        this.formater = formater || defaultFormatter;
        this.messages = messages;
        this.setLocale(locale);
        if (watcher) {
            this.watchLocale(watcher);
        }
    }
    setLocale(locale) {
        const oldLocale = this.locale;
        this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
        this.message = this.messages[this.locale];
        this.watchers.forEach((watcher) => {
            watcher(this.locale, oldLocale);
        });
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(fn) {
        const index = this.watchers.push(fn) - 1;
        return () => {
            this.watchers.splice(index, 1);
        };
    }
    t(key, locale, values) {
        let message = this.message;
        if (typeof locale === 'string') {
            locale = normalizeLocale(locale, this.messages);
            locale && (message = this.messages[locale]);
        }
        else {
            values = locale;
        }
        if (!hasOwn(message, key)) {
            console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
            return key;
        }
        return this.formater.interpolate(message[key], values).join('');
    }
}

function initLocaleWatcher(appVm, i18n) {
    appVm.$i18n &&
        appVm.$i18n.vm.$watch('locale', (newLocale) => {
            i18n.setLocale(newLocale);
        }, {
            immediate: true,
        });
}
function getDefaultLocale() {
    if (typeof navigator !== 'undefined') {
        return navigator.userLanguage || navigator.language;
    }
    if (typeof plus !== 'undefined') {
        // TODO 待调整为最新的获取语言代码
        return plus.os.language;
    }
    return uni.getSystemInfoSync().language;
}
function initVueI18n(messages, fallbackLocale = 'en', locale) {
    const i18n = new I18n({
        locale: locale || fallbackLocale,
        fallbackLocale,
        messages,
    });
    let t = (key, values) => {
        if (typeof getApp !== 'function') {
            // app-plus view
            /* eslint-disable no-func-assign */
            t = function (key, values) {
                return i18n.t(key, values);
            };
        }
        else {
            const appVm = getApp().$vm;
            if (!appVm.$t || !appVm.$i18n) {
                if (!locale) {
                    i18n.setLocale(getDefaultLocale());
                }
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    return i18n.t(key, values);
                };
            }
            else {
                initLocaleWatcher(appVm, i18n);
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    const $i18n = appVm.$i18n;
                    const silentTranslationWarn = $i18n.silentTranslationWarn;
                    $i18n.silentTranslationWarn = true;
                    const msg = appVm.$t(key, values);
                    $i18n.silentTranslationWarn = silentTranslationWarn;
                    if (msg !== key) {
                        return msg;
                    }
                    return i18n.t(key, $i18n.locale, values);
                };
            }
        }
        return t(key, values);
    };
    return {
        t(key, values) {
            return t(key, values);
        },
        getLocale() {
            return i18n.getLocale();
        },
        setLocale(newLocale) {
            return i18n.setLocale(newLocale);
        },
        mixin: {
            beforeCreate() {
                const unwatch = i18n.watchLocale(() => {
                    this.$forceUpdate();
                });
                this.$once('hook:beforeDestroy', function () {
                    unwatch();
                });
            },
            methods: {
                $$t(key, values) {
                    return t(key, values);
                },
            },
        },
    };
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 224:
/*!***********************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/pages.json?{"type":"stat"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__7C8468A" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*******************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 87:
/*!********************************************************************!*\
  !*** D:/MyWeb/LH/LHMiniProgramRespository/common/coutry_code.json ***!
  \********************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"chineseName\":\"安哥拉\",\"country\":\"Angola\",\"region\":\"+244\",\"shortName\":\"AO\",\"showName\":\"+244(Angola)\"},{\"chineseName\":\"阿富汗\",\"country\":\"Afghanistan\",\"region\":\"+93\",\"shortName\":\"AF\",\"showName\":\"+93(Afghanistan)\"},{\"chineseName\":\"阿尔巴尼亚 \",\"country\":\"Albania\",\"region\":\"+355\",\"shortName\":\"AL\",\"showName\":\"+355(Albania)\"},{\"chineseName\":\"阿尔及利亚\",\"country\":\"Algeria\",\"region\":\"+213\",\"shortName\":\"DZ\",\"showName\":\"+213(Algeria)\"},{\"chineseName\":\"安道尔共和国\",\"country\":\"Andorra\",\"region\":\"+376\",\"shortName\":\"AD\",\"showName\":\"+376(Andorra)\"},{\"chineseName\":\"安圭拉岛\",\"country\":\"Anguilla\",\"region\":\"+1264\",\"shortName\":\"AI\",\"showName\":\"+1264(Anguilla)\"},{\"chineseName\":\"安提瓜和巴布达\",\"country\":\"Antigua and Barbuda\",\"region\":\"+1268\",\"shortName\":\"AG\",\"showName\":\"+1268(Antigua and Barbuda)\"},{\"chineseName\":\"阿根廷\",\"country\":\"Argentina\",\"region\":\"+54\",\"shortName\":\"AR\",\"showName\":\"+54(Argentina)\"},{\"chineseName\":\"亚美尼亚\",\"country\":\"Armenia\",\"region\":\"+374\",\"shortName\":\"AM\",\"showName\":\"+374(Armenia)\"},{\"chineseName\":\"阿森松\",\"country\":\"Ascension\",\"region\":\"+247\",\"shortName\":\"　\",\"showName\":\"+247(Ascension)\"},{\"chineseName\":\"澳大利亚\",\"country\":\"Australia\",\"region\":\"+61\",\"shortName\":\"AU\",\"showName\":\"+61(Australia)\"},{\"chineseName\":\"奥地利\",\"country\":\"Austria\",\"region\":\"+43\",\"shortName\":\"AT\",\"showName\":\"+43(Austria)\"},{\"chineseName\":\"阿塞拜疆\",\"country\":\"Azerbaijan\",\"region\":\"+994\",\"shortName\":\"AZ\",\"showName\":\"+994(Azerbaijan)\"},{\"chineseName\":\"巴哈马\",\"country\":\"Bahamas\",\"region\":\"+1242\",\"shortName\":\"BS\",\"showName\":\"+1242(Bahamas)\"},{\"chineseName\":\"巴林\",\"country\":\"Bahrain\",\"region\":\"+973\",\"shortName\":\"BH\",\"showName\":\"+973(Bahrain)\"},{\"chineseName\":\"孟加拉国\",\"country\":\"Bangladesh\",\"region\":\"+880\",\"shortName\":\"BD\",\"showName\":\"+880(Bangladesh)\"},{\"chineseName\":\"巴巴多斯\",\"country\":\"Barbados\",\"region\":\"+1246\",\"shortName\":\"BB\",\"showName\":\"+1246(Barbados)\"},{\"chineseName\":\"白俄罗斯\",\"country\":\"Belarus\",\"region\":\"+375\",\"shortName\":\"BY\",\"showName\":\"+375(Belarus)\"},{\"chineseName\":\"比利时\",\"country\":\"Belgium\",\"region\":\"+32\",\"shortName\":\"BE\",\"showName\":\"+32(Belgium)\"},{\"chineseName\":\"伯利兹\",\"country\":\"Belize\",\"region\":\"+501\",\"shortName\":\"BZ\",\"showName\":\"+501(Belize)\"},{\"chineseName\":\"贝宁\",\"country\":\"Benin\",\"region\":\"+229\",\"shortName\":\"BJ\",\"showName\":\"+229(Benin)\"},{\"chineseName\":\"百慕大群岛\",\"country\":\"BermudaIs.\",\"region\":\"+1441\",\"shortName\":\"BM\",\"showName\":\"+1441(BermudaIs.)\"},{\"chineseName\":\"玻利维亚\",\"country\":\"Bolivia\",\"region\":\"+591\",\"shortName\":\"BO\",\"showName\":\"+591(Bolivia)\"},{\"chineseName\":\"博茨瓦纳\",\"country\":\"Botswana\",\"region\":\"+267\",\"shortName\":\"BW\",\"showName\":\"+267(Botswana)\"},{\"chineseName\":\"巴西\",\"country\":\"Brazil\",\"region\":\"+55\",\"shortName\":\"BR\",\"showName\":\"+55(Brazil)\"},{\"chineseName\":\"文莱\",\"country\":\"Brunei\",\"region\":\"+673\",\"shortName\":\"BN\",\"showName\":\"+673(Brunei)\"},{\"chineseName\":\"保加利亚\",\"country\":\"Bulgaria\",\"region\":\"+359\",\"shortName\":\"BG\",\"showName\":\"+359(Bulgaria)\"},{\"chineseName\":\"布基纳法索\",\"country\":\"Burkina-faso\",\"region\":\"+226\",\"shortName\":\"BF\",\"showName\":\"+226(Burkina-faso)\"},{\"chineseName\":\"缅甸\",\"country\":\"Burma\",\"region\":\"+95\",\"shortName\":\"MM\",\"showName\":\"+95(Burma)\"},{\"chineseName\":\"布隆迪\",\"country\":\"Burundi\",\"region\":\"+257\",\"shortName\":\"BI\",\"showName\":\"+257(Burundi)\"},{\"chineseName\":\"喀麦隆\",\"country\":\"Cameroon\",\"region\":\"+237\",\"shortName\":\"CM\",\"showName\":\"+237(Cameroon)\"},{\"chineseName\":\"加拿大\",\"country\":\"Canada\",\"region\":\"+1\",\"shortName\":\"CA\",\"showName\":\"+1(Canada)\"},{\"chineseName\":\"开曼群岛\",\"country\":\"Cayman Is.\",\"region\":\"+1345\",\"shortName\":\"　\",\"showName\":\"+1345(Cayman Is.)\"},{\"chineseName\":\"中非共和国 \",\"country\":\"Central African Republic\",\"region\":\"+236\",\"shortName\":\"CF\",\"showName\":\"+236(Central African Republic)\"},{\"chineseName\":\"乍得\",\"country\":\"Chad\",\"region\":\"+235\",\"shortName\":\"TD\",\"showName\":\"+235(Chad)\"},{\"chineseName\":\"智利\",\"country\":\"Chile\",\"region\":\"+56\",\"shortName\":\"CL\",\"showName\":\"+56(Chile)\"},{\"chineseName\":\"中国\",\"country\":\"China\",\"region\":\"+86\",\"shortName\":\"CN\",\"showName\":\"+86(China)\"},{\"chineseName\":\"哥伦比亚\",\"country\":\"Colombia\",\"region\":\"+57\",\"shortName\":\"CO\",\"showName\":\"+57(Colombia)\"},{\"chineseName\":\"刚果\",\"country\":\"Congo\",\"region\":\"+242\",\"shortName\":\"CG\",\"showName\":\"+242(Congo)\"},{\"chineseName\":\"库克群岛\",\"country\":\"Cook Is.\",\"region\":\"+682\",\"shortName\":\"CK\",\"showName\":\"+682(Cook Is.)\"},{\"chineseName\":\"哥斯达黎加\",\"country\":\"Costa Rica\",\"region\":\"+506\",\"shortName\":\"CR\",\"showName\":\"+506(Costa Rica)\"},{\"chineseName\":\"古巴\",\"country\":\"Cuba\",\"region\":\"+53\",\"shortName\":\"CU\",\"showName\":\"+53(Cuba)\"},{\"chineseName\":\"塞浦路斯\",\"country\":\"Cyprus\",\"region\":\"+357\",\"shortName\":\"CY\",\"showName\":\"+357(Cyprus)\"},{\"chineseName\":\"捷克\",\"country\":\"Czech Republic\",\"region\":\"+420\",\"shortName\":\"CZ\",\"showName\":\"+420(Czech Republic)\"},{\"chineseName\":\"丹麦\",\"country\":\"Denmark\",\"region\":\"+45\",\"shortName\":\"DK\",\"showName\":\"+45(Denmark)\"},{\"chineseName\":\"吉布提\",\"country\":\"Djibouti\",\"region\":\"+253\",\"shortName\":\"DJ\",\"showName\":\"+253(Djibouti)\"},{\"chineseName\":\"多米尼加共和国\",\"country\":\"Dominica Rep.\",\"region\":\"+1890\",\"shortName\":\"DO\",\"showName\":\"+1890(Dominica Rep.)\"},{\"chineseName\":\"厄瓜多尔\",\"country\":\"Ecuador\",\"region\":\"+593\",\"shortName\":\"EC\",\"showName\":\"+593(Ecuador)\"},{\"chineseName\":\"埃及\",\"country\":\"Egypt\",\"region\":\"+20\",\"shortName\":\"EG\",\"showName\":\"+20(Egypt)\"},{\"chineseName\":\"萨尔瓦多\",\"country\":\"EISalvador\",\"region\":\"+503\",\"shortName\":\"SV\",\"showName\":\"+503(EISalvador)\"},{\"chineseName\":\"爱沙尼亚\",\"country\":\"Estonia\",\"region\":\"+372\",\"shortName\":\"EE\",\"showName\":\"+372(Estonia)\"},{\"chineseName\":\"埃塞俄比亚\",\"country\":\"Ethiopia\",\"region\":\"+251\",\"shortName\":\"ET\",\"showName\":\"+251(Ethiopia)\"},{\"chineseName\":\"斐济\",\"country\":\"Fiji\",\"region\":\"+679\",\"shortName\":\"FJ\",\"showName\":\"+679(Fiji)\"},{\"chineseName\":\"芬兰\",\"country\":\"Finland\",\"region\":\"+358\",\"shortName\":\"FI\",\"showName\":\"+358(Finland)\"},{\"chineseName\":\"法国\",\"country\":\"France\",\"region\":\"+33\",\"shortName\":\"FR\",\"showName\":\"+33(France)\"},{\"chineseName\":\"法属圭亚那\",\"country\":\"French Guiana\",\"region\":\"+594\",\"shortName\":\"GF\",\"showName\":\"+594(French Guiana)\"},{\"chineseName\":\"加蓬\",\"country\":\"Gabon\",\"region\":\"+241\",\"shortName\":\"GA\",\"showName\":\"+241(Gabon)\"},{\"chineseName\":\"冈比亚\",\"country\":\"Gambia\",\"region\":\"+220\",\"shortName\":\"GM\",\"showName\":\"+220(Gambia)\"},{\"chineseName\":\"格鲁吉亚\",\"country\":\"Georgia\",\"region\":\"+995\",\"shortName\":\"GE\",\"showName\":\"+995(Georgia)\"},{\"chineseName\":\"德国\",\"country\":\"Germany\",\"region\":\"+49\",\"shortName\":\"DE\",\"showName\":\"+49(Germany)\"},{\"chineseName\":\"加纳\",\"country\":\"Ghana\",\"region\":\"+233\",\"shortName\":\"GH\",\"showName\":\"+233(Ghana)\"},{\"chineseName\":\"直布罗陀\",\"country\":\"Gibraltar\",\"region\":\"+350\",\"shortName\":\"GI\",\"showName\":\"+350(Gibraltar)\"},{\"chineseName\":\"希腊\",\"country\":\"Greece\",\"region\":\"+30\",\"shortName\":\"GR\",\"showName\":\"+30(Greece)\"},{\"chineseName\":\"格林纳达\",\"country\":\"Grenada\",\"region\":\"+1809\",\"shortName\":\"GD\",\"showName\":\"+1809(Grenada)\"},{\"chineseName\":\"关岛\",\"country\":\"Guam\",\"region\":\"+1671\",\"shortName\":\"GU\",\"showName\":\"+1671(Guam)\"},{\"chineseName\":\"危地马拉\",\"country\":\"Guatemala\",\"region\":\"+502\",\"shortName\":\"GT\",\"showName\":\"+502(Guatemala)\"},{\"chineseName\":\"几内亚\",\"country\":\"Guinea\",\"region\":\"+224\",\"shortName\":\"GN\",\"showName\":\"+224(Guinea)\"},{\"chineseName\":\"圭亚那\",\"country\":\"Guyana\",\"region\":\"+592\",\"shortName\":\"GY\",\"showName\":\"+592(Guyana)\"},{\"chineseName\":\"海地\",\"country\":\"Haiti\",\"region\":\"+509\",\"shortName\":\"HT\",\"showName\":\"+509(Haiti)\"},{\"chineseName\":\"洪都拉斯\",\"country\":\"Honduras\",\"region\":\"+504\",\"shortName\":\"HN\",\"showName\":\"+504(Honduras)\"},{\"chineseName\":\"香港\",\"country\":\"Hongkong\",\"region\":\"+852\",\"shortName\":\"HK\",\"showName\":\"+852(Hongkong)\"},{\"chineseName\":\"匈牙利\",\"country\":\"Hungary\",\"region\":\"+36\",\"shortName\":\"HU\",\"showName\":\"+36(Hungary)\"},{\"chineseName\":\"冰岛\",\"country\":\"Iceland\",\"region\":\"+354\",\"shortName\":\"IS\",\"showName\":\"+354(Iceland)\"},{\"chineseName\":\"印度\",\"country\":\"India\",\"region\":\"+91\",\"shortName\":\"IN\",\"showName\":\"+91(India)\"},{\"chineseName\":\"印度尼西亚\",\"country\":\"Indonesia\",\"region\":\"+62\",\"shortName\":\"ID\",\"showName\":\"+62(Indonesia)\"},{\"chineseName\":\"伊朗\",\"country\":\"Iran\",\"region\":\"+98\",\"shortName\":\"IR\",\"showName\":\"+98(Iran)\"},{\"chineseName\":\"伊拉克\",\"country\":\"Iraq\",\"region\":\"+964\",\"shortName\":\"IQ\",\"showName\":\"+964(Iraq)\"},{\"chineseName\":\"爱尔兰\",\"country\":\"Ireland\",\"region\":\"+353\",\"shortName\":\"IE\",\"showName\":\"+353(Ireland)\"},{\"chineseName\":\"以色列\",\"country\":\"Israel\",\"region\":\"+972\",\"shortName\":\"IL\",\"showName\":\"+972(Israel)\"},{\"chineseName\":\"意大利\",\"country\":\"Italy\",\"region\":\"+39\",\"shortName\":\"IT\",\"showName\":\"+39(Italy)\"},{\"chineseName\":\"科特迪瓦\",\"country\":\"IvoryCoast\",\"region\":\"+225\",\"shortName\":\"　\",\"showName\":\"+225(IvoryCoast)\"},{\"chineseName\":\"牙买加\",\"country\":\"Jamaica\",\"region\":\"+1876\",\"shortName\":\"JM\",\"showName\":\"+1876(Jamaica)\"},{\"chineseName\":\"日本\",\"country\":\"Japan\",\"region\":\"+81\",\"shortName\":\"JP\",\"showName\":\"+81(Japan)\"},{\"chineseName\":\"约旦\",\"country\":\"Jordan\",\"region\":\"+962\",\"shortName\":\"JO\",\"showName\":\"+962(Jordan)\"},{\"chineseName\":\"柬埔寨\",\"country\":\"Kampuchea (Cambodia )\",\"region\":\"+855\",\"shortName\":\"KH\",\"showName\":\"+855(Kampuchea (Cambodia ))\"},{\"chineseName\":\"哈萨克斯坦 \",\"country\":\"Kazakstan\",\"region\":\"+327\",\"shortName\":\"KZ\",\"showName\":\"+327(Kazakstan)\"},{\"chineseName\":\"肯尼亚\",\"country\":\"Kenya\",\"region\":\"+254\",\"shortName\":\"KE\",\"showName\":\"+254(Kenya)\"},{\"chineseName\":\"韩国\",\"country\":\"Korea\",\"region\":\"+82\",\"shortName\":\"KR\",\"showName\":\"+82(Korea)\"},{\"chineseName\":\"科威特\",\"country\":\"Kuwait\",\"region\":\"+965\",\"shortName\":\"KW\",\"showName\":\"+965(Kuwait)\"},{\"chineseName\":\"吉尔吉斯坦 \",\"country\":\"Kyrgyzstan\",\"region\":\"+331\",\"shortName\":\"KG\",\"showName\":\"+331(Kyrgyzstan)\"},{\"chineseName\":\"老挝\",\"country\":\"Laos\",\"region\":\"+856\",\"shortName\":\"LA\",\"showName\":\"+856(Laos)\"},{\"chineseName\":\"拉脱维亚\",\"country\":\"Latvia\",\"region\":\"+371\",\"shortName\":\"LV\",\"showName\":\"+371(Latvia)\"},{\"chineseName\":\"黎巴嫩\",\"country\":\"Lebanon\",\"region\":\"+961\",\"shortName\":\"LB\",\"showName\":\"+961(Lebanon)\"},{\"chineseName\":\"莱索托\",\"country\":\"Lesotho\",\"region\":\"+266\",\"shortName\":\"LS\",\"showName\":\"+266(Lesotho)\"},{\"chineseName\":\"利比里亚\",\"country\":\"Liberia\",\"region\":\"+231\",\"shortName\":\"LR\",\"showName\":\"+231(Liberia)\"},{\"chineseName\":\"利比亚\",\"country\":\"Libya\",\"region\":\"+218\",\"shortName\":\"LY\",\"showName\":\"+218(Libya)\"},{\"chineseName\":\"列支敦士登\",\"country\":\"Liechtenstein\",\"region\":\"+423\",\"shortName\":\"LI\",\"showName\":\"+423(Liechtenstein)\"},{\"chineseName\":\"立陶宛\",\"country\":\"Lithuania\",\"region\":\"+370\",\"shortName\":\"LT\",\"showName\":\"+370(Lithuania)\"},{\"chineseName\":\"卢森堡\",\"country\":\"Luxembourg\",\"region\":\"+352\",\"shortName\":\"LU\",\"showName\":\"+352(Luxembourg)\"},{\"chineseName\":\"澳门\",\"country\":\"Macao\",\"region\":\"+853\",\"shortName\":\"MO\",\"showName\":\"+853(Macao)\"},{\"chineseName\":\"马达加斯加\",\"country\":\"Madagascar\",\"region\":\"+261\",\"shortName\":\"MG\",\"showName\":\"+261(Madagascar)\"},{\"chineseName\":\"马拉维\",\"country\":\"Malawi\",\"region\":\"+265\",\"shortName\":\"MW\",\"showName\":\"+265(Malawi)\"},{\"chineseName\":\"马来西亚\",\"country\":\"Malaysia\",\"region\":\"+60\",\"shortName\":\"MY\",\"showName\":\"+60(Malaysia)\"},{\"chineseName\":\"马尔代夫\",\"country\":\"Maldives\",\"region\":\"+960\",\"shortName\":\"MV\",\"showName\":\"+960(Maldives)\"},{\"chineseName\":\"马里\",\"country\":\"Mali\",\"region\":\"+223\",\"shortName\":\"ML\",\"showName\":\"+223(Mali)\"},{\"chineseName\":\"马耳他\",\"country\":\"Malta\",\"region\":\"+356\",\"shortName\":\"MT\",\"showName\":\"+356(Malta)\"},{\"chineseName\":\"马里亚那群岛\",\"country\":\"Mariana Is\",\"region\":\"+1670\",\"shortName\":\"　\",\"showName\":\"+1670(Mariana Is)\"},{\"chineseName\":\"马提尼克\",\"country\":\"Martinique\",\"region\":\"+596\",\"shortName\":\"　\",\"showName\":\"+596(Martinique)\"},{\"chineseName\":\"毛里求斯\",\"country\":\"Mauritius\",\"region\":\"+230\",\"shortName\":\"MU\",\"showName\":\"+230(Mauritius)\"},{\"chineseName\":\"墨西哥\",\"country\":\"Mexico\",\"region\":\"+52\",\"shortName\":\"MX\",\"showName\":\"+52(Mexico)\"},{\"chineseName\":\"摩尔多瓦\",\"country\":\"Moldova, Republic of\",\"region\":\"+373\",\"shortName\":\"MD\",\"showName\":\"+373(Moldova, Republic of)\"},{\"chineseName\":\"摩纳哥\",\"country\":\"Monaco\",\"region\":\"+377\",\"shortName\":\"MC\",\"showName\":\"+377(Monaco)\"},{\"chineseName\":\"蒙古\",\"country\":\"Mongolia\",\"region\":\"+976\",\"shortName\":\"MN\",\"showName\":\"+976(Mongolia)\"},{\"chineseName\":\"蒙特塞拉特岛\",\"country\":\"Montserrat Is\",\"region\":\"+1664\",\"shortName\":\"MS\",\"showName\":\"+1664(Montserrat Is)\"},{\"chineseName\":\"摩洛哥\",\"country\":\"Morocco\",\"region\":\"+212\",\"shortName\":\"MA\",\"showName\":\"+212(Morocco)\"},{\"chineseName\":\"莫桑比克\",\"country\":\"Mozambique\",\"region\":\"+258\",\"shortName\":\"MZ\",\"showName\":\"+258(Mozambique)\"},{\"chineseName\":\"纳米比亚\",\"country\":\"Namibia\",\"region\":\"+264\",\"shortName\":\"NA\",\"showName\":\"+264(Namibia)\"},{\"chineseName\":\"瑙鲁\",\"country\":\"Nauru\",\"region\":\"+674\",\"shortName\":\"NR\",\"showName\":\"+674(Nauru)\"},{\"chineseName\":\"尼泊尔\",\"country\":\"Nepal\",\"region\":\"+977\",\"shortName\":\"NP\",\"showName\":\"+977(Nepal)\"},{\"chineseName\":\"荷属安的列斯\",\"country\":\"Netheriands Antilles\",\"region\":\"+599\",\"shortName\":\"　\",\"showName\":\"+599(Netheriands Antilles)\"},{\"chineseName\":\"荷兰\",\"country\":\"Netherlands \",\"region\":\"+31\",\"shortName\":\"NL\",\"showName\":\"+31(Netherlands )\"},{\"chineseName\":\"新西兰\",\"country\":\"NewZealand\",\"region\":\"+64\",\"shortName\":\"NZ\",\"showName\":\"+64(NewZealand)\"},{\"chineseName\":\"尼加拉瓜\",\"country\":\"Nicaragua\",\"region\":\"+505\",\"shortName\":\"NI\",\"showName\":\"+505(Nicaragua)\"},{\"chineseName\":\"尼日尔\",\"country\":\"Niger\",\"region\":\"+227\",\"shortName\":\"NE\",\"showName\":\"+227(Niger)\"},{\"chineseName\":\"尼日利亚\",\"country\":\"Nigeria\",\"region\":\"+234\",\"shortName\":\"NG\",\"showName\":\"+234(Nigeria)\"},{\"chineseName\":\"朝鲜\",\"country\":\"North Korea\",\"region\":\"+850\",\"shortName\":\"KP\",\"showName\":\"+850(North Korea)\"},{\"chineseName\":\"挪威\",\"country\":\"Norway\",\"region\":\"+47\",\"shortName\":\"NO\",\"showName\":\"+47(Norway)\"},{\"chineseName\":\"阿曼\",\"country\":\"Oman\",\"region\":\"+968\",\"shortName\":\"OM\",\"showName\":\"+968(Oman)\"},{\"chineseName\":\"巴基斯坦\",\"country\":\"Pakistan\",\"region\":\"+92\",\"shortName\":\"PK\",\"showName\":\"+92(Pakistan)\"},{\"chineseName\":\"巴拿马\",\"country\":\"Panama\",\"region\":\"+507\",\"shortName\":\"PA\",\"showName\":\"+507(Panama)\"},{\"chineseName\":\"巴布亚新几内亚\",\"country\":\"Papua New Cuinea\",\"region\":\"+675\",\"shortName\":\"PG\",\"showName\":\"+675(Papua New Cuinea)\"},{\"chineseName\":\"巴拉圭\",\"country\":\"Paraguay\",\"region\":\"+595\",\"shortName\":\"PY\",\"showName\":\"+595(Paraguay)\"},{\"chineseName\":\"秘鲁\",\"country\":\"Peru\",\"region\":\"+51\",\"shortName\":\"PE\",\"showName\":\"+51(Peru)\"},{\"chineseName\":\"菲律宾\",\"country\":\"Philippines \",\"region\":\"+63\",\"shortName\":\"PH\",\"showName\":\"+63(Philippines )\"},{\"chineseName\":\"波兰\",\"country\":\"Poland\",\"region\":\"+48\",\"shortName\":\"PL\",\"showName\":\"+48(Poland)\"},{\"chineseName\":\"法属玻利尼西亚\",\"country\":\"French Polynesia\",\"region\":\"+689\",\"shortName\":\"PF\",\"showName\":\"+689(French Polynesia)\"},{\"chineseName\":\"葡萄牙\",\"country\":\"Portugal\",\"region\":\"+351\",\"shortName\":\"PT\",\"showName\":\"+351(Portugal)\"},{\"chineseName\":\"波多黎各\",\"country\":\"PuertoRico\",\"region\":\"+1787\",\"shortName\":\"PR\",\"showName\":\"+1787(PuertoRico)\"},{\"chineseName\":\"卡塔尔\",\"country\":\"Qatar\",\"region\":\"+974\",\"shortName\":\"QA\",\"showName\":\"+974(Qatar)\"},{\"chineseName\":\"留尼旺\",\"country\":\"Reunion\",\"region\":\"+262\",\"shortName\":\"　\",\"showName\":\"+262(Reunion)\"},{\"chineseName\":\"罗马尼亚\",\"country\":\"Romania\",\"region\":\"+40\",\"shortName\":\"RO\",\"showName\":\"+40(Romania)\"},{\"chineseName\":\"俄罗斯\",\"country\":\"Russia\",\"region\":\"+7\",\"shortName\":\"RU\",\"showName\":\"+7(Russia)\"},{\"chineseName\":\"圣卢西亚\",\"country\":\"Saint Lueia\",\"region\":\"+1758\",\"shortName\":\"LC\",\"showName\":\"+1758(Saint Lueia)\"},{\"chineseName\":\"圣文森特岛 \",\"country\":\"Saint Vincent\",\"region\":\"+1784\",\"shortName\":\"VC\",\"showName\":\"+1784(Saint Vincent)\"},{\"chineseName\":\"东萨摩亚(美)\",\"country\":\"Samoa Eastern\",\"region\":\"+684\",\"shortName\":\"　\",\"showName\":\"+684(Samoa Eastern)\"},{\"chineseName\":\"西萨摩亚\",\"country\":\"Samoa Western\",\"region\":\"+685\",\"shortName\":\"　\",\"showName\":\"+685(Samoa Western)\"},{\"chineseName\":\"圣马力诺\",\"country\":\"San Marino\",\"region\":\"+378\",\"shortName\":\"SM\",\"showName\":\"+378(San Marino)\"},{\"chineseName\":\"圣多美和普林西比\",\"country\":\"Sao Tome and Principe\",\"region\":\"+239\",\"shortName\":\"ST\",\"showName\":\"+239(Sao Tome and Principe)\"},{\"chineseName\":\"沙特阿拉伯\",\"country\":\"Saudi Arabia\",\"region\":\"+966\",\"shortName\":\"SA\",\"showName\":\"+966(Saudi Arabia)\"},{\"chineseName\":\"塞内加尔\",\"country\":\"Senegal\",\"region\":\"+221\",\"shortName\":\"SN\",\"showName\":\"+221(Senegal)\"},{\"chineseName\":\"塞舌尔\",\"country\":\"Seychelles\",\"region\":\"+248\",\"shortName\":\"SC\",\"showName\":\"+248(Seychelles)\"},{\"chineseName\":\"塞拉利昂\",\"country\":\"Sierra Leone\",\"region\":\"+232\",\"shortName\":\"SL\",\"showName\":\"+232(Sierra Leone)\"},{\"chineseName\":\"新加坡\",\"country\":\"Singapore\",\"region\":\"+65\",\"shortName\":\"SG\",\"showName\":\"+65(Singapore)\"},{\"chineseName\":\"斯洛伐克\",\"country\":\"Slovakia\",\"region\":\"+421\",\"shortName\":\"SK\",\"showName\":\"+421(Slovakia)\"},{\"chineseName\":\"斯洛文尼亚 \",\"country\":\"Slovenia\",\"region\":\"+386\",\"shortName\":\"SI\",\"showName\":\"+386(Slovenia)\"},{\"chineseName\":\"所罗门群岛\",\"country\":\"Solomon Is\",\"region\":\"+677\",\"shortName\":\"SB\",\"showName\":\"+677(Solomon Is)\"},{\"chineseName\":\"索马里\",\"country\":\"Somali\",\"region\":\"+252\",\"shortName\":\"SO\",\"showName\":\"+252(Somali)\"},{\"chineseName\":\"南非\",\"country\":\"South Africa\",\"region\":\"+27\",\"shortName\":\"ZA\",\"showName\":\"+27(South Africa)\"},{\"chineseName\":\"西班牙\",\"country\":\"Spain\",\"region\":\"+34\",\"shortName\":\"ES\",\"showName\":\"+34(Spain)\"},{\"chineseName\":\"斯里兰卡\",\"country\":\"Sri Lanka\",\"region\":\"+94\",\"shortName\":\"LK\",\"showName\":\"+94(Sri Lanka)\"},{\"chineseName\":\"圣卢西亚\",\"country\":\"St.Lucia\",\"region\":\"+1758\",\"shortName\":\"LC\",\"showName\":\"+1758(St.Lucia)\"},{\"chineseName\":\"圣文森特\",\"country\":\"St.Vincent\",\"region\":\"+1784\",\"shortName\":\"VC\",\"showName\":\"+1784(St.Vincent)\"},{\"chineseName\":\"苏丹\",\"country\":\"Sudan\",\"region\":\"+249\",\"shortName\":\"SD\",\"showName\":\"+249(Sudan)\"},{\"chineseName\":\"苏里南\",\"country\":\"Suriname\",\"region\":\"+597\",\"shortName\":\"SR\",\"showName\":\"+597(Suriname)\"},{\"chineseName\":\"斯威士兰\",\"country\":\"Swaziland\",\"region\":\"+268\",\"shortName\":\"SZ\",\"showName\":\"+268(Swaziland)\"},{\"chineseName\":\"瑞典\",\"country\":\"Sweden\",\"region\":\"+46\",\"shortName\":\"SE\",\"showName\":\"+46(Sweden)\"},{\"chineseName\":\"瑞士\",\"country\":\"Switzerland \",\"region\":\"+41\",\"shortName\":\"CH\",\"showName\":\"+41(Switzerland )\"},{\"chineseName\":\"叙利亚\",\"country\":\"Syria\",\"region\":\"+963\",\"shortName\":\"SY\",\"showName\":\"+963(Syria)\"},{\"chineseName\":\"台湾省\",\"country\":\"Taiwan\",\"region\":\"+886\",\"shortName\":\"TW\",\"showName\":\"+886(Taiwan)\"},{\"chineseName\":\"塔吉克斯坦 \",\"country\":\"Tajikstan\",\"region\":\"+992\",\"shortName\":\"TJ\",\"showName\":\"+992(Tajikstan)\"},{\"chineseName\":\"坦桑尼亚\",\"country\":\"Tanzania\",\"region\":\"+255\",\"shortName\":\"TZ\",\"showName\":\"+255(Tanzania)\"},{\"chineseName\":\"泰国\",\"country\":\"Thailand\",\"region\":\"+66\",\"shortName\":\"TH\",\"showName\":\"+66(Thailand)\"},{\"chineseName\":\"多哥\",\"country\":\"Togo\",\"region\":\"+228\",\"shortName\":\"TG\",\"showName\":\"+228(Togo)\"},{\"chineseName\":\"汤加\",\"country\":\"Tonga\",\"region\":\"+676\",\"shortName\":\"TO\",\"showName\":\"+676(Tonga)\"},{\"chineseName\":\"特立尼达和多巴哥\",\"country\":\"Trinidad and Tobago\",\"region\":\"+1809\",\"shortName\":\"TT\",\"showName\":\"+1809(Trinidad and Tobago)\"},{\"chineseName\":\"突尼斯\",\"country\":\"Tunisia\",\"region\":\"+216\",\"shortName\":\"TN\",\"showName\":\"+216(Tunisia)\"},{\"chineseName\":\"土耳其\",\"country\":\"Turkey\",\"region\":\"+90\",\"shortName\":\"TR\",\"showName\":\"+90(Turkey)\"},{\"chineseName\":\"土库曼斯坦 \",\"country\":\"Turkmenistan\",\"region\":\"+993\",\"shortName\":\"TM\",\"showName\":\"+993(Turkmenistan)\"},{\"chineseName\":\"乌干达\",\"country\":\"Uganda\",\"region\":\"+256\",\"shortName\":\"UG\",\"showName\":\"+256(Uganda)\"},{\"chineseName\":\"乌克兰\",\"country\":\"Ukraine\",\"region\":\"+380\",\"shortName\":\"UA\",\"showName\":\"+380(Ukraine)\"},{\"chineseName\":\"阿拉伯联合酋长国\",\"country\":\"United Arab Emirates\",\"region\":\"+971\",\"shortName\":\"AE\",\"showName\":\"+971(United Arab Emirates)\"},{\"chineseName\":\"英国\",\"country\":\"United Kiongdom\",\"region\":\"+44\",\"shortName\":\"GB\",\"showName\":\"+44(United Kiongdom)\"},{\"chineseName\":\"美国\",\"country\":\"United States of America\",\"region\":\"+1\",\"shortName\":\"US\",\"showName\":\"+1(United States of America)\"},{\"chineseName\":\"乌拉圭\",\"country\":\"Uruguay\",\"region\":\"+598\",\"shortName\":\"UY\",\"showName\":\"+598(Uruguay)\"},{\"chineseName\":\"乌兹别克斯坦\",\"country\":\"Uzbekistan\",\"region\":\"+233\",\"shortName\":\"UZ\",\"showName\":\"+233(Uzbekistan)\"},{\"chineseName\":\"委内瑞拉\",\"country\":\"Venezuela\",\"region\":\"+58\",\"shortName\":\"VE\",\"showName\":\"+58(Venezuela)\"},{\"chineseName\":\"越南\",\"country\":\"Vietnam\",\"region\":\"+84\",\"shortName\":\"VN\",\"showName\":\"+84(Vietnam)\"},{\"chineseName\":\"也门\",\"country\":\"Yemen\",\"region\":\"+967\",\"shortName\":\"YE\",\"showName\":\"+967(Yemen)\"},{\"chineseName\":\"南斯拉夫\",\"country\":\"Yugoslavia\",\"region\":\"+381\",\"shortName\":\"YU\",\"showName\":\"+381(Yugoslavia)\"},{\"chineseName\":\"津巴布韦\",\"country\":\"Zimbabwe\",\"region\":\"+263\",\"shortName\":\"ZW\",\"showName\":\"+263(Zimbabwe)\"},{\"chineseName\":\"扎伊尔\",\"country\":\"Zaire\",\"region\":\"+243\",\"shortName\":\"ZR\",\"showName\":\"+243(Zaire)\"},{\"chineseName\":\"赞比亚\",\"country\":\"Zambia\",\"region\":\"+260\",\"shortName\":\"ZM\",\"showName\":\"+260(Zambia)\"}]");

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map