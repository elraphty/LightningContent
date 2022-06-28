import React, {useState, useContext, useCallback, useEffect} from 'react';
import {lnurlLogin, loginUser} from '../../api/auth';
import {AuthFormValues} from '../../interfaces';
import {useRouter} from 'next/router';
import {io} from 'socket.io-client';
import {v4} from 'uuid';
import {setToStorage, removeFromStorage} from '../../helpers/localstorage';

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: {
    'client-id': v4().substring(0, 10),
  },
});

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
  token: string;
  logout: () => void;
  login: (data: AuthFormValues) => void;
}

const defaultState = {
  isLoggedIn: false,
  isLoading: false,
  lnData: {encoded: '', secret: '', url: ''},
  displayLnurl: false,
  setDisplayLnUrl: () => {},
  token: '',
  logout: () => {},
  login: (data: AuthFormValues) => {}
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({children}: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [lnAuth, setLnAuth] = useState({});
  const [lnData, setLnData] = useState(defaultState.lnData);
  const [token, setToken] = useState('');
  const [lnUrl, setLnurl] = useState<boolean>(false);

  const router = useRouter();

  const setDisplayLnUrl = useCallback(async () => {
    if (!lnUrl) {
      const lnurlData = await lnurlLogin();
      setLnData(lnurlData.data);
    }

    setLnurl(prevState => !prevState);
  }, []);

  const logout = () => {
    setToken('');
    removeFromStorage('lightning-token');
    window.location.href = '/login';
  }

  const login = async (data: AuthFormValues) => {
    const res = await loginUser(data);
    if (res.status === 200) {
      const token = res.data.data.token
      setToken(token);
      setToStorage('lightning-token', token);

      router.push('/');
    }
  }

  const getEventsSocket = useCallback(() => {
    socket.on('auth', (arg: any) => {
      if (arg.token) {
        setToStorage('lightning-token', arg.token);

        setIsLoading(false);
        setIsLoggedIn(true);
        router.push('/');
      }
    });
  }, [router]);

  useEffect(() => {
    getEventsSocket();
  }, [getEventsSocket]);

  const contextValue = {
    isLoggedIn,
    isLoading,
    lnData,
    displayLnurl: lnUrl,
    setDisplayLnUrl,
    token,
    logout,
    login
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
};

export function useAuth() {
  return useContext(AuthContext);
}