'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var Tooltip_module = require('./Tooltip.module.scss.js');

var _excluded = ["sekai", "themeMode", "children", "text", "pos"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Tooltip = function Tooltip(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    text = _ref.text,
    _ref$pos = _ref.pos,
    pos = _ref$pos === void 0 ? 'top' : _ref$pos,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.2, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(Tooltip_module["sekai-tooltip-".concat(modeTheme)], Tooltip_module["sekai-tooltip-".concat(pos)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    onMouseEnter: function onMouseEnter() {
      return setVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setVisible(false);
    }
  }), children, visible ? /*#__PURE__*/React.createElement(SpeechBubble, {
    text: text,
    pos: pos,
    themeMode: modeTheme
  }) : null);
};
var SpeechBubble = function SpeechBubble(_ref2) {
  var text = _ref2.text,
    pos = _ref2.pos,
    themeMode = _ref2.themeMode;
  var PADDING = 32;
  var MAX_WIDTH = 300;
  var speechBubbleRef = React.useRef(null);
  var _useState3 = React.useState(pos),
    _useState4 = _slicedToArray(_useState3, 2),
    calcPosition = _useState4[0],
    setCalcPosition = _useState4[1];
  var _useState5 = React.useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    bubbleStyle = _useState6[0],
    setBubbleStyle = _useState6[1];
  React.useEffect(function () {
    var bubble = speechBubbleRef.current;
    if (!bubble) return;
    var bubbleRect = bubble.getBoundingClientRect();
    var viewInnerWidth = window.innerWidth;
    var viewInnerHeight = window.innerHeight;
    var isRightOverflow = bubbleRect.right > viewInnerWidth;
    var isLeftOverflow = bubbleRect.left < 0;
    setBubbleStyle(_objectSpread(_objectSpread(_objectSpread({}, isRightOverflow && {
      right: 0,
      left: 'auto',
      transform: 'none'
    }), isLeftOverflow && {
      left: 0,
      right: 'auto',
      transform: 'none'
    }), {}, {
      maxWidth: "".concat(Math.min(viewInnerWidth - PADDING * 2, MAX_WIDTH), "px")
    }));
    if (bubbleRect.top < 0) {
      setCalcPosition('bottom');
    } else if (bubbleRect.bottom > viewInnerHeight) {
      setCalcPosition('top');
    } else {
      setCalcPosition(pos);
    }
  }, [pos]);
  return /*#__PURE__*/React.createElement("div", {
    ref: speechBubbleRef,
    className: clsx(Tooltip_module["sekai-tooltip-speech-bubble-".concat(calcPosition)]),
    style: bubbleStyle
  }, /*#__PURE__*/React.createElement("span", {
    className: Tooltip_module["sekai-tooltip-speech-bubble-text-".concat(themeMode)]
  }, text));
};

exports.Tooltip = Tooltip;
