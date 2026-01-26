'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { BodyText } from '../text/UtilText.js';
import { ClearSvg } from '../../img/clear.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './Toast.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "onClose", "pos", "message", "isError", "duration", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Toast = function Toast(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    onClose = _ref.onClose,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'bottom' : _ref$pos,
    message = _ref.message,
    _ref$isError = _ref.isError,
    isError = _ref$isError === void 0 ? false : _ref$isError,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 3000 : _ref$duration,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer(containerComponent);
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = _objectSpread({
    '--sekai-color-bg': sekaiColorBg
  }, containerComponent && {
    position: 'absolute'
  });
  var displayMsg = Array.isArray(message) ? message : [message];
  useEffect(function () {
    var timer = open ? setTimeout(function () {
      onClose();
    }, duration) : undefined;
    return function () {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles["sekai-toast-".concat(pos)], _defineProperty({}, styles['sekai-toast-open'], open), rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(styles['sekai-toast-message'])
  }, displayMsg.map(function (msg) {
    return /*#__PURE__*/React.createElement(BodyText, {
      key: msg,
      className: clsx(globalStyles["sekai-text-".concat(modeTheme)], _defineProperty({}, styles['sekai-toast-error'], isError))
    }, msg);
  })), /*#__PURE__*/React.createElement("button", {
    className: clsx(styles['sekai-toast-close-button']),
    onClick: onClose
  }, /*#__PURE__*/React.createElement(ClearSvg, {
    sekai: sekai,
    themeMode: themeMode,
    className: styles['sekai-toast-icon']
  }))), portalContainer);
};

export { Toast };
