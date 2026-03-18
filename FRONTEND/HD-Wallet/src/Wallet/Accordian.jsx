import React from 'react'
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
    setShowCheckPassword
  }) => {

  return (
    <div>
      <Accordion
        disableGutters
        square
        elevation={0}
        sx={{
          border: '1px solid rgba(167, 173, 164, 0.2)',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          color: '#F3F1EA',
          transition: 'border-color 200ms ease, background-color 200ms ease',
          '&:before': { display: 'none' },

          '& .MuiAccordionSummary-root': {
            minHeight: 72,
            padding: '0 16px',
          },

          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          },

          '& .MuiAccordionDetails-root': {
            padding: '5px 10px',
          },

          '&.Mui-expanded': {
            margin: 0,
            backgroundColor: '#1A221D',
            borderColor: 'rgba(167, 173, 164, 0.5)',
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
                0.00 SOL
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
                  borderColor: '#8FAF8B',
                  color: '#8FAF8B',
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#C8D8C1',
                    backgroundColor: 'rgba(143, 175, 139, 0.1)',
                  },
                }}
                onClick={() => setRevealSendCard(!revealSendCard)}
              >
                { revealSendCard ? "Cancel" : "Send"}
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#8FAF8B',
                  color: '#101512',
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#C8D8C1',
                    boxShadow: 'none',
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
