import './App.css';
import { useState } from 'react';

const DEFAULT_STATUS = 'MetaMask is locked - please login';

const App = () => {
  const [showStatus, setShowStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('');

  const connect = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        if (accounts.length === 0) {
          console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== status) {
          setStatus(accounts[0]);
        }
      })
      .catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  const getPublicKey = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          setIsConnected(accounts.length > 0);
          if (!isConnected) {
            connect();
          }
        })
       setShowStatus(true);
    } else {
      console.log('Install MetaMask');
    }
  }

  return (
    <div className='App'>
      <div>
        <button type="button" className="btn btn-primary" onClick={getPublicKey}>Get public key</button>
        {showStatus && <div>{isConnected ? status : DEFAULT_STATUS}</div>}
      </div>
    </div>
  );
}

export default App;
