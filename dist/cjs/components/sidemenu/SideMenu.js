'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var HamburgerButton = require('../button/HamburgerButton.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var SideMenu_module = require('./SideMenu.module.scss.js');

var _excluded = ["sekai", "themeMode", "open", "onClick", "children", "pos", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SideMenu = function SideMenu(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$open = _ref.open,
    open = _ref$open === void 0 ? false : _ref$open,
    onClick = _ref.onClick,
    children = _ref.children,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'left' : _ref$pos,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var _useState = React.useState(open),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  React.useEffect(function () {
    setIsOpen(open);
  }, [open]);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var posAbsoluteStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  var handleClick = function handleClick() {
    setIsOpen(!isOpen);
    onClick === null || onClick === void 0 || onClick();
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(SideMenu_module["sekai-side-menu-".concat(pos)], _defineProperty(_defineProperty({}, SideMenu_module['sekai-side-menu-open'], isOpen), SideMenu_module['sekai-side-menu-closed'], !isOpen), rest.className),
    style: _objectSpread(_objectSpread(_objectSpread({}, optionStyle), posAbsoluteStyle), rest.style)
  }), /*#__PURE__*/React.createElement(HamburgerButton.HamburgerButton, {
    id: rest.id ? "".concat(rest.id, "-side-menu-btn") : 'sekai-side-menu-btn',
    className: clsx(SideMenu_module['sekai-side-menu-hamburger-btn']),
    sekai: sekai,
    themeMode: themeMode,
    open: isOpen,
    onClick: handleClick
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(global_module['sekai-invisible-scroll'], SideMenu_module['sekai-side-menu-contents'])
  }, children)), portalContainer);
};

exports.SideMenu = SideMenu;
