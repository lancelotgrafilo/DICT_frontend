import React, { createContext, useContext, useState } from 'react';

const PathContext = createContext();

export function usePath() {
  return useContext(PathContext);
}

export function PathProvider({ children }) {
  const [currentPath, setCurrentPath] = useState('Dashboard');
  const [subPath, setSubPath] = useState('');

  const updatePath = (newPath, newSubPath = '') => {
    setCurrentPath(newPath);
    setSubPath(newSubPath);
  };

  const value = { currentPath, subPath, updatePath };

  return (
    <PathContext.Provider value={value}>
      {children}
    </PathContext.Provider>
  );
}
