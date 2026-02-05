import * as React from 'react';
import { useState, useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MnemonicPopUp from '../Seed phrase/MnemonicPopUp';
import { generateWalletFromMnemonic } from '../BIP Functions/generateSeedPhrase';

const DashBoard = ({ seedPhrase }) => {

  const [expanded, setExpanded] = useState(false);
  const [mnemonicShow, setMnemonicShow] = useState(false);

  const [wallets, setWallets] = useState([]);

  const handleAddWallet = () => {
    setWallets(prev => {
      const wallet = generateWalletFromMnemonic(seedPhrase, prev.length);
      return [...prev, wallet];
    });
  };

  const wallet0 = useMemo(() => {
  if (!seedPhrase) return null;
  return generateWalletFromMnemonic(seedPhrase, 0);
}, [seedPhrase]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div className="p-6 space-y-6">
      { mnemonicShow && 
        <MnemonicPopUp 
          onClose={() => setMnemonicShow(false)}
          seedPhrase={seedPhrase}
        /> 
      }

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
      <div className="space-y-3">
        
        <div className="flex items-center justify-between">
          {/* Left */}
          <p className="text-sm font-medium text-zinc-700">
            Wallets
          </p>

          {/* Right */}
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

        {
          wallet0 && 
            <Accordion key={wallet0.index} expanded={expanded === `panel${wallet0.index}`} onChange={handleChange(`panel${wallet0.index}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
              <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                Wallet - {wallet0.index}
              </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="p-4 space-y-3 text-sm">

                  {/* Balance */}
                  <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-3">
                    <p className="text-zinc-500">Balance</p>

                    <p className="font-semibold text-base">
                      0.00 SOL
                    </p>
                  </div>

                  {/* Derivation Path */}
                  <div>
                    <p className="text-zinc-500">Derivation Path</p>
                    <p className="font-mono">{wallet0.path}</p>
                  </div>

                  {/* Public Key */}
                  <div>
                    <p className="text-zinc-500">Public Key</p>
                    <p className="font-mono break-all">
                      {wallet0.publicKeyBase58}
                    </p>
                  </div>

                  {/* Private Key */}
                  <button
                    className="text-zinc-500 hover:underline cursor-pointer text-left"
                  >
                    Private Key
                  </button>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <button className="px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>

            </AccordionDetails>
            </Accordion>
        }

        {/* Wallet Item */}
        {
          wallets.map((wallet) => (
            <Accordion key={wallet.index} expanded={expanded === `panel${wallet.index}`} onChange={handleChange(`panel${wallet.index}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
              <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                Wallet - {wallet.index}
              </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="p-4 space-y-3 text-sm">

                  {/* Balance */}
                  <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-3">
                    <p className="text-zinc-500">Balance</p>

                    <p className="font-semibold text-base">
                      0.00 SOL
                    </p>
                  </div>

                  {/* Derivation Path */}
                  <div>
                    <p className="text-zinc-500">Derivation Path</p>
                    <p className="font-mono">{wallet.path}</p>
                  </div>

                  {/* Public Key */}
                  <div>
                    <p className="text-zinc-500">Public Key</p>
                    <p className="font-mono break-all">
                      {wallet.publicKeyBase58}
                    </p>
                  </div>

                  {/* Private Key */}
                  <button
                    className="text-zinc-500 hover:underline cursor-pointer text-left"
                  >
                    Private Key
                  </button>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <button className="px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>

            </AccordionDetails>
            </Accordion>
          ))
        }
        
      </div>

    </div>
  )
}

export default DashBoard
