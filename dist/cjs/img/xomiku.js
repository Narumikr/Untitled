'use strict';

var React = require('react');

var YELLOW = '#dbc884';
var GOLD = '#bba58e';
var DARK_YELLOW = '#5d5041';
var XoMikuSvg = function XoMikuSvg(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'type1' : _ref$type;
  var isType1 = type === 'type1';
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, isType1 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ThreeDimensionalParts, null), /*#__PURE__*/React.createElement("line", {
    x1: "85",
    y1: "15",
    x2: "15",
    y2: "85",
    stroke: YELLOW,
    strokeWidth: "25"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "22",
    x2: "87",
    y2: "85",
    stroke: YELLOW,
    strokeWidth: "30"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LowerLeftLine, null), /*#__PURE__*/React.createElement(LowerRightLine, null)));
};
var ThreeDimensionalParts = function ThreeDimensionalParts() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    transform: "translate(2,2)"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "85",
    y1: "15",
    x2: "15",
    y2: "85",
    stroke: GOLD,
    strokeWidth: "27"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(3,3)"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "20",
    x2: "87",
    y2: "85",
    stroke: GOLD,
    strokeWidth: "30"
  })));
};
var LowerRightLine = function LowerRightLine() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "85",
    y2: "85",
    stroke: DARK_YELLOW,
    strokeWidth: "30"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "16",
    x2: "84",
    y2: "84",
    stroke: YELLOW,
    strokeWidth: "28"
  }));
};
var LowerLeftLine = function LowerLeftLine() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "85",
    y1: "15",
    x2: "15",
    y2: "85",
    stroke: DARK_YELLOW,
    strokeWidth: "30"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "84",
    y1: "16",
    x2: "16",
    y2: "84",
    stroke: YELLOW,
    strokeWidth: "28"
  }));
};

exports.XoMikuSvg = XoMikuSvg;
