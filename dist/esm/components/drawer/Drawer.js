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
import styles from './Drawer.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "onClose", "children", "containerComponent", "pos"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Drawer = function Drawer(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    onClose = _ref.onClose,
    children = _ref.children,
    containerComponent = _ref.containerComponent,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'right' : _ref$pos,
    rest = _objectWithoutProperties(_ref, _excluded);
  var displayDrawer = open ? 'sekai-drawer-visible' : 'sekai-drawer-hidden';
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer(containerComponent);
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var optionStyle = {
    '--sekai-color-bg': sekaiColorBg
  };
  var posAbsoluteStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", {
    ref: rest.ref,
    className: clsx(globalStyles["sekai-overlay-".concat(modeTheme)], styles['sekai-drawer'], styles[displayDrawer]),
    style: posAbsoluteStyle,
    "aria-hidden": "true",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(styles["sekai-drawer-contents-".concat(pos)], styles[displayDrawer], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    role: "presentation",
    tabIndex: -1,
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }), children)), portalContainer);
};

export { Drawer };
