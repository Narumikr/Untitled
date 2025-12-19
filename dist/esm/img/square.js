import React from 'react';
import { COLOR_LIGHT_MODE, COLOR_DARK_MODE } from '../internal/color.constant.js';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var SquareSvg = function SquareSvg(_ref) {
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
  var color = isLight ? COLOR_LIGHT_MODE : COLOR_DARK_MODE;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, sekai ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "16",
    x2: "92",
    y2: "16",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "84",
    y1: "15",
    x2: "84",
    y2: "85",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "92",
    y1: "84",
    x2: "8",
    y2: "84",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "85",
    x2: "16",
    y2: "15",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  })) : null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "88",
    y2: "16",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "84",
    y1: "15",
    x2: "84",
    y2: "85",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "88",
    y1: "84",
    x2: "12",
    y2: "84",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "85",
    x2: "16",
    y2: "15",
    stroke: color,
    strokeWidth: "8"
  }));
};

export { SquareSvg };
