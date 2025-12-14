'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var UtilText = require('../text/UtilText.js');
var TextArea_module = require('./TextArea.module.scss.js');

var _excluded = ["sekai", "themeMode", "value", "onChange", "placeholder", "disabled", "maxLength", "resize"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TextArea = function TextArea(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    value = _ref.value,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    maxLength = _ref.maxLength,
    _ref$resize = _ref.resize,
    resize = _ref$resize === void 0 ? 'none' : _ref$resize,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var handleInputValue = function handleInputValue(e) {
    var newValue = e.currentTarget.value;
    onChange === null || onChange === void 0 || onChange(newValue);
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(TextArea_module['sekai-textarea-wrap'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("textarea", {
    id: "".concat(rest.id, "-textarea"),
    className: clsx(TextArea_module['sekai-textarea'], TextArea_module["sekai-textarea-".concat(modeTheme)]),
    style: {
      resize: resize
    },
    value: value || '',
    placeholder: placeholder,
    disabled: disabled,
    onChange: handleInputValue,
    maxLength: maxLength
  }), /*#__PURE__*/React.createElement(TextCounter, {
    value: value || '',
    maxLength: maxLength
  }));
};
var TextCounter = function TextCounter(_ref2) {
  var value = _ref2.value,
    maxLength = _ref2.maxLength;
  if (!Boolean(maxLength)) return null;
  return /*#__PURE__*/React.createElement(UtilText.AnnotationText, {
    className: clsx(TextArea_module['sekai-text-counter'])
  }, "".concat(value.length, "/").concat(maxLength));
};

exports.TextArea = TextArea;
