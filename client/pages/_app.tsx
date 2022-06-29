import '../styles/index.scss';
import type {AppProps} from 'next/app';
import {AuthContextProvider} from './context/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthContextProvider>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp
