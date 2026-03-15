 

export default function ImportSeedModal({ 
  setSeedPhrase,  
  makeDots, 
  onPopClose,
  seedPhrase,
  setDashBoard,
  newSeedPhrase
 }) {

  return (
    <>
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    {/* Modal */}
    <div className="bg-moss-dark w-full max-w-md rounded-2xl shadow-xl border border-muted/20 p-6 space-y-5">

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
        value={makeDots(seedPhrase)}
        onChange={(e) => setSeedPhrase(e.target.value)}
      />


      {/* Helper */}
      <p className="text-xs text-muted">
        Words should be separated by single spaces.
      </p>

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
          onClick={() => {
            setSeedPhrase(seedPhrase.trim());
            setDashBoard(true);
            onPopClose();
            newSeedPhrase();
          }}
        >
          Import Wallet
        </button>
      </div>

    </div>
  </div>
</>

  );
}
