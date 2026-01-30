import React from 'react'
import SeedPhrasePopUp from '../Seed phrase/SeedPhrasePopUp'

const DefaultPage = ({ 
  onPopOpen, 
  newSeedPhrase, 
  seedPhrasePop,
  setSeedPhrase,
  handleSubmition,
  makeDots,
  onPopClose
}) => {
  return (
    <div className=" flex items-center justify-center bg-zinc-100">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">

                {/* Title */}
                <div className="text-center">
                  <h1 className="text-2xl font-semibold text-zinc-900">
                    HD Wallet
                  </h1>
                  <p className="text-sm text-zinc-500 mt-1">
                    Import or generate a wallet to continue
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={onPopOpen}
                    className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer"
                  >
                    Import Existing Wallet
                  </button>

                  <button
                    className="w-full py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
                    onClick={newSeedPhrase}
                  >
                    Generate New Wallet
                  </button>
                </div>

              </div>
              {seedPhrasePop && (
                <SeedPhrasePopUp 
                  setSeedPhrase={setSeedPhrase} 
                  handleSubmition={handleSubmition} 
                  makeDots={makeDots}
                  onPopClose={onPopClose}
                />
              )}
            </div>
  )
}

export default DefaultPage
