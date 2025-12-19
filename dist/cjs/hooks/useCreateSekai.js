'use client';
'use strict';

var React = require('react');
var YourSekaiProvider = require('../components/provider/YourSekaiProvider.js');

var useCreateSekai = function useCreateSekai() {
  var context = React.useContext(YourSekaiProvider.YourSekaiContext);
  if (!context) {
    throw new Error('useCreateSekai must be used within a YourSekaiProvider');
  }
  return context;
};

exports.useCreateSekai = useCreateSekai;
