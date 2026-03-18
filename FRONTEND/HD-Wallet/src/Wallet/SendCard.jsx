import React from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SendCard = ({ onClose, activeWallet }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blur + Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-moss-dark rounded-xl border border-muted/20 p-5 space-y-5 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-bone">
            Send SOL
          </p>
          <span className="text-xs text-muted">
            Transaction
          </span>
        </div>

        {/* From */}
        <div className="bg-ink border border-muted/30 rounded-lg p-2 text-xs font-mono text-bone break-all select-text cursor-default">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wide text-muted">
              Sender address
            </span>
          </div>

          <p>{activeWallet.publicKeyBase58}</p>
        </div>

        {/* To */}
        <div>
          <p className="text-xs text-muted mb-1">To</p>
          <input
            type="text"
            placeholder="Recipient address"
            className="w-full text-xs bg-ink text-bone border border-muted/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-moss placeholder:text-muted/50 transition-all"
          />
        </div>

        {/* Amount row */}
        <div className="flex items-end gap-3">

          {/* SOL Amount */}
          <div className="w-32">
            <p className="text-xs text-muted mb-1">Amount (SOL)</p>
            <input
              type="number"
              placeholder="0.00"
              className="w-full text-xs bg-ink text-bone border border-muted/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-moss placeholder:text-muted/50 transition-all
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            className="text-sm text-muted hover:text-bone hover:underline transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-md bg-moss text-ink text-sm font-medium hover:bg-moss-light transition-all active:scale-95"
          >
            Send
          </button>
        </div>

        {/* Info */}
        <p className="text-[11px] text-muted text-center">
          Always verify the recipient address. Transactions cannot be reversed.
        </p>

      </div>
    </div>

  );
};

export default SendCard;
