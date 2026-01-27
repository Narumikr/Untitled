'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { HamburgerButton } from '../button/HamburgerButton.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './SideMenu.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "onClick", "children", "pos", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SideMenu = function SideMenu(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$open = _ref.open,
    open = _ref$open === void 0 ? false : _ref$open,
    onClick = _ref.onClick,
    children = _ref.children,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'left' : _ref$pos,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var portalContainer = usePortalContainer(containerComponent);
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var _useState = useState(open),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  useEffect(function () {
    setIsOpen(open);
  }, [open]);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var posAbsoluteStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  var handleClick = function handleClick() {
    setIsOpen(!isOpen);
    onClick === null || onClick === void 0 || onClick();
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles["sekai-side-menu-".concat(pos)], _defineProperty(_defineProperty({}, styles['sekai-side-menu-open'], isOpen), styles['sekai-side-menu-closed'], !isOpen), rest.className),
    style: _objectSpread(_objectSpread(_objectSpread({}, optionStyle), posAbsoluteStyle), rest.style)
  }), /*#__PURE__*/React.createElement(HamburgerButton, {
    id: rest.id ? "".concat(rest.id, "-side-menu-btn") : 'sekai-side-menu-btn',
    className: clsx(styles['sekai-side-menu-hamburger-btn']),
    sekai: sekai,
    themeMode: themeMode,
    open: isOpen,
    onClick: handleClick
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(globalStyles['sekai-invisible-scroll'], styles['sekai-side-menu-contents'])
  }, children)), portalContainer);
};

export { SideMenu };
