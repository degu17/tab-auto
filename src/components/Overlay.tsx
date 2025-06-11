import type React from 'react';
import type { DiffToken } from '../types';

interface OverlayProps {
  /** 差分トークンの配列 */
  diffTokens: DiffToken[];
  /** 現在のカーソル位置 */
  cursorPosition: number;
  /** オーバーレイを表示するかどうか */
  isVisible: boolean;
}

/**
 * 差分表示用のオーバーレイコンポーネント
 */
export const Overlay: React.FC<OverlayProps> = ({
  diffTokens,
  cursorPosition,
  isVisible,
}) => {
  if (!isVisible || diffTokens.length === 0) {
    return null;
  }

  let currentPosition = 0;
  let shouldShowCursor = false;

  return (
    <div className="overlay">
      {diffTokens.map((token, index) => {
        const tokenStart = currentPosition;
        const tokenEnd = currentPosition + (token.type === 'removed' ? 0 : token.value.length);
        
        // カーソルがこのトークンの範囲内にあるかチェック
        const isCursorInToken = cursorPosition >= tokenStart && cursorPosition <= tokenEnd;
        
        if (token.type === 'removed') {
          // 削除部分は表示しない（非表示文字として扱う）
          return null;
        }

        const content = token.value;
        currentPosition = tokenEnd;

        // カーソル表示の処理
        if (isCursorInToken && !shouldShowCursor) {
          shouldShowCursor = true;
          const cursorOffset = cursorPosition - tokenStart;
          const beforeCursor = content.substring(0, cursorOffset);
          const afterCursor = content.substring(cursorOffset);

          return (
            <span
              key={index}
              className={`token token-${token.type}`}
            >
              {beforeCursor}
              <span className="cursor" />
              {afterCursor}
            </span>
          );
        }

        return (
          <span
            key={index}
            className={`token token-${token.type}`}
          >
            {content}
          </span>
        );
      })}
      {/* カーソルがトークンの範囲外にある場合の処理 */}
      {!shouldShowCursor && cursorPosition >= currentPosition && (
        <span className="cursor" />
      )}
    </div>
  );
}; 