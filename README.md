# Gazoumaker

スマホブラウザで動く Stable Diffusion img2img 画像変換ツール。

## 使い方

1. https://netbankkatsu-maker.github.io/Gazoumaker/ にアクセス
2. 画像をアップロード
3. プロンプトを入力（デフォルトあり）
4. API設定で RunPod の URL を入力
5. 「画像を生成する」をタップ

## A1111 WebUI の CORS 設定

ブラウザから直接 API を叩くため、A1111 の起動時に CORS を許可する必要があります。

RunPod テンプレートや起動スクリプトで、以下の引数を追加してください:

```bash
python launch.py --api --cors-allow-origins=*
```

または特定のオリジンのみ許可する場合:

```bash
python launch.py --api --cors-allow-origins=https://netbankkatsu-maker.github.io
```

### RunPod での設定例

RunPod のテンプレート設定で、Docker の起動コマンドまたは `relauncher.py` 等に `--cors-allow-origins=*` を追記します。

## 開発

```bash
npm install
npm run dev
```

## デプロイ

`main` または `claude/mobile-img2img-tool-2gwNg` ブランチへ push すると、GitHub Actions で GitHub Pages に自動デプロイされます。

### GitHub Pages の有効化（初回のみ）

1. リポジトリの Settings > Pages を開く
2. Source を **GitHub Actions** に変更
3. 保存
