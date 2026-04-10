export default function GenerateButton({ onClick, isLoading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-4 rounded-xl text-base font-semibold transition-all duration-200
        ${disabled || isLoading
          ? 'bg-dark-600 text-gray-500 cursor-not-allowed'
          : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent-glow hover:shadow-xl hover:shadow-accent-glow active:scale-[0.98]'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          生成中...
        </span>
      ) : (
        '画像を生成する'
      )}
    </button>
  )
}
