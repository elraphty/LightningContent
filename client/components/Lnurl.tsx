import {QRCodeSVG} from 'qrcode.react';
import {useEffect} from 'react';
import {useAuth} from '../pages/context/AuthContext';

const QR = () => {
  const {displayLnurl, setDisplayLnUrl, lnData} = useAuth();

  const closeAuth = () => {
    setDisplayLnUrl();
  }

  return (
    <div className='lnurl_wrap' style={{display: displayLnurl ? 'flex' : 'none'}}>
      <QRCodeSVG
        value={lnData.encoded.toLocaleUpperCase()}
        size={250}
        bgColor={'transparent'}
      />
      <p>
        Scan the code above with an LNURL-enabled wallet
      </p>
      <button onClick={closeAuth}>Close</button>
    </div>
  );
};

export default QR;