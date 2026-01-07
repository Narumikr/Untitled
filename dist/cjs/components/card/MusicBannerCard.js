'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var compactDisc = require('../../img/compactDisc.js');
var equalizer = require('../../img/equalizer.js');
var operation = require('../../utils/operation.js');
var Card = require('./Card.js');
var MarqueeText = require('../text/MarqueeText.js');
var MusicBannerCard_module = require('./MusicBannerCard.module.scss.js');

var _excluded = ["sekai", "themeMode", "musicTitle", "artist", "selected", "onSelect", "onClick", "onBlur", "onMouseLeave", "variants"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MusicBannerCard = function MusicBannerCard(_ref) {
  var _rest$id;
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    musicTitle = _ref.musicTitle,
    artist = _ref.artist,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    onSelect = _ref.onSelect,
    onClick = _ref.onClick,
    onBlur = _ref.onBlur,
    onMouseLeave = _ref.onMouseLeave,
    _ref$variants = _ref.variants,
    variants = _ref$variants === void 0 ? 'default' : _ref$variants,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = React.useState(selected),
    _useState2 = _slicedToArray(_useState, 2),
    isSelected = _useState2[0],
    setIsSelected = _useState2[1];
  React.useEffect(function () {
    setIsSelected(selected);
  }, [selected]);
  var handleChangeSelect = function handleChangeSelect(select) {
    setIsSelected(select);
    onSelect === null || onSelect === void 0 || onSelect(select);
  };
  return /*#__PURE__*/React.createElement(Card.Card, _extends({}, rest, {
    ref: rest.ref,
    role: "button",
    tabIndex: 0,
    sekai: sekai,
    themeMode: themeMode,
    style: _objectSpread({}, rest.style),
    className: clsx(MusicBannerCard_module['sekai-music-banner-card'], _defineProperty({}, MusicBannerCard_module['sekai-music-card-selected'], isSelected), rest.className),
    onClick: onClick,
    onKeyDown: onClick ? operation.fireOnEnterKey(onClick) : undefined,
    onFocus: function onFocus() {
      return handleChangeSelect(true);
    },
    onBlur: onBlur,
    onMouseEnter: function onMouseEnter() {
      return handleChangeSelect(true);
    },
    onMouseLeave: onMouseLeave
  }), /*#__PURE__*/React.createElement(Card.CardContent, {
    id: (_rest$id = rest.id) !== null && _rest$id !== void 0 ? _rest$id : "".concat(rest.id, "-content"),
    className: clsx(MusicBannerCard_module['sekai-music-banner-card-content'], _defineProperty({}, MusicBannerCard_module['sekai-music-card-selected'], isSelected))
  }, /*#__PURE__*/React.createElement(CardIcon, {
    selected: isSelected,
    sekai: sekai,
    themeMode: themeMode
  }), /*#__PURE__*/React.createElement(CardDetails, {
    musicTitle: musicTitle,
    artist: artist,
    selected: isSelected,
    variants: variants
  })));
};
var CardIcon = function CardIcon(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode,
    selected = _ref2.selected;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(MusicBannerCard_module['sekai-music-card-icon-wrapper'])
  }, /*#__PURE__*/React.createElement(equalizer.EqualizerIcon, {
    sekai: sekai,
    themeMode: themeMode,
    className: clsx(MusicBannerCard_module['sekai-music-card-icon'], _defineProperty({}, MusicBannerCard_module['sekai-music-card-icon-visible'], selected))
  }), /*#__PURE__*/React.createElement(compactDisc.CompactDiscIcon, {
    sekai: sekai,
    themeMode: themeMode,
    className: clsx(MusicBannerCard_module['sekai-music-card-icon'], _defineProperty({}, MusicBannerCard_module['sekai-music-card-icon-visible'], !selected))
  }));
};
var CardDetails = function CardDetails(_ref3) {
  var musicTitle = _ref3.musicTitle,
    artist = _ref3.artist,
    selected = _ref3.selected,
    variants = _ref3.variants;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(MusicBannerCard_module['sekai-music-details'])
  }, /*#__PURE__*/React.createElement(MarqueeText.MarqueeText, {
    className: clsx(MusicBannerCard_module['sekai-music-card-detail-title'])
  }, musicTitle), /*#__PURE__*/React.createElement(MarqueeText.MarqueeText, {
    className: clsx(MusicBannerCard_module['sekai-music-card-detail-artist'], _defineProperty({}, MusicBannerCard_module['sekai-music-card-detail-artist-selected'], selected || 'view-all' === variants))
  }, artist));
};

exports.MusicBannerCard = MusicBannerCard;
