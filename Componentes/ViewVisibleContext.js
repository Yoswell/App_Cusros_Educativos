import React, { createContext, useState } from 'react';

const ViewVisibleContext = createContext();

const ViewVisibleProvider = ({ children }) => {
  const [mostrarWelcome, setMostrarWelcome] = useState(true);

  return (
    <ViewVisibleContext.Provider value={{ mostrarWelcome, setMostrarWelcome }}>
      {children}
    </ViewVisibleContext.Provider>
  );
};

export { ViewVisibleContext, ViewVisibleProvider };