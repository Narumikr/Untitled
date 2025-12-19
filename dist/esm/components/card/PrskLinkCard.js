'use client';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { NamePlate } from '../text/NamePlate.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import globalStyles from '../../styles/global.module.scss.js';
import { Card } from './Card.js';
import { OutlineText } from '../text/OutlineText.js';
import styles from './PrskLinkCard.module.scss.js';

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
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
  var cardSizeStyle = {
    height: "".concat(height, "px"),
    width: "".concat(width, "px")
  };
  return /*#__PURE__*/React.createElement(Card, _extends({}, rest, {
    sekai: sekai,
    themeMode: themeMode
  }), /*#__PURE__*/React.createElement("button", {
    className: clsx(styles['sekai-prsk-link-card-button'], globalStyles["sekai-color-".concat(modeTheme)]),
    style: (cardSizeStyle),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(NamePlate, {
    id: "".concat(rest.id ? rest.id : 'prsk-link-card', "-title"),
    className: clsx(styles['sekai-prsk-link-card-title'], styles["sekai-title-effect-".concat(modeTheme)]),
    sekai: sekai,
    themeMode: themeMode,
    text: title
  }), /*#__PURE__*/React.createElement(OutlineText, {
    id: "".concat(rest.id ? rest.id : 'prsk-link-card', "-subtext"),
    className: styles['sekai-prsk-link-card-subtext'],
    sekai: sekai,
    themeMode: themeMode,
    text: subText
  }), /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-prsk-link-card-icon']
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

export { PrskLinkCard };
