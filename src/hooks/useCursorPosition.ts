import { useState, useEffect, useRef } from 'react';

/**
 * テキストエリアのカーソル位置を追跡するカスタムフック
 * @returns カーソル位置と設定関数
 */
export const useCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (textareaRef.current && document.activeElement === textareaRef.current) {
        setCursorPosition(textareaRef.current.selectionStart);
      }
    };

    // selectionchangeイベントを手動で登録
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  /**
   * カーソル位置を設定する
   * @param position 設定したい位置
   */
  const updateCursorPosition = (position: number) => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(position, position);
      setCursorPosition(position);
    }
  };

  return {
    cursorPosition,
    updateCursorPosition,
    textareaRef,
  };
}; 