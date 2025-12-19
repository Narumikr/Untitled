'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { fireOnEnterKey } from '../../utils/operation.js';
import { colorsSekai } from '../../styles/sekai-colors.js';
import styles from './DoReMeetEffect.module.scss.js';

var _excluded = ["sekaiKeys", "themeMode", "text", "duration"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var DoReMeetEffect = function DoReMeetEffect(_ref) {
  var sekaiKeys = _ref.sekaiKeys,
    themeMode = _ref.themeMode,
    text = _ref.text,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 250 : _ref$duration,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
  var INIT_VALUE = -1;
  var _useState = useState(INIT_VALUE),
    _useState2 = _slicedToArray(_useState, 2),
    currentSekaiIndex = _useState2[0],
    setCurrentSekaiIndex = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPlaying = _useState4[0],
    setIsPlaying = _useState4[1];
  var optionStyle = useMemo(function () {
    if (currentSekaiIndex < 0) return {};
    return {
      '--sekai-color': colorsSekai[sekaiKeys[currentSekaiIndex]]
    };
  }, [currentSekaiIndex, sekaiKeys]);
  var handleDeReMeetEffect = function handleDeReMeetEffect() {
    if (isPlaying) return;
    setIsPlaying(true);
    var interval = setInterval(function () {
      setCurrentSekaiIndex(function (prev) {
        if (prev + 1 >= sekaiKeys.length) {
          clearInterval(interval);
          setIsPlaying(false);
          return INIT_VALUE;
        }
        return prev + 1;
      });
    }, duration);
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "button",
    tabIndex: -1,
    onClick: handleDeReMeetEffect,
    onKeyDown: fireOnEnterKey(handleDeReMeetEffect)
  }, rest, {
    className: clsx(styles["sekai-doremeet-effect-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), text);
};

export { DoReMeetEffect };
