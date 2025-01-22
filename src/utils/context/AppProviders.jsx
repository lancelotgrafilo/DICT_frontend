// src/utils/contexts/AppProviders.jsx

import React from 'react';
import { ActiveButtonProvider } from './ActiveButtonContext';
import { PathProvider } from './PathContext';

export const AppProviders = ({ children }) => {
  return (

    <ActiveButtonProvider>
      <PathProvider>
        {children}
      </PathProvider>
    </ActiveButtonProvider>
    
  );
};
