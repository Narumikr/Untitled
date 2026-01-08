'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var clsx = require('clsx');
var chevron = require('../../img/chevron.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var global_module = require('../../styles/global.module.scss.js');
var Dropdown_module = require('./Dropdown.module.scss.js');

var _excluded = ["sekai", "themeMode", "options", "onSelect", "placeholder", "ref"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var MAX_OPTION_LENGTH = 5;
var OPTION_ITEM_HEIGHT = 40;
var BUTTON_BORDER_WIDTH = 2;
var Dropdown = function Dropdown(props) {
  var displayText = props.placeholder || props.defaultValue || '';
  return /*#__PURE__*/React.createElement(DropdownProvider, {
    displayText: displayText
  }, /*#__PURE__*/React.createElement(DropdownContent, props));
};
var DropdownContext = /*#__PURE__*/React.createContext(null);
var DropdownProvider = function DropdownProvider(_ref) {
  var children = _ref.children,
    displayText = _ref.displayText;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    openOptions = _useState2[0],
    setOpenOptions = _useState2[1];
  var _useState3 = React.useState(displayText || ''),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedValue = _useState4[0],
    setSelectedValue = _useState4[1];
  return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
    value: {
      openOptions: openOptions,
      setOpenOptions: setOpenOptions,
      selectedValue: selectedValue,
      setSelectedValue: setSelectedValue
    }
  }, children);
};
var DropdownContent = function DropdownContent(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode,
    options = _ref2.options,
    onSelect = _ref2.onSelect,
    placeholder = _ref2.placeholder,
    ref = _ref2.ref,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var wrapDropdownRef = React.useRef(null);
  var triggerButtonRef = React.useRef(null);
  var _ref3 = React.useContext(DropdownContext) || {},
    openOptions = _ref3.openOptions,
    setOpenOptions = _ref3.setOpenOptions;
  // Merge internal ref and forwarded ref
  var setRefs = React.useCallback(function (element) {
    wrapDropdownRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }, [ref]);
  var _useState5 = React.useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    dropdownPosStyle = _useState6[0],
    setDropdownPosStyle = _useState6[1];
  React.useEffect(function () {
    var refTriggerButton = triggerButtonRef.current;
    if (openOptions && refTriggerButton) {
      var triggerButtonRect = refTriggerButton.getBoundingClientRect();
      var optionLength = options.length > MAX_OPTION_LENGTH ? MAX_OPTION_LENGTH : options.length;
      var optionsHeight = OPTION_ITEM_HEIGHT * optionLength;
      var dropdownBottom = triggerButtonRect.bottom + optionsHeight;
      var overflow = dropdownBottom - window.innerHeight;
      var offSetY = overflow > 0 ? overflow + 20 : -1 * BUTTON_BORDER_WIDTH;
      setDropdownPosStyle({
        top: "calc(".concat(OPTION_ITEM_HEIGHT, "px - ").concat(offSetY, "px)")
      });
    }
  }, [openOptions, options.length]);
  // Close the dropdown when clicking outside of it
  React.useEffect(function () {
    var clickOutside = function clickOutside(event) {
      var refWrapDropdown = wrapDropdownRef.current;
      if (refWrapDropdown && !refWrapDropdown.contains(event.target)) {
        setOpenOptions === null || setOpenOptions === void 0 || setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('touchstart', clickOutside);
    return function () {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('touchstart', clickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Set the width of the trigger button to match the options list
  var _useState7 = React.useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    triggerWidth = _useState8[0],
    setTriggerWidth = _useState8[1];
  React.useEffect(function () {
    var button = triggerButtonRef.current;
    if (!button) return;
    var observer = new ResizeObserver(function (entries) {
      var _iterator = _createForOfIteratorHelper(entries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          var contentWidth = entry.contentRect.width;
          var contentPosX = entry.contentRect.x;
          setTriggerWidth(contentWidth + contentPosX * 2 + BUTTON_BORDER_WIDTH * 2);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    observer.observe(button);
    return function () {
      return observer.disconnect();
    };
  }, []);
  var optionStyle = React.useMemo(function () {
    return {
      width: "".concat(triggerWidth, "px")
    };
  }, [triggerWidth]);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: setRefs,
    className: clsx(Dropdown_module["sekai-dropdown-".concat(modeTheme)], rest.className),
    style: _objectSpread({
      '--sekai-color': sekaiColor
    }, rest.style || {})
  }), /*#__PURE__*/React.createElement(DropdownTriggerButton, {
    ref: triggerButtonRef,
    sekai: sekai,
    themeMode: themeMode,
    options: options,
    placeholder: placeholder
  }), /*#__PURE__*/React.createElement(DropdownOptions, {
    style: _objectSpread(_objectSpread({}, optionStyle), dropdownPosStyle),
    sekai: sekai,
    themeMode: themeMode,
    options: options,
    onSelect: onSelect
  }));
};
var DropdownTriggerButton = /*#__PURE__*/React.forwardRef(function (_ref4, ref) {
  var sekai = _ref4.sekai,
    themeMode = _ref4.themeMode,
    options = _ref4.options,
    placeholder = _ref4.placeholder;
  var _useOptionalSekai2 = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai2.sekaiColor,
    modeTheme = _useOptionalSekai2.modeTheme;
  var _ref5 = React.useContext(DropdownContext) || {},
    selectedValue = _ref5.selectedValue,
    openOptions = _ref5.openOptions,
    setOpenOptions = _ref5.setOpenOptions;
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  var displayText = React.useMemo(function () {
    var selectedOption = options.find(function (option) {
      return option.value === selectedValue;
    });
    return selectedOption ? selectedOption.label : placeholder;
  }, [options, selectedValue, placeholder]);
  var isDispPlaceholder = React.useMemo(function () {
    return placeholder === displayText;
  }, [placeholder, displayText]);
  var handleClick = function handleClick() {
    setOpenOptions === null || setOpenOptions === void 0 || setOpenOptions(!openOptions);
  };
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    className: Dropdown_module["sekai-dropdown-trigger-".concat(modeTheme)],
    onClick: handleClick,
    style: optionStyle
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx(_defineProperty({}, Dropdown_module['sekai-placeholder'], isDispPlaceholder))
  }, displayText), /*#__PURE__*/React.createElement(chevron.ChevronSvg, {
    className: clsx(Dropdown_module['sekai-dropdown-icon'], _defineProperty(_defineProperty({}, Dropdown_module['sekai-dropdown-icon-open'], openOptions), Dropdown_module["sekai-dropdown-icon-close"], !openOptions)),
    sekai: sekai,
    themeMode: themeMode,
    vector: "down"
  }));
});
DropdownTriggerButton.displayName = 'DropdownTriggerButton';
var DropdownOptions = function DropdownOptions(_ref6) {
  var style = _ref6.style,
    sekai = _ref6.sekai,
    themeMode = _ref6.themeMode,
    options = _ref6.options,
    onSelect = _ref6.onSelect;
  var _useOptionalSekai3 = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai3.sekaiColor,
    modeTheme = _useOptionalSekai3.modeTheme,
    isLight = _useOptionalSekai3.isLight;
  var _ref7 = React.useContext(DropdownContext) || {},
    setSelectedValue = _ref7.setSelectedValue,
    openOptions = _ref7.openOptions,
    setOpenOptions = _ref7.setOpenOptions;
  var sekaiColorShadow = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight);
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-shadow': sekaiColorShadow,
    '--sekai-color-hover': sekaiColorHover
  };
  var _useState9 = React.useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isVisible = _useState0[0],
    setIsVisible = _useState0[1];
  var _useState1 = React.useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    isRendered = _useState10[0],
    setIsRendered = _useState10[1];
  var open = function open() {
    setIsRendered(true);
    setTimeout(function () {
      return setIsVisible(true);
    }, 10);
  };
  var close = function close() {
    setIsVisible(false);
    setTimeout(function () {
      return setIsRendered(false);
    }, 200);
  };
  React.useEffect(function () {
    if (openOptions) {
      open();
    } else {
      close();
    }
  }, [openOptions]);
  var handleSelect = function handleSelect(value) {
    onSelect(value);
    setSelectedValue === null || setSelectedValue === void 0 || setSelectedValue(value);
    setOpenOptions === null || setOpenOptions === void 0 || setOpenOptions(false);
  };
  return isRendered ? /*#__PURE__*/React.createElement("ul", {
    className: clsx(Dropdown_module['sekai-dropdown-options-list'], _defineProperty(_defineProperty({}, Dropdown_module['sekai-dropdown-options-open'], isVisible), Dropdown_module['sekai-dropdown-options-close'], !isVisible), global_module["sekai-color-".concat(modeTheme)]),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement("li", {
      key: option.value,
      className: clsx(Dropdown_module['sekai-dropdown-option-item'])
    }, /*#__PURE__*/React.createElement("button", {
      className: clsx(global_module["sekai-color-".concat(modeTheme)]),
      onClick: function onClick() {
        return handleSelect(option.value);
      }
    }, option.label));
  })) : null;
};

exports.Dropdown = Dropdown;
exports.DropdownContent = DropdownContent;
