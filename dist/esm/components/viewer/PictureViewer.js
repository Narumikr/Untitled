'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ClearSvg } from '../../img/clear.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './PictureViewer.module.scss.js';

var _excluded = ["sekai", "themeMode", "imgSrc", "alt", "width", "objectFit", "containerComponent"];
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
    _ref$objectFit = _ref.objectFit,
    objectFit = _ref$objectFit === void 0 ? 'contain' : _ref$objectFit,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var portalContainer = usePortalContainer(containerComponent);
  var _useState = useState(false),
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(motion.div, _extends({}, rest, {
    className: clsx(styles['sekai-picture-viewer-thumbnail'], styles["sekai-picture-viewer-thumbnail-".concat(modeTheme)], rest.className),
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
    className: clsx(styles['sekai-thumbnail-image']),
    style: {
      objectFit: objectFit
    },
    width: width
  })), /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(AnimatePresence, null, isOpen ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(motion.div, {
    className: clsx(globalStyles["sekai-overlay-".concat(modeTheme)]),
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
    className: clsx(styles['sekai-preview-container']),
    style: _objectSpread(_objectSpread({}, optionStyle), posAbsoluteStyle)
  }, /*#__PURE__*/React.createElement(motion.div, {
    className: clsx(styles['sekai-preview-image-wrapper']),
    initial: {
      opacity: 0,
      scale: 0.5
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.5
    },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: imgSrc,
    alt: alt,
    className: clsx(styles['sekai-preview-image'], styles["sekai-preview-image-".concat(modeTheme)]),
    style: {
      objectFit: objectFit
    }
  })), /*#__PURE__*/React.createElement(motion.button, {
    className: clsx(styles['sekai-preview-close-btn']),
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
  }, /*#__PURE__*/React.createElement(ClearSvg, {
    sekai: sekai,
    themeMode: themeMode
  })))) : null), portalContainer));
};

export { PictureViewer };
