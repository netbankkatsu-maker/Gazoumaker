export default function PromptInput({ prompt, onPromptChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">
        プロンプト
      </label>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl bg-dark-700 border border-dark-500 text-gray-100 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 resize-none transition-colors"
        placeholder="プロンプトを入力..."
      />
    </div>
  )
}
