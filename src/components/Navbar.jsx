import { useEffect, useState } from 'react'

export default function Navbar({ onSeed, seeding }) {
  const [backendUrl, setBackendUrl] = useState('')
  useEffect(() => {
    setBackendUrl(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000')
  }, [])

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">QuickBite</h1>
            <p className="text-xs text-slate-500 -mt-1">Food delivery made simple</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-slate-500">API: {backendUrl}</span>
          <button
            onClick={onSeed}
            disabled={seeding}
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {seeding ? 'Seeding…' : 'Seed Demo Data'}
          </button>
        </div>
      </div>
    </header>
  )
}
