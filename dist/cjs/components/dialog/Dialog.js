'use client';
'use strict';

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var Backdrop = require('../backdrop/Backdrop.js');
var clear = require('../../img/clear.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var converter = require('../../utils/converter.js');
var operation = require('../../utils/operation.js');
var global_module = require('../../styles/global.module.scss.js');
var Dialog_module = require('./Dialog.module.scss.js');

var _excluded = ["sekai", "open", "themeMode", "children", "containerComponent", "size", "onClose", "title", "showCloseIcon", "buttons", "dialogButtons"],
  _excluded2 = ["sekai", "themeMode", "size", "onClose", "title", "showCloseIcon"],
  _excluded3 = ["sekai", "themeMode", "buttons"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Dialog = function Dialog(_ref) {
  var sekai = _ref.sekai,
    open = _ref.open,
    themeMode = _ref.themeMode,
    children = _ref.children,
    containerComponent = _ref.containerComponent,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onClose = _ref.onClose,
    title = _ref.title,
    _ref$showCloseIcon = _ref.showCloseIcon,
    showCloseIcon = _ref$showCloseIcon === void 0 ? false : _ref$showCloseIcon,
    buttons = _ref.buttons,
    dialogButtons = _ref.dialogButtons,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  React.useEffect(function () {
    if (!open) return;
    var handleKeyDownEsc = operation.fireOnEscapeKey(onClose);
    document.addEventListener('keydown', handleKeyDownEsc);
    return function () {
      return document.removeEventListener('keydown', handleKeyDownEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  var overlayProps = {
    open: open,
    themeMode: themeMode,
    containerComponent: containerComponent
  };
  var headerProps = {
    sekai: sekai,
    themeMode: themeMode,
    size: size,
    onClose: onClose,
    title: title,
    showCloseIcon: showCloseIcon
  };
  var buttonsProps = {
    sekai: sekai,
    themeMode: themeMode,
    buttons: buttons
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(Backdrop.Backdrop, _extends({}, overlayProps, {
    centered: true
  }), /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    className: clsx(global_module["sekai-color-".concat(modeTheme)], Dialog_module["sekai-container-".concat(size)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    "aria-label": title || 'Dialog'
  }), /*#__PURE__*/React.createElement("div", {
    className: Dialog_module['sekai-content-wrap']
  }, /*#__PURE__*/React.createElement(DialogTitleHeader, headerProps), children), dialogButtons || /*#__PURE__*/React.createElement(DialogButtons, buttonsProps))), portalContainer);
};
var DialogTitleHeader = function DialogTitleHeader(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode,
    size = _ref2.size,
    onClose = _ref2.onClose,
    title = _ref2.title,
    showCloseIcon = _ref2.showCloseIcon,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  if (!title && !showCloseIcon) return null;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(Dialog_module["sekai-title-header-".concat(size)], rest.className)
  }), /*#__PURE__*/React.createElement("h2", null, title), showCloseIcon ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: Dialog_module['sekai-close-icon'],
    onClick: onClose
  }, /*#__PURE__*/React.createElement(clear.ClearSvg, {
    sekai: sekai,
    themeMode: themeMode
  })) : null);
};
var DialogButtons = function DialogButtons(_ref3) {
  var sekai = _ref3.sekai,
    themeMode = _ref3.themeMode,
    buttons = _ref3.buttons,
    rest = _objectWithoutProperties(_ref3, _excluded3);
  var _useOptionalSekai2 = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai2.sekaiColor,
    modeTheme = _useOptionalSekai2.modeTheme,
    isLight = _useOptionalSekai2.isLight;
  if (!buttons || !buttons.length) return null;
  var buttonLength = buttons.length;
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var sekaiColorStrongHover = converter.convertHexToRgba(sekaiColor, 0.8);
  var sekaiColorStrongDisabled = converter.convertHexToRgba(sekaiColor, 0.5);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
    '--sekai-color-strong-hover': sekaiColorStrongHover,
    '--sekai-color-disabled': sekaiColorStrongDisabled
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(Dialog_module['sekai-buttons-area'], rest.className)
  }), _toConsumableArray(buttons.slice(0, 2)).map(function (el, index) {
    return /*#__PURE__*/React.createElement("button", {
      id: "".concat(rest.id ? rest.id : 'dialog-button', "-").concat(index + 1),
      key: el.text,
      type: "button",
      onClick: el.onClick,
      disabled: Boolean(el.disabled),
      "aria-label": el.ariaLabel || el.text,
      className: clsx(global_module["sekai-color-".concat(modeTheme)], Dialog_module["sekai-dialog-".concat(el.type || 'normal', "-button-").concat(buttonLength, "-").concat(index)], Dialog_module["sekai-".concat(modeTheme)], el.buttonStyle || ''),
      style: optionStyle
    }, el.text);
  }));
};

exports.Dialog = Dialog;
exports.DialogButtons = DialogButtons;
exports.DialogTitleHeader = DialogTitleHeader;
