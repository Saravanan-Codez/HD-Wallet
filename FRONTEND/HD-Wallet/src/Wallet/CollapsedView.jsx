import React from 'react'

const CollapsedView = () => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button className="w-full flex justify-between items-center p-4 bg-zinc-50">
        <span className="font-medium">Wallet 1</span>
        <span>▼</span>
      </button>

      <div className="p-4 space-y-3 text-sm bg-white">
        <div>
          <p className="text-zinc-500">Derivation Path</p>
          <p className="font-mono">m/44'/501'/0'/0'</p>
        </div>

        <div>
          <p className="text-zinc-500">Public Key</p>
          <p className="font-mono break-all">xxxxxxx</p>
        </div>

        <div>
          <p className="text-zinc-500">Private Key</p>
          <p className="font-mono">••••••••</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="px-3 py-2 rounded bg-zinc-100">
            Add Wallet
          </button>
          <button className="px-3 py-2 rounded bg-red-100 text-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>

  )
}

export default CollapsedView
