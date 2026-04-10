import { useRef, useState } from 'react'

export default function ImageUploader({ image, onImageChange }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => onImageChange(e.target.result)
    reader.readAsDataURL(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleClick() {
    inputRef.current?.click()
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0])
  }

  function handleRemove(e) {
    e.stopPropagation()
    onImageChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">
        元画像
      </label>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200
          ${isDragging
            ? 'border-accent bg-accent/10'
            : image
              ? 'border-dark-500 bg-dark-700'
              : 'border-dark-500 bg-dark-700 hover:border-accent/50 hover:bg-dark-600'
          }
          ${image ? 'p-2' : 'p-8'}
        `}
      >
        {image ? (
          <div className="relative">
            <img
              src={image}
              alt="アップロード画像"
              className="w-full rounded-lg object-contain max-h-64"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium">タップして画像を選択</p>
              <p className="text-xs text-gray-500 mt-1">またはドラッグ&ドロップ</p>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
