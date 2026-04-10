import { useState } from 'react'

export default function ApiSettings({ apiUrl, apiKey, onApiUrlChange, onApiKeyChange }) {
  const [isOpen, setIsOpen] = useState(!apiUrl)

  return (
    <div className="rounded-xl bg-dark-700 border border-dark-500 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          API設定
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3 border-t border-dark-500">
          <div className="pt-3">
            <label className="block text-xs text-gray-500 mb-1">RunPod ベースURL</label>
            <input
              type="url"
              value={apiUrl}
              onChange={(e) => onApiUrlChange(e.target.value)}
              placeholder="https://xxxx.proxy.runpod.net"
              className="w-full rounded-lg bg-dark-800 border border-dark-500 text-gray-100 px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">APIキー（任意）</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="APIキーを入力..."
              className="w-full rounded-lg bg-dark-800 border border-dark-500 text-gray-100 px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  )
}
