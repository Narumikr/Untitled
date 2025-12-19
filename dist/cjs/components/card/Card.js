'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var Card_module = require('./Card.module.scss.js');

var _excluded = ["id", "className", "style", "sekai", "themeMode", "children"],
  _excluded2 = ["sekai", "themeMode", "title", "underline"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Card = function Card(_ref) {
  var id = _ref.id,
    className = _ref.className,
    style = _ref.style,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    divProps = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var sekaiColoShadow = converter.convertHexToRgba(sekaiColor, 0.75);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-shadow': sekaiColoShadow
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, divProps, {
    id: id,
    className: clsx(Card_module['sekai-card'], global_module["sekai-color-".concat(modeTheme)], className),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }), children);
};
var CardContent = function CardContent(_ref2) {
  var id = _ref2.id,
    className = _ref2.className,
    style = _ref2.style,
    themeMode = _ref2.themeMode,
    children = _ref2.children;
  var _useOptionalSekai2 = useOptionalSekai.useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai2.modeTheme;
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    style: style,
    className: clsx(Card_module['sekai-card-content'], global_module["sekai-color-".concat(modeTheme)], className)
  }, children);
};
var CardTitle = function CardTitle(_ref3) {
  var sekai = _ref3.sekai,
    themeMode = _ref3.themeMode,
    title = _ref3.title,
    underline = _ref3.underline,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var _useOptionalSekai3 = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai3.sekaiColor,
    modeTheme = _useOptionalSekai3.modeTheme;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("h3", _extends({}, rest, {
    className: clsx(Card_module['sekai-card-title'], global_module["sekai-color-".concat(modeTheme)], underline && Card_module['sekai-underline'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), title);
};

exports.Card = Card;
exports.CardContent = CardContent;
exports.CardTitle = CardTitle;
