import React, { useState } from 'react';

const DefaultPage = ({ onImport, onGenerate }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate slight delay for premium feel and state processing
    setTimeout(async () => {
      await onGenerate();
      setLoading(false);
    }, 400); 
  };

  return (
    <div className="w-full max-w-sm bg-neutral-900/50 backdrop-blur-xl rounded-4xl border border-neutral-800 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-neutral-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-light tracking-tight text-white mb-2">
          HD Wallet
        </h1>
        <p className="text-sm text-neutral-400">
          A secure, minimal crypto wallet manager
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3.5 rounded-full bg-white text-black font-medium transition-all duration-200 
            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-lg active:scale-95'}`}
        >
          {loading ? 'Generating...' : 'Create New Wallet'}
        </button>

        <button
          onClick={onImport}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition-all duration-200 active:scale-95"
        >
          Import Existing
        </button>
      </div>

      <p className="text-xs text-neutral-600 text-center mt-8">
        Keys never leave your device
      </p>
    </div>
  );
};

export default DefaultPage;
