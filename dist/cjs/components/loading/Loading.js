'use client';
'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var Loading_module = require('./Loading.module.scss.js');

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Loading = function Loading(_ref) {
  var id = _ref.id,
    className = _ref.className,
    style = _ref.style,
    sekai = _ref.sekai,
    ref = _ref.ref;
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai.sekaiColor;
  var CIRCLE_COUNT = 8;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    role: "status",
    "aria-live": "polite",
    ref: ref,
    className: clsx(Loading_module['sekai-loading'], className),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }, Array.from({
    length: CIRCLE_COUNT
  }, function (_, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: "circle-".concat(index),
      className: clsx(Loading_module['sekai-loading-circle'], Loading_module["sekai-circle-animation-".concat(index)])
    });
  }));
};

exports.Loading = Loading;
