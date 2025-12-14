import React from 'react';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var EqualizerIcon = function EqualizerIcon(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? '#121212' : '#ffffff';
  var barConfigs = [{
    delay: '0s',
    from: {
      height: '15px',
      y: '70px'
    },
    to: {
      height: '50px',
      y: '35px'
    }
  }, {
    delay: '0.2s',
    from: {
      height: '30px',
      y: '55px'
    },
    to: {
      height: '70px',
      y: '15px'
    }
  }, {
    delay: '0.4s',
    from: {
      height: '25px',
      y: '60px'
    },
    to: {
      height: '65px',
      y: '20px'
    }
  }, {
    delay: '0.1s',
    from: {
      height: '35px',
      y: '50px'
    },
    to: {
      height: '60px',
      y: '25px'
    }
  }, {
    delay: '0.3s',
    from: {
      height: '20px',
      y: '65px'
    },
    to: {
      height: '45px',
      y: '40px'
    }
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EqualizerStyled, null), /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "24",
    height: "24",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      '--sekai-color': sekaiColor,
      '--theme-color': color
    }
  }, barConfigs.map(function (config, index) {
    return /*#__PURE__*/React.createElement("rect", {
      key: index,
      className: "bar",
      x: 6 + index * 20,
      y: parseInt(config.from.y),
      width: "8",
      height: parseInt(config.from.height),
      style: {
        'animationDelay': config.delay,
        '--from-height': config.from.height,
        '--from-y': config.from.y,
        '--to-height': config.to.height,
        '--to-y': config.to.y
      }
    });
  })));
};
var EqualizerStyled = function EqualizerStyled() {
  return /*#__PURE__*/React.createElement("style", null, "\n      .bar {\n        fill: var(--sekai-color);\n        stroke: var(--theme-color);\n        stroke-width: 1;\n        animation-duration: 1s;\n        animation-iteration-count: infinite;\n        animation-direction: alternate;\n        animation-timing-function: ease-in-out;\n        animation-name: bar-animation;\n      }\n      \n      @keyframes bar-animation {\n        0% { \n          height: var(--from-height); \n          y: var(--from-y); \n        }\n        100% { \n          height: var(--to-height); \n          y: var(--to-y); \n        }\n      }\n    ");
};

export { EqualizerIcon };
