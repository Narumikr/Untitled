'use client';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ConsoleError } from '../internal/logging.js';
import { deserializeDataWithTemplate, serializeData } from '../utils/serialization.js';

var useSessionStorage = function useSessionStorage(sessionStorageKey, initialValue) {
  var _useState = useState(initialValue),
    _useState2 = _slicedToArray(_useState, 2),
    storedValue = _useState2[0],
    setStoredValue = _useState2[1];
  var isInitialized = useRef(false);
  useEffect(function () {
    if (isInitialized.current) return;
    isInitialized.current = true;
    try {
      var items = sessionStorage.getItem(sessionStorageKey);
      if (items) {
        var parsed = deserializeDataWithTemplate(JSON.parse(items), initialValue);
        setStoredValue(parsed);
      }
    } catch (err) {
      ConsoleError('Failed to get session storage value : ', err);
    }
  }, [initialValue, sessionStorageKey]);
  useEffect(function () {
    if (!isInitialized.current) return;
    try {
      var serialized = JSON.stringify(serializeData(storedValue));
      sessionStorage.setItem(sessionStorageKey, serialized);
    } catch (err) {
      ConsoleError('Failed to set session storage : ', err);
    }
  }, [sessionStorageKey, storedValue]);
  var deleteSessionStorage = useCallback(function () {
    setStoredValue(initialValue);
    sessionStorage.removeItem(sessionStorageKey);
  }, [initialValue, sessionStorageKey]);
  return {
    storedValue: storedValue,
    setStoredValue: setStoredValue,
    deleteSessionStorage: deleteSessionStorage
  };
};

export { useSessionStorage };
