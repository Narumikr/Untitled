'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import styles from './TypewriterText.module.scss.js';

var _excluded = ["sekai", "themeMode", "text", "options"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var defaultOptions = {
  speed: 100,
  loop: false,
  cursor: true
};
var TypewriterText = function TypewriterText(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    text = _ref.text,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? defaultOptions : _ref$options,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    displayText = _useState2[0],
    setDisplayText = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    currentIndex = _useState4[0],
    setCurrentIndex = _useState4[1];
  var viewCursor = useMemo(function () {
    return options.cursor && displayText.length < text.length;
  }, [displayText, text, options.cursor]);
  useEffect(function () {
    setDisplayText('');
    var typewriteInterval = setInterval(function () {
      setCurrentIndex(function (prevIndex) {
        if (prevIndex >= text.length - 1) {
          if (options.loop) {
            setDisplayText('');
            return 0;
          } else {
            clearInterval(typewriteInterval);
            return prevIndex;
          }
        }
        return prevIndex + 1;
      });
    }, options.speed);
    return function () {
      return clearInterval(typewriteInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    setDisplayText(function (pre) {
      return pre + text[currentIndex];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(styles['sekai-typewrite-text'], _defineProperty({}, styles['sekai-cursor'], viewCursor), rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), displayText);
};

export { TypewriterText };
