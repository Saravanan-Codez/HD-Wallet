import React from 'react';

const SendCard = ({ onClose, activeWallet }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blur + Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] border border-neutral-800 p-8 shadow-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-light text-white">Send SOL</p>
          <span className="text-xs font-medium text-neutral-500 bg-neutral-800 px-2.5 py-1 rounded-full">
            Transfer
          </span>
        </div>

        {/* From */}
        <div className="bg-neutral-800/30 border border-neutral-800 rounded-xl p-3 text-xs font-mono text-neutral-300 break-all select-text cursor-default">
          <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5 font-sans">
            Sender
          </p>
          <p className="text-neutral-200">{activeWallet.publicKeyBase58}</p>
        </div>

        {/* To */}
        <div>
          <p className="text-xs font-medium text-neutral-400 mb-2">Recipient Address</p>
          <input
            type="text"
            placeholder="Search or paste address..."
            className="w-full text-sm bg-neutral-800/50 text-white border border-neutral-700/50 rounded-xl p-3 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 placeholder:text-neutral-600 transition-all font-mono"
            spellCheck={false}
          />
        </div>

        {/* Amount */}
        <div>
          <p className="text-xs font-medium text-neutral-400 mb-2">Amount (SOL)</p>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              className="w-full text-xl bg-neutral-800/50 text-white border border-neutral-700/50 rounded-xl p-3 pl-4 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 placeholder:text-neutral-600 transition-all font-light
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500">
              SOL
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95"
          >
            Review Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default SendCard;
