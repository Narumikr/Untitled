'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var Checkbox_module = require('./Checkbox.module.scss.js');

var _excluded = ["sekai", "themeMode", "checked", "disabled", "onChange", "filling"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = function Checkbox(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    checked = _ref.checked,
    disabled = _ref.disabled,
    onChange = _ref.onChange,
    filling = _ref.filling,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.3 : 0.4);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  var handleChange = function handleChange(e) {
    onChange === null || onChange === void 0 || onChange(e.target.checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    className: clsx(Checkbox_module['sekai-checkbox'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    ref: rest.ref,
    tabIndex: Boolean(disabled) ? -1 : 0,
    type: "checkbox",
    className: clsx(Checkbox_module["sekai-checkbox-".concat(modeTheme)], _defineProperty({}, Checkbox_module['sekai-checkbox-filling'], filling)),
    checked: Boolean(checked),
    "aria-checked": Boolean(checked),
    disabled: Boolean(disabled),
    onChange: handleChange
  })));
};

exports.Checkbox = Checkbox;
