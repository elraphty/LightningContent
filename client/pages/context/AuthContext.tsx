import React, { useState, useEffect, useContext, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
}

interface LNData {
  encoded: string;
  secret: string;
  url: string;
}

interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  lnData: LNData;
  displayLnurl: boolean;
  setDisplayLnUrl: () => void;
}

const defaultState = {
  isLoggedIn: false,
  isLoading: false,
  lnData: { encoded: '', secret: '', url: '' },
  displayLnurl: false,
  setDisplayLnUrl: () => {},
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [lnAuth, setLnAuth] = useState({});
  const [lnData, setLnData] = useState(defaultState.lnData);
  const [token, setToken] = useState('');
  const [lnUrl, setLnurl] = useState<boolean>(false);
  
  const setDisplayLnUrl = useCallback(() => {
    setLnurl(prevState => !prevState);
  }, []);
  
  const contextValue = {
    isLoggedIn,
    isLoading,
    lnData,
    displayLnurl: lnUrl,
    setDisplayLnUrl,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
};