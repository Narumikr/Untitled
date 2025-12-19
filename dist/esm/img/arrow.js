import React from 'react';
import clsx from 'clsx';
import { COLOR_LIGHT_MODE, COLOR_DARK_MODE } from '../internal/color.constant.js';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var ArrowSvg = function ArrowSvg(_ref) {
  var className = _ref.className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$vector = _ref.vector,
    vector = _ref$vector === void 0 ? 'right' : _ref$vector;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? COLOR_LIGHT_MODE : COLOR_DARK_MODE;
  var getCoordinate = function getCoordinate(x) {
    return 'left' === vector ? Math.abs(0 - x) : Math.abs(100 - x);
  };
  return /*#__PURE__*/React.createElement("svg", {
    className: clsx(className),
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, sekai ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: getCoordinate(27.5),
    y1: "55.25",
    x2: getCoordinate(67.5),
    y2: "15",
    stroke: sekaiColor,
    strokeWidth: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: getCoordinate(27.5),
    y1: "45",
    x2: getCoordinate(67.5),
    y2: "85",
    stroke: sekaiColor,
    strokeWidth: "15"
  })) : null, /*#__PURE__*/React.createElement("line", {
    x1: getCoordinate(30.5),
    y1: "52.75",
    x2: getCoordinate(67.5),
    y2: "15",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: getCoordinate(30.5),
    y1: "47.25",
    x2: getCoordinate(67.5),
    y2: "85",
    stroke: color,
    strokeWidth: "8"
  }));
};

export { ArrowSvg };
