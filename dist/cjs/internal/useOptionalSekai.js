'use strict';

var React = require('react');
var YourSekaiProvider = require('../components/provider/YourSekaiProvider.js');
var useThemeMode = require('../hooks/useThemeMode.js');
var sekaiColors = require('../styles/sekai-colors.js');

var defaultTheme = {
  palette: {
    sekai: sekaiColors.COLORS_SEKAI_KEYS.Miku,
    mode: useThemeMode.LIGHT_MODE
  }};
var useOptionalSekai = function useOptionalSekai(option) {
  var context = React.useContext(YourSekaiProvider.YourSekaiContext);
  var sekaiColor = context ? sekaiColors.colorsSekai[option.sekai || context.sekaiTheme.palette.sekai] : sekaiColors.colorsSekai[defaultTheme.palette.sekai];
  var modeTheme = context ? option.mode || context.sekaiTheme.palette.mode : defaultTheme.palette.mode;
  var isLight = useThemeMode.LIGHT_MODE === modeTheme;
  return {
    sekaiColor: sekaiColor,
    modeTheme: modeTheme,
    isLight: isLight
  };
};

exports.useOptionalSekai = useOptionalSekai;
