'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { ConsoleWarning } from '../../internal/logging.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import globalStyles from '../../styles/global.module.scss.js';
import { ListContext } from './List.js';
import styles from './List.module.scss.js';

var _excluded = ["sekai", "themeMode", "children", "as", "icon"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ListItemText = function ListItemText(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'p' : _ref$as,
    icon = _ref.icon,
    rest = _objectWithoutProperties(_ref, _excluded);
  var isListWrap = useContext(ListContext);
  if (!isListWrap) ConsoleWarning('⚠ Warning: <ListItemText> should be used inside <List>');
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var isChildrenElement = hasReactElement(children);
  var Component = as;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("li", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles['sekai-list-item-text'], globalStyles["sekai-color-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), getImgComponent(icon), isChildrenElement ? children : /*#__PURE__*/React.createElement(Component, null, children));
};
var getImgComponent = function getImgComponent(icon) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return /*#__PURE__*/React.createElement("img", {
      className: styles['sekai-list-icon'],
      src: icon,
      alt: ""
    });
  } else {
    return icon;
  }
};
var hasReactElement = function hasReactElement(children) {
  return React.Children.toArray(children).some(function (child) {
    return /*#__PURE__*/React.isValidElement(child);
  });
};

export { ListItemText };
