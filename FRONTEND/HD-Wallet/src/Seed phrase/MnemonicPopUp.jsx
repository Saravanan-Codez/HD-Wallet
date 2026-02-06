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
        <div className ="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-6">

          {/* <!-- Header --> */}
          <div className ="flex justify-between items-start">
            <div>
              <h2 className ="text-lg font-semibold text-zinc-900">
                Recovery Phrase
              </h2>
              <p className ="text-sm text-zinc-500">
                Never share this phrase with anyone
              </p>
            </div>

            <button 
              className ="text-zinc-400 hover:text-zinc-600 text-xl"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* <!-- Warning --> */}
          <div className ="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Anyone with this recovery phrase can fully control your wallet.
          </div>
          
          {
            reveal && (
              <div className="flex justify-end ">
                <button
                  
                  onClick={() => {
                    navigator.clipboard.writeText(seedPhrase);
                    handleClickSnackBar();
                  }}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-700 cursor-pointer"
                >
                  <img className="w-4 h-4" src={copyLogo}></img>
                  <p>Copy</p>
                </button>
              </div>
            )
          }
          


          {/* <!-- Seed Phrase Grid (12 words example) --> */}
          <div className ="grid grid-cols-3 gap-3">

            {/* <!-- Word item --> */}
            {seedPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-zinc-200 rounded-lg px-3 py-2 bg-zinc-50"
              >
                <span className="text-xs text-zinc-400 w-4">
                  {index + 1}
                </span>

                <span className="text-sm font-mono text-zinc-900">
                  {reveal ? word : "••••••••"}
                </span>
              </div>
            ))}

            {/* <!-- repeat up to 12 / 24 --> */}
          </div>

          {/* <!-- Footer --> */}
          <div className ="flex justify-between items-center pt-2">
            <button 
              className ="text-sm text-emerald-600 hover:underline cursor-pointer"
              onClick={() => {
                setreveal(!reveal);
                console.log(seedPhrase);
              }}
            >
              { reveal ? "Hide phrase" : "Reveal phrase" }
            </button>
            <button 
              className ="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
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
          />
        )
      }

    </div>
  )
}

export default MnemonicPopUp
