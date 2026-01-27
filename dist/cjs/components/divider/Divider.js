'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var sekaiColors = require('../../styles/sekai-colors.js');
var Divider_module = require('./Divider.module.scss.js');

var _excluded = ["sekai", "themeMode", "children", "pairColor", "lineHeight", "variant", "textAlign", "shadow"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DEFAULT_LINE_HEIGHT = '2px';
var Divider = function Divider(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    pairColor = _ref.pairColor,
    lineHeight = _ref.lineHeight,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'fullWidth' : _ref$variant,
    _ref$textAlign = _ref.textAlign,
    textAlign = _ref$textAlign === void 0 ? 'center' : _ref$textAlign,
    shadow = _ref.shadow,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var gradientColor = pairColor ? sekaiColors.colorsSekai[pairColor] : 'transparent';
  var shadowStyle = Boolean(shadow) ? Divider_module["sekai-divider-shadow-".concat(modeTheme)] : '';
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-pair-color': gradientColor,
    '--divider-line-height': getLineHeightStyle(lineHeight)
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(Divider_module["sekai-divider-".concat(variant)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), children ? /*#__PURE__*/React.createElement("div", {
    role: "separator",
    "aria-orientation": "horizontal",
    className: clsx(Divider_module["sekai-divider-with-item-".concat(textAlign)], shadowStyle)
  }, children) : /*#__PURE__*/React.createElement("hr", {
    role: "separator",
    "aria-orientation": "horizontal",
    className: clsx(Divider_module['sekai-divider-line'], shadowStyle)
  }));
};
var getLineHeightStyle = function getLineHeightStyle(lineHeight) {
  if (typeof lineHeight === 'number' && lineHeight >= 0) return "".concat(lineHeight, "px");
  if (typeof lineHeight === 'string') return lineHeight;
  return DEFAULT_LINE_HEIGHT;
};

exports.Divider = Divider;
