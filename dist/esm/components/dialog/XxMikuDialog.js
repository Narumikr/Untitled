'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { Backdrop } from '../backdrop/Backdrop.js';
import { DialogTitleHeader, DialogButtons } from './Dialog.js';
import { XxMikuSvg } from '../../img/xxmiku.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import { fireOnEscapeKey } from '../../utils/operation.js';
import styles from './XxMikuDialog.module.scss.js';

var _excluded = ["open", "themeMode", "children", "size", "containerComponent", "onClose", "title", "buttons"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var XxMikuDialog = function XxMikuDialog(_ref) {
  var open = _ref.open,
    themeMode = _ref.themeMode,
    children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    containerComponent = _ref.containerComponent,
    onClose = _ref.onClose,
    title = _ref.title,
    buttons = _ref.buttons,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      mode: themeMode
    }),
    modeTheme = _useOptionalSekai.modeTheme;
  var portalContainer = usePortalContainer(containerComponent);
  useEffect(function () {
    if (!open) return;
    var handleKeyDownEsc = fireOnEscapeKey(onClose);
    document.addEventListener('keydown', handleKeyDownEsc);
    return function () {
      return document.removeEventListener('keydown', handleKeyDownEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  var headerProps = {
    themeMode: themeMode,
    size: size,
    onClose: onClose,
    title: title
  };
  var xxButtonProps = useMemo(function () {
    return buttons === null || buttons === void 0 ? void 0 : buttons.map(function (button) {
      var type = button.type ? button.type : 'normal';
      return _objectSpread(_objectSpread({}, button), {}, {
        buttonStyle: clsx(styles["sekai-xxmiku-".concat(type, "-button")], styles["sekai-".concat(modeTheme)])
      });
    });
  }, [buttons, modeTheme]);
  var overlayProps = {
    id: 'xxmiku-dialog-overlay',
    open: open,
    themeMode: themeMode,
    containerComponent: containerComponent,
    centered: true
  };
  var buttonsProps = {
    themeMode: themeMode,
    buttons: xxButtonProps
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(Backdrop, overlayProps, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    ref: rest.ref,
    className: clsx(styles["sekai-container-".concat(size)], styles["sekai-".concat(modeTheme)], rest.className),
    "aria-label": title || 'Dialog'
  }), /*#__PURE__*/React.createElement(XxMikuSvg, {
    className: styles["sekai-xxmiku-svg-1-".concat(size)]
  }), /*#__PURE__*/React.createElement(XxMikuSvg, {
    className: styles["sekai-xxmiku-svg-2-".concat(size)]
  }), /*#__PURE__*/React.createElement(XxMikuSvg, {
    className: styles["sekai-xxmiku-svg-3-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(XxMikuSvg, {
    className: styles["sekai-xxmiku-svg-4-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement(XxMikuSvg, {
    className: styles["sekai-xxmiku-svg-5-".concat(size)],
    type: 'type2'
  }), /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-content-wrap']
  }, /*#__PURE__*/React.createElement(DialogTitleHeader, _extends({
    id: "xo-miku-dialog-header"
  }, headerProps)), children, /*#__PURE__*/React.createElement(DialogButtons, _extends({
    id: "xo-miku-dialog-buttons",
    className: styles['sekai-xxmiku-button']
  }, buttonsProps))))), portalContainer);
};

export { XxMikuDialog };
