'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _typeof = require('@babel/runtime/helpers/typeof');
var logging = require('../internal/logging.js');

/**
 * @description Utility functions for serializing and deserializing data, including handling of Date objects.
 * @param {T} data - The data to serialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The serialized data
 */
var serializeData = function serializeData(data) {
  var visited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
  // If data is Date instance, convert to ISO string
  if (data instanceof Date) {
    return data.toISOString();
  }
  // If data is an array, recursively serialize each element
  if (Array.isArray(data)) {
    return serializeArray(data, visited);
  }
  // If data is an object, recursively serialize each property
  if (data && _typeof(data) === 'object') {
    return serializeObject(data, visited);
  }
  // For other primitive types, return as is
  return data;
};
/**
 * @description Deserialize data, converting ISO date strings back to Date objects
 * @param {unknown} data - data to deserialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The deserialized data
 */
var deserializeData = function deserializeData(data) {
  var visited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
  // If data is a string and looks like an ISO date, convert to Date
  if (typeof data === 'string') {
    return deserializeDate(data);
  }
  // If data is an array, recursively deserialize each element
  if (Array.isArray(data)) {
    return deserializeArray(data, visited);
  }
  // If data is an object, recursively deserialize each property
  if (data != null && _typeof(data) === 'object') {
    return deserializeObject(data, visited);
  }
  // For other primitive types, return as is
  return data;
};
var deserializeDataWithTemplate = function deserializeDataWithTemplate(obj, template) {
  var visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new WeakSet();
  // If template is Date instance, and obj is string, convert to Date
  if (template instanceof Date && typeof obj === 'string') {
    return deserializeDateWithTemplate(obj);
  }
  // If template is an array, recursively temp each element
  if (Array.isArray(template)) {
    return deserializeArrayWithTemplate(obj, template, visited);
  }
  // If template is an object, recursively deserialize each property
  if (_typeof(template) === 'object') {
    return deserializeObjectWithTemplate(obj, template, visited);
  }
  // For other primitive types, return obj if same type, else template
  return obj;
};
/**
 * @description Validates if a string is a valid date string (ISO 8601 or other formats recognized by Date.parse)
 * @param dateStr - date string to validate
 * @returns boolean - whether the string is a valid date string
 */
var isValidDateString = function isValidDateString(dateStr) {
  var isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoRegex.test(dateStr.trim()) || !isNaN(Date.parse(dateStr));
};
// For searializeData start
// Helper function to searialize array
var serializeArray = function serializeArray(obj, visited) {
  if (Array.isArray(obj)) {
    if (visited.has(obj)) {
      throw new Error('Circular reference detected during serializeData');
    }
    visited.add(obj);
    var result = obj.map(function (el) {
      return serializeData(el, visited);
    });
    visited["delete"](obj);
    return result;
  }
  return obj;
};
// Helper function to searialize object
var serializeObject = function serializeObject(obj, visited) {
  if (visited.has(obj)) {
    throw new Error('Circular reference detected during deserialization');
  }
  if (obj instanceof Map || obj instanceof Set) {
    logging.ConsoleWarning('Map and Set are not supported for serialization. They will be converted to empty objects.');
  }
  if (isObject(obj)) {
    var serializedObj = {};
    for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      serializedObj[key] = serializeData(value);
    }
    return serializedObj;
  }
  return obj;
};
// For searializeData end
// For deserualizeData start
// Helper function to desearialize date
var deserializeDate = function deserializeDate(obj) {
  try {
    var dateDeserialized = new Date(obj);
    // Check if the date is valid
    if (!isNaN(dateDeserialized.getTime()) && obj.trim() !== '' && isValidDateString(obj)) {
      return dateDeserialized;
    }
    return obj;
  } catch (err) {
    throw new Error('Failed to parse date:' + err.message);
  }
};
// Helper function to deserialize array
var deserializeArray = function deserializeArray(obj, visited) {
  if (visited.has(obj)) {
    throw new Error('Circular reference detected during deserialization');
  }
  if (!Array.isArray(obj)) {
    return obj;
  }
  visited.add(obj);
  for (var i = 0; i < obj.length; i++) {
    var deserializedElement = deserializeData(obj[i], visited);
    if (deserializedElement !== obj[i]) {
      var result = obj.slice(0, i);
      result[i] = deserializedElement;
      for (var j = i + 1; j < obj.length; j++) {
        result[j] = deserializeData(obj[j], visited);
      }
      visited["delete"](obj);
      return result;
    }
  }
  visited["delete"](obj);
  return obj;
};
// Helper function to deserialize object
var deserializeObject = function deserializeObject(obj, visited) {
  if (!isObject(obj)) {
    return obj;
  }
  if (visited.has(obj)) {
    throw new Error('Circular reference detected during deserialization');
  }
  visited.add(obj);
  var entries = Object.entries(obj);
  for (var i = 0; i < entries.length; i++) {
    var _entries$i = _slicedToArray(entries[i], 2),
      key = _entries$i[0],
      value = _entries$i[1];
    var deserializedValue = deserializeData(value, visited);
    if (deserializedValue !== value) {
      var deserializedObj = {};
      for (var j = 0; j < i; j++) {
        var _entries$j = _slicedToArray(entries[j], 2),
          prevKey = _entries$j[0],
          prevValue = _entries$j[1];
        deserializedObj[prevKey] = prevValue;
      }
      deserializedObj[key] = deserializedValue;
      for (var _j = i + 1; _j < entries.length; _j++) {
        var _entries$_j = _slicedToArray(entries[_j], 2),
          remainingKey = _entries$_j[0],
          remainingValue = _entries$_j[1];
        deserializedObj[remainingKey] = deserializeData(remainingValue, visited);
      }
      visited["delete"](obj);
      return deserializedObj;
    }
  }
  visited["delete"](obj);
  return obj;
};
// For deserualizeData end
// For deserializeDataWithTemplate start
// Helper function to deserialize date with template
var deserializeDateWithTemplate = function deserializeDateWithTemplate(obj) {
  try {
    var date = new Date(obj);
    // Check if the date is valid
    if (!isNaN(date.getTime()) && obj.trim() !== '' && isValidDateString(obj)) {
      return date;
    }
    return obj;
  } catch (err) {
    throw new Error('Failed to parse date:' + err.message);
  }
};
// Helper function to deserialize array with template
var deserializeArrayWithTemplate = function deserializeArrayWithTemplate(obj, template, visited) {
  var templateArray = template;
  if (visited.has(obj)) {
    throw new Error('Circular reference detected during deserialization with template');
  }
  if (!Array.isArray(obj)) {
    return obj;
  }
  if (templateArray.length === 0) {
    return obj;
  }
  visited.add(obj);
  var result = obj.map(function (el, index) {
    var _templateArray$index;
    var templateItem = (_templateArray$index = templateArray[index]) !== null && _templateArray$index !== void 0 ? _templateArray$index : templateArray[0];
    return deserializeDataWithTemplate(el, templateItem, visited);
  });
  visited["delete"](obj);
  return result;
};
// Helper function to deserialize object with template
var deserializeObjectWithTemplate = function deserializeObjectWithTemplate(obj, template, visited) {
  if (!isObject(obj)) {
    return obj;
  }
  if (visited.has(obj)) {
    throw new Error('Circular reference detected during deserialization with template');
  }
  visited.add(obj);
  var deserializedObj = {};
  for (var key in template) {
    if (key in template) {
      deserializedObj[key] = deserializeDataWithTemplate(obj[key], template[key], visited);
    }
  }
  visited["delete"](obj);
  return deserializedObj;
};
// For deserializeDataWithTemplate end
var isObject = function isObject(value) {
  return value !== null && _typeof(value) === 'object' && !Array.isArray(value);
};

exports.deserializeData = deserializeData;
exports.deserializeDataWithTemplate = deserializeDataWithTemplate;
exports.isValidDateString = isValidDateString;
exports.serializeData = serializeData;
