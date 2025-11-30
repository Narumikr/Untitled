'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var SekaiBackground_module = require('./SekaiBackground.module.scss.js');

var _excluded = ["containerComponent", "bgOpacity"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PINK = "rgba(255, 186, 241, ";
var YELLOW = "rgba(255, 247, 148, ";
var AQUA = "rgba(149, 253, 255, ";
var PieceOfSekai = /*#__PURE__*/function () {
  function PieceOfSekai(canvas, ctx) {
    _classCallCheck(this, PieceOfSekai);
    _defineProperty(this, "x", 0);
    _defineProperty(this, "y", 0);
    _defineProperty(this, "size", 0);
    _defineProperty(this, "speedX", 0);
    _defineProperty(this, "speedY", 0);
    _defineProperty(this, "rotation", 0);
    _defineProperty(this, "rotationSpeed", 0);
    _defineProperty(this, "opacity", 0);
    _defineProperty(this, "age", 0);
    _defineProperty(this, "vertex1Y", 0);
    _defineProperty(this, "vertex2X", 0);
    _defineProperty(this, "vertex3X", 0);
    _defineProperty(this, "fadeInDuration", 2500);
    _defineProperty(this, "fullOpacityDuration", 2000 * (2 + Math.random() * 4));
    _defineProperty(this, "fadeOutDuration", 2500);
    _defineProperty(this, "lifetime", this.fadeInDuration + this.fullOpacityDuration + this.fadeOutDuration);
    _defineProperty(this, "color", '');
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }
  return _createClass(PieceOfSekai, [{
    key: "reset",
    value: function reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = 20 + Math.random() * 60;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = 0;
      this.age = 0;
      this.color = getColor();
      this.vertex1Y = -(this.size / 6 + Math.random() * this.size * 0.7);
      this.vertex2X = -(this.size / 3 + Math.random() * this.size * 0.9);
      this.vertex3X = this.size / 8 + Math.random() * this.size * 0.5;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      this.age += deltaTime;
      if (this.age < this.fadeInDuration) {
        this.opacity = this.age / this.fadeInDuration;
      } else if (this.age < this.fadeInDuration + this.fullOpacityDuration) {
        this.opacity = 1;
      } else if (this.age < this.lifetime) {
        var progress = (this.age - this.fadeInDuration - this.fullOpacityDuration) / this.fadeOutDuration;
        this.opacity = 1 - progress;
      }
      if (this.age >= this.lifetime) {
        this.reset();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      this.ctx.globalAlpha = this.opacity;
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.vertex1Y);
      this.ctx.lineTo(this.vertex2X, this.size / 2);
      this.ctx.lineTo(this.vertex3X, this.size / 2);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color + this.opacity + ')';
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }]);
}();
var getColor = function getColor() {
  var colorIndex = Math.floor(Math.random() * 3);
  switch (colorIndex) {
    case 0:
      return PINK;
    case 1:
      return YELLOW;
    case 2:
    default:
      return AQUA;
  }
};
var SekaiBackground = function SekaiBackground(_ref) {
  var containerComponent = _ref.containerComponent,
    bgOpacity = _ref.bgOpacity,
    rest = _objectWithoutProperties(_ref, _excluded);
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var canvasRef = React.useRef(null);
  React.useEffect(function () {
    var canvas = canvasRef.current;
    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    if (!canvas || !ctx) return;
    var resize = function resize() {
      if (!portalContainer) return;
      canvas.width = portalContainer.offsetWidth;
      canvas.height = portalContainer.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    var pieces = [];
    var pieceCount = 39;
    for (var i = 0; i < pieceCount; i++) {
      var t = new PieceOfSekai(canvas, ctx);
      t.age = Math.pow(Math.random(), 2) * t.lifetime;
      pieces.push(t);
    }
    var lastTime = 0;
    var _animate = function animate(time) {
      var delta = time - lastTime;
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(function (tri) {
        tri.update(delta);
        tri.draw();
      });
      requestAnimationFrame(_animate);
    };
    _animate(0);
    return function () {
      window.removeEventListener('resize', resize);
    };
  }, [portalContainer]);
  var optionStyle = _objectSpread({
    '--bg-opacity': bgOpacity !== undefined ? bgOpacity : 0.25
  }, containerComponent && {
    position: 'absolute'
  });
  if (!portalContainer) return null;
  return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: clsx(SekaiBackground_module['sekai-background-wrap'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: clsx(SekaiBackground_module['sekai-background'])
  })), portalContainer);
};

exports.SekaiBackground = SekaiBackground;
