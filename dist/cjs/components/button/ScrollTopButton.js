'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var chevron = require('../../img/chevron.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var ScrollTopButton_module = require('./ScrollTopButton.module.scss.js');

var _excluded = ["sekai", "themeMode", "pos"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ScrollTopButton = function ScrollTopButton(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'bottom-right' : _ref$pos,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  React.useEffect(function () {
    var handleScroll = function handleScroll() {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  var handleScroll = function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (!isVisible) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement("button", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(ScrollTopButton_module["sekai-scroll-top-button-".concat(pos)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    onClick: handleScroll
  }), /*#__PURE__*/React.createElement(chevron.ChevronSvg, {
    className: clsx(ScrollTopButton_module['sekai-scroll-top-icon']),
    sekai: sekai,
    themeMode: themeMode
  })), document.body);
};

exports.ScrollTopButton = ScrollTopButton;
