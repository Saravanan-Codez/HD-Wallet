import React from 'react'
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar'
import copyLogo from '../assets/copy.png'


const MnemonicPopUp = (
  { 
    onClose,
    seedPhrase, 
    openSnackBar, 
    onCloseSnackBar, 
    handleClickSnackBar 
  }) => {

  const [reveal, setreveal] = useState(false);

  return (
    <div>
      {/* <!-- Overlay --> */}
      <div className ="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

        {/* <!-- Modal --> */}
        <div className ="w-full max-w-lg bg-moss-dark border border-muted/20 rounded-2xl shadow-xl p-6 space-y-6">

          {/* <!-- Header --> */}
          <div className ="flex justify-between items-start">
            <div>
              <h2 className ="text-lg font-semibold text-bone">
                Recovery Phrase
              </h2>
              <p className ="text-sm text-muted">
                Never share this phrase with anyone
              </p>
            </div>

            <button 
              className ="text-muted hover:text-bone transition-colors text-xl"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* <!-- Warning --> */}
          <div className ="text-xs text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
            Anyone with this recovery phrase can fully control your wallet.
          </div>

          {/* <!-- Seed Phrase Grid (12 words example) --> */}
          <div className ="grid grid-cols-3 gap-3">

            {/* <!-- Word item --> */}
            {seedPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-muted/30 rounded-lg px-3 py-2 bg-ink"
              >
                <span className="text-xs text-muted w-4">
                  {index + 1}
                </span>

                <span className="text-sm font-mono text-bone">
                  {reveal ? word : "••••••••"}
                </span>
              </div>
            ))}

            {/* <!-- repeat up to 12 / 24 --> */}
          </div>

          {/* <!-- Footer --> */}
          <div className="flex justify-between items-center pt-2">

            {/* LEFT SIDE (Reveal + Copy together) */}
            <div className="flex items-center gap-3">
              <button 
                className="text-sm font-medium text-moss hover:text-moss-light hover:underline cursor-pointer transition-colors"
                onClick={() => {
                  setreveal(!reveal);
                  console.log(seedPhrase);
                }}
              >
                {reveal ? "Hide phrase" : "Reveal phrase"}
              </button>

              {reveal && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(seedPhrase);
                    handleClickSnackBar();
                  }}
                  className="flex items-center gap-1 text-xs text-muted hover:text-bone cursor-pointer opacity-60 hover:opacity-100 transition-all"
                >
                  <img
                    src={copyLogo}
                    alt="Copy"
                    className="w-4 h-4 opacity-90 hover:opacity-100 invert"
                  />
                  <p>Copy</p>
                </button>
              )}
            </div>

            {/* RIGHT SIDE */}
            <button 
              className="px-4 py-2 rounded-lg bg-ink border border-muted/30 text-bone hover:bg-muted/20 transition-all font-medium"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>

      {
        openSnackBar && (
          <Snackbar
            open={openSnackBar}
            autoHideDuration={2000}
            onClose={onCloseSnackBar}
            message="Seed phrase copied to clipboard"
            ContentProps={{
              sx: {
                backgroundColor: "#101512", // ink
                color: "#F3F1EA",           // bone
                border: '1px solid rgba(167, 173, 164, 0.3)',
                borderRadius: "12px",
                fontSize: "0.875rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                paddingX: 2.5,
                paddingY: 1.25,
              },
            }}
          />
        )
      }

    </div>
  )
}

export default MnemonicPopUp
