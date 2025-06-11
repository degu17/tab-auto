import { useState, useCallback } from 'react';
import type React from 'react';
import { Textarea } from './Textarea';
import { Overlay } from './Overlay';
import { useGeminiAPI } from '../hooks/useGeminiAPI';
import { useCursorPosition } from '../hooks/useCursorPosition';
import { calculateDiff, applyDiff, convertPosition } from '../utils/diffUtils';
import type { AutocompleteState } from '../types';

interface InputWrapperProps {
  /** Gemini APIキー */
  apiKey: string;
  /** 初期値 */
  initialValue?: string;
  /** プレースホルダー */
  placeholder?: string;
}

/**
 * TextareaとOverlayを統合するメインコンポーネント
 */
export const InputWrapper: React.FC<InputWrapperProps> = ({
  apiKey,
  initialValue = '',
  placeholder,
}) => {
  const [state, setState] = useState<AutocompleteState>({
    value: initialValue,
    prevValue: '', // 補完テスト用なので空文字から開始
    complements: [],
    selectionStart: 0,
    disabledChange: false,
    isComplementing: false,
  });

  const { generateCompletion, isLoading, error } = useGeminiAPI(apiKey);
  const { cursorPosition, updateCursorPosition, textareaRef } = useCursorPosition();

  // 補完処理
  const performCompletion = useCallback(async () => {
    if (state.disabledChange || !state.value.trim()) {
      return;
    }

    console.log('補完処理開始:', { 
      currentValue: state.value 
    });
    
    setState(prev => ({ ...prev, isComplementing: true }));

    try {
      const response = await generateCompletion('', state.value);
      
      if (response && response.content !== state.value) {
        console.log('補完レスポンス:', response.content);
        const diffTokens = calculateDiff(state.value, response.content);
        console.log('差分トークン:', diffTokens);
        
        setState(prev => ({
          ...prev,
          complements: diffTokens,
          isComplementing: false, // 補完生成完了
        }));
        
        // 補完生成完了後もフォーカスを維持
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }, 100);
      } else {
        // 補完が生成されなかった場合もフラグをリセット
        setState(prev => ({ ...prev, isComplementing: false }));
      }
    } catch (err) {
      console.error('補完処理でエラーが発生しました:', err);
      // エラー時もフラグをリセット
      setState(prev => ({ ...prev, isComplementing: false }));
    }
  }, [state.value, state.disabledChange, generateCompletion, textareaRef]);

  // 手動補完実行
  const handleManualCompletion = useCallback(() => {
    if (!state.disabledChange) {
      performCompletion();
      // ボタンクリック後にテキストエリアにフォーカスを戻す
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  }, [performCompletion, state.disabledChange, textareaRef]);

  // 値変更ハンドラー
  const handleChange = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      value,
      complements: [], // 補完をクリア
      isComplementing: false,
    }));
  }, []);

  // キー押下ハンドラー
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab' && state.complements.length > 0) {
      // Tab押下で補完を適用
      event.preventDefault();
      const newValue = applyDiff(state.complements);
      const newCursorPosition = convertPosition(state.complements, cursorPosition);
      
      setState(prev => ({
        ...prev,
        value: newValue,
        complements: [],
        isComplementing: false,
        disabledChange: true, // 300ms間は補完を無効化
      }));

      // カーソル位置を更新
      setTimeout(() => {
        updateCursorPosition(newCursorPosition);
      }, 0);

      // 300ms後に補完を再有効化
      setTimeout(() => {
        setState(prev => ({ ...prev, disabledChange: false }));
      }, 300);

    } else if (state.complements.length > 0) {
      // その他のキーで補完をキャンセル
      setState(prev => ({
        ...prev,
        complements: [],
        isComplementing: false,
      }));
    }
  }, [state.complements, cursorPosition, updateCursorPosition]);

  return (
    <div className="input-wrapper">
      {/* コントロールバー */}
      <div className="control-bar">
        <button
          className="manual-completion-btn"
          onClick={handleManualCompletion}
          onMouseDown={(e) => e.preventDefault()} // フォーカス移動を防ぐ
          disabled={isLoading || state.disabledChange}
        >
          {isLoading ? '補完生成中...' : '🪄 AI補完実行'}
        </button>
      </div>
      
      <div className="input-container">
        <Textarea
          ref={textareaRef}
          value={state.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          isComplementing={state.isComplementing}
        />
        <Overlay
          diffTokens={state.complements}
          cursorPosition={cursorPosition}
          isVisible={state.complements.length > 0}
        />
      </div>
      
      {/* ステータス表示 */}
      <div className="status-bar">
        {error && <span className="status-error">エラー: {error}</span>}
        {state.complements.length > 0 && (
          <span className="status-hint">✨ 補完候補が表示されています。Tabキーで適用してください</span>
        )}
        {state.isComplementing && (
          <span className="status-processing">🤖 AI補完を生成中...</span>
        )}
      </div>
    </div>
  );
}; 