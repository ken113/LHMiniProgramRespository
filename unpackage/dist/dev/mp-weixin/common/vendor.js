(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
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
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
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
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
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

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
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
wx.createPlugin = createPlugin;

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

/***/ 11:
/*!**************************************************!*\
  !*** E:/LHMiniProgramRespository/common/util.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  autoUpdater: function autoUpdater() {
    var updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {

      console.log('版本检测', res);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {

          wx.showModal({
            title: '更新提示',
            content: '新的版本已准备好，是否重启应用?',
            success: function success(res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
              if (res.cancel) {
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~' });

              }
            } });


        });

        // 新版本下载失败
        updateManager.onUpdateFailed(function (res) {
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新的版本已经上线拉~，请您删除当前小程序，重新搜索打开哟~ ' });

        });
      }
    });
  },
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
  },
  dateFormat: function dateFormat(pdate, len) {

    var date = new Date(pdate),
    _year = date.getFullYear(),
    _month = date.getMonth() + 1,
    _date = date.getDate(),
    _h = date.getHours(),
    _m = date.getMinutes(),
    _s = date.getSeconds();


    _month = _month > 9 ? _month : '0' + _month;
    _date = _date > 9 ? _date : '0' + _date;
    _h = _h > 9 ? _h : '0' + _h;
    _m = _m > 9 ? _m : '0' + _m;
    _s = _s > 9 ? _s : '0' + _s;

    var dateStr = _year + '-' + _month + '-' + _date + ' ' + _h + ':' + _m + ':' + _s;

    if (len === 'd') {
      return dateStr.substring(0, 10);
    }
    return dateStr;
  },
  isChineseChar: function isChineseChar(str) {
    var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
    return reg.test(str);
  },
  isEnChar: function isEnChar(str) {
    var reg = /^[a-zA-Z]+$/;
    return reg.test(str);
  },
  isNumber: function isNumber(str) {
    var reg = /^[0-9]+$/;
    return reg.test(str);
  },
  isEmail: function isEmail(str) {
    var reg = /^([a-zA-Z0-9_#*~$^`|;:"'/?<>,&\\\(\)={}\[\]\%\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,10})+$/;
    return reg.test(str);
  },
  isDate: function isDate(dateStr) {
    if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(dateStr)) {
      return false;
    }

    //使用捕获组获取日期
    var date = {
      year: RegExp.$1,
      month: RegExp.$2,
      day: RegExp.$3 };


    //使用 Date() 对象，新建对象时会将日期转化为合法日期
    //比如 2020-02-30 被转化为 2020-3-1
    var dateObj = new Date(date.year, date.month - 1, date.day);

    if (date.year != dateObj.getFullYear() || date.month != dateObj.getMonth() + 1 || date.day != dateObj.
    getDate()) {
      return false;
    }

    return true;
  },
  getPersonAge: function getPersonAge(strBirthday, date2) {
    var returnAge = -1;
    if (!strBirthday) {
      return -1;
    }
    strBirthday = strBirthday.substring(0, 10);
    if (strBirthday == '0001-01-01' || strBirthday == '1900-01-01') {
      return -1;
    }
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date(date2);

    //已选中的出行日期为准，判断年龄
    var ServiceDate = date2.substring(0, 10);
    if (ServiceDate == '0001-01-01' || ServiceDate == '1900-01-01') {
      d = new Date();
    }

    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁  
    } else {
      var ageDiff = nowYear - birthYear; //年之差  
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差  
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差  
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天  
      }
    }
    return returnAge; //返回周岁年龄  
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*************************************************!*\
  !*** E:/LHMiniProgramRespository/common/api.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.sendRequest = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // 全局请求路径，也就是后端的请求基准路径
var BASE_URL_DEV = 'http://192.168.3.181:9021';

var BASE_URL_TEST = 'http://order.test.dodotour.cn:9021';

var BASE_URL_PROD = 'https://wxopen.dodotour.cn';

// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
var ajaxTimes = 0;
// 封装请求方法，并向外暴露该方法
var sendRequest = function sendRequest(options) {
  // 解构请求头参数
  var header = _objectSpread({},
  options.header);

  // 当前请求不是登录时请求，在header中加上后端返回的token

  var sessionId = uni.getStorageSync("sessionId");

  var data = Object.assign({}, options.data || {}, {
    sessionId: sessionId });

  ajaxTimes++;
  // 显示加载中 效果
  if (options.loadding === false) {} else {
    // uni.showLoading({
    // 	title: "加载中",
    //     mask: true,
    // });
  }
  return new Promise(function (resolve, reject) {

    uni.request({
      url: BASE_URL_PROD + options.url,
      method: options.method || 'POST',
      data: data,
      header: header,
      success: function success(res) {
        resolve(res.data);
        if (res.data.Code === 403) {
          uni.redirectTo({
            url: '/pages/index/login' });

        }
      },
      fail: function fail(err) {
        uni.showToast({
          icon: 'error',
          title: '服务异常' });

        reject(err);

      },
      // 完成之后关闭加载效果
      complete: function complete(result) {
        if (result && result.statusCode && result.statusCode === 500) {
          uni.showToast({
            icon: 'error',
            title: '服务器异常' });

        }
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //  关闭正在等待的图标
          uni.hideLoading();
        }
      } });

  });
};exports.sendRequest = sendRequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**************************************************!*\
  !*** E:/LHMiniProgramRespository/static/u55.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAArCAMAAABl52utAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRF2trawsLCzs7OyMjIv7+/y8vLxMTE0dHRxsbGtbW1+vr6/v7+09PT7+/v4uLi/Pz89vb28fHx/f393d3d+/v7+fn5vLy84eHhurq6uLi4ubm5tra22NjYwMDAvb296+vr9fX15eXl3Nzc6Ojo6urq9/f35+fn4ODgzMzM1tbW3t7ezc3N9PT01dXV1NTU7Ozs8PDwwcHB4+Pj6enp7u7u+Pj4u7u719fX0tLSt7e38/Pz39/f7e3t5OTktLS0////OBQnewAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAXSSURBVHjaxJhpe7I6EIbDorwsgqCgoKK471vdl+T//6uTDUSkrV/qmetqbWNMbiczz0wA6Nn20XFWlMNQKCxHNvqcgfQ/ViQF8GGqAAb/A4dVC2HWzsvypzl2Asyz4PpZDqDCb6zgfo7DEuH3Jtuf4rAK8Cerr79fYGB00v9GlXjh/mPQsUvYdnP9KSnWbDDNIcKfLZxndnc6ZM3y2p5fYWVur5NoLrT4Ln4zmfwVx38x5dihFw9eEg4Af7Oi9cxxglOE+ufk/UYbD1YlueU3WtRktb4JDTrXbtRHq3a7vTqqXqIDazU0+aCscY62+isHXDxzGHCE0AKCrWneTXML6PtVYyx6vijOZjNxrLbEQpfOncB2fGgwPjX82RL/qwZNxuEIv2NAdfV6LoZKvomDfzTV4G/MNvxcguRcZjD2gqsu48FxPfbwHk4YxxS+Y9JriFKOKBikOco2D8ZSvHnZF8hLFY9XG/G0jl+MBzWVcVTltzhgP5/Dht00hyMp5KU/jSfZLRgR/7Tu+JcngwrxoS3T5SwZv2UdZDCtAnxov5qs1LGc5XMgqZjicAp0V2R4OrJooVQaPURPjgTLPYAq0QCx8fUYrPnQ7wAkMfmegWnXkOp56jFycFhBP1VpOtdOwrGfPzicMayxfPLQWqAB6LA40FQaorpOj+11EAx8stfYnUdR74KcntjIynqZC0ztwSFCEf9ewu1t1b7t2rctpAGo42ksDYzDEZ5H5ARqOKVqNXOqju81/Lo1ezmDtS/Qo0FoKTQpZHGF3G7aKSqgX4Ck1CwlQkKP5t7DTIqnzmIOzN9hSZs1T8NfIGsbQBfbPZYMcSBND8mZ0MNFF+IkQc/ExxIOd/cDnLSHEd19CrcryqEDqHLvWWVNUe3BwFabWpkarprVsmY0ngcBqSxy55Bi85uWA+hpwZYdaw1hcvPitBTU8aTLFcuIPURfhMMu4k/qz9N4KCTWbFSfBgHxeHH17KXDCO0VLLLSPpFxYqXcfCkF/rrj+Wwq4eiqjejk5XLoTh4HmQrqtNRkg1MooZIwS4qKkKsgjAOtD4F35tL9Be19418HfcMxKuqvHCUJOxqQhtRzNy86vqiiZKkyK2hfKYbaKOFAtgfjdor4Y+6Qbdw8jigpNSkOm9Qq6g+4a77KRu+xaelFUbskcQ1oVzWXBEY9uD04qI9gYT4ol/UUB5Esy5s9c9BKKGAlBNQTx6qXza5SRzC05FtS2z04jmOLwEBVpYXHDgQ23o+DyKQuHNK0SsUp8JzX+LjDC6L5AutapvYXrBV2lMw9MGSSu8/ER3XabDYnVMcv3B9Vsxr3aVssUPRwbDJD39JWyoqr322CfaWbVGOsG9ZTpikK6vmpzDV526ye6LI9pjX6X/anvMwBmvUsREXNlZISR/qOG/PRn/bJPBfgUkdDRaiHUnOOasGzsLM4nf5tv/6Pb9iKmN/1XqY/K2jUZ+f533KYjxwZV0Ygp/T7/jcNWSXvYuMCJzu0MN/gcL33+rHh64c395wVbU/LDkmTd+5R4C2MYjZbTKnSithJTiWD57S7HFdkxlE2pCv7zNQPuSi2C2MmQtrRQoBdwEYjpUc53mtQexmMCC5F7qPJuStsLN6Gg1ad5romF7s+88Mo4ELUVpdKgwpdJ3T1DUMq+NKI3V+Gb2AoWUeKLeQcInZFqOAaQZEGqon6dY1p8AUdebWLz0UUkB4uEg4mvVIzuc8tfsVovdz5FczhZTn2mGPFOHqYo5nhmGH15xyeq7c4xzXhcKRfMILXi3YEj6f4XHzzn8z0XKxfhYD+6YaSGSye47SvNicqrQDaAUzP6ywHcos/YvjtnAjHcVq5sC69K514M783xvcKy9v5SeryDI7iCtkbj3nJimZXUE49GOCNg/uTRw6rzz0Pck7fZ+wcfY4DZ02Yf8E+Oh9+XuiC4JWi8KGHqE/PT92u8NQOhcrHHuWCbHWYKtJGDkO5OAN963PPk/8TYAALA9H3zU59EgAAAABJRU5ErkJggg=="

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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"LHMiniProgramRespository","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    var app = typeof getApp === 'function' && getApp();
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

/***/ 36:
/*!***************************************************!*\
  !*** E:/LHMiniProgramRespository/static/mybg.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAm0AAAEYCAMAAAA50jFjAAAB7FBMVEUAAAAYLoosPYUkN4cxPXEwO2o6SHgpMVAaKGEzRIQbMJEgJToiLmFWhcY6SXlae6sTGTEnMl4hNIxqmc4+WadIb7ppkL0MJp0MKKILJZgOLrEPNLoKG2ENKqYMLKkOLK0RN8R1sPUQO8UJI5MPNr8PL7UOTtIPQssLduQPMrcOSM8RQ9QQQ88QPsgWQdAOVtcJK58OUtQNX9wRNsELceMSPMsKgugNWtgMZt0KfOc3XcAMbOESQNINYt0QStYLeeVvrfMNS9AJiuoROsgMZeARP80QP8kOPL8Mat4Lb+APWtwHkuwGnfAJhukNQ8UMM7EPUNgKOrMSPs4JL6MOM7YRR9MNXdkMX9YMVtENQMIRTNgOSMpBct4Hlu0KN68MaeEJKZoNOrsGpPIJjusNWNULMqwKS8MJM6gLTskPVtsIme8MW9IQUtp5tvgMUcwKRL5kpfJPjucMSsdXl+wJRboKVcsFDCgJQLUpXM0yV70LQLotYtFJh+Rcnu9FguI2bdgxaNQHIJcGH5JCfd8NbuQ6c9s+eN1prPdZj+FOgtscPq4ZOqgGH41jm+kWNKI+cNA4aMkcQbYEtPYpVL5GedUYMZolTbkKInwWUsklWMgTM6gPKZMcQr9wtf0dS8MxXsQmSrAdZNQGE0ErYci4MAfRAAAAF3RSTlMA96fTWXEgovGL9dXZ/T1h973i3tjwpJxcYgwAAGVWSURBVHjavJzbbiNFFEX5GmsUrESxEDFKjDXISHZgpFEkB4SELA28cPmM+QKeeEB8K+dWterW3YQBdl272wZir+xTp7rDR9vLJ6b3l8vhsKm0OxwOl/v7e738SrTf7z9z7V+p4hynRZ8u6Y3ri0I/uL6q9H3o56SvZ/Tu/9DXk/o56fvQV7V++Ep+vC9KvQnxuXxWaB96lfVJ6L3o3nVJOtTaiTYbaVmPjX4q9Gurt0nfTehz72f18Vh/Cm1Ck+h0f5H/UvlPs7LZSU20ncCtpg3gnDTKnBJub6RM8gZuANdD5vV/AU7/FdQxaxm2CjdDTWomTYurZE0arH0mJTgT0qRvYbtkdagZaNpsaEmTmkkb0AZq2saagYwqxWRTOxO03Wdz25XOJhLaLnE9wMofyCuEvf1Ng8Pe3rS4LQEHcui/Ro5/i/Y/16gt+poL1JK518aGt7mpSYepwZoosfbe6kFKA1tgBmeVrUmFto61X78z3kBtQJmOH38npe61ehfzsbeJuZnkZziot1lRbzN3W6aNaIqzLeEWAjeYgzWAmwmpgAAV/wpiUluco0eQBmrSUKAGayJDTTQZRKV7FayNw+gF9dZ2sG/OAuhGyhRtv4av/RSYhYQzLXhbw5t2BXYCmg46CdYYpWPoacPcHLdYuYEboRTaAK50tr/hb6H5gGpfXyF4m/O4D8FO39WFam2tgjNtBFCpyEkrWLPWsVY4295lYZRA2sP2XorVwyHMjSWbC9BGsGFsOqidOXHialJhDcykpiZSc/OSZ3DmkRNxSWg7CG2BW+QJj+FwJArvgzag4neviaV8dvjcPG4I3Hrelh0OxuAO6JbQA7LhCm0hfsLZ2NhgTdSwhszVXlkL0qQuLNmk61jbSRW2Ni1qsCaM1db2NliT5qVRxsyNTKoeO3AfywwTY9oqaCvNzWgL5VD6fjIthTeAY8lrHycK+uANf0Mj4CCuZ27EHcBMXquvLHsZnCEi6Bg1+WGGiWhrbCEWbC5Ik3oPbLFqC1uzRi4qRS0D1qANdZmBdDrgbX0WyorNMTNTs9nAy6ZpK81tu7PlJe4WiQK4sXQDti41rQepOoe4AW8fAhzIDZdzVuik9C4Y15Y04gzQIK21tS4PhTVQC/mH+Yk5G8YWtMEanJEfHLCJx141bPiaNi2u8Xotr868d3PTZr7W5Z+o97Y2lD6qPPjvBLdLyksrqPZk6NBGPK0MjpWcdtH3wC3H1B45JCxI+a/UUQZo/X5HoAZsOFuDmnawJqH0FSs25LkoyaiIZHTnPdYmdZQe1LBBWyCnnKmmdtjc2WKd5oE0Wdu5Zmoukn5jsRLadoFbscV7GW7x4m19bgpwICcTa3EW3NqAOpMzTBEHcl6o/0y8tYqbNWz8BzV5gbYFW/usTQ4iiDpslbEZaM6acWbA4WnZ2sLTdo8HaeAGbYXqOIq1wVorZy1notZID0gQBnqoaavzBDYEnbiduRu7IG2ioGU/2AyhsxIHwV7NW5OgjkMqxMEbyBl01jfM0E8zhSpIS9Aa4WlTOSiuNhdCYU2kXeh9aWzCmiltssWSDeKysUkjP5i2NtRE0TFm1oXIRK2JasTGvEX5A28rzA3YcLcGt/iEPGsa+xsCvCihcUBdvKsFb40KCyrjq8dYG1BxxV7lZYEySOtdrQ+gWsaZQanuJhWsWQDtN9l8wYa7ZV87JF/bZMqin9rUfVtpIogm2jz7jBwh2oKvIbzNsk6TZ6V4m9SUKJyUNojyDCoMv6UtlnYNahwHeHWGuhBSQQ4NqYO1Wn42YIKq5hXMxqD1ntZzhqPhaqM0lLygZA1XIzmIXbbYYdPWLNi8enInPZ4mrdHgpijZKIjhbIGa9eFtEUPPBWSzvD1oC9rC3V4RSgvlTbcTWDlt4CZjBxy0lYw1B03CIBXgFokjVx3LeTGv+/rdb7LnAYhjyfVp4Wh19tmjZv48Zq3yNKkD1t6XMTSEqw1Yi1sHZmoYW3+n6kZdTWqA1rCGjCsfAz3uHARy1kEXzvZ5X+FNadsdDKb0JMhh29OWYqmqgQ1363GTapJhVs2mLzG1Ry409rhp7t79ZhLcUKJxWV+NBWf9Sg3QEGkTvpZyUFjD1z65b2ETyrxmcesgas1au+/hQ9yoKlmTBmumPLOhWrj5xOEiIV3WA7SdYuUWoRRFoqDmhrsJSqzcetwcuEjqva/kIPLpT26KSB0CB3I+ohEsAlvgxuUPwKxfprFQ6wNov9+xD9QgbT+IoSPW2MqVIn3kBWFsONtoQ1fq5KNF2gHbSopN7VDHMoiWrKHK4a47zvK6TQKl7rkZSdJ0y601N9wN3Fra6lxBW6UgzjrOBXGzFgdwDXVgVwPX0/db0jsJhdNoSZ0TgRPOltdqpEXJ1NrEgPuhaAI1hw3SLIAm2DwX3QAa90T75Rpq8gEX4TMpOdrZxyaOEkp7AElMnbbDYXt0ksLcHh/v7u4q3PzRo3toY3MIsf22j7EBLjpU5gx90tDnDdAGbzPR1QH6+besGaC4NOVlaMBZQxoCNZU5/TxrI1/D1mLF5us1r7CGnDVwC8wGyQGUOXGcQGdv6SaozKZ0PZ+T/pKMK8ztZKFUaLu5E7F00/upFW4s3Freeu2Hqh+Mc946h0OTFoeUC6kNKQVtgLWs9A/rMVu2NMRabZiEghrqWcPW6t1c38p12BCcwRq0DZ1NUdMuqV2nKV/atG9dzTuOOIDBkrYdCzc3N6PtBt66p8bHtMW1Zdyac/BmPRqY3IRa6LzTQUQknWfrByYwNo8ZpPWwsak9x5rUQrqVG+ps7cL+mjsb67XuCd1J2sawuVpnQ4ADTN0ZdJa4KTUwu354gDZ/JPyYd3iPFkpvVErbXW9urpK20wne5uSG1ucT/f2uGeCkThEHdSUpZAkEXR8xLx/692qZQG0OtHaxxu9ZA1ujAK1krSaNHTZpytnCPVGpbmhSp1FbaQE2NzXrrJw1fFLq0LnWAa274sSJhLZHNbctD1We9EmQZ/O2AM6Xbul+6fvC3YafWEWXNQ5nbQ/gYjLrciDXU2c9SknpO4iaEXRNYzYfPLWgF6CGyA1K1oihGNsMazeCmhJ2K2jdSBmx5qSFtUWX74Kmp4wmFCxdjy8FYv4qmyltzxul7VDRtnl22nI45fZ8QRTmhr2B27T2HXbkEQEaZYo4qFvWV+/eCWtfF9YXU/hapgzEAK1XAZn1LybtMn4QPFwtfI1dtv5PXGQoQ6hghqmNaMPbAjkU5obOZ8JmMjV0fcbQpApszhs7IN/ePccOh4PkeYLEUiUN3hQ3IfLI0g3FZzW2t2URl7E4BHAVcvNJay/JDKDphXoz0CRmZUYAafOslTnoPZgFa/AWcs5GxlYnB9qMM203E7Ct8LYirMqB5wPhbGfUBsxMWkmfu9n1tdRrpU0kndLmOxxb3wQxcg7bTaLtp8xb/iOFU8uTv8ku4G//QBk3qaN13JLN8RTJh+vNNGej2IkfL7DWbePeFxo4GsaGq7lmHirSL83vUglpqo615o9CYY4tD24ZQNvQ2dZxal0jKKAJbx9fS3swGW03dxuRGFeyp9PpsnVvQxFLt0Zb3FNAGn5FBtwpLpPZx2v+LnKuFjhcbhk70ItIa81LGxo5zSk0aWiI34d50FAXQImg0DZla8FZtFIFawqbC8o62DC2FXenKuWMAF8jNQAu1YMfIoHMUNMi8skfH/1+c2Mp545NkNP91rbcKt4ei1g6oM1x02s4HMo375v3geP8Oo7vc+7Pud7MYPeB+nSs/lGDedImkwLiJ5oKoaoxa+CmoDlq2iEeBgct3A2RfJ4RWx+FucEc3vbw8PQQjFkfctpsUWbmlmg7Eko73NISbZI2c7dppbdk1sa4SZ2yOQNOxjFyUT+ALH8abZqw6AvQ4GzR1NBy/AS0uHUAa5OkaQg11shDa1t7m/9Sb5WLVnQWzmxsNMw7YQ5ve2gFbbc3d5YoHEpzO5CVgtuz56XHfukGbcobwL1ME5EV6HiOidC6JCMv+hkEedGkAnIEZqWlLZhav1qbQw3NrdYe1c4iMwhfG6OmfyeaI+bKRrwtNtnEzYS3SdQesDMHzCeVt83Q9lbM7dnMTTiKW/Nibpk2dOd7vJeUELS0HY8QB29w9/cQHLocaokDvf9SlbOiWUdDHWmJNvnEIa1NQkek4WrcDr1xKWss1qT1qnY8YoipEmZqGCtZg7PW20APY5ugzXFTdzsKRdxPUNpub0vanjWU2tLNwWlpMzltxpszl60u4Ze4y6dbCkdJRc8c28FWkNLxoXR5QRwNMVsKnfFj3qPh3YIxaoDWi2/H4yeO1stZk7YqiTtrzarWaVJjhtYDb3vC254eZml7/fmtcqTutt0KI+QJam63oha3ixEFbiSlx8ul8TeUmWrPMm00n7Oikol9OZcjH4Mf70ERqvQ1ey8yt6MFxgBtShVnohq0++NiVgBqY9Ii+wxnU9LYxB0s15y0Fd7mI6SBWhAWwKHW22wnrfa2hwXaVrexctvollui7Si4BW3wduex9JhY4qEP+USNNsFNFbjZq7TZgQ1OGx++vs2OYO40Bdwyc3tviKTWefKpTKQ2hUSk0X4maC6jBmnWRwhwY5sCraetky9zYC1tq90OUZPUoN9aWxWrs5Y1/Mwn6xI01md+xLBI2++r1a1ypN6WcTudnDbBzZW33Ry3xBsZphxEJL1k2tCpGxJuCOBao5u7xb8gnhLG8kZE8ipczCuCs/0EYtoQpElDHWjb7TgtIIS2pKmvgZpO52Iod0CdM53GBLRsjsa5J8gFWO5uOoG0JdpWbm4K0tEYUtoENw2lb29DZSw1ngIKh81oU9y20rK9HfmYZe5H0s3pVAviFrVAnXVQhfbLWrYyKKtAa3SUT0hJK3nbJs6qACo1b67VpN3VtuYpKDF0IEMNVaBpduC11og1QGN9FrtqL6TtR7t/FbS5UR0SbSjhtjWYwAHa1B71eRKI07MO25Cu/JJjvG6SuReCN4/fhyPGpuEyaL6mhbELoLnArDI16yvQVICGgK1PQtlZY7mmgFkBtAFtZ+Or97aHFiz3uaGe8vjktHksVdqElfC20/Fw2MhPZpS9Tcx59ppiKakmkfRy2IqctYxcHDpLflyz5ooXoWnkXr1My1ztpbxMQ8w60HSJJh2kET9r1PqnO543lamZOsq0u51MDWrlXY9zgmyMm1CGkXXe1lM1Jg3KnrSHtkgUxLaEEyconnIL2jC3Hz2Wbg2mFExPRNKDi4haynaGAUtrqHo9WELcSzJXBEIv08LOWS8wQ0dPB1w1aCl8lpq74Y6p9bSNkwIZsqlRBDeHzMqEtbmrneErWtz/RMynFJTFYLSFuTltHks9lEZWKlelEUs3htuFtVsZSSNAXCSaXga0TZyVf5qHYC4vmFwH3X+jT2YhOwVmA9YsWRp6mmmUeULa8/Msa8iizsjUBr5migjqsgPX9fnqrHUtOSg7tr23CTIv01MBXEXb3R20iaBNZH3EUnM31m4mo01xK351BaKjyhmSsw6UOxlU5SfvbYw3WefmN2IO/bfgTUDWqLEzLG1MWuNqNWnPDWlw1pEmrA1tzVHrfE1FcqAldHV9pf15LaxhbOuhtw14Ws/CRoE20lJfuYW5bSyU2nXv89Jtqypxgza5EP52UCSt8TkLcDEN/HSK+E6OqE1apVvGDuFTL0BqGjF0X3LmqPmOI6TxE2VPa/duQe1ZWAvEnLMZ1IQ0YIt5+JmMpAMxmPJKzWfO2/XVtfSKmvWOWu9t0o2xWq//NmxG29XV1etVNi1ok/sJiTakuPnr3KZa2rYhAwwBFuBJp8XIQ5GpBXEI8OhOk4obtGD4Yp1mBGRghlmDWU1a/6A3oLmrCVyFo3lFbHnUrnYrfMHabbWLa57mtIWlZeFt4W4fr+FMCqN0xtuAtPUMaSLpAjWR06a4jVZudmv+5qalzfPXBENrbvEL7LBYOZiGEHK6PKktdUer2nXIxaYKe8b/ue5bARgakrZDDW3l/ykG1uCskaZsk+s0xYoQapyFvTlZ4W7IvW19DtS0rCvmRDIabS+0taewNgRtmFtFm5vbqsUtm1tsWZxcMhMo+GhbjOKEXIBIrvEubb3yF1unrmkvT6oeAoIGug+HawqwNI6XZ8rZDtCavbR2oWaAITAbhU9oAzu2N3i4wy3NBGNX2sTKdOKMGUvaK2eKG+bmF2SwyctDqHUj2kSrhNv2UNC2TaH09eoMbx5Ld4GbqoqkQ94gLWBzwOJM/MqrLN4k+HBA4q+73WDLJHg76QlhPxsfalhi9eV8KrVziCFAqxae9U+6a9RwZus00Z162jJrthM1oq0wsxRDU07QsRZa+8MdSlQ4GXu5MLZ+CNbA6m/G0Bg6Zdpepz03zE3Z2YS5nSt747aqyGxFvjNo819jiANABF4cq/LGU363tLEiBYE94GM0Ck+pagnphcoL9dXc+kCj3ZogHzU+jTbWtaTZ5u2j/WX4LGiwhgy5BB2mZsPKCzLW3NEi7zQ5XdUyTdiTq9dnO9FoANvTJG2xVBvQZs/url4bbcTSoC3ulf4otLm7SQvafvRYCm+xt+vfPeDAHPYlnY+1yhM+rZgtuTtGqWXULQkzZAU4FGHbUNa+dlggKzRYniFxMmYCVx8+l1mDOLY5rMPTKswcMpWOhlsCzGjLm2s5G1ikTU98+WV58qmB7csvvyzCZ0XbtwLT1TqFUsUNcxPaanN73cZSVm/+vUUkBRr+NwKib2QSJ5jVeraKoBZVjI3ZO8Jec2gD4qw04+uS0EUJLOmxMlSaWIytnq2z0CnxA85e5Glha7ajxjbHd9rl1PN1FGMrC/QsYnqP1NqkzIGGzNa+XOc0QA5k4oeOmjTtewltAtOV4CYg3WRzO4a5bT2UBmjQdvujvzCCmKLW0wZykybWk6bfiKp7T81bC90O6mAP02MefdBVXz+EmNvAuRYxVmcWLfn/32oDs+csCHupp71Fq9i/JX6i13JwlqK0gZqh5ziFPGCeE14x5gXbmDXO4mmGnl8NzJ5QmkPbX7Sd28rTQBSFfRYvWikVUbRVpEo8/PijiAh2CuKN5sqCdz6Id174sK59mjUZp0ljdWVOmab1kM+190yqHgFTl9cJd8rMDfgAHA+lHZswN8dN5LQxklJpCFQdWUiWg0bx6rhih2MQrgZLD+voeQEeIWzQV74+LpCFRiujpVe0LZW/pAZoI8tPlFp0NajK0TCyTAcVKm1NwieK2Fr5/W5aWa33KHoUjBldPg+IYtU5ePZuhDWMTU5Jm5hbuSx13BAfYW7bO2FuXdc1Y2mZAcUyoSFnC5311pCtuCnacppvHn7qQ0yQupFFxaWif9HGmISeoAwVB9aditksS2uBtkAROWiqGEBqaNaKSJovDTAqng4wd9O+Zg21molzZGsGUmzX2sgpQyVqDdhK2nxZGk9LHbe85dbpUkLksdT3gl2Cm5EWoXRPsqKepW2+O3upVIJN7tBA1lF+8xtq7h435MA2PkOJitEYYc6Xb2ug3mtjNmdBsIhqoqnpmVHWSbUT2UsbCgHUlgbmZtzj4E5bzZVXHn76ssESgQrpWArlZ6Stq8zthdImu7W+5aa0KW+CXKxL9Tc/cJNC2Aae1SZNgYqxtSe0L+Q2l07edBLYpudPr4o0X7LVh+hD41lm/KJo1KKtPX6aAG2as4wZKjkLxajzCuFRQcmaPvX0hUGIqDFLo4wrQHXC20hQCzbqdNr2ALRtNXFbB22S/6u52dcjJZTaFVmgjZtuDKaRAcUqYcS+IDoYO9QJ7UslA4/Ocon2D58+k39D8Nnm/hTHRG2Yluk+bVuK2YwkTZafQlvGypcDnbkZd6T8pLI0BU0bsqXiuKmgrfY2cjRJG6WzGbTwtr432ta259ZH5qaRNMxNXJqyKx231trP7obDkQrOrJxUnwd9fy51SX+Ay3Dbp/uvv34Ca/Lvz2xe7Ru7F6FirKMtxGdPF6do79TUFlIo2toHRk9oZbVCLUwNPVmbFKGS3nM0jGMemkKtTduDB1JRgjbsgThuoA23Oek6IWjTVamZG1V8R6la+0XeBpGMOEnSZZK0p+5wlrBNaD+ucQKZbz1981VZ26gen3RlFKmQd6chC9D6c0mjFpXoZdGsbDIAK1ijjUE8qU0uE1bThla7GBWpf2t3Y4AXFbQZZhBpU5bWyz+WpZCwk7Y9Q2npbr2mbsh6uLMwSNya5hUo9S3QeIt6abezJCD8nbZP38DYgJr9BazN5iEzSsg/fY7GMLtroKFOIQZ1jJnhbOZnMgrOGEBFKxy6IqAsaRsTIStFnpjuk7YAKlTTBsQcM7ROm7EE2pZqbmAIEdKXmZa52dOrmja51N0tDbe3kIert5GoqcjpdFEx0Vvd9tB2vhwWrXGe5zh++PVNwOb/rxImZ6v4ufdNyqJOmxlZe1Jw1klddauGFDHoAzqKqJ2GLPcZMKtsgjMrUPRBGjrvBb6gLTxN+xxJcSeNNsetF8tK8USK5rayaJvl69K9mBsulqJiJCVNzMa87fWeYACSMlxS2VGDG7iVimME37nqN29kebABa6anm8fbs2U/p1EzM2k/zRnjpu6hEbMqbHLxiQacSTlLlo2FKicjWfSzGKH4i6rMWuFv8SEPmgJtSRM39balm1tvmZsJ1pUESMXt43opxyCWJnib44arIeDntKWhIykzWxJExjBq3qU/qOPbSd8YSOfgkj69eY2UzcKofKMc3Zaav5eRByNaNEFj3OR5x7VABZoUVBHaeasBWW4y62rm/mZf+QpP4zJoRMxaWwt44NSBHBVtvdLWrZbQynFLKeOGPofSNfRRj9LcErzMYynekjDe7fABmu/0KLzrzpR0PuDMeBbdMjvI30nTs24Ss37AzjWyNlgbcLsV5vZoFx8rV7u2hdGO0jahxWkxbhbUnQqdqnmoLYEaNThpLjPNr4QnvG7gCVaU0uW9VzQNkbY7QZub27GkTc3teLBQulyrPkpI1bBruO0AmdlbepWudwm0WeImtKm2cq/QtcnCHIiavmG8pk0fQQg+cBBGXi0U5amnTttT0rZ5iE8IMX+8ADJiNsVaFwP03QnWrJ0nrjUbImhUDUs9YzlZi7xp2tY0tzt9AkKQeVsCbsztloANRYOp+SCE+JniWWXaXSddJiTS5iyoGsuzuFnWTSvYHKGvoIWg2Gk0PnEXtH3Bv8yrtN2/D9aUNmgCLlTqItKYpqGL4EkxVaPmwLZcV5BZGl9MtFl7WR6MmrNF2g49BJRgbldmbsDNM7dI/hlKFUm0qDl1S8GbeNq1gafexiBUwkbchJp/pgZ7oygW2Ki3PXtG2p6CturDhqSfx9e0mzlZWqWDvCdUF2Cmt6t2sWlja4N19VIKdDFth4WG0qvYBblry9JQ2oE2uyS0hoAbaRPQrr117Ye0xYLgcLefZQizkIMKLPy0mcNz4hpbu/jfrHwDxGi7h7fzDTMszJvFlBwr7diCstLU2gnbDFnwpLO15ZSVpKFcDQpBu5w2T9yAm2b/ylB42w64pdgmoT6uzdwOgZv91ZZkh6j2NpNRcdILeLIYmoPOUTy9WOkNQunrjJv+w21z/kCgokwiBpo6fmkDh89oZ1pN6Cw3Q82wyTFLD/6jnv+68b3vM0pXV8UWL3DThwRoQc82aLuivcW1yWXf3NFhi7aIQbmnSJj2DX1jJ/qntB2eIZS+1v1de5bwdHN/4sMdLW04GJOBFRXAmcYZm78SqJaeSyVoBms0s39obPS2n8djOmqcBEqCmz+c7xFKzd6SmNveNngBGS5y2jJu2FhzwdtCe217ldvZ4dC8c2FovHPEavp2Xg7d4tXnN6/xVB646T/KC9r2TcJwhJudJXqZVip2axcrzE5FzD+R+zh0M7cz7SBP1qI+mACsWhf8Lz1//vyBeht0OFji5ripY7m5Ycc2DULpFRTA4TcMEEncpXY4Qr2r5qzkBF2LoaJ0p4j7hlLPxATj8TRum8/638rryhRl8wpzl4lfDlK0TJGagbBzLG2lx/R60yETOWc4BTkQ8CFMVzGQGmPzsytiUa1EUd5zx6MN0gkVr1oHbztk2oDbbacN6dgxqbnJhhsSsn3SVel6HeaGyu1gxEwnbWhtjloPVxvgBiT0IB4j6lQDDlka8TY+makUWp4QRvaHZ8BNv3P0RYi7dfhbwDp6GTGDuKkxIZrX6qzIudQGkr4l7nWANhuTJJ29fftKafvD227fPs+1ztVNeNvheMSeW9B2W3dBnDbbQnOz6g8MpSLiZmmefNUsdM97C6MBmjAXawHSYYMSIK2ZMHMEqLp5JzXblvCOw+YNgikk3zu6no/ZBzT5rFAjL5vyM0ZKxsaGJGK+VNDWL/WikzESmxfeW0uatAFsqHpGe2tjdQlw4W1HKPZA8OO6uR1srXm9Q8E6ATrmaAsHVKGzbZAD3G2fA+meiwTlrUh6uHgbGo07g6fSWRzX95EruabZzefl1bM38DbA9jR1Z+EVlUvLhhZnoiZPA5crOZw1rPlxZNmsDLwTuqxCaHX4AO2YMkZGHe6kt7chx42W9nwKOIuQM9ztB2hT3HwPREgXvwraEEt34A09ZLTpRTS3dbnHuyvC6HZIW+06tLYAZ4GD4tjcoX0vqQGTpILiaXNmtUjX2AB5teVcDRerqeLf6ZqlNTBbouETaJyDpaHshWUGrbSyGChtNV0GE3CigigxDYMMte1knnuhQTWk6petnUUbcEPjtN1Uc+sWmE2K2zXWmShQhNLbobcAztnkJq/pCNxkTp+Lib41fKdrqt5+ir48O/GWkU8N6+QFAblNZk4wHMClF3g9IWJ2PmzAR1iDCNr6T9DslQirQKqkC0UU4a+UUGag/UGbMQbY8nkjMrIMaTPgnEJqPm2L7jexZtIqNRBF4R/iRgsxIAYREVeCIqRd1Uqwm1oJIoL4nBAEx5U79y7c+E89d8qpDJ0YbfVUakxe+zQf596qtjTdxNyA2oN7xtCjOANuoYRqEdVoeyqEUZjB2mI/ih9U1s5q0NCs6Im+vIJ6RP6K10TroZES6jmQdAF1XbbF3KCCoh7WY0ZvaypFesZbARq9zNIZJltBmnga1da6wZi5YGnOlleb1MxtFfM2xc1pa9o0NDf/oh3QQfKM0hbC3wTziKXEzYY3UYW2q9f2nz7tx1FtXvVLQXMHDVp05RhtHPHV3zmlLs9ON/GFCidDRESFDDa6ltTSM2Z94xziqkFTL1OzEs6QzaCCs97OtB2RJv5Vl8Wk/+42nrZ7m2ZusU1IKeWm3Alziy/a1d2A5GUhktLkrTDwokFFkU6dTUH+eOHZhx+O25m5izbU4rsqjp8MuforlkcQA0NfVmz0ng5qjKzVRWt+V0UucMMTDUIm3GmkRKml+ZmPmaapwJMNLGX2hnlZN5GQ5rckdip0jtSUsgAtwmdqZ0oiOr/nbZf2EJBApANtOYm5ETe4mv2vjtiVliZLHCVveFhj6dNHzhrkyAE1DdI/bl+48Oy24lZTtkhbYcEZpzTFVtEXm9Zlk+5sWN+gwhJ5/WWDy6ceF4kQB8SMi/PqrF3lzFFzU0CPi2h5Q038TOAaCSt/6G2gzaTmprT5Ee9eaeOmFNoTNzxm1Km5xdP0NkicDZsEWNuzC8DtxY8nAtqTUVyavrNIo/vrCqb6lmKEvsgtq/rQTPlTFQ6WAUOiO3caW/x8Xy4iNAyYMT0KFtUCsbixrHYs9bYWrBAuImdzKqUbYmxQOyxy8w+97RVsSeUkJchjKU5jdZspm9IJbUpcBNMi5sZY6sipucku4YPQhmC6B17B23irOTWI/rIDKJUQ52kNH23U+tzu2IYNzpPI0TRkT1W0suin8+jfaonS2Bji+Zh0VBlito6a2Ji2WP8lzKbI3VWAWjExX4BuYK1O1gwsu+oiMTT9ed72CqA4bAPaLhMgS9silN4puXPynf/cNHc8lipjUUyPNJAqbu+LsfZECpOn6v2jQRWngKy5otnNnPzw3WDAwEagjriG90lHr/Q7nEQZgcjAGJ19SR5wMZX3GImG/DEnoyqbQ7emONMMwJoFyhYFUkSt1VDL6IjWesz9qmXAncDbHks21dNWQNv58wIQwAjcuClFEuY711rZ4Nzz23llLXDb/7gQ+lSqg4079V6zlILwDZsqKsGniWBTLJvuGtRAr4wP2+1N8ltGUaPkCB/oeTHro71hofFVWqQ0/ommpvewxpbVtRyj6AqKz31idYWvDhekvS3EdNnOjuHGNYmBvUFJS55azLFoOLqxTWPoMZEjzsc6zwpvy0qV6kx8KwE3VKGN7uZpG/jpaTvgoR1a6XMVS83f0EBwO/nYLxpINXXbC2uMmrUqdDieKHszXR6+XZeFPBlIY/QVI9EQxEDXIvFCq2roYATahgWVPcW1nq+yHiKJmsonaFbURr+i2saEO+vUyIihtSYOFxCb0KYmZUNjDNdEoE1cibQhlJ6/fj0lmhtZU9r2d4rH28PU3HCUIs+TNv1YbBICt5evLI6StkpNFKjUJHWD95KtwYVqpRsyx9kGmWnFLjJ2lVSpYGbPEhbLmyPZL85f1yNjM0j+rduamaU5yCiZGVoxaXtqpFLrxJG2WudFdhsDm+skCpbuJtBWnpxdGm4Trl9HLA1zo7d5KD2zh3a4pJi5CZyOm5+yGW2K20vQFvoM3CAiZsjRziqqvEgTc2ds1iI6e9QRjAVnhKBMygIfs/fpbb+szAFJi9YqmgXEHDQfj8EaEyc0sUAeRg2znra0QcvInVfpyGXLcUMuyGjbuyJxo7nhVu9WemDLnat9pJtcznhaHt47bUFaRZvtS7EvKDVsQhtfXUYlZgw8gVrOHeZEj9amc/YzC+t+t0hfsLqq3LETac/hKN1fj5qkbSrlhsypNiBzEtrOV4KLHRe87dAUeJvLQul1mFvg1tN2y+MjacNTJt/FFuAmj4f2odeVtz37IqxR9fmmo9Yx7mRc2fwq1A7zG5/FvMs+zGO4YjFHGZOUF/KrjRE6o0TX6aDtRsI6oWtF3k/VLSVlqBxqf1KdZ09phgbifDKv8S3ztu8MpWcSJTNIIm1nipuixlD6RB46D9pETlvLWDqhDcdt1Itvpc7YektxPIiDT4Q3vIjcRukMOlOAlzMhQclkUZbY5oEFESv+mUtQdeM5P4oW3C9O8/2tBxidV6rGymf0tJPJM6/ooH7JA6S0mwXadqANpiQKkMTckI/lwo0CdMtiaZib4LbTomzi8Vzsc2rUdP6CtMmhW0PY6iiqXPFdG0EePV0tMZsq25WNQL3m1bBFF8NwP3JGO/RR1w6QDkZl2KKGMjeNSyJHW5T62EnKTqghYSEO7T5XttPWgJI4Azl78iofANDF3S7l/CrMzVir9wlmbjsr569bLH1iKeCEtgu1br9tYm8ANa8KY5nUTq9agChS43SMtg4P2b34IWoGt3mR0sAcbYtivsjoJ5NYQTufgfEPtlUut1vEA1o62l+jbcoWV04g0JY0Yp5VtB12Fy9eFNoEH7kD2ngGQnMTC1TkEE6J20QPjDaaWx55G3ehqOpw2cMm8YlRspPJbeoMOuI3E6e4ZI3dGkLIlpZo+HR8eqL2tDp16CRqf02k7WHKpZA2S9xA2/Wdxkbg9obbUgRS87bstClr0HndxfYu+XRA2+0LQ3P7lgv0qmRnzC4m1nkgI2/tn5dv4hSa4hg8rf3gZL5VaTSJ87HWep+JTkPb+X8BG2kDVa+CtjhMu/5QzA03wtzobgISHFBoA2NU4i52qLP4mpTb0ufCWsPs3gDzRmctCySeZspHrkM6rvbkSmOR8z9iKw4zqNacvJr9vnP9P1OraSNUQtsrhNJ0/eI5ZG7wNuwgzNzobfJd6RN5CNkdtLtoDid/GTW3ddq+wtkUqx4wuhglGLUqDNtFpg7tUQzzMQJneEx/jiCHG0L+um2j3v0zLzvP/j9wRtrMw86gN2eSuDltbm5llLnZBsA2E7uLlMfSgucHqJG2Su/c0QibxcuDS6f+fQuF8QaeiOJRL6xn1IaAPAB1SIiX+c9NK6hNeduWfSUUn2FOX4slXfuHIm33L8LcinvbG6cNHBltuFNnbmjN3O4UeYq4PUSet0tMAakZ2p59zKXhoa2RJp2ihtbeP8aJMB2iQRsXcUKLQp4I2Xx+09aIHUd3GbXR3NpRGUxCJIjNCkNaV+VsBVDGFntGVH8oWo7+jkjbOaXtiXgbYEPiZrYFd0spCz5PwtxQ0XCfoLRRu91BzLCmDWY5R9uLV8oZUzQS58gBBXZJsds5WgcZxjggjDdGCtuDT+fMDWstIVuwwkUpN4QyloI7HyQd+viXRAKDD8cHLaEifgYKOaO9+RKdzB7+9yJtlrmdQXvUJ0962uRGURD3xE1powWeq2kDFjwrnnob9ZapWkXa5O0eIEdLcduZMLRG1wwvdCgkknwGf8SR2IaLRglu+dxhoYwCvZYVHfgbLyvwmqiGi6RNYZKR1f6zrv8yZ2n20eunoO0nd+fWIkcRhmF/xzS6CttgXQ/kNpqbVqI7DDToIBE6kiEgY28MCzJRExDFA57wJop44x/1O/ZbU1W9PZvZXVff7uk6dq/rPnm/+qpXU1meoHqoHHVKG43QENLSj/nQt1dCWwfYum7e4I0Clm2gLcpKjbYVgeaoWSYQQwDMGC2RopZLBnSuXLSysrbi4U2pxfSBTKCK56DUbhwrNMek2CsJF9v0EkbkB9/El4EHoyvlxO7xaj6a2eC1hFLQ1q3E3OBtZG5dRf28pKMR4IZQmucJlcdSmg7Wit62eQTaTORjll7CfPBjFiPDH/lmbmpyxeBIVS+oAESvgtP48PkJZxeQuU+TecU5N9B0mswXLuTO9NLQaSVJmujkPiqcN2B7EyS0HVsohbcJbTzAoZHczWj7OAulzBgkicKweycXpu21TKcfaPi0K/Bwu0m9jbmSP9Dw+oa3+yBqUx+kuCQGFFuUy0egwSyj2wZCGnNKL/mCxyBsEWRsR3zShw94lHTAZViNHyCMpuIWXHjM5sgEquuJG/3LRcBdu+Zpy2mrOqbtTcftU3atjnGTJV0cS502C6WrOVkaaYiljb/vItQQSUEZ3pWu1NtS4efuwbNRQxPaPIYQVQQXndGRfIsKnv97BswgyA8ZESxpondQDcmIBzhBBIt2k8zEMkt9RViiGnxqHtNA4xgSY4LUt0BVekkmUNV6hoqPUnFxSOZXSttCoSJGBtpgbrZyk+CouIn0pQPPYtpcHalpLCoLamesEm2bp0JbjlsUNBvI3csOIYnxJsbobOQz19+Bstl0se8Rf9jVQfI1SsMTV/qjxA1uSo0MOGeNPlK+lDkToSPnIBmY02Pn3tTHNQN+bndWNj7NvArexkdqb/EEq3rhFT5vSPCElLagtBFROW1VkiiYsHADbDpd5gtuZ8TbOG1froBapNEkwAGTIhHjZoe0efLchKF0neOlekBiRDgwIAgzVfpAriCWvyoXO5REmapFYzQMj3SU+QMmsfz3DwCaw+jMGXX+3L4TK+B9NHLjxLQpVIRUsnBLzO0swo1AEtoy3NTcjM4zwo0eWKLtceJsvr/WnKO5vSVLaeu0yLppuvHJtfmxsWeI2I8TRiEjsD01LWeq0dMPIS4/bD5V9C7cbw8R+aOMR75gFiIaFAUmm42bWAq3GfkxWvtoYvLl0wZzK9CWmdt7ThumQfJ6dWWrQDE2EnLSeH839bbx7Q3jhXGjS8bUvuoKdbXNOXdoOFZmELKPrbSAbcd8aKJLO4CdPssQisBRdwRFPgCfRCduS+qI34KL1h07lnM4yhhq16c508a47dImmxtVZm5JKLWdElKgw9Qxbvp6lXnj54E26I3nK6ENxDFnRdo6vXRdJ3TQRTOSPQGbViOH4EG8OFk+6GDB0HQSmshTlC04WCaEW2FGTlguOLug9IEi4Bbz7QKD6LlGfU+0wdyctg/gWsCNzc29DW/mO8WNeGPZDUAXtCWipHRADbTN2WQS4jj1ELy6GCO0LkcKsXpUDCEb2TEk4+KGcxaVu3fNTTRTijIczhXILNrZ2CBw3lcTqeM1RtJ2NJSCNsEtXrlRNQ6lIbROG4LvQFsBts0z0Ia9j+OTZ19+9XyeBFGmDWzphkvF564qGkp63N9Qyr2d1CbAU7tTtJrhuLAYOTlUqKB2gPBgQLy/sOgDkEhQLtURQVsb+H1CThtwozUWYungbbG5mbe1eoO9gjiPtq89KQVsx6unp5vN5vSvzt0NIbQCMxD4A29ekYIUT8MIYEzVpbV8/BBXBXUqLcHffiwej3UdT8A1fGmdi0wDwM1zlmSic3nguq2u27Yl2gQ3o80xaoOZG2Kp05aYm0VT2CG/8BqPpJuvUtqa7vnjzUZ2R7r5wJqoyX/CZm+RpGnASVE5flUJMPQcoAO4m/j6zELUghTQAVZvSP8okmjpLbG0c1RjjoYmYJ3U90xbHYI4GGgzjFqmjUHEFq+ylmWlIVq58UKLbziXts8ljkJN9+yNjb3WWnVIDXaVeZqcegF7ZmsOJBUu6dSaNSH02o3jeHRqcQepuiD5gAagATt00cWmAbSUtMmvY7yDuNge7XTCEJAzW/RhRNKjeqa4DX5EF6etCgVzg7d5KOWJJmy68fxx2h6BNgXrGzI20+/duar2EfjbCZ/GnoOIEOwFnc5pkYUDbPIwJ0XQ3XemS+vahX8MlPjOoTS+oyNVuulnLVK+9uNIymrN3EhKm2DEELUtwYOVG3Azc2vY3AKUrdzKtD122BqmrVt9vsHY37SOL1HmxwE69kKpSsOwlphqc0Fm5RUbnUAoGatMac+FwSNdCNLC7G5wcvsOJx/hgdyu1p1pPJWmddtMVBMiYkcsDqWWJhBsrZnbGmkpx9IzoU3MTSIphLT0PNrWJ5GzrR5t4ny1AmzHVH0RwkJDf2DSToCGFpoOIIiD25F2w3LKsF/sISlN3pOgBsSr8SiLzgNkTKEpZxfn91rHAaWgwym9QOg1GtOlptF2RM5GuAWyMMeNIeJQ6rRVEhnd3Jg0f50Qm1sdTG0US0dp+wIvE5ru5PFm55V9TJv7ycVYW711l/6atNvrKaODwEUZUdwBTjGEEdhhAiUQi8jDY2Mavcc6rcfKaeymv9mdtavTBZPbl+s4yAJFmCHIlD6mbVYzb2RJJdraFuam9JydDd4W5wmhronMmqdrpmCxFLSNvroCbAXaqhdRWH90//4779y/f+8svGi0BWWQh9sijOjHOJqwj4zpMm0gk4dxj7G4s8yEYhjzfwR0jaAH3C5ipPPRFlATff/SHzMSuRtWbkybUxTaOrDtATeOpe8zb0YbPJB4o8l1G+w9v8Nbpu2509ac/AjYItpefI0WmjvE2r1775C9rcMLopZRNr4GnNL004BG8lQEPbAFbsBh/rQEwqJNl//o6MhFgMv5QkNOM0CmTdUmoVST0mD7I0Kb/yoRocaweShddTSRVeupsVRx42edT1vTw9nyddtecGUd790n1u6S7r1zuzpACJKg5JK0kyAkxokCkzMWYVglf4Uh8iUhC7xhcgIeZsIvoRe1PdC2kB1epg3e1rVBcNN12Arm5knpYG7MGtS2w75JShv+N24row3/V17QBtImOAsFVd2td4i1j0h3793pQ3XDBUrGcxrUUKTY5KTkhgaSQXUM8OSm0rmaGIa3wdyMNk42xdwUN6UNvydJJ4lo04kJbVFeOkqb/oJb9xSwYQdkkrYA2HI1d+7evXPnzrv0ufvRuq5upo5RwJvSI0cOfII9+mAaqjYxxw/3IO9O6cSRs/ui2qGtZdpM68GzZjPyKmZHeBNz48SUswTPSi2U0vJPElyOvZqX8rZJmbY3NJI2zwuDv1ddNYEbXl/kqpt379559xaLgFtrrqxoKqJVQW31b+p4eiifMz2AK9BK+YTK+XXGLJRzt7+3LYipVb9OaVsoiEQbYimRJjnpTiitw8zVksTcGLfxSLoiPdoUaGsJtFHaQEwYUXv7o1u3bovevd3UATLkyro5Ife44EpAZ/re/V+1gMm01Aqmlt0T2MlnX29DKAVuGiEVRI+la6WNlNLGiS3IVdwEz49HI+mqebIp2N5f1flSjxpXfXaHYHv9dfqbu2+9R/CFMRm2AbSFmwhfpLDPjBBytvIG6ijy9KGcvk6b6zhtQKTpT9Ysoa3vm64tmxuz5rQRbuptoI2Db7BtuvXJObRh8yMe+nNiucbSom3LFL196/brb5Nuv92ESUVPbgG0dkLevNlIBjoPfqeHVeT0bFgiukq75SXaut5C6Zq9jWhbEm021DV9v1q5uQlwzBvRBhMEbfUQS0+ej9LWPANs0I9dYS1FzwdmgI33lA05qmLl9tZthu31t3p0Jmp3icM1dk5AVx4C/JeoEFC7MGxBLgds9CT9Saqwd6TO2qAtCqVGm3tb1y4WQqKMEW7sfQ8fng2iNGHNobR13PAwf6PwfGy/rT/5YlN6hdo5Z61oqIbKOSHGVLUoyFUbNEzt6hP+e+DOOuoU/FQJbJcjPAtsHmR+u1iD7ivhDQr7gwnuht0bVOIySUtAmyK17SlUWig1zwJtDXlbT+a2Jtred9rEBT17jdX6Yq/sbev+pH+CNrT5FoSlCiytArdFvatWuauqABZNzh2kbz+uQo5O+rMPk5BNC09JUbvi8L779mz85Uuhx2g7inDrhCYRL+KHhdsC5nZyoub2sVob4SYxl+eluPE9oC17Ky8JaT70XQtN0KaqD1GCa6Dz0pVlON5IVB/wbFGAt12NQjnNgN+NQme0EWxHR0fC3EKz0rVKIXJzo7Fuq7itydyAG9HWK22GG9gVQwRtyX++rAP50M9tRcfeIlgO1KzYe9nExcEWivDmsj6I6QDirkQhe3oYXc2hA3GWaTMJbkvPSokhTRMEIsRS0s7KzV6q2gqPwc1wK9O27vunmyJtT2ZK29LOCS3a+opVZGD/8OsMAWFpyMcf758aw5nq/bmurlIhxk6sevp9MLwNIgfrelq5GW0nfdMsxbOQljpuZ644lDpt/LHwu+y6Im2P+lUvgTTX77MqRyquL+iEQNu1qaWzZd5a/ZwrYwzsys1YR2JcmhgAlaCvvgh6l+1xwY7kBHPjzgbaIi0WS4qWQpskpVuizRdk7Zi5ydSthlL3Noe3bcdoo/XcqVTzzd1WtKyWReAUtXo4Zma+E6pZqF2CGLRc2ssXhjLwCYxQ1Wu65rTQugudFTGSoO1azS4Ar4w4L1CFirS9QnzIlpupJ9xsx83NbduziK84lMpMS19lBehi4+mWf5Vo+3K1elaEbXP666Loa2ib6loKADVNW9Zx/XLKAoDKFEZb2U2BZDMAo5wjMXg8I55Mm0N2AXQoMD5KG8ytaxLa6AeqjkXGJ7hJrI3Njad6nsCWprzJLUxKkbav+tVX5WXbj8sMtYUhRtca2Qj72oGqa/6kBCYo7qJ5OZguYpgmFPYfd/BgquNBNyMrFN/fBSszb9OK41YaC1O0SZ7Qx7R1/IOWMUlLuyGWGmugzUIpo0mHcjdK29c9fj882W5bADWU8nAGv21nl68YuSHc5taYs3kpNhkOmRymJnsRJ8F5pOWLIgKDAm5oJKgBMZCKoWna2i6iTZJSp83MzXB7iEgqc5EniKQQc1sUaXu6xbIt2W6buZ2BOsTP2YJxuHzV4/xNC+DV167wInPCWOrrLIXxQBtS9Kp8uVa2tkC0vRJL8wRlTRES3CzMKm5bpQ248d6cggnakOWCtlhPtp9xUdpumyH3NNn6zCPo7D+hKAJfO4XIRaYnohYrfS8Bo0sygtjZQKuURW+LYGOkloO59YO5cQohoXRpsRS4PSQNtLV70/bZ9utNmbZfZsyZISas2brtMM7Eaq9TSUD2EgxeN4WTqYeq9gtDg7gqVfvwCNwtjqEg0onzqVkkVdoWcSjd7tBmuG232AVBmtDLEi+hjQkp0fbG8/7LEdp+mylhJq/8RxxtD4ExqV4DceGCEZhp80KJ24m0bl4YqryFOXnaETLafMttoG2rbxNoUFd1S4mlW5ibpAkkTl+XssRTj8QLir/KL+WRJCTbbW5sSz5V9f+WtutaDU7zFbcwGVYXAwe0UDeZnelhY37HDy/9BDYEkxmF0m1MWycMIZbGKzc6PE9ARqFz/YGzowJtm9P1+rRM2+lW7QygqS4QM2c3XfX+TCZt6HrjcBAVlncphUwaTA7jmiUwbS5ZwT1YLIg2zxLMsdyymAKJpTA30CY7wTrTaKMqnSXaHvdISdPtNlmnKW8PqKCrlLb0ok8qdPL4fxG/AzxydyPmagFEfJVq4aVFUZXzxt6WKAqlPeO2RIC0lRtJZzBt9AFtssYDvQrcb8XXpL+/UabtWyzVIEFutjhaDKwdpXKo8K6Wr2n/0f+Kw5oUe+U1viwBfPuqkkj68iBjBKGUYfPlmAypuTFvam6CGhZunXMZq0jb59snVBS32x6wsS0HU4OEsAVoKwl8CW/aYvkNhqI/A9z959GbjNx1WZdAZWh9pcflqEAbiHsAc+uxcBPcaNBx226NNqQJwG2Ht5eJts0mYeqb7bPNyHYb06a4gTjztdjbpgSDk6rbH950qMYZy7/K/wLHuigduSRDDHrNVIG2CLcPfcutJ4E2EYNAgrn5jhtoM9hA2+b02293c4LNs9HttieIpA/4aI87hk10RAdAGUL1NHeowcWUuwE/vljd7/kfM0dYjZGVonnAenDM2yDPEyRJQJoA2nJzI+EdPukfbs6nt20jiOL9FmJsLN24vfRgg0CQi6CDbzkKino0iObAqBchDqpCsVq0KYoUdgLHNuwGcVq0BfxFO5zh8C13l5YUSbTsR4pcUrSjID+8+bOrxBVF/z48OzxsH+/ZeL169kcNbVdMW0+Be7bb2X26mW3RMI/jW6XQaUGeOKcAlq4jAFD6EiCB3b0k70buqggCvPmLYqKtbxxxncC4gba0m2WxZ27PkbmJE2qO59B2dNhutw9PT4ZWc/eZNHd9/WPVBeRsBBvp0UYmpE2hTU58WJ4QjjdQedxT8HziLNbCd/RS53puSAhBGxRnxBPRJrCptyltWQW373P9+PxH7c7xs5lD2yXRRri1j4Zo7k5+DtNGq9t6vAlu2x2ijbRNfxEHN3DmeduSYQuBZVcb95A6lgceZAVasMeDwPot2kFb0Nxs2sTcYsXNzdyec5lA8kKpMZy3nbULHZXfuHoxeVm3ug3WRjH1qcDW2d3e2BLcfNXShqtVimm7r143JdSWDIb6fQBzJtqkJp2AtiKtSwU3KVxz2OgA2mBu/LxNm7rb8GUtbT+k4m1SJHzdIW8TPcq2NjJCp4Qr4G1KloxV9hNBLZHGew2e42rzZG9KWxKRTEVclcLckLgZxS3t5RJzI1k9ECuUGlF00YaOinXik1ENbcdd29u2c1srtEm0MRuCXBbPqtun7d5xR4QRY7xDs9AWeYK5wdsc2mx3o1Cab3ZVKiWFwmvTdsjuNnxTS9tlV5wtY94ed3ahb2LbtuhM2+frVmiD7k1jBeHS00y0qbmNLG8DbrETS8XdKvNcQptxaUMwHb5+MapZJ34Kb5OKtFRnZ8OFJV6OttZCG6w7S13F9vhoVxGgzVNB26SgbazmhsyNLrsV3OBtSpsp9W+7orwRclVL23W3qEe12Wbp0VbciBqPtEAsTBuewbDQGjPqG16QNgaqNy5jKWhzYik945jbZKzPmjJvq9J2eLpH641Am6MLeFuWPbFpo/FmPKfuTKTFZK0TY4FbGDnrjfUPyGHaUCfA21IxLKEtg7nlmJUdkNFkos/C3aQkBW7Hw5PRi5q8bU+au6nY2w7DBj3uxtNl4iVrAdjieJk1hXPLpXH9l/oJbT5uRFtvgjKhSpDQ1utKWSq0sYg2VKWlt522He39MKmj7WDyLdOWcix9vOvoywWYWQaFWwsr5tfsrTxsDmwhh8M1rG6dKhGmzRfPJ0ykTiBvI5W0ifVlqcTSZwilAdoi1mXbNbdf6mgbnowFNqKNigSlDbE0aG6GyQZOMxB2+9htxXNNs+kCKVA4PbuDLGu8Tfbeh2lDKB1JUUq0CUGa12UMBJmbxFKE0pxNLWDldx2ftR1dT9DddZq73P5ISTxJ6ulR7MnIUZCD4kY0nakpuEFTeZsp6CqINwLVPHLwtjBuTJLQJuaWCUFKG0e7vE4YMW4aSkc5m+XMQw1tF5NRDW0vuz3QtunB1nnqm5vwBtimI2ccJ1RgF8MujEw8s825NxbJ8bCkz9/8smP14MHbkrrMjUgiekZKW9eiTc0NmRvvDOdYwi687Uhpg8gCfw7S9jvli2Uk/XrXx23TeOzIJghNkc+d/uSqZBHEGzQLfbheQYvlBmAxXrK3/RndQBvBRmA4tMHc0m6RucHaZB2I/fCnk1OPtg+T8e9B2i4zoY2bu48CtG3HvoyitoAUWPC3as1Z2y4M3MZUGOW8Ap+Dt/3ZIiJaoVDKuDFtCKUFbZK5kdTciqJUrTBNK7QdeqF03PsjSNtZl3NEoW2bGiDT6wSzCsWxfWYD5X2ZEo5QLGAYBs4zv1UICd9yueNV/u+INlbkKhZz47yt6LhpmcC4iblxWTpi0nj9bklbt6Tt3d6lR9vhpBdeKX6NSJrRnHxAXiitmloUYZSPaV+6ij92hULChzUtMkZa15x0Mf3niz1TvK1UVBwLc0upBiB4hLbSr/qKG8xtlOP2I0KpPKxlwtuHJW3QeS/8LZgrCs4pSZq7Adg6TsvNgQ200YD35eOG2MvW536cpgT4mhLI+Uze3n/RCiqK+mJuLO5q+LRx7VgpS6Wq6FVC6fnDY5+2D73rYXidONMm3vY4AFtnJ4Yc1iLGa6rMsiXRVoWrRgQYmlxusIF9DtyYtki2Km59rhPGhM8YZYIxpg/clDYxN+CmodSQotaHh0c+bRe96+DE1Ycuc824pU8DtO3ubpjYkhtGo8Zx8yUGZ3hvkr1QvyUOatlpng8eZjQqVcKDFmQzJ+YG2sSuhDbEUsUNeZvQ1rNoGwZoO+wFvyt/8LfS1iXthqqEzrfsJRqzPHcLq3kEtYmnI3zeBjSdOWnJkJaSCaKXx8IQ8mkDdDC3seAmtA1ipa1vjBkobmpuH68+jvLpBLsqbR0OT0raoPD//XwwAm2hqYSOdNxMv1I6MinMi3y2W2Qu2GJ27wuDDamWOSjwzoJrCgpfszfQFlISEU3kWySPNsEtJtoymNuLjz/t7+//NKrQRs2V9vCk7et8dBCaJmUTZWEqwdFmSRkHKhhaIJCukdd5xOmgQe6gGZ7FuChJ5DDPHImzqAC0+eImSJi2pMAtK3DjgHv1Zj/XP0wb2nOtszBt45Nh6DswBW3dnLZOCLbO133jKApqncFz0WtSW94s26w/Zw8whqaydxNtiRnkIAW9LeFYOmDc+KERGRvrShO3tKDtdHjQhlCU/hCg7Uhp45W7Qdg6X5pSEYN3k6PdBfBEPnvNQBg2PIzn4pCEdNBTkDbUCRpKMZkguZHAaOM2es2ouaGUHm8dD/dCtKUvA7S97Fm0PQnStrttLEVSJXu6m4bnKa7XkmkEIQBoiZqBtsRkam49NTfQFvUL3AiO0a/7qtdcxTKc/DTR9vDMp+0iOw7QdoxImsnEle9tTBsUrYvMKmVPpClooM25MkuAI16F6mjju4maG2DL+QFuTBvpHLB5tCX0JavTwwBtlwHaLpW2FLS52s4/Au2kaJ1lWIAQV8vlT2dw+Zhv2upbP+yEtumhtEJbEiWK2wCw1dA2OBmGpq4Os7MAbadpDx2QnU6nhrYopy3qrz9xImMDKGFeTnpr+Qg6q1n0Wi7mYrEx2lAnFOkU0Rb3c9paZSwdDAa9EjbQNtbAG32qo+0q+F8FKm34DkwtbXcBtNnSSQPvW4kw44LOuGLYBHOg7a8HpJYvDaVpL0eH6RFzE9rKQsGkWiCEaXu7R+lYiLYPoQVHadlwwxflg3mb2FoS3UOx9SmXZhWKHfbkvNJeDGiDauqEXiVv48SNxYXCq30RalJMPgzi6JxoC01dDc4PwrSlJW01HRAJoDd4W2JDeCeRNLdQAgNB2SGzItqgFqOXGDG3IhEbwNtYSdJP/t73aEPilpmELCxIW5b67d3hte1tu0F1Hmm21gdNCW+iFu35i2605Oru4YYeoilPxujJNCq1P6k/5kJvazptkNQJBEDZbxsUtJWhNBlI0ga9EtrUC5N/hzQhFaDt0yDQ3iXaFDdMk3pzCWprdHKB4wKGduiu2xwkVYUOIseXGlBsAN3SvA3SzI14QygV2hS3i31HV+Xicq4qorOctnYgkprjm2jLMJXgaFOsjV6QWlmSH+tEJnfXgVPB7yTJa17Ab3aZGWkDbIO8JgVun/Z92khomZhTYipEm0kCDbcrRNJBiLYO7d8kcLaKt7WUNwAXVuSoVZ7vngzJuXFriqfpT9AWxC0h3JiAccp5m9KmTWC1NujjyC5KxcEOArT1o7Na2sTbOgHa6F43p0125SxSyCJvWeh07kCZ/h6/6rgTYZhdjk/Fbhpkz4/nM9MGiblxLGV41NwYte9aiWZt0PMRCf3d/hExtReYuUqii4dB2hS3JyHa6LXB3pYXKImFQVIUB3T8PCmrYaqAG7CkPzLB1ZqxaHif/4tA8XLpm5c2jaVpEUr7pIRxo7fPPdjegDb5gZOctjN/Vj7JeyOuLqy8bTtcJDyOHQISgCDELCi2OgapFqAW54cSvYuXNU7WrSIxlarWNC6pZc0ctNmJW0JqMW6vPNp+ZdjQM+lxVy1I27uDoe9taUnbTpi2HYMCtASuJbdaoG0ZzLkpXsu7SCJlE6+S/DVjrvQ5oa5ZxSVtX/FWI2mCMARlJC1h6yOQYiqBpbRlYmD+tPx/9Iu9htveRapYZ+njMG3b/Wou1SqpmzNpi0DmnCVF/rMKWsIfxdr4U/DHKk6wvPmFjsfiMiQdNWp0iKvwtq/qzS1Tc6t624PfEEjt5m6lTJDk7DJAW5Ic+96GQFpH29egjcXOwtsCPoZBzZvqawnfsNjDRxBnY/ZQvMD+1Is537sVgVqUESagZUMIe4O3yQHY+XVC6tGGitRq7oo0kl4Pw7S9pV9w6XsbioTu0zBtm0mFNnjKAlFz9gpWjn7LRJxSvS1R7lry0eQGXSl7cLvmFV6ZAsAiazwTd9GMzwa9DUOE0iwVb2PcjFYJrdc+bVdjhU1oO82JGgZoo7mxs4C3pUpbr2YqoZsAtgTxdOWSKC24IaVzoy1fJC1kcIyeum85gtstwMmCEqxAG2ApEQRP8yr8U+9tb9NNx6zvkj7XCb65Pfj0xqftn7HtbemAo2VgEcg7og2rQAJVQi88J/80dgOpJuaWRSWtBmTRhoCqt9RvUbzylY707TKpuz0JZ3LSSxcVxnLxEFvvbRh8Vw2l6O8+eLvvazQeiQrajmpoe0+0vd2r77fVfQdmB2mbdLlgbg0YnJvH6b3S+OQeAIOzSRStQJhUkrrmkVO8eMcQxkeCzcl7MK550YuENt/bMGDakoGUpfRS2kjkTfuBBkgRScXcst5JPW0tWmjpz5OmBW1P6leA2M1W/Es2hBuwxiWoKxegkJS5iCnT6Iq0Tka2z0W3Ju2KlEMsPqnmZuXgMxbBx1O9jfR/e+f3m0oRxXHrb6+/fy4Tb9W6/nhQk01MX8x9aGKMj8biozH40PSpyRKMSiwq2yjlR4EGpLmttUT/Uc+cmeE7O8xauMAWr37phd0BserH75lzzsyuKrmRGDaSoe2uhzbeW8pi2ngRm2fJUTWQU8Ljg+w1IJ9m9OQjxo2nbPYMPAryk96WYQ4xaM/j0EXj8wixF17Hv3iKu9wF2nA41QkDiS5fCLGFGYibrrc53haqUKpx29+zaIs8ScIPXxnauASy98dWBm28hG74D7T5WwnUJY30jlaSM21bvgCM+0bWOWwOpmcnsvhWAxkqOPLn5rNVDVkBLyAQkBkDtDNZOOBs3mYYw5iqgWwac1PeFinafvLQtve5jdveXxm0jeT31pGUYu2uwc2/K4H6ViaURnZVFZH0xlRAzoAh60jHfnUKytQhkCsgj10dc1jX4KeNno2z6WeDG2QR6BhfVoz119v4D8aCoMhFEPY2JKUlrDaC7u6naesd+GkbC1K96t1zxbBhD0x663JRRVLM2tAyWqkKc76LEeNxyFj5xbAVwNzQnMU/UyF3ATocgyjM5VBC8XclGFScTeekpv6BU1YwCaX7X1mRtO2h7Y99ddG373QobWbQ1mLaWv9A266/tqvXfhBx6MirR7BuKmSaYCqjAGr8rAbRBjavqzC3+QFEdMWSJmexCR+59brCNd6mhTxhn9MEJKWBrwBySp9ic9O08Wpwz1LxNtPWjQ+mdi+z6Esypm0MW7qRYLYfsPKBrrCUsMt/PBM4MxnlQvHN9x1Qj+Oz9DhSidR+WdDHo/oo09swiXPNzdCG5UaWWmp5kqGNLpvlp62rTPPYoe2I91zJp6+92/t2Nye0IYWLgmvnbGtHm53G6nqh9rVAFRN53JnJrc+CEpMioHRir2rCuFHhGm+Du6GfwCWQibl5y217ageqKYH8sZNBWySk6ujL4zogLFkAueNbAKJps5de6IJqvqG0sDwU7WV5JssOTIMLyPHBWgBn7A1kMU8AD+mqgZLHmDYIlCFTwCo3wo3CKZbv+mjbl7Thcr1/bYE2t9xGQlJqX1GLd5TSyt07vmqbQ5tUdOPp6OICeOBV2OMIq+uwTthYWUqAzsZxE6dE21nnzKMOKyTpzvwm02YvFo88tP1A76iZG+P2Ve9A0zZVAGElVYe2ivxribiscttnoE1StoapAZGx8F8oRFBst0aDwdXV1ej0tL1pqiaT0uL6LCCBnHqIgQxZhKTt9jU6u830XZRUb56XgRR5GYhvvRGboE5LibZmBm1jTZublNYINaUPvNU2mraBtkIUrSNtCwIogvNRf1iu1eIGKY7jWqXc7A1ajJy9hH2tJnLTQmN1AmEBtM0ghi4qqi3MXtruRpxPTPKEiqGt6imAcFKapi3+RjdKP9/2NkkZNi3uJug89F9C3bUS4nwwrMREGaumxIfl3qhoul++NXZQHgwyRdkyhDnDoG0u6EJq1Ud3j6ZoGxFtMDdKSTNo6wotJyndmdD2iaTL3Ur6BayNI8q/xdtmlWj3K42GoaxiiZEr9041XNjVaE4Dl7Q1uEYAu9titIG59tVU6+rU0Ma4fX53C1nCdEqKpBQaSNpI3vVGu3s0LVSssSa0lYL7QeK8VyPUDGdlW3JAAvfjSFcXuaOKrRnYBSGPfD/5w4elSwvRBuI22tVeqtwWTcyNcON7Wfl6CVWhlbid0r/2VFL6qX8DjKINpbb7irZBhVmzSDsk/fjjj/JFnjJwh6MgADb6MNBnUjZU4CrAcf5etzBtEBE38bh2RNLmRgWQIWhzU9KMpLS/R6jRA7QBNl5tRDLmNvn3W7oPcBOFHrGmUANoR0dHv0odHUnmNG9HLWHF0+xd/lhON2Vrsya160cbe9y4/+URldvOI5gb6TiDtnFoImnLvfCurJ/Q400fbXuGtslScQWb1r8ZOXF+qGErs9jTJGq/GEniDG/9AkrBNltmAz/CJ6izj5FrXBNg15I2KQncl5vEGsztmziDtnYotLqx00ygoh4KIO6+5UlCqhcc3Sc1XQlbucFBVKHGrDFqP5F+/vln+ULA/XqkeGsctkXAmt6cAZk2LEDSCzsnaLoX7TGa3iqxbrRxTC1J2EzNjftWoM2XkiIpNR+UJWROSX07Se3qx0zlNhH8S9RswNh0DGXWfpb64Qd+kcQp3mpxbSTsZmsKmyxSguD8nJ5QqfNEU4BZWLqKoG1JOgsp2pltM3/BstK0RZPWf9I8cG50tce0+RsJFm5S2bQJo38HbqIHZ3Ng+wEi4CRvFE9lNL0SgSMvOPaypV4cHw/skp3NlMxxEWazrG2NvE0DVyrqKkjvwE9bFU3ZzkdOwe2UafvaF0jBmmrIk/x2JtIyAK6t09VHas7GrEkZ2Ji177+3iZP2xrg1+nA3Jcfk3M3VwYD+9W7tDM9pOAKCvEhYsWfG1YoT+0JO0drSJnlTK8ubGbSNsVKzMwJtrBGlCf6U9FOVjqIp78NNADUHuDV2u0hO2qxclOdsGrbvCbbvSfJQ4faTg5srAEayeWtu7ZC2jlteF4QPIpiaHWP8/rrSJnkj2nDfNOfKDC14W9Leca7zvC8nbr7bwHyWog3F3VTJTWQpsFADfpjd3SCG9cHE2mhShjiqYGPU6KEk46nBLb7K/J0BHhZttmOiTeJ20rIhhCLFVWB+sMZJ+Z52wWjtaCPeil99E2fQ1rVWNJVO0hO3/iZx6uuSbusrx0H+QPrPstFK03aDvB3C2srT1gYBtx/LjNupuLb3j81fI2aNcTsVYCZwoMModvhHfCyH19LbpDojQNSrTvWtwlA9O0npcHNvz5eS3vm6qBeAQJ514XCx2aVBc2nLiz1xGsPaMmjj17t3+ZDnbiqWHhdnX4Mirtja4G4BP5DSOh0uY224cgn2wCqnWyvabp81DwxJ/VSSUAJtIhmmaWvKO2chJU0F0sgxtwC4lRBJ51aQog1BNyevE30dSA+djJQTUgLNwEa43TW4Yeo2A2gMlOht7QC3dtY+CbO3H/U3LCVWVqdjrkljozWh7fbt8Y5CacfTt5KwISlFCWR/33vx+g9eK7KstNSeuHEnYSHeVCzFK/hbLXYiaGLaZpIEaW6ofyCgTmijWFqpkCe2Z//VhqCNUoVz56qJOIbozHBmcgUDWWrLxJrQdntDxcl46mJaKIGMHdpo54PvAs9f810iIwgbSB3aliUwtlqTK1YMbcbbPLghlCrcdNWt0Zv5V+OUFLg1S9gJgZ3fDmtoU+gj5KokJg+Pm6ft9u2Xt6buztEWpYBh46S0m05Kd1pkbm96AykLYdS33kisVOZvsFxva8eGtkOeuDmtBNfeTCj9kfOESnc+2oAbqsMp2bmAPnN6+w6WuILOGtB2u71z4CxvK5aYNuVtdZWUQiPa2LDtXEaLSrv7BjaEUTsnzQU4fPtKaIO5wd1M64o0TZs0t8Gsv0vhOE1b3J5OYyHL7VIzO9AG+nQ5GNeiy582aOMk3SatRqCN/M3tlA6i/c+wahcZKcmtt9HDZAgiH9iC1FRvibRh4mbz9gv7Gwu8/WAmbhxKj+akDbgNBQ36d7hi3LIy+1N8jlCLMjDDxwNRrrRBZ8cp2kYlwk2QJG3TSWk/Kn5NbuYsNvoKsEHpiZsIRP5axvKPmqQNbVKro4BlIAip2tvMxK0Siflog1oi09iyba9ghI3X7GyomZihnGmD0p0Eoo1xC0liKintlfY/nbK2N3lbYUZ5V36bMrjZtGbIRceNWOHGvEEALj2Ds2mL45aYNRlxaNtChjGzsMsax1g0jP29uLh6frRBYztJiJg2UiiVOElps7T/gSeQemkLtOjb/pG2UOSgYD4h8vd24glukAMcG5xmjWCTtHENpDGacbVB8cSl7aS4lD2LE6czBqeRA3E50ubiVi0SbQFoc5LSg+Nob3dq+4veoe8WdyfexsT5FeqfPHRvbdLTGBv6FHHm1QXuZyVe52Zou6oHwVy0AbeRWNrVFNnnQB/qc1hHkiNtwG3AnJiKG0klpSi4RbjpMgKpjza7J08SGQr5T36at+VF5napaeM/9KOE2RxKIlIMG9NWW4y2oVjQ1ZwIq9izpnWm6WBaXrnRdlY1SUJE0pFU4Xacpq34hZuS3vmcA6lv3gbYMuMoLt9kDkgrN7y5NsAc8a54JT6U2+N7/X6/N6RCB4mBwy6FX9naFG3Ve6ftuBAsU8APTsdJw6RGQrTlpA2TJDBtCjemrZNOSnfaHzq03dneM87mmhtoywiloXlMznPTPM2rq3LcYMW18vBq1CoW6H+eer0uL7zeGvTKEjjVrscWLBqUtA3mpQ3y9r24uLNU+LCAjmjLS7d0kuDS5i7fPf2YYEvx9qmGzdeUj1za/AJ0YXpk1ZoNt3qhNej3rwaj9nmBKEu3zeqieNov1yo8h9M6ZGuTtJ2KeWmDpiduIhr3m81ecUmwwe3gbTlprJIEpg01kNDtlA62p7tWvgKIJg3mJjwKQRUGrNiaD3RBtsAUS3+2fn6aplGcM28EnFLZwBZ3Z/RP1Nuyu1eie3W8w4WBRTmjn+kCca60nVVVkgDalLe100npD7vOtO2Dvf0Mc9PONmkoZAsRFT8kvK6WuHl3Mvd7ralCSXFQrqEipy8N0jic8btLoC2r4lYvXp1s6Q+NxaLG5hvIkzaeuo0jkqmB6KQ0TtH25a67/GPfTxuMjSWmcQNlEJMG8oDeuoTVoN4qDyPhCbfn/Uqcug4Np6QLeFtTWB8oDY6ZNX4HX7uokC2AtnzU5iQBE7dQhNNJ6dF2VrENtJkvcSsg2UU3PJzJG9DLSVgW7MevPop73Bvx8NbuVXCZLRlIa+f30CdFUmp9dau5s2W53pJpUwWRWznSxrG0rXmx04RmirZDh7Y391nX0UZyaQNlqTEM256Wc2EOtE1v9+tnpIUlhgK1Ocpj+/VgEdoKiN0x3l4qbQiq8LactFHdt2gzaUIvRVvZ2ZTwOV9Y2psm2LSJTLmAASkzcmFSBj7MR8DJdbZ/iGIFykBPm6b30LhsBmIh2oo6KWmrIIp3QPFSBNpy1W8T2tBO6FRTtFXS87btPaINuNnOhmCTBRsipzsEa4PHWVlqjkrD1o779WyCxFVb1EujYa3BGhItMwu0uZ3S+unJli9b/dfTdlsVaNEqpZ/OON1MeBc56R3atMywecytpGVmbV7iDEgZsRMjGMNzTkqlnuWm2hnhD7T1q5HgesigR1WxMT4xD23QCdNaH8dTbYbB/UHbmYbNqu92Un35g/j91Mq2z4gz78QNvGWbm1mxCXmqbBcov6UfuYrpqvfj7oQ0gIi5/ECFOK4Aswcu5G2VIqfAgM1e+7YC3XrggUeef/x2jgo3i07FLUn35eN0Q35vQpviLTVvg4QrMOPPC0KrDgIGIZzmqLactIlSoM0tbXFC0nbv0/esLKHoeSM+D5auWw8+/AArV+Iihza3BLLzzq7dkGfSvGlC4KfNJcbxN3ibS1WY8chRQ7K2kgBnErBzFDlEfXzEg/RnbmVUQMQQ4yvr19966JEHUno0B+IQSy1E3BLIzvd37As772d6m4WaD7dQIxZOe50bOr1Y5W9x9Xajl+A0kENRv3euoiyftn7l4blh89PWlDkwzp2y74ICaU88+oBXuRB3USylza3Tc2nDot19yEMbdH1dFyMze1v6cKVtLraxXuO0nqKtPqr0g7r1iVEvCQJ430JZAi9wizC8/ALIby88CE/z65nHnrq9WjmtUncVyA+7oO2rYsrZst1tWq5dufW2kJTtbTxGgjO637Z8deNKkBoIenGVWFODTFv/oyTQpxhl8uhnbtp6NBHEKbQ1Wpy2Wy88+MwDs+mZJ55alckhliIpHR2k2/JWH8HQJg88sEE+3NLuBIhSJAI/56GBBKMrrsYlg8t+Yg9EzcaIB6AmcQDMfAqkcOSlDRYmmhidWvg2vxA8ryctt4lcWFSo6P+enXaqLf/zhLY7XxBd2RWQGYIoJP9W+sWJnH6GgBfLrRHjaGl+Vx9ejus2N4fxqJ7+RLvSZYx8tPnBM8fernw1acU4Xc7+GEzT5tcjqwmrEcwtnCq4/bRrYONrtsHcMnATWVJYOT5FUmNK1gfchw0bnWo5n+bD5RAXVeKuZVtBMz6tOzz2DsVcCnAA2qBx0t9aRpKA4PnwNEI3b3JnEhXg9tvJgb3kaNvQ9lZkW9t0M8HvboABpNi06BCrnoAM5JgbwIVBpg30Qh0sxlu91SgjSJLTxa3E5bF2haE5Vaj4VoojkC7Sk+d8YGZLy38mdyFpQcHNpU3rs9LmP3kbUONvusC0zFVoCWezeBuyCPCrj11SF5zbJVeXTYu9amOQuDz2a11xr4qmd8GcFLon3iQBex0WmKUtrIcfWxZyZ6UUbcdp2nhjAvURiKgiCfO27IkbPZnihgOOK2cILDqE2OmrF1uYW9b6krmcLhxe9uqTk3ZjWHdhazeQRcwt356r+njHJ+y/Xzx2Lh5Xn1oGbnYoTYY2bUeGts9KwA3e5mnMY11b6EEnnF0pTh1vg7GB2ikYYWyWc86mUvnSipPNeNrGynG3vghtW+51Z5KqN5CeREFKYM+ppflj50qQe3zhWAraemna1HW0tiPBtLEysgTgVoKdWH6lcfNbXLZ83oYO2JS1OWE1TJJ6qdvtnncjkSThjLhFFdQ7khHIsyLtALDNre7J1snJjg3c1lXSmyFJEMFmIQ3crRlBW6PAelYyRRAhOn2HtjsSt1dDYcxNkgb5cLNkMgFgNb8cbwNMKe8CeHZUTQqjXpN2rNTkPbr7gzYRN8tm6XYc4/5flfg8dGCjJEIsoPOTXrX60fDE4m1cH86QJLz2xvb2G28XhJ6jIXTmKSB3jxnrGQq8qWbCwY+SNtJrRBvhpr2NH8yaTVuUos02nnApyl4PJ1J/F1hb0jX3T9ZbVWrlfkskSEcyVB83TrqwtqFb/KD6SBtj86s1rLKINzM96yIlzU4SXt/e3d7e3X3znJKBhx9YCz3zxD1M5sLJBRr0xe5BG681ojdgboyaxs3fmBcQ3GdxOd6GmZxG0TBn3qniMrq87ZPvgTYciSTVzvB2Eo4Dc1K+HLuBtHlJOeoCan9U1WrGW3oFiDjeuiZJEMGHu9u/j1+irHPN9Ogj80XWs9KEtrGHts86oWBz06xh4ubDzYIMqz+WJK+3YQ5n9SqS0pBZI9L4wkTmpqJxXCbeAJpHSfXSlNvC8WUlct4eoqu1IG0UTwkyThICb0ueLDbQuqDISVO09dUczJ0pR0LrCpGU+ghBJ7TNbf+aeRv9QDZtK2GOnkEb6nMldedHYo0vCa6vR/Qj89Zs6XCKh+Nthrakd9lLoxXSiBCL0gYNd7Zk3yo68dHGFrv2nM3PXMhZgqRtJ0Ub9xFCKaLN4Ab5nQ3mhsi2fCHzRJkD+SnDVi4Ta7i2HwGneKt9JJLplSQhvM0Ud4OKaphCvcuhWEz1FtEGyQ19LdCW0sv/Is7mYe4skO5GtHUd2kivkbXB3NL2hhzBdjb42ypp0zGUHw7kyZUFm30fNHPvlmY3cbzNxGW0EgKRjC+dnsFwYdhEfcS0IZrGJwXhLG6LX3zxlWf/jZxNMeeHrsOoyJsmHECHd957771tEWraptwtcs1tqieOZHJFSk/kzN+sHfOc7ccjA9vdu6mbt9Qa5bYTIRGXibayCaScL0CLhFF0wvrVlHpDChzHW/cRZyk944MuJHU6nYunLX20ef7ZF8UzGg5DERBTm0VH07SVGC20StHWXKVS3ISdPlkbz9kAG+6Epu4VVKFOe4a3DQxtopyqf9T7gG0B2j7qVdMa0+gxY7Z2+eby9HA6uv5J+tarP1ky3p51LuTNw9ErddvyqiePfQio9K9c4CYsVRqutZF0PP1Z35qqRrmCz9tAW9iN7fyzPrg8Eosr6Q3TsL300oPrUj9bvR5+QvW+PKj50ZPUEXQKOY+3obhrpwk5KpkE0rS33VW4yVyB3a3bEV5vG8t7H6gDKq3x2yo8VwpL2A8RDpsWZs8+8J8UOd2TTz73HLC6FrqzTqm4uV9M5QmCdYHmKF7zU9JStB3S9ZgpH2XG7uo7PRJt5pbJjcNS6PW2lqatc3XZaFnteZwspObTL730xP0cNJdOHZC7iNjgnFYCVknegJJuzNdn1qFU8QbxvakYt15ifkvb24i2uBuqJEEeqEcy4qiKj86tW7ceoorGfyZmroY6Ii6MNu2ZWwm9+JsRNZeUuUncFG/G4aS5ybxU3ZxqnKg6StrbZFeewWpelq2FISfBPZAW/E/ZXNQ9/JiDnZ+4UjECbZNK2M0o6dYmuHErwb4Z2g+SNt3GKk9Aw1WYFG2hSkmbNKoGq7o76uyByNbGBkH2f8S8Rz1Kbvc8cZcJHFYBG9puTJ3ukIMpR1Nzw0fGjedthrZaY9BJNxKYVRNJSxXTt6K3jyuaSQEyrXOji40XHnqQnOy+KpndqJ6B3TnAdUrck7iuRdoJLzr0tEJ1kla/WdF3ide3b9EG97OmzTK31G4dnrdxqyGqXfaJRpWemloIvI0Exm5JI3v4fyNbpR5VcRbk/UlzOKbtH0ttF/y8Yt464W+tUX9YrijgzO2pZLd0QlstPk0kYoBHFT5q3VCX2zo6ug4b7cQNlWRj5GMP/+9jOQqO9wiT9/gGh1MA50JGYm9bPXBRuyOC7qh/VAZwxJqETdPW6HfCSVKK7LNcUgU2s0o8DCrDxCLskf9dbI1EnvfEgw8+9NBDGxsbwjU1eu6Yww5+lq5OaxDRS9LpiPZfZR1RlQxtlbiZ6OY+lHxEyYGmrZps0GyfAHvlif897F+ihxk+po/EKIC1Dk6WDFuvlEzCaveqrG9QRVKwkaihEKGbz+ZFevnFl+i3Jbz+o4X++02PMn8SQNILG6SLcNnq9rod+GpCaapaycsi2pq07OD4xRelcTFb/3vXf01EIetBpYeUNhxlsXmxYevlNgdBFn8bFb9Y99eCnnvU32w03NtkhZ83AAAAAElFTkSuQmCC"

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** E:/LHMiniProgramRespository/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 59:
/*!*********************************************************************!*\
  !*** E:/LHMiniProgramRespository/static/dodotour_logo_cn_color.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAABgCAYAAADrVoBrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTRCNzcxOTY2QjMwMTFFOUE5RUFDMEIxRkM1RUYxRjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTRCNzcxOTU2QjMwMTFFOUE5RUFDMEIxRkM1RUYxRjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE2OTUzQzc3OTkzMDExRTc5M0MyQ0NEM0FDQzk5Q0QzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE2OTUzQzc4OTkzMDExRTc5M0MyQ0NEM0FDQzk5Q0QzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zdjizwAAHk1JREFUeNrsXQnYVmP6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"

/***/ }),

/***/ 60:
/*!******************************************************************!*\
  !*** E:/LHMiniProgramRespository/static/dodotour_tmall_shop.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACYeSURBVHhe7ZRBjiw7DsT+/S89A+4ZQstQKrMeTIA7ImxnN+q//10ul8uPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy89wf7Aul8vPcH+wLpfLz3B/sC6Xy8+w+oP133///YQJazFhbeVb2F0qp7DtSRPWYhfbwCls+4tusnqaPfaLJqzFhLWVb2F3qZzCtidNWItdbAOnsO0vusnqafbYL5qwFhPWVr6F3aVyCtueNGEtdrENnMK2v+gmq6fZY79owlpMWFv5FnaXyilse9KEtdjFNnAK2/6im6yeZo/9oglrMWFt5VvYXSqnsO1JE9ZiF9vAKWz7i26yepo99osmrMWEtZVvYXepnMK2J01Yi11sA6ew7S+6yepp9lh8C7sLdrGNyoS1b5qwtvIt7C74NHYmdrENfAu7C26yepo9Ft/C7oJdbKMyYe2bJqytfAu7Cz6NnYldbAPfwu6Cm6yeZo/Ft7C7YBfbqExY+6YJayvfwu6CT2NnYhfbwLewu+Amq6fZY/Et7C7YxTYqE9a+acLayrewu+DT2JnYxTbwLewuuMnqafZYfAu7C3axjcqEtW+asLbyLewu+DR2JnaxDXwLuwtusnqaPRbfwu6CXWyjMmHtmyasrXwLuws+jZ2JXWwD38LugpusnmaPxYS1JyasxaexMzFhbWXCWuxiGycmrMUpbBsT1mLC2sqEtZiw9sSEtbjJ6mn2WExYe2LCWnwaOxMT1lYmrMUutnFiwlqcwrYxYS0mrK1MWIsJa09MWIubrJ5mj8WEtScmrMWnsTMxYW1lwlrsYhsnJqzFKWwbE9ZiwtrKhLWYsPbEhLW4yepp9lhMWHtiwlp8GjsTE9ZWJqzFLrZxYsJanMK2MWEtJqytTFiLCWtPTFiLm6yeZo/FhLUnJqzFp7EzMWFtZcJa7GIbJyasxSlsGxPWYsLayoS1mLD2xIS1uMnqafZYTFh7YsJafBo7ExPWViasxS62cWLCWpzCtjFhLSasrUxYiwlrT0xYi5usnmaPxYS1JyasxYS1lV1sAxPWYhfbqOxiG5UJaysT1lZ2sQ3sYhuYsPbEhLW4yepp9lhMWHtiwlpMWFvZxTYwYS12sY3KLrZRmbC2MmFtZRfbwC62gQlrT0xYi5usnmaPxYS1JyasxYS1lV1sAxPWYhfbqOxiG5UJaysT1lZ2sQ3sYhuYsPbEhLW4yepp9lhMWHtiwlpMWFvZxTYwYS12sY3KLrZRmbC2MmFtZRfbwC62gQlrT0xYi5usnmaPxYS1JyasxYS1lV1sAxPWYhfbqOxiG5UJaysT1lZ2sQ3sYhuYsPbEhLW4yepp9lhMWHtiwlpMWFvZxTYwYS12sY3KLrZRmbC2MmFtZRfbwC62gQlrT0xYi5usnmaPxYS1JyasxYS1GyasxSlsG7vYxokJazFhbeVb2F0wYe2JCWtxk9XT7LGYsPbEhLWYsHbDhLU4hW1jF9s4MWEtJqytfAu7CyasPTFhLW6yepo9FhPWnpiwFhPWbpiwFqewbexiGycmrMWEtZVvYXfBhLUnJqzFTVZPs8diwtoTE9ZiwtoNE9biFLaNXWzjxIS1mLC28i3sLpiw9sSEtbjJ6mn2WExYe2LCWkxYu2HCWpzCtrGLbZyYsBYT1la+hd0FE9aemLAWN1k9zR6LCWtPTFiLCWs3TFiLU9g2drGNExPWYsLayrewu2DC2hMT1uImq6fZY/Et7C6YsLZyCtvGhLU4hW1XPo2diV1sY9IutoFvYXfBTVZPs8fiW9hdMGFt5RS2jQlrcQrbrnwaOxO72MakXWwD38LugpusnmaPxbewu2DC2sopbBsT1uIUtl35NHYmdrGNSbvYBr6F3QU3WT3NHotvYXfBhLWVU9g2JqzFKWy78mnsTOxiG5N2sQ18C7sLbrJ6mj0W38LugglrK6ewbUxYi1PYduXT2JnYxTYm7WIb+BZ2F9xk9TR7LL6F3QUT1lZOYduYsBansO3Kp7EzsYttTNrFNvAt7C64yepp9tgvmrAWE9ZiwlpMWIsJazFhLSasxYS1mLAWE9ZiwlpMWIsJazFh7RfdZPU0e+wXTViLCWsxYS0mrMWEtZiwFhPWYsJaTFiLCWsxYS0mrMWEtZiw9otusnqaPfaLJqzFhLWYsBYT1mLCWkxYiwlrMWEtJqzFhLWYsBYT1mLCWkxY+0U3WT3NHvtFE9ZiwlpMWIsJazFhLSasxYS1mLAWE9ZiwlpMWIsJazFhLSas/aKbrJ5mj/2iCWsxYS0mrMWEtZiwFhPWYsJaTFiLCWsxYS0mrMWEtZiwFhPWftFNVk+zx37RhLWYsBYT1mLCWkxYiwlrMWEtJqzFhLWYsBYT1mLCWkxYiwlrv+gmu6f9OPbHquxiG5iw9k0T1mLCWpzCtt/08nfu12pg/2yVXWwDE9a+acJaTFiLU9j2m17+zv1aDeyfrbKLbWDC2jdNWIsJa3EK237Ty9+5X6uB/bNVdrENTFj7pglrMWEtTmHbb3r5O/drNbB/tsoutoEJa980YS0mrMUpbPtNL3/nfq0G9s9W2cU2MGHtmyasxYS1OIVtv+nl76x+Lftj4RS2jQlrJ53Ctiu72AYmrMWEtZiwFrvYBiasrZzCtjfsYhu4yepp9licwrYxYe2kU9h2ZRfbwIS1mLAWE9ZiF9vAhLWVU9j2hl1sAzdZPc0ei1PYNiasnXQK267sYhuYsBYT1mLCWuxiG5iwtnIK296wi23gJqun2WNxCtvGhLWTTmHblV1sAxPWYsJaTFiLXWwDE9ZWTmHbG3axDdxk9TR7LE5h25iwdtIpbLuyi21gwlpMWIsJa7GLbWDC2sopbHvDLraBm6yeZo/FKWwbE9ZOOoVtV3axDUxYiwlrMWEtdrENTFhbOYVtb9jFNnCT3dMC9hEwYS0mrMUutoFPY2fir2NvmjRhLSasrZzCtidNWFu5ye5pAfsImLAWE9ZiF9vAp7Ez8dexN02asBYT1lZOYduTJqyt3GT3tIB9BExYiwlrsYtt4NPYmfjr2JsmTViLCWsrp7DtSRPWVm6ye1rAPgImrMWEtdjFNvBp7Ez8dexNkyasxYS1lVPY9qQJays32T0tYB8BE9ZiwlrsYhv4NHYm/jr2pkkT1mLC2sopbHvShLWVm+yeFrCPgAlrMWEtdrENfBo7E38de9OkCWsxYW3lFLY9acLayk12TxvCPtqGCWtP7GIblU9jZ2IX2/glE9ZWfg27I27yva/yB+yjbZiw9sQutlH5NHYmdrGNXzJhbeXXsDviJt/7Kn/APtqGCWtP7GIblU9jZ2IX2/glE9ZWfg27I27yva/yB+yjbZiw9sQutlH5NHYmdrGNXzJhbeXXsDviJt/7Kn/APtqGCWtP7GIblU9jZ2IX2/glE9ZWfg27I27yva/yB+yjbZiw9sQutlH5NHYmdrGNXzJhbeXXsDviJqun2WPxa9gd8S3sLv+yU9h2ZcLaSRPWYsLayi62gZusnmaPxa9hd8S3sLv8y05h25UJaydNWIsJayu72AZusnqaPRa/ht0R38Lu8i87hW1XJqydNGEtJqyt7GIbuMnqafZY/Bp2R3wLu8u/7BS2XZmwdtKEtZiwtrKLbeAmq6fZY/Fr2B3xLewu/7JT2HZlwtpJE9ZiwtrKLraBm6yeZo/Fr2F3xLewu/zLTmHblQlrJ01YiwlrK7vYBm6yepo9FrvYBnaxjTdNWItT2DZOYduVCWtxCtuu7GIblV/D7oibrJ5mj8UutoFdbONNE9biFLaNU9h2ZcJanMK2K7vYRuXXsDviJqun2WOxi21gF9t404S1OIVt4xS2XZmwFqew7coutlH5NeyOuMnqafZY7GIb2MU23jRhLU5h2ziFbVcmrMUpbLuyi21Ufg27I26yepo9FrvYBnaxjTdNWItT2DZOYduVCWtxCtuu7GIblV/D7oibrJ5mj8UutoFdbONNE9biFLaNU9h2ZcJanMK2K7vYRuXXsDviJqun2WNPTFiLb2F3wS62UTmFbZ/4FnaXyoS1lVPYNiasxSlsGzdZPc0ee2LCWnwLuwt2sY3KKWz7xLewu1QmrK2cwrYxYS1OYdu4yepp9tgTE9biW9hdsIttVE5h2ye+hd2lMmFt5RS2jQlrcQrbxk1WT7PHnpiwFt/C7oJdbKNyCts+8S3sLpUJayunsG1MWItT2DZusnqaPfbEhLX4FnYX7GIblVPY9olvYXepTFhbOYVtY8JanMK2cZPV0+yxJyasxbewu2AX26icwrZPfAu7S2XC2sopbBsT1uIUto2brJ5mj90wYS0mrD0xYe2JXWwDu9gGvoXd5cQpbPvEKWz7xE1WT7PHbpiwFhPWnpiw9sQutoFdbAPfwu5y4hS2feIUtn3iJqun2WM3TFiLCWtPTFh7YhfbwC62gW9hdzlxCts+cQrbPnGT1dPssRsmrMWEtScmrD2xi21gF9vAt7C7nDiFbZ84hW2fuMnqafbYDRPWYsLaExPWntjFNrCLbeBb2F1OnMK2T5zCtk/cZPU0e+yGCWsxYe2JCWtP7GIb2MU28C3sLidOYdsnTmHbJ27y3n/TH7CPgwlrKxPWYsJaTFh74hS2XdnFNioT1mLC2g3fwu5S2cU2cJP3vu4fsI+DCWsrE9ZiwlpMWHviFLZd2cU2KhPWYsLaDd/C7lLZxTZwk/e+7h+wj4MJaysT1mLCWkxYe+IUtl3ZxTYqE9ZiwtoN38LuUtnFNnCT977uH7CPgwlrKxPWYsJaTFh74hS2XdnFNioT1mLC2g3fwu5S2cU2cJP3vu4fsI+DCWsrE9ZiwlpMWHviFLZd2cU2KhPWYsLaDd/C7lLZxTZwk/e+7h+wj4MJaysT1mLCWkxYe+IUtl3ZxTYqE9ZiwtoN38LuUtnFNnCT1dPssSdOYduYsBafxs7cMGHtiQlrsYttYBfbwLewu2DCWkxYi19g9Rb2EU6cwrYxYS0+jZ25YcLaExPWYhfbwC62gW9hd8GEtZiwFr/A6i3sI5w4hW1jwlp8Gjtzw4S1JyasxS62gV1sA9/C7oIJazFhLX6B1VvYRzhxCtvGhLX4NHbmhglrT0xYi11sA7vYBr6F3QUT1mLCWvwCq7ewj3DiFLaNCWvxaezMDRPWnpiwFrvYBnaxDXwLuwsmrMWEtfgFVm9hH+HEKWwbE9bi09iZGyasPTFhLXaxDexiG/gWdhdMWIsJa/ELrN7CPkJlwlp8GjsTu9hGZcJanMK2MWHtmyasnTRh7YZT2DZusnqaPbYyYS0+jZ2JXWyjMmEtTmHbmLD2TRPWTpqwdsMpbBs3WT3NHluZsBafxs7ELrZRmbAWp7BtTFj7pglrJ01Yu+EUto2brJ5mj61MWItPY2diF9uoTFiLU9g2Jqx904S1kyas3XAK28ZNVk+zx1YmrMWnsTOxi21UJqzFKWwbE9a+acLaSRPWbjiFbeMmq6fZYysT1uLT2JnYxTYqE9biFLaNCWvfNGHtpAlrN5zCtnGT1dPssZiwFhPWntjFNrCLbZzYxTawi21gF9uo7GIbmLC28mnsTExYO+kmq6fZYzFhLSasPbGLbWAX2zixi21gF9vALrZR2cU2MGFt5dPYmZiwdtJNVk+zx2LCWkxYe2IX28AutnFiF9vALraBXWyjsottYMLayqexMzFh7aSbrJ5mj8WEtZiw9sQutoFdbOPELraBXWwDu9hGZRfbwIS1lU9jZ2LC2kk3WT3NHosJazFh7YldbAO72MaJXWwDu9gGdrGNyi62gQlrK5/GzsSEtZNusnqaPRYT1mLC2hO72AZ2sY0Tu9gGdrEN7GIblV1sAxPWVj6NnYkJayfdZPe0JvZxMGEtdrGNSRPW4hS2vWHC2sopbHvDKWwbE9Ziwlr8At+4RcA+GiasxS62MWnCWpzCtjdMWFs5hW1vOIVtY8JaTFiLX+AbtwjYR8OEtdjFNiZNWItT2PaGCWsrp7DtDaewbUxYiwlr8Qt84xYB+2iYsBa72MakCWtxCtveMGFt5RS2veEUto0JazFhLX6Bb9wiYB8NE9ZiF9uYNGEtTmHbGyasrZzCtjecwrYxYS0mrMUv8I1bBOyjYcJa7GIbkyasxSlse8OEtZVT2PaGU9g2JqzFhLX4Bb5xiyHsI2PC2sqEtZVdbAMT1mIX26jsYhtvmrB2wylsGxPWVm6ye9rD2MfEhLWVCWsru9gGJqzFLrZR2cU23jRh7YZT2DYmrK3cZPe0h7GPiQlrKxPWVnaxDUxYi11so7KLbbxpwtoNp7BtTFhbucnuaQ9jHxMT1lYmrK3sYhuYsBa72EZlF9t404S1G05h25iwtnKT3dMexj4mJqytTFhb2cU2MGEtdrGNyi628aYJazecwrYxYW3lJrunPYx9TExYW5mwtrKLbWDCWuxiG5VdbONNE9ZuOIVtY8Layk1WT7PHvunT2JmVXWwDu9gGvoXdBRPWbtjFNjZMWIsJa3GT1dPssW/6NHZmZRfbwC62gW9hd8GEtRt2sY0NE9ZiwlrcZPU0e+ybPo2dWdnFNrCLbeBb2F0wYe2GXWxjw4S1mLAWN1k9zR77pk9jZ1Z2sQ3sYhv4FnYXTFi7YRfb2DBhLSasxU1WT7PHvunT2JmVXWwDu9gGvoXdBRPWbtjFNjZMWIsJa3GT1dPssW/6NHZmZRfbwC62gW9hd8GEtRt2sY0NE9ZiwlrcZPe0IeyjYcLaN01Ye+Jb2F0qE9biFLaNCWuxi21M2sU2MGEtbrJ72hD20TBh7ZsmrD3xLewulQlrcQrbxoS12MU2Ju1iG5iwFjfZPW0I+2iYsPZNE9ae+BZ2l8qEtTiFbWPCWuxiG5N2sQ1MWIub7J42hH00TFj7pglrT3wLu0tlwlqcwrYxYS12sY1Ju9gGJqzFTXZPG8I+GiasfdOEtSe+hd2lMmEtTmHbmLAWu9jGpF1sAxPW4ia7pw1hHw0T1r5pwtoT38LuUpmwFqewbUxYi11sY9IutoEJa3GT1dPssSc+jZ1ZmbAWE9ZiwlrsYhs4hW1jwtrKhLWYsLYyYS0mrMUpbBt/kdVb20c78WnszMqEtZiwFhPWYhfbwClsGxPWViasxYS1lQlrMWEtTmHb+Ius3to+2olPY2dWJqzFhLWYsBa72AZOYduYsLYyYS0mrK1MWIsJa3EK28ZfZPXW9tFOfBo7szJhLSasxYS12MU2cArbxoS1lQlrMWFtZcJaTFiLU9g2/iKrt7aPduLT2JmVCWsxYS0mrMUutoFT2DYmrK1MWIsJaysT1mLCWpzCtvEXWb21fbQTn8bOrExYiwlrMWEtdrENnMK2MWFtZcJaTFhbmbAWE9biFLaNv8jqre2jYRfb2HAK2z6xi21UJqw9MWEtdrENTFhbmbD2xClsGxPWVm6yepo9FrvYxoZT2PaJXWyjMmHtiQlrsYttYMLayoS1J05h25iwtnKT1dPssdjFNjacwrZP7GIblQlrT0xYi11sAxPWViasPXEK28aEtZWbrJ5mj8UutrHhFLZ9YhfbqExYe2LCWuxiG5iwtjJh7YlT2DYmrK3cZPU0eyx2sY0Np7DtE7vYRmXC2hMT1mIX28CEtZUJa0+cwrYxYW3lJqun2WOxi21sOIVtn9jFNioT1p6YsBa72AYmrK1MWHviFLaNCWsrN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR5bOYVtY8LaDZ/GzjzxaezMExPWYhfbwIS1mLD2xIS1mLAWN1k9zR6LU9j2iV1so3IK28aEtZiwFhPWViasxS62sWHCWkxYi29hd8FNVk+zx+IUtn1iF9uonMK2MWEtJqzFhLWVCWuxi21smLAWE9biW9hdcJPV0+yxOIVtn9jFNiqnsG1MWIsJazFhbWXCWuxiGxsmrMWEtfgWdhfcZPU0eyxOYdsndrGNyilsGxPWYsJaTFhbmbAWu9jGhglrMWEtvoXdBTdZPc0ei1PY9oldbKNyCtvGhLWYsBYT1lYmrMUutrFhwlpMWItvYXfBTVZPs8fiFLZ9YhfbqJzCtjFhLSasxYS1lQlrsYttbJiwFhPW4lvYXXCT1dPssZVvYXepfBo7s7KLbVR2sQ1MWItdbOOLJqzFLraBCWsrN1k9zR5b+RZ2l8qnsTMru9hGZRfbwIS12MU2vmjCWuxiG5iwtnKT1dPssZVvYXepfBo7s7KLbVR2sQ1MWItdbOOLJqzFLraBCWsrN1k9zR5b+RZ2l8qnsTMru9hGZRfbwIS12MU2vmjCWuxiG5iwtnKT1dPssZVvYXepfBo7s7KLbVR2sQ1MWItdbOOLJqzFLraBCWsrN1k9zR5b+RZ2l8qnsTMru9hGZRfbwIS12MU2vmjCWuxiG5iwtnKT3dOa2MepTFhbmbD2xClsuzJhLXaxjcqEtdjFNjBhbWUX26h8C7sLfoFv3CJgH60yYW1lwtoTp7DtyoS12MU2KhPWYhfbwIS1lV1so/It7C74Bb5xi4B9tMqEtZUJa0+cwrYrE9ZiF9uoTFiLXWwDE9ZWdrGNyrewu+AX+MYtAvbRKhPWViasPXEK265MWItdbKMyYS12sQ1MWFvZxTYq38Lugl/gG7cI2EerTFhbmbD2xClsuzJhLXaxjcqEtdjFNjBhbWUX26h8C7sLfoFv3CJgH60yYW1lwtoTp7DtyoS12MU2KhPWYhfbwIS1lV1so/It7C74BVZvYR+h8texN2EX28CnsTMrn8bOnHQK28aEtW+asBY3WT3NHlv569ibsItt4NPYmZVPY2dOOoVtY8LaN01Yi5usnmaPrfx17E3YxTbwaezMyqexMyedwrYxYe2bJqzFTVZPs8dW/jr2JuxiG/g0dmbl09iZk05h25iw9k0T1uImq6fZYyt/HXsTdrENfBo7s/Jp7MxJp7BtTFj7pglrcZPV0+yxlb+OvQm72AY+jZ1Z+TR25qRT2DYmrH3ThLW4ye5pL2EfubKLbWDCWnwaOxO72AZ2sY0TE9ZWJqytTFhb2cU2TkxYi5vsnvYS9pEru9gGJqzFp7EzsYttYBfbODFhbWXC2sqEtZVdbOPEhLW4ye5pL2EfubKLbWDCWnwaOxO72AZ2sY0TE9ZWJqytTFhb2cU2TkxYi5vsnvYS9pEru9gGJqzFp7EzsYttYBfbODFhbWXC2sqEtZVdbOPEhLW4ye5pL2EfubKLbWDCWnwaOxO72AZ2sY0TE9ZWJqytTFhb2cU2TkxYi5vsnvYS9pEru9gGJqzFp7EzsYttYBfbODFhbWXC2sqEtZVdbOPEhLW4ye5pQ9hHw4S1mLAWE9ZWdrGNyoS1v+Rb2F0wYS0mrMUutlGZsLZyk93ThrCPhglrMWEtJqyt7GIblQlrf8m3sLtgwlpMWItdbKMyYW3lJrunDWEfDRPWYsJaTFhb2cU2KhPW/pJvYXfBhLWYsBa72EZlwtrKTXZPG8I+GiasxYS1mLC2sottVCas/SXfwu6CCWsxYS12sY3KhLWVm+yeNoR9NExYiwlrMWFtZRfbqExY+0u+hd0FE9ZiwlrsYhuVCWsrN9k9bQj7aJiwFhPWYsLayi62UZmw9pd8C7sLJqzFhLXYxTYqE9ZWbrJ6mj32xIS1mLC2cgrbxoS1mLAWE9biFLaNT2NnYhfbwIS1XzRhLX6B1VvYRzgxYS0mrK2cwrYxYS0mrMWEtTiFbePT2JnYxTYwYe0XTViLX2D1FvYRTkxYiwlrK6ewbUxYiwlrMWEtTmHb+DR2JnaxDUxY+0UT1uIXWL2FfYQTE9ZiwtrKKWwbE9ZiwlpMWItT2DY+jZ2JXWwDE9Z+0YS1+AVWb2Ef4cSEtZiwtnIK28aEtZiwFhPW4hS2jU9jZ2IX28CEtV80YS1+gdVb2Ec4MWEtJqytnMK2MWEtJqzFhLU4hW3j09iZ2MU2MGHtF01Yi1/gG7f4EeyPiF1sY8OEtdjFNjBh7YlT2DZOYds4hW3jFLaNm+ye9uPYHwu72MaGCWuxi21gwtoTp7BtnMK2cQrbxilsGzfZPe3HsT8WdrGNDRPWYhfbwIS1J05h2ziFbeMUto1T2DZusnvaj2N/LOxiGxsmrMUutoEJa0+cwrZxCtvGKWwbp7Bt3GT3tB/H/ljYxTY2TFiLXWwDE9aeOIVt4xS2jVPYNk5h27jJ7mk/jv2xsIttbJiwFrvYBiasPXEK28YpbBunsG2cwrZxk9XT7LFfNGFtZRfbOHEK28YutvFLdrGNyoS1mLC2sott4Carp9ljv2jC2soutnHiFLaNXWzjl+xiG5UJazFhbWUX28BNVk+zx37RhLWVXWzjxClsG7vYxi/ZxTYqE9ZiwtrKLraBm6yeZo/9oglrK7vYxolT2DZ2sY1fsottVCasxYS1lV1sAzdZPc0e+0UT1lZ2sY0Tp7Bt7GIbv2QX26hMWIsJayu72AZusnqaPfaLJqyt7GIbJ05h29jFNn7JLrZRmbAWE9ZWdrEN3GT1NHssvoXdBbvYxoldbAMT1mIX28CEtTiFbWPCWkxYiwlrK6ew7coutoGbrJ5mj8W3sLtgF9s4sYttYMJa7GIbmLAWp7BtTFiLCWsxYW3lFLZd2cU2cJPV0+yx+BZ2F+xiGyd2sQ1MWItdbAMT1uIUto0JazFhLSasrZzCtiu72AZusnqaPRbfwu6CXWzjxC62gQlrsYttYMJanMK2MWEtJqzFhLWVU9h2ZRfbwE1WT7PH4lvYXbCLbZzYxTYwYS12sQ1MWItT2DYmrMWEtZiwtnIK267sYhu4yepp9lh8C7sLdrGNE7vYBiasxS62gQlrcQrbxoS1mLAWE9ZWTmHblV1sAzdZPc0eiwlrT0xYiwlrK7vYxqRT2DY+jZ1Z2cU2/mV/kdVb20fDhLUnJqzFhLWVXWxj0ilsG5/GzqzsYhv/sr/I6q3to2HC2hMT1mLC2soutjHpFLaNT2NnVnaxjX/ZX2T11vbRMGHtiQlrMWFtZRfbmHQK28ansTMru9jGv+wvsnpr+2iYsPbEhLWYsLayi21MOoVt49PYmZVdbONf9hdZvbV9NExYe2LCWkxYW9nFNiadwrbxaezMyi628S/7i6ze2j4aJqw9MWEtdrGNN53CtrGLbZzYxTYm7WIb2MU2MGEtJqzFL7B6C/sImLD2xIS12MU23nQK28YutnFiF9uYtIttYBfbwIS1mLAWv8DqLewjYMLaExPWYhfbeNMpbBu72MaJXWxj0i62gV1sAxPWYsJa/AKrt7CPgAlrT0xYi11s402nsG3sYhsndrGNSbvYBnaxDUxYiwlr8Qus3sI+AiasPTFhLXaxjTedwraxi22c2MU2Ju1iG9jFNjBhLSasxS+wegv7CJiw9sSEtdjFNt50CtvGLrZxYhfbmLSLbWAX28CEtZiwFr/A6i3sI2DC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx2LC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx2LC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx2LC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx2LC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx2LC2hMT1mIX28CEtZiwFhPWYhfbwIS12MU2KrvYBnaxjcqEtTiFbWMX28BNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx+Jb2F2wi21gwtoTu9jGiQlrT0xYi1PY9oYJaysT1mLC2spNVk+zx37RhLXYxTZ+yS62cWIX28CEtZUJaysT1p7YxTbwC6zewj7CF01Yi11s45fsYhsndrENTFhbmbC2MmHtiV1sA7/A6i3sI3zRhLXYxTZ+yS62cWIX28CEtZUJaysT1p7YxTbwC6zewj7CF01Yi11s45fsYhsndrENTFhbmbC2MmHtiV1sA7/A6i3sI3zRhLXYxTZ+yS62cWIX28CEtZUJaysT1p7YxTbwC6zewj7CF01Yi11s45fsYhsndrENTFhbmbC2MmHtiV1sA7/AN25xuVwuf+D+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpef4f5gXS6Xn+H+YF0ul5/h/mBdLpcf4X//+z81DFanItACcwAAAABJRU5ErkJggg=="

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map