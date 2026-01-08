'use client';
'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var UtilText_module = require('./UtilText.module.scss.js');

var _excluded = ["themeMode", "children"],
  _excluded2 = ["sekai", "children"],
  _excluded3 = ["themeMode", "children"],
  _excluded4 = ["sekai", "children"],
  _excluded5 = ["themeMode", "children"],
  _excluded6 = ["sekai", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BodyText = function BodyText(_ref) {
  var themeMode = _ref.themeMode,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(UtilText_module["sekai-body-text-".concat(modeTheme)], global_module['text-responsible-body'], rest.className)
  }), children);
};
var SekaiBodyText = function SekaiBodyText(_ref2) {
  var sekai = _ref2.sekai,
    children = _ref2.children,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var _useOptionalSekai2 = useOptionalSekai.useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai2.sekaiColor;
  var colorStyle = {
    color: sekaiColor
  };
  return /*#__PURE__*/React.createElement(BodyText, _extends({}, rest, {
    style: _objectSpread(_objectSpread({}, colorStyle), rest.style)
  }), children);
};
var DetailText = function DetailText(_ref3) {
  var themeMode = _ref3.themeMode,
    children = _ref3.children,
    rest = _objectWithoutProperties(_ref3, _excluded3);
  var _useOptionalSekai3 = useOptionalSekai.useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai3.modeTheme;
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(UtilText_module["sekai-detail-text-".concat(modeTheme)], global_module['text-xs'], rest.className)
  }), children);
};
var SekaiDetailText = function SekaiDetailText(_ref4) {
  var sekai = _ref4.sekai,
    children = _ref4.children,
    rest = _objectWithoutProperties(_ref4, _excluded4);
  var _useOptionalSekai4 = useOptionalSekai.useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai4.sekaiColor;
  var colorStyle = {
    color: sekaiColor
  };
  return /*#__PURE__*/React.createElement(DetailText, _extends({}, rest, {
    style: _objectSpread(_objectSpread({}, colorStyle), rest.style)
  }), children);
};
var AnnotationText = function AnnotationText(_ref5) {
  var themeMode = _ref5.themeMode,
    children = _ref5.children,
    rest = _objectWithoutProperties(_ref5, _excluded5);
  var _useOptionalSekai5 = useOptionalSekai.useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai5.modeTheme;
  return /*#__PURE__*/React.createElement(DetailText, _extends({}, rest, {
    className: clsx(UtilText_module["sekai-annotation-text-".concat(modeTheme)], rest.className)
  }), children);
};
var SekaiAnnotationText = function SekaiAnnotationText(_ref6) {
  var sekai = _ref6.sekai,
    children = _ref6.children,
    rest = _objectWithoutProperties(_ref6, _excluded6);
  var _useOptionalSekai6 = useOptionalSekai.useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai6.sekaiColor,
    isLight = _useOptionalSekai6.isLight;
  var annotationColor = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var colorStyle = {
    color: annotationColor
  };
  return /*#__PURE__*/React.createElement(DetailText, _extends({}, rest, {
    style: _objectSpread(_objectSpread({}, colorStyle), rest.style)
  }), children);
};

exports.AnnotationText = AnnotationText;
exports.BodyText = BodyText;
exports.DetailText = DetailText;
exports.SekaiAnnotationText = SekaiAnnotationText;
exports.SekaiBodyText = SekaiBodyText;
exports.SekaiDetailText = SekaiDetailText;
