import React from 'react'
import { useState } from 'react';
import { generateSeedPhrase } from '../BIP Functions/Credentials/generateSeedPhrase';
import DashBoard from '../Wallet/DashBoard';
import DefaultPage from './DefaultPage';
import AnimatedCard from '../Animations/AnimatedCard';
import PasswordSetup from '../Password/PasswordSetup';
import ImportView from './ImportView';

const Home = () => {

  const [password, setPassword] = useState('');
  // Explicit Application State
  // 'PASSWORD_SETUP' | 'NO_WALLET' | 'IMPORT' | 'DASHBOARD'
  const [appState, setAppState] = useState('PASSWORD_SETUP');
  
  const [seedPhrase, setSeedPhrase] = useState('');

  // Handle Auth Flow
  if (!password) {
    return <PasswordSetup setPassword={(p) => {
      setPassword(p);
      setAppState('NO_WALLET');
    }}/>;
  }

  // Handle Main App States
  return (
    <div className="min-h-screen bg-ink text-white font-sans selection:bg-moss/25 relative overflow-hidden">
      {/* Global roaming cloudy orb (visual only) */}
      <div
        aria-hidden="true"
        className="cloudy-orb pointer-events-none absolute inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="cloudy-shadow pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10">
        <AnimatedCard>
        {appState === 'NO_WALLET' && (
          <DefaultPage 
            onImport={() => setAppState('IMPORT')}
            onGenerate={async () => {
              // Wrap critical code in try-catch
              try {
                generateSeedPhrase(setSeedPhrase);
                setAppState('DASHBOARD');
              } catch (error) {
                console.error("Seed generation failed", error);
              }
            }}
          />
        )}

        {appState === 'IMPORT' && (
          <ImportView
            onBack={() => setAppState('NO_WALLET')}
            onSuccess={(seed) => {
              setSeedPhrase(seed);
              setAppState('DASHBOARD');
            }}
          />
        )}

        {appState === 'DASHBOARD' && (
          <DashBoard 
            seedPhrase={seedPhrase} 
            password={password}
            onLogout={() => {
              // Safety: Clear critical data on exit
              setSeedPhrase('');
              setAppState('NO_WALLET');
            }}
          />
        )}
        </AnimatedCard>
      </div>
    </div>
  );
}

export default Home;
