'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';

var VIEW_BREAKPOINT_PORTRAIT = 768;
var VIEW_BREAKPOINT_TABLET = 1280;
var ORIENTATION = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE'
};
var useInnerSize = function useInnerSize() {
  var _document;
  var isClient = typeof window !== 'undefined' && typeof ((_document = document) === null || _document === void 0 ? void 0 : _document.documentElement) !== 'undefined';
  var _useState = useState(function () {
      return isClient ? Math.min(document.documentElement.clientWidth, window.innerWidth) : 0;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    windowSize = _useState2[0],
    setWindowSize = _useState2[1];
  var handlerResize = function handlerResize() {
    setWindowSize(Math.min(document.documentElement.clientWidth, window.innerWidth));
  };
  useEffect(function () {
    // useEffect is guaranteed to run only on the client side. So u need check isClient
    handlerResize();
    window.addEventListener('resize', handlerResize);
    return function () {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);
  return windowSize;
};
/**
 * @description This hook is used to get the current window size and orientation.
 * Return Portrait if the window size is 768px or less, otherwise return Landscape.
 */
var useOrientation = function useOrientation() {
  var windowSize = useInnerSize();
  return windowSize <= VIEW_BREAKPOINT_PORTRAIT ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE;
};
/**
 * @description This hook is used to get the current window size and check if it is in tablet size.
 * Return true if the window size is between 768px and 1280px, otherwise return false.
 */
var useTabletSize = function useTabletSize() {
  var windowSize = useInnerSize();
  return windowSize >= VIEW_BREAKPOINT_PORTRAIT && windowSize < VIEW_BREAKPOINT_TABLET;
};

export { ORIENTATION, useInnerSize, useOrientation, useTabletSize };
