import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeminiResponse } from '../types';

/**
 * Gemini API を使用してテキスト補完を行うカスタムフック
 * @param apiKey Gemini APIキー
 * @returns API関連の状態と関数
 */
export const useGeminiAPI = (apiKey: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCompletion = useCallback(async (
    prevValue: string,
    currentValue: string
  ): Promise<GeminiResponse | null> => {
    if (!apiKey) {
      setError('APIキーが設定されていません');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `前回の内容と現在の内容を比較し、タイポ修正、フォーマット調整、コードリファクタリングを行ってください。

## 前回の内容
${prevValue}

## 現在の内容
${currentValue}

修正後の全内容のみを出力してください。余計な説明は不要です。`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      return { content };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return {
    generateCompletion,
    isLoading,
    error,
  };
}; 