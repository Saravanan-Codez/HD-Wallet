import * as React from 'react';
import { useState, useMemo } from 'react';
import MnemonicPopUp from '../Seed phrase/MnemonicPopUp';
import { generateWalletFromMnemonic } from '../BIP Functions/generateSeedPhrase';
import AccordionWallet from './Accordian';
import PrivateKeyCard from './PrivateKeyCard';
import SendCard from './SendCard';
import AnimatedCard from '../Animations/AnimatedCard';
import AnimatedPopup from '../Animations/AnimatedPopup'
import Button from '@mui/material/Button';
import PasswordCheck from '../Password/PasswordCheck';


const DashBoard = ({ seedPhrase, password }) => {

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mnemonicShow, setMnemonicShow] = useState(false);
  const [lastDerivedIndex, setLastDerivedIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [privateKeyCard, setPrivateKeyCard] = useState(false);
  const [activeWallet, setActiveWallet] = useState(null);
  const [revealSendCard, setRevealSendCard] = useState(false);
  const [revealPrivateKey, setRevealPrivateKey] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const [authAction, setAuthAction] = useState(null);

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
    <div className="min-h-screen bg-zinc-100 flex flex-col">

      {/* ================= TOP BAR ================= */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Left side */}
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-zinc-900">
              HD Wallet
            </h1>
            <p className="text-xs text-zinc-500">
              Hierarchical deterministic wallet manager
            </p>
          </div>

          {/* Right side */}
          <div>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Active
            </span>
          </div>

        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* ========== SEED PHRASE CARD ========== */}
        <div className="bg-white rounded-xl border p-5 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-zinc-800">
              Recovery Phrase
            </p>
            <button
              className="text-sm text-emerald-600 hover:underline"
              onClick={() => {
                setAuthAction(() => () => setMnemonicShow(true));
                setShowCheckPassword(true);
              }}
            >
              View
            </button>
          </div>

          <p className="text-xs text-zinc-500">
            Used to derive all wallets. Never share this phrase.
          </p>
        </div>


        {/* ========== WALLETS SECTION ========== */}
        <div className="bg-white rounded-xl border p-5 flex flex-col">

          {/* Wallet header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-zinc-900">
              Wallets
              <span> ({wallets.length + 1})</span>
            </h2>

            <div className="flex gap-2">
              {/* <button
                className="px-2 py-2 rounded bg-zinc-100 hover:bg-zinc-200"
                onClick={handleAddWallet}
              >
                Add Wallet
              </button> */}
              <Button
                onClick={handleAddWallet}
                variant="contained"
                sx={{
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#047857',
                    boxShadow: 'none',
                  },
                }}
              >
                Add wallet
              </Button>

              <Button
                onClick={() => {
                  setWallets([]);
                  setLastDerivedIndex(0);
                }}
                disabled={wallets.length === 0}
                variant="outlined"
                sx={{
                  borderColor: '#D22B2B',
                  color: '#D22B2B',
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: 'none',

                  '&:hover': {
                    backgroundColor: '#fff1f1',   // lightest soft red
                    borderColor: '#D22B2B',
                    boxShadow: 'none',
                  },

                  '&.Mui-disabled': {
                    borderColor: '#f3bcbc',
                    color: '#f3bcbc',
                  },
                }}
              >
                Delete all
              </Button>
            </div>
          </div>

          {/* Wallet list */}
          <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-3">

            {wallet0 && (
              <AccordionWallet
                wallet={wallet0}
                expanded={expanded}
                onChange={handleChange}
                openSnackBar={openSnackBar}
                onCloseSnackBar={handleCloseSnackBar}
                handleClickSnackBar={handleClickSnackBar}
                handleDelete={handleDelete}
                privateKeyCard={() => setPrivateKeyCard(true)}
                setActiveWallet={setActiveWallet}
                setRevealSendCard={setRevealSendCard}
                revealSendCard={revealSendCard}
                setRevealPrivateKey={() => setRevealPrivateKey(!revealPrivateKey)}
                revealPrivateKey={revealPrivateKey}
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
                privateKeyCard={() => setPrivateKeyCard(true)}
                setActiveWallet={setActiveWallet}
                setRevealSendCard={setRevealSendCard}
                revealSendCard={revealSendCard}
                setRevealPrivateKey={() => setRevealPrivateKey(!revealPrivateKey)}
                revealPrivateKey={revealPrivateKey}
              />
            ))}

          </div>
        </div>
      </div>


      {/* ================= POPUPS ================= */}

      {/* Mnemonic Popup */}
      {mnemonicShow && (
        <AnimatedPopup isOpen={mnemonicShow}>
          <MnemonicPopUp
            onClose={() => setMnemonicShow(false)}
            seedPhrase={seedPhrase}
            openSnackBar={openSnackBar}
            onCloseSnackBar={handleCloseSnackBar}
            handleClickSnackBar={handleClickSnackBar}
          />
        </AnimatedPopup>
      )}

      {/* Private Key Popup */}
      {privateKeyCard && (
        <AnimatedPopup isOpen={privateKeyCard}>
          <PrivateKeyCard
            activeWallet={activeWallet}
            onClose={() => {
              setPrivateKeyCard(false);
              setRevealPrivateKey(false);
            }}
          />
        </AnimatedPopup>
      )}

      {/* Send Popup */}
      {revealSendCard && (
        <AnimatedPopup isOpen={revealSendCard}>
          <SendCard
            activeWallet={activeWallet}
            onClose={() => setRevealSendCard(false)}
          />
        </AnimatedPopup>
      )}

      { showCheckPassword && (
        <PasswordCheck 
          password={password}
          onSuccess={() => {
              authAction();
              setAuthAction(null);
              setShowCheckPassword(false);
            }
          }
          onClose={() => setShowCheckPassword(false)}
        />
      )}

    </div>

  )
}

export default DashBoard
