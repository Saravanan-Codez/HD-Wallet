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
      <div className="fixed inset-0 bg-ink flex items-center justify-center">

        {/* CARD */}
        <div className="w-full max-w-sm bg-moss-dark rounded-2xl border border-muted/20 shadow-sm p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-bone">
              HD Wallet
            </h1>
            <p className="text-sm text-muted mt-1">
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
              className="w-full py-3 rounded-lg bg-moss text-ink font-medium hover:bg-moss-light transition-all active:scale-95"
            >
              Generate New Wallet
            </button>

            {/* Secondary */}
            <button
              onClick={onPopOpen}
              className="w-full py-3 rounded-lg border border-moss text-moss hover:bg-moss/10 transition-all active:scale-95"
            >
              Import Existing Wallet
            </button>
          </div>

          {/* FOOTER NOTE */}
          <p className="text-xs text-muted text-center mt-6">
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
