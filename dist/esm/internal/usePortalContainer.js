import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';

var usePortalContainer = function usePortalContainer(containerComponent) {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    portalComponent = _useState2[0],
    setPortalComponent = _useState2[1];
  useEffect(function () {
    setPortalComponent(containerComponent || document.body);
  }, [containerComponent]);
  return portalComponent;
};

export { usePortalContainer };
