import {useEffect} from 'react';
import {useAuth} from '../pages/context/AuthContext';
import {getFromStorage} from '../helpers/localstorage';

export default function RequireAuth({children}: {children: JSX.Element}) {
  let {logout} = useAuth();

  useEffect(() => {
    const token = getFromStorage('lightning-token');
    if (!token) {
      logout();
    }
  }, []);

  return children;
}