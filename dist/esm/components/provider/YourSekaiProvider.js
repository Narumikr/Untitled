'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { memo, useState, useEffect, useMemo, createContext, useCallback } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { DARK_MODE } from '../../hooks/useThemeMode.js';
import { COLOR_DARK_MODE, COLOR_LIGHT_MODE, BACKGROUND_DARK_MODE, BACKGROUND_LIGHT_MODE } from '../../internal/color.constant.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var YOUR_SEKAI_COLOR = 'your_sekai_color';
var YOUR_COLOR_THEME = 'your_color_theme';
var YourSekaiContext = /*#__PURE__*/createContext(null);
var YourSekaiProvider = function YourSekaiProvider(_ref) {
  var children = _ref.children,
    sekaiTheme = _ref.sekaiTheme;
  var _useLocalStorage = useLocalStorage(YOUR_SEKAI_COLOR, sekaiTheme.palette.sekai),
    sekaiColor = _useLocalStorage.storedValue,
    setSekaiColor = _useLocalStorage.setStoredValue;
  var _useLocalStorage2 = useLocalStorage(YOUR_COLOR_THEME, sekaiTheme.palette.mode),
    colorTheme = _useLocalStorage2.storedValue,
    setColorTheme = _useLocalStorage2.setStoredValue;
  var switchSekaiColor = useCallback(function (sekai) {
    setSekaiColor(sekai);
  }, [setSekaiColor]);
  var switchColorTheme = useCallback(function (color) {
    setColorTheme(color);
  }, [setColorTheme]);
  var currentSekaiTheme = useMemo(function () {
    return _objectSpread(_objectSpread({}, sekaiTheme), {}, {
      palette: _objectSpread(_objectSpread({}, sekaiTheme.palette), {}, {
        sekai: sekaiColor,
        mode: colorTheme
      })
    });
  }, [colorTheme, sekaiColor, sekaiTheme]);
  var contextValue = useMemo(function () {
    return {
      sekaiTheme: currentSekaiTheme,
      switchSekaiColor: switchSekaiColor,
      switchColorTheme: switchColorTheme
    };
  }, [currentSekaiTheme, switchColorTheme, switchSekaiColor]);
  return /*#__PURE__*/React.createElement(YourSekaiContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(GlobalStyle, {
    theme: currentSekaiTheme
  }), children);
};
var GlobalStyle = /*#__PURE__*/memo(function (_ref2) {
  var theme = _ref2.theme;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isClient = _useState2[0],
    setIsClient = _useState2[1];
  useEffect(function () {
    setIsClient(true);
  }, []);
  var style = useMemo(function () {
    return "\n    * {\n      font-family: ".concat(theme.typography.fontFamily, ";\n    }\n    body {\n      color: ").concat(theme.palette.mode === DARK_MODE ? COLOR_DARK_MODE : COLOR_LIGHT_MODE, ";\n      background: ").concat(theme.palette.mode === DARK_MODE ? BACKGROUND_DARK_MODE : BACKGROUND_LIGHT_MODE, ";\n    }\n  ");
  }, [theme.palette.mode, theme.typography.fontFamily]);
  if (!isClient) return null;
  return /*#__PURE__*/React.createElement("style", null, style);
});
GlobalStyle.displayName = 'GlobalStyle';

export { YOUR_COLOR_THEME, YOUR_SEKAI_COLOR, YourSekaiContext, YourSekaiProvider };
