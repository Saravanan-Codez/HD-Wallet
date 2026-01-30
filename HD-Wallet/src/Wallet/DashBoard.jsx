import React from 'react'
import CollapsedView from './CollapsedView'

const DashBoard = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">HD Wallet</h1>
        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
          Active
        </span>
      </div>

      {/* Seed Section */}
      <div className="bg-zinc-50 rounded-lg p-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Seed Phrase</p>
          <p className="text-xs text-zinc-500">Hidden for security</p>
        </div>
        <button className="text-sm text-emerald-600 cursor-pointer hover:underline">
          View
        </button>
      </div>

      {/* Wallets */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-700">Wallets</p>

        {/* Wallet Item */}
        <div className="border rounded-lg">
          <button className="w-full flex justify-between items-center p-4">
            <span className="font-medium">Wallet 1</span>
            <span>▶</span>
          </button>
        </div>
      </div>

      <CollapsedView/>
    </div>
  )
}

export default DashBoard
