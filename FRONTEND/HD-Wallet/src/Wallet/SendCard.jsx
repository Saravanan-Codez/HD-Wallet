import React from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SendCard = ({ onClose, activeWallet }) => {
  const [currency, setCurrency] = React.useState('USD');

  return (
    <div className="bg-white rounded-xl border p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-900">
          Send SOL
        </p>
        <span className="text-xs text-zinc-400">
          Transaction
        </span>
      </div>

      {/* From */}
      <div className="bg-zinc-100 border border-zinc-200 rounded-lg p-2 text-xs font-mono text-zinc-700 break-all select-text cursor-default">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wide text-zinc-600">
            Sender address
          </span>
          {/* <span className="text-zinc-400">🔒</span> */}
        </div>

        <p>
          {activeWallet.publicKeyBase58}
        </p>
      </div>


      {/* To */}
      <div>
        <p className="text-xs text-zinc-500 mb-1">To</p>
        <input
          type="text"
          placeholder="Recipient address"
          className="w-full text-xs bg-zinc-50 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Amount row */}
      <div className="flex items-end gap-3">

        {/* SOL amount (primary) */}
        <div className="w-32">
          <p className="text-xs text-zinc-500 mb-1">Amount (SOL)</p>
          <input
            type="number"
            placeholder="0.00"
            className="w-full text-xs bg-zinc-50 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="w-32">
          <p className="text-xs text-zinc-500 mb-1">Amount (SOL)</p>
          <input
            type="number"
            placeholder="0.00"
            className="w-full text-xs bg-zinc-50 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Currency helper (compact, secondary) */}
        <div className="w-24">
          <p className="text-xs text-zinc-500 mb-1">Currency</p>
          <FormControl fullWidth size="small">
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                fontSize: '0.75rem',
                backgroundColor: '#fafafa',
                borderRadius: '0.5rem',
                '& .MuiSelect-select': {
                  padding: '6px 8px',
                },
              }}
            >
              <MenuItem
                value="USD"
                sx={{
                  fontSize: '0.75rem',
                  padding: '6px 10px',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  },
                }}
              >
                USD
              </MenuItem>

              <MenuItem
                value="INR"
                sx={{
                  fontSize: '0.75rem',
                  padding: '6px 10px',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  },
                }}
              >
                INR
              </MenuItem>

            </Select>
          </FormControl>
        </div>
      </div>

      {/* Send button */}
      <div className="flex items-center gap-4 justify-between">
        {/* Cancel */}
        <button 
          className="text-sm text-zinc-500 hover:text-zinc-700 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>

        {/* Send (subtle primary) */}
        <button
          className="px-4 py-2 rounded-md bg-emerald-500/90 text-white text-sm font-medium hover:bg-emerald-600 transition"
        >
          Send
        </button>
      </div>



      {/* Info */}
      <p className="text-[11px] text-zinc-400 text-center">
        Always verify the recipient address. Transactions cannot be reversed.
      </p>

    </div>
  );
};

export default SendCard;
