'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var NamePlate = require('../text/NamePlate.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var global_module = require('../../styles/global.module.scss.js');
var Card = require('./Card.js');
var OutlineText = require('../text/OutlineText.js');
var PrskLinkCard_module = require('./PrskLinkCard.module.scss.js');

var _excluded = ["sekai", "themeMode", "height", "width", "onClick", "title", "subText", "icon"];
var PrskLinkCard = function PrskLinkCard(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 72 : _ref$height,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 160 : _ref$width,
    onClick = _ref.onClick,
    title = _ref.title,
    subText = _ref.subText,
    icon = _ref.icon,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
  var cardSizeStyle = {
    height: "".concat(height, "px"),
    width: "".concat(width, "px")
  };
  return /*#__PURE__*/React.createElement(Card.Card, _extends({}, rest, {
    sekai: sekai,
    themeMode: themeMode
  }), /*#__PURE__*/React.createElement("button", {
    className: clsx(PrskLinkCard_module['sekai-prsk-link-card-button'], global_module["sekai-color-".concat(modeTheme)]),
    style: (cardSizeStyle),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(NamePlate.NamePlate, {
    id: "".concat(rest.id ? rest.id : 'prsk-link-card', "-title"),
    className: clsx(PrskLinkCard_module['sekai-prsk-link-card-title'], PrskLinkCard_module["sekai-title-effect-".concat(modeTheme)]),
    sekai: sekai,
    themeMode: themeMode,
    text: title
  }), /*#__PURE__*/React.createElement(OutlineText.OutlineText, {
    id: "".concat(rest.id ? rest.id : 'prsk-link-card', "-subtext"),
    className: PrskLinkCard_module['sekai-prsk-link-card-subtext'],
    sekai: sekai,
    themeMode: themeMode,
    text: subText
  }), /*#__PURE__*/React.createElement("div", {
    className: PrskLinkCard_module['sekai-prsk-link-card-icon']
  }, getImgComponent(icon))));
};
var getImgComponent = function getImgComponent(icon) {
  if (typeof icon === 'string') {
    return /*#__PURE__*/React.createElement("img", {
      src: icon,
      alt: ""
    });
  } else {
    return icon;
  }
};

exports.PrskLinkCard = PrskLinkCard;
