'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var UtilText = require('../text/UtilText.js');
var clear = require('../../img/clear.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var Toast_module = require('./Toast.module.scss.js');

var _excluded = ["sekai", "themeMode", "open", "onClose", "pos", "message", "isError", "duration", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Toast = function Toast(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    onClose = _ref.onClose,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'bottom' : _ref$pos,
    message = _ref.message,
    _ref$isError = _ref.isError,
    isError = _ref$isError === void 0 ? false : _ref$isError,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 3000 : _ref$duration,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = _objectSpread({
    '--sekai-color-bg': sekaiColorBg
  }, containerComponent && {
    position: 'absolute'
  });
  var displayMsg = Array.isArray(message) ? message : [message];
  React.useEffect(function () {
    var timer = open ? setTimeout(function () {
      onClose();
    }, duration) : undefined;
    return function () {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(Toast_module["sekai-toast-".concat(pos)], _defineProperty({}, Toast_module['sekai-toast-open'], open), rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(Toast_module['sekai-toast-message'])
  }, displayMsg.map(function (msg) {
    return /*#__PURE__*/React.createElement(UtilText.BodyText, {
      key: msg,
      className: clsx(global_module["sekai-text-".concat(modeTheme)], _defineProperty({}, Toast_module['sekai-toast-error'], isError))
    }, msg);
  })), /*#__PURE__*/React.createElement("button", {
    className: clsx(Toast_module['sekai-toast-close-button']),
    onClick: onClose
  }, /*#__PURE__*/React.createElement(clear.ClearSvg, {
    sekai: sekai,
    themeMode: themeMode,
    className: Toast_module['sekai-toast-icon']
  }))), portalContainer);
};

exports.Toast = Toast;
