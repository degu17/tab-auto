import React from 'react';
import { InputWrapper } from './components/InputWrapper';
import './App.css';

function App() {
  // 固定APIキー（実際の使用時は環境変数などで管理することを推奨）
  const apiKey = 'AIzaSyAAQsZBTJy2DWo1ORV9v152uTtqC5eUIdE';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tab自動補完</h1>
        <p>
          <strong>🪄 AI補完実行</strong>ボタンで補完候補を生成し、<strong>Tab</strong>キーで適用できます。
        </p>
      </header>
      
      <main className="app-main">
        <InputWrapper
          apiKey={apiKey}
          initialValue="こんにちわ。よろしく"
          placeholder="ここにテキストを入力してください..."
        />
      </main>
    </div>
  );
}

export default App;
