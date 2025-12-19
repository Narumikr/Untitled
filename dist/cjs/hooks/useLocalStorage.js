'use client';
'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var logging = require('../internal/logging.js');
var serialization = require('../utils/serialization.js');

var useLocalStorage = function useLocalStorage(localStorageKey, initialValue) {
  var _useState = React.useState(initialValue),
    _useState2 = _slicedToArray(_useState, 2),
    storedValue = _useState2[0],
    setStoredValue = _useState2[1];
  var isInitialized = React.useRef(false);
  React.useEffect(function () {
    if (isInitialized.current) return;
    isInitialized.current = true;
    try {
      var items = localStorage.getItem(localStorageKey);
      if (items) {
        var parsed = serialization.deserializeDataWithTemplate(JSON.parse(items), initialValue);
        setStoredValue(parsed);
      }
    } catch (err) {
      logging.ConsoleError('Failed to get local storage value : ', err);
    }
  }, [initialValue, localStorageKey]);
  React.useEffect(function () {
    if (!isInitialized.current) return;
    try {
      var serialized = JSON.stringify(serialization.serializeData(storedValue));
      localStorage.setItem(localStorageKey, serialized);
    } catch (err) {
      logging.ConsoleError('Failed to set local storage : ', err);
    }
  }, [localStorageKey, storedValue]);
  React.useEffect(function () {
    var updateLocalStorage = function updateLocalStorage(e) {
      try {
        if (e.key !== localStorageKey) return;
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          var parsed = JSON.parse(e.newValue);
          setStoredValue(serialization.deserializeDataWithTemplate(parsed, initialValue));
        }
      } catch (err) {
        logging.ConsoleError('Failed to set local storage : ', err);
      }
    };
    window.addEventListener('storage', updateLocalStorage);
    return function () {
      return window.removeEventListener('storage', updateLocalStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var deleteLocalStorage = React.useCallback(function () {
    setStoredValue(initialValue);
    localStorage.removeItem(localStorageKey);
  }, [initialValue, localStorageKey]);
  return {
    storedValue: storedValue,
    setStoredValue: setStoredValue,
    deleteLocalStorage: deleteLocalStorage
  };
};

exports.useLocalStorage = useLocalStorage;
