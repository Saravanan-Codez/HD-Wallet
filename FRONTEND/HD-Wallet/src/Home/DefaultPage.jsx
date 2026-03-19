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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-neutral-950">
      
      {/* Left Branding Panel */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 lg:p-24 border-r border-neutral-800 bg-neutral-900/20 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-[120px]"></div>
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-12 shadow-xl">
            <div className="w-4 h-4 bg-black rounded-full" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
            Seamless access <br/>to your digital <br/><span className="font-semibold">assets.</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
            A highly secure, minimal, and fully featured hierarchical deterministic wallet designed for the modern web.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-neutral-500 font-medium">
          Keys never leave your device • 100% Non-custodial
        </div>
      </div>

      {/* Right Action Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10">
        <div className="w-full max-w-md space-y-8">
          
          <div className="md:hidden flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-full" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight">HD Wallet</h1>
          </div>

          <div>
            <h2 className="text-3xl font-light text-white mb-3">Get Started</h2>
            <p className="text-base text-neutral-400">Choose how you want to access your wallet</p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-xl bg-white text-black font-semibold text-base transition-all duration-200 
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] active:scale-95'}`}
            >
              {loading ? 'Generating...' : 'Create New Wallet'}
            </button>

            <div className="relative flex items-center py-4">
              <div className="grow border-t border-neutral-800"></div>
              <span className="shrink-0 mx-4 text-neutral-500 text-sm font-medium">or</span>
              <div className="grow border-t border-neutral-800"></div>
            </div>

            <button
              onClick={onImport}
              disabled={loading}
              className="w-full py-4 rounded-xl border border-neutral-700 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-all duration-200 active:scale-95"
            >
              Import Existing Wallet
            </button>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default DefaultPage;
