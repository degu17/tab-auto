import { diffWordsWithSpace } from 'diff';
import type { Change } from 'diff';
import type { DiffToken } from '../types';

/**
 * 2つのテキストの差分を計算し、DiffTokenの配列として返す
 * @param oldText 元のテキスト
 * @param newText 新しいテキスト
 * @returns DiffTokenの配列
 */
export const calculateDiff = (oldText: string, newText: string): DiffToken[] => {
  const differences: Change[] = diffWordsWithSpace(oldText, newText);
  const diffTokens: DiffToken[] = [];

  differences.forEach((change) => {
    if (change.added) {
      diffTokens.push({
        type: 'added',
        value: change.value,
      });
    } else if (change.removed) {
      diffTokens.push({
        type: 'removed',
        value: change.value,
      });
    } else {
      diffTokens.push({
        type: 'unchanged',
        value: change.value,
      });
    }
  });

  return diffTokens;
};

/**
 * DiffTokenの配列から修正後のテキストを生成する
 * @param diffTokens DiffTokenの配列
 * @returns 修正後のテキスト
 */
export const applyDiff = (diffTokens: DiffToken[]): string => {
  return diffTokens
    .filter((token) => token.type !== 'removed')
    .map((token) => token.value)
    .join('');
};

/**
 * 元のテキストでの位置を新しいテキストでの位置に変換する
 * @param diffTokens DiffTokenの配列
 * @param originalPosition 元のテキストでの位置
 * @returns 新しいテキストでの位置
 */
export const convertPosition = (diffTokens: DiffToken[], originalPosition: number): number => {
  let originalIndex = 0;
  let newIndex = 0;

  for (const token of diffTokens) {
    if (token.type === 'removed') {
      if (originalIndex + token.value.length <= originalPosition) {
        originalIndex += token.value.length;
      } else {
        // 削除された部分内の位置の場合、削除開始位置に移動
        return newIndex;
      }
    } else if (token.type === 'added') {
      newIndex += token.value.length;
    } else {
      // unchanged
      if (originalIndex + token.value.length <= originalPosition) {
        originalIndex += token.value.length;
        newIndex += token.value.length;
      } else {
        // 変更されていない部分内の位置
        const offset = originalPosition - originalIndex;
        return newIndex + offset;
      }
    }
  }

  return newIndex;
}; 