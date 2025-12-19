'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { ChevronSvg } from '../../img/chevron.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import styles from './ScrollTopButton.module.scss.js';

var _excluded = ["sekai", "themeMode", "pos"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ScrollTopButton = function ScrollTopButton(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'bottom-right' : _ref$pos,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  useEffect(function () {
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
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("button", _extends({}, rest, {
    className: clsx(styles["sekai-scroll-top-button-".concat(pos)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    onClick: handleScroll
  }), /*#__PURE__*/React.createElement(ChevronSvg, {
    className: clsx(styles['sekai-scroll-top-icon']),
    sekai: sekai,
    themeMode: themeMode
  })), document.body);
};

export { ScrollTopButton };
