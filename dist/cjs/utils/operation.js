'use strict';

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Enter key is pressed.
 * @param eventHandler - The function to be called when the Enter key is pressed.
 * @returns A new event handler that calls the provided handler on Enter key press and prevents the default action.
 */
var fireOnEnterKey = function fireOnEnterKey(eventHandler) {
  return function (e) {
    if (e.key === 'Enter') {
      eventHandler(e);
      e.preventDefault();
    }
  };
};
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Escape key is pressed.
 * @param eventHandler - The function to be called when the Escape key is pressed.
 * @returns A keyboard event handler function.
 */
var fireOnEscapeKey = function fireOnEscapeKey(eventHandler) {
  return function (e) {
    e.preventDefault();
    if (e.key === 'Escape') {
      eventHandler(e);
    }
  };
};
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Space key is pressed.
 * @param eventHandler - The function to be called when the Space key is pressed.
 * @returns A keyboard event handler function.
 */
var fireOnSpaceKey = function fireOnSpaceKey(eventHandler) {
  return function (e) {
    e.preventDefault();
    if (e.key === 'Space') {
      eventHandler(e);
    }
  };
};
/**
 * @description Returns a new array with the elements of the input array shuffled in random order.
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns A new array containing the shuffled elements.
 */
var shuffleArray = function shuffleArray(array) {
  var shuffledArray = _toConsumableArray(array);
  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [shuffledArray[j], shuffledArray[i]];
    shuffledArray[i] = _ref[0];
    shuffledArray[j] = _ref[1];
  }
  return shuffledArray;
};

exports.fireOnEnterKey = fireOnEnterKey;
exports.fireOnEscapeKey = fireOnEscapeKey;
exports.fireOnSpaceKey = fireOnSpaceKey;
exports.shuffleArray = shuffleArray;
