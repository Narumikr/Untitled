'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './Backdrop.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "children", "containerComponent", "centered"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Backdrop = function Backdrop(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    children = _ref.children,
    containerComponent = _ref.containerComponent,
    _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? true : _ref$centered,
    rest = _objectWithoutProperties(_ref, _excluded);
  var displayBackdrop = open ? 'sekai-backdrop-visible' : 'sekai-backdrop-hidden';
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, false, 0.8);
  var portalContainer = usePortalContainer(containerComponent);
  var optionStyle = _objectSpread({
    '--sekai-color-bg': sekaiColorBg
  }, containerComponent && {
    position: 'absolute'
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", {
    className: clsx(styles[displayBackdrop]),
    ref: rest.ref
  }, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(globalStyles["sekai-overlay-".concat(modeTheme)], _defineProperty(_defineProperty({}, styles['sekai-backdrop-bg'], sekai), styles['sekai-backdrop-centered'], centered), rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), children)), portalContainer);
};

export { Backdrop };
