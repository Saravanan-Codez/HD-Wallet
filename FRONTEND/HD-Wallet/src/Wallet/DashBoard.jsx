import * as React from 'react';
import { useState, useMemo } from 'react';
import MnemonicPopUp from '../Seed phrase/MnemonicPopUp';
import { generateWalletFromMnemonic } from '../BIP Functions/generateSeedPhrase';
import AccordionWallet from './Accordian';

const DashBoard = ({ seedPhrase }) => {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  
  const [mnemonicShow, setMnemonicShow] = useState(false);

  const [wallets, setWallets] = useState([]);

  const handleAddWallet = () => {
    setWallets(prev => {
      const wallet = generateWalletFromMnemonic(seedPhrase, prev.length + 1);
      return [...prev, wallet];
    });
  };

  const wallet0 = useMemo(() => {
  if (!seedPhrase) return null;
  return generateWalletFromMnemonic(seedPhrase, 0);
}, [seedPhrase]);

  return (
    <div className="h-screen overflow-hidden bg-zinc-100 flex justify-center">
      <div className="w-full max-w-xl h-full">
        <div className="p-6 h-full flex flex-col gap-6">

          {/* Mnemonic Popup */}
          {mnemonicShow && (
            <MnemonicPopUp
              onClose={() => setMnemonicShow(false)}
              seedPhrase={seedPhrase}
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
                <button className="px-3 py-1 rounded bg-red-100 text-red-600 cursor-pointer hover:bg-red-200">
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
              />
            )}

            {/* Wallet List */}
            {wallets.map((wallet) => (
              <AccordionWallet 
                wallet={wallet}
                expanded={expanded}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
