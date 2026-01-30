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
      <div className="fixed inset-0 bg-zinc-50 flex items-center justify-center">

        {/* CARD */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900">
              HD Wallet
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Import or generate a wallet to continue
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4">
            <button
              onClick={onPopOpen}
              className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
            >
              Import Existing Wallet
            </button>

            <button
              onClick={() => {
                newSeedPhrase()
                setDashBoard(true)
              }}
              className="w-full py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition"
            >
              Generate New Wallet
            </button>
          </div>

        </div>
      </div>

      {/* MODAL (ROOT LEVEL) */}
      {seedPhrasePop && (
        <SeedPhrasePopUp
          setSeedPhrase={setSeedPhrase}
          makeDots={makeDots}
          onPopClose={onPopClose}
          seedPhrase={seedPhrase}
          setDashBoard={setDashBoard}
        />
      )}
    </>


  )
}

export default DefaultPage
