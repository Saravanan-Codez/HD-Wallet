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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-neutral-950">
      
      {/* Left Branding Panel */}
      <div className="hidden md:flex flex-col justify-between w-1/3 p-12 lg:p-16 border-r border-neutral-800 bg-neutral-900/20">
        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 mb-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight text-white mb-6 leading-tight">
            Restore <br/><span className="font-semibold">Access.</span>
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            Enter your 12 or 24-word recovery phrase to restore your wallet and access your funds.
          </p>
        </div>
        
        <div className="text-sm text-neutral-500 font-medium">
          Make sure no one is watching your screen.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8 lg:p-16 relative z-10">
        <div className="w-full max-w-xl space-y-8">
          
          <div className="md:hidden flex items-center mb-8">
            <button 
              onClick={onBack}
              className="mr-3 p-2 -ml-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-light text-white">Import Wallet</h2>
          </div>

          <div className="hidden md:block">
             <h2 className="text-2xl font-semibold text-white mb-2">Recovery Phrase</h2>
             <p className="text-neutral-400">Type or paste your secret phrase below.</p>
          </div>

          <div className="space-y-6">
            <div className={`
              relative rounded-2xl border p-2 transition-all duration-300 shadow-sm
              ${error ? 'border-red-500/50 bg-red-500/5' : 
                isFocused ? 'border-neutral-500 bg-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.03)]' : 'border-neutral-800 bg-neutral-900/50'}
            `}>
              <textarea
                className="w-full h-40 p-4 bg-transparent text-white text-base outline-none resize-none placeholder:text-neutral-600 leading-relaxed font-mono"
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
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400 font-medium">
                  {error}
                </p>
              </div>
            )}

            <button
              onClick={handleImport}
              className="w-full md:w-auto md:px-12 py-4 rounded-xl bg-white text-black font-semibold text-base hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all duration-200 active:scale-95"
            >
              Verify & Import
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ImportView;
