import '../styles/globals.scss';
import '../styles/auth.scss';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from './context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider><Component {...pageProps} /></AuthContextProvider>
}

export default MyApp
