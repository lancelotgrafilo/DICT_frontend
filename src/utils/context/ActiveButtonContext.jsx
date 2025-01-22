import React, { createContext, useState, useEffect } from 'react';

export const ActiveButtonContext = createContext();

export const ActiveButtonProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState('dashboard');

  useEffect(() => {
    const savedActiveButton = localStorage.getItem('activeButton');
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
    }
  }, []);

  const updateActiveButton = (newActiveButton) => {
    setActiveButton(newActiveButton);
    localStorage.setItem('activeButton', newActiveButton);
  };

  return (
    <ActiveButtonContext.Provider value={{ activeButton, updateActiveButton }}>
      {children}
    </ActiveButtonContext.Provider>
  );
};
