import React from 'react'
import { useState } from 'react';
import { generateSeedPhrase } from '../BIP Functions/generateSeedPhrase';
import DashBoard from '../Wallet/DashBoard';
import DefaultPage from './DefaultPage';
import AnimatedCard from '../Animations/AnimatedCard';

const Home = () => {

  const [seedPhrasePop, setSeedPhrasePop] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seed, setSeed] = useState(null);
  const [dashBoard, setDashBoard] = useState(false);

  // useEffect(() => {
  //   document.body.style.overflow = seedPhrasePop ? "hidden" : "hidden";
  // }, [seedPhrasePop]);


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
      {dashBoard ? (
        // ✅ Dashboard layout (app-style)
        <div className="min-h-screen bg-zinc-50">
          <AnimatedCard>
            <DashBoard
              seedPhrase={seedPhrase}
              seed={seed}
            />
          </AnimatedCard>
        </div>
      ) : (
        // ✅ Default page layout (card-style)
        <div className="min-h-screen flex justify-center items-start bg-zinc-100 pt-24">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg transition-all duration-300">
            <DefaultPage
              onPopOpen={() => setSeedPhrasePop(true)}
              newSeedPhrase={() => generateSeedPhrase(setSeedPhrase, setSeed)}
              seedPhrasePop={seedPhrasePop}
              setSeedPhrase={setSeedPhrase}
              makeDots={makeDots}
              onPopClose={() => setSeedPhrasePop(false)}
              seedPhrase={seedPhrase}
              setDashBoard={setDashBoard}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Home
