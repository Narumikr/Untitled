'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var Backdrop = require('../backdrop/Backdrop.js');
var Dialog = require('./Dialog.js');
var useThemeMode = require('../../hooks/useThemeMode.js');
var xomiku = require('../../img/xomiku.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var operation = require('../../utils/operation.js');
var XoMikuDialog_module = require('./XoMikuDialog.module.scss.js');

var _excluded = ["open", "themeMode", "children", "size", "containerComponent", "onClose", "title", "buttons"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var XoMikuDialog = function XoMikuDialog(_ref) {
  var open = _ref.open,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    containerComponent = _ref.containerComponent,
    onClose = _ref.onClose,
    title = _ref.title,
    buttons = _ref.buttons,
    rest = _objectWithoutProperties(_ref, _excluded);
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  React.useEffect(function () {
    if (!open) return;
    var handleKeyDownEsc = operation.fireOnEscapeKey(onClose);
    document.addEventListener('keydown', handleKeyDownEsc);
    return function () {
      return document.removeEventListener('keydown', handleKeyDownEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  var headerProps = {
    size: size,
    onClose: onClose,
    title: title
  };
  var xoButtonProps = React.useMemo(function () {
    return buttons === null || buttons === void 0 ? void 0 : buttons.map(function (button) {
      var type = button.type ? button.type : 'normal';
      return _objectSpread(_objectSpread({}, button), {}, {
        buttonStyle: clsx(XoMikuDialog_module["sekai-xomiku-".concat(type, "-button")])
      });
    });
  }, [buttons]);
  var overlayProps = {
    id: 'xomiku-dialog-overlay',
    open: open,
    themeMode: themeMode,
    containerComponent: containerComponent,
    centered: true
  };
  var buttonsProps = {
    themeMode: useThemeMode.LIGHT_MODE,
    buttons: xoButtonProps
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(Backdrop.Backdrop, overlayProps, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    ref: rest.ref,
    className: clsx(XoMikuDialog_module["sekai-container-".concat(size)], rest.className),
    "aria-label": title || 'Dialog'
  }), /*#__PURE__*/React.createElement(xomiku.XoMikuSvg, {
    className: XoMikuDialog_module["sekai-xomiku-svg-1-".concat(size)]
  }), /*#__PURE__*/React.createElement(xomiku.XoMikuSvg, {
    className: XoMikuDialog_module["sekai-xomiku-svg-2-".concat(size)]
  }), /*#__PURE__*/React.createElement(xomiku.XoMikuSvg, {
    className: XoMikuDialog_module["sekai-xomiku-svg-3-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(xomiku.XoMikuSvg, {
    className: XoMikuDialog_module["sekai-xomiku-svg-4-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(xomiku.XoMikuSvg, {
    className: XoMikuDialog_module["sekai-xomiku-svg-5-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement("div", {
    className: XoMikuDialog_module['sekai-content-wrap']
  }, /*#__PURE__*/React.createElement(Dialog.DialogTitleHeader, _extends({
    id: "xo-miku-dialog-header"
  }, headerProps)), children, /*#__PURE__*/React.createElement(Dialog.DialogButtons, _extends({
    id: "xo-miku-dialog-buttons",
    className: XoMikuDialog_module['sekai-xomiku-button']
  }, buttonsProps))))), portalContainer);
};

exports.XoMikuDialog = XoMikuDialog;
