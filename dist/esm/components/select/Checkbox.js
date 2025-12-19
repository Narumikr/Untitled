'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import styles from './Checkbox.module.scss.js';

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
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.3 : 0.4);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  var handleChange = function handleChange(e) {
    onChange === null || onChange === void 0 || onChange(e.target.checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    className: clsx(styles['sekai-checkbox'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    tabIndex: Boolean(disabled) ? -1 : 0,
    type: "checkbox",
    className: clsx(styles["sekai-checkbox-".concat(modeTheme)], _defineProperty({}, styles['sekai-checkbox-filling'], filling)),
    checked: Boolean(checked),
    "aria-checked": Boolean(checked),
    disabled: Boolean(disabled),
    onChange: handleChange
  })));
};

export { Checkbox };
