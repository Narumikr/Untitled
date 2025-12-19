'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ConsoleError } from '../internal/logging.js';
import { deserializeDataWithTemplate, serializeData } from '../utils/serialization.js';

var useLocalStorage = function useLocalStorage(localStorageKey, initialValue) {
  var _useState = useState(initialValue),
    _useState2 = _slicedToArray(_useState, 2),
    storedValue = _useState2[0],
    setStoredValue = _useState2[1];
  var isInitialized = useRef(false);
  useEffect(function () {
    if (isInitialized.current) return;
    isInitialized.current = true;
    try {
      var items = localStorage.getItem(localStorageKey);
      if (items) {
        var parsed = deserializeDataWithTemplate(JSON.parse(items), initialValue);
        setStoredValue(parsed);
      }
    } catch (err) {
      ConsoleError('Failed to get local storage value : ', err);
    }
  }, [initialValue, localStorageKey]);
  useEffect(function () {
    if (!isInitialized.current) return;
    try {
      var serialized = JSON.stringify(serializeData(storedValue));
      localStorage.setItem(localStorageKey, serialized);
    } catch (err) {
      ConsoleError('Failed to set local storage : ', err);
    }
  }, [localStorageKey, storedValue]);
  useEffect(function () {
    var updateLocalStorage = function updateLocalStorage(e) {
      try {
        if (e.key !== localStorageKey) return;
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          var parsed = JSON.parse(e.newValue);
          setStoredValue(deserializeDataWithTemplate(parsed, initialValue));
        }
      } catch (err) {
        ConsoleError('Failed to set local storage : ', err);
      }
    };
    window.addEventListener('storage', updateLocalStorage);
    return function () {
      return window.removeEventListener('storage', updateLocalStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var deleteLocalStorage = useCallback(function () {
    setStoredValue(initialValue);
    localStorage.removeItem(localStorageKey);
  }, [initialValue, localStorageKey]);
  return {
    storedValue: storedValue,
    setStoredValue: setStoredValue,
    deleteLocalStorage: deleteLocalStorage
  };
};

export { useLocalStorage };
