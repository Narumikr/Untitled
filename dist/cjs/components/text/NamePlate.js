'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var NamePlate_module = require('./NamePlate.module.scss.js');

var _excluded = ["sekai", "themeMode", "text", "colorCount"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var NamePlate = function NamePlate(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    text = _ref.text,
    _ref$colorCount = _ref.colorCount,
    colorCount = _ref$colorCount === void 0 ? 1 : _ref$colorCount,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var colorText = text.slice(0, colorCount);
  var normalText = text.slice(colorCount);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(NamePlate_module["sekai-name-plate-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("span", {
    className: NamePlate_module['sekai-name-plate-color']
  }, colorText), /*#__PURE__*/React.createElement("span", null, normalText));
};

exports.NamePlate = NamePlate;
