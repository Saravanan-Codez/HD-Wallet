import React from 'react'
import { useState } from 'react';

const PasswordCheck = (
  { 
    password, 
    onSuccess,
    onClose
  }) => {

  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const authenticate = () => {
    if (passwordInput === password) {
      console.log('Authenticated'); 
      onSuccess();
    } else if (passwordInput === '') {
      console.log('Password cannot be empty');
      setError(true);
    }
    else {
      console.log('Authentication failed => ', passwordInput, password);
      setError(true);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

      <div className="w-full max-w-sm bg-moss-dark border border-muted/20 rounded-2xl shadow-xl p-6">

        {/* <!-- Title --> */}
        <h2 className="text-xl font-semibold text-bone mb-2">
          Confirm Password
        </h2>
        <p className="text-sm text-muted mb-5">
          Enter your password to continue
        </p>

        {/* <!-- Password Field --> */}
        <div className="mb-5">
          <input 
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg bg-ink text-bone border border-muted/30 focus:outline-none focus:ring-2 focus:ring-moss focus:border-moss transition-all placeholder:text-muted/50"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onFocus={() => setError(false)}
          />
        </div>
        {/* <!-- Warnings --> */}
        { 
          error && passwordInput !== '' && (
            <p className="text-sm text-danger mb-5">
              Incorrect password. Please try again.
            </p>
        )}

        {
          error && passwordInput === '' && (
            <p className="text-sm text-danger mb-5">
              Password cannot be empty.
            </p>
          )
        }

        {/* <!-- Buttons --> */}
        <div className="flex justify-end gap-3">
          <button 
            className="px-4 py-2 rounded-lg bg-ink text-bone border border-muted/30 hover:bg-muted/20 transition-all font-medium"
            onClick={onClose}
          >
            Cancel
          </button>

          <button 
            className="px-4 py-2 rounded-lg bg-moss text-ink hover:bg-moss-light transition-all active:scale-95 font-medium"
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
