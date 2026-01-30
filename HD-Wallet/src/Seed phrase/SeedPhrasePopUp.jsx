 
export default function ImportSeedModal({ setSeedPhrase, handleSubmition, makeDots, onPopClose }) {

  return (
    <>
      {/* Trigger Button */}
      <button
        className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600"
      >
        Import Wallet
      </button>

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        {/* Modal Box */}
        <div className="bg-zinc-100 w-85 rounded-xl p-5 shadow-xl">
          <h2 className="text-lg font-semibold mb-3">Import Wallet</h2>

          {/* Seed Input */}
          <textarea
            rows={4}
            placeholder="Enter your 12 or 24 word seed phrase"
            className="w-full p-3 text-sm bg-white rounded-md outline-none resize-none focus:ring-2 focus:ring-emerald-500"
            value={makeDots}
            onChange={(e) => setSeedPhrase(e.target.value)}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200"
              onClick={ onPopClose }
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600"
              onClick={handleSubmition}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
