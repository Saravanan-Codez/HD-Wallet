import React from 'react'
import { useState } from 'react';

const PasswordCheck = (
  { 
    password, 
    onClose 

  }) => {

  const [passwordInput, setPasswordInput] = useState('');

  const authenticate = () => {
    if (passwordInput === password) {
      console.log('Authenticated'); 
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">

        {/* <!-- Title --> */}
        <h2 className="text-xl font-semibold text-zinc-800 mb-2">
          Confirm Password
        </h2>
        <p className="text-sm text-zinc-500 mb-5">
          Enter your password to continue
        </p>

        {/* <!-- Password Field --> */}
        <div className="mb-5">
          <input 
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>

        {/* <!-- Buttons --> */}
        <div className="flex justify-end gap-3">
          <button 
            className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button 
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            onClick={authenticate}
          >
            Confirm
          </button>
        </div>

      </div>

    </div>
  )
}

export default PasswordCheck
