import React from 'react'
import { useState } from 'react';
import SeedPhrasePopUp from '../Seed phrase/SeedPhrasePopUp'
import { generateSeedPhrase } from '../BIP Functions/generateSeedPhrase';

const Home = () => {

  const [seedPhrasePop, setSeedPhrasePop] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seed, setSeed] = useState(null);

  const handleSeedPhraseSubmition = () => {
    const seedPhraseArray = seedPhrase.trim().split(' ');
    console.log('Importing wallet with seed phrase:', seedPhraseArray);
  }

  const makeDots = (seedPhrase) => {
    let dots = '';
    for (let i = 0; i < seedPhrase.length; i++) {
      if (seedPhrase[i] != ' ') dots += '•';
      else dots += ' ';
    }
    return dots;
  }

  console.log('Seed: ', seed);

  return (
    <>
      <div className="min-h-screen flex justify-center items-start bg-zinc-100 pt-24">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg transition-all duration-300">
        {
          seedPhrase ? (
              
            <div className="p-6 space-y-6">

              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">HD Wallet</h1>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  Active
                </span>
              </div>

              {/* Seed Section */}
              <div className="bg-zinc-50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Seed Phrase</p>
                  <p className="text-xs text-zinc-500">Hidden for security</p>
                </div>
                <button className="text-sm text-emerald-600">
                  View
                </button>
              </div>

              {/* Wallets */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-700">Wallets</p>

                {/* Wallet Item */}
                <div className="border rounded-lg">
                  <button className="w-full flex justify-between items-center p-4">
                    <span className="font-medium">Wallet 1</span>
                    <span>▶</span>
                  </button>
                </div>

                <div className="border rounded-lg">
                  <button className="w-full flex justify-between items-center p-4">
                    <span className="font-medium">Wallet 2</span>
                    <span>▶</span>
                  </button>
                </div>
              </div>

            </div>

          ) : (

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
                    onClick={() => setSeedPhrasePop(true)}
                    className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer"
                  >
                    Import Existing Wallet
                  </button>

                  <button
                    className="w-full py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
                    onClick={() => generateSeedPhrase(setSeedPhrase, setSeed)}
                  >
                    Generate New Wallet
                  </button>
                </div>

              </div>
              {seedPhrasePop && (
                <SeedPhrasePopUp 
                  setSeedPhrase={setSeedPhrase} 
                  handleSubmition={handleSeedPhraseSubmition} 
                  makeDots={makeDots}
                  onPopClose={() => setSeedPhrasePop(false)}
                />
              )}
            </div>
          )
        }
        </div>
      </div>
    </>


  )
}

export default Home
