'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import styles from './Carousel.module.scss.js';

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
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiBulletColor = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.2, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-bullet-color': sekaiBulletColor
  };
  var swiperModules = [pagination ? Pagination : undefined, autoPlay ? Autoplay : undefined].filter(Boolean);
  var renderChildrenWithSwiperSlide = React.Children.map(children, function (child, idx) {
    if (/*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.createElement(SwiperSlide, {
        key: "carousel-slide-".concat(idx)
      }, child);
    }
    return child;
  });
  return /*#__PURE__*/React.createElement(Swiper, _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles['sekai-carousel'], rest.className),
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

export { Carousel };
