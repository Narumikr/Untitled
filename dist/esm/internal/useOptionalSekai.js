import { useContext } from 'react';
import { YourSekaiContext } from '../components/provider/YourSekaiProvider.js';
import { LIGHT_MODE } from '../hooks/useThemeMode.js';
import { colorsSekai, COLORS_SEKAI_KEYS } from '../styles/sekai-colors.js';

var defaultTheme = {
  palette: {
    sekai: COLORS_SEKAI_KEYS.Miku,
    mode: LIGHT_MODE
  }};
var useOptionalSekai = function useOptionalSekai(option) {
  var context = useContext(YourSekaiContext);
  var sekaiColor = context ? colorsSekai[option.sekai || context.sekaiTheme.palette.sekai] : colorsSekai[defaultTheme.palette.sekai];
  var modeTheme = context ? option.mode || context.sekaiTheme.palette.mode : defaultTheme.palette.mode;
  var isLight = LIGHT_MODE === modeTheme;
  return {
    sekaiColor: sekaiColor,
    modeTheme: modeTheme,
    isLight: isLight
  };
};

export { useOptionalSekai };
