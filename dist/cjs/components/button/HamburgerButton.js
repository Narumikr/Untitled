'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var HamburgerButton_module = require('./HamburgerButton.module.scss.js');

var _excluded = ["sekai", "themeMode", "open"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var HamburgerButton = function HamburgerButton(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var sekaiColorBg = converter.convertHexToRgba(sekaiColor, 0.8);
  var optionStyle = {
    '--sekai-color-bg': sekaiColorBg
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    ref: rest.ref,
    type: "button",
    className: clsx(HamburgerButton_module["sekai-hamburger-button-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    "aria-expanded": open,
    "aria-label": open ? 'Close menu' : 'Open menu'
  }), Array.from({
    length: 3
  }).map(function (_, index) {
    return /*#__PURE__*/React.createElement("span", {
      key: "hamburger-line-".concat(index),
      className: clsx(HamburgerButton_module['sekai-hamburger-line'], open && HamburgerButton_module['sekai-open'])
    });
  }));
};

exports.HamburgerButton = HamburgerButton;
