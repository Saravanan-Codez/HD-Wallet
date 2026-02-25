import React from 'react'
import { useState } from 'react';

const PasswordSetup = ({ setPassword }) => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">
          Create Password
        </h2>
        <p className="text-sm text-zinc-500 mb-6 text-center">
          Set a secure password to protect your wallet
        </p>

        <form>
          {/* <!-- Password --> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-600 mb-2">
              New Password
            </label>
            <input 
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              onChange={(event) => setNewPassword(event.target.value)}
              value={newPassword}
            />
          </div>

          {/* <!-- Confirm Password --> */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-600 mb-2">
              Confirm Password
            </label>
            <input 
              type="password"
              placeholder="Re-enter password"
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
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
