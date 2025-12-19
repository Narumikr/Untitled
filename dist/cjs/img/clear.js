'use strict';

var React = require('react');
var color_constant = require('../internal/color.constant.js');
var useOptionalSekai = require('../internal/useOptionalSekai.js');

var ClearSvg = function ClearSvg(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode;
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? color_constant.COLOR_LIGHT_MODE : color_constant.COLOR_DARK_MODE;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, sekai ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "85",
    y2: "85",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "85",
    y1: "15",
    x2: "15",
    y2: "85",
    stroke: sekaiColor,
    strokeWidth: "17",
    opacity: "0.7"
  })) : null, /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "85",
    y2: "85",
    stroke: color,
    strokeWidth: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "85",
    y1: "15",
    x2: "15",
    y2: "85",
    stroke: color,
    strokeWidth: "10"
  }));
};

exports.ClearSvg = ClearSvg;
