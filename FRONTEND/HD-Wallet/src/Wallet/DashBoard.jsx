import * as React from 'react';
import { useState, useMemo } from 'react';
import MnemonicPopUp from '../Seed phrase/MnemonicPopUp';
import { generateWalletFromMnemonic } from '../BIP Functions/generateSeedPhrase';
import AccordionWallet from './Accordian';


const DashBoard = ({ seedPhrase }) => {

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mnemonicShow, setMnemonicShow] = useState(false);
  const [lastDerivedIndex, setLastDerivedIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleAddWallet = () => {
    const nextIndex = lastDerivedIndex + 1;

    setLastDerivedIndex(nextIndex);

    setWallets(prev => [
      ...prev,
      generateWalletFromMnemonic(seedPhrase, nextIndex),
    ]);
  };

  const wallet0 = useMemo(() => {
    if (!seedPhrase) return null;
    return generateWalletFromMnemonic(seedPhrase, 0);
  }, [seedPhrase]);

  const handleDelete = (index) => {
    const newWallets = wallets.filter((wallet) => wallet.index !== index);
    setWallets(newWallets);
  }
 
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Top bar */}
      <div className="border-b bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">
              HD Wallet
            </h1>
            <p className="text-xs text-zinc-500">
              Hierarchical deterministic wallet manager
            </p>
          </div>

          <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border p-5 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-zinc-800">
                  Recovery Phrase
                </p>
                <button
                  className="text-sm text-emerald-600 hover:underline"
                  onClick={() => setMnemonicShow(true)}
                >
                  View
                </button>
              </div>

              <p className="text-xs text-zinc-500">
                Used to derive all wallets. Never share this phrase.
              </p>
            </div>
            
            {/* Private Key Card */}
            <div className="bg-white rounded-xl border p-5 space-y-4">

              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">
                  Private Key
                </p>
                <span className="text-xs text-zinc-400">
                  Sensitive
                </span>
              </div>  

              {/* Wallet selected but hidden */}
                <button
                  className="text-xs text-red-600 hover:underline text-left"
                >
                  Reveal private key
                </button>

              {/* Revealed */}
                <div className="space-y-3">

                  <div className="bg-zinc-50 border rounded-lg p-3">
                    <p className="font-mono text-xs break-all text-zinc-800">
                      kakvkjnqvub4tkjaskjvnnKLBEVRkvlvaekrntblnk
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      
                      className="text-xs px-2 py-1 rounded bg-zinc-100 hover:bg-zinc-200"
                    >
                      Copy
                    </button>

                    <button
                      className="text-xs text-zinc-500 hover:underline"
                    >
                      Hide
                    </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Right panel (wallets) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border p-5 flex flex-col h-[calc(100vh-160px)]">

              {/* Wallet header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-zinc-900">
                  Wallets
                </h2>

                <div className="flex gap-2">
                  <button
                    className="px-3 py-2 rounded bg-zinc-100 hover:bg-zinc-200"
                    onClick={handleAddWallet}
                  >
                    Add Wallet
                  </button>

                  <button
                    className="px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => {
                      setWallets([]);
                      setLastDerivedIndex(0);
                    }}
                  >
                    Delete all
                  </button>
                </div>
              </div>

              {/* Wallet list */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">

                {wallet0 && (
                  <AccordionWallet
                    wallet={wallet0}
                    expanded={expanded}
                    onChange={handleChange}
                    openSnackBar={openSnackBar}
                    onCloseSnackBar={handleCloseSnackBar}
                    handleClickSnackBar={handleClickSnackBar}
                    handleDelete={handleDelete}
                  />
                )}

                {wallets.map(wallet => (
                  <AccordionWallet
                    key={wallet.index}
                    wallet={wallet}
                    expanded={expanded}
                    onChange={handleChange}
                    openSnackBar={openSnackBar}
                    onCloseSnackBar={handleCloseSnackBar}
                    handleClickSnackBar={handleClickSnackBar}
                    handleDelete={handleDelete}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mnemonic popup */}
      {mnemonicShow && (
        <MnemonicPopUp
          onClose={() => setMnemonicShow(false)}
          seedPhrase={seedPhrase}
          openSnackBar={openSnackBar}
          onCloseSnackBar={handleCloseSnackBar}
          handleClickSnackBar={handleClickSnackBar}
        />
      )}
    </div>

  )
}

export default DashBoard
