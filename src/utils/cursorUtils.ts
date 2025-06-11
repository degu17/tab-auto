import type { DiffToken } from '../types';

/**
 * テキストエリア内のカーソル位置を取得する
 * @param element テキストエリア要素
 * @returns カーソルの位置
 */
export const getCursorPosition = (element: HTMLTextAreaElement): number => {
  return element.selectionStart;
};

/**
 * テキストエリア内のカーソル位置を設定する
 * @param element テキストエリア要素
 * @param position 設定したい位置
 */
export const setCursorPosition = (element: HTMLTextAreaElement, position: number): void => {
  element.setSelectionRange(position, position);
};

/**
 * 補完箇所をスキップしてカーソルを移動する
 * @param diffTokens DiffTokenの配列
 * @param currentPosition 現在のカーソル位置
 * @param direction 移動方向 ('forward' | 'backward')
 * @returns 新しいカーソル位置
 */
export const skipCompletionArea = (
  diffTokens: DiffToken[],
  currentPosition: number,
  direction: 'forward' | 'backward'
): number => {
  let position = 0;
  
  for (const token of diffTokens) {
    if (token.type === 'removed') {
      // 削除部分はスキップ
      continue;
    }
    
    const tokenEnd = position + token.value.length;
    
    if (token.type === 'added') {
      // 追加部分の場合
      if (direction === 'forward' && currentPosition >= position && currentPosition < tokenEnd) {
        // 追加部分の中にいる場合は末尾に移動
        return tokenEnd;
      } else if (direction === 'backward' && currentPosition > position && currentPosition <= tokenEnd) {
        // 追加部分の中にいる場合は先頭に移動
        return position;
      }
    }
    
    position = tokenEnd;
  }
  
  return currentPosition;
};

/**
 * テキスト内の行と列の位置を計算する
 * @param text テキスト
 * @param position 位置
 * @returns 行と列の情報
 */
export const getLineAndColumn = (text: string, position: number): { line: number; column: number } => {
  const beforePosition = text.substring(0, position);
  const lines = beforePosition.split('\n');
  
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}; 