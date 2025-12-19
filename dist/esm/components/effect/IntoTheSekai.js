'use client';
import _extends from '@babel/runtime/helpers/extends';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import styles from './IntoTheSekai.module.scss.js';

var _excluded = ["execEvent", "containerComponent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PINK = 'rgb(255, 186, 241, {0})';
var YELLOW = 'rgb(255, 247, 148, {0})';
var AQUA = 'rgb(149, 253, 255, {0})';
var IntoTheSekai = function IntoTheSekai(_ref) {
  var execEvent = _ref.execEvent,
    containerComponent = _ref.containerComponent,
    rest = _objectWithoutProperties(_ref, _excluded);
  var portalContainer = usePortalContainer(containerComponent);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    startAnimation = _useState2[0],
    setStartAnimation = _useState2[1];
  var canvasRef = useRef(null);
  var sekaiPieceRef = useRef([]);
  var optionStyle = _objectSpread({}, containerComponent && {
    position: 'absolute'
  });
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var setCanvasSize = function setCanvasSize() {
      if (!portalContainer) return;
      canvas.width = portalContainer.offsetWidth;
      canvas.height = portalContainer.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    return function () {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [portalContainer]);
  useEffect(function () {
    var canvas = canvasRef.current;
    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    var animationFrameId;
    var _render = function render() {
      if (!ctx || !canvas || !startAnimation) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sekaiPieceRef.current = sekaiPieceRef.current.map(function (tri) {
        var newPoints = tri.points.map(function (p) {
          return {
            x: p.x + tri.velocity.x,
            y: p.y + tri.velocity.y
          };
        });
        return _objectSpread(_objectSpread({}, tri), {}, {
          points: newPoints,
          opacity: tri.opacity - 0.0039
        });
      }).filter(function (t) {
        return t.opacity > 0;
      });
      if (sekaiPieceRef.current.length === 0) {
        setTimeout(function () {
          execEvent === null || execEvent === void 0 || execEvent();
        }, 1000 * 0.39);
        setStartAnimation(false);
      }
      sekaiPieceRef.current.forEach(function (tri, index) {
        ctx.beginPath();
        ctx.moveTo(tri.points[0].x, tri.points[0].y);
        tri.points.slice(1).forEach(function (p) {
          return ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fillStyle = "".concat(getPieceColor(index).replace('{0}', "".concat(tri.opacity)));
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(_render);
    };
    _render();
    return function () {
      return cancelAnimationFrame(animationFrameId);
    };
  }, [execEvent, startAnimation]);
  var handleClick = function handleClick(e) {
    if (!portalContainer) return;
    setStartAnimation(true);
    var rect = portalContainer.getBoundingClientRect();
    if (!rect) return;
    var effectX = getClickPosition(e).clientX - rect.left;
    var effectY = getClickPosition(e).clientY - rect.top;
    var newPieceOfSekai = createSekaiPiece(effectX, effectY);
    sekaiPieceRef.current = [].concat(_toConsumableArray(sekaiPieceRef.current), _toConsumableArray(newPieceOfSekai));
  };
  if (!portalContainer) return null;
  return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement("canvas", _extends({}, rest, {
    className: clsx(styles['into-the-sekai'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    ref: canvasRef,
    onClick: handleClick
  })), portalContainer);
};
var getClickPosition = function getClickPosition(e) {
  if ('touches' in e) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    };
  } else {
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
  }
};
var createSekaiPiece = function createSekaiPiece(x, y) {
  return Array.from({
    length: 60
  }).map(function () {
    var angle = Math.random() * 2 * Math.PI;
    var speed = Math.random() * 2 + 1;
    var velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    var points = Array.from({
      length: 3
    }).map(function () {
      return {
        x: x + Math.random() * 80 - 40,
        y: y + Math.random() * 80 - 40
      };
    });
    return {
      points: points,
      velocity: velocity,
      opacity: 1
    };
  });
};
var getPieceColor = function getPieceColor(index) {
  switch (index % 3) {
    case 0:
      return PINK;
    case 1:
      return AQUA;
    case 2:
    default:
      return YELLOW;
  }
};

export { IntoTheSekai };
