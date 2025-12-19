/* eslint-disable no-console */
var ConsoleWarning = function ConsoleWarning() {
  if (process.env.NODE_ENV === 'development') {
    var _console2;
    (_console2 = console).warn.apply(_console2, arguments);
  }
};
var ConsoleError = function ConsoleError() {
  if (process.env.NODE_ENV === 'development') {
    var _console3;
    (_console3 = console).error.apply(_console3, arguments);
  }
};

export { ConsoleError, ConsoleWarning };
