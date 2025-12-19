'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState } from 'react';
import clsx from 'clsx';
import { AnnotationText } from '../text/UtilText.js';
import { ClearSvg } from '../../img/clear.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import styles from './TextField.module.scss.js';

var _excluded = ["id", "className", "style", "sekai", "themeMode", "clearButton", "onChangeInput", "isError", "errorMessage"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TextField = function TextField(_ref) {
  var id = _ref.id,
    className = _ref.className,
    style = _ref.style,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$clearButton = _ref.clearButton,
    clearButton = _ref$clearButton === void 0 ? true : _ref$clearButton,
    onChangeInput = _ref.onChangeInput,
    _ref$isError = _ref.isError,
    isError = _ref$isError === void 0 ? false : _ref$isError,
    errorMessage = _ref.errorMessage,
    inputProps = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var handleInputChange = function handleInputChange(e) {
    var value = e.target.value;
    setInputValue(value);
    onChangeInput === null || onChangeInput === void 0 || onChangeInput(value);
  };
  var handleClearInput = function handleClearInput() {
    setInputValue('');
    onChangeInput === null || onChangeInput === void 0 || onChangeInput('');
  };
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: clsx(styles['sekai-textfield'], className),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx(styles['sekai-textfield-wrapper'])
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: "".concat(id, "-input"),
    type: "text"
  }, inputProps, {
    className: clsx(styles["sekai-textfield-input-".concat(modeTheme)], _defineProperty({}, styles['sekai-textfield-clear'], clearButton)),
    value: inputValue,
    onChange: handleInputChange
  })), clearButton && inputValue.length ? /*#__PURE__*/React.createElement("button", {
    className: clsx(styles['sekai-textfield-clear-button']),
    onClick: handleClearInput
  }, /*#__PURE__*/React.createElement(ClearSvg, {
    className: clsx(styles['sekai-textfield-clear-icon']),
    sekai: sekai,
    themeMode: themeMode
  })) : null), isError ? /*#__PURE__*/React.createElement(AnnotationText, {
    className: clsx(styles['sekai-textfield-input-error'])
  }, errorMessage) : null);
};

export { TextField };
