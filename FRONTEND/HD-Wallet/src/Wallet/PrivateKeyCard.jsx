import React, { useState } from 'react';
import copyLogo from '../assets/copy.png';

const PrivateKeyCard = ({ onClose, activeWallet }) => {
  const [privateKeyReveal, setPrivateKeyReveal] = useState(false);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blurry Background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] border border-neutral-800 p-8 shadow-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-light text-white">Private Key</p>
          <button
            className="p-2 -mr-2 text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-neutral-800"
            aria-label="Close private key"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Key Display & Toggle */}
        <div className="space-y-4">
          <div className="bg-neutral-800/30 border border-neutral-800 rounded-xl p-4">
            <p className="font-mono text-xs break-all text-neutral-300 leading-relaxed">
              {privateKeyReveal
                ? activeWallet.privateKeyBase58
                : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5"
              onClick={() => setPrivateKeyReveal(!privateKeyReveal)}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {privateKeyReveal ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
                {/* Need extra path if eye open */}
                {!privateKeyReveal && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
              </svg>
              {privateKeyReveal ? "Hide Key" : "Reveal Key"}
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(activeWallet.privateKeyBase58)}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
        </div>

        {/* Warning */}
        {privateKeyReveal && (
          <div className="flex items-start justify-between gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-fadeIn">
            <div className="text-xs text-red-400">
              <p className="font-semibold mb-0.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Danger
              </p>
              <p className="text-red-400/80 leading-relaxed">
                Never share your private key. Anyone with it has full access to your funds.
              </p>
            </div>
            <button
              className="text-red-400/50 hover:text-red-400 transition-colors p-1"
              aria-label="Dismiss warning"
              onClick={() => setPrivateKeyReveal(false)}
            >
              ✕
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default PrivateKeyCard;
