'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var logging = require('../../internal/logging.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var global_module = require('../../styles/global.module.scss.js');
var List = require('./List.js');
var List_module = require('./List.module.scss.js');

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
  var isListWrap = React.useContext(List.ListContext);
  if (!isListWrap) logging.ConsoleWarning('⚠ Warning: <ListItemText> should be used inside <List>');
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
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
    className: clsx(List_module['sekai-list-item-text'], global_module["sekai-color-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), getImgComponent(icon), isChildrenElement ? children : /*#__PURE__*/React.createElement(Component, null, children));
};
var getImgComponent = function getImgComponent(icon) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return /*#__PURE__*/React.createElement("img", {
      className: List_module['sekai-list-icon'],
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

exports.ListItemText = ListItemText;
