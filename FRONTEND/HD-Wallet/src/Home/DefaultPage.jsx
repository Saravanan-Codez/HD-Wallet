import React from 'react'
import SeedPhrasePopUp from '../Seed phrase/SeedPhrasePopUp'

const DefaultPage = ({ 
  onPopOpen, 
  newSeedPhrase, 
  seedPhrasePop,
  setSeedPhrase,
  makeDots,
  onPopClose,
  seedPhrase,
  setDashBoard
}) => {
  return (
    <>
      {/* APP SHELL */}
      <div className="fixed inset-0 bg-linear-to-br from-zinc-50 to-zinc-100 flex items-center justify-center">

        {/* CARD */}
        <div className="w-full max-w-sm bg-white rounded-2xl border shadow-sm p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900">
              HD Wallet
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Securely create or import a wallet to continue
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4">

            {/* Primary */}
            <button
              onClick={() => {
                newSeedPhrase();
                setDashBoard(true);
              }}
              className="w-full py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Generate New Wallet
            </button>

            {/* Secondary */}
            <button
              onClick={onPopOpen}
              className="w-full py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition"
            >
              Import Existing Wallet
            </button>
          </div>

          {/* FOOTER NOTE */}
          <p className="text-xs text-zinc-400 text-center mt-6">
            Your keys are generated and stored locally.
          </p>

        </div>
      </div>

      {/* MODAL */}
      {seedPhrasePop && (
        <SeedPhrasePopUp
          setSeedPhrase={setSeedPhrase}
          makeDots={makeDots}
          onPopClose={onPopClose}
          seedPhrase={seedPhrase}
          setDashBoard={setDashBoard}
          newSeedPhrase={newSeedPhrase}
        />
      )}
    </>
  )
}

export default DefaultPage
