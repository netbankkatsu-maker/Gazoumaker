import { useState, useEffect } from 'react'
import ImageUploader from './components/ImageUploader'
import PromptInput from './components/PromptInput'
import ApiSettings from './components/ApiSettings'
import GenerateButton from './components/GenerateButton'
import ResultView from './components/ResultView'
import ErrorMessage from './components/ErrorMessage'

const DEFAULT_PROMPT = 'highly detailed artistic style, beautiful lighting, masterpiece'

function generateMockImage(sourceImage) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      ctx.filter = 'saturate(1.5) contrast(1.2) hue-rotate(30deg)'
      ctx.drawImage(img, 0, 0)

      ctx.globalCompositeOperation = 'overlay'
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      resolve(canvas.toDataURL('image/png'))
    }
    img.src = sourceImage
  })
}

export default function App() {
  const [image, setImage] = useState(null)
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('gazou_api_url') || '')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gazou_api_key') || '')
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    localStorage.setItem('gazou_api_url', apiUrl)
  }, [apiUrl])

  useEffect(() => {
    localStorage.setItem('gazou_api_key', apiKey)
  }, [apiKey])

  async function handleGenerate() {
    setError(null)
    setResultImage(null)

    if (!image) {
      setError('画像をアップロードしてください。')
      return
    }

    setIsLoading(true)

    try {
      // モック: 2秒待ってから加工した画像を返す
      await new Promise((r) => setTimeout(r, 2000))
      const mock = await generateMockImage(image)
      setResultImage(mock)
    } catch {
      setError('画像の生成中にエラーが発生しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-dark-900 text-gray-100">
      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <header className="text-center pb-2">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-accent">Gazou</span>maker
          </h1>
          <p className="text-xs text-gray-500 mt-1">img2img 画像変換ツール</p>
        </header>

        <ImageUploader image={image} onImageChange={setImage} />

        <PromptInput prompt={prompt} onPromptChange={setPrompt} />

        <ApiSettings
          apiUrl={apiUrl}
          apiKey={apiKey}
          onApiUrlChange={setApiUrl}
          onApiKeyChange={setApiKey}
        />

        <GenerateButton
          onClick={handleGenerate}
          isLoading={isLoading}
          disabled={!image}
        />

        <ErrorMessage error={error} onDismiss={() => setError(null)} />

        <ResultView resultImage={resultImage} />

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600 pt-4 pb-8">
          Gazoumaker &mdash; Stable Diffusion img2img Client
        </footer>
      </div>
    </div>
  )
}
