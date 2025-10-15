'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './Card.module.scss.js';

var _excluded = ["sekai", "themeMode", "children"],
  _excluded2 = ["themeMode", "children"],
  _excluded3 = ["sekai", "themeMode", "title", "underline"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Card = function Card(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var sekaiColoShadow = convertHexToRgba(sekaiColor, 0.25);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-shadow': sekaiColoShadow
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(styles['sekai-card'], globalStyles["sekai-color-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), children);
};
var CardContent = function CardContent(_ref2) {
  var themeMode = _ref2.themeMode,
    children = _ref2.children,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var _useOptionalSekai2 = useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai2.modeTheme;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(styles['sekai-card-content'], globalStyles["sekai-color-".concat(modeTheme)], rest.className)
  }), children);
};
var CardTitle = function CardTitle(_ref3) {
  var sekai = _ref3.sekai,
    themeMode = _ref3.themeMode,
    title = _ref3.title,
    underline = _ref3.underline,
    rest = _objectWithoutProperties(_ref3, _excluded3);
  var _useOptionalSekai3 = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai3.sekaiColor,
    modeTheme = _useOptionalSekai3.modeTheme;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("h3", _extends({}, rest, {
    className: clsx(styles['sekai-card-title'], globalStyles["sekai-color-".concat(modeTheme)], underline && styles['sekai-underline'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), title);
};

export { Card, CardContent, CardTitle };
