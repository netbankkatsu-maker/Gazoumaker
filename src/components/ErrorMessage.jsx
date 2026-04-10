export default function ErrorMessage({ error, onDismiss }) {
  if (!error) return null

  return (
    <div className="rounded-xl bg-red-900/30 border border-red-800/50 px-4 py-3 flex items-start gap-3">
      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-sm text-red-300 flex-1">{error}</p>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-300 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
