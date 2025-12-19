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
var xxmiku = require('../../img/xxmiku.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var operation = require('../../utils/operation.js');
var XxMikuDialog_module = require('./XxMikuDialog.module.scss.js');

var _excluded = ["open", "themeMode", "children", "size", "containerComponent", "onClose", "title", "buttons"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var XxMikuDialog = function XxMikuDialog(_ref) {
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
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
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
    themeMode: themeMode,
    size: size,
    onClose: onClose,
    title: title
  };
  var xxButtonProps = React.useMemo(function () {
    return buttons === null || buttons === void 0 ? void 0 : buttons.map(function (button) {
      var type = button.type ? button.type : 'normal';
      return _objectSpread(_objectSpread({}, button), {}, {
        buttonStyle: clsx(XxMikuDialog_module["sekai-xxmiku-".concat(type, "-button")], XxMikuDialog_module["sekai-".concat(modeTheme)])
      });
    });
  }, [buttons, modeTheme]);
  var overlayProps = {
    id: 'xxmiku-dialog-overlay',
    open: open,
    themeMode: themeMode,
    containerComponent: containerComponent,
    centered: true
  };
  var buttonsProps = {
    themeMode: themeMode,
    buttons: xxButtonProps
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(Backdrop.Backdrop, overlayProps, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    className: clsx(XxMikuDialog_module["sekai-container-".concat(size)], XxMikuDialog_module["sekai-".concat(modeTheme)], rest.className),
    "aria-label": title || 'Dialog'
  }), /*#__PURE__*/React.createElement(xxmiku.XxMikuSvg, {
    className: XxMikuDialog_module["sekai-xxmiku-svg-1-".concat(size)]
  }), /*#__PURE__*/React.createElement(xxmiku.XxMikuSvg, {
    className: XxMikuDialog_module["sekai-xxmiku-svg-2-".concat(size)]
  }), /*#__PURE__*/React.createElement(xxmiku.XxMikuSvg, {
    className: XxMikuDialog_module["sekai-xxmiku-svg-3-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(xxmiku.XxMikuSvg, {
    className: XxMikuDialog_module["sekai-xxmiku-svg-4-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(xxmiku.XxMikuSvg, {
    className: XxMikuDialog_module["sekai-xxmiku-svg-5-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement("div", {
    className: XxMikuDialog_module['sekai-content-wrap']
  }, /*#__PURE__*/React.createElement(Dialog.DialogTitleHeader, _extends({
    id: "xo-miku-dialog-header"
  }, headerProps)), children, /*#__PURE__*/React.createElement(Dialog.DialogButtons, _extends({
    id: "xo-miku-dialog-buttons",
    className: XxMikuDialog_module['sekai-xxmiku-button']
  }, buttonsProps))))), portalContainer);
};

exports.XxMikuDialog = XxMikuDialog;
