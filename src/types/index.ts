export interface DiffToken {
  /** トークンの種類 */
  type: 'added' | 'removed' | 'unchanged';
  /** トークンの値 */
  value: string;
  /** 元のテキストでの位置 */
  originalIndex?: number;
  /** 新しいテキストでの位置 */
  newIndex?: number;
}

export interface CursorPosition {
  /** カーソルの開始位置 */
  start: number;
  /** カーソルの終了位置 */
  end: number;
}

export interface AutocompleteState {
  /** 現在の入力内容 */
  value: string;
  /** 前回保存時の内容 */
  prevValue: string;
  /** 補完提案の内容 */
  complements: DiffToken[];
  /** カーソル位置 */
  selectionStart: number;
  /** 補完処理の無効化フラグ */
  disabledChange: boolean;
  /** 補完提案が表示中かどうか */
  isComplementing: boolean;
}

export interface GeminiResponse {
  /** 修正後の全内容 */
  content: string;
} 