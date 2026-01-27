'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var arrow = require('../../img/arrow.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var StylishButton_module = require('./StylishButton.module.scss.js');

var _excluded = ["sekai", "themeMode", "children", "disabled", "arrowIcon"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var StylishButton = function StylishButton(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$arrowIcon = _ref.arrowIcon,
    arrowIcon = _ref$arrowIcon === void 0 ? true : _ref$arrowIcon,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.3 : 0.5);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    ref: rest.ref,
    type: "button",
    className: clsx(StylishButton_module["sekai-stylish-button-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    disabled: disabled
  }), /*#__PURE__*/React.createElement("div", {
    className: StylishButton_module['sekai-stylish-button-decoration']
  }), children, arrowIcon ? /*#__PURE__*/React.createElement(arrow.ArrowSvg, {
    className: StylishButton_module['sekai-stylish-arrow-icon'],
    vector: "right"
  }) : null);
};

exports.StylishButton = StylishButton;
