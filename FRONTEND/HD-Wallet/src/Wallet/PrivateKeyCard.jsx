import React from 'react'
import { useState } from 'react';
import copyLogo from '../assets/copy.png';

const PrivateKeyCard = ({ onClose, activeWallet }) => {

  const [privateKeyReveal, setPrivateKeyReveal] = useState(false);
  
  
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4 min-h-55">

      

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-900">
          Private Key
        </p>

        {/* Close button when revealed */}
          <button
            className="text-zinc-400 hover:text-zinc-600"
            aria-label="Close private key"
            onClick={onClose}
          >
            ✕
          </button>
      </div>

      

      {/* Hidden state */}
        <button
          className="text-xs text-red-600 hover:underline text-left"
          onClick={() => setPrivateKeyReveal(!privateKeyReveal)}
        >
          { privateKeyReveal ? "⦾ Hide private key" : "⦾ Reveal private key"}
        </button>

      {/* Revealed state */}
        <div className="space-y-3">

          <div className="bg-zinc-50 border rounded-lg p-3">
            <p className="font-mono text-xs break-all text-zinc-800">
              {privateKeyReveal ? activeWallet.privateKeyBase58 : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText();
              }}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-700 cursor-pointer opacity-60 hover:opacity-100"
            >
              <img className="w-4 h-4" src={copyLogo}></img>
              <p>Copy</p>
            </button>
          </div>
          {/* Warning banner */}
          { privateKeyReveal &&
            <div className="flex items-start justify-between gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-xs text-red-700">
                <p className="font-medium">Sensitive information</p>
                <p className="mt-0.5">
                  Don't share your private key with anyone.
                </p>
              </div>

              <button
                className="text-red-400 hover:text-red-600"
                aria-label="Dismiss warning"
                onClick={() => setPrivateKeyReveal(false)}
              >
                ✕
              </button>
            </div>
          }
        </div>
    </div>

  )
}

export default PrivateKeyCard
