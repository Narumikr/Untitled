'use client';
'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var clsx = require('clsx');
var logging = require('../../internal/logging.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var List = require('./List.js');
var List_module = require('./List.module.scss.js');

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var rippleEffectClassName = 'sekai-ripple';
var ListItemButton = function ListItemButton(_ref) {
  var id = _ref.id,
    className = _ref.className,
    style = _ref.style,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    children = _ref.children,
    icon = _ref.icon,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    onClick = _ref.onClick;
  var isListWrap = React.useContext(List.ListContext);
  if (!isListWrap) logging.ConsoleWarning('⚠ Warning: <ListItemButton> should be used inside <List>');
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  var listItemButtonRef = React.useRef(null);
  var createRipple = function createRipple(event) {
    var listItemButton = listItemButtonRef.current;
    if (!listItemButton) return;
    var rect = listItemButton.getBoundingClientRect();
    var size = Math.max(listItemButton.clientWidth, listItemButton.clientHeight);
    var _getClientCoordinates = getClientCoordinates(event),
      clientX = _getClientCoordinates.clientX,
      clientY = _getClientCoordinates.clientY;
    var x = clientX - rect.left - size / 2;
    var y = clientY - rect.top - size / 2;
    var ripple = createRippleEffect(x, y, size);
    removeRippleEffect(listItemButton);
    listItemButton.appendChild(ripple);
    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  };
  var handleOnClick = function handleOnClick(event) {
    createRipple(event);
    onClick === null || onClick === void 0 || onClick();
  };
  return /*#__PURE__*/React.createElement("li", {
    id: id,
    className: clsx(List_module['sekai-list-item-button'], className),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    ref: listItemButtonRef,
    className: List_module["sekai-list-button-".concat(modeTheme)],
    disabled: disabled,
    onClick: handleOnClick
  }, getImgComponent(icon), children));
};
var getImgComponent = function getImgComponent(icon) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return /*#__PURE__*/React.createElement("img", {
      className: List_module['sekai-list-icon'],
      src: icon,
      alt: ""
    });
  } else {
    return icon;
  }
};
var getClientCoordinates = function getClientCoordinates(event) {
  if ('clientX' in event) {
    return {
      clientX: event.clientX,
      clientY: event.clientY
    };
  }
  var touch = event.touches[0];
  return {
    clientX: touch.clientX,
    clientY: touch.clientY
  };
};
var createRippleEffect = function createRippleEffect(x, y, size) {
  var ripple = document.createElement('span');
  ripple.style.width = ripple.style.height = "".concat(size, "px");
  ripple.style.left = "".concat(x, "px");
  ripple.style.top = "".concat(y, "px");
  ripple.className = List_module["".concat(rippleEffectClassName)];
  return ripple;
};
var removeRippleEffect = function removeRippleEffect(element) {
  var ripple = element.getElementsByClassName(rippleEffectClassName)[0];
  if (ripple) ripple.remove();
};

exports.ListItemButton = ListItemButton;
