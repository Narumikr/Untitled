'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var clear = require('../../img/clear.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var Chip_module = require('./Chip.module.scss.js');

var _excluded = ["sekai", "themeMode", "label", "onClick", "onDelete", "size", "variant"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Chip = function Chip(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    label = _ref.label,
    onClick = _ref.onClick,
    onDelete = _ref.onDelete,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'filled' : _ref$variant,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiBgColor = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-bg-color': sekaiBgColor
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "button",
    tabIndex: 0
  }, rest, {
    ref: rest.ref,
    className: clsx(Chip_module["sekai-chip-".concat(size)], Chip_module["sekai-chip-".concat(variant)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    onClick: onClick
  }), /*#__PURE__*/React.createElement("span", {
    className: clsx(Chip_module['sekai-chip-label'])
  }, label), /*#__PURE__*/React.createElement(DeleteIconButton, {
    sekai: sekai,
    themeMode: themeMode,
    size: size,
    onDelete: onDelete
  }));
};
var DeleteIconButton = function DeleteIconButton(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode,
    size = _ref2.size,
    onDelete = _ref2.onDelete;
  if (!onDelete) return null;
  return /*#__PURE__*/React.createElement("button", {
    className: clsx(Chip_module['sekai-chip-delete-btn'], Chip_module["sekai-chip-delete-btn-".concat(size)]),
    onClick: onDelete,
    "aria-label": "delete"
  }, /*#__PURE__*/React.createElement(clear.ClearSvg, {
    sekai: sekai,
    themeMode: themeMode
  }));
};

exports.Chip = Chip;
