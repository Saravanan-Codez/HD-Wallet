import React from 'react'
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar'
import copyLogo from '../assets/copy.png';

const AccordionWallet = (
  { 
    wallet, 
    expanded, 
    onChange, 
    handleClickSnackBar,
    openSnackBar,
    onCloseSnackBar,
    handleDelete,
    privateKeyCard,
    setActiveWallet,
    setRevealSendCard,
    revealSendCard,
    setRevealPrivateKey,
    revealPrivateKey,
    setAuthAction,
    setShowCheckPassword,
    getSOLBalance
  }) => {

  const [SOLbalance, setSOLBalance] = useState(null);

  const handleGetSOLBalance = async () => {
    try {
      const balance = await getSOLBalance(wallet.publicKeyBase58);
      setSOLBalance(balance);

    } catch (error) {
      console.error('Error fetching SOL balance:', error);
    }
  }

  return (
    <div>
      <Accordion
        onClick={handleGetSOLBalance}
        disableGutters
        square
        elevation={0}
        sx={{
          border: '2px solid #27272a',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          backgroundColor: '#161616',
          color: '#F7F7F7',
          transition: 'all 200ms ease',
          boxShadow: '0 6px 0 0 #C4FF00',
          marginBottom: '16px',
          '&:before': { display: 'none' },

          '& .MuiAccordionSummary-root': {
            minHeight: 72,
            padding: '0 24px',
          },

          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          },

          '& .MuiAccordionDetails-root': {
            padding: '10px 24px',
          },

          '&.Mui-expanded': {
            margin: '0 0 16px 0',
            backgroundColor: '#161616',
            borderColor: '#C4FF00', /* Highlight border when expanded */
          },
        }}

        expanded={expanded === `panel${wallet.index}`}
        onChange={(event, isExpanded) => {
          onChange(`panel${wallet.index}`)(event, isExpanded);

          if (isExpanded) {
            setActiveWallet(wallet);
          }
        }}
        // onChange={(event, isExpanded) => {
        //   const panelId = `panel${wallet.index}`;
        //   const handler = onChange(panelId);

        //   handler(event, isExpanded);

        //   if (isExpanded) {
        //     setActiveWallet(wallet);
        //   }
        // }}

      >

      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#A7ADA4' }} />}
        sx={{
          transition: 'min-height 200ms ease',
          '& .MuiAccordionSummary-expandIconWrapper': {
            transition: 'transform 200ms ease',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
          },
          '&.Mui-expanded': {
            minHeight: 48,
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            transition: 'margin 200ms ease',
          },
        }}
      >

        Wallet {wallet.index}
      </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: 1,
            paddingBottom: 2,
            animation: 'fadeIn 150ms ease',
          }}
        >

          <div className="px-5 py-4 space-y-5 text-sm">

            {/* Balance row */}
            <div className="flex items-center justify-between">
              <p className="text-muted">Balance</p>
              <p className="font-semibold text-base text-bone">
                {SOLbalance !== null ? `${SOLbalance} SOL` : 'Loading...'}
              </p>
            </div>

            <div className="border-t border-muted/20" />

            {/* Derivation path */}
            <div>
              <p className="text-xs text-muted mb-1">Derivation Path</p>
              <p className="font-mono text-xs text-bone">
                {wallet.path}
              </p>
            </div>

            {/* Public key */}
            <div className="space-y-1 group">
              {/* Label + Copy */}
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted">Public Key</p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.publicKeyBase58);
                    handleClickSnackBar();
                  }}
                  className="p-1 rounded hover:bg-ink opacity-0 group-hover:opacity-100 transition-colors"
                  title="Copy public key"
                >
                  <img
                    src={copyLogo}
                    alt="Copy"
                    className="w-4 h-4 opacity-80 hover:opacity-100 invert"
                  />
                </button>
              </div>

              {/* Value */}
              <p className="font-mono text-xs break-all text-bone">
                {wallet.publicKeyBase58}
              </p>
            </div>

            {/* Private key */}
            <button 
              className="text-xs text-muted hover:text-bone hover:underline text-left hover:cursor-pointer transition-colors"
              onClick={() => {
                if (revealPrivateKey) {
                  setRevealPrivateKey(false);
                } else {
                  setAuthAction(() => () => {
                    privateKeyCard();
                    setRevealPrivateKey(true);
                    console.log('Private key revealed');
                  });
                  setShowCheckPassword(true);
                }
              }}
            >
              { revealPrivateKey ? "Hide Private Key" : "Reveal Private Key"}
            </button>

            <div className="border-t border-muted/20" />

            {/* Actions row */}
            <div className="flex items-center gap-3">

              {/* Primary actions */}
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#C4FF00',
                  color: '#C4FF00',
                  borderRadius: '9999px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '6px 20px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#D4FF55',
                    backgroundColor: 'rgba(196, 255, 0, 0.1)',
                  },
                }}
                // onClick={() => setRevealSendCard(!revealSendCard)}
                onClick={() => {
                  setAuthAction(() => () => {
                    setRevealSendCard(prev => !prev);
                  });
                  setShowCheckPassword(true);
                }}
              >
                { revealSendCard ? "Cancel" : "Send"}
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#C4FF00',
                  color: '#161616',
                  borderRadius: '9999px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '6px 20px',
                  boxShadow: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#D4FF55',
                    boxShadow: '0 0 10px rgba(196, 255, 0, 0.3)',
                  },
                }}
              >
                Swap
              </Button>

              {/* Danger action */}
              {wallet.index !== 0 && (
                <button
                  onClick={() => handleDelete(wallet.index)}
                  className="ml-auto p-2 rounded hover:bg-danger/20 text-danger transition-colors"
                  title="Delete wallet"
                >
                  <DeleteIcon fontSize="small" />
                </button>
              )}
            </div>
          </div>

        </AccordionDetails>
      </Accordion>
      {
        openSnackBar && (
          <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={onCloseSnackBar}
            // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            ContentProps={{
              sx: {
                backgroundColor: "#101512", // ink
                color: "#F3F1EA",           // bone
                border: '1px solid rgba(167, 173, 164, 0.3)',
                borderRadius: "12px",
                fontSize: "0.875rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                paddingX: 2.5,
                paddingY: 1.25,
              },
            }}
            message="Seed phrase copied to clipboard"
          />
        )
      }
    </div>
  );
}

export default AccordionWallet
