'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';
import { getCurrentTime } from '../utils/timer.js';

var useCurrentTime = function useCurrentTime() {
  var _useState = useState(getCurrentTime()),
    _useState2 = _slicedToArray(_useState, 2),
    currentTime = _useState2[0],
    setCurrentTime = _useState2[1];
  useEffect(function () {
    var timer = setInterval(function () {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return function () {
      return clearInterval(timer);
    };
  }, []);
  return currentTime;
};

export { useCurrentTime };
