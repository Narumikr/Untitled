import React from 'react';
import { COLOR_LIGHT_MODE, COLOR_DARK_MODE } from '../internal/color.constant.js';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var RestoreSvg = function RestoreSvg(_ref) {
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
    x1: "11",
    y1: "27",
    x2: "77",
    y2: "27",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "76",
    y1: "26",
    x2: "76",
    y2: "87",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "77",
    y1: "86",
    x2: "11",
    y2: "86",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "87",
    x2: "12",
    y2: "26",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "26",
    y1: "10",
    x2: "91",
    y2: "10",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "92",
    y1: "10",
    x2: "92",
    y2: "72",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  })) : null, /*#__PURE__*/React.createElement("line", {
    x1: "11",
    y1: "27",
    x2: "77",
    y2: "27",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "76",
    y1: "26",
    x2: "76",
    y2: "87",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "77",
    y1: "86",
    x2: "11",
    y2: "86",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "87",
    x2: "12",
    y2: "26",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "26",
    y1: "10",
    x2: "91",
    y2: "10",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "92",
    y1: "10",
    x2: "92",
    y2: "72",
    stroke: color,
    strokeWidth: "8"
  }));
};

export { RestoreSvg };
