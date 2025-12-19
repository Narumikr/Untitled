'use client';
'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var timer = require('../utils/timer.js');

var useCurrentTime = function useCurrentTime() {
  var _useState = React.useState(timer.getCurrentTime()),
    _useState2 = _slicedToArray(_useState, 2),
    currentTime = _useState2[0],
    setCurrentTime = _useState2[1];
  React.useEffect(function () {
    var timer$1 = setInterval(function () {
      setCurrentTime(timer.getCurrentTime());
    }, 1000);
    return function () {
      return clearInterval(timer$1);
    };
  }, []);
  return currentTime;
};

exports.useCurrentTime = useCurrentTime;
