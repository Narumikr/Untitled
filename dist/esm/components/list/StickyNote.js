'use client';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { LIGHT_MODE } from '../../hooks/useThemeMode.js';
import { ConsoleWarning } from '../../internal/logging.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgbaMixWithBlackOrWhite } from '../../utils/converter.js';
import { ListContext } from './List.js';
import { ListItemButton } from './ListItemButton.js';
import { ListItemText } from './ListItemText.js';
import styles from './StickyNote.module.scss.js';

var _excluded = ["sekai", "children", "as"];
var StickyNote = function StickyNote(_ref) {
  var sekai = _ref.sekai,
    children = _ref.children,
    _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'button' : _ref$as,
    rest = _objectWithoutProperties(_ref, _excluded);
  var isListWrap = useContext(ListContext);
  if (!isListWrap) ConsoleWarning('⚠ Warning: <StickyNote> should be used inside <List>');
  var stickyNoteContentsProps = {
    sekai: sekai,
    children: children
  };
  return 'button' === as ? /*#__PURE__*/React.createElement(ListItemButton, _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles['sekai-sticky-note'], rest.className),
    sekai: sekai,
    themeMode: LIGHT_MODE
  }), /*#__PURE__*/React.createElement(StickyNoteContents, stickyNoteContentsProps)) : /*#__PURE__*/React.createElement(ListItemText, _extends({}, rest, {
    ref: rest.ref,
    className: clsx(styles['sekai-sticky-note'], rest.className),
    sekai: sekai,
    themeMode: LIGHT_MODE
  }), /*#__PURE__*/React.createElement(StickyNoteContents, stickyNoteContentsProps));
};
var StickyNoteContents = function StickyNoteContents(_ref2) {
  var sekai = _ref2.sekai,
    children = _ref2.children;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorBg = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.6, isLight);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-sticky-note-parts'],
    style: optionStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-sticky-note-design']
  }), children);
};

export { StickyNote };
