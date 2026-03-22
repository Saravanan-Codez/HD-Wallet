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
<div className="min-h-screen w-full flex items-center justify-center">

  <div className="w-full max-w-sm px-6 py-10 relative z-10
    rounded-3xl overflow-hidden

    bg-neutral-900/40 backdrop-blur-xl
    border border-white/8

    shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]">

    <div className="w-full flex flex-col items-center text-center">

      {/* Header */}
      <h1 className="text-xl font-semibold text-white tracking-[0.14em] mb-6">
        SOLANA
      </h1>

      {/* Subtitle */}
      <p className="text-xs text-neutral-400 mb-8 leading-relaxed max-w-60">
        Create or import your wallet securely
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full items-center">

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-[80%] py-3 rounded-xl text-sm font-medium
          bg-white text-black border border-white/10
          transition-all duration-150
          ${loading 
            ? 'opacity-60 cursor-not-allowed' 
            : 'hover:scale-[1.015] hover:shadow-[0_6px_18px_rgba(255,255,255,0.08)] active:scale-[0.95]'
          }`}
        >
          {loading ? 'Generating...' : 'Create wallet'}
        </button>

        <div className="relative flex items-center py-2 w-[80%]">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-neutral-700/80 to-transparent" />
          <span className="mx-3 text-[10px] text-neutral-500 tracking-[0.25em]">OR</span>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-neutral-700/80 to-transparent" />
        </div>

        <button
          onClick={onImport}
          disabled={loading}
          className="w-[80%] py-3 rounded-xl text-sm font-medium
          bg-neutral-900/60 text-white border border-neutral-700/60 backdrop-blur-sm
          transition-all duration-150
          hover:bg-neutral-800/70 hover:border-neutral-500 active:scale-[0.95]"
        >
          Import wallet
        </button>

      </div>

    </div>

  </div>

</div>
  );
};

export default DefaultPage;
