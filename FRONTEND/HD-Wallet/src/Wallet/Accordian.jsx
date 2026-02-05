import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const AccordionWallet = ({ wallet, expanded, onChange }) => {
  
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
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        }}
        expanded={expanded === `panel${wallet.index}`}
        onChange={onChange(`panel${wallet.index}`)}
      >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        Wallet {wallet.index}
      </AccordionSummary>
        <AccordionDetails>
          <div className="p-4 space-y-4 text-sm">

            {/* Balance */}
            <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-3">
              <p className="text-zinc-500">Balance</p>
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
                  onClick={() => navigator.clipboard.writeText(wallet.publicKeyBase58)}
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
              <div className="flex justify-end">
                <button className="ml-auto px-3 py-2 rounded text-xs bg-red-50 text-red-600 hover:bg-red-100">
                    <DeleteIcon />
                </button>
              </div>
              
            </div>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordionWallet
