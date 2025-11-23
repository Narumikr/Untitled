'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import styles from './Breadcrumb.module.scss.js';

var _excluded = ["sekai", "themeMode", "children", "separator"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var separatorMap = {
  slash: '/',
  arrow: '→',
  chevron: '>',
  dot: '•',
  pipe: '|'
};
var Breadcrumb = function Breadcrumb(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? 'slash' : _ref$separator,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var items = React.Children.toArray(children).flatMap(function (el) {
    return /*#__PURE__*/React.isValidElement(el) && el.type === React.Fragment ? React.Children.toArray(el.props.children) : [el];
  });
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    "aria-label": "breadcrumb-".concat(rest.id),
    className: clsx(styles['sekai-breadcrumb'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("ol", null, items.map(function (el, idx) {
    return /*#__PURE__*/React.createElement("li", {
      key: "breadcrumb-item-".concat(idx),
      className: clsx(styles['sekai-breadcrumb-item'], styles["sekai-breadcrumb-text-".concat(modeTheme)])
    }, el, idx < items.length - 1 && /*#__PURE__*/React.createElement("span", {
      className: clsx(styles['sekai-breadcrumb-separator'])
    }, separatorMap[separator]));
  })));
};

export { Breadcrumb };
