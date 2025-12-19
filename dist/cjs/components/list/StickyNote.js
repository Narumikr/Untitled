'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var useThemeMode = require('../../hooks/useThemeMode.js');
var logging = require('../../internal/logging.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var List = require('./List.js');
var ListItemButton = require('./ListItemButton.js');
var ListItemText = require('./ListItemText.js');
var StickyNote_module = require('./StickyNote.module.scss.js');

var _excluded = ["sekai", "children", "as"];
var StickyNote = function StickyNote(_ref) {
  var sekai = _ref.sekai,
    children = _ref.children,
    _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'button' : _ref$as,
    rest = _objectWithoutProperties(_ref, _excluded);
  var isListWrap = React.useContext(List.ListContext);
  if (!isListWrap) logging.ConsoleWarning('⚠ Warning: <StickyNote> should be used inside <List>');
  var stickyNoteContentsProps = {
    sekai: sekai,
    children: children
  };
  return 'button' === as ? /*#__PURE__*/React.createElement(ListItemButton.ListItemButton, _extends({}, rest, {
    className: clsx(StickyNote_module['sekai-sticky-note'], rest.className),
    sekai: sekai,
    themeMode: useThemeMode.LIGHT_MODE
  }), /*#__PURE__*/React.createElement(StickyNoteContents, stickyNoteContentsProps)) : /*#__PURE__*/React.createElement(ListItemText.ListItemText, _extends({}, rest, {
    className: clsx(StickyNote_module['sekai-sticky-note'], rest.className),
    sekai: sekai,
    themeMode: useThemeMode.LIGHT_MODE
  }), /*#__PURE__*/React.createElement(StickyNoteContents, stickyNoteContentsProps));
};
var StickyNoteContents = function StickyNoteContents(_ref2) {
  var sekai = _ref2.sekai,
    children = _ref2.children;
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorBg = converter.convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.6, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  return /*#__PURE__*/React.createElement("div", {
    className: StickyNote_module['sekai-sticky-note-parts'],
    style: optionStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: StickyNote_module['sekai-sticky-note-design']
  }), children);
};

exports.StickyNote = StickyNote;
