'use client';
'use strict';

var React = require('react');
var useSessionStorage = require('../../hooks/useSessionStorage.js');

var createSharedValueProvider = function createSharedValueProvider() {
  var SharedValueContext = /*#__PURE__*/React.createContext(null);
  var useSharedValueContext = function useSharedValueContext() {
    var context = React.useContext(SharedValueContext);
    if (!context) {
      throw new Error('useSharedValueContext must be used within a SharedValueProvider.');
    }
    return context;
  };
  var SharedValueProvider = function SharedValueProvider(_ref) {
    var children = _ref.children,
      sessionStorageKey = _ref.sessionStorageKey,
      defaultValue = _ref.defaultValue;
    var _useSessionStorage = useSessionStorage.useSessionStorage(sessionStorageKey, defaultValue),
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

exports.createSharedValueProvider = createSharedValueProvider;
