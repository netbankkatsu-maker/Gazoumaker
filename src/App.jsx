import { useState, useEffect } from 'react'
import ImageUploader from './components/ImageUploader'
import PromptInput from './components/PromptInput'
import ApiSettings from './components/ApiSettings'
import ParameterSettings from './components/ParameterSettings'
import GenerateButton from './components/GenerateButton'
import ResultView from './components/ResultView'
import ErrorMessage from './components/ErrorMessage'

const DEFAULT_PROMPT = 'highly detailed artistic style, beautiful lighting, masterpiece'
const DEFAULT_NEGATIVE = 'blurry, low quality, deformed, ugly, bad anatomy, disfigured'

const DEFAULT_PARAMS = {
  denoisingStrength: 0.65,
  steps: 30,
  negativePrompt: DEFAULT_NEGATIVE,
  sizeMode: '512', // 'original' | '512' | '768'
}

function stripDataUrlPrefix(dataUrl) {
  const idx = dataUrl.indexOf(',')
  return idx !== -1 ? dataUrl.substring(idx + 1) : dataUrl
}

function computeSize(image, sizeMode) {
  if (sizeMode === 'original' && image) {
    // A1111 requires multiples of 8
    const w = Math.round(image.width / 8) * 8
    const h = Math.round(image.height / 8) * 8
    return { width: Math.min(w, 1024), height: Math.min(h, 1024) }
  }
  const size = sizeMode === '768' ? 768 : 512
  return { width: size, height: size }
}

export default function App() {
  const [image, setImage] = useState(null)
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('gazou_api_url') || '')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gazou_api_key') || '')
  const [params, setParams] = useState(() => {
    try {
      const saved = localStorage.getItem('gazou_params')
      return saved ? { ...DEFAULT_PARAMS, ...JSON.parse(saved) } : DEFAULT_PARAMS
    } catch {
      return DEFAULT_PARAMS
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    localStorage.setItem('gazou_api_url', apiUrl)
  }, [apiUrl])

  useEffect(() => {
    localStorage.setItem('gazou_api_key', apiKey)
  }, [apiKey])

  useEffect(() => {
    localStorage.setItem('gazou_params', JSON.stringify(params))
  }, [params])

  async function handleGenerate() {
    setError(null)
    setResultImage(null)

    if (!image) {
      setError('画像をアップロードしてください。')
      return
    }

    if (!apiUrl.trim()) {
      setError('API設定でRunPodのベースURLを入力してください。')
      return
    }

    setIsLoading(true)

    try {
      const base64Image = stripDataUrlPrefix(image.dataUrl)
      const { width, height } = computeSize(image, params.sizeMode)

      const baseUrl = apiUrl.trim().replace(/\/+$/, '')
      const endpoint = `${baseUrl}/sdapi/v1/img2img`

      const payload = {
        init_images: [base64Image],
        prompt,
        negative_prompt: params.negativePrompt,
        steps: params.steps,
        denoising_strength: params.denoisingStrength,
        width,
        height,
        sampler_name: 'DPM++ 2M Karras',
        cfg_scale: 7,
      }

      const headers = { 'Content-Type': 'application/json' }
      if (apiKey.trim()) {
        headers['Authorization'] = `Bearer ${apiKey.trim()}`
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const status = response.status
        let detail = ''
        try {
          const errJson = await response.json()
          detail = errJson.detail || errJson.error || JSON.stringify(errJson)
        } catch {
          detail = await response.text().catch(() => '')
        }
        if (status === 401 || status === 403) {
          throw new Error(`認証エラー (${status}): APIキーを確認してください。${detail ? '\n' + detail : ''}`)
        } else if (status === 404) {
          throw new Error(`エンドポイントが見つかりません (404): URLを確認してください。`)
        } else if (status >= 500) {
          throw new Error(`サーバーエラー (${status}): しばらく待ってから再試行してください。${detail ? '\n' + detail : ''}`)
        } else {
          throw new Error(`APIエラー (${status}): ${detail || '不明なエラー'}`)
        }
      }

      const data = await response.json()

      if (!data.images || data.images.length === 0) {
        throw new Error('APIから画像が返されませんでした。')
      }

      const resultBase64 = data.images[0]
      setResultImage(`data:image/png;base64,${resultBase64}`)
    } catch (err) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError('接続できませんでした。URLが正しいか、サーバーが起動しているか確認してください。CORSエラーの可能性もあります。')
      } else {
        setError(err.message || '画像の生成中にエラーが発生しました。')
      }
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

        <ParameterSettings params={params} onParamsChange={setParams} />

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
