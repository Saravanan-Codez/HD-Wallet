import React, { useState, useEffect, useMemo } from 'react';
import { generateWalletFromMnemonic } from '../BIP Functions/Credentials/generateSeedPhrase';
import { getSOLBalance } from '../BIP Functions/Operations/Balance_fetch';
import SendCard from './SendCard';
import PrivateKeyCard from './PrivateKeyCard';
import MnemonicPopUp from '../Seed phrase/MnemonicPopUp';
import PasswordCheck from '../Password/PasswordCheck';
import AnimatedPopup from '../Animations/AnimatedPopup';

const DashBoard = ({ seedPhrase, password, onLogout }) => {
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  
  const [showSend, setShowSend] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  
  const [authAction, setAuthAction] = useState(null);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const wallet0 = useMemo(() => {
    if (!seedPhrase) return null;
    return generateWalletFromMnemonic(seedPhrase, 0);
  }, [seedPhrase]);

  useEffect(() => {
    if (!wallet0) return;

    let isMounted = true; // prevents state updates after unmount

    const fetchBalance = async () => {
      try {
        setLoadingBalance(true);

        const bal = await getSOLBalance(wallet0.publicKeyBase58);

        if (isMounted) {
          setBalance(bal);
        }
      } catch (err) {
        console.error("Failed to fetch balance", err);

        if (isMounted) {
          setBalance('Unavailable');
        }
      } finally {
        if (isMounted) {
          setLoadingBalance(false);
        }
      }
    };

    fetchBalance();

    return () => {
      isMounted = false;
    };
  }, [wallet0]);

  const requireAuth = (action) => {
    setAuthAction(() => action);
    setShowCheckPassword(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Ideally use a lightweight toast here.
  };

  if (!wallet0) return null; // Logic guard

  return (
    <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl rounded-4xl border border-neutral-800 p-8 shadow-2xl transition-all relative overflow-hidden">
      
      {/* Header Row */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-neutral-800 to-neutral-700 p-0.5 shadow-inner">
            <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </div>
          </div>
          <div>
            <h2 className="text-white font-medium">Main Wallet</h2>
            <p className="text-xs text-neutral-400">DEVNET Active</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="p-2 rounded-full text-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors"
          title="Logout"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Balance Section */}
      <div className="mb-10 text-center">
        <p className="text-sm font-medium text-neutral-400 mb-2">Total Balance</p>
        <div className="text-5xl font-light tracking-tight text-white mb-2">
          {loadingBalance ? (
            <span className="w-32 h-12 bg-neutral-800 rounded-lg animate-pulse inline-block"></span>
          ) : (
             <>{balance} <span className="text-3xl text-neutral-500">SOL</span></>
          )}
        </div>
        
        {/* Address Pill */}
        <button 
          onClick={() => handleCopy(wallet0.publicKeyBase58)}
          className="mx-auto mt-4 px-4 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700 text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          {wallet0.publicKeyBase58.slice(0, 4)}...{wallet0.publicKeyBase58.slice(-4)}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Primary Actions */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => requireAuth(() => setShowSend(true))}
          className="flex-1 py-4 rounded-full bg-white text-black font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Send
        </button>
        <button
          onClick={() => alert("Receive view not implemented in basic snippet")}
          className="flex-1 py-4 rounded-full bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Receive
        </button>
      </div>

      {/* Secondary Actions Row */}
      <div className="flex justify-between items-center border-t border-neutral-800 pt-6 px-2">
        <button 
          onClick={() => requireAuth(() => setShowMnemonic(true))}
          className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          View Seed Phrase
        </button>
        <button 
          onClick={() => requireAuth(() => setShowPrivateKey(true))}
          className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Export Private Key
        </button>
      </div>

      {/* --- Modals --- */}
      {showCheckPassword && (
        <PasswordCheck 
          password={password}
          onSuccess={() => {
            if (authAction) authAction();
            setAuthAction(null);
            setShowCheckPassword(false);
          }}
          onClose={() => setShowCheckPassword(false)}
        />
      )}

      {showSend && (
        <AnimatedPopup isOpen={showSend}>
          <SendCard activeWallet={wallet0} onClose={() => setShowSend(false)} />
        </AnimatedPopup>
      )}

      {showPrivateKey && (
        <AnimatedPopup isOpen={showPrivateKey}>
          <PrivateKeyCard activeWallet={wallet0} onClose={() => setShowPrivateKey(false)} />
        </AnimatedPopup>
      )}

      {showMnemonic && (
        <AnimatedPopup isOpen={showMnemonic}>
          <MnemonicPopUp seedPhrase={seedPhrase} onClose={() => setShowMnemonic(false)} />
        </AnimatedPopup>
      )}
    </div>
  );
};

export default DashBoard;
