import React from 'react';
import { useState } from 'react'; 
import { validateSeedPhrase } from '../BIP Functions/Credentials/generateSeedPhrase';

export default function ImportSeedModal({ 
  setSeedPhrase,  
  makeDots, 
  onPopClose,
  setDashBoard,
 }) {

  const [currentSeedPhrase, setCurrentSeedPhrase] = useState('');
  const [error, setError] = useState(false);

  const handleImportWallet = () => {
    // setSeedPhrase(seedPhrase.trim());
    // setDashBoard(true);
    // onPopClose();
    validateSeedPhrase(currentSeedPhrase.trim(), setSeedPhrase, setDashBoard, onPopClose, setError);
  }

  return (
    <>
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    {/* Modal */}
    <div className="bg-moss-dark w-full max-w-md rounded-3xl shadow-[0_6px_0_0_#C4FF00] border border-zinc-800 p-6 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-bone">
            Import Wallet
          </h2>
          <p className="text-sm text-muted">
            Enter your 12 or 24 word recovery phrase
          </p>
        </div>

        <button
          onClick={onPopClose}
          className="text-muted hover:text-bone transition-colors text-xl"
        >
          ✕
        </button>
      </div>

      {/* Warning */}
      <div className="text-xs text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
        Anyone with this recovery phrase can fully control your wallet.
      </div>

      {/* Seed input */}
      <textarea
        rows={4}
        placeholder="example: forest apple stone ..."
        className="w-full p-3 text-sm bg-ink text-bone border border-muted/30 rounded-lg outline-none resize-none focus:ring-2 focus:ring-moss placeholder:text-muted/50 transition-all"
        value={makeDots(currentSeedPhrase)}
        onChange={(e) => setCurrentSeedPhrase(e.target.value)}
        onFocus={() => setError(false)}
      />

      {/* Helper */}
      <p className="text-xs text-muted">
        Words should be separated by single spaces.
      </p>

      {error && (
        <p className="text-xs text-danger">
          Invalid seed phrase. Please check and try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg text-sm bg-ink text-bone border border-muted/30 hover:bg-muted/20 transition-all"
          onClick={onPopClose}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded-lg text-sm bg-moss text-ink font-medium hover:bg-moss-light transition-all active:scale-95"
          onClick={handleImportWallet}
        >
          Import Wallet
        </button>
      </div>

    </div>
  </div>
</>

  );
}
