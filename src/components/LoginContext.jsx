import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [authorizedPopup,setAuthorizedPopup]=useState(false)
  return (
    <LoginContext.Provider value={{ isPopupOpen, setIsPopupOpen, logedIn, setLogedIn,authorizedPopup,setAuthorizedPopup }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;