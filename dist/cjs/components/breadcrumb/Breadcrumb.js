'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var Breadcrumb_module = require('./Breadcrumb.module.scss.js');

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
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var items = React.Children.toArray(children).flatMap(function (child) {
    if (/*#__PURE__*/React.isValidElement(child) && child.type === React.Fragment) {
      var el = child;
      return React.Children.toArray(el.props.children);
    }
    return [child];
  });
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    "aria-label": "breadcrumb-".concat(rest.id),
    className: clsx(Breadcrumb_module['sekai-breadcrumb'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("ol", null, items.map(function (el, idx) {
    return /*#__PURE__*/React.createElement("li", {
      key: "breadcrumb-item-".concat(idx),
      className: clsx(Breadcrumb_module['sekai-breadcrumb-item'], Breadcrumb_module["sekai-breadcrumb-text-".concat(modeTheme)])
    }, el, idx < items.length - 1 && /*#__PURE__*/React.createElement("span", {
      className: clsx(Breadcrumb_module['sekai-breadcrumb-separator'])
    }, separatorMap[separator]));
  })));
};

exports.Breadcrumb = Breadcrumb;
