export default function ResultView({ resultImage }) {
  if (!resultImage) return null

  function handleDownload() {
    const link = document.createElement('a')
    link.href = resultImage
    link.download = `gazoumaker_${Date.now()}.png`
    link.click()
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-400">
        生成結果
      </label>
      <div className="rounded-xl bg-dark-700 border border-dark-500 p-2">
        <img
          src={resultImage}
          alt="生成結果"
          className="w-full rounded-lg object-contain max-h-80"
        />
      </div>
      <button
        onClick={handleDownload}
        className="w-full py-3 rounded-xl bg-dark-600 hover:bg-dark-500 text-gray-200 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        ダウンロード
      </button>
    </div>
  )
}
