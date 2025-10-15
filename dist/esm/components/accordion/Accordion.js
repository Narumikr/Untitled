'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronSvg } from '../../img/chevron.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './Accordion.module.scss.js';

var _excluded = ["sekai", "themeMode", "summary", "summaryStyles", "defaultOpen", "details"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Accordion = function Accordion(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    summary = _ref.summary,
    summaryStyles = _ref.summaryStyles,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? false : _ref$defaultOpen,
    details = _ref.details,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  var _useState = useState(defaultOpen),
    _useState2 = _slicedToArray(_useState, 2),
    openAccordion = _useState2[0],
    setOpenAccordion = _useState2[1];
  var handleOpenClose = function handleOpenClose() {
    return setOpenAccordion(function (pre) {
      return !pre;
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(styles['sekai-accordion-container'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("button", {
    className: clsx(styles['sekai-accordion-summary'], globalStyles["sekai-color-".concat(modeTheme)], summaryStyles),
    onClick: handleOpenClose,
    id: "accordion-summary",
    "aria-expanded": openAccordion,
    "aria-controls": "details-contents"
  }, /*#__PURE__*/React.createElement("p", {
    className: styles['sekai-accordion-summary-text']
  }, summary), /*#__PURE__*/React.createElement(ChevronSvg, {
    className: clsx(styles["sekai-accordion-summary-icon"], openAccordion ? styles['sekai-icon-open'] : styles['sekai-icon-close']),
    sekai: sekai,
    themeMode: themeMode,
    vector: "up"
  })), /*#__PURE__*/React.createElement("hr", {
    className: styles['sekai-web-horizon']
  }), /*#__PURE__*/React.createElement(AccordionDetailsContents, {
    open: openAccordion,
    details: details
  }));
};
var AccordionDetailsContents = function AccordionDetailsContents(_ref2) {
  var open = _ref2.open,
    details = _ref2.details;
  var refDetails = useRef(null);
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    heightDetails = _useState4[0],
    setHeightDetails = _useState4[1];
  useEffect(function () {
    if (refDetails.current) {
      requestAnimationFrame(function () {
        setHeightDetails(refDetails.current.scrollHeight);
      });
    }
  }, []);
  var animationDetailsStyles = _objectSpread(_objectSpread({
    maxHeight: open ? heightDetails ? "".concat(heightDetails, "px") : 'none' : '0px',
    opacity: open ? 1 : 0
  }, open && {
    margin: '10px 0'
  }), {}, {
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out'
  });
  var renderDetails = function renderDetails(details) {
    if (isString(details)) return /*#__PURE__*/React.createElement(DetailText, {
      text: details
    });
    if (isStringArray(details)) {
      return details.map(function (el) {
        return /*#__PURE__*/React.createElement(DetailText, {
          key: el,
          text: el
        });
      });
    }
    return details;
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: refDetails,
    id: "details-contents",
    role: "region",
    "aria-labelledby": "accordion-summary",
    className: styles['sekai-accordion-details'],
    style: animationDetailsStyles
  }, renderDetails(details));
};
var isString = function isString(el) {
  return typeof el === 'string';
};
var isStringArray = function isStringArray(el) {
  return Array.isArray(el) && el.every(isString);
};
var DetailText = function DetailText(_ref3) {
  var text = _ref3.text;
  return /*#__PURE__*/React.createElement("p", {
    className: styles['sekai-detail-text']
  }, text);
};

export { Accordion };
