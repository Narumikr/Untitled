import React from 'react';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var CompactDiscIcon = function CompactDiscIcon(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? '#121212' : '#ffffff';
  var reverseColor = isLight ? '#ffffff' : '#121212';
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "48.3",
    fill: "none",
    stroke: color,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "46.7",
    fill: reverseColor,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "43",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,50 L63.3,11.7 A43,43 0 0,1 90,41.7 Z",
    fill: reverseColor,
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,50 L88.3,33.3 A43,43 0 0,1 90,36.7 Z",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,50 L36.7,88.3 A43,43 0 0,1 10,58.3 Z",
    fill: reverseColor,
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,50 L11.7,66.7 A43,43 0 0,1 10,63.3 Z",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "10",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "6.7",
    fill: reverseColor
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "4",
    fill: color
  }), /*#__PURE__*/React.createElement(EighthNote, {
    sekaiColor: sekaiColor,
    colorTheme: color
  }));
};
var EighthNote = function EighthNote(_ref2) {
  var sekaiColor = _ref2.sekaiColor,
    colorTheme = _ref2.colorTheme;
  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(63, 63)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "0",
    cy: "23",
    rx: "17.6",
    ry: "13.2",
    fill: colorTheme
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "-17.2",
    width: "10.4",
    height: "45",
    fill: colorTheme
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6,-26.8 Q38.4,-17.1 35.6, 2 Q14.4,-11.5 6,4.5 Z",
    fill: colorTheme
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "0",
    cy: "23",
    rx: "16",
    ry: "11.6",
    fill: sekaiColor
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7.3",
    y: "-17.2",
    width: "7.2",
    height: "45",
    fill: sekaiColor
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.3,-24.8 Q36,-15.5 34, 0 Q18.4,-10 7.3,-3.1 Z",
    fill: sekaiColor
  }));
};

export { CompactDiscIcon };
