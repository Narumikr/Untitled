/**
 * Returns the current time as a Date object.
 * @returns {Date} The current Date object.
 */
var getCurrentTime = function getCurrentTime() {
  return new Date();
};
/**
 * Returns the current time as a string in the specified format.
 * @param {Date} now - The current Date object.
 * @param {string} format - Format type ('datetime', 'date', 'time', 'timestamp', 'iso')
 * @param {string} locale - Locale (default: 'ja-JP')
 * @returns {string} Formatted time string
 */
var getFormattedTime = function getFormattedTime(now) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'datetime';
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ja-JP';
  switch (format) {
    case 'datetime':
      return now.toLocaleString(locale);
    case 'date':
      return now.toLocaleDateString(locale);
    case 'time':
      return now.toLocaleTimeString(locale);
    case 'timestamp':
      return now.getTime().toString();
    case 'iso':
      return now.toISOString();
    default:
      return now.toLocaleString(locale);
  }
};
/**
 * Returns the current time in a custom format.
 * @param {Date} now - The current Date object.
 * @param {string} pattern - Format pattern (e.g., 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} Formatted time string
 */
var getCustomCurrentTime = function getCustomCurrentTime(now) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';
  var year = String(now.getFullYear());
  var month = String(now.getMonth() + 1).padStart(2, '0');
  var day = String(now.getDate()).padStart(2, '0');
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');
  return pattern.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('HH', hours).replace('mm', minutes).replace('ss', seconds);
};

export { getCurrentTime, getCustomCurrentTime, getFormattedTime };
