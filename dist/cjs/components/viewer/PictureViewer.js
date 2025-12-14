'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var framerMotion = require('framer-motion');
var reactDom = require('react-dom');
var clear = require('../../img/clear.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var global_module = require('../../styles/global.module.scss.js');
var PictureViewer_module = require('./PictureViewer.module.scss.js');

var _excluded = ["sekai", "themeMode", "imgSrc", "alt", "width", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PictureViewer = function PictureViewer(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    imgSrc = _ref.imgSrc,
    _ref$alt = _ref.alt,
    alt = _ref$alt === void 0 ? '' : _ref$alt,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 210 : _ref$width,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var uniqueId = React.useId();
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var posAbsoluteStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(framerMotion.motion.div, _extends({}, rest, {
    layoutId: "preview-image-".concat(uniqueId),
    className: clsx(PictureViewer_module['sekai-picture-viewer-thumbnail'], PictureViewer_module["sekai-picture-viewer-thumbnail-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    onClick: function onClick() {
      return setIsOpen(true);
    },
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: imgSrc,
    alt: alt,
    className: clsx(PictureViewer_module['sekai-thumbnail-image']),
    width: width
  })), /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(framerMotion.AnimatePresence, null, isOpen ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(framerMotion.motion.div, {
    className: clsx(global_module["sekai-overlay-".concat(modeTheme)]),
    style: posAbsoluteStyle,
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    onClick: function onClick() {
      return setIsOpen(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(PictureViewer_module['sekai-preview-container']),
    style: _objectSpread(_objectSpread({}, optionStyle), posAbsoluteStyle)
  }, /*#__PURE__*/React.createElement(framerMotion.motion.div, {
    layoutId: "preview-image-".concat(uniqueId),
    className: clsx(PictureViewer_module['sekai-preview-image-wrapper'])
  }, /*#__PURE__*/React.createElement("img", {
    src: imgSrc,
    alt: alt,
    className: clsx(PictureViewer_module['sekai-preview-image'], PictureViewer_module["sekai-preview-image-".concat(modeTheme)])
  })), /*#__PURE__*/React.createElement(framerMotion.motion.button, {
    className: clsx(PictureViewer_module['sekai-preview-close-btn']),
    onClick: function onClick() {
      return setIsOpen(false);
    },
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.8
    },
    whileHover: {
      scale: 1.1
    },
    whileTap: {
      scale: 0.9
    }
  }, /*#__PURE__*/React.createElement(clear.ClearSvg, {
    sekai: sekai,
    themeMode: themeMode
  })))) : null), portalContainer));
};

exports.PictureViewer = PictureViewer;
