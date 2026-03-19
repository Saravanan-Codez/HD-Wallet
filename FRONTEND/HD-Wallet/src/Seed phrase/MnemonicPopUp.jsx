import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const MnemonicPopUp = ({ onClose, seedPhrase, openSnackBar, onCloseSnackBar, handleClickSnackBar }) => {
  const [reveal, setReveal] = useState(false);

  return (
    <div>
      {/* <!-- Overlay --> */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity">

        {/* <!-- Modal --> */}
        <div className="w-full max-w-lg bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2rem] shadow-2xl p-8 space-y-6">

          {/* <!-- Header --> */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-light text-white mb-1">
                Recovery Phrase
              </h2>
              <p className="text-xs text-neutral-400">
                Never share this phrase with anyone.
              </p>
            </div>

            <button 
              className="p-2 -mr-2 text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-neutral-800"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* <!-- Warning --> */}
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-sm text-red-400 font-medium">
              Anyone with this recovery phrase can fully control your wallet. Keep it offline and secure.
            </div>
          </div>

          {/* <!-- Seed Phrase Grid --> */}
          <div className="grid grid-cols-3 gap-3">
            {seedPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-neutral-800/80 rounded-xl p-3 bg-neutral-800/30"
              >
                <span className="text-[10px] text-neutral-500 font-mono w-4 shrink-0 text-right">
                  {index + 1}
                </span>

                <span className={`text-sm font-mono text-neutral-200 truncate ${!reveal && 'opacity-50 blur-[2px] transition-all'}`}>
                  {reveal ? word : "••••"}
                </span>
              </div>
            ))}
          </div>

          {/* <!-- Footer Actions --> */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-neutral-800">
            
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                className="text-sm font-medium text-white hover:text-neutral-300 transition-colors flex items-center gap-2"
                onClick={() => setReveal(!reveal)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {reveal ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                  {!reveal && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                </svg>
                {reveal ? "Hide phrase" : "Reveal phrase"}
              </button>

              {reveal && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(seedPhrase);
                    if (handleClickSnackBar) handleClickSnackBar();
                  }}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
            </div>

            {/* RIGHT SIDE */}
            <button 
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95"
              onClick={onClose}
            >
              Done
            </button>

          </div>

        </div>
      </div>

      {openSnackBar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={onCloseSnackBar}
          message="Recovery phrase copied"
          ContentProps={{
            sx: {
              backgroundColor: "#171717",
              color: "#F5F5F5",
              border: '1px solid #262626',
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
              paddingX: 3,
            },
          }}
        />
      )}
    </div>
  );
};

export default MnemonicPopUp;
