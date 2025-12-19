'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var Drawer_module = require('./Drawer.module.scss.js');

var _excluded = ["sekai", "themeMode", "open", "onClose", "children", "containerComponent", "pos"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Drawer = function Drawer(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    onClose = _ref.onClose,
    children = _ref.children,
    containerComponent = _ref.containerComponent,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'right' : _ref$pos,
    rest = _objectWithoutProperties(_ref, _excluded);
  var displayDrawer = open ? 'sekai-drawer-visible' : 'sekai-drawer-hidden';
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = {
    '--sekai-color-bg': sekaiColorBg
  };
  var posAbsoluteStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement("div", {
    className: clsx(global_module["sekai-overlay-".concat(modeTheme)], Drawer_module['sekai-drawer'], Drawer_module[displayDrawer]),
    style: posAbsoluteStyle,
    "aria-hidden": "true",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(Drawer_module["sekai-drawer-contents-".concat(pos)], Drawer_module[displayDrawer], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    role: "presentation",
    tabIndex: -1,
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }), children)), portalContainer);
};

exports.Drawer = Drawer;
