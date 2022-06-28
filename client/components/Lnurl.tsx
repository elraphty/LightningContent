import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';
import { AuthContext } from '../pages/context/AuthContext';

const QR = () => {
  const { displayLnurl, setDisplayLnUrl } = useContext(AuthContext);
  
  const closeAuth = () => {
    setDisplayLnUrl();
  }
  
  return (
    <div className='lnurl_wrap' style={{ display: displayLnurl ? 'flex': 'none' }}>
      <QRCodeSVG
        value={''}
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