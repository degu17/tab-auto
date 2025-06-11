# Tab自動補完フォーム

CursorやGitHub CopilotのようなAI自動補完機能を搭載したWebフォームアプリケーションです。
Gemini APIを使用してテキストの補完・修正を行います。

![Tab自動補完フォーム](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green)

## ✨ 機能

- 🪄 **AI補完実行**: ボタンクリックでテキストの補完・修正
- ⌨️ **Tab補完**: 補完候補をTabキーで適用
- 💾 **保存機能**: Ctrl+S（Cmd+S）で現在の状態を保存
- 🎨 **美しいUI**: モダンでレスポンシブなデザイン
- 🔧 **リアルタイム差分表示**: 変更箇所を視覚的にハイライト

## 🚀 技術スタック

- **フロントエンド**:
  - React v19.1.0
  - TypeScript 5.8.3
  - Vite 6.3.5

- **外部API**:
  - Google Gemini API (gemini-1.5-flash)

- **ライブラリ**:
  - jsdiff - テキスト差分計算
  - @google/generative-ai - Gemini API クライアント

## 📦 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/degu17/tab-auto.git
cd tab-auto
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Gemini APIキーの設定

1. [Google AI Studio](https://makersuite.google.com/app/apikey)でAPIキーを取得
2. `src/App.tsx`の以下の行を編集してAPIキーを設定：

```typescript
const apiKey = 'YOUR_API_KEY_HERE';
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセス

### 5. ビルド

```bash
npm run build
```

## 🎯 使用方法

1. **テキストを入力**してフォームに内容を記述
2. **🪄 AI補完実行**ボタンをクリックして補完候補を生成
3. 補完候補が表示されたら**Tabキー**で適用
4. **💾 保存**ボタンまたは**Ctrl+S** (Cmd+S) で現在の内容を保存状態に

## 🏗️ プロジェクト構造

```
src/
├── components/
│   ├── InputWrapper.tsx    # メインコンポーネント
│   ├── Textarea.tsx        # 入力用テキストエリア
│   └── Overlay.tsx         # 差分表示オーバーレイ
├── hooks/
│   ├── useGeminiAPI.ts     # Gemini API通信
│   ├── useDebounce.ts      # デバウンス処理
│   └── useCursorPosition.ts # カーソル位置管理
├── utils/
│   ├── diffUtils.ts        # 差分計算ユーティリティ
│   └── cursorUtils.ts      # カーソル操作ユーティリティ
├── types/
│   └── index.ts            # 型定義
└── App.tsx                 # ルートコンポーネント
```

## 🎨 カスタマイズ

### UIテーマの変更

`src/App.css`と`src/index.css`でスタイルをカスタマイズできます。

### AIモデルの変更

`src/hooks/useGeminiAPI.ts`でGeminiのモデルを変更可能：

```typescript
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

## 📄 ライセンス

このプロジェクトはパブリックドメインです。

## 🤝 コントリビューション

プルリクエストや課題報告を歓迎します。

## 🙏 謝辞

- [inaniwaudon/tab-autocomplete-form](https://github.com/inaniwaudon/tab-autocomplete-form)にインスパイアされました
- Google Gemini APIを使用しています
