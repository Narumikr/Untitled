'use client';
'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

var LIGHT_MODE = 'light';
var DARK_MODE = 'dark';
var useThemeMode = function useThemeMode() {
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    isDarkMode = _useState2[0],
    setDarkMode = _useState2[1];
  React.useEffect(function () {
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

exports.DARK_MODE = DARK_MODE;
exports.LIGHT_MODE = LIGHT_MODE;
exports.useThemeMode = useThemeMode;
