import { forwardRef } from 'react';
import type React from 'react';

interface TextareaProps {
  /** 入力値 */
  value: string;
  /** 値変更時のハンドラー */
  onChange: (value: string) => void;
  /** キー押下時のハンドラー */
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** 無効化フラグ */
  disabled?: boolean;
  /** 補完表示中フラグ */
  isComplementing?: boolean;
}

/**
 * 入力用のTextareaコンポーネント
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  value,
  onChange,
  onKeyDown,
  placeholder = 'テキストを入力してください...',
  disabled = false,
  isComplementing = false,
}, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={`textarea ${isComplementing ? 'textarea-complementing' : ''}`}
      rows={20}
      cols={80}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
    />
  );
});

Textarea.displayName = 'Textarea'; 