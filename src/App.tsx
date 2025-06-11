import React, { useState } from 'react';
import { InputWrapper } from './components/InputWrapper';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  const handleApiKeySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (apiKey.trim()) {
      setIsApiKeySet(true);
    }
  };



  if (!isApiKeySet) {
    return (
      <div className="app">
        <div className="api-key-form">
          <h1>Tab自動補完フォーム</h1>
          <p>
            Gemini APIキーを入力してください。
            <br />
            APIキーは<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>で取得できます。
          </p>
          <form onSubmit={handleApiKeySubmit}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Gemini APIキーを入力"
              className="api-key-input"
              required
            />
            <button type="submit" className="api-key-submit">
              開始
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tab自動補完フォーム</h1>
        <p>
          <strong>🪄 AI補完実行</strong>ボタンで補完候補を生成し、<strong>Tab</strong>キーで適用できます。
          <strong>💾 保存</strong>ボタンまたは<strong>Ctrl+S</strong> (Cmd+S) で現在の内容を保存状態にできます。
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
