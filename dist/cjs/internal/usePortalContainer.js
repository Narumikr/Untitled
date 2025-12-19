'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

var usePortalContainer = function usePortalContainer(containerComponent) {
  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    portalComponent = _useState2[0],
    setPortalComponent = _useState2[1];
  React.useEffect(function () {
    setPortalComponent(containerComponent || document.body);
  }, [containerComponent]);
  return portalComponent;
};

exports.usePortalContainer = usePortalContainer;
