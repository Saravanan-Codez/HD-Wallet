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
  const [walletBalances, setWalletBalances] = useState({});
  const [loadingBalance, setLoadingBalance] = useState(true);
  
  const [showSend, setShowSend] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  
  const [authAction, setAuthAction] = useState(null);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const [wallets, setWallets] = useState([]);

  const [copy, setCopy] = useState(false);

  const wallet0 = useMemo(() => {
    if (!seedPhrase) return null;
    
    const newWallet = generateWalletFromMnemonic(seedPhrase, 0);
    setWallets([newWallet]); // Initialize with the first wallet 
    
    return newWallet;
  }, [seedPhrase]);

  useEffect(() => {
    if (!wallet0) return;

    let isMounted = true; // prevents state updates after unmount

    const fetchBalance = async () => {
      try {
        setLoadingBalance(true);

        const bal = (await getSOLBalance(wallet0.publicKeyBase58)).toFixed(2);

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

  useEffect(() => {
    if (!wallets?.length) return;

    const fetchAllBalances = async () => {
      for (const wallet of wallets) {
        try {
          const bal = (await getSOLBalance(wallet.publicKeyBase58)).toFixed(2);

          setWalletBalances(
            prev => ({
              ...prev, [wallet.publicKeyBase58]: bal
            })
          )
        } catch {
          setWalletBalances(
            prev => ({
              ...prev, [wallet.publicKeyBase58]: 'Unavailable'
            })
          )
        }
      }
    };

    fetchAllBalances();
  }, [wallets]);

  const requireAuth = (action) => {
    setAuthAction(() => action);
    setShowCheckPassword(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Ideally use a lightweight toast here.

    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2 * 1000);

  };

  if (!wallet0) return null; // Logic guard


  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-950 text-white font-sans selection:bg-neutral-800">
      
      {/* --- Header / Navigation --- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">

        <div className="flex items-center justify-between h-16 px-6
          rounded-4xl

          bg-neutral-900/60 backdrop-blur-xl
          border border-white/8

          shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">

          {/* Left */}
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-medium tracking-tight text-white uppercase">
              HD-Wallet
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Network */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-neutral-800/50 border border-neutral-700/50">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium text-neutral-300">DEVNET</span>
            </div>

            {/* Logout */}
            <button 
              onClick={onLogout}
              className="px-4 py-1.5 rounded-full text-xs font-medium
              text-neutral-400 border border-neutral-700/60
              hover:bg-neutral-800 hover:text-white
              transition-all duration-200"
            >
              Sign out
            </button>

          </div>

        </div>

      </header>

      {/* --- Main Dashboard Grid --- */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 
pt-28 pb-8 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (Primary Content) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Balance Hero Card */}
            <div className="group bg-neutral-900/20 border border-neutral-800 rounded-[2.5rem]
            w-full max-w-110 mx-auto
            px-6 md:px-8 py-10
            relative overflow-hidden flex flex-col justify-between
            transition-all duration-300 hover:border-neutral-600
            hover:shadow-[0_10px_50px_rgba(255,255,255,0.06)] hover:-translate-y-0.5">

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02),transparent_65%)]" />
            </div>

            {/* Balance Section (Hero) */}
            <div className="relative z-10 flex flex-col items-center text-center mb-12">
              
              <p className="text-sm font-medium text-neutral-400 mb-3 tracking-wide">
                Total Balance
              </p>

              <div className="text-6xl md:text-7xl font-light tracking-tight text-white flex items-end gap-2">
                {loadingBalance ? (
                  <span className="w-44 h-16 bg-neutral-800/80 rounded-2xl animate-pulse inline-block"></span>
                ) : (
                  <>
                    {balance}
                    <span className="text-2xl md:text-3xl text-neutral-500 font-normal mb-1">SOL</span>
                  </>
                )}
              </div>

            </div>

            {/* Actions (Horizontal but controlled) */}
            <div className="relative z-10 flex gap-3">

              <button
                onClick={() => requireAuth(() => setShowSend(true))}
                className="flex-1 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm
                hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,255,255,0.12)]
                transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Send
              </button>

              <button
                onClick={() => alert("Receive view not implemented")}
                className="flex-1 py-3.5 rounded-2xl border border-neutral-700 bg-neutral-900/80 text-white font-medium text-sm
                hover:bg-neutral-800 transition-all duration-200 active:scale-95 flex justify-center items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Receive
              </button>

            </div>

          </div>

            {/* Assets List Placeholder */}
            <div className="bg-neutral-900/20 border border-neutral-800/80 rounded-4xl p-8 md:p-10 mb-8 transition-all duration-300 hover:border-neutral-600
  hover:shadow-[0_10px_50px_rgba(255,255,255,0.06)] hover:-translate-y-0.5">
              <h3 className="text-2xl font-light text-white mb-6">Your Assets</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-800 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-lg text-white">
                      <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="SOL" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">Solana</p>
                      <p className="text-sm text-neutral-400">SOL</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white text-lg">{balance || '0'}</p>
                  </div>
                </div>
                {/* Empty State */}
                <div className="flex justify-center items-center py-10 border border-dashed border-neutral-800 rounded-2xl">
                  <p className="text-sm font-medium text-neutral-500">No other assets found</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Secondary Info) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Wallet Details panel */}
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-4xl p-8 transition-all duration-300 hover:border-neutral-600
  hover:shadow-[0_10px_50px_rgba(255,255,255,0.06)] hover:-translate-y-0.5">
               <h3 className="text-xl font-light text-white mb-6">Active Wallet details</h3>
               
               <div className="mb-8">
                 <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider font-semibold">Address</p>
                 <div className="flex items-center justify-between bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-3">
                   <span className="text-sm font-mono text-neutral-300 truncate mr-3">
                     {wallet0.publicKeyBase58}
                   </span>
                   <button 
                     onClick={() => handleCopy(wallet0.publicKeyBase58)}
                     className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors shrink-0"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={copy ? "M5 13l4 4L19 7" : "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"} />
                     </svg>
                   </button>
                 </div>
               </div>

               <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => requireAuth(() => setShowPrivateKey(true))}
                    className="w-full py-4 rounded-xl bg-neutral-800/50 text-white font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Export Private Key
                  </button>
                  <button 
                    onClick={() => requireAuth(() => setShowMnemonic(true))}
                    className="w-full py-4 rounded-xl border border-neutral-800 text-neutral-400 font-medium hover:text-white hover:bg-neutral-900 transition-colors"
                  >
                    Reveal Recovery Phrase
                  </button>
               </div>
            </div>

            {/* Placeholder for "Derived Wallets" previously in Accordions, scaling it down for this generic UI */}
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-4xl p-8 transition-all duration-300 hover:border-neutral-600
  hover:shadow-[0_10px_50px_rgba(255,255,255,0.06)] hover:-translate-y-0.5">
  
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white">Derived Wallets</h3>
                
                <button 
                  className="text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-full transition-all active:scale-95"
                >
                  + Add
                </button>
              </div>

              {/* Wallet List */}

              {
                wallets.length === 0 ? (
                  <div className="flex justify-center items-center py-10 border border-dashed border-neutral-800 rounded-2xl">
                    <p className="text-sm font-medium text-neutral-500">No derived wallets yet</p>
                  </div>
                ) : (
                  wallets.map((wallet, index) => (

                    
                    <div key = {wallet.publicKeyBase58} className="flex flex-col gap-3">
                    

                      {/* Wallet Item */}
                      <div className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-800 cursor-pointer transition-all">
                        
                        {/* Left */}
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-sm font-semibold text-white">
                            1
                          </div>

                          <div>
                            <p className="text-white text-sm font-medium">Account {index + 1}</p>
                          <p className="text-xs text-neutral-400">{`${wallet.publicKeyBase58.substring(0, 17)}...`}</p>
                          </div>
                        </div>

                        {/* Right */}
                        <p className="text-sm text-white font-medium">
                          {walletBalances[wallet.publicKeyBase58] ?? '...'} 
                          <span className='text-white/55'> SOL</span></p>
                      </div>

                      {/* Empty / Future State */}
                      <div className="flex justify-center items-center py-6 border border-dashed border-neutral-800 rounded-2xl">
                        <p className="text-xs text-neutral-500">
                          More accounts will appear here
                        </p>
                      </div>

                    </div>
                  ))
                )
              }

              
            </div>

          </div>

        </div>
      </main>

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
