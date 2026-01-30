import React from 'react'
import { useState } from 'react';
import SeedPhrasePopUp from '../Seed phrase/SeedPhrasePopUp'
import { generateSeedPhrase } from '../BIP Functions/generateSeedPhrase';
import DashBoard from '../Wallet/DashBoard';
import DefaultPage from './DefaultPage';

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
              
            <DashBoard />

          ) : (

            <DefaultPage 
              onPopOpen={() => setSeedPhrasePop(true)}
              newSeedPhrase={() => generateSeedPhrase(setSeedPhrase, setSeed)}
              seedPhrasePop={seedPhrasePop}
              setSeedPhrase={setSeedPhrase}
              handleSubmition={handleSeedPhraseSubmition}
              makeDots={makeDots}
              onPopClose={() => setSeedPhrasePop(false)}
            />
            
          )
        }
        </div>
      </div>
    </>


  )
}

export default Home
