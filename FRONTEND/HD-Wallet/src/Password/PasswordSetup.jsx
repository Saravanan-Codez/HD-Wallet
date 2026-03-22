import React from 'react'
import { useState } from 'react';

const PasswordSetup = ({ setPassword }) => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink relative overflow-hidden">
      {/* Cloudy roaming background orb */}
      <div aria-hidden="true" className="cloudy-orb pointer-events-none absolute inset-0 z-0" />
      <div aria-hidden="true" className="cloudy-shadow pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-sm bg-moss-dark/10 border border-muted/20 p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-bone mb-2 text-center">
          Create Password
        </h2>
        <p className="text-sm text-muted mb-6 text-center">
          Set a secure password to protect your wallet
        </p>

        <form>
          {/* <!-- Password --> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted mb-2">
              New Password
            </label>
            <input 
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-ink text-bone border border-muted/30 focus:outline-none focus:ring-2 focus:ring-moss focus:border-moss transition-all placeholder:text-muted/50"
              onChange={(event) => setNewPassword(event.target.value)}
              value={newPassword}
            />
          </div>

          {/* <!-- Confirm Password --> */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted mb-2">
              Confirm Password
            </label>
            <input 
              type="password"
              placeholder="Re-enter password"
              className="w-full px-4 py-2 rounded-lg bg-ink text-bone border border-muted/30 focus:outline-none focus:ring-2 focus:ring-moss focus:border-moss transition-all placeholder:text-muted/50"
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-moss text-ink py-2 rounded-lg font-medium hover:bg-moss-light transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-moss"
            disabled={newPassword === '' || confirmPassword === '' || newPassword !== confirmPassword}
            onClick={() => {
              setPassword(newPassword)
              console.log('Password Set: ', newPassword);
            }}
          >
            Set Password
          </button>
        </form>

      </div>
    </div>
  )
}

export default PasswordSetup;
