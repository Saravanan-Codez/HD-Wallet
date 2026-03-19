import React, { useState } from 'react';

const PasswordCheck = ({ password, onSuccess, onClose }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const authenticate = () => {
    if (passwordInput === password) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      authenticate();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]">
      {/* Background blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2rem] shadow-2xl p-8">
        
        {/* Title */}
        <h2 className="text-xl font-light text-white mb-2">
          Verify Ownership
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          Enter your wallet password to continue.
        </p>

        {/* Input */}
        <div className="relative mb-6">
          <input 
            type="password"
            placeholder="Wallet password"
            className={`w-full px-4 py-3 rounded-xl bg-neutral-800/50 text-white border text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-neutral-600 ${
              error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 'border-neutral-700/50 focus:border-neutral-500 focus:ring-neutral-500'
            }`}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onFocus={() => setError(false)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {error && (
            <div className="absolute -bottom-5 left-1 text-[11px] text-red-400 font-medium">
              Incorrect password
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button 
            className="px-5 py-2.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>

          <button 
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95"
            onClick={authenticate}
          >
            Authenticate
          </button>
        </div>

      </div>
    </div>
  );
};

export default PasswordCheck;
