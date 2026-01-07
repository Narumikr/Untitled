'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var global_module = require('../../styles/global.module.scss.js');
var List_module = require('./List.module.scss.js');

var _excluded = ["sekai", "themeMode", "children", "as", "noBullet"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ListContext = /*#__PURE__*/React.createContext(false);
var List = function List(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'ul' : _ref$as,
    _ref$noBullet = _ref.noBullet,
    noBullet = _ref$noBullet === void 0 ? true : _ref$noBullet,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var Component = as;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var listStyleType = noBullet ? 'none' : undefined;
  var paddingLeft = noBullet ? '16px' : '36px';
  return /*#__PURE__*/React.createElement(ListContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: rest.ref,
    className: clsx(global_module["sekai-color-".concat(modeTheme)], List_module['sekai-list'], rest.className),
    style: _objectSpread(_objectSpread({
      listStyleType: listStyleType,
      paddingLeft: paddingLeft
    }, optionStyle), rest.style)
  }), children));
};

exports.List = List;
exports.ListContext = ListContext;
