'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';

var LIGHT_MODE = 'light';
var DARK_MODE = 'dark';
var useThemeMode = function useThemeMode() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    isDarkMode = _useState2[0],
    setDarkMode = _useState2[1];
  useEffect(function () {
    if (typeof window === 'undefined') return;
    var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var darkModeChangeListener = function darkModeChangeListener(event) {
      setDarkMode(event.matches);
    };
    setDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener('change', darkModeChangeListener);
    return function () {
      darkModeQuery.removeEventListener('change', darkModeChangeListener);
    };
  }, []);
  return isDarkMode === null ? LIGHT_MODE : isDarkMode ? DARK_MODE : LIGHT_MODE;
};

export { DARK_MODE, LIGHT_MODE, useThemeMode };
