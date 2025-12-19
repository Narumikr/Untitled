'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import styles from './TextLink.module.scss.js';

var _excluded = ["sekai", "themeMode", "text", "href", "isExternal", "disabled", "ariaLabel"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TextLink = function TextLink(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    text = _ref.text,
    href = _ref.href,
    _ref$isExternal = _ref.isExternal,
    isExternal = _ref$isExternal === void 0 ? true : _ref$isExternal,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    ariaLabel = _ref.ariaLabel,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.6);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  return /*#__PURE__*/React.createElement("a", _extends({}, rest, {
    className: clsx(styles["sekai-text-link-".concat(modeTheme)], disabled && styles['sekai-disabled'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    href: href,
    "aria-label": ariaLabel,
    "aria-disabled": disabled,
    target: isExternal ? '_blank' : '_self',
    rel: "noopener noreferrer"
  }), text);
};

export { TextLink };
