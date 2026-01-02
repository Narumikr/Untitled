'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useRef, useState, useMemo, Children, useEffect, isValidElement } from 'react';
import clsx from 'clsx';
import { LIGHT_MODE } from '../../hooks/useThemeMode.js';
import { BACKGROUND_LIGHT_MODE, BACKGROUND_DARK_MODE } from '../../internal/color.constant.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import styles from './MarqueeText.module.scss.js';

var _excluded = ["sekai", "themeMode", "children", "duration", "parentBackgroundColor"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MarqueeText = function MarqueeText(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    duration = _ref.duration,
    parentBackgroundColor = _ref.parentBackgroundColor,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var containerRef = useRef(null);
  var textWrapRef = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    excessiveLength = _useState2[0],
    setExcessiveLength = _useState2[1];
  var _useState3 = useState(duration !== null && duration !== void 0 ? duration : 0),
    _useState4 = _slicedToArray(_useState3, 2),
    durationState = _useState4[0],
    setDurationState = _useState4[1];
  var containerBackground = useMemo(function () {
    if (parentBackgroundColor) return parentBackgroundColor;
    return getBackgroundColor(containerRef, modeTheme);
  }, [modeTheme, parentBackgroundColor]);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--background-color-container': containerBackground,
    '--scroll-duration': "".concat(durationState, "s")
  };
  var clonedChildren = Children.map(children, function (child) {
    if (/*#__PURE__*/React.isValidElement(child) && typeof child.type === 'string') {
      return /*#__PURE__*/React.cloneElement(child, {
        ref: textWrapRef
      });
    }
    return child;
  });
  useEffect(function () {
    if (!textWrapRef.current || !containerRef.current) return;
    var resizeObserver = new ResizeObserver(function () {
      if (textWrapRef.current && containerRef.current) {
        var textRefWidth = textWrapRef.current.offsetWidth;
        var containerRefWidth = containerRef.current.offsetWidth;
        setExcessiveLength(textRefWidth > containerRefWidth);
      }
    });
    resizeObserver.observe(containerRef.current);
    return function () {
      return resizeObserver.disconnect();
    };
  }, [children]);
  useEffect(function () {
    if (duration) return;
    if (textWrapRef.current && excessiveLength) {
      var calcDuration = textWrapRef.current.offsetWidth / 50;
      setDurationState(calcDuration);
    }
  }, [duration, excessiveLength]);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: containerRef,
    className: clsx(styles['sekai-marquee-text'], _defineProperty(_defineProperty({}, styles['sekai-marquee-text-scroll'], excessiveLength), styles['sekai-marquee-text-wrap-comp'], /*#__PURE__*/isValidElement(children)), rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/isValidElement(children) ? /*#__PURE__*/React.createElement("div", {
    className: clsx(styles['sekai-marquee-text-wrap'])
  }, clonedChildren) : /*#__PURE__*/React.createElement("span", {
    ref: textWrapRef,
    className: clsx(styles['sekai-marquee-text-string'])
  }, children));
};
var getBackgroundColor = function getBackgroundColor(element, mode) {
  if (element.current) {
    var computedStyle = getComputedStyle(element.current);
    var bgColor = computedStyle.backgroundColor;
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgColor !== 'initial') {
      return bgColor;
    }
  }
  return mode === LIGHT_MODE ? BACKGROUND_LIGHT_MODE : BACKGROUND_DARK_MODE;
};

export { MarqueeText };
