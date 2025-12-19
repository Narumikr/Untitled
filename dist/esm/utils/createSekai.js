import { LIGHT_MODE } from '../hooks/useThemeMode.js';
import { COLORS_SEKAI_KEYS } from '../styles/sekai-colors.js';

var defaultTheme = {
  palette: {
    sekai: COLORS_SEKAI_KEYS.Miku,
    mode: LIGHT_MODE
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  }
};
var createSekai = function createSekai(option) {
  var _typography$fontFamil;
  var palette = option.palette,
    _option$typography = option.typography,
    typography = _option$typography === void 0 ? {} : _option$typography;
  var sekaiTheme = {
    palette: {
      sekai: palette.sekai,
      mode: palette.mode || defaultTheme.palette.mode
    },
    typography: {
      fontFamily: (_typography$fontFamil = typography.fontFamily) !== null && _typography$fontFamil !== void 0 ? _typography$fontFamil : defaultTheme.typography.fontFamily
    }
  };
  return sekaiTheme;
};

export { createSekai };
