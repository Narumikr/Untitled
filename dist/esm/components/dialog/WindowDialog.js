'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { ClearSvg } from '../../img/clear.js';
import { RestoreSvg } from '../../img/restore.js';
import { SquareSvg } from '../../img/square.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import styles from './WindowDialog.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "children", "containerComponent", "size", "onClose"],
  _excluded2 = ["onMouseDown", "isFullscreen", "setIsFullscreen"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var WindowDialog = function WindowDialog(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    children = _ref.children,
    containerComponent = _ref.containerComponent,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onClose = _ref.onClose,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var displayDialog = open ? 'sekai-dialog-visible' : 'sekai-dialog-hidden';
  var portalContainer = usePortalContainer(containerComponent);
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.3, isLight);
  var sekaiColorHeader = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var windowInitCoordinate = function windowInitCoordinate() {
    return {
      x: '50%',
      y: '50%'
    };
  };
  var _useState = useState(function () {
      return windowInitCoordinate();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    position = _useState2[0],
    setPosition = _useState2[1];
  var modalRef = useRef(null);
  var _useState3 = useState({
      x: 0,
      y: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    dragOffset = _useState4[0],
    setDragOffset = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    dragging = _useState6[0],
    setDragging = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isFullscreen = _useState8[0],
    setIsFullscreen = _useState8[1];
  var onMouseDown = function onMouseDown(e) {
    var _modalRef$current;
    var rect = (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : _modalRef$current.getBoundingClientRect();
    if (!rect) return;
    setDragging(true);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  var closeWindow = function closeWindow() {
    onClose();
    setPosition(windowInitCoordinate());
    setIsFullscreen(false);
  };
  var onMouseMove = useCallback(function (e) {
    if (!dragging || isFullscreen || !portalContainer) return;
    var portalRect = portalContainer.getBoundingClientRect();
    var x = e.clientX - portalRect.left - dragOffset.x;
    var y = e.clientY - portalRect.top - dragOffset.y;
    setPosition({
      x: "".concat(x, "px"),
      y: "".concat(y, "px")
    });
  }, [dragOffset.x, dragOffset.y, dragging, isFullscreen, portalContainer]);
  var onMouseUp = function onMouseUp() {
    return setDragging(false);
  };
  useEffect(function () {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return function () {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, onMouseMove]);
  var optionStyle = useMemo(function () {
    return _objectSpread(_objectSpread({
      '--sekai-color': sekaiColor,
      '--sekai-color-bg': sekaiColorBg,
      '--sekai-color-header': sekaiColorHeader
    }, containerComponent && {
      position: 'absolute'
    }), {}, {
      'left': position.x,
      'top': position.y,
      'transform': position.x === '50%' && !isFullscreen ? 'translate(-50%, -50%)' : 'none'
    });
  }, [containerComponent, isFullscreen, position.x, position.y, sekaiColor, sekaiColorBg, sekaiColorHeader]);
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: modalRef,
    role: "dialog",
    className: clsx(styles["sekai-window-dialog-".concat(modeTheme)], _defineProperty(_defineProperty({}, styles["sekai-window-dialog-size-".concat(size)], !isFullscreen), styles['sekai-window-dialog-fullscreen'], isFullscreen), styles[displayDialog], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement(WindowHeader, {
    sekai: sekai,
    themeMode: themeMode,
    onClose: closeWindow,
    onMouseDown: onMouseDown,
    isFullscreen: isFullscreen,
    setIsFullscreen: setIsFullscreen
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(styles['sekai-window-dialog-container'])
  }, children)), portalContainer);
};
var WindowHeader = function WindowHeader(_ref2) {
  var onMouseDown = _ref2.onMouseDown,
    isFullscreen = _ref2.isFullscreen,
    setIsFullscreen = _ref2.setIsFullscreen,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var onClick = function onClick() {
    setIsFullscreen(!isFullscreen);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: styles['sekai-window-dialog-header'],
    onMouseDown: onMouseDown
  }, /*#__PURE__*/React.createElement("button", {
    className: styles['sekai-window-dialog-button'],
    onClick: onClick
  }, isFullscreen ? /*#__PURE__*/React.createElement(RestoreSvg, _extends({}, rest, {
    className: clsx(styles['sekai-window-dialog-icon'])
  })) : /*#__PURE__*/React.createElement(SquareSvg, _extends({}, rest, {
    className: clsx(styles['sekai-window-dialog-icon'])
  }))), /*#__PURE__*/React.createElement("button", {
    className: styles['sekai-window-dialog-button'],
    onClick: rest.onClose
  }, /*#__PURE__*/React.createElement(ClearSvg, _extends({}, rest, {
    className: clsx(styles['sekai-window-dialog-icon'])
  }))));
};

export { WindowDialog };
