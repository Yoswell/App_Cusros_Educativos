import React, { createContext, useState } from 'react';

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [ crearCuentaButton, setCrearCuentaButton ] = useState(false);
  const [ iniciarSesionButton, setIniciarSesionButton ] = useState(false);
  const [ registrosUsuarioButton, setRegistrosUsuarioButton] = useState(false);
  // Agrega más estados para cada botónes adicionales que necesites

  return (
    <ButtonContext.Provider
      value={{
        crearCuentaButton, setCrearCuentaButton,
        iniciarSesionButton, setIniciarSesionButton,
        registrosUsuarioButton, setRegistrosUsuarioButton
      }}>
      {children}
    </ButtonContext.Provider>
  );
};

export { ButtonContext, ButtonProvider };