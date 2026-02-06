 
import { seedFromMnemonic } from '../BIP Functions/generateSeedPhrase'

export default function ImportSeedModal({ 
  setSeedPhrase,  
  makeDots, 
  onPopClose,
  seedPhrase,
  setDashBoard
 }) {

  return (
    <>
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    {/* Modal */}
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Import Wallet
          </h2>
          <p className="text-sm text-zinc-500">
            Enter your 12 or 24 word recovery phrase
          </p>
        </div>

        <button
          onClick={onPopClose}
          className="text-zinc-400 hover:text-zinc-600 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Warning */}
      <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        Anyone with this recovery phrase can fully control your wallet.
      </div>

      {/* Seed input */}
      <textarea
        rows={4}
        placeholder="example: forest apple stone ..."
        className="w-full p-3 text-sm bg-zinc-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
        value={makeDots(seedPhrase)}
        onChange={(e) => setSeedPhrase(e.target.value)}
      />

      {/* Helper */}
      <p className="text-xs text-zinc-500">
        Words should be separated by single spaces.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg text-sm bg-zinc-100 hover:bg-zinc-200"
          onClick={onPopClose}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded-lg text-sm bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={() => {
            seedFromMnemonic(seedPhrase.trim());
            setDashBoard(true);
            onPopClose();
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
