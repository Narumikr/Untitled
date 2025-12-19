import React from 'react';
import clsx from 'clsx';
import { COLOR_LIGHT_MODE, COLOR_DARK_MODE } from '../internal/color.constant.js';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var ChevronSvg = function ChevronSvg(_ref) {
  var className = _ref.className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$vector = _ref.vector,
    vector = _ref$vector === void 0 ? 'up' : _ref$vector;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? COLOR_LIGHT_MODE : COLOR_DARK_MODE;
  var getCoordinate = function getCoordinate(y) {
    return 'up' === vector ? Math.abs(0 - y) : Math.abs(100 - y);
  };
  return /*#__PURE__*/React.createElement("svg", {
    className: clsx(className),
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, sekai ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "45",
    y1: getCoordinate(27.5),
    x2: "85",
    y2: getCoordinate(67.5),
    stroke: sekaiColor,
    strokeWidth: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "55.25",
    y1: getCoordinate(27.5),
    x2: "15",
    y2: getCoordinate(67.5),
    stroke: sekaiColor,
    strokeWidth: "15"
  })) : null, /*#__PURE__*/React.createElement("line", {
    x1: "47.25",
    y1: getCoordinate(30.5),
    x2: "85",
    y2: getCoordinate(67.5),
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "52.75",
    y1: getCoordinate(30.5),
    x2: "15",
    y2: getCoordinate(67.5),
    stroke: color,
    strokeWidth: "8"
  }));
};

export { ChevronSvg };
