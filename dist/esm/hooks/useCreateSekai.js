'use client';
import { useContext } from 'react';
import { YourSekaiContext } from '../components/provider/YourSekaiProvider.js';

var useCreateSekai = function useCreateSekai() {
  var context = useContext(YourSekaiContext);
  if (!context) {
    throw new Error('useCreateSekai must be used within a YourSekaiProvider');
  }
  return context;
};

export { useCreateSekai };
