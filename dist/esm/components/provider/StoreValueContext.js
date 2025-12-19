'use client';
import React, { createContext, useContext } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage.js';

var createSharedValueProvider = function createSharedValueProvider() {
  var SharedValueContext = /*#__PURE__*/createContext(null);
  var useSharedValueContext = function useSharedValueContext() {
    var context = useContext(SharedValueContext);
    if (!context) {
      throw new Error('useSharedValueContext must be used within a SharedValueProvider.');
    }
    return context;
  };
  var SharedValueProvider = function SharedValueProvider(_ref) {
    var children = _ref.children,
      sessionStorageKey = _ref.sessionStorageKey,
      defaultValue = _ref.defaultValue;
    var _useSessionStorage = useSessionStorage(sessionStorageKey, defaultValue),
      sharedValue = _useSessionStorage.storedValue,
      setSharedValue = _useSessionStorage.setStoredValue,
      deleteSharedValue = _useSessionStorage.deleteSessionStorage;
    return /*#__PURE__*/React.createElement(SharedValueContext.Provider, {
      value: {
        sharedValue: sharedValue,
        setSharedValue: setSharedValue,
        deleteSharedValue: deleteSharedValue
      }
    }, children);
  };
  return {
    useSharedValueContext: useSharedValueContext,
    SharedValueProvider: SharedValueProvider
  };
};

export { createSharedValueProvider };
