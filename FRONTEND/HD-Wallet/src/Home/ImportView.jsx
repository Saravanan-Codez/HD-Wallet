import React, { useState } from 'react';
import { validateMnemonic } from 'bip39';

const ImportView = ({ onBack, onSuccess }) => {
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Validate on the fly
  const handleImport = () => {
    const trimmed = mnemonic.trim().replace(/\s+/g, ' ');
    
    if (!trimmed) {
      setError('Please enter a seed phrase.');
      return;
    }

    const words = trimmed.split(' ');
    if (words.length !== 12 && words.length !== 24) {
      setError(`Expected 12 or 24 words, got ${words.length}.`);
      return;
    }

    if (!validateMnemonic(trimmed)) {
      setError('Invalid seed phrase. Please check for typos.');
      return;
    }

    setError('');
    onSuccess(trimmed);
  };

  return (
    <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl rounded-4xl border border-neutral-800 p-8 shadow-2xl transition-all">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-3 p-2 -ml-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-medium text-white">Import Wallet</h2>
      </div>

      <p className="text-sm text-neutral-400 mb-6">
        Enter your 12 or 24-word recovery phrase to restore your wallet.
      </p>

      <div className="space-y-4">
        <div className={`
          relative rounded-xl border p-1 transition-colors duration-200
          ${error ? 'border-red-500/50 bg-red-500/5' : 
            isFocused ? 'border-neutral-600 bg-neutral-800/50' : 'border-neutral-800 bg-neutral-900'}
        `}>
          <textarea
            className="w-full h-32 p-3 bg-transparent text-white text-sm outline-none resize-none placeholder:text-neutral-600 leading-relaxed"
            placeholder="e.g. apple banana cherry..."
            value={mnemonic}
            onChange={(e) => {
              setMnemonic(e.target.value);
              if (error) setError('');
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            spellCheck={false}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 font-medium px-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}

        <button
          onClick={handleImport}
          className="w-full mt-2 py-3.5 rounded-full bg-white text-black font-medium hover:scale-[1.02] hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Verify & Import
        </button>
      </div>
    </div>
  );
};

export default ImportView;
