import { useState } from 'react'

export default function ParameterSettings({ params, onParamsChange }) {
  const [isOpen, setIsOpen] = useState(false)

  function update(key, value) {
    onParamsChange({ ...params, [key]: value })
  }

  return (
    <div className="rounded-xl bg-dark-700 border border-dark-500 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          生成パラメータ
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4 border-t border-dark-500 pt-3">
          {/* Denoising Strength */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-500">Denoising Strength</label>
              <span className="text-xs font-mono text-accent">{params.denoisingStrength.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={params.denoisingStrength}
              onChange={(e) => update('denoisingStrength', parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-dark-500 accent-accent"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
              <span>0（元画像に近い）</span>
              <span>1（大きく変化）</span>
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-500">Steps</label>
              <span className="text-xs font-mono text-accent">{params.steps}</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={params.steps}
              onChange={(e) => update('steps', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-dark-500 accent-accent"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
              <span>10（速い）</span>
              <span>80（高品質）</span>
            </div>
          </div>

          {/* Negative Prompt */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">ネガティブプロンプト</label>
            <textarea
              value={params.negativePrompt}
              onChange={(e) => update('negativePrompt', e.target.value)}
              rows={2}
              className="w-full rounded-lg bg-dark-800 border border-dark-500 text-gray-100 px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 resize-none transition-colors"
              placeholder="除外したい要素..."
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs text-gray-500 mb-2">出力サイズ</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '元画像', value: 'original' },
                { label: '512×512', value: '512' },
                { label: '768×768', value: '768' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => update('sizeMode', value)}
                  className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                    params.sizeMode === value
                      ? 'bg-accent text-white'
                      : 'bg-dark-800 text-gray-400 hover:text-gray-200 border border-dark-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
