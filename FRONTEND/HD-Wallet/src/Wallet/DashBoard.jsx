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
    <div 
      className="h-screen overflow-hidden no-scrollbar flex justify-center"
    >
      <div className="w-full max-w-xl h-full">
        <div className="p-6 h-full flex flex-col gap-6">

          {/* Mnemonic Popup */}
          {mnemonicShow && (
            <MnemonicPopUp
              onClose={() => setMnemonicShow(false)}
              seedPhrase={seedPhrase}
              openSnackBar={openSnackBar}
              onCloseSnackBar={handleCloseSnackBar}
              handleClickSnackBar={handleClickSnackBar}
            />
          )}

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">HD Wallet</h1>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              Active
            </span>
          </div>

          {/* Seed Section */}
          <div className="bg-zinc-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Seed Phrase</p>
              <p className="text-xs text-zinc-500">Hidden for security</p>
            </div>
            <button
              className="text-sm text-emerald-600 cursor-pointer hover:underline"
              onClick={() => setMnemonicShow(true)}
            >
              View
            </button>
          </div>

          {/* Wallets */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">

            {/* Wallets Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-700">Wallets</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2 rounded bg-zinc-100 cursor-pointer hover:bg-zinc-200"
                  onClick={handleAddWallet}
                >
                  Add Wallet
                </button>
                <button 
                  className="px-3 py-1 rounded bg-red-100 text-red-600 cursor-pointer hover:bg-red-200"
                  onClick={() => {
                    setWallets([])
                    setLastDerivedIndex(0)
                  }}  
                >
                  Delete all
                </button>
              </div>
            </div>

            {/* First Wallet */}
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

            {/* Wallet List */}
            {wallets.map((wallet) => (
              <AccordionWallet 
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
  )
}

export default DashBoard
