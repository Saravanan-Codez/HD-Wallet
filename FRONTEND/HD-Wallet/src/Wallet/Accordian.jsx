import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar'
import { Alert } from "@mui/material";


const AccordionWallet = (
  { 
    wallet, 
    expanded, 
    onChange, 
    handleClickSnackBar,
    openSnackBar,
    onCloseSnackBar,
    handleDelete,
  }) => {

   

  
  return (
    <div>
      <Accordion
        disableGutters
        square
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          transition: 'border-color 200ms ease, background-color 200ms ease',
          '&:before': { display: 'none' },
          '&.Mui-expanded': {
            margin: 0,
            backgroundColor: '#fafafa', // zinc-50 (very subtle)
            borderColor: '#d4d4d8',     // zinc-300
          },
        }}
        expanded={expanded === `panel${wallet.index}`}
        onChange={onChange(`panel${wallet.index}`)}
      >

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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

          <div className="p-4 space-y-4 text-sm">

            {/* Balance */}
            <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-3">
              <p className="text-zinc-700">Balance</p>
              <p className="font-semibold text-base">0.00 SOL</p>
            </div>

            {/* Derivation Path */}
            <div>
              <p className="text-zinc-500">Derivation Path</p>
              <p className="font-mono text-xs">{wallet.path}</p>
            </div>

            {/* Public Key */}
            <div className="space-y-1">
              <p className="text-zinc-500">Public Key</p>
              <div className="flex items-start gap-2">
                <p className="font-mono break-all text-xs flex-1">
                  {wallet.publicKeyBase58}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.publicKeyBase58)
                    handleClickSnackBar()
                  }}
                  className="px-2 py-1 text-xs rounded bg-zinc-100 hover:bg-zinc-200"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Private Key */}
            <button className="text-zinc-500 hover:underline text-left text-xs">
              Reveal Private Key
            </button>

            {/* Primary Actions */}
            <div className="flex gap-3">
              
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#16a34a',   // green-600
                  color: '#16a34a',
                  '&:hover': {
                    borderColor: '#15803d',
                    backgroundColor: 'rgba(22,163,74,0.06)',
                  },
                }}
              >
                Send
              </Button>


              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#059669', // emerald-600
                  color: '#ffffff',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#047857',
                    boxShadow: 'none',
                  },
                }}
              >
                Swap
              </Button>


              {/* Secondary Actions */}

              {
                wallet.index !== 0 &&
                  <div className="flex justify-end">
                    <button 
                      className="ml-auto px-3 py-2 rounded text-xs bg-red-50 text-red-600 hover:bg-red-100"
                      onClick={() => handleDelete(wallet.index)}
                    >
                        <DeleteIcon />
                    </button>
                  </div>
              }
              
              
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
                backgroundColor: "#fffbfo", // zinc-900
                color: "#fffbfo",           // zinc-50
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
