'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
require('swiper/css');
require('swiper/css/pagination');
require('swiper/css/navigation');
var modules = require('swiper/modules');
var react = require('swiper/react');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var Carousel_module = require('./Carousel.module.scss.js');

var _excluded = ["sekai", "themeMode", "children", "size", "autoPlay", "loopInfinite", "pagination"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Carousel = function Carousel(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'normal' : _ref$size,
    _ref$autoPlay = _ref.autoPlay,
    autoPlay = _ref$autoPlay === void 0 ? true : _ref$autoPlay,
    _ref$loopInfinite = _ref.loopInfinite,
    loopInfinite = _ref$loopInfinite === void 0 ? true : _ref$loopInfinite,
    _ref$pagination = _ref.pagination,
    pagination = _ref$pagination === void 0 ? false : _ref$pagination,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiBulletColor = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.2, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-bullet-color': sekaiBulletColor
  };
  var swiperModules = [pagination ? modules.Pagination : undefined, autoPlay ? modules.Autoplay : undefined].filter(Boolean);
  var renderChildrenWithSwiperSlide = React.Children.map(children, function (child, idx) {
    if (/*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.createElement(react.SwiperSlide, {
        key: "carousel-slide-".concat(idx)
      }, child);
    }
    return child;
  });
  return /*#__PURE__*/React.createElement(react.Swiper, _extends({}, rest, {
    ref: rest.ref,
    className: clsx(Carousel_module['sekai-carousel'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    modules: swiperModules,
    spaceBetween: 25,
    slidesPerView: getSlidesPerView(size),
    centeredSlides: true,
    loop: loopInfinite,
    speed: 1500,
    autoplay: autoPlaySettings(autoPlay),
    pagination: paginationSettings(pagination)
  }), renderChildrenWithSwiperSlide);
};
// Helper function to determine slides per view based on size
var getSlidesPerView = function getSlidesPerView(size) {
  switch (size) {
    case 'single':
      return 1;
    case 'wide':
      return 4;
    case 'normal':
    default:
      return 2;
  }
};
// Helper function to configure autoplay settings
var autoPlaySettings = function autoPlaySettings(autoPlay) {
  if (autoPlay) {
    return {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false
    };
  }
  return undefined;
};
// Helper function to configure pagination settings
var paginationSettings = function paginationSettings(pagination) {
  if (pagination) {
    return {
      clickable: true,
      renderBullet: function renderBullet(_, className) {
        return "<span class=\"".concat(className, "\"></span>");
      }
    };
  }
  return undefined;
};

exports.Carousel = Carousel;
