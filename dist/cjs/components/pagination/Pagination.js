'use client';
'use strict';

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var arrow = require('../../img/arrow.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var converter = require('../../utils/converter.js');
var Pagination_module = require('./Pagination.module.scss.js');

var _excluded = ["sekai", "themeMode", "count", "page", "onChangePage", "siblingCount", "size"],
  _excluded2 = ["size", "isPrev", "onClick"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PaginationConstants = {
  PageTop: 0,
  Ellipsis: -1,
  BorderItemRange: 2,
  DefaultSiblingCount: 1
};
var Pagination = function Pagination(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    count = _ref.count,
    page = _ref.page,
    onChangePage = _ref.onChangePage,
    _ref$siblingCount = _ref.siblingCount,
    siblingCount = _ref$siblingCount === void 0 ? PaginationConstants.DefaultSiblingCount : _ref$siblingCount,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = converter.convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.4);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  };
  var _usePaginagion = usePaginagion({
      count: count,
      page: page,
      onChangePage: onChangePage,
      siblingCount: siblingCount
    }),
    currentPage = _usePaginagion.currentPage,
    handleChangePage = _usePaginagion.handleChangePage,
    handlePrevPage = _usePaginagion.handlePrevPage,
    handleNextPage = _usePaginagion.handleNextPage,
    rangePagination = _usePaginagion.rangePagination;
  var ctrlButtonProps = {
    sekai: sekai,
    themeMode: themeMode,
    size: size
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: rest.ref,
    className: clsx(Pagination_module["sekai-pagination-".concat(size)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement(CtrlButton, _extends({}, ctrlButtonProps, {
    isPrev: true,
    onClick: handlePrevPage
  })), rangePagination.map(function (item, index) {
    if (item === PaginationConstants.Ellipsis) {
      return /*#__PURE__*/React.createElement("span", {
        key: index,
        className: Pagination_module['sekai-pagination-ellipsis']
      }, '...');
    }
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      className: clsx(Pagination_module["sekai-pagination-button-".concat(size)], Pagination_module["sekai-color-".concat(modeTheme)], _defineProperty({}, Pagination_module["sekai-pagination-selected"], item === currentPage)),
      onClick: function onClick() {
        return handleChangePage(item);
      }
    }, item + 1);
  }), /*#__PURE__*/React.createElement(CtrlButton, _extends({}, ctrlButtonProps, {
    isPrev: false,
    onClick: handleNextPage
  })));
};
var CtrlButton = function CtrlButton(_ref2) {
  var size = _ref2.size,
    isPrev = _ref2.isPrev,
    onClick = _ref2.onClick,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  var vector = isPrev ? 'left' : 'right';
  return /*#__PURE__*/React.createElement("button", {
    className: clsx(Pagination_module["sekai-pagination-button-".concat(size)]),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(arrow.ArrowSvg, _extends({}, rest, {
    vector: vector,
    className: Pagination_module['sekai-pagination-arrow']
  })));
};
var usePaginagion = function usePaginagion(_ref3) {
  var count = _ref3.count,
    page = _ref3.page,
    onChangePage = _ref3.onChangePage,
    _ref3$siblingCount = _ref3.siblingCount,
    siblingCount = _ref3$siblingCount === void 0 ? PaginationConstants.DefaultSiblingCount : _ref3$siblingCount;
  var pageLastIndex = React.useMemo(function () {
    return count - 1;
  }, [count]);
  var _useState = React.useState(page !== null && page !== void 0 ? page : PaginationConstants.PageTop),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var handleChangePage = React.useCallback(function (page) {
    if (PaginationConstants.PageTop > page || page > pageLastIndex || page === PaginationConstants.Ellipsis) {
      return;
    }
    setCurrentPage(page);
    onChangePage === null || onChangePage === void 0 || onChangePage(page);
  }, [pageLastIndex, onChangePage]);
  var handlePrevPage = function handlePrevPage() {
    return handleChangePage(currentPage - 1);
  };
  var handleNextPage = function handleNextPage() {
    return handleChangePage(currentPage + 1);
  };
  // Calculate the left and right sibling indices,
  // and whether to show ellipses on the left and right sides.
  var _useMemo = React.useMemo(function () {
      var left = Math.max(currentPage - siblingCount, PaginationConstants.PageTop + PaginationConstants.BorderItemRange);
      var right = Math.min(currentPage + siblingCount, pageLastIndex - PaginationConstants.BorderItemRange);
      return [left, right, left > PaginationConstants.PageTop + PaginationConstants.BorderItemRange, right < pageLastIndex - PaginationConstants.BorderItemRange];
    }, [currentPage, siblingCount, pageLastIndex]),
    _useMemo2 = _slicedToArray(_useMemo, 4),
    leftSiblingIndex = _useMemo2[0],
    rightSiblingIndex = _useMemo2[1],
    isBorderLeftEllipsis = _useMemo2[2],
    isBorderRightEllipsis = _useMemo2[3];
  // Total number of pagination items to display:
  // 2 items at each end + siblings on both sides + the current page
  var dispItemsCount = React.useMemo(function () {
    return 2 * 2 + siblingCount * 2 + 1;
  }, [siblingCount]);
  var isEdgeIndex = React.useCallback(function (idx) {
    return PaginationConstants.BorderItemRange + siblingCount > idx || pageLastIndex - PaginationConstants.BorderItemRange - siblingCount < idx;
  }, [pageLastIndex, siblingCount]);
  // Function to calculate the middle range of pagination
  var calculateMiddleRange = React.useCallback(function () {
    if (isEdgeIndex(currentPage)) {
      var halfDisplayRange = Math.floor(Math.min(dispItemsCount, count - 1) / 2);
      var leftEdge = halfDisplayRange >= currentPage ? Math.max(2, halfDisplayRange - siblingCount) : Math.min(pageLastIndex - 2, Math.max(pageLastIndex - halfDisplayRange - siblingCount, halfDisplayRange));
      return Array.from({
        length: Math.min(pageLastIndex - 1, leftEdge + 1 + siblingCount * 2) - leftEdge
      }, function (_, i) {
        return leftEdge + i;
      });
    } else {
      return Array.from({
        length: rightSiblingIndex - leftSiblingIndex + 1
      }, function (_, i) {
        return leftSiblingIndex + i;
      });
    }
  }, [currentPage, siblingCount, count, dispItemsCount, isEdgeIndex, leftSiblingIndex, rightSiblingIndex, pageLastIndex]);
  // Final range builder
  var rangePagination = React.useMemo(function () {
    if (count <= PaginationConstants.BorderItemRange * 2 + 1) return Array.from({
      length: count
    }, function (_, i) {
      return i;
    });
    return [PaginationConstants.PageTop].concat(_toConsumableArray(isBorderLeftEllipsis && dispItemsCount < count ? [PaginationConstants.Ellipsis] : [PaginationConstants.PageTop + 1]), _toConsumableArray(calculateMiddleRange()), _toConsumableArray(isBorderRightEllipsis && dispItemsCount < count ? [PaginationConstants.Ellipsis] : [pageLastIndex - 1]), [pageLastIndex]);
  }, [count, pageLastIndex, dispItemsCount, isBorderLeftEllipsis, isBorderRightEllipsis, calculateMiddleRange]);
  return {
    currentPage: currentPage,
    handleChangePage: handleChangePage,
    handlePrevPage: handlePrevPage,
    handleNextPage: handleNextPage,
    rangePagination: rangePagination
  };
};

exports.Pagination = Pagination;
